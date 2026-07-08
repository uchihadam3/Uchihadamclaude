// MODO CAOS — power-ups estilo Mario Kart, SÓ neste modo. Cada tampinha tem 1
// slot de item. A distribuição é "elástica" (rubber-band): quem está mais PARA
// TRÁS pega os itens mais fortes; quem lidera pega os mais fracos. Assim ninguém
// fica sem chance — mas nada quebra o jogo (os efeitos são fortes, não absurdos).

export interface ItemDef {
  id: string;
  name: string;
  ico: string;
  desc: string;
  tier: number;          // 1 (fraco) … 5 (forte) — usado só pra balancear a raridade
  kind: 'arm' | 'now';   // arm = arma o próximo peteléco · now = efeito imediato ao usar
}

// Catálogo. Bem gostosos de usar, mas balanceados:
//  - turbo/foguete: mais alcance no próximo peteléco (não é infinito)
//  - extra: +1 peteléco na vez
//  - escudo: anula 1 buraco/queda (defensivo)
//  - salto: pula um trechinho pra frente na pista
//  - raio: manda o LÍDER de volta pro checkpoint dele (só quem está atrás pega)
//  - ima: cola você no centro da pista e dá um empurrãozinho (bom pra mira)
//  - turbinho: empurrãozinho fraco (o "item ruim" de quem está na frente)
export const ITEMS: Record<string, ItemDef> = {
  raio:    { id: 'raio',    name: 'Raio',        ico: '⚡', desc: 'Manda o líder de volta pro checkpoint dele', tier: 5, kind: 'now' },
  foguete: { id: 'foguete', name: 'Foguete',     ico: '🚀', desc: 'Próximo peteléco com muito mais alcance',    tier: 4, kind: 'arm' },
  salto:   { id: 'salto',   name: 'Salto',       ico: '✨', desc: 'Pula um trecho pra frente na pista',          tier: 4, kind: 'now' },
  extra:   { id: 'extra',   name: 'Peteléco +1', ico: '➕', desc: 'Ganha um peteléco extra nesta vez',           tier: 3, kind: 'now' },
  escudo:  { id: 'escudo',  name: 'Escudo',      ico: '🛡️', desc: 'Anula o próximo buraco ou queda pra fora',     tier: 3, kind: 'now' },
  ima:     { id: 'ima',     name: 'Ímã',         ico: '🧲', desc: 'Cola no centro e empurra de leve pra frente',  tier: 2, kind: 'now' },
  turbo:   { id: 'turbo',   name: 'Turbinho',    ico: '💨', desc: 'Empurrãozinho pra frente no próximo peteléco', tier: 1, kind: 'arm' },
};
export const ITEM_ORDER = ['raio', 'foguete', 'salto', 'extra', 'escudo', 'ima', 'turbo'];

// Sorteia um item pela POSIÇÃO na corrida. rank01 = 0 (líder) … 1 (lanterna).
// Quanto mais atrás (rank01→1), maior a chance de item forte. total = nº de caps
// (com 1 só, cai no meio). O 'raio' nunca sai pro líder (ninguém pra atacar).
export function pickItem(rank01: number, isLeader: boolean, rng: () => number = Math.random): string {
  // peso de cada tier depende de quão atrás você está
  const back = Math.max(0, Math.min(1, rank01));
  const weights: Record<string, number> = {};
  for (const id of ITEM_ORDER) {
    const t = ITEMS[id].tier;                 // 1..5
    // itens fortes (tier alto) ganham peso com "back"; fracos ganham na frente
    const strong = (t - 1) / 4;               // 0..1
    let w = (1 - strong) * (1 - back) + strong * back;   // fraco↔frente, forte↔trás
    w = 0.12 + w * w * 1.6;                    // curva: acentua os extremos, mas sem zerar
    if (id === 'raio' && isLeader) w = 0;      // líder não recebe ataque
    weights[id] = w;
  }
  let sum = 0; for (const id of ITEM_ORDER) sum += weights[id];
  let r = rng() * sum;
  for (const id of ITEM_ORDER) { r -= weights[id]; if (r <= 0) return id; }
  return 'turbo';
}
