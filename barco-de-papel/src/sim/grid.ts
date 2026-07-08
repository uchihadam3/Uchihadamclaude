// ---------------------------------------------------------------------------
// Camada de SIMULAÇÃO — dados centrais do jogo (data-oriented, arrays lineares).
// Um único Grid guarda terreno, água, fluxo, sombra, evaporação e sólidos.
// Nenhuma dependência de visual/entrada aqui.
// ---------------------------------------------------------------------------

export const N = 64;              // células por lado
export const WORLD = 32;          // largura do mundo em unidades
export const CELL = WORLD / N;    // 0.5 u por célula
export const V_SCALE = 2.2;       // escala vertical (altura/água → mundo)

export const SOLID_SAND = 0;
export const SOLID_STONE = 1;
export const SOLID_BAMBOO = 2;

export class Grid {
  readonly N = N;
  terrain = new Float32Array(N * N);   // altura do terreno
  water = new Float32Array(N * N);     // volume de água
  waterBuf = new Float32Array(N * N);  // buffer duplo p/ o CA
  flowX = new Float32Array(N * N);     // componente do flow map
  flowZ = new Float32Array(N * N);
  shaded = new Uint8Array(N * N);      // 1 = sob sombra (não evapora)
  evap = new Float32Array(N * N);      // taxa base de evaporação
  solid = new Uint8Array(N * N);       // SOLID_SAND / STONE / BAMBOO
  source = new Uint8Array(N * N);      // 1 = nascente (emite água)
  dirty = true;                        // terreno mudou → remesh

  idx(i: number, j: number): number { return j * N + i; }
  inb(i: number, j: number): boolean { return i >= 0 && j >= 0 && i < N && j < N; }

  worldToCell(x: number, z: number): [number, number] {
    return [Math.floor((x + WORLD / 2) / CELL), Math.floor((z + WORLD / 2) / CELL)];
  }
  cellToWorld(i: number, j: number): [number, number] {
    return [(i + 0.5) * CELL - WORLD / 2, (j + 0.5) * CELL - WORLD / 2];
  }

  // amostragem bilinear (terreno/água/fluxo) em coordenadas de mundo
  private bil(arr: Float32Array, x: number, z: number): number {
    const fx = (x + WORLD / 2) / CELL - 0.5, fz = (z + WORLD / 2) / CELL - 0.5;
    const i = Math.floor(fx), j = Math.floor(fz), tx = fx - i, tz = fz - j;
    const c = (ii: number, jj: number) => {
      ii = Math.max(0, Math.min(N - 1, ii)); jj = Math.max(0, Math.min(N - 1, jj));
      return arr[jj * N + ii];
    };
    const a = c(i, j), b = c(i + 1, j), d = c(i, j + 1), e = c(i + 1, j + 1);
    return (a * (1 - tx) + b * tx) * (1 - tz) + (d * (1 - tx) + e * tx) * tz;
  }
  terrainAt(x: number, z: number): number { return this.bil(this.terrain, x, z); }
  waterAt(x: number, z: number): number { return this.bil(this.water, x, z); }
  flowAt(x: number, z: number): [number, number] { return [this.bil(this.flowX, x, z), this.bil(this.flowZ, x, z)]; }

  reset(): void {
    this.water.fill(0); this.waterBuf.fill(0); this.flowX.fill(0); this.flowZ.fill(0);
  }
}
