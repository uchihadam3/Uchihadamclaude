// Batalha de Brinquedos — boot, loop e orquestração da partida
import * as THREE from 'three';
import { makeRenderer, makeScene, CamRig } from './scene';
import { buildBoard } from './board';
import { Game } from './sim';
import { Commander, Difficulty } from './ai';
import { FX } from './fx';
import { UI } from './ui';
import { resumeAudio, startMusic, sfx } from './audio';

const app = document.getElementById('app')!;
const renderer = makeRenderer(app);
const scene = makeScene();
const rig = new CamRig();
const board = buildBoard(scene);
const fx = new FX(scene);
const ui = new UI();

let game: Game | null = null;
let ai: Commander | null = null;
let ended = false;

function newGame(diff: Difficulty): void {
  // limpa unidades/projéteis antigos (tudo que não é tabuleiro)
  if (game) {
    for (const u of game.units) scene.remove(u.anim.rig.group);
    for (const s of [0, 1] as const) for (const sl of game.slots[s]) if (sl.mesh) scene.remove(sl.mesh);
    if (game.marble.m) scene.remove(game.marble.m);
    if (game.marble.warn) scene.remove(game.marble.warn);
  }
  game = new Game(scene, fx, board.slotPos);
  ai = new Commander(game, diff);
  ended = false;
  game.onShake = f => { rig.shake = Math.max(rig.shake, f); };
  game.toast = (m, k) => ui.toast(m, k);
  game.onOver = (winner) => {
    setTimeout(() => { if (!ended) { ended = true; ui.showEnd(winner === 0); if (winner !== 0) sfx.sad(); } }, 1400);
  };
  ui.showHUD(game);
  ui.onPickLane = (kind, lane) => { if (game!.buy(0, kind, lane)) sfx.coin(); };
  ui.onBuild = (idx, kind) => { game!.build(0, idx, kind); };
  ui.onUpgrade = (idx) => { game!.upgrade(0, idx); };
  ui.onSpecial = () => { game!.useSpecial(0); };
  ui.onEvolve = (fac) => { game!.evolve(0, fac); ui.toast(`⭐ Vocês agora são ${fac === 'pirata' ? 'PIRATAS DE PLÁSTICO 🏴‍☠️' : 'ROBÔS DE CORDA 🤖'}!`); };
  ui.onRestart = () => ui.showStart();
}

ui.onStart = (diff) => { resumeAudio(); startMusic(); newGame(diff); };
ui.showStart();

// primeiro toque: destrava o áudio (regra de autoplay)
addEventListener('pointerdown', () => resumeAudio(), { once: true });

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  rig.resize();
});

const clock = new THREE.Clock();
function loop(): void {
  const dt = Math.min(0.05, clock.getDelta());
  rig.update(dt);
  const t = clock.elapsedTime;
  for (const side of [board.baseMeshes.mine, board.baseMeshes.foe]) {
    const f = side.getObjectByName('flag');
    if (f) f.rotation.y = Math.sin(t * 3.1 + side.position.x) * 0.35;
  }
  if (game) {
    game.update(dt, rig.camera.quaternion);
    ai?.update(dt * game.speed);
    ui.refresh(game);
  }
  fx.update(dt);
  renderer.render(scene, rig.camera);
  requestAnimationFrame(loop);
}
loop();

(window as any).__bdb = { scene, rig, board, get game() { return game; }, newGame, ui };
