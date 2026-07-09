// ---------------------------------------------------------------------------
// UNIDADES — números de balanceamento por classe, era e facção.
// Triângulo de counters: ESPADA vence ARCO · ARCO vence TANQUE · TANQUE vence
// ESPADA (x1.5 de dano). VELOZ é neutro: o papel dele é furar linha e punir
// atiradores desprotegidos com velocidade.
// ---------------------------------------------------------------------------
import { UnitKind, Faction } from './toy';

export interface UnitStats {
  kind: UnitKind;
  cost: number; hp: number; dmg: number; rate: number;   // s entre golpes
  speed: number; range: number; ranged: boolean;
  reward: number; xp: number;                             // o que o ASSASSINO ganha
  vsBase: number;                                         // multiplicador contra base
  train: number;                                          // s até poder treinar OUTRO bonequinho
}

const BASE: Record<UnitKind, UnitStats> = {
  espada: { kind: 'espada', cost: 12, hp: 54, dmg: 10, rate: 0.9, speed: 34, range: 30, ranged: false, reward: 8, xp: 6, vsBase: 1, train: 1.2 },
  arco: { kind: 'arco', cost: 20, hp: 34, dmg: 8, rate: 1.2, speed: 30, range: 150, ranged: true, reward: 12, xp: 8, vsBase: 0.7, train: 1.5 },
  tanque: { kind: 'tanque', cost: 42, hp: 175, dmg: 22, rate: 1.55, speed: 19, range: 34, ranged: false, reward: 26, xp: 16, vsBase: 1.6, train: 2.8 },
  veloz: { kind: 'veloz', cost: 26, hp: 42, dmg: 12, rate: 0.85, speed: 64, range: 28, ranged: false, reward: 16, xp: 10, vsBase: 1.1, train: 1.4 },
};

// era 2 multiplica tudo; cada facção tem tempero próprio
const ERA2 = { hp: 1.9, dmg: 1.9, cost: 2.1, reward: 1.8, xp: 1.6 };
const FLAVOR: Record<Faction, { hp: number; dmg: number }> = {
  madeira: { hp: 1, dmg: 1 },
  pirata: { hp: 0.92, dmg: 1.18 },     // porrada
  robo: { hp: 1.2, dmg: 0.92 },        // aguenta
};

export function statsOf(kind: UnitKind, faction: Faction): UnitStats {
  const b = BASE[kind]; const f = FLAVOR[faction];
  if (faction === 'madeira') return { ...b };
  return {
    ...b,
    hp: Math.round(b.hp * ERA2.hp * f.hp), dmg: Math.round(b.dmg * ERA2.dmg * f.dmg),
    cost: Math.round(b.cost * ERA2.cost), reward: Math.round(b.reward * ERA2.reward),
    xp: Math.round(b.xp * ERA2.xp),
  };
}

// x1.5 quando a classe "come" a outra
export function counter(att: UnitKind, def: UnitKind): number {
  if (att === 'espada' && def === 'arco') return 1.5;
  if (att === 'arco' && def === 'tanque') return 1.5;
  if (att === 'tanque' && def === 'espada') return 1.5;
  return 1;
}

export const UNIT_INFO: Record<UnitKind, { name: string; ico: string; tip: string }> = {
  espada: { name: 'Espadinha', ico: '⚔️', tip: 'vence Arqueiro' },
  arco: { name: 'Arqueirinho', ico: '🏹', tip: 'vence Tanque' },
  tanque: { name: 'Tanquinho', ico: '🛡️', tip: 'vence Espadinha' },
  veloz: { name: 'Corredor', ico: '🐎', tip: 'rápido, fura linha' },
};
export const FACTION_INFO: Record<Faction, { name: string; desc: string }> = {
  madeira: { name: 'Madeirinhas', desc: 'os bonequinhos de madeira do baú' },
  pirata: { name: 'Piratas de Plástico', desc: 'dano bruto e canhonadas — abordar!' },
  robo: { name: 'Robôs de Corda', desc: 'latinhas resistentes e o Ímã Gigante' },
};

export const XP_EVOLVE = 150;            // XP pra abrir a evolução de era
export const BASE_HP = 450;
export const INCOME = 3.1;               // ouro passivo por segundo
export const START_GOLD = 35;

// módulos da base (um slot por faixa)
export type SlotKind = 'torreta' | 'gerador' | 'muralha';
export const SLOT_INFO: Record<SlotKind, { name: string; ico: string; cost: number; up: number; tip: string }> = {
  torreta: { name: 'Torreta', ico: '🎯', cost: 55, up: 70, tip: 'atira na faixa' },
  gerador: { name: 'Gerador', ico: '⚙️', cost: 50, up: 65, tip: '+1.3 ouro/s' },
  muralha: { name: 'Muralha', ico: '🧱', cost: 40, up: 55, tip: 'bloqueia a faixa' },
};
export const TURRET = { range: 200, dmg: 9, rate: 1.25 };   // lvl2 ×1.7
export const GEN_RATE = 1.3;
export const WALL_HP = 240;

export const SPECIAL_CD = 48;
export const SPECIAL_INFO: Record<Faction, { name: string; ico: string; desc: string }> = {
  madeira: { name: 'Chuva de Bolinhas', ico: '🔮', desc: 'bolinhas de gude caem no campo inimigo' },
  pirata: { name: 'Canhonada', ico: '💣', desc: 'balas de canhão varrem os invasores' },
  robo: { name: 'Ímã Gigante', ico: '🧲', desc: 'puxa os inimigos pra trás e atordoa' },
};
