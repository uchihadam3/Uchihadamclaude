// MODO CAOS — power-ups de brincadeira de rua, SÓ neste modo. Cada tampinha tem
// 2 BOLSOS de item (pegou 2, tem que usar um pra pegar outro). A distribuição é
// "elástica" (rubber-band): quem está mais PARA TRÁS pega os itens mais fortes;
// quem lidera pega os mais fracos. Assim ninguém fica sem chance — mas nada
// quebra o jogo (os efeitos são fortes, não absurdos).

export const MAX_ITEMS = 2;          // bolsos por tampinha

export interface ItemDef {
  id: string;
  name: string;
  ico: string;
  desc: string;
  tier: number;          // 1 (fraco) … 5 (forte) — usado só pra balancear a raridade
  kind: 'arm' | 'now';   // arm = arma o próximo peteléco · now = efeito imediato ao usar
  needsAhead?: boolean;  // precisa de alguém NA FRENTE (líder não recebe / IA só usa com alvo)
}

// Catálogo (15). Bem gostosos de usar, mas balanceados:
export const ITEMS: Record<string, ItemDef> = {
  // ---- ataque ----
  raio:     { id: 'raio',     name: 'Raio',         ico: '⚡', desc: 'Manda o líder de volta pro checkpoint dele',       tier: 5, kind: 'now', needsAhead: true },
  troca:    { id: 'troca',    name: 'Troca-Troca',  ico: '🔁', desc: 'Troca de lugar com quem está logo à sua frente',   tier: 5, kind: 'now', needsAhead: true },
  furacao:  { id: 'furacao',  name: 'Furacão',      ico: '🌪️', desc: 'Sopra TODOS os rivais alguns passos pra trás',     tier: 4, kind: 'now' },
  chuva:    { id: 'chuva',    name: 'Chuvinha',     ico: '🌧️', desc: 'Deixa uma poça d’água no caminho do líder',        tier: 4, kind: 'now', needsAhead: true },
  ancora:   { id: 'ancora',   name: 'Âncora',       ico: '⚓', desc: 'O próximo peteléco do líder sai fraquinho',        tier: 4, kind: 'now', needsAhead: true },
  gude:     { id: 'gude',     name: 'Bola de Gude', ico: '🔮', desc: 'Acerta o rival mais próximo e derruba ele pra trás', tier: 3, kind: 'now', needsAhead: true },
  cola:     { id: 'cola',     name: 'Chiclete',     ico: '🫠', desc: 'Larga um chiclete atrás de você — quem pisar, gruda', tier: 2, kind: 'now' },
  // ---- movimento ----
  foguete:  { id: 'foguete',  name: 'Foguete',      ico: '🚀', desc: 'Próximo peteléco com muito mais alcance',          tier: 4, kind: 'arm' },
  salto:    { id: 'salto',    name: 'Salto',        ico: '✨', desc: 'Pula um trecho pra frente na pista',                tier: 4, kind: 'now' },
  ima:      { id: 'ima',      name: 'Ímã',          ico: '🧲', desc: 'Cola no centro e empurra de leve pra frente',       tier: 2, kind: 'now' },
  turbo:    { id: 'turbo',    name: 'Turbinho',     ico: '💨', desc: 'Empurrãozinho pra frente no próximo peteléco',      tier: 1, kind: 'arm' },
  // ---- defesa / poder ----
  fantasma: { id: 'fantasma', name: 'Fantasma',     ico: '👻', desc: 'Próximo peteléco ATRAVESSA tampinhas e obstáculos', tier: 4, kind: 'arm' },
  pancada:  { id: 'pancada',  name: 'Pancada',      ico: '🥊', desc: 'Próximo peteléco: trombadas jogam os outros LONGE', tier: 3, kind: 'arm' },
  extra:    { id: 'extra',    name: 'Peteléco +1',  ico: '➕', desc: 'Ganha um peteléco extra nesta vez',                 tier: 3, kind: 'now' },
  escudo:   { id: 'escudo',   name: 'Escudo',       ico: '🛡️', desc: 'Anula 1 buraco ou queda — você desvia pela beirada', tier: 3, kind: 'now' },
};
export const ITEM_ORDER = Object.keys(ITEMS);

// Sorteia um item pela POSIÇÃO na corrida. rank01 = 0 (líder) … 1 (lanterna).
// Quanto mais atrás (rank01→1), maior a chance de item forte. Itens que precisam
// de alguém à frente nunca saem pro líder (não teria alvo).
export function pickItem(rank01: number, isLeader: boolean, rng: () => number = Math.random): string {
  const back = Math.max(0, Math.min(1, rank01));
  const weights: Record<string, number> = {};
  for (const id of ITEM_ORDER) {
    const t = ITEMS[id].tier;                 // 1..5
    const strong = (t - 1) / 4;               // 0..1
    let w = (1 - strong) * (1 - back) + strong * back;   // fraco↔frente, forte↔trás
    w = 0.12 + w * w * 1.6;                    // curva: acentua os extremos, mas sem zerar
    if (ITEMS[id].needsAhead && isLeader) w = 0;   // líder não recebe item de ataque sem alvo
    weights[id] = w;
  }
  let sum = 0; for (const id of ITEM_ORDER) sum += weights[id];
  let r = rng() * sum;
  for (const id of ITEM_ORDER) { if (weights[id] <= 0) continue; r -= weights[id]; if (r <= 0) return id; }
  return 'turbo';
}
