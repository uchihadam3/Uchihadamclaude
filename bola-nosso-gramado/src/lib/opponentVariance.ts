// Variação persistente de overall dos adversários.
//
// Cada time de qualquer competição (Brasileirão, Libertadores, Sul-Americana,
// Mundial) recebe um "delta" determinístico entre -3 e +3 OVR, calculado a
// partir de (nome do técnico + temporada + nome do time). Isso significa que:
//
//   • o mesmo time exibe o mesmo OVR ao longo de toda a temporada
//   • a variação nunca afeta os jogadores do draft do próprio usuário
//   • a variação muda a cada nova temporada, dando "vida" ao mundo
//   • dois saves diferentes veem valores diferentes para o mesmo time
//
// O delta é aplicado como um bônus/penalidade uniforme em cada jogador do
// elenco (clamp 1..99), então também influencia sutilmente ATA/DEF exibidos
// e o resultado da simulação da partida disputada pelo usuário.

import { TEAMS, LIBERTADORES_RIVALS, SULAMERICANA_RIVALS, MUNDIAL_RIVALS, type Player } from "./gameData";

// --- Canonical baselines ----------------------------------------------------
// Cada time calcula a variância UMA vez, na primeira competição em que aparece,
// e carrega o mesmo delta pelas demais. Buffs de competição (+3 continental,
// +4 mundial, +brBuff pós-título) NÃO recalculam a variância — só somam em
// cima. Ordem de prioridade da baseline:
//   1) Times brasileiros → sempre pela baseline do Brasileirão (TEAMS)
//   2) Não-brasileiros presentes na Libertadores → baseline da Liberta
//   3) Não-brasileiros só na Sul-Americana → baseline da Sula
//   4) Exclusivos do Mundial (europeus/asiáticos/etc.) → baseline do Mundial
const cleanKey = (name: string) =>
  name
    .replace(/\s+\([^)]*\)$/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const avgTop11 = (
  players: { overall: number; reserve?: unknown }[] | undefined,
  fallback: number,
) => {
  if (!players?.length) return fallback;
  const top = [...players]
    .filter((p) => p.reserve === undefined)
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 11);
  return top.length ? top.reduce((s, p) => s + p.overall, 0) / top.length : fallback;
};

const BR_BASE_OVR = new Map<string, number>();
for (const t of TEAMS) {
  BR_BASE_OVR.set(cleanKey(t.name), avgTop11(t.players, 82));
}
if (BR_BASE_OVR.has("rb bragantino")) {
  BR_BASE_OVR.set("bragantino", BR_BASE_OVR.get("rb bragantino")!);
}

// Baseline continental/mundial para times NÃO brasileiros.
// Preenchido na ordem Liberta → Sula → Mundial; a primeira presença vence
// e vira a "âncora" do time nas competições seguintes.
const INTL_BASE_OVR = new Map<string, number>();
const registerIntl = (
  pool: { name: string; overall: number; players?: { overall: number; reserve?: unknown }[] }[],
) => {
  for (const t of pool) {
    const key = cleanKey(t.name);
    if (BR_BASE_OVR.has(key)) continue; // brasileiros usam BR_BASE_OVR
    if (INTL_BASE_OVR.has(key)) continue; // primeira competição vence
    INTL_BASE_OVR.set(key, avgTop11(t.players, t.overall));
  }
};
registerIntl(LIBERTADORES_RIVALS);
registerIntl(SULAMERICANA_RIVALS);
registerIntl(MUNDIAL_RIVALS);

function canonicalBase(teamName: string): number | undefined {
  const key = cleanKey(teamName);
  return BR_BASE_OVR.get(key) ?? INTL_BASE_OVR.get(key);
}

export const MAX_OVR_VARIANCE = 3;

/**
 * Buff GLOBAL de OVR aplicado a TODOS os times da IA (Brasileirão, Libertadores,
 * Sul-Americana e Mundial) a partir da 4ª temporada. Empilha em degraus fixos:
 *   • Temp. 1–3: +0
 *   • Temp. 4  : +1
 *   • Temp. 5  : +2
 *   • Temp. 6  : +3
 *   • Temp. 7  : +4
 *   • Temp. 8+ : +5 (teto — não sobe mais)
 * Não afeta o elenco do jogador — só endurece o mundo conforme o técnico evolui.
 */
export function seasonGlobalBuff(season: number | undefined): number {
  const s = season ?? 1;
  if (s >= 8) return 5;
  if (s >= 7) return 4;
  if (s >= 6) return 3;
  if (s >= 5) return 2;
  if (s >= 4) return 1;
  return 0;
}

// Hash determinístico simples (FNV-1a 32 bits) — suficiente pra distribuir
// valores em [-3, +3] de forma uniforme sem trazer dependência externa.
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function varianceSeed(state: { teamName?: string; season?: number }): string {
  const name = (state?.teamName ?? "").trim().toLowerCase();
  const season = state?.season ?? 1;
  return `${name}|s${season}`;
}

/**
 * Delta determinístico em [-MAX_OVR_VARIANCE, +MAX_OVR_VARIANCE].
 *
 * Distribuição assimétrica por faixa de OVR base:
 *
 *   OVR ≥ 84 (fortes — sobem pouco, descem mais):
 *     Normal 35% · +1 12% · +2 5% · +3 3% · -1 24% · -2 15% · -3 6%
 *
 *   OVR 80–83 (médios — simétrico):
 *     Normal 35% · ±1 15% · ±2 10% · ±3 7,5%
 *
 *   OVR ≤ 79 (fracos — sobem mais, descem pouco):
 *     Normal 35% · +1 24% · +2 15% · +3 6% · -1 12% · -2 5% · -3 3%
 */
export function teamOvrDelta(seed: string, teamName: string, baseOverall?: number): number {
  if (!teamName) return 0;
  const h = fnv1a(`${seed}::${teamName.toLowerCase()}`);
  const roll = h % 1000; // 0..999 (precisão de 0,1%)
  // Baseline canônica: BR usa Brasileirão; não-BR usa a primeira competição
  // em que aparece (Liberta → Sula → Mundial). Garante mesmo delta em toda copa.

  const canonical = canonicalBase(teamName);
  const ovr = canonical ?? baseOverall ?? 82;

  // Faixas cumulativas: [limite, delta]. Ordem de leitura: sobe da esquerda.
  let table: Array<[number, number]>;
  if (ovr >= 84) {
    // 12+5+3 (up) + 24+15+6 (down) + 35 (normal) = 100
    table = [
      [120, +1], [170, +2], [200, +3],   // 12% +  5% +  3% = 20
      [440, -1], [590, -2], [650, -3],   // 24% + 15% +  6% = 45
      [1000, 0],                          // 35% normal
    ];
  } else if (ovr <= 79) {
    // 24+15+6 (up) + 12+5+3 (down) + 35 (normal) = 100
    table = [
      [240, +1], [390, +2], [450, +3],   // 24% + 15% +  6% = 45
      [570, -1], [620, -2], [650, -3],   // 12% +  5% +  3% = 20
      [1000, 0],                          // 35% normal
    ];

  } else {
    // Médios (80–83): simétrico 15/10/7,5 cada lado, 35% normal
    table = [
      [150, +1], [250, +2], [325, +3],   // 15 + 10 + 7,5 = 32,5
      [475, -1], [575, -2], [650, -3],   // 15 + 10 + 7,5 = 32,5
      [1000, 0],                          // 35% normal
    ];
  }

  for (const [limit, delta] of table) {
    if (roll < limit) return delta;
  }
  return 0;
}

export function applyOvrDelta(players: Player[], delta: number): Player[] {
  if (!delta || !players?.length) return players;
  return players.map((p) => ({
    ...p,
    overall: Math.max(1, Math.min(99, p.overall + delta)),
  }));
}

/** Conveniência: aplica a variância determinística num elenco adversário. */
export function withOpponentVariance(
  state: { teamName?: string; season?: number },
  teamName: string,
  players: Player[],
): Player[] {
  // Times brasileiros: usa a baseline canônica do Brasileirão (mesmo bucket em
  // toda competição). Não-brasileiros: calcula pelo elenco recebido.
  const canonical = canonicalBase(teamName);
  let base = canonical;
  if (base === undefined) {
    const top = [...players].sort((a, b) => b.overall - a.overall).slice(0, 11);
    base = top.length ? top.reduce((s, p) => s + p.overall, 0) / top.length : 82;
  }
  const delta = teamOvrDelta(varianceSeed(state), teamName, base) + seasonGlobalBuff(state?.season);
  return applyOvrDelta(players, delta);
}

/** Ajusta um overall base (ex.: `ko.rival.overall`) pelo mesmo delta. */
export function applyOvrDeltaToOverall(
  state: { teamName?: string; season?: number },
  teamName: string,
  baseOverall: number,
): number {
  // Se for time brasileiro, o bucket é sempre o do Brasileirão.
  const canonical = canonicalBase(teamName);
  const bucketBase = canonical ?? baseOverall;
  const d = teamOvrDelta(varianceSeed(state), teamName, bucketBase) + seasonGlobalBuff(state?.season);
  return Math.max(1, Math.min(99, baseOverall + d));
}
