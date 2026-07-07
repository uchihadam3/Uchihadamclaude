import type { DayWeather, GameCalendar, Season } from '../types';

// gerador simples com semente (mulberry32)
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SeasonClimate {
  tempMin: [number, number]; tempMax: [number, number];
  rainChance: number; humidity: [number, number]; sun: [number, number]; wind: [number, number];
}

const CLIMATE: Record<Season, SeasonClimate> = {
  spring: { tempMin: [10, 16], tempMax: [20, 27], rainChance: 0.35, humidity: [50, 75], sun: [6, 9], wind: [2, 6] },
  summer: { tempMin: [17, 22], tempMax: [27, 36], rainChance: 0.28, humidity: [45, 70], sun: [8, 10], wind: [1, 5] },
  autumn: { tempMin: [8, 14], tempMax: [17, 24], rainChance: 0.4, humidity: [55, 80], sun: [4, 8], wind: [3, 7] },
  winter: { tempMin: [2, 8], tempMax: [11, 17], rainChance: 0.45, humidity: [60, 90], sun: [3, 6], wind: [3, 8] },
};

export function generateWeather(absDay: number, season: Season, worldSeed: number): DayWeather {
  const r = rng(worldSeed * 7919 + absDay * 104729);
  const c = CLIMATE[season];
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const raining = r() < c.rainChance;
  const cloudy = raining || r() < 0.25;
  const sunBase = lerp(c.sun[0], c.sun[1], r());
  const sunIntensity = Math.max(1, cloudy ? sunBase * 0.45 : sunBase);
  const humidity = Math.min(100, lerp(c.humidity[0], c.humidity[1], r()) + (raining ? 15 : 0));
  const tempMax = lerp(c.tempMax[0], c.tempMax[1], r()) - (cloudy ? 3 : 0);
  return {
    tempMinC: Math.round(lerp(c.tempMin[0], c.tempMin[1], r())),
    tempMaxC: Math.round(tempMax),
    humidity: Math.round(humidity),
    rainChance: c.rainChance,
    raining,
    rainAmount: raining ? Math.round(2 + r() * 8) : 0,
    sunIntensity: Math.round(sunIntensity * 10) / 10,
    wind: Math.round(lerp(c.wind[0], c.wind[1], r())),
    pestRisk: Math.min(1, (humidity / 100) * 0.4 + (tempMax > 26 ? 0.25 : 0.08) + r() * 0.15),
    fungusRisk: Math.min(1, (humidity / 100) * 0.5 + (raining ? 0.2 : 0) + r() * 0.1),
    cloudy,
  };
}

export function forecastDays(cal: GameCalendar, worldSeed: number, absDay: number, n: number): DayWeather[] {
  const out: DayWeather[] = [];
  for (let i = 1; i <= n; i++) {
    // estação do dia futuro (aprox.: usa mês corrente; horizonte de 5 dias raramente cruza)
    out.push(generateWeather(absDay + i, cal.season, worldSeed));
  }
  return out;
}

/** temperatura atual interpolada pela hora */
export function currentTempC(w: DayWeather, minuteOfDay: number): number {
  const h = minuteOfDay / 60;
  // mínimo às 5h, máximo às 14h
  const t = Math.cos(((h - 14) / 24) * Math.PI * 2) * 0.5 + 0.5;
  return Math.round(w.tempMinC + (w.tempMaxC - w.tempMinC) * t);
}
