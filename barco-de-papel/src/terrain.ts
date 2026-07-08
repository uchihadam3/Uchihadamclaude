// Terreno do oásis: heightmap orgânica (dunas suaves), com um canal escavado
// e uma bacia de oásis. Gera a mesh 3D com grão de areia, areia molhada nas
// margens e normais recalculadas. Expõe heightAt / carveAt para água e objetos.
import * as THREE from 'three';
import { makeSandTexture, makeSandBump, hash } from './textures';

export const SIZE = 26;         // largura do mundo (−13..13)
const SEG = 150;                // resolução da malha
export const WATER_LEVEL = -0.12;

// ----- oásis e canal (em coordenadas de mundo x,z) -----
export const OASIS = { x: -4.2, z: 1.6, r: 3.4 };
const CANAL = { a: [-1.4, 0.6], c: [3.6, -3.2], b: [10.2, 1.4], w: 1.7 };

// ---- ruído de valor + fbm para dunas orgânicas ----
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fbm(x: number, y: number): number {
  let s = 0, amp = 0.5, f = 1;
  for (let i = 0; i < 4; i++) { s += amp * vnoise(x * f, y * f); f *= 2; amp *= 0.5; }
  return s;
}

// ---- máscara de água (canvas): branco onde há canal/oásis ----
function buildCarveMap(): { data: Uint8ClampedArray; W: number } {
  const W = 512; const cnv = document.createElement('canvas'); cnv.width = cnv.height = W;
  const ctx = cnv.getContext('2d')!;
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, W);
  const toPx = (x: number, z: number) => [((x + SIZE / 2) / SIZE) * W, ((z + SIZE / 2) / SIZE) * W] as const;
  // oásis (disco suave)
  const [ox, oz] = toPx(OASIS.x, OASIS.z);
  const og = ctx.createRadialGradient(ox, oz, 0, ox, oz, (OASIS.r / SIZE) * W * 1.05);
  og.addColorStop(0, '#fff'); og.addColorStop(0.72, '#fff'); og.addColorStop(1, '#000');
  ctx.fillStyle = og; ctx.beginPath(); ctx.arc(ox, oz, (OASIS.r / SIZE) * W * 1.1, 0, Math.PI * 2); ctx.fill();
  // canal (traço curvo, borda suave)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const [ax, az] = toPx(CANAL.a[0], CANAL.a[1]);
  const [cx, cz] = toPx(CANAL.c[0], CANAL.c[1]);
  const [bx, bz] = toPx(CANAL.b[0], CANAL.b[1]);
  for (const [wMul, alpha] of [[1.7, 0.5], [1.15, 0.85], [0.8, 1]] as const) {
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = (CANAL.w / SIZE) * W * wMul;
    ctx.beginPath(); ctx.moveTo(ax, az); ctx.quadraticCurveTo(cx, cz, bx, bz); ctx.stroke();
  }
  // leve borrão para margens naturais
  const img = ctx.getImageData(0, 0, W, W);
  return { data: img.data, W };
}

export class Terrain {
  mesh: THREE.Mesh;
  private carve: { data: Uint8ClampedArray; W: number };

  constructor() {
    this.carve = buildCarveMap();

    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geo.rotateX(-Math.PI / 2);                       // deitar no plano XZ
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const y = this.heightAt(x, z);
      pos.setY(i, y);
      // tonalidade: areia seca clara nos altos, areia molhada nas margens
      const wet = this.carveAt(x, z);
      const top = THREE.MathUtils.clamp((y + 0.3) * 0.5, 0, 1);
      let r = 1.02 + top * 0.06, g = 1.0 + top * 0.04, b = 0.96 + top * 0.02;
      if (wet > 0.02) { const m = Math.min(0.75, wet * 0.9); r *= 1 - m * 0.28; g *= 1 - m * 0.32; b *= 1 - m * 0.42; }
      colors.push(r, g, b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      map: makeSandTexture(), bumpMap: makeSandBump(), bumpScale: 0.05,
      vertexColors: true, roughness: 0.97, metalness: 0.0,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = false;
  }

  // altura do terreno num ponto do mundo (mesma fórmula da malha)
  heightAt(x: number, z: number): number {
    const nx = (x + SIZE / 2) / 3.2, nz = (z + SIZE / 2) / 3.2;
    let h = (fbm(nx, nz) - 0.5) * 1.1;      // dunas
    h += 0.12 * Math.sin(x * 0.4 + z * 0.2); // ondulação larga
    h -= x * 0.012;                          // leve caimento p/ o canal correr
    // bacia/canal: rebaixa onde há máscara de água
    const wet = this.carveAt(x, z);
    if (wet > 0) {
      const floor = WATER_LEVEL - 0.28 - 0.12 * wet;
      const t = THREE.MathUtils.smoothstep(wet, 0.1, 0.85);
      h = THREE.MathUtils.lerp(h + 0.05, floor, t);
    }
    return h;
  }

  // 0..1: quanto aquele ponto pertence ao leito de água (margem→centro)
  carveAt(x: number, z: number): number {
    const W = this.carve.W;
    let u = (x + SIZE / 2) / SIZE, v = (z + SIZE / 2) / SIZE;
    if (u < 0 || u > 1 || v < 0 || v > 1) return 0;
    const px = Math.min(W - 1, (u * W) | 0), py = Math.min(W - 1, (v * W) | 0);
    return this.carve.data[(py * W + px) * 4] / 255;
  }
}
