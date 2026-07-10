// SFX sintetizados — o TAPA do tazo é o som mais importante do jogo.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
function ensure(): boolean {
  if (!ctx) { try { ctx = new AudioContext(); master = ctx.createGain(); master.gain.value = 0.8; master.connect(ctx.destination); } catch { return false; } }
  return !!ctx;
}
export function resumeAudio(): void { if (ensure() && ctx!.state === 'suspended') ctx!.resume(); }

function noiseHit(t: number, dur: number, vol: number, freq: number, q = 1): void {
  const c = ctx!; const n = c.createBufferSource();
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  n.buffer = buf;
  const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
  const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  n.connect(f); f.connect(g); g.connect(master!); n.start(t);
}
function tone(freq: number, t: number, dur: number, type: OscillatorType, vol: number, slide = 0): void {
  const c = ctx!; const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
  const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(master!); o.start(t); o.stop(t + dur + 0.02);
}

export const sfx = {
  slam(power = 0.7): void {   // O TAPA: estalo seco + corpo
    if (!ensure()) return; const t = ctx!.currentTime;
    noiseHit(t, 0.07, 0.9 * power, 2400, 0.8);
    noiseHit(t, 0.14, 0.7 * power, 700, 1.2);
    tone(120 - power * 30, t, 0.12, 'sine', 0.5 * power, -60);
  },
  land(): void {   // tazo pousando (clack de papelão)
    if (!ensure()) return; const t = ctx!.currentTime;
    noiseHit(t, 0.05, 0.4, 1700, 1.4); tone(220, t, 0.05, 'triangle', 0.18, -80);
  },
  flip(n: number): void {   // virou! (n = quantos)
    if (!ensure()) return; const t = ctx!.currentTime;
    for (let i = 0; i < Math.min(n, 6); i++) tone(420 + i * 110, t + i * 0.09, 0.16, 'triangle', 0.32, 60);
  },
  charge(v: number): void { if (!ensure()) return; const t = ctx!.currentTime; tone(180 + v * 320, t, 0.05, 'square', 0.05); },
  win(): void {
    if (!ensure()) return; const t = ctx!.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.13, 0.3, 'triangle', 0.35));
  },
  lose(): void {
    if (!ensure()) return; const t = ctx!.currentTime;
    [392, 330, 262].forEach((f, i) => tone(f, t + i * 0.16, 0.3, 'sawtooth', 0.14));
  },
  ui(): void { if (!ensure()) return; tone(660, ctx!.currentTime, 0.06, 'triangle', 0.2); },
};
