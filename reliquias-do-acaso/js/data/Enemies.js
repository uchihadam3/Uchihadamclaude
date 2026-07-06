// Enemies: 80 comuns (10 por região), 8 elites, 8 chefes, 4 chefes secretos.
// Intenções: ciclo de ações com condições simples; chefes têm mecânica
// própria via 'mech' (implementada no Combat).
(function () {
  var N = function (pt, en) { return { pt: pt, en: en }; };
  // intent shorthand
  var atk = function (n, tgt) { return { k: 'atk', n: n, tgt: tgt || 'front' }; };
  var sh = function (n) { return { k: 'shield', n: n }; };
  var heal = function (n, who) { return { k: 'heal', n: n, who: who || 'ally' }; };
  var st = function (s, n, tgt) { return { k: 'st', s: s, n: n, tgt: tgt || 'front' }; };
  var summon = function (id) { return { k: 'summon', id: id }; };
  var sp = function (id, n) { return { k: 'special', id: id, n: n }; };

  function E(id, name, hp, region, arch, ai, o) {
    var e = { id: id, name: name, hp: hp, region: region, arch: arch, ai: ai, tier: 'comum' };
    if (o) Object.keys(o).forEach(function (k) { e[k] = o[k]; });
    return e;
  }

  var LIST = [
    // ===== REGIÃO 1: ESTRADA QUEBRADA =====
    E('goblinFraco', N('Goblin Fraco', 'Weak Goblin'), 4, 'estrada', 'goblin', [atk(2), atk(2), sh(1)], { weak: 'fisico' }),
    E('goblinArqueiro', N('Goblin Arqueiro', 'Goblin Archer'), 5, 'estrada', 'goblin', [atk(2, 'back'), st('mark', 1, 'back'), atk(3, 'back')], { decor: 'arco', row: 'back' }),
    E('goblinEscudeiro', N('Goblin Escudeiro', 'Goblin Shieldman'), 7, 'estrada', 'goblin', [sh(3), atk(2), sh(2)], { decor: 'escudo' }),
    E('loboFaminto', N('Lobo Faminto', 'Starving Wolf'), 6, 'estrada', 'besta', [atk(3), st('bleed', 1), atk(2, 'weakest')]),
    E('bandidoEstrada', N('Bandido de Estrada', 'Road Bandit'), 8, 'estrada', 'humanoide', [atk(3), sp('roubaMoeda', 2), atk(2)], { decor: 'adaga' }),
    E('xamaGoblin', N('Xamã Goblin', 'Goblin Shaman'), 6, 'estrada', 'goblin', [heal(2), st('weak', 1), atk(2, 'random')], { decor: 'cajado', row: 'back' }),
    E('carrascoPequeno', N('Carrasco Pequeno', 'Small Executioner'), 9, 'estrada', 'humanoide', [sp('carrega', 0), atk(5), atk(2)], { decor: 'capuz' }),
    E('corvoLadrao', N('Corvo Ladrão', 'Thief Crow'), 4, 'estrada', 'ave', [sp('roubaMoeda', 1), atk(2, 'back'), sp('fugir', 0)], { row: 'back' }),
    E('goblinExplosivo', N('Goblin Explosivo', 'Bomber Goblin'), 5, 'estrada', 'goblin', [sp('acende', 0), sp('explode', 4)], { decor: 'bomba' }),
    E('capitaoGoblin', N('Capitão Goblin', 'Goblin Captain'), 10, 'estrada', 'goblin', [atk(3), summon('goblinFraco'), st('inspire', 1, 'allyE')], { decor: 'coroa' }),

    // ===== REGIÃO 2: FLORESTA PODRE =====
    E('slimeVerde', N('Slime Verde', 'Green Slime'), 6, 'floresta', 'slime', [atk(2), st('poison', 1), atk(2)], { resist: 'veneno' }),
    E('esporoVivo', N('Esporo Vivo', 'Living Spore'), 4, 'floresta', 'planta', [st('poison', 2, 'random'), sp('explodeVeneno', 1)], { decor: 'esporo' }),
    E('ratoPestilento', N('Rato Pestilento', 'Plague Rat'), 5, 'floresta', 'besta', [atk(2), st('poison', 1), atk(2, 'weakest')]),
    E('aranhaCasca', N('Aranha de Casca', 'Bark Spider'), 7, 'floresta', 'inseto', [st('chained', 1), atk(3), st('poison', 1)]),
    E('florMordedora', N('Flor Mordedora', 'Biting Flower'), 8, 'floresta', 'planta', [atk(3), st('bleed', 1), heal(2, 'self')]),
    E('druidaCorrompido', N('Druida Corrompido', 'Corrupt Druid'), 8, 'floresta', 'humanoide', [heal(3), st('poison', 2, 'random'), summon('esporoVivo')], { decor: 'cajado', row: 'back' }),
    E('cogumeloExplosivo', N('Cogumelo Explosivo', 'Blast Shroom'), 5, 'floresta', 'planta', [sp('acende', 0), sp('explodeVeneno', 3)], { decor: 'esporo' }),
    E('cobraRaiz', N('Cobra de Raiz', 'Root Snake'), 6, 'floresta', 'serpente', [atk(3), st('poison', 2), sp('esconde', 0)]),
    E('vespaGigante', N('Vespa Gigante', 'Giant Wasp'), 5, 'floresta', 'inseto', [atk(2, 'back'), atk(2, 'back'), st('poison', 1, 'back')], { decor: 'ferrao', row: 'back' }),
    E('guardiaoMusgo', N('Guardião de Musgo', 'Moss Warden'), 11, 'floresta', 'construto', [sh(3), atk(3), st('weak', 1)], { resist: 'veneno', decor: 'nucleo' }),

    // ===== REGIÃO 3: CRIPTA DOS OSSOS =====
    E('esqueletoFracoE', N('Esqueleto Fraco', 'Weak Skeleton'), 5, 'cripta', 'esqueleto', [atk(2), atk(3), sh(1)], { kind: 'undead', resist: 'sangramento' }),
    E('esqueletoArqueiro', N('Esqueleto Arqueiro', 'Skeleton Archer'), 6, 'cripta', 'esqueleto', [atk(2, 'back'), st('mark', 1, 'random'), atk(3, 'back')], { kind: 'undead', decor: 'arco', row: 'back', resist: 'sangramento' }),
    E('caveiraSaltante', N('Caveira Saltante', 'Leaping Skull'), 3, 'cripta', 'esqueleto', [atk(2, 'random'), atk(2, 'random')], { kind: 'undead', resist: 'sangramento' }),
    E('fantasmaBaixo', N('Fantasma Baixo', 'Lesser Ghost'), 5, 'cripta', 'fantasma', [st('fear', 1), atk(2, 'back'), sp('esconde', 0)], { kind: 'undead', resist: 'fisico', weak: 'magia' }),
    E('zumbiPesado', N('Zumbi Pesado', 'Heavy Zombie'), 12, 'cripta', 'humanoide', [atk(3), st('poison', 1), atk(4)], { kind: 'undead', decor: 'capuz' }),
    E('necromanteMenor', N('Necromante Menor', 'Lesser Necromancer'), 7, 'cripta', 'humanoide', [summon('esqueletoFracoE'), st('curse', 1, 'random'), heal(2)], { kind: 'undead', decor: 'cajado', row: 'back' }),
    E('armaduraVazia', N('Armadura Vazia', 'Empty Armor'), 12, 'cripta', 'cavaleiro', [sh(3), st('counter', 2, 'self'), atk(3)], { kind: 'undead', weak: 'magia', resist: 'sangramento' }),
    E('maoRastejante', N('Mão Rastejante', 'Crawling Hand'), 4, 'cripta', 'inseto', [st('chained', 1), atk(2), st('stun', 1)], { kind: 'undead' }),
    E('mongeMorto', N('Monge Morto', 'Dead Monk'), 8, 'cripta', 'humanoide', [atk(2), atk(2), sp('carrega', 0), atk(4)], { kind: 'undead', decor: 'capuz' }),
    E('caoDeOssos', N('Cão de Ossos', 'Bone Hound'), 7, 'cripta', 'besta', [atk(3), st('bleed', 1), atk(3, 'weakest')], { kind: 'undead', decor: 'osso', resist: 'sangramento' }),

    // ===== REGIÃO 4: FORJA INFERNAL =====
    E('automatoPequeno', N('Autômato Pequeno', 'Small Automaton'), 7, 'forja', 'maquina', [atk(2), sh(2), atk(3)], { resist: 'veneno' }),
    E('forjadorLouco', N('Forjador Louco', 'Mad Forger'), 9, 'forja', 'humanoide', [sp('forjaEscudo', 3), atk(3), st('burn', 1)], { decor: 'capuz' }),
    E('slimeLava', N('Slime de Lava', 'Lava Slime'), 7, 'forja', 'slime', [atk(2), st('burn', 2), atk(2)], { decor: 'lava', resist: 'fogo' }),
    E('demonioBrasa', N('Demônio de Brasa', 'Ember Demon'), 8, 'forja', 'demonio', [st('burn', 2), atk(3), atk(2, 'random')], { kind: 'demon', resist: 'fogo' }),
    E('torretaQuebrada', N('Torreta Quebrada', 'Broken Turret'), 6, 'forja', 'maquina', [atk(2, 'back'), atk(2, 'back'), sp('travada', 0)], { row: 'back' }),
    E('mineiroPossuido', N('Mineiro Possuído', 'Possessed Miner'), 10, 'forja', 'humanoide', [atk(4), sp('carrega', 0), atk(5)], { kind: 'demon' }),
    E('caoDeFerro', N('Cão de Ferro', 'Iron Hound'), 9, 'forja', 'besta', [atk(3), st('bleed', 1), sh(2)], { resist: 'sangramento' }),
    E('carrascoCorrentes', N('Carrasco de Correntes', 'Chain Executioner'), 11, 'forja', 'demonio', [st('chained', 1, 'random'), atk(4), st('vulnerable', 1)], { kind: 'demon' }),
    E('espiritoForja', N('Espírito da Forja', 'Forge Spirit'), 6, 'forja', 'fantasma', [st('burn', 1, 'allH'), heal(2), st('burn', 2)], { kind: 'demon', resist: 'fogo', weak: 'gelo', row: 'back' }),
    E('canhaoVivo', N('Canhão Vivo', 'Living Cannon'), 8, 'forja', 'maquina', [sp('carrega', 0), atk(6, 'random'), sp('travada', 0)], { decor: 'chamine' }),

    // ===== REGIÃO 5: CIDADE DAS MÁSCARAS =====
    E('assassinoMascarado', N('Assassino Mascarado', 'Masked Assassin'), 7, 'mascaras', 'humanoide', [st('mark', 1, 'back'), atk(4, 'marked'), sp('esconde', 0)], { decor: 'mascara' }),
    E('duelistaCaido', N('Duelista Caído', 'Fallen Duelist'), 9, 'mascaras', 'humanoide', [atk(3), st('counter', 2, 'self'), atk(3)], { decor: 'espada' }),
    E('nobreVenenoso', N('Nobre Venenoso', 'Venomous Noble'), 8, 'mascaras', 'humanoide', [st('poison', 2), st('weak', 1), atk(2)], { decor: 'mascara', row: 'back' }),
    E('mimicoRua', N('Mímico de Rua', 'Street Mimic'), 6, 'mascaras', 'marionete', [sp('copiaMaiorDado', 0), atk(2)], {}),
    E('espiaoCego', N('Espião Cego', 'Blind Spy'), 7, 'mascaras', 'humanoide', [st('blind', 1), atk(3, 'back'), st('mark', 1)], { decor: 'capuz' }),
    E('marioneteViva', N('Marionete Viva', 'Living Marionette'), 8, 'mascaras', 'marionete', [atk(2), atk(2), st('fear', 1)], { weak: 'fogo' }),
    E('carruagemFantasma', N('Carruagem Fantasma', 'Ghost Carriage'), 12, 'mascaras', 'fantasma', [atk(4), sp('atropela', 2), sh(3)], { kind: 'undead', resist: 'fisico' }),
    E('guardaCorrompido', N('Guarda Corrompido', 'Corrupt Guard'), 10, 'mascaras', 'cavaleiro', [sh(3), atk(3), st('vulnerable', 1)], {}),
    E('ilusionistaMenor', N('Ilusionista Menor', 'Lesser Illusionist'), 6, 'mascaras', 'humanoide', [sp('bloqueiaDado', 0), st('blind', 1), atk(2, 'random')], { decor: 'mascara', row: 'back' }),
    E('medicoLouco', N('Médico Louco', 'Mad Doctor'), 8, 'mascaras', 'humanoide', [heal(3), st('poison', 2), sp('curaTudo', 1)], { decor: 'mascara', row: 'back' }),

    // ===== REGIÃO 6: DESERTO DE VIDRO =====
    E('escorpiaoVidro', N('Escorpião de Vidro', 'Glass Scorpion'), 7, 'deserto', 'inseto', [atk(3), st('poison', 2), st('counter', 1, 'self')], { decor: 'ferrao', weak: 'fisico' }),
    E('bandidoSol', N('Bandido do Sol', 'Sun Bandit'), 8, 'deserto', 'humanoide', [atk(3), sp('roubaMoeda', 2), st('blind', 1)], { decor: 'adaga' }),
    E('magoAreia', N('Mago de Areia', 'Sand Mage'), 7, 'deserto', 'humanoide', [st('blind', 1, 'random'), atk(3, 'random'), sh(2)], { decor: 'cajado', row: 'back' }),
    E('cobraCristalina', N('Cobra Cristalina', 'Crystal Snake'), 6, 'deserto', 'serpente', [atk(2), st('poison', 2), sp('reflete', 1)], {}),
    E('golemAreia', N('Golem de Areia', 'Sand Golem'), 13, 'deserto', 'construto', [sh(3), atk(4), sp('regenera', 2)], { resist: 'fisico' }),
    E('abutreOsso', N('Abutre de Osso', 'Bone Vulture'), 6, 'deserto', 'ave', [atk(2, 'weakest'), atk(3, 'weakest'), sp('fugir', 0)], { kind: 'undead' }),
    E('guardiaoSolar', N('Guardião Solar', 'Solar Warden'), 10, 'deserto', 'cavaleiro', [st('burn', 1, 'allH'), sh(3), atk(3)], { resist: 'fogo' }),
    E('caravaneiroMaldito', N('Caravaneiro Maldito', 'Cursed Caravaneer'), 9, 'deserto', 'humanoide', [st('curse', 1), atk(3), sp('roubaMoeda', 3)], { decor: 'capuz' }),
    E('espiritoMiragem', N('Espírito da Miragem', 'Mirage Spirit'), 6, 'deserto', 'fantasma', [sp('esconde', 0), atk(3, 'random'), st('fear', 1)], { resist: 'fisico', weak: 'magia' }),
    E('ladraoAgua', N('Ladrão de Água', 'Water Thief'), 7, 'deserto', 'humanoide', [sp('drenaCura', 2), atk(2), st('weak', 1)], { decor: 'adaga' }),

    // ===== REGIÃO 7: MAR PROFUNDO =====
    E('peixeAbissal', N('Peixe Abissal', 'Abyssal Fish'), 6, 'mar', 'marinho', [atk(3), st('fear', 1), atk(2)], {}),
    E('marinheiroAfogado', N('Marinheiro Afogado', 'Drowned Sailor'), 9, 'mar', 'humanoide', [atk(3), st('weak', 1), atk(3)], { kind: 'undead', decor: 'capuz' }),
    E('cultistaMar', N('Cultista do Mar', 'Sea Cultist'), 7, 'mar', 'humanoide', [st('curse', 1), summon('peixeAbissal'), heal(2)], { decor: 'capuz', row: 'back' }),
    E('caranguejoFerro', N('Caranguejo de Ferro', 'Iron Crab'), 11, 'mar', 'inseto', [sh(4), atk(3), st('counter', 2, 'self')], { resist: 'fisico' }),
    E('aguaVivaArcana', N('Água-Viva Arcana', 'Arcane Jellyfish'), 5, 'mar', 'marinho', [st('stun', 1), atk(2, 'random'), st('silence', 1)], { weak: 'fisico', row: 'back' }),
    E('sereiaSombria', N('Sereia Sombria', 'Dark Siren'), 8, 'mar', 'humanoide', [st('fear', 1, 'allH'), atk(3, 'marked'), st('mark', 1)], { row: 'back' }),
    E('tentaculoSolto', N('Tentáculo Solto', 'Loose Tentacle'), 8, 'mar', 'marinho', [st('chained', 1), atk(4), atk(2)], {}),
    E('polvoPequeno', N('Polvo Pequeno', 'Small Octopus'), 6, 'mar', 'marinho', [st('blind', 1), atk(2), sp('esconde', 0)], {}),
    E('capitaoAfogado', N('Capitão Afogado', 'Drowned Captain'), 12, 'mar', 'humanoide', [atk(4), st('inspire', 1, 'allyE'), sh(3)], { kind: 'undead', decor: 'espada' }),
    E('sinoSubmerso', N('Sino Submerso', 'Sunken Bell'), 9, 'mar', 'marinho', [st('fear', 1, 'allH'), st('stun', 1, 'random'), sp('badalada', 2)], { decor: 'sino', resist: 'fisico', weak: 'magia' }),

    // ===== REGIÃO 8: TORRE DO DADO NEGRO =====
    E('dadoVivo', N('Dado Vivo', 'Living Die'), 8, 'torre', 'dado', [sp('rolaCaos', 0), atk(3, 'random'), sh(2)], {}),
    E('cavaleiroAcaso', N('Cavaleiro do Acaso', 'Knight of Chance'), 12, 'torre', 'cavaleiro', [atk(4), sp('rolaCaos', 0), sh(3)], {}),
    E('magoSemFace', N('Mago Sem Face', 'Faceless Mage'), 10, 'torre', 'humanoide', [sp('bloqueiaDado', 0), sp('copiaMagia', 0), st('silence', 1)], { decor: 'capuz', weak: 'fisico', resist: 'maldicao', row: 'back' }),
    E('ecoHeroi', N('Eco do Herói', 'Hero Echo'), 9, 'torre', 'fantasma', [sp('copiaMaiorDado', 0), atk(3)], { resist: 'fisico' }),
    E('sombraRerolada', N('Sombra Rerolada', 'Rerolled Shadow'), 7, 'torre', 'fantasma', [sp('punirReroll', 1), atk(3, 'random')], {}),
    E('guardiaoDourado', N('Guardião Dourado', 'Golden Warden'), 13, 'torre', 'cavaleiro', [sh(4), atk(4), st('vulnerable', 1)], { resist: 'maldicao' }),
    E('serpenteProbabilidade', N('Serpente de Probabilidade', 'Probability Serpent'), 9, 'torre', 'serpente', [sp('inverteDado', 0), atk(3), st('curse', 1)], {}),
    E('cuboCorrompido', N('Cubo Corrompido', 'Corrupt Cube'), 10, 'torre', 'dado', [st('curse', 1, 'random'), atk(3), sp('travaDado', 0)], {}),
    E('anjoAzar', N('Anjo do Azar', 'Angel of Misfortune'), 11, 'torre', 'fantasma', [st('fear', 1, 'allH'), sp('drenaSorte', 0), atk(4)], { row: 'back' }),
    E('arautoDado', N('Arauto do Dado Negro', 'Herald of the Black Die'), 12, 'torre', 'humanoide', [st('curse', 2), atk(4), summon('dadoVivo')], { decor: 'capuz' }),

    // ===== ELITES (1 por região) =====
    E('ogroPonte', N('Ogro da Ponte', 'Bridge Ogre'), 22, 'estrada', 'construto', [atk(5), sp('carrega', 0), atk(7), sh(3)], { tier: 'elite' }),
    E('entApodrecido', N('Ent Apodrecido', 'Rotting Ent'), 26, 'floresta', 'planta', [st('poison', 2, 'allH'), atk(4), heal(3, 'self'), summon('esporoVivo')], { tier: 'elite', resist: 'veneno' }),
    E('cavaleiroSemNome', N('Cavaleiro Sem Nome', 'Nameless Knight'), 24, 'cripta', 'cavaleiro', [sh(4), atk(5), st('counter', 2, 'self'), atk(4)], { tier: 'elite', kind: 'undead', resist: 'sangramento' }),
    E('colossoBronze', N('Colosso de Bronze', 'Bronze Colossus'), 30, 'forja', 'construto', [sh(5), sp('carrega', 0), atk(8), st('burn', 2)], { tier: 'elite', resist: 'fogo', decor: 'nucleo' }),
    E('bailarinaFacas', N('Bailarina das Facas', 'Knife Dancer'), 22, 'mascaras', 'humanoide', [atk(3, 'random'), atk(3, 'random'), st('bleed', 2), sp('esconde', 0)], { tier: 'elite', decor: 'mascara' }),
    E('esfingePartida', N('Esfinge Partida', 'Broken Sphinx'), 26, 'deserto', 'construto', [sp('enigma', 0), atk(5), st('blind', 1, 'allH'), sh(4)], { tier: 'elite' }),
    E('leviataJovem', N('Leviatã Jovem', 'Young Leviathan'), 30, 'mar', 'marinho', [atk(5), st('fear', 1, 'allH'), atk(6), sp('mergulha', 0)], { tier: 'elite' }),
    E('juizFaces', N('Juiz das Faces', 'Judge of Faces'), 28, 'torre', 'dado', [sp('julga', 0), atk(5), st('curse', 2), sp('travaDado', 0)], { tier: 'elite' }),

    // ===== CHEFES =====
    E('reiGoblin', N('Rei Goblin da Carroça', 'Goblin Cart King'), 38, 'estrada', 'goblin', [summon('goblinFraco'), atk(4), sp('roubaMoeda', 3), atk(5)], { tier: 'chefe', decor: 'coroa', mech: 'reiGoblin' }),
    E('bruxaPantano', N('Bruxa do Pântano', 'Swamp Witch'), 44, 'floresta', 'humanoide', [st('poison', 2, 'allH'), sp('trocaDados', 0), st('curse', 2), atk(4)], { tier: 'chefe', decor: 'cajado', mech: 'bruxaPantano' }),
    E('hidraOssos', N('Hidra de Ossos', 'Bone Hydra'), 52, 'cripta', 'esqueleto', [atk(4), atk(3, 'random'), st('fear', 1, 'allH'), atk(5)], { tier: 'chefe', kind: 'undead', mech: 'hidraOssos', resist: 'sangramento' }),
    E('giganteForja', N('Gigante da Forja', 'Forge Giant'), 58, 'forja', 'construto', [sp('carrega', 0), sp('carrega', 0), sp('marretada', 10), st('burn', 2, 'allH')], { tier: 'chefe', mech: 'giganteForja', resist: 'fogo' }),
    E('duqueMascaras', N('Duque das Máscaras', 'Duke of Masks'), 50, 'mascaras', 'humanoide', [summon('clone_duque'), atk(5, 'marked'), st('mark', 1), sp('trocaIntencao', 0)], { tier: 'chefe', decor: 'mascara', mech: 'duqueMascaras' }),
    E('rainhaMiragem', N('Rainha da Miragem', 'Mirage Queen'), 56, 'deserto', 'humanoide', [sp('miragem', 0), atk(5), st('blind', 1, 'allH'), atk(4, 'random')], { tier: 'chefe', mech: 'rainhaMiragem' }),
    E('oraculoAfogado', N('Oráculo Afogado', 'Drowned Oracle'), 62, 'mar', 'marinho', [sp('preve', 0), atk(5), st('curse', 2, 'random'), sp('punheRepeticao', 2)], { tier: 'chefe', mech: 'oraculoAfogado', decor: 'sino' }),
    E('dadoNegro', N('O Dado Negro', 'The Black Die'), 75, 'torre', 'dado', [sp('regraNova', 0), atk(6), st('curse', 2, 'allH'), atk(5, 'random')], { tier: 'chefe', mech: 'dadoNegro' }),

    // ===== CHEFES SECRETOS =====
    E('ferreiroCego', N('O Ferreiro Cego', 'The Blind Smith'), 48, 'forja', 'humanoide', [sp('reforja', 0), atk(5), sp('marteladaDado', 0), sh(4)], { tier: 'secreto', decor: 'capuz', mech: 'ferreiroCego' }),
    E('criancaSorte', N('A Criança da Sorte', 'The Lucky Child'), 40, 'mascaras', 'humanoide', [sp('sorteLouca', 0), atk(3, 'random'), sp('sorteLouca', 0), heal(4, 'self')], { tier: 'secreto', mech: 'criancaSorte' }),
    E('reiSemNumero', N('O Rei Sem Número', 'The Numberless King'), 66, 'torre', 'cavaleiro', [sp('apagaNumeros', 0), atk(6), st('curse', 2, 'allH'), atk(7)], { tier: 'secreto', mech: 'reiSemNumero' }),
    E('maeDasFaces', N('A Mãe das Faces', 'Mother of Faces'), 70, 'torre', 'fantasma', [sp('copiaHeroi', 0), atk(5, 'random'), sp('copiaHeroi', 0), st('fear', 2, 'allH')], { tier: 'secreto', mech: 'maeDasFaces' }),

    // invocações inimigas auxiliares
    E('clone_duque', N('Máscara Falsa', 'False Mask'), 6, 'mascaras', 'marionete', [atk(2), st('fear', 1)], { summonOnly: true })
  ];

  var byId = {};
  LIST.forEach(function (e) { byId[e.id] = e; });

  RA.data.Enemies = {
    list: LIST, byId: byId,
    byRegionTier: function (region, tier) {
      return LIST.filter(function (e) { return e.region === region && e.tier === tier && !e.summonOnly; });
    }
  };
})();
