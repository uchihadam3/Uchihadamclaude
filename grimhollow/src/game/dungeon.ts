// Masmorra FIXA (nível 1). Crawler DENSO: salas PEQUENAS ligadas por uma rede de
// corredores estreitos (com loops). As salas GRANDES ficam SELADAS atrás de portões
// (tesouro atrás do 'G', santuário atrás do 'L') — reservadas p/ BOSSES no futuro.
// Há ainda uma SALA SECRETA alcançável por uma PAREDE ILUSÓRIA (o 'X', que parece
// rocha mas é atravessável).
//   '#' rocha/parede (bloqueia)      '.' piso (andável)
//   'S' entrada (spawn, desceu a escada)   'U' escada de volta ao vilarejo
//   'E' ponto de inimigo    'C' baú (tesouro)   'K' ossada    'B' barril
//   'X' parede ILUSÓRIA (parece sólida, mas dá passagem ao segredo)
//   'G' PORTÃO de grade — sela um corredor 1-largura que dá p/ tesouro (abre ao interagir)
const FLOOR1: string[] = [
  "############################################",
  "############################################",
  "############################################",
  "##################...U..####################",
  "####.....#########......#######.....########",
  "####...C..E..........EB.....E....E..########",
  "####..E..............S..............########",
  "####...K.#########......#######.....########",
  "######..############..##########..##########",
  "######..############..##########..##########",
  "####.....###########..########.....#########",
  "####......E........#..##.....#.....#########",
  "####..E........K..........E..#..E###########",
  "####.....#####..E..#####...B.#...#......####",
  "######..######.....#####.....##.##......####",
  "######..#######..#########..###.##......####",
  "######..#######..#########..###..G......####",
  "######..#######..#########..######....C.####",
  "######..######.....#######..######......####",
  "####.....#####..E..#####.....###############",
  "####..E.........C.......E.E..###############",
  "####..K............#####.....###############",
  "####.....#######..######.....###############",
  "######..########..########.#################",
  "######..#######.....######.#################",
  "######.........B....######.#################",
  "######..#######..E..######.#################",
  "######..#######.....######.#################",
  "####.....#####.....#######.####........#####",
  "####..E.........E..############........#####",
  "####...........K..............L.A......#####",
  "####.....#####.....##########.#........#####",
  "######..#########.#############........#####",
  "######..#########.#############..###########",
  "######..######......########################",
  "####.....D.###..E...##############......####",
  "####...E.E.......................X....C.####",
  "####.....B..........##############......####",
  "####.......#######################......####",
  "############################################",
];

// ---- ANDAR 2 · As Catacumbas (corredores + criptas) ----
//   'D' escada DE DESCIDA (para o próximo andar)   'U' escada de subida (andar acima)
const FLOOR2: string[] = [
  "############################################",
  "############################################",
  "############################################",
  "##################........##################",
  "##################...U....##################",
  "##################........##################",
  "##################...S....##################",
  "##################........##################",
  "#####################.######################",
  "######...E.....######.#######.....E...######",
  "######..C......######.#######.....E...######",
  "######............................E...######",
  "######......E..######.#######.......C.######",
  "######...K.....######.#######..B......######",
  "######.........######.........E.......######",
  "#################D.........#################",
  "#################.....E....#################",
  "#################...E......#################",
  "#######.................K........E.....#####",
  "#######.#########..........###########.#####",
  "#######.#########..........###########.#####",
  "#######.#############.################.#####",
  "#######.#############.################.#####",
  "#######.#############.################.#####",
  "#######.#############.################.#####",
  "#######.#############.################.#####",
  "#######.#############.################.#####",
  "#######.#############.################.#####",
  "#####........########.################.#####",
  "#####........########.##########...E.....###",
  "#####..E.....########.##########.......B.###",
  "#####.....C..########.##########...E.....###",
  "#####.K......########.##########......E..###",
  "#####.......E.................E..........###",
  "#################..........#####.........###",
  "#################..E.......#################",
  "#################..........#################",
  "#################..........#################",
  "############################################",
  "############################################",
];

// ---- ANDAR 3 · Cripta do Chefe (BIOMA muda; arena aberta) ----
//   'Z' o CHEFE   'C' tesouro do chefe (atrás dele)
const FLOOR3: string[] = [
  "############################################",
  "############################################",
  "############################################",
  "###################......###################",
  "###################..U...###################",
  "###################......###################",
  "###################..S...###################",
  "#####################.######################",
  "#####################.######################",
  "#####################E######################",
  "#################...E.....##################",
  "#################.E....E..##################",
  "#################.......E.##################",
  "#################..E......##################",
  "#####################G######################",
  "########............................########",
  "########............................########",
  "########.............K..............########",
  "########............................########",
  "########.....##..............##.....########",
  "########.....##..............##.....########",
  "########............................########",
  "########....K.......................########",
  "########............................########",
  "########.......................K....########",
  "########............................########",
  "########.....##..............##.....########",
  "########.....##......Z.......##.....########",
  "########............................########",
  "########............................########",
  "########............................########",
  "########............................########",
  "#####################.######################",
  "##################.......###################",
  "##################.C.C.C.###################",
  "##################..###..###################",
  "##################..#D#..###################",
  "##################.......###################",
  "############################################",
  "############################################",
];

// ============================ ATO II — "As Catacumbas Afogadas" (andares 4–6) ==
// MESMA engine de corredor do Ato I (o usuário pediu: mesma ESTRUTURA, TEMÁTICA
// diferente). A troca de bioma vem do tileset (tex_a2*) + roster (afogado/limo/
// naja/aberração) + cogumelos bioluminescentes — ligados por ATO no Game.
// FLOOR4 reaproveita a planta do 2º andar; FLOOR5 é ela ESPELHADA (variação
// grátis, conectividade preservada); FLOOR6 é a arena do chefe (Leviatã Afogado).
const mirrorMap = (m: string[]): string[] => m.map((row) => row.split("").reverse().join(""));
const FLOOR4: string[] = FLOOR2.slice();
const FLOOR5: string[] = mirrorMap(FLOOR2);
// ---- ANDAR 6 · Covil do Leviatã + a CÂMARA SELADA ----
// A planta do 3º andar (é o fundo, então sem escada de descida) com uma ala nova
// carvada na parede LESTE: a Câmara Selada.
//
//   'P' PLACA DE PRESSÃO   'V' porta selada   'Y' o Guardião do Selo
//
// As duas placas ficam a OITO casas uma da outra, nas pontas da arena. Isso não é
// decoração: é a regra. Ninguém alcança as duas sozinho, e é essa impossibilidade
// que faz a câmara existir — o resto do jogo inteiro dá p/ terminar só.
const FLOOR6: string[] = [
  "############################################",
  "############################################",
  "############################################",
  "###################......###################",
  "###################..U...###################",
  "###################......###################",
  "###################..S...###################",
  "#####################.######################",
  "#####################.######################",
  "#####################E######################",
  "#################...E.....##################",
  "#################.E....E..##################",
  "#################.......E.##################",
  "#################..E......##################",
  "#####################G######################",
  "########............................########",
  "########............................########",
  "########.............K............P.########",
  "########............................##.....#",
  "########.....##..............##.....##.C.C.#",
  "########.....##..............##.....##.....#",
  "########............................V...Y..#",
  "########....K.......................##.....#",
  "########............................##.....#",
  "########.......................K....##.....#",
  "########..........................P.########",
  "########.....##..............##.....########",
  "########.....##......Z.......##.....########",
  "########............................########",
  "########............................########",
  "########............................########",
  "########............................########",
  "#####################.######################",
  "##################.......###################",
  "##################.C.C.C.###################",
  "##################..###..###################",
  "##################..#.#..###################",
  "##################.......###################",
  "############################################",
  "############################################",
];

// os 6 andares, do topo (1) ao fundo (6). Todos com a MESMA dimensão.
export const DUNGEON_FLOORS: string[][] = [FLOOR1, FLOOR2, FLOOR3, FLOOR4, FLOOR5, FLOOR6];
export const DUNGEON_FLOOR_COUNT = DUNGEON_FLOORS.length;
export const DUNGEON_FLOOR_NAMES = [
  "Masmorra — 1º Andar", "Catacumbas — 2º Andar", "Cripta do Chefe — 3º Andar",
  "Catacumbas Afogadas — 4º Andar", "Gruta Fúngica — 5º Andar", "Covil do Leviatã — 6º Andar",
];

// andar atual (0..2). O Game troca com setDungeonFloor antes de montar/mover.
let curFloor = 0;
export function setDungeonFloor(f: number): void {
  curFloor = Math.max(0, Math.min(DUNGEON_FLOOR_COUNT - 1, f | 0));
}
export function getDungeonFloor(): number {
  return curFloor;
}
// o mapa (linhas) do andar atual
function curMap(): string[] {
  return DUNGEON_FLOORS[curFloor];
}

export const DUNGEON_ROWS = FLOOR1.length;
export const DUNGEON_COLS = FLOOR1[0].length;

export type DungeonCell =
  | "wall"
  | "floor"
  | "spawn"
  | "stairs" // escada de SUBIDA ('U') — andar 1 volta ao vilarejo; 2/3 sobem um andar
  | "down" // escada de DESCIDA ('D') — desce para o próximo andar
  | "enemy"
  | "boss" // o CHEFE do 3º andar
  | "chest"
  | "bones"
  | "barrel"
  | "gate" // portão de grade: sela um corredor (bloqueia até ser aberto)
  | "lockgate" // portão SELADO (não abre) — esconde a entrada do santuário
  | "sanctuary" // portal/entrada do SANTUÁRIO (leva à sala-vitrine)
  | "plate" // PLACA DE PRESSÃO: as duas juntas quebram o selo da câmara
  | "sealdoor" // porta da CÂMARA SELADA (só cede com as duas placas pisadas)
  | "guardian" // o CHEFE da câmara selada
  | "secret"; // parede ilusória: renderiza como rocha, mas é andável

export function dungeonChar(col: number, row: number): string {
  if (row < 0 || row >= DUNGEON_ROWS || col < 0 || col >= DUNGEON_COLS) return "#";
  return curMap()[row][col];
}

export function dungeonCell(col: number, row: number): DungeonCell {
  switch (dungeonChar(col, row)) {
    case ".":
      return "floor";
    case "S":
      return "spawn";
    case "U":
      return "stairs";
    case "D":
      return "down";
    case "E":
      return "enemy";
    case "Z":
      return "boss";
    case "P":
      return "plate";
    case "V":
      return "sealdoor";
    case "Y":
      return "guardian";
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
  // A porta da câmara é "chão" aqui de propósito: quem sela a passagem é o Game
  // (ele bloqueia a célula até as placas cederem). Assim quebrar o selo é só
  // liberar a célula, sem mexer no mapa.
  return dungeonCell(col, row) !== "wall";
}

// para o RENDER das paredes: o 'X' conta como parede (parece rocha sólida).
export function dungeonSolidLook(col: number, row: number): boolean {
  const k = dungeonCell(col, row);
  return k === "wall" || k === "secret";
}

export function dungeonFind(ch: string): { col: number; row: number } {
  const map = curMap();
  for (let r = 0; r < DUNGEON_ROWS; r++) {
    const c = map[r].indexOf(ch);
    if (c >= 0) return { col: c, row: r };
  }
  return { col: 21, row: 36 };
}

// todas as células de um tipo (ex.: todos os 'E' de inimigo) — no andar atual
export function dungeonAll(ch: string): { col: number; row: number }[] {
  const out: { col: number; row: number }[] = [];
  const map = curMap();
  for (let r = 0; r < DUNGEON_ROWS; r++)
    for (let c = 0; c < DUNGEON_COLS; c++)
      if (map[r][c] === ch) out.push({ col: c, row: r });
  return out;
}
