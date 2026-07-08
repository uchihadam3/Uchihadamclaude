// Malha de terreno gerada da heightmap do grid. Remesh só quando o terreno muda
// (g.dirty). Um vértice por célula; cor por altura (secos claros) + tinta para
// bambu/pedra. Preparada para chunking futuro (o rebuild é O(N²) mas isolável).
import * as THREE from 'three';
import { Grid, N, SOLID_BAMBOO, SOLID_STONE } from '../sim/grid';
import { makeSandTexture, makeSandBump } from './textures';

export class TerrainMesh {
  mesh: THREE.Mesh;
  private geo: THREE.BufferGeometry;
  private g: Grid;

  constructor(g: Grid) {
    this.g = g;
    this.geo = new THREE.BufferGeometry();
    const verts = new Float32Array(N * N * 3);
    const colors = new Float32Array(N * N * 3);
    const uvs = new Float32Array(N * N * 2);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i; const [x, z] = g.cellToWorld(i, j);
      verts[k * 3] = x; verts[k * 3 + 2] = z;
      uvs[k * 2] = i / N * 8; uvs[k * 2 + 1] = j / N * 8;
    }
    const idx: number[] = [];
    for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
      const a = j * N + i, b = j * N + i + 1, c = (j + 1) * N + i, d = (j + 1) * N + i + 1;
      idx.push(a, c, b, b, c, d);
    }
    this.geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geo.setIndex(idx);
    const mat = new THREE.MeshStandardMaterial({
      map: makeSandTexture(), bumpMap: makeSandBump(), bumpScale: 0.05,
      vertexColors: true, roughness: 0.97, metalness: 0.0,
    });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.receiveShadow = true;
    this.refresh();
  }

  refresh(): void {
    const g = this.g;
    const pos = this.geo.attributes.position as THREE.BufferAttribute;
    const col = this.geo.attributes.color as THREE.BufferAttribute;
    const P = pos.array as Float32Array, C = col.array as Float32Array;
    for (let k = 0; k < N * N; k++) {
      const h = g.terrain[k]; P[k * 3 + 1] = h;
      // relevo: vales quentes/escuros, cristas pálidas → dunas legíveis
      const t = THREE.MathUtils.clamp((h - 0.6) / 2.6, 0, 1);
      let r = 0.9 + t * 0.24, gg = 0.86 + t * 0.22, b = 0.72 + t * 0.18;
      if (g.solid[k] === SOLID_BAMBOO) { r *= 0.82; gg *= 0.98; b *= 0.7; }
      else if (g.solid[k] === SOLID_STONE) { r *= 0.88; gg *= 0.9; b *= 0.86; }
      C[k * 3] = r; C[k * 3 + 1] = gg; C[k * 3 + 2] = b;
    }
    pos.needsUpdate = true; col.needsUpdate = true;
    this.geo.computeVertexNormals();
    this.geo.computeBoundingSphere();
    g.dirty = false;
  }
}
