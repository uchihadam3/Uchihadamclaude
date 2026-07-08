// Progresso salvo em localStorage: estrelas e melhor tempo por fase.
const KEY = 'barco_save_v1';

interface SaveData { stars: Record<number, number>; best: Record<number, number>; }

function load(): SaveData {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch { /* */ }
  return { stars: {}, best: {} };
}
let data = load();
function persist(): void { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* */ } }

export function starsOf(level: number): number { return data.stars[level] ?? 0; }
export function bestOf(level: number): number | undefined { return data.best[level]; }
export function unlocked(level: number): boolean { return level === 0 || (data.stars[level - 1] ?? 0) >= 1; }
export function totalStars(): number { return Object.values(data.stars).reduce((a, b) => a + b, 0); }

export function record(level: number, stars: number, timeSec: number): void {
  data.stars[level] = Math.max(data.stars[level] ?? 0, stars);
  const prev = data.best[level];
  if (prev === undefined || timeSec < prev) data.best[level] = timeSec;
  persist();
}
export function resetProgress(): void { data = { stars: {}, best: {} }; persist(); }
