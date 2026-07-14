import { describe, it, expect } from 'vitest';
import { CombatEngine, type EnemyDef } from '../src/game/combat/engine';
import type { CardDef, CardInstance, Combatant } from '../src/game/combat/types';

/* mini conjunto de cartas de teste (não depende dos dados do jogo) */
const DEFS: Record<string, CardDef> = {
  hit: { id: 'hit', name: 'Hit', jp: '一', reading: '', meaning: '', cat: 'attack', rarity: 'comum', cost: 1, targeting: 'enemy', tags: [], effects: [{ kind: 'DealDamage', value: 6 }], desc: '' },
  guard: { id: 'guard', name: 'Guard', jp: '守', reading: '', meaning: '', cat: 'defense', rarity: 'comum', cost: 1, targeting: 'self', tags: [], effects: [{ kind: 'GainBlock', value: 5 }], desc: '' },
  bonus: { id: 'bonus', name: 'Bonus', jp: '火', reading: '', meaning: '', cat: 'attack', rarity: 'comum', cost: 1, targeting: 'enemy', tags: [], contentId: 'x', effects: [{ kind: 'DealDamage', value: 7 }], bonusEffects: [{ kind: 'DealDamage', value: 4 }], desc: '' },
  draw2: { id: 'draw2', name: 'Draw', jp: '見', reading: '', meaning: '', cat: 'tech', rarity: 'comum', cost: 0, targeting: 'none', tags: [], effects: [{ kind: 'DrawCards', value: 2 }], desc: '' },
};
const inst = (id: string): CardInstance => ({ uid: id + Math.random(), defId: id, upgraded: false });
const player = (): Combatant => ({ id: 'player', name: 'P', hp: 50, maxHp: 50, block: 0, statuses: {}, isPlayer: true });
const enemy: EnemyDef = { id: 'e', name: 'E', jp: '敵', reading: '', maxHp: 30, body: 'faminto', pattern: [{ kind: 'atk', jp: '攻', reading: '', label: 'A', damage: 8 }, { kind: 'def', jp: '守', reading: '', label: 'D', block: 6 }] };
const mk = () => new CombatEngine({ getCardDef: (id) => DEFS[id], rng: () => 0.5 });

describe('CombatEngine — fundamentos', () => {
  it('compra 5 cartas e energia 3 no início', () => {
    const e = mk();
    e.start([inst('hit'), inst('hit'), inst('guard'), inst('draw2'), inst('hit'), inst('guard')], player(), [enemy]);
    expect(e.hand.length).toBe(5);
    expect(e.energy).toBe(3);
    expect(e.enemies[0].hp).toBe(30);
  });

  it('dano reduz vida do inimigo e gasta energia', () => {
    const e = mk();
    const deck = [inst('hit'), inst('hit'), inst('hit'), inst('hit'), inst('hit')];
    e.start(deck, player(), [enemy]);
    const uid = e.hand[0].uid;
    e.playCard(uid, 'none', 'e');
    expect(e.enemies[0].hp).toBe(24);
    expect(e.energy).toBe(2);
    expect(e.hand.length).toBe(4);
  });

  it('bloqueio absorve o ataque inimigo', () => {
    const e = mk();
    e.start([inst('guard'), inst('guard'), inst('hit'), inst('hit'), inst('hit')], player(), [enemy]);
    const g = e.hand.find((h) => h.defId === 'guard')!;
    e.playCard(g.uid, 'none');
    expect(e.player.block).toBe(5);
    e.endTurn();
    e.runEnemy('e');           // inimigo ataca 8 → 5 bloqueio absorve, 3 passam
    expect(e.player.hp).toBe(47);
    expect(e.player.block).toBe(0);
  });

  it('bônus de domínio só aplica com reconhecimento correto', () => {
    const e1 = mk();
    e1.start([inst('bonus'), inst('hit'), inst('hit'), inst('hit'), inst('hit')], player(), [enemy]);
    const b1 = e1.hand.find((h) => h.defId === 'bonus')!;
    e1.playCard(b1.uid, 'none', 'e');       // sem reconhecimento → só base 7
    expect(e1.enemies[0].hp).toBe(23);

    const e2 = mk();
    e2.start([inst('bonus'), inst('hit'), inst('hit'), inst('hit'), inst('hit')], player(), [enemy]);
    const b2 = e2.hand.find((h) => h.defId === 'bonus')!;
    e2.playCard(b2.uid, 'correct', 'e');    // reconhecimento → 7 + 4 = 11
    expect(e2.enemies[0].hp).toBe(19);
  });

  it('vence quando o inimigo chega a 0', () => {
    const weak: EnemyDef = { ...enemy, id: 'e', maxHp: 6 };
    const e = mk();
    e.start([inst('hit'), inst('hit'), inst('hit'), inst('hit'), inst('hit')], player(), [weak]);
    let won = false; e.on((ev) => { if (ev.t === 'win') won = true; });
    e.playCard(e.hand[0].uid, 'none', 'e');
    expect(won).toBe(true);
    expect(e.snapshot().phase).toBe('won');
  });

  it('compra cartas do baralho (draw2 puxa 2)', () => {
    const e = mk();
    // baralho com folga: 5 na mão + 3 sobrando pra comprar
    e.start([inst('draw2'), inst('hit'), inst('hit'), inst('hit'), inst('guard'), inst('hit'), inst('guard'), inst('hit')], player(), [enemy]);
    const d = e.hand.find((h) => h.defId === 'draw2')!;
    const before = e.hand.length;      // 5
    e.playCard(d.uid, 'none');          // -1 (jogada) +2 (compra) = 6
    expect(e.hand.length).toBe(before + 1);
  });
});
