import type { PlantData, PlantInstance } from '../types';
import { PLANT_BY_ID, PLANTS } from '../data/plants';
import { POTS, POT_BY_ID } from '../data/potsData';
import { SOIL_COMPONENTS, SOIL_MIXES } from '../data/soilData';
import { TOOLS, CONSUMABLES, TOOL_BY_ID, CONSUMABLE_BY_ID } from '../data/toolsData';
import { DECOR, DECOR_BY_ID } from '../data/decorData';
import { SEASON_PRICE_MULT, SHOP_BY_ID, ShopSection } from '../data/shopsData';
import { G, addMoney, isUnlocked, notify } from './gameState';
import { rng } from './weatherSystem';
import { absoluteDay } from './gameTime';
import { onEvent } from './progressSystems';
import { sfx } from '../audio/audioEngine';

// ---------- preços ----------
export function seasonMult(category: string): number {
  return SEASON_PRICE_MULT[G.calendar.season][category] ?? 1;
}

export function marketDrift(category: string): number {
  return 1 + (G.marketDrift[category] ?? 0);
}

export function seedPrice(def: PlantData): number {
  const rarityMult = { common: 1, uncommon: 1.6, rare: 2.6, 'very-rare': 4, legendary: 6.5 }[def.rarity];
  return Math.max(2, Math.round(def.marketValue * 0.35 * rarityMult));
}

export function seedlingPrice(def: PlantData): number {
  return Math.max(4, Math.round(seedPrice(def) * 2.2));
}

/** valor de venda de uma planta viva */
export function plantSaleValue(p: PlantInstance): number {
  const def = PLANT_BY_ID[p.plantId];
  const stageMult: Record<string, number> = {
    seed: 0.1, sprout: 0.2, seedling: 0.35, 'young-seedling': 0.5, juvenile: 0.7,
    mature: 1, budding: 1.15, flowering: 1.5, seeding: 1.0, dormant: 0.8,
  };
  const healthMult = p.health <= 0 ? 0 : 0.3 + (p.health / 100) * 0.5 + (p.quality / 100) * 0.4;
  const base = def.marketValue * (stageMult[p.stage] ?? 1) * healthMult * seasonMult(def.category) * marketDrift(def.category);
  return Math.max(1, Math.round(base));
}

export function flowerPrice(plantId: string): number {
  const def = PLANT_BY_ID[plantId];
  const outOfSeason = def.bloomSeasons.length && !def.bloomSeasons.includes(G.calendar.season);
  return Math.max(2, Math.round(def.marketValue * 0.3 * (outOfSeason ? 1.6 : 1) * seasonMult(def.category)));
}

export function cuttingSaleValue(plantId: string): number {
  const def = PLANT_BY_ID[plantId];
  return Math.max(2, Math.round(seedlingPrice(def) * 0.55));
}

// ---------- estoque das lojas ----------
export interface ShopItem {
  kind: 'seed' | 'seedling' | 'pot' | 'soil-component' | 'soil-mix' | 'tool' | 'consumable' | 'decor';
  id: string;
  price: number;
  namePT: string; nameEN: string;
  owned?: boolean;
}

const RARITY_ORDER = ['common', 'uncommon', 'rare', 'very-rare', 'legendary'];

export function shopStock(shopId: string): ShopItem[] {
  const shop = SHOP_BY_ID[shopId];
  if (!shop) return [];
  const items: ShopItem[] = [];
  const absDay = absoluteDay(G.calendar);

  const addSection = (sec: ShopSection) => {
    switch (sec.kind) {
      case 'seeds': case 'seedlings': {
        const maxR = RARITY_ORDER.indexOf(sec.maxRarity);
        for (const p of PLANTS) {
          if (!sec.categories.includes(p.category)) continue;
          if (RARITY_ORDER.indexOf(p.rarity) > maxR) continue;
          if (!isUnlocked(p.unlockRule) && !p.unlockRule.startsWith('shop:')) continue;
          if (p.unlockRule.startsWith('shop:') && p.unlockRule !== `shop:${shopId}` && p.unlockRule !== 'start') continue;
          // reputação limita raridade visível
          if (p.rarity === 'rare' && G.reputation < 15) continue;
          if (p.rarity === 'very-rare' && G.reputation < 35) continue;
          if (p.rarity === 'legendary' && G.reputation < 60) continue;
          if (sec.kind === 'seeds') items.push({ kind: 'seed', id: p.id, price: seedPrice(p), namePT: `Sementes: ${p.commonNamePT}`, nameEN: `Seeds: ${p.commonNameEN}` });
          else items.push({ kind: 'seedling', id: p.id, price: seedlingPrice(p), namePT: `Muda: ${p.commonNamePT}`, nameEN: `Seedling: ${p.commonNameEN}` });
        }
        break;
      }
      case 'pots':
        for (const pot of POTS) {
          if (!isUnlocked(pot.unlockRule) && pot.unlockRule !== `shop:${shopId}`) {
            if (!pot.unlockRule.startsWith('shop:') || pot.unlockRule !== `shop:${shopId}`) {
              if (!pot.unlockRule.startsWith('shop:')) continue;
              if (pot.unlockRule !== `shop:${shopId}`) continue;
            }
          }
          items.push({ kind: 'pot', id: pot.id, price: pot.price, namePT: pot.namePT, nameEN: pot.nameEN });
        }
        break;
      case 'soil':
        for (const c of SOIL_COMPONENTS) {
          if (!isUnlocked(c.unlockRule) && c.unlockRule !== `shop:${shopId}` && !c.unlockRule.startsWith('shop:')) continue;
          if (c.unlockRule.startsWith('npc:') && !isUnlocked(c.unlockRule)) continue;
          items.push({ kind: 'soil-component', id: c.id, price: c.price, namePT: c.namePT, nameEN: c.nameEN });
        }
        for (const m of SOIL_MIXES) {
          if (m.unlockRule && m.unlockRule.startsWith('npc:') && !isUnlocked(m.unlockRule)) continue;
          items.push({ kind: 'soil-mix', id: m.id, price: m.price ?? 10, namePT: m.namePT, nameEN: m.nameEN });
        }
        break;
      case 'tools':
        for (const t of TOOLS) {
          if (t.price === 0) continue;
          if (t.unlockRule.startsWith('npc:') && !isUnlocked(t.unlockRule)) continue;
          if (t.unlockRule.startsWith('area:') && !isUnlocked(t.unlockRule)) continue;
          items.push({ kind: 'tool', id: t.id, price: t.price, namePT: t.namePT, nameEN: t.nameEN, owned: !!G.inventory.tools[t.id] });
        }
        break;
      case 'consumables':
        for (const c of CONSUMABLES) {
          if (c.unlockRule.startsWith('npc:') && !isUnlocked(c.unlockRule)) continue;
          items.push({ kind: 'consumable', id: c.id, price: c.price, namePT: c.namePT, nameEN: c.nameEN });
        }
        break;
      case 'decor':
        for (const d of DECOR) {
          if (!sec.categories.includes(d.category)) continue;
          if (d.unlockRule.startsWith('npc:') && !isUnlocked(d.unlockRule)) continue;
          if (d.unlockRule.startsWith('area:') && !isUnlocked(d.unlockRule)) continue;
          items.push({ kind: 'decor', id: d.id, price: d.price, namePT: d.namePT, nameEN: d.nameEN });
        }
        break;
      case 'rare-rotation': {
        // feira: 6 raridades rotativas por semana
        const week = Math.floor(absDay / 7);
        const r = rng(week * 1237 + 5);
        const pool = PLANTS.filter((p) => ['rare', 'very-rare', 'legendary'].includes(p.rarity));
        const picks = new Set<number>();
        while (picks.size < Math.min(6, pool.length)) picks.add(Math.floor(r() * pool.length));
        for (const i of picks) {
          const p = pool[i];
          items.push({ kind: 'seedling', id: p.id, price: Math.round(seedlingPrice(p) * 1.2), namePT: `Muda rara: ${p.commonNamePT}`, nameEN: `Rare seedling: ${p.commonNameEN}` });
        }
        break;
      }
    }
  };
  for (const sec of shop.sells) addSection(sec);
  // dedup por kind+id
  const seen = new Set<string>();
  return items.filter((i) => {
    const k = i.kind + ':' + i.id;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function buyItem(item: ShopItem): { ok: boolean; msg?: { pt: string; en: string } } {
  if (G.money < item.price) return { ok: false, msg: { pt: 'Moedas insuficientes.', en: 'Not enough coins.' } };
  if (item.kind === 'tool' && G.inventory.tools[item.id]) return { ok: false, msg: { pt: 'Você já tem esta ferramenta.', en: 'You already own this tool.' } };
  addMoney(-item.price);
  switch (item.kind) {
    case 'seed': G.inventory.seeds[item.id] = (G.inventory.seeds[item.id] ?? 0) + 1; break;
    case 'seedling': G.inventory.seedlings[item.id] = (G.inventory.seedlings[item.id] ?? 0) + 1; break;
    case 'pot': G.inventory.pots[item.id] = (G.inventory.pots[item.id] ?? 0) + 1; break;
    case 'soil-component': G.inventory.soilComponents[item.id] = (G.inventory.soilComponents[item.id] ?? 0) + 1; break;
    case 'soil-mix': G.inventory.soilMixes[item.id] = (G.inventory.soilMixes[item.id] ?? 0) + 1; break;
    case 'tool': {
      G.inventory.tools[item.id] = true;
      if (item.id === 'coletor-chuva') G.rainBarrel = true;
      break;
    }
    case 'consumable': {
      const c = CONSUMABLE_BY_ID[item.id];
      if (c?.kind === 'fertilizer') G.inventory.fertilizers[item.id] = (G.inventory.fertilizers[item.id] ?? 0) + 1;
      else G.inventory.treatments[item.id] = (G.inventory.treatments[item.id] ?? 0) + 1;
      break;
    }
    case 'decor': G.inventory.decor[item.id] = (G.inventory.decor[item.id] ?? 0) + 1; break;
  }
  sfx('coin');
  notify();
  return { ok: true };
}

// ---------- vender ----------
export function sellPlant(p: PlantInstance): void {
  const value = plantSaleValue(p);
  addMoney(value);
  const def = PLANT_BY_ID[p.plantId];
  const idx = G.plants.indexOf(p);
  if (idx >= 0) G.plants.splice(idx, 1);
  if (p.potId) G.inventory.pots[p.potId] = (G.inventory.pots[p.potId] ?? 0) + 1;
  G.stats.totalSold++;
  // demanda cai levemente ao vender muito da mesma categoria
  G.marketDrift[def.category] = Math.max(-0.3, (G.marketDrift[def.category] ?? 0) - 0.02);
  onEvent({ type: 'sell', what: 'plant', value });
  sfx('coin');
  notify();
}

export function sellFlower(plantId: string, qty: number): void {
  const have = G.inventory.flowers[plantId] ?? 0;
  const n = Math.min(have, qty);
  if (n <= 0) return;
  G.inventory.flowers[plantId] = have - n;
  addMoney(flowerPrice(plantId) * n);
  G.stats.totalSold += n;
  onEvent({ type: 'sell', what: 'flower', value: flowerPrice(plantId) * n });
  sfx('coin');
  notify();
}

export function sellCutting(plantId: string, qty: number): void {
  const have = G.inventory.cuttings[plantId] ?? 0;
  const n = Math.min(have, qty);
  if (n <= 0) return;
  G.inventory.cuttings[plantId] = have - n;
  addMoney(cuttingSaleValue(plantId) * n);
  G.stats.totalSold += n;
  onEvent({ type: 'sell', what: 'seedling', value: cuttingSaleValue(plantId) * n });
  sfx('coin');
  notify();
}

export function sellSeeds(plantId: string, qty: number): void {
  const have = G.inventory.seeds[plantId] ?? 0;
  const n = Math.min(have, qty);
  if (n <= 0) return;
  const def = PLANT_BY_ID[plantId];
  G.inventory.seeds[plantId] = have - n;
  addMoney(Math.max(1, Math.round(seedPrice(def) * 0.5)) * n);
  G.stats.totalSold += n;
  onEvent({ type: 'sell', what: 'seed', value: n });
  sfx('coin');
  notify();
}

export function sellArrangement(uidNum: number): void {
  const idx = G.inventory.arrangements.findIndex((a) => a.uid === uidNum);
  if (idx < 0) return;
  const arr = G.inventory.arrangements[idx];
  addMoney(arr.value);
  G.inventory.arrangements.splice(idx, 1);
  G.stats.totalSold++;
  onEvent({ type: 'sell', what: 'arrangement', value: arr.value });
  sfx('coin');
  notify();
}

// deriva de mercado diária: recupera lentamente
export function dailyMarketDrift(): void {
  for (const k of Object.keys(G.marketDrift)) {
    G.marketDrift[k] = G.marketDrift[k] * 0.94;
    if (Math.abs(G.marketDrift[k]) < 0.01) delete G.marketDrift[k];
  }
}

// ---------- utilidade p/ UI ----------
export function itemName(kind: string, id: string, lang: 'pt' | 'en'): string {
  if (kind === 'pot') { const p = POT_BY_ID[id]; return p ? (lang === 'pt' ? p.namePT : p.nameEN) : id; }
  if (kind === 'tool') { const t = TOOL_BY_ID[id]; return t ? (lang === 'pt' ? t.namePT : t.nameEN) : id; }
  if (kind === 'decor') { const d = DECOR_BY_ID[id]; return d ? (lang === 'pt' ? d.namePT : d.nameEN) : id; }
  const pl = PLANT_BY_ID[id];
  if (pl) return lang === 'pt' ? pl.commonNamePT : pl.commonNameEN;
  return id;
}
