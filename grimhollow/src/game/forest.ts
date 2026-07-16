// Mapa da floresta (bioma externo).
//  '.' grama (andável)        '=' trilha de terra (andável)
//  'T' pinheiro (bloqueia)    'b' arbusto (bloqueia)      'r' rocha (bloqueia)
//  'f' folhagem/samambaia (decoração no chão, andável)
//  'k' pilha de caveiras (decoração no chão, andável)
//  's' placa de boas-vindas   'j' placa direcional (encruzilhada)
//  'N'/'E'/'W' marcos das trilhas futuras (montanhas / charco / ruínas)
//  '#' mata densa da borda (bloqueia)
//  'P' início do jogador (olhando p/ o norte)   'V' portão de volta ao vilarejo
//
// A entrada ao sul sobe por um tronco de trilha até uma ENCRUZILHADA central,
// de onde partem caminhos p/ o norte, leste e oeste — cada ponta termina num
// marco de um local futuro. A neblina do jogo cobre tudo (lore).
export const FOREST: string[] = [
  "#################",
  "#.Tb.T......rTT.#",
  "#T..b...N.TT.Tb.#",
  "#fTTTT..=..TrT..#",
  "#....T..=.rb.TT.#",
  "#.TT..T.=.T..Tb.#",
  "#.T..Tf.=.TT.rT.#",
  "#Tr.r...=.b...TT#",
  "#.TT....=......T#",
  "#T..T...=.rTbTTT#",
  "#.......=.......#",
  "#W=============E#",
  "#......===j.....#",
  "#.r.T...=....TT.#",
  "#Tr.Tfb.=.r.TT..#",
  "#.TT....=....T..#",
  "#TT..k..=.T....T#",
  "#fbb....=...bf.r#",
  "#rfTT...=...T..T#",
  "#TrTTT..=s..TTTT#",
  "#f.T....P.....T.#",
  "########V########",
];

export const FOREST_ROWS = FOREST.length;
export const FOREST_COLS = FOREST[0].length;

export type ForestCell =
  | "grass"
  | "path"
  | "tree"
  | "bush"
  | "rock"
  | "foliage"
  | "skull"
  | "sign"
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
    case "f":
      return "foliage";
    case "k":
      return "skull";
    case "s":
    case "j":
    case "N":
    case "E":
    case "W":
      return "sign";
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
  return (
    k === "grass" ||
    k === "path" ||
    k === "foliage" ||
    k === "skull" ||
    k === "gate" ||
    k === "spawn"
  );
}

// texto de cada placa/marco, conforme o caractere na célula
export function forestSignText(col: number, row: number): string[] {
  const ch = FOREST[row]?.[col];
  switch (ch) {
    case "s":
      return [
        "Trilha da Mata Sussurrante.",
        "A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.",
        "Siga a trilha até a encruzilhada.",
      ];
    case "j":
      return [
        "Encruzilhada da Mata.",
        "Ao sul: Vilarejo de Grimhollow.",
        "Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.",
        "(Esses caminhos se abrirão em breve.)",
      ];
    case "N":
      return [
        "Trilha das Montanhas Cinzentas.",
        "O caminho sobe rumo ao nevoeiro gelado.",
        "(Bloqueado — em breve.)",
      ];
    case "E":
      return [
        "Trilha do Charco.",
        "Um cheiro de água parada vem do leste.",
        "(Bloqueado — em breve.)",
      ];
    case "W":
      return [
        "Trilha das Ruínas.",
        "Pedras antigas espreitam entre as árvores a oeste.",
        "(Bloqueado — em breve.)",
      ];
    default:
      return ["Uma placa de madeira, gasta pelo tempo."];
  }
}

export function forestFind(ch: string): { col: number; row: number } {
  for (let r = 0; r < FOREST_ROWS; r++) {
    const c = FOREST[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 8, row: FOREST_ROWS - 2 };
}
