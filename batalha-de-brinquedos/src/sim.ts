// ---------------------------------------------------------------------------
// SIMULAÇÃO — o jogo inteiro acontece aqui: bonequinhos marchando nas 3
// faixas, combate com counters, projéteis em arco, módulos da base (torreta,
// gerador, muralha), evolução de era com escolha de facção, especiais com
// cooldown e o evento do quarto (a GUDE GIGANTE atravessando uma faixa).
// side 0 = jogador (esquerda → direita) · side 1 = inimigo
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { WORLD } from './scene';
import { buildToy, UnitKind, Faction } from './toy';
import { makeAnim, setMode, updateAnim, hit as animHit, kill as animKill, Anim } from './anim';
import { statsOf, counter, UnitStats, XP_EVOLVE, BASE_HP, INCOME, START_GOLD, SlotKind, SLOT_INFO, TURRET, GEN_RATE, WALL_HP, SPECIAL_CD } from './units';
import { FX } from './fx';
import { plastic, woodMat, blobShadow } from './board';
import { sfx } from './audio';

const { laneZ, baseX } = WORLD;
const GATE_X = baseX - 60;                 // onde os bichos nascem
const HIT_BASE_X = baseX - 74;             // onde começa a bater na base

export interface Unit {
  id: number; side: 0 | 1; kind: UnitKind; lane: number;
  x: number; hp: number; st: UnitStats;
  anim: Anim; cd: number; stun: number;
  dead: boolean;
}
interface Proj {
  m: THREE.Mesh; x: number; y: number; z: number; vx: number; vy: number;
  side: 0 | 1; lane: number; dmg: number; radius: number; t: number; kind: 'flecha' | 'pedra' | 'gude' | 'bala';
}
interface Slot {
  kind: SlotKind | null; lvl: number; cd: number; wallHp: number;
  mesh: THREE.Group | null; spawnT: number;
}

export type Toast = (msg: string, kind?: string) => void;

export class Game {
  units: Unit[] = []; private projs: Proj[] = [];
  gold: [number, number] = [START_GOLD, START_GOLD];
  xp: [number, number] = [0, 0];
  faction: [Faction, Faction] = ['madeira', 'madeira'];
  evolved: [boolean, boolean] = [false, false];
  baseHp: [number, number] = [BASE_HP, BASE_HP];
  slots: [Slot[], Slot[]] = [[], []];
  specCd: [number, number] = [0, 0];
  spawnCd: [number, number] = [0, 0];
  over = false; winner: 0 | 1 = 0;
  time = 0; speed = 1;
  incomeMul: [number, number] = [1, 1];    // dificuldade mexe no lado 1
  // evento da gude
  marble: { state: 'idle' | 'warn' | 'roll'; t: number; lane: number; x: number; dir: number; next: number; m: THREE.Mesh | null; warn: THREE.Mesh | null } =
    { state: 'idle', t: 0, lane: 0, x: 0, dir: 1, next: 50, m: null, warn: null };
  onShake: (f: number) => void = () => {};
  toast: Toast = () => {};
  onOver: (winner: 0 | 1) => void = () => {};

  private id = 1;
  constructor(private scene: THREE.Scene, private fx: FX, private slotPos: { mine: THREE.Vector3[]; foe: THREE.Vector3[] }) {
    for (const s of [0, 1]) this.slots[s as 0 | 1] = [0, 1, 2].map(() => ({ kind: null, lvl: 0, cd: 0, wallHp: 0, mesh: null, spawnT: 0 }));
  }

  // ---------------- compras ----------------
  canBuy(side: 0 | 1, kind: UnitKind): boolean {
    return !this.over && this.gold[side] >= statsOf(kind, this.faction[side]).cost && this.spawnCd[side] <= 0;
  }
  buy(side: 0 | 1, kind: UnitKind, lane: number): boolean {
    if (!this.canBuy(side, kind)) return false;
    const st = statsOf(kind, this.faction[side]);
    this.gold[side] -= st.cost;
    this.spawnCd[side] = st.train;             // tempo de treino: reforço NÃO é infinito
    this.spawn(side, kind, lane);
    return true;
  }
  private spawn(side: 0 | 1, kind: UnitKind, lane: number): Unit {
    const st = statsOf(kind, this.faction[side]);
    const rig = buildToy(kind, this.faction[side], side === 1);
    const x = side === 0 ? -GATE_X : GATE_X;
    rig.group.position.set(x, 0, laneZ[lane] + (Math.random() - 0.5) * 18);   // espalha na faixa (legibilidade)
    this.scene.add(rig.group);
    const u: Unit = { id: this.id++, side, kind, lane, x, hp: st.hp, st, anim: makeAnim(rig, kind), cd: 0, stun: 0, dead: false };
    this.units.push(u);
    this.fx.puff(x, 8, laneZ[lane], 0xf5ecd8, 6, 3);
    sfx.pop();
    return u;
  }

  // ---------------- módulos da base ----------------
  build(side: 0 | 1, idx: number, kind: SlotKind): boolean {
    const s = this.slots[side][idx];
    const info = SLOT_INFO[kind];
    if (this.over || s.kind || this.gold[side] < info.cost) return false;
    this.gold[side] -= info.cost;
    s.kind = kind; s.lvl = 1; s.cd = 0; s.spawnT = 0;
    if (kind === 'muralha') s.wallHp = WALL_HP;
    s.mesh = this.moduleMesh(kind, side, idx, 1);
    this.scene.add(s.mesh);
    this.fx.puff(s.mesh.position.x, 10, s.mesh.position.z, 0xffe9a0, 8, 4);
    sfx.snap();
    return true;
  }
  upgrade(side: 0 | 1, idx: number): boolean {
    const s = this.slots[side][idx];
    if (this.over || !s.kind || s.lvl !== 1 || this.gold[side] < SLOT_INFO[s.kind].up) return false;
    this.gold[side] -= SLOT_INFO[s.kind].up;
    s.lvl = 2; s.spawnT = 0;
    if (s.kind === 'muralha') s.wallHp = WALL_HP * 2;
    if (s.mesh) this.scene.remove(s.mesh);
    s.mesh = this.moduleMesh(s.kind, side, idx, 2);
    this.scene.add(s.mesh);
    this.fx.sparks(s.mesh.position.x, 20, s.mesh.position.z, 0xffe9a0, 10);
    sfx.snap();
    return true;
  }
  private moduleMesh(kind: SlotKind, side: 0 | 1, idx: number, lvl: number): THREE.Group {
    const p = (side === 0 ? this.slotPos.mine : this.slotPos.foe)[idx];
    const g = new THREE.Group();
    g.position.copy(p);
    const team = side === 0 ? 0x5a9ae8 : 0xe8645a;
    const s = lvl === 2 ? 1.22 : 1;
    if (kind === 'torreta') {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(12 * s, 14 * s, 12, 14), plastic(0xb8b2a4, .4));
      b.position.y = 6;
      const fork = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 22 * s, 8), woodMat(0x8a5c30));
      fork.position.y = 12 + 10 * s;
      const l = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 14, 8), woodMat(0x8a5c30));
      l.position.set(0, 12 + 20 * s, -5); l.rotation.x = 0.5;
      const r = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 14, 8), woodMat(0x8a5c30));
      r.position.set(0, 12 + 20 * s, 5); r.rotation.x = -0.5;
      const elast = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 13, 6), plastic(0xe8645a, .5));
      elast.position.set(0, 12 + 24 * s, 0); elast.rotation.x = Math.PI / 2;
      g.add(b, fork, l, r, elast);
    } else if (kind === 'gerador') {
      const b = new THREE.Mesh(new THREE.BoxGeometry(20 * s, 16, 18 * s), plastic(team, .4));
      b.position.y = 8;
      const gear = new THREE.Mesh(new THREE.TorusGeometry(8 * s, 3, 8, 10), plastic(0xe8c86a, .3));
      gear.position.y = 16 + 6 * s; gear.name = 'gear';
      const ax = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 8, 8), plastic(0x8a8f98, .3));
      ax.position.y = 16 + 6 * s;
      g.add(b, gear, ax);
    } else {
      // muralha: pilha de bloquinhos atravessando a faixa
      for (let r = 0; r < (lvl === 2 ? 3 : 2); r++) {
        for (let i = 0; i < 3; i++) {
          const blk = new THREE.Mesh(new THREE.BoxGeometry(10, 12, 20), woodMat(r % 2 ? 0xc8a468 : 0xb8905a));
          blk.position.set(0, 6 + r * 12.4, (i - 1) * 20.6 + (r % 2 ? 5 : -5));
          blk.rotation.y = (Math.random() - 0.5) * 0.06;
          g.add(blk);
        }
      }
      g.name = 'wall';
    }
    g.add(blobShadow(16 * s, 13 * s, .3));
    g.traverse(o => { o.castShadow = true; o.receiveShadow = true; });
    g.userData.spawnT = 0;
    return g;
  }

  // ---------------- especiais ----------------
  canSpecial(side: 0 | 1): boolean { return !this.over && this.specCd[side] <= 0; }
  useSpecial(side: 0 | 1): boolean {
    if (!this.canSpecial(side)) return false;
    this.specCd[side] = SPECIAL_CD;
    const fac = this.faction[side];
    const foes = this.units.filter(u => u.side !== side && !u.dead);
    sfx.special();
    if (fac === 'robo') {                              // Ímã Gigante: puxa e atordoa
      for (const u of foes) {
        u.x += (u.side === 0 ? -1 : 1) * 80;
        u.stun = 2.2; animHit(u.anim);
        this.fx.sparks(u.x, 20, laneZ[u.lane], 0x54d8d8, 5);
      }
      this.onShake(0.5);
      this.toast(side === 0 ? '🧲 Ímã Gigante!' : '🧲 O inimigo usou o Ímã!', 'spec');
    } else {                                            // bolinhas / canhonada: chuva no campo inimigo
      const n = fac === 'pirata' ? 6 : 9;
      const kind = fac === 'pirata' ? 'bala' : 'gude';
      for (let i = 0; i < n; i++) {
        const tgt = foes.length ? foes[i % foes.length] : null;
        const lane = tgt ? tgt.lane : (i % 3);
        const tx = tgt ? tgt.x + (Math.random() - 0.5) * 40 : (side === 0 ? 1 : -1) * (60 + Math.random() * 180);
        this.dropProj(side, lane, tx, kind as Proj['kind'], fac === 'pirata' ? 46 : 30, fac === 'pirata' ? 46 : 34, 0.5 + i * 0.14);
      }
      this.toast(side === 0
        ? (fac === 'pirata' ? '💣 Canhonada!' : '🔮 Chuva de Bolinhas!')
        : '⚠️ Especial inimigo!', 'spec');
    }
    return true;
  }
  private dropProj(side: 0 | 1, lane: number, tx: number, kind: Proj['kind'], dmg: number, radius: number, delay: number): void {
    setTimeout(() => {
      if (this.over) return;
      const m = new THREE.Mesh(new THREE.SphereGeometry(kind === 'bala' ? 7 : 6, 14, 12),
        kind === 'bala' ? plastic(0x2c2c34, .3) : plastic([0x54d8d8, 0xe88fb0, 0xffd76a][(Math.random() * 3) | 0], .15));
      m.castShadow = true;
      this.scene.add(m);
      this.projs.push({ m, x: tx, y: 240, z: laneZ[lane] + (Math.random() - 0.5) * 30, vx: 0, vy: -10, side, lane, dmg, radius, t: 0, kind });
    }, delay * 1000 / this.speed);
  }

  // ---------------- evolução ----------------
  canEvolve(side: 0 | 1): boolean { return !this.evolved[side] && this.xp[side] >= XP_EVOLVE; }
  evolve(side: 0 | 1, fac: Faction): void {
    if (!this.canEvolve(side)) return;
    this.evolved[side] = true;
    this.faction[side] = fac;
    this.fx.confetti(side === 0 ? -baseX + 80 : baseX - 80, 0);
    this.onShake(0.35);
    sfx.fanfare();
  }

  // ---------------- helpers de consulta ----------------
  lanePower(side: 0 | 1, lane: number, half?: 'own' | 'their'): number {
    let p = 0;
    for (const u of this.units) {
      if (u.dead || u.side !== side || u.lane !== lane) continue;
      if (half === 'own' && (side === 0 ? u.x > 0 : u.x < 0)) continue;
      p += u.st.dmg / u.st.rate + u.hp * 0.06;
    }
    return p;
  }
  laneMajorityKind(side: 0 | 1, lane: number): UnitKind | null {
    const count: Partial<Record<UnitKind, number>> = {};
    for (const u of this.units) if (!u.dead && u.side === side && u.lane === lane) count[u.kind] = (count[u.kind] || 0) + 1;
    let best: UnitKind | null = null, bn = 0;
    for (const k of Object.keys(count) as UnitKind[]) if (count[k]! > bn) { bn = count[k]!; best = k; }
    return best;
  }

  // ---------------- update ----------------
  update(rawDt: number, camQ: THREE.Quaternion): void {
    const dt = rawDt * this.speed;
    if (!this.over) this.time += dt;
    // economia
    for (const s of [0, 1] as const) {
      if (this.over) break;
      let inc = INCOME * this.incomeMul[s];
      for (const sl of this.slots[s]) if (sl.kind === 'gerador') inc += GEN_RATE * sl.lvl;
      this.gold[s] += inc * dt;
      this.specCd[s] = Math.max(0, this.specCd[s] - dt);
      this.spawnCd[s] = Math.max(0, this.spawnCd[s] - dt);
    }
    // unidades
    for (const u of this.units) {
      if (u.dead) { updateAnim(u.anim, dt, camQ); continue; }
      u.cd = Math.max(0, u.cd - dt);
      u.stun = Math.max(0, u.stun - dt);
      const dir = u.side === 0 ? 1 : -1;
      const foeWall = this.wallInFront(u);
      const target = foeWall ? null : this.nearestFoe(u);
      const reach = u.st.range;
      if (u.stun > 0) { setMode(u.anim, 'idle'); }
      else if (foeWall != null) {                        // bate na muralha
        if (u.cd <= 0) this.strike(u, () => this.damageWall(u, foeWall));
      } else if (dir > 0 ? u.x >= HIT_BASE_X : u.x <= -HIT_BASE_X) {
        // CHEGOU NA BASE: martela a base e ignora defensor — vira corrida de dano
        if (u.cd <= 0) this.strike(u, () => this.damageBase(u));
      } else if (target && Math.abs(target.x - u.x) <= reach) {
        if (u.cd <= 0) this.strike(u, () => this.damageUnit(u, target));
      } else {
        // marcha (com respeito ao aliado da frente)
        const ahead = this.allyAhead(u);
        const maxX = ahead != null ? ahead - 26 * dir : dir * 1e9;
        const nx = u.x + dir * u.st.speed * dt;
        if (dir > 0 ? nx < maxX : nx > maxX) {
          u.x = nx; setMode(u.anim, 'walk');
          if (Math.random() < dt * 2.2) this.fx.dust(u.x - dir * 8, laneZ[u.lane]);
        } else setMode(u.anim, 'idle');
      }
      u.anim.rig.group.position.x = u.x;
      updateAnim(u.anim, dt, camQ);
    }
    // remove mortos concluídos
    for (let i = this.units.length - 1; i >= 0; i--) {
      const u = this.units[i];
      if (u.anim.gone) { this.scene.remove(u.anim.rig.group); this.units.splice(i, 1); }
    }
    // torretas
    for (const s of [0, 1] as const) {
      this.slots[s].forEach((sl, i) => {
        if (sl.mesh) {                                    // snap-in bounce + engrenagem girando
          sl.spawnT += dt;
          const k = Math.min(1, sl.spawnT / 0.4);
          sl.mesh.scale.setScalar(0.4 + 0.6 * (1 + Math.sin(Math.min(1, k) * Math.PI * 0.5) * 0.0) * k + (k < 1 ? Math.sin(k * Math.PI) * 0.18 : 0));
          const gear = sl.mesh.getObjectByName('gear');
          if (gear) gear.rotation.z += dt * 2.4;
        }
        if (sl.kind !== 'torreta') return;
        sl.cd -= dt;
        if (sl.cd > 0) return;
        const px = (s === 0 ? this.slotPos.mine : this.slotPos.foe)[i];
        let best: Unit | null = null, bd = TURRET.range * (sl.lvl === 2 ? 1.15 : 1);
        for (const u of this.units) {
          if (u.dead || u.side === s || u.lane !== i) continue;
          const d = Math.abs(u.x - px.x);
          if (d < bd) { bd = d; best = u; }
        }
        if (best) {
          sl.cd = TURRET.rate;
          this.shootArrow(s, i, px.x, best, TURRET.dmg * (sl.lvl === 2 ? 1.7 : 1));
          sfx.twang();
        }
      });
    }
    // projéteis
    for (let i = this.projs.length - 1; i >= 0; i--) {
      const p = this.projs[i]; p.t += dt;
      p.vy -= 300 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.m.position.set(p.x, p.y, p.z);
      if (p.kind === 'flecha') p.m.rotation.z = Math.atan2(p.vy, p.vx);
      if (p.y <= 6) {
        // impacto
        this.fx.puff(p.x, 4, p.z, p.kind === 'gude' ? 0xbfe8f5 : 0xd8c4a0, 6, 3);
        if (p.kind !== 'flecha') { this.fx.sparks(p.x, 8, p.z, 0xffd76a, 8); this.onShake(0.18); sfx.thud(); }
        for (const u of this.units) {
          if (u.dead || u.side === p.side || u.lane !== p.lane) continue;
          if (Math.abs(u.x - p.x) <= p.radius) this.applyDamage(u, p.dmg, p.side);
        }
        this.scene.remove(p.m);
        this.projs.splice(i, 1);
      }
    }
    // evento da GUDE GIGANTE
    this.marbleUpdate(dt);
  }

  private strike(u: Unit, apply: () => void): void {
    u.cd = u.st.rate;
    u.anim.onStrike = () => {
      apply();
      u.anim.onStrike = null;
    };
    setMode(u.anim, u.st.ranged ? 'shoot' : 'melee');
    u.anim.t = 0; u.anim.struck = false;
  }
  private nearestFoe(u: Unit): Unit | null {
    let best: Unit | null = null, bd = 1e9;
    for (const o of this.units) {
      if (o.dead || o.side === u.side || o.lane !== u.lane) continue;
      const d = (o.x - u.x) * (u.side === 0 ? 1 : -1);
      if (d > -12 && d < bd) { bd = d; best = o; }
    }
    return best;
  }
  private allyAhead(u: Unit): number | null {
    let best: number | null = null;
    for (const o of this.units) {
      if (o.dead || o === u || o.side !== u.side || o.lane !== u.lane) continue;
      const d = (o.x - u.x) * (u.side === 0 ? 1 : -1);
      if (d > 0 && d < 30 && (best == null || Math.abs(o.x - u.x) < Math.abs(best - u.x))) best = o.x;
    }
    return best;
  }
  private wallInFront(u: Unit): number | null {
    const foe = u.side === 0 ? 1 : 0;
    const sl = this.slots[foe][u.lane];
    if (!sl.kind || sl.kind !== 'muralha' || sl.wallHp <= 0) return null;
    const wx = (foe === 0 ? this.slotPos.mine : this.slotPos.foe)[u.lane].x;
    const d = (wx - u.x) * (u.side === 0 ? 1 : -1);
    return d > 0 && d <= u.st.range + 6 ? u.lane : null;
  }
  private damageWall(u: Unit, lane: number): void {
    const foe = u.side === 0 ? 1 : 0;
    const sl = this.slots[foe][lane];
    sl.wallHp -= u.st.dmg;
    if (sl.mesh) {
      this.fx.puff(sl.mesh.position.x, 16, sl.mesh.position.z, 0xc8a468, 4, 3);
      sl.mesh.rotation.y = (Math.random() - 0.5) * 0.05;
      sfx.tok();
      if (sl.wallHp <= 0) {
        this.fx.puff(sl.mesh.position.x, 14, sl.mesh.position.z, 0xc8a468, 14, 5);
        this.onShake(0.3); sfx.crumble();
        this.scene.remove(sl.mesh);
        sl.mesh = null; sl.kind = null; sl.lvl = 0;
      }
    }
  }
  private damageUnit(att: Unit, def: Unit): void {
    if (att.st.ranged) { this.shootArrow(att.side, att.lane, att.x, def, att.st.dmg * counter(att.kind, def.kind)); sfx.twang(); return; }
    this.applyDamage(def, att.st.dmg * counter(att.kind, def.kind), att.side);
    this.fx.hitStar((att.x + def.x) / 2, 26, laneZ[att.lane]);
    sfx[att.kind === 'tanque' ? 'thud' : 'tok']();
  }
  private shootArrow(side: 0 | 1, lane: number, fromX: number, target: Unit, dmg: number): void {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 14, 6), woodMat(0x9a6a3e));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4, 6), plastic(0xb8b2a4, .35));
    tip.position.y = 9; m.add(tip);
    m.rotation.z = -Math.PI / 2;
    this.scene.add(m);
    const dx = target.x - fromX;
    const T = Math.max(0.28, Math.abs(dx) / 260);
    const vx = dx / T;
    const vy = (18 - 34) / T + 0.5 * 300 * T;            // sai de ~34 e chega em ~18
    m.position.set(fromX, 34, laneZ[lane]);
    this.projs.push({ m, x: fromX, y: 34, z: laneZ[lane], vx, vy, side, lane, dmg, radius: 16, t: 0, kind: 'flecha' });
  }
  private applyDamage(u: Unit, dmg: number, from: 0 | 1): void {
    if (u.dead) return;
    u.hp -= dmg;
    animHit(u.anim);
    u.anim.rig.hp.root.visible = true;
    u.anim.rig.hp.fill.scale.x = Math.max(0.02, u.hp / u.st.hp);
    if (u.hp <= 0) {
      u.dead = true;
      animKill(u.anim);
      this.fx.puff(u.x, 12, laneZ[u.lane], 0xf5ecd8, 9, 4);
      this.fx.coins(u.x, 10, laneZ[u.lane], Math.min(6, 2 + u.st.reward / 8));
      sfx.boing();
      this.gold[from] += u.st.reward;
      this.xp[from] += u.st.xp;
    }
  }
  private damageBase(u: Unit): void {
    const foe = u.side === 0 ? 1 : 0;
    this.baseHp[foe] -= u.st.dmg * u.st.vsBase;
    this.fx.sparks(u.x + (u.side === 0 ? 30 : -30), 30, laneZ[u.lane], 0xffb84a, 5);
    this.onShake(0.12); sfx.thud();
    if (this.baseHp[foe] <= 0 && !this.over) {
      this.over = true; this.winner = u.side;
      this.fx.confetti(u.side === 0 ? baseX - 60 : -baseX + 60, 0);
      this.onShake(0.8);
      sfx.fanfare();
      this.onOver(this.winner);
    }
  }

  // ---------------- gude gigante ----------------
  private marbleUpdate(dt: number): void {
    const M = this.marble;
    if (this.over) return;
    if (M.state === 'idle') {
      M.next -= dt;
      if (M.next <= 0) {
        M.state = 'warn'; M.t = 0;
        M.lane = (Math.random() * 3) | 0;
        M.dir = Math.random() < 0.5 ? 1 : -1;
        // aviso: faixa pisca com uma sombra comprida
        const warn = new THREE.Mesh(new THREE.PlaneGeometry(WORLD.matHalfL * 2 - 60, 52),
          new THREE.MeshBasicMaterial({ color: 0xff5a4a, transparent: true, opacity: 0.0, depthWrite: false }));
        warn.rotation.x = -Math.PI / 2; warn.position.set(0, 1.2, laneZ[M.lane]);
        warn.renderOrder = 2;
        this.scene.add(warn);
        M.warn = warn;
        this.toast('🔴 GUDE GIGANTE vindo na faixa ' + (M.lane + 1) + '!', 'warn');
        sfx.rumble();
      }
    } else if (M.state === 'warn') {
      M.t += dt;
      if (M.warn) (M.warn.material as THREE.MeshBasicMaterial).opacity = 0.16 + Math.sin(M.t * 10) * 0.12;
      if (M.t > 2) {
        if (M.warn) { this.scene.remove(M.warn); M.warn = null; }
        M.state = 'roll'; M.t = 0;
        M.x = M.dir > 0 ? -WORLD.matHalfL - 40 : WORLD.matHalfL + 40;
        const glass = new THREE.MeshPhysicalMaterial({ color: 0x9adcf5, roughness: 0.05, transmission: 0.5, thickness: 6, clearcoat: 1 });
        const m = new THREE.Mesh(new THREE.SphereGeometry(24, 24, 18), glass);
        const swirl = new THREE.Mesh(new THREE.TorusGeometry(10, 4, 10, 22), plastic(0xe88fb0, .2));
        swirl.rotation.x = 1; m.add(swirl);
        m.castShadow = true;
        this.scene.add(m);
        M.m = m;
      }
    } else if (M.state === 'roll') {
      M.x += M.dir * 300 * dt;
      if (M.m) {
        M.m.position.set(M.x, 24, laneZ[M.lane]);
        M.m.rotation.z -= M.dir * dt * 300 / 24;
      }
      this.onShake(0.16);
      // o quarto perde a paciência: a gude machuca mais conforme a partida alonga
      const gudeDmg = 70 + Math.min(90, this.time * 0.35);
      for (const u of this.units) {
        if (u.dead || u.lane !== M.lane) continue;
        if (Math.abs(u.x - M.x) < 30) this.applyDamage(u, gudeDmg, u.side === 0 ? 1 : 0);
      }
      if (Math.abs(M.x) > WORLD.matHalfL + 60) {
        if (M.m) this.scene.remove(M.m);
        M.m = null; M.state = 'idle';
        M.next = Math.max(22, 48 - this.time * 0.08) + Math.random() * 18;   // e vem mais rápido
      }
    }
  }
}
