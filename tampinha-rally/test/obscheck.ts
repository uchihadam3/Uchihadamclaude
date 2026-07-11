// PROVA os 5 obstáculos novos + raridade/risco dos bônus + densidade da pista
import { makeCap, DEFAULT_STATS, vec, len } from '../src/engine/core';
import { stepWorld } from '../src/engine/physics';
import { TrackModel, TrackDef, bugPos } from '../src/engine/track';
import { track, TRACKS_PER_LEVEL } from '../src/game/generator';

function lane(obstacles: any[]): TrackModel {
  const path: any[] = []; for (let i = 0; i <= 40; i++) path.push(vec(5 + i * 2, 20));
  const def: TrackDef = { id: 0, name: 't', theme: 'q', level: 0, w: 90, h: 40, ground: 'dirt', bg: '#000', wallCol: '#000',
    path, half: path.map(() => 9), pads: [], patches: [], walls: [], obstacles,
    checkpoints: [vec(5, 20)], start: vec(5, 20), startAngle: 0, finish: [vec(85, 11), vec(85, 29)], decor: [] } as any;
  return new TrackModel(def);
}
function shoot(tm: TrackModel, vx = 18, vy = 0, extra?: any) {
  const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
  c.pos = vec(8, 20); c.cpPos = vec(8, 20); c.resetTo = vec(8, 20); c.vel = vec(vx, vy); c.moving = true;
  const evs: string[] = [];
  const world = [c, ...(extra ? [extra] : [])];
  for (let i = 0; i < 2400 && (c.moving || c.airborne); i++) for (const e of stepWorld(world, tm, 1 / 120)) evs.push(e.type);
  return { c, evs };
}

console.log('=== PIÃO: rebate + chute LATERAL (pinball) ===');
{
  const { c, evs } = shoot(lane([{ type: 'top', x: 18, y: 20, r: 0.95 }]));
  console.log(`  eventos=[${[...new Set(evs)].join(',')}] · desviou de lado? dy=${Math.abs(c.pos.y - 20).toFixed(1)} (>1.5? ${Math.abs(c.pos.y - 20) > 1.5})`);
  if (!evs.includes('top') || Math.abs(c.pos.y - 20) < 1.5) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== JOANINHA: anda por turno + esbarrão macio ===');
{
  const o: any = { type: 'bug', x: 18, y: 20, r: 0.85, dir: 0, n: 2.2, ph: 0 };
  const p0 = bugPos(o); o.ph = 3; const p3 = bugPos(o);
  console.log(`  posição muda com o passo? ${(Math.hypot(p3.x - p0.x, p3.y - p0.y)).toFixed(2)}u (>0.8? ${Math.hypot(p3.x - p0.x, p3.y - p0.y) > 0.8})`);
  o.ph = 0;
  const { c, evs } = shoot(lane([o]), 18, 0);
  console.log(`  bateu na joaninha? ${evs.includes('bug')} · x final=${c.pos.x.toFixed(1)}`);
  if (Math.hypot(p3.x - p0.x, p3.y - p0.y) < 0.8 || !evs.includes('bug')) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== ELÁSTICO: devolve COM GANHO (estilingue) ===');
{
  // liguinha perpendicular na frente; mede velocidade antes/depois do quique
  const tm = lane([{ type: 'band', x: 27, y: 20, r: 4, dir: Math.PI / 2 }]);
  const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
  c.pos = vec(22, 20); c.cpPos = vec(22, 20); c.resetTo = vec(22, 20); c.vel = vec(14, 0); c.moving = true;
  let vin = 0, vout = 0, hit = false;
  for (let i = 0; i < 2400 && c.moving; i++) {
    if (!hit) vin = len(c.vel);
    for (const e of stepWorld([c], tm, 1 / 120)) if (e.type === 'band' && !hit) { hit = true; }
    if (hit && vout === 0) vout = len(c.vel);
  }
  console.log(`  entrou a ${vin.toFixed(1)} → saiu a ${vout.toFixed(1)} (ganhou? ${vout > vin * 1.05})`);
  if (!hit || vout <= vin * 1.05) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== CATAVENTO: pá fechada bloqueia; girou (turno), abre ===');
{
  const o: any = { type: 'mill', x: 18, y: 20, r: 2.4, dir: Math.PI / 2, n: 2 };   // pá ATRAVESSADA (vertical)
  const r1 = shoot(lane([o]), 18, 0);
  o.dir = 0;                                                                       // pá ALINHADA com o tiro (deitada)
  const c2 = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
  c2.pos = vec(8, 22.6); c2.cpPos = vec(8, 22.6); c2.resetTo = vec(8, 22.6); c2.vel = vec(18, 0); c2.moving = true;
  const tm2 = lane([{ ...o }]); const evs2m: string[] = [];
  for (let i = 0; i < 2400 && c2.moving; i++) for (const e of stepWorld([c2], tm2, 1 / 120)) evs2m.push(e.type);
  const r2 = { c: c2, evs: evs2m };
  console.log(`  fechado: bateu? ${r1.evs.includes('mill')} · aberto: passou limpo? ${!r2.evs.includes('mill')} (x final=${r2.c.pos.x.toFixed(0)})`);
  if (!r1.evs.includes('mill')) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== BEXIGA: estoura 1 vez e o SPLASH empurra o vizinho ===');
{
  const tm = lane([{ type: 'balloon', x: 16, y: 20, r: 1.05 }]);
  const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
  c.pos = vec(8, 20); c.cpPos = vec(8, 20); c.resetTo = vec(8, 20); c.vel = vec(16, 0); c.moving = true;
  const viz = makeCap(1, 'v', 'fanta', { ...DEFAULT_STATS }, true);
  viz.pos = vec(18, 22.5); viz.cpPos = vec(18, 22.5); viz.resetTo = vec(18, 22.5);
  let nBal = 0;
  for (let i = 0; i < 2400; i++) {
    for (const e of stepWorld([c, viz], tm, 1 / 120)) if (e.type === 'balloon') nBal++;
    if (!c.moving && !viz.moving && i > 10) break;
  }
  const dv = Math.hypot(viz.pos.x - 18, viz.pos.y - 22.5);
  console.log(`  eventos balloon=${nBal} (1? ${nBal === 1}) · vizinho foi empurrado ${dv.toFixed(2)}u (>0.4? ${dv > 0.4})`);
  if (nBal !== 1 || dv < 0.4) { console.log('  ✗'); process.exit(1); }
  const { evs: evs2 } = shoot(lane([{ type: 'balloon', x: 16, y: 20, r: 1.05, popped: true }]), 16, 0);
  console.log(`  já estourada ignora? ${!evs2.includes('balloon')}`);
  if (evs2.includes('balloon')) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== RARIDADE dos bônus nas 50 pistas (1 comum > 2 > 3 raro) ===');
{
  const cnt = [0, 0, 0, 0];
  let novos = { top: 0, bug: 0, band: 0, mill: 0, balloon: 0 } as any;
  let densFail = 0;
  for (let lv = 0; lv < 5; lv++) for (let i = 0; i < TRACKS_PER_LEVEL; i++) {
    const def = track(lv, i);
    for (const o of def.obstacles) {
      if (o.type === 'bonus') cnt[o.n || 1]++;
      if (novos[o.type] != null) novos[o.type]++;
    }
    // DENSIDADE: nos 5 quintos da pista tem que ter desafio (obstáculo/mancha)
    const tm = new TrackModel(def);
    const bins = [0, 0, 0, 0, 0];
    for (const o of def.obstacles) { const a = tm.progressOf(vec(o.x, o.y)) / tm.total; bins[Math.min(4, Math.floor(a * 5))]++; }
    for (const p2 of def.patches) { const a = tm.progressOf(vec(p2.x, p2.y)) / tm.total; bins[Math.min(4, Math.floor(a * 5))]++; }
    if (bins.some(b => b === 0)) densFail++;
  }
  console.log(`  +1=${cnt[1]} · +2=${cnt[2]} · +3=${cnt[3]} → ordem certa? ${cnt[1] > cnt[2] && cnt[2] > cnt[3]}`);
  console.log(`  brinquedos no jogo: pião=${novos.top} joaninha=${novos.bug} elástico=${novos.band} catavento=${novos.mill} bexiga=${novos.balloon}`);
  console.log(`  pistas com quinto VAZIO (sem desafio): ${densFail} (0? ${densFail === 0})`);
  if (!(cnt[1] > cnt[2] && cnt[2] > cnt[3]) || densFail > 0) { console.log('  ✗'); process.exit(1); }
  if (novos.top < 30 || novos.bug < 30 || novos.band < 20 || novos.mill < 15 || novos.balloon < 30) { console.log('  POUCOS BRINQUEDOS ✗'); process.exit(1); }
}
console.log('\n✅ obscheck fim');
