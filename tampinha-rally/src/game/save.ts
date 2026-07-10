// Persistência simples em localStorage: vitórias (desbloqueios), skin escolhida,
// volumes, melhor do desafio diário.
const KEY = 'tampinha_rally_v1';

interface Save { wins: number; skin: string; music: number; sfx: number; muted: boolean; daily: Record<string, number>; trial: Record<string, number>; tracks: any[]; name: string; campaign?: any; bonus: string[]; }
const DEF: Save = { wins: 0, skin: 'refri', music: 0.5, sfx: 0.8, muted: false, daily: {}, trial: {}, tracks: [], name: '', bonus: [] };

let data: Save = load();
function load(): Save { try { return { ...DEF, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEF }; } }
function persist(): void { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} }

export const save = {
  get(): Save { return data; },
  persistNow(): void { persist(); },   // p/ quem edita o objeto direto (campanha)
  addWin(): void { data.wins++; persist(); },
  hasBonus(id: string): boolean { return (data.bonus || []).includes(id); },
  addBonus(id: string): void { if (!data.bonus) data.bonus = []; if (!data.bonus.includes(id)) { data.bonus.push(id); persist(); } },
  wins(): number { return data.wins; },
  setSkin(id: string): void { data.skin = id; persist(); },
  skin(): string { return data.skin; },
  setName(n: string): void { data.name = (n || '').slice(0, 12); persist(); },
  name(): string { return data.name || ''; },
  setVols(music: number, sfx: number, muted: boolean): void { data.music = music; data.sfx = sfx; data.muted = muted; persist(); },
  dailyBest(key: string): number | undefined { return data.daily[key]; },
  setDailyBest(key: string, flicks: number): void { if (data.daily[key] == null || flicks < data.daily[key]) { data.daily[key] = flicks; persist(); } },
  // recorde de petelecos por pista no Contra-Relógio
  trialBest(level: number, idx: number): number | undefined { return data.trial[level + '-' + idx]; },
  setTrialBest(level: number, idx: number, flicks: number): boolean { const k = level + '-' + idx; if (data.trial[k] == null || flicks < data.trial[k]) { data.trial[k] = flicks; persist(); return true; } return false; },
  // pistas do editor
  customTracks(): any[] { return data.tracks; },
  saveTrack(t: any): void { const i = data.tracks.findIndex((x: any) => x.id === t.id); if (i >= 0) data.tracks[i] = t; else data.tracks.push(t); persist(); },
  deleteTrack(id: string): void { data.tracks = data.tracks.filter((x: any) => x.id !== id); persist(); },
};

// semente do dia (desafio diário determinístico)
export function todayKey(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
export function dailyTrackIndex(nTracks: number): number {
  const k = todayKey(); let h = 0; for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0;
  return Math.abs(h) % nTracks;
}
