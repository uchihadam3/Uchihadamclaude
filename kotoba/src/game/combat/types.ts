/* ============================================================
   KOTOBA — modelo de combate (puro, testável, sem Phaser)
   ============================================================ */

export type Element = 'fire' | 'water' | 'wind' | 'wood' | 'light' | 'dark';
export type CardCategory = 'attack' | 'defense' | 'tech' | 'power' | 'spirit';
export type Rarity = 'comum' | 'incomum' | 'raro' | 'especial';
export type Targeting = 'enemy' | 'self' | 'all-enemies' | 'none';

/** avaliação abstrata vinda do sistema de aprendizado (o combate decide o efeito) */
export type MasteryResult = 'none' | 'failed' | 'partial' | 'correct' | 'fluent';

/** efeitos reutilizáveis (composição, nunca uma classe por carta) */
export type EffectKind =
  | 'DealDamage' | 'GainBlock' | 'DrawCards' | 'GainEnergy'
  | 'ApplyStatus' | 'Heal' | 'LoseHp' | 'AddTempCard'
  | 'ExhaustHand' | 'DoubleBlock' | 'GainStrength';

export interface EffectSpec {
  kind: EffectKind;
  value?: number;
  times?: number;
  status?: StatusId;
  target?: Targeting;      // sobrescreve o alvo padrão da carta
  toSelf?: boolean;
}

export type StatusId =
  | 'burn'        // 火 queimadura — dano no fim do turno, decai
  | 'poison'      // 毒 veneno — dano no fim do turno, decai 1
  | 'strength'    // 力 força — +dano por ataque
  | 'weak'        // 弱 fraqueza — ataques causam 25% menos
  | 'vulnerable'  // 破 vulnerável — recebe 50% mais dano
  | 'regen'       // 癒 regeneração — cura no fim do turno, decai
  | 'focus'       // 心 foco — +bloqueio de cartas de defesa
  | 'thorns';     // 棘 espinhos — reflete dano ao atacante

export interface StatusDef {
  id: StatusId; jp: string; reading: string; name: string; kind: 'buff' | 'debuff';
  desc: string;
}

export interface Combatant {
  id: string;
  name: string;
  jp?: string;
  hp: number;
  maxHp: number;
  block: number;
  statuses: Partial<Record<StatusId, number>>;
  isPlayer: boolean;
}

/** intenção do inimigo mostrada ao jogador antes do turno dele */
export type IntentKind = 'atk' | 'def' | 'buff' | 'debuff' | 'special';
export interface Intent {
  kind: IntentKind;
  jp: string;           // 攻 / 守 / 毒 ...
  reading: string;
  label: string;        // "Ataque", "Defesa"...
  amount?: number;      // dano/bloqueio previsto (já com modificadores)
  hits?: number;
}

export interface CardDef {
  id: string;
  name: string;
  jp: string;
  reading: string;
  meaning: string;
  cat: CardCategory;
  rarity: Rarity;
  cost: number;
  element?: Element;
  targeting: Targeting;
  tags: string[];
  archetype?: string;
  contentId?: string;          // conteúdo japonês vinculado (bônus de domínio)
  effects: EffectSpec[];       // sempre executam
  bonusEffects?: EffectSpec[]; // executam com reconhecimento correto
  exhaust?: boolean;
  retain?: boolean;
  desc: string;                // texto do efeito base (com <b>, <span class=kw>)
  bonusDesc?: string;          // texto do bônus de domínio
  upgrade?: Partial<Pick<CardDef, 'name' | 'cost' | 'effects' | 'bonusEffects' | 'desc' | 'bonusDesc' | 'exhaust'>>;
}

/** instância de carta no baralho do jogador */
export interface CardInstance {
  uid: string;
  defId: string;
  upgraded: boolean;
}

export interface CombatSnapshot {
  turn: number;
  energy: number;
  maxEnergy: number;
  player: Combatant;
  enemies: Combatant[];
  hand: CardInstance[];
  drawCount: number;
  discardCount: number;
  exhaustCount: number;
  phase: CombatPhase;
}

export type CombatPhase = 'player' | 'enemy' | 'won' | 'lost';
