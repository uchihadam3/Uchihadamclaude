// ---------------------------------------------------------------------------
// ANIMAÇÃO — a alma dos bonequinhos. Tudo procedural com molas e curvas:
//  · marcha: pulinho com squash no pouso, gingado de lado, bracinhos balançando
//  · ataque: WIND-UP (arma pra trás, corpo agacha) → GOLPE (estica, avança) →
//    recupera — o dano acontece exatamente no frame do impacto (onStrike)
//  · dano: flash branco, encolhida, recuo
//  · morte: pulinho, TOMBA como brinquedo derrubado, quica e some esmaecendo
//  · nascer: cai da "mão do jogador", amassa no chão e infla com overshoot
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { ToyRig } from './toy';

export type Mode = 'spawn' | 'walk' | 'idle' | 'melee' | 'shoot' | 'die';

export interface Anim {
  rig: ToyRig;
  mode: Mode; t: number;
  phase: number;                 // fase da marcha
  freq: number; hopAmp: number;  // jeitão da marcha (por classe)
  sy: number; syV: number;       // mola do squash (y; x/z compensam)
  flash: number; kick: number;
  fade: number;                  // 1 → 0 na morte
  struck: boolean;               // onStrike já disparou neste golpe?
  onStrike: (() => void) | null;
  gone: boolean;                 // pode remover da cena
  wheels: THREE.Object3D[];
}

export function makeAnim(rig: ToyRig, kind: string): Anim {
  const freq = kind === 'veloz' ? 11 : kind === 'tanque' ? 5.2 : 7.5;
  const hop = kind === 'veloz' ? 1.1 : kind === 'tanque' ? 2.0 : 2.8;
  const wheels: THREE.Object3D[] = [];
  rig.group.traverse(o => { if (o.name === 'wheel') wheels.push(o); });
  return { rig, mode: 'spawn', t: 0, phase: Math.random() * 6, freq, hopAmp: hop, sy: 1, syV: 0, flash: 0, kick: 0, fade: 1, struck: false, onStrike: null, gone: false, wheels };
}

export function setMode(a: Anim, m: Mode): void {
  if (a.mode === 'die') return;
  if (a.mode !== m) { a.mode = m; a.t = 0; a.struck = false; }
}
export function hit(a: Anim): void { a.flash = 1; a.kick = 1; a.sy = 0.82; }
export function kill(a: Anim): void { if (a.mode !== 'die') { a.mode = 'die'; a.t = 0; } }

const clamp01 = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x;
const outBack = (t: number) => { const c = 1.7; const u = t - 1; return 1 + (c + 1) * u * u * u + c * u * u; };
const outBounce = (t: number) => {
  const n = 7.5625, d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75;
  if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375;
  return n * (t -= 2.625 / d) * t + .984375;
};

export function updateAnim(a: Anim, dt: number, camQ: THREE.Quaternion): void {
  const r = a.rig; a.t += dt;
  // molas e decaimentos
  const k = 130, d = 13;
  a.syV += (1 - a.sy) * k * dt; a.syV *= Math.exp(-d * dt); a.sy += a.syV * dt;
  a.flash = Math.max(0, a.flash - dt * 4.5);
  a.kick = Math.max(0, a.kick - dt * 5);

  // flash de dano (emissivo)
  for (const m of r.mats) { m.emissive.setRGB(a.flash, a.flash * .92, a.flash * .85); }

  const b = r.body;
  let hopY = 0, rockZ = 0, swayX = 0, armSwing = 0, lungeX = 0, bodyRotZ = 0;
  let armFZ: number | null = null;

  if (a.mode === 'spawn') {
    const t = clamp01(a.t / 0.38);
    r.group.scale.setScalar(Math.max(0.05, outBack(t)));
    hopY = (1 - t) * 16 * (1 - t);
    if (a.t > 0.16 && a.t - dt <= 0.16) a.sy = 0.74;      // amassa no pouso
    if (a.t > 0.5) setMode(a, 'walk');
  } else if (a.mode === 'walk') {
    a.phase += dt * a.freq;
    hopY = Math.abs(Math.sin(a.phase)) * a.hopAmp;
    rockZ = Math.sin(a.phase) * 0.085;
    swayX = Math.sin(a.phase * 0.5) * 0.05;
    armSwing = Math.sin(a.phase) * 0.4;
    if (Math.sin(a.phase) < -0.985 && a.sy > 0.93) a.sy = 0.9;   // squash no passo
    for (const w of a.wheels) w.rotation.z -= dt * 9;
    if (r.key) r.key.rotation.x += dt * 5.5;
  } else if (a.mode === 'idle') {
    hopY = Math.sin(a.t * 3.2) * 0.9 + 0.9;
    armSwing = Math.sin(a.t * 3.2) * 0.12;
    if (r.key) r.key.rotation.x += dt * 1.6;
  } else if (a.mode === 'melee') {
    const T = a.t;
    if (T < 0.24) {                                        // wind-up
      const t = T / 0.24;
      armFZ = -2.1 * t; bodyRotZ = -0.2 * t; lungeX = -2.5 * t;
      if (t > 0.8 && a.sy > 0.93) a.sy = 0.92;
    } else if (T < 0.36) {                                 // GOLPE
      const t = (T - 0.24) / 0.12;
      armFZ = -2.1 + 3.4 * t; bodyRotZ = -0.2 + 0.42 * t; lungeX = -2.5 + 9.5 * t;
      if (!a.struck && t > 0.55) { a.struck = true; a.sy = 1.1; a.onStrike?.(); }
    } else if (T < 0.7) {                                  // recupera
      const t = (T - 0.36) / 0.34;
      armFZ = 1.3 * (1 - t); bodyRotZ = 0.22 * (1 - t); lungeX = 7 * (1 - t);
    } else { setMode(a, 'idle'); }
    if (r.key) r.key.rotation.x += dt * 3;
  } else if (a.mode === 'shoot') {
    const T = a.t;
    if (T < 0.3) {                                         // puxa a corda / mira
      const t = T / 0.3;
      armFZ = -0.55 * t; bodyRotZ = -0.1 * t;
    } else if (T < 0.42) {                                 // solta!
      const t = (T - 0.3) / 0.12;
      armFZ = -0.55 + 0.75 * t; bodyRotZ = -0.1 + 0.16 * t;
      if (!a.struck && t > 0.3) { a.struck = true; a.onStrike?.(); }
    } else if (T < 0.66) {
      const t = (T - 0.42) / 0.24;
      armFZ = 0.2 * (1 - t); bodyRotZ = 0.06 * (1 - t);
    } else { setMode(a, 'idle'); }
  } else if (a.mode === 'die') {
    const T = a.t;
    if (T < 0.12) hopY = Math.sin(T / 0.12 * Math.PI) * 5;                  // pulinho
    const tp = clamp01((T - 0.06) / 0.5);
    r.group.rotation.z = -outBounce(tp) * Math.PI * 0.46;                   // tomba
    if (T > 0.62) {
      a.fade = Math.max(0, 1 - (T - 0.62) / 0.4);
      r.group.traverse(o => { const m = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (m) { m.transparent = true; (m as THREE.MeshBasicMaterial).opacity = a.fade; } });
    }
    r.hp.root.visible = false;
    if (T > 1.05) a.gone = true;
  }

  // aplica no rig (o kick de dano empurra pra trás)
  b.position.y = hopY;
  b.position.x = lungeX - a.kick * 4;
  b.rotation.z = rockZ + bodyRotZ;
  b.rotation.x = swayX;
  b.scale.set(2 - a.sy, a.sy, 2 - a.sy);                   // volume conservado
  if (armFZ != null) r.armF.rotation.z = armFZ;
  else { r.armF.rotation.z = armSwing; }
  r.armB.rotation.z = -armSwing * 0.8;
  r.blob.scale.setScalar(1 - hopY * 0.018);
  (r.blob.material as THREE.MeshBasicMaterial).opacity = 0.34 * a.fade;
  // barra de vida encara a câmera (só aparece quando machucado — ver sim)
  r.hp.root.quaternion.copy(camQ);
}
