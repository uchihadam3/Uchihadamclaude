export type DiceType = 'normal' | 'corrupted' | 'unstable';

export type BossPhase = 'the_void' | 'the_wall' | 'the_chains' | 'the_needle' | 'the_glitch' | 'the_black_hole' | 'the_taxes';
export type DiceModifier = 'gold' | 'foil' | 'holographic' | 'polychrome';
export type DiceSeal = 'none' | 'gold_seal' | 'blood_seal' | 'quantum_seal';

export type RunCore = 'standard' | 'alchemist' | 'void_cultist' | 'gambler';

export interface Dice {
  id: string;
  value: number;
  corruption: number;
  type: DiceType;
  locked: boolean;
  destroyed: boolean;
  forceValue?: number;
  modifier?: DiceModifier;
  seal?: DiceSeal;
  xp?: number;
  ascended?: boolean;
  material?: 'normal' | 'glass' | 'steel' | 'midas' | 'wood' | 'obsidian';
}

export interface Activation {
  name: string;
  type: 'base' | 'mult';
  value: number;
}

export interface HandInfo {
  base: number;
  mult: number;
  text: string;
  total: number;
  activations: Activation[];
  involvedDiceIds: string[];
}

export interface RelicDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'void';
  synergySet?: string;
}

export type GameStatus = 'publisher' | 'intro' | 'lore' | 'core_select' | 'menu' | 'playing' | 'rolling' | 'drafting' | 'shop' | 'event' | 'boss_intro' | 'gameover' | 'victory' | 'meta_lab';

export interface HandLevel {
  level: number;
  basePoints: number;
  baseMult: number;
}

export type HandLevels = Record<string, HandLevel>;

export interface MetaUpgrades {
  startingSteelDie: boolean;
  startingGlassDie: boolean;
  startingMidasDie: boolean;
  xpMultiplier: number;
  startingConsumables: string[];
  unlockedBlueprints: string[];
}

export interface GameState {
  status: GameStatus;
  runCore: RunCore;
  round: number; // e.g. 1
  blind: number; // e.g. 1 (Small), 2 (Big), 3 (Boss)
  bossPhase: BossPhase | null;
  gold: number;
  targetScore: number;
  currentRoundScore: number;
  totalScore: number;
  rollsLeft: number;
  maxRolls: number;
  activeDirective: {
    id: string;
    text: string;
    rewardType: 'gold' | 'meta_shards';
    rewardValue: number;
    completed: boolean;
  } | null;
  dice: Dice[];
  relics: string[];
  handLevels: HandLevels;
  lastHandInfo: HandInfo | null;
  shopItems: string[]; // Store Relics available in current shop
  selectedDiceSet: string;
  unlockedDiceSets: string[];
  activeVoidCurses: Record<string, string>; // Map relicId -> active drawback curse key
  consumables?: string[]; // Disposable hack executables e.g. ['hack_rewrite.exe']
  metaShards?: number;
  metaUpgrades?: MetaUpgrades;
}
