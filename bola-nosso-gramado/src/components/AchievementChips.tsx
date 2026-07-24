import type { Achievement, AchievementTone } from "@/lib/ranking";

const TONE: Record<AchievementTone, string> = {
  gold: "border-yellow-400/60 bg-yellow-400/15 text-yellow-200",
  silver: "border-zinc-300/50 bg-zinc-300/10 text-zinc-100",
  bronze: "border-amber-700/60 bg-amber-700/15 text-amber-200",
  red: "border-red-500/50 bg-red-500/15 text-red-200",
  blue: "border-sky-400/50 bg-sky-500/15 text-sky-200",
  muted: "border-border bg-secondary/50 text-muted-foreground",
};

export function AchievementChips({
  items,
  size = "sm",
  layout = "wrap",
}: {
  items: Achievement[];
  size?: "xs" | "sm" | "md";
  layout?: "wrap" | "stack";
}) {
  const pad = size === "xs" ? "px-1.5 py-0.5 text-[10px]" : size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]";
  const gap = size === "xs" ? "gap-1" : "gap-1.5";
  return (
    <div className={`flex ${layout === "stack" ? "flex-col items-start" : "flex-wrap"} ${gap}`}>
      {items.map((a, i) => (
        <span
          key={`${a.key}-${i}`}
          className={`inline-flex items-center gap-1 rounded-full border font-semibold ${pad} ${TONE[a.tone]}`}
          title={`${a.comp}: ${a.label}`}
        >
          <span>{a.icon}</span>
          <span className="truncate">
            <span className="opacity-80">{a.comp}:</span> {a.label}
          </span>
        </span>
      ))}
    </div>
  );
}
