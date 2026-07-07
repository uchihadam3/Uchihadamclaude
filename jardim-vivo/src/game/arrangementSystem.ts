import type { ArrangementInstance } from '../types';
import { PLANT_BY_ID } from '../data/plants';
import { ARRANGEMENT_STYLE_BY_ID } from '../data/competitionData';
import { G, uid, notify } from './gameState';
import { absoluteDay } from './gameTime';
import { onEvent } from './progressSystems';
import { flowerPrice } from './economySystem';
import { sfx } from '../audio/audioEngine';

// ============ ARRANJOS FLORAIS ============

export interface ArrangementPreview {
  ok: boolean;
  msgPT?: string; msgEN?: string;
  quality: number;
  value: number;
  colorHarmony: number;
  fragrance: boolean;
  rarityBonus: number;
}

export function previewArrangement(styleId: string, flowerPicks: { plantId: string; qty: number }[]): ArrangementPreview {
  const style = ARRANGEMENT_STYLE_BY_ID[styleId];
  const bad: ArrangementPreview = { ok: false, quality: 0, value: 0, colorHarmony: 0, fragrance: false, rarityBonus: 0 };
  if (!style) return { ...bad, msgPT: 'Estilo inválido.', msgEN: 'Invalid style.' };
  const total = flowerPicks.reduce((s, f) => s + f.qty, 0);
  if (total < style.minFlowers) return { ...bad, msgPT: `Precisa de ${style.minFlowers}+ flores.`, msgEN: `Needs ${style.minFlowers}+ flowers.` };
  for (const f of flowerPicks) {
    if ((G.inventory.flowers[f.plantId] ?? 0) < f.qty) return { ...bad, msgPT: 'Flores insuficientes.', msgEN: 'Not enough flowers.' };
  }
  const colors = new Set<string>();
  let fragrance = false, rarityBonus = 0, baseValue = 0;
  for (const f of flowerPicks) {
    const def = PLANT_BY_ID[f.plantId];
    for (const c of def.flowerColors) colors.add(c);
    if (def.fragrance) fragrance = true;
    rarityBonus += { common: 0, uncommon: 1, rare: 3, 'very-rare': 5, legendary: 9 }[def.rarity] * f.qty;
    baseValue += flowerPrice(f.plantId) * f.qty;
  }
  if (style.monochrome && colors.size > 1) return { ...bad, msgPT: 'Monocromático: use UMA cor só.', msgEN: 'Monochrome: use ONE color only.' };
  if (style.needColors && !style.needColors.some((c) => colors.has(c))) {
    return { ...bad, msgPT: `Este estilo pede: ${style.needColors.join(', ')}.`, msgEN: `This style needs: ${style.needColors.join(', ')}.` };
  }
  if (style.needFragrance && !fragrance) return { ...bad, msgPT: 'Este estilo pede flores perfumadas.', msgEN: 'This style needs fragrant flowers.' };

  // harmonia: poucas cores bem escolhidas > salada
  const colorHarmony = colors.size === 1 ? 90 : colors.size === 2 ? 80 : colors.size === 3 ? 65 : 45;
  const quality = Math.min(100, Math.round(colorHarmony * 0.5 + Math.min(30, total * 4) + rarityBonus + (fragrance ? 8 : 0)));
  const value = Math.max(5, Math.round(baseValue * style.valueMult * (0.5 + quality / 130)));
  return { ok: true, quality, value, colorHarmony, fragrance, rarityBonus };
}

export function craftArrangement(styleId: string, flowerPicks: { plantId: string; qty: number }[]): { ok: boolean; msg?: { pt: string; en: string } } {
  const pv = previewArrangement(styleId, flowerPicks);
  if (!pv.ok) return { ok: false, msg: { pt: pv.msgPT ?? '?', en: pv.msgEN ?? '?' } };
  for (const f of flowerPicks) G.inventory.flowers[f.plantId] -= f.qty;
  const arr: ArrangementInstance = {
    uid: uid(), style: styleId,
    flowers: flowerPicks.flatMap((f) => Array(f.qty).fill(0).map(() => ({ plantId: f.plantId, color: PLANT_BY_ID[f.plantId].flowerColors[0] ?? 'branco' }))),
    quality: pv.quality, value: pv.value,
    freshDays: 6, createdDay: absoluteDay(G.calendar),
  };
  G.inventory.arrangements.push(arr);
  G.stats.arrangementsMade++;
  onEvent({ type: 'arrangement', style: styleId });
  sfx('quest');
  notify();
  return { ok: true, msg: { pt: `Arranjo pronto! Qualidade ${pv.quality}, valor ${pv.value}.`, en: `Arrangement done! Quality ${pv.quality}, value ${pv.value}.` } };
}

/** diário: arranjos perdem frescor */
export function ageArrangements(): void {
  for (let i = G.inventory.arrangements.length - 1; i >= 0; i--) {
    const a = G.inventory.arrangements[i];
    a.freshDays--;
    a.value = Math.max(2, Math.round(a.value * 0.88));
    if (a.freshDays <= 0) G.inventory.arrangements.splice(i, 1);
  }
}
