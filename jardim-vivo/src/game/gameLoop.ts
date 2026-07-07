import { G, notify } from './gameState';
import { tickCalendar, absoluteDay } from './gameTime';
import { generateWeather, forecastDays } from './weatherSystem';
import { WORLD_SEED } from './gameState';
import { simulateDay, DayReport } from './plantSimulation';
import { dailyMarketDrift } from './economySystem';
import { ageArrangements } from './arrangementSystem';
import { rollNpcRequests, checkSnapshotQuests, checkAchievements, pushToast } from './progressSystems';
import { rollDailyVisitors, maybeSpawnVisitor, updateVisitors, refreshCritters } from './visitorSystem';
import { saveGame } from './saveSystem';
import { setWeatherAmbience } from '../audio/audioEngine';

let running = false;
let lastT = 0;
let hourAccum = 0;
let uiDirtyAccum = 0;

export function startLoop(): void {
  if (running) return;
  running = true;
  lastT = performance.now();
  requestAnimationFrame(frame);
}

function frame(t: number): void {
  if (!running) return;
  const dt = Math.min(0.1, (t - lastT) / 1000);
  lastT = t;
  tick(dt);
  requestAnimationFrame(frame);
}

export function tick(dt: number): void {
  if (!G) return;
  const daysPassed = tickCalendar(G.calendar, dt);

  // ticks de hora (spawn de visitantes etc.)
  hourAccum += dt * G.calendar.speed;
  if (hourAccum > 6) {
    hourAccum = 0;
    maybeSpawnVisitor();
  }
  updateVisitors(dt * (G.calendar.speed || 1));

  for (let i = 0; i < daysPassed; i++) advanceDay();

  // atualização suave da UI (relógio) sem depender de eventos
  uiDirtyAccum += dt;
  if (uiDirtyAccum > 0.5) {
    uiDirtyAccum = 0;
    notify();
  }
}

export function advanceDay(): void {
  const absDay = absoluteDay(G.calendar);
  // novo clima
  G.weather = generateWeather(absDay, G.calendar.season, WORLD_SEED);
  G.forecast = forecastDays(G.calendar, WORLD_SEED, absDay, 5);
  setWeatherAmbience(G.weather.raining);
  // coletor de chuva
  if (G.rainBarrel && G.weather.raining) G.rainWater = Math.min(20, G.rainWater + G.weather.rainAmount);
  // composteira rende composto semanal
  if (G.inventory.tools['composteira'] && G.calendar.weekday === 1) {
    G.inventory.fertilizers['composto-item'] = (G.inventory.fertilizers['composto-item'] ?? 0) + 1;
    pushToast('info', 'A composteira rendeu composto fresco!', 'The compost bin yielded fresh compost!');
  }

  const report: DayReport = { bloomed: [], died: [], warnings: [] };
  simulateDay(report);
  for (const b of report.bloomed) pushToast('bloom', `${b} floresceu!`, `${b} bloomed!`);
  for (const d of report.died) pushToast('death', `${d} morreu…`, `${d} died…`);
  for (const w of report.warnings.slice(0, 2)) pushToast('warn', w.msg.pt, w.msg.en);

  dailyMarketDrift();
  ageArrangements();
  rollNpcRequests();
  rollDailyVisitors();
  refreshCritters();
  checkSnapshotQuests();
  checkAchievements();
  G.stats.daysPlayed++;

  // autosave diário
  if (absDay !== G.lastAutosaveDay) {
    G.lastAutosaveDay = absDay;
    saveGame();
  }
  notify();
}

export function setSpeed(s: 0 | 1 | 4 | 12): void {
  G.calendar.speed = s;
  notify();
}

/** dormir até o próximo dia (botão) */
export function sleepToMorning(): void {
  G.calendar.minute = 6 * 60 + 30;
  advanceDay();
  G.calendar.day++;
  if (G.calendar.day > 28) {
    G.calendar.day = 1;
    G.calendar.month++;
    if (G.calendar.month >= 12) { G.calendar.month = 0; G.calendar.year++; }
  }
  G.calendar.weekday = (G.calendar.weekday + 1) % 7;
  notify();
}
