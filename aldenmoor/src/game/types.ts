// Tipos centrais do mundo. A "camada de dados" é a fonte da verdade:
// o mapa visual é desenhado a partir daqui, garantindo correspondência 1:1.

export type LocationType =
  | "city" // Cidade grande
  | "village" // Vila
  | "castle" // Castelo
  | "ruin" // Ruína
  | "dungeon" // Masmorra
  | "tower" // Torre de magos
  | "port" // Porto
  | "camp" // Acampamento
  | "shrine" // Santuário / menir
  | "mine"; // Mina

export type TerrainType = "road" | "trail" | "wild";

export interface Region {
  id: string;
  name: string;
  biome: string;
  climate: string;
  difficulty: number; // 1..5
  color: number; // tom de tinta da região no mapa (hex 0xRRGGBB)
}

export interface WorldLocation {
  id: string;
  name: string;
  type: LocationType;
  x: number; // posição no mapa em % (0..100)
  y: number; // posição no mapa em % (0..100)
  region: string; // id da região
  level: number; // nível recomendado
  desc: string;
  content: string[]; // tags de conteúdo (loja, ferreiro, taverna, ...)
}

export interface Road {
  a: string; // id de local
  b: string; // id de local
  terrain: TerrainType; // afeta o custo/velocidade de viagem
}

export interface WorldData {
  name: string;
  subtitle: string;
  regions: Region[];
  locations: WorldLocation[];
  roads: Road[];
}
