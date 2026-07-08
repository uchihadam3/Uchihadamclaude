// Primitivas de desenho premium para o visual de Starforge Armada.
// Tudo baseado em Canvas 2D com blending aditivo, gradientes e glow.

export type Ctx = CanvasRenderingContext2D;

export function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${r | 0},${g | 0},${b | 0},${a})`;
}

// Halo/glow radial aditivo — o coração do brilho sci-fi.
export function glow(ctx: Ctx, x: number, y: number, radius: number, color: string, alpha = 1): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, color);
  g.addColorStop(0.4, applyAlpha(color, 0.5 * alpha));
  g.addColorStop(1, applyAlpha(color, 0));
  ctx.globalAlpha = alpha;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Faz um traço aditivo (feixe/laser) entre dois pontos com núcleo brilhante.
export function beam(ctx: Ctx, x1: number, y1: number, x2: number, y2: number, width: number, core: string, halo: string): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineCap = 'round';
  ctx.strokeStyle = halo;
  ctx.lineWidth = width * 2.6;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.strokeStyle = core;
  ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

// Estrela/faísca de 4 pontas (usada em impactos e brilhos).
export function sparkle(ctx: Ctx, x: number, y: number, size: number, color: string, rot = 0): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const long = size, sh = size * 0.16;
    ctx.lineTo(Math.cos(a) * long, Math.sin(a) * long);
    ctx.lineTo(Math.cos(a + Math.PI / 4) * sh, Math.sin(a + Math.PI / 4) * sh);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function applyAlpha(color: string, a: number): string {
  // aceita #rgb, #rrggbb, rgb(), rgba()
  const c = parseColor(color);
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

export function parseColor(color: string): [number, number, number] {
  if (color[0] === '#') {
    let h = color.slice(1);
    if (h.length === 3) h = h.split('').map((x) => x + x).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(',').map((s) => parseFloat(s));
    return [p[0], p[1], p[2]];
  }
  return [255, 255, 255];
}

// mistura linear de duas cores hex -> "r,g,b"
export function mix(a: string, b: string, t: number): string {
  const ca = parseColor(a), cb = parseColor(b);
  return `rgb(${lerp(ca[0], cb[0], t) | 0},${lerp(ca[1], cb[1], t) | 0},${lerp(ca[2], cb[2], t) | 0})`;
}

export function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
export function clamp(v: number, lo: number, hi: number): number { return v < lo ? lo : v > hi ? hi : v; }
export function rand(a: number, b: number): number { return a + Math.random() * (b - a); }

// desenha um polígono a partir de uma lista de pontos [x,y,...]
export function poly(ctx: Ctx, pts: number[]): void {
  ctx.beginPath();
  ctx.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
  ctx.closePath();
}

// gradiente linear vertical rápido
export function vgrad(ctx: Ctx, x: number, y0: number, y1: number, stops: [number, string][]): CanvasGradient {
  const g = ctx.createLinearGradient(x, y0, x, y1);
  for (const [o, c] of stops) g.addColorStop(o, c);
  return g;
}
