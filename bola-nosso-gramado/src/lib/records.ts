// Cálculo de recordes globais a partir dos saves públicos.
// Todos os dados vêm do ranking já retornado por get_public_ranking.
import type { RankingEntry } from "@/lib/saves";
import type { RankingStats } from "@/lib/ranking";

export interface TeamRecord {
  saveId: string;
  teamName: string;
  username: string | null;
  saveDisplayName: string;
  value: number;
  /** Valor secundário mostrado como contexto (ex: jogos, temporadas). */
  detail?: string;
  gameState: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface ScorerRecord {
  playerName: string;
  goals: number;
  teamName: string;
  username: string | null;
  saveDisplayName: string;
  seasons: number;
  gameState: unknown;
  updatedAt: string;
}

const MIN_MATCHES_FOR_RATE = 30;

function statsOf(e: RankingEntry): RankingStats | null {
  const s = e.stats as RankingStats | Record<string, never>;
  if (!s || typeof s !== "object" || !("totalMatches" in s)) return null;
  return s as RankingStats;
}

function toTeamRecord(e: RankingEntry, value: number, detail?: string): TeamRecord {
  return {
    saveId: e.id,
    teamName: e.team_name || e.display_name || "—",
    username: e.username,
    saveDisplayName: e.display_name,
    value,
    detail,
    gameState: e.game_state,
    createdAt: e.created_at,
    updatedAt: e.updated_at,
  };
}

export function topGoalsFor(entries: RankingEntry[], n = 10): TeamRecord[] {
  return entries
    .map((e) => {
      const s = statsOf(e);
      if (!s || s.totalGf <= 0) return null;
      return toTeamRecord(e, s.totalGf, `${s.totalMatches} jogos · ${s.seasons}T`);
    })
    .filter((x): x is TeamRecord => !!x)
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

export function topLeastGoalsAgainst(entries: RankingEntry[], n = 10): TeamRecord[] {
  return entries
    .map((e) => {
      const s = statsOf(e);
      if (!s || s.totalMatches < MIN_MATCHES_FOR_RATE) return null;
      const gaPerGame = s.totalGa / s.totalMatches;
      // Valor exibido = média por jogo (arredondada), pra bater com a ordenação.
      const shown = Math.round(gaPerGame * 100) / 100;
      return { rec: toTeamRecord(e, shown, `${s.totalGa} sofridos em ${s.totalMatches} jogos`), gaPerGame };
    })
    .filter((x): x is { rec: TeamRecord; gaPerGame: number } => !!x)
    .sort((a, b) => a.gaPerGame - b.gaPerGame)
    .slice(0, n)
    .map((x) => x.rec);
}


export function topCleanSheets(entries: RankingEntry[], n = 10): TeamRecord[] {
  return entries
    .map((e) => {
      const s = statsOf(e);
      if (!s || s.totalCleanSheets <= 0) return null;
      return toTeamRecord(e, s.totalCleanSheets, `em ${s.totalMatches} jogos`);
    })
    .filter((x): x is TeamRecord => !!x)
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

export function topWinRate(entries: RankingEntry[], n = 10): TeamRecord[] {
  return entries
    .map((e) => {
      const s = statsOf(e);
      if (!s || s.totalMatches < MIN_MATCHES_FOR_RATE) return null;
      const rate = (s.totalWins / s.totalMatches) * 100;
      return { rec: toTeamRecord(e, Math.round(rate * 10) / 10, `${s.totalWins}V em ${s.totalMatches} jogos`), rate };
    })
    .filter((x): x is { rec: TeamRecord; rate: number } => !!x)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, n)
    .map((x) => x.rec);
}

export function topSeasons(entries: RankingEntry[], n = 10): TeamRecord[] {
  return entries
    .map((e) => {
      const s = statsOf(e);
      if (!s || s.seasons <= 0) return null;
      return toTeamRecord(e, s.seasons, `${s.totalMatches} jogos · ${s.trophyCount ?? 0} títulos`);
    })
    .filter((x): x is TeamRecord => !!x)
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

export function topGoalDifference(entries: RankingEntry[], n = 10): TeamRecord[] {
  return entries
    .map((e) => {
      const s = statsOf(e);
      if (!s || s.totalMatches <= 0) return null;
      const gd = s.totalGd;
      return toTeamRecord(e, gd, `${s.totalGf} feitos · ${s.totalGa} sofridos · ${s.totalMatches} jogos`);
    })
    .filter((x): x is TeamRecord => !!x)
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}


interface MatchLite {
  home?: string;
  away?: string;
  isPlayer?: boolean;
  scorers?: Array<{ name?: string; team?: "home" | "away" }>;
}

export function topScorers(entries: RankingEntry[], n = 10): ScorerRecord[] {
  // Um "recorde individual" por save (melhor artilheiro DAQUELE save),
  // rankeados globalmente. Assim cada campanha aparece com seu craque.
  const results: ScorerRecord[] = [];
  for (const e of entries) {
    const gs = e.game_state as { matchHistory?: MatchLite[] } | null;
    const history = gs?.matchHistory ?? [];
    if (history.length === 0) continue;
    const counts = new Map<string, number>();
    for (const m of history) {
      if (!m.isPlayer) continue;
      const playerIsHome = m.home === e.team_name;
      const playerIsAway = m.away === e.team_name;
      if (!playerIsHome && !playerIsAway) continue;
      const ownTeam: "home" | "away" = playerIsHome ? "home" : "away";
      for (const sc of m.scorers ?? []) {
        if (sc.team !== ownTeam) continue;
        const name = (sc.name ?? "").trim();
        if (!name) continue;
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
    if (counts.size === 0) continue;
    let bestName = "";
    let bestGoals = 0;
    for (const [name, g] of counts.entries()) {
      if (g > bestGoals) { bestGoals = g; bestName = name; }
    }
    if (bestGoals <= 0) continue;
    const stats = statsOf(e);
    results.push({
      playerName: bestName,
      goals: bestGoals,
      teamName: e.team_name || "—",
      username: e.username,
      saveDisplayName: e.display_name,
      seasons: stats?.seasons ?? 1,
      gameState: e.game_state,
      updatedAt: e.updated_at,
    });
  }
  return results.sort((a, b) => b.goals - a.goals).slice(0, n);
}
