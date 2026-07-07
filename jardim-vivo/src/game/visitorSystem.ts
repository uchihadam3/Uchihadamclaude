import { G, addMoney, addReputation, isDead } from './gameState';
import { PLANT_BY_ID } from '../data/plants';
import { DECOR_BY_ID } from '../data/decorData';
import { computeHarmony } from './gardenScoring';
import { rng } from './weatherSystem';
import { absoluteDay } from './gameTime';
import { pushToast } from './progressSystems';

// ============ VISITANTES E VIDA NO JARDIM ============

export type VisitorKind = 'turista' | 'colecionador' | 'artista' | 'estudante' | 'fotografo' | 'florista' | 'rival' | 'casal' | 'professor' | 'vizinho';

export interface ActiveVisitor {
  id: number;
  kind: VisitorKind;
  x: number; y: number;      // posição em tiles (float, para animar)
  targetX: number; targetY: number;
  areaId: string;
  leaveAt: number;           // minuto do dia
  commentPT: string; commentEN: string;
  palette: { skin: string; shirt: string; hair: string };
}

export const activeVisitors: ActiveVisitor[] = [];
let visitorId = 1;

const VISITOR_COMMENTS: Record<VisitorKind, { pt: string; en: string }[]> = {
  turista: [{ pt: 'Que lugar lindo para descansar!', en: 'What a lovely place to rest!' }, { pt: 'Vou contar desse jardim pra todo mundo.', en: 'I\'ll tell everyone about this garden.' }],
  colecionador: [{ pt: 'Hmm, é uma variedade rara essa ali?', en: 'Hmm, is that a rare variety over there?' }, { pt: 'Pagaria bem por uma muda daquela…', en: 'I\'d pay well for a cutting of that one…' }],
  artista: [{ pt: 'Essas cores… preciso do meu cavalete!', en: 'These colors… I need my easel!' }],
  estudante: [{ pt: 'Professor, isso é uma Lamiaceae, né?', en: 'Teacher, that\'s a Lamiaceae, right?' }],
  fotografo: [{ pt: 'A luz dourada nessas pétalas… clique!', en: 'The golden light on those petals… click!' }],
  florista: [{ pt: 'Flores dessa qualidade eu compro na hora.', en: 'Flowers this good I\'d buy on the spot.' }],
  rival: [{ pt: 'Nada mal. O MEU jardim, claro, é maior.', en: 'Not bad. MY garden, of course, is bigger.' }],
  casal: [{ pt: 'Amor, olha esse cantinho! Perfeito pra foto.', en: 'Honey, look at this corner! Perfect for a photo.' }],
  professor: [{ pt: 'Uma aula viva de botânica, isso sim.', en: 'A living botany lesson, that\'s what this is.' }],
  vizinho: [{ pt: 'Do outro lado da cerca já sinto o perfume.', en: 'I can smell the fragrance from across the fence.' }],
};

const VISITOR_PALETTES = [
  { skin: '#e8c0a0', shirt: '#c86868', hair: '#4a3020' },
  { skin: '#c89870', shirt: '#6888c8', hair: '#181818' },
  { skin: '#a87858', shirt: '#68a878', hair: '#2a1a10' },
  { skin: '#e8b890', shirt: '#c8a848', hair: '#b86838' },
  { skin: '#986848', shirt: '#8868c8', hair: '#181410' },
];

/** chamada diária: decide quantos visitantes virão */
export function rollDailyVisitors(): void {
  activeVisitors.length = 0;
  const h = computeHarmony();
  if (h.total < 60) { G.visitorsToday = 0; return; }
  const r = rng(absoluteDay(G.calendar) * 97 + 3);
  const base = Math.min(6, Math.floor(h.total / 90));
  G.visitorsToday = Math.max(0, Math.round(base * (0.6 + r() * 0.8)));
}

/** chamada por tick de hora: spawna visitantes ao longo do dia */
export function maybeSpawnVisitor(): void {
  const minute = G.calendar.minute;
  if (minute < 8 * 60 || minute > 17 * 60) return;
  if (activeVisitors.length >= G.visitorsToday || activeVisitors.length >= 3) return;
  const r = Math.random();
  if (r > 0.35) return;
  const kinds: VisitorKind[] = ['turista', 'colecionador', 'artista', 'estudante', 'fotografo', 'florista', 'rival', 'casal', 'professor', 'vizinho'];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const outdoorAreas = G.unlockedAreas.filter((a) => !['bancada', 'loja'].includes(a));
  const areaId = G.currentArea && outdoorAreas.includes(G.currentArea) ? G.currentArea : outdoorAreas[0];
  const comment = VISITOR_COMMENTS[kind][Math.floor(Math.random() * VISITOR_COMMENTS[kind].length)];
  activeVisitors.push({
    id: visitorId++, kind,
    x: -1, y: Math.random() * 3 + 1, targetX: 2 + Math.random() * 4, targetY: 1 + Math.random() * 3,
    areaId,
    leaveAt: minute + 90 + Math.random() * 120,
    commentPT: comment.pt, commentEN: comment.en,
    palette: VISITOR_PALETTES[Math.floor(Math.random() * VISITOR_PALETTES.length)],
  });
  G.stats.visitorsReceived++;
  // visitantes podem comprar flores/dar gorjeta
  if (['florista', 'colecionador', 'casal'].includes(kind)) {
    const flowers = Object.entries(G.inventory.flowers).filter(([, q]) => q > 0);
    if (flowers.length && Math.random() < 0.5) {
      const [pid] = flowers[Math.floor(Math.random() * flowers.length)];
      G.inventory.flowers[pid]--;
      const def = PLANT_BY_ID[pid];
      const value = Math.round(def.marketValue * 0.4) + 4;
      addMoney(value);
      pushToast('info', `Um ${kind} comprou uma flor de ${def.commonNamePT} (+${value})`, `A ${kind} bought a ${def.commonNameEN} bloom (+${value})`);
    } else if (Math.random() < 0.35) {
      const tip = 3 + Math.floor(Math.random() * 8);
      addMoney(tip);
      pushToast('info', `Gorjeta de visitante: +${tip} moedas!`, `Visitor tip: +${tip} coins!`);
    }
  }
  if (Math.random() < 0.3) addReputation(1);
}

/** animação por frame */
export function updateVisitors(dt: number): void {
  const minute = G.calendar.minute;
  for (let i = activeVisitors.length - 1; i >= 0; i--) {
    const v = activeVisitors[i];
    if (minute > v.leaveAt || v.areaId !== G.currentArea) {
      if (minute > v.leaveAt) activeVisitors.splice(i, 1);
      continue;
    }
    const dx = v.targetX - v.x, dy = v.targetY - v.y;
    const d = Math.hypot(dx, dy);
    if (d < 0.1) {
      if (Math.random() < 0.005) { v.targetX = Math.random() * 6; v.targetY = Math.random() * 4; }
    } else {
      v.x += (dx / d) * dt * 0.7;
      v.y += (dy / d) * dt * 0.7;
    }
  }
}

// ---------- polinizadores (criaturas visuais) ----------
export interface Critter {
  kind: 'bee' | 'butterfly' | 'ladybug' | 'hummingbird' | 'bird' | 'dragonfly';
  x: number; y: number; angle: number; speed: number; hue: number; targetUid: number | null;
}

export const critters: Critter[] = [];

export function refreshCritters(): void {
  critters.length = 0;
  const areaPlants = G.plants.filter((p) => p.areaId === G.currentArea && !isDead(p) && p.stage === 'flowering');
  let beeFood = 0, butterflyFood = 0, hummerFood = 0;
  for (const p of areaPlants) {
    const def = PLANT_BY_ID[p.plantId];
    if (def.attractsPollinators.includes('bees')) beeFood++;
    if (def.attractsPollinators.includes('butterflies')) butterflyFood++;
    if (def.attractsPollinators.includes('hummingbirds')) hummerFood++;
  }
  let birdBonus = 0, bugBonus = 0;
  for (const d of G.decors.filter((d) => d.areaId === G.currentArea)) {
    const dd = DECOR_BY_ID[d.decorId];
    if (dd.bonus?.type === 'birds') birdBonus += dd.bonus.value;
    if (dd.bonus?.type === 'butterflies') bugBonus += dd.bonus.value;
  }
  const add = (kind: Critter['kind'], n: number, hue: number) => {
    for (let i = 0; i < Math.min(n, 6); i++) {
      critters.push({ kind, x: Math.random() * 8, y: Math.random() * 5, angle: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.5, hue: hue + Math.random() * 40 - 20, targetUid: areaPlants.length ? areaPlants[Math.floor(Math.random() * areaPlants.length)].uid : null });
    }
  };
  add('bee', Math.floor(beeFood / 2), 45);
  add('butterfly', Math.floor((butterflyFood + bugBonus) / 2), 25);
  add('hummingbird', Math.floor(hummerFood / 3), 160);
  if (birdBonus > 2) add('bird', 1 + Math.floor(birdBonus / 4), 15);
  const areaHasWater = ['jardim-aquatico', 'jardim-japones', 'jardim-prestigio'].includes(G.currentArea);
  if (areaHasWater && areaPlants.length) add('dragonfly', 2, 200);
  if (areaPlants.some((p) => p.health > 85)) add('ladybug', 1, 5);
}
