// Cálculo do score do ranking e das estatísticas resumidas a partir de um save.
// Roda no cliente cada vez que persistimos um save no cloud.

export interface RankingStats {
  teamName: string;
  season: number;
  brasileiraoPos: number | null;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  totalGf: number;
  totalGa: number;
  totalMatches: number;
  totalWins: number;
  totalDraws: number;
  totalLosses: number;
  totalGd: number;
  totalCleanSheets: number;
  totalBlowoutsAgainst: number;
  tactic?: string;
  trophies: {
    brasileirao: boolean;
    libertadores: boolean;
    sulamericana: boolean;
    mundial: boolean;
  };
  groupAdvanced: {
    libertadores: boolean;
    sulamericana: boolean;
    mundial: boolean;
  };
  trophyCount: number;
  /** Somatório histórico de títulos em todas as temporadas (inclui a atual). */
  titleCounts: {
    brasileirao: number;
    libertadores: number;
    sulamericana: number;
    mundial: number;
  };
  /** Nº de temporadas jogadas (histórico + atual). Aumenta a cada Mundial vencido. */
  seasons: number;
  phase: string;
  stage: string;
  achievements: Achievement[];
}

export type AchievementTone = "gold" | "silver" | "bronze" | "red" | "blue" | "muted";
export interface Achievement {
  key: string;
  icon: string;
  label: string;
  comp: string;
  tone: AchievementTone;
}

interface AnyRow {
  teamId?: string;
  name?: string;
  team?: string;
  isPlayer?: boolean;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd?: number;
}
interface AnyMatch {
  home?: string;
  away?: string;
  homeGoals?: number;
  awayGoals?: number;
  isPlayer?: boolean;
}
export type KOExit = "champion" | "final" | "semi" | "fourth" | "quarter" | "r16" | "groups";
interface SeasonSnapshot {
  season: number;
  brasileiraoPos: number | null;
  trophies: {
    brasileirao: boolean;
    libertadores: boolean;
    sulamericana: boolean;
    mundial: boolean;
  };
  groupAdvanced?: { libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  koExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
}
interface AnySave {
  phase: string;
  teamName: string;
  season?: number;
  table?: AnyRow[];
  matchHistory?: AnyMatch[];
  tactic?: string;
  trophies: {
    brasileirao: boolean;
    libertadores: boolean;
    sulamericana: boolean;
    mundial: boolean;
  };
  comp?: { kind?: "libertadores" | "sulamericana" | "mundial" } | null;
  groupAdvanced?: { libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  seasonKOExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
  seasonHistory?: SeasonSnapshot[];
}

// Pesos por estilo tático: balanceia pontuação pra que estilos defensivos
// (poucos gols) não sejam prejudicados vs ofensivos (muitos gols).
// Todos calibrados pra render ~180-190 pts em campanha média de Série A.
export interface StyleWeight { gf: number; ga: number; cs: number; blow: number }
export const STYLE_WEIGHTS: Record<string, StyleWeight> = {
  "retranca":       { gf: 2.0, ga: -1.0, cs: 3, blow: 0 },
  "cadenciado":     { gf: 2.3, ga: -1.5, cs: 3, blow: 0 },
  "defensivo":      { gf: 2.6, ga: -1.7, cs: 3, blow: 0 },
  "equilibrado":    { gf: 3.0, ga: -1.8, cs: 0, blow: 0 },
  "contra-ataque":  { gf: 3.0, ga: -1.8, cs: 1, blow: 0 },
  "pressao-alta":   { gf: 3.0, ga: -1.8, cs: 0, blow: 0 },
  "posse":          { gf: 3.1, ga: -1.9, cs: 0, blow: 0 },
  "bolas-paradas":  { gf: 3.0, ga: -1.8, cs: 0, blow: 0 },
  "ofensivo":       { gf: 2.8, ga: -1.8, cs: 0, blow: 0 },
  "ultra-ofensivo": { gf: 2.9, ga: -1.9, cs: 0, blow: -2 },
};
export const DEFAULT_STYLE_WEIGHT: StyleWeight = STYLE_WEIGHTS["equilibrado"];

const CHAMP_NAMES = [
  "Campeão", "Bicampeão", "Tricampeão", "Tetracampeão", "Pentacampeão",
  "Hexacampeão", "Heptacampeão", "Octacampeão", "Nonacampeão", "Decacampeão",
];
function championLabel(n: number): string {
  if (n <= 0) return "Campeão";
  return CHAMP_NAMES[n - 1] ?? `${n}× Campeão`;
}

type CupKind = "sulamericana" | "libertadores" | "mundial";
const CUP_META: Record<CupKind, { comp: string; keyPrefix: string; goldIcon: string; goldSuffix?: string; toneGold: Achievement["tone"] }> = {
  sulamericana: { comp: "Sul-Americana", keyPrefix: "sa", goldIcon: "🥈", toneGold: "silver" },
  libertadores: { comp: "Libertadores", keyPrefix: "lib", goldIcon: "🏆", toneGold: "gold" },
  mundial: { comp: "Mundial", keyPrefix: "mun", goldIcon: "🌍", goldSuffix: " Mundial", toneGold: "gold" },
};

function computeStage(state: AnySave, titleCounts: RankingStats["titleCounts"], brPos: number | null): string {
  const t = state.trophies;
  if (t.mundial) return `${championLabel(titleCounts.mundial)} Mundial 🌍`;
  if (t.libertadores) return `${championLabel(titleCounts.libertadores)} Libertadores 🏆`;
  if (t.sulamericana) return `${championLabel(titleCounts.sulamericana)} Sul-Americana 🥈`;
  if (t.brasileirao) return `${championLabel(titleCounts.brasileirao)} Brasileirão 🥇`;
  const kind = state.comp?.kind;
  const ended = state.phase === "eliminated" || state.phase === "seasonEnd" || state.phase === "gameOver";
  const ko = state.seasonKOExits ?? {};
  const ga = state.groupAdvanced ?? {};
  const cupStatus = (k: CupKind, disputing: string) => {
    const exit = ko[k];
    const comp = CUP_META[k].comp;
    if (exit === "final") return k === "mundial" ? `Vice-campeão do ${comp} 🥈❌` : `Vice-campeão da ${comp} 🥈`;
    if (exit === "semi") return k === "mundial" ? `3º lugar no ${comp} 🥉❌` : `3º lugar na ${comp} 🥉`;
    if (exit === "fourth") return k === "mundial" ? `Eliminado na semifinal do ${comp} ❌` : `Eliminado na semifinal da ${comp} ❌`;
    if (exit === "quarter") return `Eliminado nas quartas de final da ${comp} ❌`;
    if (exit === "r16") return `Eliminado nas oitavas de final da ${comp} ❌`;
    if (exit === "groups") return `Eliminado na fase de grupos da ${comp} ❌`;
    if (!ended) return disputing;
    // Sem exit específico: se não passou dos grupos, foi eliminado na fase de grupos;
    // se passou, ficou parado em alguma fase do mata-mata (save antigo).
    if (!ga[k]) return `Eliminado na fase de grupos da ${comp} ❌`;
    return `Eliminado no mata-mata da ${comp} ❌`;
  };
  if (kind === "mundial") return cupStatus("mundial", "Disputando Mundial");
  if (kind === "libertadores") return cupStatus("libertadores", "Disputando Libertadores");
  if (kind === "sulamericana") return cupStatus("sulamericana", "Disputando Sul-Americana");
  if (ended && brPos != null && brPos >= 13) return `Eliminado na Série A (${brPos}º) ❌`;
  if (ended) return "Campanha encerrada";
  return "Série A";
}

function brasileiraoChip(pos: number | null, won: boolean, nth: number, keySuffix: string, ended: boolean): Achievement | null {
  if (won) {
    return { key: `br-${keySuffix}`, icon: "🥇", label: championLabel(nth), comp: "Brasileirão", tone: "gold" };
  }
  if (pos == null) return null;
  if (!ended) {
    // Série A ainda em andamento: não revela classificação/eliminação,
    // só mostra que está disputando e a posição atual.
    return { key: `br-${keySuffix}`, icon: "⚽", label: `Disputando Série A (${pos}º)`, comp: "Brasileirão", tone: "muted" };
  }
  if (pos === 2) return { key: `br-${keySuffix}`, icon: "🥈", label: "Vice-campeão", comp: "Brasileirão", tone: "silver" };
  if (pos <= 6) return { key: `br-${keySuffix}`, icon: "🎖️", label: `${pos}º lugar (G6)`, comp: "Brasileirão", tone: "blue" };
  if (pos <= 12) return { key: `br-${keySuffix}`, icon: "🎫", label: `${pos}º lugar (Copa Sul)`, comp: "Brasileirão", tone: "muted" };
  return { key: `br-${keySuffix}`, icon: "❌", label: `Eliminado na Série A (${pos}º)`, comp: "Brasileirão", tone: "red" };
}




function cupAchievement(
  kind: CupKind,
  ks: string,
  won: boolean,
  cumCount: number,
  koExit: KOExit | undefined,
  advancedGroups: boolean,
  ended: boolean,
  disputing: boolean,
  entered: boolean,
): Achievement | null {
  const meta = CUP_META[kind];
  const key = `${meta.keyPrefix}-${ks}`;
  if (won) {
    const base = championLabel(cumCount);
    return { key, icon: meta.goldIcon, label: meta.goldSuffix ? `${base}${meta.goldSuffix}` : base, comp: meta.comp, tone: meta.toneGold };
  }
  // Vice (perdeu a final) e 3º lugar (venceu bronze) já são "pódios",
  // não contam como eliminação.
  if (koExit === "final") {
    if (kind === "mundial") {
      return { key, icon: "🥈", label: "Vice-campeão", comp: meta.comp, tone: "red" };
    }
    return { key, icon: "🥈", label: "Vice-campeão", comp: meta.comp, tone: "silver" };
  }
  if (koExit === "semi") {
    if (kind === "mundial") {
      return { key, icon: "🥉", label: "3º lugar", comp: meta.comp, tone: "red" };
    }
    return { key, icon: "🥉", label: "3º lugar", comp: meta.comp, tone: "bronze" };
  }
  if (disputing) {
    return { key, icon: "⚔️", label: "Disputando", comp: meta.comp, tone: "blue" };
  }
  if (koExit === "fourth") {
    return { key, icon: "❌", label: "Eliminado na semifinal", comp: meta.comp, tone: "red" };
  }
  if (koExit === "quarter") {
    return { key, icon: "❌", label: "Eliminado nas quartas de final", comp: meta.comp, tone: "red" };
  }
  if (koExit === "r16") {
    return { key, icon: "❌", label: "Eliminado nas oitavas de final", comp: meta.comp, tone: "red" };
  }
  // Sem KO exit específico registrado (save antigo / sessão incompleta):
  // se passou dos grupos, mostra "eliminado no mata-mata" (fase desconhecida);
  // se entrou na copa mas não passou, mostra "eliminado na fase de grupos".
  if (advancedGroups) {
    return { key, icon: "❌", label: "Eliminado no mata-mata", comp: meta.comp, tone: "red" };
  }
  if (entered && ended) {
    return { key, icon: "❌", label: "Eliminado na fase de grupos", comp: meta.comp, tone: "red" };
  }
  return null;
}

function pastSeasonAchievements(snap: SeasonSnapshot, cum: RankingStats["titleCounts"]): Achievement[] {
  const items: Achievement[] = [];
  const ks = `s${snap.season}`;
  // Increment cum counters based on this snapshot's trophies.
  if (snap.trophies.brasileirao) cum.brasileirao++;
  if (snap.trophies.sulamericana) cum.sulamericana++;
  if (snap.trophies.libertadores) cum.libertadores++;
  if (snap.trophies.mundial) cum.mundial++;

  const br = brasileiraoChip(snap.brasileiraoPos, snap.trophies.brasileirao, cum.brasileirao, ks, true);
  if (br) items.push(br);

  const ga = snap.groupAdvanced ?? {};
  const ko = snap.koExits ?? {};
  (["sulamericana", "libertadores", "mundial"] as const).forEach((kind) => {
    const entered = !!ga[kind] || !!ko[kind] || !!snap.trophies[kind];
    const chip = cupAchievement(kind, ks, !!snap.trophies[kind], cum[kind], ko[kind], !!ga[kind], true, false, entered);
    if (chip) items.push(chip);
  });
  return items;
}

function currentSeasonAchievements(
  state: AnySave,
  brasileiraoPos: number | null,
  cum: RankingStats["titleCounts"],
): Achievement[] {
  const items: Achievement[] = [];
  const t = state.trophies;
  const kind = state.comp?.kind;
  const ended = state.phase === "eliminated" || state.phase === "seasonEnd" || state.phase === "gameOver";
  const currentSeason = state.season ?? 1;
  const ks = `s${currentSeason}`;

  // Incrementa cum baseado nos troféus da temporada atual.
  if (t.brasileirao) cum.brasileirao++;
  if (t.sulamericana) cum.sulamericana++;
  if (t.libertadores) cum.libertadores++;
  if (t.mundial) cum.mundial++;

  const br = brasileiraoChip(brasileiraoPos, t.brasileirao, cum.brasileirao, ks, ended);
  if (br) items.push(br);

  const ga = state.groupAdvanced ?? {};
  const ko = state.seasonKOExits ?? {};
  (["sulamericana", "libertadores", "mundial"] as const).forEach((cupKind) => {
    const disputing = kind === cupKind && !ended && !t[cupKind] && !ko[cupKind];
    const entered = kind === cupKind || !!ga[cupKind] || !!ko[cupKind] || !!t[cupKind];
    const chip = cupAchievement(cupKind, ks, !!t[cupKind], cum[cupKind], ko[cupKind], !!ga[cupKind], ended, disputing, entered);
    if (chip) items.push(chip);
  });

  if (items.length === 0) {
    items.push({ key: `sa-league-${ks}`, icon: "⚽", label: "Série A em disputa", comp: "Brasileirão", tone: "muted" });
  }
  return items;
}

function isPlayerRow(r: AnyRow, teamName: string): boolean {
  if (r.isPlayer) return true;
  if (r.teamId === "PLAYER") return true;
  if (r.name && r.name === teamName) return true;
  if (r.team && r.team === teamName) return true;
  return false;
}

function rowGd(r: AnyRow): number {
  if (typeof r.gd === "number") return r.gd;
  return (r.gf ?? 0) - (r.ga ?? 0);
}

export function computeStats(state: AnySave): RankingStats {
  const row = state.table?.find((r) => isPlayerRow(r, state.teamName)) ?? null;
  const sortedTable = state.table ? [...state.table].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    const gdDiff = rowGd(b) - rowGd(a);
    if (gdDiff !== 0) return gdDiff;
    return b.gf - a.gf;
  }) : [];
  const pos = row ? sortedTable.findIndex((r) => isPlayerRow(r, state.teamName)) + 1 : null;

  let totalGf = 0, totalGa = 0, totalMatches = 0;
  let totalWins = 0, totalDraws = 0, totalLosses = 0;
  let totalCleanSheets = 0, totalBlowoutsAgainst = 0;
  for (const m of state.matchHistory ?? []) {
    if (!m.isPlayer) continue;
    const playerIsHome = m.home === state.teamName;
    const playerIsAway = m.away === state.teamName;
    if (!playerIsHome && !playerIsAway) continue;
    const own = playerIsHome ? (m.homeGoals ?? 0) : (m.awayGoals ?? 0);
    const opp = playerIsHome ? (m.awayGoals ?? 0) : (m.homeGoals ?? 0);
    totalGf += own;
    totalGa += opp;
    totalMatches += 1;
    if (own > opp) totalWins++;
    else if (own === opp) totalDraws++;
    else totalLosses++;
    if (opp === 0) totalCleanSheets++;
    if (opp >= 4) totalBlowoutsAgainst++;
  }

  const t = state.trophies;
  const trophyCount = (t.brasileirao ? 1 : 0) + (t.libertadores ? 1 : 0) + (t.sulamericana ? 1 : 0) + (t.mundial ? 1 : 0);
  const ga = state.groupAdvanced ?? {};
  const groupAdvanced = {
    libertadores: !!(ga.libertadores || t.libertadores),
    sulamericana: !!(ga.sulamericana || t.sulamericana),
    mundial: !!(ga.mundial || t.mundial),
  };

  // Constrói lista completa de temporadas (histórico + atual) e cumula títulos.
  const history = state.seasonHistory ?? [];
  const cum = { brasileirao: 0, libertadores: 0, sulamericana: 0, mundial: 0 };
  const allAchievements: Achievement[] = [];
  const multiSeason = history.length > 0;

  for (const snap of history) {
    const items = pastSeasonAchievements(snap, cum);
    for (const it of items) {
      allAchievements.push(multiSeason ? { ...it, comp: `T${snap.season} · ${it.comp}` } : it);
    }
  }
  const currentItems = currentSeasonAchievements(state, pos, cum);
  for (const it of currentItems) {
    allAchievements.push(multiSeason ? { ...it, comp: `T${state.season ?? 1} · ${it.comp}` } : it);
  }

  return {
    teamName: state.teamName,
    season: state.season ?? 1,
    brasileiraoPos: pos,
    points: row?.points ?? 0,
    wins: row?.wins ?? 0,
    draws: row?.draws ?? 0,
    losses: row?.losses ?? 0,
    gf: row?.gf ?? 0,
    ga: row?.ga ?? 0,
    gd: row ? rowGd(row) : 0,
    totalGf,
    totalGa,
    totalMatches,
    totalWins,
    totalDraws,
    totalLosses,
    totalGd: totalGf - totalGa,
    totalCleanSheets,
    totalBlowoutsAgainst,
    tactic: state.tactic,
    trophies: t,
    groupAdvanced,
    trophyCount,
    titleCounts: cum,
    seasons: history.length + 1,
    phase: state.phase,
    stage: computeStage(state, cum, pos),
    achievements: allAchievements,
  };
}

function snapshotScore(snap: {
  brasileiraoPos: number | null;
  trophies: { brasileirao: boolean; libertadores: boolean; sulamericana: boolean; mundial: boolean };
  groupAdvanced?: { libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  koExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
}): number {
  let score = 0;
  const pos = snap.brasileiraoPos;
  if (pos === 1) score += 150;
  else if (pos && pos >= 2 && pos <= 6) score += 75;
  else if (pos && pos >= 7 && pos <= 12) score += 50;
  else if (snap.trophies.brasileirao) score += 150;
  const ga = snap.groupAdvanced ?? {};
  const ko = snap.koExits ?? {};
  const groupsSA = !!(ga.sulamericana || snap.trophies.sulamericana);
  const groupsLib = !!(ga.libertadores || snap.trophies.libertadores);
  const groupsMun = !!(ga.mundial || snap.trophies.mundial);
  if (groupsSA) score += 50;
  if (snap.trophies.sulamericana) score += 90;
  // Sul-Americana — 2º lugar (perdeu a final): +30. 3º (venceu bronze): +15.
  else if (ko.sulamericana === "final") score += 30;
  else if (ko.sulamericana === "semi") score += 15;
  if (groupsLib) score += 60;
  if (snap.trophies.libertadores) score += 110;
  // Libertadores — 2º lugar: +35. 3º lugar: +20.
  else if (ko.libertadores === "final") score += 35;
  else if (ko.libertadores === "semi") score += 20;
  if (groupsMun) score += 70;
  if (snap.trophies.mundial) score += 150;
  // Mundial — 2º: +40. 3º: +25.
  else if (ko.mundial === "final") score += 40;
  else if (ko.mundial === "semi") score += 25;
  return score;
}

export function computeScore(stats: RankingStats, seasonKOExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit }): number {
  let score = 0;
  // Bônus de troféus/classificação para a temporada ATUAL (via stats).
  score += snapshotScore({
    brasileiraoPos: stats.brasileiraoPos,
    trophies: stats.trophies,
    groupAdvanced: {
      libertadores: stats.groupAdvanced.libertadores,
      sulamericana: stats.groupAdvanced.sulamericana,
      mundial: stats.groupAdvanced.mundial,
    },
    koExits: seasonKOExits,
  });
  // Desempenho acumulado em TODAS as competições e temporadas.
  score += stats.totalWins * 5;
  score += stats.totalDraws * 2;
  // Gols e defesa ponderados pelo estilo tático — equilibra estilos
  // defensivos (poucos gols) vs ofensivos (muitos gols) pra que ambos
  // tenham chance parecida de pontuar.
  const w = STYLE_WEIGHTS[stats.tactic ?? "equilibrado"] ?? DEFAULT_STYLE_WEIGHT;
  score += stats.totalGf * w.gf;
  score += stats.totalGa * w.ga;
  score += stats.totalCleanSheets * w.cs;
  score += stats.totalBlowoutsAgainst * w.blow;
  // Longevidade + bônus retroativos das temporadas passadas.
  score += Math.max(0, stats.seasons - 1) * 50;
  return Math.max(0, Math.round(score));
}

/** Recomputa o score somando também bônus retroativos das temporadas passadas. */
export function computeFullScore(state: AnySave, stats: RankingStats): number {
  let score = computeScore(stats, state.seasonKOExits);
  for (const snap of state.seasonHistory ?? []) {
    score += snapshotScore(snap);
  }
  return Math.max(0, Math.round(score));
}
