// Texturas procedurais desenhadas em <canvas> — nada de imagens externas.
// Tudo com aparência natural: grão de areia, ondulação da água, folha de palmeira.
import * as THREE from 'three';

function noiseCanvas(size: number): { cnv: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const cnv = document.createElement('canvas');
  cnv.width = cnv.height = size;
  return { cnv, ctx: cnv.getContext('2d')! };
}

// valor pseudo-aleatório estável
function hash(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// --------- AREIA: cor com grão fino e manchas quentes ---------
export function makeSandTexture(): THREE.CanvasTexture {
  const S = 512; const { cnv, ctx } = noiseCanvas(S);
  // base
  const g = ctx.createLinearGradient(0, 0, S, S);
  g.addColorStop(0, '#e9d0a2'); g.addColorStop(0.5, '#e0c391'); g.addColorStop(1, '#d8b981');
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
  // manchas suaves (variação de tom)
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * S, y = Math.random() * S, r = 20 + Math.random() * 70;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    const warm = Math.random() < 0.5;
    rg.addColorStop(0, warm ? 'rgba(206,168,110,0.18)' : 'rgba(245,226,190,0.16)');
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  // grão fino
  const img = ctx.getImageData(0, 0, S, S); const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    d[i] += n; d[i + 1] += n * 0.92; d[i + 2] += n * 0.8;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cnv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(4, 4);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return tex;
}

// --------- AREIA: bump a partir do grão ---------
export function makeSandBump(): THREE.CanvasTexture {
  const S = 256; const { cnv, ctx } = noiseCanvas(S);
  ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, S, S);
  const img = ctx.getImageData(0, 0, S, S); const d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = 128 + (Math.random() - 0.5) * 90; d[i] = d[i + 1] = d[i + 2] = n; }
  ctx.putImageData(img, 0, 0);
  // pequenas ondulações de duna
  ctx.globalAlpha = 0.5;
  for (let y = 0; y < S; y += 3) { ctx.strokeStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.04})`; ctx.beginPath(); ctx.moveTo(0, y + Math.sin(y) * 2); ctx.lineTo(S, y + Math.cos(y) * 2); ctx.stroke(); }
  const tex = new THREE.CanvasTexture(cnv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(8, 8);
  return tex;
}

// --------- ÁGUA: mapa de normais de ondulação (tileável) ---------
export function makeWaterNormal(): THREE.CanvasTexture {
  const S = 256;
  // campo de altura tileável a partir de ondas senoidais
  const h = new Float32Array(S * S);
  const waves = [ [3, 2, 1.0], [5, 4, 0.5], [2, 6, 0.6], [7, 3, 0.35] ];
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let v = 0;
    for (const [fx, fy, a] of waves) v += a * Math.sin((fx * x + fy * y) / S * Math.PI * 2 + fx);
    h[y * S + x] = v;
  }
  const { cnv, ctx } = noiseCanvas(S);
  const img = ctx.createImageData(S, S); const d = img.data;
  const at = (x: number, y: number) => h[((y + S) % S) * S + ((x + S) % S)];
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const dx = (at(x + 1, y) - at(x - 1, y)) * 0.5;
    const dy = (at(x, y + 1) - at(x, y - 1)) * 0.5;
    const nx = -dx, ny = -dy, nz = 1.0;
    const len = Math.hypot(nx, ny, nz);
    const idx = (y * S + x) * 4;
    d[idx] = (nx / len * 0.5 + 0.5) * 255;
    d[idx + 1] = (ny / len * 0.5 + 0.5) * 255;
    d[idx + 2] = (nz / len * 0.5 + 0.5) * 255;
    d[idx + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cnv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 3);
  return tex;
}

// --------- FOLHA DE PALMEIRA (fronde cheia, com alpha nas bordas) ---------
export function makePalmLeaf(): THREE.CanvasTexture {
  const W = 256, H = 150; const cnv = document.createElement('canvas'); cnv.width = W; cnv.height = H;
  const ctx = cnv.getContext('2d')!;
  ctx.clearRect(0, 0, W, H);
  const midY = H / 2;
  const rachYat = (t: number) => midY - 12 * Math.sin(t * Math.PI);
  const nLeaf = 52;
  // folíolos cheios (preenchidos), sobrepostos, formando uma lâmina contínua
  for (let i = 0; i < nLeaf; i++) {
    const t = i / (nLeaf - 1);
    const x = 12 + t * (W - 26);
    const rachY = rachYat(t);
    const len = (20 + 56 * Math.sin(t * Math.PI)) * (1 - t * 0.12);
    for (const s of [-1, 1]) {
      const tipx = x + len * 0.34, tipy = rachY + s * len;
      const g = ctx.createLinearGradient(x, rachY, tipx, tipy);
      g.addColorStop(0, '#78b83f'); g.addColorStop(0.6, '#5a9a30'); g.addColorStop(1, '#356b1f');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(x - 3, rachY);
      ctx.quadraticCurveTo(x + len * 0.18, rachY + s * len * 0.34, tipx, tipy);
      ctx.quadraticCurveTo(x + len * 0.30, rachY + s * len * 0.42, x + 5, rachY);
      ctx.closePath(); ctx.fill();
    }
  }
  // ráquis central
  ctx.strokeStyle = '#3f6f24'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(8, rachYat(0)); ctx.quadraticCurveTo(W * 0.5, midY - 12, W - 10, rachYat(1)); ctx.stroke();
  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}

// --------- CÉU quente de deserto (fundo) ---------
export function makeSkyTexture(): THREE.CanvasTexture {
  const W = 16, H = 256; const cnv = document.createElement('canvas'); cnv.width = W; cnv.height = H;
  const ctx = cnv.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0.0, '#8db9d8');   // topo azul suave
  g.addColorStop(0.45, '#cfe0dd');
  g.addColorStop(0.72, '#f4e2bc');  // brума quente
  g.addColorStop(1.0, '#f6d79f');   // horizonte dourado
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export { hash };
