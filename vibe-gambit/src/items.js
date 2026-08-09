// =============================================================================
// items.js — SISTEMA DE ITENS (estilo ARPG / Path of Exile, enxuto).
//   - Cada item é uma INSTÂNCIA gerada: base + raridade + modificadores rolados.
//   - 4 raridades: Comum(0–1 mods) · Mágico(1–2) · Raro(2–3) · Lendário(4).
//   - Base do item = atributo principal do TIPO (espadão=ATK, cajado=MAG…),
//     escalando com o nível do item (profundidade da dungeon).
//   - Modificadores rolam atributos EXTRAS, enviesados pelo SLOT:
//       arma → ofensivo (ATK/velocidade) · peito → vida/defesa · pés → destreza.
//   - Sem DOM aqui: só dados + helpers puros. A UI vive em game.js.
// =============================================================================

import { HERO_WEAPON_ARCH } from './data.js';

// atributos do motor (os 6 de sempre) + rótulos amigáveis p/ a ficha
export const STAT_META = {
  atk: { icon:'⚔️', label:'Força',    short:'ATK' },
  def: { icon:'🛡️', label:'Resistência', short:'DEF' },
  mag: { icon:'🔮', label:'Inteligência', short:'MAG' },
  spd: { icon:'👟', label:'Destreza',  short:'SPD' },   // ↑ enche o ATB mais rápido
  hp:  { icon:'❤️', label:'Vida',      short:'HP'  },
  mp:  { icon:'💧', label:'Mana',      short:'MP'  },
};
export const STAT_KEYS = ['atk','def','mag','spd','hp','mp'];

// 4 raridades: cor + rank + [min,max] de modificadores
export const RARITY_META = {
  comum:    { label:'Comum',    color:'#9aa0a6', rank:0, mods:[0,1] },
  magico:   { label:'Mágico',   color:'#3a7bd5', rank:1, mods:[1,2] },
  raro:     { label:'Raro',     color:'#c9a227', rank:2, mods:[2,3] },
  lendario: { label:'Lendário', color:'#e0662a', rank:3, mods:[4,4] },
};
export const RARITY_ORDER = ['comum','magico','raro','lendario'];

export const SLOT_EMOJI = { weapon:'⚔️', head:'🪖', chest:'👕', hands:'🧤', feet:'👢', trinket:'💍' };
export const SLOT_LABEL = { weapon:'Arma', head:'Cabeça', chest:'Peito', hands:'Mãos', feet:'Pés', trinket:'Acessório' };

// --- BASES -------------------------------------------------------------------
// Armas: 1 base por ARQUÉTIPO de classe (só equipa quem usa aquele arquétipo).
// prim = atributo-base; base = valor no ilvl 1.
const WEAPON_BASES = {
  sword_shield:  { prim:'atk', base:9,  name:'Espada & Escudo' },
  hammer_shield: { prim:'atk', base:10, name:'Warhammer' },
  greataxe:      { prim:'atk', base:12, name:'Machado Gigante' },
  twin_blades:   { prim:'atk', base:8,  name:'Lâminas Duplas' },
  bow:           { prim:'atk', base:9,  name:'Arco Longo' },
  fists:         { prim:'atk', base:8,  name:'Manoplas' },
  arcane_staff:  { prim:'mag', base:10, name:'Cajado Arcano' },
  holy_scepter:  { prim:'mag', base:9,  name:'Cajado Sagrado' },
  lute:          { prim:'mag', base:8,  name:'Alaúde' },
  flasks:        { prim:'mag', base:8,  name:'Frascos' },
};
// Armadura: peso × parte. prim = atributo-base da peça. weight trava por classe.
const ARMOR_PRIM = {
  light:  { head:'mp',  chest:'mp',  hands:'mag', feet:'spd' },
  medium: { head:'def', chest:'def', hands:'atk', feet:'spd' },
  heavy:  { head:'def', chest:'hp',  hands:'def', feet:'def' },
};
const ARMOR_BASE   = { head:3, chest:5, hands:2, feet:3 };
const WEIGHT_MULT  = { light:1, medium:1.1, heavy:1.3 };
const WEIGHT_LABEL = { light:'Leve', medium:'Médio', heavy:'Pesado' };
const PART_NOUN = {
  light:  { head:'Capuz', chest:'Manto',    hands:'Luvas',    feet:'Sapatos' },
  medium: { head:'Capuz', chest:'Peitoral', hands:'Luvas',    feet:'Botas' },
  heavy:  { head:'Elmo',  chest:'Peitoral', hands:'Manoplas', feet:'Botas' },
};

export const BASES = {};
for(const [k,v] of Object.entries(WEAPON_BASES))
  BASES[k] = { key:k, slot:'weapon', prim:v.prim, base:v.base, name:v.name, arch:k };
for(const weight of ['light','medium','heavy'])
  for(const part of ['head','chest','hands','feet']){
    const k = `${weight}_${part}`;
    BASES[k] = { key:k, slot:part, prim:ARMOR_PRIM[weight][part],
      base:Math.max(1, Math.round(ARMOR_BASE[part]*WEIGHT_MULT[weight])),
      name:`${PART_NOUN[weight][part]} ${WEIGHT_LABEL[weight]}`, weight };
  }
BASES['ring']   = { key:'ring',   slot:'trinket', prim:'atk', base:2,  name:'Anel' };
BASES['amulet'] = { key:'amulet', slot:'trinket', prim:'hp',  base:10, name:'Amuleto' };

// pool de modificadores por SLOT: [stat, peso]. Enviesa o loot pro papel do slot.
const MOD_POOL = {
  weapon: [['atk',5],['spd',3],['mag',2],['hp',1],['def',1]],   // ofensivo
  head:   [['def',3],['mp',3],['mag',2],['hp',2]],
  chest:  [['hp',5],['def',4],['mp',1],['spd',1]],              // vida/defesa
  hands:  [['atk',4],['spd',2],['def',1],['mag',1]],
  feet:   [['spd',5],['def',2],['hp',2]],                       // destreza
  trinket:[['atk',2],['def',2],['mag',2],['spd',2],['hp',2],['mp',2]],
};

let SEQ = 0;
function modValue(stat, ilvl, rng){
  const scale = ({ hp:5, mp:3 })[stat] || 1;      // vida/mana rolam em números maiores
  const t = 1 + ilvl*0.5;
  return Math.max(1, Math.round(scale * t * (0.7 + rng()*0.7)));
}
function pickStat(pool, rng, used){
  const avail = pool.filter(([s]) => !used.has(s));
  const list = avail.length ? avail : pool;
  const tot = list.reduce((n,[,w]) => n+w, 0);
  let r = rng()*tot;
  for(const [s,w] of list){ if((r-=w) <= 0) return s; }
  return list[0][0];
}

// Gera uma INSTÂNCIA de item (base + raridade + mods rolados).
export function rollItem(baseKey, ilvl=1, rarity='comum', rng=Math.random){
  const base = BASES[baseKey]; if(!base) return null;
  const baseVal = Math.max(1, Math.round(base.base * (1 + ilvl*0.16)));
  const inst = {
    uid:'it'+(++SEQ), base:baseKey, slot:base.slot, arch:base.arch||null, weight:base.weight||null,
    name:base.name, ilvl, rarity, baseStat:{ [base.prim]: baseVal }, mods:[],
  };
  const [lo,hi] = RARITY_META[rarity].mods;
  const n = lo + Math.floor(rng()*(hi-lo+1));
  const pool = MOD_POOL[base.slot] || MOD_POOL.trinket;
  const used = new Set();
  for(let i=0;i<n;i++){
    const stat = pickStat(pool, rng, used); used.add(stat);
    inst.mods.push({ stat, val: modValue(stat, ilvl, rng) });
  }
  return inst;
}

// raridade sorteada (mais fundo na dungeon = chance um pouco maior de raro/lendário)
export function rarityRoll(ilvl=1, rng=Math.random){
  const w = [['comum',60],['magico',27],['raro',9+ilvl*0.5],['lendario',3+ilvl*0.3]];
  const tot = w.reduce((n,[,x]) => n+x, 0); let r = rng()*tot;
  for(const [k,x] of w){ if((r-=x) <= 0) return k; }
  return 'comum';
}
// um drop qualquer (base aleatória) do nível de item pedido
export function rollDrop(ilvl=1, rng=Math.random){
  const keys = Object.keys(BASES);
  return rollItem(keys[Math.floor(rng()*keys.length)], ilvl, rarityRoll(ilvl,rng), rng);
}

// --- helpers de leitura ------------------------------------------------------
export function itemTotals(inst){
  const out = {};
  if(!inst) return out;
  for(const k in (inst.baseStat||{})) out[k] = (out[k]||0) + inst.baseStat[k];
  for(const m of (inst.mods||[])) out[m.stat] = (out[m.stat]||0) + m.val;
  return out;
}
const POWER_W = { hp:0.28, mp:0.4, atk:1, def:1, mag:1, spd:1.1 };
export function itemPower(inst){
  const t = itemTotals(inst);
  let p = 0; for(const k in t) p += t[k]*(POWER_W[k]||1);
  return Math.round(p + RARITY_META[inst.rarity].rank*3);
}
export function sellPrice(inst){
  return Math.max(2, Math.round(itemPower(inst) * (1 + RARITY_META[inst.rarity].rank*0.9)));
}
export function itemIcon(inst){ return SLOT_EMOJI[inst.slot] || '❔'; }
export function rarityColor(inst){ return RARITY_META[inst.rarity]?.color || '#9aa0a6'; }

// pode o herói (def) equipar esta instância?
export function canEquip(def, inst){
  if(!inst || !def) return false;
  if(inst.slot === 'trinket') return true;                    // acessório: livre
  if(inst.slot === 'weapon')  return inst.arch === HERO_WEAPON_ARCH[def.id];
  return inst.weight === def.armorWeight;                      // armadura: peso da classe
}
