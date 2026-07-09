// valida as COMPOSIÇÕES: acordes parseiam, nº de acordes = nº de compassos,
// melodias somam exatamente os tempos da seção e cada música dura 2–3.5 min.
import { SONGS, parseChord, parseMel, melBeats } from '../src/music';

let bad = 0;
console.log('=== TRILHA SONORA — validação das 7 músicas ===');
for (const id of Object.keys(SONGS)) {
  const s: any = (SONGS as any)[id];
  let bars = 0;
  const melBarsNeeded: Record<string, Set<number>> = {};
  for (let si = 0; si < s.secs.length; si++) {
    const sec = s.secs[si];
    bars += sec.bars;
    const toks = sec.ch.trim().split(/\s+/);
    if (toks.length !== sec.bars) { console.log(`  ✗ ${id} seção ${si}: ${toks.length} acordes p/ ${sec.bars} compassos`); bad++; }
    for (const t of toks) for (const c of t.split(',')) {
      try { parseChord(c); } catch (e) { console.log(`  ✗ ${id} seção ${si}: ${(e as Error).message}`); bad++; }
    }
    if (sec.mel) {
      if (!s.mels[sec.mel]) { console.log(`  ✗ ${id} seção ${si}: melodia '${sec.mel}' não existe`); bad++; }
      else (melBarsNeeded[sec.mel] ??= new Set()).add(sec.bars);
    }
  }
  for (const m of Object.keys(s.mels)) {
    try {
      parseMel(s.mels[m]);
      const beats = melBeats(s.mels[m]);
      const needs = melBarsNeeded[m];
      if (needs) for (const nb of needs) {
        if (Math.abs(beats - nb * 4) > 0.001) { console.log(`  ✗ ${id} melodia '${m}': soma ${beats} tempos, seção pede ${nb * 4}`); bad++; }
      }
    } catch (e) { console.log(`  ✗ ${id} melodia '${m}': ${(e as Error).message}`); bad++; }
  }
  const durS = bars * 4 * 60 / s.bpm;
  const mm = Math.floor(durS / 60), ss = Math.round(durS % 60);
  const okDur = durS >= 110 && durS <= 215;
  if (!okDur) bad++;
  console.log(`  ${okDur ? '✓' : '✗'} ${id.padEnd(8)} "${s.name}" — ${bars} compassos · ${s.bpm}bpm · ${mm}:${String(ss).padStart(2, '0')} por volta`);
}
if (bad) { console.log(`\n✗ ${bad} problema(s)`); process.exit(1); }
console.log('\n✅ musiccheck fim — todas as músicas válidas');
