// Água do oásis: uma superfície que existe apenas onde o leito foi escavado
// (segue o formato do canal e da bacia). Levemente translúcida, azul-esverdeada,
// com tom por profundidade, ondulação sutil e mapa de normais rolando.
import * as THREE from 'three';
import { Terrain, SIZE, WATER_LEVEL } from './terrain';
import { makeWaterNormal } from './textures';

const WSEG = 140;

export class Water {
  mesh: THREE.Mesh;
  private mat: THREE.MeshStandardMaterial;
  private normal: THREE.CanvasTexture;
  private base: Float32Array;      // x,z de cada vértice (para ondular)
  private posAttr: THREE.BufferAttribute;

  constructor(terrain: Terrain) {
    const step = SIZE / WSEG;
    const idxOf = new Map<number, number>();
    const verts: number[] = [], colors: number[] = [], uvs: number[] = [];
    const baseXZ: number[] = [];
    const key = (i: number, j: number) => i * (WSEG + 2) + j;

    const wetV = (i: number, j: number) => {
      const x = -SIZE / 2 + i * step, z = -SIZE / 2 + j * step;
      return terrain.carveAt(x, z);
    };
    const addVert = (i: number, j: number) => {
      const k = key(i, j);
      if (idxOf.has(k)) return idxOf.get(k)!;
      const x = -SIZE / 2 + i * step, z = -SIZE / 2 + j * step;
      const depth = Math.max(0, WATER_LEVEL - terrain.heightAt(x, z));
      const t = THREE.MathUtils.clamp(depth / 0.55, 0, 1);   // 0 raso → 1 fundo
      // raso: água clara turquesa; fundo: verde-azulado profundo
      const shallow = new THREE.Color('#7fded0'), deep = new THREE.Color('#0e6f73');
      const c = shallow.clone().lerp(deep, t);
      const id = verts.length / 3;
      verts.push(x, WATER_LEVEL, z);
      colors.push(c.r, c.g, c.b);
      uvs.push((x + SIZE / 2) / SIZE * 6, (z + SIZE / 2) / SIZE * 6);
      baseXZ.push(x, z);
      idxOf.set(k, id);
      return id;
    };

    const indices: number[] = [];
    for (let i = 0; i < WSEG; i++) for (let j = 0; j < WSEG; j++) {
      // célula é "água" se a maioria dos cantos está no leito
      const w = (wetV(i, j) + wetV(i + 1, j) + wetV(i, j + 1) + wetV(i + 1, j + 1)) / 4;
      if (w < 0.16) continue;
      const a = addVert(i, j), b = addVert(i + 1, j), c = addVert(i, j + 1), d = addVert(i + 1, j + 1);
      indices.push(a, c, b, b, c, d);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    this.base = new Float32Array(baseXZ);
    this.posAttr = geo.attributes.position as THREE.BufferAttribute;

    this.normal = makeWaterNormal();
    this.mat = new THREE.MeshStandardMaterial({
      vertexColors: true, transparent: true, opacity: 0.86,
      roughness: 0.12, metalness: 0.0,
      normalMap: this.normal, normalScale: new THREE.Vector2(0.35, 0.35),
      emissive: new THREE.Color('#0b4f57'), emissiveIntensity: 0.18,
    });
    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.renderOrder = 2;
  }

  // ondulação sutil + rolagem do mapa de normais. speed maior na "Execução".
  update(t: number, speed: number): void {
    for (let v = 0; v < this.base.length / 2; v++) {
      const x = this.base[v * 2], z = this.base[v * 2 + 1];
      const y = WATER_LEVEL
        + Math.sin(x * 1.6 + t * 1.4 * speed) * 0.018
        + Math.sin(z * 2.1 - t * 1.1 * speed) * 0.015
        + Math.sin((x + z) * 1.1 + t * 0.8 * speed) * 0.01;
      this.posAttr.setY(v, y);
    }
    this.posAttr.needsUpdate = true;
    this.normal.offset.x = (t * 0.02 * speed) % 1;
    this.normal.offset.y = (t * 0.015 * speed) % 1;
  }
}
