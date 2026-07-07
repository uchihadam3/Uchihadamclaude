import type { PlantData } from '../../types';
import { ANNUALS } from './annuals';
import { PERENNIALS } from './perennials';
import { BULBS } from './bulbs';
import { SHRUBS } from './shrubs';
import { TROPICAL } from './tropical';
import { ORCHIDS } from './orchids';
import { SUCCULENTS } from './succulents';
import { HERBS } from './herbs';
import { CLIMBERS } from './climbers';
import { AQUATIC } from './aquatic';
import { TREES } from './trees';
import { CARNIVOROUS } from './carnivorous';
import { WILDFLOWERS } from './wildflowers';

export const PLANTS: PlantData[] = [
  ...ANNUALS, ...PERENNIALS, ...BULBS, ...SHRUBS, ...TROPICAL,
  ...ORCHIDS, ...SUCCULENTS, ...HERBS, ...CLIMBERS, ...AQUATIC,
  ...TREES, ...CARNIVOROUS, ...WILDFLOWERS,
];

export const PLANT_BY_ID: Record<string, PlantData> = {};
for (const p of PLANTS) {
  if (PLANT_BY_ID[p.id]) throw new Error('Planta duplicada: ' + p.id);
  PLANT_BY_ID[p.id] = p;
}

export function plantsByCategory(cat: string): PlantData[] {
  return PLANTS.filter((p) => p.category === cat);
}
