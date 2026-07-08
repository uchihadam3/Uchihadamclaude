// Partículas leves (Points) para respingos do barco, brilho de vitória e
// borbulha da nascente. Buffer fixo, sem alocação por frame.
import * as THREE from 'three';

interface P { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; max: number; r: number; g: number; b: number; sz: number; }

export class FX {
  points: THREE.Points;
  private pool: P[] = []; private MAX = 600;
  private pos: Float32Array; private col: Float32Array; private siz: Float32Array;

  constructor() {
    this.pos = new Float32Array(this.MAX * 3);
    this.col = new Float32Array(this.MAX * 3);
    this.siz = new Float32Array(this.MAX);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(this.siz, 1));
    const mat = new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    this.points = new THREE.Points(geo, mat); this.points.frustumCulled = false; this.points.renderOrder = 6;
  }

  private emit(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, r: number, g: number, b: number): void {
    if (this.pool.length >= this.MAX) return;
    this.pool.push({ x, y, z, vx, vy, vz, life, max: life, r, g, b, sz: 1 });
  }
  splash(x: number, y: number, z: number, n = 10): void {
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, s = 1 + Math.random() * 2.5; this.emit(x, y, z, Math.cos(a) * s, 2 + Math.random() * 3, Math.sin(a) * s, 0.5 + Math.random() * 0.3, 0.75, 0.95, 1.0); }
  }
  sparkle(x: number, y: number, z: number, n = 24): void {
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, s = 1 + Math.random() * 3; this.emit(x, y + Math.random(), z, Math.cos(a) * s, 1 + Math.random() * 4, Math.sin(a) * s, 0.7 + Math.random() * 0.6, 1.0, 0.86, 0.4); }
  }
  bubble(x: number, y: number, z: number): void {
    this.emit(x, y, z, (Math.random() - 0.5) * 0.6, 0.6 + Math.random(), (Math.random() - 0.5) * 0.6, 0.6, 0.7, 0.95, 1.0);
  }

  update(dt: number): void {
    for (let i = this.pool.length - 1; i >= 0; i--) {
      const p = this.pool[i]; p.life -= dt; if (p.life <= 0) { this.pool.splice(i, 1); continue; }
      p.vy -= 6 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    }
    for (let i = 0; i < this.MAX; i++) {
      if (i < this.pool.length) {
        const p = this.pool[i]; const f = p.life / p.max;
        this.pos[i * 3] = p.x; this.pos[i * 3 + 1] = p.y; this.pos[i * 3 + 2] = p.z;
        this.col[i * 3] = p.r * f; this.col[i * 3 + 1] = p.g * f; this.col[i * 3 + 2] = p.b * f;
        this.siz[i] = f;
      } else { this.pos[i * 3 + 1] = -999; this.col[i * 3] = this.col[i * 3 + 1] = this.col[i * 3 + 2] = 0; }
    }
    const g = this.points.geometry;
    (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (g.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }
}
