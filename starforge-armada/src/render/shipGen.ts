// Gerador de naves premium data-driven.
// Cada nave é descrita por um Design (casco, asas, motores, cockpit, paleta) e
// desenhada em camadas: aura, motores animados, asas, fuselagem metálica,
// cockpit envidraçado, detalhes/greebles, luzes de nav, escudo e flash de dano.
// Nariz aponta para cima (-Y). Origem no centro.
import { Ctx, glow, rgba, poly, applyAlpha, vgrad } from './prims';

export interface Palette {
  base: string; light: string; dark: string; accent: string; accent2: string;
}
export type HullStyle = 'arrow' | 'delta' | 'heavy' | 'blade' | 'organic' | 'diamond' | 'hauler' | 'crescent' | 'star' | 'twin';
export type WingStyle = 'swept' | 'long' | 'stub' | 'forward' | 'x' | 'ring' | 'split' | 'none';
export type CockpitStyle = 'single' | 'wide' | 'eye' | 'visor';

export interface ShipDesign {
  hull: HullStyle; wings: WingStyle; engines: 1 | 2 | 3; cockpit: CockpitStyle;
  palette: Palette; detail?: number;
}

export interface ShipDrawOpts {
  tilt?: number; thrust?: number; t: number; shield?: number; damage?: number; invuln?: boolean; rot?: number;
}

export function drawShip(ctx: Ctx, x: number, y: number, S: number, d: ShipDesign, o: ShipDrawOpts): void {
  const tilt = clamp(o.tilt ?? 0, -1, 1);
  const thrust = o.thrust ?? 0.65;
  const t = o.t;
  const P = d.palette;

  if (o.invuln && Math.floor(t * 20) % 2 === 0) return;

  ctx.save();
  ctx.translate(x, y);
  if (o.rot) ctx.rotate(o.rot);
  ctx.rotate(tilt * 0.16);
  ctx.transform(1 - Math.abs(tilt) * 0.13, 0, tilt * 0.06, 1, 0, 0);

  glow(ctx, 0, S * 0.12, S * 2.0, P.accent, 0.14);

  // motores
  const eng = enginePositions(d.engines, d.hull);
  for (const ex of eng) drawEngine(ctx, ex * S, S * 0.82, S, thrust, t, P);

  // asas (atrás da fuselagem)
  drawWings(ctx, S, d, P, t);

  // fuselagem
  drawFuselage(ctx, S, d.hull, P);

  // cockpit
  drawCockpit(ctx, S, d.cockpit, P, t);

  // detalhes
  drawDetails(ctx, S, d, P, t);

  // dano
  if (o.damage && o.damage > 0.01) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = o.damage;
    poly(ctx, hullPts(S, d.hull));
    ctx.fillStyle = 'rgba(255,90,90,0.9)';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  if (o.shield && o.shield > 0.02) drawShield(ctx, x, y, S * 1.6, o.shield, t, P);
}

// ---------------- motores ----------------
function enginePositions(n: number, hull: HullStyle): number[] {
  const wide = hull === 'heavy' || hull === 'hauler' || hull === 'twin';
  if (n === 1) return [0];
  if (n === 2) return wide ? [-0.42, 0.42] : [-0.3, 0.3];
  return wide ? [-0.5, 0, 0.5] : [-0.34, 0, 0.34];
}
function drawEngine(ctx: Ctx, ex: number, ey: number, S: number, thrust: number, t: number, P: Palette): void {
  // bocal
  const g = ctx.createLinearGradient(ex, ey - S * 0.2, ex, ey + S * 0.18);
  g.addColorStop(0, '#39435c'); g.addColorStop(1, '#0e1220');
  ctx.fillStyle = g;
  poly(ctx, [ex - S * 0.15, ey - S * 0.2, ex + S * 0.15, ey - S * 0.2, ex + S * 0.1, ey + S * 0.12, ex - S * 0.1, ey + S * 0.12]);
  ctx.fill();
  // pluma
  const flick = 0.82 + Math.sin(t * 40 + ex) * 0.12 + Math.random() * 0.06;
  const len = S * (0.5 + thrust * 0.9) * flick;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const pg = ctx.createLinearGradient(ex, ey, ex, ey + len);
  pg.addColorStop(0, 'rgba(255,255,255,0.95)');
  pg.addColorStop(0.28, applyAlpha(P.accent, 0.92));
  pg.addColorStop(0.7, applyAlpha(P.accent2, 0.5));
  pg.addColorStop(1, applyAlpha(P.accent2, 0));
  ctx.fillStyle = pg;
  poly(ctx, [ex - S * 0.11, ey, ex + S * 0.11, ey, ex + S * 0.02, ey + len, ex - S * 0.02, ey + len]);
  ctx.fill();
  glow(ctx, ex, ey, S * 0.26 * flick, P.accent, 0.9);
  ctx.restore();
}

// ---------------- asas ----------------
function wingShape(S: number, sd: number, style: WingStyle): number[][] {
  const m = (pts: number[]) => pts.map((v, i) => (i % 2 ? v : v * sd) * S);
  switch (style) {
    case 'swept': return [m([0.1, -0.05, 0.98, 0.34, 0.86, 0.6, 0.3, 0.52, 0.14, 0.2])];
    case 'long': return [m([0.08, -0.2, 1.25, 0.15, 1.15, 0.4, 0.3, 0.4, 0.12, 0.1])];
    case 'stub': return [m([0.14, 0.05, 0.6, 0.2, 0.56, 0.5, 0.2, 0.5])];
    case 'forward': return [m([0.12, 0.4, 1.0, 0.0, 0.92, 0.28, 0.28, 0.55])];
    case 'x': return [m([0.1, -0.1, 0.9, -0.45, 0.78, -0.2, 0.2, 0.05]), m([0.14, 0.2, 0.95, 0.55, 0.82, 0.72, 0.24, 0.45])];
    case 'split': return [m([0.12, -0.05, 0.7, 0.05, 1.05, 0.2, 0.9, 0.4, 0.5, 0.35, 0.16, 0.25])];
    case 'ring': return [];
    case 'none': return [];
  }
}
function drawWings(ctx: Ctx, S: number, d: ShipDesign, P: Palette, t: number): void {
  if (d.wings === 'ring') { drawRing(ctx, S, P, t); return; }
  if (d.wings === 'none') return;
  for (const sd of [-1, 1]) {
    for (const pts of wingShape(S, sd, d.wings)) {
      const g = ctx.createLinearGradient(0, -S * 0.1, sd * S, S * 0.6);
      g.addColorStop(0, P.light); g.addColorStop(0.5, P.base); g.addColorStop(1, P.dark);
      ctx.fillStyle = g; poly(ctx, pts); ctx.fill();
      // linha de painel
      ctx.strokeStyle = 'rgba(8,12,22,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); ctx.lineTo(pts[2], pts[3]); ctx.stroke();
      // luz de ponta de asa
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      glow(ctx, pts[2], pts[3], S * 0.16, P.accent, 0.85);
      ctx.restore();
    }
  }
}
function drawRing(ctx: Ctx, S: number, P: Palette, t: number): void {
  ctx.save();
  ctx.lineWidth = S * 0.14;
  ctx.strokeStyle = P.base;
  ctx.beginPath(); ctx.ellipse(0, S * 0.15, S * 0.95, S * 0.7, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = S * 0.05;
  ctx.strokeStyle = applyAlpha(P.accent, 0.6 + 0.3 * Math.sin(t * 3));
  ctx.beginPath(); ctx.ellipse(0, S * 0.15, S * 0.95, S * 0.7, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

// ---------------- fuselagem ----------------
export function hullPts(S: number, hull: HullStyle): number[] {
  const m = (pts: number[]) => pts.map((v) => v * S);
  switch (hull) {
    case 'arrow': return m([0, -1.02, 0.14, -0.6, 0.2, -0.1, 0.26, 0.55, 0.14, 0.86, -0.14, 0.86, -0.26, 0.55, -0.2, -0.1, -0.14, -0.6]);
    case 'delta': return m([0, -1.05, 0.1, -0.4, 0.5, 0.7, 0.34, 0.9, -0.34, 0.9, -0.5, 0.7, -0.1, -0.4]);
    case 'heavy': return m([0, -0.95, 0.28, -0.7, 0.36, 0.3, 0.3, 0.8, 0.16, 0.95, -0.16, 0.95, -0.3, 0.8, -0.36, 0.3, -0.28, -0.7]);
    case 'blade': return m([0, -1.15, 0.09, -0.4, 0.13, 0.5, 0.08, 0.9, -0.08, 0.9, -0.13, 0.5, -0.09, -0.4]);
    case 'organic': return m([0, -1.0, 0.18, -0.72, 0.24, -0.2, 0.3, 0.4, 0.2, 0.82, 0.08, 0.95, -0.08, 0.95, -0.2, 0.82, -0.3, 0.4, -0.24, -0.2, -0.18, -0.72]);
    case 'diamond': return m([0, -1.1, 0.34, 0, 0.2, 0.55, 0, 0.95, -0.2, 0.55, -0.34, 0]);
    case 'hauler': return m([-0.1, -0.95, 0.1, -0.95, 0.34, -0.6, 0.4, 0.5, 0.34, 0.92, -0.34, 0.92, -0.4, 0.5, -0.34, -0.6]);
    case 'crescent': return m([0, -1.0, 0.16, -0.55, 0.16, 0.2, 0.34, 0.85, 0.12, 0.72, 0, 0.5, -0.12, 0.72, -0.34, 0.85, -0.16, 0.2, -0.16, -0.55]);
    case 'star': return m([0, -1.1, 0.16, -0.3, 0.5, 0.1, 0.22, 0.4, 0.34, 0.95, 0, 0.62, -0.34, 0.95, -0.22, 0.4, -0.5, 0.1, -0.16, -0.3]);
    case 'twin': return m([-0.16, -0.98, -0.02, -0.6, 0.02, -0.6, 0.16, -0.98, 0.32, 0.3, 0.2, 0.9, 0.05, 0.7, -0.05, 0.7, -0.2, 0.9, -0.32, 0.3]);
  }
}
function drawFuselage(ctx: Ctx, S: number, hull: HullStyle, P: Palette): void {
  const pts = hullPts(S, hull);
  // sombra externa
  ctx.fillStyle = '#0b1020';
  poly(ctx, pts.map((v) => v * 1.045)); ctx.fill();
  // corpo metálico (gradiente X)
  const g = ctx.createLinearGradient(-S * 0.3, 0, S * 0.3, 0);
  g.addColorStop(0, P.dark); g.addColorStop(0.25, P.base); g.addColorStop(0.5, P.light);
  g.addColorStop(0.75, P.base); g.addColorStop(1, P.dark);
  ctx.fillStyle = g; poly(ctx, pts); ctx.fill();
  // quilha
  ctx.fillStyle = 'rgba(12,16,30,0.5)';
  poly(ctx, [0, -0.9 * S, 0.05 * S, -0.2 * S, 0.05 * S, 0.7 * S, -0.05 * S, 0.7 * S, -0.05 * S, -0.2 * S]);
  ctx.fill();
  // rim light do nariz
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const noseY = pts[1];
  const rg = ctx.createLinearGradient(0, noseY, 0, noseY * 0.3);
  rg.addColorStop(0, 'rgba(200,230,255,0.8)');
  rg.addColorStop(1, 'rgba(200,230,255,0)');
  ctx.fillStyle = rg;
  poly(ctx, [0, noseY, 0.13 * S, noseY * 0.6, 0, noseY * 0.5, -0.13 * S, noseY * 0.6]);
  ctx.fill();
  ctx.restore();
  // contorno
  ctx.strokeStyle = applyAlpha(P.light, 0.28); ctx.lineWidth = 1;
  poly(ctx, pts); ctx.stroke();
}

// ---------------- cockpit ----------------
function drawCockpit(ctx: Ctx, S: number, style: CockpitStyle, P: Palette, t: number): void {
  const cy = -S * 0.3;
  const glass = (w: number, h: number, top: number) => {
    ctx.fillStyle = '#121a2c';
    poly(ctx, [0, top - S * 0.06, w + S * 0.02, top + h * 0.4, w * 0.7, top + h, -w * 0.7, top + h, -(w + S * 0.02), top + h * 0.4]);
    ctx.fill();
    const g = ctx.createRadialGradient(0, cy - S * 0.07, S * 0.02, 0, cy, S * 0.24);
    g.addColorStop(0, 'rgba(220,248,255,0.98)');
    g.addColorStop(0.4, applyAlpha(P.accent, 0.9));
    g.addColorStop(1, applyAlpha(P.accent2, 0.85));
    ctx.fillStyle = g;
    poly(ctx, [0, top, w, top + h * 0.42, w * 0.65, top + h * 0.92, -w * 0.65, top + h * 0.92, -w, top + h * 0.42]);
    ctx.fill();
    // brilho especular
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.45 + 0.35 * Math.sin(t * 1.5);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.ellipse(-w * 0.25, cy - S * 0.04, w * 0.22, h * 0.28, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };
  switch (style) {
    case 'single': glass(S * 0.1, S * 0.5, -S * 0.55); break;
    case 'wide': glass(S * 0.16, S * 0.42, -S * 0.5); break;
    case 'visor':
      ctx.fillStyle = '#101828'; poly(ctx, [-S * 0.2, -S * 0.36, S * 0.2, -S * 0.36, S * 0.16, -S * 0.2, -S * 0.16, -S * 0.2]); ctx.fill();
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = applyAlpha(P.accent, 0.85 + 0.15 * Math.sin(t * 3));
      poly(ctx, [-S * 0.17, -S * 0.32, S * 0.17, -S * 0.32, S * 0.14, -S * 0.24, -S * 0.14, -S * 0.24]); ctx.fill();
      ctx.restore();
      break;
    case 'eye':
      glow(ctx, 0, cy, S * 0.36, P.accent, 0.7 + 0.2 * Math.sin(t * 4));
      ctx.fillStyle = '#0e1626'; ctx.beginPath(); ctx.arc(0, cy, S * 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = applyAlpha(P.accent, 0.95); ctx.beginPath(); ctx.arc(0, cy, S * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-S * 0.03, cy - S * 0.03, S * 0.04, 0, Math.PI * 2); ctx.fill();
      break;
  }
}

// ---------------- detalhes ----------------
function drawDetails(ctx: Ctx, S: number, d: ShipDesign, P: Palette, t: number): void {
  // greebles laterais
  ctx.fillStyle = 'rgba(18,24,40,0.9)';
  ctx.fillRect(0.1 * S, 0.12 * S, 0.05 * S, 0.26 * S);
  ctx.fillRect(-0.15 * S, 0.12 * S, 0.05 * S, 0.26 * S);
  // faixa de acento
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = applyAlpha(P.accent, 0.5); ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(-0.08 * S, 0.1 * S); ctx.lineTo(-0.08 * S, 0.55 * S); ctx.moveTo(0.08 * S, 0.1 * S); ctx.lineTo(0.08 * S, 0.55 * S); ctx.stroke();
  // luzes de nav piscando
  const blink = Math.sin(t * 5) > 0;
  if (blink) glow(ctx, 0.5 * S, 0.5 * S, S * 0.08, '#5aff8a', 0.85);
  else glow(ctx, -0.5 * S, 0.5 * S, S * 0.08, '#ff5a6a', 0.85);
  glow(ctx, 0, -0.88 * S, S * 0.12, P.accent, 0.55 + 0.3 * Math.sin(t * 3));
  ctx.restore();
}

// ---------------- escudo ----------------
function drawShield(ctx: Ctx, x: number, y: number, r: number, s: number, t: number, P: Palette): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const a = 0.1 + s * 0.22;
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r);
  g.addColorStop(0, applyAlpha(P.accent, 0));
  g.addColorStop(0.82, applyAlpha(P.accent, a * 0.5));
  g.addColorStop(1, applyAlpha(P.light, a));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = applyAlpha(P.light, 0.32 + 0.22 * Math.sin(t * 3));
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r * 0.98, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

function clamp(v: number, lo: number, hi: number): number { return v < lo ? lo : v > hi ? hi : v; }
