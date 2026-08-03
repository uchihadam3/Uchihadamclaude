/* ========================================================================
   MOTOR DE COMBATE (§6) — PURO e testável. Sem UI, sem three.js.
   Determinístico: todo aleatório vem do RNG semeado passado no construtor.
   ===================================================================== */
import { satisfies, resolvedValues, findSubset, entryValue } from './requirements.js';
import { face } from '../data/faces.js';
import { RESPIRAR } from '../data/classes.js';

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
  invisivel:  { nome:'Invisível',  tick:'none', desc:'Inimigos erram você.' },
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
    this.p.block = 0;
    this.p.statuses = this.p.statuses || {};
    this.p.essence = this.p.essence || 0;
    this.M = this.p.relicMods || {};            // modificadores de relíquia (§9)
    this.flags = this.p.relicFlags || new Set();
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
    this.rerolls = Math.max(0, this.p.rerollsBase + (this.M.rerollBonus||0));
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
      const congelado = d._congelado;
      let f, fidx=0;
      if(congelado){ f = d._congeladoFace; }
      else {
        let idx = this.rng.int(d.faces.length); fidx=idx;
        f = d.faces[idx];
        // Fardo M6: dados que rolarem 1 ficam Travados por um turno
        if(this.burdens.has('um_trava') && f.k==='num' && f.v===1){ d._travadoProx = true; }
        // Fardo M3: dado Enferrujado tem face inútil (já vem na bolsa)
      }
      entries.push({ dieId:d.id, tipo:d.tipo, n:d.n, material:d.material, face:{...f}, faceIdx:fidx, die:d });
    }
    // Círculo do Arcanista entra junto (banking §7.3)
    for(const e of this.circle) entries.push({...e, banked:true});
    this.circle = [];
    this.roll = entries;
    // Pena de Sorte: rolagem terrível 3x seguidas -> re-rolagem grátis (invisível)
    const soma = entries.reduce((a,e)=>a+(entryValue(e)||0),0);
    const teto = entries.reduce((a,e)=>a+e.n,0);
    if(soma < teto*0.30){ this.pity++; if(this.pity>=3){ this.rerolls++; this.pity=0; this.L('(pena de sorte: +1 re-rolagem)'); } }
    else this.pity = 0;
    return entries;
  }

  /* re-rola um subconjunto (§5.2) */
  reroll(dieIds){
    if(this.rerolls<=0) return false;
    // Fardo M5: re-rolagens custam vida
    if(this.burdens.has('reroll_custa_vida')) this.dmgPlayer(2, 'preço da re-rolagem');
    this.rerolls--;
    for(const e of this.roll){
      if(!dieIds.includes(e.dieId) || this.used.has(e.dieId)) continue;
      if(e.die?._congelado) continue;
      const ix=this.rng.int(e.die.faces.length);
      e.face = {...e.die.faces[ix]}; e.faceIdx=ix;
    }
    return true;
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

  /* ---------- ALOCAR uma habilidade (§5.2.3) ---------- */
  canUse(skill, dieIds){
    const ents = this.roll.filter(e=>dieIds.includes(e.dieId) && !this.used.has(e.dieId));
    if(ents.length!==dieIds.length) return false;
    return satisfies(skill.req, ents);
  }
  use(skill, dieIds, targetIdx=0){
    if(!this.canUse(skill, dieIds)) return { ok:false, err:'requisito não satisfeito' };
    const ents = this.roll.filter(e=>dieIds.includes(e.dieId));
    const vals = resolvedValues(skill.req, ents);
    const ctx = {
      sum: vals.reduce((a,b)=>a+b,0),
      max: Math.max(...vals,0), min: Math.min(...vals,0),
      count: vals.length, val: vals[0]||0,
      blades: ents.filter(e=>e.face.k==='blade').length,
      ess: this.p.essence, hp: this.p.hp,
    };
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
    const vals = resolvedValues(skill.req, ents);
    const ctx = { sum:vals.reduce((a,b)=>a+b,0), max:Math.max(...vals,0), min:Math.min(...vals,0),
      count:vals.length, val:vals[0]||0,
      blades:ents.filter(e=>e.face.k==='blade').length, ess:this.p.essence, hp:this.p.hp };
    // snapshot
    const eOrig=this.enemies, pOrig=this.p, logOrig=this.doLog;
    const antesE=eOrig.map(e=>({hp:e.hp, block:e.block, st:{...e.statuses}}));
    const antesP={hp:pOrig.hp, block:pOrig.block, ess:pOrig.essence, st:{...pOrig.statuses}};
    this.enemies = eOrig.map(e=>({...e, statuses:{...e.statuses}}));
    this.p = {...pOrig, statuses:{...pOrig.statuses}};
    this.doLog=false;
    try{
      const echoes=ents.filter(e=>e.face.k==='echo').length;
      for(let i=0;i<1+(echoes>0?1:0);i++) this.applyEffects(skill.eff, ctx, targetIdx);
    }catch(err){}
    const depoisE=this.enemies, depoisP=this.p;
    this.enemies=eOrig; this.p=pOrig; this.doLog=logOrig;
    // diff
    const alvos = depoisE.map((e,i)=>{
      const a=antesE[i];
      const dano = Math.max(0, (a.hp - e.hp));
      const novos=[]; for(const k in e.statuses){
        const d=(e.statuses[k]||0)-(a.st[k]||0); if(d>0) novos.push({st:k, n:d}); }
      return { uid:e.uid, i, dano, morre: a.hp>0 && e.hp<=0, estados:novos, hpDepois:e.hp };
    }).filter(x=> x.dano>0 || x.estados.length || x.morre);
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
        case 'bank': { const pool=this.pool().slice(0, evalExpr(e.n,ctx));
                       for(const p of pool){ this.circle.push({...p}); this.used.add(p.dieId); } break; }
        case 'wildify': { const alvo=this.pool()[0]; if(alvo){ alvo.face=face('wild',0); } break; }
        case 'copyLast': this.dealDamage(e.tgt||'chosen', Math.round(this.lastEnemyAttack*1.2), targetIdx, false); break;
        case 'stealDie': { const en=this.aliveEnemies()[0]; if(en&&en.dice){ en.dice=Math.max(0,en.dice-1); } break; }
        case 'freeze': this.forTargets(e.tgt, targetIdx, en=>{ en.statuses.congelado=(en.statuses.congelado||0)+evalExpr(e.n,ctx); }); break;
      }
    }
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
      let d = Math.round((amt + (M.dmgFlat||0)*flatK) * frenesi * (M.dmgMult||1));
      if(en.statuses.marca){ d = Math.round(d*1.5); en.statuses.marca=0; }
      if(!pierce){
        const arm = Math.max(0, (en.statuses.armadura||0) + (en.armadura||0) - (M.pierce||0));
        d = Math.max(1, d - arm);
        if(en.block>0){ const abs=Math.min(en.block,d); en.block-=abs; d-=abs; }
      }
      en.hp = Math.max(0, en.hp - d);
      if(d>0) this.L(`  → ${en.nome} sofre ${d} (HP ${en.hp}/${en.maxHp})`);
      if(vivo && en.hp<=0){ for(const k of (this.p.relicKills||[])){
        if(k.block) this.p.block += k.block;
        if(k.heal && !this.flags.has('sem_cura')) this.p.hp=Math.min(this.p.maxHp, this.p.hp+k.heal); } }
    });
  }
  dmgPlayer(amt, motivo){
    if(amt<=0) return;
    if(this.p.statuses.invisivel && motivo==='ataque'){ this.L('  (invisível: errou)'); return; }
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

    if(this.flags.has('sangra_turno')) this.dmgPlayer(4, 'Relógio Parado');
    this.enemyTurn();
    // status de fim de turno
    this.tickStatuses();
    // dados travados liberam
    for(const d of this.p.bag){ if(d._travadoProx){ d._congelado=true; d._congeladoFace=face('void',0); d._travadoProx=false; }
                                else if(d._congelado){ d._congelado=false; } }
    this.checkEnd();
    if(!this.over) this.startTurn();
    return this.over;
  }

  enemyTurn(){
    this.acoesInimigo = [];      // o que CADA inimigo fez de fato (pra animar §10)
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
    for(const en of this.aliveEnemies()){
      if(en.statuses.veneno){ en.hp=Math.max(0,en.hp-en.statuses.veneno); en.statuses.veneno--; }
      if(en.statuses.sangramento){ en.hp=Math.max(0,en.hp-en.statuses.sangramento); en.statuses.sangramento--; }
      en.block = 0;
    }
    for(const k of ['veneno','sangramento']){ if(this.p.statuses[k]){ this.dmgPlayer(this.p.statuses[k], k); this.p.statuses[k]--; } }
    if(this.p.statuses.invisivel) this.p.statuses.invisivel--;
    if(this.p.statuses.espinhos)  this.p.statuses.espinhos--;
  }
  checkEnd(){
    if(this.over) return this.over;
    if(this.p.hp<=0) this.over='lose';
    else if(!this.aliveEnemies().length) this.over='win';
    return this.over;
  }
}
