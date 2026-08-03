// ============================================================================
// SAVE / CONTAS — camada TROCÁVEL de persistência do personagem.
//   • CharacterSave: o "blob" com TODO o estado de um personagem.
//   • SaveBackend: interface async (pronta p/ nuvem). Hoje: LocalBackend
//     (localStorage, com SLOTS). Amanhã: SupabaseBackend (login + nuvem) —
//     é só implementar a MESMA interface e trocar `backend`.
// ============================================================================
import type { ItemInstance, ArmorSlot } from "./items";
import type { WeaponInstance } from "./weapons";
import type { Primaries } from "./stats";

export const SAVE_VERSION = 1;
export const MAX_SLOTS = 3; // até 3 personagens por conta

export interface CharacterSave {
  v: number;
  slot: number;
  name: string;
  classId: string;
  createdAt: number;
  savedAt: number;
  // progressão
  level: number; xp: number; xpMax: number; gold: number;
  prim: Primaries; baseAttr: Primaries; unspent: number;
  hp: number; mp: number;
  // inventário / equipamento
  armorInv: ItemInstance[];
  equippedArmor: Partial<Record<ArmorSlot, ItemInstance>>;
  ownedWeapons: string[];
  currentWeapon: string | null;
  weaponInv: WeaponInstance[];        // armas dropadas na mochila
  equippedWeaponUid: string | null;   // arma-instância equipada (null = base)
  reinforce: Record<string, number>;
  consumables: Record<string, number>;
  materials: Record<string, number>;
  // skills / quests / baú
  skillRanks: Record<string, number>;
  mainQuests: Record<string, { status: string; step: number; progress: number }>;
  quests: Record<string, { status: string; progress: number }>;
  stash: { goods: Record<string, number>; weapons: string[]; reinforce: Record<string, number>; gold: number };
  dungeonMaxFloor: number; // checkpoint: andar mais fundo já alcançado
  portalUnlocked?: boolean; // Portal da cidade aceso (destrava ao vencer o 1º chefe)
  actsUnlocked?: number;    // até que ATO o portal leva (1 = só Ato I, 2 = Ato II)
}

// resumo p/ a tela de seleção de personagem (sem carregar o blob inteiro)
export interface SaveMeta {
  slot: number; name: string; classId: string; level: number; savedAt: number;
}

export interface SaveBackend {
  list(): Promise<SaveMeta[]>;
  load(slot: number): Promise<CharacterSave | null>;
  save(s: CharacterSave): Promise<void>;
  remove(slot: number): Promise<void>;
  lastSlot(): number | null;
  setLastSlot(slot: number): void;
}

// ---- LocalBackend: localStorage, um item por slot -------------------------
const KEY = (slot: number) => `gh-save-${slot}`;
const LAST_KEY = "gh-save-last";

class LocalBackend implements SaveBackend {
  async list(): Promise<SaveMeta[]> {
    const out: SaveMeta[] = [];
    for (let s = 0; s < MAX_SLOTS; s++) {
      const raw = this.read(s);
      if (raw) out.push({ slot: s, name: raw.name, classId: raw.classId, level: raw.level, savedAt: raw.savedAt });
    }
    return out;
  }
  async load(slot: number): Promise<CharacterSave | null> { return this.read(slot); }
  async save(s: CharacterSave): Promise<void> {
    try { localStorage.setItem(KEY(s.slot), JSON.stringify(s)); this.setLastSlot(s.slot); }
    catch { /* cota cheia / modo privado: ignora */ }
  }
  async remove(slot: number): Promise<void> {
    try { localStorage.removeItem(KEY(slot)); } catch { /* ignora */ }
    if (this.lastSlot() === slot) { try { localStorage.removeItem(LAST_KEY); } catch { /* ignora */ } }
  }
  lastSlot(): number | null {
    try { const v = localStorage.getItem(LAST_KEY); return v == null ? null : Number(v); } catch { return null; }
  }
  setLastSlot(slot: number): void { try { localStorage.setItem(LAST_KEY, String(slot)); } catch { /* ignora */ } }

  private read(slot: number): CharacterSave | null {
    try {
      const raw = localStorage.getItem(KEY(slot));
      if (!raw) return null;
      const s = JSON.parse(raw) as CharacterSave;
      return s && s.v === SAVE_VERSION ? s : null; // versão diferente → trata como vazio (evita quebrar)
    } catch { return null; }
  }
}

// backend LOCAL (localStorage) — usado pelo Convidado e como reserva.
export const localBackend: SaveBackend = new LocalBackend();
// backend ATIVO (live binding): o login troca p/ o SupabaseBackend na nuvem.
export let backend: SaveBackend = localBackend;
export function setActiveBackend(b: SaveBackend): void { backend = b; }
