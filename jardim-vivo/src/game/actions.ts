import type { PlantInstance, PropagationMethod } from '../types';
import { potSizeIndex } from '../types';
import { PLANT_BY_ID } from '../data/plants';
import { POT_BY_ID } from '../data/potsData';
import { AREA_BY_ID, tileLight } from '../data/areasData';
import { CONSUMABLE_BY_ID } from '../data/toolsData';
import { G, uid, notify, plantAt, decorAt, discoverSpecies, isDead, resolveMix, addMoney } from './gameState';
import { idealMoistureBand } from './plantSimulation';
import { onEvent } from './progressSystems';
import { sfx } from '../audio/audioEngine';

export interface ActionResult { ok: boolean; msg?: { pt: string; en: string } }
const OK: ActionResult = { ok: true };
const fail = (pt: string, en: string): ActionResult => ({ ok: false, msg: { pt, en } });

// ---------- entulho ----------
export function clearDebris(areaId: string, index: number): ActionResult {
  const arr = G.debrisCleared[areaId] ?? (G.debrisCleared[areaId] = []);
  if (arr.includes(index)) return fail('Já limpo.', 'Already cleared.');
  arr.push(index);
  addMoney(2);
  onEvent({ type: 'clear-debris' });
  sfx('dig');
  notify();
  return OK;
}

export function debrisAt(areaId: string, x: number, y: number): number {
  // entulho procedural no quintal: 6 montes fixos
  if (areaId !== 'quintal') return -1;
  const spots = [[1, 1], [4, 0], [6, 2], [2, 4], [5, 4], [7, 5]];
  const idx = spots.findIndex(([sx, sy]) => sx === x && sy === y);
  if (idx < 0) return -1;
  if ((G.debrisCleared['quintal'] ?? []).includes(idx)) return -1;
  return idx;
}

// ---------- plantio ----------
export function canPlantHere(plantId: string, areaId: string, x: number, y: number, potId: string | null): ActionResult {
  const def = PLANT_BY_ID[plantId];
  const area = AREA_BY_ID[areaId];
  if (!def || !area) return fail('Inválido.', 'Invalid.');
  if (plantAt(areaId, x, y)) return fail('Já tem uma planta aqui.', 'A plant is already here.');
  if (decorAt(areaId, x, y)) return fail('Tem uma decoração aqui.', 'A decoration is here.');
  if (debrisAt(areaId, x, y) >= 0) return fail('Limpe o entulho primeiro.', 'Clear the debris first.');
  const t = tileLight(area, x, y);
  if (t === 'blocked' || t === 'bench') return fail('Espaço ocupado.', 'Space occupied.');
  const isWater = t === 'water';
  const aquatic = def.waterNeed === 'aquatic';
  if (isWater && !aquatic && !potId) return fail('Só plantas aquáticas vivem na água.', 'Only aquatic plants live in water.');
  if (aquatic && !isWater) {
    const pot = potId ? POT_BY_ID[potId] : null;
    if (!pot?.isAquatic) return fail('Planta aquática precisa de água ou vaso aquático.', 'Aquatic plants need water or an aquatic tub.');
  }
  if (!potId && area.indoor) return fail('Área interna: use um vaso.', 'Indoor area: use a pot.');
  if (potId) {
    const pot = POT_BY_ID[potId];
    if (!pot) return fail('Vaso inválido.', 'Invalid pot.');
    if ((G.inventory.pots[potId] ?? 0) <= 0) return fail('Você não tem esse vaso.', 'You don\'t own that pot.');
    if (pot.forCategory && !pot.forCategory.includes(def.category)) {
      // permitido, mas avisaremos via score; vasos dedicados só recomendam
    }
    if (potSizeIndex(pot.size) < potSizeIndex(def.minPotSize) - 1) {
      return fail(`Vaso pequeno demais: ${def.commonNamePT} pede no mínimo tamanho ${def.minPotSize}.`, `Pot too small: ${def.commonNameEN} needs at least ${def.minPotSize}.`);
    }
  }
  return OK;
}

export function plantSeed(kind: 'seed' | 'seedling' | 'cutting', plantId: string, areaId: string, x: number, y: number, potId: string | null, soilMixId: string): ActionResult {
  const check = canPlantHere(plantId, areaId, x, y, potId);
  if (!check.ok) return check;
  const inv = kind === 'seed' ? G.inventory.seeds : kind === 'seedling' ? G.inventory.seedlings : G.inventory.cuttings;
  if ((inv[plantId] ?? 0) <= 0) return fail('Sem estoque no inventário.', 'None left in inventory.');
  if ((G.inventory.soilMixes[soilMixId] ?? 0) <= 0 && !soilMixId.startsWith('custom:')) {
    return fail('Sem essa mistura de solo.', 'No such soil mix in stock.');
  }
  inv[plantId]--;
  if (G.inventory.soilMixes[soilMixId] !== undefined) G.inventory.soilMixes[soilMixId] = Math.max(0, G.inventory.soilMixes[soilMixId] - 1);
  if (potId) G.inventory.pots[potId]--;

  const def = PLANT_BY_ID[plantId];
  const mix = resolveMix(soilMixId);
  const startStage = kind === 'seed' ? 'seed' : kind === 'seedling' ? 'seedling' : 'sprout';
  const p: PlantInstance = {
    uid: uid(), plantId, areaId, tileX: x, tileY: y, potId, soilMixId,
    stage: startStage, stageProgress: 0, ageDays: 0,
    health: 80, moisture: 55,
    nutrients: { n: 40 + mix.fertility * 4, p: 40 + mix.fertility * 4, k: 40 + mix.fertility * 4 },
    pests: [], disease: null, stress: [], quality: 50, bloomProgress: 0,
    deadDays: 0, variantSeed: Math.floor(Math.random() * 99999),
    lastWateredDay: 0, fertilizedDay: -99, prunedRecently: 0,
    isDormant: false, seedsReady: false,
  };
  G.plants.push(p);
  G.stats.totalPlanted++;
  discoverSpecies(plantId);
  G.plantapedia[plantId].timesGrown++;
  onEvent({ type: 'plant', plantId, category: def.category });
  sfx('plant');
  notify();
  return OK;
}

// ---------- rega ----------
export function waterPlant(p: PlantInstance, mode: 'light' | 'normal' | 'deep' | 'mist' | 'bottom' = 'normal'): ActionResult {
  if (isDead(p)) return fail('Esta planta se foi…', 'This plant is gone…');
  const def = PLANT_BY_ID[p.plantId];
  if (def.waterNeed === 'aquatic') return fail('Ela já vive na água.', 'It already lives in water.');
  const amounts = { light: 15, normal: 30, deep: 50, mist: 8, bottom: 25 };
  let amt = amounts[mode];
  if (G.rainBarrel && G.rainWater > 0) { G.rainWater = Math.max(0, G.rainWater - 1); amt += 3; }
  p.moisture = Math.min(100, p.moisture + amt);
  p.lastWateredDay = 0;
  G.stats.totalWatered++;
  const [, hi] = idealMoistureBand(def);
  onEvent({ type: 'water' });
  sfx('water');
  notify();
  if (p.moisture > hi + 20) {
    return { ok: true, msg: { pt: 'Cuidado: o solo ficou encharcado.', en: 'Careful: the soil is now soggy.' } };
  }
  return OK;
}

export function drainSaucer(p: PlantInstance): ActionResult {
  if (!p.potId) return fail('Sem prato para drenar.', 'No saucer to drain.');
  p.moisture = Math.min(p.moisture, 70);
  sfx('water');
  notify();
  return OK;
}

// ---------- adubo ----------
export function fertilize(p: PlantInstance, consumableId: string): ActionResult {
  if (isDead(p)) return fail('Tarde demais para adubo.', 'Too late for fertilizer.');
  const c = CONSUMABLE_BY_ID[consumableId];
  if (!c || c.kind !== 'fertilizer') return fail('Item inválido.', 'Invalid item.');
  if ((G.inventory.fertilizers[consumableId] ?? 0) <= 0) return fail('Sem estoque.', 'Out of stock.');
  G.inventory.fertilizers[consumableId]--;
  p.nutrients.n = Math.min(110, p.nutrients.n + (c.fx.n ?? 0));
  p.nutrients.p = Math.min(110, p.nutrients.p + (c.fx.p ?? 0));
  p.nutrients.k = Math.min(110, p.nutrients.k + (c.fx.k ?? 0));
  p.fertilizedDay = 0;
  sfx('sprinkle');
  notify();
  if (p.nutrients.n > 100 || p.nutrients.p > 100 || p.nutrients.k > 100) {
    return { ok: true, msg: { pt: 'Adubo demais pode queimar as raízes!', en: 'Too much fertilizer can burn roots!' } };
  }
  return OK;
}

// ---------- tratamento ----------
export function treatPlant(p: PlantInstance, consumableId: string): ActionResult {
  const c = CONSUMABLE_BY_ID[consumableId];
  if (!c || c.kind !== 'treatment') return fail('Item inválido.', 'Invalid item.');
  if ((G.inventory.treatments[consumableId] ?? 0) <= 0) return fail('Sem estoque.', 'Out of stock.');
  G.inventory.treatments[consumableId]--;
  if (c.fx.healPest) {
    for (const pest of p.pests) pest.severity -= c.fx.healPest;
    p.pests = p.pests.filter((pe) => pe.severity > 0);
  }
  if (c.fx.healFungus && p.disease) {
    p.disease.severity -= c.fx.healFungus;
    if (p.disease.severity <= 0) p.disease = null;
  }
  sfx('sprinkle');
  notify();
  return OK;
}

export function removePestByHand(p: PlantInstance): ActionResult {
  if (!p.pests.length) return fail('Nenhuma praga visível.', 'No visible pests.');
  for (const pest of p.pests) pest.severity -= 22;
  p.pests = p.pests.filter((pe) => pe.severity > 0);
  sfx('snip');
  notify();
  return OK;
}

// ---------- poda ----------
export function prunePlant(p: PlantInstance, kind: 'clean' | 'deadhead' | 'shape' | 'root'): ActionResult {
  if (isDead(p)) return fail('Nada mais a podar.', 'Nothing left to prune.');
  if (!G.inventory.tools['tesoura-poda'] && kind !== 'clean') return fail('Precisa da tesoura de poda.', 'You need pruning shears.');
  if (kind === 'root' && !G.inventory.tools['tesoura-bonsai']) return fail('Poda de raiz exige tesoura de bonsai.', 'Root pruning needs bonsai scissors.');
  const def = PLANT_BY_ID[p.plantId];
  switch (kind) {
    case 'clean':
      p.health = Math.min(100, p.health + 3);
      if (p.disease) p.disease.severity = Math.max(0, p.disease.severity - 12);
      break;
    case 'deadhead':
      if (p.stage === 'flowering') p.bloomProgress = Math.max(0, p.bloomProgress - 0.3);
      p.quality = Math.min(100, p.quality + 4);
      break;
    case 'shape':
      p.quality = Math.min(100, p.quality + 6);
      p.prunedRecently = 3;
      if (p.stage === 'budding') { p.stageProgress = Math.max(0, p.stageProgress - 0.4); }
      break;
    case 'root':
      if (def.category !== 'bonsai-tree') return fail('Poda de raiz é para bonsai.', 'Root pruning is for bonsai.');
      p.quality = Math.min(100, p.quality + 10);
      p.health = Math.max(10, p.health - 8);
      break;
  }
  if (p.disease?.severity === 0) p.disease = null;
  onEvent({ type: 'prune' });
  sfx('snip');
  notify();
  return OK;
}

// ---------- colheita ----------
export function harvestFlower(p: PlantInstance): ActionResult {
  if (p.stage !== 'flowering') return fail('Sem flores abertas agora.', 'No open blooms right now.');
  const def = PLANT_BY_ID[p.plantId];
  G.inventory.flowers[p.plantId] = (G.inventory.flowers[p.plantId] ?? 0) + 1;
  p.bloomProgress = Math.max(0, p.bloomProgress - 0.5);
  if (p.bloomProgress <= 0) { p.stage = 'mature'; p.stageProgress = 0.5; }
  onEvent({ type: 'harvest-flower', color: def.flowerColors[0] });
  sfx('snip');
  notify();
  return OK;
}

export function harvestSeeds(p: PlantInstance): ActionResult {
  if (!p.seedsReady) return fail('As sementes ainda não estão prontas.', 'Seeds aren\'t ready yet.');
  const def = PLANT_BY_ID[p.plantId];
  const qty = 2 + Math.floor(p.quality / 40);
  G.inventory.seeds[p.plantId] = (G.inventory.seeds[p.plantId] ?? 0) + qty;
  p.seedsReady = false;
  onEvent({ type: 'harvest-seeds', plantId: p.plantId });
  sfx('seeds');
  notify();
  return { ok: true, msg: { pt: `+${qty} sementes de ${def.commonNamePT}!`, en: `+${qty} ${def.commonNameEN} seeds!` } };
}

// ---------- propagação ----------
export function propagate(p: PlantInstance, method: PropagationMethod): ActionResult {
  if (isDead(p)) return fail('Material morto não propaga.', 'Dead material won\'t propagate.');
  const def = PLANT_BY_ID[p.plantId];
  if (!def.propagationMethods.includes(method)) return fail('Esta espécie não propaga assim.', 'This species doesn\'t propagate that way.');
  const matureEnough = ['juvenile', 'mature', 'budding', 'flowering', 'seeding'].includes(p.stage);
  if (!matureEnough) return fail('A planta ainda é jovem demais.', 'The plant is still too young.');
  if (method === 'keiki' && !p.keikiReady) return fail('Nenhum keiki formado ainda.', 'No keiki formed yet.');
  if (method === 'seed') return fail('Use "colher sementes" na fase de sementes.', 'Use "harvest seeds" during the seeding stage.');

  const bonus = G.inventory.tools['bandeja-propagacao'] ? 0.15 : 0;
  const successBase = { 'stem-cutting': 0.75, 'leaf-cutting': 0.65, division: 0.9, offset: 0.9, runner: 0.9, bulb: 0.85, rhizome: 0.85, tuber: 0.85, 'air-layering': 0.7, grafting: 0.5, 'water-propagation': 0.8, keiki: 0.85, spore: 0.5 }[method] ?? 0.7;
  const healthFactor = p.health / 100;
  const ok = Math.random() < Math.min(0.98, successBase * (0.6 + healthFactor * 0.5) + bonus);
  // custo para a planta-mãe
  p.health = Math.max(15, p.health - 6);
  if (method === 'division') p.quality = Math.max(20, p.quality - 8);
  if (method === 'keiki') p.keikiReady = false;
  if (ok) {
    G.inventory.cuttings[p.plantId] = (G.inventory.cuttings[p.plantId] ?? 0) + 1;
    G.stats.totalPropagated++;
    onEvent({ type: 'propagate', method });
    sfx('seeds');
    notify();
    return { ok: true, msg: { pt: `Muda de ${def.commonNamePT} pronta!`, en: `${def.commonNameEN} cutting ready!` } };
  }
  sfx('fail');
  notify();
  return { ok: true, msg: { pt: 'A muda não pegou desta vez…', en: 'The cutting didn\'t take this time…' } };
}

// ---------- replantio / mover / remover ----------
export function repotPlant(p: PlantInstance, newPotId: string | null, newSoilMixId: string | null): ActionResult {
  if (newPotId) {
    const pot = POT_BY_ID[newPotId];
    if (!pot || (G.inventory.pots[newPotId] ?? 0) <= 0) return fail('Vaso indisponível.', 'Pot unavailable.');
    if (p.potId) G.inventory.pots[p.potId] = (G.inventory.pots[p.potId] ?? 0) + 1;
    G.inventory.pots[newPotId]--;
    p.potId = newPotId;
  }
  if (newSoilMixId) {
    if ((G.inventory.soilMixes[newSoilMixId] ?? 0) <= 0 && !newSoilMixId.startsWith('custom:')) return fail('Sem essa mistura.', 'No such mix.');
    if (G.inventory.soilMixes[newSoilMixId] !== undefined) G.inventory.soilMixes[newSoilMixId] = Math.max(0, G.inventory.soilMixes[newSoilMixId] - 1);
    p.soilMixId = newSoilMixId;
    const mix = resolveMix(newSoilMixId);
    p.nutrients.n = Math.min(100, p.nutrients.n + mix.fertility * 3);
  }
  p.health = Math.max(10, p.health - 4); // choque de transplante leve
  sfx('dig');
  notify();
  return OK;
}

export function movePlant(p: PlantInstance, areaId: string, x: number, y: number): ActionResult {
  const area = AREA_BY_ID[areaId];
  if (!area || !G.unlockedAreas.includes(areaId)) return fail('Área indisponível.', 'Area unavailable.');
  if (plantAt(areaId, x, y) || decorAt(areaId, x, y)) return fail('Espaço ocupado.', 'Space occupied.');
  const t = tileLight(area, x, y);
  if (t === 'blocked' || t === 'bench') return fail('Espaço ocupado.', 'Space occupied.');
  const def = PLANT_BY_ID[p.plantId];
  if (t === 'water' && def.waterNeed !== 'aquatic') return fail('Água é só para aquáticas.', 'Water is for aquatics only.');
  if (!p.potId && area.indoor) return fail('Precisa de vaso em área interna.', 'Needs a pot indoors.');
  p.areaId = areaId; p.tileX = x; p.tileY = y;
  sfx('dig');
  notify();
  return OK;
}

export function removePlant(p: PlantInstance): ActionResult {
  const idx = G.plants.indexOf(p);
  if (idx < 0) return fail('?', '?');
  if (p.potId) G.inventory.pots[p.potId] = (G.inventory.pots[p.potId] ?? 0) + 1;
  G.plants.splice(idx, 1);
  sfx('dig');
  notify();
  return OK;
}

// ---------- decoração ----------
export function placeDecor(decorId: string, areaId: string, x: number, y: number): ActionResult {
  if ((G.inventory.decor[decorId] ?? 0) <= 0) return fail('Sem essa decoração.', 'No such decoration.');
  const area = AREA_BY_ID[areaId];
  if (!area) return fail('?', '?');
  const count = G.decors.filter((d) => d.areaId === areaId).length;
  if (count >= area.maxDecor) return fail('Limite de decorações da área.', 'Area decoration limit reached.');
  if (plantAt(areaId, x, y) || decorAt(areaId, x, y) || debrisAt(areaId, x, y) >= 0) return fail('Espaço ocupado.', 'Space occupied.');
  const t = tileLight(area, x, y);
  if (t === 'blocked' || t === 'bench' || t === 'water') return fail('Não dá para decorar aqui.', 'Can\'t decorate here.');
  G.inventory.decor[decorId]--;
  G.decors.push({ uid: uid(), decorId, areaId, tileX: x, tileY: y });
  sfx('place');
  notify();
  return OK;
}

export function removeDecor(uidNum: number): ActionResult {
  const idx = G.decors.findIndex((d) => d.uid === uidNum);
  if (idx < 0) return fail('?', '?');
  const d = G.decors[idx];
  G.inventory.decor[d.decorId] = (G.inventory.decor[d.decorId] ?? 0) + 1;
  G.decors.splice(idx, 1);
  sfx('dig');
  notify();
  return OK;
}

// ---------- solo custom ----------
export function saveSoilRecipe(name: string, components: { id: string; parts: number }[]): ActionResult {
  const totalParts = components.reduce((s, c) => s + c.parts, 0);
  if (totalParts < 2) return fail('Misture pelo menos 2 partes.', 'Mix at least 2 parts.');
  for (const c of components) {
    if ((G.inventory.soilComponents[c.id] ?? 0) < c.parts) {
      return fail('Componentes insuficientes.', 'Not enough components.');
    }
  }
  for (const c of components) G.inventory.soilComponents[c.id] -= c.parts;
  G.savedSoilRecipes.push({ name, components });
  const customId = `custom:${G.savedSoilRecipes.length - 1}`;
  G.inventory.soilMixes[customId] = (G.inventory.soilMixes[customId] ?? 0) + 2; // rende 2 usos
  onEvent({ type: 'mix-soil', components });
  sfx('dig');
  notify();
  return { ok: true, msg: { pt: `Receita "${name}" salva (+2 usos)!`, en: `Recipe "${name}" saved (+2 uses)!` } };
}
