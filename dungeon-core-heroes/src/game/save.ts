import type { HeroId, SaveData } from '../types';
import { HEROES } from '../data/heroesData';
import { defaultHeroProgress } from './loadout';

const KEY = 'dch.save.v1';
const VERSION = 1;

export function newSave(seed?: number): SaveData {
  const heroes = {} as SaveData['heroes'];
  for (const h of HEROES) heroes[h.id] = defaultHeroProgress(h.id);
  return {
    version: VERSION,
    seed: seed ?? (Math.floor(Math.random() * 1e9) >>> 0),
    createdAt: Date.now(),
    heroes,
    globalEssence: 0,
    rerollRunes: 3,
    choiceSeals: 1,
    achievements: {},
    stats: {
      totalRuns: 0, totalWins: 0, totalKills: 0, totalEssence: 0,
      totalCards: 0, rareCards: 0, epicCards: 0, legendaryCards: 0,
      fireDamage: 0, poisonExplosions: 0, bossFastKill: 0, critKills: 0,
    },
    settings: { volMaster: 0.8, volMusic: 0.55, volSfx: 0.8, volAmbient: 0.5, showLog: true },
    cardSerial: 0,
  };
}

export function migrate(data: Partial<SaveData>): SaveData {
  const base = newSave(data.seed);
  const out: SaveData = { ...base, ...data, version: VERSION } as SaveData;
  // garante todos os heróis (forward-compat)
  out.heroes = { ...base.heroes } as SaveData['heroes'];
  for (const h of HEROES) {
    const src = data.heroes?.[h.id];
    out.heroes[h.id] = src ? { ...defaultHeroProgress(h.id), ...src } : defaultHeroProgress(h.id);
    // completa skills/equips ausentes
    const def = defaultHeroProgress(h.id);
    out.heroes[h.id].skills = { ...def.skills, ...(src?.skills ?? {}) };
    out.heroes[h.id].equips = { ...def.equips, ...(src?.equips ?? {}) };
    if (!Array.isArray(out.heroes[h.id].wins) || out.heroes[h.id].wins.length < 10) out.heroes[h.id].wins = def.wins;
  }
  out.stats = { ...base.stats, ...(data.stats ?? {}) };
  out.settings = { ...base.settings, ...(data.settings ?? {}) };
  out.achievements = data.achievements ?? {};
  return out;
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return newSave();
    return migrate(JSON.parse(raw));
  } catch {
    return newSave();
  }
}

export function persist(data: SaveData): void {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* cota cheia */ }
}

export function exportSave(data: SaveData): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

export function importSave(code: string): SaveData | null {
  try {
    const json = decodeURIComponent(escape(atob(code.trim())));
    return migrate(JSON.parse(json));
  } catch {
    return null;
  }
}

export function heroUnlocked(_h: HeroId): boolean { return true; } // todos jogáveis desde o início
