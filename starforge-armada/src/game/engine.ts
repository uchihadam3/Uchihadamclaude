// Motor da demo visual de Starforge Armada.
// Loop fixo, entidades, input (teclado + toque), combate, partículas e HUD.
import { Background } from '../render/background';
import { drawFalcon } from '../render/ship';
import { drawEnemy, EnemyKind } from '../render/enemies';
import { Particles } from '../render/fx';
import { glow, beam, rgba, applyAlpha, clamp, rand } from '../render/prims';
import { sfx, resumeAudio } from './audio';

export interface Hud {
  hp: number; maxHp: number; shield: number; maxShield: number;
  score: number; combo: number; comboTimer: number;
  ability: number; ultimate: number; speed: number; fps: number;
  wave: number;
}

interface Bullet { x: number; y: number; vx: number; vy: number; r: number; dmg: number; hue: string; kind: 'bolt' | 'missile'; life: number; target: Enemy | null; trail: number; }
interface EBullet { x: number; y: number; vx: number; vy: number; r: number; hue: string; }
interface Enemy {
  x: number; y: number; vx: number; vy: number; kind: EnemyKind; size: number;
  hp: number; maxHp: number; r: number; t: number; hit: number; fireCd: number;
  enter: number; phase: number; scoreVal: number; targetY: number;
}
interface Missile { active: boolean; }

const ENEMY_STATS: Record<EnemyKind, { size: number; hp: number; r: number; score: number }> = {
  drone: { size: 15, hp: 3, r: 18, score: 100 },
  fighter: { size: 17, hp: 4, r: 20, score: 150 },
  turret: { size: 20, hp: 7, r: 26, score: 220 },
  mine: { size: 14, hp: 2, r: 22, score: 120 },
  elite: { size: 34, hp: 40, r: 46, score: 900 },
};

export class Engine {
  private ctx: CanvasRenderingContext2D;
  private bg = new Background();
  private fx = new Particles();
  private raf = 0;
  private last = 0;
  private acc = 0;
  private t = 0;
  private w = 0; private h = 0; private dpr = 1;
  private running = false;

  // entidades
  private player = {
    x: 0, y: 0, vx: 0, vy: 0, hp: 100, maxHp: 100, shield: 60, maxShield: 60,
    tilt: 0, fireCd: 0, abilityCd: 0, abilityMax: 3.2, ult: 0, invuln: 0, dmgFlash: 0,
    speed: 430, shieldRegenT: 0,
  };
  private bullets: Bullet[] = [];
  private ebullets: EBullet[] = [];
  private enemies: Enemy[] = [];
  private ultActive = 0;

  // input
  private keys = new Set<string>();
  private pointer: { active: boolean; x: number; y: number } = { active: false, x: 0, y: 0 };
  private shake = 0;
  private flash = 0;

  // score
  private score = 0; private combo = 0; private comboTimer = 0; private wave = 1;
  private spawnT = 0; private fps = 60; private eliteAlive = false;

  hud: Hud = { hp: 100, maxHp: 100, shield: 60, maxShield: 60, score: 0, combo: 0, comboTimer: 0, ability: 1, ultimate: 0, speed: 0, fps: 60, wave: 1 };
  onHud: (h: Hud) => void = () => {};

  constructor(private canvas: HTMLCanvasElement) {
    const c = canvas.getContext('2d', { alpha: false });
    if (!c) throw new Error('no ctx');
    this.ctx = c;
    this.bindInput();
  }

  start(): void {
    this.resize();
    this.player.x = this.w / 2; this.player.y = this.h * 0.78;
    this.running = true;
    this.last = performance.now();
    this.spawnWave();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('resize', this.onResize);
  }

  resize = (): void => {
    const r = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = r.width; this.h = r.height;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.bg.resize(this.w, this.h);
  };

  // ================= INPUT =================
  private bindInput(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('resize', this.onResize);
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }
  private onResize = () => this.resize();
  private onKeyDown = (e: KeyboardEvent) => {
    resumeAudio();
    const k = e.key.toLowerCase();
    this.keys.add(k);
    if (k === 'shift') this.triggerAbility();
    if (k === ' ') { e.preventDefault(); this.triggerUltimate(); }
  };
  private onKeyUp = (e: KeyboardEvent) => this.keys.delete(e.key.toLowerCase());
  private onPointerDown = (e: PointerEvent) => {
    resumeAudio();
    const r = this.canvas.getBoundingClientRect();
    this.pointer = { active: true, x: e.clientX - r.left, y: e.clientY - r.top };
  };
  private onPointerMove = (e: PointerEvent) => {
    if (!this.pointer.active) return;
    const r = this.canvas.getBoundingClientRect();
    this.pointer.x = e.clientX - r.left; this.pointer.y = e.clientY - r.top;
  };
  private onPointerUp = () => { this.pointer.active = false; };

  triggerAbility(): void {
    if (this.player.abilityCd > 0) return;
    this.player.abilityCd = this.player.abilityMax;
    sfx.ability();
    // 3 mísseis teleguiados
    for (let i = -1; i <= 1; i++) {
      const tgt = this.nearestEnemy(this.player.x, this.player.y);
      this.bullets.push({
        x: this.player.x + i * 14, y: this.player.y - 10, vx: i * 90, vy: -120,
        r: 6, dmg: 8, hue: '#ffd27a', kind: 'missile', life: 3, target: tgt, trail: 0,
      });
    }
  }

  triggerUltimate(): void {
    if (this.player.ult < 1) return;
    this.player.ult = 0;
    this.ultActive = 0.6;
    this.flash = 1;
    this.shake = Math.max(this.shake, 16);
    sfx.ultimate();
    // barragem frontal: leque largo de bolts + mísseis
    for (let i = -9; i <= 9; i++) {
      const a = -Math.PI / 2 + i * 0.06;
      this.bullets.push({ x: this.player.x, y: this.player.y - 20, vx: Math.cos(a) * 780, vy: Math.sin(a) * 780, r: 5, dmg: 6, hue: '#8af0ff', kind: 'bolt', life: 1.4, target: null, trail: 0 });
    }
    for (let i = -2; i <= 2; i++) {
      const tgt = this.nearestEnemy(this.player.x, this.player.y);
      this.bullets.push({ x: this.player.x + i * 20, y: this.player.y - 16, vx: i * 120, vy: -260, r: 8, dmg: 14, hue: '#ffd27a', kind: 'missile', life: 3, target: tgt, trail: 0 });
    }
  }

  // ================= LOOP =================
  private loop = (now: number): void => {
    if (!this.running) return;
    let dt = (now - this.last) / 1000;
    this.last = now;
    if (dt > 0.05) dt = 0.05;
    this.fps = this.fps * 0.9 + (1 / Math.max(dt, 1e-4)) * 0.1;
    this.update(dt);
    this.render();
    this.pushHud();
    this.raf = requestAnimationFrame(this.loop);
  };

  private update(dt: number): void {
    this.t += dt;
    const p = this.player;

    // ---- movimento do jogador ----
    let mx = 0, my = 0;
    if (this.keys.has('a') || this.keys.has('arrowleft')) mx -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) mx += 1;
    if (this.keys.has('w') || this.keys.has('arrowup')) my -= 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) my += 1;
    if (this.pointer.active) {
      const dx = this.pointer.x - p.x, dy = this.pointer.y - p.y - 40;
      const d = Math.hypot(dx, dy);
      if (d > 3) { mx = dx / d; my = dy / d; }
    }
    const len = Math.hypot(mx, my) || 1;
    p.vx = (mx / len) * p.speed;
    p.vy = (my / len) * p.speed;
    if (mx === 0 && my === 0) { p.vx *= 0; p.vy *= 0; }
    p.x = clamp(p.x + p.vx * dt, 30, this.w - 30);
    p.y = clamp(p.y + p.vy * dt, 60, this.h - 30);
    // inclinação (banking)
    const tiltTarget = clamp(mx, -1, 1);
    p.tilt += (tiltTarget - p.tilt) * Math.min(1, dt * 10);

    // ---- disparo automático ----
    p.fireCd -= dt;
    if (p.fireCd <= 0) {
      p.fireCd = 0.11;
      for (const sd of [-1, 1]) {
        this.bullets.push({ x: p.x + sd * 12, y: p.y - 22, vx: p.vx * 0.15, vy: -900, r: 3.4, dmg: 2.2, hue: '#7ff0ff', kind: 'bolt', life: 1.1, target: null, trail: 0 });
      }
      this.fx.muzzle(p.x, p.y - 26, '#7ff0ff');
      sfx.shoot();
    }

    // ---- cooldowns / recursos ----
    p.abilityCd = Math.max(0, p.abilityCd - dt);
    p.ult = Math.min(1, p.ult + dt * 0.11);
    p.invuln = Math.max(0, p.invuln - dt);
    p.dmgFlash = Math.max(0, p.dmgFlash - dt * 2);
    // regen de escudo
    p.shieldRegenT += dt;
    if (p.shieldRegenT > 2.5 && p.shield < p.maxShield) p.shield = Math.min(p.maxShield, p.shield + dt * 10);
    if (this.ultActive > 0) this.ultActive -= dt;

    // ---- combo ----
    if (this.comboTimer > 0) { this.comboTimer -= dt; if (this.comboTimer <= 0) this.combo = 0; }

    // ---- spawns ----
    this.spawnT -= dt;
    if (this.spawnT <= 0 && this.enemies.length < 12) this.spawnWave();

    // ---- balas do jogador ----
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.life -= dt;
      if (b.kind === 'missile') {
        if (!b.target || b.target.hp <= 0) b.target = this.nearestEnemy(b.x, b.y);
        if (b.target) {
          const dx = b.target.x - b.x, dy = b.target.y - b.y, d = Math.hypot(dx, dy) || 1;
          b.vx += (dx / d) * 900 * dt; b.vy += (dy / d) * 900 * dt;
          const sp = Math.hypot(b.vx, b.vy); const cap = 520;
          if (sp > cap) { b.vx = b.vx / sp * cap; b.vy = b.vy / sp * cap; }
        }
        b.trail -= dt;
        if (b.trail <= 0) { b.trail = 0.02; this.fx.trail(b.x, b.y, '#ffb060', 2.2); }
      }
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.life <= 0 || b.y < -30 || b.y > this.h + 30 || b.x < -30 || b.x > this.w + 30) { this.bullets.splice(i, 1); continue; }
      // colisão com inimigos
      for (const e of this.enemies) {
        if (e.hp <= 0) continue;
        if (Math.hypot(e.x - b.x, e.y - b.y) < e.r + b.r) {
          e.hp -= b.dmg; e.hit = 1;
          this.fx.hit(b.x, b.y, b.kind === 'missile' ? '#ffb060' : '#bfe9ff');
          if (b.kind === 'missile') { this.fx.explosion(b.x, b.y, 1, '#ffb060'); this.shake = Math.max(this.shake, 4); }
          this.bullets.splice(i, 1);
          if (e.hp <= 0) this.killEnemy(e);
          break;
        }
      }
    }

    // ---- inimigos ----
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.t += dt; e.hit = Math.max(0, e.hit - dt * 3);
      e.enter = Math.max(0, e.enter - dt);
      this.enemyBehavior(e, dt);
      // colisão corpo-a-corpo com o jogador
      if (e.hp > 0 && p.invuln <= 0 && Math.hypot(e.x - p.x, e.y - p.y) < e.r + 16) {
        this.damagePlayer(e.kind === 'elite' ? 24 : 14);
        if (e.kind === 'mine' || e.kind === 'drone') { e.hp = 0; this.killEnemy(e); }
      }
      if (e.hp <= 0 || e.y > this.h + 80) {
        if (e.kind === 'elite') this.eliteAlive = false;
        this.enemies.splice(i, 1);
      }
    }

    // ---- balas inimigas ----
    for (let i = this.ebullets.length - 1; i >= 0; i--) {
      const b = this.ebullets[i];
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.y > this.h + 20 || b.y < -20 || b.x < -20 || b.x > this.w + 20) { this.ebullets.splice(i, 1); continue; }
      if (p.invuln <= 0 && Math.hypot(b.x - p.x, b.y - p.y) < b.r + 10) {
        this.damagePlayer(8);
        this.ebullets.splice(i, 1);
      }
    }

    this.fx.update(dt);
    this.bg.update(dt, 1);
    this.shake *= Math.pow(0.001, dt);
    this.flash = Math.max(0, this.flash - dt * 2.2);
  }

  private enemyBehavior(e: Enemy, dt: number): void {
    const p = this.player;
    if (e.enter > 0) { e.y += 120 * dt; return; }
    switch (e.kind) {
      case 'drone':
        e.x += Math.sin(e.t * 1.5 + e.phase) * 60 * dt;
        e.y += 40 * dt;
        break;
      case 'fighter':
        e.x += Math.cos(e.t * 2 + e.phase) * 120 * dt;
        e.y += 70 * dt * (e.y < this.h * 0.35 ? 1 : 0.2);
        e.fireCd -= dt;
        if (e.fireCd <= 0 && e.y < this.h * 0.7) { e.fireCd = 1.4; this.enemyAimShot(e, 380); }
        break;
      case 'turret':
        e.y = Math.min(e.targetY, e.y + 50 * dt);
        e.fireCd -= dt;
        if (e.fireCd <= 0) { e.fireCd = 2.0; this.enemyFan(e, 5, 360); }
        break;
      case 'mine':
        e.y += 55 * dt;
        e.x += Math.sin(e.t + e.phase) * 20 * dt;
        break;
      case 'elite':
        e.y = Math.min(e.targetY, e.y + 40 * dt);
        e.x += Math.sin(e.t * 0.6) * 60 * dt;
        e.x = clamp(e.x, 80, this.w - 80);
        e.fireCd -= dt;
        if (e.fireCd <= 0) {
          e.fireCd = 1.1;
          if (Math.floor(e.t) % 3 === 0) this.enemyFan(e, 12, 300);
          else this.enemyAimShot(e, 420);
        }
        break;
    }
  }

  private enemyAimShot(e: Enemy, sp: number): void {
    const dx = this.player.x - e.x, dy = this.player.y - e.y, d = Math.hypot(dx, dy) || 1;
    this.ebullets.push({ x: e.x, y: e.y, vx: dx / d * sp, vy: dy / d * sp, r: 5, hue: '#ff8a3a' });
  }
  private enemyFan(e: Enemy, n: number, sp: number): void {
    for (let i = 0; i < n; i++) {
      const a = Math.PI / 2 + (i - (n - 1) / 2) * 0.16;
      this.ebullets.push({ x: e.x, y: e.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 4.5, hue: '#ffb03a' });
    }
  }

  private damagePlayer(dmg: number): void {
    const p = this.player;
    p.invuln = 0.7; p.dmgFlash = 1; p.shieldRegenT = 0;
    this.shake = Math.max(this.shake, 8);
    sfx.hit();
    if (p.shield > 0) { p.shield -= dmg; if (p.shield < 0) { p.hp += p.shield; p.shield = 0; } }
    else p.hp -= dmg;
    // quebra combo em dano pesado
    this.combo = Math.max(0, this.combo - 5);
    if (p.hp <= 0) { p.hp = p.maxHp; p.shield = p.maxShield; this.fx.explosion(p.x, p.y, 2, '#8af0ff', true); }
  }

  private killEnemy(e: Enemy): void {
    const big = e.kind === 'elite';
    this.fx.explosion(e.x, e.y, big ? 2.4 : 1, big ? '#ff7a3a' : '#ffb060', big);
    this.shake = Math.max(this.shake, big ? 14 : 5);
    if (big) sfx.explodeBig(); else sfx.explodeSmall();
    this.combo += 1; this.comboTimer = 2.2;
    const mult = 1 + this.combo * 0.05;
    this.score += Math.round(e.scoreVal * mult);
    this.player.ult = Math.min(1, this.player.ult + (big ? 0.25 : 0.03));
  }

  private nearestEnemy(x: number, y: number): Enemy | null {
    let best: Enemy | null = null, bd = Infinity;
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      const d = Math.hypot(e.x - x, e.y - y);
      if (d < bd) { bd = d; best = e; }
    }
    return best;
  }

  private spawnWave(): void {
    this.spawnT = rand(1.6, 2.6);
    this.wave++;
    const roll = Math.random();
    if (!this.eliteAlive && this.wave % 4 === 0) { this.addEnemy('elite', this.w / 2, -80, this.h * 0.22); this.eliteAlive = true; return; }
    if (roll < 0.3) {
      const n = 3 + (Math.random() * 3 | 0);
      for (let i = 0; i < n; i++) this.addEnemy('drone', rand(60, this.w - 60), -40 - i * 46, 0);
    } else if (roll < 0.55) {
      for (let i = 0; i < 2; i++) this.addEnemy('fighter', rand(80, this.w - 80), -50 - i * 60, 0);
    } else if (roll < 0.75) {
      this.addEnemy('turret', rand(80, this.w - 80), -60, rand(this.h * 0.16, this.h * 0.3));
    } else {
      const n = 2 + (Math.random() * 2 | 0);
      for (let i = 0; i < n; i++) this.addEnemy('mine', rand(60, this.w - 60), -40 - i * 50, 0);
    }
  }

  private addEnemy(kind: EnemyKind, x: number, y: number, targetY: number): void {
    const s = ENEMY_STATS[kind];
    this.enemies.push({
      x, y, vx: 0, vy: 0, kind, size: s.size, hp: s.hp, maxHp: s.hp, r: s.r,
      t: Math.random() * 6, hit: 0, fireCd: rand(0.6, 1.6), enter: 0.2,
      phase: Math.random() * Math.PI * 2, scoreVal: s.score, targetY: targetY || y,
    });
    if (kind === 'elite') this.flash = Math.max(this.flash, 0.4);
  }

  // ================= RENDER =================
  private render(): void {
    const ctx = this.ctx, p = this.player;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.bg.drawBack(ctx);

    // shake
    ctx.save();
    if (this.shake > 0.2) ctx.translate(rand(-1, 1) * this.shake * 0.4, rand(-1, 1) * this.shake * 0.4);

    // balas inimigas
    for (const b of this.ebullets) {
      glow(ctx, b.x, b.y, b.r * 3.4, b.hue, 0.7);
      ctx.fillStyle = '#fff2d8';
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.6, 0, Math.PI * 2); ctx.fill();
    }

    // inimigos
    for (const e of this.enemies) drawEnemy(ctx, e.kind, e.x, e.y, e.size, e.t, e.hit);

    // balas do jogador
    for (const b of this.bullets) this.drawPlayerBullet(ctx, b);

    // nave
    drawFalcon(ctx, p.x, p.y, 24, {
      tilt: p.tilt, thrust: 0.7 + Math.hypot(p.vx, p.vy) / p.speed * 0.4, t: this.t,
      shield: p.shield / p.maxShield, damage: p.dmgFlash, invuln: p.invuln > 0,
    });

    // partículas
    this.fx.draw(ctx);

    ctx.restore();

    // poeira em primeiro plano
    this.bg.drawFront(ctx);

    // clarão do ultimate / dano
    if (this.flash > 0.01) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = applyAlpha(this.ultActive > 0 ? '#8af0ff' : '#ff6a6a', this.flash * 0.35);
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.restore();
    }
    // vinheta de perigo (vida baixa)
    if (p.hp < 30) {
      const a = 0.2 + 0.15 * Math.sin(this.t * 6);
      const g = ctx.createRadialGradient(this.w / 2, this.h / 2, this.h * 0.3, this.w / 2, this.h / 2, this.h * 0.7);
      g.addColorStop(0, 'rgba(255,40,40,0)');
      g.addColorStop(1, `rgba(255,30,40,${a})`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, this.w, this.h);
    }
  }

  private drawPlayerBullet(ctx: CanvasRenderingContext2D, b: Bullet): void {
    if (b.kind === 'missile') {
      glow(ctx, b.x, b.y, b.r * 3.6, b.hue, 0.9);
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
      ctx.fillStyle = '#ffe6b0';
      ctx.beginPath(); ctx.moveTo(0, -b.r * 1.6); ctx.lineTo(b.r, b.r); ctx.lineTo(-b.r, b.r); ctx.closePath(); ctx.fill();
      ctx.restore();
    } else {
      const x2 = b.x - b.vx * 0.032, y2 = b.y - b.vy * 0.032;
      beam(ctx, b.x, b.y, x2, y2, b.r * 0.8, '#f4fdff', applyAlpha(b.hue, 0.45));
      glow(ctx, b.x, b.y, b.r * 3.0, b.hue, 0.85);
    }
  }

  private pushHud(): void {
    const p = this.player;
    this.hud.hp = p.hp; this.hud.maxHp = p.maxHp;
    this.hud.shield = p.shield; this.hud.maxShield = p.maxShield;
    this.hud.score = this.score; this.hud.combo = this.combo; this.hud.comboTimer = this.comboTimer;
    this.hud.ability = 1 - p.abilityCd / p.abilityMax;
    this.hud.ultimate = p.ult;
    this.hud.speed = Math.min(1, Math.hypot(p.vx, p.vy) / p.speed);
    this.hud.fps = this.fps; this.hud.wave = this.wave;
    this.onHud(this.hud);
  }
}
