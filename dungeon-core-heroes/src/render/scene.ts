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
  const PS = Math.max(2, Math.round(W / 380));
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
  const groundY = floorY + Math.round((ih - floorY) * 0.28);
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

function tintStatus(b: Ctx, u: Unit, x: number, groundY: number, hpx: number): void {
  const has = (id: string) => u.statuses.some((s) => s.id === id);
  let col = ''; if (has('burn')) col = 'rgba(255,120,40,0.22)'; else if (has('poison') || has('acid')) col = 'rgba(140,220,60,0.2)'; else if (has('shock')) col = 'rgba(140,200,255,0.22)'; else if (has('bleed')) col = 'rgba(220,40,60,0.18)';
  if (!col) return;
  b.fillStyle = col; b.fillRect(x - 10, groundY - hpx, 20, hpx);
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
