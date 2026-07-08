// GERADOR DE PISTAS — o coração do jogo. Cada pista nasce de uma semente
// determinística: um traçado longo e sinuoso (serpentina jitterada suavizada por
// Catmull-Rom), 5..10x mais comprido que o antigo, com ambiente temático,
// obstáculos, rampas, atalhos e — o principal — PROTEÇÃO graduada por nível:
// fácil quase todo murado; extrema quase sem muro (cai fácil pra fora).
import { V, vec, Surface } from '../engine/core';
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

const catmull = (p0: V, p1: V, p2: V, p3: V, t: number): V => {
  const t2 = t * t, t3 = t2 * t;
  return {
    x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
};
function smooth(ctrl: V[], per: number): V[] {
  const out: V[] = [];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = ctrl[Math.max(0, i - 1)], p1 = ctrl[i], p2 = ctrl[i + 1], p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
    for (let s = 0; s < per; s++) out.push(catmull(p0, p1, p2, p3, s / per));
  }
  out.push(ctrl[ctrl.length - 1]);
  return out;
}
const tangentAt = (path: V[], i: number): V => { const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)]; const dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1; return { x: dx / l, y: dy / l }; };
const normalAt = (path: V[], i: number): V => { const t = tangentAt(path, i); return { x: -t.y, y: t.x }; };

// parâmetros por nível. IMPORTANTE: a dificuldade vem da PROTEÇÃO (fração de
// muro "aberto"), não de estreitar o corredor — a largura fica quase constante,
// só a quantidade de muro cai (fácil quase todo murado; extrema quase sem muro).
const LV = [
  { half: 4.3, open: 0.05, len: 250, holes: [1, 2], bombs: [0, 1], stones: [2, 4], bonus: [2, 3], ramps: [1, 2], rowGap: 6.0 },
  { half: 4.1, open: 0.24, len: 330, holes: [2, 3], bombs: [0, 1], stones: [3, 5], bonus: [2, 4], ramps: [1, 3], rowGap: 5.7 },
  { half: 4.0, open: 0.50, len: 410, holes: [2, 4], bombs: [1, 2], stones: [3, 6], bonus: [2, 4], ramps: [2, 3], rowGap: 5.5 },
  { half: 3.9, open: 0.72, len: 490, holes: [3, 5], bombs: [1, 2], stones: [4, 6], bonus: [2, 3], ramps: [2, 4], rowGap: 5.3 },
  { half: 3.8, open: 0.90, len: 570, holes: [3, 6], bombs: [1, 2], stones: [4, 7], bonus: [1, 3], ramps: [2, 4], rowGap: 5.1 },
];

export function genTrack(id: number, level: number, idxInLevel: number): TrackDef {
  const rng = mulberry(id * 7919 + level * 131 + idxInLevel * 17 + 1);
  const ri = (a: number, b: number) => Math.floor(a + rng() * (b - a + 1));
  const rf = (a: number, b: number) => a + rng() * (b - a);
  const theme = THEMES[(idxInLevel * 3 + level * 7 + id) % THEMES.length];
  const p = LV[level];

  const half0 = p.half * rf(0.92, 1.08);
  const m = half0 + 3.2;
  const w = Math.round(rf(46, 58));
  const legW = w - 2 * m;
  const rowGap = 2 * half0 + p.rowGap + rf(-0.6, 0.8);
  const rows = Math.max(4, Math.round((p.len * rf(0.9, 1.1)) / legW));
  const h = Math.round(2 * m + (rows - 1) * rowGap);

  // pontos de controle: serpentina de baixo (largada) para cima (chegada)
  const ctrl: V[] = [];
  for (let r = 0; r < rows; r++) {
    const y = h - m - r * rowGap + rf(-rowGap * 0.12, rowGap * 0.12);
    const leftFirst = r % 2 === 0;
    const xA = leftFirst ? m : w - m, xB = leftFirst ? w - m : m;
    ctrl.push(vec(xA, y));
    // meio da perna com ondulação
    ctrl.push(vec((xA + xB) / 2 + rf(-legW * 0.12, legW * 0.12), y + rf(-1.5, 1.5)));
    ctrl.push(vec(xB, y));
    // ponto da curva em U (empurra pra fora pra suavizar)
    if (r < rows - 1) { const ny = y - rowGap / 2; const nx = xB + (leftFirst ? 1 : -1) * m * 0.5; ctrl.push(vec(nx, ny)); }
  }
  const path = smooth(ctrl, 6);
  const N = path.length;

  // meia-largura por ponto (mais larga na largada p/ enfileirar as tampinhas)
  const halfArr: number[] = [];
  let acc = 0; const arcs = [0];
  for (let i = 1; i < N; i++) { acc += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y); arcs.push(acc); }
  const total = acc;
  for (let i = 0; i < N; i++) {
    let hw = half0 + Math.sin(arcs[i] * 0.05) * 0.35;
    if (arcs[i] < 9) hw = Math.max(hw, half0 + 2.2 * (1 - arcs[i] / 9));   // largada larga
    if (total - arcs[i] < 7) hw += 1.0;
    halfArr.push(hw);
  }

  // bordas (proteção) — offset dos dois lados, pulando um trecho "aberto"
  const walls: Wall[] = [];
  const step = 3;
  const near = (a: number) => a < 9 || total - a < 8;   // largada/chegada sempre muradas
  for (let i = step; i < N; i += step) {
    const j = i - step;
    const openHere = rng() < p.open && !near(arcs[i]);
    if (openHere) continue;
    const nj = normalAt(path, j), ni = normalAt(path, i);
    walls.push({ a: vec(path[j].x + nj.x * halfArr[j], path[j].y + nj.y * halfArr[j]), b: vec(path[i].x + ni.x * halfArr[i], path[i].y + ni.y * halfArr[i]) });
    walls.push({ a: vec(path[j].x - nj.x * halfArr[j], path[j].y - nj.y * halfArr[j]), b: vec(path[i].x - ni.x * halfArr[i], path[i].y - ni.y * halfArr[i]) });
  }

  const atArc = (a: number): { p: V; i: number } => { let i = 1; while (i < N - 1 && arcs[i] < a) i++; const seg = arcs[i] - arcs[i - 1] || 1; const t = (a - arcs[i - 1]) / seg; return { p: vec(path[i - 1].x + (path[i].x - path[i - 1].x) * t, path[i - 1].y + (path[i].y - path[i - 1].y) * t), i }; };
  const onPath = (a: number, off = 0): V => { const { p: pp, i } = atArc(a); const n = normalAt(path, i); return vec(pp.x + n.x * off, pp.y + n.y * off); };

  const obstacles: Obstacle[] = [];
  const patches: Patch[] = [];
  const decor: Decor[] = [];
  const checkpoints: V[] = [vec(path[0].x, path[0].y)];

  // checkpoints
  const nCP = ri(4, 7);
  for (let k = 1; k <= nCP; k++) checkpoints.push(onPath(total * k / (nCP + 1)));

  // rampas (impulso / "elevação")
  const nRamp = ri(p.ramps[0], p.ramps[1]);
  for (let k = 0; k < nRamp; k++) { const a = rf(0.15, 0.85) * total; const { p: pp, i } = atArc(a); const t = tangentAt(path, i); patches.push({ surface: 'ramp', x: pp.x, y: pp.y, r: half0 * 0.9, dir: Math.atan2(t.y, t.x) }); }
  // poças/areia/lama temáticas
  for (let k = 0; k < ri(2, 4); k++) { const a = rf(0.1, 0.9) * total; const pp = onPath(a, rf(-half0 * 0.4, half0 * 0.4)); const sfc = theme.patch[ri(0, theme.patch.length - 1)]; const t = tangentAt(path, Math.round(a / total * (N - 1))); patches.push({ surface: sfc, x: pp.x, y: pp.y, r: half0 * rf(0.7, 1.05), dir: sfc === 'water' ? Math.atan2(t.y, t.x) + rf(-0.6, 0.6) : undefined }); }

  // buracos (na linha) — perigo real; caiu → checkpoint + perde 1 peteléco
  const usedArcs: number[] = [];
  const spaced = (a: number) => usedArcs.every(u => Math.abs(u - a) > 14);
  const placeAt = (a: number, off: number, make: (pp: V) => void) => { const pp = onPath(a, off); make(pp); usedArcs.push(a); };
  for (let k = 0, tries = 0; k < ri(p.holes[0], p.holes[1]) && tries < 40; tries++) { const a = rf(0.14, 0.9) * total; if (!spaced(a)) continue; placeAt(a, rf(-half0 * 0.5, half0 * 0.5), pp => obstacles.push({ type: 'hole', x: pp.x, y: pp.y, r: rf(1.0, 1.4) })); k++; }
  // bombas (X) — perde a vez
  for (let k = 0, tries = 0; k < ri(p.bombs[0], p.bombs[1]) && tries < 30; tries++) { const a = rf(0.2, 0.85) * total; if (!spaced(a)) continue; placeAt(a, rf(-half0 * 0.4, half0 * 0.4), pp => obstacles.push({ type: 'bomb', x: pp.x, y: pp.y, r: 0.95 })); k++; }
  // pedras (quicam)
  for (let k = 0; k < ri(p.stones[0], p.stones[1]); k++) { const a = rf(0.1, 0.92) * total; const off = (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.3, half0 * 0.75); const pp = onPath(a, off); obstacles.push({ type: 'stone', x: pp.x, y: pp.y, r: rf(0.7, 1.2) }); }
  // bônus: quase sempre +1, às vezes +2, raríssimo +3
  for (let k = 0, tries = 0; k < ri(p.bonus[0], p.bonus[1]) && tries < 30; tries++) { const a = rf(0.15, 0.9) * total; if (!spaced(a)) continue; const roll = rng(); const n = roll > 0.94 ? 3 : roll > 0.72 ? 2 : 1; placeAt(a, (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.2, half0 * 0.7), pp => obstacles.push({ type: 'bonus', x: pp.x, y: pp.y, r: 1.1, n })); k++; }

  // ATALHO arriscado (nível médio+): fura uma curva em U, com buraco guardião
  const pads: { x: number; y: number; r: number }[] = [];
  if (level >= 1 && rng() < (0.5 + level * 0.12)) {
    const rTurn = ri(1, rows - 2);
    // encontra os dois pontos do U mais próximos espacialmente
    const yTurn = h - m - rTurn * rowGap;
    let iA = 0, iB = 0, bd = 1e9;
    for (let i = 0; i < N; i++) if (Math.abs(path[i].y - yTurn) < rowGap * 0.6) { for (let jj = i + 20; jj < N; jj++) { if (Math.abs(path[jj].y - (yTurn - rowGap)) < rowGap * 0.6) { const d = Math.hypot(path[i].x - path[jj].x, path[i].y - path[jj].y); if (d < bd) { bd = d; iA = i; iB = jj; } } } }
    if (bd < legW && iB > iA) {
      const mx = (path[iA].x + path[iB].x) / 2, my = (path[iA].y + path[iB].y) / 2;
      pads.push({ x: mx, y: my, r: bd / 2 + half0 * 0.6 });
      obstacles.push({ type: 'hole', x: mx + rf(-1, 1), y: my + rf(-1, 1), r: rf(1.2, 1.7) });
      decor.push({ kind: 'twig', x: mx, y: my + bd / 2, s: 1, rot: rng() * 6 });
    }
  }

  // decoração espalhada (fora do corredor, na "cena")
  for (let k = 0; k < ri(10, 18); k++) {
    const dx = rf(2, w - 2), dy = rf(2, h - 2);
    const kind = theme.decor[ri(0, theme.decor.length - 1)];
    decor.push({ kind, x: dx, y: dy, s: rf(0.8, 1.3), rot: rng() * 6, c: undefined });
  }

  const start = vec(path[0].x, path[0].y);
  const stan = tangentAt(path, 0); const startAngle = Math.atan2(stan.y, stan.x);
  const fp = path[N - 1], ft = tangentAt(path, N - 1); const fn = { x: -ft.y, y: ft.x };
  const finish: [V, V] = [vec(fp.x + fn.x * (half0 + 0.5), fp.y + fn.y * (half0 + 0.5)), vec(fp.x - fn.x * (half0 + 0.5), fp.y - fn.y * (half0 + 0.5))];

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
