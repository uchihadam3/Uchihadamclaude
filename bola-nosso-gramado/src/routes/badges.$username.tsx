import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BADGES, MAX_BADGES, OVR_BONUS_PER_BADGE, type BadgeDef } from "@/lib/badges";
import { fetchUserBadgesByUsername, type UserBadgeRow } from "@/lib/saves";
import { Badge } from "@/components/Badge";
import { BadgeModal } from "@/components/BadgeModal";

export const Route = createFileRoute("/badges/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `Medalhas de ${params.username} — Lendas do Brasileirão` },
      { name: "description", content: `Veja as medalhas do Mundial conquistadas por ${params.username}.` },
      { property: "og:title", content: `Medalhas de ${params.username}` },
      { property: "og:description", content: `Coleção de medalhas do Mundial de ${params.username}.` },
    ],
  }),
  component: PublicBadgesPage,
});

function PublicBadgesPage() {
  const { username } = Route.useParams();
  const [rows, setRows] = useState<UserBadgeRow[]>([]);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [openBadge, setOpenBadge] = useState<BadgeDef | null>(null);

  useEffect(() => {
    setBusy(true);
    fetchUserBadgesByUsername(username)
      .then(setRows)
      .catch((e) => setErr(e instanceof Error ? e.message : String(e)))
      .finally(() => setBusy(false));
  }, [username]);

  const unlocked = new Set(rows.map((r) => r.badge_key));

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 pb-24">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">👤 Perfil</div>
          <div className="font-display text-3xl gold-text">Medalhas de {username}</div>
        </div>
        <Link to="/ranking" className="rounded-full border border-border px-3 py-1 text-xs hover:bg-secondary">← Ranking</Link>
      </header>

      <div className="mb-4 rounded-xl border border-yellow-400/40 bg-gradient-to-br from-yellow-500/15 to-amber-600/10 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <div className="font-display text-2xl text-yellow-100">{rows.length} / {MAX_BADGES}</div>
          <div className="rounded-md bg-yellow-500/25 px-2 py-0.5 font-display text-yellow-200">
            +{(rows.length * OVR_BONUS_PER_BADGE).toFixed(1)} OVR
          </div>
        </div>
      </div>

      {busy && <div className="mt-6 text-center text-muted-foreground">Carregando…</div>}
      {err && <div className="mt-6 rounded-lg bg-red-500/15 p-3 text-sm text-red-300">{err}</div>}

      {!busy && !err && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {BADGES.map((b) => {
            const on = unlocked.has(b.key);
            const row = rows.find((r) => r.badge_key === b.key);
            return (
              <button
                type="button"
                key={b.key}
                onClick={() => setOpenBadge(b)}
                className={`rounded-xl border p-2 text-left transition-transform hover:scale-[1.03] active:scale-[0.98] ${on ? "border-yellow-400/50 bg-yellow-400/5" : "border-border bg-card opacity-70"}`}
              >
                <div className="flex justify-center">
                  <Badge badge={b} size={84} unlocked={on} />
                </div>
                <div className={`mt-1 text-center text-[10px] font-semibold ${on ? "" : "text-muted-foreground"}`}>{b.name}</div>
                {on && row?.team_name && (
                  <div className="mt-1 text-center text-[9px] text-muted-foreground">🏆 {row.team_name}</div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {openBadge && (
        <BadgeModal
          badge={openBadge}
          unlocked={unlocked.has(openBadge.key)}
          row={rows.find((r) => r.badge_key === openBadge.key)}
          onClose={() => setOpenBadge(null)}
        />
      )}
    </div>
  );
}
