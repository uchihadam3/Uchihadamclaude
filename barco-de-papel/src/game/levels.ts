// Definição das fases. Cada fase preenche a heightmap, marca nascente e destino,
// define orçamento de ferramentas e um tempo-par para as estrelas. Dificuldade
// e mecânicas crescem: canal simples → colina → evaporação → bambu → pedras → tudo.
// A nascente e a chegada ficam em PONTAS OPOSTAS do oásis: a travessia cruza
// quase todo o mapa, de canto a canto.
import { Grid, N, WORLD, SOLID_STONE } from '../sim/grid';

export interface LevelGoal { boat: [number, number]; goal: [number, number]; goalR: number; }
export interface LevelDef {
  id: number; name: string; hint: string;
  tools: { bambu: number; pedras: number; folha: number };
  parSec: number;
  build(g: Grid): LevelGoal;
}

// ruído de valor determinístico p/ dunas
function h2(i: number, j: number): number { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5; return s - Math.floor(s); }
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function dunes(x: number, z: number, amp = 0.42): number {
  // dunas roladas grandes + médias + detalhe fino → relevo bonito e dramático
  // (fica FORA do canal, então enriquece o visual e ainda contém melhor a água).
  return (vnoise(x * 0.09 + 3, z * 0.09 + 7) - 0.5) * amp * 4.2
    + (vnoise(x * 0.2 + 5, z * 0.2 + 9) - 0.5) * amp * 2.0
    + (vnoise(x * 0.44 + 1, z * 0.44 + 2) - 0.5) * amp * 0.9
    + (vnoise(x * 0.9, z * 0.9) - 0.5) * amp * 0.35;
}

// base que desce ao longo de Z (norte→sul): alto na nascente, baixo na chegada.
function descend(hi: number, lo: number): (x: number, z: number) => number {
  return (_x, z) => hi - ((z + WORLD / 2) / WORLD) * (hi - lo);
}

// helpers de escrita no grid
function fill(g: Grid, fn: (x: number, z: number) => number): void {
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const [x, z] = g.cellToWorld(i, j); g.terrain[g.idx(i, j)] = fn(x, z);
  }
}
function markSource(g: Grid, x: number, z: number, r = 1.2): void {
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const [wx, wz] = g.cellToWorld(i, j);
    if (Math.hypot(wx - x, wz - z) <= r) g.source[g.idx(i, j)] = 1;
  }
}
// vale-guia com FUNDO liso e descendente (startH→endH): garante um conduto
// água-abaixo, mesmo com dunas ao redor. O jogador aprofunda/estende conforme
// precisa; fora do canal ficam as dunas.
function hintChannel(base: (x: number, z: number) => number, pts: [number, number][], w: number, startH: number, endH: number) {
  const segN = pts.length - 1;
  return (x: number, z: number) => {
    let m = 0, gt = 0;
    for (let s = 0; s < segN; s++) {
      const [ax, az] = pts[s], [bx, bz] = pts[s + 1];
      const dx = bx - ax, dz = bz - az, L2 = dx * dx + dz * dz || 1;
      let t = ((x - ax) * dx + (z - az) * dz) / L2; t = Math.max(0, Math.min(1, t));
      const px = ax + dx * t, pz = az + dz * t;
      const d = Math.hypot(x - px, z - pz);
      const mm = Math.max(0, 1 - d / w);
      if (mm > m) { m = mm; gt = (s + t) / segN; }
    }
    const floor = startH + (endH - startH) * gt;   // rampa descendente lisa
    const b = base(x, z);
    return b * (1 - m) + Math.min(b, floor) * m;    // funde ao fundo do canal
  };
}

// aplica uma função sobre TODO o terreno já esculpido (para carimbar obstáculos
// POR CIMA do canal — colina, platô, paredão — que o jogador precisa resolver).
function stamp(g: Grid, fn: (x: number, z: number, h: number) => number): void {
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const [x, z] = g.cellToWorld(i, j); const k = g.idx(i, j); g.terrain[k] = fn(x, z, g.terrain[k]);
  }
}

// Pontas do oásis: nascente no canto "norte-oeste", chegada no canto "sul-leste".
const SRC: [number, number] = [-11, -11.5];
const GOAL: [number, number] = [11, 11.5];
const START: [number, number] = [-11, -10.2];
// traçado-base do canal, de canto a canto (pode ser refinado por fase)
const PATH: [number, number][] = [[-11, -11.5], [-4, -3], [4, 3], [11, 11.5]];

export const LEVELS: LevelDef[] = [
  {
    id: 0, name: 'Primeiras Águas', hint: 'Cave com a Casca de Coco ligando a nascente (uma ponta) ao destino (a ponta oposta). A água corre para baixo.',
    tools: { bambu: 0, pedras: 0, folha: 0 }, parSec: 48,
    build(g) {
      const d = descend(2.5, 1.6);   // planalto quase plano: o canal faz a descida
      const base = (x: number, z: number) => d(x, z) + dunes(x, z, 0.5);
      fill(g, hintChannel(base, PATH, 2.4, 1.8, 0.2));
      markSource(g, SRC[0], SRC[1], 1.5);
      return { boat: START, goal: GOAL, goalR: 2.9 };
    },
  },
  {
    id: 1, name: 'A Colina', hint: 'Uma grande duna soterra o meio do canal. Rebaixe-a com a Casca de Coco (modo Cavar) para reabrir a passagem da água até a outra ponta.',
    tools: { bambu: 0, pedras: 0, folha: 0 }, parSec: 62,
    build(g) {
      const d = descend(2.5, 1.7);
      const base = (x: number, z: number) => d(x, z) + dunes(x, z, 0.42);
      fill(g, hintChannel(base, PATH, 2.4, 1.8, 0.25));
      // colina carimbada POR CIMA do canal, no meio — barra a água até ser cavada
      stamp(g, (x, z, h) => h + Math.max(0, 1.3 - Math.hypot(x, z) / 1.5));
      markSource(g, SRC[0], SRC[1], 1.5);
      return { boat: START, goal: GOAL, goalR: 2.9 };
    },
  },
  {
    id: 2, name: 'Sol a Pino', hint: 'Sol forte na travessia inteira: a água evapora antes de chegar. Ponha Folhas de Palmeira ao longo do canal para dar sombra e a água sobreviver até a ponta.',
    tools: { bambu: 0, pedras: 0, folha: 16 }, parSec: 76,
    build(g) {
      const d = descend(2.5, 1.6);
      const base = (x: number, z: number) => d(x, z) + dunes(x, z, 0.3);
      fill(g, hintChannel(base, PATH, 2.3, 1.8, 0.2));
      for (let k = 0; k < N * N; k++) g.evap[k] = 0.13;   // sol castigante (mas vencível com sombra)
      markSource(g, SRC[0], SRC[1], 1.5);
      return { boat: START, goal: GOAL, goalR: 2.9 };
    },
  },
  {
    id: 3, name: 'A Ponte de Bambu', hint: 'Uma represa de PEDRA barra o canal — a Casca de Coco não escava pedra. Pinte uma calha de Bambu atravessando a represa: ela corta a rocha e conduz a água ao outro lado.',
    tools: { bambu: 30, pedras: 0, folha: 0 }, parSec: 78,
    build(g) {
      const d = descend(2.5, 1.6);
      const base = (x: number, z: number) => d(x, z) + dunes(x, z, 0.28);
      fill(g, hintChannel(base, PATH, 2.3, 1.8, 0.2));
      // represa de PEDRA cruzando o canal no meio (perpendicular ao traçado).
      // Coco não escava pedra → só o Bambu (que corta e conduz) abre passagem.
      stamp(g, (x, z, h) => {
        const along = 0.8 * x + 0.6 * z;                       // eixo do canal em (0,0)
        if (Math.abs(along) < 0.85 && Math.hypot(x, z) < 2.6) {
          const [i, j] = g.worldToCell(x, z); g.solid[g.idx(i, j)] = SOLID_STONE;
          return h + 0.7;                                       // paredão de rocha
        }
        return h;
      });
      markSource(g, SRC[0], SRC[1], 1.5);
      return { boat: START, goal: GOAL, goalR: 2.9 };
    },
  },
  {
    id: 4, name: 'Curva Perigosa', hint: 'A água desce forte e faz uma curva rente a um paredão. Pinte Pedras & Conchas na curva para frear o barco e amortecer o choque, a caminho da ponta final.',
    tools: { bambu: 0, pedras: 28, folha: 0 }, parSec: 88,
    build(g) {
      const d = descend(3.0, 0.6);   // descida acentuada → barco veloz
      const base = (x: number, z: number) => d(x, z) + dunes(x, z, 0.3);
      const curve: [number, number][] = [[-11, -11.5], [-3, -4], [6, 2], [11, 11.5]];
      fill(g, hintChannel(base, curve, 2.1, 2.1, 0.2));
      // paredão logo depois da curva (fora do canal) — ameaça o barco veloz
      stamp(g, (x, z, h) => h + Math.max(0, 2.4 - Math.hypot(x - 9.6, z - 3.4)));
      markSource(g, SRC[0], SRC[1], 1.5);
      return { boat: START, goal: GOAL, goalR: 2.9 };
    },
  },
  {
    id: 5, name: 'O Grande Oásis', hint: 'Tudo junto: colina, sol e uma curva, de ponta a ponta. Cave a colina, dê sombra contra o sol e freie na curva. Combine as ferramentas e leve o barco até o fim.',
    tools: { bambu: 10, pedras: 16, folha: 12 }, parSec: 115,
    build(g) {
      const d = descend(2.7, 1.2);
      const base = (x: number, z: number) => d(x, z) + dunes(x, z, 0.34);
      const curve: [number, number][] = [[-11, -11.5], [-4, -4], [5, 2], [11, 11.5]];
      fill(g, hintChannel(base, curve, 2.2, 1.8, 0.2));
      stamp(g, (x, z, h) => {
        h += Math.max(0, 1.15 - Math.hypot(x + 2, z + 2) / 1.5);       // colina inicial
        h += Math.max(0, 2.0 - Math.hypot(x - 9.2, z - 3.2));          // paredão da curva
        return h;
      });
      for (let k = 0; k < N * N; k++) g.evap[k] = 0.09;                // sol médio
      markSource(g, SRC[0], SRC[1], 1.5);
      return { boat: START, goal: GOAL, goalR: 2.9 };
    },
  },
];
