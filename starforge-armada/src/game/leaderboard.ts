// Ranking sem servidor, porém "vivo": cada quadro (um por modo, + Campanha e
// Geral) é preenchido por pilotos rivais gerados de forma DETERMINÍSTICA a
// partir de um hash de (temporada, quadro, índice). Os placares dos rivais
// crescem conforme a temporada avança, então o quadro parece disputado e muda
// com o tempo. O melhor placar do jogador é persistido por temporada+quadro e
// inserido no ranking com a posição real calculada.
import { currentSeason, seasonWindow } from './season';
import type { Profile } from './profile';

export interface Entry { name: string; avatar: string; score: number; isPlayer?: boolean; rank: number; }

// --- PRNG determinístico ---
function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const ROOTS = ['Vega', 'Órion', 'Kestrel', 'Nyx', 'Corvo', 'Astra', 'Zênite', 'Lumen', 'Íon', 'Draco', 'Vulcano', 'Hélios', 'Perseu', 'Titânia', 'Quasar', 'Nébula', 'Fúria', 'Espectro', 'Cinza', 'Boreal', 'Mira', 'Talon', 'Sirius', 'Lira', 'Ápex', 'Sombra', 'Cometa', 'Fóton', 'Rigel', 'Vórtex', 'Ébano', 'Cristal', 'Falcão', 'Névoa', 'Aurora', 'Basilisco', 'Cobra', 'Dínamo', 'Éter', 'Fênix'];
const TAGS = ['', ' Prime', '-X', ' Zero', ' Neo', ' VII', ' 99', ' Ω', ' Δ', '_br', ' Ace', ' Vox'];
const AVATARS = ['falcon', 'vesper', 'bulwark', 'lotus', 'comet', 'raven', 'orion', 'nova', 'phantom', 'valkyrie', 'eclipse', 'tempest', 'glacier', 'solaris', 'mantis'];

function rivalName(rng: () => number): string {
  const r = ROOTS[Math.floor(rng() * ROOTS.length)];
  const t = TAGS[Math.floor(rng() * TAGS.length)];
  return r + t;
}

// dificuldade base por quadro (placar do topo)
function boardTop(boardId: string): number {
  if (boardId === 'overall') return 54000 + (hashStr(boardId) % 22000);
  if (boardId === 'campaign') return 40000 + (hashStr('camp') % 16000);
  return 24000 + (hashStr(boardId) % 15000);
}

const RIVAL_COUNT = 48;

// fração da temporada já decorrida (0..1) — faz os placares subirem ao longo do tempo
function seasonElapsed(season: number, now: number): number {
  const { start, end } = seasonWindow(season);
  return Math.max(0, Math.min(1, (now - start) / (end - start)));
}

export function rivalsFor(boardId: string, season: number, now: number = Date.now()): Entry[] {
  const rng = mulberry32(hashStr(`${season}|${boardId}`));
  const top = boardTop(boardId) * (1 + seasonElapsed(season, now) * 0.28);
  const out: Entry[] = [];
  for (let i = 0; i < RIVAL_COUNT; i++) {
    const jitter = 0.9 + rng() * 0.2;
    const score = Math.round(top * Math.pow(0.955, i) * jitter);
    out.push({ name: rivalName(rng), avatar: AVATARS[Math.floor(rng() * AVATARS.length)], score, rank: 0 });
  }
  out.sort((a, b) => b.score - a.score);
  return out;
}

// --- placares do jogador (persistidos por temporada+quadro) ---
const SKEY = 'sfa_scores_v1';
type ScoreStore = Record<string, Record<string, number>>; // season -> boardId -> best

function loadScores(): ScoreStore {
  try { return JSON.parse(localStorage.getItem(SKEY) || '{}') as ScoreStore; } catch { return {}; }
}
function saveScores(s: ScoreStore): void { try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch { /* */ } }

export function playerBest(boardId: string, season: number = currentSeason()): number {
  return loadScores()[season]?.[boardId] ?? 0;
}

export function submitScore(boardId: string, score: number, season: number = currentSeason()): boolean {
  const s = loadScores();
  s[season] ??= {};
  const prev = s[season][boardId] ?? 0;
  const isBest = score > prev;
  if (isBest) { s[season][boardId] = score; }
  // atualiza também o quadro "Geral" com o maior placar de qualquer modo
  const overallPrev = s[season]['overall'] ?? 0;
  if (score > overallPrev) s[season]['overall'] = score;
  saveScores(s);
  return isBest;
}

// ranking final com o jogador inserido e posição calculada
export function leaderboard(boardId: string, profile: Profile, season: number = currentSeason(), now: number = Date.now()): { entries: Entry[]; playerRank: number; total: number } {
  const rivals = rivalsFor(boardId, season, now);
  const best = playerBest(boardId, season);
  const all = rivals.map((r) => ({ ...r }));
  const me: Entry = { name: profile.name, avatar: profile.avatar, score: best, isPlayer: true, rank: 0 };
  all.push(me);
  all.sort((a, b) => b.score - a.score || (a.isPlayer ? 1 : 0) - (b.isPlayer ? 1 : 0));
  all.forEach((e, i) => (e.rank = i + 1));
  const playerRank = all.findIndex((e) => e.isPlayer) + 1;
  return { entries: all, playerRank, total: all.length };
}

// lista de quadros exibíveis (modos + campanha + geral)
export interface Board { id: string; name: string; color: string; }
