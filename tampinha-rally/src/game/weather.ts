// CLIMA E HORA DO DIA — cada corrida pode acontecer sob sol, fim de tarde,
// noitinha, VENTO (a física sente: empurra as tampinhas em movimento) ou CHUVA
// (poças de verdade na pista + chuva caindo). Nas competições, no diário e no
// online o clima é DETERMINÍSTICO (semente/etapa) — reiniciar dá o mesmo céu.
export type Weather = 'sol' | 'tarde' | 'noite' | 'vento' | 'chuva';
export interface WeatherState { w: Weather; windX: number; windY: number; salt: number; }

export function weatherFor(seed: number, key: string, race: number): WeatherState {
  let h = (seed >>> 0) || 1;
  const s = key + ':' + race;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 2654435761) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 2246822519) >>> 0;
  const roll = (h % 1000) / 1000;
  const w: Weather = roll < 0.36 ? 'sol' : roll < 0.52 ? 'tarde' : roll < 0.68 ? 'noite' : roll < 0.84 ? 'vento' : 'chuva';
  const ang = ((h >>> 10) % 628) / 100;
  const pow = 0.55 + (((h >>> 20) % 100) / 100) * 0.55;    // 0.55..1.1 u/s² — sutil, mas muda o jogo
  return { w, windX: w === 'vento' ? Math.cos(ang) * pow : 0, windY: w === 'vento' ? Math.sin(ang) * pow : 0, salt: h };
}
export const randomWeather = (): WeatherState => weatherFor((Math.random() * 1e9) | 0, 'q', (Math.random() * 99) | 0);

export const WEATHER_ICO: Record<Weather, string> = { sol: '', tarde: '🌅', noite: '🌙', vento: '🌬️', chuva: '🌧️' };
export const WEATHER_LABEL: Record<Weather, string> = { sol: '', tarde: 'fim de tarde', noite: 'noitinha', vento: 'vento', chuva: 'chuva' };
