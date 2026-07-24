// TORRE DA ESPIRAL REDONDA → CORREDOR → TERRAÇO ABERTO.
// A escada é uma HÉLICE de verdade (redonda), então o movimento aqui NÃO é em
// grade: o jogador percorre uma sequência de "estações" ao longo do caminho
// (sobe/desce a hélice). No topo, um corredor reto leva a um terraço aberto com
// grama, estátua e névoa. Tudo em coordenadas de MUNDO.

export type Station = { x: number; y: number; z: number; yaw: number; kind: "helix" | "corridor" | "shrine" };

// ---- parâmetros geométricos (em unidades de mundo) ----
export const HELIX_CX = 24;
export const HELIX_CZ = 24; // centro da hélice
export const HELIX_RP = 5.0; // raio da linha central da rampa
export const HELIX_INNER = 2.6; // raio interno da rampa (núcleo)
export const HELIX_OUTER = 7.4; // raio externo da rampa (parede)
export const HELIX_STEPS = 24; // nº de degraus
export const HELIX_TURNS = 2; // voltas completas
export const HELIX_TOP = 12; // altura do topo da hélice
const RISE = HELIX_TOP / HELIX_STEPS; // 0.5 por degrau
const DTH = (Math.PI * 2 * HELIX_TURNS) / HELIX_STEPS; // passo angular
const TH0 = Math.PI / 2; // ângulo inicial (base ao sul, +z)

export const CORR_LEN = 4; // estações do corredor
export const CORR_STEP = 3; // espaçamento do corredor (mundo)
export const SHRINE_RADIUS = 6.0; // raio do disco de grama

// yaw da câmera p/ olhar na direção (dx,dz): viewDir = (-sinθ,-cosθ) → θ=atan2(-dx,-dz)
function yawTo(dx: number, dz: number): number {
  return Math.atan2(-dx, -dz);
}

// monta o caminho: hélice (sobe girando) → corredor reto (oeste) → terraço.
function buildStations(): Station[] {
  const st: Station[] = [];
  for (let i = 0; i <= HELIX_STEPS; i++) {
    const th = TH0 + i * DTH;
    const x = HELIX_CX + HELIX_RP * Math.cos(th);
    const z = HELIX_CZ + HELIX_RP * Math.sin(th);
    const y = i * RISE;
    // tangente ASCENDENTE: d/dθ(cos,sin) = (-sinθ, cosθ)
    st.push({ x, y, z, yaw: yawTo(-Math.sin(th), Math.cos(th)), kind: "helix" });
  }
  // topo da hélice: ângulo TH0 + STEPS*DTH ≡ TH0 (voltas inteiras) → tangente = oeste
  const topTh = TH0 + HELIX_STEPS * DTH;
  const cx0 = HELIX_CX + HELIX_RP * Math.cos(topTh); // = HELIX_CX
  const cz0 = HELIX_CZ + HELIX_RP * Math.sin(topTh); // = HELIX_CZ + RP
  const yawW = yawTo(-Math.sin(topTh), Math.cos(topTh)); // oeste
  for (let k = 1; k <= CORR_LEN; k++)
    st.push({ x: cx0 - CORR_STEP * k, y: HELIX_TOP, z: cz0, yaw: yawW, kind: "corridor" });
  // terraço: entra no disco de grama e para diante da estátua
  const cend = cx0 - CORR_STEP * CORR_LEN;
  st.push({ x: cend - 3, y: HELIX_TOP, z: cz0, yaw: yawW, kind: "shrine" });
  st.push({ x: cend - 6, y: HELIX_TOP, z: cz0, yaw: yawW, kind: "shrine" });
  return st;
}

export const STATIONS: Station[] = buildStations();
export const SHOW_LAST = STATIONS.length - 1;

// centro do terraço/estátua (mundo) — um pouco a oeste da última estação
const _last = STATIONS[SHOW_LAST];
export const SHRINE_CX = _last.x - 4;
export const SHRINE_CZ = _last.z;
export const SHOW_STATUE_W = { x: SHRINE_CX, z: SHRINE_CZ, y: HELIX_TOP };
// começo do corredor (topo da hélice) e fim (entrada do terraço) p/ render
export const CORR_X0 = HELIX_CX; // topo da hélice
export const CORR_X1 = HELIX_CX - CORR_STEP * CORR_LEN; // fim do corredor
export const CORR_Z = HELIX_CZ + HELIX_RP;

export function stationPose(idx: number): Station {
  return STATIONS[Math.max(0, Math.min(SHOW_LAST, idx))];
}

// ---- stubs de compatibilidade (o showcase antigo era em grade) ----
export const SHOW_COLS = 1;
export const SHOW_ROWS = 1;
export const SHOW_RISE = RISE;
export const SHOW_TOP = HELIX_STEPS;
export const SHOW_CENTER = { c: 0, r: 0 };
export const SHOW_RADIUS = SHRINE_RADIUS;
export const SHOW_SPAWN = { col: 0, row: 0 };
export const SHOW_EXIT = { col: 0, row: 0 };
export const SHOW_STATUE = { col: 0, row: 0 };
export type ShowZone = "wall" | "ramp" | "shrine";
export function showZone(): ShowZone {
  return "wall";
}
export function showWalkable(): boolean {
  return false;
}
export function showFloorY(): number {
  return 0;
}
export function showIsCorridor(): boolean {
  return false;
}
export function showIsShrine(): boolean {
  return false;
}
