// SFX via WebAudio — sintetizado, mais limpo e agradável.
// Foco: menos ruído áspero, envelopes suaves, gol com torcida + sino
// harmônico (sem sawtooth estridente).
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let reverbBus: GainNode | null = null;
let dryBus: GainNode | null = null;
let enabled = true;
let volume = 0.75; // 0..1

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = volume;
    // Compressor pra domar picos e evitar clipping/áspero.
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 24;
    comp.ratio.value = 3;
    comp.attack.value = 0.005;
    comp.release.value = 0.15;
    master.connect(comp).connect(ctx.destination);

    dryBus = ctx.createGain();
    dryBus.gain.value = 1;
    dryBus.connect(master);

    reverbBus = ctx.createGain();
    reverbBus.gain.value = 0.28;
    const conv = ctx.createConvolver();
    conv.buffer = makeImpulse(ctx, 1.6, 3.2);
    reverbBus.connect(conv).connect(master);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function makeImpulse(c: AudioContext, seconds: number, decay: number): AudioBuffer {
  const rate = c.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = c.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

export function setSfxEnabled(v: boolean) {
  enabled = v;
  if (typeof window !== "undefined") {
    try { localStorage.setItem("sfx-enabled", v ? "1" : "0"); } catch {}
  }
}
export function isSfxEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem("sfx-enabled");
    if (v !== null) enabled = v === "1";
  } catch {}
  return enabled;
}
export function setSfxVolume(v: number) {
  volume = Math.max(0, Math.min(1, v));
  if (typeof window !== "undefined") {
    try { localStorage.setItem("sfx-volume", String(volume)); } catch {}
  }
  if (master && ctx) {
    try { master.gain.setTargetAtTime(volume, ctx.currentTime, 0.01); } catch { master.gain.value = volume; }
  }
}
export function getSfxVolume(): number {
  if (typeof window === "undefined") return volume;
  try {
    const v = localStorage.getItem("sfx-volume");
    if (v !== null) {
      const n = parseFloat(v);
      if (Number.isFinite(n)) volume = Math.max(0, Math.min(1, n));
    }
  } catch {}
  return volume;
}

// --- Chat-specific settings (independent of the main SFX) --------------
let chatEnabled = true;
let chatVolume = 0.7; // 0..1 — multiplicador sobre o volume geral
export function setChatSfxEnabled(v: boolean) {
  chatEnabled = v;
  if (typeof window !== "undefined") {
    try { localStorage.setItem("sfx-chat-enabled", v ? "1" : "0"); } catch {}
  }
}
export function isChatSfxEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem("sfx-chat-enabled");
    if (v !== null) chatEnabled = v === "1";
  } catch {}
  return chatEnabled;
}
export function setChatSfxVolume(v: number) {
  chatVolume = Math.max(0, Math.min(1, v));
  if (typeof window !== "undefined") {
    try { localStorage.setItem("sfx-chat-volume", String(chatVolume)); } catch {}
  }
}
export function getChatSfxVolume(): number {
  if (typeof window === "undefined") return chatVolume;
  try {
    const v = localStorage.getItem("sfx-chat-volume");
    if (v !== null) {
      const n = parseFloat(v);
      if (Number.isFinite(n)) chatVolume = Math.max(0, Math.min(1, n));
    }
  } catch {}
  return chatVolume;
}

interface ToneOpts {
  freq: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  slideTo?: number;
  delay?: number;
  attack?: number;
  release?: number;
  wet?: number;
  detune?: number;
}

function tone(o: ToneOpts) {
  if (!isSfxEnabled()) return;
  const c = getCtx();
  if (!c || !dryBus || !reverbBus) return;
  const t0 = c.currentTime + (o.delay ?? 0);
  const osc = c.createOscillator();
  osc.type = o.type ?? "sine";
  if (o.detune) osc.detune.setValueAtTime(o.detune, t0);
  osc.frequency.setValueAtTime(o.freq, t0);
  if (o.slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.slideTo), t0 + o.dur);
  }
  const g = c.createGain();
  const peak = o.gain ?? 0.12;
  const attack = Math.max(0.003, o.attack ?? 0.01);
  const release = Math.max(0.03, o.release ?? o.dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + release);

  osc.connect(g);
  const wet = Math.max(0, Math.min(1, o.wet ?? 0.18));
  const dry = c.createGain(); dry.gain.value = 1 - wet;
  const rev = c.createGain(); rev.gain.value = wet;
  g.connect(dry).connect(dryBus);
  g.connect(rev).connect(reverbBus);

  osc.start(t0);
  osc.stop(t0 + o.dur + release + 0.1);
}

interface NoiseOpts {
  dur: number;
  gain?: number;
  delay?: number;
  attack?: number;
  filterType?: BiquadFilterType;
  filterFreq?: number;
  filterQ?: number;
  wet?: number;
}

function noise(o: NoiseOpts) {
  if (!isSfxEnabled()) return;
  const c = getCtx();
  if (!c || !dryBus || !reverbBus) return;
  const t0 = c.currentTime + (o.delay ?? 0);
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * o.dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;

  const filt = c.createBiquadFilter();
  filt.type = o.filterType ?? "lowpass";
  filt.frequency.value = o.filterFreq ?? 1200;
  filt.Q.value = o.filterQ ?? 0.7;

  const g = c.createGain();
  const peak = o.gain ?? 0.15;
  const attack = Math.max(0.002, o.attack ?? 0.005);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);

  const wet = Math.max(0, Math.min(1, o.wet ?? 0.12));
  const dry = c.createGain(); dry.gain.value = 1 - wet;
  const rev = c.createGain(); rev.gain.value = wet;
  src.connect(filt).connect(g);
  g.connect(dry).connect(dryBus);
  g.connect(rev).connect(reverbBus);

  src.start(t0);
  src.stop(t0 + o.dur + 0.1);
}

// Torcida: ruído rosa filtrado com swell suave (sem estalos).
function crowd(dur: number, gain = 0.28, delay = 0) {
  if (!isSfxEnabled()) return;
  const c = getCtx();
  if (!c || !dryBus || !reverbBus) return;
  const t0 = c.currentTime + delay;
  const buf = c.createBuffer(2, Math.floor(c.sampleRate * dur), c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      last = last * 0.985 + w * 0.015;
      d[i] = last * 12;
    }
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const hp = c.createBiquadFilter();
  hp.type = "highpass"; hp.frequency.value = 180;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = 1800;
  const g = c.createGain();
  const attack = Math.min(0.45, dur * 0.3);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.setValueAtTime(gain, t0 + Math.max(attack, dur - 0.5));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(hp).connect(lp).connect(g);
  g.connect(dryBus);
  const rev = c.createGain(); rev.gain.value = 0.4;
  g.connect(rev).connect(reverbBus);
  src.start(t0);
  src.stop(t0 + dur + 0.1);
}

// Sino/chime harmônico agradável (fundamental + parciais suaves).
function chime(freq: number, dur: number, delay = 0, gain = 0.14) {
  tone({ freq, dur, type: "sine", gain, delay, attack: 0.005, release: dur, wet: 0.35 });
  tone({ freq: freq * 2, dur: dur * 0.8, type: "sine", gain: gain * 0.5, delay, attack: 0.005, release: dur * 0.8, wet: 0.4 });
  tone({ freq: freq * 3, dur: dur * 0.5, type: "sine", gain: gain * 0.2, delay, attack: 0.005, release: dur * 0.5, wet: 0.45 });
}

// Vibração tátil (haptics) — silenciosa se o dispositivo não suportar
// ou se o áudio estiver mutado (respeita a preferência global do usuário).
export function vibrate(pattern: number | number[]) {
  if (!isSfxEnabled()) return;
  if (typeof navigator === "undefined") return;
  try { navigator.vibrate?.(pattern); } catch {}
}

export const sfx = {
  click: () => {
    tone({ freq: 900, dur: 0.05, type: "sine", gain: 0.08, attack: 0.003, release: 0.05, wet: 0.08 });
  },
  // Notificação de chat estilo "pop" curto e agradável — 2 sinos ascendentes.
  chatPing: () => {
    if (!isChatSfxEnabled()) return;
    const cv = getChatSfxVolume();
    if (cv <= 0) return;
    // Reaproveita chime() com ganho escalado pelo volume do chat.
    chime(880, 0.32, 0, 0.14 * cv);
    chime(1318.5, 0.42, 0.09, 0.12 * cv);
    tone({ freq: 1760, dur: 0.18, type: "sine", gain: 0.05 * cv, delay: 0.09, attack: 0.005, release: 0.18, wet: 0.4 });
  },
  select: () => {
    tone({ freq: 600, dur: 0.09, type: "sine", gain: 0.09, attack: 0.004, release: 0.09, wet: 0.15 });
    tone({ freq: 900, dur: 0.11, type: "sine", gain: 0.07, delay: 0.03, attack: 0.004, release: 0.11, wet: 0.2 });
  },
  // Selecionar carta FIFA: "swoosh" curto e brilhante, sincronizado com o glow do card.
  pickSelect: () => {
    tone({ freq: 720, dur: 0.11, type: "sine", gain: 0.11, slideTo: 1200, attack: 0.004, release: 0.11, wet: 0.22 });
    tone({ freq: 1440, dur: 0.14, type: "sine", gain: 0.06, delay: 0.02, attack: 0.005, release: 0.14, wet: 0.3 });
    noise({ dur: 0.09, gain: 0.04, filterType: "highpass", filterFreq: 3000, attack: 0.003, wet: 0.15 });
  },
  // Confirmar slot: "clank" metálico + chime harmônico ascendente estilo carta rara.
  pickConfirm: () => {
    tone({ freq: 220, dur: 0.08, type: "sine", gain: 0.22, slideTo: 90, attack: 0.002, release: 0.08, wet: 0.12 });
    noise({ dur: 0.06, gain: 0.05, filterType: "bandpass", filterFreq: 2200, filterQ: 6, attack: 0.002, wet: 0.15 });
    chime(783.99, 0.35, 0.04, 0.11);
    chime(1174.66, 0.45, 0.12, 0.10);
  },

  // Apito curto e limpo: tom senoidal alto com um sopro sutil.
  whistle: () => {
    tone({ freq: 2600, dur: 0.28, type: "sine", gain: 0.16, attack: 0.02, release: 0.28, wet: 0.25 });
    noise({ dur: 0.28, gain: 0.06, filterType: "bandpass", filterFreq: 2800, filterQ: 8, attack: 0.02, wet: 0.15 });
  },
  whistleLong: () => {
    tone({ freq: 2500, dur: 0.75, type: "sine", gain: 0.18, attack: 0.04, release: 0.75, wet: 0.35 });
    tone({ freq: 2500, dur: 0.75, type: "sine", gain: 0.08, detune: 8, attack: 0.04, release: 0.75, wet: 0.35 });
    noise({ dur: 0.75, gain: 0.05, filterType: "bandpass", filterFreq: 2700, filterQ: 10, attack: 0.05, wet: 0.2 });
  },
  // Chute: thump grave curto, sem estalos agudos.
  kick: () => {
    tone({ freq: 140, dur: 0.13, type: "sine", gain: 0.35, slideTo: 55, attack: 0.003, release: 0.13, wet: 0.08 });
    noise({ dur: 0.05, gain: 0.06, filterType: "lowpass", filterFreq: 500, attack: 0.002, wet: 0.05 });
  },
  // Gol: swell de torcida + chime harmônico ascendente (agradável, sem sawtooth).
  goal: () => {
    crowd(2.0, 0.42, 0.05);
    // Arpeggio maior em sinos: C5 E5 G5 C6
    chime(523.25, 0.55, 0.08, 0.13);
    chime(659.25, 0.55, 0.22, 0.13);
    chime(783.99, 0.7, 0.36, 0.14);
    chime(1046.5, 1.0, 0.55, 0.15);
  },
  // Defesa do goleiro: thud abafado + murmúrio breve.
  save: () => {
    tone({ freq: 110, dur: 0.15, type: "sine", gain: 0.28, slideTo: 55, attack: 0.003, release: 0.15, wet: 0.1 });
    noise({ dur: 0.1, gain: 0.08, filterType: "lowpass", filterFreq: 600, attack: 0.005, wet: 0.15 });
    crowd(0.6, 0.12, 0.05);
  },
  // Chute pra fora: descida suave + suspiro.
  miss: () => {
    tone({ freq: 700, dur: 0.4, type: "sine", gain: 0.1, slideTo: 220, attack: 0.01, release: 0.4, wet: 0.3 });
    crowd(0.55, 0.1, 0.08);
  },
  // Vitória: torcida forte + arpeggio maior mais longo.
  win: () => {
    crowd(2.5, 0.38, 0.05);
    chime(523.25, 0.5, 0.05, 0.13);
    chime(659.25, 0.5, 0.18, 0.13);
    chime(783.99, 0.5, 0.31, 0.13);
    chime(1046.5, 1.1, 0.46, 0.16);
    chime(1318.5, 1.1, 0.46, 0.10);
  },
  // Derrota: descida suave em senoides (sem trombone áspero).
  lose: () => {
    tone({ freq: 440, dur: 0.4, type: "sine", gain: 0.16, slideTo: 220, attack: 0.01, release: 0.4, wet: 0.35 });
    tone({ freq: 330, dur: 0.55, type: "sine", gain: 0.15, slideTo: 150, delay: 0.28, attack: 0.01, release: 0.55, wet: 0.4 });
    tone({ freq: 220, dur: 0.8, type: "sine", gain: 0.14, slideTo: 90, delay: 0.7, attack: 0.01, release: 0.8, wet: 0.45 });
  },
};
