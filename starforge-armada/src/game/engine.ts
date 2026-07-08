// Motor de combate de Starforge Armada — dirigido pela nave escolhida.
// Cada nave traz um kit (tiro primário, habilidade, ultimate, passiva) que o
// motor interpreta, além de drones, feixe, lâminas, dash, escudo frontal,
// minas, corrente elétrica e buraco negro. Loop fixo, partículas, bloom, HUD.
import { Background } from '../render/background';
import { drawShip } from '../render/shipGen';
import { drawEnemyGen } from '../render/enemyGen';
import { Particles } from '../render/fx';
import { Bloom } from '../render/bloom';
import { glow, beam, rgba, applyAlpha, clamp, rand, poly } from '../render/prims';
import { sfx, resumeAudio } from './audio';
import { SHIP_BY_ID, ShipDef } from '../data/shipsData';
import { kitFor, Kit, FireSpec } from './shipKits';
import { ENEMIES_BY_SECTOR, EnemyDef, SECTOR_BULLET, SECTORS, Pattern } from '../data/enemiesData';
import { MAIN_BOSSES, SECRET_BOSSES, BossDef, BOSS_BY_ID } from '../data/bossesData';
import { drawBoss } from '../render/bossGen';
import { CAMPAIGN } from '../data/campaignData';

export interface CampaignResult { success: boolean; sector: number; score: number; kills: number; timeSec: number; dmgTaken: number; lives: number; medal: string; }

export interface Hud {
  hp: number; maxHp: number; shield: number; maxShield: number;
  score: number; combo: number; comboTimer: number;
  ability: number; ultimate: number; speed: number; fps: number; wave: number; sector: string;
  bossActive: boolean; bossName: string; bossHp: number; bossPhases: number; bossPhase: number;
  campaign: boolean; lives: number;
}

type PickKind = 'score' | 'shield' | 'heal' | 'ult' | 'power';
interface Pickup { x: number; y: number; vx: number; vy: number; kind: PickKind; t: number; life: number; }
const PICK_COLOR: Record<PickKind, string> = { score: '#7ff0ff', shield: '#5ad0ff', heal: '#7affa0', ult: '#ffd24a', power: '#c080ff' };

interface Bullet {
  x: number; y: number; vx: number; vy: number; r: number; dmg: number; hue: string;
  kind: 'bolt' | 'missile'; life: number; target: Enemy | null; trail: number;
  pierce?: boolean; dot?: number; slow?: number; explode?: boolean; curve?: number; chain?: number; hits?: Set<Enemy>;
}
interface EBullet { x: number; y: number; vx: number; vy: number; r: number; hue: string; homing?: number; split?: number; }
interface Enemy {
  x: number; y: number; vx: number; vy: number; def: EnemyDef; size: number;
  hp: number; maxHp: number; r: number; t: number; hit: number; fireCd: number; fireN: number;
  enter: number; phase: number; targetY: number;
  slowT: number; dotT: number; dotDmg: number; markT: number; dead: boolean;
}
interface Drone { ang: number; fireCd: number; life: number; x: number; y: number; }
interface Mine { x: number; y: number; vx: number; vy: number; life: number; r: number; dmg: number; t: number; }
interface Hole { x: number; y: number; life: number; r: number; t: number; }
interface BossPartLive { rx: number; ry: number; x: number; y: number; hp: number; maxHp: number; dead: boolean; fireCd: number; def: any; }
interface Boss {
  def: BossDef; x: number; y: number; hp: number; maxHp: number; t: number; hit: number; deathT: number;
  state: 'enter' | 'fight' | 'die'; enterT: number; phaseIdx: number; exposed: boolean;
  emitCd: number[]; fireN: number; parts: BossPartLive[]; targetY: number; dir: number; nameT: number;
}

export class Engine {
  private ctx: CanvasRenderingContext2D;
  private bg = new Background();
  private fx = new Particles();
  private bloom = new Bloom();
  private raf = 0; private last = 0; private t = 0;
  private w = 0; private h = 0; private dpr = 1;
  private running = false;

  private ship: ShipDef; private kit: Kit; private dmgMult = 1; private hitR = 14;

  private player = {
    x: 0, y: 0, vx: 0, vy: 0, hp: 100, maxHp: 100, shield: 60, maxShield: 60,
    tilt: 0, fireCd: 0, abilityCd: 0, abilityMax: 3.2, ult: 0, invuln: 0, dmgFlash: 0,
    speed: 430, shieldRegenT: 0, powerT: 0, dashT: 0, wallT: 0, cloak: 0, dirX: 0, dirY: -1,
    element: 0, noDmgT: 0,
  };
  private bullets: Bullet[] = [];
  private ebullets: EBullet[] = [];
  private enemies: Enemy[] = [];
  private pickups: Pickup[] = [];
  private drones: Drone[] = [];
  private mines: Mine[] = [];
  private holes: Hole[] = [];
  private bladesT = 0; private bladeCount = 0; private bladeAng = 0;
  private sweepT = 0; private sweepHue = '#ffd24a';
  private stormT = 0; private stormCd = 0; private stormHue = '#5ad0ff';
  private ultActive = 0; private moteT = 0;

  private keys = new Set<string>();
  private pointer = { active: false, x: 0, y: 0 };
  private shake = 0; private flash = 0;
  private score = 0; private combo = 0; private comboTimer = 0; private wave = 1;
  private spawnT = 0; private fps = 60; private eliteAlive = false; private curSector = 0;
  private boss: Boss | null = null; private lastBossWave = 0; private bossCounter = 0;
  private mode: 'endless' | 'campaign' = 'endless'; private campSector = 0;
  private camp: { phaseIdx: number; wavesSpawned: number; wavesTarget: number; lives: number; kills: number; dmgTaken: number; startT: number; done: boolean; bossSpawned: boolean } | null = null;
  private banner = { t: 0, text: '', sub: '' };
  onComplete: (r: CampaignResult) => void = () => {};

  hud: Hud = { hp: 100, maxHp: 100, shield: 60, maxShield: 60, score: 0, combo: 0, comboTimer: 0, ability: 1, ultimate: 0, speed: 0, fps: 60, wave: 1, sector: SECTORS[0].name, bossActive: false, bossName: '', bossHp: 1, bossPhases: 1, bossPhase: 0, campaign: false, lives: 3 };
  onHud: (h: Hud) => void = () => {};

  constructor(private canvas: HTMLCanvasElement, shipId = 'falcon', mode: 'endless' | 'campaign' = 'endless', sector = 0) {
    const c = canvas.getContext('2d', { alpha: false });
    if (!c) throw new Error('no ctx');
    this.ctx = c;
    this.mode = mode; this.campSector = sector;
    if (mode === 'campaign') this.curSector = sector;
    this.ship = SHIP_BY_ID[shipId] ?? SHIP_BY_ID['falcon'];
    this.kit = kitFor(this.ship.id);
    const s = this.ship.stats;
    this.player.maxHp = s.hp; this.player.hp = s.hp;
    this.player.maxShield = s.shield; this.player.shield = s.shield;
    this.player.speed = 280 + s.speed * 2.1;
    this.player.abilityMax = this.kit.ability.cd;
    this.dmgMult = 0.8 + s.power / 260;
    this.hitR = this.kit.passive === 'tiny' ? 8 : 14;
    if (this.kit.passive === 'armor') this.player.speed *= 0.92;
    this.bindInput();
  }

  kitLabels(): { ship: string; ability: string; ult: string } {
    return { ship: this.ship.name, ability: this.kit.ability.name, ult: this.kit.ultimate.name };
  }

  start(): void {
    this.resize();
    this.player.x = this.w / 2; this.player.y = this.h * 0.78;
    this.running = true; this.last = performance.now();
    // naves de drone começam com drones
    if (this.kit.ability.type === 'drone') for (let i = 0; i < (this.ship.id === 'scarab' || this.ship.id === 'swarm' ? 2 : 1); i++) this.addDrone(Infinity);
    if (this.mode === 'campaign') {
      const sec = CAMPAIGN[this.campSector];
      this.camp = { phaseIdx: 0, wavesSpawned: 0, wavesTarget: sec.phases[0].waves, lives: 3, kills: 0, dmgTaken: 0, startT: performance.now(), done: false, bossSpawned: false };
      this.setBanner(sec.phases[0].name, 'Fase 1/3');
    } else this.spawnWave();
    this.raf = requestAnimationFrame(this.loop);
  }
  stop(): void {
    this.running = false; cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('resize', this.onResize);
  }
  resize = (): void => {
    const r = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = r.width; this.h = r.height;
    this.canvas.width = Math.round(this.w * this.dpr); this.canvas.height = Math.round(this.h * this.dpr);
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
    resumeAudio(); const k = e.key.toLowerCase(); this.keys.add(k);
    if (k === 'shift') this.triggerAbility();
    if (k === ' ') { e.preventDefault(); this.triggerUltimate(); }
  };
  private onKeyUp = (e: KeyboardEvent) => this.keys.delete(e.key.toLowerCase());
  private onPointerDown = (e: PointerEvent) => { resumeAudio(); const r = this.canvas.getBoundingClientRect(); this.pointer = { active: true, x: e.clientX - r.left, y: e.clientY - r.top }; };
  private onPointerMove = (e: PointerEvent) => { if (!this.pointer.active) return; const r = this.canvas.getBoundingClientRect(); this.pointer.x = e.clientX - r.left; this.pointer.y = e.clientY - r.top; };
  private onPointerUp = () => { this.pointer.active = false; };

  // ================= HABILIDADE / ULTIMATE =================
  triggerAbility(): void {
    const p = this.player, a = this.kit.ability;
    if (p.abilityCd > 0) return;
    p.abilityCd = a.cd; sfx.ability();
    switch (a.type) {
      case 'missiles': for (let i = 0; i < (a.count ?? 3); i++) { const t = this.nearestEnemy(p.x, p.y); const off = (i - (a.count ?? 3) / 2); this.bullets.push({ x: p.x + off * 10, y: p.y - 12, vx: off * 70, vy: -160, r: 6, dmg: 8 * this.dmgMult, hue: a.color, kind: 'missile', life: 3, target: t, trail: 0 }); } break;
      case 'dash': case 'blink': p.dashT = a.type === 'blink' ? 0.18 : 0.32; p.invuln = Math.max(p.invuln, p.dashT + 0.1); this.fx.collect(p.x, p.y, a.color); break;
      case 'flamedash': p.dashT = 0.34; p.invuln = Math.max(p.invuln, 0.4); break;
      case 'cloak': p.dashT = 0.3; p.cloak = 1.6; p.invuln = Math.max(p.invuln, 0.5); break;
      case 'shieldwall': p.wallT = a.power ? 2.4 : 2.0; break;
      case 'drone': for (let i = 0; i < (a.count ?? 1); i++) if (this.drones.length < 6) this.addDrone(Infinity); break;
      case 'charge': this.bullets.push({ x: p.x, y: p.y - 24, vx: 0, vy: -1200, r: 12, dmg: 26 * this.dmgMult, hue: a.color, kind: 'bolt', life: 1.4, target: null, trail: 0, pierce: true, hits: new Set() }); this.shake = Math.max(this.shake, 8); this.flash = Math.max(this.flash, 0.4); break;
      case 'mark': for (const e of this.nearest(p.x, p.y, 2)) { e.markT = 6; this.fx.hit(e.x, e.y, a.color); } break;
      case 'chain': { const first = this.nearestEnemy(p.x, p.y); if (first) this.chainZap(p.x, p.y, first, 5, 5 * this.dmgMult, a.color, true); break; }
      case 'mines': for (let i = 0; i < (a.count ?? 2); i++) this.mines.push({ x: p.x + rand(-30, 30), y: p.y - rand(10, 40), vx: rand(-20, 20), vy: -30, life: 9, r: 46, dmg: 14, t: 0 }); break;
      case 'blackhole': this.holes.push({ x: p.x, y: p.y - this.h * 0.28, life: 2.6, r: 120, t: 0 }); break;
      case 'swap': p.element = (p.element + 1) % 3; this.fx.collect(p.x, p.y, ['#ff7a3a', '#5ad0ff', '#ffe24a'][p.element]); break;
    }
  }

  triggerUltimate(): void {
    const p = this.player, u = this.kit.ultimate;
    if (p.ult < 1) return;
    p.ult = 0; this.ultActive = 0.6; this.flash = 1; this.shake = Math.max(this.shake, 16); sfx.ultimate();
    switch (u.type) {
      case 'barrage':
        for (let i = -9; i <= 9; i++) { const a = -Math.PI / 2 + i * 0.06; this.bullets.push({ x: p.x, y: p.y - 20, vx: Math.cos(a) * 780, vy: Math.sin(a) * 780, r: 5, dmg: 6 * this.dmgMult, hue: u.color, kind: 'bolt', life: 1.4, target: null, trail: 0 }); }
        for (let i = -2; i <= 2; i++) { const t = this.nearestEnemy(p.x, p.y); this.bullets.push({ x: p.x + i * 20, y: p.y - 16, vx: i * 120, vy: -260, r: 8, dmg: 14 * this.dmgMult, hue: u.color, kind: 'missile', life: 3, target: t, trail: 0 }); }
        break;
      case 'blades': this.bladesT = 6; this.bladeCount = 6; break;
      case 'shockwave': case 'supernova': case 'inferno': this.shockwave(u.type === 'supernova' ? 60 : 42, u.color, u.type !== 'shockwave'); break;
      case 'blizzard': for (const e of this.enemies) { e.slowT = 4; } this.shockwave(30, u.color, false); this.omni(24, u.color, 500, true); break;
      case 'swarm': for (let i = 0; i < 7; i++) this.addDrone(7); break;
      case 'beamSweep': this.sweepT = 1.3; this.sweepHue = u.color; break;
      case 'pierceLine': this.bullets.push({ x: p.x, y: p.y - 24, vx: 0, vy: -1400, r: 16, dmg: 60 * this.dmgMult, hue: u.color, kind: 'bolt', life: 1.5, target: null, trail: 0, pierce: true, hits: new Set() }); this.shake = Math.max(this.shake, 12); break;
      case 'omni': this.omni(26, u.color, 560, false); this.omni(26, u.color, 380, false); break;
      case 'storm': this.stormT = 1.6; this.stormHue = u.color; break;
      case 'minefield': for (let i = 0; i < 14; i++) this.mines.push({ x: rand(40, this.w - 40), y: rand(this.h * 0.2, this.h * 0.7), vx: 0, vy: 0, life: 8, r: 46, dmg: 16, t: 0 }); break;
      case 'missileRain': for (let i = 0; i < 16; i++) { const t = this.enemies[i % Math.max(1, this.enemies.length)] ?? null; this.bullets.push({ x: p.x + rand(-40, 40), y: p.y - 10, vx: rand(-220, 220), vy: -rand(200, 340), r: 6, dmg: 11 * this.dmgMult, hue: u.color, kind: 'missile', life: 3.2, target: t, trail: 0 }); } break;
      case 'collapse': this.holes.push({ x: this.w / 2, y: this.h * 0.4, life: 3.2, r: 240, t: 0 }); break;
    }
  }

  // ================= LOOP =================
  private loop = (now: number): void => {
    if (!this.running) return;
    let dt = (now - this.last) / 1000; this.last = now; if (dt > 0.05) dt = 0.05;
    this.fps = this.fps * 0.9 + (1 / Math.max(dt, 1e-4)) * 0.1;
    this.update(dt); this.render(); this.pushHud();
    this.raf = requestAnimationFrame(this.loop);
  };

  private update(dt: number): void {
    this.t += dt;
    const p = this.player;

    // ---- movimento ----
    let mx = 0, my = 0;
    if (this.keys.has('a') || this.keys.has('arrowleft')) mx -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) mx += 1;
    if (this.keys.has('w') || this.keys.has('arrowup')) my -= 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) my += 1;
    if (this.pointer.active) { const dx = this.pointer.x - p.x, dy = this.pointer.y - p.y - 40, d = Math.hypot(dx, dy); if (d > 3) { mx = dx / d; my = dy / d; } }
    const len = Math.hypot(mx, my) || 1;
    const moving = mx !== 0 || my !== 0;
    if (moving) { p.dirX = mx / len; p.dirY = my / len; }
    let sp = p.speed;
    if (p.dashT > 0) sp *= 2.6;
    p.vx = moving ? (mx / len) * sp : 0;
    p.vy = moving ? (my / len) * sp : 0;
    p.x = clamp(p.x + p.vx * dt, 30, this.w - 30);
    p.y = clamp(p.y + p.vy * dt, 60, this.h - 30);
    p.tilt += (clamp(mx, -1, 1) - p.tilt) * Math.min(1, dt * 10);

    // ---- passiva ----
    if (moving) p.noDmgT += dt; // usado por moveDamage
    let passiveDmg = 1;
    if (this.kit.passive === 'nodmgDamage') passiveDmg = 1 + Math.min(0.4, p.noDmgT * 0.05);
    if (this.kit.passive === 'moveDamage') passiveDmg = 1 + (moving ? Math.min(0.5, p.noDmgT * 0.06) : 0);
    if (this.kit.passive === 'lowlifeDamage') passiveDmg = 1 + (1 - p.hp / p.maxHp) * 0.8;
    if (this.kit.passive === 'critCombo') passiveDmg = 1 + Math.min(0.6, this.combo * 0.02);
    if (this.kit.passive === 'regen' && p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + dt * 3);
    if (p.cloak > 0) passiveDmg *= 1.6; // dano extra escondido

    // ---- tiro ----
    this.fire(dt, passiveDmg);

    // rastro de motor + dash
    this.fx.engine(p.x - 6, p.y + 16, this.kit.primary.color);
    this.fx.engine(p.x + 6, p.y + 16, this.kit.primary.color);
    if (p.dashT > 0 && this.kit.ability.type === 'flamedash') { this.mines.push({ x: p.x, y: p.y, vx: 0, vy: 40, life: 0.8, r: 30, dmg: 6, t: 0 }); }

    // motes
    this.moteT -= dt; if (this.moteT <= 0) { this.moteT = 0.09; this.fx.mote(rand(0, this.w), rand(0, this.h * 0.5), Math.random() < 0.5 ? '#8fd0ff' : '#c090ff'); }

    // ---- cooldowns ----
    p.abilityCd = Math.max(0, p.abilityCd - dt);
    p.ult = Math.min(1, p.ult + dt * 0.11);
    p.invuln = Math.max(0, p.invuln - dt);
    p.dmgFlash = Math.max(0, p.dmgFlash - dt * 2);
    p.powerT = Math.max(0, p.powerT - dt);
    p.dashT = Math.max(0, p.dashT - dt);
    p.wallT = Math.max(0, p.wallT - dt);
    p.cloak = Math.max(0, p.cloak - dt);
    p.shieldRegenT += dt;
    if (p.shieldRegenT > 2.5 && p.shield < p.maxShield) p.shield = Math.min(p.maxShield, p.shield + dt * 10);
    if (this.ultActive > 0) this.ultActive -= dt;
    if (this.comboTimer > 0) { this.comboTimer -= dt; if (this.comboTimer <= 0) this.combo = 0; }

    // ---- chefe / spawns ----
    if (this.boss) { this.updateBoss(dt); }
    else if (this.mode === 'campaign' && this.camp && !this.camp.done) {
      const c = this.camp, sec = CAMPAIGN[this.campSector];
      if (c.phaseIdx >= sec.phases.length) {
        if (!c.bossSpawned) { c.bossSpawned = true; this.spawnBoss(BOSS_BY_ID[sec.bossId]); }
      } else {
        this.spawnT -= dt;
        if (c.wavesSpawned < c.wavesTarget) { if (this.spawnT <= 0 && this.enemies.length < 10) { this.spawnWave(); c.wavesSpawned++; } }
        else if (this.enemies.length === 0) {
          c.phaseIdx++;
          if (c.phaseIdx < sec.phases.length) { c.wavesSpawned = 0; c.wavesTarget = sec.phases[c.phaseIdx].waves; this.setBanner(sec.phases[c.phaseIdx].name, `Fase ${c.phaseIdx + 1}/3`); }
          else this.setBanner(BOSS_BY_ID[sec.bossId].name, 'CHEFE À FRENTE');
        }
      }
    }
    else if (this.mode === 'endless' && this.wave - this.lastBossWave >= 9) {
      const useSecret = this.bossCounter > 0 && this.bossCounter % 4 === 0 && SECRET_BOSSES.length;
      const def = useSecret ? SECRET_BOSSES[(this.bossCounter / 4 | 0) % SECRET_BOSSES.length] : MAIN_BOSSES[this.bossCounter % MAIN_BOSSES.length];
      this.bossCounter++; this.spawnBoss(def);
    } else if (this.mode === 'endless') {
      this.spawnT -= dt; if (this.spawnT <= 0 && this.enemies.length < 12) this.spawnWave();
    }
    if (this.banner.t > 0) this.banner.t -= dt;

    // ---- entidades do jogador ----
    this.updateDrones(dt);
    this.updateBlades(dt);
    this.updateMines(dt);
    this.updateHoles(dt);
    if (this.sweepT > 0) this.sweepT -= dt;
    if (this.stormT > 0) { this.stormT -= dt; this.stormCd -= dt; if (this.stormCd <= 0) { this.stormCd = 0.12; this.stormStrike(); } }

    // ---- balas do jogador ----
    this.updateBullets(dt);

    // ---- inimigos ----
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.t += dt; e.hit = Math.max(0, e.hit - dt * 3); e.enter = Math.max(0, e.enter - dt);
      e.slowT = Math.max(0, e.slowT - dt); e.markT = Math.max(0, e.markT - dt);
      if (e.dotT > 0) { e.dotT -= dt; e.hp -= e.dotDmg * dt; if (Math.random() < dt * 8) this.fx.trail(e.x + rand(-6, 6), e.y, '#aaff40', 1.6); }
      this.moveEnemy(e, dt);
      if (e.enter <= 0 && e.def.pattern !== 'none') { e.fireCd -= dt; if (e.fireCd <= 0) { e.fireCd = e.def.cadence; this.emitPattern(e); e.fireN++; } }
      if (e.hp > 0 && p.invuln <= 0 && Math.hypot(e.x - p.x, e.y - p.y) < e.r + this.hitR) { this.damagePlayer(e.def.dmg); if (e.def.contact) { e.hp = 0; this.killEnemy(e); } }
      if (e.hp <= 0) { if (!e.dead) this.killEnemy(e); if (e.def.elite) this.eliteAlive = false; this.enemies.splice(i, 1); }
      else if (e.y > this.h + 80) { if (e.def.elite) this.eliteAlive = false; this.enemies.splice(i, 1); }
    }

    // ---- balas inimigas ----
    for (let i = this.ebullets.length - 1; i >= 0; i--) {
      const b = this.ebullets[i];
      if (b.homing !== undefined && b.homing > 0) { b.homing -= dt; const dx = p.x - b.x, dy = p.y - b.y, d = Math.hypot(dx, dy) || 1; b.vx += (dx / d) * 260 * dt; b.vy += (dy / d) * 260 * dt; const s = Math.hypot(b.vx, b.vy); if (s > 320) { b.vx = b.vx / s * 320; b.vy = b.vy / s * 320; } }
      if (b.split !== undefined) { b.split -= dt; if (b.split <= 0) { const sp = Math.hypot(b.vx, b.vy) || 300; for (let k = -1; k <= 1; k++) { const a = Math.atan2(b.vy, b.vx) + k * 0.35; this.ebullets.push({ x: b.x, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: b.r, hue: b.hue }); } this.ebullets.splice(i, 1); continue; } }
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.y > this.h + 20 || b.y < -20 || b.x < -20 || b.x > this.w + 20) { this.ebullets.splice(i, 1); continue; }
      // escudo frontal bloqueia
      if (p.wallT > 0 && b.y < p.y - 6 && b.y > p.y - 60 && Math.abs(b.x - p.x) < 46) {
        this.fx.hit(b.x, b.y, '#8ad4ff');
        if (this.kit.ability.power) this.bullets.push({ x: b.x, y: b.y, vx: 0, vy: -900, r: 4, dmg: 4 * this.dmgMult, hue: this.kit.ability.color, kind: 'bolt', life: 1, target: null, trail: 0 });
        this.ebullets.splice(i, 1); continue;
      }
      if (p.invuln <= 0 && Math.hypot(b.x - p.x, b.y - p.y) < b.r + this.hitR) { this.damagePlayer(8); this.ebullets.splice(i, 1); }
    }

    // ---- pickups ----
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const pk = this.pickups[i]; pk.t += dt; pk.life -= dt;
      const dx = p.x - pk.x, dy = p.y - pk.y, d = Math.hypot(dx, dy) || 1;
      if (d < 150) { const pull = (1 - d / 150) * 620; pk.vx += (dx / d) * pull * dt; pk.vy += (dy / d) * pull * dt; }
      pk.vy += 12 * dt; pk.vx *= 0.96; pk.vy *= 0.96; pk.x += pk.vx * dt; pk.y += pk.vy * dt;
      if (d < 20) { this.collectPickup(pk); this.pickups.splice(i, 1); continue; }
      if (pk.life <= 0 || pk.y > this.h + 30) this.pickups.splice(i, 1);
    }

    this.fx.update(dt); this.bg.update(dt, 1);
    this.shake *= Math.pow(0.001, dt); this.flash = Math.max(0, this.flash - dt * 2.2);
  }

  // ---------------- tiro primário ----------------
  private fire(dt: number, passiveDmg: number): void {
    const p = this.player, spec = this.kit.primary;
    if (spec.pattern === 'beam') { this.firePrimaryBeam(dt, passiveDmg); return; }
    p.fireCd -= dt; if (p.fireCd > 0) return;
    const powered = p.powerT > 0;
    p.fireCd = spec.cadence * (powered ? 0.72 : 1);
    const dmg = spec.dmg * this.dmgMult * passiveDmg * (powered ? 1.25 : 1);
    const up = -Math.PI / 2;
    const cnt = spec.count + (powered ? 1 : 0);
    // element (swap): 0 fogo(dot) 1 gelo(slow) 2 raio(chain)
    const el = this.kit.ability.type === 'swap' ? p.element : -1;
    const hue = el === 0 ? '#ff7a3a' : el === 1 ? '#7fe0ff' : el === 2 ? '#ffe24a' : spec.color;
    const spawn = (ang: number, xoff = 0): void => {
      const b: Bullet = { x: p.x + xoff, y: p.y - 22, vx: Math.cos(ang) * spec.speed + p.vx * 0.12, vy: Math.sin(ang) * spec.speed, r: spec.size, dmg, hue, kind: 'bolt', life: 1.2, target: null, trail: 0 };
      if (spec.pierce) { b.pierce = true; b.hits = new Set(); }
      if (spec.dot || el === 0) b.dot = spec.dot ?? 5;
      if (spec.slow || el === 1) b.slow = spec.slow ?? 1.2;
      if (spec.chain || el === 2) b.chain = spec.chain ?? 3;
      if (spec.explode) b.explode = true;
      if (spec.curve) b.curve = spec.curve;
      this.bullets.push(b);
    };
    if (spec.pattern === 'aimed') {
      const tg = this.nearestEnemy(p.x, p.y); const a = tg ? Math.atan2(tg.y - p.y, tg.x - p.x) : up;
      for (let i = 0; i < cnt; i++) spawn(a + (i - (cnt - 1) / 2) * 0.12);
    } else if (spec.pattern === 'homing') {
      for (let i = 0; i < cnt; i++) { const tg = this.nearestEnemy(p.x, p.y); const off = i - (cnt - 1) / 2; this.bullets.push({ x: p.x + off * 12, y: p.y - 16, vx: off * 80, vy: -560, r: spec.size, dmg, hue, kind: 'missile', life: 2.6, target: tg, trail: 0 }); }
    } else if (spec.pattern === 'lob') {
      for (let i = 0; i < cnt; i++) spawn(up + (i - (cnt - 1) / 2) * 0.2, (i - (cnt - 1) / 2) * 8);
    } else {
      for (let i = 0; i < cnt; i++) {
        const off = cnt > 1 ? (i - (cnt - 1) / 2) : 0;
        let ang = up, xoff = 0;
        if (spec.pattern === 'spread') ang = up + off * (spec.spread / Math.max(1, cnt - 1));
        else if (spec.pattern === 'wave') xoff = Math.sin(this.t * 9 + i) * 14;
        else xoff = off * 11;
        spawn(ang, xoff);
      }
    }
    this.fx.muzzle(p.x, p.y - 26, hue); sfx.shoot();
  }

  private firePrimaryBeam(dt: number, passiveDmg: number): void {
    const p = this.player, spec = this.kit.primary;
    const dps = spec.dmg * this.dmgMult * passiveDmg * (p.powerT > 0 ? 1.3 : 1);
    const halfW = spec.size * 1.4;
    for (const e of this.enemies) { if (e.hp <= 0) continue; if (Math.abs(e.x - p.x) < halfW + e.r * 0.6 && e.y < p.y) { e.hp -= dps * dt; e.hit = Math.max(e.hit, 0.3); if (Math.random() < dt * 20) this.fx.hit(e.x, e.y + e.r * 0.6, spec.color); if (e.hp <= 0) this.killEnemy(e); } }
    if (Math.random() < dt * 30) this.fx.muzzle(p.x, p.y - 24, spec.color);
    this._beamHalf = halfW; // guardado para render
  }
  private _beamHalf = 0;

  private updateBullets(dt: number): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i]; b.life -= dt;
      if (b.kind === 'missile' || b.curve) {
        if (!b.target || b.target.hp <= 0) b.target = this.nearestEnemy(b.x, b.y);
        if (b.target) { const dx = b.target.x - b.x, dy = b.target.y - b.y, d = Math.hypot(dx, dy) || 1; const turn = (b.curve ? 260 : 900); b.vx += (dx / d) * turn * dt; b.vy += (dy / d) * turn * dt; const s = Math.hypot(b.vx, b.vy); const cap = b.curve ? 1000 : 520; if (s > cap) { b.vx = b.vx / s * cap; b.vy = b.vy / s * cap; } }
        if (b.kind === 'missile') { b.trail -= dt; if (b.trail <= 0) { b.trail = 0.02; this.fx.trail(b.x, b.y, b.hue, 2.2); } }
      }
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.life <= 0 || b.y < -30 || b.y > this.h + 30 || b.x < -30 || b.x > this.w + 30) { this.bullets.splice(i, 1); continue; }
      for (const e of this.enemies) {
        if (e.hp <= 0) continue;
        if (b.hits && b.hits.has(e)) continue;
        if (Math.hypot(e.x - b.x, e.y - b.y) < e.r + b.r) {
          const mult = e.markT > 0 ? 1.6 : 1;
          e.hp -= b.dmg * mult; e.hit = 1;
          if (b.dot) { e.dotT = 3; e.dotDmg = Math.max(e.dotDmg, b.dot); }
          if (b.slow) e.slowT = Math.max(e.slowT, b.slow);
          if (b.chain) this.chainZap(b.x, b.y, e, b.chain, b.dmg * 0.6, b.hue, false);
          if (b.explode) { this.fx.explosion(b.x, b.y, 1, b.hue); this.aoe(b.x, b.y, 44, b.dmg); this.shake = Math.max(this.shake, 3); }
          this.fx.hit(b.x, b.y, b.kind === 'missile' ? b.hue : b.hue);
          if (b.kind === 'missile') { this.fx.explosion(b.x, b.y, 1, b.hue); this.shake = Math.max(this.shake, 4); }
          if (e.hp <= 0) this.killEnemy(e);
          if (b.pierce && b.hits) { b.hits.add(e); } else { this.bullets.splice(i, 1); break; }
        }
      }
      // colisão com o chefe
      if (this.bullets[i] === b && this.boss) { if (this.hitBoss(b) && !b.pierce) this.bullets.splice(i, 1); }
    }
  }

  // ---------------- entidades ----------------
  private addDrone(life: number): void { this.drones.push({ ang: Math.random() * Math.PI * 2, fireCd: 0, life, x: this.player.x, y: this.player.y }); }
  private updateDrones(dt: number): void {
    const p = this.player;
    for (let i = this.drones.length - 1; i >= 0; i--) {
      const d = this.drones[i]; d.life -= dt; if (d.life <= 0) { this.drones.splice(i, 1); continue; }
      d.ang += dt * 2.2; const R = 42; d.x = p.x + Math.cos(d.ang) * R; d.y = p.y + Math.sin(d.ang) * R * 0.7;
      d.fireCd -= dt;
      if (d.fireCd <= 0) { d.fireCd = 0.3; const tg = this.nearestEnemy(d.x, d.y); const a = tg ? Math.atan2(tg.y - d.y, tg.x - d.x) : -Math.PI / 2; this.bullets.push({ x: d.x, y: d.y, vx: Math.cos(a) * 760, vy: Math.sin(a) * 760, r: 2.6, dmg: 1.6 * this.dmgMult, hue: this.kit.ability.color, kind: 'bolt', life: 1, target: null, trail: 0 }); }
    }
  }
  private updateBlades(dt: number): void {
    if (this.bladesT <= 0) return; this.bladesT -= dt; this.bladeAng += dt * 6;
    const p = this.player, R = 60;
    for (const e of this.enemies) { if (e.hp <= 0) continue; for (let k = 0; k < this.bladeCount; k++) { const a = this.bladeAng + (k / this.bladeCount) * Math.PI * 2; const bx = p.x + Math.cos(a) * R, by = p.y + Math.sin(a) * R; if (Math.hypot(e.x - bx, e.y - by) < e.r + 10) { e.hp -= 30 * dt; e.hit = Math.max(e.hit, 0.4); if (Math.random() < dt * 10) this.fx.hit(bx, by, this.kit.ultimate.color); if (e.hp <= 0) this.killEnemy(e); } } }
  }
  private updateMines(dt: number): void {
    for (let i = this.mines.length - 1; i >= 0; i--) {
      const m = this.mines[i]; m.t += dt; m.life -= dt; m.x += m.vx * dt; m.y += m.vy * dt; m.vx *= 0.95; m.vy *= 0.95;
      let boom = m.life <= 0;
      for (const e of this.enemies) { if (e.hp > 0 && Math.hypot(e.x - m.x, e.y - m.y) < e.r + m.r * 0.4) { boom = true; break; } }
      if (boom) { this.fx.explosion(m.x, m.y, 1.4, '#ffb060'); this.aoe(m.x, m.y, m.r, m.dmg); this.shake = Math.max(this.shake, 6); sfx.explodeSmall(); this.mines.splice(i, 1); }
    }
  }
  private updateHoles(dt: number): void {
    for (let i = this.holes.length - 1; i >= 0; i--) {
      const hl = this.holes[i]; hl.t += dt; hl.life -= dt; if (hl.life <= 0) { this.holes.splice(i, 1); continue; }
      for (let j = this.ebullets.length - 1; j >= 0; j--) { const b = this.ebullets[j]; const dx = hl.x - b.x, dy = hl.y - b.y, d = Math.hypot(dx, dy) || 1; if (d < hl.r) { b.vx += (dx / d) * 900 * dt; b.vy += (dy / d) * 900 * dt; if (d < 24) this.ebullets.splice(j, 1); } }
      for (const e of this.enemies) { if (e.hp <= 0) continue; const dx = hl.x - e.x, dy = hl.y - e.y, d = Math.hypot(dx, dy) || 1; if (d < hl.r) { e.x += (dx / d) * 120 * dt; e.y += (dy / d) * 120 * dt; if (d < 60) { e.hp -= 30 * dt; e.hit = Math.max(e.hit, 0.4); if (e.hp <= 0) this.killEnemy(e); } } }
    }
  }
  private stormStrike(): void {
    const alive = this.enemies.filter((e) => e.hp > 0); if (!alive.length) return;
    const e = alive[Math.random() * alive.length | 0];
    this.chainZap(this.player.x, this.player.y - 20, e, 4, 10 * this.dmgMult, this.stormHue, false);
  }

  private chainZap(fx: number, fy: number, first: Enemy, n: number, dmg: number, hue: string, slow: boolean): void {
    let cx = fx, cy = fy; const seen = new Set<Enemy>(); let cur: Enemy | null = first;
    for (let i = 0; i < n && cur; i++) {
      this.fx.hit(cur.x, cur.y, hue); this.zapLine(cx, cy, cur.x, cur.y, hue);
      cur.hp -= dmg; cur.hit = 1; if (slow) cur.slowT = Math.max(cur.slowT, 1.4);
      seen.add(cur); cx = cur.x; cy = cur.y;
      if (cur.hp <= 0) this.killEnemy(cur);
      let best: Enemy | null = null, bd = 220; for (const e of this.enemies) { if (e.hp <= 0 || seen.has(e)) continue; const d = Math.hypot(e.x - cx, e.y - cy); if (d < bd) { bd = d; best = e; } }
      cur = best;
    }
  }
  private zaps: { x1: number; y1: number; x2: number; y2: number; hue: string; life: number }[] = [];
  private zapLine(x1: number, y1: number, x2: number, y2: number, hue: string): void { this.zaps.push({ x1, y1, x2, y2, hue, life: 0.12 }); }

  private aoe(x: number, y: number, r: number, dmg: number): void {
    for (const e of this.enemies) { if (e.hp <= 0) continue; if (Math.hypot(e.x - x, e.y - y) < r + e.r * 0.5) { e.hp -= dmg; e.hit = 1; if (e.hp <= 0) this.killEnemy(e); } }
  }
  private shockwave(dmg: number, hue: string, extraBoom: boolean): void {
    this.ebullets.length = 0;
    for (const e of this.enemies) { if (e.hp <= 0) continue; e.hp -= dmg; e.hit = 1; e.y += 10; if (e.hp <= 0) this.killEnemy(e); }
    this.fx.explosion(this.player.x, this.player.y, 3, hue, true);
    if (extraBoom) for (let i = 0; i < 5; i++) this.fx.explosion(rand(0, this.w), rand(0, this.h * 0.7), 2, hue, true);
    this.shake = Math.max(this.shake, 18);
  }
  private omni(n: number, hue: string, speed: number, slow: boolean): void {
    const p = this.player;
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; this.bullets.push({ x: p.x, y: p.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, r: 5, dmg: 8 * this.dmgMult, hue, kind: 'bolt', life: 1.2, target: null, trail: 0, slow: slow ? 1.5 : undefined }); }
  }

  // ---------------- IA de movimento ----------------
  private moveEnemy(e: Enemy, dt: number): void {
    const p = this.player; const sm = e.slowT > 0 ? 0.45 : 1; const v = e.def.speed * sm;
    if (e.enter > 0) { e.y += 120 * dt; return; }
    switch (e.def.behavior) {
      case 'dive': e.x += Math.cos(e.t * 2 + e.phase) * 90 * dt * sm; e.y += v * dt * (e.y < this.h * 0.4 ? 1.4 : 0.5); break;
      case 'strafe': e.x += Math.sin(e.t * 1.5 + e.phase) * 90 * dt * sm; e.y += v * 0.6 * dt * (e.y < this.h * 0.32 ? 1.5 : 0.25); e.x = clamp(e.x, 30, this.w - 30); break;
      case 'hover': e.y = Math.min(e.targetY, e.y + v * dt); e.x += Math.sin(e.t * 0.7 + e.phase) * 50 * dt * sm; e.x = clamp(e.x, 60, this.w - 60); break;
      case 'descend': e.y += v * 0.5 * dt; e.x += Math.sin(e.t * 0.5) * 20 * dt; break;
      case 'kamikaze': { const dx = p.x - e.x, dy = p.y - e.y, d = Math.hypot(dx, dy) || 1; e.x += (dx / d) * v * dt; e.y += (dy / d) * v * dt * 1.2 + 30 * dt; break; }
      case 'turret': e.y = Math.min(e.targetY, e.y + v * dt); break;
      case 'orbit': { e.y = Math.min(e.targetY || this.h * 0.28, e.y + v * dt); e.x += Math.cos(e.t * 1.2 + e.phase) * 90 * dt * sm; e.x = clamp(e.x, 50, this.w - 50); break; }
      case 'zigzag': e.x += (Math.floor(e.t * 2 + e.phase) % 2 ? 1 : -1) * 110 * dt * sm; e.y += v * 0.7 * dt; e.x = clamp(e.x, 30, this.w - 30); break;
      case 'drift': e.y += v * 0.5 * dt * sm; e.x += Math.sin(e.t + e.phase) * 24 * dt; break;
      case 'serpentine': e.x += Math.sin(e.t * 3 + e.phase) * 130 * dt * sm; e.y += v * 0.55 * dt; e.x = clamp(e.x, 30, this.w - 30); break;
    }
  }

  // ---------------- padrões de projétil (genéricos) ----------------
  private emitAt(x: number, y: number, sector: number, ang: number, speed: number, extra?: Partial<EBullet>): void {
    this.ebullets.push({ x, y, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, r: 4.6, hue: SECTOR_BULLET[sector], ...extra });
  }
  private aimA(x: number, y: number): number { return Math.atan2(this.player.y - y, this.player.x - x); }
  private emitP(x: number, y: number, sector: number, pattern: Pattern, n: number, sp: number, fireN: number): void {
    const down = Math.PI / 2;
    switch (pattern) {
      case 'aim': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, this.aimA(x, y) + (i - (n - 1) / 2) * 0.14, sp); break;
      case 'fan': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, down + (i - (n - 1) / 2) * 0.18, sp); break;
      case 'spread': { const a0 = this.aimA(x, y); for (let i = 0; i < n; i++) this.emitAt(x, y, sector, a0 + (i - (n - 1) / 2) * 0.22, sp); break; }
      case 'ring': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, (i / n) * Math.PI * 2, sp); break;
      case 'pulseRing': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, (i / n) * Math.PI * 2 + fireN * 0.2, sp * 0.7); break;
      case 'spiral': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, fireN * 0.4 + (i / n) * Math.PI * 2, sp * 0.8); break;
      case 'wave': for (let i = -2; i <= 2; i++) this.emitAt(x, y, sector, down + Math.sin(fireN * 0.5) * 0.4 + i * 0.12, sp * 0.8); break;
      case 'wall': { const gapX = this.player.x; for (let i = 0; i < n; i++) { const bx = 40 + (i / Math.max(1, n - 1)) * (this.w - 80); if (Math.abs(bx - gapX) < 60) continue; this.ebullets.push({ x: bx, y, vx: 0, vy: sp * 0.7, r: 4.6, hue: SECTOR_BULLET[sector] }); } break; }
      case 'rain': for (let i = 0; i < n; i++) { const bx = x + rand(-90, 90); this.ebullets.push({ x: bx, y, vx: rand(-40, 40), vy: sp * 0.8, r: 4.2, hue: SECTOR_BULLET[sector] }); } break;
      case 'sweep': { const base = down - 0.5 + (fireN % 8) * 0.14; for (let i = 0; i < n; i++) this.emitAt(x, y, sector, base + i * 0.1, sp); break; }
      case 'aimBurst': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, this.aimA(x, y), sp * (0.8 + i * 0.15)); break;
      case 'cross': for (let i = 0; i < 4; i++) this.emitAt(x, y, sector, i * (Math.PI / 2) + Math.PI / 4 + fireN * 0.1, sp); break;
      case 'arc': for (let i = 0; i < 5; i++) this.emitAt(x, y, sector, down - 0.5 + i * 0.25, sp * 0.85); break;
      case 'homingSlow': for (let i = 0; i < n; i++) this.emitAt(x, y, sector, down + (i - (n - 1) / 2) * 0.3, sp * 0.55, { homing: 2.5, r: 5.4 }); break;
      case 'split': this.emitAt(x, y, sector, this.aimA(x, y), sp * 0.7, { split: 0.55, r: 5.4 }); break;
    }
  }
  private emitPattern(e: Enemy): void { this.emitP(e.x, e.y, e.def.sector, e.def.pattern, e.def.count, e.def.bspeed, e.fireN); }

  // ================= CAMPANHA =================
  private setBanner(text: string, sub: string): void { this.banner = { t: 2.4, text, sub }; }
  private finishCampaign(success: boolean): void {
    if (!this.camp || this.camp.done) return; this.camp.done = true;
    const timeSec = (performance.now() - this.camp.startT) / 1000;
    let medal = '—';
    if (success) { const d = this.camp.dmgTaken, lv = this.camp.lives; medal = d === 0 ? 'Eclipse' : (lv === 3 && d < 90) ? 'Platina' : lv >= 2 ? 'Ouro' : lv >= 1 ? 'Prata' : 'Bronze'; }
    this.onComplete({ success, sector: this.campSector, score: this.score, kills: this.camp.kills, timeSec, dmgTaken: Math.round(this.camp.dmgTaken), lives: this.camp.lives, medal });
  }

  // ================= CHEFES =================
  private spawnBoss(def: BossDef): void {
    this.lastBossWave = this.wave; this.enemies.length = 0; this.ebullets.length = 0; this.eliteAlive = false;
    const parts: BossPartLive[] = def.parts.map((pt) => ({ rx: pt.x * def.size, ry: pt.y * def.size, x: this.w / 2, y: -def.size, hp: pt.hp, maxHp: pt.hp, dead: false, fireCd: rand(0.5, 1.5), def: pt }));
    this.boss = { def, x: this.w / 2, y: -def.size, hp: def.hp, maxHp: def.hp, t: 0, hit: 0, deathT: 0, state: 'enter', enterT: 2.0, phaseIdx: 0, exposed: false, emitCd: def.phases[0].attacks.map(() => rand(0.4, 1.2)), fireN: 0, parts, targetY: this.h * 0.2, dir: 1, nameT: 3 };
    this.flash = Math.max(this.flash, 0.5); sfx.explodeBig();
  }
  private updateBoss(dt: number): void {
    const b = this.boss!; const p = this.player; b.t += dt; b.hit = Math.max(0, b.hit - dt * 3); if (b.nameT > 0) b.nameT -= dt;
    for (const pt of b.parts) { pt.x = b.x + pt.rx; pt.y = b.y + pt.ry; }
    if (b.state === 'enter') { b.y += (b.targetY - b.y) * Math.min(1, dt * 2); b.enterT -= dt; if (b.enterT <= 0 && Math.abs(b.y - b.targetY) < 4) b.state = 'fight'; return; }
    if (b.state === 'die') {
      b.deathT += dt; if (Math.random() < dt * 20) this.fx.explosion(b.x + rand(-1, 1) * b.def.size, b.y + rand(-1, 1) * b.def.size, 2, b.def.pal.accent, true); this.shake = Math.max(this.shake, 12);
      if (b.deathT > 1.7) { this.fx.explosion(b.x, b.y, 5, '#ffffff', true); this.flash = 1; this.shake = 24; this.score += b.def.secret ? 8000 : 5000; p.ult = 1; this.boss = null; if (this.mode === 'campaign' && this.camp && !this.camp.done) this.finishCampaign(true); }
      return;
    }
    const phases = b.def.phases; let idx = 0; const frac = b.hp / b.maxHp;
    for (let i = 0; i < phases.length; i++) if (frac <= phases[i].at) idx = i;
    if (idx !== b.phaseIdx) { b.phaseIdx = idx; b.emitCd = phases[idx].attacks.map(() => rand(0.3, 0.9)); if (this.ebullets.length > 20) this.ebullets.length = 20; this.flash = Math.max(this.flash, 0.5); b.hit = 1; b.nameT = 1.4; sfx.explodeSmall(); }
    b.exposed = idx === phases.length - 1;
    const ph = phases[idx];
    if (ph.move === 'sweep') { b.x += b.dir * 70 * dt; if (b.x < b.def.size + 20 || b.x > this.w - b.def.size - 20) b.dir *= -1; b.x = clamp(b.x, b.def.size + 20, this.w - b.def.size - 20); }
    else if (ph.move === 'chase') { b.x += Math.sign(p.x - b.x) * Math.min(90, Math.abs(p.x - b.x)) * dt * 1.4; b.x = clamp(b.x, b.def.size, this.w - b.def.size); }
    else { b.x += Math.sin(b.t * 0.8) * 40 * dt; }
    b.y = b.targetY + Math.sin(b.t * 0.7) * 12;
    for (let i = 0; i < ph.attacks.length; i++) { b.emitCd[i] -= dt; if (b.emitCd[i] <= 0) { const at = ph.attacks[i]; b.emitCd[i] = at.cadence; this.emitP(b.x, b.y, b.def.sector, at.pattern, at.count, at.bspeed, b.fireN++); } }
    for (const pt of b.parts) { if (pt.dead) continue; pt.fireCd -= dt; if (pt.fireCd <= 0 && pt.def.pattern) { pt.fireCd = pt.def.cadence ?? 1.5; this.emitP(pt.x, pt.y, b.def.sector, pt.def.pattern, pt.def.count ?? 1, pt.def.bspeed ?? 340, b.fireN++); } }
    if (p.invuln <= 0 && Math.hypot(b.x - p.x, b.y - p.y) < b.def.size * 0.8 + this.hitR) this.damagePlayer(26);
  }
  private hitBoss(bl: Bullet): boolean {
    const b = this.boss; if (!b || b.state !== 'fight') return false;
    for (const pt of b.parts) { if (pt.dead) continue; if (Math.hypot(pt.x - bl.x, pt.y - bl.y) < b.def.size * 0.28 + bl.r) { pt.hp -= bl.dmg; this.fx.hit(bl.x, bl.y, '#bfe9ff'); if (pt.hp <= 0) { pt.dead = true; this.fx.explosion(pt.x, pt.y, 1.6, b.def.pal.accent, true); this.score += 400; this.shake = Math.max(this.shake, 8); } if (bl.pierce && bl.hits) return false; return true; } }
    if (Math.hypot(b.x - bl.x, b.y - bl.y) < b.def.size * 0.85 + bl.r) {
      const mult = b.exposed ? 1.5 : 1; b.hp -= bl.dmg * mult; b.hit = 1;
      this.fx.hit(bl.x, bl.y, '#bfe9ff');
      if (bl.kind === 'missile') { this.fx.explosion(bl.x, bl.y, 1, bl.hue); this.shake = Math.max(this.shake, 4); }
      if (b.hp <= 0 && b.state === 'fight') { b.state = 'die'; b.deathT = 0; sfx.explodeBig(); this.flash = Math.max(this.flash, 0.8); }
      if (bl.pierce && bl.hits) return false;
      return true;
    }
    return false;
  }

  private damagePlayer(dmg: number): void {
    const p = this.player; if (p.dashT > 0) return;
    if (this.kit.passive === 'armor') dmg *= 0.65;
    p.invuln = 0.7; p.dmgFlash = 1; p.shieldRegenT = 0; p.noDmgT = 0;
    if (this.kit.passive === 'dodgeCharge') { /* nada; dodge premia esquiva, não dano */ }
    this.shake = Math.max(this.shake, 8); sfx.hit();
    if (this.camp) this.camp.dmgTaken += dmg;
    if (p.shield > 0) { p.shield -= dmg; if (p.shield < 0) { p.hp += p.shield; p.shield = 0; } } else p.hp -= dmg;
    this.combo = Math.max(0, this.combo - 5);
    if (p.hp <= 0) {
      this.fx.explosion(p.x, p.y, 2, this.kit.primary.color, true); this.shake = 18;
      if (this.mode === 'campaign' && this.camp && !this.camp.done) {
        this.camp.lives--;
        if (this.camp.lives <= 0) { this.finishCampaign(false); return; }
      }
      p.hp = p.maxHp; p.shield = p.maxShield; p.invuln = 1.4;
    }
  }
  private killEnemy(e: Enemy): void {
    if (e.dead) return; e.dead = true; // evita contagem dupla
    const big = !!e.def.elite;
    this.fx.explosion(e.x, e.y, big ? 2.6 : 1.1, e.def.pal.accent, big);
    this.shake = Math.max(this.shake, big ? 15 : 5); if (big) sfx.explodeBig(); else sfx.explodeSmall();
    if (this.camp) this.camp.kills++;
    this.combo += 1; this.comboTimer = 2.2;
    this.score += Math.round(e.def.score * (1 + this.combo * 0.05));
    this.player.ult = Math.min(1, this.player.ult + (big ? 0.25 : 0.03));
    if (this.kit.passive === 'dodgeCharge') this.player.ult = Math.min(1, this.player.ult + 0.01);
    this.dropPickups(e.x, e.y, big);
  }

  private collectPickup(pk: Pickup): void {
    const p = this.player, c = PICK_COLOR[pk.kind]; this.fx.collect(pk.x, pk.y, c); sfx.ui();
    switch (pk.kind) {
      case 'score': this.score += Math.round(60 * (1 + this.combo * 0.05)); p.ult = Math.min(1, p.ult + 0.02); break;
      case 'shield': p.shield = Math.min(p.maxShield, p.shield + 28); break;
      case 'heal': p.hp = Math.min(p.maxHp, p.hp + 24); break;
      case 'ult': p.ult = Math.min(1, p.ult + 0.3); break;
      case 'power': p.powerT = Math.max(p.powerT, 7); break;
    }
  }
  private dropPickups(x: number, y: number, big: boolean): void {
    if (big) { const ks: PickKind[] = ['ult', 'shield', 'power', 'heal', 'score', 'score']; for (const k of ks) this.spawnPickup(x + rand(-30, 30), y + rand(-20, 20), k); }
    else if (Math.random() < 0.26) { const r = Math.random(); const k: PickKind = r < 0.6 ? 'score' : r < 0.75 ? 'shield' : r < 0.88 ? 'ult' : r < 0.96 ? 'heal' : 'power'; this.spawnPickup(x, y, k); }
  }
  private spawnPickup(x: number, y: number, kind: PickKind): void { this.pickups.push({ x, y, vx: rand(-60, 60), vy: rand(-40, 20), kind, t: Math.random() * 6, life: 9 }); }

  private nearestEnemy(x: number, y: number): Enemy | null { let b: Enemy | null = null, bd = Infinity; for (const e of this.enemies) { if (e.hp <= 0) continue; const d = Math.hypot(e.x - x, e.y - y); if (d < bd) { bd = d; b = e; } } return b; }
  private nearest(x: number, y: number, n: number): Enemy[] { return this.enemies.filter((e) => e.hp > 0).sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y)).slice(0, n); }

  private spawnWave(): void {
    this.spawnT = rand(1.6, 2.6); this.wave++;
    // campanha: setor fixo; endless: avança a cada 6 ondas
    if (this.mode === 'campaign') this.curSector = this.campSector;
    else this.curSector = Math.floor((this.wave - 1) / 6) % 12;
    const pool = ENEMIES_BY_SECTOR[this.curSector];
    const normals = pool.filter((d) => !d.elite);
    const elite = pool.find((d) => d.elite);
    if (this.mode === 'endless' && !this.eliteAlive && this.wave % 4 === 0 && elite) { this.addEnemy(elite, this.w / 2, -90, this.h * 0.22); this.eliteAlive = true; return; }
    const def = normals[Math.random() * normals.length | 0];
    const group = def.behavior === 'turret' || def.behavior === 'hover' ? 1 : 2 + (Math.random() * 3 | 0);
    for (let i = 0; i < group; i++) {
      const ty = def.behavior === 'turret' || def.behavior === 'orbit' ? rand(this.h * 0.14, this.h * 0.3) : (def.behavior === 'hover' ? rand(this.h * 0.2, this.h * 0.34) : 0);
      this.addEnemy(def, rand(60, this.w - 60), -40 - i * 50, ty);
    }
  }
  private addEnemy(def: EnemyDef, x: number, y: number, targetY: number): void {
    this.enemies.push({ x, y, vx: 0, vy: 0, def, size: def.size, hp: def.hp, maxHp: def.hp, r: def.size * 1.15, t: Math.random() * 6, hit: 0, fireCd: rand(0.6, def.cadence), fireN: 0, enter: 0.25, phase: Math.random() * Math.PI * 2, targetY: targetY || y, slowT: 0, dotT: 0, dotDmg: 0, markT: 0, dead: false });
    if (def.elite) this.flash = Math.max(this.flash, 0.4);
  }

  // ================= RENDER =================
  private render(): void {
    const ctx = this.ctx, p = this.player;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.bg.drawBack(ctx);
    ctx.save();
    if (this.shake > 0.2) ctx.translate(rand(-1, 1) * this.shake * 0.4, rand(-1, 1) * this.shake * 0.4);

    // buracos negros (atrás)
    for (const hl of this.holes) this.drawHole(ctx, hl);
    // minas
    for (const m of this.mines) this.drawMine(ctx, m);
    // balas inimigas
    for (const b of this.ebullets) { glow(ctx, b.x, b.y, b.r * 3.4, b.hue, 0.7); ctx.fillStyle = '#fff2d8'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.6, 0, Math.PI * 2); ctx.fill(); }
    // inimigos
    for (const e of this.enemies) { if (e.slowT > 0) glow(ctx, e.x, e.y, e.size * 1.6, '#7fe0ff', 0.25); drawEnemyGen(ctx, e.def.arch, e.x, e.y, e.size, e.t, e.hit, e.def.pal); if (e.markT > 0) { ctx.strokeStyle = applyAlpha('#ff5a7a', 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(e.x, e.y, e.r + 4, 0, Math.PI * 2); ctx.stroke(); } }
    // chefe
    if (this.boss) this.drawBossEntity(ctx, this.boss);
    // pickups
    for (const pk of this.pickups) this.drawPickup(ctx, pk);
    // feixe primário
    if (this.kit.primary.pattern === 'beam') this.drawBeam(ctx, p.x, p.y - 24, this._beamHalf, this.kit.primary.color);
    // feixe ultimate (sweep)
    if (this.sweepT > 0) { const hw = 46 + Math.sin(this.t * 8) * 8; this.drawBeam(ctx, p.x, p.y - 24, hw, this.sweepHue); for (const e of this.enemies) { if (e.hp > 0 && Math.abs(e.x - p.x) < hw + e.r && e.y < p.y) { e.hp -= 90 * (1 / 60); e.hit = 1; if (e.hp <= 0) this.killEnemy(e); } } }
    // corrente elétrica (zaps)
    for (let i = this.zaps.length - 1; i >= 0; i--) { const z = this.zaps[i]; z.life -= 1 / 60; if (z.life <= 0) { this.zaps.splice(i, 1); continue; } beam(ctx, z.x1, z.y1, z.x2, z.y2, 2.4, '#ffffff', applyAlpha(z.hue, 0.6)); }
    // balas do jogador
    for (const b of this.bullets) this.drawPlayerBullet(ctx, b);
    // drones
    for (const d of this.drones) this.drawDrone(ctx, d);
    // lâminas orbitais
    if (this.bladesT > 0) this.drawBlades(ctx, p);
    // escudo frontal
    if (p.wallT > 0) this.drawWall(ctx, p);
    // aura de power / cloak
    if (p.powerT > 0) glow(ctx, p.x, p.y, 40 + Math.sin(this.t * 12) * 6, '#c080ff', 0.5);
    // nave
    const cloakA = p.cloak > 0 ? 0.4 : 1;
    ctx.globalAlpha = cloakA;
    drawShip(ctx, p.x, p.y, 24, this.ship.design, { tilt: p.tilt, thrust: 0.7 + Math.hypot(p.vx, p.vy) / p.speed * 0.4, t: this.t, shield: p.shield / p.maxShield, damage: p.dmgFlash, invuln: p.invuln > 0 && p.dashT <= 0 });
    ctx.globalAlpha = 1;
    this.fx.draw(ctx);
    ctx.restore();

    this.bg.drawFront(ctx);
    if (this.flash > 0.01) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = applyAlpha(this.ultActive > 0 ? this.kit.ultimate.color : '#ff6a6a', this.flash * 0.32); ctx.fillRect(0, 0, this.w, this.h); ctx.restore(); }

    this.bloom.apply(ctx, this.canvas, 0.5, 5);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    if (p.hp < 30) { const a = 0.2 + 0.15 * Math.sin(this.t * 6); const g = ctx.createRadialGradient(this.w / 2, this.h / 2, this.h * 0.3, this.w / 2, this.h / 2, this.h * 0.7); g.addColorStop(0, 'rgba(255,40,40,0)'); g.addColorStop(1, `rgba(255,30,40,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, this.w, this.h); }

    // cartão de fase (campanha)
    if (this.banner.t > 0 && !this.boss) {
      const a = Math.min(1, this.banner.t / 0.6);
      ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center';
      ctx.fillStyle = '#8fd0ff'; ctx.font = '600 13px Rajdhani, sans-serif'; ctx.fillText(this.banner.sub.toUpperCase(), this.w / 2, this.h * 0.4 - 6);
      ctx.fillStyle = '#ffffff'; ctx.font = '800 28px Rajdhani, sans-serif'; ctx.shadowColor = '#5bd6ff'; ctx.shadowBlur = 16;
      ctx.fillText(this.banner.text.toUpperCase(), this.w / 2, this.h * 0.4 + 22);
      ctx.restore();
    }
  }

  private drawPlayerBullet(ctx: CanvasRenderingContext2D, b: Bullet): void {
    if (b.kind === 'missile') {
      glow(ctx, b.x, b.y, b.r * 3.6, b.hue, 0.9);
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
      ctx.fillStyle = '#ffe6b0'; ctx.beginPath(); ctx.moveTo(0, -b.r * 1.6); ctx.lineTo(b.r, b.r); ctx.lineTo(-b.r, b.r); ctx.closePath(); ctx.fill(); ctx.restore();
    } else {
      const x2 = b.x - b.vx * 0.032, y2 = b.y - b.vy * 0.032;
      beam(ctx, b.x, b.y, x2, y2, b.r * 0.8, '#f4fdff', applyAlpha(b.hue, 0.45));
      glow(ctx, b.x, b.y, b.r * 3.0, b.hue, 0.85);
    }
  }
  private drawBeam(ctx: CanvasRenderingContext2D, x: number, y: number, hw: number, hue: string): void {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(x - hw, 0, x + hw, 0);
    g.addColorStop(0, applyAlpha(hue, 0)); g.addColorStop(0.5, applyAlpha(hue, 0.5)); g.addColorStop(1, applyAlpha(hue, 0));
    ctx.fillStyle = g; ctx.fillRect(x - hw, 0, hw * 2, y);
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(x - hw * 0.22, 0, hw * 0.44, y);
    glow(ctx, x, y, hw * 2.4, hue, 0.9); ctx.restore();
  }
  private drawDrone(ctx: CanvasRenderingContext2D, d: Drone): void {
    const c = this.kit.ability.color; glow(ctx, d.x, d.y, 12, c, 0.8);
    ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.ang * 2); ctx.fillStyle = applyAlpha(c, 0.9);
    poly(ctx, [0, -7, 6, 0, 0, 7, -6, 0]); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  private drawBlades(ctx: CanvasRenderingContext2D, p: any): void {
    const c = this.kit.ultimate.color, R = 60;
    for (let k = 0; k < this.bladeCount; k++) { const a = this.bladeAng + (k / this.bladeCount) * Math.PI * 2; const bx = p.x + Math.cos(a) * R, by = p.y + Math.sin(a) * R; glow(ctx, bx, by, 16, c, 0.9); ctx.save(); ctx.translate(bx, by); ctx.rotate(a + Math.PI / 2); ctx.fillStyle = '#ffffff'; poly(ctx, [0, -12, 4, 6, -4, 6]); ctx.fill(); ctx.restore(); }
  }
  private drawWall(ctx: CanvasRenderingContext2D, p: any): void {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const c = this.kit.ability.color;
    const g = ctx.createLinearGradient(0, p.y - 60, 0, p.y - 6); g.addColorStop(0, applyAlpha(c, 0.5)); g.addColorStop(1, applyAlpha(c, 0.05));
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(p.x, p.y - 30, 48, 30, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = applyAlpha('#bfe9ff', 0.6 + 0.3 * Math.sin(this.t * 6)); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(p.x, p.y - 30, 48, 30, 0, Math.PI, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  private drawMine(ctx: CanvasRenderingContext2D, m: Mine): void {
    const pulse = 0.6 + 0.4 * Math.sin(m.t * 8); glow(ctx, m.x, m.y, 14 * pulse, '#ffb060', 0.8);
    ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.t); ctx.fillStyle = '#2a2018';
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; ctx.save(); ctx.rotate(a); poly(ctx, [-2, 6, 2, 6, 0, 12]); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = applyAlpha('#ffb060', pulse); ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  private drawHole(ctx: CanvasRenderingContext2D, hl: Hole): void {
    const r = hl.r * Math.min(1, hl.t * 2) * (hl.life < 0.5 ? hl.life * 2 : 1);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(hl.x, hl.y, r * 0.15, hl.x, hl.y, r);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.3, applyAlpha('#6030d8', 0.4)); g.addColorStop(0.7, applyAlpha('#c090ff', 0.25)); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hl.x, hl.y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = applyAlpha('#c090ff', 0.5); ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(hl.x, hl.y, r * (0.4 + k * 0.2), hl.t * 3 + k, hl.t * 3 + k + 4); ctx.stroke(); } ctx.restore();
    // núcleo negro
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(hl.x, hl.y, r * 0.16, 0, Math.PI * 2); ctx.fill();
  }
  private drawBossEntity(ctx: CanvasRenderingContext2D, b: Boss): void {
    drawBoss(ctx, b.def.form, b.x, b.y, b.def.size, b.t, b.def.pal, { phase: b.phaseIdx, exposed: b.exposed, hit: b.hit, deathT: b.deathT });
    // partes destrutíveis (torres)
    for (const pt of b.parts) {
      if (pt.dead) continue;
      const rr = b.def.size * 0.24;
      glow(ctx, pt.x, pt.y, rr * 2, b.def.pal.accent, 0.5);
      ctx.fillStyle = applyAlpha(b.def.pal.dark, 0.95); ctx.beginPath(); ctx.arc(pt.x, pt.y, rr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = applyAlpha(b.def.pal.accent, 0.8); ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = applyAlpha(b.def.pal.accent, 0.9); ctx.beginPath(); ctx.arc(pt.x, pt.y, rr * 0.4, 0, Math.PI * 2); ctx.fill();
      // barrinha de vida da parte
      const w = rr * 2, hpf = pt.hp / pt.maxHp;
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(pt.x - w / 2, pt.y - rr - 8, w, 3);
      ctx.fillStyle = '#ff8a5a'; ctx.fillRect(pt.x - w / 2, pt.y - rr - 8, w * hpf, 3);
    }
    // cartão de nome (entrada / troca de fase)
    if (b.nameT > 0) {
      const a = Math.min(1, b.nameT);
      ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff'; ctx.font = '800 26px Rajdhani, sans-serif';
      ctx.shadowColor = b.def.pal.accent; ctx.shadowBlur = 18;
      ctx.fillText(b.def.name.toUpperCase(), this.w / 2, b.state === 'enter' ? this.h * 0.44 : b.y - b.def.size - 18);
      ctx.shadowBlur = 0; ctx.fillStyle = applyAlpha(b.def.pal.accent, 0.9); ctx.font = '600 13px Rajdhani, sans-serif';
      ctx.fillText(b.def.title.toUpperCase(), this.w / 2, (b.state === 'enter' ? this.h * 0.44 : b.y - b.def.size - 18) + 20);
      ctx.restore();
    }
  }

  private drawPickup(ctx: CanvasRenderingContext2D, pk: Pickup): void {
    const c = PICK_COLOR[pk.kind]; const pulse = 0.75 + 0.25 * Math.sin(pk.t * 6); const bob = Math.sin(pk.t * 4) * 2; const y = pk.y + bob;
    glow(ctx, pk.x, y, 22 * pulse, c, 0.85);
    ctx.save(); ctx.translate(pk.x, y); ctx.rotate(pk.t * 0.8); ctx.fillStyle = applyAlpha(c, 0.9);
    ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; ctx.lineTo(Math.cos(a) * 8, Math.sin(a) * 8); } ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(pk.x, y, 3.2, 0, Math.PI * 2); ctx.fill();
  }

  private pushHud(): void {
    const p = this.player;
    this.hud.hp = p.hp; this.hud.maxHp = p.maxHp; this.hud.shield = p.shield; this.hud.maxShield = p.maxShield;
    this.hud.score = this.score; this.hud.combo = this.combo; this.hud.comboTimer = this.comboTimer;
    this.hud.ability = 1 - p.abilityCd / p.abilityMax; this.hud.ultimate = p.ult;
    this.hud.speed = Math.min(1, Math.hypot(p.vx, p.vy) / p.speed); this.hud.fps = this.fps; this.hud.wave = this.wave; this.hud.sector = SECTORS[this.curSector].name;
    const b = this.boss;
    this.hud.bossActive = !!b && b.state !== 'die';
    this.hud.bossName = b ? b.def.name : '';
    this.hud.bossHp = b ? Math.max(0, b.hp / b.maxHp) : 0;
    this.hud.bossPhases = b ? b.def.phases.length : 1;
    this.hud.bossPhase = b ? b.phaseIdx : 0;
    this.hud.campaign = this.mode === 'campaign';
    this.hud.lives = this.camp ? this.camp.lives : 3;
    this.onHud(this.hud);
  }
}
