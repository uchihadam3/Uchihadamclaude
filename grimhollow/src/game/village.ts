// Mapa do vilarejo em grid.
//  '#' = casa (bloco)      '.' = rua (andável)
//  'o' = barril (bloqueia) 'P' = início do jogador (olhando p/ o norte)
// Norte = para cima (linhas menores). Uma rua principal vertical no centro,
// com becos, uma praça e casas dos dois lados.
export const MAP: string[] = [
  "#############",
  "#####...#####",
  "#####...#####",
  "#####o..#####",
  "#####...#####",
  "#####...#####",
  "#####..o#####",
  "#####...#####",
  "##.........##",
  "#....o.o....#",
  "##.........##",
  "#####...#####",
  "#####o..#####",
  "#####...#####",
  "#####...#####",
  "#####..o#####",
  "#####...#####",
  "#####...#####",
  "#####.P.#####",
  "#############",
];

export const ROWS = MAP.length;
export const COLS = MAP[0].length;

export type CellKind = "street" | "building" | "barrel";

export function cellAt(col: number, row: number): CellKind {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return "building";
  const ch = MAP[row][col];
  if (ch === "#") return "building";
  if (ch === "o") return "barrel";
  return "street";
}

export function isWalkable(col: number, row: number): boolean {
  return cellAt(col, row) === "street";
}

export function findStart(): { col: number; row: number } {
  for (let r = 0; r < ROWS; r++) {
    const c = MAP[r].indexOf("P");
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 1, row: 1 };
}
