import { createRoot } from 'react-dom/client';
import App from './App';
import * as gameState from './game/gameState';
import { advanceDay, sleepToMorning } from './game/gameLoop';
import { computeHarmony } from './game/gardenScoring';
import { plantSeed, waterPlant, clearDebris } from './game/actions';
import { PLANTS } from './data/plants';

// hooks de depuração/testes (não afetam gameplay)
declare global {
  interface Window {
    __JV?: {
      state: () => import('./types').GameState;
      advanceDay: () => void;
      sleep: () => void;
      harmony: () => number;
      plantsCount: number;
      plantSeed: typeof plantSeed;
      waterPlant: typeof waterPlant;
      clearDebris: typeof clearDebris;
      notify: () => void;
    };
  }
}
window.__JV = {
  state: () => gameState.G,
  advanceDay,
  sleep: sleepToMorning,
  harmony: () => computeHarmony().total,
  plantsCount: PLANTS.length,
  plantSeed, waterPlant, clearDebris,
  notify: gameState.notify,
};

const el = document.getElementById('root');
if (el) createRoot(el).render(<App />);
