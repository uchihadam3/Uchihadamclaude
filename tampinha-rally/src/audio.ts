// Áudio sintetizado (Web Audio): efeitos curtos e satisfatórios + uma trilha
// leve e nostálgica (violãozinho + shaker). Volumes separados p/ música e SFX.
let ctx: AudioContext | null = null;
let master: GainNode, sfxGain: GainNode, musGain: GainNode;
let slideNoise: AudioBufferSourceNode | null = null, slideGain: GainNode | null = null, slideFilt: BiquadFilterNode | null = null;
export const settings = { music: 0.5, sfx: 0.8, muted: false };

function ensure(): boolean {
  if (ctx) return true;
  try {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = settings.muted ? 0 : 1; master.connect(ctx.destination);
    sfxGain = ctx.createGain(); sfxGain.gain.value = settings.sfx; sfxGain.connect(master);
    musGain = ctx.createGain(); musGain.gain.value = settings.music; musGain.connect(master);
    return true;
  } catch { return false; }
}
export function resumeAudio(): void { if (ensure() && ctx!.state === 'suspended') ctx!.resume(); }
// acesso pro motor de música (music.ts)
export function audioCtx(): AudioContext | null { return ensure() ? ctx : null; }
export function musicBus(): GainNode | null { return ensure() ? musGain : null; }

function noiseBuf(): AudioBuffer {
  const n = ctx!.sampleRate * 1; const b = ctx!.createBuffer(1, n, ctx!.sampleRate); const d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b;
}
function tone(freq: number, t0: number, dur: number, type: OscillatorType, vol: number, slideTo?: number) {
  if (!ctx) return; const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t0); if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.008); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  o.connect(g); g.connect(sfxGain); o.start(t0); o.stop(t0 + dur + 0.02);
}
function noiseHit(t0: number, dur: number, vol: number, freq: number, q: number) {
  if (!ctx) return; const s = ctx.createBufferSource(); s.buffer = noiseBuf(); const f = ctx.createBiquadFilter(); const g = ctx.createGain();
  f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  s.connect(f); f.connect(g); g.connect(sfxGain); s.start(t0); s.stop(t0 + dur + 0.02);
}

export const sfx = {
  squeak() { if (!ensure()) return; const t = ctx!.currentTime; tone(880, t, 0.07, 'triangle', 0.22, 260); tone(1240, t + 0.07, 0.06, 'triangle', 0.16, -180); },
  vroom() { if (!ensure()) return; const t = ctx!.currentTime; tone(90, t, 0.5, 'sawtooth', 0.3, 340); tone(140, t + 0.04, 0.42, 'square', 0.14, 420); noiseHit(t, 0.4, 0.2, 1800, 0.4); },
  zap() { if (!ensure()) return; const t = ctx!.currentTime; tone(1600, t, 0.08, 'sawtooth', 0.3, -1200); tone(240, t + 0.05, 0.22, 'square', 0.24, -140); noiseHit(t, 0.16, 0.5, 3200, 0.7); },
  whoosh() { if (!ensure()) return; const t = ctx!.currentTime; noiseHit(t, 0.32, 0.35, 900, 0.5); noiseHit(t + 0.08, 0.26, 0.25, 2200, 0.7); tone(220, t, 0.3, 'sine', 0.14, 480); },
  splat() { if (!ensure()) return; const t = ctx!.currentTime; tone(140, t, 0.14, 'sine', 0.4, -70); noiseHit(t, 0.1, 0.4, 500, 1.2); tone(90, t + 0.08, 0.16, 'sine', 0.2, -30); },
  thud() { if (!ensure()) return; const t = ctx!.currentTime; tone(120, t, 0.3, 'sine', 0.5, -75); noiseHit(t, 0.12, 0.3, 220, 2); },
  aura() { if (!ensure()) return; const t = ctx!.currentTime; [392, 523, 659].forEach((f, i) => tone(f, t + i * 0.05, 0.22, 'triangle', 0.2)); },
  elastic(power = 0.5) { if (!ensure()) return; const t = ctx!.currentTime; tone(180, t, 0.16, 'sawtooth', 0.22 * (0.5 + power), 320); tone(90, t, 0.2, 'sine', 0.3, 140); noiseHit(t, 0.05, 0.12, 2400, 1); },
  pop() { if (!ensure()) return; const t = ctx!.currentTime; noiseHit(t, 0.09, 0.8, 900, 0.6); noiseHit(t + 0.04, 0.3, 0.4, 3200, 0.5); tone(160, t, 0.12, 'sine', 0.4, -90); },
  flick(power = 0.5) { if (!ensure()) return; const t = ctx!.currentTime; tone(360 + power * 340, t, 0.09, 'triangle', 0.35, 220); noiseHit(t, 0.05, 0.25, 1400, 1.2); },
  ui() { if (!ensure()) return; tone(520, ctx!.currentTime, 0.06, 'sine', 0.2, 660); },
  wall(power = 1) { if (!ensure()) return; const t = ctx!.currentTime; noiseHit(t, 0.09, Math.min(0.4, 0.12 + power * 0.03), 240, 2); tone(150, t, 0.08, 'sine', 0.2, 90); },
  clack(power = 1) { if (!ensure()) return; const t = ctx!.currentTime; noiseHit(t, 0.06, Math.min(0.45, 0.15 + power * 0.03), 900, 3); tone(500, t, 0.05, 'square', 0.15, 380); },
  hole() { if (!ensure()) return; const t = ctx!.currentTime; tone(400, t, 0.5, 'sine', 0.3, 70); },
  bonus() { if (!ensure()) return; const t = ctx!.currentTime; [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.06, 0.18, 'triangle', 0.25)); },
  bad() { if (!ensure()) return; const t = ctx!.currentTime; tone(300, t, 0.25, 'sawtooth', 0.22, 140); },
  win() { if (!ensure()) return; const t = ctx!.currentTime; [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * 0.11, 0.3, 'triangle', 0.3)); },
  slide(intensity: number) {
    if (!ensure()) return;
    if (!slideNoise) {
      slideNoise = ctx!.createBufferSource(); slideNoise.buffer = noiseBuf(); slideNoise.loop = true;
      slideFilt = ctx!.createBiquadFilter(); slideFilt.type = 'bandpass'; slideFilt.frequency.value = 1200; slideFilt.Q.value = 0.8;
      slideGain = ctx!.createGain(); slideGain.gain.value = 0;
      slideNoise.connect(slideFilt); slideFilt.connect(slideGain); slideGain.connect(sfxGain); slideNoise.start();
    }
    const g = Math.min(0.22, intensity * 0.02);
    slideGain!.gain.setTargetAtTime(g, ctx!.currentTime, 0.05);
    if (slideFilt) slideFilt.frequency.setTargetAtTime(700 + intensity * 90, ctx!.currentTime, 0.05);
  },
};

// A trilha de verdade mora em music.ts (7 composições de 2–3 min).
// Estas duas funções ficam por compatibilidade: menu toca a música do menu.
import { playMusic, stopAllMusic } from './music';
export function startMusic(): void { playMusic('menu'); }
export function stopMusic(): void { stopAllMusic(); }

export function setMusicVol(v: number): void { settings.music = v; if (musGain) musGain.gain.value = v; }
export function setSfxVol(v: number): void { settings.sfx = v; if (sfxGain) sfxGain.gain.value = v; }
export function setMuted(m: boolean): void { settings.muted = m; if (master) master.gain.value = m ? 0 : 1; }
