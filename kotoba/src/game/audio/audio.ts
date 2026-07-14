/* ============================================================
   KOTOBA — áudio. 5 canais de volume (música, ambiente, sfx, ui,
   voz). SFX sintetizados (WebAudio, sem depender de arquivos) e voz
   japonesa via síntese do navegador — não atrasa o combate.
   Howler fica reservado para trilhas/arquivos futuros (stack).
   ============================================================ */
export type Channel = 'music' | 'ambient' | 'sfx' | 'ui' | 'voice';

class AudioBus {
  private ctx: AudioContext | null = null;
  private gains: Partial<Record<Channel, GainNode>> = {};
  vol: Record<Channel, number> = { music: 0.5, ambient: 0.5, sfx: 0.7, ui: 0.6, voice: 0.8 };
  muted = false;
  private jpVoice: SpeechSynthesisVoice | null = null;

  private ac(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      for (const ch of ['music', 'ambient', 'sfx', 'ui', 'voice'] as Channel[]) {
        const g = this.ctx.createGain();
        g.gain.value = this.vol[ch];
        g.connect(this.ctx.destination);
        this.gains[ch] = g;
      }
    }
    return this.ctx;
  }
  resume(): void { this.ac().resume?.(); if ('speechSynthesis' in window) this.pickVoice(); }
  setVol(ch: Channel, v: number): void { this.vol[ch] = v; if (this.gains[ch]) this.gains[ch]!.gain.value = this.muted ? 0 : v; }
  setMuted(m: boolean): void { this.muted = m; for (const ch of Object.keys(this.gains) as Channel[]) this.gains[ch]!.gain.value = m ? 0 : this.vol[ch]; }

  private env(ch: Channel, freq: number, dur: number, type: OscillatorType, gain = 0.5, glideTo?: number): void {
    if (this.muted) return;
    const ac = this.ac(); const t = ac.currentTime;
    const o = ac.createOscillator(); const g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    o.connect(g); g.connect(this.gains[ch]!); o.start(t); o.stop(t + dur + 0.02);
  }
  private noise(ch: Channel, dur: number, gain = 0.4, hp = 800): void {
    if (this.muted) return;
    const ac = this.ac(); const t = ac.currentTime;
    const n = Math.floor(ac.sampleRate * dur);
    const buf = ac.createBuffer(1, n, ac.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = ac.createBufferSource(); src.buffer = buf;
    const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp;
    const g = ac.createGain(); g.gain.value = gain;
    src.connect(f); f.connect(g); g.connect(this.gains[ch]!); src.start(t);
  }

  /* -------- vocabulário de SFX -------- */
  ui(): void { this.env('ui', 520, 0.06, 'triangle', 0.25, 720); }
  hover(): void { this.env('ui', 360, 0.04, 'sine', 0.12); }
  cardPlay(): void { this.env('sfx', 300, 0.14, 'triangle', 0.3, 620); }
  slash(): void { this.noise('sfx', 0.16, 0.5, 1400); this.env('sfx', 220, 0.12, 'sawtooth', 0.2, 90); }
  block(): void { this.env('sfx', 180, 0.18, 'sine', 0.4, 260); this.noise('sfx', 0.08, 0.15, 500); }
  heal(): void { this.env('sfx', 440, 0.22, 'sine', 0.3, 880); this.env('sfx', 660, 0.28, 'sine', 0.18, 990); }
  hurt(): void { this.env('sfx', 160, 0.16, 'square', 0.3, 70); }
  enemyHit(): void { this.env('sfx', 90, 0.2, 'sawtooth', 0.35, 50); this.noise('sfx', 0.12, 0.3, 300); }
  correct(): void { [523, 659, 784].forEach((f, i) => setTimeout(() => this.env('ui', f, 0.16, 'triangle', 0.25), i * 70)); }
  soft(): void { this.env('ui', 300, 0.1, 'sine', 0.14, 240); }
  discover(): void { [392, 523, 659, 880].forEach((f, i) => setTimeout(() => this.env('voice', f, 0.24, 'sine', 0.22), i * 90)); }
  win(): void { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.env('music', f, 0.3, 'triangle', 0.3), i * 130)); }
  lose(): void { [392, 330, 262].forEach((f, i) => setTimeout(() => this.env('music', f, 0.4, 'sine', 0.3, f * 0.6), i * 200)); }

  /* -------- voz japonesa (TTS do navegador; fallback sem arquivos) -------- */
  private pickVoice(): void {
    const vs = speechSynthesis.getVoices();
    this.jpVoice = vs.find((v) => v.lang?.toLowerCase().startsWith('ja')) ?? null;
  }
  speak(text: string, slow = false): void {
    if (this.muted || !('speechSynthesis' in window)) return;
    if (!this.jpVoice) this.pickVoice();
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP'; if (this.jpVoice) u.voice = this.jpVoice;
      u.rate = slow ? 0.62 : 0.92; u.volume = this.vol.voice;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch { /* silencioso */ }
  }
}

export const audio = new AudioBus();
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => audio.resume();
