// ---------------------------------------------------------------------------
// CENA — renderer, câmera e luz do diorama de brinquedos.
// A estética é "mesa de brinquedo ao entardecer": luz quente e baixa vindo da
// janela (direcional com sombras suaves), preenchimento frio do outro lado e
// plástico/madeira com brilho. Nada de assets: tudo procedural.
// ---------------------------------------------------------------------------
import * as THREE from 'three';

export const WORLD = {
  laneZ: [-84, 0, 84],          // as 3 faixas da mesa
  laneHalf: 34,                 // meia-largura de cada faixa
  xHalf: 330,                   // metade do comprimento do campo (bases em ±)
  baseX: 312,                   // centro das bases
  matHalfW: 152,                // meia-largura do tapete (Z)
  matHalfL: 392,                // meia-comprimento do tapete (X)
};

export function makeRenderer(parent: HTMLElement): THREE.WebGLRenderer {
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.setSize(innerWidth, innerHeight);
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.12;
  r.outputColorSpace = THREE.SRGBColorSpace;
  parent.appendChild(r.domElement);
  return r;
}

export function makeScene(): THREE.Scene {
  const s = new THREE.Scene();
  s.fog = new THREE.Fog(0xc99b72, 900, 1900);

  const hemi = new THREE.HemisphereLight(0xfff2dd, 0xb0784a, 0.5);
  s.add(hemi);

  // luz da janela: quente, baixa, com sombras macias
  const key = new THREE.DirectionalLight(0xffd9a0, 2.7);
  key.position.set(260, 420, 210);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -520; key.shadow.camera.right = 520;
  key.shadow.camera.top = 420; key.shadow.camera.bottom = -420;
  key.shadow.camera.near = 60; key.shadow.camera.far = 1300;
  key.shadow.bias = -0.0006;
  key.shadow.radius = 6;
  key.shadow.camera.updateProjectionMatrix();   // sem isso o frustum fica no padrão (10 unidades!)
  s.add(key);
  s.add(key.target);

  // preenchimento frio (céu da janela refletindo do outro lado)
  const fill = new THREE.DirectionalLight(0x9ec2ff, 0.35);
  fill.position.set(-320, 260, -160);
  s.add(fill);

  // brilho rasante atrás (recorta as silhuetas — deixa "cinematográfico")
  const rim = new THREE.DirectionalLight(0xffe9c0, 0.55);
  rim.position.set(-80, 190, -420);
  s.add(rim);

  return s;
}

// Câmera que enquadra a mesa em qualquer tela:
//  · PAISAGEM: vista lateral clássica (mesa inteira de lado)
//  · RETRATO (celular em pé): câmera ATRÁS da sua base olhando pro inimigo —
//    as 3 faixas viram colunas e seus bonequinhos ficam grandes perto de você
export class CamRig {
  camera: THREE.PerspectiveCamera;
  portrait = false;
  dist = 700;
  private t = 0;
  shake = 0;                     // tremidinha (gude, canhonada…)
  constructor() {
    this.camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 10, 4200);
    this.resize();
  }
  resize(): void {
    this.camera.aspect = innerWidth / innerHeight;
    this.portrait = innerHeight > innerWidth * 1.05;
    if (this.portrait) {
      this.camera.fov = 52;
      // precisa caber a LARGURA do tapete (as 3 colunas) na tela estreita
      const fovY = (this.camera.fov * Math.PI) / 180;
      const fovX = 2 * Math.atan(Math.tan(fovY / 2) * this.camera.aspect);
      this.dist = Math.max(430, (WORLD.matHalfW + 100) / Math.tan(fovX / 2));
    } else {
      this.camera.fov = 36;
      const fovY = (this.camera.fov * Math.PI) / 180;
      const fovX = 2 * Math.atan(Math.tan(fovY / 2) * this.camera.aspect);
      const needX = (WORLD.matHalfL + 60) / Math.tan(fovX / 2);
      const needZ = (WORLD.matHalfW + 170) / Math.tan(fovY / 2);
      this.dist = Math.max(needX, needZ, 380);
    }
    this.camera.updateProjectionMatrix();
  }
  update(dt: number): void {
    this.t += dt;
    this.shake = Math.max(0, this.shake - dt * 2.2);
    const sway = Math.sin(this.t * 0.21) * 6;
    const sx = (Math.random() - 0.5) * this.shake * 9;
    const sy = (Math.random() - 0.5) * this.shake * 7;
    if (this.portrait) {
      // atrás da MINHA base, elevada, olhando o comprimento da mesa
      const back = -WORLD.baseX - this.dist * 0.56;
      this.camera.position.set(back + sx, this.dist * 0.72 + sy, sway * 0.5);
      this.camera.lookAt(96, -30, 0);
    } else {
      const d = this.dist;
      const ang = 0.82;                                            // ~47° — mostra os rostinhos
      this.camera.position.set(sway + sx, Math.sin(ang) * d * 0.86 + sy, Math.cos(ang) * d + 40);
      this.camera.lookAt(0, -26, -14);
    }
  }
}
