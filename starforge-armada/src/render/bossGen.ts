// Renderizador dos chefes: 12 formas grandes e distintas, com núcleo pulsante
// que se expõe/brilha por fase, luz de borda e sobrecarga branca na morte.
// Nariz/frente para baixo (+Y). Origem no centro.
import { Ctx, glow, rgba, poly, applyAlpha, vgrad } from './prims';
import type { Palette } from './shipGen';
import type { BossForm } from '../data/bossesData';

export interface BossDrawOpts { phase: number; exposed: boolean; hit: number; deathT: number; }

export function drawBoss(ctx: Ctx, form: BossForm, x: number, y: number, S: number, t: number, P: Palette, o: BossDrawOpts): void {
  ctx.save();
  ctx.translate(x, y);
  (FORMS[form] ?? FORMS.scrap)(ctx, S, t, P, o);
  if (o.hit > 0.01) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = o.hit * 0.6; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, S * 1.15, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }
  if (o.deathT > 0.01) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, 0, 0, S * (1.2 + o.deathT * 1.5), '#ffffff', o.deathT); }
  ctx.restore();
}

type Form = (ctx: Ctx, S: number, t: number, P: Palette, o: BossDrawOpts) => void;
const metal = (ctx: Ctx, S: number, P: Palette): CanvasGradient => vgrad(ctx, 0, -S, S, [[0, P.light], [0.5, P.base], [1, P.dark]]);
function bcore(ctx: Ctx, S: number, t: number, P: Palette, o: BossDrawOpts, r = 0.22, y = 0): void {
  const p = 0.6 + 0.4 * Math.sin(t * (o.exposed ? 8 : 4));
  const rr = S * r * (o.exposed ? 1.35 : 1);
  glow(ctx, 0, y, rr * 2.4 * p, o.exposed ? '#fff' : P.accent, 0.9);
  ctx.fillStyle = o.exposed ? '#fff' : applyAlpha(P.accent, 0.95); ctx.beginPath(); ctx.arc(0, y, rr, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, y, rr * 0.4, 0, Math.PI * 2); ctx.fill();
}

const FORMS: Record<BossForm, Form> = {
  scrap(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 1.8, P.accent, 0.14);
    ctx.rotate(Math.sin(t * 0.4) * 0.05);
    // massa de sucata assimétrica
    ctx.fillStyle = metal(ctx, S, P);
    poly(ctx, [-S, -S * 0.5, -S * 0.3, -S, S * 0.4, -S * 0.8, S * 1.05, -S * 0.2, S * 0.9, S * 0.6, S * 0.2, S * 1.0, -S * 0.6, S * 0.9, -S * 1.05, S * 0.3]); ctx.fill();
    ctx.fillStyle = P.dark; for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + t * 0.2; ctx.save(); ctx.rotate(a); ctx.fillRect(S * 0.4, -S * 0.14, S * 0.5, S * 0.28); ctx.restore(); }
    ctx.strokeStyle = applyAlpha(P.accent, 0.4); ctx.lineWidth = 2; ctx.strokeRect(-S * 0.7, -S * 0.5, S * 1.4, S * 1.0);
    bcore(ctx, S, t, P, o, 0.26);
  },
  serpent(ctx, S, t, P, o) {
    // corpo em segmentos subindo atrás da cabeça
    for (let i = 8; i >= 1; i--) { const yy = -i * S * 0.42; const rr = S * (0.5 - i * 0.02); glow(ctx, Math.sin(t * 2 + i) * S * 0.3, yy, rr * 1.6, P.accent, 0.2); const g = ctx.createRadialGradient(0, yy, 0, 0, yy, rr); g.addColorStop(0, P.light); g.addColorStop(1, P.dark); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(Math.sin(t * 2 + i) * S * 0.3, yy, rr, 0, Math.PI * 2); ctx.fill(); }
    // cabeça
    glow(ctx, 0, 0, S * 1.6, P.accent, 0.16);
    ctx.fillStyle = metal(ctx, S, P); poly(ctx, [0, S * 1.0, S * 0.7, S * 0.2, S * 0.5, -S * 0.6, -S * 0.5, -S * 0.6, -S * 0.7, S * 0.2]); ctx.fill();
    // mandíbulas
    ctx.fillStyle = P.dark; poly(ctx, [-S * 0.5, S * 0.3, -S * 0.2, S * 0.9, -S * 0.5, S * 0.7]); ctx.fill(); poly(ctx, [S * 0.5, S * 0.3, S * 0.2, S * 0.9, S * 0.5, S * 0.7]); ctx.fill();
    bcore(ctx, S, t, P, o, 0.2, S * 0.1);
  },
  sentinel(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 1.8, P.accent, 0.14);
    // casca octogonal
    ctx.fillStyle = metal(ctx, S, P); const oct: number[] = []; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; oct.push(Math.cos(a) * S, Math.sin(a) * S); } poly(ctx, oct); ctx.fill();
    ctx.strokeStyle = applyAlpha(P.accent, 0.4); ctx.lineWidth = 2; poly(ctx, oct); ctx.stroke();
    // anel giratório
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(P.accent, 0.5); ctx.lineWidth = 3; ctx.rotate(t); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, 0, S * 0.75, i * Math.PI / 2, i * Math.PI / 2 + 0.9); ctx.stroke(); } ctx.restore();
    // olho central
    ctx.fillStyle = P.dark; ctx.beginPath(); ctx.arc(0, 0, S * 0.45, 0, Math.PI * 2); ctx.fill();
    bcore(ctx, S, t, P, o, 0.24);
  },
  drill(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 1.7, P.accent, 0.12);
    // carcaça
    ctx.fillStyle = metal(ctx, S, P); poly(ctx, [-S * 0.9, -S * 0.8, S * 0.9, -S * 0.8, S * 0.7, S * 0.2, -S * 0.7, S * 0.2]); ctx.fill();
    // broca cônica girando
    ctx.save(); ctx.translate(0, S * 0.2); const spin = t * 6;
    for (let i = 0; i < 3; i++) { const g = ctx.createLinearGradient(-S * 0.5, 0, S * 0.5, S); g.addColorStop(0, P.light); g.addColorStop(1, P.dark); ctx.fillStyle = g; ctx.save(); ctx.rotate(Math.sin(spin + i) * 0.06); poly(ctx, [-S * 0.5 + i * 2, 0, S * 0.5 - i * 2, 0, 0, S * (1.1 - i * 0.15)]); ctx.fill(); ctx.restore(); }
    ctx.restore();
    // pistões
    ctx.fillStyle = P.dark; ctx.fillRect(-S * 0.85, -S * 0.7, S * 0.2, S * 0.6); ctx.fillRect(S * 0.65, -S * 0.7, S * 0.2, S * 0.6);
    bcore(ctx, S, t, P, o, 0.2, -S * 0.4);
  },
  heart(ctx, S, t, P, o) {
    const p = 0.5 + 0.5 * Math.sin(t * 3);
    glow(ctx, 0, 0, S * (1.7 + p * 0.4), P.accent, 0.2);
    // tentáculos
    ctx.strokeStyle = applyAlpha(P.dark, 0.9); ctx.lineWidth = S * 0.14; ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * S * 0.5, Math.sin(a) * S * 0.5); ctx.quadraticCurveTo(Math.cos(a) * S * 1.2, Math.sin(a) * S * 1.2 + Math.sin(t * 2 + i) * S * 0.2, Math.cos(a + 0.4) * S * 1.5, Math.sin(a + 0.4) * S * 1.5); ctx.stroke(); }
    // membrana
    const g = ctx.createRadialGradient(0, 0, S * 0.1, 0, 0, S * (0.85 + p * 0.1)); g.addColorStop(0, P.light); g.addColorStop(0.6, P.base); g.addColorStop(1, P.dark); ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, S * (0.8 + p * 0.08), 0, Math.PI * 2); ctx.fill();
    // veias
    ctx.strokeStyle = applyAlpha(P.accent, 0.4); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * S * 0.7, Math.sin(a) * S * 0.7); ctx.stroke(); }
    bcore(ctx, S, t, P, o, 0.24);
  },
  ace(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 1.6, P.accent, 0.14);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const fl = S * 0.9; for (const sd of [-1, 1]) { const pg = ctx.createLinearGradient(sd * S * 0.4, -S, sd * S * 0.4, -S - fl); pg.addColorStop(0, applyAlpha(P.accent, 0.9)); pg.addColorStop(1, applyAlpha(P.accent, 0)); ctx.fillStyle = pg; poly(ctx, [sd * S * 0.4 - S * 0.15, -S, sd * S * 0.4 + S * 0.15, -S, sd * S * 0.4, -S - fl]); ctx.fill(); } ctx.restore();
    // asas afiadas
    ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, P.base], [1, P.dark]]);
    poly(ctx, [-S * 0.25, -S * 0.3, -S * 1.3, -S * 0.5, -S * 0.9, S * 0.4, -S * 0.4, S * 0.3]); ctx.fill();
    poly(ctx, [S * 0.25, -S * 0.3, S * 1.3, -S * 0.5, S * 0.9, S * 0.4, S * 0.4, S * 0.3]); ctx.fill();
    // fuselagem elegante
    ctx.fillStyle = metal(ctx, S, P); poly(ctx, [0, S * 1.15, S * 0.3, S * 0.2, S * 0.22, -S * 0.9, -S * 0.22, -S * 0.9, -S * 0.3, S * 0.2]); ctx.fill();
    // cabine
    const g = ctx.createRadialGradient(0, S * 0.1, S * 0.02, 0, S * 0.1, S * 0.3); g.addColorStop(0, '#fff'); g.addColorStop(1, applyAlpha(P.accent, 0.9)); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, S * 0.1, S * 0.13, S * 0.28, 0, 0, Math.PI * 2); ctx.fill();
    bcore(ctx, S, t, P, o, 0.1, S * 0.55);
  },
  cube(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 1.7, P.accent, 0.16);
    ctx.rotate(t * 0.5);
    // losango 3D
    const g = ctx.createLinearGradient(-S, -S, S, S); g.addColorStop(0, P.light); g.addColorStop(0.5, P.base); g.addColorStop(1, P.dark); ctx.fillStyle = g;
    poly(ctx, [0, -S, S, 0, 0, S, -S, 0]); ctx.fill();
    ctx.fillStyle = applyAlpha(P.dark, 0.5); poly(ctx, [0, -S, S, 0, 0, 0, -S, 0]); ctx.fill();
    ctx.strokeStyle = applyAlpha(P.accent, 0.6); ctx.lineWidth = 2; poly(ctx, [0, -S, S, 0, 0, S, -S, 0]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -S); ctx.lineTo(0, S); ctx.moveTo(-S, 0); ctx.lineTo(S, 0); ctx.stroke();
    bcore(ctx, S, t, P, o, 0.22);
  },
  sun(ctx, S, t, P, o) {
    // corona
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + t * 0.4; const len = S * (1.4 + Math.sin(t * 3 + i) * 0.2); ctx.strokeStyle = applyAlpha(P.accent, 0.5); ctx.lineWidth = S * 0.08; ctx.beginPath(); ctx.moveTo(Math.cos(a) * S * 0.7, Math.sin(a) * S * 0.7); ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len); ctx.stroke(); } ctx.restore();
    glow(ctx, 0, 0, S * 1.8, P.accent, 0.3);
    const g = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.1, 0, 0, S * 0.85); g.addColorStop(0, '#fff'); g.addColorStop(0.4, P.light); g.addColorStop(1, P.dark); ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, S * 0.8, 0, Math.PI * 2); ctx.fill();
    bcore(ctx, S, t, P, o, 0.24);
  },
  general(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 1.8, P.accent, 0.12);
    // casco largo militar
    ctx.fillStyle = metal(ctx, S, P); poly(ctx, [-S * 1.1, -S * 0.5, S * 1.1, -S * 0.5, S * 0.9, S * 0.5, S * 0.3, S * 0.9, -S * 0.3, S * 0.9, -S * 0.9, S * 0.5]); ctx.fill();
    // módulos
    ctx.fillStyle = P.dark; for (let i = -2; i <= 2; i++) ctx.fillRect(i * S * 0.4 - S * 0.13, -S * 0.45, S * 0.26, S * 0.35);
    for (let i = -2; i <= 2; i++) glow(ctx, i * S * 0.4, -S * 0.28, S * 0.08, P.accent, 0.5);
    // ponte central
    ctx.fillStyle = vgrad(ctx, 0, -S * 0.2, S * 0.6, [[0, P.light], [1, P.base]]); poly(ctx, [-S * 0.4, 0, S * 0.4, 0, S * 0.25, S * 0.7, -S * 0.25, S * 0.7]); ctx.fill();
    bcore(ctx, S, t, P, o, 0.18, S * 0.35);
  },
  devourer(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 2.0, P.accent, 0.16);
    // goela brilhante
    const p = 0.5 + 0.5 * Math.sin(t * 2);
    glow(ctx, 0, S * 0.2, S * (0.6 + p * 0.3), P.accent, 0.8);
    // mandíbulas em crescente
    const jaw = 0.3 + p * 0.25;
    ctx.fillStyle = metal(ctx, S, P);
    ctx.save(); ctx.rotate(jaw); ctx.beginPath(); ctx.arc(0, 0, S, Math.PI * 0.15, Math.PI * 0.95); ctx.arc(0, 0, S * 0.5, Math.PI * 0.95, Math.PI * 0.15, true); ctx.fill(); ctx.restore();
    ctx.save(); ctx.rotate(-jaw); ctx.beginPath(); ctx.arc(0, 0, S, Math.PI * 0.05, Math.PI * 0.85); ctx.arc(0, 0, S * 0.5, Math.PI * 0.85, Math.PI * 0.05, true); ctx.fill(); ctx.restore();
    // dentes
    ctx.fillStyle = P.light; for (let i = 0; i < 5; i++) { const a = Math.PI * 0.25 + i * 0.13; ctx.save(); ctx.rotate(jaw); poly(ctx, [Math.cos(a) * S * 0.5, Math.sin(a) * S * 0.5, Math.cos(a + 0.05) * S * 0.6, Math.sin(a + 0.05) * S * 0.6, Math.cos(a + 0.02) * S * 0.9, Math.sin(a + 0.02) * S * 0.9]); ctx.fill(); ctx.restore(); }
    bcore(ctx, S, t, P, o, 0.16, S * 0.2);
  },
  core(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 2.0, P.accent, 0.14);
    // braços da megaestrutura
    ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, P.base], [1, P.dark]]);
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2 + Math.PI / 4); ctx.fillRect(-S * 0.16, -S * 1.2, S * 0.32, S * 1.2); ctx.restore(); }
    // anel externo
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(P.accent, 0.5); ctx.lineWidth = S * 0.1; ctx.rotate(-t * 0.6); ctx.beginPath(); ctx.arc(0, 0, S * 0.9, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    // anel de placas
    ctx.fillStyle = metal(ctx, S, P); ctx.beginPath(); ctx.arc(0, 0, S * 0.7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = P.dark; ctx.beginPath(); ctx.arc(0, 0, S * 0.5, 0, Math.PI * 2); ctx.fill();
    bcore(ctx, S, t, P, o, 0.3);
  },
  singularity(ctx, S, t, P, o) {
    glow(ctx, 0, 0, S * 2.2, P.accent, 0.2);
    // disco de acreção espiralado
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.rotate(t * 0.8);
    for (let i = 0; i < 5; i++) { ctx.strokeStyle = applyAlpha(P.accent, 0.4 - i * 0.05); ctx.lineWidth = S * (0.14 - i * 0.02); ctx.beginPath(); for (let a = 0; a < Math.PI * 4; a += 0.2) { const r = S * (0.3 + a * 0.09) * (1 - i * 0.06); const x = Math.cos(a + i) * r, y = Math.sin(a + i) * r; if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke(); }
    ctx.restore();
    // núcleo negro com halo
    glow(ctx, 0, 0, S * 0.7, P.accent, 0.7);
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(0, 0, S * 0.34, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = o.exposed ? '#fff' : applyAlpha(P.accent, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, S * 0.36, 0, Math.PI * 2); ctx.stroke();
  },
};
