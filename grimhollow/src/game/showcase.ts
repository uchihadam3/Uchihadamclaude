// TORRE DA ESPIRAL → TERRAÇO ABERTO: uma rampa em espiral quadrada sobe UMA volta
// completa (16 degraus) em torno de um núcleo central maciço. No topo do núcleo
// fica o SANTUÁRIO: um terraço REDONDO e ABERTO com grama, estátua ao centro e
// toda a neblina (igual ao santuário antigo). Sobe-se a torre e encontra-se o altar.

export const SHOW_COLS = 13;
export const SHOW_ROWS = 13;
export const SHOW_RISE = 0.55; // altura de cada degrau/nível

// RAMPA (16 células, nível = ordem): anel externo do bloco 5x5 (cols 4..8, rows 3..7).
// nível 0 = entrada (canto sul-leste), nível 15 = topo (conecta ao terraço).
const RAMP: [number, number][] = [
  [8, 7], [7, 7], [6, 7], [5, 7], [4, 7], // base → oeste
  [4, 6], [4, 5], [4, 4], [4, 3],         // sobe lado oeste
  [5, 3], [6, 3], [7, 3], [8, 3],         // topo do anel → leste
  [8, 4], [8, 5], [8, 6],                 // desce (sobe) lado leste → conecta ao terraço
];
// TERRAÇO/SANTUÁRIO (nível 16): núcleo central 3x3 (cols 5..7, rows 4..6), tudo plano.
const PLATEAU: [number, number][] = [
  [5, 4], [6, 4], [7, 4], [5, 5], [6, 5], [7, 5], [5, 6], [6, 6], [7, 6],
];
// túnel de entrada (nível 0), ao sul da base da torre
const CORRIDOR: [number, number][] = [[8, 8], [8, 9], [8, 10], [8, 11]];

const TOP = RAMP.length; // 16 — nível do terraço
const LEVELS = new Map<string, number>();
RAMP.forEach(([c, r], i) => LEVELS.set(`${c},${r}`, i));
for (const [c, r] of PLATEAU) LEVELS.set(`${c},${r}`, TOP);
for (const [c, r] of CORRIDOR) if (!LEVELS.has(`${c},${r}`)) LEVELS.set(`${c},${r}`, 0);
const PLATEAU_SET = new Set(PLATEAU.map(([c, r]) => `${c},${r}`));

export const SHOW_TOP = TOP; // 16 — nível do terraço/santuário
export const SHOW_CENTER = { c: 6, r: 5 }; // centro do terraço (estátua)
export const SHOW_RADIUS = 1.9; // raio do disco de grama (em células)

export type ShowZone = "wall" | "ramp" | "shrine";

export function showZone(c: number, r: number): ShowZone {
  if (PLATEAU_SET.has(`${c},${r}`)) return "shrine";
  return LEVELS.has(`${c},${r}`) ? "ramp" : "wall";
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

// true no terraço aberto do topo (grama + neblina, sem teto).
export function showIsShrine(c: number, r: number): boolean {
  return PLATEAU_SET.has(`${c},${r}`);
}

// true no túnel de entrada (teto baixo de caverna), não na torre aberta.
export function showIsCorridor(c: number, r: number): boolean {
  return r >= 8;
}

export const SHOW_SPAWN = { col: 8, row: 10 };
export const SHOW_EXIT = { col: 8, row: 11 }; // portal de volta (sul do spawn)
export const SHOW_STATUE = { col: 6, row: 5 }; // marco central (terraço)
