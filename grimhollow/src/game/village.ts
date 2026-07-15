// Mapa do vilarejo em grid.
//  '#' = casa (bloco)        '.' = rua (andável)
//  'o' = barril (decorativo) 'P' = início do jogador (olhando p/ o norte)
//  'M' = montanha (rocha, bloqueia)
//  'T' = túnel da masmorra (andável, com paredes/teto/chão de dungeon)
//  'S' = escada descendo (andável, início da masmorra)
// Norte = para cima (linhas menores). Rua principal vertical, praça, casas,
// e uma MONTANHA no canto noroeste com um túnel de 3 tiles até a escada.
export const MAP: string[] = [
  "MMMMM##########",
  "MMMMM###....###",
  "MMSMM###....###",
  "MMTMM###....###",
  "MMTMM###....###",
  "MMTMM#........#",
  "#............##",
  "######...######",
  "######...######",
  "#...........###",
  "######...######",
  "######.o.######",
  "######...######",
  "######...######",
  "######...######",
  "######...######",
  "######.P.######",
  "###############",
];

export const ROWS = MAP.length;
export const COLS = MAP[0].length;

export type CellKind =
  | "street"
  | "building"
  | "barrel"
  | "mountain"
  | "tunnel"
  | "stairs";

export function cellAt(col: number, row: number): CellKind {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return "building";
  const ch = MAP[row][col];
  if (ch === "#") return "building";
  if (ch === "o") return "barrel";
  if (ch === "M") return "mountain";
  if (ch === "T") return "tunnel";
  if (ch === "S") return "stairs";
  return "street";
}

// células "de dungeon" (túnel + escada) — recebem chão/parede/teto de masmorra
export function isDungeon(col: number, row: number): boolean {
  const k = cellAt(col, row);
  return k === "tunnel" || k === "stairs";
}

export function isWalkable(col: number, row: number): boolean {
  const k = cellAt(col, row);
  // barris são decorativos; túnel e escada são andáveis
  return k === "street" || k === "barrel" || k === "tunnel" || k === "stairs";
}

export function findStart(): { col: number; row: number } {
  for (let r = 0; r < ROWS; r++) {
    const c = MAP[r].indexOf("P");
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 1, row: 1 };
}
