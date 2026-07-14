import type { EnemyDef } from '../../game/combat/engine';

/* Inimigos com padrões telegrafados (nunca só "ataca/defende").
   Cada intenção carrega um símbolo japonês. */
export const ENEMIES: Record<string, EnemyDef> = {
  faminto: {
    id: 'faminto', name: 'Espírito Faminto', jp: '飢', reading: 'ue', maxHp: 30, body: 'faminto',
    pattern: [
      { kind: 'atk', jp: '攻', reading: 'kō', label: 'Ataque', damage: 7 },
      { kind: 'debuff', jp: '弱', reading: 'jaku', label: 'Enfraquece', status: 'weak', statusAmt: 1 },
      { kind: 'atk', jp: '攻', reading: 'kō', label: 'Ataque', damage: 5, hits: 2 },
    ],
  },
  palha: {
    id: 'palha', name: 'Boneca de Palha', jp: '藁', reading: 'wara', maxHp: 26, body: 'palha',
    pattern: [
      { kind: 'def', jp: '守', reading: 'mamoru', label: 'Defende', block: 8 },
      { kind: 'atk', jp: '攻', reading: 'kō', label: 'Ataque', damage: 9 },
      { kind: 'special', jp: '毒', reading: 'doku', label: 'Envenena', status: 'poison', statusAmt: 3 },
    ],
  },
  musgo: {
    id: 'musgo', name: 'Guardião de Musgo', jp: '苔', reading: 'koke', maxHp: 62, body: 'musgo',
    pattern: [
      { kind: 'buff', jp: '力', reading: 'chikara', label: 'Fortalece', status: 'strength', statusAmt: 2, statusToSelf: true },
      { kind: 'atk', jp: '攻', reading: 'kō', label: 'Ataque', damage: 10 },
      { kind: 'def', jp: '守', reading: 'mamoru', label: 'Defende', block: 12 },
      { kind: 'atk', jp: '大', reading: 'dai', label: 'Golpe Pesado', damage: 16 },
    ],
  },
};

/** encontros da demo (Ato 1) */
export const ENCOUNTERS: Record<string, string[]> = {
  comum1: ['faminto'],
  comum2: ['palha'],
  duplo: ['faminto', 'palha'],
  elite: ['musgo'],
};
