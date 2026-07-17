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
// Mata GRANDE e aberta (35x50): muralha DUPLA de árvores ('#') veda toda a
// borda, e o interior é arejado — mais grama e clareiras que árvores, com
// bosques em manchas. A entrada ao sul sobe por uma TRILHA SINUOSA até uma
// ENCRUZILHADA central, de onde partem caminhos tortuosos p/ o norte
// (Montanhas), leste (Charco) e oeste (Ruínas) — cada ponta termina num marco
// de local futuro. Como as árvores são andáveis, as trilhas são guias; a
// neblina do jogo cobre a distância. Espaço reservado p/ coleta futura
// (cortar árvore, quebrar pedra, pescar, colher ervas).
export const FOREST: string[] = [
  "###################################",
  "###################################",
  "##T...f...TrTTbT.NTTTTTT.T...bf.T##",
  "##T...TTTf.TTf..T===TTfT..Tr.TTTf##",
  "##Tb.f.TTTT.......T==.TTTrTT...T.##",
  "##f....T..T..TrT.bT==.b.TTTTT.T.T##",
  "##.b..T..T..r.T.T.T=.T....TTTTTTT##",
  "##......TT....T.rk.=TT..TfTb..T..##",
  "##frT..TTT.T...T.rT===.bT..T.TT.T##",
  "##.f.kT.TT.rT..rT.==r.TTfT.fTr..T##",
  "##TT.TTTTrTTTTTT.==...TT..T.TTT.T##",
  "##T..TTTbTT.bT....=.Tff..TbTf.TT.##",
  "##T..Tfb..b.k.T..======.TTTT....f##",
  "##.TTT.T....rTT..=..Tk..TT..T.T..##",
  "##...TT......bkT.=.kT.f...r.T.TT.##",
  "##...TfT...T.T.r==..TTTbT..k..TT.##",
  "##.TTTT.T..r.bbT=T.T...r....TTb.T##",
  "##.f.T..T..TTf..===.T.TT.....TrbT##",
  "##..TTTbTT.bT.T===TTTT.bT.......T##",
  "##.fk.T.T....TTT.=.....T...rT.TTT##",
  "##...T..T.b.TTkT==.TT.TfTf...TT..##",
  "##.rTT..TTT.Tr.=====rT....T..TT=E##",
  "##r.TT.T..TT..T===TbTTbTT...T.r.=##",
  "##.TT.TfT....TT.T=rf.rTT.T...T===##",
  "##T....rf.T..bT..==..TfT..Tk=====##",
  "##T..Tff.TrTTTT...==.TT..T..=Tk.T##",
  "##T.TTb==========j===========..Tf##",
  "##..TT==.TfTT.T.==...r.TTTTrTT.bb##",
  "##T.b==TT.rr.Tr..==.TT.TTT.TT..Tb##",
  "##T======.TTr..T.==T.T...k.f.T...##",
  "##===.brb.....bTT=.TT.T..r.T.T..T##",
  "##W==TT.T.r.rTr===....rf.ffb.TTTT##",
  "##..T.T.....k..===.Tk.Tr.Tf.f..TT##",
  "##TT..TTT.T.TT==TTTrTTk.r..T.T.r.##",
  "##T......r..TT=T.TTT.TTT.rf...T.T##",
  "##.r....T.T.TT=TTT..TTkr.T.T..bbT##",
  "##rk....fT.T.T==.rrb..T..r.T..Tr.##",
  "##TTTb..Tf....=TbTrT..T..TTrT..f.##",
  "##...T.b....TT====fT..T.T..T.T...##",
  "##T..........T...=..Tf.T.T..T..fk##",
  "##r.T..Tf........=T.....T...TTb.T##",
  "##TTT.TTbT.bTT...===.T.......TbT.##",
  "##.T.T....TTTbT..==T.T......TTTTT##",
  "##.T..T...TTTf.T====..k..T.b..krT##",
  "##bT.TTT.kTr.....==.TT.T.TTb.T.r.##",
  "##TT.TbrT....T..r==T...bb.f..T...##",
  "##..b.TTTrT.rf=s.===TTf..T.TTT.rr##",
  "##..rTT.TTTTTr.r.P...TTT..T..T.b.##",
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
