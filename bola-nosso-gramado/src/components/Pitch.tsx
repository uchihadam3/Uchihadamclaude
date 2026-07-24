// Campo de futebol interativo. Mostra os 11 slots da formação nas posições
// certas (x,y) e desenha os jogadores já escolhidos no lugar deles. Slots
// vazios aparecem tracejados com o rótulo curto do papel (PD, VOL etc.).

import type { Player } from "@/lib/gameData";
import type { FormationId } from "@/lib/formations";
import { slotsForFormation, ROLE_SHORT, perfectFit, type SlotDef } from "@/lib/roles";

export interface PitchAssignment {
  slotId: string;
  player: Player;
  fromColor?: string;   // cor do clube original (badge)
  fromShort?: string;   // sigla do clube original
}

interface PitchProps {
  formation: FormationId;
  assignments: PitchAssignment[];
  highlightSlotIds?: string[]; // slots que devem "brilhar" (ex: escolher onde colocar)
  onSlotClick?: (slot: SlotDef, occupied: PitchAssignment | null) => void;
  small?: boolean;
}

export function Pitch({ formation, assignments, highlightSlotIds, onSlotClick, small }: PitchProps) {
  const slots = slotsForFormation(formation);
  const byId = new Map(assignments.map((a) => [a.slotId, a] as const));
  const hi = new Set(highlightSlotIds ?? []);
  const h = small ? 260 : 340;
  return (
    <div
      className="relative w-full overflow-visible rounded-2xl"
      style={{
        height: h,
        background:
          "linear-gradient(to top, #0b4a2b 0%, #157a3f 50%, #0b4a2b 100%)",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 10%, transparent 10% 20%)",
        border: "2px solid #000",
        boxShadow:
          "inset 0 0 0 3px rgba(250,204,21,0.85), 4px 4px 0 0 rgba(0,0,0,0.55)",
      }}
    >
      {/* Linhas do campo */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-white/70" />
      <div className="pointer-events-none absolute left-3 right-3 top-1/2 h-[2px] bg-white/70" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70"
      />
      <div className="pointer-events-none absolute bottom-3 left-1/2 h-14 w-2/3 -translate-x-1/2 border-2 border-b-0 border-white/70" />
      <div className="pointer-events-none absolute top-3 left-1/2 h-14 w-2/3 -translate-x-1/2 border-2 border-t-0 border-white/70" />

      {slots.map((slot) => {
        const a = byId.get(slot.id) ?? null;
        const highlighted = hi.has(slot.id);
        const bottomPct = slot.y;
        const leftPct = slot.x;
        const isPerfect = a ? perfectFit(a.player, slot) : false;
        const clickable = !!onSlotClick;
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSlotClick?.(slot, a)}
            disabled={!clickable}
            className={`absolute flex -translate-x-1/2 translate-y-1/2 flex-col items-center transition ${clickable ? "cursor-pointer hover:scale-105" : "cursor-default"}`}
            style={{ left: `${leftPct}%`, bottom: `${bottomPct}%` }}
          >
            {a ? (
              <div className={`flex flex-col items-center ${highlighted ? "animate-pulse" : ""}`}>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-black ${
                    highlighted
                      ? "bg-yellow-400 text-black"
                      : isPerfect
                        ? "bg-white text-emerald-900"
                        : "bg-white text-orange-900"
                  }`}
                  style={{
                    border: "2px solid #000",
                    boxShadow: "2px 2px 0 0 rgba(0,0,0,0.6)",
                    ...(a.fromColor ? { backgroundColor: a.fromColor, color: "#fff" } : {}),
                  }}
                  title={`${a.player.name} · ${ROLE_SHORT[slot.role]}`}
                >
                  {a.fromShort ?? initials(a.player.name)}
                </div>
                <div
                  className="mt-1 max-w-[74px] truncate rounded-md bg-black px-1.5 text-[9px] font-bold text-white"
                  style={{ border: "1.5px solid #000", boxShadow: "1.5px 1.5px 0 0 rgba(0,0,0,0.5)" }}
                >
                  {shortName(a.player.name)}
                </div>
                <div
                  className="mt-0.5 rounded-md bg-yellow-400 px-1.5 text-[8px] font-black text-black"
                  style={{ border: "1.5px solid #000", boxShadow: "1.5px 1.5px 0 0 rgba(0,0,0,0.5)" }}
                >
                  {ROLE_SHORT[slot.role]} · {a.player.overall}
                </div>
              </div>
            ) : (
              <div className={`flex flex-col items-center ${highlighted ? "animate-pulse" : ""}`}>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed text-[10px] font-black ${
                    highlighted ? "border-yellow-300 bg-yellow-400/50 text-yellow-50" : "border-white/80 bg-black/30 text-white"
                  }`}
                  style={{ boxShadow: "2px 2px 0 0 rgba(0,0,0,0.5)" }}
                >
                  {ROLE_SHORT[slot.role]}
                </div>
                <div
                  className="mt-1 rounded-md bg-black/70 px-1.5 text-[8px] font-bold text-white/90"
                  style={{ border: "1.5px solid #000" }}
                >
                  vazio
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function shortName(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return name;
  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
}
