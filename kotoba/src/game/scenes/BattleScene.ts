/* ============================================================
   KOTOBA — cena de batalha (Phaser). Controla o CENÁRIO atmosférico,
   partículas espirituais, névoa e os FX de impacto/câmera. Os
   personagens/HUD vivem na camada HTML sobreposta e são sincronizados
   pela CombatUI (que chama burst/shake/flash aqui).
   ============================================================ */
import Phaser from 'phaser';

export interface Mood { sky: [number, number]; hill: number; tree: number; mote: number; }
export const MOODS: Record<string, Mood> = {
  floresta: { sky: [0x1c3326, 0x0b1710], hill: 0x24402e, tree: 0x152a1c, mote: 0xbfead0 },
  cidade:   { sky: [0x2a2436, 0x120f1c], hill: 0x2e2942, tree: 0x1a1626, mote: 0xd8c8ff },
  palacio:  { sky: [0x33291c, 0x140f08], hill: 0x40331f, tree: 0x241a10, mote: 0xffe0a0 },
};

export class BattleScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Graphics;
  private motes!: Phaser.GameObjects.Particles.ParticleEmitter;
  private mist: Phaser.GameObjects.Ellipse[] = [];
  private mood: Mood = MOODS.floresta;

  constructor() { super('battle'); }

  create(): void {
    this.makeMoteTexture();
    this.bg = this.add.graphics();
    this.drawBackground();

    // névoa lenta
    for (let i = 0; i < 4; i++) {
      const e = this.add.ellipse(0, 0, 380, 120, 0xdfeee6, 0.05);
      this.mist.push(e);
      this.tweenMist(e, i);
    }
    // motes espirituais subindo devagar
    this.motes = this.add.particles(0, 0, 'mote', {
      x: { min: 0, max: this.scale.width },
      y: this.scale.height + 10,
      lifespan: 9000,
      speedY: { min: -26, max: -12 },
      speedX: { min: -8, max: 8 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.55, end: 0 },
      frequency: 420,
      tint: this.mood.mote,
      blendMode: 'ADD',
    });

    this.scale.on('resize', () => this.drawBackground());
  }

  private makeMoteTexture(): void {
    if (this.textures.exists('mote')) return;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xffffff, 1); g.fillCircle(8, 8, 3);
    g.fillStyle(0xffffff, 0.35); g.fillCircle(8, 8, 7);
    g.generateTexture('mote', 16, 16); g.destroy();
  }

  setMood(key: keyof typeof MOODS): void {
    this.mood = MOODS[key] ?? MOODS.floresta;
    this.drawBackground();
    this.motes?.setParticleTint(this.mood.mote);
  }

  private drawBackground(): void {
    const { width: w, height: h } = this.scale;
    const g = this.bg; g.clear();
    // céu em gradiente (faixas)
    const [c0, c1] = this.mood.sky;
    const steps = 24;
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      g.fillStyle(lerpColor(c0, c1, t), 1);
      g.fillRect(0, (h * i) / steps, w, h / steps + 1);
    }
    // luar / halo espiritual
    g.fillStyle(0xffffff, 0.05); g.fillCircle(w * 0.5, h * 0.28, Math.min(w, h) * 0.34);
    g.fillStyle(0xffffff, 0.04); g.fillCircle(w * 0.5, h * 0.28, Math.min(w, h) * 0.22);
    // colinas em camadas
    this.hill(g, h * 0.62, this.mood.hill, 0.55, 70);
    this.hill(g, h * 0.7, this.mood.hill, 0.75, 110);
    // torii silhueta central distante
    this.torii(g, w * 0.5, h * 0.66, Math.min(w, h) * 0.11, this.mood.tree);
    // árvores/silhuetas laterais
    this.tree(g, w * 0.12, h * 0.72, 60, this.mood.tree);
    this.tree(g, w * 0.88, h * 0.74, 74, this.mood.tree);
    // vinheta
    g.fillStyle(0x000000, 0.42); g.fillRect(0, 0, w, h * 0.14);
    g.fillStyle(0x000000, 0.5); g.fillRect(0, h * 0.82, w, h * 0.18);
  }

  private hill(g: Phaser.GameObjects.Graphics, y: number, col: number, alpha: number, amp: number): void {
    const w = this.scale.width, h = this.scale.height;
    g.fillStyle(col, alpha); g.beginPath(); g.moveTo(0, h);
    for (let x = 0; x <= w; x += 40) g.lineTo(x, y + Math.sin(x * 0.008) * amp * 0.3 + Math.cos(x * 0.02) * 12);
    g.lineTo(w, h); g.closePath(); g.fillPath();
  }
  private torii(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number, col: number): void {
    g.fillStyle(col, 0.6);
    g.fillRect(x - s * 1.2, y - s * 2.2, s * 0.16, s * 2.2);
    g.fillRect(x + s * 1.04, y - s * 2.2, s * 0.16, s * 2.2);
    g.fillRect(x - s * 1.5, y - s * 2.2, s * 3, s * 0.24);
    g.fillRect(x - s * 1.35, y - s * 1.7, s * 2.7, s * 0.16);
  }
  private tree(g: Phaser.GameObjects.Graphics, x: number, y: number, s: number, col: number): void {
    g.fillStyle(col, 0.7);
    g.fillRect(x - s * 0.06, y - s, s * 0.12, s);
    g.fillCircle(x, y - s, s * 0.5);
    g.fillCircle(x - s * 0.4, y - s * 0.8, s * 0.34);
    g.fillCircle(x + s * 0.42, y - s * 0.82, s * 0.3);
  }
  private tweenMist(e: Phaser.GameObjects.Ellipse, i: number): void {
    const h = this.scale.height, w = this.scale.width;
    e.setPosition(-200, h * (0.4 + i * 0.12));
    this.tweens.add({ targets: e, x: w + 200, duration: 26000 + i * 6000, repeat: -1, delay: i * 4000, ease: 'Linear' });
  }

  /* -------- FX chamados pela CombatUI (coords em fração 0..1) -------- */
  burst(colorHex: number, fx: number, fy: number, n = 14): void {
    const x = fx * this.scale.width, y = fy * this.scale.height;
    const p = this.add.particles(0, 0, 'mote', {
      x, y, lifespan: 620, speed: { min: 60, max: 220 }, angle: { min: 0, max: 360 },
      scale: { start: 0.8, end: 0 }, alpha: { start: 0.9, end: 0 }, tint: colorHex,
      blendMode: 'ADD', quantity: n, emitting: false,
    });
    p.explode(n, x, y);
    this.time.delayedCall(700, () => p.destroy());
  }
  shake(intensity = 0.006, dur = 160): void { this.cameras.main.shake(dur, intensity); }
  flash(colorHex = 0xffffff, dur = 120): void {
    const c = Phaser.Display.Color.IntegerToColor(colorHex);
    this.cameras.main.flash(dur, c.red, c.green, c.blue, false);
  }
}

function lerpColor(a: number, b: number, t: number): number {
  const ca = Phaser.Display.Color.IntegerToColor(a), cb = Phaser.Display.Color.IntegerToColor(b);
  const r = Math.round(ca.red + (cb.red - ca.red) * t);
  const g = Math.round(ca.green + (cb.green - ca.green) * t);
  const bl = Math.round(ca.blue + (cb.blue - ca.blue) * t);
  return (r << 16) | (g << 8) | bl;
}
