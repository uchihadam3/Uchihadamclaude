// GERADOR DE PISTAS — o coração do jogo. Cada pista nasce de uma semente
// determinística e de UMA FAMÍLIA DE FORMATO diferente (onda fluida, serpentina
// de pernas curvas, espiral pra dentro/pra fora), com orientação e parâmetros
// sorteados — então nenhuma pista é igual à outra, cada uma tem suas curvas
// próprias. A dificuldade vem da PROTEÇÃO (fração de muro): fácil quase todo
// murado; extrema quase sem muro (cai fácil pra fora do corredor).
import { V, vec, Surface, clamp } from '../engine/core';
import { TrackDef, Wall, Patch, Obstacle, Decor } from '../engine/track';

// ---- RNG determinístico ----
function mulberry(seed: number) { return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export const LEVELS = ['Fácil', 'Médio', 'Difícil', 'Muito Difícil', 'Extrema'];
export const LEVEL_COLORS = ['#3fae6a', '#3b82f6', '#f2b100', '#e5762a', '#e5484d'];

interface Theme {
  key: string; ground: Surface; bg: string; wall: string;
  patch: Surface[]; decor: string[]; names: string[];
}
const THEMES: Theme[] = [
  { key: 'quintal', ground: 'dirt', bg: '#6f5334', wall: '#6b4e2e', patch: ['sand', 'mud', 'grass'], decor: ['twig', 'leaf', 'pebble', 'grass'], names: ['Quintal do Zé', 'Terra Batida', 'Fundo de Quintal', 'Chão de Terra'] },
  { key: 'praia', ground: 'sand', bg: '#d9b877', wall: '#c9a35f', patch: ['water', 'ramp', 'cardboard'], decor: ['shell', 'starfish', 'castle', 'pebble'], names: ['Praia da Tarde', 'Areia Fofa', 'Beira-Mar', 'Duna do Sol'] },
  { key: 'calcada', ground: 'sidewalk', bg: '#9a9488', wall: '#8f8879', patch: ['chalk', 'cardboard'], decor: ['chalk', 'toy', 'pebble'], names: ['Calçada de Giz', 'Rua de Baixo', 'Passeio', 'Meio-Fio'] },
  { key: 'garagem', ground: 'cardboard', bg: '#7d6a4e', wall: '#a9773f', patch: ['sidewalk', 'sand'], decor: ['box', 'tape', 'pencil'], names: ['Garagem', 'Papelão & Fita', 'Depósito', 'Oficina'] },
  { key: 'parquinho', ground: 'dirt', bg: '#4f5b3a', wall: '#5c4a2c', patch: ['mud', 'water', 'grass'], decor: ['leaf', 'grass', 'pebble'], names: ['Parquinho Molhado', 'Lamaçal', 'Depois da Chuva', 'Poça & Folha'] },
  { key: 'cozinha', ground: 'cardboard', bg: '#c8b48c', wall: '#c05a5a', patch: ['sidewalk', 'water'], decor: ['cup', 'coin', 'eraser', 'straw'], names: ['Mesa da Cozinha', 'Hora do Café', 'Toalha Xadrez', 'Bancada'] },
  { key: 'jardim', ground: 'dirt', bg: '#3f5a2e', wall: '#5a7a3a', patch: ['grass', 'mud', 'sand'], decor: ['grass', 'leaf', 'twig', 'pebble'], names: ['Jardim da Vó', 'Canteiro', 'Grama & Terra', 'Horta'] },
  { key: 'deserto', ground: 'sand', bg: '#c98f4a', wall: '#a6702f', patch: ['ramp', 'ramp', 'water'], decor: ['pebble', 'twig', 'starfish'], names: ['Deserto', 'Dunas', 'Sol a Pino', 'Areião'] },
  { key: 'obra', ground: 'dirt', bg: '#6a6152', wall: '#8a8070', patch: ['cardboard', 'sand'], decor: ['box', 'pencil', 'pebble'], names: ['Canteiro de Obra', 'Entulho', 'Cimento', 'Andaime'] },
  { key: 'laje', ground: 'sidewalk', bg: '#8f9aa0', wall: '#7a848a', patch: ['cardboard', 'chalk'], decor: ['toy', 'pebble', 'tape'], names: ['Laje', 'Terraço', 'Cobertura', 'Varal'] },
  { key: 'piscina', ground: 'sidewalk', bg: '#4a90b8', wall: '#cfe4ee', patch: ['water', 'water', 'chalk'], decor: ['pebble', 'coin', 'toy'], names: ['Borda da Piscina', 'Deck Molhado', 'Área de Lazer', 'Prainha'] },
  { key: 'feira', ground: 'cardboard', bg: '#a88f5c', wall: '#8a6238', patch: ['sidewalk', 'chalk'], decor: ['box', 'coin', 'tape', 'cup'], names: ['Feira Livre', 'Barraca', 'Calçadão', 'Mercadão'] },
  { key: 'estrada', ground: 'dirt', bg: '#5c4a30', wall: '#4a3a24', patch: ['mud', 'sand', 'grass'], decor: ['pebble', 'twig', 'grass'], names: ['Estrada de Barro', 'Trilha', 'Rua sem Asfalto', 'Beira da Roça'] },
  { key: 'varanda', ground: 'cardboard', bg: '#8a6a44', wall: '#6b4e2e', patch: ['sidewalk', 'water'], decor: ['cup', 'coin', 'leaf', 'pencil'], names: ['Varanda', 'Área Coberta', 'Quintalzinho', 'Alpendre'] },
];

const tangentAt = (path: V[], i: number): V => { const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)]; const dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1; return { x: dx / l, y: dy / l }; };
const normalAt = (path: V[], i: number): V => { const t = tangentAt(path, i); return { x: -t.y, y: t.x }; };
const arcLenOf = (pts: V[]): number => { let a = 0; for (let i = 1; i < pts.length; i++) a += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); return a; };
const rotatePts = (pts: V[], ang: number): void => { const c = Math.cos(ang), s = Math.sin(ang); for (const p of pts) { const x = p.x * c - p.y * s, y = p.x * s + p.y * c; p.x = x; p.y = y; } };

// parâmetros por nível. Dificuldade = PROTEÇÃO (open) — a largura do corredor é
// quase constante; só a cobertura de muro cai (fácil murado → extrema sem muro).
const LV = [
  { half: 4.3, open: 0.05, len: 330, holes: [1, 2], bombs: [0, 1], stones: [2, 4], bonus: [2, 3], ramps: [1, 2] },
  { half: 4.1, open: 0.24, len: 420, holes: [2, 3], bombs: [0, 1], stones: [3, 5], bonus: [2, 4], ramps: [1, 3] },
  { half: 4.0, open: 0.50, len: 510, holes: [2, 4], bombs: [1, 2], stones: [3, 6], bonus: [2, 4], ramps: [2, 3] },
  { half: 3.9, open: 0.72, len: 600, holes: [3, 5], bombs: [1, 2], stones: [4, 6], bonus: [2, 3], ramps: [2, 4] },
  { half: 3.8, open: 0.90, len: 690, holes: [3, 6], bombs: [1, 2], stones: [4, 7], bonus: [1, 3], ramps: [2, 4] },
];

type RF = (a: number, b: number) => number;
type RI = (a: number, b: number) => number;

// CIRCUITO ALEATÓRIO — um traçado tipo pista de Fórmula 1: uma volta que serpenteia
// pra qualquer lado (curvas pra esquerda E pra direita, retas, grampos), única a cada
// semente. Definido por um RAIO que varia por setor ao redor de um centro: os lóbulos
// (raio grande) curvam pra um lado e os vales (raio pequeno) pro outro — dá S, chicanes
// e grampos. Como o raio é função única do ângulo, a volta NUNCA se cruza. Pega-se um
// arco quase completo (deixa um vão entre largada e chegada) e escala pro comprimento.
function shapeCircuit(rng: () => number, rf: RF, ri: RI, targetLen: number, half0: number): V[] {
  const M = ri(7, 14);                       // número de setores → mais setores, mais curvas
  const spike = rf(0.18, 0.46);              // o quanto o raio varia (0 = círculo, alto = bem sinuoso)
  const ax = rf(0.8, 1.4), ay = rf(0.8, 1.4);// aspecto (alonga a volta em x/y)
  const span = rf(0.78, 0.92);               // fração da volta (deixa um vão largada↔chegada bem separado)
  const a0 = rng() * 6.283;                  // onde começa / rotação
  const radii: number[] = [];
  for (let i = 0; i < M; i++) radii.push(1 + (rng() * 2 - 1) * spike);
  const rAt = (ang: number): number => {     // raio suave (Catmull periódico entre setores)
    let x = (ang / (2 * Math.PI)) * M; x = ((x % M) + M) % M;
    const i0 = Math.floor(x), t = x - i0;
    const a = radii[(i0 - 1 + M) % M], b = radii[i0 % M], c = radii[(i0 + 1) % M], d = radii[(i0 + 2) % M];
    const r = 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    return Math.max(0.35, r);
  };
  const R = 60, samples = Math.max(200, Math.round(targetLen / 2.2)), arc = span * 2 * Math.PI;
  const pts: V[] = [];
  for (let s = 0; s <= samples; s++) { const ang = a0 + (s / samples) * arc; const r = rAt(ang) * R; pts.push(vec(ax * r * Math.cos(ang), ay * r * Math.sin(ang))); }
  const sc = targetLen / arcLenOf(pts);
  for (const p of pts) { p.x *= sc; p.y *= sc; }
  return pts;
}

export function genTrack(id: number, level: number, idxInLevel: number): TrackDef {
  const rng = mulberry(id * 7919 + level * 131 + idxInLevel * 17 + 1);
  const ri = (a: number, b: number) => Math.floor(a + rng() * (b - a + 1));
  const rf = (a: number, b: number) => a + rng() * (b - a);
  const theme = THEMES[(idxInLevel * 3 + level * 7 + id) % THEMES.length];
  const p = LV[level];

  const half0 = p.half * rf(0.92, 1.08);
  const targetLen = p.len * rf(0.9, 1.1);

  // cada pista é um circuito aleatório único (curvas pra todo lado, estilo F1)
  const pts = shapeCircuit(rng, rf, ri, targetLen, half0);
  rotatePts(pts, rng() * 6.283);
  // enquadra na mesa com margem
  const m = half0 + 5;
  let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
  for (const q of pts) { if (q.x < minx) minx = q.x; if (q.y < miny) miny = q.y; if (q.x > maxx) maxx = q.x; if (q.y > maxy) maxy = q.y; }
  for (const q of pts) { q.x += m - minx; q.y += m - miny; }
  const w = Math.ceil(maxx - minx + 2 * m), h = Math.ceil(maxy - miny + 2 * m);
  const path = pts;
  const N = path.length;

  // arcos acumulados
  const arcs = [0]; let acc = 0;
  for (let i = 1; i < N; i++) { acc += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y); arcs.push(acc); }
  const total = acc;
  const atArc = (a: number): { p: V; i: number } => { let i = 1; while (i < N - 1 && arcs[i] < a) i++; const seg = arcs[i] - arcs[i - 1] || 1; const t = (a - arcs[i - 1]) / seg; return { p: vec(path[i - 1].x + (path[i].x - path[i - 1].x) * t, path[i - 1].y + (path[i].y - path[i - 1].y) * t), i }; };
  const onPath = (a: number, off = 0): V => { const { p: pp, i } = atArc(a); const n = normalAt(path, i); return vec(pp.x + n.x * off, pp.y + n.y * off); };

  // curvatura por ponto (0 reta … 1 curva fechada), suavizada
  const curv: number[] = new Array(N).fill(0);
  for (let i = 1; i < N - 1; i++) {
    const t1 = tangentAt(path, i - 1), t2 = tangentAt(path, i + 1);
    let dp = t1.x * t2.x + t1.y * t2.y; dp = dp < -1 ? -1 : dp > 1 ? 1 : dp;
    const ds = (arcs[Math.min(N - 1, i + 1)] - arcs[Math.max(0, i - 1)]) || 1;
    curv[i] = clamp((Math.acos(dp) / ds) / 0.22, 0, 1);
  }
  const curvS: number[] = new Array(N).fill(0);
  for (let i = 0; i < N; i++) { let s = 0, n = 0; for (let k = -3; k <= 3; k++) { const j = i + k; if (j >= 0 && j < N) { s += curv[j]; n++; } } curvS[i] = s / n; }

  // meia-largura por ponto (mais larga na largada/chegada E nas curvas — dá espaço p/ girar)
  const halfArr: number[] = [];
  for (let i = 0; i < N; i++) {
    let hw = half0 + Math.sin(arcs[i] * 0.05) * 0.3;
    if (arcs[i] < 10) hw = Math.max(hw, half0 + 2.0 * (1 - arcs[i] / 10));
    if (total - arcs[i] < 8) hw += 0.9;
    hw *= 1 + 0.45 * curvS[i];                             // alarga nas curvas (espaço p/ manobrar)
    halfArr.push(hw);
  }

  // bordas (proteção) — a proteção se CONCENTRA nas curvas; as retas é que ficam
  // abertas (perigosas) nos níveis difíceis. Largada/chegada sempre muradas.
  const walls: Wall[] = [];
  const step = 3;
  const near = (a: number) => a < 10 || total - a < 9;
  for (let i = step; i < N; i += step) {
    const j = i - step;
    const openP = p.open * (1 - 0.85 * curvS[i]);          // curva fechada → quase sempre com muro
    if (rng() < openP && !near(arcs[i])) continue;
    const nj = normalAt(path, j), ni = normalAt(path, i);
    walls.push({ a: vec(path[j].x + nj.x * halfArr[j], path[j].y + nj.y * halfArr[j]), b: vec(path[i].x + ni.x * halfArr[i], path[i].y + ni.y * halfArr[i]) });
    walls.push({ a: vec(path[j].x - nj.x * halfArr[j], path[j].y - nj.y * halfArr[j]), b: vec(path[i].x - ni.x * halfArr[i], path[i].y - ni.y * halfArr[i]) });
  }

  const obstacles: Obstacle[] = [];
  const patches: Patch[] = [];
  const decor: Decor[] = [];
  const checkpoints: V[] = [vec(path[0].x, path[0].y)];
  const pads: { x: number; y: number; r: number }[] = [];

  // largada larga (para as tampinhas saírem certinho da linha)
  pads.push({ x: path[0].x, y: path[0].y, r: half0 + 2.8 });

  const nCP = ri(4, 7);
  for (let k = 1; k <= nCP; k++) checkpoints.push(onPath(total * k / (nCP + 1)));

  // rampas (impulso / "elevação")
  const nRamp = ri(p.ramps[0], p.ramps[1]);
  for (let k = 0; k < nRamp; k++) { const a = rf(0.15, 0.85) * total; const { p: pp, i } = atArc(a); const t = tangentAt(path, i); patches.push({ surface: 'ramp', x: pp.x, y: pp.y, r: half0 * 0.9, dir: Math.atan2(t.y, t.x) }); }
  // poças/areia/lama temáticas
  for (let k = 0; k < ri(2, 4); k++) { const a = rf(0.1, 0.9) * total; const pp = onPath(a, rf(-half0 * 0.4, half0 * 0.4)); const sfc = theme.patch[ri(0, theme.patch.length - 1)]; const { i } = atArc(a); const t = tangentAt(path, i); patches.push({ surface: sfc, x: pp.x, y: pp.y, r: half0 * rf(0.7, 1.05), dir: sfc === 'water' ? Math.atan2(t.y, t.x) + rf(-0.6, 0.6) : undefined }); }

  // buracos, bombas, pedras, bônus (espaçados)
  const usedArcs: number[] = [];
  const spaced = (a: number) => usedArcs.every(u => Math.abs(u - a) > 14);
  const placeAt = (a: number, off: number, make: (pp: V) => void) => { const pp = onPath(a, off); make(pp); usedArcs.push(a); };
  for (let k = 0, tries = 0; k < ri(p.holes[0], p.holes[1]) && tries < 40; tries++) { const a = rf(0.14, 0.9) * total; if (!spaced(a)) continue; placeAt(a, rf(-half0 * 0.5, half0 * 0.5), pp => obstacles.push({ type: 'hole', x: pp.x, y: pp.y, r: rf(1.0, 1.4) })); k++; }
  for (let k = 0, tries = 0; k < ri(p.bombs[0], p.bombs[1]) && tries < 30; tries++) { const a = rf(0.2, 0.85) * total; if (!spaced(a)) continue; placeAt(a, rf(-half0 * 0.4, half0 * 0.4), pp => obstacles.push({ type: 'bomb', x: pp.x, y: pp.y, r: 0.95 })); k++; }
  for (let k = 0; k < ri(p.stones[0], p.stones[1]); k++) { const a = rf(0.1, 0.92) * total; const off = (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.3, half0 * 0.75); const pp = onPath(a, off); obstacles.push({ type: 'stone', x: pp.x, y: pp.y, r: rf(0.7, 1.2) }); }
  for (let k = 0, tries = 0; k < ri(p.bonus[0], p.bonus[1]) && tries < 30; tries++) { const a = rf(0.15, 0.9) * total; if (!spaced(a)) continue; const roll = rng(); const n = roll > 0.94 ? 3 : roll > 0.72 ? 2 : 1; placeAt(a, (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.2, half0 * 0.7), pp => obstacles.push({ type: 'bonus', x: pp.x, y: pp.y, r: 1.1, n })); k++; }

  // ATALHO arriscado (nível médio+): acha dois pontos do traçado perto no espaço
  // mas longe no arco (onde a pista quase encosta em si mesma) e liga com um pad,
  // guardado por um buraco. Funciona pra qualquer formato.
  if (level >= 1 && rng() < 0.55) {
    let iA = -1, iB = -1, bd = 1e9;
    for (let i = 0; i < N; i += 4) for (let j = i + 1; j < N; j += 4) {
      const gap = arcs[j] - arcs[i];
      if (gap < total * 0.16 || gap > total * 0.6) continue;          // corta um lóbulo interno, não o vão largada/chegada
      if (arcs[i] < total * 0.12 || arcs[j] > total * 0.88) continue; // longe da largada e da chegada
      const d = Math.hypot(path[i].x - path[j].x, path[i].y - path[j].y);
      if (d < bd) { bd = d; iA = i; iB = j; }
    }
    if (iA >= 0 && bd > 2 * half0 + 1 && bd < 2 * half0 + 16) {
      const mx = (path[iA].x + path[iB].x) / 2, my = (path[iA].y + path[iB].y) / 2;
      pads.push({ x: mx, y: my, r: bd / 2 + half0 * 0.7 });
      obstacles.push({ type: 'hole', x: mx + rf(-1, 1), y: my + rf(-1, 1), r: rf(1.2, 1.7) });
    }
  }

  // decoração espalhada (fora do corredor, na "cena")
  for (let k = 0; k < ri(12, 22); k++) {
    const dx = rf(2, w - 2), dy = rf(2, h - 2);
    const kd = theme.decor[ri(0, theme.decor.length - 1)];
    decor.push({ kind: kd, x: dx, y: dy, s: rf(0.8, 1.3), rot: rng() * 6 });
  }

  const start = vec(path[0].x, path[0].y);
  const stan = tangentAt(path, 0); const startAngle = Math.atan2(stan.y, stan.x);
  const fp = path[N - 1], ft = tangentAt(path, N - 1); const fn = { x: -ft.y, y: ft.x };
  const finish: [V, V] = [vec(fp.x + fn.x * (half0 + 0.6), fp.y + fn.y * (half0 + 0.6)), vec(fp.x - fn.x * (half0 + 0.6), fp.y - fn.y * (half0 + 0.6))];

  const name = theme.names[idxInLevel % theme.names.length] + (idxInLevel >= theme.names.length ? ' ' + (Math.floor(idxInLevel / theme.names.length) + 1) : '');
  return { id, name, theme: theme.key, level, w, h, ground: theme.ground, bg: theme.bg, wallCol: theme.wall, path, half: halfArr, pads, patches, walls, obstacles, checkpoints, start, startAngle, finish, decor };
}

// gera as 50 pistas (10 por nível), cacheadas por id
const CACHE = new Map<number, TrackDef>();
export function track(level: number, idx: number): TrackDef {
  const id = level * 10 + idx;
  if (!CACHE.has(id)) CACHE.set(id, genTrack(id, level, idx));
  return CACHE.get(id)!;
}
export const TRACKS_PER_LEVEL = 10;
export function randomTrack(level: number, rng = Math.random): TrackDef { return track(level, Math.floor(rng() * TRACKS_PER_LEVEL)); }
export function randomAny(rng = Math.random): TrackDef { return track(Math.floor(rng() * 5), Math.floor(rng() * TRACKS_PER_LEVEL)); }
