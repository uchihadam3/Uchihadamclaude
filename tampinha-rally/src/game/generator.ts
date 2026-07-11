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
  paint?: string;                 // pintura PRÓPRIA do chão (visual — física continua no ground)
  patchN?: [number, number];      // quantas manchas de terreno (temas "de terreno" têm mais)
  heroes?: string[];              // objetos GRANDES de cenário (escala de mesa real, fora da pista)
}
const THEMES: Theme[] = [
  { key: 'quintal', ground: 'dirt', bg: '#6f5334', wall: '#6b4e2e', patch: ['sand', 'mud', 'grass'], decor: ['twig', 'leaf', 'pebble', 'grass'], names: ['Quintal do Zé', 'Terra Batida', 'Fundo de Quintal', 'Chão de Terra'], heroes: ['bucketzinc', 'bone', 'fencebit', 'wateringcan'] },
  { key: 'praia', ground: 'sand', bg: '#d9b877', wall: '#c9a35f', patch: ['water', 'ramp', 'cardboard'], decor: ['shell', 'starfish', 'castle', 'pebble'], names: ['Praia da Tarde', 'Areia Fofa', 'Beira-Mar', 'Duna do Sol'], heroes: ['beachumbrella', 'beachball', 'flipflop', 'sunscreen'] },
  { key: 'calcada', ground: 'sidewalk', bg: '#9a9488', wall: '#8f8879', patch: ['chalk', 'cardboard', 'gum'], decor: ['chalk', 'toy', 'pebble'], names: ['Calçada de Giz', 'Rua de Baixo', 'Passeio', 'Meio-Fio'], heroes: ['toycar', 'chalkset', 'sodacup'] },
  { key: 'garagem', ground: 'cardboard', bg: '#7d6a4e', wall: '#a9773f', patch: ['sidewalk', 'magnet', 'sand'], decor: ['box', 'tape', 'pencil'], names: ['Garagem', 'Papelão & Fita', 'Depósito', 'Oficina'], heroes: ['paintcan', 'wrench', 'tirestack', 'toycar'] },
  { key: 'parquinho', ground: 'dirt', bg: '#414c36', wall: '#5c4a2c', patch: ['water', 'mud', 'water', 'grass'], decor: ['leaf', 'grass', 'pebble'], names: ['Parquinho Molhado', 'Lamaçal', 'Depois da Chuva', 'Poça & Folha'], paint: 'wetdirt', patchN: [5, 7], heroes: ['toyshovel', 'beachball', 'bucketzinc'] },
  { key: 'cozinha', ground: 'cardboard', bg: '#c8b48c', wall: '#c05a5a', patch: ['sidewalk', 'water', 'ice'], decor: ['cup', 'coin', 'eraser', 'straw'], names: ['Mesa da Cozinha', 'Hora do Café', 'Toalha Xadrez', 'Bancada'], paint: 'gingham', heroes: ['saltshaker', 'mugcoffee', 'plate', 'apple', 'cuttingboard', 'napkinfold'] },
  { key: 'jardim', ground: 'dirt', bg: '#3f5a2e', wall: '#5a7a3a', patch: ['grass', 'grass', 'mud', 'water'], decor: ['grass', 'leaf', 'twig', 'pebble'], names: ['Jardim da Vó', 'Canteiro', 'Grama & Terra', 'Horta'], paint: 'garden', patchN: [5, 7], heroes: ['wateringcan', 'flowerpot', 'mushroom', 'fencebit'] },
  { key: 'deserto', ground: 'sand', bg: '#c98f4a', wall: '#a6702f', patch: ['ramp', 'vortex', 'water'], decor: ['pebble', 'twig', 'starfish'], names: ['Deserto', 'Dunas', 'Sol a Pino', 'Areião'], paint: 'dunes', heroes: ['cactus', 'drybush', 'oldtire'] },
  { key: 'obra', ground: 'sidewalk', bg: '#7e786a', wall: '#8a8070', patch: ['sand', 'cardboard', 'push'], decor: ['box', 'pencil', 'pebble'], names: ['Canteiro de Obra', 'Entulho', 'Cimento', 'Andaime'], paint: 'cement', heroes: ['brickpile', 'helmet', 'paintcan', 'oldtire'] },
  { key: 'laje', ground: 'sidewalk', bg: '#8f9aa0', wall: '#7a848a', patch: ['cardboard', 'chalk', 'ice'], decor: ['toy', 'pebble', 'tape'], names: ['Laje', 'Terraço', 'Cobertura', 'Varal'], paint: 'slab', heroes: ['watertank', 'clothesline', 'flowerpot'] },
  { key: 'piscina', ground: 'sidewalk', bg: '#4a90b8', wall: '#cfe4ee', patch: ['water', 'ice', 'vortex'], decor: ['pebble', 'coin', 'toy'], names: ['Borda da Piscina', 'Deck Molhado', 'Área de Lazer', 'Prainha'], paint: 'tiles', heroes: ['floatring', 'flipflop', 'sunscreen', 'beachball'] },
  { key: 'feira', ground: 'cardboard', bg: '#a88f5c', wall: '#8a6238', patch: ['sidewalk', 'chalk'], decor: ['box', 'coin', 'tape', 'cup'], names: ['Feira Livre', 'Barraca', 'Calçadão', 'Mercadão'], paint: 'stripes', heroes: ['fruitcrate', 'beachumbrella', 'sodacup'] },
  { key: 'estrada', ground: 'dirt', bg: '#7e4a30', wall: '#4a3a24', patch: ['mud', 'mud', 'sand'], decor: ['pebble', 'twig', 'grass'], names: ['Estrada de Barro', 'Trilha', 'Rua sem Asfalto', 'Beira da Roça'], paint: 'clay', patchN: [4, 6], heroes: ['roadsign', 'oldtire', 'fencebit', 'drybush'] },
  { key: 'varanda', ground: 'cardboard', bg: '#8a6a44', wall: '#6b4e2e', patch: ['sidewalk', 'water'], decor: ['cup', 'coin', 'leaf', 'pencil'], names: ['Varanda', 'Área Coberta', 'Quintalzinho', 'Alpendre'], paint: 'planks', heroes: ['mugcoffee', 'flowerpot', 'bookpile', 'plate'] },
];
// TEMAS NOVOS — cada um estreia um PISO com mecânica própria (ver core/physics):
//  · SINUCA: feltro rola liso e as bordas viram TABELA VIVA (quique forte de propósito)
//  · CONGELADOR: escarcha desliza demais e DERRAPA (o freio do Controle não pega)
//  · BANCADA: aço quica forte (pinball) + placas de ÍMÃ que puxam a tampinha
//  · SALA: tapete felpudo AMORTECE todo quique + CHICLETE que gruda (peteleco sai fraco)
const THEMES_NEW: Theme[] = [
  { key: 'sinuca', ground: 'felt', bg: '#1c5a38', wall: '#7a4a26', patch: ['gum', 'chalk', 'water'], decor: ['ball8', 'chalk', 'coin', 'cup'], names: ['Mesa de Sinuca', 'Bar do Tio', 'Tabela Certa', 'Bico de Giz'], heroes: ['cuestick', 'poolballs', 'bluechalk', 'sodacup'] },
  { key: 'geladeira', ground: 'frost', bg: '#a8c8d4', wall: '#8fb4c2', patch: ['ice', 'water', 'vortex'], decor: ['icecube', 'cup', 'straw', 'coin'], names: ['Congelador', 'Bandeja de Gelo', 'Geladeira Aberta', 'Friozão'], heroes: ['popsicle', 'icecreamtub', 'icetray'] },
  { key: 'bancada', ground: 'metal', bg: '#727c84', wall: '#4e565e', patch: ['magnet', 'magnet', 'ramp', 'push'], decor: ['bolt', 'pencil', 'tape', 'box'], names: ['Bancada da Oficina', 'Parafuso Solto', 'Ferramentaria', 'Aço Liso'], heroes: ['hammer', 'screwdriver', 'wrench', 'paintcan'] },
  { key: 'sala', ground: 'carpet', bg: '#8a4a42', wall: '#6b4030', patch: ['gum', 'cardboard', 'water', 'gum'], decor: ['remote', 'toy', 'cup', 'eraser'], names: ['Tapete da Sala', 'Sala de TV', 'Felpudo', 'Tarde de Domingo'], heroes: ['pillow', 'bookpile', 'sock', 'mugcoffee', 'toycar'] },
];

const tangentAt = (path: V[], i: number): V => { const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)]; const dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1; return { x: dx / l, y: dy / l }; };
const normalAt = (path: V[], i: number): V => { const t = tangentAt(path, i); return { x: -t.y, y: t.x }; };
const arcLenOf = (pts: V[]): number => { let a = 0; for (let i = 1; i < pts.length; i++) a += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); return a; };
const rotatePts = (pts: V[], ang: number): void => { const c = Math.cos(ang), s = Math.sin(ang); for (const p of pts) { const x = p.x * c - p.y * s, y = p.x * s + p.y * c; p.x = x; p.y = y; } };

// parâmetros por nível. Dificuldade = PROTEÇÃO (open) — a largura do corredor é
// quase constante; só a cobertura de muro cai (fácil murado → extrema sem muro).
// DESIGN DE PISTA: além dos perigos, cada nível tem OBSTÁCULOS DE MANOBRA —
// chicanes (tábuas em zigue-zague), FUNIS (estreitamento com passagem central)
// e SLALOM de pedras. Eles impedem o "taca reto e pronto" (que só favorece o
// Desliza) e premiam controle, peso, quique e aderência. gate = largura da
// passagem do funil (aperta conforme o nível).
const LV = [
  { half: 4.3, open: 0.05, len: 330, holes: [1, 2], bombs: [0, 1], stones: [5, 7], bonus: [2, 3], ramps: [1, 2], chi: [1, 2], gates: [1, 2], gate: 3.2, slalom: [1, 1] },
  { half: 4.1, open: 0.24, len: 420, holes: [2, 3], bombs: [0, 1], stones: [3, 5], bonus: [2, 4], ramps: [1, 3], chi: [2, 2], gates: [2, 2], gate: 3.0, slalom: [1, 2] },
  { half: 4.0, open: 0.50, len: 510, holes: [2, 4], bombs: [1, 2], stones: [4, 6], bonus: [2, 4], ramps: [2, 3], chi: [2, 3], gates: [2, 3], gate: 2.8, slalom: [2, 2] },
  { half: 3.9, open: 0.72, len: 600, holes: [3, 5], bombs: [1, 2], stones: [6, 9], bonus: [2, 3], ramps: [2, 4], chi: [2, 3], gates: [2, 3], gate: 2.6, slalom: [2, 2] },
  { half: 3.8, open: 0.90, len: 690, holes: [3, 6], bombs: [1, 2], stones: [5, 8], bonus: [1, 3], ramps: [2, 4], chi: [3, 4], gates: [3, 3], gate: 2.5, slalom: [2, 3] },
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
  // 2 pistas por nível são dos TEMAS NOVOS (determinístico); as outras 40 ficam
  // exatamente como sempre foram (mesmo tema, mesmo traçado, mesmos obstáculos).
  // tema/nome dependem só de (nível, posição) — a VARIANTE de competição (id
  // diferente) mantém a mesma "cara" da pista-base, só muda o traçado
  const sel = idxInLevel * 4 + level * 17;
  const theme = sel % 5 === 2
    ? THEMES_NEW[(level * 2 + (idxInLevel > 4 ? 1 : 0)) % THEMES_NEW.length]
    : THEMES[sel % THEMES.length];
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
    if (arcs[i] < 13) hw = Math.max(hw, half0 + 3.2 * (1 - arcs[i] / 13));   // largada bem larga: cabe a fila
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

  // largada larga (para as tampinhas saírem certinho da linha, todas lado a lado)
  pads.push({ x: path[0].x, y: path[0].y, r: half0 + 3.6 });

  const nCP = ri(4, 7);
  const cpArcsGen: number[] = [];
  for (let k = 1; k <= nCP; k++) { const ca = total * k / (nCP + 1); cpArcsGen.push(ca); checkpoints.push(onPath(ca)); }

  // SETAS VERDES (impulso pra frente) — pequenas e em lugares variados (meio, beira),
  // pra você tentar passar por cima. Não cobrem a pista inteira.
  const nRamp = ri(p.ramps[0], p.ramps[1]);
  for (let k = 0; k < nRamp; k++) {
    const a = rf(0.1, 0.9) * total; const { i } = atArc(a); const t = tangentAt(path, i);
    const off = rng() < 0.4 ? 0 : (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.3, half0 * 0.62);
    const pp = onPath(a, off);
    patches.push({ surface: 'ramp', x: pp.x, y: pp.y, r: rf(1.5, 2.0), dir: Math.atan2(t.y, t.x) });
  }
  // poças/areia/lama temáticas — formas VARIADAS (redondas E compridas/retangulares)
  const pn = theme.patchN || [3, 5];
  for (let k = 0; k < ri(pn[0], pn[1]); k++) {
    const a = rf(0.06, 0.94) * total; const pp = onPath(a, rf(-half0 * 0.35, half0 * 0.35));
    const sfc = theme.patch[ri(0, theme.patch.length - 1)]; const { i } = atArc(a); const t = tangentAt(path, i);
    // SETAS nunca viram poça gigante: quando vêm da lista do tema, seguem as
    // regras das dedicadas — pequenas (NUNCA cobrem a pista) e com direção certa
    if (sfc === 'ramp' || sfc === 'push') {
      patches.push({ surface: sfc, x: pp.x, y: pp.y, r: rf(1.5, 2.0), dir: Math.atan2(t.y, t.x) + (sfc === 'push' ? Math.PI : 0) });
      continue;
    }
    const dir = sfc === 'water' ? Math.atan2(t.y, t.x) + rf(-0.6, 0.6) : undefined;
    // ímã/redemoinho/chiclete são SEMPRE redondos (efeito em volta do centro);
    // chiclete ainda é MENOR — gruda mas nunca vira prisão (dá pra escapar)
    if (rng() < 0.45 && sfc !== 'magnet' && sfc !== 'vortex' && sfc !== 'gum') patches.push({ surface: sfc, x: pp.x, y: pp.y, hw: half0 * rf(0.5, 0.85), hh: half0 * rf(0.85, 1.4), dir });
    else patches.push({ surface: sfc, x: pp.x, y: pp.y, r: half0 * rf(0.7, 1.1) * (sfc === 'gum' ? 0.44 : 1), dir });
  }

  // buracos, bombas, pedras, bônus (espaçados) — já começa reservando os arcos dos
  // CHECKPOINTS pra nada perigoso nascer perto (checkpoint é ponto de renascimento!)
  const usedArcs: number[] = [...cpArcsGen];
  const spaced = (a: number) => usedArcs.every(u => Math.abs(u - a) > 14);
  const placeAt = (a: number, off: number, make: (pp: V) => void) => { const pp = onPath(a, off); make(pp); usedArcs.push(a); };
  // buracos/bombas ficam FORA da linha central (deixam a linha de corrida livre; você desvia)
  for (let k = 0, tries = 0; k < ri(p.holes[0], p.holes[1]) && tries < 40; tries++) { const a = rf(0.1, 0.94) * total; if (!spaced(a)) continue; placeAt(a, (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.32, half0 * 0.62), pp => obstacles.push({ type: 'hole', x: pp.x, y: pp.y, r: rf(1.0, 1.4) })); k++; }
  for (let k = 0, tries = 0; k < ri(p.bombs[0], p.bombs[1]) && tries < 30; tries++) { const a = rf(0.14, 0.92) * total; if (!spaced(a)) continue; placeAt(a, (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.38, half0 * 0.7), pp => obstacles.push({ type: 'bomb', x: pp.x, y: pp.y, r: 0.95 })); k++; }
  for (let k = 0; k < ri(p.stones[0], p.stones[1]); k++) { const a = rf(0.06, 0.96) * total; const off = (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.3, half0 * 0.75); const pp = onPath(a, off); obstacles.push({ type: 'stone', x: pp.x, y: pp.y, r: rf(0.7, 1.2) }); }
  // BÔNUS EM LUGARES ARRISCADOS — o prêmio mede o perigo. +1 já fica na beira (pode
  // sair da pista); +2 mais na beira ainda; +3 colado na borda COM um buraco logo além
  // (ou você acerta a mira, ou cai/sai). Nada de bônus fácil no meio da pista.
  for (let k = 0, tries = 0; k < ri(p.bonus[0], p.bonus[1]) && tries < 40; tries++) {
    const a = rf(0.12, 0.92) * total; if (!spaced(a)) continue;
    // RARIDADE de verdade: +1 comum (84%), +2 raro (12%), +3 raríssimo (4%)
    const roll = rng(); const n = roll > 0.96 ? 3 : roll > 0.84 ? 2 : 1;
    const side = rng() < 0.5 ? -1 : 1; const ii = atArc(a).i; const hw = halfArr[Math.min(N - 1, ii)];
    // quanto MAIOR o prêmio, mais na BEIRA (arriscado de mirar) — mas sempre
    // DENTRO do corredor: com mira e força certas, dá pra pegar.
    const frac = n === 3 ? 0.74 : n === 2 ? 0.6 : 0.42;
    placeAt(a, side * hw * frac, pp => obstacles.push({ type: 'bonus', x: pp.x, y: pp.y, r: 1.1, n }));
    // prêmio grande PAGA RISCO: um buraco logo À FRENTE na mesma linha —
    // passou da força tentando pegar o +3, caiu. (nunca EM CIMA do bônus)
    if (n >= 2 && rng() < (n === 3 ? 0.8 : 0.45)) {
      const hp2 = onPath(a + 3.8, side * hw * (frac - 0.06));
      obstacles.push({ type: 'hole', x: hp2.x, y: hp2.y, r: n === 3 ? 1.25 : 1.0 });
      usedArcs.push(a + 3.8);
    }
    k++;
  }

  // SETAS VERMELHAS (empurrão) — te freiam e jogam PRA TRÁS, ou PRO LADO (rumo à
  // beira/buraco). Mesmo tamanho das verdes, em lugares variados (meio ou canto).
  const nPush = ri(1, level >= 2 ? 3 : 2);
  for (let k = 0, tries = 0; k < nPush && tries < 24; tries++) {
    const a = rf(0.2, 0.85) * total; if (!spaced(a)) continue;
    const { i } = atArc(a); const t = tangentAt(path, i), nrm = normalAt(path, i);
    // sempre FORA do centro: a linha central fica passável (não vira parede que trava)
    const roll = rng(); let dir: number, off: number;
    if (roll < 0.45) { dir = Math.atan2(t.y, t.x) + Math.PI; off = (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.3, half0 * 0.62); }        // pra trás
    else if (roll < 0.75) { const s = rng() < 0.5 ? 1 : -1; dir = Math.atan2(nrm.y * s, nrm.x * s); off = -s * rf(half0 * 0.15, half0 * 0.45); } // pro lado (te empurra pra fora)
    else { const s = rng() < 0.5 ? 1 : -1; dir = Math.atan2(t.y, t.x) + Math.PI + s * 0.7; off = (rng() < 0.5 ? -1 : 1) * rf(half0 * 0.25, half0 * 0.6); } // diagonal
    const pp = onPath(a, off);
    patches.push({ surface: 'push', x: pp.x, y: pp.y, r: rf(1.5, 1.9), dir });
    usedArcs.push(a); k++;
  }

  // RAMPA DE SALTO com um BURACO grande logo à frente — só passa quem chega com
  // velocidade (pula por cima); devagar, cai. Escolhe um trecho retinho.
  const nJump = level >= 3 ? 2 : 1;
  for (let k = 0; k < nJump; k++) {
    let bestA = -1, bestC = 1;
    for (let tr = 0; tr < 18; tr++) { const a = rf(0.2, 0.72) * total; if (!spaced(a)) continue; const ii = atArc(a).i; if (curvS[ii] < bestC) { bestC = curvS[ii]; bestA = a; } }
    if (bestA < 0) continue;
    const { p: rp, i } = atArc(bestA); const t = tangentAt(path, i);
    obstacles.push({ type: 'jump', x: rp.x, y: rp.y, r: 1.6, dir: Math.atan2(t.y, t.x) });
    const hp = onPath(bestA + rf(5.5, 7.5), 0);
    obstacles.push({ type: 'hole', x: hp.x, y: hp.y, r: Math.min(2.5, half0 * 0.72) });
    usedArcs.push(bestA, bestA + 6.5);
  }

  // ---------------- OBSTÁCULOS DE MANOBRA (todos os níveis) ----------------
  // A pista nunca pode ser um corredor livre de "tacar reto": chicanes, funis e
  // slalom obrigam a jogar POSICIONANDO — controle/peso/quique/aderência passam
  // a valer tanto quanto o Desliza.
  // (espaçamento mais folgado que o dos perigos: manobra pode ficar mais perto)
  const spacedM = (a: number) => usedArcs.every(u => Math.abs(u - a) > 10);

  // CHICANES de TÁBUAS em zig-zag: tábuas alternadas atravessando a pista.
  // A tábua vai da borda até 0.2*meia-largura antes do centro: força o zigue-
  // zague mas NUNCA tranca a linha central.
  const nChi = ri(p.chi[0], p.chi[1]);
  for (let ci = 0, tries = 0; ci < nChi && tries < 30; tries++) {
    const npl = ri(3, 4), gapA = 7.5;
    const a0 = rf(0.1, 0.84) * total;
    // o trecho INTEIRO da chicane precisa estar livre (checkpoints/perigos)
    let ok = true; for (let k = 0; k < npl; k++) if (!spacedM(a0 + k * gapA) || a0 + k * gapA > total - 14) { ok = false; break; }
    if (!ok) continue;
    for (let k = 0; k < npl; k++) {
      const a = a0 + k * gapA;
      const { p: pp, i } = atArc(a); const nrm = normalAt(path, i); const hw = halfArr[Math.min(N - 1, i)];
      const side = k % 2 ? 1 : -1;
      walls.push({ a: vec(pp.x + nrm.x * hw * side, pp.y + nrm.y * hw * side), b: vec(pp.x + nrm.x * hw * side * 0.2, pp.y + nrm.y * hw * side * 0.2) });
      usedArcs.push(a);
    }
    ci++;
  }

  // ESTREITAMENTOS: 3 formatos que obrigam a passar por um vão — vira ponto de
  // disputa (peso bloqueia, aderência segura, controle encaixa):
  //  · FUNIL: tábuas dos dois lados, passagem no CENTRO
  //  · PORTÃO LATERAL: tábua comprida de UM lado só — a passagem fica no CANTO
  //  · PORTA DE PEDRAS: duas pedras deixando um vão entre elas (dá pra tabelar)
  const nGate = ri(p.gates[0], p.gates[1]);
  for (let gi = 0, tries = 0; gi < nGate && tries < 34; tries++) {
    // escolhe um trecho RETO (estreitar em curva fecharia demais a passagem)
    let bestA = -1, bestC = 1;
    for (let t2 = 0; t2 < 14; t2++) { const a = rf(0.12, 0.9) * total; if (!spacedM(a)) continue; const ii = atArc(a).i; if (curvS[ii] < bestC) { bestC = curvS[ii]; bestA = a; } }
    if (bestA < 0 || bestC > 0.35) { continue; }
    const { p: pp, i } = atArc(bestA); const nrm = normalAt(path, i); const hw = halfArr[Math.min(N - 1, i)];
    const gapW = Math.max(p.gate * rf(0.95, 1.1), 2.3);       // largura da passagem (sempre passável)
    const kind = rng();
    if (kind < 0.4) {           // FUNIL central
      const g2 = gapW / 2;
      for (const side of [1, -1]) walls.push({ a: vec(pp.x + nrm.x * hw * side, pp.y + nrm.y * hw * side), b: vec(pp.x + nrm.x * g2 * side, pp.y + nrm.y * g2 * side) });
    } else if (kind < 0.75) {   // PORTÃO LATERAL: passagem colada num canto só
      const side = rng() < 0.5 ? 1 : -1;                      // tábua sai desta borda…
      const inner = -hw + gapW;                               // …e vai até deixar o vão no canto oposto
      walls.push({ a: vec(pp.x + nrm.x * hw * side, pp.y + nrm.y * hw * side), b: vec(pp.x + nrm.x * inner * side, pp.y + nrm.y * inner * side) });
    } else {                    // PORTA DE PEDRAS: vão REAL entre as bordas das pedras
      const sr = rf(0.85, 1.05);
      // centro = meia-passagem + raio da pedra + raio da tampinha (0.82) + folga
      const off = Math.min(hw - 0.6, gapW / 2 + sr + 0.82 + 0.25);
      for (const side of [1, -1]) { const sp2 = vec(pp.x + nrm.x * off * side, pp.y + nrm.y * off * side); obstacles.push({ type: 'stone', x: sp2.x, y: sp2.y, r: sr }); }
    }
    usedArcs.push(bestA); gi++;
  }

  // SLALOM de PEDRAS: 3 pedras alternando os lados em sequência — desenha um S
  // no caminho. Dá pra tabelar nelas (quique) ou contornar com controle.
  const nSl = ri(p.slalom[0], p.slalom[1]);
  for (let si2 = 0, tries = 0; si2 < nSl && tries < 26; tries++) {
    const a0 = rf(0.08, 0.88) * total; const gapA = 5.5;
    let ok = true; for (let k = 0; k < 3; k++) if (!spacedM(a0 + k * gapA) || a0 + k * gapA > total - 12) { ok = false; break; }
    if (!ok) continue;
    for (let k = 0; k < 3; k++) {
      const a = a0 + k * gapA; const { i } = atArc(a); const hw = halfArr[Math.min(N - 1, i)];
      const side = (k % 2 ? 1 : -1);
      const pp = onPath(a, side * hw * rf(0.3, 0.42));
      obstacles.push({ type: 'stone', x: pp.x, y: pp.y, r: rf(0.8, 1.05) });
      usedArcs.push(a);
    }
    si2++;
  }

  // ---------------- EMOÇÃO DO COMEÇO AO FIM ----------------
  // aperitivo logo depois da largada (uma pedra de boas-vindas)…
  {
    const a = total * rf(0.055, 0.1);
    const pp = onPath(a, (rng() < 0.5 ? -1 : 1) * half0 * rf(0.3, 0.5));
    obstacles.push({ type: 'stone', x: pp.x, y: pp.y, r: rf(0.8, 1.05) });
  }
  // …e RETA FINAL de arrepiar: mini-slalom guardando a chegada (ninguém "taca
  // reto e ganha" — o fim da corrida disputa até o último peteleco)
  {
    const a0 = total * rf(0.86, 0.9);
    for (let k = 0; k < 3; k++) {
      const a = a0 + k * 5;
      if (a > total - 9) break;
      const { i } = atArc(a); const hw2 = halfArr[Math.min(N - 1, i)];
      const pp = onPath(a, (k % 2 ? 1 : -1) * hw2 * rf(0.3, 0.42));
      obstacles.push({ type: 'stone', x: pp.x, y: pp.y, r: rf(0.75, 1.0) });
      usedArcs.push(a);
    }
  }

  // ---------------- BRINQUEDOS NOVOS (5 obstáculos inéditos) ----------------
  // brinquedo não é perigo mortal: pode ficar mais PERTO das outras coisas
  // (espaçamento próprio de 7u — senão pista curta satura e não sobra vaga)
  const spacedT = (a: number) => usedArcs.every(u => Math.abs(u - a) > 7);
  // PIÃO: rebatedor giratório no meio da pista — bateu, ele cospe de lado (pinball)
  const nTop = ri(1, level >= 2 ? 2 : 1);
  for (let k = 0, tries = 0; k < nTop && tries < 40; tries++) {
    const a = rf(0.12, 0.9) * total; if (!spacedT(a)) continue;
    placeAt(a, rf(-0.25, 0.25) * half0, pp => obstacles.push({ type: 'top', x: pp.x, y: pp.y, r: 0.95 })); k++;
  }
  // CARRINHO DE FRICÇÃO: parado na pista, mas se alguém encostar ele DISPARA
  // reto na direção que tá apontando — atropela quem estiver no caminho e
  // estaciona num lugar novo (o obstáculo muda de posição na corrida!)
  const nCar = ri(1, level >= 1 ? 2 : 1);
  for (let k = 0, tries = 0; k < nCar && tries < 40; tries++) {
    const a = rf(0.15, 0.88) * total; if (!spacedT(a)) continue;
    const { i } = atArc(a); const t = tangentAt(path, i);
    const side = rng() < 0.5 ? -1 : 1;
    placeAt(a, 0, pp => obstacles.push({ type: 'car', x: pp.x, y: pp.y, r: 0.9, dir: Math.atan2(t.y, t.x) + side * rf(0.4, 0.7) })); k++;
  }
  // ELÁSTICO: liguinha esticada saindo de uma borda em diagonal — quicou nela,
  // ESTILINGUE (devolve com ganho; o esperto usa a favor pra fazer a curva)
  const nBand = level >= 1 ? ri(1, 2) : ri(0, 1);
  for (let k = 0, tries = 0; k < nBand && tries < 40; tries++) {
    const a = rf(0.14, 0.9) * total; if (!spacedT(a)) continue;
    const { i } = atArc(a); const t = tangentAt(path, i); const hw2 = halfArr[Math.min(N - 1, i)];
    const side = rng() < 0.5 ? -1 : 1;
    const pp = onPath(a, side * hw2 * 0.5);
    obstacles.push({ type: 'band', x: pp.x, y: pp.y, r: hw2 * rf(0.42, 0.55), dir: Math.atan2(t.y, t.x) + side * rf(0.5, 0.8) });
    usedArcs.push(a); k++;
  }
  // CATAVENTO: moinho de pás que GIRA um tanto a cada peteleco — o caminho que
  // tava fechado abre no turno seguinte (quebra-cabeça de timing)
  if (level >= 1 && rng() < 0.85) {
    for (let tries = 0; tries < 40; tries++) {
      const a = rf(0.25, 0.8) * total; if (!spacedT(a)) continue;
      const { i } = atArc(a); const hw2 = halfArr[Math.min(N - 1, i)];
      placeAt(a, 0, pp => obstacles.push({ type: 'mill', x: pp.x, y: pp.y, r: Math.min(2.4, hw2 * 0.6), dir: rng() * 3.14, n: level >= 3 ? 4 : 2 }));
      break;
    }
  }
  // BEXIGA D'ÁGUA: estoura no primeiro toque — splash empurra todo mundo perto
  // e deixa uma POÇA D'ÁGUA permanente no lugar (a pista muda no meio da corrida!)
  const nBal = ri(1, 2);
  for (let k = 0, tries = 0; k < nBal && tries < 40; tries++) {
    const a = rf(0.18, 0.86) * total; if (!spacedT(a)) continue;
    placeAt(a, rf(-0.4, 0.4) * half0, pp => obstacles.push({ type: 'balloon', x: pp.x, y: pp.y, r: 1.05 })); k++;
  }

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

  // decoração espalhada SÓ FORA do corredor (nunca em cima da pista — decoração não
  // colide, então uma caixa/lego no meio da pista pareceria obstáculo e não faria nada).
  // Distância exata ponto→segmento (não amostra vértices) + margem generosa.
  const segD2 = (x: number, y: number, ax: number, ay: number, bx: number, by: number): number => {
    const abx = bx - ax, aby = by - ay; const l2 = abx * abx + aby * aby || 1e-6;
    let t = ((x - ax) * abx + (y - ay) * aby) / l2; t = t < 0 ? 0 : t > 1 ? 1 : t;
    const dx = x - (ax + abx * t), dy = y - (ay + aby * t); return dx * dx + dy * dy;
  };
  const offTrack = (x: number, y: number): boolean => {
    for (const pd of pads) if ((x - pd.x) ** 2 + (y - pd.y) ** 2 <= (pd.r + 2) ** 2) return false;
    const lim = (half0 + 4.5) * (half0 + 4.5);
    for (let i = 1; i < N; i++) if (segD2(x, y, path[i - 1].x, path[i - 1].y, path[i].x, path[i].y) < lim) return false;
    return true;
  };
  for (let k = 0, tries = 0; k < ri(12, 22) && tries < 400; tries++) {
    const dx = rf(2, w - 2), dy = rf(2, h - 2);
    if (!offTrack(dx, dy)) continue;
    const kd = theme.decor[ri(0, theme.decor.length - 1)];
    decor.push({ kind: kd, x: dx, y: dy, s: rf(0.8, 1.3), rot: rng() * 6 }); k++;
  }

  // SEGURANÇA: nada de PINÇA de pedras — duas pedras quase encostadas formam um
  // "V" onde a tampinha ENCAIXA e fica presa (o vão não passa uma tampinha, mas
  // o cantinho segura). Se o vão entre bordas ficou menor que um diâmetro + folga,
  // remove a segunda pedra. (As PORTAS de pedra propositais têm vão ≥ 4u — ficam.)
  for (let a = obstacles.length - 1; a >= 0; a--) {
    const oa = obstacles[a]; if (oa.type !== 'stone') continue;
    for (let b2 = 0; b2 < a; b2++) {
      const ob = obstacles[b2]; if (ob.type !== 'stone') continue;
      const gap = Math.hypot(oa.x - ob.x, oa.y - ob.y) - oa.r - ob.r;
      if (gap < 2.6) { obstacles.splice(a, 1); break; }
    }
  }

  // HERÓIS DO CENÁRIO: objetos GRANDES de verdade (saleiro, guarda-sol, caixa
  // d'água, taco de sinuca…) espalhados FORA da pista com folga generosa —
  // vendem a fantasia de "corrida em cima da mesa/lugar de verdade"
  const HERO_RAD: Record<string, number> = {
    saltshaker: 1.4, plate: 4.5, mugcoffee: 2.6, napkinfold: 2.6, apple: 2.0, cuttingboard: 4.2,
    bucketzinc: 2.2, bone: 2.3, fencebit: 3.7, beachumbrella: 5.2, beachball: 2.0, flipflop: 2.1,
    sunscreen: 1.4, toycar: 2.3, chalkset: 2.0, paintcan: 1.9, wrench: 2.5, tirestack: 2.9,
    oldtire: 2.9, toyshovel: 2.7, wateringcan: 2.9, flowerpot: 2.0, mushroom: 1.4, cactus: 2.0,
    drybush: 1.7, brickpile: 2.5, helmet: 2.4, watertank: 3.8, clothesline: 5.2, floatring: 3.2,
    fruitcrate: 2.9, roadsign: 2.0, cuestick: 6.0, poolballs: 1.6, bluechalk: 0.9, sodacup: 1.6,
    popsicle: 2.5, icecreamtub: 2.3, icetray: 2.2, hammer: 2.7, screwdriver: 2.1, pillow: 3.2,
    bookpile: 2.7, sock: 1.7,
  };
  const heroesList = theme.heroes || [];
  if (heroesList.length) {
    const placedH: { x: number; y: number; r: number }[] = [];
    const clearH = (x: number, y: number, rad: number): boolean => {
      for (const pd of pads) if ((x - pd.x) ** 2 + (y - pd.y) ** 2 <= (pd.r + rad + 2) ** 2) return false;
      const lim = (half0 + 2.5 + rad) ** 2;
      for (let i2 = 1; i2 < N; i2++) if (segD2(x, y, path[i2 - 1].x, path[i2 - 1].y, path[i2].x, path[i2].y) < lim) return false;
      return true;
    };
    const want = Math.min(heroesList.length + 2, ri(4, 6));
    for (let k = 0, tries = 0; k < want && tries < 500; tries++) {
      const kind = heroesList[k % heroesList.length];
      const rad = HERO_RAD[kind] || 2.5;
      const x = rf(3 + rad, w - 3 - rad), y = rf(3 + rad, h - 3 - rad);
      if (!clearH(x, y, rad)) continue;
      if (placedH.some(q => (q.x - x) ** 2 + (q.y - y) ** 2 < (q.r + rad + 3) ** 2)) continue;
      decor.push({ kind, x, y, s: rf(0.95, 1.25), rot: rng() * 6.283 });
      placedH.push({ x, y, r: rad }); k++;
    }
  }

  // SEGURANÇA: nada de buraco/bomba perto de um checkpoint (nem da largada). O
  // renascimento acontece no checkpoint, então nunca pode ter armadilha em cima
  // (senão a tampinha nasce no buraco e trava em loop).
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const o = obstacles[i];
    if (o.type !== 'hole' && o.type !== 'bomb') continue;
    if (checkpoints.some(cp => (o.x - cp.x) ** 2 + (o.y - cp.y) ** 2 < 5.5 * 5.5)) obstacles.splice(i, 1);
  }

  const start = vec(path[0].x, path[0].y);
  const stan = tangentAt(path, 0); const startAngle = Math.atan2(stan.y, stan.x);
  const fp = path[N - 1], ft = tangentAt(path, N - 1); const fn = { x: -ft.y, y: ft.x };
  const finish: [V, V] = [vec(fp.x + fn.x * (half0 + 0.6), fp.y + fn.y * (half0 + 0.6)), vec(fp.x - fn.x * (half0 + 0.6), fp.y - fn.y * (half0 + 0.6))];

  const name = theme.names[idxInLevel % theme.names.length] + (idxInLevel >= theme.names.length ? ' ' + (Math.floor(idxInLevel / theme.names.length) + 1) : '');
  return { id, name, theme: theme.key, level, w, h, ground: theme.ground, paint: theme.paint, bg: theme.bg, wallCol: theme.wall, path, half: halfArr, pads, patches, walls, obstacles, checkpoints, start, startAngle, finish, decor };
}

// gera as 50 pistas fixas (10 por nível) + as VARIANTES de competição (idx ≥ 10):
// mesma "cara" da pista-base (tema, nome, nível), mas traçado próprio — cacheadas
const CACHE = new Map<number, TrackDef>();
export function track(level: number, idx: number): TrackDef {
  const base = idx % 10, salt = Math.floor(idx / 10);
  const id = salt * 1009 + level * 10 + base;      // injetivo: level*10+base < 1009
  if (!CACHE.has(id)) CACHE.set(id, genTrack(id, level, base));
  return CACHE.get(id)!;
}
export const TRACKS_PER_LEVEL = 10;

// PISTA FIXA por competição: sorteia UMA vez a partir da semente da conta —
// sair/voltar/reiniciar cai sempre na mesma sequência de pistas (aprende e passa).
// Passo coprimo com 10 → corridas da mesma competição nunca repetem pista.
// O SALT é próprio de cada competição: se a mesma "cara" (Quintal, Praia…)
// aparecer em OUTRA competição, o traçado é outro — curvas nunca se repetem.
export function seededTrack(seed: number, key: string, race: number): number {
  let h = (seed >>> 0) || 1;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 2654435761) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 2246822519) >>> 0;
  const base = h % TRACKS_PER_LEVEL;
  const step = [1, 3, 7, 9][(h >>> 8) % 4];
  const salt = 1 + ((h >>> 4) % 99991);
  return salt * TRACKS_PER_LEVEL + (base + race * step) % TRACKS_PER_LEVEL;
}

// MODO CAOS: devolve uma cópia da pista com CAIXAS DE ITEM espalhadas perto do
// centro (fáceis de pegar, ao contrário do bônus arriscado). Não muta o cache.
export function withChaosItems(def: TrackDef): TrackDef {
  const path = def.path; const N = path.length;
  const arcs = [0]; let acc = 0;
  for (let i = 1; i < N; i++) { acc += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y); arcs.push(acc); }
  const total = acc;
  const atArc = (a: number): { p: V; i: number } => { let i = 1; while (i < N - 1 && arcs[i] < a) i++; const seg = arcs[i] - arcs[i - 1] || 1; const t = (a - arcs[i - 1]) / seg; return { p: vec(path[i - 1].x + (path[i].x - path[i - 1].x) * t, path[i - 1].y + (path[i].y - path[i - 1].y) * t), i }; };
  const rng = mulberry(def.id * 2657 + 13);
  const obstacles = def.obstacles.slice();
  const nBox = 6 + Math.floor(rng() * 3);      // 6..8 caixas ao longo da pista
  for (let k = 0; k < nBox; k++) {
    const a = ((k + 0.5) / nBox) * total * 0.92 + total * 0.05;
    const { p: pp, i } = atArc(a); const nrm = normalAt(path, i);
    const off = (rng() < 0.5 ? -1 : 1) * (def.half[Math.min(N - 1, i)] || 4) * (rng() * 0.28);   // quase no centro
    const x = pp.x + nrm.x * off, y = pp.y + nrm.y * off;
    // evita nascer colada num buraco/bomba
    if (def.obstacles.some(o => (o.type === 'hole' || o.type === 'bomb') && (o.x - x) ** 2 + (o.y - y) ** 2 < 9)) continue;
    obstacles.push({ type: 'item', x, y, r: 1.15 });
  }
  return { ...def, obstacles };
}
export function randomTrack(level: number, rng = Math.random): TrackDef { return track(level, Math.floor(rng() * TRACKS_PER_LEVEL)); }
export function randomAny(rng = Math.random): TrackDef { return track(Math.floor(rng() * 5), Math.floor(rng() * TRACKS_PER_LEVEL)); }

// ------------------------------------------------------------ EDITOR DE PISTA
export interface CustomTrackData {
  id: string; name: string; theme: number; half: number;
  pts: { x: number; y: number }[];
  obstacles: { type: string; x: number; y: number; r?: number; n?: number }[];
  patches?: { surface: string; x: number; y: number; r?: number; dir?: number }[];
  protect?: number;                 // 0..1 fração de muro (1 = pista toda murada)
  openArcs?: number[];              // arcos (no mundo já enquadrado) onde o muro foi apagado à mão
}
export const CUSTOM_SURFACES = ['sand', 'mud', 'water', 'grass', 'ice', 'gum', 'magnet', 'vortex', 'ramp', 'push'];
// monta uma TrackDef jogável a partir do desenho do usuário: suaviza e reamostra
// o traçado, cria o corredor com muros dos dois lados (bem protegido, pra ser
// divertido), checkpoints automáticos e a chegada no fim.
export function buildCustomTrack(data: CustomTrackData): TrackDef {
  const ALL = [...THEMES, ...THEMES_NEW];
  const theme = ALL[((data.theme % ALL.length) + ALL.length) % ALL.length];
  const half0 = clamp(data.half || 4.2, 3.2, 6.5);
  let raw = data.pts.map(p => vec(p.x, p.y));
  if (raw.length < 2) raw = [vec(10, 10), vec(40, 30)];
  // 1) reamostra em espaçamento fixo (linear)
  const dense: V[] = [raw[0]];
  const SP = 2.2;
  for (let i = 1; i < raw.length; i++) {
    const a = dense[dense.length - 1], b = raw[i]; const d = Math.hypot(b.x - a.x, b.y - a.y);
    const n = Math.max(1, Math.round(d / SP));
    for (let k = 1; k <= n; k++) dense.push(vec(a.x + (b.x - a.x) * k / n, a.y + (b.y - a.y) * k / n));
  }
  // 2) suaviza (média móvel) pra ficar dirigível
  let path = dense;
  for (let pass = 0; pass < 3; pass++) {
    const out: V[] = [path[0]];
    for (let i = 1; i < path.length - 1; i++) out.push(vec((path[i - 1].x + 2 * path[i].x + path[i + 1].x) / 4, (path[i - 1].y + 2 * path[i].y + path[i + 1].y) / 4));
    out.push(path[path.length - 1]); path = out;
  }
  const N = path.length;

  // enquadra na mesa com margem
  const m = half0 + 6;
  let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
  for (const q of path) { if (q.x < minx) minx = q.x; if (q.y < miny) miny = q.y; if (q.x > maxx) maxx = q.x; if (q.y > maxy) maxy = q.y; }
  const dxs = m - minx, dys = m - miny;
  for (const q of path) { q.x += dxs; q.y += dys; }
  const w = Math.ceil(maxx - minx + 2 * m), h = Math.ceil(maxy - miny + 2 * m);

  const arcs = [0]; let acc = 0;
  for (let i = 1; i < N; i++) { acc += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y); arcs.push(acc); }
  const total = acc;
  const atArc = (a: number): { p: V; i: number } => { let i = 1; while (i < N - 1 && arcs[i] < a) i++; const seg = arcs[i] - arcs[i - 1] || 1; const t = (a - arcs[i - 1]) / seg; return { p: vec(path[i - 1].x + (path[i].x - path[i - 1].x) * t, path[i - 1].y + (path[i].y - path[i - 1].y) * t), i }; };
  const onPath = (a: number, off = 0): V => { const { p: pp, i } = atArc(a); const n = normalAt(path, i); return vec(pp.x + n.x * off, pp.y + n.y * off); };

  const halfArr: number[] = [];
  for (let i = 0; i < N; i++) { let hw = half0; if (arcs[i] < 12) hw = Math.max(hw, half0 + 3 * (1 - arcs[i] / 12)); if (total - arcs[i] < 8) hw += 0.8; halfArr.push(hw); }

  // MURO seguindo o traçado PONTO A PONTO (segue as curvas certinho — passo 1/2)
  const walls: Wall[] = []; const step = N > 130 ? 2 : 1;
  const protect = data.protect == null ? 1 : Math.max(0, Math.min(1, data.protect));
  const nearEnd = (a: number) => a < 11 || total - a < 9;                 // largada/chegada sempre muradas
  const openA = data.openArcs || [];
  const isOpen = (a: number) => openA.some(o => Math.abs(o - a) < 4.5);   // trecho apagado à mão
  for (let i = step; i < N; i += step) {
    const j = i - step; const am = (arcs[i] + arcs[j]) / 2;
    if (!nearEnd(am)) {
      if (isOpen(am)) continue;                                           // muro apagado pelo usuário no 3D
      if (protect < 1 && ((i * 2654435761 >>> 8) % 1000) / 1000 >= protect) continue;   // proteção parcial (determinístico)
    }
    const nj = normalAt(path, j), ni = normalAt(path, i);
    walls.push({ a: vec(path[j].x + nj.x * halfArr[j], path[j].y + nj.y * halfArr[j]), b: vec(path[i].x + ni.x * halfArr[i], path[i].y + ni.y * halfArr[i]) });
    walls.push({ a: vec(path[j].x - nj.x * halfArr[j], path[j].y - nj.y * halfArr[j]), b: vec(path[i].x - ni.x * halfArr[i], path[i].y - ni.y * halfArr[i]) });
  }

  // checkpoints automáticos
  const checkpoints: V[] = [vec(path[0].x, path[0].y)];
  const nCP = clamp(Math.round(total / 90), 2, 6);
  for (let k = 1; k <= nCP; k++) checkpoints.push(onPath(total * k / (nCP + 1)));

  // direção da pista no ponto mais próximo (pra orientar rampas/setas do usuário)
  const dirAtXY = (x: number, y: number): number => {
    let bi = 1, bd = 1e9; for (let i = 1; i < N; i++) { const dx = path[i].x - x, dy = path[i].y - y, d = dx * dx + dy * dy; if (d < bd) { bd = d; bi = i; } }
    const t = tangentAt(path, bi); return Math.atan2(t.y, t.x);
  };
  // obstáculos do usuário (deslocados junto com o enquadramento)
  const obstacles: Obstacle[] = [];
  for (const o of data.obstacles) {
    const x = o.x + dxs, y = o.y + dys;
    if (o.type === 'jump') obstacles.push({ type: 'jump', x, y, r: o.r || 1.6, dir: dirAtXY(x, y) });
    else if (o.type === 'car') obstacles.push({ type: 'car', x, y, r: 0.9, dir: dirAtXY(x, y) + 0.5 });
    else if (o.type === 'band') obstacles.push({ type: 'band', x, y, r: o.r || 2.2, dir: dirAtXY(x, y) + 0.6 });
    else if (o.type === 'mill') obstacles.push({ type: 'mill', x, y, r: o.r || 2.2, dir: 0, n: 2 });
    else obstacles.push({ type: o.type as any, x, y, r: o.r || (o.type === 'bonus' ? 1.1 : o.type === 'bomb' ? 0.95 : o.type === 'item' ? 1.15 : o.type === 'top' ? 0.95 : o.type === 'balloon' ? 1.05 : 1.2), n: o.n });
  }
  // superfícies (areia/lama/água/grama/impulso/freio) do usuário
  const patches: Patch[] = [];
  for (const s of (data.patches || [])) {
    const x = s.x + dxs, y = s.y + dys; const r = Math.min(s.r || 2.4, s.surface === 'gum' || s.surface === 'ramp' || s.surface === 'push' ? 2.1 : 99);
    const oriented = s.surface === 'ramp' || s.surface === 'push' || s.surface === 'water';
    const dir = oriented ? dirAtXY(x, y) + (s.surface === 'push' ? Math.PI : 0) : undefined;
    patches.push({ surface: s.surface as any, x, y, r, dir });
  }
  // segurança: nada perigoso em cima de checkpoint
  for (let i = obstacles.length - 1; i >= 0; i--) { const o = obstacles[i]; if (o.type !== 'hole' && o.type !== 'bomb') continue; if (checkpoints.some(cp => (o.x - cp.x) ** 2 + (o.y - cp.y) ** 2 < 5.5 * 5.5)) obstacles.splice(i, 1); }

  const pads = [{ x: path[0].x, y: path[0].y, r: half0 + 3.6 }];
  const start = vec(path[0].x, path[0].y);
  const stan = tangentAt(path, 0); const startAngle = Math.atan2(stan.y, stan.x);
  const fp = path[N - 1], ft = tangentAt(path, N - 1); const fn = { x: -ft.y, y: ft.x };
  const finish: [V, V] = [vec(fp.x + fn.x * (half0 + 0.6), fp.y + fn.y * (half0 + 0.6)), vec(fp.x - fn.x * (half0 + 0.6), fp.y - fn.y * (half0 + 0.6))];

  const def: any = { id: 900, name: data.name || 'Minha Pista', theme: theme.key, level: 2, w, h, ground: theme.ground, paint: theme.paint, bg: theme.bg, wallCol: theme.wall, path, half: halfArr, pads, patches, walls, obstacles, checkpoints, start, startAngle, finish, decor: [] };
  def._shift = { dx: dxs, dy: dys };   // p/ o editor 3D mapear tela↔coords do editor
  def._total = total;                  // comprimento (p/ apagar muro por arco)
  return def;
}
