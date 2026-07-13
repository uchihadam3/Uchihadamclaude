// Ponto de entrada: monta render/áudio/UI, gerencia os modos e roda o loop.
import * as THREE from 'three';
import { makeRenderer, makeScene, makeSun, CameraRig } from './render/scene';
import { buildBoard, BoardBuild } from './render/board';
import { CapsRenderer } from './render/caps';
import { Particles, Aim } from './render/fx';
import { GameManager, PlayerDef } from './game/manager';
import { track, TRACKS_PER_LEVEL, withChaosItems, seededTrack, battleArena } from './game/generator';
import { SURF, len } from './engine/core';
import { InputController } from './input';
import { UI, MatchConfig, Mode, opponentSkins } from './ui';
import { AI_KINDS } from './game/ai';
import { Online } from './net/online';
import { sfx, resumeAudio, setMusicVol, setSfxVol, setMuted, settings, audioCtx, musicBus } from './audio';
import { playMusic, songForTheme, musicNow } from './music';
import { save } from './game/save';
import { compById, campState, saveCamp, applyResult } from './game/campaign';
import { rankCompById, RANK_PTS, rankState } from './game/ranked';
import { watchUpdates } from './updater';
import { initI18n } from './i18n';
import { weatherFor, randomWeather, WeatherState } from './game/weather';
import { DailyNet } from './net/daily';

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
const dailyNet = new DailyNet();   // ranking MUNDIAL do desafio diário

let mode: Mode = 'quick';
let curCfg: MatchConfig | null = null;
let champ: { seq: { level: number; idx: number }[]; race: number; pts: Map<number, number>; fmt: string; hist: number[] } | null = null;
let elim: { players: PlayerDef[]; orig: PlayerDef[]; level: number; race: number; out: { name: string; skin: string }[]; seed: number } | null = null;
let camp: { compId: string; race: number; pts: Map<number, number>; hist: number[] } | null = null;
let rank: { compId: string; race: number; pts: Map<number, number>; hist: number[]; circ: 'normal' | 'caos' } | null = null;
let dailyFlicks = 0;
let myFalls = 0;      // quedas do jogador NESTA corrida (vai pra carreira da tampinha)
let inGame = false;
let previewing = false;
let previewDef: any = null;
// auto-atualização: link antigo pula sozinho pra versão mais nova (nunca no meio de uma corrida)
watchUpdates(() => !inGame);
initI18n();   // tradutor de interface PT ↔ EN (botão no menu)
// música: menu toca a partir do primeiro toque na tela (regra de autoplay dos navegadores)
window.addEventListener('pointerdown', () => { resumeAudio(); if (!inGame) playMusic('menu'); });

// carrega a cena de uma pista e prepara a partida
function loadMatch(cfg: MatchConfig): void {
  curCfg = cfg; mode = cfg.mode; dailyFlicks = 0; myFalls = 0;
  mgr.battle = cfg.mode === 'batalha';   // ANTES do setup: muda largada (roda) e regras
  let def = cfg.customTrack ? cfg.customTrack : cfg.mode === 'batalha' ? battleArena() : track(cfg.level, cfg.trackIdx);
  const chaosOn = cfg.mode === 'caos' || cfg.rankCirc === 'caos';   // Caos avulso OU Ranqueada Caos
  if (chaosOn) def = withChaosItems(def);                    // caixas de power-up na pista
  fx3Clear();
  // CLIMA: determinístico nas competições/diário/online (mesma etapa = mesmo céu);
  // aleatório no jogo avulso — cada corrida com a sua cara
  let wx: WeatherState;
  if (cfg.mode === 'camp' && cfg.campComp) wx = weatherFor(campState().seed, cfg.campComp, camp?.race ?? 0);
  else if (cfg.mode === 'rank' && cfg.rankComp) wx = weatherFor(rankState(cfg.rankCirc || 'normal').seed, cfg.rankComp, rank?.race ?? 0);
  else if (cfg.mode === 'daily') { const dd = new Date(); wx = weatherFor(dd.getFullYear() * 372 + (dd.getMonth() + 1) * 31 + dd.getDate(), 'daily', 0); }
  else if (cfg.mode === 'online') wx = weatherFor(cfg.level * 131 + cfg.trackIdx * 7 + 3, 'online', 0);
  else wx = randomWeather();
  scene = makeScene(def.bg, wx.w);
  makeSun(scene, def.w, def.h, wx.w);
  mgr.setup(def, cfg.players);
  mgr.track.wind = { x: wx.windX, y: wx.windY };
  // CHUVA deixa poças de verdade na pista (posições determinísticas pela etapa)
  if (wx.w === 'chuva') {
    let r = wx.salt >>> 0;
    const rng = () => { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; return r / 4294967296; };
    for (let i = 0; i < 3; i++) {
      const a = (0.14 + 0.26 * i + rng() * 0.14) * mgr.track.total;
      const at = mgr.track.atArc(a); const pv = { x: -at.tan.y, y: at.tan.x };
      const off = (rng() - 0.5) * mgr.track.nearest(at.p).half * 1.1;
      mgr.track.def.patches.push({ surface: 'water', x: at.p.x + pv.x * off, y: at.p.y + pv.y * off, r: 1.5 + rng() * 0.8 });
    }
  }
  // IMPORTANTE: o board 3D observa a CÓPIA da pista (mgr.track.def) — é nela que
  // o catavento gira, a bexiga estoura e o carrinho anda; a def original é cache
  board = buildBoard(mgr.track.def); scene.add(board.group);
  scene.add(caps.group, fx.points, aim.group);
  // BATALHA: anel mostrando a borda da área segura — encolhe junto com a mesa
  if (mgr.battle) {
    const r0 = mgr.track.def.half[0] + 3;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r0, 0.16, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xff5544, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(def.w / 2, 0.08, def.h / 2);
    scene.add(ring);
    mgr.onBattleShrink = (safeR) => { const k = safeR / r0; ring.scale.set(k, k, 1); sfx.thud(); fx.dust(def.w / 2, def.h / 2, 20, '#ff8866'); };
  } else mgr.onBattleShrink = () => {};
  if (wx.w === 'chuva') fx3RainFall(def.w, def.h);
  if (wx.w === 'vento') fx3WindSpecks(def.w, def.h, wx.windX, wx.windY);
  ui.setWeather(wx);
  rig = new CameraRig(def.w, def.h); rig.setFrustum(21, innerWidth, innerHeight); resize();
  mgr.chaos = chaosOn;
  mgr.manualControl = cfg.mode === 'online'; online.bind(mgr);
  caps.build(mgr.caps);
  input.setCamera(rig.camera, rig);
  ui.showGame(); inGame = true;
  playMusic(songForTheme(def.theme));   // cada cenário tem a sua música de corrida
  ui.updateHUD(mgr, humanTurn());
}

// no online: só posso mirar quando é a vez do MEU assento; senão, comportamento normal
function humanTurn(): boolean { return mgr.phase === 'aim' && (online.active ? online.controlsActiveSeat() : !mgr.activeCap().isAI); }

// -------- callbacks do manager (som + efeitos + HUD) --------
mgr.onToast = (msg, kind) => ui.toast(msg, kind);
mgr.onEvent = (e) => { const cp = mgr.caps[e.capId]; if ((e.type === 'hole' || e.type === 'out') && cp && !cp.isAI) myFalls++; };
mgr.onChange = () => ui.updateHUD(mgr, humanTurn());
mgr.onFlick = (cap, power) => { if ((mode === 'daily' || mode === 'trial') && !cap.isAI) dailyFlicks++; sfx.flick(power); const s = SURF[mgr.track.surfaceAt(cap.pos)]; fx.dust(cap.pos.x, cap.pos.y, 8); aim.hide(); };
// pegar a caixinha: explosão roxa + faíscas subindo (usar tem efeito próprio, abaixo)
mgr.onItem = (cap, item, used) => {
  if (!used) {
    sfx.bonus();
    fx.impact(cap.pos.x, cap.pos.y, 12, '#b98cff');
    for (let i = 0; i < 3; i++) setTimeout(() => fx.dust(cap.pos.x, cap.pos.y, 6, '#e0c8ff'), i * 90);
  }
};
// ---------------- EFEITOS 3D DOS PODERES (Caos) ----------------
// objetinhos de verdade na cena (bolinha voando, furacão, raio…), cada um com
// o próprio updater; roda no loop e se auto-remove no fim
type Fx3 = (dt: number) => boolean;
let fx3d: Fx3[] = [];
function fx3Clear(): void { fx3d = []; }
function fx3Gone(o: THREE.Object3D): void {
  scene?.remove(o);
  o.traverse((m: any) => { m.geometry?.dispose?.(); if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((mm: any) => mm.dispose?.()); });
}
const M = (color: string, opts: any = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.35, ...opts });

// CHUVA caindo: pontinhos azulados despencando sobre a mesa, em loop
function fx3RainFall(w: number, h: number): void {
  if (!scene) return;
  const N = 420; const pos = new Float32Array(N * 3); const spd = new Float32Array(N);
  for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * w; pos[i * 3 + 1] = 6 + Math.random() * 26; pos[i * 3 + 2] = Math.random() * h; spd[i] = 26 + Math.random() * 14; }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xaaccee, size: 0.16, transparent: true, opacity: 0.55, depthWrite: false }));
  scene.add(pts);
  fx3d.push((dt) => {
    const a = g.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) { let y = a.getY(i) - spd[i] * dt; if (y < 0) y = 6 + Math.random() * 26; a.setY(i, y); }
    a.needsUpdate = true; return true;
  });
}
// VENTO visível: ciscos claros derivando na direção do vento (dá pra LER o vento)
function fx3WindSpecks(w: number, h: number, wxv: number, wyv: number): void {
  if (!scene) return;
  const N = 40; const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * w; pos[i * 3 + 1] = 0.4 + Math.random() * 2.2; pos[i * 3 + 2] = Math.random() * h; }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xfff2cc, size: 0.22, transparent: true, opacity: 0.7, depthWrite: false }));
  scene.add(pts);
  const k = 9 / Math.max(0.2, Math.hypot(wxv, wyv));
  fx3d.push((dt) => {
    const a = g.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      let x = a.getX(i) + wxv * k * dt, z = a.getZ(i) + wyv * k * dt;
      if (x < 0) x += w; if (x > w) x -= w; if (z < 0) z += h; if (z > h) z -= h;
      a.setX(i, x); a.setZ(i, z);
    }
    a.needsUpdate = true; return true;
  });
}

// anel de choque no chão (cresce e some)
function fx3Ring(x: number, y: number, col: string, r1 = 2.6, dur = 0.5): void {
  if (!scene) return;
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.72, 28), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.06, y); scene.add(ring);
  let t = 0;
  fx3d.push((dt) => { t += dt / dur; const k = Math.min(1, t); const sc = 0.6 + k * (r1 - 0.6); ring.scale.set(sc, sc, 1); (ring.material as any).opacity = 0.9 * (1 - k); if (k >= 1) { fx3Gone(ring); return false; } return true; });
}
// faíscas SUBINDO (bolinhas brilhantes que sobem e somem)
function fx3Rise(x: number, y: number, col: string, n = 8, dur = 0.8): void {
  if (!scene) return;
  const g = new THREE.Group(); scene.add(g);
  const ps: { m: THREE.Mesh; vx: number; vz: number; vy: number }[] = [];
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.09 + Math.random() * 0.08, 6, 5), new THREE.MeshBasicMaterial({ color: col, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    m.position.set(x + (Math.random() - 0.5) * 0.9, 0.3, y + (Math.random() - 0.5) * 0.9);
    g.add(m); ps.push({ m, vx: (Math.random() - 0.5) * 1.2, vz: (Math.random() - 0.5) * 1.2, vy: 2.4 + Math.random() * 2 });
  }
  let t = 0;
  fx3d.push((dt) => {
    t += dt / dur; for (const p of ps) { p.m.position.x += p.vx * dt; p.m.position.z += p.vz * dt; p.m.position.y += p.vy * dt; (p.m.material as any).opacity = 1 - t; }
    if (t >= 1) { fx3Gone(g); return false; } return true;
  });
}
// BOLINHA DE GUDE: esfera vidrada voando em arco do atirador até o alvo, e ESTOURA
function fx3Marble(x1: number, y1: number, x2: number, y2: number, onHit?: () => void): void {
  if (!scene) return;
  const g = new THREE.Group();
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), new THREE.MeshPhysicalMaterial({ color: '#b98cff', roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.92 } as any));
  const veio = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.06, 8, 16), M('#fff', { roughness: 0.2 }));
  veio.rotation.x = 0.8; g.add(orb, veio); scene.add(g);
  const dur = Math.max(0.35, Math.min(0.7, Math.hypot(x2 - x1, y2 - y1) / 30));
  let t = 0;
  fx3d.push((dt) => {
    t += dt / dur; const k = Math.min(1, t);
    g.position.set(x1 + (x2 - x1) * k, 0.45 + Math.sin(Math.PI * k) * 2.0, y1 + (y2 - y1) * k);
    g.rotation.x += dt * 14; g.rotation.z += dt * 9;
    if (k >= 1) { fx3Gone(g); sfx.clack(9); fx.impact(x2, y2, 14, '#c9a0ff'); fx3Ring(x2, y2, '#c9a0ff', 2.4, 0.4); onHit?.(); return false; }
    return true;
  });
}
// FURACÃO: funil de anéis girando que passa varrendo cada rival
function fx3Tornado(x: number, y: number, dur = 1.2): void {
  if (!scene) return;
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const r = 0.45 + i * 0.32;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.09 + i * 0.02, 8, 22), new THREE.MeshBasicMaterial({ color: i % 2 ? '#bfe8ff' : '#e8f6ff', transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.3 + i * 0.55; (ring as any).ph = i * 1.3;
    g.add(ring);
  }
  g.position.set(x, 0, y); g.scale.set(0.2, 0.2, 0.2); scene.add(g);
  let t = 0;
  fx3d.push((dt) => {
    t += dt / dur; const k = Math.min(1, t);
    g.rotation.y += dt * 16;
    const pop = k < 0.2 ? k / 0.2 : k > 0.8 ? (1 - k) / 0.2 : 1;
    g.scale.set(pop, pop, pop);
    g.children.forEach((r: any, i: number) => { r.position.x = Math.sin(t * 9 + r.ph) * 0.12; r.position.z = Math.cos(t * 9 + r.ph) * 0.12; });
    if (Math.random() < 0.3) fx.dust(x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2, 2, '#bfe8ff');
    if (k >= 1) { fx3Gone(g); return false; }
    return true;
  });
}
// RAIO: coluna de luz despenca do céu com clarão e onda de choque
function fx3Bolt(x: number, y: number): void {
  if (!scene) return;
  const g = new THREE.Group();
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.22, 11, 8), new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
  const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.55, 11, 8), new THREE.MeshBasicMaterial({ color: '#ffe36a', transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  core.position.y = glow.position.y = 5.5; g.add(glow, core);
  g.position.set(x, 0, y); g.scale.y = 0.05; scene.add(g);
  let t = 0;
  fx3d.push((dt) => {
    t += dt / 0.45; const k = Math.min(1, t);
    g.scale.y = k < 0.25 ? k / 0.25 : 1;
    const fade = k < 0.25 ? 1 : 1 - (k - 0.25) / 0.75;
    (core.material as any).opacity = fade; (glow.material as any).opacity = 0.55 * fade * (0.7 + Math.sin(t * 40) * 0.3);
    if (k >= 1) { fx3Gone(g); return false; }
    return true;
  });
  fx3Ring(x, y, '#ffe36a', 3.2, 0.5);
}
// NUVEM DE CHUVA: nuvenzinha paira e pinga gotas de verdade antes da poça
function fx3Cloud(x: number, y: number): void {
  if (!scene) return;
  const g = new THREE.Group();
  for (const [dx, dz, r] of [[-0.5, 0, 0.55], [0.5, 0.1, 0.5], [0, -0.15, 0.65], [0.1, 0.3, 0.45]] as [number, number, number][]) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), M('#aeb8c2', { roughness: 0.9, transparent: true, opacity: 0.92 }));
    puff.position.set(dx, 0, dz); g.add(puff);
  }
  g.position.set(x, 4.2, y); g.scale.set(0.1, 0.1, 0.1); scene.add(g);
  let t = 0; let drip = 0;
  fx3d.push((dt) => {
    t += dt / 1.5; const k = Math.min(1, t);
    const pop = k < 0.15 ? k / 0.15 : k > 0.85 ? (1 - k) / 0.15 : 1;
    g.scale.set(pop, pop, pop);
    g.position.y = 4.2 + Math.sin(t * 6) * 0.1;
    drip -= dt;
    if (drip <= 0 && k < 0.8) {                       // solta uma GOTA que cai de verdade
      drip = 0.12;
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 5), new THREE.MeshBasicMaterial({ color: '#7ac8f2', transparent: true, opacity: 0.95 }));
      d.position.set(x + (Math.random() - 0.5) * 1.6, 3.8, y + (Math.random() - 0.5) * 1.6);
      scene!.add(d);
      fx3d.push((dt2) => { d.position.y -= dt2 * 9; if (d.position.y <= 0.1) { fx.dust(d.position.x, d.position.z, 2, '#7ac8f2'); fx3Gone(d); return false; } return true; });
    }
    if (k >= 1) { fx3Gone(g); return false; }
    return true;
  });
}
// ÂNCORA: peso de metal despenca em cima do líder e some afundando
function fx3Anchor(x: number, y: number): void {
  if (!scene) return;
  const g = new THREE.Group();
  const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.6, 8), M('#6b7078', { metalness: 0.7, roughness: 0.35 }));
  haste.position.y = 0.9;
  const arco = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.14, 8, 16, Math.PI), M('#6b7078', { metalness: 0.7, roughness: 0.35 }));
  arco.rotation.z = Math.PI; arco.position.y = 0.42;
  const olho = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 8, 12), M('#8a9098', { metalness: 0.7 }));
  olho.position.y = 1.75;
  g.add(haste, arco, olho); g.position.set(x, 7, y); scene.add(g);
  let t = 0;
  fx3d.push((dt) => {
    t += dt;
    if (t < 0.32) { g.position.y = 7 - (t / 0.32) * (t / 0.32) * 7; return true; }   // queda acelerando
    if (t < 0.4 && g.position.y !== 0) { g.position.y = 0; sfx.thud(); fx.impact(x, y, 13, '#9aa2ac'); fx3Ring(x, y, '#9aa2ac', 2.6, 0.45); }
    if (t > 1.1) { g.position.y -= dt * 2.5; g.scale.multiplyScalar(1 - dt * 1.6); if (g.scale.x < 0.08) { fx3Gone(g); return false; } }
    return true;
  });
}
// CHICLETE: bolota rosa esparrama no chão (e fica a mancha, igual a poça)
function fx3Gum(x: number, y: number): void {
  if (!scene) return;
  const blob = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 12), M('#ff9de0', { roughness: 0.3 }));
  blob.scale.set(0.1, 0.06, 0.1); blob.position.set(x, 0.05, y); scene.add(blob);
  const mancha = new THREE.Mesh(new THREE.CircleGeometry(1.5, 24), new THREE.MeshStandardMaterial({ color: '#ff9de0', roughness: 0.35, transparent: true, opacity: 0.85 }));
  mancha.rotation.x = -Math.PI / 2; mancha.position.set(x, 0.025, y); scene.add(mancha);   // fica na pista
  let t = 0;
  fx3d.push((dt) => {
    t += dt / 0.6; const k = Math.min(1, t);
    const s = 0.1 + k * 1.4 + Math.sin(k * 12) * 0.06 * (1 - k);
    blob.scale.set(s, 0.06 + (1 - k) * 0.25, s);
    if (k >= 1) { fx3Gone(blob); return false; }
    return true;
  });
}

// pegar a caixinha: efeito SEM texto — estouro roxo + faíscas subindo
mgr.onItem = (cap, item, used) => {
  if (!used) {
    sfx.bonus();
    fx.impact(cap.pos.x, cap.pos.y, 12, '#b98cff');
    fx3Ring(cap.pos.x, cap.pos.y, '#b98cff', 2.2, 0.45);
    fx3Rise(cap.pos.x, cap.pos.y, '#e0c8ff', 9, 0.8);
  }
};
// efeitos dos PODERES do Caos — valem pra você E pras IAs (o manager avisa daqui)
mgr.onItemFx = (id, d) => {
  switch (id) {
    case 'raio': sfx.zap(); fx3Bolt(d.x, d.y); fx.impact(d.x, d.y, 16, '#ffe36a'); break;
    case 'gude': sfx.whoosh(); fx3Marble(d.x, d.y, d.tx!, d.ty!); break;
    case 'troca': sfx.whoosh(); setTimeout(() => sfx.whoosh(), 160); fx3Ring(d.x, d.y, '#8fd0ff', 2.2, 0.5); fx3Ring(d.tx!, d.ty!, '#ffd24a', 2.2, 0.5); fx3Rise(d.x, d.y, '#8fd0ff', 6); fx3Rise(d.tx!, d.ty!, '#ffd24a', 6); break;
    case 'furacao': {
      sfx.whoosh(); setTimeout(() => sfx.whoosh(), 200);
      const ps = d.pts || [];
      for (let i = 0; i + 1 < ps.length; i += 2) { fx3Tornado(ps[i].x, ps[i].y); fx3Ring(ps[i + 1].x, ps[i + 1].y, '#bfe8ff', 2.0, 0.6); }
      break;
    }
    case 'chuva': sfx.splat(); fx3Cloud(d.x, d.y); break;
    case 'ancora': fx3Anchor(d.x, d.y); break;
    case 'cola': sfx.splat(); fx3Gum(d.x, d.y); break;
    case 'salto': sfx.whoosh(); fx.dust(d.x, d.y, 12, '#9dffb8'); fx3Ring(d.x, d.y, '#9dffb8', 2.2, 0.4); setTimeout(() => { sfx.wall(5); fx.impact(d.tx!, d.ty!, 12, '#9dffb8'); fx3Ring(d.tx!, d.ty!, '#9dffb8', 2.6, 0.45); }, 620);
      break;
    case 'ima': sfx.aura(); fx3Ring(d.tx!, d.ty!, '#8fd0ff', 2.0, 0.45); break;
    // buffs em si mesmo: aura na cor do poder + faíscas subindo
    case 'foguete': sfx.aura(); fx3Ring(d.x, d.y, '#ffb347', 2.6, 0.5); fx3Rise(d.x, d.y, '#ffd24a', 10); break;
    case 'turbo': sfx.aura(); fx3Ring(d.x, d.y, '#7af2e0', 2.2, 0.45); fx3Rise(d.x, d.y, '#7af2e0', 7); break;
    case 'extra': sfx.bonus(); fx3Ring(d.x, d.y, '#8affc0', 2.2, 0.45); fx3Rise(d.x, d.y, '#8affc0', 8); break;
    case 'escudo': sfx.aura(); fx3Ring(d.x, d.y, '#7ab8ff', 2.4, 0.5); fx3Ring(d.x, d.y, '#dceaff', 1.6, 0.7); break;
    case 'pancada': sfx.thud(); fx3Ring(d.x, d.y, '#ff7a5a', 2.6, 0.45); fx3Rise(d.x, d.y, '#ff9d7a', 8); break;
    case 'fantasma': sfx.whoosh(); fx3Ring(d.x, d.y, '#e8e8ff', 2.4, 0.6); fx3Rise(d.x, d.y, '#cfcfff', 10, 1.1); break;
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
      champ = { seq, race: 0, pts: new Map(), fmt, hist: [] };
      cfg.level = seq[0].level; cfg.trackIdx = seq[0].idx;
    }
    else champ = null;
    if (cfg.mode === 'elim') { elim = { players: cfg.players.slice(), orig: cfg.players.slice(), level: cfg.level, race: 0, out: [], seed: (Math.random() * 0xffffffff) >>> 0 }; cfg.trackIdx = seededTrack(elim.seed, 'elim', 0); }
    else elim = null;
    if (cfg.mode === 'camp' && cfg.campComp) camp = { compId: cfg.campComp, race: 0, pts: new Map(), hist: [] };
    else camp = null;
    if (cfg.mode === 'rank' && cfg.rankComp) rank = { compId: cfg.rankComp, race: 0, pts: new Map(), hist: [], circ: cfg.rankCirc || 'normal' };
    else rank = null;
    loadMatch(cfg);
  },
  setVols: (m, s, mu) => { setMusicVol(m); setSfxVol(s); setMuted(mu); save.setVols(m, s, mu); },
  setSkin: (id) => { save.setSkin(id); sfx.ui(); },
  preview: (def) => enterPreview(def),
}, online);
ui.dailyNet = dailyNet;   // ranking mundial do diário na tela do desafio

// -------- multiplayer online: início/lobby/fim geridos aqui (cena + IA do host) --------
online.onStartMatch = (players, level, trackIdx) => { curCfg = null; champ = null; resultsShown = false; loadMatch({ level, trackIdx, pick: 'specific', players, mode: 'online' }); };
online.onToLobby = () => { inGame = false; paused = false; resultsShown = false; stopScene(); playMusic('menu'); ui.showLobby(); };
online.onClosed = () => { const wasIn = inGame; inGame = false; paused = false; resultsShown = false; if (wasIn) stopScene(); playMusic('menu'); ui.showOnlineHome(); };
online.onChampStanding = (rows, race, total, last) => ui.showOnlineChampStanding(rows, race, total, last, online.isHost);
online.onChampEnd = (winner) => { resultsShown = true; if (winner.you) save.addWin(); sfx.win(); ui.showChampion({ rows: [], fmt: 'champ', youWon: winner.you, name: winner.name, skin: winner.skin }); };

ui.onUseItem = (slot) => { if (online.active) online.localUseItem(); else mgr.useItem(slot); };
ui.onDropShield = () => { if (!online.active) mgr.dropShield(); };
ui.onCampBack = () => { inGame = false; paused = false; camp = null; stopScene(); playMusic('menu'); ui.showCampaign(); };
ui.onCampRetry = (compId) => { inGame = false; paused = false; camp = null; stopScene(); ui.launchCamp(compById(compId)); };
ui.onRankBack = () => { inGame = false; paused = false; rank = null; stopScene(); playMusic('menu'); ui.showRanked(); };
ui.onRankRetry = (compId) => { inGame = false; paused = false; rank = null; stopScene(); ui.launchRank(rankCompById(compId)); };
ui.onCampFinale = () => { inGame = false; paused = false; camp = null; stopScene(); playMusic('menu'); ui.showCampFinale(); };
ui.onPause = () => { if (mgr.phase !== 'over') { paused = true; ui.showPause(); } };
ui.onResume = () => { paused = false; ui.hideModal(); };
// Reiniciar: no modo livre recomeça a corrida na hora; no meio de uma COMPETIÇÃO
// (campanha/ranqueada/campeonato/eliminação) confirma antes e volta pra 1ª corrida
// com os pontos zerados — nunca reinicia "só esta corrida" de uma competição.
ui.onRestart = () => {
  if (!curCfg) return;
  const go = (reset: () => void) => { paused = false; ui.hideModal(); reset(); loadMatch(curCfg!); };
  if (camp && mode === 'camp') {
    const comp = compById(camp.compId);
    ui.confirmRestartComp(`a competição ${comp.ico} ${comp.name}`, camp.race, comp.races,
      () => go(() => { camp = { compId: camp!.compId, race: 0, pts: new Map(), hist: [] }; curCfg!.trackIdx = seededTrack(campState().seed, camp!.compId, 0); }), () => ui.showPause());
    return;
  }
  if (rank && mode === 'rank') {
    const comp = rankCompById(rank.compId);
    ui.confirmRestartComp(`a competição ${comp.ico} ${comp.name}`, rank.race, comp.races,
      () => go(() => { rank = { compId: rank!.compId, race: 0, pts: new Map(), hist: [], circ: rank!.circ }; curCfg!.trackIdx = seededTrack(rankState(rank!.circ).seed, rank!.compId, 0); }), () => ui.showPause());
    return;
  }
  if (champ && mode === 'champ') {
    ui.confirmRestartComp('o campeonato', champ.race, champ.seq.length,
      () => go(() => { champ!.race = 0; champ!.pts = new Map(); champ!.hist = []; curCfg!.level = champ!.seq[0].level; curCfg!.trackIdx = champ!.seq[0].idx; }), () => ui.showPause());
    return;
  }
  if (elim && mode === 'elim') {
    ui.confirmRestartComp('a eliminação', elim.race, elim.orig.length - 1,
      () => go(() => { elim!.players = elim!.orig.slice(); elim!.out = []; elim!.race = 0; curCfg!.players = elim!.players; curCfg!.trackIdx = seededTrack(elim!.seed, 'elim', 0); }), () => ui.showPause());
    return;
  }
  // modo livre / corrida avulsa: reinicia só a corrida, sem cerimônia
  paused = false; ui.hideModal(); loadMatch(curCfg);
};
ui.onMenu = () => { inGame = false; paused = false; stopScene(); playMusic('menu'); ui.showMenu(); };
ui.onNext = () => {
  ui.hideModal();
  if (mode === 'batalha' && curCfg) { loadMatch(curCfg); return; }   // revanche: mesa nova
  if (camp && curCfg) {   // campanha: próxima corrida da competição (sequência fixa da semente)
    camp.race++;
    curCfg.trackIdx = seededTrack(campState().seed, camp.compId, camp.race);
    loadMatch(curCfg); return;
  }
  if (rank && curCfg) {   // ranqueada: próxima corrida da competição (sequência fixa da semente)
    rank.race++;
    curCfg.trackIdx = seededTrack(rankState(rank.circ).seed, rank.compId, rank.race);
    loadMatch(curCfg); return;
  }
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
    elim.race++; curCfg.players = elim.players; curCfg.trackIdx = seededTrack(elim.seed, 'elim', elim.race);
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
  onRelease: (dx, dz, power) => { aim.hide(); if (online.active) online.localFlick({ x: dx, y: dz }, power); else mgr.flick({ x: dx, y: dz }, power); },
  onCancel: () => aim.hide(),
  // EDITOR 3D: arrastar objetos / apagar muro na maquete
  editMode: () => previewing ? ui.previewEditMode() : 'off',
  onEditDown: (x, z) => { if (ui.preview3D('down', x, z)) rebuildPreviewBoard(); },
  onEditMove: (x, z) => { if (ui.preview3D('move', x, z)) rebuildPreviewBoardThrottled(); },
  onEditUp: () => { if (ui.preview3D('up', 0, 0)) rebuildPreviewBoard(); },
});

function stopScene(): void { if (scene) { scene.clear(); } board = null; previewing = false; fx3Clear(); }

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
ui.onPreviewBack = () => { previewing = false; stopScene(); playMusic('menu'); ui.showEditor(); };
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
  // CARREIRA da tampinha: toda corrida offline conta (XP cosmético)
  if (!online.active) { const meC = mgr.caps.find(c => !c.isAI); if (meC) save.addCapRace(meC.skin, meC.place, myFalls); }

  // ---- CAMPANHA: mini-campeonato com troféu e recompensas ----
  if (mode === 'camp' && camp) {
    const comp = compById(camp.compId);
    const table = [12, 9, 7, 5, 3, 1];
    mgr.standings().forEach((c, i) => camp!.pts.set(c.id, (camp!.pts.get(c.id) || 0) + (table[i] || 0)));
    const st = campState(); st.races++; saveCamp(st);
    camp.hist.push(mgr.standings().findIndex(c => !c.isAI) + 1);   // sua colocação NESTA corrida
    const rows = [...camp.pts.entries()].sort((a, b) => b[1] - a[1]).map(([id, p]) => ({ name: mgr.caps[id].name, skin: mgr.caps[id].skin, pts: p, you: !mgr.caps[id].isAI }));
    const last = camp.race + 1 >= comp.races;
    if (!last) { ui.showResults(mgr, mode, { race: camp.race + 1, total: comp.races, last: false, rows, fmt: 'copa', hist: camp.hist.slice() }); return; }
    // fim da competição: coloca você, aplica recompensas, mostra o troféu
    const place = rows.findIndex(r => r.you) + 1;
    const res = applyResult(campState(), camp.compId, place);
    ui.showCampResult({ comp, place, ptsGained: res.pts, winsGained: res.wins, improved: res.improved, finished: res.finished, rows, hist: camp.hist.slice(), prize: res.prize });
    return;
  }

  // ---- RANQUEADA: pontos por corrida, melhor total vai pro ranking mundial ----
  if (mode === 'rank' && rank) {
    const comp = rankCompById(rank.compId);
    const table = RANK_PTS;
    mgr.standings().forEach((c, i) => rank!.pts.set(c.id, (rank!.pts.get(c.id) || 0) + (table[i] || 0)));
    rank.hist.push(mgr.standings().findIndex(c => !c.isAI) + 1);
    const rows = [...rank.pts.entries()].sort((a, b) => b[1] - a[1]).map(([id, p]) => ({ name: mgr.caps[id].name, skin: mgr.caps[id].skin, pts: p, you: !mgr.caps[id].isAI }));
    const last = rank.race + 1 >= comp.races;
    if (!last) { ui.showResults(mgr, mode, { race: rank.race + 1, total: comp.races, last: false, rows, fmt: 'copa', hist: rank.hist.slice() }); return; }
    const place = rows.findIndex(r => r.you) + 1;
    const myPts = rows.find(r => r.you)?.pts || 0;
    const me = mgr.caps.find(c => !c.isAI);
    ui.showRankResult({ comp, place, pts: myPts, rows, hist: rank.hist.slice(), capId: me ? me.skin : 'coca' });
    return;
  }

  // ---- BATALHA: último vivo vence ----
  if (mode === 'batalha') {
    const order = mgr.caps.slice().sort((a, b) => a.place - b.place).map(c => ({ name: c.name, skin: c.skin, place: c.place, you: !c.isAI }));
    const winner = order[0];
    if (winner?.you) save.addWin();
    ui.showBattleResult({ winner, order });
    return;
  }

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
  if (mode === 'daily' && mgr.caps[0].finished) {
    save.setDailyBest(dailyKey(), dailyFlicks);
    // manda o MELHOR do dia pro ranking mundial (evento substituível: 1 por pessoa)
    const best = save.dailyBest(dailyKey()) ?? dailyFlicks;
    if (best >= 1) {
      const nm = rankState().name || rankState('caos').name || save.name() || 'Anônimo';
      dailyNet.start(); dailyNet.submit(dailyKey(), best, mgr.caps[0].skin, nm);
    }
  }
  let champInfo: any = undefined;
  if (champ) {
    const table = [12, 9, 7, 5, 3, 1];   // pontos por posição na corrida
    mgr.standings().forEach((c, i) => champ!.pts.set(c.id, (champ!.pts.get(c.id) || 0) + (table[i] || 0)));
    champ.hist.push(mgr.standings().findIndex(c => !c.isAI) + 1);
    const rows = [...champ.pts.entries()].sort((a, b) => b[1] - a[1]).map(([id, p]) => ({ name: mgr.caps[id].name, skin: mgr.caps[id].skin, pts: p, you: !mgr.caps[id].isAI }));
    champInfo = { race: champ.race + 1, total: champ.seq.length, last: champ.race + 1 >= champ.seq.length, rows, fmt: champ.fmt, hist: champ.hist.slice() };
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
(window as any).__go = (level: number, trackIdx: number) => loadMatch({ level, trackIdx, pick: 'specific', players: previewPlayers(), mode: 'quick' });   // debug/E2E: entra direto numa pista
(window as any).__mgr = mgr; (window as any).__ui = ui; (window as any).__diag = { get inGame() { return inGame; }, get mode() { return mode; }, get previewing() { return previewing; }, get az() { return rig.az; }, get frustum() { return rig.frustum; }, get music() { return musicNow(); }, get actx() { return audioCtx(); }, get mbus() { return musicBus(); }, playMusic };
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
    // VELOCIDADE 2×/4×: só na vez da IA e só offline — na SUA vez (mira e resolve)
    // e no online é sempre 1× (todo mundo precisa ver o mesmo ritmo)
    const spd = (!online.active && mgr.activeCap()?.isAI) ? ui.speedMul : 1;
    if (!paused) { if (online.active) online.tick(dt); mgr.update(dt * spd); if (mgr.phase === 'over') onRaceOver(); else resultsShown = false; }
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
    let maxSp = 0; for (const c of mgr.caps) if (c.moving) { const s = len(c.vel); if (s > maxSp) maxSp = s; if (s > 3 && Math.random() < 0.5) { const surf = mgr.track.surfaceAt(c.pos); if (surf === 'sand' || surf === 'dirt' || surf === 'mud' || surf === 'grass' || surf === 'frost' || surf === 'carpet') fx.dust(c.pos.x, c.pos.y, 1, surf === 'mud' ? '#5c452a' : surf === 'grass' ? '#5f8a36' : surf === 'frost' ? '#eef8fd' : surf === 'carpet' ? '#b06a58' : '#d8c090'); } }
    sfx.slide(maxSp);
    // pulsos dos itens especiais
    if (board) for (const p of board.pulses) { const s = 1 + Math.sin(t * 4) * 0.18; p.mesh.scale.set(s, s, 1); (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.22 + Math.sin(t * 4) * 0.12; }
    if (board) for (const d of board.dynamics) d.update(dt);   // brinquedos vivos (pião/carrinho/elástico/catavento/bexiga)
    if (board) for (const sp of board.spinners) { sp.rotation.y += dt * 2.4; sp.position.y += Math.sin(t * 3 + sp.position.x) * 0.004; }
    if (board) for (const bb of board.billboards) bb.quaternion.copy(rig.camera.quaternion);   // números (bônus/checkpoint) sempre virados pra câmera
    caps.update(mgr.caps, t, mgr.activeCap()?.id ?? -1, dt);
    if (fx3d.length) fx3d = fx3d.filter(f => f(dt));   // efeitos 3D dos poderes
    fx.update(dt);
    renderer.render(scene, rig.camera);
  }
  requestAnimationFrame(frame);
}
frame();

function dailyKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
