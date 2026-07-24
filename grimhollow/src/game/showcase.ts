// TORRE DA ESPIRAL: uma grande escadaria em ESPIRAL QUADRADA que sobe girando
// em torno de um pináculo central. O jogador entra por um túnel ao sul, emerge na
// base da torre e sobe ~2 voltas completas até o cume, onde fica a estátua/marco.
// Topo ABERTO ao "céu" enevoado; as voltas encostadas viram as paredes do poço
// central (a regra de "1 nível por passo" impede pular de uma volta pra outra).

export const SHOW_COLS = 13;
export const SHOW_ROWS = 13;
export const SHOW_RISE = 0.55; // altura de cada degrau/nível

// Caminho da espiral (ordem = nível). Espiral quadrada densa 5x5 (cols 4..8,
// rows 3..7); nível 0 = entrada (canto sul-leste), nível 24 = cume (centro).
const PATH: [number, number][] = [
  [8, 7], [7, 7], [6, 7], [5, 7], [4, 7], // volta externa (base) → oeste
  [4, 6], [4, 5], [4, 4], [4, 3],         // sobe pelo lado oeste
  [5, 3], [6, 3], [7, 3], [8, 3],         // topo → leste
  [8, 4], [8, 5], [8, 6],                 // lado leste
  [7, 6], [6, 6], [5, 6],                 // volta interna
  [5, 5], [5, 4],
  [6, 4], [7, 4],
  [7, 5],
  [6, 5], // CUME (estátua)
];
// túnel de entrada (nível 0), ao sul da base da torre
const CORRIDOR: [number, number][] = [[8, 8], [8, 9], [8, 10], [8, 11]];

const LEVELS = new Map<string, number>();
PATH.forEach(([c, r], i) => LEVELS.set(`${c},${r}`, i));
for (const [c, r] of CORRIDOR) if (!LEVELS.has(`${c},${r}`)) LEVELS.set(`${c},${r}`, 0);

export const SHOW_TOP = PATH.length - 1; // 24 — nível do cume (estátua)
export const SHOW_CENTER = { c: 6, r: 5 }; // pináculo central (estátua)
export const SHOW_RADIUS = 2.2; // (mantido p/ compat.)

export type ShowZone = "wall" | "path" | "summit";

export function showZone(c: number, r: number): ShowZone {
  if (c === SHOW_CENTER.c && r === SHOW_CENTER.r) return "summit";
  return LEVELS.has(`${c},${r}`) ? "path" : "wall";
}

export function showWalkable(c: number, r: number): boolean {
  return LEVELS.has(`${c},${r}`);
}

export function showLevelIdx(c: number, r: number): number {
  return LEVELS.get(`${c},${r}`) ?? 0;
}

export function showFloorY(c: number, r: number): number {
  return showLevelIdx(c, r) * SHOW_RISE;
}

// true se a célula faz parte do túnel de entrada (teto baixo), não da torre aberta.
export function showIsCorridor(c: number, r: number): boolean {
  return r >= 8;
}

export const SHOW_SPAWN = { col: 8, row: 10 };
export const SHOW_EXIT = { col: 8, row: 11 }; // portal de volta (sul do spawn)
export const SHOW_STATUE = { col: 6, row: 5 }; // marco central (cume)
