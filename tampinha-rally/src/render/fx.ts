// Efeitos: partículas (poeira, impacto, confete), rastro no chão e o indicador
// de mira (seta + força + linha de estilingue). Leve e satisfatório.
import * as THREE from 'three';

function sprite(): THREE.Texture {
  const S = 64; const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!;
  const g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.6, 'rgba(255,255,255,0.6)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g; c.fillRect(0, 0, S, S);
  const t = new THREE.CanvasTexture(cv); return t;
}

interface P { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; max: number; size: number; grav: number; r: number; g: number; b: number; }

export class Particles {
  points: THREE.Points;
  private cap = 700;
  private ps: P[] = [];
  private pos: Float32Array; private col: Float32Array; private siz: Float32Array;
  constructor() {
    const geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(this.cap * 3); this.col = new Float32Array(this.cap * 3); this.siz = new Float32Array(this.cap);
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(this.siz, 1));
    const mat = new THREE.PointsMaterial({ size: 0.6, map: sprite(), vertexColors: true, transparent: true, depthWrite: false, sizeAttenuation: true, blending: THREE.NormalBlending });
    this.points = new THREE.Points(geo, mat); this.points.frustumCulled = false;
  }
  private emit(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, size: number, grav: number, col: THREE.Color) {
    if (this.ps.length >= this.cap) this.ps.shift();
    this.ps.push({ x, y, z, vx, vy, vz, life, max: life, size, grav, r: col.r, g: col.g, b: col.b });
  }
  dust(x: number, z: number, amt = 6, tint = '#d8c090') {
    const col = new THREE.Color(tint);
    for (let i = 0; i < amt; i++) this.emit(x, 0.1, z, (Math.random() - 0.5) * 2, Math.random() * 1.5 + 0.5, (Math.random() - 0.5) * 2, 0.5 + Math.random() * 0.4, 0.6 + Math.random() * 0.5, -1.2, col);
  }
  impact(x: number, z: number, power: number, tint = '#fff4d0') {
    const col = new THREE.Color(tint); const n = Math.min(18, 5 + power);
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, s = 2 + Math.random() * power * 0.5; this.emit(x, 0.3, z, Math.cos(a) * s, 1 + Math.random() * 2, Math.sin(a) * s, 0.35 + Math.random() * 0.3, 0.35, -3, col); }
  }
  skid(x: number, z: number) { this.emit(x, 0.05, z, 0, 0, 0, 0.9, 0.5, 0, new THREE.Color('#00000022')); }
  confetti(cx: number, cz: number) {
    const cols = ['#e5484d', '#3b82f6', '#3fae6a', '#f7d046', '#f59e0b', '#7c3aed', '#ffffff'];
    for (let i = 0; i < 160; i++) { const col = new THREE.Color(cols[i % cols.length]); this.emit(cx + (Math.random() - 0.5) * 20, 14 + Math.random() * 6, cz + (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 3, -2 - Math.random() * 2, (Math.random() - 0.5) * 3, 2.4 + Math.random() * 1.5, 0.7, -0.6, col); }
  }
  update(dt: number) {
    for (let i = this.ps.length - 1; i >= 0; i--) {
      const p = this.ps[i]; p.life -= dt; if (p.life <= 0) { this.ps.splice(i, 1); continue; }
      p.vy += p.grav * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      if (p.y < 0.02) { p.y = 0.02; p.vy = 0; p.vx *= 0.7; p.vz *= 0.7; }
    }
    const n = Math.min(this.ps.length, this.cap);
    for (let i = 0; i < n; i++) {
      const p = this.ps[i]; const f = p.life / p.max;
      this.pos[i * 3] = p.x; this.pos[i * 3 + 1] = p.y; this.pos[i * 3 + 2] = p.z;
      this.col[i * 3] = p.r; this.col[i * 3 + 1] = p.g; this.col[i * 3 + 2] = p.b;
      this.siz[i] = p.size * f;
    }
    for (let i = n; i < this.cap; i++) this.siz[i] = 0;
    const g = this.points.geometry;
    (g.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (g.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
    (g.getAttribute('size') as THREE.BufferAttribute).needsUpdate = true;
  }
}

// ---- indicador de mira ----
export class Aim {
  group = new THREE.Group();
  private shaft: THREE.Mesh; private head: THREE.Mesh; private ring: THREE.Mesh; private pull: THREE.Line;
  private mat: THREE.MeshBasicMaterial;
  constructor() {
    this.mat = new THREE.MeshBasicMaterial({ color: 0x33cc55, transparent: true, opacity: 0.9 });
    this.shaft = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.5), this.mat); this.shaft.rotation.x = -Math.PI / 2;
    this.head = new THREE.Mesh(new THREE.CircleGeometry(0.9, 3), this.mat); this.head.rotation.x = -Math.PI / 2;
    this.ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 8, 28), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
    this.ring.rotation.x = -Math.PI / 2;
    const pmat = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.4, gapSize: 0.3, transparent: true, opacity: 0.7 });
    const pgeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    this.pull = new THREE.Line(pgeo, pmat); this.pull.computeLineDistances();
    this.group.add(this.shaft, this.head, this.ring, this.pull);
    this.group.visible = false;
  }
  set(fromX: number, fromZ: number, dirX: number, dirZ: number, power: number): void {
    this.group.visible = true;
    const ang = Math.atan2(dirZ, dirX);
    const L = 2 + power * 12;
    const col = new THREE.Color().setHSL(0.33 * (1 - power), 0.75, 0.5); this.mat.color.copy(col);
    this.shaft.position.set(fromX + Math.cos(ang) * (L / 2 + 1.1), 0.12, fromZ + Math.sin(ang) * (L / 2 + 1.1));
    this.shaft.scale.set(L, 1, 1); this.shaft.rotation.z = 0; this.shaft.rotation.y = 0;
    this.shaft.rotation.set(-Math.PI / 2, 0, -ang);
    this.head.position.set(fromX + Math.cos(ang) * (L + 1.4), 0.12, fromZ + Math.sin(ang) * (L + 1.4));
    this.head.rotation.set(-Math.PI / 2, 0, -ang - Math.PI / 2);
    this.head.scale.setScalar(0.7 + power * 0.6);
    this.ring.position.set(fromX, 0.1, fromZ);
    const pts = [new THREE.Vector3(fromX, 0.15, fromZ), new THREE.Vector3(fromX - Math.cos(ang) * L * 0.6, 0.15, fromZ - Math.sin(ang) * L * 0.6)];
    this.pull.geometry.setFromPoints(pts); this.pull.computeLineDistances();
  }
  hide(): void { this.group.visible = false; }
}
