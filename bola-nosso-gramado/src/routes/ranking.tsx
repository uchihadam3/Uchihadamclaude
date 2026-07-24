import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchRanking, fetchUserRanking, fetchAccountRanking, fetchBadgeRanking, type RankingEntry, type SaveMode, type UserRankingEntry, type AccountRankingEntry, type BadgeRankingEntry } from "@/lib/saves";
import { BADGES, MAX_BADGES } from "@/lib/badges";
import { Badge } from "@/components/Badge";
import type { Player, Position } from "@/lib/gameData";
import { teamOverall, teamRatings } from "@/lib/gameLogic";
import { Crest, PlayerCrestProvider, type CrestConfig } from "@/components/Crest";
import { AchievementChips } from "@/components/AchievementChips";
import { TacticsBadge } from "@/components/TacticsBadge";
import { LiveDot, formatCreatedAt } from "@/components/LiveDot";
import type { FormationId, TacticStyle } from "@/lib/formations";
import {
  topGoalsFor, topLeastGoalsAgainst, topCleanSheets, topWinRate,
  topSeasons, topGoalDifference, topScorers,
  type TeamRecord, type ScorerRecord,
} from "@/lib/records";


function extractTactics(gameState: unknown): { formation?: FormationId; tactic?: TacticStyle } {
  const gs = gameState as { formation?: FormationId; tactic?: TacticStyle } | null;
  return { formation: gs?.formation, tactic: gs?.tactic };
}

function extractCrestConfig(gameState: unknown): CrestConfig | null {
  const gs = gameState as { crestConfig?: CrestConfig | null } | null;
  return gs?.crestConfig ?? null;
}

function PlayerCrest({ name, size = 40, config }: { name: string; size?: number; config?: CrestConfig | null }) {
  return (
    <PlayerCrestProvider config={config ?? null}>
      <Crest colors={["#facc15", "#ffffff"]} short="VOC" name={name} size={size} player config={config ?? undefined} />
    </PlayerCrestProvider>
  );
}




export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking Global — Lendas do Brasileirão" },
      { name: "description", content: "Veja quem está no topo do ranking global de Lendas do Brasileirão: títulos, saldo de gols e pontuação." },
      { property: "og:title", content: "Ranking Global — Lendas do Brasileirão" },
      { property: "og:description", content: "Títulos, saldo de gols e pontos. Quem manda no futebol?" },
    ],
  }),
  component: RankingPage,
});

function extractSquad(gameState: unknown): Player[] {
  const picks = (gameState as { picks?: Array<{ player?: Player }> } | null)?.picks;
  if (!Array.isArray(picks)) return [];
  return picks.map((p) => p?.player).filter((p): p is Player => !!p && typeof p.overall === "number");
}

function PositionBadge({ p }: { p: Position }) {
  const colors: Record<Position, string> = {
    GOL: "bg-orange-500/20 text-orange-300",
    ZAG: "bg-blue-500/20 text-blue-300",
    MEI: "bg-emerald-500/20 text-emerald-300",
    ATA: "bg-red-500/20 text-red-300",
  };
  return <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${colors[p]}`}>{p}</span>;
}

function OvrChip({ ovr }: { ovr: number }) {
  const color = ovr >= 85 ? "bg-yellow-400 text-black" : ovr >= 80 ? "bg-emerald-400 text-black" : "bg-secondary text-foreground";
  return <span className={`rounded-md px-2 py-0.5 font-display text-sm ${color}`}>{Math.round(ovr)}</span>;
}

function SquadModal({ entry, onClose }: { entry: RankingEntry; onClose: () => void }) {
  const squad = useMemo(() => extractSquad(entry.game_state), [entry.game_state]);
  const tactics = useMemo(() => {
    const t = extractTactics(entry.game_state);
    return t.formation ? { formation: t.formation, style: t.tactic ?? ("equilibrado" as TacticStyle) } : undefined;
  }, [entry.game_state]);
  const ratings = useMemo(() => teamRatings(squad, tactics), [squad, tactics]);
  const ovr = useMemo(() => teamOverall(squad), [squad]);
  const posOrder: Record<Position, number> = { GOL: 0, ZAG: 1, MEI: 2, ATA: 3 };
  const sorted = [...squad].sort((a, b) => {
    const d = posOrder[a.position] - posOrder[b.position];
    return d !== 0 ? d : b.overall - a.overall;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 animate-fade-in" onClick={onClose}>
      <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-card card-glow" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 border-b border-border/40 bg-card px-4 pt-4 pb-3">
          <PlayerCrest name={entry.team_name} size={48} config={extractCrestConfig(entry.game_state)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 truncate font-display text-xl">
              <LiveDot updatedAt={entry.updated_at} />
              <span className="truncate">{entry.team_name || "—"}</span>
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {entry.username ? <>👤 <span className="text-foreground">{entry.username}</span> · </> : null}
              Save "{entry.display_name}" · {entry.mode === "classico" ? "Clássico" : entry.mode === "hard" ? "Hard 🔥" : "Casual"}
            </div>
            {formatCreatedAt(entry.created_at) && (
              <div className="mt-0.5 text-[10px] text-muted-foreground">📅 Criado em {formatCreatedAt(entry.created_at)}</div>
            )}
          </div>
          <button onClick={onClose} className="rounded-full bg-secondary px-3 py-1 text-xs">Fechar</button>

        </div>
        <div className="flex-1 overflow-y-auto p-4">
        {entry.stats?.achievements?.length ? (
          <div className="mb-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Campanha</div>
            <AchievementChips items={entry.stats.achievements} size="sm" />
          </div>
        ) : null}
        {(() => { const t = extractTactics(entry.game_state); return <TacticsBadge formation={t.formation} tactic={t.tactic} />; })()}

        {squad.length === 0 ? (
          <div className="rounded-lg bg-secondary/40 p-4 text-center text-sm text-muted-foreground">
            Escalação indisponível para este save.
          </div>
        ) : (
          <>
            <div className="mb-3 grid grid-cols-3 gap-2 rounded-xl bg-secondary/40 p-3 text-center">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Overall</div>
                <div className="mt-1"><OvrChip ovr={ovr} /></div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-red-300">Ataque</div>
                <div className="mt-1 font-display text-lg text-red-200">{Math.round(ratings.atk)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-blue-300">Defesa</div>
                <div className="mt-1 font-display text-lg text-blue-200">{Math.round(ratings.def)}</div>
              </div>
            </div>

            <div className="space-y-1.5">
              {sorted.map((p, i) => (
                <div key={`${p.name}-${i}`} className="flex items-center justify-between rounded-lg bg-secondary/50 p-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{p.name}{p.legend ? " 👑" : ""}</div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <PositionBadge p={p.position} />
                      {p.club && <span className="truncate text-[10px] text-muted-foreground">{p.club}</span>}
                    </div>
                  </div>
                  <OvrChip ovr={p.overall} />
                </div>
              ))}
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

type Tab = "casual" | "classico" | "hard" | "players" | "account" | "badges" | "records";

function ModeBadge({ mode }: { mode: SaveMode }) {
  const cls = mode === "classico"
    ? "bg-yellow-500/20 text-yellow-300"
    : mode === "hard"
    ? "bg-orange-500/25 text-orange-200"
    : "bg-blue-500/20 text-blue-200";
  const label = mode === "classico" ? "Clássico" : mode === "hard" ? "Hard 🔥" : "Casual";
  return <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${cls}`}>{label}</span>;
}

function UserRankingList({ rows }: { rows: UserRankingEntry[] }) {
  if (rows.length === 0) return <div className="mt-8 text-center text-muted-foreground">Nenhum jogador com saves ainda.</div>;
  return (
    <ol className="mt-4 space-y-2">
      {rows.map((u, i) => {
        const pos = i + 1;
        const podium = pos === 1 ? "rank-row rank-row-gold" : pos === 2 ? "rank-row rank-row-silver" : pos === 3 ? "rank-row rank-row-bronze" : "rank-row";
        return (
          <li key={u.user_id} className={`${podium} p-3`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 shrink-0 text-center font-display text-2xl ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-lg">👤</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="truncate font-display text-lg">{u.username}</div>
                  <div className="shrink-0 rounded-md bg-primary/25 px-2 py-0.5 font-display text-primary">{u.total_score} pts</div>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {u.slot_count} save{u.slot_count === 1 ? "" : "s"} · soma dos <b>3 melhores</b> · melhor {u.best_score} pts
                </div>
                <div className="mt-2 space-y-1">
                  {u.slots.map((s, idx) => {
                    const counts = idx < 3;
                    const created = formatCreatedAt(s.created_at);
                    return (
                      <div key={idx} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${counts ? "bg-primary/10 ring-1 ring-primary/30" : "bg-secondary/30 opacity-70"}`}>
                        <div className="relative shrink-0">
                          <PlayerCrest name={s.team_name || s.display_name} size={22} config={s.crest_config ?? null} />
                          <div className="absolute -right-0.5 -top-0.5">
                            <LiveDot updatedAt={s.updated_at} size="xs" />
                          </div>
                        </div>
                        {counts && <span className="shrink-0 rounded bg-primary/30 px-1.5 font-display text-[10px] text-primary">TOP{idx + 1}</span>}
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{s.team_name || s.display_name || "—"}</div>
                          {created && <div className="truncate text-[9px] text-muted-foreground">📅 {created}</div>}
                        </div>

                        <ModeBadge mode={s.mode} />
                        <div className="shrink-0 rounded bg-primary/20 px-1.5 py-0.5 font-display text-primary">{s.score}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function AccountRankingList({ rows }: { rows: AccountRankingEntry[] }) {
  if (rows.length === 0) {
    return <div className="mt-8 text-center text-muted-foreground">Ninguém conquistou títulos ainda. Vá lá e levante uma taça! 🏆</div>;
  }
  const comps = [
    { key: "mundial", label: "Mundial", icon: "🌍", tone: "text-purple-300", w: [40, 18, 7] },
    { key: "libertadores", label: "Libertadores", icon: "🏆", tone: "text-yellow-300", w: [32, 14, 5] },
    { key: "brasileirao", label: "Brasileirão", icon: "🥇", tone: "text-emerald-300", w: [26, 11, 4] },
    { key: "sulamericana", label: "Sul-Americana", icon: "🥈", tone: "text-sky-300", w: [22, 9, 3] },
  ] as const;
  return (
    <ol className="mt-4 space-y-2">
      {rows.map((r, i) => {
        const pos = i + 1;
        const podium = pos === 1 ? "rank-row rank-row-gold" : pos === 2 ? "rank-row rank-row-silver" : pos === 3 ? "rank-row rank-row-bronze" : "rank-row";
        return (
          <li key={r.user_id} className={`${podium} p-3`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 shrink-0 text-center font-display text-2xl ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="min-w-0 flex-1 truncate font-display text-lg gold-text">👤 {r.username}</div>
                  <div className="shrink-0 rounded-md bg-purple-500/25 px-2 py-0.5 font-display text-sm text-purple-200">{r.total_score.toLocaleString("pt-BR")} pts</div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px] sm:grid-cols-4">
                  {comps.map((c) => {
                    const p1 = (r[`${c.key}_1` as keyof AccountRankingEntry] as number) || 0;
                    const p2 = (r[`${c.key}_2` as keyof AccountRankingEntry] as number) || 0;
                    const p3 = (r[`${c.key}_3` as keyof AccountRankingEntry] as number) || 0;
                    const total = p1 + p2 + p3;
                    return (
                      <div key={c.key} className={`rounded-lg border border-border/40 bg-black/20 p-2 ${total === 0 ? "opacity-50" : ""}`}>
                        <div className={`flex items-center gap-1 font-semibold ${c.tone}`}>
                          <span>{c.icon}</span>
                          <span className="truncate">{c.label}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                          <span title="Campeão" className="rounded bg-yellow-400/20 px-1 py-0.5 text-yellow-200">🥇 {p1}</span>
                          <span title="Vice" className="rounded bg-zinc-300/15 px-1 py-0.5 text-zinc-200">🥈 {p2}</span>
                          <span title="Semifinalista" className="rounded bg-amber-700/20 px-1 py-0.5 text-amber-200">🥉 {p3}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function BadgeRankingList({ rows }: { rows: BadgeRankingEntry[] }) {
  if (rows.length === 0) {
    return <div className="mt-8 text-center text-muted-foreground">Ninguém conquistou medalhas ainda. Vá lá e ganhe o Mundial! 🏅</div>;
  }
  return (
    <ol className="mt-4 space-y-2">
      {rows.map((r, i) => {
        const pos = i + 1;
        const podium = pos === 1 ? "rank-row rank-row-gold" : pos === 2 ? "rank-row rank-row-silver" : pos === 3 ? "rank-row rank-row-bronze" : "rank-row";
        return (
          <li key={r.user_id} className={`${podium} p-3`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 shrink-0 text-center font-display text-2xl ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <Link
                    to="/badges/$username"
                    params={{ username: r.username }}
                    className="min-w-0 flex-1 truncate font-display text-lg gold-text hover:underline"
                  >👤 {r.username}</Link>
                  <div className="shrink-0 rounded-md bg-orange-500/25 px-2 py-0.5 font-display text-sm text-orange-200">{r.badge_count}/{MAX_BADGES}</div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {BADGES.map((b) => {
                    const on = r.badges.some((x) => x.badge_key === b.key);
                    if (!on) return null;
                    return <Badge key={b.key} badge={b} size={44} />;
                  })}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const MEDAL_EMOJI = ["🥇", "🥈", "🥉"];

function RecordRow({ pos, name, subtitle, value, unit, highlight }: {
  pos: number;
  name: string;
  subtitle: string;
  value: string;
  unit?: string;
  highlight: "gold" | "silver" | "bronze" | "muted";
}) {
  const tone =
    highlight === "gold" ? "bg-gradient-to-r from-yellow-500/25 via-yellow-400/15 to-transparent ring-1 ring-yellow-400/60"
    : highlight === "silver" ? "bg-gradient-to-r from-zinc-300/20 via-zinc-200/10 to-transparent ring-1 ring-zinc-300/40"
    : highlight === "bronze" ? "bg-gradient-to-r from-amber-700/25 via-amber-600/10 to-transparent ring-1 ring-amber-600/40"
    : "bg-secondary/30";
  const medal = pos <= 3 ? MEDAL_EMOJI[pos - 1] : null;
  return (
    <div className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${tone}`}>
      <div className="w-7 shrink-0 text-center font-display text-sm">
        {medal ?? <span className="text-muted-foreground">{pos}º</span>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{name}</div>
        <div className="truncate text-[10px] text-muted-foreground">{subtitle}</div>
      </div>
      <div className={`shrink-0 rounded-md px-2 py-0.5 font-display text-sm ${pos === 1 ? "bg-yellow-400/25 text-yellow-200" : "bg-primary/20 text-primary"}`}>
        {value}{unit ? <span className="ml-0.5 text-[10px] opacity-70">{unit}</span> : null}
      </div>
    </div>
  );
}

function highlightFor(pos: number): "gold" | "silver" | "bronze" | "muted" {
  return pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "muted";
}

function RecordCard({ icon, title, hint, tone, children, empty }: {
  icon: string;
  title: string;
  hint: string;
  tone: string;
  children: React.ReactNode;
  empty: boolean;
}) {
  return (
    <div className={`sticker-card overflow-hidden`}>
      <div className={`flex items-start gap-3 border-b border-border/40 bg-gradient-to-r ${tone} px-3 py-2.5`}>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-black/30 text-2xl shadow-inner">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-base leading-tight">{title}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground/90">{hint}</div>
        </div>
      </div>
      <div className="space-y-1 p-2.5">
        {empty ? (
          <div className="py-4 text-center text-xs text-muted-foreground">Sem dados suficientes ainda — seja o primeiro! 🚀</div>
        ) : children}
      </div>
    </div>
  );
}

function teamSubtitle(r: TeamRecord): string {
  const who = r.username ? `👤 ${r.username}` : `Save "${r.saveDisplayName}"`;
  const extra = r.detail ? ` · ${r.detail}` : "";
  return `${who}${extra}`;
}

export function RecordsBoard({ entries }: { entries: RankingEntry[] }) {
  const goalsFor = useMemo(() => topGoalsFor(entries, 5), [entries]);
  const leastGA = useMemo(() => topLeastGoalsAgainst(entries, 5), [entries]);
  const cleanSheets = useMemo(() => topCleanSheets(entries, 5), [entries]);
  const winRate = useMemo(() => topWinRate(entries, 5), [entries]);
  const seasons = useMemo(() => topSeasons(entries, 5), [entries]);
  const goalDiff = useMemo(() => topGoalDifference(entries, 5), [entries]);
  const scorers = useMemo(() => topScorers(entries, 5), [entries]);

  const renderTeamList = (rows: TeamRecord[], unit?: string, formatter: (n: number) => string = (n) => String(n)) => (
    rows.map((r, i) => {
      const pos = i + 1;
      return (
        <RecordRow
          key={`${r.saveId}-${i}`}
          pos={pos}
          name={r.teamName}
          subtitle={teamSubtitle(r)}
          value={formatter(r.value)}
          unit={unit}
          highlight={highlightFor(pos)}
        />
      );
    })
  );

  const renderScorers = (rows: ScorerRecord[]) => (
    rows.map((r, i) => {
      const pos = i + 1;
      const who = r.username ? `👤 ${r.username}` : `Save "${r.saveDisplayName}"`;
      return (
        <RecordRow
          key={`${r.playerName}-${i}`}
          pos={pos}
          name={`${r.playerName}`}
          subtitle={`${r.teamName} · ${who} · ${r.seasons}T`}
          value={String(r.goals)}
          unit="gols"
          highlight={highlightFor(pos)}
        />
      );
    })
  );

  return (
    <div className="mt-4 space-y-3">
      <div className="sticker-card p-3 text-center text-xs text-muted-foreground">
        🏅 <b className="text-foreground">Quadro de recordes</b> — os maiores feitos de todas as campanhas. Bata os números e entre pra história!
      </div>

      <RecordCard
        icon="⚽"
        title="Artilheiros de todos os tempos"
        hint="O jogador que mais balançou a rede numa mesma campanha"
        tone="from-red-500/25 to-transparent"
        empty={scorers.length === 0}
      >
        {renderScorers(scorers)}
      </RecordCard>

      <RecordCard
        icon="🥅"
        title="Ataque mais goleador"
        hint="Time que fez mais gols somando todos os jogos da campanha"
        tone="from-orange-500/25 to-transparent"
        empty={goalsFor.length === 0}
      >
        {renderTeamList(goalsFor, "gols")}
      </RecordCard>

      <RecordCard
        icon="🧱"
        title="Defesa menos vazada"
        hint="Menor média de gols sofridos por jogo — quanto menor, melhor (mín. 30 jogos)"
        tone="from-blue-500/25 to-transparent"
        empty={leastGA.length === 0}
      >
        {renderTeamList(leastGA, "/jogo", (n) => n.toFixed(2))}
      </RecordCard>


      <RecordCard
        icon="🧤"
        title="Muralhas"
        hint="Quantidade de jogos terminados sem levar nenhum gol"
        tone="from-cyan-500/25 to-transparent"
        empty={cleanSheets.length === 0}
      >
        {renderTeamList(cleanSheets, "CS")}
      </RecordCard>

      <RecordCard
        icon="📈"
        title="Maior aproveitamento"
        hint="% de vitórias sobre o total de jogos (mín. 30 jogos)"
        tone="from-emerald-500/25 to-transparent"
        empty={winRate.length === 0}
      >
        {renderTeamList(winRate, "%", (n) => n.toFixed(1))}
      </RecordCard>

      <RecordCard
        icon="🗓️"
        title="Veteranos"
        hint="Campanhas mais longas — quem jogou mais temporadas seguidas"
        tone="from-purple-500/25 to-transparent"
        empty={seasons.length === 0}
      >
        {renderTeamList(seasons, "temps.")}
      </RecordCard>

      <RecordCard
        icon="➕"
        title="Melhor saldo de gols"
        hint="Gols feitos menos gols sofridos na campanha inteira"
        tone="from-pink-500/25 to-transparent"
        empty={goalDiff.length === 0}
      >
        {renderTeamList(goalDiff, "saldo", (n) => (n > 0 ? `+${n}` : String(n)))}
      </RecordCard>

    </div>
  );
}

function RankingPage() {





  const [tab, setTab] = useState<Tab>("casual");
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [users, setUsers] = useState<UserRankingEntry[]>([]);
  const [accounts, setAccounts] = useState<AccountRankingEntry[]>([]);
  const [badges, setBadges] = useState<BadgeRankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setOpenId(null);
    if (tab === "players") {
      fetchUserRanking(200)
        .then(setUsers)
        .catch((e) => setError(e instanceof Error ? e.message : String(e)))
        .finally(() => setLoading(false));
    } else if (tab === "account") {
      fetchAccountRanking(200)
        .then(setAccounts)
        .catch((e) => setError(e instanceof Error ? e.message : String(e)))
        .finally(() => setLoading(false));
    } else if (tab === "badges") {
      fetchBadgeRanking(200)
        .then(setBadges)
        .catch((e) => setError(e instanceof Error ? e.message : String(e)))
        .finally(() => setLoading(false));
    } else if (tab === "records") {
      // Puxa do arquivo permanente (mantém recordes mesmo após excluir/reiniciar time).
      import("@/lib/saves").then(({ fetchRecordsEntries }) => {
        fetchRecordsEntries(2000)
          .then(setEntries)
          .catch((e) => setError(e instanceof Error ? e.message : String(e)))
          .finally(() => setLoading(false));
      });

    } else {
      fetchRanking(100, tab as SaveMode)
        .then(setEntries)
        .catch((e) => setError(e instanceof Error ? e.message : String(e)))
        .finally(() => setLoading(false));
    }
  }, [tab]);



  const openEntry = openId ? entries.find((e) => e.id === openId) ?? null : null;

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 pb-24">
      <header className="mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-300/80">Ranking</div>
          <div className="cartoon-title text-4xl leading-none">Global</div>
        </div>
        <Link
          to="/"
          className="sticker-btn px-3 py-1.5 text-xs"
        >← Voltar</Link>
      </header>

      <div className="chunky-tabs mb-3 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7">
        <button data-active={tab === "casual"} onClick={() => setTab("casual")} className="chunky-tab">Casual</button>
        <button data-active={tab === "classico"} onClick={() => setTab("classico")} className="chunky-tab">Clássico 🏆</button>
        <button data-active={tab === "hard"} onClick={() => setTab("hard")} className="chunky-tab">Hard 🔥</button>
        <button data-active={tab === "players"} onClick={() => setTab("players")} className="chunky-tab">👥 Jogadores</button>
        <button data-active={tab === "account"} onClick={() => setTab("account")} className="chunky-tab">🏛️ Conta</button>
        <button data-active={tab === "badges"} onClick={() => setTab("badges")} className="chunky-tab">🏅 Medalhas</button>
        <button data-active={tab === "records"} onClick={() => setTab("records")} className="chunky-tab">🏅 Recordes</button>
      </div>

      <div className="sticker-card p-3 text-xs text-muted-foreground">
        {tab === "classico" && "Modo Clássico: mais difícil, adversários mais fortes. Ranking exclusivo dos bravos que encaram o desafio."}
        {tab === "casual" && "Modo Casual: dificuldade padrão. Pontuação por títulos, posição no Brasileirão, vitórias e saldo de gols."}
        {tab === "hard" && "Modo Hard 🔥: sem lendas no draft inicial, OVR limitado a 80 e reforços em etapas ao longo da 1ª temporada. Só os fortes chegam ao topo."}
        {tab === "players" && "Soma de pontos dos 3 melhores saves de cada jogador (Casual + Clássico + Hard). Quem mais somou está no topo."}
        {tab === "account" && "Ranking acumulativo por conta. Soma TODOS os títulos de TODOS os saves — inclusive os que você já apagou. Mundial 🌍 vale mais, depois Libertadores 🏆, Brasileirão 🥇 e Sul-Americana 🥈."}
        {tab === "badges" && `Ranking das medalhas do Mundial. Cada medalha desbloqueada vale 1 ponto. São ${MAX_BADGES} no total — vença o Mundial com pares específicos de estilo+formação. Clique num jogador pra ver a coleção dele.`}
        {tab === "records" && "Sete quadros de recordes globais reunindo os maiores feitos de todas as campanhas — todos os modos juntos. Bata os números pra entrar no hall da fama!"}
      </div>

      {loading && <div className="mt-6 text-center text-muted-foreground">Carregando ranking...</div>}
      {error && <div className="mt-6 rounded-lg bg-red-500/15 p-3 text-sm text-red-300">{error}</div>}

      {!loading && !error && tab === "players" && <UserRankingList rows={users} />}
      {!loading && !error && tab === "account" && <AccountRankingList rows={accounts} />}
      {!loading && !error && tab === "badges" && <BadgeRankingList rows={badges} />}
      {!loading && !error && tab === "records" && <RecordsBoard entries={entries} />}


      {!loading && !error && (tab === "casual" || tab === "classico" || tab === "hard") && entries.length === 0 && (
        <div className="mt-8 text-center text-muted-foreground">Ninguém no ranking ainda. Seja o primeiro!</div>
      )}

      {!loading && !error && (tab === "casual" || tab === "classico" || tab === "hard") && entries.length >= 3 && (

        <div className="mt-5 sticker-card p-4">
          <div className="mb-3 text-center text-[10px] uppercase tracking-widest text-yellow-300/80">Pódio Global</div>
          <div className="flex items-end justify-center gap-3">
            {([1, 0, 2] as const).map((idx) => {
              const e = entries[idx];
              const place = (idx + 1) as 1 | 2 | 3;
              const heights = { 1: 108, 2: 82, 3: 62 } as const;
              const podium = place === 1 ? "podium-1" : place === 2 ? "podium-2" : "podium-3";
              const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉";
              const delay = place === 1 ? 0.15 : place === 2 ? 0 : 0.3;
              return (
                <button key={e.id} onClick={() => setOpenId(e.id)} className="flex w-1/3 max-w-[110px] flex-col items-center animate-podium-rise" style={{ animationDelay: `${delay}s` }}>
                  <div className="text-2xl">{medal}</div>
                  <PlayerCrest name={e.team_name} size={44} config={extractCrestConfig(e.game_state)} />
                  <div className="mt-1 w-full truncate text-center font-display text-xs">{e.team_name || "—"}</div>
                  <div className="text-[10px] text-primary font-display">{e.score} pts</div>
                  <div className={`mt-1 flex w-full items-start justify-center rounded-t-lg ${podium} text-black`} style={{ height: heights[place] }}>
                    <div className="mt-1 font-display text-2xl">{place}º</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!loading && !error && (tab === "casual" || tab === "classico" || tab === "hard") && (
      <ol className="mt-4 space-y-2">
        {entries.map((e, i) => {
          const pos = i + 1;
          const s = e.stats ?? ({} as RankingEntry["stats"]);
          const podium = pos === 1 ? "rank-row rank-row-gold" : pos === 2 ? "rank-row rank-row-silver" : pos === 3 ? "rank-row rank-row-bronze" : "rank-row";
          const hasSquad = extractSquad(e.game_state).length > 0;
          return (
            <li key={e.id} className={`${podium} p-3`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 shrink-0 text-center font-display text-2xl ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
                <PlayerCrest name={e.team_name} size={40} config={extractCrestConfig(e.game_state)} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="min-w-0 flex-1 flex items-center gap-1.5 truncate font-display text-lg gold-text">
                      <LiveDot updatedAt={e.updated_at} />
                      <span className="truncate">{e.team_name || "—"}</span>
                    </div>
                    <div className="shrink-0 rounded-md bg-primary/20 px-2 py-0.5 font-display text-sm text-primary">{e.score} pts</div>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                    <span className="truncate">
                      {e.username ? <>👤 <span className="text-foreground/90">{e.username}</span></> : e.display_name}
                    </span>
                    {formatCreatedAt(e.created_at) && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-border/50 bg-black/25 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        <span aria-hidden>📅</span>
                        <span>{formatCreatedAt(e.created_at)}</span>
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={!hasSquad}
                    onClick={() => hasSquad && setOpenId(e.id)}
                    className={`mt-1 block max-w-full truncate text-left text-[11px] ${hasSquad ? "text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80" : "text-muted-foreground cursor-default"}`}
                    title={hasSquad ? "Ver escalação, ataque e defesa" : undefined}
                  >
                    Save "{e.display_name}"{hasSquad ? " · 👁 ver elenco" : ""}
                  </button>
                  {s.achievements?.length ? (
                    <div className="mt-1.5">
                      <AchievementChips items={s.achievements} size="xs" />
                    </div>
                  ) : null}
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-emerald-300">V {s.totalWins ?? s.wins ?? 0}</span>
                    <span className="rounded bg-zinc-500/15 px-1.5 py-0.5 text-zinc-300">E {s.totalDraws ?? s.draws ?? 0}</span>
                    <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-red-300">D {s.totalLosses ?? s.losses ?? 0}</span>
                    {(() => {
                      const sg = s.totalGd ?? s.gd ?? 0;
                      const cls = sg > 0 ? "bg-emerald-500/15 text-emerald-300" : sg < 0 ? "bg-red-500/15 text-red-300" : "bg-zinc-500/15 text-zinc-300";
                      return <span className={`rounded px-1.5 py-0.5 ${cls}`}>SG {sg > 0 ? "+" : ""}{sg}</span>;
                    })()}
                    {s.brasileiraoPos != null && (
                      <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">Brasileirão {s.brasileiraoPos}º</span>
                    )}
                  </div>

                </div>
              </div>
            </li>
          );
        })}
      </ol>
      )}

      {openEntry && <SquadModal entry={openEntry} onClose={() => setOpenId(null)} />}
    </div>
  );
}

