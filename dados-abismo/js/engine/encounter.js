/* ONDAS (§3.2) + escalada por masmorra (§3.3) */
import { ESCALADA, MASMORRAS } from '../data/dungeons.js';

function inst(base, mult, rng, isElite=false){
  const hp = Math.round(base.hp * mult.hp * (isElite?2.6:1));
  return { ...base, uid: base.id+'#'+rng.int(1e6),
    hp, maxHp:hp, block:0, statuses:{}, mult:mult.dano, elite:isElite,
    padrao: base.padrao, _ip:-1, intent:null };
}
/* ESCALADA DENTRO DA MASMORRA: o andar 9 não pode ser igual ao andar 1.
   Cada andar sobe HP e dano — a descida aperta o tempo todo, não só na troca. */
const porAndar = (esc, andar) => ({
  hp:   esc.hp   * (1 + (andar-1)*0.070),
  dano: esc.dano * (1 + (andar-1)*0.055),
});
export function buildWave(masmorra, andar, rng){
  const M = MASMORRAS[masmorra] || MASMORRAS[1];
  const base = ESCALADA[masmorra-1];
  const esc = { ...base, ...porAndar(base, andar) };
  const out=[];
  const addC = n => { for(let i=0;i<n;i++) out.push(inst(rng.pick(M.comuns), esc, rng)); };
  const addE = n => { for(let i=0;i<n;i++) out.push(inst(rng.pick(M.elites), esc, rng, true)); };
  // chefe/subchefe já são a parede do andar — escolta grande virava muro cego
  if(andar===5){ out.push(inst(M.subchefe, esc, rng)); addC(rng.range(1,2)); }
  else if(andar===10){ out.push(inst(M.chefe, esc, rng)); addC(rng.range(0,2)); }
  else if(andar<=2){ addC(rng.range(2,3)); if(masmorra>=2) addC(1); }
  else if(andar<=4){ addC(2); addE(1); if(rng.chance(0.5)) addC(1); }
  else if(andar<=7){ addE(1); addC(rng.range(3,4)); }
  else { addE(2); addC(rng.range(2,3)); }
  // Fardo M9: toda onda tem >=1 elite, elites vêm em pares
  if(esc.fardo==='elites_em_par' && andar!==10){
    const nE = out.filter(e=>e.elite).length; if(nE===0) addE(2); else if(nE%2===1) addE(1);
  }
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
