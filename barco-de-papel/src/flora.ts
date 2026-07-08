// Objetos naturais do oásis: pedras, conchas, bambus (canalização), palmeiras
// (que fazem sombra sobre a água) e a casca de coco (ferramenta de escavar).
// Todos com materiais naturais e sombras ativas.
import * as THREE from 'three';
import { Terrain, OASIS } from './terrain';
import { makePalmLeaf } from './textures';

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function stoneMat(tint = 0): THREE.MeshStandardMaterial {
  const base = new THREE.Color('#b7a888').offsetHSL(0, tint, 0);
  return new THREE.MeshStandardMaterial({ color: base, roughness: 0.95, metalness: 0.0, flatShading: true });
}

function makeStone(size: number): THREE.Mesh {
  const geo = new THREE.DodecahedronGeometry(size, 0);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) { // deforma p/ parecer rocha lascada
    pos.setXYZ(i, pos.getX(i) * rnd(0.8, 1.2), pos.getY(i) * rnd(0.6, 0.9), pos.getZ(i) * rnd(0.8, 1.2));
  }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, stoneMat(rnd(-0.03, 0.03)));
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

function makeShell(): THREE.Group {
  const g = new THREE.Group();
  // domo estriado (concha)
  const geo = new THREE.SphereGeometry(0.14, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
  geo.scale(1, 0.5, 1);
  const mat = new THREE.MeshStandardMaterial({ color: '#f3e4cf', roughness: 0.6, metalness: 0.0, flatShading: true, side: THREE.DoubleSide });
  const dome = new THREE.Mesh(geo, mat); dome.castShadow = true;
  g.add(dome);
  return g;
}

function makeBamboo(len: number): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: '#a7b56a', roughness: 0.7, metalness: 0.0 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, len, 10), mat);
  pole.castShadow = true; pole.receiveShadow = true;
  g.add(pole);
  const ringMat = new THREE.MeshStandardMaterial({ color: '#6f7d3a', roughness: 0.7 });
  const nodes = Math.max(2, Math.round(len / 0.55));
  for (let i = 1; i < nodes; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 6, 12), ringMat);
    ring.rotation.x = Math.PI / 2; ring.position.y = -len / 2 + (i / nodes) * len;
    g.add(ring);
  }
  return g;
}

function makePalm(leaf: THREE.Texture, height: number): THREE.Group {
  const g = new THREE.Group();
  // tronco em segmentos anelados
  const trunkMat = new THREE.MeshStandardMaterial({ color: '#8a6438', roughness: 0.9, metalness: 0.0, flatShading: true });
  const segs = Math.round(height / 0.5);
  for (let i = 0; i < segs; i++) {
    const r = 0.16 - (i / segs) * 0.05;
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.92, r, 0.5, 8), trunkMat);
    seg.position.y = 0.25 + i * 0.5;
    seg.position.x = Math.sin(i * 0.5) * 0.08 + i * 0.06;   // leve curvatura
    seg.castShadow = true; seg.receiveShadow = true;
    g.add(seg);
  }
  const topX = segs * 0.06 + Math.sin(segs * 0.5) * 0.08, topY = 0.25 + segs * 0.5;
  // coroa de folhas
  const leafMat = new THREE.MeshStandardMaterial({ map: leaf, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.8, metalness: 0 });
  const crown = new THREE.Group(); crown.position.set(topX, topY, 0);
  for (let i = 0; i < 9; i++) {
    const frond = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1.9), leafMat);
    frond.castShadow = true;
    const a = (i / 9) * Math.PI * 2 + 0.2;
    frond.rotation.order = 'YXZ';
    frond.rotation.y = a;
    frond.rotation.z = -0.62 - Math.random() * 0.22;   // caídas
    frond.position.set(Math.cos(a) * 1.35, 0.15, Math.sin(a) * 1.35);
    crown.add(frond);
  }
  // cocos
  const cocoMat = new THREE.MeshStandardMaterial({ color: '#6b4a26', roughness: 0.8 });
  for (let i = 0; i < 3; i++) { const co = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), cocoMat); co.position.set(Math.cos(i * 2) * 0.2, -0.1, Math.sin(i * 2) * 0.2); co.castShadow = true; crown.add(co); }
  g.add(crown);
  return g;
}

function makeCoconutTool(): THREE.Group {
  const g = new THREE.Group();
  const outer = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({ color: '#7a5230', roughness: 1.0, flatShading: true }));
  outer.rotation.x = Math.PI; outer.castShadow = true; outer.receiveShadow = true;
  const inner = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
    new THREE.MeshStandardMaterial({ color: '#d8c39a', roughness: 0.7, side: THREE.DoubleSide }));
  inner.rotation.x = Math.PI; inner.position.y = 0.02;
  g.add(outer, inner);
  return g;
}

// planta uma cópia no terreno (assenta na altura e gira aleatório)
function seat(obj: THREE.Object3D, terrain: Terrain, x: number, z: number, yaw = Math.random() * 6.28, yOff = 0): void {
  obj.position.set(x, terrain.heightAt(x, z) + yOff, z);
  obj.rotation.y = yaw;
}

export function buildFlora(terrain: Terrain): THREE.Group {
  const group = new THREE.Group();
  const leaf = makePalmLeaf();

  // --- palmeiras (fazem sombra sobre a água) ---
  const palmA = makePalm(leaf, 3.6); seat(palmA, terrain, OASIS.x - 2.6, OASIS.z - 1.6, 0.6); group.add(palmA);
  const palmB = makePalm(leaf, 2.7); seat(palmB, terrain, OASIS.x - 1.4, OASIS.z + 2.8, -0.8); group.add(palmB);

  // --- pedras ao redor da bacia e margens do canal ---
  const stoneSpots: [number, number, number][] = [
    [OASIS.x + 2.9, OASIS.z - 1.2, 0.5], [OASIS.x + 1.0, OASIS.z + 3.0, 0.42], [OASIS.x - 2.8, OASIS.z + 1.6, 0.6],
    [OASIS.x + 2.0, OASIS.z + 2.2, 0.34], [1.2, -2.0, 0.4], [3.4, -1.2, 0.5], [5.4, -0.4, 0.36],
    [6.8, 0.8, 0.46], [2.2, -3.4, 0.3], [OASIS.x - 0.4, OASIS.z - 3.0, 0.4],
  ];
  for (const [x, z, s] of stoneSpots) { const st = makeStone(s); seat(st, terrain, x, z, undefined, s * 0.3); group.add(st); }

  // --- conchas perto da água ---
  const shellSpots: [number, number][] = [
    [OASIS.x + 2.4, OASIS.z + 1.0], [OASIS.x - 1.6, OASIS.z - 2.4], [1.8, -1.4], [4.4, -0.2], [6.0, 1.2], [OASIS.x + 0.6, OASIS.z + 2.8],
  ];
  for (const [x, z] of shellSpots) { const sh = makeShell(); seat(sh, terrain, x, z, Math.random() * 6.28, 0.02); group.add(sh); }

  // --- bambus (canalização) ao longo do canal ---
  const b1 = makeBamboo(2.6); seat(b1, terrain, 2.6, -2.4, 0, 0.1); b1.rotation.z = Math.PI / 2; b1.rotation.y = 0.5; group.add(b1);
  const b2 = makeBamboo(2.2); seat(b2, terrain, 4.6, -0.9, 0, 0.1); b2.rotation.z = Math.PI / 2; b2.rotation.y = 0.15; group.add(b2);
  const b3 = makeBamboo(2.0); seat(b3, terrain, 6.4, 0.3, 0, 0.1); b3.rotation.z = Math.PI / 2; b3.rotation.y = -0.1; group.add(b3);

  // --- casca de coco (ferramenta de escavar) na margem ---
  const coco = makeCoconutTool(); seat(coco, terrain, OASIS.x + 2.2, OASIS.z + 2.9, 0.4, 0.05); group.add(coco);

  return group;
}
