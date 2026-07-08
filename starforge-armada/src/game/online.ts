// Cola da camada online: ao terminar qualquer partida (campanha ou modo),
// converte o resultado em XP/créditos, atualiza estatísticas vitalícias, envia
// o placar ao ranking da temporada e avança o progresso das missões.
import type { CampaignResult, Orient } from './engine';
import { Profile, grantRewards, saveProfile } from './profile';
import { submitScore, leaderboard } from './leaderboard';
import { applyRun, RunSummary } from './missions';
import { currentSeason } from './season';

export interface RunContext { boardId: string; orient: Orient; isBossFight: boolean; }

export interface RunOutcome {
  xp: number; credits: number; leveledTo?: number;
  newBest: boolean; rank: number; missionsDone: number; unlockedTitles: string[];
}

export function finalizeRun(profile: Profile, r: CampaignResult, ctx: RunContext): RunOutcome {
  const bosswin = ctx.isBossFight && r.success ? 1 : 0;
  const summary: RunSummary = {
    kills: r.kills, score: r.score, maxCombo: r.maxCombo, win: r.success,
    timeSec: r.timeSec, orient: ctx.orient, bosswin,
  };

  // XP e créditos por desempenho
  const xp = Math.round(r.score / 45 + r.kills * 2 + r.maxCombo * 3 + (r.success ? 250 : 50));
  const credits = Math.round(r.score / 130 + r.maxCombo + (r.success ? 70 : 15));

  const reward = grantRewards(profile, xp, credits);

  // estatísticas vitalícias
  const st = profile.stats;
  st.runs++; st.kills += r.kills; st.playSec += Math.round(r.timeSec);
  st.credits += credits;
  if (r.success) st.wins++;
  st.bosses += bosswin;
  if (r.score > st.bestScore) st.bestScore = r.score;
  if (r.maxCombo > st.maxCombo) st.maxCombo = r.maxCombo;

  // ranking da temporada
  const season = currentSeason();
  const newBest = submitScore(ctx.boardId, r.score, season);
  const { playerRank } = leaderboard(ctx.boardId, profile, season);

  // missões
  const missionsDone = applyRun(summary);

  saveProfile(profile);

  return {
    xp, credits, leveledTo: reward.leveledTo, newBest,
    rank: playerRank, missionsDone, unlockedTitles: reward.unlockedTitles,
  };
}
