// Estabelecimentos do vilarejo e seus interiores.
//
// A ARMARIA ocupa um prédio de DOIS ANDARES e conta como dois estabelecimentos:
// "armory" é o térreo (proteção do corpo) e "armoryUp" é o andar de cima (armas).
// Só o térreo tem porta na rua; o de cima se alcança pela escada lá dentro, e a
// "saída" de cima é justamente a descida. Cada andar tem o seu atendente, senão
// o de cima pareceria um depósito.
//
// ---------------------------------------------------------------------------
// UMA PLANTA POR ESTABELECIMENTO
//
// Até aqui os SETE estabelecimentos dividiam a MESMA sala de 7×7: mesma parede,
// mesmo chão, mesmo formato. Trocava o atendente e a placa, e só. A cidade ficou
// detalhada por fora e por dentro continuava sendo o mesmo quarto sete vezes.
//
// Agora cada um tem a sua planta, e o FORMATO é a primeira coisa que conta onde
// você está: a Taverna é um salão largo, o Templo é uma nave comprida, a
// Alquimista é um cubículo apertado.
//
// A MOBÍLIA MORA EM CÉLULAS NÃO-ANDÁVEIS. Isso não é detalhe de implementação: é
// a regra que impede de repetir o erro antigo, quando os móveis foram postos no
// chão livre e andar lá dentro virou um quebra-cabeça de esbarrões — a ponto de
// terem sido todos removidos. Uma mesa que ocupa uma casa da grade nunca fica no
// caminho, porque aquela casa nunca foi caminho.
// ---------------------------------------------------------------------------
import { dentroDaGrade } from "./config";

export type Estab =
  | "tavern" | "store" | "smith" | "alchemist"
  | "armory" | "armoryUp" | "temple";

/** As salas que existem: os estabelecimentos + a casa de aldeão. */
export type SalaId = Estab | "home";

// LEGENDA das plantas:
//   '#' parede    '.' chão    'X' saída (ou, no andar de cima, a descida)
//   'P' início do jogador     'N' atendente (o balcão nasce à frente dele)
//   ---- mobília (tudo NÃO-ANDÁVEL, encostada na parede) ----
//   'T' mesa com bancos   'B' barris   'E' estante   'F' forja
//   'A' altar             'C' coluna   'R' expositor de armas
const SALAS: Record<SalaId, string[]> = {
  // TAVERNA — o salão. É o maior interior do jogo de propósito: é o lugar onde
  // as pessoas se juntam, e um teto baixo sobre um salão largo é exatamente a
  // sensação de taverna cheia.
  tavern: [
    "#########",
    "#BB.N.BB#",
    "#.......#",
    "#T.....T#",
    "#.......#",
    "#T.....T#",
    "#.......#",
    "#...P...#",
    "####X####",
  ],
  // MERCADOR — corredor de prateleiras. Estreito e fundo: você anda ENTRE o
  // estoque até chegar ao balcão.
  store: [
    "#######",
    "#..N..#",
    "#.....#",
    "#E...E#",
    "#.....#",
    "#E...E#",
    "#..P..#",
    "###X###",
  ],
  // FERRARIA — a forja fica logo à entrada, à esquerda: é a primeira coisa que
  // você vê e a única fonte de luz forte da sala.
  smith: [
    "#######",
    "#F.N..#",
    "#.....#",
    "#.....#",
    "#B...B#",
    "#..P..#",
    "###X###",
  ],
  // ALQUIMISTA — cubículo. Bancadas dos dois lados e mal cabe você no meio; é a
  // sala mais apertada do jogo, e é isso que a torna reconhecível.
  alchemist: [
    "######",
    "#.N..#",
    "#..E.#",
    "#E...#",
    "#..E.#",
    "#.P..#",
    "##X###",
  ],
  // TEMPLO — nave. Longa, estreita, com colunas e o altar ao fundo, atrás da
  // Madre. Andar até ela é uma procissão curta, que é o ponto.
  temple: [
    "#######",
    "#..A..#",
    "#..N..#",
    "#C...C#",
    "#.....#",
    "#C...C#",
    "#.....#",
    "#..P..#",
    "###X###",
  ],
  // ARMARIA (térreo) — a escada p/ a Sala das Armas fica logo à esquerda de quem
  // entra (ver ARMORY_STAIR, na coluna 1 / linha 2). Expositores nas laterais.
  armory: [
    "#######",
    "#..N..#",
    "#.....#",
    "#R...R#",
    "#.....#",
    "#..P..#",
    "###X###",
  ],
  // SALA DAS ARMAS (andar de cima) — mais cheia de expositores e sem porta p/ a
  // rua: a "saída" é a descida.
  armoryUp: [
    "#######",
    "#R.N.R#",
    "#.....#",
    "#R...R#",
    "#.....#",
    "#..P..#",
    "###X###",
  ],
  // CASA DE ALDEÃO — continua o quarto simples de sempre. Aqui o vazio é
  // proposital: é uma casa pobre, e o único móvel que importa é o baú da Hedda.
  home: [
    "#######",
    "#..N..#",
    "#.....#",
    "#.....#",
    "#.....#",
    "#..P..#",
    "###X###",
  ],
};

// Sala ATIVA. O Game troca com setRoom antes de montar/mover — o mesmo padrão do
// setDungeonFloor, não um caso especial.
let salaAtual: SalaId = "home";
export function setRoom(id: SalaId): void { salaAtual = id; }
export function getRoom(): SalaId { return salaAtual; }
function mapa(id: SalaId = salaAtual): string[] { return SALAS[id]; }

export function roomCols(id: SalaId = salaAtual): number { return mapa(id)[0].length; }
export function roomRows(id: SalaId = salaAtual): number { return mapa(id).length; }

export interface EstabInfo {
  name: string; // texto da placa
  npc: string; // nome do atendente
  seed: number; // semente do sprite do atendente
  lines: string[]; // diálogo
}

export const ESTAB: Record<Estab, EstabInfo> = {
  tavern: {
    name: "TAVERNA",
    npc: "Bruno, o Taverneiro",
    seed: 11,
    lines: [
      "Bem-vindo à Taverna do Javali! Eu sou o Bruno.",
      "Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças.",
    ],
  },
  store: {
    name: "MERCADOR",
    npc: "Rosa, a Mercadora",
    seed: 2,
    lines: [
      "Tenho de tudo um pouco, aventureiro. Sou a Rosa.",
      "Em breve abriremos o comércio: poções, cordas, tochas e mais.",
    ],
  },
  smith: {
    name: "FERREIRO",
    npc: "Brandt, o Ferreiro",
    seed: 23,
    lines: [
      "O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.",
      "Traga minério e ouro que eu aprimoro suas armas e armaduras.",
    ],
  },
  alchemist: {
    name: "ALQUIMISTA",
    npc: "Isolde, a Alquimista",
    seed: 31,
    lines: [
      "Cuidado com o que respira aqui dentro... sou Isolde.",
      "Elixires e poções logo estarão à venda na minha bancada.",
    ],
  },
  armory: {
    name: "ARMARIA",
    npc: "Odile, a Armeira",
    seed: 43,
    lines: [
      "Couro, malha e placa — aqui embaixo é o que veste o corpo. Odile.",
      "Lâmina você acha lá em cima, com o meu irmão. Cuidado com a escada.",
    ],
  },
  armoryUp: {
    name: "SALA DAS ARMAS",
    npc: "Gervais, o Armeiro",
    seed: 47,
    lines: [
      "Subiu bem. Aqui em cima só tem gume. Sou Gervais.",
      "Pegue com as duas mãos antes de decidir. Arma se escolhe pelo peso.",
    ],
  },
  temple: {
    name: "TEMPLO", // a placa da rua é curta; o nome inteiro fica no diálogo
    npc: "Madre Corvina",
    seed: 53,
    lines: [
      "A Chama ainda arde, forasteiro, ainda que pálida. Sou a Madre Corvina.",
      "Traga suas feridas até o altar. A Chama cobra pouco e cura o bastante.",
    ],
  },
};

// A ARMARIA é o único prédio de dois andares: a escada fica DENTRO da sala, a
// poucos passos da porta (escada longe vira pedágio entre o jogador e a loja).
// No térreo ela SOBE; lá em cima, a "saída" da sala é a própria descida.
export const ARMORY_STAIR = { col: 1, row: 2 };

// posições especiais dentro da sala (a ativa, ou a que for pedida)
export function roomFind(ch: string, id: SalaId = salaAtual): { col: number; row: number } {
  const m = mapa(id);
  for (let r = 0; r < m.length; r++) {
    const c = m[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 1, row: 1 };
}
export function roomChar(col: number, row: number, id: SalaId = salaAtual): string {
  if (!dentroDaGrade(col, row, roomCols(id), roomRows(id))) return "#";
  return mapa(id)[row][col];
}
/** Só o '#' é PAREDE de verdade — a mobília é obstáculo, não alvenaria. */
export function roomSolid(col: number, row: number, id: SalaId = salaAtual): boolean {
  return roomChar(col, row, id) === "#";
}
/** Onde há piso e teto a desenhar: tudo que não é parede (a mobília pisa no chão). */
export function roomFloored(col: number, row: number, id: SalaId = salaAtual): boolean {
  return !roomSolid(col, row, id);
}
export function roomWalkable(col: number, row: number, id: SalaId = salaAtual): boolean {
  return ".PX".includes(roomChar(col, row, id));
}
/** As células de MOBÍLIA da sala, com a letra de cada uma. */
export const PROP_CHARS = "TBEFACR";
export function roomProps(id: SalaId = salaAtual): { col: number; row: number; ch: string }[] {
  const out: { col: number; row: number; ch: string }[] = [];
  const m = mapa(id);
  for (let r = 0; r < m.length; r++)
    for (let c = 0; c < m[r].length; c++)
      if (PROP_CHARS.includes(m[r][c])) out.push({ col: c, row: r, ch: m[r][c] });
  return out;
}
