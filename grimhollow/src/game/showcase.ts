// MINI-SANTUÁRIO: um recinto pequeno e ARREDONDADO (não quadrado), com uma
// estátua/marco no centro, alcançado por uns poucos degraus (mantém a sensação
// de elevação). Teto ABERTO — o "vazio" lá em cima é escondido por uma NEBLINA
// vertical (bem densa no topo, fraquinha na altura do jogador).
export const SHOW_COLS = 13;
export const SHOW_ROWS = 16;
export const SHOW_RISE = 0.55; // altura de cada degrau
export const SHOW_TOP = 3; // nível do piso do santuário (3 degraus acima da entrada)
export const SHOW_CENTER = { c: 6, r: 5 }; // centro do círculo
export const SHOW_RADIUS = 2.2; // raio do santuário (em células) — recinto pequeno

const ENTR = { c0: 5, c1: 7, r0: 11, r1: 14 }; // corredor de entrada (nível 0)
const STEP = { c0: 5, c1: 7, r0: 8, r1: 10 }; // degraus (sobem p/ o santuário)

function dist(c: number, r: number): number {
  const dc = c - SHOW_CENTER.c, dr = r - SHOW_CENTER.r;
  return Math.sqrt(dc * dc + dr * dr);
}

export type ShowZone = "wall" | "entrance" | "stair" | "shrine";

export function showZone(c: number, r: number): ShowZone {
  if (dist(c, r) <= SHOW_RADIUS) return "shrine";
  if (c >= STEP.c0 && c <= STEP.c1 && r >= STEP.r0 && r <= STEP.r1) return "stair";
  if (c >= ENTR.c0 && c <= ENTR.c1 && r >= ENTR.r0 && r <= ENTR.r1) return "entrance";
  return "wall";
}

export function showWalkable(c: number, r: number): boolean {
  return showZone(c, r) !== "wall";
}

export function showLevelIdx(c: number, r: number): number {
  const z = showZone(c, r);
  if (z === "shrine") return SHOW_TOP;
  if (z === "stair") return Math.min(SHOW_TOP, 11 - r); // linha10→1, linha9→2, linha8→3
  return 0;
}

export function showFloorY(c: number, r: number): number {
  return showLevelIdx(c, r) * SHOW_RISE;
}

export const SHOW_SPAWN = { col: 6, row: 13 };
export const SHOW_EXIT = { col: 6, row: 14 }; // portal de volta (sul do spawn)
export const SHOW_STATUE = { col: 6, row: 5 }; // marco central
