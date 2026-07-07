import type { DecorData } from '../types';

// ============ DECORAÇÕES (52) ============
export const DECOR: DecorData[] = [
  // ---- caminhos ----
  { id: 'caminho-pedra', namePT: 'Caminho de pedra', nameEN: 'Stone Path', category: 'path', price: 12, beauty: 3, footprint: [1, 1], bonus: { type: 'order', value: 1 }, unlockRule: 'start', visual: 'path-stone' },
  { id: 'caminho-cascalho', namePT: 'Caminho de cascalho', nameEN: 'Gravel Path', category: 'path', price: 8, beauty: 2, footprint: [1, 1], bonus: { type: 'order', value: 1 }, unlockRule: 'start', visual: 'path-gravel' },
  { id: 'caminho-madeira', namePT: 'Deck de madeira', nameEN: 'Wood Decking', category: 'path', price: 15, beauty: 3, footprint: [1, 1], bonus: { type: 'order', value: 1 }, unlockRule: 'npc:tomas:1', visual: 'path-wood' },
  { id: 'caminho-tijolo', namePT: 'Caminho de tijolo', nameEN: 'Brick Path', category: 'path', price: 14, beauty: 3, footprint: [1, 1], bonus: { type: 'order', value: 1 }, unlockRule: 'shop:mercado-verde', visual: 'path-brick' },
  { id: 'caminho-areia', namePT: 'Areia rastelada', nameEN: 'Raked Sand', category: 'path', price: 10, beauty: 4, footprint: [1, 1], bonus: { type: 'theme', value: 2, theme: 'jardim-japones' }, unlockRule: 'npc:sora:1', visual: 'path-sand' },
  { id: 'laje-japonesa', namePT: 'Laje japonesa', nameEN: 'Japanese Stepping Stone', category: 'path', price: 18, beauty: 4, footprint: [1, 1], bonus: { type: 'theme', value: 2, theme: 'jardim-japones' }, unlockRule: 'npc:sora:1', visual: 'path-slab' },
  { id: 'mosaico', namePT: 'Mosaico artesanal', nameEN: 'Handmade Mosaic', category: 'path', price: 30, beauty: 6, footprint: [1, 1], unlockRule: 'npc:beatriz:2', visual: 'path-mosaic' },
  { id: 'trilha-natural', namePT: 'Trilha natural', nameEN: 'Natural Trail', category: 'path', price: 6, beauty: 2, footprint: [1, 1], bonus: { type: 'theme', value: 2, theme: 'jardim-selvagem' }, unlockRule: 'npc:nadia:1', visual: 'path-trail' },
  // ---- móveis ----
  { id: 'banco-madeira', namePT: 'Banco de madeira', nameEN: 'Wooden Bench', category: 'furniture', price: 45, beauty: 5, footprint: [2, 1], bonus: { type: 'visitors', value: 2 }, unlockRule: 'npc:tomas:1', visual: 'bench-wood' },
  { id: 'banco-ferro', namePT: 'Banco de ferro', nameEN: 'Iron Bench', category: 'furniture', price: 70, beauty: 7, footprint: [2, 1], bonus: { type: 'visitors', value: 2 }, unlockRule: 'shop:antiquario', visual: 'bench-iron' },
  { id: 'mesa-pequena', namePT: 'Mesa pequena', nameEN: 'Small Table', category: 'furniture', price: 35, beauty: 4, footprint: [1, 1], unlockRule: 'npc:tomas:1', visual: 'table-small' },
  { id: 'mesa-vasos', namePT: 'Mesa de vasos', nameEN: 'Pot Table', category: 'furniture', price: 50, beauty: 5, footprint: [2, 1], bonus: { type: 'beauty', value: 2 }, unlockRule: 'npc:tomas:1', visual: 'table-pots' },
  { id: 'prateleira', namePT: 'Prateleira de plantas', nameEN: 'Plant Shelf', category: 'furniture', price: 40, beauty: 4, footprint: [1, 1], bonus: { type: 'order', value: 2 }, unlockRule: 'shop:mercado-verde', visual: 'shelf' },
  { id: 'estante-plantas', namePT: 'Estante escada', nameEN: 'Ladder Plant Stand', category: 'furniture', price: 65, beauty: 6, footprint: [1, 1], bonus: { type: 'beauty', value: 3 }, unlockRule: 'npc:tomas:2', visual: 'ladder-stand' },
  { id: 'carrinho-plantas', namePT: 'Carrinho de plantas', nameEN: 'Plant Cart', category: 'furniture', price: 80, beauty: 7, footprint: [2, 1], unlockRule: 'shop:antiquario', visual: 'plant-cart' },
  { id: 'cadeira-jardim', namePT: 'Cadeira de jardim', nameEN: 'Garden Chair', category: 'furniture', price: 30, beauty: 4, footprint: [1, 1], bonus: { type: 'visitors', value: 1 }, unlockRule: 'npc:tomas:1', visual: 'chair' },
  { id: 'mesa-cha', namePT: 'Mesa de chá', nameEN: 'Tea Table', category: 'furniture', price: 90, beauty: 8, footprint: [2, 2], bonus: { type: 'visitors', value: 3 }, unlockRule: 'shop:antiquario', visual: 'tea-table' },
  // ---- água ----
  { id: 'fonte-pequena', namePT: 'Fonte pequena', nameEN: 'Small Fountain', category: 'water', price: 120, beauty: 9, footprint: [1, 1], bonus: { type: 'humidity', value: 2 }, unlockRule: 'shop:antiquario', visual: 'fountain-small' },
  { id: 'fonte-classica', namePT: 'Fonte clássica', nameEN: 'Classic Fountain', category: 'water', price: 260, beauty: 14, footprint: [2, 2], bonus: { type: 'visitors', value: 4 }, unlockRule: 'shop:antiquario', visual: 'fountain-classic' },
  { id: 'lago-pequeno', namePT: 'Lago pequeno', nameEN: 'Small Pond', category: 'water', price: 200, beauty: 12, footprint: [2, 2], bonus: { type: 'humidity', value: 3 }, unlockRule: 'npc:eva:1', visual: 'pond-small' },
  { id: 'riacho', namePT: 'Riacho decorativo', nameEN: 'Decorative Stream', category: 'water', price: 180, beauty: 10, footprint: [3, 1], bonus: { type: 'humidity', value: 2 }, unlockRule: 'npc:eva:2', visual: 'stream' },
  { id: 'vaso-aquatico-decor', namePT: 'Vaso aquático decorativo', nameEN: 'Water Bowl', category: 'water', price: 70, beauty: 6, footprint: [1, 1], bonus: { type: 'humidity', value: 1 }, unlockRule: 'npc:eva:1', visual: 'water-bowl' },
  { id: 'cascata', namePT: 'Cascata pequena', nameEN: 'Small Waterfall', category: 'water', price: 300, beauty: 15, footprint: [2, 1], bonus: { type: 'humidity', value: 3 }, unlockRule: 'npc:eva:2', visual: 'waterfall' },
  { id: 'banho-passaros', namePT: 'Banho de pássaros', nameEN: 'Bird Bath', category: 'water', price: 85, beauty: 7, footprint: [1, 1], bonus: { type: 'birds', value: 3 }, unlockRule: 'shop:antiquario', visual: 'bird-bath' },
  // ---- iluminação ----
  { id: 'lanterna-japonesa', namePT: 'Lanterna japonesa', nameEN: 'Japanese Lantern', category: 'light', price: 95, beauty: 8, footprint: [1, 1], bonus: { type: 'theme', value: 3, theme: 'jardim-japones' }, unlockRule: 'npc:sora:1', visual: 'lantern-jp' },
  { id: 'luzes-fada', namePT: 'Luzes de fada', nameEN: 'Fairy Lights', category: 'light', price: 40, beauty: 6, footprint: [2, 1], bonus: { type: 'beauty', value: 2 }, unlockRule: 'shop:floricultura', visual: 'fairy-lights' },
  { id: 'poste-baixo', namePT: 'Poste baixo', nameEN: 'Low Lamp Post', category: 'light', price: 55, beauty: 5, footprint: [1, 1], unlockRule: 'shop:mercado-verde', visual: 'lamp-post' },
  { id: 'luminaria-solar', namePT: 'Luminária solar', nameEN: 'Solar Light', category: 'light', price: 25, beauty: 3, footprint: [1, 1], unlockRule: 'shop:mercado-verde', visual: 'solar-light' },
  { id: 'velas', namePT: 'Velas protegidas', nameEN: 'Sheltered Candles', category: 'light', price: 20, beauty: 4, footprint: [1, 1], bonus: { type: 'visitors', value: 1 }, unlockRule: 'shop:antiquario', visual: 'candles' },
  // ---- estruturas ----
  { id: 'trelica', namePT: 'Treliça', nameEN: 'Trellis', category: 'structure', price: 40, beauty: 4, footprint: [1, 1], unlockRule: 'npc:tomas:1', visual: 'trellis' },
  { id: 'arco-rosas', namePT: 'Arco de rosas', nameEN: 'Rose Arch', category: 'structure', price: 110, beauty: 10, footprint: [2, 1], bonus: { type: 'beauty', value: 3 }, unlockRule: 'npc:tomas:2', visual: 'rose-arch' },
  { id: 'pergolado-decor', namePT: 'Pergolado', nameEN: 'Pergola', category: 'structure', price: 200, beauty: 11, footprint: [2, 2], bonus: { type: 'visitors', value: 3 }, unlockRule: 'npc:tomas:2', visual: 'pergola' },
  { id: 'cerca-baixa', namePT: 'Cerca baixa', nameEN: 'Low Fence', category: 'structure', price: 18, beauty: 3, footprint: [1, 1], bonus: { type: 'order', value: 1 }, unlockRule: 'npc:tomas:1', visual: 'fence' },
  { id: 'cerca-viva', namePT: 'Cerca viva', nameEN: 'Hedge', category: 'structure', price: 35, beauty: 5, footprint: [1, 1], bonus: { type: 'order', value: 2 }, unlockRule: 'shop:mercado-verde', visual: 'hedge' },
  { id: 'suporte-vertical', namePT: 'Suporte vertical', nameEN: 'Vertical Frame', category: 'structure', price: 60, beauty: 5, footprint: [1, 1], unlockRule: 'area:terraco', visual: 'vertical-frame' },
  { id: 'parede-verde', namePT: 'Parede verde', nameEN: 'Green Wall', category: 'structure', price: 240, beauty: 13, footprint: [2, 1], bonus: { type: 'beauty', value: 4 }, unlockRule: 'area:terraco', visual: 'green-wall' },
  { id: 'miniestufa-decor', namePT: 'Miniestufa de vidro', nameEN: 'Glass Cloche Frame', category: 'structure', price: 130, beauty: 8, footprint: [1, 1], unlockRule: 'area:viveiro', visual: 'mini-greenhouse' },
  { id: 'canteiro-elevado', namePT: 'Canteiro elevado', nameEN: 'Raised Bed', category: 'structure', price: 90, beauty: 6, footprint: [2, 1], bonus: { type: 'order', value: 2 }, unlockRule: 'npc:tomas:1', visual: 'raised-bed' },
  // ---- cozy ----
  { id: 'placa-madeira', namePT: 'Placa de madeira', nameEN: 'Wooden Sign', category: 'cozy', price: 15, beauty: 3, footprint: [1, 1], unlockRule: 'start', visual: 'sign' },
  { id: 'espantalho', namePT: 'Espantalho decorativo', nameEN: 'Decorative Scarecrow', category: 'cozy', price: 55, beauty: 5, footprint: [1, 1], unlockRule: 'shop:floricultura', visual: 'scarecrow' },
  { id: 'casinha-passaro', namePT: 'Casinha de pássaro', nameEN: 'Birdhouse', category: 'cozy', price: 40, beauty: 5, footprint: [1, 1], bonus: { type: 'birds', value: 3 }, unlockRule: 'npc:nadia:1', visual: 'birdhouse' },
  { id: 'comedouro', namePT: 'Comedouro de pássaros', nameEN: 'Bird Feeder', category: 'cozy', price: 35, beauty: 4, footprint: [1, 1], bonus: { type: 'birds', value: 4 }, unlockRule: 'npc:nadia:1', visual: 'bird-feeder' },
  { id: 'hotel-insetos', namePT: 'Hotel de insetos', nameEN: 'Insect Hotel', category: 'cozy', price: 60, beauty: 5, footprint: [1, 1], bonus: { type: 'butterflies', value: 4 }, unlockRule: 'npc:nadia:2', visual: 'insect-hotel' },
  { id: 'pedras-ornamentais', namePT: 'Pedras ornamentais', nameEN: 'Ornamental Rocks', category: 'cozy', price: 30, beauty: 4, footprint: [1, 1], bonus: { type: 'theme', value: 2, theme: 'jardim-japones' }, unlockRule: 'npc:sora:1', visual: 'rocks' },
  { id: 'escultura-pequena', namePT: 'Escultura pequena', nameEN: 'Small Sculpture', category: 'cozy', price: 120, beauty: 9, footprint: [1, 1], unlockRule: 'shop:antiquario', visual: 'sculpture' },
  { id: 'sinos-vento', namePT: 'Sinos de vento', nameEN: 'Wind Chimes', category: 'cozy', price: 30, beauty: 4, footprint: [1, 1], bonus: { type: 'visitors', value: 1 }, unlockRule: 'shop:antiquario', visual: 'wind-chimes' },
  { id: 'tapete-externo', namePT: 'Tapete externo', nameEN: 'Outdoor Rug', category: 'cozy', price: 45, beauty: 4, footprint: [2, 2], unlockRule: 'shop:antiquario', visual: 'rug' },
  { id: 'vaso-quebrado', namePT: 'Vaso quebrado decorativo', nameEN: 'Broken Pot Garden', category: 'cozy', price: 50, beauty: 7, footprint: [1, 1], bonus: { type: 'beauty', value: 2 }, unlockRule: 'shop:antiquario', visual: 'broken-pot' },
  { id: 'gnomo', namePT: 'Gnomo de jardim', nameEN: 'Garden Gnome', category: 'cozy', price: 38, beauty: 4, footprint: [1, 1], bonus: { type: 'visitors', value: 1 }, unlockRule: 'shop:floricultura', visual: 'gnome' },
  { id: 'regador-decorativo', namePT: 'Regador decorativo', nameEN: 'Decorative Watering Can', category: 'cozy', price: 22, beauty: 3, footprint: [1, 1], unlockRule: 'shop:antiquario', visual: 'decor-can' },
  { id: 'colmeia-decor', namePT: 'Colmeia rústica', nameEN: 'Rustic Beehive', category: 'cozy', price: 75, beauty: 6, footprint: [1, 1], bonus: { type: 'butterflies', value: 2 }, unlockRule: 'npc:nadia:2', visual: 'beehive' },
  { id: 'espiral-ervas', namePT: 'Espiral de ervas', nameEN: 'Herb Spiral', category: 'structure', price: 85, beauty: 7, footprint: [2, 2], bonus: { type: 'theme', value: 3, theme: 'jardim-ervas' }, unlockRule: 'area:jardim-ervas', visual: 'herb-spiral' },
];

export const DECOR_BY_ID: Record<string, DecorData> = {};
for (const d of DECOR) DECOR_BY_ID[d.id] = d;
