// MINI-SANTUÁRIO com ESCADARIA SINUOSA: uma grande escada de pedra que sobe em
// LANCES com CURVAS (switchbacks), estilo Souls, dentro de um recinto fechado de
// pedra. No topo, o santuário ARREDONDADO com a estátua. Teto ABERTO no santuário
// (escondido por neblina vertical densa).

export const SHOW_COLS = 13;
export const SHOW_ROWS = 26;
export const SHOW_RISE = 0.55; // altura de cada degrau/nível
export const SHOW_CENTER = { c: 6, r: 4 }; // centro do círculo (topo)
export const SHOW_RADIUS = 2.3; // raio do santuário (em células)

// Segmentos que compõem o caminho. Cada um é um retângulo de células.
//  kind 'flat'   → piso plano no nível lvl.
//  kind 'stairN' → degraus subindo para o NORTE (r maior = mais baixo). O nível
//                  de cada linha = lvl + (r1 - r), então r1 é o degrau mais baixo.
type Seg = { c0: number; c1: number; r0: number; r1: number; kind: "flat" | "stairN"; lvl: number };

const SEGS: Seg[] = [
  { c0: 5, c1: 7, r0: 22, r1: 24, kind: "flat", lvl: 0 },   // base / spawn
  { c0: 5, c1: 7, r0: 18, r1: 21, kind: "stairN", lvl: 1 }, // Lance 1 (N): r21=1 .. r18=4
  { c0: 5, c1: 9, r0: 16, r1: 17, kind: "flat", lvl: 4 },   // Patamar 1 (alarga p/ leste)
  { c0: 7, c1: 9, r0: 12, r1: 15, kind: "stairN", lvl: 5 }, // Lance 2 (N, deslocado leste): r15=5 .. r12=8
  { c0: 4, c1: 9, r0: 10, r1: 11, kind: "flat", lvl: 8 },   // Patamar 2 (alarga p/ oeste)
  { c0: 5, c1: 7, r0: 7, r1: 9, kind: "stairN", lvl: 9 },   // Lance 3 (N): r9=9, r8=10, r7=11
];

const SHOW_TOP = 11; // nível do piso do santuário (= topo do Lance 3)
export { SHOW_TOP };

function dist(c: number, r: number): number {
  const dc = c - SHOW_CENTER.c, dr = r - SHOW_CENTER.r;
  return Math.sqrt(dc * dc + dr * dr);
}

export type ShowZone = "wall" | "stair" | "shrine";

function segAt(c: number, r: number): Seg | null {
  for (const s of SEGS) {
    if (c >= s.c0 && c <= s.c1 && r >= s.r0 && r <= s.r1) return s;
  }
  return null;
}

export function showZone(c: number, r: number): ShowZone {
  if (dist(c, r) <= SHOW_RADIUS) return "shrine";
  if (segAt(c, r)) return "stair";
  return "wall";
}

export function showWalkable(c: number, r: number): boolean {
  return showZone(c, r) !== "wall";
}

export function showLevelIdx(c: number, r: number): number {
  if (dist(c, r) <= SHOW_RADIUS) return SHOW_TOP;
  const s = segAt(c, r);
  if (!s) return 0;
  if (s.kind === "stairN") return s.lvl + (s.r1 - r);
  return s.lvl;
}

export function showFloorY(c: number, r: number): number {
  return showLevelIdx(c, r) * SHOW_RISE;
}

// true se a célula é um degrau de escada (para renderizar sub-degraus de pedra).
export function showIsStair(c: number, r: number): boolean {
  const s = segAt(c, r);
  return !!s && s.kind === "stairN";
}

export const SHOW_SPAWN = { col: 6, row: 23 };
export const SHOW_EXIT = { col: 6, row: 24 }; // portal de volta (sul do spawn)
export const SHOW_STATUE = { col: 6, row: 4 }; // marco central
