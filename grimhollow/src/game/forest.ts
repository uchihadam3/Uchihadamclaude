// Mapa da floresta (bioma externo, protótipo).
//  '.' = grama (andável)          '=' = caminho de terra (andável)
//  'T' = pinheiro (bloqueia)      'b' = arbusto (bloqueia)
//  'r' = rocha (bloqueia)         's' = placa de madeira (bloqueia, com texto)
//  'k' = pilha de caveiras (decoração no chão, andável)
//  '#' = mata densa da borda (bloqueia, forma o paredão de árvores)
//  'P' = início do jogador (olhando p/ o norte, subindo o caminho)
//  'V' = portão de volta ao vilarejo (borda sul)
// Norte = para cima (montanhas ao fundo). O caminho sobe serpenteando entre
// os pinheiros; a grama em volta é aberta e explorável.
export const FOREST: string[] = [
  "###############",
  "#.......TT....#",
  "#T....=....b.T#",
  "#.rbT.==.....T#",
  "#......=.T...b#",
  "#.TT...=.....T#",
  "#.T..T..==.T..#",
  "#T......=.....#",
  "#.TT...=......#",
  "#b..T..==..T.b#",
  "#.....=...TT.T#",
  "#.TTT.=....TTT#",
  "#b..T..==.T.T.#",
  "#...T..=.....T#",
  "#r..T..=....TT#",
  "#.TTT..==....T#",
  "#TT.k.=...T...#",
  "#.....=...T...#",
  "#..bT..==s..r.#",
  "#T.TTT.=..b.TT#",
  "#..T...P.b....#",
  "#######V#######",
];

export const FOREST_ROWS = FOREST.length;
export const FOREST_COLS = FOREST[0].length;

export type ForestCell =
  | "grass"
  | "path"
  | "tree"
  | "bush"
  | "rock"
  | "sign"
  | "skull"
  | "edge"
  | "gate"
  | "spawn";

export function forestCell(col: number, row: number): ForestCell {
  if (row < 0 || row >= FOREST_ROWS || col < 0 || col >= FOREST_COLS) return "edge";
  switch (FOREST[row][col]) {
    case ".":
      return "grass";
    case "=":
      return "path";
    case "T":
      return "tree";
    case "b":
      return "bush";
    case "r":
      return "rock";
    case "s":
      return "sign";
    case "k":
      return "skull";
    case "V":
      return "gate";
    case "P":
      return "spawn";
    default:
      return "edge";
  }
}

export function forestWalkable(col: number, row: number): boolean {
  const k = forestCell(col, row);
  return k === "grass" || k === "path" || k === "skull" || k === "gate" || k === "spawn";
}

export function forestFind(ch: string): { col: number; row: number } {
  for (let r = 0; r < FOREST_ROWS; r++) {
    const c = FOREST[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 7, row: FOREST_ROWS - 2 };
}
