// valida a CAMPANHA: recompensas, gating, upgrades e uma competição completa
import { COMPS, applyResult, campState, saveCamp, campStats, isUnlocked, pickOpponents, upCost, UP_MAX, LIGA_PRIZE, ligaGolds } from '../src/game/campaign';
import { save } from '../src/game/save';
import { SKINS, skinById, unlockedSkins } from '../src/game/skins';
import { GameManager, PlayerDef } from '../src/game/manager';
import { track } from '../src/game/generator';

// localStorage fake p/ Node
(globalThis as any).localStorage = { _d: {} as any, getItem(k: string) { return this._d[k] ?? null; }, setItem(k: string, v: string) { this._d[k] = v; }, removeItem(k: string) { delete this._d[k]; } };

console.log('=== ESTRUTURA ===');
console.log(`competições: ${COMPS.length} (5 ligas × 4) · corridas totais: ${COMPS.reduce((s, c) => s + c.races, 0)}`);
const starters = SKINS.filter(s => s.hidden);
console.log(`starters ocultas: ${starters.map(s => s.id).join(', ')} · fora da coleção? ${starters.every(s => s.unlock === 99999)}`);

console.log('\n=== GATING ===');
let st = campState(); st.cap = 'enferrujada'; saveCamp(st);
console.log(`q1 liberada? ${isUnlocked(st, 0)} · q2 antes do pódio? ${isUnlocked(st, 1)} (deve false)`);
applyResult(campState(), 'q1', 3);   // bronze
console.log(`q2 depois do bronze? ${isUnlocked(campState(), 1)} (deve true)`);

console.log('\n=== RECOMPENSAS (bronze→ouro dá diferença) ===');
let s1 = campState();
console.log(`  bronze: +2 pts? ${s1.pts === 2} · wins=${save.wins()} (deve 1)`);
const r2 = applyResult(campState(), 'q1', 1);   // melhora pra ouro
s1 = campState();
console.log(`  ouro depois: ganhou +${r2.pts} pts (deve 3) e +${r2.wins} win (deve 1) · total pts=${s1.pts} (deve 5)`);
const r3 = applyResult(campState(), 'q1', 1);   // repete ouro
console.log(`  repetir ouro: +${r3.pts} pts (deve 0)`);

console.log('\n=== OFICINA ===');
let s2 = campState(); s2.pts = 20; s2.alloc = { slide: 5, control: 3 }; saveCamp(s2);
const base = skinById('enferrujada').stats, up = campStats(campState());
console.log(`  slide ${base.slide} → ${up.slide} (+0.06?) · control ${base.control} → ${up.control} (+0.036?)`);
console.log(`  custo nível 0→1: ${upCost(0)} · 4→5: ${upCost(4)} · 8→9: ${upCost(8)} · máx ${UP_MAX} níveis`);

console.log('\n=== ADVERSÁRIOS ===');
const oppQ = pickOpponents(COMPS[0]); const oppM = pickOpponents(COMPS[19]);
console.log(`  q1: ${oppQ.map(o => skinById(o).rarity).join(',')} (comuns) · m4: ${oppM.map(o => skinById(o).rarity).join(',')} (míticas)`);
console.log(`  sem hidden? ${[...oppQ, ...oppM].every(o => !skinById(o).hidden)}`);

console.log('\n=== COMPETIÇÃO COMPLETA (q1, jogador IA-guiado) ===');
{
  const c = COMPS[0]; const stc = campState();
  const pts = new Map<number, number>(); const table = [12, 9, 7, 5, 3, 1];
  for (let r = 0; r < c.races; r++) {
    const players: PlayerDef[] = [
      { name: 'Você', isAI: true, ai: 'tecnico', skin: stc.cap!, stats: campStats(stc) },   // IA joga por nós no teste
      ...pickOpponents(c).map((sk, i) => ({ name: 'R' + i, isAI: true, ai: c.aiKinds[i % c.aiKinds.length], skin: sk })),
    ];
    const mgr = new GameManager(); mgr.setup(track(c.level, r % 10), players);
    let steps = 0; while (mgr.phase !== 'over' && steps < 200000) { mgr.update(1 / 60); steps++; }
    if (mgr.phase !== 'over') { console.log('  TRAVOU ✗'); process.exit(1); }
    mgr.standings().forEach((cp, i) => pts.set(cp.id, (pts.get(cp.id) || 0) + (table[i] || 0)));
  }
  const rows = [...pts.entries()].sort((a, b) => b[1] - a[1]);
  const place = rows.findIndex(([id]) => id === 0) + 1;
  console.log(`  ${c.races} corridas completas · você terminou em ${place}º · OK ✓`);
}

console.log('\n=== OFICINA CHEGA NA CORRIDA (upgrades na tampinha DA PARTIDA) ===');
{
  const stc = campState();
  stc.alloc = { power: 4, slide: 2 }; saveCamp(stc);
  const cs = campStats(campState());
  const bs = skinById(stc.cap!).stats as any;
  const okMath = Math.abs(cs.power - (bs.power + 4 * 0.012)) < 1e-6 && Math.abs(cs.slide - (bs.slide + 2 * 0.012)) < 1e-6;
  const players2: PlayerDef[] = [
    { name: 'Você', isAI: true, ai: 'tecnico', skin: stc.cap!, stats: cs },
    { name: 'R0', isAI: true, ai: 'tecnico', skin: 'coca' },
  ];
  const mgr2 = new GameManager(); mgr2.setup(track(0, 0), players2);
  const inRace = mgr2.caps[0].stats;
  const okRace = Math.abs(inRace.power - cs.power) < 1e-6 && Math.abs(inRace.slide - cs.slide) < 1e-6
    && inRace.power > bs.power && inRace.slide > bs.slide;
  console.log(`  campStats soma certo? ${okMath} · tampinha da corrida usa os upgrades? ${okRace}`);
  if (!okMath || !okRace) { console.log('  OFICINA NÃO APLICADA ✗'); process.exit(1); }
}

console.log('\n=== PRÊMIO DE LIGA (ouro nas 4 → tampinha exclusiva) ===');
{
  const stq = campState();
  stq.best['q1'] = 1; stq.best['q2'] = 1; stq.best['q3'] = 1; saveCamp(stq);
  const before = save.hasBonus(LIGA_PRIZE[0]);
  const r = applyResult(campState(), 'q4', 1);            // 4º ouro da Liga do Quintal
  const after = save.hasBonus(LIGA_PRIZE[0]);
  const inColl = unlockedSkins(save.wins()).some(k => k.id === LIGA_PRIZE[0]);
  console.log(`  antes=${before} · prize devolvido=${r.prize} · conquistada=${after} · aparece na coleção=${inColl}`);
  const r2 = applyResult(campState(), 'q4', 1);           // repetir não dá de novo
  console.log(`  repetir ouro: prize=${r2.prize} (deve null)`);
  if (!after || r.prize !== LIGA_PRIZE[0] || !inColl || r2.prize !== null) { console.log('  PRÊMIO FALHOU ✗'); process.exit(1); }
  const g = ligaGolds(campState(), 0);
  console.log(`  ligaGolds(0)=${g} (deve 4) · id='${LIGA_PRIZE[0]}' stats ok? ${skinById(LIGA_PRIZE[0]).stats.slide > 1}`);
}

console.log('\n=== FINAL (Grande Final vencida = zerou + bônus) ===');
{
  const before = campState().pts; const winsBefore = save.wins();
  const res = applyResult(campState(), 'm4', 1);
  const after = campState();
  console.log(`  finished=${res.finished} · done=${after.done} · pts +${after.pts - before} (5+10=15?) · wins +${save.wins() - winsBefore} (2+10=12?)`);
}
console.log('\n✅ campcheck fim');
