// Persistência simples em localStorage: vitórias (desbloqueios), skin escolhida,
// volumes, melhor do desafio diário.
const KEY = 'tampinha_rally_v1';

// carreira POR TAMPINHA (XP cosmético): corridas, vitórias, pódios, quedas
export interface CapCareer { r: number; w: number; p: number; q: number; }
interface Save { wins: number; skin: string; music: number; sfx: number; muted: boolean; daily: Record<string, number>; trial: Record<string, number>; tracks: any[]; name: string; campaign?: any; bonus: string[]; capxp: Record<string, CapCareer>; }
const DEF: Save = { wins: 0, skin: 'refri', music: 0.5, sfx: 0.8, muted: false, daily: {}, trial: {}, tracks: [], name: '', bonus: [], capxp: {} };

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
  // carreira da tampinha: registra o resultado de UMA corrida com ela
  addCapRace(skin: string, place: number, falls: number): void {
    if (!data.capxp) data.capxp = {};
    const c = data.capxp[skin] || (data.capxp[skin] = { r: 0, w: 0, p: 0, q: 0 });
    c.r++; if (place === 1) c.w++; if (place >= 1 && place <= 3) c.p++; c.q += falls;
    persist();
  },
  capCareer(skin: string): CapCareer { return (data.capxp && data.capxp[skin]) || { r: 0, w: 0, p: 0, q: 0 }; },
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

// XP e NÍVEL da tampinha (cosmético — não muda os status!)
export function capXp(c: CapCareer): number { return c.r * 10 + c.w * 40 + c.p * 12; }
const XP_LV = [0, 60, 160, 320, 560, 900, 1350, 1950, 2700, 3600];
export function capLevel(c: CapCareer): number { const xp = capXp(c); let lv = 1; for (let i = 1; i < XP_LV.length; i++) if (xp >= XP_LV[i]) lv = i + 1; return lv; }
export function capLevelProgress(c: CapCareer): { lv: number; cur: number; next: number } {
  const xp = capXp(c); const lv = capLevel(c);
  const base = XP_LV[lv - 1] ?? 0; const next = XP_LV[lv] ?? XP_LV[XP_LV.length - 1];
  return { lv, cur: xp - base, next: Math.max(1, next - base) };
}
