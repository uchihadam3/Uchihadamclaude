// Indicador gamificado do status do save:
// - Pontinho verde pulsante quando o save foi atualizado há < 3 min (jogando agora)
// - Pontinho âmbar suave se foi atualizado há < 30 min (recente)
// - Pontinho cinza caso contrário (offline)

import { useEffect, useState } from "react";

function useNow(intervalMs = 30_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export type LiveStatus = "live" | "recent" | "idle";

export function getLiveStatus(updatedAt: string | undefined | null, now: number): LiveStatus {
  if (!updatedAt) return "idle";
  const t = Date.parse(updatedAt);
  if (!Number.isFinite(t)) return "idle";
  const diff = now - t;
  if (diff < 3 * 60_000) return "live";
  if (diff < 30 * 60_000) return "recent";
  return "idle";
}

export function LiveDot({
  updatedAt,
  size = "sm",
  showLabel = false,
}: {
  updatedAt?: string | null;
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
}) {
  const now = useNow();
  const status = getLiveStatus(updatedAt, now);
  const dim = size === "xs" ? "h-1.5 w-1.5" : size === "md" ? "h-3 w-3" : "h-2 w-2";
  const ringDim = size === "xs" ? "h-3 w-3" : size === "md" ? "h-5 w-5" : "h-4 w-4";

  const color =
    status === "live"
      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
      : status === "recent"
        ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
        : "bg-zinc-500/70";
  const ring = status === "live" ? "bg-emerald-400/50" : status === "recent" ? "bg-amber-400/40" : "bg-transparent";
  const label =
    status === "live" ? "jogando agora" : status === "recent" ? "ativo há pouco" : "offline";
  const labelClass =
    status === "live"
      ? "text-emerald-300"
      : status === "recent"
        ? "text-amber-300"
        : "text-muted-foreground";

  return (
    <span
      className="inline-flex items-center gap-1"
      title={`Status: ${label}`}
      aria-label={`Status: ${label}`}
    >
      <span className={`relative inline-flex ${ringDim} items-center justify-center`}>
        {status === "live" && (
          <span className={`absolute inline-flex h-full w-full rounded-full ${ring} animate-ping`} />
        )}
        <span className={`relative inline-flex rounded-full ${dim} ${color}`} />
      </span>
      {showLabel && <span className={`text-[10px] font-semibold uppercase tracking-wider ${labelClass}`}>{label}</span>}
    </span>
  );
}

const FMT = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
export function formatCreatedAt(iso: string | undefined | null): string | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return FMT.format(new Date(t));
}
