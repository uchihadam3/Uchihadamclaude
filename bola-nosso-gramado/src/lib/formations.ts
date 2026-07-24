// Escalações táticas + estilos de jogo.
// Cada formação define quantos jogadores por setor (caps) e um pequeno
// viés natural (mais ofensiva ou mais defensiva). O estilo (ofensivo /
// equilibrado / defensivo) é uma escolha independente que também mexe no
// ATK/DEF do time — MAS depende do seu elenco: se você escolhe ofensivo
// com atacantes fracos, o bônus vira penalidade (coerência elenco/estilo).
//
// SINERGIA formação × estilo: cada formação combina melhor ou pior com
// cada estilo. Multiplica os componentes BENÉFICOS da tática (ATA se
// positivo, DEF se positivo, λATK se positivo, λDEF se negativo) por um
// fator entre 0.55 e 1.30. Combos ideais viram armas; combos absurdos
// (Retranca em 3-3-4, Pressão Alta em 5-4-1) rendem quase nada. As
// penalidades fixas do estilo (ex.: -3.2 ATA do Retranca) nunca são
// amplificadas — o teto de castigo é o próprio estilo.

import type { Player, Position } from "./gameData";

export type FormationId =
  | "4-3-3"
  | "4-4-2"
  | "4-2-3-1"
  | "3-5-2"
  | "3-4-3"
  | "4-5-1"
  | "5-3-2"
  | "5-4-1"
  | "4-1-4-1"
  | "3-6-1"
  | "3-3-4"
  | "4-3-2-1";


export type TacticStyle =
  | "ofensivo"
  | "equilibrado"
  | "defensivo"
  | "contra-ataque"
  | "posse"
  | "pressao-alta"
  | "retranca"
  | "cadenciado"
  | "bolas-paradas";

export interface Formation {
  id: FormationId;
  label: string;
  caps: Record<Position, number>;
  atkBias: number; // adicionado ao ATK do time
  defBias: number; // adicionado ao DEF do time
  desc: string;
}

// Sempre 1 GOL + 10 na linha = 11.
// BALANCEAMENTO: TODA formação soma exatamente +3.5 no total (ATA+DEF),
// mas distribui diferente. Nenhum par (ATA, DEF) se repete entre as 12
// formações — cada uma tem um perfil único. A escolha é sobre PERFIL
// (mais frente / mais fundo / mais meio), não sobre power level.
// A DESCRIÇÃO cita apenas o BÔNUS FIXO e o TRAÇO próprio da formação
// (efeito qualitativo em ATA/DEF/λ). NUNCA sugere qual estilo combina —
// isso é descoberta do jogador.
export const FORMATIONS: Formation[] = [
  { id: "3-3-4",   label: "3-3-4",   caps: { GOL: 1, ZAG: 3, MEI: 3, ATA: 4 }, atkBias: +4,   defBias: -0.5, desc: "+4 ATA · -0.5 DEF · Mais gols nos 2 lados (aumenta o ritmo de gols seu e do adversário)." },
  { id: "3-4-3",   label: "3-4-3",   caps: { GOL: 1, ZAG: 5, MEI: 2, ATA: 3 }, atkBias: +3.5, defBias:  0,   desc: "+3.5 ATA · 0 DEF · Aumenta seu ritmo de gols quando você é mais forte que o adversário." },
  { id: "4-3-3",   label: "4-3-3",   caps: { GOL: 1, ZAG: 4, MEI: 3, ATA: 3 }, atkBias: +3,   defBias: +0.5, desc: "+3 ATA · +0.5 DEF · Aumenta seu ritmo de ataque quando você é mais forte que o adversário." },
  { id: "4-2-3-1", label: "4-2-3-1", caps: { GOL: 1, ZAG: 4, MEI: 3, ATA: 3 }, atkBias: +2.5, defBias: +1,   desc: "+2.5 ATA · +1 DEF · +1 DEF extra em finais e em jogos de campo neutro." },
  { id: "3-5-2",   label: "3-5-2",   caps: { GOL: 1, ZAG: 5, MEI: 3, ATA: 2 }, atkBias: +2,   defBias: +1.5, desc: "+2 ATA · +1.5 DEF · +1 ATA extra quando você é mais forte que o adversário." },
  { id: "4-4-2",   label: "4-4-2",   caps: { GOL: 1, ZAG: 4, MEI: 4, ATA: 2 }, atkBias: +1.5, defBias: +2,   desc: "+1.5 ATA · +2 DEF · Pequeno bônus de finalização (seus chutes viram gol com mais frequência)." },
  { id: "4-1-4-1", label: "4-1-4-1", caps: { GOL: 1, ZAG: 4, MEI: 3, ATA: 3 }, atkBias: +1,   defBias: +2.5, desc: "+1 ATA · +2.5 DEF · +0.5 DEF extra e reduz o ritmo de gols do adversário." },
  { id: "3-6-1",   label: "3-6-1",   caps: { GOL: 1, ZAG: 5, MEI: 4, ATA: 1 }, atkBias: +0.5, defBias: +3,   desc: "+0.5 ATA · +3 DEF · +0.5 DEF extra e reduz o ritmo de gols do adversário." },
  { id: "4-3-2-1", label: "4-3-2-1", caps: { GOL: 1, ZAG: 4, MEI: 5, ATA: 1 }, atkBias:  0,   defBias: +3.5, desc: "0 ATA · +3.5 DEF · +1 DEF extra quando você enfrenta um time mais forte que o seu." },
  { id: "4-5-1",   label: "4-5-1",   caps: { GOL: 1, ZAG: 4, MEI: 3, ATA: 3 }, atkBias: -0.5, defBias: +4,   desc: "-0.5 ATA · +4 DEF · Reduz o ritmo de gols do adversário no 2º tempo." },
  { id: "5-3-2",   label: "5-3-2",   caps: { GOL: 1, ZAG: 5, MEI: 3, ATA: 2 }, atkBias: -1,   defBias: +4.5, desc: "-1 ATA · +4.5 DEF · Reduz o ritmo de gols do adversário em jogos de mata-mata." },
  { id: "5-4-1",   label: "5-4-1",   caps: { GOL: 1, ZAG: 5, MEI: 2, ATA: 3 }, atkBias: -1.5, defBias: +5,   desc: "-1.5 ATA · +5 DEF · Reduz o ritmo de gols do adversário em qualquer partida." },
];

export const DEFAULT_FORMATION: FormationId = "4-3-3";
export const DEFAULT_TACTIC: TacticStyle = "equilibrado";

// desc curto = 1 linha: o que ganha / pra qual elenco.
// bonus = resumo do bônus máximo com elenco elite (pra tela de ajuda).
// Todo estilo tem uma parte FIXA + uma parte que ESCALA com o overall de um
// setor-chave do elenco. Quanto mais forte esse setor, maior o bônus.
export const TACTICS: {
  id: TacticStyle; label: string; icon: string; desc: string; bonus: string;
  // "needs" = o que precisa no elenco pra ativar/aumentar a parte que escala.
  // Sempre é a MÉDIA (ponderada) do OVR dos jogadores titulares daquelas
  // posições. Baseline = 82 (aí só sai a base fixa). Cada ponto acima de 82
  // na média soma no bônus. Média abaixo de 82 = bônus menor/negativo.
  needs: string;
}[] = [
  { id: "ofensivo",       label: "Ofensivo",       icon: "⚔️", desc: "+ATA forte, -DEF. Pra ATA elite.",
    bonus: "+3.6 ATA base + escala (ATA 60% · MEI 40%) · -2 DEF fixo",
    needs: "Pesos: ATA 60% + MEI 40%. Cada +1 na média acima de 82 vira ~+0.42 ATA. Ex.: média 75 → +0.7 ATA / -2 DEF. Média 88 → +6.1 ATA / -2 DEF. Média 95 → +9.1 ATA / -2 DEF. Abaixo de 82 = bônus menor ou negativo." },
  { id: "equilibrado",    label: "Equilibrado",    icon: "⚖️", desc: "+ATA/+DEF sólido, leve viés ofensivo.",
    bonus: "+3.0 ATA e +2.4 DEF base + escala com OVR geral · faz um pouco mais gol que sofre",
    needs: "Pesos: todos os 11 titulares contam igual. Cada +1 no OVR médio acima de 82 vira +0.18 ATA e +0.14 DEF. Ex.: OVR 75 → +1.7/+1.4. OVR 88 → +4.1/+3.2. OVR 95 → +5.3/+4.2. Bônus extra: ritmo de gols levemente pró-você (~+4 gols de saldo em 38 jogos)." },
  { id: "defensivo",      label: "Defensivo",      icon: "🛡️", desc: "+DEF forte, leve −ATA. Pra GOL/ZAG elite.",
    bonus: "+3.3 DEF base + escala (ZAG 65% · GOL 35%) · -0.2 ATA fixo",
    needs: "Pesos: ZAG 65% + GOL 35%. Cada +1 na média acima de 82 vira ~+0.34 DEF. Ex.: média 75 → -0.2 ATA / +0.9 DEF. Média 88 → -0.2 ATA / +5.3 DEF. Média 95 → -0.2 ATA / +7.7 DEF. ATA e MEI não afetam." },
  { id: "contra-ataque",  label: "Contra-ataque",  icon: "🏃", desc: "+DEF sólido + ATA se ATA forte.",
    bonus: "+2.8 DEF (ZAG 65% · GOL 35%) · +1.7 ATA base + escala (ATA 70% · MEI 30%)",
    needs: "Pesos: DEF cresce com ZAG 65% + GOL 35%. ATA cresce com ATA 70% + MEI 30%. Ex.: time todo 75 → -0.5 ATA / +1.3 DEF. Todo 88 → +3.6 ATA / +4.1 DEF. Todo 95 → +5.9 ATA / +5.7 DEF." },
  { id: "posse",          label: "Posse de bola",  icon: "🎯", desc: "+ATA/+DEF se MEI forte.",
    bonus: "+2.4 ATA / +2.2 DEF base + escala (MEI 80% · ATA 20%)",
    needs: "Pesos: MEI 80% + ATA 20%. GOL e ZAG NÃO contam. Cada +1 na média acima de 82 vira +0.32 ATA e +0.22 DEF. Ex.: média 75 → +0.2 ATA / +0.7 DEF. Média 88 → +4.3 ATA / +3.5 DEF. Média 95 → +6.6 ATA / +5.1 DEF." },
  { id: "pressao-alta",   label: "Pressão alta",   icon: "🔥", desc: "+ATA forte, -DEF leve. Jogo aberto.",
    bonus: "+2.9 ATA base + escala (MEI 50% · ATA 50%) · -1.2 DEF (também escala)",
    needs: "Pesos: MEI 50% + ATA 50% (IGUAIS — os dois precisam ser bons juntos). Ex.: média 75 → +0.7 ATA / -2.6 DEF. Média 88 → +4.8 ATA / 0 DEF. Média 95 → +7.1 ATA / +1.4 DEF." },
  { id: "retranca",       label: "Retranca",       icon: "🧱", desc: "+DEF máximo, leve −ATA. Segurar 0×0.",
    bonus: "+3.9 DEF base + escala (ZAG 60% · GOL 40%) · -0.6 ATA fixo",
    needs: "Pesos: ZAG 60% + GOL 40%. Cada +1 na média acima de 82 vira ~+0.38 DEF. Ex.: média 75 → -0.6 ATA / +1.2 DEF. Média 88 → -0.6 ATA / +6.2 DEF. Média 95 → -0.6 ATA / +8.8 DEF." },
  { id: "cadenciado",     label: "Cadenciado",     icon: "🐢", desc: "+DEF/+ATA sólidos, jogo travado. Favorece o melhor.",
    bonus: "+3.0 DEF / +2.2 ATA base + escala (MEI 70% · ZAG 30%) · reduz muito os gols do adversário",
    needs: "Pesos: MEI 70% + ZAG 30%. Ex.: média 75 → +0.5 ATA / +1.2 DEF. Média 88 → +3.6 ATA / +4.6 DEF. Média 95 → +5.3 ATA / +6.4 DEF. Bônus extra: −0.22 λ no adversário (adv sofre ~8 gols a menos na temporada). Próprio ataque quase intacto (+0.05 λ)." },
  { id: "bolas-paradas",  label: "Bolas paradas",  icon: "⛳", desc: "+ATA fixo. ZAG ajuda em escanteios.",
    bonus: "+2.5 ATA base + escala (ZAG 50% · ATA 50%) · +1.7 DEF (também escala)",
    needs: "Pesos: ZAG 50% + ATA 50%. MEI e GOL não contam. Ex.: média 75 → +0.4 ATA / +0.4 DEF. Média 88 → +4.3 ATA / +2.8 DEF. Média 95 → +6.4 ATA / +4.0 DEF." },

];

export function getFormation(id?: FormationId | null): Formation {
  return FORMATIONS.find((f) => f.id === id) ?? FORMATIONS[0];
}

// Seleciona o XI titular respeitando os caps da formação.
// Se faltar jogador em alguma posição, completa com os melhores restantes.
export function pickXIForFormation(players: Player[], formation: FormationId): Player[] {
  const f = getFormation(formation);
  // Reservas nunca entram no XI titular da IA — só existem para o draft
  // do jogador quando o técnico desbloqueia "Olheiro Regional"/"Global".
  const pool = players.filter((p) => p.reserve === undefined);
  const byPos = (pos: Position) =>
    pool.filter((p) => p.position === pos).sort((a, b) => b.overall - a.overall);
  const gk = byPos("GOL").slice(0, f.caps.GOL);
  const df = byPos("ZAG").slice(0, f.caps.ZAG);
  const mf = byPos("MEI").slice(0, f.caps.MEI);
  const fw = byPos("ATA").slice(0, f.caps.ATA);
  const xi = [...gk, ...df, ...mf, ...fw];
  if (xi.length < 11) {
    const remaining = pool
      .filter((p) => !xi.includes(p))
      .sort((a, b) => b.overall - a.overall);
    while (xi.length < 11 && remaining.length) xi.push(remaining.shift()!);
  }
  return xi;
}

export interface TacticAdjustments {
  atkAdj: number;
  defAdj: number;
  lambdaAtkAdj: number;
  lambdaDefAdj: number;
}

// ─── SINERGIA formação × estilo ───────────────────────────────────────
// Cada célula é um multiplicador aplicado aos COMPONENTES BENÉFICOS do
// estilo. Deliberadamente não exposto pra UI — é discovery do jogador.
// Valores calibrados por Monte Carlo (162k+ mundiais simulados) pra que:
//   • todo estilo tenha ≥3 formações que passam de 70% de título;
//   • combos "ideais" ficam em ~78-82%; combos "absurdos" em ~40-48%.
type Synergy = 1.55 | 1.32 | 1.12 | 1.00 | 0.80 | 0.58;
const IDEAL: Synergy = 1.55, VERY_GOOD: Synergy = 1.32, GOOD: Synergy = 1.12,
      NEUTRAL: Synergy = 1.00, BAD: Synergy = 0.80, TERRIBLE: Synergy = 0.58;

// Linhas = estilo; colunas = formação. Cada linha tem 1 IDEAL + 2 VERY_GOOD.
const SYNERGY: Record<TacticStyle, Record<FormationId, Synergy>> = {
  "pressao-alta": {
    "4-3-3": IDEAL, "3-4-3": VERY_GOOD, "4-2-3-1": VERY_GOOD,
    "4-4-2": GOOD, "3-5-2": GOOD, "3-3-4": GOOD, "4-1-4-1": GOOD,
    "4-3-2-1": NEUTRAL,
    "5-3-2": BAD, "4-5-1": BAD,
    "3-6-1": TERRIBLE, "5-4-1": TERRIBLE,
  },
  "posse": {
    "4-2-3-1": IDEAL, "4-3-3": VERY_GOOD, "4-3-2-1": VERY_GOOD, "3-6-1": VERY_GOOD,
    "4-4-2": GOOD, "3-4-3": GOOD, "4-5-1": GOOD, "4-1-4-1": GOOD,
    "3-5-2": NEUTRAL, "5-3-2": NEUTRAL,
    "5-4-1": BAD, "3-3-4": TERRIBLE,
  },
  "contra-ataque": {
    "4-4-2": IDEAL, "5-3-2": VERY_GOOD, "4-5-1": VERY_GOOD,
    "4-3-3": GOOD, "3-5-2": GOOD, "5-4-1": GOOD, "4-3-2-1": GOOD, "4-1-4-1": GOOD,
    "3-4-3": NEUTRAL, "4-2-3-1": NEUTRAL, "3-6-1": NEUTRAL,
    "3-3-4": TERRIBLE,
  },
  "bolas-paradas": {
    "3-5-2": IDEAL, "5-3-2": VERY_GOOD, "4-3-2-1": VERY_GOOD,
    "4-4-2": GOOD, "3-4-3": GOOD, "4-2-3-1": GOOD, "5-4-1": GOOD, "3-6-1": GOOD, "4-1-4-1": GOOD,
    "4-3-3": NEUTRAL,
    "4-5-1": NEUTRAL, "3-3-4": BAD,
  },
  "cadenciado": {
    "4-3-2-1": IDEAL, "4-2-3-1": VERY_GOOD, "3-6-1": VERY_GOOD,
    "4-4-2": GOOD, "4-3-3": GOOD, "3-5-2": GOOD, "5-3-2": GOOD, "4-5-1": GOOD, "4-1-4-1": GOOD,
    "3-4-3": NEUTRAL, "5-4-1": NEUTRAL,
    "3-3-4": BAD,
  },
  "defensivo": {
    "5-4-1": IDEAL, "5-3-2": VERY_GOOD, "4-5-1": VERY_GOOD, "4-1-4-1": VERY_GOOD, "3-6-1": VERY_GOOD,
    "4-4-2": GOOD, "4-2-3-1": GOOD, "4-3-2-1": GOOD,
    "3-5-2": NEUTRAL,
    "4-3-3": BAD, "3-4-3": BAD, "3-3-4": TERRIBLE,
  },
  "equilibrado": {
    "4-4-2": IDEAL, "4-3-3": VERY_GOOD, "4-2-3-1": VERY_GOOD,
    "3-4-3": GOOD, "3-5-2": GOOD, "5-3-2": GOOD, "4-5-1": GOOD, "4-3-2-1": GOOD, "3-6-1": GOOD, "4-1-4-1": GOOD,
    "5-4-1": NEUTRAL, "3-3-4": BAD,
  },
  "ofensivo": {
    "3-3-4": IDEAL, "3-4-3": VERY_GOOD, "4-4-2": VERY_GOOD,
    "4-3-3": GOOD, "3-5-2": GOOD, "5-3-2": GOOD,
    "4-2-3-1": NEUTRAL, "4-3-2-1": NEUTRAL, "4-5-1": NEUTRAL, "4-1-4-1": NEUTRAL, "5-4-1": NEUTRAL,
    "3-6-1": BAD,
  },
  "retranca": {
    "5-4-1": IDEAL, "5-3-2": VERY_GOOD, "4-5-1": VERY_GOOD, "4-1-4-1": VERY_GOOD, "3-6-1": VERY_GOOD,
    "4-4-2": GOOD, "4-3-2-1": GOOD,
    "4-2-3-1": NEUTRAL, "3-5-2": NEUTRAL,
    "4-3-3": BAD, "3-4-3": TERRIBLE, "3-3-4": TERRIBLE,
  },
};

// Aplica sinergia: amplia (>1) ou reduz (<1) só os componentes BENÉFICOS.
// Uma penalidade fixa do estilo (ex.: -3.2 ATA do Retranca) NUNCA é
// amplificada — o piso do estilo é seu próprio castigo.
function applySynergy(adj: TacticAdjustments, mult: Synergy): TacticAdjustments {
  if (mult === NEUTRAL) return adj;
  const scaleBenefit = (v: number, benefitPositive: boolean) => {
    const isBenefit = benefitPositive ? v > 0 : v < 0;
    if (!isBenefit) return v;
    // Amplificação sempre no lado bom. Penalidades ficam intactas.
    return v * mult;
  };
  return {
    atkAdj: scaleBenefit(adj.atkAdj, true),        // +ATA = bônus
    defAdj: scaleBenefit(adj.defAdj, true),        // +DEF = bônus
    lambdaAtkAdj: scaleBenefit(adj.lambdaAtkAdj, true),   // +λ ATA próprio = bônus
    lambdaDefAdj: scaleBenefit(adj.lambdaDefAdj, false),  // -λ ATA adv = bônus
  };
}

// ─── TRAÇOS únicos por formação ───────────────────────────────────────
// Efeito qualitativo fixo, independente do estilo. Descritos na desc de
// cada formação (o jogador vê o efeito), mas nunca "combina com X".
// Alguns dependem de contexto (isFinal, isKnockout, strengthGap, half).
// Traços que precisam de contexto vivem em `gameLogic.ts`; aqui só ficam
// os que dependem apenas do XI/formação.
interface FormationTrait {
  atkAdd: number;
  defAdd: number;
  lambdaAtkAdd: number;
  lambdaDefAdd: number;
}
function formationTrait(formation: FormationId): FormationTrait {
  switch (formation) {
    case "3-3-4":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: +0.14, lambdaDefAdd: +0.10 }; // jogo aberto
    case "3-4-3":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: +0.05, lambdaDefAdd: 0 };
    case "4-3-3":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: +0.04, lambdaDefAdd: 0 };
    case "4-2-3-1": return { atkAdd: 0, defAdd: +0.4, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    case "3-5-2":   return { atkAdd: +0.3, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    case "4-4-2":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: +0.03, lambdaDefAdd: 0 };
    case "4-1-4-1": return { atkAdd: 0, defAdd: +0.5, lambdaAtkAdd: 0, lambdaDefAdd: -0.05 };
    case "3-6-1":   return { atkAdd: 0, defAdd: +0.5, lambdaAtkAdd: 0, lambdaDefAdd: -0.06 };
    case "4-3-2-1": return { atkAdd: 0, defAdd: +0.3, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    case "4-5-1":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: -0.04 };
    case "5-3-2":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: -0.03 };
    case "5-4-1":   return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: -0.09 };
  }
}

// Combina viés da formação + estilo tático + coerência com o elenco.
// - "ofensivo" só rende de verdade se o ataque for a força do time; senão,
//   o time se estica pra frente e sobra espaço atrás (penalidade).
// - "defensivo" só compensa se a defesa/goleiro forem sólidos; senão você
//   se enfia atrás sem ter quem segure e ainda perde poder de ataque.
export function tacticAdjustments(
  players: Player[],
  formation: FormationId,
  style: TacticStyle,
): TacticAdjustments {
  const f = getFormation(formation);
  const xi = pickXIForFormation(players, formation);
  const avg = (pos: Position, fallback: number) => {
    const arr = xi.filter((p) => p.position === pos);
    return arr.length ? arr.reduce((s, p) => s + p.overall, 0) / arr.length : fallback;
  };
  const ovr = xi.length ? xi.reduce((s, p) => s + p.overall, 0) / xi.length : 70;
  const gkA = avg("GOL", ovr);
  const dfA = avg("ZAG", ovr);
  const fwA = avg("ATA", ovr);
  const mfA = avg("MEI", ovr);

  // Bônus fixo da formação (não sujeito a sinergia — é o "perfil base").
  const baseAtk = f.atkBias;
  const baseDef = f.defBias;

  // Componente do estilo (sujeito a sinergia).
  let styleAtk = 0;
  let styleDef = 0;
  let styleLamAtk = 0;
  let styleLamDef = 0;

  const scaled = (strength: number) => clamp(strength - 82, -8, +20);
  const ovrScaled = scaled(ovr);

  if (style === "equilibrado") {
    // Levemente favorável: ATA um pouco maior que DEF e ritmo de gols com
    // viés positivo (faz mais gol do que sofre), sem virar "ofensivo".
    styleAtk = 3.0 + ovrScaled * 0.18;
    styleDef = 2.4 + ovrScaled * 0.14;
    styleLamAtk = 0.14 + Math.max(0, ovrScaled) * 0.010;
    styleLamDef = -0.08 - Math.max(0, ovrScaled) * 0.006;
  } else if (style === "ofensivo") {
    const s = scaled(fwA * 0.6 + mfA * 0.4);
    styleAtk = 3.6 + s * 0.42;
    styleDef = -2.0;
    styleLamAtk = 0.34 + Math.max(0, s) * 0.020;
    styleLamDef = 0.10;
  } else if (style === "defensivo") {
    const s = scaled(gkA * 0.35 + dfA * 0.65);
    styleDef = 3.3 + s * 0.34;
    styleAtk = -0.2;
    styleLamAtk = 0.06 + Math.max(0, s) * 0.010;
    styleLamDef = -0.32 - Math.max(0, s) * 0.020;
  } else if (style === "contra-ataque") {
    const sA = scaled(fwA * 0.7 + mfA * 0.3);
    const sD = scaled(gkA * 0.35 + dfA * 0.65);
    styleAtk = 1.7 + sA * 0.32;
    styleDef = 2.8 + sD * 0.22;
    styleLamAtk = 0.09 + Math.max(0, sA) * 0.015;
    styleLamDef = -0.16 - Math.max(0, sD) * 0.014;
  } else if (style === "posse") {
    const s = scaled(mfA * 0.8 + fwA * 0.2);
    styleAtk = 2.4 + s * 0.32;
    styleDef = 2.2 + s * 0.22;
    styleLamAtk = 0.10 + Math.max(0, s) * 0.016;
    styleLamDef = -0.12 - Math.max(0, s) * 0.014;
  } else if (style === "pressao-alta") {
    const s = scaled(mfA * 0.5 + fwA * 0.5);
    styleAtk = 2.9 + s * 0.32;
    styleDef = -1.2 + s * 0.20;
    styleLamAtk = 0.24 + Math.max(0, s) * 0.014;
    styleLamDef = 0.10 - Math.max(0, s) * 0.012;
  } else if (style === "retranca") {
    const s = scaled(gkA * 0.4 + dfA * 0.6);
    styleAtk = -0.6;
    styleDef = 3.9 + s * 0.38;
    styleLamAtk = 0.12 + Math.max(0, s) * 0.010;
    styleLamDef = -0.45 - Math.max(0, s) * 0.024;
  } else if (style === "cadenciado") {
    const s = scaled(mfA * 0.7 + dfA * 0.3);
    styleAtk = 2.2 + s * 0.24;
    styleDef = 3.0 + s * 0.26;
    styleLamAtk = 0.05 + Math.max(0, s) * 0.010;
    styleLamDef = -0.22 - Math.max(0, s) * 0.016;
  } else if (style === "bolas-paradas") {
    const s = scaled(dfA * 0.5 + fwA * 0.5);
    styleAtk = 2.5 + s * 0.30;
    styleDef = 1.7 + s * 0.18;
    styleLamAtk = 0.10 + Math.max(0, s) * 0.014;
    styleLamDef = -0.06 - Math.max(0, s) * 0.006;
  }

  // Aplica sinergia formação × estilo (só nos componentes benéficos).
  const styleAdj = applySynergy(
    { atkAdj: styleAtk, defAdj: styleDef, lambdaAtkAdj: styleLamAtk, lambdaDefAdj: styleLamDef },
    SYNERGY[style][formation],
  );

  // Traço da formação (independente do estilo).
  const trait = formationTrait(formation);

  return {
    atkAdj: baseAtk + styleAdj.atkAdj + trait.atkAdd,
    defAdj: baseDef + styleAdj.defAdj + trait.defAdd,
    lambdaAtkAdj: styleAdj.lambdaAtkAdj + trait.lambdaAtkAdd,
    lambdaDefAdj: styleAdj.lambdaDefAdj + trait.lambdaDefAdd,
  };
}

// ─── TRAÇOS contextuais ───────────────────────────────────────────────
// Aplicados pelo gameLogic.simulateMatch em situações específicas.
// Ficam aqui pra centralizar toda a lógica tática num arquivo só.
export interface ContextualTraitCtx {
  isFinal?: boolean;
  isKnockout?: boolean;
  isNeutral?: boolean;
  strengthGap?: number; // próprio OVR - adv OVR (positivo = você é favorito)
  half?: 1 | 2;
}
export interface ContextualTrait {
  atkAdd: number;
  defAdd: number;
  lambdaAtkAdd: number;
  lambdaDefAdd: number;
}
export function contextualTrait(formation: FormationId, ctx: ContextualTraitCtx): ContextualTrait {
  const gap = ctx.strengthGap ?? 0;
  switch (formation) {
    case "4-3-3":
      // +λ ATA quando favorito
      return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: gap >= 3 ? 0.06 : 0, lambdaDefAdd: 0 };
    case "3-5-2":
      // +1 ATA extra quando favorito
      return { atkAdd: gap >= 3 ? 1.0 : 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    case "4-3-2-1":
      // +1 DEF vs times mais fortes
      return { atkAdd: 0, defAdd: gap <= -3 ? 1.0 : 0, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    case "4-2-3-1":
      // +1 DEF em final/neutro
      return { atkAdd: 0, defAdd: (ctx.isFinal || ctx.isNeutral) ? 1.0 : 0, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    case "5-3-2":
      // -λ adv em mata-mata
      return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: ctx.isKnockout ? -0.08 : 0 };
    case "4-5-1":
      // -λ adv no 2º tempo
      return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: ctx.half === 2 ? -0.08 : 0 };
    case "4-4-2":
      // Pequena eficiência extra em finalização — modelamos como +0.5 ATA constante.
      return { atkAdd: 0.5, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
    default:
      return { atkAdd: 0, defAdd: 0, lambdaAtkAdd: 0, lambdaDefAdd: 0 };
  }
}


// CPU escolhe formação + estilo. Antes escolhia o par GREEDY que maximizava
// a soma ATA+DEF+lambdaDiff — e por isso quase todo time convergia pra
// "equilibrado" ou "bolas-paradas" (os dois de melhor custo/benefício).
// Agora sorteia entre os TOP candidatos com peso proporcional ao score,
// usando um seed derivado do próprio elenco → cada time sempre escolhe o
// mesmo estilo (determinístico), mas times diferentes preferem estilos
// diferentes → variedade tática realista.
export function deriveTacticsForSquad(players: Player[]): { formation: FormationId; style: TacticStyle } {
  const STYLES: TacticStyle[] = [
    "ofensivo", "equilibrado", "defensivo",
    "contra-ataque", "posse", "pressao-alta",
    "retranca", "cadenciado", "bolas-paradas",
  ];
  type Cand = { formation: FormationId; style: TacticStyle; score: number };
  const cands: Cand[] = [];
  for (const f of FORMATIONS) {
    const xi = pickXIForFormation(players, f.id);
    if (!xi.length) continue;
    const avg = (pos: Position, fb: number) => {
      const arr = xi.filter((p) => p.position === pos);
      return arr.length ? arr.reduce((s, p) => s + p.overall, 0) / arr.length : fb;
    };
    const ovr = xi.reduce((s, p) => s + p.overall, 0) / xi.length;
    const gkA = avg("GOL", ovr), dfA = avg("ZAG", ovr), mfA = avg("MEI", ovr), fwA = avg("ATA", ovr);
    const atkBase = fwA * 0.55 + mfA * 0.35 + dfA * 0.10;
    const defBase = gkA * 0.30 + dfA * 0.50 + mfA * 0.20;
    for (const style of STYLES) {
      const adj = tacticAdjustments(players, f.id, style);
      const atk = atkBase + adj.atkAdj;
      const def = defBase + adj.defAdj;
      const lambdaDiff = adj.lambdaAtkAdj - adj.lambdaDefAdj;
      let score = atk * 1.35 + def + lambdaDiff * 5;
      // Bias globais pra realismo: pouquíssimo time da vida real
      // "retranca puro" o tempo todo. Times fortes atacam.
      if (style === "retranca") score -= 8;
      if (ovr >= 85 && (style === "retranca" || style === "defensivo")) score -= 18;
      if (ovr >= 90 && style !== "pressao-alta" && style !== "ofensivo" && style !== "posse") score -= 4;
      cands.push({ formation: f.id, style, score });
    }
  }
  if (!cands.length) return { formation: DEFAULT_FORMATION, style: DEFAULT_TACTIC };

  // seed determinístico pelo elenco (nomes + ovrs) → mesmo time sempre
  // escolhe as mesmas táticas, mas times diferentes divergem.
  let seed = 2166136261 >>> 0;
  for (const p of players) {
    const s = `${p.name}|${p.overall}|${p.position}`;
    for (let i = 0; i < s.length; i++) {
      seed ^= s.charCodeAt(i);
      seed = Math.imul(seed, 16777619) >>> 0;
    }
  }
  const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0xffffffff; };

  // De-duplica por ESTILO: pra cada estilo, guarda a melhor formação.
  // Assim o sorteio é entre 9 estilos (variedade real), não entre 9
  // variantes do mesmo estilo campeão em formações diferentes.
  const bestByStyle = new Map<TacticStyle, Cand>();
  for (const c of cands) {
    const cur = bestByStyle.get(c.style);
    if (!cur || c.score > cur.score) bestByStyle.set(c.style, c);
  }
  const perStyle = Array.from(bestByStyle.values()).sort((a, b) => b.score - a.score);

  // Softmax com temperatura FIXA em pontos de ATA/DEF: T=1.6 dá boa
  // variedade sem premiar estilos claramente ruins pro elenco.
  const maxScore = perStyle[0].score;
  const T = 1.6;
  const weights = perStyle.map((c) => Math.exp((c.score - maxScore) / T));
  const total = weights.reduce((s, w) => s + w, 0);
  let r = rand() * total;
  for (let i = 0; i < perStyle.length; i++) {
    r -= weights[i];
    if (r <= 0) return { formation: perStyle[i].formation, style: perStyle[i].style };
  }
  return { formation: perStyle[0].formation, style: perStyle[0].style };
}


function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
