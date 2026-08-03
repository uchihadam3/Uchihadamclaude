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
// REGRA DE DUNGEON CRAWLER: aqui fora também só existe CORREDOR. A mata (35x50)
// é um LABIRINTO de trilhas de uma célula de largura, e as "paredes" são
// PAREDÕES DE ÁRVORE de duas células de espessura — com colisão de verdade, como
// a parede de pedra da masmorra. Nada de campo aberto: você anda entre troncos,
// vira a esquina e não sabe o que vem.
//
// O labirinto é TRANÇADO (a maioria dos becos sem saída virou atalho), então há
// vários caminhos e explorar não vira sofrimento. A TRILHA DE TERRA ('=') é o fio
// condutor: sai da entrada ao sul, passa pela ENCRUZILHADA e segue até os três
// marcos — norte (Planície de Arden), leste (Charco) e oeste (Ruínas).
//
// Gerado por `scripts/gen_outdoor.py` (semente fixa), que valida por BFS que a
// entrada, o portão, a encruzilhada e os três marcos continuam alcançáveis.
export const FOREST: string[] = [
  "###################################",
  "#################N#################",
  "##........f.f..bT=======TT.f...f.##",
  "##.brTrTbTT.Tb.TT.TTTTT=TT.TTTTT.##",
  "##.rTTTTTTT.TT.Tb.TTTbT=TT.TTbTT.##",
  "##fTT.TT....TT....bT====TT....rT.##",
  "##kTT.TT.TTbTTTTTTTb=TTTTTbTT.Tb.##",
  "##.TT.TT.TTbTbTTTTTb=TTTTrTTT.TT.##",
  "##.k..br.........k===TT....TTf...##",
  "##TrT.TTTTT.TTTTT==TTTT.TT.rTTTT.##",
  "##TTT.TbTTTfrTTTT=TTTTT.TT.bTbTr.##",
  "##.TT.f..TTf..kbT=.......rf......##",
  "##.TTTTT.bTTTT.rT=TbTrT..TTTTTTT.##",
  "##.rTTTb.TTrTT.bT=TrTTTbTrbTTTTT.##",
  "##f......TT....TT=TT====TT....TT.##",
  "##.TTbTT.TT.TTrTT=TT=TT=TT.TT.TT.##",
  "##.TTTbT.TT.bTTTT=TT=Tr=bT.TT.TT.##",
  "##....TT.TT.TT====TT=TT=.b.bT.bT=E#",
  "##.TT.Tr.TT.TT=TTTTb=Tb=.T.TT.TT=##",
  "##.TT.bT.TT.TT=TTTrT=Tb=TT.bT.TT=##",
  "##.TT.f..TT.TT=======Tb=TT....TT=##",
  "##.TTTbTTTT.bT.TTTbTTTT=Tb.TTTTb=##",
  "##.TTbTTTbT.TT.TbTrbTTT=TT.TTbTT=##",
  "##..f.......TT.bb=jT====TT=======##",
  "##.rTTbTrTTTTT.TT=TT=TbrbT=TTTTTT##",
  "##.TbTTbTTTTTT.bT=TT=TTrTT=TTTTTT##",
  "##...........f.TT=TT=======TT....##",
  "##.TT.fTTrTTTTTTT=TT=rTTrT.TT.TT.##",
  "##.TTTbTTTTTTTTbr=Tb=TTTTT.bT.TT.##",
  "#W=======Tb=======.T====TT.bT.TT.##",
  "##rTTTTT=bb=TTTTT..TTTT=TT.TT.rT.##",
  "##TTrTTT=rT=bTTTTTTTTTb=TT.Tr.TT.##",
  "##====bT====TT=======TT=TT.bT....##",
  "##=TT=TbTTT=TT=TbTTT=TT=Tb.TTTTT.##",
  "##=Tb=TTTTT=TT=TTTTb=TT=TT.TTTTT.##",
  "##=TT=======Tr====TT====.T....TT.##",
  "##=TTTTTTTTTTTTTb=bTbTT..bTTT.TT.##",
  "##=TTTTTbTTTTTTTT=TTTbb.TTTTT.TT.##",
  "##=======TT====TT====TT.TT...fTT.##",
  "##TTT..b=TT=TT=TTTTT=TT.TT.fT.TT.##",
  "##TTT.TT=TT=TT=bTTbT=TT.TT.TTfTT.##",
  "##....TT=Tb=rT====.T=TT....TT...f##",
  "##.TTTTT=Tb=bTTTT=.T=rT.TTTTTTbT.##",
  "##.TTrTT=Tb=TTTTb=TT=bT.rTTTbTbT.##",
  "##.TT====.T=TT...=rT=TTf....f.k..##",
  "##.TT=TT..T=Tb.TT=sT=TrTTTTTTTTT.##",
  "##.Tr=TTrTT=rT.TT=TT=bTTTTTTTTTT.##",
  "##...=======TT...P===TT.....f.f.f##",
  "#################=#################",
  "#################V#################",
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
  // ÁRVORE BLOQUEIA. Ela é a "parede" desta área: o mapa é um labirinto de
  // corredores, e atravessar troncos acabaria com a leitura de corredor.
  // Arbusto, rocha, placa e a mata da borda também são sólidos.
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
