// EQUILÍBRIO: com as pistas cheias de manobra, o Desliza (glide) ainda domina?
// 4 IAs IGUAIS de habilidade (mesma persona 'tecnico'), só muda o ARQUÉTIPO da
// tampinha: glide (desliza), tank (peso/aderência), precise (controle), bouncy
// (quique). Roda várias corridas e mede a colocação média de cada uma.
import { GameManager, PlayerDef } from '../src/game/manager';
import { track } from '../src/game/generator';
import { CapStats } from '../src/engine/core';

const ARCH: Record<string, CapStats> = {
  glide:   { weight: 0.93, slide: 1.13, stability: 0.97, bounce: 1.03, control: 0.98, power: 0.96, grip: 0.95 },
  tank:    { weight: 1.18, slide: 0.87, stability: 1.13, bounce: 0.85, control: 1.00, power: 1.12, grip: 1.16 },
  precise: { weight: 0.98, slide: 1.00, stability: 1.09, bounce: 0.97, control: 1.14, power: 0.99, grip: 1.02 },
  bouncy:  { weight: 0.95, slide: 1.05, stability: 0.94, bounce: 1.16, control: 0.98, power: 1.02, grip: 0.94 },
};
const names = Object.keys(ARCH);
const sums: Record<string, number> = { glide: 0, tank: 0, precise: 0, bouncy: 0 };
const wins: Record<string, number> = { glide: 0, tank: 0, precise: 0, bouncy: 0 };
let races = 0;
for (const level of [1, 2]) {
  for (let idx = 0; idx < 3; idx++) {
    const rot = idx % 4;   // gira a ordem de largada (justo)
    const order = names.map((_, i) => names[(i + rot) % 4]);
    const players: PlayerDef[] = order.map((n, i) => ({ name: n, isAI: true, ai: 'tecnico', skin: 'coca', stats: ARCH[n] }));
    const mgr = new GameManager(); mgr.setup(track(level, idx), players);
    let steps = 0; while (mgr.phase !== 'over' && steps < 220000) { mgr.update(1 / 60); steps++; }
    if (mgr.phase !== 'over') { console.log(`TRAVOU L${level} T${idx} ✗`); continue; }
    races++;
    for (const c of mgr.caps) { sums[c.name] += c.place; if (c.place === 1) wins[c.name]++; }
  }
}
console.log(`corridas: ${races}`);
for (const n of names) console.log(`  ${n.padEnd(8)} colocação média ${(sums[n] / races).toFixed(2)} · vitórias ${wins[n]}`);
console.log('(equilíbrio bom = médias próximas de 2.5 e vitórias espalhadas)');
