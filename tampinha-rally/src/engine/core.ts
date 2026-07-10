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
  | 'ramp' | 'push' | 'chalk' | 'grass' | 'ice' | 'out'
  | 'felt' | 'frost' | 'metal' | 'carpet' | 'gum' | 'magnet' | 'vortex';

// fric = desaceleração constante (u/s²) · drag = arrasto viscoso (por s)
// CADA superfície tem um efeito PRÓPRIO (não é só "freia mais/menos"):
//   areia  = freia forte e afunda o pesado
//   grama  = freia + PUXA PRO LADO (o mato desvia a tampinha — estável sofre menos)
//   lama   = prende (potência atravessa)
//   água   = CORRENTEZA empurra na direção do fluxo
//   gelo   = quase não para — escorrega demais (cuidado pra não passar do ponto)
export const SURF: Record<Surface, { fric: number; drag: number }> = {
  sidewalk:  { fric: 4.5,  drag: 0.15 },   // calçada: desliza muito
  chalk:     { fric: 5.0,  drag: 0.15 },   // giz ~ calçada
  ice:       { fric: 2.2,  drag: 0.05 },   // GELO: quase sem atrito, vai embora
  cardboard: { fric: 8.0,  drag: 0.35 },   // papelão: médio
  dirt:      { fric: 9.5,  drag: 0.45 },   // terra: médio
  sand:      { fric: 17.0, drag: 0.9  },   // areia: bastante atrito
  grass:     { fric: 19.0, drag: 1.0  },   // mato: freia + desvia (ver physics)
  mud:       { fric: 30.0, drag: 1.8  },   // lama: quase para
  water:     { fric: 7.0,  drag: 0.5  },   // água rasa: escorrega + correnteza
  ramp:      { fric: 6.0,  drag: 0.2  },   // rampa verde: dá impulso pra frente
  push:      { fric: 11.0, drag: 0.5  },   // seta vermelha: freia e empurra pra trás/lado
  out:       { fric: 24.0, drag: 1.0  },   // fora — reseta
  // ---- pisos NOVOS (cada um com um efeito PRÓPRIO, ver physics.ts) ----
  felt:      { fric: 6.0,  drag: 0.22 },   // FELTRO (sinuca): rola liso E as bordas viram TABELA VIVA (quique forte)
  frost:     { fric: 3.2,  drag: 0.08 },   // ESCARCHA (congelador): desliza quase como gelo e DERRAPA (freio do Controle não pega)
  metal:     { fric: 5.2,  drag: 0.16 },   // AÇO (bancada): desliza bem e quica FORTE em muro/pedra (pinball)
  carpet:    { fric: 12.0, drag: 0.75 },   // TAPETE felpudo: freia e AMORTECE o quique nas tábuas (tabelinha morre)
  gum:       { fric: 32.0, drag: 2.0  },   // CHICLETE: gruda rapidinho — e o peteleco SAINDO dele sai fraco (mas escapa!)
  magnet:    { fric: 6.5,  drag: 0.2  },   // ÍMÃ: PUXA a tampinha (de metal!) pro centro — curva o tiro, captura o fraco
  vortex:    { fric: 6.0,  drag: 0.2  },   // REDEMOINHO: GIRA a trajetória enquanto está dentro (o tiro faz curva)
};
// quanto o peteleco perde saindo de cima do chiclete (a tampinha está grudada)
export const GUM_LAUNCH = 0.55;

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
  consumed: Set<number>;     // índices de caixas/bônus já pegos neste turno
  takenBonus: Set<number>;   // bônus +1/+2/+3 pegos NA CORRIDA TODA — não repete
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

  lastTurnProg: number;      // progresso no começo do turno anterior (detector de preso)
  stuckTurns: number;        // turnos seguidos sem avançar → IA liga o "modo destravar"
  rescues: number;           // resgates SEM progresso real desde então (escalona a distância)
  rescueProg: number;        // progresso na hora do último resgate (mede se andou de verdade)

  // ---- extras dos MODOS (não usados no jogo comum) ----
  team: number;              // Dupla: índice do time (-1 = sem time)
  item: string | null;       // Caos: power-up guardado (1 slot)
  shield: boolean;           // Caos: escudo ativo — anula 1 buraco/fora
  boostNext: number;         // Caos: multiplicador do próximo peteléco (1 = normal)
  eliminated: boolean;       // Eliminação: já saiu da série
  itemFlash: number;         // brilho visual ao pegar/usar item
}

export function makeCap(id: number, name: string, skin: string, stats: CapStats, isAI: boolean, ai?: string): Cap {
  return {
    id, name, skin, isAI, ai, stats: { ...stats }, radius: 0.82,
    pos: vec(), vel: vec(), z: 0, vz: 0, airborne: false, angle: Math.random() * 6.28, angVel: 0, bob: Math.random() * 6.28,
    progress: 0, checkpoint: 0, cpPos: vec(), turnStart: vec(), preFlick: vec(), resetTo: vec(), consumed: new Set(), takenBonus: new Set(),
    flicksLeft: 3, bonusFlicks: 0, special10: false, bombed: false, holed: false, skipTurns: 0,
    finished: false, place: 0, lap: 0, moving: false, hitFlash: 0,
    lastTurnProg: 0, stuckTurns: 0, rescues: 0, rescueProg: 0,
    team: -1, item: null, shield: false, boostNext: 1, eliminated: false, itemFlash: 0,
  };
}

export const REST_SPEED = 0.42;      // abaixo disso, considera parada
export const MAX_POWER = 27;         // velocidade máxima de um peteléco (u/s)
