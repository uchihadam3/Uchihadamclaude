// Persistência simples em localStorage: vitórias (desbloqueios), skin escolhida,
// volumes, melhor do desafio diário.
const KEY = 'tampinha_rally_v1';

interface Save { wins: number; skin: string; music: number; sfx: number; muted: boolean; daily: Record<string, number>; }
const DEF: Save = { wins: 0, skin: 'refri', music: 0.5, sfx: 0.8, muted: false, daily: {} };

let data: Save = load();
function load(): Save { try { return { ...DEF, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEF }; } }
function persist(): void { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} }

export const save = {
  get(): Save { return data; },
  addWin(): void { data.wins++; persist(); },
  wins(): number { return data.wins; },
  setSkin(id: string): void { data.skin = id; persist(); },
  skin(): string { return data.skin; },
  setVols(music: number, sfx: number, muted: boolean): void { data.music = music; data.sfx = sfx; data.muted = muted; persist(); },
  dailyBest(key: string): number | undefined { return data.daily[key]; },
  setDailyBest(key: string, flicks: number): void { if (data.daily[key] == null || flicks < data.daily[key]) { data.daily[key] = flicks; persist(); } },
};

// semente do dia (desafio diário determinístico)
export function todayKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
export function dailyTrackIndex(nTracks: number): number {
  const k = todayKey(); let h = 0; for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0;
  return Math.abs(h) % nTracks;
}
