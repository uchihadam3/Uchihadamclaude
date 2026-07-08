// Ponto de entrada: monta as camadas (simulação, render, input, UI), liga tudo
// e roda o loop. Segue a arquitetura: GameManager comanda o estado; o render
// apenas lê o Grid; o input aplica ferramentas via ToolSystem.
import * as THREE from 'three';
import { makeRenderer, makeScene, makeSun, CameraRig } from './render/scene';
import { TerrainMesh } from './render/terrainMesh';
import { WaterMesh } from './render/waterMesh';
import { FX } from './render/fx';
import { makePaperBoat, makePalmTree, makeShadeCanopy, SolidsRenderer, makeSourceMarker, makeGoalMarker, makeBrushRing } from './render/props';
import { makePalmLeaf } from './render/textures';
import { GameManager } from './game/manager';
import { InputController } from './input';
import { UI } from './ui';
import { initAudio, resumeAudio, toggleMute, sfx } from './audio';
import { N } from './sim/grid';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const renderer = makeRenderer(canvas);
const scene = makeScene();
const sun = makeSun(scene);
const rig = new CameraRig();

const mgr = new GameManager();
const grid = mgr.grid;

const terrain = new TerrainMesh(grid); scene.add(terrain.mesh);
const water = new WaterMesh(grid); scene.add(water.mesh);
const solids = new SolidsRenderer(grid); scene.add(solids.group);
const fx = new FX(); scene.add(fx.points);
const leafTex = makePalmLeaf();
const boatMesh = makePaperBoat(); scene.add(boatMesh);
const sourceMk = makeSourceMarker(); scene.add(sourceMk);
const goalMk = makeGoalMarker(); scene.add(goalMk);
const brushRing = makeBrushRing(); brushRing.visible = false; scene.add(brushRing);
const scenery = new THREE.Group(); scene.add(scenery);   // palmeiras + canópias por fase

// ---- ferramenta / edição ----
function onEdit(x: number, z: number): void {
  if (mgr.state !== 'planning') return;
  const tool = mgr.tools.active;
  const ok = mgr.tools.apply(grid, x, z);
  if (!ok) return;
  if (tool === 'coco') { /* som leve esporádico */ if (Math.random() < 0.12) sfx.dig(); }
  else if (tool === 'folha') { sfx.leaf(); const c = makeShadeCanopy(leafTex); c.position.set(x, grid.terrainAt(x, z), z); scenery.add(c); }
  else sfx.place();
  if (tool !== 'coco') ui.update(mgr);   // atualiza contagem
}
function onHover(p: { x: number; z: number } | null): void {
  if (!p || mgr.state !== 'planning') { brushRing.visible = false; return; }
  const t = mgr.tools.active;
  brushRing.visible = true;
  brushRing.position.set(p.x, grid.terrainAt(p.x, p.z) + 0.06, p.z);
  const r = t === 'coco' ? mgr.tools.cocoRadius : t === 'folha' ? 1.7 : 0.4;
  brushRing.scale.setScalar(r / 1.6);
  const col = t === 'coco' ? '#fff2cc' : t === 'bambu' ? '#a7d24a' : t === 'pedras' ? '#e0d3b0' : '#7fe08a';
  (brushRing.material as THREE.MeshBasicMaterial).color.set(col);
}
const input = new InputController(canvas, rig.camera, rig, { canEdit: () => mgr.state === 'planning', onEdit, onHover });
input.setTarget(terrain.mesh);

// ---- montar cena para a fase atual ----
function setupLevelScene(): void {
  terrain.refresh(); solids.rebuild();
  // limpar cenário
  while (scenery.children.length) scenery.remove(scenery.children[0]);
  // marcadores
  const [gx, gz] = mgr.goal; goalMk.position.set(gx, grid.terrainAt(gx, gz), gz);
  // centro da nascente
  let sx = 0, sz = 0, sn = 0;
  for (let k = 0; k < N * N; k++) if (grid.source[k]) { const i = k % N, j = (k / N) | 0; const [wx, wz] = grid.cellToWorld(i, j); sx += wx; sz += wz; sn++; }
  if (sn) { sx /= sn; sz /= sn; } sourceMk.position.set(sx, grid.terrainAt(sx, sz) - 0.05, sz);
  // palmeiras decorativas ao redor da nascente e cantos
  const spots: [number, number, number][] = [[sx - 1.6, sz - 1.4, 3.4], [sx + 1.8, sz + 1.2, 2.6], [gx + 2.0, gz + 1.5, 3.0]];
  for (const [px, pz, h] of spots) { const p = makePalmTree(h, leafTex); p.position.set(px, grid.terrainAt(px, pz), pz); scenery.add(p); }
  // barco na largada
  placeBoatMesh();
  // enquadrar câmera entre largada e destino
  rig.focus((mgr.boat.x + gx) / 2, (mgr.boat.z + gz) / 2);
}

function placeBoatMesh(): void {
  const b = mgr.boat; const surf = Math.max(grid.terrainAt(b.x, b.z), grid.terrainAt(b.x, b.z) + grid.waterAt(b.x, b.z));
  boatMesh.position.set(b.x, surf + 0.06 + Math.sin(b.bob * 1.8) * 0.03, b.z);
  boatMesh.rotation.set(Math.sin(b.bob) * 0.04, b.heading, Math.sin(b.bob * 1.3) * 0.05 + (b.collideFlash > 0 ? 0.2 : 0));
  (boatMesh.material as THREE.MeshStandardMaterial).emissive.setRGB(b.collideFlash * 0.4, 0, 0);
}

// ---- callbacks da UI ----
const ui = new UI({
  pickLevel: (id) => { resumeAudio(); mgr.loadLevel(id); setupLevelScene(); ui.showGame(); ui.update(mgr); sfx.ui(); },
  selectTool: (t) => { mgr.tools.active = t; sfx.ui(); ui.update(mgr); },
  cocoMode: (m) => { mgr.tools.cocoMode = m; sfx.ui(); ui.update(mgr); },
  startRun: () => { mgr.startRun(); sfx.start(); ui.update(mgr); },
  backPlanning: () => { mgr.backToPlanning(); ui.update(mgr); },
  restart: () => { mgr.restartLevel(); setupLevelScene(); ui.update(mgr); },
  next: () => { if (mgr.nextLevel()) { setupLevelScene(); ui.update(mgr); } else ui.showMenu(); },
  menu: () => { ui.showMenu(); },
  pauseToggle: () => { if (mgr.state === 'running') mgr.pause(); else if (mgr.state === 'paused') mgr.resume(); ui.update(mgr); },
  mute: () => { ui.setMuted(toggleMute()); },
});
mgr.onChange = () => ui.update(mgr);
(window as any).__mgr = mgr;   // diagnóstico
ui.showMenu();

// ---- áudio no primeiro gesto ----
addEventListener('pointerdown', () => resumeAudio(), { once: true });
initAudio();

// ---- efeitos derivados do estado ----
let prevState = mgr.state; let splashCd = 0; let bubbleCd = 0;
function reactToState(): void {
  if (mgr.state === prevState) return;
  if (mgr.state === 'victory') { fx.sparkle(boatMesh.position.x, boatMesh.position.y + 0.4, boatMesh.position.z, 40); sfx.win(); for (let i = 0; i < mgr.stars; i++) setTimeout(() => sfx.star(), 400 + i * 200); }
  if (mgr.state === 'failure') { if (mgr.failReason === 'destroyed') fx.splash(boatMesh.position.x, boatMesh.position.y, boatMesh.position.z, 18); sfx.lose(); }
  prevState = mgr.state;
}

// ---- loop ----
function resize(): void { const w = innerWidth, h = innerHeight; renderer.setSize(w, h); rig.resize(w, h); }
addEventListener('resize', resize); resize();

const clock = new THREE.Clock(); let t = 0;
function frame(): void {
  const dt = Math.min(0.05, clock.getDelta()); t += dt;
  mgr.update(dt);
  reactToState();

  if (grid.dirty) { terrain.refresh(); solids.rebuild(); }
  const running = mgr.state === 'running';
  water.update(t, running ? 1.7 : 0.7);
  placeBoatMesh();

  // respingo ao colidir
  splashCd -= dt;
  if (mgr.boat.splash > 0.6 && splashCd <= 0) { fx.splash(boatMesh.position.x, boatMesh.position.y, boatMesh.position.z, 8); sfx.splash(); splashCd = 0.25; }
  // borbulhas na nascente durante a execução
  if (running) { bubbleCd -= dt; if (bubbleCd <= 0) { fx.bubble(sourceMk.position.x + (Math.random() - 0.5), sourceMk.position.y + 0.3, sourceMk.position.z + (Math.random() - 0.5)); bubbleCd = 0.12; } }
  fx.update(dt);

  ui.update(mgr);   // leve (rebuilds estruturais são guardados internamente)
  renderer.render(scene, rig.camera);
  requestAnimationFrame(frame);
}
frame();
