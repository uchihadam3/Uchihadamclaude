// valida os novos modos: rubber-band dos itens, corrida Caos completa,
// pista custom jogável, e times.
import { GameManager, PlayerDef } from '../src/game/manager';
import { track, withChaosItems, buildCustomTrack } from '../src/game/generator';
import { pickItem, ITEMS } from '../src/game/chaos';

function runRace(mgr: GameManager, maxSteps = 120000): number {
  let steps = 0;
  while (mgr.phase !== 'over' && steps < maxSteps) { mgr.update(1 / 60); steps++; }
  return steps;
}

// 1) rubber-band: líder pega itens fracos, lanterna pega fortes (média de tier)
console.log('=== RUBBER-BAND DOS ITENS ===');
for (const [lab, r] of [['líder', 0], ['meio', 0.5], ['lanterna', 1]] as [string, number][]) {
  let sum = 0; const N = 4000;
  for (let i = 0; i < N; i++) sum += ITEMS[pickItem(r, r === 0)].tier;
  console.log(`  ${lab.padEnd(9)} rank=${r}  tier médio = ${(sum / N).toFixed(2)}`);
}
// líder nunca pega raio
let raioLeader = 0; for (let i = 0; i < 4000; i++) if (pickItem(0, true) === 'raio') raioLeader++;
console.log(`  raio p/ líder: ${raioLeader} (deve ser 0)`);

// 2) corrida CAOS completa (IA usa itens sozinha)
console.log('\n=== CORRIDA CAOS (IA×4) ===');
{
  const def = withChaosItems(track(1, 3));
  const nItems = def.obstacles.filter(o => o.type === 'item').length;
  const players: PlayerDef[] = [0, 1, 2, 3].map(i => ({ name: 'IA' + i, isAI: true, ai: 'equilibrado', skin: ['coca', 'guarana', 'fanta', 'sprite'][i] }));
  const mgr = new GameManager(); mgr.setup(def, players); mgr.chaos = true;
  let items = 0; mgr.onItem = () => items++;
  const steps = runRace(mgr);
  console.log(`  caixas na pista: ${nItems} · itens dados/usados: ${items} · passos: ${steps} · fim: ${mgr.phase === 'over' ? 'OK ✓' : 'TRAVOU ✗'}`);
}

// 3) DUPLA: times atribuídos e corrida completa
console.log('\n=== DUPLA 2×2 ===');
{
  const def = track(1, 2);
  const players: PlayerDef[] = [0, 1, 2, 3].map(i => ({ name: 'P' + i, isAI: true, ai: 'equilibrado', skin: ['coca', 'guarana', 'fanta', 'sprite'][i], team: i % 2 }));
  const mgr = new GameManager(); mgr.setup(def, players);
  console.log(`  times detectados: ${mgr.teams} (esperado 2)`);
  const steps = runRace(mgr);
  const a = mgr.caps.filter(c => c.team === 0).reduce((s, c) => s + c.place, 0);
  const b = mgr.caps.filter(c => c.team === 1).reduce((s, c) => s + c.place, 0);
  console.log(`  soma Time A=${a} · Time B=${b} · fim: ${mgr.phase === 'over' ? 'OK ✓' : 'TRAVOU ✗'}`);
}

// 4) pista CUSTOM jogável
console.log('\n=== PISTA CUSTOM ===');
{
  const pts = []; for (let i = 0; i <= 20; i++) { const a = i / 20 * Math.PI * 1.3; pts.push({ x: 20 + Math.cos(a) * 22, y: 30 + Math.sin(a) * 18 }); }
  const def = buildCustomTrack({ id: 'x', name: 'Teste', theme: 0, half: 4.2, pts, obstacles: [{ type: 'bonus', x: 30, y: 12, n: 1 }] });
  const players: PlayerDef[] = [0, 1].map(i => ({ name: 'P' + i, isAI: true, ai: 'equilibrado', skin: ['coca', 'guarana'][i] }));
  const mgr = new GameManager(); mgr.setup(def, players);
  const steps = runRace(mgr);
  console.log(`  pista ${def.w}x${def.h} · pontos ${def.path.length} · checkpoints ${def.checkpoints.length} · fim: ${mgr.phase === 'over' ? 'OK ✓' : 'TRAVOU ✗'} (${steps} passos)`);
}
console.log('\n✅ modescheck fim');
