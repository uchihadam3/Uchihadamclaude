// Modelo de PISTA: um tabuleiro (maquete) com chão-base, remendos de superfície
// (areia, lama, água, rampa, giz...), bordas que quicam (walls), obstáculos
// (pedra/buraco/bomba/+3/10), um traçado-guia (para ranking, checkpoints e IA)
// e linha de chegada. Tudo é dado; o render e a IA só consultam este modelo.
import { V, Surface, vec, sub, dot, clamp } from './core';

export type ObsType = 'stone' | 'hole' | 'bomb' | 'plus3' | 'ten';
export interface Obstacle { type: ObsType; x: number; y: number; r: number; }
export interface Wall { a: V; b: V; }
export interface Patch { surface: Surface; x: number; y: number; r?: number; hw?: number; hh?: number; dir?: number; }
export interface Decor { kind: string; x: number; y: number; s?: number; rot?: number; c?: string; }

export interface TrackDef {
  id: number; name: string; theme: string;
  w: number; h: number;
  ground: Surface;
  bg: string;             // cor do "fora"/mesa
  edgeBounce?: boolean;   // bordas do tabuleiro quicam? (senão = fora)
  patches: Patch[];
  walls: Wall[];
  obstacles: Obstacle[];
  path: V[];              // largada → chegada (guia)
  checkpoints: V[];       // respawn (índice 0 = largada)
  start: V; startAngle: number;
  finish: [V, V];         // linha de chegada
  decor: Decor[];
}

function segClosest(p: V, a: V, b: V): { d: number; t: number; cx: number; cy: number } {
  const abx = b.x - a.x, aby = b.y - a.y;
  const l2 = abx * abx + aby * aby || 1e-6;
  let t = ((p.x - a.x) * abx + (p.y - a.y) * aby) / l2;
  t = clamp(t, 0, 1);
  const cx = a.x + abx * t, cy = a.y + aby * t;
  return { d: Math.hypot(p.x - cx, p.y - cy), t, cx, cy };
}

export class TrackModel {
  def: TrackDef;
  private arcs: number[] = [];   // comprimento acumulado do traçado
  total = 0;

  constructor(def: TrackDef) {
    this.def = def;
    let a = 0; this.arcs = [0];
    for (let i = 1; i < def.path.length; i++) { a += Math.hypot(def.path[i].x - def.path[i - 1].x, def.path[i].y - def.path[i - 1].y); this.arcs.push(a); }
    this.total = a;
  }

  // superfície em um ponto: fora do tabuleiro/void = 'out'; senão o último
  // remendo que cobre o ponto; senão o chão-base.
  surfaceAt(p: V): Surface {
    const d = this.def;
    if (p.x < 0 || p.y < 0 || p.x > d.w || p.y > d.h) return 'out';
    let s = d.ground;
    for (const pt of d.patches) {
      if (pt.r != null) { if ((p.x - pt.x) ** 2 + (p.y - pt.y) ** 2 <= pt.r * pt.r) s = pt.surface; }
      else if (pt.hw != null && pt.hh != null) { if (Math.abs(p.x - pt.x) <= pt.hw && Math.abs(p.y - pt.y) <= pt.hh) s = pt.surface; }
    }
    return s;
  }
  // remendo (para direção de rampa/água)
  patchAt(p: V): Patch | null {
    let r: Patch | null = null;
    for (const pt of this.def.patches) {
      if (pt.r != null) { if ((p.x - pt.x) ** 2 + (p.y - pt.y) ** 2 <= pt.r * pt.r) r = pt; }
      else if (pt.hw != null && pt.hh != null) { if (Math.abs(p.x - pt.x) <= pt.hw && Math.abs(p.y - pt.y) <= pt.hh) r = pt; }
    }
    return r;
  }

  // progresso (arco) do ponto mais próximo no traçado — usado p/ ranking e IA
  progressOf(p: V): number {
    const path = this.def.path; let best = Infinity, bestArc = 0;
    for (let i = 1; i < path.length; i++) {
      const c = segClosest(p, path[i - 1], path[i]);
      if (c.d < best) { best = c.d; bestArc = this.arcs[i - 1] + c.t * (this.arcs[i] - this.arcs[i - 1]); }
    }
    return bestArc;
  }
  // ponto e tangente no traçado a um dado arco (IA / setas)
  atArc(arc: number): { p: V; tan: V } {
    const path = this.def.path; arc = clamp(arc, 0, this.total);
    let i = 1; while (i < path.length - 1 && this.arcs[i] < arc) i++;
    const seg = this.arcs[i] - this.arcs[i - 1] || 1; const t = clamp((arc - this.arcs[i - 1]) / seg, 0, 1);
    const a = path[i - 1], b = path[i];
    return { p: vec(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t), tan: { x: (b.x - a.x) / seg, y: (b.y - a.y) / seg } };
  }

  // colisão com bordas (segmentos) + opcionalmente bordas do tabuleiro.
  // devolve a normal do último impacto (para efeitos) ou null.
  collideWalls(pos: V, vel: V, radius: number, bounce: number): V | null {
    let hit: V | null = null;
    const react = (nx: number, ny: number, pen: number) => {
      pos.x += nx * pen; pos.y += ny * pen;
      const vn = vel.x * nx + vel.y * ny;
      if (vn < 0) { vel.x -= (1 + bounce) * vn * nx; vel.y -= (1 + bounce) * vn * ny; }
      hit = { x: nx, y: ny };
    };
    for (const w of this.def.walls) {
      const c = segClosest(pos, w.a, w.b);
      if (c.d < radius) {
        let nx = pos.x - c.cx, ny = pos.y - c.cy; const l = Math.hypot(nx, ny) || 1;
        nx /= l; ny /= l; react(nx, ny, radius - c.d + 0.01);
      }
    }
    if (this.def.edgeBounce) {
      const d = this.def;
      if (pos.x < radius) react(1, 0, radius - pos.x);
      if (pos.x > d.w - radius) react(-1, 0, radius - (d.w - pos.x));
      if (pos.y < radius) react(0, 1, radius - pos.y);
      if (pos.y > d.h - radius) react(0, -1, radius - (d.h - pos.y));
    }
    return hit;
  }

  // obstáculo tocado (pedra quica; os demais são gatilhos)
  obstacleAt(pos: V, radius: number): Obstacle | null {
    for (const o of this.def.obstacles) {
      const rr = o.r + (o.type === 'stone' ? radius : radius * 0.5);
      if ((pos.x - o.x) ** 2 + (pos.y - o.y) ** 2 <= rr * rr) return o;
    }
    return null;
  }

  // cruzou a linha de chegada? (checa se o segmento pos→prev intercepta a linha)
  crossedFinish(prev: V, pos: V): boolean {
    return segIntersect(prev, pos, this.def.finish[0], this.def.finish[1]);
  }
}

function segIntersect(p1: V, p2: V, p3: V, p4: V): boolean {
  const d = (b: V, a: V, c: V) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const d1 = d(p3, p4, p1), d2 = d(p3, p4, p2), d3 = d(p1, p2, p3), d4 = d(p1, p2, p4);
  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
}
