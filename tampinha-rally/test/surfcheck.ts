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
// ---------------------------------------------------------------- PISOS NOVOS
console.log('\n=== PISOS NOVOS: distância até parar (v=20) ===');
{
  const base = launch(lane(null), {}).dist;
  const mudD = launch(lane('mud'), {}).dist;   // referência: lama é o piso que mais prende hoje
  for (const s of ['felt', 'frost', 'metal', 'carpet', 'gum'] as Surface[]) {
    const r = launch(lane(s), {});
    console.log(`  ${s.padEnd(6)} dist=${r.dist.toFixed(1)}${s === 'gum' ? `  ← chiclete GRUDA (mais que lama ${mudD.toFixed(1)}? ${r.dist < mudD})` : s === 'frost' ? '  ← escarcha desliza demais' : ''}`);
    if (s === 'gum' && r.dist >= mudD) { console.log('  CHICLETE NÃO GRUDOU ✗'); process.exit(1); }
    if (s === 'frost' && r.dist < base * 1.5) { console.log('  ESCARCHA NÃO DESLIZA ✗'); process.exit(1); }
  }
}
console.log('\n=== ESCARCHA DERRAPA: o freio do Controle quase não pega ===');
{
  // comparação justa: GELO comum (liso, freio normal) vs ESCARCHA (lisa, freio nerfado)
  const iceH = launch(lane('ice'), { control: 1.3 }).dist, iceL = launch(lane('ice'), { control: 0.9 }).dist;
  const froH = launch(lane('frost'), { control: 1.3 }).dist, froL = launch(lane('frost'), { control: 0.9 }).dist;
  const gIce = (iceL - iceH) / iceL, gFro = (froL - froH) / froL;   // ganho relativo do Controle
  console.log(`  efeito do Controle: gelo=${(gIce * 100).toFixed(0)}% · escarcha=${(gFro * 100).toFixed(0)}% → derrapa? ${gFro < gIce * 0.6}`);
  if (!(gFro < gIce * 0.6)) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== TABELA VIVA/MORTA: quique no muro por piso ===');
{
  // muro perpendicular com uma MANCHA PEQUENA do piso só em volta dele: o quique
  // usa o piso da mancha, mas a ida e a volta rolam na mesma terra — isola o quique
  const wallLane = (surface: Surface): TrackModel => {
    const tm = lane(surface === 'dirt' ? null : (surface as any));
    tm.def.patches = surface === 'dirt' ? [] : [{ surface, x: 51, y: 20, r: 4 }];
    tm.def.walls.push({ a: vec(52, 10), b: vec(52, 30) });
    return tm;
  };
  const rebound = (surface: Surface): number => {
    const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
    c.pos = vec(40, 20); c.cpPos = vec(40, 20); c.resetTo = vec(40, 20); c.vel = vec(20, 0); c.moving = true;
    const tm = wallLane(surface);
    let maxX = 40;
    for (let i = 0; i < 1600 && c.moving; i++) { stepWorld([c], tm, 1 / 120); if (c.pos.x > maxX) maxX = c.pos.x; }
    return maxX - c.pos.x;   // do ponto mais fundo (na tábua) até onde PAROU = volta do quique
  };
  const felt = rebound('felt'), carpet = rebound('carpet'), metal = rebound('metal'), dirt = rebound('dirt');
  console.log(`  volta do quique: feltro=${felt.toFixed(1)} · aço=${metal.toFixed(1)} · terra=${dirt.toFixed(1)} · tapete=${carpet.toFixed(1)}`);
  console.log(`  feltro devolve mais que terra? ${felt > dirt * 1.1} · tapete amortece? ${carpet < dirt * 0.75}`);
  if (!(felt > dirt * 1.1 && carpet < dirt * 0.75 && metal > dirt * 1.05)) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== ÍMÃ: atrai a tampinha pro centro (e captura tiro fraco) ===');
{
  // ímã descentrado (y=26): o tiro reto por y=20 tem que ser PUXADO pra cima
  const path: any[] = []; for (let i = 0; i <= 40; i++) path.push(vec(5 + i * 2, 20));
  const def: TrackDef = { id: 0, name: 't', theme: 'q', level: 0, w: 90, h: 40, ground: 'dirt', bg: '#000', wallCol: '#000',
    path, half: path.map(() => 9), pads: [], patches: [{ surface: 'magnet', x: 20, y: 24, r: 6 }],
    walls: [], obstacles: [], checkpoints: [vec(5, 20)], start: vec(5, 20), startAngle: 0, finish: [vec(85, 11), vec(85, 29)], decor: [] } as any;
  const tm = new TrackModel(def);
  const shot = (vx: number) => {
    const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
    c.pos = vec(8, 20); c.cpPos = vec(8, 20); c.resetTo = vec(8, 20); c.vel = vec(vx, 0); c.moving = true;
    for (let i = 0; i < 2000 && c.moving; i++) stepWorld([c], tm, 1 / 120);
    return c.pos;
  };
  const fast = shot(22), slow = shot(14);
  const dSlow = Math.hypot(slow.x - 20, slow.y - 24);
  console.log(`  tiro forte: desviou pra y=${fast.y.toFixed(1)} (>20.6? ${fast.y > 20.6}) · tiro fraco: parou a ${dSlow.toFixed(1)} do ímã (capturado? ${dSlow < 6.5})`);
  if (!(fast.y > 20.6 && dSlow < 6.5)) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== REDEMOINHO: gira a trajetória (o tiro sai TORTO) ===');
{
  const reto = launch(lane(null), {}, 20).dev;
  const vor = launch(lane('vortex'), {}, 20).dev;
  console.log(`  desvio lateral: sem=${reto.toFixed(2)} · com redemoinho=${vor.toFixed(2)} → girou? ${vor > reto + 2}`);
  if (!(vor > reto + 2)) { console.log('  ✗'); process.exit(1); }
}
console.log('\n=== CHICLETE: peteleco SAINDO dele sai fraco (manager + IA sabem) ===');
{
  const { GameManager } = await import('../src/game/manager');
  const { track } = await import('../src/game/generator');
  const mgr = new GameManager();
  mgr.setup(track(0, 0), [{ name: 'A', isAI: false, skin: 'coca' }, { name: 'B', isAI: true, ai: 'tecnico', skin: 'fanta' }] as any);
  // teleporta a tampinha ativa pra cima de um chiclete sintético
  (mgr.track.def.patches as any).push({ surface: 'gum', x: mgr.caps[0].pos.x, y: mgr.caps[0].pos.y, r: 3 });
  const before = mgr.track.surfaceAt(mgr.caps[0].pos);
  mgr.flick({ x: 1, y: 0 }, 1);
  const v0 = Math.hypot(mgr.caps[0].vel.x, mgr.caps[0].vel.y);
  console.log(`  em cima de '${before}': v0=${v0.toFixed(1)} (máx 27 → deve ~14.9) · fraco? ${v0 < 16}`);
  if (before !== 'gum' || v0 > 16) { console.log('  ✗'); process.exit(1); }
  (mgr.track.def.patches as any).pop();   // limpa o chiclete sintético (def é cacheada)
}
console.log('\n=== CHICLETE NÃO É PRISÃO: do CENTRO da mancha, o peteleco fraco ESCAPA ===');
{
  // pior caso: parada no MEIO de um chiclete grande (r=3.2) — o próximo peteleco
  // sai a 27×0.55 e ainda assim tem que sair da mancha (senão vira soft-lock)
  const path: any[] = []; for (let i = 0; i <= 40; i++) path.push(vec(5 + i * 2, 20));
  const def: TrackDef = { id: 0, name: 't', theme: 'q', level: 0, w: 90, h: 40, ground: 'dirt', bg: '#000', wallCol: '#000',
    path, half: path.map(() => 8), pads: [], patches: [{ surface: 'gum', x: 30, y: 20, r: 2.05 }],
    walls: [], obstacles: [], checkpoints: [vec(5, 20)], start: vec(5, 20), startAngle: 0, finish: [vec(85, 12), vec(85, 28)], decor: [] } as any;
  const tm = new TrackModel(def);
  const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
  c.pos = vec(30, 20); c.cpPos = vec(30, 20); c.resetTo = vec(30, 20);
  c.vel = vec(27 * 0.55, 0); c.moving = true;   // peteleco máximo JÁ com a pena do chiclete
  for (let i = 0; i < 2000 && c.moving; i++) stepWorld([c], tm, 1 / 120);
  const dOut = Math.hypot(c.pos.x - 30, c.pos.y - 20);
  console.log(`  parou a ${dOut.toFixed(1)} do centro (r=2.05, a maior do jogo) → escapou? ${dOut > 2.05}`);
  if (!(dOut > 2.05)) { console.log('  PRESA NO CHICLETE ✗'); process.exit(1); }
}
console.log('\n=== GERADOR: temas novos entram em 2 pistas por nível ===');
{
  const { track, TRACKS_PER_LEVEL } = await import('../src/game/generator');
  const seen: Record<string, number> = {};
  for (let lv = 0; lv < 5; lv++) {
    const news: string[] = [];
    for (let i = 0; i < TRACKS_PER_LEVEL; i++) {
      const t = track(lv, i);
      if (['sinuca', 'geladeira', 'bancada', 'sala'].includes(t.theme)) { news.push(`${i}:${t.theme}`); seen[t.theme] = (seen[t.theme] || 0) + 1; }
    }
    console.log(`  nível ${lv}: ${news.join(' · ') || 'nenhuma?!'}`);
    if (news.length !== 2) { console.log('  DEVIA TER 2 ✗'); process.exit(1); }
  }
  const all4 = ['sinuca', 'geladeira', 'bancada', 'sala'].every(k => seen[k] > 0);
  console.log(`  os 4 temas aparecem no jogo? ${all4}`);
  if (!all4) { console.log('  ✗'); process.exit(1); }
}
console.log('\n✅ surfcheck fim');
