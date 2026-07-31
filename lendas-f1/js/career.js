/* ========================================================================
   LENDAS DA F1 — CARREIRA (roguelite de progressão, estilo "lenda")
   Save em 3 slots (localStorage) + meta permanente (árvore de lendas).
   Você começa com um piloto/carro fraco, corre a temporada, melhora entre
   corridas, tenta o título — e ganha pontos de LENDA (permanentes) no fim.
   ===================================================================== */
import { DRIVERS, overall } from './drivers.js';
import { CIRCUIT_LIST } from './circuits-data.js';

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
export function loadMeta(){ try{ return JSON.parse(localStorage.getItem(KMETA))||{legacyPts:0,tree:{}}; }catch(e){ return {legacyPts:0,tree:{}}; } }
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
    car, drvBonus, round:0, standings:{}, history:[], created:Date.now() };
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
