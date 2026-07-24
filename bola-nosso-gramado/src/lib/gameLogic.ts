import type { Player, Team, IntlTeam } from "./gameData";
import { TEAMS } from "./gameData";
import {
  DEFAULT_FORMATION,
  deriveTacticsForSquad,
  pickXIForFormation,
  tacticAdjustments,
  contextualTrait,
  type FormationId,
  type TacticStyle,
} from "./formations";
import { getActiveCoachEffects } from "./coach";
import { varianceSeed, teamOvrDelta, applyOvrDelta, seasonGlobalBuff } from "./opponentVariance";

export interface TeamTactics { formation: FormationId; style: TacticStyle }



/** Deriva um "short" (3 letras) a partir do nome do time do jogador.
 *  Usa iniciais das palavras (>=2 palavras) ou 3 primeiras letras (1 palavra).
 *  Ex.: "São Paulo FC" -> "SPF"; "Bola" -> "BOL". */
export function playerShortFromName(name: string): string {
  const clean = (name ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  if (!clean) return "VOC";
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return words.slice(0, 3).map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  }
  return words[0].slice(0, 3).toUpperCase();
}



export interface TableRow {
  teamId: string;
  name: string;
  short: string;
  color: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  points: number;
  isPlayer?: boolean;
}

export interface MatchTacticsInfo {
  formation: FormationId;
  style: TacticStyle;
  atkAdj: number;
  defAdj: number;
  atk: number;
  def: number;
  ovr: number;
}

export interface MatchResult {
  home: string;
  away: string;
  homeShort: string;
  awayShort: string;
  homeColor: string;
  awayColor: string;
  homeGoals: number;
  awayGoals: number;
  isPlayer: boolean;
  scorers?: { name: string; position: Player["position"]; team: "home" | "away" }[];
  label?: string;
  season?: number;
  homeTacticsInfo?: MatchTacticsInfo;
  awayTacticsInfo?: MatchTacticsInfo;
}


// Overall = média dos 11 titulares reais (respeitando formação/posições
// derivadas pelo elenco). Reservas NÃO entram na conta — o número mostrado
// bate exatamente com o XI que entra em campo.
export function teamOverall(players: Player[]): number {
  if (!players.length) return 70;
  const t = deriveTacticsForSquad(players);
  const xi = pickXIForFormation(players, t.formation);
  if (!xi.length) {
    const sorted = [...players].sort((a, b) => b.overall - a.overall).slice(0, 11);
    return sorted.reduce((s, p) => s + p.overall, 0) / sorted.length;
  }
  return xi.reduce((s, p) => s + p.overall, 0) / xi.length;
}

function avgOvr(arr: Player[], fallback: number): number {
  return arr.length ? arr.reduce((s, p) => s + p.overall, 0) / arr.length : fallback;
}

// Ratings específicos por setor. Se `tactics` vier, usa a formação escolhida
// para montar o XI e aplica os ajustes de formação + estilo (com coerência
// pelo elenco: ofensivo só rende se o ataque for a força; defensivo idem).
export function teamRatings(
  players: Player[],
  tactics?: TeamTactics,
): { ovr: number; atk: number; def: number } {
  if (!players.length) return { ovr: 70, atk: 70, def: 70 };
  // Sem tática explícita, deriva a mesma tática que a engine de partida usa
  // (deriveTacticsForSquad). Assim, os números de ATA/DEF exibidos em qualquer
  // lugar (ranking, escudo do adversário, tela de jogo) batem com o que a
  // simulação realmente calcula.
  const t = tactics ?? deriveTacticsForSquad(players);
  const xi = pickXIForFormation(players, t.formation);
  const gk = xi.filter((p) => p.position === "GOL");
  const df = xi.filter((p) => p.position === "ZAG");
  const mf = xi.filter((p) => p.position === "MEI");
  const fw = xi.filter((p) => p.position === "ATA");
  const avg = (arr: Player[], fallback: number) =>
    arr.length ? arr.reduce((s, p) => s + p.overall, 0) / arr.length : fallback;
  const ovr = teamOverall(players);
  const gkA = avg(gk, ovr);
  const dfA = avg(df, ovr);
  const mfA = avg(mf, ovr);
  const fwA = avg(fw, ovr);
  const atkBase = fwA * 0.55 + mfA * 0.35 + dfA * 0.10;
  const defBase = gkA * 0.30 + dfA * 0.50 + mfA * 0.20;
  const adj = tacticAdjustments(players, t.formation, t.style);
  return { ovr, atk: atkBase + adj.atkAdj, def: defBase + adj.defAdj };
}

// Seleciona os 11 titulares. Usa a formação se informada; senão, 4-3-3 padrão.
export function pickStartingXI(players: Player[], formation?: FormationId): Player[] {
  return pickXIForFormation(players, formation ?? DEFAULT_FORMATION);
}


// Simula um placar entre dois times. Se `homeSquad`/`awaySquad` vierem, usa
// os ratings de ataque/defesa por setor (mais justo). Caso contrário, usa só
// o overall geral (compatível com chamadas antigas).
export interface PlayerMatchCtx {
  isFinal?: boolean;         // final / decisão → aplica finalOvrBoost do jogador
  isKnockout?: boolean;      // mata-mata continental → aplica cupStarBoost no craque
  /** OVR extra somado ao lado do jogador (raiz.treino após vitória,
   *  raiz.analise após derrota, mental.aprender após goleada,
   *  medico.preparo pós-rodada 20, medico.recovery em jogos apertados). */
  extraOvrBump?: number;
  /** λ ATA extra do lado do jogador (t2.tatico.quimica ao manter formação 3+ jogos). */
  extraLambdaAtk?: number;
}

interface MatchTacticsPair {
  h: { ovr: number; atk: number; def: number };
  a: { ovr: number; atk: number; def: number };
  hT: TeamTactics;
  aT: TeamTactics;
  hAdj: ReturnType<typeof tacticAdjustments>;
  aAdj: ReturnType<typeof tacticAdjustments>;
  hCtx: ReturnType<typeof contextualTrait>;
  aCtx: ReturnType<typeof contextualTrait>;
  homeTacticsInfo: MatchTacticsInfo;
  awayTacticsInfo: MatchTacticsInfo;
}

export function computeMatchTacticsInfo({
  homeSquad,
  awaySquad,
  homeTactics,
  awayTactics,
  homeShort,
  awayShort,
  isPlayer,
  neutral = false,
  ctx,
}: {
  homeSquad: Player[];
  awaySquad: Player[];
  homeTactics?: TeamTactics;
  awayTactics?: TeamTactics;
  homeShort: string;
  awayShort: string;
  isPlayer: boolean;
  neutral?: boolean;
  ctx?: PlayerMatchCtx;
}): MatchTacticsPair {
  const coach = getActiveCoachEffects();
  const playerIsHome = homeShort === "VOC";
  const playerIsAway = awayShort === "VOC";
  const hasPlayer = isPlayer && (playerIsHome || playerIsAway);
  const extraCtxOvrBump = ctx?.extraOvrBump ?? 0;
  const contextOvrBump =
    coach.passiveOvrBump +
    coach.idoloOvrBump +
    (ctx?.isFinal ? coach.finalOvrBoost : 0) +
    extraCtxOvrBump;
  const cupStarOvrEquivalent = ctx?.isKnockout ? coach.cupStarBoost / 11 : 0;
  const ovrBumpH = hasPlayer && playerIsHome ? contextOvrBump + cupStarOvrEquivalent : 0;
  const ovrBumpA = hasPlayer && playerIsAway ? contextOvrBump + cupStarOvrEquivalent : 0;

  const hT = homeTactics ?? deriveTacticsForSquad(homeSquad);
  const aT = awayTactics ?? deriveTacticsForSquad(awaySquad);
  const h = teamRatings(homeSquad, hT);
  const a = teamRatings(awaySquad, aT);
  h.ovr += ovrBumpH; h.atk += ovrBumpH; h.def += ovrBumpH;
  a.ovr += ovrBumpA; a.atk += ovrBumpA; a.def += ovrBumpA;

  if (hasPlayer && playerIsHome && coach.formationBonusMult !== 1) {
    const hAdjTmp = tacticAdjustments(homeSquad, hT.formation, hT.style);
    h.atk += hAdjTmp.atkAdj * (coach.formationBonusMult - 1);
    h.def += hAdjTmp.defAdj * (coach.formationBonusMult - 1);
  }
  if (hasPlayer && playerIsAway && coach.formationBonusMult !== 1) {
    const aAdjTmp = tacticAdjustments(awaySquad, aT.formation, aT.style);
    a.atk += aAdjTmp.atkAdj * (coach.formationBonusMult - 1);
    a.def += aAdjTmp.defAdj * (coach.formationBonusMult - 1);
  }

  if (hasPlayer && playerIsHome && h.ovr - a.ovr >= 5) h.atk += coach.atkVsWeaker;
  if (hasPlayer && playerIsAway && a.ovr - h.ovr >= 5) a.atk += coach.atkVsWeaker;

  const hAdj = tacticAdjustments(homeSquad, hT.formation, hT.style);
  const aAdj = tacticAdjustments(awaySquad, aT.formation, aT.style);
  const hCtx = contextualTrait(hT.formation, {
    isFinal: ctx?.isFinal, isKnockout: ctx?.isKnockout, isNeutral: neutral,
    strengthGap: h.ovr - a.ovr, half: 1,
  });
  const aCtx = contextualTrait(aT.formation, {
    isFinal: ctx?.isFinal, isKnockout: ctx?.isKnockout, isNeutral: neutral,
    strengthGap: a.ovr - h.ovr, half: 1,
  });
  h.atk += hCtx.atkAdd; h.def += hCtx.defAdd;
  a.atk += aCtx.atkAdd; a.def += aCtx.defAdd;

  const homeTacticsInfo = { formation: hT.formation, style: hT.style, atkAdj: hAdj.atkAdj + hCtx.atkAdd, defAdj: hAdj.defAdj + hCtx.defAdd, atk: h.atk, def: h.def, ovr: h.ovr };
  const awayTacticsInfo = { formation: aT.formation, style: aT.style, atkAdj: aAdj.atkAdj + aCtx.atkAdd, defAdj: aAdj.defAdj + aCtx.defAdd, atk: a.atk, def: a.def, ovr: a.ovr };

  return { h, a, hT, aT, hAdj, aAdj, hCtx, aCtx, homeTacticsInfo, awayTacticsInfo };
}

export function simulateMatch(
  homeName: string,
  homeShort: string,
  homeColor: string,
  homeOvr: number,
  awayName: string,
  awayShort: string,
  awayColor: string,
  awayOvr: number,
  isPlayer: boolean,
  homeSquad?: Player[],
  awaySquad?: Player[],
  homeTactics?: TeamTactics,
  awayTactics?: TeamTactics,
  neutral: boolean = false,
  ctx?: PlayerMatchCtx,
): MatchResult {
  const homeAdv = neutral ? 0 : 1.0;
  let hLambdaBase: number;
  let aLambdaBase: number;
  let strengthGap = homeOvr + homeAdv - awayOvr;
  let homeTacticsInfo: MatchTacticsInfo | undefined;
  let awayTacticsInfo: MatchTacticsInfo | undefined;

  // Coach effects — se um dos lados é o jogador (short === "VOC"), aplicamos
  // os bônus passivos da árvore do técnico ao lado dele.
  const coach = getActiveCoachEffects();
  const playerIsHome = homeShort === "VOC";
  const playerIsAway = awayShort === "VOC";
  const hasPlayer = isPlayer && (playerIsHome || playerIsAway);
  // Bônus total de OVR do jogador (sempre): passivo + ídolo + (final se aplicável).
  const extraCtxOvrBump = ctx?.extraOvrBump ?? 0;
  const extraCtxLambdaAtk = ctx?.extraLambdaAtk ?? 0;
  const contextOvrBump =
    coach.passiveOvrBump +
    coach.idoloOvrBump +
    (ctx?.isFinal ? coach.finalOvrBoost : 0) +
    extraCtxOvrBump;
  // "+1 OVR craque em mata-mata" → o craque é 1/11 do time, então em OVR médio ≈ 1/11
  const cupStarOvrEquivalent = ctx?.isKnockout ? coach.cupStarBoost / 11 : 0;
  const ovrBumpH = hasPlayer && playerIsHome ? contextOvrBump + cupStarOvrEquivalent : 0;
  const ovrBumpA = hasPlayer && playerIsAway ? contextOvrBump + cupStarOvrEquivalent : 0;

  if (homeSquad && awaySquad) {
    const calc = computeMatchTacticsInfo({ homeSquad, awaySquad, homeTactics, awayTactics, homeShort, awayShort, isPlayer, neutral, ctx });
    const { h, a, hT, aT, hAdj, aAdj, hCtx, aCtx } = calc;
    strengthGap = (h.ovr + homeAdv) - a.ovr;
    homeTacticsInfo = calc.homeTacticsInfo;
    awayTacticsInfo = calc.awayTacticsInfo;
    const hDiff = Math.max(-30, Math.min(30, (h.atk + homeAdv) - a.def));
    const aDiff = Math.max(-30, Math.min(30, a.atk - (h.def + homeAdv * 0.5)));
    const hGk = avgOvr(homeSquad.filter((p) => p.position === "GOL"), h.ovr);
    const aGk = avgOvr(awaySquad.filter((p) => p.position === "GOL"), a.ovr);
    const hGkMult = Math.max(0.45, Math.min(1.35, 1 - (hGk - 75) * 0.022));
    const aGkMult = Math.max(0.45, Math.min(1.35, 1 - (aGk - 75) * 0.022));
    const homeBaseSq = 1.2 + (neutral ? 0 : 0.1);
    const awayBaseSq = 1.2 - (neutral ? 0 : 0.1);
    // Bola parada + "Cabeça no lugar" (prorrateado) + embalo vencedor: +λ ATA no lado do jogador
    const playerLambdaBonus = coach.spLambdaAtk + coach.cabecaLambdaAtk + extraCtxLambdaAtk;
    const hSpBonus = hasPlayer && playerIsHome ? playerLambdaBonus : 0;
    const aSpBonus = hasPlayer && playerIsAway ? playerLambdaBonus : 0;
    hLambdaBase = (homeBaseSq + hDiff * 0.065 + hAdj.lambdaAtkAdj + hCtx.lambdaAtkAdd + aAdj.lambdaDefAdj + aCtx.lambdaDefAdd + hSpBonus) * aGkMult;
    aLambdaBase = (awayBaseSq + aDiff * 0.065 + aAdj.lambdaAtkAdj + aCtx.lambdaAtkAdd + hAdj.lambdaDefAdj + hCtx.lambdaDefAdd + aSpBonus) * hGkMult;
    // Anti-zebra (mental.foco): quando o jogador é claramente favorito, reduz
    // o lambda do adversário para diminuir gols "bobos" sofridos. Ramp suave:
    // começa a agir no gap 5 e cresce linearmente até o gap 20 (efeito pleno).
    if (hasPlayer && coach.antiUpsetReduction > 0) {
      const gapH = h.ovr - a.ovr;
      const gapA = a.ovr - h.ovr;
      const rampH = Math.max(0, Math.min(1, (gapH - 5) / 15));
      const rampA = Math.max(0, Math.min(1, (gapA - 5) / 15));
      if (playerIsHome && rampH > 0) aLambdaBase *= 1 - coach.antiUpsetReduction * 0.25 * rampH;
      if (playerIsAway && rampA > 0) hLambdaBase *= 1 - coach.antiUpsetReduction * 0.25 * rampA;
    }
  } else {
    const hOvrEff = homeOvr + ovrBumpH;
    const aOvrEff = awayOvr + ovrBumpA;
    const diff = Math.max(-30, Math.min(30, hOvrEff + homeAdv - aOvrEff));
    const homeBase = 1.4 + (neutral ? 0 : 0.1);
    const awayBase = 1.4 - (neutral ? 0 : 0.1);
    const playerLambdaBonus = coach.spLambdaAtk + coach.cabecaLambdaAtk + extraCtxLambdaAtk;
    const hSpBonus = hasPlayer && playerIsHome ? playerLambdaBonus : 0;
    const aSpBonus = hasPlayer && playerIsAway ? playerLambdaBonus : 0;
    hLambdaBase = homeBase + diff * 0.065 + hSpBonus;
    aLambdaBase = awayBase - diff * 0.065 + aSpBonus;
    if (hasPlayer && coach.antiUpsetReduction > 0) {
      const gapH = hOvrEff - aOvrEff;
      const gapA = aOvrEff - hOvrEff;
      const rampH = Math.max(0, Math.min(1, (gapH - 5) / 15));
      const rampA = Math.max(0, Math.min(1, (gapA - 5) / 15));
      if (playerIsHome && rampH > 0) aLambdaBase *= 1 - coach.antiUpsetReduction * 0.25 * rampH;
      if (playerIsAway && rampA > 0) hLambdaBase *= 1 - coach.antiUpsetReduction * 0.25 * rampA;
    }
  }
  // Supressão progressiva de zebra: quanto maior o abismo de força, mais o
  // λ do azarão encolhe (não-linear). Gap 4 → sem efeito; 6 → -10%;
  // 10 → -30%; 15 → -50%; 20+ → -65% (piso). O favorito também ganha um
  // leve empurrão no λ pra refletir domínio territorial.
  {
    const gapAbs = Math.abs(strengthGap);
    if (gapAbs > 4) {
      const t = Math.min(1, (gapAbs - 4) / 16); // 0..1 entre gap 4 e 20
      const underdogMult = 1 - 0.65 * t;         // 1.0 → 0.35
      const favoriteMult = 1 + 0.18 * t;         // 1.0 → 1.18
      if (strengthGap > 0) {
        hLambdaBase *= favoriteMult;
        aLambdaBase *= underdogMult;
      } else {
        aLambdaBase *= favoriteMult;
        hLambdaBase *= underdogMult;
      }
    }
  }
  const hLambda = Math.max(0.15, hLambdaBase + (Math.random() - 0.5) * 0.22);
  const aLambda = Math.max(0.15, aLambdaBase + (Math.random() - 0.5) * 0.22);

  // Simulação em 2 tempos — necessária para o "Preparador mental" (t2.mental.psicologo):
  // se ao fim do 1º tempo o jogador está perdendo por 2+, ganha +λ ATA no 2º tempo.
  const hL1 = Math.max(0.09, hLambda / 2);
  const aL1 = Math.max(0.09, aLambda / 2);
  const h1 = poisson(hL1);
  const a1 = poisson(aL1);
  let hL2 = Math.max(0.09, hLambda / 2);
  let aL2 = Math.max(0.09, aLambda / 2);
  if (hasPlayer && coach.losingComebackLambda > 0) {
    if (playerIsHome && (a1 - h1) >= 2) hL2 += coach.losingComebackLambda;
    if (playerIsAway && (h1 - a1) >= 2) aL2 += coach.losingComebackLambda;
  }
  // Traço de 2º tempo (4-5-1): o time que ATACA sofre menos no segundo
  // tempo do adversário. Ex.: home é 4-5-1 → reduz aL2. Só aplica quando
  // temos squads/formação identificáveis.
  if (homeSquad && awaySquad) {
    const hT2 = homeTactics ?? deriveTacticsForSquad(homeSquad);
    const aT2 = awayTactics ?? deriveTacticsForSquad(awaySquad);
    const h2Ctx = contextualTrait(hT2.formation, { half: 2 });
    const a2Ctx = contextualTrait(aT2.formation, { half: 2 });
    aL2 = Math.max(0.05, aL2 + h2Ctx.lambdaDefAdd / 2);
    hL2 = Math.max(0.05, hL2 + a2Ctx.lambdaDefAdd / 2);
  }
  let hg = h1 + poisson(hL2);
  let ag = a1 + poisson(aL2);

  // Evita zebras com placar absurdo. Um time bem inferior ainda pode aprontar,
  // mas não faz sentido um 70 golear por 6x0 um 85 jogando fora.
  const adjusted = limitUnrealisticUpset(hg, ag, strengthGap);
  hg = adjusted.homeGoals;
  ag = adjusted.awayGoals;

  const scorers: { name: string; position: Player["position"]; team: "home" | "away" }[] = [];
  if (homeSquad) {
    for (let i = 0; i < hg; i++) scorers.push({ ...pickScorer(homeSquad), team: "home" });
  }
  if (awaySquad) {
    for (let i = 0; i < ag; i++) scorers.push({ ...pickScorer(awaySquad), team: "away" });
  }

  return {
    home: homeName,
    away: awayName,
    homeShort,
    awayShort,
    homeColor,
    awayColor,
    homeGoals: hg,
    awayGoals: ag,
    isPlayer,
    scorers,
    homeTacticsInfo,
    awayTacticsInfo,
  };
}


function limitUnrealisticUpset(
  homeGoals: number,
  awayGoals: number,
  strengthGap: number,
): { homeGoals: number; awayGoals: number } {
  const gap = Math.abs(strengthGap);
  if (gap < 5) return { homeGoals, awayGoals };
  const favoriteIsHome = strengthGap > 0;
  const favoriteGoals = favoriteIsHome ? homeGoals : awayGoals;
  const underdogGoals = favoriteIsHome ? awayGoals : homeGoals;
  if (underdogGoals <= favoriteGoals) return { homeGoals, awayGoals };

  // Margem máxima do azarão cai LINEARMENTE ponto a ponto: cada +1 de gap
  // acima de 5 tira 0,20 da margem. gap 5 → 3,0; gap 10 → 2,0; gap 15 → 1,0;
  // gap 20+ → 0. Como gols são inteiros, arredonda de forma estocástica pela
  // parte fracionária — assim gap 7 (margem 2,6) capa em 3 na maioria dos
  // jogos e em 2 numa parte, em vez de "5..9 igual, só muda no 10".
  const marginF = Math.max(0, 3 - (gap - 5) * 0.2);
  const base = Math.floor(marginF);
  const frac = marginF - base;
  const maxUpsetMargin = base + (Math.random() < frac ? 1 : 0);
  const cappedUnderdogGoals = Math.min(underdogGoals, favoriteGoals + maxUpsetMargin, 3);

  return favoriteIsHome
    ? { homeGoals: favoriteGoals, awayGoals: cappedUnderdogGoals }
    : { homeGoals: cappedUnderdogGoals, awayGoals: favoriteGoals };
}


function poisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  while (p > L && k < 8) {
    k++;
    p *= Math.random();
  }
  return k - 1 < 0 ? 0 : k - 1;
}

// Peso do artilheiro combina a POSIÇÃO/FUNÇÃO do jogador (centroavantes e
// pontas finalizam muito mais que volantes ou zagueiros — dados reais das
// principais ligas: CA ~35%, pontas ~30%, meias ~20%, volantes ~7%, laterais
// ~4%, zaga ~4%, goleiro <0,1%) com o OVR individual (Neymar 92 marca muito
// mais que um ATA 75 do mesmo time).
function pickScorer(squad: Player[]): { name: string; position: Player["position"] } {
  // Guarda contra elenco vazio/inválido (raro, mas evita crash na tela de
  // resultado quando um pool remoto vem sem players ou depois de filtros).
  const safeSquad = (squad ?? []).filter((p) => p && typeof p.name === "string");
  if (safeSquad.length === 0) return { name: "—", position: "ATA" };
  // Peso por FUNÇÃO específica (roles). Se o jogador tem múltiplas roles,
  // usamos a mais ofensiva — é onde ele tende a finalizar.
  const roleW: Record<string, number> = {
    CA: 6.0,
    PON_D: 4.2, PON_E: 4.2,
    MEC: 3.0,
    MEI: 2.0,
    VOL: 0.9,
    LAT_D: 0.55, LAT_E: 0.55,
    ZAG: 0.45,
    GOL: 0.02,
  };
  // Fallback pela posição bruta (caso o jogador não tenha roles definidas).
  const posFallback: Record<Player["position"], number> = {
    ATA: 5.0, MEI: 2.0, ZAG: 0.45, GOL: 0.02,
  };
  const posW = (p: Player): number => {
    // 1) Se o técnico escalou o jogador numa função específica, é ELA que
    //    vale — Ronaldinho escalado como PON_D finaliza como ponta, se
    //    escalado como MEC finaliza como meia-atacante.
    if (p.activeRole) {
      const w = roleW[p.activeRole as string];
      if (w !== undefined) return w;
    }
    // 2) Sem activeRole (ex.: elenco adversário sem escalação nossa): usa
    //    a função mais ofensiva das roles declaradas.
    if (p.roles && p.roles.length > 0) {
      let best = 0;
      for (const r of p.roles) {
        const w = roleW[r as string];
        if (w !== undefined && w > best) best = w;
      }
      if (best > 0) return best;
    }
    // 3) Fallback pela posição bruta.
    return posFallback[p.position] ?? 0.5;
  };
  const weights = safeSquad.map((p) => posW(p) * Math.pow(Math.max(50, p.overall || 70) / 75, 2.2));
  const total = weights.reduce((a, b) => a + b, 0);
  if (!(total > 0)) {
    const fallback = safeSquad[0];
    return { name: fallback.name, position: fallback.position };
  }
  let r = Math.random() * total;
  for (let i = 0; i < safeSquad.length; i++) {
    r -= weights[i];
    if (r <= 0) return { name: safeSquad[i].name, position: safeSquad[i].position };
  }
  const last = safeSquad[safeSquad.length - 1];
  return { name: last.name, position: last.position };
}

// Quantos times a "Série A" tem, contando o jogador. Real: 20.
export const LEAGUE_SIZE = 20;

// Sorteio realista da Série A: em vez de escolher por peso, simulamos uma
// "temporada de qualificação" onde TODOS os times jogam entre si um jogo,
// e os 19 melhores em pontos se juntam ao jogador. Times fortes têm muito
// mais chance de subir, mas um time fraco pode dar sorte num ano e
// aparecer — igual à vida real (Série B/C que sobe surpreendendo).
export function pickLeagueTeams(): string[] {
  const opponents = LEAGUE_SIZE - 1;
  const teamAvg = (t: (typeof TEAMS)[number]) =>
    t.players.reduce((s, p) => s + p.overall, 0) / Math.max(1, t.players.length);
  // "Forma" da temporada: cada time recebe um ajuste de OVR (±5,5),
  // simulando um ano bom ou ruim. Calibrado para que o Palmeiras (maior
  // OVR) fique em torno de ~95% de chance de qualificar, com os outros
  // gigantes logo abaixo (Flamengo ~93%, Botafogo ~90%), preservando
  // zebras raras mas mantendo a hierarquia real do futebol brasileiro.
  const pool = TEAMS.map((t) => ({
    id: t.id,
    ovr: teamAvg(t) + (Math.random() - 0.5) * 11,
    pts: 0,
    sg: 0,
  }));

  // Round-robin único (cada dupla joga 1x). Ruído maior por jogo pra que
  // azarões consigam pontos suficientes ao longo dos ~19 jogos.
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      const a = pool[i], b = pool[j];
      const diff = Math.max(-30, Math.min(30, a.ovr - b.ovr));
      const aL = Math.max(0.3, 1.4 + diff * 0.045 + (Math.random() - 0.5) * 0.55);
      const bL = Math.max(0.3, 1.4 - diff * 0.045 + (Math.random() - 0.5) * 0.55);
      const ag = poisson(aL);
      const bg = poisson(bL);
      a.sg += ag - bg; b.sg += bg - ag;
      if (ag > bg) a.pts += 3;
      else if (bg > ag) b.pts += 3;
      else { a.pts += 1; b.pts += 1; }
    }
  }

  // Classificação REAL: pontos → saldo de gols → aleatório (sem usar OVR
  // como desempate, senão os fortes sempre passam). Assim, quem empatar
  // em pontos com um grande realmente pode tomar a vaga.
  pool.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.sg !== a.sg) return b.sg - a.sg;
    return Math.random() - 0.5;
  });
  return pool.slice(0, opponents).map((t) => t.id);
}



export function buildInitialTable(playerTeamName: string, teamIds?: string[]): TableRow[] {
  const activeIds = teamIds ?? TEAMS.map((t) => t.id);
  const rows: TableRow[] = TEAMS
    .filter((t) => activeIds.includes(t.id))
    .map((t) => ({
      teamId: t.id,
      name: t.name,
      short: t.short,
      color: t.color,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      gf: 0,
      ga: 0,
      points: 0,
    }));
  rows.push({
    teamId: "PLAYER",
    name: playerTeamName,
    short: playerShortFromName(playerTeamName),
    color: "#facc15",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    gf: 0,
    ga: 0,
    points: 0,
    isPlayer: true,
  });
  return rows;
}


export function sortTable(rows: TableRow[]): TableRow[] {
  // Regra oficial CBF: pontos → vitórias → saldo de gols → gols pró.
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    const sd = (b.gf - b.ga) - (a.gf - a.ga);
    if (sd !== 0) return sd;
    return b.gf - a.gf;
  });
}

export function updateTable(
  rows: TableRow[],
  homeId: string,
  awayId: string,
  hg: number,
  ag: number,
): TableRow[] {
  return rows.map((r) => {
    if (r.teamId === homeId) {
      return {
        ...r,
        played: r.played + 1,
        wins: r.wins + (hg > ag ? 1 : 0),
        draws: r.draws + (hg === ag ? 1 : 0),
        losses: r.losses + (hg < ag ? 1 : 0),
        gf: r.gf + hg,
        ga: r.ga + ag,
        points: r.points + (hg > ag ? 3 : hg === ag ? 1 : 0),
      };
    }
    if (r.teamId === awayId) {
      return {
        ...r,
        played: r.played + 1,
        wins: r.wins + (ag > hg ? 1 : 0),
        draws: r.draws + (ag === hg ? 1 : 0),
        losses: r.losses + (ag < hg ? 1 : 0),
        gf: r.gf + ag,
        ga: r.ga + hg,
        points: r.points + (ag > hg ? 3 : ag === hg ? 1 : 0),
      };
    }
    return r;
  });
}

// Calendário: cada rodada o jogador enfrenta um time
export function buildFixtures(): { opponentId: string; home: boolean }[] {
  const opps = TEAMS.map((t) => t.id);
  for (let i = opps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opps[i], opps[j]] = [opps[j], opps[i]];
  }
  return opps.map((id, i) => ({ opponentId: id, home: i % 2 === 0 }));
}

// Round-robin completo (método do círculo). Retorna o calendário do jogador
// (adversário e mando por rodada) e o cronograma de todos os jogos por rodada,
// garantindo que cada time jogue no máximo uma vez em cada rodada — assim os
// pontos e a classificação ficam justos e consistentes.
export function buildSchedule(teamIds?: string[]): {
  fixtures: { opponentId: string; home: boolean }[];
  schedule: { home: string; away: string }[][];
} {
  const others = (teamIds ?? TEAMS.map((t) => t.id)).slice();
  // embaralha para variar temporadas
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  const teams = ["PLAYER", ...others];
  // Se o número total for ímpar, adicionamos "BYE" para deixar par;
  // uma equipe (nunca o jogador) descansa a cada rodada.
  if (teams.length % 2 === 1) teams.push("BYE");
  const n = teams.length;
  const rounds = n - 1;
  const half = n / 2;
  // mantém o jogador (índice 0) fixo e roda os demais
  const rotating = teams.slice(1);

  const schedule: { home: string; away: string }[][] = [];
  const fixtures: { opponentId: string; home: boolean }[] = [];

  // Turno: gera as rodadas do primeiro turno.
  const turno: { home: string; away: string }[][] = [];
  for (let r = 0; r < rounds; r++) {
    const arrangement = [teams[0], ...rotating];
    const round: { home: string; away: string }[] = [];
    for (let i = 0; i < half; i++) {
      const a = arrangement[i];
      const b = arrangement[n - 1 - i];
      if (a === "BYE" || b === "BYE") continue;
      // alterna mando de campo para equilibrar casa/fora ao longo da temporada
      const swap = (r + i) % 2 === 1;
      const home = swap ? b : a;
      const away = swap ? a : b;
      round.push({ home, away });
    }
    turno.push(round);
    // rotação do círculo: último passa para o começo
    rotating.unshift(rotating.pop()!);
  }

  // Returno: mesmas partidas, mandos invertidos (cada dupla joga ida e volta).
  const returno = turno.map((round) => round.map((m) => ({ home: m.away, away: m.home })));

  const allRounds = [...turno, ...returno];
  for (const round of allRounds) {
    schedule.push(round);
    for (const m of round) {
      if (m.home === "PLAYER") fixtures.push({ opponentId: m.away, home: true });
      else if (m.away === "PLAYER") fixtures.push({ opponentId: m.home, home: false });
    }
  }
  return { fixtures, schedule };
}

// Simula os jogos "dos outros" de uma rodada. Se `pairs` for fornecido,
// respeita o cronograma round-robin (cada time joga exatamente uma vez).
// Caso contrário, cai no antigo pareamento aleatório excluindo `excludeId`
// (mantido para saves antigos sem `schedule`).
export function simulateOtherMatches(
  rows: TableRow[],
  excludeIdOrPairs?: string | { home: string; away: string }[],
  ovrBuff: number = 0,
  varianceCtx?: { teamName?: string; season?: number },
): TableRow[] {
  let pairs: { home: string; away: string }[];
  if (Array.isArray(excludeIdOrPairs)) {
    pairs = excludeIdOrPairs.filter((p) => p.home !== "PLAYER" && p.away !== "PLAYER");
  } else {
    const excludeId = excludeIdOrPairs;
    const others = TEAMS.map((t) => t.id).filter((id) => id !== excludeId);
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }
    pairs = [];
    for (let i = 0; i + 1 < others.length; i += 2) {
      pairs.push({ home: others[i], away: others[i + 1] });
    }
  }
  const seed = varianceCtx ? varianceSeed(varianceCtx) : null;
  const seasonBuff = seasonGlobalBuff(varianceCtx?.season);
  const applyVariance = (teamName: string, players: Player[]) => {
    if (!seed) return players;
    const delta = teamOvrDelta(seed, teamName) + seasonBuff;
    return delta ? applyOvrDelta(players, delta) : players;
  };
  const buff = (players: Player[]) =>
    ovrBuff > 0
      ? players.map((p) => ({ ...p, overall: Math.min(99, p.overall + ovrBuff) }))
      : players;
  let updated = rows;
  for (const { home: homeId, away: awayId } of pairs) {
    const homeTeam = TEAMS.find((t) => t.id === homeId);
    const awayTeam = TEAMS.find((t) => t.id === awayId);
    if (!homeTeam || !awayTeam) continue;
    const homePlayers = buff(applyVariance(homeTeam.name, homeTeam.players));
    const awayPlayers = buff(applyVariance(awayTeam.name, awayTeam.players));
    const r = simulateMatch(
      homeTeam.name,
      homeTeam.short,
      homeTeam.color,
      teamOverall(homePlayers),
      awayTeam.name,
      awayTeam.short,
      awayTeam.color,
      teamOverall(awayPlayers),
      false,
      homePlayers,
      awayPlayers,
    );
    updated = updateTable(updated, homeId, awayId, r.homeGoals, r.awayGoals);
  }
  return updated;
}

export function findTeam(id: string): Team | undefined {
  return TEAMS.find((t) => t.id === id);
}

export function knockoutMatch(
  playerName: string,
  playerOvr: number,
  playerSquad: Player[],
  rival: IntlTeam,
  playerTactics?: TeamTactics,
): MatchResult {
  return simulateMatch(
    playerName,
    playerShortFromName(playerName),
    "#facc15",
    playerOvr,
    rival.name,
    rival.short,
    rival.color,
    rival.overall,
    true,
    playerSquad,
    rival.players,
    playerTactics,
  );
}

