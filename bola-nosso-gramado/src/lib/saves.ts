// Client-side helpers para o CRUD de save slots.
import { supabase } from "@/integrations/supabase/client";
import { computeStats, computeFullScore, type RankingStats } from "@/lib/ranking";

export type SaveMode = "casual" | "classico" | "hard";

export interface SaveSlot {
  id: string;
  user_id: string;
  slot_index: number;
  display_name: string;
  team_name: string;
  season: number;
  score: number;
  mode: SaveMode;
  stats: RankingStats | Record<string, never>;
  game_state: unknown;
  created_at: string;
  updated_at: string;
}


export const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _-]{3,20}$/;

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 3) return "O nome precisa ter pelo menos 3 caracteres.";
  if (trimmed.length > 20) return "O nome pode ter no máximo 20 caracteres.";
  if (!NAME_RE.test(trimmed)) return "Use apenas letras (com acentos), números, espaço, _ ou -.";
  return null;
}

export async function isNameAvailable(name: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_display_name_taken", {
    p_name: name.trim(),
  });
  if (error) throw error;
  return data !== true;
}

export async function listMySlots(userId: string): Promise<SaveSlot[]> {
  const { data, error } = await supabase
    .from("save_slots")
    .select("*")
    .eq("user_id", userId)
    .order("slot_index");
  if (error) throw error;
  return (data ?? []) as unknown as SaveSlot[];
}

type Json = ReturnType<typeof JSON.parse>;
const toJson = (v: unknown): Json => JSON.parse(JSON.stringify(v));

function extractMode(gameState: unknown): SaveMode {
  const m = (gameState as { mode?: unknown } | null)?.mode;
  if (m === "classico") return "classico";
  if (m === "hard") return "hard";
  return "casual";
}

function visibleScore(gameState: unknown, computedScore: number): number {
  const state = gameState as { phase?: unknown; preMatchRankingScore?: unknown } | null;
  const isLiveResult = state?.phase === "matchResult" || state?.phase === "compGroupResult" || state?.phase === "compKOResult";
  return isLiveResult && typeof state.preMatchRankingScore === "number" ? state.preMatchRankingScore : computedScore;
}

export async function createSlot(params: {
  userId: string;
  slotIndex: number;
  displayName: string;
  gameState: unknown;
}): Promise<SaveSlot> {
  const stats = computeStats(params.gameState as Parameters<typeof computeStats>[0]);
  const score = visibleScore(params.gameState, computeFullScore(params.gameState as Parameters<typeof computeStats>[0], stats));
  const { data, error } = await supabase
    .from("save_slots")
    .insert({
      user_id: params.userId,
      slot_index: params.slotIndex,
      display_name: params.displayName.trim(),
      team_name: stats.teamName,
      season: stats.season,
      score,
      mode: extractMode(params.gameState),
      stats: toJson(stats),
      game_state: toJson(params.gameState),
    })
    .select()
    .single();
  if (error) throw error;
  const slot = data as unknown as SaveSlot;
  void syncTitleEventsForSave(slot.id, params.gameState, stats).catch(() => {});
  void upsertRecordArchive(slot).catch(() => {});
  return slot;
}

export async function resetSlotCreatedAt(slotId: string): Promise<void> {
  const nowIso = new Date().toISOString();
  const { error } = await supabase
    .from("save_slots")
    .update({ created_at: nowIso })
    .eq("id", slotId);
  if (error) throw error;
}

export async function updateSlotState(slotId: string, gameState: unknown): Promise<void> {
  const stats = computeStats(gameState as Parameters<typeof computeStats>[0]);
  const score = visibleScore(gameState, computeFullScore(gameState as Parameters<typeof computeStats>[0], stats));
  const { error } = await supabase
    .from("save_slots")
    .update({
      team_name: stats.teamName,
      season: stats.season,
      score,
      mode: extractMode(gameState),
      stats: toJson(stats),
      game_state: toJson(gameState),
    })
    .eq("id", slotId);
  if (error) throw error;
  void syncTitleEventsForSave(slotId, gameState, stats).catch(() => {});
  void upsertRecordArchiveFromState(slotId, gameState, stats, score).catch(() => {});
}


/** Recalcula o score/stats de todos os saves do usuário usando a fórmula atual. */
export async function recomputeMyScores(userId: string): Promise<number> {
  const slots = await listMySlots(userId);
  let updated = 0;
  await Promise.all(slots.map(async (s) => {
    try {
      const gs = s.game_state as Parameters<typeof computeStats>[0];
      const stats = computeStats(gs);
      const newScore = visibleScore(s.game_state, computeFullScore(gs, stats));
      if (newScore === s.score) return;
      const { error } = await supabase
        .from("save_slots")
        .update({ score: newScore, stats: toJson(stats) })
        .eq("id", s.id);
      if (!error) updated++;
    } catch { /* ignore per-slot */ }
  }));
  return updated;
}

export async function deleteSlot(slotId: string): Promise<void> {
  // Marca o snapshot no arquivo (não é apagado — o rank de Recordes preserva).
  try {
    await supabase
      .from("save_records_archive")
      .update({ archived_at: new Date().toISOString() })
      .eq("save_id", slotId)
      .is("archived_at", null);
  } catch { /* melhor esforço */ }
  const { error } = await supabase.from("save_slots").delete().eq("id", slotId);
  if (error) throw error;
}

/** Upsert do snapshot completo no arquivo de recordes (preservado após delete). */
async function upsertRecordArchive(slot: SaveSlot): Promise<void> {
  await supabase.from("save_records_archive").upsert({
    user_id: slot.user_id,
    save_id: slot.id,
    display_name: slot.display_name,
    team_name: slot.team_name,
    season: slot.season,
    mode: slot.mode,
    score: slot.score,
    stats: toJson(slot.stats),
    game_state: toJson(slot.game_state),
    created_at: slot.created_at,
    updated_at: slot.updated_at,
  }, { onConflict: "save_id" });
}

async function upsertRecordArchiveFromState(
  slotId: string,
  gameState: unknown,
  stats: RankingStats,
  score: number,
): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return;
  await supabase.from("save_records_archive").upsert({
    user_id: uid,
    save_id: slotId,
    display_name: stats.teamName || "—",
    team_name: stats.teamName,
    season: stats.season,
    mode: extractMode(gameState),
    score,
    stats: toJson(stats),
    game_state: toJson(gameState),
    updated_at: new Date().toISOString(),
  }, { onConflict: "save_id" });
}


export interface RankingEntry {
  id: string;
  display_name: string;
  username: string | null;
  team_name: string;
  season: number;
  score: number;
  mode: SaveMode;
  stats: RankingStats;
  updated_at: string;
  created_at: string;
  game_state: unknown;
}

/** Recalcula o score a partir do game_state salvo (garante que mudanças na fórmula
 *  se apliquem retroativamente sem depender de re-salvar cada slot). */
function recomputeEntry<T extends { score: number; stats: RankingStats | Record<string, never>; game_state: unknown }>(row: T): T {
  try {
    const stats = computeStats(row.game_state as Parameters<typeof computeStats>[0]);
    const score = visibleScore(row.game_state, computeFullScore(row.game_state as Parameters<typeof computeStats>[0], stats));
    return { ...row, score, stats } as T;
  } catch {
    return row;
  }
}

export async function fetchRanking(limit = 100, mode?: SaveMode): Promise<RankingEntry[]> {
  const { data, error } = await supabase.rpc("get_public_ranking", {
    p_mode: mode,
    p_limit: Math.max(limit, 500),
  });
  if (error) throw error;
  const rows = ((data ?? []) as unknown as RankingEntry[]).map(recomputeEntry);
  rows.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.updated_at ?? "").localeCompare(b.updated_at ?? "");
  });
  return rows.slice(0, limit);
}



/** Entradas para o rank de Recordes: lê do arquivo permanente (não some ao excluir save). */
export async function fetchRecordsEntries(limit = 2000): Promise<RankingEntry[]> {
  const { data, error } = await supabase.rpc("get_records_ranking", {
    p_limit: Math.max(limit, 500),
  });
  if (error) throw error;
  const rows = ((data ?? []) as unknown as RankingEntry[]).map(recomputeEntry);
  return rows;
}


/** Retorna { position, total } no ranking global (opcionalmente filtrado por modo).
 * position = 1 é o topo. Empates: quem tiver score maior fica na frente. */
export async function fetchRankingPosition(score: number, mode?: SaveMode): Promise<{ position: number; total: number }> {
  const { data, error } = await supabase.rpc("get_public_ranking", {
    p_mode: mode,
    p_limit: 5000,
  });
  if (error) throw error;
  const rows = (data ?? []) as Array<{ score: number; game_state: unknown }>;
  const recomputed = rows.map((r) => {
    try {
      const stats = computeStats(r.game_state as Parameters<typeof computeStats>[0]);
      return visibleScore(r.game_state, computeFullScore(r.game_state as Parameters<typeof computeStats>[0], stats));
    } catch {
      return r.score ?? 0;
    }
  });
  const total = recomputed.length;
  const ahead = recomputed.filter((s) => s > score).length;
  return { position: ahead + 1, total };
}

// ============ Profiles / username ============

export interface Profile {
  id: string;
  username: string;
}

export function validateUsername(name: string): string | null {
  return validateName(name);
}

export async function isUsernameAvailable(name: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_username_taken", { p_name: name.trim() });
  if (error) throw error;
  return data !== true;
}

export async function getMyProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile | null) ?? null;
}

export async function upsertMyProfile(userId: string, username: string): Promise<Profile> {
  const trimmed = username.trim();
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, username: trimmed })
    .select("id, username")
    .single();
  if (error) throw error;
  return data as Profile;
}

// ============ Ranking agregado por jogador ============

export interface UserRankingSlot {
  display_name: string;
  team_name: string;
  score: number;
  mode: SaveMode;
  season: number;
  stats: RankingStats | Record<string, never>;
  crest_config?: import("@/components/Crest").CrestConfig | null;
  created_at?: string;
  updated_at?: string;
}

export interface UserRankingEntry {
  user_id: string;
  username: string;
  total_score: number;
  slot_count: number;
  best_score: number;
  slots: UserRankingSlot[];
}

export async function fetchUserRanking(limit = 200): Promise<UserRankingEntry[]> {
  const { data, error } = await supabase.rpc("get_user_ranking", { p_limit: limit });
  if (error) throw error;
  const rows = (data ?? []) as unknown as UserRankingEntry[];
  const normalized = rows.map((u) => {
    const slots = ((u.slots ?? []) as UserRankingSlot[])
      .slice()
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    // Ranking soma apenas os 3 melhores slots do jogador.
    const top3 = slots.slice(0, 3);
    const total = top3.reduce((sum, s) => sum + (s.score ?? 0), 0);
    const best = slots.reduce((m, s) => Math.max(m, s.score ?? 0), 0);
    return { ...u, slots, total_score: total, best_score: best, slot_count: slots.length };
  });
  normalized.sort((a, b) => b.total_score - a.total_score || a.username.localeCompare(b.username));
  return normalized;
}

// ============ Ranking por conta (títulos acumulados) ============

type CompetitionKey = "brasileirao" | "libertadores" | "sulamericana" | "mundial";
type KOExit = "champion" | "final" | "semi" | "fourth" | "quarter" | "r16" | "groups";

interface TitleEventPayload {
  save_id: string;
  season: number;
  competition: CompetitionKey;
  place: 1 | 2 | 3;
}

function koExitToPlace(exit?: KOExit, championFallback = false): 1 | 2 | 3 | null {
  if (championFallback || exit === "champion") return 1;
  if (exit === "final") return 2;
  if (exit === "semi") return 3;
  return null;
}

function eventsFromSeason(
  saveId: string,
  season: number,
  brasileiraoPos: number | null,
  trophies: { brasileirao?: boolean; libertadores?: boolean; sulamericana?: boolean; mundial?: boolean } | undefined,
  koExits: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit } | undefined,
): TitleEventPayload[] {
  const out: TitleEventPayload[] = [];
  if (brasileiraoPos && brasileiraoPos >= 1 && brasileiraoPos <= 3) {
    out.push({ save_id: saveId, season, competition: "brasileirao", place: brasileiraoPos as 1 | 2 | 3 });
  } else if (trophies?.brasileirao) {
    out.push({ save_id: saveId, season, competition: "brasileirao", place: 1 });
  }
  const comps: [CompetitionKey, boolean | undefined, KOExit | undefined][] = [
    ["mundial", trophies?.mundial, koExits?.mundial],
    ["libertadores", trophies?.libertadores, koExits?.libertadores],
    ["sulamericana", trophies?.sulamericana, koExits?.sulamericana],
  ];
  for (const [comp, won, exit] of comps) {
    const place = koExitToPlace(exit, !!won);
    if (place) out.push({ save_id: saveId, season, competition: comp, place });
  }
  return out;
}

interface GameStateForEvents {
  season?: number;
  trophies?: { brasileirao?: boolean; libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  seasonKOExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
  seasonHistory?: Array<{
    season: number;
    brasileiraoPos: number | null;
    trophies?: { brasileirao?: boolean; libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
    koExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
  }>;
}

export function extractTitleEvents(saveId: string, gameState: unknown, currentBrasileiraoPos: number | null): TitleEventPayload[] {
  const gs = (gameState ?? {}) as GameStateForEvents;
  const events: TitleEventPayload[] = [];
  for (const snap of gs.seasonHistory ?? []) {
    events.push(...eventsFromSeason(saveId, snap.season, snap.brasileiraoPos, snap.trophies, snap.koExits));
  }
  events.push(...eventsFromSeason(saveId, gs.season ?? 1, currentBrasileiraoPos, gs.trophies, gs.seasonKOExits));
  return events;
}

async function syncTitleEventsForSave(saveId: string, gameState: unknown, stats: RankingStats): Promise<void> {
  const events = extractTitleEvents(saveId, gameState, stats.brasileiraoPos ?? null);
  if (events.length === 0) return;
  const { error } = await (supabase as unknown as {
    rpc: (fn: string, params: Record<string, unknown>) => Promise<{ error: unknown }>;
  }).rpc("sync_title_events", { p_events: events });

  if (error) throw error;
}

export interface AccountRankingEntry {
  user_id: string;
  username: string;
  total_score: number;
  mundial_1: number; mundial_2: number; mundial_3: number;
  libertadores_1: number; libertadores_2: number; libertadores_3: number;
  brasileirao_1: number; brasileirao_2: number; brasileirao_3: number;
  sulamericana_1: number; sulamericana_2: number; sulamericana_3: number;
}

export async function fetchAccountRanking(limit = 200): Promise<AccountRankingEntry[]> {
  const { data, error } = await (supabase as unknown as {
    rpc: (fn: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
  }).rpc("get_account_ranking", { p_limit: limit });

  if (error) throw error;
  return ((data ?? []) as unknown as Array<AccountRankingEntry & { total_score: number | string }>).map((r) => ({
    ...r,
    total_score: Number(r.total_score) || 0,
  }));
}

// ============ Badges ============

import type { BadgeKind } from "@/lib/badges";
import { findBadge, setPlayerBadgeCount } from "@/lib/badges";
import type { FormationId, TacticStyle } from "@/lib/formations";

export interface UserBadgeRow {
  badge_key: string;
  style: TacticStyle;
  formation: FormationId;
  kind: BadgeKind;
  team_name: string | null;
  season: number | null;
  unlocked_at: string;
}

export async function fetchMyBadges(userId: string): Promise<UserBadgeRow[]> {
  const { data, error } = await supabase
    .from("user_badges")
    .select("badge_key, style, formation, kind, team_name, season, unlocked_at")
    .eq("user_id", userId)
    .order("unlocked_at");
  if (error) throw error;
  return (data ?? []) as unknown as UserBadgeRow[];
}

export async function fetchUserBadgesByUsername(username: string): Promise<UserBadgeRow[]> {
  const { data, error } = await (supabase as unknown as {
    rpc: (fn: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
  }).rpc("get_user_badges_by_username", { p_username: username });
  if (error) throw error;
  return ((data ?? []) as unknown as UserBadgeRow[]);
}

/** Chamado no login/carregamento pra popular o bônus de OVR. */
export async function refreshMyBadgeBonus(userId: string): Promise<number> {
  try {
    const rows = await fetchMyBadges(userId);
    setPlayerBadgeCount(rows.length);
    return rows.length;
  } catch { return 0; }
}

/** Tenta desbloquear a medalha correspondente ao par (style, formation).
 * Retorna a definição da medalha nova se conseguiu inserir agora, ou null
 * se já tinha ou se o par não corresponde a nenhuma medalha. */
export async function tryUnlockBadge(params: {
  userId: string;
  style: TacticStyle | undefined;
  formation: FormationId | undefined;
  saveId?: string | null;
  teamName?: string | null;
  season?: number | null;
}) {
  const def = findBadge(params.style, params.formation);
  if (!def) return null;
  const { data, error } = await supabase
    .from("user_badges")
    .insert({
      user_id: params.userId,
      badge_key: def.key,
      style: def.style,
      formation: def.formation,
      kind: def.kind,
      save_id: params.saveId ?? null,
      team_name: params.teamName ?? null,
      season: params.season ?? null,
    })
    .select("badge_key")
    .maybeSingle();
  if (error) {
    // Duplicate (unique violation) = já tinha
    return null;
  }
  if (data) {
    // atualiza cache
    await refreshMyBadgeBonus(params.userId);
    return def;
  }
  return null;
}

export interface BadgeRankingEntry {
  user_id: string;
  username: string;
  badge_count: number;
  badges: Array<{
    badge_key: string;
    style: TacticStyle;
    formation: FormationId;
    kind: BadgeKind;
    team_name?: string | null;
    season?: number | null;
    unlocked_at: string;
  }>;
}

export async function fetchBadgeRanking(limit = 200): Promise<BadgeRankingEntry[]> {
  const { data, error } = await (supabase as unknown as {
    rpc: (fn: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
  }).rpc("get_badge_ranking", { p_limit: limit });
  if (error) throw error;
  return ((data ?? []) as unknown as BadgeRankingEntry[]);
}





