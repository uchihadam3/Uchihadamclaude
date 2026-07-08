// Conta de piloto "local-first": um perfil persistente no dispositivo que dá
// nível, XP, créditos, títulos e estatísticas vitalícias — e um Código de Nuvem
// (texto compartilhável) para levar a conta de um aparelho para outro sem servidor.
import { currentSeason } from './season';

export interface LifeStats {
  runs: number; kills: number; wins: number; bosses: number;
  bestScore: number; maxCombo: number; playSec: number; credits: number;
}

export interface Profile {
  v: 1;
  id: string;
  name: string;      // callsign
  avatar: string;    // ship id usado como retrato
  xp: number;        // XP total (nível é derivado)
  credits: number;
  created: number;
  title: string;                 // título equipado
  titles: string[];              // títulos desbloqueados
  stats: LifeStats;
  seasonXp: Record<number, number>;      // XP por temporada (passe)
  claimed: Record<string, number[]>;     // tiers de passe já resgatados por temporada
}

const KEY = 'sfa_profile_v1';

const CALLSIGNS = ['Nômade', 'Cometa', 'Órion', 'Vônix', 'Astra', 'Kestrel', 'Zênite', 'Lumen', 'Corvo', 'Éter'];
function randId(): string { return 'p' + Math.random().toString(36).slice(2, 9); }

export function newProfile(): Profile {
  return {
    v: 1, id: randId(),
    name: CALLSIGNS[Math.floor(Math.random() * CALLSIGNS.length)] + '-' + Math.floor(Math.random() * 90 + 10),
    avatar: 'falcon', xp: 0, credits: 250, created: Date.now(),
    title: 'Recruta', titles: ['Recruta'],
    stats: { runs: 0, kills: 0, wins: 0, bosses: 0, bestScore: 0, maxCombo: 0, playSec: 0, credits: 0 },
    seasonXp: {}, claimed: {},
  };
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const p = JSON.parse(raw) as Profile; if (p && p.v === 1) return migrate(p); }
  } catch { /* ignore */ }
  const p = newProfile(); saveProfile(p); return p;
}

function migrate(p: Profile): Profile {
  p.seasonXp ??= {}; p.claimed ??= {}; p.titles ??= ['Recruta'];
  p.stats ??= { runs: 0, kills: 0, wins: 0, bosses: 0, bestScore: 0, maxCombo: 0, playSec: 0, credits: 0 };
  return p;
}

export function saveProfile(p: Profile): void {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

// ---------- curva de nível ----------
export function xpForLevel(lvl: number): number { return 120 + (lvl - 1) * 70; }
export interface LevelInfo { level: number; into: number; need: number }
export function levelInfo(xp: number): LevelInfo {
  let lvl = 1, acc = 0, need = xpForLevel(1);
  while (xp >= acc + need) { acc += need; lvl++; need = xpForLevel(lvl); }
  return { level: lvl, into: xp - acc, need };
}
export function levelOf(xp: number): number { return levelInfo(xp).level; }

// títulos ligados a nível
const LEVEL_TITLES: { lvl: number; title: string }[] = [
  { lvl: 3, title: 'Cadete' }, { lvl: 6, title: 'Aviador' }, { lvl: 10, title: 'Tenente' },
  { lvl: 15, title: 'Ás Estelar' }, { lvl: 22, title: 'Comandante' }, { lvl: 30, title: 'Almirante' },
  { lvl: 45, title: 'Lenda da Armada' },
];

// ---------- aplicar recompensas ----------
export interface RunReward { xp: number; credits: number; leveledTo?: number; unlockedTitles: string[] }

export function grantRewards(p: Profile, xp: number, credits: number): RunReward {
  const beforeLvl = levelOf(p.xp);
  p.xp += xp; p.credits += credits;
  const season = currentSeason();
  p.seasonXp[season] = (p.seasonXp[season] ?? 0) + xp;
  const afterLvl = levelOf(p.xp);
  const unlocked: string[] = [];
  for (const lt of LEVEL_TITLES) {
    if (afterLvl >= lt.lvl && !p.titles.includes(lt.title)) { p.titles.push(lt.title); unlocked.push(lt.title); }
  }
  const r: RunReward = { xp, credits, unlockedTitles: unlocked };
  if (afterLvl > beforeLvl) r.leveledTo = afterLvl;
  return r;
}

export function spendCredits(p: Profile, amount: number): boolean {
  if (p.credits < amount) return false;
  p.credits -= amount; saveProfile(p); return true;
}

// ---------- Código de Nuvem (export/import) ----------
function b64encode(s: string): string { return btoa(unescape(encodeURIComponent(s))); }
function b64decode(s: string): string { return decodeURIComponent(escape(atob(s))); }

export function exportCode(p: Profile): string {
  const json = JSON.stringify(p);
  const body = b64encode(json);
  // agrupa em blocos de 4 para facilitar leitura/cópia
  return 'SFA1-' + (body.match(/.{1,20}/g) ?? [body]).join('-');
}

export function importCode(code: string): Profile | null {
  try {
    const trimmed = code.trim();
    if (!trimmed.startsWith('SFA1-')) return null;
    const body = trimmed.slice(5).replace(/-/g, '');
    const json = b64decode(body);
    const p = JSON.parse(json) as Profile;
    if (!p || p.v !== 1 || typeof p.name !== 'string') return null;
    return migrate(p);
  } catch { return null; }
}

export function resetProfile(): Profile {
  const p = newProfile(); saveProfile(p); return p;
}
