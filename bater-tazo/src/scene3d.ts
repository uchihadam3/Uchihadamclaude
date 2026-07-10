// CENA 3D — mesa de madeira vista de cima em ângulo, tazos como discos finos
// com textura dos dois lados (frente = bicho, verso = espiral TAZO).
import * as THREE from 'three';
import { TazoSpec, drawTazoFront, drawTazoBack } from './art';
import { FlyingTazo, TAZO_R, TAZO_H } from './sim';

export function makeRenderer(el: HTMLElement): THREE.WebGLRenderer {
  const r = new THREE.WebGLRenderer({ antialias: true });
  r.setSize(innerWidth, innerHeight);
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.outputColorSpace = THREE.SRGBColorSpace;
  el.appendChild(r.domElement);
  return r;
}

export function makeScene(): THREE.Scene {
  const sc = new THREE.Scene();
  sc.background = new THREE.Color('#2e2016');
  sc.fog = new THREE.Fog('#2e2016', 26, 60);
  const amb = new THREE.HemisphereLight('#fff6e4', '#4a3020', 0.85);
  sc.add(amb);
  const key = new THREE.DirectionalLight('#ffedca', 1.6);
  key.position.set(-6, 16, 8); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -12; key.shadow.camera.right = 12;
  key.shadow.camera.top = 12; key.shadow.camera.bottom = -12;
  key.shadow.camera.far = 40;
  key.shadow.camera.updateProjectionMatrix();
  sc.add(key);
  return sc;
}

// mesa de madeira com tábuas desenhadas em canvas
export function makeTable(sc: THREE.Scene): void {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1024;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#7a5230'; c.fillRect(0, 0, 1024, 1024);
  for (let x = 0; x < 1024; x += 146) {
    c.fillStyle = `rgba(${40 + Math.random() * 30},${20 + Math.random() * 18},8,${0.25 + Math.random() * 0.15})`;
    c.fillRect(x, 0, 146, 1024);
    c.strokeStyle = 'rgba(40,22,8,0.7)'; c.lineWidth = 5;
    c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1024); c.stroke();
    for (let v = 0; v < 5; v++) {
      const vy = Math.random() * 1024;
      c.strokeStyle = 'rgba(60,36,14,0.35)'; c.lineWidth = 2;
      c.beginPath(); for (let yy = 0; yy < 1024; yy += 40) c.lineTo(x + 20 + Math.sin(yy * 0.01 + v) * 12 + v * 24, yy); c.stroke();
    }
  }
  for (let i = 0; i < 9; i++) { c.fillStyle = 'rgba(30,16,6,0.5)'; c.beginPath(); c.ellipse(Math.random() * 1024, Math.random() * 1024, 8 + Math.random() * 7, 5 + Math.random() * 5, Math.random() * 3, 0, 7); c.fill(); }
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 3);
  const mesa = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 }));
  mesa.rotation.x = -Math.PI / 2; mesa.receiveShadow = true;
  sc.add(mesa);
  // círculo de giz marcando a arena (charme de moleque)
  const giz = document.createElement('canvas'); giz.width = giz.height = 512;
  const g = giz.getContext('2d')!;
  g.strokeStyle = 'rgba(255,250,235,0.85)'; g.lineWidth = 10; g.setLineDash([34, 18]);
  g.beginPath(); g.arc(256, 256, 236, 0, 7); g.stroke();
  const gt = new THREE.CanvasTexture(giz); gt.colorSpace = THREE.SRGBColorSpace;
  const ring = new THREE.Mesh(new THREE.PlaneGeometry(16.4, 16.4), new THREE.MeshBasicMaterial({ map: gt, transparent: true, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.005;
  sc.add(ring);
}

const texCache = new Map<string, { front: THREE.CanvasTexture; back: THREE.CanvasTexture }>();
function texOf(spec: TazoSpec): { front: THREE.CanvasTexture; back: THREE.CanvasTexture } {
  let t = texCache.get(spec.id);
  if (!t) {
    const front = new THREE.CanvasTexture(drawTazoFront(spec)); front.colorSpace = THREE.SRGBColorSpace; front.anisotropy = 8;
    const back = new THREE.CanvasTexture(drawTazoBack(spec)); back.colorSpace = THREE.SRGBColorSpace; back.anisotropy = 8;
    t = { front, back }; texCache.set(spec.id, t);
  }
  return t;
}

// disco 3D do tazo (cilindro fino: lateral papelão, topo/verso texturizados)
export function tazoMesh(spec: TazoSpec, scale = 1): THREE.Group {
  const g = new THREE.Group();
  const { front, back } = texOf(spec);
  const side = new THREE.MeshStandardMaterial({ color: '#d8cdb4', roughness: 0.9 });
  const mf = new THREE.MeshStandardMaterial({ map: front, roughness: 0.55 });
  const mb = new THREE.MeshStandardMaterial({ map: back, roughness: 0.55 });
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(TAZO_R * scale, TAZO_R * scale, TAZO_H * scale, 42), [side, mf, mb]);
  mesh.castShadow = true; mesh.receiveShadow = true;
  g.add(mesh);
  return g;
}

// aplica o estado físico ao mesh (posição + rotação de virada + giro)
export function syncTazo(g: THREE.Object3D, t: FlyingTazo): void {
  g.position.set(t.x, t.z, t.y);
  const q = new THREE.Quaternion();
  // base: face pra cima ou pra baixo
  q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), t.faceUp ? 0 : Math.PI);
  // giro no próprio eixo
  const qs = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), t.spin);
  // rotação de virada em voo (eixo horizontal do mundo)
  const qf = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(t.axx, 0, t.axy).normalize(), t.phi);
  g.quaternion.copy(qf).multiply(qs).multiply(q);
}

export class CamRig {
  camera: THREE.PerspectiveCamera;
  shake = 0; private t = 0;
  portrait = false;
  constructor() {
    this.camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 120);
    this.resize();
  }
  resize(): void {
    this.portrait = innerHeight > innerWidth;
    this.camera.aspect = innerWidth / innerHeight;
    const d = this.portrait ? 15.5 : 11.5;
    this.camera.position.set(0, d, d * (this.portrait ? 0.62 : 0.78));
    this.camera.lookAt(0, 0, this.portrait ? -0.8 : 0);
    this.camera.updateProjectionMatrix();
  }
  update(dt: number): void {
    this.t += dt;
    if (this.shake > 0.01) {
      const s = this.shake;
      this.camera.position.x = Math.sin(this.t * 71) * s * 0.25;
      this.camera.position.y += Math.sin(this.t * 87) * s * 0.05;
      this.shake *= Math.pow(0.02, dt);
    } else this.camera.position.x = 0;
  }
}
