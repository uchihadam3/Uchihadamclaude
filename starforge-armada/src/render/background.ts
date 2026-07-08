// Cenário espacial cinematográfico: parallax, nebulosa animada, planeta,
// campo de estrelas com profundidade, destroços e poeira cósmica.
import { Ctx, glow, rgba, rand, applyAlpha, poly, sparkle } from './prims';

interface Star { x: number; y: number; z: number; r: number; tw: number; hue: string; }
interface Dust { x: number; y: number; z: number; len: number; a: number; }
interface Debris { x: number; y: number; z: number; rot: number; spin: number; size: number; shape: number[]; tone: number; }
interface Blob { x: number; y: number; r: number; color: string; drift: number; ph: number; }

export class Background {
  w = 0; h = 0;
  private stars: Star[] = [];
  private dust: Dust[] = [];
  private debris: Debris[] = [];
  private nebula: Blob[] = [];
  private planet = { x: 0, y: 0, r: 0 };
  private t = 0;

  resize(w: number, h: number): void {
    this.w = w; this.h = h;
    const area = w * h;
    // estrelas em 4 camadas de profundidade
    this.stars = [];
    const nStars = Math.min(340, Math.round(area / 5200));
    for (let i = 0; i < nStars; i++) {
      const z = Math.random();
      this.stars.push({
        x: Math.random() * w, y: Math.random() * h, z,
        r: 0.4 + z * z * 1.9,
        tw: Math.random() * Math.PI * 2,
        hue: pickStarColor(),
      });
    }
    // poeira cósmica (motes rápidos, sutis)
    this.dust = [];
    for (let i = 0; i < Math.min(150, Math.round(area / 9000)); i++) {
      this.dust.push({ x: Math.random() * w, y: Math.random() * h, z: rand(0.5, 1), len: rand(6, 26), a: rand(0.06, 0.3) });
    }
    // destroços flutuando (profundidade média)
    this.debris = [];
    for (let i = 0; i < 7; i++) this.debris.push(makeDebris(w, h));
    // nebulosa: blobs coloridos grandes
    this.nebula = [
      { x: w * 0.22, y: h * 0.30, r: Math.max(w, h) * 0.55, color: '#7b2ff7', drift: 9, ph: 0.0 },
      { x: w * 0.78, y: h * 0.20, r: Math.max(w, h) * 0.5, color: '#12b6c9', drift: 11, ph: 1.7 },
      { x: w * 0.60, y: h * 0.62, r: Math.max(w, h) * 0.62, color: '#d83a8e', drift: 7, ph: 3.1 },
      { x: w * 0.12, y: h * 0.78, r: Math.max(w, h) * 0.44, color: '#2a4bd8', drift: 8, ph: 4.6 },
    ];
    // planeta grande atrás, canto superior direito
    this.planet = { x: w * 0.80, y: h * 0.16, r: Math.min(w, h) * 0.36 };
  }

  update(dt: number, scroll: number): void {
    this.t += dt;
    for (const s of this.stars) {
      s.y += scroll * (0.16 + s.z * 1.0) * dt * 60;
      s.tw += dt * (1.2 + s.z);
      if (s.y > this.h + 4) { s.y = -4; s.x = Math.random() * this.w; }
    }
    for (const d of this.dust) {
      d.y += scroll * (1.6 + d.z * 2.2) * dt * 60;
      if (d.y > this.h + d.len) { d.y = -d.len; d.x = Math.random() * this.w; }
    }
    for (const db of this.debris) {
      db.y += scroll * (0.4 + db.z * 0.7) * dt * 60;
      db.x += Math.sin(this.t * 0.3 + db.z * 6) * 0.15;
      db.rot += db.spin * dt;
      if (db.y > this.h + db.size * 2) Object.assign(db, makeDebris(this.w, -db.size * 2 - Math.random() * this.h * 0.4, true));
    }
  }

  // Fundo profundo: gradiente do espaço, nebulosa, planeta, estrelas, destroços.
  drawBack(ctx: Ctx): void {
    const { w, h, t } = this;
    // base do espaço
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#070a1a');
    bg.addColorStop(0.5, '#0a0714');
    bg.addColorStop(1, '#05060f');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

    // nebulosa (aditiva, com drift)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const b of this.nebula) {
      const dx = Math.sin(t * 0.05 + b.ph) * b.drift;
      const dy = Math.cos(t * 0.04 + b.ph) * b.drift;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.15 + b.ph);
      const g = ctx.createRadialGradient(b.x + dx, b.y + dy, 0, b.x + dx, b.y + dy, b.r);
      g.addColorStop(0, applyAlpha(b.color, 0.44 + pulse * 0.16));
      g.addColorStop(0.35, applyAlpha(b.color, 0.2));
      g.addColorStop(0.7, applyAlpha(b.color, 0.06));
      g.addColorStop(1, applyAlpha(b.color, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x + dx, b.y + dy, b.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // estrelas distantes (z baixo)
    this.drawStars(ctx, 0, 0.5);

    // planeta
    this.drawPlanet(ctx);

    // estrelas próximas (brilhantes)
    this.drawStars(ctx, 0.5, 1);

    // destroços (silhueta com rim light)
    for (const db of this.debris) this.drawDebris(ctx, db);
  }

  // Poeira em primeiro plano (sobre o gameplay), leve, para dar profundidade.
  drawFront(ctx: Ctx): void {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const d of this.dust) {
      const g = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.len);
      g.addColorStop(0, rgba(150, 210, 255, 0));
      g.addColorStop(0.5, rgba(150, 210, 255, d.a));
      g.addColorStop(1, rgba(150, 210, 255, 0));
      ctx.strokeStyle = g; ctx.lineWidth = 1.1 + d.z;
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y + d.len); ctx.stroke();
    }
    ctx.restore();
  }

  private drawStars(ctx: Ctx, zLo: number, zHi: number): void {
    for (const s of this.stars) {
      if (s.z < zLo || s.z >= zHi) continue;
      const tw = 0.55 + 0.45 * Math.sin(s.tw);
      const a = (0.3 + s.z * 0.8) * tw;
      if (s.z > 0.7 && s.r > 1.2) {
        glow(ctx, s.x, s.y, s.r * 5.5, s.hue, a * 0.6);
      }
      // estrelas "herói": flare em cruz cintilante
      if (s.z > 0.9 && s.r > 1.7) {
        sparkle(ctx, s.x, s.y, s.r * 6 * tw, applyAlpha(s.hue, a * 0.85), 0);
      }
      ctx.fillStyle = applyAlpha('#ffffff', Math.min(1, a * 1.1));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  private drawPlanet(ctx: Ctx): void {
    const { x, y, r } = this.planet;
    // atmosfera externa (glow aditivo)
    glow(ctx, x, y, r * 1.7, '#3a6fff', 0.28);
    // corpo do planeta com terminador
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
    const body = ctx.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.1, x, y, r * 1.15);
    body.addColorStop(0, '#6f86c8');
    body.addColorStop(0.4, '#3a4e86');
    body.addColorStop(0.72, '#20264a');
    body.addColorStop(1, '#0a0c1c');
    ctx.fillStyle = body; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    // bandas atmosféricas
    ctx.globalAlpha = 0.14; ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 5; i++) {
      const by = y - r * 0.6 + i * r * 0.32;
      ctx.fillStyle = i % 2 ? '#8ea6e6' : '#5a6db0';
      ctx.beginPath(); ctx.ellipse(x, by, r * 1.1, r * 0.11, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    // rim light de atmosfera (crescente iluminado)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = r * 0.05;
    const rim = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    rim.addColorStop(0, rgba(120, 180, 255, 0.9));
    rim.addColorStop(0.5, rgba(120, 180, 255, 0.05));
    rim.addColorStop(1, rgba(120, 180, 255, 0));
    ctx.strokeStyle = rim;
    ctx.beginPath(); ctx.arc(x, y, r * 0.985, Math.PI * 0.9, Math.PI * 1.9); ctx.stroke();
    ctx.restore();
  }

  private drawDebris(ctx: Ctx, db: Debris): void {
    ctx.save();
    ctx.translate(db.x, db.y);
    ctx.rotate(db.rot);
    const s = db.size;
    const base = 30 + db.tone * 30;
    // corpo metálico
    const g = ctx.createLinearGradient(-s, -s, s, s);
    g.addColorStop(0, rgba(base + 40, base + 46, base + 60, 1));
    g.addColorStop(0.5, rgba(base, base + 4, base + 14, 1));
    g.addColorStop(1, rgba(base - 18, base - 16, base - 8, 1));
    ctx.fillStyle = g;
    poly(ctx, db.shape.map((v, i) => v * s * (i % 2 ? 1 : 1)));
    ctx.fill();
    // rim light
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = rgba(150, 190, 255, 0.35);
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }
}

function pickStarColor(): string {
  const r = Math.random();
  if (r < 0.6) return '#dfe9ff';
  if (r < 0.78) return '#9fc4ff';
  if (r < 0.9) return '#ffd9a8';
  return '#ff9fd0';
}

function makeDebris(w: number, hOrY: number, asY = false): Debris {
  const n = 5 + (Math.random() * 3 | 0);
  const shape: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = 0.5 + Math.random() * 0.55;
    shape.push(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  return {
    x: Math.random() * w,
    y: asY ? hOrY : Math.random() * hOrY,
    z: Math.random(),
    rot: Math.random() * Math.PI * 2,
    spin: rand(-0.5, 0.5),
    size: rand(10, 30),
    shape,
    tone: Math.random(),
  };
}
