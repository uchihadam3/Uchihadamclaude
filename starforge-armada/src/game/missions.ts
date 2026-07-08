// Máquina de estado das missões: sorteia diárias/semanais pela data, acumula
// progresso a partir do resumo de cada partida e concede XP+créditos ao resgatar.
import { DAILY_POOL, WEEKLY_POOL, MissionTpl } from '../data/missionsData';
import { Profile, grantRewards, saveProfile, RunReward } from './profile';

export interface RunSummary {
  kills: number; score: number; maxCombo: number; win: boolean;
  timeSec: number; orient: 'vertical' | 'horizontal' | 'arena'; bosswin: number;
}

export interface MissionState { tpl: MissionTpl; progress: number; done: boolean; claimed: boolean; }

const MKEY = 'sfa_missions_v1';
const DAY_MS = 24 * 60 * 60 * 1000;
const EPOCH = Date.UTC(2026, 0, 1);

export function dayId(now: number = Date.now()): number { return Math.floor((now - EPOCH) / DAY_MS); }
export function weekId(now: number = Date.now()): number { return Math.floor(dayId(now) / 7); }
export function secsToReset(scope: 'daily' | 'weekly', now: number = Date.now()): number {
  if (scope === 'daily') { const next = (dayId(now) + 1) * DAY_MS + EPOCH; return Math.max(0, Math.floor((next - now) / 1000)); }
  const next = (weekId(now) + 1) * 7 * DAY_MS + EPOCH; return Math.max(0, Math.floor((next - now) / 1000));
}

interface Store { day: number; week: number; daily: string[]; weekly: string[]; progress: Record<string, number>; claimed: Record<string, boolean>; }

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function pick(pool: MissionTpl[], seed: number, n: number): string[] {
  const rng = mulberry32(seed);
  const idx = pool.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx.slice(0, n).map((i) => pool[i].id);
}

function load(): Store { try { return JSON.parse(localStorage.getItem(MKEY) || 'null'); } catch { return null as any; } }
function save(s: Store): void { try { localStorage.setItem(MKEY, JSON.stringify(s)); } catch { /* */ } }

// garante que as missões correspondem ao dia/semana atuais
function ensure(now: number = Date.now()): Store {
  let s = load();
  const d = dayId(now), w = weekId(now);
  if (!s) s = { day: -1, week: -1, daily: [], weekly: [], progress: {}, claimed: {} };
  let changed = false;
  if (s.day !== d) {
    // limpa progresso/claim das diárias antigas
    for (const id of s.daily) { delete s.progress[id]; delete s.claimed[id]; }
    s.daily = pick(DAILY_POOL, d * 2654435761 >>> 0, 3);
    s.day = d; changed = true;
  }
  if (s.week !== w) {
    for (const id of s.weekly) { delete s.progress[id]; delete s.claimed[id]; }
    s.weekly = pick(WEEKLY_POOL, (w * 40503 + 7) >>> 0, 3);
    s.week = w; changed = true;
  }
  if (changed) save(s);
  return s;
}

const BY_ID: Record<string, MissionTpl> = {};
for (const m of [...DAILY_POOL, ...WEEKLY_POOL]) BY_ID[m.id] = m;

function stateOf(id: string, s: Store): MissionState {
  const tpl = BY_ID[id];
  const progress = s.progress[id] ?? 0;
  return { tpl, progress, done: progress >= tpl.target, claimed: !!s.claimed[id] };
}

export function getMissions(now: number = Date.now()): { daily: MissionState[]; weekly: MissionState[] } {
  const s = ensure(now);
  return { daily: s.daily.map((id) => stateOf(id, s)), weekly: s.weekly.map((id) => stateOf(id, s)) };
}

function metricValue(tpl: MissionTpl, r: RunSummary): number {
  switch (tpl.metric) {
    case 'kills': return r.kills;
    case 'score': return r.score;
    case 'combo': return r.maxCombo;
    case 'runs': return 1;
    case 'wins': return r.win ? 1 : 0;
    case 'bosswin': return r.bosswin;
    case 'arena': return r.orient === 'arena' ? 1 : 0;
    case 'lateral': return r.orient === 'horizontal' ? 1 : 0;
    case 'survive': return Math.floor(r.timeSec);
  }
}

// aplica o resumo da partida ao progresso de todas as missões ativas
export function applyRun(r: RunSummary, now: number = Date.now()): number {
  const s = ensure(now);
  let newlyDone = 0;
  for (const id of [...s.daily, ...s.weekly]) {
    const tpl = BY_ID[id];
    const before = s.progress[id] ?? 0;
    const v = metricValue(tpl, r);
    const after = tpl.acc === 'sum' ? before + v : Math.max(before, v);
    if (after !== before) s.progress[id] = after;
    if (before < tpl.target && after >= tpl.target) newlyDone++;
  }
  save(s);
  return newlyDone;
}

export function claim(id: string, profile: Profile, now: number = Date.now()): RunReward | null {
  const s = ensure(now);
  const st = stateOf(id, s);
  if (!st.done || st.claimed) return null;
  const reward = grantRewards(profile, st.tpl.xp, st.tpl.credits);
  s.claimed[id] = true; save(s); saveProfile(profile);
  return reward;
}

export function countClaimable(now: number = Date.now()): number {
  const { daily, weekly } = getMissions(now);
  return [...daily, ...weekly].filter((m) => m.done && !m.claimed).length;
}
