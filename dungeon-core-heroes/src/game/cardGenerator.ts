import type { ChosenCard, EquipDef, EquipState, Rarity, SkillDef, SkillMods, StatKey, UpgradeCard } from '../types';
import { EQUIP_MILESTONES, SKILL_MILESTONES } from '../data/equipmentData';
import {
  EQUIP_TPLS, EVOLUTIONS_BY_SKILL, MUTATIONS_BY_SKILL, PROC_TPLS,
  RARITIES, RARITY_SCALE, SKILL_TPLS, type EquipTpl, type MorphDef, type ProcTpl, type SkillTpl,
} from '../data/upgradePools';
import { SKILL_BY_ID } from '../data/skillsData';
import { EQUIP_BY_ID } from '../data/equipmentData';
import { hashStr, makeRng, mix, type Rng } from './rng';

// ============ APRESENTAÇÃO DE RARIDADE ============
export const RARITY_LABEL: Record<Rarity, string> = {
  comum: 'Comum', incomum: 'Incomum', rara: 'Rara', epica: 'Épica', lendaria: 'Lendária',
};
export const RARITY_COLOR: Record<Rarity, string> = {
  comum: '#9aa4b2', incomum: '#5ec86e', rara: '#4a9ef0', epica: '#b46ef0', lendaria: '#f0a838',
};
export const RARITY_GLOW: Record<Rarity, string> = {
  comum: '#c8d0da', incomum: '#a8f0b4', rara: '#a8d0ff', epica: '#e0b8ff', lendaria: '#ffe0a0',
};
const RIDX: Record<Rarity, number> = { comum: 0, incomum: 1, rara: 2, epica: 3, lendaria: 4 };

// ============ CONTEXTO DE OFERTA ============
export interface OfferCtx {
  seedRun: number;                  // seed do save (determinismo)
  kind: 'skill' | 'equip';
  targetId: string;                 // id da habilidade ou equipamento
  fromLevel: number;                // nível ANTES da melhoria (oferta leva a fromLevel+1)
  rerollIndex?: number;             // 0 = primeira oferta; +1 a cada Runa de Reescolha
  sealBonus?: number;               // Selo de Escolha: 1 = garante raridade elevada em 1 carta
  deepestDungeon?: number;          // maior dungeon liberada (sorte)
  refused?: Record<string, number>; // poolId -> vezes recusado (anti-spam)
  ownedPools?: string[];            // poolIds já escolhidos neste alvo (procs únicos, stacks)
  chosenCards?: ChosenCard[];       // histórico para contar stacks
}

// ---------- sorte / raridade ----------
function luckOf(ctx: OfferCtx, newLevel: number): number {
  const lvlLuck = Math.min(1, (newLevel - 1) / 12) * 0.45;
  const depthLuck = Math.min(1, ((ctx.deepestDungeon ?? 1) - 1) / 9) * 0.4;
  return Math.min(1, lvlLuck + depthLuck);
}

const BASE_LO = [52, 30, 13, 4, 1];
const BASE_HI = [8, 22, 32, 24, 14];

function rollRarity(rng: Rng, luck: number, allowed: Rarity[]): Rarity {
  const w = allowed.map((r) => {
    const i = RIDX[r];
    return BASE_LO[i] * (1 - luck) + BASE_HI[i] * luck;
  });
  let total = 0;
  for (const v of w) total += v;
  let x = rng.next() * total;
  for (let i = 0; i < allowed.length; i++) { x -= w[i]; if (x <= 0) return allowed[i]; }
  return allowed[allowed.length - 1];
}

function bumpRarity(r: Rarity, allowed: Rarity[]): Rarity {
  const idx = RIDX[r];
  for (let want = idx + 1; want <= 4; want++) {
    const found = allowed.find((a) => RIDX[a] === want);
    if (found) return found;
  }
  return r;
}

function stacksUsed(ctx: OfferCtx, poolId: string): number {
  if (!ctx.chosenCards) return 0;
  let n = 0;
  for (const c of ctx.chosenCards) if (c.poolId === poolId) n++;
  return n;
}

// ---------- construção de cartas ----------
function buildSkillCard(tpl: SkillTpl, rarity: Rarity, s: SkillDef, serial: number): UpgradeCard {
  const ti = RIDX[rarity];
  const mag = tpl.base * RARITY_SCALE[ti];
  const mod = tpl.make(mag, ti);
  return {
    uid: `${tpl.id}#${rarity}#${serial}`,
    poolId: tpl.id, nome: tpl.nome, desc: tpl.desc(mag, ti, s),
    raridade: rarity, tipo: tpl.tipo, icon: tpl.icon, tags: [tpl.tipo, 'habilidade'],
    apply: { kind: 'skill-mod', skillId: s.id, mod },
    budget: Math.round(RARITY_SCALE[ti] * 80 * tpl.weight),
  };
}

function buildMorphCard(m: MorphDef, isEvo: boolean, serial: number): UpgradeCard {
  const rarity: Rarity = isEvo ? 'lendaria' : 'epica';
  return {
    uid: `${m.id}#${serial}`,
    poolId: m.id, nome: m.nome, desc: m.desc,
    raridade: rarity, tipo: isEvo ? 'evolucao' : 'mutacao',
    icon: isEvo ? 'c-evolution' : 'c-mutation', tags: [isEvo ? 'evolucao' : 'mutacao', 'transformacao'],
    apply: isEvo
      ? { kind: 'evolution', skillId: m.skillId, evolutionId: m.id }
      : { kind: 'mutation', skillId: m.skillId, mutationId: m.id },
    budget: isEvo ? 600 : 400,
  };
}

function buildEquipCard(tpl: EquipTpl, rarity: Rarity, serial: number): UpgradeCard {
  const ti = RIDX[rarity];
  const mag = tpl.base * RARITY_SCALE[ti];
  const stats: Partial<Record<StatKey, number>> = { [tpl.stat]: Math.round(mag * 1000) / 1000 };
  return {
    uid: `${tpl.id}#${rarity}#${serial}`,
    poolId: tpl.id, nome: tpl.nome, desc: tpl.desc(mag),
    raridade: rarity, tipo: tpl.tipo, icon: tpl.icon, tags: [tpl.tipo, 'equipamento'],
    apply: { kind: 'stat', stats },
    budget: Math.round(RARITY_SCALE[ti] * 70),
  };
}

function buildProcCard(p: ProcTpl, serial: number): UpgradeCard {
  return {
    uid: `${p.id}#${serial}`,
    poolId: p.id, nome: p.nome, desc: p.proc.desc,
    raridade: p.raridade, tipo: p.tipo, icon: p.icon, tags: [p.tipo, 'efeito'],
    apply: { kind: 'proc', proc: p.proc },
    budget: 300 + RIDX[p.raridade] * 120,
  };
}

// ---------- seleção sem reposição, ponderada e anti-repetição ----------
function pickDistinct<T>(rng: Rng, pool: T[], n: number, weight: (t: T) => number): T[] {
  const remaining = pool.slice();
  const out: T[] = [];
  while (out.length < n && remaining.length > 0) {
    const chosen = rng.weighted(remaining, weight);
    out.push(chosen);
    remaining.splice(remaining.indexOf(chosen), 1);
  }
  return out;
}

function tplWeight(ctx: OfferCtx, poolId: string, base: number): number {
  const refusedN = ctx.refused?.[poolId] ?? 0;
  const usedN = stacksUsed(ctx, poolId);
  // recusar repetidamente reduz a frequência; nunca-visto ganha leve destaque
  const refusePenalty = Math.pow(0.7, refusedN);
  const noveltyBoost = usedN === 0 ? 1.15 : Math.pow(0.85, usedN);
  return base * refusePenalty * noveltyBoost;
}

// ============ OFERTA DE HABILIDADE ============
export function generateSkillOffer(ctx: OfferCtx): UpgradeCard[] {
  const s = SKILL_BY_ID[ctx.targetId];
  if (!s) return [];
  const newLevel = ctx.fromLevel + 1;
  const rng = makeRng(mix(hashStr(`skill:${ctx.targetId}:${newLevel}:${ctx.rerollIndex ?? 0}`), ctx.seedRun >>> 0));
  const luck = luckOf(ctx, newLevel);
  let serial = rng.state();

  // marco de mutação (nv5) — 2 mutações + 1 carta forte
  if (newLevel === SKILL_MILESTONES.mutation) {
    const morphs = (MUTATIONS_BY_SKILL[s.id] ?? []).map((m) => buildMorphCard(m, false, serial++));
    const generic = topSkillCard(ctx, s, rng, ['rara', 'epica'], serial++);
    return rng.shuffle([...morphs, generic]).slice(0, 3);
  }
  // marco de evolução (nv10) — 2 evoluções + 1 carta lendária
  if (newLevel === SKILL_MILESTONES.evolution) {
    const morphs = (EVOLUTIONS_BY_SKILL[s.id] ?? []).map((m) => buildMorphCard(m, true, serial++));
    const generic = topSkillCard(ctx, s, rng, ['epica', 'lendaria'], serial++);
    return rng.shuffle([...morphs, generic]).slice(0, 3);
  }

  // nível comum — 3 cartas de modificação distintas
  let candidates = SKILL_TPLS.filter((t) => t.fits(s) && stacksUsed(ctx, t.id) < t.maxStacks);
  if (candidates.length < 3) candidates = SKILL_TPLS.filter((t) => t.fits(s)); // fallback amplo
  const chosen = pickDistinct(rng, candidates, 3, (t) => tplWeight(ctx, t.id, t.weight));
  const cards = chosen.map((t, i) => {
    let rarity = rollRarity(rng, luck, t.tiers);
    if (i === 0 && (ctx.sealBonus ?? 0) > 0) rarity = bumpRarity(rarity, t.tiers);
    return buildSkillCard(t, rarity, s, serial++);
  });
  return cards;
}

function topSkillCard(ctx: OfferCtx, s: SkillDef, rng: Rng, tiers: Rarity[], serial: number): UpgradeCard {
  const pool = SKILL_TPLS.filter((t) => t.fits(s) && t.tiers.some((r) => tiers.includes(r)));
  const t = pool.length ? rng.weighted(pool, (x) => tplWeight(ctx, x.id, x.weight)) : SKILL_TPLS[0];
  const allowed = t.tiers.filter((r) => tiers.includes(r));
  const rarity = allowed[Math.min(allowed.length - 1, 1 + rng.int(Math.max(1, allowed.length - 1)))] ?? allowed[allowed.length - 1];
  return buildSkillCard(t, rarity, s, serial);
}

// ============ OFERTA DE EQUIPAMENTO ============
export function generateEquipOffer(ctx: OfferCtx): UpgradeCard[] {
  const e = EQUIP_BY_ID[ctx.targetId];
  if (!e) return [];
  const newLevel = ctx.fromLevel + 1;
  const rng = makeRng(mix(hashStr(`equip:${ctx.targetId}:${newLevel}:${ctx.rerollIndex ?? 0}`), ctx.seedRun >>> 0));
  const luck = luckOf(ctx, newLevel);
  let serial = rng.state();

  // marcos de proc (nv 5/10/15/20)
  if (EQUIP_MILESTONES.includes(newLevel)) {
    const tiers = milestoneProcTiers(newLevel);
    const owned = new Set(ctx.ownedPools ?? []);
    let pool = PROC_TPLS.filter((p) => tiers.includes(p.raridade) && !owned.has(p.id));
    if (pool.length < 3) pool = PROC_TPLS.filter((p) => !owned.has(p.id));
    const chosen = pickDistinct(rng, pool, 3, (p) => 1 + (2 - Math.abs(RIDX[p.raridade] - 3)));
    if (chosen.length >= 3) return chosen.map((p) => buildProcCard(p, serial++));
    // pool de procs esgotado — completa com cartas de atributo
    const procCards = chosen.map((p) => buildProcCard(p, serial++));
    const fill = statOffer(ctx, e, rng, luck, 3 - procCards.length, serial);
    return [...procCards, ...fill];
  }

  return statOffer(ctx, e, rng, luck, 3, serial);
}

function statOffer(ctx: OfferCtx, e: EquipDef, rng: Rng, luck: number, n: number, serial: number): UpgradeCard[] {
  let candidates = EQUIP_TPLS.filter((t) => t.slots.includes(e.slot) && stacksUsed(ctx, t.id) < t.maxStacks);
  if (candidates.length < n) candidates = EQUIP_TPLS.filter((t) => t.slots.includes(e.slot));
  if (candidates.length < n) candidates = EQUIP_TPLS.slice();
  const chosen = pickDistinct(rng, candidates, n, (t) => tplWeight(ctx, t.id, 1));
  return chosen.map((t, i) => {
    let rarity = rollRarity(rng, luck, t.tiers);
    if (i === 0 && (ctx.sealBonus ?? 0) > 0) rarity = bumpRarity(rarity, t.tiers);
    return buildEquipCard(t, rarity, serial + i);
  });
}

function milestoneProcTiers(newLevel: number): Rarity[] {
  if (newLevel <= 5) return ['rara'];
  if (newLevel <= 10) return ['rara', 'epica'];
  if (newLevel <= 15) return ['epica'];
  return ['epica', 'lendaria'];
}

// ============ OFERTA GENÉRICA (roteia por tipo) ============
export function generateOffer(ctx: OfferCtx): UpgradeCard[] {
  return ctx.kind === 'skill' ? generateSkillOffer(ctx) : generateEquipOffer(ctx);
}

// ============ APLICAÇÃO DE CARTAS ============
export function emptyMods(): SkillMods {
  return {
    multPct: 0, cooldownPct: 0, radiusPct: 0, durationPct: 0, dotPct: 0, critChance: 0,
    extraStatus: [], ricochet: 0, extraHits: 0, onKillHeal: 0, onKillReset: 0, spreadOnKill: false,
    explodeOnKill: 0, ignoreDefense: 0, vsEliteBoss: 0, lowHpBonus: 0, selfShieldOnCast: 0,
    hasteOnCast: 0, chainCount: 0, summonBonusPct: 0, extraCharge: 0,
  };
}

export function mergeSkillMod(base: SkillMods, add: Partial<SkillMods>): void {
  for (const k of Object.keys(add) as (keyof SkillMods)[]) {
    const v = add[k];
    if (v == null) continue;
    if (k === 'extraStatus') { base.extraStatus.push(...(v as SkillMods['extraStatus'])); }
    else if (k === 'spreadOnKill') { base.spreadOnKill = base.spreadOnKill || (v as boolean); }
    else if (k === 'ignoreDefense') { base.ignoreDefense = Math.min(0.85, base.ignoreDefense + (v as number)); }
    else if (k === 'onKillReset') { base.onKillReset = Math.min(1, base.onKillReset + (v as number)); }
    else { (base[k] as number) += v as number; }
  }
}

export function applyCardToSkillMods(mods: SkillMods, card: UpgradeCard): void {
  if (card.apply.kind === 'skill-mod') mergeSkillMod(mods, card.apply.mod);
}

export function applyCardToEquipBonus(bonus: Partial<Record<StatKey, number>>, card: UpgradeCard): void {
  if (card.apply.kind === 'stat') {
    for (const k of Object.keys(card.apply.stats) as StatKey[]) {
      bonus[k] = (bonus[k] ?? 0) + (card.apply.stats[k] ?? 0);
    }
  }
}

export function chosenFromCard(card: UpgradeCard, levelAt: number): ChosenCard {
  return { poolId: card.poolId, nome: card.nome, raridade: card.raridade, levelAt, desc: card.desc };
}

// ============ CONTAGEM TOTAL DE CARTAS POSSÍVEIS (verificação do "1000+") ============
export function countAllCards(): { skill: number; equip: number; mutation: number; evolution: number; proc: number; total: number } {
  let skill = 0;
  for (const s of Object.values(SKILL_BY_ID)) {
    for (const t of SKILL_TPLS) if (t.fits(s)) skill += t.tiers.length;
  }
  let equip = 0;
  for (const e of Object.values(EQUIP_BY_ID)) {
    for (const t of EQUIP_TPLS) if (t.slots.includes(e.slot)) equip += t.tiers.length;
  }
  let mutation = 0, evolution = 0;
  for (const arr of Object.values(MUTATIONS_BY_SKILL)) mutation += arr.length;
  for (const arr of Object.values(EVOLUTIONS_BY_SKILL)) evolution += arr.length;
  const proc = PROC_TPLS.length;
  const total = skill + equip + mutation + evolution + proc;
  return { skill, equip, mutation, evolution, proc, total };
}

// helper para EquipState inicial
export function emptyEquipState(level = 1): EquipState {
  return { level, cards: [], bonus: {}, procs: [] };
}

export { RARITIES };
