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
// Mata GRANDE e aberta (31x44): muralha DUPLA de árvores ('#') veda toda a
// borda, e o interior é arejado — mais grama e clareiras que árvores, com
// bosques em manchas. A entrada ao sul sobe por uma TRILHA SINUOSA até uma
// ENCRUZILHADA central, de onde partem caminhos tortuosos p/ o norte
// (Montanhas), leste (Charco) e oeste (Ruínas) — cada ponta termina num marco
// de local futuro. Como as árvores são andáveis, as trilhas são guias; a
// neblina do jogo cobre a distância. Espaço reservado p/ coleta futura
// (cortar árvore, quebrar pedra, pescar, colher ervas).
export const FOREST: string[] = [
  "###############################",
  "###############################",
  "##T...f...TrTT=N.rTTTTTT.T...##",
  "##bf.TT...TTTf==Tf..fT..TTTT.##",
  "##.Tr.TTTTTb.f==TTT.......T.T##",
  "##.TfTrTT...f.=....T..T..TrT.##",
  "##bTT..T.TTTTT=T.T.T..T..T..r##",
  "##.T.T.T..T...=====TTT......T##",
  "##b....T.rk..Tb==TTTb..f..frT##",
  "##..TTT.T...T.r=TTb.bT..T.fT.##",
  "##T.f.kT.TT.rT.=rT...r.TTTT.T##",
  "##Tr..T...TTTTr=TTTTT.Tr...TT##",
  "##..T......T..T==bTT.bT..T...##",
  "##TTT.....f.TT.==.ffb.b..k.T.##",
  "##T.TTfT..TTTT.=..f.TT.......##",
  "##rTT.....Tk..T=..f.T.....TT.##",
  "##f.Tr.bkT.f.kT=f...r....T...##",
  "##.TfT..TT.T.r.=..TTTbT.fk..T##",
  "##T..TTTT.TT.r.=======...r.=E##",
  "##.TTb.T.T.T..T=.TTT...=====f##",
  "##fk.fTrTrbT...====T.TT.T===T##",
  "##TTT.bTT.T....=..k.T.T..=.TT##",
  "##T.T.=========j===========.b##",
  "##.TT===T.TT...=....TT...rTT.##",
  "##.T==.Tr.r.T..=.....T..TTTTr##",
  "##.==.T..TT..T.==TbTTbTT...T.##",
  "##W==.ff.TfT..==TT.TTrf.rTT.T##",
  "##...T.rTT..===T.T..bfTTT.T.T##",
  "##TT..Tk.T.T=T..TfT.TrTTTTTT.##",
  "##...TT..T..==k.TT.bTbTTb.fTT##",
  "##.bTT..T.T.=.T.T..TT..TT.b.T##",
  "##fTT.TT....=r.TTTTrTT.bbT.bT##",
  "##.fT.r.....===TfT.TTT.TT..Tb##",
  "##T.TTT....T===T..TT.....k.f.##",
  "##f...T...brb.==..bT......T..##",
  "##r.T.T..TT.TT==T.r.r...TT...##",
  "##.rT.TTb.TTTb.=T.T.....k..r.##",
  "##..Tk.Tr.TT.T.==TTT..TTT.T.T##",
  "##T..TTfrfTk.r.=T.T.r.T......##",
  "##r..TT.T.fTT.=====f...T.T.r.##",
  "##...T.T.TT.=s=..TTkr.T.T..bb##",
  "##Trk....fT.T.=PT.rrb..T..r.T##",
  "###############=###############",
  "###############V###############",
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
  // "tree" é andável: o jogador passa entre/por dentro das árvores do interior
  // (o paredão da borda é "edge", que continua bloqueando). Arbustos, rochas e
  // placas continuam sólidos.
  return (
    k === "grass" ||
    k === "path" ||
    k === "tree" ||
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
