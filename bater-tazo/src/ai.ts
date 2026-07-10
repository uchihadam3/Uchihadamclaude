// IA DO OPONENTE — prevê batidas com a física real (simulate) e escolhe a
// melhor, com ruído de execução conforme a dificuldade (moleque iniciante
// erra a mira; o "mão de pedra" quase não erra).
import { simulate } from './sim';

export type Difficulty = 'facil' | 'medio' | 'dificil';

const NOISE: Record<Difficulty, { aim: number; pow: number; tries: number }> = {
  facil: { aim: 0.30, pow: 0.22, tries: 4 },
  medio: { aim: 0.16, pow: 0.12, tries: 7 },
  dificil: { aim: 0.07, pow: 0.05, tries: 12 },
};

export function aiSlam(stackIds: string[], strikerId: string, diff: Difficulty): { aimX: number; aimY: number; power: number } {
  const cfg = NOISE[diff];
  let best = { aimX: 0.8, aimY: 0, power: 0.8, flips: -1 };
  // candidatos: leque de miras (beirada em ângulos variados + meio) × forças
  const angles = [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4];
  const dists = [0.55, 0.8, 0.98];
  const pows = [0.55, 0.75, 0.9, 1.0];
  let tried = 0;
  for (const a of angles) {
    for (const d of dists) {
      for (const p of pows) {
        if (tried >= cfg.tries * 4) break;
        const ax = Math.cos(a) * d, ay = Math.sin(a) * d;
        const r = simulate(stackIds, ax, ay, p, strikerId);
        tried++;
        if (r.flipped.length > best.flips) best = { aimX: ax, aimY: ay, power: p, flips: r.flipped.length };
      }
    }
  }
  // ruído de execução (a diferença entre saber e ACERTAR)
  return {
    aimX: best.aimX + (Math.random() - 0.5) * 2 * cfg.aim,
    aimY: best.aimY + (Math.random() - 0.5) * 2 * cfg.aim,
    power: Math.max(0.2, Math.min(1, best.power + (Math.random() - 0.5) * 2 * cfg.pow)),
  };
}
