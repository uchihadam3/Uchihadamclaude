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

// Câmera orbital: gira (azimute), inclina/tomba (polar) e dá zoom (frustum
// ortográfico). Padrão isométrico; o jogador vê de qualquer ângulo.
export class CameraRig {
  camera: THREE.OrthographicCamera;
  frustum = 19;                 // enquadra a diagonal canto-a-canto
  target = new THREE.Vector3(0, 0.6, 0);
  az = Math.PI / 4;     // azimute (giro em torno de Y)
  pol = 0.92;           // ângulo polar a partir da vertical (tombamento)
  private dist = 60;

  constructor() {
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -120, 260);
    this.place();
  }
  place(): void {
    const s = Math.sin(this.pol) * this.dist, y = Math.cos(this.pol) * this.dist;
    this.camera.position.set(this.target.x + s * Math.sin(this.az), this.target.y + y, this.target.z + s * Math.cos(this.az));
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.target);
  }
  resize(w: number, h: number): void {
    const a = w / h; const f = this.frustum;
    this.camera.left = -f * a; this.camera.right = f * a; this.camera.top = f; this.camera.bottom = -f;
    this.camera.updateProjectionMatrix();
  }
  zoomBy(mult: number, w: number, h: number): void {
    this.frustum = THREE.MathUtils.clamp(this.frustum * mult, 7, 30); this.resize(w, h);
  }
  // gira/tomba a câmera (arraste em tela)
  orbit(dxScreen: number, dyScreen: number): void {
    this.az -= dxScreen * 0.006;
    this.pol = THREE.MathUtils.clamp(this.pol - dyScreen * 0.006, 0.16, 1.4);
    this.place();
  }
  // desloca o alvo no plano do chão, relativo ao giro atual da câmera
  panWorld(dx: number, dz: number): void {
    const c = Math.cos(this.az), s = Math.sin(this.az);
    // eixos "direita" e "frente" projetados no chão a partir do azimute
    this.target.x += dx * c - dz * s;
    this.target.z += -dx * s - dz * c;
    const lim = WORLD * 0.5;
    this.target.x = THREE.MathUtils.clamp(this.target.x, -lim, lim);
    this.target.z = THREE.MathUtils.clamp(this.target.z, -lim, lim);
    this.place();
  }
  focus(x: number, z: number): void { this.target.set(x, 0.6, z); this.place(); }
}
