// Gerenciador central de áudio: dois canais de volume (Efeitos e Música) + um
// mudo geral, com persistência em localStorage. Cada elemento <audio> se
// registra num canal com um volume-base próprio; o manager mantém o volume
// EFETIVO de todos (base × volume do canal, ou 0 se mudo).

type Channel = "sfx" | "music";
interface Reg { el: HTMLAudioElement; channel: Channel; base: number; }

const KEY = "gh-audio";
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

class AudioManager {
  sfx = 0.8;
  music = 0.5;
  muted = false;
  private regs: Reg[] = [];

  constructor() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (typeof s.sfx === "number") this.sfx = clamp01(s.sfx);
        if (typeof s.music === "number") this.music = clamp01(s.music);
        this.muted = !!s.muted;
      }
    } catch { /* sem persistência: usa os padrões */ }
  }

  // registra um <audio> num canal; devolve o próprio elemento (p/ encadear)
  register(el: HTMLAudioElement, channel: Channel, base = 1): HTMLAudioElement {
    this.regs.push({ el, channel, base });
    el.volume = this.effective(channel, base);
    return el;
  }

  private effective(c: Channel, base: number): number {
    if (this.muted) return 0;
    return clamp01(base * (c === "sfx" ? this.sfx : this.music));
  }
  private apply() { for (const r of this.regs) r.el.volume = this.effective(r.channel, r.base); }
  private save() {
    try { localStorage.setItem(KEY, JSON.stringify({ sfx: this.sfx, music: this.music, muted: this.muted })); }
    catch { /* ignora */ }
  }

  setSfx(v: number) { this.sfx = clamp01(v); this.apply(); this.save(); }
  setMusic(v: number) { this.music = clamp01(v); this.apply(); this.save(); }
  setMuted(m: boolean) { this.muted = m; this.apply(); this.save(); }
}

export const audio = new AudioManager();
