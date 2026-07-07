import type { CompetitionData } from '../types';

// ============ COMPETIÇÕES ============
export const COMPETITIONS: CompetitionData[] = [
  // ---- mensais (rotação por dia do mês) ----
  { id: 'melhor-vaso-mesa', namePT: 'Melhor Vaso de Mesa', nameEN: 'Best Table Pot', cadence: 'monthly', monthDay: 7, scope: 'plant', criteria: [{ criterion: 'health', weight: 3 }, { criterion: 'beauty', weight: 3 }, { criterion: 'care', weight: 2 }], prizeMoney: [80, 40, 20], prizeRep: 5, minReputation: 0 },
  { id: 'melhor-varanda', namePT: 'Melhor Varanda', nameEN: 'Best Balcony', cadence: 'monthly', monthDay: 14, scope: 'area', themeFilter: { area: 'varanda' }, criteria: [{ criterion: 'beauty', weight: 3 }, { criterion: 'variety', weight: 2 }, { criterion: 'color-harmony', weight: 2 }], prizeMoney: [120, 60, 30], prizeRep: 7, minReputation: 5 },
  { id: 'melhor-canteiro', namePT: 'Melhor Canteiro', nameEN: 'Best Flower Bed', cadence: 'monthly', monthDay: 21, scope: 'area', criteria: [{ criterion: 'flowering', weight: 3 }, { criterion: 'health', weight: 2 }, { criterion: 'variety', weight: 2 }], prizeMoney: [130, 65, 30], prizeRep: 7, minReputation: 8 },
  { id: 'melhor-florida', namePT: 'Melhor Planta Florida', nameEN: 'Best Blooming Plant', cadence: 'monthly', monthDay: 28, scope: 'plant', themeFilter: { flowering: true }, criteria: [{ criterion: 'flowering', weight: 4 }, { criterion: 'health', weight: 2 }, { criterion: 'rarity', weight: 1 }], prizeMoney: [100, 50, 25], prizeRep: 6, minReputation: 0 },
  { id: 'composicao-cores', namePT: 'Melhor Composição de Cores', nameEN: 'Best Color Composition', cadence: 'monthly', monthDay: 10, scope: 'area', criteria: [{ criterion: 'color-harmony', weight: 4 }, { criterion: 'beauty', weight: 2 }], prizeMoney: [110, 55, 25], prizeRep: 6, minReputation: 10 },
  { id: 'jardim-sombra-comp', namePT: 'Melhor Jardim de Sombra', nameEN: 'Best Shade Garden', cadence: 'monthly', monthDay: 17, scope: 'area', themeFilter: { area: 'canto-sombra' }, criteria: [{ criterion: 'health', weight: 3 }, { criterion: 'theme', weight: 3 }], prizeMoney: [110, 55, 25], prizeRep: 6, minReputation: 12 },
  { id: 'planta-rara', namePT: 'Melhor Planta Rara', nameEN: 'Best Rare Plant', cadence: 'monthly', monthDay: 24, scope: 'plant', criteria: [{ criterion: 'rarity', weight: 4 }, { criterion: 'health', weight: 2 }, { criterion: 'care', weight: 1 }], prizeMoney: [160, 80, 40], prizeRep: 9, minReputation: 20 },
  { id: 'arranjo-floral-comp', namePT: 'Melhor Arranjo Floral', nameEN: 'Best Floral Arrangement', cadence: 'monthly', monthDay: 4, scope: 'arrangement', criteria: [{ criterion: 'color-harmony', weight: 3 }, { criterion: 'beauty', weight: 3 }, { criterion: 'rarity', weight: 1 }], prizeMoney: [90, 45, 20], prizeRep: 5, minReputation: 5 },
  // ---- sazonais ----
  { id: 'festival-flores', namePT: 'Festival das Flores', nameEN: 'Flower Festival', cadence: 'seasonal', season: 'spring', monthDay: 15, scope: 'garden', criteria: [{ criterion: 'flowering', weight: 4 }, { criterion: 'variety', weight: 2 }, { criterion: 'beauty', weight: 2 }], prizeMoney: [300, 150, 75], prizeRep: 15, specialPrize: { descPT: 'Vaso exclusivo "Primavera Eterna"', descEN: 'Exclusive "Eternal Spring" pot', unlock: 'pot-primavera' }, minReputation: 10 },
  { id: 'concurso-borboletas', namePT: 'Concurso do Jardim de Borboletas', nameEN: 'Butterfly Garden Contest', cadence: 'seasonal', season: 'spring', monthDay: 24, scope: 'area', themeFilter: { area: 'jardim-borboletas' }, criteria: [{ criterion: 'pollinators', weight: 4 }, { criterion: 'flowering', weight: 2 }], prizeMoney: [250, 125, 60], prizeRep: 12, minReputation: 15 },
  { id: 'melhor-floracao', namePT: 'Melhor Floração da Primavera', nameEN: 'Best Spring Bloom', cadence: 'seasonal', season: 'spring', monthDay: 8, scope: 'plant', themeFilter: { flowering: true }, criteria: [{ criterion: 'flowering', weight: 5 }, { criterion: 'health', weight: 2 }], prizeMoney: [200, 100, 50], prizeRep: 10, minReputation: 5 },
  { id: 'jardim-tropical-comp', namePT: 'Jardim Tropical de Verão', nameEN: 'Summer Tropical Garden', cadence: 'seasonal', season: 'summer', monthDay: 15, scope: 'area', themeFilter: { area: 'estufa' }, criteria: [{ criterion: 'theme', weight: 3 }, { criterion: 'health', weight: 3 }, { criterion: 'rarity', weight: 2 }], prizeMoney: [300, 150, 75], prizeRep: 15, minReputation: 20 },
  { id: 'sol-pleno-comp', namePT: 'Jardim de Sol Pleno', nameEN: 'Full Sun Garden', cadence: 'seasonal', season: 'summer', monthDay: 8, scope: 'area', criteria: [{ criterion: 'health', weight: 4 }, { criterion: 'flowering', weight: 2 }], prizeMoney: [220, 110, 55], prizeRep: 11, minReputation: 10 },
  { id: 'melhor-suculenta', namePT: 'Melhor Suculenta', nameEN: 'Best Succulent', cadence: 'seasonal', season: 'summer', monthDay: 22, scope: 'plant', themeFilter: { category: 'succulent' }, criteria: [{ criterion: 'health', weight: 3 }, { criterion: 'beauty', weight: 3 }, { criterion: 'rarity', weight: 1 }], prizeMoney: [200, 100, 50], prizeRep: 10, minReputation: 10 },
  { id: 'folhagens-comp', namePT: 'Jardim de Folhagens', nameEN: 'Foliage Garden', cadence: 'seasonal', season: 'autumn', monthDay: 12, scope: 'area', criteria: [{ criterion: 'beauty', weight: 3 }, { criterion: 'variety', weight: 3 }], prizeMoney: [240, 120, 60], prizeRep: 12, minReputation: 12 },
  { id: 'composicao-quente', namePT: 'Melhor Composição Quente', nameEN: 'Best Warm Palette', cadence: 'seasonal', season: 'autumn', monthDay: 20, scope: 'area', criteria: [{ criterion: 'color-harmony', weight: 4 }, { criterion: 'beauty', weight: 2 }], prizeMoney: [220, 110, 55], prizeRep: 11, minReputation: 10 },
  { id: 'coleta-sementes', namePT: 'Coleta de Sementes', nameEN: 'Seed Harvest', cadence: 'seasonal', season: 'autumn', monthDay: 26, scope: 'plant', criteria: [{ criterion: 'care', weight: 4 }, { criterion: 'health', weight: 2 }], prizeMoney: [180, 90, 45], prizeRep: 9, minReputation: 8 },
  { id: 'jardim-interno-comp', namePT: 'Jardim Interno de Inverno', nameEN: 'Winter Indoor Garden', cadence: 'seasonal', season: 'winter', monthDay: 12, scope: 'area', themeFilter: { area: 'sala-plantas' }, criteria: [{ criterion: 'health', weight: 3 }, { criterion: 'beauty', weight: 3 }], prizeMoney: [240, 120, 60], prizeRep: 12, minReputation: 15 },
  { id: 'estufa-bonita', namePT: 'Estufa Mais Bonita', nameEN: 'Prettiest Greenhouse', cadence: 'seasonal', season: 'winter', monthDay: 20, scope: 'area', themeFilter: { area: 'estufa' }, criteria: [{ criterion: 'beauty', weight: 3 }, { criterion: 'variety', weight: 2 }, { criterion: 'rarity', weight: 2 }], prizeMoney: [260, 130, 65], prizeRep: 13, minReputation: 20 },
  { id: 'bonsai-inverno', namePT: 'Bonsai de Inverno', nameEN: 'Winter Bonsai', cadence: 'seasonal', season: 'winter', monthDay: 26, scope: 'plant', themeFilter: { category: 'bonsai-tree' }, criteria: [{ criterion: 'care', weight: 4 }, { criterion: 'beauty', weight: 3 }], prizeMoney: [280, 140, 70], prizeRep: 14, minReputation: 25 },
  // ---- anual ----
  { id: 'festival-quatro-estacoes', namePT: 'Festival das Quatro Estações', nameEN: 'Festival of Four Seasons', cadence: 'annual', season: 'spring', monthDay: 1, scope: 'garden', criteria: [{ criterion: 'beauty', weight: 3 }, { criterion: 'variety', weight: 2 }, { criterion: 'health', weight: 2 }, { criterion: 'rarity', weight: 1 }, { criterion: 'theme', weight: 1 }, { criterion: 'pollinators', weight: 1 }, { criterion: 'care', weight: 1 }], prizeMoney: [800, 400, 200], prizeRep: 40, specialPrize: { descPT: 'Troféu de Ouro + desbloqueio do Jardim de Prestígio', descEN: 'Gold Trophy + Prestige Garden unlock', unlock: 'area-jardim-prestigio' }, minReputation: 40 },
];

export const COMPETITION_BY_ID: Record<string, CompetitionData> = {};
for (const c of COMPETITIONS) COMPETITION_BY_ID[c.id] = c;

// ============ ESTILOS DE ARRANJO ============
export interface ArrangementStyle {
  id: string; namePT: string; nameEN: string;
  minFlowers: number; needColors?: string[]; monochrome?: boolean;
  needFragrance?: boolean; valueMult: number;
}

export const ARRANGEMENT_STYLES: ArrangementStyle[] = [
  { id: 'simples', namePT: 'Buquê simples', nameEN: 'Simple Bouquet', minFlowers: 3, valueMult: 1 },
  { id: 'romantico', namePT: 'Buquê romântico', nameEN: 'Romantic Bouquet', minFlowers: 5, needColors: ['rosa', 'vermelho', 'branco'], needFragrance: true, valueMult: 1.6 },
  { id: 'mesa', namePT: 'Arranjo de mesa', nameEN: 'Table Arrangement', minFlowers: 4, valueMult: 1.3 },
  { id: 'tropical', namePT: 'Arranjo tropical', nameEN: 'Tropical Arrangement', minFlowers: 4, needColors: ['laranja', 'vermelho', 'amarelo'], valueMult: 1.7 },
  { id: 'outono', namePT: 'Arranjo de outono', nameEN: 'Autumn Arrangement', minFlowers: 4, needColors: ['laranja', 'amarelo'], valueMult: 1.4 },
  { id: 'silvestre', namePT: 'Arranjo silvestre', nameEN: 'Wildflower Arrangement', minFlowers: 5, valueMult: 1.3 },
  { id: 'monocromatico', namePT: 'Arranjo monocromático', nameEN: 'Monochrome Arrangement', minFlowers: 4, monochrome: true, valueMult: 1.8 },
  { id: 'casamento', namePT: 'Arranjo de casamento', nameEN: 'Wedding Arrangement', minFlowers: 7, needColors: ['branco'], needFragrance: true, valueMult: 2.4 },
  { id: 'coroa', namePT: 'Coroa floral', nameEN: 'Floral Wreath', minFlowers: 6, valueMult: 1.5 },
  { id: 'vaso-decorativo', namePT: 'Vaso decorativo', nameEN: 'Decorative Vase', minFlowers: 3, valueMult: 1.2 },
];

export const ARRANGEMENT_STYLE_BY_ID: Record<string, ArrangementStyle> = {};
for (const s of ARRANGEMENT_STYLES) ARRANGEMENT_STYLE_BY_ID[s.id] = s;
