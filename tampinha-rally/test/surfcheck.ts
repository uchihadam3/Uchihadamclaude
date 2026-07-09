// PROVA que cada superfície faz algo DIFERENTE e que o GIRO tem efeito real.
import { makeCap, DEFAULT_STATS, vec, Surface } from '../src/engine/core';
import { stepWorld } from '../src/engine/physics';
import { TrackModel, TrackDef } from '../src/engine/track';

function lane(surface: Surface | null, dir?: number): TrackModel {
  const path = []; for (let i = 0; i <= 40; i++) path.push(vec(5 + i * 2, 20));
  const def: TrackDef = { id: 0, name: 't', theme: 'q', level: 0, w: 90, h: 40, ground: 'dirt', bg: '#000', wallCol: '#000',
    path, half: path.map(() => 8), pads: [], patches: surface ? [{ surface, x: 45, y: 20, r: 30, dir }] : [],
    walls: [], obstacles: [], checkpoints: [vec(5, 20)], start: vec(5, 20), startAngle: 0, finish: [vec(85, 12), vec(85, 28)], decor: [] } as any;
  return new TrackModel(def);
}
function launch(tm: TrackModel, stats: any, vx = 20): { dist: number; dev: number } {
  const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS, ...stats }, true);
  c.pos = vec(8, 20); c.cpPos = vec(8, 20); c.resetTo = vec(8, 20); c.vel = vec(vx, 0); c.moving = true;
  let maxDev = 0, maxX = 8;
  for (let i = 0; i < 1600 && (c.moving || c.airborne); i++) { stepWorld([c], tm, 1 / 120); maxDev = Math.max(maxDev, Math.abs(c.pos.y - 20)); maxX = Math.max(maxX, c.pos.x); }
  return { dist: maxX - 8, dev: maxDev };   // pico (antes de qualquer reset por sair)
}
console.log('=== DISTÂNCIA ATÉ PARAR (v=20) — cada piso é diferente ===');
for (const s of ['dirt', 'ice', 'sand', 'grass', 'mud', 'water'] as Surface[]) {
  const r = launch(lane(s === 'dirt' ? null : s), {});
  console.log(`  ${s.padEnd(6)} dist=${r.dist.toFixed(1)}${s === 'ice' ? '  ← gelo vai MUITO mais longe' : s === 'mud' ? '  ← lama prende' : ''}`);
}
console.log('\n=== ÁGUA: correnteza EMPURRA de lado (dir=90°) ===');
{
  const semDir = launch(lane('water'), {});
  const comDir = launch(lane('water', Math.PI / 2), {});
  console.log(`  desvio lateral: sem correnteza=${semDir.dev.toFixed(2)} · com correnteza=${comDir.dev.toFixed(2)} → empurrou? ${comDir.dev > semDir.dev + 1}`);
}
console.log('\n=== GIRO TEM EFEITO: grama desvia a instável, a estável segura ===');
{
  const inst = launch(lane('grass'), { stability: 0.85 });
  const est = launch(lane('grass'), { stability: 1.2 });
  console.log(`  desvio na grama: instável(0.85)=${inst.dev.toFixed(2)} · estável(1.2)=${est.dev.toFixed(2)} → estável desvia menos? ${est.dev < inst.dev}`);
  const dirtI = launch(lane(null), { stability: 0.85 });
  console.log(`  na terra lisa o desvio é bem menor: ${dirtI.dev.toFixed(2)} (grama é o vilão do giro)`);
}
console.log('\n✅ surfcheck fim');
