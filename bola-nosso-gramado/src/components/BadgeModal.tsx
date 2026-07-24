import { useEffect } from "react";
import { Badge } from "@/components/Badge";
import type { BadgeDef } from "@/lib/badges";
import { getFormation, TACTICS } from "@/lib/formations";
import type { UserBadgeRow } from "@/lib/saves";

interface Props {
  badge: BadgeDef;
  unlocked: boolean;
  row?: UserBadgeRow;
  onClose: () => void;
}

export function BadgeModal({ badge, unlocked, row, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const styleLabel = TACTICS.find((t) => t.id === badge.style)?.label ?? badge.style;
  const formationLabel = getFormation(badge.formation).label;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="sticker-card relative w-full max-w-sm p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full border-2 border-black bg-yellow-300 text-black shadow-md hover:bg-yellow-200"
        >
          ✕
        </button>

        <div className="flex justify-center">
          <Badge badge={badge} size={260} unlocked={unlocked} />
        </div>

        <div className={`mt-4 font-display text-2xl tracking-wider ${unlocked ? "text-yellow-100" : "text-muted-foreground"}`}>
          {badge.name}
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="ribbon-tag text-xs">{styleLabel}</span>
          <span className="ribbon-tag text-xs">{formationLabel}</span>
        </div>

        <div className="mt-3 text-sm text-yellow-100/90 leading-snug">
          {badge.description}
        </div>

        {unlocked && row?.team_name && (
          <div className="mt-4 rounded-lg border-2 border-black bg-black/40 p-2 text-xs">
            <span className="text-yellow-200">🏆 Conquistada</span> com <b>{row.team_name}</b>
            {row.season ? <> na temporada <b>{row.season}</b></> : null}
          </div>
        )}

        {!unlocked && (
          <div className="mt-4 rounded-lg border-2 border-black bg-black/30 p-2 text-xs text-muted-foreground">
            🔒 Ainda bloqueada
          </div>
        )}
      </div>
    </div>
  );
}
