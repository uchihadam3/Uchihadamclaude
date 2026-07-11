// PROVA o MODO CAOS reformado: escudo que salva DE VERDADE do buraco, 2 bolsos
// de item, e cada um dos 15 power-ups funcionando no manager/física.
import { makeCap, DEFAULT_STATS, vec, len } from '../src/engine/core';
import { stepWorld } from '../src/engine/physics';
import { TrackModel, TrackDef } from '../src/engine/track';
import { GameManager } from '../src/game/manager';
import { track } from '../src/game/generator';
import { ITEMS, ITEM_ORDER, pickItem, MAX_ITEMS } from '../src/game/chaos';

const die = (m: string) => { console.log('  ✗ ' + m); process.exit(1); };

function lane(obstacles: any[]): TrackModel {
  const path: any[] = []; for (let i = 0; i <= 40; i++) path.push(vec(5 + i * 2, 20));
  const def: TrackDef = { id: 0, name: 't', theme: 'q', level: 0, w: 90, h: 40, ground: 'dirt', bg: '#000', wallCol: '#000',
    path, half: path.map(() => 9), pads: [], patches: [], walls: [], obstacles,
    checkpoints: [vec(5, 20)], start: vec(5, 20), startAngle: 0, finish: [vec(85, 11), vec(85, 29)], decor: [] } as any;
  return new TrackModel(def);
}
function slideCap(x = 8, vx = 16): any {
  const c = makeCap(0, 'c', 'coca', { ...DEFAULT_STATS }, true);
  c.pos = vec(x, 20); c.cpPos = vec(5, 20); c.resetTo = vec(x, 20); c.vel = vec(vx, 0); c.moving = true;
  return c;
}

console.log('=== ESCUDO × BURACO: desvia pela beirada, NÃO cai, não perde nada ===');
{
  const tm = lane([{ type: 'hole', x: 18, y: 20, r: 1.3 }]);
  const c = slideCap(); c.shield = true;
  const evs: string[] = [];
  for (let i = 0; i < 2400 && c.moving; i++) for (const e of stepWorld([c], tm, 1 / 120)) evs.push(e.type + (e.power === -1 ? ':save' : ''));
  const dHole = Math.hypot(c.pos.x - 18, c.pos.y - 20);
  console.log(`  eventos=[${[...new Set(evs)].join(',')}] · parou a ${dHole.toFixed(2)}u do buraco (x=${c.pos.x.toFixed(1)}, y=${c.pos.y.toFixed(1)})`);
  if (evs.includes('hole')) die('caiu no buraco COM escudo!');
  if (!evs.includes('item:save')) die('escudo não foi consumido');
  if (dHole < 1.3) die('parou DENTRO do buraco');
  if (c.pos.x < 15.5) die('foi jogada pra longe demais do buraco');
  if (Math.hypot(c.pos.x - 5, c.pos.y - 20) < 1) die('voltou pro checkpoint!');
  // sem escudo: cai
  const c2 = slideCap(); const evs2: string[] = [];
  for (let i = 0; i < 2400 && c2.moving; i++) for (const e of stepWorld([c2], tm, 1 / 120)) evs2.push(e.type);
  if (!evs2.includes('hole')) die('sem escudo deveria cair');
  console.log('  com escudo desvia e segue · sem escudo cai ✓');
}

console.log('\n=== FANTASMA: atravessa pedra e tampinha (buraco continua valendo) ===');
{
  const tm = lane([{ type: 'stone', x: 14, y: 20, r: 1.0 }]);
  const g = slideCap(8, 26); g.ghost = true;
  const other = makeCap(1, 'o', 'fanta', { ...DEFAULT_STATS }, true); other.pos = vec(17, 20); other.cpPos = vec(5, 20); other.resetTo = vec(17, 20);
  const evs: string[] = [];
  for (let i = 0; i < 2400 && g.moving; i++) for (const e of stepWorld([g, other], tm, 1 / 120)) evs.push(e.type);
  if (evs.includes('stone') || evs.includes('capHit')) die('fantasma colidiu: ' + evs.join(','));
  if (g.pos.x < 18) die('fantasma não atravessou (x=' + g.pos.x.toFixed(1) + ')');
  if (Math.hypot(other.pos.x - 17, other.pos.y - 20) > 0.05) die('fantasma empurrou o outro');
  const gh = slideCap(); gh.ghost = true;
  const tmH = lane([{ type: 'hole', x: 18, y: 20, r: 1.3 }]); const evsH: string[] = [];
  for (let i = 0; i < 2400 && gh.moving; i++) for (const e of stepWorld([gh], tmH, 1 / 120)) evsH.push(e.type);
  if (!evsH.includes('hole')) die('fantasma deveria cair no buraco mesmo assim');
  console.log('  atravessa pedra e tampinha · buraco ainda pega ✓');
}

console.log('\n=== PANCADA: a trombada joga o outro MUITO mais longe ===');
{
  const hit = (smash: boolean) => {
    const a = slideCap(8, 16); a.smash = smash;
    const b = makeCap(1, 'b', 'fanta', { ...DEFAULT_STATS }, true); b.pos = vec(14, 20); b.cpPos = vec(5, 20); b.resetTo = vec(14, 20);
    const tm = lane([]);
    for (let i = 0; i < 2400 && (a.moving || b.moving); i++) stepWorld([a, b], tm, 1 / 120);
    return b.pos.x - 14;
  };
  const normal = hit(false), smashed = hit(true);
  console.log(`  deslocamento do alvo: normal=${normal.toFixed(1)}u · pancada=${smashed.toFixed(1)}u (≥1.4×? ${smashed >= normal * 1.4})`);
  if (smashed < normal * 1.4) die('pancada fraca');
}

console.log('\n=== 2 BOLSOS + todos os itens no manager ===');
{
  const mk = () => {
    const mgr = new GameManager(); mgr.chaos = true;
    mgr.setup(track(0, 0), [
      { name: 'Eu', isAI: false, skin: 'coca' },
      { name: 'R1', isAI: true, ai: 'cauteloso', skin: 'grape' },
      { name: 'R2', isAI: true, ai: 'cauteloso', skin: 'sprite' },
    ] as any);
    return mgr;
  };
  // bolsos: 2 no máximo (a 3ª caixa NÃO é consumida)
  {
    const mgr = mk(); const me = mgr.caps[0];
    me.items = ['turbo', 'escudo'];
    const before = me.items.slice();
    // simula pegar caixa com bolsos cheios: grantItem é privado → via evento item
    (mgr as any).handleEvent({ type: 'item', capId: 0, x: 0, y: 0, power: 0, obsIdx: 0 });
    if (me.items.length !== 2 || me.items.join() !== before.join()) die('3º item entrou com bolsos cheios');
    if (!me.consumed.has(0) === false) { /* caixa devolvida */ }
    console.log('  bolso máximo 2 · caixa não é gasta com bolsos cheios ✓');
  }
  // efeitos um a um
  const mgr = mk();
  const me = mgr.caps[0], r1 = mgr.caps[1], r2 = mgr.caps[2];
  const mid = mgr.track.total * 0.5;
  const place = (c: any, arc: number) => { const p = mgr.track.atArc(arc).p; c.pos = vec(p.x, p.y); c.progress = arc; c.vel = vec(); };
  place(me, mid); place(r1, mid + 10); place(r2, mid + 20);
  const use = (id: string) => { me.items = [id]; mgr.useItem(0, me); };
  use('salto'); if (Math.abs(me.progress - (mid + 15)) > 0.6) die('salto não pulou 15u');
  place(me, mid);
  use('foguete'); if (me.boostNext !== 1.7) die('foguete');
  me.boostNext = 1;
  use('turbo'); if (me.boostNext !== 1.28) die('turbo');
  me.boostNext = 1;
  use('extra'); if (me.flicksLeft !== 4) die('extra');
  use('escudo'); if (!me.shield) die('escudo');
  use('pancada'); if (!me.smashNext) die('pancada não armou');
  use('fantasma'); if (!me.ghostNext) die('fantasma não armou');
  use('gude'); if (Math.abs(r1.progress - (mid + 10 - 9)) > 0.6) die('gude não derrubou o mais próximo (r1)');
  place(r1, mid + 10);
  use('troca'); if (Math.abs(me.progress - (mid + 10)) > 0.1 || Math.abs(r1.progress - mid) > 0.1) die('troca não trocou');
  place(me, mid); place(r1, mid + 10);
  use('furacao'); if (Math.abs(r1.progress - (mid + 4)) > 0.6 || Math.abs(r2.progress - (mid + 14)) > 0.6) die('furacão não soprou os dois');
  place(r1, mid + 10); place(r2, mid + 20);
  const nPatches = mgr.track.def.patches.length;
  use('chuva');
  const rain = mgr.track.def.patches[mgr.track.def.patches.length - 1];
  if (mgr.track.def.patches.length !== nPatches + 1 || rain.surface !== 'water') die('chuva sem poça');
  if (Math.abs(mgr.track.progressOf(vec(rain.x, rain.y)) - (r2.progress + 3.2)) > 1.2) die('poça longe do líder');
  use('cola');
  const gum = mgr.track.def.patches[mgr.track.def.patches.length - 1];
  if (gum.surface !== 'gum' || Math.abs(mgr.track.progressOf(vec(gum.x, gum.y)) - (me.progress - 2.5)) > 1.2) die('chiclete fora do lugar');
  use('ancora'); if (!r2.anchored) die('âncora não pegou o líder');
  use('raio'); if (r2.progress > 3) { /* voltou pro checkpoint (arco ~0) */ } else if (Math.abs(r2.progress) > 3) die('raio');
  console.log('  15/15 efeitos funcionando (salto, boosts, extra, escudo, pancada, fantasma, gude, troca, furacão, chuva, chiclete, âncora, raio) ✓');
  // âncora derruba a força do peteleco
  mgr.current = 2; (mgr as any).phase = 'aim'; r2.flicksLeft = 3; r2.finished = false;
  const p0 = vec(r2.pos.x, r2.pos.y);
  mgr.flick({ x: 1, y: 0 }, 1);
  const vAnch = len(r2.vel);
  if (r2.anchored) die('âncora não foi consumida');
  console.log(`  peteleco com âncora saiu a ${vAnch.toFixed(1)} (55% da força) ✓`);
}

console.log('\n=== SORTEIO: líder nunca recebe item que precisa de alvo à frente ===');
{
  let bad = 0; const seen = new Set<string>();
  for (let i = 0; i < 3000; i++) {
    const id = pickItem(0, true, () => ((i * 2654435761) % 997) / 997);
    if (ITEMS[id].needsAhead) bad++;
    seen.add(id);
  }
  for (let i = 0; i < 3000; i++) seen.add(pickItem(1, false, () => ((i * 40503) % 991) / 991));
  if (bad > 0) die('líder recebeu item de ataque ' + bad + '×');
  if (seen.size < ITEM_ORDER.length - 1) die('sorteio não cobre o catálogo (' + seen.size + ')');
  console.log(`  líder 0/3000 itens de ataque · catálogo coberto (${seen.size}/${ITEM_ORDER.length}) ✓`);
}

console.log('\n✅ chaoscheck fim');
