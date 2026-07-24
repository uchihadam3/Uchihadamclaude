// Sistema de medalhas (badges) — vitórias no Mundial com combinações
// específicas de estilo tático + formação.
//
// Cada estilo (9 no total) tem 3 medalhas, uma para cada formação
// pré-definida — os pares são fixos, mas o jogo NÃO revela qual é
// melhor, média ou pior. Descobrir faz parte do jogo.
//
// Total: 27 medalhas. Cada medalha desbloqueada dá +0.1 OVR permanente
// pro time do jogador (independente do save). Coleção completa: +2.7 OVR.

import type { FormationId, TacticStyle } from "./formations";
import { getFormation, TACTICS } from "./formations";

// Internamente ainda separamos "a/b/c" pra manter a lista determinística
// e permitir escolher paletas visuais diferentes por medalha, mas NADA
// que exponha isso ao jogador (sem rótulo "ideal", "caos", "melhor" etc).
export type BadgeKind = "best" | "mid" | "worst";

export interface BadgeDef {
  key: string;                   // ex: "pressao-alta_a"
  style: TacticStyle;
  formation: FormationId;
  kind: BadgeKind;
  name: string;                  // nome poético da medalha
  description: string;           // como conquistar (sem revelar tier)
}

// Triplas fixas por estilo. Ordem interna best/mid/worst é IMPLEMENTAÇÃO —
// nunca exibida. O jogador só vê "vença o Mundial com esse par".
const TRIPLES: Array<{ style: TacticStyle; best: FormationId; mid: FormationId; worst: FormationId }> = [
  { style: "pressao-alta",  best: "4-3-3",   mid: "4-3-2-1", worst: "5-4-1" },
  { style: "posse",         best: "4-2-3-1", mid: "4-5-1",   worst: "3-3-4" },
  { style: "contra-ataque", best: "4-4-2",   mid: "4-2-3-1", worst: "3-3-4" },
  { style: "bolas-paradas", best: "3-5-2",   mid: "4-3-3",   worst: "3-3-4" },
  { style: "cadenciado",    best: "4-3-2-1", mid: "3-4-3",   worst: "3-3-4" },
  { style: "defensivo",     best: "5-4-1",   mid: "3-5-2",   worst: "3-3-4" },
  { style: "equilibrado",   best: "4-4-2",   mid: "5-3-2",   worst: "3-3-4" },
  { style: "ofensivo",      best: "3-3-4",   mid: "4-1-4-1", worst: "3-6-1" },
  { style: "retranca",      best: "5-4-1",   mid: "3-5-2",   worst: "3-3-4" },
];

// Rótulos poéticos por medalha. NADA aqui pode sugerir ordem/tier.
const TITLES: Record<TacticStyle, { best: string; mid: string; worst: string }> = {
  "pressao-alta":  { best: "Furacão do Norte",   mid: "Ventania Constante",     worst: "Tempestade Perfeita" },
  "posse":         { best: "Metrônomo Dourado",  mid: "Batuta Serena",          worst: "Compasso Rebelde" },
  "contra-ataque": { best: "Adaga de Prata",     mid: "Punhal Silencioso",      worst: "Flecha Solta" },
  "bolas-paradas": { best: "Régua e Compasso",   mid: "Precisão Cirúrgica",     worst: "Tiro no Escuro" },
  "cadenciado":    { best: "Relógio Suíço",      mid: "Ampulheta de Bronze",    worst: "Ritmo Torto" },
  "defensivo":     { best: "Muralha de Ferro",   mid: "Escudo de Bronze",       worst: "Fortaleza Improvável" },
  "equilibrado":   { best: "Harmonia Clássica",  mid: "Sinfonia Discreta",      worst: "Melodia Estranha" },
  "ofensivo":      { best: "Fúria Total",        mid: "Chama Constante",        worst: "Ataque Louco" },
  "retranca":      { best: "Bunker de Titânio",  mid: "Cofre Blindado",         worst: "Toca do Leão" },
};

export const BADGES: BadgeDef[] = TRIPLES.flatMap(({ style, best, mid, worst }) => {
  const styleLabel = TACTICS.find((t) => t.id === style)?.label ?? style;
  const mk = (formation: FormationId, kind: BadgeKind, name: string): BadgeDef => ({
    key: `${style}_${kind}`,
    style, formation, kind, name,
    // Sem hint de qualidade — só o par exigido.
    description: `Vença o Mundial jogando ${styleLabel} com formação ${getFormation(formation).label}.`,
  });
  return [
    mk(best,  "best",  TITLES[style].best),
    mk(mid,   "mid",   TITLES[style].mid),
    mk(worst, "worst", TITLES[style].worst),
  ];
});

export function findBadge(style: TacticStyle | undefined, formation: FormationId | undefined): BadgeDef | null {
  if (!style || !formation) return null;
  return BADGES.find((b) => b.style === style && b.formation === formation) ?? null;
}

export const OVR_BONUS_PER_BADGE = 0.1;
export const MAX_BADGES = BADGES.length;
export const MAX_OVR_BONUS = MAX_BADGES * OVR_BONUS_PER_BADGE;

// ---- Cache global do bônus de OVR do usuário logado ----
let _playerBadgeCount = 0;

export function setPlayerBadgeCount(n: number) {
  _playerBadgeCount = Math.max(0, Math.floor(n));
}

export function getPlayerBadgeCount(): number { return _playerBadgeCount; }
export function getPlayerBadgeOvrBonus(): number { return _playerBadgeCount * OVR_BONUS_PER_BADGE; }

// ---- Paleta por ESTILO (não por tier) — cada estilo tem sua "família"
// visual, então o jogador não consegue inferir qualidade pela cor. ----
export const STYLE_PALETTE: Record<TacticStyle, { outer: string; inner: string; accent: string; ribbon: string; glow: string }> = {
  "pressao-alta":  { outer: "#ff8a3d", inner: "#7a2a0e", accent: "#ffd7b5", ribbon: "#4a1508", glow: "#ffb066" },
  "posse":         { outer: "#a78bff", inner: "#3b1a7a", accent: "#e0d4ff", ribbon: "#1e0a4a", glow: "#c4aeff" },
  "contra-ataque": { outer: "#ff5c8a", inner: "#7a1030", accent: "#ffd0dd", ribbon: "#4a0818", glow: "#ff8aac" },
  "bolas-paradas": { outer: "#c4e04c", inner: "#4a5e10", accent: "#eaf4b0", ribbon: "#2a380a", glow: "#d8ea78" },
  "cadenciado":    { outer: "#5ccfd6", inner: "#0e4a52", accent: "#c4eff2", ribbon: "#062a30", glow: "#8de0e5" },
  "defensivo":     { outer: "#6d8fff", inner: "#1a2a7a", accent: "#c8d4ff", ribbon: "#0a134a", glow: "#98b0ff" },
  "equilibrado":   { outer: "#5cd68a", inner: "#0e5228", accent: "#c4f0d4", ribbon: "#063018", glow: "#88e2a8" },
  "ofensivo":      { outer: "#ff5c5c", inner: "#7a1010", accent: "#ffcaca", ribbon: "#4a0808", glow: "#ff8a8a" },
  "retranca":      { outer: "#c4a878", inner: "#4a3818", accent: "#e8d8b0", ribbon: "#2a1e0a", glow: "#d8c298" },
};
