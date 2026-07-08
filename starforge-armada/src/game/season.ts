// Temporadas: janelas de 14 dias derivadas da data (sem servidor). Cada
// temporada tem nome temático, contagem regressiva, ranking próprio e um
// "passe" com faixas de recompensa desbloqueadas por XP da temporada.

export const SEASON_EPOCH = Date.UTC(2026, 0, 5); // segunda-feira base
export const SEASON_LEN_MS = 14 * 24 * 60 * 60 * 1000;

export function currentSeason(now: number = Date.now()): number {
  return Math.floor((now - SEASON_EPOCH) / SEASON_LEN_MS) + 1;
}

export function seasonWindow(season: number): { start: number; end: number } {
  const start = SEASON_EPOCH + (season - 1) * SEASON_LEN_MS;
  return { start, end: start + SEASON_LEN_MS };
}

export function seasonDaysLeft(now: number = Date.now()): number {
  const { end } = seasonWindow(currentSeason(now));
  return Math.max(0, Math.ceil((end - now) / (24 * 60 * 60 * 1000)));
}

const SEASON_THEMES = [
  { name: 'Aurora de Vega', color: '#7ff0ff' },
  { name: 'Marés Carmesim', color: '#ff5a7a' },
  { name: 'Silêncio de Órion', color: '#a78bff' },
  { name: 'Fornalha Solar', color: '#ffab3a' },
  { name: 'Véu de Esmeralda', color: '#5affa0' },
  { name: 'Eclipse Perpétuo', color: '#c090ff' },
  { name: 'Tempestade de Íon', color: '#5ad0ff' },
  { name: 'Cinzas de Nebulosa', color: '#ff7ad8' },
];
export function seasonTheme(season: number): { name: string; color: string } {
  return SEASON_THEMES[(season - 1 + SEASON_THEMES.length * 100) % SEASON_THEMES.length];
}

// ---------- passe de temporada ----------
export type RewardKind = 'credits' | 'title' | 'avatar' | 'badge';
export interface SeasonReward { kind: RewardKind; label: string; icon: string; value?: string | number; }
export interface SeasonTier { tier: number; xp: number; reward: SeasonReward; premium?: boolean; }

// 12 faixas de XP crescente, alternando créditos e desbloqueios cosméticos.
export const SEASON_TIERS: SeasonTier[] = [
  { tier: 1, xp: 300, reward: { kind: 'credits', label: '150 créditos', icon: '◈', value: 150 } },
  { tier: 2, xp: 700, reward: { kind: 'badge', label: 'Emblema Vanguarda', icon: '✦', value: 'vanguarda' } },
  { tier: 3, xp: 1200, reward: { kind: 'credits', label: '250 créditos', icon: '◈', value: 250 } },
  { tier: 4, xp: 1900, reward: { kind: 'title', label: 'Título: Sentinela', icon: '❖', value: 'Sentinela' } },
  { tier: 5, xp: 2700, reward: { kind: 'credits', label: '350 créditos', icon: '◈', value: 350 } },
  { tier: 6, xp: 3700, reward: { kind: 'badge', label: 'Emblema Íon', icon: '⚡', value: 'ion' } },
  { tier: 7, xp: 4900, reward: { kind: 'credits', label: '500 créditos', icon: '◈', value: 500 } },
  { tier: 8, xp: 6300, reward: { kind: 'title', label: 'Título: Corsário', icon: '☠', value: 'Corsário' } },
  { tier: 9, xp: 7900, reward: { kind: 'credits', label: '650 créditos', icon: '◈', value: 650 } },
  { tier: 10, xp: 9800, reward: { kind: 'badge', label: 'Emblema Aurora', icon: '◎', value: 'aurora' } },
  { tier: 11, xp: 12000, reward: { kind: 'credits', label: '900 créditos', icon: '◈', value: 900 } },
  { tier: 12, xp: 15000, reward: { kind: 'title', label: 'Título: Soberano Estelar', icon: '♛', value: 'Soberano Estelar' } },
];

export function tierProgress(seasonXp: number): { current: number; next: SeasonTier | null; into: number; span: number } {
  let current = 0; let prevXp = 0;
  for (const t of SEASON_TIERS) { if (seasonXp >= t.xp) { current = t.tier; prevXp = t.xp; } else break; }
  const next = SEASON_TIERS.find((t) => t.tier === current + 1) ?? null;
  const into = seasonXp - prevXp;
  const span = next ? next.xp - prevXp : 1;
  return { current, next, into, span };
}
