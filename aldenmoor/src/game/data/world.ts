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

  // Continentes: cada um ocupa uma caixa em map% e desenha seu contorno em
  // coordenadas locais (0..100). Locais/regiões guardam coords LOCAIS.
  continents: [
    {
      id: "aldenmoor",
      name: "Aldenmoor",
      ox: 2,
      oy: 5,
      w: 50,
      h: 90,
      coast: [
        [50, 5], [61, 7], [70, 11], [79, 10], [87, 16], [91, 25], [88, 34],
        [93, 43], [90, 53], [93, 63], [87, 73], [90, 83], [81, 87], [71, 84],
        [63, 90], [51, 93], [41, 90], [33, 92], [25, 86], [17, 89], [11, 80],
        [15, 70], [8, 60], [12, 50], [7, 40], [13, 31], [9, 22], [18, 15],
        [29, 12], [39, 8],
      ],
    },
    {
      id: "norvik",
      name: "Norvik",
      ox: 55,
      oy: 4,
      w: 43,
      h: 43,
      coast: [
        [50, 6], [68, 10], [82, 18], [92, 32], [88, 48], [93, 62], [80, 78],
        [64, 86], [48, 90], [32, 84], [18, 74], [10, 58], [8, 42], [14, 26],
        [28, 14], [40, 8],
      ],
    },
    {
      id: "selara",
      name: "Selara",
      ox: 53,
      oy: 51,
      w: 45,
      h: 45,
      coast: [
        [48, 5], [64, 8], [80, 14], [90, 28], [86, 44], [93, 60], [84, 76],
        [70, 86], [52, 92], [36, 88], [22, 80], [12, 66], [9, 48], [15, 30],
        [30, 16], [40, 8],
      ],
    },
  ],

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
    // ---- Norvik ----
    { id: "n_tundra", name: "Tundra de Norvik", biome: "Tundra gelada", climate: "Gélido", difficulty: 4, color: 0xaebccc, continent: "norvik" },
    { id: "n_fjord", name: "Fiordes de Norvik", biome: "Fiordes e mar", climate: "Frio úmido", difficulty: 3, color: 0x6f9aa8, continent: "norvik" },
    // ---- Selara ----
    { id: "s_jungle", name: "Selva de Selara", biome: "Floresta tropical", climate: "Quente úmido", difficulty: 4, color: 0x5a8a4a, continent: "selara" },
    { id: "s_ash", name: "Terras de Cinza", biome: "Vulcânico", climate: "Quente seco", difficulty: 5, color: 0x9a6a5a, continent: "selara" },
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

    // ================= locais adicionais (mundo mais denso) =================
    // ---- Planícies Centrais ----
    { id: "VILLAGE_004", name: "Vale do Trigo", type: "village", x: 42, y: 48, region: "planicies", level: 1, desc: "Celeiros dourados alimentam metade das planícies.", content: ["comercio", "moradores"] },
    { id: "SHRINE_001", name: "Santuário da Aurora", type: "shrine", x: 52, y: 60, region: "planicies", level: 2, desc: "Um menir onde peregrinos deixam oferendas ao alvorecer.", content: ["bencao", "evento"] },
    { id: "CAMP_001", name: "Acampamento dos Viajantes", type: "camp", x: 44, y: 39, region: "planicies", level: 1, desc: "Mercadores e andarilhos dividem fogo e histórias.", content: ["comercio", "descanso", "quests"] },
    { id: "RUIN_003", name: "Torre Caída", type: "ruin", x: 61, y: 55, region: "planicies", level: 2, desc: "Só um toco de pedra sobrou desta antiga atalaia.", content: ["exploracao", "tesouro"] },
    { id: "VILLAGE_005", name: "Moinho Velho", type: "village", x: 33, y: 51, region: "planicies", level: 1, desc: "A roda d'água ainda gira, teimosa contra o tempo.", content: ["comercio", "moradores"] },
    { id: "CAMP_002", name: "Encruzilhada", type: "camp", x: 50, y: 50, region: "planicies", level: 2, desc: "Onde quatro estradas se cruzam — e quatro perigos também.", content: ["descanso", "evento"] },

    // ---- Floresta Sombria ----
    { id: "CAMP_003", name: "Toca dos Salteadores", type: "camp", x: 22, y: 37, region: "floresta", level: 3, desc: "Fumaça entre as árvores denuncia bandidos.", content: ["combate", "evento"] },
    { id: "SHRINE_002", name: "Pedra dos Druidas", type: "shrine", x: 14, y: 43, region: "floresta", level: 3, desc: "Runas verdes pulsam nas noites de lua cheia.", content: ["bencao", "conhecimento"] },
    { id: "VILLAGE_006", name: "Toca do Cervo", type: "village", x: 32, y: 30, region: "floresta", level: 2, desc: "Caçadores e ervanários vivem sob as copas.", content: ["comercio", "moradores"] },
    { id: "RUIN_004", name: "Altar Musgoso", type: "ruin", x: 24, y: 53, region: "floresta", level: 3, desc: "Um altar tomado pela mata guarda segredos.", content: ["exploracao", "evento_raro"] },

    // ---- Picos Gélidos ----
    { id: "MINE_001", name: "Mina de Ferro", type: "mine", x: 74, y: 20, region: "picos", level: 4, desc: "Galerias profundas arrancam ferro da montanha.", content: ["comercio", "combate"] },
    { id: "CAMP_004", name: "Posto Avançado", type: "camp", x: 63, y: 30, region: "picos", level: 4, desc: "Uma guarnição vigia os passos gelados.", content: ["descanso", "quests"] },
    { id: "SHRINE_003", name: "Ermida Gélida", type: "shrine", x: 79, y: 15, region: "picos", level: 5, desc: "Um refúgio de oração à beira do abismo branco.", content: ["bencao"] },
    { id: "RUIN_005", name: "Ponte Quebrada", type: "ruin", x: 66, y: 38, region: "picos", level: 4, desc: "A velha ponte ruiu; algo mora entre os escombros.", content: ["exploracao", "combate"] },
    { id: "VILLAGE_007", name: "Aldeia da Neve", type: "village", x: 80, y: 34, region: "picos", level: 4, desc: "Casas de pedra agarradas ao flanco da montanha.", content: ["comercio", "moradores"] },

    // ---- Costa das Brumas ----
    { id: "VILLAGE_008", name: "Enseada", type: "village", x: 12, y: 65, region: "costa", level: 2, desc: "Barcos de pesca balançam na névoa da manhã.", content: ["comercio", "moradores"] },
    { id: "TOWER_002", name: "Farol Antigo", type: "tower", x: 10, y: 52, region: "costa", level: 3, desc: "Sua chama guia — ou engana — os navegantes.", content: ["conhecimento", "evento"] },
    { id: "CAMP_005", name: "Acampamento Costeiro", type: "camp", x: 23, y: 62, region: "costa", level: 2, desc: "Contrabandistas descarregam mercadoria à noite.", content: ["comercio", "evento"] },
    { id: "RUIN_006", name: "Naufrágio", type: "ruin", x: 24, y: 75, region: "costa", level: 3, desc: "O casco apodrecido de um navio encalhado.", content: ["exploracao", "tesouro"] },

    // ---- Ermo Cinzento ----
    { id: "MINE_002", name: "Mina Abandonada", type: "mine", x: 82, y: 57, region: "ermo", level: 4, desc: "Silenciosa demais para uma mina — algo a esvaziou.", content: ["exploracao", "combate"] },
    { id: "CAMP_006", name: "Acampamento do Ermo", type: "camp", x: 72, y: 66, region: "ermo", level: 3, desc: "Um oásis de fogueiras no meio da poeira.", content: ["descanso", "quests"] },
    { id: "SHRINE_004", name: "Obelisco Rachado", type: "shrine", x: 88, y: 70, region: "ermo", level: 5, desc: "Um monólito de origem esquecida fende o horizonte.", content: ["conhecimento", "evento_raro"] },
    { id: "VILLAGE_009", name: "Refúgio", type: "village", x: 63, y: 64, region: "ermo", level: 3, desc: "O último posto antes das terras mortas.", content: ["comercio", "moradores", "quests"] },

    // ===================== NORVIK (continente do norte) =====================
    { id: "N_CITY_1", name: "Portoferro", type: "city", continent: "norvik", x: 50, y: 50, region: "n_fjord", level: 4, desc: "A cidade portuária de ferro e gelo, coração de Norvik.", content: ["loja", "ferreiro", "taverna", "guilda", "quests"] },
    { id: "N_PORT_1", name: "Ancoragem Norte", type: "port", continent: "norvik", x: 20, y: 72, region: "n_fjord", level: 4, desc: "Onde os drakkars atracam entre blocos de gelo.", content: ["comercio", "transporte", "quests_maritimas"] },
    { id: "N_VILLAGE_1", name: "Pescadria", type: "village", continent: "norvik", x: 26, y: 60, region: "n_fjord", level: 3, desc: "Pescadores que desafiam o mar congelado.", content: ["comercio", "moradores"] },
    { id: "N_CASTLE_1", name: "Castelo Gélido", type: "castle", continent: "norvik", x: 66, y: 32, region: "n_tundra", level: 6, desc: "A sé dos jarls, esculpida em gelo eterno.", content: ["nobres", "faccao", "quests"] },
    { id: "N_MINE_1", name: "Mina de Prata", type: "mine", continent: "norvik", x: 74, y: 50, region: "n_tundra", level: 5, desc: "Veios de prata escondidos sob a neve.", content: ["comercio", "combate"] },
    { id: "N_RUIN_1", name: "Templo Soterrado", type: "ruin", continent: "norvik", x: 38, y: 30, region: "n_tundra", level: 5, desc: "Um templo engolido pela geleira.", content: ["exploracao", "tesouro", "evento_raro"] },
    { id: "N_SHRINE_1", name: "Altar do Norte", type: "shrine", continent: "norvik", x: 58, y: 20, region: "n_tundra", level: 5, desc: "Onde se reza às luzes do céu.", content: ["bencao"] },
    { id: "N_DUNGEON_1", name: "Gruta Congelada", type: "dungeon", continent: "norvik", x: 78, y: 66, region: "n_tundra", level: 6, desc: "Cavernas onde o frio tem dentes.", content: ["combate", "chefe", "recompensa_unica"] },
    { id: "N_CAMP_1", name: "Acampamento Ártico", type: "camp", continent: "norvik", x: 42, y: 72, region: "n_fjord", level: 4, desc: "Caçadores de focas e contadores de sagas.", content: ["descanso", "quests"] },
    { id: "N_TOWER_1", name: "Torre da Aurora", type: "tower", continent: "norvik", x: 56, y: 64, region: "n_fjord", level: 6, desc: "Magos que estudam as luzes boreais.", content: ["magias", "conhecimento", "npc_especial"] },
    { id: "N_VILLAGE_2", name: "Ventogélido", type: "village", continent: "norvik", x: 34, y: 46, region: "n_tundra", level: 4, desc: "Casas baixas contra o vento cortante.", content: ["comercio", "moradores"] },

    // ===================== SELARA (continente do sul) =======================
    { id: "S_CITY_1", name: "Selverde", type: "city", continent: "selara", x: 46, y: 46, region: "s_jungle", level: 5, desc: "Cidade de pedra verde sob a copa da selva.", content: ["loja", "ferreiro", "taverna", "guilda", "quests"] },
    { id: "S_PORT_1", name: "Porto Sul", type: "port", continent: "selara", x: 22, y: 74, region: "s_jungle", level: 4, desc: "Especiarias e segredos chegam por aqui.", content: ["comercio", "transporte", "quests_maritimas"] },
    { id: "S_VILLAGE_1", name: "Folhagem", type: "village", continent: "selara", x: 30, y: 60, region: "s_jungle", level: 4, desc: "Casas suspensas entre árvores gigantes.", content: ["comercio", "moradores"] },
    { id: "S_RUIN_1", name: "Cidade Perdida", type: "ruin", continent: "selara", x: 62, y: 34, region: "s_jungle", level: 6, desc: "Ruínas douradas devoradas por raízes.", content: ["exploracao", "tesouro", "evento_raro"] },
    { id: "S_TOWER_1", name: "Torre Esmeralda", type: "tower", continent: "selara", x: 40, y: 26, region: "s_jungle", level: 6, desc: "Um pináculo de jade que fende a copa.", content: ["magias", "conhecimento"] },
    { id: "S_DUNGEON_1", name: "Cova da Serpente", type: "dungeon", continent: "selara", x: 72, y: 58, region: "s_ash", level: 7, desc: "Um ninho antigo sob a montanha fumegante.", content: ["combate", "chefe", "recompensa_unica"] },
    { id: "S_MINE_1", name: "Mina de Obsidiana", type: "mine", continent: "selara", x: 66, y: 72, region: "s_ash", level: 6, desc: "Vidro vulcânico afiado como lâmina.", content: ["comercio", "combate"] },
    { id: "S_SHRINE_1", name: "Ídolo Antigo", type: "shrine", continent: "selara", x: 52, y: 66, region: "s_jungle", level: 5, desc: "Uma face de pedra que observa há eras.", content: ["conhecimento", "evento_raro"] },
    { id: "S_CAMP_1", name: "Acampamento da Selva", type: "camp", continent: "selara", x: 34, y: 42, region: "s_jungle", level: 4, desc: "Exploradores atrás de tesouros perdidos.", content: ["descanso", "quests"] },
    { id: "S_CASTLE_1", name: "Cidadela de Cinza", type: "castle", continent: "selara", x: 58, y: 80, region: "s_ash", level: 7, desc: "Uma fortaleza negra à sombra do vulcão.", content: ["nobres", "faccao", "quests"] },
    { id: "S_VILLAGE_2", name: "Vila das Cinzas", type: "village", continent: "selara", x: 76, y: 44, region: "s_ash", level: 5, desc: "Vivem da terra fértil e temem a montanha.", content: ["comercio", "moradores"] },
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

    // novas ligações
    { a: "CITY_001", b: "CAMP_002", terrain: "road" },
    { a: "CAMP_002", b: "VILLAGE_004", terrain: "road" },
    { a: "VILLAGE_004", b: "VILLAGE_005", terrain: "trail" },
    { a: "VILLAGE_005", b: "VILLAGE_002", terrain: "trail" },
    { a: "CAMP_002", b: "SHRINE_001", terrain: "trail" },
    { a: "CASTLE_001", b: "RUIN_003", terrain: "trail" },
    { a: "CAMP_001", b: "VILLAGE_002", terrain: "trail" },
    { a: "VILLAGE_002", b: "VILLAGE_006", terrain: "wild" },
    { a: "VILLAGE_006", b: "SHRINE_002", terrain: "wild" },
    { a: "VILLAGE_001", b: "VILLAGE_005", terrain: "trail" },
    { a: "PORT_001", b: "VILLAGE_008", terrain: "trail" },
    { a: "VILLAGE_008", b: "TOWER_002", terrain: "wild" },
    { a: "CITY_003", b: "CAMP_005", terrain: "trail" },
    { a: "CAMP_005", b: "RUIN_006", terrain: "wild" },
    { a: "CITY_002", b: "VILLAGE_007", terrain: "trail" },
    { a: "VILLAGE_007", b: "MINE_001", terrain: "wild" },
    { a: "CASTLE_001", b: "CAMP_004", terrain: "trail" },
    { a: "CAMP_004", b: "RUIN_005", terrain: "wild" },
    { a: "CITY_002", b: "SHRINE_003", terrain: "wild" },
    { a: "CITY_001", b: "VILLAGE_009", terrain: "trail" },
    { a: "VILLAGE_009", b: "CAMP_006", terrain: "trail" },
    { a: "CAMP_006", b: "MINE_002", terrain: "wild" },
    { a: "RUIN_002", b: "SHRINE_004", terrain: "wild" },

    // Norvik
    { a: "N_CITY_1", b: "N_PORT_1", terrain: "road" },
    { a: "N_CITY_1", b: "N_VILLAGE_1", terrain: "road" },
    { a: "N_CITY_1", b: "N_TOWER_1", terrain: "trail" },
    { a: "N_CITY_1", b: "N_VILLAGE_2", terrain: "trail" },
    { a: "N_VILLAGE_2", b: "N_RUIN_1", terrain: "wild" },
    { a: "N_VILLAGE_2", b: "N_CASTLE_1", terrain: "trail" },
    { a: "N_CASTLE_1", b: "N_SHRINE_1", terrain: "wild" },
    { a: "N_CASTLE_1", b: "N_MINE_1", terrain: "trail" },
    { a: "N_MINE_1", b: "N_DUNGEON_1", terrain: "wild" },
    { a: "N_TOWER_1", b: "N_CAMP_1", terrain: "trail" },

    // Selara
    { a: "S_CITY_1", b: "S_PORT_1", terrain: "road" },
    { a: "S_CITY_1", b: "S_VILLAGE_1", terrain: "road" },
    { a: "S_CITY_1", b: "S_TOWER_1", terrain: "trail" },
    { a: "S_CITY_1", b: "S_CAMP_1", terrain: "trail" },
    { a: "S_CITY_1", b: "S_SHRINE_1", terrain: "trail" },
    { a: "S_TOWER_1", b: "S_RUIN_1", terrain: "wild" },
    { a: "S_SHRINE_1", b: "S_CASTLE_1", terrain: "trail" },
    { a: "S_CASTLE_1", b: "S_MINE_1", terrain: "trail" },
    { a: "S_MINE_1", b: "S_DUNGEON_1", terrain: "wild" },
    { a: "S_VILLAGE_2", b: "S_DUNGEON_1", terrain: "wild" },
  ],
};

export const WORLD: WorldData = validateWorld(RAW);

// Local inicial do jogador
export const START_LOCATION_ID = "CITY_001";
