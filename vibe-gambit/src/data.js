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

  // === PASSO 5 — DENSIDADE FFXII: famílias de magia com tiers por classe =====
  // Guerreiro (Cavaleiro) — marcial defensivo
  golpe_poderoso:   { id:'golpe_poderoso',   name:'Golpe Poderoso',   kind:'damage', targetType:'enemy', stat:'atk', power:1.60, mp:5 },
  investida:        { id:'investida',        name:'Investida',        kind:'damage', targetType:'enemy', stat:'atk', power:1.20, mp:7, applies:{ status:'stun', ticks:1 } },
  corte_amplo:      { id:'corte_amplo',      name:'Corte Amplo',      kind:'damage', targetType:'enemy', stat:'atk', power:0.85, mp:8, aoe:true },
  grito_intimidador:{ id:'grito_intimidador',name:'Grito Intimidador',kind:'buff',   targetType:'enemy', buff:{ stat:'atk', amt:-4, scope:'target' }, duration:4, mp:7, aoe:true },
  postura_defensiva:{ id:'postura_defensiva',name:'Postura Defensiva',kind:'buff',   targetType:'self',  buff:{ stat:'def', amt:8, scope:'self' }, duration:4, mp:4 },
  vinganca:         { id:'vinganca',         name:'Vingança',         kind:'damage', targetType:'enemy', stat:'atk', power:2.00, mp:8, applies:{ status:'bleed', ticks:2, dmg:5 } },
  // Clérigo (Mago Branco) — família completa (Cura/Buff/Cleanse/Holy)
  cura3:            { id:'cura3',            name:'Cura III',         kind:'heal',   targetType:'ally',  stat:'mag', power:3.00, mp:16 },
  renovar:          { id:'renovar',          name:'Renovar',          kind:'heal',   targetType:'ally',  stat:'mag', power:2.00, mp:24, aoe:true },
  arise:            { id:'arise',            name:'Ressurgir',        kind:'revive', targetType:'ally',  revive:0.90, mp:26 },
  abencoar:         { id:'abencoar',         name:'Bravura',          kind:'buff',   targetType:'ally',  buff:{ stat:'atk', amt:6, scope:'allies' }, duration:5, mp:10 },
  fe:               { id:'fe',               name:'Fé',               kind:'buff',   targetType:'ally',  buff:{ stat:'mag', amt:6, scope:'allies' }, duration:5, mp:10 },
  manto_arcano:     { id:'manto_arcano',     name:'Manto Arcano',     kind:'buff',   targetType:'ally',  buff:{ stat:'def', amt:6, scope:'allies' }, duration:5, mp:14 },
  regenerar:        { id:'regenerar',        name:'Regenerar',        kind:'ailment',targetType:'ally',  applies:{ status:'regen', ticks:5, amt:9 }, mp:8 },
  santa:            { id:'santa',            name:'Santo',            kind:'damage', targetType:'enemy', stat:'mag', power:2.20, mp:30, element:'holy' },
  confundir:        { id:'confundir',        name:'Confundir',        kind:'ailment',targetType:'enemy', applies:{ status:'confusao', ticks:3 }, mp:8 },
  // Arqueiro — arsenal de flechas
  tiro_perfurante:  { id:'tiro_perfurante',  name:'Tiro Perfurante',  kind:'damage', targetType:'enemy', stat:'atk', power:1.65, mp:6 },
  chuva_flechas:    { id:'chuva_flechas',    name:'Chuva de Flechas', kind:'damage', targetType:'enemy', stat:'atk', power:0.75, mp:8, aoe:true },
  flecha_gelo:      { id:'flecha_gelo',      name:'Flecha de Gelo',   kind:'damage', targetType:'enemy', stat:'atk', power:1.35, mp:5, element:'gelo' },
  flecha_atordoante:{ id:'flecha_atordoante',name:'Flecha Atordoante',kind:'damage', targetType:'enemy', stat:'atk', power:0.90, mp:6, applies:{ status:'stun', ticks:1 } },
  tiro_cegante:     { id:'tiro_cegante',     name:'Tiro Cegante',     kind:'damage', targetType:'enemy', stat:'atk', power:0.80, mp:6, applies:{ status:'cegueira', ticks:3 } },
  foco_cacador:     { id:'foco_cacador',     name:'Foco do Caçador',  kind:'buff',   targetType:'self',  buff:{ stat:'atk', amt:6, scope:'self' }, duration:4, mp:4 },
  disparo_rapido:   { id:'disparo_rapido',   name:'Disparo Rápido',   kind:'damage', targetType:'enemy', stat:'atk', power:0.55, mp:5, hits:3 },
  // Mago (Elemental) — famílias Fogo/Gelo/Raio em tiers + controle
  raio2:            { id:'raio2',            name:'Raio II',          kind:'damage', targetType:'enemy', stat:'mag', power:1.90, mp:9,  element:'raio', applies:{ status:'stun', ticks:1 } },
  gelo2:            { id:'gelo2',            name:'Gelo II',          kind:'damage', targetType:'enemy', stat:'mag', power:1.95, mp:9,  element:'gelo' },
  tempestade_raios: { id:'tempestade_raios', name:'Tempestade',       kind:'damage', targetType:'enemy', stat:'mag', power:1.20, mp:14, element:'raio', aoe:true },
  nevasca:          { id:'nevasca',          name:'Nevasca',          kind:'damage', targetType:'enemy', stat:'mag', power:1.25, mp:14, element:'gelo', aoe:true },
  silenciar:        { id:'silenciar',        name:'Silenciar',        kind:'ailment',targetType:'enemy', applies:{ status:'silencio', ticks:3 }, mp:6 },
  congelar:         { id:'congelar',         name:'Congelar',         kind:'ailment',targetType:'enemy', applies:{ status:'imobilizar', ticks:2 }, mp:8 },
  comburir:         { id:'comburir',         name:'Comburir',         kind:'damage', targetType:'enemy', stat:'mag', power:1.60, mp:8, element:'fire', applies:{ status:'burn', ticks:3, dmg:7 } },
  // Bárbaro — fúria e sangue
  terremoto:        { id:'terremoto',        name:'Terremoto',        kind:'damage', targetType:'enemy', stat:'atk', power:1.00, mp:8, aoe:true },
  brutalidade:      { id:'brutalidade',      name:'Brutalidade',      kind:'damage', targetType:'enemy', stat:'atk', power:1.80, mp:6, applies:{ status:'bleed', ticks:3, dmg:6 } },
  esmagar:          { id:'esmagar',          name:'Esmagar',          kind:'damage', targetType:'enemy', stat:'atk', power:1.50, mp:7, applies:{ status:'stun', ticks:1 } },
  rugido:           { id:'rugido',           name:'Rugido',           kind:'buff',   targetType:'enemy', buff:{ stat:'atk', amt:-4, scope:'target' }, duration:4, mp:6, aoe:true },
  sede_sangue:      { id:'sede_sangue',      name:'Sede de Sangue',   kind:'damage', targetType:'enemy', stat:'atk', power:1.30, mp:6, lifesteal:0.5 },
  frenesi:          { id:'frenesi',          name:'Frenesi',          kind:'buff',   targetType:'self',  buff:{ stat:'spd', amt:4, scope:'self' }, duration:4, mp:4 },
  // Assassino — furtividade e veneno
  apunhalar:        { id:'apunhalar',        name:'Apunhalar',        kind:'damage', targetType:'enemy', stat:'atk', power:1.60, mp:5, critBonus:0.30 },
  ataque_furtivo:   { id:'ataque_furtivo',   name:'Ataque Furtivo',   kind:'damage', targetType:'enemy', stat:'atk', power:2.30, mp:8, critBonus:0.60 },
  garrote:          { id:'garrote',          name:'Garrote',          kind:'damage', targetType:'enemy', stat:'atk', power:1.00, mp:6, applies:{ status:'silencio', ticks:3 } },
  passo_sombrio:    { id:'passo_sombrio',    name:'Passo Sombrio',    kind:'buff',   targetType:'self',  buff:{ stat:'spd', amt:4, scope:'self' }, duration:4, mp:4 },
  marca_morte:      { id:'marca_morte',      name:'Marca da Morte',   kind:'vuln',   targetType:'enemy', frac:0.30, duration:4, mp:8 },
  lamina_dupla:     { id:'lamina_dupla',     name:'Lâmina Dupla',     kind:'damage', targetType:'enemy', stat:'atk', power:0.65, mp:4, hits:2 },
  // Paladino — sagrado híbrido
  luz_curativa:     { id:'luz_curativa',     name:'Luz Curativa',     kind:'heal',   targetType:'ally',  stat:'mag', power:1.60, mp:6 },
  bencao:           { id:'bencao',           name:'Bênção',           kind:'buff',   targetType:'ally',  buff:{ stat:'atk', amt:5, scope:'allies' }, duration:5, mp:8 },
  punicao:          { id:'punicao',          name:'Punição',          kind:'damage', targetType:'enemy', stat:'mag', power:1.55, mp:8, element:'holy' },
  martelo_justo:    { id:'martelo_justo',    name:'Martelo Justo',    kind:'damage', targetType:'enemy', stat:'atk', power:1.60, mp:7, applies:{ status:'stun', ticks:1 } },
  luz_purificadora: { id:'luz_purificadora', name:'Luz Purificadora', kind:'cleanse',targetType:'ally',  cure:'all', aoe:true, mp:12 },
  // Piromante — fogo em tiers
  fogo3:            { id:'fogo3',            name:'Fogo III',         kind:'damage', targetType:'enemy', stat:'mag', power:2.60, mp:18, element:'fire', applies:{ status:'burn', ticks:2, dmg:8 } },
  chamas_gemeas:    { id:'chamas_gemeas',    name:'Chamas Gêmeas',    kind:'damage', targetType:'enemy', stat:'mag', power:0.95, mp:9, element:'fire', hits:2, applies:{ status:'burn', ticks:2, dmg:5 } },
  combustao:        { id:'combustao',        name:'Combustão',        kind:'damage', targetType:'enemy', stat:'mag', power:1.40, mp:10, element:'fire', applies:{ status:'burn', ticks:4, dmg:10 } },
  inferno:          { id:'inferno',          name:'Inferno',          kind:'damage', targetType:'enemy', stat:'mag', power:1.70, mp:26, element:'fire', aoe:true, applies:{ status:'burn', ticks:3, dmg:8 } },
  calor_escaldante: { id:'calor_escaldante', name:'Calor Escaldante', kind:'buff',   targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:5 },
  // Alquimista — poções e gases
  elixir2:          { id:'elixir2',          name:'Elixir II',        kind:'heal',   targetType:'ally',  stat:'mag', power:1.90, mp:8 },
  bomba_fogo:       { id:'bomba_fogo',       name:'Bomba Incendiária',kind:'damage', targetType:'enemy', stat:'mag', power:1.30, mp:10, element:'fire', aoe:true },
  gas_sono:         { id:'gas_sono',         name:'Gás Soporífero',   kind:'ailment',targetType:'enemy', applies:{ status:'sono', ticks:3 }, aoe:true, mp:11 },
  gas_cegueira:     { id:'gas_cegueira',     name:'Gás Cegante',      kind:'ailment',targetType:'enemy', applies:{ status:'cegueira', ticks:3 }, aoe:true, mp:10 },
  pocao_forca:      { id:'pocao_forca',      name:'Poção de Força',   kind:'buff',   targetType:'ally',  buff:{ stat:'atk', amt:5, scope:'allies' }, duration:5, mp:8 },
  corrosao:         { id:'corrosao',         name:'Corrosão',         kind:'damage', targetType:'enemy', stat:'mag', power:1.20, mp:5, applies:{ status:'poison', ticks:4, dmg:6 } },
  // Duelista — esgrima ágil
  perfurar:         { id:'perfurar',         name:'Perfurar',         kind:'damage', targetType:'enemy', stat:'atk', power:1.70, mp:6 },
  estocada_dupla:   { id:'estocada_dupla',   name:'Estocada Dupla',   kind:'damage', targetType:'enemy', stat:'atk', power:0.75, mp:4, hits:2 },
  golpe_preciso:    { id:'golpe_preciso',    name:'Golpe Preciso',    kind:'damage', targetType:'enemy', stat:'atk', power:1.40, mp:5, critBonus:0.40 },
  provocacao_elegante:{ id:'provocacao_elegante', name:'Provocação Elegante', kind:'buff', targetType:'enemy', buff:{ stat:'atk', amt:-4, scope:'target' }, duration:4, mp:3 },
  contra_ataque:    { id:'contra_ataque',    name:'Contra-Ataque',    kind:'buff',   targetType:'self',  buff:{ stat:'def', amt:5, scope:'self' }, duration:4, mp:3 },
  // Monge — artes marciais de Ki
  golpe_ki:         { id:'golpe_ki',         name:'Golpe de Ki',      kind:'damage', targetType:'enemy', stat:'atk', power:1.50, mp:5 },
  explosao_ki:      { id:'explosao_ki',      name:'Explosão de Ki',   kind:'damage', targetType:'enemy', stat:'atk', power:0.90, mp:8, aoe:true },
  cura_interior:    { id:'cura_interior',    name:'Cura Interior',    kind:'heal',   targetType:'self',  stat:'atk', power:1.20, mp:5 },
  postura_ferro:    { id:'postura_ferro',    name:'Postura de Ferro', kind:'buff',   targetType:'self',  buff:{ stat:'def', amt:6, scope:'self' }, duration:4, mp:4 },
  contra_golpe:     { id:'contra_golpe',     name:'Contra-Golpe',     kind:'damage', targetType:'enemy', stat:'atk', power:1.60, mp:6, critBonus:0.30 },
  // Bardo — repertório de suporte
  hino_coragem:     { id:'hino_coragem',     name:'Hino de Coragem',  kind:'buff',   targetType:'ally',  buff:{ stat:'atk', amt:5, scope:'allies' }, duration:5, mp:8 },
  melodia_protecao: { id:'melodia_protecao', name:'Melodia Protetora',kind:'buff',   targetType:'ally',  buff:{ stat:'def', amt:5, scope:'allies' }, duration:5, mp:8 },
  verso_silencio:   { id:'verso_silencio',   name:'Verso do Silêncio',kind:'ailment',targetType:'enemy', applies:{ status:'silencio', ticks:3 }, mp:6 },
  balada_sono:      { id:'balada_sono',      name:'Balada do Sono',   kind:'ailment',targetType:'enemy', applies:{ status:'sono', ticks:3 }, mp:7 },
  final_epico:      { id:'final_epico',      name:'Final Épico',      kind:'damage', targetType:'enemy', stat:'mag', power:1.10, mp:12, aoe:true },
  // Guardião Rúnico — runas defensivas e selos
  runa_vida:        { id:'runa_vida',        name:'Runa da Vida',     kind:'heal',   targetType:'ally',  stat:'mag', power:1.50, mp:7 },
  runa_regeneracao: { id:'runa_regeneracao', name:'Runa Regeneradora',kind:'ailment',targetType:'ally',  applies:{ status:'regen', ticks:5, amt:8 }, mp:8 },
  selo_silencio:    { id:'selo_silencio',    name:'Selo do Silêncio', kind:'ailment',targetType:'enemy', applies:{ status:'silencio', ticks:3 }, mp:6 },
  explosao_runica:  { id:'explosao_runica',  name:'Explosão Rúnica',  kind:'damage', targetType:'enemy', stat:'mag', power:1.20, mp:12, aoe:true },
  egide_maior:      { id:'egide_maior',      name:'Égide Maior',      kind:'shield', targetType:'ally',  shield:{ amount:50, scope:'allies' }, duration:3, mp:16 },
  marca_runica:     { id:'marca_runica',     name:'Marca Rúnica',     kind:'buff',   targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:5 },
  // Necromante — sombra e dreno
  drenar_vida:      { id:'drenar_vida',      name:'Drenar Vida',      kind:'damage', targetType:'enemy', stat:'mag', power:1.50, mp:7, element:'dark', lifesteal:0.7 },
  toque_gelido:     { id:'toque_gelido',     name:'Toque Gélido',     kind:'damage', targetType:'enemy', stat:'mag', power:1.45, mp:6, element:'dark' },
  explosao_sombria: { id:'explosao_sombria', name:'Explosão Sombria', kind:'damage', targetType:'enemy', stat:'mag', power:1.20, mp:13, element:'dark', aoe:true },
  terror:           { id:'terror',           name:'Terror',           kind:'ailment',targetType:'enemy', applies:{ status:'confusao', ticks:3 }, mp:7 },
  necrose:          { id:'necrose',          name:'Necrose',          kind:'damage', targetType:'enemy', stat:'mag', power:1.40, mp:7, element:'dark', applies:{ status:'poison', ticks:4, dmg:7 } },
  maldicao:         { id:'maldicao',         name:'Maldição',         kind:'buff',   targetType:'enemy', buff:{ stat:'atk', amt:-5, scope:'target' }, duration:4, mp:5 },
  // Feiticeiro do Tempo — controle temporal
  acelerar_massa:   { id:'acelerar_massa',   name:'Acelerar em Massa',kind:'buff',   targetType:'ally',  buff:{ stat:'spd', amt:3, scope:'allies' }, duration:4, mp:10 },
  lentidao_massa:   { id:'lentidao_massa',   name:'Lentidão em Massa',kind:'buff',   targetType:'enemy', buff:{ stat:'spd', amt:-3, scope:'target' }, duration:3, mp:10, aoe:true },
  parar_maior:      { id:'parar_maior',      name:'Parar Maior',      kind:'ailment',targetType:'enemy', applies:{ status:'imobilizar', ticks:3 }, mp:12 },
  reverter:         { id:'reverter',         name:'Reverter',         kind:'heal',   targetType:'ally',  stat:'mag', power:2.10, mp:10 },
  estase:           { id:'estase',           name:'Estase',           kind:'ailment',targetType:'enemy', applies:{ status:'sono', ticks:3 }, mp:8 },
  colapso:          { id:'colapso',          name:'Colapso',          kind:'damage', targetType:'enemy', stat:'mag', power:1.80, mp:10, element:'time' },


  // === PASSO 6 — COMPÊNDIO COMPLETO (skills restantes, funcionais) ===
  golpe_pesado_i: { id:'golpe_pesado_i', name:'Golpe Pesado I', kind:'damage', targetType:'enemy', stat:'atk', power:1.55, mp:4 },
  golpe_pesado_ii: { id:'golpe_pesado_ii', name:'Golpe Pesado II', kind:'damage', targetType:'enemy', stat:'atk', power:1.95, mp:7 },
  golpe_pesado_iii: { id:'golpe_pesado_iii', name:'Golpe Pesado III', kind:'damage', targetType:'enemy', stat:'atk', power:2.45, mp:11 },
  provocar_em_area: { id:'provocar_em_area', name:'Provocar em Área', kind:'taunt', targetType:'self', duration:3, mp:2 },
  muralha_i: { id:'muralha_i', name:'Muralha I', kind:'buff', targetType:'self', buff:{ stat:'def', amt:6, scope:'self' }, duration:4, mp:4 },
  muralha_ii: { id:'muralha_ii', name:'Muralha II', kind:'buff', targetType:'self', buff:{ stat:'def', amt:9, scope:'self' }, duration:4, mp:7 },
  bloqueio_total: { id:'bloqueio_total', name:'Bloqueio Total', kind:'guard', targetType:'self', scope:'self', frac:0.6, duration:1, mp:5 },
  quebra_arma: { id:'quebra_arma', name:'Quebra-Arma', kind:'buff', targetType:'enemy', buff:{ stat:'atk', amt:-5, scope:'target' }, duration:4, mp:4 },
  quebra_elmo: { id:'quebra_elmo', name:'Quebra-Elmo', kind:'buff', targetType:'enemy', buff:{ stat:'mag', amt:-5, scope:'target' }, duration:4, mp:4 },
  quebra_botas: { id:'quebra_botas', name:'Quebra-Botas', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-4, scope:'target' }, duration:4, mp:4 },
  escudo_do_companheiro: { id:'escudo_do_companheiro', name:'Escudo do Companheiro', kind:'shield', targetType:'ally', shield:{ amount:30 }, duration:3, mp:6 },
  baluarte: { id:'baluarte', name:'Baluarte', kind:'invuln', targetType:'self', scope:'self', duration:1, mp:16 },
  investida_devastadora: { id:'investida_devastadora', name:'Investida Devastadora', kind:'damage', targetType:'enemy', stat:'atk', power:2.6, mp:14, applies:{ status:'stun', ticks:1 } },
  cura: { id:'cura', name:'Cura', kind:'heal', targetType:'ally', stat:'mag', power:1.5, mp:5 },
  cura_massiva: { id:'cura_massiva', name:'Cura Massiva', kind:'heal', targetType:'ally', stat:'mag', power:4, mp:24 },
  cura_em_area_i: { id:'cura_em_area_i', name:'Cura em Área I', kind:'heal', targetType:'ally', stat:'mag', power:1.1, mp:12, aoe:true },
  cura_em_area_ii: { id:'cura_em_area_ii', name:'Cura em Área II', kind:'heal', targetType:'ally', stat:'mag', power:1.7, mp:18, aoe:true },
  reviver_total: { id:'reviver_total', name:'Reviver Total', kind:'revive', targetType:'ally', revive:1, mp:28 },
  curar_veneno: { id:'curar_veneno', name:'Curar Veneno', kind:'cleanse', targetType:'ally', cure:'poison', mp:3 },
  curar_cegueira: { id:'curar_cegueira', name:'Curar Cegueira', kind:'cleanse', targetType:'ally', cure:'cegueira', mp:3 },
  curar_silencio: { id:'curar_silencio', name:'Curar Silêncio', kind:'cleanse', targetType:'ally', cure:'silencio', mp:3 },
  curar_petrificacao: { id:'curar_petrificacao', name:'Curar Petrificação', kind:'cleanse', targetType:'ally', cure:'imobilizar', mp:3 },
  esuna_em_area: { id:'esuna_em_area', name:'Esuna em Área', kind:'cleanse', targetType:'ally', cure:'all', mp:12, aoe:true },
  purificar: { id:'purificar', name:'Purificar', kind:'cleanse', targetType:'ally', cure:'all', mp:8 },
  protecao_em_area: { id:'protecao_em_area', name:'Proteção em Área', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:5, scope:'allies' }, duration:5, mp:14 },
  manto_magico: { id:'manto_magico', name:'Manto Mágico', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:5, scope:'target' }, duration:5, mp:6 },
  manto_em_area: { id:'manto_em_area', name:'Manto em Área', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:5, scope:'allies' }, duration:5, mp:14 },
  regeneracao: { id:'regeneracao', name:'Regeneração', kind:'ailment', targetType:'ally', applies:{ status:'regen', ticks:5, amt:9 }, mp:8 },
  dissipar_em_area: { id:'dissipar_em_area', name:'Dissipar em Área', kind:'dispel', targetType:'enemy', aoe:true, mp:10 },
  confusao: { id:'confusao', name:'Confusão', kind:'ailment', targetType:'enemy', applies:{ status:'confusao', ticks:3 }, mp:8 },
  salvacao: { id:'salvacao', name:'Salvação', kind:'revive', targetType:'ally', aoe:true, revive:0.6, healPower:2.4, mp:36 },
  julgamento_divino: { id:'julgamento_divino', name:'Julgamento Divino', kind:'damage', targetType:'enemy', stat:'mag', power:2, mp:30, element:'holy', aoe:true },
  tiro_certeiro_ii: { id:'tiro_certeiro_ii', name:'Tiro Certeiro II', kind:'damage', targetType:'enemy', stat:'atk', power:1.7, mp:6, critBonus:0.15 },
  tiro_certeiro_iii: { id:'tiro_certeiro_iii', name:'Tiro Certeiro III', kind:'damage', targetType:'enemy', stat:'atk', power:2.2, mp:10, critBonus:0.2 },
  tiro_multiplo_i: { id:'tiro_multiplo_i', name:'Tiro Múltiplo I', kind:'damage', targetType:'enemy', stat:'atk', power:0.7, mp:8, aoe:true },
  tiro_multiplo_ii: { id:'tiro_multiplo_ii', name:'Tiro Múltiplo II', kind:'damage', targetType:'enemy', stat:'atk', power:1, mp:12, aoe:true },
  flecha_flamejante: { id:'flecha_flamejante', name:'Flecha Flamejante', kind:'damage', targetType:'enemy', stat:'atk', power:1.1, mp:5, element:'fire', applies:{ status:'burn', ticks:3, dmg:7 } },
  flecha_trovejante: { id:'flecha_trovejante', name:'Flecha Trovejante', kind:'damage', targetType:'enemy', stat:'atk', power:0.9, mp:6, element:'raio', applies:{ status:'stun', ticks:1 } },
  flecha_cega: { id:'flecha_cega', name:'Flecha Cega', kind:'damage', targetType:'enemy', stat:'atk', power:0.8, mp:6, applies:{ status:'cegueira', ticks:3 } },
  flecha_silenciadora: { id:'flecha_silenciadora', name:'Flecha Silenciadora', kind:'damage', targetType:'enemy', stat:'atk', power:0.85, mp:6, applies:{ status:'silencio', ticks:3 } },
  tiro_supressor: { id:'tiro_supressor', name:'Tiro Supressor', kind:'buff', targetType:'enemy', buff:{ stat:'atk', amt:-5, scope:'target' }, duration:4, mp:4 },
  passo_agil: { id:'passo_agil', name:'Passo Ágil', kind:'buff', targetType:'self', buff:{ stat:'spd', amt:4, scope:'self' }, duration:4, mp:3 },
  mira_firme: { id:'mira_firme', name:'Mira Firme', kind:'critup', targetType:'self', scope:'self', amt:0.25, duration:4, mp:4 },
  flecha_restauradora: { id:'flecha_restauradora', name:'Flecha Restauradora', kind:'heal', targetType:'ally', stat:'mag', power:1.1, mp:5 },
  tiro_fatal: { id:'tiro_fatal', name:'Tiro Fatal', kind:'damage', targetType:'enemy', stat:'atk', power:2.8, mp:12, critBonus:0.3 },
  chama_i: { id:'chama_i', name:'Chama I', kind:'damage', targetType:'enemy', stat:'mag', power:1.6, mp:6, element:'fire', applies:{ status:'burn', ticks:2, dmg:5 } },
  chama_ii: { id:'chama_ii', name:'Chama II', kind:'damage', targetType:'enemy', stat:'mag', power:2, mp:10, element:'fire', applies:{ status:'burn', ticks:2, dmg:6 } },
  chama_iii: { id:'chama_iii', name:'Chama III', kind:'damage', targetType:'enemy', stat:'mag', power:2.7, mp:18, element:'fire', applies:{ status:'burn', ticks:2, dmg:8 } },
  gelo_i: { id:'gelo_i', name:'Gelo I', kind:'damage', targetType:'enemy', stat:'mag', power:1.5, mp:6, element:'gelo' },
  gelo_iii: { id:'gelo_iii', name:'Gelo III', kind:'damage', targetType:'enemy', stat:'mag', power:2.6, mp:18, element:'gelo' },
  gelo_em_area: { id:'gelo_em_area', name:'Gelo em Área', kind:'damage', targetType:'enemy', stat:'mag', power:1.2, mp:14, aoe:true, element:'gelo' },
  raio_i: { id:'raio_i', name:'Raio I', kind:'damage', targetType:'enemy', stat:'mag', power:1.4, mp:6, element:'raio', applies:{ status:'stun', ticks:1 } },
  raio_iii: { id:'raio_iii', name:'Raio III', kind:'damage', targetType:'enemy', stat:'mag', power:2.5, mp:18, element:'raio', applies:{ status:'stun', ticks:1 } },
  raio_em_area: { id:'raio_em_area', name:'Raio em Área', kind:'damage', targetType:'enemy', stat:'mag', power:1.2, mp:14, aoe:true, element:'raio' },
  silencio: { id:'silencio', name:'Silêncio', kind:'ailment', targetType:'enemy', applies:{ status:'silencio', ticks:3 }, mp:6 },
  concentracao: { id:'concentracao', name:'Concentração', kind:'buff', targetType:'self', buff:{ stat:'mag', amt:6, scope:'self' }, duration:4, mp:4 },
  barreira_arcana: { id:'barreira_arcana', name:'Barreira Arcana', kind:'shield', targetType:'self', shield:{ amount:35 }, duration:3, mp:7 },
  dreno_de_mana: { id:'dreno_de_mana', name:'Dreno de Mana', kind:'damage', targetType:'enemy', stat:'mag', power:1, mp:4, element:'dark', restoreSelfMp:12 },
  refresco: { id:'refresco', name:'Refresco', kind:'mana', targetType:'ally', amount:30, mp:6, scope:'target' },
  flare: { id:'flare', name:'Flare', kind:'damage', targetType:'enemy', stat:'mag', power:2.8, mp:24 },
  machadada_ii: { id:'machadada_ii', name:'Machadada II', kind:'damage', targetType:'enemy', stat:'atk', power:1.9, mp:6, applies:{ status:'bleed', ticks:3, dmg:7 } },
  rodopio_i: { id:'rodopio_i', name:'Rodopio I', kind:'damage', targetType:'enemy', stat:'atk', power:0.85, mp:5, aoe:true },
  rodopio_ii: { id:'rodopio_ii', name:'Rodopio II', kind:'damage', targetType:'enemy', stat:'atk', power:1.15, mp:9, aoe:true },
  investida_brutal: { id:'investida_brutal', name:'Investida Brutal', kind:'damage', targetType:'enemy', stat:'atk', power:1.8, mp:7 },
  furia_maior: { id:'furia_maior', name:'Fúria Maior', kind:'buff', targetType:'self', buff:{ stat:'atk', amt:11, scope:'self' }, duration:5, mp:0 },
  adrenalina: { id:'adrenalina', name:'Adrenalina', kind:'ailment', targetType:'self', applies:{ status:'regen', ticks:4, amt:10 }, mp:3 },
  pisao: { id:'pisao', name:'Pisão', kind:'damage', targetType:'enemy', stat:'atk', power:0.9, mp:5, applies:{ status:'stun', ticks:1 } },
  investida_trovejante: { id:'investida_trovejante', name:'Investida Trovejante', kind:'damage', targetType:'enemy', stat:'atk', power:0.8, mp:9, aoe:true, applies:{ status:'stun', ticks:1 } },
  grito_selvagem: { id:'grito_selvagem', name:'Grito Selvagem', kind:'buff', targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:6, aoe:true },
  rugido_aterrador: { id:'rugido_aterrador', name:'Rugido Aterrador', kind:'buff', targetType:'enemy', buff:{ stat:'atk', amt:-5, scope:'target' }, duration:4, mp:6, aoe:true },
  machado_dilacerante: { id:'machado_dilacerante', name:'Machado Dilacerante', kind:'damage', targetType:'enemy', stat:'atk', power:1.4, mp:6, applies:{ status:'bleed', ticks:4, dmg:9 } },
  regeneracao_selvagem: { id:'regeneracao_selvagem', name:'Regeneração Selvagem', kind:'ailment', targetType:'self', applies:{ status:'regen', ticks:5, amt:9 }, mp:3 },
  apunhalar_ii: { id:'apunhalar_ii', name:'Apunhalar II', kind:'damage', targetType:'enemy', stat:'atk', power:1.9, mp:6, critBonus:0.3 },
  lamina_sangrenta: { id:'lamina_sangrenta', name:'Lâmina Sangrenta', kind:'damage', targetType:'enemy', stat:'atk', power:1, mp:4, applies:{ status:'bleed', ticks:4, dmg:6 } },
  po_cegante: { id:'po_cegante', name:'Pó Cegante', kind:'ailment', targetType:'enemy', applies:{ status:'cegueira', ticks:3 }, mp:5 },
  golpe_silenciador: { id:'golpe_silenciador', name:'Golpe Silenciador', kind:'damage', targetType:'enemy', stat:'atk', power:0.9, mp:6, applies:{ status:'silencio', ticks:3 } },
  golpe_debilitante: { id:'golpe_debilitante', name:'Golpe Debilitante', kind:'buff', targetType:'enemy', buff:{ stat:'atk', amt:-5, scope:'target' }, duration:4, mp:4 },
  corte_nos_tendoes: { id:'corte_nos_tendoes', name:'Corte nos Tendões', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-4, scope:'target' }, duration:4, mp:4 },
  fumaca: { id:'fumaca', name:'Fumaça', kind:'evasion', targetType:'self', scope:'self', chance:0.35, duration:3, mp:4 },
  foco_assassino: { id:'foco_assassino', name:'Foco Assassino', kind:'critup', targetType:'self', scope:'self', amt:0.3, duration:4, mp:4 },
  mil_cortes: { id:'mil_cortes', name:'Mil Cortes', kind:'damage', targetType:'enemy', stat:'atk', power:0.5, mp:12, hits:6, critBonus:0.2 },
  aura_sagrada: { id:'aura_sagrada', name:'Aura Sagrada', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:5, scope:'allies' }, duration:5, mp:10 },
  golpe_sagrado_ii: { id:'golpe_sagrado_ii', name:'Golpe Sagrado II', kind:'damage', targetType:'enemy', stat:'mag', power:1.7, mp:8, element:'holy' },
  lamina_radiante: { id:'lamina_radiante', name:'Lâmina Radiante', kind:'damage', targetType:'enemy', stat:'mag', power:1.4, mp:8, element:'holy', applies:{ status:'cegueira', ticks:3 } },
  bravura_sagrada: { id:'bravura_sagrada', name:'Bravura Sagrada', kind:'buff', targetType:'ally', buff:{ stat:'atk', amt:5, scope:'target' }, duration:5, mp:8 },
  intervencao_divina: { id:'intervencao_divina', name:'Intervenção Divina', kind:'invuln', targetType:'ally', scope:'allies', duration:1, mp:30 },
  fogo_em_area: { id:'fogo_em_area', name:'Fogo em Área', kind:'damage', targetType:'enemy', stat:'mag', power:1.15, mp:13, aoe:true, element:'fire', applies:{ status:'burn', ticks:2, dmg:5 } },
  lanca_ignea: { id:'lanca_ignea', name:'Lança Ígnea', kind:'damage', targetType:'enemy', stat:'mag', power:1.7, mp:9, element:'fire', ignoreDef:0.5 },
  explosao_i: { id:'explosao_i', name:'Explosão I', kind:'damage', targetType:'enemy', stat:'mag', power:1.1, mp:12, aoe:true, element:'fire' },
  explosao_ii: { id:'explosao_ii', name:'Explosão II', kind:'damage', targetType:'enemy', stat:'mag', power:1.5, mp:18, aoe:true, element:'fire' },
  chama_cegante: { id:'chama_cegante', name:'Chama Cegante', kind:'ailment', targetType:'enemy', applies:{ status:'cegueira', ticks:3 }, mp:6 },
  calcinar: { id:'calcinar', name:'Calcinar', kind:'damage', targetType:'enemy', stat:'mag', power:1.3, mp:10, element:'fire', applies:{ status:'burn', ticks:5, dmg:11 } },
  escudo_de_chamas: { id:'escudo_de_chamas', name:'Escudo de Chamas', kind:'reflect', targetType:'self', scope:'self', mode:'any', frac:0.3, duration:4, mp:8 },
  calor_interno: { id:'calor_interno', name:'Calor Interno', kind:'buff', targetType:'self', buff:{ stat:'mag', amt:6, scope:'self' }, duration:4, mp:4 },
  absorver_chama: { id:'absorver_chama', name:'Absorver Chama', kind:'heal', targetType:'self', stat:'mag', power:1.6, mp:6 },
  supernova: { id:'supernova', name:'Supernova', kind:'damage', targetType:'enemy', stat:'mag', power:2.2, mp:30, aoe:true, element:'fire', applies:{ status:'burn', ticks:3, dmg:9 } },
  veneno_ii: { id:'veneno_ii', name:'Veneno II', kind:'damage', targetType:'enemy', stat:'mag', power:0.8, mp:6, element:'poison', applies:{ status:'poison', ticks:5, dmg:8 } },
  frasco_corrosivo: { id:'frasco_corrosivo', name:'Frasco Corrosivo', kind:'buff', targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:6, aoe:true },
  bomba_de_fumaca: { id:'bomba_de_fumaca', name:'Bomba de Fumaça', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-4, scope:'target' }, duration:4, mp:4 },
  elixir_em_area: { id:'elixir_em_area', name:'Elixir em Área', kind:'heal', targetType:'ally', stat:'mag', power:1.2, mp:12, aoe:true },
  pocao_de_mana: { id:'pocao_de_mana', name:'Poção de Mana', kind:'mana', targetType:'ally', amount:40, mp:6, scope:'target' },
  antidoto: { id:'antidoto', name:'Antídoto', kind:'cleanse', targetType:'ally', cure:'poison', mp:3 },
  remedio: { id:'remedio', name:'Remédio', kind:'cleanse', targetType:'ally', cure:'all', mp:7 },
  elixir_de_forca: { id:'elixir_de_forca', name:'Elixir de Força', kind:'buff', targetType:'ally', buff:{ stat:'atk', amt:5, scope:'target' }, duration:5, mp:8 },
  elixir_ferreo: { id:'elixir_ferreo', name:'Elixir Férreo', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:5, scope:'target' }, duration:5, mp:8 },
  frasco_explosivo: { id:'frasco_explosivo', name:'Frasco Explosivo', kind:'damage', targetType:'enemy', stat:'mag', power:1.2, mp:10, aoe:true, element:'fire' },
  panaceia: { id:'panaceia', name:'Panaceia', kind:'cleanse', targetType:'ally', cure:'all', mp:16, aoe:true },
  reacao_em_cadeia: { id:'reacao_em_cadeia', name:'Reação em Cadeia', kind:'damage', targetType:'enemy', stat:'mag', power:2.2, mp:28, aoe:true, element:'fire' },
  danca_das_laminas_i: { id:'danca_das_laminas_i', name:'Dança das Lâminas I', kind:'damage', targetType:'enemy', stat:'atk', power:0.5, mp:5, hits:3 },
  danca_das_laminas_ii: { id:'danca_das_laminas_ii', name:'Dança das Lâminas II', kind:'damage', targetType:'enemy', stat:'atk', power:0.55, mp:8, hits:4 },
  investida_elegante: { id:'investida_elegante', name:'Investida Elegante', kind:'damage', targetType:'enemy', stat:'atk', power:1.5, mp:6 },
  corte_relampago: { id:'corte_relampago', name:'Corte Relâmpago', kind:'damage', targetType:'enemy', stat:'atk', power:1.3, mp:4, critBonus:0.1 },
  provocacao_insolente: { id:'provocacao_insolente', name:'Provocação Insolente', kind:'taunt', targetType:'self', duration:2, mp:3 },
  desarme: { id:'desarme', name:'Desarme', kind:'buff', targetType:'enemy', buff:{ stat:'atk', amt:-5, scope:'target' }, duration:4, mp:4 },
  postura_de_duelo: { id:'postura_de_duelo', name:'Postura de Duelo', kind:'evasion', targetType:'self', scope:'self', chance:0.3, duration:3, mp:4 },
  passo_de_danca: { id:'passo_de_danca', name:'Passo de Dança', kind:'buff', targetType:'self', buff:{ stat:'spd', amt:4, scope:'self' }, duration:4, mp:3 },
  concentracao_de_lamina: { id:'concentracao_de_lamina', name:'Concentração de Lâmina', kind:'critup', targetType:'self', scope:'self', amt:0.3, duration:4, mp:4 },
  golpe_perfeito: { id:'golpe_perfeito', name:'Golpe Perfeito', kind:'damage', targetType:'enemy', stat:'atk', power:2.2, mp:10, alwaysCrit:true },
  valsa_mortal: { id:'valsa_mortal', name:'Valsa Mortal', kind:'damage', targetType:'enemy', stat:'atk', power:0.7, mp:14, aoe:true, hits:2 },
  palma_de_ki_ii: { id:'palma_de_ki_ii', name:'Palma de Ki II', kind:'damage', targetType:'enemy', stat:'atk', power:1.6, mp:5 },
  rajada_de_golpes_i: { id:'rajada_de_golpes_i', name:'Rajada de Golpes I', kind:'damage', targetType:'enemy', stat:'atk', power:0.45, mp:5, hits:4 },
  rajada_de_golpes_ii: { id:'rajada_de_golpes_ii', name:'Rajada de Golpes II', kind:'damage', targetType:'enemy', stat:'atk', power:0.5, mp:8, hits:5 },
  golpe_perfurante: { id:'golpe_perfurante', name:'Golpe Perfurante', kind:'damage', targetType:'enemy', stat:'atk', power:1.3, mp:6, ignoreDef:0.5 },
  chute_giratorio: { id:'chute_giratorio', name:'Chute Giratório', kind:'damage', targetType:'enemy', stat:'atk', power:0.9, mp:7, aoe:true },
  postura_ferrea: { id:'postura_ferrea', name:'Postura Férrea', kind:'buff', targetType:'self', buff:{ stat:'def', amt:7, scope:'self' }, duration:4, mp:4 },
  foco_interior: { id:'foco_interior', name:'Foco Interior', kind:'critup', targetType:'self', scope:'self', amt:0.3, duration:4, mp:4 },
  chi_da_velocidade: { id:'chi_da_velocidade', name:'Chi da Velocidade', kind:'buff', targetType:'self', buff:{ stat:'spd', amt:4, scope:'self' }, duration:4, mp:3 },
  toque_curativo: { id:'toque_curativo', name:'Toque Curativo', kind:'heal', targetType:'ally', stat:'mag', power:1.2, mp:5 },
  purificacao_interior: { id:'purificacao_interior', name:'Purificação Interior', kind:'cleanse', targetType:'self', cure:'all', mp:5 },
  golpe_nervoso: { id:'golpe_nervoso', name:'Golpe Nervoso', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-4, scope:'target' }, duration:4, mp:4 },
  palma_silenciadora: { id:'palma_silenciadora', name:'Palma Silenciadora', kind:'damage', targetType:'enemy', stat:'atk', power:0.85, mp:6, applies:{ status:'silencio', ticks:3 } },
  punho_dos_cem: { id:'punho_dos_cem', name:'Punho dos Cem', kind:'damage', targetType:'enemy', stat:'atk', power:0.4, mp:14, hits:8, critBonus:0.15 },
  hino_de_guerra_ii: { id:'hino_de_guerra_ii', name:'Hino de Guerra II', kind:'buff', targetType:'ally', buff:{ stat:'atk', amt:7, scope:'allies' }, duration:5, mp:9 },
  cancao_de_guarda_ii: { id:'cancao_de_guarda_ii', name:'Canção de Guarda II', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:7, scope:'allies' }, duration:5, mp:9 },
  cantico_arcano: { id:'cantico_arcano', name:'Cântico Arcano', kind:'buff', targetType:'ally', buff:{ stat:'mag', amt:6, scope:'allies' }, duration:5, mp:9 },
  ode_da_regeneracao: { id:'ode_da_regeneracao', name:'Ode da Regeneração', kind:'ailment', targetType:'ally', applies:{ status:'regen', ticks:5, amt:8 }, mp:12, aoe:true },
  dissonancia: { id:'dissonancia', name:'Dissonância', kind:'buff', targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:7, aoe:true },
  nenia: { id:'nenia', name:'Nênia', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-4, scope:'target' }, duration:4, mp:7, aoe:true },
  cancao_do_sono: { id:'cancao_do_sono', name:'Canção do Sono', kind:'ailment', targetType:'enemy', applies:{ status:'sono', ticks:3 }, mp:12, aoe:true },
  cancao_de_inspiracao: { id:'cancao_de_inspiracao', name:'Canção de Inspiração', kind:'mana', targetType:'ally', amount:25, aoe:true, mp:12 },
  silencio_harmonico: { id:'silencio_harmonico', name:'Silêncio Harmônico', kind:'dispel', targetType:'enemy', aoe:true, mp:10 },
  acorde_dissonante: { id:'acorde_dissonante', name:'Acorde Dissonante', kind:'damage', targetType:'enemy', stat:'mag', power:1, mp:8, applies:{ status:'confusao', ticks:2 } },
  sinfonia_heroica: { id:'sinfonia_heroica', name:'Sinfonia Heroica', kind:'buff', targetType:'ally', buff:{ stat:'atk', amt:8, scope:'allies' }, duration:5, mp:18 },
  requiem_final: { id:'requiem_final', name:'Réquiem Final', kind:'damage', targetType:'enemy', stat:'mag', power:1.3, mp:16, aoe:true },
  barreira_maior: { id:'barreira_maior', name:'Barreira Maior', kind:'shield', targetType:'ally', shield:{ amount:45, scope:'allies' }, duration:3, mp:14 },
  runa_de_espinhos: { id:'runa_de_espinhos', name:'Runa de Espinhos', kind:'reflect', targetType:'ally', scope:'allies', mode:'phys', frac:0.35, duration:4, mp:8 },
  runa_de_espelho: { id:'runa_de_espelho', name:'Runa de Espelho', kind:'reflect', targetType:'ally', scope:'allies', mode:'magic', frac:0.35, duration:4, mp:8 },
  contra_runa: { id:'contra_runa', name:'Contra-Runa', kind:'reflect', targetType:'self', scope:'self', mode:'any', frac:0.6, duration:2, mp:7 },
  runa_de_regeneracao: { id:'runa_de_regeneracao', name:'Runa de Regeneração', kind:'ailment', targetType:'ally', applies:{ status:'regen', ticks:5, amt:8 }, mp:12, aoe:true },
  runa_de_resistencia: { id:'runa_de_resistencia', name:'Runa de Resistência', kind:'buff', targetType:'ally', buff:{ stat:'def', amt:5, scope:'allies' }, duration:5, mp:8 },
  runa_de_velocidade: { id:'runa_de_velocidade', name:'Runa de Velocidade', kind:'buff', targetType:'ally', buff:{ stat:'spd', amt:3, scope:'allies' }, duration:5, mp:8 },
  selo_de_fraqueza: { id:'selo_de_fraqueza', name:'Selo de Fraqueza', kind:'buff', targetType:'enemy', buff:{ stat:'def', amt:-5, scope:'target' }, duration:4, mp:6, aoe:true },
  runa_de_cura: { id:'runa_de_cura', name:'Runa de Cura', kind:'heal', targetType:'ally', stat:'mag', power:1.1, mp:6 },
  fortaleza_runica: { id:'fortaleza_runica', name:'Fortaleza Rúnica', kind:'shield', targetType:'ally', shield:{ amount:80, scope:'allies' }, duration:3, mp:24 },
  aniquilacao_runica: { id:'aniquilacao_runica', name:'Aniquilação Rúnica', kind:'damage', targetType:'enemy', stat:'mag', power:2, mp:28, aoe:true },
  colheita_ii: { id:'colheita_ii', name:'Colheita II', kind:'damage', targetType:'enemy', stat:'mag', power:1.6, mp:8, element:'dark' },
  dreno_em_area: { id:'dreno_em_area', name:'Dreno em Área', kind:'damage', targetType:'enemy', stat:'mag', power:1, mp:14, aoe:true, element:'dark', lifesteal:0.4 },
  explosao_necrotica: { id:'explosao_necrotica', name:'Explosão Necrótica', kind:'damage', targetType:'enemy', stat:'mag', power:1.3, mp:14, aoe:true, element:'dark' },
  lanca_sombria: { id:'lanca_sombria', name:'Lança Sombria', kind:'damage', targetType:'enemy', stat:'mag', power:1.6, mp:8, element:'dark', ignoreDef:0.5 },
  ceifar: { id:'ceifar', name:'Ceifar', kind:'damage', targetType:'enemy', stat:'mag', power:2.4, mp:10, element:'dark' },
  reanimar_cavaleiro: { id:'reanimar_cavaleiro', name:'Reanimar Cavaleiro', kind:'summon', targetType:'self', minion:'knight', mp:12 },
  erguer_horda: { id:'erguer_horda', name:'Erguer Horda', kind:'summon', targetType:'self', minion:'skeleton', count:3, mp:16 },
  toque_paralisante: { id:'toque_paralisante', name:'Toque Paralisante', kind:'damage', targetType:'enemy', stat:'mag', power:0.9, mp:6, element:'dark', applies:{ status:'stun', ticks:1 } },
  sussurro_louco: { id:'sussurro_louco', name:'Sussurro Louco', kind:'ailment', targetType:'enemy', applies:{ status:'confusao', ticks:3 }, mp:7 },
  elo_sombrio: { id:'elo_sombrio', name:'Elo Sombrio', kind:'damage', targetType:'enemy', stat:'mag', power:1.2, mp:7, element:'dark', lifesteal:0.8 },
  legiao: { id:'legiao', name:'Legião', kind:'summon', targetType:'self', minion:'skeleton', count:4, mp:20 },
  apocalipse: { id:'apocalipse', name:'Apocalipse', kind:'damage', targetType:'enemy', stat:'mag', power:2.4, mp:30, aoe:true, element:'dark' },
  lentidao_em_area: { id:'lentidao_em_area', name:'Lentidão em Área', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-3, scope:'target' }, duration:3, mp:10, aoe:true },
  parar_em_area: { id:'parar_em_area', name:'Parar em Área', kind:'ailment', targetType:'enemy', applies:{ status:'imobilizar', ticks:2 }, mp:16, aoe:true },
  imobilizar: { id:'imobilizar', name:'Imobilizar', kind:'ailment', targetType:'enemy', applies:{ status:'imobilizar', ticks:2 }, mp:8 },
  freio: { id:'freio', name:'Freio', kind:'buff', targetType:'enemy', buff:{ stat:'spd', amt:-5, scope:'target' }, duration:3, mp:6 },
  acelerar_party: { id:'acelerar_party', name:'Acelerar Party', kind:'buff', targetType:'ally', buff:{ stat:'spd', amt:3, scope:'allies' }, duration:4, mp:10 },
  vanish: { id:'vanish', name:'Vanish', kind:'evasion', targetType:'ally', scope:'target', chance:0.4, duration:3, mp:8 },
  fluxo_ii: { id:'fluxo_ii', name:'Fluxo II', kind:'damage', targetType:'enemy', stat:'mag', power:1.9, mp:9, element:'time' },
  gravidade: { id:'gravidade', name:'Gravidade', kind:'damage', targetType:'enemy', stat:'mag', pctHp:0.25, mp:10 },
  refluxo: { id:'refluxo', name:'Refluxo', kind:'mana', targetType:'self', amount:35, mp:0 },
  dispersar: { id:'dispersar', name:'Dispersar', kind:'dispel', targetType:'enemy', aoe:true, mp:10 },
  colapso_temporal: { id:'colapso_temporal', name:'Colapso Temporal', kind:'ailment', targetType:'enemy', applies:{ status:'imobilizar', ticks:2 }, mp:24, aoe:true },
  fim_dos_tempos: { id:'fim_dos_tempos', name:'Fim dos Tempos', kind:'damage', targetType:'enemy', stat:'mag', power:2.4, mp:30, aoe:true, element:'time' },

  // --- CONSUMÍVEIS (ações "Usar Poção" — universais; gastam CARGAS por expedição) ---
  usar_pocao_vida:  { id:'usar_pocao_vida',  name:'Usar Poção de Vida',kind:'item',   item:'potion_hp', targetType:'ally', heal:70, mp:0 },
  usar_pocao_mana:  { id:'usar_pocao_mana',  name:'Usar Poção de Mana',kind:'item',   item:'potion_mp', targetType:'ally', restoreMp:45, mp:0 },
  usar_antidoto:    { id:'usar_antidoto',    name:'Usar Antídoto',     kind:'item',   item:'antidote',  targetType:'ally', cleanse:true, mp:0 },

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
// Variantes de invocação (Reanimar Cavaleiro / Erguer Horda / Legião).
export const MINION_DEFS = {
  skeleton: MINION_DEF,
  knight: {
    id:'skeleton_knight', name:'Cavaleiro Esquelético', sprite:'⚔️', type:'morto-vivo',
    base:{ hp:80, atk:16, def:7, mag:0, mp:0, spd:6 },
    gambits:[ { condition:'enemy_nearest', action:'basic_attack' } ],
  },
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
  // reativos/especiais (afetam o cálculo de dano; expiram por tempo)
  invuln:    { id:'invuln',    label:'Invulnerável',icon:'✨', kind:'invuln' },
  guard:     { id:'guard',     label:'Guarda',      icon:'🛡️', kind:'guard' },
  reflect:   { id:'reflect',   label:'Reflexão',    icon:'🪞', kind:'reflect' },
  vuln:      { id:'vuln',      label:'Vulnerável',  icon:'🎯', kind:'vuln' },
  critup:    { id:'critup',    label:'Foco (crít)', icon:'💥', kind:'critup' },
  evasion:   { id:'evasion',   label:'Evasão',      icon:'🌀', kind:'evasion' },
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
    skills:['basic_attack','golpe_pesado_i','golpe_pesado_ii','golpe_pesado_iii','investida','corte_amplo','perfurar','provocar','provocar_em_area','golpe_escudo','muralha_i','muralha_ii','bloqueio_total','quebra_armadura','quebra_arma','quebra_elmo','quebra_botas','brado_cura','escudo_do_companheiro','baluarte','investida_devastadora'],
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
    skills:['basic_attack','cura','cura2','cura3','cura_massiva','cura_em_area_i','cura_em_area_ii','renovar','reviver','reviver_total','curar_veneno','curar_cegueira','curar_silencio','curar_petrificacao','esuna','esuna_em_area','purificar','protecao','protecao_em_area','manto_magico','manto_em_area','regeneracao','abencoar','fe','dissipar','dissipar_em_area','confusao','holy_strike','salvacao','julgamento_divino'],
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
    skills:['basic_attack','power_shot','tiro_certeiro_ii','tiro_certeiro_iii','tiro_perfurante','tiro_multiplo_i','tiro_multiplo_ii','flecha_flamejante','flecha_gelo','flecha_trovejante','flecha_venenosa','flecha_cega','flecha_silenciadora','flecha_marca','tiro_supressor','passo_agil','mira_firme','minor_heal','flecha_restauradora','chuva_flechas','tiro_fatal'],
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
    skills:['basic_attack','chama_i','chama_ii','chama_iii','chama_area','gelo_i','gelo2','gelo_iii','gelo_em_area','raio_i','raio2','raio_iii','raio_em_area','sono','silencio','confusao','concentracao','barreira_arcana','dreno_de_mana','refresco','meteoro','flare'],
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
    skills:['basic_attack','machadada','machadada_ii','rodopio_i','rodopio_ii','investida_brutal','decapitar','furia','furia_maior','grito_guerra','pele_pedra','adrenalina','pisao','investida_trovejante','grito_selvagem','rugido_aterrador','machado_dilacerante','regeneracao_selvagem','sede_sangue','frenesi','terremoto'],
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
    skills:['basic_attack','apunhalar','apunhalar_ii','execucao','golpe_sombras','ataque_furtivo','corte_cruzado','lamina_venenosa','lamina_sangrenta','po_cegante','golpe_silenciador','golpe_debilitante','corte_nos_tendoes','fumaca','foco_assassino','minor_heal','marca_morte','mil_cortes'],
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
    skills:['basic_attack','provocar','provocar_em_area','escudo_sagrado','muralha_sagrada','aura_sagrada','heal','imposicao_maos','cura_area','purificar','holy_strike','golpe_sagrado_ii','lamina_radiante','bencao','bravura_sagrada','julgamento','intervencao_divina'],
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
    skills:['basic_attack','fireball','fogo2','fogo3','fogo_em_area','incinerar','lanca_ignea','explosao_i','explosao_ii','muralha_fogo','chama_cegante','calcinar','escudo_de_chamas','calor_interno','absorver_chama','imolacao','supernova'],
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
    skills:['basic_attack','frasco_veneno','veneno_ii','bomba_acida','frasco_corrosivo','nevoa_toxica','bomba_de_fumaca','gas_cegueira','elixir','elixir_em_area','pocao_de_mana','antidoto','antidoto_area','remedio','elixir_de_forca','elixir_ferreo','fogo_grego','frasco_explosivo','panaceia','reacao_em_cadeia'],
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
    skills:['basic_attack','estocada','danca_das_laminas_i','danca_das_laminas_ii','investida_elegante','corte_relampago','riposte','finta','provocacao_insolente','desarme','postura_de_duelo','passo_de_danca','concentracao_de_lamina','minor_heal','golpe_perfeito','valsa_mortal'],
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
    skills:['basic_attack','palma_ki','palma_de_ki_ii','rajada_de_golpes_i','rajada_de_golpes_ii','golpe_perfurante','chute_giratorio','toque_atordoante','postura_ki','postura_ferrea','foco_interior','chi_da_velocidade','meditar','toque_curativo','minor_heal','purificacao_interior','golpe_nervoso','palma_silenciadora','explosao_ki','punho_dos_cem'],
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
    skills:['basic_attack','hino_de_guerra','hino_de_guerra_ii','cancao_guarda','cancao_de_guarda_ii','balada_veloz','cantico_arcano','ode_da_regeneracao','melodia_cura','melodia_rest','requiem','dissonancia','nenia','cancao_do_sono','cancao_de_inspiracao','silencio_harmonico','grito_sonico','acorde_dissonante','sinfonia_heroica','requiem_final'],
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
    skills:['basic_attack','barreira_runica','barreira_maior','egide_runica','runa_de_espinhos','runa_de_espelho','contra_runa','runa_de_regeneracao','runa_guarda','runa_de_resistencia','runa_forca','runa_de_velocidade','selo_runico','selo_lentidao','selo_silencio','selo_de_fraqueza','provocar','provocar_em_area','runa_de_cura','explosao_runica','fortaleza_runica','aniquilacao_runica'],
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
    skills:['basic_attack','colheita','colheita_ii','toque_vampirico','dreno_em_area','explosao_necrotica','lanca_sombria','ceifar','reanimar','reanimar_cavaleiro','erguer_horda','praga','medo','maldicao','toque_paralisante','sussurro_louco','elo_sombrio','legiao','apocalipse'],
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
    skills:['basic_attack','lentidao','lentidao_em_area','parar','parar_em_area','imobilizar','freio','acelerar','acelerar_party','vanish','fluxo_temporal','fluxo_ii','distorcao','gravidade','reverter','refluxo','dispersar','colapso_temporal','fim_dos_tempos'],
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
// Densidade FFXII: além das skills, uma ESCADA de atributos em tiers (a maior parte
// da prancha do FFXII são células de HP/MP/Força/Magia). reqLevel escalona no MAX_LEVEL.
export function skillBoard(def){
  const starter = new Set(starterSkills(def));
  const nodes = []; let ci = 0;
  for(const s of def.skills){ if(starter.has(s)) continue;
    nodes.push({ type:'skill', id:`sk_${s}`, skill:s, cost:1+Math.floor(ci/2), reqLevel:Math.min(MAX_LEVEL, 2+ci) }); ci++; }
  for(const s of (CROSS_SKILLS[def.id]||[])){
    nodes.push({ type:'skill', id:`sk_${s}`, skill:s, cost:2, reqLevel:Math.min(MAX_LEVEL, 3+ci) }); ci++; }
  // ESCADA DE ATRIBUTOS — tiers por stat. amt por tier depende do stat.
  const main = mainStatOf(def);
  const STAT_TIERS = {
    hp:  { amts:[15,20,25,30,40], label:'HP'  },
    mp:  { amts:[6,8,10,12,15],   label:'MP'  },
    atk: { amts:[3,4,5,6,8],      label:'ATK' },
    mag: { amts:[3,4,5,6,8],      label:'MAG' },
    def: { amts:[2,3,4,5,6],      label:'DEF' },
    spd: { amts:[2,2,3,3,4],      label:'SPD' },
  };
  // Cada classe recebe: HP (5 tiers), MP (3), stat principal (5), + 2 secundários (3 cada).
  const secondaries = main==='mag'
    ? ['def','spd'] : main==='atk' ? ['def','hp'] : ['atk','mag'];
  const plan = [ ['hp',5], ['mp',3], [main, 5], [secondaries[0],3], [secondaries[1],3] ];
  let lvl = 2;
  for(const [stat, count] of plan){
    const t = STAT_TIERS[stat];
    for(let i=0;i<count;i++){
      nodes.push({ type:'stat', id:`aug_${stat}_${i}`, stat, amt:t.amts[i],
        cost:1+Math.floor(i/2), reqLevel:Math.min(MAX_LEVEL, lvl) });
      lvl += 1;
    }
  }
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

// --- CONSUMÍVEIS: comprar LIBERA o uso (sem equipar). Cargas recarregam por expedição.
// owned: S.consumables[key] = nível (1+). chargesPerRun = baseCharges + (nível-1).
export const CONSUMABLES = {
  potion_hp: { id:'potion_hp', name:'Poção de Vida',  icon:'❤️', use:'usar_pocao_vida', desc:'Cura ~70 HP de um aliado.', baseCharges:2, cost:{ gold:120 },           upgrade:{ gold:220, crystals:2 } },
  potion_mp: { id:'potion_mp', name:'Poção de Mana',  icon:'💧', use:'usar_pocao_mana', desc:'Restaura ~45 MP de um aliado.', baseCharges:2, cost:{ gold:120 },        upgrade:{ gold:220, crystals:2 } },
  antidote:  { id:'antidote',  name:'Antídoto',       icon:'🧪', use:'usar_antidoto',  desc:'Remove status ruins de um aliado.', baseCharges:2, cost:{ gold:80 },       upgrade:{ gold:160, crystals:1 } },
};
export const consumableCharges = (key, level) => level > 0 ? ((CONSUMABLES[key]?.baseCharges || 2) + (level - 1)) : 0;

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
