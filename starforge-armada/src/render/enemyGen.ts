// Gerador de arte de inimigos data-driven: 20 arquétipos desenhados em camadas
// a partir de uma paleta do setor, com glow, luz de borda e núcleos pulsantes.
// Contrasta com as naves do jogador (cores quentes/estranhas por setor).
import { Ctx, glow, rgba, poly, applyAlpha, vgrad } from './prims';
import type { Palette } from './shipGen';
import type { Archetype } from '../data/enemiesData';

export function drawEnemyGen(ctx: Ctx, arch: Archetype, x: number, y: number, S: number, t: number, hit: number, P: Palette): void {
  ctx.save();
  ctx.translate(x, y);
  (DRAW[arch] ?? DRAW.drone)(ctx, S, t, P);
  if (hit > 0.01) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = hit; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(0, 0, S * 1.1, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}

type Draw = (ctx: Ctx, S: number, t: number, P: Palette) => void;
const metal = (ctx: Ctx, S: number, P: Palette): CanvasGradient => vgrad(ctx, 0, -S, S, [[0, P.light], [0.5, P.base], [1, P.dark]]);
const core = (ctx: Ctx, S: number, t: number, P: Palette, r = 0.2, y = 0): void => { const p = 0.6 + 0.4 * Math.sin(t * 5); glow(ctx, 0, y, S * (r + 0.3) * p, P.accent, 0.9); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, y, S * r, 0, Math.PI * 2); ctx.fill(); };

const DRAW: Record<Archetype, Draw> = {
  drone(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.4, P.accent, 0.14); ctx.rotate(Math.sin(t * 2) * 0.1);
    ctx.fillStyle = metal(ctx, S, P);
    const hex: number[] = []; for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; hex.push(Math.cos(a) * S, Math.sin(a) * S); }
    poly(ctx, hex); ctx.fill(); ctx.strokeStyle = applyAlpha(P.accent, 0.4); ctx.lineWidth = 1.2; poly(ctx, hex); ctx.stroke();
    ctx.fillStyle = P.dark; ctx.fillRect(-S * 0.9, -S * 0.2, S * 0.25, S * 0.4); ctx.fillRect(S * 0.65, -S * 0.2, S * 0.25, S * 0.4);
    core(ctx, S, t, P, 0.2);
  },
  fighter(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.12);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const fl = S * (0.8 + Math.random() * 0.2);
    const pg = ctx.createLinearGradient(0, -S * 0.9, 0, -S * 0.9 - fl); pg.addColorStop(0, applyAlpha(P.light, 0.9)); pg.addColorStop(1, applyAlpha(P.accent, 0)); ctx.fillStyle = pg;
    poly(ctx, [-S * 0.18, -S * 0.9, S * 0.18, -S * 0.9, 0, -S * 0.9 - fl]); ctx.fill(); ctx.restore();
    ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, P.base], [1, P.dark]]);
    poly(ctx, [-S * 0.2, -S * 0.2, -S * 1.05, -S * 0.5, -S * 0.5, S * 0.4]); ctx.fill();
    poly(ctx, [S * 0.2, -S * 0.2, S * 1.05, -S * 0.5, S * 0.5, S * 0.4]); ctx.fill();
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [0, S * 1.05, 0.28 * S, 0.2 * S, 0.2 * S, -0.8 * S, -0.2 * S, -0.8 * S, -0.28 * S, 0.2 * S]); ctx.fill();
    core(ctx, S, t, P, 0.12, S * 0.2);
  },
  turret(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.3, P.accent, 0.12);
    ctx.fillStyle = vgrad(ctx, 0, -S * 0.5, S * 0.6, [[0, P.base], [1, P.dark]]);
    ctx.beginPath(); ctx.ellipse(0, S * 0.1, S * 0.95, S * 0.5, 0, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + t * 1.5; glow(ctx, Math.cos(a) * S * 0.8, S * 0.1 + Math.sin(a) * S * 0.42, S * 0.09, P.accent, 0.7); }
    const dg = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.05, 0, 0, S * 0.7); dg.addColorStop(0, P.light); dg.addColorStop(1, P.dark); ctx.fillStyle = dg;
    ctx.beginPath(); ctx.arc(0, -S * 0.05, S * 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.rotate(Math.sin(t * 0.8) * 0.5); ctx.fillStyle = P.dark; ctx.fillRect(-S * 0.1, 0, S * 0.2, S * 0.8); glow(ctx, 0, S * 0.8, S * 0.2, P.accent, 0.8); ctx.restore();
    core(ctx, S, t, P, 0.14, -S * 0.05);
  },
  mine(ctx, S, t, P) {
    const p = 0.5 + 0.5 * Math.sin(t * 4); glow(ctx, 0, 0, S * 1.5, P.accent, 0.1 + p * 0.14); ctx.rotate(t * 0.5);
    ctx.fillStyle = P.dark; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; ctx.save(); ctx.rotate(a); poly(ctx, [-S * 0.12, S * 0.5, S * 0.12, S * 0.5, 0, S * 1.05]); ctx.fill(); glow(ctx, 0, S * 1.02, S * 0.08, P.accent, 0.6); ctx.restore(); }
    const g = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.05, 0, 0, S * 0.62); g.addColorStop(0, P.base); g.addColorStop(1, P.dark); ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, S * 0.55, 0, Math.PI * 2); ctx.fill();
    core(ctx, S, t, P, 0.14);
  },
  elite(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 2.1, P.accent, 0.14);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const sd of [-1, 1]) { const ex = sd * S * 0.55; const fl = S * (0.7 + Math.random() * 0.25); const pg = ctx.createLinearGradient(ex, -S, ex, -S - fl); pg.addColorStop(0, applyAlpha(P.light, 0.9)); pg.addColorStop(1, applyAlpha(P.accent, 0)); ctx.fillStyle = pg; poly(ctx, [ex - S * 0.16, -S, ex + S * 0.16, -S, ex, -S - fl]); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, P.base], [1, P.dark]]);
    poly(ctx, [-S * 0.4, -S * 0.6, -S * 1.5, -S * 0.1, -S * 1.35, S * 0.55, -S * 0.5, S * 0.5]); ctx.fill();
    poly(ctx, [S * 0.4, -S * 0.6, S * 1.5, -S * 0.1, S * 1.35, S * 0.55, S * 0.5, S * 0.5]); ctx.fill();
    for (const sd of [-1, 1]) { ctx.fillStyle = P.dark; ctx.fillRect(sd * S * 1.15 - S * 0.08, S * 0.1, S * 0.16, S * 0.7); glow(ctx, sd * S * 1.15, S * 0.8, S * 0.16, P.accent, 0.8); }
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [0, -S * 1.05, S * 0.5, -S * 0.5, S * 0.6, S * 0.5, S * 0.34, S, -S * 0.34, S, -S * 0.6, S * 0.5, -S * 0.5, -S * 0.5]); ctx.fill();
    core(ctx, S, t, P, 0.2, S * 0.05);
  },
  kamikaze(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.6, P.accent, 0.2 + 0.1 * Math.sin(t * 12));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, 0, -S * 0.9, S * 0.5, P.accent, 0.8); ctx.restore();
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [0, S * 1.15, S * 0.4, -S * 0.2, S * 0.16, -S * 0.7, -S * 0.16, -S * 0.7, -S * 0.4, -S * 0.2]); ctx.fill();
    ctx.fillStyle = P.dark; poly(ctx, [-S * 0.4, -S * 0.2, -S * 0.75, -S * 0.5, -S * 0.2, S * 0.1]); ctx.fill(); poly(ctx, [S * 0.4, -S * 0.2, S * 0.75, -S * 0.5, S * 0.2, S * 0.1]); ctx.fill();
    core(ctx, S, t, P, 0.16, S * 0.4);
  },
  sniper(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.4, P.accent, 0.12);
    ctx.fillStyle = P.dark; ctx.fillRect(-S * 0.09, 0, S * 0.18, S * 1.3); // cano longo
    glow(ctx, 0, S * 1.3, S * 0.16, P.accent, 0.7 + 0.2 * Math.sin(t * 4));
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [0, -S, S * 0.5, -S * 0.3, S * 0.6, S * 0.3, -S * 0.6, S * 0.3, -S * 0.5, -S * 0.3]); ctx.fill();
    ctx.fillStyle = P.base; poly(ctx, [-S * 0.6, 0, -S * 1.0, -S * 0.2, -S * 0.5, S * 0.3]); ctx.fill(); poly(ctx, [S * 0.6, 0, S * 1.0, -S * 0.2, S * 0.5, S * 0.3]); ctx.fill();
    core(ctx, S, t, P, 0.14, -S * 0.2);
  },
  shield(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.12);
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [0, -S * 0.9, S * 0.5, -S * 0.4, S * 0.5, S * 0.5, -S * 0.5, S * 0.5, -S * 0.5, -S * 0.4]); ctx.fill();
    // placa frontal (escudo)
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(0, S * 0.4, 0, S * 1.1); g.addColorStop(0, applyAlpha(P.accent, 0.5)); g.addColorStop(1, applyAlpha(P.accent, 0.05)); ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, S * 0.7, S * 0.85, S * 0.45, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = applyAlpha(P.light, 0.5 + 0.3 * Math.sin(t * 4)); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, S * 0.7, S * 0.85, S * 0.45, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    core(ctx, S, t, P, 0.14, -S * 0.2);
  },
  healer(ctx, S, t, P) {
    const p = 0.5 + 0.5 * Math.sin(t * 3); glow(ctx, 0, 0, S * (1.4 + p * 0.6), '#5affa0', 0.16 + p * 0.14);
    ctx.fillStyle = metal(ctx, S, P); ctx.beginPath(); ctx.ellipse(0, 0, S * 0.7, S * 0.85, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#5affa0'; ctx.fillRect(-S * 0.1, -S * 0.4, S * 0.2, S * 0.8); ctx.fillRect(-S * 0.4, -S * 0.1, S * 0.8, S * 0.2);
    ctx.strokeStyle = applyAlpha('#5affa0', 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, S * (0.9 + p * 0.4), 0, Math.PI * 2); ctx.stroke();
  },
  carrier(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.6, P.accent, 0.1);
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [-S * 0.9, -S * 0.7, S * 0.9, -S * 0.7, S * 1.0, S * 0.7, -S * 1.0, S * 0.7]); ctx.fill();
    ctx.fillStyle = P.dark; for (let i = -2; i <= 2; i++) { ctx.fillRect(i * S * 0.35 - S * 0.1, S * 0.3, S * 0.2, S * 0.4); }
    for (let i = -2; i <= 2; i++) glow(ctx, i * S * 0.35, S * 0.62, S * 0.09, P.accent, 0.6);
    ctx.fillStyle = applyAlpha(P.light, 0.2); ctx.fillRect(-S * 0.8, -S * 0.5, S * 1.6, S * 0.25);
    core(ctx, S, t, P, 0.14, -S * 0.2);
  },
  orb(ctx, S, t, P) {
    const p = 0.6 + 0.4 * Math.sin(t * 4); glow(ctx, 0, 0, S * 1.7 * p, P.accent, 0.3);
    const g = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.05, 0, 0, S); g.addColorStop(0, P.light); g.addColorStop(0.6, P.base); g.addColorStop(1, P.dark); ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, S * 0.7, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(P.accent, 0.6); ctx.lineWidth = 2; ctx.rotate(t); ctx.beginPath(); ctx.ellipse(0, 0, S * 0.95, S * 0.4, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    core(ctx, S, t, P, 0.18);
  },
  wasp(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.4, P.accent, 0.12);
    const flap = Math.sin(t * 14) * 0.3;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = applyAlpha(P.light, 0.4);
    ctx.save(); ctx.rotate(-0.5 + flap); ctx.beginPath(); ctx.ellipse(-S * 0.7, -S * 0.2, S * 0.6, S * 0.28, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.rotate(0.5 - flap); ctx.beginPath(); ctx.ellipse(S * 0.7, -S * 0.2, S * 0.6, S * 0.28, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); ctx.restore();
    ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, P.light], [1, P.dark]]);
    ctx.beginPath(); ctx.ellipse(0, 0, S * 0.32, S * 0.85, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = P.dark; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(-S * 0.3, i * S * 0.3); ctx.lineTo(S * 0.3, i * S * 0.3); ctx.stroke(); }
    core(ctx, S, t, P, 0.12, -S * 0.5);
  },
  larva(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.4, P.accent, 0.14);
    for (let i = 3; i >= 0; i--) { const yy = -S * 0.4 + i * S * 0.4; const rr = S * (0.55 - i * 0.06); const g = ctx.createRadialGradient(0, yy, 0, 0, yy, rr); g.addColorStop(0, P.light); g.addColorStop(1, P.dark); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(Math.sin(t * 3 + i) * S * 0.1, yy, rr, 0, Math.PI * 2); ctx.fill(); }
    core(ctx, S, t, P, 0.16, -S * 0.4);
  },
  sentinel(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.14);
    ctx.fillStyle = P.dark; ctx.fillRect(-S * 0.12, -S * 0.2, S * 0.24, S * 0.9);
    ctx.fillStyle = metal(ctx, S, P); ctx.beginPath(); ctx.ellipse(0, -S * 0.3, S * 0.7, S * 0.55, 0, 0, Math.PI * 2); ctx.fill();
    const look = Math.sin(t * 2) * S * 0.15;
    glow(ctx, look, -S * 0.3, S * 0.4, P.accent, 0.8); ctx.fillStyle = P.dark; ctx.beginPath(); ctx.arc(look, -S * 0.3, S * 0.24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = applyAlpha(P.accent, 0.95); ctx.beginPath(); ctx.arc(look, -S * 0.3, S * 0.13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(look - S * 0.04, -S * 0.34, S * 0.04, 0, Math.PI * 2); ctx.fill();
  },
  bomber(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.12);
    ctx.fillStyle = metal(ctx, S, P); ctx.beginPath(); ctx.ellipse(0, 0, S * 0.8, S * 0.65, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = P.dark; ctx.beginPath(); ctx.ellipse(0, S * 0.4, S * 0.5, S * 0.35, 0, 0, Math.PI * 2); ctx.fill();
    glow(ctx, 0, S * 0.5, S * 0.2, P.accent, 0.6 + 0.2 * Math.sin(t * 4));
    ctx.fillStyle = P.base; poly(ctx, [-S * 0.7, -S * 0.2, -S * 1.1, S * 0.2, -S * 0.6, S * 0.3]); ctx.fill(); poly(ctx, [S * 0.7, -S * 0.2, S * 1.1, S * 0.2, S * 0.6, S * 0.3]); ctx.fill();
    core(ctx, S, t, P, 0.12, -S * 0.15);
  },
  ray(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.12); const w = Math.sin(t * 3) * 0.1;
    ctx.fillStyle = vgrad(ctx, 0, -S * 0.4, S * 0.4, [[0, P.light], [1, P.dark]]);
    ctx.beginPath(); ctx.moveTo(0, -S * 0.4); ctx.quadraticCurveTo(S * 1.2, -S * 0.1 + w * S, S * 0.2, S * 0.7); ctx.lineTo(-S * 0.2, S * 0.7); ctx.quadraticCurveTo(-S * 1.2, -S * 0.1 + w * S, 0, -S * 0.4); ctx.fill();
    ctx.fillStyle = P.dark; ctx.beginPath(); ctx.ellipse(0, 0, S * 0.16, S * 0.4, 0, 0, Math.PI * 2); ctx.fill();
    core(ctx, S, t, P, 0.1, -S * 0.1);
  },
  crystal(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.16); ctx.rotate(Math.sin(t) * 0.2);
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; ctx.save(); ctx.rotate(a); const g = ctx.createLinearGradient(0, -S, 0, S * 0.3); g.addColorStop(0, P.light); g.addColorStop(1, P.dark); ctx.fillStyle = g; poly(ctx, [0, -S * (0.7 + (i % 2) * 0.4), S * 0.22, 0, 0, S * 0.3, -S * 0.22, 0]); ctx.fill(); ctx.restore(); }
    core(ctx, S, t, P, 0.16);
  },
  phase(ctx, S, t, P) {
    ctx.globalAlpha = 0.55 + 0.25 * Math.sin(t * 3); glow(ctx, 0, 0, S * 1.6, P.accent, 0.2);
    ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, applyAlpha(P.light, 0.8)], [1, applyAlpha(P.dark, 0.6)]]);
    poly(ctx, [0, -S * 1.0, S * 0.4, -S * 0.2, S * 0.2, S * 0.6, -S * 0.2, S * 0.6, -S * 0.4, -S * 0.2]); ctx.fill();
    ctx.globalAlpha = 1; core(ctx, S, t, P, 0.14, -S * 0.1);
  },
  reflector(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.5, P.accent, 0.14);
    for (const sd of [-1, 1]) { const g = ctx.createLinearGradient(sd * S, -S, sd * S * 0.2, S); g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, P.light); g.addColorStop(1, P.dark); ctx.fillStyle = g; poly(ctx, [0, -S * 0.9, sd * S * 0.9, -S * 0.3, sd * S * 0.6, S * 0.6, 0, S * 0.4]); ctx.fill(); }
    ctx.strokeStyle = applyAlpha('#ffffff', 0.5); ctx.lineWidth = 1.4; poly(ctx, [0, -S * 0.9, S * 0.9, -S * 0.3, 0, S * 0.4, -S * 0.9, -S * 0.3]); ctx.stroke();
    core(ctx, S, t, P, 0.14);
  },
  spikeball(ctx, S, t, P) {
    glow(ctx, 0, 0, S * 1.3, P.accent, 0.1); ctx.rotate(t * 0.4);
    ctx.fillStyle = P.dark; for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; ctx.save(); ctx.rotate(a); poly(ctx, [-S * 0.14, S * 0.5, S * 0.14, S * 0.5, 0, S * 0.95]); ctx.fill(); ctx.restore(); }
    const g = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.05, 0, 0, S * 0.7); g.addColorStop(0, P.base); g.addColorStop(1, P.dark); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, S * 0.58, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = applyAlpha(P.accent, 0.4); for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.cos(a) * S * 0.35, Math.sin(a) * S * 0.35, S * 0.06, 0, Math.PI * 2); ctx.fill(); }
  },
};
