// =============================================================================
// data.js — DEFINIÇÕES ESTÁTICAS do jogo (JSON-limpo).
// Regra: só DADOS. Sem lógica de simulação, sem acesso ao DOM.
// Tudo aqui é "receita"; o estado mutável do jogador vive em state.js.
// =============================================================================

// --- Recursos iniciais do jogador -------------------------------------------
export const RESOURCES_INIT = { gold: 500, iron: 0, wood: 0, crystals: 0, herbs: 0 };

// --- SKILLS / AÇÕES ----------------------------------------------------------
// targetType: 'enemy' | 'ally' | 'self'  (para quem a ação faz sentido)
// kind:       'damage' | 'heal'
// stat:       atributo do executor que escala o efeito
// power:      multiplicador sobre o atributo
// mp:         custo de mana
export const SKILLS = {
  basic_attack: { id:'basic_attack', name:'Ataque Básico',  kind:'damage', targetType:'enemy', stat:'atk', power:1.00, mp:0 },
  power_shot:   { id:'power_shot',   name:'Tiro Certeiro',   kind:'damage', targetType:'enemy', stat:'atk', power:1.30, mp:3, critBonus:0.15 },
  fireball:     { id:'fireball',     name:'Bola de Fogo',    kind:'damage', targetType:'enemy', stat:'mag', power:1.60, mp:6, element:'fire' },
  holy_strike:  { id:'holy_strike',  name:'Ataque Sagrado',  kind:'damage', targetType:'enemy', stat:'mag', power:1.10, mp:4, element:'holy' },
  heal:         { id:'heal',         name:'Curar',           kind:'heal',   targetType:'ally',  stat:'mag', power:1.40, mp:5 },
};

// --- CONDIÇÕES DE GAMBIT (metadados) ----------------------------------------
// A LÓGICA de cada condição fica em gambits.js (CONDITION_FNS). Aqui só o rótulo
// e o "scope" (de qual time vem o alvo, relativo a quem executa).
// scope: 'enemy' (time oposto) | 'ally' (mesmo time, inclui a si) | 'self'
export const CONDITIONS = {
  enemy_nearest:   { id:'enemy_nearest',   label:'Inimigo: Mais Próximo', scope:'enemy', starter:true },
  enemy_any:       { id:'enemy_any',       label:'Inimigo: Qualquer',     scope:'enemy', starter:true },
  enemy_lowest_hp: { id:'enemy_lowest_hp', label:'Inimigo: Menor HP',     scope:'enemy' },
  enemy_boss:      { id:'enemy_boss',      label:'Inimigo: Chefe',        scope:'enemy' },
  ally_hp_50:      { id:'ally_hp_50',      label:'Aliado: HP < 50%',      scope:'ally',  starter:true },
  ally_hp_25:      { id:'ally_hp_25',      label:'Aliado: HP < 25%',      scope:'ally' },
  ally_dead:       { id:'ally_dead',       label:'Aliado: Morto',         scope:'ally' },
  self_mp_low:     { id:'self_mp_low',     label:'Eu: MP < 10',           scope:'self' },
};

// --- HERÓIS INICIAIS ---------------------------------------------------------
// base: atributos-base da classe (antes de forja/nível).
// gambits: config PADRÃO de fábrica (ordenada, topo→baixo).
// slots: linhas de gambit ativas hoje. maxSlots: teto comprável na Academia.
export const HERO_DEFS = [
  {
    id:'warrior', name:'Guerreiro', klass:'Cavaleiro', sprite:'🛡️',
    armorWeight:'heavy', weaponStyle:'shield', weaponStyles:['shield','twohand'],
    base:{ hp:120, atk:14, def:8, mag:2, mp:10, spd:6 },
    weaponLevel:0, slots:2, maxSlots:5,
    skills:['basic_attack'],
    gambits:[
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },
  {
    id:'cleric', name:'Clérigo', klass:'Clérigo', sprite:'✨',
    armorWeight:'light', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:90, atk:7, def:5, mag:14, mp:40, spd:7 },
    weaponLevel:0, slots:2, maxSlots:5,
    skills:['heal','holy_strike','basic_attack'],
    gambits:[
      { condition:'ally_hp_50', action:'heal' },
      { condition:'enemy_any',  action:'holy_strike' },
    ],
  },
  {
    id:'archer', name:'Arqueiro', klass:'Arqueiro Caçador', sprite:'🏹',
    armorWeight:'medium', weaponStyle:'ranged', weaponStyles:['ranged','dual'],
    base:{ hp:80, atk:12, def:4, mag:4, mp:20, spd:9 },
    weaponLevel:0, slots:2, maxSlots:5,
    skills:['power_shot','basic_attack'],
    gambits:[
      { condition:'enemy_nearest', action:'power_shot' },
      { condition:'enemy_any',     action:'basic_attack' },
    ],
  },
  {
    id:'mage', name:'Mago', klass:'Mago Elemental', sprite:'🔮',
    armorWeight:'light', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:70, atk:5, def:3, mag:16, mp:45, spd:8 },
    weaponLevel:0, slots:2, maxSlots:5,
    skills:['fireball','basic_attack'],
    gambits:[
      { condition:'enemy_any',     action:'fireball' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },
];

// --- INIMIGOS ----------------------------------------------------------------
// gold: [min,max] de ouro dropado. drops: tabela de recursos por chance.
export const ENEMY_DEFS = {
  slime:        { id:'slime',        name:'Gosma',        sprite:'🟢', base:{hp:30, atk:6,  def:2, mag:0, mp:0, spd:3}, gold:[2,5],  drops:[{res:'herbs', chance:0.50, qty:[1,2]}] },
  goblin:       { id:'goblin',       name:'Goblin',       sprite:'👺', base:{hp:40, atk:9,  def:3, mag:0, mp:0, spd:5}, gold:[3,7],  drops:[{res:'iron',  chance:0.40, qty:[1,2]}] },
  goblin_brute: { id:'goblin_brute', name:'Bruto Goblin', sprite:'👹', base:{hp:75, atk:14, def:6, mag:0, mp:0, spd:4}, gold:[6,12], drops:[{res:'iron',  chance:0.60, qty:[1,3]}] },
};

// Gambit padrão dos inimigos (IA simples: sempre bate no mais próximo).
export const ENEMY_GAMBITS = [ { condition:'enemy_nearest', action:'basic_attack' } ];

// --- MAPA / FASES ------------------------------------------------------------
// waves: cada sub-array é uma leva de inimigos (ids de ENEMY_DEFS).
export const STAGES = [
  { id:'mossy_glen',  name:'Mossy Glen',    biome:'forest', unlocked:true,  waves:[['slime','goblin','goblin'], ['goblin','goblin','slime'], ['goblin','goblin_brute','goblin']] },
  { id:'bandit_camp', name:'Bandit Camp',   biome:'plains', unlocked:false, waves:[['goblin','goblin','goblin'], ['goblin_brute','goblin','goblin'], ['goblin_brute','goblin','goblin_brute']] },
  { id:'echoing_caves',name:'Echoing Caves',biome:'cave',   unlocked:false, waves:[['goblin_brute','goblin_brute','goblin'], ['goblin_brute','goblin_brute','goblin_brute']] },
];

// --- FORJA (upgrade linear de arma por classe) ------------------------------
// Índice do array = nível a alcançar (1..5). atk = bônus PERMANENTE somado.
export const FORGE_LEVELS = [
  { level:1, cost:{ gold:50,   iron:3,  wood:2 },               atk:3 },
  { level:2, cost:{ gold:120,  iron:6,  wood:4 },               atk:4 },
  { level:3, cost:{ gold:250,  iron:12, wood:8 },               atk:6 },
  { level:4, cost:{ gold:500,  iron:24, wood:16, crystals:2 },  atk:8 },
  { level:5, cost:{ gold:1000, iron:48, wood:32, crystals:5 },  atk:12 },
];

// --- ACADEMIA DE TÁTICA ------------------------------------------------------
// slotCosts[n] = custo para destravar o slot de gambit nº n (2 grátis de início).
// conditionShop = condicionais lógicas compráveis (id da condição → custo).
export const ACADEMY = {
  slotCosts: { 3:{ gold:100, crystals:1 }, 4:{ gold:250, crystals:3 }, 5:{ gold:600, crystals:6 } },
  conditionShop: {
    enemy_lowest_hp: { gold:80,  crystals:1 },
    enemy_boss:      { gold:150, crystals:2 },
    ally_hp_25:      { gold:120, crystals:1 },
    ally_dead:       { gold:200, crystals:3 },
    self_mp_low:     { gold:120, crystals:1 },
  },
};

// --- ITENS / EQUIPAMENTO -----------------------------------------------------
// slots do herói: head, chest, hands, feet, weapon, trinket
//   (a "arma" = arma de classe melhorada na Forja; os demais são itens do inventário)
// bonus: somado aos atributos do herói (em combate e na ficha). rarity p/ cor.
export const EQUIP_SLOT_KEYS = ['head','chest','hands','feet','weapon','trinket'];

// PESOS DE ARMADURA (trava por classe). Cada herói veste UM peso só.
//   focus = para onde o peso empurra o build. mods = ainda no roadmap do motor.
export const ARMOR_WEIGHTS = {
  light:  { id:'light',  label:'Leve',   icon:'🌀', focus:'Poder Mágico · MP · Conjuração',
            roadmap:['+regen de MP','+velocidade de conjuração'] },
  medium: { id:'medium', label:'Médio',  icon:'🍃', focus:'Crítico · Esquiva · Dano Ágil',
            roadmap:['+chance de crítico','+esquiva'] },
  heavy:  { id:'heavy',  label:'Pesado', icon:'⛰️', focus:'Vida · Defesa · Redução de Dano',
            roadmap:['+redução de dano recebido'] },
};
// ESTILOS DE ARMA (trava por classe). Um item de mão comprime o estilo clássico.
export const WEAPON_STYLES = {
  twohand: { id:'twohand', label:'Duas Mãos',    icon:'🪓', desc:'+Dano massivo, -Velocidade',
             roadmap:['-velocidade de ataque','+sangramento'] },
  dual:    { id:'dual',    label:'Duplas',       icon:'🗡️', desc:'-Dano/hit, ++Velocidade, 2 acertos',
             roadmap:['2 acertos por animação'] },
  shield:  { id:'shield',  label:'Arma + Escudo',icon:'🛡️', desc:'+Dano moderado, ++Defesa, +Bloqueio',
             roadmap:['+chance de bloqueio'] },
  ranged:  { id:'ranged',  label:'Longo Alcance',icon:'🏹', desc:'Ataca da retaguarda',
             roadmap:['ignora penalidade vs. voadores'] },
  caster:  { id:'caster',  label:'Conjuração',   icon:'🔮', desc:'Ataque básico vira Dano Mágico, +Cura/Buff',
             roadmap:['+eficácia de cura e buffs'] },
  fists:   { id:'fists',   label:'Punhos',       icon:'👊', desc:'Sem arma: ++Velocidade, gera Ki p/ buffs próprios',
             roadmap:['acumula Ki por acerto','gasta Ki em buffs/golpes especiais'] },
};

// weight: peso da armadura (head/chest/hands/feet). trinket = livre (sem peso).
// img: arte recortada (fundo transparente). icon = emoji de fallback.
export const ITEMS = {
  // cabeça
  iron_helm:     { id:'iron_helm',     name:'Elmo de Ferro',    slot:'head',    weight:'heavy',  icon:'🪖', img:'assets/item_iron_helm.png',     rarity:'comum', bonus:{ def:2, hp:8 } },
  arcane_hat:    { id:'arcane_hat',    name:'Chapéu Arcano',    slot:'head',    weight:'light',  icon:'🎩', img:'assets/item_arcane_hat.png',    rarity:'raro',  bonus:{ mag:4 } },
  // peito
  leather_armor: { id:'leather_armor', name:'Peitoral de Couro',slot:'chest',   weight:'medium', icon:'🦺', img:'assets/item_leather_armor.png', rarity:'comum', bonus:{ hp:16, spd:1 } },
  chain_mail:    { id:'chain_mail',    name:'Cota de Malha',    slot:'chest',   weight:'heavy',  icon:'🛡️', img:'assets/item_chain_mail.png',    rarity:'raro',  bonus:{ hp:35, def:3 } },
  mage_robe:     { id:'mage_robe',     name:'Manto Arcano',     slot:'chest',   weight:'light',  icon:'🥼', img:'assets/item_mage_robe.png',     rarity:'raro',  bonus:{ mag:5, mp:8 } },
  // mãos
  leather_gloves:{ id:'leather_gloves',name:'Luvas de Couro',   slot:'hands',   weight:'medium', icon:'🧤', img:'assets/item_leather_gloves.png',rarity:'comum', bonus:{ atk:2, spd:1 } },
  power_gauntlet:{ id:'power_gauntlet',name:'Manopla de Força', slot:'hands',   weight:'heavy',  icon:'✊', img:'assets/item_power_gauntlet.png',rarity:'raro',  bonus:{ atk:4 } },
  // pés
  swift_boots:   { id:'swift_boots',   name:'Botas Velozes',    slot:'feet',    weight:'medium', icon:'👢', img:'assets/item_swift_boots.png',   rarity:'comum', bonus:{ spd:2 } },
  // acessório (LIVRE — sem peso, qualquer classe usa)
  power_ring:    { id:'power_ring',    name:'Anel de Força',    slot:'trinket', icon:'💍', img:'assets/item_power_ring.png',    rarity:'comum', bonus:{ atk:3 } },
  vital_amulet:  { id:'vital_amulet',  name:'Amuleto Vital',    slot:'trinket', icon:'📿', img:'assets/item_vital_amulet.png',  rarity:'raro',  bonus:{ hp:18, mp:10 } },
};
// Itens que o jogador já começa possuindo (no inventário, não equipados).
export const STARTER_INVENTORY = ['iron_helm','chain_mail','leather_armor','swift_boots','leather_gloves','mage_robe','arcane_hat','power_ring','vital_amulet'];
// Tabela de drop de itens ao limpar uma fase (chance por item).
export const ITEM_DROPS = [
  { item:'leather_armor', chance:0.16 }, { item:'power_ring', chance:0.14 },
  { item:'swift_boots', chance:0.14 }, { item:'iron_helm', chance:0.14 },
  { item:'leather_gloves', chance:0.14 }, { item:'chain_mail', chance:0.09 },
  { item:'mage_robe', chance:0.09 }, { item:'arcane_hat', chance:0.08 },
  { item:'power_gauntlet', chance:0.07 }, { item:'vital_amulet', chance:0.07 },
];

// Soma dos bônus dos itens equipados de um herói (pura).
export function itemBonuses(equip){
  const out = { atk:0, def:0, mag:0, spd:0, hp:0, mp:0 };
  if(!equip) return out;
  for(const slot of EQUIP_SLOT_KEYS){
    const it = ITEMS[equip[slot]];
    if(it && it.bonus) for(const k in it.bonus) out[k] = (out[k]||0) + it.bonus[k];
  }
  return out;
}
