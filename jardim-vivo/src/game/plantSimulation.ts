import type { DayWeather, GrowthStageId, LightType, PlantData, PlantInstance, PestId, DiseaseId } from '../types';
import { potSizeIndex } from '../types';
import { PLANT_BY_ID } from '../data/plants';
import { POT_BY_ID } from '../data/potsData';
import { AREA_BY_ID, tileLight } from '../data/areasData';
import { soilCompatibility } from '../data/soilData';
import { G, isDead, resolveMix } from './gameState';
import { rng } from './weatherSystem';
import { absoluteDay } from './gameTime';
import { onEvent } from './progressSystems';

// ============ SIMULAÇÃO DIÁRIA ============

export interface DayReport {
  bloomed: string[];       // plantas que floresceram hoje (uid como string p/ toasts)
  died: string[];
  warnings: { uid: number; msg: { pt: string; en: string } }[];
}

const STAGE_SHARE: Record<string, number> = {
  sprout: 0.12, seedling: 0.16, 'young-seedling': 0.16, juvenile: 0.28, mature: 0.28,
};

export function stageDays(def: PlantData, stage: GrowthStageId): number {
  if (stage === 'seed') return 2;
  if (stage === 'budding') return 4;
  if (stage === 'flowering') return def.category === 'orchid' ? 20 : 10;
  if (stage === 'seeding') return 6;
  if (stage === 'dormant') return 9999;
  return Math.max(2, Math.round(def.growDays * (STAGE_SHARE[stage] ?? 0.2)));
}

export const STAGE_ORDER: GrowthStageId[] = ['seed', 'sprout', 'seedling', 'young-seedling', 'juvenile', 'mature'];

// luz efetiva do tile onde a planta está
export function effectiveLight(p: PlantInstance): LightType {
  const area = AREA_BY_ID[p.areaId];
  const t = tileLight(area, p.tileX, p.tileY);
  if (t === 'water' || t === 'blocked' || t === 'bench') return area.baseLight;
  return t;
}

const LIGHT_ENERGY: Record<LightType, number> = {
  'full-sun': 10, 'morning-sun': 7, 'afternoon-sun': 8, 'part-shade': 5,
  'light-shade': 4, 'deep-shade': 2, 'bright-indirect': 6, 'medium-indirect': 4, 'grow-light': 7,
};

export function lightScore(def: PlantData, light: LightType): { score: number; problem: 'sunburn' | 'etiolation' | null } {
  if (def.idealLight.includes(light)) return { score: 1, problem: null };
  if (def.toleratedLight.includes(light)) return { score: 0.65, problem: null };
  const has = LIGHT_ENERGY[light];
  const wantMax = Math.max(...def.idealLight.map((l) => LIGHT_ENERGY[l]));
  const wantMin = Math.min(...def.idealLight.map((l) => LIGHT_ENERGY[l]));
  if (has > wantMax + 2) return { score: 0.35, problem: 'sunburn' };
  if (has < wantMin - 2) return { score: 0.3, problem: 'etiolation' };
  return { score: 0.5, problem: null };
}

const WATER_BAND: Record<string, [number, number]> = {
  'very-low': [8, 35], low: [15, 45], moderate: [30, 65], high: [45, 80], 'very-high': [55, 90], aquatic: [80, 100],
};

export function idealMoistureBand(def: PlantData): [number, number] { return WATER_BAND[def.waterNeed]; }

// evaporação diária
export function evaporation(p: PlantInstance, def: PlantData, w: DayWeather): number {
  const pot = p.potId ? POT_BY_ID[p.potId] : null;
  const area = AREA_BY_ID[p.areaId];
  const mix = resolveMix(p.soilMixId);
  let evap = 6 + w.sunIntensity * 1.6 + Math.max(0, (w.tempMaxC - 20)) * 0.5 + w.wind * (area.indoor ? 0.1 : 0.5);
  evap -= mix.retention * 0.8;
  if (pot) {
    evap -= pot.waterRetention * 0.6;
    evap += pot.heatGain * 0.4;
    if (pot.soilVolume <= 2) evap += 4; // vaso pequeno seca rápido
    if (pot.isHanging) evap += 2;
  } else {
    evap -= 2; // chão retém mais
  }
  if (area.indoor) evap *= 0.6;
  if (area.humidity === 'very-humid') evap *= 0.55;
  else if (area.humidity === 'humid') evap *= 0.75;
  else if (area.humidity === 'dry') evap *= 1.25;
  if (w.raining && !area.indoor) evap *= 0.4;
  return Math.max(1, evap);
}

function pestPool(def: PlantData): PestId[] {
  const pests: PestId[] = [];
  for (const pr of def.commonProblems) {
    if (['aphids', 'mealybugs', 'spider-mites', 'whitefly', 'slugs', 'caterpillars', 'fungus-gnats', 'thrips'].includes(pr)) pests.push(pr as PestId);
  }
  if (!pests.length) pests.push('aphids');
  return pests;
}

function diseasePool(def: PlantData): DiseaseId[] {
  const ds: DiseaseId[] = [];
  for (const pr of def.commonProblems) {
    if (['powdery-mildew', 'downy-mildew', 'root-rot', 'leaf-spot', 'rust', 'soil-mold'].includes(pr)) ds.push(pr as DiseaseId);
  }
  if (!ds.length) ds.push('leaf-spot');
  return ds;
}

/** Executa um dia de vida para todas as plantas. */
export function simulateDay(report: DayReport): void {
  const absDay = absoluteDay(G.calendar);
  const w = G.weather;
  const season = G.calendar.season;

  for (const p of G.plants) {
    if (isDead(p)) { p.deadDays++; continue; }
    const def = PLANT_BY_ID[p.plantId];
    if (!def) continue;
    const area = AREA_BY_ID[p.areaId];
    const pot = p.potId ? POT_BY_ID[p.potId] : null;
    const mix = resolveMix(p.soilMixId);
    const r = rng(p.uid * 31 + absDay * 7 + 13);
    p.ageDays++;
    p.stress = [];

    // ---- água ----
    const isAquatic = def.waterNeed === 'aquatic';
    if (isAquatic) {
      p.moisture = 95;
    } else {
      // chuva rega plantas externas
      if (w.raining && !area.indoor) p.moisture = Math.min(100, p.moisture + w.rainAmount * 6);
      // gotejamento instalado
      if (G.irrigationAreas.includes(p.areaId)) p.moisture = Math.max(p.moisture, 55);
      // vaso autoirrigável
      if (pot?.selfWatering && p.moisture < 50) p.moisture = Math.min(55, p.moisture + 18);
      p.moisture = Math.max(0, p.moisture - evaporation(p, def, w));
    }
    const [mLo, mHi] = idealMoistureBand(def);
    let waterScore = 1;
    if (p.moisture < mLo) {
      const deficit = (mLo - p.moisture) / mLo;
      waterScore = Math.max(0, 1 - deficit * (1.4 - def.droughtTolerance * 0.08));
      if (deficit > 0.25) p.stress.push('underwatering');
    } else if (p.moisture > mHi) {
      const excess = (p.moisture - mHi) / (100 - mHi + 1);
      const drainFactor = mix.drainage === 'excellent' ? 0.5 : mix.drainage === 'good' ? 0.75 : mix.drainage === 'moderate' ? 1 : 1.4;
      waterScore = Math.max(0, 1 - excess * drainFactor * (1.4 - def.overwaterTolerance * 0.09));
      if (excess > 0.3 && drainFactor >= 0.75) p.stress.push('overwatering');
    }

    // ---- luz ----
    const light = effectiveLight(p);
    const ls = lightScore(def, light);
    if (ls.problem) p.stress.push(ls.problem);

    // ---- temperatura ----
    const tempAvg = (w.tempMinC + w.tempMaxC) / 2 + area.tempOffsetC;
    const [tLo, tHi] = def.temperatureRangeC;
    let tempScore = 1;
    if (tempAvg < tLo) tempScore = Math.max(0, 1 - (tLo - tempAvg) * 0.09);
    else if (tempAvg > tHi) tempScore = Math.max(0, 1 - (tempAvg - tHi) * 0.09);

    // ---- solo & vaso ----
    const soilScore = soilCompatibility(mix, def);
    let potScore = 1;
    if (pot) {
      const need = potSizeIndex(def.minPotSize);
      const has = potSizeIndex(pot.size);
      if (has < need) { potScore = Math.max(0.3, 1 - (need - has) * 0.3); if (need - has >= 1 && p.stage === 'mature') p.stress.push('nutrient-deficiency'); }
      if (def.category === 'orchid' && !pot.ventilated) potScore *= 0.75;
      if (isAquatic && !pot.isAquatic) potScore *= 0.4;
    } else if (area.indoor) {
      potScore = 0.5; // plantar no "chão" de área interna não funciona bem
    }

    // ---- umidade do ar ----
    const HUM_LEVEL: Record<string, number> = { dry: 30, average: 55, humid: 72, 'very-humid': 88 };
    const areaHum = HUM_LEVEL[area.humidity] * 0.6 + w.humidity * 0.4;
    const wantHum = HUM_LEVEL[def.humidityNeed];
    const humScore = Math.max(0.35, 1 - Math.abs(areaHum - wantHum) / 90);

    // ---- nutrientes ----
    const consume = p.stage === 'flowering' || p.stage === 'budding' ? 2.2 : p.stage === 'mature' || p.stage === 'juvenile' ? 1.5 : 0.8;
    p.nutrients.n = Math.max(0, p.nutrients.n - consume * 0.9);
    p.nutrients.p = Math.max(0, p.nutrients.p - consume * (p.stage === 'flowering' ? 1.3 : 0.7));
    p.nutrients.k = Math.max(0, p.nutrients.k - consume * 0.8);
    // solo fértil repõe um pouco
    const soilFeed = mix.fertility * 0.12;
    p.nutrients.n = Math.min(100, p.nutrients.n + soilFeed);
    p.nutrients.p = Math.min(100, p.nutrients.p + soilFeed);
    p.nutrients.k = Math.min(100, p.nutrients.k + soilFeed);
    const nutrAvg = (p.nutrients.n + p.nutrients.p + p.nutrients.k) / 3;
    let nutrScore = nutrAvg > 65 ? 1 : nutrAvg > 35 ? 0.85 : nutrAvg > 15 ? 0.6 : 0.4;
    if (nutrAvg < 20) p.stress.push('nutrient-deficiency');
    // excesso de adubo queima
    if (p.nutrients.n > 95 && def.category !== 'annual') { nutrScore = 0.5; p.stress.push('nutrient-deficiency'); }

    // ---- pragas ----
    const stressLevel = 1 - Math.min(waterScore, ls.score, tempScore);
    if (!area.indoor || r() < 0.4) {
      const pestChance = w.pestRisk * 0.04 + stressLevel * 0.04;
      if (p.pests.length === 0 && r() < pestChance) {
        const pool = pestPool(def);
        p.pests.push({ id: pool[Math.floor(r() * pool.length)], severity: 8 + r() * 10 });
      }
    }
    for (const pest of p.pests) {
      // pragas crescem com estresse, mas plantas saudáveis (e joaninhas) resistem
      const natural = p.health > 70 ? 3.5 : p.health > 45 ? 1.5 : 0;
      pest.severity = Math.min(100, pest.severity + 2.5 + stressLevel * 6 - natural);
    }
    p.pests = p.pests.filter((pe) => pe.severity > 1);
    const pestDamage = p.pests.reduce((s, pe) => s + pe.severity, 0) * 0.02;

    // ---- doenças ----
    if (!p.disease) {
      let fungusChance = w.fungusRisk * 0.04;
      if (p.stress.includes('overwatering')) fungusChance += 0.12;
      if (area.id === 'estufa' && !G.inventory.tools['ventilador-estufa']) fungusChance += 0.03;
      if (r() < fungusChance) {
        const pool = diseasePool(def);
        const id = p.stress.includes('overwatering') ? 'root-rot' : pool[Math.floor(r() * pool.length)];
        p.disease = { id, severity: 10 + r() * 12 };
      }
    } else {
      // fungo só avança em condições favoráveis; sem umidade excessiva, regride
      const favorable = p.stress.includes('overwatering') ? 8 : w.fungusRisk > 0.55 ? 3 : -3;
      p.disease.severity = Math.min(100, p.disease.severity + favorable);
      if (p.disease.severity <= 0) p.disease = null;
    }
    const diseaseDamage = (p.disease?.severity ?? 0) * 0.035;

    // ---- pontuação do dia ----
    const dayScore = Math.max(0, waterScore * 0.28 + ls.score * 0.22 + tempScore * 0.14 + soilScore * 0.12 + potScore * 0.08 + humScore * 0.08 + nutrScore * 0.08);

    // ---- saúde ----
    // crise hídrica: seca total ou encharcamento extremo machucam de verdade,
    // mesmo que todo o resto esteja perfeito
    const waterCrisis = waterScore < 0.15 ? (0.15 - waterScore) * 42 : 0;
    let healthDelta = (dayScore - 0.55) * 12 - pestDamage - diseaseDamage - waterCrisis;
    if (p.prunedRecently > 0) { p.prunedRecently--; healthDelta += 0.5; }
    p.health = Math.max(0, Math.min(100, p.health + healthDelta));

    // ---- morte ----
    if (p.health <= 0) {
      p.health = 0;
      p.deadDays = 0;
      G.stats.totalDied++;
      G.plantapedia[p.plantId].killed++;
      report.died.push(def.commonNamePT);
      continue;
    }
    // avisos visuais antes de morrer + rastreio de recuperação
    if (p.health < 30) {
      report.warnings.push({ uid: p.uid, msg: { pt: `${def.commonNamePT} está definhando!`, en: `${def.commonNameEN} is fading!` } });
    }
    if (p.health < 40) p.wasSick = true;
    else if (p.wasSick && p.health >= 80) {
      p.wasSick = false;
      onEvent({ type: 'heal-plant' });
    }

    // ---- dormência ----
    if (def.dormantInWinter && season === 'winter' && STAGE_ORDER.indexOf(p.stage) >= STAGE_ORDER.indexOf('juvenile')) {
      p.isDormant = true;
      p.stage = 'dormant';
      continue;
    }
    if (p.stage === 'dormant' && season !== 'winter') {
      p.isDormant = false;
      p.stage = 'mature';
      p.stageProgress = 0;
    }
    if (p.stage === 'dormant') continue;

    // ---- crescimento ----
    const growthRate = dayScore * (season === 'spring' ? 1.25 : season === 'winter' ? 0.6 : 1);
    p.stageProgress += growthRate / stageDays(def, p.stage);
    // qualidade acumulada (média móvel do cuidado)
    p.quality = Math.max(0, Math.min(100, p.quality * 0.93 + dayScore * 100 * 0.07));

    if (p.stageProgress >= 1) {
      p.stageProgress = 0;
      advanceStage(p, def, season, report);
    }

    // florescer contínuo dentro da estação
    if (p.stage === 'flowering') {
      p.bloomProgress = Math.min(1, p.bloomProgress + 0.15);
      if (!def.bloomSeasons.includes(season) && def.bloomSeasons.length > 0) {
        // fora de época: encerra floração
        p.stage = def.propagationMethods.includes('seed') ? 'seeding' : 'mature';
        p.stageProgress = 0;
        p.bloomProgress = 0;
      }
    }
  }

  // limpar mortas antigas automaticamente? não: jogador remove (afeta harmonia)
  const anyDead = G.plants.some((p) => isDead(p));
  if (anyDead) G.stats.daysWithoutDeadPlants = 0;
  else G.stats.daysWithoutDeadPlants++;
}

function advanceStage(p: PlantInstance, def: PlantData, season: string, report: DayReport): void {
  const idx = STAGE_ORDER.indexOf(p.stage);
  if (idx >= 0 && idx < STAGE_ORDER.length - 1) {
    p.stage = STAGE_ORDER[idx + 1];
    onEvent({ type: 'stage-reached', plantId: p.plantId, stage: p.stage, category: def.category });
    return;
  }
  if (p.stage === 'mature') {
    const canBloom = def.flowerColors.length > 0 && def.bloomSeasons.length > 0;
    if (canBloom && def.bloomSeasons.includes(season as never) && p.health >= 45 && p.quality >= 30) {
      p.stage = 'budding';
    }
    return;
  }
  if (p.stage === 'budding') {
    p.stage = 'flowering';
    p.bloomProgress = 0;
    G.plantapedia[p.plantId].timesBloomed++;
    report.bloomed.push(def.commonNamePT);
    onEvent({ type: 'stage-reached', plantId: p.plantId, stage: 'flowering', category: def.category });
    return;
  }
  if (p.stage === 'flowering') {
    if (def.propagationMethods.includes('seed')) { p.stage = 'seeding'; p.seedsReady = false; }
    else p.stage = 'mature';
    // orquídeas podem soltar keiki
    if (def.propagationMethods.includes('keiki')) p.keikiReady = true;
    return;
  }
  if (p.stage === 'seeding') {
    p.seedsReady = true;
    onEvent({ type: 'stage-reached', plantId: p.plantId, stage: 'seeding', category: def.category });
    if (def.lifeCycle === 'annual') {
      // anual completa o ciclo e morre naturalmente
      p.health = Math.min(p.health, 22);
    }
    p.stage = 'mature';
    return;
  }
}

// ---------- info p/ UI ----------
export type MoistureState = 'seca' | 'baixa' | 'ideal' | 'alta' | 'encharcada';
export function moistureState(p: PlantInstance): MoistureState {
  const def = PLANT_BY_ID[p.plantId];
  const [lo, hi] = idealMoistureBand(def);
  if (p.moisture < lo * 0.5) return 'seca';
  if (p.moisture < lo) return 'baixa';
  if (p.moisture <= hi) return 'ideal';
  if (p.moisture <= hi + 15) return 'alta';
  return 'encharcada';
}

export function healthLabel(p: PlantInstance): { pt: string; en: string } {
  if (isDead(p)) return { pt: 'Morta', en: 'Dead' };
  if (p.isDormant) return { pt: 'Dormente', en: 'Dormant' };
  if (p.health >= 90 && p.quality >= 80) return { pt: 'Perfeita', en: 'Perfect' };
  if (p.health >= 70) return { pt: 'Saudável', en: 'Healthy' };
  if (p.health >= 45) return { pt: 'Estressada', en: 'Stressed' };
  if (p.health >= 25) return { pt: 'Sofrendo', en: 'Suffering' };
  return { pt: 'Definhando', en: 'Fading' };
}
