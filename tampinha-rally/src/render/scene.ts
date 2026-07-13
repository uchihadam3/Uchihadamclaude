// Renderer, cena e câmera isométrica (ortográfica, inclinada tipo maquete).
// A câmera segue suavemente um alvo (a tampinha ativa) e dá zoom/gira leve.
import * as THREE from 'three';

export function makeRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true });
  r.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  r.outputColorSpace = THREE.SRGBColorSpace;
  return r;
}

// CLIMA/HORA: tinge o céu e a luz da corrida — tarde dourada, noitinha azulada,
// chuva acinzentada. Só visual; a física do clima (vento/poças) vive no engine.
export type SceneMood = 'sol' | 'tarde' | 'noite' | 'vento' | 'chuva';
const tint = (bg: string, to: string, k: number): THREE.Color => new THREE.Color(bg).lerp(new THREE.Color(to), k);

export function makeScene(bg: string, mood: SceneMood = 'sol'): THREE.Scene {
  const s = new THREE.Scene();
  const col = mood === 'tarde' ? tint(bg, '#ff8a3c', 0.22)
    : mood === 'noite' ? tint(bg, '#0c1430', 0.55)
    : mood === 'chuva' ? tint(bg, '#5a6a78', 0.30) : new THREE.Color(bg);
  s.background = col;
  s.fog = new THREE.Fog(col.clone(), 90, 200);
  const hemi = mood === 'noite' ? 0.42 : mood === 'chuva' ? 0.6 : 0.72;
  s.add(new THREE.HemisphereLight(mood === 'noite' ? 0xa8c0ff : 0xffffff, 0x8a7a5a, hemi));
  s.add(new THREE.AmbientLight(mood === 'noite' ? 0x4a5a80 : 0x707070, mood === 'noite' ? 0.5 : 0.35));
  return s;
}

export function makeSun(scene: THREE.Scene, w: number, h: number, mood: SceneMood = 'sol'): THREE.DirectionalLight {
  const cfg = mood === 'tarde' ? { c: 0xffb060, i: 1.4, y: 22, ox: -34 }     // sol baixo: sombras longas e douradas
    : mood === 'noite' ? { c: 0x9db4ff, i: 0.85, y: 40, ox: -18 }            // lua: luz fria
    : mood === 'chuva' ? { c: 0xcdd8e2, i: 1.05, y: 46, ox: -22 }            // céu fechado: luz difusa
    : { c: 0xfff3d8, i: 1.65, y: 46, ox: -22 };
  const sun = new THREE.DirectionalLight(cfg.c, cfg.i);
  sun.position.set(w * 0.5 + cfg.ox, cfg.y, h * 0.5 - 30); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const c = sun.shadow.camera; const R = Math.max(w, h) * 0.62;
  c.left = -R; c.right = R; c.top = R; c.bottom = -R; c.near = 1; c.far = 160;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04; sun.shadow.radius = 5;
  sun.target.position.set(w * 0.5, 0, h * 0.5);
  scene.add(sun, sun.target);
  return sun;
}

export class CameraRig {
  camera: THREE.OrthographicCamera;
  target = new THREE.Vector3();
  goalTarget = new THREE.Vector3();
  frustum = 20;
  az = 0;               // largada perto da câmera (embaixo), chegada ao fundo (topo)
  pol = 0.6;            // inclinação (0=topo, ~1=rasante)
  private dist = 80;
  private bw: number; private bh: number;

  constructor(w: number, h: number) {
    this.bw = w; this.bh = h;
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -60, 300);
    this.target.set(w / 2, 0, h / 2); this.goalTarget.copy(this.target);
    this.place();
  }
  place(): void {
    const s = Math.sin(this.pol) * this.dist, y = Math.cos(this.pol) * this.dist;
    this.camera.position.set(this.target.x + s * Math.sin(this.az), this.target.y + y, this.target.z + s * Math.cos(this.az));
    this.camera.up.set(0, 1, 0); this.camera.lookAt(this.target);
  }
  resize(w: number, h: number): void {
    const a = w / h, f = this.frustum;
    this.camera.left = -f * a; this.camera.right = f * a; this.camera.top = f; this.camera.bottom = -f;
    this.camera.updateProjectionMatrix();
  }
  follow(x: number, z: number): void {
    const mx = Math.min(this.bw * 0.28, 9), mz = Math.min(this.bh * 0.22, 11);
    this.goalTarget.set(THREE.MathUtils.clamp(x, mx, this.bw - mx), 0, THREE.MathUtils.clamp(z, mz, this.bh - mz));
  }
  setFrustum(f: number, w: number, h: number): void { this.frustum = THREE.MathUtils.clamp(f, 9, 34); this.resize(w, h); }
  zoomBy(m: number, w: number, h: number): void { this.setFrustum(this.frustum * m, w, h); }
  rotate(dx: number): void { this.az -= dx * 0.005; this.place(); }
  tilt(dy: number): void { this.pol = THREE.MathUtils.clamp(this.pol - dy * 0.004, 0.18, 1.05); this.place(); }
  update(dt: number): void {
    this.target.lerp(this.goalTarget, Math.min(1, dt * 3.2));
    this.place();
  }
}
