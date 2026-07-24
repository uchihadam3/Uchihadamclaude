// TORRE DA ESPIRAL REDONDA → CORREDOR → TERRAÇO ABERTO.
// A ESCADA é uma HÉLICE (redonda): percorrida por "estações" (só frente/trás, a
// câmera gira acompanhando a curva). No topo, um corredor leva a um TERRAÇO
// ABERTO com grama e estátua, onde o jogador volta a se mover NORMAL (em grade:
// vira, anda livre, dá a volta na estátua). Coordenadas de MUNDO; o terraço fica
// alinhado à grade (col*CELL, row*CELL) para reaproveitar o movimento normal.

export type Station = { x: number; y: number; z: number; yaw: number };

// ---- parâmetros geométricos (unidades de mundo) ----
export const HELIX_CX = 24;
export const HELIX_CZ = 23; // centro da hélice (topo cai em z=28 = row 7)
export const HELIX_RP = 5.0;
export const HELIX_INNER = 2.6;
export const HELIX_OUTER = 7.4;
export const HELIX_STEPS = 24;
export const HELIX_TURNS = 2;
export const HELIX_TOP = 12;
const RISE = HELIX_TOP / HELIX_STEPS;
const DTH = (Math.PI * 2 * HELIX_TURNS) / HELIX_STEPS;
const TH0 = Math.PI / 2;
export const TERRACE_Y = HELIX_TOP; // o terraço é plano nessa altura

// yaw p/ olhar em (dx,dz): viewDir = (-sinθ,-cosθ) → θ = atan2(-dx,-dz)
function yawTo(dx: number, dz: number): number {
  return Math.atan2(-dx, -dz);
}

function buildStations(): Station[] {
  const st: Station[] = [];
  for (let i = 0; i <= HELIX_STEPS; i++) {
    const th = TH0 + i * DTH;
    st.push({
      x: HELIX_CX + HELIX_RP * Math.cos(th),
      y: i * RISE,
      z: HELIX_CZ + HELIX_RP * Math.sin(th),
      yaw: yawTo(-Math.sin(th), Math.cos(th)), // tangente ASCENDENTE
    });
  }
  // corredor reto (oeste) no topo, plano — termina na "boca" (mouth) alinhada à grade
  const topTh = TH0 + HELIX_STEPS * DTH;
  const cx0 = HELIX_CX + HELIX_RP * Math.cos(topTh); // = HELIX_CX
  const cz0 = HELIX_CZ + HELIX_RP * Math.sin(topTh); // = HELIX_CZ + RP = 28
  const yawW = yawTo(-Math.sin(topTh), Math.cos(topTh));
  for (let k = 1; k <= 4; k++) st.push({ x: cx0 - 2 * k, y: HELIX_TOP, z: cz0, yaw: yawW });
  return st;
}

export const STATIONS: Station[] = buildStations();
export const SHOW_LAST = STATIONS.length - 1; // "boca" (mouth) — topo do caminho da escada
export const MOUTH_YAW = STATIONS[SHOW_LAST].yaw; // oeste (= facing 3)

// ---- TERRAÇO em GRADE (movimento normal) ----
export const CELL_W = 4; // = CELL do jogo (para alinhar mundo↔grade)
export const MOUTH = { c: 4, r: 7 }; // boca da escada (station), mundo (16,28)
export const ENTRY = { c: 3, r: 7 }; // 1ª célula do terraço (a oeste da boca)
export const SHOW_STATUE = { col: 2, row: 7 }; // estátua ao centro do terraço, mundo (8,28)
const TERRACE = new Set<string>();
for (let r = 6; r <= 8; r++)
  for (let c = 1; c <= 3; c++)
    if (!(c === SHOW_STATUE.col && r === SHOW_STATUE.row)) TERRACE.add(`${c},${r}`);

export function terraceWalkable(c: number, r: number): boolean {
  return TERRACE.has(`${c},${r}`);
}
export function isMouth(c: number, r: number): boolean {
  return c === MOUTH.c && r === MOUTH.r;
}
export function terraceCells(): [number, number][] {
  return [...TERRACE].map((k) => k.split(",").map(Number) as [number, number]);
}

// mundo do terraço/estátua/corredor (p/ render)
export const SHOW_STATUE_W = { x: SHOW_STATUE.col * CELL_W, z: SHOW_STATUE.row * CELL_W, y: HELIX_TOP };
export const SHRINE_CX = SHOW_STATUE.col * CELL_W;
export const SHRINE_CZ = SHOW_STATUE.row * CELL_W;
export const SHRINE_RADIUS = 7.0;
export const CORR_X0 = HELIX_CX; // topo da hélice (leste)
export const CORR_X1 = MOUTH.c * CELL_W - 2; // fim do corredor (oeste, junto ao terraço)
export const CORR_Z = HELIX_CZ + HELIX_RP; // 28

export function stationPose(idx: number): Station {
  return STATIONS[Math.max(0, Math.min(SHOW_LAST, idx))];
}

// spawn (compat.)
export const SHOW_SPAWN = { col: 0, row: 0 };
