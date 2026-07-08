// ---------------------------------------------------------------------------
// Simulação de água — Autômato Celular 2.5D sobre a heightmap.
// Vizinhança de 4 (N/S/L/O): mais estável e barata que 8, e dá leitura de
// fluxo mais limpa para o barco. Buffer duplo + limites por tick evitam
// oscilação e "teletransporte" de água. Gera flow map por célula e evapora.
// ---------------------------------------------------------------------------
import { Grid, N, SOLID_BAMBOO, SOLID_STONE } from './grid';

export interface WaterParams {
  flowRate: number;      // fração da diferença de altura transferida por tick
  minWater: number;      // volume abaixo do qual a água é desprezível
  evapBase: number;      // evaporação por segundo em água rasa
  sourceRate: number;    // água emitida por nascente por segundo
  maxSource: number;     // teto de água acumulada perto da nascente
}
export const DEFAULT_WATER: WaterParams = {
  flowRate: 0.6, minWater: 0.0015, evapBase: 0.035, sourceRate: 2.9, maxSource: 5.0,
};

// avança a simulação por um passo de tempo fixo dt
export function stepWater(g: Grid, p: WaterParams, dt: number): void {
  const { terrain, water, waterBuf, flowX, flowZ, solid, shaded, source } = g;

  // 1) nascentes emitem água
  for (let k = 0; k < N * N; k++) if (source[k] && water[k] < p.maxSource) water[k] += p.sourceRate * dt;

  // 2) redistribuição para vizinhos mais baixos (scatter, com buffer)
  waterBuf.set(water);
  flowX.fill(0); flowZ.fill(0);
  const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const c = j * N + i;
      const w = water[c];
      if (w <= p.minWater) continue;
      const hC = terrain[c] + w;
      // bambu conduz melhor (menos atrito), pedra segura a água (mais atrito)
      const rate = solid[c] === SOLID_BAMBOO ? Math.min(0.85, p.flowRate * 1.5)
        : solid[c] === SOLID_STONE ? p.flowRate * 0.45 : p.flowRate;

      let dSum = 0; const diffs: number[] = [0, 0, 0, 0];
      for (let n = 0; n < 4; n++) {
        const ni = i + nb[n][0], nj = j + nb[n][1];
        if (ni < 0 || nj < 0 || ni >= N || nj >= N) continue;
        const nc = nj * N + ni;
        const d = hC - (terrain[nc] + water[nc]);
        if (d > 0) { diffs[n] = d; dSum += d; }
      }
      if (dSum <= 0) continue;

      // move no máximo metade do desnível médio, limitado à água disponível
      const totalMove = Math.min(w, dSum * 0.5) * rate;
      for (let n = 0; n < 4; n++) {
        if (diffs[n] <= 0) continue;
        const ni = i + nb[n][0], nj = j + nb[n][1], nc = nj * N + ni;
        let share = (diffs[n] / dSum) * totalMove;
        share = Math.min(share, diffs[n] * 0.5);        // não ultrapassar o equilíbrio
        waterBuf[c] -= share; waterBuf[nc] += share;
        flowX[c] += nb[n][0] * share; flowZ[c] += nb[n][1] * share;
      }
    }
  }
  water.set(waterBuf);

  // 3) evaporação (mais forte em água rasa; zero sob sombra)
  for (let k = 0; k < N * N; k++) {
    let w = water[k];
    if (w <= 0) continue;
    if (shaded[k] || solid[k] === SOLID_BAMBOO) continue;   // sombra/bambu protegem
    const shallow = 1 + Math.max(0, (0.35 - w)) * 2.2;      // raso evapora mais
    w -= (p.evapBase + g.evap[k]) * shallow * dt;
    water[k] = w < 0 ? 0 : w;
  }
}

// volume total de água (para condições de fim de jogo)
export function totalWater(g: Grid): number {
  let s = 0; for (let k = 0; k < N * N; k++) s += g.water[k]; return s;
}
