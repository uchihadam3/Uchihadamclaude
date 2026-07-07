// ============ ÁUDIO: sintetizador cozy (WebAudio) ============
// SFX curtos + música generativa calma + camada de ambiente (vento/pássaros/chuva)

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let ambientGain: GainNode | null = null;
let started = false;
let raining = false;
let musicTimer: number | null = null;
let ambientTimer: number | null = null;
let rainNoise: AudioBufferSourceNode | null = null;
let currentSeason = 'spring';

function ensureCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      musicGain = ctx.createGain(); musicGain.connect(masterGain);
      sfxGain = ctx.createGain(); sfxGain.connect(masterGain);
      ambientGain = ctx.createGain(); ambientGain.connect(masterGain);
    } catch { return null; }
  }
  return ctx;
}

export function setVolumes(master: number, music: number, sfxV: number, ambient: number): void {
  if (!ensureCtx()) return;
  masterGain!.gain.value = master;
  musicGain!.gain.value = music * 0.5;
  sfxGain!.gain.value = sfxV;
  ambientGain!.gain.value = ambient * 0.6;
}

export function startAudio(): void {
  const c = ensureCtx();
  if (!c || started) return;
  started = true;
  if (c.state === 'suspended') void c.resume();
  scheduleMusic();
  scheduleAmbient();
}

// ---------- SFX ----------
type SfxName = 'water' | 'dig' | 'plant' | 'snip' | 'coin' | 'seeds' | 'sprinkle' | 'quest' | 'achievement' | 'unlock' | 'fail' | 'click' | 'place' | 'fanfare' | 'bloom';

function tone(freq: number, dur: number, type: OscillatorType, vol: number, when = 0, slide = 0): void {
  const c = ensureCtx();
  if (!c || !sfxGain) return;
  const t0 = c.currentTime + when;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(sfxGain);
  o.start(t0); o.stop(t0 + dur + 0.05);
}

function noiseBurst(dur: number, vol: number, filterFreq: number, when = 0): void {
  const c = ensureCtx();
  if (!c || !sfxGain) return;
  const t0 = c.currentTime + when;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = filterFreq;
  const g = c.createGain(); g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(sfxGain);
  src.start(t0);
}

export function sfx(name: SfxName): void {
  if (!started) return;
  switch (name) {
    case 'water': noiseBurst(0.35, 0.25, 1200); tone(320, 0.2, 'sine', 0.08, 0.05, -80); break;
    case 'dig': noiseBurst(0.18, 0.3, 500); break;
    case 'plant': noiseBurst(0.12, 0.2, 600); tone(520, 0.15, 'sine', 0.1, 0.08); break;
    case 'snip': tone(1800, 0.05, 'square', 0.08); tone(1400, 0.05, 'square', 0.08, 0.06); break;
    case 'coin': tone(880, 0.08, 'sine', 0.12); tone(1320, 0.15, 'sine', 0.12, 0.07); break;
    case 'seeds': for (let i = 0; i < 5; i++) tone(900 + Math.random() * 500, 0.04, 'sine', 0.06, i * 0.04); break;
    case 'sprinkle': for (let i = 0; i < 4; i++) noiseBurst(0.06, 0.1, 2500, i * 0.05); break;
    case 'quest': tone(523, 0.12, 'sine', 0.12); tone(659, 0.12, 'sine', 0.12, 0.1); tone(784, 0.25, 'sine', 0.12, 0.2); break;
    case 'achievement': tone(523, 0.1, 'triangle', 0.14); tone(659, 0.1, 'triangle', 0.14, 0.09); tone(784, 0.1, 'triangle', 0.14, 0.18); tone(1047, 0.35, 'triangle', 0.14, 0.27); break;
    case 'unlock': tone(392, 0.15, 'triangle', 0.13); tone(523, 0.15, 'triangle', 0.13, 0.12); tone(659, 0.3, 'triangle', 0.13, 0.24); break;
    case 'fail': tone(220, 0.2, 'sine', 0.1, 0, -60); break;
    case 'click': tone(700, 0.03, 'sine', 0.06); break;
    case 'place': tone(440, 0.08, 'sine', 0.1); noiseBurst(0.08, 0.12, 800, 0.02); break;
    case 'fanfare': [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.13, i * 0.13)); break;
    case 'bloom': tone(880, 0.3, 'sine', 0.08, 0, 220); tone(1100, 0.4, 'sine', 0.05, 0.15, 180); break;
  }
}

// ---------- música generativa ----------
const SCALES: Record<string, number[]> = {
  spring: [0, 2, 4, 7, 9],            // pentatônica maior — alegre
  summer: [0, 2, 4, 5, 7, 9, 11],     // maior — quente
  autumn: [0, 2, 3, 5, 7, 8, 10],     // menor natural — contemplativo
  winter: [0, 2, 3, 7, 8],            // pentatônica menor — suave
};
const ROOTS: Record<string, number> = { spring: 262, summer: 294, autumn: 220, winter: 247 };

export function setSeasonMusic(season: string): void {
  currentSeason = season;
}

function scheduleMusic(): void {
  if (musicTimer) window.clearTimeout(musicTimer);
  const c = ensureCtx();
  if (!c || !musicGain) return;
  const scale = SCALES[currentSeason] ?? SCALES.spring;
  const root = ROOTS[currentSeason] ?? 262;
  const playNote = (delaySec: number, semitone: number, dur: number, vol: number, oct = 1) => {
    const t0 = c.currentTime + delaySec;
    const freq = root * Math.pow(2, semitone / 12) * oct;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(musicGain!);
    o.start(t0); o.stop(t0 + dur + 0.1);
    // quinta suave por baixo às vezes
    if (Math.random() < 0.3) {
      const o2 = c.createOscillator(); const g2 = c.createGain();
      o2.type = 'triangle'; o2.frequency.value = freq / 2;
      g2.gain.setValueAtTime(0, t0);
      g2.gain.linearRampToValueAtTime(vol * 0.4, t0 + 0.1);
      g2.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 1.2);
      o2.connect(g2); g2.connect(musicGain!);
      o2.start(t0); o2.stop(t0 + dur * 1.2 + 0.1);
    }
  };
  // frase de 4-7 notas com pausas respiradas
  let t = 0.5 + Math.random();
  const notes = 3 + Math.floor(Math.random() * 4);
  for (let i = 0; i < notes; i++) {
    const semi = scale[Math.floor(Math.random() * scale.length)] + (Math.random() < 0.25 ? 12 : 0);
    const dur = 1.2 + Math.random() * 1.6;
    playNote(t, semi, dur, 0.05 + Math.random() * 0.04);
    t += 0.6 + Math.random() * 1.1;
  }
  musicTimer = window.setTimeout(scheduleMusic, (t + 2 + Math.random() * 4) * 1000);
}

// ---------- ambiente ----------
export function setWeatherAmbience(rain: boolean): void {
  raining = rain;
  const c = ensureCtx();
  if (!c || !ambientGain) return;
  if (rain && !rainNoise && started) {
    const len = c.sampleRate * 2;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    rainNoise = c.createBufferSource();
    rainNoise.buffer = buf; rainNoise.loop = true;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
    const g = c.createGain(); g.gain.value = 0.12;
    rainNoise.connect(f); f.connect(g); g.connect(ambientGain);
    rainNoise.start();
  } else if (!rain && rainNoise) {
    try { rainNoise.stop(); } catch { /* noop */ }
    rainNoise = null;
  }
}

function scheduleAmbient(): void {
  if (ambientTimer) window.clearTimeout(ambientTimer);
  const c = ensureCtx();
  if (!c || !ambientGain) { return; }
  // pássaro: chilro curto aleatório (dia); grilo à noite é gerenciado pela UI via setNight
  if (!raining && Math.random() < 0.7) {
    const t0 = c.currentTime + Math.random() * 2;
    const chirps = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < chirps; i++) {
      const o = c.createOscillator(); const g = c.createGain();
      o.type = 'sine';
      const f = 2200 + Math.random() * 1600;
      o.frequency.setValueAtTime(f, t0 + i * 0.12);
      o.frequency.exponentialRampToValueAtTime(f * (1.2 + Math.random() * 0.3), t0 + i * 0.12 + 0.08);
      g.gain.setValueAtTime(0, t0 + i * 0.12);
      g.gain.linearRampToValueAtTime(0.05, t0 + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.12 + 0.1);
      o.connect(g); g.connect(ambientGain);
      o.start(t0 + i * 0.12); o.stop(t0 + i * 0.12 + 0.15);
    }
  }
  ambientTimer = window.setTimeout(scheduleAmbient, 4000 + Math.random() * 9000);
}
