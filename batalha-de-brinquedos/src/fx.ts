// ---------------------------------------------------------------------------
// EFEITOS — partículas do capricho: poof de fumaça, faísca estrela no impacto,
// moedinhas pulando da vítima, anel de spawn, confete da vitória, poeirinha
// dos passos. Pools simples de meshes (contagens pequenas, zero alocação por
// frame depois de aquecido).
// ---------------------------------------------------------------------------
import * as THREE from 'three';

interface P { m: THREE.Mesh; vx: number; vy: number; vz: number; t: number; life: number; spin: number; grav: number; grow: number; }

export class FX {
  group = new THREE.Group();
  private parts: P[] = [];
  private free: THREE.Mesh[] = [];
  private starTex: THREE.Texture;

  constructor(scene: THREE.Scene) {
    scene.add(this.group);
    const cv = document.createElement('canvas'); cv.width = cv.height = 64;
    const c = cv.getContext('2d')!;
    c.fillStyle = '#fff';
    c.beginPath();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 12 : 30; c.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r); }
    c.closePath(); c.fill();
    this.starTex = new THREE.CanvasTexture(cv);
  }

  private take(): THREE.Mesh {
    let m = this.free.pop();
    if (!m) {
      m = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }));
      m.renderOrder = 6;
    }
    (m.material as THREE.MeshBasicMaterial).map = null;
    m.visible = true; m.scale.setScalar(1); m.rotation.set(0, 0, 0);
    this.group.add(m);
    return m;
  }
  private emit(x: number, y: number, z: number, col: number | string, size: number, vx: number, vy: number, vz: number, life: number, grav = 160, grow = 0, spin = 0, star = false): void {
    const m = this.take();
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.color.set(col as any); mat.opacity = 1;
    if (star) { mat.map = this.starTex; }
    m.scale.setScalar(size);
    m.position.set(x, y, z);
    this.parts.push({ m, vx, vy, vz, t: 0, life, spin, grav, grow });
  }

  puff(x: number, y: number, z: number, col: number | string = 0xf5ecd8, n = 7, size = 4): void {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.28;
      this.emit(x, y + Math.random() * 4, z, col, size * (0.7 + Math.random() * 0.7),
        Math.cos(a) * (14 + Math.random() * 26), 26 + Math.random() * 30, Math.sin(a) * (14 + Math.random() * 20),
        0.55 + Math.random() * 0.3, 40, 6);
    }
  }
  sparks(x: number, y: number, z: number, col: number | string = 0xffd76a, n = 6): void {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.28;
      this.emit(x, y, z, col, 1.6 + Math.random() * 1.6,
        Math.cos(a) * (46 + Math.random() * 60), 40 + Math.random() * 60, Math.sin(a) * 40,
        0.32 + Math.random() * 0.2, 300);
    }
  }
  hitStar(x: number, y: number, z: number): void {
    const m = this.take();
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.color.set(0xfff2c0); mat.opacity = 1; mat.map = null;
    m.position.set(x, y, z);
    this.parts.push({ m, vx: 0, vy: 6, vz: 0, t: 0, life: 0.22, spin: 6, grav: 0, grow: 46 });
  }
  coins(x: number, y: number, z: number, n = 4): void {
    for (let i = 0; i < n; i++) {
      this.emit(x, y + 6, z, 0xf2b13d, 2.6, (Math.random() - 0.5) * 46, 78 + Math.random() * 46, (Math.random() - 0.5) * 30,
        0.62, 260, 0, 9);
    }
  }
  confetti(x: number, z: number): void {
    const cols = [0xff6a8a, 0x6ab04c, 0x5a9ae8, 0xf2b13d, 0xa06ee8, 0x54d8d8];
    for (let i = 0; i < 90; i++) {
      this.emit(x + (Math.random() - 0.5) * 240, 150 + Math.random() * 120, z + (Math.random() - 0.5) * 160,
        cols[i % cols.length], 2.6 + Math.random() * 2,
        (Math.random() - 0.5) * 40, -20 - Math.random() * 30, (Math.random() - 0.5) * 40,
        2.6 + Math.random() * 1.2, 26, 0, 4 + Math.random() * 6);
    }
  }
  dust(x: number, z: number, n = 3): void {
    for (let i = 0; i < n; i++) {
      this.emit(x - 6 + Math.random() * 4, 2, z + (Math.random() - 0.5) * 10, 0xd8c4a0, 2 + Math.random() * 2,
        -14 - Math.random() * 12, 10 + Math.random() * 10, (Math.random() - 0.5) * 12, 0.4, 30, 5);
    }
  }

  update(dt: number): void {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i]; p.t += dt;
      if (p.t >= p.life) {
        p.m.visible = false; this.group.remove(p.m); this.free.push(p.m);
        this.parts.splice(i, 1); continue;
      }
      p.vy -= p.grav * dt;
      p.m.position.x += p.vx * dt; p.m.position.y += p.vy * dt; p.m.position.z += p.vz * dt;
      if (p.m.position.y < 1.5) { p.m.position.y = 1.5; p.vy *= -0.35; p.vx *= 0.7; }
      const k = p.t / p.life;
      (p.m.material as THREE.MeshBasicMaterial).opacity = 1 - k * k;
      if (p.grow) p.m.scale.addScalar(p.grow * dt);
      if (p.spin) { p.m.rotation.z += p.spin * dt; p.m.rotation.x += p.spin * 0.6 * dt; }
    }
  }
}
