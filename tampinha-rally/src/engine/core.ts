// ---------------------------------------------------------------------------
// NÚCLEO — mundo 2D da corrida de tampinhas. Toda a física acontece no plano
// (x,y); o render projeta isso em 3D isométrico. Sem dependência de visual aqui.
// A física é "gostosa antes de realista": atrito de Coulomb (parada previsível)
// + arrasto viscoso leve, quique nas bordas, giro visual, superfícies variadas.
// ---------------------------------------------------------------------------

export interface V { x: number; y: number; }
export const vec = (x = 0, y = 0): V => ({ x, y });
export const add = (a: V, b: V): V => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: V, b: V): V => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: V, s: number): V => ({ x: a.x * s, y: a.y * s });
export const dot = (a: V, b: V): number => a.x * b.x + a.y * b.y;
export const len = (a: V): number => Math.hypot(a.x, a.y);
export const dist = (a: V, b: V): number => Math.hypot(a.x - b.x, a.y - b.y);
export const norm = (a: V): V => { const l = Math.hypot(a.x, a.y) || 1; return { x: a.x / l, y: a.y / l }; };
export const perp = (a: V): V => ({ x: -a.y, y: a.x });
export const clamp = (x: number, a: number, b: number) => x < a ? a : x > b ? b : x;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- superfícies ---------------------------------------------------------
export type Surface =
  | 'dirt' | 'sand' | 'cardboard' | 'sidewalk' | 'mud' | 'water'
  | 'ramp' | 'push' | 'chalk' | 'grass' | 'out';

// fric = desaceleração constante (u/s²) · drag = arrasto viscoso (por s)
export const SURF: Record<Surface, { fric: number; drag: number }> = {
  sidewalk:  { fric: 4.5,  drag: 0.15 },   // calçada: desliza muito
  chalk:     { fric: 5.0,  drag: 0.15 },   // giz ~ calçada
  cardboard: { fric: 8.0,  drag: 0.35 },   // papelão: médio
  dirt:      { fric: 9.5,  drag: 0.45 },   // terra: médio
  sand:      { fric: 17.0, drag: 0.9  },   // areia: bastante atrito
  grass:     { fric: 20.0, drag: 1.1  },   // mato: freia forte
  mud:       { fric: 30.0, drag: 1.8  },   // lama: quase para
  water:     { fric: 7.0,  drag: 0.5  },   // água rasa: escorrega + empurra
  ramp:      { fric: 6.0,  drag: 0.2  },   // rampa verde: dá impulso pra frente
  push:      { fric: 11.0, drag: 0.5  },   // seta vermelha: freia e empurra pra trás/lado
  out:       { fric: 24.0, drag: 1.0  },   // fora — reseta
};

// weight = massa (empurra/resiste em colisão) · slide = desliza mais longe
// stability = mantém a linha (roda menos) · bounce = quica em muro/tampinha
// control = para certinho onde mira · power = força do peteléco · grip = difícil de ser jogado pra fora
export type CapStats = { weight: number; slide: number; stability: number; bounce: number; control: number; power: number; grip: number };
export const DEFAULT_STATS: CapStats = { weight: 1, slide: 1, stability: 1, bounce: 1, control: 1, power: 1, grip: 1 };

export interface Cap {
  id: number;
  name: string;
  skin: string;              // id da tampinha (cor/estilo)
  isAI: boolean;
  ai?: string;               // personalidade
  stats: CapStats;
  radius: number;

  pos: V; vel: V;
  z: number; vz: number; airborne: boolean;   // salto de rampa (voo balístico)
  angle: number; angVel: number;   // giro visual
  bob: number;

  // estado de corrida
  progress: number;          // arco ao longo do traçado (ranking)
  checkpoint: number;        // índice do último checkpoint
  cpPos: V;
  turnStart: V;              // posição no início do turno (fora-da-pista volta aqui)
  preFlick: V;               // posição antes do peteléco atual
  resetTo: V;                // p/ onde volta se sair da pista neste peteléco
  consumed: Set<number>;     // índices de +3/10 já pegos neste turno
  flicksLeft: number;
  bonusFlicks: number;
  special10: boolean;        // (reservado)
  bombed: boolean;           // pisou numa bomba neste peteléco (perde a vez)
  holed: boolean;            // caiu num buraco (custa 1 peteléco a mais)
  skipTurns: number;
  finished: boolean;
  place: number;
  lap: number;
  moving: boolean;
  hitFlash: number;
}

export function makeCap(id: number, name: string, skin: string, stats: CapStats, isAI: boolean, ai?: string): Cap {
  return {
    id, name, skin, isAI, ai, stats: { ...stats }, radius: 0.82,
    pos: vec(), vel: vec(), z: 0, vz: 0, airborne: false, angle: Math.random() * 6.28, angVel: 0, bob: Math.random() * 6.28,
    progress: 0, checkpoint: 0, cpPos: vec(), turnStart: vec(), preFlick: vec(), resetTo: vec(), consumed: new Set(),
    flicksLeft: 3, bonusFlicks: 0, special10: false, bombed: false, holed: false, skipTurns: 0,
    finished: false, place: 0, lap: 0, moving: false, hitFlash: 0,
  };
}

export const REST_SPEED = 0.42;      // abaixo disso, considera parada
export const MAX_POWER = 27;         // velocidade máxima de um peteléco (u/s)
