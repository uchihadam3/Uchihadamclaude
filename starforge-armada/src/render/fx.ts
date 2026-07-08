// Sistema de partículas: faíscas, fumaça, fragmentos, anéis de choque e
// clarões. Usado em explosões, impactos e rastros.
import { Ctx, glow, rgba, applyAlpha, poly, rand, parseColor } from './prims';

type Kind = 'spark' | 'smoke' | 'frag' | 'ring' | 'flash';
interface P {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; color: string;
  kind: Kind; rot: number; spin: number; drag: number; grav: number;
}

export class Particles {
  private ps: P[] = [];
  private cap = 900;

  get count(): number { return this.ps.length; }

  private push(p: P): void { if (this.ps.length < this.cap) this.ps.push(p); }

  update(dt: number): void {
    const ps = this.ps;
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      p.life -= dt;
      if (p.life <= 0) { ps.splice(i, 1); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= p.drag; p.vy *= p.drag;
      p.vy += p.grav * dt;
      p.rot += p.spin * dt;
    }
  }

  draw(ctx: Ctx): void {
    ctx.save();
    // fumaça primeiro (blend normal), depois aditivos
    ctx.globalCompositeOperation = 'source-over';
    for (const p of this.ps) if (p.kind === 'smoke') this.drawSmoke(ctx, p);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of this.ps) {
      if (p.kind === 'smoke') continue;
      const k = p.life / p.max;
      if (p.kind === 'spark') this.drawSpark(ctx, p, k);
      else if (p.kind === 'frag') this.drawFrag(ctx, p, k);
      else if (p.kind === 'ring') this.drawRing(ctx, p, k);
      else if (p.kind === 'flash') glow(ctx, p.x, p.y, p.size * (0.5 + k), p.color, k);
    }
    ctx.restore();
  }

  private drawSpark(ctx: Ctx, p: P, k: number): void {
    const sp = Math.hypot(p.vx, p.vy);
    const len = Math.min(26, sp * 0.03 + p.size);
    const ang = Math.atan2(p.vy, p.vx);
    const x2 = p.x - Math.cos(ang) * len, y2 = p.y - Math.sin(ang) * len;
    ctx.strokeStyle = applyAlpha(p.color, k);
    ctx.lineWidth = p.size * k;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(x2, y2); ctx.stroke();
  }

  private drawFrag(ctx: Ctx, p: P, k: number): void {
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = applyAlpha(p.color, k);
    poly(ctx, [-p.size, -p.size * 0.6, p.size, -p.size * 0.4, p.size * 0.5, p.size, -p.size * 0.7, p.size * 0.7]);
    ctx.fill();
    ctx.restore();
  }

  private drawRing(ctx: Ctx, p: P, k: number): void {
    const r = p.size * (1 - k) * 1.0 + p.size * 0.2;
    ctx.strokeStyle = applyAlpha(p.color, k * k);
    ctx.lineWidth = 2 + 6 * k;
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.stroke();
  }

  private drawSmoke(ctx: Ctx, p: P): void {
    const k = p.life / p.max;
    const r = p.size * (1.4 - k);
    const c = parseColor(p.color);
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
    g.addColorStop(0, rgba(c[0], c[1], c[2], 0.4 * k));
    g.addColorStop(1, rgba(c[0], c[1], c[2], 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
  }

  // ---- geradores ----
  explosion(x: number, y: number, scale: number, hue = '#ffb060', big = false): void {
    // clarão central
    this.push(mk(x, y, 0, 0, big ? 0.35 : 0.22, big ? scale * 3.2 : scale * 2, '#ffffff', 'flash'));
    this.push(mk(x, y, 0, 0, big ? 0.5 : 0.32, big ? scale * 2.6 : scale * 1.7, hue, 'flash'));
    // anéis de choque
    this.push(mk(x, y, 0, 0, big ? 0.6 : 0.4, big ? scale * 5 : scale * 3, '#ffffff', 'ring'));
    if (big) this.push(mk(x, y, 0, 0, 0.75, scale * 7, hue, 'ring'));
    // faíscas
    const ns = Math.round((big ? 26 : 14) * scale * 0.5) + 8;
    for (let i = 0; i < ns; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = rand(120, big ? 620 : 360) * (0.6 + scale * 0.3);
      this.push(mk(x, y, Math.cos(a) * sp, Math.sin(a) * sp, rand(0.3, 0.7), rand(1.6, 3.4), Math.random() < 0.5 ? '#fff2c8' : hue, 'spark', 0.9));
    }
    // fragmentos
    for (let i = 0; i < (big ? 12 : 6); i++) {
      const a = Math.random() * Math.PI * 2, sp = rand(60, 260);
      this.push(mk(x, y, Math.cos(a) * sp, Math.sin(a) * sp, rand(0.5, 1.1), rand(1.5, 3.5) * scale * 0.6 + 1.5, '#c88a58', 'frag', 0.94, 0, rand(-8, 8), 40));
    }
    // fumaça
    for (let i = 0; i < (big ? 10 : 5); i++) {
      const a = Math.random() * Math.PI * 2, sp = rand(20, 90);
      this.push(mk(x, y, Math.cos(a) * sp, Math.sin(a) * sp, rand(0.6, 1.3), rand(10, 22) * scale * 0.5 + 8, '#2a2028', 'smoke', 0.96));
    }
  }

  hit(x: number, y: number, hue = '#bfe9ff'): void {
    this.push(mk(x, y, 0, 0, 0.16, 10, '#ffffff', 'flash'));
    for (let i = 0; i < 7; i++) {
      const a = Math.random() * Math.PI * 2, sp = rand(80, 260);
      this.push(mk(x, y, Math.cos(a) * sp, Math.sin(a) * sp, rand(0.15, 0.4), rand(1.2, 2.4), hue, 'spark', 0.88));
    }
  }

  muzzle(x: number, y: number, hue = '#bfe9ff'): void {
    this.push(mk(x, y, 0, 0, 0.1, 9, hue, 'flash'));
  }

  trail(x: number, y: number, hue: string, size = 1.8): void {
    this.push(mk(x, y, rand(-12, 12), rand(-12, 12), rand(0.18, 0.34), size, hue, 'spark', 0.9));
  }
}

function mk(x: number, y: number, vx: number, vy: number, life: number, size: number, color: string, kind: Kind, drag = 0.92, rot = 0, spin = 0, grav = 0): P {
  return { x, y, vx, vy, life, max: life, size, color, kind, rot, spin, drag, grav };
}
