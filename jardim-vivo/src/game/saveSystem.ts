import type { GameState } from '../types';
import { G, setState, newGame } from './gameState';

const KEY = 'jardim-vivo-save-v1';

export function saveGame(): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(G));
    return true;
  } catch {
    return false;
  }
}

export function hasSave(): boolean {
  try { return localStorage.getItem(KEY) !== null; } catch { return false; }
}

export function loadGame(): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as GameState;
    const merged = migrate(data);
    setState(merged);
    return true;
  } catch {
    return false;
  }
}

/** garante campos novos em saves antigos */
function migrate(data: GameState): GameState {
  const fresh = newGame();
  const merged: GameState = {
    ...fresh, ...data,
    calendar: { ...fresh.calendar, ...data.calendar },
    weather: { ...fresh.weather, ...data.weather },
    inventory: {
      ...fresh.inventory, ...data.inventory,
      seeds: { ...data.inventory?.seeds }, cuttings: { ...data.inventory?.cuttings },
      seedlings: { ...data.inventory?.seedlings }, flowers: { ...data.inventory?.flowers },
      pots: { ...data.inventory?.pots }, soilComponents: { ...data.inventory?.soilComponents },
      soilMixes: { ...data.inventory?.soilMixes }, tools: { ...data.inventory?.tools },
      decor: { ...data.inventory?.decor }, fertilizers: { ...data.inventory?.fertilizers },
      treatments: { ...data.inventory?.treatments },
      arrangements: data.inventory?.arrangements ?? [],
    },
    npcs: { ...fresh.npcs, ...data.npcs },
    quests: { ...fresh.quests, ...data.quests },
    plantapedia: { ...fresh.plantapedia, ...data.plantapedia },
    settings: { ...fresh.settings, ...data.settings },
    stats: { ...fresh.stats, ...data.stats },
    tutorial: { ...fresh.tutorial, ...data.tutorial },
  };
  return merged;
}

export function resetGame(): void {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
  setState(newGame());
}

export function exportSave(): string {
  return JSON.stringify(G, null, 0);
}

export function importSave(json: string): boolean {
  try {
    const data = JSON.parse(json) as GameState;
    if (!data.calendar || !data.inventory) return false;
    setState(migrate(data));
    saveGame();
    return true;
  } catch {
    return false;
  }
}
