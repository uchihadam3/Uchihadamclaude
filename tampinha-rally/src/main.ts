// Ponto de entrada: monta render/áudio/UI, gerencia os modos e roda o loop.
import * as THREE from 'three';
import { makeRenderer, makeScene, makeSun, CameraRig } from './render/scene';
import { buildBoard, BoardBuild } from './render/board';
import { CapsRenderer } from './render/caps';
import { Particles, Aim } from './render/fx';
import { GameManager, PlayerDef } from './game/manager';
import { track, TRACKS_PER_LEVEL } from './game/generator';
import { SURF, len } from './engine/core';
import { InputController } from './input';
import { UI, MatchConfig, Mode } from './ui';
import { sfx, resumeAudio, startMusic, stopMusic, setMusicVol, setSfxVol, setMuted, settings } from './audio';
import { save } from './game/save';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const renderer = makeRenderer(canvas);
let scene: THREE.Scene;
let rig = new CameraRig(34, 54);
let board: BoardBuild | null = null;
const caps = new CapsRenderer();
const fx = new Particles();
const aim = new Aim();
const mgr = new GameManager();

let mode: Mode = 'quick';
let curCfg: MatchConfig | null = null;
let champ: { seq: { level: number; idx: number }[]; race: number; pts: Map<number, number> } | null = null;
let dailyFlicks = 0;
let inGame = false;
let musicStarted = false;

// carrega a cena de uma pista e prepara a partida
function loadMatch(cfg: MatchConfig): void {
  curCfg = cfg; mode = cfg.mode; dailyFlicks = 0;
  const def = track(cfg.level, cfg.trackIdx);
  scene = makeScene(def.bg);
  makeSun(scene, def.w, def.h);
  board = buildBoard(def); scene.add(board.group);
  scene.add(caps.group, fx.points, aim.group);
  rig = new CameraRig(def.w, def.h); rig.setFrustum(21, innerWidth, innerHeight); resize();
  mgr.setup(def, cfg.players);
  caps.build(mgr.caps);
  input.setCamera(rig.camera, rig);
  ui.showGame(); inGame = true;
  if (!musicStarted) { startMusic(); musicStarted = true; }
  ui.updateHUD(mgr, humanTurn());
}

function humanTurn(): boolean { return mgr.phase === 'aim' && !mgr.activeCap().isAI; }

// -------- callbacks do manager (som + efeitos + HUD) --------
mgr.onToast = (msg, kind) => ui.toast(msg, kind);
mgr.onChange = () => ui.updateHUD(mgr, humanTurn());
mgr.onFlick = (cap, power) => { sfx.flick(power); const s = SURF[mgr.track.surfaceAt(cap.pos)]; fx.dust(cap.pos.x, cap.pos.y, 8); aim.hide(); };
mgr.onEvent = (e) => {
  switch (e.type) {
    case 'wall': sfx.wall(e.power); fx.impact(e.x, e.y, e.power * 0.4, '#ffe6b0'); break;
    case 'stone': sfx.wall(e.power); fx.impact(e.x, e.y, e.power * 0.5, '#e8e0d0'); break;
    case 'capHit': sfx.clack(e.power); fx.impact(e.x, e.y, e.power * 0.6, '#fff'); break;
    case 'hole': sfx.hole(); fx.dust(e.x, e.y, 14, '#3a2c1a'); break;
    case 'bomb': sfx.bad(); fx.impact(e.x, e.y, 10, '#ff8a5a'); break;
    case 'bonus': sfx.bonus(); fx.impact(e.x, e.y, 10, '#8affc0'); break;
    case 'out': sfx.bad(); fx.dust(e.x, e.y, 10, '#cbb58a'); break;
    case 'finish': fx.confetti(e.x, e.y); break;
  }
};

// -------- UI --------
const ui = new UI({
  start: (cfg) => {
    resumeAudio();
    if (cfg.mode === 'champ') {
      // 5 pistas variadas do nível escolhido
      const idxs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = idxs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idxs[i], idxs[j]] = [idxs[j], idxs[i]]; }
      const seq = idxs.slice(0, 5).map(idx => ({ level: cfg.level, idx }));
      champ = { seq, race: 0, pts: new Map() };
      cfg.level = seq[0].level; cfg.trackIdx = seq[0].idx;
    }
    else champ = null;
    loadMatch(cfg);
  },
  setVols: (m, s, mu) => { setMusicVol(m); setSfxVol(s); setMuted(mu); save.setVols(m, s, mu); },
  setSkin: (id) => { save.setSkin(id); sfx.ui(); },
});
ui.onPause = () => { if (mgr.phase !== 'over') { paused = true; ui.showPause(); } };
ui.onResume = () => { paused = false; ui.hideModal(); };
ui.onRestart = () => { paused = false; ui.hideModal(); if (curCfg) loadMatch(curCfg); };
ui.onMenu = () => { inGame = false; paused = false; stopScene(); ui.showMenu(); };
ui.onNext = () => {
  ui.hideModal();
  if (champ) {
    champ.race++;
    if (champ.race >= champ.seq.length) { finishChampionship(); return; }
    curCfg!.level = champ.seq[champ.race].level; curCfg!.trackIdx = champ.seq[champ.race].idx; loadMatch(curCfg!); return;
  }
  // próxima pista (respeita como foi escolhida: sorteia ou avança na sequência)
  if (curCfg) {
    if (curCfg.pick === 'randany') { curCfg.level = Math.floor(Math.random() * 5); curCfg.trackIdx = Math.floor(Math.random() * TRACKS_PER_LEVEL); }
    else if (curCfg.pick === 'randlevel') { curCfg.trackIdx = Math.floor(Math.random() * TRACKS_PER_LEVEL); }
    else { curCfg.trackIdx = (curCfg.trackIdx + 1) % TRACKS_PER_LEVEL; }
    loadMatch(curCfg);
  }
};

// pré-carrega volumes salvos
setMusicVol(save.get().music); setSfxVol(save.get().sfx); setMuted(save.get().muted);
settings.music = save.get().music; settings.sfx = save.get().sfx; settings.muted = save.get().muted;

let paused = false;

// -------- input de mira --------
const input = new InputController(canvas, rig.camera, rig, {
  canAim: () => inGame && !paused && humanTurn(),
  capPos: () => { const c = mgr.activeCap(); return c ? { x: c.pos.x, y: c.pos.y } : null; },
  onAim: (dx, dz, power) => { const c = mgr.activeCap(); aim.set(c.pos.x, c.pos.y, dx, dz, power); },
  onRelease: (dx, dz, power) => { aim.hide(); if (mode === 'daily') dailyFlicks++; mgr.flick({ x: dx, y: dz }, power); },
  onCancel: () => aim.hide(),
});

function stopScene(): void { if (scene) { scene.clear(); } board = null; }

// -------- fim de corrida --------
let resultsShown = false;
function onRaceOver(): void {
  if (resultsShown) return; resultsShown = true;
  const you = mgr.caps.find(c => !c.isAI);
  if (you && you.place === 1 && mode !== 'daily') save.addWin();
  if (mode === 'daily' && mgr.caps[0].finished) { save.setDailyBest(dailyKey(), dailyFlicks); }
  sfx.win();
  let champInfo: any = undefined;
  if (champ) {
    // pontos por posição
    const table = [10, 6, 4, 3, 2, 1];
    mgr.standings().forEach((c, i) => champ!.pts.set(c.id, (champ!.pts.get(c.id) || 0) + (table[i] || 0)));
    const ptsStr = 'Pontos: ' + [...champ.pts.entries()].sort((a, b) => b[1] - a[1]).map(([id, p]) => `${mgr.caps[id].name} ${p}`).slice(0, 3).join(' · ');
    champInfo = { race: champ.race + 1, total: champ.seq.length, last: champ.race + 1 >= champ.seq.length, pts: ptsStr };
  }
  ui.showResults(mgr, mode, champInfo);
}
function finishChampionship(): void {
  const win = [...champ!.pts.entries()].sort((a, b) => b[1] - a[1])[0];
  const champCap = mgr.caps[win[0]];
  if (champCap && !champCap.isAI) save.addWin();
  ui.toast('Campeão: ' + champCap.name + ' 🏆', 'good');
  champ = null; ui.onMenu?.();
}

// -------- loop --------
function resize(): void { const w = innerWidth, h = innerHeight; renderer.setSize(w, h); rig.resize(w, h); }
addEventListener('resize', resize);
addEventListener('pointerdown', () => resumeAudio(), { once: true });

ui.showMenu(); resize();
(window as any).__mgr = mgr; (window as any).__diag = { get inGame() { return inGame; }, get mode() { return mode; } };
const clock = new THREE.Clock(); let t = 0;
function frame(): void {
  const dt = Math.min(0.05, clock.getDelta()); t += dt;
  if (inGame && scene) {
    if (!paused) { mgr.update(dt); if (mgr.phase === 'over') onRaceOver(); else resultsShown = false; }
    // câmera segue a ação
    let fx0 = mgr.activeCap();
    if (mgr.phase === 'resolve') { let best = -1, bc = fx0; for (const c of mgr.caps) { const s = len(c.vel); if (c.moving && s > best) { best = s; bc = c; } } fx0 = bc; }
    if (fx0) rig.follow(fx0.pos.x, fx0.pos.y);
    rig.update(dt);
    // som/poeira de deslize
    let maxSp = 0; for (const c of mgr.caps) if (c.moving) { const s = len(c.vel); if (s > maxSp) maxSp = s; if (s > 3 && Math.random() < 0.5) { const surf = mgr.track.surfaceAt(c.pos); if (surf === 'sand' || surf === 'dirt' || surf === 'mud' || surf === 'grass') fx.dust(c.pos.x, c.pos.y, 1, surf === 'mud' ? '#5c452a' : surf === 'grass' ? '#5f8a36' : '#d8c090'); } }
    sfx.slide(maxSp);
    // pulsos dos itens especiais
    if (board) for (const p of board.pulses) { const s = 1 + Math.sin(t * 4) * 0.18; p.mesh.scale.set(s, s, 1); (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.22 + Math.sin(t * 4) * 0.12; }
    caps.update(mgr.caps, t, mgr.activeCap()?.id ?? -1);
    fx.update(dt);
    renderer.render(scene, rig.camera);
  }
  requestAnimationFrame(frame);
}
frame();

function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
