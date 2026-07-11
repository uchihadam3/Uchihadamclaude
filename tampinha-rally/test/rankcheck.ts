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

console.log('\n=== PISTA FIXA: mesma semente → mesma sequência (só troca com conta nova) ===');
{
  const { seededTrack, track, TRACKS_PER_LEVEL } = await import('../src/game/generator');
  const st = rankState();
  if (!st.seed) die('conta sem semente');
  // determinístico: reiniciar/sair/voltar dá SEMPRE a mesma pista
  for (const c of ['rk00', 'rk23', 'rk47' in {} ? '' : 'rk35']) {
    if (!c) continue;
    const a = seededTrack(st.seed, c, 0);
    if (seededTrack(st.seed, c, 0) !== a || seededTrack(st.seed, c, 0) !== a) die('não determinístico');
  }
  // corridas da MESMA competição nunca repetem a "cara" da pista (até 5 corridas)
  for (let s = 1; s < 40; s++) {
    const seen = new Set<number>();
    for (let r = 0; r < 5; r++) seen.add(seededTrack(s * 977, 'rk05', r) % TRACKS_PER_LEVEL);
    if (seen.size !== 5) die('pista repetiu dentro da competição (seed ' + s + ')');
  }
  // toda competição tem salt de variante (≥1) + sementes diferentes variam
  let dif = 0;
  for (let s = 1; s <= 50; s++) { const v = seededTrack(s, 'rk00', 0); if (v < TRACKS_PER_LEVEL) die('competição sem salt de variante'); if (v !== seededTrack(s + 1, 'rk00', 0)) dif++; }
  if (dif < 30) die('sementes não variam as pistas');
  // COMPETIÇÕES DIFERENTES nunca repetem o traçado: mesmo que a mesma "cara"
  // (Quintal, Praia…) volte na próxima, o salt muda e as curvas são outras
  for (let s = 1; s <= 40; s++) {
    const salts = ['rk00', 'rk01', 'rk02', 'rk03', 'rk04'].map(c => Math.floor(seededTrack(s * 977, c, 0) / TRACKS_PER_LEVEL));
    if (new Set(salts).size !== 5) die('salt repetiu entre competições (seed ' + s + ')');
  }
  // a variante mantém tema e nome da pista-base, mas o traçado é OUTRO
  {
    const va = seededTrack(123456, 'rk00', 0);
    const vb = va + TRACKS_PER_LEVEL;                       // mesma cara, salt seguinte
    const ta = track(0, va), tb = track(0, vb), tbase = track(0, va % TRACKS_PER_LEVEL);
    if (ta.name !== tbase.name || ta.theme !== tbase.theme) die('variante mudou a cara da pista');
    const difPath = (x: any, y: any) => x.path.length !== y.path.length ||
      Math.hypot(x.path[40].x - y.path[40].x, x.path[40].y - y.path[40].y) > 0.5;
    if (!difPath(ta, tbase)) die('variante com o mesmo traçado da base');
    if (!difPath(ta, tb)) die('salts diferentes com o mesmo traçado');
  }
  // excluir a conta troca a semente → run nova, pistas novas
  const old = st.seed;
  const { resetRank: rr } = await import('../src/game/ranked');
  rr();
  if (rankState().seed === old) die('resetRank manteve a semente');
  console.log('  determinístico · 5 corridas sem repetir cara · traçado único por competição · conta nova = semente nova ✓');
}

console.log('\n=== RANQUEADA CAOS: circuito separado (estado, semente, nomes, prêmios) ===');
{
  const { RANK_PRIZE_CAOS, rankPrizeOf } = await import('../src/game/ranked');
  const a = rankState('normal'), b = rankState('caos');
  // estados independentes: progresso num circuito não vaza pro outro
  b.best = {}; b.place = {};
  applyRankResult(b, 'rk00', 1, 20, 'coca', 'caos');
  if ((rankState('normal').best['rk00'] ?? 0) === 20 && rankState('caos').best['rk00'] !== 20) die('estados misturados');
  if (rankState('caos').best['rk00'] !== 20) die('estado caos não salvou');
  if (a.seed === b.seed) die('mesma semente nos dois circuitos');
  // prêmios próprios: ouro 8/8 no tier 0 do CAOS dá a Grapette (não a Mineirinho de novo)
  for (let i = 0; i < 8; i++) {
    const c = RANK_COMPS[i];
    const res = applyRankResult(rankState('caos'), c.id, 1, compMax(c), 'coca', 'caos');
    if (i === 7 && res.prize !== 'grapette') die('prêmio caos errado: ' + res.prize);
  }
  if (!save.hasBonus('grapette')) die('grapette não salva');
  if (rankPrizeOf('caos').join() !== RANK_PRIZE_CAOS.join()) die('lista de prêmios caos');
  // as 5 exclusivas do caos existem, são rcaos, têm força PARECIDA com as
  // clássicas do tier — mas personalidade DIFERENTE (não são clones de status)
  for (let i = 0; i < 5; i++) {
    const kc = skinById(RANK_PRIZE_CAOS[i]), kn = skinById(RANK_PRIZE[i]);
    if (!kc || kc.id === 'coca') die('exclusiva caos faltando: ' + RANK_PRIZE_CAOS[i]);
    if (!(kc as any).rcaos || kc.rprize !== i) die('flags da exclusiva caos');
    const mc = Object.values(kc.stats as any).reduce((s: number, v: any) => s + v, 0);
    const mn = Object.values(kn.stats as any).reduce((s: number, v: any) => s + v, 0);
    if (Math.abs(mc - mn) / mn > 0.01) die(`força desigual: ${kc.id} ${mc.toFixed(3)} vs ${kn.id} ${mn.toFixed(3)}`);
    // pelo menos 4 dos 7 atributos têm que diferir de verdade (>3%)
    let diff = 0;
    for (const k of Object.keys(kn.stats) as (keyof typeof kn.stats)[]) if (Math.abs(kc.stats[k] - kn.stats[k]) / kn.stats[k] > 0.03) diff++;
    if (diff < 4) die(`${kc.id} é clone de ${kn.id} (só ${diff}/7 atributos diferem)`);
  }
  // e diferentes ENTRE SI dentro do próprio circuito
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) {
    const a = skinById(RANK_PRIZE_CAOS[i]).stats as any, b = skinById(RANK_PRIZE_CAOS[j]).stats as any;
    let diff = 0; for (const k of Object.keys(a)) if (Math.abs(a[k] - b[k]) / b[k] > 0.03) diff++;
    if (diff < 3) die(`caos ${RANK_PRIZE_CAOS[i]} ~= ${RANK_PRIZE_CAOS[j]}`);
  }
  // nomes: quadros separados → "Diego" livre nos DOIS ao mesmo tempo
  const bd1: Board = {}, bd2: Board = {};
  const row = { name: 'Diego', dev: 'devA', score: 10, tier: 0, golds: 0, cap: 'coca', claimTs: 1, ts: 1 };
  mergeBoards(bd1, { [nameKey('Diego')]: row as any });
  if (!nameFree(bd2, 'Diego', 'devB')) die('quadros separados deveriam liberar o nome');
  if (nameFree(bd1, 'Diego', 'devB')) die('mesmo quadro deveria bloquear');
  // reset do caos não afeta o clássico
  const nSeedN = rankState('normal').seed;
  const { resetRank: rr2 } = await import('../src/game/ranked');
  rr2('caos');
  if (rankState('caos').best['rk00']) die('reset caos não zerou');
  if (rankState('normal').seed !== nSeedN) die('reset caos mexeu no clássico!');
  console.log('  estados/sementes separados · Grapette no ouro 8/8 · 5 exclusivas caos na mesma força · Diego nos dois quadros · reset isolado ✓');
}

console.log('\n=== TRANSPORTE GLOBAL: eventos assinados (adulteração rejeitada) ===');
{
  const { genSk, pkOf, signEvent, verifyEvent } = await import('../src/net/nostr');
  const sk = genSk();
  if (pkOf(sk).length !== 64) die('chave pública inválida');
  const row = { name: 'Diego', dev: 'd1', score: 51, tier: 0, golds: 0, cap: 'coca', claimTs: 1, ts: 2 };
  const ev = signEvent(sk, 30078, [['d', 'tmprally-rank-v2'], ['t', 'tmprally-rank-v2']], JSON.stringify(row));
  if (ev.id.length !== 64 || ev.sig.length !== 128) die('evento malformado');
  if (!verifyEvent(ev)) die('assinatura própria não verifica');
  if (verifyEvent({ ...ev, content: ev.content.replace('51', '999') })) die('conteúdo adulterado passou');
  if (verifyEvent({ ...ev, created_at: ev.created_at + 1 })) die('data adulterada passou');
  console.log('  assina/verifica ✓ · score e data adulterados são rejeitados ✓');
}

console.log('\n✅ rankcheck fim');
