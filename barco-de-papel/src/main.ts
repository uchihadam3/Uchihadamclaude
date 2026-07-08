// Cena da demo: câmera isométrica ortográfica fixa, iluminação quente de
// deserto com sombras suaves, terreno heightmap, água translúcida, barco de
// papel e objetos naturais. Interação mínima: seleção de ferramenta (visual) e
// alternância Planejamento/Execução.
import * as THREE from 'three';
import { Terrain, WATER_LEVEL, OASIS } from './terrain';
import { Water } from './water';
import { PaperBoat } from './boat';
import { buildFlora } from './flora';
import { makeSkyTexture } from './textures';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = makeSkyTexture();
scene.fog = new THREE.FogExp2(new THREE.Color('#ecd6ad'), 0.012);

// ---------- câmera isométrica ortográfica fixa ----------
const target = new THREE.Vector3(2.0, -0.4, -0.2);
const camOffset = new THREE.Vector3(14, 13.2, 14);   // ~38° de elevação, 45° azimute
let frustum = 11;
const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, -50, 100);
function placeCamera(px = 0, pz = 0) {
  camera.position.copy(target).add(camOffset).add(new THREE.Vector3(px, 0, pz));
  camera.lookAt(target);
}
function resize() {
  const w = innerWidth, h = innerHeight, a = w / h;
  // em retrato, enquadra o oásis (onde está o barco) e afasta um pouco a câmera
  if (a < 1) { frustum = 13.5; target.set(-2.6, -0.4, 1.2); }
  else { frustum = 11; target.set(2.0, -0.4, -0.2); }
  camera.left = -frustum * a; camera.right = frustum * a; camera.top = frustum; camera.bottom = -frustum;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
addEventListener('resize', resize);

// ---------- iluminação quente ----------
scene.add(new THREE.HemisphereLight(new THREE.Color('#ffe9c4'), new THREE.Color('#b0824c'), 0.55));
scene.add(new THREE.AmbientLight(new THREE.Color('#6a5636'), 0.25));
const sun = new THREE.DirectionalLight(new THREE.Color('#fff1d2'), 2.3);
sun.position.copy(target).add(new THREE.Vector3(-12, 15, -9));
sun.target.position.copy(target);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -16; sun.shadow.camera.right = 16;
sun.shadow.camera.top = 16; sun.shadow.camera.bottom = -16;
sun.shadow.camera.near = 1; sun.shadow.camera.far = 60;
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; sun.shadow.radius = 4;
scene.add(sun, sun.target);

// ---------- conteúdo da cena ----------
const terrain = new Terrain();
scene.add(terrain.mesh);
const water = new Water(terrain);
scene.add(water.mesh);
const boat = new PaperBoat(OASIS.x + 1.6, OASIS.z + 0.2);
scene.add(boat.mesh);
scene.add(buildFlora(terrain));

// grade sutil de "marcas na areia" (só no Planejamento)
const gridOverlay = (() => {
  const pts: number[] = []; const x0 = -9, x1 = 11, z0 = -6, z1 = 7, major = 1, fine = 0.5;
  for (let z = z0; z <= z1; z += major) for (let x = x0; x < x1; x += fine)
    pts.push(x, terrain.heightAt(x, z) + 0.03, z, x + fine, terrain.heightAt(x + fine, z) + 0.03, z);
  for (let x = x0; x <= x1; x += major) for (let z = z0; z < z1; z += fine)
    pts.push(x, terrain.heightAt(x, z) + 0.03, z, x, terrain.heightAt(x, z + fine) + 0.03, z + fine);
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const m = new THREE.LineBasicMaterial({ color: new THREE.Color('#8a6636'), transparent: true, opacity: 0.10 });
  return new THREE.LineSegments(g, m);
})();
scene.add(gridOverlay);

// ---------- estado / interação mínima ----------
type Mode = 'plan' | 'run';
let mode: Mode = 'plan';
let waterSpeed = 0.7, targetSpeed = 0.7;
const hintEl = document.getElementById('hint')!;

const TOOLS = [
  { id: 'coco', name: 'Casca de Coco', sub: 'escavar', svg: `<svg viewBox="0 0 32 32"><path d="M5 16a11 8 0 0 0 22 0z" fill="#6b4626"/><path d="M6 16a10 6 0 0 1 20 0z" fill="#d9c39a"/><circle cx="12" cy="14.5" r="1.5" fill="#5a3d20"/><circle cx="16" cy="15" r="1.5" fill="#5a3d20"/><circle cx="20" cy="14.5" r="1.5" fill="#5a3d20"/><path d="M5 16a11 8 0 0 0 22 0" fill="none" stroke="#3f2913" stroke-width="1.4"/></svg>` },
  { id: 'bambu', name: 'Bambu', sub: 'canal', svg: `<svg viewBox="0 0 32 32"><rect x="9" y="4" width="6" height="24" rx="3" fill="#9fb163"/><rect x="17" y="4" width="6" height="24" rx="3" fill="#8aa050"/><path d="M9 11h6M9 20h6M17 9h6M17 18h6" stroke="#5f7333" stroke-width="1.6"/></svg>` },
  { id: 'pedras', name: 'Pedras & Conchas', sub: 'fluxo', svg: `<svg viewBox="0 0 32 32"><ellipse cx="11" cy="20" rx="7" ry="5" fill="#b3a483"/><ellipse cx="11" cy="19" rx="7" ry="5" fill="#c3b795"/><path d="M20 22a6 6 0 0 1 9-4c-2 3-5 4-9 4z" fill="#f0dfc6"/><path d="M20 22a6 6 0 0 1 9-4" fill="none" stroke="#caa877" stroke-width="1"/><path d="M23 21l1-4M25 21l1-4M27 20l1-3" stroke="#caa877" stroke-width="0.9"/></svg>` },
  { id: 'folha', name: 'Folha de Palmeira', sub: 'sombra', svg: `<svg viewBox="0 0 32 32"><path d="M16 28C16 16 8 8 4 6c6 0 11 4 12 10C17 10 22 6 28 6c-4 2-12 10-12 22z" fill="#5f9a34"/><path d="M16 28V8" stroke="#3d6b20" stroke-width="1.4"/></svg>` },
];
let activeTool = 'coco';
const toolsEl = document.getElementById('tools')!;
for (const t of TOOLS) {
  const btn = document.createElement('button');
  btn.className = 'tool' + (t.id === activeTool ? ' active' : '');
  btn.innerHTML = `<span class="tool-badge">${t.svg}</span><span class="tool-name">${t.name}</span><span class="tool-sub">${t.sub}</span>`;
  btn.onclick = () => {
    activeTool = t.id;
    [...toolsEl.children].forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    hintEl.textContent = `Ferramenta: ${t.name}. Nesta demo o efeito é apenas visual — a mecânica entra na implementação.`;
  };
  toolsEl.appendChild(btn);
}

function setMode(m: Mode) {
  mode = m;
  document.querySelectorAll('.ph-opt').forEach((b) => b.classList.toggle('active', (b as HTMLElement).dataset.mode === m));
  targetSpeed = m === 'run' ? 2.0 : 0.7;
  gridOverlay.visible = m === 'plan';
  hintEl.textContent = m === 'run'
    ? 'Execução: a água ganha vida e o barco é levado pela correnteza. (Amostra visual.)'
    : 'Planejamento: tempo pausado. Aqui o jogador molda o terreno e posiciona os objetos.';
}
document.querySelectorAll('.ph-opt').forEach((b) => b.addEventListener('click', () => setMode((b as HTMLElement).dataset.mode as Mode)));
document.getElementById('runBtn')!.addEventListener('click', () => setMode('run'));

// leve parallax de câmera com o ponteiro (mantém o enquadramento isométrico)
let px = 0, pz = 0, tpx = 0, tpz = 0;
addEventListener('pointermove', (e) => {
  const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
  tpx = nx * 1.6; tpz = ny * 1.2;
});

// ---------- loop ----------
resize();
const clock = new THREE.Clock();
let t = 0;
function frame() {
  const dt = Math.min(0.05, clock.getDelta()); t += dt;
  waterSpeed += (targetSpeed - waterSpeed) * Math.min(1, dt * 2);
  px += (tpx - px) * Math.min(1, dt * 2); pz += (tpz - pz) * Math.min(1, dt * 2);
  placeCamera(px, pz);
  water.update(t, waterSpeed);
  boat.update(t, mode === 'run');
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
setMode('plan');
frame();
