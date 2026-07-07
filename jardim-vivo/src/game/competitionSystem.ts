import type { CompetitionData } from '../types';
import { COMPETITIONS } from '../data/competitionData';
import { PLANT_BY_ID } from '../data/plants';
import { G, addMoney, addReputation, isDead } from './gameState';
import { plantScore, areaScore } from './gardenScoring';
import { absoluteDay } from './gameTime';
import { onEvent, pushToast } from './progressSystems';
import { rng } from './weatherSystem';
import { sfx } from '../audio/audioEngine';

// competições que acontecem HOJE
export function todaysCompetitions(): CompetitionData[] {
  const c = G.calendar;
  return COMPETITIONS.filter((comp) => {
    if (comp.monthDay !== c.day) return false;
    if (comp.cadence === 'monthly') return true;
    if (comp.cadence === 'seasonal') return comp.season === c.season && isFirstMonthOfSeason(c.month);
    if (comp.cadence === 'annual') return comp.season === c.season && isFirstMonthOfSeason(c.month);
    return false;
  });
}

function isFirstMonthOfSeason(month: number): boolean {
  // estações (hemisfério sul): primavera=set(8), verão=dez(11), outono=mar(2), inverno=jun(5)
  return month === 8 || month === 11 || month === 2 || month === 5;
}

// próximas competições (para o calendário)
export function upcomingCompetitions(daysAhead: number): { comp: CompetitionData; inDays: number }[] {
  const out: { comp: CompetitionData; inDays: number }[] = [];
  const c = G.calendar;
  for (let i = 0; i <= daysAhead; i++) {
    const day = ((c.day - 1 + i) % 28) + 1;
    const month = c.month + Math.floor((c.day - 1 + i) / 28);
    const m = month % 12;
    const season = ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer'][m];
    for (const comp of COMPETITIONS) {
      if (comp.monthDay !== day) continue;
      if (comp.cadence === 'monthly') out.push({ comp, inDays: i });
      else if ((comp.cadence === 'seasonal' || comp.cadence === 'annual') && comp.season === season && (m === 8 || m === 11 || m === 2 || m === 5)) out.push({ comp, inDays: i });
    }
  }
  return out.slice(0, 8);
}

export interface CompetitionOutcome {
  placement: number;
  score: number;
  rivalScores: number[];
  prize: number;
  special?: string;
}

/** inscreve e julga imediatamente (no dia da competição) */
export function enterCompetition(comp: CompetitionData, entry: { areaId?: string; plantUid?: number; arrangementUid?: number }): CompetitionOutcome | { error: { pt: string; en: string } } {
  if (G.reputation < comp.minReputation) {
    return { error: { pt: `Reputação ${comp.minReputation} necessária.`, en: `Reputation ${comp.minReputation} required.` } };
  }
  let myScore = 0;
  if (comp.scope === 'plant') {
    const p = G.plants.find((x) => x.uid === entry.plantUid);
    if (!p || isDead(p)) return { error: { pt: 'Escolha uma planta viva.', en: 'Pick a living plant.' } };
    const def = PLANT_BY_ID[p.plantId];
    if (comp.themeFilter?.category && def.category !== comp.themeFilter.category) {
      return { error: { pt: 'A planta não se encaixa no tema.', en: 'The plant doesn\'t fit the theme.' } };
    }
    if (comp.themeFilter?.flowering && p.stage !== 'flowering') {
      return { error: { pt: 'Precisa estar florida!', en: 'It must be blooming!' } };
    }
    myScore = plantScore(p, comp.criteria);
  } else if (comp.scope === 'area') {
    const areaId = comp.themeFilter?.area ?? entry.areaId;
    if (!areaId || !G.unlockedAreas.includes(areaId)) return { error: { pt: 'Área inválida.', en: 'Invalid area.' } };
    myScore = areaScore(areaId, comp.criteria);
  } else if (comp.scope === 'garden') {
    myScore = areaScore(null, comp.criteria);
  } else if (comp.scope === 'arrangement') {
    const arr = G.inventory.arrangements.find((a) => a.uid === entry.arrangementUid);
    if (!arr) return { error: { pt: 'Escolha um arranjo.', en: 'Pick an arrangement.' } };
    myScore = Math.min(100, arr.quality);
  }

  // rivais: força cresce com reputação (ligas melhores)
  const r = rng(absoluteDay(G.calendar) * 31 + comp.id.length * 17);
  const base = 30 + Math.min(45, G.reputation * 0.5);
  const rivalScores = [0, 1, 2, 3].map(() => Math.min(98, base + r() * 32));
  rivalScores.sort((a, b) => b - a);
  const placement = 1 + rivalScores.filter((s) => s > myScore).length;

  const prize = placement <= 3 ? comp.prizeMoney[placement - 1] : 0;
  addMoney(prize);
  if (placement === 1) {
    addReputation(comp.prizeRep);
    G.medals++;
    G.stats.competitionsWon++;
    onEvent({ type: 'win-competition', competitionId: comp.id });
    if (comp.specialPrize?.unlock === 'area-jardim-prestigio' && !G.unlockedAreas.includes('jardim-prestigio')) {
      // vitória no festival libera a compra do Jardim de Prestígio
      pushToast('competition', 'O Jardim de Prestígio foi liberado para compra!', 'The Prestige Garden is now available!');
    }
    sfx('fanfare');
  } else {
    addReputation(Math.ceil(comp.prizeRep / 4));
    sfx('quest');
  }
  onEvent({ type: 'enter-competition' });
  G.competitionHistory.push({
    competitionId: comp.id,
    absoluteDay: absoluteDay(G.calendar),
    placement: placement <= 3 ? placement : 0,
    score: Math.round(myScore),
    entryDesc: comp.scope,
  });
  return { placement, score: Math.round(myScore), rivalScores: rivalScores.map((s) => Math.round(s)), prize, special: placement === 1 ? comp.specialPrize?.descPT : undefined };
}
