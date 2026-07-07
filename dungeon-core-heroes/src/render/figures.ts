import type { Unit } from '../types';
import { HERO_BY_ID } from '../data/heroesData';
import { ENEMY_BY_ID } from '../data/enemiesData';
import { SUMMONS } from '../data/skillsData';

// ============ DESENHO PROCEDURAL DE FIGURAS (2.5D lateral) ============
// Cada figura é desenhada centrada nos pés (0,0), virada para +x.
// unit.facing e a posição são aplicados pelo chamador.

type Ctx = CanvasRenderingContext2D;
interface Pose { legF: number; legB: number; armF: number; armB: number; lean: number; bob: number; crouch: number; }

function poseFor(u: Unit, t: number): Pose {
  const p: Pose = { legF: 0, legB: 0, armF: 0, armB: 0, lean: 0, bob: 0, crouch: 0 };
  const at = u.animT;
  switch (u.anim) {
    case 'walk': {
      const w = t * 9;
      p.legF = Math.sin(w) * 0.5; p.legB = -Math.sin(w) * 0.5;
      p.armF = -Math.sin(w) * 0.4; p.armB = Math.sin(w) * 0.4;
      p.bob = Math.abs(Math.sin(w)) * 0.04; p.lean = 0.06;
      break;
    }
    case 'attack': { const k = Math.sin(Math.min(1, at / 0.3) * Math.PI); p.armF = -1.3 * k; p.lean = 0.14 * k; p.legF = 0.2 * k; break; }
    case 'cast': { const k = Math.sin(Math.min(1, at / 0.3) * Math.PI); p.armF = -0.9 * k; p.armB = -0.9 * k; p.lean = -0.06 * k; break; }
    case 'dash': { p.lean = 0.35; p.legF = 0.6; p.legB = -0.6; p.armB = 0.5; break; }
    case 'hit': { const k = Math.max(0, 1 - at / 0.3); p.lean = -0.2 * k; p.crouch = 0.05 * k; break; }
    case 'death': { p.crouch = Math.min(0.9, at * 1.6); p.lean = -0.3; break; }
    case 'victory': { p.armF = -1.4; p.armB = -1.4; p.bob = Math.abs(Math.sin(t * 4)) * 0.06; break; }
    default: { p.bob = Math.sin(t * 2 + u.uid) * 0.02; p.armF = Math.sin(t * 2) * 0.05; }
  }
  return p;
}

function rr(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function limb(ctx: Ctx, x0: number, y0: number, ang: number, len: number, wdt: number, col: string): { x: number; y: number } {
  const x1 = x0 + Math.sin(ang) * len, y1 = y0 - Math.cos(ang) * len * 0.15 - len * 0.9 * 0;
  const ex = x0 + Math.sin(ang) * len, ey = y0 - Math.cos(ang) * len;
  ctx.strokeStyle = col; ctx.lineWidth = wdt; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(ex, ey); ctx.stroke();
  return { x: ex, y: ey };
}

// desenha um corpo humanoide genérico e retorna pontos-chave para acessórios
interface Body { size: number; pal: { main: string; secondary: string; accent: string; skin: string; hair: string }; robe?: boolean; heavy?: boolean; }
function drawHumanoid(ctx: Ctx, u: Unit, t: number, b: Body): { handF: { x: number; y: number }; handB: { x: number; y: number }; headX: number; headY: number; hipY: number } {
  const p = poseFor(u, t);
  const s = b.size;
  const hipY = -s * (1.5 - p.crouch);        // altura do quadril
  const shoulderY = -s * (2.5 - p.crouch);   // ombros
  const headY = -s * (3.0 - p.crouch);
  const lean = p.lean;
  const legLen = s * 1.5, armLen = s * 1.2;

  // pernas
  const legCol = b.pal.secondary;
  limb(ctx, -s * 0.18, hipY, Math.PI + p.legB * 1.2, legLen, s * 0.34, legCol);
  limb(ctx, s * 0.18, hipY, Math.PI + p.legF * 1.2, legLen, s * 0.34, legCol);

  // torso (inclina com lean)
  ctx.save();
  ctx.translate(0, hipY);
  ctx.rotate(lean);
  ctx.translate(0, -hipY);
  const torsoTop = shoulderY, torsoBot = hipY;
  if (b.robe) {
    ctx.fillStyle = b.pal.main;
    ctx.beginPath();
    ctx.moveTo(-s * 0.42, torsoTop); ctx.lineTo(s * 0.42, torsoTop);
    ctx.lineTo(s * 0.7, torsoBot + s * 0.2); ctx.lineTo(-s * 0.7, torsoBot + s * 0.2);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = b.pal.accent;
    ctx.fillRect(-s * 0.08, torsoTop, s * 0.16, (torsoBot - torsoTop) + s * 0.2);
  } else {
    ctx.fillStyle = b.pal.main;
    rr(ctx, -s * 0.4, torsoTop, s * 0.8, torsoBot - torsoTop + s * 0.1, s * 0.22); ctx.fill();
    if (b.heavy) { ctx.fillStyle = b.pal.accent; rr(ctx, -s * 0.42, torsoTop, s * 0.84, s * 0.4, s * 0.18); ctx.fill(); }
  }
  // braço de trás
  const handB = limb(ctx, -s * 0.28, shoulderY + s * 0.1, Math.PI * 0.85 + p.armB * 1.3, armLen, s * 0.26, b.pal.secondary);
  // cabeça
  const hx = 0, hy = headY;
  ctx.fillStyle = b.pal.skin;
  ctx.beginPath(); ctx.arc(hx, hy, s * 0.42, 0, Math.PI * 2); ctx.fill();
  // cabelo/capuz
  ctx.fillStyle = b.pal.hair;
  ctx.beginPath(); ctx.arc(hx, hy - s * 0.08, s * 0.44, Math.PI * 1.05, Math.PI * 2.0); ctx.fill();
  if (b.robe) { // capuz
    ctx.fillStyle = b.pal.main; ctx.beginPath();
    ctx.arc(hx, hy - s * 0.02, s * 0.5, Math.PI * 0.95, Math.PI * 2.05); ctx.fill();
  }
  // olho brilhante
  ctx.fillStyle = b.pal.accent;
  ctx.beginPath(); ctx.arc(hx + s * 0.16, hy - s * 0.02, s * 0.07, 0, Math.PI * 2); ctx.fill();
  // braço da frente
  const handF = limb(ctx, s * 0.28, shoulderY + s * 0.1, Math.PI * 0.85 + p.armF * 1.3, armLen, s * 0.28, b.pal.main);
  ctx.restore();

  return { handF, handB, headX: hx, headY: hy, hipY };
}

// ============ ACESSÓRIOS / PROPS POR HERÓI ============
function circle(ctx: Ctx, x: number, y: number, r: number, col: string): void { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
function line(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, w: number, col: string): void { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }

export function drawHeroFigure(ctx: Ctx, u: Unit, t: number, size: number): void {
  const hero = HERO_BY_ID[u.defId];
  if (!hero) return;
  const pal = hero.palette;
  const painter = hero.painter;
  const s = size;
  const glow = u.anim === 'cast' || u.anim === 'victory';
  if (glow) { ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = 18; }

  const robe = ['mago', 'clériga', 'druida', 'necromante', 'alquimista', 'engenheira'].includes(painter);
  const heavy = painter === 'guerreiro';
  const kp = drawHumanoid(ctx, u, t, { size: s, pal: { main: pal.main, secondary: pal.secondary, accent: pal.accent, skin: pal.skin, hair: pal.hair }, robe, heavy });
  const { handF, handB } = kp;

  ctx.save();
  switch (painter) {
    case 'guerreiro': { // escudo (mão de trás) + martelo (mão da frente)
      ctx.fillStyle = pal.main; ctx.strokeStyle = pal.accent; ctx.lineWidth = s * 0.12;
      ctx.beginPath(); ctx.ellipse(handB.x - s * 0.1, handB.y, s * 0.5, s * 0.7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      circle(ctx, handB.x - s * 0.1, handB.y, s * 0.14, pal.accent);
      line(ctx, handF.x, handF.y, handF.x + s * 0.1, handF.y - s * 1.3, s * 0.18, '#6a5038');
      ctx.fillStyle = pal.secondary; rr(ctx, handF.x - s * 0.25, handF.y - s * 1.7, s * 0.7, s * 0.55, s * 0.12); ctx.fill();
      break;
    }
    case 'arqueira': { // arco (mão de trás) + flecha (frente)
      ctx.strokeStyle = pal.accent; ctx.lineWidth = s * 0.1;
      ctx.beginPath(); ctx.arc(handB.x, handB.y, s * 0.9, -Math.PI * 0.55, Math.PI * 0.55); ctx.stroke();
      line(ctx, handB.x + Math.cos(-0.55 * Math.PI) * s * 0.9, handB.y + Math.sin(-0.55 * Math.PI) * s * 0.9, handB.x + Math.cos(0.55 * Math.PI) * s * 0.9, handB.y + Math.sin(0.55 * Math.PI) * s * 0.9, s * 0.05, '#d8d0c0');
      line(ctx, handB.x - s * 0.2, handB.y, handF.x + s * 0.5, handF.y, s * 0.06, pal.glow);
      break;
    }
    case 'mago': { // cajado com chama
      line(ctx, handF.x, handF.y + s * 0.5, handF.x, handF.y - s * 1.6, s * 0.14, '#5a4030');
      circle(ctx, handF.x, handF.y - s * 1.7, s * 0.32, pal.accent);
      circle(ctx, handF.x, handF.y - s * 1.7, s * 0.18, pal.glow);
      break;
    }
    case 'ladino': { // duas adagas
      line(ctx, handF.x, handF.y, handF.x + s * 0.7, handF.y - s * 0.3, s * 0.12, pal.accent);
      line(ctx, handB.x, handB.y, handB.x - s * 0.6, handB.y + s * 0.3, s * 0.12, pal.accent);
      break;
    }
    case 'clériga': { // cajado solar
      line(ctx, handF.x, handF.y + s * 0.4, handF.x, handF.y - s * 1.7, s * 0.13, '#c8b070');
      circle(ctx, handF.x, handF.y - s * 1.8, s * 0.28, pal.accent);
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; line(ctx, handF.x + Math.cos(a) * s * 0.3, handF.y - s * 1.8 + Math.sin(a) * s * 0.3, handF.x + Math.cos(a) * s * 0.5, handF.y - s * 1.8 + Math.sin(a) * s * 0.5, s * 0.05, pal.glow); }
      break;
    }
    case 'druida': { // cajado com folha
      line(ctx, handF.x, handF.y + s * 0.4, handF.x - s * 0.1, handF.y - s * 1.6, s * 0.14, '#6a4a30');
      ctx.fillStyle = pal.accent; ctx.beginPath(); ctx.ellipse(handF.x - s * 0.1, handF.y - s * 1.7, s * 0.18, s * 0.34, 0.5, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'monge': { // faixas nas mãos + brilho
      circle(ctx, handF.x, handF.y, s * 0.22, pal.accent);
      circle(ctx, handB.x, handB.y, s * 0.2, pal.secondary);
      if (u.anim === 'attack') circle(ctx, handF.x + s * 0.3, handF.y, s * 0.28, pal.glow);
      break;
    }
    case 'engenheira': { // chave inglesa
      line(ctx, handF.x, handF.y, handF.x + s * 0.5, handF.y - s * 0.6, s * 0.16, '#9aa0a8');
      circle(ctx, handF.x + s * 0.5, handF.y - s * 0.6, s * 0.16, pal.accent);
      break;
    }
    case 'necromante': { // foice
      line(ctx, handF.x, handF.y + s * 0.4, handF.x, handF.y - s * 1.8, s * 0.12, '#3a3040');
      ctx.strokeStyle = pal.accent; ctx.lineWidth = s * 0.14;
      ctx.beginPath(); ctx.arc(handF.x + s * 0.3, handF.y - s * 1.7, s * 0.5, Math.PI, Math.PI * 1.9); ctx.stroke();
      break;
    }
    case 'alquimista': { // frasco borbulhante
      ctx.fillStyle = pal.accent; rr(ctx, handF.x - s * 0.16, handF.y - s * 0.4, s * 0.32, s * 0.5, s * 0.1); ctx.fill();
      circle(ctx, handF.x, handF.y - s * 0.15, s * 0.1, pal.glow);
      break;
    }
  }
  ctx.restore();
  if (glow) ctx.restore();
}

// ============ INIMIGOS (por arquétipo de pintor) ============
export function drawEnemyFigure(ctx: Ctx, u: Unit, t: number, size: number): void {
  const def = ENEMY_BY_ID[u.defId];
  if (!def) return;
  const v = def.visual, pal = v.palette;
  const s = size;
  const glow = pal.glow;
  if (glow) { ctx.save(); ctx.shadowColor = glow; ctx.shadowBlur = 12; }
  const p = poseFor(u, t);
  const bob = Math.sin(t * 3 + u.uid) * s * 0.06 + p.bob * s * 10;

  const humanoidLike = ['skeleton', 'zombie', 'kobold', 'knight', 'gladiator', 'shaman', 'wraith', 'ghost', 'imp', 'brute', 'demon', 'demon-lord', 'lich-king', 'gladiator-lord', 'construct', 'construct-lord', 'bone-colossus', 'plant-queen', 'twin-wraith', 'core', 'skeleton-servant', 'doll', 'eye', 'maw', 'horror', 'elemental'];

  ctx.translate(0, -bob);
  if (['slime'].includes(v.painter)) {
    const wob = 1 + Math.sin(t * 6 + u.uid) * 0.08;
    ctx.fillStyle = pal.body; ctx.beginPath();
    ctx.ellipse(0, -s * 0.5, s * 0.7 / wob, s * 0.55 * wob, 0, 0, Math.PI * 2); ctx.fill();
    circle(ctx, -s * 0.2, -s * 0.6, s * 0.1, pal.accent); circle(ctx, s * 0.2, -s * 0.6, s * 0.1, pal.accent);
  } else if (['rat', 'hound', 'lizard'].includes(v.painter)) {
    ctx.fillStyle = pal.body; ctx.beginPath(); ctx.ellipse(0, -s * 0.45, s * 0.75, s * 0.4, 0, 0, Math.PI * 2); ctx.fill();
    circle(ctx, s * 0.6, -s * 0.55, s * 0.28, pal.body); // cabeça
    circle(ctx, s * 0.7, -s * 0.6, s * 0.06, pal.accent);
    line(ctx, -s * 0.7, -s * 0.45, -s * 1.1, -s * 0.3, s * 0.08, pal.body); // cauda
    const w = Math.sin(t * 12) * s * 0.15;
    line(ctx, -s * 0.2, -s * 0.1, -s * 0.25, 0, s * 0.1, pal.body);
    line(ctx, s * 0.3, -s * 0.1, s * 0.3 + w, 0, s * 0.1, pal.body);
  } else if (['bat', 'wasp'].includes(v.painter)) {
    const flap = Math.sin(t * 18) * s * 0.5;
    ctx.fillStyle = pal.body; circle(ctx, 0, -s * 0.8, s * 0.28, pal.body);
    ctx.fillStyle = pal.accent;
    ctx.beginPath(); ctx.moveTo(0, -s * 0.8); ctx.lineTo(-s * 0.9, -s * 0.8 - flap); ctx.lineTo(-s * 0.5, -s * 0.6); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -s * 0.8); ctx.lineTo(s * 0.9, -s * 0.8 - flap); ctx.lineTo(s * 0.5, -s * 0.6); ctx.closePath(); ctx.fill();
  } else if (['spider'].includes(v.painter)) {
    ctx.fillStyle = pal.body; ctx.beginPath(); ctx.ellipse(0, -s * 0.5, s * 0.5, s * 0.4, 0, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 4; i++) { const yy = -s * 0.5; const sp = Math.sin(t * 8 + i) * s * 0.1; line(ctx, 0, yy, -s * (0.6 + i * 0.12), yy - s * 0.3 + sp, s * 0.05, pal.body); line(ctx, 0, yy, s * (0.6 + i * 0.12), yy - s * 0.3 - sp, s * 0.05, pal.body); }
    circle(ctx, -s * 0.12, -s * 0.55, s * 0.06, pal.accent); circle(ctx, s * 0.12, -s * 0.55, s * 0.06, pal.accent);
  } else if (['worm', 'serpent'].includes(v.painter)) {
    ctx.strokeStyle = pal.body; ctx.lineWidth = s * 0.4; ctx.lineCap = 'round';
    ctx.beginPath(); for (let i = 0; i <= 8; i++) { const xx = -s * 0.8 + i / 8 * s * 1.6; const yy = -s * 0.4 + Math.sin(t * 6 + i * 0.7) * s * 0.2; if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy); } ctx.stroke();
    circle(ctx, s * 0.8, -s * 0.4, s * 0.22, pal.accent);
  } else if (['plant', 'treant', 'plant-queen'].includes(v.painter)) {
    ctx.fillStyle = pal.body; rr(ctx, -s * 0.3, -s * 1.4, s * 0.6, s * 1.4, s * 0.2); ctx.fill();
    ctx.fillStyle = pal.accent;
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.5; circle(ctx, Math.cos(a) * s * 0.5, -s * 1.4 + Math.sin(a) * s * 0.4, s * 0.22, pal.accent); }
    if (glow) circle(ctx, 0, -s * 1.5, s * 0.18, glow);
  } else if (['golem', 'construct', 'construct-lord', 'bone-colossus', 'brute', 'core', 'maw'].includes(v.painter)) {
    ctx.fillStyle = pal.body; rr(ctx, -s * 0.6, -s * 1.7, s * 1.2, s * 1.5, s * 0.24); ctx.fill();
    ctx.fillStyle = pal.accent; rr(ctx, -s * 0.4, -s * 1.4, s * 0.8, s * 0.5, s * 0.16); ctx.fill();
    circle(ctx, -s * 0.22, -s * 1.15, s * 0.1, glow || '#fff'); circle(ctx, s * 0.22, -s * 1.15, s * 0.1, glow || '#fff');
    // braços
    const sw = Math.sin(t * 4) * s * 0.2;
    line(ctx, -s * 0.6, -s * 1.3, -s * 0.9, -s * 0.5 + sw, s * 0.28, pal.body);
    line(ctx, s * 0.6, -s * 1.3, s * 0.9, -s * 0.5 - sw, s * 0.28, pal.body);
  } else if (['eye', 'wisp'].includes(v.painter)) {
    circle(ctx, 0, -s * 0.7, s * 0.55, pal.body);
    circle(ctx, 0, -s * 0.7, s * 0.28, pal.accent);
    circle(ctx, 0, -s * 0.7, s * 0.12, '#101018');
  } else {
    // humanoide genérico (esqueleto, zumbi, kobold, cavaleiro, xamã, espectro, demônio...)
    const u2 = u;
    drawHumanoid(ctx, u2, t, { size: s * 0.9, pal: { main: pal.body, secondary: shade(pal.body, -20), accent: pal.accent, skin: pal.body, hair: shade(pal.body, -30) }, robe: ['shaman', 'wraith', 'ghost', 'lich-king'].includes(v.painter) });
    void humanoidLike;
  }
  if (glow) ctx.restore();
}

export function drawSummonFigure(ctx: Ctx, u: Unit, t: number, size: number): void {
  const def = SUMMONS[u.defId];
  if (!def) return;
  const pal = def.palette, s = size;
  ctx.save(); ctx.shadowColor = pal.accent; ctx.shadowBlur = 10;
  if (def.painter === 'wolf') {
    ctx.fillStyle = pal.body; ctx.beginPath(); ctx.ellipse(0, -s * 0.5, s * 0.7, s * 0.38, 0, 0, Math.PI * 2); ctx.fill();
    circle(ctx, s * 0.6, -s * 0.65, s * 0.26, pal.body);
    line(ctx, s * 0.75, -s * 0.85, s * 0.9, -s * 1.05, s * 0.08, pal.body); // orelha
    circle(ctx, s * 0.72, -s * 0.68, s * 0.05, pal.accent);
    line(ctx, -s * 0.7, -s * 0.5, -s * 1.1, -s * 0.7, s * 0.1, pal.body);
  } else if (def.painter === 'tower') {
    ctx.fillStyle = pal.body; rr(ctx, -s * 0.35, -s * 1.6, s * 0.7, s * 1.6, s * 0.1); ctx.fill();
    circle(ctx, 0, -s * 1.7, s * 0.3, pal.accent);
    circle(ctx, 0, -s * 1.7, s * 0.16, '#fff');
  } else {
    drawHumanoid(ctx, u, t, { size: s * 0.85, pal: { main: pal.body, secondary: shade(pal.body, -20), accent: pal.accent, skin: pal.body, hair: shade(pal.body, -30) } });
  }
  ctx.restore();
}

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export { shade };
