// Barco de papel: casco de origami gerado por varredura paramétrica de uma
// seção em "V" que se estreita e sobe nas pontas (as dobras erguidas típicas).
// Material de papel fosco com flatShading para leitura de vincos. Frágil e pequeno.
import * as THREE from 'three';
import { WATER_LEVEL } from './terrain';

function buildHull(): THREE.BufferGeometry {
  const N = 20, M = 14;          // resolução ao longo e na seção
  const verts: number[] = [], uvs: number[] = [];
  for (let n = 0; n <= N; n++) {
    const t = (n / N) * 2 - 1;                 // −1..1 ao longo do comprimento
    const x = t * 0.9;
    const tip = Math.pow(Math.abs(t), 2.1);    // 0 no meio, 1 nas pontas
    const halfW = 0.36 * (1 - 0.62 * tip);
    const yBottom = 0.05 + 0.60 * tip;         // quilha sobe nas pontas
    const yRim = 0.54 + 0.18 * tip;            // borda (picos nas pontas)
    for (let m = 0; m <= M; m++) {
      const u = (m / M) * 2 - 1;               // −1..1 pela seção (borda→quilha→borda)
      const z = u * halfW;
      const y = yBottom + (u * u) * (yRim - yBottom);
      verts.push(x, y, z);
      uvs.push(n / N, m / M);
    }
  }
  const idx: number[] = [];
  const at = (n: number, m: number) => n * (M + 1) + m;
  for (let n = 0; n < N; n++) for (let m = 0; m < M; m++) {
    const a = at(n, m), b = at(n + 1, m), c = at(n, m + 1), d = at(n + 1, m + 1);
    idx.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

// textura de papel: bege claro com leves vincos
function paperTexture(): THREE.CanvasTexture {
  const S = 128; const c = document.createElement('canvas'); c.width = c.height = S;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#f6f0e2'; ctx.fillRect(0, 0, S, S);
  const img = ctx.getImageData(0, 0, S, S); const d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 10; d[i] += n; d[i + 1] += n; d[i + 2] += n - 2; }
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = 'rgba(150,130,90,0.16)'; ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) { const y = Math.random() * S; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(S, y + (Math.random() - 0.5) * 20); ctx.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export class PaperBoat {
  mesh: THREE.Mesh;
  private t0 = 0;

  constructor(x: number, z: number) {
    const geo = buildHull();
    const mat = new THREE.MeshStandardMaterial({
      map: paperTexture(), color: '#fbf6ea', roughness: 0.82, metalness: 0.0,
      side: THREE.DoubleSide, flatShading: true,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true; this.mesh.receiveShadow = false;
    this.mesh.position.set(x, WATER_LEVEL, z);
    this.mesh.scale.setScalar(1.5);
  }

  // flutuação/balanço; na "Execução" deriva de leve seguindo o canal
  update(t: number, running: boolean): void {
    const p = this.mesh.position;
    p.y = WATER_LEVEL + 0.02 + Math.sin(t * 1.6) * 0.03;
    this.mesh.rotation.z = Math.sin(t * 1.3) * 0.06;
    this.mesh.rotation.x = Math.sin(t * 1.0 + 1) * 0.04;
    if (running) {
      this.t0 += 0.0016;
      // caminho aproximado do canal (para a direita)
      p.x += Math.cos(0.15) * 0.006;
      p.z += Math.sin(-0.2 + Math.sin(t * 0.3) * 0.2) * 0.004;
      this.mesh.rotation.y = -0.2 + Math.sin(t * 0.5) * 0.08;
    } else {
      this.mesh.rotation.y += (-0.35 - this.mesh.rotation.y) * 0.02;
    }
  }
}
