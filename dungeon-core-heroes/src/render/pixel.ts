// ============ NÚCLEO DE PIXEL ART ============
// Desenha sprites em resolução nativa (1 unidade = 1 pixel) num buffer pequeno,
// com contorno automático e rampas de cor. O buffer é ampliado com suavização
// desligada na cena, resultando em pixel art nítido.

export class Pix {
  w: number; h: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private img: ImageData;
  private d: Uint8ClampedArray;

  constructor(w: number, h: number) {
    this.w = w; this.h = h;
    this.canvas = document.createElement('canvas');
    this.canvas.width = w; this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d')!;
    this.img = this.ctx.createImageData(w, h);
    this.d = this.img.data;
  }

  clear(): void { this.d.fill(0); }

  private rgb(hex: string): [number, number, number, number] {
    if (hex.length === 9) {
      const n = parseInt(hex.slice(1), 16);
      return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
    }
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255];
  }

  px(x: number, y: number, hex: string): void {
    x |= 0; y |= 0;
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const [r, g, b, a] = this.rgb(hex);
    const i = (y * this.w + x) * 4;
    if (a >= 255) { this.d[i] = r; this.d[i + 1] = g; this.d[i + 2] = b; this.d[i + 3] = 255; }
    else if (a > 0) { // alpha blend
      const ea = a / 255, ia = 1 - ea;
      this.d[i] = r * ea + this.d[i] * ia; this.d[i + 1] = g * ea + this.d[i + 1] * ia;
      this.d[i + 2] = b * ea + this.d[i + 2] * ia; this.d[i + 3] = Math.max(this.d[i + 3], a);
    }
  }

  rect(x: number, y: number, w: number, h: number, hex: string): void {
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) this.px(x + xx, y + yy, hex);
  }
  hline(x: number, y: number, w: number, hex: string): void { for (let i = 0; i < w; i++) this.px(x + i, y, hex); }
  vline(x: number, y: number, h: number, hex: string): void { for (let i = 0; i < h; i++) this.px(x, y + i, hex); }

  // disco preenchido (para gosmas, olhos, cabeças redondas)
  disc(cx: number, cy: number, r: number, hex: string): void {
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * 0.5) this.px(cx + x, cy + y, hex);
  }
  ellipse(cx: number, cy: number, rx: number, ry: number, hex: string): void {
    for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx + 0.5) + (y * y) / (ry * ry + 0.5) <= 1) this.px(cx + x, cy + y, hex);
  }

  // linha grossa (membros)
  limb(x0: number, y0: number, x1: number, y1: number, thick: number, hex: string): void {
    const steps = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0)));
    const t = Math.floor(thick / 2);
    for (let s = 0; s <= steps; s++) {
      const x = Math.round(x0 + (x1 - x0) * s / steps), y = Math.round(y0 + (y1 - y0) * s / steps);
      for (let dx = -t; dx <= thick - 1 - t; dx++) for (let dy = -t; dy <= thick - 1 - t; dy++) this.px(x + dx, y + dy, hex);
    }
  }

  // contorno automático 1px: pixels vazios adjacentes a preenchidos viram cor de contorno
  outline(hex: string, diag = false): void {
    const src = this.d.slice();
    const at = (x: number, y: number) => (x < 0 || y < 0 || x >= this.w || y >= this.h) ? 0 : src[(y * this.w + x) * 4 + 3];
    const [r, g, b] = this.rgb(hex);
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      const i = (y * this.w + x) * 4;
      if (src[i + 3] > 0) continue;
      const near = at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1) ||
        (diag && (at(x - 1, y - 1) || at(x + 1, y - 1) || at(x - 1, y + 1) || at(x + 1, y + 1)));
      if (near) { this.d[i] = r; this.d[i + 1] = g; this.d[i + 2] = b; this.d[i + 3] = 255; }
    }
  }

  // sombra projetada simples (para dar volume): escurece pixels na diagonal inf-dir dentro do corpo
  shade(hex: string, dx: number, dy: number, amount: number): void {
    const src = this.d.slice();
    const at = (x: number, y: number) => (x < 0 || y < 0 || x >= this.w || y >= this.h) ? 0 : src[(y * this.w + x) * 4 + 3];
    const [r, g, b] = this.rgb(hex);
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      const i = (y * this.w + x) * 4;
      if (src[i + 3] === 0) continue;
      // se o vizinho na direção da luz é vazio, mantém; se é interior oposto à luz, escurece
      if (at(x - dx, y - dy) === 0) continue;
      if (at(x + dx, y + dy) === 0) {
        this.d[i] = this.d[i] * (1 - amount) + r * amount;
        this.d[i + 1] = this.d[i + 1] * (1 - amount) + g * amount;
        this.d[i + 2] = this.d[i + 2] * (1 - amount) + b * amount;
      }
    }
  }

  commit(): HTMLCanvasElement {
    this.ctx.putImageData(this.img, 0, 0);
    return this.canvas;
  }
}

// ---------- rampas de cor (escurecer/clarear em espaço linear aproximado) ----------
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt >= 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
  else { r *= 1 + amt; g *= 1 + amt; b *= 1 + amt; }
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${((c(r) << 16) | (c(g) << 8) | c(b)).toString(16).padStart(6, '0')}`;
}

// gera uma rampa de 5 tons a partir de uma cor base
export interface Ramp { out: string; dark: string; shadow: string; base: string; light: string; }
export function ramp(base: string, outline = '#0d0a14'): Ramp {
  return { out: outline, dark: shade(base, -0.42), shadow: shade(base, -0.2), base, light: shade(base, 0.28) };
}

// blita um sprite ampliado sem suavização
export function blit(ctx: CanvasRenderingContext2D, sprite: HTMLCanvasElement, cx: number, footY: number, scale: number, flip: 1 | -1, alpha = 1): void {
  const w = sprite.width * scale, h = sprite.height * scale;
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.globalAlpha = alpha;
  ctx.translate(cx, footY);
  ctx.scale(flip, 1);
  ctx.drawImage(sprite, Math.round(-w / 2), Math.round(-h), w, h);
  ctx.restore();
}
