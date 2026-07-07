import type { HeroId, HeroProgress } from '../types';
import { createRun, stepRun, runEssence, type RunController } from './combat';
import { buildLoadout, defaultHeroProgress } from './loadout';
import { HEROES } from '../data/heroesData';

// ============ SIMULADOR HEADLESS (balanceamento e testes) ============
export interface SimResult {
  heroId: HeroId;
  dungeonId: number;
  result: 'vitoria' | 'derrota' | 'abandono';
  timeSec: number;
  progress: number;
  kills: number;
  dmgDealt: number;
  dmgTaken: number;
  potionsUsed: number;
  essence: number;
  bossKilled: boolean;
  hpEnd: number;
}

const DT = 1 / 30;
const MAX_SIM = 3600; // s

export function simulateRun(heroId: HeroId, dungeonId: number, seed: number, prog?: HeroProgress): SimResult {
  const p = prog ?? defaultHeroProgress(heroId);
  const loadout = buildLoadout(heroId, p);
  const c: RunController = createRun(loadout, dungeonId, seed);
  const run = c.run;
  let guard = 0;
  while (!run.over && run.t < MAX_SIM && guard < MAX_SIM / DT + 100) {
    stepRun(c, DT);
    guard++;
  }
  return {
    heroId, dungeonId,
    result: run.result ?? 'abandono',
    timeSec: run.t,
    progress: run.progress,
    kills: run.kills,
    dmgDealt: Math.round(run.dmgDealt),
    dmgTaken: Math.round(run.dmgTaken),
    potionsUsed: run.potionsUsed,
    essence: runEssence(c),
    bossKilled: run.bossKilled,
    hpEnd: Math.max(0, Math.round(run.hero.hp)),
  };
}

// múltiplas seeds → estatística
export function simulateMany(heroId: HeroId, dungeonId: number, seeds: number[], prog?: HeroProgress): {
  winRate: number; avgTime: number; minTime: number; maxTime: number; avgProgress: number; results: SimResult[];
} {
  const results = seeds.map((s) => simulateRun(heroId, dungeonId, s, prog));
  const wins = results.filter((r) => r.result === 'vitoria');
  const times = wins.map((r) => r.timeSec);
  return {
    winRate: wins.length / results.length,
    avgTime: times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0,
    minTime: times.length ? Math.min(...times) : 0,
    maxTime: times.length ? Math.max(...times) : 0,
    avgProgress: results.reduce((a, r) => a + r.progress, 0) / results.length,
    results,
  };
}

// relatório de balanceamento D1 (todos os heróis, kit inicial)
export function balanceReportD1(seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8]): string {
  const lines: string[] = ['=== BALANCE D1 (kit inicial) — alvo 540-660s, winrate 100% ==='];
  for (const h of HEROES) {
    const r = simulateMany(h.id, 1, seeds);
    const min = (r.minTime / 60).toFixed(1), max = (r.maxTime / 60).toFixed(1), avg = (r.avgTime / 60).toFixed(1);
    lines.push(
      `${h.id.padEnd(11)} win=${(r.winRate * 100).toFixed(0).padStart(3)}%  avg=${avg}min  [${min}-${max}]  prog=${(r.avgProgress * 100).toFixed(0)}%`,
    );
  }
  return lines.join('\n');
}

// D2 deve FALHAR com kit inicial (exige upgrades)
export function balanceReportD2(seeds: number[] = [1, 2, 3, 4]): string {
  const lines: string[] = ['=== BALANCE D2 (kit inicial) — esperado: NÃO vence sem upgrades ==='];
  for (const h of HEROES) {
    const r = simulateMany(h.id, 2, seeds);
    lines.push(`${h.id.padEnd(11)} win=${(r.winRate * 100).toFixed(0).padStart(3)}%  prog=${(r.avgProgress * 100).toFixed(0)}%`);
  }
  return lines.join('\n');
}
