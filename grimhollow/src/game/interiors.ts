// Estabelecimentos do vilarejo e seus interiores.
export type Estab = "tavern" | "store" | "smith" | "alchemist";

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
    npc: "Taverneiro",
    seed: 11,
    lines: [
      "Bem-vindo à Taverna do Javali!",
      "Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças.",
    ],
  },
  store: {
    name: "MERCADOR",
    npc: "Mercadora",
    seed: 2,
    lines: [
      "Tenho de tudo um pouco, aventureiro.",
      "Em breve abriremos o comércio: poções, cordas, tochas e mais.",
    ],
  },
  smith: {
    name: "FERREIRO",
    npc: "Ferreiro",
    seed: 23,
    lines: [
      "O fogo está quente e a bigorna, pronta.",
      "Traga minério e ouro que eu aprimoro suas armas e armaduras.",
    ],
  },
  alchemist: {
    name: "ALQUIMISTA",
    npc: "Alquimista",
    seed: 31,
    lines: [
      "Cuidado com o que respira aqui dentro...",
      "Elixires e poções logo estarão à venda na minha bancada.",
    ],
  },
};

// posições especiais dentro da ROOM
export function roomFind(ch: string): { col: number; row: number } {
  for (let r = 0; r < ROOM_ROWS; r++) {
    const c = ROOM[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 1, row: 1 };
}
export function roomChar(col: number, row: number): string {
  if (row < 0 || row >= ROOM_ROWS || col < 0 || col >= ROOM_COLS) return "#";
  return ROOM[row][col];
}
export function roomWalkable(col: number, row: number): boolean {
  return ".PX".includes(roomChar(col, row));
}
