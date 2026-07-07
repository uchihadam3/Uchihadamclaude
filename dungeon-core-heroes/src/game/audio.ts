// ============ ÁUDIO SINTETIZADO (Web Audio) — SFX + música generativa ============

let ac: AudioContext | null = null;
let master: GainNode, sfxBus: GainNode, musicBus: GainNode, ambBus: GainNode;
let vol = { master: 0.8, music: 0.55, sfx: 0.8, ambient: 0.5 };
let musicTimer: number | null = null;
let currentTheme = -1;

function ctx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ac) {
    try {
      ac = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      master = ac.createGain(); master.gain.value = vol.master; master.connect(ac.destination);
      sfxBus = ac.createGain(); sfxBus.gain.value = vol.sfx; sfxBus.connect(master);
      musicBus = ac.createGain(); musicBus.gain.value = vol.music; musicBus.connect(master);
      ambBus = ac.createGain(); ambBus.gain.value = vol.ambient; ambBus.connect(master);
    } catch { return null; }
  }
  return ac;
}

export function resumeAudio(): void { const a = ctx(); if (a && a.state === 'suspended') a.resume(); }
export function setVolumes(v: Partial<typeof vol>): void {
  vol = { ...vol, ...v };
  if (ac) { master.gain.value = vol.master; sfxBus.gain.value = vol.sfx; musicBus.gain.value = vol.music; ambBus.gain.value = vol.ambient; }
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, bus: GainNode, when = 0, glideTo?: number): void {
  const a = ctx(); if (!a) return;
  const t = a.currentTime + when;
  const o = a.createOscillator(); const g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, glideTo), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur: number, gain: number, bus: GainNode, filterFreq: number, when = 0): void {
  const a = ctx(); if (!a) return;
  const t = a.currentTime + when;
  const n = Math.floor(a.sampleRate * dur);
  const buf = a.createBuffer(1, n, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = filterFreq; f.Q.value = 0.8;
  const g = a.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f); f.connect(g); g.connect(bus); src.start(t);
}

// ---------- SFX ----------
export const Sfx = {
  hit() { if (!ctx()) return; noise(0.09, 0.28, sfxBus, 900); tone(180, 0.08, 'square', 0.12, sfxBus, 0, 90); },
  crit() { if (!ctx()) return; noise(0.14, 0.4, sfxBus, 1400); tone(260, 0.14, 'sawtooth', 0.18, sfxBus, 0, 120); tone(520, 0.12, 'square', 0.1, sfxBus, 0.02); },
  cast() { if (!ctx()) return; tone(400, 0.25, 'sine', 0.14, sfxBus, 0, 900); tone(600, 0.22, 'triangle', 0.08, sfxBus, 0.03); },
  aoe() { if (!ctx()) return; noise(0.3, 0.35, sfxBus, 500); tone(120, 0.3, 'sawtooth', 0.16, sfxBus, 0, 40); },
  heal() { if (!ctx()) return; tone(520, 0.3, 'sine', 0.12, sfxBus, 0, 780); tone(660, 0.3, 'sine', 0.09, sfxBus, 0.05, 990); },
  potion() { if (!ctx()) return; tone(300, 0.2, 'sine', 0.12, sfxBus, 0, 700); noise(0.12, 0.12, sfxBus, 2200, 0.05); },
  death() { if (!ctx()) return; tone(200, 0.5, 'sawtooth', 0.18, sfxBus, 0, 50); noise(0.4, 0.2, sfxBus, 300); },
  bossPhase() { if (!ctx()) return; tone(90, 0.6, 'sawtooth', 0.22, sfxBus, 0, 60); tone(180, 0.5, 'square', 0.12, sfxBus, 0.05); noise(0.5, 0.25, sfxBus, 400); },
  victory() { if (!ctx()) return; [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.5, 'triangle', 0.14, sfxBus, i * 0.12)); },
  defeat() { if (!ctx()) return; [392, 330, 262, 196].forEach((f, i) => tone(f, 0.5, 'sine', 0.14, sfxBus, i * 0.16, f * 0.8)); },
  card(rarity = 0) { if (!ctx()) return; const base = 440 + rarity * 120; tone(base, 0.18, 'triangle', 0.12, sfxBus, 0); tone(base * 1.5, 0.2, 'sine', 0.1, sfxBus, 0.06); if (rarity >= 3) tone(base * 2, 0.3, 'sine', 0.08, sfxBus, 0.12); },
  click() { if (!ctx()) return; tone(600, 0.05, 'square', 0.08, sfxBus, 0, 500); },
  coin() { if (!ctx()) return; tone(880, 0.08, 'square', 0.1, sfxBus, 0); tone(1320, 0.1, 'square', 0.08, sfxBus, 0.05); },
  unlock() { if (!ctx()) return; [440, 554, 659, 880].forEach((f, i) => tone(f, 0.3, 'triangle', 0.12, sfxBus, i * 0.09)); },
};

// ---------- MÚSICA GENERATIVA ----------
const SCALES = [
  [0, 2, 3, 5, 7, 8, 10], // menor natural (sombrio)
  [0, 2, 3, 5, 7, 9, 10], // dórico
  [0, 1, 3, 5, 6, 8, 10], // locrio (tenso — dungeons profundas)
];
const ROOTS = [130.81, 146.83, 164.81, 174.61, 196.0]; // C3..G3

export function playMusic(themeId: number): void {
  const a = ctx(); if (!a) return;
  if (themeId === currentTheme && musicTimer != null) return;
  stopMusic();
  currentTheme = themeId;
  const root = ROOTS[themeId % ROOTS.length];
  const scale = SCALES[Math.min(2, Math.floor(themeId / 4))];
  let step = 0;
  const beat = () => {
    if (!ac) return;
    const t0 = 0;
    // pad (acorde sustentado)
    if (step % 8 === 0) {
      [0, 2, 4].forEach((d, i) => {
        const semi = scale[d % scale.length] + (i === 2 ? 12 : 0);
        tone(root * Math.pow(2, semi / 12), 2.4, 'sine', 0.05, musicBus, t0);
      });
    }
    // baixo
    if (step % 2 === 0) tone(root / 2 * Math.pow(2, scale[(step / 2) % scale.length] / 12), 0.5, 'triangle', 0.08, musicBus, t0);
    // arpejo/melodia esparsa
    if (Math.random() < 0.55) {
      const semi = scale[Math.floor(Math.random() * scale.length)] + 12;
      tone(root * Math.pow(2, semi / 12), 0.4, 'triangle', 0.045, musicBus, t0 + Math.random() * 0.1);
    }
    step++;
  };
  beat();
  musicTimer = window.setInterval(beat, 480);
}
export function stopMusic(): void { if (musicTimer != null) { clearInterval(musicTimer); musicTimer = null; } currentTheme = -1; }
