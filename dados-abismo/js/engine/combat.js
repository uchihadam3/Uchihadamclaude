/* ========================================================================
   MOTOR DE COMBATE (§6) — PURO e testável. Sem UI, sem three.js.
   Determinístico: todo aleatório vem do RNG semeado passado no construtor.
   ===================================================================== */
import { satisfies, resolvedValues, findSubset, entryValue } from './requirements.js';
import { face } from '../data/faces.js';
import { RESPIRAR } from '../data/classes.js';
import { travaAberta, travaRefleteAgora } from '../data/travas.js';

/* ---------- expressões dos efeitos (DSL de dados, §0.2) ---------- */
const EXPR_CACHE = new Map();
function evalExpr(expr, ctx){
  if(typeof expr === 'number') return expr;
  let fn = EXPR_CACHE.get(expr);
  if(!fn){ fn = new Function('c', `with(c){ return (${expr}); }`); EXPR_CACHE.set(expr, fn); }
  const v = fn(ctx);
  return Math.max(0, Math.round(v||0));
}

/* ---------- ESTADOS (§6) ---------- */
export const STATUS = {
  veneno:     { nome:'Veneno',     tick:'end',  desc:'Dano no fim do turno; empilha e decai 1.' },
  sangramento:{ nome:'Sangramento',tick:'end',  desc:'Dano no fim do turno; some sozinho.' },
  queimadura: { nome:'Queimadura', tick:'roll', desc:'Dano ao rolar os dados.' },
  congelado:  { nome:'Congelado',  tick:'none', desc:'Dado travado numa face.' },
  fratura:    { nome:'Fratura',    tick:'none', desc:'O dado perde 1 do valor máximo.' },
  marca:      { nome:'Marca',      tick:'none', desc:'Recebe +50% do próximo golpe.' },
  maldicao:   { nome:'Maldição',   tick:'none', desc:'Um dado ☠ Vazio entra na Bolsa.' },
  frenesi:    { nome:'Frenesi',    tick:'none', desc:'+50% de dano causado.' },
  espinhos:   { nome:'Espinhos',   tick:'none', desc:'Devolve dano a quem te acerta.' },
  invisivel:  { nome:'Invisível',  tick:'none', desc:'Sofre 65% menos dano de ataques.' },
  armadura:   { nome:'Armadura',   tick:'none', desc:'Reduz cada golpe recebido.' },
};

export class Combat {
  constructor({ rng, player, enemies, burdens=[], log=true }){
    this.rng = rng;
    this.p = player;                       // {classe, hp, maxHp, block, bag, statuses, essence, rerollsBase, relics}
    this.enemies = enemies;
    this.burdens = new Set(burdens);       // Fardos da masmorra (§3.3)
    this.turn = 0;
    this.roll = [];                        // entradas roladas
    this.used = new Set();                 // dieIds já alocados
    this.circle = [];                      // Círculo do Arcanista (banking)
    this.rerolls = 0;
    this.pity = 0;                         // Pena de Sorte (§5.4)
    this.logLines = []; this.doLog = log;
    this.over = null;                      // 'win' | 'lose'
    this.lastEnemyAttack = 0;
    this.trapacaUsada = false;
    this._gazua = this.p.gazua||0;      // ferramentas de fechadura vindas do Cofre
    this._polegar = 0;
    this.p.block = 0;
    this.p.statuses = this.p.statuses || {};
    this.p.essence = this.p.essence || 0;
    this.M = this.p.relicMods || {};            // modificadores de relíquia (§9)
    this.flags = this.p.relicFlags || new Set();
    // AURAS dos elites: estavam escritas na carta e não faziam nada
    this.auras = new Set();
    for(const en of enemies) if(en.aura?.id) this.auras.add(en.aura.id);
    this.onInvocar = null;                 // quem sabe criar inimigo é quem tem a masmorra
    this._ultimoUsado = false;
    // Fardo M3: você entra em cada combate com um dado Enferrujado (face ☠)
    if(this.burdens.has('dado_enferrujado')){
      this.enferrujado = { id:'FERRUGEM', tipo:'d6', n:6, material:'osso',
        faces:[face('void',0), face('num',1), face('num',2),
               face('num',2), face('num',3), face('num',3)] };
    }
    // Fardo M7: eles tomam um dado seu logo de cara, por combate
    if(this.burdens.has('rouba_dado') && this.p.bag.length>1){
      const alv = this.p.bag[this.rng.int(this.p.bag.length)];
      alv._roubado = 1;
    }
    for(const st of (this.p.relicStarts||[])){   // relíquias de início de combate
      if(st.block) this.p.block += st.block;
      if(st.essence) this.p.essence += st.essence;
    }
  }
  L(s){ if(this.doLog) this.logLines.push(`[T${this.turn}] ${s}`); }

  /* ================= TURNO DO JOGADOR ================= */
  startTurn(){
    this.turn++;
    this.used.clear();
    this.p.block = 0;
    this.trapacaUsada = false;
    this._guardou = false; this._travou = false;
    this.rerolls = Math.max(0, this.p.rerollsBase + (this.M.rerollBonus||0));
    for(const en of this.enemies){ en._arrombada = false;  // arrombamento dura 1 turno
      en._refletiu = false; }                              // o espelho recarrega
    this._polegar = this.p.polegar||0;                     // Polegar Torto recarrega
    /* CANALIZAÇÃO: o Círculo era só armazém — o Arcanista era a única classe
       cuja sobra não devolvia nada imediato (Carrasco vira dano, Lâmina vira
       veneno, OráculA vira bloqueio), e é justamente a que precisa esperar.
       Agora o círculo fechado PROTEGE enquanto acumula. */
    if(this.p.classe==='arcanista' && this.circle.length){
      this.p.block += this.circle.length;
      this.L(`Círculo fechado: +${this.circle.length} de bloqueio`);
    }
    // queimadura dispara ao rolar
    const q = this.p.statuses.queimadura|0;
    if(q){ this.dmgPlayer(q, 'queimadura'); }
    this.rollAll();
    // Fardo M10: o Abismo re-rola um dos seus dados DEPOIS de você jogar (marcado)
    this.abyssReroll = this.burdens.has('abismo_rerola');
    return this.roll;
  }

  rollAll(){
    const bag = this.p.bag;
    const entries = [];
    for(const d of bag){
      if(d._roubado){ d._roubado--; continue; }   // roubado: não entra nesta rolagem
      const congelado = d._congelado;
      let f, fidx=0;
      if(congelado){ f = d._congeladoFace; }
      else {
        let idx = this.rng.int(d.faces.length); fidx=idx;
        f = d.faces[idx];
        // Fardo M6: dados que rolarem 1 ficam Travados por um turno
        if(this.burdens.has('um_trava') && f.k==='num' && f.v===1){ d._travadoProx = true; }
        // aura do Sacristão: rolou 1, a face vira ☠ Vazio pra sempre
        if(this.auras.has('um_amaldicoa') && f.k==='num' && f.v===1){
          d.faces[idx] = face('void',0); f = d.faces[idx];
          this.L('a maldição comeu uma face do seu dado'); }
        // Fardo M3: dado Enferrujado tem face inútil (já vem na bolsa)
      }
      entries.push({ dieId:d.id, tipo:d.tipo, n:d.n, material:d.material, face:{...f}, faceIdx:fidx, die:d });
    }
    if(this.enferrujado) entries.push({ dieId:this.enferrujado.id, tipo:'d6', n:6,
      material:'osso', face:{...this.enferrujado.faces[this.rng.int(6)]},
      faceIdx:0, die:this.enferrujado, ferrugem:true });
    // Círculo do Arcanista entra junto (banking §7.3)
    for(const e of this.circle) entries.push({...e, banked:true});
    this.circle = [];
    /* RELÍQUIAS onRoll — estavam declaradas e nunca eram lidas */
    const gRolls = this.p.relicRolls || [];
    if(gRolls.includes('um_vira_dois'))
      for(const e of entries) if(e.face.k==='num' && e.face.v===1) e.face = {...e.face, v:2};
    this._laminasRoladas = gRolls.includes('lamina_bonus')
      ? entries.filter(e=>e.face.k==='blade').length : 0;
    /* Olho de Vidro: o melhor dado da mão vem no valor máximo */
    if(this.flags.has('prever') && entries.length){
      const alvo = entries.slice().sort((a,b)=>(entryValue(a)||0)-(entryValue(b)||0))[0];
      if(alvo && alvo.die){
        const melhor = alvo.die.faces.reduce((m,f)=> (f.v||0)>(m.v||0)?f:m, alvo.die.faces[0]);
        alvo.face = {...melhor};
        this.L('Olho de Vidro: um dado veio no melhor valor');
      }
    }
    this.roll = entries;
    // Pena de Sorte: rolagem terrível 3x seguidas -> re-rolagem grátis (invisível)
    const soma = entries.reduce((a,e)=>a+(entryValue(e)||0),0);
    const teto = entries.reduce((a,e)=>a+e.n,0);
    const limPity = Math.max(1, 3 - (this.p.pity||0));   // nó Sorte Roubada
    if(soma < teto*0.30){ this.pity++; if(this.pity>=limPity){ this.rerolls++; this.pity=0; this.L('(pena de sorte: +1 re-rolagem)'); } }
    else this.pity = 0;
    return entries;
  }

  /* re-rola um subconjunto (§5.2) */
  reroll(dieIds){
    if(this.rerolls<=0) return false;
    // Fardo M5: re-rolagens custam vida
    if(this.burdens.has('reroll_custa_vida')) this.dmgPlayer(2, 'preço da re-rolagem');
    this.rerolls--;
    /* devolve QUAIS dados de fato rolaram. A tela precisa disso: ela animava
       a bolsa inteira e os dados já gastos voltavam da bandeja e rolavam
       junto, como se pudessem ser usados de novo. */
    const rolados = [];
    for(const e of this.roll){
      if(!dieIds.includes(e.dieId) || this.used.has(e.dieId)) continue;
      if(e.die?._congelado) continue;
      const ix=this.rng.int(e.die.faces.length);
      e.face = {...e.die.faces[ix]}; e.faceIdx=ix;
      rolados.push(e.dieId);
    }
    // nada rolou (tudo gasto ou congelado): devolve a re-rolagem em vez de
    // cobrar por um clique que não fez nada
    if(!rolados.length){ this.rerolls++; return false; }
    return rolados;
  }

  /* Sobrecarga do Carrasco: +1 no valor pagando 2 HP */
  sobrecarga(dieId){
    const e = this.roll.find(x=>x.dieId===dieId && !this.used.has(x.dieId));
    if(!e || entryValue(e)===null) return false;
    if(this.p.hp<=2) return false;
    this.dmgPlayer(2, 'sobrecarga');
    e.face = {...e.face, v: e.face.v+1};
    return true;
  }
  /* Canalização do Arcanista: guarda um dado no Círculo AGORA (volta no próximo turno) */
  guardar(dieId){
    if(this._guardou) return false;
    const e = this.roll.find(x=>x.dieId===dieId && !this.used.has(x.dieId));
    if(!e) return false;
    this.circle.push({...e}); this.used.add(dieId); this._guardou=true;
    this.L(`Círculo: guardou ${entryValue(e)??e.face.k}`);
    return true;
  }
  /* Prever da OráculA: este dado mantém ESTA face no próximo turno */
  travar(dieId){
    if(this._travou) return false;
    const e = this.roll.find(x=>x.dieId===dieId && !this.used.has(x.dieId));
    if(!e || !e.die) return false;
    e.die._travadoProx = true; e.die._guardaFace = {...e.face}; this._travou=true;
    this.L(`Fio: dado travado em ${entryValue(e)??e.face.k} para o próximo turno`);
    return true;
  }
  /* Trapaça da Lâmina: face oposta, 1x/turno */
  trapaca(dieId){
    if(this.trapacaUsada) return false;
    const e = this.roll.find(x=>x.dieId===dieId && !this.used.has(x.dieId));
    if(!e || entryValue(e)===null) return false;
    e.face = {...e.face, v: (e.n+1) - e.face.v };
    this.trapacaUsada = true;
    return true;
  }

  pool(){ return this.roll.filter(e=>!this.used.has(e.dieId)); }

  /* toda cura do jogador passa por aqui — é o que a aura Cura Salgada corta */
  curarJogador(n){
    if(n<=0) return 0;
    let c = n;
    if(this.auras.has('cura_salgada') || this.burdens.has('cura_reduzida')) c = Math.floor(c/2);
    if(this.flags.has('sem_cura')) c = 0;
    const antes = this.p.hp;
    this.p.hp = Math.min(this.p.maxHp, this.p.hp + c);
    return this.p.hp - antes;
  }

  /* ---- FERRAMENTAS DE FECHADURA (O Cofre §4.3) ----
     Não são "+dano": são verbos que mudam o quebra-cabeça. */
  polegar(dieId, delta){                 // empurra um dado em ±1
    if(this._polegar<=0) return false;
    const e = this.roll.find(x=>x.dieId===dieId && !this.used.has(x.dieId));
    if(!e || entryValue(e)===null) return false;
    const v = entryValue(e) + delta;
    if(v<1 || v>e.n) return false;
    e.face = {...e.face, v}; this._polegar--;
    this.L(`polegar: dado ${v-delta} → ${v}`);
    return true;
  }
  /* Último Lance (Cofre): 1×/combate, re-rola TODOS os dados sem gastar
     re-rolagem e sem cobrar vida. Também estava só no bônus. */
  ultimoLance(){
    if(!this.p.ultimoLance || this._ultimoUsado) return false;
    this._ultimoUsado = true;
    for(const e of this.roll){
      if(this.used.has(e.dieId) || e.die?._congelado) continue;
      const ix = this.rng.int(e.die.faces.length);
      e.face = {...e.die.faces[ix]}; e.faceIdx = ix;
    }
    this.L('ÚLTIMO LANCE: a mesa inteira rolou de novo');
    return true;
  }
  gazua(idx){                            // arromba a fechadura de um inimigo
    if(this._gazua<=0) return false;
    const en = this.aliveEnemies()[Math.min(idx, this.aliveEnemies().length-1)];
    if(!en || !this.travaDe(en) || en._arrombada) return false;
    en._arrombada = true; this._gazua--;
    this.L(`🗝 Gazua: ${en.nome} ARROMBADO`);
    return true;
  }

  /* ---------- A ALOCAÇÃO (o que as FECHADURAS leem) ----------
     Um golpe não é só "quanto". É COM QUE dados. Soma, maior dado, quantos e
     quais símbolos — é sobre isso que cada inimigo impõe a sua regra. */
  alocar(ents, vals){
    const v = vals.filter(x=>x!==null && x!==undefined);
    this._aloc = {
      sum: v.reduce((a,b)=>a+b,0),
      max: v.length?Math.max(...v):0, min: v.length?Math.min(...v):0,
      count: ents.length, vals: v.slice(),
      simbolos: ents.map(e=>e.face.k).filter(k=>k!=='num'),
    };
    return this._aloc;
  }
  get aloc(){ return this._aloc || { sum:0,max:0,min:0,count:0,vals:[],simbolos:[] }; }
  /* a fechadura deste inimigo está aberta pela alocação atual? */
  abre(en, aloc=this.aloc){
    const t = this.travaDe(en);
    if(!t) return true;
    if(en._arrombada) return true;                  // Arrombar (Carrasco)
    if(en.travaOff>0) return true;                  // Nova Gélida dissolveu
    return travaAberta(t, aloc, this, en);
  }
  travaDe(en){
    if(en.travaCiclo && en.travaCiclo.length)       // chefe: a regra gira a cada turno
      return en.travaCiclo[(this.turn-1+ (en._giro||0)) % en.travaCiclo.length];
    return en.trava || null;
  }

  /* ---------- ALOCAR uma habilidade (§5.2.3) ---------- */
  canUse(skill, dieIds){
    const ents = this.roll.filter(e=>dieIds.includes(e.dieId) && !this.used.has(e.dieId));
    if(ents.length!==dieIds.length) return false;
    return satisfies(skill.req, ents);
  }
  /* como o ◈ Curinga deve se resolver contra ESTE alvo: entre os valores que
     satisfazem a habilidade, prefere os que também abrem a fechadura dele */
  preferenciaCuringa(targetIdx){
    const alive = this.aliveEnemies();
    const en = alive[Math.min(targetIdx, alive.length-1)];
    if(!en || !this.travaDe(en) || en._arrombada || en.travaOff>0) return null;
    return vals => {
      const v = vals.filter(x=>x!==null && x!==undefined);
      if(!v.length) return false;
      return this.abre(en, { sum:v.reduce((a,b)=>a+b,0), max:Math.max(...v), min:Math.min(...v),
        count:v.length, vals:v, simbolos:[] });
    };
  }
  use(skill, dieIds, targetIdx=0){
    if(!this.canUse(skill, dieIds)) return { ok:false, err:'requisito não satisfeito' };
    const ents = this.roll.filter(e=>dieIds.includes(e.dieId));
    const vals = resolvedValues(skill.req, ents, this.preferenciaCuringa(targetIdx));
    const ctx = {
      sum: vals.reduce((a,b)=>a+b,0),
      max: Math.max(...vals,0), min: Math.min(...vals,0),
      count: vals.length, val: vals[0]||0,
      blades: ents.filter(e=>e.face.k==='blade').length,
      ess: this.p.essence, hp: this.p.hp,
    };
    if(this.auras.has('preco_alto')) this.dmgPlayer(1, 'Preço Alto');
    this.alocar(ents, vals);              // é isto que as fechaduras leem
    this._gastos = ents;                  // 'bank' devolve destes, não da sobra
    // Eco (⟳): duplica o efeito do próximo (aqui: deste) uso
    const echoes = ents.filter(e=>e.face.k==='echo').length;
    for(const id of dieIds) this.used.add(id);
    const reps = 1 + (echoes>0?1:0);
    for(let i=0;i<reps;i++) this.applyEffects(skill.eff, ctx, targetIdx);
    this.L(`${skill.nome} (${vals.join(',')})${echoes?' ⟳ECO':''}`);
    this.checkEnd();
    return { ok:true, ctx };
  }

  /* ---------- PREVISÃO EXATA (§12/§15: zero informação oculta) ----------
     Roda os MESMOS efeitos num sandbox clonado e devolve o relatório.
     Nada de estimativa: é a resolução de verdade, só que descartada. */
  prever(skill, dieIds, targetIdx=0){
    const ents = this.roll.filter(e=>dieIds.includes(e.dieId) && !this.used.has(e.dieId));
    if(!ents.length || !satisfies(skill.req, ents)) return null;
    const vals = resolvedValues(skill.req, ents, this.preferenciaCuringa(targetIdx));
    const ctx = { sum:vals.reduce((a,b)=>a+b,0), max:Math.max(...vals,0), min:Math.min(...vals,0),
      count:vals.length, val:vals[0]||0,
      blades:ents.filter(e=>e.face.k==='blade').length, ess:this.p.essence, hp:this.p.hp };
    /* A ALOCAÇÃO é o que as fechaduras leem — e prever() não a montava.
       A prévia julgava a trava contra o golpe ANTERIOR: podia prometer dano
       onde daria zero, e mostrar zero onde abriria. */
    const alocOrig = this._aloc;
    this.alocar(ents, vals);
    // liga a contabilidade: a prévia precisa do golpe cheio, não só do resto
    this._contab = new Map(this.enemies.map(e=>[e.uid,
      { bruto:0, armadura:0, bloqueio:0, travado:false }]));
    // snapshot
    const eOrig=this.enemies, pOrig=this.p, logOrig=this.doLog, overOrig=this.over;
    const antesE=eOrig.map(e=>({hp:e.hp, block:e.block, st:{...e.statuses}}));
    const antesP={hp:pOrig.hp, block:pOrig.block, ess:pOrig.essence, st:{...pOrig.statuses}};
    this.enemies = eOrig.map(e=>({...e, statuses:{...e.statuses}}));
    this.p = {...pOrig, statuses:{...pOrig.statuses}};
    // SANDBOX: sem isso, simular uma jogada que te mataria (um reflexo de
    // espelho, p.ex.) fazia checkEnd() encerrar o combate DE VERDADE — e a
    // tela chama prever() só pra desenhar a prévia da carta.
    this.doLog=false; this._sandbox=true;
    try{
      const echoes=ents.filter(e=>e.face.k==='echo').length;
      for(let i=0;i<1+(echoes>0?1:0);i++) this.applyEffects(skill.eff, ctx, targetIdx);
    }catch(err){}
    const depoisE=this.enemies, depoisP=this.p;
    this.enemies=eOrig; this.p=pOrig; this.doLog=logOrig;
    this._sandbox=false; this.over=overOrig; this._aloc=alocOrig;
    // diff
    const contab = this._contab; this._contab = null;
    const alvos = depoisE.map((e,i)=>{
      const a=antesE[i];
      const dano = Math.max(0, (a.hp - e.hp));
      const novos=[]; for(const k in e.statuses){
        const d=(e.statuses[k]||0)-(a.st[k]||0); if(d>0) novos.push({st:k, n:d}); }
      const c = contab?.get(e.uid) || { bruto:0, armadura:0, bloqueio:0, travado:false };
      return { uid:e.uid, i, dano, morre: a.hp>0 && e.hp<=0, estados:novos, hpDepois:e.hp,
               bruto:c.bruto, defesa:c.armadura + c.bloqueio,
               armadura:c.armadura, bloqueio:c.bloqueio, travado:c.travado };
    }).filter(x=> x.dano>0 || x.estados.length || x.morre || x.bruto>0);
    return {
      alvos,
      bloqueio: Math.max(0, depoisP.block - antesP.block),
      custoHP:  Math.max(0, antesP.hp - depoisP.hp),
      curaHP:   Math.max(0, depoisP.hp - antesP.hp),
      essencia: Math.max(0, (depoisP.essence||0) - (antesP.ess||0)),
      dadosUsados: dieIds.slice(), valores: vals,
    };
  }

  /* quanto de um ataque inimigo REALMENTE passa pro seu HP (telegrafia §6) */
  previsaoInimigo(){
    let bloco=this.p.block, total=0, letal=false;
    const linhas=[];
    for(const en of this.aliveEnemies()){
      const it=en.intent; if(!it) continue;
      const vezes=(this.burdens.has('acao_dupla') && (this.turn+1)%3===0)?2:1;
      let bruto=0;
      if(it.t==='atk') bruto=it.v*vezes;
      else if(it.t==='atk_multi') bruto=it.v*it.n*vezes;
      if(bruto>0){
        const abs=Math.min(bloco,bruto); bloco-=abs;
        const passa=bruto-abs; total+=passa;
        linhas.push({uid:en.uid, bruto, passa});
      } else linhas.push({uid:en.uid, bruto:0, passa:0});
    }
    if(this.p.statuses.veneno) total+=this.p.statuses.veneno;
    if(this.p.statuses.sangramento) total+=this.p.statuses.sangramento;
    letal = total >= this.p.hp;
    return { linhas, total, letal };
  }

  /* ---------- interpretador de efeitos ---------- */
  applyEffects(effs, ctx, targetIdx){
    for(const e of effs||[]){
      const amt = e.amt!==undefined ? evalExpr(e.amt, ctx) : 0;
      switch(e.op){
        case 'dmg': this.dealDamage(e.tgt, amt, targetIdx, !!e.pierce); break;
        case 'hits': { const t=evalExpr(e.times,ctx);
          for(let i=0;i<t;i++) this.dealDamage(e.tgt, evalExpr(e.amt,ctx), targetIdx, !!e.pierce, i===0?1:0); break; }
        case 'block': this.p.block += amt + (this.M.blockBonus||0); break;
        case 'heal': { if(this.flags.has('sem_cura')) break;
                       const cut = this.burdens.has('cura_reduzida') ? 0.5 : 1;
                       this.p.hp = Math.min(this.p.maxHp, this.p.hp + Math.round(amt*cut)); break; }
        case 'selfdmg': this.dmgPlayer(amt, 'custo'); break;
        case 'status': this.forTargets(e.tgt, targetIdx, en=>{ en.statuses[e.st]=(en.statuses[e.st]||0)+evalExpr(e.n,ctx); }); break;
        case 'selfStatus': this.p.statuses[e.st]=(this.p.statuses[e.st]||0)+evalExpr(e.n,ctx); break;
        case 'exec': this.forTargets(e.tgt, targetIdx, en=>{
                       if(en.hp>0 && en.hp <= en.maxHp*e.pct){ en.hp=0; this.L(`EXECUÇÃO: ${en.nome}`); } }); break;
        case 'essence': this.p.essence += evalExpr(e.n,ctx); break;
        case 'bank': {          // devolve ao Círculo os dados que a habilidade GASTOU
          const n = evalExpr(e.n,ctx);
          const fonte = (this._gastos && this._gastos.length) ? this._gastos : this.pool();
          for(const g of fonte.slice(0, n)){ this.circle.push({...g, banked:true}); this.used.add(g.dieId); }
          break; }
        case 'wildify': { const alvo=this.pool()[0]; if(alvo){ alvo.face=face('wild',0); } break; }
        case 'copyLast': this.dealDamage(e.tgt||'chosen', Math.round(this.lastEnemyAttack*1.2), targetIdx, false); break;
        case 'stealDie': { const en=this.aliveEnemies()[0]; if(en&&en.dice){ en.dice=Math.max(0,en.dice-1); } break; }
        case 'freeze': this.forTargets(e.tgt, targetIdx, en=>{ en.statuses.congelado=(en.statuses.congelado||0)+evalExpr(e.n,ctx); }); break;

        /* ===== VERBOS DE QUEBRA-CABEÇA (§6) — cada classe abre a fechadura
           de um jeito diferente. É isto que faz a escolha de classe importar. */
        case 'arrombar':                         // CARRASCO: força bruta, só neste turno
          this.forTargets(e.tgt, targetIdx, en=>{ en._arrombada=true;
            this.L(`  ⚒ ${en.nome}: fechadura ARROMBADA`); }); break;
        case 'dissolver':                        // ARCANISTA: apaga a regra por N turnos
          this.forTargets(e.tgt, targetIdx, en=>{ en.travaOff=(en.travaOff||0)+evalExpr(e.n,ctx);
            this.L(`  ✦ ${en.nome}: fechadura DISSOLVIDA`); }); break;
        case 'ajustar': {                        // ORÁCULA: empurra dados na mão ±passo
          const passo=evalExpr(e.passo,ctx)||1, quantos=evalExpr(e.n,ctx)||1;
          const alvoEn=this.aliveEnemies()[Math.min(targetIdx,this.aliveEnemies().length-1)];
          let feitos=0;
          for(const p of this.pool()){
            if(feitos>=quantos) break;
            const v=entryValue(p); if(v===null) continue;
            const novo=this.melhorAjuste(p, v, passo, alvoEn);
            if(novo!==v){ p.face={...p.face, v:novo}; feitos++;
              this.L(`  ◈ dado ${v} → ${novo}`); }
          }
          break; }
        case 'definir': {                        // ORÁCULA (4ª): crava o valor que abre
          const quantos=evalExpr(e.n,ctx)||1;
          const alvoEn=this.aliveEnemies()[Math.min(targetIdx,this.aliveEnemies().length-1)];
          let feitos=0;
          for(const p of this.pool()){
            if(feitos>=quantos) break;
            const v=entryValue(p); if(v===null) continue;
            const novo=this.melhorAjuste(p, v, p.n, alvoEn);   // alcance total do dado
            p.face={...p.face, v:novo}; feitos++;
            this.L(`  ◈ dado cravado em ${novo}`);
          }
          break; }
        case 'marcar': this.forTargets(e.tgt, targetIdx, en=>{ en.statuses.marca=1; }); break;
      }
    }
  }
  /* pra onde empurrar um dado: o valor, dentro do alcance, que mais ajuda a
     abrir a fechadura do alvo (e, sem fechadura, o maior possível). */
  melhorAjuste(entry, v, passo, en){
    const lo=Math.max(1, v-passo), hi=Math.min(entry.n, v+passo);
    const t = en && this.travaDe(en);
    if(!t || en._arrombada || en.travaOff>0) return hi;
    const testa = x => travaAberta(t, { sum:x, max:x, min:x, count:1, vals:[x],
                                        simbolos:[] }, this, en);
    for(let d=0; d<=passo; d++){                 // o mais perto primeiro
      for(const x of [v+d, v-d]){ if(x<lo||x>hi) continue; if(testa(x)) return x; }
    }
    return hi;
  }
  aliveEnemies(){ return this.enemies.filter(e=>e.hp>0); }
  forTargets(tgt, idx, fn){
    const alive = this.aliveEnemies(); if(!alive.length) return;
    if(tgt==='all') alive.forEach(fn);
    else if(tgt==='front') fn(alive[0]);
    else if(tgt==='back') fn(alive[alive.length-1]);
    else if(tgt==='next') { const i=Math.min(idx+1, alive.length-1); fn(alive[i]); }
    else fn(alive[Math.min(idx, alive.length-1)]);   // 'chosen'
  }
  dealDamage(tgt, amt, idx, pierce, flatK=1){
    const frenesi = this.p.statuses.frenesi ? 1.5 : 1;
    const M = this.M||{};
    this.forTargets(tgt, idx, en=>{
      const vivo = en.hp>0;
      let d = Math.round((amt + ((M.dmgFlat||0) + (this._laminasRoladas||0))*flatK)
                         * frenesi * (M.dmgMult||1));
      if(en.statuses.marca){ d = Math.round(d*1.5); en.statuses.marca=0; }
      /* CONTABILIDADE do golpe (§12): a prévia mostrava só o que sobra no HP,
         então 11 de dano contra 11 de defesa aparecia como "0" e parecia que
         a habilidade não fazia nada. Aqui fica registrado o golpe cheio, o
         quanto a defesa comeu e o que entrou. */
      const ct = this._contab && this._contab.get(en.uid);
      if(ct) ct.bruto += d;
      // ===== FECHADURA (§6): o golpe errado simplesmente não fere =====
      let refletir = null;
      if(!pierce){
        const t = this.travaDe(en);
        if(t && !this.abre(en)){
          this.L(`  ✖ ${en.nome}: TRAVADO (${t.t}${t.v!==undefined?' '+t.v:''})`);
          if(ct) ct.travado = true;
          return;
        }
        const arm = Math.max(0, (en.statuses.armadura||0) + (en.armadura||0) - (M.pierce||0));
        const antesArm = d;
        d = Math.max(1, d - arm);
        if(ct) ct.armadura += (antesArm - d);
        if(en.block>0){ const abs=Math.min(en.block,d); en.block-=abs; d-=abs;
          if(ct) ct.bloqueio += abs; }
        // o espelho devolve o que ENTROU, não o que foi arremessado: refletir o
        // bruto cobrava pela armadura do próprio inimigo duas vezes
        refletir = t;
      }
      en.hp = Math.max(0, en.hp - d);
      if(d>0){ en._danoTurno = (en._danoTurno||0) + d; }
      if(d>0) this.L(`  → ${en.nome} sofre ${d} (HP ${en.hp}/${en.maxHp})`);
      // só marca o espelho como "já usado neste turno" se ele de fato disparou
      if(refletir && d>0 && travaRefleteAgora(refletir, this.aloc, en)){
        const volta = Math.max(1, Math.round(d*(refletir.v||30)/100));
        this.L(`  ⇄ ${en.nome} devolve ${volta}`);
        this.dmgPlayer(volta, 'espelho');
      }
      if(vivo && en.hp<=0 && en.explode){
        // A explosão estoura no CAMPO, não só na sua cara: quem está do lado
        // também leva. Deixa de ser pedágio e vira alvo de prioridade.
        const dano = Math.round(en.explode * (en.mult||1) * 0.55);
        this.L(`  💥 ${en.nome} EXPLODE (${dano})`);
        this.dmgPlayer(dano, 'explosão');
        const perto = this.aliveEnemies().filter(o=>o!==en);
        if(perto.length){
          const esp = Math.max(1, Math.round(dano*0.9));
          for(const o of perto){ o.hp = Math.max(0, o.hp - esp);
            this.L(`  💥 estilhaço → ${o.nome} sofre ${esp}`); }
        }
      }
      if(vivo && en.hp<=0){ for(const k of (this.p.relicKills||[])){
        if(k.block) this.p.block += k.block;
        if(k.heal && !this.flags.has('sem_cura')) this.p.hp=Math.min(this.p.maxHp, this.p.hp+k.heal); } }
    });
  }
  dmgPlayer(amt, motivo){
    if(amt<=0) return;
    // Invisível NÃO anula mais o turno inimigo: some 65% do golpe. Anular tudo
    // por 1 dado fazia a Lâmina-Sombra ignorar a dificuldade inteira.
    if(this.p.statuses.invisivel && motivo==='ataque'){
      const antes=amt; amt = Math.max(1, Math.round(amt*0.35));
      this.L(`  (invisível: ${antes} → ${amt})`); }
    let d = amt;
    const abs = Math.min(this.p.block, d); this.p.block-=abs; d-=abs;
    this.p.hp = Math.max(0, this.p.hp - d);
    if(d>0) this.L(`  ← você sofre ${d} de ${motivo} (HP ${this.p.hp})`);
    this.checkEnd();
  }

  /* ---------- FIM DO TURNO: sobra + inimigos (§5.2.5-6) ---------- */
  endTurn(){
    // SOBRA — cada classe converte diferente
    const sobra = this.pool();
    const cid = this.p.classe;
    if(sobra.length){
      if(cid==='carrasco'){ const dano=Math.floor(sobra.reduce((a,e)=>a+(entryValue(e)||0),0)/2);
        if(dano>0){ this.dealDamage('front', dano, 0, false); this.L(`sobra → retaguarda ${dano}`); } }
      else if(cid==='lamina'){ const alvo=this.aliveEnemies().slice().sort((a,b)=>a.hp-b.hp)[0];
        const v=Math.ceil(sobra.length/2);
        if(alvo){ alvo.statuses.veneno=(alvo.statuses.veneno||0)+v; this.L(`sobra → +${v} veneno`); } }
      else if(cid==='arcanista'){ for(const s of sobra) this.circle.push({...s}); this.L(`sobra → Círculo (${sobra.length})`); }
      else if(cid==='oracula'){ this.p.block += sobra.length; this.p.essence += Math.floor(sobra.length/2); }
    }
    // Fardo M10: o Abismo re-rola um dos seus dados depois de você jogar
    if(this.abyssReroll && this.roll.length){ const e=this.rng.pick(this.roll);
      e.face={...e.die.faces[this.rng.int(e.die.faces.length)]}; this.L('O Abismo re-rolou um dado seu.'); }

    /* Ampulheta Rachada: no 1º turno você joga de novo antes deles agirem */
    if(this.flags.has('turno_duplo') && this.turn===1 && !this._turnoExtraUsado){
      this._turnoExtraUsado = true;
      this.L('Ampulheta Rachada: você age de novo');
      this.startTurn(); this.turn--;      // mesma rodada, mão nova
      return this.over;
    }
    if(this.flags.has('sangra_turno')) this.dmgPlayer(4, 'Relógio Parado');
    // Linha de Prata: cada dado não usado vira 1 de bloqueio pro próximo turno
    if((this.p.relicTurns||[]).includes('sobra_bloqueio') && sobra.length){
      this.p.block += sobra.length;
      this.L(`Linha de Prata: +${sobra.length} de bloqueio`);
    }
    // aura Sem Sobra: terminar o turno com a mão vazia dói
    if(this.auras.has('sem_sobra') && !sobra.length) this.dmgPlayer(4, 'Sem Sobra');
    this.enemyTurn();
    // status de fim de turno
    this.tickStatuses();
    // dados travados liberam
    for(const d of this.p.bag){ if(d._travadoProx){ d._congelado=true;
                                  d._congeladoFace = d._guardaFace || face('void',0);
                                  d._travadoProx=false; d._guardaFace=null; }
                                else if(d._congelado){ d._congelado=false; } }
    this.checkEnd();
    if(!this.over) this.startTurn();
    return this.over;
  }

  enemyTurn(){
    this.acoesInimigo = [];      // o que CADA inimigo fez de fato (pra animar §10)
    // o bloqueio ganho no turno passado protegeu o SEU turno e expira agora,
    // logo antes deles agirem de novo
    for(const en of this.enemies) en.block = 0;
    for(const en of this.aliveEnemies()){
      const it = en.intent;
      if(!it) continue;
      // Fardo M4: inimigos agem 2x a cada 3 turnos
      const vezes = (this.burdens.has('acao_dupla') && this.turn%3===0) ? 2 : 1;
      for(let k=0;k<vezes;k++){
        if(en.hp<=0) break;
        const hp0=this.p.hp, bl0=this.p.block, reg={uid:en.uid, nome:en.nome, t:it.t, v:it.v, n:it.n, st:it.st};
        switch(it.t){
          case 'atk': { this.lastEnemyAttack = it.v;
            this.dmgPlayer(it.v, 'ataque');
            if(this.p.statuses.espinhos){ en.hp=Math.max(0,en.hp-this.p.statuses.espinhos); } break; }
          case 'atk_multi': { this.lastEnemyAttack=it.v;
            for(let i=0;i<it.n;i++) this.dmgPlayer(it.v,'ataque'); break; }
          case 'block': en.block += it.v; break;
          case 'buff': for(const o of this.aliveEnemies()) o.statuses.frenesi=1; break;
          case 'heal': { const alvo=this.aliveEnemies().sort((a,b)=>a.hp-b.hp)[0];
            if(alvo){ alvo.hp=Math.min(alvo.maxHp, alvo.hp+it.v); reg.curado=alvo.uid; } break; }
          case 'debuff': this.p.statuses[it.st]=(this.p.statuses[it.st]||0)+it.v; break;
          case 'curse': { const d=this.p.bag[this.rng.int(this.p.bag.length)];
            if(d){ d.faces[this.rng.int(d.faces.length)]=face('void',0); reg.dado=d.id;
                   this.L(`${en.nome} amaldiçoou um dado!`);} break; }
          case 'summon': break;   // resolvido pelo encontro

          /* ===== ELES MEXEM NOS SEUS DADOS — é aqui que o puzzle aperta ===== */
          case 'congelar': {      // o dado vem travado NESTA face no próximo turno
            const alv = this.roll.find(e=>e.die && !e.die._travadoProx) || this.roll[0];
            if(alv?.die){ alv.die._travadoProx=true; alv.die._guardaFace={...alv.face};
              reg.dado=alv.dieId; this.L(`${en.nome} CONGELOU um dado em ${alv.face.v??'?'}`); }
            break; }
          case 'roubar': {        // o dado some da SUA PRÓXIMA rolagem
            const cand = this.p.bag.filter(d=>!d._roubado);
            const alv = cand.length ? cand[this.rng.int(cand.length)] : null;
            if(alv){ alv._roubado = 1; reg.dado = alv.id;
              this.L(`${en.nome} ROUBOU um dado (some da próxima rolagem)`); }
            break; }
          case 'fraturar': {      // o dado perde 1 do seu máximo, pra sempre
            const d=this.p.bag[this.rng.int(this.p.bag.length)];
            const j=d&&d.faces.findIndex(f=>f.k==='num'&&f.v===Math.max(...d.faces.filter(x=>x.k==='num').map(x=>x.v)));
            if(d&&j>=0){ d.faces[j]={...d.faces[j], v:Math.max(1,d.faces[j].v-1)}; reg.dado=d.id;
              this.L(`${en.nome} FRATUROU um dado (máximo -1)`); }
            break; }
          case 'inverter': {      // trava o seu melhor dado na face OPOSTA
            const alv = this.roll.slice().filter(e=>entryValue(e)!==null && e.die)
                          .sort((a,b)=>(entryValue(b)||0)-(entryValue(a)||0))[0];
            if(alv){ const v=entryValue(alv), inv=Math.max(1,(alv.n+1)-v);
              alv.die._travadoProx=true; alv.die._guardaFace={k:'num', v:inv};
              reg.dado=alv.dieId; this.L(`${en.nome} INVERTEU o seu ${v} → ${inv}`); }
            break; }
          case 'contar': {        // conta até N e então a pá desce
            /* A CONTA era uma ampulheta INESCAPÁVEL: numa luta longa ela sozinha
               matava, e punia justamente quem mata devagar (Lâmina-Sombra).
               Agora ela é PARTE DO PUZZLE — machuque forte e a pá não desce. */
            const limiar = Math.max(4, Math.round(en.maxHp*0.15));
            const bateu  = (en._danoTurno||0) >= limiar;
            en._danoTurno = 0;
            if(bateu){ reg.conta = en._conta||0; reg.contaSegura = true;
              this.L(`${en.nome} leva a pancada — a pá NÃO desce (${en._conta||0}/${it.ate})`);
              break; }
            en._conta=(en._conta||0)+1; reg.conta=en._conta;
            this.L(`${en.nome} conta ${en._conta}/${it.ate}`);
            if(en._conta>=it.ate){ en._conta=0; this.dmgPlayer(Math.round(it.v*(en.mult||1)),'A CONTA'); }
            break; }
        }
        /* INVOCA: o subchefe chama reforço quando o campo esvazia */
        if(en.invoca && this.onInvocar && this.aliveEnemies().length < 3){
          const novo = this.onInvocar(en.invoca[this.rng.int(en.invoca.length)]);
          if(novo){ this.enemies.push(novo); reg.invocou = novo.nome;
            this.L(`${en.nome} INVOCA ${novo.nome}`); }
        }
        /* REERGUE: o chefe levanta um lacaio caído com metade da vida */
        if(en.reergue){
          const morto = this.enemies.find(o=>o.hp<=0 && o!==en);
          if(morto){ morto.hp = Math.max(1, Math.ceil(morto.maxHp*0.5));
            morto.statuses={}; morto.block=0; morto._arrombada=false;
            reg.reergueu = morto.nome;
            this.L(`${en.nome} REERGUE ${morto.nome} (${morto.hp} HP)`); }
        }
        reg.dano = hp0 - this.p.hp;                 // o que passou de verdade
        reg.aparado = Math.max(0, bl0 - this.p.block);
        this.acoesInimigo.push(reg);
      }
      this.chooseIntent(en);
    }
  }
  chooseIntent(en){
    const pad = en.padrao || [{t:'atk', v:en.dano||5}];
    en._ip = ((en._ip|0)+1) % pad.length;
    const nx = { ...pad[en._ip] };
    if(nx.v) nx.v = Math.round(nx.v * (en.mult||1));
    en.intent = nx;
  }
  tickStatuses(){
    if(this.auras.has('cura_colmeia'))            // "Inimigos se curam 3 por turno"
      for(const en of this.aliveEnemies()) en.hp = Math.min(en.maxHp, en.hp+3);
    for(const en of this.aliveEnemies()){
      if(en.statuses.veneno){ en.hp=Math.max(0,en.hp-en.statuses.veneno);
        en._danoTurno=(en._danoTurno||0)+en.statuses.veneno;
        if(!this.flags.has('veneno_eterno')) en.statuses.veneno--; }
      if(en.statuses.sangramento){ en.hp=Math.max(0,en.hp-en.statuses.sangramento);
        en._danoTurno=(en._danoTurno||0)+en.statuses.sangramento; en.statuses.sangramento--; }
      if(en.travaOff>0) en.travaOff--;
    }
    for(const k of ['veneno','sangramento']){ if(this.p.statuses[k]){ this.dmgPlayer(this.p.statuses[k], k); this.p.statuses[k]--; } }
    if(this.p.statuses.invisivel) this.p.statuses.invisivel--;
    if(this.p.statuses.espinhos)  this.p.statuses.espinhos--;
  }
  checkEnd(){
    if(this._sandbox) return null;   // prévia não termina combate
    if(this.over) return this.over;
    // Segundo Fôlego (Cofre): estava no bônus e nunca era lido
    if(this.p.hp<=0 && (this.p.revive>0) && !this.p._reviveuNaRun){
      this.p._reviveuNaRun = true;
      this.p.hp = Math.max(1, Math.round(this.p.maxHp * this.p.revive));
      this.L(`SEGUNDO FÔLEGO: você volta com ${this.p.hp} de HP`);
      return this.over;
    }
    if(this.p.hp<=0) this.over='lose';
    else if(!this.aliveEnemies().length) this.over='win';
    return this.over;
  }
}
