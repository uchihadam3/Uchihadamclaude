// MODO CAMPANHA — a carreira: você começa com uma tampinha fraca (achada no
// quintal) e sobe 5 LIGAS (Fácil→Extrema), 20 competições no total. Cada
// competição é um mini-campeonato de várias corridas contra IAs de raridade
// crescente (comum→...→mítica). Pódio destrava a próxima; troféus dão PONTOS DE
// OFICINA (você distribui nos 7 atributos como quiser — só valem na campanha) e
// VITÓRIAS (destravam tampinhas no modo livre). Vencer a Grande Final zera o jogo.
import { CapStats } from '../engine/core';
import { SKINS } from './skins';
import { save } from './save';

export interface CampComp {
  id: string; liga: number; name: string; ico: string;
  races: number; level: number; nOpp: number;
  rarities: string[];            // pool de raridades dos adversários
  aiKinds: string[];             // personalidades (curva de dificuldade)
  final?: boolean;               // Grande Final (tem cerimônia de zeramento)
}

export const LIGAS = [
  { name: 'Liga do Quintal', ico: '🏡', col: '#3fae6a', level: 0, desc: 'Onde toda lenda começa: terra batida e joelho ralado.' },
  { name: 'Liga da Rua', ico: '🛴', col: '#3b82f6', level: 1, desc: 'A calçada inteira é sua pista. A molecada é boa.' },
  { name: 'Liga da Cidade', ico: '🏙️', col: '#f2b100', level: 2, desc: 'Os campeões de cada bairro. Aqui ninguém dá mole.' },
  { name: 'Liga Nacional', ico: '🇧🇷', col: '#e5762a', level: 3, desc: 'O país inteiro de olho. Tampinhas lendárias na pista.' },
  { name: 'Liga Mundial', ico: '🌍', col: '#e5484d', level: 4, desc: 'O topo do mundo. Só as míticas — e você.' },
];

const K_EASY = ['caotico', 'cauteloso'];
const K_MID = ['cauteloso', 'caotico', 'agressivo'];
const K_HARD = ['tecnico', 'agressivo', 'rival'];
const K_TOP = ['tecnico', 'rival', 'rival'];

function comp(id: string, liga: number, name: string, ico: string, races: number, nOpp: number, rarities: string[], aiKinds: string[], final = false): CampComp {
  return { id, liga, name, ico, races, level: LIGAS[liga].level, nOpp, rarities, aiKinds, final };
}

export const COMPS: CampComp[] = [
  // Liga do Quintal (Fácil · comuns · IAs fracas)
  comp('q1', 0, 'Copa Poeirinha', '🌪️', 2, 3, ['comum'], K_EASY),
  comp('q2', 0, 'Troféu Formiga', '🐜', 2, 3, ['comum'], K_EASY),
  comp('q3', 0, 'Desafio do Varal', '👕', 3, 3, ['comum'], K_EASY),
  comp('q4', 0, 'Final do Quintal', '🏡', 3, 4, ['comum'], K_MID),
  // Liga da Rua (Médio · comuns+raras)
  comp('r1', 1, 'Copa Meio-Fio', '🛹', 3, 4, ['comum', 'rara'], K_MID),
  comp('r2', 1, 'Troféu Poste a Poste', '💡', 3, 4, ['rara', 'comum'], K_MID),
  comp('r3', 1, 'Grande Ladeira', '⛰️', 3, 4, ['rara'], K_MID),
  comp('r4', 1, 'Final da Rua', '🛴', 4, 4, ['rara'], K_HARD),
  // Liga da Cidade (Difícil · raras+épicas)
  comp('c1', 2, 'Copa Viaduto', '🌉', 3, 4, ['rara', 'epica'], K_HARD),
  comp('c2', 2, 'Troféu Praça Central', '⛲', 3, 5, ['epica', 'rara'], K_HARD),
  comp('c3', 2, 'Noturna da Cidade', '🌃', 4, 5, ['epica'], K_HARD),
  comp('c4', 2, 'Final Metropolitana', '🏙️', 4, 5, ['epica'], K_HARD),
  // Liga Nacional (Muito Difícil · épicas+lendárias)
  comp('n1', 3, 'Copa dos Estados', '🗺️', 3, 5, ['epica', 'lendaria'], K_HARD),
  comp('n2', 3, 'Troféu Litoral', '🏖️', 4, 5, ['lendaria', 'epica'], K_TOP),
  comp('n3', 3, 'Rally do Sertão', '🌵', 4, 5, ['lendaria'], K_TOP),
  comp('n4', 3, 'Final Nacional', '🇧🇷', 4, 5, ['lendaria'], K_TOP),
  // Liga Mundial (Extrema · lendárias+míticas)
  comp('m1', 4, 'Copa Intercontinental', '✈️', 4, 5, ['lendaria', 'mitica'], K_TOP),
  comp('m2', 4, 'Troféu Aurora', '🌌', 4, 5, ['mitica', 'lendaria'], K_TOP),
  comp('m3', 4, 'Semifinal Mundial', '🌍', 4, 5, ['mitica'], K_TOP),
  comp('m4', 4, 'A GRANDE FINAL', '👑', 5, 5, ['mitica'], K_TOP, true),
];
export const compById = (id: string): CampComp => COMPS.find(c => c.id === id)!;

// ---------------- OFICINA: upgrades por atributo (só valem na campanha) ----------------
export const UP_MAX = 12;            // níveis máximos por atributo
export const UP_STEP = 0.012;        // cada nível soma +0.012 no atributo
// custo crescente: níveis 1-4 custam 1 · 5-8 custam 2 · 9-12 custam 3
export function upCost(curLevel: number): number { return curLevel < 4 ? 1 : curLevel < 8 ? 2 : 3; }

export interface CampState {
  cap: string | null;                       // starter escolhida
  pts: number;                              // pontos de oficina disponíveis
  alloc: Record<string, number>;            // níveis por atributo
  best: Record<string, number>;             // melhor colocação por competição (1..N)
  done: boolean;                            // zerou (venceu a Grande Final)
  races: number; golds: number;             // estatísticas pro final
}
export function campState(): CampState {
  const c = (save.get() as any).campaign;
  return c || { cap: null, pts: 0, alloc: {}, best: {}, done: false, races: 0, golds: 0 };
}
export function saveCamp(st: CampState): void { (save.get() as any).campaign = st; save.persistNow(); }

// stats da SUA tampinha na campanha = starter + upgrades da oficina
export function campStats(st: CampState): CapStats {
  const sk = SKINS.find(s => s.id === st.cap) || SKINS[0];
  const out: any = { ...sk.stats };
  for (const k of Object.keys(st.alloc)) if (out[k] != null) out[k] = +(out[k] + st.alloc[k] * UP_STEP).toFixed(3);
  return out;
}

// TAMPINHA-PRÊMIO por liga: ouro nas 4 competições → exclusiva da liga
export const LIGA_PRIZE = ['itubaina', 'nesbitts', 'hires', 'guarana', 'schweppes'];
export function ligaGolds(st: CampState, liga: number): number {
  return COMPS.filter(c => c.liga === liga && st.best[c.id] === 1).length;
}

// recompensas por troféu (1º=ouro, 2º=prata, 3º=bronze) — primeira vez; melhorar dá a diferença
const PTS_BY_PLACE: Record<number, number> = { 1: 5, 2: 3, 3: 2 };
const WINS_BY_PLACE: Record<number, number> = { 1: 2, 2: 1, 3: 1 };
export function trophyOf(place: number): 'ouro' | 'prata' | 'bronze' | null { return place === 1 ? 'ouro' : place === 2 ? 'prata' : place === 3 ? 'bronze' : null; }

// aplica o resultado de uma competição; retorna o que foi ganho AGORA
export function applyResult(st: CampState, compId: string, place: number): { pts: number; wins: number; improved: boolean; finished: boolean; prize: string | null } {
  const prev = st.best[compId] ?? 99;
  const newPts = PTS_BY_PLACE[place] || 0, oldPts = PTS_BY_PLACE[prev] || 0;
  const newWins = WINS_BY_PLACE[place] || 0, oldWins = WINS_BY_PLACE[prev] || 0;
  const dPts = Math.max(0, newPts - oldPts), dWins = Math.max(0, newWins - oldWins);
  const improved = place < prev;
  if (improved) st.best[compId] = place;
  st.pts += dPts;
  for (let i = 0; i < dWins; i++) save.addWin();
  const c = compById(compId);
  let finished = false;
  if (c.final && place === 1 && !st.done) {          // ZEROU!
    st.done = true; finished = true;
    st.pts += 10;                                     // bônus de lenda
    for (let i = 0; i < 10; i++) save.addWin();       // chuva de vitórias no modo livre
  }
  saveCamp(st);
  // ouro nas 4 da liga? leva a tampinha exclusiva (uma vez só)
  let prize: string | null = null;
  if (ligaGolds(st, c.liga) >= 4 && !save.hasBonus(LIGA_PRIZE[c.liga])) {
    save.addBonus(LIGA_PRIZE[c.liga]);
    prize = LIGA_PRIZE[c.liga];
  }
  return { pts: dPts, wins: dWins + (finished ? 10 : 0), improved, finished, prize };
}

// competição liberada? (a 1ª sempre; as outras exigem PÓDIO na anterior)
export function isUnlocked(st: CampState, idx: number): boolean {
  if (idx === 0) return true;
  const prev = COMPS[idx - 1];
  return (st.best[prev.id] ?? 99) <= 3;
}

// adversários da competição: sorteia skins das raridades pedidas (sem hidden)
export function pickOpponents(c: CampComp, rng: () => number = Math.random): string[] {
  const pool: string[] = [];
  for (const r of c.rarities) for (const s of SKINS) if (s.rarity === (r as any) && !s.hidden && s.prize == null) pool.push(s.id);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const out: string[] = [];
  for (let i = 0; i < c.nOpp; i++) out.push(pool[i % pool.length]);
  return out;
}
