import type { SoilComponentData, SoilMix, PlantCategory, DrainageLevel } from '../types';

// ============ COMPONENTES DE SOLO (23) ============
export const SOIL_COMPONENTS: SoilComponentData[] = [
  { id: 'terra-comum', namePT: 'Terra comum', nameEN: 'Garden Soil', drainage: 0, retention: 1, organic: 1, aeration: 0, pHShift: 0, fertility: 1, price: 2, unlockRule: 'start' },
  { id: 'composto', namePT: 'Composto orgânico', nameEN: 'Compost', drainage: 0, retention: 2, organic: 3, aeration: 1, pHShift: 0, fertility: 3, price: 5, unlockRule: 'start' },
  { id: 'humus', namePT: 'Húmus de minhoca', nameEN: 'Worm Castings', drainage: 0, retention: 2, organic: 3, aeration: 1, pHShift: 0, fertility: 3, price: 7, unlockRule: 'shop:mercado-verde' },
  { id: 'areia-grossa', namePT: 'Areia grossa', nameEN: 'Coarse Sand', drainage: 3, retention: -3, organic: 0, aeration: 1, pHShift: 0, fertility: 0, price: 3, unlockRule: 'start' },
  { id: 'perlita', namePT: 'Perlita', nameEN: 'Perlite', drainage: 3, retention: -2, organic: 0, aeration: 3, pHShift: 0, fertility: 0, price: 6, unlockRule: 'shop:mercado-verde' },
  { id: 'vermiculita', namePT: 'Vermiculita', nameEN: 'Vermiculite', drainage: 1, retention: 3, organic: 0, aeration: 2, pHShift: 0, fertility: 0, price: 6, unlockRule: 'shop:mercado-verde' },
  { id: 'fibra-coco-solo', namePT: 'Fibra de coco', nameEN: 'Coco Coir', drainage: 1, retention: 2, organic: 1, aeration: 2, pHShift: 0, fertility: 0, price: 4, unlockRule: 'shop:mercado-verde' },
  { id: 'turfa', namePT: 'Turfa', nameEN: 'Peat Moss', drainage: 0, retention: 3, organic: 2, aeration: 1, pHShift: -1, fertility: 1, price: 6, unlockRule: 'shop:mercado-verde' },
  { id: 'casca-pinus', namePT: 'Casca de pinus', nameEN: 'Pine Bark', drainage: 3, retention: -1, organic: 1, aeration: 3, pHShift: -0.5, fertility: 0, price: 5, unlockRule: 'shop:mercado-verde' },
  { id: 'carvao', namePT: 'Carvão vegetal', nameEN: 'Horticultural Charcoal', drainage: 2, retention: -1, organic: 0, aeration: 2, pHShift: 0.3, fertility: 0, price: 5, unlockRule: 'shop:mercado-verde' },
  { id: 'argila-expandida', namePT: 'Argila expandida', nameEN: 'Expanded Clay', drainage: 3, retention: -2, organic: 0, aeration: 2, pHShift: 0, fertility: 0, price: 6, unlockRule: 'shop:mercado-verde' },
  { id: 'cascalho', namePT: 'Cascalho', nameEN: 'Gravel', drainage: 3, retention: -3, organic: 0, aeration: 1, pHShift: 0, fertility: 0, price: 3, unlockRule: 'start' },
  { id: 'sphagnum', namePT: 'Musgo sphagnum', nameEN: 'Sphagnum Moss', drainage: 0, retention: 3, organic: 2, aeration: 2, pHShift: -1.2, fertility: 0, price: 8, unlockRule: 'npc:helena:1' },
  { id: 'calcario', namePT: 'Calcário', nameEN: 'Garden Lime', drainage: 0, retention: 0, organic: 0, aeration: 0, pHShift: 1.5, fertility: 0, price: 4, unlockRule: 'shop:mercado-verde' },
  { id: 'enxofre', namePT: 'Enxofre agrícola', nameEN: 'Soil Sulfur', drainage: 0, retention: 0, organic: 0, aeration: 0, pHShift: -1.5, fertility: 0, price: 4, unlockRule: 'shop:mercado-verde' },
  { id: 'farinha-osso', namePT: 'Farinha de osso', nameEN: 'Bone Meal', drainage: 0, retention: 0, organic: 1, aeration: 0, pHShift: 0.2, fertility: 2, price: 6, unlockRule: 'shop:mercado-verde' },
  { id: 'bokashi-solo', namePT: 'Bokashi', nameEN: 'Bokashi', drainage: 0, retention: 1, organic: 3, aeration: 0, pHShift: 0, fertility: 3, price: 9, unlockRule: 'npc:alvaro:2' },
  { id: 'sub-orquideas', namePT: 'Substrato p/ orquídeas', nameEN: 'Orchid Bark Mix', drainage: 3, retention: -1, organic: 1, aeration: 3, pHShift: -0.3, fertility: 0, price: 10, unlockRule: 'npc:helena:1' },
  { id: 'sub-cactos', namePT: 'Substrato p/ cactos', nameEN: 'Cactus Mix', drainage: 3, retention: -2, organic: 0, aeration: 2, pHShift: 0, fertility: 1, price: 8, unlockRule: 'shop:mercado-verde' },
  { id: 'sub-mudas', namePT: 'Substrato p/ mudas', nameEN: 'Seedling Mix', drainage: 1, retention: 2, organic: 2, aeration: 2, pHShift: 0, fertility: 1, price: 6, unlockRule: 'start' },
  { id: 'sub-tropical', namePT: 'Substrato tropical', nameEN: 'Tropical Mix', drainage: 1, retention: 2, organic: 3, aeration: 2, pHShift: -0.3, fertility: 2, price: 9, unlockRule: 'shop:viveiro-tropical' },
  { id: 'solo-acido', namePT: 'Solo ácido', nameEN: 'Acidic Soil', drainage: 1, retention: 1, organic: 2, aeration: 1, pHShift: -1.3, fertility: 1, price: 7, unlockRule: 'shop:mercado-verde' },
  { id: 'cobertura-morta', namePT: 'Cobertura morta', nameEN: 'Mulch', drainage: 0, retention: 2, organic: 1, aeration: 0, pHShift: 0, fertility: 1, price: 4, unlockRule: 'shop:mercado-verde' },
];

export const SOIL_COMPONENT_BY_ID: Record<string, SoilComponentData> = {};
for (const c of SOIL_COMPONENTS) SOIL_COMPONENT_BY_ID[c.id] = c;

// ---- cálculo de mistura a partir de componentes ----
export function computeMix(components: { id: string; parts: number }[]): {
  drainage: DrainageLevel; retention: number; organicMatter: 'low' | 'medium' | 'high';
  aeration: number; pH: number; fertility: number;
} {
  let total = 0, dr = 0, ret = 0, org = 0, aer = 0, ph = 0, fert = 0;
  for (const c of components) {
    const d = SOIL_COMPONENT_BY_ID[c.id];
    if (!d) continue;
    total += c.parts;
    dr += d.drainage * c.parts; ret += d.retention * c.parts;
    org += d.organic * c.parts; aer += d.aeration * c.parts;
    ph += d.pHShift * c.parts; fert += d.fertility * c.parts;
  }
  if (total === 0) total = 1;
  const drAvg = dr / total, retAvg = ret / total, orgAvg = org / total;
  const drainage: DrainageLevel = drAvg >= 2 ? 'excellent' : drAvg >= 1 ? 'good' : drAvg >= 0 ? 'moderate' : 'poor';
  return {
    drainage,
    retention: Math.max(0, Math.min(10, 5 + retAvg * 1.8)),
    organicMatter: orgAvg >= 2 ? 'high' : orgAvg >= 1 ? 'medium' : 'low',
    aeration: Math.max(0, Math.min(10, 4 + (aer / total) * 2)),
    pH: Math.max(4.0, Math.min(8.5, 6.5 + ph / total)),
    fertility: Math.max(0, Math.min(10, (fert / total) * 3.3)),
  };
}

function mk(id: string, namePT: string, nameEN: string, comps: { id: string; parts: number }[], goodFor: PlantCategory[], price?: number, unlockRule?: string): SoilMix {
  const attrs = computeMix(comps);
  return { id, namePT, nameEN, components: comps, ...attrs, goodFor, price, unlockRule };
}

// ============ MISTURAS PRONTAS (receitas clássicas) ============
export const SOIL_MIXES: SoilMix[] = [
  mk('mix-universal', 'Mistura universal', 'All-purpose Mix',
    [{ id: 'terra-comum', parts: 2 }, { id: 'composto', parts: 1 }, { id: 'areia-grossa', parts: 1 }],
    ['annual', 'perennial', 'bulb', 'wildflower', 'climber'], 8, 'start'),
  mk('mix-suculentas', 'Mistura p/ suculentas', 'Succulent Mix',
    [{ id: 'terra-comum', parts: 1 }, { id: 'areia-grossa', parts: 2 }, { id: 'perlita', parts: 1 }, { id: 'cascalho', parts: 1 }],
    ['succulent'], 10, 'shop:mercado-verde'),
  mk('mix-samambaias', 'Mistura p/ samambaias', 'Fern Mix',
    [{ id: 'terra-comum', parts: 1 }, { id: 'composto', parts: 1 }, { id: 'fibra-coco-solo', parts: 1 }, { id: 'humus', parts: 1 }],
    ['tropical'], 12, 'shop:mercado-verde'),
  mk('mix-orquideas', 'Mistura p/ orquídeas', 'Orchid Mix',
    [{ id: 'casca-pinus', parts: 3 }, { id: 'carvao', parts: 1 }, { id: 'sphagnum', parts: 1 }],
    ['orchid'], 14, 'npc:helena:1'),
  mk('mix-lavanda', 'Mistura mediterrânea', 'Mediterranean Mix',
    [{ id: 'terra-comum', parts: 2 }, { id: 'areia-grossa', parts: 2 }, { id: 'calcario', parts: 1 }],
    ['herb'], 9, 'shop:mercado-verde'),
  mk('mix-hortensia-azul', 'Solo ácido rico', 'Rich Acidic Mix',
    [{ id: 'solo-acido', parts: 2 }, { id: 'composto', parts: 1 }, { id: 'turfa', parts: 1 }],
    ['rose-shrub'], 12, 'shop:mercado-verde'),
  mk('mix-tropical', 'Mistura tropical', 'Tropical Mix',
    [{ id: 'sub-tropical', parts: 2 }, { id: 'perlita', parts: 1 }, { id: 'composto', parts: 1 }],
    ['tropical'], 13, 'shop:viveiro-tropical'),
  mk('mix-mudas', 'Mistura p/ mudas', 'Seedling Mix',
    [{ id: 'sub-mudas', parts: 2 }, { id: 'vermiculita', parts: 1 }],
    ['annual', 'herb'], 7, 'start'),
  mk('mix-bonsai', 'Mistura p/ bonsai', 'Bonsai Mix',
    [{ id: 'argila-expandida', parts: 2 }, { id: 'areia-grossa', parts: 1 }, { id: 'casca-pinus', parts: 1 }],
    ['bonsai-tree'], 15, 'npc:kenji:1'),
  mk('mix-carnivoras', 'Mistura p/ carnívoras', 'Carnivore Bog Mix',
    [{ id: 'sphagnum', parts: 2 }, { id: 'turfa', parts: 1 }, { id: 'perlita', parts: 1 }],
    ['carnivorous'], 14, 'shop:clube-colecionadores'),
  mk('mix-aquatico', 'Solo aquático', 'Aquatic Soil',
    [{ id: 'terra-comum', parts: 3 }, { id: 'cascalho', parts: 1 }],
    ['aquatic'], 9, 'npc:eva:1'),
  mk('mix-rosas', 'Mistura rica p/ rosas', 'Rich Rose Mix',
    [{ id: 'terra-comum', parts: 1 }, { id: 'composto', parts: 2 }, { id: 'farinha-osso', parts: 1 }],
    ['rose-shrub', 'perennial'], 11, 'shop:floricultura'),
];

export const SOIL_MIX_BY_ID: Record<string, SoilMix> = {};
for (const m of SOIL_MIXES) SOIL_MIX_BY_ID[m.id] = m;

// compatibilidade mistura ↔ planta (0-1)
import type { PlantData } from '../types';
export function soilCompatibility(mix: SoilMix, plant: PlantData): number {
  let score = 1;
  // drenagem
  const drOrder = ['poor', 'moderate', 'good', 'excellent'];
  const need = drOrder.indexOf(plant.drainageNeed);
  const has = drOrder.indexOf(mix.drainage);
  if (has < need) score -= 0.25 * (need - has);
  if (has > need + 1 && plant.waterNeed === 'very-high') score -= 0.15;
  // pH
  const [lo, hi] = plant.pHRange;
  if (mix.pH < lo) score -= Math.min(0.4, (lo - mix.pH) * 0.25);
  if (mix.pH > hi) score -= Math.min(0.4, (mix.pH - hi) * 0.25);
  // matéria orgânica
  const orgOrder = ['low', 'medium', 'high'];
  const wantOrg = orgOrder.indexOf(plant.idealSoil.organicMatter);
  const hasOrg = orgOrder.indexOf(mix.organicMatter);
  score -= Math.abs(wantOrg - hasOrg) * 0.1;
  // categoria dedicada
  if (mix.goodFor.includes(plant.category)) score += 0.15;
  return Math.max(0, Math.min(1, score));
}
