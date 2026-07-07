import type { DungeonDef } from '../types';

// ============ DUNGEON EM PIXEL ART (renderizada em baixa resolução) ============
// Todas as coordenadas aqui são pixels internos (1:1). A cena amplia com
// suavização desligada, unificando cenário e sprites no mesmo grid de pixels.

type Ctx = CanvasRenderingContext2D;

function h(hex: string): [number, number, number] { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = h(a), [r2, g2, b2] = h(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${c(r1, r2)},${c(g1, g2)},${c(b1, b2)})`;
}
function rnd(n: number): number { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); }

export function drawDungeonPixel(ctx: Ctx, W: number, H: number, d: DungeonDef, t: number, scrollX: number): number {
  const a = d.ambient;
  const floorY = Math.round(H * 0.58);
  // --- céu/fundo distante (gradiente em faixas para look retrô) ---
  const bands = 10;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle = mix(a.skyTop, a.skyBottom, i / (bands - 1));
    ctx.fillRect(0, Math.round((i / bands) * floorY), W, Math.ceil(floorY / bands) + 1);
  }

  // --- arcos distantes (parallax lento) ---
  drawArches(ctx, W, floorY, a.far, scrollX * 0.15, 46, floorY * 0.5, 11);
  drawArches(ctx, W, floorY, a.mid, scrollX * 0.3, 34, floorY * 0.7, 23);

  // --- parede de tijolos (parallax médio) ---
  drawBrickWall(ctx, W, floorY, a, scrollX * 0.5);

  // --- tochas + decoração temática ---
  drawTorches(ctx, W, floorY, a, scrollX * 0.5, t);
  drawThemeDecor(ctx, W, floorY, d, scrollX * 0.5, t);

  // --- chão em perspectiva ---
  drawFloor(ctx, W, H, floorY, a, scrollX);

  // --- brilho ambiente + vinheta ---
  const glow = ctx.createRadialGradient(W / 2, floorY * 0.8, 4, W / 2, floorY * 0.8, W * 0.6);
  glow.addColorStop(0, hexA(a.glow, 0.10)); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
  return floorY;
}

function drawArches(ctx: Ctx, W: number, floorY: number, col: string, scroll: number, span: number, maxH: number, seed: number): void {
  ctx.fillStyle = col;
  for (let i = -1; i <= W / span + 1; i++) {
    const bx = Math.round(i * span - (scroll % span));
    const r = rnd(i + seed);
    const ph = Math.round(maxH * (0.6 + r * 0.4));
    const w = Math.round(span * 0.7);
    ctx.fillRect(bx, floorY - ph, w, ph);
    // topo arqueado (semicírculo em pixels)
    const cr = Math.round(w / 2);
    for (let y = 0; y <= cr; y++) { const dx = Math.round(Math.sqrt(cr * cr - y * y)); ctx.fillRect(bx + cr - dx, floorY - ph - y, dx * 2, 1); }
  }
}

function drawBrickWall(ctx: Ctx, W: number, floorY: number, a: DungeonDef['ambient'], scroll: number): void {
  const bw = 12, bh = 6;
  const base = a.mid, mortar = a.floorDark, lite = mix(a.mid, a.glow, 0.12);
  ctx.fillStyle = mix(base, '#000000', 0.15); ctx.fillRect(0, 0, W, floorY);
  for (let row = 0; row * bh < floorY; row++) {
    const y = floorY - (row + 1) * bh;
    const off = (row % 2) * (bw / 2) - (scroll % bw);
    for (let bx = -bw; bx < W + bw; bx += bw) {
      const x = Math.round(bx + off);
      const r = rnd(row * 7.3 + bx * 0.11);
      ctx.fillStyle = r < 0.12 ? mix(base, mortar, 0.5) : r > 0.9 ? lite : base;
      ctx.fillRect(x, y, bw - 1, bh - 1);
      // brilho no topo do tijolo
      ctx.fillStyle = mix(base, lite, 0.5); ctx.fillRect(x, y, bw - 1, 1);
    }
  }
  // manchas / rachaduras espalhadas pela parede (quebra a monotonia)
  for (let i = 0; i < 40; i++) {
    const r = rnd(i * 3.7 + 5.1);
    const x = Math.round(((i * 71.3 - scroll * 0.5) % (W + 40) + W + 40) % (W + 40) - 20);
    const y = Math.round(r * floorY * 0.85);
    if (r < 0.5) { ctx.fillStyle = mix(base, '#000', 0.35); ctx.fillRect(x, y, 3, 1); ctx.fillRect(x + 1, y + 1, 1, 3); } // rachadura
    else { ctx.fillStyle = mix(base, lite, 0.4); ctx.fillRect(x, y, 2, 2); } // pedra clara
  }
  // rodapé escuro
  ctx.fillStyle = mix(a.floorDark, '#000', 0.2); ctx.fillRect(0, floorY - 3, W, 3);
}

function drawTorches(ctx: Ctx, W: number, floorY: number, a: DungeonDef['ambient'], scroll: number, t: number): void {
  const spacing = 88;
  for (let i = -1; i <= W / spacing + 1; i++) {
    const x = Math.round(i * spacing + 40 - (scroll % spacing));
    const y = Math.round(floorY * 0.42);
    // suporte
    ctx.fillStyle = '#3a3038'; ctx.fillRect(x - 1, y, 3, 8);
    ctx.fillStyle = '#20181e'; ctx.fillRect(x - 2, y + 7, 5, 2);
    // chama (flicker 3 quadros)
    const fr = Math.floor(t * 10 + i) % 3;
    const fh = 6 + fr;
    ctx.fillStyle = '#ffcf5a'; ctx.fillRect(x - 1, y - fh, 3, fh);
    ctx.fillStyle = '#ff8a2a'; ctx.fillRect(x - 1, y - fh + 2, 3, fh - 2);
    ctx.fillStyle = '#ffe89a'; ctx.fillRect(x, y - fh + 1, 1, 2);
    // brilho da tocha
    const gr = ctx.createRadialGradient(x, y - 2, 1, x, y - 2, 34);
    gr.addColorStop(0, hexA('#ffb040', 0.16)); gr.addColorStop(1, 'transparent');
    ctx.fillStyle = gr; ctx.fillRect(x - 34, y - 36, 68, 68);
    void a;
  }
}

function drawThemeDecor(ctx: Ctx, W: number, floorY: number, d: DungeonDef, scroll: number, t: number): void {
  const kind = d.ambient.particles;
  const acc = d.ambient.glow;
  const spacing = 60;
  for (let i = -1; i <= W / spacing + 1; i++) {
    const x = Math.round(i * spacing + 20 - (scroll % spacing));
    const r = rnd(i + d.id * 3.1);
    if (r < 0.4) continue;
    if (kind === 'spores' || kind === 'leaves') { // musgo/vinhas pendentes
      ctx.fillStyle = mix(acc, '#000', 0.3);
      const len = 6 + Math.floor(r * 10);
      for (let y = 0; y < len; y++) ctx.fillRect(x + Math.round(Math.sin(y * 0.5 + t) * 1), y, 2, 1);
      ctx.fillStyle = acc; ctx.fillRect(x, len, 2, 2);
    } else if (kind === 'bones') { // ossos na parede
      ctx.fillStyle = '#c8c2b0'; ctx.fillRect(x, Math.round(floorY * 0.5), 8, 2); ctx.fillRect(x, Math.round(floorY * 0.5) - 2, 2, 6);
    } else if (kind === 'embers') { // marcas de fogo
      ctx.fillStyle = mix('#000', acc, 0.3); ctx.fillRect(x, Math.round(floorY * 0.3), 10, 14);
    } else if (kind === 'stars' || kind === 'pulse' || kind === 'shards') { // cristais/runas
      ctx.fillStyle = acc; const cy = Math.round(floorY * 0.4);
      ctx.fillRect(x, cy, 2, 6); ctx.fillRect(x - 1, cy + 2, 4, 2);
    } else if (kind === 'bubbles') { // limo pendente
      ctx.fillStyle = mix(acc, '#000', 0.4); ctx.fillRect(x, 0, 3, 8 + Math.floor(r * 8));
    }
  }
}

function drawFloor(ctx: Ctx, W: number, H: number, floorY: number, a: DungeonDef['ambient'], scroll: number): void {
  // faixa frontal do chão em perspectiva
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    const y0 = floorY + Math.round((H - floorY) * ((r / rows) ** 1.5));
    const y1 = floorY + Math.round((H - floorY) * (((r + 1) / rows) ** 1.5));
    ctx.fillStyle = r % 2 === 0 ? a.floor : mix(a.floor, a.floorDark, 0.4);
    ctx.fillRect(0, y0, W, y1 - y0);
  }
  // linha de destaque na borda frontal
  ctx.fillStyle = mix(a.floor, a.glow, 0.25); ctx.fillRect(0, floorY, W, 1);
  ctx.fillStyle = mix(a.floor, '#000', 0.3); ctx.fillRect(0, floorY + 1, W, 1);
  // ladrilhos verticais convergindo
  const tile = 26;
  ctx.fillStyle = mix(a.floorDark, '#000', 0.2);
  for (let i = -2; i < W / tile + 2; i++) {
    const bx = i * tile - (scroll * 0.7) % tile;
    const cxp = (bx - W / 2);
    for (let r = 0; r < rows; r++) {
      const yy = floorY + Math.round((H - floorY) * ((r / rows) ** 1.5));
      const persp = 1 + r * 0.5;
      ctx.fillRect(Math.round(W / 2 + cxp * persp), yy, 1, 2);
    }
  }
}

export function hexA(hex: string, al: number): string {
  const [r, g, b] = h(hex); return `rgba(${r},${g},${b},${al})`;
}
export { mix };
