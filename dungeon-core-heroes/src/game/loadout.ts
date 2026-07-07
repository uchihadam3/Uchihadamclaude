import type {
  EquipState, HeroId, HeroProgress, PotionState, SkillDef, SkillMods, SkillState, StatKey, Stats,
} from '../types';
import { HERO_BY_ID } from '../data/heroesData';
import { SKILLS_BY_HERO, SKILL_BY_ID } from '../data/skillsData';
import { EQUIPS_BY_HERO, POTION_LEVELS } from '../data/equipmentData';
import { EVOLUTIONS_BY_SKILL, MUTATIONS_BY_SKILL } from '../data/upgradePools';
import { emptyMods, mergeSkillMod } from './cardGenerator';

// ============ LOADOUT — estado efetivo pronto para o combate ============

export interface SkillRuntime {
  def: SkillDef;
  level: number;
  mods: SkillMods;             // cartas + mutação + evolução, agregados
  hasMutation: boolean;
  hasEvolution: boolean;
  effMult: number;             // multiplicador final (nível + cartas)
  effCooldown: number;         // recarga final (nível + cartas + cdr)
  effRadius: number;
  effDuration: number;
  effDotDps: number;
}

export interface Loadout {
  heroId: HeroId;
  stats: Stats;                // atributos efetivos (base + equipamentos)
  skills: SkillRuntime[];      // 4
  potion: PotionState;
  potionHeal: number;          // fração de vida curada por carga
  potionCleanse: boolean;
  potionShield: number;        // fração de escudo
  equipProcs: EquipState['procs'];
}

const SKILL_MULT_PER_LVL = 0.12;
const SKILL_CD_PER_LVL = 0.03;

// ============ AFINAÇÃO POR HERÓI (balanceamento) ============
// dmg: multiplica poder ofensivo (power/spellPower); tough: multiplica vida/defesa.
// Valores calibrados pelo simulador headless para o alvo de tempo da Dungeon 1.
export const HERO_TUNE: Record<HeroId, { dmg: number; tough: number }> = {
  guerreiro: { dmg: 1.17, tough: 1.55 },
  arqueira: { dmg: 0.80, tough: 3.20 },
  mago: { dmg: 0.52, tough: 1.20 },
  ladino: { dmg: 0.64, tough: 2.45 },
  'clériga': { dmg: 0.73, tough: 1.00 },
  druida: { dmg: 0.77, tough: 1.00 },
  monge: { dmg: 1.16, tough: 1.10 },
  engenheira: { dmg: 1.00, tough: 1.05 },
  necromante: { dmg: 0.41, tough: 1.55 },
  alquimista: { dmg: 0.42, tough: 1.35 },
};

function addStats(into: Stats, key: StatKey, v: number): void {
  (into[key] as number) += v;
}

export function buildSkillRuntime(state: SkillState, def: SkillDef, cdr: number): SkillRuntime {
  const mods = emptyMods();
  // cartas
  mergeSkillMod(mods, state.mods);
  // mutação / evolução
  if (state.mutation) {
    const m = (MUTATIONS_BY_SKILL[def.id] ?? []).find((x) => x.id === state.mutation);
    if (m) mergeSkillMod(mods, m.mod);
  }
  if (state.evolution) {
    const e = (EVOLUTIONS_BY_SKILL[def.id] ?? []).find((x) => x.id === state.evolution);
    if (e) mergeSkillMod(mods, e.mod);
  }
  const L = state.level;
  const lvlMult = 1 + SKILL_MULT_PER_LVL * (L - 1);
  const lvlCd = 1 - SKILL_CD_PER_LVL * (L - 1);
  const effMult = def.mult * lvlMult * (1 + mods.multPct / 100);
  const effCooldown = Math.max(0.5, def.cooldown * lvlCd * (1 - mods.cooldownPct / 100) * (1 - Math.min(0.6, cdr)));
  const effRadius = (def.radius ?? 0) * (1 + mods.radiusPct / 100);
  const effDuration = (def.duration ?? 0) * (1 + mods.durationPct / 100);
  const effDotDps = (def.dotDps ?? 0) * (1 + mods.dotPct / 100);
  return {
    def, level: L, mods,
    hasMutation: !!state.mutation, hasEvolution: !!state.evolution,
    effMult, effCooldown, effRadius, effDuration, effDotDps,
  };
}

export function buildLoadout(heroId: HeroId, prog: HeroProgress): Loadout {
  const hero = HERO_BY_ID[heroId];
  const stats: Stats = { ...hero.base };

  // equipamentos: base por nível + bônus de cartas
  const procs: EquipState['procs'] = [];
  for (const def of EQUIPS_BY_HERO[heroId] ?? []) {
    const st = prog.equips[def.id];
    if (!st) continue;
    for (const k of Object.keys(def.perLevel) as StatKey[]) {
      addStats(stats, k, (def.perLevel[k] ?? 0) * st.level);
    }
    for (const k of Object.keys(st.bonus) as StatKey[]) {
      addStats(stats, k, st.bonus[k] ?? 0);
    }
    for (const p of st.procs) procs.push(p);
  }
  // afinação por herói
  const tune = HERO_TUNE[heroId];
  stats.power *= tune.dmg;
  stats.spellPower *= tune.dmg;
  stats.hp *= tune.tough;
  stats.defense *= tune.tough;
  stats.magicDefense *= tune.tough;

  // sanidade de limites
  stats.attackInterval = Math.max(0.35, stats.attackInterval);
  stats.critChance = Math.min(1, stats.critChance);
  stats.dodge = Math.min(0.75, stats.dodge);
  stats.blockChance = Math.min(0.75, stats.blockChance);
  stats.cdr = Math.min(0.6, stats.cdr);

  // habilidades (4, na ordem canônica do herói)
  const defs = SKILLS_BY_HERO[heroId] ?? [];
  const skills = defs.map((def) => {
    const st = prog.skills[def.id] ?? { level: 1, cards: [], mods: emptyMods(), mutation: null, evolution: null };
    return buildSkillRuntime(st, def, stats.cdr);
  });

  // poção
  const pl = POTION_LEVELS[Math.max(0, Math.min(POTION_LEVELS.length - 1, prog.potionLevel - 1))];
  const potion: PotionState = { level: prog.potionLevel, charges: pl.charges };

  return {
    heroId, stats, skills, potion,
    potionHeal: pl.heal * stats.potionPower,
    potionCleanse: pl.cleanse,
    potionShield: pl.shield ?? 0,
    equipProcs: procs,
  };
}

// ============ PROGRESSO INICIAL (kit de partida) ============
export function defaultSkillState(def: SkillDef): SkillState {
  return { level: 1, cards: [], mods: emptyMods(), mutation: null, evolution: null };
}

export function defaultHeroProgress(heroId: HeroId): HeroProgress {
  const skills: Record<string, SkillState> = {};
  for (const s of SKILLS_BY_HERO[heroId] ?? []) skills[s.id] = defaultSkillState(s);
  const equips: Record<string, EquipState> = {};
  for (const e of EQUIPS_BY_HERO[heroId] ?? []) equips[e.id] = { level: 1, cards: [], bonus: {}, procs: [] };
  return {
    essence: 0, maxDungeon: 1, wins: new Array(10).fill(0), attempts: 0, bestTimes: {},
    skills, equips, potionLevel: 1, lastOffer: null, refusedCounts: {}, runsHistory: [],
  };
}

// exporta lista ordenada dos ids de habilidade do herói (para HUD / índices)
export function heroSkillIds(heroId: HeroId): string[] {
  return (SKILLS_BY_HERO[heroId] ?? []).map((s) => s.id);
}

export { SKILL_BY_ID };
