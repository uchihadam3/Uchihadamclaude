// Renderer, cena (céu quente + neblina), luz de deserto com sombras suaves e um
// rig de câmera isométrica ortográfica com pan e zoom limitados.
import * as THREE from 'three';
import { WORLD } from '../sim/grid';
import { makeSkyTexture } from './textures';

export function makeRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true });
  r.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.06;
  r.outputColorSpace = THREE.SRGBColorSpace;
  return r;
}

export function makeScene(): THREE.Scene {
  const s = new THREE.Scene();
  s.background = makeSkyTexture();
  s.fog = new THREE.FogExp2(new THREE.Color('#ecd6ad'), 0.010);
  s.add(new THREE.HemisphereLight(new THREE.Color('#ffe9c4'), new THREE.Color('#b0824c'), 0.55));
  s.add(new THREE.AmbientLight(new THREE.Color('#6a5636'), 0.25));
  return s;
}

export function makeSun(scene: THREE.Scene): THREE.DirectionalLight {
  const sun = new THREE.DirectionalLight(new THREE.Color('#fff1d2'), 2.3);
  sun.position.set(-14, 18, -10); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const s = sun.shadow.camera; s.left = -WORLD * 0.62; s.right = WORLD * 0.62; s.top = WORLD * 0.62; s.bottom = -WORLD * 0.62;
  s.near = 1; s.far = 80; sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03; sun.shadow.radius = 4;
  scene.add(sun, sun.target);
  return sun;
}

export class CameraRig {
  camera: THREE.OrthographicCamera;
  frustum = 10.5; target = new THREE.Vector3(0, 0.6, 0);
  private dir = new THREE.Vector3(1, 1.08, 1).normalize();

  constructor() {
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -60, 120);
    this.place();
  }
  place(): void {
    this.camera.position.copy(this.target).addScaledVector(this.dir, 40);
    this.camera.lookAt(this.target);
  }
  resize(w: number, h: number): void {
    const a = w / h; const f = this.frustum;
    this.camera.left = -f * a; this.camera.right = f * a; this.camera.top = f; this.camera.bottom = -f;
    this.camera.updateProjectionMatrix();
  }
  zoomBy(mult: number, w: number, h: number): void {
    this.frustum = THREE.MathUtils.clamp(this.frustum * mult, 9, 22); this.resize(w, h);
  }
  // pan em coordenadas de tela → move o alvo no plano do mundo
  pan(dxScreen: number, dyScreen: number, w: number): void {
    const scale = (this.frustum * 2) / w * 1.0;
    // eixos de tela projetados no plano XZ (iso 45°)
    const right = new THREE.Vector3(1, 0, -1).normalize();
    const fwd = new THREE.Vector3(1, 0, 1).normalize();
    this.target.addScaledVector(right, -dxScreen * scale);
    this.target.addScaledVector(fwd, -dyScreen * scale);
    const lim = WORLD * 0.5;
    this.target.x = THREE.MathUtils.clamp(this.target.x, -lim, lim);
    this.target.z = THREE.MathUtils.clamp(this.target.z, -lim, lim);
    this.place();
  }
  focus(x: number, z: number): void { this.target.set(x, 0.6, z); this.place(); }
}
