import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { BADGES, MAX_BADGES, MAX_OVR_BONUS, OVR_BONUS_PER_BADGE } from "@/lib/badges";
import { TACTICS, type TacticStyle } from "@/lib/formations";
import { fetchMyBadges, refreshMyBadgeBonus, type UserBadgeRow } from "@/lib/saves";
import { Badge } from "@/components/Badge";
import { BadgeModal } from "@/components/BadgeModal";
import type { BadgeDef } from "@/lib/badges";

export const Route = createFileRoute("/badges")({
  head: () => ({
    meta: [
      { title: "Medalhas — Lendas do Brasileirão" },
      { name: "description", content: "27 medalhas por vencer o Mundial com pares específicos de estilo tático e formação. Cada medalha dá +0,1 OVR permanente ao seu time." },
      { property: "og:title", content: "Medalhas — Lendas do Brasileirão" },
      { property: "og:description", content: "Conquiste as 27 medalhas do Mundial e ganhe até +2,7 OVR fixo." },
    ],
  }),
  component: MyBadgesPage,
});

function MyBadgesPage() {
  const navigate = useNavigate();
  const { session, loading, userId } = useSession();
  const [rows, setRows] = useState<UserBadgeRow[]>([]);
  const [busy, setBusy] = useState(true);
  const [openBadge, setOpenBadge] = useState<BadgeDef | null>(null);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!userId) return;
    setBusy(true);
    fetchMyBadges(userId)
      .then((r) => { setRows(r); refreshMyBadgeBonus(userId); })
      .catch(() => setRows([]))
      .finally(() => setBusy(false));
  }, [userId]);

  const unlocked = new Set(rows.map((r) => r.badge_key));

  // Agrupado por ESTILO — cada estilo mostra suas 3 medalhas em ordem
  // determinística (alfabética por formação) pra não revelar tier.
  const byStyle = useMemo(() => {
    const map = new Map<TacticStyle, typeof BADGES>();
    for (const b of BADGES) {
      const arr = map.get(b.style) ?? [];
      arr.push(b);
      map.set(b.style, arr);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.formation.localeCompare(b.formation));
    }
    return map;
  }, []);

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 pb-24">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Coleção</div>
          <div className="cartoon-title text-3xl">Medalhas do Mundial</div>
        </div>
        <Link to="/" className="sticker-btn shrink-0">← Voltar</Link>
      </header>

      <div className="sticker-card mb-4 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <div className="cartoon-title text-2xl">{rows.length} / {MAX_BADGES}</div>
          <div className="ribbon-tag text-sm">
            +{(rows.length * OVR_BONUS_PER_BADGE).toFixed(1)} OVR
          </div>
        </div>
        <div className="mt-2 text-xs text-yellow-100/85">
          Cada medalha vale +{OVR_BONUS_PER_BADGE.toFixed(1)} OVR permanente pro seu time. Coleção completa = +{MAX_OVR_BONUS.toFixed(1)} OVR fixo, em qualquer save.
        </div>
      </div>

      <div className="sticker-card mb-4 p-3 text-xs text-muted-foreground">
        Vença o <b className="text-yellow-200">Mundial</b> usando exatamente o par <b>estilo + formação</b> de cada medalha. São <b>27 medalhas</b> — 3 formações por estilo tático. Testar diferentes combinações e descobrir o que rende faz parte do desafio.
      </div>


      {busy ? (
        <div className="mt-6 text-center text-muted-foreground">Carregando medalhas…</div>
      ) : (
        <div className="space-y-5">
          {Array.from(byStyle.entries()).map(([style, list]) => {
            const label = TACTICS.find((t) => t.id === style)?.label ?? style;
            return (
              <section key={style}>
                <h2 className="mb-2 cartoon-title text-lg">{label}</h2>
                <div className="grid grid-cols-3 gap-2">
                  {list.map((b) => {
                    const on = unlocked.has(b.key);
                    const row = rows.find((r) => r.badge_key === b.key);
                    return (
                      <button
                        type="button"
                        key={b.key}
                        onClick={() => setOpenBadge(b)}
                        className={`sticker-card p-3 text-left transition-transform hover:scale-[1.03] active:scale-[0.98] ${on ? "" : "opacity-70"}`}
                      >
                        <div className="flex justify-center">
                          <Badge badge={b} size={92} unlocked={on} />
                        </div>
                        <div className={`mt-2 text-center font-display text-sm tracking-wider ${on ? "text-yellow-100" : "text-muted-foreground"}`}>{b.name}</div>
                        <div className="mt-1 text-center text-[10px] text-muted-foreground leading-tight">{b.description}</div>
                        {on && row?.team_name && (
                          <div className="mt-2 rounded-md border-2 border-black bg-black/40 p-1.5 text-center text-[10px]">
                            <span className="text-yellow-200">🏆</span> {row.team_name} · T{row.season ?? "?"}
                          </div>
                        )}
                      </button>
                    );
                  })}

                </div>
              </section>
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
