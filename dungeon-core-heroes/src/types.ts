// ============================================================
// DUNGEON CORE HEROES — tipos centrais
// ============================================================

export type HeroId =
  | 'guerreiro' | 'arqueira' | 'mago' | 'ladino' | 'clériga'
  | 'druida' | 'monge' | 'engenheira' | 'necromante' | 'alquimista';

export type Rarity = 'comum' | 'incomum' | 'rara' | 'epica' | 'lendaria';

export type DamageKind = 'fisico' | 'magico' | 'fogo' | 'sagrado' | 'sombra' | 'natureza' | 'raio' | 'quimico';

export type StatusId =
  | 'burn' | 'bleed' | 'poison' | 'shock' | 'acid'      // DoTs / debuffs de dano
  | 'stun' | 'slow' | 'root' | 'blind' | 'weaken'       // controle
  | 'mark' | 'vulnerable' | 'armorbreak'                // amplificadores
  | 'shieldup' | 'dodgeup' | 'hasteup' | 'powerup' | 'regen' | 'blessed' | 'taunted'; // buffs

// ---------- estatísticas base ----------
export interface Stats {
  hp: number;            // vida máxima
  power: number;         // dano base de ataque
  spellPower: number;    // multiplicador de habilidades (base 100 = 100%)
  defense: number;       // redução: 100/(100+def)
  magicDefense: number;
  attackInterval: number; // segundos entre ataques básicos
  critChance: number;    // 0-1
  critMult: number;      // ex 1.6
  dodge: number;         // 0-1
  speed: number;         // unidades/s de deslocamento
  range: number;         // alcance de ataque básico (unidades)
  lifesteal: number;     // 0-1 do dano causado
  cdr: number;           // redução de recarga 0-0.6
  areaBonus: number;     // multiplicador de área (1 = normal)
  healBonus: number;     // multiplicador de cura recebida/causada
  eliteDamage: number;   // mult vs elite/subchefe
  bossDamage: number;    // mult vs chefe
  dotDamage: number;     // mult de dano ao longo do tempo
  summonPower: number;   // mult de vida/dano de invocações
  shieldPower: number;   // mult de escudos
  blockChance: number;   // 0-1 bloqueio (reduz 60%)
  regenPerSec: number;   // regeneração de vida por segundo
  moveDamage: number;    // bônus de dano após mover (monge)
  potionPower: number;   // mult de cura da poção
}

export type StatKey = keyof Stats;

// ---------- habilidades ----------
export type SkillKind =
  | 'strike'      // dano em alvo único
  | 'aoe'         // dano em área
  | 'dot-aoe'     // área com dano ao longo do tempo (chão ardente, bomba tóxica)
  | 'buff'        // defesa/poder próprio
  | 'heal'        // cura
  | 'summon'      // invocação
  | 'dash'        // reposicionamento com dano/esquiva
  | 'debuff'      // enfraquece inimigos
  | 'execute'     // dano vs vida baixa
  | 'sacrifice';  // efeitos especiais (explodir servo, catalisador, pacto)

export interface SkillDef {
  id: string;
  heroId: HeroId;
  nome: string;
  desc: string;
  kind: SkillKind;
  icon: string;               // id do pintor de ícone
  cooldown: number;           // s
  mult: number;               // multiplicador de power
  radius?: number;            // área (unidades)
  duration?: number;          // s (buffs, dots, invocações)
  dotDps?: number;            // dano/s relativo a power (0.3 = 30% power por s)
  status?: { id: StatusId; chance: number; duration: number; potency?: number }[];
  healMult?: number;          // cura relativa a power
  shieldMult?: number;        // escudo relativo a power
  summonId?: string;          // criatura invocada
  executeThreshold?: number;  // % de vida p/ bônus de execução
  executeMult?: number;
  dmgKind: DamageKind;
  targeting: 'nearest' | 'strongest' | 'weakest' | 'cluster' | 'self' | 'elite-first' | 'lowest-hp';
  tags: string[];             // p/ gerador de cartas: 'fogo','area','critico','sangramento',...
}

// estado evolutivo de uma habilidade num save
export interface SkillState {
  level: number;                    // 1-10
  cards: ChosenCard[];              // cartas escolhidas (histórico)
  mods: SkillMods;                  // efeito agregado das cartas
  mutation: string | null;          // id da mutação nv5
  evolution: string | null;         // id da evolução nv10
}

export interface SkillMods {
  multPct: number;         // +% dano/cura
  cooldownPct: number;     // -% recarga (positivo = mais rápido)
  radiusPct: number;
  durationPct: number;
  dotPct: number;
  critChance: number;      // + chance de crítico da habilidade
  extraStatus: { id: StatusId; chance: number; duration: number; potency?: number }[];
  ricochet: number;        // nº de alvos extras
  extraHits: number;       // golpes/projéteis extras
  onKillHeal: number;      // % vida ao matar com esta skill
  onKillReset: number;     // chance de resetar recarga ao matar
  spreadOnKill: boolean;   // espalha DoT ao matar
  explodeOnKill: number;   // % power de explosão ao matar alvo com DoT
  ignoreDefense: number;   // 0-1
  vsEliteBoss: number;     // +mult contra elite/chefe
  lowHpBonus: number;      // +mult vs alvos <30%
  selfShieldOnCast: number;// escudo % power ao conjurar
  hasteOnCast: number;     // s de haste ao conjurar
  chainCount: number;      // corrente (raio/fagulha)
  summonBonusPct: number;  // invocações mais fortes
  extraCharge: number;     // cargas extras (torres, servos simultâneos)
}

// ---------- equipamentos ----------
export type EquipSlot = 'cabeca' | 'corpo' | 'arma' | 'botas' | 'amuleto' | 'anel';

export interface EquipDef {
  id: string;
  heroId: HeroId;
  slot: EquipSlot;
  nome: string;
  desc: string;
  icon: string;
  // bônus base por nível (aplicado ×nível)
  perLevel: Partial<Record<StatKey, number>>;
}

export interface EquipState {
  level: number;             // 1-20
  cards: ChosenCard[];
  bonus: Partial<Record<StatKey, number>>;   // agregado das cartas
  procs: EquipProc[];        // efeitos condicionais
}

export type EquipProcWhen =
  | 'onPotion' | 'onLowHp' | 'onCrowded' | 'onKill' | 'onHitTaken' | 'onBlock'
  | 'onCrit' | 'fightStart' | 'onDodge';

export interface EquipProc {
  when: EquipProcWhen;
  effect: 'shield' | 'heal' | 'haste' | 'power' | 'defense' | 'burnNova' | 'cleanse' | 'resetPotion' | 'dodgeUp';
  amount: number;            // relativo (% power / % vida / segundos)
  duration?: number;
  chance?: number;
  oncePerRun?: boolean;
  desc: string;
}

// ---------- poção ----------
export interface PotionState {
  level: number;   // 1-5
  charges: number; // cargas restantes na run (max = 3, nv5 = 4)
}

// ---------- cartas de upgrade ----------
export interface UpgradeCard {
  uid: string;               // único na oferta
  poolId: string;            // id do template no pool
  nome: string;
  desc: string;
  raridade: Rarity;
  tipo: string;              // efeito principal ('dano','critico','defesa',...)
  icon: string;
  tags: string[];
  // efeito serializável — aplicado a SkillMods, Stats bonus ou EquipProc
  apply: CardEffect;
  budget: number;            // custo de poder estimado
}

export type CardEffect =
  | { kind: 'skill-mod'; skillId: string; mod: Partial<SkillMods> }
  | { kind: 'skill-status'; skillId: string; status: { id: StatusId; chance: number; duration: number; potency?: number } }
  | { kind: 'stat'; stats: Partial<Record<StatKey, number>> }
  | { kind: 'proc'; proc: EquipProc }
  | { kind: 'mutation'; skillId: string; mutationId: string }
  | { kind: 'evolution'; skillId: string; evolutionId: string };

export interface ChosenCard {
  poolId: string;
  nome: string;
  raridade: Rarity;
  levelAt: number;
  desc: string;
}

// ---------- inimigos ----------
export type EnemyTier = 'comum' | 'elite' | 'subchefe' | 'chefe';

export interface EnemyDef {
  id: string;
  nome: string;
  dungeonId: number;         // dungeon de origem
  tier: EnemyTier;
  hp: number;                // base (será × multiplicador da dungeon)
  damage: number;
  defense: number;
  magicDefense: number;
  attackInterval: number;
  speed: number;
  range: number;             // corpo a corpo ~1.2, distância 5-8
  dmgKind: DamageKind;
  // comportamentos
  behavior: 'melee' | 'ranged' | 'caster' | 'swarm' | 'tank' | 'healer' | 'summoner' | 'assassin';
  special?: EnemySpecial;
  resist?: DamageKind[];     // 50% de resistência
  weak?: DamageKind[];       // +50% de dano recebido
  visual: EnemyVisual;
  bounty: number;            // essência base
}

export interface EnemySpecial {
  id: 'poison-hit' | 'burn-ground' | 'heal-allies' | 'summon-adds' | 'shield-self'
  | 'enrage' | 'slow-hit' | 'teleport' | 'split' | 'regen' | 'stun-hit' | 'phase-shift'
  | 'bleed-hit' | 'armor-aura' | 'reflect' | 'lifedrain';
  power: number;             // intensidade relativa
  cooldown: number;
  desc: string;
}

export interface EnemyVisual {
  painter: string;           // arquétipo de pintor
  palette: { body: string; accent: string; glow?: string };
  scale: number;             // 0.6-2.5
}

// ---------- dungeons ----------
export interface DungeonDef {
  id: number;                // 1-10
  nome: string;
  tema: string;
  descricao: string;
  mecanica: string;
  multiplier: number;        // vida/dano dos inimigos
  rooms: number;             // encontros comuns (sem contar subchefes/chefe)
  enemies: string[];         // ids de inimigos comuns
  elites: string[];          // ids que aparecem como elite
  subboss1: string;
  subboss2: string;
  boss: string;
  ambient: DungeonAmbient;
  hazard?: { kind: 'poison-mist' | 'ember-rain' | 'void-pulse' | 'bone-storm' | 'swamp-regen'; power: number; desc: string };
}

export interface DungeonAmbient {
  skyTop: string; skyBottom: string;
  far: string; mid: string; near: string;   // camadas parallax
  floor: string; floorDark: string;
  glow: string;                              // cor de luz ambiente
  particles: 'spores' | 'dust' | 'leaves' | 'embers' | 'ghosts' | 'bubbles' | 'shards' | 'bones' | 'stars' | 'pulse';
  fog?: string;
}

// ---------- run (estado vivo do combate) ----------
export interface Unit {
  uid: number;
  side: 'hero' | 'enemy';
  defId: string;             // heroId ou enemyId
  nome: string;
  tier?: EnemyTier;
  x: number;                 // posição na lane (herói anda para +x)
  hp: number;
  maxHp: number;
  shield: number;
  stats: Stats;
  attackCd: number;          // tempo até próximo ataque
  statuses: ActiveStatus[];
  summonTtl?: number;        // vida útil de invocação
  ownerUid?: number;
  dead: boolean;
  // animação
  anim: string;              // 'idle' | 'walk' | 'attack' | 'cast' | 'hit' | 'death' | 'victory'
  animT: number;
  facing: 1 | -1;
  specialCd?: number;
  phase?: number;            // fases de chefe
  enraged?: boolean;
  // transientes de IA (herói)
  _castGcd?: number;
  _potionGcd?: number;
  _moved?: number;
}

export interface ActiveStatus {
  id: StatusId;
  remaining: number;
  potency: number;           // dps p/ dots, % p/ buffs
  source: 'hero' | 'enemy';
  stacks: number;
}

export interface FloatText { x: number; y: number; text: string; color: string; t: number; crit?: boolean }
export interface Particle { x: number; y: number; vx: number; vy: number; t: number; ttl: number; color: string; size: number; kind: string }

export interface RunLogEntry { t: number; msg: string; kind: 'info' | 'boss' | 'danger' | 'good' }

export interface RunState {
  heroId: HeroId;
  dungeonId: number;
  seedRun: number;
  t: number;                  // tempo simulado (s)
  progress: number;           // 0-1 da dungeon
  roomIndex: number;          // encontro atual
  totalRooms: number;         // encontros totais (com subchefes/chefe)
  phase: 'walk' | 'fight' | 'boss-intro' | 'victory' | 'defeat';
  phaseT: number;
  hero: Unit;
  summons: Unit[];
  enemies: Unit[];
  potion: PotionState;
  skillCds: number[];         // recarga atual das 4 skills
  skillUses: number[];
  comboStacks: number;        // monge
  chargesUsed: number;
  // métricas p/ relatório
  dmgDealt: number;
  dmgTaken: number;
  healed: number;
  kills: number;
  eliteKills: number;
  subbossKills: number;
  bossKilled: boolean;
  dmgBySkill: number[];       // 4 skills + [4]=ataque básico + [5]=invocações/DoT
  dmgTakenBy: Record<string, number>;
  potionsUsed: number;
  log: RunLogEntry[];
  floats: FloatText[];
  particles: Particle[];
  shake: number;
  over: boolean;
  result: 'vitoria' | 'derrota' | 'abandono' | null;
  deathCause?: string;
}

// ---------- save ----------
export interface HeroProgress {
  essence: number;
  maxDungeon: number;              // maior dungeon LIBERADA (vitórias em n liberam n+1)
  wins: number[];                  // vitórias por dungeon (index 0 = D1)
  attempts: number;
  bestTimes: Record<number, number>;
  skills: Record<string, SkillState>;
  equips: Record<string, EquipState>;
  potionLevel: number;             // 1-5
  lastOffer?: { context: string; poolIds: string[] } | null;
  refusedCounts: Record<string, number>;
  runsHistory: RunSummary[];
}

export interface RunSummary {
  dungeonId: number;
  result: 'vitoria' | 'derrota' | 'abandono';
  timeSec: number;
  progress: number;
  kills: number;
  essence: number;
  date: number;
}

export interface SaveData {
  version: number;
  seed: number;
  createdAt: number;
  heroes: Record<HeroId, HeroProgress>;
  globalEssence: number;
  rerollRunes: number;
  choiceSeals: number;
  achievements: Record<string, number>;
  stats: {
    totalRuns: number; totalWins: number; totalKills: number; totalEssence: number;
    totalCards: number; rareCards: number; epicCards: number; legendaryCards: number;
    fireDamage: number; poisonExplosions: number; bossFastKill: number; critKills: number;
  };
  settings: { volMaster: number; volMusic: number; volSfx: number; volAmbient: number; showLog: boolean };
  cardSerial: number;
}

// ---------- conquistas ----------
export interface AchievementDef {
  id: string;
  nome: string;
  desc: string;
  icon: string;
  reward: { essence?: number; rerollRunes?: number; choiceSeals?: number };
  check: string;             // avaliada no sistema de conquistas
  target: number;
}
