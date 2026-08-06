/* ONDAS (§3.2) + escalada por masmorra (§3.3) */
import { ESCALADA, MASMORRAS } from '../data/dungeons.js';
import { ALTERNATIVAS, mesmaTrava, seAnulam } from '../data/travas.js';

/* FECHADURA DINÂMICA (§6): o mesmo bicho não pode ter sempre a mesma
   resposta certa, senão o puzzle vira decoreba. A trava escrita na ficha
   continua sendo a identidade dele; por cima dela, cada COMBATE sorteia:

   - comum  → uma SEGUNDA CHAVE: o golpe abre pela regra dele OU pela nova;
   - elite  → a regra GIRA durante a luta, alternando a cada turno.

   O chefe já tem travaCiclo próprio na ficha e não é tocado. */
function fechaduraDoCombate(base, rng, isElite){
  if(base.travaCiclo && base.travaCiclo.length) return {};   // chefe: já gira
  const t = base.trava;
  if(!t) return {};                                          // sem trava continua sem
  const opcoes = ALTERNATIVAS.filter(a => !mesmaTrava(a,t) && !seAnulam(a,t));
  if(!opcoes.length) return {};
  const alt = rng.pick(opcoes);
  if(isElite){
    // gira entre as duas: o que abriu neste turno fecha no próximo
    return rng.chance(0.62) ? { travaCiclo:[t, alt], _giro:rng.int(2) } : {};
  }
  return rng.chance(0.58) ? { trava:{ t:'ou', alts:[t, alt] } } : {};
}
function inst(base, mult, rng, isElite=false){
  /* o bônus de elite é PEQUENO porque a ficha dele já é de elite: nas dez
     masmorras o elite escrito vale 2,8× a 4,0× o comum da mesma masmorra.
     Multiplicar 1,9 por cima disso contava a mesma coisa duas vezes — medido,
     o andar 1 da Masmorra 9 vinha com dois elites de 1306 e 1364 de HP ao
     lado de comuns de 174, e o fardo de lá obriga a ter dois. O que faz o
     elite ser elite é a ficha e a fechadura que gira, não um número inflado. */
  const hp = Math.round(base.hp * mult.hp * (isElite?1.25:1));
  return { ...base, uid: base.id+'#'+rng.int(1e6),
    hp, maxHp:hp, block:0, statuses:{}, mult:mult.dano, elite:isElite,
    padrao: base.padrao, _ip:-1, intent:null,
    ...fechaduraDoCombate(base, rng, isElite) };
}
/* ESCALADA DENTRO DA MASMORRA: o andar 9 não pode ser igual ao andar 1.
   Cada andar sobe HP e dano — a descida aperta o tempo todo, não só na troca. */
const porAndar = (esc, andar) => ({
  hp:   esc.hp   * (1 + (andar-1)*0.050),
  dano: esc.dano * (1 + (andar-1)*0.055),
});
/* cria UM inimigo pelo id — é o que o subchefe usa pra invocar reforço */
export function criarInimigo(masmorra, andar, id, rng){
  const M = MASMORRAS[masmorra] || MASMORRAS[1];
  const base = [...M.comuns, ...M.elites].find(e=>e.id===id);
  if(!base) return null;
  const esc = { ...ESCALADA[masmorra-1], ...porAndar(ESCALADA[masmorra-1], andar) };
  return inst(base, esc, rng, M.elites.includes(base));
}
export function buildWave(masmorra, andar, rng, flags=null){
  const M = MASMORRAS[masmorra] || MASMORRAS[1];
  const base = ESCALADA[masmorra-1];
  const esc = { ...base, ...porAndar(base, andar) };
  const out=[];
  const addC = n => { for(let i=0;i<n;i++) out.push(inst(rng.pick(M.comuns), esc, rng)); };
  const addE = n => { for(let i=0;i<n;i++) out.push(inst(rng.pick(M.elites), esc, rng, true)); };
  /* A ONDA CRESCE COM A DESCIDA. Antes o tamanho era o mesmo do começo ao
     fim (medido: máximo de 6, e só na M9 por causa do fardo), então as
     masmorras da frente eram as mesmas lutas com números maiores. Da M6 em
     diante a mesa enche de verdade: mais alvos competindo pelos MESMOS
     dados é o que obriga a escolher quem fica vivo mais um turno. */
  const fundo = masmorra >= 6 ? 1 : 0;        // +1 corpo por onda
  const abismo = masmorra >= 8 ? 1 : 0;       // e mais um lá embaixo
  // chefe/subchefe já são a parede do andar — escolta grande virava muro cego
  if(andar===5){ out.push(inst(M.subchefe, esc, rng)); addC(rng.range(1,2)+fundo); }
  else if(andar===10){ out.push(inst(M.chefe, esc, rng)); addC(rng.range(0,2)+fundo); }
  else if(andar<=2){ addC(rng.range(2,3)); if(masmorra>=2) addC(1); addC(fundo); }
  else if(andar<=4){ addC(2); addE(1); if(rng.chance(0.5)) addC(1); addC(fundo+abismo); }
  else if(andar<=7){ addE(1); addC(rng.range(3,4)+fundo+abismo); }
  /* o corpo extra do fundo do Abismo entra como COMUM, não como elite. Medido:
     com ele somando elite, a pancada do andar 8 pulava de 227 (M7) para 446
     (M8) — dobrava numa troca só de masmorra. A mesa continua cheia; o que
     muda é que ela enche de alvos, não de paredes. */
  else { addE(rng.range(1,2)); addC(rng.range(2,3)+fundo+abismo); }
  /* Fardo M9: toda onda tem >=1 elite, elites vêm em pares.
     Ele PROMOVE comuns, não empilha elites por cima. O texto antigo somava dois
     corpos novos numa onda que já tinha crescido com `fundo`/`abismo`: medido,
     o andar 1 da M9 vinha com 6,7 inimigos e 3741 de HP — mais que o andar 10
     da mesma masmorra. O fardo é para a onda ser mais DURA, não maior. */
  if(esc.fardo==='elites_em_par' && andar!==10){
    /* O PAR só vale de onde já nascem elites (andar 3+). Nos dois primeiros
       andares a onda é de comuns, então "em pares" promovia DOIS de uma vez e
       o andar 1 ficava mais pesado que o andar 3 — medido, era ali que 96%
       das descidas na Torre Invertida morriam, no primeiro combate. */
    const par = andar >= 3;
    const faltam = () => { const n = out.filter(e=>e.elite).length;
      return n===0 ? (par?2:1) : (par && n%2===1 ? 1 : 0); };
    for(let q=faltam(); q>0; q=faltam()){
      const i = out.findIndex(e=>!e.elite && !e.boss);
      if(i<0){ addE(q); break; }                      // onda só de elites: aí soma mesmo
      out[i] = inst(rng.pick(M.elites), esc, rng, true);
    }
  }
  // Língua de Prata: recompensa dobrada em troca de inimigos mais gordos
  if(flags && flags.has('dobro_recompensa')) out.forEach(e=>{
    e.hp = Math.round(e.hp*1.35); e.maxHp = e.hp; });
  // Fardo M2: armadura passiva
  if(esc.fardo==='armadura_passiva') out.forEach(e=> e.armadura=(e.armadura||0)+1);
  // aura de elite afeta o campo todo
  for(const e of out) if(e.aura?.id==='armadura_campo') out.forEach(o=>o.armadura=(o.armadura||0)+2);
  // primeira intenção telegrafada (§6)
  for(const e of out){ e._ip=-1; const pad=e.padrao||[{t:'atk',v:5}];
    e._ip=0; const nx={...pad[0]}; if(nx.v) nx.v=Math.round(nx.v*esc.dano); e.intent=nx; }
  return out;
}
export const burdensFor = m => { const out=[]; for(let i=2;i<=m;i++){ const f=ESCALADA[i-1].fardo; if(f) out.push(f);} return out; };
