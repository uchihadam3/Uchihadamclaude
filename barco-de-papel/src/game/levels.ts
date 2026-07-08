// Definição das fases. Cada fase preenche a heightmap, marca nascente e destino,
// define orçamento de ferramentas e um tempo-par para as estrelas. Dificuldade
// e mecânicas crescem: canal simples → colina → evaporação → bambu → pedras → tudo.
import { Grid, N, CELL, WORLD } from '../sim/grid';

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
  // dunas roladas grandes + detalhe fino → relevo bonito sem bloquear o canal
  return (vnoise(x * 0.11 + 3, z * 0.11 + 7) - 0.5) * amp * 3.0
    + (vnoise(x * 0.28 + 5, z * 0.28 + 9) - 0.5) * amp * 1.4
    + (vnoise(x * 0.6, z * 0.6) - 0.5) * amp * 0.5;
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

const HIGH = 3.0, LOW = 0.9;
const slope = (from: number, to: number) => (x: number, z: number) => from + (to - from) * ((z + WORLD / 2) / WORLD);

export const LEVELS: LevelDef[] = [
  {
    id: 0, name: 'Primeiras Águas', hint: 'Cave com a Casca de Coco ligando a nascente (topo) ao destino. A água corre para baixo.',
    tools: { bambu: 0, pedras: 0, folha: 0 }, parSec: 30,
    build(g) {
      const base = (x, z) => 2.4 - ((z + 8) / 16) * 1.6 + dunes(x, z, 0.5);
      fill(g, hintChannel(base, [[-5, -6], [0, -1], [5, 6]], 2.2, 1.9, 0.5));
      markSource(g, -5, -6, 1.4);
      return { boat: [-5, -5.2], goal: [5, 6.2], goalR: 2.1 };
    },
  },
  {
    id: 1, name: 'A Colina', hint: 'Uma duna bloqueia o meio do caminho. Rebaixe o terreno para abrir passagem para a água.',
    tools: { bambu: 0, pedras: 0, folha: 0 }, parSec: 45,
    build(g) {
      const base = (x, z) => 2.4 - ((z + 8) / 16) * 1.4 + dunes(x, z, 0.42) + Math.max(0, 1.5 - Math.hypot(x, z) / 2.4);
      fill(g, hintChannel(base, [[-5, -6], [-3, -2]], 2.0, 1.9, 1.5));
      markSource(g, -5, -6, 1.3);
      return { boat: [-5, -5.2], goal: [5, 6.2], goalR: 2.1 };
    },
  },
  {
    id: 2, name: 'Sol a Pino', hint: 'Sol forte: a água evapora rápido. Ponha Folhas de Palmeira sobre o canal para dar sombra e a água não secar.',
    tools: { bambu: 0, pedras: 0, folha: 6 }, parSec: 55,
    build(g) {
      const base = (x, z) => 2.3 - ((z + 8) / 16) * 1.5 + dunes(x, z, 0.3);
      fill(g, hintChannel(base, [[-5, -6], [0, 0], [5, 6]], 2.2, 1.8, 0.5));
      for (let k = 0; k < N * N; k++) g.evap[k] = 0.28;   // sol castigante
      markSource(g, -5, -6, 1.4);
      return { boat: [-5, -5.2], goal: [5, 6.2], goalR: 2.1 };
    },
  },
  {
    id: 3, name: 'A Ponte de Bambu', hint: 'Um platô plano corta o caminho — a gravidade não basta. Pinte um canal de Bambu ligando os dois lados.',
    tools: { bambu: 20, pedras: 0, folha: 0 }, parSec: 65,
    build(g) {
      const base = (x, z) => { let h = 2.3 - ((z + 8) / 16) * 1.4 + dunes(x, z, 0.28); if (Math.abs(z) < 2.6) h = 1.75; return h; };
      fill(g, hintChannel(base, [[-5, -6], [-3, -3]], 2.0, 1.8, 1.4));
      markSource(g, -5, -6, 1.3);
      return { boat: [-5, -5.2], goal: [5, 6.2], goalR: 2.1 };
    },
  },
  {
    id: 4, name: 'Curva Perigosa', hint: 'A água desce forte rumo a uma curva com paredão. Pinte Pedras & Conchas para frear o barco antes do choque.',
    tools: { bambu: 0, pedras: 18, folha: 0 }, parSec: 70,
    build(g) {
      const base = (x, z) => { let h = 2.9 - ((z + 8) / 16) * 2.2 + dunes(x, z, 0.3); h += Math.max(0, 1.7 - Math.abs(x - 4.5) * 0.7) * (z > 1 ? 1 : 0); return h; };
      fill(g, hintChannel(base, [[-5, -6], [-2, -1], [2, 3], [-2, 6]], 2.1, 2.1, 0.6));
      markSource(g, -5, -6, 1.3);
      return { boat: [-5, -5.2], goal: [-3, 6.2], goalR: 2.2 };
    },
  },
  {
    id: 5, name: 'O Grande Oásis', hint: 'Tudo junto: colina, sol e uma curva. Molde o terreno e combine as ferramentas para levar o barco ao fim.',
    tools: { bambu: 14, pedras: 12, folha: 5 }, parSec: 90,
    build(g) {
      const base = (x, z) => { let h = 2.5 - ((z + 8) / 16) * 1.5 + dunes(x, z, 0.34) + Math.max(0, 1.2 - Math.hypot(x + 1, z + 1) / 2.4); h += Math.max(0, 1.4 - Math.abs(x - 4) * 0.6) * (z > 3 ? 1 : 0); return h; };
      fill(g, hintChannel(base, [[-5, -6], [-3, -4]], 2.0, 1.9, 1.6));
      for (let k = 0; k < N * N; k++) g.evap[k] = 0.14;
      markSource(g, -5, -6, 1.3);
      return { boat: [-5, -5.2], goal: [5, 6.2], goalR: 2.2 };
    },
  },
];
