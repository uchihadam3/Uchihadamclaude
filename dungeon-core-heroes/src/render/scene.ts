import type { DungeonDef, RunState, Unit } from '../types';
import { ENEMY_BY_ID } from '../data/enemiesData';
import { ARENA_W } from '../game/combat';
import { heroFrame, FRAMES, pickAnim, type Anim } from './heroSprites';
import { enemyFrame, summonFrame, ENEMY_FRAMES, type EAnim } from './enemySprites';
import { drawDungeonPixel, hexA, mix } from './tiles';
import { blit } from './pixel';

type Ctx = CanvasRenderingContext2D;

// buffer interno de baixa resolução (pixel art)
let buf: HTMLCanvasElement | null = null;
let bctx: Ctx | null = null;
let ambient: { x: number; y: number; vx: number; vy: number; life: number; ttl: number }[] = [];

function ensureBuf(iw: number, ih: number): void {
  if (!buf) { buf = document.createElement('canvas'); bctx = buf.getContext('2d'); }
  if (buf.width !== iw || buf.height !== ih) { buf.width = iw; buf.height = ih; }
}

// escolhe o quadro de animação de uma unidade
function heroAnimFrame(u: Unit, t: number): { anim: Anim; frame: number } {
  const anim = pickAnim(u.anim);
  const count = FRAMES[anim];
  let frame: number;
  if (anim === 'walk') frame = Math.floor(t * 10) % count;
  else if (anim === 'idle' || anim === 'victory') frame = Math.floor(t * 3) % count;
  else if (anim === 'death') frame = Math.min(count - 1, Math.floor(u.animT / 0.14));
  else frame = Math.min(count - 1, Math.floor(u.animT / 0.09)); // attack/cast/hit
  return { anim, frame };
}
function enemyAnimFrame(u: Unit, t: number): { anim: EAnim; frame: number } {
  let anim: EAnim = 'idle';
  if (u.anim === 'walk') anim = 'walk'; else if (u.anim === 'attack') anim = 'attack';
  else if (u.anim === 'hit') anim = 'hit'; else if (u.anim === 'death') anim = 'death';
  const count = ENEMY_FRAMES[anim];
  let frame: number;
  if (anim === 'walk') frame = Math.floor((t + u.uid) * 7) % count;
  else if (anim === 'idle') frame = Math.floor((t + u.uid * 0.3) * 2.5) % count;
  else if (anim === 'death') frame = Math.min(count - 1, Math.floor(u.animT / 0.14));
  else frame = Math.min(count - 1, Math.floor(u.animT / 0.1));
  return { anim, frame };
}

export function drawScene(ctx: Ctx, W: number, H: number, run: RunState, d: DungeonDef, t: number, dt: number, scrollX: number): void {
  const PS = Math.max(3, Math.round(W / 300));   // pixels maiores → personagens maiores, look retrô
  const iw = Math.ceil(W / PS), ih = Math.ceil(H / PS);
  ensureBuf(iw, ih);
  const b = bctx!;
  b.imageSmoothingEnabled = false;
  b.clearRect(0, 0, iw, ih);

  const shakeX = run.shake > 0 ? Math.round((Math.random() - 0.5) * run.shake * 5) : 0;
  const shakeY = run.shake > 0 ? Math.round((Math.random() - 0.5) * run.shake * 3) : 0;
  b.save();
  b.translate(shakeX, shakeY);

  const floorY = drawDungeonPixel(b, iw, ih, d, t, scrollX);
  const groundY = floorY + Math.round((ih - floorY) * 0.34);
  const pad = 22;
  const laneX = (x: number) => pad + (x / ARENA_W) * (iw - pad * 2);

  // partículas de ambiente (pixel)
  updateAmbient(b, iw, ih, d, dt);

  // ordena por x (fundo→frente: maior x atrás)
  const order: { u: Unit; kind: 'hero' | 'enemy' | 'summon' }[] = [];
  for (const e of run.enemies) order.push({ u: e, kind: 'enemy' });
  for (const s of run.summons) order.push({ u: s, kind: 'summon' });
  order.push({ u: run.hero, kind: 'hero' });
  order.sort((p, q) => q.u.x - p.u.x);

  const floatPos: { x: number; y: number }[] = [];
  for (const it of order) {
    const u = it.u;
    if (u.dead && u.animT > 0.7) continue;
    const x = Math.round(laneX(u.x));
    // sombra
    b.fillStyle = 'rgba(0,0,0,0.32)';
    b.beginPath(); b.ellipse(x, groundY + 1, 9, 3, 0, 0, Math.PI * 2); b.fill();
    let sprite: HTMLCanvasElement, scale = 1;
    if (it.kind === 'hero') { const af = heroAnimFrame(u, t); sprite = heroFrame(u.defId as never, af.anim, af.frame); }
    else if (it.kind === 'summon') { const af = enemyAnimFrame(u, t); sprite = summonFrame(u.defId, af.anim, af.frame); }
    else { const af = enemyAnimFrame(u, t); sprite = enemyFrame(u.defId, af.anim, af.frame); const vs = ENEMY_BY_ID[u.defId]?.visual.scale ?? 1; scale = u.tier === 'chefe' ? 3 : u.tier === 'subchefe' ? 2 : vs >= 1.3 ? 2 : 1; }
    blit(b, sprite, x, groundY, scale, u.facing);
    // status tint (queimando/envenenado)
    tintStatus(b, u, x, groundY, sprite.height * scale);
    // barra de vida
    if (!u.dead) drawHpBar(b, u, x, groundY - sprite.height * scale - 3, scale);
    floatPos.push({ x, y: groundY - sprite.height * scale });
  }

  // partículas de combate (pixel)
  for (const p of run.particles) {
    const px = Math.round(laneX(p.x)), py = Math.round(groundY - p.y * ih * 0.12);
    const al = Math.max(0, 1 - p.t / p.ttl);
    b.globalAlpha = al; b.fillStyle = p.color;
    const s = Math.max(1, Math.round(p.size * 0.5 * (0.5 + al)));
    b.fillRect(px - (s >> 1), py - (s >> 1), s, s);
  }
  b.globalAlpha = 1;
  b.restore();

  // amplia buffer → tela (nítido)
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(buf!, 0, 0, iw, ih, 0, 0, W, H);

  // efeitos de habilidade em resolução plena (glow)
  const gyM = (groundY + shakeY) * PS;
  const lxM = (x: number) => (laneX(x) + shakeX) * PS;
  const unitPx = (laneX(1) - laneX(0)) * PS;
  drawFx(ctx, run, lxM, gyM, PS, unitPx);

  // textos flutuantes em resolução plena (legibilidade)
  ctx.save();
  ctx.translate(shakeX * PS, shakeY * PS);
  ctx.textAlign = 'center';
  const fs = Math.max(13, Math.round(H * 0.026));
  for (const f of run.floats) {
    const px = laneX(f.x) * PS, py = (groundY * PS) - H * 0.16 - f.t * H * 0.06;
    ctx.globalAlpha = Math.max(0, 1 - f.t);
    ctx.font = `900 ${f.crit ? fs + 6 : fs}px "Segoe UI", system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillText(f.text, px + 2, py + 2);
    ctx.fillStyle = f.color; ctx.fillText(f.text, px, py);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // vinheta
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.34, W / 2, H / 2, H * 0.86);
  vg.addColorStop(0, 'transparent'); vg.addColorStop(1, 'rgba(0,0,0,0.52)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
}

// ============ DESENHO DOS EFEITOS DE HABILIDADE ============
function drawFx(ctx: Ctx, run: RunState, lx: (x: number) => number, gy: number, PS: number, unitPx: number): void {
  ctx.save();
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const f of run.fx) {
    const p = Math.min(1, f.t / f.ttl);       // progresso 0-1
    const a = 1 - p;
    const yTo = (h: number) => gy - h * PS * 0.55;
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = a;
    ctx.shadowColor = f.color; ctx.shadowBlur = 14 * PS / 3;
    switch (f.kind) {
      case 'projectile': {
        const x = lx(f.x + (f.tx - f.x) * p), y = yTo(f.y);
        for (let k = 0; k < 4; k++) { const pp = Math.max(0, p - k * 0.06); const xx = lx(f.x + (f.tx - f.x) * pp); ctx.globalAlpha = a * (1 - k * 0.22); ctx.fillStyle = k === 0 ? (f.color2 ?? '#fff') : f.color; ctx.beginPath(); ctx.arc(xx, y, (6 - k) * PS / 3, 0, 7); ctx.fill(); }
        break;
      }
      case 'slash': {
        const x = lx(f.tx), y = yTo(f.y), R = (14 + (f.r ?? 0) * 6) * PS / 3;
        ctx.strokeStyle = f.color2 ?? '#fff'; ctx.lineWidth = 3 * PS / 3;
        ctx.beginPath(); ctx.arc(x, y, R, -1.1 + p * 1.6, 0.7 + p * 1.6); ctx.stroke();
        ctx.strokeStyle = f.color; ctx.lineWidth = 6 * PS / 3; ctx.globalAlpha = a * 0.6;
        ctx.beginPath(); ctx.arc(x, y, R, -1.0 + p * 1.6, 0.6 + p * 1.6); ctx.stroke();
        break;
      }
      case 'aoe': case 'nova': {
        const x = lx(f.tx), y = f.kind === 'nova' ? gy - 4 * PS : yTo(f.y);
        const R = (f.r ?? 3) * unitPx * (0.3 + p * 0.9);
        ctx.strokeStyle = f.color2 ?? f.color; ctx.lineWidth = (f.kind === 'nova' ? 5 : 3) * PS / 3;
        ctx.beginPath(); ctx.ellipse(x, y, R, R * 0.4, 0, 0, 7); ctx.stroke();
        if (f.kind === 'nova') { ctx.globalAlpha = a * 0.4; ctx.fillStyle = f.color; ctx.beginPath(); ctx.ellipse(x, y, R, R * 0.4, 0, 0, 7); ctx.fill(); }
        break;
      }
      case 'ground': {
        const x = lx(f.tx), R = (f.r ?? 3) * unitPx;
        const n = 10; ctx.fillStyle = f.color;
        for (let k = 0; k < n; k++) { const fx2 = x - R + (k / n) * R * 2; const fh = (4 + Math.abs(Math.sin(f.t * 12 + k)) * 10) * PS / 3; ctx.globalAlpha = a * 0.7; ctx.fillRect(fx2, gy - fh, 2 * PS / 3, fh); }
        break;
      }
      case 'meteor': {
        const x = lx(f.tx), y0 = yTo(28), y1 = gy - 4 * PS;
        const y = y0 + (y1 - y0) * p, sx = x + (1 - p) * 40 * PS / 3;
        ctx.strokeStyle = f.color2 ?? '#fff'; ctx.lineWidth = 5 * PS / 3;
        ctx.beginPath(); ctx.moveTo(sx + 20 * PS / 3, y - 30 * PS / 3); ctx.lineTo(sx, y); ctx.stroke();
        ctx.fillStyle = f.color; ctx.beginPath(); ctx.arc(sx, y, 6 * PS / 3, 0, 7); ctx.fill();
        if (p > 0.85) { ctx.globalAlpha = (1 - p) / 0.15; ctx.fillStyle = f.color2 ?? '#fff'; ctx.beginPath(); ctx.ellipse(x, y1, 40 * PS / 3, 14 * PS / 3, 0, 0, 7); ctx.fill(); }
        break;
      }
      case 'arrows': {
        const x = lx(f.tx), R = (f.r ?? 3) * unitPx;
        ctx.strokeStyle = f.color; ctx.lineWidth = 2 * PS / 3;
        for (let k = 0; k < 7; k++) { const ax = x - R + (k / 6) * R * 2; const off = ((f.t * 3 + k * 0.13) % 1); const ay = yTo(24) + off * (gy - yTo(24)); ctx.globalAlpha = a; ctx.beginPath(); ctx.moveTo(ax + 6 * PS / 3, ay - 8 * PS / 3); ctx.lineTo(ax, ay); ctx.stroke(); }
        break;
      }
      case 'bolt': {
        const x0 = lx(f.x), y0 = yTo(f.y), x1 = lx(f.tx), y1 = yTo(14);
        ctx.strokeStyle = f.color2 ?? '#fff'; ctx.lineWidth = 2.4 * PS / 3;
        ctx.beginPath(); ctx.moveTo(x0, y0);
        const seg = 5; for (let k = 1; k <= seg; k++) { const t2 = k / seg; const jx = (Math.sin((f.seed ?? 0) + k * 3.1) * 8) * PS / 3 * (1 - t2); ctx.lineTo(x0 + (x1 - x0) * t2 + jx, y0 + (y1 - y0) * t2); } ctx.stroke();
        break;
      }
      case 'heal': {
        const x = lx(f.x); ctx.fillStyle = f.color;
        for (let k = 0; k < 6; k++) { const ang = (f.seed ?? 0) + k; const rr = 12 * PS / 3; const hx = x + Math.cos(ang) * rr; const hy = yTo(f.y) - p * 24 * PS / 3 + Math.sin(ang) * rr * 0.4; ctx.globalAlpha = a; ctx.fillRect(hx - PS / 3, hy - 3 * PS / 3, 2 * PS / 3, 6 * PS / 3); ctx.fillRect(hx - 3 * PS / 3, hy - PS / 3, 6 * PS / 3, 2 * PS / 3); }
        break;
      }
      case 'buff': case 'shield': {
        const x = lx(f.x), y = yTo(10), R = (14 + p * 8) * PS / 3;
        ctx.strokeStyle = f.color; ctx.lineWidth = 2.5 * PS / 3;
        ctx.beginPath(); for (let k = 0; k <= 6; k++) { const ang = -Math.PI / 2 + k / 6 * Math.PI * 2; const px = x + Math.cos(ang) * R, py = y + Math.sin(ang) * R * 1.3; k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.closePath(); ctx.stroke();
        break;
      }
      case 'summon': {
        const x = lx(f.x), R = (6 + p * 16) * PS / 3;
        ctx.strokeStyle = f.color; ctx.lineWidth = 2 * PS / 3;
        ctx.beginPath(); ctx.ellipse(x, gy - 3 * PS, R, R * 0.4, 0, 0, 7); ctx.stroke();
        break;
      }
    }
  }
  ctx.restore();
}

function tintStatus(b: Ctx, u: Unit, x: number, groundY: number, hpx: number): void {
  // pequenos pixels de status subindo do corpo (sem retângulo opaco)
  const has = (id: string) => u.statuses.some((s) => s.id === id);
  let col = ''; if (has('burn')) col = '#ff8a2a'; else if (has('poison') || has('acid')) col = '#a8e858'; else if (has('shock')) col = '#a8e0ff'; else if (has('bleed')) col = '#e04858';
  if (!col) return;
  b.fillStyle = col;
  const now = performance.now() / 1000;
  for (let k = 0; k < 3; k++) {
    const ph = (now * 1.4 + k * 0.33 + u.uid) % 1;
    const px = Math.round(x - 4 + ((k * 5 + u.uid) % 9));
    const py = Math.round(groundY - ph * hpx);
    b.globalAlpha = 0.8 * (1 - ph);
    b.fillRect(px, py, 1, 1);
  }
  b.globalAlpha = 1;
}

function drawHpBar(b: Ctx, u: Unit, x: number, y: number, scale: number): void {
  const w = Math.max(12, 8 + scale * 6), hgt = 2;
  const ratio = Math.max(0, u.hp / u.maxHp);
  b.fillStyle = 'rgba(0,0,0,0.7)'; b.fillRect(x - w / 2 - 1, y - 1, w + 2, hgt + 2);
  b.fillStyle = '#2a2030'; b.fillRect(x - w / 2, y, w, hgt);
  const col = u.side === 'hero' ? (u.summonTtl !== undefined ? '#7ad0f0' : '#5ec86e')
    : u.tier === 'chefe' ? '#f04858' : u.tier === 'subchefe' ? '#f08838' : u.tier === 'elite' ? '#e0a0f0' : '#d86868';
  b.fillStyle = col; b.fillRect(x - w / 2, y, Math.round(w * ratio), hgt);
  if (u.shield > 0) { b.fillStyle = 'rgba(150,205,255,0.9)'; b.fillRect(x - w / 2, y - 1, Math.round(w * Math.min(1, u.shield / u.maxHp)), 1); }
}

function updateAmbient(b: Ctx, iw: number, ih: number, d: DungeonDef, dt: number): void {
  const kind = d.ambient.particles;
  if (ambient.length < 30 && Math.random() < 0.4) {
    const up = kind === 'embers' || kind === 'bubbles';
    ambient.push({ x: Math.random() * iw, y: up ? ih * 0.7 : Math.random() * ih * 0.6, vx: (Math.random() - 0.5) * 6, vy: up ? -6 - Math.random() * 8 : 3 + Math.random() * 6, life: 0, ttl: 4 + Math.random() * 4 });
  }
  b.fillStyle = hexA(d.ambient.glow, 0.55);
  for (let i = ambient.length - 1; i >= 0; i--) {
    const p = ambient[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.life += dt;
    b.globalAlpha = Math.max(0, 0.6 - p.life / p.ttl * 0.6);
    b.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
    if (p.life > p.ttl || p.y < -2 || p.y > ih + 2) ambient.splice(i, 1);
  }
  b.globalAlpha = 1;
  void mix;
}
