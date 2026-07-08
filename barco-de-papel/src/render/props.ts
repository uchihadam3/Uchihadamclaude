// Objetos 3D: barco de papel, palmeiras, canópias de sombra, e os "sólidos"
// pintados (bambu/pedra) via InstancedMesh, além dos marcadores de nascente e
// destino e o anel-guia do cursor.
import * as THREE from 'three';
import { Grid, N, SOLID_BAMBOO, SOLID_STONE } from '../sim/grid';
import { makePalmLeaf } from './textures';

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
function seedRand(seed: number): () => number { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// -------------------- barco de papel --------------------
function paperTexture(): THREE.CanvasTexture {
  const S = 128; const c = document.createElement('canvas'); c.width = c.height = S; const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#f6f0e2'; ctx.fillRect(0, 0, S, S);
  const im = ctx.getImageData(0, 0, S, S); const d = im.data;
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 10; d[i] += n; d[i + 1] += n; d[i + 2] += n - 2; }
  ctx.putImageData(im, 0, 0);
  ctx.strokeStyle = 'rgba(150,130,90,0.16)';
  for (let i = 0; i < 5; i++) { const y = Math.random() * S; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(S, y + (Math.random() - 0.5) * 20); ctx.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function makePaperBoat(): THREE.Mesh {
  const Ns = 20, M = 14; const verts: number[] = [], uvs: number[] = [];
  for (let n = 0; n <= Ns; n++) {
    const t = (n / Ns) * 2 - 1, x = t * 0.9, tip = Math.pow(Math.abs(t), 2.1);
    const halfW = 0.36 * (1 - 0.62 * tip), yB = 0.05 + 0.6 * tip, yR = 0.54 + 0.18 * tip;
    for (let m = 0; m <= M; m++) { const u = (m / M) * 2 - 1; verts.push(x, yB + u * u * (yR - yB), u * halfW); uvs.push(n / Ns, m / M); }
  }
  const idx: number[] = []; const at = (n: number, m: number) => n * (M + 1) + m;
  for (let n = 0; n < Ns; n++) for (let m = 0; m < M; m++) { const a = at(n, m), b = at(n + 1, m), c = at(n, m + 1), d = at(n + 1, m + 1); idx.push(a, c, b, b, c, d); }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geo.setIndex(idx); geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ map: paperTexture(), color: '#fbf6ea', roughness: 0.82, side: THREE.DoubleSide, flatShading: true });
  const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.scale.setScalar(1.15); return m;
}

// -------------------- palmeira (cenário) --------------------
export function makePalmTree(height: number, leaf: THREE.Texture): THREE.Group {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: '#8a6438', roughness: 0.9, flatShading: true });
  const segs = Math.round(height / 0.5);
  for (let i = 0; i < segs; i++) {
    const r = 0.16 - (i / segs) * 0.05; const seg = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.92, r, 0.5, 8), trunkMat);
    seg.position.set(Math.sin(i * 0.5) * 0.08 + i * 0.06, 0.25 + i * 0.5, 0); seg.castShadow = true; g.add(seg);
  }
  const topX = segs * 0.06 + Math.sin(segs * 0.5) * 0.08, topY = 0.25 + segs * 0.5;
  const leafMat = new THREE.MeshStandardMaterial({ map: leaf, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.8 });
  const crown = new THREE.Group(); crown.position.set(topX, topY, 0);
  for (let i = 0; i < 9; i++) { const f = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.8), leafMat); f.castShadow = true; const a = i / 9 * Math.PI * 2 + 0.2; f.rotation.order = 'YXZ'; f.rotation.y = a; f.rotation.z = -0.62 - Math.random() * 0.2; f.position.set(Math.cos(a) * 1.3, 0.14, Math.sin(a) * 1.3); crown.add(f); }
  const cocoMat = new THREE.MeshStandardMaterial({ color: '#6b4a26', roughness: 0.8 });
  for (let i = 0; i < 3; i++) { const co = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), cocoMat); co.position.set(Math.cos(i * 2) * 0.2, -0.1, Math.sin(i * 2) * 0.2); crown.add(co); }
  g.add(crown); return g;
}

// -------------------- canópia de sombra (ferramenta folha) --------------------
export function makeShadeCanopy(leaf: THREE.Texture): THREE.Group {
  const g = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.1, 6), new THREE.MeshStandardMaterial({ color: '#7a5a34', roughness: 0.9 }));
  stick.position.y = 0.55; stick.castShadow = true; g.add(stick);
  const leafMat = new THREE.MeshStandardMaterial({ map: leaf, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.85 });
  for (let i = 0; i < 6; i++) { const f = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.3), leafMat); f.castShadow = true; const a = i / 6 * Math.PI * 2; f.rotation.order = 'YXZ'; f.rotation.y = a; f.rotation.z = -0.34; f.position.set(Math.cos(a) * 0.8, 1.05, Math.sin(a) * 0.8); g.add(f); }
  return g;
}

// -------------------- sólidos pintados (bambu / pedra) --------------------
export class SolidsRenderer {
  group = new THREE.Group();
  private stones: THREE.InstancedMesh; private bamboo: THREE.InstancedMesh;
  private g: Grid; private dummy = new THREE.Object3D(); private MAX = 700;

  constructor(g: Grid) {
    this.g = g;
    const stGeo = new THREE.DodecahedronGeometry(0.34, 0);
    const sp = stGeo.attributes.position as THREE.BufferAttribute; const r = seedRand(7);
    for (let i = 0; i < sp.count; i++) sp.setXYZ(i, sp.getX(i) * (0.8 + r() * 0.4), sp.getY(i) * (0.6 + r() * 0.3), sp.getZ(i) * (0.8 + r() * 0.4));
    stGeo.computeVertexNormals();
    this.stones = new THREE.InstancedMesh(stGeo, new THREE.MeshStandardMaterial({ color: '#b3a486', roughness: 0.95, flatShading: true }), this.MAX);
    const bmGeo = new THREE.CapsuleGeometry(0.12, 0.44, 4, 8); bmGeo.rotateZ(Math.PI / 2);
    this.bamboo = new THREE.InstancedMesh(bmGeo, new THREE.MeshStandardMaterial({ color: '#9fb163', roughness: 0.7 }), this.MAX);
    this.stones.castShadow = this.stones.receiveShadow = true;
    this.bamboo.castShadow = this.bamboo.receiveShadow = true;
    this.stones.count = 0; this.bamboo.count = 0;
    this.group.add(this.stones, this.bamboo);
  }

  rebuild(): void {
    const g = this.g; let sc = 0, bc = 0;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i; const s = g.solid[k]; if (!s) continue;
      const [x, z] = g.cellToWorld(i, j); const y = g.terrain[k];
      const rr = seedRand(k * 2654435761);
      if (s === SOLID_STONE && sc < this.MAX) {
        this.dummy.position.set(x, y + 0.12, z); this.dummy.rotation.set(rr() * 3, rr() * 6, rr() * 3);
        this.dummy.scale.setScalar(0.7 + rr() * 0.5); this.dummy.updateMatrix(); this.stones.setMatrixAt(sc++, this.dummy.matrix);
      } else if (s === SOLID_BAMBOO && bc < this.MAX) {
        this.dummy.position.set(x, y + 0.13, z); this.dummy.rotation.set(0, rr() * 6, 0);
        this.dummy.scale.setScalar(0.9 + rr() * 0.25); this.dummy.updateMatrix(); this.bamboo.setMatrixAt(bc++, this.dummy.matrix);
      }
    }
    this.stones.count = sc; this.bamboo.count = bc;
    this.stones.instanceMatrix.needsUpdate = true; this.bamboo.instanceMatrix.needsUpdate = true;
  }
}

// -------------------- marcadores nascente / destino --------------------
export function makeSourceMarker(): THREE.Group {
  const g = new THREE.Group();
  const rockMat = new THREE.MeshStandardMaterial({ color: '#9c8f76', roughness: 0.95, flatShading: true });
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + Math.random() * 0.1, 0), rockMat); s.position.set(Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7); s.castShadow = true; g.add(s); }
  return g;
}
// CHEGADA — farol bem visível: anel pulsante no chão, facho de luz e bandeira.
export function makeGoalBeacon(): THREE.Group {
  const g = new THREE.Group();
  // anel no chão (pulsa)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.14, 10, 48),
    new THREE.MeshStandardMaterial({ color: '#f2e2b0', roughness: 0.7, emissive: '#37b06a', emissiveIntensity: 0.6 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.08; g.add(ring);
  // disco interno translúcido
  const disc = new THREE.Mesh(new THREE.CircleGeometry(1.6, 40),
    new THREE.MeshBasicMaterial({ color: '#7fe0a0', transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }));
  disc.rotation.x = -Math.PI / 2; disc.position.y = 0.05; g.add(disc);
  // facho de luz (cilindro aditivo, visível de longe)
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, 6, 16, 1, true),
    new THREE.MeshBasicMaterial({ color: '#8fffc0', transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  beam.position.y = 3; g.add(beam);
  // mastro + bandeira (fibra + folha)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 2.4, 6), new THREE.MeshStandardMaterial({ color: '#7a5a34', roughness: 0.9 }));
  pole.position.y = 1.2; pole.castShadow = true; g.add(pole);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.62), new THREE.MeshStandardMaterial({ color: '#e0b84a', roughness: 0.75, side: THREE.DoubleSide, emissive: '#a07a10', emissiveIntensity: 0.2 }));
  flag.position.set(0.52, 2.1, 0); g.add(flag);
  g.userData = { ring, beam, flag };
  return g;
}

// INÍCIO — anel de fibra ao redor do barco de largada.
export function makeStartRing(): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.1, 8, 40),
    new THREE.MeshStandardMaterial({ color: '#eadfc2', roughness: 0.8, emissive: '#c88a2a', emissiveIntensity: 0.3 }));
  m.rotation.x = Math.PI / 2; m.position.y = 0.06; return m;
}
export function makeBrushRing(): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.72, 40), new THREE.MeshBasicMaterial({ color: '#fff2cc', transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = 5; return m;
}
