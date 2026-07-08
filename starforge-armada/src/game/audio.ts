// Áudio sintetizado (Web Audio) — sem arquivos. Sons rápidos e satisfatórios.
let ac: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

export function initAudio(): void {
  if (ac) return;
  try {
    ac = new (window.AudioContext || (window as any).webkitAudioContext)();
    master = ac.createGain();
    master.gain.value = 0.5;
    master.connect(ac.destination);
  } catch { ac = null; }
}

export function resumeAudio(): void { initAudio(); if (ac && ac.state === 'suspended') ac.resume(); }
export function setMuted(m: boolean): void { muted = m; if (master && ac) master.gain.value = m ? 0 : 0.5; }
export function isMuted(): boolean { return muted; }

function env(osc: OscillatorNode | AudioBufferSourceNode, g: GainNode, dur: number, peak: number): void {
  if (!ac || !master) return;
  const t = ac.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function tone(freq: number, dur: number, type: OscillatorType, peak = 0.3, slideTo?: number): void {
  if (!ac || !master || muted) return;
  const o = ac.createOscillator(); const g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, ac.currentTime);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, ac.currentTime + dur);
  o.connect(g); env(o, g, dur, peak);
}

function noise(dur: number, peak: number, filterFreq: number): void {
  if (!ac || !master || muted) return;
  const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ac.createBufferSource(); src.buffer = buf;
  const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filterFreq;
  const g = ac.createGain();
  src.connect(f); f.connect(g);
  env(src, g, dur, peak);
}

export const sfx = {
  shoot(): void { tone(880, 0.09, 'square', 0.09, 420); },
  hit(): void { tone(300, 0.06, 'triangle', 0.12, 160); },
  ability(): void { tone(520, 0.22, 'sawtooth', 0.16, 1200); },
  ultimate(): void { tone(180, 0.5, 'sawtooth', 0.22, 900); noise(0.5, 0.18, 1800); },
  explodeSmall(): void { noise(0.25, 0.22, 900); tone(160, 0.22, 'sine', 0.14, 60); },
  explodeBig(): void { noise(0.6, 0.32, 700); tone(90, 0.6, 'sine', 0.24, 40); },
  ui(): void { tone(660, 0.06, 'sine', 0.12, 880); },
  start(): void { tone(330, 0.3, 'sawtooth', 0.18, 660); },
};
