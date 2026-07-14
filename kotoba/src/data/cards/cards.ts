import type { CardDef } from '../../game/combat/types';

/* Cartas (Ecos) orientadas a dados — composição de efeitos, nunca
   uma classe por carta. bonusEffects só disparam com reconhecimento
   correto do símbolo (a carta SEMPRE funciona sem isso). */
export const CARDS: CardDef[] = [
  // ---------------- ATAQUES ----------------
  {
    id: 'corte-veloz', name: 'Corte Veloz', jp: '速', reading: 'haya', meaning: 'rápido',
    cat: 'attack', rarity: 'comum', cost: 1, targeting: 'enemy', tags: ['ataque'], archetype: 'lamina',
    contentId: 'k-fast', effects: [{ kind: 'DealDamage', value: 6 }],
    desc: 'Causa <b>6</b> de dano.',
    upgrade: { name: 'Corte Veloz+', effects: [{ kind: 'DealDamage', value: 9 }], desc: 'Causa <b>9</b> de dano.' },
  },
  {
    id: 'chama-crescente', name: 'Chama Crescente', jp: '火', reading: 'ka', meaning: 'fogo',
    cat: 'attack', rarity: 'comum', cost: 1, element: 'fire', targeting: 'enemy', tags: ['ataque', 'fogo'], archetype: 'elementos',
    contentId: 'k-fire', effects: [{ kind: 'DealDamage', value: 7 }],
    bonusEffects: [{ kind: 'DealDamage', value: 4 }, { kind: 'ApplyStatus', status: 'burn', value: 2 }],
    desc: 'Causa <b>7</b> de dano.', bonusDesc: 'Domínio: <b>+4</b> de dano e <span class="kw">Queimadura 2</span>.',
    upgrade: { name: 'Chama Crescente+', effects: [{ kind: 'DealDamage', value: 9 }], bonusEffects: [{ kind: 'DealDamage', value: 5 }, { kind: 'ApplyStatus', status: 'burn', value: 3 }], desc: 'Causa <b>9</b> de dano.', bonusDesc: 'Domínio: <b>+5</b> de dano e <span class="kw">Queimadura 3</span>.' },
  },
  {
    id: 'lamina-agua', name: "Lâmina d'Água", jp: '水', reading: 'mizu', meaning: 'água',
    cat: 'attack', rarity: 'comum', cost: 1, element: 'water', targeting: 'enemy', tags: ['ataque', 'agua'], archetype: 'elementos',
    contentId: 'k-water', effects: [{ kind: 'DealDamage', value: 5 }],
    bonusEffects: [{ kind: 'ApplyStatus', status: 'weak', value: 2 }],
    desc: 'Causa <b>5</b> de dano.', bonusDesc: 'Domínio: aplica <span class="kw">Fraqueza 2</span>.',
    upgrade: { name: "Lâmina d'Água+", effects: [{ kind: 'DealDamage', value: 8 }], desc: 'Causa <b>8</b> de dano.' },
  },
  {
    id: 'golpe-duplo', name: 'Golpe Gêmeo', jp: '剣', reading: 'ken', meaning: 'espada',
    cat: 'attack', rarity: 'comum', cost: 1, targeting: 'enemy', tags: ['ataque'], archetype: 'lamina',
    contentId: 'k-sword', effects: [{ kind: 'DealDamage', value: 3, times: 2 }],
    desc: 'Causa <b>3</b> de dano <span class="kw">2 vezes</span>.',
    upgrade: { name: 'Golpe Gêmeo+', effects: [{ kind: 'DealDamage', value: 4, times: 2 }], desc: 'Causa <b>4</b> de dano <span class="kw">2 vezes</span>.' },
  },
  {
    id: 'rajada-vento', name: 'Rajada Cortante', jp: '風', reading: 'kaze', meaning: 'vento',
    cat: 'attack', rarity: 'incomum', cost: 1, element: 'wind', targeting: 'enemy', tags: ['ataque', 'vento'], archetype: 'fluxo',
    contentId: 'k-wind', effects: [{ kind: 'DealDamage', value: 4 }, { kind: 'DrawCards', value: 1 }],
    bonusEffects: [{ kind: 'DealDamage', value: 3 }],
    desc: 'Causa <b>4</b> de dano. <span class="kw">Compre 1</span> carta.', bonusDesc: 'Domínio: <b>+3</b> de dano.',
    upgrade: { name: 'Rajada Cortante+', effects: [{ kind: 'DealDamage', value: 6 }, { kind: 'DrawCards', value: 1 }], desc: 'Causa <b>6</b> de dano. <span class="kw">Compre 1</span> carta.' },
  },
  {
    id: 'grande-corte', name: 'Grande Corte', jp: '大', reading: 'oo', meaning: 'grande',
    cat: 'attack', rarity: 'incomum', cost: 2, targeting: 'enemy', tags: ['ataque'], archetype: 'lamina',
    contentId: 'k-big', effects: [{ kind: 'DealDamage', value: 12 }],
    bonusEffects: [{ kind: 'ApplyStatus', status: 'vulnerable', value: 2 }],
    desc: 'Causa <b>12</b> de dano.', bonusDesc: 'Domínio: aplica <span class="kw">Vulnerável 2</span>.',
    upgrade: { name: 'Grande Corte+', effects: [{ kind: 'DealDamage', value: 16 }], bonusEffects: [{ kind: 'ApplyStatus', status: 'vulnerable', value: 3 }], desc: 'Causa <b>16</b> de dano.', bonusDesc: 'Domínio: aplica <span class="kw">Vulnerável 3</span>.' },
  },
  {
    id: 'pedra-lancada', name: 'Pedra Lançada', jp: '石', reading: 'ishi', meaning: 'pedra',
    cat: 'attack', rarity: 'comum', cost: 1, targeting: 'enemy', tags: ['ataque'], archetype: 'guardiao',
    contentId: 'v-stone', effects: [{ kind: 'DealDamage', value: 8 }],
    desc: 'Causa <b>8</b> de dano.',
    upgrade: { name: 'Pedra Lançada+', effects: [{ kind: 'DealDamage', value: 11 }], desc: 'Causa <b>11</b> de dano.' },
  },
  // ---------------- DEFESAS ----------------
  {
    id: 'guarda', name: 'Guarda', jp: '守', reading: 'mamo', meaning: 'proteger',
    cat: 'defense', rarity: 'comum', cost: 1, targeting: 'self', tags: ['defesa'], archetype: 'guardiao',
    contentId: 'k-guard', effects: [{ kind: 'GainBlock', value: 5 }],
    desc: 'Ganha <b>5</b> de bloqueio.',
    upgrade: { name: 'Guarda+', effects: [{ kind: 'GainBlock', value: 8 }], desc: 'Ganha <b>8</b> de bloqueio.' },
  },
  {
    id: 'muro-agua', name: "Muro d'Água", jp: '水', reading: 'mizu', meaning: 'água',
    cat: 'defense', rarity: 'comum', cost: 1, element: 'water', targeting: 'self', tags: ['defesa', 'agua'], archetype: 'elementos',
    contentId: 'k-water', effects: [{ kind: 'GainBlock', value: 6 }],
    bonusEffects: [{ kind: 'GainBlock', value: 4 }],
    desc: 'Ganha <b>6</b> de bloqueio.', bonusDesc: 'Domínio: <b>+4</b> de bloqueio.',
    upgrade: { name: "Muro d'Água+", effects: [{ kind: 'GainBlock', value: 9 }], bonusEffects: [{ kind: 'GainBlock', value: 5 }], desc: 'Ganha <b>9</b> de bloqueio.', bonusDesc: 'Domínio: <b>+5</b> de bloqueio.' },
  },
  {
    id: 'postura-firme', name: 'Postura Firme', jp: '心', reading: 'kokoro', meaning: 'coração',
    cat: 'defense', rarity: 'incomum', cost: 1, targeting: 'self', tags: ['defesa'], archetype: 'guardiao',
    contentId: 'k-heart', effects: [{ kind: 'GainBlock', value: 5 }, { kind: 'ApplyStatus', status: 'focus', value: 1, toSelf: true }],
    desc: 'Ganha <b>5</b> de bloqueio e <span class="kw">Foco 1</span>.',
    upgrade: { name: 'Postura Firme+', effects: [{ kind: 'GainBlock', value: 6 }, { kind: 'ApplyStatus', status: 'focus', value: 2, toSelf: true }], desc: 'Ganha <b>6</b> de bloqueio e <span class="kw">Foco 2</span>.' },
  },
  {
    id: 'folhagem', name: 'Manto de Folhas', jp: '木', reading: 'ki', meaning: 'árvore',
    cat: 'defense', rarity: 'incomum', cost: 1, element: 'wood', targeting: 'self', tags: ['defesa', 'madeira'], archetype: 'elementos',
    contentId: 'k-tree', effects: [{ kind: 'GainBlock', value: 4 }, { kind: 'ApplyStatus', status: 'regen', value: 3, toSelf: true }],
    bonusEffects: [{ kind: 'GainBlock', value: 3 }],
    desc: 'Ganha <b>4</b> de bloqueio e <span class="kw">Regeneração 3</span>.', bonusDesc: 'Domínio: <b>+3</b> de bloqueio.',
    upgrade: { name: 'Manto de Folhas+', effects: [{ kind: 'GainBlock', value: 5 }, { kind: 'ApplyStatus', status: 'regen', value: 5, toSelf: true }], desc: 'Ganha <b>5</b> de bloqueio e <span class="kw">Regeneração 5</span>.' },
  },
  // ---------------- TÉCNICAS ----------------
  {
    id: 'concentrar', name: 'Concentrar o Sopro', jp: '気', reading: 'ki', meaning: 'energia',
    cat: 'tech', rarity: 'incomum', cost: 0, targeting: 'none', tags: ['tecnica', 'fluxo'], archetype: 'fluxo',
    contentId: 'k-power', effects: [{ kind: 'DrawCards', value: 1 }, { kind: 'GainEnergy', value: 1 }],
    desc: 'Compre <b>1</b> carta. Ganhe <b>1</b> de energia.',
    upgrade: { name: 'Concentrar o Sopro+', effects: [{ kind: 'DrawCards', value: 2 }, { kind: 'GainEnergy', value: 1 }], desc: 'Compre <b>2</b> cartas. Ganhe <b>1</b> de energia.' },
  },
  {
    id: 'ler-fluxo', name: 'Ler o Fluxo', jp: '見', reading: 'mi', meaning: 'ver',
    cat: 'tech', rarity: 'comum', cost: 1, targeting: 'none', tags: ['tecnica', 'fluxo'], archetype: 'fluxo',
    contentId: 'v-see', effects: [{ kind: 'DrawCards', value: 2 }],
    desc: 'Compre <b>2</b> cartas.',
    upgrade: { name: 'Ler o Fluxo+', cost: 0, effects: [{ kind: 'DrawCards', value: 2 }], desc: 'Compre <b>2</b> cartas.' },
  },
  {
    id: 'meditacao', name: 'Meditação Serena', jp: '心', reading: 'kokoro', meaning: 'coração',
    cat: 'tech', rarity: 'incomum', cost: 1, targeting: 'self', tags: ['tecnica'], archetype: 'guardiao',
    contentId: 'k-heart', effects: [{ kind: 'ApplyStatus', status: 'focus', value: 2, toSelf: true }],
    bonusEffects: [{ kind: 'GainBlock', value: 4 }],
    desc: 'Ganha <span class="kw">Foco 2</span>.', bonusDesc: 'Domínio: <b>+4</b> de bloqueio.',
    upgrade: { name: 'Meditação Serena+', effects: [{ kind: 'ApplyStatus', status: 'focus', value: 3, toSelf: true }], desc: 'Ganha <span class="kw">Foco 3</span>.' },
  },
  // ---------------- PODERES ----------------
  {
    id: 'forca-interior', name: 'Força Interior', jp: '力', reading: 'chikara', meaning: 'força',
    cat: 'power', rarity: 'raro', cost: 1, targeting: 'self', tags: ['poder'], archetype: 'lamina',
    contentId: 'k-power', effects: [{ kind: 'GainStrength', value: 2 }],
    desc: 'Ganha <span class="kw">Força 2</span> permanente neste combate.',
    upgrade: { name: 'Força Interior+', effects: [{ kind: 'GainStrength', value: 3 }], desc: 'Ganha <span class="kw">Força 3</span> permanente neste combate.' },
  },
  {
    id: 'coracao-brasa', name: 'Coração em Brasa', jp: '火', reading: 'ka', meaning: 'fogo',
    cat: 'power', rarity: 'raro', cost: 2, element: 'fire', targeting: 'self', tags: ['poder', 'fogo'], archetype: 'elementos',
    contentId: 'k-fire', effects: [{ kind: 'GainStrength', value: 1 }, { kind: 'ApplyStatus', status: 'thorns', value: 3, toSelf: true }],
    desc: 'Ganha <span class="kw">Força 1</span> e <span class="kw">Espinhos 3</span>.',
    upgrade: { name: 'Coração em Brasa+', effects: [{ kind: 'GainStrength', value: 2 }, { kind: 'ApplyStatus', status: 'thorns', value: 4, toSelf: true }], desc: 'Ganha <span class="kw">Força 2</span> e <span class="kw">Espinhos 4</span>.' },
  },
  // ---------------- ESPÍRITOS ----------------
  {
    id: 'eco-curador', name: 'Eco Curador', jp: '癒', reading: 'iya', meaning: 'curar',
    cat: 'spirit', rarity: 'incomum', cost: 1, targeting: 'self', tags: ['espirito'], archetype: 'guardiao',
    contentId: 'k-heal', effects: [{ kind: 'Heal', value: 6 }],
    bonusEffects: [{ kind: 'ApplyStatus', status: 'regen', value: 3, toSelf: true }],
    desc: 'Recupera <b>6</b> de vida.', bonusDesc: 'Domínio: <span class="kw">Regeneração 3</span>.',
    upgrade: { name: 'Eco Curador+', effects: [{ kind: 'Heal', value: 9 }], desc: 'Recupera <b>9</b> de vida.' },
  },
  {
    id: 'eco-venenoso', name: 'Eco Venenoso', jp: '毒', reading: 'doku', meaning: 'veneno',
    cat: 'spirit', rarity: 'incomum', cost: 1, element: 'dark', targeting: 'enemy', tags: ['espirito'], archetype: 'fluxo',
    contentId: 'k-poison', effects: [{ kind: 'ApplyStatus', status: 'poison', value: 5 }],
    desc: 'Aplica <span class="kw">Veneno 5</span>.',
    upgrade: { name: 'Eco Venenoso+', effects: [{ kind: 'ApplyStatus', status: 'poison', value: 8 }], desc: 'Aplica <span class="kw">Veneno 8</span>.' },
  },
];

export const CARD_BY_ID = new Map(CARDS.map((c) => [c.id, c]));

/** baralho inicial do Viajante dos Ecos (~10 cartas equilibradas) */
export const STARTER_DECK: string[] = [
  'corte-veloz', 'corte-veloz', 'golpe-duplo', 'chama-crescente',
  'guarda', 'guarda', 'muro-agua', 'postura-firme',
  'concentrar', 'eco-curador',
];
