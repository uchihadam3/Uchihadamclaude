// Mapa da floresta (bioma externo).
//  '.' grama (andável)        '=' trilha de terra (andável)
//  'T' pinheiro (bloqueia)    'b' arbusto (bloqueia)      'r' rocha (bloqueia)
//  'f' folhagem/samambaia (decoração no chão, andável)
//  'k' pilha de caveiras (decoração no chão, andável)
//  'm' ponto de inimigo (andável)   'C' baú (andável até ser aberto)
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
// O labirinto é TRANÇADO em parte (um terço dos becos sem saída vira atalho),
// então há vários caminhos e explorar não vira sofrimento — mas os becos que
// SOBRAM têm baú ou ossada no fim. Beco vazio ensina o jogador a não entrar em
// beco nenhum, e aí o labirinto inteiro vira um corredor só.
//
// A TRILHA DE TERRA ('=') é o fio condutor: sai da entrada ao sul, passa pela
// ENCRUZILHADA e segue até os três marcos — norte (Planície de Arden), leste
// (Charco) e oeste (Vaurstead).
//
// ONDE MORA O PERIGO. Quase todo bicho está FORA da trilha, na grama; na trilha
// são poucos, e nenhum nas dez primeiras células. Assim quem só quer atravessar
// atravessa, e sair do caminho passa a ser uma decisão com preço e prêmio — em
// vez de um imposto cobrado de quem só queria chegar do outro lado.
//
// Gerado por `scripts/gen_outdoor.py` (semente fixa), que valida por BFS que a
// entrada, o portão, a encruzilhada e os três marcos continuam alcançáveis.
import { dentroDaGrade } from "./config";

export const FOREST: string[] = [
  "###################################",
  "#################N#################",
  "##........f.m..bT=======TT.f...f.##",
  "##.brTrTbTT.Tb.TTkTTTTT=TT.TTTTT.##",
  "##.rTTTTTTT.TT.Tb.TTTbT=TT.TTbTT.##",
  "##fTTkTT.m..TT...mbT====TT...kmTk##",
  "##kTT.TT.TTbTTTTTTTb=TTTTTbTTm.bT##",
  "##.TT.TT.TTbTbTTTTTb=TTTTrTTT.TTT##",
  "##.k.k.r..k==========TT====CT..km##",
  "##TTT.mTTTT=TTTrT=.TTTT=TT=CTTTT.##",
  "##TTT.TTTrT=TTTTT=TTTTb=TT=TTrTT.##",
  "##kTT....TT====Tb======mmb=======##",
  "##krTTTT.TTTTT=TTkTbTTTkmTTbrTTr=##",
  "##.TTbbT.TTTTb=TT.TTrTTbTrTTTTTT=##",
  "##.......TT====TbmTT....bT....Tb=##",
  "##frbTTT.TT=TTTTT.TT.TT.TT.TT.TT=##",
  "##.TTTTT.TT=bTTTT.TT.rT.TT.TT.TT=##",
  "##....TT.TTmbTkf.k.T.TT.TT.bT.TT=E#",
  "##.TT.TT.TT=TTTTT.mT.TT.bTbTT.TTk##",
  "##.rT.TT.TT=TTTTTbTb.TT.TTTTT.TT.##",
  "##.TT....TT=Tr.......TT.Tr...fTT.##",
  "##TTTTTbTTb=TT.TTTTTTbT.TT.bTTTT.##",
  "##bTTTTTbTT=TT.bTjTTbTT.bT.TTTTb.##",
  "##==========rb..m=kT.m..TT..f..m.##",
  "##=bTrTTTbbTTT.rT=.b.rTTTT.TTTTTT##",
  "##=brbTTTTTTTT.bT=Tb.TTTTT.bTTTTT##",
  "##=.ffm.....m..TT=bT.TTCf..TT....##",
  "##=TTTTTTTTTTrTTT=TT.TTTrT.rTmTT.##",
  "##=TTTbTTTbTTTTTT=TT.rTbTT.TT.bT.##",
  "#W=======TT=======TT..f.TT.TT.TT.##",
  "##TTTTTb=bT=TTTTTbTTTTT.TT.Tr.TT.##",
  "##rTTTrT=bT=TTTTTTTTbTTmTr.TT.bT.##",
  "##====TT====TTf..m...rT.Tb.TT..m.##",
  "##=TT=TTTTb=TT.TTTTT.TT.TTfTTTTT.##",
  "##=TT=TTTTT=TT.TTTTr.TT.rT.TTTTT.##",
  "##mTT=======mT....TTm...mT....TTk##",
  "##=TTTTTTTTkmTTTTfTTTTTf.bTTT.TT.##",
  "##=TTTTTTTTTTTTTT.TTTbTTTTTbT.TT.##",
  "##=TTC...TT===mTTf...TTCTTC..mTT.##",
  "##=bT.mT.TT=TT=TTTTT.TT.Tb.mT.rT.##",
  "##=TT.TT.bT=Tr=TTTTTfTTfTb.TT.TT.##",
  "##=...TTmTT=Tb====.T.TT....bT..f.##",
  "##=TTbTb.TT=TbTbT=.T.TT.TTTTTrTT.##",
  "##=TTTTTfTT=rTTTT=TT.TT.bTTTTTrT.##",
  "##=TT....Tb=TT...=rTkrT...m....f.##",
  "##mTT.TTTTT=TTfTr=sT.TT.TTTTTTTTf##",
  "##=Tr.TTTTb=TT.TT=TT.TT.TTTTTTTT.##",
  "##==========TT...P...TT..........##",
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
  | "spawn"
  | "enemy"
  | "chest";

export function forestCell(col: number, row: number): ForestCell {
  if (!dentroDaGrade(col, row, FOREST_COLS, FOREST_ROWS)) return "edge";
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
    // 'm' e não 'E': o 'E' aqui já é o MARCO DO LESTE, e trocar o marco
    // quebraria a placa que já está escrita no forestSignText.
    case "m":
      return "enemy";
    case "C":
      return "chest";
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
    k === "spawn" ||
    k === "enemy" ||
    // o baú é ANDÁVEL no mapa e quem bloqueia a célula é o Game (como na
    // masmorra): assim abrir o baú é liberar a passagem, sem mexer no mapa
    k === "chest"
  );
}

/** todas as células de um caractere (ex.: todos os 'm' de inimigo). */
export function forestAll(ch: string): { col: number; row: number }[] {
  const out: { col: number; row: number }[] = [];
  for (let r = 0; r < FOREST_ROWS; r++)
    for (let c = 0; c < FOREST_COLS; c++)
      if (FOREST[r][c] === ch) out.push({ col: c, row: r });
  return out;
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
        "Norte: Planície de Arden · Oeste: as Ruínas de Vaurstead · Leste: o Charco.",
        "Alguém riscou a palavra VAURSTEAD com a ponta de uma faca. Várias vezes.",
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
      // Este texto só aparece ENQUANTO a trilha está fechada — assim que o Leviatã
      // cai, o Game troca a placa pela passagem (ver facingTarget). Por isso ele diz
      // por que está fechada, e não "em breve": quem lê isto ainda não terminou o
      // Ato II, e a frase é uma promessa que o jogo vai cumprir.
      return [
        "Trilha de Vaurstead.",
        "A tábua é velha e o nome foi escrito por cima de outro, apagado a fogo.",
        "Pedra lavrada espreita entre as árvores a oeste — muros, e muros são cidade.",
        "O mato fechou o caminho. Ninguém daqui abre essa trilha por vontade própria.",
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
