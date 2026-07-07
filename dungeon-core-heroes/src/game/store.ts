import type { HeroId, SaveData, UpgradeCard } from '../types';
import { loadSave, persist, exportSave, importSave, newSave } from './save';
import { buildLoadout } from './loadout';
import { createRun, runEssence, type RunController } from './combat';
import { DUNGEONS, DUNGEON_BY_ID, FIRST_CLEAR_BONUS } from '../data/dungeonsData';
import { SKILL_BY_ID, SKILL_COSTS, SKILLS_BY_HERO } from '../data/skillsData';
import { EQUIP_BY_ID, EQUIPS_BY_HERO, EQUIP_COSTS, EQUIP_MILESTONES, POTION_COSTS, POTION_LEVELS, SKILL_MILESTONES } from '../data/equipmentData';
import {
  applyCardToEquipBonus, applyCardToSkillMods, chosenFromCard, generateOffer, type OfferCtx,
} from './cardGenerator';
import { reconcileAchievements, markEventAchievement } from './achievements';
import * as Audio from './audio';

export type Screen = 'title' | 'heroSelect' | 'hub' | 'run' | 'report' | 'bestiary' | 'achievements' | 'settings' | 'credits' | 'help';

export interface OfferState {
  kind: 'skill' | 'equip';
  targetId: string;
  fromLevel: number;
  cost: number;
  cards: UpgradeCard[];
  ctx: OfferCtx;
  isMilestone: boolean;
  rerollIndex: number;
}

export interface RunReport {
  heroId: HeroId; dungeonId: number; result: 'vitoria' | 'derrota';
  timeSec: number; kills: number; eliteKills: number; dmgDealt: number; dmgTaken: number;
  healed: number; potionsUsed: number; essence: number; firstClear: boolean; progress: number;
  dmgBySkill: number[]; deathCause?: string; unlockedDungeon?: number;
  newAchievements: string[]; recommendations: string[];
}

interface State {
  save: SaveData;
  screen: Screen;
  heroId: HeroId | null;
  ctrl: RunController | null;
  speed: 1 | 2 | 4;
  paused: boolean;
  offer: OfferState | null;
  report: RunReport | null;
  toast: { msg: string; kind: string } | null;
  version: number;
}

const st: State = {
  save: loadSave(),
  screen: 'title',
  heroId: null,
  ctrl: null,
  speed: 1,
  paused: false,
  offer: null,
  report: null,
  toast: null,
  version: 0,
};

// ============ REATIVIDADE (useSyncExternalStore) ============
const listeners = new Set<() => void>();
export function subscribe(fn: () => void): () => void { listeners.add(fn); return () => listeners.delete(fn); }
export function getSnapshot(): number { return st.version; }
function notify(): void { st.version++; listeners.forEach((l) => l()); }
function save(): void { persist(st.save); }
save(); // garante que o save exista no armazenamento desde o início

// ============ ACESSORES ============
export const Store = {
  get state() { return st; },
  get save() { return st.save; },
  get screen() { return st.screen; },
  get heroId() { return st.heroId; },
  get ctrl() { return st.ctrl; },
  get speed() { return st.speed; },
  get paused() { return st.paused; },
  get offer() { return st.offer; },
  get report() { return st.report; },
  get toast() { return st.toast; },
  heroProg(id: HeroId) { return st.save.heroes[id]; },
};

// ============ NAVEGAÇÃO ============
export function go(screen: Screen): void { st.screen = screen; if (screen !== 'run') { Audio.playMusic(menuTheme(screen)); } notify(); }
function menuTheme(s: Screen): number { return s === 'title' ? 0 : 1; }
export function selectHero(id: HeroId): void { st.heroId = id; st.screen = 'hub'; Audio.Sfx.click(); notify(); }
export function toast(msg: string, kind = 'info'): void { st.toast = { msg, kind }; notify(); window.setTimeout(() => { if (st.toast?.msg === msg) { st.toast = null; notify(); } }, 2600); }

// ============ EXPEDIÇÃO ============
export function startRun(dungeonId: number): void {
  const heroId = st.heroId; if (!heroId) return;
  const prog = st.save.heroes[heroId];
  const loadout = buildLoadout(heroId, prog);
  const seed = (st.save.seed ^ (dungeonId * 2654435761) ^ (prog.attempts * 40503)) >>> 0;
  st.ctrl = createRun(loadout, dungeonId, seed);
  st.speed = 1; st.paused = false; st.report = null;
  prog.attempts++;
  st.screen = 'run';
  Audio.playMusic(2 + ((dungeonId - 1) % 8));
  save(); notify();
}

export function setSpeed(s: 1 | 2 | 4): void { st.speed = s; Audio.Sfx.click(); notify(); }
export function togglePause(): void { st.paused = !st.paused; notify(); }
export function abandonRun(): void {
  if (!st.ctrl) return;
  st.ctrl.run.over = true; st.ctrl.run.result = 'derrota';
  commitRunEnd();
}

// chamado pela tela de run quando ctrl.run.over
let committed = false;
export function noteRunOverIfNeeded(): void {
  if (st.ctrl && st.ctrl.run.over && !committed) commitRunEnd();
}

function commitRunEnd(): void {
  const c = st.ctrl; if (!c) return;
  committed = true;
  const run = c.run, heroId = run.heroId, prog = st.save.heroes[heroId];
  const won = run.result === 'vitoria';
  let essence = runEssence(c);
  let firstClear = false, unlockedDungeon: number | undefined;
  if (won) {
    if (prog.wins[run.dungeonId - 1] === 0) {
      firstClear = true;
      essence += FIRST_CLEAR_BONUS[run.dungeonId] ?? 0;
      if (run.dungeonId < 10) { const nx = run.dungeonId + 1; if (prog.maxDungeon < nx) { prog.maxDungeon = nx; unlockedDungeon = nx; } }
    }
    prog.wins[run.dungeonId - 1]++;
    const bt = prog.bestTimes[run.dungeonId];
    if (bt == null || run.t < bt) prog.bestTimes[run.dungeonId] = run.t;
  }
  prog.essence += essence;
  st.save.globalEssence += essence;
  st.save.stats.totalRuns++;
  st.save.stats.totalEssence += essence;
  st.save.stats.totalKills += run.kills;
  if (won) st.save.stats.totalWins++;

  // conquistas de evento
  const newAch: string[] = [];
  if (won && run.potionsUsed === 0 && markEventAchievement(st.save, 'flawless')) newAch.push('flawless');
  if (won && run.t < 420 && markEventAchievement(st.save, 'speedrun')) newAch.push('speedrun');
  newAch.push(...reconcileAchievements(st.save));

  prog.runsHistory.unshift({ dungeonId: run.dungeonId, result: won ? 'vitoria' : 'derrota', timeSec: run.t, progress: run.progress, kills: run.kills, essence, date: Date.now() });
  if (prog.runsHistory.length > 30) prog.runsHistory.length = 30;

  st.report = {
    heroId, dungeonId: run.dungeonId, result: won ? 'vitoria' : 'derrota',
    timeSec: run.t, kills: run.kills, eliteKills: run.eliteKills, dmgDealt: Math.round(run.dmgDealt),
    dmgTaken: Math.round(run.dmgTaken), healed: Math.round(run.healed), potionsUsed: run.potionsUsed,
    essence, firstClear, progress: run.progress, dmgBySkill: run.dmgBySkill.map((x) => Math.round(x)),
    deathCause: run.deathCause, unlockedDungeon, newAchievements: newAch,
    recommendations: recommend(c),
  };
  st.ctrl = null;
  st.screen = 'report';
  committed = false;
  won ? Audio.Sfx.victory() : Audio.Sfx.defeat();
  Audio.playMusic(1);
  for (const id of newAch) window.setTimeout(() => toast(`Conquista: ${id}`, 'good'), 400);
  save(); notify();
}

// recomendações inteligentes pós-run
function recommend(c: RunController): string[] {
  const run = c.run, out: string[] = [];
  const skills = SKILLS_BY_HERO[run.heroId];
  if (run.result === 'derrota') {
    const worst = Object.entries(run.dmgTakenBy).sort((a, b) => b[1] - a[1])[0];
    if (worst) out.push(`Você sofreu mais dano de ${worst[0]}. Suba defesa, vida ou a poção para aguentar mais.`);
    if (run.potionsUsed >= run.potion.charges) out.push('Suas poções acabaram cedo — evoluir a poção (mais cura/cargas) ajuda a sobreviver.');
    if (run.progress > 0.9) out.push('Você quase venceu! Faltou pouco: reforce dano para derrubar o chefe mais rápido.');
    else out.push('Reforce o dano das suas habilidades principais para limpar as salas antes de ser cercado.');
  } else {
    if (run.t > 660) out.push('A expedição foi longa. Priorize cartas de dano para acelerar as próximas.');
    if (run.potionsUsed === 0) out.push('Você venceu sem poções — está pronto para uma dungeon mais difícil.');
    else out.push('Boa vitória! Suba habilidade e equipamento para encarar a próxima dungeon.');
  }
  // aponta a habilidade mais forte para investir
  const best = run.dmgBySkill.slice(0, 4).map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v)[0];
  if (best && skills[best.i]) out.push(`Sua habilidade de maior impacto foi "${skills[best.i].nome}". Vale investir cartas nela.`);
  return out;
}

// ============ ECONOMIA / MELHORIAS ============
export function skillLevel(id: string): number { const p = st.save.heroes[st.heroId!]; return p.skills[id]?.level ?? 1; }
export function equipLevel(id: string): number { const p = st.save.heroes[st.heroId!]; return p.equips[id]?.level ?? 1; }

export function skillUpgradeCost(id: string): number | null {
  const L = skillLevel(id); if (L >= 10) return null; return SKILL_COSTS[L - 1];
}
export function equipUpgradeCost(id: string): number | null {
  const L = equipLevel(id); if (L >= 20) return null; return EQUIP_COSTS[L - 1];
}
export function potionUpgradeCost(): number | null {
  const p = st.save.heroes[st.heroId!]; if (p.potionLevel >= 5) return null; return POTION_COSTS[p.potionLevel - 1];
}

function offerCtxFor(kind: 'skill' | 'equip', targetId: string, fromLevel: number): OfferCtx {
  const prog = st.save.heroes[st.heroId!];
  const state = kind === 'skill' ? prog.skills[targetId] : prog.equips[targetId];
  const owned = kind === 'equip' ? prog.equips[targetId].procs.map(procId) : [];
  return {
    seedRun: (st.save.seed ^ st.save.cardSerial * 2654435761) >>> 0,
    kind, targetId, fromLevel, rerollIndex: 0, sealBonus: 0,
    deepestDungeon: prog.maxDungeon, refused: prog.refusedCounts,
    ownedPools: owned, chosenCards: state.cards,
  };
}
function procId(p: { effect: string; when: string }): string { return `${p.when}:${p.effect}`; }

export function requestUpgrade(kind: 'skill' | 'equip', targetId: string): void {
  const prog = st.save.heroes[st.heroId!];
  const fromLevel = kind === 'skill' ? prog.skills[targetId].level : prog.equips[targetId].level;
  const cost = kind === 'skill' ? skillUpgradeCost(targetId) : equipUpgradeCost(targetId);
  if (cost == null || prog.essence < cost) { toast('Essência insuficiente.', 'danger'); return; }
  const ctx = offerCtxFor(kind, targetId, fromLevel);
  const newLevel = fromLevel + 1;
  const isMilestone = kind === 'skill'
    ? (newLevel === SKILL_MILESTONES.mutation || newLevel === SKILL_MILESTONES.evolution)
    : EQUIP_MILESTONES.includes(newLevel);
  st.offer = { kind, targetId, fromLevel, cost, cards: generateOffer(ctx), ctx, isMilestone, rerollIndex: 0 };
  Audio.Sfx.click();
  notify();
}

export function rerollOffer(): void {
  if (!st.offer || st.save.rerollRunes <= 0) { toast('Sem Runas de Reescolha.', 'danger'); return; }
  st.save.rerollRunes--;
  const o = st.offer; o.rerollIndex++;
  o.ctx.rerollIndex = o.rerollIndex;
  o.cards = generateOffer(o.ctx);
  Audio.Sfx.click(); save(); notify();
}
export function sealOffer(): void {
  if (!st.offer || st.save.choiceSeals <= 0) { toast('Sem Selos de Escolha.', 'danger'); return; }
  st.save.choiceSeals--;
  const o = st.offer; o.ctx.sealBonus = 1; o.rerollIndex++; o.ctx.rerollIndex = o.rerollIndex;
  o.cards = generateOffer(o.ctx);
  toast('Selo aplicado: raridade garantida!', 'good');
  Audio.Sfx.card(3); save(); notify();
}
export function cancelOffer(): void { st.offer = null; Audio.Sfx.click(); notify(); }

export function pickCard(card: UpgradeCard): void {
  const o = st.offer; if (!o) return;
  const prog = st.save.heroes[st.heroId!];
  if (prog.essence < o.cost) { toast('Essência insuficiente.', 'danger'); st.offer = null; notify(); return; }
  prog.essence -= o.cost;
  const newLevel = o.fromLevel + 1;
  // registra recusa das cartas não escolhidas (anti-repetição)
  for (const other of o.cards) if (other.uid !== card.uid) prog.refusedCounts[other.poolId] = (prog.refusedCounts[other.poolId] ?? 0) + 1;

  if (o.kind === 'skill') {
    const sState = prog.skills[o.targetId];
    sState.level = newLevel;
    sState.cards.push(chosenFromCard(card, newLevel));
    if (card.apply.kind === 'skill-mod') applyCardToSkillMods(sState.mods, card);
    else if (card.apply.kind === 'mutation') sState.mutation = card.apply.mutationId;
    else if (card.apply.kind === 'evolution') sState.evolution = card.apply.evolutionId;
  } else {
    const eState = prog.equips[o.targetId];
    eState.level = newLevel;
    eState.cards.push(chosenFromCard(card, newLevel));
    if (card.apply.kind === 'stat') applyCardToEquipBonus(eState.bonus, card);
    else if (card.apply.kind === 'proc') eState.procs.push(card.apply.proc);
  }
  // estatísticas de raridade
  st.save.stats.totalCards++;
  if (card.raridade === 'rara') st.save.stats.rareCards++;
  if (card.raridade === 'epica') st.save.stats.epicCards++;
  if (card.raridade === 'lendaria') st.save.stats.legendaryCards++;
  st.save.cardSerial++;
  reconcileAchievements(st.save);
  Audio.Sfx.card(['comum', 'incomum', 'rara', 'epica', 'lendaria'].indexOf(card.raridade));
  st.offer = null;
  save(); notify();
}

export function upgradePotion(): void {
  const prog = st.save.heroes[st.heroId!];
  const cost = potionUpgradeCost();
  if (cost == null) return;
  if (prog.essence < cost) { toast('Essência insuficiente.', 'danger'); return; }
  prog.essence -= cost; prog.potionLevel++;
  Audio.Sfx.coin(); reconcileAchievements(st.save); save(); notify();
  toast(`Poção evoluída ao nível ${prog.potionLevel}!`, 'good');
}

// ============ CONFIG / SAVE ============
export function setVolume(key: 'volMaster' | 'volMusic' | 'volSfx' | 'volAmbient', v: number): void {
  st.save.settings[key] = v;
  Audio.setVolumes({ master: st.save.settings.volMaster, music: st.save.settings.volMusic, sfx: st.save.settings.volSfx, ambient: st.save.settings.volAmbient });
  save(); notify();
}
export function toggleLog(): void { st.save.settings.showLog = !st.save.settings.showLog; save(); notify(); }
export function doExport(): string { return exportSave(st.save); }
export function doImport(code: string): boolean {
  const s = importSave(code); if (!s) return false;
  st.save = s; save(); notify(); return true;
}
export function hardReset(): void { st.save = newSave(); st.heroId = null; st.screen = 'title'; save(); notify(); }

export function initAudioFromSave(): void {
  Audio.setVolumes({ master: st.save.settings.volMaster, music: st.save.settings.volMusic, sfx: st.save.settings.volSfx, ambient: st.save.settings.volAmbient });
}

export { DUNGEONS, DUNGEON_BY_ID, SKILL_BY_ID, EQUIP_BY_ID, SKILLS_BY_HERO, EQUIPS_BY_HERO, POTION_LEVELS };
