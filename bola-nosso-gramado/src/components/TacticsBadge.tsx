// Painel gamificado mostrando a formação (ex: 4-3-3) e o estilo de jogo
// (ofensivo / equilibrado / defensivo) que o jogador usou naquele save.
// Usado nos modais de ranking pra dar mais contexto sobre a campanha.

import { getFormation, TACTICS, type FormationId, type TacticStyle } from "@/lib/formations";

const STYLE_META: Record<TacticStyle, { grad: string; ring: string; text: string; label: string; icon: string }> = {
  ofensivo:        { grad: "from-red-500/25 to-orange-500/10",    ring: "ring-red-400/40",     text: "text-red-200",     label: "Ofensivo",       icon: "⚔️" },
  equilibrado:     { grad: "from-emerald-500/20 to-sky-500/10",   ring: "ring-emerald-400/40", text: "text-emerald-200", label: "Equilibrado",    icon: "⚖️" },
  defensivo:       { grad: "from-blue-500/25 to-indigo-500/10",   ring: "ring-blue-400/40",    text: "text-blue-200",    label: "Defensivo",      icon: "🛡️" },
  "contra-ataque": { grad: "from-amber-500/25 to-red-500/10",     ring: "ring-amber-400/40",   text: "text-amber-200",   label: "Contra-ataque",  icon: "🏃" },
  posse:           { grad: "from-purple-500/25 to-fuchsia-500/10",ring: "ring-purple-400/40",  text: "text-purple-200",  label: "Posse de bola",  icon: "🎯" },
  "pressao-alta":  { grad: "from-orange-500/25 to-red-500/10",    ring: "ring-orange-400/40",  text: "text-orange-200",  label: "Pressão alta",   icon: "🔥" },
  retranca:        { grad: "from-slate-500/25 to-zinc-500/10",    ring: "ring-slate-400/40",   text: "text-slate-200",   label: "Retranca",       icon: "🧱" },
  cadenciado:      { grad: "from-teal-500/20 to-cyan-500/10",     ring: "ring-teal-400/40",    text: "text-teal-200",    label: "Cadenciado",     icon: "🐢" },
  "bolas-paradas": { grad: "from-lime-500/25 to-green-500/10",    ring: "ring-lime-400/40",    text: "text-lime-200",    label: "Bolas paradas",  icon: "⛳" },
};

export function TacticsBadge({ formation, tactic }: { formation?: FormationId; tactic?: TacticStyle }) {
  if (!formation && !tactic) return null;
  const f = formation ? getFormation(formation) : null;
  const styleMeta = tactic ? STYLE_META[tactic] : null;
  const tacticDesc = tactic ? TACTICS.find((t) => t.id === tactic)?.desc : null;

  return (
    <div className="mb-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
      <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Tática usada</div>
      <div className="grid grid-cols-2 gap-2">
        {f && (
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-600/10 p-3 ring-1 ring-yellow-400/40">
            <div className="text-[9px] uppercase tracking-widest text-yellow-200/80">Formação</div>
            <div className="mt-0.5 font-display text-2xl text-yellow-100">{f.label}</div>
            <div className="mt-1 flex flex-wrap gap-1 text-[9px]">
              <span className="rounded bg-orange-500/25 px-1.5 py-0.5 text-orange-200">GOL {f.caps.GOL}</span>
              <span className="rounded bg-blue-500/25 px-1.5 py-0.5 text-blue-200">ZAG {f.caps.ZAG}</span>
              <span className="rounded bg-emerald-500/25 px-1.5 py-0.5 text-emerald-200">MEI {f.caps.MEI}</span>
              <span className="rounded bg-red-500/25 px-1.5 py-0.5 text-red-200">ATA {f.caps.ATA}</span>
            </div>
          </div>
        )}
        {styleMeta && (
          <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${styleMeta.grad} p-3 ring-1 ${styleMeta.ring}`}>
            <div className={`text-[9px] uppercase tracking-widest ${styleMeta.text}/80`}>Estilo</div>
            <div className={`mt-0.5 flex items-center gap-1.5 font-display text-xl ${styleMeta.text}`}>
              <span className="text-2xl leading-none">{styleMeta.icon}</span>
              <span>{styleMeta.label}</span>
            </div>
            {tacticDesc && <div className="mt-1 text-[10px] text-white/70 leading-snug">{tacticDesc}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
