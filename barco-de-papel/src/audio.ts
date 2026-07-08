// SFX sintetizados (Web Audio), sem arquivos. Sons naturais e discretos.
let ac: AudioContext | null = null; let master: GainNode | null = null; let muted = false;
export function initAudio(): void {
  if (ac) return;
  try { ac = new (window.AudioContext || (window as any).webkitAudioContext)(); master = ac.createGain(); master.gain.value = 0.5; master.connect(ac.destination); } catch { ac = null; }
}
export function resumeAudio(): void { initAudio(); if (ac && ac.state === 'suspended') ac.resume(); }
export function toggleMute(): boolean { muted = !muted; if (master) master.gain.value = muted ? 0 : 0.5; return muted; }
export function isMuted(): boolean { return muted; }

function tone(f: number, dur: number, type: OscillatorType, peak = 0.25, slide?: number): void {
  if (!ac || !master || muted) return;
  const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f, ac.currentTime);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, ac.currentTime + dur);
  g.gain.setValueAtTime(0.0001, ac.currentTime); g.gain.exponentialRampToValueAtTime(peak, ac.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur); o.connect(g); g.connect(master); o.start(); o.stop(ac.currentTime + dur + 0.02);
}
function noise(dur: number, peak: number, filt: number, hp = false): void {
  if (!ac || !master || muted) return;
  const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate); const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ac.createBufferSource(); src.buffer = buf; const f = ac.createBiquadFilter(); f.type = hp ? 'highpass' : 'lowpass'; f.frequency.value = filt;
  const g = ac.createGain(); g.gain.setValueAtTime(peak, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  src.connect(f); f.connect(g); g.connect(master); src.start(); src.stop(ac.currentTime + dur + 0.02);
}

export const sfx = {
  ui() { tone(560, 0.05, 'sine', 0.1, 720); },
  dig() { noise(0.16, 0.18, 500); tone(150, 0.12, 'sine', 0.1, 80); },
  place() { tone(330, 0.08, 'triangle', 0.12, 260); noise(0.08, 0.08, 1200, true); },
  leaf() { noise(0.22, 0.1, 3500, true); },
  start() { noise(0.7, 0.16, 900); tone(220, 0.5, 'sine', 0.12, 440); },
  splash() { noise(0.18, 0.12, 1600, true); tone(600, 0.08, 'sine', 0.06, 1000); },
  star() { tone(880, 0.12, 'sine', 0.14, 1240); },
  win() { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.3, 'triangle', 0.16, f * 1.2), i * 130)); },
  lose() { tone(240, 0.5, 'sawtooth', 0.16, 90); noise(0.5, 0.1, 500); },
};
