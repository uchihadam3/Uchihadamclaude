import type { HeroId } from '../types';
import { Pix, ramp, shade, type Ramp } from './pixel';

// ============ SPRITES DE HERÓI EM PIXEL ART ============
// Quadro canônico 32×44, pés no centro-baixo. Personagem virado para a direita.

export const FR_W = 32, FR_H = 44;
const FOOT_Y = 42, CX = 16;

export type Anim = 'idle' | 'walk' | 'attack' | 'cast' | 'hit' | 'death' | 'victory';
export const FRAMES: Record<Anim, number> = { idle: 2, walk: 6, attack: 4, cast: 4, hit: 2, death: 5, victory: 2 };

type Weapon = 'hammer' | 'bow' | 'staff' | 'daggers' | 'holystaff' | 'druidstaff' | 'fists' | 'wrench' | 'scythe' | 'flask';
type Helmet = 'greathelm' | 'hood' | 'wizard' | 'cowl' | 'circlet' | 'leaf' | 'band' | 'goggles' | 'skull' | 'mask';

interface HeroStyle {
  skin: string; hair: string; cloth: string; cloth2: string; accent: string; glow: string;
  build: 'heavy' | 'normal' | 'slim';
  helmet: Helmet; cape: boolean; weapon: Weapon;
}

const STYLES: Record<HeroId, HeroStyle> = {
  guerreiro: { skin: '#d8a878', hair: '#7a5a38', cloth: '#5a6a86', cloth2: '#39485f', accent: '#e8c24a', glow: '#8ab0e0', build: 'heavy', helmet: 'greathelm', cape: true, weapon: 'hammer' },
  arqueira: { skin: '#e0b28e', hair: '#2a2018', cloth: '#39664a', cloth2: '#1f3a2a', accent: '#b6ccc0', glow: '#7ce8a8', build: 'slim', helmet: 'hood', cape: false, weapon: 'bow' },
  mago: { skin: '#d8a078', hair: '#c8c0b8', cloth: '#6e2f34', cloth2: '#3c1a20', accent: '#f0842e', glow: '#ffb14e', build: 'slim', helmet: 'wizard', cape: true, weapon: 'staff' },
  ladino: { skin: '#c89878', hair: '#1a1416', cloth: '#7a2636', cloth2: '#3a1220', accent: '#e05262', glow: '#ff6a7a', build: 'slim', helmet: 'cowl', cape: false, weapon: 'daggers' },
  'clériga': { skin: '#e8c0a0', hair: '#e8d8a8', cloth: '#e6dcc0', cloth2: '#b49a5e', accent: '#f4c838', glow: '#ffe890', build: 'normal', helmet: 'circlet', cape: true, weapon: 'holystaff' },
  druida: { skin: '#c8a078', hair: '#5a7040', cloth: '#4c6030', cloth2: '#2b3a1a', accent: '#a8c860', glow: '#c0e878', build: 'normal', helmet: 'leaf', cape: true, weapon: 'druidstaff' },
  monge: { skin: '#d8a878', hair: '#16120e', cloth: '#3c5c7c', cloth2: '#20344c', accent: '#f4d848', glow: '#88d8ff', build: 'normal', helmet: 'band', cape: false, weapon: 'fists' },
  engenheira: { skin: '#e0b088', hair: '#b8502a', cloth: '#8a5a30', cloth2: '#4a3018', accent: '#68b8d8', glow: '#a878e8', build: 'normal', helmet: 'goggles', cape: false, weapon: 'wrench' },
  necromante: { skin: '#e8e0d8', hair: '#f0f0e8', cloth: '#3c3650', cloth2: '#20182e', accent: '#a8e8b8', glow: '#b8ffc8', build: 'slim', helmet: 'skull', cape: true, weapon: 'scythe' },
  alquimista: { skin: '#d8ac88', hair: '#8a4a28', cloth: '#4c6c3c', cloth2: '#293c22', accent: '#c8b838', glow: '#d8f048', build: 'normal', helmet: 'mask', cape: false, weapon: 'flask' },
};

const OUT = '#0c0912';

interface Pose { bob: number; lean: number; fArm: number; bArm: number; fLeg: number; bLeg: number; fLift: number; bLift: number; crouch: number; alpha: number; act: number; }

function pose(anim: Anim, f: number): Pose {
  const p: Pose = { bob: 0, lean: 0, fArm: 0.3, bArm: -0.35, fLeg: 0, bLeg: 0, fLift: 0, bLift: 0, crouch: 0, alpha: 1, act: 0 };
  switch (anim) {
    case 'idle': p.bob = f === 1 ? 1 : 0; p.fArm = 0.32 + (f === 1 ? 0.05 : 0); p.bArm = -0.3; break;
    case 'walk': {
      const ph = (f / FRAMES.walk) * Math.PI * 2;
      p.fLeg = Math.round(Math.sin(ph) * 5); p.bLeg = Math.round(-Math.sin(ph) * 5);
      p.fLift = Math.max(0, Math.round(Math.sin(ph) * 3)); p.bLift = Math.max(0, Math.round(-Math.sin(ph) * 3));
      p.fArm = 0.3 - Math.sin(ph) * 0.7; p.bArm = -0.35 + Math.sin(ph) * 0.7;
      p.bob = Math.abs(Math.sin(ph)) > 0.6 ? -1 : 0; p.lean = 1;
      break;
    }
    case 'attack': {
      const s = [{ a: -1.9, l: -1 }, { a: -2.3, l: -2 }, { a: 1.4, l: 3 }, { a: 0.7, l: 1 }][f];
      p.fArm = s.a; p.lean = s.l; p.bArm = -0.5; p.fLeg = 3; p.bLeg = -2; break;
    }
    case 'cast': {
      const up = [-2.5, -2.7, -2.7, -2.2][f];
      p.fArm = up; p.bArm = up + 0.15; p.lean = f === 1 || f === 2 ? -1 : 0; p.act = f === 1 || f === 2 ? 1 : 0; break;
    }
    case 'hit': p.lean = f === 0 ? -3 : -1; p.crouch = 1; p.fArm = 0.6; p.bArm = 0.1; break;
    case 'death': { const k = f / (FRAMES.death - 1); p.crouch = Math.round(k * 10); p.lean = -Math.round(k * 4); p.alpha = f >= 3 ? 1 - (f - 2) * 0.35 : 1; p.fArm = 0.8; p.bArm = 0.7; break; }
    case 'victory': p.fArm = -2.6; p.bArm = -2.6; p.bob = f === 1 ? -1 : 0; p.act = 1; break;
  }
  return p;
}

const cache = new Map<string, HTMLCanvasElement>();

export function heroFrame(heroId: HeroId, anim: Anim, frame: number): HTMLCanvasElement {
  const key = `${heroId}:${anim}:${frame}`;
  const hit = cache.get(key); if (hit) return hit;
  const cv = drawHero(heroId, anim, frame);
  cache.set(key, cv);
  return cv;
}

function armHand(sx: number, sy: number, ang: number, len: number): [number, number] {
  return [Math.round(sx + Math.sin(ang) * len), Math.round(sy + Math.cos(ang) * len)];
}

function drawHero(heroId: HeroId, anim: Anim, frame: number): HTMLCanvasElement {
  const s = STYLES[heroId];
  const p = pose(anim, frame);
  const P = new Pix(FR_W, FR_H);
  const cl = ramp(s.cloth, OUT), cl2 = ramp(s.cloth2, OUT), sk = ramp(s.skin, OUT), hr = ramp(s.hair, OUT);
  const buildW = s.build === 'heavy' ? 1 : s.build === 'slim' ? -1 : 0;

  const by = -p.crouch; // deslocamento vertical do corpo (agachar/morte)
  const hipY = 26 + by, shoulderY = 15 + by + p.bob, headCy = 8 + by + p.bob;
  const bShoulderX = CX - 4 + p.lean, fShoulderX = CX + 4 + p.lean;
  const torsoX = CX + p.lean;

  // ---- capa (atrás) ----
  if (s.cape) {
    const cp = ramp(s.cloth2, OUT);
    for (let y = shoulderY; y < hipY + 8; y++) {
      const w = 4 + (y - shoulderY) * 0.5;
      const sway = anim === 'walk' ? Math.round(Math.sin((frame / 6) * 6.28) * 2) : 0;
      P.hline(Math.round(torsoX - w / 2 - 3 + sway), y, Math.round(w), cp.shadow);
    }
  }

  // ---- perna de trás ----
  drawLeg(P, torsoX - 3, hipY, p.bLeg, p.bLift, cl2, s.accent);
  // ---- braço de trás ----
  const [bhx, bhy] = armHand(bShoulderX, shoulderY + 1, p.bArm, 9);
  P.limb(bShoulderX, shoulderY + 1, bhx, bhy, 3, cl.shadow);
  P.rect(bhx - 1, bhy - 1, 3, 3, sk.dark);

  // ---- torso ----
  drawTorso(P, torsoX, shoulderY, hipY, cl, s.accent, buildW, s.build === 'heavy');

  // ---- perna da frente ----
  drawLeg(P, torsoX + 3, hipY, p.fLeg, p.fLift, cl, s.accent);

  // ---- cabeça / cabelo / elmo ----
  drawHead(P, torsoX + Math.round(p.lean * 0.4), headCy, sk, hr, s, anim);

  // ---- braço da frente + arma ----
  const [fhx, fhy] = armHand(fShoulderX, shoulderY + 1, p.fArm, 9);
  P.limb(fShoulderX, shoulderY + 1, fhx, fhy, 3, cl.base);
  P.rect(fhx - 1, fhy - 1, 3, 3, sk.base);
  drawWeapon(P, s, fhx, fhy, p, anim, frame);

  // efeito de conjuração (glow nas mãos)
  if (p.act && (anim === 'cast' || anim === 'victory')) {
    P.disc(fhx, fhy, 2, s.glow); P.disc(bhx, bhy, 2, s.glow);
  }

  P.outline(OUT, true);
  P.shade(OUT, 1, 1, 0.18);
  const cv = P.commit();
  if (p.alpha < 1) { const c2 = document.createElement('canvas'); c2.width = FR_W; c2.height = FR_H; const x = c2.getContext('2d')!; x.globalAlpha = p.alpha; x.drawImage(cv, 0, 0); return c2; }
  return cv;
}

function drawTorso(P: Pix, x: number, top: number, bot: number, cl: Ramp, accent: string, bw: number, heavy: boolean): void {
  const halfTop = 4 + bw, halfBot = 5 + bw;
  for (let y = top; y <= bot; y++) {
    const k = (y - top) / (bot - top);
    const hw = Math.round(halfTop + (halfBot - halfTop) * k);
    P.hline(x - hw, y, hw * 2, cl.base);
    P.vline(x - hw, y, 1, cl.shadow); P.vline(x + hw - 1, y, 1, cl.shadow);
    P.vline(x - hw + 1, y, 1, cl.light); // luz na borda esquerda
  }
  // cinto / peitoral
  P.hline(x - halfBot, bot - 3, halfBot * 2, accent);
  P.hline(x - halfBot, bot - 2, halfBot * 2, shade(accent, -0.3));
  if (heavy) { // placas de armadura
    P.hline(x - halfTop, top + 2, halfTop * 2, cl.light);
    P.rect(x - 2, top + 3, 4, 4, cl.light);
  }
}

function drawLeg(P: Pix, rootX: number, hipY: number, dx: number, lift: number, cl: Ramp, boot: string): void {
  const footY = FOOT_Y - lift;
  const kneeX = rootX + Math.round(dx * 0.4), footX = rootX + dx;
  P.limb(rootX, hipY, kneeX, hipY + 6, 3, cl.shadow);
  P.limb(kneeX, hipY + 6, footX, footY - 2, 3, cl.base);
  P.rect(footX - 2, footY - 2, 4, 2, shade(boot, -0.4)); // bota
}

function drawHead(P: Pix, cx: number, cy: number, sk: Ramp, hr: Ramp, s: HeroStyle, anim: Anim): void {
  P.ellipse(cx, cy, 4, 4, sk.base);
  P.ellipse(cx - 1, cy - 1, 3, 3, sk.light);
  // pescoço
  P.rect(cx - 1, cy + 4, 3, 2, sk.shadow);
  // olho
  const eyeX = cx + 2, eyeY = cy;
  P.px(eyeX, eyeY, OUT); P.px(eyeX, eyeY - 1, '#ffffff');
  // cabelo / elmo
  switch (s.helmet) {
    case 'greathelm':
      P.ellipse(cx, cy - 1, 5, 5, s.cloth); P.ellipse(cx - 1, cy - 2, 4, 3, shade(s.cloth, 0.2));
      P.vline(cx + 1, cy - 1, 4, OUT); P.hline(cx - 3, cy, 6, OUT); // fenda em T
      P.px(cx + 2, cy, s.glow); P.rect(cx - 1, cy - 7, 3, 2, s.accent); // crista
      break;
    case 'hood':
      P.ellipse(cx - 1, cy - 1, 5, 5, hr.dark); P.ellipse(cx - 1, cy - 2, 4, 3, hr.shadow);
      P.rect(cx - 5, cy, 3, 4, hr.dark); break;
    case 'wizard':
      P.rect(cx - 5, cy - 3, 10, 3, hr.base); // aba
      for (let i = 0; i < 9; i++) P.hline(cx - 4 + Math.floor(i / 2), cy - 4 - i, Math.max(1, 8 - i), s.cloth); // chapéu pontudo
      P.px(cx - 4 + 4, cy - 12, s.accent); break;
    case 'cowl':
      P.ellipse(cx, cy - 2, 4, 3, hr.dark); P.rect(cx - 4, cy, 8, 2, s.cloth2); // máscara
      P.hline(cx - 3, cy + 1, 6, shade(s.cloth2, -0.2)); break;
    case 'circlet':
      P.ellipse(cx, cy - 2, 5, 4, hr.base); P.ellipse(cx - 1, cy - 3, 4, 3, hr.light);
      P.hline(cx - 4, cy - 1, 8, s.accent); P.px(cx, cy - 3, s.glow); // gema
      // aura
      P.px(cx - 5, cy - 5, s.glow); P.px(cx + 5, cy - 5, s.glow); break;
    case 'leaf':
      P.ellipse(cx, cy - 2, 5, 4, hr.base); P.ellipse(cx - 1, cy - 3, 4, 3, hr.shadow);
      P.limb(cx + 3, cy - 3, cx + 6, cy - 6, 2, s.accent); P.limb(cx - 3, cy - 3, cx - 6, cy - 6, 2, s.accent); break;
    case 'band':
      P.ellipse(cx, cy - 2, 4, 4, hr.dark); P.hline(cx - 4, cy - 1, 8, s.accent);
      P.limb(cx - 4, cy - 1, cx - 7, cy + 1, 1, s.accent); break; // fita esvoaçante
    case 'goggles':
      P.ellipse(cx, cy - 2, 4, 3, hr.base); P.hline(cx - 4, cy - 4, 8, shade(s.cloth2, -0.2));
      P.rect(cx - 3, cy - 3, 3, 2, s.accent); P.rect(cx + 1, cy - 3, 3, 2, s.accent); break;
    case 'skull':
      P.ellipse(cx, cy - 1, 5, 5, '#e8e4dc'); P.ellipse(cx - 1, cy - 2, 4, 3, '#ffffff');
      P.rect(cx + 1, cy - 1, 2, 2, OUT); P.rect(cx - 3, cy - 1, 2, 2, OUT); // órbitas
      P.hline(cx - 2, cy + 3, 5, OUT); break;
    case 'mask':
      P.ellipse(cx, cy - 2, 4, 4, hr.base); P.rect(cx - 4, cy - 1, 8, 3, s.accent); // respirador
      P.disc(cx, cy + 1, 2, shade(s.accent, -0.3)); break;
  }
  void anim;
}

function drawWeapon(P: Pix, s: HeroStyle, hx: number, hy: number, p: Pose, anim: Anim, frame: number): void {
  const a = s.accent, g = s.glow;
  const swing = anim === 'attack' ? [-1, -1.4, 1, 0.5][frame] : 0;
  switch (s.weapon) {
    case 'hammer': {
      const ex = hx + Math.round(Math.sin(p.fArm + swing) * 10), ey = hy + Math.round(Math.cos(p.fArm + swing) * 10);
      P.limb(hx, hy, ex, ey, 2, '#6a4a30');
      P.rect(ex - 3, ey - 3, 6, 5, '#9aa0aa'); P.rect(ex - 3, ey - 3, 6, 2, '#c8cdd6'); P.rect(ex - 3, ey, 6, 2, '#5a606a'); break;
    }
    case 'bow': {
      const bx = hx - 1;
      for (let i = -8; i <= 8; i++) { const off = Math.round(4 - Math.abs(i) * 0.35); P.px(bx + off, hy + i, a); }
      P.vline(bx + 1, hy - 8, 17, shade(a, 0.3)); // corda
      if (anim === 'attack' && frame >= 2) P.hline(bx + 2, hy, 12, g); // flecha disparada
      else P.hline(bx - 3, hy, 6, '#c8b088'); break;
    }
    case 'staff': case 'druidstaff': {
      const ex = hx + Math.round(Math.sin(p.fArm) * 3), ey = hy - 13;
      P.limb(hx, hy + 2, ex, ey, 2, '#5a4030');
      if (s.weapon === 'staff') { P.disc(ex, ey - 1, 3, a); P.disc(ex, ey - 1, 1, g); if (p.act) P.disc(ex, ey - 1, 4, g); }
      else { P.ellipse(ex, ey - 1, 2, 3, a); P.px(ex, ey - 3, g); }
      break;
    }
    case 'holystaff': {
      const ex = hx, ey = hy - 13;
      P.limb(hx, hy + 2, ex, ey, 2, '#c8a850');
      P.disc(ex, ey - 1, 3, a); P.vline(ex, ey - 5, 4, a); P.hline(ex - 2, ey - 3, 5, a); // cruz solar
      if (p.act) P.disc(ex, ey - 1, 5, g); break;
    }
    case 'daggers': {
      const ex = hx + Math.round(Math.sin(p.fArm + swing) * 6), ey = hy + Math.round(Math.cos(p.fArm + swing) * 6);
      P.limb(hx, hy, ex, ey, 2, a); P.px(ex, ey, g); break;
    }
    case 'fists': {
      P.disc(hx, hy, 2, s.accent); if (p.act || anim === 'attack') P.disc(hx + 2, hy, 2, g); break;
    }
    case 'wrench': {
      const ex = hx + Math.round(Math.sin(p.fArm + swing) * 7), ey = hy + Math.round(Math.cos(p.fArm + swing) * 7);
      P.limb(hx, hy, ex, ey, 2, '#9aa0aa'); P.rect(ex - 1, ey - 2, 3, 3, a); P.px(ex, ey - 2, OUT); break;
    }
    case 'scythe': {
      const ex = hx, ey = hy - 14;
      P.limb(hx, hy + 2, ex, ey, 2, '#2e2838');
      for (let i = 0; i < 6; i++) P.px(ex + i, ey - Math.round(Math.sqrt(i) * 2), a); // lâmina curva
      P.px(ex + 5, ey - 4, g); break;
    }
    case 'flask': {
      P.rect(hx - 2, hy - 1, 5, 6, a); P.rect(hx - 1, hy - 3, 3, 2, '#8a8a8a');
      P.px(hx, hy + 1, g); P.px(hx + 1, hy + 3, g); break; // borbulha
    }
  }
}

// ---------- retrato estático grande (para seleção/hub) ----------
export function heroPortraitFrame(heroId: HeroId, t: number): HTMLCanvasElement {
  const anim: Anim = 'idle'; const f = Math.floor(t * 2) % FRAMES.idle;
  return heroFrame(heroId, anim, f);
}

export function pickAnim(anim: string): Anim {
  if (anim === 'walk' || anim === 'attack' || anim === 'cast' || anim === 'hit' || anim === 'death' || anim === 'victory') return anim;
  if (anim === 'dash') return 'walk';
  return 'idle';
}
