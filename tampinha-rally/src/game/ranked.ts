// MODO RANQUEADA — a escada competitiva: 5 TIERS (Normal→Místico), 8 competições
// cada (40 no total). Sem oficina e sem starter: você escolhe qualquer tampinha
// SUA já desbloqueada cuja raridade caiba no tier (no Raro vale comum+rara, e
// assim por diante). Pódio libera a próxima. Os rivais usam tampinhas da raridade
// do tier e vão ficando MAIS FORTES a cada competição (até ~+45% na 8ª). Cada
// corrida vale pontos por posição; o MELHOR total de cada competição fica salvo e
// a soma vai pro RANKING MUNDIAL (nome único). Ouro nas 8 do tier = exclusiva.
import { CapStats } from '../engine/core';
import { SKINS, Skin, rarityIndex, unlockedSkins } from './skins';
import { save } from './save';

export interface RankTier { key: string; name: string; ico: string; col: string; level: number; rarity: string; desc: string; }
export const RANK_TIERS: RankTier[] = [
  { key: 'normal', name: 'Tier Normal', ico: '🥉', col: '#3fae6a', level: 0, rarity: 'comum', desc: 'A porta de entrada do ranking. Rivais comuns — mas cada vez mais espertos.' },
  { key: 'raro', name: 'Tier Raro', ico: '🥈', col: '#3b82f6', level: 1, rarity: 'rara', desc: 'Tampinhas raras na pista. Aqui já não tem jogo fácil.' },
  { key: 'epico', name: 'Tier Épico', ico: '🥇', col: '#a855f7', level: 2, rarity: 'epica', desc: 'As épicas entram em cena. Só passa quem joga MUITO.' },
  { key: 'lendario', name: 'Tier Lendário', ico: '💎', col: '#f2a400', level: 3, rarity: 'lendaria', desc: 'Lendárias em cada raia. O ar fica rarefeito aqui em cima.' },
  { key: 'mistico', name: 'Tier Místico', ico: '👑', col: '#e5484d', level: 4, rarity: 'mitica', desc: 'O topo do topo. Míticas turbinadas — e o mundo inteiro olhando.' },
];

export interface RankComp {
  id: string; tier: number; idx: number;      // idx 0..7 dentro do tier
  name: string; ico: string;
  races: number; level: number; nOpp: number;
  boost: number;                              // força extra dos rivais (0..~0.45)
  aiKinds: string[];
}

// os rivais ficam ~4-6% mais fortes a cada competição do tier, chegando a +45%
// na oitava — "no final fica uns 30-50% mais forte"
export const BOOSTS = [0, 0.05, 0.11, 0.17, 0.23, 0.30, 0.37, 0.45];
const K_RAMP = [
  ['caotico', 'cauteloso'], ['cauteloso', 'caotico', 'agressivo'], ['cauteloso', 'agressivo'],
  ['agressivo', 'tecnico'], ['tecnico', 'agressivo'], ['tecnico', 'agressivo', 'rival'],
  ['tecnico', 'rival'], ['tecnico', 'rival', 'rival'],
];
// nomes das 8 etapas (iguais em todo tier — a "temporada" do tier)
const STAGES: [string, string][] = [
  ['Abertura', '🚩'], ['Etapa das Pedras', '🪨'], ['Volta Rápida', '💨'], ['Meia-Temporada', '🌗'],
  ['Etapa Noturna', '🌙'], ['Chuva de Pontos', '🌧️'], ['Semifinal', '🔥'], ['GRANDE FINAL', '🏆'],
];
const RACES_BY_IDX = [2, 2, 3, 3, 3, 4, 4, 4];    // corridas por etapa (25 por tier)
const NOPP_BY_IDX = [3, 3, 4, 4, 4, 5, 5, 5];

export const RANK_COMPS: RankComp[] = [];
for (let t = 0; t < 5; t++) for (let i = 0; i < 8; i++) {
  RANK_COMPS.push({
    id: `rk${t}${i}`, tier: t, idx: i,
    name: STAGES[i][0], ico: STAGES[i][1],
    races: RACES_BY_IDX[i], level: RANK_TIERS[t].level, nOpp: NOPP_BY_IDX[i],
    boost: BOOSTS[i], aiKinds: K_RAMP[i],
  });
}
export const rankCompById = (id: string): RankComp => RANK_COMPS.find(c => c.id === id)!;

// pontos por posição em cada corrida (1º=12 · 2º=9 · …)
export const RANK_PTS = [12, 9, 7, 5, 3, 1];
export const compMax = (c: RankComp): number => c.races * RANK_PTS[0];
export const RANK_MAX_TOTAL = RANK_COMPS.reduce((s, c) => s + compMax(c), 0);

// ---------------- estado salvo (um por CIRCUITO: clássica e Caos) ----------------
// A Ranqueada CAOS é a mesma escada, mas as corridas têm power-ups e o ranking,
// os nomes, o progresso e a semente são TOTALMENTE separados (dá pra ser "Diego"
// nos dois — são mundos diferentes).
export type RankCirc = 'normal' | 'caos';
export interface RankState {
  name: string | null;                        // nome ÚNICO no ranking (null = não registrou)
  dev: string;                                // id deste aparelho (dono do nome)
  claimTs: number;                            // quando o nome foi reivindicado
  best: Record<string, number>;               // MELHOR pontuação por competição
  place: Record<string, number>;              // melhor colocação por competição (1..N)
  cap: string;                                // última tampinha usada (vitrine do ranking)
  seed: number;                               // semente das pistas (só muda excluindo a conta)
}
function newDev(): string { return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6); }
const newSeed = (): number => (Math.random() * 0xffffffff) >>> 0;
const rkKey = (circ: RankCirc): string => circ === 'caos' ? 'rankc' : 'rank';
export function rankState(circ: RankCirc = 'normal'): RankState {
  const d = save.get() as any; const k = rkKey(circ);
  if (!d[k]) d[k] = { name: null, dev: newDev(), claimTs: 0, best: {}, place: {}, cap: 'coca', seed: newSeed() };
  if (!d[k].dev) d[k].dev = newDev();
  if (!d[k].seed) { d[k].seed = newSeed(); save.persistNow(); }
  return d[k];
}
export function saveRank(st: RankState, circ: RankCirc = 'normal'): void { (save.get() as any)[rkKey(circ)] = st; save.persistNow(); }
export function resetRank(circ: RankCirc = 'normal'): void { const d = save.get() as any; const k = rkKey(circ); const dev = d[k]?.dev || newDev(); d[k] = { name: null, dev, claimTs: 0, best: {}, place: {}, cap: 'coca', seed: newSeed() }; save.persistNow(); }

export const rankTotal = (st: RankState): number => Object.values(st.best).reduce((a, b) => a + b, 0);
export const tierGolds = (st: RankState, tier: number): number => RANK_COMPS.filter(c => c.tier === tier && st.place[c.id] === 1).length;
export const tierDone = (st: RankState, tier: number): number => RANK_COMPS.filter(c => c.tier === tier && (st.place[c.id] ?? 99) <= 3).length;

// competição liberada? (a 1ª sempre; as outras exigem PÓDIO na anterior — corrente única nas 40)
export function rankUnlocked(st: RankState, idx: number): boolean {
  if (idx === 0) return true;
  const prev = RANK_COMPS[idx - 1];
  return (st.place[prev.id] ?? 99) <= 3;
}
// maior tier alcançado (pra elegibilidade de tampinha ao entrar em qualquer comp do tier t usa o próprio t)
export function maxTierReached(st: RankState): number {
  for (let i = RANK_COMPS.length - 1; i >= 0; i--) if (rankUnlocked(st, i)) return RANK_COMPS[i].tier;
  return 0;
}

// TAMPINHA-PRÊMIO por tier (ouro nas 8) — as melhores do jogo.
// Cada circuito tem as SUAS cinco exclusivas.
export const RANK_PRIZE = ['mineirinho', 'dolly', 'saogeraldo', 'bare', 'guaranajesus'];
export const RANK_PRIZE_CAOS = ['grapette', 'cotuba', 'matecouro', 'fruki', 'simba'];
export const rankPrizeOf = (circ: RankCirc): string[] => circ === 'caos' ? RANK_PRIZE_CAOS : RANK_PRIZE;

// elegibilidade: desbloqueada E raridade ≤ tier (exclusivas contam pela própria raridade)
export function eligibleCaps(tier: number): Skin[] {
  return unlockedSkins(save.wins()).filter(s => rarityIndex(s.rarity) <= tier);
}

// aplica o resultado de uma competição; retorna o que mudou
export function applyRankResult(st: RankState, compId: string, place: number, pts: number, capId: string, circ: RankCirc = 'normal'): { dPts: number; improvedPlace: boolean; prize: string | null; podium: boolean } {
  const c = rankCompById(compId);
  const oldPts = st.best[compId] ?? 0;
  const dPts = Math.max(0, pts - oldPts);
  if (pts > oldPts) st.best[compId] = pts;
  const oldPlace = st.place[compId] ?? 99;
  const improvedPlace = place < oldPlace;
  if (improvedPlace) st.place[compId] = place;
  st.cap = capId;
  saveRank(st, circ);
  let prize: string | null = null;
  const prizes = rankPrizeOf(circ);
  if (tierGolds(st, c.tier) >= 8 && !save.hasBonus(prizes[c.tier])) {
    save.addBonus(prizes[c.tier]);
    prize = prizes[c.tier];
  }
  return { dPts, improvedPlace, prize, podium: place <= 3 };
}

// ---------------- adversários ----------------
// tampinhas da raridade do tier (sem exclusivas/ocultas), com o BOOST da etapa
export function pickRankOpponents(c: RankComp, rng: () => number = Math.random): { skin: string; stats: CapStats }[] {
  const rar = RANK_TIERS[c.tier].rarity;
  const pool = SKINS.filter(s => s.rarity === (rar as any) && !s.hidden && s.prize == null && s.rprize == null);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const out: { skin: string; stats: CapStats }[] = [];
  for (let i = 0; i < c.nOpp; i++) {
    const s = pool[i % pool.length];
    out.push({ skin: s.id, stats: boostStats(s.stats, c.boost) });
  }
  return out;
}
// o boost segue o padrão do jogo: cheio nos atributos ≥1, metade nos <1
export function boostStats(base: CapStats, b: number): CapStats {
  const f = 1 + b, g = 1 + b * 0.5;
  const out: any = {};
  for (const k of Object.keys(base) as (keyof CapStats)[]) out[k] = +(base[k] * (base[k] >= 1 ? f : g)).toFixed(3);
  return out;
}
