import type { PlantCategory, PlantData, PlantVisual } from '../../types';

// Campos mínimos que TODA planta define explicitamente; o resto herda do
// template da categoria (e pode ser sobrescrito).
type Req = Pick<PlantData,
  'id' | 'commonNamePT' | 'commonNameEN' | 'scientificName' | 'family' |
  'category' | 'difficulty' | 'flowerColors' | 'bloomSeasons' | 'heightCm' |
  'marketValue' | 'careTips' | 'origin'
> & { visual: PlantVisual };

type Opt = Partial<Omit<PlantData, keyof Req>>;

const CAT_DEFAULTS: Record<PlantCategory, Omit<PlantData,
  'id' | 'commonNamePT' | 'commonNameEN' | 'scientificName' | 'family' | 'category' |
  'difficulty' | 'flowerColors' | 'bloomSeasons' | 'heightCm' | 'marketValue' |
  'careTips' | 'origin' | 'visual'
>> = {
  annual: {
    rarity: 'common', lifeCycle: 'annual',
    idealLight: ['full-sun'], toleratedLight: ['morning-sun', 'afternoon-sun'],
    waterNeed: 'moderate', droughtTolerance: 4, overwaterTolerance: 3,
    idealSoil: { category: 'all-purpose', drainage: 'good', organicMatter: 'medium' },
    pHRange: [6.0, 7.0], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [10, 32], minPotSize: 'small', rootDepth: 'shallow',
    spreadCm: [20, 40], fragrance: false, attractsPollinators: ['bees'],
    toxicToPets: false, propagationMethods: ['seed'], growDays: 18,
    commonProblems: ['aphids', 'underwatering'], beautyValue: 6,
    unlockRule: 'start',
  },
  perennial: {
    rarity: 'common', lifeCycle: 'perennial',
    idealLight: ['full-sun'], toleratedLight: ['part-shade'],
    waterNeed: 'moderate', droughtTolerance: 5, overwaterTolerance: 3,
    idealSoil: { category: 'all-purpose', drainage: 'good', organicMatter: 'medium' },
    pHRange: [6.0, 7.2], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [2, 32], minPotSize: 'medium', rootDepth: 'medium',
    spreadCm: [30, 60], fragrance: false, attractsPollinators: ['bees', 'butterflies'],
    toxicToPets: false, propagationMethods: ['seed', 'division'], growDays: 30,
    commonProblems: ['powdery-mildew', 'aphids'], beautyValue: 7,
    unlockRule: 'shop:floricultura', dormantInWinter: true,
  },
  bulb: {
    rarity: 'common', lifeCycle: 'bulb',
    idealLight: ['full-sun'], toleratedLight: ['morning-sun', 'part-shade'],
    waterNeed: 'moderate', droughtTolerance: 4, overwaterTolerance: 2,
    idealSoil: { category: 'all-purpose', drainage: 'good', organicMatter: 'medium' },
    pHRange: [6.0, 7.0], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [2, 28], minPotSize: 'small', rootDepth: 'medium',
    spreadCm: [10, 25], fragrance: false, attractsPollinators: ['bees'],
    toxicToPets: true, propagationMethods: ['bulb'], growDays: 24,
    commonProblems: ['root-rot', 'slugs'], beautyValue: 8,
    unlockRule: 'shop:floricultura', dormantInWinter: true,
  },
  'rose-shrub': {
    rarity: 'uncommon', lifeCycle: 'shrub',
    idealLight: ['full-sun'], toleratedLight: ['morning-sun', 'part-shade'],
    waterNeed: 'moderate', droughtTolerance: 5, overwaterTolerance: 3,
    idealSoil: { category: 'rich-organic', drainage: 'good', organicMatter: 'high' },
    pHRange: [6.0, 7.0], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [0, 32], minPotSize: 'large', rootDepth: 'deep',
    spreadCm: [60, 120], fragrance: false, attractsPollinators: ['bees'],
    toxicToPets: false, propagationMethods: ['stem-cutting'], growDays: 60,
    commonProblems: ['powdery-mildew', 'aphids', 'leaf-spot'], beautyValue: 10,
    unlockRule: 'shop:floricultura', evergreen: false,
  },
  tropical: {
    rarity: 'common', lifeCycle: 'perennial',
    idealLight: ['bright-indirect'], toleratedLight: ['medium-indirect', 'part-shade'],
    waterNeed: 'moderate', droughtTolerance: 4, overwaterTolerance: 3,
    idealSoil: { category: 'tropical-mix', drainage: 'good', organicMatter: 'high' },
    pHRange: [5.8, 6.8], drainageNeed: 'good', humidityNeed: 'humid',
    temperatureRangeC: [15, 30], minPotSize: 'medium', rootDepth: 'medium',
    spreadCm: [30, 80], fragrance: false, attractsPollinators: [],
    toxicToPets: true, propagationMethods: ['stem-cutting'], growDays: 45,
    commonProblems: ['overwatering', 'spider-mites', 'mealybugs'], beautyValue: 8,
    unlockRule: 'shop:viveiro-tropical', evergreen: true,
  },
  orchid: {
    rarity: 'rare', lifeCycle: 'orchid',
    idealLight: ['bright-indirect'], toleratedLight: ['medium-indirect', 'grow-light'],
    waterNeed: 'moderate', droughtTolerance: 5, overwaterTolerance: 1,
    idealSoil: { category: 'orchid-bark', drainage: 'excellent', organicMatter: 'low' },
    pHRange: [5.5, 6.5], drainageNeed: 'excellent', humidityNeed: 'humid',
    temperatureRangeC: [16, 30], minPotSize: 'small', rootDepth: 'shallow',
    spreadCm: [20, 50], fragrance: false, attractsPollinators: [],
    toxicToPets: false, propagationMethods: ['division', 'keiki'], growDays: 90,
    commonProblems: ['root-rot', 'mealybugs'], beautyValue: 14,
    unlockRule: 'area:orquidario', evergreen: true,
  },
  succulent: {
    rarity: 'common', lifeCycle: 'succulent',
    idealLight: ['full-sun'], toleratedLight: ['bright-indirect', 'morning-sun'],
    waterNeed: 'low', droughtTolerance: 9, overwaterTolerance: 0,
    idealSoil: { category: 'cactus-mix', drainage: 'excellent', organicMatter: 'low' },
    pHRange: [6.0, 7.5], drainageNeed: 'excellent', humidityNeed: 'dry',
    temperatureRangeC: [8, 38], minPotSize: 'tiny', rootDepth: 'shallow',
    spreadCm: [8, 25], fragrance: false, attractsPollinators: [],
    toxicToPets: false, propagationMethods: ['offset', 'leaf-cutting'], growDays: 50,
    commonProblems: ['overwatering', 'root-rot', 'mealybugs'], beautyValue: 6,
    unlockRule: 'area:jardim-suculentas', evergreen: true,
  },
  herb: {
    rarity: 'common', lifeCycle: 'perennial',
    idealLight: ['full-sun'], toleratedLight: ['morning-sun', 'part-shade'],
    waterNeed: 'moderate', droughtTolerance: 5, overwaterTolerance: 2,
    idealSoil: { category: 'lean-mediterranean', drainage: 'good', organicMatter: 'low' },
    pHRange: [6.0, 7.5], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [8, 32], minPotSize: 'small', rootDepth: 'shallow',
    spreadCm: [20, 40], fragrance: true, attractsPollinators: ['bees'],
    toxicToPets: false, propagationMethods: ['seed', 'stem-cutting'], growDays: 20,
    commonProblems: ['underwatering', 'aphids'], beautyValue: 5,
    unlockRule: 'area:jardim-ervas',
  },
  climber: {
    rarity: 'uncommon', lifeCycle: 'perennial',
    idealLight: ['full-sun'], toleratedLight: ['part-shade'],
    waterNeed: 'moderate', droughtTolerance: 5, overwaterTolerance: 3,
    idealSoil: { category: 'all-purpose', drainage: 'good', organicMatter: 'medium' },
    pHRange: [6.0, 7.2], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [8, 34], minPotSize: 'large', rootDepth: 'deep',
    spreadCm: [100, 300], fragrance: false, attractsPollinators: ['bees'],
    toxicToPets: false, propagationMethods: ['stem-cutting', 'air-layering'], growDays: 55,
    commonProblems: ['aphids', 'powdery-mildew'], beautyValue: 9,
    unlockRule: 'area:pergola', evergreen: false,
  },
  aquatic: {
    rarity: 'rare', lifeCycle: 'aquatic',
    idealLight: ['full-sun'], toleratedLight: ['morning-sun'],
    waterNeed: 'aquatic', droughtTolerance: 0, overwaterTolerance: 10,
    idealSoil: { category: 'aquatic-soil', drainage: 'poor', organicMatter: 'high' },
    pHRange: [6.0, 7.5], drainageNeed: 'poor', humidityNeed: 'very-humid',
    temperatureRangeC: [15, 32], minPotSize: 'large', rootDepth: 'medium',
    spreadCm: [30, 120], fragrance: false, attractsPollinators: ['bees'],
    toxicToPets: false, propagationMethods: ['division', 'rhizome'], growDays: 40,
    commonProblems: ['leaf-spot'], beautyValue: 12,
    unlockRule: 'area:jardim-aquatico', dormantInWinter: true,
  },
  'bonsai-tree': {
    rarity: 'rare', lifeCycle: 'tree',
    idealLight: ['full-sun'], toleratedLight: ['morning-sun', 'part-shade'],
    waterNeed: 'moderate', droughtTolerance: 4, overwaterTolerance: 2,
    idealSoil: { category: 'bonsai-mix', drainage: 'excellent', organicMatter: 'low' },
    pHRange: [6.0, 7.0], drainageNeed: 'excellent', humidityNeed: 'average',
    temperatureRangeC: [5, 32], minPotSize: 'small', rootDepth: 'shallow',
    spreadCm: [20, 60], fragrance: false, attractsPollinators: [],
    toxicToPets: false, propagationMethods: ['seed', 'stem-cutting', 'air-layering'], growDays: 120,
    commonProblems: ['underwatering', 'spider-mites'], beautyValue: 16,
    unlockRule: 'npc:kenji:1', evergreen: false,
  },
  carnivorous: {
    rarity: 'very-rare', lifeCycle: 'carnivorous',
    idealLight: ['full-sun'], toleratedLight: ['bright-indirect', 'grow-light'],
    waterNeed: 'very-high', droughtTolerance: 1, overwaterTolerance: 8,
    idealSoil: { category: 'bog-mix', drainage: 'moderate', organicMatter: 'low' },
    pHRange: [4.5, 5.5], drainageNeed: 'moderate', humidityNeed: 'very-humid',
    temperatureRangeC: [10, 32], minPotSize: 'small', rootDepth: 'shallow',
    spreadCm: [10, 30], fragrance: false, attractsPollinators: [],
    toxicToPets: false, propagationMethods: ['division', 'seed'], growDays: 70,
    commonProblems: ['underwatering', 'root-rot'], beautyValue: 13,
    unlockRule: 'shop:clube-colecionadores',
  },
  wildflower: {
    rarity: 'common', lifeCycle: 'perennial',
    idealLight: ['full-sun'], toleratedLight: ['part-shade'],
    waterNeed: 'low', droughtTolerance: 7, overwaterTolerance: 2,
    idealSoil: { category: 'all-purpose', drainage: 'good', organicMatter: 'low' },
    pHRange: [6.0, 7.5], drainageNeed: 'good', humidityNeed: 'average',
    temperatureRangeC: [2, 34], minPotSize: 'small', rootDepth: 'medium',
    spreadCm: [25, 50], fragrance: false, attractsPollinators: ['bees', 'butterflies'],
    toxicToPets: false, propagationMethods: ['seed', 'division'], growDays: 26,
    commonProblems: ['powdery-mildew'], beautyValue: 6,
    unlockRule: 'area:jardim-borboletas', dormantInWinter: true,
  },
};

export function P(req: Req & Opt): PlantData {
  const def = CAT_DEFAULTS[req.category];
  return { ...def, ...req } as PlantData;
}

// atalho p/ visual
export function V(v: PlantVisual): PlantVisual { return v; }
