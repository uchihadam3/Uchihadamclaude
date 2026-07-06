// RuneFaces: 180 Faces Rúnicas (6 categorias x 30) que substituem lados de
// dado durante a run. Mesmo DSL de efeitos das faces dos heróis.
(function () {
  var N = function (pt, en) { return { pt: pt, en: en }; };
  function F(id, cat, name, sym, val, tgt, fx, o) {
    var f = { id: id, cat: cat, name: name, sym: sym, val: val, tgt: tgt, fx: fx };
    if (o) Object.keys(o).forEach(function (k) { f[k] = o[k]; });
    return f;
  }

  var L = [];
  // ============ 30 ATAQUE ============
  L.push(
    F('laminaSerrilhada', 'ataque', N('Lâmina Serrilhada', 'Serrated Blade'), 'sword', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'bleed', n: 1 }]),
    F('marteloPesado', 'ataque', N('Martelo Pesado', 'Heavy Hammer'), 'sword', 4, 'enemy', [{ k: 'dmg' }], { slowSide: true }),
    F('adagaVeloz', 'ataque', N('Adaga Veloz', 'Swift Dagger'), 'sword', 1, 'enemy', [{ k: 'dmg', times: 2 }]),
    F('corteCego', 'ataque', N('Corte Cego', 'Blind Cut'), 'sword', 5, 'enemy', [{ k: 'dmg', missChance: 0.25 }]),
    F('lancaLonga', 'ataque', N('Lança Longa', 'Long Spear'), 'sword', 3, 'enemy', [{ k: 'dmg', anyRow: true }]),
    F('golpePerfurante', 'ataque', N('Golpe Perfurante', 'Piercing Blow'), 'sword', 2, 'enemy', [{ k: 'dmg', ignoreShield: true }]),
    F('machadoVoraz', 'ataque', N('Machado Voraz', 'Ravenous Axe'), 'sword', 3, 'enemy', [{ k: 'dmg', healOnKill: 1 }]),
    F('espadaRunica', 'ataque', N('Espada Rúnica', 'Runic Sword'), 'sword', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'charge', n: 1, who: 'self' }]),
    F('facaVenenosa', 'ataque', N('Faca Venenosa', 'Venom Knife'), 'sword', 1, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'poison', n: 2 }]),
    F('golpeFinal', 'ataque', N('Golpe Final', 'Final Blow'), 'sword', 6, 'enemy', [{ k: 'dmg', onlyHalfHp: true }], { rare: true }),
    F('puncoDuplo', 'ataque', N('Punho Duplo', 'Twin Fist'), 'sword', 2, 'enemy', [{ k: 'dmg', times: 2 }], { rare: true }),
    F('flechaFria', 'ataque', N('Flecha Fria', 'Cold Arrow'), 'sword', 2, 'enemy', [{ k: 'dmg', anyRow: true }, { k: 'st', s: 'freeze', n: 1 }]),
    F('giroAmplo', 'ataque', N('Giro Amplo', 'Wide Sweep'), 'sword', 1, 'allE', [{ k: 'dmg' }]),
    F('espetoCurto', 'ataque', N('Espeto Curto', 'Short Spike'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
    F('cutiladaAlta', 'ataque', N('Cutilada Alta', 'High Slash'), 'sword', 4, 'enemy', [{ k: 'dmg' }, { k: 'selfDmg', n: 1 }]),
    F('mordidaFerro', 'ataque', N('Mordida de Ferro', 'Iron Bite'), 'sword', 3, 'enemy', [{ k: 'dmg', plusIfShieldedSelf: 1 }]),
    F('arremessoFaca', 'ataque', N('Arremesso de Faca', 'Knife Throw'), 'bolt', 2, 'enemy', [{ k: 'dmg', anyRow: true }]),
    F('golpeCego', 'ataque', N('Golpe do Caolho', 'One-Eye Blow'), 'eye', 3, 'enemy', [{ k: 'dmg', plusIfMarked: 2 }]),
    F('marteloEco', 'ataque', N('Martelo do Eco', 'Echo Hammer'), 'sword', 2, 'enemy', [{ k: 'dmg', repeatIfKill: true }]),
    F('laminaLunar', 'ataque', N('Lâmina Lunar', 'Moon Blade'), 'sword', 3, 'enemy', [{ k: 'dmg', magic: true }]),
    F('picareta', 'ataque', N('Picareta', 'Pickaxe'), 'sword', 2, 'enemy', [{ k: 'breakShield', n: 2 }, { k: 'dmg' }]),
    F('chicoteEspinho', 'ataque', N('Chicote de Espinhos', 'Thorn Whip'), 'drop', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'bleed', n: 1 }]),
    F('soqueiraBruta', 'ataque', N('Soqueira Bruta', 'Brute Knuckle'), 'sword', 3, 'enemy', [{ k: 'dmg', plusIfFront: 1 }]),
    F('dardoSonso', 'ataque', N('Dardo Sonso', 'Sly Dart'), 'sword', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'weak', n: 1 }]),
    F('quebraOsso', 'ataque', N('Quebra-Osso', 'Bone Breaker'), 'sword', 4, 'enemy', [{ k: 'dmg', plusVsUndead: 2 }]),
    F('laminaGemea', 'ataque', N('Lâmina Gêmea', 'Twin Blade'), 'sword', 2, 'enemy', [{ k: 'dmg', copyNextAtk: true }], { rare: true }),
    F('estocadaFinal', 'ataque', N('Estocada Final', 'Last Thrust'), 'sword', 8, 'enemy', [{ k: 'dmg', onlyIfSelfHp1: true }], { rare: true }),
    F('garraSelvagem', 'ataque', N('Garra Selvagem', 'Wild Claw'), 'sword', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'vulnerable', n: 1 }]),
    F('tacapeRude', 'ataque', N('Tacape Rude', 'Crude Club'), 'sword', 5, 'enemy', [{ k: 'dmg', missChance: 0.15 }]),
    F('sabreOficial', 'ataque', N('Sabre Oficial', 'Officer Saber'), 'sword', 3, 'enemy', [{ k: 'dmg', plusPerAllyActed: 0 }], { rare: true })
  );
  // ============ 30 DEFESA ============
  L.push(
    F('escudoFerro', 'defesa', N('Escudo de Ferro', 'Iron Shield'), 'shield', 4, 'self', [{ k: 'shield' }]),
    F('escudoEspelhado', 'defesa', N('Escudo Espelhado', 'Mirror Shield'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 1 }]),
    F('guardaAlta', 'defesa', N('Guarda Alta', 'High Guard'), 'shield', 2, 'self', [{ k: 'st', s: 'barrier' }]),
    F('paredeViva', 'defesa', N('Parede Viva', 'Living Wall'), 'shield', 1, 'allA', [{ k: 'shield', who: 'allA' }]),
    F('cascoPedra', 'defesa', N('Casco de Pedra', 'Stone Shell'), 'shield', 5, 'self', [{ k: 'shield' }, { k: 'st', s: 'slow', who: 'self', n: 1 }]),
    F('defesaAgil', 'defesa', N('Defesa Ágil', 'Agile Guard'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'dodge' }]),
    F('posturaFirme', 'defesa', N('Postura Firme', 'Firm Stance'), 'shield', 3, 'self', [{ k: 'shield' }]),
    F('escudoSanto', 'defesa', N('Escudo Santo', 'Holy Shield'), 'shield', 2, 'ally', [{ k: 'shield' }, { k: 'cleanse', n: 1 }]),
    F('armaduraTrincada', 'defesa', N('Armadura Trincada', 'Cracked Armor'), 'shield', 6, 'self', [{ k: 'shield' }], { uses: 3 }),
    F('guardaCompartilhada', 'defesa', N('Guarda Compartilhada', 'Shared Guard'), 'shield', 2, 'allA', [{ k: 'shield', who: 'two' }]),
    F('broquelRapido', 'defesa', N('Broquel Rápido', 'Quick Buckler'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'inspire', n: 1 }]),
    F('murodEspinhos', 'defesa', N('Muro de Espinhos', 'Thorn Wall'), 'shield', 3, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 2 }], { rare: true }),
    F('escudoTorre', 'defesa', N('Escudo-Torre', 'Tower Shield'), 'shield', 4, 'ally', [{ k: 'shield' }]),
    F('mantoPedra', 'defesa', N('Manto de Pedra', 'Stone Mantle'), 'shield', 3, 'ally', [{ k: 'st', s: 'barrier' }], { rare: true }),
    F('guardaProvocante', 'defesa', N('Guarda Provocante', 'Taunting Guard'), 'chain', 3, 'self', [{ k: 'shield' }, { k: 'taunt' }]),
    F('placaAdaptavel', 'defesa', N('Placa Adaptável', 'Adaptive Plate'), 'shield', 2, 'self', [{ k: 'shieldPerEnemy' }]),
    F('cascaArvore', 'defesa', N('Casca de Árvore', 'Tree Bark'), 'shield', 3, 'self', [{ k: 'shield' }, { k: 'st', s: 'regen', n: 1 }]),
    F('escudoGelido', 'defesa', N('Escudo Gélido', 'Frigid Shield'), 'shield', 3, 'self', [{ k: 'shield' }, { k: 'freezeAttacker' }]),
    F('veuVento', 'defesa', N('Véu de Vento', 'Wind Veil'), 'shield', 0, 'ally', [{ k: 'st', s: 'dodge' }]),
    F('anteparoLeve', 'defesa', N('Anteparo Leve', 'Light Screen'), 'shield', 2, 'ally', [{ k: 'shield' }]),
    F('bastiao', 'defesa', N('Bastião', 'Bastion'), 'shield', 1, 'allA', [{ k: 'st', s: 'barrier', who: 'allA', n: 1 }], { rare: true }),
    F('escamaDraconica', 'defesa', N('Escama Dracônica', 'Dragon Scale'), 'shield', 4, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 1 }], { rare: true }),
    F('redoma', 'defesa', N('Redoma', 'Dome'), 'shield', 3, 'ally', [{ k: 'shield' }, { k: 'protect' }]),
    F('couroBatido', 'defesa', N('Couro Batido', 'Beaten Leather'), 'shield', 3, 'self', [{ k: 'shield' }]),
    F('ferroFundido', 'defesa', N('Ferro Fundido', 'Cast Iron'), 'shield', 5, 'ally', [{ k: 'shield' }], { uses: 4 }),
    F('espelhoDagua', "defesa", N("Espelho d'Água", 'Water Mirror'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'reflectDebuff' }]),
    F('coleteRemendado', 'defesa', N('Colete Remendado', 'Patched Vest'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'healSelf', n: 1 }]),
    F('capuzSombra', 'defesa', N('Capuz da Sombra', 'Shadow Hood'), 'shield', 1, 'self', [{ k: 'shield' }, { k: 'st', s: 'camo' }]),
    F('baluarte', 'defesa', N('Baluarte', 'Bulwark'), 'shield', 2, 'allA', [{ k: 'shield', who: 'front' }], { rare: true }),
    F('juramentoAco', 'defesa', N('Juramento de Aço', 'Steel Oath'), 'shield', 3, 'ally', [{ k: 'shield' }, { k: 'shield', who: 'self', n: 1 }])
  );
  // ============ 30 CURA ============
  L.push(
    F('curaMenor', 'cura', N('Cura Menor', 'Minor Heal'), 'heart', 2, 'ally', [{ k: 'heal' }]),
    F('curaForte', 'cura', N('Cura Forte', 'Strong Heal'), 'heart', 4, 'ally', [{ k: 'heal' }]),
    F('regeneracaoR', 'cura', N('Regeneração', 'Regeneration'), 'heart', 2, 'ally', [{ k: 'st', s: 'regen' }]),
    F('curaGrupo', 'cura', N('Cura em Grupo', 'Group Heal'), 'heart', 1, 'allA', [{ k: 'heal', who: 'allA' }]),
    F('reviverR', 'cura', N('Reviver', 'Revive'), 'heart', 1, 'downed', [{ k: 'revive', hp: 1 }], { rare: true }),
    F('purificarR', 'cura', N('Purificar', 'Purify'), 'star', 0, 'ally', [{ k: 'cleanse', n: 2 }]),
    F('sutura', 'cura', N('Sutura', 'Suture'), 'heart', 2, 'ally', [{ k: 'heal' }, { k: 'cleanseTypes', types: ['bleed'] }]),
    F('antidotoR', 'cura', N('Antídoto', 'Antidote'), 'heart', 1, 'ally', [{ k: 'heal' }, { k: 'cleanseTypes', types: ['poison'] }]),
    F('luzMorna', 'cura', N('Luz Morna', 'Warm Light'), 'heart', 2, 'ally', [{ k: 'heal' }, { k: 'shield', n: 1 }]),
    F('curaArriscada', 'cura', N('Cura Arriscada', 'Risky Heal'), 'heart', 5, 'ally', [{ k: 'heal' }, { k: 'st', s: 'weak', n: 1 }]),
    F('bencaoBreve', 'cura', N('Bênção Breve', 'Brief Blessing'), 'heart', 1, 'ally', [{ k: 'heal' }, { k: 'st', s: 'inspire', n: 1 }]),
    F('seiva', 'cura', N('Seiva', 'Sap'), 'drop', 2, 'ally', [{ k: 'st', s: 'regen' }], { rare: true }),
    F('aguaBenta', 'cura', N('Água Benta', 'Holy Water'), 'heart', 3, 'ally', [{ k: 'heal' }, { k: 'plusVsUndeadNext' }]),
    F('toqueVital', 'cura', N('Toque Vital', 'Vital Touch'), 'heart', 3, 'ally', [{ k: 'heal', potion: false }]),
    F('remendo', 'cura', N('Remendo', 'Patch Up'), 'heart', 2, 'self', [{ k: 'healSelf', n: 2 }]),
    F('essenciaFada', 'cura', N('Essência de Fada', 'Fairy Essence'), 'heart', 2, 'ally', [{ k: 'heal' }, { k: 'st', s: 'dodge' }], { rare: true }),
    F('cantoAlvorada', 'cura', N('Canto da Alvorada', 'Dawn Song'), 'heart', 2, 'allA', [{ k: 'healLowest', n: 2 }]),
    F('poçaoRustica', 'cura', N('Poção Rústica', 'Rustic Potion'), 'heart', 3, 'ally', [{ k: 'heal', potion: true }]),
    F('vinhoQuente', 'cura', N('Vinho Quente', 'Hot Wine'), 'heart', 2, 'ally', [{ k: 'heal' }, { k: 'cleanseTypes', types: ['freeze'] }]),
    F('oracao', 'cura', N('Oração', 'Prayer'), 'heart', 1, 'allA', [{ k: 'heal', who: 'allA' }, { k: 'cleanse', n: 1 }], { rare: true }),
    F('fioVida', 'cura', N('Fio da Vida', 'Life Thread'), 'heart', 2, 'downed', [{ k: 'revive', hp: 2 }], { rare: true, uses: 2 }),
    F('balsamo', 'cura', N('Bálsamo', 'Balm'), 'heart', 2, 'ally', [{ k: 'heal' }, { k: 'st', s: 'regen', n: 1 }]),
    F('lagrimaLua', 'cura', N('Lágrima da Lua', 'Moon Tear'), 'heart', 4, 'ally', [{ k: 'heal', magic: true }]),
    F('chaCampo', 'cura', N('Chá do Campo', 'Field Tea'), 'heart', 2, 'ally', [{ k: 'heal', potion: true }, { k: 'cleanse', n: 1 }]),
    F('transfusao', 'cura', N('Transfusão', 'Transfusion'), 'heart', 3, 'ally', [{ k: 'heal' }, { k: 'selfDmg', n: 1 }]),
    F('abracoUrso', 'cura', N('Abraço de Urso', 'Bear Hug'), 'heart', 2, 'ally', [{ k: 'heal' }, { k: 'shield', n: 2 }], { rare: true }),
    F('nectarDoce', 'cura', N('Néctar Doce', 'Sweet Nectar'), 'heart', 1, 'ally', [{ k: 'heal' }, { k: 'st', s: 'charge', n: 1 }]),
    F('brotoNovo', 'cura', N('Broto Novo', 'New Sprout'), 'heart', 1, 'ally', [{ k: 'st', s: 'regen', n: 2 }]),
    F('solInterior', 'cura', N('Sol Interior', 'Inner Sun'), 'heart', 3, 'self', [{ k: 'healSelf', n: 3 }], { uses: 4 }),
    F('maoCurandeira', 'cura', N('Mão Curandeira', 'Healing Hand'), 'heart', 3, 'ally', [{ k: 'heal' }, { k: 'firstHealBonus' }])
  );
  // ============ 30 MAGIA ============
  L.push(
    F('bolaFogo', 'magia', N('Bola de Fogo', 'Fireball'), 'flame', 3, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'burn', n: 1 }]),
    F('raioR', 'magia', N('Raio', 'Lightning'), 'bolt', 3, 'enemy', [{ k: 'dmg', magic: true, chainTo: 1 }]),
    F('geloR', 'magia', N('Gelo', 'Ice'), 'flame', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'freeze', n: 1 }]),
    F('drenoR', 'magia', N('Dreno', 'Drain'), 'skull', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'healSelf', n: 1 }]),
    F('explosaoR', 'magia', N('Explosão', 'Explosion'), 'flame', 2, 'allE', [{ k: 'dmg', magic: true }]),
    F('manaPura', 'magia', N('Mana Pura', 'Pure Mana'), 'star', 3, 'self', [{ k: 'st', s: 'charge' }]),
    F('estrelaArcana', 'magia', N('Estrela Arcana', 'Arcane Star'), 'star', 2, 'ally', [{ k: 'st', s: 'inspire', n: 2 }]),
    F('silencioR', 'magia', N('Silêncio', 'Silence'), 'eye', 1, 'enemy', [{ k: 'st', s: 'silence' }]),
    F('fendaR', 'magia', N('Fenda', 'Rift'), 'eye', 2, 'enemy', [{ k: 'st', s: 'vulnerable' }]),
    F('ecoR', 'magia', N('Eco', 'Echo'), 'star', 0, 'none', [{ k: 'copyLastMagic', minus: 1 }], { rare: true }),
    F('chuvaMeteoros', 'magia', N('Chuva de Meteoros', 'Meteor Rain'), 'flame', 3, 'allE', [{ k: 'dmg', magic: true }], { uses: 3, rare: true }),
    F('lançaGelo', 'magia', N('Lança de Gelo', 'Ice Lance'), 'flame', 4, 'enemy', [{ k: 'dmg', magic: true, plusIfFrozen: 2 }]),
    F('teia', 'magia', N('Teia Arcana', 'Arcane Web'), 'chain', 1, 'enemy', [{ k: 'st', s: 'chained' }, { k: 'st', s: 'weak', n: 1 }]),
    F('faiscaViva', 'magia', N('Faísca Viva', 'Living Spark'), 'bolt', 2, 'enemy', [{ k: 'dmg', magic: true }]),
    F('nevoaDensa', 'magia', N('Névoa Densa', 'Dense Mist'), 'eye', 1, 'allE', [{ k: 'st', s: 'blind', who: 'allE' }], { rare: true }),
    F('espiralVento', 'magia', N('Espiral de Vento', 'Wind Spiral'), 'bolt', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'delayIntent', n: 1 }]),
    F('brasaAzul', 'magia', N('Brasa Azul', 'Blue Ember'), 'flame', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'burn', n: 2 }], { rare: true }),
    F('olharProfundo', 'magia', N('Olhar Profundo', 'Deep Gaze'), 'eye', 0, 'enemy', [{ k: 'st', s: 'mark' }, { k: 'st', s: 'vulnerable', n: 1 }]),
    F('toqueGelado', 'magia', N('Toque Gelado', 'Frigid Touch'), 'flame', 1, 'enemy', [{ k: 'st', s: 'freeze', n: 2 }]),
    F('runaExplosiva', 'magia', N('Runa Explosiva', 'Blast Rune'), 'flame', 4, 'enemy', [{ k: 'dmg', magic: true }], { uses: 4 }),
    F('prismaLuz', 'magia', N('Prisma de Luz', 'Light Prism'), 'star', 2, 'allE', [{ k: 'dmg', magic: true, plusVsUndead: 1 }]),
    F('soproAbissal', 'magia', N('Sopro Abissal', 'Abyssal Breath'), 'skull', 2, 'allE', [{ k: 'dmg', magic: true }, { k: 'selfDmg', n: 1 }], { rare: true }),
    F('conjurarEscudo', 'magia', N('Conjurar Escudo', 'Conjure Shield'), 'shield', 3, 'ally', [{ k: 'shield', magic: true }]),
    F('roubarFolego', 'magia', N('Roubar Fôlego', 'Steal Breath'), 'skull', 1, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'weak', n: 1 }, { k: 'healSelf', n: 1 }]),
    F('cometaMenor', 'magia', N('Cometa Menor', 'Lesser Comet'), 'star', 5, 'enemy', [{ k: 'dmg', magic: true }], { uses: 3, rare: true }),
    F('vinculoArcano', 'magia', N('Vínculo Arcano', 'Arcane Bond'), 'star', 0, 'ally', [{ k: 'linkDice' }], { rare: true }),
    F('reversoMistico', 'magia', N('Reverso Místico', 'Mystic Reverse'), 'hour', 0, 'enemy', [{ k: 'twistIntent' }]),
    F('tempestadeMental', 'magia', N('Tempestade Mental', 'Mind Storm'), 'eye', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'fear', n: 1 }]),
    F('chamaFatua', 'magia', N('Chama Fátua', 'Wisp Flame'), 'flame', 2, 'enemy', [{ k: 'dmg', magic: true, ignoreShield: true }], { rare: true }),
    F('petrificar', 'magia', N('Petrificar', 'Petrify'), 'eye', 0, 'enemy', [{ k: 'stunIfNoShield' }], { uses: 3, rare: true })
  );
  // ============ 30 SUPORTE ============
  L.push(
    F('inspirarR', 'suporte', N('Inspirar', 'Inspire'), 'star', 1, 'ally', [{ k: 'st', s: 'inspire' }]),
    F('rerrolagemR', 'suporte', N('Rerrolagem', 'Reroll'), 'hour', 0, 'ally', [{ k: 'rerollAlly' }]),
    F('copiarR', 'suporte', N('Copiar', 'Copy'), 'star', 0, 'none', [{ k: 'copyLast', minus: 0 }], { rare: true }),
    F('ordemR', 'suporte', N('Ordem', 'Command'), 'star', 0, 'ally', [{ k: 'commandRepeat', minus: 1 }]),
    F('trocaR', 'suporte', N('Troca', 'Swap'), 'hour', 0, 'none', [{ k: 'swapDice' }]),
    F('previsaoR', 'suporte', N('Previsão', 'Foresight'), 'eye', 0, 'self', [{ k: 'st', s: 'inspire', n: 1 }]),
    F('reposicaoR', 'suporte', N('Reposição', 'Reposition'), 'hour', 0, 'none', [{ k: 'swapRows' }]),
    F('marcarR', 'suporte', N('Marcar', 'Mark'), 'eye', 0, 'enemy', [{ k: 'st', s: 'mark' }]),
    F('focoR', 'suporte', N('Foco', 'Focus'), 'star', 0, 'ally', [{ k: 'st', s: 'focus' }]),
    F('sorteR', 'suporte', N('Sorte', 'Luck'), 'coin', 0, 'self', [{ k: 'luckKillReroll' }]),
    F('gritoGuerra', 'suporte', N('Grito de Guerra', 'War Cry'), 'star', 1, 'allA', [{ k: 'buffAttacks', n: 1 }], { rare: true }),
    F('passoLigeiro', 'suporte', N('Passo Ligeiro', 'Quick Step'), 'bolt', 0, 'ally', [{ k: 'st', s: 'dodge' }]),
    F('moedaJogada', 'suporte', N('Moeda Jogada', 'Coin Flip'), 'coin', 2, 'self', [{ k: 'coin' }]),
    F('planejar', 'suporte', N('Planejar', 'Plan Ahead'), 'hour', 0, 'ally', [{ k: 'storeDie' }]),
    F('provocacao', 'suporte', N('Provocação', 'Provoke'), 'chain', 1, 'enemy', [{ k: 'taunt' }, { k: 'shield', who: 'self' }]),
    F('cantoCalmo', 'suporte', N('Canto Calmo', 'Calm Chant'), 'heart', 1, 'ally', [{ k: 'heal' }, { k: 'st', s: 'inspire', n: 1 }]),
    F('visaoAlem', 'suporte', N('Visão Além', 'Sight Beyond'), 'eye', 0, 'none', [{ k: 'peekIntents' }]),
    F('empurraoTatico', 'suporte', N('Empurrão Tático', 'Tactical Shove'), 'chain', 1, 'enemy', [{ k: 'delayIntent', n: 1 }]),
    F('bandeiraViva', 'suporte', N('Bandeira Viva', 'Living Banner'), 'star', 1, 'allA', [{ k: 'st', s: 'inspire', who: 'front' }], { rare: true }),
    F('redistribuir', 'suporte', N('Redistribuir', 'Redistribute'), 'hour', 0, 'none', [{ k: 'moveShield' }]),
    F('conselhoSabio', 'suporte', N('Conselho Sábio', 'Wise Counsel'), 'star', 0, 'ally', [{ k: 'rerollAlly' }, { k: 'st', s: 'inspire', n: 1 }], { rare: true }),
    F('apostaDupla', 'suporte', N('Aposta Dupla', 'Double Bet'), 'coin', 0, 'self', [{ k: 'doubleOrNothing' }], { rare: true }),
    F('sinalSecreto', 'suporte', N('Sinal Secreto', 'Secret Sign'), 'eye', 0, 'ally', [{ k: 'st', s: 'camo' }]),
    F('tocarAvante', 'suporte', N('Tocar Avante', 'March On'), 'star', 0, 'ally', [{ k: 'commandRepeat', minus: 2 }]),
    F('escoltar', 'suporte', N('Escoltar', 'Escort'), 'shield', 0, 'ally', [{ k: 'protect' }]),
    F('balancaJusta', 'suporte', N('Balança Justa', 'Fair Scale'), 'hour', 0, 'none', [{ k: 'equalizeDice' }], { rare: true }),
    F('chamadoCoragem', 'suporte', N('Chamado da Coragem', 'Courage Call'), 'star', 1, 'downed', [{ k: 'revive', hp: 1 }], { uses: 2, rare: true }),
    F('maré', 'suporte', N('Maré de Sorte', 'Luck Tide'), 'coin', 0, 'self', [{ k: 'extraRollThisTurn' }], { uses: 3 }),
    F('ecoOrdens', 'suporte', N('Eco de Ordens', 'Echoed Orders'), 'star', 0, 'ally', [{ k: 'st', s: 'inspire' }, { k: 'st', s: 'focus' }], { rare: true }),
    F('trocaJusta', 'suporte', N('Troca Justa', 'Fair Trade'), 'coin', 1, 'self', [{ k: 'coin' }, { k: 'st', s: 'inspire', n: 1 }])
  );
  // ============ 30 SOMBRIAS ============
  L.push(
    F('maldicaoS', 'sombria', N('Maldição', 'Curse'), 'skull', 2, 'enemy', [{ k: 'st', s: 'curse' }]),
    F('pactoS', 'sombria', N('Pacto', 'Pact'), 'skull', 4, 'enemy', [{ k: 'dmg' }, { k: 'selfDmg', n: 2 }]),
    F('caveiraViva', 'sombria', N('Caveira Viva', 'Living Skull'), 'skull', 3, 'enemy', [{ k: 'dmg' }], { uses: 3 }),
    F('drenoSombrio', 'sombria', N('Dreno Sombrio', 'Dark Drain'), 'skull', 3, 'enemy', [{ k: 'dmg', magic: true }, { k: 'healSelf', n: 1 }]),
    F('sacrificioS', 'sombria', N('Sacrifício', 'Sacrifice'), 'skull', 6, 'enemy', [{ k: 'sacrificeSummon', dmg: 6 }], { rare: true }),
    F('venenoProfundo', 'sombria', N('Veneno Profundo', 'Deep Venom'), 'drop', 4, 'enemy', [{ k: 'st', s: 'poison' }], { rare: true }),
    F('medoS', 'sombria', N('Medo', 'Dread'), 'eye', 1, 'enemy', [{ k: 'st', s: 'fear' }, { k: 'st', s: 'weak', n: 1 }]),
    F('seloNegro', 'sombria', N('Selo Negro', 'Black Seal'), 'skull', 0, 'enemy', [{ k: 'blockEnemyDie' }], { rare: true }),
    F('praga', 'sombria', N('Praga', 'Plague'), 'drop', 1, 'allE', [{ k: 'st', s: 'poison', who: 'allE' }]),
    F('ultimoSuspiro', 'sombria', N('Último Suspiro', 'Last Breath'), 'skull', 8, 'enemy', [{ k: 'dmg', onlyIfSelfHp1: true }], { rare: true }),
    F('garraNoite', 'sombria', N('Garra da Noite', 'Night Claw'), 'skull', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'blind', n: 1 }]),
    F('correnteAlma', 'sombria', N('Corrente de Alma', 'Soul Chain'), 'chain', 2, 'enemy', [{ k: 'st', s: 'chained' }, { k: 'st', s: 'curse', n: 1 }]),
    F('espinhoNegro', 'sombria', N('Espinho Negro', 'Black Thorn'), 'skull', 1, 'enemy', [{ k: 'dmg', ignoreShield: true }, { k: 'st', s: 'bleed', n: 2 }]),
    F('olharVazio', 'sombria', N('Olhar Vazio', 'Empty Gaze'), 'eye', 2, 'enemy', [{ k: 'st', s: 'fear' }, { k: 'st', s: 'silence', n: 1 }], { rare: true }),
    F('mareMorta', 'sombria', N('Maré Morta', 'Dead Tide'), 'skull', 1, 'allE', [{ k: 'st', s: 'curse', who: 'allE', n: 1 }], { rare: true, uses: 3 }),
    F('sedeSangue', 'sombria', N('Sede de Sangue', 'Blood Thirst'), 'drop', 3, 'enemy', [{ k: 'dmg' }, { k: 'healSelfIfBleeding', n: 2 }]),
    F('sussurroRuim', 'sombria', N('Sussurro Ruim', 'Ill Whisper'), 'eye', 0, 'enemy', [{ k: 'twistIntent' }, { k: 'st', s: 'fear', n: 1 }]),
    F('tributoNegro', 'sombria', N('Tributo Negro', 'Black Tribute'), 'coin', 3, 'self', [{ k: 'coin' }, { k: 'selfDmg', n: 1 }]),
    F('facaSuja', 'sombria', N('Faca Suja', 'Dirty Knife'), 'sword', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'poison', n: 1 }, { k: 'st', s: 'bleed', n: 1 }], { rare: true }),
    F('abracoTrevas', 'sombria', N('Abraço das Trevas', 'Dark Embrace'), 'skull', 0, 'ally', [{ k: 'shield', n: 3 }, { k: 'st', s: 'curse', n: 1, who: 'target' }]),
    F('vozAbismo', 'sombria', N('Voz do Abismo', 'Abyss Voice'), 'skull', 2, 'allE', [{ k: 'st', s: 'fear', who: 'allE', n: 1 }], { uses: 3 }),
    F('ferraoGelado', 'sombria', N('Ferrão Gelado', 'Cold Sting'), 'skull', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'freeze', n: 1 }]),
    F('nozVazia', 'sombria', N('Noz Vazia', 'Hollow Nut'), 'skull', 5, 'enemy', [{ k: 'dmg', missChance: 0.3 }]),
    F('cinzasCinzas', 'sombria', N('Cinzas às Cinzas', 'Ashes to Ashes'), 'flame', 2, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'burn', n: 1 }, { k: 'st', s: 'curse', n: 1 }], { rare: true }),
    F('inversaoVital', 'sombria', N('Inversão Vital', 'Vital Inversion'), 'skull', 0, 'enemy', [{ k: 'swapHpPercent' }], { uses: 1, rare: true }),
    F('dividaSangue', 'sombria', N('Dívida de Sangue', 'Blood Debt'), 'drop', 4, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'bleed', n: 1, who: 'self' }]),
    F('coroaEspinhos', 'sombria', N('Coroa de Espinhos', 'Crown of Thorns'), 'skull', 3, 'self', [{ k: 'st', s: 'counter', n: 3 }, { k: 'selfDmg', n: 1 }]),
    F('chamadoVazio', 'sombria', N('Chamado do Vazio', 'Void Call'), 'skull', 0, 'none', [{ k: 'summon', id: 'esqueletoAliado' }, { k: 'st', s: 'curse', n: 1, who: 'self' }]),
    F('velaNegra', 'sombria', N('Vela Negra', 'Black Candle'), 'skull', 1, 'enemy', [{ k: 'st', s: 'curse' }, { k: 'st', s: 'vulnerable', n: 1 }]),
    F('pesadelo', 'sombria', N('Pesadelo', 'Nightmare'), 'eye', 3, 'enemy', [{ k: 'dmg', magic: true, plusIfFear: 2 }], { rare: true })
  );

  var byId = {};
  L.forEach(function (f) { byId[f.id] = f; });

  RA.data.RuneFaces = {
    list: L, byId: byId,
    byCat: function (cat) { return L.filter(function (f) { return f.cat === cat; }); },
    roll: function (rng, n, opts) {
      opts = opts || {};
      var pool = L.filter(function (f) {
        if (opts.cat && f.cat !== opts.cat) return false;
        return true;
      });
      var out = [];
      var shuffled = rng.shuffle(pool);
      for (var i = 0; i < Math.min(n, shuffled.length); i++) out.push(shuffled[i]);
      return out;
    }
  };
})();
