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
  dirt(c, w, h) { c.fillStyle = '#8a6a44'; c.fillRect(0, 0, w, h); noise(c, w, h, 2600, '#6f5334', 0.5, 2.2); noise(c, w, h, 1200, '#a07f52', 0.4, 2.4); },
  sand(c, w, h) { c.fillStyle = '#e6c98a'; c.fillRect(0, 0, w, h); noise(c, w, h, 3200, '#d3b273', 0.4, 1.7); noise(c, w, h, 900, '#f3ddab', 0.5, 2.0); },
  sidewalk(c, w, h) { c.fillStyle = '#b9b3a6'; c.fillRect(0, 0, w, h); noise(c, w, h, 1500, '#a49e90', 0.35, 2.4); c.strokeStyle = 'rgba(120,114,100,0.5)'; c.lineWidth = 3; for (let y = 0; y < h; y += PX * 6) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y + (Math.random() - 0.5) * 10); c.stroke(); } },
  cardboard(c, w, h) { c.fillStyle = '#cba875'; c.fillRect(0, 0, w, h); noise(c, w, h, 1200, '#b9915f', 0.4, 2.2); c.strokeStyle = 'rgba(150,110,70,0.28)'; c.lineWidth = 2; for (let x = 0; x < w; x += 10) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); } },
  grass(c, w, h) { c.fillStyle = '#5f8a3a'; c.fillRect(0, 0, w, h); noise(c, w, h, 2600, '#4d7530', 0.5, 2.4); noise(c, w, h, 1200, '#7aa54a', 0.5, 2.2); },
  mud: () => {}, water: () => {}, ramp: () => {}, chalk: () => {}, out: () => {},
};

function drawPatch(c: CanvasRenderingContext2D, p: Patch, map: (x: number, y: number) => [number, number], px: number) {
  const [cx, cy] = map(p.x, p.y); const r = (p.r ?? Math.max(p.hw!, p.hh!)) * px;
  c.save();
  c.beginPath();
  if (p.r != null) c.arc(cx, cy, r, 0, 7);
  else { const hw = p.hw! * px, hh = p.hh! * px; c.rect(cx - hw, cy - hh, hw * 2, hh * 2); }
  c.clip();
  const s = p.surface;
  if (s === 'sand') { c.fillStyle = '#ecd192'; c.fillRect(cx - r, cy - r, r * 2, r * 2); noise(c, 0, 0, 0, '', 0, 0); c.globalAlpha = 1; for (let i = 0; i < 400; i++) { c.globalAlpha = 0.3; c.fillStyle = '#d8b96f'; c.beginPath(); c.arc(cx + (Math.random() - 0.5) * r * 2, cy + (Math.random() - 0.5) * r * 2, 1.6, 0, 7); c.fill(); } c.globalAlpha = 1; }
  else if (s === 'mud') { const g = c.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, '#4a3620'); g.addColorStop(1, '#5c452a'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2); for (let i = 0; i < 30; i++) { c.globalAlpha = 0.3; c.fillStyle = '#6b5335'; c.beginPath(); c.arc(cx + (Math.random() - 0.5) * r * 1.6, cy + (Math.random() - 0.5) * r * 1.6, 3 + Math.random() * 4, 0, 7); c.fill(); } c.globalAlpha = 1; }
  else if (s === 'water') { const g = c.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, 'rgba(90,170,205,0.85)'); g.addColorStop(1, 'rgba(70,150,190,0.7)'); c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2); c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 2; for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(cx, cy, r * (0.3 + i * 0.15), 0.4, 2.2); c.stroke(); } }
  else if (s === 'ramp') {   // TIRA DE ACELERAÇÃO: setas sempre no sentido da pista (corrige o espelho Y)
    c.save(); c.translate(cx, cy); c.rotate(1.57 - (p.dir ?? -1.57));
    const g = c.createLinearGradient(0, r, 0, -r); g.addColorStop(0, '#1f7a3a'); g.addColorStop(1, '#43c463'); c.fillStyle = g; c.fillRect(-r, -r, r * 2, r * 2);
    c.strokeStyle = 'rgba(255,255,255,0.92)'; c.lineWidth = r * 0.16; c.lineCap = 'round'; c.lineJoin = 'round';
    for (let i = -1; i <= 1; i++) { const y = i * r * 0.52; c.beginPath(); c.moveTo(-r * 0.5, y + r * 0.24); c.lineTo(0, y - r * 0.24); c.lineTo(r * 0.5, y + r * 0.24); c.stroke(); }
    c.restore();
  }
  else if (s === 'push') {   // SETA VERMELHA: empurrão — as pontas mostram pra onde te joga (trás/lado)
    c.save(); c.translate(cx, cy); c.rotate(1.57 - (p.dir ?? 1.57));
    const g = c.createLinearGradient(0, r, 0, -r); g.addColorStop(0, '#8a1810'); g.addColorStop(1, '#ef5a5f'); c.fillStyle = g; c.fillRect(-r, -r, r * 2, r * 2);
    c.strokeStyle = 'rgba(255,255,255,0.95)'; c.lineWidth = r * 0.16; c.lineCap = 'round'; c.lineJoin = 'round';
    for (let i = -1; i <= 1; i++) { const y = i * r * 0.52; c.beginPath(); c.moveTo(-r * 0.5, y + r * 0.24); c.lineTo(0, y - r * 0.24); c.lineTo(r * 0.5, y + r * 0.24); c.stroke(); }
    c.restore();
  }
  else if (s === 'chalk') { c.fillStyle = 'rgba(255,255,255,0.15)'; c.fillRect(cx - r, cy - r, r * 2, r * 2); }
  else if (s === 'grass') { c.fillStyle = '#5a8636'; c.fillRect(cx - r, cy - r, r * 2, r * 2); for (let i = 0; i < 60; i++) { c.strokeStyle = '#6f9c40'; c.lineWidth = 2; const gx = cx + (Math.random() - 0.5) * r * 2, gy = cy + (Math.random() - 0.5) * r * 2; c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + (Math.random() - 0.5) * 6, gy - 6 - Math.random() * 6); c.stroke(); } }
  else if (s === 'sidewalk') { c.fillStyle = '#c6c0b2'; c.fillRect(cx - r, cy - r, r * 2, r * 2); }
  else if (s === 'cardboard') { c.fillStyle = '#d3b17e'; c.fillRect(cx - r, cy - r, r * 2, r * 2); }
  c.restore();
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
