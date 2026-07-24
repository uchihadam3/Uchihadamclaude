import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { computeStats, computeFullScore } from "@/lib/ranking";
import { getActiveCoachEffects, computeSaveXPBreakdown, bankXPFromSaves, hydrateCoachProgressFromCloud, computeCoachState, getCoachEffects, setActiveCoachEffects, computeIdoloOvrBump, type CoachEffects } from "@/lib/coach";
import { AchievementChips } from "@/components/AchievementChips";
import { TacticsBadge } from "@/components/TacticsBadge";
import { LiveDot, formatCreatedAt } from "@/components/LiveDot";
import { sfx, isSfxEnabled, setSfxEnabled, getSfxVolume, setSfxVolume, vibrate, isChatSfxEnabled, setChatSfxEnabled, getChatSfxVolume, setChatSfxVolume } from "@/lib/sfx";
import { useChatUnread } from "@/lib/chatNotify";
import {
  TEAMS,
  POSITION_SLOTS,
  LEGENDS,
  INTERNATIONAL_LEGENDS,
  type Player,
  type Position,
  type Team,
  type IntlTeam,
} from "@/lib/gameData";

import {
  buildSchedule,
  buildInitialTable,
  pickLeagueTeams,
  findTeam,
  computeMatchTacticsInfo,
  simulateMatch,
  simulateOtherMatches,
  sortTable,
  teamOverall,
  teamRatings,
  updateTable,
  type MatchResult,
  type TableRow,
  type TeamTactics,
} from "@/lib/gameLogic";
import {
  FORMATIONS,
  TACTICS,
  DEFAULT_FORMATION,
  DEFAULT_TACTIC,
  getFormation,
  deriveTacticsForSquad,
  tacticAdjustments,
  contextualTrait,
  type FormationId,
  type TacticStyle,
} from "@/lib/formations";

import {
  slotsForFormation,
  deriveRoles,
  perfectFit,
  fitsSlot,
  playerRolesLabel,
  roleToBroad,
  ROLE_SHORT,
  ROLE_LABEL,
  type SlotDef,
} from "@/lib/roles";

import { Pitch, type PitchAssignment } from "@/components/Pitch";


import {
  buildCompetition,
  simulateGroupOthersRound,
  simulateAllOtherGroupsRound,
  applyPlayerMatchToGroup,
  sortGroup,
  playerPositionInGroup,
  playerAdvancedFromGroups,
  koLabels,
  nextKORival,
  matchScore,
  buildBracket,
  applyPlayerBracketResult,
  playerNextBracketRival,
  otherSemiLoser,
  LIBERTADORES_TEAMS,
  SULAMERICANA_TEAMS,
  MUNDIAL_TEAMS,
  type CompState,
  type GroupTeam,
  type KOMatch,
  type BracketState,
  type BracketMatch,
  type BracketTeam,
} from "@/lib/competitions";


const GAME_NAME = "Lendas do Brasileirão";
const SQUAD_SIZE = POSITION_SLOTS.length; // 11

// Gradiente da faixa/pill por posição broad (GOL amarelo, ZAG azul, MEI verde, ATA vermelho).
function posGradFor(pos: Position): string {
  return pos === "GOL" ? "linear-gradient(180deg,#fbbf24,#a16207)"
    : pos === "ZAG" ? "linear-gradient(180deg,#60a5fa,#1e40af)"
    : pos === "MEI" ? "linear-gradient(180deg,#34d399,#065f46)"
    :                 "linear-gradient(180deg,#f87171,#991b1b)";
}
function cardBgFor(pos: Position): string {
  return pos === "GOL" ? "radial-gradient(120% 90% at 50% 0%, rgba(251,191,36,0.28), transparent 60%), linear-gradient(160deg,#1b1408 0%,#0b0805 100%)"
    : pos === "ZAG" ? "radial-gradient(120% 90% at 50% 0%, rgba(96,165,250,0.28), transparent 60%), linear-gradient(160deg,#0b1224 0%,#05070f 100%)"
    : pos === "MEI" ? "radial-gradient(120% 90% at 50% 0%, rgba(52,211,153,0.28), transparent 60%), linear-gradient(160deg,#06180f 0%,#040b07 100%)"
    :                 "radial-gradient(120% 90% at 50% 0%, rgba(248,113,113,0.28), transparent 60%), linear-gradient(160deg,#1a0808 0%,#0a0404 100%)";
}
// Fundo cheio (mesmo tratamento do cardBgFor) usado na metade oposta do card híbrido —
// não é um overlay translúcido, é a mesma "cor de card" da segunda posição, bem feita.
function posTintFor(pos: Position): string {
  return cardBgFor(pos);
}
// Retorna as posições broad únicas do jogador (na ordem dos roles), ex: ["MEI","ATA"] pro Pelé.
function playerBroads(p: Player): Position[] {
  const rs = deriveRoles(p);
  const out: Position[] = [];
  for (const r of rs) {
    const b = roleToBroad(r);
    if (!out.includes(b)) out.push(b);
  }
  if (!out.length) out.push(p.position);
  return out;
}



export const Route = createFileRoute("/")({
  component: Game,
});

type Phase =
  | "menu"
  | "formation"
  | "draft"
  | "squad"
  | "season"
  | "matchResult"
  | "seasonEnd"
  | "bonusDraft"
  | "hardMidDraft"
  | "compIntro"
  | "compGroupMatch"
  | "compGroupResult"
  | "compGroupsEnd"
  | "compKOIntro"
  | "compKOMatch"
  | "compKOResult"
  | "compEnd"
  | "champion"
  | "eliminated";


interface DraftPick {
  slot: string;
  player: Player;
  fromTeam: string;
}

import { useNavigate } from "@tanstack/react-router";
import { useSession } from "@/hooks/useSession";
import { SlotsScreen } from "@/components/SlotsScreen";
import { createSlot, listMySlots, updateSlotState, resetSlotCreatedAt, tryUnlockBadge, refreshMyBadgeBonus, type SaveSlot } from "@/lib/saves";
import { getPlayerBadgeOvrBonus, getPlayerBadgeCount, MAX_BADGES, MAX_OVR_BONUS, OVR_BONUS_PER_BADGE, type BadgeDef } from "@/lib/badges";
import { Badge as BadgeMedal } from "@/components/Badge";
import { PlayerCrestProvider, type CrestConfig } from "@/components/Crest";
import { CrestBuilder, defaultCrestConfig } from "@/components/CrestBuilder";
import { varianceSeed, teamOvrDelta, applyOvrDelta, withOpponentVariance, applyOvrDeltaToOverall, seasonGlobalBuff } from "@/lib/opponentVariance";

const ACTIVE_SLOT_KEY = "lendas_active_slot_id";

interface Trophies {
  brasileirao: boolean;
  libertadores: boolean;
  sulamericana: boolean;
  mundial: boolean;
}

type GameMode = "casual" | "classico" | "hard";

// RNG determinístico (mulberry32) — usado no draft/bônus pra que a lista
// de craques disponíveis não mude se o jogador atualizar a página.
function seededRng(seed: number) {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = seededRng(seed);
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}


interface SavedState {
  phase: Phase;
  mode: GameMode;
  teamName: string;
  picks: DraftPick[];
  draftIndex: number;
  draftTeamRotation: string[];
  fixtures: { opponentId: string; home: boolean }[];
  schedule?: { home: string; away: string }[][];
  round: number;
  table: TableRow[];
  lastMatch: MatchResult | null;
  matchHistory: MatchResult[];
  comp: CompState | null;
  compQueue: ("libertadores" | "sulamericana" | "mundial")[];
  trophies: Trophies;
  /** Marca se o jogador passou da fase de grupos em cada copa (pontos parciais no ranking). */
  groupAdvanced?: { libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  bonusRemaining?: number;
  bonusNext?: "libertadores" | "sulamericana" | "mundial";
  /** Se true, ao fim do bônus volta pro mata-mata da copa atual (não abre nova competição). */
  bonusReturnToKO?: boolean;
  /** Se true, o pool de craques também inclui lendas internacionais (bônus de copa). */
  bonusIncludeIntl?: boolean;
  /** "Mentor de craques": +1 lenda extra no PRÓXIMO draft bônus da nova temporada (consumido uma única vez). */
  mentorLegendPending?: boolean;
  autoPlay?: boolean | 0 | 5 | 10;
  autoRemaining?: number;
  compGroupAuto?: number;
  compKOAuto?: boolean;
  /** Posição no Brasileirão ANTES da última partida (para mostrar delta). */
  prevBrasileiraoPos?: number | null;
  /** Tabela congelada ANTES da partida ao vivo — evita spoiler no modal. */
  preMatchBrasileiraoTable?: TableRow[] | null;
  /** Grupos congelados ANTES da partida ao vivo — evita spoiler nas copas. */
  preMatchComp?: CompState | null;
  /** Pontuação do ranking congelada ANTES da partida ao vivo — evita spoiler no header. */
  preMatchRankingScore?: number | null;

  season?: number;
  formation?: FormationId;
  tactic?: TacticStyle;
  draftSkipsRemaining?: number;
  /** Times já pulados no draft desta campanha — nunca podem voltar a aparecer. */
  draftSkippedTeams?: string[];
  leagueTeamIds?: string[];
  /** Semente persistida — garante que os craques mostrados no draft e no
   *  bônus não mudem se o jogador atualizar a página. */
  draftSeed?: number;
  /** ID permanente da campanha para o histórico de XP sobreviver a reset no mesmo slot. */
  xpCampaignId?: string;
  /** Histórico das temporadas concluídas com Mundial (para "Bicampeão", etc.). */
  seasonHistory?: SeasonSnapshot[];
  /** Fase de eliminação em cada copa da temporada atual (para ranking por conta). */
  seasonKOExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
  /** Brasão customizado do jogador (do editor de escudo). */
  crestConfig?: CrestConfig | null;
  /** Rastreamento para efeitos contextuais do técnico (Passo 3.C). */
  postLossRemaining?: number;      // matches restantes com +0.30 OVR pós-derrota (Análise pós-jogo × Análise de vídeo)
  postWinNext?: boolean;           // próximo jogo herda +0.20 OVR (Rotina de treino)
  postThrashingNext?: boolean;     // próximo jogo herda +0.20 OVR pós-goleada (Aprender com derrotas)
  closeMatchNext?: boolean;        // próximo jogo herda +0.20 OVR após jogo apertado (Recuperação acelerada)
  winStreak?: number;              // vitórias consecutivas (Embalo vencedor)

  /** Modo Hard 🔥: estágio atual dos drafts em etapas.
   *  0 = draft inicial (cap 80), 1 = pós-10 jogos (cap 85), 2 = pós-20 jogos (sem cap), 3 = temp1 finalizada. */
  hardStage?: 0 | 1 | 2 | 3;
  /** Escolhas restantes no draft do meio (Hard). */
  hardMidDraftRemaining?: number;
  /** Cap de OVR no draft do meio atual (Hard). null = sem cap. */
  hardMidDraftCap?: number | null;
  /** Rerolls do pool restantes no draft do meio atual (Hard). 1º pular rerola sem consumir. */
  hardMidDraftRerolls?: number;
  /** Seed do pool do draft do meio (bumpa a cada reroll). */
  hardMidDraftSeed?: number;
  /** Marca se o jogador já rerolou nesta rodada de escolha; próximo pular consome. */
  hardMidDraftRerolledThisRound?: boolean;
}

type KOExit = "champion" | "final" | "semi" | "fourth" | "quarter" | "r16" | "groups";


interface SeasonSnapshot {
  season: number;
  brasileiraoPos: number | null;
  trophies: Trophies;
  groupAdvanced?: { libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  koExits?: { libertadores?: KOExit; sulamericana?: KOExit; mundial?: KOExit };
}




const emptyTrophies: Trophies = {
  brasileirao: false, libertadores: false, sulamericana: false, mundial: false,
};

/** Contexto contextual do técnico para uma partida do jogador — soma bônus
 *  de vitórias/derrotas passadas, jogos apertados, goleada, rodada 20 e
 *  embalo de vitórias. Zera bônus não aplicáveis (todos são no lado do jogador). */
function buildPlayerCtx(
  state: SavedState,
  opts: { isFinal?: boolean; isKnockout?: boolean; round1based?: number; teamOvr?: number; oppOvr?: number } = {},
): {
  isFinal?: boolean;
  isKnockout?: boolean;
  extraOvrBump: number;
  extraLambdaAtk: number;
} {
  const coach = getActiveCoachEffects();
  let extraOvrBump = 0;
  // Rotina de treino → após vitória
  if (state.postWinNext) extraOvrBump += 0.20;
  // Análise pós-jogo (+ Análise de vídeo estende duração)
  if ((state.postLossRemaining ?? 0) > 0) extraOvrBump += 0.30;
  // Aprender com derrotas → +0.20 OVR após goleada sofrida (apenas se o nó estiver desbloqueado)
  if (state.postThrashingNext) extraOvrBump += coach.postThrashingBump;
  // Recuperação acelerada → +0.20 OVR quando a diferença absoluta de OVR ≤ 2 (aplicado ao próprio jogo)
  if (
    coach.closeMatchBump > 0 &&
    opts.teamOvr !== undefined &&
    opts.oppOvr !== undefined &&
    Math.abs(opts.teamOvr - opts.oppOvr) <= 2
  ) {
    extraOvrBump += coach.closeMatchBump;
  }
  // Preparação física → +0.10 OVR a partir da rodada 20 do Brasileirão
  if (opts.round1based !== undefined && opts.round1based >= 20) extraOvrBump += 0.10;

  // Embalo vencedor → 3+ vitórias seguidas
  const wins = state.winStreak ?? 0;
  const extraLambdaAtk = wins >= 3 ? coach.chemistryLambdaAtk : 0;

  return { isFinal: opts.isFinal, isKnockout: opts.isKnockout, extraOvrBump, extraLambdaAtk };
}

/** Atualiza os rastreadores contextuais do técnico após uma partida do jogador. */
function applyPostMatchTrackers(
  state: SavedState,
  playerGoals: number,
  oppGoals: number,
): Partial<SavedState> {
  const coach = getActiveCoachEffects();
  const diff = playerGoals - oppGoals;
  const won = diff > 0;
  const drew = diff === 0;
  const lost = diff < 0;
  const goalDiffAbs = Math.abs(diff);

  // Embalo vencedor → vitórias consecutivas (zera em empate/derrota)
  const nextWinStreak = won ? (state.winStreak ?? 0) + 1 : 0;

  // postLossRemaining decai a cada jogo; se derrota, reinicia com videoAnalysisMatches
  let postLossRemaining = Math.max(0, (state.postLossRemaining ?? 0) - 1);
  if (lost) postLossRemaining = Math.max(postLossRemaining, coach.videoAnalysisMatches);

  return {
    postWinNext: won,
    postThrashingNext: lost && goalDiffAbs >= 3, // goleada sofrida
    postLossRemaining,
    winStreak: nextWinStreak,
  };
}

function buildFreshState(name: string, mode: GameMode, crestConfig?: CrestConfig | null, coachEffects?: CoachEffects | null): SavedState {
  const isHard = mode === "hard";
  // Hard: nenhum slot da rotação inicial vira lenda. Só clubes comuns.
  const legendsCount = isHard ? 0 : 1 + Math.floor(Math.random() * 3);
  const teamCount = 11 - legendsCount;
  const shuffledTeams = [...TEAMS].map((t) => t.id).sort(() => Math.random() - 0.5).slice(0, teamCount);
  const legendPositions = new Set<number>();
  while (legendPositions.size < legendsCount) {
    legendPositions.add(Math.floor(Math.random() * 11));
  }
  const rotation: string[] = [];
  let idx = 0;
  for (let i = 0; i < 11; i++) {
    if (legendPositions.has(i)) rotation.push("lendas");
    else rotation.push(shuffledTeams[idx++]);
  }
  return {
    phase: "formation",
    mode,
    teamName: name || "Meu Time",
    picks: [],
    draftIndex: 0,
    draftTeamRotation: rotation,
    fixtures: [], round: 0, table: [],
    lastMatch: null, matchHistory: [],
    comp: null, compQueue: [],
    trophies: { ...emptyTrophies },
    season: 1,
    formation: DEFAULT_FORMATION,
    tactic: DEFAULT_TACTIC,
    draftSkipsRemaining: 3 + ((coachEffects ?? getActiveCoachEffects()).extraSkips ?? 0),
    draftSeed: Math.floor(Math.random() * 0x7fffffff) || 1,
    xpCampaignId: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    crestConfig: crestConfig ?? null,
    hardStage: isHard ? 0 : undefined,
  };

}


// Preenche campos faltando ao carregar saves antigos.
function migrateLoadedState(raw: unknown, fallbackName: string, fallbackMode: GameMode): SavedState {
  const base = buildFreshState(fallbackName, fallbackMode);
  const loaded = (raw && typeof raw === "object" ? raw : {}) as Partial<SavedState>;
  const merged: SavedState = { ...base, ...loaded } as SavedState;
  // Sanitiza arrays essenciais que podem estar undefined em saves antigos.
  if (!Array.isArray(merged.picks)) merged.picks = [];
  if (!Array.isArray(merged.fixtures)) merged.fixtures = [];
  if (!Array.isArray(merged.table)) merged.table = [];
  if (!Array.isArray(merged.matchHistory)) merged.matchHistory = [];
  if (!Array.isArray(merged.compQueue)) merged.compQueue = [];
  if (!Array.isArray(merged.draftTeamRotation)) merged.draftTeamRotation = base.draftTeamRotation;
  if (!merged.trophies) merged.trophies = { ...emptyTrophies };
  if (!merged.formation) merged.formation = DEFAULT_FORMATION;
  if (!merged.tactic) merged.tactic = DEFAULT_TACTIC;
  if (typeof merged.season !== "number") merged.season = 1;
  if (typeof merged.round !== "number") merged.round = 0;
  if (typeof merged.draftIndex !== "number") merged.draftIndex = 0;
  const baseSkips = 3 + (getActiveCoachEffects().extraSkips ?? 0);
  if (typeof merged.draftSkipsRemaining !== "number") {
    merged.draftSkipsRemaining = baseSkips;
  } else if (
    // Se está no início do draft (nenhum time pulado ainda) e o total salvo
    // ficou abaixo do teto atual (ex.: nó da árvore desbloqueado depois),
    // recompõe pra refletir o bônus da árvore.
    merged.phase === "draft" &&
    (merged.draftIndex ?? 0) === 0 &&
    (!Array.isArray(merged.draftSkippedTeams) || merged.draftSkippedTeams.length === 0) &&
    merged.draftSkipsRemaining < baseSkips
  ) {
    merged.draftSkipsRemaining = baseSkips;
  }
  if (typeof merged.draftSeed !== "number" || merged.draftSeed <= 0) {
    merged.draftSeed = base.draftSeed;
  }

  return merged;
}

// Helper: extrai as táticas do jogador do estado (fallback padrão).
function playerTactics(state: SavedState): TeamTactics {
  return {
    formation: state.formation ?? DEFAULT_FORMATION,
    style: state.tactic ?? DEFAULT_TACTIC,
  };
}


function Spinner() {
  return <div className="flex min-h-screen items-center justify-center"><div className="text-muted-foreground">Carregando…</div></div>;
}

function ModePickScreen({ name, onChoose, onCancel }: { name: string; onChoose: (m: GameMode) => void; onCancel: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 text-5xl">⚽</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">Novo save</div>
      <h1 className="mt-1 cartoon-title text-3xl">{name}</h1>
      <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Escolha o modo</div>
        <button onClick={() => onChoose("casual")} className="rounded-xl border border-border bg-card p-4 text-left card-glow hover:border-primary">
          <div className="font-display text-xl">🎮 Casual</div>
          <div className="mt-1 text-xs text-muted-foreground">Mostra o overall de cada jogador no draft.</div>
        </button>
        <button onClick={() => onChoose("classico")} className="rounded-xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/15 to-card p-4 text-left card-glow hover:border-primary">
          <div className="font-display text-xl">👑 Clássico</div>
          <div className="mt-1 text-xs text-muted-foreground">Overall escondido no draft. Só vê a força depois de montar os 11.</div>
        </button>
        <button onClick={() => onChoose("hard")} className="rounded-xl border-2 border-orange-500/60 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-card p-4 text-left card-glow hover:border-orange-300">
          <div className="font-display text-xl">🔥 Casual Hard</div>
          <div className="mt-1 text-xs text-muted-foreground">Sem lendas no draft inicial e OVR travado em 80. Reforços em etapas ao longo da 1ª temporada. Só pros bravos.</div>
        </button>
        <button onClick={onCancel} className="mt-2 text-sm text-muted-foreground hover:text-foreground">← Voltar</button>
      </div>
    </div>
  );
}

function Game() {
  const navigate = useNavigate();
  const { session, loading: authLoading, userId } = useSession();
  const [state, setState] = useState<SavedState | null>(null);
  const [activeSlot, setActiveSlot] = useState<SaveSlot | null>(null);
  const [slotLoading, setSlotLoading] = useState(false);
  const [pending, setPending] = useState<{ slotIndex: number; displayName: string; mode?: GameMode; crestConfig?: CrestConfig } | null>(null);
  const [unlockedBadge, setUnlockedBadge] = useState<BadgeDef | null>(null);
  const stateRef = useRef<SavedState | null>(null);
  const activeSlotRef = useRef<SaveSlot | null>(null);
  activeSlotRef.current = activeSlot;

  const refreshCoachEffects = (slots: SaveSlot[]): CoachEffects => {
    if (!userId) return getActiveCoachEffects();
    const eff = getCoachEffects(computeCoachState(userId, slots));
    eff.idoloOvrBump = computeIdoloOvrBump(slots, eff.idoloCap);
    setActiveCoachEffects(eff);
    return eff;
  };

  useEffect(() => {
    if (!authLoading && !session) navigate({ to: "/auth" });
  }, [authLoading, session, navigate]);

  useEffect(() => {
    if (!userId) { setActiveSlot(null); setState(null); return; }
    if (typeof window === "undefined") return;
    const savedId = localStorage.getItem(ACTIVE_SLOT_KEY);
    if (!savedId) return;
    setSlotLoading(true);
    (async () => {
      await hydrateCoachProgressFromCloud(userId);
      const slots = await listMySlots(userId);
      refreshCoachEffects(slots);
      const found = slots.find((s) => s.id === savedId);
      if (found) {
        setActiveSlot(found);
        setState(migrateLoadedState(found.game_state, found.display_name, (found.mode as GameMode) ?? "casual"));
      } else {
        localStorage.removeItem(ACTIVE_SLOT_KEY);
      }
    })().catch(() => localStorage.removeItem(ACTIVE_SLOT_KEY))
      .finally(() => setSlotLoading(false));
  }, [userId]);

  // Debounced cloud save on state change
  useEffect(() => {
    stateRef.current = state;
    if (!state || !activeSlot) return;
    const id = setTimeout(() => {
      updateSlotState(activeSlot.id, state).catch((e) => console.error("save failed", e));
    }, 700);
    return () => clearTimeout(id);
  }, [state, activeSlot]);

  useEffect(() => {
    const flush = () => {
      if (stateRef.current && activeSlotRef.current) {
        updateSlotState(activeSlotRef.current.id, stateRef.current).catch(() => {});
      }
    };
    const onVisibility = () => { if (document.visibilityState === "hidden") flush(); };
    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  // Popula bônus de OVR das medalhas do usuário (afeta os cálculos do jogo).
  useEffect(() => {
    if (userId) refreshMyBadgeBonus(userId);
  }, [userId]);

  // Hidrata o progresso da árvore do técnico a partir do backend na entrada e
  // replanta os efeitos ativos. Isso garante que saves abertos direto e resets
  // usem Rede internacional, Radar, Cartola e todos os bônus desbloqueados.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void (async () => {
      await hydrateCoachProgressFromCloud(userId);
      const slots = await listMySlots(userId);
      if (!cancelled) refreshCoachEffects(slots);
    })().catch(() => {});
    return () => { cancelled = true; };
  }, [userId]);

  // Detecta vitória do Mundial e tenta desbloquear a medalha correspondente
  // (par estilo + formação usados no momento da vitória).
  const mundialUnlockedRef = useRef(false);
  useEffect(() => {
    if (!userId || !state || !activeSlot) return;
    const won = !!state.trophies?.mundial;
    if (!won) { mundialUnlockedRef.current = false; return; }
    if (mundialUnlockedRef.current) return;
    mundialUnlockedRef.current = true;
    tryUnlockBadge({
      userId,
      style: state.tactic,
      formation: state.formation,
      saveId: activeSlot.id,
      teamName: state.teamName,
      season: state.season ?? 1,
    }).then((def) => {
      if (def) {
        try { sfx.win(); } catch { /* noop */ }
        try { vibrate?.(60); } catch { /* noop */ }
        setUnlockedBadge(def);
      }
    }).catch(() => {});
  }, [state?.trophies?.mundial, userId, activeSlot, state?.tactic, state?.formation, state?.teamName, state?.season, state, activeSlot]);

  const openSlot = (slot: SaveSlot) => {
    setActiveSlot(slot);
    setState(migrateLoadedState(slot.game_state, slot.display_name, (slot.mode as GameMode) ?? "casual"));
    if (typeof window !== "undefined") localStorage.setItem(ACTIVE_SLOT_KEY, slot.id);
  };
  const leaveSlot = async () => {
    // Garante que a pontuação final (fase eliminated/champion) seja gravada
    // antes de sair — o autosave é debounced e poderia perder a última mudança.
    if (activeSlotRef.current && stateRef.current) {
      try { await updateSlotState(activeSlotRef.current.id, stateRef.current); } catch (e) { console.error("final save failed", e); }
    }
    setActiveSlot(null);
    setState(null);
    if (typeof window !== "undefined") localStorage.removeItem(ACTIVE_SLOT_KEY);
  };

  if (authLoading || slotLoading) return <Spinner />;
  if (!session || !userId) return <Spinner />;

  if (pending) {
    // Etapa 1: escolher modo. Etapa 2: montar brasão. Etapa 3: criar save.
    if (!pending.mode) {
      return (
        <ModePickScreen
          name={pending.displayName}
          onCancel={() => setPending(null)}
          onChoose={(mode) => setPending({ ...pending, mode })}
        />
      );
    }
    return (
      <CrestBuilder
        teamName={pending.displayName}
        initial={pending.crestConfig ?? defaultCrestConfig()}
        onCancel={() => setPending({ ...pending, mode: undefined })}
        onDone={async (crestConfig) => {
          try {
            await hydrateCoachProgressFromCloud(userId);
            const slots = await listMySlots(userId);
            const freshCoachEffects = refreshCoachEffects(slots);
            const initial = buildFreshState(pending.displayName, pending.mode!, crestConfig, freshCoachEffects);
            const slot = await createSlot({
              userId,
              slotIndex: pending.slotIndex,
              displayName: pending.displayName,
              gameState: initial,
            });
            setActiveSlot(slot);
            setState(initial);
            if (typeof window !== "undefined") localStorage.setItem(ACTIVE_SLOT_KEY, slot.id);
            setPending(null);
          } catch (e) {
            alert(e instanceof Error ? e.message : String(e));
            setPending(null);
          }
        }}
      />
    );
  }

  if (!activeSlot || !state) {
    return (
      <SlotsScreen
        userId={userId}
        userEmail={session.user.email ?? ""}
        onOpen={openSlot}
        onCreate={(slotIndex, displayName) => setPending({ slotIndex, displayName })}
      />
    );
  }


  return (
    <PlayerCrestProvider config={state.crestConfig ?? null}>
      <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 pb-24">
        <Header
          state={state}
          score={visibleRankingScore(state)}
          onRestart={async () => {
            // Bank XP ganho na campanha atual ANTES de reiniciar — o
            // seasonHistory vai ser apagado, então precisamos travar o
            // highwater agora pra o XP disponível não encolher.
            try {
              if (activeSlotRef.current) bankXPFromSaves(userId, [{ ...activeSlotRef.current, game_state: state }]);
            } catch { /* noop */ }
            let freshCoachEffects = getActiveCoachEffects();
            try {
              await hydrateCoachProgressFromCloud(userId);
              const slots = await listMySlots(userId);
              const currentSlot = activeSlotRef.current ? { ...activeSlotRef.current, game_state: state } : null;
              const mergedSlots = currentSlot
                ? slots.map((slot) => slot.id === currentSlot.id ? currentSlot : slot)
                : slots;
              freshCoachEffects = refreshCoachEffects(mergedSlots);
            } catch {
              const currentSlot = activeSlotRef.current ? { ...activeSlotRef.current, game_state: state } : null;
              freshCoachEffects = refreshCoachEffects(currentSlot ? [currentSlot] : []);
            }
            setState(buildFreshState(state.teamName, state.mode, state.crestConfig ?? null, freshCoachEffects));
            if (activeSlotRef.current) {
              void resetSlotCreatedAt(activeSlotRef.current.id).catch(() => {});
            }
          }}
          onBackToSlots={leaveSlot}
        />

        {state.phase === "formation" && <FormationPhase state={state} setState={setState} />}
        {state.phase === "draft" && <DraftPhase state={state} setState={setState} />}
        {state.phase === "squad" && <SquadPhase state={state} setState={setState} />}

        {state.phase === "season" && <SeasonPhase state={state} setState={setState} />}
        {state.phase === "matchResult" && <MatchResultView state={state} setState={setState} />}
        {state.phase === "seasonEnd" && <SeasonEnd state={state} setState={setState} />}
        {state.phase === "bonusDraft" && <BonusDraftPhase state={state} setState={setState} />}
        {state.phase === "hardMidDraft" && <HardMidDraftPhase state={state} setState={setState} />}
        {state.phase === "compIntro" && <CompIntro state={state} setState={setState} />}
        {state.phase === "compGroupMatch" && <CompGroupMatchScreen state={state} setState={setState} />}
        {state.phase === "compGroupResult" && <CompGroupResultScreen state={state} setState={setState} />}
        {state.phase === "compGroupsEnd" && <CompGroupsEndScreen state={state} setState={setState} />}
        {state.phase === "compKOIntro" && <CompKOIntroScreen state={state} setState={setState} />}
        {state.phase === "compKOMatch" && <CompKOMatchScreen state={state} setState={setState} />}
        {state.phase === "compKOResult" && <CompKOResultScreen state={state} setState={setState} />}
        {state.phase === "compEnd" && <CompEndScreen state={state} setState={setState} />}
        {state.phase === "champion" && <ChampionScreen state={state} setState={setState} onLeave={leaveSlot} />}
        {state.phase === "eliminated" && <EliminatedScreen state={state} onLeave={leaveSlot} />}
        {unlockedBadge && <BadgeUnlockedModal badge={unlockedBadge} onClose={() => setUnlockedBadge(null)} />}
      </div>
    </PlayerCrestProvider>
  );
}

function BadgeUnlockedModal({ badge, onClose }: { badge: BadgeDef; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-yellow-400/60 bg-gradient-to-b from-yellow-900/40 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-yellow-500/30"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "badgePop 500ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <div className="absolute inset-x-0 -top-20 h-40 bg-gradient-radial from-yellow-400/40 to-transparent blur-2xl" />
        <div className="relative text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-300/90">🏅 Medalha desbloqueada</div>
          <div className="mt-1 font-display text-2xl text-yellow-100">{badge.name}</div>
          <div className="my-4 flex justify-center" style={{ animation: "badgeSpin 900ms ease-out" }}>
            <BadgeMedal badge={badge} size={160} unlocked />
          </div>
          <div className="rounded-lg bg-black/40 p-3 text-xs text-yellow-100/90 leading-relaxed">
            {badge.description}
          </div>
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-yellow-500/25 px-3 py-1 font-display text-sm text-yellow-100">
            +{OVR_BONUS_PER_BADGE.toFixed(1)} OVR permanente
          </div>
          <div className="mt-1 text-[10px] text-yellow-100/60">
            aplicado em todos os seus saves, para sempre
          </div>
          <button
            onClick={onClose}
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 py-2.5 font-display text-slate-950 shadow-lg hover:brightness-110"
          >
            Continuar
          </button>
          <Link
            to="/badges"
            onClick={onClose}
            className="mt-2 block text-[11px] text-yellow-200/80 underline decoration-dotted underline-offset-4"
          >
            ver toda a coleção →
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes badgePop { 0% { transform: scale(0.6); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
        @keyframes badgeSpin { 0% { transform: rotate(-25deg) scale(0.4); opacity: 0 } 60% { transform: rotate(8deg) scale(1.08); opacity: 1 } 100% { transform: rotate(0deg) scale(1); opacity: 1 } }
      `}</style>
    </div>,
    document.body,
  );
}



/* ─────────────  UI helpers  ───────────── */

function Header({ state, score, onRestart, onBackToSlots }: { state: SavedState; score: number; onRestart: () => void; onBackToSlots: () => void | Promise<void> }) {
  const navigate = useNavigate();

  const { teamName, trophies, matchHistory } = state;
  const count = (trophies.brasileirao?1:0)+(trophies.libertadores?1:0)+(trophies.sulamericana?1:0)+(trophies.mundial?1:0);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const [showExitMenu, setShowExitMenu] = useState(false);
  return (
    <header className="mb-6">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Seu clube</div>
          <div className="cartoon-title text-xl leading-tight break-words sm:text-2xl md:text-3xl">{teamName}</div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <button type="button" onClick={() => navigate({ to: "/ranking" })} title="Ver ranking global" className="chip-outline text-[11px] text-yellow-100"><span className="text-yellow-300">⭐</span> {score}</button>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <HeaderChatLink />
          <button type="button" onClick={() => navigate({ to: "/ranking" })} title="Ranking global" className="sticker-icon-btn sticker-icon-btn-gold">🏆</button>
          <SoundToggle />
          <button onClick={() => setShowHistory(true)} title="Histórico de partidas" className="sticker-icon-btn">📜</button>
          <button onClick={() => setShowHelp(true)} title="Como jogar" className="sticker-icon-btn sticker-icon-btn-white font-display">?</button>
          <button onClick={() => setShowExitMenu(true)} title="Sair / Reiniciar" className="sticker-btn">Sair</button>

        </div>
      </div>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showHistory && <HistoryModal state={state} onClose={() => setShowHistory(false)} />}
      
      {showExitMenu && (
        <ExitMenuModal
          teamName={teamName}
          onClose={() => setShowExitMenu(false)}
          onRestart={() => { setShowExitMenu(false); onRestart(); }}
          onBackToSlots={() => { setShowExitMenu(false); void onBackToSlots(); }}
        />
      )}
    </header>
  );
}

function ExitMenuModal({ teamName, onClose, onRestart, onBackToSlots }: {
  teamName: string;
  onClose: () => void;
  onRestart: () => void;
  onBackToSlots: () => void;
}) {
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [restartInput, setRestartInput] = useState("");
  const nameMatches = restartInput.trim().toLowerCase() === teamName.trim().toLowerCase();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md sticker-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-5xl drop-shadow-[0_3px_0_rgba(0,0,0,0.6)]">⚙️</div>
          <h2 className="mt-2 cartoon-title text-3xl">Sair da campanha</h2>
          <div className="mt-2 ribbon-tag text-[10px]">
            Time atual: {teamName}
          </div>
        </div>


        {!confirmRestart ? (
          <div className="mt-5 space-y-3">
            <button
              onClick={onBackToSlots}
              className="w-full rounded-2xl border-2 border-black bg-white p-4 text-left text-black shadow-[0_4px_0_#000] transition active:translate-y-[2px] active:shadow-[0_2px_0_#000]"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">💾</div>
                <div className="flex-1">
                  <div className="font-display text-base">Voltar aos meus saves</div>
                  <div className="text-xs text-black/60">Salva o progresso e volta pra tela dos slots</div>
                </div>
                <div className="text-black/60">→</div>
              </div>
            </button>

            <button
              onClick={() => { setRestartInput(""); setConfirmRestart(true); }}
              className="w-full rounded-2xl border-2 border-black bg-yellow-300 p-4 text-left text-black shadow-[0_4px_0_#000] transition active:translate-y-[2px] active:shadow-[0_2px_0_#000]"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🔄</div>
                <div className="flex-1">
                  <div className="font-display text-base">Reiniciar campanha</div>
                  <div className="text-xs text-black/70">Mantém nome e escudo, escolhe formação e jogadores de novo</div>
                </div>
                <div>→</div>
              </div>
            </button>

            <button
              onClick={onClose}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4">
              <div className="font-display text-base text-red-200">Reiniciar <span className="underline decoration-red-300/60">{teamName}</span>?</div>
              <div className="mt-1 text-xs text-red-200/80">
                Todo o progresso da campanha atual de <span className="font-semibold text-red-100">{teamName}</span> será perdido (temporadas, títulos, elenco, histórico). Você mantém só o nome e o escudo.
              </div>
            </div>

            <label className="block text-xs text-red-100/80">
              Para confirmar, digite o nome do seu time exatamente: <b className="text-white">{teamName}</b>
            </label>
            <input
              autoFocus
              value={restartInput}
              onChange={(e) => setRestartInput(e.target.value)}
              placeholder={teamName}
              className="w-full rounded-lg border border-red-500/40 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />

            <div className="flex gap-2">
              <button
                onClick={() => { setConfirmRestart(false); setRestartInput(""); }}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm hover:bg-secondary"
              >← Voltar</button>
              <button
                onClick={onRestart}
                disabled={!nameMatches}
                className="flex-1 rounded-xl bg-yellow-400 px-4 py-2.5 font-display text-sm text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-yellow-400/40 disabled:text-black/50"
              >🔄 Reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function currentRankingScore(state: SavedState): number {
  return computeFullScore(state, computeStats(state));
}

function visibleRankingScore(state: SavedState): number {
  const liveResultPhase = state.phase === "matchResult" || state.phase === "compGroupResult" || state.phase === "compKOResult";
  if (liveResultPhase && typeof state.preMatchRankingScore === "number") return state.preMatchRankingScore;
  return currentRankingScore(state);
}

function HistoryModal({ state, onClose }: { state: SavedState; onClose: () => void }) {
  const { teamName, matchHistory: fullHistory } = state;
  // Não mostra a partida atual enquanto ela ainda tá rolando (evita spoiler do placar)
  const liveResultPhase = state.phase === "matchResult" || state.phase === "compGroupResult" || state.phase === "compKOResult";
  const history = liveResultPhase && fullHistory.length > 0 ? fullHistory.slice(0, -1) : fullHistory;
  const reversed = [...history].reverse();
  const mySquad = useMemo(() => state.picks.map((p) => p.player), [state.picks]);
  const myOverall = useMemo(() => (mySquad.length ? teamOverall(mySquad) : undefined), [mySquad]);
  let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
  for (const m of history) {
    const isHome = m.homeShort === "VOC";
    const my = isHome ? m.homeGoals : m.awayGoals;
    const opp = isHome ? m.awayGoals : m.homeGoals;
    gf += my; ga += opp;
    if (my > opp) wins++; else if (my === opp) draws++; else losses++;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-5 shadow-xl card-glow" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Histórico · {teamName}</div>
            <div className="cartoon-title text-2xl">Suas partidas</div>
          </div>
          <button onClick={onClose} className="sticker-close">Fechar</button>
        </div>
        <div className="mb-4 grid grid-cols-4 gap-2 text-center text-xs">
          <div className="rounded-lg bg-secondary p-2"><div className="text-muted-foreground">Jogos</div><div className="font-display text-lg">{history.length}</div></div>
          <div className="rounded-lg bg-green-500/15 p-2"><div className="text-green-300">V</div><div className="font-display text-lg text-green-300">{wins}</div></div>
          <div className="rounded-lg bg-yellow-500/15 p-2"><div className="text-yellow-300">E</div><div className="font-display text-lg text-yellow-300">{draws}</div></div>
          <div className="rounded-lg bg-red-500/15 p-2"><div className="text-red-300">D</div><div className="font-display text-lg text-red-300">{losses}</div></div>
        </div>
        <div className="mb-3 text-center text-xs text-muted-foreground">Gols: <span className="text-white">{gf}</span> pró · <span className="text-white">{ga}</span> contra · Saldo <span className="text-white">{gf - ga >= 0 ? "+" : ""}{gf - ga}</span></div>
        {reversed.length === 0 ? (
          <div className="rounded-lg bg-secondary/50 p-6 text-center text-sm text-muted-foreground">Nenhuma partida disputada ainda.</div>
        ) : (
          <ul className="space-y-2">
            {reversed.map((m, i) => {
              const isHome = m.homeShort === "VOC";
              const my = isHome ? m.homeGoals : m.awayGoals;
              const opp = isHome ? m.awayGoals : m.homeGoals;
              const res = my > opp ? "V" : my === opp ? "E" : "D";
              const resClass = res === "V" ? "bg-green-500/20 text-green-300" : res === "E" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300";
              const opp1 = resolveOppFromMatch(state, m);
              const homeOvr = m.homeTacticsInfo?.ovr ?? (isHome ? myOverall : opp1.overall);
              const awayOvr = m.awayTacticsInfo?.ovr ?? (isHome ? opp1.overall : myOverall);
              const homeCrest = isHome
                ? { name: teamName, short: "VOC", color: "#facc15", players: mySquad, overall: homeOvr }
                : { name: opp1.name, short: opp1.short, color: opp1.color, players: opp1.players, overall: homeOvr };
              const awayCrest = isHome
                ? { name: opp1.name, short: opp1.short, color: opp1.color, players: opp1.players, overall: awayOvr }
                : { name: teamName, short: "VOC", color: "#facc15", players: mySquad, overall: awayOvr };
              return (
                <li key={i} className="rounded-lg border border-border bg-secondary/40 p-3">
                  <div className="mb-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${resClass}`}>{res}</div>
                    <span className="truncate">{m.label ?? "Partida"}{m.season ? ` · T${m.season}` : ""} · {isHome ? "casa" : "fora"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <ClickableCrest short={homeCrest.short} color={homeCrest.color} name={homeCrest.name} size={40} players={homeCrest.players} overall={homeCrest.overall} tactics={homeCrest.short === "VOC" ? playerTactics(state) : (m.homeTacticsInfo ? { formation: m.homeTacticsInfo.formation, style: m.homeTacticsInfo.style } : undefined)} ratingsOverride={m.homeTacticsInfo ? { atk: m.homeTacticsInfo.atk, def: m.homeTacticsInfo.def, ovr: m.homeTacticsInfo.ovr } : undefined} label={`Elenco de ${homeCrest.name}`} />
                    <div className="font-display text-2xl tabular-nums">{m.homeGoals} <span className="text-muted-foreground">×</span> {m.awayGoals}</div>
                    <ClickableCrest short={awayCrest.short} color={awayCrest.color} name={awayCrest.name} size={40} players={awayCrest.players} overall={awayCrest.overall} tactics={awayCrest.short === "VOC" ? playerTactics(state) : (m.awayTacticsInfo ? { formation: m.awayTacticsInfo.formation, style: m.awayTacticsInfo.style } : undefined)} ratingsOverride={m.awayTacticsInfo ? { atk: m.awayTacticsInfo.atk, def: m.awayTacticsInfo.def, ovr: m.awayTacticsInfo.ovr } : undefined} label={`Elenco de ${awayCrest.name}`} />

                  </div>
                  <TacticsReport m={m} homeSquad={homeCrest.players} awaySquad={awayCrest.players} playerTactics={playerTactics(state)} />
                </li>

              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function HelpModal({ onClose }: { onClose: () => void }) {
  const [showTactics, setShowTactics] = useState(false);
  const [tab, setTab] = useState<'basico' | 'taticas' | 'partida' | 'competicoes' | 'progressao'>('basico');
  const tabs: { id: typeof tab; icon: string; label: string }[] = [
    { id: 'basico', icon: '🎮', label: 'Básico' },
    { id: 'taticas', icon: '⚔️', label: 'Táticas' },
    { id: 'partida', icon: '🏟️', label: 'Partida' },
    { id: 'competicoes', icon: '🏆', label: 'Copas' },
    { id: 'progressao', icon: '🌳', label: 'Progresso' },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-card shadow-xl card-glow" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <div className="cartoon-title text-2xl">Como jogar</div>
          <button onClick={onClose} className="sticker-close">Fechar</button>
        </div>
        <div className="border-b border-white/10 px-3 pb-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 flex-col items-center gap-0.5 rounded-xl border-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                  tab === t.id
                    ? 'scale-105 border-yellow-400 bg-yellow-500/20 text-yellow-100 shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                    : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <span className="text-lg leading-none">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        {showTactics && <TacticsHelpModal anchor={null} onClose={() => setShowTactics(false)} />}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-3 text-sm text-white/90">

            {tab === 'basico' && (<>
              <div>
                <div className="font-semibold text-yellow-300">1. Monte seu time (Draft)</div>
                <div>A cada rodada aparece 1 clube com 11 jogadores. Toque em 1 jogador — as posições válidas dele piscam no campo — e toque no slot onde quer escalar. Se não gostar do clube, use <b>Pular</b> (3 pulos, tanto no Casual quanto no Clássico). Rodadas com 👑 são de <b>lendas</b>.</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">2. Modos</div>
                <ul className="ml-4 list-disc space-y-1">
                  <li><b>Casual</b>: overall dos jogadores visível.</li>
                  <li><b>Clássico</b>: overall escondido — só o nome. Use seu conhecimento.</li>
                </ul>
              </div>
              <div className="rounded-lg bg-secondary/60 p-3 text-xs">
                💡 Dica: as lendas bônus <b>substituem</b> um jogador do seu time na mesma posição — ou use "Não escolher" pra manter o elenco atual.
              </div>
            </>)}

            {tab === 'taticas' && (<>
              <button
                onClick={() => setShowTactics(true)}
                className="w-full rounded-xl border border-yellow-500/50 bg-yellow-500/10 px-3 py-2 text-sm font-semibold text-yellow-200 hover:bg-yellow-500/20"
              >
                ❓ Ver explicação completa das táticas
              </button>
              <div>
                <div className="font-semibold text-yellow-300">Formação (12 opções)</div>
                <div className="mb-1 text-xs text-white/80">Cada jogador só cabe nas posições reais dele (zagueiro puro nunca vira lateral, MEC precisa de slot de meia-atacante). A formação sozinha já mexe MUITO no ATA/DEF — e ainda tem <b>traço próprio</b> e <b>sinergia com o estilo</b>.</div>

                <div className="mt-2 text-xs font-semibold text-yellow-200">Viés base (ATA / DEF fixos)</div>
                <div className="mt-1 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-[11px]">
                    <thead className="bg-yellow-500/10 text-yellow-200"><tr>
                      <th className="px-2 py-1 text-left">Formação</th><th className="px-1 py-1">ATA</th><th className="px-1 py-1">DEF</th><th className="px-2 py-1 text-left">Traço próprio</th>
                    </tr></thead>
                    <tbody className="[&>tr>td]:px-1 [&>tr>td]:py-1 [&>tr>td]:text-center [&>tr:nth-child(even)]:bg-white/5">
                      <tr><td className="!text-left">3-3-4</td><td>+4</td><td>−0,5</td><td className="!text-left text-[10px]">Jogo aberto: +λ dos 2 lados</td></tr>
                      <tr><td className="!text-left">3-4-3</td><td>+3,5</td><td>0</td><td className="!text-left text-[10px]">+λ ATA se você é favorito</td></tr>
                      <tr><td className="!text-left">4-3-3</td><td>+3</td><td>+0,5</td><td className="!text-left text-[10px]">Asfixia: +λ ATA c/ vantagem</td></tr>
                      <tr><td className="!text-left">4-2-3-1</td><td>+2,5</td><td>+1</td><td className="!text-left text-[10px]">+1 DEF em finais e neutro</td></tr>
                      <tr><td className="!text-left">3-5-2</td><td>+2</td><td>+1,5</td><td className="!text-left text-[10px]">+1 ATA c/ vantagem de força</td></tr>
                      <tr><td className="!text-left">4-4-2</td><td>+1,5</td><td>+2</td><td className="!text-left text-[10px]">Eficiência extra no ATA</td></tr>
                      <tr><td className="!text-left">4-1-4-1</td><td>+1</td><td>+2,5</td><td className="!text-left text-[10px]">Volante fixo: −λ adversário</td></tr>
                      <tr><td className="!text-left">3-6-1</td><td>+0,5</td><td>+3</td><td className="!text-left text-[10px]">Meio dominante: −λ adv.</td></tr>
                      <tr><td className="!text-left">4-3-2-1</td><td>0</td><td>+3,5</td><td className="!text-left text-[10px]">+1 DEF vs time mais forte</td></tr>
                      <tr><td className="!text-left">4-5-1</td><td>−0,5</td><td>+4</td><td className="!text-left text-[10px]">−λ adv. no 2º tempo</td></tr>
                      <tr><td className="!text-left">5-3-2</td><td>−1</td><td>+4,5</td><td className="!text-left text-[10px]">−λ adv. em mata-mata</td></tr>
                      <tr><td className="!text-left">5-4-1</td><td>−1,5</td><td>+5</td><td className="!text-left text-[10px]">Muralha: −λ adv. sempre</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-1 text-[10px] text-white/60">💡 A formação sozinha já dá <b>até 6,5 pontos de spread</b> entre ATA e DEF (3-3-4 vs 5-4-1). Escolha primeiro pelo perfil que quer, depois combine com o estilo.</div>

                <div className="mt-3 text-xs font-semibold text-yellow-200">Sinergia formação × estilo</div>
                <div className="mt-1 text-[11px] text-white/80">Cada formação combina de um jeito diferente com cada estilo de jogo. O bônus do estilo pode ser <b>amplificado</b> quando a combinação faz sentido, ou <b>reduzido</b> quando não faz. Só o lado <b>bom</b> do estilo é afetado pela sinergia — as penalidades fixas continuam iguais.</div>
                <div className="mt-2 rounded bg-yellow-500/10 p-2 text-[10px] text-yellow-100/80">💡 O jogo <b>não mostra</b> quais combinações funcionam melhor — faz parte da graça descobrir testando. Preste atenção nos relatórios de partida pra sacar o que rende com o seu elenco.</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">Estilos de jogo (9 opções)</div>
                <div className="mb-1 text-xs text-white/70">Cada estilo mexe no ATA/DEF e no ritmo de gols. A força vem do seu elenco: escolher um estilo que <b>não combina</b> com o time vira penalidade.</div>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li><b>⚔️ Ofensivo</b> — <b>+3,6 ATA base</b> + escala com ATA (60%) e MEI (40%) · <b>−2 DEF fixo</b>. Muitos gols dos dois lados. Use quando você é <b>favorito</b> e precisa marcar.</li>
                  <li><b>⚖️ Equilibrado</b> — <b>+3,0 ATA e +2,4 DEF base</b>, escala com o OVR geral do time (sem penalidade nunca). Padrão seguro pra qualquer elenco.</li>
                  <li><b>🛡️ Defensivo</b> — <b>+3,3 DEF base</b> + escala com ZAG (65%) e GOL (35%) · <b>−0,2 ATA fixo</b>. Jogos travados. Bom pra segurar resultado contra time superior.</li>
                  <li><b>🏃 Contra-ataque</b> — <b>+2,8 DEF</b> (ZAG+GOL) e <b>+1,7 ATA base</b> + escala com ATA (70%) + MEI (30%). Ideal contra times mais fortes.</li>
                  <li><b>🎯 Posse de bola</b> — <b>+2,4 ATA / +2,2 DEF base</b>, escala forte com <b>MEI (80%) + ATA (20%)</b>. Perfeito pra time com meio-campo forte; GOL/ZAG não contam.</li>
                  <li><b>🔥 Pressão alta</b> — <b>+2,9 ATA base</b> + escala com MEI (50%) e ATA (50%) · <b>−1,2 DEF base</b> (também melhora com MEI+ATA fortes). Jogo aberto, saldo positivo quando meio+ataque é forte.</li>
                  <li><b>🧱 Retranca</b> — <b>+3,9 DEF base</b> + a escala mais forte do jogo com ZAG (60%) e GOL (40%) · <b>−0,6 ATA fixo</b>. Segura 0×0 e 1×0. Use pra proteger classificação em mata-mata.</li>
                  <li><b>🐢 Cadenciado</b> — <b>+3,0 DEF / +2,2 ATA base</b> + escala com MEI (70%) e ZAG (30%). Reduz muito os gols do adversário (próprio ataque quase intacto) — favorece o time melhor.</li>
                  <li><b>⛳ Bolas paradas</b> — <b>+2,5 ATA base</b> + escala com ZAG (50%) e ATA (50%) · <b>+1,7 DEF</b> (também escala). Cabeceio em escanteios/faltas.</li>
                </ul>
                <div className="mt-2 rounded bg-yellow-500/10 p-2 text-[10px] text-yellow-100/80">💡 Baseline da escala = <b>OVR 80</b>. Cada ponto acima disso no setor-chave soma no bônus; abaixo, o bônus cai. Ofensivo/Defensivo/Retranca têm <b>penalidade fixa</b> no lado oposto. Equilibrado nunca dá penalidade.</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">Como ler OVR, ATA e DEF</div>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li><b>OVR (overall)</b> = média dos 11 titulares. É o "peso" bruto do elenco, <b>não recebe bônus</b> da tática — reflete só a qualidade dos jogadores.</li>
                  <li><b>ATA</b> = ataque do setor (peso maior nos ATA, depois MEI, um pouco de ZAG) <b>+ bônus do estilo</b> escolhido. Ofensivo/Pressão/Posse somam; Retranca/Defensivo cortam.</li>
                  <li><b>DEF</b> = defesa do setor (peso maior em ZAG, depois GOL e MEI) <b>+ bônus do estilo</b>. Retranca/Defensivo somam muito; Ofensivo/Pressão cortam.</li>
                  <li>Por isso <b>ATA/DEF podem passar do maior jogador do time</b> (até acima de 99): você está vendo a força do setor <b>já com a tática aplicada</b>. Se trocar de estilo, o número muda na hora.</li>
                  <li><b>Cada ponto de OVR importa</b>: 81 rende mais que 80, 82 mais que 81, e assim por diante — inclusive pra goleiro nos gols sofridos.</li>
                </ul>
              </div>
            </>)}

            {tab === 'partida' && (<>
              <div>
                <div className="font-semibold text-yellow-300">Mando de campo & favoritismo</div>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li><b>🏠 Em casa</b> — você é o mandante da partida. Ganha um pequeno bônus de <b>ATA</b> (torcida empurra) e o adversário perde um pouco de <b>ritmo de gols</b>. No Brasileirão cada time joga uma vez em casa e uma fora contra cada rival. Em mata-mata de ida e volta, o mando <b>alterna</b> entre os dois jogos.</li>
                  <li><b>✈️ Fora de casa</b> — você é o visitante. Sem bônus de mando, e o adversário é que recebe o empurrão da torcida dele. Ganhar fora vale o mesmo que em casa (3 pts), mas é <b>mais difícil</b>.</li>
                  <li><b>⚪ Campo neutro</b> — <b>ninguém</b> é mandante: sem bônus de torcida pra nenhum dos dois lados. Acontece em <b>toda partida do Mundial</b>, nas <b>finais únicas</b> da Libertadores/Sul-Americana e na <b>disputa de 3º lugar</b>. Algumas formações (ex: <b>4-2-3-1</b>) rendem <b>DEF extra</b> especificamente em campo neutro e finais.</li>
                  <li><b>⭐ Favorito</b> — você é considerado favorito quando seu <b>OVR de time é ≥ 3 pontos acima</b> do adversário (já contando o bônus dele, se for do Brasileirão ou Mundial). Formações como <b>3-4-3</b>, <b>4-3-3</b> e <b>3-5-2</b> dão bônus extra <b>quando você é favorito</b>; outras (como <b>4-3-2-1</b>) rendem mais <b>quando o adversário é mais forte que você</b>.</li>
                  <li><b>💡 Diferença de OVR</b> — quanto maior a diferença, menor a chance de zebra. Se a diferença efetiva chegar a <b>20 OVR ou mais</b>, o time mais fraco praticamente não vence.</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">🎯 Disputa de pênaltis</div>
                <div className="text-xs text-white/85">Rola sempre que um mata-mata termina <b>empatado</b>: jogo único empatado (Libertadores, Sul-Americana e <b>todo</b> mata-mata do Mundial) ou ida e volta com <b>agregado igual</b>. No Brasileirão nunca tem pênalti — empate vale 1 ponto.</div>
                <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                  <li><b>Quem bate:</b> os 11 titulares menos o goleiro. A ordem é <b>ATA primeiro</b>, depois <b>MEI</b>, depois <b>ZAG</b> — dentro de cada setor os de <b>OVR mais alto</b> vão antes (com uma pitada de aleatório pra não ficar sempre igual). Passou dos 5 e ainda empatado, entra <b>morte súbita</b> continuando pela mesma lista.</li>
                  <li><b>Quem bate primeiro:</b> <b>você sempre</b> cobra o primeiro pênalti (vantagem fixa de mandante da disputa).</li>
                  <li><b>Quem defende:</b> o <b>goleiro titular</b> de cada time — o de <b>maior OVR</b> na posição GOL do XI. Goleiro melhor = mais defesas.</li>
                  <li><b>Cálculo do gol:</b> começa em <b>75%</b> de chance (batedor 78 vs goleiro 78). Cada <b>+1 OVR do batedor</b> soma <b>+1,1 ponto percentual</b>; cada <b>+1 OVR do goleiro</b> tira <b>−1,3 pp</b> (goleiro pesa um pouco mais). Piso <b>22%</b>, teto <b>96%</b>.</li>
                  <li><b>Bônus do técnico:</b> o nó <b>Sangue-frio</b> da árvore soma % fixa <b>só nos seus batedores</b> (não afeta o adversário).</li>
                </ul>
                <div className="mt-2 overflow-hidden rounded-xl border border-yellow-500/40">
                  <table className="w-full text-[11px]">
                    <thead className="bg-yellow-500/15 text-yellow-100">
                      <tr>
                        <th className="p-1.5 text-left font-semibold">Batedor \ Goleiro</th>
                        <th className="p-1.5 text-center font-semibold">GOL 72</th>
                        <th className="p-1.5 text-center font-semibold">GOL 78</th>
                        <th className="p-1.5 text-center font-semibold">GOL 85</th>
                        <th className="p-1.5 text-center font-semibold">GOL 92</th>
                        <th className="p-1.5 text-center font-semibold">GOL 99</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/90">
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>72</b> (fraco)</td>
                        <td className="p-1.5 text-center">75%</td>
                        <td className="p-1.5 text-center">67%</td>
                        <td className="p-1.5 text-center">58%</td>
                        <td className="p-1.5 text-center">49%</td>
                        <td className="p-1.5 text-center text-red-300">40%</td>
                      </tr>
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>80</b> (regular)</td>
                        <td className="p-1.5 text-center">84%</td>
                        <td className="p-1.5 bg-emerald-500/10 text-center font-bold text-emerald-300">76%</td>
                        <td className="p-1.5 text-center">67%</td>
                        <td className="p-1.5 text-center">58%</td>
                        <td className="p-1.5 text-center text-red-300">49%</td>
                      </tr>
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>88</b> (craque)</td>
                        <td className="p-1.5 text-center">93%</td>
                        <td className="p-1.5 text-center">85%</td>
                        <td className="p-1.5 text-center">76%</td>
                        <td className="p-1.5 text-center">67%</td>
                        <td className="p-1.5 text-center">58%</td>
                      </tr>
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>95</b> (lenda)</td>
                        <td className="p-1.5 text-center text-emerald-300">96%</td>
                        <td className="p-1.5 text-center text-emerald-300">93%</td>
                        <td className="p-1.5 text-center">84%</td>
                        <td className="p-1.5 text-center">75%</td>
                        <td className="p-1.5 text-center">66%</td>
                      </tr>
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>99</b> (elite)</td>
                        <td className="p-1.5 text-center text-emerald-300">96%</td>
                        <td className="p-1.5 text-center text-emerald-300">96%</td>
                        <td className="p-1.5 text-center text-emerald-300">88%</td>
                        <td className="p-1.5 text-center">79%</td>
                        <td className="p-1.5 text-center">70%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-1 text-[10px] text-white/70">💡 Um <b>goleiro 99</b> tira quase 35pp de chance contra qualquer batedor — mesmo um batedor 99 fica em ~70%. Ter <b>ATA/MEI de OVR alto no XI</b> garante que os 5 primeiros cobradores sejam os mais confiáveis.</div>

              </div>
              <div>
                <div className="font-semibold text-yellow-300">Variação de OVR dos adversários</div>
                <div className="text-xs">
                  No começo de cada temporada, <b>todo time da IA</b> (Brasileirão, Libertadores, Sul-Americana e Mundial) recebe uma variação fixa de <b>−3 a +3 OVR</b> — o mesmo time pode aparecer mais forte ou mais fraco do que o "normal". A variação é sorteada de forma <b>determinística</b> por técnico + temporada + time (dois saves diferentes veem valores diferentes; ao virar a temporada, tudo é re-sorteado). <b>Não afeta os jogadores do seu draft.</b>
                </div>

                <div className="mt-2 overflow-hidden rounded-xl border border-yellow-500/40">
                  <table className="w-full text-[11px]">
                    <thead className="bg-yellow-500/15 text-yellow-100">
                      <tr>
                        <th className="p-1.5 text-left font-semibold">Faixa do time</th>
                        <th className="p-1.5 text-center font-semibold">−3</th>
                        <th className="p-1.5 text-center font-semibold">−2</th>
                        <th className="p-1.5 text-center font-semibold">−1</th>
                        <th className="p-1.5 bg-emerald-500/20 text-center font-semibold">Normal</th>
                        <th className="p-1.5 text-center font-semibold">+1</th>
                        <th className="p-1.5 text-center font-semibold">+2</th>
                        <th className="p-1.5 text-center font-semibold">+3</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/90">
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>Fortes</b> (OVR ≥ 84)<div className="text-[10px] text-white/60">sobem pouco, descem mais</div></td>
                        <td className="p-1.5 text-center text-red-300">6%</td>
                        <td className="p-1.5 text-center text-red-300">15%</td>
                        <td className="p-1.5 text-center text-red-300">24%</td>
                        <td className="p-1.5 bg-emerald-500/10 text-center font-bold text-emerald-300">35%</td>
                        <td className="p-1.5 text-center text-emerald-300">12%</td>
                        <td className="p-1.5 text-center text-emerald-300">5%</td>
                        <td className="p-1.5 text-center text-emerald-300">3%</td>
                      </tr>
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>Médios</b> (OVR 80–83)<div className="text-[10px] text-white/60">simétrico</div></td>
                        <td className="p-1.5 text-center">7,5%</td>
                        <td className="p-1.5 text-center">10%</td>
                        <td className="p-1.5 text-center">15%</td>
                        <td className="p-1.5 bg-emerald-500/10 text-center font-bold text-emerald-300">35%</td>
                        <td className="p-1.5 text-center">15%</td>
                        <td className="p-1.5 text-center">10%</td>
                        <td className="p-1.5 text-center">7,5%</td>
                      </tr>
                      <tr className="border-t border-yellow-500/20">
                        <td className="p-1.5"><b>Fracos</b> (OVR ≤ 79)<div className="text-[10px] text-white/60">descem pouco, sobem mais</div></td>
                        <td className="p-1.5 text-center text-red-300">3%</td>
                        <td className="p-1.5 text-center text-red-300">5%</td>
                        <td className="p-1.5 text-center text-red-300">12%</td>
                        <td className="p-1.5 bg-emerald-500/10 text-center font-bold text-emerald-300">35%</td>
                        <td className="p-1.5 text-center text-emerald-300">24%</td>
                        <td className="p-1.5 text-center text-emerald-300">15%</td>
                        <td className="p-1.5 text-center text-emerald-300">6%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-1 text-[10px] text-white/70">
                  💡 Times de elite ganham "temporadas ruins" com mais frequência do que "temporadas mágicas". Times pequenos, ao contrário, têm mais chance de aparecer <b>fortes</b> — dando espaço pra zebras crescerem ao longo dos anos.
                </div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">📈 Mundo mais duro a cada era</div>
                <div className="text-xs">
                  A partir da <b>4ª temporada</b>, <b>todos</b> os times da IA (Brasileirão, Libertadores, Sul-Americana e Mundial) ganham um <b>bônus fixo</b> de OVR que <b>não desaparece</b> — o mundo continua evoluindo enquanto seu técnico envelhece.
                </div>
                <ul className="ml-4 mt-1 list-disc space-y-0.5 text-xs">
                  <li>Temp. <b>1–3</b>: mundo padrão (+0)</li>
                  <li>Temp. <b>4</b>: <b className="text-orange-300">+1 OVR</b> em todos os adversários</li>
                  <li>Temp. <b>5</b>: <b className="text-orange-400">+2 OVR</b> em todos</li>
                  <li>Temp. <b>6</b>: <b className="text-red-400">+3 OVR</b> em todos</li>
                  <li>Temp. <b>7</b>: <b className="text-red-400">+4 OVR</b> em todos</li>
                  <li>Temp. <b>8+</b>: <b className="text-red-500">+5 OVR</b> em todos (teto)</li>
                </ul>
                <div className="mt-1 text-[10px] text-white/70">
                  💡 Esse bônus soma <b>por cima</b> da variação de −3/+3 e do buff do Brasileirão pós-Mundial. Seu elenco <b>não</b> recebe esse bônus — o desafio cresce à medida que sua árvore do técnico amadurece.
                </div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">⚡ Durante os jogos</div>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Velocidade 1x / 2x / 4x é lembrada entre partidas.</li>
                  <li>Toque nos escudos pra ver a escalação dos times <b>sem parar</b> a partida.</li>
                  <li>Toque no 📊 flutuante pra ver a tabela ao vivo (congelada até o jogo acabar, sem spoiler).</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">🔊 Som</div>
                <div>O botão de som abre um controle com <b>slider de volume</b> (0-100%) e liga/desliga.</div>
              </div>
            </>)}

            {tab === 'competicoes' && (<>
              <div>
                <div className="font-semibold text-yellow-300">Brasileirão</div>
                <div>42 rodadas, pontos corridos (ida e volta). 3 pts vitória, 1 empate, 0 derrota.</div>
                <ul className="ml-4 list-disc space-y-1">
                  <li><b>1º a 6º</b> → Libertadores + <b>2 lendas</b> bônus</li>
                  <li><b>7º a 12º</b> → Sul-Americana + <b>1 lenda</b> bônus</li>
                  <li><b>13º ou pior</b> → eliminado, campanha encerrada</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">Copas Continentais + Mundial</div>
                <div>32 times, fase de grupos + mata-mata. Em <b>qualquer</b> das três copas (Libertadores, Sul-Americana e Mundial): se <b>passar a fase de grupos</b>, ganha <b>+1 lenda</b> na hora. Depois no mata-mata:</div>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li><b>Campeão</b> da Libertadores/Sul-Americana → <b>+1 lenda</b> extra e vaga no Mundial.</li>
                  <li><b>Vice</b> (perdeu a final) → vai também ao Mundial, sem lenda bônus.</li>
                  <li><b>3º lugar</b> (ganhou a disputa de bronze) → vai também ao Mundial, sem lenda bônus.</li>
                  <li><b>4º lugar</b> ou eliminação antes → campanha encerrada.</li>
                </ul>
                <div className="mt-1 text-xs text-white/80">Nos lendas bônus das copas o pool inclui <b>lendas brasileiras + internacionais</b> 🌍 (Messi, CR7, Zidane, Maldini, Mbappé etc.). Só nos bônus do Brasileirão o pool fica restrito a brasileiros.</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">🔄 Próxima temporada (infinita!)</div>
                <div>Ao ganhar o <b>Mundial</b>, sua campanha <b>continua</b> na temporada seguinte com o mesmo elenco. Você não escolhe lendas novas — volta direto pro Brasileirão do ano <b>N+1</b>, com pontos <b>cumulativos</b>. Cada nova temporada os títulos ganham rótulos <b>Bicampeão</b>, <b>Tricampeão</b>, <b>Tetracampeão</b>… e a posição no Brasileirão daquele ano aparece do lado. Enquanto você continuar ganhando o Mundial, a campanha <b>não termina</b>. Se em qualquer ano você for <b>eliminado</b> (13º ou pior no Brasileirão ou queda na copa), aí sim acaba.</div>
              </div>
            </>)}

            {tab === 'progressao' && (<>
              <div>
                <div className="font-semibold text-yellow-300">🧠 XP do técnico</div>
                <div className="mb-1 text-xs text-white/80">Cada save que você joga vai gerando XP pra desbloquear a <b>árvore do técnico</b>. O XP é <b>acumulativo entre saves</b> e nunca diminui.</div>
                <div className="mt-1 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-[11px]">
                    <thead className="bg-yellow-500/10 text-yellow-200"><tr>
                      <th className="px-2 py-1 text-left">Etapa</th><th className="px-1 py-1">XP</th>
                    </tr></thead>
                    <tbody className="[&>tr>td]:px-2 [&>tr>td]:py-1 [&>tr:nth-child(even)]:bg-white/5">
                      <tr><td>Terminar uma temporada (qualquer resultado)</td><td className="text-center">+1</td></tr>
                      <tr><td>🏆 Vencer o Brasileirão</td><td className="text-center">+2</td></tr>
                      <tr><td>🏆 Vencer a Libertadores</td><td className="text-center">+3</td></tr>
                      <tr><td>🏆 Vencer a Sul-Americana</td><td className="text-center">+2</td></tr>
                      <tr><td>🌎 Vencer o Mundial</td><td className="text-center">+5</td></tr>
                      <tr><td>Bi consecutivo do Brasileirão</td><td className="text-center">+2</td></tr>
                      <tr><td>Bi consecutivo da Libertadores</td><td className="text-center">+2</td></tr>
                      <tr><td>Bi consecutivo do Mundial</td><td className="text-center">+2</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-[10px] text-white/70">💡 Uma temporada perfeita (Brasileirão + Liberta + Mundial) vale <b>11 XP</b> num único ano. Nós da árvore como <b>"Estudante do jogo"</b> aumentam esse total em +20% (e a versão II soma outros +20%). O XP é <b>permanente</b>: mesmo apagando um save, o total ganho por ele fica creditado pra sempre no seu técnico.</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">🏆 Pontuação e Ranking</div>
                <div className="mb-2 text-xs text-white/80">Em <b>todo jogo</b> você ganha:</div>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li><b>+5</b> por vitória · <b>+2</b> por empate</li>
                  <li>Gol feito e gol sofrido valem <b>diferente pra cada estilo</b> (equilibra defensivo vs ofensivo)</li>
                </ul>
                <div className="mt-2 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-[11px]">
                    <thead className="bg-yellow-500/10 text-yellow-200">
                      <tr>
                        <th className="px-2 py-1 text-left">Estilo</th>
                        <th className="px-1 py-1">Gol feito</th>
                        <th className="px-1 py-1">Gol sofrido</th>
                        <th className="px-1 py-1">Sem sofrer</th>
                      </tr>
                    </thead>
                    <tbody className="[&>tr>td]:px-1 [&>tr>td]:py-1 [&>tr>td]:text-center [&>tr:nth-child(even)]:bg-white/5">
                      <tr><td className="!text-left">🧱 Retranca</td><td>+2,0</td><td>−1,0</td><td>+3</td></tr>
                      <tr><td className="!text-left">🐢 Cadenciado</td><td>+2,3</td><td>−1,5</td><td>+3</td></tr>
                      <tr><td className="!text-left">🛡️ Defensivo</td><td>+2,6</td><td>−1,7</td><td>+3</td></tr>
                      <tr><td className="!text-left">⚖️ Equilibrado</td><td>+3,0</td><td>−1,8</td><td>—</td></tr>
                      <tr><td className="!text-left">🏃 Contra-ataque</td><td>+3,0</td><td>−1,8</td><td>+1</td></tr>
                      <tr><td className="!text-left">🔥 Pressão alta</td><td>+3,0</td><td>−1,8</td><td>—</td></tr>
                      <tr><td className="!text-left">⛳ Bolas paradas</td><td>+3,0</td><td>−1,8</td><td>—</td></tr>
                      <tr><td className="!text-left">🎯 Posse de bola</td><td>+3,1</td><td>−1,9</td><td>—</td></tr>
                      <tr><td className="!text-left">⚔️ Ofensivo</td><td>+2,8</td><td>−1,8</td><td>—</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-[10px] text-white/60">💡 Estilos defensivos fazem menos gols, mas cada gol vale mais e sem sofrer dá bônus. Ofensivos fazem mais gols, mas cada um vale um pouco menos. No fim, todos rendem <b>~180 pts</b> numa campanha média — o vencedor é quem <b>vence os jogos</b>, não quem faz mais gol.</div>
                <div className="mt-3 text-xs font-semibold text-yellow-200">Bônus de campanha:</div>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li>Brasileirão: <b>+150</b> campeão · <b>+75</b> (2º-6º) · <b>+50</b> (7º-12º)</li>
                  <li>Sul-Americana: <b>+50</b> grupos · <b>+90</b> título · <b>+30</b> vice · <b>+15</b> 3º lugar</li>
                  <li>Libertadores: <b>+60</b> grupos · <b>+110</b> título · <b>+35</b> vice · <b>+20</b> 3º lugar</li>
                  <li>Mundial: <b>+70</b> grupos · <b>+150</b> título · <b>+40</b> vice · <b>+25</b> 3º lugar</li>
                </ul>
                <div className="mt-2 text-xs text-white/80">Cada save joga <b>uma única campanha</b>. Quando acabar (título ou eliminação), a pontuação entra no <b>Ranking Global</b>.</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-300">🌳 Árvore do Técnico (progressão de conta)</div>
                <div className="mb-1 text-xs text-white/80">Você acumula <b>XP</b> jogando (títulos, campanhas concluídas, participações em copa). Gasta em <b>nós passivos</b> que valem pra <b>todos os saves</b>. São 2 árvores em sequência.</div>

                <div className="mt-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-2 text-[11px]">
                  <div className="font-semibold text-yellow-200">🌱 Árvore 1 · Técnico (~100 temporadas p/ 100%)</div>
                  <div className="mt-1">Dividida em 5 troncos, cada um com 5–6 nós baratos:</div>
                  <ul className="ml-4 list-disc space-y-0.5">
                    <li><b>Raiz &amp; Base</b> — confiança, treino, análise. <i>Ex.: cada nó +0,02 OVR no XI (soma 0,10 no tronco).</i></li>
                    <li><b>Corpo &amp; Saúde</b> — preparo físico, recuperação, nutrição. <i>Ex.: +0,01 OVR por nó (soma 0,04).</i></li>
                    <li><b>Tático</b> — 7 nós que aumentam o <b>bônus da formação que você escolher</b> (qualquer uma). Cada nó soma ~1–2% e o tronco fecha em <b>+10%</b>. Alguns ainda dão <b>+0,30 ATA contra times piores</b> e ~<b>4 gols a mais por temporada</b>.</li>
                    <li><b>Mental</b> — 6 nós de <b>−5% zebra</b> cada (total <b>−30%</b>); decisão/craque somam <b>+1,00 OVR em finais</b> e <b>+2 OVR</b> no craque do time em mata-mata de Copa.</li>
                    <li><b>Olheiro</b> — <b>Vestiário unido</b> (+0,05 OVR passivo), <b>+1 skip</b> por campanha, <b>+1 candidato</b> por posição aberta, revelar OVR decimal, ver próximo pool, +1 OVR a cada 5ª pick.</li>
                    <li><b>Legado</b> — <b>Estudante</b> +20% XP; <b>Ídolo eterno</b> dá <b>+0,10 OVR permanente a cada 10 títulos totais</b> (cap <b>+1,00</b>); <b>Mentor</b> = lenda bônus a cada 3 títulos.</li>
                  </ul>
                  <div className="mt-1 text-yellow-100/80"><b>Teto Árvore 1:</b> até <b>+1,25 OVR</b> médio (passivos +0,25 + Ídolo até +1,00) · <b>−30% zebra</b> · ~<b>+4 gols/temp</b> · <b>+0,30 ATA</b> vs times piores · <b>+1,00 OVR</b> em finais · <b>+2 OVR</b> craque em Copa · <b>+1 skip</b>.</div>
                </div>

                <div className="mt-2 rounded-lg border border-purple-500/40 bg-purple-500/10 p-2 text-[11px] text-purple-100">
                  <div className="font-semibold text-purple-200">🎓 Árvore 2 · Mestre Estrategista (~220 temporadas p/ 100%)</div>
                  <div className="mt-1"><b>Bloqueada até fechar 100% a Árvore 1.</b> Cada nó da 1 ganha um espelho "II" que <b>dobra exatamente o efeito</b> do original (+100%). Também tem <b>5 nós exclusivos</b>:</div>
                  <ul className="ml-4 list-disc space-y-0.5">
                    <li>🎥 <b>Análise de vídeo</b> — o bônus pós-derrota dura <b>2 jogos</b> no lugar de 1.</li>
                    <li>🔥 <b>Embalo vencedor</b> — emendou 3+ vitórias seguidas: seu time faz ~<b>4 gols a mais na temporada</b> enquanto a sequência viver.</li>
                    <li>🛋️ <b>Preparador mental</b> — quando está perdendo por 2+: ~<b>6 gols a mais na temporada</b> (ajuda em viradas).</li>
                    <li>🌍 <b>Vestiário blindado</b> — +0,05 OVR passivo adicional (soma <b>+0,10 OVR</b> com "Vestiário unido" da Árvore 1).</li>
                    <li>🧬 <b>DNA do clube</b> — cap do Ídolo eterno <b>dobra</b>, de <b>+1,00 pra +2,00 OVR</b>.</li>
                  </ul>
                  <div className="mt-1"><b>Adicional Árvore 2 (100%):</b> +0,25 OVR passivo · Ídolo cap +1,00 acima · <b>−30% zebra</b> extra · ~<b>+4 gols/temp</b> a mais · <b>+0,30 ATA</b> extra vs times piores · <b>+1,00 OVR</b> extra em finais · <b>+2 OVR</b> extra no craque · <b>+1 skip</b> extra · embalo/viradas novos.</div>
                </div>

                <div className="mt-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-[11px] text-emerald-100">
                  <div className="font-semibold text-emerald-200">✨ Se completar TUDO (Árvore 1 + 2 no 100%):</div>
                  <ul className="ml-4 list-disc space-y-0.5">
                    <li>Até <b>+2,50 OVR</b> médio constante no XI (passivos +0,50 + Ídolo até +2,00)</li>
                    <li><b>−60% chance de zebra</b> sofrida em mata-mata</li>
                    <li>~<b>+8 gols/temp</b> em finalização + ~<b>+4 gols</b> em sequências de vitória + ~<b>+6 gols</b> quando está perdendo por 2</li>
                    <li><b>+0,60 ATA</b> vs times 5+ OVR abaixo · <b>+2,00 OVR</b> em finais · <b>+4 OVR</b> no craque top em mata-mata de Copa</li>
                    <li><b>+2 skips</b> por campanha · <b>+2 candidatos</b> extras por posição no draft · revelar OVR decimal · ver próximo pool</li>
                  </ul>
                  <div className="mt-1 text-[10px] text-emerald-200/80">Exemplo prático: um XI base <b>OVR 82</b> vira <b>82,50</b> efetivo sem Ídolo carregado; com Ídolo cheio chega em ~<b>84,50</b>. Em confronto contra time OVR 77, o gap real chega em ~6,5 e a chance de zebra cai perto de zero.</div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-yellow-300">💾 Slots</div>
                <div>Você pode ter até <b>5 saves</b>. Cada nome aparece no ranking e não pode se repetir. No <b>Ranking de Jogadores</b> a pontuação da sua conta é a soma dos seus <b>3 melhores saves</b> — os outros aparecem mas não contam.</div>
              </div>
            </>)}

          </div>
        </div>
      </div>
    </div>
  );
}

function SoundToggle() {
  const [on, setOn] = useState(true);
  const [vol, setVol] = useState(0.75);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { setOn(isSfxEnabled()); setVol(getSfxVolume()); }, []);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: globalThis.MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const icon = !on || vol === 0 ? "🔇" : vol < 0.34 ? "🔈" : vol < 0.67 ? "🔉" : "🔊";
  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Ajustar som"
        className="sticker-icon-btn"
      >
        {icon}
      </button>

      {open && (
        <div className="sticker-card absolute right-0 z-50 mt-2 w-60 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-display tracking-wider">SOM</span>
            <button
              onClick={() => { const v = !on; setSfxEnabled(v); setOn(v); if (v) sfx.click(); }}
              className={`sticker-btn text-[10px] px-2 py-0.5 ${on ? "sticker-btn-gold" : ""}`}
            >
              {on ? "Ligado" : "Desligado"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">🔈</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(vol * 100)}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10) / 100;
                setVol(v);
                setSfxVolume(v);
                if (!on && v > 0) { setSfxEnabled(true); setOn(true); }
              }}
              onMouseUp={() => { if (on) sfx.click(); }}
              onTouchEnd={() => { if (on) sfx.click(); }}
              className="flex-1 accent-primary"
            />
            <span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground">{Math.round(vol * 100)}%</span>
          </div>
          <ChatVolumeRow />
        </div>
      )}

    </div>
  );
}

function ChatVolumeRow() {
  const [on, setOn] = useState(true);
  const [vol, setVol] = useState(0.7);
  useEffect(() => { setOn(isChatSfxEnabled()); setVol(getChatSfxVolume()); }, []);
  return (
    <div className="mt-3 border-t-2 border-black/60 pt-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-display tracking-wider">💬 CHAT</span>
        <button
          onClick={() => { const v = !on; setChatSfxEnabled(v); setOn(v); if (v) sfx.chatPing(); }}
          className={`sticker-btn text-[10px] px-2 py-0.5 ${on ? "sticker-btn-emerald" : ""}`}
        >
          {on ? "Ligado" : "Desligado"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs">🔔</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(vol * 100)}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10) / 100;
            setVol(v);
            setChatSfxVolume(v);
            if (!on && v > 0) { setChatSfxEnabled(true); setOn(true); }
          }}
          onMouseUp={() => { if (on) sfx.chatPing(); }}
          onTouchEnd={() => { if (on) sfx.chatPing(); }}
          className="flex-1 accent-emerald-500"
        />
        <span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground">{Math.round(vol * 100)}%</span>
      </div>
      <div className="mt-1 text-[10px] text-muted-foreground">Notificação quando alguém envia uma mensagem no chat global.</div>
    </div>
  );
}

function HeaderChatLink() {
  const unread = useChatUnread();
  return (
    <Link
      to="/chat"
      title="Chat global"
      className="sticker-icon-btn sticker-icon-btn-emerald relative"
    >
      💬
      {unread > 0 && (
        <span className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-black bg-red-500 px-1 text-[9px] font-bold text-white shadow-[0_1px_0_#000] animate-pulse">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </Link>
  );
}




import { Crest } from "@/components/Crest";
import { fetchRanking, fetchUserRanking, fetchAccountRanking, fetchBadgeRanking, type RankingEntry, type SaveMode, type UserRankingEntry, type AccountRankingEntry, type BadgeRankingEntry } from "@/lib/saves";
import { RecordsBoard } from "@/routes/ranking";
import { BADGES } from "@/lib/badges";

function TeamBadge({ short, color, color2, name, size = 40, bare = false }: { short: string; color: string; color2?: string; name?: string; size?: number; bare?: boolean }) {
  const c2 = color2 && color2.toLowerCase() !== color.toLowerCase() ? color2 : "#ffffff";
  // Escudo do jogador ("VOC") sempre em estilo monograma fixo, sem casar
  // acidentalmente com clube real ou virar símbolo aleatório.
  if (bare) {
    return (
      <span className="inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <Crest colors={[color, c2]} short={short} name={name} size={size} player={short === "VOC"} />
      </span>
    );
  }
  return (
    <span className="crest-frame" style={{ width: size + 6, height: size + 6 }}>
      <Crest colors={[color, c2]} short={short} name={name} size={size} player={short === "VOC"} />
    </span>
  );
}

// Escudo clicável: abre o modal do elenco daquele time sem sair da tela nem
// pausar/reiniciar a partida em andamento. Usado durante a partida ao vivo e
// nas telas de resultado (vitória/empate/derrota).
function ClickableCrest({
  short, color, name, size = 52, players, overall, label, tactics, ratingsOverride,
}: {
  short: string; color: string; name: string; size?: number;
  players: Player[]; overall?: number; label?: string; tactics?: TeamTactics;
  ratingsOverride?: { atk: number; def: number; ovr?: number };
}) {
  const [open, setOpen] = useState(false);
  const has = players.length > 0;
  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); if (has) setOpen(true); }}
        disabled={!has}
        title={has ? `Ver elenco de ${name}` : name}
        className={`flex flex-col items-center gap-1 rounded-lg p-0.5 transition ${has ? "cursor-pointer hover:bg-white/10" : "cursor-default"}`}
      >
        <TeamBadge short={short} color={color} name={name} size={size} />
        <div className="text-[11px] text-white truncate max-w-[90px]">{name}</div>
        {has && <div className="text-[9px] text-white/60">👁 elenco</div>}
      </button>
      {open && (
        <OpponentSquadModal
          name={name} short={short} color={color}
          overall={overall} players={players}
          label={label ?? "Elenco"}
          tactics={tactics}
          ratingsOverride={ratingsOverride}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

// Resolve o elenco/overall do adversário da última partida a partir do save,
// para permitir clicar no escudo dele nas telas de resultado.
function resolveOppFromMatch(state: SavedState, m: MatchResult): { name: string; short: string; color: string; players: Player[]; overall?: number } {
  const playerIsHome = m.homeShort === "VOC";
  const name = playerIsHome ? m.away : m.home;
  const short = playerIsHome ? m.awayShort : m.homeShort;
  const color = playerIsHome ? m.awayColor : m.homeColor;
  let players: Player[] = [];
  let isBrasileirao = false;
  const matchKind = m.label?.includes("Mundial")
    ? "mundial"
    : m.label?.includes("Libertadores")
      ? "libertadores"
      : m.label?.includes("Sul-Americana")
        ? "sulamericana"
        : undefined;
  // Histórico continental salvo: usa primeiro a competição gravada no rótulo da
  // partida. Isso preserva o OVR correto de brasileiros no Mundial (+4) sem
  // cair no elenco do Brasileirão (+3), e evita colisão de clubes como Napoli.
  if (matchKind) {
    const full = allTeamsPool(matchKind).find((it) => it.name === name);
    if (full) players = full.players ?? [];
  }
  // Brasileirão / fallback nacional
  const t = TEAMS.find((x) => x.name === name);
  if (players.length === 0 && t) { players = (t.players ?? []).filter((p) => p.reserve === undefined); isBrasileirao = true; }
  // Competição continental — mata-mata
  if (players.length === 0 && state.comp?.currentKO?.rival?.name === name) {
    players = state.comp.currentKO.rival.players ?? [];
  }
  // Competição continental — grupos (busca elenco real via pool)
  if (players.length === 0 && state.comp) {
    const g = state.comp.group.teams.find((x) => x.name === name);
    if (g) {
      const full = allTeamsPool(state.comp.kind).find((it) => it.name === name);
      if (full) players = full.players ?? [];
    }
  }
  // Fallback: partidas antigas (competição já encerrada / outra copa). Procura
  // em todos os pools internacionais pelo nome do adversário.
  if (players.length === 0) {
    for (const kind of ["mundial", "libertadores", "sulamericana"] as const) {
      const full = allTeamsPool(kind).find((it) => it.name === name);
      if (full) { players = full.players ?? []; break; }
    }
  }
  // Aplica o buff dos adversários do Brasileirão pra que o OVR mostrado
  // (tela de resultado, escudo, elenco) bata com o OVR realmente usado
  // na simulação.
  if (isBrasileirao) {
    const buff = brasileiraoOpponentBuff(state);
    if (buff > 0) players = players.map((p) => ({ ...p, overall: Math.min(99, p.overall + buff) }));
  }
  // Variação persistente por temporada (-3..+3 OVR) — todos os campeonatos.
  players = withOpponentVariance(state, name, players);
  const overall = players.length > 0 ? teamOverall(players) : undefined;
  return { name, short, color, players, overall };
}

// Modal do ranking global. Aberto por um botão (não navegação), então a
// tela atual não é desmontada — a partida ao vivo continua rodando por baixo.
function extractSquadFromGameState(gameState: unknown): Player[] {
  const picks = (gameState as { picks?: Array<{ player?: Player }> } | null)?.picks;
  if (!Array.isArray(picks)) return [];
  return picks.map((p) => p?.player).filter((p): p is Player => !!p && typeof p.overall === "number");
}
function extractCrestConfig(gameState: unknown): CrestConfig | null {
  const gs = gameState as { crestConfig?: CrestConfig | null } | null;
  return gs?.crestConfig ?? null;
}
function PlayerCrestBadge({ name, size = 40, config }: { name: string; size?: number; config?: CrestConfig | null }) {
  // Isola do contexto ambiente do jogador atual: sem esse Provider, saves sem
  // crestConfig herdariam o brasão do usuário logado e todos ficariam iguais.
  return (
    <PlayerCrestProvider config={config ?? null}>
      <Crest colors={["#facc15", "#ffffff"]} short="VOC" name={name} size={size} player config={config ?? undefined} />
    </PlayerCrestProvider>
  );
}


function RankingSquadModal({ entry, onClose }: { entry: RankingEntry; onClose: () => void }) {
  const squad = useMemo(() => extractSquadFromGameState(entry.game_state), [entry.game_state]);
  const tactics = useMemo(() => {
    const gs = entry.game_state as { formation?: FormationId; tactic?: TacticStyle } | null;
    return gs?.formation ? { formation: gs.formation, style: (gs.tactic ?? DEFAULT_TACTIC) as TacticStyle } : undefined;
  }, [entry.game_state]);
  const ratings = useMemo(() => teamRatings(squad, tactics), [squad, tactics]);
  const ovr = useMemo(() => teamOverall(squad), [squad]);
  const sorted = useMemo(() => {
    const posOrder: Record<Position, number> = { GOL: 0, ZAG: 1, MEI: 2, ATA: 3 };
    return [...squad].sort((a, b) => {
      const d = posOrder[a.position] - posOrder[b.position];
      return d !== 0 ? d : b.overall - a.overall;
    });
  }, [squad]);
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-black/70 p-3 animate-fade-in" onClick={onClose}>
      <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-card p-4 card-glow" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex shrink-0 items-start gap-3">
          <PlayerCrestBadge name={entry.team_name} size={48} config={extractCrestConfig(entry.game_state)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 truncate font-display text-xl">
              <LiveDot updatedAt={entry.updated_at} />
              <span className="truncate">{entry.team_name || "—"}</span>
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {entry.username ? <>👤 <span className="text-foreground">{entry.username}</span> · </> : null}
              Save "{entry.display_name}" · {entry.mode === "classico" ? "Clássico" : "Casual"}
            </div>
            {formatCreatedAt(entry.created_at) && (
              <div className="mt-0.5 text-[10px] text-muted-foreground">📅 Criado em {formatCreatedAt(entry.created_at)}</div>
            )}
          </div>

          <button onClick={onClose} className="shrink-0 sticker-close">Fechar</button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {entry.stats?.achievements?.length ? (
            <div className="mb-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
              <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Campanha</div>
              <AchievementChips items={entry.stats.achievements} size="sm" />
            </div>
          ) : null}
          {(() => {
            const gs = entry.game_state as { formation?: FormationId; tactic?: TacticStyle } | null;
            return <TacticsBadge formation={gs?.formation} tactic={gs?.tactic} />;
          })()}
          {squad.length === 0 ? (
            <div className="rounded-lg bg-secondary/40 p-4 text-center text-sm text-muted-foreground">Escalação indisponível para este save.</div>
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

type RankingTab = "casual" | "classico" | "hard" | "players" | "account" | "badges" | "records";

function RankingModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<RankingTab>("casual");
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [users, setUsers] = useState<UserRankingEntry[]>([]);
  const [accounts, setAccounts] = useState<AccountRankingEntry[]>([]);
  const [badges, setBadges] = useState<BadgeRankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true); setError(null); setOpenId(null);
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
      import("@/lib/saves").then(({ fetchRecordsEntries }) => {
        fetchRecordsEntries(2000)
          .then(setEntries)
          .catch((e) => setError(e instanceof Error ? e.message : String(e)))
          .finally(() => setLoading(false));
      });

    } else {
      fetchRanking(50, tab as SaveMode)
        .then(setEntries)
        .catch((e) => setError(e instanceof Error ? e.message : String(e)))
        .finally(() => setLoading(false));
    }
  }, [tab]);
  const openEntry = openId ? entries.find((e) => e.id === openId) ?? null : null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-xl card-glow flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Ranking</div>
            <div className="cartoon-title text-2xl">Global</div>
          </div>
          <button onClick={onClose} className="sticker-close">Fechar</button>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-secondary/40 p-1 sm:grid-cols-3">
            <button onClick={() => setTab("casual")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "casual" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >Casual</button>
            <button onClick={() => setTab("classico")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "classico" ? "bg-yellow-500 text-black" : "text-muted-foreground"}`}
            >Clássico 🏆</button>
            <button onClick={() => setTab("hard")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "hard" ? "bg-red-600 text-white" : "text-muted-foreground"}`}
            >Hard 🔥</button>
            <button onClick={() => setTab("players")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "players" ? "bg-emerald-500 text-black" : "text-muted-foreground"}`}
            >👥 Jogadores</button>
            <button onClick={() => setTab("account")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "account" ? "bg-fuchsia-500 text-white" : "text-muted-foreground"}`}
            >🏛️ Conta</button>
            <button onClick={() => setTab("badges")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "badges" ? "bg-orange-500 text-black" : "text-muted-foreground"}`}
            >🏅 Medalhas</button>
            <button onClick={() => setTab("records")}
              className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${tab === "records" ? "bg-red-500 text-white" : "text-muted-foreground"}`}
            >🏆 Recordes</button>

          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {loading && <div className="p-6 text-center text-sm text-muted-foreground">Carregando…</div>}
          {error && <div className="rounded-lg bg-red-500/15 p-3 text-sm text-red-300">{error}</div>}
          {!loading && !error && tab === "players" && users.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">Nenhum jogador com saves ainda.</div>
          )}
          {!loading && !error && tab === "players" && users.length > 0 && (
            <ol className="space-y-1.5">
              {users.map((u, i) => {
                const pos = i + 1;
                const podium = pos === 1 ? "border-yellow-400/60 bg-yellow-400/10" : pos === 2 ? "border-zinc-300/40 bg-zinc-300/10" : pos === 3 ? "border-amber-700/40 bg-amber-700/10" : "border-border bg-card";
                return (
                  <li key={u.user_id} className={`rounded-lg border p-2 ${podium}`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-6 shrink-0 text-center font-display text-lg ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-sm">👤</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="truncate font-display text-sm">{u.username}</div>
                          <div className="shrink-0 rounded-md bg-primary/25 px-1.5 py-0.5 font-display text-xs text-primary">{u.total_score} pts</div>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {u.slot_count} save{u.slot_count === 1 ? "" : "s"} · soma dos <b>3 melhores</b> · melhor {u.best_score} pts
                        </div>
                        <div className="mt-1 space-y-1">
                          {u.slots.map((s, idx) => {
                            const counts = idx < 3;
                            const created = formatCreatedAt(s.created_at);
                            return (
                              <div key={idx} className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[10px] ${counts ? "bg-primary/10 ring-1 ring-primary/30" : "bg-secondary/40 opacity-70"}`}>
                                <LiveDot updatedAt={s.updated_at} size="xs" />
                                {counts && <span className="shrink-0 rounded bg-primary/30 px-1 font-display text-[9px] text-primary">TOP{idx + 1}</span>}
                                <div className="min-w-0 flex-1">
                                  <div className="truncate font-semibold">{s.team_name || s.display_name || "—"}</div>
                                  {created && <div className="truncate text-[9px] text-muted-foreground">📅 {created}</div>}
                                </div>
                                <span className={`rounded px-1 py-0.5 text-[9px] font-semibold uppercase ${s.mode === "classico" ? "bg-yellow-500/20 text-yellow-300" : "bg-blue-500/20 text-blue-200"}`}>
                                  {s.mode === "classico" ? "Clássico" : "Casual"}
                                </span>
                                <span className="rounded bg-primary/20 px-1 py-0.5 font-display text-primary">{s.score}</span>
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
          )}
          {!loading && !error && tab === "account" && accounts.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">Nenhum título registrado ainda. Ganhe (ou fique no pódio de) Mundial, Libertadores, Brasileirão ou Sul-Americana pra aparecer aqui.</div>
          )}
          {!loading && !error && tab === "account" && accounts.length > 0 && (
            <ol className="space-y-3">
              {accounts.map((r, i) => {
                const pos = i + 1;
                const podium = pos === 1
                  ? "border-yellow-400/70 bg-gradient-to-br from-yellow-500/15 via-amber-500/10 to-transparent shadow-[0_0_24px_-8px_rgba(250,204,21,0.5)]"
                  : pos === 2
                  ? "border-zinc-300/50 bg-gradient-to-br from-zinc-300/15 to-transparent"
                  : pos === 3
                  ? "border-amber-700/50 bg-gradient-to-br from-amber-700/15 to-transparent"
                  : "border-border bg-card";
                const comps: Array<{ key: "mundial" | "libertadores" | "brasileirao" | "sulamericana"; label: string; emoji: string; accent: string }> = [
                  { key: "mundial", label: "Mundial", emoji: "🌍", accent: "from-fuchsia-500/25 to-purple-500/10 border-fuchsia-400/40" },
                  { key: "libertadores", label: "Libertadores", emoji: "🏆", accent: "from-emerald-500/25 to-teal-500/10 border-emerald-400/40" },
                  { key: "brasileirao", label: "Brasileirão", emoji: "🇧🇷", accent: "from-yellow-500/25 to-amber-500/10 border-yellow-400/40" },
                  { key: "sulamericana", label: "Sul-Americana", emoji: "🥉", accent: "from-sky-500/25 to-blue-500/10 border-sky-400/40" },
                ];
                return (
                  <li key={r.user_id} className={`rounded-2xl border-2 p-4 ${podium}`}>
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 font-display text-2xl ${pos === 1 ? "border-yellow-400 bg-yellow-500/20 text-yellow-300" : pos === 2 ? "border-zinc-300 bg-zinc-400/20 text-zinc-100" : pos === 3 ? "border-amber-700 bg-amber-700/20 text-amber-200" : "border-border bg-secondary text-foreground"}`}>
                        {pos}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-display text-lg leading-tight">{r.username}</div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Ranking de Conta</div>
                      </div>
                      <div className="shrink-0 rounded-xl bg-fuchsia-500/25 px-3 py-1.5 text-center">
                        <div className="font-display text-xl leading-none text-fuchsia-100">{r.total_score}</div>
                        <div className="text-[9px] uppercase tracking-wider text-fuchsia-300">pontos</div>
                      </div>
                    </div>

                    {/* Trophy grid */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {comps.map((c) => {
                        const p1 = (r[`${c.key}_1` as keyof AccountRankingEntry] as number) || 0;
                        const p2 = (r[`${c.key}_2` as keyof AccountRankingEntry] as number) || 0;
                        const p3 = (r[`${c.key}_3` as keyof AccountRankingEntry] as number) || 0;
                        const total = p1 + p2 + p3;
                        const dim = total === 0 ? "opacity-40" : "";
                        return (
                          <div key={c.key} className={`rounded-xl border bg-gradient-to-br p-2.5 ${c.accent} ${dim}`}>
                            <div className="flex items-center gap-1.5">
                              <span className="text-base">{c.emoji}</span>
                              <span className="truncate font-display text-[12px] leading-tight">{c.label}</span>
                            </div>
                            <div className="mt-2 flex items-end justify-between gap-1">
                              <div className="flex flex-col items-center rounded-lg bg-yellow-500/20 px-1.5 py-1 flex-1">
                                <span className="text-sm leading-none">🥇</span>
                                <span className="mt-0.5 font-display text-sm leading-none text-yellow-200">{p1}</span>
                              </div>
                              <div className="flex flex-col items-center rounded-lg bg-zinc-300/15 px-1.5 py-1 flex-1">
                                <span className="text-sm leading-none">🥈</span>
                                <span className="mt-0.5 font-display text-sm leading-none text-zinc-100">{p2}</span>
                              </div>
                              <div className="flex flex-col items-center rounded-lg bg-amber-700/25 px-1.5 py-1 flex-1">
                                <span className="text-sm leading-none">🥉</span>
                                <span className="mt-0.5 font-display text-sm leading-none text-amber-200">{p3}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          {!loading && !error && tab === "badges" && badges.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">Ninguém conquistou medalhas ainda. Vá lá e ganhe o Mundial! 🏅</div>
          )}
          {!loading && !error && tab === "badges" && badges.length > 0 && (
            <ol className="space-y-2">
              {badges.map((r, i) => {
                const pos = i + 1;
                const podium = pos === 1 ? "border-yellow-400/60 bg-yellow-400/10" : pos === 2 ? "border-zinc-300/50 bg-zinc-300/10" : pos === 3 ? "border-amber-700/50 bg-amber-700/10" : "border-border bg-card";
                return (
                  <li key={r.user_id} className={`rounded-xl border p-3 ${podium}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 shrink-0 text-center font-display text-2xl ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="min-w-0 flex-1 truncate font-display text-base gold-text">👤 {r.username}</div>
                          <div className="shrink-0 rounded-md bg-orange-500/25 px-2 py-0.5 font-display text-sm text-orange-200">{r.badge_count}/{MAX_BADGES}</div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {BADGES.map((b) => {
                            const on = r.badges.some((x) => x.badge_key === b.key);
                            if (!on) return null;
                            return <BadgeMedal key={b.key} badge={b} size={40} />;
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          {!loading && !error && tab === "records" && <RecordsBoard entries={entries} />}
          {!loading && !error && tab !== "players" && tab !== "account" && tab !== "badges" && tab !== "records" && entries.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">Ninguém no ranking ainda.</div>
          )}
          {!loading && !error && tab !== "players" && tab !== "account" && tab !== "badges" && tab !== "records" && entries.length >= 3 && (
            <div className="mb-3 rounded-2xl comp-hero border border-yellow-400/30 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent p-3">
              <div className="mb-2 text-center text-[10px] uppercase tracking-widest text-yellow-300/80">Pódio Global</div>
              <div className="flex items-end justify-center gap-2">
                {([1, 0, 2] as const).map((idx) => {
                  const e = entries[idx];
                  const place = (idx + 1) as 1 | 2 | 3;
                  const heights = { 1: 92, 2: 70, 3: 54 } as const;
                  const podiumCls = place === 1 ? "podium-1" : place === 2 ? "podium-2" : "podium-3";
                  const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉";
                  const delay = place === 1 ? 0.15 : place === 2 ? 0 : 0.3;
                  return (
                    <button key={e.id} onClick={() => setOpenId(e.id)} className="flex w-1/3 max-w-[100px] flex-col items-center animate-podium-rise" style={{ animationDelay: `${delay}s` }}>
                      <div className="text-xl">{medal}</div>
                      <PlayerCrestBadge name={e.team_name} size={38} config={extractCrestConfig(e.game_state)} />
                      <div className="mt-1 w-full truncate text-center font-display text-[11px]">{e.team_name || "—"}</div>
                      <div className="text-[10px] text-primary font-display">{e.score} pts</div>
                      <div className={`mt-1 flex w-full items-start justify-center rounded-t-lg ${podiumCls} text-black`} style={{ height: heights[place] }}>
                        <div className="mt-1 font-display text-xl">{place}º</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {!loading && !error && tab !== "players" && tab !== "account" && tab !== "badges" && tab !== "records" && (
          <ol className="space-y-1.5">
            {entries.map((e, i) => {
              const pos = i + 1;
              const s = e.stats ?? ({} as RankingEntry["stats"]);
              const podium = pos === 1 ? "border-yellow-400/60 bg-yellow-400/10" : pos === 2 ? "border-zinc-300/40 bg-zinc-300/10" : pos === 3 ? "border-amber-700/40 bg-amber-700/10" : "border-border bg-card";
              const hasSquad = extractSquadFromGameState(e.game_state).length > 0;
              return (
                <li key={e.id} className={`rounded-lg border p-2 ${podium}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 shrink-0 text-center font-display text-lg ${pos <= 3 ? "gold-text" : ""}`}>{pos}</div>
                    <PlayerCrestBadge name={e.team_name} size={32} config={extractCrestConfig(e.game_state)} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="min-w-0 flex-1 flex items-center gap-1.5 truncate font-display text-sm gold-text">
                          <LiveDot updatedAt={e.updated_at} />
                          <span className="truncate">{e.team_name || "—"}</span>
                        </div>
                        <div className="shrink-0 rounded-md bg-primary/20 px-1.5 py-0.5 font-display text-xs text-primary">{e.score} pts</div>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 truncate text-[10px] text-muted-foreground">
                        <span className="truncate">
                          {e.username ? <>👤 <span className="text-foreground/90">{e.username}</span></> : e.display_name}
                        </span>
                        {formatCreatedAt(e.created_at) && (
                          <span className="shrink-0 inline-flex items-center gap-0.5 rounded-full border border-border/50 bg-black/25 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                            📅 {formatCreatedAt(e.created_at)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        disabled={!hasSquad}
                        onClick={() => hasSquad && setOpenId(e.id)}
                        className={`mt-1 block max-w-full truncate text-left text-[10px] ${hasSquad ? "text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80" : "text-muted-foreground cursor-default"}`}
                        title={hasSquad ? "Ver escalação, ataque e defesa" : undefined}
                      >
                        Save "{e.display_name}"{hasSquad ? " · 👁 ver elenco" : ""}
                      </button>
                      {s.achievements?.length ? (
                        <div className="mt-1">
                          <AchievementChips items={s.achievements} size="xs" />
                        </div>
                      ) : null}
                      <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
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
        </div>
      </div>
      {openEntry && <RankingSquadModal entry={openEntry} onClose={() => setOpenId(null)} />}
    </div>
  );
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

function OvrChip({ ovr, precise }: { ovr: number; precise?: boolean }) {
  const color = ovr >= 85 ? "bg-yellow-400 text-black" : ovr >= 80 ? "bg-emerald-400 text-black" : "bg-white/90 text-black";
  const shown = precise ? ovr.toFixed(1) : Math.round(ovr).toString();
  return <span className={`rounded-md border-2 border-black px-2 py-0.5 font-display text-sm shadow-[0_2px_0_#000] ${color}`}>{shown}</span>;
}

// Chips ATK / DEF mostrando a força ofensiva e defensiva do time (setores
// ponderados). Usado nas telas de próxima partida e no modal do adversário.
function RatingChips({ players, compact = false, tactics, override }: { players: Player[]; compact?: boolean; tactics?: TeamTactics; override?: { atk: number; def: number } }) {
  const base = teamRatings(players, tactics);
  const t = tactics ?? (players.length ? deriveTacticsForSquad(players) : undefined);
  const ctx = t ? contextualTrait(t.formation, { strengthGap: 0, half: 1 }) : { atkAdd: 0, defAdd: 0 };
  const atk = override?.atk ?? (base.atk + ctx.atkAdd);
  const def = override?.def ?? (base.def + ctx.defAdd);

  const pill = (label: string, val: number, tone: string) => (
    <span className={`rounded-md border-2 border-black px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide shadow-[0_2px_0_#000] ${tone}`}>
      {label} <span className="font-display text-xs">{Math.round(val)}</span>
    </span>
  );
  return (
    <div className={`flex items-center justify-center gap-1 ${compact ? "" : "mt-1"}`}>
      {pill("ATA", atk, "bg-red-500 text-white")}
      {pill("DEF", def, "bg-blue-500 text-white")}
    </div>
  );
}

// Painel compacto com ATA / DEF / OVR do time em construção. Aparece no draft
// e no bônus pra você ver como cada troca muda a força do time. Mostra também
// "escalados X/11" enquanto não fecha os 11.
function SquadRatingPanel({ picks, formation, tactic }: { picks: DraftPick[]; formation: FormationId; tactic?: TacticStyle }) {
  const squad = squadWithFitPenalty(picks, formation);
  const filled = picks.length;
  const complete = filled >= SQUAD_SIZE;
  const r = complete ? teamRatings(squad, { formation, style: tactic ?? DEFAULT_TACTIC }) : null;
  const done = filled >= SQUAD_SIZE;
  return (
    <div className="mb-3 flex items-center justify-between gap-2 sticker-card p-2.5">
      <div>
        <div className="ribbon-tag text-[9px]">Seu time</div>
        <div className={`mt-1 text-[10px] font-black uppercase tracking-wider ${done ? "text-emerald-300" : "text-white/85"}`}>
          {filled}/{SQUAD_SIZE} escalados
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="rounded-md border-2 border-black bg-red-500 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-[0_2px_0_#000]">ATA <span className="font-display text-xs">{r ? Math.round(r.atk) : "—"}</span></span>
        <span className="rounded-md border-2 border-black bg-blue-500 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-[0_2px_0_#000]">DEF <span className="font-display text-xs">{r ? Math.round(r.def) : "—"}</span></span>
        <span className="rounded-md border-2 border-black bg-yellow-400 px-2 py-0.5 font-display text-sm text-black shadow-[0_2px_0_#000]">OVR {r ? Math.round(r.ovr) : "—"}</span>
      </div>
    </div>
  );
}

/* ─────────────  Opponent squad modal  ───────────── */

function OpponentSquadModal({
  name, short, color, overall, players, onClose, label, tactics, ratingsOverride,
}: {
  name: string; short: string; color: string; overall?: number; players: Player[]; onClose: () => void; label?: string; tactics?: TeamTactics; ratingsOverride?: { atk: number; def: number; ovr?: number };
}) {
  // O modal deve mostrar exatamente o mesmo elenco que a tela chamadora está
  // usando (pré-jogo, tabela, ao vivo ou histórico). Não reidratamos por nome,
  // porque o mesmo clube pode ter versões diferentes por competição.
  const livePlayers = useMemo<Player[]>(() => {
    if (short === "VOC") return players;
    const base = players.filter((p) => p.reserve === undefined);

    // Aplica um delta visual quando o `overall` passado (do pool ativo da
    // competição) difere do OVR reidratado — cobre times brasileiros
    // buffados no Brasileirão/continental e também times internacionais
    // (Libertadores, Sula, Mundial) cujo pool já vem com ajustes.
    if (overall === undefined || base.length === 0) return base;
    const baseOverall = teamOverall(base);
    const visualDelta = Math.round(overall - baseOverall);
    if (visualDelta === 0) return base;
    return base.map((p) => ({ ...p, overall: Math.max(40, Math.min(99, p.overall + visualDelta)) }));
  }, [name, short, players, overall]);
  const liveOverall = useMemo(() => {
    if (short === "VOC") return overall;
    return livePlayers.length > 0 ? teamOverall(livePlayers) : overall;
  }, [short, overall, livePlayers]);
  const posOrder: Record<Position, number> = { GOL: 0, ZAG: 1, MEI: 2, ATA: 3 };
  const sorted = [...livePlayers].sort((a, b) => {
    const d = posOrder[a.position] - posOrder[b.position];
    return d !== 0 ? d : b.overall - a.overall;
  });
  return createPortal((

    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-fade-in" onClick={onClose}>
      <div className="flex h-full w-full flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
          <TeamBadge short={short} color={color} name={name} size={44} />
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-xl">{name}</div>
            <div className="text-xs text-muted-foreground">{label ?? "Elenco"}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {(ratingsOverride?.ovr ?? liveOverall) !== undefined && <OvrChip ovr={Math.round(ratingsOverride?.ovr ?? liveOverall!)} />}
            {livePlayers.length > 0 && <RatingChips players={livePlayers} compact tactics={tactics} override={ratingsOverride} />}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="ml-1 sticker-icon-btn h-10 w-10"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 space-y-1.5 overflow-y-auto px-4 py-4">
          {sorted.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{p.name}{p.legend ? " 👑" : ""}</div>
                <div className="mt-0.5"><PositionBadge p={p.position} /></div>
              </div>
              <OvrChip ovr={p.overall} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ), document.body);

}


/* ─────────────  Live match simulation  ───────────── */


interface Kick { name: string; scored: boolean; kickerOvr?: number; gkOvr?: number }
export interface Shootout {
  playerKicks: Kick[];
  rivalKicks: Kick[];
  playerWon: boolean;
}

function simulateShootout(playerSquad: Player[], rivalSquad: Player[]): Shootout {
  // Escolhe os 5 melhores batedores do XI (ATA e MEI têm prioridade), mais 5 reservas
  // pra caso vá pra morte súbita. Ordem realista: melhores primeiro, mas com pequena
  // variação pra não ficar sempre igual.
  const kickers = (sq: Player[]): Player[] => {
    const outfield = sq.filter((p) => p.position !== "GOL");
    const weight = (p: Player) => {
      const posBonus = p.position === "ATA" ? 6 : p.position === "MEI" ? 3 : p.position === "ZAG" ? 0 : -2;
      return p.overall + posBonus + Math.random() * 2;
    };
    return [...outfield].sort((a, b) => weight(b) - weight(a));
  };
  const gkOf = (sq: Player[]): Player => {
    const gks = sq.filter((p) => p.position === "GOL");
    if (!gks.length) return { name: "Goleiro", position: "GOL", overall: 72, roles: ["GOL"] } as Player;
    return [...gks].sort((a, b) => b.overall - a.overall)[0];
  };
  const kP = kickers(playerSquad), kR = kickers(rivalSquad);
  const gkP = gkOf(playerSquad), gkR = gkOf(rivalSquad);
  // Probabilidade de gol combina qualidade do batedor e do goleiro adversário.
  // Escala CONTÍNUA: cada ponto de overall do goleiro (e do batedor) muda a
  // probabilidade sem "degraus". Referência: batedor 78 vs goleiro 78 → 75%.
  // Cada +1 do batedor ≈ +1.1pp. Cada +1 do goleiro ≈ −1.3pp (goleiros pesam
  // um pouco mais nos pênaltis). Range: GK 70 defende ~pouco, GK 94 sufoca.
  const scoreProb = (kickerOvr: number, gkOvr: number) => {
    const base = 0.75;
    const kickerAdj = (kickerOvr - 78) * 0.011;
    const gkAdj = (gkOvr - 78) * 0.013;
    return Math.max(0.22, Math.min(0.96, base + kickerAdj - gkAdj));
  };
  const playerKicks: Kick[] = [];
  const rivalKicks: Kick[] = [];
  let ps = 0, rs = 0, i = 0;
  const fallback: Player = { name: "Jogador", position: "MEI", overall: 75, roles: ["MEI"] } as Player;
  // "Sangue-frio" (mental.sangue): +penaltyBoost na conversão dos batedores do jogador.
  const penBonus = getActiveCoachEffects().penaltyBoost;
  while (true) {
    const kp = kP[i % Math.max(1, kP.length)] ?? fallback;
    const scoredP = Math.random() < Math.min(0.98, scoreProb(kp.overall, gkR.overall) + penBonus);
    playerKicks.push({ name: kp.name, scored: scoredP, kickerOvr: kp.overall, gkOvr: gkR.overall });
    if (scoredP) ps++;
    if (i < 5) {
      const remainingRival = 5 - rivalKicks.length;
      if (rs + remainingRival < ps) break;
    }
    const kr = kR[i % Math.max(1, kR.length)] ?? fallback;
    const scoredR = Math.random() < scoreProb(kr.overall, gkP.overall);
    rivalKicks.push({ name: kr.name, scored: scoredR, kickerOvr: kr.overall, gkOvr: gkP.overall });
    if (scoredR) rs++;
    if (i < 5) {
      const remainingPlayer = 4 - i;
      if (ps + remainingPlayer < rs) { i++; break; }
    }
    i++;
    if (i >= 5 && ps !== rs) break;
    if (i > 20) break;
  }
  return { playerKicks, rivalKicks, playerWon: ps > rs };
}

function LiveMatch({
  match,
  shootout,
  onFinish,
  homeSquad,
  awaySquad,
  homeOverall,
  awayOverall,
  playerTactics: pTac,
}: {
  match: MatchResult;
  shootout?: Shootout | null;
  onFinish: () => void;
  homeSquad?: Player[];
  awaySquad?: Player[];
  homeOverall?: number;
  awayOverall?: number;
  playerTactics?: TeamTactics;
}) {

  const stoppage1 = useMemo(() => 1 + Math.floor(Math.random() * 3), []);
  const stoppage2 = useMemo(() => 1 + Math.floor(Math.random() * 4), []);
  const firstEnd = 45 + stoppage1;
  const totalMin = firstEnd + 45 + stoppage2;

  const events = useMemo(() => {
    const scorers = match.scorers ?? [];
    const used = new Set<number>();
    return scorers
      .map((s) => {
        let m = 0;
        for (let tries = 0; tries < 20; tries++) {
          m = 1 + Math.floor(Math.random() * totalMin);
          if (!used.has(m)) break;
        }
        used.add(m);
        return { minute: m, scorer: s };
      })
      .sort((a, b) => a.minute - b.minute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState<"first" | "ht" | "second" | "ft" | "pens" | "done">("first");
  const [penStep, setPenStep] = useState(0);
  const [penRevealed, setPenRevealed] = useState(false);
  const [speed, setSpeedState] = useState<1 | 2 | 4>(() => {
    if (typeof window === "undefined") return 1;
    const v = Number(window.localStorage.getItem("matchSpeed"));
    return v === 2 || v === 4 ? (v as 2 | 4) : 1;
  });
  const setSpeed = (v: 1 | 2 | 4) => {
    setSpeedState(v);
    if (typeof window !== "undefined") window.localStorage.setItem("matchSpeed", String(v));
  };
  // Nos pênaltis usa um ritmo fixo bem mais lento, independente do 1x/2x/4x,
  // pra dar tempo de acompanhar cobrança, resultado e histórico antes da próxima batida.
  const effectiveSpeed = phase === "pens" ? 0.35 : speed;
  const sp = (ms: number) => Math.max(30, Math.round(ms / effectiveSpeed));


  const playerIsHome = match.homeShort === "VOC";
  const penEvents = useMemo(() => {
    if (!shootout) return [];
    const home = playerIsHome ? shootout.playerKicks : shootout.rivalKicks;
    const away = playerIsHome ? shootout.rivalKicks : shootout.playerKicks;
    const arr: { side: "home" | "away"; kick: Kick; idxInSide: number }[] = [];
    const max = Math.max(home.length, away.length);
    for (let i = 0; i < max; i++) {
      if (home[i]) arr.push({ side: "home", kick: home[i], idxInSide: i });
      if (away[i]) arr.push({ side: "away", kick: away[i], idxInSide: i });
    }
    return arr;
  }, [shootout, playerIsHome]);

  // kickoff whistle
  useEffect(() => { sfx.whistle(); }, []);

  useEffect(() => {
    if (phase === "done") { onFinish(); return; }
    if (phase === "ht") {
      sfx.whistle();
      const t = setTimeout(() => { setPhase("second"); setTick(46); sfx.whistle(); }, sp(1200));
      return () => clearTimeout(t);
    }
    if (phase === "ft") {
      sfx.whistleLong();
      const t = setTimeout(() => { setPhase(shootout ? "pens" : "done"); }, sp(1400));
      return () => clearTimeout(t);
    }
    if (phase === "pens") {
      if (penStep > penEvents.length) {
        const t = setTimeout(() => setPhase("done"), sp(1600));
        return () => clearTimeout(t);
      }
      const ev = penEvents[penStep];
      if (ev) {
        setPenRevealed(false);
        sfx.kick();
        const t1 = setTimeout(() => {
          setPenRevealed(true);
          ev.kick.scored ? sfx.goal() : (Math.random() < 0.5 ? sfx.save() : sfx.miss());
        }, sp(650));
        // Reset penRevealed ao mesmo tempo que avançamos o passo, para que
        // o próximo batedor apareça já com "vai bater…" (sem spoiler do
        // resultado herdado do frame anterior).
        const t2 = setTimeout(() => {
          setPenRevealed(false);
          setPenStep((x) => x + 1);
        }, sp(1500));
        return () => { clearTimeout(t1); clearTimeout(t2); };
      }
      const t = setTimeout(() => setPenStep((x) => x + 1), sp(1100));
      return () => clearTimeout(t);
    }
    // first/second half tick
    const halfEnd = phase === "first" ? firstEnd : totalMin;
    if (tick >= halfEnd) {
      setPhase(phase === "first" ? "ht" : "ft");
      return;
    }
    const t = setTimeout(() => {
      const next = tick + 1;
      if (events.some((e) => e.minute === next)) sfx.goal();
      setTick(next);
    }, sp(440));
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, tick, penStep, penEvents, events, firstEnd, totalMin, shootout, onFinish, speed]);

  const formatMin = (m: number) => {
    if (m <= 45) return `${m}'`;
    if (m <= firstEnd) return `45+${m - 45}'`;
    if (m <= firstEnd + 45) return `${m - stoppage1}'`;
    return `90+${m - firstEnd - 45}'`;
  };
  const displayMinute = (() => {
    if (phase === "ht") return "INTERVALO";
    if (phase === "ft" || phase === "pens" || phase === "done") return "FIM DE JOGO";
    return formatMin(Math.max(1, tick));
  })();

  const shownEvents = events.filter((e) => e.minute <= tick);
  const homeGoals = shownEvents.filter((e) => e.scorer.team === "home").length;
  const awayGoals = shownEvents.filter((e) => e.scorer.team === "away").length;

  // Penalty display
  const shownPen = penEvents.slice(0, penStep);
  const currentPen = penEvents[penStep];
  const homePenScored = shownPen.filter((p) => p.side === "home" && p.kick.scored).length;
  const awayPenScored = shownPen.filter((p) => p.side === "away" && p.kick.scored).length;

  const progress = Math.min(100, (tick / totalMin) * 100);

  // Flash overlay when a new goal shows up on the scoreboard (live sim)
  const [goalFlash, setGoalFlash] = useState<"home" | "away" | null>(null);
  const prevGoalsRef = useRef({ h: 0, a: 0 });
  useEffect(() => {
    const prev = prevGoalsRef.current;
    let side: "home" | "away" | null = null;
    if (homeGoals > prev.h) side = "home";
    else if (awayGoals > prev.a) side = "away";
    prevGoalsRef.current = { h: homeGoals, a: awayGoals };
    if (side) {
      setGoalFlash(side);
      const t = setTimeout(() => setGoalFlash(null), 1300);
      return () => clearTimeout(t);
    }
  }, [homeGoals, awayGoals]);

  return (
    <div className="relative overflow-hidden rounded-2xl pitch-bg p-6 text-center card-glow">
      {goalFlash && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 animate-flash-burst bg-[radial-gradient(circle,rgba(250,204,21,0.55),transparent_70%)]" />
          <div className="font-display text-6xl md:text-7xl gold-text drop-shadow-[0_4px_20px_rgba(250,204,21,0.7)] animate-goal text-stroke tracking-wider">GOOOL!</div>
        </div>
      )}

      <div className="scoreboard-tv flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">Ao vivo</span>
        </div>
        <div className="font-display text-lg text-yellow-300 tabular-nums">{displayMinute}</div>
        <div className="flex gap-1">
          {([1, 2, 4] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSpeed(v)}
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition ${speed === v ? "bg-primary text-primary-foreground" : "bg-black/40 text-white/70 hover:bg-black/60"} ${phase === "pens" ? "opacity-60" : ""}`}
            >
              {v}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <div className={goalFlash === "home" ? "animate-goal" : ""}>
          <ClickableCrest
            short={match.homeShort} color={match.homeColor} name={match.home} size={52}
            players={homeSquad ?? []} overall={homeOverall} label="Elenco (mandante)"
            tactics={match.homeShort === "VOC" ? pTac : (match.homeTacticsInfo ? { formation: match.homeTacticsInfo.formation, style: match.homeTacticsInfo.style } : undefined)}
            ratingsOverride={match.homeTacticsInfo ? { atk: match.homeTacticsInfo.atk, def: match.homeTacticsInfo.def, ovr: match.homeTacticsInfo.ovr } : undefined}
          />
        </div>
        <div className="scoreboard-tv min-w-[140px] px-4 py-2 font-display text-5xl text-white tabular-nums">
          <span className={goalFlash === "home" ? "inline-block animate-goal text-yellow-300" : ""}>{homeGoals}</span>
          <span className="mx-2 text-white/40">×</span>
          <span className={goalFlash === "away" ? "inline-block animate-goal text-yellow-300" : ""}>{awayGoals}</span>
        </div>
        <div className={goalFlash === "away" ? "animate-goal" : ""}>
          <ClickableCrest
            short={match.awayShort} color={match.awayColor} name={match.away} size={52}
            players={awaySquad ?? []} overall={awayOverall} label="Elenco (visitante)"
            tactics={match.awayShort === "VOC" ? pTac : (match.awayTacticsInfo ? { formation: match.awayTacticsInfo.formation, style: match.awayTacticsInfo.style } : undefined)}
            ratingsOverride={match.awayTacticsInfo ? { atk: match.awayTacticsInfo.atk, def: match.awayTacticsInfo.def, ovr: match.awayTacticsInfo.ovr } : undefined}
          />
        </div>
      </div>


      <div className="mt-4 h-1.5 overflow-hidden rounded bg-black/40">
        <div className="h-full bg-gradient-to-r from-yellow-400 via-primary to-emerald-400 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 min-h-[80px] text-sm">
        {shownEvents.length === 0 && phase !== "ft" && phase !== "pens" && phase !== "done" && (
          <div className="text-center text-xs text-white/60">Bola rolando…</div>
        )}
        {shownEvents.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1 pr-2 border-r border-white/10">
              {shownEvents.filter((e) => e.scorer.team === "home").map((e, i) => (
                <div key={`h${i}`} className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5 animate-fade-in">
                  <span className="text-base">⚽</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-white">{e.scorer.name}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                      <span className="rounded bg-yellow-400/20 px-1 py-0.5 font-bold text-yellow-300">{e.scorer.position}</span>
                      <span className="tabular-nums">{formatMin(e.minute)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 pl-2">
              {shownEvents.filter((e) => e.scorer.team === "away").map((e, i) => (
                <div key={`a${i}`} className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5 animate-fade-in flex-row-reverse text-right">
                  <span className="text-base">⚽</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-white">{e.scorer.name}</div>
                    <div className="flex items-center justify-end gap-1.5 text-[10px] text-white/60">
                      <span className="tabular-nums">{formatMin(e.minute)}</span>
                      <span className="rounded bg-yellow-400/20 px-1 py-0.5 font-bold text-yellow-300">{e.scorer.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {phase === "pens" && (() => {
        const homeAll = playerIsHome ? shootout!.playerKicks : shootout!.rivalKicks;
        const awayAll = playerIsHome ? shootout!.rivalKicks : shootout!.playerKicks;
        const homeDone = shownPen.filter((p) => p.side === "home");
        const awayDone = shownPen.filter((p) => p.side === "away");
        const dotsFor = (side: "home" | "away", all: Kick[]) => {
          // Nunca revelar o total real da disputa: mostramos sempre 5 slots
          // (padrão FIFA) e, na morte súbita, só adicionamos um slot novo
          // conforme a cobrança já apareceu — sem spoiler de quantas rodadas
          // ainda faltam nem de quantas o simulador precisou.
          const shownForSide =
            shownPen.filter((p) => p.side === side).length +
            (currentPen?.side === side ? 1 : 0);
          const count = Math.max(5, shownForSide);
          return Array.from({ length: count }, (_, i) => {
            const evIdx = penEvents.findIndex((e) => e.side === side && e.idxInSide === i);
            const done = evIdx >= 0 && evIdx < penStep;
            const k = all[i];
            const isSuddenDeath = i >= 5;
            return (
              <div
                key={i}
                className={`h-3 w-3 rounded-full border ${
                  done
                    ? k?.scored
                      ? "bg-emerald-400 border-emerald-300"
                      : "bg-red-500 border-red-400"
                    : isSuddenDeath
                      ? "border-yellow-400/40 bg-yellow-400/10"
                      : "border-white/30 bg-white/10"
                }`}
              />
            );
          });
        };
        const HistoryList = ({ list, align }: { list: typeof shownPen; align: "left" | "right" }) => (
          <div className={`flex flex-col gap-1 ${align === "right" ? "items-end" : "items-start"}`}>
            {list.length === 0 && <div className="text-[10px] text-white/40">—</div>}
            {list.map((p, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 text-[11px] ${align === "right" ? "flex-row-reverse text-right" : "text-left"}`}
              >
                <span className={`text-sm leading-none ${p.kick.scored ? "text-emerald-400" : "text-red-400"}`}>
                  {p.kick.scored ? "●" : "○"}
                </span>
                <span className={`tabular-nums text-[10px] ${p.kick.scored ? "text-emerald-300" : "text-red-300"}`}>
                  {p.idxInSide + 1}.
                </span>
                <span className={`truncate max-w-[92px] ${p.kick.scored ? "text-white/90" : "text-white/60 line-through"}`}>
                  {p.kick.name}
                </span>
              </div>
            ))}
          </div>
        );
        return (
          <div className="mt-5 rounded-lg bg-black/30 p-4 animate-fade-in">
            <div className="mb-3 text-[10px] uppercase tracking-widest text-white/70">Disputa de Pênaltis</div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col items-center gap-1">
                <TeamBadge short={match.homeShort} color={match.homeColor} name={match.home} size={32} />
                <div className="flex flex-wrap justify-center gap-1 max-w-[100px]">{dotsFor("home", homeAll)}</div>
              </div>
              <div className="font-display text-3xl text-white tabular-nums">
                {homePenScored} × {awayPenScored}
              </div>
              <div className="flex flex-col items-center gap-1">
                <TeamBadge short={match.awayShort} color={match.awayColor} name={match.away} size={32} />
                <div className="flex flex-wrap justify-center gap-1 max-w-[100px]">{dotsFor("away", awayAll)}</div>
              </div>
            </div>

            {currentPen && (() => {
              const isHome = currentPen.side === "home";
              const teamShort = isHome ? match.homeShort : match.awayShort;
              const teamName = isHome ? match.home : match.away;
              const teamColor = isHome ? match.homeColor : match.awayColor;
              // Cosmético: quando o batedor erra, decidimos entre "DEFENDEU" e
              // "PRA FORA" ponderando pela força do goleiro vs fraqueza do
              // batedor. Não altera probabilidade de gol nem estatística.
              const gkStrength = Math.max(1, (currentPen.kick.gkOvr ?? 78) - 68);
              const shooterMiss = Math.max(1, 96 - (currentPen.kick.kickerOvr ?? 78));
              const pDef = gkStrength / (gkStrength + shooterMiss);
              const hash = (currentPen.kick.name.charCodeAt(0) * 31 + penStep * 17 + (currentPen.kick.name.length || 1)) % 1000;
              const missLabel = (hash / 1000) < pDef ? "DEFENDEU!" : "PRA FORA!";
              const outcome = penRevealed
                ? (currentPen.kick.scored
                    ? { label: "GOOOL!", cls: "text-emerald-300" }
                    : { label: missLabel, cls: "text-red-400" })
                : { label: "vai bater…", cls: "text-white/70" };
              return (
                <div key={penStep} className="mt-4 rounded-lg border border-white/10 bg-black/40 p-4 text-center animate-fade-in">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <TeamBadge short={teamShort} color={teamColor} name={teamName} size={28} />
                    <span className="text-[11px] uppercase tracking-widest text-white/70">
                      {teamShort} · pênalti {currentPen.idxInSide + 1}{currentPen.idxInSide >= 5 ? " (morte súbita)" : ""}
                    </span>
                  </div>
                  <div className="font-display text-2xl leading-tight text-white sm:text-3xl">
                    {currentPen.kick.name}
                  </div>
                  <div className={`mt-2 font-display text-xl ${outcome.cls}`}>
                    {outcome.label}
                  </div>
                </div>
              );
            })()}

            {(homeDone.length > 0 || awayDone.length > 0) && (
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60">
                    <TeamBadge short={match.homeShort} color={match.homeColor} name={match.home} size={16} />
                    <span>{match.homeShort}</span>
                    <span className="ml-auto tabular-nums text-white/50">
                      {homeDone.filter((p) => p.kick.scored).length}/{homeDone.length}
                    </span>
                  </div>
                  <HistoryList list={homeDone} align="left" />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60">
                    <span className="ml-auto tabular-nums text-white/50 order-3">
                      {awayDone.filter((p) => p.kick.scored).length}/{awayDone.length}
                    </span>
                    <TeamBadge short={match.awayShort} color={match.awayColor} name={match.away} size={16} />
                    <span>{match.awayShort}</span>
                  </div>
                  <HistoryList list={awayDone} align="right" />
                </div>
              </div>
            )}

            {!currentPen && penStep > 0 && (
              <div className="mt-4 font-display text-xl text-white">
                {homePenScored > awayPenScored ? `${match.home} venceu nos pênaltis!` : `${match.away} venceu nos pênaltis!`}
              </div>
            )}
          </div>
        );
      })()}

    </div>
  );
}

/* ─────────────  Menu  ───────────── */

function MenuScreen({ hasSave, onStart }: { hasSave: boolean; onNew: () => void; onContinue: () => void; onStart: (name: string, mode: GameMode) => void }) {
  const [name, setName] = useState("");
  const [step, setStep] = useState<"root" | "name" | "mode">("root");
  const [chosenName, setChosenName] = useState("");
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center">
      {/* Halo dourado atrás do hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.19 90 / 0.35), transparent 70%)" }}
      />

      {/* Bola flutuando com anel dourado */}
      <div className="relative mb-4">
        <div className="absolute inset-0 -m-4 rounded-full animate-level-up" />
        <div className="animate-hero-float text-7xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">⚽</div>
      </div>

      <h1 className="font-display text-5xl gold-text leading-none">{GAME_NAME}</h1>

      {/* Chips decorativos "trofeus" */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        <span className="chip chip-gold">🏆 Brasileirão</span>
        <span className="chip chip-gold">🌎 Libertadores</span>
        <span className="chip chip-gold">⭐ Sul-Americana</span>
        <span className="chip chip-gold">🌍 Mundial</span>
      </div>

      <p className="mt-4 max-w-sm text-sm text-white/75">Monte um time de 11 com jogadores reais da Série A e lendas do futebol brasileiro. Conquiste títulos, some pontos e vire lenda no ranking global.</p>

      {step === "root" && (
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 animate-slide-up">
          {hasSave && <button onClick={() => window.location.reload()} className="rounded-xl px-4 py-3 font-display text-lg btn-primary">▶ Continuar jogo</button>}
          <button onClick={() => setStep("name")} className="rounded-xl panel-premium px-4 py-3 font-display text-lg text-white hover:brightness-110 transition">✨ Novo jogo</button>
        </div>
      )}

      {step === "name" && (
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 animate-slide-up">
          <div className="text-[10px] uppercase tracking-widest text-white/60">Nome do clube</div>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: Real Guerreiros" className="rounded-xl border border-primary/40 bg-black/40 px-4 py-3 text-center font-display text-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/40" maxLength={20} />
          <button onClick={() => { setChosenName(name.trim() || "Meu Time"); setStep("mode"); }} className="rounded-xl px-4 py-3 font-display text-lg btn-primary">Escolher modo →</button>
        </div>
      )}

      {step === "mode" && (
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 animate-slide-up">
          <div className="text-xs uppercase tracking-widest text-white/60">Escolha o modo</div>

          <button onClick={() => onStart(chosenName, "casual")} className="player-card p-4 text-left group">
            <div className="flex items-center justify-between">
              <div className="font-display text-2xl">🎮 Casual</div>
              <span className="chip">recomendado</span>
            </div>
            <div className="mt-1 text-xs text-white/70">Overall visível no draft. Bom pra quem tá começando.</div>
          </button>

          <button onClick={() => onStart(chosenName, "classico")} className="player-card player-card-legend p-4 text-left group">
            <div className="flex items-center justify-between">
              <div className="font-display text-2xl">👑 Clássico</div>
              <span className="chip chip-gold">hard</span>
            </div>
            <div className="mt-1 text-xs text-white/70">Força escondida — precisa conhecer os jogadores de verdade.</div>
          </button>
        </div>
      )}

      <div className="mt-10 text-[10px] uppercase tracking-widest text-white/40">Jogo fan-made · sem fins comerciais</div>
    </div>
  );
}

/* ─────────────  Formation & Tactic picker  ───────────── */

// "Favorito" = seu OVR médio pelo menos 3 acima do adv (o inverso vale para "mais fraco").
// Efeitos em "ritmo de gols" mudam a média por jogo em ~0,05-0,15 gol (efeito pequeno mas
// consistente numa temporada de 38 jogos).
const FORMATION_SHORT: Record<FormationId, { fixed: string; extra: string }> = {
  "3-3-4":   { fixed: "+4,0 ATA · −0,5 DEF", extra: "+0,14 gols seus e +0,10 sofridos por jogo (jogo aberto)" },
  "3-4-3":   { fixed: "+3,5 ATA · 0 DEF",    extra: "+0,05 gol seu por jogo (sempre)" },
  "4-3-3":   { fixed: "+3,0 ATA · +0,5 DEF", extra: "+0,04 gol seu por jogo; +0,06 extra se favorito (+3 OVR)" },
  "4-2-3-1": { fixed: "+2,5 ATA · +1,0 DEF", extra: "+0,4 DEF fixo; +1 DEF em finais e campo neutro" },
  "3-5-2":   { fixed: "+2,0 ATA · +1,5 DEF", extra: "+0,3 ATA fixo; +1 ATA extra se favorito (+3 OVR)" },
  "4-4-2":   { fixed: "+1,5 ATA · +2,0 DEF", extra: "+0,5 ATA fixo (finalização) e +0,03 gol seu por jogo (sempre)" },
  "4-1-4-1": { fixed: "+1,0 ATA · +2,5 DEF", extra: "+0,5 DEF; −0,05 gol do adv por jogo (sempre)" },
  "3-6-1":   { fixed: "+0,5 ATA · +3,0 DEF", extra: "+0,5 DEF; −0,06 gol do adv por jogo (sempre)" },
  "4-3-2-1": { fixed: "0 ATA · +3,5 DEF",    extra: "+0,3 DEF fixo; +1 DEF extra contra times +3 OVR mais fortes" },
  "4-5-1":   { fixed: "−0,5 ATA · +4,0 DEF", extra: "−0,04 gol do adv por jogo; −0,08 no 2º tempo (dobra)" },
  "5-3-2":   { fixed: "−1,0 ATA · +4,5 DEF", extra: "−0,03 gol do adv por jogo; −0,08 no mata-mata" },
  "5-4-1":   { fixed: "−1,5 ATA · +5,0 DEF", extra: "−0,09 gol do adv por jogo em qualquer partida" },
};

const TACTIC_SHORT: Record<TacticStyle, { fixed: string; scale: string }> = {
  "ofensivo":       { fixed: "+3,6 ATA · −2,0 DEF",     scale: "ATA (60%) + MEI (40%)" },
  "equilibrado":    { fixed: "+3,0 ATA · +2,4 DEF",     scale: "OVR geral do time" },
  "defensivo":      { fixed: "+3,3 DEF · −0,2 ATA",     scale: "ZAG (65%) + GOL (35%)" },
  "contra-ataque":  { fixed: "+1,7 ATA · +2,8 DEF",     scale: "ATA p/ ATA (70%)+MEI (30%) · DEF p/ ZAG (65%)+GOL (35%)" },
  "posse":          { fixed: "+2,4 ATA · +2,2 DEF",     scale: "MEI (80%) + ATA (20%)" },
  "pressao-alta":   { fixed: "+2,9 ATA · −1,2 DEF",     scale: "MEI (50%) + ATA (50%)" },
  "retranca":       { fixed: "+3,9 DEF · −0,6 ATA",     scale: "ZAG (60%) + GOL (40%)" },
  "cadenciado":     { fixed: "+3,0 DEF · +2,2 ATA",     scale: "MEI (70%) + ZAG (30%)" },
  "bolas-paradas":  { fixed: "+2,5 ATA · +1,7 DEF",     scale: "ZAG (50%) + ATA (50%)" },
};


function FormationPhase({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const [formation, setFormation] = useState<FormationId>(state.formation ?? DEFAULT_FORMATION);
  const [tactic, setTactic] = useState<TacticStyle>(state.tactic ?? DEFAULT_TACTIC);
  const [showHelp, setShowHelp] = useState(false);
  const [helpAnchor, setHelpAnchor] = useState<{ top: number; left: number } | null>(null);
  const f = getFormation(formation);
  const confirm = () => setState({
    ...state,
    formation,
    tactic,
    phase: "draft",
    // Recalcula pulos toda vez que entra no draft, aplicando efeitos da árvore
    // (ex.: Rede internacional +1). Evita o caso do save antigo travado em 3.
    draftSkipsRemaining: Math.max(state.draftSkipsRemaining ?? 3, 3 + (getActiveCoachEffects().extraSkips ?? 0)),
    draftSkippedTeams: [],
  });
  const openHelp = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHelpAnchor({
      top: Math.max(8, rect.top),
      left: Math.min(window.innerWidth - 8, rect.right),
    });
    setShowHelp(true);
  };
  return (
    <div className="animate-slide-up">
      <div className="mb-4 rounded-2xl pitch-bg p-5 text-center card-glow relative">
        <button
          onClick={openHelp}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-primary text-base font-black text-primary-foreground shadow-[0_0_16px_var(--primary)] animate-pulse hover:scale-110 transition"
          aria-label="Ajuda sobre táticas"
        >?</button>
        <div className="text-xs uppercase tracking-widest text-white/70">Antes de montar o time</div>
        <div className="mt-1 cartoon-title text-2xl">Escolha sua tática</div>
        <div className="mt-1 text-xs text-white/70">A formação define quantos jogadores você escolhe em cada posição. O estilo muda como o time joga — mas só rende se combinar com seu elenco.</div>
      </div>

      <div className="mb-2 text-xs uppercase text-muted-foreground">1. Formação</div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        {FORMATIONS.map((opt) => {
          const fs = FORMATION_SHORT[opt.id];
          return (
            <button key={opt.id} onClick={() => setFormation(opt.id)}
              className={`rounded-xl border p-3 text-left transition ${formation === opt.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"}`}>
              <div className="font-display text-lg">{opt.label}</div>
              {fs && (
                <div className="mt-2 space-y-0.5 border-t border-border/50 pt-1.5 text-[9px] leading-tight">
                  <div className="text-emerald-300/90"><b>Fixo:</b> {fs.fixed}</div>
                  <div className="text-sky-300/90"><b>Extra:</b> {fs.extra}</div>
                </div>
              )}
            </button>
          );
        })}
      </div>


      <div className="mb-3 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
        💡 Você vai escolher <b>{f.caps.GOL} goleiro · {f.caps.ZAG} defensores · {f.caps.MEI} meio-campistas · {f.caps.ATA} atacantes</b>. Escolha jogadores compatíveis: <b>ofensivo</b> pede ataque forte, <b>defensivo</b> pede goleiro/zagueiros sólidos. Escolha errada = penalidade.
      </div>

      {/* Preview do campo — mostra os slots (LD, ZAG, VOL, MEC, PD, CA…) da formação escolhida */}
      <div className="mb-4">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Preview do campo · {f.label}</div>
        <Pitch formation={formation} assignments={[]} small />
      </div>


      <div className="mb-2 text-xs uppercase text-muted-foreground">2. Estilo de jogo</div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {TACTICS.map((opt) => {
          const s = TACTIC_SHORT[opt.id];
          return (
            <button key={opt.id} onClick={() => setTactic(opt.id)}
              className={`rounded-xl border p-3 text-center transition ${tactic === opt.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"}`}>
              <div className="text-2xl">{opt.icon}</div>
              <div className="mt-1 font-display text-sm">{opt.label}</div>
              {s && (
                <div className="mt-2 space-y-0.5 border-t border-border/50 pt-1.5 text-[9px] leading-tight">
                  <div className="text-emerald-300/90"><b>Base:</b> {s.fixed}</div>
                  <div className="text-sky-300/90"><b>+ Escala:</b> {s.scale}</div>

                </div>
              )}
            </button>
          );
        })}
      </div>


      <button onClick={confirm} className="w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">Começar draft →</button>

      {showHelp && <TacticsHelpModal anchor={helpAnchor} onClose={() => setShowHelp(false)} />}
    </div>
  );
}

const FORMATION_HELP: Array<{ id: string; label: string; caps: string; fixed: string; extra: string; example: string }> = [
  { id: "3-3-4", label: "3-3-4", caps: "1·3·3·4", fixed: "+4 ATA · −0,5 DEF",
    extra: "Aumenta o ritmo de gols dos DOIS lados, mas puxa um pouco mais pro SEU (+0,14 seu vs +0,10 do adversário por jogo).",
    example: "Numa temporada de 38 jogos do Brasileirão, saem ~5 gols a mais seus e ~4 a mais sofridos — saldo levemente positivo. Somado ao +4 ATA fixo, favorece você quando quer jogo aberto. Placar típico: 3×2, 4×3." },
  { id: "3-4-3", label: "3-4-3", caps: "1·5·2·3", fixed: "+3,5 ATA · 0 DEF",
    extra: "Aumenta o SEU ritmo de gols quando você é o mais forte (OVR médio maior que o adversário).",
    example: "Se seu XI tem OVR 88 e o rival 82, você faz ~1 gol extra a cada 4 jogos (uns 9-10 na temporada de 38). Contra time igual ou mais forte, esse extra não ativa." },
  { id: "4-3-3", label: "4-3-3", caps: "1·4·3·3", fixed: "+3 ATA · +0,5 DEF",
    extra: "Aumenta o SEU ritmo de gols quando você é o mais forte que o adversário.",
    example: "Contra um rival mais fraco, seu ataque vira em torno de 1 gol extra a cada 3-4 jogos (uns 10-12 numa temporada de 38 jogos). Contra time mais forte, o efeito extra some (mas o +3 ATA fixo continua)." },
  { id: "4-2-3-1", label: "4-2-3-1", caps: "1·4·3·3", fixed: "+2,5 ATA · +1 DEF",
    extra: "Ganha +1 DEF a MAIS em finais e em jogos de campo neutro (Mundial, decisões).",
    example: "Numa final do Mundial, a DEF total vira +2 em vez de +1. Isso reduz uns ~2 gols sofridos ao longo do torneio." },
  { id: "3-5-2", label: "3-5-2", caps: "1·5·3·2", fixed: "+2 ATA · +1,5 DEF",
    extra: "Ganha +1 ATA a MAIS quando você é o mais forte que o adversário.",
    example: "Contra rival mais fraco, seu ATA vira +3 em vez de +2. Diferença de ~1 gol a cada 5-6 jogos contra times inferiores (uns 6-7 na temporada de 38)." },
  { id: "4-4-2", label: "4-4-2", caps: "1·4·4·2", fixed: "+1,5 ATA · +2 DEF",
    extra: "Pequeno bônus de finalização: seus chutes viram gol com um pouco mais de frequência (sempre).",
    example: "Rende ~4-6 gols extras ao longo de uma temporada de 38 jogos. Vale em todo jogo, sem depender de força ou fase." },
  { id: "4-1-4-1", label: "4-1-4-1", caps: "1·4·3·3", fixed: "+1 ATA · +2,5 DEF",
    extra: "Ganha +0,5 DEF a MAIS e reduz o ritmo de gols do adversário em toda partida.",
    example: "O adversário faz ~5-6 gols a menos ao longo da temporada de 38 jogos. Placares mais comuns: 1×0, 2×1." },
  { id: "3-6-1", label: "3-6-1", caps: "1·5·4·1", fixed: "+0,5 ATA · +3 DEF",
    extra: "Ganha +0,5 DEF a MAIS e reduz o ritmo de gols do adversário em toda partida.",
    example: "Semelhante ao 4-1-4-1: adversário faz ~6 gols a menos na temporada de 38 jogos. Bom pra proteger vantagem no mata-mata." },
  { id: "4-3-2-1", label: "4-3-2-1", caps: "1·4·5·1", fixed: "0 ATA · +3,5 DEF",
    extra: "Ganha +1 DEF a MAIS quando você enfrenta um time MAIS FORTE que o seu.",
    example: "Se seu OVR é 80 e o rival é 88, sua DEF vira +4,5. Ideal quando você é o zebra e quer segurar 0×0 ou 1×0." },
  { id: "4-5-1", label: "4-5-1", caps: "1·4·3·3", fixed: "−0,5 ATA · +4 DEF",
    extra: "Reduz o ritmo de gols do adversário SÓ no 2º tempo (bom pra segurar resultado).",
    example: "Se você abre 1×0 no 1º tempo, o adversário faz ~30% menos gols pra tentar empatar. Efeito não vale se você começa perdendo." },
  { id: "5-3-2", label: "5-3-2", caps: "1·5·3·2", fixed: "−1 ATA · +4,5 DEF",
    extra: "Reduz o ritmo de gols do adversário SÓ em jogos de mata-mata (vale igual em Libertadores, Sul-Americana e Mundial).",
    example: "Em qualquer mata-mata continental (Liberta, Sula ou Mundial), o adversário faz ~1 gol a menos a cada 3-4 jogos. Nas ligas nacionais, esse extra não ativa." },
  { id: "5-4-1", label: "5-4-1", caps: "1·5·2·3", fixed: "−1,5 ATA · +5 DEF",
    extra: "Reduz o ritmo de gols do adversário em QUALQUER partida (liga, copa, tudo).",
    example: "O adversário faz ~8-10 gols a menos ao longo de uma temporada de 38 jogos. Junto com o +5 DEF, é o setup mais defensivo do jogo." },
];

function TacticsHelpModal({ anchor, onClose }: { anchor: { top: number; left: number } | null; onClose: () => void }) {
  const [tab, setTab] = useState<'base' | 'ritmo' | 'formacoes' | 'estilos'>('base');
  const tabs: { id: typeof tab; icon: string; label: string }[] = [
    { id: 'base', icon: '📖', label: 'Base' },
    { id: 'ritmo', icon: '🎚️', label: 'Ritmo' },
    { id: 'formacoes', icon: '🧩', label: 'Formações' },
    { id: 'estilos', icon: '🎯', label: 'Estilos' },
  ];
  if (typeof document === "undefined") return null;
  const panelStyle = anchor
    ? {
        top: anchor.top,
        left: anchor.left,
        maxHeight: `calc(100svh - ${anchor.top + 8}px)`,
        transform: "translateX(calc(-100% + 32px))",
      }
    : {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/70 p-2" onClick={onClose}>
      <div
        className="fixed flex max-h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-4">
          <div className="font-display text-lg gold-text">Como funcionam as táticas</div>
          <button onClick={onClose} className="sticker-close">Fechar</button>
        </div>
        <div className="border-b border-border/60 px-3 pb-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 flex-col items-center gap-0.5 rounded-xl border-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                  tab === t.id
                    ? 'scale-105 border-yellow-400 bg-yellow-500/20 text-yellow-100 shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                    : 'border-border bg-secondary/40 text-muted-foreground hover:bg-secondary/70'
                }`}
              >
                <span className="text-lg leading-none">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-xs text-yellow-100">
            ⚠️ A tática é escolhida <b>uma vez</b> e vale a <b>temporada inteira</b>. Não dá pra trocar depois.
          </div>

          {tab === 'base' && (
            <div className="space-y-2 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
              <div className="mb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Como o bônus é calculado</div>
              <div>
                Todo estilo tem <b className="text-foreground">2 partes</b>:
              </div>
              <div>
                <span className="text-primary">1) Base fixa</span> — vale igual pra qualquer time (ex.: Ofensivo dá <b>+3,6 ATA</b> e <b>−2 DEF</b> pra qualquer elenco).
              </div>
              <div>
                <span className="text-primary">2) Escala</span> — soma extra que <b>cresce com o OVR do setor-chave</b> daquele estilo (ATA, MEI, GOL+ZAG, ou o OVR geral). Cada ponto acima de <b>80</b> na média do setor conta. Setor abaixo de 80 = bônus menor ou negativo.
              </div>
              <div className="rounded-lg bg-background/40 p-2 text-[11px]">
                <b className="text-foreground">Como ler os pesos (%):</b> a porcentagem é <b>o quanto cada posição entra na média</b> que gera o bônus. Ex.: no Ofensivo, ATA 60% + MEI 40% = média ponderada de ATA e MEI (o ATA puxa mais, mas subir MEI TAMBÉM aumenta o bônus).
              </div>
              <div className="rounded-lg bg-background/40 p-2 text-[11px]">
                <b className="text-foreground">Exemplo (Ofensivo, ATA 60% + MEI 40%):</b> ATA 88 + MEI 88 → média 88 → ~<b>+6,4 ATA</b>. ATA 95 + MEI 80 → média 89 → ~<b>+6,8 ATA</b>. ATA 95 + MEI 95 → média 95 → ~<b>+9,3 ATA</b>. Se a média ficar abaixo de 80, o bônus vira 0 ou negativo. DEF fica sempre em −2 (fixo, não escala).
              </div>
              <div>
                Cada estilo tem <b className="text-foreground">"Precisa de:"</b> mostrando quais posições contam e o peso de cada uma. Subir o OVR dessas posições = mais bônus. Outras posições não afetam esse estilo.
              </div>
            </div>
          )}

          {tab === 'ritmo' && (
            <div className="space-y-2 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
              <div className="mb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Ritmo de gols (lambda) 🎚️</div>
              <div>
                Além de mexer no <b className="text-foreground">ATA/DEF</b>, todo estilo mexe no <b className="text-foreground">"lambda"</b> — que é o <b className="text-foreground">ritmo esperado de gols</b> da partida.
              </div>
              <div>
                <span className="text-primary">Simplificando:</span> ATA vs DEF decide <b className="text-foreground">quem tem vantagem</b>. Lambda decide <b className="text-foreground">quantos gols saem no total</b>.
              </div>
              <div>
                Cada estilo tem 2 lambdas: <b className="text-emerald-300">lambdaAtk</b> (mexe nos <b>seus</b> gols) e <b className="text-red-300">lambdaDef</b> (mexe nos gols que você <b>sofre</b>).
              </div>
              <div className="rounded-lg bg-background/40 p-2 text-[11px] leading-relaxed">
                <b className="text-foreground">O que significa o número na prática?</b><br/>
                O valor é <b>gols extras esperados por partida</b>. Parece pouco, mas <b>acumula muito</b> ao longo de uma temporada de <b>38 jogos</b> do Brasileirão:<br/>
                • <b>+0.10</b> = ~1 gol extra a cada 10 jogos (~<b>4 numa temporada</b>)<br/>
                • <b>+0.25</b> = 1 gol extra a cada 4 jogos (~<b>9-10 na temporada</b>)<br/>
                • <b>−0.30</b> = 3 gols a MENOS a cada 10 jogos (~<b>11 na temporada</b>)<br/>
                • <b>−0.40</b> = quase 1 gol a menos a cada 2-3 jogos (~<b>15 na temporada</b>)<br/>
                Num mata-mata de 2 jogos, uma diferença de 0.30 já vira ~0.6 gols — pode ser o gol que decide a vaga.
              </div>
              <div className="rounded-lg bg-background/40 p-2 text-[11px] leading-relaxed">
                <b className="text-foreground">Como ler o sinal:</b><br/>
                • <b className="text-emerald-300">lambdaAtk +</b> = você faz mais gols que o normal<br/>
                • <b className="text-emerald-300">lambdaAtk −</b> = seu ataque trava, faz menos gol<br/>
                • <b className="text-red-300">lambdaDef −</b> = você sofre menos gols (isso é BOM!)<br/>
                • <b className="text-red-300">lambdaDef +</b> = sua defesa vaza mais (isso é RUIM)
              </div>
              <div className="rounded-lg bg-background/40 p-2 text-[11px] leading-relaxed">
                <b className="text-foreground">Exemplos de TODOS os estilos (temporada de 38 jogos):</b><br/><br/>
                <b>⚔️ Ofensivo:</b> Atk <span className="text-emerald-300">+0.34</span>, Def <span className="text-red-300">+0.10</span> → você faz ~<b>13 gols a mais</b> e sofre ~<b>4 a mais</b> na temporada. Placar típico: <b>3×2, 4×3</b>.<br/><br/>
                <b>⚖️ Equilibrado:</b> Atk <span className="text-emerald-300">+0.14</span>, Def <span className="text-emerald-300">−0.08</span> → viés leve pró-você: faz ~<b>5-6 gols a mais</b> e sofre ~<b>3 a menos</b> na temporada. Placar típico: <b>2×1, 3×1</b>. Escolha segura com pequena vantagem.<br/><br/>
                <b>🛡️ Defensivo:</b> Atk <span className="text-emerald-300">+0.06</span>, Def <span className="text-emerald-300">−0.32</span> → faz ~<b>2 gols a mais</b> e sofre ~<b>12 a menos</b> na temporada. Placar típico: <b>1×0, 2×1</b>.<br/><br/>
                <b>🏃 Contra-ataque:</b> Atk <span className="text-emerald-300">+0.09</span>, Def <span className="text-emerald-300">−0.16</span> → faz ~<b>3 gols a mais</b> e sofre ~<b>6 a menos</b> na temporada. Placar típico: <b>1×0, 2×1</b>, gols de saída rápida.<br/><br/>
                <b>🎯 Posse:</b> Atk <span className="text-emerald-300">+0.10</span>, Def <span className="text-emerald-300">−0.12</span> → faz ~<b>4 gols a mais</b> e sofre ~<b>5 a menos</b> na temporada. Placar típico: <b>2×0, 2×1</b>.<br/><br/>
                <b>🔥 Pressão alta:</b> Atk <span className="text-emerald-300">+0.24</span>, Def <span className="text-red-300">+0.10</span> → ~<b>9 gols a mais feitos</b> e ~<b>4 sofridos</b> na temporada. Placar típico: <b>3×2, 4×3</b>. Aberto e favorável.<br/><br/>
                <b>🧱 Retranca:</b> Atk <span className="text-emerald-300">+0.12</span>, Def <span className="text-emerald-300">−0.45</span> → faz ~<b>5 gols a mais</b> e sofre ~<b>17 a menos</b> na temporada. Placar típico: <b>0×0, 1×0</b>. Trava tudo e ainda pontua nas raras chances.<br/><br/>
                <b>🐢 Cadenciado:</b> Atk <span className="text-emerald-300">+0.05</span>, Def <span className="text-emerald-300">−0.22</span> → jogo lento, ~<b>2 gols a mais feitos</b> e ~<b>8 a menos sofridos</b> na temporada. Placar típico: <b>1×0, 2×1</b>. Favorece o time melhor.<br/><br/>
                <b>⛳ Bolas paradas:</b> Atk <span className="text-emerald-300">+0.08</span>, Def <span className="text-emerald-300">−0.05</span> → ganha ~<b>3 gols de escanteio</b> e sofre ~<b>2 a menos</b> na temporada. Placar típico: <b>1×0, 2×1</b> com gol de bola parada.

              </div>
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-2 text-[11px] leading-relaxed text-yellow-100">
                <b>💡 Como pensar na escolha:</b> lembra que você escolhe a tática <b>UMA vez pra temporada inteira</b>, antes de montar o elenco. Então não dá pra reagir ao adversário. Pense assim:<br/><br/>
                • <b>Lambda alto</b> (ofensivo, pressão alta) = jogos com muitos gols = <b>mais imprevisível</b>. Bom se você quer emoção ou apostar em virar jogo.<br/>
                • <b>Lambda baixo</b> (retranca, cadenciado, defensivo) = jogos travados = <b>mais previsível</b>. O time melhor tende a vencer. Bom se você planeja montar elenco forte.<br/>
                • <b>Lambda neutro</b> (bolas paradas) ou <b>levemente pró-você</b> (equilibrado, posse, contra-ataque) = seguro, com pequena vantagem sem trade-off grande.<br/><br/>
                Escolha o lambda que combina com o <b>tipo de elenco que você pretende montar</b> — não com o adversário.
              </div>
            </div>
          )}

          {tab === 'formacoes' && (<>
            <div className="mb-2 space-y-2 rounded-xl bg-secondary/50 p-3 text-[11px] text-muted-foreground">
              <div className="mb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Formações</div>
              <div>
                A formação define <b className="text-foreground">quantos jogadores</b> você escolhe em cada setor. Os 4 números são: <b className="text-foreground">GOL · ZAG · MEI · ATA</b>.
              </div>
              <div>
                Ex.: <b className="text-foreground">4-3-3</b> = 1 goleiro, 4 defensores (2 zagueiros + 2 laterais), 3 do meio, 3 atacantes.
              </div>
              <div>
                Cada formação tem <b className="text-foreground">2 partes</b>: um <b className="text-foreground">bônus fixo</b> de ATA/DEF (à direita de cada card, vale sempre) e um <b className="text-foreground">efeito extra</b> que ativa em certas situações — pode ser mais ATA/DEF ou mexer no <b className="text-foreground">ritmo de gols</b> (veja a aba Ritmo).
              </div>
              <div className="rounded-lg bg-background/40 p-2">
                <b className="text-foreground">Relembrando o ritmo de gols:</b> "aumenta o ritmo" = <b>mais gols</b> naquele lado. "Reduz o ritmo do adversário" = você <b>sofre menos</b> gols (isso é ótimo). O efeito típico é de <b>+0,10 a +0,25</b> por jogo, o que dá <b>4 a 10 gols</b> de diferença ao longo da temporada de 38 jogos.
              </div>
              <div className="rounded-lg bg-background/40 p-2">
                <b className="text-foreground">Aumentar o ritmo nos DOIS lados é bom?</b> Depende. Se você já é o mais forte (ATA/DEF fixos maiores, elenco melhor), <b>mais gols totais = mais previsível a seu favor</b>. Se você é o mais fraco, jogo aberto favorece zebrada. No 3-3-4 o "extra" é levemente puxado pro seu lado (+0,14 seu vs +0,10 do adversário), então é <b>saldo positivo</b> — combinado com o +4 ATA fixo, é um setup ofensivo agressivo.
              </div>
              <div className="rounded-lg bg-background/40 p-2">
                <b className="text-foreground">O que é "ter vantagem de força":</b> significa que o <b>OVR médio do seu time é maior</b> que o do adversário. Ex.: seu XI tem OVR 85, o adversário tem OVR 80 → você tem vantagem. Se você tem OVR 78 contra um time OVR 85 → o adversário é o mais forte.
              </div>
            </div>
            <div className="space-y-2">
              {FORMATION_HELP.map((f) => (
                <div key={f.id} className="rounded-lg bg-secondary/30 p-2 text-[11px]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-14 shrink-0">
                      <div className="font-display text-sm text-foreground">{f.label}</div>
                      <div className="text-[9px] text-muted-foreground">{f.caps}</div>
                    </div>
                    <div className="flex-1 text-muted-foreground">
                      <div><b className="text-foreground">Bônus fixo:</b> {f.fixed}</div>
                      <div className="mt-0.5"><b className="text-foreground">Efeito extra:</b> {f.extra}</div>
                      <div className="mt-0.5 text-[10px] text-primary/80"><b>Exemplo:</b> {f.example}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>)}

          {tab === 'estilos' && (
            <div className="space-y-1">
              {TACTICS.map((t) => (
                <div key={t.id} className="rounded-lg bg-secondary/30 px-2 py-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{t.icon}</span>
                    <span className="font-display text-sm">{t.label}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{t.desc}</div>
                  <div className="mt-1 text-[10px] text-primary/80">Bônus: {t.bonus}</div>
                  <div className="mt-1 text-[10px] text-emerald-300/90"><b>Precisa de:</b> {t.needs}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ─────────────  Draft  ───────────── */

const POS_LABEL: Record<Position, string> = { GOL: "Goleiro", ZAG: "Defensor", MEI: "Meio-campo", ATA: "Atacante" };

// Reconcilia picks (com IDs de slot antigos ou de outra formação) com os
// slots da formação atual. Retorna: para cada pick, o slot ao qual ele foi
// mapeado (ou undefined se sobrou sem casa).
function assignPicksToSlots(
  picks: DraftPick[],
  formation: FormationId,
): { picks: DraftPick[]; slotOfPick: (string | undefined)[] } {
  const slots = slotsForFormation(formation);
  const knownIds = new Set(slots.map((s) => s.id));
  const usedSlotIds = new Set<string>();
  const slotOfPick: (string | undefined)[] = new Array(picks.length).fill(undefined);

  // 1ª passada: mantém picks cujo slot já é válido pelo role refinado.
  // Isso é essencial para híbridos reais (ex.: Ronaldinho MEC/PON_E): se ele
  // estiver no PE, não pode ser remapeado de volta para MEI só porque a posição
  // broad dele é "MEI".
  picks.forEach((pk, i) => {
    if (knownIds.has(pk.slot)) {
      const slot = slots.find((s) => s.id === pk.slot)!;
      if (!usedSlotIds.has(slot.id) && fitsSlot(pk.player, slot)) {
        usedSlotIds.add(slot.id);
        slotOfPick[i] = slot.id;
      }
    }
  });

  // 1.5ª passada (defensiva): se o slot existe na formação e ainda está livre,
  // mas o jogador não é "fit", REI-reserva assim mesmo. Sem isso, o slot ficaria
  // aparentemente livre e um segundo pick poderia ser colocado em cima do
  // primeiro (bug clássico: dois jogadores empilhados no goleiro).
  picks.forEach((pk, i) => {
    if (slotOfPick[i]) return;
    if (!knownIds.has(pk.slot)) return;
    if (usedSlotIds.has(pk.slot)) return;
    usedSlotIds.add(pk.slot);
    slotOfPick[i] = pk.slot;
  });

  // 2ª passada: remaneja os que ficaram sem casa para qualquer slot real do
  // jogador, nunca por posição broad genérica.
  picks.forEach((pk, i) => {
    if (slotOfPick[i]) return;
    const pool = slots.filter((s) => fitsSlot(pk.player, s) && !usedSlotIds.has(s.id));
    if (pool.length) {
      const perfect = pool.find((s) => perfectFit(pk.player, s));
      const chosen = perfect ?? pool[0];
      usedSlotIds.add(chosen.id);
      slotOfPick[i] = chosen.id;
      return;
    }
    // Último recurso: joga em qualquer slot livre pra garantir 1 pick por slot
    // (com penalidade de off-position aplicada depois). Melhor "fora de posição"
    // do que dois picks colidindo no mesmo lugar.
    const anyFree = slots.find((s) => !usedSlotIds.has(s.id));
    if (anyFree) {
      usedSlotIds.add(anyFree.id);
      slotOfPick[i] = anyFree.id;
    }
  });
  // Retorna picks com slot atualizado (para poder salvar de novo se necessário).
  const migrated = picks.map((pk, i) => (slotOfPick[i] && slotOfPick[i] !== pk.slot ? { ...pk, slot: slotOfPick[i]! } : pk));
  return { picks: migrated, slotOfPick };
}


function buildPitchAssignments(picks: DraftPick[]): PitchAssignment[] {
  return picks.map((pk) => {
    const teamData = TEAMS.find((tt) => tt.name === pk.fromTeam);
    return {
      slotId: pk.slot,
      player: pk.player,
      fromColor: teamData?.color,
      fromShort: teamData?.short ?? (pk.player.legend ? "★" : undefined),
    };
  });
}

// Remapeia os picks para o melhor slot da formação atual e ajusta a posição
// efetiva para bater com o slot escalado (Ronaldinho na ponta conta como ATA,
// lateral subido também). Sem penalidade por "fora de posição" — o jogo só
// permite encaixar jogador em slot que ele serve, então o corte nunca disparava.
function squadWithFitPenalty(picks: DraftPick[], formation: FormationId): Player[] {
  const { picks: migrated } = assignPicksToSlots(picks, formation);
  const slots = slotsForFormation(formation);
  const badgeBonus = getPlayerBadgeOvrBonus();
  return migrated.map((pk) => {
    const slot = slots.find((s) => s.id === pk.slot);
    const effectivePos: Position = slot ? slot.pos : pk.player.position;
    const activeRole = slot ? slot.role : undefined;
    const finalOvr = pk.player.overall + (badgeBonus > 0 ? badgeBonus : 0);
    if (
      effectivePos === pk.player.position &&
      finalOvr === pk.player.overall &&
      pk.player.activeRole === activeRole
    ) return pk.player;
    return { ...pk.player, position: effectivePos, overall: finalOvr, activeRole };
  });
}


function DraftPhase({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const formation = state.formation ?? DEFAULT_FORMATION;
  const slots = slotsForFormation(formation);
  const POS_CAPS = getFormation(formation).caps;

  // Reconcilia picks existentes com os slots da formação atual.
  const migrated = useMemo(() => assignPicksToSlots(state.picks, formation), [state.picks, formation]);
  const currentPicks = migrated.picks;
  const assignedSlotIds = new Set<string>([
    ...(migrated.slotOfPick.filter(Boolean) as string[]),
    // Defesa extra: qualquer slot já referenciado por um pick conta como
    // ocupado, mesmo que a migração não tenha conseguido reservar. Evita
    // que o mesmo slot (ex.: goleiro) seja oferecido duas vezes.
    ...currentPicks.map((p) => p.slot).filter((id) => slots.some((s) => s.id === id)),
  ]);


  const currentTeamId = state.draftTeamRotation[state.draftIndex];
  const isLegends = currentTeamId === "lendas";
  const currentTeam = isLegends ? null : TEAMS.find((t) => t.id === currentTeamId);
  // Contamos por posição do SLOT em que o jogador foi escalado (não pela
  // posição "broad" declarada). Assim, um MEI/PON_E como Ronaldinho colocado
  // numa vaga ATA conta em ATA e não trava a cota do meio.
  const filled: Record<Position, number> = { GOL: 0, ZAG: 0, MEI: 0, ATA: 0 };
  for (const p of currentPicks) {
    const s = slots.find((sl) => sl.id === p.slot);
    filled[s ? s.pos : p.player.position]++;
  }
  const pickedKeys = new Set(currentPicks.map((p) => `${p.player.name}|${p.player.club ?? ""}`));
  // Nomes de QUALQUER jogador já escalado — usado pra impedir que uma mesma
  // lenda apareça de novo, independente do clube gravado no pick.
  const pickedAnyName = new Set(currentPicks.map((p) => p.player.name));
  const teamKey = (name: string) => `${name}|${currentTeam?.name ?? ""}`;
  const legendKey = (name: string) => `${name}|Lendas`;

  const [pickPickerFor, setPickPickerFor] = useState<Player | null>(null);
  const [swapFor, setSwapFor] = useState<{ pickIdx: number } | null>(null);

  const posOrder: Record<Position, number> = { GOL: 0, ZAG: 1, MEI: 2, ATA: 3 };
  // Reservas removidas do draft (feature causava problemas). Sempre ocultas.
  const isReserveHidden = (p: Player) => p.reserve !== undefined;
  const displayPlayers: Player[] = useMemo(() => {
    if (currentTeam) {
      const list = [...currentTeam.players].filter(
        (p) => !pickedKeys.has(teamKey(p.name)) && !isReserveHidden(p),
      );
      return list.sort((a, b) => posOrder[a.position] - posOrder[b.position]);
    }
    const byPos: Record<Position, Player[]> = { GOL: [], ZAG: [], MEI: [], ATA: [] };
    for (const l of LEGENDS) { if (l.legend && !pickedKeys.has(legendKey(l.name)) && !pickedAnyName.has(l.name)) byPos[l.position].push(l); }
    const out: Player[] = [];
    const perPos: Record<Position, number> = { GOL: 2, ZAG: 3, MEI: 3, ATA: 2 };
    const baseSeed = (state.draftSeed ?? 1) ^ ((state.draftIndex + 1) * 2654435761);
    (["GOL","ZAG","MEI","ATA"] as Position[]).forEach((pos, i) => {
      const shuf = seededShuffle(byPos[pos], baseSeed + i * 7919);
      out.push(...shuf.slice(0, perPos[pos]));
    });
    // Radar de posição (nó do Olheiro): no draft de LENDA, garante candidatos
    // das posições que ainda faltam preencher no time. Troca picks de posições
    // que já estão "sobrando" por uma lenda da posição em falta.
    const guarantee = getActiveCoachEffects().guaranteePositionCount ?? 0;
    if (guarantee > 0) {
      const openPosCount: Record<Position, number> = { GOL: 0, ZAG: 0, MEI: 0, ATA: 0 };
      for (const s of slots) if (!assignedSlotIds.has(s.id)) openPosCount[s.pos]++;
      const missing = (["GOL","ZAG","MEI","ATA"] as Position[])
        .filter((p) => openPosCount[p] > 0 && !out.some((c) => c.position === p));
      let swaps = 0;
      for (const pos of missing) {
        if (swaps >= guarantee) break;
        const candidate = seededShuffle(byPos[pos], baseSeed + 104729 + swaps)[0];
        if (!candidate || out.some((c) => c.name === candidate.name)) continue;
        // Remove um pick da posição mais "sobrando" (menos slots abertos).
        let victimIdx = -1;
        let victimScore = -Infinity;
        out.forEach((c, idx) => {
          const score = (out.filter((x) => x.position === c.position).length) - openPosCount[c.position];
          if (score > victimScore) { victimScore = score; victimIdx = idx; }
        });
        if (victimIdx >= 0) { out.splice(victimIdx, 1, candidate); swaps++; }
        else { out.push(candidate); swaps++; }
      }
    }
    // Salva-vidas do draft de LENDA: se nenhum candidato do pool cabe nos
    // slots que ainda faltam, injeta uma lenda compatível (substituindo o
    // último candidato). Evita softlock quando o jogador tem 1 vaga só e
    // os pulos acabaram.
    const openSlotsNow = slots.filter((s) => !assignedSlotIds.has(s.id));
    if (openSlotsNow.length > 0 && !out.some((p) => openSlotsNow.some((s) => fitsSlot(p, s)))) {
      const fitLegend = LEGENDS.find(
        (l) => l.legend
          && !pickedKeys.has(legendKey(l.name))
          && !pickedAnyName.has(l.name)
          && !out.some((c) => c.name === l.name)
          && openSlotsNow.some((s) => fitsSlot(l, s)),
      );
      if (fitLegend) {
        if (out.length > 0) out[out.length - 1] = fitLegend;
        else out.push(fitLegend);
      }
    }
    return out.sort((a, b) => posOrder[a.position] - posOrder[b.position]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.draftIndex, state.draftSeed, currentTeamId, assignedSlotIds]);

  const openSlotsList = slots.filter((s) => !assignedSlotIds.has(s.id));
  const openSlotsFor = (player: Player) =>
    openSlotsList.filter((s) => fitsSlot(player, s));

  // Pool completo do time/lendas da rodada (respeitando quem já foi escolhido).
  const sourcePool: Player[] = currentTeam
    ? currentTeam.players.filter(
        (p) => !pickedKeys.has(teamKey(p.name)) && !isReserveHidden(p),
      )
    : LEGENDS.filter((l) => l.legend && !pickedKeys.has(legendKey(l.name)) && !pickedAnyName.has(l.name));
  const fittableFromPool = sourcePool.filter((p) => openSlotsFor(p).length > 0);

  // Pool final: SEMPRE derivado 100% do time da rodada (nada de outro clube
  // "vazando"). Reservas ficam no fim do bloco da própria posição — nunca
  // isoladas no topo. Ordenação: posição (GOL→ATA), reserva depois, OVR desc.
  const finalDisplay: Player[] = (() => {
    if (currentTeam) {
      const keyOf = (p: Player) => p.name + "|" + currentTeam.name;
      const seen = new Set<string>();
      const dedup: Player[] = [];
      for (const p of sourcePool) {
        const k = keyOf(p);
        if (seen.has(k)) continue;
        seen.add(k);
        dedup.push(p);
      }
      return dedup.sort((a, b) => {
        const dp = posOrder[a.position] - posOrder[b.position];
        if (dp !== 0) return dp;
        const ra = a.reserve ? 1 : 0;
        const rb = b.reserve ? 1 : 0;
        if (ra !== rb) return ra - rb;
        return b.overall - a.overall;
      });
    }
    // Lendas: mantém a lógica de picking por posição já usada em displayPlayers.
    return displayPlayers;
  })();



  // Salva-vidas: se o time/lendas da rodada não tem NENHUM jogador que
  // caiba nos slots restantes, troca o clube da rodada automaticamente
  // (grátis, sem gastar pulo) por um time que tenha opção viável.
  const noneFittable = fittableFromPool.length === 0;
  useEffect(() => {
    if (!noneFittable) return;
    const used = new Set(state.draftTeamRotation);
    const skippedSet = new Set(state.draftSkippedTeams ?? []);
    const teamHasFit = (t: typeof TEAMS[number]) =>
      t.players.some(
        (p) => !pickedKeys.has(`${p.name}|${t.name}`) && openSlotsFor(p).length > 0,
      );
    let pool = TEAMS.filter((t) => t.id !== currentTeamId && !used.has(t.id) && !skippedSet.has(t.id) && teamHasFit(t));
    if (pool.length === 0) pool = TEAMS.filter((t) => t.id !== currentTeamId && !skippedSet.has(t.id) && teamHasFit(t));
    if (pool.length === 0) return;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    const rotation = [...state.draftTeamRotation];
    rotation[state.draftIndex] = chosen.id;
    setState({ ...state, draftTeamRotation: rotation });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noneFittable, state.draftIndex]);


  const placePlayer = (player: Player, slotId: string) => {
    const fromTeam = currentTeam ? currentTeam.name : "Lendas";
    // "Cartola dedicado" (olheiro.cartola): a cada 5ª pick (rodadas 5 e 10),
    // o jogador escolhido ganha +1 OVR permanente (+2 com o mirror tier-2).
    const roundIdx = state.draftIndex + 1; // 1..SQUAD_SIZE
    const cartolaBump = getActiveCoachEffects().buffEvery5thPick;
    const applyBump = cartolaBump > 0 && roundIdx % 5 === 0;
    const bumpedPlayer: Player = applyBump
      ? { ...player, overall: Math.min(99, player.overall + cartolaBump) }
      : player;
    const newPick: DraftPick = { slot: slotId, player: { ...bumpedPlayer, club: fromTeam }, fromTeam };
    const picks = [...currentPicks, newPick];
    sfx.pickConfirm();
    vibrate([18, 40, 26]);
    if (picks.length >= SQUAD_SIZE) setState({ ...state, picks, phase: "squad" });
    else setState({ ...state, picks, draftIndex: state.draftIndex + 1 });
    setPickPickerFor(null);
  };

  const onPickPlayer = (player: Player) => {
    // Não bloqueamos pela cota da posição "broad" do jogador: se ele tem um
    // role secundário (ex.: Ronaldinho como PON_E), openSlotsFor já garante
    // que só existe slot livre onde ele realmente pode jogar.
    if (openSlotsFor(player).length === 0) return;
    const open = openSlotsFor(player);
    if (open.length === 0) return;
    // Sempre exige clicar num slot do campo — mesmo com 1 opção — pra
    // deixar o draft mais gamificado.
    setSwapFor(null);
    setPickPickerFor(player);
    sfx.pickSelect();
    vibrate(12);
  };


  const skipsRemaining = state.draftSkipsRemaining ?? 0;
  const canSkip = skipsRemaining > 0;
  const skipTeam = () => {
    if (!canSkip) return;
    // Substitui o time atual por um time aleatório que ainda não apareceu
    // na rotação, nem foi pulado antes. Se o time pulado for um clube comum,
    // existe uma chance de o slot virar rodada de LENDAS (só se ainda houver
    // lenda disponível no pool).
    const used = new Set(state.draftTeamRotation);
    const skippedSet = new Set(state.draftSkippedTeams ?? []);
    if (currentTeamId && currentTeamId !== "lendas") skippedSet.add(currentTeamId);
    const rotation = [...state.draftTeamRotation];

    // Chance de virar "lendas" ao pular: 25% se o atual não é lenda e ainda
    // sobra lenda no pool que não foi escolhida em nenhuma rodada anterior.
    const pickedNames = new Set(state.picks.map((p) => p.player.name));
    const legendsAvailable = LEGENDS.some((l) => l.legend && !pickedNames.has(l.name));
    const wasLegendRound = currentTeamId === "lendas";
    const rollLegend = !wasLegendRound && legendsAvailable && Math.random() < 0.25;

    if (rollLegend) {
      rotation[state.draftIndex] = "lendas";
    } else {
      const candidates = TEAMS.map((t) => t.id).filter((id) => !used.has(id) && !skippedSet.has(id));
      if (candidates.length > 0) {
        rotation[state.draftIndex] = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        const alt = TEAMS.map((t) => t.id).filter((id) => id !== currentTeamId && !skippedSet.has(id));
        rotation[state.draftIndex] = alt[Math.floor(Math.random() * alt.length)] ?? currentTeamId;
      }
    }
    setPickPickerFor(null);
    setSwapFor(null);
    setState({
      ...state,
      draftTeamRotation: rotation,
      draftSkipsRemaining: skipsRemaining - 1,
      draftSkippedTeams: Array.from(skippedSet),
    });
  };


  const movePickToSlot = (pickIdx: number, targetSlotId: string) => {
    const target = slots.find((s) => s.id === targetSlotId);
    if (!target) return;
    const pick = currentPicks[pickIdx];
    if (!fitsSlot(pick.player, target)) return;
    const occupantIdx = currentPicks.findIndex((p, i) => i !== pickIdx && p.slot === targetSlotId);
    const sourceSlot = slots.find((s) => s.id === pick.slot);
    let newPicks = [...currentPicks];
    if (occupantIdx >= 0) {
      // Swap: só se o ocupante também couber no slot de origem.
      if (!sourceSlot || !fitsSlot(newPicks[occupantIdx].player, sourceSlot)) return;
      newPicks[occupantIdx] = { ...newPicks[occupantIdx], slot: pick.slot };
    }
    newPicks[pickIdx] = { ...pick, slot: targetSlotId };
    setState({ ...state, picks: newPicks });
    setSwapFor(null);
  };

  const badgeShort = currentTeam ? currentTeam.short : "★";
  const badgeColor = currentTeam ? currentTeam.color : "#c084fc";
  const teamLabel = currentTeam ? currentTeam.name : "Lendas do Futebol Brasileiro";
  // "Contato Externo" (olheiro.contato): revela o próximo clube da rotação.
  const peekEnabled = getActiveCoachEffects().peekNextPool;
  const nextTeamId = peekEnabled ? state.draftTeamRotation[state.draftIndex + 1] : undefined;
  const nextTeam = nextTeamId ? TEAMS.find((t) => t.id === nextTeamId) : undefined;
  const nextTeamLabel = peekEnabled ? (state.draftIndex + 1 >= SQUAD_SIZE ? null : nextTeam?.name ?? "Lendas") : null;

  const assignments = buildPitchAssignments(currentPicks);
  const highlight = pickPickerFor ? openSlotsFor(pickPickerFor).map((s) => s.id) : swapFor ? compatSwapSlotIds(currentPicks, swapFor.pickIdx, slots) : [];

  return (
    <div className="animate-slide-up">
      {/* Scoreboard TV do draft */}
      <div className="scoreboard-tv mb-3 flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/60">Rodada do draft</div>
          <div className="font-display text-3xl leading-none gold-text">
            {String(state.draftIndex + 1).padStart(2, "0")}
            <span className="ml-1 text-lg text-white/40">/ {SQUAD_SIZE}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest text-white/60">Faltam</div>
          <div className="font-display text-3xl leading-none">{SQUAD_SIZE - currentPicks.length}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-white/60">Pulos</div>
          <div className="font-display text-3xl leading-none flex items-center justify-end gap-0.5">
            {Array.from({ length: Math.max(3, state.draftSkipsRemaining ?? 0) }).map((_, i) => (
              <span key={i} className={`inline-block h-3 w-3 rounded-full ${i < (state.draftSkipsRemaining ?? 0) ? "bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_8px_rgba(250,204,21,0.7)]" : "bg-white/10 border border-white/15"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Barra de progresso premium */}
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(currentPicks.length / SQUAD_SIZE) * 100}%`,
            background: "linear-gradient(90deg, oklch(0.55 0.19 145), oklch(0.85 0.19 90))",
            boxShadow: "0 0 12px oklch(0.85 0.19 90 / 0.7)",
          }}
        />
      </div>

      <SquadRatingPanel picks={currentPicks} formation={formation} tactic={state.tactic} />

      {/* Campo interativo */}
      <div className="mb-3">
        <Pitch
          formation={formation}
          assignments={assignments}
          highlightSlotIds={highlight}
          onSlotClick={(slot, occupied) => {
            if (pickPickerFor) {
              // Escolhendo onde colocar o novo jogador
              if (highlight.includes(slot.id)) placePlayer(pickPickerFor, slot.id);
              return;
            }
            if (swapFor) {
              if (highlight.includes(slot.id)) movePickToSlot(swapFor.pickIdx, slot.id);
              return;
            }
            if (occupied) {
              const idx = currentPicks.findIndex((p) => p.slot === slot.id);
              if (idx >= 0) setSwapFor({ pickIdx: idx });
            }
          }}
        />
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <div>{getFormation(formation).label} · toque no jogador e depois no slot piscando</div>
          {(pickPickerFor || swapFor) && (
            <button onClick={() => { setPickPickerFor(null); setSwapFor(null); }} className="sticker-close">Cancelar</button>
          )}
        </div>
      </div>

      {/* Ações contextuais */}
      {pickPickerFor && (
        <div className="mb-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm">
          Toque em um <b>slot amarelo</b> do campo pra colocar <b>{pickPickerFor.name}</b> lá.
          <div className="mt-1 text-xs text-white/70">Roles do jogador: {playerRolesLabel(pickPickerFor)}</div>
        </div>
      )}
      {swapFor && (
        <div className="mb-3 rounded-xl border border-blue-500/40 bg-blue-500/10 p-3 text-sm">
          Movendo <b>{currentPicks[swapFor.pickIdx].player.name}</b>. Toque em outro slot compatível pra mover ou trocar.
          <div className="mt-1 text-xs text-white/70">Roles: {playerRolesLabel(currentPicks[swapFor.pickIdx].player)}</div>
        </div>
      )}

      {/* Header do clube da rodada */}
      <div className={`mb-3 flex items-center gap-3 sticker-card p-3 ${isLegends ? "star-burst" : ""}`}>
        <TeamBadge short={badgeShort} color={badgeColor} size={52} />
        <div className="flex-1 min-w-0">
          <div className="ribbon-tag text-[10px]">{isLegends ? "Rodada especial" : "Clube da rodada"}</div>
          <div className="cartoon-title text-2xl mt-1 truncate flex items-center gap-1">{teamLabel}{isLegends && <span>👑</span>}</div>
          <div className="text-[10px] text-white/70 mt-0.5">{state.mode === "classico" ? "🔒 Modo Clássico — força escondida" : "Escolha 1 jogador"}</div>
          {nextTeamLabel && (
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-purple-500/25 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-purple-100 ring-1 ring-purple-300/40 border border-black/40">
              🔮 Próximo: <b className="font-semibold">{nextTeamLabel}</b>
            </div>
          )}
        </div>
        <button
          onClick={skipTeam}
          disabled={!canSkip}
          title={canSkip ? "Trocar o clube da rodada por outro" : "Sem pulos disponíveis"}
          className={`flex flex-col items-center gap-0.5 rounded-xl border-2 border-black px-3 py-2 text-xs font-black uppercase tracking-wide transition ${canSkip ? "bg-yellow-300 text-black shadow-[0_3px_0_#000] active:translate-y-[2px] active:shadow-[0_1px_0_#000]" : "cursor-not-allowed bg-secondary/40 text-muted-foreground opacity-50 border-black/40"}`}
        >
          <span>⏭ Pular</span>
          <span className="text-[10px] opacity-80">{skipsRemaining} restante{skipsRemaining === 1 ? "" : "s"}</span>
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5 text-[10px]">
        {(["GOL","ZAG","MEI","ATA"] as Position[]).map((p) => {
          const done = filled[p] >= POS_CAPS[p];
          return <span key={p} className={`rounded-full border-2 border-black px-2.5 py-0.5 font-display uppercase tracking-wider shadow-[0_2px_0_#000] ${done ? "bg-emerald-400 text-black line-through" : "bg-white/95 text-black"}`}>{POS_LABEL[p]} {filled[p]}/{POS_CAPS[p]}</span>;
        })}
      </div>
      <div key={`draft-pool-${currentTeamId}-${state.draftIndex}`} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">

        {finalDisplay.map((p, idx) => {
          // Hard 🔥 no draft inicial: trava jogadores com OVR > 80.
          const hardLock = state.mode === "hard" && (state.hardStage ?? 0) === 0 && p.overall > 80;
          const disabled = hardLock || openSlotsFor(p).length === 0;
          const rolesTxt = playerRolesLabel(p);
          const selected = pickPickerFor?.name === p.name && (pickPickerFor?.club ?? "") === (p.club ?? "");
          const showOvr = state.mode !== "classico";
          const broads = playerBroads(p);
          const primaryBroad = broads[0];
          const secondBroad = broads[1];
          const posGrad = posGradFor(primaryBroad);
          const posGrad2 = secondBroad ? posGradFor(secondBroad) : null;
          const cardBg = cardBgFor(primaryBroad);
          const ovrColor = !showOvr ? "text-white/40" : p.overall >= 88 ? "gold-text" : p.overall >= 82 ? "gold-text" : "text-white";
          const roles = deriveRoles(p).slice(0, 3);
          return (
            <button
              key={p.name + "|" + (p.club || "")}
              onClick={() => onPickPlayer(p)}
              disabled={disabled}
              title={hardLock ? "🔒 Bloqueado no Hard: OVR acima de 80" : undefined}
              style={{ animationDelay: `${Math.min(idx * 40, 400)}ms`, background: cardBg }}
              className={`player-card ${p.legend ? "player-card-legend" : ""} animate-pop-in group relative flex aspect-[3/4] w-full flex-col items-stretch overflow-hidden p-3 text-left transition-all duration-200 ${
                selected ? "-translate-y-1 scale-[1.03] ring-2 ring-yellow-300 shadow-[0_0_28px_rgba(250,204,21,0.6)] glow-pulse" : "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(0,0,0,0.85)]"
              } ${disabled ? "opacity-40 grayscale cursor-not-allowed" : ""} ${hardLock ? "ring-2 ring-orange-500/40" : ""}`}
            >
              {hardLock && (
                <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/40">
                  <div className="rounded-lg border-2 border-orange-400 bg-black/70 px-2 py-1 font-display text-xs text-orange-200 shadow-lg">🔒 OVR &gt; 80</div>
                </div>
              )}
              {/* Split diagonal ( / ): triângulo inferior-esquerdo com a cor da 2ª posição */}
              {secondBroad && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[2px] rounded-[0.75rem]"
                  style={{
                    background: posTintFor(secondBroad),
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                  }}
                />
              )}
              {/* Linha de corte dourada alinhada ao mesmo diagonal */}
              {secondBroad && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[2px] rounded-[0.75rem] overflow-hidden"
                  style={{
                    background: "linear-gradient(to top right, transparent calc(50% - 1.2px), rgba(250,204,21,0.9) 50%, transparent calc(50% + 1.2px))",
                  }}
                />
              )}
              {/* Faixas laterais: esquerda = 2ª posição (dominante nesse lado), direita = 1ª */}
              <div aria-hidden className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: posGrad2 ?? posGrad }} />
              {secondBroad && (
                <div aria-hidden className="absolute right-0 top-0 bottom-0 w-[3px]" style={{ background: posGrad }} />
              )}
              {/* Brilho superior sutil */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />


              {/* Selo de seleção */}
              {selected && (
                <div className="absolute right-2 top-2 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-[13px] font-black text-black shadow-[0_2px_10px_rgba(250,204,21,0.7)] animate-pop-in">✓</div>
              )}

              {/* Topo: OVR grande + posição + crest */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex flex-col items-center leading-none">
                  <div
                    className={`font-display text-[44px] leading-[0.9] tracking-tight ${ovrColor}`}
                    style={{
                      filter:
                        !showOvr
                          ? "drop-shadow(0 2px 3px rgba(0,0,0,0.85))"
                          : p.overall >= 88
                          ? "drop-shadow(0 0 10px rgba(255,200,80,0.65))"
                          : p.overall >= 82
                          ? "drop-shadow(0 0 6px rgba(255,205,90,0.5))"
                          : "drop-shadow(0 2px 3px rgba(0,0,0,0.85))",
                    }}
                  >
                    {showOvr ? (getActiveCoachEffects().showDecimalOVR ? p.overall.toFixed(1) : p.overall) : "?"}
                  </div>
                  {secondBroad ? (
                    <div className="mt-1 flex items-center gap-[3px]">
                      <span
                        className="rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                        style={{ background: posGrad }}
                      >
                        {primaryBroad}
                      </span>
                      <span
                        className="rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                        style={{ background: posGrad2! }}
                      >
                        {secondBroad}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="mt-1 rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                      style={{ background: posGrad }}
                    >
                      {p.position}
                    </div>
                  )}

                </div>
                <div className="flex flex-col items-end gap-1">
                  <TeamBadge short={badgeShort} color={badgeColor} size={34} />
                  {p.legend && (
                    <span className="rounded-sm bg-yellow-300/95 px-1 py-[1px] font-display text-[9px] font-black tracking-wider text-black shadow">👑 LENDA</span>
                  )}
                  {p.reserve && !p.legend && (
                    <span className="rounded-sm bg-purple-400/95 px-1 py-[1px] font-display text-[9px] font-black tracking-wider text-black shadow" title={`Reserva do ${currentTeam?.name ?? ""}`}>🔎 RESERVA</span>
                  )}
                </div>
              </div>

              {/* Miolo: NOME grande + crest ghosted */}
              <div className="relative z-0 mt-1 flex flex-1 flex-col items-center justify-center px-1 text-center">
                <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.09]">
                  <TeamBadge short={badgeShort} color={badgeColor} size={80} />
                </div>
                <div
                  className="relative z-10 font-condensed text-[22px] font-black uppercase leading-[0.95] tracking-tight"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #fffbe6 0%, #ffe98a 42%, #f6c343 62%, #b8862a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))",
                  }}
                >
                  {p.name}
                </div>
                {p.club && (
                  <div className="relative z-10 mt-1 truncate max-w-full text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                    {p.club}
                  </div>
                )}
              </div>

              {/* Divisor dourado */}
              <div aria-hidden className="relative z-10 my-1.5 h-px w-full bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />

              {/* Rodapé: chips grandes de posição */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-1">
                {roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-md px-2 py-1 font-display text-[13px] font-black uppercase tracking-wider text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.4)] ring-1 ring-white/15"
                    style={{ background: posGradFor(roleToBroad(r)) }}
                  >
                    {r}
                  </span>
                ))}
              </div>

              {(disabled || selected) && (
                <div className="relative z-10 mt-1.5 flex justify-center">
                  {disabled ? (
                    <span className="rounded-md bg-red-500/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-300 ring-1 ring-red-400/30">Sem vaga</span>
                  ) : (
                    <span className="rounded-md bg-yellow-400 px-2 py-0.5 font-display text-[11px] font-black uppercase tracking-wider text-black animate-pulse shadow">Escolher slot ↓</span>
                  )}
                </div>
              )}

              {/* Shimmer sweep on hover */}
              <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          );
        })}
      </div>
    </div>
  );
}



// Slots elegíveis pra receber o pick indexado (mesma posição broad, e se
// ocupados, o ocupante precisa caber no slot de origem — troca).
function compatSwapSlotIds(picks: DraftPick[], pickIdx: number, slots: SlotDef[]): string[] {
  const pick = picks[pickIdx];
  const sourceSlot = slots.find((s) => s.id === pick.slot);
  const out: string[] = [];
  for (const s of slots) {
    if (s.id === pick.slot) continue;
    if (!fitsSlot(pick.player, s)) continue;
    const occupant = picks.find((p, i) => i !== pickIdx && p.slot === s.id);
    if (!occupant) { out.push(s.id); continue; }
    if (sourceSlot && fitsSlot(occupant.player, sourceSlot)) out.push(s.id);
  }
  return out;
}

/* ─────────────  Bonus draft (craques extras entre campeonatos)  ───────────── */

function BonusDraftPhase({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const remaining = state.bonusRemaining ?? 0;
  const next = state.bonusNext!;
  const formation = state.formation ?? DEFAULT_FORMATION;
  const [selectedLegend, setSelectedLegend] = useState<Player | null>(null);

  const includeIntl = !!state.bonusIncludeIntl;
  // Exclui QUALQUER jogador já no elenco pelo nome — assim uma lenda que já
  // foi escolhida (mesmo que o clube gravado no pick tenha sido alterado)
  // não pode reaparecer no pool.
  const pickedAnyName = useMemo(
    () => new Set(state.picks.map((p) => p.player.name)),
    [state.picks],
  );
  const available = useMemo(() => {
    const byPos: Record<Position, Player[]> = { GOL: [], ZAG: [], MEI: [], ATA: [] };
    for (const l of LEGENDS) if (l.legend && !pickedAnyName.has(l.name)) byPos[l.position].push(l);
    if (includeIntl) {
      // Peso 3x para internacionais: nas copas, aparecem mais internacionais que brasileiros no pool.
      for (const l of INTERNATIONAL_LEGENDS) if (l.legend && !pickedAnyName.has(l.name)) {
        byPos[l.position].push(l, l, l);
      }
    }
    const out: Player[] = [];
    const perPos: Record<Position, number> = { GOL: 2, ZAG: 3, MEI: 3, ATA: 2 };
    const kindSeed = next === "libertadores" ? 11 : next === "sulamericana" ? 22 : 33;
    const baseSeed = (state.draftSeed ?? 1) ^ (kindSeed * 1013904223) ^ ((remaining + 1) * 2654435761);
    (["GOL","ZAG","MEI","ATA"] as Position[]).forEach((pos, i) => {
      const shuf = seededShuffle(byPos[pos], baseSeed + i * 7919);
      const picked: Player[] = [];
      const seen = new Set<string>();
      for (const p of shuf) {
        if (seen.has(p.name)) continue;
        seen.add(p.name);
        picked.push(p);
        if (picked.length >= perPos[pos]) break;
      }
      out.push(...picked);
    });
    const posOrder: Record<Position, number> = { GOL: 0, ZAG: 1, MEI: 2, ATA: 3 };
    return out.sort((a, b) => posOrder[a.position] - posOrder[b.position]);
  }, [remaining, next, state.draftSeed, pickedAnyName, includeIntl]);



  const finish = (picks: DraftPick[]) => {
    const left = remaining - 1;
    if (left <= 0) {
      if (state.bonusReturnToKO && state.comp) {
        // Bônus por passar da fase de grupos sem perder: volta pro mata-mata da copa em curso.
        setState({ ...state, picks, phase: "compKOIntro", bonusRemaining: 0, bonusNext: undefined, bonusReturnToKO: false, bonusIncludeIntl: false });
      } else {
        const squad = picks.map((p) => p.player);
        const comp = buildCompetition(next, state.teamName, teamOverall(squad));
        setState({ ...state, picks, comp, phase: "compIntro", bonusRemaining: 0, bonusNext: undefined, bonusIncludeIntl: false });
      }
    } else {
      setState({ ...state, picks, bonusRemaining: left });
      setSelectedLegend(null);
    }
  };

  const swapAtSlot = (slotId: string) => {
    if (!selectedLegend) return;
    const slot = slotsForFormation(formation).find((s) => s.id === slotId);
    if (!slot || !fitsSlot(selectedLegend, slot)) return;
    const target = state.picks.find((p) => p.slot === slotId);
    if (!target) return;
    const newPicks = state.picks.map((p) =>
      p === target ? { ...p, player: { ...selectedLegend }, fromTeam: selectedLegend.club ?? "Lendas" } : p,
    );
    finish(newPicks);
  };

  const assignments = buildPitchAssignments(state.picks);
  const highlight = selectedLegend
    ? state.picks
        .filter((p) => {
          const slot = slotsForFormation(formation).find((s) => s.id === p.slot);
          return !!slot && fitsSlot(selectedLegend, slot);
        })
        .map((p) => p.slot)
    : [];

  const skipLegend = () => {
    setSelectedLegend(null);
    finish(state.picks);
  };

  const nextLabel = next === "libertadores" ? "🏆 Libertadores" : next === "sulamericana" ? "🥈 Sul-Americana" : "🌍 Mundial";

  return (
    <div className="animate-slide-up">
      <div className="mb-3 sticker-card star-burst p-4 text-center">
        <div className="ribbon-tag text-[10px]">Reforço para {nextLabel}</div>
        <div className="mt-2 cartoon-title text-3xl">Escolha {remaining === 1 ? "1 lenda" : `${remaining} lendas`}</div>
        <div className="mt-1.5 text-xs text-white/80">
          {selectedLegend
            ? "Toque no jogador do campo que vai sair"
            : "Escolha uma lenda, depois toque no jogador que ela substitui"}
        </div>
      </div>

      <SquadRatingPanel picks={state.picks} formation={formation} tactic={state.tactic} />

      {/* Campo interativo mostrando seu elenco atual */}
      <div className="mb-3">
        <Pitch
          formation={formation}
          assignments={assignments}
          highlightSlotIds={highlight}
          onSlotClick={(slot) => {
            if (!selectedLegend) return;
            if (highlight.includes(slot.id)) swapAtSlot(slot.id);
          }}
        />
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <div>{getFormation(formation).label} · Toque em um <span className="text-yellow-300">slot amarelo</span> pra trocar</div>
          {selectedLegend && (
            <button onClick={() => setSelectedLegend(null)} className="sticker-close">Cancelar</button>
          )}
        </div>
      </div>

      {selectedLegend ? (
        <div className="mb-3 rounded-xl border border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TeamBadge short="★" color="#c084fc" size={32} />
              <div>
                <div className="font-semibold">{selectedLegend.name} 👑</div>
                <div className="text-xs text-muted-foreground">{playerRolesLabel(selectedLegend)} · Toque no campo pra escolher quem sai</div>
              </div>
            </div>
            <OvrChip ovr={selectedLegend.overall} />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs uppercase text-muted-foreground">Lendas disponíveis</div>
            <button
              onClick={skipLegend}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs hover:border-primary hover:bg-primary hover:text-primary-foreground"
              title="Pular essa chance de reforço"
            >
              ⏭ Não escolher
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {available.map((p, idx) => {
              const broads = playerBroads(p);
              const primaryBroad = broads[0];
              const secondBroad = broads[1];
              const posGrad = posGradFor(primaryBroad);
              const posGrad2 = secondBroad ? posGradFor(secondBroad) : null;
              const cardBg = cardBgFor(primaryBroad);
              const ovrColor = p.overall >= 82 ? "gold-text" : "text-white";
              return (
                <button
                  key={p.name}
                  onClick={() => setSelectedLegend(p)}
                  style={{ animationDelay: `${Math.min(idx * 40, 400)}ms`, background: cardBg }}
                  className="player-card player-card-legend animate-pop-in group relative flex aspect-[3/4] w-full flex-col items-stretch overflow-hidden p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(0,0,0,0.85)]"
                >
                  {secondBroad && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[2px] rounded-[0.75rem]"
                      style={{ background: posTintFor(secondBroad), clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
                    />
                  )}
                  {secondBroad && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[2px] rounded-[0.75rem] overflow-hidden"
                      style={{ background: "linear-gradient(to top right, transparent calc(50% - 1.2px), rgba(250,204,21,0.9) 50%, transparent calc(50% + 1.2px))" }}
                    />
                  )}
                  <div aria-hidden className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: posGrad2 ?? posGrad }} />
                  {secondBroad && (
                    <div aria-hidden className="absolute right-0 top-0 bottom-0 w-[3px]" style={{ background: posGrad }} />
                  )}
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col items-center leading-none">
                      <div
                        className={`font-display text-[44px] leading-[0.9] tracking-tight ${ovrColor}`}
                        style={{ filter: p.overall >= 88 ? "drop-shadow(0 0 10px rgba(255,200,80,0.65))" : p.overall >= 82 ? "drop-shadow(0 0 6px rgba(255,205,90,0.5))" : "drop-shadow(0 2px 3px rgba(0,0,0,0.85))" }}
                      >
                        {getActiveCoachEffects().showDecimalOVR ? p.overall.toFixed(1) : p.overall}
                      </div>
                      {secondBroad ? (
                        <div className="mt-1 flex items-center gap-[3px]">
                          <span className="rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner" style={{ background: posGrad }}>{primaryBroad}</span>
                          <span className="rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner" style={{ background: posGrad2! }}>{secondBroad}</span>
                        </div>
                      ) : (
                        <div
                          className="mt-1 rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                          style={{ background: posGrad }}
                        >
                          {p.position}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">

                      <TeamBadge short="★" color="#c084fc" size={34} />
                      <span className="rounded-sm bg-yellow-300/95 px-1 py-[1px] font-display text-[9px] font-black tracking-wider text-black shadow">👑 LENDA</span>
                    </div>
                  </div>

                  <div className="relative z-0 mt-1 flex flex-1 flex-col items-center justify-center px-1 text-center">
                    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.09]">
                      <TeamBadge short="★" color="#c084fc" size={80} />
                    </div>
                    <div
                      className="relative z-10 font-condensed text-[18px] font-black uppercase leading-[0.95] tracking-tight"
                      style={{ background: "linear-gradient(180deg,#fff8e1,#f7d774)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))" }}
                    >
                      {p.name}
                    </div>
                    <div className="relative z-10 mt-1 text-[10px] uppercase tracking-wider text-white/70">
                      {playerRolesLabel(p)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────  Hard Mid-Season Draft (após 10/20 jogos)  ───────────── */

function HardMidDraftPhase({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const remaining = state.hardMidDraftRemaining ?? 0;
  const cap = null as number | null;
  const stage = state.hardStage ?? 0;
  const formation = state.formation ?? DEFAULT_FORMATION;
  const [selected, setSelected] = useState<Player | null>(null);

  const pickedAnyName = useMemo(() => new Set(state.picks.map((p) => p.player.name)), [state.picks]);

  const rerollsLeft = state.hardMidDraftRerolls ?? 0;
  const rerolledThisRound = !!state.hardMidDraftRerolledThisRound;
  const canReroll = !rerolledThisRound && rerollsLeft > 0;

  // Pool: rotaciona 1 clube (elenco inteiro) por rodada — igual ao draft inicial.
  // O cap não filtra: jogadores acima ficam bloqueados visualmente (🔒).
  const seedBase = state.hardMidDraftSeed ?? (((state.draftSeed ?? 1) ^ ((stage + 1) * 97531)) >>> 0);
  const currentClub = useMemo(() => {
    const eligible = TEAMS.filter((t) => t.players.some((p) => p.reserve === undefined && !pickedAnyName.has(p.name)));
    if (eligible.length === 0) return null;
    return eligible[seedBase % eligible.length];
  }, [seedBase, pickedAnyName]);
  const available = useMemo(() => {
    if (!currentClub) return [] as Player[];
    const posOrder: Record<string, number> = { GOL: 0, ZAG: 1, MEI: 2, ATA: 3 };
    return currentClub.players
      .filter((p) => p.reserve === undefined && !pickedAnyName.has(p.name))
      .map((p) => ({ ...p, club: currentClub.name }))
      .sort((a, b) => {
        const pa = posOrder[a.position] ?? 99;
        const pb = posOrder[b.position] ?? 99;
        if (pa !== pb) return pa - pb;
        return b.overall - a.overall;
      });
  }, [currentClub, pickedAnyName]);

  const swapAtSlot = (slotId: string) => {
    if (!selected) return;
    const slot = slotsForFormation(formation).find((s) => s.id === slotId);
    if (!slot || !fitsSlot(selected, slot)) return;
    const target = state.picks.find((p) => p.slot === slotId);
    if (!target) return;
    const newPicks = state.picks.map((p) =>
      p === target ? { ...p, player: { ...selected }, fromTeam: selected.club ?? "Reforço" } : p,
    );
    finish(newPicks);
  };

  const finish = (picks: DraftPick[]) => {
    const left = remaining - 1;
    if (left <= 0) {
      // Fim do draft do meio: avança de stage e volta pra temporada.
      const nextStage: 0 | 1 | 2 | 3 = stage === 0 ? 1 : stage === 1 ? 2 : stage;
      setState({
        ...state,
        picks,
        phase: "season",
        hardMidDraftRemaining: 0,
        hardMidDraftCap: null,
        hardMidDraftRerolls: 0,
        hardMidDraftRerolledThisRound: false,
        hardStage: nextStage,
      });
      setSelected(null);
    } else {
      setState({
        ...state,
        picks,
        hardMidDraftRemaining: left,
        // Nova rodada de escolha → libera o reroll grátis de novo.
        hardMidDraftRerolledThisRound: false,
      });
      setSelected(null);
    }
  };

  const skip = () => {
    setSelected(null);
    if (canReroll) {
      // 1º pular da rodada = rerola o pool sem consumir escolha.
      const nextSeed = ((state.hardMidDraftSeed ?? 0) * 1664525 + 1013904223) >>> 0;
      setState({
        ...state,
        hardMidDraftSeed: nextSeed,
        hardMidDraftRerolls: rerollsLeft - 1,
        hardMidDraftRerolledThisRound: true,
      });
      return;
    }
    // 2º pular (ou sem rerolls) = consome uma escolha.
    finish(state.picks);
  };

  const assignments = buildPitchAssignments(state.picks);
  const highlight = selected
    ? state.picks
        .filter((p) => {
          const slot = slotsForFormation(formation).find((s) => s.id === p.slot);
          return !!slot && fitsSlot(selected, slot);
        })
        .map((p) => p.slot)
    : [];

  const stageLabel = stage === 0 ? "Reforço · Rodada 10" : "Reforço · Rodada 20";
  const capLabel = cap === null ? "Sem bloqueios" : `🔒 OVR > ${cap} bloqueado`;
  const clubBadgeShort = currentClub?.short ?? "★";
  const clubBadgeColor = currentClub?.color ?? "#c084fc";

  return (
    <div className="animate-slide-up">
      <div className="mb-3 sticker-card star-burst p-4 text-center">
        <div className="ribbon-tag text-[10px]">Modo Hard 🔥 · {stageLabel}</div>
        <div className="mt-2 cartoon-title text-3xl">Escolha {remaining === 1 ? "1 reforço" : `${remaining} reforços`}</div>
        <div className="mt-1 text-xs text-white/80">
          {selected ? "Toque no jogador do campo que vai sair" : "Escolha um reforço, depois toque no titular que vai sair"}
        </div>
        <div className="mt-1.5 inline-block rounded-full border-2 border-black bg-orange-400 px-2.5 py-0.5 font-display text-[10px] text-black shadow-[0_2px_0_#000]">
          {capLabel}
        </div>
      </div>

      {currentClub && (
        <div className="mb-3 flex items-center gap-3 sticker-card p-3">
          <TeamBadge short={clubBadgeShort} color={clubBadgeColor} size={52} />
          <div className="flex-1 min-w-0">
            <div className="ribbon-tag text-[10px]">Clube da rodada</div>
            <div className="cartoon-title text-2xl mt-1 truncate">{currentClub.name}</div>
            <div className="text-[10px] text-white/70 mt-0.5">Elenco completo · escolha 1 jogador</div>
          </div>
        </div>
      )}

      <SquadRatingPanel picks={state.picks} formation={formation} tactic={state.tactic} />

      <div className="mb-3">
        <Pitch
          formation={formation}
          assignments={assignments}
          highlightSlotIds={highlight}
          onSlotClick={(slot) => {
            if (!selected) return;
            if (highlight.includes(slot.id)) swapAtSlot(slot.id);
          }}
        />
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="text-[11px] uppercase tracking-widest text-orange-300">{available.length} candidatos</div>
          <div className="flex items-center gap-1 rounded-full border border-orange-400/40 bg-orange-500/10 px-2 py-0.5 text-[10px] font-display text-orange-200">
            🔄 {rerollsLeft} {rerollsLeft === 1 ? "reroll" : "rerolls"}
          </div>
        </div>
        <button
          onClick={skip}
          className={`sticker-btn px-3 py-1 text-xs ${canReroll ? "sticker-btn-primary" : "sticker-btn-danger"}`}
          title={canReroll ? "1º pular da rodada rerola o pool sem gastar escolha" : "Vai consumir 1 escolha"}
        >
          {canReroll ? `🔄 Trocar pool (${rerollsLeft})` : "Pular (consome 1)"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {available.map((p, idx) => {
          const broads = playerBroads(p);
          const primaryBroad = broads[0];
          const secondBroad = broads[1];
          const posGrad = posGradFor(primaryBroad);
          const posGrad2 = secondBroad ? posGradFor(secondBroad) : null;
          const cardBg = cardBgFor(primaryBroad);
          const isSel = selected?.name === p.name && (selected?.club ?? "") === (p.club ?? "");
          const ovrColor = p.overall >= 88 ? "gold-text" : p.overall >= 82 ? "gold-text" : "text-white";
          const roles = deriveRoles(p).slice(0, 3);
          const team = TEAMS.find((tt) => tt.name === p.club);
          const badgeShort = team ? team.short : "★";
          const badgeColor = team ? team.color : "#c084fc";
          const hardLock = cap !== null && p.overall > cap;
          return (
            <button
              key={p.name + "|" + (p.club ?? "")}
              onClick={() => { if (!hardLock) setSelected(p); }}
              disabled={hardLock}
              title={hardLock ? `🔒 Bloqueado: OVR acima de ${cap}` : undefined}
              style={{ animationDelay: `${Math.min(idx * 30, 300)}ms`, background: cardBg }}
              className={`player-card ${p.legend ? "player-card-legend" : ""} animate-pop-in group relative flex aspect-[3/4] w-full flex-col items-stretch overflow-hidden p-3 text-left transition-all duration-200 ${
                isSel ? "-translate-y-1 scale-[1.03] ring-2 ring-orange-300 shadow-[0_0_28px_rgba(251,146,60,0.55)] glow-pulse" : "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(0,0,0,0.85)]"
              } ${hardLock ? "opacity-40 grayscale cursor-not-allowed ring-2 ring-orange-500/40" : ""}`}
            >
              {hardLock && (
                <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/40">
                  <div className="rounded-lg border-2 border-orange-400 bg-black/70 px-2 py-1 font-display text-xs text-orange-200 shadow-lg">🔒 OVR &gt; {cap}</div>
                </div>
              )}
              {/* Split diagonal para 2ª posição */}
              {secondBroad && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[2px] rounded-[0.75rem]"
                  style={{
                    background: posTintFor(secondBroad),
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                  }}
                />
              )}
              {secondBroad && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[2px] rounded-[0.75rem] overflow-hidden"
                  style={{
                    background: "linear-gradient(to top right, transparent calc(50% - 1.2px), rgba(250,204,21,0.9) 50%, transparent calc(50% + 1.2px))",
                  }}
                />
              )}
              <div aria-hidden className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: posGrad2 ?? posGrad }} />
              {secondBroad && (
                <div aria-hidden className="absolute right-0 top-0 bottom-0 w-[3px]" style={{ background: posGrad }} />
              )}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />

              {isSel && (
                <div className="absolute right-2 top-2 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-300 text-[13px] font-black text-black shadow-[0_2px_10px_rgba(251,146,60,0.7)] animate-pop-in">✓</div>
              )}

              {/* Topo: OVR + posição + crest */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex flex-col items-center leading-none">
                  <div
                    className={`font-display text-[44px] leading-[0.9] tracking-tight ${ovrColor}`}
                    style={{
                      filter:
                        p.overall >= 88
                          ? "drop-shadow(0 0 10px rgba(255,200,80,0.65))"
                          : p.overall >= 82
                          ? "drop-shadow(0 0 6px rgba(255,205,90,0.5))"
                          : "drop-shadow(0 2px 3px rgba(0,0,0,0.85))",
                    }}
                  >
                    {getActiveCoachEffects().showDecimalOVR ? p.overall.toFixed(1) : p.overall}
                  </div>
                  {secondBroad ? (
                    <div className="mt-1 flex items-center gap-[3px]">
                      <span
                        className="rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                        style={{ background: posGrad }}
                      >
                        {primaryBroad}
                      </span>
                      <span
                        className="rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                        style={{ background: posGrad2! }}
                      >
                        {secondBroad}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="mt-1 rounded-md px-1.5 py-0.5 font-display text-[11px] font-black uppercase tracking-widest text-white shadow-inner"
                      style={{ background: posGrad }}
                    >
                      {p.position}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <TeamBadge short={badgeShort} color={badgeColor} size={34} />
                  {p.legend && (
                    <span className="rounded-sm bg-yellow-300/95 px-1 py-[1px] font-display text-[9px] font-black tracking-wider text-black shadow">👑 LENDA</span>
                  )}
                  {p.reserve && !p.legend && (
                    <span className="rounded-sm bg-purple-400/95 px-1 py-[1px] font-display text-[9px] font-black tracking-wider text-black shadow">🔎 RESERVA</span>
                  )}
                </div>
              </div>

              {/* Miolo: NOME grande + crest ghost */}
              <div className="relative z-0 mt-1 flex flex-1 flex-col items-center justify-center px-1 text-center">
                <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.09]">
                  <TeamBadge short={badgeShort} color={badgeColor} size={80} />
                </div>
                <div
                  className="relative z-10 font-condensed text-[22px] font-black uppercase leading-[0.95] tracking-tight"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #fffbe6 0%, #ffe98a 42%, #f6c343 62%, #b8862a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))",
                  }}
                >
                  {p.name}
                </div>
                {p.club && (
                  <div className="relative z-10 mt-1 truncate max-w-full text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                    {p.club}
                  </div>
                )}
              </div>

              <div aria-hidden className="relative z-10 my-1.5 h-px w-full bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />

              <div className="relative z-10 flex flex-wrap items-center justify-center gap-1">
                {roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-md px-2 py-1 font-display text-[13px] font-black uppercase tracking-wider text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.4)] ring-1 ring-white/15"
                    style={{ background: posGradFor(roleToBroad(r)) }}
                  >
                    {r}
                  </span>
                ))}
              </div>

              {isSel && (
                <div className="relative z-10 mt-1.5 flex justify-center">
                  <span className="rounded-md bg-orange-400 px-2 py-0.5 font-display text-[11px] font-black uppercase tracking-wider text-black animate-pulse shadow">Escolher titular ↓</span>
                </div>
              )}

              <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          );
        })}
      </div>
      {available.length === 0 && (
        <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 p-4 text-center text-sm text-orange-200">
          Nenhum reforço disponível desse clube. Toque em <b>Trocar pool</b> ou <b>Pular</b>.
        </div>
      )}
    </div>
  );
}


/* ─────────────  Squad review  ───────────── */





function SquadPhase({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const formation = state.formation ?? DEFAULT_FORMATION;
  const slots = slotsForFormation(formation);
  const migrated = useMemo(() => assignPicksToSlots(state.picks, formation), [state.picks, formation]);
  const currentPicks = migrated.picks;
  const squad = currentPicks.map((p) => p.player);
  const ovr = teamOverall(squad);
  const [swapFor, setSwapFor] = useState<{ pickIdx: number } | null>(null);

  const start = () => {
    const leagueTeamIds = pickLeagueTeams();
    const { fixtures, schedule } = buildSchedule(leagueTeamIds);
    const table = buildInitialTable(state.teamName, leagueTeamIds);
    setState({ ...state, picks: currentPicks, phase: "season", fixtures, schedule, table, round: 0, leagueTeamIds });
  };
  const isClassico = state.mode === "classico";

  const movePickToSlot = (pickIdx: number, targetSlotId: string) => {
    const target = slots.find((s) => s.id === targetSlotId);
    if (!target) return;
    const pick = currentPicks[pickIdx];
    if (!fitsSlot(pick.player, target)) return;
    const occupantIdx = currentPicks.findIndex((p, i) => i !== pickIdx && p.slot === targetSlotId);
    const sourceSlot = slots.find((s) => s.id === pick.slot);
    let newPicks = [...currentPicks];
    if (occupantIdx >= 0) {
      if (!sourceSlot || !fitsSlot(newPicks[occupantIdx].player, sourceSlot)) return;
      newPicks[occupantIdx] = { ...newPicks[occupantIdx], slot: pick.slot };
    }
    newPicks[pickIdx] = { ...pick, slot: targetSlotId };
    setState({ ...state, picks: newPicks });
    setSwapFor(null);
  };

  const assignments = buildPitchAssignments(currentPicks);
  const highlight = swapFor ? compatSwapSlotIds(currentPicks, swapFor.pickIdx, slots) : [];

  return (
    <div className="animate-slide-up">
      {isClassico && (
        <div className="mb-3 rounded-xl border border-yellow-500/40 bg-gradient-to-r from-yellow-500/15 to-transparent p-3 text-center">
          <div className="font-display text-lg gold-text">🔓 REVELAÇÃO!</div>
          <div className="text-xs text-muted-foreground">Modo Clássico — agora você vê a força real do seu elenco.</div>
        </div>
      )}
      <div className="mb-4 rounded-2xl pitch-bg p-5 card-glow">
        <div className="mb-1 text-center text-xs uppercase tracking-widest text-white/70">Seu elenco</div>
        <div className="text-center font-display text-4xl text-white">{state.teamName}</div>
        <div className="mt-2 text-center"><OvrChip ovr={ovr} /><span className="ml-2 text-sm text-white/70">Overall do time</span></div>
        <div className="mt-2"><RatingChips players={squad} tactics={playerTactics(state)} /></div>
        <div className="mt-2 text-center text-xs text-white/80">
          Tática: <b>{getFormation(formation).label}</b> · {(TACTICS.find((t) => t.id === (state.tactic ?? DEFAULT_TACTIC))?.icon)} {(TACTICS.find((t) => t.id === (state.tactic ?? DEFAULT_TACTIC))?.label)}
        </div>
      </div>

      {/* Campo tático */}
      <div className="mb-3">
        <Pitch
          formation={formation}
          assignments={assignments}
          highlightSlotIds={highlight}
          onSlotClick={(slot, occupied) => {
            if (swapFor) {
              if (highlight.includes(slot.id)) movePickToSlot(swapFor.pickIdx, slot.id);
              return;
            }
            if (occupied) {
              const idx = currentPicks.findIndex((p) => p.slot === slot.id);
              if (idx >= 0) setSwapFor({ pickIdx: idx });
            }
          }}
        />
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <div>Toque em um jogador pra remanejar. <span className="text-emerald-400">verde</span>=posição certa · <span className="text-orange-400">laranja</span>=fora</div>
          {swapFor && (
            <button onClick={() => setSwapFor(null)} className="sticker-close">Cancelar</button>
          )}
        </div>
        {swapFor && (
          <div className="mt-2 rounded-xl border border-blue-500/40 bg-blue-500/10 p-2 text-xs">
            Movendo <b>{currentPicks[swapFor.pickIdx].player.name}</b> — toque em outro slot compatível.
          </div>
        )}
      </div>

      <div className="space-y-2">
        {currentPicks.map((pk, i) => {
          const t = TEAMS.find((tt) => tt.name === pk.fromTeam);
          const isLegend = pk.player.legend;
          const badgeShort = t ? t.short : "★";
          const badgeColor = t ? t.color : "#c084fc";
          const slot = slots.find((s) => s.id === pk.slot);
          const perf = slot ? perfectFit(pk.player, slot) : false;
          return (
            <div key={pk.slot} className={`flex items-center justify-between rounded-xl p-3 card-glow ${isLegend ? "bg-gradient-to-r from-yellow-500/15 to-card border border-yellow-500/40" : "bg-card"}`}>
              <div className="flex items-center gap-3">
                <TeamBadge short={badgeShort} color={badgeColor} size={36} />
                <div>
                  <div className="flex items-center gap-1.5 font-semibold">{pk.player.name}{isLegend && <span className="text-xs">👑</span>}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <PositionBadge p={pk.player.position} />
                    <span>{slot ? ROLE_SHORT[slot.role] : "?"}</span>
                    <span className={perf ? "text-emerald-400" : "text-orange-400"}>{perf ? "✓" : "!"}</span>
                    <span>· {playerRolesLabel(pk.player)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <OvrChip ovr={pk.player.overall} />
                <button onClick={() => setSwapFor({ pickIdx: i })} className="sticker-close text-[10px]">trocar</button>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={start} className="mt-6 w-full rounded-xl px-4 py-4 font-display text-xl btn-primary">Começar o Brasileirão →</button>
    </div>
  );
}

/* ─────────────  Season (Brasileirão pontos corridos)  ───────────── */

/** Buff de OVR em TODOS os adversários do Brasileirão (só na versão adv —
 *  não afeta o draft do jogador). Base +2 sempre, escalonando com o
 *  padrão Sula/Liberta (+3) e Mundial (+4). Se o jogador já ganhou o
 *  Mundial em alguma temporada anterior, o buff sobe pra +3 (não
 *  cumulativo entre temporadas). */
function brasileiraoOpponentBuff(state: SavedState): number {
  const wonMundialBefore = (state.seasonHistory ?? []).some((s) => s.trophies?.mundial);
  return wonMundialBefore ? 4 : 3;
}

function SeasonPhase({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const [tab, setTab] = useState<"next" | "table">("next");
  const [showOpp, setShowOpp] = useState(false);
  const [showSelf, setShowSelf] = useState(false);

  const totalRounds = state.fixtures.length;
  const done = state.round >= totalRounds;
  const nextFix = !done ? state.fixtures[state.round] : null;
  const rawOpponentBase = nextFix ? findTeam(nextFix.opponentId) : null;
  // Reservas são exclusivas do draft do jogador — nunca aparecem no XI/modal do adversário.
  const rawOpponent = rawOpponentBase
    ? { ...rawOpponentBase, players: (rawOpponentBase.players ?? []).filter((p) => p.reserve === undefined) }
    : null;
  const brBuff = brasileiraoOpponentBuff(state);
  const opponent = rawOpponent
    ? {
        ...rawOpponent,
        players: withOpponentVariance(
          state,
          rawOpponent.name,
          brBuff > 0
            ? rawOpponent.players.map((p) => ({ ...p, overall: Math.min(99, p.overall + brBuff) }))
            : rawOpponent.players,
        ),
      }
    : null;
  const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const myOvr = teamOverall(squad);

  // batchSize: 0 = jogar 1 por vez, 5 ou 10 = jogar em lote automático.
  const rawBatch = state.autoPlay;
  const batchSize: 0 | 5 | 10 = rawBatch === true ? 5 : rawBatch === 5 || rawBatch === 10 ? rawBatch : 0;
  const autoRemaining = state.autoRemaining ?? 0;

  const playNext = (startBatch: 0 | 5 | 10 = 0) => {
    if (!nextFix || !opponent) return;
    const home = nextFix.home;
    const homeName = home ? state.teamName : opponent.name;
    const awayName = home ? opponent.name : state.teamName;
    const homeShort = home ? "VOC" : opponent.short;
    const awayShort = home ? opponent.short : "VOC";
    const homeColor = home ? "#facc15" : opponent.color;
    const awayColor = home ? opponent.color : "#facc15";
    const homeOvr = home ? myOvr : teamOverall(opponent.players);
    const awayOvr = home ? teamOverall(opponent.players) : myOvr;
    const homeSquad = home ? squad : opponent.players;
    const awaySquad = home ? opponent.players : squad;
    const pt = playerTactics(state);
    const homeTac = home ? pt : undefined;
    const awayTac = home ? undefined : pt;
    const ctx = buildPlayerCtx(state, { round1based: state.round + 1, teamOvr: myOvr, oppOvr: teamOverall(opponent.players) });
    const result = simulateMatch(homeName, homeShort, homeColor, homeOvr, awayName, awayShort, awayColor, awayOvr, true, homeSquad, awaySquad, homeTac, awayTac, false, ctx);
    result.label = `Brasileirão · Rodada ${state.round + 1}`;
    result.season = state.season ?? 1;

    const prevSorted = sortTable(state.table);
    const prevPos = prevSorted.findIndex((r) => r.teamId === "PLAYER") + 1 || null;
    let table = updateTable(state.table, home ? "PLAYER" : opponent.id, home ? opponent.id : "PLAYER", result.homeGoals, result.awayGoals);
    table = simulateOtherMatches(table, state.schedule?.[state.round] ?? opponent.id, brBuff, { teamName: state.teamName, season: state.season });
    const newAuto = startBatch > 0 ? Math.min(startBatch, totalRounds - state.round) : autoRemaining;
    const playerGoals = home ? result.homeGoals : result.awayGoals;
    const oppGoals = home ? result.awayGoals : result.homeGoals;
    const trackers = applyPostMatchTrackers(state, playerGoals, oppGoals);
    setState({ ...state, ...trackers, table, lastMatch: result, matchHistory: [...state.matchHistory, result].slice(-300), round: state.round + 1, phase: "matchResult", autoRemaining: newAuto, prevBrasileiraoPos: prevPos, preMatchBrasileiraoTable: state.table, preMatchRankingScore: currentRankingScore(state) });
  };

  // Auto-continua a próxima partida quando estamos em um lote automático
  useEffect(() => {
    if (!done && autoRemaining > 0 && nextFix && opponent) {
      playNext(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRemaining, done, state.round]);

  if (done) { setTimeout(() => setState({ ...state, phase: "seasonEnd" }), 0); return null; }

  const sorted = sortTable(state.table);
  const myPos = sorted.findIndex((r) => r.teamId === "PLAYER") + 1;
  const pt = playerTactics(state);
  const previewInfo = nextFix && opponent
    ? computeMatchTacticsInfo({
      homeSquad: nextFix.home ? squad : opponent.players,
      awaySquad: nextFix.home ? opponent.players : squad,
      homeTactics: nextFix.home ? pt : undefined,
      awayTactics: nextFix.home ? undefined : pt,
      homeShort: nextFix.home ? "VOC" : opponent.short,
      awayShort: nextFix.home ? opponent.short : "VOC",
      isPlayer: true,
      ctx: buildPlayerCtx(state, { round1based: state.round + 1, teamOvr: myOvr, oppOvr: teamOverall(opponent.players) }),
    })
    : null;
  const myPreviewInfo = nextFix?.home ? previewInfo?.homeTacticsInfo : previewInfo?.awayTacticsInfo;
  const oppPreviewInfo = nextFix?.home ? previewInfo?.awayTacticsInfo : previewInfo?.homeTacticsInfo;

  return (
    <div className="animate-slide-up">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="sticker-card px-3 py-2">
          <div className="ribbon-tag text-[10px]">Brasileirão · Rodada</div>
          <div className="mt-1 font-display text-3xl leading-none">{state.round + 1}<span className="text-muted-foreground">/{totalRounds}</span></div>
        </div>
        <div className="sticker-card px-3 py-2 text-right">
          <div className="ribbon-tag text-[10px]">Sua posição</div>
          <div className="mt-1 font-display text-2xl leading-none gold-text">{myPos}º</div>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setTab("next")} className={`sticker-tab ${tab === "next" ? "sticker-tab-active" : ""}`}>Próximo jogo</button>
        <button onClick={() => setTab("table")} className={`sticker-tab ${tab === "table" ? "sticker-tab-active" : ""}`}>Tabela</button>
      </div>
      {tab === "next" && opponent && (
        <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
          <div className="text-xs uppercase tracking-widest text-white/70">{nextFix!.home ? "Em casa" : "Fora"}</div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button onClick={() => setShowSelf(true)} className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-white/10"><TeamBadge short="VOC" color="#facc15" name={state.teamName} size={64} /><div className="text-sm font-semibold text-white underline decoration-dotted underline-offset-4">{state.teamName}</div><OvrChip ovr={myPreviewInfo?.ovr ?? myOvr} /><RatingChips players={squad} compact tactics={pt} override={myPreviewInfo} /><div className="text-[10px] text-white/70">👁 ver elenco</div></button>

            <div className="font-display text-4xl text-white/60">×</div>
            <button onClick={() => setShowOpp(true)} className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-white/10">
              <TeamBadge short={opponent.short} color={opponent.color} name={opponent.name} size={64} />
              <div className="text-sm font-semibold text-white underline decoration-dotted underline-offset-4">{opponent.name}</div>
              <OvrChip ovr={oppPreviewInfo?.ovr ?? teamOverall(opponent.players)} />
              <RatingChips players={opponent.players} compact override={oppPreviewInfo} />
              <div className="text-[10px] text-white/70">👁 ver elenco</div>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/70">
            <span>Modo:</span>
            {([0, 5, 10] as const).map((n) => (
              <button
                key={n}
                onClick={() => setState({ ...state, autoPlay: n })}
                className={`rounded-md px-2 py-1 font-semibold transition ${batchSize === n ? "bg-yellow-400 text-black" : "bg-black/40 text-white/80 hover:bg-black/60"}`}
              >
                {n === 0 ? "1 jogo" : `${n} seguidas ⚡`}
              </button>
            ))}
          </div>
          <button
            onClick={() => playNext(batchSize)}
            className="mt-3 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary"
          >
            {batchSize === 0 ? "Jogar ⚽" : `Jogar ${batchSize} seguidas ⚡`}
          </button>
        </div>
      )}
      {tab === "table" && <LeagueTable table={sorted} playerSquad={squad} playerTactics={playerTactics(state)} opponentBuff={brBuff} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />}
      {showOpp && opponent && (
        <OpponentSquadModal name={opponent.name} short={opponent.short} color={opponent.color} overall={oppPreviewInfo?.ovr ?? teamOverall(opponent.players)} players={opponent.players} ratingsOverride={oppPreviewInfo} onClose={() => setShowOpp(false)} label="Elenco adversário" />
      )}
      {showSelf && (
        <OpponentSquadModal name={state.teamName} short="VOC" color="#facc15" overall={myPreviewInfo?.ovr ?? myOvr} players={squad} tactics={pt} ratingsOverride={myPreviewInfo} onClose={() => setShowSelf(false)} label="Seu elenco" />
      )}

    </div>
  );
}

function TacticsReport({ m, homeSquad, awaySquad, playerTactics: pTac }: { m: MatchResult; homeSquad?: Player[]; awaySquad?: Player[]; playerTactics?: TeamTactics }) {
  const fmt = (n: number) => (n >= 0 ? `+${n.toFixed(1)}` : n.toFixed(1));
  const styleLabel = (id: string) => {
    const t = TACTICS.find((x) => x.id === id);
    return t ? `${t.icon} ${t.label}` : id;
  };
  const buildInfo = (side: "home" | "away"): NonNullable<MatchResult["homeTacticsInfo"]> | null => {
    const stored = side === "home" ? m.homeTacticsInfo : m.awayTacticsInfo;
    if (stored) return stored;
    const squad = side === "home" ? homeSquad : awaySquad;
    if (!squad || squad.length === 0) return null;
    const short = side === "home" ? m.homeShort : m.awayShort;
    const t = short === "VOC" && pTac ? pTac : deriveTacticsForSquad(squad);
    const r = teamRatings(squad, t);
    const adj = tacticAdjustments(squad, t.formation, t.style);
    return { formation: t.formation, style: t.style, atkAdj: adj.atkAdj, defAdj: adj.defAdj, atk: r.atk, def: r.def, ovr: r.ovr };
  };
  const hInfo = buildInfo("home");
  const aInfo = buildInfo("away");
  if (!hInfo || !aInfo) return null;
  const Col = ({ title, short, color, info }: { title: string; short: string; color: string; info: NonNullable<MatchResult["homeTacticsInfo"]> }) => (
    <div className="flex-1 rounded-lg bg-black/30 p-2 text-left">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm" style={{ background: color }} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{short}</span>
        <span className="truncate text-[10px] text-white/50">{title}</span>
      </div>
      <div className="text-[11px] text-white/90">
        <div>{getFormation(info.formation).label} · {styleLabel(info.style)}</div>
        <div className="mt-1 text-white/70">
          ATA <b className="text-white">{info.atk.toFixed(1)}</b> <span className={info.atkAdj >= 0 ? "text-emerald-400" : "text-red-400"}>({fmt(info.atkAdj)})</span>
          {" · "}
          DEF <b className="text-white">{info.def.toFixed(1)}</b> <span className={info.defAdj >= 0 ? "text-emerald-400" : "text-red-400"}>({fmt(info.defAdj)})</span>
        </div>
        <div className="mt-0.5 text-[10px] text-white/50">OVR {info.ovr.toFixed(1)}</div>
      </div>
    </div>
  );
  return (
    <div className="mt-3 rounded-xl border border-yellow-500/40 bg-black/40 p-3">
      <div className="mb-2 text-[10px] uppercase tracking-widest text-yellow-300/80">Táticas · bônus aplicados</div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Col title={m.home} short={m.homeShort} color={m.homeColor} info={hInfo} />
        <Col title={m.away} short={m.awayShort} color={m.awayColor} info={aInfo} />
      </div>
    </div>
  );
}


function LeagueTable({ table, playerSquad, playerTactics: pTactics, opponentBuff = 0, seed, seasonBuff = 0 }: { table: TableRow[]; playerSquad?: Player[]; playerTactics?: TeamTactics; opponentBuff?: number; seed?: string; seasonBuff?: number }) {

  const [openId, setOpenId] = useState<string | null>(null);
  const openTeam = openId ? TEAMS.find((t) => t.id === openId) : null;
  const openRow = openId ? table.find((r) => r.teamId === openId) : null;
  const rawOpenPlayers = openId === "PLAYER" ? (playerSquad ?? []) : (openTeam?.players ?? []).filter((p) => p.reserve === undefined);
  const buffedOpen = openId !== "PLAYER" && opponentBuff > 0
    ? rawOpenPlayers.map((p) => ({ ...p, overall: Math.min(99, p.overall + opponentBuff) }))
    : rawOpenPlayers;
  const openPlayers = openId !== "PLAYER" && seed && openTeam
    ? applyOvrDelta(buffedOpen, teamOvrDelta(seed, openTeam.name) + seasonBuff)
    : buffedOpen;
  const openName = openId === "PLAYER" ? openRow?.name ?? "Seu time" : openTeam?.name ?? "";
  const openShort = openId === "PLAYER" ? "VOC" : openTeam?.short ?? "";
  const openColor = openId === "PLAYER" ? "#facc15" : openTeam?.color ?? "#333";
  const openTactics = openId === "PLAYER" ? pTactics : undefined;
  return (
    <div className="sticker-card overflow-hidden p-0">
      <div className="grid grid-cols-[20px_1fr_20px_20px_20px_26px_32px] gap-1.5 border-b-2 border-border/80 bg-secondary/60 px-2 py-2 text-[10px] font-display uppercase tracking-wider text-foreground/80">
        <div>#</div><div>Time</div><div className="text-right">V</div><div className="text-right">E</div><div className="text-right">D</div><div className="text-right">SG</div><div className="text-right">Pts</div>
      </div>
      {table.map((r, i) => {
        const zone = i < 6 ? "border-l-4 border-l-emerald-500" : i < 12 ? "border-l-4 border-l-blue-500" : i >= table.length - 4 ? "border-l-4 border-l-red-600" : "border-l-4 border-l-transparent";
        const teamData = TEAMS.find((t) => t.id === r.teamId);
        const clickable = r.teamId !== "PLAYER" || (playerSquad && playerSquad.length > 0);
        const sg = r.gf - r.ga;
        return (
          <button
            key={r.teamId}
            type="button"
            disabled={!clickable}
            onClick={() => clickable && setOpenId(r.teamId)}
            className={`grid w-full grid-cols-[20px_1fr_20px_20px_20px_26px_32px] items-center gap-1.5 px-2 py-2 text-left text-sm transition-colors ${zone} ${r.isPlayer ? "bg-primary/15 font-semibold" : ""} ${clickable ? "hover:bg-secondary/60 active:bg-secondary" : ""}`}
          >
            <div className="text-muted-foreground">{i + 1}</div>

            <div className="flex items-center gap-2 truncate">
              <TeamBadge short={r.isPlayer ? "VOC" : r.short} color={r.color} color2={teamData?.color2} name={r.name} size={22} />
              <span className="truncate">{r.name}</span>
            </div>
            <div className="text-right text-xs text-emerald-300">{r.wins}</div>
            <div className="text-right text-xs text-muted-foreground">{r.draws}</div>
            <div className="text-right text-xs text-red-300">{r.losses}</div>
            <div className={`text-right text-xs ${sg > 0 ? "text-emerald-300" : sg < 0 ? "text-red-300" : "text-muted-foreground"}`}>{sg > 0 ? `+${sg}` : sg}</div>
            <div className="text-right font-display text-base">{r.points}</div>
          </button>
        );
      })}
      <div className="border-t border-border p-2 text-[9px] text-muted-foreground">
        <span className="text-emerald-400">■</span> Libertadores · <span className="text-blue-400">■</span> Sul-Americana · <span className="text-red-500">■</span> Rebaixamento
      </div>
      {openId && (
        <OpponentSquadModal
          name={openName}
          short={openShort}
          color={openColor}
          overall={teamOverall(openPlayers)}
          players={openPlayers}
          tactics={openTactics}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}

/* ─────────────  Match Result  ───────────── */

function LiveTableFAB({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-1/2 top-8 z-40 -translate-x-1/2 rounded-full bg-primary px-3 py-1.5 font-display text-xs text-primary-foreground shadow-lg hover:brightness-110"
        title="Ver tabela sem parar a partida"
      >
        📊 Tabela
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/80 sm:items-center sm:p-3" onClick={() => setOpen(false)}>
          <div className="w-full max-w-2xl bg-card p-4 card-glow min-h-[100dvh] overflow-y-auto sm:min-h-0 sm:rounded-2xl sm:max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display text-lg">{title}</div>
              <button onClick={() => setOpen(false)} className="sticker-close">Fechar</button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

function MatchResultView({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const m = state.lastMatch;
  const [playing, setPlaying] = useState(true);
  const autoRemaining = state.autoRemaining ?? 0;
  const isAuto = autoRemaining > 0;

  const goNext = () => {
    const nextAuto = Math.max(0, autoRemaining - 1);
    // Modo Hard 🔥: gatilho dos drafts do meio (após 10 e 20 jogos do Brasileirão na 1ª temporada).
    if (state.mode === "hard" && (state.season ?? 1) === 1) {
      const stage = state.hardStage ?? 0;
      const done10 = stage === 0 && state.round >= 10;
      const done20 = stage === 1 && state.round >= 20;
      if (done10 || done20) {
        setState({
          ...state,
          phase: "hardMidDraft",
          autoRemaining: 0,
          hardMidDraftRemaining: 3,
          hardMidDraftCap: null,
          hardMidDraftRerolls: done10 ? 2 : 1,
          hardMidDraftSeed: (((state.draftSeed ?? 1) ^ (done10 ? 0xA10FF : 0xB20FF)) >>> 0),
          hardMidDraftRerolledThisRound: false,
        });
        return;
      }
    }
    setState({ ...state, phase: "season", autoRemaining: nextAuto });
  };

  const revealScoreAfterMatch = () => {
    setPlaying(false);
    if (typeof state.preMatchRankingScore === "number") {
      setState({ ...state, preMatchRankingScore: null });
    }
  };

  // Auto-avanço após o fim da partida quando estamos em lote automático
  useEffect(() => {
    if (!playing && isAuto) {
      const t = setTimeout(goNext, 4000);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, isAuto]);

  if (!m) return null;
  const win = (m.homeShort === "VOC" && m.homeGoals > m.awayGoals) || (m.awayShort === "VOC" && m.awayGoals > m.homeGoals);
  const draw = m.homeGoals === m.awayGoals;
  const label = win ? "VITÓRIA!" : draw ? "EMPATE" : "DERROTA";
  const labelColor = win ? "text-emerald-400" : draw ? "text-yellow-400" : "text-red-400";
  const playerSquad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const playerOvr = teamOverall(playerSquad);
  const opp = resolveOppFromMatch(state, m);
  const playerIsHome = m.homeShort === "VOC";
  const homeSquad = playerIsHome ? playerSquad : opp.players;
  const awaySquad = playerIsHome ? opp.players : playerSquad;
  const homeOverall = playerIsHome ? playerOvr : opp.overall;
  const awayOverall = playerIsHome ? opp.overall : playerOvr;
  if (playing) {
    // Durante a partida, mostramos a posição ANTES do jogo (sem delta) pra não dar spoiler.
    const posBefore = state.prevBrasileiraoPos ?? null;
    return (
      <div className="animate-slide-up">
        {isAuto && <div className="mb-2 text-center text-xs text-yellow-400">🚀 Auto · {autoRemaining} {autoRemaining === 1 ? "partida restante" : "partidas restantes"}</div>}
        {posBefore && (
          <div className="mb-2 flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-1.5">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sua posição</div>
            <div className="font-display text-lg gold-text">{posBefore}º</div>
          </div>
        )}

        <LiveMatch match={m} onFinish={revealScoreAfterMatch} homeSquad={homeSquad} awaySquad={awaySquad} homeOverall={homeOverall} awayOverall={awayOverall} playerTactics={playerTactics(state)} />
        <LiveTableFAB title="Classificação · Brasileirão">
          <LeagueTable table={sortTable(state.preMatchBrasileiraoTable ?? state.table)} playerSquad={playerSquad} playerTactics={playerTactics(state)} opponentBuff={brasileiraoOpponentBuff(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />
        </LiveTableFAB>
      </div>
    );
  }
  const sortedNow = sortTable(state.table);
  const myPos = sortedNow.findIndex((r) => r.teamId === "PLAYER") + 1 || null;
  const prevPos = state.prevBrasileiraoPos ?? null;
  const delta = myPos && prevPos ? prevPos - myPos : 0; // >0 subiu, <0 caiu
  return (
    <div className="animate-slide-up">
      {myPos && (
        <div className="mb-3 flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sua posição no Brasileirão</div>
          <div className="flex items-baseline gap-2">
            <div className="font-display text-2xl gold-text">{myPos}º</div>
            {delta !== 0 && (
              <div className={`font-display text-sm ${delta > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {delta > 0 ? `▲ ${delta}` : `▼ ${-delta}`}
              </div>
            )}
            {prevPos && delta === 0 && <div className="text-xs text-muted-foreground">= manteve</div>}
          </div>
        </div>
      )}
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        <div className={`font-display text-4xl ${labelColor} animate-goal`}>{label}</div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <ClickableCrest short={m.homeShort} color={m.homeColor} name={m.home} size={56} players={homeSquad ?? []} overall={homeOverall} tactics={m.homeShort === "VOC" ? playerTactics(state) : (m.homeTacticsInfo ? { formation: m.homeTacticsInfo.formation, style: m.homeTacticsInfo.style } : undefined)} ratingsOverride={m.homeTacticsInfo ? { atk: m.homeTacticsInfo.atk, def: m.homeTacticsInfo.def, ovr: m.homeTacticsInfo.ovr } : undefined} label="Elenco (mandante)" />
          <div className="font-display text-6xl text-white">{m.homeGoals} <span className="text-white/50">×</span> {m.awayGoals}</div>
          <ClickableCrest short={m.awayShort} color={m.awayColor} name={m.away} size={56} players={awaySquad ?? []} overall={awayOverall} tactics={m.awayShort === "VOC" ? playerTactics(state) : (m.awayTacticsInfo ? { formation: m.awayTacticsInfo.formation, style: m.awayTacticsInfo.style } : undefined)} ratingsOverride={m.awayTacticsInfo ? { atk: m.awayTacticsInfo.atk, def: m.awayTacticsInfo.def, ovr: m.awayTacticsInfo.ovr } : undefined} label="Elenco (visitante)" />
        </div>
        {m.scorers && m.scorers.length > 0 && (
          <div className="mt-4 rounded-lg bg-black/20 p-3 text-left text-sm text-white/90">
            <div className="mb-1 text-[10px] uppercase text-white/60">Gols</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1 pr-2 border-r border-white/10">
                {m.scorers.filter((s) => s.team === "home").map((s, i) => (
                  <div key={`h${i}`} className="flex items-center gap-2"><span>⚽</span><span className="truncate">{s.name}</span><span className="rounded bg-yellow-400/20 px-1 text-[10px] font-bold text-yellow-300">{s.position}</span></div>
                ))}
              </div>
              <div className="flex flex-col gap-1 pl-2">
                {m.scorers.filter((s) => s.team === "away").map((s, i) => (
                  <div key={`a${i}`} className="flex items-center gap-2 flex-row-reverse text-right"><span>⚽</span><span className="truncate">{s.name}</span><span className="rounded bg-yellow-400/20 px-1 text-[10px] font-bold text-yellow-300">{s.position}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <TacticsReport m={m} homeSquad={homeSquad} awaySquad={awaySquad} playerTactics={playerTactics(state)} />




      <div className="mt-4">
        <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Classificação atualizada</div>
        <LeagueTable table={sortTable(state.table)} playerSquad={playerSquad} playerTactics={playerTactics(state)} opponentBuff={brasileiraoOpponentBuff(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />
      </div>
      <button onClick={goNext} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        {isAuto ? `Continuar ⚡ (${autoRemaining - 1} restantes)` : "Próxima rodada →"}
      </button>
    </div>
  );
}

/* ─────────────  Competition visual helpers  ───────────── */

const COMP_THEME: Record<"brasileirao" | "libertadores" | "sulamericana" | "mundial", { className: string; icon: string; label: string; accent: string }> = {
  brasileirao:  { className: "theme-brasileirao",  icon: "🇧🇷", label: "Brasileirão Série A",         accent: "text-emerald-950" },
  libertadores: { className: "theme-libertadores", icon: "🏆", label: "Copa Libertadores",             accent: "text-white" },
  sulamericana: { className: "theme-sulamericana", icon: "🥈", label: "Copa Sul-Americana",            accent: "text-white" },
  mundial:      { className: "theme-mundial",      icon: "🌍", label: "Mundial de Clubes FIFA",        accent: "text-yellow-950" },
};

function CompHero({ kind, subtitle, right }: { kind: "brasileirao" | "libertadores" | "sulamericana" | "mundial"; subtitle?: string; right?: React.ReactNode }) {
  const t = COMP_THEME[kind];
  return (
    <div className={`comp-hero sticker-card ${t.className} px-4 py-4 mb-4 flex items-center gap-3`}>
      <div className="text-4xl animate-hero-float drop-shadow-[0_3px_0_rgba(0,0,0,0.55)]" aria-hidden>{t.icon}</div>
      <div className="min-w-0 flex-1">
        <div className="cartoon-title text-2xl leading-none">{t.label}</div>
        {subtitle && <div className="ribbon-tag mt-1.5 text-[10px]">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

function Confetti({ count = 24 }: { count?: number }) {
  const colors = ["#facc15", "#f97316", "#22c55e", "#38bdf8", "#f472b6", "#ffffff"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = ((i * 173) % 1800) / 1000;
        const dur = 1.8 + ((i * 53) % 12) / 10;
        const color = colors[i % colors.length];
        const size = 6 + (i % 4) * 2;
        return (
          <span
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${left}%`,
              top: `-10px`,
              width: size,
              height: size * 0.5,
              background: color,
              borderRadius: 2,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

type PodiumEntry = { name: string; short: string; color: string; sub?: string; isPlayer?: boolean };

function AnimatedPodium({ top3 }: { top3: [PodiumEntry, PodiumEntry, PodiumEntry] }) {
  const [first, second, third] = top3;
  const Col = ({ entry, place, heightPx, delay, medal }: { entry: PodiumEntry; place: 1 | 2 | 3; heightPx: number; delay: number; medal: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="animate-pop-in" style={{ animationDelay: `${delay + 0.3}s`, opacity: 0, animationFillMode: "both" }}>
        <TeamBadge short={entry.isPlayer ? "VOC" : entry.short} color={entry.color} name={entry.name} size={place === 1 ? 56 : 44} />
      </div>
      <div className={`w-full text-center text-[11px] font-semibold ${entry.isPlayer ? "text-yellow-300" : "text-white"} truncate max-w-[92px]`}>
        {entry.name}
      </div>
      {entry.sub && <div className="text-[10px] text-white/70">{entry.sub}</div>}
      <div
        className={`animate-podium-rise w-full rounded-t-lg flex items-start justify-center pt-2 font-display text-2xl ${place === 1 ? "podium-1 text-yellow-950" : place === 2 ? "podium-2 text-slate-800" : "podium-3 text-orange-950"}`}
        style={{ height: heightPx, animationDelay: `${delay}s`, maxWidth: 92 }}
      >
        <span>{medal}</span>
      </div>
    </div>
  );
  return (
    <div className="relative mt-4 rounded-2xl bg-black/40 p-4 pt-6 border border-yellow-500/30">
      <Confetti count={22} />
      <div className="flex items-end justify-center gap-3">
        <Col entry={second} place={2} heightPx={72} delay={0.1} medal="🥈" />
        <Col entry={first}  place={1} heightPx={104} delay={0} medal="🥇" />
        <Col entry={third}  place={3} heightPx={56} delay={0.2} medal="🥉" />
      </div>
    </div>
  );
}

/* ─────────────  Season End → decide fila de torneios continentais  ───────────── */



function SeasonEnd({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const sorted = sortTable(state.table);
  const pos = sorted.findIndex((r) => r.teamId === "PLAYER") + 1;
  const champion = pos === 1;

  const goNext = () => {
    const trophies = { ...state.trophies, brasileirao: champion };
    if (pos > 12) { setState({ ...state, phase: "eliminated", trophies }); return; }
    const kind: "libertadores" | "sulamericana" = pos <= 6 ? "libertadores" : "sulamericana";
    let bonusRemaining = pos <= 6 ? 2 : 1;
    // Modo Hard 🔥: +1 lenda em cada faixa (Liberta → 3, Sula → 2).
    const isHard = state.mode === "hard";
    if (isHard) bonusRemaining += 1;
    // "Mentor de craques": consome +1 lenda extra se a temporada anterior teve 3+ títulos.
    const mentorPending = !!state.mentorLegendPending && getActiveCoachEffects().bonusLegendOn3Titles;
    if (mentorPending) bonusRemaining += 1;
    setState({ ...state, phase: "bonusDraft", trophies, comp: null, compQueue: [], bonusRemaining, bonusNext: kind, mentorLegendPending: mentorPending ? false : state.mentorLegendPending, hardStage: state.mode === "hard" ? 3 : state.hardStage });
  };

  const podiumEntries = sorted.slice(0, 3).map<PodiumEntry>((r) => ({
    name: r.name,
    short: r.short,
    color: r.color,
    isPlayer: r.teamId === "PLAYER",
    sub: `${r.points} pts · ${r.wins}V ${r.draws}E ${r.losses}D`,
  }));
  const hasPodium = podiumEntries.length === 3;

  return (
    <div className="animate-slide-up">
      <CompHero kind="brasileirao" subtitle="Fim da temporada" right={<div className="rounded-lg bg-black/40 px-3 py-1.5 text-right"><div className="text-[9px] uppercase text-white/70">Você</div><div className="font-display text-xl text-white">{pos}º</div></div>} />
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        {champion && (
          <div className="relative mx-auto mb-2 inline-block">
            <div className="text-6xl animate-trophy-drop" aria-hidden>🏆</div>
          </div>
        )}
        {champion && <div className="mt-1 font-display text-2xl text-yellow-300">CAMPEÃO BRASILEIRO!</div>}
        {!champion && <div className="text-xs uppercase tracking-widest text-white/70">Sua posição final</div>}
        <div className="mt-3 font-display text-6xl gold-text">{pos}º</div>
        <div className="text-sm text-white">{state.teamName}</div>
        <div className="mt-4 text-sm text-white/80">
          {pos <= 6 && `Libertadores! 🌎 + ${state.mode === "hard" ? 3 : 2} lendas para reforçar seu time`}
          {pos > 6 && pos <= 12 && `Sul-Americana 🥈 + ${state.mode === "hard" ? 2 : 1} ${state.mode === "hard" ? "lendas" : "lenda"} para reforçar seu time`}
          {pos > 12 && "Você não se classificou para torneios continentais. 😢"}
        </div>
      </div>
      {hasPodium && (
        <>
          <div className="mt-6 text-center text-[10px] uppercase tracking-widest text-yellow-300/80">Pódio da temporada</div>
          <AnimatedPodium top3={podiumEntries as [PodiumEntry, PodiumEntry, PodiumEntry]} />
        </>
      )}
      <div className="mt-4">
        <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Classificação completa</div>
        <LeagueTable table={sorted} playerSquad={squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION)} playerTactics={playerTactics(state)} opponentBuff={brasileiraoOpponentBuff(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />
      </div>
      <button onClick={goNext} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        {pos > 12 ? "Ver resultado →" : pos <= 6 ? "Escolher 2 lendas →" : "Escolher 1 lenda →"}
      </button>
    </div>
  );
}


/* ─────────────  Competition intro (grupo)  ───────────── */

function compTitle(kind: "libertadores" | "sulamericana" | "mundial") {
  return kind === "libertadores" ? "🏆 Copa Libertadores" : kind === "sulamericana" ? "🥈 Copa Sul-Americana" : "🌍 Mundial de Clubes FIFA";
}

function CompIntro({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const comp = state.comp!;
  const totalRounds = comp.group.fixtures.length;
  return (
    <div className="animate-slide-up">
      <CompHero kind={comp.kind} subtitle="Fase de grupos · Grupo A" right={<div className="text-3xl animate-hero-float" aria-hidden>🏆</div>} />
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        <div className="text-sm text-white/85">
          32 times · 8 grupos de 4 · {comp.format === "twoLeg" ? "ida e volta (6 jogos)" : "turno único (3 jogos)"} · classificam-se {comp.kind === "sulamericana" ? "os 1ºs direto às oitavas (2ºs vão para playoff)" : "os 2 primeiros de cada grupo"}.
        </div>
      </div>
      <GroupsView comp={comp} playerSquad={squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION)} playerTeamName={state.teamName} playerTactics={playerTactics(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />

      <div className="mt-3 text-center text-xs text-muted-foreground">Você disputará {totalRounds} rodadas na fase de grupos.</div>
      <button onClick={() => setState({ ...state, phase: "compGroupMatch", compGroupAuto: 0, compKOAuto: false })} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">Começar fase de grupos →</button>
    </div>
  );
}


function GroupTable({ teams, playerSquad, playerTeamName, compKind, playerTactics: pTactics, seed, seasonBuff = 0 }: { teams: GroupTeam[]; playerSquad?: Player[]; playerTeamName?: string; compKind?: "libertadores" | "sulamericana" | "mundial"; playerTactics?: TeamTactics; seed?: string; seasonBuff?: number }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openRow = openKey ? teams.find((t) => t.key === openKey) ?? null : null;
  const rawOpenPlayers: Player[] = openRow
    ? openRow.isPlayer
      ? (playerSquad ?? [])
      : (compKind ? allTeamsPool(compKind).find((it) => it.name === openRow.name)?.players ?? [] : [])
    : [];
  const openPlayers = openRow && !openRow.isPlayer && seed
    ? applyOvrDelta(rawOpenPlayers, teamOvrDelta(seed, openRow.name) + seasonBuff)
    : rawOpenPlayers;
  const openName = openRow?.isPlayer ? (playerTeamName ?? openRow?.name ?? "") : (openRow?.name ?? "");
  const openShort = openRow?.isPlayer ? "VOC" : (openRow?.short ?? "");
  const openColor = openRow?.color ?? "#333";
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-card card-glow">
      <div className="grid grid-cols-[20px_1fr_20px_20px_20px_26px_32px] gap-1.5 border-b border-border px-2 py-2 text-[10px] uppercase text-muted-foreground">
        <div>#</div><div>Time</div><div className="text-right">V</div><div className="text-right">E</div><div className="text-right">D</div><div className="text-right">SG</div><div className="text-right">Pts</div>
      </div>
      {teams.map((r, i) => {
        // Adversários sempre têm elenco (vem do pool); o próprio jogador é
        // clicável quando o squad foi passado. Assim dá pra ver escalação em
        // qualquer tela — intro, durante o jogo, resultado e fim de fase.
        const hasSquad = r.isPlayer
          ? !!(playerSquad && playerSquad.length > 0)
          : !!(compKind && (allTeamsPool(compKind).find((it) => it.name === r.name)?.players?.length ?? 0) > 0);
        const sg = r.gf - r.ga;
        return (
          <button
            key={r.key}
            type="button"
            disabled={!hasSquad}
            onClick={() => hasSquad && setOpenKey(r.key)}
            className={`grid w-full grid-cols-[20px_1fr_20px_20px_20px_26px_32px] items-center gap-1.5 px-2 py-2 text-left text-sm transition-colors ${i < 2 ? "border-l-4 border-l-emerald-500" : "border-l-4 border-l-transparent"} ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : ""} ${r.isPlayer ? "bg-primary/15 font-semibold" : ""} ${hasSquad ? "hover:bg-secondary/60 active:bg-secondary" : ""}`}
          >
            <div className="text-muted-foreground">{i === 0 ? "🥇" : i === 1 ? "🥈" : i + 1}</div>

            <div className="flex items-center gap-2 truncate">
              <TeamBadge short={r.isPlayer ? "VOC" : r.short} color={r.color} name={r.isPlayer ? (playerTeamName ?? r.name) : r.name} size={22} />
              <span className="truncate">{r.name}</span>
            </div>
            <div className="text-right text-xs text-emerald-300">{r.wins}</div>
            <div className="text-right text-xs text-muted-foreground">{r.draws}</div>
            <div className="text-right text-xs text-red-300">{r.losses}</div>
            <div className={`text-right text-xs ${sg > 0 ? "text-emerald-300" : sg < 0 ? "text-red-300" : "text-muted-foreground"}`}>{sg > 0 ? `+${sg}` : sg}</div>
            <div className="text-right font-display">{r.points}</div>
          </button>
        );
      })}
      <div className="border-t border-border p-2 text-[9px] text-muted-foreground"><span className="text-emerald-400">■</span> Classificação · toque num time pra ver o elenco</div>
      {openRow && (
        <OpponentSquadModal name={openName} short={openShort} color={openColor} overall={openRow.isPlayer ? teamOverall(openPlayers) : openRow.overall} players={openPlayers} tactics={openRow.isPlayer ? pTactics : undefined} onClose={() => setOpenKey(null)} label={openRow.isPlayer ? "Seu elenco" : "Elenco"} />
      )}
    </div>
  );
}

/* ─── Todos os grupos (com abas A..H) ─── */
const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
function GroupsView({ comp, playerSquad, playerTeamName, playerTactics: pTactics, seed, seasonBuff = 0 }: { comp: CompState; playerSquad: Player[]; playerTeamName: string; playerTactics?: TeamTactics; seed?: string; seasonBuff?: number }) {
  const [gIdx, setGIdx] = useState(0);
  const allGroups: GroupTeam[][] = [comp.group.teams, ...comp.otherGroups];
  const current = allGroups[gIdx] ?? allGroups[0];
  return (
    <div className="mt-4">
      <div className="mb-2 flex gap-1 overflow-x-auto pb-1">
        {allGroups.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setGIdx(i)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${gIdx === i ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/80 hover:bg-secondary/80"}`}
          >
            Grupo {GROUP_LETTERS[i]}{i === 0 ? " ★" : ""}
          </button>
        ))}
      </div>
      <GroupTable teams={sortGroup(current)} playerSquad={playerSquad} playerTeamName={playerTeamName} compKind={comp.kind} playerTactics={pTactics} seed={seed} seasonBuff={seasonBuff} />
    </div>
  );
}


/* ─────────────  Competition group match  ───────────── */

function CompGroupMatchScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const comp = state.comp!;
  const [tab, setTab] = useState<"next" | "table">("next");
  const [showOpp, setShowOpp] = useState(false);
  const [showSelf, setShowSelf] = useState(false);

  const fx = comp.group.fixtures[comp.group.round];
  const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const myOvr = teamOverall(squad);

  if (!fx) { setTimeout(() => setState({ ...state, phase: "compGroupsEnd" }), 0); return null; }

  const playerIsHome = fx.home === "PLAYER";
  const oppKey = playerIsHome ? fx.away : fx.home;
  const opp = comp.group.teams.find((t) => t.key === oppKey)!;
  const oppFullTeam = allTeamsPool(comp.kind).find((it) => it.name === opp.name);
  const oppDelta = teamOvrDelta(varianceSeed(state), opp.name) + seasonGlobalBuff(state.season);
  const oppSquad = oppFullTeam?.players ? applyOvrDelta(oppFullTeam.players, oppDelta) : oppFullTeam?.players;
  const oppOverallAdj = Math.max(1, Math.min(99, opp.overall + oppDelta));

  const play = (autoRemainingOverride?: number) => {
    const homeName = playerIsHome ? state.teamName : opp.name;
    const awayName = playerIsHome ? opp.name : state.teamName;
    const homeShort = playerIsHome ? "VOC" : opp.short;
    const awayShort = playerIsHome ? opp.short : "VOC";
    const homeColor = playerIsHome ? "#facc15" : opp.color;
    const awayColor = playerIsHome ? opp.color : "#facc15";
    const homeOvr = playerIsHome ? myOvr : oppOverallAdj;
    const awayOvr = playerIsHome ? oppOverallAdj : myOvr;
    const homeSquad = playerIsHome ? squad : oppSquad;
    const awaySquad = playerIsHome ? oppSquad : squad;
    const pt = playerTactics(state);
    const homeTac = playerIsHome ? pt : undefined;
    const awayTac = playerIsHome ? undefined : pt;
    const neutral = comp.kind === "mundial";
    const ctx = buildPlayerCtx(state, { teamOvr: myOvr, oppOvr: oppOverallAdj });
    const result = simulateMatch(homeName, homeShort, homeColor, homeOvr, awayName, awayShort, awayColor, awayOvr, true, homeSquad, awaySquad, homeTac, awayTac, neutral, ctx);
    result.label = `${compTitle(comp.kind)} · Grupo R${comp.group.round + 1}`;
    result.season = state.season ?? 1;

    const playerGoals = playerIsHome ? result.homeGoals : result.awayGoals;
    const oppGoals = playerIsHome ? result.awayGoals : result.homeGoals;
    const varCtx = { teamName: state.teamName, season: state.season };
    let group = simulateGroupOthersRound(comp.group, comp.kind, varCtx);
    group = applyPlayerMatchToGroup(group, "PLAYER", oppKey, playerGoals, oppGoals);
    const { otherGroups: newOtherGroups, otherGroupsFixtures: newOgFx } = simulateAllOtherGroupsRound(comp, comp.group.round, varCtx);
    const nextAuto = autoRemainingOverride !== undefined ? autoRemainingOverride : (state.compGroupAuto ?? 0);
    const trackers = applyPostMatchTrackers(state, playerGoals, oppGoals);
    setState({ ...state, ...trackers, comp: { ...comp, group, otherGroups: newOtherGroups, otherGroupsFixtures: newOgFx }, lastMatch: result, matchHistory: [...state.matchHistory, result].slice(-300), phase: "compGroupResult", compGroupAuto: nextAuto, preMatchComp: comp, preMatchRankingScore: currentRankingScore(state) });
  };

  const compGroupAuto = state.compGroupAuto ?? 0;
  const remainingRounds = comp.group.fixtures.length - comp.group.round;
  const pt = playerTactics(state);
  const previewInfo = oppSquad
    ? computeMatchTacticsInfo({
      homeSquad: playerIsHome ? squad : oppSquad,
      awaySquad: playerIsHome ? oppSquad : squad,
      homeTactics: playerIsHome ? pt : undefined,
      awayTactics: playerIsHome ? undefined : pt,
      homeShort: playerIsHome ? "VOC" : opp.short,
      awayShort: playerIsHome ? opp.short : "VOC",
      isPlayer: true,
      neutral: comp.kind === "mundial",
      ctx: buildPlayerCtx(state, { teamOvr: myOvr, oppOvr: oppOverallAdj }),
    })
    : null;
  const myPreviewInfo = playerIsHome ? previewInfo?.homeTacticsInfo : previewInfo?.awayTacticsInfo;
  const oppPreviewInfo = playerIsHome ? previewInfo?.awayTacticsInfo : previewInfo?.homeTacticsInfo;

  useEffect(() => {
    if (compGroupAuto > 0 && fx) {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compGroupAuto, comp.group.round]);

  const startBatch = () => {
    play(remainingRounds);
  };


  return (
    <div className="animate-slide-up">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{compTitle(comp.kind)} · Grupo</div>
          <div className="font-display text-3xl">Rodada {comp.group.round + 1}<span className="text-muted-foreground">/{comp.group.fixtures.length}</span></div>
        </div>
        <div className="rounded-lg bg-secondary px-3 py-2 text-right">
          <div className="text-[10px] uppercase text-muted-foreground">Sua posição</div>
          <div className="font-display text-2xl gold-text">{playerPositionInGroup(comp.group)}º</div>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setTab("next")} className={`sticker-tab ${tab === "next" ? "sticker-tab-active" : ""}`}>Próximo jogo</button>
        <button onClick={() => setTab("table")} className={`sticker-tab ${tab === "table" ? "sticker-tab-active" : ""}`}>Tabela</button>
      </div>
      {tab === "next" && (
        <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
          <div className="text-xs uppercase tracking-widest text-white/70">{comp.kind === "mundial" ? "Campo neutro" : (playerIsHome ? "Em casa" : "Fora")}</div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button onClick={() => setShowSelf(true)} className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-white/10"><TeamBadge short="VOC" color="#facc15" name={state.teamName} size={64} /><div className="text-sm font-semibold text-white underline decoration-dotted underline-offset-4">{state.teamName}</div><OvrChip ovr={myPreviewInfo?.ovr ?? myOvr} /><RatingChips players={squad} compact tactics={pt} override={myPreviewInfo} /><div className="text-[10px] text-white/70">👁 ver elenco</div></button>
            <div className="font-display text-4xl text-white/60">×</div>
            <button onClick={() => oppSquad && setShowOpp(true)} className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-white/10">
              <TeamBadge short={opp.short} color={opp.color} name={opp.name} size={64} />
              <div className="text-sm font-semibold text-white underline decoration-dotted underline-offset-4">{opp.name}</div>
              <OvrChip ovr={oppPreviewInfo?.ovr ?? oppOverallAdj} />
              {oppSquad && <RatingChips players={oppSquad} compact override={oppPreviewInfo} />}
              {oppSquad && <div className="text-[10px] text-white/70">👁 ver elenco</div>}
            </button>
          </div>
          {compGroupAuto > 0 && <div className="mt-4 text-center text-xs text-yellow-400">🚀 Auto · {compGroupAuto} {compGroupAuto === 1 ? "rodada restante" : "rodadas restantes"}</div>}
          <div className="mt-6 grid gap-2">
            <button onClick={() => play()} className="w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">Jogar ⚽</button>
            {remainingRounds > 1 && (
              <button onClick={startBatch} className="w-full rounded-xl bg-yellow-400 px-4 py-2 font-display text-base text-black hover:bg-yellow-300">
                Jogar toda a fase ⚡ ({remainingRounds} jogos)
              </button>
            )}
          </div>
        </div>
      )}
      {tab === "table" && <GroupsView comp={comp} playerSquad={squad} playerTeamName={state.teamName} playerTactics={playerTactics(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />}
      {showOpp && oppSquad && (
        <OpponentSquadModal name={opp.name} short={opp.short} color={opp.color} overall={oppPreviewInfo?.ovr ?? oppOverallAdj} players={oppSquad} ratingsOverride={oppPreviewInfo} onClose={() => setShowOpp(false)} label="Elenco adversário" />
      )}
      {showSelf && (
        <OpponentSquadModal name={state.teamName} short="VOC" color="#facc15" overall={myPreviewInfo?.ovr ?? myOvr} players={squad} tactics={pt} ratingsOverride={myPreviewInfo} onClose={() => setShowSelf(false)} label="Seu elenco" />
      )}

    </div>
  );
}

function CompGroupResultScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const m = state.lastMatch!;
  const comp = state.comp!;
  const [playing, setPlaying] = useState(true);
  const win = (m.homeShort === "VOC" && m.homeGoals > m.awayGoals) || (m.awayShort === "VOC" && m.awayGoals > m.homeGoals);
  const draw = m.homeGoals === m.awayGoals;
  const label = win ? "VITÓRIA!" : draw ? "EMPATE" : "DERROTA";
  const labelColor = win ? "text-emerald-400" : draw ? "text-yellow-400" : "text-red-400";
  const done = comp.group.round >= comp.group.fixtures.length;
  const compGroupAuto = state.compGroupAuto ?? 0;
  const isAuto = compGroupAuto > 0;

  const goNext = () => {
    const nextAuto = Math.max(0, compGroupAuto - 1);
    setState({ ...state, phase: done ? "compGroupsEnd" : "compGroupMatch", compGroupAuto: done ? 0 : nextAuto });
  };

  const revealScoreAfterMatch = () => {
    setPlaying(false);
    if (typeof state.preMatchRankingScore === "number") {
      setState({ ...state, preMatchRankingScore: null });
    }
  };

  useEffect(() => {
    if (!playing && isAuto) {
      const t = setTimeout(goNext, 4000);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, isAuto]);

  const playerSquad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const playerOvr = teamOverall(playerSquad);
  const opp = resolveOppFromMatch(state, m);
  const playerIsHome = m.homeShort === "VOC";
  const homeSquad = playerIsHome ? playerSquad : opp.players;
  const awaySquad = playerIsHome ? opp.players : playerSquad;
  const homeOverall = playerIsHome ? playerOvr : opp.overall;
  const awayOverall = playerIsHome ? opp.overall : playerOvr;
  if (playing) {
    return (
      <div className="animate-slide-up">
        {isAuto && <div className="mb-2 text-center text-xs text-yellow-400">🚀 Auto · {compGroupAuto} {compGroupAuto === 1 ? "rodada restante" : "rodadas restantes"}</div>}
        <LiveMatch match={m} onFinish={revealScoreAfterMatch} homeSquad={homeSquad} awaySquad={awaySquad} homeOverall={homeOverall} awayOverall={awayOverall} playerTactics={playerTactics(state)} />
        <LiveTableFAB title={`Tabela · ${compTitle(comp.kind)}`}>
          <GroupsView comp={state.preMatchComp ?? comp} playerSquad={playerSquad} playerTeamName={state.teamName} playerTactics={playerTactics(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />
        </LiveTableFAB>
      </div>
    );
  }
  return (
    <div className="animate-slide-up">
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        <div className={`font-display text-4xl ${labelColor} animate-goal`}>{label}</div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <ClickableCrest short={m.homeShort} color={m.homeColor} name={m.home} size={56} players={homeSquad ?? []} overall={homeOverall} tactics={m.homeShort === "VOC" ? playerTactics(state) : (m.homeTacticsInfo ? { formation: m.homeTacticsInfo.formation, style: m.homeTacticsInfo.style } : undefined)} ratingsOverride={m.homeTacticsInfo ? { atk: m.homeTacticsInfo.atk, def: m.homeTacticsInfo.def, ovr: m.homeTacticsInfo.ovr } : undefined} label="Elenco (mandante)" />
          <div className="font-display text-6xl text-white">{m.homeGoals} <span className="text-white/50">×</span> {m.awayGoals}</div>
          <ClickableCrest short={m.awayShort} color={m.awayColor} name={m.away} size={56} players={awaySquad ?? []} overall={awayOverall} tactics={m.awayShort === "VOC" ? playerTactics(state) : (m.awayTacticsInfo ? { formation: m.awayTacticsInfo.formation, style: m.awayTacticsInfo.style } : undefined)} ratingsOverride={m.awayTacticsInfo ? { atk: m.awayTacticsInfo.atk, def: m.awayTacticsInfo.def, ovr: m.awayTacticsInfo.ovr } : undefined} label="Elenco (visitante)" />
        </div>
        {m.scorers && m.scorers.length > 0 && (
          <div className="mt-4 rounded-lg bg-black/20 p-3 text-left text-sm text-white/90">
            <div className="mb-1 text-[10px] uppercase text-white/60">Gols</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1 pr-2 border-r border-white/10">
                {m.scorers.filter((s) => s.team === "home").map((s, i) => (
                  <div key={`h${i}`} className="flex items-center gap-2"><span>⚽</span><span className="truncate">{s.name}</span><span className="rounded bg-yellow-400/20 px-1 text-[10px] font-bold text-yellow-300">{s.position}</span></div>
                ))}
              </div>
              <div className="flex flex-col gap-1 pl-2">
                {m.scorers.filter((s) => s.team === "away").map((s, i) => (
                  <div key={`a${i}`} className="flex items-center gap-2 flex-row-reverse text-right"><span>⚽</span><span className="truncate">{s.name}</span><span className="rounded bg-yellow-400/20 px-1 text-[10px] font-bold text-yellow-300">{s.position}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <TacticsReport m={m} homeSquad={homeSquad ?? undefined} awaySquad={awaySquad ?? undefined} playerTactics={playerTactics(state)} />

      <GroupsView comp={comp} playerSquad={squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION)} playerTeamName={state.teamName} playerTactics={playerTactics(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />


      <button onClick={goNext} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        {done ? "Ver classificação →" : isAuto ? `Continuar ⚡ (${Math.max(0, compGroupAuto - 1)} restantes)` : "Próxima rodada →"}
      </button>
    </div>
  );
}


function CompGroupsEndScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const comp = state.comp!;
  const advanced = playerAdvancedFromGroups(comp);
  const pos = playerPositionInGroup(comp.group);
  const isSula = comp.kind === "sulamericana";
  // Sul-Americana: 1º direto; 2º vai a playoff (aqui simplificado: 2º também avança para oitavas)
  const advanceMsg = advanced
    ? isSula
      ? pos === 1 ? "Você venceu o grupo! Classificado direto às oitavas." : "Você foi 2º no grupo. Passou pelo playoff e está nas oitavas!"
      : "Classificado às oitavas de final!"
    : "Eliminado na fase de grupos.";

  // Passou da fase de grupos? Ganha 1 craque bônus (Libertadores/Sul-Americana/Mundial).
  const earnsGroupBonus = advanced;

  const goKO = () => {
    if (!advanced) {
      const koExits = { ...(state.seasonKOExits ?? {}), [comp.kind]: "groups" as KOExit };
      setState({ ...state, phase: "compEnd", seasonKOExits: koExits, comp: { ...comp, phase: "done", eliminated: true } });

      return;
    }
    const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
    const myOvr = teamOverall(squad);
    const { bracket, firstRival } = buildBracket(comp, state.teamName, "VOC", "#facc15", myOvr, squad, { teamName: state.teamName, season: state.season });
    const rival = bracketRivalToIntlTeam(comp.kind, firstRival);
    const newComp: CompState = { ...comp, phase: "roundOf16", currentKO: { rival, round: 0, legs: [] }, bracket };
    const groupAdvanced = { ...(state.groupAdvanced ?? {}), [comp.kind]: true };
    if (earnsGroupBonus) {
      const mentorPending = !!state.mentorLegendPending && getActiveCoachEffects().bonusLegendOn3Titles;
      setState({
        ...state,
        comp: newComp,
        groupAdvanced,
        phase: "bonusDraft",
        bonusRemaining: 1 + (mentorPending ? 1 : 0),
        bonusNext: comp.kind,
        bonusReturnToKO: true,
        bonusIncludeIntl: true,
        mentorLegendPending: mentorPending ? false : state.mentorLegendPending,
      });
      return;
    }
    setState({ ...state, comp: newComp, groupAdvanced, phase: "compKOIntro" });
  };


  return (
    <div className="animate-slide-up">
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        <div className="font-display text-2xl gold-text">{compTitle(comp.kind)}</div>
        <div className="mt-1 text-xs uppercase text-white/70">Fim da fase de grupos</div>
        <div className="mt-3 font-display text-5xl gold-text">{pos}º</div>
        <div className="mt-2 text-sm text-white">{advanceMsg}</div>
        {earnsGroupBonus && (
          <div className="mt-3 rounded-lg bg-yellow-500/20 px-3 py-2 text-sm font-semibold text-yellow-200">
            ✨ Sem derrotas na fase de grupos! +1 lenda bônus
          </div>
        )}
      </div>
      <GroupsView comp={comp} playerSquad={squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION)} playerTeamName={state.teamName} playerTactics={playerTactics(state)} seed={varianceSeed(state)} seasonBuff={seasonGlobalBuff(state.season)} />
      <button onClick={goKO} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        {advanced ? (earnsGroupBonus ? "Escolher lenda + mata-mata →" : "Ir ao mata-mata →") : "Continuar →"}
      </button>
    </div>
  );
}

/* ─────────────  KO stages  ───────────── */

function allTeamsPool(kind: "libertadores" | "sulamericana" | "mundial"): IntlTeam[] {
  return kind === "libertadores" ? LIBERTADORES_TEAMS : kind === "sulamericana" ? SULAMERICANA_TEAMS : MUNDIAL_TEAMS;
}

function bracketRivalToIntlTeam(kind: "libertadores" | "sulamericana" | "mundial", t: BracketTeam): IntlTeam {
  const full = allTeamsPool(kind).find((x) => x.name === t.name);
  if (full) return full;
  return { name: t.name, short: t.short, color: t.color, overall: t.overall, players: [] };
}

function koPhaseLabel(round: number, thirdPlace?: boolean) {
  if (thirdPlace) return "Disputa de 3º lugar";
  return koLabels()[round] ?? "Mata-mata";
}

/* ── Chaveamento visual (bracket) ── */
function BracketMatchCard({ m, compact }: { m: BracketMatch; compact?: boolean }) {
  const size = compact ? 16 : 18;
  const teamRow = (t: BracketTeam | undefined, goals: number | undefined, isWinner: boolean) => (
    <div className={`flex items-center gap-1.5 ${isWinner ? "" : t ? "opacity-60" : "opacity-40"}`}>
      {t ? (
        <TeamBadge short={t.isPlayer ? "VOC" : t.short} color={t.color} name={t.name} size={size} />
      ) : (
        <div className="h-4 w-4 rounded-full bg-secondary" />
      )}
      <div className={`min-w-0 flex-1 truncate text-[11px] ${t?.isPlayer ? "font-bold text-yellow-300" : "text-foreground"}`}>
        {t?.short ?? "—"}
      </div>
      <div className={`font-display text-xs tabular-nums ${isWinner ? "text-emerald-300" : "text-muted-foreground"}`}>
        {goals ?? ""}
      </div>
    </div>
  );
  const homeWin = m.winner === "home";
  const awayWin = m.winner === "away";
  return (
    <div className={`w-[92px] rounded-md border p-1.5 text-xs ${m.isPlayerMatch ? "border-yellow-400/60 bg-yellow-500/5" : "border-border bg-card"}`}>
      {teamRow(m.home, m.homeGoals, homeWin)}
      <div className="my-0.5 h-px bg-border/60" />
      {teamRow(m.away, m.awayGoals, awayWin)}
      {m.penalty && m.winner && (
        <div className="mt-0.5 text-center text-[8px] uppercase text-amber-400">
          pen{m.homePen !== undefined && m.awayPen !== undefined ? ` ${m.homePen}×${m.awayPen}` : ""}
        </div>
      )}
    </div>
  );
}

function BracketView({ bracket, onClose }: { bracket: BracketState; onClose: () => void }) {
  const roundNames = ["Oitavas", "Quartas", "Semi", "Final"];
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-fade-in" onClick={onClose}>
      <div className="flex h-full w-full flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
          <div className="min-w-0 flex-1">
            <div className="font-display text-xl gold-text">🏆 Chaveamento</div>
            <div className="text-xs text-muted-foreground">Da oitavas à final — seu caminho está destacado</div>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="ml-1 sticker-icon-btn h-10 w-10">✕</button>
        </div>
        <div className="flex-1 overflow-auto p-3">
          <div className="flex min-w-max items-stretch gap-2">
            {bracket.rounds.map((round, rIdx) => (
              <div key={rIdx} className="flex flex-col">
                <div className="mb-2 px-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground">{roundNames[rIdx]}</div>
                <div
                  className="flex flex-1 flex-col justify-around"
                  style={{ gap: `${8 + rIdx * 26}px` }}
                >
                  {round.map((m, mIdx) => (
                    <BracketMatchCard key={mIdx} m={m} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BracketButton({ bracket }: { bracket: BracketState | undefined }) {
  const [open, setOpen] = useState(false);
  if (!bracket) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-xl border border-yellow-400/50 bg-yellow-500/10 px-4 py-2.5 text-sm font-semibold text-yellow-200 hover:bg-yellow-500/20"
      >
        🏆 Ver chaveamento completo
      </button>
      {open && <BracketView bracket={bracket} onClose={() => setOpen(false)} />}
    </>
  );
}



function CompKOIntroScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const comp = state.comp!;
  const koRaw = comp.currentKO!;
  const rivalDelta = teamOvrDelta(varianceSeed(state), koRaw.rival.name) + seasonGlobalBuff(state.season);
  const ko = {
    ...koRaw,
    rival: {
      ...koRaw.rival,
      overall: Math.max(1, Math.min(99, koRaw.rival.overall + rivalDelta)),
      players: koRaw.rival.players ? applyOvrDelta(koRaw.rival.players, rivalDelta) : koRaw.rival.players,
    },
  };
  const twoLeg = comp.koFormat === "twoLeg" && ko.round < 3 && !ko.thirdPlace; // final e 3º lugar são jogo único
  const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const [showOpp, setShowOpp] = useState(false);
  const [showSelf, setShowSelf] = useState(false);
  const [showBracket, setShowBracket] = useState(false);
  const myOvr = teamOverall(squad);
  const koAuto = state.compKOAuto ?? false;
  const pt = playerTactics(state);
  const isFinal = ko.round === 3 && !ko.thirdPlace;
  const neutral = !twoLeg;
  const previewInfo = ko.rival.players
    ? computeMatchTacticsInfo({
      homeSquad: squad,
      awaySquad: ko.rival.players,
      homeTactics: pt,
      homeShort: "VOC",
      awayShort: ko.rival.short,
      isPlayer: true,
      neutral,
      ctx: buildPlayerCtx(state, { isFinal, isKnockout: true, teamOvr: myOvr, oppOvr: ko.rival.overall }),
    })
    : null;
  const myPreviewInfo = previewInfo?.homeTacticsInfo;
  const oppPreviewInfo = previewInfo?.awayTacticsInfo;
  useEffect(() => {
    if (koAuto) {
      const t = setTimeout(() => playKO(state, setState), 600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [koAuto, ko.round, (ko.legs ?? []).length]);
  return (
    <div className="animate-slide-up">
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        <div className="font-display text-2xl gold-text">{compTitle(comp.kind)}</div>
        <button onClick={() => comp.bracket && setShowBracket(true)} className="mt-1 text-xs uppercase text-white/70 underline decoration-dotted underline-offset-4 hover:text-white">{koPhaseLabel(ko.round, ko.thirdPlace)} · 🏆 ver chave</button>
        <div className="mt-3 text-sm text-white/80">{twoLeg ? "Confronto de ida e volta (agregado)." : (comp.kind === "mundial" ? "Jogo único em campo neutro — se empatar, vai para os pênaltis." : "Jogo único — se empatar, vai para os pênaltis.")}</div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button onClick={() => setShowSelf(true)} className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-white/10">
            <TeamBadge short="VOC" color="#facc15" name={state.teamName} size={56} />
            <div className="text-xs text-white underline decoration-dotted underline-offset-4">{state.teamName}</div>
            <OvrChip ovr={myPreviewInfo?.ovr ?? myOvr} precise />
            <RatingChips players={squad} compact tactics={pt} override={myPreviewInfo} />
            <div className="text-[10px] text-white/70">👁 ver elenco</div>
          </button>
          <div className="font-display text-4xl text-white/60">×</div>
          <button onClick={() => setShowOpp(true)} className="flex flex-col items-center gap-2 rounded-lg p-1 transition hover:bg-white/10">
            <TeamBadge short={ko.rival.short} color={ko.rival.color} name={ko.rival.name} size={56} />
            <div className="text-xs text-white underline decoration-dotted underline-offset-4">{ko.rival.name}</div>
            <OvrChip ovr={oppPreviewInfo?.ovr ?? ko.rival.overall} precise />
            {ko.rival.players && <RatingChips players={ko.rival.players} compact override={oppPreviewInfo} />}
            <div className="text-[10px] text-white/70">👁 ver elenco</div>
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {koLabels().map((l, i) => (
          <button key={l} onClick={() => comp.bracket && setShowBracket(true)} className={`rounded-full px-3 py-1 text-xs transition hover:brightness-125 ${i < ko.round ? "bg-emerald-500/30 text-emerald-300" : i === ko.round ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      <BracketButton bracket={comp.bracket} />
      {(() => {
        const eff = getActiveCoachEffects();
        const finalBoost = isFinal ? eff.finalOvrBoost : 0;
        const cupStar = eff.cupStarBoost; // sempre em mata-mata continental
        if (finalBoost <= 0 && cupStar <= 0) return null;
        return (
          <div className="mt-3 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-3 py-2 text-center text-[11px] text-yellow-100">
            <span className="mr-1">🎯</span>
            <span className="font-semibold">Bônus do técnico ativos neste jogo:</span>
            {finalBoost > 0 && <span className="ml-1">+{finalBoost.toFixed(2)} OVR em cada jogador (final)</span>}
            {finalBoost > 0 && cupStar > 0 && <span>·</span>}
            {cupStar > 0 && <span className="ml-1">+{cupStar} OVR no craque (mata-mata)</span>}
          </div>
        );
      })()}
      {(state.compKOAuto ?? false) && <div className="mt-3 text-center text-xs text-yellow-400">🚀 Auto · simulando todo o mata-mata</div>}
      <div className="mt-6 grid gap-2">
        <button onClick={() => playKO(state, setState)} className="w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">Disputar partida ⚽</button>
        {!(state.compKOAuto ?? false) && (
          <button onClick={() => playKO({ ...state, compKOAuto: true }, setState)} className="w-full rounded-xl bg-yellow-400 px-4 py-2 font-display text-base text-black hover:bg-yellow-300">
            Simular todo o mata-mata ⚡
          </button>
        )}
      </div>

      {showOpp && ko.rival.players && (
        <OpponentSquadModal name={ko.rival.name} short={ko.rival.short} color={ko.rival.color} overall={oppPreviewInfo?.ovr ?? ko.rival.overall} players={ko.rival.players} ratingsOverride={oppPreviewInfo} onClose={() => setShowOpp(false)} label="Elenco adversário" />
      )}
      {showSelf && (
        <OpponentSquadModal name={state.teamName} short="VOC" color="#facc15" overall={myPreviewInfo?.ovr ?? myOvr} players={squad} tactics={pt} ratingsOverride={myPreviewInfo} onClose={() => setShowSelf(false)} label="Seu elenco" />
      )}
      {showBracket && comp.bracket && <BracketView bracket={comp.bracket} onClose={() => setShowBracket(false)} />}

    </div>
  );
}

function playKO(state: SavedState, setState: (s: SavedState) => void) {
  const comp = state.comp!;
  const koRaw = comp.currentKO!;
  const rivalDelta = teamOvrDelta(varianceSeed(state), koRaw.rival.name) + seasonGlobalBuff(state.season);
  const ko = {
    ...koRaw,
    rival: {
      ...koRaw.rival,
      overall: Math.max(1, Math.min(99, koRaw.rival.overall + rivalDelta)),
      players: koRaw.rival.players ? applyOvrDelta(koRaw.rival.players, rivalDelta) : koRaw.rival.players,
    },
  };
  const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const myOvr = teamOverall(squad);
  const twoLeg = comp.koFormat === "twoLeg" && ko.round < 3 && !ko.thirdPlace;
  const legs = ko.legs ?? [];
  const legIdx = legs.length;
  // Campo neutro em qualquer partida de jogo único (final de Liberta/Sul,
  // disputa de 3º lugar e todas as fases do Mundial). Em ida-e-volta, mando alterna.
  const neutral = !twoLeg;
  const playerHome = twoLeg ? legIdx === 0 : (neutral ? true : Math.random() < 0.5);
  const homeOvr = playerHome ? myOvr : ko.rival.overall;
  const awayOvr = playerHome ? ko.rival.overall : myOvr;
  const homeName = playerHome ? state.teamName : ko.rival.name;
  const awayName = playerHome ? ko.rival.name : state.teamName;
  const homeShort = playerHome ? "VOC" : ko.rival.short;
  const awayShort = playerHome ? ko.rival.short : "VOC";
  const homeColor = playerHome ? "#facc15" : ko.rival.color;
  const awayColor = playerHome ? ko.rival.color : "#facc15";
  const homeSquad = playerHome ? squad : ko.rival.players;
  const awaySquad = playerHome ? ko.rival.players : squad;
  const pt = playerTactics(state);
  const homeTac = playerHome ? pt : undefined;
  const awayTac = playerHome ? undefined : pt;
  const isFinal = ko.round === 3 && !ko.thirdPlace;
  const ctx = buildPlayerCtx(state, { isFinal, isKnockout: true, teamOvr: myOvr, oppOvr: ko.rival.overall });
  const result = simulateMatch(homeName, homeShort, homeColor, homeOvr, awayName, awayShort, awayColor, awayOvr, true, homeSquad, awaySquad, homeTac, awayTac, neutral, ctx);
  const koPhase = koLabels()[ko.round] ?? "Mata-mata";
  const legTag = twoLeg ? (legIdx === 0 ? " (ida)" : " (volta)") : "";
  result.label = `${compTitle(comp.kind)} · ${koPhase}${legTag}`;
  result.season = state.season ?? 1;

  const newLegs = [...legs, { home: result.homeGoals, away: result.awayGoals, playerHome }];
  // Persistimos o rival original (sem a variância aplicada em memória) pra não acumular delta.
  const newKO: KOMatch = { ...koRaw, legs: newLegs };
  const playerGoals = playerHome ? result.homeGoals : result.awayGoals;
  const oppGoals = playerHome ? result.awayGoals : result.homeGoals;
  const trackers = applyPostMatchTrackers(state, playerGoals, oppGoals);
  setState({ ...state, ...trackers, lastMatch: result, matchHistory: [...state.matchHistory, result].slice(-300), comp: { ...comp, currentKO: newKO }, phase: "compKOResult", preMatchRankingScore: currentRankingScore(state) });
}

function CompKOMatchScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  // fallback (should not be used because we go straight to result)
  return <CompKOIntroScreen state={state} setState={setState} />;
}

function CompKOResultScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const comp = state.comp!;
  const koRaw = comp.currentKO!;
  const rivalDelta = teamOvrDelta(varianceSeed(state), koRaw.rival.name) + seasonGlobalBuff(state.season);
  const ko = {
    ...koRaw,
    rival: {
      ...koRaw.rival,
      overall: Math.max(1, Math.min(99, koRaw.rival.overall + rivalDelta)),
      players: koRaw.rival.players ? applyOvrDelta(koRaw.rival.players, rivalDelta) : koRaw.rival.players,
    },
  };
  const m = state.lastMatch!;
  const twoLeg = comp.koFormat === "twoLeg" && ko.round < 3 && !ko.thirdPlace;
  const legs = ko.legs ?? [];
  const needsSecondLeg = twoLeg && legs.length < 2;
  const [showBracket, setShowBracket] = useState(false);

  // Placar acumulado (player vs rival). Usa o mando real gravado na perna;
  // fallback para o comportamento antigo (ida em casa) se vier de save antigo.
  let playerAgg = 0, rivalAgg = 0;
  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    const playerHome = leg.playerHome ?? (twoLeg ? i === 0 : true);
    playerAgg += playerHome ? leg.home : leg.away;
    rivalAgg  += playerHome ? leg.away : leg.home;
  }

  const decided = !needsSecondLeg;
  const tied = decided && playerAgg === rivalAgg;

  // Anti-cheat: se já houver disputa de pênaltis salva no KO, reutiliza.
  // Caso contrário, simula UMA vez e persiste imediatamente no estado
  // para que atualizar a página não gere um novo resultado.
  const shootout = useMemo<Shootout | null>(() => {
    if (!tied) return null;
    if (ko.shootout) return ko.shootout;
    const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
    return simulateShootout(squad, ko.rival.players ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (tied && shootout && !ko.shootout) {
      setState({ ...state, comp: { ...comp, currentKO: { ...koRaw, shootout } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const penaltyWin = shootout?.playerWon ?? false;
  const advanced = decided && (playerAgg > rivalAgg || (tied && penaltyWin));

  const [playing, setPlaying] = useState(true);

  const next = () => {
    if (!decided) { setState({ ...state, phase: "compKOIntro" }); return; }
    // Atualiza o chaveamento com o resultado do jogador (se existir).
    const playerPenScored = tied && shootout ? shootout.playerKicks.filter((k) => k.scored).length : undefined;
    const rivalPenScored = tied && shootout ? shootout.rivalKicks.filter((k) => k.scored).length : undefined;
    // Disputa de 3º lugar não afeta o chaveamento principal (final já foi decidida).
    const varCtx = { teamName: state.teamName, season: state.season };
    const updatedBracket = comp.bracket && !ko.thirdPlace
      ? applyPlayerBracketResult(comp.bracket, ko.round, playerAgg, rivalAgg, advanced, tied && penaltyWin, comp.koFormat, comp.kind, playerPenScored, rivalPenScored, varCtx)
      : comp.bracket;
    if (!advanced) {
      const newHist = [...comp.koHistory, { ...ko, advanced: false, penaltyWin: tied ? penaltyWin : undefined }];
      // Se perdeu a semifinal, cria a disputa de 3º lugar contra o outro semifinalista eliminado.
      if (ko.round === 2 && !ko.thirdPlace) {
        const otherLoser = updatedBracket ? otherSemiLoser(updatedBracket) : undefined;
        const squadNow = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
        const rival = otherLoser
          ? bracketRivalToIntlTeam(comp.kind, otherLoser)
          : nextKORival({ ...comp, koHistory: newHist }, teamOverall(squadNow), varCtx);
        const newKO: KOMatch = { rival, round: 2, legs: [], thirdPlace: true };
        setState({ ...state, comp: { ...comp, koHistory: newHist, currentKO: newKO, bracket: updatedBracket }, phase: "compKOIntro" });
        return;
      }
      // Perdeu o 3º lugar → 4º lugar (sem medalha).
      // Perdeu final → vice. Demais → eliminado normal.
      const exit: KOExit = ko.thirdPlace
        ? "fourth"
        : ko.round === 3 ? "final" : ko.round === 2 ? "semi" : ko.round === 1 ? "quarter" : "r16";
      const koExits = { ...(state.seasonKOExits ?? {}), [comp.kind]: exit };
      setState({ ...state, seasonKOExits: koExits, comp: { ...comp, koHistory: newHist, currentKO: null, bracket: updatedBracket, phase: "done", eliminated: true }, phase: "compEnd" });
      return;
    }
    const newHist = [...comp.koHistory, { ...ko, advanced: true, penaltyWin: tied ? penaltyWin : undefined }];
    // Venceu a disputa de 3º lugar → medalha de bronze, encerra a competição.
    if (ko.thirdPlace) {
      const koExits = { ...(state.seasonKOExits ?? {}), [comp.kind]: "semi" as KOExit };
      setState({ ...state, seasonKOExits: koExits, comp: { ...comp, koHistory: newHist, currentKO: null, bracket: updatedBracket, phase: "done", eliminated: true }, phase: "compEnd" });
      return;
    }
    const nextRound = ko.round + 1;
    if (nextRound >= 4) {
      const trophies = { ...state.trophies };
      if (comp.kind === "libertadores") trophies.libertadores = true;
      else if (comp.kind === "sulamericana") trophies.sulamericana = true;
      else trophies.mundial = true;
      const koExits = { ...(state.seasonKOExits ?? {}), [comp.kind]: "champion" as KOExit };
      setState({ ...state, trophies, seasonKOExits: koExits, comp: { ...comp, koHistory: newHist, currentKO: null, bracket: updatedBracket, phase: "done", champion: true }, phase: "compEnd" });
      return;
    }

    const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
    const bracketRival = updatedBracket ? playerNextBracketRival(updatedBracket, nextRound) : undefined;
    const rival = bracketRival
      ? bracketRivalToIntlTeam(comp.kind, bracketRival)
      : nextKORival({ ...comp, koHistory: newHist }, teamOverall(squad), varCtx);
    const newKO: KOMatch = { rival, round: nextRound, legs: [] };
    setState({ ...state, comp: { ...comp, koHistory: newHist, currentKO: newKO, bracket: updatedBracket }, phase: "compKOIntro" });
  };


  // Pênaltis só rolam na última perna decisiva e empatada
  const liveShootout = decided && tied ? shootout : null;

  const koAuto = state.compKOAuto ?? false;
  const revealScoreAfterMatch = () => {
    setPlaying(false);
    if (typeof state.preMatchRankingScore === "number") {
      setState({ ...state, preMatchRankingScore: null });
    }
  };

  useEffect(() => {
    if (!playing && koAuto) {
      const t = setTimeout(next, 4000);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, koAuto]);

  const playerSquad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
  const playerOvr = teamOverall(playerSquad);
  const opp = resolveOppFromMatch(state, m);
  const playerIsHome = m.homeShort === "VOC";
  const homeSquad = playerIsHome ? playerSquad : opp.players;
  const awaySquad = playerIsHome ? opp.players : playerSquad;
  const homeOverall = playerIsHome ? playerOvr : opp.overall;
  const awayOverall = playerIsHome ? opp.overall : playerOvr;

  if (playing) {
    return (
      <div className="animate-slide-up">
        {koAuto && <div className="mb-2 text-center text-xs text-yellow-400">🚀 Auto · simulando todo o mata-mata</div>}
        <LiveMatch match={m} shootout={liveShootout} onFinish={revealScoreAfterMatch} homeSquad={homeSquad} awaySquad={awaySquad} homeOverall={homeOverall} awayOverall={awayOverall} playerTactics={playerTactics(state)} />
      </div>
    );
  }


  return (
    <div className="animate-slide-up">
      <div className="rounded-2xl pitch-bg p-6 text-center card-glow">
        <button onClick={() => comp.bracket && setShowBracket(true)} className="text-xs uppercase text-white/70 underline decoration-dotted underline-offset-4 hover:text-white">{koPhaseLabel(ko.round, ko.thirdPlace)} · {twoLeg ? (legs.length === 1 ? "Ida" : "Volta") : "Jogo único"} · 🏆 ver chave</button>
        <div className="mt-4 flex items-center justify-center gap-4">
          <ClickableCrest short={m.homeShort} color={m.homeColor} name={m.home} size={56} players={homeSquad ?? []} overall={homeOverall} tactics={m.homeShort === "VOC" ? playerTactics(state) : (m.homeTacticsInfo ? { formation: m.homeTacticsInfo.formation, style: m.homeTacticsInfo.style } : undefined)} ratingsOverride={m.homeTacticsInfo ? { atk: m.homeTacticsInfo.atk, def: m.homeTacticsInfo.def, ovr: m.homeTacticsInfo.ovr } : undefined} label="Elenco (mandante)" />
          <div className="font-display text-6xl text-white">{m.homeGoals} <span className="text-white/50">×</span> {m.awayGoals}</div>
          <ClickableCrest short={m.awayShort} color={m.awayColor} name={m.away} size={56} players={awaySquad ?? []} overall={awayOverall} tactics={m.awayShort === "VOC" ? playerTactics(state) : (m.awayTacticsInfo ? { formation: m.awayTacticsInfo.formation, style: m.awayTacticsInfo.style } : undefined)} ratingsOverride={m.awayTacticsInfo ? { atk: m.awayTacticsInfo.atk, def: m.awayTacticsInfo.def, ovr: m.awayTacticsInfo.ovr } : undefined} label="Elenco (visitante)" />
        </div>
        {twoLeg && (
          <div className="mt-3 text-sm text-white/80">Placar agregado: <b>{playerAgg}</b> × <b>{rivalAgg}</b></div>
        )}
        {decided && (
          <div className={`mt-3 font-display text-3xl ${advanced ? "text-emerald-400" : "text-red-400"}`}>{advanced ? "AVANÇOU!" : "ELIMINADO"}</div>
        )}
        {tied && shootout && (
          <div className="mt-2 text-sm text-white/80">
            Pênaltis: <b>{shootout.playerKicks.filter((k) => k.scored).length}</b> × <b>{shootout.rivalKicks.filter((k) => k.scored).length}</b> — {penaltyWin ? "você venceu! 🥅" : "você perdeu. 😔"}
          </div>
        )}

      </div>
      <TacticsReport m={m} homeSquad={homeSquad ?? undefined} awaySquad={awaySquad ?? undefined} playerTactics={playerTactics(state)} />

      <BracketButton bracket={comp.bracket} />

      <button onClick={next} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        {needsSecondLeg ? "Jogo de volta →" : decided && advanced ? "Próxima fase →" : "Continuar →"}
      </button>
      {showBracket && comp.bracket && <BracketView bracket={comp.bracket} onClose={() => setShowBracket(false)} />}


    </div>
  );
}

function CompEndScreen({ state, setState }: { state: SavedState; setState: (s: SavedState) => void }) {
  const comp = state.comp!;
  const wonIt = comp.champion;
  const isMundial = comp.kind === "mundial";
  // Detecta bronze (venceu disputa de 3º lugar), 4º lugar (perdeu bronze)
  // e vice (perdeu a final).
  const lastKO = comp.koHistory[comp.koHistory.length - 1];
  const bronze = !wonIt && !!lastKO?.thirdPlace && !!lastKO?.advanced;
  const fourth = !wonIt && !!lastKO?.thirdPlace && !lastKO?.advanced;
  const vice = !wonIt && !bronze && !fourth && (state.seasonKOExits?.[comp.kind] === "final");

  // Sula/Liberta: campeão, vice e 3º lugar vão ao Mundial (com pontuação
  // diferente). 4º lugar e demais eliminações encerram a campanha.
  const goesToMundial = !isMundial && (wonIt || vice || bronze);

  const goNextTournament = () => {
    if (goesToMundial) {
      if (wonIt) {
        // Campeão ganha craque bônus antes do Mundial.
        const mentorPending = !!state.mentorLegendPending && getActiveCoachEffects().bonusLegendOn3Titles;
        setState({ ...state, phase: "bonusDraft", comp: null, bonusRemaining: 1 + (mentorPending ? 1 : 0), bonusNext: "mundial", bonusIncludeIntl: true, mentorLegendPending: mentorPending ? false : state.mentorLegendPending });
      } else {
        // Vice/3º vão direto ao Mundial (sem lenda bônus).
        const squad = squadWithFitPenalty(state.picks, state.formation ?? DEFAULT_FORMATION);
        const mundialComp = buildCompetition("mundial", state.teamName, teamOverall(squad));
        setState({ ...state, phase: "compIntro", comp: mundialComp, bonusRemaining: 0, bonusNext: undefined });
      }
      return;
    }
    if (wonIt && isMundial) { setState({ ...state, phase: "champion" }); return; }
    setState({ ...state, phase: "eliminated" });
  };

  const compName = comp.kind === "libertadores" ? "DA LIBERTADORES" : comp.kind === "sulamericana" ? "DA SUL-AMERICANA" : "MUNDIAL";
  const title = wonIt
    ? `CAMPEÃO ${compName}!`
    : vice
    ? `VICE-CAMPEÃO ${compName}`
    : bronze
    ? `3º LUGAR ${compName}`
    : fourth
    ? `4º LUGAR ${compName}`
    : "Fim de campanha";

  // Deriva pódio a partir do chaveamento quando o jogador venceu:
  // 1º = você; 2º = adversário da final; 3º = perdedor da semi com maior gols (proxy).
  const bracket = comp.bracket;
  const podiumEntries: PodiumEntry[] | null = (() => {
    if (!wonIt || !bracket) return null;
    const finalRound = bracket.rounds[3];
    const semiRound = bracket.rounds[2];
    if (!finalRound || !finalRound[0]) return null;
    const finalMatch = finalRound[0];
    const runnerUp = finalMatch.winner === "home" ? finalMatch.away : finalMatch.home;
    if (!runnerUp) return null;
    const semiLosers = (semiRound ?? [])
      .map((m) => (m.winner === "home" ? m.away : m.winner === "away" ? m.home : null))
      .filter((t): t is NonNullable<typeof t> => !!t);
    const third = semiLosers[0];
    if (!third) return null;
    return [
      { name: state.teamName, short: "VOC", color: "#facc15", isPlayer: true, sub: "Campeão" },
      { name: runnerUp.name, short: runnerUp.short, color: runnerUp.color, sub: "Vice" },
      { name: third.name, short: third.short, color: third.color, sub: "Semifinalista" },
    ];
  })();

  const themeKind = comp.kind;
  const ptsInfo = comp.kind === "sulamericana"
    ? { champ: 60, vice: 30, bronze: 15 }
    : comp.kind === "libertadores"
    ? { champ: 60, vice: 35, bronze: 20 }
    : { champ: 80, vice: 40, bronze: 25 };

  return (
    <div className="animate-slide-up">
      <CompHero kind={themeKind} subtitle={wonIt ? "Campanha vencedora" : vice ? "Vice-campeão" : bronze ? "Medalha de bronze" : fourth ? "4º lugar" : "Fim de campanha"} />
      <div className="relative overflow-hidden rounded-2xl pitch-bg p-8 text-center card-glow">
        {wonIt && <Confetti count={32} />}
        {vice && <Confetti count={20} />}
        {bronze && <Confetti count={14} />}
        {wonIt ? (
          <div className="relative inline-block">
            <div className="text-7xl animate-trophy-drop" aria-hidden>🏆</div>
            <div className="pointer-events-none absolute inset-0 -m-4 rounded-full animate-flash-burst" style={{ background: "radial-gradient(circle, rgba(250,204,21,0.5), transparent 60%)" }} />
          </div>
        ) : vice ? (
          <div className="text-7xl animate-trophy-drop" aria-hidden>🥈</div>
        ) : bronze ? (
          <div className="text-7xl animate-trophy-drop" aria-hidden>🥉</div>
        ) : fourth ? (
          <div className="text-6xl">😐</div>
        ) : (
          <div className="text-5xl">😔</div>
        )}
        <div className={`mt-3 font-display ${wonIt ? "text-3xl gold-text" : vice ? "text-2xl text-zinc-200" : bronze ? "text-2xl text-amber-300" : "text-2xl"}`}>{title}</div>
        <div className="mt-3 text-sm text-white/80">
          {wonIt && !isMundial && `Campeão (+${ptsInfo.champ} pts) · vaga garantida no Mundial de Clubes com lenda bônus.`}
          {wonIt && isMundial && `Temporada ${state.season ?? 1} concluída. Sua campanha continua na próxima temporada com o mesmo elenco.`}
          {vice && !isMundial && `Vice-campeão (+${ptsInfo.vice} pts) · você também vai ao Mundial de Clubes.`}
          {bronze && !isMundial && `3º lugar (+${ptsInfo.bronze} pts) · vaga no Mundial de Clubes garantida.`}
          {vice && isMundial && `Vice-campeão do Mundial (+${ptsInfo.vice} pts).`}
          {bronze && isMundial && `3º lugar no Mundial (+${ptsInfo.bronze} pts).`}
          {fourth && "Você perdeu a disputa de 3º lugar e terminou em 4º."}
          {!wonIt && !vice && !bronze && !fourth && "Cada elenco tem uma campanha só. Sua pontuação vai para o ranking."}
        </div>
        {wonIt && !isMundial && (
          <div className="mt-3 rounded-lg bg-yellow-500/20 px-3 py-2 text-sm font-semibold text-yellow-200">
            🏆 Campeão do mata-mata! +1 lenda bônus
          </div>
        )}
        {(vice || bronze) && !isMundial && (
          <div className="mt-3 rounded-lg bg-fuchsia-500/20 px-3 py-2 text-sm font-semibold text-fuchsia-200">
            🌍 Vaga no Mundial de Clubes
          </div>
        )}
      </div>
      {podiumEntries && podiumEntries.length === 3 && (
        <>
          <div className="mt-6 text-center text-[10px] uppercase tracking-widest text-yellow-300/80">Pódio da competição</div>
          <AnimatedPodium top3={podiumEntries as [PodiumEntry, PodiumEntry, PodiumEntry]} />
        </>
      )}
      {bracket && (
        <div className="mt-4">
          <BracketButton bracket={bracket} />
        </div>
      )}
      <button onClick={goNextTournament} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        {wonIt && !isMundial ? "Escolher lenda + Mundial →" : goesToMundial ? "Ir ao Mundial →" : wonIt && isMundial ? "Continuar campanha →" : "Ver ranking →"}
      </button>
    </div>
  );
}



/* ─────────────  Champion / Eliminated  ───────────── */

function RankingResultCard({ state, mode }: { state: SavedState; mode?: "casual" | "classico" }) {
  const stats = useMemo(() => computeStats(state), [state]);
  const score = useMemo(() => computeFullScore(state, stats), [state, stats]);
  const [pos, setPos] = useState<{ position: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    import("@/lib/saves").then(({ fetchRankingPosition }) => {
      fetchRankingPosition(score, mode)
        .then((p) => { if (alive) { setPos(p); setLoading(false); } })
        .catch(() => { if (alive) setLoading(false); });
    });
    return () => { alive = false; };
  }, [score, mode]);
  const sg = stats.totalGd;
  return (
    <div className="mt-4 rounded-2xl border border-yellow-400/40 bg-yellow-500/5 p-5 text-center">
      <div className="mb-2 flex justify-center"><TeamBadge short="VOC" color="#facc15" name={state.teamName} size={56} /></div>
      <div className="text-sm text-white/90 truncate">{state.teamName}</div>
      <div className="text-[10px] uppercase tracking-widest text-yellow-300/80">Sua pontuação no ranking global</div>
      <div className="mt-1 font-display text-5xl gold-text">⭐ {score}</div>
      <div className="mt-2 text-sm text-white/85">
        {loading ? "Calculando posição…" : pos ? (
          <>Posição <b>{pos.position}º</b> de <b>{pos.total}</b> jogadores</>
        ) : "Posição indisponível"}
      </div>
      {stats.achievements?.length ? (
        <div className="mt-4 rounded-xl border border-yellow-400/30 bg-black/20 p-3 text-left">
          <div className="mb-2 text-center text-[10px] uppercase tracking-widest text-yellow-300/80">Sua campanha</div>
          <div className="flex justify-center"><AchievementChips items={stats.achievements} size="sm" /></div>
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[11px]">
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-emerald-300">V {stats.totalWins}</span>
        <span className="rounded bg-zinc-500/15 px-1.5 py-0.5 text-zinc-300">E {stats.totalDraws}</span>
        <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-red-300">D {stats.totalLosses}</span>
        <span className={`rounded px-1.5 py-0.5 ${sg > 0 ? "bg-emerald-500/15 text-emerald-300" : sg < 0 ? "bg-red-500/15 text-red-300" : "bg-zinc-500/15 text-zinc-300"}`}>SG {sg > 0 ? "+" : ""}{sg}</span>
        {stats.brasileiraoPos != null && (
          <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">Brasileirão {stats.brasileiraoPos}º</span>
        )}
      </div>
      <Link to="/ranking" className="mt-4 inline-block rounded-xl bg-yellow-400 px-4 py-2 font-display text-black hover:bg-yellow-300">
        Ver ranking global →
      </Link>
    </div>
  );
}


function startNextSeason(state: SavedState): SavedState {
  const stats = computeStats(state);
  const snapshot: SeasonSnapshot = {
    season: state.season ?? 1,
    brasileiraoPos: stats.brasileiraoPos,
    trophies: { ...state.trophies },
    groupAdvanced: { ...(state.groupAdvanced ?? {}) },
    koExits: { ...(state.seasonKOExits ?? {}) },
  };
  const leagueTeamIds = pickLeagueTeams();
  const { fixtures, schedule } = buildSchedule(leagueTeamIds);
  const table = buildInitialTable(state.teamName, leagueTeamIds);
  // "Mentor de craques": se a temporada que acabou teve 3+ títulos, marca +1 lenda para o próximo bônus.
  const prevTrophyCount = (state.trophies.brasileirao?1:0)+(state.trophies.libertadores?1:0)+(state.trophies.sulamericana?1:0)+(state.trophies.mundial?1:0);
  const mentorLegendPending = prevTrophyCount >= 3;
  return {
    ...state,
    phase: "season",
    season: (state.season ?? 1) + 1,
    seasonHistory: [...(state.seasonHistory ?? []), snapshot],
    trophies: { ...emptyTrophies },
    groupAdvanced: {},
    seasonKOExits: {},
    mentorLegendPending,

    comp: null,
    compQueue: [],
    bonusRemaining: 0,
    bonusNext: undefined,
    bonusReturnToKO: undefined,
    fixtures,
    schedule,
    table,
    round: 0,
    leagueTeamIds,
    lastMatch: null,
    prevBrasileiraoPos: null,
    preMatchBrasileiraoTable: null,
    preMatchComp: null,
    preMatchRankingScore: null,
    draftSeed: Math.floor(Math.random() * 0x7fffffff) || 1,
  };
}

function ChampionScreen({ state, setState, onLeave }: { state: SavedState; setState: (s: SavedState) => void; onLeave: () => void }) {
  const stats = useMemo(() => computeStats(state), [state]);
  const mundialTitles = stats.titleCounts.mundial;
  const nthLabel = mundialTitles <= 1 ? "CAMPEÃO MUNDIAL!" : mundialTitles === 2 ? "BICAMPEÃO MUNDIAL!" : mundialTitles === 3 ? "TRICAMPEÃO MUNDIAL!" : `${mundialTitles}× CAMPEÃO MUNDIAL!`;
  const nextSeason = (state.season ?? 1) + 1;
  return (
    <div className="animate-slide-up text-center">
      <div className="rounded-3xl pitch-bg p-8 card-glow">
        <div className="text-7xl">🏆</div>
        <div className="mt-4 font-display text-5xl gold-text">{nthLabel}</div>
        <div className="mt-2 text-lg text-white">{state.teamName} · Temporada {state.season ?? 1}</div>
        <div className="mt-6 text-sm text-white/80">Você ganhou o Mundial! Leve esse mesmo elenco para a <b>Temporada {nextSeason}</b> e tente somar ainda mais pontos. A campanha só termina quando você for eliminado.</div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
          {stats.titleCounts.brasileirao > 0 && <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-200">🥇 Brasileirão ×{stats.titleCounts.brasileirao}</span>}
          {stats.titleCounts.libertadores > 0 && <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-200">🏆 Libertadores ×{stats.titleCounts.libertadores}</span>}
          {stats.titleCounts.sulamericana > 0 && <span className="rounded-full bg-zinc-400/20 px-3 py-1 text-zinc-100">🥈 Sul-Americana ×{stats.titleCounts.sulamericana}</span>}
          <span className="rounded-full bg-yellow-500/25 px-3 py-1 text-yellow-100">🌍 Mundial ×{mundialTitles}</span>
        </div>
      </div>
      <RankingResultCard state={state} />
      <CampaignXPCard state={state} />
      <button onClick={() => setState(startNextSeason(state))} className="mt-6 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">
        Ir para Temporada {nextSeason} →
      </button>
      <button onClick={onLeave} className="mt-3 w-full rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground hover:bg-secondary">
        Encerrar campanha e voltar aos slots
      </button>
    </div>
  );
}

function CampaignXPCard({ state }: { state: SavedState }) {
  const breakdown = computeSaveXPBreakdown(state);
  if (breakdown.lines.length === 0) return null;
  return (
    <div className="mt-4 rounded-2xl border border-yellow-500/30 bg-black/40 p-4 text-left">
      <div className="flex items-center justify-between">
        <div className="font-display text-lg text-yellow-200">XP ganho nesta campanha</div>
        <div className="rounded-lg bg-yellow-500/20 px-3 py-1 font-display text-xl text-yellow-100">+{breakdown.total} XP</div>
      </div>
      <div className="mt-3 space-y-2">
        {breakdown.lines.map((l, i) => (
          <div key={i} className="rounded-lg bg-white/5 p-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">{l.label}</span>
              <span className="text-yellow-200">+{l.xp} XP</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-white/70">
              {l.reasons.map((r, j) => <span key={j} className="rounded-full bg-black/30 px-2 py-0.5">{r}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[11px] text-white/60">XP vai pra árvore do técnico — gaste em nós passivos que valem pra todos os saves.</div>
    </div>
  );
}

function EliminatedScreen({ state, onLeave }: { state: SavedState; onLeave: () => void }) {
  return (
    <div className="animate-slide-up text-center">
      <div className="rounded-2xl pitch-bg p-8 card-glow">
        <div className="text-5xl">🥲</div>
        <div className="mt-3 font-display text-3xl">Fim da campanha</div>
        <div className="mt-2 text-sm text-white/80">Sua jornada com <b>{state.teamName}</b> terminou aqui. Cada elenco tem uma vida só — sua pontuação final está registrada no ranking global.</div>
      </div>
      <RankingResultCard state={state} />
      <CampaignXPCard state={state} />
      <div className="mt-4 rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground">
        Para tentar de novo, volte aos slots: apague este save ou comece uma campanha nova em outro slot.
      </div>
      <button onClick={onLeave} className="mt-4 w-full rounded-xl px-4 py-3 font-display text-xl btn-primary">Voltar aos slots</button>
    </div>
  );
}




// Prevent unused import warnings
const _keep = { useMemo, matchScore } as unknown as Record<string, unknown>;
void _keep;
type _T = Team;
type _T2 = IntlTeam;
