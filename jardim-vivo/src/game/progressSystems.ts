import type { PropagationMethod, QuestData } from '../types';
import { PLANT_BY_ID } from '../data/plants';
import { ALL_QUESTS, QUEST_BY_ID } from '../data/questsData';
import { NPCS, NPC_BY_ID } from '../data/npcData';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { AREA_BY_ID } from '../data/areasData';
import { G, addMoney, addReputation, discoveredCount, isDead } from './gameState';
import { computeHarmony } from './gardenScoring';
import { absoluteDay } from './gameTime';
import { sfx } from '../audio/audioEngine';

// ---------- fila de toasts ----------
export interface Toast { id: number; kind: 'quest' | 'achievement' | 'npc' | 'info' | 'warn' | 'bloom' | 'death' | 'competition'; textPT: string; textEN: string }
let toastId = 1;
export const toasts: Toast[] = [];
export function pushToast(kind: Toast['kind'], textPT: string, textEN: string): void {
  toasts.push({ id: toastId++, kind, textPT, textEN });
  if (toasts.length > 5) toasts.shift();
}
export function dismissToast(id: number): void {
  const i = toasts.findIndex((t) => t.id === id);
  if (i >= 0) toasts.splice(i, 1);
}

// ---------- eventos de gameplay ----------
export type GameEvent =
  | { type: 'clear-debris' }
  | { type: 'plant'; plantId: string; category: string }
  | { type: 'water' }
  | { type: 'prune' }
  | { type: 'heal-plant' }
  | { type: 'sell'; what: string; value: number }
  | { type: 'mix-soil'; components: { id: string; parts: number }[] }
  | { type: 'propagate'; method: PropagationMethod }
  | { type: 'harvest-flower'; color?: string }
  | { type: 'harvest-seeds'; plantId: string }
  | { type: 'stage-reached'; plantId: string; stage: string; category: string }
  | { type: 'enter-competition' }
  | { type: 'win-competition'; competitionId: string }
  | { type: 'unlock-area'; areaId: string }
  | { type: 'deliver-color'; color: string; count: number }
  | { type: 'arrangement'; style: string }
  | { type: 'friendship'; npcId: string; level: number }
  | { type: 'restoration'; siteId: string };

function goalMatches(q: QuestData, ev: GameEvent): number {
  const g = q.goal;
  switch (g.type) {
    case 'clear-debris': return ev.type === 'clear-debris' ? 1 : 0;
    case 'plant-count': return ev.type === 'plant' && (!g.category || ev.category === g.category) ? 1 : 0;
    case 'water-count': return ev.type === 'water' ? 1 : 0;
    case 'heal-plant': return ev.type === 'heal-plant' ? 1 : 0;
    case 'sell': return ev.type === 'sell' && (!g.what || ev.what === g.what) ? 1 : 0;
    case 'mix-soil': return ev.type === 'mix-soil' ? 1 : 0;
    case 'propagate': return ev.type === 'propagate' && (!g.method || ev.method === g.method) ? 1 : 0;
    case 'grow-stage': return ev.type === 'stage-reached' && ev.stage === g.stage && (!g.plantId || ev.plantId === g.plantId) && (!g.category || ev.category === g.category) ? 1 : 0;
    case 'enter-competition': return ev.type === 'enter-competition' ? 1 : 0;
    case 'win-competition': return ev.type === 'win-competition' ? 1 : 0;
    case 'unlock-area': return ev.type === 'unlock-area' && ev.areaId === g.areaId ? 1 : 0;
    case 'deliver-color': return ev.type === 'deliver-color' && ev.color === g.color ? ev.count : 0;
    case 'arrangement': return ev.type === 'arrangement' && (!g.style || ev.style === g.style) ? 1 : 0;
    case 'friendship': return ev.type === 'friendship' && ev.npcId === g.npcId && ev.level >= g.level ? 999 : 0;
    case 'restoration': return ev.type === 'restoration' && ev.siteId === g.siteId ? 999 : 0;
    default: return 0;
  }
}

function goalTarget(q: QuestData): number {
  const g = q.goal as { count?: number; amount?: number; score?: number };
  return g.count ?? g.amount ?? g.score ?? 1;
}

export function onEvent(ev: GameEvent): void {
  for (const q of ALL_QUESTS) {
    const st = G.quests[q.id];
    if (!st || st.status !== 'active') continue;
    const inc = goalMatches(q, ev);
    if (inc > 0) {
      st.progress += inc;
      if (st.progress >= goalTarget(q)) completeQuest(q);
    }
  }
  checkPerfectAndStageQuests(ev);
  checkAchievements();
}

// checagens por snapshot (harmonia, coleção, dinheiro, perfeição)
export function checkSnapshotQuests(): void {
  for (const q of ALL_QUESTS) {
    const st = G.quests[q.id];
    if (!st || st.status !== 'active') continue;
    const g = q.goal;
    if (g.type === 'harmony') {
      const h = computeHarmony();
      st.progress = h.total;
      if (h.total >= g.score) completeQuest(q);
    } else if (g.type === 'earn-money') {
      st.progress = G.stats.totalEarned;
      if (G.stats.totalEarned >= g.amount) completeQuest(q);
    } else if (g.type === 'collection') {
      st.progress = discoveredCount();
      if (st.progress >= g.count) completeQuest(q);
    } else if (g.type === 'perfect-plant') {
      const n = G.plants.filter((p) => !isDead(p) && p.quality >= 90 && p.health >= 90 && (!g.plantId || p.plantId === g.plantId) && (!g.category || PLANT_BY_ID[p.plantId].category === g.category)).length;
      st.progress = n;
      if (n >= g.count) completeQuest(q);
    }
  }
}

function checkPerfectAndStageQuests(ev: GameEvent): void {
  if (ev.type === 'stage-reached' || ev.type === 'sell') checkSnapshotQuests();
}

function completeQuest(q: QuestData): void {
  const st = G.quests[q.id];
  if (st.status === 'done') return;
  st.status = 'done';
  addMoney(q.rewardMoney);
  addReputation(q.rewardRep);
  if (q.rewardItems) {
    for (const it of q.rewardItems) {
      const bag = { seed: G.inventory.seeds, pot: G.inventory.pots, tool: null, decor: G.inventory.decor, soil: G.inventory.soilMixes }[it.kind];
      if (it.kind === 'tool') G.inventory.tools[it.id] = true;
      else if (bag) bag[it.id] = (bag[it.id] ?? 0) + it.qty;
    }
  }
  // destrava próximas
  for (const next of ALL_QUESTS) {
    if (next.requires === q.id && G.quests[next.id].status === 'locked') {
      G.quests[next.id].status = 'active';
    }
  }
  pushToast('quest', `Missão concluída: ${q.titlePT}!`, `Quest complete: ${q.titleEN}!`);
  sfx('quest');
}

// ---------- amizade ----------
export function addFriendship(npcId: string, n: number): void {
  const st = G.npcs[npcId];
  if (!st) return;
  st.friendship = Math.min(100, st.friendship + n);
  const newLevel = Math.floor(st.friendship / 20);
  if (newLevel > st.level) {
    st.level = newLevel;
    const npc = NPC_BY_ID[npcId];
    pushToast('npc', `${npc.namePT} agora é amizade nível ${newLevel}!`, `${npc.nameEN} is now friendship level ${newLevel}!`);
    const reward = npc.friendshipRewards.find((r) => r.level === newLevel);
    if (reward) pushToast('npc', `Recompensa: ${reward.rewardPT}`, `Reward: ${reward.rewardEN}`);
    onEvent({ type: 'friendship', npcId, level: newLevel });
    sfx('quest');
  }
}

// ---------- pedidos de NPC ----------
export function rollNpcRequests(): void {
  const absDay = absoluteDay(G.calendar);
  for (const npc of NPCS) {
    const st = G.npcs[npc.id];
    if (!st.met) continue;
    if (st.activeRequest) {
      if (absDay > st.activeRequest.deadlineDay) {
        st.activeRequest = null; // expirou em silêncio
      }
      continue;
    }
    // 25% de chance por dia de novo pedido
    if (Math.random() < 0.25) {
      const pool = npc.requestPool.filter((r) => (r.minFriendship ?? 0) <= st.friendship && (!r.seasons || r.seasons.includes(G.calendar.season)));
      if (pool.length) {
        const t = pool[Math.floor(Math.random() * pool.length)];
        st.activeRequest = { templateId: t.id, deadlineDay: absDay + 7, progress: 0 };
      }
    }
  }
}

export function fulfillRequest(npcId: string): { ok: boolean; msg?: { pt: string; en: string } } {
  const st = G.npcs[npcId];
  const npc = NPC_BY_ID[npcId];
  if (!st?.activeRequest) return { ok: false };
  const tpl = npc.requestPool.find((r) => r.id === st.activeRequest!.templateId);
  if (!tpl) { st.activeRequest = null; return { ok: false }; }
  const tgt = tpl.target;

  if (tpl.kind === 'flowers-color') {
    // consome flores da cor pedida
    let need = tgt.count ?? 1;
    for (const [pid, qty] of Object.entries(G.inventory.flowers)) {
      if (need <= 0) break;
      const def = PLANT_BY_ID[pid];
      if (def.flowerColors.includes(tgt.color!) && qty > 0) {
        const take = Math.min(qty, need);
        G.inventory.flowers[pid] -= take;
        need -= take;
      }
    }
    if (need > 0) return { ok: false, msg: { pt: `Faltam ${need} flores ${tgt.color}s.`, en: `Missing ${need} ${tgt.color} flowers.` } };
    onEvent({ type: 'deliver-color', color: tgt.color!, count: tgt.count ?? 1 });
  } else if (tpl.kind === 'plant') {
    if (tgt.count && tgt.count > 50) {
      // meta especial (ex.: harmonia) — verificada externamente
      const h = computeHarmony();
      if (h.total < (tgt.count ?? 0)) return { ok: false, msg: { pt: `Harmonia atual: ${h.total}/${tgt.count}.`, en: `Current harmony: ${h.total}/${tgt.count}.` } };
    } else {
      // entrega planta viva do jardim
      const candidates = G.plants.filter((p) => !isDead(p)
        && (!tgt.plantId || p.plantId === tgt.plantId)
        && (!tgt.category || PLANT_BY_ID[p.plantId].category === tgt.category)
        && (!tgt.minQuality || p.quality >= tgt.minQuality)
        && ['juvenile', 'mature', 'budding', 'flowering', 'seeding'].includes(p.stage));
      const need = tgt.count ?? 1;
      if (candidates.length < need) return { ok: false, msg: { pt: 'Você ainda não tem a(s) planta(s) pedida(s) crescida(s) e saudável(is).', en: 'You don\'t yet have the requested grown healthy plant(s).' } };
      candidates.sort((a, b) => a.quality - b.quality);
      for (let i = 0; i < need; i++) {
        const p = candidates[i];
        const idx = G.plants.indexOf(p);
        if (p.potId) G.inventory.pots[p.potId] = (G.inventory.pots[p.potId] ?? 0) + 1;
        if (idx >= 0) G.plants.splice(idx, 1);
      }
    }
  } else if (tpl.kind === 'herb-bundle') {
    const need = tgt.count ?? 1;
    const candidates = G.plants.filter((p) => !isDead(p)
      && (!tgt.plantId || p.plantId === tgt.plantId)
      && (!tgt.category || PLANT_BY_ID[p.plantId].category === tgt.category)
      && ['juvenile', 'mature', 'budding', 'flowering'].includes(p.stage));
    if (tgt.plantId) {
      // maços da mesma erva: uma planta adulta rende os maços (poda)
      if (!candidates.length) return { ok: false, msg: { pt: 'Cultive a erva pedida primeiro.', en: 'Grow the requested herb first.' } };
      candidates[0].health = Math.max(20, candidates[0].health - 10);
    } else {
      const distinct = new Set(candidates.map((c) => c.plantId));
      if (distinct.size < need) return { ok: false, msg: { pt: `Precisa de ${need} ervas diferentes crescidas.`, en: `Need ${need} different grown herbs.` } };
    }
  } else if (tpl.kind === 'arrangement') {
    const idx = G.inventory.arrangements.findIndex((a) => a.style === tgt.arrangementStyle);
    if (idx < 0) return { ok: false, msg: { pt: 'Monte o arranjo pedido primeiro.', en: 'Craft the requested arrangement first.' } };
    G.inventory.arrangements.splice(idx, 1);
  }

  addMoney(tpl.rewardMoney);
  addReputation(tpl.rewardRep);
  addFriendship(npcId, tpl.rewardFriendship);
  st.activeRequest = null;
  st.completedRequests++;
  sfx('quest');
  return { ok: true, msg: { pt: `${npc.namePT} adorou! +${tpl.rewardMoney} moedas.`, en: `${npc.nameEN} loved it! +${tpl.rewardMoney} coins.` } };
}

// ---------- conquistas ----------
export function checkAchievements(): void {
  const absDay = absoluteDay(G.calendar);
  const done = (id: string) => { if (!G.achievements[id]) { G.achievements[id] = absDay; const a = ACHIEVEMENTS.find((x) => x.id === id)!; pushToast('achievement', `Conquista: ${a.namePT}!`, `Achievement: ${a.nameEN}!`); sfx('achievement'); } };
  const bloomTotal = Object.values(G.plantapedia).reduce((s, e) => s + e.timesBloomed, 0);
  for (const a of ACHIEVEMENTS) {
    if (G.achievements[a.id]) continue;
    let v = 0;
    switch (a.check) {
      case 'planted': v = G.stats.totalPlanted; break;
      case 'bloomed': v = bloomTotal; break;
      case 'perfect': v = G.plants.filter((p) => p.quality >= 90 && p.health >= 90).length; break;
      case 'species': v = discoveredCount(); break;
      case 'category-master': {
        v = G.plants.filter((p) => PLANT_BY_ID[p.plantId].category === a.extra && !isDead(p) && ['mature', 'budding', 'flowering', 'seeding'].includes(p.stage)).length;
        // também conta histórico de floração p/ orquídeas
        if (a.extra === 'orchid') v = Math.max(v, Object.entries(G.plantapedia).filter(([id, e]) => PLANT_BY_ID[id]?.category === 'orchid' && e.timesBloomed > 0).length);
        break;
      }
      case 'pollinators': v = G.stats.visitorsReceived * 2; break;
      case 'pots': v = Object.keys(G.inventory.pots).filter((k) => (G.inventory.pots[k] ?? 0) > 0).length + G.plants.filter((p) => p.potId).length; break;
      case 'competition-win': v = a.extra ? G.competitionHistory.filter((c) => c.competitionId === a.extra && c.placement === 1).length : G.stats.competitionsWon; break;
      case 'no-dead-days': v = G.stats.daysWithoutDeadPlants; break;
      case 'propagated': v = G.stats.totalPropagated; break;
      case 'rare': v = G.plants.filter((p) => ['rare', 'very-rare', 'legendary'].includes(PLANT_BY_ID[p.plantId].rarity) && ['mature', 'budding', 'flowering'].includes(p.stage)).length; break;
      case 'bonsai-year': v = G.plants.filter((p) => PLANT_BY_ID[p.plantId].category === 'bonsai-tree' && !isDead(p) && p.ageDays >= 336).length; break;
      case 'greenhouse-full': v = G.plants.filter((p) => p.areaId === 'estufa' && !isDead(p) && p.health >= 60).length; break;
      case 'harmony': v = computeHarmony().total; break;
      case 'final': v = G.quests['jardim-vivo-final']?.status === 'done' ? 1 : 0; break;
      case 'sold': v = G.stats.totalSold; break;
      case 'arrangements': v = G.stats.arrangementsMade; break;
      case 'visitors': v = G.stats.visitorsReceived; break;
      case 'restorations': v = G.quests ? Object.keys(G.achievements).filter((k) => k.startsWith('rest-done-')).length : 0; break;
      case 'earned': v = G.stats.totalEarned; break;
    }
    if (v >= a.target) done(a.id);
  }
}

// ---------- áreas ----------
export function unlockArea(areaId: string): { ok: boolean; msg?: { pt: string; en: string } } {
  const area = AREA_BY_ID[areaId];
  if (!area) return { ok: false };
  if (G.unlockedAreas.includes(areaId)) return { ok: false, msg: { pt: 'Já desbloqueada.', en: 'Already unlocked.' } };
  if (G.money < area.unlockPrice) return { ok: false, msg: { pt: `Faltam ${area.unlockPrice - G.money} moedas.`, en: `Missing ${area.unlockPrice - G.money} coins.` } };
  // pré-requisito adicional
  if (area.unlockRule.startsWith('npc:')) {
    const [, npcId, lvl] = area.unlockRule.split(':');
    if ((G.npcs[npcId]?.level ?? 0) < parseInt(lvl, 10)) {
      const npc = NPC_BY_ID[npcId];
      return { ok: false, msg: { pt: `Aumente a amizade com ${npc.namePT} (nível ${lvl}).`, en: `Raise friendship with ${npc.nameEN} (level ${lvl}).` } };
    }
  }
  if (area.unlockRule.startsWith('reputation:')) {
    const need = parseInt(area.unlockRule.split(':')[1], 10);
    if (G.reputation < need) return { ok: false, msg: { pt: `Reputação ${need} necessária.`, en: `Reputation ${need} required.` } };
  }
  addMoney(-area.unlockPrice);
  G.unlockedAreas.push(areaId);
  onEvent({ type: 'unlock-area', areaId });
  pushToast('info', `Nova área: ${area.namePT}!`, `New area: ${area.nameEN}!`);
  sfx('unlock');
  return { ok: true };
}

// conhecer NPC (primeira conversa)
export function meetNpc(npcId: string): void {
  const st = G.npcs[npcId];
  if (st && !st.met) {
    st.met = true;
    addFriendship(npcId, 5);
  }
}
