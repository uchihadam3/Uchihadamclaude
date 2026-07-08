// Superfície de água dinâmica: segue o volume de cada célula do grid. Aparece
// só onde há água (alfa por vértice), com tom por profundidade, ondulação sutil
// e mapa de normais rolando. Atualizada todo frame a partir da simulação.
import * as THREE from 'three';
import { Grid, N } from '../sim/grid';
import { makeWaterNormal } from './textures';

const SHALLOW = new THREE.Color('#8fe4d6');
const DEEP = new THREE.Color('#0e6f77');

export class WaterMesh {
  mesh: THREE.Mesh;
  private geo: THREE.BufferGeometry;
  private g: Grid;
  private normal: THREE.CanvasTexture;
  private baseXZ: Float32Array;

  constructor(g: Grid) {
    this.g = g;
    this.geo = new THREE.BufferGeometry();
    const verts = new Float32Array(N * N * 3);
    const colors = new Float32Array(N * N * 4);   // RGBA (alfa por vértice)
    const uvs = new Float32Array(N * N * 2);
    this.baseXZ = new Float32Array(N * N * 2);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i; const [x, z] = g.cellToWorld(i, j);
      verts[k * 3] = x; verts[k * 3 + 2] = z;
      this.baseXZ[k * 2] = x; this.baseXZ[k * 2 + 1] = z;
      uvs[k * 2] = i / N * 7; uvs[k * 2 + 1] = j / N * 7;
    }
    const idx: number[] = [];
    for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
      const a = j * N + i, b = j * N + i + 1, c = (j + 1) * N + i, d = (j + 1) * N + i + 1;
      idx.push(a, c, b, b, c, d);
    }
    this.geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    this.geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geo.setIndex(idx);
    this.geo.computeVertexNormals();

    this.normal = makeWaterNormal();
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, transparent: true, roughness: 0.12, metalness: 0.0,
      normalMap: this.normal, normalScale: new THREE.Vector2(0.4, 0.4),
      emissive: new THREE.Color('#0b535c'), emissiveIntensity: 0.2, depthWrite: false,
    });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.receiveShadow = true;
    this.mesh.renderOrder = 2;
  }

  update(t: number, speed: number): void {
    const g = this.g;
    const pos = this.geo.attributes.position as THREE.BufferAttribute;
    const col = this.geo.attributes.color as THREE.BufferAttribute;
    const P = pos.array as Float32Array, C = col.array as Float32Array;
    const c = new THREE.Color();
    for (let k = 0; k < N * N; k++) {
      const w = g.water[k];
      const x = this.baseXZ[k * 2], z = this.baseXZ[k * 2 + 1];
      const ripple = Math.sin(x * 1.7 + t * 1.6 * speed) * 0.016 + Math.sin(z * 2.2 - t * 1.2 * speed) * 0.013;
      P[k * 3 + 1] = g.terrain[k] + Math.max(w, 0) + ripple;
      const a = THREE.MathUtils.smoothstep(w, 0.006, 0.06);   // alfa some quando seca
      const depth = THREE.MathUtils.clamp(w / 0.5, 0, 1);
      c.copy(SHALLOW).lerp(DEEP, depth);
      C[k * 4] = c.r; C[k * 4 + 1] = c.g; C[k * 4 + 2] = c.b; C[k * 4 + 3] = a * 0.9;
    }
    pos.needsUpdate = true; col.needsUpdate = true;
    this.normal.offset.x = (t * 0.02 * speed) % 1;
    this.normal.offset.y = (t * 0.016 * speed) % 1;
  }
}
