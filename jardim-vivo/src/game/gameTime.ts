import type { GameCalendar, Season } from '../types';
import { SEASON_OF_MONTH } from '../types';

// 1 dia de jogo ≈ 30 min reais na velocidade 1.
// 1440 min de jogo / 1800 s => 0.8 min de jogo por segundo real.
export const GAME_MIN_PER_REAL_SEC = 0.8;
export const DAYS_PER_MONTH = 28;
export const MONTHS_PER_YEAR = 12;

export const MONTH_NAMES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const WEEKDAY_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const WEEKDAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function newCalendar(): GameCalendar {
  return { minute: 7 * 60, day: 1, month: 8, year: 1, weekday: 1, season: 'spring', speed: 1 };
  // começa em setembro (primavera no hemisfério sul), 7h da manhã
}

export function seasonOf(month: number): Season { return SEASON_OF_MONTH[month]; }

export function absoluteDay(c: GameCalendar): number {
  return (c.year - 1) * MONTHS_PER_YEAR * DAYS_PER_MONTH + c.month * DAYS_PER_MONTH + (c.day - 1);
}

/** Avança o relógio; retorna quantos dias viraram. */
export function tickCalendar(c: GameCalendar, realDtSec: number): number {
  if (c.speed === 0) return 0;
  c.minute += realDtSec * GAME_MIN_PER_REAL_SEC * c.speed;
  let days = 0;
  while (c.minute >= 1440) {
    c.minute -= 1440;
    days++;
    c.day++;
    c.weekday = (c.weekday + 1) % 7;
    if (c.day > DAYS_PER_MONTH) {
      c.day = 1;
      c.month++;
      if (c.month >= MONTHS_PER_YEAR) { c.month = 0; c.year++; }
      c.season = seasonOf(c.month);
    }
  }
  c.season = seasonOf(c.month);
  return days;
}

export function hourOf(c: GameCalendar): number { return Math.floor(c.minute / 60); }
export function minuteOf(c: GameCalendar): number { return Math.floor(c.minute % 60); }

export type DayPhase = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk' | 'night';
export function dayPhase(c: GameCalendar): DayPhase {
  const h = c.minute / 60;
  if (h < 5.5) return 'night';
  if (h < 7.5) return 'dawn';
  if (h < 11) return 'morning';
  if (h < 14.5) return 'midday';
  if (h < 17.5) return 'afternoon';
  if (h < 19.5) return 'dusk';
  return 'night';
}

/** 0-1: quanta luz solar existe agora (para render e crescimento). */
export function sunAmount(c: GameCalendar): number {
  const h = c.minute / 60;
  const seasonShift = c.season === 'summer' ? 1 : c.season === 'winter' ? -1 : 0;
  const rise = 6.2 - seasonShift * 0.8;
  const set = 18.2 + seasonShift * 1.2;
  if (h < rise || h > set) return 0;
  const t = (h - rise) / (set - rise);
  return Math.sin(t * Math.PI);
}

export function fmtClock(c: GameCalendar): string {
  const h = hourOf(c), m = minuteOf(c);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function seasonNamePT(s: Season): string {
  return { spring: 'Primavera', summer: 'Verão', autumn: 'Outono', winter: 'Inverno' }[s];
}
export function seasonNameEN(s: Season): string {
  return { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' }[s];
}
