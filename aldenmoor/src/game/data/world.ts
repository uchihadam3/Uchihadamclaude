import type { WorldData } from "../types";
import { validateWorld } from "./schemas";

// =============================================================================
// ALDENMOOR — o continente. Esta é a FONTE DA VERDADE do mundo.
// O mapa visual (pergaminho) é desenhado a partir destes dados, então
// "cidade desenhada = cidade jogável exatamente naquele ponto" por construção.
// Coordenadas em % (0..100) sobre a tela do mapa.
// =============================================================================

const RAW: WorldData = {
  name: "Aldenmoor",
  subtitle: "Crônicas do Continente",

  regions: [
    {
      id: "planicies",
      name: "Planícies Centrais",
      biome: "Campos e colinas",
      climate: "Temperado",
      difficulty: 1,
      color: 0x8a9a5b,
    },
    {
      id: "floresta",
      name: "Floresta Sombria",
      biome: "Floresta densa",
      climate: "Úmido",
      difficulty: 2,
      color: 0x4d6b4a,
    },
    {
      id: "picos",
      name: "Picos Gélidos",
      biome: "Montanhas nevadas",
      climate: "Frio",
      difficulty: 4,
      color: 0x9fb2c4,
    },
    {
      id: "costa",
      name: "Costa das Brumas",
      biome: "Litoral e falésias",
      climate: "Ameno e úmido",
      difficulty: 2,
      color: 0x6ba0a6,
    },
    {
      id: "ermo",
      name: "Ermo Cinzento",
      biome: "Terras áridas",
      climate: "Seco",
      difficulty: 3,
      color: 0xb99b6a,
    },
  ],

  locations: [
    // ---- Planícies Centrais (início) ----
    {
      id: "CITY_001",
      name: "Pedravale",
      type: "city",
      x: 47,
      y: 54,
      region: "planicies",
      level: 1,
      desc: "A cidade-mercado no coração do continente. Onde toda jornada começa.",
      content: ["loja", "ferreiro", "taverna", "guilda", "quests", "treinador"],
    },
    {
      id: "VILLAGE_001",
      name: "Ribeirão",
      type: "village",
      x: 37,
      y: 62,
      region: "planicies",
      level: 1,
      desc: "Uma vila tranquila às margens do rio, de moleiros e pescadores.",
      content: ["comercio", "moradores", "quests"],
    },
    {
      id: "CASTLE_001",
      name: "Forte de Aldbrand",
      type: "castle",
      x: 56,
      y: 45,
      region: "planicies",
      level: 3,
      desc: "A fortaleza dos Aldbrand, guardiã das planícies e sede da nobreza.",
      content: ["nobres", "faccao", "quests"],
    },

    // ---- Floresta Sombria ----
    {
      id: "VILLAGE_002",
      name: "Folharéu",
      type: "village",
      x: 28,
      y: 44,
      region: "floresta",
      level: 2,
      desc: "Vila madeireira sob copas eternas. Sussurros vêm da mata.",
      content: ["comercio", "moradores", "quests"],
    },
    {
      id: "RUIN_001",
      name: "Ruínas de Eldoran",
      type: "ruin",
      x: 19,
      y: 33,
      region: "floresta",
      level: 3,
      desc: "Os restos de um reino élfico engolido pela floresta.",
      content: ["exploracao", "tesouro", "evento_raro"],
    },
    {
      id: "TOWER_001",
      name: "Torre de Véspero",
      type: "tower",
      x: 25,
      y: 24,
      region: "floresta",
      level: 4,
      desc: "A torre solitária do arcano Véspero, guardiã de saberes proibidos.",
      content: ["magias", "conhecimento", "npc_especial"],
    },

    // ---- Picos Gélidos ----
    {
      id: "CITY_002",
      name: "Cume Branco",
      type: "city",
      x: 69,
      y: 27,
      region: "picos",
      level: 4,
      desc: "Cidade fortificada esculpida na montanha, de mineiros e montanheses.",
      content: ["loja", "ferreiro", "taverna", "quests"],
    },
    {
      id: "DUNGEON_001",
      name: "Cavernas de Gorm",
      type: "dungeon",
      x: 60,
      y: 17,
      region: "picos",
      level: 5,
      desc: "Túneis profundos onde algo antigo range no escuro.",
      content: ["combate", "chefe", "recompensa_unica"],
    },

    // ---- Costa das Brumas ----
    {
      id: "PORT_001",
      name: "Porto Salino",
      type: "port",
      x: 15,
      y: 58,
      region: "costa",
      level: 2,
      desc: "O porto movimentado onde chegam mercadorias e rumores de além-mar.",
      content: ["comercio", "transporte", "quests_maritimas"],
    },
    {
      id: "CITY_003",
      name: "Maré Alta",
      type: "city",
      x: 18,
      y: 70,
      region: "costa",
      level: 3,
      desc: "Cidade das falésias, de faroleiros e contrabandistas.",
      content: ["loja", "taverna", "guilda", "quests"],
    },

    // ---- Ermo Cinzento ----
    {
      id: "VILLAGE_003",
      name: "Poço Seco",
      type: "village",
      x: 68,
      y: 71,
      region: "ermo",
      level: 3,
      desc: "Um posto avançado agarrado à vida à beira do ermo.",
      content: ["comercio", "moradores", "quests"],
    },
    {
      id: "RUIN_002",
      name: "Sepulcro do Ermo",
      type: "ruin",
      x: 77,
      y: 63,
      region: "ermo",
      level: 4,
      desc: "Um mausoléu meio soterrado pela areia e pelo esquecimento.",
      content: ["exploracao", "tesouro", "evento_raro"],
    },
    {
      id: "DUNGEON_002",
      name: "Fenda Abissal",
      type: "dungeon",
      x: 85,
      y: 78,
      region: "ermo",
      level: 6,
      desc: "Uma ferida no mundo. Dizem que nada que desce, retorna.",
      content: ["combate", "chefe", "recompensa_unica"],
    },
  ],

  roads: [
    // rede de estradas (grafo de viagem)
    { a: "CITY_001", b: "VILLAGE_001", terrain: "road" },
    { a: "CITY_001", b: "CASTLE_001", terrain: "road" },
    { a: "CITY_001", b: "VILLAGE_002", terrain: "trail" },
    { a: "VILLAGE_001", b: "PORT_001", terrain: "road" },
    { a: "PORT_001", b: "CITY_003", terrain: "road" },
    { a: "VILLAGE_002", b: "RUIN_001", terrain: "trail" },
    { a: "RUIN_001", b: "TOWER_001", terrain: "wild" },
    { a: "CASTLE_001", b: "CITY_002", terrain: "trail" },
    { a: "CITY_002", b: "DUNGEON_001", terrain: "wild" },
    { a: "CASTLE_001", b: "RUIN_002", terrain: "trail" },
    { a: "CITY_001", b: "VILLAGE_003", terrain: "trail" },
    { a: "RUIN_002", b: "VILLAGE_003", terrain: "trail" },
    { a: "VILLAGE_003", b: "DUNGEON_002", terrain: "wild" },
  ],
};

export const WORLD: WorldData = validateWorld(RAW);

// Local inicial do jogador
export const START_LOCATION_ID = "CITY_001";
