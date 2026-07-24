// SALA-VITRINE: demonstra três recursos de ambientação numa área só —
//  (1) ESCADAS / níveis: a entrada (nível 0) sobe por uma escadaria de pedra até
//      um terraço alto; a câmera acompanha a altura ao andar.
//  (2) CLAREIRA aberta: além do terraço, uma sala de teto aberto (luz/névoa),
//      chão de terra, árvores e um marco central.
//  (3) PARTÍCULAS: poeira/esporos flutuando no ar (mais densos na clareira).
export const SHOW_COLS = 16;
export const SHOW_ROWS = 22;
export const SHOW_RISE = 0.55; // altura (unidades) de cada nível de escada
export const SHOW_TOP = 5; // nível do terraço e da clareira

type Rect = [number, number, number, number]; // x, y, w, h
const ENTRANCE: Rect = [5, 17, 6, 4]; // átrio de pedra (nível 0)
const STAIRS: Rect = [6, 12, 4, 5]; // escadaria (linhas 12–16, sobe p/ o norte)
const TERRACE: Rect = [3, 8, 10, 4]; // terraço de pedra (nível TOP)
const GROVE: Rect = [1, 1, 14, 7]; // clareira aberta (nível TOP), chão de terra

const inR = (r: Rect, c: number, ro: number) =>
  c >= r[0] && c < r[0] + r[2] && ro >= r[1] && ro < r[1] + r[3];

export type ShowZone = "wall" | "stone" | "stair" | "grove";

export function showZone(c: number, r: number): ShowZone {
  if (inR(GROVE, c, r)) return "grove";
  if (inR(TERRACE, c, r)) return "stone";
  if (inR(STAIRS, c, r)) return "stair";
  if (inR(ENTRANCE, c, r)) return "stone";
  return "wall";
}

export function showWalkable(c: number, r: number): boolean {
  return showZone(c, r) !== "wall";
}

// índice do nível do piso da célula (0 = átrio; sobe pela escada até SHOW_TOP)
export function showLevelIdx(c: number, r: number): number {
  if (inR(STAIRS, c, r)) return Math.min(SHOW_TOP, 17 - r); // linha16→1 … linha12→5
  if (inR(TERRACE, c, r) || inR(GROVE, c, r)) return SHOW_TOP;
  return 0;
}

// altura (Y) do piso da célula, em unidades de mundo
export function showFloorY(c: number, r: number): number {
  return showLevelIdx(c, r) * SHOW_RISE;
}

export function showIsGrove(c: number, r: number): boolean {
  return inR(GROVE, c, r);
}

export const SHOW_SPAWN = { col: 7, row: 19 };
export const SHOW_EXIT = { col: 7, row: 20 }; // portal de volta (sul do spawn)
export const SHOW_STATUE = { col: 8, row: 4 }; // marco central da clareira

// árvores da clareira (bordas + algumas internas) — bloqueiam a célula
export const SHOW_TREES: [number, number][] = [
  [1, 1], [3, 1], [5, 1], [8, 1], [11, 1], [13, 1], [14, 1],
  [1, 2], [4, 2], [11, 2], [14, 2],
  [1, 4], [14, 4], [1, 6], [14, 5],
  [2, 7], [12, 7],
];
