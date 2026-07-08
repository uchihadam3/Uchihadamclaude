// As 6 pistas — maquetes de quintal/rua/mesa. Cada pista nasce de um TRAÇADO
// (polilinha largada→chegada); geramos as bordas que quicam automaticamente ao
// longo dele (com "vãos" abertos = atalhos arriscados), e à mão colocamos
// superfícies, obstáculos, checkpoints e decoração temática.
import { V, vec } from '../engine/core';
import { TrackDef, Wall, Patch, Obstacle, Decor } from '../engine/track';

// normal unitária perpendicular a um segmento
function segNormal(a: V, b: V): V { const dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1; return { x: -dy / l, y: dx / l }; }

// gera bordas dos dois lados do corredor; 'open' = conjunto "seg:lado" a pular
function corridorWalls(path: V[], halfW: number | number[], open: Set<string> = new Set()): Wall[] {
  const hw = (i: number) => Array.isArray(halfW) ? halfW[Math.min(i, halfW.length - 1)] : halfW;
  const left: V[] = [], right: V[] = [];
  for (let i = 0; i < path.length; i++) {
    const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)];
    const n = segNormal(a, b); const w = hw(i);
    left.push({ x: path[i].x + n.x * w, y: path[i].y + n.y * w });
    right.push({ x: path[i].x - n.x * w, y: path[i].y - n.y * w });
  }
  const walls: Wall[] = [];
  for (let i = 1; i < path.length; i++) {
    if (!open.has(`${i - 1}:L`)) walls.push({ a: left[i - 1], b: left[i] });
    if (!open.has(`${i - 1}:R`)) walls.push({ a: right[i - 1], b: right[i] });
  }
  return walls;
}

const finishLineAt = (p: V, tan: V, half: number): [V, V] => {
  const n = { x: -tan.y, y: tan.x };
  return [{ x: p.x + n.x * half, y: p.y + n.y * half }, { x: p.x - n.x * half, y: p.y - n.y * half }];
};

// ----------------------------------------------------------------------------
// 1 · QUINTAL DE TERRA — traçado sinuoso de graveto, folhas, buracos, um atalho
// ----------------------------------------------------------------------------
function quintal(): TrackDef {
  const path: V[] = [vec(8, 50), vec(8, 40), vec(14, 33), vec(24, 31), vec(27, 24), vec(20, 18), vec(11, 16), vec(9, 10), vec(15, 5), vec(24, 4)];
  const walls = corridorWalls(path, 3.2, new Set(['4:R']));   // vão no canto = atalho
  const decor: Decor[] = [
    { kind: 'twig', x: 5, y: 44, s: 1.2, rot: 0.6 }, { kind: 'twig', x: 30, y: 20, s: 1, rot: 2.1 },
    { kind: 'leaf', x: 12, y: 37, c: '#7a9b3a' }, { kind: 'leaf', x: 26, y: 27, c: '#c08a3a' }, { kind: 'leaf', x: 18, y: 8, c: '#8aa84a' },
    { kind: 'pebble', x: 22, y: 22, s: 0.5 }, { kind: 'pebble', x: 13, y: 20, s: 0.4 }, { kind: 'grass', x: 4, y: 30 }, { kind: 'grass', x: 31, y: 12 },
  ];
  return {
    id: 0, name: 'Quintal de Terra', theme: 'quintal', w: 34, h: 54, ground: 'dirt', bg: '#6f5334', edgeBounce: false,
    patches: [
      { surface: 'grass', x: 26, y: 22, r: 3 }, { surface: 'sand', x: 15, y: 33, r: 2.6 },
      { surface: 'mud', x: 11, y: 16, r: 2.4 },
    ],
    walls,
    obstacles: [
      { type: 'hole', x: 24, y: 31, r: 1.1 }, { type: 'stone', x: 20, y: 28, r: 0.9 },
      { type: 'plus3', x: 27, y: 24, r: 1.2 }, { type: 'bomb', x: 12, y: 12, r: 1.0 },
      { type: 'stone', x: 16, y: 6.5, r: 0.8 }, { type: 'ten', x: 20, y: 18, r: 1.3 },
    ],
    path, checkpoints: [vec(8, 50), vec(24, 31), vec(20, 18), vec(9, 10)],
    start: vec(8, 50), startAngle: -Math.PI / 2, finish: finishLineAt(vec(24, 4), vec(1, 0), 3.2), decor,
  };
}

// ----------------------------------------------------------------------------
// 2 · PRAIA DE AREIA — rampas, castelinho (pedra), conchas, areia fofa
// ----------------------------------------------------------------------------
function praia(): TrackDef {
  const path: V[] = [vec(9, 50), vec(10, 40), vec(18, 36), vec(25, 30), vec(24, 22), vec(15, 19), vec(10, 13), vec(16, 6), vec(26, 5)];
  const walls = corridorWalls(path, 3.4);
  const decor: Decor[] = [
    { kind: 'shell', x: 6, y: 44, c: '#f2d9c0' }, { kind: 'shell', x: 28, y: 27, c: '#e8b7a0' }, { kind: 'shell', x: 13, y: 10 },
    { kind: 'castle', x: 24, y: 22, s: 1.2 }, { kind: 'starfish', x: 20, y: 33, c: '#e08a4a' }, { kind: 'pebble', x: 12, y: 22, s: 0.5 },
  ];
  return {
    id: 1, name: 'Praia de Areia', theme: 'praia', w: 34, h: 54, ground: 'sand', bg: '#d9b877', edgeBounce: false,
    patches: [
      { surface: 'ramp', x: 18, y: 36, r: 2.6, dir: -0.7 }, { surface: 'ramp', x: 10, y: 13, r: 2.4, dir: -0.9 },
      { surface: 'water', x: 24, y: 27, r: 3, dir: 1.6 }, { surface: 'cardboard', x: 15, y: 19, r: 2.4 },
    ],
    walls,
    obstacles: [
      { type: 'stone', x: 24, y: 22, r: 1.3 }, { type: 'hole', x: 20, y: 33, r: 1.0 },
      { type: 'plus3', x: 25, y: 30, r: 1.2 }, { type: 'ten', x: 10, y: 13, r: 1.3 }, { type: 'bomb', x: 16, y: 16, r: 0.9 },
    ],
    path, checkpoints: [vec(9, 50), vec(25, 30), vec(15, 19), vec(16, 6)],
    start: vec(9, 50), startAngle: -Math.PI / 2, finish: finishLineAt(vec(26, 5), vec(1, 0), 3.4), decor,
  };
}

// ----------------------------------------------------------------------------
// 3 · CALÇADA DE GIZ — desliza muito, pedras e brinquedos como obstáculos
// ----------------------------------------------------------------------------
function calcada(): TrackDef {
  const path: V[] = [vec(7, 50), vec(7, 38), vec(16, 34), vec(27, 32), vec(28, 22), vec(18, 20), vec(8, 17), vec(9, 8), vec(20, 5), vec(27, 6)];
  const walls = corridorWalls(path, 3.1, new Set(['3:R']));
  const decor: Decor[] = [
    { kind: 'chalk', x: 16, y: 34, rot: 0.2, c: '#e8607a' }, { kind: 'chalk', x: 18, y: 20, rot: 1.2, c: '#5aa8e0' },
    { kind: 'toy', x: 20, y: 12, c: '#e0c040' }, { kind: 'toy', x: 12, y: 40, c: '#5ad07a' }, { kind: 'pebble', x: 24, y: 27, s: 0.5 },
  ];
  return {
    id: 2, name: 'Calçada de Giz', theme: 'calcada', w: 34, h: 54, ground: 'sidewalk', bg: '#9a9488', edgeBounce: false,
    patches: [
      { surface: 'chalk', x: 16, y: 34, r: 3 }, { surface: 'chalk', x: 18, y: 20, r: 3 }, { surface: 'cardboard', x: 9, y: 8, r: 2.4 },
    ],
    walls,
    obstacles: [
      { type: 'stone', x: 27, y: 32, r: 1.1 }, { type: 'stone', x: 8, y: 17, r: 1.0 }, { type: 'hole', x: 28, y: 22, r: 1.0 },
      { type: 'plus3', x: 18, y: 20, r: 1.2 }, { type: 'ten', x: 9, y: 8, r: 1.3 }, { type: 'bomb', x: 21, y: 32, r: 0.9 },
    ],
    path, checkpoints: [vec(7, 50), vec(27, 32), vec(8, 17), vec(20, 5)],
    start: vec(7, 50), startAngle: -Math.PI / 2, finish: finishLineAt(vec(27, 6), vec(1, 0), 3.1), decor,
  };
}

// ----------------------------------------------------------------------------
// 4 · GARAGEM DE PAPELÃO — caixas (paredes), fita, lápis, atrito médio
// ----------------------------------------------------------------------------
function garagem(): TrackDef {
  const path: V[] = [vec(8, 50), vec(8, 41), vec(15, 37), vec(26, 36), vec(27, 26), vec(16, 24), vec(9, 20), vec(10, 10), vec(19, 7), vec(27, 8)];
  const walls = corridorWalls(path, 3.0);
  const decor: Decor[] = [
    { kind: 'box', x: 21, y: 31, s: 1.4, rot: 0.1 }, { kind: 'box', x: 13, y: 14, s: 1.2, rot: -0.2 },
    { kind: 'tape', x: 15, y: 37, rot: 0.3 }, { kind: 'pencil', x: 24, y: 20, rot: 1.1, c: '#e0b030' }, { kind: 'pencil', x: 12, y: 44, rot: 0.4, c: '#c04040' },
  ];
  return {
    id: 3, name: 'Garagem de Papelão', theme: 'garagem', w: 34, h: 54, ground: 'cardboard', bg: '#7d6a4e', edgeBounce: true,
    patches: [
      { surface: 'sidewalk', x: 26, y: 36, r: 2.6 }, { surface: 'sand', x: 9, y: 20, r: 2.4 },
    ],
    walls,
    obstacles: [
      { type: 'stone', x: 21, y: 31, r: 1.3 }, { type: 'stone', x: 13, y: 14, r: 1.2 },
      { type: 'hole', x: 16, y: 24, r: 1.0 }, { type: 'plus3', x: 27, y: 26, r: 1.2 }, { type: 'ten', x: 10, y: 10, r: 1.3 }, { type: 'bomb', x: 19, y: 36, r: 0.9 },
    ],
    path, checkpoints: [vec(8, 50), vec(26, 36), vec(9, 20), vec(19, 7)],
    start: vec(8, 50), startAngle: -Math.PI / 2, finish: finishLineAt(vec(27, 8), vec(1, 0), 3.0), decor,
  };
}

// ----------------------------------------------------------------------------
// 5 · PARQUINHO MOLHADO — lama, poças, folhas, muito escorregadio
// ----------------------------------------------------------------------------
function parquinho(): TrackDef {
  const path: V[] = [vec(9, 50), vec(9, 40), vec(17, 35), vec(26, 33), vec(26, 23), vec(14, 21), vec(9, 15), vec(15, 7), vec(25, 5)];
  const walls = corridorWalls(path, 3.3, new Set(['3:R']));
  const decor: Decor[] = [
    { kind: 'leaf', x: 20, y: 34, c: '#6a8b3a' }, { kind: 'leaf', x: 12, y: 18, c: '#c07a3a' }, { kind: 'leaf', x: 23, y: 9, c: '#7a9b4a' },
    { kind: 'grass', x: 5, y: 30 }, { kind: 'grass', x: 30, y: 28 }, { kind: 'pebble', x: 18, y: 26, s: 0.5 },
  ];
  return {
    id: 4, name: 'Parquinho Molhado', theme: 'parquinho', w: 34, h: 54, ground: 'dirt', bg: '#4f5b3a', edgeBounce: false,
    patches: [
      { surface: 'mud', x: 17, y: 35, r: 3 }, { surface: 'mud', x: 14, y: 21, r: 2.8 },
      { surface: 'water', x: 26, y: 28, r: 3, dir: -1.5 }, { surface: 'grass', x: 20, y: 27, r: 2.4 },
    ],
    walls,
    obstacles: [
      { type: 'hole', x: 26, y: 33, r: 1.1 }, { type: 'stone', x: 14, y: 12, r: 1.0 },
      { type: 'plus3', x: 26, y: 23, r: 1.2 }, { type: 'ten', x: 9, y: 15, r: 1.3 }, { type: 'bomb', x: 18, y: 21, r: 0.9 },
    ],
    path, checkpoints: [vec(9, 50), vec(26, 33), vec(9, 15), vec(15, 7)],
    start: vec(9, 50), startAngle: -Math.PI / 2, finish: finishLineAt(vec(25, 5), vec(1, 0), 3.3), decor,
  };
}

// ----------------------------------------------------------------------------
// 6 · MESA DA COZINHA — copos (pedras), canudos (paredes), moedas, borrachas
// ----------------------------------------------------------------------------
function cozinha(): TrackDef {
  const path: V[] = [vec(8, 50), vec(8, 42), vec(16, 39), vec(27, 37), vec(28, 27), vec(17, 25), vec(8, 22), vec(9, 12), vec(18, 8), vec(28, 9)];
  const walls = corridorWalls(path, 3.0);
  const decor: Decor[] = [
    { kind: 'cup', x: 21, y: 32, s: 1.4 }, { kind: 'cup', x: 13, y: 16, s: 1.3 }, { kind: 'coin', x: 24, y: 22, c: '#e0c050' },
    { kind: 'coin', x: 12, y: 46, c: '#d8b840' }, { kind: 'eraser', x: 20, y: 12, c: '#e06a8a' }, { kind: 'straw', x: 16, y: 39, rot: 0.3, c: '#e05a5a' },
  ];
  return {
    id: 5, name: 'Mesa da Cozinha', theme: 'cozinha', w: 34, h: 54, ground: 'cardboard', bg: '#c8b48c', edgeBounce: true,
    patches: [
      { surface: 'sidewalk', x: 27, y: 37, r: 2.8 }, { surface: 'sidewalk', x: 9, y: 22, r: 2.6 }, { surface: 'water', x: 17, y: 25, r: 2.6, dir: 0.2 },
    ],
    walls,
    obstacles: [
      { type: 'stone', x: 21, y: 32, r: 1.5 }, { type: 'stone', x: 13, y: 16, r: 1.4 },
      { type: 'hole', x: 28, y: 27, r: 1.0 }, { type: 'plus3', x: 8, y: 22, r: 1.2 }, { type: 'ten', x: 9, y: 12, r: 1.3 }, { type: 'bomb', x: 18, y: 37, r: 0.9 },
    ],
    path, checkpoints: [vec(8, 50), vec(27, 37), vec(8, 22), vec(18, 8)],
    start: vec(8, 50), startAngle: -Math.PI / 2, finish: finishLineAt(vec(28, 9), vec(1, 0), 3.0), decor,
  };
}

export const TRACKS: TrackDef[] = [quintal(), praia(), calcada(), garagem(), parquinho(), cozinha()];
