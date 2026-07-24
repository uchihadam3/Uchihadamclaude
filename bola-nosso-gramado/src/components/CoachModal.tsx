import { useEffect, useMemo, useState } from "react";
import {
  COACH_NODES,
  COACH_NODES_TIER2,
  ALL_COACH_NODES,
  COACH_TREES,
  computeCoachState,
  canUnlock,
  unlockNode,
  hydrateCoachProgressFromCloud,
  
  levelFor,
  TOTAL_XP_TO_COMPLETE,
  TOTAL_XP_TIER1,
  TOTAL_XP_TIER2,
  isTier1Complete,
  getCoachEffects,
  setActiveCoachEffects,
  computeMaxImpact,
  computeIdoloOvrBump,
  computeTotalTitles,
  type CoachNode,
  type CoachState,
  type CoachTree,
} from "@/lib/coach";

import type { SaveSlot } from "@/lib/saves";
import { sfx } from "@/lib/sfx";

interface Props {
  userId: string;
  username: string | null;
  saves: SaveSlot[];
  onClose: () => void;
}

export function CoachModal({ userId, username, saves, onClose }: Props) {
  const [state, setState] = useState<CoachState>(() => computeCoachState(userId, saves));
  const [selected, setSelected] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [tab, setTab] = useState<"tree" | "history">("tree");

  const handleSelect = (id: string) => {
    setSelected(id);
    try { sfx.click?.(); } catch { /* noop */ }
  };

  useEffect(() => {
    setState(computeCoachState(userId, saves));
  }, [userId, saves]);

  // Puxa progresso do backend na abertura (garante que nada se perde
  // se o usuário limpar o cache ou trocar de dispositivo).
  useEffect(() => {
    let cancelled = false;
    void hydrateCoachProgressFromCloud(userId).then(() => {
      if (!cancelled) setState(computeCoachState(userId, saves));
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Planta os efeitos ativos para o resto do jogo lerem.
  useEffect(() => {
    const eff = getCoachEffects(state);
    eff.idoloOvrBump = computeIdoloOvrBump(saves, eff.idoloCap);
    setActiveCoachEffects(eff);
  }, [state, saves]);

  const [showImpact, setShowImpact] = useState(false);
  const impactT1 = useMemo(() => computeMaxImpact(1), []);
  const impact = useMemo(() => computeMaxImpact("all"), []);
  const d = (a: number, b: number) => Math.max(0, a - b);

  const lv = levelFor(state.xp);
  const percent = Math.min(100, Math.round((state.spent / TOTAL_XP_TO_COMPLETE) * 100));

  const nodesByTree = useMemo(() => {
    const map = new Map<CoachTree, CoachNode[]>();
    for (const t of COACH_TREES) map.set(t.id, []);
    for (const n of ALL_COACH_NODES) map.get(n.tree)!.push(n);
    for (const list of map.values()) list.sort((a, b) => a.order - b.order);
    return map;
  }, []);

  const tier1Done = useMemo(() => isTier1Complete(state.unlocked), [state.unlocked]);
  const tier1Spent = COACH_NODES.reduce((s, n) => s + (state.unlocked.has(n.id) ? n.cost : 0), 0);
  const tier2Spent = COACH_NODES_TIER2.reduce((s, n) => s + (state.unlocked.has(n.id) ? n.cost : 0), 0);
  const tier1Pct = Math.min(100, Math.round((tier1Spent / TOTAL_XP_TIER1) * 100));
  const tier2Pct = Math.min(100, Math.round((tier2Spent / TOTAL_XP_TIER2) * 100));

  const selNode = selected ? ALL_COACH_NODES.find((n) => n.id === selected) ?? null : null;
  const selReason = selNode ? canUnlock(state, selNode) : null;

  const totalTitles = useMemo(() => computeTotalTitles(saves), [saves]);
  const idoloUnlocked = state.unlocked.has("legado.idolo");
  const dnaUnlocked = state.unlocked.has("t2.legado.dna");
  const idoloCap = dnaUnlocked ? 2.0 : idoloUnlocked ? 1.0 : 0;
  const idoloBump = Math.min(idoloCap, Math.floor(totalTitles / 10) * 0.10);
  const titlesToNextStep = idoloCap > 0 && idoloBump < idoloCap ? (10 - (totalTitles % 10)) : 0;
  const idoloInfo = { totalTitles, idoloCap, idoloBump, titlesToNextStep, idoloUnlocked, dnaUnlocked };


  const handleUnlock = (n: CoachNode) => {
    const reason = canUnlock(state, n);
    if (reason) return;
    unlockNode(userId, n.id);
    setState(computeCoachState(userId, saves));
    setFlash(n.id);
    try { sfx.win(); } catch { /* noop */ }
    if (navigator.vibrate) navigator.vibrate([20, 30, 40]);
    setTimeout(() => setFlash(null), 900);
  };


  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4"
         onClick={onClose}>
      <div
        className="relative flex w-full max-w-5xl max-h-[95vh] flex-col overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-[#1a1108] via-[#0d0805] to-[#0a0a12] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(230,180,80,0.14), transparent 55%), radial-gradient(ellipse at bottom right, rgba(120,80,255,0.10), transparent 60%)",
        }}
      >
        {/* HEADER — cartão do técnico */}
        <div className="relative shrink-0 border-b border-yellow-500/20 p-4 sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-700 font-display text-2xl sm:text-3xl text-black shadow-lg ring-2 ring-yellow-300/50">
              {(username ?? "T").slice(0, 1).toUpperCase()}
              <div className="absolute -bottom-1 -right-1 rounded-full bg-black px-1.5 py-0.5 text-[10px] font-bold text-yellow-300 ring-1 ring-yellow-400/40">
                Nv {lv.level}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-display text-lg sm:text-xl text-yellow-100">
                {username ?? "Técnico"} <span className="text-yellow-400/70">· {lv.title}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <div className="font-display text-sm text-yellow-200">
                  {state.available} <span className="text-yellow-400/70">XP disp.</span>
                </div>
                <div className="text-xs text-yellow-100/50">
                  · {state.xp}/{TOTAL_XP_TO_COMPLETE} XP · {percent}% da árvore
                </div>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/60 ring-1 ring-yellow-500/20">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              {state.xpMultiplier > 1 && (
                <div className="mt-1 text-[11px] text-emerald-300">
                  🎖️ Bônus de XP herdado · +{Math.round((state.xpMultiplier - 1) * 100)}%
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-yellow-500/30 bg-black/40 px-3 py-1 text-sm text-yellow-100 hover:bg-yellow-500/20"
            >✕</button>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setTab("tree")}
              className={`rounded-full px-3 py-1 text-xs font-display transition ${
                tab === "tree" ? "bg-yellow-400 text-black" : "border border-yellow-500/30 text-yellow-100 hover:bg-yellow-500/10"
              }`}
            >🌳 Árvore</button>
            <button
              onClick={() => setTab("history")}
              className={`rounded-full px-3 py-1 text-xs font-display transition ${
                tab === "history" ? "bg-yellow-400 text-black" : "border border-yellow-500/30 text-yellow-100 hover:bg-yellow-500/10"
              }`}
            >📜 Histórico</button>
            <button
              onClick={() => setShowImpact((v) => !v)}
              className={`rounded-full px-3 py-1 text-xs font-display transition ${
                showImpact ? "bg-emerald-400 text-black" : "border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/10"
              }`}
            >📊 Impacto 100%</button>
          </div>

        </div>


        {/* CORPO */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {showImpact && (
            <div className="mb-4 space-y-3 text-xs">
              {/* ÁRVORE 1 */}
              <div className="rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-3 text-yellow-100">
                <div className="mb-2 font-display text-sm text-yellow-200">🌱 Árvore 1 · Técnico (100%)</div>
                <ul className="space-y-1">
                  <li>• <b>+{impactT1.ovrBump.toFixed(2)} OVR</b> médio no XI (constante)</li>
                  <li>• ~<b>+{(impactT1.lambdaBonus * 38).toFixed(0)} gols a mais por temporada</b> (finalização treinada)</li>
                  <li>• <b>~+{impactT1.goalsPerMatchEstimate.toFixed(2)} gols/jogo</b> a mais em média</li>
                  <li>• <b>+{impactT1.vsWeakerAtk.toFixed(2)} ATA</b> extra vs times OVR 5+ abaixo</li>
                  <li>• <b>-{impactT1.antiUpsetPct.toFixed(0)}%</b> chance de gol de zebra sofrido</li>
                  <li>• <b>+{impactT1.finalOvrBump.toFixed(2)} OVR</b> em finais de torneio</li>
                  <li>• <b>+{impactT1.cupStarBump.toFixed(1)} OVR</b> no craque top em mata-mata de Copa</li>
                  <li>• <b>+{impactT1.penaltyPct.toFixed(1)}%</b> conversão em pênaltis</li>
                  <li>• <b>+{impactT1.extraSkips} skip</b> por campanha no draft</li>
                  <li>• Cap do Ídolo eterno: <b>+{impactT1.idoloCap.toFixed(2)} OVR</b></li>
                </ul>
              </div>

              {/* ÁRVORE 2 (adicional) */}
              <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-3 text-purple-100">
                <div className="mb-2 font-display text-sm text-purple-200">🎓 Árvore 2 · Mestre Estrategista (100% adicional)</div>
                <ul className="space-y-1">
                  <li>• <b>+{d(impact.ovrBump, impactT1.ovrBump).toFixed(2)} OVR</b> adicional no XI (inclui cap ampliado do Ídolo)</li>
                  <li>• ~<b>+{(d(impact.lambdaBonus, impactT1.lambdaBonus) * 38).toFixed(0)} gols/temporada</b> adicionais em finalização</li>
                  <li>• ~<b>+{(impact.chemistryLambda * 38).toFixed(0)} gols/temporada</b> emendando 3+ vitórias seguidas (Embalo vencedor)</li>
                  <li>• ~<b>+{(impact.losingComebackLambda * 38).toFixed(0)} gols/temporada</b> quando está perdendo por 2+ (viradas)</li>
                  <li>• <b>+{d(impact.vsWeakerAtk, impactT1.vsWeakerAtk).toFixed(2)} ATA</b> adicional vs times mais fracos</li>
                  <li>• <b>-{(impact.antiUpsetPct - impactT1.antiUpsetPct).toFixed(0)}%</b> anti-zebra adicional</li>
                  <li>• <b>+{d(impact.finalOvrBump, impactT1.finalOvrBump).toFixed(2)} OVR</b> adicional em finais</li>
                  <li>• <b>+{d(impact.cupStarBump, impactT1.cupStarBump).toFixed(1)} OVR</b> adicional no craque em mata-mata</li>
                  <li>• <b>+{d(impact.penaltyPct, impactT1.penaltyPct).toFixed(1)}%</b> pênaltis adicional</li>
                  <li>• <b>+{d(impact.extraSkips, impactT1.extraSkips)} skip</b> adicional no draft</li>
                  <li>• Bônus pós-derrota passa a durar <b>{impact.videoAnalysisMatches} jogos</b></li>
                  <li>• Cap do Ídolo eterno sobe para <b>+{impact.idoloCap.toFixed(2)} OVR</b></li>
                </ul>
              </div>

              {/* TOTAL COMBINADO */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-emerald-100">
                <div className="mb-2 font-display text-sm text-emerald-200">✨ Total combinado (Árvore 1 + 2)</div>
                <ul className="space-y-1">
                  <li>• <b>+{impact.ovrBump.toFixed(2)} OVR</b> médio · <b>~+{(impact.lambdaBonus * 38).toFixed(0)} gols/temporada</b> · <b>~+{impact.goalsPerMatchEstimate.toFixed(2)} gols/jogo</b></li>
                  <li>• <b>-{impact.antiUpsetPct.toFixed(0)}%</b> zebra · <b>+{impact.finalOvrBump.toFixed(2)} OVR</b> finais · <b>+{impact.vsWeakerAtk.toFixed(2)} ATA</b> vs fracos</li>
                </ul>

                <div className="mt-3 border-t border-emerald-500/20 pt-2">
                  <div className="mb-1 font-display text-[11px] text-emerald-200">Impacto por base de time:</div>
                  <table className="w-full text-[11px]">
                    <thead className="text-emerald-300/70">
                      <tr><th className="text-left font-normal">Time base</th><th className="text-right font-normal">Efetivo</th><th className="text-right font-normal">Vs adv 5 OVR abaixo</th></tr>
                    </thead>
                    <tbody className="font-mono">
                      <tr><td>OVR 75</td><td className="text-right">{(75 + impact.ovrBump).toFixed(2)}</td><td className="text-right">gap ~{(5 + impact.ovrBump + impact.vsWeakerAtk).toFixed(2)}</td></tr>
                      <tr><td>OVR 85</td><td className="text-right">{(85 + impact.ovrBump).toFixed(2)}</td><td className="text-right">gap ~{(5 + impact.ovrBump + impact.vsWeakerAtk).toFixed(2)}</td></tr>
                      <tr><td className="text-emerald-200">OVR 95</td><td className="text-right text-emerald-200">{(95 + impact.ovrBump).toFixed(2)}</td><td className="text-right text-emerald-200">gap ~{(5 + impact.ovrBump + impact.vsWeakerAtk).toFixed(2)}</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-2 text-[10px] text-emerald-300/70">
                    O ganho absoluto é o mesmo pra todo mundo — em times fortes cada décimo vira mais gols (a diferença de força cresce rápido).
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "tree" && (
            <div className="space-y-4">
              {/* Banner de tier-2 */}
                <div
                  className={`rounded-2xl border p-3 text-xs ${
                    tier1Done
                      ? "border-purple-400/50 bg-gradient-to-r from-purple-900/40 via-fuchsia-900/30 to-purple-900/40 text-purple-100"
                      : "border-white/10 bg-black/30 text-white/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-lg">{tier1Done ? "🎓" : "🔒"}</div>
                    <div className="flex-1">
                      <div className="font-display text-sm">
                        Árvore II · Mestre Estrategista
                        {tier1Done ? (
                          <span className="ml-2 rounded-full bg-purple-400/30 px-2 py-0.5 text-[10px] text-purple-100">DESBLOQUEADA</span>
                        ) : (
                          <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">Complete a Árvore I</span>
                        )}
                      </div>
                      <div className="text-[11px] opacity-70">
                        Tier I: {tier1Pct}% · Tier II: {tier2Pct}% · Nós II ficam ao lado dos nós I em cada tronco.
                      </div>
                    </div>
                  </div>
                </div>

                {COACH_TREES.map((tree) => {
                  const nodes = nodesByTree.get(tree.id) ?? [];
                  const unlockedCount = nodes.filter((n) => state.unlocked.has(n.id)).length;

                  return (
                    <div
                      key={tree.id}
                      className="rounded-2xl border p-3 sm:p-4 backdrop-blur"
                      style={{
                        borderColor: `${tree.color}55`,
                        background: `linear-gradient(135deg, ${tree.color}10, transparent 60%), rgba(0,0,0,0.35)`,
                      }}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-xl"
                          style={{ background: `${tree.color}20`, boxShadow: `0 0 12px ${tree.color}55 inset` }}
                        >{tree.icon}</div>
                        <div className="flex-1">
                          <div className="font-display text-sm" style={{ color: tree.color }}>
                            {tree.label.toUpperCase()}
                          </div>
                          <div className="text-[11px] text-white/50">{tree.blurb}</div>
                        </div>
                        <div className="text-xs font-display" style={{ color: tree.color }}>
                          {unlockedCount}/{nodes.length}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {nodes.map((n, i) => {
                          const unlocked = state.unlocked.has(n.id);
                          const reason = canUnlock(state, n);
                          const canBuy = !unlocked && !reason;
                          const isFlashing = flash === n.id;
                          const isSel = selected === n.id;
                          const prev = nodes[i - 1];
                          const tierBreak = i > 0 && prev?.tier === 1 && n.tier === 2;
                          return (
                            <div key={n.id} className="flex items-center">
                              {tierBreak && (
                                <div className="mx-1 flex items-center gap-1 text-[9px] font-display text-purple-300/70">
                                  <div className="h-0.5 w-2 rounded-full bg-purple-400/50" />
                                  II
                                  <div className="h-0.5 w-2 rounded-full bg-purple-400/50" />
                                </div>
                              )}
                              {i > 0 && !tierBreak && (
                                <div
                                  className="h-0.5 w-3 sm:w-6 rounded-full transition"
                                  style={{
                                    background: unlocked ? tree.color : `${tree.color}20`,
                                    boxShadow: unlocked ? `0 0 6px ${tree.color}` : "none",
                                  }}
                                />
                              )}
                              <button
                                onClick={() => handleSelect(n.id)}
                                className={`relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl text-lg sm:text-xl transition ${
                                  isSel ? "scale-110" : "hover:scale-105"
                                } ${isFlashing ? "animate-ping-once" : ""}`}
                                style={{
                                  background: unlocked
                                    ? `radial-gradient(circle at 30% 20%, ${tree.color}, ${tree.color}80 60%, ${tree.color}40)`
                                    : canBuy
                                    ? `${tree.color}25`
                                    : "rgba(0,0,0,0.5)",
                                  border: `2px solid ${unlocked ? tree.color : canBuy ? `${tree.color}80` : `${tree.color}25`}`,
                                  boxShadow: unlocked
                                    ? `0 0 14px ${tree.color}80, inset 0 0 8px ${tree.color}60`
                                    : canBuy
                                    ? `0 0 10px ${tree.color}50`
                                    : "none",
                                  color: unlocked ? "#000" : canBuy ? tree.color : `${tree.color}60`,
                                  filter: !unlocked && !canBuy ? "grayscale(0.5) opacity(0.55)" : undefined,
                                }}
                                title={n.name}
                              >
                                {unlocked ? n.icon : canBuy ? n.icon : "🔒"}
                                {n.tier === 2 && (
                                  <span className="pointer-events-none absolute -top-1 -right-1 rounded-full bg-purple-500 px-1 text-[8px] font-bold text-white ring-1 ring-purple-200/70">II</span>
                                )}
                                {canBuy && (
                                  <span
                                    className="pointer-events-none absolute inset-0 rounded-xl animate-pulse"
                                    style={{ boxShadow: `0 0 12px ${tree.color}` }}
                                  />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}



            </div>
          )}

          {tab === "history" && (
            <HistoryTab state={state} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes ping-once {
          0% { box-shadow: 0 0 0 0 rgba(255, 210, 100, 0.7); }
          100% { box-shadow: 0 0 0 24px rgba(255, 210, 100, 0); }
        }
        .animate-ping-once {
          animation: ping-once 0.8s ease-out;
        }
      `}</style>
    </div>

    {/* POPUP DE DETALHES DO NÓ */}
    {selNode && (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 sm:p-4"
        onClick={() => setSelected(null)}
      >
        <div
          className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-lg text-white/90 backdrop-blur hover:bg-white/10"
            aria-label="Fechar"
          >✕</button>
          <NodePanel
            node={selNode}
            treeColor={COACH_TREES.find((t) => t.id === selNode.tree)!.color}
            unlocked={state.unlocked.has(selNode.id)}
            reason={selReason}
            availableXp={state.available}
            onBuy={() => { handleUnlock(selNode); setSelected(null); }}
            idoloInfo={(selNode.id === "legado.idolo" || selNode.id === "t2.legado.dna") ? idoloInfo : undefined}
          />

          <button
            onClick={() => setSelected(null)}
            className="mt-3 w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-sm font-display text-white/80 hover:bg-white/10"
          >
            Fechar
          </button>
        </div>
      </div>
    )}
    </>
  );
}

function NodePanel({
  node, treeColor, unlocked, reason, availableXp, onBuy, idoloInfo,
}: { node: CoachNode; treeColor: string; unlocked: boolean; reason: string | null; availableXp: number; onBuy: () => void; idoloInfo?: { totalTitles: number; idoloCap: number; idoloBump: number; titlesToNextStep: number; idoloUnlocked: boolean; dnaUnlocked: boolean } }) {
  const affordable = availableXp >= node.cost;
  const missingXp = Math.max(0, node.cost - availableXp);
  const missingReqs = (node.requires ?? []).filter((r) => {
    const req = ALL_COACH_NODES.find((n) => n.id === r);
    return req && reason?.toLowerCase().includes("requer");
  });
  return (
    <div
      className="rounded-2xl border p-4 backdrop-blur"
      style={{
        borderColor: `${treeColor}66`,
        background: `linear-gradient(160deg, ${treeColor}15, rgba(0,0,0,0.6))`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{
            background: unlocked
              ? `radial-gradient(circle at 30% 20%, ${treeColor}, ${treeColor}70)`
              : `${treeColor}20`,
            border: `2px solid ${treeColor}`,
            color: unlocked ? "#000" : treeColor,
            boxShadow: unlocked ? `0 0 14px ${treeColor}` : "none",
          }}
        >{node.icon}</div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-display text-lg" style={{ color: treeColor }}>{node.name}</div>
            {node.tier === 2 && (
              <span className="rounded-full bg-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-100 ring-1 ring-purple-300/50">TIER II</span>
            )}
          </div>
          <div className="text-xs" style={{ color: `${treeColor}cc` }}>{node.short}</div>
        </div>
      </div>
      <p className="mt-3 text-sm text-white/70">{node.desc}</p>
      {idoloInfo && (
        <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-950/30 p-3 text-xs">
          <div className="mb-1 font-display text-yellow-200">🗿 Sua contagem histórica</div>
          <div className="flex items-baseline justify-between">
            <span className="text-yellow-100/70">Títulos totais</span>
            <span className="font-display text-lg text-yellow-100">{idoloInfo.totalTitles}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-yellow-100/70">Bônus ativo</span>
            <span className={`font-display ${idoloInfo.idoloUnlocked ? "text-emerald-300" : "text-white/40"}`}>
              +{idoloInfo.idoloBump.toFixed(2)} OVR
              {!idoloInfo.idoloUnlocked && <span className="ml-1 text-[10px] text-white/40">(nó bloqueado)</span>}
            </span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-yellow-100/70">Teto atual</span>
            <span className="font-display text-yellow-200">
              +{Math.max(idoloInfo.idoloCap, 1).toFixed(2)} OVR
              {!idoloInfo.dnaUnlocked && <span className="ml-1 text-[10px] text-purple-200/70">· DNA dobra p/ +2,00</span>}
            </span>
          </div>
          {idoloInfo.idoloUnlocked && idoloInfo.idoloBump < idoloInfo.idoloCap && (
            <div className="mt-2 border-t border-yellow-500/20 pt-2 text-[11px] text-yellow-100/70">
              Faltam <b className="text-yellow-100">{idoloInfo.titlesToNextStep}</b> títulos pro próximo +0,10 OVR.
            </div>
          )}
          {idoloInfo.idoloUnlocked && idoloInfo.idoloBump >= idoloInfo.idoloCap && (
            <div className="mt-2 border-t border-yellow-500/20 pt-2 text-[11px] text-emerald-300">
              ✨ Teto atingido! {idoloInfo.dnaUnlocked ? "Máximo absoluto." : "Desbloqueie DNA do clube pra dobrar o teto."}
            </div>
          )}
          <div className="mt-2 text-[10px] text-yellow-100/40">
            Soma vitalícia de Brasileirão + Liberta + Sula + Mundial em todos os seus saves.
          </div>
        </div>
      )}
      {node.requires && node.requires.length > 0 && (
        <div className="mt-3 text-[11px] text-white/50">
          <span className="text-white/40">Requer: </span>
          {node.requires.map((r) => ALL_COACH_NODES.find((n) => n.id === r)?.name ?? r).join(", ")}
        </div>
      )}

      {!unlocked && (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-2.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Custo</span>
            <span className="font-display" style={{ color: treeColor }}>{node.cost} XP</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-white/60">Você tem</span>
            <span className={`font-display ${affordable ? "text-emerald-300" : "text-rose-300"}`}>
              {availableXp} XP
            </span>
          </div>
          {!affordable && (
            <div className="mt-1 text-rose-300/80">
              Faltam <b>{missingXp} XP</b> · jogue mais temporadas.
            </div>
          )}
          {affordable && !reason && (
            <div className="mt-1 text-emerald-300/80">✓ XP suficiente — pode desbloquear.</div>
          )}
          {reason && affordable && missingReqs.length === 0 && (
            <div className="mt-1 text-amber-300/80">{reason}</div>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        {unlocked ? (
          <div className="flex-1 rounded-full bg-emerald-500/20 px-3 py-2 text-center text-xs font-display text-emerald-300">✓ Desbloqueado</div>
        ) : (
          <button
            onClick={onBuy}
            disabled={!!reason}
            className="flex-1 rounded-xl px-4 py-2 text-sm font-display transition disabled:opacity-40"
            style={{
              background: reason ? "rgba(0,0,0,0.4)" : `linear-gradient(135deg, ${treeColor}, ${treeColor}dd)`,
              color: reason ? "#fff8" : "#000",
              boxShadow: reason ? "none" : `0 4px 20px ${treeColor}66`,
            }}
          >
            {reason ?? "Desbloquear"}
          </button>
        )}
      </div>
    </div>
  );
}

function HistoryTab({ state }: { state: CoachState }) {
  const rows = [...state.xpHistory].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-6 text-center text-sm text-yellow-100/60">
        Nenhum XP registrado ainda. Avance uma temporada pra acumular XP permanente.
      </div>
    );
  }

  const EPOCH = new Date(0).toISOString();
  const fmtDate = (iso: string) => {
    if (!iso || iso === EPOCH) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="space-y-2">
      {rows.map((r) => {
        const trophies = r.trophies ?? {};
        return (
          <div
            key={r.key}
            className="flex items-center gap-3 rounded-xl border border-yellow-500/15 bg-black/40 px-3 py-2"
          >
            <div className="w-8 text-center font-display text-yellow-300">T{r.season}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-yellow-100">{r.teamName}</div>
              <div className="truncate text-[11px] text-yellow-100/50">
                {r.saveName} · <span className="text-yellow-200/70">{fmtDate(r.createdAt)}</span>
              </div>
              {r.reasons.length > 0 && (
                <div className="mt-0.5 line-clamp-1 text-[10px] text-yellow-100/40">
                  {r.reasons.join(" · ")}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 text-lg">
                {trophies.brasileirao && <span title="Brasileirão">🥇</span>}
                {trophies.libertadores && <span title="Libertadores">🏆</span>}
                {trophies.sulamericana && <span title="Sula">🥈</span>}
                {trophies.mundial && <span title="Mundial">🌍</span>}
              </div>
              <div className="rounded-lg bg-yellow-500/15 px-2 py-0.5 text-xs font-semibold text-yellow-100">
                +{r.xp} XP
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
