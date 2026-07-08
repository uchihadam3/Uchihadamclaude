// Falcon-01 — nave inicial, desenhada em camadas com cockpit, asas, motores
// animados, detalhes mecânicos, luz de borda, escudo e flash de dano.
// Nariz aponta para cima (-Y). Origem no centro da nave.
import { Ctx, glow, rgba, poly, vgrad, applyAlpha } from './prims';

export interface ShipDrawOpts {
  tilt?: number;      // -1..1 inclinação ao mover lateralmente
  thrust?: number;    // 0..1 intensidade do motor
  t: number;          // tempo (s) para animação
  shield?: number;    // 0..1 força do escudo (0 = sem escudo visível)
  damage?: number;    // 0..1 flash de dano recente
  invuln?: boolean;   // piscar quando invulnerável
}

export function drawFalcon(ctx: Ctx, x: number, y: number, S: number, o: ShipDrawOpts): void {
  const tilt = clampN(o.tilt ?? 0, -1, 1);
  const thrust = o.thrust ?? 0.6;
  const t = o.t;

  if (o.invuln && Math.floor(t * 20) % 2 === 0) return; // pisca

  ctx.save();
  ctx.translate(x, y);
  // banca a nave ao mover
  ctx.rotate(tilt * 0.18);
  ctx.transform(1 - Math.abs(tilt) * 0.14, 0, tilt * 0.06, 1, 0, 0);

  // ---- sombra/aura sob a nave ----
  glow(ctx, 0, S * 0.15, S * 1.9, '#2a5cff', 0.16);

  // ================= MOTORES (atrás) =================
  drawEngines(ctx, S, thrust, t);

  // ================= ASAS =================
  drawWing(ctx, S, 1);   // direita
  drawWing(ctx, S, -1);  // esquerda

  // ================= FUSELAGEM =================
  drawFuselage(ctx, S);

  // ================= COCKPIT =================
  drawCockpit(ctx, S, t);

  // ================= DETALHES / LUZES DE NAV =================
  drawDetails(ctx, S, t);

  // ---- flash de dano ----
  if (o.damage && o.damage > 0.01) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = o.damage;
    poly(ctx, hullPts(S));
    ctx.fillStyle = 'rgba(255,90,90,0.9)';
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();

  // ---- escudo (fora do transform de banking, sempre circular) ----
  if (o.shield && o.shield > 0.02) drawShield(ctx, x, y, S * 1.55, o.shield, t);
}

function drawEngines(ctx: Ctx, S: number, thrust: number, t: number): void {
  for (const side of [-1, 1]) {
    const ex = side * S * 0.32;
    const ey = S * 0.78;
    // bocal do motor
    ctx.fillStyle = vgrad(ctx, ex, ey - S * 0.2, ey + S * 0.2, [[0, '#39435c'], [1, '#10141f']]);
    poly(ctx, [ex - S * 0.16, ey - S * 0.2, ex + S * 0.16, ey - S * 0.2, ex + S * 0.11, ey + S * 0.12, ex - S * 0.11, ey + S * 0.12]);
    ctx.fill();
    // pluma animada
    const flick = 0.82 + Math.sin(t * 40 + side) * 0.12 + Math.random() * 0.06;
    const len = S * (0.55 + thrust * 0.85) * flick;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const pg = ctx.createLinearGradient(ex, ey, ex, ey + len);
    pg.addColorStop(0, 'rgba(255,255,255,0.95)');
    pg.addColorStop(0.25, 'rgba(120,215,255,0.9)');
    pg.addColorStop(0.65, 'rgba(60,120,255,0.55)');
    pg.addColorStop(1, 'rgba(60,120,255,0)');
    ctx.fillStyle = pg;
    poly(ctx, [ex - S * 0.12, ey, ex + S * 0.12, ey, ex + S * 0.02, ey + len, ex - S * 0.02, ey + len]);
    ctx.fill();
    // núcleo do motor
    glow(ctx, ex, ey, S * 0.28 * flick, '#bfe9ff', 0.9);
    ctx.restore();
  }
}

function wingPts(S: number, sd: number): number[] {
  return [
    0.10 * sd * S, -0.05 * S,
    0.98 * sd * S, 0.34 * S,
    0.86 * sd * S, 0.6 * S,
    0.30 * sd * S, 0.52 * S,
    0.14 * sd * S, 0.2 * S,
  ];
}

function drawWing(ctx: Ctx, S: number, sd: number): void {
  const pts = wingPts(S, sd);
  // corpo da asa
  const g = ctx.createLinearGradient(0, -S * 0.1, sd * S, S * 0.6);
  g.addColorStop(0, '#8f9fbe');
  g.addColorStop(0.5, '#4a5776');
  g.addColorStop(1, '#232c42');
  ctx.fillStyle = g;
  poly(ctx, pts); ctx.fill();
  // painel interno mais claro
  ctx.fillStyle = 'rgba(180,200,235,0.16)';
  poly(ctx, [0.16 * sd * S, 0.02 * S, 0.7 * sd * S, 0.32 * S, 0.5 * sd * S, 0.42 * S, 0.2 * sd * S, 0.2 * S]);
  ctx.fill();
  // linhas de painel
  ctx.strokeStyle = 'rgba(10,14,24,0.5)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0.3 * sd * S, 0.08 * S); ctx.lineTo(0.78 * sd * S, 0.4 * S);
  ctx.moveTo(0.2 * sd * S, 0.28 * S); ctx.lineTo(0.62 * sd * S, 0.5 * S);
  ctx.stroke();
  // luz de ponta de asa (borda aditiva)
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = 'rgba(90,200,255,0.8)'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(0.98 * sd * S, 0.34 * S); ctx.lineTo(0.86 * sd * S, 0.6 * S); ctx.stroke();
  glow(ctx, 0.98 * sd * S, 0.34 * S, S * 0.16, '#66ccff', 0.9);
  ctx.restore();
}

function hullPts(S: number): number[] {
  return [
    0, -1.02 * S,
    0.14 * S, -0.6 * S,
    0.2 * S, -0.1 * S,
    0.26 * S, 0.55 * S,
    0.14 * S, 0.86 * S,
    -0.14 * S, 0.86 * S,
    -0.26 * S, 0.55 * S,
    -0.2 * S, -0.1 * S,
    -0.14 * S, -0.6 * S,
  ];
}

function drawFuselage(ctx: Ctx, S: number): void {
  // sombra externa
  ctx.fillStyle = '#0c1120';
  poly(ctx, hullPts(S).map((v) => v * 1.04)); ctx.fill();
  // corpo com gradiente metálico
  const g = ctx.createLinearGradient(-S * 0.26, 0, S * 0.26, 0);
  g.addColorStop(0, '#2b3350');
  g.addColorStop(0.25, '#5b6b92');
  g.addColorStop(0.5, '#aebbe0');
  g.addColorStop(0.75, '#5b6b92');
  g.addColorStop(1, '#2b3350');
  ctx.fillStyle = g;
  poly(ctx, hullPts(S)); ctx.fill();
  // faixa central escura (quilha)
  ctx.fillStyle = 'rgba(15,20,35,0.55)';
  poly(ctx, [0, -0.95 * S, 0.05 * S, -0.2 * S, 0.05 * S, 0.7 * S, -0.05 * S, 0.7 * S, -0.05 * S, -0.2 * S]);
  ctx.fill();
  // realce de topo (rim light do nariz)
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const rg = ctx.createLinearGradient(0, -S * 1.0, 0, -S * 0.2);
  rg.addColorStop(0, 'rgba(180,220,255,0.85)');
  rg.addColorStop(1, 'rgba(180,220,255,0)');
  ctx.fillStyle = rg;
  poly(ctx, [0, -1.02 * S, 0.14 * S, -0.6 * S, 0, -0.5 * S, -0.14 * S, -0.6 * S]);
  ctx.fill();
  ctx.restore();
  // contorno
  ctx.strokeStyle = 'rgba(200,225,255,0.22)'; ctx.lineWidth = 1;
  poly(ctx, hullPts(S)); ctx.stroke();
}

function drawCockpit(ctx: Ctx, S: number, t: number): void {
  const cy = -S * 0.28;
  // moldura
  ctx.fillStyle = '#141a2c';
  poly(ctx, [0, -0.6 * S, 0.13 * S, -0.28 * S, 0.09 * S, 0.02 * S, -0.09 * S, 0.02 * S, -0.13 * S, -0.28 * S]);
  ctx.fill();
  // vidro do cockpit (radial)
  const g = ctx.createRadialGradient(0, cy - S * 0.08, S * 0.02, 0, cy, S * 0.22);
  g.addColorStop(0, 'rgba(210,245,255,0.98)');
  g.addColorStop(0.4, 'rgba(90,190,240,0.9)');
  g.addColorStop(1, 'rgba(30,70,140,0.85)');
  ctx.fillStyle = g;
  poly(ctx, [0, -0.54 * S, 0.1 * S, -0.28 * S, 0.07 * S, -0.02 * S, -0.07 * S, -0.02 * S, -0.1 * S, -0.28 * S]);
  ctx.fill();
  // brilho especular animado
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const sh = 0.5 + 0.5 * Math.sin(t * 1.5);
  ctx.globalAlpha = 0.4 + sh * 0.4;
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.ellipse(-S * 0.03, cy - S * 0.05, S * 0.03, S * 0.1, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDetails(ctx: Ctx, S: number, t: number): void {
  // greebles nas laterais da fuselagem
  ctx.fillStyle = 'rgba(20,26,42,0.9)';
  ctx.fillRect(0.1 * S, 0.12 * S, 0.06 * S, 0.28 * S);
  ctx.fillRect(-0.16 * S, 0.12 * S, 0.06 * S, 0.28 * S);
  ctx.fillStyle = 'rgba(150,175,215,0.5)';
  ctx.fillRect(0.11 * S, 0.16 * S, 0.04 * S, 0.05 * S);
  ctx.fillRect(-0.15 * S, 0.16 * S, 0.04 * S, 0.05 * S);
  // luzes de navegação piscando (verde direita, vermelha esquerda)
  const blink = Math.sin(t * 5) > 0;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  if (blink) { glow(ctx, 0.86 * S, 0.58 * S, S * 0.1, '#5aff8a', 0.9); }
  else { glow(ctx, -0.86 * S, 0.58 * S, S * 0.1, '#ff5a6a', 0.9); }
  // luz do nariz
  glow(ctx, 0, -0.9 * S, S * 0.14, '#bfe9ff', 0.6 + 0.3 * Math.sin(t * 3));
  ctx.restore();
}

function drawShield(ctx: Ctx, x: number, y: number, r: number, s: number, t: number): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const a = 0.12 + s * 0.22;
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r);
  g.addColorStop(0, 'rgba(80,180,255,0)');
  g.addColorStop(0.82, applyAlpha('#4aa8ff', a * 0.5));
  g.addColorStop(1, applyAlpha('#8ad4ff', a));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  // borda hexagonal cintilante
  ctx.strokeStyle = applyAlpha('#bfe9ff', 0.35 + 0.25 * Math.sin(t * 3));
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r * 0.98, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

function clampN(v: number, lo: number, hi: number): number { return v < lo ? lo : v > hi ? hi : v; }
