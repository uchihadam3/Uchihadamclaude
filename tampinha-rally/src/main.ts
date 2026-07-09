// Ponto de entrada: monta render/áudio/UI, gerencia os modos e roda o loop.
import * as THREE from 'three';
import { makeRenderer, makeScene, makeSun, CameraRig } from './render/scene';
import { buildBoard, BoardBuild } from './render/board';
import { CapsRenderer } from './render/caps';
import { Particles, Aim } from './render/fx';
import { GameManager, PlayerDef } from './game/manager';
import { track, TRACKS_PER_LEVEL, withChaosItems } from './game/generator';
import { SURF, len } from './engine/core';
import { InputController } from './input';
import { UI, MatchConfig, Mode, opponentSkins } from './ui';
import { AI_KINDS } from './game/ai';
import { Online } from './net/online';
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
const online = new Online();

let mode: Mode = 'quick';
let curCfg: MatchConfig | null = null;
let champ: { seq: { level: number; idx: number }[]; race: number; pts: Map<number, number>; fmt: string } | null = null;
let elim: { players: PlayerDef[]; level: number; race: number; out: { name: string; skin: string }[] } | null = null;
let dailyFlicks = 0;
let inGame = false;
let previewing = false;
let previewDef: any = null;
let musicStarted = false;

// carrega a cena de uma pista e prepara a partida
function loadMatch(cfg: MatchConfig): void {
  curCfg = cfg; mode = cfg.mode; dailyFlicks = 0;
  let def = cfg.customTrack ? cfg.customTrack : track(cfg.level, cfg.trackIdx);
  if (cfg.mode === 'caos') def = withChaosItems(def);       // caixas de power-up só no Caos
  scene = makeScene(def.bg);
  makeSun(scene, def.w, def.h);
  board = buildBoard(def); scene.add(board.group);
  scene.add(caps.group, fx.points, aim.group);
  rig = new CameraRig(def.w, def.h); rig.setFrustum(21, innerWidth, innerHeight); resize();
  mgr.setup(def, cfg.players);
  mgr.chaos = cfg.mode === 'caos';
  mgr.manualControl = cfg.mode === 'online'; online.bind(mgr);
  caps.build(mgr.caps);
  input.setCamera(rig.camera, rig);
  ui.showGame(); inGame = true;
  if (!musicStarted) { startMusic(); musicStarted = true; }
  ui.updateHUD(mgr, humanTurn());
}

// no online: só posso mirar quando é a vez do MEU assento; senão, comportamento normal
function humanTurn(): boolean { return mgr.phase === 'aim' && (online.active ? online.controlsActiveSeat() : !mgr.activeCap().isAI); }

// -------- callbacks do manager (som + efeitos + HUD) --------
mgr.onToast = (msg, kind) => ui.toast(msg, kind);
mgr.onChange = () => ui.updateHUD(mgr, humanTurn());
mgr.onFlick = (cap, power) => { sfx.flick(power); const s = SURF[mgr.track.surfaceAt(cap.pos)]; fx.dust(cap.pos.x, cap.pos.y, 8); aim.hide(); };
mgr.onItem = (cap, item, used) => { sfx.bonus(); fx.impact(cap.pos.x, cap.pos.y, 10, used ? '#ff9de0' : '#b98cff'); };
mgr.onEvent = (e) => {
  switch (e.type) {
    case 'wall': sfx.wall(e.power); fx.impact(e.x, e.y, e.power * 0.4, '#ffe6b0'); break;
    case 'stone': sfx.wall(e.power); fx.impact(e.x, e.y, e.power * 0.5, '#e8e0d0'); break;
    case 'capHit': sfx.clack(e.power); fx.impact(e.x, e.y, e.power * 0.6, '#fff'); break;
    case 'hole': sfx.hole(); fx.dust(e.x, e.y, 14, '#3a2c1a'); break;
    case 'bomb': sfx.bad(); fx.impact(e.x, e.y, 10, '#ff8a5a'); break;
    case 'bonus': sfx.bonus(); fx.impact(e.x, e.y, 10, '#8affc0'); break;
    case 'out': sfx.bad(); fx.dust(e.x, e.y, 10, '#cbb58a'); break;
    case 'ramp': sfx.bonus(); fx.impact(e.x, e.y, 8, '#9dffb8'); break;
    case 'land': sfx.wall(4); fx.dust(e.x, e.y, 14, '#d8c090'); break;
    case 'finish': fx.confetti(e.x, e.y); break;
  }
};

// -------- UI --------
const ui = new UI({
  start: (cfg) => {
    if (online.active) online.leave();
    resumeAudio();
    if (cfg.mode === 'champ') {
      const fmt = cfg.champFmt || 'copa';
      const shuf = (a: number[]) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
      let seq: { level: number; idx: number }[];
      if (fmt === 'gp') seq = [0, 1, 2, 3, 4].map(l => ({ level: l, idx: Math.floor(Math.random() * TRACKS_PER_LEVEL) }));   // dificuldade crescente
      else { const n = fmt === 'sprint' ? 3 : fmt === 'maratona' ? 7 : 5; seq = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n).map(idx => ({ level: cfg.level, idx })); }
      champ = { seq, race: 0, pts: new Map(), fmt };
      cfg.level = seq[0].level; cfg.trackIdx = seq[0].idx;
    }
    else champ = null;
    if (cfg.mode === 'elim') { elim = { players: cfg.players.slice(), level: cfg.level, race: 0, out: [] }; cfg.trackIdx = Math.floor(Math.random() * TRACKS_PER_LEVEL); }
    else elim = null;
    loadMatch(cfg);
  },
  setVols: (m, s, mu) => { setMusicVol(m); setSfxVol(s); setMuted(mu); save.setVols(m, s, mu); },
  setSkin: (id) => { save.setSkin(id); sfx.ui(); },
  preview: (def) => enterPreview(def),
}, online);

// -------- multiplayer online: início/lobby/fim geridos aqui (cena + IA do host) --------
online.onStartMatch = (players, level, trackIdx) => { curCfg = null; champ = null; resultsShown = false; loadMatch({ level, trackIdx, pick: 'specific', players, mode: 'online' }); };
online.onToLobby = () => { inGame = false; paused = false; resultsShown = false; stopScene(); ui.showLobby(); };
online.onClosed = () => { const wasIn = inGame; inGame = false; paused = false; resultsShown = false; if (wasIn) stopScene(); ui.showOnlineHome(); };
online.onChampStanding = (rows, race, total, last) => ui.showOnlineChampStanding(rows, race, total, last, online.isHost);
online.onChampEnd = (winner) => { resultsShown = true; if (winner.you) save.addWin(); sfx.win(); ui.showChampion({ rows: [], fmt: 'champ', youWon: winner.you, name: winner.name, skin: winner.skin }); };

ui.onUseItem = () => { if (online.active) online.localUseItem(); else mgr.useItem(); };
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
  if (elim && curCfg) {
    // tira o último colocado da corrida que acabou
    const order = mgr.standings(); const loser = order[order.length - 1];
    elim.players = elim.players.filter(p => !(p.name === loser.name && p.skin === loser.skin));
    if (elim.players.length <= 1) {   // sobrou 1 → campeão
      const champCap = elim.players[0];
      const youWon = champCap && !champCap.isAI;
      if (youWon) save.addWin();
      ui.showChampion({ rows: [], fmt: 'elim', youWon: !!youWon, name: champCap ? champCap.name : '', skin: champCap ? champCap.skin : 'coca' });
      elim = null; return;
    }
    elim.race++; curCfg.players = elim.players; curCfg.trackIdx = Math.floor(Math.random() * TRACKS_PER_LEVEL);
    loadMatch(curCfg); return;
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
  onRelease: (dx, dz, power) => { aim.hide(); if (mode === 'daily' || mode === 'trial') dailyFlicks++; if (online.active) online.localFlick({ x: dx, y: dz }, power); else mgr.flick({ x: dx, y: dz }, power); },
  onCancel: () => aim.hide(),
  // EDITOR 3D: arrastar objetos / apagar muro na maquete
  editMode: () => previewing ? ui.previewEditMode() : 'off',
  onEditDown: (x, z) => { if (ui.preview3D('down', x, z)) rebuildPreviewBoard(); },
  onEditMove: (x, z) => { if (ui.preview3D('move', x, z)) rebuildPreviewBoardThrottled(); },
  onEditUp: () => { if (ui.preview3D('up', 0, 0)) rebuildPreviewBoard(); },
});

function stopScene(): void { if (scene) { scene.clear(); } board = null; previewing = false; }

// -------- PRÉVIA 3D da pista do editor (vê a maquete real, sem jogar) --------
function enterPreview(def: any): void {
  inGame = false; paused = false; previewDef = def;
  scene = makeScene(def.bg); makeSun(scene, def.w, def.h);
  board = buildBoard(def); scene.add(board.group);
  rig = new CameraRig(def.w, def.h);
  rig.frustum = Math.min(60, Math.max(def.w, def.h) * 0.42); rig.resize(innerWidth, innerHeight); rig.place();
  input.setCamera(rig.camera, rig);
  previewing = true;
  ui.showPreviewBar();
}
let lastPrevRebuild = 0;
function rebuildPreviewBoard(): void {
  if (!previewing || !scene) return;
  previewDef = ui.rebuildPreviewDef();
  if (board) { scene.remove(board.group); board.group.traverse((o: any) => { o.geometry?.dispose?.(); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: any) => m.dispose?.()); }); }
  board = buildBoard(previewDef); scene.add(board.group);
}
function rebuildPreviewBoardThrottled(): void { const now = performance.now(); if (now - lastPrevRebuild < 70) return; lastPrevRebuild = now; rebuildPreviewBoard(); }
ui.onPreviewBack = () => { previewing = false; stopScene(); ui.showEditor(); };
ui.onPreviewPlay = () => { previewing = false; stopScene(); if (previewDef) loadMatch({ level: 2, trackIdx: 0, pick: 'specific', players: previewPlayers(), mode: 'quick', customTrack: previewDef }); };
function previewPlayers(): PlayerDef[] {
  const opp = opponentSkins(save.skin(), 3);
  const names = ['Bolha', 'Zé', 'Nina', 'Tato'];
  return [{ name: 'Você', isAI: false, skin: save.skin() }, ...opp.map((sk, i) => ({ name: names[i % names.length], isAI: true, ai: AI_KINDS[i % AI_KINDS.length], skin: sk }))];
}

// -------- fim de corrida --------
let resultsShown = false;
function onRaceOver(): void {
  if (resultsShown) return; resultsShown = true;
  sfx.win();

  // ---- CONTRA-RELÓGIO: pontuação por petelecos ----
  if (mode === 'trial') {
    const done = mgr.caps[0].finished;
    const rec = done && curCfg ? save.setTrialBest(curCfg.level, curCfg.trackIdx, dailyFlicks) : false;
    ui.showTrialResult({ finished: done, flicks: dailyFlicks, best: curCfg ? save.trialBest(curCfg.level, curCfg.trackIdx) : undefined, record: rec });
    return;
  }
  // ---- DUPLA: soma de colocações por time ----
  if (mode === 'dupla') {
    const teamIds = [...new Set(mgr.caps.map(c => c.team))].sort();
    const teams = teamIds.map(tid => {
      const members = mgr.caps.filter(c => c.team === tid).map(c => ({ name: c.name, skin: c.skin, place: c.place, you: !c.isAI }));
      const score = members.reduce((s, m) => s + m.place, 0);
      return { tid, score, members, hasYou: members.some(m => m.you) };
    }).sort((a, b) => a.score - b.score);
    const won = teams[0].hasYou;
    if (won) save.addWin();
    ui.showTeamResult({ teams: teams.map((t, i) => ({ label: 'Time ' + (t.tid === 0 ? 'A' : 'B'), score: t.score, members: t.members, win: i === 0, you: t.hasYou })), won });
    return;
  }
  // ---- ELIMINAÇÃO: o último colocado sai ----
  if (mode === 'elim' && elim) {
    const order = mgr.standings();
    const loser = order[order.length - 1];
    elim.out.push({ name: loser.name, skin: loser.skin });
    const survivors = order.slice(0, -1).map(c => ({ name: c.name, skin: c.skin, you: !c.isAI }));
    const youOut = !loser.isAI;
    const last = survivors.length <= 1;
    ui.showElimResult({ loser: { name: loser.name, skin: loser.skin }, survivors, youOut, last, championName: last ? survivors[0]?.name : '' });
    return;
  }

  // ---- ONLINE: campeonato (host soma pontos e transmite) / dupla (times) ----
  if (online.active && online.isChamp()) { if (online.isHost) online.hostFinishRace(mgr); return; }
  if (online.active && mgr.teams > 0) {
    const teamIds = [...new Set(mgr.caps.map(c => c.team))].sort();
    const teams = teamIds.map(tid => {
      const members = mgr.caps.filter(c => c.team === tid).map(c => ({ name: c.name, skin: c.skin, place: c.place, you: c.id === online.mySeatIndex() }));
      return { tid, score: members.reduce((s, m) => s + m.place, 0), members, hasYou: members.some(m => m.you) };
    }).sort((a, b) => a.score - b.score);
    const won = teams[0].hasYou;
    if (won) save.addWin();
    ui.showResults(mgr, mode, undefined, { teams: teams.map((t, i) => ({ label: 'Time ' + (t.tid === 0 ? 'A' : 'B'), score: t.score, members: t.members, win: i === 0, you: t.hasYou })), won });
    return;
  }

  const you = online.active ? mgr.caps[online.mySeatIndex()] : mgr.caps.find(c => !c.isAI);
  if (you && you.place === 1 && mode !== 'daily') save.addWin();
  if (mode === 'daily' && mgr.caps[0].finished) { save.setDailyBest(dailyKey(), dailyFlicks); }
  let champInfo: any = undefined;
  if (champ) {
    const table = [12, 9, 7, 5, 3, 1];   // pontos por posição na corrida
    mgr.standings().forEach((c, i) => champ!.pts.set(c.id, (champ!.pts.get(c.id) || 0) + (table[i] || 0)));
    const rows = [...champ.pts.entries()].sort((a, b) => b[1] - a[1]).map(([id, p]) => ({ name: mgr.caps[id].name, skin: mgr.caps[id].skin, pts: p, you: !mgr.caps[id].isAI }));
    champInfo = { race: champ.race + 1, total: champ.seq.length, last: champ.race + 1 >= champ.seq.length, rows, fmt: champ.fmt };
  }
  ui.showResults(mgr, mode, champInfo);
}
function finishChampionship(): void {
  const sorted = [...champ!.pts.entries()].sort((a, b) => b[1] - a[1]);
  const rows = sorted.map(([id, p]) => ({ name: mgr.caps[id].name, skin: mgr.caps[id].skin, pts: p, you: !mgr.caps[id].isAI }));
  const champCap = mgr.caps[sorted[0][0]];
  const youWon = !!champCap && !champCap.isAI;
  if (youWon) save.addWin();
  sfx.win();
  const fmt = champ!.fmt; champ = null;
  ui.showChampion({ rows, fmt, youWon, name: champCap ? champCap.name : '', skin: champCap ? champCap.skin : 'coca' });
}

// -------- loop --------
function resize(): void { const w = innerWidth, h = innerHeight; renderer.setSize(w, h); rig.resize(w, h); }
addEventListener('resize', resize);
addEventListener('pointerdown', () => resumeAudio(), { once: true });

ui.showMenu(); resize();
// pista compartilhada por link (#p=...) → oferece jogar/editar
try { const h = location.hash || ''; const mtc = h.match(/[#&]p=([^&]+)/); if (mtc) { ui.importSharedTrack(mtc[1]); history.replaceState(null, '', location.pathname + location.search); } } catch {}
(window as any).__mgr = mgr; (window as any).__ui = ui; (window as any).__diag = { get inGame() { return inGame; }, get mode() { return mode; } };
const clock = new THREE.Clock(); let t = 0;
function frame(): void {
  const dt = Math.min(0.05, clock.getDelta()); t += dt;
  if (previewing && scene) {
    // câmera controlada pelo usuário (um dedo gira, dois dedos = zoom); sem giro automático
    if (board) for (const sp of board.spinners) sp.rotation.y += dt * 2.4;
    if (board) for (const bb of board.billboards) bb.quaternion.copy(rig.camera.quaternion);
    renderer.render(scene, rig.camera);
    requestAnimationFrame(frame); return;
  }
  if (inGame && scene) {
    if (!paused) { if (online.active) online.tick(dt); mgr.update(dt); if (mgr.phase === 'over') onRaceOver(); else resultsShown = false; }
    // câmera SEMPRE no jogador da vez (nunca chuta pra uma tampinha que já chegou).
    // No resolve segue a tampinha ativa enquanto ela anda; se ela parar/chegar,
    // acompanha o que ainda rola (nunca uma já-finalizada) e nunca salta pra chegada.
    let fx0 = mgr.activeCap();
    if (mgr.phase === 'resolve') {
      const act = mgr.activeCap();
      if (act && act.moving && !act.finished) fx0 = act;
      else { let best = -1; let bc = act; for (const c of mgr.caps) { if (c.finished || !c.moving) continue; const s = len(c.vel); if (s > best) { best = s; bc = c; } } fx0 = bc; }
    }
    if (fx0 && !fx0.finished) rig.follow(fx0.pos.x, fx0.pos.y);
    rig.update(dt);
    // som/poeira de deslize
    let maxSp = 0; for (const c of mgr.caps) if (c.moving) { const s = len(c.vel); if (s > maxSp) maxSp = s; if (s > 3 && Math.random() < 0.5) { const surf = mgr.track.surfaceAt(c.pos); if (surf === 'sand' || surf === 'dirt' || surf === 'mud' || surf === 'grass') fx.dust(c.pos.x, c.pos.y, 1, surf === 'mud' ? '#5c452a' : surf === 'grass' ? '#5f8a36' : '#d8c090'); } }
    sfx.slide(maxSp);
    // pulsos dos itens especiais
    if (board) for (const p of board.pulses) { const s = 1 + Math.sin(t * 4) * 0.18; p.mesh.scale.set(s, s, 1); (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.22 + Math.sin(t * 4) * 0.12; }
    if (board) for (const sp of board.spinners) { sp.rotation.y += dt * 2.4; sp.position.y += Math.sin(t * 3 + sp.position.x) * 0.004; }
    if (board) for (const bb of board.billboards) bb.quaternion.copy(rig.camera.quaternion);   // números (bônus/checkpoint) sempre virados pra câmera
    caps.update(mgr.caps, t, mgr.activeCap()?.id ?? -1);
    fx.update(dt);
    renderer.render(scene, rig.camera);
  }
  requestAnimationFrame(frame);
}
frame();

function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
