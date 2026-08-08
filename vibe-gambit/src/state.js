// =============================================================================
// state.js — ESTADO GLOBAL do jogo (objeto único, serializável).
//   - Guarda só o que é MUTÁVEL do jogador (recursos, forja, gambits salvos,
//     fases destravadas, progresso). As "receitas" ficam em data.js.
//   - Persistência simples em LocalStorage (save/load).
// =============================================================================

import { HERO_DEFS, RESOURCES_INIT, STAGES, CONDITIONS, STARTER_INVENTORY, ITEMS, starterSkills } from './data.js';

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
      level: 1, xp: 0, lp: 0,                   // progressão (License Board)
      unlockedSkills: starterSkills(h),         // ações liberadas (o resto na prancha)
      augments: {},                             // aumentos de atributo comprados com LP
      boughtNodes: [],                          // ids de nós da prancha já comprados
    })),
    inventory: [...STARTER_INVENTORY],          // itens possuídos (não equipados)
    activeParty: HERO_DEFS.slice(0, 4).map(h => h.id),  // heróis que vão à expedição (máx 4)
    stagesUnlocked: Object.fromEntries(STAGES.map(s => [s.id, s.unlocked])),
    progress: { currentStage: 'mossy_glen', clears: 0 },
  };
}

// Garante campos novos em saves antigos (migração leve, não-destrutiva).
export function migrate(state){
  if(!state) return state;
  if(!Array.isArray(state.inventory)) state.inventory = [...STARTER_INVENTORY];
  // adiciona heróis (classes) novos que ainda não existem no save
  state.heroes = Array.isArray(state.heroes) ? state.heroes : [];
  for(const def of HERO_DEFS){
    if(!state.heroes.find(h => h.id === def.id)){
      state.heroes.push({
        id: def.id, weaponLevel: def.weaponLevel, slots: def.slots,
        gambits: def.gambits.map(g => ({ ...g })),
        equip: { head:null, chest:null, hands:null, feet:null, weapon:null, trinket:null },
      });
    }
  }
  // party ativa (máx 4). default: 4 primeiras classes.
  if(!Array.isArray(state.activeParty) || !state.activeParty.length)
    state.activeParty = HERO_DEFS.slice(0, 4).map(h => h.id);
  state.activeParty = state.activeParty.filter(id => HERO_DEFS.some(h => h.id === id)).slice(0, 4);
  // garante que as condições STARTER novas (Fase 1) fiquem disponíveis em saves antigos
  const starters = Object.values(CONDITIONS).filter(c => c.starter).map(c => c.id);
  if(!Array.isArray(state.unlockedConditions)) state.unlockedConditions = [];
  for(const id of starters) if(!state.unlockedConditions.includes(id)) state.unlockedConditions.push(id);
  for(const hs of state.heroes || []){
    const base = { head:null, chest:null, hands:null, feet:null, weapon:null, trinket:null };
    hs.equip = Object.assign(base, hs.equip || {});
    // saves antigos usavam 'armor' -> migra p/ 'chest'
    if(hs.equip.armor){ if(!hs.equip.chest) hs.equip.chest = hs.equip.armor; delete hs.equip.armor; }
    // remove itens equipados que não existem mais (troca da escada de armadura)
    for(const k of Object.keys(hs.equip)) if(hs.equip[k] && !ITEMS[hs.equip[k]]) hs.equip[k] = null;
    // progressão (License Board) em saves antigos
    const def = HERO_DEFS.find(d => d.id === hs.id);
    if(typeof hs.level !== 'number') hs.level = 1;
    if(typeof hs.xp !== 'number') hs.xp = 0;
    if(typeof hs.lp !== 'number') hs.lp = 0;
    if(!hs.augments || typeof hs.augments !== 'object') hs.augments = {};
    if(!Array.isArray(hs.boughtNodes)) hs.boughtNodes = [];
    if(!Array.isArray(hs.unlockedSkills)) hs.unlockedSkills = def ? starterSkills(def) : ['basic_attack'];
    // garante que skills usadas nas gambits atuais estejam desbloqueadas
    for(const g of hs.gambits || []) if(g.action && !hs.unlockedSkills.includes(g.action)) hs.unlockedSkills.push(g.action);
  }
  // limpa inventário de ids antigos; se ficar vazio, repõe o inicial
  state.inventory = (state.inventory || []).filter(id => ITEMS[id]);
  if(!state.inventory.length) state.inventory = [...STARTER_INVENTORY];
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
