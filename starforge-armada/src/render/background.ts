// Cenário espacial cinematográfico dirigido por TEMA: cada setor/modo tem sua
// própria paleta de nebulosa, cor de estrelas, elemento cênico (planeta, sol,
// buraco negro, estação, fenda ou cristais) e partículas de ambiente.
import { Ctx, glow, rgba, rand, applyAlpha, poly, sparkle } from './prims';
import { BgTheme, SetPiece, THEMES } from './bgThemes';

interface Star { x: number; y: number; z: number; r: number; tw: number; hue: string; }
interface Dust { x: number; y: number; z: number; len: number; a: number; }
interface Debris { x: number; y: number; z: number; rot: number; spin: number; size: number; shape: number[]; tone: number; }
interface Blob { x: number; y: number; r: number; color: string; drift: number; ph: number; }
interface Amb { x: number; y: number; vx: number; vy: number; r: number; ph: number; }

export class Background {
  w = 0; h = 0;
  private theme: BgTheme = THEMES.menu;
  private stars: Star[] = [];
  private dust: Dust[] = [];
  private debris: Debris[] = [];
  private nebula: Blob[] = [];
  private amb: Amb[] = [];
  private set: SetPiece = { kind: 'none' };
  private t = 0;

  setTheme(theme: BgTheme): void { this.theme = theme; if (this.w) this.build(); }

  resize(w: number, h: number): void { this.w = w; this.h = h; this.build(); }

  private build(): void {
    const { w, h } = this; const th = this.theme; const area = w * h;
    // estrelas em camadas de profundidade, tingidas pelo tema
    this.stars = [];
    const nStars = Math.min(340, Math.round(area / 5200));
    for (let i = 0; i < nStars; i++) {
      const z = Math.random();
      this.stars.push({ x: Math.random() * w, y: Math.random() * h, z, r: 0.4 + z * z * 1.9, tw: Math.random() * Math.PI * 2, hue: th.stars[(Math.random() * th.stars.length) | 0] });
    }
    // poeira cósmica
    this.dust = [];
    for (let i = 0; i < Math.min(150, Math.round(area / 9000)); i++) this.dust.push({ x: Math.random() * w, y: Math.random() * h, z: rand(0.5, 1), len: rand(6, 26), a: rand(0.06, 0.3) });
    // destroços (quantidade por tema)
    this.debris = [];
    for (let i = 0; i < th.debris; i++) this.debris.push(makeDebris(w, h));
    // nebulosa do tema
    this.nebula = th.nebula.map((b, i) => ({ x: b.x * w, y: b.y * h, r: b.r * Math.max(w, h), color: b.color, drift: 7 + (i % 3) * 2, ph: i * 1.5 }));
    // elemento cênico com coords absolutas
    this.set = this.absSet(th.set);
    // partículas de ambiente
    this.amb = [];
    if (th.ambient !== 'none') {
      const n = th.ambient === 'snow' ? 60 : th.ambient === 'embers' ? 46 : 70;
      for (let i = 0; i < Math.min(n, Math.round(area / 12000) + 20); i++) this.amb.push(this.makeAmb());
    }
  }

  private absSet(s: SetPiece): SetPiece {
    const { w, h } = this; const m = Math.min(w, h);
    switch (s.kind) {
      case 'planet': return { ...s, x: s.x * w, y: s.y * h, r: s.r * m };
      case 'sun': return { ...s, x: s.x * w, y: s.y * h, r: s.r * m };
      case 'blackhole': return { ...s, x: s.x * w, y: s.y * h, r: s.r * m };
      case 'station': return { ...s, x: s.x * w, y: s.y * h, r: s.r * m };
      case 'rift': return { ...s, x: s.x * w, y: s.y * h, r: s.r * m };
      case 'crystal': return { ...s, x: s.x * w, y: s.y * h, r: s.r * m };
      default: return s;
    }
  }

  private makeAmb(): Amb {
    const kind = this.theme.ambient;
    if (kind === 'snow') return { x: Math.random() * this.w, y: Math.random() * this.h, vx: rand(-6, 6), vy: rand(10, 26), r: rand(0.8, 2.2), ph: Math.random() * 6 };
    if (kind === 'embers') return { x: Math.random() * this.w, y: Math.random() * this.h, vx: rand(-8, 8), vy: -rand(14, 34), r: rand(0.8, 2.4), ph: Math.random() * 6 };
    return { x: Math.random() * this.w, y: Math.random() * this.h, vx: rand(-4, 4), vy: rand(-4, 4), r: rand(0.6, 1.6), ph: Math.random() * 6 }; // sparks
  }

  update(dt: number, scroll: number): void {
    this.t += dt;
    for (const s of this.stars) { s.y += scroll * (0.16 + s.z * 1.0) * dt * 60; s.tw += dt * (1.2 + s.z); if (s.y > this.h + 4) { s.y = -4; s.x = Math.random() * this.w; } }
    for (const d of this.dust) { d.y += scroll * (1.6 + d.z * 2.2) * dt * 60; if (d.y > this.h + d.len) { d.y = -d.len; d.x = Math.random() * this.w; } }
    for (const db of this.debris) { db.y += scroll * (0.4 + db.z * 0.7) * dt * 60; db.x += Math.sin(this.t * 0.3 + db.z * 6) * 0.15; db.rot += db.spin * dt; if (db.y > this.h + db.size * 2) Object.assign(db, makeDebris(this.w, -db.size * 2 - Math.random() * this.h * 0.4, true)); }
    for (const a of this.amb) {
      a.ph += dt * 3;
      a.x += (a.vx + Math.sin(this.t * 0.8 + a.ph) * 6) * dt;
      a.y += a.vy * dt;
      if (a.y > this.h + 6) { a.y = -6; a.x = Math.random() * this.w; }
      if (a.y < -6) { a.y = this.h + 6; a.x = Math.random() * this.w; }
      if (a.x < -6) a.x = this.w + 6; if (a.x > this.w + 6) a.x = -6;
    }
  }

  drawBack(ctx: Ctx): void {
    const { w, h } = this; const th = this.theme;
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, th.base[0]); bg.addColorStop(0.5, th.base[1]); bg.addColorStop(1, th.base[2]);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

    // nebulosa aditiva com drift
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const b of this.nebula) {
      const dx = Math.sin(this.t * 0.05 + b.ph) * b.drift, dy = Math.cos(this.t * 0.04 + b.ph) * b.drift;
      const pulse = 0.5 + 0.5 * Math.sin(this.t * 0.15 + b.ph);
      const g = ctx.createRadialGradient(b.x + dx, b.y + dy, 0, b.x + dx, b.y + dy, b.r);
      g.addColorStop(0, applyAlpha(b.color, 0.42 + pulse * 0.16));
      g.addColorStop(0.35, applyAlpha(b.color, 0.2));
      g.addColorStop(0.7, applyAlpha(b.color, 0.06));
      g.addColorStop(1, applyAlpha(b.color, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x + dx, b.y + dy, b.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    this.drawStars(ctx, 0, 0.5);
    this.drawSet(ctx);
    this.drawStars(ctx, 0.5, 1);
    for (const db of this.debris) this.drawDebris(ctx, db);
  }

  drawFront(ctx: Ctx): void {
    // poeira vertical
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const d of this.dust) {
      const g = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.len);
      g.addColorStop(0, rgba(150, 210, 255, 0)); g.addColorStop(0.5, rgba(150, 210, 255, d.a)); g.addColorStop(1, rgba(150, 210, 255, 0));
      ctx.strokeStyle = g; ctx.lineWidth = 1.1 + d.z; ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y + d.len); ctx.stroke();
    }
    // partículas de ambiente
    const kind = this.theme.ambient;
    if (kind !== 'none') {
      const col = kind === 'snow' ? '#dff2ff' : kind === 'embers' ? '#ffb04a' : '#bfe6ff';
      for (const a of this.amb) {
        const fl = 0.4 + 0.6 * Math.abs(Math.sin(a.ph));
        glow(ctx, a.x, a.y, a.r * (kind === 'snow' ? 3 : 5), col, fl * (kind === 'snow' ? 0.5 : 0.7));
        ctx.fillStyle = applyAlpha('#ffffff', fl * 0.8); ctx.beginPath(); ctx.arc(a.x, a.y, a.r * 0.7, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();

    // vinheta cinematográfica
    if (this.theme.vignette) {
      const { w, h } = this;
      const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
      vg.addColorStop(0, applyAlpha(this.theme.vignette, 0));
      vg.addColorStop(1, applyAlpha(this.theme.vignette, 0.55));
      ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
    }
  }

  private drawStars(ctx: Ctx, zLo: number, zHi: number): void {
    for (const s of this.stars) {
      if (s.z < zLo || s.z >= zHi) continue;
      const tw = 0.55 + 0.45 * Math.sin(s.tw);
      const a = (0.3 + s.z * 0.8) * tw;
      if (s.z > 0.7 && s.r > 1.2) glow(ctx, s.x, s.y, s.r * 5.5, s.hue, a * 0.6);
      if (s.z > 0.9 && s.r > 1.7) sparkle(ctx, s.x, s.y, s.r * 6 * tw, applyAlpha(s.hue, a * 0.85), 0);
      ctx.fillStyle = applyAlpha('#ffffff', Math.min(1, a * 1.1));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  // ---------------- elementos cênicos ----------------
  private drawSet(ctx: Ctx): void {
    const s = this.set;
    switch (s.kind) {
      case 'planet': this.drawPlanet(ctx, s); break;
      case 'sun': this.drawSun(ctx, s); break;
      case 'blackhole': this.drawBlackhole(ctx, s); break;
      case 'station': this.drawStation(ctx, s); break;
      case 'rift': this.drawRift(ctx, s); break;
      case 'crystal': this.drawCrystal(ctx, s); break;
    }
  }

  private drawPlanet(ctx: Ctx, p: Extract<SetPiece, { kind: 'planet' }>): void {
    const { x, y, r } = p;
    glow(ctx, x, y, r * 1.7, p.glow, 0.28);
    if (p.ring) { // anel traseiro
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(p.ring, 0.5); ctx.lineWidth = r * 0.14;
      ctx.beginPath(); ctx.ellipse(x, y, r * 1.5, r * 0.42, -0.4, Math.PI, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
    const body = ctx.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.1, x, y, r * 1.15);
    body.addColorStop(0, p.colors[0]); body.addColorStop(0.4, p.colors[1]); body.addColorStop(0.72, p.colors[2]); body.addColorStop(1, p.colors[3]);
    ctx.fillStyle = body; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    if (p.bands) {
      ctx.globalAlpha = 0.14; ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 5; i++) { const by = y - r * 0.6 + i * r * 0.32; ctx.fillStyle = i % 2 ? p.colors[0] : p.colors[1]; ctx.beginPath(); ctx.ellipse(x, by, r * 1.1, r * 0.11, 0, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
    if (p.ring) { // anel dianteiro
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(p.ring, 0.7); ctx.lineWidth = r * 0.16;
      ctx.beginPath(); ctx.ellipse(x, y, r * 1.5, r * 0.42, -0.4, 0, Math.PI); ctx.stroke(); ctx.restore();
    }
    // rim light
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = r * 0.05;
    const rim = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    rim.addColorStop(0, applyAlpha(p.glow, 0.9)); rim.addColorStop(0.5, applyAlpha(p.glow, 0.05)); rim.addColorStop(1, applyAlpha(p.glow, 0));
    ctx.strokeStyle = rim; ctx.beginPath(); ctx.arc(x, y, r * 0.985, Math.PI * 0.9, Math.PI * 1.9); ctx.stroke(); ctx.restore();
  }

  private drawSun(ctx: Ctx, s: Extract<SetPiece, { kind: 'sun' }>): void {
    const { x, y, r } = s; const t = this.t;
    glow(ctx, x, y, r * 2.6, s.corona, 0.4);
    glow(ctx, x, y, r * 1.5, s.core, 0.5);
    // flares rotativos
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + t * 0.05; const len = r * (1.2 + 0.25 * Math.sin(t * 1.3 + i)); const g = ctx.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len); g.addColorStop(0, applyAlpha(s.corona, 0.5)); g.addColorStop(1, applyAlpha(s.corona, 0)); ctx.strokeStyle = g; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len); ctx.stroke(); }
    ctx.restore();
    // corpo
    const body = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    body.addColorStop(0, s.core); body.addColorStop(0.6, s.corona); body.addColorStop(1, applyAlpha(s.corona, 0.4));
    ctx.fillStyle = body; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  private drawBlackhole(ctx: Ctx, s: Extract<SetPiece, { kind: 'blackhole' }>): void {
    const { x, y, r } = s; const t = this.t;
    // halo de lente gravitacional
    glow(ctx, x, y, r * 3.4, s.glow, 0.3);
    // disco de acreção (elipse brilhante girando)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.rotate(-0.5);
    for (let k = 0; k < 3; k++) {
      const rr = r * (1.7 + k * 0.35);
      ctx.strokeStyle = applyAlpha(s.disk, 0.5 - k * 0.13); ctx.lineWidth = r * (0.5 - k * 0.12);
      ctx.beginPath(); ctx.ellipse(0, 0, rr, rr * 0.34, 0, 0, Math.PI * 2); ctx.stroke();
    }
    // brilho quente no bordo dianteiro
    const hot = ctx.createLinearGradient(-r * 2, 0, r * 2, 0);
    hot.addColorStop(0, applyAlpha('#fff0c0', 0)); hot.addColorStop(0.5, applyAlpha('#ffd07a', 0.4 + 0.2 * Math.sin(t * 2))); hot.addColorStop(1, applyAlpha('#fff0c0', 0));
    ctx.strokeStyle = hot; ctx.lineWidth = r * 0.3; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.58, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    // horizonte de eventos (negro absoluto)
    ctx.fillStyle = '#000005'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(s.disk, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r * 1.02, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }

  private drawStation(ctx: Ctx, s: Extract<SetPiece, { kind: 'station' }>): void {
    const { x, y, r } = s; const t = this.t;
    glow(ctx, x, y, r * 1.5, s.light, 0.16);
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.25 + Math.sin(t * 0.06) * 0.03);
    // corpo central
    const g = ctx.createLinearGradient(-r, -r, r, r);
    g.addColorStop(0, applyAlpha(s.tint, 1)); g.addColorStop(0.5, rgba(30, 36, 52, 1)); g.addColorStop(1, rgba(14, 18, 30, 1));
    ctx.fillStyle = g;
    // núcleo hexagonal + braços
    poly(ctx, [-0.5 * r, -0.28 * r, 0, -0.55 * r, 0.5 * r, -0.28 * r, 0.5 * r, 0.28 * r, 0, 0.55 * r, -0.5 * r, 0.28 * r]);
    ctx.fill();
    ctx.fillRect(-r * 1.15, -r * 0.09, r * 2.3, r * 0.18); // braço horizontal
    ctx.fillRect(-r * 0.09, -r * 0.9, r * 0.18, r * 1.8);  // mastro vertical
    // luzes
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 10; i++) { const lx = (-1 + (i / 5)) * r, blink = 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i)); glow(ctx, lx, (i % 2 ? -1 : 1) * r * 0.09, 4, s.light, blink * 0.8); }
    glow(ctx, 0, 0, r * 0.4, s.light, 0.4);
    // rim light
    ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = applyAlpha(s.light, 0.3); ctx.lineWidth = 1.4;
    poly(ctx, [-0.5 * r, -0.28 * r, 0, -0.55 * r, 0.5 * r, -0.28 * r, 0.5 * r, 0.28 * r, 0, 0.55 * r, -0.5 * r, 0.28 * r]); ctx.stroke();
    ctx.restore();
  }

  private drawRift(ctx: Ctx, s: Extract<SetPiece, { kind: 'rift' }>): void {
    const { x, y, r } = s; const t = this.t;
    glow(ctx, x, y, r * 2.2, s.color, 0.3);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.rotate(0.5 + Math.sin(t * 0.2) * 0.05);
    // fenda: elipse fina brilhante com camadas
    for (let k = 0; k < 4; k++) {
      const a = 0.6 - k * 0.13;
      const g = ctx.createLinearGradient(0, -r, 0, r);
      g.addColorStop(0, applyAlpha(s.color, 0)); g.addColorStop(0.5, applyAlpha(k < 2 ? '#ffffff' : s.color, a)); g.addColorStop(1, applyAlpha(s.color, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, r * (0.14 - k * 0.028), r * (1 - k * 0.12), 0, 0, Math.PI * 2); ctx.fill();
    }
    // arcos de energia
    ctx.strokeStyle = applyAlpha(s.color, 0.5); ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) { const yy = -r * 0.8 + (i / 5) * r * 1.6; const off = Math.sin(t * 3 + i) * r * 0.12; ctx.beginPath(); ctx.moveTo(0, yy); ctx.quadraticCurveTo(off, yy + r * 0.16, 0, yy + r * 0.32); ctx.stroke(); }
    ctx.restore();
  }

  private drawCrystal(ctx: Ctx, s: Extract<SetPiece, { kind: 'crystal' }>): void {
    const { x, y, r } = s; const t = this.t;
    glow(ctx, x, y, r * 1.8, s.color, 0.22);
    ctx.save(); ctx.translate(x, y);
    const shards = [[0, -1, 0.32, 0.9], [0.7, 0.2, 0.26, 0.7], [-0.6, 0.3, 0.28, 0.75], [0.2, 0.7, 0.2, 0.6], [-0.3, -0.4, 0.18, 0.5]];
    for (let i = 0; i < shards.length; i++) {
      const [sx, sy, sw, sh] = shards[i]; const bob = Math.sin(t * 1.2 + i * 1.3) * r * 0.04;
      ctx.save(); ctx.translate(sx * r, sy * r + bob); ctx.rotate(Math.sin(t * 0.3 + i) * 0.1);
      ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createLinearGradient(0, -sh * r, 0, sh * r);
      g.addColorStop(0, applyAlpha('#ffffff', 0.9)); g.addColorStop(0.5, applyAlpha(s.color, 0.7)); g.addColorStop(1, applyAlpha(s.color, 0.1));
      ctx.fillStyle = g; poly(ctx, [0, -sh * r, sw * r, 0, 0, sh * r * 0.7, -sw * r, 0]); ctx.fill();
      glow(ctx, 0, 0, sw * r * 1.4, s.color, 0.4);
      ctx.restore();
    }
    ctx.restore();
  }

  private drawDebris(ctx: Ctx, db: Debris): void {
    ctx.save(); ctx.translate(db.x, db.y); ctx.rotate(db.rot);
    const s = db.size; const base = 30 + db.tone * 30;
    const g = ctx.createLinearGradient(-s, -s, s, s);
    g.addColorStop(0, rgba(base + 40, base + 46, base + 60, 1)); g.addColorStop(0.5, rgba(base, base + 4, base + 14, 1)); g.addColorStop(1, rgba(base - 18, base - 16, base - 8, 1));
    ctx.fillStyle = g; poly(ctx, db.shape.map((v, i) => v * s * (i % 2 ? 1 : 1))); ctx.fill();
    ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(150, 190, 255, 0.35); ctx.lineWidth = 1.2; ctx.stroke();
    ctx.restore();
  }
}

function makeDebris(w: number, hOrY: number, asY = false): Debris {
  const n = 5 + (Math.random() * 3 | 0); const shape: number[] = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; const rr = 0.5 + Math.random() * 0.55; shape.push(Math.cos(a) * rr, Math.sin(a) * rr); }
  return { x: Math.random() * w, y: asY ? hOrY : Math.random() * hOrY, z: Math.random(), rot: Math.random() * Math.PI * 2, spin: rand(-0.5, 0.5), size: rand(10, 30), shape, tone: Math.random() };
}
