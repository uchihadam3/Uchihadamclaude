// Teste headless (sem DOM/THREE): valida as 50 pistas e roda corridas de IA.
import { track, LEVELS, TRACKS_PER_LEVEL } from '../src/game/generator';
import { GameManager } from '../src/game/manager';
import { TrackModel } from '../src/engine/track';

function pathLen(t: any): number { let a = 0; for (let i = 1; i < t.path.length; i++) a += Math.hypot(t.path[i].x - t.path[i - 1].x, t.path[i].y - t.path[i - 1].y); return a; }

// auto-sobreposição: pontos longe no arco não podem ficar mais perto que ~1 largura
function selfOverlap(t: any): number {
  const path = t.path; const arcs = [0]; let a = 0;
  for (let i = 1; i < path.length; i++) { a += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y); arcs.push(a); }
  const total = a; const minGapArc = total * 0.10; const minDist = t.half[0] * 1.5;
  let bad = 0;
  for (let i = 0; i < path.length; i += 3) for (let j = i + 1; j < path.length; j += 3) {
    if (arcs[j] - arcs[i] < minGapArc) continue;
    if (Math.hypot(path[i].x - path[j].x, path[i].y - path[j].y) < minDist) { bad++; }
  }
  return bad;
}

// ---------- 1) validação estrutural das 50 pistas ----------
let problems = 0;
const lenByLevel: number[][] = [[], [], [], [], []];
const wallsByLevel: number[][] = [[], [], [], [], []];
const dimsByLevel: string[][] = [[], [], [], [], []];
for (let lv = 0; lv < 5; lv++) {
  for (let i = 0; i < TRACKS_PER_LEVEL; i++) {
    const t = track(lv, i);
    const L = pathLen(t);
    lenByLevel[lv].push(L);
    wallsByLevel[lv].push(t.walls.length);
    dimsByLevel[lv].push(`${t.w}x${t.h}`);
    const ov = selfOverlap(t);
    if (!(L > 200)) { console.log(`✗ pista ${lv}.${i} curta demais: ${L.toFixed(0)}`); problems++; }
    if (t.path.some((p: any) => p.x < -2 || p.y < -2 || p.x > t.w + 2 || p.y > t.h + 2)) { console.log(`✗ pista ${lv}.${i} sai da mesa`); problems++; }
    if (t.checkpoints.length < 3) { console.log(`✗ pista ${lv}.${i} poucos checkpoints`); problems++; }
    if (t.walls.length === 0) { console.log(`✗ pista ${lv}.${i} sem nenhum muro`); problems++; }
    if (!t.name || !t.wallCol) { console.log(`✗ pista ${lv}.${i} sem nome/cor`); problems++; }
    if (ov > 4) { console.log(`✗ pista ${lv}.${i} auto-sobreposição (${ov} pares perto)`); problems++; }
  }
}
const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
console.log('\n=== COMPRIMENTO MÉDIO por nível (unidades de arco) ===');
for (let lv = 0; lv < 5; lv++) console.log(`  ${LEVELS[lv].padEnd(14)} len≈${avg(lenByLevel[lv]).toFixed(0)}  muros≈${avg(wallsByLevel[lv]).toFixed(0)}`);
console.log('\n=== VARIEDADE (dimensões das 10 pistas de cada nível — devem diferir) ===');
for (let lv = 0; lv < 5; lv++) console.log(`  ${LEVELS[lv].padEnd(14)} ${dimsByLevel[lv].join(' ')}`);

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
  while (mgr.phase !== 'over' && steps < 90000) { mgr.update(dt); steps++; }
  const win = mgr.winner();
  return { flicksWinner: win ? (flickCount.get(win.id) || 0) : -1, steps, finished: mgr.phase === 'over' && !!win, falls };
}

console.log('\n=== CORRIDAS DE IA (3 pistas por nível) ===');
let raceFails = 0;
for (let lv = 0; lv < 5; lv++) {
  const rows: string[] = [];
  for (const idx of [4, 9]) {
    const r = runRace(lv, idx);
    if (!r.finished) raceFails++;
    rows.push(`pista${idx}:${r.finished ? r.flicksWinner + 'flk/' + r.falls + 'q' : 'TRAVOU'}`);
  }
  console.log(`  ${LEVELS[lv].padEnd(14)} ${rows.join('  ')}`);
}

console.log(`\n${problems === 0 && raceFails === 0 ? '✅ TUDO OK' : `❌ ${problems} problemas estruturais, ${raceFails} corridas travadas`}`);
process.exit(problems === 0 && raceFails === 0 ? 0 : 1);
