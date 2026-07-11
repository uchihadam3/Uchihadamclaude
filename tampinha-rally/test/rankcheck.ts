// PROVA o modo RANQUEADA: estrutura das 40 competições, corrente de desbloqueio,
// força crescente dos rivais, elegibilidade por tier, pontos melhor-de, prêmio
// de ouro 8/8, stats das exclusivas (~2.5% acima das de liga) e o CRDT do
// ranking (nome único, lápide, fusão determinística).
import { RANK_TIERS, RANK_COMPS, rankState, saveRank, rankTotal, tierGolds, rankUnlocked, RANK_PRIZE, eligibleCaps, applyRankResult, pickRankOpponents, boostStats, compMax, RANK_MAX_TOTAL, BOOSTS, rankCompById } from '../src/game/ranked';
import { SKINS, skinById, rarityIndex } from '../src/game/skins';
import { save } from '../src/game/save';
import { mergeRow, mergeBoards, nameFree, standings, nameKey, validName, RankRow, Board } from '../src/net/rank';

const die = (m: string) => { console.log('  ✗ ' + m); process.exit(1); };

console.log('=== ESTRUTURA: 5 tiers × 8 competições ===');
{
  if (RANK_COMPS.length !== 40) die('não são 40 comps');
  for (let t = 0; t < 5; t++) if (RANK_COMPS.filter(c => c.tier === t).length !== 8) die('tier ' + t + ' != 8');
  // boost cresce de 0 até 0.45 (30-50% na última)
  for (let i = 1; i < 8; i++) if (BOOSTS[i] <= BOOSTS[i - 1]) die('boost não cresce');
  if (BOOSTS[0] !== 0 || BOOSTS[7] < 0.3 || BOOSTS[7] > 0.5) die('boost final fora de 30-50%');
  const races = RANK_COMPS.filter(c => c.tier === 0).reduce((s, c) => s + c.races, 0);
  console.log(`  40 comps ✓ · boosts ${BOOSTS.map(b => Math.round(b * 100) + '%').join(' ')} · ${races} corridas/tier · máx total ${RANK_MAX_TOTAL}`);
  if (RANK_MAX_TOTAL !== RANK_COMPS.reduce((s, c) => s + c.races * 12, 0)) die('máximo errado');
}

console.log('\n=== DESBLOQUEIO: pódio abre a próxima (corrente única) ===');
{
  const st = rankState();
  if (!rankUnlocked(st, 0)) die('primeira trancada');
  if (rankUnlocked(st, 1)) die('segunda aberta sem pódio');
  applyRankResult(st, 'rk00', 4, 10, 'coca');                       // 4º: não abre
  if (rankUnlocked(rankState(), 1)) die('abriu com 4º lugar');
  applyRankResult(st, 'rk00', 3, 14, 'coca');                       // bronze: abre
  if (!rankUnlocked(rankState(), 1)) die('não abriu com bronze');
  if (rankUnlocked(rankState(), 2)) die('pulou etapa');
  console.log('  4º não abre · 🥉 abre · não pula ✓');
}

console.log('\n=== PONTOS: melhor-de por competição (exemplo do usuário) ===');
{
  const st = rankState();
  // "fez 9 e 12 → 21" na comp 1; depois melhora pra 24 → score usa 24
  applyRankResult(st, 'rk01', 2, 21, 'coca');
  let r = applyRankResult(st, 'rk02', 1, 30, 'coca');
  if (rankTotal(rankState()) !== 14 + 21 + 30) die('soma errada: ' + rankTotal(rankState()));
  r = applyRankResult(st, 'rk01', 1, 24, 'coca');
  if (r.dPts !== 3) die('melhora deveria dar +3, deu ' + r.dPts);
  r = applyRankResult(st, 'rk01', 2, 18, 'coca');                   // piorou: não desce
  if (r.dPts !== 0 || rankState().best['rk01'] !== 24) die('melhor-de regrediu');
  console.log(`  21→24 soma +3 · piora não desce · total ${rankTotal(rankState())} ✓`);
}

console.log('\n=== OURO 8/8 do tier → tampinha exclusiva (1 vez só) ===');
{
  const st = rankState();
  for (let i = 0; i < 8; i++) {
    const c = RANK_COMPS[i];
    const res = applyRankResult(st, c.id, 1, compMax(c), 'coca');
    if (i < 7 && res.prize) die('prêmio antes da hora');
    if (i === 7 && res.prize !== RANK_PRIZE[0]) die('não deu o prêmio no 8º ouro');
  }
  if (!save.hasBonus('mineirinho')) die('bônus não salvo');
  const again = applyRankResult(st, 'rk07', 1, compMax(rankCompById('rk07')), 'coca');
  if (again.prize) die('prêmio dado duas vezes');
  if (tierGolds(rankState(), 0) !== 8) die('golds != 8');
  console.log('  🥇×8 → Mineirinho · não repete ✓');
}

console.log('\n=== ELEGIBILIDADE: raridade ≤ tier (exclusivas pela própria raridade) ===');
{
  for (let i = 0; i < 200; i++) save.addWin();                       // desbloqueia tudo por vitórias
  save.addBonus('guaranajesus');                                     // exclusiva mítica ganha
  const t0 = eligibleCaps(0), t1 = eligibleCaps(1), t4 = eligibleCaps(4);
  if (t0.some(k => k.rarity !== 'comum')) die('tier 0 com não-comum');
  if (!t0.some(k => k.id === 'mineirinho')) die('exclusiva comum fora do tier 0');
  if (!t1.some(k => k.rarity === 'rara') || t1.some(k => rarityIndex(k.rarity) > 1)) die('tier 1 errado');
  if (t0.some(k => k.id === 'guaranajesus')) die('mítica no tier 0!');
  if (!t4.some(k => k.id === 'guaranajesus')) die('mítica ganha fora do tier 4');
  console.log(`  tier0=${t0.length} só comuns · tier1 até rara · Guaraná Jesus só no tier4 ✓`);
}

console.log('\n=== RIVAIS: raridade do tier + boost da etapa ===');
{
  const c7 = rankCompById('rk07');                                   // 8ª do normal: +45%
  const opp = pickRankOpponents(c7, () => 0.5);
  if (opp.length !== c7.nOpp) die('nº de rivais');
  for (const o of opp) {
    const sk = skinById(o.skin);
    if (sk.rarity !== 'comum' || sk.prize != null || sk.rprize != null) die('rival fora do pool: ' + o.skin);
    const base = sk.stats;
    const ratio = o.stats.power / base.power;
    if (Math.abs(ratio - (base.power >= 1 ? 1.45 : 1.225)) > 0.01) die('boost não aplicado: ' + ratio);
  }
  const b = boostStats({ weight: 1, slide: 1.1, stability: 0.9, bounce: 1, control: 1, power: 1, grip: 1 } as any, 0.45);
  if (b.slide !== +(1.1 * 1.45).toFixed(3) || b.stability !== +(0.9 * 1.225).toFixed(3)) die('boostStats');
  console.log(`  ${opp.length} rivais comuns +45% (cheio ≥1, metade <1) ✓`);
}

console.log('\n=== EXCLUSIVAS DA RANQUEADA: 2-3% acima das de liga em TODO atributo ===');
{
  // mesmo arquétipo da exclusiva de liga do tier → cada atributo 1.5-2.6% maior
  const LIGA = ['itubaina', 'nesbitts', 'hires', 'guarana', 'schweppes'];
  for (let i = 0; i < 5; i++) {
    const a = skinById(RANK_PRIZE[i]).stats as any, b = skinById(LIGA[i]).stats as any;
    for (const k of Object.keys(b)) {
      const ratio = a[k] / b[k];
      if (ratio <= 1.0 || ratio > 1.031) die(`${RANK_PRIZE[i]}.${k} ratio ${ratio.toFixed(4)} fora de (1, 1.031]`);
    }
  }
  console.log('  5/5 dominam a exclusiva de liga do tier (+1.5% a +2.6% por atributo) ✓');
}

console.log('\n=== CRDT DO RANKING: nome único, lápide, fusão determinística ===');
{
  const row = (name: string, dev: string, claimTs: number, ts: number, score = 0, del?: number): RankRow =>
    ({ name, dev, score, tier: 0, golds: 0, cap: 'coca', claimTs, ts, del });
  // claim mais antigo vence, em qualquer ordem de fusão
  const a = row('Diego', 'devA', 100, 500, 30), b = row('Diego', 'devB', 200, 900, 80);
  if (mergeRow(a, b) !== a || mergeRow(b, a) !== a) die('claim antigo não venceu');
  // mesmo dono: mais recente vence (atualização de score)
  const a2 = row('Diego', 'devA', 100, 600, 55);
  if (mergeRow(a, a2) !== a2) die('update do dono perdeu');
  // lápide: libera só pra claim POSTERIOR à exclusão
  const dead = row('Diego', 'devA', 100, 700, 0, 700);
  const before = row('Diego', 'devB', 650, 800, 10);                 // reivindicou ANTES da exclusão
  const after = row('Diego', 'devB', 750, 800, 10);                  // reivindicou DEPOIS
  if (mergeRow(dead, before) !== dead) die('claim anterior à exclusão roubou o nome');
  if (mergeRow(dead, after) !== after) die('nome não liberou após exclusão');
  // nameFree + normalização (acento/caixa/espaço)
  const board: Board = {}; mergeBoards(board, { [nameKey('Diego')]: a });
  if (nameFree(board, 'diego', 'devB')) die('nome duplicado passou');
  if (nameFree(board, 'DIÉGO', 'devB')) die('acento burlou a unicidade');
  if (!nameFree(board, 'Diego', 'devA')) die('o dono não pode o próprio nome?');
  mergeBoards(board, { [nameKey('Diego')]: dead });
  if (!nameFree(board, 'Diego', 'devB')) die('lápide não liberou');
  // classificação ignora lápides e ordena por score
  const bd: Board = {};
  mergeBoards(bd, { [nameKey('Ana')]: row('Ana', 'd1', 1, 1, 90), [nameKey('Bia')]: row('Bia', 'd2', 2, 2, 120), [nameKey('Ze')]: row('Ze', 'd3', 3, 3, 50, 9) });
  const stds = standings(bd);
  if (stds.length !== 2 || stds[0].name !== 'Bia') die('standings errado');
  if (!validName('Diego') === false || validName('a') === null || validName('nome_com_mais_de_12') === null) die('validName');
  console.log('  claim antigo vence · lápide libera · normalização · standings ✓');
}

console.log('\n✅ rankcheck fim');
