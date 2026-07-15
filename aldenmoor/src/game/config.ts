// Constantes globais do mundo/mapa.

// Tamanho do "mundo" em pixels. Coordenadas % dos locais são convertidas
// para este espaço. Mundo grande o bastante para vários continentes.
export const WORLD_W = 6000;
export const WORLD_H = 3600;

// Textura de pergaminho é gerada num tamanho limitado (< 4096, limite de GPUs
// mobile) e esticada para cobrir o mundo inteiro.
export const PARCH_W = 2400;
export const PARCH_H = 1440;

// Viagem: quantos minutos de jogo passam por unidade de distância percorrida.
export const MINUTES_PER_UNIT = 0.32;

// Velocidade de caminhada do personagem (px/seg no espaço do mundo).
export const TRAVEL_PX_PER_SEC = 62;

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
