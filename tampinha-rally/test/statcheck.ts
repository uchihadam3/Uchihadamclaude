import { makeCap, vec, DEFAULT_STATS, CapStats, Surface, len } from '../src/engine/core';
import { TrackModel, TrackDef } from '../src/engine/track';
import { stepWorld, anyMoving } from '../src/engine/physics';

function flat(ground: Surface, walls: any[] = []): TrackModel {
  const path = []; for (let x = 4; x <= 240; x += 2) path.push(vec(x, 30));
  const def: TrackDef = { id: 0, name: 't', theme: 'x', level: 0, w: 244, h: 60, ground, bg: '#000', wallCol: '#000', path, half: path.map(() => 22), pads: [], patches: [], walls, obstacles: [], checkpoints: [path[0]], start: path[0], startAngle: 0, finish: [vec(243, 0), vec(243, 60)], decor: [] };
  return new TrackModel(def);
}
function S(o: Partial<CapStats>): CapStats { return { ...DEFAULT_STATS, ...o }; }
function mk(stats: CapStats, x = 8, y = 30) { const c = makeCap(0, 'c', 'coca', stats, false); c.pos = vec(x, y); c.cpPos = vec(x, y); c.turnStart = vec(x, y); c.resetTo = vec(x, y); return c; }

// distância percorrida com um lançamento reto
function dist(stats: CapStats, v: number, ground: Surface): number {
  const tm = flat(ground); const c = mk(stats); c.vel = vec(v, 0); c.moving = true;
  let n = 0; while (anyMoving([c]) && n < 4000) { stepWorld([c], tm, 1 / 120); n++; }
  return c.pos.x - 8;
}
// bate numa parada; retorna quanto o ALVO andou
function punch(aggr: CapStats, target: CapStats, v: number): number {
  const tm = flat('sidewalk'); const a = mk(aggr, 8, 30); const b = mk(target, 13.4, 30);
  a.vel = vec(v, 0); a.moving = true; b.moving = true;
  let n = 0; while (anyMoving([a, b]) && n < 4000) { stepWorld([a, b], tm, 1 / 120); n++; }
  return b.pos.x - 13.4;
}
// quica numa parede vertical em x=120; retorna velocidade de volta
function bounce(stats: CapStats, v: number): number {
  const tm = flat('sidewalk', [{ a: vec(120, 0), b: vec(120, 60) }]); const c = mk(stats, 100, 30); c.vel = vec(v, 0); c.moving = true;
  let n = 0, back = 0; while (anyMoving([c]) && n < 2000) { stepWorld([c], tm, 1 / 120); if (c.vel.x < back) back = c.vel.x; n++; }
  return -back;
}
const p2 = (n: number) => n.toFixed(1);
console.log('=== VERIFICAÇÃO DOS 7 ATRIBUTOS ===\n');
console.log('DESLIZA (distância em terra, v=20):  baixo(0.9)=' + p2(dist(S({ slide: 0.9 }), 20, 'dirt')) + '  alto(1.2)=' + p2(dist(S({ slide: 1.2 }), 20, 'dirt')) + '  → alto vai mais longe?');
console.log('POTÊNCIA distância em TERRA (v=20):  baixo(0.9)=' + p2(dist(S({ power: 0.9 }), 20, 'dirt')) + '  alto(1.2)=' + p2(dist(S({ power: 1.2 }), 20, 'dirt')) + '  → deve ser ~IGUAL (não é distância)');
console.log('POTÊNCIA distância em LAMA  (v=20):  baixo(0.9)=' + p2(dist(S({ power: 0.9 }), 20, 'mud')) + '  alto(1.2)=' + p2(dist(S({ power: 1.2 }), 20, 'mud')) + '  → alto atravessa a lama melhor?');
console.log('POTÊNCIA punch (alvo neutro):        baixo(0.9)=' + p2(punch(S({ power: 0.9 }), S({}), 22)) + '  alto(1.2)=' + p2(punch(S({ power: 1.2 }), S({}), 22)) + '  → alto joga o alvo mais longe?');
console.log('PESO punch (atacante pesado):        leve(0.9)=' + p2(punch(S({ weight: 0.9 }), S({}), 22)) + '  pesado(1.2)=' + p2(punch(S({ weight: 1.2 }), S({}), 22)) + '  → pesado empurra mais?');
console.log('PESO alvo resiste:                   alvo leve=' + p2(punch(S({}), S({ weight: 0.9 }), 22)) + '  alvo pesado=' + p2(punch(S({}), S({ weight: 1.2 }), 22)) + '  → alvo pesado anda menos?');
console.log('ADERÊNCIA alvo resiste empurrão:     grip0.9=' + p2(punch(S({}), S({ grip: 0.9 }), 22)) + '  grip1.2=' + p2(punch(S({}), S({ grip: 1.2 }), 22)) + '  → grip alto anda menos?');
console.log('QUIQUE rebote na parede (v=20):      baixo(0.9)=' + p2(bounce(S({ bounce: 0.9 }), 20)) + '  alto(1.2)=' + p2(bounce(S({ bounce: 1.2 }), 20)) + '  → alto volta mais rápido?');
console.log('CONTROLE distância p/ parar (v=8):   baixo(0.9)=' + p2(dist(S({ control: 0.9 }), 8, 'sidewalk')) + '  alto(1.2)=' + p2(dist(S({ control: 1.2 }), 8, 'sidewalk')) + '  → alto para mais cedo (menor)?');
// estabilidade: mede o giro visual acumulado (angVel) — e se afeta trajetória
{ const tmA = flat('dirt'); const lo = mk(S({ stability: 0.9 })); lo.vel = vec(20, 0); lo.moving = true; let ay = 0, n = 0; while (anyMoving([lo]) && n < 4000) { stepWorld([lo], tmA, 1 / 120); ay += Math.abs(lo.angVel); n++; }
  const tmB = flat('dirt'); const hi = mk(S({ stability: 1.2 })); hi.vel = vec(20, 0); hi.moving = true; let by = 0, m = 0; while (anyMoving([hi]) && m < 4000) { stepWorld([hi], tmB, 1 / 120); by += Math.abs(hi.angVel); m++; }
  console.log('ESTABILIDADE giro acumulado:         baixo(0.9)=' + p2(ay) + '  alto(1.2)=' + p2(by) + '  → alto gira menos?'); }
