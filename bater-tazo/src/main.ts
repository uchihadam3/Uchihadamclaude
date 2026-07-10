// BATER TAZO! — boot, fluxo da partida e input do tapa.
// Fluxo: menu → cada um casa N tazos (pilha 2N de cara pra baixo) → alterna
// batidas → o que VIRAR é seu → pilha some → quem pegou mais leva.
import * as THREE from 'three';
import { makeRenderer, makeScene, makeTable, tazoMesh, syncTazo, CamRig } from './scene3d';
import { COLECAO, byId, TazoSpec } from './art';
import { makeStack, slam, step, FlyingTazo, TAZO_R, TAZO_H } from './sim';
import { aiSlam, Difficulty } from './ai';
import { UI } from './ui';
import { sfx, resumeAudio } from './audio';

const app = document.getElementById('app')!;
const renderer = makeRenderer(app);
renderer.domElement.className = 'game';
const scene = makeScene();
const rig = new CamRig();
makeTable(scene);
const ui = new UI();

// ---------------- estado da partida ----------------
let stack: FlyingTazo[] = [];
let meshes = new Map<string, THREE.Group>();
let turn = 0;                       // 0 = você, 1 = rival
let won: string[][] = [[], []];     // ids capturados por jogador
let phase: 'menu' | 'aim' | 'fly' | 'over' = 'menu';
let diff: Difficulty = 'medio';
let strikerMesh: THREE.Group | null = null;
let strikerSpec: TazoSpec = byId('leao');
let slamAnim = 0;                   // animação do batedor descendo
let slamAim = { x: 0, y: 0 }; let slamPow = 0;

function clearMatch(): void {
  for (const [, m] of meshes) scene.remove(m);
  meshes.clear();
  if (strikerMesh) { scene.remove(strikerMesh); strikerMesh = null; }
}

function newMatch(aposta: number): void {
  clearMatch();
  won = [[], []]; turn = 0;
  // cada lado casa 'aposta' tazos (sorteados da coleção, alternados)
  const pool = COLECAO.map(t => t.id);
  const ids: string[] = []; const owners: number[] = [];
  for (let i = 0; i < aposta * 2; i++) {
    ids.push(pool[Math.floor(Math.random() * pool.length)]);
    owners.push(i % 2);
  }
  stack = makeStack(ids, owners);
  for (const t of stack) {
    const m = tazoMesh(t.spec); meshes.set(t.id, m); scene.add(m); syncTazo(m, t);
  }
  // seu batedor (o mais pesado que "você tem" — v1: leão)
  strikerSpec = byId('leao');
  strikerMesh = tazoMesh(strikerSpec, 1.12);
  strikerMesh.visible = false;
  scene.add(strikerMesh);
  ui.showHUD();
  refreshHUD();
  phase = 'aim';
  ui.setHint(turn === 0 ? 'SUA VEZ: segura no monte, PUXA e SOLTA!' : 'vez do rival…');
  if (turn === 1) setTimeout(aiTurn, 900);
}

function refreshHUD(): void {
  ui.setHUD(won[0].length, won[1].length, stack.filter(t => !collected.has(t.id)).length, turn);
}

// tazos virados são recolhidos (saem da mesa voando pro lado do dono)
const collected = new Set<string>();
function collectFlipped(): number {
  let n = 0;
  for (const t of stack) {
    if (collected.has(t.id) || !t.faceUp) continue;
    collected.add(t.id);
    won[turn].push(t.spec.id); n++;
    const m = meshes.get(t.id)!;
    // animação simples: some num pulinho
    const dir = turn === 0 ? 1 : -1;
    const start = performance.now();
    const sx = m.position.x, sz = m.position.z;
    const anim = () => {
      const k = (performance.now() - start) / 420;
      if (k >= 1) { scene.remove(m); return; }
      m.position.x = sx + dir * k * 6;
      m.position.y = Math.sin(k * Math.PI) * 2.2 + TAZO_H;
      m.position.z = sz + k * 3.5;
      m.rotation.z += 0.15;
      requestAnimationFrame(anim);
    };
    anim();
  }
  return n;
}

// re-empilha os que sobraram (de cara pra baixo, no centro) pro próximo turno
function restack(): void {
  const rest = stack.filter(t => !collected.has(t.id));
  rest.forEach((t, i) => {
    t.x = Math.sin(i * 2.399) * 0.06; t.y = Math.cos(i * 2.399) * 0.06;
    t.z = TAZO_H / 2 + i * TAZO_H; t.restZ = t.z;
    t.faceUp = false; t.phi = 0; t.om = 0; t.settled = true; t.flying = false;
  });
}

function endTurn(): void {
  const flips = collectFlipped();
  if (flips > 0) { sfx.flip(flips); ui.toast(turn === 0 ? `VIROU ${flips}! 🖐️` : `rival virou ${flips}…`, 1200); }
  refreshHUD();
  const remaining = stack.filter(t => !collected.has(t.id));
  if (!remaining.length) {
    phase = 'over';
    const win = won[0].length > won[1].length;
    setTimeout(() => { (win ? sfx.win() : sfx.lose()); ui.showEnd(win, won[0], won[1]); }, 900);
    return;
  }
  setTimeout(() => {
    restack();
    for (const t of stack) { const m = meshes.get(t.id); if (m && !collected.has(t.id)) syncTazo(m, t); }
    turn = 1 - turn;
    refreshHUD();
    phase = 'aim';
    ui.setHint(turn === 0 ? 'SUA VEZ: segura no monte, PUXA e SOLTA!' : 'vez do rival…');
    if (turn === 1) setTimeout(aiTurn, 800);
  }, 950);
}

function doSlam(aimX: number, aimY: number, power: number): void {
  phase = 'fly';
  slamAim = { x: aimX, y: aimY }; slamPow = power; slamAnim = 0.0001;
  ui.setHint('');
  ui.setPower(0);
}

function aiTurn(): void {
  if (phase !== 'aim' || turn !== 1) return;
  const ids = stack.filter(t => !collected.has(t.id)).map(t => t.spec.id);
  const mv = aiSlam(ids, strikerSpec.id, diff);
  doSlam(mv.aimX, mv.aimY, mv.power);
}

// ---------------- input do TAPA (arrasta e solta) ----------------
let drag: { x0: number; y0: number; t0: number; lastY: number; lastT: number } | null = null;
const raycaster = new THREE.Raycaster();
const tablePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

function pointerWorld(ev: PointerEvent): { x: number; y: number } {
  const nd = new THREE.Vector2((ev.clientX / innerWidth) * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(nd, rig.camera);
  const p = new THREE.Vector3();
  raycaster.ray.intersectPlane(tablePlane, p);
  return { x: p.x, y: p.z };
}

addEventListener('pointerdown', ev => {
  resumeAudio();
  if (phase !== 'aim' || turn !== 0) return;
  const w = pointerWorld(ev);
  if (Math.hypot(w.x, w.y) > TAZO_R * 3.2) return;   // tem que começar perto do monte
  drag = { x0: ev.clientX, y0: ev.clientY, t0: performance.now(), lastY: ev.clientY, lastT: performance.now() };
});
addEventListener('pointermove', ev => {
  if (!drag) return;
  drag.lastY = ev.clientY; drag.lastT = performance.now();
  const pull = Math.max(0, (ev.clientY - drag.y0) / (innerHeight * 0.4));
  ui.setPower(Math.min(1, pull));
  if (Math.random() < 0.2) sfx.charge(Math.min(1, pull));
});
addEventListener('pointerup', ev => {
  if (!drag || phase !== 'aim' || turn !== 0) { drag = null; return; }
  const dt = Math.max(30, performance.now() - drag.t0);
  const pull = Math.max(0, (ev.clientY - drag.y0) / (innerHeight * 0.4));   // quanto puxou pra baixo
  const speed = Math.max(0, (ev.clientY - drag.y0) / dt) * 9;               // velocidade do gesto
  const power = Math.min(1, pull * 0.55 + speed * 0.5);
  // a MIRA é onde você COMEÇOU o toque (no monte)
  const w = pointerWorld({ clientX: drag.x0, clientY: drag.y0 } as PointerEvent);
  drag = null;
  ui.setPower(0);
  if (power < 0.08) { ui.toast('fraquinho… puxa RÁPIDO! 💨', 1000); return; }
  doSlam(Math.max(-1.2, Math.min(1.2, w.x)), Math.max(-1.2, Math.min(1.2, w.y)), power);
});

// ---------------- loop ----------------
const clock = new THREE.Clock();
function loop(): void {
  const dt = Math.min(0.05, clock.getDelta());
  rig.update(dt);

  // animação do batedor descendo + IMPACTO
  if (slamAnim > 0 && strikerMesh) {
    slamAnim += dt * 3.4;
    strikerMesh.visible = true;
    const k = Math.min(1, slamAnim);
    // arco: vem de cima/trás e desce no ponto da mira
    const h = (1 - k) * (5.5 + slamPow * 3);
    strikerMesh.position.set(slamAim.x, TAZO_H * 8 + h * h * 0.35 + 0.25, slamAim.y + (1 - k) * 2.2);
    strikerMesh.rotation.x = -0.5 + k * 0.5;
    if (k >= 1) {
      slamAnim = 0;
      strikerMesh.visible = false;
      sfx.slam(slamPow);
      rig.shake = 0.35 + slamPow * 0.5;
      slam(stack.filter(t => !collected.has(t.id)), slamAim.x, slamAim.y, slamPow, strikerSpec);
    }
  }

  // física dos tazos voando
  if (phase === 'fly' && slamAnim === 0) {
    const before = stack.some(t => t.flying);
    const moving = step(stack.filter(t => !collected.has(t.id)), dt);
    for (const t of stack) { const m = meshes.get(t.id); if (m && !collected.has(t.id)) syncTazo(m, t); }
    if (before && !moving) { sfx.land(); endTurn(); }
    else if (!before && !moving) endTurn();
  }

  renderer.render(scene, rig.camera);
  requestAnimationFrame(loop);
}
loop();

addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); rig.resize(); });

// ---------------- boot ----------------
ui.onStart = (aposta, d) => { diff = d; collected.clear(); newMatch(aposta); };
ui.onAgain = () => { collected.clear(); newMatch(Math.max(1, Math.floor(stack.length / 2)) as number); };
ui.showMenu();

(window as any).__bt = { get stack() { return stack; }, get phase() { return phase; }, get won() { return won; }, doSlam, newMatch, ui };
