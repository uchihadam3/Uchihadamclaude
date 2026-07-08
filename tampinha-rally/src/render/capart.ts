// MOTOR DE ARTE DAS TAMPINHAS — desenha cada tampinha "à mão" no canvas: a borda
// crimpada de coroa (21 dentes metálicos), o rótulo com sombreado, texto em arco,
// faixas, emblemas (frutas, bichos, estrelas, raios...), envelhecimento vintage e
// o brilho do metal. Fiel às tampinhas de refrigerante/cerveja antigas.
import * as THREE from 'three';

export type Rarity = 'comum' | 'rara' | 'epica' | 'lendaria' | 'mitica';
export const RARITY_COLOR: Record<Rarity, string> = { comum: '#9aa2ac', rara: '#3b82f6', epica: '#a855f7', lendaria: '#f5b400', mitica: '#ff4fa3' };
export const RARITY_LABEL: Record<Rarity, string> = { comum: 'Comum', rara: 'Rara', epica: 'Épica', lendaria: 'Lendária', mitica: 'Mítica' };
export const RARITY_ORDER: Rarity[] = ['comum', 'rara', 'epica', 'lendaria', 'mitica'];

// Especificação de arte de uma tampinha (bem enxuta; o motor faz o resto bonito).
export interface CapArt {
  bg: string | [string, string];      // rótulo: cor sólida ou gradiente radial [centro, borda]
  metal?: 'steel' | 'gold' | 'copper' | 'dark' | 'silver';
  fringe?: string;                     // anel de cor impresso junto aos dentes
  rings?: string;                      // finas linhas concêntricas
  arcTop?: [string, string];           // [texto, cor] curvado no topo
  arcBot?: [string, string];           // [texto, cor] curvado embaixo
  band?: [string, string, string];     // faixa horizontal [cor, texto, corTexto]
  center?: string; centerColor?: string; centerFont?: 'script' | 'block' | 'serif' | 'slab'; centerSize?: number;
  sub?: [string, string];              // linha pequena embaixo do centro
  emblem?: string; emblemColor?: string; emblemColor2?: string; emblemY?: number; emblemScale?: number;
  stars?: number; starColor?: string;
  vintage?: number;                    // 0..1 desgaste
}

const TAU = Math.PI * 2;

function setRadial(c: CanvasRenderingContext2D, cx: number, cy: number, r: number, bg: string | [string, string]): string | CanvasGradient {
  if (typeof bg === 'string') return bg;
  const g = c.createRadialGradient(cx - r * 0.18, cy - r * 0.22, r * 0.1, cx, cy, r);
  g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1]); return g;
}

// texto ao longo de um arco (topo: up=true; base: up=false)
function arcText(c: CanvasRenderingContext2D, str: string, cx: number, cy: number, r: number, up: boolean, font: string, col: string): void {
  c.save(); c.fillStyle = col; c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle';
  const chars = [...str];
  let total = 0; const ws = chars.map(ch => { const w = c.measureText(ch).width + r * 0.02; total += w; return w; });
  const arc = total / r;                          // ângulo total
  let a = up ? -Math.PI / 2 - arc / 2 : Math.PI / 2 + arc / 2;
  for (let i = 0; i < chars.length; i++) {
    const step = ws[i] / r; a += (up ? 1 : -1) * step / 2;
    c.save(); c.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    c.rotate(up ? a + Math.PI / 2 : a - Math.PI / 2); c.fillText(chars[i], 0, 0); c.restore();
    a += (up ? 1 : -1) * step / 2;
  }
  c.restore();
}

function fitText(c: CanvasRenderingContext2D, text: string, maxW: number, base: number, weight: string): number {
  let s = base; c.font = `${weight} ${s}px sans-serif`;
  while (c.measureText(text).width > maxW && s > 8) { s -= 2; c.font = `${weight} ${s}px sans-serif`; }
  return s;
}

// ---------------- EMBLEMAS (desenhados no centro, ~raio unit em torno de 0,0) --------------
function poly(c: CanvasRenderingContext2D, pts: number[][], close = true): void { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); if (close) c.closePath(); }
function starShape(c: CanvasRenderingContext2D, x: number, y: number, R: number, r: number, n: number, rot = -Math.PI / 2): void {
  c.beginPath(); for (let i = 0; i < n * 2; i++) { const rad = i % 2 ? r : R; const a = rot + i / (n * 2) * TAU; const px = x + Math.cos(a) * rad, py = y + Math.sin(a) * rad; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath();
}

function drawEmblem(c: CanvasRenderingContext2D, kind: string, x: number, y: number, s: number, col: string, col2: string): void {
  c.save(); c.translate(x, y);
  const fill = (cc: string) => { c.fillStyle = cc; c.fill(); };
  const line = (cc: string, w: number) => { c.strokeStyle = cc; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); };
  switch (kind) {
    case 'star': starShape(c, 0, 0, s, s * 0.42, 5); fill(col); break;
    case 'star6': starShape(c, 0, 0, s, s * 0.5, 6); fill(col); break;
    case 'sunburst': { for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; c.save(); c.rotate(a); c.beginPath(); c.moveTo(s * 0.5, -s * 0.06); c.lineTo(s * 1.05, 0); c.lineTo(s * 0.5, s * 0.06); c.closePath(); fill(col); c.restore(); } c.beginPath(); c.arc(0, 0, s * 0.5, 0, TAU); fill(col2 || col); break; }
    case 'cherry': { c.beginPath(); c.moveTo(-s * 0.1, -s * 0.9); c.bezierCurveTo(s * 0.3, -s * 0.7, -s * 0.4, -s * 0.1, -s * 0.35, s * 0.2); line('#3c6b2e', s * 0.1); c.beginPath(); c.moveTo(-s * 0.1, -s * 0.9); c.bezierCurveTo(s * 0.4, -s * 0.6, s * 0.5, -s * 0.1, s * 0.45, s * 0.2); line('#3c6b2e', s * 0.1); c.beginPath(); c.arc(-s * 0.38, s * 0.5, s * 0.34, 0, TAU); fill(col); c.beginPath(); c.arc(s * 0.42, s * 0.45, s * 0.34, 0, TAU); fill(col); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.arc(-s * 0.48, s * 0.4, s * 0.09, 0, TAU); c.arc(s * 0.32, s * 0.35, s * 0.09, 0, TAU); c.fill(); break; }
    case 'grape': { c.fillStyle = col; const rows = [[-0.5, -0.4, 0.5], [-0.75, -0.25, 0.25, 0.75], [-0.5, 0, 0.5], [-0.25, 0.25], [0]]; rows.forEach((row, ri) => row.forEach(gx => { c.beginPath(); c.arc(gx * s, (-0.55 + ri * 0.34) * s, s * 0.2, 0, TAU); c.fill(); })); c.strokeStyle = '#3c6b2e'; c.lineWidth = s * 0.09; c.beginPath(); c.moveTo(0, -s * 0.75); c.lineTo(s * 0.2, -s * 1.05); c.stroke(); break; }
    case 'orange': { c.beginPath(); c.arc(0, 0, s, 0, TAU); fill(col); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = s * 0.06; for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * s * 0.9, Math.sin(a) * s * 0.9); c.stroke(); } c.beginPath(); c.arc(0, 0, s * 0.16, 0, TAU); c.fillStyle = 'rgba(255,255,255,.4)'; c.fill(); break; }
    case 'lemon': { c.save(); c.rotate(-0.5); c.beginPath(); c.ellipse(0, 0, s, s * 0.62, 0, 0, TAU); fill(col); c.beginPath(); c.moveTo(-s, 0); c.lineTo(-s * 1.18, 0); line(col, s * 0.14); c.beginPath(); c.moveTo(s, 0); c.lineTo(s * 1.18, 0); line(col, s * 0.14); c.restore(); break; }
    case 'apple': { c.beginPath(); c.moveTo(0, -s * 0.5); c.bezierCurveTo(-s * 1.1, -s * 1.1, -s * 1.1, s * 0.5, 0, s); c.bezierCurveTo(s * 1.1, s * 0.5, s * 1.1, -s * 1.1, 0, -s * 0.5); fill(col); c.strokeStyle = '#3c6b2e'; c.lineWidth = s * 0.11; c.beginPath(); c.moveTo(0, -s * 0.5); c.lineTo(s * 0.08, -s * 0.95); c.stroke(); c.fillStyle = '#3c6b2e'; c.beginPath(); c.ellipse(s * 0.35, -s * 0.85, s * 0.28, s * 0.14, -0.6, 0, TAU); c.fill(); break; }
    case 'bottle': { c.fillStyle = col; c.beginPath(); c.moveTo(-s * 0.28, -s); c.lineTo(s * 0.28, -s); c.lineTo(s * 0.28, -s * 0.5); c.bezierCurveTo(s * 0.55, -s * 0.3, s * 0.5, s * 0.9, s * 0.4, s); c.lineTo(-s * 0.4, s); c.bezierCurveTo(-s * 0.5, s * 0.9, -s * 0.55, -s * 0.3, -s * 0.28, -s * 0.5); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-s * 0.2, -s * 0.2, s * 0.14, s * 0.9); break; }
    case 'duck': { c.fillStyle = col; c.beginPath(); c.arc(-s * 0.1, -s * 0.15, s * 0.6, 0, TAU); c.fill(); c.beginPath(); c.arc(s * 0.4, -s * 0.35, s * 0.4, 0, TAU); c.fill(); c.fillStyle = col2 || '#f2a400'; c.beginPath(); c.moveTo(s * 0.7, -s * 0.35); c.quadraticCurveTo(s * 1.25, -s * 0.25, s * 0.75, -s * 0.05); c.closePath(); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(s * 0.5, -s * 0.42, s * 0.07, 0, TAU); c.fill(); break; }
    case 'bear': { c.fillStyle = col; c.beginPath(); c.arc(0, s * 0.2, s * 0.7, 0, TAU); c.fill(); c.beginPath(); c.arc(0, -s * 0.55, s * 0.42, 0, TAU); c.fill(); c.beginPath(); c.arc(-s * 0.32, -s * 0.85, s * 0.16, 0, TAU); c.arc(s * 0.32, -s * 0.85, s * 0.16, 0, TAU); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(-s * 0.14, -s * 0.6, s * 0.06, 0, TAU); c.arc(s * 0.14, -s * 0.6, s * 0.06, 0, TAU); c.arc(0, -s * 0.42, s * 0.08, 0, TAU); c.fill(); break; }
    case 'clown': { c.fillStyle = '#ffe0c4'; c.beginPath(); c.arc(0, s * 0.1, s * 0.62, 0, TAU); c.fill(); c.fillStyle = col; c.beginPath(); c.arc(0, s * 0.35, s * 0.22, 0, TAU); c.fill(); c.beginPath(); c.arc(-s * 0.5, s * 0.05, s * 0.2, 0, TAU); c.arc(s * 0.5, s * 0.05, s * 0.2, 0, TAU); c.fill(); c.fillStyle = col2 || '#c0392b'; c.beginPath(); c.moveTo(-s * 0.55, -s * 0.45); c.lineTo(0, -s); c.lineTo(s * 0.55, -s * 0.45); c.closePath(); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(-s * 0.2, s * 0.02, s * 0.06, 0, TAU); c.arc(s * 0.2, s * 0.02, s * 0.06, 0, TAU); c.fill(); break; }
    case 'goat': { c.fillStyle = col; c.beginPath(); c.moveTo(0, s); c.lineTo(-s * 0.4, s * 0.2); c.lineTo(-s * 0.2, -s * 0.4); c.lineTo(0, -s * 0.2); c.lineTo(s * 0.2, -s * 0.4); c.lineTo(s * 0.4, s * 0.2); c.closePath(); c.fill(); c.strokeStyle = col; c.lineWidth = s * 0.14; c.beginPath(); c.moveTo(-s * 0.2, -s * 0.4); c.quadraticCurveTo(-s * 0.7, -s * 0.7, -s * 0.4, -s * 1.05); c.moveTo(s * 0.2, -s * 0.4); c.quadraticCurveTo(s * 0.7, -s * 0.7, s * 0.4, -s * 1.05); c.stroke(); break; }
    case 'eagle': { c.fillStyle = col; c.beginPath(); c.moveTo(0, -s * 0.2); c.quadraticCurveTo(-s * 1.1, -s * 0.7, -s * 1.2, 0); c.quadraticCurveTo(-s * 0.6, 0, 0, s * 0.4); c.quadraticCurveTo(s * 0.6, 0, s * 1.2, 0); c.quadraticCurveTo(s * 1.1, -s * 0.7, 0, -s * 0.2); c.fill(); c.beginPath(); c.arc(0, -s * 0.45, s * 0.28, 0, TAU); c.fill(); c.fillStyle = col2 || '#f2a400'; c.beginPath(); c.moveTo(0, -s * 0.3); c.lineTo(s * 0.18, -s * 0.1); c.lineTo(-s * 0.18, -s * 0.1); c.closePath(); c.fill(); break; }
    case 'diamond': { c.beginPath(); c.moveTo(0, -s); c.lineTo(s * 0.7, 0); c.lineTo(0, s); c.lineTo(-s * 0.7, 0); c.closePath(); fill(col); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(0, -s); c.lineTo(s * 0.35, -s * 0.5); c.lineTo(0, 0); c.lineTo(-s * 0.35, -s * 0.5); c.closePath(); c.fill(); break; }
    case 'cards': { const card = (dx: number, rot: number) => { c.save(); c.translate(dx, 0); c.rotate(rot); c.fillStyle = '#fff'; c.strokeStyle = '#c0392b'; c.lineWidth = s * 0.04; c.beginPath(); c.rect(-s * 0.32, -s * 0.5, s * 0.64, s); c.fill(); c.stroke(); c.fillStyle = '#c0392b'; starShape(c, 0, -s * 0.22, s * 0.16, s * 0.07, 5); c.fill(); c.restore(); }; card(-s * 0.28, -0.28); card(s * 0.28, 0.28); card(0, 0); break; }
    case 'bolt': { c.fillStyle = col; poly(c, [[-s * 0.1, -s], [s * 0.5, -s * 0.15], [s * 0.1, -s * 0.15], [s * 0.4, s], [-s * 0.5, -s * 0.05], [-s * 0.05, -s * 0.05]]); c.fill(); break; }
    case 'crown': { c.fillStyle = col; c.beginPath(); c.moveTo(-s, s * 0.5); c.lineTo(-s, -s * 0.3); c.lineTo(-s * 0.5, s * 0.1); c.lineTo(0, -s * 0.6); c.lineTo(s * 0.5, s * 0.1); c.lineTo(s, -s * 0.3); c.lineTo(s, s * 0.5); c.closePath(); c.fill(); break; }
    case 'buddha': { c.fillStyle = col; c.beginPath(); c.arc(0, s * 0.35, s * 0.75, 0, Math.PI); c.fill(); c.beginPath(); c.arc(0, -s * 0.35, s * 0.4, 0, TAU); c.fill(); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.arc(0, s * 0.4, s * 0.45, 0.2, Math.PI - 0.2); c.stroke(); break; }
    case 'wave': { c.strokeStyle = col; c.lineWidth = s * 0.34; c.beginPath(); c.arc(-s * 0.2, s * 0.1, s * 0.7, -Math.PI * 0.85, Math.PI * 0.2); c.stroke(); c.fillStyle = col2 || col; for (const [dx, dy] of [[-0.7, 0.5], [-0.3, 0.7], [0.2, 0.6]]) { c.beginPath(); c.arc(dx * s, dy * s, s * 0.12, 0, TAU); c.fill(); } break; }
    case 'key': { c.strokeStyle = col; c.lineWidth = s * 0.18; c.beginPath(); c.arc(-s * 0.5, 0, s * 0.4, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(-s * 0.15, 0); c.lineTo(s * 0.9, 0); c.moveTo(s * 0.7, 0); c.lineTo(s * 0.7, s * 0.35); c.moveTo(s * 0.9, 0); c.lineTo(s * 0.9, s * 0.45); c.stroke(); break; }
    case 'shield': { c.fillStyle = col; c.beginPath(); c.moveTo(0, -s); c.lineTo(s * 0.8, -s * 0.6); c.lineTo(s * 0.7, s * 0.3); c.quadraticCurveTo(s * 0.4, s, 0, s * 1.05); c.quadraticCurveTo(-s * 0.4, s, -s * 0.7, s * 0.3); c.lineTo(-s * 0.8, -s * 0.6); c.closePath(); c.fill(); break; }
    case 'heart': { c.fillStyle = col; c.beginPath(); c.moveTo(0, s * 0.9); c.bezierCurveTo(-s * 1.3, -s * 0.1, -s * 0.5, -s, 0, -s * 0.35); c.bezierCurveTo(s * 0.5, -s, s * 1.3, -s * 0.1, 0, s * 0.9); c.fill(); break; }
    case 'glass': { c.fillStyle = col; c.beginPath(); c.moveTo(-s * 0.5, -s * 0.7); c.lineTo(s * 0.5, -s * 0.7); c.lineTo(s * 0.32, s * 0.8); c.lineTo(-s * 0.32, s * 0.8); c.closePath(); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(0, -s * 0.7, s * 0.5, s * 0.16, 0, 0, TAU); c.fill(); break; }
    case 'snow': { c.strokeStyle = col; c.lineWidth = s * 0.1; for (let i = 0; i < 6; i++) { c.save(); c.rotate(i / 6 * TAU); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -s); c.moveTo(0, -s * 0.6); c.lineTo(s * 0.25, -s * 0.8); c.moveTo(0, -s * 0.6); c.lineTo(-s * 0.25, -s * 0.8); c.stroke(); c.restore(); } break; }
    case 'leaf': { c.fillStyle = col; c.beginPath(); c.moveTo(0, s); c.bezierCurveTo(-s, s * 0.2, -s * 0.6, -s, 0, -s); c.bezierCurveTo(s * 0.6, -s, s, s * 0.2, 0, s); c.fill(); c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = s * 0.06; c.beginPath(); c.moveTo(0, s); c.lineTo(0, -s); c.stroke(); break; }
    case 'pinup': { c.fillStyle = col; c.beginPath(); c.arc(0, -s * 0.5, s * 0.32, 0, TAU); c.fill(); c.beginPath(); c.moveTo(-s * 0.3, -s * 0.2); c.quadraticCurveTo(0, s * 0.1, s * 0.3, -s * 0.2); c.quadraticCurveTo(s * 0.6, s * 0.7, 0, s); c.quadraticCurveTo(-s * 0.6, s * 0.7, -s * 0.3, -s * 0.2); c.fill(); break; }
    case 'dragon': { c.fillStyle = col; c.beginPath(); c.moveTo(-s, s * 0.3); c.quadraticCurveTo(-s * 0.2, -s * 0.2, s * 0.3, -s * 0.5); c.quadraticCurveTo(s, -s, s * 0.9, -s * 0.1); c.quadraticCurveTo(s * 0.4, s * 0.2, s * 0.5, s * 0.8); c.quadraticCurveTo(0, s * 0.3, -s, s * 0.3); c.fill(); break; }
    case 'thumb': { c.fillStyle = col; c.beginPath(); c.roundRect(-s * 0.25, -s * 0.1, s * 0.5, s, s * 0.1); c.fill(); c.beginPath(); c.roundRect(-s * 0.55, -s * 0.1, s * 0.32, s * 0.55, s * 0.14); c.fill(); c.beginPath(); c.arc(s * 0.05, -s * 0.3, s * 0.34, Math.PI, TAU); c.fill(); break; }
    case 'ring': { c.strokeStyle = col; c.lineWidth = s * 0.16; c.beginPath(); c.arc(0, 0, s * 0.8, 0, TAU); c.stroke(); break; }
    case 'target': { for (let i = 3; i >= 1; i--) { c.beginPath(); c.arc(0, 0, s * i / 3, 0, TAU); c.fillStyle = i % 2 ? col : (col2 || '#fff'); c.fill(); } break; }
    default: c.beginPath(); c.arc(0, 0, s * 0.6, 0, TAU); fill(col); break;
  }
  c.restore();
}

const METAL: Record<string, [string, string, string]> = {
  steel: ['#f2f4f6', '#b9c0c7', '#7c848c'], silver: ['#ffffff', '#c8ccd2', '#868c94'],
  gold: ['#fff3c0', '#e8be55', '#9c7818'], copper: ['#f4c9a0', '#c67e46', '#7c471f'], dark: ['#6b7078', '#3a3e44', '#1c1f24'],
};

// desenha a tampinha inteira num canvas quadrado
export function drawCap(art: CapArt, S = 360): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!;
  const cx = S / 2, cy = S / 2, R = S * 0.5 - 1;
  const rimIn = R * 0.82;                          // borda crimpada ocupa os 18% externos
  const met = METAL[art.metal || 'steel'];

  // borda crimpada (coroa): 21 dentes com brilho metálico
  const N = 21;
  for (let i = 0; i < N; i++) {
    const a0 = i / N * TAU - Math.PI / 2, a1 = (i + 1) / N * TAU - Math.PI / 2, am = (a0 + a1) / 2;
    c.beginPath(); c.moveTo(cx + Math.cos(a0) * rimIn, cy + Math.sin(a0) * rimIn);
    c.arc(cx, cy, rimIn, a0, a1); c.arc(cx, cy, R, a1, a0, true); c.closePath();
    const lit = 0.5 + 0.5 * Math.cos(am + 0.7);   // luz vindo de cima-esquerda
    const g = c.createLinearGradient(cx + Math.cos(am) * rimIn, cy + Math.sin(am) * rimIn, cx + Math.cos(am) * R, cy + Math.sin(am) * R);
    g.addColorStop(0, met[1]); g.addColorStop(1, lit > 0.5 ? met[0] : met[2]);
    c.fillStyle = g; c.fill();
    c.strokeStyle = 'rgba(0,0,0,0.18)'; c.lineWidth = S * 0.004; c.beginPath(); c.moveTo(cx + Math.cos(a0) * rimIn, cy + Math.sin(a0) * rimIn); c.lineTo(cx + Math.cos(a0) * R, cy + Math.sin(a0) * R); c.stroke();
  }
  // anel escuro entre dentes e rótulo
  c.beginPath(); c.arc(cx, cy, rimIn, 0, TAU); c.strokeStyle = 'rgba(0,0,0,0.28)'; c.lineWidth = S * 0.01; c.stroke();

  // rótulo (disco)
  c.save(); c.beginPath(); c.arc(cx, cy, rimIn - 1, 0, TAU); c.clip();
  c.fillStyle = setRadial(c, cx, cy, rimIn, art.bg) as any; c.fillRect(0, 0, S, S);
  if (art.fringe) { c.strokeStyle = art.fringe; c.lineWidth = rimIn * 0.14; c.beginPath(); c.arc(cx, cy, rimIn * 0.9, 0, TAU); c.stroke(); }
  if (art.rings) { c.strokeStyle = art.rings; c.lineWidth = S * 0.006; for (const rr of [0.62, 0.7]) { c.beginPath(); c.arc(cx, cy, rimIn * rr, 0, TAU); c.stroke(); } }

  // emblema (atrás do texto central)
  if (art.emblem) drawEmblem(c, art.emblem, cx, cy + (art.emblemY ?? 0) * rimIn, rimIn * 0.34 * (art.emblemScale ?? 1), art.emblemColor || '#c0392b', art.emblemColor2 || '');

  // estrelas em anel
  if (art.stars) { c.fillStyle = art.starColor || '#fff'; for (let i = 0; i < art.stars; i++) { const a = -Math.PI / 2 + i / art.stars * TAU; starShape(c, cx + Math.cos(a) * rimIn * 0.6, cy + Math.sin(a) * rimIn * 0.6, rimIn * 0.07, rimIn * 0.03, 5); c.fill(); } }

  // faixa horizontal
  if (art.band) { const [bc, bt, btc] = art.band; c.fillStyle = bc; c.fillRect(cx - rimIn, cy - rimIn * 0.26, rimIn * 2, rimIn * 0.52); if (bt) { const fs = fitText(c, bt, rimIn * 1.7, rimIn * 0.34, '800'); c.fillStyle = btc; c.font = `800 ${fs}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(bt, cx, cy + rimIn * 0.01); } }

  // arcos de texto
  if (art.arcTop) arcText(c, art.arcTop[0], cx, cy, rimIn * 0.82, true, `800 ${rimIn * 0.15}px sans-serif`, art.arcTop[1]);
  if (art.arcBot) arcText(c, art.arcBot[0], cx, cy, rimIn * 0.82, false, `800 ${rimIn * 0.13}px sans-serif`, art.arcBot[1]);

  // texto central
  if (art.center) {
    const ff = art.centerFont || 'block';
    const weight = ff === 'script' ? 'italic 900' : ff === 'serif' ? 'bold' : ff === 'slab' ? '900' : '800';
    const fam = ff === 'script' ? "'Segoe Script','Brush Script MT',cursive" : ff === 'serif' ? "Georgia,serif" : 'sans-serif';
    let fs = (art.centerSize ?? 0.42) * rimIn; c.font = `${weight} ${fs}px ${fam}`;
    while (c.measureText(art.center).width > rimIn * 1.55 && fs > 8) { fs -= 2; c.font = `${weight} ${fs}px ${fam}`; }
    c.fillStyle = art.centerColor || '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
    const ty = cy + (art.band ? 0 : (art.arcBot || art.sub ? -rimIn * 0.05 : 0));
    if (ff === 'script') { c.save(); c.translate(cx, ty); c.transform(1, 0, -0.18, 1, 0, 0); c.fillText(art.center, 0, 0); c.restore(); }
    else c.fillText(art.center, cx, ty);
  }
  if (art.sub) { c.fillStyle = art.sub[1]; c.font = `700 ${rimIn * 0.13}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(art.sub[0], cx, cy + rimIn * 0.42); }

  // ------- envelhecimento vintage + brilho -------
  const vg = art.vintage ?? 0.35;
  if (vg > 0) {
    for (let i = 0; i < 40 * vg; i++) { c.globalAlpha = 0.05 + Math.random() * 0.12; c.fillStyle = Math.random() < 0.5 ? '#3a2a12' : '#fff'; c.beginPath(); c.arc(cx + (Math.random() - 0.5) * rimIn * 2, cy + (Math.random() - 0.5) * rimIn * 2, rimIn * (0.01 + Math.random() * 0.05), 0, TAU); c.fill(); }
    c.globalAlpha = 1;
    // arranhões
    c.strokeStyle = 'rgba(255,255,255,0.12)'; c.lineWidth = 1; for (let i = 0; i < 6 * vg; i++) { c.beginPath(); const a = Math.random() * TAU, rr = Math.random() * rimIn; c.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); c.lineTo(cx + Math.cos(a) * (rr + rimIn * 0.3), cy + Math.sin(a) * (rr + rimIn * 0.3)); c.stroke(); }
    const dark = c.createRadialGradient(cx, cy, rimIn * 0.4, cx, cy, rimIn); dark.addColorStop(0, 'rgba(0,0,0,0)'); dark.addColorStop(1, `rgba(30,18,6,${0.14 + vg * 0.22})`); c.fillStyle = dark; c.fillRect(0, 0, S, S);
  }
  c.restore();

  // brilho do metal por cima de tudo (gloss)
  const gl = c.createLinearGradient(0, 0, S * 0.7, S * 0.7); gl.addColorStop(0, 'rgba(255,255,255,0.28)'); gl.addColorStop(0.35, 'rgba(255,255,255,0.05)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
  c.save(); c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.clip(); c.fillStyle = gl; c.fillRect(0, 0, S, S); c.restore();
  return cv;
}

const _texCache = new Map<string, THREE.CanvasTexture>();
export function makeCapTex(id: string, art: CapArt): THREE.CanvasTexture {
  if (_texCache.has(id)) return _texCache.get(id)!;
  const t = new THREE.CanvasTexture(drawCap(art, 384)); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; _texCache.set(id, t); return t;
}
