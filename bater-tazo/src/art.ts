// MOTOR DE ARTE DOS TAZOS — todo tazo é desenhado em canvas na hora (vetorial
// procedural): nítido em qualquer tamanho, coleção inteira em poucos KB.
// Estilo: papelão com borda gasta, anel colorido, fundo chapado com raios pop,
// bicho cartoon com contorno grosso e nome em arco. Verso com pontos (1-4).

export const TAZO_PX = 512;                 // resolução da textura de cada face

// curva SUAVE por pontos (Catmull-Rom → bezier)
function smooth(c: CanvasRenderingContext2D, pts: number[][], close = true): void {
  const n = pts.length;
  const get = (i: number) => pts[close ? ((i % n) + n) % n : Math.max(0, Math.min(n - 1, i))];
  c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
  const last = close ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    c.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (close) c.closePath();
}
const INK = '#2a1a0a';
type Ctx = CanvasRenderingContext2D;
function fillO(c: Ctx, fill: string | null, lw = 10): void { if (fill) { c.fillStyle = fill; c.fill(); } if (lw) { c.lineWidth = lw; c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.stroke(); } }
function blob(c: Ctx, pts: number[][], fill: string | null, lw = 10): void { smooth(c, pts, true); fillO(c, fill, lw); }
function stroke(c: Ctx, pts: number[][], lw: number, col: string): void { smooth(c, pts, false); c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = col; c.stroke(); }
function ell(c: Ctx, x: number, y: number, rx: number, ry: number, rot: number, fill: string | null, lw = 10): void { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, 7); fillO(c, fill, lw); }
function shade(c: Ctx, pts: number[][], col = 'rgba(40,20,60,0.18)'): void { smooth(c, pts, true); c.fillStyle = col; c.fill(); }
function eye(c: Ctx, x: number, y: number, r: number, lookx = 0.3, looky = 0.12): void {
  ell(c, x, y, r, r * 1.12, 0, '#fff', Math.max(5, r * 0.38));
  c.beginPath(); c.arc(x + r * lookx, y + r * looky, r * 0.55, 0, 7); c.fillStyle = INK; c.fill();
  c.beginPath(); c.arc(x + r * lookx + r * 0.18, y + r * looky - r * 0.22, r * 0.2, 0, 7); c.fillStyle = '#fff'; c.fill();
}
function brow(c: Ctx, x: number, y: number, w: number, ang = -0.25, lw = 8): void { c.save(); c.translate(x, y); c.rotate(ang); c.lineWidth = lw; c.lineCap = 'round'; c.strokeStyle = INK; c.beginPath(); c.moveTo(-w / 2, 0); c.quadraticCurveTo(0, -w * 0.22, w / 2, w * 0.10); c.stroke(); c.restore(); }

// hash determinístico (borda gasta igual sempre pro mesmo tazo)
function rngOf(seed: number) { let s = seed | 0; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export interface TazoSpec {
  id: string; name: string; col: number;      // col = índice na coleção
  bg: string; ring: string; nameCol?: string;
  pontos: 1 | 2 | 3 | 4;                       // valor no verso (raridade)
  peso: number; borda: number; pop: number;    // stats de jogo (0.8..1.25)
  draw: (c: Ctx) => void;
}

// desenha a FRENTE do tazo num canvas (coords centradas, raio R=322 → 700px base escalado p/ TAZO_PX)
export function drawTazoFront(spec: TazoSpec, size = TAZO_PX): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = cv.height = size;
  const c = cv.getContext('2d')!;
  const k = size / 700; c.scale(k, k); c.translate(350, 350);
  const R = 322, rng = rngOf(spec.id.length * 977 + spec.col * 131);
  c.beginPath(); c.arc(0, 0, R, 0, 7); c.fillStyle = '#e8ddc8'; c.fill();
  for (let i = 0; i < 30; i++) { const a = rng() * 6.283; c.beginPath(); c.arc(Math.cos(a) * (R - 2), Math.sin(a) * (R - 2), 3 + rng() * 4, 0, 7); c.fillStyle = 'rgba(210,196,166,0.9)'; c.fill(); }
  c.beginPath(); c.arc(0, 0, R - 11, 0, 7); c.fillStyle = spec.ring; c.fill();
  c.beginPath(); c.arc(0, 0, R - 30, 0, 7); c.fillStyle = spec.bg; c.fill();
  // raios pop + brilho
  c.save(); c.beginPath(); c.arc(0, 0, R - 30, 0, 7); c.clip();
  c.globalAlpha = 0.09; c.fillStyle = '#fff';
  for (let i = 0; i < 12; i++) { c.rotate(0.5236); c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, -0.12, 0.12); c.fill(); }
  c.globalAlpha = 1;
  const gl = c.createRadialGradient(-R * 0.4, -R * 0.5, 10, 0, 0, R * 1.1);
  gl.addColorStop(0, 'rgba(255,255,255,0.22)'); gl.addColorStop(0.45, 'rgba(255,255,255,0)');
  c.fillStyle = gl; c.fillRect(-R, -R, 2 * R, 2 * R);
  // estrelinhas
  for (const [sx, sy, sr] of [[-R * 0.62, -R * 0.28, 12], [R * 0.6, -R * 0.4, 9], [R * 0.5, R * 0.34, 8]]) {
    c.save(); c.translate(sx, sy); c.fillStyle = 'rgba(255,255,255,0.75)';
    c.beginPath(); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; const rr = i % 2 ? sr : sr * 0.34; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.closePath(); c.fill(); c.restore();
  }
  c.restore();

  c.save(); spec.draw(c); c.restore();

  // aerógrafo (luz topo, sombra base)
  c.save(); c.beginPath(); c.arc(0, 0, R - 30, 0, 7); c.clip();
  const air = c.createLinearGradient(0, -R, 0, R);
  air.addColorStop(0, 'rgba(255,255,255,0.10)'); air.addColorStop(0.55, 'rgba(0,0,0,0)'); air.addColorStop(1, 'rgba(30,10,40,0.16)');
  c.fillStyle = air; c.fillRect(-R, -R, R * 2, R * 2);
  c.restore();

  // nome em arco embaixo
  const name = spec.name.toUpperCase();
  const fs = name.length > 14 ? 40 : 46;
  c.font = `900 ${fs}px Verdana, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  const rr = R - 56, arcW = name.length * (fs * 0.00245);
  for (let i = 0; i < name.length; i++) {
    const t = name.length === 1 ? 0.5 : i / (name.length - 1);
    const a = Math.PI / 2 + arcW / 2 - t * arcW;
    c.save(); c.translate(Math.cos(a) * rr, Math.sin(a) * rr); c.rotate(a - Math.PI / 2);
    c.lineWidth = 11; c.lineJoin = 'round'; c.strokeStyle = 'rgba(25,15,8,0.9)'; c.strokeText(name[i], 0, 0);
    c.fillStyle = spec.nameCol || '#fff'; c.fillText(name[i], 0, 0);
    c.restore();
  }
  // número da coleção no topo
  c.font = '900 34px Verdana, sans-serif';
  c.lineWidth = 9; c.strokeStyle = 'rgba(25,15,8,0.9)'; c.strokeText(`#${String(spec.col).padStart(2, '0')}`, 0, -R + 62);
  c.fillStyle = '#fff'; c.fillText(`#${String(spec.col).padStart(2, '0')}`, 0, -R + 62);
  return cv;
}

// VERSO do tazo: logo da coleção + pontos (padrão espiral 90s)
export function drawTazoBack(spec: TazoSpec, size = TAZO_PX): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = cv.height = size;
  const c = cv.getContext('2d')!;
  const k = size / 700; c.scale(k, k); c.translate(350, 350);
  const R = 322;
  const cols: Record<number, [string, string]> = { 1: ['#3fae6a', '#2e8a50'], 2: ['#3b82f6', '#2a62c8'], 3: ['#f2b100', '#e08a00'], 4: ['#e5484d', '#c02830'] };
  const [c1, c2] = cols[spec.pontos];
  c.beginPath(); c.arc(0, 0, R, 0, 7); c.fillStyle = '#e8ddc8'; c.fill();
  c.beginPath(); c.arc(0, 0, R - 11, 0, 7); c.fillStyle = c2; c.fill();
  // espiral hipnótica
  c.save(); c.beginPath(); c.arc(0, 0, R - 11, 0, 7); c.clip();
  c.fillStyle = c1;
  for (let arm = 0; arm < 6; arm++) {
    c.beginPath(); c.moveTo(0, 0);
    for (let t = 0; t <= 1.01; t += 0.05) { const a = arm * 1.047 + t * 2.4; const rr = t * R; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    for (let t = 1.0; t >= -0.01; t -= 0.05) { const a = arm * 1.047 + 0.52 + t * 2.4; const rr = t * R; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    c.closePath(); c.fill();
  }
  c.restore();
  // medalhão central
  c.beginPath(); c.arc(0, 0, 168, 0, 7); c.fillStyle = '#fdf6e4'; c.fill();
  c.lineWidth = 10; c.strokeStyle = INK; c.stroke();
  c.beginPath(); c.arc(0, 0, 148, 0, 7); c.lineWidth = 5; c.strokeStyle = c2; c.stroke();
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = '900 76px Verdana, sans-serif';
  c.save(); c.rotate(-0.08);
  c.lineWidth = 14; c.strokeStyle = INK; c.strokeText('TAZO', 0, -46);
  c.fillStyle = c2; c.fillText('TAZO', 0, -46);
  c.restore();
  c.font = '800 26px Verdana, sans-serif'; c.fillStyle = '#5a4a30';
  c.fillText('ANIMAIS EM', 0, 8); c.fillText('EXTINÇÃO', 0, 38);
  // pontos
  c.font = `900 58px Verdana, sans-serif`;
  c.lineWidth = 11; c.strokeStyle = INK; c.strokeText(`${spec.pontos}`, 0, 96);
  c.fillStyle = c2; c.fillText(`${spec.pontos}`, 0, 96);
  c.font = '800 22px Verdana, sans-serif'; c.fillStyle = '#5a4a30';
  c.fillText(spec.pontos === 1 ? 'PONTO' : 'PONTOS', 0, 132);
  return cv;
}

// =============================== BICHOS ===============================
function tartaruga(c: Ctx): void {
  c.rotate(-0.22); c.translate(0, 8);
  blob(c, [[-80, 55], [-150, 45], [-190, 100], [-140, 125], [-90, 108]], '#6fae5c', 9);
  blob(c, [[60, 110], [95, 165], [40, 192], [15, 145], [30, 118]], '#6fae5c', 9);
  blob(c, [[-150, 35], [-120, -55], [-20, -92], [80, -70], [135, 5], [110, 70], [0, 95], [-100, 80]], '#3f7a44', 12);
  blob(c, [[-125, 32], [-98, -40], [-15, -72], [70, -52], [110, 8], [88, 58], [0, 76], [-85, 64]], '#5c9a52', 8);
  c.lineWidth = 6.5; c.strokeStyle = '#2e5c33';
  for (const [x, y, rx, ry, ro] of [[-8, 0, 46, 38, 0.1], [-80, 12, 28, 24, 0.2], [66, -6, 26, 24, 0], [-42, -46, 27, 18, 0.15], [32, -44, 25, 17, -0.05], [-45, 52, 26, 16, 0.1], [35, 44, 24, 15, 0]]) {
    c.beginPath(); c.ellipse(x, y, rx, ry, ro, 0, 7); c.stroke();
  }
  shade(c, [[-150, 35], [-100, 80], [0, 95], [110, 70], [80, 78], [-20, 100], [-120, 70]], 'rgba(20,40,20,0.22)');
  blob(c, [[-105, -35], [-185, -80], [-245, -50], [-215, 5], [-150, 25], [-112, 2]], '#7fbf68', 10);
  stroke(c, [[-160, -45], [-200, -30]], 5, '#4a7a3c'); stroke(c, [[-150, -22], [-195, -2]], 5, '#4a7a3c');
  blob(c, [[85, 42], [155, 62], [195, 118], [140, 140], [90, 112], [75, 70]], '#7fbf68', 10);
  blob(c, [[70, -55], [105, -95], [160, -108], [196, -84], [198, -50], [168, -28], [118, -28], [82, -38]], '#7fbf68', 10);
  shade(c, [[82, -38], [118, -28], [168, -28], [150, -16], [95, -22]], 'rgba(20,50,20,0.18)');
  eye(c, 142, -84, 19, 0.35, 0.05);
  brow(c, 140, -112, 34, -0.15, 9);
  c.beginPath(); c.arc(168, -52, 22, 0.35, 1.75); c.lineWidth = 7; c.strokeStyle = INK; c.stroke();
  c.beginPath(); c.arc(196, -66, 3.6, 0, 7); c.fillStyle = INK; c.fill();
  for (const [x, y, r] of [[232, -132, 11], [252, -166, 7.5], [224, -190, 5]]) { c.beginPath(); c.arc(x, y, r, 0, 7); c.lineWidth = 5; c.strokeStyle = 'rgba(255,255,255,0.9)'; c.stroke(); }
}

function arara(c: Ctx): void {
  c.translate(-6, 0);
  stroke(c, [[-215, 152], [-40, 128], [130, 142], [225, 132]], 26, '#7a4a26');
  stroke(c, [[-215, 152], [-40, 128], [130, 142], [225, 132]], 8, INK);
  blob(c, [[8, 40], [58, 120], [92, 222], [58, 238], [28, 232], [-4, 130], [-18, 60]], '#2a5cb8', 10);
  stroke(c, [[22, 90], [52, 190]], 6, '#1e4490');
  blob(c, [[-38, -88], [-92, -40], [-92, 45], [-42, 105], [22, 118], [58, 45], [38, -55]], '#f2c21e', 10);
  shade(c, [[-42, 105], [22, 118], [58, 45], [40, 85], [-8, 108]], 'rgba(150,90,0,0.20)');
  blob(c, [[-42, -85], [-105, -30], [-88, 70], [-30, 108], [2, 95], [12, 20], [-8, -55]], '#3b78e0', 10);
  c.lineWidth = 6; c.strokeStyle = '#2a55a8';
  for (const [x1, y1, x2, y2] of [[-68, 8, -38, 88], [-45, -10, -8, 78], [-22, -30, 8, 60]]) { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2 + 12, (y1 + y2) / 2, x2, y2); c.stroke(); }
  ell(c, 14, -128, 66, 58, -0.05, '#3b78e0', 10);
  blob(c, [[24, -158], [66, -152], [76, -112], [48, -92], [20, -98], [12, -132]], '#f2ead8', 7);
  c.lineWidth = 4; c.strokeStyle = INK;
  for (const dy of [-140, -126, -112]) { c.beginPath(); c.moveTo(28, dy); c.quadraticCurveTo(48, dy + 3, 62, dy + 1); c.stroke(); }
  eye(c, 40, -126, 15, 0.3, 0.05);
  brow(c, 40, -148, 30, -0.2, 8);
  blob(c, [[64, -148], [112, -138], [128, -100], [112, -58], [88, -50], [92, -80], [72, -95], [62, -120]], '#2e2e36', 9);
  blob(c, [[62, -70], [92, -62], [86, -42], [58, -50]], '#1c1c24', 7);
  c.beginPath(); c.arc(102, -128, 4, 0, 7); c.fillStyle = '#606068'; c.fill();
  blob(c, [[8, -92], [42, -86], [50, -68], [22, -60], [0, -70]], '#2e2e36', 0);
  for (const dx of [-20, 22]) blob(c, [[dx - 8, 108], [dx - 18, 128], [dx - 8, 140], [dx + 10, 136], [dx + 14, 118]], '#8a8a96', 6);
}

function hipo(c: Ctx): void {
  c.translate(0, 16); c.scale(1.02, 1.02);
  blob(c, [[-148, -30], [-160, 90], [-95, 148], [0, 158], [95, 148], [160, 90], [148, -30], [95, -95], [0, -108], [-95, -95]], '#8a68b8', 12);
  for (const dx of [-98, -36, 36, 98]) {
    blob(c, [[dx - 26, 120], [dx - 28, 178], [dx, 186], [dx + 28, 178], [dx + 26, 120]], '#7a58a8', 9);
    ell(c, dx, 180, 25, 9, 0, '#cdb4e4', 6);
  }
  shade(c, [[-148, -30], [-160, 90], [-95, 148], [-60, 130], [-120, 60], [-118, -20]], 'rgba(40,15,70,0.20)');
  for (const s of [-1, 1]) { ell(c, s * 108, -102, 19, 24, s * 0.45, '#8a68b8', 9); ell(c, s * 106, -99, 9, 12, s * 0.45, '#cdb4e4', 5); }
  for (const s of [-1, 1]) {
    ell(c, s * 60, -84, 31, 28, 0, '#9a7ac8', 9);
    ell(c, s * 60, -88, 17, 15, 0, '#f2d54a', 6);
    c.beginPath(); c.arc(s * 60 + 5, -86, 7, 0, 7); c.fillStyle = INK; c.fill();
    c.beginPath(); c.arc(s * 60 + 8, -90, 2.6, 0, 7); c.fillStyle = '#fff'; c.fill();
  }
  brow(c, -60, -116, 34, 0.18, 9); brow(c, 60, -116, 34, -0.18, 9);
  blob(c, [[-120, -12], [-136, 70], [-70, 112], [0, 120], [70, 112], [136, 70], [120, -12], [70, -58], [0, -66], [-70, -58]], '#9c7cca', 11);
  shade(c, [[-120, -12], [-136, 70], [-70, 112], [-40, 96], [-100, 50], [-96, -8]], 'rgba(40,15,70,0.16)');
  ell(c, -52, 12, 15, 21, 0.25, '#4f3480', 7); ell(c, 52, 12, 15, 21, -0.25, '#4f3480', 7);
  c.beginPath(); c.arc(0, 30, 84, 0.4, 2.74); c.lineWidth = 9; c.strokeStyle = INK; c.stroke();
  for (const s of [-1, 1]) blob(c, [[s * 52 - 12, 96], [s * 52 - 12, 124], [s * 52, 130], [s * 52 + 12, 124], [s * 52 + 12, 96]], '#fff', 6);
  for (const s of [-1, 1]) { c.beginPath(); c.arc(s * 100, 40, 14, 0, 7); c.fillStyle = 'rgba(230,120,160,0.35)'; c.fill(); }
  stroke(c, [[152, 60], [186, 78], [178, 102]], 12, '#8a68b8'); stroke(c, [[152, 60], [186, 78], [178, 102]], 5, INK);
}

function leao(c: Ctx): void {
  c.translate(4, 26);
  blob(c, [[-60, -30], [-95, 60], [-85, 125], [0, 142], [85, 125], [98, 55], [60, -30]], '#e0b060', 11);
  ell(c, 78, 105, 42, 30, -0.2, '#e8bc70', 9);
  stroke(c, [[90, 118], [165, 128], [205, 92]], 15, '#e0b060'); stroke(c, [[90, 118], [165, 128], [205, 92]], 6, INK);
  blob(c, [[196, 98], [222, 74], [232, 100], [212, 114]], '#9a6a2e', 7);
  for (const dx of [-42, 16]) {
    blob(c, [[dx - 18, 30], [dx - 22, 120], [dx - 18, 138], [dx + 4, 140], [dx + 22, 136], [dx + 20, 116], [dx + 16, 30]], '#e8bc70', 9);
    c.lineWidth = 5; c.strokeStyle = INK;
    for (const fx of [dx - 8, dx + 6]) { c.beginPath(); c.moveTo(fx, 140); c.lineTo(fx, 126); c.stroke(); }
  }
  shade(c, [[-85, 125], [0, 142], [85, 125], [60, 134], [-40, 140]], 'rgba(90,50,0,0.18)');
  c.save(); c.translate(-8, -105);
  const juba: number[][] = [];
  for (let i = 0; i < 22; i++) { const a = i / 22 * 6.283; const rr = 118 + (i % 2 ? 16 : -8); juba.push([Math.cos(a) * rr, Math.sin(a) * rr * 0.96]); }
  blob(c, juba, '#a86a28', 11);
  shade(c, juba.slice(6, 17).concat([[0, 40]]), 'rgba(60,30,0,0.22)');
  ell(c, 0, 0, 80, 76, 0, '#e8bc70', 10);
  for (const s of [-1, 1]) { ell(c, s * 62, -58, 21, 21, 0, '#e8bc70', 9); ell(c, s * 60, -56, 10.5, 10.5, 0, '#c89040', 5); }
  blob(c, [[-28, -78], [-6, -96], [18, -80], [4, -68], [-12, -66]], '#a86a28', 8);
  eye(c, -28, -14, 16, 0.25, 0.1); eye(c, 28, -14, 16, 0.25, 0.1);
  c.lineWidth = 7; c.strokeStyle = INK;
  c.beginPath(); c.moveTo(-45, -38); c.quadraticCurveTo(-28, -46, -10, -40); c.stroke();
  c.beginPath(); c.moveTo(45, -38); c.quadraticCurveTo(28, -46, 10, -40); c.stroke();
  ell(c, 0, 30, 36, 26, 0, '#f2d8a8', 8);
  blob(c, [[-14, 18], [0, 10], [14, 18], [9, 32], [-9, 32]], '#5a3418', 6);
  c.lineWidth = 6; c.strokeStyle = INK;
  c.beginPath(); c.moveTo(0, 34); c.lineTo(0, 42); c.stroke();
  c.beginPath(); c.arc(-13, 42, 13, 0.25, 2.6); c.stroke();
  c.beginPath(); c.arc(13, 42, 13, 0.55, 2.9); c.stroke();
  c.lineWidth = 3.4;
  for (const s of [-1, 1]) for (const dy of [-2, 6, 14]) { c.beginPath(); c.moveTo(s * 32, 28 + dy * 0.5); c.quadraticCurveTo(s * 66, 22 + dy, s * 88, 26 + dy * 1.6); c.stroke(); }
  c.restore();
}

function jagua(c: Ctx): void {
  c.translate(0, 10);
  stroke(c, [[-245, 128], [-60, 105], [120, 122], [245, 108]], 36, '#6b4222');
  stroke(c, [[-245, 128], [-60, 105], [120, 122], [245, 108]], 9, INK);
  c.lineWidth = 5; c.strokeStyle = '#4f2f16';
  c.beginPath(); c.moveTo(-160, 118); c.quadraticCurveTo(-80, 106, 20, 112); c.stroke();
  stroke(c, [[-118, 35], [-185, 5], [-198, -70], [-158, -105]], 22, '#e8ae52');
  stroke(c, [[-118, 35], [-185, 5], [-198, -70], [-158, -105]], 8, INK);
  c.lineWidth = 9; c.strokeStyle = '#3a2812';
  for (const [x, y, ro] of [[-190, -30, 0.2], [-192, -58, 0.1]]) { c.beginPath(); c.ellipse(x, y, 12, 5, ro, 0, 7); c.stroke(); }
  ell(c, -160, -104, 14, 12, 0.4, '#3a2812', 7);
  blob(c, [[-128, 40], [-95, -18], [-20, -42], [65, -35], [125, -18], [138, 35], [95, 62], [0, 72], [-90, 68]], '#e8ae52', 11);
  blob(c, [[-108, 45], [-122, 100], [-118, 112], [-95, 112], [-85, 96], [-88, 48]], '#e8ae52', 9);
  blob(c, [[-52, 55], [-58, 102], [-52, 112], [-30, 112], [-22, 98], [-28, 58]], '#e8ae52', 9);
  blob(c, [[52, 50], [40, 100], [46, 112], [70, 112], [80, 96], [74, 50]], '#e8ae52', 9);
  blob(c, [[105, 40], [108, 96], [116, 108], [138, 106], [142, 90], [128, 38]], '#e8ae52', 9);
  blob(c, [[60, -30], [95, -5], [100, 35], [70, 50], [50, 20], [48, -12]], '#f6dfae', 0);
  shade(c, [[-128, 40], [-90, 68], [0, 72], [-10, 58], [-95, 50]], 'rgba(90,50,0,0.16)');
  ell(c, 142, -62, 62, 56, 0.05, '#e8ae52', 10);
  for (const dx of [108, 178]) {
    blob(c, [[dx - 17, -100], [dx - 8, -138], [dx + 12, -128], [dx + 17, -96]], '#e8ae52', 9);
    blob(c, [[dx - 8, -108], [dx - 3, -126], [dx + 8, -118], [dx + 9, -104]], '#3a2812', 0);
  }
  eye(c, 122, -76, 16, 0.4, 0.05); eye(c, 166, -72, 14.5, 0.35, 0.05);
  brow(c, 120, -98, 28, 0.3, 7); brow(c, 168, -94, 26, -0.3, 7);
  c.lineWidth = 5; c.strokeStyle = '#3a2812';
  c.beginPath(); c.moveTo(130, -104); c.lineTo(142, -100); c.stroke();
  c.beginPath(); c.moveTo(148, -108); c.lineTo(158, -102); c.stroke();
  blob(c, [[118, -44], [148, -38], [178, -44], [186, -22], [166, -6], [136, -6], [116, -22]], '#f6dfae', 7);
  blob(c, [[142, -42], [158, -42], [154, -30], [146, -30]], '#c86a6a', 5);
  c.lineWidth = 5; c.strokeStyle = INK;
  c.beginPath(); c.moveTo(150, -30); c.lineTo(150, -22); c.stroke();
  c.beginPath(); c.arc(140, -20, 10, 0.1, 2.4); c.stroke();
  c.beginPath(); c.arc(160, -20, 10, 0.7, 3.0); c.stroke();
  c.lineWidth = 3.2;
  for (const dy of [-4, 4]) { c.beginPath(); c.moveTo(178, -30 + dy); c.quadraticCurveTo(206, -34 + dy * 1.4, 222, -28 + dy * 2); c.stroke(); }
  for (const dy of [-4, 4]) { c.beginPath(); c.moveTo(120, -32 + dy); c.quadraticCurveTo(100, -36 + dy * 1.4, 86, -30 + dy * 2); c.stroke(); }
  for (const [x, y, r, ro] of [[-88, 12, 13, 0.3], [-48, 40, 11, 0.1], [-32, -12, 12, 0.4], [16, 20, 12, 0.2], [8, -25, 10, 0], [58, 28, 9, 0.3], [-95, 52, 8, 0.2], [40, -18, 8, 0.1]]) {
    c.beginPath(); c.ellipse(x, y, r, r * 0.72, ro, 0, 7); c.fillStyle = '#b87828'; c.fill(); c.lineWidth = 5.5; c.strokeStyle = '#3a2812'; c.stroke();
    c.beginPath(); c.arc(x + 1, y, r * 0.34, 0, 7); c.fillStyle = '#e8ae52'; c.fill();
  }
  c.fillStyle = '#3a2812';
  for (const [x, y] of [[100, -40], [92, -22], [-110, 80], [-40, 90], [60, 88], [128, 74], [88, -8]]) { c.beginPath(); c.arc(x, y, 4.2, 0, 7); c.fill(); }
}

// ------------------------- A COLEÇÃO (v1: 10 tazos) -------------------------
// stats: peso (resiste/vira), borda (agarra o vizinho na pilha), pop (pula alto)
export const COLECAO: TazoSpec[] = [
  { id: 'tartaruga', name: 'Tartaruga-Verde', col: 1, bg: '#a468e0', ring: '#7f42c2', pontos: 2, peso: 1.15, borda: 0.9, pop: 0.9, draw: tartaruga },
  { id: 'arara', name: 'Araraúna', col: 2, bg: '#ffb81e', ring: '#f28a00', pontos: 3, peso: 0.85, borda: 1.0, pop: 1.2, draw: arara },
  { id: 'hipo', name: 'Hipopótamo-Anão', col: 3, bg: '#3fc258', ring: '#1f9a38', pontos: 1, peso: 1.25, borda: 0.85, pop: 0.8, draw: hipo },
  { id: 'leao', name: 'Leão-Persa', col: 4, bg: '#2277e8', ring: '#0f56bc', nameCol: '#ffe38f', pontos: 4, peso: 1.1, borda: 1.1, pop: 1.0, draw: leao },
  { id: 'jagua', name: 'Jaguatirica', col: 5, bg: '#b2e822', ring: '#84ba08', pontos: 2, peso: 0.95, borda: 1.2, pop: 1.05, draw: jagua },
  // variações de cor enquanto a coleção completa não chega (bichos 6-10)
  { id: 'tartaruga2', name: 'Tartaruga-de-Pente', col: 6, bg: '#2ec2b0', ring: '#189685', pontos: 1, peso: 1.1, borda: 0.9, pop: 0.95, draw: tartaruga },
  { id: 'arara2', name: 'Ararajuba', col: 7, bg: '#e5484d', ring: '#bc2830', pontos: 2, peso: 0.85, borda: 1.0, pop: 1.15, draw: arara },
  { id: 'hipo2', name: 'Hipopótamo-Comum', col: 8, bg: '#f2b100', ring: '#d08e00', pontos: 1, peso: 1.2, borda: 0.85, pop: 0.85, draw: hipo },
  { id: 'leao2', name: 'Leão-Africano', col: 9, bg: '#ff7ea8', ring: '#e05585', pontos: 3, peso: 1.1, borda: 1.05, pop: 1.0, draw: leao },
  { id: 'jagua2', name: 'Gato-Maracajá', col: 10, bg: '#8fd0ff', ring: '#5aa8e0', pontos: 2, peso: 0.9, borda: 1.15, pop: 1.1, draw: jagua },
];
export const byId = (id: string): TazoSpec => COLECAO.find(t => t.id === id) || COLECAO[0];
