import type { PlantInstance } from '../types';
import { PLANT_BY_ID } from '../data/plants';
import { DECOR_BY_ID } from '../data/decorData';
import { AREA_BY_ID } from '../data/areasData';
import { G, isDead, plantsInArea } from './gameState';

// ============ HARMONIA DO JARDIM ============

export interface HarmonyBreakdown {
  total: number;
  health: number;
  variety: number;
  colorHarmony: number;
  layers: number;
  flowering: number;
  foliage: number;
  pollinators: number;
  organization: number;
  rarity: number;
  theme: number;
  maintenance: number;
  decor: number;
  deadPenalty: number;
  themeName?: { pt: string; en: string };
}

const RARITY_PTS = { common: 1, uncommon: 2, rare: 4, 'very-rare': 7, legendary: 12 };

// grupos de cor harmônicos
const COLOR_WHEEL: Record<string, number> = {
  vermelho: 0, laranja: 30, amarelo: 60, verde: 120, azul: 220, roxo: 275, rosa: 330, magenta: 315, branco: -1, preto: -2, marrom: 25,
};

export function computeHarmony(): HarmonyBreakdown {
  const alive = G.plants.filter((p) => !isDead(p));
  const dead = G.plants.filter((p) => isDead(p));

  // saúde geral
  const healthAvg = alive.length ? alive.reduce((s, p) => s + p.health, 0) / alive.length : 0;
  const health = Math.round((healthAvg / 100) * alive.length * 2.2);

  // variedade
  const species = new Set(alive.map((p) => p.plantId));
  const categories = new Set(alive.map((p) => PLANT_BY_ID[p.plantId].category));
  const variety = Math.round(species.size * 2.5 + categories.size * 4);

  // harmonia de cores (flores abertas)
  const flowering = alive.filter((p) => p.stage === 'flowering');
  const hues: number[] = [];
  let whiteCount = 0;
  for (const p of flowering) {
    for (const c of PLANT_BY_ID[p.plantId].flowerColors) {
      const h = COLOR_WHEEL[c];
      if (h === -1) whiteCount++;
      else if (h >= 0) hues.push(h);
    }
  }
  let colorHarmony = 0;
  if (hues.length >= 2) {
    // agrupamentos análogos (<60º) e complementares (~180º) pontuam
    let harmonious = 0, clashing = 0;
    for (let i = 0; i < hues.length; i++) {
      for (let j = i + 1; j < hues.length; j++) {
        const d = Math.abs(hues[i] - hues[j]);
        const dist = Math.min(d, 360 - d);
        if (dist < 65 || Math.abs(dist - 180) < 25) harmonious++;
        else if (dist > 80 && dist < 150) clashing++;
      }
    }
    colorHarmony = Math.round(Math.max(0, harmonious * 2 - clashing) + whiteCount * 1.5);
  } else colorHarmony = whiteCount;

  // camadas de altura
  const heights = alive.map((p) => PLANT_BY_ID[p.plantId].heightCm[1]);
  const hasLow = heights.some((h) => h < 30), hasMid = heights.some((h) => h >= 30 && h < 90), hasTall = heights.some((h) => h >= 90);
  const layers = (hasLow ? 6 : 0) + (hasMid ? 6 : 0) + (hasTall ? 6 : 0);

  // floração e folhagens
  const floweringPts = Math.round(flowering.length * 3 + flowering.reduce((s, p) => s + p.quality / 100, 0) * 2);
  const foliagePlants = alive.filter((p) => { const d = PLANT_BY_ID[p.plantId]; return d.flowerColors.length === 0 && ['mature', 'juvenile'].includes(p.stage); });
  const foliage = Math.round(foliagePlants.length * 2);

  // polinizadores
  const polliPlants = flowering.filter((p) => PLANT_BY_ID[p.plantId].attractsPollinators.length > 0);
  let decorPolli = 0;
  for (const d of G.decors) {
    const dd = DECOR_BY_ID[d.decorId];
    if (dd.bonus?.type === 'butterflies' || dd.bonus?.type === 'birds') decorPolli += dd.bonus.value;
  }
  const pollinators = Math.round(polliPlants.length * 3 + decorPolli);

  // organização (caminhos, cercas, bônus de ordem)
  let orderPts = 0;
  for (const d of G.decors) {
    const dd = DECOR_BY_ID[d.decorId];
    if (dd.bonus?.type === 'order') orderPts += dd.bonus.value * 2;
  }
  const organization = Math.min(24, orderPts);

  // raridade
  const rarity = Math.round(alive.reduce((s, p) => s + RARITY_PTS[PLANT_BY_ID[p.plantId].rarity], 0) * 0.8);

  // tema coerente por área
  let theme = 0;
  let bestTheme: { pt: string; en: string } | undefined;
  for (const areaId of G.unlockedAreas) {
    const area = AREA_BY_ID[areaId];
    if (!area?.themeBonus) continue;
    const inArea = plantsInArea(areaId).filter((p) => !isDead(p));
    if (inArea.length < 4) continue;
    const catCount: Record<string, number> = {};
    for (const p of inArea) {
      const cat = PLANT_BY_ID[p.plantId].category;
      catCount[cat] = (catCount[cat] ?? 0) + 1;
    }
    const dominant = Math.max(...Object.values(catCount));
    if (dominant / inArea.length >= 0.6) {
      let themeDecor = 0;
      for (const d of G.decors.filter((dd) => dd.areaId === areaId)) {
        const def = DECOR_BY_ID[d.decorId];
        if (def.bonus?.type === 'theme') themeDecor += def.bonus.value;
      }
      theme += 10 + inArea.length + themeDecor;
      bestTheme = { pt: area.namePT, en: area.nameEN };
    }
  }

  // manutenção
  const stressed = alive.filter((p) => p.stress.length > 0 || p.pests.length > 0 || p.disease).length;
  const maintenance = Math.round(Math.max(0, (alive.length - stressed * 2) * 1.2));

  // decoração / iluminação
  const decorPts = Math.round(G.decors.reduce((s, d) => s + DECOR_BY_ID[d.decorId].beauty, 0) * 0.6);

  // plantas mortas penalizam MUITO
  const deadPenalty = dead.length * 12;

  const total = Math.max(0, Math.round(
    health + variety + colorHarmony + layers + floweringPts + foliage +
    pollinators + organization + rarity + theme + maintenance + decorPts - deadPenalty
  ));

  return {
    total, health, variety, colorHarmony, layers, flowering: floweringPts, foliage,
    pollinators, organization, rarity, theme, maintenance, decor: decorPts, deadPenalty,
    themeName: bestTheme,
  };
}

// pontuação de uma única planta (para competições de planta)
export function plantScore(p: PlantInstance, criteria: { criterion: string; weight: number }[]): number {
  const def = PLANT_BY_ID[p.plantId];
  let score = 0, totalW = 0;
  for (const c of criteria) {
    totalW += c.weight;
    switch (c.criterion) {
      case 'health': score += (p.health / 100) * c.weight; break;
      case 'beauty': score += ((def.beautyValue / 20) * 0.5 + (p.quality / 100) * 0.5) * c.weight; break;
      case 'rarity': score += (RARITY_PTS[def.rarity] / 12) * c.weight; break;
      case 'flowering': score += (p.stage === 'flowering' ? 0.6 + p.bloomProgress * 0.4 : p.stage === 'budding' ? 0.35 : 0) * c.weight; break;
      case 'care': score += (p.quality / 100) * c.weight; break;
      default: score += (p.quality / 100) * c.weight;
    }
  }
  return totalW ? (score / totalW) * 100 : 0;
}

// pontuação de uma área (para competições de área/jardim)
export function areaScore(areaId: string | null, criteria: { criterion: string; weight: number }[]): number {
  const plants = (areaId ? plantsInArea(areaId) : G.plants).filter((p) => !isDead(p));
  if (!plants.length) return 0;
  const h = computeHarmony();
  let score = 0, totalW = 0;
  const avg = (f: (p: PlantInstance) => number) => plants.reduce((s, p) => s + f(p), 0) / plants.length;
  for (const c of criteria) {
    totalW += c.weight;
    switch (c.criterion) {
      case 'health': score += (avg((p) => p.health) / 100) * c.weight; break;
      case 'beauty': score += Math.min(1, h.total / 400) * c.weight; break;
      case 'variety': score += Math.min(1, new Set(plants.map((p) => p.plantId)).size / 12) * c.weight; break;
      case 'color-harmony': score += Math.min(1, h.colorHarmony / 30) * c.weight; break;
      case 'theme': score += Math.min(1, h.theme / 40) * c.weight; break;
      case 'pollinators': score += Math.min(1, h.pollinators / 30) * c.weight; break;
      case 'flowering': score += avg((p) => (p.stage === 'flowering' ? 1 : 0)) * c.weight; break;
      case 'rarity': score += Math.min(1, h.rarity / 40) * c.weight; break;
      case 'care': score += (avg((p) => p.quality) / 100) * c.weight; break;
    }
  }
  return totalW ? (score / totalW) * 100 : 0;
}
