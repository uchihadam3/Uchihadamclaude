// =============================================================================
// state.js — ESTADO GLOBAL do jogo (objeto único, serializável).
//   - Guarda só o que é MUTÁVEL do jogador (recursos, forja, gambits salvos,
//     fases destravadas, progresso). As "receitas" ficam em data.js.
//   - Persistência simples em LocalStorage (save/load).
// =============================================================================

import { HERO_DEFS, RESOURCES_INIT, STAGES, CONDITIONS, STARTER_INVENTORY } from './data.js';

const SAVE_KEY = 'vibe_gambit_save_v1';

// Cria um jogo novo (estado de fábrica).
export function newGame(){
  return {
    version: 2,
    resources: { ...RESOURCES_INIT },
    // Condições GLOBAIS desbloqueadas (a loja da Academia adiciona novas).
    unlockedConditions: Object.values(CONDITIONS).filter(c => c.starter).map(c => c.id),
    heroes: HERO_DEFS.map(h => ({
      id: h.id,
      weaponLevel: h.weaponLevel,
      slots: h.slots,                          // linhas de gambit ativas (2..maxSlots)
      gambits: h.gambits.map(g => ({ ...g })), // cópia editável
      equip: { head:null, chest:null, hands:null, feet:null, weapon:null, trinket:null },
    })),
    inventory: [...STARTER_INVENTORY],          // itens possuídos (não equipados)
    stagesUnlocked: Object.fromEntries(STAGES.map(s => [s.id, s.unlocked])),
    progress: { currentStage: 'mossy_glen', clears: 0 },
  };
}

// Garante campos novos em saves antigos (migração leve, não-destrutiva).
export function migrate(state){
  if(!state) return state;
  if(!Array.isArray(state.inventory)) state.inventory = [...STARTER_INVENTORY];
  // garante que as condições STARTER novas (Fase 1) fiquem disponíveis em saves antigos
  const starters = Object.values(CONDITIONS).filter(c => c.starter).map(c => c.id);
  if(!Array.isArray(state.unlockedConditions)) state.unlockedConditions = [];
  for(const id of starters) if(!state.unlockedConditions.includes(id)) state.unlockedConditions.push(id);
  for(const hs of state.heroes || []){
    const base = { head:null, chest:null, hands:null, feet:null, weapon:null, trinket:null };
    hs.equip = Object.assign(base, hs.equip || {});
    // saves antigos usavam 'armor' -> migra p/ 'chest'
    if(hs.equip.armor){ if(!hs.equip.chest) hs.equip.chest = hs.equip.armor; delete hs.equip.armor; }
  }
  return state;
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
export function loadOrNew(){ const s = load(); return s ? migrate(s) : newGame(); }
export function wipe(){ try { localStorage.removeItem(SAVE_KEY); } catch {} }
