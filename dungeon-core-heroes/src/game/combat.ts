import type {
  DamageKind, DungeonDef, EnemyDef, EnemyTier, HeroId, RunLogEntry, RunState, StatusId, Stats, Unit,
} from '../types';
import { DUNGEON_BY_ID, DUNGEON_REWARD_FACTOR } from '../data/dungeonsData';
import { ENEMY_BY_ID, ENEMIES_BY_DUNGEON } from '../data/enemiesData';
import { HERO_BY_ID } from '../data/heroesData';
import { SUMMONS } from '../data/skillsData';
import type { Loadout, SkillRuntime } from './loadout';
import { makeRng, mix, hashStr, type Rng } from './rng';

// ============ CONSTANTES DE ARENA / BALANCE ============
export const ARENA_W = 14;
const HERO_MIN_X = 0.6, HERO_MAX_X = 12.6;
const HERO_START_X = 3.4;             // espaço de recuo para heróis à distância
const SPELL_SCALE = 0.32;            // spellPower → dano equivalente a power
// escalas globais de balanceamento (ajustadas pelo simulador headless)
export const BALANCE = {
  hpScale: 2.0,    // alonga os combates (tempo-alvo D1 ~9-11min)
  dmgScale: 0.32,  // combates longos permanecem sobreviventes no kit inicial
  addCap: 4,       // máx. de inimigos convocados simultâneos
};
const WALK_TIME = 2.6;               // s entre salas (andando + regen)
const BOSS_INTRO = 2.2;
const CAST_GCD = 0.35;
const POTION_GCD = 0.8;
const VICTORY_HOLD = 3.2, DEFEAT_HOLD = 3.0;

const BASIC_KIND: Record<HeroId, DamageKind> = {
  guerreiro: 'fisico', arqueira: 'fisico', mago: 'magico', ladino: 'fisico', 'clériga': 'sagrado',
  druida: 'natureza', monge: 'fisico', engenheira: 'magico', necromante: 'sombra', alquimista: 'quimico',
};

const PHYS_KINDS: DamageKind[] = ['fisico'];
const isPhys = (k: DamageKind) => PHYS_KINDS.includes(k);

// ============ CONTROLADOR DA EXPEDIÇÃO ============
interface EnemySpawn { defId: string; tier: EnemyTier }
interface Encounter { kind: 'common' | 'subboss' | 'boss'; spawns: EnemySpawn[]; label: string }

export interface RunController {
  run: RunState;
  rng: Rng;
  loadout: Loadout;
  dungeon: DungeonDef;
  encounters: Encounter[];
  encounterIndex: number;
  bigSkillIndex: number;
  procUsed: Set<string>;
  hazardCd: number;
  uidSeq: number;
  overHold: number;
}

function newUid(c: RunController): number { return ++c.uidSeq; }

function log(run: RunState, msg: string, kind: RunLogEntry['kind'] = 'info'): void {
  run.log.push({ t: run.t, msg, kind });
  if (run.log.length > 120) run.log.shift();
}

// ============ CRIAÇÃO DE UNIDADES ============
function baseStats(): Stats {
  return {
    hp: 100, power: 10, spellPower: 100, defense: 6, magicDefense: 6, attackInterval: 1.8,
    critChance: 0, critMult: 1.5, dodge: 0, speed: 2.4, range: 1.2, lifesteal: 0, cdr: 0,
    areaBonus: 1, healBonus: 1, eliteDamage: 1, bossDamage: 1, dotDamage: 1, summonPower: 1,
    shieldPower: 1, blockChance: 0, regenPerSec: 0, moveDamage: 0, potionPower: 1,
  };
}

function makeHeroUnit(c: RunController): Unit {
  const s = c.loadout.stats;
  return {
    uid: newUid(c), side: 'hero', defId: c.loadout.heroId, nome: HERO_BY_ID[c.loadout.heroId].nome,
    x: HERO_START_X, hp: s.hp, maxHp: s.hp, shield: 0, stats: { ...s }, attackCd: 0.2,
    statuses: [], dead: false, anim: 'idle', animT: 0, facing: 1,
  };
}

const TIER_SCALE: Record<EnemyTier, { hp: number; dmg: number; def: number; bounty: number; scale: number }> = {
  comum: { hp: 1, dmg: 1, def: 1, bounty: 1, scale: 1 },
  elite: { hp: 1.85, dmg: 1.35, def: 1.25, bounty: 2.6, scale: 1.18 },
  subchefe: { hp: 1, dmg: 1, def: 1, bounty: 1, scale: 1 },
  chefe: { hp: 1, dmg: 1, def: 1, bounty: 1, scale: 1 },
};

function makeEnemyUnit(c: RunController, defId: string, tier: EnemyTier, x: number): Unit {
  const d: EnemyDef = ENEMY_BY_ID[defId];
  const mult = c.dungeon.multiplier;
  const ts = TIER_SCALE[tier];
  const hp = d.hp * mult * ts.hp * BALANCE.hpScale;
  const st = baseStats();
  st.hp = hp;
  // dano cresce mais rápido que a vida com a profundidade: D1 gentil, D2+ mordem
  const dmgRamp = 1 + (c.dungeon.id - 1) * 0.16;
  st.power = d.damage * Math.pow(mult, 0.92) * ts.dmg * BALANCE.dmgScale * dmgRamp;
  st.defense = d.defense * (1 + (mult - 1) * 0.5) * ts.def;
  st.magicDefense = d.magicDefense * (1 + (mult - 1) * 0.5) * ts.def;
  st.attackInterval = d.attackInterval;
  st.speed = d.speed;
  st.range = d.range;
  return {
    uid: newUid(c), side: 'enemy', defId, nome: d.nome, tier,
    x, hp, maxHp: hp, shield: 0, stats: st, attackCd: 0.4 + c.rng.next() * 0.6,
    statuses: [], dead: false, anim: 'idle', animT: 0, facing: -1,
    specialCd: d.special ? d.special.cooldown * (0.5 + c.rng.next() * 0.5) : undefined,
    phase: tier === 'chefe' ? 0 : undefined,
  };
}

function makeSummonUnit(c: RunController, summonId: string, owner: Unit, powMult: number, ttl: number): Unit {
  const def = SUMMONS[summonId];
  const st = baseStats();
  const hp = def.hp * powMult;
  st.hp = hp; st.power = def.damage * powMult; st.attackInterval = def.attackInterval;
  st.range = def.range; st.speed = def.speed; st.defense = 8; st.magicDefense = 8;
  const x = def.speed === 0 ? Math.min(HERO_MAX_X, owner.x + 1.4) : owner.x + 0.5;
  return {
    uid: newUid(c), side: 'hero', defId: summonId, nome: def.nome,
    x, hp, maxHp: hp, shield: 0, stats: st, attackCd: 0.5, statuses: [], dead: false,
    anim: 'idle', animT: 0, facing: 1, summonTtl: ttl, ownerUid: owner.uid,
  };
}

// ============ ENCONTROS ============
function genEncounters(c: RunController): Encounter[] {
  const d = c.dungeon, rng = c.rng;
  const commons: Encounter[] = [];
  const depthBonus = Math.floor((d.id - 1) / 3); // salas maiores no fundo
  for (let i = 0; i < d.rooms; i++) {
    const count = 2 + rng.int(2 + depthBonus);
    const spawns: EnemySpawn[] = [];
    for (let k = 0; k < count; k++) {
      if (d.elites.length && rng.chance(0.14 + d.id * 0.006)) {
        spawns.push({ defId: rng.pick(d.elites), tier: 'elite' });
      } else {
        spawns.push({ defId: rng.pick(d.enemies), tier: 'comum' });
      }
    }
    commons.push({ kind: 'common', spawns, label: `Sala ${i + 1}` });
  }
  const a = Math.max(1, Math.round(d.rooms * 0.33));
  const b = Math.max(a + 1, Math.round(d.rooms * 0.66));
  const sub1: Encounter = { kind: 'subboss', label: 'Subchefe', spawns: [{ defId: d.subboss1, tier: 'subchefe' }] };
  const sub2: Encounter = { kind: 'subboss', label: 'Subchefe', spawns: [{ defId: d.subboss2, tier: 'subchefe' }] };
  const boss: Encounter = { kind: 'boss', label: 'Chefe', spawns: [{ defId: d.boss, tier: 'chefe' }] };
  const out: Encounter[] = [];
  commons.forEach((e, i) => {
    out.push(e);
    if (i === a - 1) out.push(sub1);
    if (i === b - 1) out.push(sub2);
  });
  out.push(boss);
  return out;
}

// ============ INÍCIO DA EXPEDIÇÃO ============
export function createRun(loadout: Loadout, dungeonId: number, seedRun: number): RunController {
  const dungeon = DUNGEON_BY_ID[dungeonId];
  const rng = makeRng(mix(hashStr(`${loadout.heroId}:${dungeonId}`), seedRun >>> 0));
  const run: RunState = {
    heroId: loadout.heroId, dungeonId, seedRun, t: 0, progress: 0, roomIndex: 0, totalRooms: 0,
    phase: 'walk', phaseT: WALK_TIME * 0.6, hero: null as unknown as Unit, summons: [], enemies: [],
    potion: { ...loadout.potion }, skillCds: [0, 0, 0, 0], skillUses: [0, 0, 0, 0],
    comboStacks: 0, chargesUsed: 0, dmgDealt: 0, dmgTaken: 0, healed: 0, kills: 0, eliteKills: 0,
    subbossKills: 0, bossKilled: false, dmgBySkill: [0, 0, 0, 0, 0, 0], dmgTakenBy: {}, potionsUsed: 0,
    log: [], floats: [], particles: [], fx: [], shake: 0, over: false, result: null,
  };
  const c: RunController = {
    run, rng, loadout, dungeon, encounters: [], encounterIndex: 0,
    bigSkillIndex: pickBigSkill(loadout), procUsed: new Set(), hazardCd: 4, uidSeq: 0, overHold: 0,
  };
  c.encounters = genEncounters(c);
  run.totalRooms = c.encounters.length;
  run.hero = makeHeroUnit(c);
  log(run, `${run.hero.nome} entra em ${dungeon.nome}.`, 'info');
  fireProcs(c, 'fightStart');
  return c;
}

function pickBigSkill(l: Loadout): number {
  let best = -1, bestScore = -1;
  l.skills.forEach((s, i) => {
    if (s.def.kind === 'buff' || s.def.kind === 'heal' || s.def.kind === 'summon') return;
    const score = s.effMult * (s.def.radius ? 1.6 : 1) * (s.def.kind === 'aoe' || s.def.kind === 'dot-aoe' ? 1.3 : 1);
    if (score > bestScore) { bestScore = score; best = i; }
  });
  return best < 0 ? 0 : best;
}

// ============ STATUS ============
const DOT_IDS: StatusId[] = ['burn', 'bleed', 'poison', 'shock', 'acid'];
const isDot = (id: StatusId) => DOT_IDS.includes(id);

function applyStatus(tgt: Unit, id: StatusId, duration: number, potency: number, source: 'hero' | 'enemy'): void {
  const ex = tgt.statuses.find((s) => s.id === id);
  if (ex) {
    ex.remaining = Math.max(ex.remaining, duration);
    if (isDot(id)) { ex.stacks = Math.min(6, ex.stacks + 1); ex.potency = Math.max(ex.potency, potency); }
    else ex.potency = Math.max(ex.potency, potency);
    return;
  }
  tgt.statuses.push({ id, remaining: duration, potency, source, stacks: 1 });
}

function hasStatus(u: Unit, id: StatusId): boolean { return u.statuses.some((s) => s.id === id); }
function statusPot(u: Unit, id: StatusId): number {
  let v = 0; for (const s of u.statuses) if (s.id === id) v += s.potency; return v;
}

// modificadores derivados dos status
function powerMult(u: Unit): number {
  let m = 1 + statusPot(u, 'powerup');
  if (hasStatus(u, 'weaken')) m *= (1 - statusPot(u, 'weaken'));
  if (u.enraged) m *= 1.4;
  return Math.max(0.1, m);
}
function hasteMult(u: Unit): number {
  let m = 1 + statusPot(u, 'hasteup');
  if (hasStatus(u, 'slow')) m *= (1 - Math.min(0.7, statusPot(u, 'slow')));
  if (u.enraged) m *= 1.35;
  return Math.max(0.2, m);
}
function dodgeOf(u: Unit): number { return Math.min(0.85, u.stats.dodge + statusPot(u, 'dodgeup')); }
function defenseOf(u: Unit, kind: DamageKind): number {
  let base = isPhys(kind) ? u.stats.defense : u.stats.magicDefense;
  if (hasStatus(u, 'blessed')) base *= 1.2;
  if (hasStatus(u, 'armorbreak')) base *= (1 - Math.min(0.8, statusPot(u, 'armorbreak')));
  return Math.max(0, base);
}
function dmgTakenMult(u: Unit): number {
  return 1 + statusPot(u, 'vulnerable') + statusPot(u, 'mark');
}
function canAct(u: Unit): boolean { return !hasStatus(u, 'stun'); }
function canMove(u: Unit): boolean { return !hasStatus(u, 'stun') && !hasStatus(u, 'root'); }

// ============ VISUAL ============
function floatText(run: RunState, u: Unit, text: string, color: string, crit = false): void {
  run.floats.push({ x: u.x, y: 0, text, color, t: 0, crit });
  if (run.floats.length > 40) run.floats.shift();
}
function burst(run: RunState, u: Unit, color: string, n: number, kind = 'hit'): void {
  for (let i = 0; i < n; i++) {
    run.particles.push({
      x: u.x, y: 0.4 + Math.random() * 0.5, vx: (Math.random() - 0.5) * 3, vy: 1 + Math.random() * 2.5,
      t: 0, ttl: 0.4 + Math.random() * 0.4, color, size: 2 + Math.random() * 3, kind,
    });
  }
  if (run.particles.length > 240) run.particles.splice(0, run.particles.length - 240);
}

// ============ EFEITO VISUAL POR HABILIDADE ============
// cada habilidade gera um efeito próprio (projétil, corte, área, meteoro, raio…)
function pushFx(c: RunController, kind: import('../types').FxKind, x: number, y: number, tx: number, ty: number, color: string, ttl: number, extra: Partial<import('../types').Fx> = {}): void {
  c.run.fx.push({ kind, x, y, tx, ty, t: 0, ttl, color, seed: Math.random() * 1000, ...extra });
  if (c.run.fx.length > 40) c.run.fx.shift();
}
function spawnSkillFx(c: RunController, def: SkillRuntime['def'], hero: Unit, target: Unit | null): void {
  const col = kindColor(def.dmgKind);
  const CHEST = 14, HEAD = 22;
  const tx = target ? target.x : hero.x + hero.facing * 3;
  const ranged = hero.stats.range > 3;
  switch (def.kind) {
    case 'strike':
      if (def.id === 'punhos-relampago' || def.id === 'punhalada-rapida') { pushFx(c, 'slash', tx, CHEST, tx, CHEST, col, 0.25, { color2: '#ffffff' }); pushFx(c, 'slash', tx, CHEST + 4, tx, CHEST + 4, col, 0.3); }
      else if (ranged) pushFx(c, 'projectile', hero.x + hero.facing, CHEST, tx, CHEST, col, 0.35, { color2: '#ffffff' });
      else pushFx(c, 'slash', tx, CHEST, tx, CHEST, col, 0.28, { color2: '#ffffff' });
      break;
    case 'execute': pushFx(c, 'slash', tx, CHEST, tx, CHEST, '#ff4058', 0.4, { color2: '#ffffff', r: 2 }); break;
    case 'aoe':
      if (def.id === 'meteoro-menor') pushFx(c, 'meteor', tx, HEAD + 30, tx, 0, col, 0.7, { color2: '#fff2c0' });
      else if (def.id === 'chuva-flechas') pushFx(c, 'arrows', tx, HEAD + 24, tx, 0, col, 0.6, { r: (def.radius ?? 3) });
      else if (def.id === 'martelo-sismico' || def.id === 'chute-giratorio') pushFx(c, 'nova', tx, 2, tx, 2, col, 0.5, { r: (def.radius ?? 3) });
      else pushFx(c, 'aoe', tx, 4, tx, 4, col, 0.5, { r: (def.radius ?? 3) });
      break;
    case 'dot-aoe': pushFx(c, 'ground', tx, 0, tx, 0, col, Math.min(1.2, (def.duration ?? 4) * 0.25), { r: (def.radius ?? 3) }); break;
    case 'debuff': pushFx(c, 'aoe', tx, 4, tx, 4, col, 0.5, { r: (def.radius ?? 3), color2: '#c8a8f8' }); break;
    case 'buff': pushFx(c, def.shieldMult ? 'shield' : 'buff', hero.x, CHEST, hero.x, CHEST, def.shieldMult ? '#88c8ff' : col, 0.6); break;
    case 'heal': pushFx(c, 'heal', hero.x, CHEST, hero.x, CHEST, '#7ae87a', 0.7); break;
    case 'summon': pushFx(c, 'summon', hero.x + 1, 2, hero.x + 1, 2, col, 0.5); break;
    case 'dash': pushFx(c, 'slash', tx, CHEST, tx, CHEST, col, 0.3, { color2: '#b8e8ff' }); break;
    case 'sacrifice': pushFx(c, 'nova', tx, 4, tx, 4, col, 0.55, { r: (def.radius ?? 3), color2: '#ffffff' }); break;
  }
  if (def.id === 'passo-trovao' || def.tags.includes('raio')) pushFx(c, 'bolt', hero.x, HEAD, tx, CHEST, '#a8e0ff', 0.3);
}

// ============ DANO ============
interface DmgOpts { isSkill?: boolean; skillIdx?: number; critChanceAdd?: number; ignoreDef?: number; canDodge?: boolean; vsElite?: number; silent?: boolean }

function dealDamage(c: RunController, src: Unit, tgt: Unit, raw: number, kind: DamageKind, opts: DmgOpts = {}): number {
  if (tgt.dead || raw <= 0) return 0;
  const run = c.run;
  const d = ENEMY_BY_ID[tgt.defId];
  // esquiva
  if ((opts.canDodge ?? true) && dodgeOf(tgt) > 0 && c.rng.chance(dodgeOf(tgt))) {
    if (!opts.silent) floatText(run, tgt, 'esquiva', '#c8d0da');
    if (tgt.side === 'hero') fireProcs(c, 'onDodge');
    return 0;
  }
  let dmg = raw * powerMult(src);
  // elite/chefe bônus da fonte (herói)
  if (src.side === 'hero') {
    if (tgt.tier === 'elite' || tgt.tier === 'subchefe') dmg *= src.stats.eliteDamage * (1 + (opts.vsElite ?? 0) / 100);
    if (tgt.tier === 'chefe') dmg *= src.stats.bossDamage * (1 + (opts.vsElite ?? 0) / 100);
  }
  // crítico
  let crit = false;
  const critC = Math.min(1, src.stats.critChance + (opts.critChanceAdd ?? 0));
  if (critC > 0 && c.rng.chance(critC)) { crit = true; dmg *= src.stats.critMult; }
  // defesa
  let def = defenseOf(tgt, kind);
  if (opts.ignoreDef) def *= (1 - Math.min(0.85, opts.ignoreDef));
  dmg *= 100 / (100 + def);
  // resist / weak (inimigos)
  if (d) {
    if (d.resist?.includes(kind)) dmg *= 0.5;
    if (d.weak?.includes(kind)) dmg *= 1.5;
  }
  // amplificação no alvo
  dmg *= dmgTakenMult(tgt);
  // bloqueio (alvo)
  if (tgt.stats.blockChance > 0 && c.rng.chance(tgt.stats.blockChance)) {
    dmg *= 0.4;
    if (tgt.side === 'hero') fireProcs(c, 'onBlock');
  }
  dmg = Math.max(1, Math.round(dmg));
  // escudo
  if (tgt.shield > 0) {
    const absorb = Math.min(tgt.shield, dmg);
    tgt.shield -= absorb; dmg -= absorb;
    if (absorb > 0 && !opts.silent) burst(run, tgt, '#88c8ff', 3, 'shield');
  }
  tgt.hp -= dmg;
  // reflexo (inimigo)
  if (d?.special?.id === 'reflect' && tgt.side === 'enemy' && src.side === 'hero') {
    const back = Math.round(dmg * (d.special.power));
    src.hp -= Math.max(1, back);
  }
  // métricas
  if (src.side === 'hero') {
    run.dmgDealt += dmg;
    const idx = opts.isSkill ? (opts.skillIdx ?? 5) : (src.defId === run.heroId ? 4 : 5);
    run.dmgBySkill[Math.min(5, idx)] += dmg;
    if (crit) crit = true;
  } else if (tgt.side === 'hero' && tgt.defId === run.heroId) {
    run.dmgTaken += dmg;
    run.dmgTakenBy[src.nome] = (run.dmgTakenBy[src.nome] ?? 0) + dmg;
  }
  // lifesteal
  if (src.stats.lifesteal > 0 && src.hp > 0 && !src.dead) {
    heal(c, src, dmg * src.stats.lifesteal, true);
  }
  // procs de crítico
  if (crit && src.side === 'hero') fireProcs(c, 'onCrit');
  if (tgt.side === 'hero' && tgt.defId === run.heroId) fireProcs(c, 'onHitTaken');
  // visual
  if (!opts.silent) {
    floatText(run, tgt, String(dmg), crit ? '#ffd050' : (tgt.side === 'hero' ? '#ff8080' : '#ffffff'), crit);
    burst(run, tgt, kindColor(kind), crit ? 8 : 4);
    if (crit) run.shake = Math.min(1, run.shake + 0.4);
  }
  tgt.anim = 'hit'; tgt.animT = 0;
  if (tgt.hp <= 0) killUnit(c, tgt, src);
  return dmg;
}

function kindColor(k: DamageKind): string {
  switch (k) {
    case 'fogo': return '#ff8838'; case 'sagrado': return '#ffe890'; case 'sombra': return '#a878e8';
    case 'natureza': return '#88d858'; case 'raio': return '#88d8ff'; case 'quimico': return '#c8f048';
    case 'magico': return '#b8a8f8'; default: return '#e8e8e8';
  }
}

function heal(c: RunController, u: Unit, amount: number, silent = false): void {
  if (u.dead) return;
  amount = Math.round(amount * (u.side === 'hero' ? u.stats.healBonus : 1));
  if (amount <= 0) return;
  u.hp = Math.min(u.maxHp, u.hp + amount);
  if (u.side === 'hero' && u.defId === c.run.heroId) c.run.healed += amount;
  if (!silent) { floatText(c.run, u, `+${amount}`, '#7ae87a'); burst(c.run, u, '#7ae87a', 3, 'heal'); }
}

function addShield(c: RunController, u: Unit, amount: number): void {
  amount = Math.round(amount * u.stats.shieldPower);
  if (amount <= 0) return;
  u.shield = Math.max(u.shield, amount);
  burst(c.run, u, '#88c8ff', 4, 'shield');
}

// ============ MORTE ============
function killUnit(c: RunController, u: Unit, killer: Unit): void {
  if (u.dead) return;
  u.dead = true; u.hp = 0; u.anim = 'death'; u.animT = 0;
  const run = c.run;
  if (u.side === 'enemy') {
    const d = ENEMY_BY_ID[u.defId];
    run.kills++;
    if (u.tier === 'elite') run.eliteKills++;
    if (u.tier === 'subchefe') run.subbossKills++;
    if (u.tier === 'chefe') run.bossKilled = true;
    burst(run, u, kindColor(d.dmgKind), 12, 'death');
    // split: gera cópias menores
    if (d.special?.id === 'split' && (u.tier === 'comum' || u.tier === 'elite') && !u.enraged) {
      for (let i = 0; i < 2; i++) {
        const child = makeEnemyUnit(c, u.defId, 'comum', u.x + (i === 0 ? -0.6 : 0.6));
        child.hp = child.maxHp = Math.round(u.maxHp * 0.35);
        child.stats.power *= 0.7; child.enraged = true; // marca p/ não re-dividir
        run.enemies.push(child);
      }
    }
    if (killer.side === 'hero') {
      fireProcs(c, 'onKill');
      // reset/cura por carta na skill que matou seria tratado no cast; aqui procs de equipamento
    }
  } else if (u.defId === run.heroId) {
    // herói caiu
    run.result = 'derrota'; run.phase = 'defeat'; run.deathCause = killer.nome;
    run.hero.anim = 'death';
    log(run, `${run.hero.nome} tombou diante de ${killer.nome}.`, 'danger');
  }
}

// ============ PROCS DE EQUIPAMENTO ============
function fireProcs(c: RunController, when: string): void {
  const run = c.run, hero = run.hero;
  if (!hero || hero.dead) return;
  for (const p of c.loadout.equipProcs) {
    if (p.when !== when) continue;
    if (p.oncePerRun && c.procUsed.has(procKey(p))) continue;
    if (p.chance != null && !c.rng.chance(p.chance)) continue;
    if (when === 'onLowHp' && hero.hp / hero.maxHp > 0.25) continue;
    if (when === 'onCrowded' && run.enemies.filter((e) => !e.dead).length < 3) continue;
    applyProc(c, p);
    if (p.oncePerRun) c.procUsed.add(procKey(p));
  }
}
function procKey(p: { effect: string; when: string; amount: number }): string { return `${p.when}:${p.effect}:${p.amount}`; }

function applyProc(c: RunController, p: import('../types').EquipProc): void {
  const hero = c.run.hero;
  switch (p.effect) {
    case 'shield': addShield(c, hero, hero.maxHp * p.amount); break;
    case 'heal': heal(c, hero, hero.maxHp * p.amount); break;
    case 'haste': applyStatus(hero, 'hasteup', p.duration ?? 3, p.amount, 'hero'); break;
    case 'power': applyStatus(hero, 'powerup', p.duration ?? 3, p.amount, 'hero'); break;
    case 'defense': applyStatus(hero, 'blessed', p.duration ?? 3, p.amount, 'hero'); break;
    case 'dodgeUp': applyStatus(hero, 'dodgeup', p.duration ?? 3, p.amount, 'hero'); break;
    case 'cleanse': cleanse(hero); break;
    case 'resetPotion': if (c.run.potion.charges <= 0) { c.run.potion.charges = 1; log(c.run, 'Último Gole: uma poção retorna!', 'good'); } break;
    case 'burnNova': {
      for (const e of c.run.enemies) if (!e.dead && Math.abs(e.x - hero.x) < 3.2) {
        dealDamage(c, hero, e, hero.stats.power * p.amount, 'fogo', { isSkill: true, skillIdx: 5 });
        applyStatus(e, 'burn', 3, hero.stats.power * 0.12, 'hero');
      }
      burst(c.run, hero, '#ff8838', 16, 'nova');
      break;
    }
  }
}
function cleanse(u: Unit): void { u.statuses = u.statuses.filter((s) => !isDot(s.id)); }

// ============ ALVOS ============
function aliveEnemies(run: RunState): Unit[] { return run.enemies.filter((e) => !e.dead); }
function nearest(from: Unit, list: Unit[]): Unit | null {
  let best: Unit | null = null, bd = Infinity;
  for (const u of list) { if (u.dead) continue; const d = Math.abs(u.x - from.x); if (d < bd) { bd = d; best = u; } }
  return best;
}
function pickTarget(run: RunState, hero: Unit, mode: SkillRuntime['def']['targeting']): Unit | null {
  const es = aliveEnemies(run);
  if (!es.length) return null;
  switch (mode) {
    case 'strongest': return es.reduce((a, b) => (b.maxHp > a.maxHp ? b : a));
    case 'weakest': return es.reduce((a, b) => (b.maxHp < a.maxHp ? b : a));
    case 'lowest-hp': return es.reduce((a, b) => (b.hp < a.hp ? b : a));
    case 'elite-first': { const el = es.filter((e) => e.tier !== 'comum'); return (el.length ? el : es).reduce((a, b) => (Math.abs(b.x - hero.x) < Math.abs(a.x - hero.x) ? b : a)); }
    case 'cluster': return clusterCenter(es);
    default: return nearest(hero, es);
  }
}
function clusterCenter(es: Unit[]): Unit {
  // alvo com mais vizinhos em ~3 unidades
  let best = es[0], bestN = -1;
  for (const a of es) {
    let n = 0; for (const b of es) if (Math.abs(a.x - b.x) < 3) n++;
    if (n > bestN) { bestN = n; best = a; }
  }
  return best;
}
function enemiesInRadius(run: RunState, x: number, r: number): Unit[] {
  return aliveEnemies(run).filter((e) => Math.abs(e.x - x) <= r);
}

// ============ IA / EXECUÇÃO DE HABILIDADES ============
function castSkill(c: RunController, i: number): void {
  const run = c.run, hero = run.hero, sk = c.loadout.skills[i];
  const def = sk.def, mods = sk.mods;
  run.skillCds[i] = sk.effCooldown;
  run.skillUses[i]++;
  hero.anim = def.kind === 'dash' ? 'dash' : (def.kind === 'buff' || def.kind === 'heal' || def.kind === 'summon' ? 'cast' : 'attack');
  hero.animT = 0;
  // escudo / haste ao conjurar (cartas)
  if (mods.selfShieldOnCast > 0) addShield(c, hero, hero.stats.power * mods.selfShieldOnCast / 100 * 4);
  if (mods.hasteOnCast > 0) applyStatus(hero, 'hasteup', mods.hasteOnCast, 0.3, 'hero');

  const target = pickTarget(run, hero, def.targeting);
  const atk = (kind: DamageKind) => (isPhys(kind) ? hero.stats.power : hero.stats.spellPower * SPELL_SCALE);
  spawnSkillFx(c, def, hero, target);

  switch (def.kind) {
    case 'strike': case 'execute': {
      if (!target) break;
      let dmg = atk(def.dmgKind) * sk.effMult;
      if (def.kind === 'execute' && def.executeThreshold && target.hp / target.maxHp <= def.executeThreshold + mods.lowHpBonus / 200) {
        dmg *= (def.executeMult ?? 2.5);
      }
      const targets = [target];
      // ricochete
      const extra = mods.ricochet;
      if (extra > 0) {
        const others = aliveEnemies(run).filter((e) => e !== target).sort((a, b) => Math.abs(a.x - target.x) - Math.abs(b.x - target.x));
        for (let k = 0; k < extra && k < others.length; k++) targets.push(others[k]);
      }
      const hits = 1 + mods.extraHits;
      for (const tg of targets) {
        for (let h = 0; h < hits; h++) {
          const actual = dealDamage(c, hero, tg, dmg, def.dmgKind, { isSkill: true, skillIdx: i, critChanceAdd: mods.critChance + sk.mods.critChance * 0, ignoreDef: mods.ignoreDefense, vsElite: mods.vsEliteBoss });
          applySkillStatuses(c, hero, tg, def, mods);
          if (actual > 0 && def.healMult) heal(c, hero, atk('sagrado') * def.healMult);
          onSkillKillEffects(c, hero, tg, i, mods);
        }
      }
      break;
    }
    case 'aoe': {
      const center = target ?? hero;
      const r = (sk.effRadius || 3) * hero.stats.areaBonus;
      const list = enemiesInRadius(run, center.x, r);
      const dmg = atk(def.dmgKind) * sk.effMult;
      burst(run, center, kindColor(def.dmgKind), 14, 'aoe');
      run.shake = Math.min(1, run.shake + 0.3);
      for (const tg of list) {
        dealDamage(c, hero, tg, dmg, def.dmgKind, { isSkill: true, skillIdx: i, critChanceAdd: mods.critChance, ignoreDef: mods.ignoreDefense, vsElite: mods.vsEliteBoss });
        applySkillStatuses(c, hero, tg, def, mods);
        onSkillKillEffects(c, hero, tg, i, mods);
      }
      break;
    }
    case 'dot-aoe': {
      const center = target ?? hero;
      const r = (sk.effRadius || 3) * hero.stats.areaBonus;
      const list = enemiesInRadius(run, center.x, r);
      const dps = atk(def.dmgKind) * sk.effDotDps * hero.stats.dotDamage;
      const dur = sk.effDuration || 5;
      burst(run, center, kindColor(def.dmgKind), 12, 'field');
      const statusId: StatusId = def.dmgKind === 'fogo' ? 'burn' : def.dmgKind === 'quimico' ? 'poison' : def.dmgKind === 'sagrado' ? 'burn' : 'poison';
      for (const tg of list) {
        applyStatus(tg, statusId, dur, dps, 'hero');
        applySkillStatuses(c, hero, tg, def, mods);
      }
      if (def.healMult) heal(c, hero, atk('sagrado') * def.healMult);
      if (def.mult > 0) for (const tg of list) dealDamage(c, hero, tg, atk(def.dmgKind) * sk.effMult, def.dmgKind, { isSkill: true, skillIdx: i, silent: true });
      break;
    }
    case 'buff': {
      if (def.shieldMult) addShield(c, hero, atk(def.dmgKind) * def.shieldMult);
      for (const st of def.status ?? []) applyStatus(hero, st.id, (st.duration) * (1 + mods.durationPct / 100), st.potency ?? 0.3, 'hero');
      for (const st of mods.extraStatus) applyStatus(hero, st.id, st.duration, st.potency ?? 0.3, 'hero');
      burst(run, hero, '#88c8ff', 8, 'buff');
      break;
    }
    case 'heal': {
      if (def.healMult) heal(c, hero, atk('sagrado') * def.healMult);
      if (def.shieldMult) addShield(c, hero, atk(def.dmgKind) * def.shieldMult);
      for (const st of def.status ?? []) applyStatus(hero, st.id, st.duration * (1 + mods.durationPct / 100), st.potency ?? 0.4, 'hero');
      break;
    }
    case 'summon': {
      if (def.summonId) {
        const powMult = hero.stats.summonPower * (1 + mods.summonBonusPct / 100);
        const maxN = 1 + mods.extraCharge + (def.summonId === 'servo-esqueleto' ? 1 : 0);
        const own = run.summons.filter((s) => !s.dead && s.defId === def.summonId);
        const spawn = Math.max(1, maxN - own.length);
        for (let k = 0; k < spawn; k++) run.summons.push(makeSummonUnit(c, def.summonId, hero, powMult, sk.effDuration || 12));
        // enquanto exceder, remove os mais antigos
        while (run.summons.filter((s) => !s.dead && s.defId === def.summonId).length > maxN) {
          const oldest = run.summons.find((s) => !s.dead && s.defId === def.summonId);
          if (oldest) oldest.dead = true; else break;
        }
        burst(run, hero, '#a8e8b8', 8, 'summon');
      }
      // drone-reparador também cura
      if (def.healMult) heal(c, hero, atk('sagrado') * def.healMult);
      for (const st of def.status ?? []) applyStatus(hero, st.id, st.duration, st.potency ?? 0.4, 'hero');
      break;
    }
    case 'dash': {
      // reposiciona e causa dano no trajeto
      const es = aliveEnemies(run);
      const dir = hero.hp / hero.maxHp < 0.4 ? -1 : 1;
      const dest = Math.max(HERO_MIN_X, Math.min(HERO_MAX_X, hero.x + dir * 3));
      const lo = Math.min(hero.x, dest), hi = Math.max(hero.x, dest);
      for (const st of def.status ?? []) applyStatus(hero, st.id, st.duration, st.potency ?? 0.3, 'hero');
      if (def.mult > 0) {
        const r = sk.effRadius || 1.5;
        for (const e of es) if (e.x >= lo - r && e.x <= hi + r) {
          dealDamage(c, hero, e, atk(def.dmgKind) * sk.effMult, def.dmgKind, { isSkill: true, skillIdx: i, critChanceAdd: mods.critChance });
          applySkillStatuses(c, hero, e, def, mods);
        }
      }
      hero.x = dest;
      burst(run, hero, '#88d8ff', 8, 'dash');
      break;
    }
    case 'debuff': {
      const center = target ?? hero;
      const r = (sk.effRadius || 4) * hero.stats.areaBonus;
      const list = def.targeting === 'cluster' ? enemiesInRadius(run, center.x, r) : (target ? [target] : []);
      for (const tg of list) {
        for (const st of def.status ?? []) applyStatus(tg, st.id, st.duration, st.potency ?? 0.3, 'hero');
        for (const st of mods.extraStatus) applyStatus(tg, st.id, st.duration, st.potency ?? 0.3, 'hero');
        if (def.mult > 0) dealDamage(c, hero, tg, atk(def.dmgKind) * sk.effMult, def.dmgKind, { isSkill: true, skillIdx: i });
      }
      burst(run, center, '#c8a8f8', 8, 'debuff');
      break;
    }
    case 'sacrifice': {
      if (def.id === 'explodir-servo') {
        const servo = run.summons.find((s) => !s.dead && s.defId === 'servo-esqueleto');
        const center = servo ?? target ?? hero;
        if (servo) servo.dead = true;
        const r = (sk.effRadius || 3) * hero.stats.areaBonus;
        for (const e of enemiesInRadius(run, center.x, r)) {
          dealDamage(c, hero, e, atk(def.dmgKind) * sk.effMult, def.dmgKind, { isSkill: true, skillIdx: i, vsElite: mods.vsEliteBoss });
          applySkillStatuses(c, hero, e, def, mods);
        }
        burst(run, center, '#a878e8', 16, 'nova');
        run.shake = Math.min(1, run.shake + 0.4);
      } else if (def.id === 'catalisador') {
        // detona todos os DoTs em área — dano proporcional
        const center = target ?? hero;
        const r = (sk.effRadius || 5) * hero.stats.areaBonus;
        for (const e of enemiesInRadius(run, center.x, r)) {
          const dotCount = e.statuses.filter((s) => isDot(s.id)).length;
          const dmg = atk(def.dmgKind) * sk.effMult * (1 + dotCount * 0.8);
          dealDamage(c, hero, e, dmg, def.dmgKind, { isSkill: true, skillIdx: i, vsElite: mods.vsEliteBoss });
          if (dotCount > 0) { c.run; }
        }
        burst(run, center, '#c8f048', 16, 'nova');
        run.shake = Math.min(1, run.shake + 0.4);
      } else {
        // pacto-pálido e afins: buff próprio
        for (const st of def.status ?? []) applyStatus(hero, st.id, st.duration, st.potency ?? 0.4, 'hero');
        if (def.mult > 0 && target) dealDamage(c, hero, target, atk(def.dmgKind) * sk.effMult, def.dmgKind, { isSkill: true, skillIdx: i });
        burst(run, hero, '#e888c8', 8, 'buff');
      }
      break;
    }
  }
}

function applySkillStatuses(c: RunController, hero: Unit, tg: Unit, def: SkillRuntime['def'], mods: import('../types').SkillMods): void {
  for (const st of def.status ?? []) {
    if (st.chance >= 1 || c.rng.chance(st.chance)) {
      const pot = isDot(st.id) ? hero.stats.power * (st.potency ?? 0.15) * hero.stats.dotDamage : (st.potency ?? 0.3);
      applyStatus(tg, st.id, st.duration, pot, 'hero');
    }
  }
  for (const st of mods.extraStatus) {
    if (st.chance >= 1 || c.rng.chance(st.chance)) {
      const pot = isDot(st.id) ? hero.stats.power * (st.potency ?? 0.12) * hero.stats.dotDamage : (st.potency ?? 0.3);
      applyStatus(tg, st.id, st.duration, pot, 'hero');
    }
  }
}

function onSkillKillEffects(c: RunController, hero: Unit, tg: Unit, i: number, mods: import('../types').SkillMods): void {
  if (!tg.dead) return;
  if (mods.onKillHeal > 0) heal(c, hero, hero.maxHp * mods.onKillHeal / 100);
  if (mods.onKillReset > 0 && c.rng.chance(mods.onKillReset)) c.run.skillCds[i] = 0;
  if (mods.explodeOnKill > 0) {
    for (const e of enemiesInRadius(c.run, tg.x, 2.2)) if (e !== tg)
      dealDamage(c, hero, e, hero.stats.power * mods.explodeOnKill / 100, 'fogo', { isSkill: true, skillIdx: 5 });
    burst(c.run, tg, '#ff8838', 10, 'nova');
  }
  if (mods.spreadOnKill) {
    const dots = tg.statuses.filter((s) => isDot(s.id));
    for (const e of enemiesInRadius(c.run, tg.x, 2.4)) if (e !== tg)
      for (const dot of dots) applyStatus(e, dot.id, dot.remaining, dot.potency, 'hero');
  }
}

// ============ IA DO HERÓI ============
function heroBrain(c: RunController, dt: number): void {
  const run = c.run, hero = run.hero, ai = HERO_BY_ID[hero.defId].ai;
  if (hero.dead) return;
  const es = aliveEnemies(run);
  const near = nearest(hero, es);

  // poção automática
  if (hero.hp / hero.maxHp < ai.potionAt && run.potion.charges > 0 && (hero._potionGcd ?? 0) <= 0 && es.length) {
    drinkPotion(c);
    hero._potionGcd = POTION_GCD;
  }
  hero._potionGcd = Math.max(0, (hero._potionGcd ?? 0) - dt);

  // habilidades
  hero._castGcd = Math.max(0, (hero._castGcd ?? 0) - dt);
  if (hero._castGcd <= 0 && canAct(hero) && es.length) {
    const i = chooseSkill(c);
    if (i >= 0) { castSkill(c, i); hero._castGcd = CAST_GCD; }
  }

  // movimento + ataque básico
  if (near && canMove(hero)) {
    const d = near.x - hero.x; // >0 inimigo à direita
    const dist = Math.abs(d);
    const kite = ai.keepDistance;
    const lowHp = hero.hp / hero.maxHp < ai.retreatHp;
    let move = 0;
    const spd = hero.stats.speed * hasteMult(hero) * (hasStatus(hero, 'slow') ? 1 : 1);
    if (kite > 0) {
      // à distância: mantém faixa
      if (lowHp && ai.retreatHp > 0) move = -1;
      else if (dist < kite - 0.6) move = -1;
      else if (dist > kite + 0.6) move = 1;
    } else {
      // corpo a corpo: fecha até o alcance
      if (dist > hero.stats.range * 0.85) move = 1;
    }
    if (move !== 0) {
      hero.x = Math.max(HERO_MIN_X, Math.min(HERO_MAX_X, hero.x + move * spd * dt));
      hero.facing = d >= 0 ? 1 : -1;
      hero.anim = 'walk';
      if (hero.stats.moveDamage > 0) hero._moved = 0.25;
    } else {
      hero.facing = d >= 0 ? 1 : -1;
    }
    hero._moved = Math.max(0, (hero._moved ?? 0) - dt);
    // ataque básico
    hero.attackCd -= dt;
    if (dist <= hero.stats.range + 0.3 && hero.attackCd <= 0 && canAct(hero)) {
      const kind = BASIC_KIND[hero.defId as HeroId];
      let dmg = hero.stats.power;
      if (hero.stats.moveDamage > 0 && (hero._moved ?? 0) > 0) dmg *= (1 + hero.stats.moveDamage);
      if (hero.defId === 'monge') { run.comboStacks = Math.min(10, run.comboStacks + 1); dmg *= (1 + run.comboStacks * 0.04); }
      dealDamage(c, hero, near, dmg, kind, {});
      hero.attackCd = hero.stats.attackInterval / hasteMult(hero);
      if (hero.anim !== 'walk') { hero.anim = 'attack'; hero.animT = 0; }
    }
  } else if (!near) {
    hero.anim = 'idle';
  }
}

function chooseSkill(c: RunController): number {
  const run = c.run, hero = run.hero, es = aliveEnemies(run), ai = HERO_BY_ID[hero.defId as HeroId].ai;
  const eliteNear = es.some((e) => e.tier !== 'comum');
  const groupN = es.length;
  let bestI = -1, bestScore = 0;
  c.loadout.skills.forEach((sk, i) => {
    if (run.skillCds[i] > 0) return;
    const def = sk.def;
    let score = 0;
    const hpRatio = hero.hp / hero.maxHp;
    switch (def.kind) {
      case 'heal': score = hpRatio < 0.75 ? (1 - hpRatio) * 3 : 0; break;
      case 'buff': score = (hpRatio < 0.95 ? 1.1 : 0.5) + (groupN >= 2 ? 0.3 : 0); break;
      case 'summon': {
        const own = run.summons.filter((s) => !s.dead && s.defId === def.summonId).length;
        score = own === 0 ? 1.6 : 0.2; break;
      }
      case 'dash': score = hpRatio < ai.retreatHp ? 1.8 : (groupN >= 2 ? 0.9 : 0.4); break;
      case 'execute': { const low = es.some((e) => e.hp / e.maxHp <= (def.executeThreshold ?? 0.35)); score = low ? 2.2 : 0; break; }
      case 'debuff': score = eliteNear ? 1.3 : (groupN >= ai.groupSize ? 1.0 : 0.5); break;
      case 'aoe': case 'dot-aoe': {
        const isBig = i === c.bigSkillIndex;
        if (isBig && ai.holdBigFor === 'group') score = groupN >= ai.groupSize ? 1.7 : 0.1;
        else if (isBig && ai.holdBigFor === 'elite') score = eliteNear ? 1.9 : 0.15;
        else score = groupN >= 2 ? 1.4 : 0.7;
        break;
      }
      case 'sacrifice': {
        if (def.id === 'explodir-servo') score = run.summons.some((s) => !s.dead && s.defId === 'servo-esqueleto') && groupN >= 2 ? 1.5 : 0;
        else if (def.id === 'catalisador') score = es.some((e) => e.statuses.some((s) => isDot(s.id))) ? 1.6 : 0.2;
        else score = 1.0;
        break;
      }
      default: score = 1.0; // strike
    }
    if (score > bestScore) { bestScore = score; bestI = i; }
  });
  return bestScore > 0.3 ? bestI : -1;
}

function drinkPotion(c: RunController): void {
  const run = c.run, hero = run.hero, l = c.loadout;
  run.potion.charges--;
  run.potionsUsed++;
  heal(c, hero, hero.maxHp * l.potionHeal);
  if (l.potionCleanse) cleanse(hero);
  if (l.potionShield > 0) addShield(c, hero, hero.maxHp * l.potionShield);
  fireProcs(c, 'onPotion');
  burst(run, hero, '#ff88a8', 10, 'potion');
  log(run, `${hero.nome} bebe uma poção (${run.potion.charges} restantes).`, 'good');
}

// ============ IA DE INIMIGOS ============
function enemyBrain(c: RunController, e: Unit, dt: number): void {
  const run = c.run, hero = run.hero;
  if (e.dead) return;
  const d = ENEMY_BY_ID[e.defId];
  // alvo: herói ou invocação mais próxima (swarm/melee às vezes bate em invocações)
  const heroSide: Unit[] = [hero, ...run.summons.filter((s) => !s.dead)];
  let target = hero;
  if ((d.behavior === 'melee' || d.behavior === 'swarm' || d.behavior === 'assassin') && run.summons.some((s) => !s.dead)) {
    const nr = nearest(e, heroSide);
    if (nr && Math.abs(nr.x - e.x) < Math.abs(hero.x - e.x) - 0.5) target = nr;
  }
  // enrage passivo
  if (d.special?.id === 'enrage' && !e.enraged && e.hp / e.maxHp < 0.5) { e.enraged = true; floatText(run, e, 'fúria!', '#ff6040'); }
  // regen passivo
  if (d.special?.id === 'regen') e.hp = Math.min(e.maxHp, e.hp + e.maxHp * d.special.power * 0.03 * dt);
  // armor-aura passivo (buffa aliados próximos)
  if (d.special?.id === 'armor-aura') for (const o of run.enemies) if (!o.dead && o !== e && Math.abs(o.x - e.x) < 4) applyStatus(o, 'blessed', 0.4, d.special.power, 'enemy');

  // especial ativo
  if (e.specialCd != null && d.special) {
    e.specialCd -= dt;
    if (e.specialCd <= 0 && canAct(e)) { enemySpecial(c, e, d); e.specialCd = d.special.cooldown; }
  }

  // movimento
  const dist = Math.abs(target.x - e.x);
  const dir = target.x > e.x ? 1 : -1;
  e.facing = dir >= 0 ? 1 : -1;
  if (canMove(e) && dist > e.stats.range) {
    const spd = e.stats.speed * hasteMult(e) * (d.behavior === 'tank' ? 0.9 : 1);
    e.x += dir * spd * dt;
    e.anim = 'walk';
  }
  // ataque
  if (canAct(e)) {
    e.attackCd -= dt;
    if (dist <= e.stats.range + 0.3 && e.attackCd <= 0) {
      const actual = dealDamage(c, e, target, e.stats.power, d.dmgKind, { canDodge: true });
      // riders on-hit
      if (d.special && actual > 0) applyHitRider(c, e, target, d);
      if (d.special?.id === 'lifedrain' && actual > 0) e.hp = Math.min(e.maxHp, e.hp + actual * d.special.power);
      e.attackCd = e.stats.attackInterval / hasteMult(e);
      e.anim = 'attack'; e.animT = 0;
    }
  }
}

function applyHitRider(c: RunController, e: Unit, tgt: Unit, d: EnemyDef): void {
  const sp = d.special!;
  const pot = e.stats.power;
  switch (sp.id) {
    case 'poison-hit': applyStatus(tgt, 'poison', 4, pot * sp.power * 0.4, 'enemy'); break;
    case 'bleed-hit': applyStatus(tgt, 'bleed', 4, pot * sp.power * 0.4, 'enemy'); break;
    case 'slow-hit': applyStatus(tgt, 'slow', 2, sp.power, 'enemy'); break;
    case 'stun-hit': if (c.rng.chance(sp.power)) applyStatus(tgt, 'stun', 0.8, 1, 'enemy'); break;
  }
}

function enemySpecial(c: RunController, e: Unit, d: EnemyDef): void {
  const run = c.run, sp = d.special!;
  switch (sp.id) {
    case 'summon-adds': {
      const pool = ENEMIES_BY_DUNGEON[d.dungeonId]?.filter((x) => x.tier === 'comum') ?? [];
      const already = run.enemies.filter((o) => !o.dead && o.tier === 'comum').length;
      const room = Math.max(0, BALANCE.addCap - already);
      if (pool.length && room > 0) {
        const n = Math.min(room, 1 + Math.round(sp.power));
        for (let k = 0; k < n; k++) run.enemies.push(makeEnemyUnit(c, c.rng.pick(pool).id, 'comum', Math.min(HERO_MAX_X, e.x + 0.5 + k * 0.4)));
        floatText(run, e, 'convoca!', '#c8a8f8');
      }
      break;
    }
    case 'heal-allies': {
      // cura OUTROS aliados feridos — nunca a si mesmo (evita curandeiro solitário imortal)
      const allies = run.enemies.filter((o) => !o.dead && o !== e && o.hp < o.maxHp);
      const tgt = allies.sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
      if (tgt) { tgt.hp = Math.min(tgt.maxHp, tgt.hp + tgt.maxHp * 0.1 * sp.power); burst(run, tgt, '#7ae87a', 6, 'heal'); }
      break;
    }
    case 'shield-self': e.shield = Math.max(e.shield, e.maxHp * 0.15 * sp.power); burst(run, e, '#88c8ff', 6, 'shield'); break;
    case 'teleport': {
      const hero = run.hero;
      e.x = Math.max(HERO_MIN_X, Math.min(HERO_MAX_X, hero.x + (c.rng.chance(0.5) ? -1 : 1) * (2 + c.rng.next() * 3)));
      burst(run, e, '#b8a8f8', 8, 'teleport'); break;
    }
    case 'burn-ground': {
      const hero = run.hero;
      for (const t of [hero, ...run.summons.filter((s) => !s.dead)]) if (Math.abs(t.x - hero.x) < 2)
        applyStatus(t, 'burn', 3, e.stats.power * 0.3 * sp.power, 'enemy');
      burst(run, hero, '#ff8838', 8, 'field'); break;
    }
  }
}

// ============ INVOCAÇÕES ============
function summonBrain(c: RunController, s: Unit, dt: number): void {
  const run = c.run;
  if (s.dead) return;
  if (s.summonTtl != null) { s.summonTtl -= dt; if (s.summonTtl <= 0) { s.dead = true; return; } }
  const target = nearest(s, aliveEnemies(run));
  if (!target) { s.anim = 'idle'; return; }
  const dist = Math.abs(target.x - s.x);
  s.facing = target.x > s.x ? 1 : -1;
  if (s.stats.speed > 0 && dist > s.stats.range) { s.x += (target.x > s.x ? 1 : -1) * s.stats.speed * dt; s.anim = 'walk'; }
  s.attackCd -= dt;
  if (dist <= s.stats.range + 0.3 && s.attackCd <= 0) {
    dealDamage(c, s, target, s.stats.power, ENEMY_BY_ID[target.defId] ? SUMMONS[s.defId].dmgKind : 'fisico', { isSkill: true, skillIdx: 5 });
    s.attackCd = s.stats.attackInterval;
    s.anim = 'attack'; s.animT = 0;
  }
}

// ============ TICK DE STATUS ============
function tickStatuses(c: RunController, u: Unit, dt: number): void {
  if (u.dead) return;
  for (const s of u.statuses) {
    s.remaining -= dt;
    if (isDot(s.id)) {
      const dps = s.potency * (isDot(s.id) ? s.stacks : 1);
      const dmg = dps * dt;
      if (dmg > 0) {
        u.hp -= dmg;
        if (u.side === 'hero' && u.defId === c.run.heroId) { c.run.dmgTaken += dmg; }
        else if (u.side === 'enemy') { c.run.dmgDealt += dmg; c.run.dmgBySkill[5] += dmg; }
      }
    } else if (s.id === 'regen') {
      heal(c, u, u.maxHp * s.potency * dt, true);
    }
  }
  u.statuses = u.statuses.filter((s) => s.remaining > 0);
  if (u.hp <= 0 && !u.dead) {
    // morte por DoT
    const src = u.side === 'enemy' ? c.run.hero : { nome: 'veneno' } as Unit;
    killUnit(c, u, src as Unit);
  }
}

// ============ PASSO PRINCIPAL ============
export function stepRun(c: RunController, dt: number): void {
  const run = c.run;
  dt = Math.min(0.1, dt); // estabilidade
  run.t += dt;
  run.shake = Math.max(0, run.shake - dt * 2);
  // decai floats/particles sempre
  for (const f of run.floats) f.t += dt;
  run.floats = run.floats.filter((f) => f.t < 1);
  for (const p of run.particles) { p.t += dt; p.x += p.vx * dt; p.vy -= 6 * dt; }
  run.particles = run.particles.filter((p) => p.t < p.ttl);
  for (const f of run.fx) f.t += dt;
  run.fx = run.fx.filter((f) => f.t < f.ttl);

  if (run.over) return;

  animAdvance(run, dt);

  switch (run.phase) {
    case 'walk': {
      run.phaseT -= dt;
      const hero = run.hero;
      // regen andando
      const regen = (HERO_BY_ID[hero.defId].walkRegen + hero.stats.regenPerSec) / 100 * hero.maxHp;
      heal(c, hero, regen * dt, true);
      hero.anim = 'walk';
      hero.facing = 1;             // sempre avançando para a frente (direita)
      // a sensação de avanço vem do parallax rolando; herói marcha no lugar
      // limpa invocações mortas
      run.summons = run.summons.filter((s) => !s.dead);
      if (run.phaseT <= 0) startEncounter(c);
      break;
    }
    case 'boss-intro': {
      run.phaseT -= dt;
      run.hero.anim = 'idle';
      if (run.phaseT <= 0) { run.phase = 'fight'; run.phaseT = 0; }
      break;
    }
    case 'fight': {
      // hazard da dungeon
      if (c.dungeon.hazard) {
        c.hazardCd -= dt;
        if (c.hazardCd <= 0) { applyHazard(c); c.hazardCd = hazardInterval(c.dungeon.hazard.kind); }
      }
      // status
      tickStatuses(c, run.hero, dt);
      for (const s of run.summons) tickStatuses(c, s, dt);
      for (const e of run.enemies) tickStatuses(c, e, dt);
      // recargas
      for (let i = 0; i < 4; i++) run.skillCds[i] = Math.max(0, run.skillCds[i] - dt);
      // cérebros
      if (!run.hero.dead) heroBrain(c, dt);
      for (const s of run.summons) summonBrain(c, s, dt);
      for (const e of run.enemies) if (!e.dead) enemyBrain(c, e, dt);
      // boss fases
      const boss = run.enemies.find((e) => e.tier === 'chefe' && !e.dead);
      if (boss) updateBossPhase(c, boss);
      // limpeza
      run.enemies = run.enemies.filter((e) => !e.dead || e.animT < 0.7);
      run.summons = run.summons.filter((s) => !s.dead || s.animT < 0.7);
      if (run.hero.dead) { finishRun(c, false); break; }
      if (aliveEnemies(run).length === 0) advanceEncounter(c);
      break;
    }
  }
}

function animAdvance(run: RunState, dt: number): void {
  run.hero.animT += dt;
  if ((run.hero.anim === 'attack' || run.hero.anim === 'cast' || run.hero.anim === 'hit' || run.hero.anim === 'dash') && run.hero.animT > 0.3) run.hero.anim = 'idle';
  for (const e of run.enemies) { e.animT += dt; if ((e.anim === 'attack' || e.anim === 'hit') && e.animT > 0.3) e.anim = 'idle'; }
  for (const s of run.summons) { s.animT += dt; if ((s.anim === 'attack' || s.anim === 'hit') && s.animT > 0.3) s.anim = 'idle'; }
}

function startEncounter(c: RunController): void {
  const run = c.run;
  if (c.encounterIndex >= c.encounters.length) { finishRun(c, true); return; }
  const enc = c.encounters[c.encounterIndex];
  run.roomIndex = c.encounterIndex;
  run.hero.x = HERO_START_X;
  // spawn
  run.enemies = [];
  const n = enc.spawns.length;
  enc.spawns.forEach((sp, i) => {
    const x = n === 1 ? 10.5 : 8.5 + (i / Math.max(1, n - 1)) * 4;
    run.enemies.push(makeEnemyUnit(c, sp.defId, sp.tier, Math.min(HERO_MAX_X, x)));
  });
  run.comboStacks = 0;
  if (enc.kind === 'boss') { run.phase = 'boss-intro'; run.phaseT = BOSS_INTRO; log(run, `CHEFE: ${ENEMY_BY_ID[enc.spawns[0].defId].nome} desperta!`, 'boss'); }
  else { run.phase = 'fight'; run.phaseT = 0; if (enc.kind === 'subboss') log(run, `Subchefe: ${ENEMY_BY_ID[enc.spawns[0].defId].nome}.`, 'boss'); }
  fireProcs(c, 'fightStart');
}

function advanceEncounter(c: RunController): void {
  const run = c.run;
  const enc = c.encounters[c.encounterIndex];
  // recompensa de essência já contabilizada por kill (bounty) — aqui só progride
  c.encounterIndex++;
  run.progress = Math.min(1, c.encounterIndex / c.encounters.length);
  if (enc && enc.kind === 'boss') { finishRun(c, true); return; }
  if (c.encounterIndex >= c.encounters.length) { finishRun(c, true); return; }
  run.hero.x = HERO_START_X;       // volta à marca inicial ANTES da caminhada (evita andar de costas)
  run.hero.facing = 1;
  run.phase = 'walk';
  run.phaseT = WALK_TIME;
}

function finishRun(c: RunController, victory: boolean): void {
  const run = c.run;
  if (run.over) return;
  run.over = true;
  run.result = victory ? 'vitoria' : 'derrota';
  run.phase = victory ? 'victory' : 'defeat';
  run.progress = victory ? 1 : run.progress;
  run.hero.anim = victory ? 'victory' : 'death';
  if (victory) log(run, `${run.hero.nome} conquistou ${c.dungeon.nome}!`, 'good');
}

// ============ RECOMPENSA (essência da run) ============
export function runEssence(c: RunController): number {
  // soma dos bounties dos inimigos abatidos, ponderada pela dungeon
  const factor = DUNGEON_REWARD_FACTOR[c.dungeon.id] ?? 1;
  return Math.round(c.run.kills * 3 * factor + c.run.eliteKills * 8 * factor + c.run.subbossKills * 30 * factor + (c.run.bossKilled ? 120 * factor : 0));
}

// ============ HAZARDS ============
function hazardInterval(kind: string): number {
  switch (kind) { case 'ember-rain': return 3.5; case 'bone-storm': return 3; case 'void-pulse': return 4; default: return 1; }
}
function applyHazard(c: RunController): void {
  const run = c.run, h = c.dungeon.hazard!, hero = run.hero;
  const tick = h.power * hero.maxHp;
  switch (h.kind) {
    case 'poison-mist': applyStatus(hero, 'poison', 1.2, tick * 0.006, 'enemy'); break;
    case 'ember-rain': dealDamage(c, run.enemies[0] ?? hero, hero, hero.maxHp * 0.04, 'fogo', { canDodge: false, silent: false }); break;
    case 'void-pulse': dealDamage(c, run.enemies[0] ?? hero, hero, hero.maxHp * 0.045, 'sombra', { canDodge: false }); break;
    case 'swamp-regen': for (const e of aliveEnemies(run)) e.hp = Math.min(e.maxHp, e.hp + e.maxHp * 0.02); break;
    case 'bone-storm': dealDamage(c, run.enemies[0] ?? hero, hero, hero.maxHp * 0.035, 'fisico', { canDodge: true }); break;
  }
}

// ============ FASES DE CHEFE ============
function updateBossPhase(c: RunController, boss: Unit): void {
  const ratio = boss.hp / boss.maxHp;
  const want = ratio > 0.66 ? 0 : ratio > 0.33 ? 1 : 2;
  if ((boss.phase ?? 0) < want) {
    boss.phase = want;
    const d = ENEMY_BY_ID[boss.defId];
    boss.shield = Math.max(boss.shield, boss.maxHp * 0.06);
    applyStatus(boss, 'hasteup', 6, 0.12 * want, 'enemy');
    const addsAlive = c.run.enemies.filter((o) => !o.dead && o.tier === 'comum').length;
    if ((d.special?.id === 'summon-adds' || d.special?.id === 'phase-shift') && addsAlive < 2) enemySpecial(c, boss, { ...d, special: { id: 'summon-adds', power: 1, cooldown: 10, desc: '' } });
    if (d.special?.id === 'enrage') boss.enraged = true;
    burst(c.run, boss, '#ffffff', 20, 'phase');
    c.run.shake = Math.min(1, c.run.shake + 0.6);
    log(c.run, `${boss.nome} entra na fase ${want + 1}!`, 'boss');
  }
}
