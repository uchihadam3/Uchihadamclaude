// Texturas desenhadas em canvas — o "capricho de maquete": chão com grão,
// remendos de superfície, linha de largada/chegada, setas de checkpoint, e os
// topos das tampinhas. Tudo procedural, leve e nítido.
import * as THREE from 'three';
import { TrackDef, Patch } from '../engine/track';
import { Skin } from '../game/skins';

const PX = 26;

function noise(ctx: CanvasRenderingContext2D, w: number, h: number, n: number, col: string, a: number, sz: number) {
  ctx.fillStyle = col;
  for (let i = 0; i < n; i++) {
    ctx.globalAlpha = a * (0.4 + Math.random() * 0.6);
    const x = Math.random() * w, y = Math.random() * h, s = sz * (0.5 + Math.random());
    ctx.beginPath(); ctx.arc(x, y, s, 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

const GROUND: Record<string, (c: CanvasRenderingContext2D, w: number, h: number) => void> = {
  dirt(c, w, h) { c.fillStyle = '#8a6a44'; c.fillRect(0, 0, w, h); noise(c, w, h, 2600, '#6f5334', 0.5, 2.2); noise(c, w, h, 1200, '#a07f52', 0.4, 2.4); },
  sand(c, w, h) { c.fillStyle = '#e6c98a'; c.fillRect(0, 0, w, h); noise(c, w, h, 3200, '#d3b273', 0.4, 1.7); noise(c, w, h, 900, '#f3ddab', 0.5, 2.0); },
  sidewalk(c, w, h) { c.fillStyle = '#b9b3a6'; c.fillRect(0, 0, w, h); noise(c, w, h, 1500, '#a49e90', 0.35, 2.4); c.strokeStyle = 'rgba(120,114,100,0.5)'; c.lineWidth = 3; for (let y = 0; y < h; y += PX * 6) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y + (Math.random() - 0.5) * 10); c.stroke(); } },
  cardboard(c, w, h) { c.fillStyle = '#cba875'; c.fillRect(0, 0, w, h); noise(c, w, h, 1200, '#b9915f', 0.4, 2.2); c.strokeStyle = 'rgba(150,110,70,0.28)'; c.lineWidth = 2; for (let x = 0; x < w; x += 10) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); } },
  grass(c, w, h) { c.fillStyle = '#5f8a3a'; c.fillRect(0, 0, w, h); noise(c, w, h, 2600, '#4d7530', 0.5, 2.4); noise(c, w, h, 1200, '#7aa54a', 0.5, 2.2); },
  mud: () => {}, water: () => {}, ramp: () => {}, chalk: () => {}, out: () => {},
};

function drawPatch(c: CanvasRenderingContext2D, p: Patch, map: (x: number, y: number) => [number, number]) {
  const [cx, cy] = map(p.x, p.y); const r = (p.r ?? Math.max(p.hw!, p.hh!)) * PX;
  c.save();
  c.beginPath();
  if (p.r != null) c.arc(cx, cy, r, 0, 7);
  else { const hw = p.hw! * PX, hh = p.hh! * PX; c.rect(cx - hw, cy - hh, hw * 2, hh * 2); }
  c.clip();
  const s = p.surface;
  if (s === 'sand') { c.fillStyle = '#ecd192'; c.fillRect(cx - r, cy - r, r * 2, r * 2); noise(c, 0, 0, 0, '', 0, 0); c.globalAlpha = 1; for (let i = 0; i < 400; i++) { c.globalAlpha = 0.3; c.fillStyle = '#d8b96f'; c.beginPath(); c.arc(cx + (Math.random() - 0.5) * r * 2, cy + (Math.random() - 0.5) * r * 2, 1.6, 0, 7); c.fill(); } c.globalAlpha = 1; }
  else if (s === 'mud') { const g = c.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, '#4a3620'); g.addColorStop(1, '#5c452a'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2); for (let i = 0; i < 30; i++) { c.globalAlpha = 0.3; c.fillStyle = '#6b5335'; c.beginPath(); c.arc(cx + (Math.random() - 0.5) * r * 1.6, cy + (Math.random() - 0.5) * r * 1.6, 3 + Math.random() * 4, 0, 7); c.fill(); } c.globalAlpha = 1; }
  else if (s === 'water') { const g = c.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, 'rgba(90,170,205,0.85)'); g.addColorStop(1, 'rgba(70,150,190,0.7)'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2); c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 2; for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(cx, cy, r * (0.3 + i * 0.15), 0.4, 2.2); c.stroke(); } }
  else if (s === 'ramp') { c.fillStyle = '#d9b98a'; c.fillRect(cx - r, cy - r, r * 2, r * 2); const ang = p.dir ?? -1.57; c.save(); c.translate(cx, cy); c.rotate(ang + 1.57); c.fillStyle = 'rgba(255,255,255,0.55)'; for (let i = -1; i <= 1; i++) { c.beginPath(); c.moveTo(-r * 0.4, r * 0.3 - i * 12); c.lineTo(0, -r * 0.3 - i * 12); c.lineTo(r * 0.4, r * 0.3 - i * 12); c.lineWidth = 6; c.strokeStyle = 'rgba(255,255,255,0.6)'; c.stroke(); } c.restore(); }
  else if (s === 'chalk') { c.fillStyle = 'rgba(255,255,255,0.15)'; c.fillRect(cx - r, cy - r, r * 2, r * 2); }
  else if (s === 'grass') { c.fillStyle = '#5a8636'; c.fillRect(cx - r, cy - r, r * 2, r * 2); for (let i = 0; i < 60; i++) { c.strokeStyle = '#6f9c40'; c.lineWidth = 2; const gx = cx + (Math.random() - 0.5) * r * 2, gy = cy + (Math.random() - 0.5) * r * 2; c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + (Math.random() - 0.5) * 6, gy - 6 - Math.random() * 6); c.stroke(); } }
  else if (s === 'sidewalk') { c.fillStyle = '#c6c0b2'; c.fillRect(cx - r, cy - r, r * 2, r * 2); }
  else if (s === 'cardboard') { c.fillStyle = '#d3b17e'; c.fillRect(cx - r, cy - r, r * 2, r * 2); }
  c.restore();
}

export function makeBoardTexture(def: TrackDef): THREE.CanvasTexture {
  const W = def.w * PX, H = def.h * PX;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d')!;
  const map = (x: number, y: number): [number, number] => [x * PX, y * PX];
  (GROUND[def.ground] || GROUND.dirt)(c, W, H);
  // vinheta suave
  const vg = c.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.16)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
  for (const p of def.patches) drawPatch(c, p, map);

  // guia do traçado (tracejado claro)
  c.strokeStyle = 'rgba(255,255,255,0.22)'; c.lineWidth = 3; c.setLineDash([10, 12]);
  c.beginPath(); def.path.forEach((p, i) => { const [x, y] = map(p.x, p.y); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); c.setLineDash([]);

  // checkpoints (bandeirinha/seta)
  def.checkpoints.forEach((cp, i) => { if (i === 0) return; const [x, y] = map(cp.x, cp.y); c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(x, y, 8, 0, 7); c.fill(); c.fillStyle = 'rgba(60,60,60,0.6)'; c.font = 'bold 16px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(i), x, y + 1); });

  // largada + chegada (xadrez)
  const checker = (a: [number, number], b: [number, number], col: string) => {
    const [ax, ay] = map(a[0], a[1]), [bx, by] = map(b[0], b[1]);
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
    const rows = 3, cell = len / 10;
    for (let r = 0; r < rows; r++) for (let k = 0; k < 10; k++) {
      c.fillStyle = ((r + k) % 2) ? col : '#fff';
      const px = ax + (dx * k / 10) + nx * (r - 1) * cell, py = ay + (dy * k / 10) + ny * (r - 1) * cell;
      c.save(); c.translate(px, py); c.rotate(Math.atan2(dy, dx)); c.fillRect(0, -cell / 2, cell, cell); c.restore();
    }
  };
  const sPerp = def.startAngle; const half = 3.2; const sn = { x: -Math.sin(sPerp), y: Math.cos(sPerp) };
  checker([def.start.x - sn.x * half, def.start.y - sn.y * half], [def.start.x + sn.x * half, def.start.y + sn.y * half], '#333');
  checker([def.finish[0].x, def.finish[0].y], [def.finish[1].x, def.finish[1].y], '#222');

  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.needsUpdate = true;
  return t;
}

// topo da tampinha por skin
export function makeCapTop(skin: Skin): THREE.CanvasTexture {
  const S = 256; const cv = document.createElement('canvas'); cv.width = cv.height = S;
  const c = cv.getContext('2d')!; const cx = S / 2, cy = S / 2;
  c.fillStyle = skin.side; c.beginPath(); c.arc(cx, cy, S * 0.48, 0, 7); c.fill();
  const g = c.createRadialGradient(cx - 30, cy - 40, 10, cx, cy, S * 0.46);
  g.addColorStop(0, lighten(skin.top, 30)); g.addColorStop(1, skin.top); c.fillStyle = g;
  c.beginPath(); c.arc(cx, cy, S * 0.43, 0, 7); c.fill();
  // aro
  c.strokeStyle = skin.ring; c.lineWidth = 10; c.beginPath(); c.arc(cx, cy, S * 0.37, 0, 7); c.stroke();
  // logo
  c.fillStyle = skin.ring; c.strokeStyle = skin.ring; c.textAlign = 'center'; c.textBaseline = 'middle';
  if (skin.logo === 'ridges') { for (let i = 0; i < 21; i++) { const a = i / 21 * 6.283; c.save(); c.translate(cx + Math.cos(a) * S * 0.4, cy + Math.sin(a) * S * 0.4); c.rotate(a); c.fillRect(-4, -8, 8, 16); c.restore(); } }
  else if (skin.logo === 'star') { star(c, cx, cy, 5, S * 0.22, S * 0.1, skin.ring); }
  else if (skin.logo === 'num') { c.fillStyle = skin.ring; c.font = `bold ${S * 0.4}px sans-serif`; c.fillText('7', cx, cy + 6); }
  else if (skin.logo === 'rust') { for (let i = 0; i < 40; i++) { c.globalAlpha = 0.4; c.fillStyle = '#5a3a1e'; c.beginPath(); c.arc(cx + (Math.random() - 0.5) * S * 0.7, cy + (Math.random() - 0.5) * S * 0.7, 2 + Math.random() * 6, 0, 7); c.fill(); } c.globalAlpha = 1; }
  else if (skin.logo === 'sticker') { c.fillStyle = '#fff'; c.beginPath(); c.arc(cx, cy, S * 0.18, 0, 7); c.fill(); star(c, cx, cy, 5, S * 0.14, S * 0.06, skin.top); }
  else if (skin.logo === 'hand') { c.strokeStyle = skin.ring; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, S * 0.16, 0.3, 5.6); c.stroke(); c.beginPath(); c.arc(cx + 4, cy - 4, S * 0.1, 0.5, 4); c.stroke(); }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

function star(c: CanvasRenderingContext2D, cx: number, cy: number, n: number, R: number, r: number, col: string) {
  c.fillStyle = col; c.beginPath();
  for (let i = 0; i < n * 2; i++) { const rad = i % 2 ? r : R; const a = i / (n * 2) * 6.283 - 1.57; const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad; i ? c.lineTo(x, y) : c.moveTo(x, y); }
  c.closePath(); c.fill();
}
export function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16); let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.min(255, r); g = Math.min(255, g); b = Math.min(255, b);
  return `rgb(${r},${g},${b})`;
}
