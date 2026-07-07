// Heroes: os 30 heróis jogáveis — dado (6 lados), passiva, HP, visual.
// DSL das faces: sym, val, tgt('enemy','ally','self','allE','allA','downed','none'),
// fx = lista de efeitos executados pelo Combat.
(function () {
  function F(name, sym, val, tgt, fx, o) {
    var f = { name: name, sym: sym, val: val, tgt: tgt, fx: fx };
    if (o) Object.keys(o).forEach(function (k) { f[k] = o[k]; });
    return f;
  }
  var N = function (pt, en) { return { pt: pt, en: en }; };

  var HEROES = [
    {
      id: 'guardiao', name: N('Guardião', 'Guardian'), hp: 12, skin: 'cinza',
      passive: { id: 'firstShieldPlus1', txt: N('O primeiro escudo recebido por turno ganha +1.', 'First shield received each turn gets +1.') },
      look: { skin: 'medio', hair: 'careca', headgear: 'elmo', eyes: 'normal', cloth: '#5a6478', armor: true, bg: '#1c2030' },
      faces: [
        F(N('Golpe', 'Strike'), 'sword', 2, 'enemy', [{ k: 'dmg' }]),
        F(N('Golpe', 'Strike'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Escudo', 'Shield'), 'shield', 3, 'self', [{ k: 'shield' }]),
        F(N('Provocar', 'Taunt'), 'chain', 2, 'enemy', [{ k: 'taunt' }, { k: 'shield', who: 'self' }]),
        F(N('Contra-ataque', 'Counter'), 'shield', 2, 'self', [{ k: 'st', s: 'counter' }]),
        F(N('Muralha', 'Bulwark'), 'shield', 2, 'allA', [{ k: 'shield', who: 'two' }])
      ]
    },
    {
      id: 'espadachim', name: N('Espadachim', 'Swordsman'), hp: 10, skin: 'vermelho',
      passive: { id: 'samePlusOne', txt: N('Atacar o mesmo alvo 2x seguidas: o 2º ataque ganha +1.', 'Attack same target twice: 2nd attack +1.') },
      look: { skin: 'claro', hair: 'curto', hairColor: '#38304a', eyes: 'normal', scar: true, cloth: '#8a2432', bg: '#241418' },
      faces: [
        F(N('Corte', 'Cut'), 'sword', 2, 'enemy', [{ k: 'dmg' }]),
        F(N('Corte', 'Cut'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Estocada', 'Thrust'), 'sword', 4, 'enemy', [{ k: 'dmg' }]),
        F(N('Ataque Rápido', 'Quick Strike'), 'bolt', 1, 'enemy', [{ k: 'dmg', times: 2 }]),
        F(N('Foco', 'Focus'), 'star', 0, 'self', [{ k: 'st', s: 'focus' }]),
        F(N('Finalização', 'Finisher'), 'sword', 5, 'enemy', [{ k: 'dmg', onlyHalfHp: true }], { rare: true })
      ]
    },
    {
      id: 'escudeira', name: N('Escudeira', 'Shieldmaiden'), hp: 13, skin: 'cinza',
      passive: { id: 'shieldPersist', txt: N('Escudos dela não usados duram até o próximo turno.', 'Her unused shields last into next turn.') },
      look: { skin: 'claro', hair: 'trancas', hairColor: '#c8904a', eyes: 'normal', cloth: '#6a7488', armor: true, bg: '#1c2430' },
      faces: [
        F(N('Escudo', 'Shield'), 'shield', 3, 'ally', [{ k: 'shield' }]),
        F(N('Escudo', 'Shield'), 'shield', 4, 'ally', [{ k: 'shield' }]),
        F(N('Proteger', 'Protect'), 'shield', 0, 'ally', [{ k: 'protect' }]),
        F(N('Barreira', 'Barrier'), 'shield', 2, 'ally', [{ k: 'st', s: 'barrier' }]),
        F(N('Refletir', 'Reflect'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 2 }]),
        F(N('Fortaleza', 'Fortress'), 'shield', 1, 'allA', [{ k: 'shield', who: 'allA' }, { k: 'tauntStrong' }], { rare: true })
      ]
    },
    {
      id: 'clerigo', name: N('Clériga', 'Cleric'), hp: 9, skin: 'amarelo',
      passive: { id: 'firstHealCleanse', txt: N('A primeira cura do turno remove 1 status negativo.', 'First heal each turn removes 1 debuff.') },
      look: { skin: 'claro', hair: 'coque', hairColor: '#e8e0d0', headgear: 'aureola', eyes: 'calm', cloth: '#c9b273', bg: '#28241a' },
      faces: [
        F(N('Cura', 'Heal'), 'heart', 2, 'ally', [{ k: 'heal' }]),
        F(N('Cura', 'Heal'), 'heart', 3, 'ally', [{ k: 'heal' }]),
        F(N('Escudo Sagrado', 'Holy Shield'), 'shield', 2, 'ally', [{ k: 'shield' }]),
        F(N('Purificar', 'Purify'), 'star', 0, 'ally', [{ k: 'cleanse', n: 9 }]),
        F(N('Reviver', 'Revive'), 'heart', 1, 'downed', [{ k: 'revive', hp: 1 }], { rare: true }),
        F(N('Luz', 'Light'), 'star', 2, 'enemy', [{ k: 'dmg' }, { k: 'healLowest', n: 2 }], { rare: true })
      ]
    },
    {
      id: 'ladino', name: N('Ladino', 'Rogue'), hp: 8, skin: 'roxo',
      passive: { id: 'plusVsMarked', txt: N('Contra inimigo marcado, causa +1 de dano.', '+1 damage vs marked enemies.') },
      look: { skin: 'medio', hair: 'curto', hairColor: '#241a14', headgear: 'capuz', hoodColor: '#38304a', eyes: 'normal', cloth: '#38304a', bg: '#181420' },
      faces: [
        F(N('Achar a Brecha', 'Find the Opening'), 'eye', 1, 'enemy', [{ k: 'st', s: 'mark', n: 1 }, { k: 'dmg', n: 1 }]),
        F(N('Ataque Duplo', 'Double Hit'), 'sword', 1, 'enemy', [{ k: 'dmg', times: 2 }]),
        F(N('Veneno', 'Poison'), 'drop', 2, 'enemy', [{ k: 'st', s: 'poison' }]),
        F(N('Esquiva', 'Dodge'), 'bolt', 0, 'self', [{ k: 'st', s: 'dodge' }]),
        F(N('Roubar', 'Steal'), 'coin', 1, 'enemy', [{ k: 'coin' }, { k: 'dmg', n: 1 }]),
        F(N('Golpe pelas Costas', 'Backstab'), 'skull', 5, 'enemy', [{ k: 'dmg', onlyMarked: true }], { rare: true })
      ]
    },
    {
      id: 'arqueira', name: N('Arqueira', 'Archer'), hp: 8, skin: 'verde',
      passive: { id: 'plusVsBack', txt: N('Ataques contra a linha de trás causam +1.', '+1 damage vs backline.') },
      look: { skin: 'claro', hair: 'rabo', hairColor: '#8a5c2e', headgear: 'bandana', bandColor: '#4a7a3c', eyes: 'normal', cloth: '#4a5c38', bg: '#1a2014' },
      faces: [
        F(N('Flecha', 'Arrow'), 'sword', 2, 'enemy', [{ k: 'dmg', anyRow: true }]),
        F(N('Flecha', 'Arrow'), 'sword', 3, 'enemy', [{ k: 'dmg', anyRow: true }]),
        F(N('Marcar Alvo', 'Mark Target'), 'eye', 0, 'enemy', [{ k: 'st', s: 'mark', n: 1 }]),
        F(N('Tiro Perfurante', 'Piercing Shot'), 'sword', 2, 'enemy', [{ k: 'dmg', ignoreShield: true, anyRow: true }]),
        F(N('Chuva de Flechas', 'Arrow Rain'), 'sword', 1, 'allE', [{ k: 'dmg' }]),
        F(N('Tiro Perfeito', 'Perfect Shot'), 'eye', 5, 'enemy', [{ k: 'dmg', onlyMarked: true, anyRow: true }], { rare: true })
      ]
    },
    {
      id: 'piromante', name: N('Piromante', 'Pyromancer'), hp: 7, skin: 'vermelho',
      passive: { id: 'burnPlus', txt: N('Queimadura dele causa +1 no primeiro turno.', 'His burns deal +1 on first turn.') },
      look: { skin: 'medio', hair: 'espetado', hairColor: '#b8442a', eyes: 'glow', eyeColor: '#ff8a3c', cloth: '#8a2418', bg: '#2a1208' },
      faces: [
        F(N('Fogo', 'Fire'), 'flame', 3, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Fogo', 'Fire'), 'flame', 4, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Queimadura', 'Burn'), 'flame', 2, 'enemy', [{ k: 'st', s: 'burn' }]),
        F(N('Mana', 'Mana'), 'star', 2, 'self', [{ k: 'st', s: 'charge' }]),
        F(N('Explosão', 'Explosion'), 'flame', 2, 'allE', [{ k: 'dmg', magic: true }]),
        F(N('Inferno', 'Inferno'), 'flame', 6, 'enemy', [{ k: 'dmg', magic: true }, { k: 'selfDmg', n: 1 }], { rare: true })
      ]
    },
    {
      id: 'criomante', name: N('Criomante', 'Cryomancer'), hp: 8, skin: 'azul',
      passive: { id: 'freezeWeak', txt: N('O 1º inimigo congelado no turno também fica Fraco 1.', 'First frozen enemy also gets Weak 1.') },
      look: { skin: 'palido', hair: 'longo', hairColor: '#a8d4f0', eyes: 'glow', eyeColor: '#a8d4f0', cloth: '#24408a', bg: '#0e1828' },
      faces: [
        F(N('Gelo', 'Ice'), 'flame', 2, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Congelar', 'Freeze'), 'flame', 1, 'enemy', [{ k: 'st', s: 'freeze' }]),
        F(N('Escudo de Gelo', 'Ice Shield'), 'shield', 3, 'ally', [{ k: 'shield' }]),
        F(N('Enfraquecer', 'Enfeeble'), 'eye', 2, 'enemy', [{ k: 'st', s: 'weak' }]),
        F(N('Lança Glacial', 'Glacial Lance'), 'flame', 4, 'enemy', [{ k: 'dmg', magic: true, plusIfFrozen: 0 }], { rare: false }),
        F(N('Nevasca', 'Blizzard'), 'flame', 1, 'allE', [{ k: 'dmg', magic: true }, { k: 'st', s: 'freeze', n: 1 }], { rare: true })
      ]
    },
    {
      id: 'bardo', name: N('Bardo', 'Bard'), hp: 9, skin: 'amarelo',
      passive: { id: 'freeReroll', txt: N('A 1ª rerrolagem do Bardo por combate é grátis.', "Bard's first reroll each combat is free.") },
      look: { skin: 'claro', hair: 'curto', hairColor: '#c8904a', headgear: 'flor', eyes: 'normal', mouth: 'grin', cloth: '#8a6e2e', bg: '#241e12' },
      faces: [
        F(N('Inspirar', 'Inspire'), 'star', 1, 'ally', [{ k: 'st', s: 'inspire' }]),
        F(N('Acorde Protetor', 'Guard Chord'), 'shield', 1, 'allA', [{ k: 'shield', who: 'allA' }]),
        F(N('Canção Serena', 'Calm Song'), 'heart', 1, 'allA', [{ k: 'heal', who: 'allA' }]),
        F(N('Rerrolar', 'Reroll'), 'hour', 0, 'ally', [{ k: 'rerollAlly' }]),
        F(N('Ecoar', 'Echo'), 'star', 0, 'none', [{ k: 'copyLast', minus: 1 }]),
        F(N('Canção Heroica', 'Heroic Song'), 'star', 1, 'allA', [{ k: 'st', s: 'inspire', who: 'allA' }], { rare: true })
      ]
    },
    {
      id: 'druida', name: N('Druida', 'Druid'), hp: 9, skin: 'verde',
      passive: { id: 'healAfterFight', txt: N('Cura 1 em todos ao fim de cada batalha.', 'Heals all by 1 after each battle.') },
      look: { skin: 'medio', hair: 'selvagem', hairColor: '#4a6428', headgear: 'chifres', eyes: 'calm', beard: true, cloth: '#3a5228', bg: '#141c10' },
      faces: [
        F(N('Cura', 'Heal'), 'heart', 2, 'ally', [{ k: 'heal' }]),
        F(N('Regeneração', 'Regen'), 'heart', 2, 'ally', [{ k: 'st', s: 'regen' }]),
        F(N('Raízes', 'Roots'), 'drop', 0, 'enemy', [{ k: 'stunWeakest' }]),
        F(N('Veneno Natural', 'Natural Venom'), 'drop', 2, 'enemy', [{ k: 'st', s: 'poison' }]),
        F(N('Forma Animal', 'Wild Shape'), 'sword', 3, 'enemy', [{ k: 'dmg' }, { k: 'shield', n: 1, who: 'self' }]),
        F(N('Bosque Vivo', 'Living Grove'), 'drop', 1, 'allA', [{ k: 'heal', who: 'allA' }, { k: 'st', s: 'poison', who: 'allE' }], { rare: true })
      ]
    },
    {
      id: 'necromante', name: N('Necromante', 'Necromancer'), hp: 7, skin: 'preto',
      passive: { id: 'darkCharge', txt: N('Quando um inimigo morre, ganha 1 Carga.', 'Gains 1 Charge when an enemy dies.') },
      look: { skin: 'palido', hair: 'careca', headgear: 'capuz', hoodColor: '#241c30', eyes: 'glow', eyeColor: '#8a4ae8', cloth: '#241c30', bg: '#140e1c' },
      faces: [
        F(N('Dreno', 'Drain'), 'skull', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'healSelf', n: 1 }]),
        F(N('Caveira', 'Skull'), 'skull', 3, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Invocar Esqueleto', 'Summon Skeleton'), 'skull', 0, 'none', [{ k: 'summon', id: 'esqueletoAliado' }]),
        F(N('Sacrificar', 'Sacrifice'), 'skull', 4, 'enemy', [{ k: 'sacrificeSummon', dmg: 4 }]),
        F(N('Maldição', 'Curse'), 'skull', 2, 'enemy', [{ k: 'st', s: 'curse' }]),
        F(N('Exército Breve', 'Brief Army'), 'skull', 0, 'none', [{ k: 'summon', id: 'esqueletoFraco' }, { k: 'summon', id: 'esqueletoFraco' }], { rare: true })
      ]
    },
    {
      id: 'paladino', name: N('Paladino', 'Paladin'), hp: 11, skin: 'dourado',
      passive: { id: 'holyBonus', txt: N('+1 de dano contra mortos-vivos e demônios.', '+1 damage vs undead and demons.') },
      look: { skin: 'escuro', hair: 'careca', headgear: 'elmo', eyes: 'normal', cloth: '#c9b273', armor: true, bg: '#282012' },
      faces: [
        F(N('Golpe Sagrado', 'Holy Strike'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Cura', 'Heal'), 'heart', 2, 'ally', [{ k: 'heal' }]),
        F(N('Escudo', 'Shield'), 'shield', 3, 'ally', [{ k: 'shield' }]),
        F(N('Purificar', 'Purify'), 'star', 1, 'ally', [{ k: 'cleanse', n: 9 }, { k: 'shield' }]),
        F(N('Julgamento', 'Judgement'), 'sword', 4, 'enemy', [{ k: 'dmg', plusIfMarkedOrCursed: 2 }]),
        F(N('Aura Sagrada', 'Holy Aura'), 'star', 1, 'allA', [{ k: 'heal', who: 'allA' }, { k: 'shield', who: 'allA' }], { rare: true })
      ]
    },
    {
      id: 'berserker', name: N('Berserker', 'Berserker'), hp: 11, skin: 'vermelho',
      passive: { id: 'ragePlus2', txt: N('Com metade do HP ou menos, ataques causam +2.', 'At half HP or less, attacks deal +2.') },
      look: { skin: 'claro', hair: 'selvagem', hairColor: '#b84a2a', eyes: 'fierce', beard: true, scar: true, cloth: '#6e2418', bg: '#240e08' },
      faces: [
        F(N('Machado', 'Axe'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Machado', 'Axe'), 'sword', 4, 'enemy', [{ k: 'dmg' }]),
        F(N('Fúria', 'Rage'), 'flame', 2, 'self', [{ k: 'selfDmg', n: 1 }, { k: 'st', s: 'inspire', n: 2 }]),
        F(N('Sangramento', 'Rend'), 'drop', 2, 'enemy', [{ k: 'st', s: 'bleed' }]),
        F(N('Ataque Selvagem', 'Savage Blow'), 'sword', 6, 'enemy', [{ k: 'dmg' }, { k: 'selfDmg', n: 2 }], { rare: true }),
        F(N('Último Grito', 'Last Cry'), 'skull', 0, 'enemy', [{ k: 'dmgLostHp', max: 8 }], { rare: true })
      ]
    },
    {
      id: 'monge', name: N('Monge', 'Monk'), hp: 9, skin: 'amarelo',
      passive: { id: 'thirdDiePlus2', txt: N('Cada 3º dado usado por ele ganha +2.', "Monk's every 3rd die gets +2.") },
      look: { skin: 'medio', hair: 'careca', eyes: 'closed', tattoo: true, tattooColor: '#e8843c', cloth: '#a86a2e', bg: '#241a0e' },
      faces: [
        F(N('Soco Duplo', 'Double Punch'), 'sword', 1, 'enemy', [{ k: 'dmg', times: 2 }]),
        F(N('Chute', 'Kick'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Meditar', 'Meditate'), 'star', 0, 'self', [{ k: 'st', s: 'focus' }]),
        F(N('Desviar', 'Deflect'), 'bolt', 0, 'self', [{ k: 'st', s: 'dodge' }]),
        F(N('Combo', 'Combo'), 'sword', 2, 'enemy', [{ k: 'dmgCombo', max: 5 }]),
        F(N('Palma Espiritual', 'Spirit Palm'), 'star', 4, 'enemy', [{ k: 'dmg', magic: true }, { k: 'removeBuff' }], { rare: true })
      ]
    },
    {
      id: 'alquimista', name: N('Alquimista', 'Alchemist'), hp: 8, skin: 'verde',
      passive: { id: 'potionPlus', txt: N('A 1ª poção por combate tem +1 de efeito.', 'First potion each combat has +1 effect.') },
      look: { skin: 'claro', hair: 'coque', hairColor: '#8a5c2e', headgear: 'oculos', eyes: 'normal', cloth: '#4a5c38', bg: '#1a2014' },
      faces: [
        F(N('Bomba', 'Bomb'), 'flame', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Poção de Cura', 'Heal Potion'), 'heart', 2, 'ally', [{ k: 'heal', potion: true }]),
        F(N('Poção Tóxica', 'Toxic Potion'), 'drop', 2, 'enemy', [{ k: 'st', s: 'poison', potion: true }]),
        F(N('Poção Instável', 'Wild Potion'), 'star', 0, 'none', [{ k: 'randomBoon' }]),
        F(N('Ácido', 'Acid'), 'drop', 1, 'enemy', [{ k: 'breakShield', n: 2 }, { k: 'dmg', n: 1 }]),
        F(N('Grande Mistura', 'Grand Mix'), 'star', 2, 'any', [{ k: 'mixHealDmg' }], { rare: true })
      ]
    },
    {
      id: 'ilusionista', name: N('Ilusionista', 'Illusionist'), hp: 8, skin: 'roxo',
      passive: { id: 'ignoreFatal', txt: N('1x por batalha, ignora o primeiro dano fatal.', 'Once per battle, ignores first fatal damage.') },
      look: { skin: 'palido', hair: 'longo', hairColor: '#8a4ae8', eyes: 'mask', maskColor: '#38304a', cloth: '#5c2e8a', bg: '#180e24' },
      faces: [
        F(N('Ilusão', 'Illusion'), 'eye', 0, 'none', [{ k: 'summon', id: 'clone' }]),
        F(N('Trocar Dados', 'Swap Dice'), 'hour', 0, 'none', [{ k: 'swapDice' }]),
        F(N('Rerrolar Destino', 'Reroll Fate'), 'star', 0, 'none', [{ k: 'rerollFate' }]),
        F(N('Cegueira', 'Blind'), 'eye', 1, 'enemy', [{ k: 'st', s: 'blind' }]),
        F(N('Copiar Inimigo', 'Copy Enemy'), 'eye', 0, 'enemy', [{ k: 'copyEnemyDie' }]),
        F(N('Espelho', 'Mirror'), 'star', 0, 'ally', [{ k: 'st', s: 'counter', n: 1 }, { k: 'st', s: 'dodge' }], { rare: true })
      ]
    },
    {
      id: 'artifice', name: N('Artífice', 'Artificer'), hp: 9, skin: 'cinza',
      passive: { id: 'crackSaver', txt: N('O 1º lado trincado usado por ele não gasta uso.', 'First cracked side he uses costs no durability.') },
      look: { skin: 'medio', hair: 'curto', hairColor: '#5a4632', headgear: 'oculos', eyes: 'normal', beard: true, cloth: '#6a5438', bg: '#201a10' },
      faces: [
        F(N('Chave Inglesa', 'Wrench'), 'sword', 2, 'enemy', [{ k: 'dmg' }]),
        F(N('Torreta', 'Turret'), 'bolt', 0, 'none', [{ k: 'summon', id: 'torreta' }]),
        F(N('Reforçar', 'Reinforce'), 'star', 1, 'ally', [{ k: 'st', s: 'inspire' }]),
        F(N('Consertar', 'Repair'), 'hour', 0, 'ally', [{ k: 'repairCracked' }]),
        F(N('Escudo Mecânico', 'Mech Shield'), 'shield', 3, 'ally', [{ k: 'shield' }]),
        F(N('Overclock', 'Overclock'), 'bolt', 0, 'ally', [{ k: 'overclock' }], { rare: true })
      ]
    },
    {
      id: 'samurai', name: N('Samurai', 'Samurai'), hp: 9, skin: 'vermelho',
      passive: { id: 'storeDie', txt: N('1x por combate, guarda um dado não usado para o próximo turno.', 'Once per combat, stores an unused die.') },
      look: { skin: 'medio', hair: 'coque', hairColor: '#241a14', eyes: 'fierce', cloth: '#8a2432', armor: true, bg: '#20141a' },
      faces: [
        F(N('Corte', 'Cut'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Corte Limpo', 'Clean Cut'), 'sword', 4, 'enemy', [{ k: 'dmg', plusIfFirst: 0 }]),
        F(N('Defesa', 'Guard'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 1 }]),
        F(N('Preparar Lâmina', 'Ready Blade'), 'star', 2, 'self', [{ k: 'st', s: 'inspire', n: 2 }]),
        F(N('Iaijutsu', 'Iaijutsu'), 'bolt', 5, 'enemy', [{ k: 'dmg', onlyFirst: true }], { rare: true }),
        F(N('Duelo', 'Duel'), 'eye', 2, 'enemy', [{ k: 'st', s: 'mark', n: 1 }, { k: 'shield', who: 'self' }])
      ]
    },
    {
      id: 'bruxa', name: N('Bruxa', 'Witch'), hp: 8, skin: 'roxo',
      passive: { id: 'curseAmp', txt: N('Amaldiçoados recebem +1 de veneno e sangramento.', 'Cursed enemies take +1 poison/bleed damage.') },
      look: { skin: 'palido', hair: 'longo', hairColor: '#38304a', headgear: 'chapeuBruxa', eyes: 'glow', eyeColor: '#8a4ae8', cloth: '#38284a', bg: '#160e20' },
      faces: [
        F(N('Maldição', 'Curse'), 'skull', 2, 'enemy', [{ k: 'st', s: 'curse' }]),
        F(N('Veneno', 'Poison'), 'drop', 2, 'enemy', [{ k: 'st', s: 'poison' }]),
        F(N('Enfraquecer', 'Weaken'), 'eye', 2, 'enemy', [{ k: 'st', s: 'weak' }]),
        F(N('Trocar Intenção', 'Twist Intent'), 'hour', 0, 'enemy', [{ k: 'twistIntent' }]),
        F(N('Dreno Coletivo', 'Mass Drain'), 'skull', 1, 'allE', [{ k: 'dmg', magic: true }]),
        F(N('Pacto Sombrio', 'Dark Pact'), 'skull', 3, 'enemy', [{ k: 'st', s: 'curse', n: 3 }, { k: 'crackSelf' }], { rare: true })
      ]
    },
    {
      id: 'capita', name: N('Capitã', 'Captain'), hp: 10, skin: 'amarelo',
      passive: { id: 'commandShield', txt: N('O 1º aliado comandado no turno ganha escudo 1.', 'First commanded ally gains shield 1.') },
      look: { skin: 'escuro', hair: 'trancas', hairColor: '#241a14', headgear: 'bandana', bandColor: '#c9a23a', eyes: 'fierce', cloth: '#8a6e2e', bg: '#241e10' },
      faces: [
        F(N('Ataque', 'Attack'), 'sword', 2, 'enemy', [{ k: 'dmg' }]),
        F(N('Ordem', 'Command'), 'star', 0, 'ally', [{ k: 'commandRepeat', minus: 1 }]),
        F(N('Reposicionar', 'Reposition'), 'hour', 0, 'none', [{ k: 'swapRows' }]),
        F(N('Escudo à Frente', 'Front Shield'), 'shield', 2, 'ally', [{ k: 'shield', frontOnly: true }]),
        F(N('Alvo Prioritário', 'Priority Target'), 'eye', 0, 'enemy', [{ k: 'st', s: 'mark', n: 1 }]),
        F(N('Comando Total', 'Full Command'), 'star', 1, 'allA', [{ k: 'buffAttacks', n: 1 }], { rare: true })
      ]
    },
    {
      id: 'oraculo', name: N('Oráculo', 'Oracle'), hp: 7, skin: 'dourado',
      passive: { id: 'peekReroll', txt: N('Vê uma prévia do próximo resultado ao rerrolar.', 'Previews one result before rerolling.') },
      look: { skin: 'escuro', hair: 'longo', hairColor: '#e8e0d0', eyes: 'closed', tattoo: true, tattooColor: '#c9a23a', cloth: '#8a6e2e', bg: '#282012' },
      faces: [
        F(N('Luz', 'Light'), 'star', 2, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Prever', 'Foresee'), 'eye', 0, 'ally', [{ k: 'st', s: 'inspire' }]),
        F(N('Virar Dado', 'Flip Die'), 'hour', 0, 'ally', [{ k: 'flipDie' }]),
        F(N('Escudo Espiritual', 'Spirit Shield'), 'shield', 2, 'ally', [{ k: 'shield' }]),
        F(N('Bênção', 'Blessing'), 'heart', 1, 'ally', [{ k: 'heal' }, { k: 'st', s: 'inspire' }]),
        F(N('Profecia', 'Prophecy'), 'star', 0, 'none', [{ k: 'chooseFate' }], { rare: true })
      ]
    },
    {
      id: 'cacador', name: N('Caçador de Demônios', 'Demon Hunter'), hp: 9, skin: 'vermelho',
      passive: { id: 'eliteSlayer', txt: N('+1 de dano contra elites e chefes.', '+1 damage vs elites and bosses.') },
      look: { skin: 'medio', hair: 'curto', hairColor: '#38304a', headgear: 'chapeuLargo', eyes: 'fierce', scar: true, cloth: '#4a3a2c', bg: '#1c140c' },
      faces: [
        F(N('Lâmina', 'Blade'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Tiro Sagrado', 'Holy Shot'), 'star', 2, 'enemy', [{ k: 'dmg', anyRow: true }]),
        F(N('Marcar Presa', 'Mark Prey'), 'eye', 0, 'enemy', [{ k: 'st', s: 'mark', n: 1 }]),
        F(N('Lâmina Serrilhada', 'Serrated Edge'), 'drop', 2, 'enemy', [{ k: 'st', s: 'bleed' }]),
        F(N('Armadilha', 'Trap'), 'chain', 2, 'enemy', [{ k: 'trap' }]),
        F(N('Execução', 'Execution'), 'skull', 6, 'enemy', [{ k: 'dmg', onlyMarked: true, onlyBoss: true }], { rare: true })
      ]
    },
    {
      id: 'golem', name: N('Golem', 'Golem'), hp: 16, skin: 'cinza',
      passive: { id: 'stoneSkin', txt: N('Recebe -1 de todo dano (mínimo 1).', 'Takes -1 from all damage (min 1).') },
      look: { skin: 'cinzento', hair: 'careca', eyes: 'glow', eyeColor: '#ffd27a', cloth: '#5a5a64', armor: true, bg: '#1c1c22' },
      faces: [
        F(N('Soco', 'Punch'), 'sword', 2, 'enemy', [{ k: 'dmg' }]),
        F(N('Soco', 'Punch'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Escudo', 'Shield'), 'shield', 4, 'self', [{ k: 'shield' }]),
        F(N('Pedra', 'Stone'), 'shield', 3, 'self', [{ k: 'st', s: 'barrier' }]),
        F(N('Provocar Tudo', 'Taunt All'), 'chain', 0, 'self', [{ k: 'tauntAll' }]),
        F(N('Terremoto', 'Earthquake'), 'sword', 2, 'allE', [{ k: 'dmg' }, { k: 'st', s: 'slow', who: 'self' }], { rare: true })
      ]
    },
    {
      id: 'vampira', name: N('Vampira', 'Vampiress'), hp: 9, skin: 'preto',
      passive: { id: 'killHeal', txt: N('Ao matar um inimigo, cura 2.', 'Heals 2 on kill.') },
      look: { skin: 'palido', hair: 'longo', hairColor: '#241a20', eyes: 'glow', eyeColor: '#e84a5a', mouth: 'grin', cloth: '#38141c', bg: '#180a10' },
      faces: [
        F(N('Mordida', 'Bite'), 'sword', 2, 'enemy', [{ k: 'dmg' }, { k: 'healSelf', n: 1 }]),
        F(N('Corte', 'Slash'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Sangramento', 'Bleed'), 'drop', 2, 'enemy', [{ k: 'st', s: 'bleed' }]),
        F(N('Névoa', 'Mist'), 'bolt', 0, 'self', [{ k: 'st', s: 'dodge' }]),
        F(N('Dreno', 'Drain'), 'skull', 3, 'enemy', [{ k: 'dmg' }, { k: 'healSelfIfBleeding', n: 2 }]),
        F(N('Banquete', 'Feast'), 'skull', 2, 'allE', [{ k: 'dmgOnlyBleeding' }], { rare: true })
      ]
    },
    {
      id: 'geomante', name: N('Geomante', 'Geomancer'), hp: 10, skin: 'cinza',
      passive: { id: 'barrierPlus', txt: N('Barreiras dele reduzem +1 de dano.', 'His barriers block +1 damage.') },
      look: { skin: 'escuro', hair: 'careca', eyes: 'calm', beard: true, tattoo: true, tattooColor: '#8a6e2e', cloth: '#6a5438', bg: '#1c1810' },
      faces: [
        F(N('Pedra', 'Rock'), 'sword', 2, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Barreira', 'Barrier'), 'shield', 3, 'ally', [{ k: 'st', s: 'barrier' }]),
        F(N('Espinhos', 'Spikes'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 1 }]),
        F(N('Fenda', 'Fissure'), 'eye', 1, 'enemy', [{ k: 'st', s: 'vulnerable' }]),
        F(N('Prisão de Pedra', 'Stone Prison'), 'chain', 0, 'enemy', [{ k: 'stunIfNoShield' }]),
        F(N('Desabamento', 'Collapse'), 'sword', 3, 'allE', [{ k: 'dmgOnlyVulnerable' }], { rare: true })
      ]
    },
    {
      id: 'tempestario', name: N('Tempestário', 'Stormcaller'), hp: 8, skin: 'azul',
      passive: { id: 'chainPlus', txt: N('Ao atingir 2 inimigos no turno, o 2º recebe +1.', 'Hitting 2 enemies in a turn: 2nd takes +1.') },
      look: { skin: 'medio', hair: 'espetado', hairColor: '#e8d84a', eyes: 'glow', eyeColor: '#e8d84a', cloth: '#24408a', bg: '#101828' },
      faces: [
        F(N('Raio', 'Bolt'), 'bolt', 3, 'enemy', [{ k: 'dmg', magic: true }]),
        F(N('Choque', 'Shock'), 'bolt', 2, 'enemy', [{ k: 'dmg', magic: true }, { k: 'st', s: 'weak', n: 1 }]),
        F(N('Corrente Elétrica', 'Chain Lightning'), 'bolt', 1, 'allE', [{ k: 'dmgUpTo', targets: 3 }]),
        F(N('Carga', 'Charge'), 'star', 2, 'self', [{ k: 'st', s: 'charge' }]),
        F(N('Trovoada', 'Thunder'), 'bolt', 5, 'enemy', [{ k: 'dmg', magic: true, needsCharge: true }], { rare: true }),
        F(N('Tempestade', 'Storm'), 'bolt', 2, 'allE', [{ k: 'dmg', magic: true }, { k: 'clearCharge' }], { rare: true })
      ]
    },
    {
      id: 'medico', name: N('Médico de Campo', 'Field Medic'), hp: 9, skin: 'amarelo',
      passive: { id: 'preventDown', txt: N('1x por batalha, aliado que cairia fica com 1 HP.', 'Once per battle, a falling ally stays at 1 HP.') },
      look: { skin: 'claro', hair: 'curto', hairColor: '#8a8a94', headgear: 'oculos', eyes: 'normal', cloth: '#8a8a94', bg: '#1e1e24' },
      faces: [
        F(N('Curativo', 'Bandage'), 'heart', 2, 'ally', [{ k: 'heal' }]),
        F(N('Curativo', 'Bandage'), 'heart', 3, 'ally', [{ k: 'heal' }]),
        F(N('Antídoto', 'Antidote'), 'drop', 0, 'ally', [{ k: 'cleanseTypes', types: ['poison', 'bleed'] }]),
        F(N('Estimulante', 'Stimulant'), 'star', 1, 'ally', [{ k: 'st', s: 'inspire' }, { k: 'st', s: 'weak', delay: true }]),
        F(N('Suturar', 'Suture'), 'heart', 2, 'ally', [{ k: 'cleanseTypes', types: ['bleed'] }, { k: 'heal' }]),
        F(N('Emergência', 'Emergency'), 'heart', 2, 'downed', [{ k: 'revive', hp: 2 }], { rare: true })
      ]
    },
    {
      id: 'duelista', name: N('Duelista', 'Duelist'), hp: 9, skin: 'roxo',
      passive: { id: 'riposte', txt: N('Se for alvo de ataque, o próximo ataque dela ganha +1.', 'If attacked, her next attack gets +1.') },
      look: { skin: 'claro', hair: 'rabo', hairColor: '#8a2432', eyes: 'patch', mouth: 'grin', cloth: '#5c2e42', bg: '#1c1016' },
      faces: [
        F(N('Estocada', 'Lunge'), 'sword', 3, 'enemy', [{ k: 'dmg' }]),
        F(N('Aparar', 'Parry'), 'shield', 2, 'self', [{ k: 'shield' }, { k: 'st', s: 'counter', n: 2 }]),
        F(N('Marcar Duelo', 'Challenge'), 'eye', 0, 'enemy', [{ k: 'st', s: 'mark', n: 1 }]),
        F(N('Corte Rápido', 'Quick Cut'), 'sword', 2, 'enemy', [{ k: 'dmg', twiceIfMarked: true }]),
        F(N('Desarmar', 'Disarm'), 'chain', 2, 'enemy', [{ k: 'st', s: 'weak', n: 2 }]),
        F(N('Golpe Elegante', 'Elegant Strike'), 'sword', 4, 'enemy', [{ k: 'dmg' }, { k: 'st', s: 'dodge', who: 'self' }], { rare: true })
      ]
    },
    {
      id: 'invocadora', name: N('Invocadora', 'Summoner'), hp: 7, skin: 'roxo',
      passive: { id: 'summonHpPlus', txt: N('A 1ª invocação de cada luta tem +1 HP.', 'First summon each fight has +1 HP.') },
      look: { skin: 'escuro', hair: 'trancas', hairColor: '#5c2e8a', eyes: 'glow', eyeColor: '#c8b8e8', cloth: '#5c2e8a', bg: '#180e24' },
      faces: [
        F(N('Invocar Fada', 'Summon Fairy'), 'heart', 0, 'none', [{ k: 'summon', id: 'fada' }]),
        F(N('Invocar Lobo', 'Summon Wolf'), 'sword', 0, 'none', [{ k: 'summon', id: 'lobo' }]),
        F(N('Escudo Vivo', 'Living Shield'), 'shield', 0, 'none', [{ k: 'summon', id: 'escudoVivo' }]),
        F(N('Comandar', 'Command'), 'star', 0, 'none', [{ k: 'summonsAct' }]),
        F(N('Sacrificar', 'Sacrifice'), 'skull', 3, 'any', [{ k: 'sacrificeChoice', n: 3 }]),
        F(N('Portal', 'Portal'), 'star', 0, 'none', [{ k: 'summon', id: 'colossoBreve' }], { rare: true })
      ]
    },
    {
      id: 'cronomante', name: N('Cronomante', 'Chronomancer'), hp: 7, skin: 'dourado',
      passive: { id: 'undo', txt: N('1x por combate, desfaz a própria última ação.', 'Once per combat, undoes own last action.') },
      look: { skin: 'palido', hair: 'longo', hairColor: '#c9a94a', headgear: 'oculos', eyes: 'calm', cloth: '#8a6e2e', bg: '#221c10' },
      faces: [
        F(N('Ampulheta', 'Hourglass'), 'hour', 0, 'ally', [{ k: 'storeDie' }]),
        F(N('Atrasar', 'Delay'), 'hour', 2, 'enemy', [{ k: 'delayIntent', n: 2 }]),
        F(N('Repetir', 'Repeat'), 'star', 0, 'none', [{ k: 'copyLast', minus: 1 }]),
        F(N('Voltar Ferida', 'Rewind Wound'), 'heart', 2, 'ally', [{ k: 'healIfDamagedThisTurn' }]),
        F(N('Congelar Tempo', 'Freeze Time'), 'hour', 0, 'enemy', [{ k: 'breakShield', n: 99 }, { k: 'st', s: 'slow', n: 1 }]),
        F(N('Paradoxo', 'Paradox'), 'star', 0, 'ally', [{ k: 'duplicateDie' }, { k: 'crackTarget' }], { rare: true })
      ]
    }
  ];

  var byId = {};
  HEROES.forEach(function (h) { byId[h.id] = h; });

  // invocações aliadas
  RA.data.Summons = {
    esqueletoAliado: { name: N('Esqueleto', 'Skeleton'), hp: 2, act: { k: 'dmg', n: 1 }, sprite: 'esqueleto' },
    esqueletoFraco: { name: N('Esqueleto Frágil', 'Frail Skeleton'), hp: 1, act: { k: 'dmg', n: 1 }, sprite: 'esqueleto' },
    clone: { name: N('Clone', 'Clone'), hp: 1, act: null, sprite: 'fantasma', tank: true },
    torreta: { name: N('Torreta', 'Turret'), hp: 3, act: { k: 'dmg', n: 1 }, sprite: 'maquina' },
    fada: { name: N('Fada', 'Fairy'), hp: 2, act: { k: 'healLowest', n: 1 }, sprite: 'inseto' },
    lobo: { name: N('Lobo', 'Wolf'), hp: 3, act: { k: 'dmg', n: 1 }, sprite: 'besta' },
    escudoVivo: { name: N('Escudo Vivo', 'Living Shield'), hp: 3, act: null, sprite: 'construto', tank: true },
    colossoBreve: { name: N('Colosso Breve', 'Brief Colossus'), hp: 4, act: { k: 'dmg', n: 2 }, sprite: 'construto', ttl: 2 }
  };

  RA.data.Heroes = { list: HEROES, byId: byId };
})();
