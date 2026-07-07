import type { AreaData } from '../types';

// Mapa de luz por caractere:
// F=sol pleno, M=sol da manhã, A=sol da tarde, P=meia-sombra, S=sombra clara,
// D=sombra profunda, I=luz indireta forte, i=indireta média, G=luz artificial, W=água
// X = tile bloqueado (estrutura), B = bancada

// ============ ÁREAS (18) ============
export const AREAS: AreaData[] = [
  {
    id: 'quintal', namePT: 'Quintal Abandonado', nameEN: 'Abandoned Yard', tier: 'initial',
    descPT: 'Onde tudo começa: mato, entulho e potencial infinito.',
    descEN: 'Where it all begins: weeds, debris and endless potential.',
    cols: 8, rows: 6, baseLight: 'full-sun',
    lightMap: ['FFFFFFMM', 'FFFFFFMM', 'FFFFFPPP', 'FFFFFPPP', 'MFFFFPSS', 'MMFFFPSS'],
    humidity: 'average', tempOffsetC: 0, indoor: false, unlockPrice: 0, unlockRule: 'start',
    maxDecor: 8, ambientPalette: { sky: '#87b5d8', ground: '#7a6a4e', accent: '#8a9a6a' },
  },
  {
    id: 'bancada', namePT: 'Bancada de Plantio', nameEN: 'Potting Bench', tier: 'initial',
    descPT: 'Mesa de trabalho: misturar solo, replantar, dividir e propagar.',
    descEN: 'The workbench: mix soil, repot, divide and propagate.',
    cols: 6, rows: 3, baseLight: 'bright-indirect',
    lightMap: ['IIIIII', 'IBBBBI', 'IIIIII'],
    humidity: 'average', tempOffsetC: 1, indoor: true, unlockPrice: 0, unlockRule: 'start',
    maxDecor: 4, ambientPalette: { sky: '#6a5a48', ground: '#8a7050', accent: '#b09060' },
  },
  {
    id: 'varanda', namePT: 'Varanda Pequena', nameEN: 'Small Balcony', tier: 'initial',
    descPT: 'Vasos no chão, na mesa e pendurados: um jardim vertical de bolso.',
    descEN: 'Pots on floor, table and hooks: a pocket vertical garden.',
    cols: 7, rows: 4, baseLight: 'morning-sun',
    lightMap: ['MMMMIII', 'MMMMIII', 'MMMIIII', 'PPPIIII'],
    humidity: 'average', tempOffsetC: 2, indoor: false, unlockPrice: 120, unlockRule: 'quest:desbloquear-varanda',
    maxDecor: 6, themeBonus: 'varanda-florida', ambientPalette: { sky: '#a8c8e0', ground: '#b09880', accent: '#d8b898' },
  },
  // ---- intermediárias ----
  {
    id: 'canteiro-flores', namePT: 'Canteiro de Flores', nameEN: 'Flower Beds', tier: 'intermediate',
    descPT: 'Sol generoso para anuais e perenes em massa.',
    descEN: 'Generous sun for masses of annuals and perennials.',
    cols: 9, rows: 6, baseLight: 'full-sun',
    lightMap: ['FFFFFFFFF', 'FFFFFFFFF', 'FFFFFFFFF', 'FFFFFFFFF', 'MFFFFFFFA', 'MMFFFFFAA'],
    humidity: 'average', tempOffsetC: 0, indoor: false, unlockPrice: 350, unlockRule: 'reputation:10',
    maxDecor: 10, themeBonus: 'jardim-cottage', ambientPalette: { sky: '#8ec1e8', ground: '#6f5f43', accent: '#c8a878' },
  },
  {
    id: 'canto-sombra', namePT: 'Canto de Sombra', nameEN: 'Shade Corner', tier: 'intermediate',
    descPT: 'Sob a árvore velha: reino de samambaias, hostas e calmaria.',
    descEN: 'Under the old tree: realm of ferns, hostas and calm.',
    cols: 7, rows: 5, baseLight: 'part-shade',
    lightMap: ['PPSSSDD', 'PSSSDDD', 'PSSDDDD', 'PPSSDDD', 'PPPSSDD'],
    humidity: 'humid', tempOffsetC: -2, indoor: false, unlockPrice: 300, unlockRule: 'quest:aprender-luz',
    maxDecor: 8, themeBonus: 'jardim-sombra', ambientPalette: { sky: '#5a7a68', ground: '#4a4438', accent: '#6a8a5a' },
  },
  {
    id: 'jardim-ervas', namePT: 'Jardim de Ervas', nameEN: 'Herb Garden', tier: 'intermediate',
    descPT: 'Espiral aromática de temperos ao sol.',
    descEN: 'An aromatic spice spiral in the sun.',
    cols: 7, rows: 5, baseLight: 'full-sun',
    lightMap: ['FFFFFFF', 'FFFFFFF', 'FFFFFMM', 'FFFFFMM', 'MMFFFMM'],
    humidity: 'dry', tempOffsetC: 1, indoor: false, unlockPrice: 280, unlockRule: 'npc:marcos:1',
    maxDecor: 7, themeBonus: 'jardim-ervas', ambientPalette: { sky: '#9cc8e0', ground: '#8a7a58', accent: '#a8b878' },
  },
  {
    id: 'jardim-suculentas', namePT: 'Jardim de Suculentas', nameEN: 'Succulent Garden', tier: 'intermediate',
    descPT: 'Pedras, areia e sol forte: o deserto decorativo.',
    descEN: 'Rocks, sand and hard sun: the decorative desert.',
    cols: 8, rows: 5, baseLight: 'full-sun',
    lightMap: ['FFFFFFFF', 'FFFFFFFF', 'FFFFFFFF', 'FFFFFFAA', 'FFFFFFAA'],
    humidity: 'dry', tempOffsetC: 3, indoor: false, unlockPrice: 320, unlockRule: 'npc:otto:1',
    maxDecor: 9, themeBonus: 'jardim-suculentas', ambientPalette: { sky: '#a8cce0', ground: '#b89a70', accent: '#d8b088' },
  },
  {
    id: 'jardim-borboletas', namePT: 'Jardim de Borboletas', nameEN: 'Butterfly Garden', tier: 'intermediate',
    descPT: 'Néctar em camadas para abelhas, borboletas e beija-flores.',
    descEN: 'Layered nectar for bees, butterflies and hummingbirds.',
    cols: 8, rows: 6, baseLight: 'full-sun',
    lightMap: ['FFFFFFFF', 'FFFFFFFF', 'FFFFFFFF', 'FFFFFFPP', 'MFFFFFPP', 'MMFFFFPP'],
    humidity: 'average', tempOffsetC: 0, indoor: false, unlockPrice: 380, unlockRule: 'npc:lia:1',
    maxDecor: 10, themeBonus: 'jardim-borboletas', ambientPalette: { sky: '#98c8e8', ground: '#6f6243', accent: '#c8b868' },
  },
  {
    id: 'pergola', namePT: 'Pérgola de Trepadeiras', nameEN: 'Climber Pergola', tier: 'intermediate',
    descPT: 'Madeira e arames à espera de glicínias e jasmins.',
    descEN: 'Wood and wires awaiting wisteria and jasmine.',
    cols: 8, rows: 4, baseLight: 'full-sun',
    lightMap: ['FFFFFFFF', 'FPPPPPPF', 'FPPPPPPF', 'FFFFFFFF'],
    humidity: 'average', tempOffsetC: 0, indoor: false, unlockPrice: 420, unlockRule: 'npc:tomas:2',
    maxDecor: 8, ambientPalette: { sky: '#90bede', ground: '#7a6a50', accent: '#a08858' },
  },
  {
    id: 'terraco', namePT: 'Terraço de Vasos', nameEN: 'Pot Terrace', tier: 'intermediate',
    descPT: 'Palco elevado para os vasos mais bonitos da coleção.',
    descEN: 'An elevated stage for the collection\'s finest pots.',
    cols: 8, rows: 5, baseLight: 'full-sun',
    lightMap: ['FFFFFMMM', 'FFFFFMMM', 'FFFFFIII', 'AAFFFIII', 'AAFFFIII'],
    humidity: 'average', tempOffsetC: 1, indoor: false, unlockPrice: 400, unlockRule: 'reputation:25',
    maxDecor: 12, themeBonus: 'colecao-botanica', ambientPalette: { sky: '#a0c8e8', ground: '#a89078', accent: '#c8b098' },
  },
  // ---- avançadas ----
  {
    id: 'estufa', namePT: 'Estufa Tropical', nameEN: 'Tropical Greenhouse', tier: 'advanced',
    descPT: 'Vidro, vapor e calor: um pedaço de floresta equatorial.',
    descEN: 'Glass, steam and warmth: a slice of equatorial forest.',
    cols: 8, rows: 6, baseLight: 'bright-indirect',
    lightMap: ['IIIIIIII', 'IIIIIIII', 'IIIIIIGG', 'IIIIIIGG', 'iiIIIIGG', 'iiIIIIGG'],
    humidity: 'very-humid', tempOffsetC: 8, indoor: true, unlockPrice: 900, unlockRule: 'quest:desbloquear-estufa',
    maxDecor: 10, themeBonus: 'jardim-tropical', ambientPalette: { sky: '#b8d8c8', ground: '#5a4a3a', accent: '#78a888' },
  },
  {
    id: 'jardim-japones', namePT: 'Jardim Japonês', nameEN: 'Japanese Garden', tier: 'advanced',
    descPT: 'Musgo, pedra, água e silêncio. Cada elemento no seu lugar.',
    descEN: 'Moss, stone, water and silence. Every element in its place.',
    cols: 9, rows: 6, baseLight: 'part-shade',
    lightMap: ['MMPPPPSSS', 'MPPPPSSSS', 'MPPWWPSSS', 'PPPWWPPSS', 'PPPPPPPSS', 'MPPPPPPPS'],
    humidity: 'humid', tempOffsetC: -1, indoor: false, water: true, unlockPrice: 1200, unlockRule: 'npc:sora:2',
    maxDecor: 14, themeBonus: 'jardim-japones', ambientPalette: { sky: '#a8c0b8', ground: '#5a5a4a', accent: '#88a878' },
  },
  {
    id: 'jardim-aquatico', namePT: 'Jardim Aquático', nameEN: 'Water Garden', tier: 'advanced',
    descPT: 'Um espelho d\'água para ninféias, lótus e libélulas.',
    descEN: 'A water mirror for lilies, lotus and dragonflies.',
    cols: 8, rows: 6, baseLight: 'full-sun',
    lightMap: ['FFFFFFFF', 'FWWWWWFF', 'FWWWWWWF', 'FWWWWWWF', 'FFWWWWFF', 'FFFFFFFF'],
    humidity: 'very-humid', tempOffsetC: -1, indoor: false, water: true, unlockPrice: 1100, unlockRule: 'npc:eva:1',
    maxDecor: 10, themeBonus: 'jardim-aquatico', ambientPalette: { sky: '#88c0d8', ground: '#5a6a5a', accent: '#68a8b8' },
  },
  {
    id: 'orquidario', namePT: 'Orquidário', nameEN: 'Orchid House', tier: 'advanced',
    descPT: 'Ripas, casca e névoa: o templo das orquídeas.',
    descEN: 'Slats, bark and mist: the orchid temple.',
    cols: 7, rows: 5, baseLight: 'bright-indirect',
    lightMap: ['IIIIIII', 'IIIIIII', 'IIIIIii', 'IIIIIii', 'iiIIIii'],
    humidity: 'very-humid', tempOffsetC: 4, indoor: true, unlockPrice: 1000, unlockRule: 'npc:helena:2',
    maxDecor: 8, themeBonus: 'orquidario', ambientPalette: { sky: '#c0b8d0', ground: '#6a5a48', accent: '#a888b8' },
  },
  {
    id: 'sala-plantas', namePT: 'Sala de Plantas Internas', nameEN: 'Indoor Plant Room', tier: 'advanced',
    descPT: 'Estantes, luz de janela e o cheiro de terra dentro de casa.',
    descEN: 'Shelves, window light and the smell of soil indoors.',
    cols: 7, rows: 5, baseLight: 'bright-indirect',
    lightMap: ['IIIiiDD', 'IIIiiDD', 'IIIiiiD', 'IIIIiii', 'IIIIiii'],
    humidity: 'average', tempOffsetC: 5, indoor: true, unlockPrice: 700, unlockRule: 'npc:mina:2',
    maxDecor: 10, themeBonus: 'jardim-minimalista', ambientPalette: { sky: '#d8cec0', ground: '#8a7862', accent: '#b8a890' },
  },
  {
    id: 'viveiro', namePT: 'Viveiro de Mudas', nameEN: 'Nursery', tier: 'advanced',
    descPT: 'Produção em escala: bandejas, estacas e futuros jardins.',
    descEN: 'Production at scale: trays, cuttings and future gardens.',
    cols: 8, rows: 4, baseLight: 'bright-indirect',
    lightMap: ['IIIIIIII', 'IIIIIIII', 'GGIIIIII', 'GGIIIIII'],
    humidity: 'humid', tempOffsetC: 3, indoor: true, unlockPrice: 800, unlockRule: 'quest:vender-mudas',
    maxDecor: 6, ambientPalette: { sky: '#c8d8c0', ground: '#7a6a52', accent: '#98a878' },
  },
  {
    id: 'loja', namePT: 'Loja do Jogador', nameEN: 'Your Shop', tier: 'advanced',
    descPT: 'Sua vitrine: venda mudas, flores e arranjos para o bairro.',
    descEN: 'Your storefront: sell seedlings, flowers and arrangements.',
    cols: 6, rows: 4, baseLight: 'bright-indirect',
    lightMap: ['IIIIII', 'IIIIII', 'IIIIII', 'BBIIII'],
    humidity: 'average', tempOffsetC: 3, indoor: true, unlockPrice: 1500, unlockRule: 'quest:abrir-loja',
    maxDecor: 8, ambientPalette: { sky: '#d8c8b0', ground: '#9a8060', accent: '#c8a070' },
  },
  {
    id: 'jardim-prestigio', namePT: 'Jardim de Prestígio', nameEN: 'Prestige Garden', tier: 'advanced',
    descPT: 'O grande palco final: aqui nasce o Jardim Vivo.',
    descEN: 'The grand final stage: here the Living Garden is born.',
    cols: 11, rows: 8, baseLight: 'full-sun',
    lightMap: ['FFFFFFFFFMM', 'FFFFFFFFFMM', 'FFFFWWFFFPP', 'FFFFWWFFFPP', 'MFFFFFFFPSS', 'MFFFFFFPPSS', 'MMFFFFFPPSD', 'MMMFFFPPSSD'],
    humidity: 'average', tempOffsetC: 0, indoor: false, water: true, unlockPrice: 3000, unlockRule: 'quest:festival-quatro-estacoes',
    maxDecor: 24, ambientPalette: { sky: '#8ec8f0', ground: '#6f6248', accent: '#c8b070' },
  },
];

export const AREA_BY_ID: Record<string, AreaData> = {};
for (const a of AREAS) AREA_BY_ID[a.id] = a;

export const LIGHT_CHAR: Record<string, import('../types').LightType | 'water' | 'blocked' | 'bench'> = {
  F: 'full-sun', M: 'morning-sun', A: 'afternoon-sun', P: 'part-shade',
  S: 'light-shade', D: 'deep-shade', I: 'bright-indirect', i: 'medium-indirect',
  G: 'grow-light', W: 'water', X: 'blocked', B: 'bench',
};

export function tileLight(area: AreaData, x: number, y: number): import('../types').LightType | 'water' | 'blocked' | 'bench' {
  const row = area.lightMap?.[y];
  if (!row) return area.baseLight;
  const ch = row[x];
  return LIGHT_CHAR[ch] ?? area.baseLight;
}
