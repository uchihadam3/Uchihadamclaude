// Áudio sintetizado (Web Audio): efeitos curtos e satisfatórios + uma trilha
// leve e nostálgica (violãozinho + shaker). Volumes separados p/ música e SFX.
let ctx: AudioContext | null = null;
let master: GainNode, sfxGain: GainNode, musGain: GainNode;
let slideNoise: AudioBufferSourceNode | null = null, slideGain: GainNode | null = null, slideFilt: BiquadFilterNode | null = null;
let musicOn = false; let musicTimer = 0;
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

// música: progressão simples e alegre + shaker (samba leve)
const CHORDS = [[196, 247, 294], [220, 262, 330], [175, 220, 262], [196, 247, 311]];
export function startMusic(): void { if (!ensure()) return; musicOn = true; musicTimer = 0; scheduleMusic(); }
export function stopMusic(): void { musicOn = false; }
function scheduleMusic(): void {
  if (!ctx || !musicOn) return;
  const t = ctx.currentTime; const bar = musicTimer % CHORDS.length; const ch = CHORDS[bar];
  ch.forEach(f => { const o = ctx!.createOscillator(); const g = ctx!.createGain(); o.type = 'triangle'; o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.06, t + 0.05); g.gain.exponentialRampToValueAtTime(0.001, t + 1.7);
    o.connect(g); g.connect(musGain); o.start(t); o.stop(t + 1.8); });
  // melodia + shaker
  const mel = [ch[2] * 2, ch[1] * 2, ch[2] * 2, ch[0] * 2];
  mel.forEach((f, i) => { const o = ctx!.createOscillator(); const g = ctx!.createGain(); o.type = 'sine'; o.frequency.value = f;
    const tt = t + i * 0.45; g.gain.setValueAtTime(0, tt); g.gain.linearRampToValueAtTime(0.05, tt + 0.03); g.gain.exponentialRampToValueAtTime(0.001, tt + 0.35);
    o.connect(g); g.connect(musGain); o.start(tt); o.stop(tt + 0.4); });
  for (let i = 0; i < 8; i++) noiseShaker(t + i * 0.225);
  musicTimer++;
  setTimeout(scheduleMusic, 1800);
}
function noiseShaker(t0: number): void {
  if (!ctx) return; const s = ctx.createBufferSource(); s.buffer = noiseBuf(); const f = ctx.createBiquadFilter(); const g = ctx.createGain();
  f.type = 'highpass'; f.frequency.value = 6000; g.gain.setValueAtTime(0.03, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08);
  s.connect(f); f.connect(g); g.connect(musGain); s.start(t0); s.stop(t0 + 0.1);
}

export function setMusicVol(v: number): void { settings.music = v; if (musGain) musGain.gain.value = v; }
export function setSfxVol(v: number): void { settings.sfx = v; if (sfxGain) sfxGain.gain.value = v; }
export function setMuted(m: boolean): void { settings.muted = m; if (master) master.gain.value = m ? 0 : 1; }
