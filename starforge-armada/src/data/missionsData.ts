// Banco de missões. A cada dia sorteamos 3 diárias e a cada semana 3 semanais
// (de forma determinística pela data), com objetivos que mapeiam direto para o
// resumo de cada partida. Cada missão dá XP e créditos.

export type Metric = 'kills' | 'score' | 'combo' | 'runs' | 'wins' | 'bosswin' | 'arena' | 'lateral' | 'survive';
export type Acc = 'sum' | 'max';

export interface MissionTpl {
  id: string; scope: 'daily' | 'weekly';
  metric: Metric; acc: Acc; target: number;
  xp: number; credits: number; icon: string; text: string;
}

export const DAILY_POOL: MissionTpl[] = [
  { id: 'd_kill120', scope: 'daily', metric: 'kills', acc: 'sum', target: 120, xp: 120, credits: 60, icon: '☄', text: 'Destrua 120 inimigos hoje' },
  { id: 'd_kill250', scope: 'daily', metric: 'kills', acc: 'sum', target: 250, xp: 200, credits: 100, icon: '☄', text: 'Destrua 250 inimigos hoje' },
  { id: 'd_score8k', scope: 'daily', metric: 'score', acc: 'max', target: 8000, xp: 140, credits: 70, icon: '★', text: 'Faça 8.000 pontos em uma partida' },
  { id: 'd_score15k', scope: 'daily', metric: 'score', acc: 'max', target: 15000, xp: 220, credits: 120, icon: '★', text: 'Faça 15.000 pontos em uma partida' },
  { id: 'd_combo25', scope: 'daily', metric: 'combo', acc: 'max', target: 25, xp: 130, credits: 65, icon: '✦', text: 'Alcance um combo de x25' },
  { id: 'd_combo40', scope: 'daily', metric: 'combo', acc: 'max', target: 40, xp: 210, credits: 110, icon: '✦', text: 'Alcance um combo de x40' },
  { id: 'd_runs3', scope: 'daily', metric: 'runs', acc: 'sum', target: 3, xp: 90, credits: 50, icon: '▶', text: 'Jogue 3 partidas' },
  { id: 'd_win1', scope: 'daily', metric: 'wins', acc: 'sum', target: 1, xp: 150, credits: 80, icon: '✓', text: 'Vença 1 partida' },
  { id: 'd_arena2', scope: 'daily', metric: 'arena', acc: 'sum', target: 2, xp: 160, credits: 85, icon: '◎', text: 'Jogue 2 partidas na Arena 360°' },
  { id: 'd_lateral2', scope: 'daily', metric: 'lateral', acc: 'sum', target: 2, xp: 160, credits: 85, icon: '▶', text: 'Jogue 2 partidas na Investida Lateral' },
  { id: 'd_survive120', scope: 'daily', metric: 'survive', acc: 'max', target: 120, xp: 150, credits: 80, icon: '⏱', text: 'Sobreviva 2 minutos em uma partida' },
  { id: 'd_boss1', scope: 'daily', metric: 'bosswin', acc: 'sum', target: 1, xp: 180, credits: 100, icon: '☠', text: 'Derrote 1 chefe' },
];

export const WEEKLY_POOL: MissionTpl[] = [
  { id: 'w_kill1500', scope: 'weekly', metric: 'kills', acc: 'sum', target: 1500, xp: 700, credits: 350, icon: '☄', text: 'Destrua 1.500 inimigos nesta semana' },
  { id: 'w_score30k', scope: 'weekly', metric: 'score', acc: 'max', target: 30000, xp: 800, credits: 420, icon: '★', text: 'Faça 30.000 pontos em uma partida' },
  { id: 'w_combo60', scope: 'weekly', metric: 'combo', acc: 'max', target: 60, xp: 750, credits: 380, icon: '✦', text: 'Alcance um combo de x60' },
  { id: 'w_runs20', scope: 'weekly', metric: 'runs', acc: 'sum', target: 20, xp: 600, credits: 320, icon: '▶', text: 'Jogue 20 partidas' },
  { id: 'w_win8', scope: 'weekly', metric: 'wins', acc: 'sum', target: 8, xp: 850, credits: 450, icon: '✓', text: 'Vença 8 partidas' },
  { id: 'w_boss6', scope: 'weekly', metric: 'bosswin', acc: 'sum', target: 6, xp: 900, credits: 500, icon: '☠', text: 'Derrote 6 chefes' },
  { id: 'w_arena6', scope: 'weekly', metric: 'arena', acc: 'sum', target: 6, xp: 700, credits: 360, icon: '◎', text: 'Jogue 6 partidas na Arena 360°' },
  { id: 'w_survive300', scope: 'weekly', metric: 'survive', acc: 'max', target: 300, xp: 780, credits: 400, icon: '⏱', text: 'Sobreviva 5 minutos em uma partida' },
];
