import type { AchievementDef, SaveData } from '../types';

// ============ CONQUISTAS ============
export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first-blood', nome: 'Primeiro Sangue', desc: 'Vença sua primeira expedição.', icon: 'ac-blood', reward: { essence: 100 }, check: 'totalWins', target: 1 },
  { id: 'd1-master', nome: 'Sentinela das Catacumbas', desc: 'Conquiste a Dungeon 1.', icon: 'ac-d1', reward: { essence: 150 }, check: 'clearD1', target: 1 },
  { id: 'halfway', nome: 'Meio do Caminho', desc: 'Conquiste a Dungeon 5 com qualquer herói.', icon: 'ac-half', reward: { rerollRunes: 2 }, check: 'clearD5', target: 1 },
  { id: 'the-heart', nome: 'O Coração', desc: 'Conquiste a Dungeon 10.', icon: 'ac-heart', reward: { choiceSeals: 3, essence: 2000 }, check: 'clearD10', target: 1 },
  { id: 'veteran', nome: 'Veterano', desc: 'Complete 25 expedições vitoriosas.', icon: 'ac-vet', reward: { essence: 500 }, check: 'totalWins', target: 25 },
  { id: 'slayer', nome: 'Ceifador', desc: 'Abata 1000 inimigos no total.', icon: 'ac-slay', reward: { essence: 400 }, check: 'totalKills', target: 1000 },
  { id: 'collector', nome: 'Colecionador de Cartas', desc: 'Escolha 100 cartas de melhoria.', icon: 'ac-cards', reward: { essence: 300 }, check: 'totalCards', target: 100 },
  { id: 'legendary', nome: 'Toque de Lenda', desc: 'Obtenha 5 cartas lendárias.', icon: 'ac-legend', reward: { choiceSeals: 1 }, check: 'legendaryCards', target: 5 },
  { id: 'rich', nome: 'Cofre Cheio', desc: 'Acumule 10.000 de essência no total.', icon: 'ac-gold', reward: { essence: 1000 }, check: 'totalEssence', target: 10000 },
  { id: 'evolved', nome: 'Metamorfose', desc: 'Evolua uma habilidade até o nível 10.', icon: 'ac-evo', reward: { essence: 600 }, check: 'anyEvolution', target: 1 },
  { id: 'maxed', nome: 'Arsenal Completo', desc: 'Leve um equipamento ao nível 20.', icon: 'ac-max', reward: { essence: 800 }, check: 'anyMaxEquip', target: 1 },
  { id: 'all-heroes', nome: 'Salão dos Heróis', desc: 'Vença a Dungeon 1 com todos os 10 heróis.', icon: 'ac-all', reward: { choiceSeals: 2, essence: 1500 }, check: 'd1AllHeroes', target: 10 },
  { id: 'flawless', nome: 'Impecável', desc: 'Vença uma expedição sem usar poções.', icon: 'ac-flaw', reward: { essence: 400 }, check: 'flawless', target: 1 },
  { id: 'speedrun', nome: 'Relâmpago', desc: 'Vença uma dungeon em menos de 7 minutos.', icon: 'ac-speed', reward: { rerollRunes: 3 }, check: 'speedrun', target: 1 },
];

export const ACH_BY_ID: Record<string, AchievementDef> = {};
for (const a of ACHIEVEMENTS) ACH_BY_ID[a.id] = a;

// avalia progresso de cada conquista a partir do save
export function evalAchievement(id: string, save: SaveData): number {
  const s = save.stats;
  switch (id) {
    case 'first-blood': case 'veteran': return s.totalWins;
    case 'slayer': return s.totalKills;
    case 'collector': return s.totalCards;
    case 'legendary': return s.legendaryCards;
    case 'rich': return s.totalEssence;
    case 'clearD1': return Object.values(save.heroes).some((h) => h.wins[0] > 0) ? 1 : 0;
    case 'clearD5': return Object.values(save.heroes).some((h) => h.wins[4] > 0) ? 1 : 0;
    case 'clearD10': return Object.values(save.heroes).some((h) => h.wins[9] > 0) ? 1 : 0;
    case 'anyEvolution': return Object.values(save.heroes).some((h) => Object.values(h.skills).some((sk) => sk.evolution)) ? 1 : 0;
    case 'anyMaxEquip': return Object.values(save.heroes).some((h) => Object.values(h.equips).some((e) => e.level >= 20)) ? 1 : 0;
    case 'd1AllHeroes': return Object.values(save.heroes).filter((h) => h.wins[0] > 0).length;
    default: return save.achievements[id] ?? 0;
  }
}

// retorna ids recém-desbloqueadas (para toasts + recompensas)
export function reconcileAchievements(save: SaveData): string[] {
  const unlocked: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (save.achievements[a.id] >= a.target) continue;
    const stateBased = ['first-blood', 'veteran', 'slayer', 'collector', 'legendary', 'rich',
      'clearD1', 'clearD5', 'clearD10', 'anyEvolution', 'anyMaxEquip', 'd1AllHeroes'];
    if (stateBased.includes(a.check)) {
      const v = evalAchievement(a.check === a.id ? a.id : a.check, save);
      if (v >= a.target) {
        save.achievements[a.id] = a.target;
        grant(save, a);
        unlocked.push(a.id);
      } else {
        save.achievements[a.id] = v;
      }
    }
  }
  return unlocked;
}

// conquistas orientadas a evento (chamadas no fim da run)
export function markEventAchievement(save: SaveData, id: string): boolean {
  const a = ACH_BY_ID[id];
  if (!a || (save.achievements[id] ?? 0) >= a.target) return false;
  save.achievements[id] = a.target;
  grant(save, a);
  return true;
}

function grant(save: SaveData, a: AchievementDef): void {
  if (a.reward.essence) save.globalEssence += a.reward.essence;
  if (a.reward.rerollRunes) save.rerollRunes += a.reward.rerollRunes;
  if (a.reward.choiceSeals) save.choiceSeals += a.reward.choiceSeals;
}
