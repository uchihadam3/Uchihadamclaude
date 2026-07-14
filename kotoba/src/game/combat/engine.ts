/* ============================================================
   KOTOBA — CombatEngine: turnos determinísticos, orientado a
   dados, emite eventos para a camada visual (Phaser/HTML).
   Não conhece nada de repetição espaçada — só recebe um
   MasteryResult abstrato e decide o efeito.
   ============================================================ */
import type {
  CardDef, CardInstance, Combatant, CombatPhase, CombatSnapshot,
  EffectSpec, Intent, MasteryResult, StatusId, Targeting,
} from './types';

export interface EnemyDef {
  id: string; name: string; jp: string; reading: string; maxHp: number;
  body: string;                    // chave da arte
  pattern: EnemyMove[];            // ciclo de intenções
}
export interface EnemyMove {
  kind: Intent['kind']; jp: string; reading: string; label: string;
  damage?: number; hits?: number; block?: number;
  status?: StatusId; statusAmt?: number; statusToSelf?: boolean;
}

export type CombatEvent =
  | { t: 'turnStart'; turn: number }
  | { t: 'enemyTurn' }
  | { t: 'cardPlayed'; uid: string; def: CardDef; mastery: MasteryResult }
  | { t: 'damage'; targetId: string; amount: number; blocked: number }
  | { t: 'block'; targetId: string; amount: number }
  | { t: 'heal'; targetId: string; amount: number }
  | { t: 'status'; targetId: string; status: StatusId; amount: number }
  | { t: 'draw'; count: number }
  | { t: 'enemyAct'; enemyId: string; move: EnemyMove }
  | { t: 'combo'; label: string }
  | { t: 'shuffle' }
  | { t: 'win' } | { t: 'lose' };

export interface EngineDeps {
  getCardDef: (defId: string) => CardDef;
  rng?: () => number;
}

const HAND_SIZE = 5;
const BASE_ENERGY = 3;

export class CombatEngine {
  player: Combatant;
  enemies: Combatant[] = [];
  private enemyDefs = new Map<string, EnemyDef>();
  private enemyStep = new Map<string, number>();
  private enemyIntent = new Map<string, Intent>();

  drawPile: CardInstance[] = [];
  hand: CardInstance[] = [];
  discardPile: CardInstance[] = [];
  exhaustPile: CardInstance[] = [];

  energy = BASE_ENERGY;
  maxEnergy = BASE_ENERGY;
  turn = 0;
  phase: CombatPhase = 'player';
  cardsPlayedThisTurn = 0;

  private listeners: ((e: CombatEvent) => void)[] = [];
  private rng: () => number;

  constructor(private deps: EngineDeps) {
    this.rng = deps.rng ?? Math.random;
    this.player = { id: 'player', name: 'Portador dos Ecos', hp: 60, maxHp: 60, block: 0, statuses: {}, isPlayer: true };
  }

  on(fn: (e: CombatEvent) => void): void { this.listeners.push(fn); }
  private emit(e: CombatEvent): void { for (const l of this.listeners) l(e); }

  /* ---------------- setup ---------------- */
  start(deck: CardInstance[], player: Combatant, enemies: EnemyDef[]): void {
    this.player = player;
    this.enemies = enemies.map((e) => ({
      id: e.id, name: e.name, jp: e.jp, hp: e.maxHp, maxHp: e.maxHp, block: 0, statuses: {}, isPlayer: false,
    }));
    enemies.forEach((e) => { this.enemyDefs.set(e.id, e); this.enemyStep.set(e.id, 0); });
    this.drawPile = this.shuffle([...deck]);
    this.hand = []; this.discardPile = []; this.exhaustPile = [];
    this.turn = 0; this.phase = 'player';
    this.rollEnemyIntents();
    this.startPlayerTurn();
  }

  /* ---------------- turno do jogador ---------------- */
  private startPlayerTurn(): void {
    this.turn++;
    this.phase = 'player';
    this.player.block = 0;
    this.cardsPlayedThisTurn = 0;
    this.tickStartStatuses(this.player);
    this.energy = this.maxEnergy;
    this.draw(HAND_SIZE);
    this.emit({ t: 'turnStart', turn: this.turn });
  }

  draw(n: number): void {
    let drawn = 0;
    for (let i = 0; i < n; i++) {
      if (this.drawPile.length === 0) {
        if (this.discardPile.length === 0) break;
        this.drawPile = this.shuffle(this.discardPile);
        this.discardPile = [];
        this.emit({ t: 'shuffle' });
      }
      const c = this.drawPile.shift();
      if (c) { this.hand.push(c); drawn++; }
    }
    if (drawn > 0) this.emit({ t: 'draw', count: drawn });
  }

  canPlay(uid: string): boolean {
    const c = this.hand.find((h) => h.uid === uid);
    if (!c || this.phase !== 'player') return false;
    return this.energy >= this.deps.getCardDef(c.defId).cost;
  }

  /** joga uma carta. masteryResult vem do learning engine (ou 'none' se a carta não tem desafio). */
  playCard(uid: string, mastery: MasteryResult = 'none', targetId?: string): boolean {
    const idx = this.hand.findIndex((h) => h.uid === uid);
    if (idx < 0 || this.phase !== 'player') return false;
    const inst = this.hand[idx];
    const def = this.deps.getCardDef(inst.defId);
    const cost = inst.upgraded && def.upgrade?.cost != null ? def.upgrade.cost : def.cost;
    if (this.energy < cost) return false;

    this.energy -= cost;
    this.hand.splice(idx, 1);
    this.cardsPlayedThisTurn++;
    this.emit({ t: 'cardPlayed', uid, def, mastery });

    const target = this.resolveTarget(def.targeting, targetId);
    const baseEffects = inst.upgraded && def.upgrade?.effects ? def.upgrade.effects : def.effects;
    for (const spec of baseEffects) this.applyEffect(spec, this.player, target, def);

    // bônus de domínio: só quando o reconhecimento foi bom o suficiente
    if (mastery === 'correct' || mastery === 'fluent') {
      const bonus = inst.upgraded && def.upgrade?.bonusEffects ? def.upgrade.bonusEffects : def.bonusEffects;
      if (bonus) for (const spec of bonus) this.applyEffect(spec, this.player, target, def);
    }

    // combos elementais: 2+ cartas do mesmo elemento no turno
    if (def.element && (mastery === 'fluent')) this.emit({ t: 'combo', label: 'RESSONÂNCIA' });

    const exhaust = inst.upgraded && def.upgrade?.exhaust != null ? def.upgrade.exhaust : def.exhaust;
    if (exhaust) this.exhaustPile.push(inst); else this.discardPile.push(inst);

    this.checkDeaths();
    return true;
  }

  /** aplica o bônus de domínio APÓS o reconhecimento (a UI chama no acerto).
      A base já resolveu em playCard(mastery='none'), então o combate não trava. */
  applyCardBonus(def: CardDef, upgraded: boolean, targetId?: string): void {
    const bonus = upgraded && def.upgrade?.bonusEffects ? def.upgrade.bonusEffects : def.bonusEffects;
    if (!bonus) return;
    const target = this.resolveTarget(def.targeting, targetId);
    for (const spec of bonus) this.applyEffect(spec, this.player, target, def);
    this.checkDeaths();
  }

  private resolveTarget(targeting: Targeting, targetId?: string): Combatant {
    if (targeting === 'self' || targeting === 'none') return this.player;
    if (targetId) { const e = this.enemies.find((x) => x.id === targetId && x.hp > 0); if (e) return e; }
    return this.enemies.find((x) => x.hp > 0) ?? this.player;
  }

  /* ---------------- efeitos componíveis ---------------- */
  private applyEffect(spec: EffectSpec, source: Combatant, target: Combatant, def: CardDef): void {
    const times = spec.times ?? 1;
    const dst = spec.toSelf ? source : (spec.target ? this.resolveTarget(spec.target) : target);
    switch (spec.kind) {
      case 'DealDamage':
        for (let i = 0; i < times; i++) this.dealDamage(source, dst, spec.value ?? 0, def.cat === 'attack');
        break;
      case 'GainBlock':
        this.gainBlock(source, (spec.value ?? 0) + (def.cat === 'defense' ? (source.statuses.focus ?? 0) : 0));
        break;
      case 'DoubleBlock': source.block *= 2; this.emit({ t: 'block', targetId: source.id, amount: source.block }); break;
      case 'DrawCards': this.draw(spec.value ?? 1); break;
      case 'GainEnergy': this.energy += spec.value ?? 1; break;
      case 'Heal': this.heal(dst, spec.value ?? 0); break;
      case 'LoseHp': dst.hp = Math.max(0, dst.hp - (spec.value ?? 0)); break;
      case 'GainStrength': this.addStatus(source, 'strength', spec.value ?? 1); break;
      case 'ApplyStatus': if (spec.status) this.addStatus(dst, spec.status, spec.value ?? 1); break;
      case 'ExhaustHand':
        while (this.hand.length) this.exhaustPile.push(this.hand.pop()!);
        break;
      case 'AddTempCard': break; // reservado p/ chefes (Ato 2)
    }
  }

  dealDamage(source: Combatant, target: Combatant, base: number, isAttack: boolean): void {
    let dmg = base;
    if (isAttack) {
      dmg += source.statuses.strength ?? 0;
      if (source.statuses.weak) dmg = Math.floor(dmg * 0.75);
    }
    if (target.statuses.vulnerable) dmg = Math.floor(dmg * 1.5);
    dmg = Math.max(0, dmg);
    const blocked = Math.min(target.block, dmg);
    target.block -= blocked;
    const dealt = dmg - blocked;
    target.hp = Math.max(0, target.hp - dealt);
    this.emit({ t: 'damage', targetId: target.id, amount: dealt, blocked });
    // espinhos: reflete ao atacante
    if (isAttack && target.statuses.thorns && source !== target) {
      const th = target.statuses.thorns;
      source.hp = Math.max(0, source.hp - th);
      this.emit({ t: 'damage', targetId: source.id, amount: th, blocked: 0 });
    }
  }

  gainBlock(c: Combatant, amt: number): void {
    if (amt <= 0) return;
    c.block += amt;
    this.emit({ t: 'block', targetId: c.id, amount: amt });
  }
  heal(c: Combatant, amt: number): void {
    if (amt <= 0) return;
    c.hp = Math.min(c.maxHp, c.hp + amt);
    this.emit({ t: 'heal', targetId: c.id, amount: amt });
  }
  addStatus(c: Combatant, id: StatusId, amt: number): void {
    c.statuses[id] = (c.statuses[id] ?? 0) + amt;
    if ((c.statuses[id] ?? 0) <= 0) delete c.statuses[id];
    this.emit({ t: 'status', targetId: c.id, status: id, amount: amt });
  }

  /* status no início do turno de quem age (regen), e no fim (burn/poison) */
  private tickStartStatuses(c: Combatant): void {
    if (c.statuses.regen) { this.heal(c, c.statuses.regen); this.decay(c, 'regen'); }
  }
  private tickEndStatuses(c: Combatant): void {
    if (c.statuses.burn) { this.dealDamage(c, c, c.statuses.burn, false); this.decay(c, 'burn'); }
    if (c.statuses.poison) { this.dealDamage(c, c, c.statuses.poison, false); this.decay(c, 'poison'); }
  }
  private decay(c: Combatant, id: StatusId): void {
    const v = (c.statuses[id] ?? 0) - 1;
    if (v <= 0) delete c.statuses[id]; else c.statuses[id] = v;
  }

  /* ---------------- fim de turno / inimigos ---------------- */
  endTurn(): void {
    if (this.phase !== 'player') return;
    this.phase = 'enemy';
    while (this.hand.length) this.discardPile.push(this.hand.pop()!);
    this.tickEndStatuses(this.player);
    if (this.player.hp <= 0) { this.phase = 'lost'; this.emit({ t: 'lose' }); return; }
    this.emit({ t: 'enemyTurn' });
  }

  /** executa a ação de UM inimigo (a UI chama em sequência com pausa entre eles) */
  runEnemy(enemyId: string): void {
    const e = this.enemies.find((x) => x.id === enemyId);
    const intent = this.enemyIntent.get(enemyId);
    if (!e || e.hp <= 0 || !intent) return;
    e.block = 0;
    const def = this.enemyDefs.get(enemyId)!;
    const move = def.pattern[this.enemyStep.get(enemyId)! % def.pattern.length];
    this.emit({ t: 'enemyAct', enemyId, move });
    if (move.damage) {
      const hits = move.hits ?? 1;
      for (let i = 0; i < hits; i++) this.dealDamage(e, this.player, move.damage, true);
    }
    if (move.block) this.gainBlock(e, move.block);
    if (move.status) this.addStatus(move.statusToSelf ? e : this.player, move.status, move.statusAmt ?? 1);
    this.tickEndStatuses(e);
    this.enemyStep.set(enemyId, (this.enemyStep.get(enemyId)! + 1));
    this.checkDeaths();
  }

  /** encerra a fase inimiga e devolve ao jogador (a UI chama após rodar todos os inimigos) */
  finishEnemyPhase(): void {
    if (this.player.hp <= 0) { this.phase = 'lost'; this.emit({ t: 'lose' }); return; }
    if (this.enemies.every((e) => e.hp <= 0)) { this.phase = 'won'; this.emit({ t: 'win' }); return; }
    this.rollEnemyIntents();
    this.startPlayerTurn();
  }

  private rollEnemyIntents(): void {
    for (const e of this.enemies) {
      if (e.hp <= 0) { this.enemyIntent.delete(e.id); continue; }
      const def = this.enemyDefs.get(e.id)!;
      const move = def.pattern[this.enemyStep.get(e.id)! % def.pattern.length];
      let amount = move.damage;
      if (amount != null) {
        amount += e.statuses.strength ?? 0;
        if (e.statuses.weak) amount = Math.floor(amount * 0.75);
        if (this.player.statuses.vulnerable) amount = Math.floor(amount * 1.5);
      } else if (move.block != null) amount = move.block;
      this.enemyIntent.set(e.id, {
        kind: move.kind, jp: move.jp, reading: move.reading, label: move.label,
        amount, hits: move.hits,
      });
    }
  }
  intentOf(enemyId: string): Intent | undefined { return this.enemyIntent.get(enemyId); }

  private checkDeaths(): void {
    if (this.player.hp <= 0 && this.phase === 'player') { /* resolve no fim do turno */ }
    if (this.enemies.every((e) => e.hp <= 0) && this.phase === 'player') { this.phase = 'won'; this.emit({ t: 'win' }); }
  }

  /* ---------------- utilidades ---------------- */
  private shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  snapshot(): CombatSnapshot {
    return {
      turn: this.turn, energy: this.energy, maxEnergy: this.maxEnergy,
      player: this.player, enemies: this.enemies, hand: this.hand,
      drawCount: this.drawPile.length, discardCount: this.discardPile.length,
      exhaustCount: this.exhaustPile.length, phase: this.phase,
    };
  }
}
