// Trilha sonora generativa (Web Audio, sem arquivos): um sequenciador com
// look-ahead toca pad, baixo, arpejo e percussão. O "clima" muda por contexto
// (menu, combate, chefe, vitória) e a tonalidade do combate varia por tema, de
// modo que cada setor/modo soa diferente. Toca no sub-barramento de música.
import { getAC, getMusicBus } from './audio';

export type Mood = 'menu' | 'combat' | 'boss' | 'victory';

const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  minor: [0, 2, 3, 5, 7, 8, 10],
  penta: [0, 3, 5, 7, 10],
};

interface MoodCfg { scale: string; bpm: number; prog: number[]; perc: number; lead: number; pad: number; base: number; }
const MOODS: Record<Mood, MoodCfg> = {
  menu: { scale: 'major', bpm: 82, prog: [0, 5, 3, 4], perc: 0, lead: 0.35, pad: 0.5, base: 50 },
  combat: { scale: 'dorian', bpm: 130, prog: [0, 3, 5, 4], perc: 1, lead: 0.7, pad: 0.34, base: 50 },
  boss: { scale: 'minor', bpm: 152, prog: [0, 0, 6, 5], perc: 1.3, lead: 0.85, pad: 0.3, base: 45 },
  victory: { scale: 'major', bpm: 118, prog: [0, 4, 5, 0], perc: 0.6, lead: 0.8, pad: 0.45, base: 55 },
};

const midi = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

let running = false;
let timer: ReturnType<typeof setInterval> | null = null;
let mood: Mood = 'menu';
let cfg = MOODS.menu;
let keyShift = 0;      // desloca a tonalidade (varia por tema)
let step = 0;
let nextTime = 0;

// nota sintetizada agendada no barramento de música
function voice(freq: number, start: number, dur: number, type: OscillatorType, peak: number, opts: { detune?: number; cutoff?: number; slideTo?: number } = {}): void {
  const ac = getAC(), bus = getMusicBus(); if (!ac || !bus) return;
  const o = ac.createOscillator(); const g = ac.createGain(); const f = ac.createBiquadFilter();
  o.type = type; o.frequency.setValueAtTime(freq, start);
  if (opts.slideTo) o.frequency.exponentialRampToValueAtTime(opts.slideTo, start + dur);
  if (opts.detune) o.detune.value = opts.detune;
  f.type = 'lowpass'; f.frequency.value = opts.cutoff ?? 2600; f.Q.value = 0.6;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.06, dur * 0.3));
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(f); f.connect(g); g.connect(bus);
  o.start(start); o.stop(start + dur + 0.03);
}

function kick(start: number, hard: number): void {
  const ac = getAC(), bus = getMusicBus(); if (!ac || !bus) return;
  const o = ac.createOscillator(); const g = ac.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(150 * hard, start); o.frequency.exponentialRampToValueAtTime(46, start + 0.14);
  g.gain.setValueAtTime(0.9, start); g.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
  o.connect(g); g.connect(bus); o.start(start); o.stop(start + 0.2);
}
function hat(start: number, peak: number): void {
  const ac = getAC(), bus = getMusicBus(); if (!ac || !bus) return;
  const buf = ac.createBuffer(1, ac.sampleRate * 0.05, ac.sampleRate);
  const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ac.createBufferSource(); src.buffer = buf;
  const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000;
  const g = ac.createGain(); g.gain.setValueAtTime(peak, start); g.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);
  src.connect(f); f.connect(g); g.connect(bus); src.start(start); src.stop(start + 0.06);
}

function scaleNote(deg: number): number {
  const sc = SCALES[cfg.scale]; const oct = Math.floor(deg / sc.length);
  return sc[((deg % sc.length) + sc.length) % sc.length] + oct * 12;
}

function schedule(s: number, t: number): void {
  const sc = SCALES[cfg.scale];
  const bar = Math.floor(s / 16) % cfg.prog.length;
  const inBar = s % 16;
  const spb = 60 / cfg.bpm;
  const sixteenth = spb / 4;
  const rootDeg = cfg.prog[bar];
  const rootMidi = cfg.base + keyShift + sc[rootDeg % sc.length];

  // ---- pad (acorde no início de cada compasso) ----
  if (inBar === 0) {
    const dur = sixteenth * 15.5;
    for (const iv of [0, scaleNote(rootDeg + 2) - sc[rootDeg % sc.length], scaleNote(rootDeg + 4) - sc[rootDeg % sc.length]]) {
      voice(midi(rootMidi + iv), t, dur, 'sawtooth', cfg.pad * 0.14, { detune: -6, cutoff: 1500 });
      voice(midi(rootMidi + iv), t, dur, 'triangle', cfg.pad * 0.12, { detune: 7, cutoff: 1800 });
    }
  }
  // ---- baixo (nas batidas) ----
  if (inBar % 4 === 0) {
    voice(midi(rootMidi - 12), t, sixteenth * 3.4, 'triangle', 0.3, { cutoff: 900 });
  }
  // ---- percussão ----
  if (cfg.perc > 0) {
    if (inBar % 4 === 0) kick(t, 1 + (mood === 'boss' ? 0.15 : 0));
    if (inBar % 2 === 0) hat(t, 0.08 * cfg.perc);
    if (mood === 'boss' && inBar === 12) kick(t, 1.1);
  }
  // ---- arpejo / lead ----
  const leadSteps = [0, 3, 6, 8, 10, 11, 14];
  if (leadSteps.includes(inBar) && Math.random() < cfg.lead) {
    const deg = rootDeg + [0, 2, 4, 6, 4, 2][(s + inBar) % 6];
    const oct = mood === 'menu' ? 12 : 12 + (inBar > 8 ? 12 : 0);
    voice(midi(cfg.base + keyShift + scaleNote(deg) + oct), t, sixteenth * (mood === 'menu' ? 2.4 : 1.4), mood === 'menu' ? 'triangle' : 'square', cfg.lead * 0.1, { cutoff: 3200 });
  }
}

function tick(): void {
  const ac = getAC(); if (!ac || !running) return;
  const sixteenth = (60 / cfg.bpm) / 4;
  while (nextTime < ac.currentTime + 0.12) {
    schedule(step, nextTime);
    step = (step + 1) % (16 * cfg.prog.length);
    nextTime += sixteenth;
  }
}

export function setMood(m: Mood, seed = 0): void {
  if (mood === m && keyShift === (seed % 7)) return;
  mood = m; cfg = MOODS[m];
  keyShift = ((seed % 7) + 7) % 7; // tonalidade varia por tema
  step = 0;
  const ac = getAC(); if (ac) nextTime = ac.currentTime + 0.06;
}

export function startMusic(): void {
  if (running) return;
  const ac = getAC(); if (!ac) return;
  running = true; step = 0; nextTime = ac.currentTime + 0.1;
  timer = setInterval(tick, 25);
}

export function stopMusic(): void {
  running = false; if (timer) { clearInterval(timer); timer = null; }
}

// converte um id de tema em um deslocamento de tonalidade estável
export function seedFromTheme(id: string): number {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}
