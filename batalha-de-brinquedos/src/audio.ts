// ---------------------------------------------------------------------------
// SOM — efeitos de brinquedo sintetizados (bloquinho de madeira, molinha,
// moedinha) + uma marchinha de caixinha de música (xilofone + tuba + caixa)
// tocando baixinho. Tudo Web Audio, zero assets.
// ---------------------------------------------------------------------------
let ctx: AudioContext | null = null;
let master: GainNode, musG: GainNode, sfxG: GainNode;
export const audio = { muted: false };

function ensure(): boolean {
  if (ctx) return true;
  try {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination);
    sfxG = ctx.createGain(); sfxG.gain.value = 0.9; sfxG.connect(master);
    musG = ctx.createGain(); musG.gain.value = 0.34; musG.connect(master);
    return true;
  } catch { return false; }
}
export function resumeAudio(): void { if (ensure() && ctx!.state === 'suspended') ctx!.resume(); }
export function audioCtx(): AudioContext | null { return ensure() ? ctx : null; }
export function musicBus(): GainNode | null { return ensure() ? musG : null; }
export function setMuted(m: boolean): void { audio.muted = m; if (master) master.gain.value = m ? 0 : 1; }

function tone(f: number, t0: number, dur: number, type: OscillatorType, v: number, slide?: number, out?: GainNode): void {
  if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(v, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  o.connect(g); g.connect(out || sfxG); o.start(t0); o.stop(t0 + dur + 0.03);
}
let nz: AudioBuffer | null = null;
function noiseHit(t0: number, dur: number, v: number, f: number, q: number, type: BiquadFilterType = 'bandpass', out?: GainNode): void {
  if (!ctx) return;
  if (!nz) { nz = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = nz.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = ctx.createBufferSource(); s.buffer = nz;
  const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  const g = ctx.createGain(); g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  s.connect(fl); fl.connect(g); g.connect(out || sfxG); s.start(t0); s.stop(t0 + dur + 0.02);
}
const now = () => ctx!.currentTime;

export const sfx = {
  ui() { if (!ensure()) return; tone(620, now(), 0.05, 'sine', 0.16, 760); },
  pop() { if (!ensure()) return; tone(340, now(), 0.1, 'sine', 0.3, 620); noiseHit(now(), 0.04, 0.12, 2400, 1); },
  tok() { if (!ensure()) return; tone(880, now(), 0.045, 'square', 0.1, 640); noiseHit(now(), 0.05, 0.3, 1600, 2.4); },        // bloquinho
  thud() { if (!ensure()) return; tone(120, now(), 0.14, 'sine', 0.4, 62); noiseHit(now(), 0.08, 0.2, 300, 1.2); },
  twang() { if (!ensure()) return; tone(700, now(), 0.09, 'triangle', 0.2, 240); },
  boing() { if (!ensure()) return; const t = now(); tone(300, t, 0.3, 'sine', 0.28, 90); tone(602, t, 0.22, 'triangle', 0.12, 180); },  // molinha da morte
  coin() { if (!ensure()) return; const t = now(); tone(1240, t, 0.06, 'square', 0.08); tone(1660, t + 0.06, 0.16, 'square', 0.08); },
  snap() { if (!ensure()) return; const t = now(); noiseHit(t, 0.03, 0.3, 3000, 3); tone(420, t + 0.02, 0.08, 'sine', 0.2, 300); },     // encaixe LEGO
  crumble() { if (!ensure()) return; const t = now(); for (let i = 0; i < 5; i++) noiseHit(t + i * 0.05, 0.09, 0.2 - i * 0.03, 900 - i * 120, 1.4); },
  special() { if (!ensure()) return; const t = now(); tone(240, t, 0.5, 'sawtooth', 0.14, 900); noiseHit(t, 0.4, 0.1, 1200, 0.8, 'highpass'); },
  rumble() { if (!ensure()) return; const t = now(); tone(60, t, 1.6, 'sine', 0.3, 40); noiseHit(t, 1.4, 0.12, 140, 0.8, 'lowpass'); },
  fanfare() { if (!ensure()) return; const t = now(); [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.12, 0.34, 'triangle', 0.22)); },
  sad() { if (!ensure()) return; const t = now(); [392, 370, 349, 311].forEach((f, i) => tone(f, t + i * 0.28, 0.4, 'triangle', 0.2)); },
};

// A trilha de verdade mora em music.ts (composição longa com forma).
import { playMusic, stopAllMusic } from './music';
export function startMusic(): void { playMusic('batalha'); }
export function stopMusic(): void { stopAllMusic(); }
