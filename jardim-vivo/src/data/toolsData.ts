import type { ToolData } from '../types';

// ============ FERRAMENTAS (28) ============
export const TOOLS: ToolData[] = [
  { id: 'regador-velho', namePT: 'Regador velho', nameEN: 'Old Watering Can', descPT: 'Rega uma planta por vez. Enferrujado, mas honesto.', descEN: 'Waters one plant at a time. Rusty but honest.', price: 0, unlockRule: 'start', kind: 'watering' },
  { id: 'regador-medio', namePT: 'Regador médio', nameEN: 'Medium Watering Can', descPT: 'Rega com mais precisão e enche menos vezes.', descEN: 'Waters with more precision and fewer refills.', price: 40, unlockRule: 'shop:mercado-verde', kind: 'watering' },
  { id: 'regador-preciso', namePT: 'Regador preciso', nameEN: 'Precision Watering Can', descPT: 'Bico longo: escolha entre rega leve, normal ou profunda.', descEN: 'Long spout: choose light, normal or deep watering.', price: 120, unlockRule: 'shop:mercado-verde', kind: 'watering' },
  { id: 'borrifador', namePT: 'Borrifador', nameEN: 'Mister', descPT: 'Névoa fina para folhas tropicais e mudas.', descEN: 'Fine mist for tropical leaves and seedlings.', price: 18, unlockRule: 'shop:mercado-verde', kind: 'watering' },
  { id: 'pa-pequena', namePT: 'Pá pequena', nameEN: 'Hand Trowel', descPT: 'Plantar e replantar em vasos.', descEN: 'Plant and repot in containers.', price: 0, unlockRule: 'start', kind: 'digging' },
  { id: 'pa-jardim', namePT: 'Pá de jardim', nameEN: 'Garden Spade', descPT: 'Prepara canteiros inteiros no chão.', descEN: 'Preps whole ground beds.', price: 35, unlockRule: 'shop:mercado-verde', kind: 'digging' },
  { id: 'ancinho', namePT: 'Ancinho', nameEN: 'Rake', descPT: 'Limpa folhas mortas e afofa a terra.', descEN: 'Clears dead leaves and loosens soil.', price: 25, unlockRule: 'shop:mercado-verde', kind: 'digging' },
  { id: 'tesoura-poda', namePT: 'Tesoura de poda', nameEN: 'Pruning Shears', descPT: 'Poda, remove flores murchas e corta estacas.', descEN: 'Prunes, deadheads and takes cuttings.', price: 30, unlockRule: 'shop:mercado-verde', kind: 'cutting' },
  { id: 'tesoura-bonsai', namePT: 'Tesoura de bonsai', nameEN: 'Bonsai Scissors', descPT: 'Cortes finos para bonsai e poda de raiz.', descEN: 'Fine cuts for bonsai and root pruning.', price: 90, unlockRule: 'npc:kenji:1', kind: 'cutting' },
  { id: 'medidor-umidade', namePT: 'Medidor de umidade', nameEN: 'Moisture Meter', descPT: 'Mostra o número exato de umidade do solo.', descEN: 'Shows exact soil moisture numbers.', price: 60, unlockRule: 'shop:mercado-verde', kind: 'measure' },
  { id: 'medidor-ph', namePT: 'Medidor de pH', nameEN: 'pH Meter', descPT: 'Revela o pH do solo de cada planta.', descEN: 'Reveals each plant\'s soil pH.', price: 75, unlockRule: 'shop:mercado-verde', kind: 'measure' },
  { id: 'medidor-luz', namePT: 'Medidor de luz', nameEN: 'Light Meter', descPT: 'Mede a luz real recebida em cada posição.', descEN: 'Measures actual light at each spot.', price: 75, unlockRule: 'shop:mercado-verde', kind: 'measure' },
  { id: 'termometro', namePT: 'Termômetro', nameEN: 'Thermometer', descPT: 'Temperatura por área, incluindo estufa.', descEN: 'Per-area temperature, greenhouse included.', price: 40, unlockRule: 'shop:mercado-verde', kind: 'measure' },
  { id: 'medidor-nutrientes', namePT: 'Medidor de nutrientes', nameEN: 'Nutrient Tester', descPT: 'Exibe N-P-K do solo em números.', descEN: 'Shows soil N-P-K in numbers.', price: 110, unlockRule: 'npc:alvaro:2', kind: 'measure' },
  { id: 'lupa-pragas', namePT: 'Lupa de pragas', nameEN: 'Pest Loupe', descPT: 'Identifica pragas cedo, antes do estrago.', descEN: 'Spots pests early, before the damage.', price: 55, unlockRule: 'shop:mercado-verde', kind: 'measure' },
  { id: 'luvas', namePT: 'Luvas de jardim', nameEN: 'Garden Gloves', descPT: 'Protege ao mexer com espinhos e seiva tóxica.', descEN: 'Protection for thorns and toxic sap.', price: 15, unlockRule: 'shop:mercado-verde', kind: 'utility' },
  { id: 'carrinho', namePT: 'Carrinho de mão', nameEN: 'Wheelbarrow', descPT: 'Move vasos grandes sem esforço.', descEN: 'Moves big pots effortlessly.', price: 80, unlockRule: 'shop:mercado-verde', kind: 'utility' },
  { id: 'bancada-plantio', namePT: 'Bancada de plantio', nameEN: 'Potting Bench', descPT: 'Central de replantio, mistura de solo e propagação.', descEN: 'Hub for repotting, soil mixing and propagation.', price: 0, unlockRule: 'start', kind: 'infrastructure' },
  { id: 'composteira', namePT: 'Composteira', nameEN: 'Compost Bin', descPT: 'Transforma restos de poda em composto grátis a cada semana.', descEN: 'Turns pruning scraps into free compost weekly.', price: 150, unlockRule: 'npc:nadia:1', kind: 'infrastructure' },
  { id: 'coletor-chuva', namePT: 'Coletor de água da chuva', nameEN: 'Rain Barrel', descPT: 'Guarda água de chuva: de graça e sem cloro.', descEN: 'Stores rainwater: free and chlorine-free.', price: 130, unlockRule: 'npc:nadia:1', kind: 'infrastructure' },
  { id: 'gotejamento', namePT: 'Irrigação por gotejamento', nameEN: 'Drip Irrigation', descPT: 'Rega automática diária para uma área inteira.', descEN: 'Automatic daily watering for a whole area.', price: 300, unlockRule: 'shop:mercado-verde', kind: 'infrastructure' },
  { id: 'lampada-crescimento', namePT: 'Lâmpada de crescimento', nameEN: 'Grow Light', descPT: 'Luz artificial para estufa e sala interna.', descEN: 'Artificial light for greenhouse and indoor room.', price: 180, unlockRule: 'area:estufa', kind: 'infrastructure' },
  { id: 'ventilador-estufa', namePT: 'Ventilador de estufa', nameEN: 'Greenhouse Fan', descPT: 'Ar circulando = menos fungo na estufa.', descEN: 'Moving air = less greenhouse fungus.', price: 140, unlockRule: 'area:estufa', kind: 'infrastructure' },
  { id: 'umidificador', namePT: 'Umidificador', nameEN: 'Humidifier', descPT: 'Aumenta a umidade para tropicais exigentes.', descEN: 'Raises humidity for demanding tropicals.', price: 160, unlockRule: 'area:sala-plantas', kind: 'infrastructure' },
  { id: 'aquecedor-estufa', namePT: 'Aquecedor de estufa', nameEN: 'Greenhouse Heater', descPT: 'Mantém a estufa quente no inverno.', descEN: 'Keeps the greenhouse warm in winter.', price: 220, unlockRule: 'area:estufa', kind: 'infrastructure' },
  { id: 'bandeja-propagacao', namePT: 'Bandeja de propagação', nameEN: 'Propagation Tray', descPT: 'Mais chance de sucesso em estacas e sementes.', descEN: 'Better success with cuttings and seeds.', price: 45, unlockRule: 'area:viveiro', kind: 'infrastructure' },
  { id: 'etiquetas', namePT: 'Etiquetas de plantas', nameEN: 'Plant Labels', descPT: 'Mostra nome e estado de cada planta no jardim.', descEN: 'Shows each plant\'s name and state in the garden.', price: 20, unlockRule: 'shop:floricultura', kind: 'utility' },
  { id: 'oleo-neem', namePT: 'Óleo de neem', nameEN: 'Neem Oil', descPT: 'Trata pulgões, cochonilhas e ácaros sem veneno pesado.', descEN: 'Treats aphids, mealybugs and mites without harsh poison.', price: 25, unlockRule: 'shop:mercado-verde', kind: 'treatment' },
];

export const TOOL_BY_ID: Record<string, ToolData> = {};
for (const t of TOOLS) TOOL_BY_ID[t.id] = t;

// ============ ADUBOS E TRATAMENTOS (consumíveis) ============
export interface ConsumableData {
  id: string; namePT: string; nameEN: string; descPT: string; descEN: string;
  price: number; unlockRule: string;
  kind: 'fertilizer' | 'treatment';
  fx: { n?: number; p?: number; k?: number; healPest?: number; healFungus?: number; slowRelease?: boolean };
}

export const CONSUMABLES: ConsumableData[] = [
  { id: 'fert-liquido', namePT: 'Fertilizante líquido', nameEN: 'Liquid Fertilizer', descPT: 'NPK equilibrado de ação rápida.', descEN: 'Fast balanced NPK.', price: 8, unlockRule: 'start', kind: 'fertilizer', fx: { n: 25, p: 25, k: 25 } },
  { id: 'fert-lento', namePT: 'Liberação lenta', nameEN: 'Slow-release Pellets', descPT: 'Nutre aos poucos por semanas.', descEN: 'Feeds slowly for weeks.', price: 14, unlockRule: 'shop:mercado-verde', kind: 'fertilizer', fx: { n: 40, p: 40, k: 40, slowRelease: true } },
  { id: 'fert-floracao', namePT: 'Adubo de floração', nameEN: 'Bloom Booster', descPT: 'Rico em fósforo: mais botões e flores.', descEN: 'Phosphorus-rich: more buds and blooms.', price: 12, unlockRule: 'shop:mercado-verde', kind: 'fertilizer', fx: { n: 10, p: 40, k: 20 } },
  { id: 'fert-folhagem', namePT: 'Adubo de folhagem', nameEN: 'Foliage Feed', descPT: 'Rico em nitrogênio: folhas grandes e verdes.', descEN: 'Nitrogen-rich: big green leaves.', price: 12, unlockRule: 'shop:mercado-verde', kind: 'fertilizer', fx: { n: 40, p: 10, k: 20 } },
  { id: 'fert-orquideas', namePT: 'Adubo p/ orquídeas', nameEN: 'Orchid Feed', descPT: 'Suave e diluído, do jeito que orquídea gosta.', descEN: 'Mild and dilute, just how orchids like it.', price: 15, unlockRule: 'npc:helena:1', kind: 'fertilizer', fx: { n: 15, p: 20, k: 15 } },
  { id: 'fert-cactos', namePT: 'Adubo p/ cactos', nameEN: 'Cactus Feed', descPT: 'Pouco nitrogênio, mais potássio.', descEN: 'Low nitrogen, more potassium.', price: 12, unlockRule: 'shop:mercado-verde', kind: 'fertilizer', fx: { n: 8, p: 15, k: 30 } },
  { id: 'composto-item', namePT: 'Composto orgânico', nameEN: 'Compost Scoop', descPT: 'Melhora o solo e nutre devagar.', descEN: 'Improves soil, feeds gently.', price: 6, unlockRule: 'start', kind: 'fertilizer', fx: { n: 15, p: 15, k: 15, slowRelease: true } },
  { id: 'torta-mamona', namePT: 'Torta de mamona', nameEN: 'Castor Bean Cake', descPT: 'Nitrogênio orgânico potente. Tóxica para pets!', descEN: 'Potent organic nitrogen. Toxic to pets!', price: 10, unlockRule: 'npc:alvaro:2', kind: 'fertilizer', fx: { n: 35, p: 10, k: 10, slowRelease: true } },
  { id: 'neem-item', namePT: 'Dose de óleo de neem', nameEN: 'Neem Oil Dose', descPT: 'Trata pragas leves e médias.', descEN: 'Treats light and medium pests.', price: 8, unlockRule: 'shop:mercado-verde', kind: 'treatment', fx: { healPest: 60 } },
  { id: 'sabao-inseticida', namePT: 'Sabão inseticida', nameEN: 'Insecticidal Soap', descPT: 'Lava pulgões e mosca-branca das folhas.', descEN: 'Washes aphids and whitefly off leaves.', price: 6, unlockRule: 'shop:mercado-verde', kind: 'treatment', fx: { healPest: 45 } },
  { id: 'fungicida-natural', namePT: 'Fungicida natural', nameEN: 'Natural Fungicide', descPT: 'Calda de bicarbonato contra oídio e manchas.', descEN: 'Bicarbonate spray against mildew and spots.', price: 9, unlockRule: 'shop:mercado-verde', kind: 'treatment', fx: { healFungus: 55 } },
  { id: 'isca-lesmas', namePT: 'Barreira anti-lesmas', nameEN: 'Slug Barrier', descPT: 'Casca de ovo e cinzas: lesmas dão meia-volta.', descEN: 'Eggshell and ash: slugs turn right around.', price: 7, unlockRule: 'shop:mercado-verde', kind: 'treatment', fx: { healPest: 70 } },
];

export const CONSUMABLE_BY_ID: Record<string, ConsumableData> = {};
for (const c of CONSUMABLES) CONSUMABLE_BY_ID[c.id] = c;
