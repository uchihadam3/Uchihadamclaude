// =============================================================================
// state.js — ESTADO GLOBAL do jogo (objeto único, serializável).
//   - Guarda só o que é MUTÁVEL do jogador (recursos, forja, gambits salvos,
//     fases destravadas, progresso). As "receitas" ficam em data.js.
//   - Persistência simples em LocalStorage (save/load).
// =============================================================================

import { HERO_DEFS, RESOURCES_INIT, STAGES, CONDITIONS } from './data.js';

const SAVE_KEY = 'vibe_gambit_save_v1';

// Cria um jogo novo (estado de fábrica).
export function newGame(){
  return {
    version: 1,
    resources: { ...RESOURCES_INIT },
    // Condições GLOBAIS desbloqueadas (a loja da Academia adiciona novas).
    unlockedConditions: Object.values(CONDITIONS).filter(c => c.starter).map(c => c.id),
    heroes: HERO_DEFS.map(h => ({
      id: h.id,
      weaponLevel: h.weaponLevel,
      slots: h.slots,                          // linhas de gambit ativas (2..maxSlots)
      gambits: h.gambits.map(g => ({ ...g })), // cópia editável
    })),
    stagesUnlocked: Object.fromEntries(STAGES.map(s => [s.id, s.unlocked])),
    progress: { currentStage: 'mossy_glen', clears: 0 },
  };
}

// Persistência (silenciosa se LocalStorage indisponível, ex.: node/headless).
export function save(state){
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}
export function load(){
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}
export function loadOrNew(){ return load() || newGame(); }
export function wipe(){ try { localStorage.removeItem(SAVE_KEY); } catch {} }
