// ============================================================
// JARDIM VIVO — tipos centrais
// Tudo no jogo é data-driven a partir destes tipos.
// ============================================================

// ---------- enums básicos ----------
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';
export type Difficulty = 1 | 2 | 3 | 4 | 5; // muito fácil → especialista

export type PlantCategory =
  | 'annual' | 'perennial' | 'bulb' | 'rose-shrub' | 'tropical'
  | 'orchid' | 'succulent' | 'herb' | 'climber' | 'aquatic'
  | 'bonsai-tree' | 'carnivorous' | 'wildflower';

export type LightType =
  | 'full-sun' | 'morning-sun' | 'afternoon-sun' | 'part-shade'
  | 'light-shade' | 'deep-shade' | 'bright-indirect' | 'medium-indirect' | 'grow-light';

export type WaterNeed = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high' | 'aquatic';
export type DrainageLevel = 'poor' | 'moderate' | 'good' | 'excellent';
export type HumidityLevel = 'dry' | 'average' | 'humid' | 'very-humid';
export type PotSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'ground';

export type PropagationMethod =
  | 'seed' | 'stem-cutting' | 'leaf-cutting' | 'division' | 'bulb' | 'rhizome'
  | 'tuber' | 'offset' | 'runner' | 'air-layering' | 'grafting'
  | 'water-propagation' | 'keiki' | 'spore';

export type Pollinator = 'bees' | 'butterflies' | 'hummingbirds' | 'moths' | 'birds';

// ---------- perfil de solo ----------
export type SoilCategory =
  | 'all-purpose' | 'sandy' | 'rich-organic' | 'acidic' | 'alkaline'
  | 'orchid-bark' | 'cactus-mix' | 'seedling-mix' | 'tropical-mix'
  | 'bog-mix' | 'aquatic-soil' | 'bonsai-mix' | 'lean-mediterranean';

export interface SoilProfile {
  category: SoilCategory;
  drainage: DrainageLevel;
  organicMatter: 'low' | 'medium' | 'high';
}

// ---------- descritor visual (pintor procedural) ----------
export type PlantHabit =
  | 'upright-single'   // caule único vertical (girassol)
  | 'upright-clump'    // touceira vertical (lírio, íris)
  | 'bushy'            // arbusto denso (lavanda, rosa)
  | 'mound'            // almofada baixa (alyssum, tomilho)
  | 'rosette'          // roseta (echeveria, hosta)
  | 'fern-clump'       // frondes arqueadas (samambaias)
  | 'vine-climbing'    // trepadeira em suporte
  | 'vine-trailing'    // pendente
  | 'grass-clump'      // capim/junco
  | 'tree-small'       // arvoreta / bonsai
  | 'cactus-globe'     // cacto globular
  | 'cactus-column'    // cacto colunar / paddle
  | 'broadleaf-single' // folhas grandes (monstera, ficus)
  | 'orchid-spike'     // folhas basais + haste floral
  | 'aquatic-float'    // flutuante (ninféia)
  | 'aquatic-margin'   // margem (papiro, taboa)
  | 'trap-plant'       // carnívora
  | 'bulb-spring';     // bulbosa (tulipa, narciso)

export type LeafShape =
  | 'oval' | 'lance' | 'heart' | 'palmate' | 'pinnate' | 'frond' | 'needle'
  | 'linear' | 'round' | 'succulent-pad' | 'succulent-rosette' | 'strap'
  | 'lobed' | 'split' | 'tiny' | 'sword' | 'spines' | 'trap-jaw' | 'pitcher' | 'pad-floating';

export type FlowerShape =
  | 'daisy' | 'trumpet' | 'bell' | 'spike' | 'umbel' | 'cluster' | 'rose-double'
  | 'cup' | 'star' | 'orchid-moth' | 'pom' | 'tube' | 'plume' | 'disc-large'
  | 'lily' | 'iris' | 'pea' | 'button' | 'waterlily' | 'none';

export interface PlantVisual {
  habit: PlantHabit;
  leafShape: LeafShape;
  leafHue: number;          // matiz base da folhagem (graus HSL)
  leafSat: number;          // 0-100
  leafLight: number;        // 0-100
  leafVariegation?: 'stripe' | 'edge' | 'spots' | 'silver-vein' | 'pink' | 'red-under' | null;
  flowerShape: FlowerShape;
  flowerColors: string[];   // hex, cores reais da espécie
  flowerSize: number;       // 0.4-2.2, relativo
  sizeScale: number;        // 0.4-2.6 relativo ao tile
  stemColor?: string;
  special?: string;         // gancho para pintores dedicados ('sunflower','lavender','monstera',...)
}

// ---------- fases de crescimento ----------
export type GrowthStageId =
  | 'seed' | 'sprout' | 'seedling' | 'young-seedling' | 'juvenile'
  | 'mature' | 'budding' | 'flowering' | 'seeding' | 'dormant';

export interface GrowthStageData {
  id: GrowthStageId;
  days: number;             // dias para completar a fase (em cuidados ideais)
}

// ---------- problemas / pragas / doenças ----------
export type PestId =
  | 'aphids' | 'mealybugs' | 'spider-mites' | 'whitefly' | 'slugs'
  | 'caterpillars' | 'fungus-gnats' | 'thrips';

export type DiseaseId =
  | 'powdery-mildew' | 'downy-mildew' | 'root-rot' | 'leaf-spot' | 'rust' | 'soil-mold';

export type PlantProblem = PestId | DiseaseId | 'overwatering' | 'underwatering' | 'sunburn' | 'etiolation' | 'nutrient-deficiency';

// ---------- ficha da planta (banco de dados) ----------
export interface PlantData {
  id: string;
  commonNamePT: string;
  commonNameEN: string;
  scientificName: string;
  family: string;
  category: PlantCategory;
  rarity: Rarity;
  difficulty: Difficulty;
  lifeCycle: 'annual' | 'biennial' | 'perennial' | 'bulb' | 'shrub' | 'tree' | 'succulent' | 'aquatic' | 'orchid' | 'carnivorous';
  idealLight: LightType[];
  toleratedLight: LightType[];
  waterNeed: WaterNeed;
  droughtTolerance: number;      // 0-10
  overwaterTolerance: number;    // 0-10
  idealSoil: SoilProfile;
  pHRange: [number, number];
  drainageNeed: DrainageLevel;
  humidityNeed: HumidityLevel;
  temperatureRangeC: [number, number];
  minPotSize: PotSize;
  rootDepth: 'shallow' | 'medium' | 'deep';
  heightCm: [number, number];
  spreadCm: [number, number];
  bloomSeasons: Season[];
  flowerColors: string[];        // nomes de cor p/ filtros e arranjos
  fragrance: boolean;
  attractsPollinators: Pollinator[];
  toxicToPets: boolean;
  propagationMethods: PropagationMethod[];
  growDays: number;              // dias de broto a adulto em cuidado ideal
  commonProblems: PlantProblem[];
  marketValue: number;           // valor adulto saudável
  beautyValue: number;           // contribuição estética base
  unlockRule: string;            // 'start' | 'shop:florista' | 'area:estufa' | 'npc:helena:2' | 'competition:...'
  careTips: { pt: string; en: string };
  origin: { pt: string; en: string };
  visual: PlantVisual;
  dormantInWinter?: boolean;
  evergreen?: boolean;
}

// ---------- vasos ----------
export type PotShape = 'round' | 'square' | 'bowl' | 'tall' | 'hanging' | 'window-box' | 'trough' | 'basket' | 'tray' | 'glass' | 'barrel' | 'wall' | 'aquatic-tub' | 'bonsai-tray';

export interface PotData {
  id: string;
  namePT: string;
  nameEN: string;
  shape: PotShape;
  size: PotSize;
  material: 'plastic' | 'terracotta' | 'ceramic' | 'concrete' | 'stone' | 'wood' | 'metal' | 'coco-fiber' | 'biodegradable' | 'fabric' | 'glass' | 'macrame';
  soilVolume: number;         // litros
  drainage: DrainageLevel;
  waterRetention: number;     // 0-10 (quanto segura umidade)
  heatGain: number;           // 0-10 (esquenta no sol)
  aesthetic: number;          // 0-10
  price: number;
  isHanging?: boolean;
  isAquatic?: boolean;
  selfWatering?: boolean;
  ventilated?: boolean;       // vaso de orquídea
  forCategory?: PlantCategory[]; // restrição/preferência
  unlockRule: string;
  color: string;              // cor base p/ render
  accentColor?: string;
}

// ---------- componentes de solo ----------
export interface SoilComponentData {
  id: string;
  namePT: string;
  nameEN: string;
  drainage: number;       // -3..+3 efeito
  retention: number;      // -3..+3
  organic: number;        // 0..3
  aeration: number;       // -2..+3
  pHShift: number;        // -1.5..+1.5
  fertility: number;      // 0..3
  price: number;
  unlockRule: string;
}

export interface SoilMix {
  id: string;
  namePT: string;
  nameEN: string;
  components: { id: string; parts: number }[];
  // atributos calculados/caches
  drainage: DrainageLevel;
  retention: number;      // 0-10
  organicMatter: 'low' | 'medium' | 'high';
  aeration: number;       // 0-10
  pH: number;
  fertility: number;      // 0-10
  goodFor: PlantCategory[];
  price?: number;         // misturas prontas
  unlockRule?: string;
}

// ---------- ferramentas ----------
export interface ToolData {
  id: string;
  namePT: string;
  nameEN: string;
  descPT: string;
  descEN: string;
  price: number;
  unlockRule: string;
  kind: 'watering' | 'measure' | 'cutting' | 'digging' | 'treatment' | 'infrastructure' | 'utility';
}

// ---------- decoração ----------
export type DecorCategory = 'path' | 'furniture' | 'water' | 'light' | 'structure' | 'cozy';

export interface DecorData {
  id: string;
  namePT: string;
  nameEN: string;
  category: DecorCategory;
  price: number;
  beauty: number;
  footprint: [number, number]; // tiles w,h
  bonus?: { type: 'birds' | 'butterflies' | 'beauty' | 'visitors' | 'humidity' | 'order' | 'theme'; value: number; theme?: string };
  unlockRule: string;
  visual: string;   // id do pintor de decoração
}

// ---------- áreas ----------
export interface AreaData {
  id: string;
  namePT: string;
  nameEN: string;
  tier: 'initial' | 'intermediate' | 'advanced';
  descPT: string;
  descEN: string;
  cols: number;
  rows: number;
  baseLight: LightType;       // luz dominante
  lightMap?: string[];        // por linha, caracteres: F=full sun, M=morning, A=afternoon, P=part shade, S=shade, D=deep shade, I=indirect, G=grow light, W=water
  humidity: HumidityLevel;
  tempOffsetC: number;        // vs. clima externo
  indoor: boolean;
  water?: boolean;            // tem lago
  unlockPrice: number;
  unlockRule: string;         // além do preço (missão/npc)
  maxDecor: number;
  themeBonus?: string;
  ambientPalette: { sky: string; ground: string; accent: string };
}

// ---------- NPCs ----------
export interface NpcData {
  id: string;
  namePT: string;
  nameEN: string;
  rolePT: string;
  roleEN: string;
  personality: { pt: string; en: string };
  portrait: { skin: string; hair: string; hairStyle: 'short' | 'long' | 'bun' | 'hat' | 'bald' | 'ponytail' | 'curly' | 'braid'; shirt: string; accent: string; age: 'child' | 'young' | 'adult' | 'elder' };
  favoriteCategories: PlantCategory[];
  favoritePlants: string[];       // ids
  greetings: { pt: string; en: string }[];
  friendshipRewards: { level: number; rewardPT: string; rewardEN: string; unlock?: string }[];
  shopId?: string;
  requestPool: NpcRequestTemplate[];
}

export interface NpcRequestTemplate {
  id: string;
  kind: 'plant' | 'flowers-color' | 'arrangement' | 'herb-bundle' | 'restore';
  textPT: string;
  textEN: string;
  target: { plantId?: string; category?: PlantCategory; color?: string; count?: number; arrangementStyle?: string; minQuality?: number };
  rewardMoney: number;
  rewardRep: number;
  rewardFriendship: number;
  minFriendship?: number;
  seasons?: Season[];
}

// ---------- missões ----------
export interface QuestData {
  id: string;
  kind: 'main' | 'side' | 'restoration';
  titlePT: string;
  titleEN: string;
  descPT: string;
  descEN: string;
  npcId?: string;
  requires?: string;          // quest id anterior
  goal: QuestGoal;
  rewardMoney: number;
  rewardRep: number;
  rewardItems?: { kind: 'seed' | 'pot' | 'tool' | 'decor' | 'soil'; id: string; qty: number }[];
  unlockArea?: string;
}

export type QuestGoal =
  | { type: 'clear-debris'; count: number }
  | { type: 'plant-count'; count: number; category?: PlantCategory }
  | { type: 'water-count'; count: number }
  | { type: 'grow-stage'; stage: GrowthStageId; count: number; plantId?: string; category?: PlantCategory }
  | { type: 'heal-plant'; count: number }
  | { type: 'sell'; count: number; what?: 'seedling' | 'flower' | 'plant' }
  | { type: 'earn-money'; amount: number }
  | { type: 'mix-soil'; recipeFor: PlantCategory }
  | { type: 'propagate'; count: number; method?: PropagationMethod }
  | { type: 'harmony'; score: number }
  | { type: 'enter-competition'; count: number }
  | { type: 'win-competition'; count: number }
  | { type: 'unlock-area'; areaId: string }
  | { type: 'collection'; count: number }
  | { type: 'deliver-color'; color: string; count: number }
  | { type: 'perfect-plant'; plantId?: string; category?: PlantCategory; count: number }
  | { type: 'arrangement'; style?: string; count: number }
  | { type: 'friendship'; npcId: string; level: number }
  | { type: 'restoration'; siteId: string };

// ---------- competições ----------
export interface CompetitionData {
  id: string;
  namePT: string;
  nameEN: string;
  cadence: 'monthly' | 'seasonal' | 'annual';
  season?: Season;
  monthDay: number;           // dia do mês em que acontece
  scope: 'pot' | 'area' | 'plant' | 'arrangement' | 'garden';
  criteria: { criterion: 'health' | 'beauty' | 'rarity' | 'variety' | 'color-harmony' | 'theme' | 'pollinators' | 'flowering' | 'care'; weight: number }[];
  themeFilter?: { category?: PlantCategory; area?: string; color?: string; flowering?: boolean };
  prizeMoney: [number, number, number];
  prizeRep: number;
  specialPrize?: { descPT: string; descEN: string; unlock?: string };
  minReputation: number;
}

// ---------- estado dinâmico (runtime + save) ----------
export interface PlantInstance {
  uid: number;
  plantId: string;
  areaId: string;
  tileX: number;
  tileY: number;
  potId: string | null;        // null = chão/canteiro
  soilMixId: string;
  stage: GrowthStageId;
  stageProgress: number;       // 0-1
  ageDays: number;
  health: number;              // 0-100
  moisture: number;            // 0-100 umidade do solo
  nutrients: { n: number; p: number; k: number };  // 0-100
  pests: { id: PestId; severity: number }[];
  disease: { id: DiseaseId; severity: number } | null;
  stress: PlantProblem[];      // problemas ativos visuais
  quality: number;             // 0-100 qualidade acumulada (perfeição)
  bloomProgress: number;       // 0-1 dentro da floração
  deadDays: number;
  variantSeed: number;         // variação visual individual
  lastWateredDay: number;
  fertilizedDay: number;
  prunedRecently: number;      // dias desde poda
  isDormant: boolean;
  seedsReady: boolean;
  keikiReady?: boolean;
  wasSick?: boolean;
}

export interface DecorInstance {
  uid: number;
  decorId: string;
  areaId: string;
  tileX: number;
  tileY: number;
}

export interface DayWeather {
  tempMinC: number;
  tempMaxC: number;
  humidity: number;         // 0-100
  rainChance: number;       // 0-1
  raining: boolean;
  rainAmount: number;       // 0-10
  sunIntensity: number;     // 0-10 (nuvens reduzem)
  wind: number;             // 0-10
  pestRisk: number;         // 0-1
  fungusRisk: number;       // 0-1
  cloudy: boolean;
}

export interface GameCalendar {
  minute: number;      // 0-1439
  day: number;         // 1-28 (mês de 28 dias)
  month: number;       // 0-11
  year: number;
  weekday: number;     // 0-6
  season: Season;
  speed: 0 | 1 | 4 | 12;
}

export interface InventoryState {
  seeds: Record<string, number>;
  cuttings: Record<string, number>;    // mudas propagadas prontas p/ plantar
  seedlings: Record<string, number>;   // mudas compradas
  flowers: Record<string, number>;     // flores cortadas por plantId
  pots: Record<string, number>;
  soilComponents: Record<string, number>;
  soilMixes: Record<string, number>;
  tools: Record<string, boolean>;
  decor: Record<string, number>;
  fertilizers: Record<string, number>;
  treatments: Record<string, number>;
  arrangements: ArrangementInstance[];
}

export interface ArrangementInstance {
  uid: number;
  style: string;
  flowers: { plantId: string; color: string }[];
  quality: number;
  value: number;
  freshDays: number;
  createdDay: number;
}

export interface NpcState {
  friendship: number;       // 0-100
  level: number;            // 0-5
  activeRequest: { templateId: string; deadlineDay: number; progress: number } | null;
  completedRequests: number;
  met: boolean;
}

export interface QuestState {
  status: 'locked' | 'active' | 'done';
  progress: number;
}

export interface CompetitionResult {
  competitionId: string;
  absoluteDay: number;
  placement: number;        // 1-3, 0 = participou
  score: number;
  entryDesc: string;
}

export interface PlantapediaEntry {
  discovered: boolean;
  timesGrown: number;
  timesBloomed: number;
  bestQuality: number;
  killed: number;
}

export interface TutorialState {
  step: number;
  dismissed: boolean;
  seen: Record<string, boolean>;
}

export interface GameSettings {
  lang: 'pt' | 'en';
  volMaster: number;
  volMusic: number;
  volSfx: number;
  volAmbient: number;
  showGrid: boolean;
  reducedMotion: boolean;
}

export interface GameStats {
  totalPlanted: number;
  totalDied: number;
  totalSold: number;
  totalEarned: number;
  totalWatered: number;
  totalPropagated: number;
  competitionsWon: number;
  arrangementsMade: number;
  daysPlayed: number;
  visitorsReceived: number;
  daysWithoutDeadPlants: number;
}

export interface GameState {
  version: number;
  calendar: GameCalendar;
  weather: DayWeather;
  forecast: DayWeather[];
  money: number;
  reputation: number;
  beautyPoints: number;
  medals: number;
  fairTickets: number;
  plants: PlantInstance[];
  decors: DecorInstance[];
  unlockedAreas: string[];
  currentArea: string;
  debrisCleared: Record<string, number[]>;   // área -> índices de entulho removidos
  inventory: InventoryState;
  npcs: Record<string, NpcState>;
  quests: Record<string, QuestState>;
  competitionHistory: CompetitionResult[];
  nextCompetitionEntries: Record<string, { areaId?: string; plantUid?: number; arrangementUid?: number }>;
  plantapedia: Record<string, PlantapediaEntry>;
  achievements: Record<string, number>;      // id -> absoluteDay ganho
  savedSoilRecipes: { name: string; components: { id: string; parts: number }[] }[];
  tutorial: TutorialState;
  settings: GameSettings;
  stats: GameStats;
  uidCounter: number;
  marketDrift: Record<string, number>;       // flutuação de preço por categoria
  visitorsToday: number;
  irrigationAreas: string[];                  // áreas com gotejamento instalado
  rainBarrel: boolean;
  rainWater: number;
  lastAutosaveDay: number;
}

// ---------- helpers ----------
export const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];
export const SEASON_OF_MONTH: Season[] = [
  'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter',
  'winter', 'winter', 'spring', 'spring', 'spring', 'summer',
]; // hemisfério sul: jan=verão ... set-nov=primavera, dez=verão

export const POT_SIZE_ORDER: PotSize[] = ['tiny', 'small', 'medium', 'large', 'huge', 'ground'];

export function potSizeIndex(s: PotSize): number { return POT_SIZE_ORDER.indexOf(s); }
