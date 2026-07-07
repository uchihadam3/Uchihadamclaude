import type { GameState, PlantInstance, SoilMix } from '../types';
import { newCalendar, absoluteDay } from './gameTime';
import { generateWeather, forecastDays } from './weatherSystem';
import { SOIL_MIX_BY_ID } from '../data/soilData';
import { computeMix } from '../data/soilData';
import { ALL_QUESTS } from '../data/questsData';
import { NPCS } from '../data/npcData';
import { PLANTS } from '../data/plants';

// ---------- store reativo ----------
type Listener = () => void;
const listeners = new Set<Listener>();
let stateVersion = 0;

export let G: GameState = null as unknown as GameState;

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function getVersion(): number { return stateVersion; }
export function notify(): void {
  stateVersion++;
  for (const fn of listeners) fn();
}

export const WORLD_SEED = 20260707;

export function newGame(): GameState {
  const calendar = newCalendar();
  const absDay = absoluteDay(calendar);
  const weather = generateWeather(absDay, calendar.season, WORLD_SEED);
  const quests: GameState['quests'] = {};
  for (const q of ALL_QUESTS) {
    quests[q.id] = { status: q.kind === 'main' && q.requires ? 'locked' : 'active', progress: 0 };
  }
  const npcs: GameState['npcs'] = {};
  for (const n of NPCS) npcs[n.id] = { friendship: 0, level: 0, activeRequest: null, completedRequests: 0, met: false };
  const plantapedia: GameState['plantapedia'] = {};
  for (const p of PLANTS) plantapedia[p.id] = { discovered: false, timesGrown: 0, timesBloomed: 0, bestQuality: 0, killed: 0 };

  return {
    version: 1,
    calendar, weather,
    forecast: forecastDays(calendar, WORLD_SEED, absDay, 5),
    money: 80, reputation: 0, beautyPoints: 0, medals: 0, fairTickets: 0,
    plants: [], decors: [],
    unlockedAreas: ['quintal', 'bancada'],
    currentArea: 'quintal',
    debrisCleared: {},
    inventory: {
      seeds: { girassol: 2, calendula: 2, zinia: 2, manjericao: 1 },
      cuttings: {}, seedlings: {}, flowers: {},
      pots: { 'plastico-p': 2, 'biodegradavel': 3, 'bandeja-germinacao': 1 },
      soilComponents: { 'terra-comum': 6, 'composto': 2, 'areia-grossa': 2 },
      soilMixes: { 'mix-universal': 3, 'mix-mudas': 2 },
      tools: { 'regador-velho': true, 'pa-pequena': true, 'bancada-plantio': true },
      decor: {},
      fertilizers: { 'composto-item': 2 },
      treatments: {},
      arrangements: [],
    },
    npcs, quests,
    competitionHistory: [],
    nextCompetitionEntries: {},
    plantapedia,
    achievements: {},
    savedSoilRecipes: [],
    tutorial: { step: 0, dismissed: false, seen: {} },
    settings: { lang: 'pt', volMaster: 0.8, volMusic: 0.6, volSfx: 0.8, volAmbient: 0.7, showGrid: false, reducedMotion: false },
    stats: {
      totalPlanted: 0, totalDied: 0, totalSold: 0, totalEarned: 0, totalWatered: 0,
      totalPropagated: 0, competitionsWon: 0, arrangementsMade: 0, daysPlayed: 0,
      visitorsReceived: 0, daysWithoutDeadPlants: 0,
    },
    uidCounter: 1,
    marketDrift: {},
    visitorsToday: 0,
    irrigationAreas: [],
    rainBarrel: false,
    rainWater: 0,
    lastAutosaveDay: absDay,
  };
}

export function setState(s: GameState): void { G = s; notify(); }
export function initGame(): void { if (!G) G = newGame(); }

// ---------- helpers ----------
export function uid(): number { return G.uidCounter++; }

export function addMoney(n: number): void {
  G.money = Math.max(0, Math.round(G.money + n));
  if (n > 0) G.stats.totalEarned += Math.round(n);
}

export function addReputation(n: number): void {
  G.reputation = Math.max(0, Math.round(G.reputation + n));
}

export function isDead(p: PlantInstance): boolean { return p.health <= 0; }

export function plantsInArea(areaId: string): PlantInstance[] {
  return G.plants.filter((p) => p.areaId === areaId);
}

export function plantAt(areaId: string, x: number, y: number): PlantInstance | undefined {
  return G.plants.find((p) => p.areaId === areaId && p.tileX === x && p.tileY === y);
}

export function decorAt(areaId: string, x: number, y: number) {
  return G.decors.find((d) => d.areaId === areaId && d.tileX === x && d.tileY === y);
}

export function discoverSpecies(plantId: string): void {
  const e = G.plantapedia[plantId];
  if (e && !e.discovered) e.discovered = true;
}

export function discoveredCount(): number {
  return Object.values(G.plantapedia).filter((e) => e.discovered).length;
}

// resolve mistura de solo (padrão ou receita custom "custom:N")
export function resolveMix(id: string): SoilMix {
  if (SOIL_MIX_BY_ID[id]) return SOIL_MIX_BY_ID[id];
  if (id.startsWith('custom:')) {
    const idx = parseInt(id.slice(7), 10);
    const rec = G.savedSoilRecipes[idx];
    if (rec) {
      const attrs = computeMix(rec.components);
      return { id, namePT: rec.name, nameEN: rec.name, components: rec.components, ...attrs, goodFor: [] };
    }
  }
  return SOIL_MIX_BY_ID['mix-universal'];
}

// desbloqueio genérico: 'start' | 'shop:x' | 'area:x' | 'npc:x:n' | 'reputation:n' | 'quest:x'
export function isUnlocked(rule: string): boolean {
  if (!rule || rule === 'start') return true;
  const [kind, a, b] = rule.split(':');
  switch (kind) {
    case 'shop': return true; // lojas sempre visitáveis; itens raros filtrados por reputação
    case 'area': return G.unlockedAreas.includes(a);
    case 'npc': { const st = G.npcs[a]; return !!st && st.level >= parseInt(b || '1', 10); }
    case 'reputation': return G.reputation >= parseInt(a, 10);
    case 'quest': return G.quests[a]?.status === 'done';
    case 'competition': return G.competitionHistory.some((c) => c.competitionId === a && c.placement === 1);
    default: return true;
  }
}
