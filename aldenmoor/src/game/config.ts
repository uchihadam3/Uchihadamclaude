// Constantes globais do mundo/mapa.

// Tamanho do "mundo" em pixels (o pergaminho). Coordenadas % dos locais
// são convertidas para este espaço.
export const WORLD_W = 2400;
export const WORLD_H = 1600;

// Viagem: quantos minutos de jogo passam por unidade de distância percorrida.
// Ajustado para uma travessia larga custar ~algumas horas de jogo.
export const MINUTES_PER_UNIT = 0.55;

// Velocidade visual do marcador (px/seg no espaço do mundo).
export const TRAVEL_PX_PER_SEC = 260;

// Multiplicador de custo por tipo de terreno (estrada é mais rápida).
export const TERRAIN_COST: Record<string, number> = {
  road: 1.0,
  trail: 1.35,
  wild: 1.9,
};

export const pctToWorld = (xPct: number, yPct: number) => ({
  x: (xPct / 100) * WORLD_W,
  y: (yPct / 100) * WORLD_H,
});

// Paleta do pergaminho / tinta
export const INK = 0x3a2a17;
export const INK_SOFT = 0x6b5334;
export const PARCHMENT_HI = "#efdcb0";
export const PARCHMENT_LO = "#d9bd86";
export const SEA = 0x9db9b0;
