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
  fireball:     { id:'fireball',     name:'Bola de Fogo',    kind:'damage', targetType:'enemy', stat:'mag', power:1.60, mp:6, element:'fire', applies:{ status:'burn', ticks:2, dmg:5 } },
  holy_strike:  { id:'holy_strike',  name:'Ataque Sagrado',  kind:'damage', targetType:'enemy', stat:'mag', power:1.10, mp:4, element:'holy' },
  heal:         { id:'heal',         name:'Curar',           kind:'heal',   targetType:'ally',  stat:'mag', power:1.40, mp:5 },
  provocar:     { id:'provocar',     name:'Provocar',        kind:'taunt',  targetType:'self',  duration:2, mp:0 },

  // --- FASE 2: elementos & status ------------------------------------------
  incinerar:        { id:'incinerar',        name:'Incinerar',        kind:'damage', targetType:'enemy', stat:'mag', power:1.30, mp:7, element:'fire',   applies:{ status:'burn',   ticks:3, dmg:8 } },
  frasco_veneno:    { id:'frasco_veneno',    name:'Frasco de Veneno', kind:'damage', targetType:'enemy', stat:'mag', power:0.60, mp:5, element:'poison', applies:{ status:'poison', ticks:4, dmg:5 } },
  elixir:           { id:'elixir',           name:'Elixir',           kind:'heal',   targetType:'ally',  stat:'mag', power:1.55, mp:6 },
  estocada:         { id:'estocada',         name:'Estocada',         kind:'damage', targetType:'enemy', stat:'atk', power:1.15, mp:2, applies:{ status:'bleed',  ticks:3, dmg:4 } },
  golpe_atordoante: { id:'golpe_atordoante', name:'Golpe Atordoante', kind:'damage', targetType:'enemy', stat:'atk', power:0.90, mp:4, applies:{ status:'stun',   ticks:1 } },
  palma_ki:         { id:'palma_ki',         name:'Palma de Ki',      kind:'damage', targetType:'enemy', stat:'atk', power:1.25, mp:2 },
  postura_ki:       { id:'postura_ki',       name:'Postura de Ki',    kind:'buff',   targetType:'self',  buff:{ stat:'atk', amt:5 }, duration:4, mp:3 },
  furia:            { id:'furia',            name:'Fúria',            kind:'buff',   targetType:'self',  buff:{ stat:'atk', amt:8 }, duration:5, mp:0 },
  machadada:        { id:'machadada',        name:'Machadada',        kind:'damage', targetType:'enemy', stat:'atk', power:1.50, mp:3, applies:{ status:'bleed',  ticks:2, dmg:5 } },
  execucao:         { id:'execucao',         name:'Execução',         kind:'damage', targetType:'enemy', stat:'atk', power:2.20, mp:5, critBonus:0.25 },

  // --- FASE 3: reativo (escudo) · cadáver (invocação) · tempo (buff/debuff) ---
  hino_de_guerra:   { id:'hino_de_guerra',   name:'Hino de Guerra',   kind:'buff',   targetType:'ally',  buff:{ stat:'atk', amt:5, scope:'allies' }, duration:4, mp:6 },
  barreira_runica:  { id:'barreira_runica',  name:'Barreira Rúnica',  kind:'shield', targetType:'ally',  shield:{ amount:28, scope:'allies' }, duration:3, mp:7 },
  reanimar:         { id:'reanimar',         name:'Reanimar',         kind:'summon', targetType:'self',  mp:8 },
  colheita:         { id:'colheita',         name:'Colheita de Almas',kind:'damage', targetType:'enemy', stat:'mag', power:1.20, mp:5, element:'dark' },
  lentidao:         { id:'lentidao',         name:'Lentidão',         kind:'buff',   targetType:'enemy', buff:{ stat:'spd', amt:-3, scope:'target' }, duration:3, mp:4 },
  fluxo_temporal:   { id:'fluxo_temporal',   name:'Fluxo Temporal',   kind:'damage', targetType:'enemy', stat:'mag', power:1.45, mp:6, element:'time' },
};

// Unidade INVOCADA (esqueleto aliado do Necromante). side='hero' em combate.
export const MINION_DEF = {
  id:'skeleton_minion', name:'Esqueleto Reanimado', sprite:'💀', type:'morto-vivo',
  base:{ hp:40, atk:10, def:3, mag:0, mp:0, spd:6 },
  gambits:[ { condition:'enemy_nearest', action:'basic_attack' } ],
};

// Metadados de STATUS (para ícones/labels na View). kind: 'dot' | 'stun' | 'buff'.
export const STATUS_META = {
  burn:   { id:'burn',   label:'Queimadura', icon:'🔥', kind:'dot' },
  poison: { id:'poison', label:'Veneno',     icon:'🧪', kind:'dot' },
  bleed:  { id:'bleed',  label:'Sangramento',icon:'🩸', kind:'dot' },
  stun:   { id:'stun',   label:'Atordoado',  icon:'💫', kind:'stun' },
  buff:   { id:'buff',   label:'Buff',        icon:'💢', kind:'buff' },
  slow:   { id:'slow',   label:'Lentidão',    icon:'🐌', kind:'buff' },
  shield: { id:'shield', label:'Escudo',      icon:'🛡️', kind:'shield' },
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
  // HP% numérico do INIMIGO (foca quem está abaixo do limite — execução/finalização)
  enemy_hp_50:     { id:'enemy_hp_50',     label:'Inimigo: HP < 50%',     scope:'enemy', starter:true },
  enemy_hp_30:     { id:'enemy_hp_30',     label:'Inimigo: HP < 30%',     scope:'enemy' },
  // TIPO do inimigo
  enemy_flying:    { id:'enemy_flying',    label:'Inimigo: Voador',       scope:'enemy' },
  enemy_undead:    { id:'enemy_undead',    label:'Inimigo: Morto-vivo',   scope:'enemy' },
  // STATUS (Fase 2)
  enemy_burning:   { id:'enemy_burning',   label:'Inimigo: Queimando',    scope:'enemy' },
  // ALIADO
  ally_hp_75:      { id:'ally_hp_75',      label:'Aliado: HP < 75%',      scope:'ally' },
  ally_hp_50:      { id:'ally_hp_50',      label:'Aliado: HP < 50%',      scope:'ally',  starter:true },
  ally_hp_25:      { id:'ally_hp_25',      label:'Aliado: HP < 25%',      scope:'ally' },
  ally_dead:       { id:'ally_dead',       label:'Aliado: Morto',         scope:'ally' },
  // EU (auto — enrage/defensivo)
  self_hp_50:      { id:'self_hp_50',      label:'Eu: HP < 50%',          scope:'self',  starter:true },
  self_hp_30:      { id:'self_hp_30',      label:'Eu: HP < 30%',          scope:'self' },
  self_no_buff:    { id:'self_no_buff',    label:'Eu: Sem Buff',          scope:'self',  starter:true },
  self_no_shield:  { id:'self_no_shield',  label:'Eu: Sem Escudo',        scope:'self',  starter:true },
  corpse_ready:    { id:'corpse_ready',    label:'Há um Cadáver',         scope:'self',  starter:true },
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
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['basic_attack','provocar'],
    gambits:[
      { condition:'ally_hp_50',    action:'provocar' },
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
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['power_shot','basic_attack'],
    gambits:[
      { condition:'enemy_hp_50',   action:'power_shot' },
      { condition:'enemy_nearest', action:'basic_attack' },
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

  // ===== FASE 1 — classes marciais adicionais ================================
  {
    id:'barbarian', name:'Bárbaro', klass:'Bárbaro', sprite:'🪓',
    armorWeight:'heavy', weaponStyle:'twohand', weaponStyles:['twohand','dual'],
    base:{ hp:130, atk:16, def:5, mag:0, mp:10, spd:5 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['basic_attack','machadada','furia'],
    gambits:[
      { condition:'self_hp_50',    action:'furia' },
      { condition:'enemy_nearest', action:'machadada' },
      { condition:'enemy_any',     action:'basic_attack' },
    ],
  },
  {
    id:'assassin', name:'Assassino', klass:'Assassino', sprite:'🗡️',
    armorWeight:'medium', weaponStyle:'dual', weaponStyles:['dual','ranged'],
    base:{ hp:76, atk:15, def:3, mag:0, mp:15, spd:12 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['basic_attack','execucao'],
    gambits:[
      { condition:'enemy_hp_30',   action:'execucao' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },
  {
    id:'paladin', name:'Paladino', klass:'Paladino', sprite:'⚜️',
    armorWeight:'heavy', weaponStyle:'shield', weaponStyles:['shield'],
    base:{ hp:115, atk:12, def:9, mag:10, mp:30, spd:6 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['basic_attack','provocar','heal','holy_strike'],
    gambits:[
      { condition:'ally_hp_50',    action:'heal' },
      { condition:'enemy_any',     action:'holy_strike' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },

  // ===== FASE 2 — classes de elemento & status ==============================
  {
    id:'pyromancer', name:'Piromante', klass:'Piromante', sprite:'🔥',
    armorWeight:'light', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:72, atk:4, def:3, mag:18, mp:50, spd:8 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['fireball','incinerar','basic_attack'],
    gambits:[
      { condition:'enemy_hp_50',   action:'incinerar' },
      { condition:'enemy_any',     action:'fireball' },
    ],
  },
  {
    id:'alchemist', name:'Alquimista', klass:'Alquimista', sprite:'⚗️',
    armorWeight:'light', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:82, atk:5, def:4, mag:14, mp:45, spd:7 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['frasco_veneno','elixir','basic_attack'],
    gambits:[
      { condition:'ally_hp_50',    action:'elixir' },
      { condition:'enemy_any',     action:'frasco_veneno' },
    ],
  },
  {
    id:'duelist', name:'Duelista', klass:'Duelista', sprite:'🤺',
    armorWeight:'medium', weaponStyle:'dual', weaponStyles:['dual'],
    base:{ hp:88, atk:13, def:5, mag:2, mp:20, spd:11 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['estocada','basic_attack'],
    gambits:[
      { condition:'enemy_nearest', action:'estocada' },
      { condition:'enemy_any',     action:'basic_attack' },
    ],
  },
  {
    id:'monk', name:'Monge', klass:'Monge Espiritual', sprite:'👊',
    armorWeight:'medium', weaponStyle:'fists', weaponStyles:['fists','dual'],
    base:{ hp:95, atk:12, def:6, mag:4, mp:25, spd:10 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['palma_ki','postura_ki','basic_attack'],
    gambits:[
      { condition:'self_no_buff',  action:'postura_ki' },
      { condition:'enemy_nearest', action:'palma_ki' },
    ],
  },
  {
    id:'bard', name:'Bardo', klass:'Bardo', sprite:'🎵',
    armorWeight:'medium', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:92, atk:9, def:5, mag:12, mp:40, spd:9 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['hino_de_guerra','basic_attack'],
    gambits:[
      { condition:'self_no_buff',  action:'hino_de_guerra' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },

  // ===== FASE 3 — reativo · cadáver · tempo ==================================
  {
    id:'rune_guardian', name:'Guardião Rúnico', klass:'Guardião Rúnico', sprite:'🪬',
    armorWeight:'heavy', weaponStyle:'shield', weaponStyles:['shield'],
    base:{ hp:125, atk:11, def:10, mag:8, mp:30, spd:5 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['barreira_runica','basic_attack'],
    gambits:[
      { condition:'self_no_shield', action:'barreira_runica' },
      { condition:'enemy_nearest',  action:'basic_attack' },
    ],
  },
  {
    id:'necromancer', name:'Necromante', klass:'Necromante', sprite:'💀',
    armorWeight:'light', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:78, atk:5, def:3, mag:16, mp:50, spd:7 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['reanimar','colheita','basic_attack'],
    gambits:[
      { condition:'corpse_ready', action:'reanimar' },
      { condition:'enemy_any',    action:'colheita' },
    ],
  },
  {
    id:'time_wizard', name:'Feiticeiro do Tempo', klass:'Feiticeiro do Tempo', sprite:'⏳',
    armorWeight:'light', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:74, atk:4, def:3, mag:17, mp:55, spd:8 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['fluxo_temporal','lentidao','basic_attack'],
    gambits:[
      { condition:'enemy_any',     action:'fluxo_temporal' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },
];

// --- INIMIGOS ----------------------------------------------------------------
// gold: [min,max] de ouro dropado. drops: tabela de recursos por chance.
// type: 'besta' | 'humanoide' | 'voador' | 'morto-vivo'  (usado por condições de tipo)
export const ENEMY_DEFS = {
  slime:        { id:'slime',        name:'Gosma',        sprite:'🟢', type:'besta',      base:{hp:30, atk:6,  def:2, mag:0, mp:0, spd:3}, gold:[2,5],  drops:[{res:'herbs', chance:0.50, qty:[1,2]}] },
  goblin:       { id:'goblin',       name:'Goblin',       sprite:'👺', type:'humanoide',  base:{hp:40, atk:9,  def:3, mag:0, mp:0, spd:5}, gold:[3,7],  drops:[{res:'iron',  chance:0.40, qty:[1,2]}] },
  goblin_brute: { id:'goblin_brute', name:'Bruto Goblin', sprite:'👹', type:'humanoide',  base:{hp:75, atk:14, def:6, mag:0, mp:0, spd:4}, gold:[6,12], drops:[{res:'iron',  chance:0.60, qty:[1,3]}] },
  bat:          { id:'bat',          name:'Morcego',      sprite:'🦇', type:'voador',     base:{hp:26, atk:8,  def:1, mag:0, mp:0, spd:11}, gold:[3,6], drops:[{res:'herbs', chance:0.35, qty:[1,2]}] },
  skeleton:     { id:'skeleton',     name:'Esqueleto',    sprite:'💀', type:'morto-vivo', base:{hp:55, atk:11, def:4, mag:0, mp:0, spd:6}, gold:[5,10], drops:[{res:'iron', chance:0.45, qty:[1,2]}] },
};

// Gambit padrão dos inimigos (IA simples: sempre bate no mais próximo).
export const ENEMY_GAMBITS = [ { condition:'enemy_nearest', action:'basic_attack' } ];

// --- MAPA / FASES ------------------------------------------------------------
// waves: cada sub-array é uma leva de inimigos (ids de ENEMY_DEFS).
export const STAGES = [
  { id:'mossy_glen',  name:'Mossy Glen',    biome:'forest', unlocked:true,  waves:[['slime','goblin','goblin'], ['goblin','bat','slime'], ['goblin','goblin_brute','bat']] },
  { id:'bandit_camp', name:'Bandit Camp',   biome:'plains', unlocked:false, waves:[['goblin','bat','goblin'], ['goblin_brute','goblin','bat'], ['goblin_brute','skeleton','goblin_brute']] },
  { id:'echoing_caves',name:'Echoing Caves',biome:'cave',   unlocked:false, waves:[['skeleton','bat','skeleton'], ['skeleton','goblin_brute','skeleton'], ['goblin_brute','skeleton','skeleton']] },
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
    enemy_hp_30:     { gold:110, crystals:1 },
    enemy_boss:      { gold:150, crystals:2 },
    enemy_flying:    { gold:120, crystals:1 },
    enemy_undead:    { gold:120, crystals:1 },
    enemy_burning:   { gold:130, crystals:1 },
    ally_hp_75:      { gold:90,  crystals:1 },
    ally_hp_25:      { gold:120, crystals:1 },
    ally_dead:       { gold:200, crystals:3 },
    self_hp_30:      { gold:110, crystals:1 },
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
