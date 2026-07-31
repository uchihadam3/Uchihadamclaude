/* ========================================================================
   LENDAS DA F1 — CARREIRA (roguelite de progressão, estilo "lenda")
   Save em 3 slots (localStorage) + meta permanente (árvore de lendas).
   Você começa com um piloto/carro fraco, corre a temporada, melhora entre
   corridas, tenta o título — e ganha pontos de LENDA (permanentes) no fim.
   ===================================================================== */
import { DRIVERS, overall } from './drivers.js';
import { CIRCUIT_LIST } from './circuits-data.js';
import { carStats } from './stats.js';

/* pilotos INICIAIS (os mais fracos do grid — você começa por baixo) */
export const START_DRIVERS = ['Franco Colapinto','Gabriel Bortoleto','Oliver Bearman','Liam Lawson','Lance Stroll'];

export const CAR_SYS = [
  {key:'motor',  nome:'Motor',        icon:'⚙️', desc:'Potência e velocidade de reta'},
  {key:'aero',   nome:'Aerodinâmica', icon:'🪁', desc:'Velocidade nas curvas'},
  {key:'chassi', nome:'Chassi',       icon:'🧩', desc:'Tração e frenagem'},
  {key:'pneus',  nome:'Pneus',        icon:'🛞', desc:'Aderência e desgaste'},
];
export const DRV_SKILLS = [
  {key:'ritmo',nome:'Ritmo'},{key:'corrida',nome:'Corrida'},{key:'ultrapassagem',nome:'Ultrapassagem'},
  {key:'defesa',nome:'Defesa'},{key:'chuva',nome:'Chuva'},{key:'consistencia',nome:'Consistência'},
];

/* CALENDÁRIO da temporada (10 GPs clássicos) */
export const SEASON = ['bahrain','albertpark','baku','miami','monaco','silverstone','spa','suzuka','mexico','interlagos'];
export const circuitInfo = k=> CIRCUIT_LIST.find(c=>c.key===k) || CIRCUIT_LIST[0];

/* ÁRVORE DE LENDAS (permanente, entre saves) */
export const LEGACY = [
  {id:'patroc',    nome:'Patrocínio', icon:'💰', max:5, cost:1, desc:'+15% de dinheiro por corrida'},
  {id:'garagem',   nome:'Garagem',    icon:'🏭', max:5, cost:1, desc:'Carro começa +1 nível em tudo'},
  {id:'talento',   nome:'Talento',    icon:'⭐', max:5, cost:1, desc:'Piloto começa +2 em tudo'},
  {id:'engenharia',nome:'Engenharia', icon:'🛠️', max:5, cost:2, desc:'Melhorias custam 12% menos'},
  {id:'aura',      nome:'Aura de Lenda',icon:'🏆',max:3, cost:3, desc:'Largada média melhor'},
];

/* ---------- persistência ---------- */
const KMETA='lf1_meta', KSLOT=i=>'lf1_slot'+i;
export function loadMeta(){ let m; try{ m=JSON.parse(localStorage.getItem(KMETA)); }catch(e){}
  m=m||{}; if(m.legacyPts==null)m.legacyPts=0; if(!m.tree)m.tree={}; if(m.fame==null)m.fame=0; return m; }
export function saveMeta(m){ try{ localStorage.setItem(KMETA, JSON.stringify(m)); }catch(e){} }
export function loadSlot(i){ try{ return JSON.parse(localStorage.getItem(KSLOT(i)))||null; }catch(e){ return null; } }
export function saveSlot(i,d){ try{ localStorage.setItem(KSLOT(i), JSON.stringify(d)); }catch(e){} }
export function deleteSlot(i){ try{ localStorage.removeItem(KSLOT(i)); }catch(e){} }
const treeLvl=id=>{ const m=loadMeta(); return (m.tree&&m.tree[id])||0; };

/* ---------- criar carreira nova ---------- */
export function newCareer(driverName, slot){
  const g=treeLvl('garagem'), tal=treeLvl('talento');
  const base=DRIVERS.find(d=>d.nome===driverName)||DRIVERS[DRIVERS.length-1];
  const car={motor:1+g,aero:1+g,chassi:1+g,pneus:1+g};
  const drvBonus={ritmo:tal*2,corrida:tal*2,ultrapassagem:tal*2,defesa:tal*2,chuva:tal*2,consistencia:tal*2};
  return { slot, name:driverName, driver:driverName, team:base.team, money:180,
    car, drvBonus, round:0, standings:{}, history:[], created:Date.now(),
    qualiDone:false, grid:null, startPos:null, playerQ:null, qualiTimes:null };
}

/* ---------- upgrades ---------- */
export function upgCost(level){ const base=Math.round(55*Math.pow(1.33, level));
  return Math.max(20, Math.round(base*(1-0.12*treeLvl('engenharia')))); }

/* ---------- loadout do jogador pra corrida ---------- */
export function loadout(career){
  const base=DRIVERS.find(d=>d.nome===career.driver)||DRIVERS[0];
  const b=career.drvBonus||{};
  const attrs={};
  for(const k of ['ritmo','corrida','ultrapassagem','defesa','chuva','consistencia','experiencia'])
    attrs[k]=Math.min(99,(base[k]||78)+(b[k]||0));
  const c=career.car;
  const perf={
    power: 800 + c.motor*13, traction: 10.2 + c.chassi*0.13, top: 86 + c.motor*0.85,
    corner: 0.965 + c.aero*0.007, brake0: 17.5 + c.chassi*0.16,
    wear: Math.max(0.55, 1.25 - c.pneus*0.03),
    geral: 68 + (c.motor+c.aero+c.chassi+c.pneus)*1.05,   // ~72..152 (vira ritmo)
  };
  return { driverName:career.driver, team:base.team, attrs, perf, aura:treeLvl('aura') };
}

/* overalls pra exibir */
const DW={ritmo:0.24,corrida:0.24,ultrapassagem:0.14,defesa:0.12,chuva:0.10,consistencia:0.10,experiencia:0.06};
export function drvOverall(career){ const a=loadout(career).attrs; let s=0; for(const k in DW) s+=a[k]*DW[k]; return Math.round(s); }
export function carOverall(car){ return Math.round(50 + (car.motor+car.aero+car.chassi+car.pneus)/4*3.4); }

/* recompensa por posição (1..20) */
export function reward(pos){
  const p=treeLvl('patroc');
  const money=Math.round((Math.max(0,21-pos)*13 + (pos<=3?[0,80,55,40][pos]:0))*(1+0.15*p));
  const PTS=[25,18,15,12,10,8,6,4,2,1]; const pts=pos>=1&&pos<=10?PTS[pos-1]:0;
  return {money, pts};
}
/* pontos de LENDA ao fim da temporada, pela posição final no campeonato */
export function legacyReward(champPos){ return Math.max(1, 12 - (champPos-1)*1.2)|0; }

/* ======================= CLASSIFICAÇÃO (QUALIFYING) =======================
   Você faz uma volta rápida sozinho na pista; os outros pilotos já têm o
   tempo deles marcado. Junta tudo, ordena por tempo -> grid de largada. */
const QK=0.085;                                        // segundos por ponto de ritmo (spread do grid)
const paceOfDriver = d => carStats(d.team).geral*0.62 + overall(d)*0.38;
export function playerPace(career){
  const lo=loadout(career); let ov=0; for(const k in DW) ov+=(lo.attrs[k]||78)*DW[k];
  return lo.perf.geral*0.62 + ov*0.38;
}
function qBase(trackKey){ const ci=circuitInfo(trackKey); return (ci.km/205)*3600; }  // ~volta de referência (s)
function seedN(str){ let x=0; for(const c of str) x=(x*131+c.charCodeAt(0))|0; return (((x>>>0)%10000)/10000-0.5)*2; }

/* campo de classificação ordenado. Se `playerLap` vier, ancora os tempos na
   volta REAL que o jogador fez (pra bater com o cronômetro da pista). */
export function qualiField(career, trackKey, playerLap){
  const round=career.round||0, P_p=playerPace(career);
  const list=DRIVERS.map(d=>{
    const isP=d.nome===career.driver;
    const pace=isP?P_p:paceOfDriver(d);
    const noise=seedN(d.nome+'|'+trackKey+'|'+round)*0.55;   // ±0.55s de variação por sessão
    return { name:d.nome, team:d.team, num:d.num, pace, isP, noise };
  });
  const POLE=Math.max(...list.map(x=>x.pace));
  list.forEach(x=> x.rel=(POLE-x.pace)*QK + x.noise );
  let anchor;
  if(playerLap){ const p=list.find(x=>x.isP); anchor=playerLap - p.rel; }
  else { anchor=qBase(trackKey) - Math.min(...list.map(x=>x.rel)); }
  list.forEach(x=> x.time=Math.max(1,anchor+x.rel));
  list.sort((a,b)=>a.time-b.time);
  return list;
}
export function finalizeQuali(career, playerLap){
  const list=qualiField(career, SEASON[career.round], playerLap);
  career.grid=list.map(x=>x.name);
  career.startPos=list.findIndex(x=>x.isP)+1;
  career.playerQ=playerLap;
  career.qualiTimes=list.map(x=>({name:x.name,team:x.team,time:x.time,isP:x.isP}));
  career.qualiDone=true;
  return { list, startPos:career.startPos };
}
export function resetQuali(career){ career.qualiDone=false; career.grid=null; career.startPos=null; career.playerQ=null; career.qualiTimes=null; }
export const fmtT = s=>{ if(!s||s<1) return '—'; const m=Math.floor(s/60), sec=s-m*60; return m+':'+sec.toFixed(3).padStart(6,'0'); };
