import type { DungeonDef, RunState, Unit } from '../types';
import { ENEMY_BY_ID } from '../data/enemiesData';
import { ARENA_W } from '../game/combat';
import { drawEnemyFigure, drawHeroFigure, drawSummonFigure } from './figures';

type Ctx = CanvasRenderingContext2D;

// ============ FUNDO PARALLAX POR AMBIENTE ============
export function drawBackground(ctx: Ctx, W: number, H: number, d: DungeonDef, t: number, scrollX: number): void {
  const a = d.ambient;
  // céu / gradiente
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, a.skyTop); g.addColorStop(1, a.skyBottom);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  const groundY = H * 0.8;
  // camada distante — silhuetas de arcos/pilares
  layer(ctx, W, groundY, a.far, 0.12, scrollX, 6, H * 0.34, t, 0);
  layer(ctx, W, groundY, a.mid, 0.28, scrollX, 5, H * 0.46, t, 1);
  layer(ctx, W, groundY, a.near, 0.5, scrollX, 4, H * 0.6, t, 2);

  // brilho ambiente
  const rg = ctx.createRadialGradient(W * 0.5, groundY * 0.7, 10, W * 0.5, groundY * 0.7, W * 0.7);
  rg.addColorStop(0, hexA(a.glow, 0.10)); rg.addColorStop(1, 'transparent');
  ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);

  // chão
  const fg = ctx.createLinearGradient(0, groundY, 0, H);
  fg.addColorStop(0, a.floor); fg.addColorStop(1, a.floorDark);
  ctx.fillStyle = fg; ctx.fillRect(0, groundY, W, H - groundY);
  // ladrilhos em perspectiva
  ctx.strokeStyle = hexA(a.floorDark, 0.6); ctx.lineWidth = 1;
  const tile = 70;
  for (let i = -2; i < W / tile + 2; i++) {
    const x = ((i * tile - scrollX * 0.5) % (W + tile) + W + tile) % (W + tile) - tile;
    ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x - 40, H); ctx.stroke();
  }
  for (let j = 1; j < 5; j++) {
    const y = groundY + (H - groundY) * (j / 5) * (j / 5);
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.globalAlpha = 0.3; ctx.stroke(); ctx.globalAlpha = 1;
  }
  // névoa
  if (a.fog) { ctx.fillStyle = a.fog; ctx.fillRect(0, groundY - H * 0.15, W, H * 0.3); }
}

function layer(ctx: Ctx, W: number, groundY: number, col: string, par: number, scrollX: number, count: number, maxH: number, t: number, seed: number): void {
  ctx.fillStyle = col;
  const span = W / count;
  for (let i = -1; i <= count; i++) {
    const base = i * span - (scrollX * par) % span;
    const rnd = Math.abs(Math.sin((i + seed * 3.7) * 12.9898) * 43758.5) % 1;
    const h = maxH * (0.55 + rnd * 0.45);
    const w = span * (0.5 + rnd * 0.3);
    // pilar/arco
    ctx.beginPath();
    rrPath(ctx, base + span * 0.1, groundY - h, w, h, w * 0.2);
    ctx.fill();
    // topo arqueado
    ctx.beginPath(); ctx.arc(base + span * 0.1 + w / 2, groundY - h, w / 2, Math.PI, Math.PI * 2); ctx.fill();
  }
}

// ============ PARTÍCULAS DE AMBIENTE ============
const ambientParticles: { x: number; y: number; vx: number; vy: number; s: number; life: number }[] = [];
export function drawAmbientParticles(ctx: Ctx, W: number, H: number, d: DungeonDef, dt: number): void {
  const kind = d.ambient.particles;
  if (ambientParticles.length < 46 && Math.random() < 0.5) {
    ambientParticles.push({ x: Math.random() * W, y: kind === 'embers' || kind === 'bones' ? H : Math.random() * H, vx: (Math.random() - 0.5) * 20, vy: partVy(kind), s: 1 + Math.random() * 2.5, life: 0 });
  }
  ctx.fillStyle = hexA(d.ambient.glow, 0.5);
  for (let i = ambientParticles.length - 1; i >= 0; i--) {
    const p = ambientParticles[i];
    p.x += p.vx * dt; p.y += p.vy * dt; p.life += dt;
    p.vy += (kind === 'embers' ? -6 : kind === 'bubbles' ? -10 : 3) * dt;
    ctx.globalAlpha = Math.max(0, 0.6 - p.life * 0.05);
    ctx.beginPath();
    if (kind === 'stars' || kind === 'shards') { ctx.fillRect(p.x, p.y, p.s, p.s); }
    else { ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fill(); }
    if (p.y < -10 || p.y > H + 10 || p.life > 12) ambientParticles.splice(i, 1);
  }
  ctx.globalAlpha = 1;
}
function partVy(kind: string): number {
  switch (kind) { case 'embers': return -30 - Math.random() * 30; case 'bubbles': return -20 - Math.random() * 20; case 'bones': return -40; default: return 8 + Math.random() * 14; }
}

// ============ CENA DE COMBATE ============
export function drawScene(ctx: Ctx, W: number, H: number, run: RunState, d: DungeonDef, t: number, dt: number, scrollX: number): void {
  ctx.save();
  // shake
  if (run.shake > 0) ctx.translate((Math.random() - 0.5) * run.shake * 12, (Math.random() - 0.5) * run.shake * 8);
  drawBackground(ctx, W, H, d, t, scrollX);
  drawAmbientParticles(ctx, W, H, d, dt);

  const groundY = H * 0.8;
  const laneX = (x: number) => 44 + (x / ARENA_W) * (W - 88);
  const heroSize = Math.max(16, H * 0.052);

  // sombra + unidade
  const drawUnit = (u: Unit, size: number, painter: 'hero' | 'enemy' | 'summon') => {
    if (u.dead && u.animT > 0.7) return;
    const x = laneX(u.x);
    const alpha = u.dead ? Math.max(0, 1 - u.animT / 0.7) : 1;
    ctx.globalAlpha = alpha;
    // sombra
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.beginPath(); ctx.ellipse(x, groundY + 2, size * 0.9, size * 0.28, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(u.facing, 1);
    if (painter === 'hero') drawHeroFigure(ctx, u, t, size);
    else if (painter === 'summon') drawSummonFigure(ctx, u, t, size);
    else drawEnemyFigure(ctx, u, t, size);
    ctx.restore();
    ctx.globalAlpha = 1;
    // barra de vida
    if (!u.dead) drawHpBar(ctx, u, x, groundY - unitHeight(u, size), size);
  };

  // ordena por x (esquerda por cima) — inimigos e invocações e herói
  const all: { u: Unit; size: number; kind: 'hero' | 'enemy' | 'summon' }[] = [];
  for (const e of run.enemies) all.push({ u: e, size: heroSize * (ENEMY_BY_ID[e.defId]?.visual.scale ?? 1) * (e.tier === 'elite' ? 1.15 : 1), kind: 'enemy' });
  for (const s of run.summons) all.push({ u: s, size: heroSize * 0.8, kind: 'summon' });
  all.push({ u: run.hero, size: heroSize, kind: 'hero' });
  all.sort((a, b) => b.u.x - a.u.x);
  for (const it of all) drawUnit(it.u, it.size, it.kind);

  // partículas de combate
  for (const p of run.particles) {
    const px = laneX(p.x), py = groundY - p.y * H * 0.12;
    const a = Math.max(0, 1 - p.t / p.ttl);
    ctx.globalAlpha = a; ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(px, py, p.size * (0.6 + a * 0.6), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // textos flutuantes
  ctx.textAlign = 'center'; ctx.font = `700 ${Math.round(heroSize * 0.5)}px "Segoe UI", system-ui, sans-serif`;
  for (const f of run.floats) {
    const px = laneX(f.x), py = groundY - heroSize * 2.2 - f.t * 46;
    ctx.globalAlpha = Math.max(0, 1 - f.t);
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillText(f.text, px + 1, py + 1);
    ctx.fillStyle = f.color;
    ctx.font = `${f.crit ? 800 : 700} ${Math.round(heroSize * (f.crit ? 0.66 : 0.5))}px "Segoe UI", system-ui, sans-serif`;
    ctx.fillText(f.text, px, py);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // vinheta
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
  vg.addColorStop(0, 'transparent'); vg.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
}

function unitHeight(u: Unit, size: number): number { return size * 3.4; }

function drawHpBar(ctx: Ctx, u: Unit, x: number, y: number, size: number): void {
  const w = Math.max(size * 1.6, 28), h = Math.max(4, size * 0.14);
  const ratio = Math.max(0, u.hp / u.maxHp);
  ctx.fillStyle = 'rgba(0,0,0,0.6)'; rrPath(ctx, x - w / 2 - 1, y - 1, w + 2, h + 2, 3); ctx.fill();
  ctx.fillStyle = '#2a2030'; rrPath(ctx, x - w / 2, y, w, h, 2); ctx.fill();
  const col = u.side === 'hero' ? (u.defId && u.tier === undefined && u.summonTtl === undefined ? '#5ec86e' : '#7ad0f0')
    : u.tier === 'chefe' ? '#f04858' : u.tier === 'subchefe' ? '#f08838' : u.tier === 'elite' ? '#e0a0f0' : '#d86868';
  ctx.fillStyle = col; rrPath(ctx, x - w / 2, y, w * ratio, h, 2); ctx.fill();
  // escudo
  if (u.shield > 0) { ctx.fillStyle = 'rgba(140,200,255,0.85)'; const sr = Math.min(1, u.shield / u.maxHp); rrPath(ctx, x - w / 2, y - h * 0.5, w * sr, h * 0.5, 1); ctx.fill(); }
}

// ============ util ============
function rrPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
export function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}
