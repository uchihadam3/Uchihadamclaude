// ============================================================================
// SISTEMA DE ITENS (armaduras + base p/ armas) — base FIXA + afixos ROLADOS.
//
// Princípios (alinhados com o design):
//  • Cada item tem uma BASE fixa (⚪ Comum) e ganha AFIXOS conforme a RARIDADE
//    sorteada no drop (Mágico +1, Raro +2, Lendário +3).
//  • Os afixos NÃO são aleatórios de qualquer coisa: cada SLOT tem um POOL
//    próprio (coerência). Ex.: Vida só em Elmo/Peitoral/Cinto (nunca em Luvas);
//    Crítico/Precisão em Luvas; Evasão em Botas. ARMAS só recebem ofensivo.
//  • Progressão contida (T1→T3): números pequenos e legíveis.
// ============================================================================
import t1_head from "../assets/item/armor/t1_head.png";
import t1_chest from "../assets/item/armor/t1_chest.png";
import t1_hands from "../assets/item/armor/t1_hands.png";
import t1_feet from "../assets/item/armor/t1_feet.png";
import t1_belt from "../assets/item/armor/t1_belt.png";
import t2_head from "../assets/item/armor/t2_head.png";
import t2_chest from "../assets/item/armor/t2_chest.png";
import t2_hands from "../assets/item/armor/t2_hands.png";
import t2_feet from "../assets/item/armor/t2_feet.png";
import t2_belt from "../assets/item/armor/t2_belt.png";
import t3_head from "../assets/item/armor/t3_head.png";
import t3_chest from "../assets/item/armor/t3_chest.png";
import t3_hands from "../assets/item/armor/t3_hands.png";
import t3_feet from "../assets/item/armor/t3_feet.png";
import t3_belt from "../assets/item/armor/t3_belt.png";

export type ArmorSlot = "head" | "chest" | "hands" | "feet" | "belt";
export type Rarity = "comum" | "magico" | "raro" | "lendario";

// chaves de afixo. As de armadura mapeiam direto nos secundários existentes;
// atkSpd/lifeSteal/cdr são do pool OFENSIVO das armas (entram com as armas).
export type AffixKey =
  | "str" | "dex" | "int"
  | "hp" | "def" | "magRes" | "evasion"
  | "crit" | "critDmg" | "precision" | "mana"
  | "atkPhys" | "atkMag" | "atkSpd" | "lifeSteal" | "cdr";

export type StatBonus = Partial<Record<AffixKey, number>>;

// ---------------------------------------------------------------- RARIDADE
export interface RarityDef { key: Rarity; label: string; affixes: number; weight: number; color: string; }
export const RARITIES: RarityDef[] = [
  { key: "comum",    label: "Comum",    affixes: 0, weight: 65, color: "#b9b4a6" },
  { key: "magico",   label: "Mágico",   affixes: 1, weight: 26, color: "#4a90e2" },
  { key: "raro",     label: "Raro",     affixes: 2, weight: 8,  color: "#e8b24a" },
  { key: "lendario", label: "Lendário", affixes: 3, weight: 1,  color: "#ff8a2e" },
];
export const RARITY_BY_KEY: Record<Rarity, RarityDef> =
  Object.fromEntries(RARITIES.map((r) => [r.key, r])) as Record<Rarity, RarityDef>;

// ------------------------------------------------------------------ AFIXOS
// range[tier-1] = [min,max] do valor rolado naquele tier. pct = mostra "%".
// rareOnly = só rola em Raro/Lendário (afixos "fortes", hoje só das armas).
interface AffixDef { label: string; pct?: boolean; rareOnly?: boolean; range: [number, number][]; }
export const AFFIXES: Record<AffixKey, AffixDef> = {
  str:       { label: "Força",         range: [[1, 2], [2, 3], [3, 4]] },
  dex:       { label: "Destreza",      range: [[1, 2], [2, 3], [3, 4]] },
  int:       { label: "Inteligência",  range: [[1, 2], [2, 3], [3, 4]] },
  hp:        { label: "Vida",          range: [[3, 6], [6, 10], [10, 16]] },
  def:       { label: "Defesa",        range: [[1, 2], [2, 3], [3, 4]] },
  magRes:    { label: "Res. Mágica",   range: [[1, 2], [2, 3], [3, 4]] },
  evasion:   { label: "Evasão", pct: true, range: [[1, 2], [1, 2], [2, 3]] },
  crit:      { label: "Crítico", pct: true, range: [[1, 2], [1, 2], [2, 3]] },
  critDmg:   { label: "Dano Crítico", pct: true, range: [[3, 6], [4, 8], [6, 10]] },
  precision: { label: "Precisão", pct: true, range: [[1, 2], [2, 3], [2, 3]] },
  mana:      { label: "Mana",          range: [[3, 6], [6, 10], [10, 16]] },
  atkPhys:   { label: "Atq. Físico",   range: [[1, 2], [2, 3], [3, 5]] },
  atkMag:    { label: "Atq. Mágico",   range: [[1, 2], [2, 3], [3, 5]] },
  atkSpd:    { label: "Vel. Ataque", pct: true, range: [[2, 4], [3, 5], [4, 6]] },
  lifeSteal: { label: "Roubo de Vida", pct: true, rareOnly: true, range: [[1, 2], [1, 2], [2, 3]] },
  cdr:       { label: "Red. Recarga", pct: true, rareOnly: true, range: [[1, 2], [1, 2], [2, 3]] },
};

// POOL POR SLOT. Duas regras:
//  • Os TRÊS atributos (str/dex/int) podem rolar em QUALQUER peça — as armaduras
//    são universais, então um mago pode achar um peitoral com Inteligência e um
//    guerreiro o mesmo peitoral com Força (nada de item "morto" p/ a classe).
//  • Os stats TEMÁTICOS ficam onde fazem sentido (e são úteis a todas as classes):
//    Vida no elmo/peitoral/cinto, crítico/precisão nas luvas, evasão nas botas.
const ATTRS: AffixKey[] = ["str", "dex", "int"];
export const SLOT_AFFIX_POOL: Record<ArmorSlot, AffixKey[]> = {
  head:  [...ATTRS, "hp", "def", "magRes"],       // elmo: aguenta
  chest: [...ATTRS, "hp", "def", "magRes"],       // peitoral: a peça-tanque (mais Vida)
  hands: [...ATTRS, "def", "crit", "precision"],  // luvas: mãos → crítico/precisão
  feet:  [...ATTRS, "def", "evasion"],            // botas: mobilidade/evasão
  belt:  [...ATTRS, "hp", "def", "mana", "magRes"], // cinto: sustento/utilidade
};
// POOL OFENSIVO das ARMAS (só ofensivo — entra quando as armas virarem instância):
export const WEAPON_AFFIX_POOL_MELEE: AffixKey[] = ["atkPhys", "crit", "critDmg", "atkSpd", "str", "lifeSteal"];
export const WEAPON_AFFIX_POOL_CASTER: AffixKey[] = ["atkMag", "crit", "critDmg", "atkSpd", "int", "mana"];

// -------------------------------------------------------------- BASE FIXA
// Base (⚪) por peça e tier. Set completo de Defesa: 8 → 15 → 24.
const ARMOR_BASE: Record<ArmorSlot, StatBonus[]> = {
  head:  [{ def: 2 },        { def: 4 },         { def: 6 }],
  chest: [{ def: 3, hp: 6 }, { def: 5, hp: 10 }, { def: 8, hp: 16 }],
  hands: [{ def: 1 },        { def: 2 },         { def: 3 }],
  feet:  [{ def: 1, evasion: 1 }, { def: 2, evasion: 1 }, { def: 4, evasion: 2 }],
  belt:  [{ def: 1, hp: 3 }, { def: 2, hp: 5 },  { def: 3, hp: 8 }],
};
const PIECE_NAME: Record<ArmorSlot, string> = { head: "Elmo", chest: "Peitoral", hands: "Luvas", feet: "Botas", belt: "Cinto" };
const MATERIAL: Record<number, string> = { 1: "Couro", 2: "Cobre", 3: "Bronze" };
const ICON: Record<ArmorSlot, string[]> = {
  head:  [t1_head, t2_head, t3_head],
  chest: [t1_chest, t2_chest, t3_chest],
  hands: [t1_hands, t2_hands, t3_hands],
  feet:  [t1_feet, t2_feet, t3_feet],
  belt:  [t1_belt, t2_belt, t3_belt],
};
export const ARMOR_SLOTS: ArmorSlot[] = ["head", "chest", "hands", "feet", "belt"];
export const ARMOR_TIERS = [1, 2, 3];

// ------------------------------------------------------------- INSTÂNCIA
export interface RolledAffix { key: AffixKey; value: number; pct: boolean; label: string; }
export interface ItemInstance {
  uid: string;
  kind: "armor";
  slot: ArmorSlot;
  tier: number;
  rarity: Rarity;
  name: string;      // ex.: "Peitoral de Bronze"
  icon: string;
  base: StatBonus;
  affixes: RolledAffix[];
}

let UID = 0;
export function resetItemUid() { UID = 0; }

function randInt(lo: number, hi: number, rng: () => number) { return lo + Math.floor(rng() * (hi - lo + 1)); }
function weightedRarity(rng: () => number): Rarity {
  const total = RARITIES.reduce((s, r) => s + r.weight, 0);
  let t = rng() * total;
  for (const r of RARITIES) { if ((t -= r.weight) < 0) return r.key; }
  return "comum";
}
// rola N afixos DISTINTOS do pool do slot (respeitando rareOnly)
function rollAffixes(pool: AffixKey[], tier: number, count: number, rarity: Rarity, rng: () => number): RolledAffix[] {
  const legendary = rarity === "lendario";
  const rareUp = rarity === "raro" || rarity === "lendario";
  const avail = pool.filter((k) => !AFFIXES[k].rareOnly || rareUp);
  const out: RolledAffix[] = [];
  const bag = avail.slice();
  for (let i = 0; i < count && bag.length; i++) {
    const idx = Math.floor(rng() * bag.length);
    const key = bag.splice(idx, 1)[0];
    const def = AFFIXES[key];
    const [lo, hi] = def.range[Math.min(tier, 3) - 1];
    // Lendário puxa o valor pro topo da faixa
    const value = legendary ? randInt(Math.ceil((lo + hi) / 2), hi, rng) : randInt(lo, hi, rng);
    out.push({ key, value, pct: !!def.pct, label: def.label });
  }
  return out;
}

// Gera uma peça de armadura. Sem opts, sorteia a raridade pelos pesos.
export function generateArmor(slot: ArmorSlot, tier: number, opts?: { rarity?: Rarity; rng?: () => number }): ItemInstance {
  const rng = opts?.rng ?? Math.random;
  tier = Math.max(1, Math.min(3, tier));
  const rarity = opts?.rarity ?? weightedRarity(rng);
  const rdef = RARITY_BY_KEY[rarity];
  const affixes = rollAffixes(SLOT_AFFIX_POOL[slot], tier, rdef.affixes, rarity, rng);
  return {
    uid: "it" + (++UID),
    kind: "armor",
    slot,
    tier,
    rarity,
    name: `${PIECE_NAME[slot]} de ${MATERIAL[tier]}`,
    icon: ICON[slot][tier - 1],
    base: { ...ARMOR_BASE[slot][tier - 1] },
    affixes,
  };
}

// soma a base + afixos de uma instância num único StatBonus
export function itemTotal(it: ItemInstance): StatBonus {
  const out: StatBonus = { ...it.base };
  for (const a of it.affixes) out[a.key] = (out[a.key] ?? 0) + a.value;
  return out;
}
// resumo legível do item (nome + raridade + base + afixos) — usado no tooltip
export function itemSummary(it: ItemInstance): string {
  const rar = RARITY_BY_KEY[it.rarity].label;
  const fmt = (k: AffixKey, v: number) => `${v > 0 ? "+" : ""}${v}${AFFIXES[k].pct ? "%" : ""} ${AFFIXES[k].label}`;
  const baseParts = (Object.keys(it.base) as AffixKey[]).map((k) => fmt(k, it.base[k] ?? 0));
  const lines = [`${it.name} · ${rar}`, `Base: ${baseParts.join(", ")}`];
  if (it.affixes.length) lines.push(`Afixos: ${it.affixes.map((a) => fmt(a.key, a.value)).join(", ")}`);
  return lines.join("\n");
}
// soma o bônus de VÁRIAS instâncias equipadas
export function sumBonuses(items: (ItemInstance | null | undefined)[]): StatBonus {
  const out: StatBonus = {};
  for (const it of items) {
    if (!it) continue;
    const t = itemTotal(it);
    for (const k in t) out[k as AffixKey] = (out[k as AffixKey] ?? 0) + (t[k as AffixKey] ?? 0);
  }
  return out;
}
