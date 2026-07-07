import type { Season } from '../types';

// ============ LOJAS (7) ============
export interface ShopData {
  id: string; namePT: string; nameEN: string; npcId?: string;
  descPT: string; descEN: string;
  icon: string; // pintor
  sells: ShopSection[];
  openDays?: number[];       // dias da semana (0-6); default todos
  weeklyRotation?: boolean;  // feira: estoque rotativo
}

export type ShopSection =
  | { kind: 'seeds'; categories: string[]; maxRarity: string }
  | { kind: 'seedlings'; categories: string[]; maxRarity: string }
  | { kind: 'pots' }
  | { kind: 'soil' }
  | { kind: 'tools' }
  | { kind: 'consumables' }
  | { kind: 'decor'; categories: string[] }
  | { kind: 'rare-rotation' };

export const SHOPS: ShopData[] = [
  {
    id: 'floricultura', namePT: 'Floricultura da Rosa', nameEN: 'Rosa\'s Flower Shop', npcId: 'rosa',
    descPT: 'Sementes, mudas comuns, vasos simples e conversa boa.',
    descEN: 'Seeds, common seedlings, simple pots and good conversation.',
    icon: 'shop-flowers',
    sells: [
      { kind: 'seeds', categories: ['annual', 'perennial', 'bulb', 'rose-shrub', 'wildflower'], maxRarity: 'uncommon' },
      { kind: 'seedlings', categories: ['annual', 'perennial', 'rose-shrub'], maxRarity: 'uncommon' },
      { kind: 'pots' },
      { kind: 'decor', categories: ['cozy', 'light'] },
    ],
  },
  {
    id: 'mercado-verde', namePT: 'Mercado Verde', nameEN: 'Green Market',
    descPT: 'Ferramentas, solos, adubos e tudo que suja as mãos.',
    descEN: 'Tools, soils, fertilizers and everything that dirties hands.',
    icon: 'shop-tools',
    sells: [{ kind: 'tools' }, { kind: 'soil' }, { kind: 'consumables' }, { kind: 'pots' }, { kind: 'decor', categories: ['path', 'structure', 'light'] }],
  },
  {
    id: 'feira-botanica', namePT: 'Feira Botânica', nameEN: 'Botanical Fair',
    descPT: 'Todo fim de semana, bancas com raridades de colecionador.',
    descEN: 'Every weekend, stalls with collector rarities.',
    icon: 'shop-fair', openDays: [6, 0], weeklyRotation: true,
    sells: [{ kind: 'rare-rotation' }],
  },
  {
    id: 'antiquario', namePT: 'Antiquário do Jardim', nameEN: 'Garden Antiques', npcId: 'irene',
    descPT: 'Vasos com história, bancos com memória e fontes com alma.',
    descEN: 'Pots with history, benches with memory and fountains with soul.',
    icon: 'shop-antique',
    sells: [{ kind: 'pots' }, { kind: 'decor', categories: ['furniture', 'water', 'cozy', 'light'] }],
  },
  {
    id: 'viveiro-tropical', namePT: 'Viveiro Tropical', nameEN: 'Tropical Nursery',
    descPT: 'Folhagens, orquídeas, bromélias e ar de floresta.',
    descEN: 'Foliage, orchids, bromeliads and forest air.',
    icon: 'shop-tropical',
    sells: [
      { kind: 'seedlings', categories: ['tropical', 'climber'], maxRarity: 'rare' },
      { kind: 'seeds', categories: ['tropical', 'climber', 'aquatic'], maxRarity: 'rare' },
      { kind: 'soil' },
    ],
  },
  {
    id: 'clube-colecionadores', namePT: 'Clube dos Colecionadores', nameEN: 'Collectors\' Club',
    descPT: 'Sementes raras, bonsai, carnívoras e desafios para especialistas.',
    descEN: 'Rare seeds, bonsai, carnivores and expert challenges.',
    icon: 'shop-club',
    sells: [
      { kind: 'seeds', categories: ['orchid', 'bonsai-tree', 'carnivorous', 'succulent'], maxRarity: 'legendary' },
      { kind: 'seedlings', categories: ['orchid', 'bonsai-tree', 'carnivorous'], maxRarity: 'legendary' },
    ],
  },
  {
    id: 'loja-jogador', namePT: 'Sua Loja', nameEN: 'Your Shop',
    descPT: 'Venda mudas, flores, arranjos e plantas raras para o bairro.',
    descEN: 'Sell seedlings, flowers, arrangements and rare plants to the neighborhood.',
    icon: 'shop-player',
    sells: [],
  },
];

export const SHOP_BY_ID: Record<string, ShopData> = {};
for (const s of SHOPS) SHOP_BY_ID[s.id] = s;

// preço sazonal: multiplicador por categoria/estação
export const SEASON_PRICE_MULT: Record<Season, Record<string, number>> = {
  spring: { annual: 1.2, bulb: 0.8, 'rose-shrub': 1.3, wildflower: 1.2, herb: 1.1 },
  summer: { succulent: 1.2, tropical: 1.2, aquatic: 1.3, annual: 1.0, herb: 1.2 },
  autumn: { bulb: 1.4, perennial: 1.1, 'bonsai-tree': 1.1, wildflower: 0.9 },
  winter: { tropical: 1.3, orchid: 1.3, 'bonsai-tree': 1.2, annual: 0.7, carnivorous: 1.1 },
};
