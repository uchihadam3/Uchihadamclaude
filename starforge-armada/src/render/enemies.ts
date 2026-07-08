// Cinco inimigos demonstrativos, todos do mesmo universo visual:
// corpos gunmetal escuros com acentos âmbar/vermelho e glow, para
// contrastar com a nave do jogador (ciano/azul). Nariz aponta para baixo.
import { Ctx, glow, rgba, poly, vgrad } from './prims';

export type EnemyKind = 'drone' | 'fighter' | 'turret' | 'mine' | 'elite';

export function drawEnemy(ctx: Ctx, kind: EnemyKind, x: number, y: number, S: number, t: number, hit: number): void {
  ctx.save();
  ctx.translate(x, y);
  switch (kind) {
    case 'drone': drone(ctx, S, t); break;
    case 'fighter': fighter(ctx, S, t); break;
    case 'turret': turret(ctx, S, t); break;
    case 'mine': mine(ctx, S, t); break;
    case 'elite': elite(ctx, S, t); break;
  }
  if (hit > 0.01) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = hit;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(0, 0, S * 1.1, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

// ---- drone enferrujado: hexágono com olho vermelho ----
function drone(ctx: Ctx, S: number, t: number): void {
  glow(ctx, 0, 0, S * 1.4, '#ff5a2a', 0.14);
  ctx.rotate(Math.sin(t * 2) * 0.1);
  // corpo hexagonal
  const g = vgrad(ctx, 0, -S, S, [[0, '#6a5140'], [0.5, '#3a2e26'], [1, '#1c1712']]);
  ctx.fillStyle = g;
  const hex: number[] = [];
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; hex.push(Math.cos(a) * S, Math.sin(a) * S); }
  poly(ctx, hex); ctx.fill();
  ctx.strokeStyle = 'rgba(255,150,90,0.4)'; ctx.lineWidth = 1.2; poly(ctx, hex); ctx.stroke();
  // pequenos propulsores
  ctx.fillStyle = '#241b15';
  ctx.fillRect(-S * 0.9, -S * 0.2, S * 0.25, S * 0.4);
  ctx.fillRect(S * 0.65, -S * 0.2, S * 0.25, S * 0.4);
  // olho central pulsante
  const p = 0.6 + 0.4 * Math.sin(t * 6);
  glow(ctx, 0, 0, S * 0.55 * p, '#ff3a2a', 0.9);
  ctx.fillStyle = '#ffd0b0';
  ctx.beginPath(); ctx.arc(0, 0, S * 0.2, 0, Math.PI * 2); ctx.fill();
}

// ---- caça pirata: flecha veloz apontando para baixo ----
function fighter(ctx: Ctx, S: number, t: number): void {
  glow(ctx, 0, 0, S * 1.5, '#ff7a2a', 0.12);
  // motor
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const flen = S * (0.8 + Math.random() * 0.2);
  const pg = ctx.createLinearGradient(0, -S * 0.9, 0, -S * 0.9 - flen);
  pg.addColorStop(0, 'rgba(255,220,150,0.9)');
  pg.addColorStop(0.5, 'rgba(255,120,40,0.6)');
  pg.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = pg;
  poly(ctx, [-S * 0.18, -S * 0.9, S * 0.18, -S * 0.9, 0, -S * 0.9 - flen]);
  ctx.fill();
  ctx.restore();
  // asas
  ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, '#7a3320'], [1, '#2a1510']]);
  poly(ctx, [-S * 0.2, -S * 0.2, -S * 1.05, -S * 0.5, -S * 0.5, S * 0.4]); ctx.fill();
  poly(ctx, [S * 0.2, -S * 0.2, S * 1.05, -S * 0.5, S * 0.5, S * 0.4]); ctx.fill();
  // fuselagem (nariz para baixo)
  const g = ctx.createLinearGradient(-S * 0.3, 0, S * 0.3, 0);
  g.addColorStop(0, '#3a2418'); g.addColorStop(0.5, '#b86a44'); g.addColorStop(1, '#3a2418');
  ctx.fillStyle = g;
  poly(ctx, [0, S * 1.05, 0.28 * S, 0.2 * S, 0.2 * S, -0.8 * S, -0.2 * S, -0.8 * S, -0.28 * S, 0.2 * S]);
  ctx.fill();
  // cockpit vermelho
  glow(ctx, 0, S * 0.2, S * 0.35, '#ff4a3a', 0.7);
  ctx.fillStyle = '#ffb090';
  ctx.beginPath(); ctx.ellipse(0, S * 0.2, S * 0.12, S * 0.22, 0, 0, Math.PI * 2); ctx.fill();
}

// ---- torre flutuante: base + canhão giratório ----
function turret(ctx: Ctx, S: number, t: number): void {
  glow(ctx, 0, 0, S * 1.3, '#ffab3a', 0.12);
  // anel/base flutuante
  ctx.fillStyle = vgrad(ctx, 0, -S * 0.5, S * 0.6, [[0, '#4a4038'], [1, '#201a14']]);
  ctx.beginPath(); ctx.ellipse(0, S * 0.1, S * 0.95, S * 0.5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,170,80,0.4)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.ellipse(0, S * 0.1, S * 0.95, S * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
  // luzes na base
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + t * 1.5;
    glow(ctx, Math.cos(a) * S * 0.8, S * 0.1 + Math.sin(a) * S * 0.42, S * 0.1, '#ffcc66', 0.7);
  }
  // domo
  const dg = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.05, 0, 0, S * 0.7);
  dg.addColorStop(0, '#8a8078'); dg.addColorStop(1, '#2a231c');
  ctx.fillStyle = dg;
  ctx.beginPath(); ctx.arc(0, -S * 0.05, S * 0.5, 0, Math.PI * 2); ctx.fill();
  // canhão giratório
  ctx.save();
  ctx.rotate(Math.sin(t * 0.8) * 0.5);
  ctx.fillStyle = '#15110c';
  ctx.fillRect(-S * 0.1, 0, S * 0.2, S * 0.8);
  glow(ctx, 0, S * 0.8, S * 0.22, '#ff7a2a', 0.8);
  ctx.restore();
  // núcleo
  glow(ctx, 0, -S * 0.05, S * 0.3, '#ffd08a', 0.7 + 0.2 * Math.sin(t * 4));
}

// ---- mina espacial: esfera com espinhos e núcleo pulsante ----
function mine(ctx: Ctx, S: number, t: number): void {
  const p = 0.5 + 0.5 * Math.sin(t * 4);
  glow(ctx, 0, 0, S * 1.5, '#ff3050', 0.1 + p * 0.14);
  ctx.rotate(t * 0.5);
  // espinhos
  ctx.fillStyle = '#2a2020';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.save(); ctx.rotate(a);
    poly(ctx, [-S * 0.12, S * 0.5, S * 0.12, S * 0.5, 0, S * 1.05]);
    ctx.fill();
    // ponta luminosa
    glow(ctx, 0, S * 1.02, S * 0.08, '#ff5a70', 0.6);
    ctx.restore();
  }
  // corpo esférico
  const g = ctx.createRadialGradient(-S * 0.2, -S * 0.2, S * 0.05, 0, 0, S * 0.62);
  g.addColorStop(0, '#5a4a4a'); g.addColorStop(0.6, '#2e2424'); g.addColorStop(1, '#160f0f');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, S * 0.55, 0, Math.PI * 2); ctx.fill();
  // rebites
  ctx.fillStyle = 'rgba(255,120,120,0.35)';
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.cos(a) * S * 0.38, Math.sin(a) * S * 0.38, S * 0.045, 0, Math.PI * 2); ctx.fill(); }
  // núcleo pulsante
  glow(ctx, 0, 0, S * 0.4 * (0.7 + p * 0.6), '#ff2040', 0.9);
  ctx.fillStyle = '#ffd0d0';
  ctx.beginPath(); ctx.arc(0, 0, S * 0.14, 0, Math.PI * 2); ctx.fill();
}

// ---- elite: nave pesada e ameaçadora com múltiplos canhões ----
function elite(ctx: Ctx, S: number, t: number): void {
  glow(ctx, 0, 0, S * 2.1, '#ff4020', 0.14);
  // motores traseiros
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const sd of [-1, 1]) {
    const ex = sd * S * 0.55;
    const fl = S * (0.7 + Math.random() * 0.25);
    const pg = ctx.createLinearGradient(ex, -S * 1.0, ex, -S * 1.0 - fl);
    pg.addColorStop(0, 'rgba(255,210,150,0.9)');
    pg.addColorStop(1, 'rgba(255,80,30,0)');
    ctx.fillStyle = pg;
    poly(ctx, [ex - S * 0.16, -S, ex + S * 0.16, -S, ex, -S - fl]); ctx.fill();
  }
  ctx.restore();
  // asas pesadas
  ctx.fillStyle = vgrad(ctx, 0, -S, S, [[0, '#5a2a1c'], [1, '#1c100c']]);
  poly(ctx, [-S * 0.4, -S * 0.6, -S * 1.5, -S * 0.1, -S * 1.35, S * 0.55, -S * 0.5, S * 0.5]); ctx.fill();
  poly(ctx, [S * 0.4, -S * 0.6, S * 1.5, -S * 0.1, S * 1.35, S * 0.55, S * 0.5, S * 0.5]); ctx.fill();
  // canhões das asas
  for (const sd of [-1, 1]) {
    ctx.fillStyle = '#120c08';
    ctx.fillRect(sd * S * 1.15 - S * 0.08, S * 0.1, S * 0.16, S * 0.7);
    glow(ctx, sd * S * 1.15, S * 0.8, S * 0.18, '#ff6a2a', 0.8);
  }
  // casco central (blindado)
  ctx.fillStyle = '#0e0906';
  poly(ctx, hullE(S).map((v) => v * 1.05)); ctx.fill();
  const g = ctx.createLinearGradient(-S * 0.6, 0, S * 0.6, 0);
  g.addColorStop(0, '#3a241a'); g.addColorStop(0.5, '#c07a50'); g.addColorStop(1, '#3a241a');
  ctx.fillStyle = g;
  poly(ctx, hullE(S)); ctx.fill();
  // placas
  ctx.strokeStyle = 'rgba(20,12,8,0.6)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(-S * 0.3, -S * 0.4); ctx.lineTo(-S * 0.3, S * 0.7);
  ctx.moveTo(S * 0.3, -S * 0.4); ctx.lineTo(S * 0.3, S * 0.7); ctx.stroke();
  // núcleo/olho central grande
  const p = 0.6 + 0.4 * Math.sin(t * 3);
  glow(ctx, 0, S * 0.05, S * 0.7 * p, '#ff3018', 0.85);
  ctx.fillStyle = '#ffd0b0';
  ctx.beginPath(); ctx.ellipse(0, S * 0.05, S * 0.18, S * 0.32, 0, 0, Math.PI * 2); ctx.fill();
  // "chifres" frontais
  ctx.fillStyle = '#1c120c';
  poly(ctx, [-S * 0.5, S * 0.6, -S * 0.28, S * 0.5, -S * 0.34, S * 1.1]); ctx.fill();
  poly(ctx, [S * 0.5, S * 0.6, S * 0.28, S * 0.5, S * 0.34, S * 1.1]); ctx.fill();
}

function hullE(S: number): number[] {
  return [0, -S * 1.05, S * 0.5, -S * 0.5, S * 0.6, S * 0.5, S * 0.34, S * 1.0, -S * 0.34, S * 1.0, -S * 0.6, S * 0.5, -S * 0.5, -S * 0.5];
}
