// Texturas desenhadas em canvas — o "capricho de maquete": chão com grão,
// remendos de superfície, linha de largada/chegada, setas de checkpoint, e os
// topos das tampinhas. Tudo procedural, leve e nítido.
import * as THREE from 'three';
import { TrackDef, Patch } from '../engine/track';

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
  dirt(c, w, h) { c.fillStyle = '#8a6a44'; c.fillRect(0, 0, w, h); noise(c, w, h, 2600, '#6f5334', 0.5, 2.2); noise(c, w, h, 1400, '#a07f52', 0.4, 2.4); noise(c, w, h, 500, '#4f3a1f', 0.45, 3.4); noise(c, w, h, 120, '#3a2810', 0.35, 5.5); },
  sand(c, w, h) { c.fillStyle = '#e6c98a'; c.fillRect(0, 0, w, h); noise(c, w, h, 3200, '#d3b273', 0.4, 1.7); noise(c, w, h, 900, '#f3ddab', 0.5, 2.0); c.strokeStyle = 'rgba(198,168,108,0.22)'; c.lineWidth = 2; for (let y = 0; y < h; y += 24) { c.beginPath(); for (let x = 0; x < w; x += 22) c.lineTo(x, y + Math.sin(x * 0.02 + y * 0.1) * 4); c.stroke(); } },
  sidewalk(c, w, h) { c.fillStyle = '#b9b3a6'; c.fillRect(0, 0, w, h); noise(c, w, h, 1800, '#a49e90', 0.35, 2.4); noise(c, w, h, 700, '#cfc9bc', 0.35, 2.2); c.strokeStyle = 'rgba(120,114,100,0.5)'; c.lineWidth = 3; for (let y = 0; y < h; y += PX * 6) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y + (Math.random() - 0.5) * 10); c.stroke(); } c.strokeStyle = 'rgba(90,84,72,0.35)'; c.lineWidth = 1.4; for (let i = 0; i < 8; i++) { c.beginPath(); let x = Math.random() * w, y = Math.random() * h; c.moveTo(x, y); for (let k = 0; k < 4; k++) { x += (Math.random() - 0.5) * 90; y += (Math.random() - 0.5) * 90; c.lineTo(x, y); } c.stroke(); } },
  cardboard(c, w, h) { c.fillStyle = '#cba875'; c.fillRect(0, 0, w, h); noise(c, w, h, 1200, '#b9915f', 0.4, 2.2); c.strokeStyle = 'rgba(150,110,70,0.26)'; c.lineWidth = 2; for (let x = 0; x < w; x += 10) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); } c.fillStyle = 'rgba(214,204,184,0.45)'; for (let i = 0; i < 5; i++) { c.save(); c.translate(Math.random() * w, Math.random() * h); c.rotate(Math.random() * 3); c.fillRect(-42, -8, 84, 16); c.restore(); } },
  grass(c, w, h) { c.fillStyle = '#4f7d30'; c.fillRect(0, 0, w, h); noise(c, w, h, 2200, '#3e6626', 0.5, 2.6); noise(c, w, h, 1200, '#6f9c40', 0.5, 2.2); c.lineWidth = 1.4; const nb = Math.min(6000, Math.floor(w * h / 1100)); for (let i = 0; i < nb; i++) { const gx = Math.random() * w, gy = Math.random() * h, r = Math.random(); c.strokeStyle = r < 0.45 ? '#3c6322' : r < 0.8 ? '#6fa840' : '#84c052'; c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + (Math.random() - 0.5) * 4, gy - 4 - Math.random() * 5); c.stroke(); } },
  mud: () => {}, water: () => {}, ramp: () => {}, push: () => {}, chalk: () => {}, ice: () => {}, out: () => {},
};

// hash e formas ORGÂNICAS — nada de círculo perfeito: manchas naturais (redondas
// tortas) e poças compridas, cada uma com uma silhueta própria (seed = posição).
function phash(x: number, y: number): number { const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return h - Math.floor(h); }
function blobPath(c: CanvasRenderingContext2D, cx: number, cy: number, r: number, seed: number) { const N = 22; c.beginPath(); for (let i = 0; i <= N; i++) { const a = i / N * Math.PI * 2; const w = 0.80 + 0.20 * Math.sin(a * 3 + seed * 6.283) + 0.10 * Math.sin(a * 5 - seed * 9); const rr = r * w; const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); }
function blobRect(c: CanvasRenderingContext2D, cx: number, cy: number, hw: number, hh: number, seed: number) { const N = 26; c.beginPath(); for (let i = 0; i <= N; i++) { const a = i / N * Math.PI * 2; const wob = 1 + 0.12 * Math.sin(a * 4 + seed * 6.283); const x = cx + Math.cos(a) * hw * wob, y = cy + Math.sin(a) * hh * wob; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); }

function drawPatch(c: CanvasRenderingContext2D, p: Patch, map: (x: number, y: number) => [number, number], px: number) {
  const [cx, cy] = map(p.x, p.y);
  const rect = p.r == null && p.hw != null && p.hh != null;
  const hw = (p.hw ?? p.r ?? 1) * px, hh = (p.hh ?? p.r ?? 1) * px; const r = Math.max(hw, hh);
  const seed = phash(Math.round(p.x * 1.7), Math.round(p.y * 1.3));
  const s = p.surface;
  const shape = () => rect ? blobRect(c, cx, cy, hw, hh, seed) : blobPath(c, cx, cy, (p.r ?? 1) * px, seed);

  // RAMPA (verde) / EMPURRÃO (vermelho): placas chapadas com setas nítidas
  if (s === 'ramp' || s === 'push') {
    c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.clip();
    c.save(); c.translate(cx, cy); c.rotate(1.57 - (p.dir ?? -1.57));
    const g = c.createLinearGradient(0, r, 0, -r);
    if (s === 'ramp') { g.addColorStop(0, '#1f7a3a'); g.addColorStop(1, '#43c463'); } else { g.addColorStop(0, '#8a1810'); g.addColorStop(1, '#ef5a5f'); }
    c.fillStyle = g; c.fillRect(-r, -r, r * 2, r * 2);
    c.strokeStyle = 'rgba(255,255,255,0.95)'; c.lineWidth = r * 0.16; c.lineCap = 'round'; c.lineJoin = 'round';
    for (let i = -1; i <= 1; i++) { const y = i * r * 0.52; c.beginPath(); c.moveTo(-r * 0.5, y + r * 0.24); c.lineTo(0, y - r * 0.24); c.lineTo(r * 0.5, y + r * 0.24); c.stroke(); }
    c.restore(); c.restore(); return;
  }

  let x = Math.sin((seed + 1) * 99.13) * 9999; const R = () => { x = Math.sin(x) * 9999; return x - Math.floor(x); };
  c.save(); shape(); c.clip();
  const box = (col: string) => { c.fillStyle = col; c.fillRect(cx - r, cy - r, r * 2, r * 2); };
  if (s === 'sand') {
    const g = c.createRadialGradient(cx, cy - r * 0.2, r * 0.2, cx, cy, r); g.addColorStop(0, '#f0d79a'); g.addColorStop(1, '#d6b271'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2);
    c.lineWidth = Math.max(1.5, px * 0.1); c.lineCap = 'round';
    for (let i = 0; i < 6; i++) { const yy = cy - r + (i + R()) * r * 0.34; c.strokeStyle = i % 2 ? 'rgba(255,246,214,0.5)' : 'rgba(180,150,96,0.45)'; c.beginPath(); for (let xx = cx - r; xx <= cx + r; xx += px * 0.4) c.lineTo(xx, yy + Math.sin(xx * 0.05 + i) * px * 0.5); c.stroke(); }
    for (let i = 0; i < 240; i++) { c.globalAlpha = 0.35; c.fillStyle = R() < 0.5 ? '#c9a86a' : '#fdeec4'; c.beginPath(); c.arc(cx + (R() - 0.5) * r * 2, cy + (R() - 0.5) * r * 2, px * 0.06, 0, 7); c.fill(); } c.globalAlpha = 1;
  } else if (s === 'mud') {
    const g = c.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.1, cx, cy, r); g.addColorStop(0, '#6b4d2a'); g.addColorStop(0.7, '#4a3418'); g.addColorStop(1, '#33240f'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2);
    for (let i = 0; i < 16; i++) { c.fillStyle = R() < 0.5 ? 'rgba(92,68,38,0.7)' : 'rgba(38,26,12,0.6)'; c.beginPath(); c.arc(cx + (R() - 0.5) * r * 1.5, cy + (R() - 0.5) * r * 1.5, px * (0.14 + R() * 0.36), 0, 7); c.fill(); }
    const sh = c.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 0, cx - r * 0.3, cy - r * 0.35, r * 0.85); sh.addColorStop(0, 'rgba(255,240,200,0.28)'); sh.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = sh; c.fillRect(cx - r, cy - r, r * 2, r * 2);
  } else if (s === 'water') {
    const g = c.createRadialGradient(cx, cy, r * 0.15, cx, cy, r); g.addColorStop(0, 'rgba(120,200,235,0.92)'); g.addColorStop(0.7, 'rgba(70,150,200,0.92)'); g.addColorStop(1, 'rgba(40,110,165,0.94)'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2);
    c.strokeStyle = 'rgba(255,255,255,0.42)'; c.lineWidth = Math.max(1.2, px * 0.07); for (let i = 1; i <= 5; i++) { c.globalAlpha = 0.5 - i * 0.06; c.beginPath(); c.arc(cx - r * 0.15, cy - r * 0.1, r * (0.18 + i * 0.16), 0.3, 2.5); c.stroke(); } c.globalAlpha = 1;
    c.fillStyle = 'rgba(255,255,255,0.55)'; c.beginPath(); c.ellipse(cx - r * 0.35, cy - r * 0.4, r * 0.28, r * 0.09, -0.5, 0, 7); c.fill();
    for (let i = 0; i < 8; i++) { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(cx + (R() - 0.5) * r * 1.6, cy + (R() - 0.5) * r * 1.6, px * 0.05, 0, 7); c.fill(); }
  } else if (s === 'grass') {
    box('#4d7a2e');
    for (let i = 0; i < 200; i++) { const gx = cx + (R() - 0.5) * r * 2, gy = cy + (R() - 0.5) * r * 2, hgt = px * (0.3 + R() * 0.5); c.strokeStyle = R() < 0.4 ? '#3c6322' : R() < 0.8 ? '#5f9a38' : '#7bbd4a'; c.lineWidth = Math.max(1, px * 0.05); c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + (R() - 0.5) * px * 0.3, gy - hgt); c.stroke(); }
  } else if (s === 'ice') {
    // GELO: placa azul-clarinha vítrea com rachaduras e brilho — escorrega TUDO
    const g = c.createRadialGradient(cx - r * 0.25, cy - r * 0.3, r * 0.1, cx, cy, r);
    g.addColorStop(0, 'rgba(235,250,255,0.95)'); g.addColorStop(0.6, 'rgba(185,228,248,0.92)'); g.addColorStop(1, 'rgba(140,200,235,0.94)');
    c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2);
    c.strokeStyle = 'rgba(255,255,255,0.75)'; c.lineWidth = Math.max(1, px * 0.055); c.lineCap = 'round';
    for (let i = 0; i < 5; i++) { let xx = cx + (R() - 0.5) * r, yy = cy + (R() - 0.5) * r; c.beginPath(); c.moveTo(xx, yy); for (let k = 0; k < 3; k++) { xx += (R() - 0.5) * r * 0.9; yy += (R() - 0.5) * r * 0.9; c.lineTo(xx, yy); } c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.ellipse(cx - r * 0.3, cy - r * 0.35, r * 0.3, r * 0.1, -0.6, 0, 7); c.fill();
    c.strokeStyle = 'rgba(120,180,220,0.5)'; c.lineWidth = Math.max(1, px * 0.04);
    for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(cx + (R() - 0.5) * r, cy + (R() - 0.5) * r, r * (0.1 + R() * 0.2), R() * 3, R() * 3 + 2); c.stroke(); }
  } else if (s === 'chalk') {
    c.fillStyle = 'rgba(240,240,245,0.14)'; c.fillRect(cx - r, cy - r, r * 2, r * 2);
    const cols = ['#ff8fb0', '#8fd0ff', '#ffe38f', '#a0ffb0', '#c9a0ff'];
    for (let i = 0; i < 5; i++) { c.strokeStyle = cols[i % cols.length]; c.globalAlpha = 0.55; c.lineWidth = px * 0.14; c.lineCap = 'round'; const sx = cx + (R() - 0.5) * r, sy = cy + (R() - 0.5) * r; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + (R() - 0.5) * r, sy + (R() - 0.5) * r); c.stroke(); } c.globalAlpha = 1;
  } else if (s === 'cardboard') {
    box('#cba875'); c.strokeStyle = 'rgba(150,110,70,0.32)'; c.lineWidth = px * 0.12; for (let xx = cx - r; xx < cx + r; xx += px * 0.55) { c.beginPath(); c.moveTo(xx, cy - r); c.lineTo(xx, cy + r); c.stroke(); }
  } else if (s === 'sidewalk') {
    box('#c6c0b2'); for (let i = 0; i < 60; i++) { c.globalAlpha = 0.3; c.fillStyle = R() < 0.5 ? '#b0a99a' : '#dad4c6'; c.beginPath(); c.arc(cx + (R() - 0.5) * r * 2, cy + (R() - 0.5) * r * 2, px * 0.07, 0, 7); c.fill(); } c.globalAlpha = 1; c.strokeStyle = 'rgba(120,114,100,0.5)'; c.lineWidth = px * 0.08; c.beginPath(); c.moveTo(cx - r, cy + (R() - 0.5) * r); c.lineTo(cx + r, cy + (R() - 0.5) * r); c.stroke();
  } else box('#c9bfa8');
  c.restore();
  // contorno pra a mancha parecer "assentada" no chão
  c.save(); shape(); c.lineWidth = Math.max(2, px * 0.16); c.strokeStyle = s === 'water' ? 'rgba(20,70,110,0.5)' : s === 'ice' ? 'rgba(90,150,200,0.55)' : 'rgba(0,0,0,0.2)'; c.stroke(); c.restore();
}

// bordas do corredor (esq/dir) a partir do traçado + meia-largura por ponto
function corridorBorders(def: TrackDef): { L: [number, number][]; R: [number, number][] } {
  const path = def.path, half = def.half; const L: [number, number][] = [], R: [number, number][] = [];
  for (let i = 0; i < path.length; i++) {
    const a = path[Math.max(0, i - 1)], b = path[Math.min(path.length - 1, i + 1)];
    let nx = -(b.y - a.y), ny = (b.x - a.x); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
    const hw = half[i];
    L.push([path[i].x + nx * hw, path[i].y + ny * hw]); R.push([path[i].x - nx * hw, path[i].y - ny * hw]);
  }
  return { L, R };
}

export function makeBoardTexture(def: TrackDef): THREE.CanvasTexture {
  // resolução adaptativa: mira ~3800px no maior lado (bem mais nítido) sem passar
  // do limite de textura (4096) mesmo nas pistas grandes.
  const maxDim = Math.max(def.w, def.h);
  const px = Math.max(9, Math.min(30, Math.floor(3800 / maxDim)));
  const W = Math.round(def.w * px), H = Math.round(def.h * px);
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d')!;
  // NB: o plano do chão é girado -90° em X e a textura usa flipY=false, o que
  // espelha a textura no eixo Y do mundo. Compensamos aqui (H - y) para o desenho
  // (pista, muros, bandeiras) casar exatamente com a física (tampinhas e muros 3D).
  const map = (x: number, y: number): [number, number] => [x * px, H - y * px];
  const paintGround = () => (GROUND[def.ground] || GROUND.dirt)(c, W, H);
  paintGround();

  const { L, R } = corridorBorders(def);
  // região do corredor = UNIÃO de DISCOS ao longo do traçado + pads. É robusto a
  // curvas fechadas: o polígono de "fita" (borda esq+dir) se auto-cruzava nas
  // curvas apertadas e a regra even-odd invertia o preenchimento (a pista real
  // ficava escura e o fora, claro). A união de discos nunca inverte.
  const corridor = new Path2D();
  for (let i = 0; i < def.path.length; i++) { const [cx, cy] = map(def.path[i].x, def.path[i].y); const r = def.half[i] * px; corridor.moveTo(cx + r, cy); corridor.arc(cx, cy, r, 0, Math.PI * 2); }
  for (const pd of def.pads) { const [cx, cy] = map(pd.x, pd.y); const r = pd.r * px; corridor.moveTo(cx + r, cy); corridor.arc(cx, cy, r, 0, Math.PI * 2); }
  // escurece TUDO e reacende só o corredor (clip nonzero = união dos discos)
  c.fillStyle = 'rgba(18,12,6,0.42)'; c.fillRect(0, 0, W, H);
  c.save(); c.clip(corridor, 'nonzero'); paintGround(); c.restore();

  // remendos de superfície (dentro do corredor)
  for (const p of def.patches) drawPatch(c, p, map, px);

  // LINHAS DA PISTA — marcam a pista inteira, mesmo sem muro (contorno + miolo claro)
  const stroke = (pts: [number, number][], wid: number, col: string) => { c.strokeStyle = col; c.lineWidth = wid; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath(); pts.forEach((p, i) => { const [x, y] = map(p[0], p[1]); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); };
  stroke(L, Math.max(3, px * 0.55), 'rgba(35,22,10,0.55)'); stroke(R, Math.max(3, px * 0.55), 'rgba(35,22,10,0.55)');
  stroke(L, Math.max(1.6, px * 0.28), 'rgba(255,250,238,0.95)'); stroke(R, Math.max(1.6, px * 0.28), 'rgba(255,250,238,0.95)');

  // linha central tracejada (guia)
  c.strokeStyle = 'rgba(255,255,255,0.30)'; c.lineWidth = Math.max(2, px * 0.16); c.setLineDash([px, px * 1.2]);
  c.beginPath(); def.path.forEach((p, i) => { const [x, y] = map(p.x, p.y); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); c.setLineDash([]);

  // CHECKPOINTS — bem visíveis: uma FAIXA azul atravessando o corredor + número
  // grande num círculo. Passar por cima registra o checkpoint (regra por arco).
  const nearestIdx = (q: { x: number; y: number }): number => { let bi = 0, bd = 1e9; for (let k = 0; k < def.path.length; k++) { const dx = def.path[k].x - q.x, dy = def.path[k].y - q.y, d = dx * dx + dy * dy; if (d < bd) { bd = d; bi = k; } } return bi; };
  def.checkpoints.forEach((cp, i) => {
    if (i === 0) return;
    const bi = nearestIdx(cp); const a = def.path[Math.max(0, bi - 1)], b = def.path[Math.min(def.path.length - 1, bi + 1)];
    let nx = -(b.y - a.y), ny = (b.x - a.x); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; const hw = def.half[bi];
    const [x1, y1] = map(cp.x + nx * hw, cp.y + ny * hw), [x2, y2] = map(cp.x - nx * hw, cp.y - ny * hw), [xc, yc] = map(cp.x, cp.y);
    c.lineCap = 'butt';
    c.strokeStyle = 'rgba(40,190,235,0.42)'; c.lineWidth = px * 1.1; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = Math.max(2, px * 0.18); c.setLineDash([px * 0.55, px * 0.4]); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.setLineDash([]);
    c.fillStyle = '#1f9ad0'; c.beginPath(); c.arc(xc, yc, px * 0.66, 0, 7); c.fill();
    c.lineWidth = Math.max(2, px * 0.14); c.strokeStyle = '#eafcff'; c.stroke();
    c.fillStyle = '#fff'; c.font = `900 ${Math.round(px * 0.82)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(i), xc, yc + 1);
  });

  // largada + chegada (xadrez)
  const checker = (a: [number, number], b: [number, number], col: string) => {
    const [ax, ay] = map(a[0], a[1]), [bx, by] = map(b[0], b[1]);
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    const rows = 3, cell = len / 10;
    for (let r = 0; r < rows; r++) for (let k = 0; k < 10; k++) {
      c.fillStyle = ((r + k) % 2) ? col : '#fff';
      const qx = ax + (dx * k / 10) + nx * (r - 1) * cell, qy = ay + (dy * k / 10) + ny * (r - 1) * cell;
      c.save(); c.translate(qx, qy); c.rotate(Math.atan2(dy, dx)); c.fillRect(0, -cell / 2, cell, cell); c.restore();
    }
  };
  const sn = { x: -Math.sin(def.startAngle), y: Math.cos(def.startAngle) }; const sh = def.half[0];
  checker([def.start.x - sn.x * sh, def.start.y - sn.y * sh], [def.start.x + sn.x * sh, def.start.y + sn.y * sh], '#2a7d3a');
  checker([def.finish[0].x, def.finish[0].y], [def.finish[1].x, def.finish[1].y], '#222');

  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.needsUpdate = true;
  return t;
}

export function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16); let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.min(255, r); g = Math.min(255, g); b = Math.min(255, b);
  return `rgb(${r},${g},${b})`;
}
