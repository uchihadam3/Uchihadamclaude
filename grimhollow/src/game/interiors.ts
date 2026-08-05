// Estabelecimentos do vilarejo e seus interiores.
//
// A ARMARIA ocupa um prédio de DOIS ANDARES e conta como dois estabelecimentos:
// "armory" é o térreo (proteção do corpo) e "armoryUp" é o andar de cima (armas).
// Só o térreo tem porta na rua; o de cima se alcança pela escada lá dentro, e a
// "saída" de cima é justamente a descida. Cada andar tem o seu atendente, senão
// o de cima pareceria um depósito.
import { dentroDaGrade } from "./config";

export type Estab =
  | "tavern" | "store" | "smith" | "alchemist"
  | "armory" | "armoryUp" | "temple";

// Sala padrão dos interiores (grid).
//  '#' parede   '.' chão   'X' saída (volta p/ a vila)
//  'P' início do jogador   'N' atendente (balcão)
export const ROOM: string[] = [
  "#######",
  "#..N..#",
  "#.....#",
  "#.....#",
  "#.....#",
  "#..P..#",
  "###X###",
];
export const ROOM_ROWS = ROOM.length;
export const ROOM_COLS = ROOM[0].length;

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

// posições especiais dentro da ROOM
export function roomFind(ch: string): { col: number; row: number } {
  for (let r = 0; r < ROOM_ROWS; r++) {
    const c = ROOM[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 1, row: 1 };
}
export function roomChar(col: number, row: number): string {
  if (!dentroDaGrade(col, row, ROOM_COLS, ROOM_ROWS)) return "#";
  return ROOM[row][col];
}
export function roomWalkable(col: number, row: number): boolean {
  return ".PX".includes(roomChar(col, row));
}
