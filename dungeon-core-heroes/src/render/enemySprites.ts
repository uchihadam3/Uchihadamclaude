import { Pix, ramp, shade, type Ramp } from './pixel';
import { ENEMY_BY_ID } from '../data/enemiesData';
import { SUMMONS } from '../data/skillsData';

// ============ SPRITES DE INIMIGO / INVOCAÇÃO EM PIXEL ART ============
export const EFR_W = 34, EFR_H = 38;
const EFOOT = 36, ECX = 17;
const OUT = '#0b0810';

export type EAnim = 'idle' | 'walk' | 'attack' | 'hit' | 'death';
export const ENEMY_FRAMES: Record<EAnim, number> = { idle: 2, walk: 4, attack: 3, hit: 2, death: 4 };

const cache = new Map<string, HTMLCanvasElement>();

interface Vis { painter: string; body: string; accent: string; glow?: string; scale: number; }

export function enemyFrame(enemyId: string, anim: EAnim, frame: number): HTMLCanvasElement {
  const key = `${enemyId}:${anim}:${frame}`;
  const hitc = cache.get(key); if (hitc) return hitc;
  const cv = draw(enemyId, anim, frame);
  cache.set(key, cv);
  return cv;
}

export function summonFrame(summonId: string, anim: EAnim, frame: number): HTMLCanvasElement {
  const key = `sum:${summonId}:${anim}:${frame}`;
  const hitc = cache.get(key); if (hitc) return hitc;
  const s = SUMMONS[summonId];
  const vis: Vis = { painter: s.painter, body: s.palette.body, accent: s.palette.accent, glow: s.palette.accent, scale: 1 };
  const cv = drawVis(vis, anim, frame, false);
  cache.set(key, cv);
  return cv;
}

function draw(enemyId: string, anim: EAnim, frame: number): HTMLCanvasElement {
  const d = ENEMY_BY_ID[enemyId];
  const boss = d.tier === 'chefe' || d.tier === 'subchefe';
  const vis: Vis = { painter: d.visual.painter, body: d.visual.palette.body, accent: d.visual.palette.accent, glow: d.visual.palette.glow, scale: d.visual.scale };
  return drawVis(vis, anim, frame, boss);
}

function bob(anim: EAnim, frame: number): number {
  if (anim === 'walk') return frame % 2 === 0 ? 0 : -1;
  if (anim === 'idle') return frame === 1 ? -1 : 0;
  if (anim === 'hit') return 1;
  return 0;
}
function legSwing(anim: EAnim, frame: number): number {
  if (anim !== 'walk') return 0;
  return [4, 0, -4, 0][frame];
}
function lunge(anim: EAnim, frame: number): number {
  if (anim === 'attack') return [-2, 3, 1][frame];
  if (anim === 'hit') return -3;
  return 0;
}

function drawVis(v: Vis, anim: EAnim, frame: number, boss: boolean): HTMLCanvasElement {
  const P = new Pix(EFR_W, EFR_H);
  const body = ramp(v.body, OUT), acc = ramp(v.accent, OUT);
  const g = v.glow ?? v.accent;
  const dead = anim === 'death';
  const alpha = dead ? 1 - frame * 0.22 : 1;
  const by = bob(anim, frame) - (dead ? frame * 3 : 0);
  const lx = lunge(anim, frame);

  const drawer = ROUTER[v.painter] ?? pawn;
  drawer(P, { body, acc, g, by, lx, ls: legSwing(anim, frame), anim, frame, boss });

  P.outline(OUT, true);
  P.shade(OUT, 1, 1, 0.16);
  const cv = P.commit();
  if (alpha < 1 && alpha > 0) { const c2 = document.createElement('canvas'); c2.width = EFR_W; c2.height = EFR_H; const x = c2.getContext('2d')!; x.globalAlpha = Math.max(0, alpha); x.drawImage(cv, 0, dead ? frame * 2 : 0); return c2; }
  return cv;
}

interface Ctx { body: Ramp; acc: Ramp; g: string; by: number; lx: number; ls: number; anim: EAnim; frame: number; boss: boolean; }
type Drawer = (P: Pix, c: Ctx) => void;

// ---------- humanoide genérico (base para muitos arquétipos) ----------
function pawnBase(P: Pix, c: Ctx, opt: { headR: number; tone?: 'bone' | 'flesh'; ragged?: boolean; horns?: boolean; crown?: boolean; eyes?: string; ribs?: boolean }): { hx: number; hy: number; hipY: number } {
  const cx = ECX + c.lx, hipY = 25 + c.by, shoulderY = 13 + c.by, headCy = 7 + c.by;
  const legLen = EFOOT - 1;
  // pernas (avançam para a frente = direita)
  P.limb(cx - 3, hipY, cx - 3 - c.ls, legLen, 3, c.body.shadow);
  P.rect(cx - 4 - c.ls, legLen - 1, 3, 2, c.body.dark);         // pé de trás
  P.limb(cx + 3, hipY, cx + 3 + c.ls, legLen, 3, c.body.base);
  P.rect(cx + 2 + c.ls, legLen - 1, 4, 2, c.body.dark);         // pé da frente
  // braço de trás (colado ao corpo)
  const atk = c.anim === 'attack';
  const bswing = atk ? [-3, 2, 2][c.frame] : c.anim === 'walk' ? -Math.round(c.ls * 0.6) : 0;
  P.limb(cx - 4, shoulderY + 1, cx - 5 + bswing, shoulderY + 9, 3, c.body.shadow);
  // torso (afunila na cintura)
  for (let y = shoulderY; y <= hipY; y++) {
    const k = (y - shoulderY) / (hipY - shoulderY);
    const hw = Math.round(5 - k * 1.5);
    P.hline(cx - hw, y, hw * 2, c.body.base);
    P.vline(cx - hw + 1, y, 1, c.body.light); P.vline(cx + hw - 1, y, 1, c.body.shadow);
  }
  P.hline(cx - 4, hipY - 1, 8, c.acc.base);                     // cinto/quadril
  if (opt.ribs) { for (let r = 0; r < 3; r++) { P.hline(cx - 3, shoulderY + 3 + r * 2, 6, c.body.dark); } P.vline(cx, shoulderY + 2, 8, ramp('#e8e2d6', OUT).light); }
  if (opt.ragged) { P.px(cx - 4, hipY, OUT); P.px(cx - 1, hipY + 2, c.body.shadow); P.px(cx + 3, hipY + 1, OUT); P.px(cx + 4, hipY, c.body.shadow); }
  // braço da frente (ataca à frente)
  const fswing = atk ? [-2, 8, 5][c.frame] : c.anim === 'walk' ? Math.round(c.ls * 0.6) : 1;
  const fex = cx + 4 + fswing, fey = atk && c.frame >= 1 ? shoulderY + 4 : shoulderY + 9;
  P.limb(cx + 4, shoulderY + 1, fex, fey, 3, c.body.base);
  P.rect(fex - 1, fey - 1, 3, 3, (opt.tone === 'bone' ? ramp('#e8e2d6', OUT) : c.body).base); // mão
  // cabeça
  const hx = cx + 1, hy = headCy;
  const skin = opt.tone === 'bone' ? ramp('#e8e2d6', OUT) : c.body;
  P.ellipse(hx, hy, opt.headR, opt.headR, skin.base);
  P.ellipse(hx - 1, hy - 1, opt.headR - 1, opt.headR - 1, skin.light);
  P.rect(hx - 1, hy + opt.headR - 1, 3, 2, skin.shadow);        // pescoço
  const eye = opt.eyes ?? c.g;
  P.rect(hx + 1, hy - 1, 2, 2, OUT); P.px(hx + 2, hy - 1, eye);  // olho da frente brilhante
  if (opt.tone === 'bone') { P.rect(hx - 3, hy - 1, 2, 2, OUT); P.px(hx - 2, hy - 1, eye); P.hline(hx - 2, hy + 2, 4, OUT); } // caveira: 2 órbitas + dentes
  if (opt.horns) { P.limb(hx - 3, hy - 2, hx - 5, hy - 7, 2, c.acc.base); P.limb(hx + 3, hy - 2, hx + 6, hy - 7, 2, c.acc.base); }
  if (opt.crown) { P.hline(hx - 4, hy - opt.headR - 1, 9, c.acc.base); P.px(hx - 3, hy - opt.headR - 2, c.acc.light); P.px(hx + 1, hy - opt.headR - 3, c.g); P.px(hx + 4, hy - opt.headR - 2, c.acc.light); }
  return { hx, hy, hipY };
}
const pawn: Drawer = (P, c) => { pawnBase(P, c, { headR: 4, horns: false }); };

// ---------- gosma ----------
const slime: Drawer = (P, c) => {
  const cx = ECX + c.lx, baseY = EFOOT - 2 + c.by;
  const wob = c.anim === 'walk' ? [0, 1, 0, -1][c.frame] : c.anim === 'idle' ? (c.frame ? 1 : 0) : 0;
  const rx = 9 + wob, ry = 8 - wob;
  P.ellipse(cx, baseY - ry, rx, ry, c.body.base);
  P.ellipse(cx - 2, baseY - ry - 2, rx - 3, ry - 3, c.body.light);
  P.ellipse(cx + 3, baseY - ry + 2, 3, 2, c.body.shadow);
  // brilho
  P.rect(cx - 4, baseY - ry - 3, 3, 2, shade(c.body.light, 0.4));
  // olhos
  P.rect(cx - 3, baseY - ry - 1, 2, 2, OUT); P.rect(cx + 2, baseY - ry - 1, 2, 2, OUT);
  P.px(cx - 3, baseY - ry - 1, '#ffffff'); P.px(cx + 2, baseY - ry - 1, '#ffffff');
  if (c.g) { P.px(cx, baseY - ry + 1, c.g); }
};

// ---------- quadrúpede (rato, cão, lagarto) ----------
const quad: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = EFOOT - 6 + c.by;
  P.ellipse(cx, y, 8, 4, c.body.base); P.ellipse(cx - 2, y - 1, 6, 3, c.body.light);
  // cabeça
  P.ellipse(cx + 7, y - 2, 4, 3, c.body.base); P.px(cx + 9, y - 3, c.g ?? c.acc.base);
  P.limb(cx + 9, y - 4, cx + 11, y - 6, 1, c.acc.base); // orelha
  // patas
  const s = c.ls;
  P.vline(cx - 5, y + 3, 4 - Math.abs(s) % 2, c.body.shadow); P.vline(cx + 4, y + 3, 4 - (Math.abs(s + 1)) % 2, c.body.shadow);
  P.vline(cx - 2, y + 3, 3, c.body.shadow); P.vline(cx + 1, y + 3, 3, c.body.shadow);
  // cauda
  P.limb(cx - 8, y, cx - 12, y - 3, 1, c.body.shadow);
};

// ---------- voador (morcego, vespa) ----------
const flyer: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = 16 + c.by;
  const flap = c.anim === 'idle' ? (c.frame ? 5 : 2) : [2, 6, 3, 6][c.frame % 4];
  P.disc(cx, y, 3, c.body.base); P.disc(cx - 1, y - 1, 2, c.body.light);
  // asas
  P.limb(cx - 1, y, cx - 8, y - flap, 2, c.acc.base); P.limb(cx - 1, y, cx - 7, y - flap + 3, 1, c.acc.shadow);
  P.limb(cx + 1, y, cx + 8, y - flap, 2, c.acc.base); P.limb(cx + 1, y, cx + 7, y - flap + 3, 1, c.acc.shadow);
  P.px(cx + 1, y, c.g ?? '#ff5050'); P.px(cx - 2, y, c.g ?? '#ff5050');
  // ferrão (vespa)
  P.vline(cx, y + 3, 3, c.acc.dark);
};

// ---------- aranha ----------
const spider: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = EFOOT - 8 + c.by;
  P.ellipse(cx, y, 6, 5, c.body.base); P.ellipse(cx - 1, y - 1, 4, 3, c.body.light);
  P.ellipse(cx + 5, y - 1, 3, 2, c.body.shadow); // cabeça
  const t = c.anim === 'walk' ? [0, 1, 0, -1][c.frame] : 0;
  for (let i = 0; i < 4; i++) { const yy = y - 2 + i; P.limb(cx - 3, yy, cx - 9 - i, yy - 3 + t, 1, c.body.shadow); P.limb(cx + 3, yy, cx + 9 + i, yy - 3 - t, 1, c.body.shadow); }
  P.px(cx + 5, y - 1, c.g ?? '#ff4040'); P.px(cx + 6, y, c.g ?? '#ff4040');
};

// ---------- serpente / verme ----------
const worm: Drawer = (P, c) => {
  const cx = ECX + c.lx;
  for (let i = 0; i <= 10; i++) { const x = cx - 9 + i * 2; const yy = EFOOT - 6 + Math.round(Math.sin(i * 0.7 + c.frame) * 3) + c.by; P.disc(x, yy, 3 - Math.floor(i / 6), i > 8 ? c.acc.base : c.body.base); }
  const hx = cx + 11, hy = EFOOT - 6 + Math.round(Math.sin(10 * 0.7 + c.frame) * 3) + c.by;
  P.px(hx, hy - 1, c.g ?? '#ffffff');
};

// ---------- planta / treant ----------
const plant: Drawer = (P, c) => {
  const cx = ECX + c.lx, baseY = EFOOT + c.by;
  P.rect(cx - 3, baseY - 14, 6, 14, c.body.base); P.vline(cx - 3, baseY - 14, 14, c.body.light); P.vline(cx + 2, baseY - 14, 14, c.body.shadow);
  // folhas / pétalas
  const sway = c.anim === 'idle' ? (c.frame ? 1 : 0) : c.ls;
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.6; P.ellipse(cx + Math.round(Math.cos(a) * 6) + sway, baseY - 15 + Math.round(Math.sin(a) * 4), 3, 2, c.acc.base); }
  P.disc(cx + sway, baseY - 15, 2, c.g ?? c.acc.light);
  // olhos no tronco
  P.px(cx - 2, baseY - 8, OUT); P.px(cx + 2, baseY - 8, OUT);
};

// ---------- golem / construto / colosso ----------
const golem: Drawer = (P, c) => {
  const cx = ECX + c.lx, y0 = 6 + c.by;
  P.rect(cx - 7, y0, 14, 20, c.body.base);
  P.rect(cx - 7, y0, 14, 3, c.body.light); P.rect(cx - 7, y0 + 17, 14, 3, c.body.shadow);
  P.rect(cx - 5, y0 + 5, 10, 6, c.acc.base); // núcleo
  P.disc(cx, y0 + 8, 2, c.g ?? c.acc.light);
  P.px(cx - 3, y0 + 3, c.g ?? '#fff'); P.px(cx + 3, y0 + 3, c.g ?? '#fff'); // olhos
  // braços
  const sw = c.anim === 'attack' ? [0, 3, 1][c.frame] : c.ls;
  P.rect(cx - 10, y0 + 4 + sw, 3, 12, c.body.base); P.rect(cx + 7, y0 + 4 - sw, 3, 12, c.body.base);
  // pernas
  P.rect(cx - 5, EFOOT - 6 + c.by, 4, 6, c.body.shadow); P.rect(cx + 2, EFOOT - 6 + c.by, 4, 6, c.body.shadow);
};

// ---------- orbe (olho, wisp) ----------
const orb: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = 16 + c.by;
  P.disc(cx, y, 7, c.body.base); P.disc(cx - 1, y - 1, 5, c.body.light);
  P.disc(cx, y, 4, c.acc.base); P.disc(cx, y, 2, OUT);
  const look = c.anim === 'walk' ? [1, 0, -1, 0][c.frame] : 0;
  P.px(cx + look, y, c.g ?? '#ffffff');
  // vasos/tentáculos
  for (let i = 0; i < 3; i++) P.limb(cx - 4 + i * 4, y + 6, cx - 4 + i * 4 + (i - 1) * 2, y + 11, 1, c.body.shadow);
};

// ---------- shard / cristal ----------
const shard: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = EFOOT - 8 + c.by;
  for (let i = 0; i < 10; i++) { const w = 8 - Math.abs(i - 3); P.hline(cx - Math.floor(w / 2), y - 10 + i, Math.max(1, w), i < 4 ? c.body.light : c.body.base); }
  P.px(cx, y - 6, c.g ?? '#ffffff'); P.px(cx + 1, y - 4, c.g ?? '#ffffff');
};

// ---------- sapo ----------
const toad: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = EFOOT - 6 + c.by;
  P.ellipse(cx, y, 8, 6, c.body.base); P.ellipse(cx - 2, y - 2, 5, 3, c.body.light);
  P.disc(cx - 4, y - 4, 2, c.body.base); P.disc(cx + 4, y - 4, 2, c.body.base); // olhos salientes
  P.px(cx - 4, y - 4, OUT); P.px(cx + 4, y - 4, OUT);
  P.hline(cx - 5, y + 1, 10, c.acc.dark); // boca
  P.vline(cx - 7, y + 3, 3, c.body.shadow); P.vline(cx + 6, y + 3, 3, c.body.shadow);
};

// ---------- lobo (invocação) ----------
const wolf: Drawer = (P, c) => {
  const cx = ECX + c.lx, y = EFOOT - 7 + c.by;
  P.ellipse(cx, y, 8, 4, c.body.base); P.ellipse(cx - 2, y - 1, 6, 3, c.body.light);
  P.ellipse(cx + 7, y - 2, 4, 3, c.body.base);
  P.limb(cx + 8, y - 4, cx + 9, y - 7, 2, c.body.base); // orelha
  P.px(cx + 9, y - 3, c.g ?? '#c0f0c8');
  const s = c.ls;
  P.vline(cx - 5, y + 3, 4, c.body.shadow); P.vline(cx + 4, y + 3, 4, c.body.shadow); P.vline(cx - 2 + s, y + 3, 3, c.body.shadow);
  P.limb(cx - 8, y - 1, cx - 12, y - 5, 2, c.body.base); // cauda
};

// ---------- torre (invocação) ----------
const tower: Drawer = (P, c) => {
  const cx = ECX, baseY = EFOOT + c.by;
  P.rect(cx - 4, baseY - 18, 8, 18, c.body.base); P.vline(cx - 4, baseY - 18, 18, c.body.light); P.vline(cx + 3, baseY - 18, 18, c.body.shadow);
  P.rect(cx - 6, baseY - 2, 12, 2, c.body.shadow);
  P.disc(cx, baseY - 20, 4, c.acc.base); P.disc(cx, baseY - 20, 2, c.g ?? '#fff');
  const pulse = c.frame % 2 ? 1 : 0; P.disc(cx, baseY - 20, 4 + pulse, c.acc.light);
};

// ---------- roteador de arquétipos ----------
const ROUTER: Record<string, Drawer> = {
  slime, rat: quad, hound: quad, lizard: quad, bat: flyer, wasp: flyer, spider,
  worm, serpent: worm, plant, treant: plant, 'plant-queen': plant, golem, construct: golem,
  'construct-lord': golem, 'bone-colossus': golem, core: golem, maw: golem, eye: orb, wisp: orb,
  shard, toad, wolf, tower,
  // humanoides com variações
  skeleton: (P, c) => pawnBase(P, c, { headR: 4, tone: 'bone', ribs: true, eyes: '#ff5a4a' }),
  'skeleton-servant': (P, c) => pawnBase(P, c, { headR: 4, tone: 'bone', ribs: true, eyes: '#a8e8b8' }),
  zombie: (P, c) => pawnBase(P, c, { headR: 4, ragged: true, eyes: '#a8ff88' }),
  kobold: (P, c) => pawnBase(P, c, { headR: 4, horns: true }),
  knight: (P, c) => pawnBase(P, c, { headR: 4, crown: false, eyes: c.g }),
  gladiator: (P, c) => pawnBase(P, c, { headR: 4, crown: true }),
  'gladiator-lord': (P, c) => pawnBase(P, c, { headR: 5, crown: true }),
  shaman: (P, c) => pawnBase(P, c, { headR: 4, ragged: true, horns: true }),
  wraith: (P, c) => pawnBase(P, c, { headR: 4, ragged: true, eyes: c.g }),
  ghost: (P, c) => pawnBase(P, c, { headR: 4, ragged: true, eyes: '#d8d8ff' }),
  imp: (P, c) => pawnBase(P, c, { headR: 3, horns: true, eyes: '#ffd050' }),
  demon: (P, c) => pawnBase(P, c, { headR: 5, horns: true, eyes: '#ffcc50' }),
  'demon-lord': (P, c) => pawnBase(P, c, { headR: 5, horns: true, crown: true, eyes: '#ffcc50' }),
  'lich-king': (P, c) => pawnBase(P, c, { headR: 4, tone: 'bone', crown: true, eyes: '#f0e078' }),
  doll: (P, c) => pawnBase(P, c, { headR: 4, eyes: '#ff88b8' }),
  brute: (P, c) => pawnBase(P, c, { headR: 5, horns: false }),
  horror: (P, c) => pawnBase(P, c, { headR: 5, horns: true, eyes: c.g }),
  'twin-wraith': (P, c) => pawnBase(P, c, { headR: 4, ragged: true, eyes: c.g }),
  elemental: (P, c) => pawnBase(P, c, { headR: 4, eyes: c.g }),
};
