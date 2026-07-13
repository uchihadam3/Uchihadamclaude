// Modelo de PISTA. A pista é um CORREDOR ao longo de um traçado (largada→chegada):
// dentro do corredor é dirigível; FORA do corredor é "fora da pista" (reseta).
// As bordas (walls) quicam onde existem — quanto menos bordas, mais fácil sair
// (é assim que a dificuldade é graduada). Remendos de superfície, obstáculos
// (pedra/buraco/bomba/bônus) e "pads" largos (largada, nós de atalho) completam.
import { V, Surface, vec, clamp } from './core';

export type ObsType = 'stone' | 'hole' | 'bomb' | 'bonus' | 'jump' | 'item' | 'top' | 'car' | 'band' | 'mill' | 'balloon';
export interface Obstacle {
  type: ObsType; x: number; y: number; r: number; n?: number; dir?: number;
  ph?: number;        // catavento: nº do giro (alterna o sentido)
  popped?: boolean;   // bexiga: já estourou?
}
// segmentos do elástico e do catavento (pás) — pro colisor e pro desenho
export function segsOf(o: Obstacle): { a: V; b: V }[] {
  const segs: { a: V; b: V }[] = [];
  if (o.type === 'band') {
    const dx = Math.cos(o.dir || 0) * o.r, dy = Math.sin(o.dir || 0) * o.r;
    segs.push({ a: vec(o.x - dx, o.y - dy), b: vec(o.x + dx, o.y + dy) });
  } else if (o.type === 'mill') {
    const nArm = o.n === 4 ? 2 : 1;      // 1 segmento = 2 pás; 2 segmentos = 4 pás
    for (let k = 0; k < nArm; k++) {
      const a2 = (o.dir || 0) + k * Math.PI / 2;
      const dx = Math.cos(a2) * o.r, dy = Math.sin(a2) * o.r;
      segs.push({ a: vec(o.x - dx, o.y - dy), b: vec(o.x + dx, o.y + dy) });
    }
  }
  return segs;
}
export interface Wall { a: V; b: V; }
export interface Patch { surface: Surface; x: number; y: number; r?: number; hw?: number; hh?: number; dir?: number; }
export interface Decor { kind: string; x: number; y: number; s?: number; rot?: number; c?: string; }

export interface TrackDef {
  id: number; name: string; theme: string; level: number;   // level 0..4
  w: number; h: number; ground: Surface; paint?: string; bg: string; wallCol: string;
  path: V[]; half: number[];      // meia-largura do corredor por ponto
  pads: { x: number; y: number; r: number }[];
  patches: Patch[]; walls: Wall[]; obstacles: Obstacle[];
  checkpoints: V[]; start: V; startAngle: number; finish: [V, V];
  battleHit?: number;        // BATALHA: quanto a trombada empurra nesta mesa (equilíbrio por atrito)
  decor: Decor[];
}

function segClosest(p: V, a: V, b: V): { d: number; t: number; cx: number; cy: number } {
  const abx = b.x - a.x, aby = b.y - a.y; const l2 = abx * abx + aby * aby || 1e-6;
  let t = clamp(((p.x - a.x) * abx + (p.y - a.y) * aby) / l2, 0, 1);
  const cx = a.x + abx * t, cy = a.y + aby * t;
  return { d: Math.hypot(p.x - cx, p.y - cy), t, cx, cy };
}
function segIntersect(p1: V, p2: V, p3: V, p4: V): boolean {
  const d = (b: V, a: V, c: V) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const d1 = d(p3, p4, p1), d2 = d(p3, p4, p2), d3 = d(p1, p2, p3), d4 = d(p1, p2, p4);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
}

export class TrackModel {
  def: TrackDef;
  wind = { x: 0, y: 0 };   // CLIMA: vento constante da corrida (u/s²) — 0 = calmaria
  capHitMul = 1;           // BATALHA: amortece a trombada tampinha-em-tampinha (mesa justa)
  private arcs: number[] = [0];
  total = 0;
  private cell = 5; private cols = 0; private rows = 0;
  private grid: number[][] = [];   // célula → índices de segmento próximos

  constructor(def: TrackDef) {
    this.def = def;
    let a = 0;
    for (let i = 1; i < def.path.length; i++) { a += Math.hypot(def.path[i].x - def.path[i - 1].x, def.path[i].y - def.path[i - 1].y); this.arcs.push(a); }
    this.total = a;
    // grade espacial para nearest() rápido em traçados longos
    this.cols = Math.ceil(def.w / this.cell) + 1; this.rows = Math.ceil(def.h / this.cell) + 1;
    this.grid = Array.from({ length: this.cols * this.rows }, () => [] as number[]);
    const R = Math.max(...def.half) + 2;
    for (let i = 1; i < def.path.length; i++) {
      const a2 = def.path[i - 1], b = def.path[i];
      const minx = Math.min(a2.x, b.x) - R, maxx = Math.max(a2.x, b.x) + R;
      const miny = Math.min(a2.y, b.y) - R, maxy = Math.max(a2.y, b.y) + R;
      for (let gy = Math.floor(miny / this.cell); gy <= Math.floor(maxy / this.cell); gy++)
        for (let gx = Math.floor(minx / this.cell); gx <= Math.floor(maxx / this.cell); gx++) {
          if (gx < 0 || gy < 0 || gx >= this.cols || gy >= this.rows) continue;
          this.grid[gy * this.cols + gx].push(i);
        }
    }
  }

  private halfAt(i: number, t: number): number { const h = this.def.half; return h[i - 1] * (1 - t) + h[Math.min(i, h.length - 1)] * t; }

  // ponto mais próximo do traçado (com meia-largura ali) — usa a grade
  nearest(p: V): { d: number; arc: number; half: number } {
    const gx = clamp(Math.floor(p.x / this.cell), 0, this.cols - 1), gy = clamp(Math.floor(p.y / this.cell), 0, this.rows - 1);
    let cand = this.grid[gy * this.cols + gx];
    let best = Infinity, arc = 0, half = this.def.half[0];
    const check = (list: number[]) => {
      for (const i of list) { const c = segClosest(p, this.def.path[i - 1], this.def.path[i]); if (c.d < best) { best = c.d; arc = this.arcs[i - 1] + c.t * (this.arcs[i] - this.arcs[i - 1]); half = this.halfAt(i, c.t); } }
    };
    check(cand);
    if (best === Infinity) { for (let i = 1; i < this.def.path.length; i++) { const c = segClosest(p, this.def.path[i - 1], this.def.path[i]); if (c.d < best) { best = c.d; arc = this.arcs[i - 1] + c.t * (this.arcs[i] - this.arcs[i - 1]); half = this.halfAt(i, c.t); } } }
    return { d: best, arc, half };
  }
  progressOf(p: V): number { return this.nearest(p).arc; }
  atArc(arc: number): { p: V; tan: V } {
    const path = this.def.path; arc = clamp(arc, 0, this.total);
    let i = 1; while (i < path.length - 1 && this.arcs[i] < arc) i++;
    const seg = this.arcs[i] - this.arcs[i - 1] || 1; const t = clamp((arc - this.arcs[i - 1]) / seg, 0, 1);
    const a = path[i - 1], b = path[i];
    return { p: vec(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t), tan: { x: (b.x - a.x) / seg, y: (b.y - a.y) / seg } };
  }

  inPad(p: V): boolean { for (const pd of this.def.pads) if ((p.x - pd.x) ** 2 + (p.y - pd.y) ** 2 <= pd.r * pd.r) return true; return false; }

  surfaceAt(p: V): Surface {
    if (p.x < 0 || p.y < 0 || p.x > this.def.w || p.y > this.def.h) return 'out';
    const n = this.nearest(p);
    const inCorr = n.d <= n.half || this.inPad(p);
    if (!inCorr) return 'out';
    let s = this.def.ground;
    for (const pt of this.def.patches) {
      if (pt.r != null) { if ((p.x - pt.x) ** 2 + (p.y - pt.y) ** 2 <= pt.r * pt.r) s = pt.surface; }
      else if (pt.hw != null && pt.hh != null) { if (Math.abs(p.x - pt.x) <= pt.hw && Math.abs(p.y - pt.y) <= pt.hh) s = pt.surface; }
    }
    return s;
  }
  patchAt(p: V): Patch | null {
    let r: Patch | null = null;
    for (const pt of this.def.patches) {
      if (pt.r != null) { if ((p.x - pt.x) ** 2 + (p.y - pt.y) ** 2 <= pt.r * pt.r) r = pt; }
      else if (pt.hw != null && pt.hh != null) { if (Math.abs(p.x - pt.x) <= pt.hw && Math.abs(p.y - pt.y) <= pt.hh) r = pt; }
    }
    return r;
  }

  collideWalls(pos: V, vel: V, radius: number, bounce: number): V | null {
    let hit: V | null = null;
    const react = (nx: number, ny: number, pen: number) => {
      pos.x += nx * pen; pos.y += ny * pen; const vn = vel.x * nx + vel.y * ny;
      if (vn < 0) { vel.x -= (1 + bounce) * vn * nx; vel.y -= (1 + bounce) * vn * ny; } hit = { x: nx, y: ny };
    };
    for (const w of this.def.walls) {
      const c = segClosest(pos, w.a, w.b);
      if (c.d < radius) { let nx = pos.x - c.cx, ny = pos.y - c.cy; const l = Math.hypot(nx, ny) || 1; react(nx / l, ny / l, radius - c.d + 0.01); }
    }
    return hit;
  }
  obstacleAt(pos: V, radius: number): Obstacle | null {
    for (const o of this.def.obstacles) { const rr = o.r + (o.type === 'stone' ? radius : radius * 0.5); if ((pos.x - o.x) ** 2 + (pos.y - o.y) ** 2 <= rr * rr) return o; }
    return null;
  }
  crossedFinish(prev: V, pos: V): boolean { return segIntersect(prev, pos, this.def.finish[0], this.def.finish[1]); }
}
