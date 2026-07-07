import type { Season } from '../types';

export function hsl(h: number, s: number, l: number, a = 1): string {
  return a >= 1 ? `hsl(${h},${s}%,${l}%)` : `hsla(${h},${s}%,${l}%,${a})`;
}

export function shade(hex: string, amt: number): string {
  // amt -1..1
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt >= 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
  else { r *= 1 + amt; g *= 1 + amt; b *= 1 + amt; }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

export function withAlpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

// céu por fase do dia + estação
export function skyColors(sun: number, season: Season, raining: boolean): { top: string; bottom: string; light: number } {
  // sun: 0-1
  const seasonHue = { spring: 205, summer: 200, autumn: 215, winter: 220 }[season];
  if (sun <= 0.02) return { top: hsl(235, 45, 12), bottom: hsl(250, 35, 20), light: 0.25 };
  if (sun < 0.25) {
    const t = sun / 0.25;
    return { top: hsl(250 - t * 30, 45, 15 + t * 25), bottom: hsl(20 + t * 10, 60, 40 + t * 15), light: 0.35 + t * 0.3 };
  }
  const l = raining ? 0.62 : 1;
  return {
    top: hsl(seasonHue, raining ? 20 : 60, (45 + sun * 25) * (raining ? 0.7 : 1)),
    bottom: hsl(seasonHue - 15, raining ? 15 : 45, (65 + sun * 15) * (raining ? 0.75 : 1)),
    light: (0.65 + sun * 0.35) * l,
  };
}

// tinta ambiente aplicada sobre a cena (multiplica)
export function ambientTint(sun: number, raining: boolean): string | null {
  if (sun <= 0.02) return 'rgba(25,30,80,0.42)';
  if (sun < 0.25) return `rgba(${Math.round(200 - sun * 300)},${Math.round(90 + sun * 100)},60,${0.22 - sun * 0.5})`;
  if (raining) return 'rgba(60,80,110,0.16)';
  return null;
}

export function seasonGroundMod(season: Season): number {
  return { spring: 0.06, summer: 0, autumn: -0.05, winter: -0.14 }[season];
}
