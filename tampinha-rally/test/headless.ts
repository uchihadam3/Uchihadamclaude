// Teste headless (sem DOM/THREE): valida as 50 pistas e roda corridas de IA.
import { track, LEVELS, TRACKS_PER_LEVEL } from '../src/game/generator';
import { GameManager } from '../src/game/manager';
import { TrackModel } from '../src/engine/track';

function pathLen(t: any): number { let a = 0; for (let i = 1; i < t.path.length; i++) a += Math.hypot(t.path[i].x - t.path[i - 1].x, t.path[i].y - t.path[i - 1].y); return a; }

// ---------- 1) validação estrutural das 50 pistas ----------
let problems = 0;
const lenByLevel: number[][] = [[], [], [], [], []];
const wallsByLevel: number[][] = [[], [], [], [], []];
for (let lv = 0; lv < 5; lv++) {
  for (let i = 0; i < TRACKS_PER_LEVEL; i++) {
    const t = track(lv, i);
    const L = pathLen(t);
    lenByLevel[lv].push(L);
    // fração do corredor coberta por muro (proteção): amostra ao longo do arco
    const tm = new TrackModel(t);
    let covered = 0, samples = 0;
    for (let s = 0; s < tm.total; s += 4) {
      const { p } = tm.atArc(s); samples++;
      // há muro dentro de ~half+1 dos dois lados?
      let near = false;
      for (const w of t.walls) { const mx = (w.a.x + w.b.x) / 2, my = (w.a.y + w.b.y) / 2; if (Math.hypot(mx - p.x, my - p.y) < 6) { near = true; break; } }
      if (near) covered++;
    }
    wallsByLevel[lv].push(t.walls.length);
    const prot = covered / samples;
    // checagens básicas
    if (!(L > 180)) { console.log(`✗ pista ${lv}.${i} curta demais: ${L.toFixed(0)}`); problems++; }
    if (t.path.some((p: any) => p.x < -2 || p.y < -2 || p.x > t.w + 2 || p.y > t.h + 2)) { console.log(`✗ pista ${lv}.${i} sai da mesa`); problems++; }
    if (t.checkpoints.length < 3) { console.log(`✗ pista ${lv}.${i} poucos checkpoints`); problems++; }
    if (t.walls.length === 0) { console.log(`✗ pista ${lv}.${i} sem nenhum muro`); problems++; }
    if (!t.name || !t.wallCol) { console.log(`✗ pista ${lv}.${i} sem nome/cor`); problems++; }
  }
}
const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
console.log('\n=== COMPRIMENTO MÉDIO por nível (unidades de arco) ===');
for (let lv = 0; lv < 5; lv++) console.log(`  ${LEVELS[lv].padEnd(14)} len≈${avg(lenByLevel[lv]).toFixed(0)}  muros≈${avg(wallsByLevel[lv]).toFixed(0)}`);

// gradiente de proteção: nível fácil deve ter MAIS muros que o extremo
const wEasy = avg(wallsByLevel[0]), wHard = avg(wallsByLevel[4]);
console.log(`\nProteção: Fácil ${wEasy.toFixed(0)} muros  >  Extrema ${wHard.toFixed(0)} muros  → ${wEasy > wHard ? 'OK ✓' : 'FALHOU ✗'}`);
if (wEasy <= wHard) problems++;

// ---------- 2) corridas de IA (completáveis?) ----------
function runRace(lv: number, idx: number): { flicksWinner: number; steps: number; finished: boolean; falls: number } {
  const def = track(lv, idx);
  const mgr = new GameManager();
  let falls = 0;
  mgr.onEvent = (e) => { if (e.type === 'out') falls++; };
  const flickCount = new Map<number, number>();
  mgr.onFlick = (c) => flickCount.set(c.id, (flickCount.get(c.id) || 0) + 1);
  mgr.setup(def, [
    { name: 'Tec', isAI: true, ai: 'tecnico', skin: 'classica' },
    { name: 'Agr', isAI: true, ai: 'agressivo', skin: 'classica' },
    { name: 'Cau', isAI: true, ai: 'cauteloso', skin: 'classica' },
  ]);
  const dt = 1 / 30; let steps = 0;
  while (mgr.phase !== 'over' && steps < 60000) { mgr.update(dt); steps++; }
  const win = mgr.winner();
  return { flicksWinner: win ? (flickCount.get(win.id) || 0) : -1, steps, finished: mgr.phase === 'over' && !!win, falls };
}

console.log('\n=== CORRIDAS DE IA (3 pistas por nível) ===');
let raceFails = 0;
for (let lv = 0; lv < 5; lv++) {
  const rows: string[] = [];
  for (const idx of [0, 4, 9]) {
    const r = runRace(lv, idx);
    if (!r.finished) raceFails++;
    rows.push(`pista${idx}:${r.finished ? r.flicksWinner + 'flk/' + r.falls + 'q' : 'TRAVOU'}`);
  }
  console.log(`  ${LEVELS[lv].padEnd(14)} ${rows.join('  ')}`);
}

console.log(`\n${problems === 0 && raceFails === 0 ? '✅ TUDO OK' : `❌ ${problems} problemas estruturais, ${raceFails} corridas travadas`}`);
process.exit(problems === 0 && raceFails === 0 ? 0 : 1);
