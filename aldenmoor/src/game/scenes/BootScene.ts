import Phaser from "phaser";
import { WORLD_W, WORLD_H, PARCHMENT_HI, PARCHMENT_LO } from "../config";

// Gera a textura de pergaminho (uma vez) e inicia o mundo + HUD.
export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  create() {
    this.makeParchment();
    this.makeVision();
    this.scene.start("world");
    this.scene.launch("hud");
  }

  // "Holofote" de visão (fog-of-war): centro transparente -> bordas escuras.
  private makeVision() {
    const S = 1024;
    const tex = this.textures.createCanvas("vision", S, S);
    if (!tex) return;
    const ctx = tex.getContext();
    const grad = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    grad.addColorStop(0.0, "rgba(8,6,4,0)");
    grad.addColorStop(0.44, "rgba(8,6,4,0)");
    grad.addColorStop(0.66, "rgba(8,6,4,0.38)");
    grad.addColorStop(1.0, "rgba(8,6,4,0.8)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, S, S);
    tex.refresh();
  }

  private makeParchment() {
    const w = WORLD_W;
    const h = WORLD_H;
    const tex = this.textures.createCanvas("parchment", w, h);
    if (!tex) return;
    const ctx = tex.getContext();

    // base
    const g = ctx.createRadialGradient(
      w * 0.5,
      h * 0.45,
      h * 0.2,
      w * 0.5,
      h * 0.5,
      h * 1.0,
    );
    g.addColorStop(0, PARCHMENT_HI);
    g.addColorStop(1, PARCHMENT_LO);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // fibras / grão
    for (let i = 0; i < 5200; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const a = Math.random() * 0.06;
      ctx.fillStyle =
        Math.random() < 0.5
          ? `rgba(90,60,30,${a})`
          : `rgba(255,244,208,${a})`;
      const s = Math.random() * 2 + 0.5;
      ctx.fillRect(x, y, s, s);
    }

    // manchas de envelhecimento
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 190 + 60;
      const a = Math.random() * 0.05 + 0.02;
      const sg = ctx.createRadialGradient(x, y, 0, x, y, r);
      sg.addColorStop(0, `rgba(120,80,40,${a})`);
      sg.addColorStop(1, "rgba(120,80,40,0)");
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // vinheta escura nas bordas
    const vg = ctx.createRadialGradient(
      w / 2,
      h / 2,
      h * 0.35,
      w / 2,
      h / 2,
      h * 0.8,
    );
    vg.addColorStop(0, "rgba(60,40,20,0)");
    vg.addColorStop(1, "rgba(45,28,10,0.55)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);

    tex.refresh();
  }
}
