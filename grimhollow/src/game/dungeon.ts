// Masmorra FIXA (nível 1). Grade grande com corredores, salas, um GRANDE salão
// central, uma sala de tesouro ao norte e uma SALA SECRETA a noroeste, alcançável
// por uma PAREDE ILUSÓRIA (o 'X', que parece rocha mas é atravessável).
//   '#' rocha/parede (bloqueia)      '.' piso (andável)
//   'S' entrada (spawn, desceu a escada)   'U' escada de volta ao vilarejo
//   'E' ponto de inimigo    'C' baú (tesouro)   'K' ossada    'B' barril
//   'X' parede ILUSÓRIA (parece sólida, mas dá passagem ao segredo)
//   'G' PORTÃO de grade — sela um corredor 1-largura que dá p/ tesouro (abre ao interagir)
export const DUNGEON: string[] = [
  "############################################",
  "############################################",
  "############################################",
  "###...........####...U....####...........###",
  "###......................................###",
  "###...C..................................###",
  "###.......E...####B..S....####...........###",
  "###.....K.....####........####.....E.....###",
  "###...........######..########...........###",
  "###...........######..########...........###",
  "######..############E.########...........###",
  "######..############..######################",
  "######..############..######################",
  "######..#########...........################",
  "######..#########...........######.......###",
  "######..#########.........B.######.......###",
  "######..####..........E..........G.......###",
  "######..####.........K....E......#....C..###",
  "######..#########.......C...######...K...###",
  "######..#########...........######.......###",
  "######..#########...........######.......###",
  "###..........########..#####################",
  "###..........########..#####################",
  "###........E.########..#####################",
  "###...E......########..#####################",
  "###..K.......########..#####################",
  "###..........########..#####################",
  "###..........##..............##.........####",
  "###..........##..............##.........####",
  "###############.B............##.........####",
  "###############.....E.........L.A.......####",
  "###.........###.......K.......#.........####",
  "###.....................E....##.........####",
  "###.......B..................##..###########",
  "###.....E...###..............###############",
  "###.........######################.......###",
  "###..............................X....C..###",
  "###.........######################.......###",
  "##################################.......###",
  "############################################",
];

export const DUNGEON_ROWS = DUNGEON.length;
export const DUNGEON_COLS = DUNGEON[0].length;

export type DungeonCell =
  | "wall"
  | "floor"
  | "spawn"
  | "stairs"
  | "enemy"
  | "chest"
  | "bones"
  | "barrel"
  | "gate" // portão de grade: sela um corredor (bloqueia até ser aberto)
  | "lockgate" // portão SELADO (não abre) — esconde a entrada do santuário
  | "sanctuary" // portal/entrada do SANTUÁRIO (leva à sala-vitrine)
  | "secret"; // parede ilusória: renderiza como rocha, mas é andável

export function dungeonChar(col: number, row: number): string {
  if (row < 0 || row >= DUNGEON_ROWS || col < 0 || col >= DUNGEON_COLS) return "#";
  return DUNGEON[row][col];
}

export function dungeonCell(col: number, row: number): DungeonCell {
  switch (dungeonChar(col, row)) {
    case ".":
      return "floor";
    case "S":
      return "spawn";
    case "U":
      return "stairs";
    case "E":
      return "enemy";
    case "C":
      return "chest";
    case "K":
      return "bones";
    case "B":
      return "barrel";
    case "G":
      return "gate";
    case "L":
      return "lockgate";
    case "A":
      return "sanctuary";
    case "X":
      return "secret";
    default:
      return "wall";
  }
}

// tudo é andável menos a rocha sólida ('#'/borda). O 'X' (parede ilusória) É andável.
export function dungeonWalkable(col: number, row: number): boolean {
  return dungeonCell(col, row) !== "wall";
}

// para o RENDER das paredes: o 'X' conta como parede (parece rocha sólida).
export function dungeonSolidLook(col: number, row: number): boolean {
  const k = dungeonCell(col, row);
  return k === "wall" || k === "secret";
}

export function dungeonFind(ch: string): { col: number; row: number } {
  for (let r = 0; r < DUNGEON_ROWS; r++) {
    const c = DUNGEON[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 21, row: 36 };
}

// todas as células de um tipo (ex.: todos os 'E' de inimigo)
export function dungeonAll(ch: string): { col: number; row: number }[] {
  const out: { col: number; row: number }[] = [];
  for (let r = 0; r < DUNGEON_ROWS; r++)
    for (let c = 0; c < DUNGEON_COLS; c++)
      if (DUNGEON[r][c] === ch) out.push({ col: c, row: r });
  return out;
}
