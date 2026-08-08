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

  // --- PASSO 2: novos tipos de efeito (AoE, multi-hit, reviver, dispel, esuna, ailment) ---
  // Clérigo (Mago Branco)
  cura2:            { id:'cura2',            name:'Cura II',          kind:'heal',    targetType:'ally',  stat:'mag', power:2.00, mp:8 },
  cura_area:        { id:'cura_area',        name:'Cura em Área',     kind:'heal',    targetType:'ally',  stat:'mag', power:1.10, mp:12, aoe:true },
  reviver:          { id:'reviver',          name:'Reviver',          kind:'revive',  targetType:'ally',  revive:0.45, mp:14 },
  esuna:            { id:'esuna',            name:'Esuna',            kind:'cleanse', targetType:'ally',  cure:'all', mp:6 },
  protecao:         { id:'protecao',         name:'Proteção',         kind:'buff',    targetType:'ally',  buff:{ stat:'def', amt:5, scope:'target' }, duration:5, mp:6 },
  dissipar:         { id:'dissipar',         name:'Dissipar',         kind:'dispel',  targetType:'enemy', mp:5 },
  // Mago Elemental
  raio:             { id:'raio',             name:'Raio',             kind:'damage',  targetType:'enemy', stat:'mag', power:1.30, mp:6, element:'raio', applies:{ status:'stun', ticks:1 } },
  gelo:             { id:'gelo',             name:'Lança de Gelo',    kind:'damage',  targetType:'enemy', stat:'mag', power:1.45, mp:6, element:'gelo' },
  chama_area:       { id:'chama_area',       name:'Chama em Área',    kind:'damage',  targetType:'enemy', stat:'mag', power:1.10, mp:12, element:'fire', aoe:true, applies:{ status:'burn', ticks:2, dmg:5 } },
  sono:             { id:'sono',             name:'Sono',             kind:'ailment', targetType:'enemy', applies:{ status:'sono', ticks:3 }, mp:5 },
  meteoro:          { id:'meteoro',          name:'Meteoro',          kind:'damage',  targetType:'enemy', stat:'mag', power:1.60, mp:20, aoe:true },

  // --- PASSO 2 (lote 2): tank & suporte -------------------------------------
  // Cavaleiro
  golpe_escudo:     { id:'golpe_escudo',     name:'Golpe de Escudo',  kind:'damage',  targetType:'enemy', stat:'atk', power:1.05, mp:4, applies:{ status:'stun', ticks:1 } },
  muralha:          { id:'muralha',          name:'Muralha',          kind:'buff',    targetType:'self',  buff:{ stat:'def', amt:6, scope:'self' }, duration:4, mp:4 },
  quebra_armadura:  { id:'quebra_armadura',  name:'Quebra-Armadura',  kind:'buff',    targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:4 },
  brado_cura:       { id:'brado_cura',       name:'Brado Curativo',   kind:'heal',    targetType:'ally',  stat:'mag', power:0.60, mp:6, aoe:true },
  // Paladino
  escudo_sagrado:   { id:'escudo_sagrado',   name:'Escudo Sagrado',   kind:'shield',  targetType:'ally',  shield:{ amount:30 }, duration:3, mp:7 },
  muralha_sagrada:  { id:'muralha_sagrada',  name:'Muralha Sagrada',  kind:'buff',    targetType:'ally',  buff:{ stat:'def', amt:5, scope:'allies' }, duration:4, mp:8 },
  imposicao_maos:   { id:'imposicao_maos',   name:'Imposição de Mãos',kind:'heal',    targetType:'ally',  stat:'mag', power:2.40, mp:9 },
  julgamento:       { id:'julgamento',       name:'Julgamento',       kind:'damage',  targetType:'enemy', stat:'mag', power:1.30, mp:16, element:'holy', aoe:true },
  // Guardião Rúnico
  egide_runica:     { id:'egide_runica',     name:'Égide Rúnica',     kind:'shield',  targetType:'ally',  shield:{ amount:40 }, duration:3, mp:8 },
  runa_guarda:      { id:'runa_guarda',      name:'Runa de Guarda',   kind:'buff',    targetType:'ally',  buff:{ stat:'def', amt:5, scope:'allies' }, duration:5, mp:7 },
  runa_forca:       { id:'runa_forca',       name:'Runa de Força',    kind:'buff',    targetType:'ally',  buff:{ stat:'atk', amt:5, scope:'allies' }, duration:5, mp:7 },
  selo_runico:      { id:'selo_runico',      name:'Selo Rúnico',      kind:'ailment', targetType:'enemy', applies:{ status:'stun', ticks:1 }, mp:5 },
  selo_lentidao:    { id:'selo_lentidao',    name:'Selo de Lentidão', kind:'buff',    targetType:'enemy', buff:{ stat:'spd', amt:-3, scope:'target' }, duration:3, mp:4 },
  // Bardo
  balada_veloz:     { id:'balada_veloz',     name:'Balada Veloz',     kind:'buff',    targetType:'ally',  buff:{ stat:'spd', amt:3, scope:'allies' }, duration:4, mp:6 },
  requiem:          { id:'requiem',          name:'Réquiem',          kind:'buff',    targetType:'enemy', buff:{ stat:'atk', amt:-4, scope:'target' }, duration:4, mp:7, aoe:true },
  melodia_rest:     { id:'melodia_rest',     name:'Melodia Restauradora',kind:'heal', targetType:'ally',  stat:'mag', power:0.85, mp:10, aoe:true },
  grito_sonico:     { id:'grito_sonico',     name:'Grito Sônico',     kind:'damage',  targetType:'enemy', stat:'mag', power:0.90, mp:8, aoe:true },

  // --- PASSO 2 (lote 3): DPS marciais ---------------------------------------
  // Bárbaro
  rodopio:          { id:'rodopio',          name:'Rodopio',          kind:'damage',  targetType:'enemy', stat:'atk', power:0.85, mp:5, aoe:true },
  decapitar:        { id:'decapitar',        name:'Decapitar',        kind:'damage',  targetType:'enemy', stat:'atk', power:2.30, mp:6, critBonus:0.20 },
  grito_guerra:     { id:'grito_guerra',     name:'Grito de Guerra',  kind:'buff',    targetType:'ally',  buff:{ stat:'atk', amt:5, scope:'allies' }, duration:4, mp:5 },
  pele_pedra:       { id:'pele_pedra',       name:'Pele de Pedra',    kind:'buff',    targetType:'self',  buff:{ stat:'def', amt:6, scope:'self' }, duration:4, mp:4 },
  // Assassino
  golpe_sombras:    { id:'golpe_sombras',    name:'Golpe nas Sombras',kind:'damage',  targetType:'enemy', stat:'atk', power:1.40, mp:5, critBonus:0.50 },
  lamina_venenosa:  { id:'lamina_venenosa',  name:'Lâmina Venenosa',  kind:'damage',  targetType:'enemy', stat:'atk', power:1.00, mp:4, applies:{ status:'poison', ticks:4, dmg:6 } },
  corte_cruzado:    { id:'corte_cruzado',    name:'Corte Cruzado',    kind:'damage',  targetType:'enemy', stat:'atk', power:0.55, mp:5, hits:3 },
  // Duelista
  danca_laminas:    { id:'danca_laminas',    name:'Dança das Lâminas',kind:'damage',  targetType:'enemy', stat:'atk', power:0.50, mp:5, hits:3 },
  finta:            { id:'finta',            name:'Finta',            kind:'buff',    targetType:'enemy', buff:{ stat:'def', amt:-4, scope:'target' }, duration:4, mp:3 },
  riposte:          { id:'riposte',          name:'Riposte',          kind:'buff',    targetType:'self',  buff:{ stat:'spd', amt:3, scope:'self' }, duration:4, mp:3 },
  // Monge
  rajada_golpes:    { id:'rajada_golpes',    name:'Rajada de Golpes', kind:'damage',  targetType:'enemy', stat:'atk', power:0.45, mp:5, hits:4 },
  meditar:          { id:'meditar',          name:'Meditar',          kind:'ailment', targetType:'self',  applies:{ status:'regen', ticks:4, amt:8 }, mp:2 },
  toque_atordoante: { id:'toque_atordoante', name:'Toque Atordoante', kind:'damage',  targetType:'enemy', stat:'atk', power:0.90, mp:5, applies:{ status:'stun', ticks:1 } },
  // Arqueiro
  flecha_venenosa:  { id:'flecha_venenosa',  name:'Flecha Envenenada',kind:'damage',  targetType:'enemy', stat:'atk', power:1.00, mp:3, applies:{ status:'poison', ticks:4, dmg:5 } },
  tiro_multiplo:    { id:'tiro_multiplo',    name:'Tiro Múltiplo',    kind:'damage',  targetType:'enemy', stat:'atk', power:0.75, mp:6, aoe:true },
  flecha_marca:     { id:'flecha_marca',     name:'Flecha de Marca',  kind:'buff',    targetType:'enemy', buff:{ stat:'def', amt:-4, scope:'target' }, duration:4, mp:3 },

  // --- PASSO 2 (lote 4): casters de elemento/sombrio/tempo ------------------
  // Piromante
  fogo2:            { id:'fogo2',            name:'Fogo II',          kind:'damage',  targetType:'enemy', stat:'mag', power:1.90, mp:9,  element:'fire', applies:{ status:'burn', ticks:2, dmg:6 } },
  explosao:         { id:'explosao',         name:'Explosão',         kind:'damage',  targetType:'enemy', stat:'mag', power:1.15, mp:13, element:'fire', aoe:true },
  muralha_fogo:     { id:'muralha_fogo',     name:'Muralha de Fogo',  kind:'damage',  targetType:'enemy', stat:'mag', power:0.60, mp:8,  element:'fire', applies:{ status:'burn', ticks:4, dmg:9 } },
  imolacao:         { id:'imolacao',         name:'Imolação',         kind:'damage',  targetType:'enemy', stat:'mag', power:1.50, mp:22, element:'fire', aoe:true, applies:{ status:'burn', ticks:3, dmg:7 } },
  // Alquimista
  bomba_acida:      { id:'bomba_acida',      name:'Bomba Ácida',      kind:'buff',    targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:4 },
  nevoa_toxica:     { id:'nevoa_toxica',     name:'Névoa Tóxica',     kind:'damage',  targetType:'enemy', stat:'mag', power:0.50, mp:12, aoe:true, applies:{ status:'poison', ticks:4, dmg:5 } },
  antidoto_area:    { id:'antidoto_area',    name:'Antídoto em Área', kind:'cleanse', targetType:'ally',  cure:'all', aoe:true, mp:10 },
  fogo_grego:       { id:'fogo_grego',       name:'Fogo Grego',       kind:'damage',  targetType:'enemy', stat:'mag', power:1.10, mp:6,  element:'fire', applies:{ status:'burn', ticks:2, dmg:4 } },
  // Necromante
  praga:            { id:'praga',            name:'Praga',            kind:'damage',  targetType:'enemy', stat:'mag', power:0.50, mp:12, aoe:true, applies:{ status:'poison', ticks:4, dmg:6 } },
  toque_vampirico:  { id:'toque_vampirico',  name:'Toque Vampírico',  kind:'damage',  targetType:'enemy', stat:'mag', power:1.30, mp:6,  element:'dark', lifesteal:0.6 },
  medo:             { id:'medo',             name:'Medo',             kind:'buff',    targetType:'enemy', buff:{ stat:'atk', amt:-4, scope:'target' }, duration:4, mp:4 },
  // Feiticeiro do Tempo
  acelerar:         { id:'acelerar',         name:'Acelerar',         kind:'buff',    targetType:'ally',  buff:{ stat:'spd', amt:3, scope:'target' }, duration:4, mp:5 },
  parar:            { id:'parar',            name:'Parar',            kind:'ailment', targetType:'enemy', applies:{ status:'imobilizar', ticks:2 }, mp:8 },
  distorcao:        { id:'distorcao',        name:'Distorção',        kind:'damage',  targetType:'enemy', stat:'mag', power:0.90, mp:10, aoe:true },

  // --- SUPORTE / multiclasse (Clérigo é o mestre; estas são versões menores) ---
  minor_heal:       { id:'minor_heal',       name:'Primeiros Socorros',kind:'heal',  targetType:'ally',  stat:'mag', power:0.75, mp:4 },
  melodia_cura:     { id:'melodia_cura',     name:'Melodia Curativa', kind:'heal',   targetType:'ally',  stat:'mag', power:0.95, mp:5 },
  cancao_guarda:    { id:'cancao_guarda',    name:'Canção de Guarda', kind:'buff',   targetType:'ally',  buff:{ stat:'def', amt:4, scope:'allies' }, duration:4, mp:5 },
};

// Unidade INVOCADA (esqueleto aliado do Necromante). side='hero' em combate.
export const MINION_DEF = {
  id:'skeleton_minion', name:'Esqueleto Reanimado', sprite:'💀', type:'morto-vivo',
  base:{ hp:40, atk:10, def:3, mag:0, mp:0, spd:6 },
  gambits:[ { condition:'enemy_nearest', action:'basic_attack' } ],
};

// Metadados de STATUS (para ícones/labels na View). kind: 'dot' | 'stun' | 'buff'.
// kind: dot(dano/turno) · regen(cura/turno) · stun/sleep/immobile(pula turno) ·
//       silence(sem magia) · blind(erra) · confuse(ataca aleatório) · buff · shield
export const STATUS_META = {
  burn:      { id:'burn',      label:'Queimadura',  icon:'🔥', kind:'dot' },
  poison:    { id:'poison',    label:'Veneno',      icon:'🧪', kind:'dot' },
  bleed:     { id:'bleed',     label:'Sangramento', icon:'🩸', kind:'dot' },
  regen:     { id:'regen',     label:'Regeneração', icon:'💚', kind:'regen' },
  stun:      { id:'stun',      label:'Atordoado',   icon:'💫', kind:'stun' },
  sono:      { id:'sono',      label:'Dormindo',    icon:'💤', kind:'sleep' },
  imobilizar:{ id:'imobilizar',label:'Imobilizado', icon:'🕸️', kind:'immobile' },
  silencio:  { id:'silencio',  label:'Silenciado',  icon:'🤐', kind:'silence' },
  cegueira:  { id:'cegueira',  label:'Cegueira',    icon:'🌫️', kind:'blind' },
  confusao:  { id:'confusao',  label:'Confuso',     icon:'😵', kind:'confuse' },
  buff:      { id:'buff',      label:'Buff',        icon:'💢', kind:'buff' },
  slow:      { id:'slow',      label:'Debuff',      icon:'🐌', kind:'buff' },
  shield:    { id:'shield',    label:'Escudo',      icon:'🛡️', kind:'shield' },
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
  // STATUS do inimigo (gatilhos de gambit)
  enemy_burning:   { id:'enemy_burning',   label:'Inimigo: Queimando',    scope:'enemy' },
  enemy_poisoned:  { id:'enemy_poisoned',  label:'Inimigo: Envenenado',   scope:'enemy' },
  enemy_stunned:   { id:'enemy_stunned',   label:'Inimigo: Incapacitado', scope:'enemy' },
  enemy_slowed:    { id:'enemy_slowed',    label:'Inimigo: Enfraquecido', scope:'enemy' },
  enemy_buffed:    { id:'enemy_buffed',    label:'Inimigo: Com Buff',     scope:'enemy' },
  // ALIADO
  ally_hp_75:      { id:'ally_hp_75',      label:'Aliado: HP < 75%',      scope:'ally' },
  ally_hp_50:      { id:'ally_hp_50',      label:'Aliado: HP < 50%',      scope:'ally',  starter:true },
  ally_hp_25:      { id:'ally_hp_25',      label:'Aliado: HP < 25%',      scope:'ally' },
  ally_dead:       { id:'ally_dead',       label:'Aliado: Morto',         scope:'ally' },
  ally_no_shield:  { id:'ally_no_shield',  label:'Aliado: Sem Escudo',    scope:'ally' },
  ally_no_buff:    { id:'ally_no_buff',    label:'Aliado: Sem Buff',      scope:'ally' },
  ally_afflicted:  { id:'ally_afflicted',  label:'Aliado: Com Status Ruim',scope:'ally' },
  // EU (auto — enrage/defensivo)
  self_hp_50:      { id:'self_hp_50',      label:'Eu: HP < 50%',          scope:'self',  starter:true },
  self_hp_30:      { id:'self_hp_30',      label:'Eu: HP < 30%',          scope:'self' },
  self_no_buff:    { id:'self_no_buff',    label:'Eu: Sem Buff',          scope:'self',  starter:true },
  self_has_buff:   { id:'self_has_buff',   label:'Eu: Com Buff',          scope:'self' },
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
    skills:['basic_attack','provocar','golpe_escudo','muralha','quebra_armadura','brado_cura'],
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
    skills:['heal','cura2','cura_area','reviver','esuna','protecao','dissipar','holy_strike','basic_attack'],
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
    skills:['power_shot','basic_attack','flecha_venenosa','tiro_multiplo','flecha_marca'],
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
    skills:['fireball','raio','gelo','chama_area','sono','meteoro','basic_attack'],
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
    skills:['basic_attack','machadada','furia','rodopio','decapitar','grito_guerra','pele_pedra'],
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
    skills:['basic_attack','execucao','golpe_sombras','lamina_venenosa','corte_cruzado'],
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
    skills:['basic_attack','provocar','heal','holy_strike','escudo_sagrado','muralha_sagrada','imposicao_maos','julgamento'],
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
    skills:['fireball','incinerar','basic_attack','fogo2','explosao','muralha_fogo','imolacao'],
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
    skills:['frasco_veneno','elixir','basic_attack','bomba_acida','nevoa_toxica','antidoto_area','fogo_grego'],
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
    skills:['estocada','basic_attack','danca_laminas','finta','riposte'],
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
    skills:['palma_ki','postura_ki','basic_attack','rajada_golpes','meditar','toque_atordoante'],
    gambits:[
      { condition:'self_no_buff',  action:'postura_ki' },
      { condition:'enemy_nearest', action:'palma_ki' },
    ],
  },
  {
    id:'bard', name:'Bardo', klass:'Bardo', sprite:'🎵',
    armorWeight:'medium', weaponStyle:'caster', weaponStyles:['caster'],
    base:{ hp:92, atk:9, def:5, mag:13, mp:44, spd:9 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['hino_de_guerra','cancao_guarda','melodia_cura','basic_attack','balada_veloz','requiem','melodia_rest','grito_sonico'],
    gambits:[
      { condition:'self_no_buff',  action:'hino_de_guerra' },
      { condition:'ally_hp_50',    action:'melodia_cura' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },

  // ===== FASE 3 — reativo · cadáver · tempo ==================================
  {
    id:'rune_guardian', name:'Guardião Rúnico', klass:'Guardião Rúnico', sprite:'🪬',
    armorWeight:'heavy', weaponStyle:'shield', weaponStyles:['shield'],
    base:{ hp:125, atk:11, def:10, mag:8, mp:30, spd:5 },
    weaponLevel:0, slots:3, maxSlots:5,
    skills:['barreira_runica','basic_attack','egide_runica','runa_guarda','runa_forca','selo_runico','selo_lentidao'],
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
    skills:['reanimar','colheita','basic_attack','praga','toque_vampirico','medo'],
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
    skills:['fluxo_temporal','lentidao','basic_attack','acelerar','parar','distorcao'],
    gambits:[
      { condition:'enemy_any',     action:'fluxo_temporal' },
      { condition:'enemy_nearest', action:'basic_attack' },
    ],
  },
];

// --- PROGRESSÃO: XP / LEVEL / PRANCHA DE LICENÇA (LP) -----------------------
// FFXII-like: herói ganha XP (sobe Level) e Pontos de Licença (LP) p/ destravar
// skills e aumentos numa prancha por classe. Condições continuam UNIVERSAIS.
export const MAX_LEVEL = 30;
export const LP_PER_LEVEL = 2;
export const xpToNext = (level) => Math.round(40 + level*35 + level*level*4);
const mainStatOf = (def) => def.armorWeight==='light' ? 'mag' : def.armorWeight==='heavy' ? 'hp' : 'atk';

// skills liberadas de fábrica = as usadas nos gambits padrão + ataque básico
export function starterSkills(def){
  const s = new Set(['basic_attack']);
  for(const g of (def.gambits||[])) if(g.action) s.add(g.action);
  return [...s];
}
// skills MENORES multiclasse por classe (menos efetivas — "não limitar")
const CROSS_SKILLS = {
  duelist:['minor_heal'], archer:['minor_heal'], assassin:['minor_heal'],
  paladin:['cancao_guarda'], monk:['minor_heal'],
};
// Prancha de licença por classe: nós de SKILL (próprias travadas + multiclasse) + AUMENTOS.
export function skillBoard(def){
  const starter = new Set(starterSkills(def));
  const nodes = []; let ci = 0;
  for(const s of def.skills){ if(starter.has(s)) continue;
    nodes.push({ type:'skill', id:`sk_${s}`, skill:s, cost:1+ci, reqLevel:2+ci*2 }); ci++; }
  for(const s of (CROSS_SKILLS[def.id]||[])){
    nodes.push({ type:'skill', id:`sk_${s}`, skill:s, cost:2+ci, reqLevel:3+ci*2 }); ci++; }
  const main = mainStatOf(def);
  const a1 = main==='hp'?25:3, a2 = main==='hp'?45:6;
  nodes.push({ type:'stat', id:'aug_hp', stat:'hp',  amt:15, cost:1, reqLevel:2 });
  nodes.push({ type:'stat', id:'aug_m1', stat:main, amt:a1, cost:2, reqLevel:5 });
  nodes.push({ type:'stat', id:'aug_m2', stat:main, amt:a2, cost:3, reqLevel:10 });
  return nodes;
}

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
    enemy_poisoned:  { gold:130, crystals:1 },
    enemy_stunned:   { gold:150, crystals:2 },
    enemy_slowed:    { gold:130, crystals:1 },
    enemy_buffed:    { gold:140, crystals:2 },
    ally_no_shield:  { gold:120, crystals:1 },
    ally_no_buff:    { gold:120, crystals:1 },
    ally_afflicted:  { gold:150, crystals:2 },
    self_has_buff:   { gold:110, crystals:1 },
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

// ARQUÉTIPOS DE ARMA (arte compartilhada entre classes que combinam) — 10 tiers cada.
// key -> { label, classes[] }. Mapa classe->arquétipo em HERO_WEAPON_ARCH.
export const WEAPON_ARCHETYPES = {
  sword_shield: { label:'Espada & Escudo',    classes:['warrior'] },
  hammer_shield:{ label:'Warhammer & Escudo', classes:['paladin','rune_guardian'] },
  greataxe:     { label:'Machado Gigante',    classes:['barbarian'] },
  twin_blades:  { label:'Lâminas Duplas',     classes:['assassin','duelist'] },
  bow:          { label:'Arco',               classes:['archer'] },
  fists:        { label:'Manoplas',           classes:['monk'] },
  arcane_staff: { label:'Cajado Arcano',      classes:['mage','pyromancer','necromancer','time_wizard'] },
  holy_scepter: { label:'Cajado Sagrado',     classes:['cleric'] },
  lute:         { label:'Alaúde',             classes:['bard'] },
  flasks:       { label:'Frascos Alquímicos', classes:['alchemist'] },
};
export const HERO_WEAPON_ARCH = Object.entries(WEAPON_ARCHETYPES)
  .reduce((m,[k,v]) => { for(const c of v.classes) m[c] = k; return m; }, {});

// ESCADA DE ARMADURA — 3 pesos × 4 partes × 10 tiers = 120 peças (arte recortada).
//   id = `${weight}_${part}_t${tier}` · img = assets/item_<id>.png
export const ARMOR_TIERS = 10;
export const ARMOR_MATERIALS = {
  light:  ['Linho','Lã','Seda','Encantado','Rúnico','Seda Astral','Etéreo','Arcano','Celestial','Divino'],
  medium: ['Couro Cru','Couro Batido','Cravejado','Couro de Fera','Escamas','Couro Sombrio','Pele de Wyvern','Sombra Élfica','Fera Mítica','Primordial'],
  heavy:  ['Ferro','Bronze','Aço','Prata','Cobalto','Mithril','Adamante','Dragão','Rúnico','Divino'],
};
const PART_NOUN = {
  light:  { head:'Capuz', chest:'Manto',    hands:'Luvas',    feet:'Sapatos' },
  medium: { head:'Capuz', chest:'Peitoral', hands:'Luvas',    feet:'Botas' },
  heavy:  { head:'Elmo',  chest:'Peitoral', hands:'Manoplas', feet:'Botas' },
};
// atributo-foco de cada peso (por tier) e peso relativo de cada parte
const WEIGHT_STATS = { light:{ mag:1.2, mp:3.0 }, medium:{ spd:0.8, atk:0.9 }, heavy:{ hp:8.0, def:1.3 } };
const PART_FACTOR  = { head:0.8, chest:1.3, hands:0.7, feet:0.7 };
export const RARITIES = ['comum','incomum','raro','epico','lendario'];
const rarityOf = t => t<=2?'comum' : t<=4?'incomum' : t<=6?'raro' : t<=8?'epico' : 'lendario';

function buildArmorItems(){
  const out = {};
  for(const weight of ['light','medium','heavy'])
    for(const part of ['head','chest','hands','feet'])
      for(let t=1; t<=ARMOR_TIERS; t++){
        const id = `${weight}_${part}_t${t}`;
        const bonus = {};
        for(const [k,v] of Object.entries(WEIGHT_STATS[weight])) bonus[k] = Math.max(1, Math.round(v * t * PART_FACTOR[part]));
        out[id] = { id, name:`${PART_NOUN[weight][part]} ${ARMOR_MATERIALS[weight][t-1]}`,
          slot:part, weight, tier:t, icon:'🛡️', img:`assets/item_${id}.png`, rarity:rarityOf(t), bonus };
      }
  return out;
}
// weight: peso da armadura (head/chest/hands/feet). trinket = livre (sem peso).
export const ITEMS = {
  ...buildArmorItems(),
  // acessórios (LIVRES — qualquer classe usa)
  power_ring:   { id:'power_ring',   name:'Anel de Força',   slot:'trinket', tier:2, icon:'💍', img:'assets/item_power_ring.png',   rarity:'incomum', bonus:{ atk:3 } },
  vital_amulet: { id:'vital_amulet', name:'Amuleto Vital',   slot:'trinket', tier:4, icon:'📿', img:'assets/item_vital_amulet.png', rarity:'raro',    bonus:{ hp:18, mp:10 } },
};
// Itens iniciais (tier 1 de cada peso p/ toda classe achar algo) + acessórios.
export const STARTER_INVENTORY = [
  'heavy_head_t1','heavy_chest_t1','medium_chest_t1','medium_feet_t1','light_head_t1','light_chest_t1','power_ring','vital_amulet',
];
// Drop ao limpar fase: peças de tiers baixos (1–4) de todas as partes/pesos, chance baixa.
export const ITEM_DROPS = (() => {
  const drops = [];
  for(const w of ['light','medium','heavy'])
    for(const p of ['head','chest','hands','feet'])
      for(const t of [1,2,3,4]) drops.push({ item:`${w}_${p}_t${t}`, chance:0.010 });
  drops.push({ item:'power_ring', chance:0.05 }, { item:'vital_amulet', chance:0.04 });
  return drops;
})();

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
