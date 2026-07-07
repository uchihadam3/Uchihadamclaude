// Enemies: 80 comuns (10 por região), 8 elites, 8 chefes, 4 chefes secretos.
//
// CADA INIMIGO ROLA UM DADO DE VERDADE a cada turno — a face rolada é a
// intenção mostrada ao jogador. O design segue regras deliberadas:
//   - Regiões 1-2: d6 com faces em branco (inimigos hesitam) e golpes fracos;
//   - Regiões 3-4: d8, quase sem branco, primeiros combos (face com 2 efeitos);
//   - Regiões 5-6: d10, zero branco, faces raras devastadoras (1 em 10);
//   - Regiões 7-8: d12, dados especializados e cruéis;
//   - ELITES: dado maior que o da região, sem branco, uma face-assinatura;
//   - CHEFES: d10/d12 com TODAS as faces nomeadas + um SEGUNDO DADO DE FÚRIA
//     que assume quando o chefe cai à metade da vida (def.die2 + def.enrage).
// A identidade estatística vem do PESO: repetir uma face no dado torna aquele
// comportamento mais provável (arqueiro atira 50% do tempo, zumbi hesita 25%).
(function () {
  var N = function (pt, en) { return { pt: pt, en: en }; };
  // construtores de face (mesma DSL de intenção do Combat)
  var atk = function (n, tgt, o) {
    var x = { k: 'atk', n: n, tgt: tgt || 'front' };
    if (o) Object.keys(o).forEach(function (k) { x[k] = o[k]; });
    return x;
  };
  var sh = function (n) { return { k: 'shield', n: n }; };
  var heal = function (n, who) { return { k: 'heal', n: n, who: who || 'ally' }; };
  var st = function (s, n, tgt) { return { k: 'st', s: s, n: n, tgt: tgt || 'front' }; };
  var summon = function (id) { return { k: 'summon', id: id }; };
  var sp = function (id, n) { return { k: 'special', id: id, n: n }; };
  var blank = function () { return { k: 'none' }; };
  var drain = function (n, tgt) { return { k: 'drain', n: n, tgt: tgt || 'front' }; };
  // f(face, nomePt, nomeEn): batiza a face (aparece no cartão de intenção)
  var f = function (face, pt, en) { face.nm = N(pt, en); return face; };
  // and(principal, extra...): face com múltiplos efeitos encadeados
  var and = function () {
    var a = [].slice.call(arguments);
    a[0].and = a.slice(1);
    return a[0];
  };

  function E(id, name, hp, region, arch, die, o) {
    var e = { id: id, name: name, hp: hp, region: region, arch: arch, die: die, ai: die, tier: 'comum' };
    if (o) Object.keys(o).forEach(function (k) { e[k] = o[k]; });
    return e;
  }

  var LIST = [
    // ===== REGIÃO 1: ESTRADA QUEBRADA (d6, covardes e previsíveis) =====
    E('goblinFraco', N('Goblin Fraco', 'Weak Goblin'), 4, 'estrada', 'goblin', [
      atk(2), atk(2), f(atk(3), 'Fúria Covarde', 'Coward Fury'), sh(1), blank(), blank()
    ], { weak: 'fisico' }),
    E('goblinArqueiro', N('Goblin Arqueiro', 'Goblin Archer'), 5, 'estrada', 'goblin', [
      atk(2, 'back'), atk(2, 'back'), f(atk(3, 'back'), 'Flecha na Nuca', 'Neck Shot'),
      f(st('mark', 1, 'back'), 'Mira', 'Take Aim'), atk(1), blank()
    ], { decor: 'arco', row: 'back' }),
    E('goblinEscudeiro', N('Goblin Escudeiro', 'Goblin Shieldman'), 7, 'estrada', 'goblin', [
      sh(2), f(sh(3), 'Muralha de Sucata', 'Scrap Wall'), atk(2), atk(2),
      f(and(atk(2), sh(1)), 'Investida de Escudo', 'Shield Bash'), blank()
    ], { decor: 'escudo' }),
    E('loboFaminto', N('Lobo Faminto', 'Starving Wolf'), 6, 'estrada', 'besta', [
      atk(3), f(and(atk(2), st('bleed', 1)), 'Mordida Rasgante', 'Tearing Bite'),
      f(and(atk(2), st('bleed', 1)), 'Mordida Rasgante', 'Tearing Bite'),
      f(atk(2, 'weakest'), 'Caça o Ferido', 'Hunt the Wounded'),
      f(st('bleed', 2), 'Presas Fundas', 'Deep Fangs'), blank()
    ]),
    E('bandidoEstrada', N('Bandido de Estrada', 'Road Bandit'), 8, 'estrada', 'humanoide', [
      atk(3), atk(2), f(sp('roubaMoeda', 2), 'Mão Leve', 'Light Fingers'),
      f(sp('roubaMoeda', 2), 'Mão Leve', 'Light Fingers'),
      f(and(atk(2), sp('roubaMoeda', 1)), 'Assalto', 'Mugging'), blank()
    ], { decor: 'adaga' }),
    E('xamaGoblin', N('Xamã Goblin', 'Goblin Shaman'), 6, 'estrada', 'goblin', [
      f(heal(2), 'Canto de Lama', 'Mud Chant'), f(heal(2), 'Canto de Lama', 'Mud Chant'),
      st('weak', 1), atk(2, 'random'),
      f(and(heal(2), st('weak', 1)), 'Praga e Prece', 'Hex and Prayer'), blank()
    ], { decor: 'cajado', row: 'back' }),
    E('carrascoPequeno', N('Carrasco Pequeno', 'Small Executioner'), 9, 'estrada', 'humanoide', [
      f(sp('carrega'), 'Ergue o Machado', 'Raises the Axe'), f(sp('carrega'), 'Ergue o Machado', 'Raises the Axe'),
      f(sp('executa', 6), 'EXECUÇÃO', 'EXECUTION'), f(sp('executa', 6), 'EXECUÇÃO', 'EXECUTION'),
      atk(2), blank()
    ], { decor: 'capuz' }),
    E('corvoLadrao', N('Corvo Ladrão', 'Thief Crow'), 4, 'estrada', 'ave', [
      sp('roubaMoeda', 1), sp('roubaMoeda', 1),
      f(atk(2, 'back'), 'Bico Certeiro', 'True Beak'), f(atk(2, 'back'), 'Bico Certeiro', 'True Beak'),
      f(sp('fugir'), 'Voa Embora', 'Flies Away'), blank()
    ], { row: 'back' }),
    E('goblinExplosivo', N('Goblin Explosivo', 'Bomber Goblin'), 5, 'estrada', 'goblin', [
      f(sp('acende'), 'Acende o Pavio', 'Lights the Fuse'), f(sp('acende'), 'Acende o Pavio', 'Lights the Fuse'),
      f(sp('explode', 4), 'KABUM!', 'KABOOM!'), f(sp('explode', 4), 'KABUM!', 'KABOOM!'),
      atk(1), blank()
    ], { decor: 'bomba' }),
    E('capitaoGoblin', N('Capitão Goblin', 'Goblin Captain'), 10, 'estrada', 'goblin', [
      atk(3), f(summon('goblinFraco'), 'Reforços!', 'Reinforcements!'),
      f(summon('goblinFraco'), 'Reforços!', 'Reinforcements!'),
      f(st('inspire', 1, 'allyE'), 'Grito de Guerra', 'War Cry'),
      f(and(atk(2), st('inspire', 1, 'allyE')), 'Avante!', 'Charge!'), blank()
    ], { decor: 'coroa' }),

    // ===== REGIÃO 2: FLORESTA PODRE (d6, veneno em camadas) =====
    E('slimeVerde', N('Slime Verde', 'Green Slime'), 6, 'floresta', 'slime', [
      atk(2), atk(2), st('poison', 1), st('poison', 1),
      f(and(atk(2), st('poison', 1)), 'Baba Ácida', 'Acid Drool'), f(sh(2), 'Endurece', 'Hardens')
    ], { resist: 'veneno' }),
    E('esporoVivo', N('Esporo Vivo', 'Living Spore'), 4, 'floresta', 'planta', [
      f(st('poison', 2, 'random'), 'Nuvem de Esporos', 'Spore Cloud'),
      f(st('poison', 2, 'random'), 'Nuvem de Esporos', 'Spore Cloud'),
      f(st('poison', 2, 'random'), 'Nuvem de Esporos', 'Spore Cloud'),
      f(sp('explodeVeneno', 1), 'Estouro Tóxico', 'Toxic Burst'),
      f(sp('explodeVeneno', 1), 'Estouro Tóxico', 'Toxic Burst'), blank()
    ], { decor: 'esporo' }),
    E('ratoPestilento', N('Rato Pestilento', 'Plague Rat'), 5, 'floresta', 'besta', [
      atk(2), f(atk(2, 'weakest'), 'Fareja Sangue', 'Smells Blood'), st('poison', 1),
      f(and(atk(1), st('poison', 1)), 'Mordida Imunda', 'Filthy Bite'),
      f(and(atk(1), st('poison', 1)), 'Mordida Imunda', 'Filthy Bite'), blank()
    ]),
    E('aranhaCasca', N('Aranha de Casca', 'Bark Spider'), 7, 'floresta', 'inseto', [
      f(st('chained', 1), 'Teia', 'Web'), f(st('chained', 1), 'Teia', 'Web'), atk(3),
      f(and(atk(2), st('poison', 1)), 'Picada', 'Venom Sting'),
      f(atk(2, 'back'), 'Bote do Galho', 'Branch Pounce'), blank()
    ]),
    E('florMordedora', N('Flor Mordedora', 'Biting Flower'), 8, 'floresta', 'planta', [
      atk(3), atk(3), f(st('bleed', 2), 'Pétalas-Navalha', 'Razor Petals'),
      f(heal(2, 'self'), 'Fotossíntese', 'Photosynthesis'), f(heal(2, 'self'), 'Fotossíntese', 'Photosynthesis'),
      f(drain(2), 'Seiva Vital', 'Vital Sap')
    ]),
    E('druidaCorrompido', N('Druida Corrompido', 'Corrupt Druid'), 8, 'floresta', 'humanoide', [
      f(heal(3), 'Rezo Podre', 'Rotten Prayer'), f(summon('esporoVivo'), 'Brota Esporo', 'Sprouts a Spore'),
      f(summon('esporoVivo'), 'Brota Esporo', 'Sprouts a Spore'), st('poison', 2, 'random'),
      f(and(heal(2), st('weak', 1)), 'Troca Injusta', 'Unfair Trade'), blank()
    ], { decor: 'cajado', row: 'back' }),
    E('cogumeloExplosivo', N('Cogumelo Explosivo', 'Blast Shroom'), 5, 'floresta', 'planta', [
      f(sp('acende'), 'Incha...', 'Swelling...'), f(sp('acende'), 'Incha...', 'Swelling...'),
      f(sp('acende'), 'Incha...', 'Swelling...'),
      f(sp('explodeVeneno', 3), 'NUVEM MORTAL', 'DEADLY CLOUD'),
      f(sp('explodeVeneno', 3), 'NUVEM MORTAL', 'DEADLY CLOUD'), blank()
    ], { decor: 'esporo' }),
    E('cobraRaiz', N('Cobra de Raiz', 'Root Snake'), 6, 'floresta', 'serpente', [
      atk(3), f(st('poison', 2), 'Veneno de Raiz', 'Root Venom'), f(st('poison', 2), 'Veneno de Raiz', 'Root Venom'),
      f(sp('esconde'), 'Enterra-se', 'Burrows'),
      f(and(atk(2), st('poison', 1)), 'Bote', 'Strike'), atk(2, 'weakest')
    ]),
    E('vespaGigante', N('Vespa Gigante', 'Giant Wasp'), 5, 'floresta', 'inseto', [
      f(atk(2, 'back'), 'Ferroada', 'Sting'), f(atk(2, 'back'), 'Ferroada', 'Sting'),
      f(atk(2, 'back'), 'Ferroada', 'Sting'), st('poison', 1, 'back'),
      f(and(atk(1, 'back'), st('poison', 1, 'back')), 'Ferrão Duplo', 'Double Sting'), atk(2, 'random')
    ], { decor: 'ferrao', row: 'back' }),
    E('guardiaoMusgo', N('Guardião de Musgo', 'Moss Warden'), 11, 'floresta', 'construto', [
      f(sh(3), 'Casca de Pedra', 'Stone Bark'), f(sh(3), 'Casca de Pedra', 'Stone Bark'),
      atk(3), atk(3), f(st('weak', 1), 'Pólen Pesado', 'Heavy Pollen'),
      f(and(sh(2), atk(2)), 'Avanço Musgoso', 'Mossy Advance')
    ], { resist: 'veneno', decor: 'nucleo' }),

    // ===== REGIÃO 3: CRIPTA DOS OSSOS (d8, implacáveis) =====
    E('esqueletoFracoE', N('Esqueleto Fraco', 'Weak Skeleton'), 5, 'cripta', 'esqueleto', [
      atk(2), atk(2), atk(2), atk(3), atk(3), sh(2), sh(1),
      f(st('fear', 1), 'Olhar Vazio', 'Hollow Stare')
    ], { kind: 'undead', resist: 'sangramento' }),
    E('esqueletoArqueiro', N('Esqueleto Arqueiro', 'Skeleton Archer'), 6, 'cripta', 'esqueleto', [
      f(atk(2, 'back'), 'Flecha de Osso', 'Bone Arrow'), f(atk(2, 'back'), 'Flecha de Osso', 'Bone Arrow'),
      f(atk(2, 'back'), 'Flecha de Osso', 'Bone Arrow'), atk(3, 'back'), atk(3, 'back'),
      f(st('mark', 1, 'random'), 'Mira Morta', 'Dead Aim'),
      f(atk(4, 'marked'), 'Na Mosca', 'Bullseye'), atk(1)
    ], { kind: 'undead', decor: 'arco', row: 'back', resist: 'sangramento' }),
    E('caveiraSaltante', N('Caveira Saltante', 'Leaping Skull'), 3, 'cripta', 'esqueleto', [
      f(atk(2, 'random'), 'Salta e Morde', 'Leap and Bite'), f(atk(2, 'random'), 'Salta e Morde', 'Leap and Bite'),
      f(atk(2, 'random'), 'Salta e Morde', 'Leap and Bite'), f(atk(2, 'random'), 'Salta e Morde', 'Leap and Bite'),
      f(atk(3, 'random'), 'Craniada', 'Skull Slam'), sh(1), blank(), blank()
    ], { kind: 'undead', resist: 'sangramento' }),
    E('fantasmaBaixo', N('Fantasma Baixo', 'Lesser Ghost'), 5, 'cripta', 'fantasma', [
      f(st('fear', 1), 'Lamento', 'Wail'), f(st('fear', 1), 'Lamento', 'Wail'),
      f(atk(2, 'back'), 'Toque Gélido', 'Chilling Touch'), f(atk(2, 'back'), 'Toque Gélido', 'Chilling Touch'),
      f(sp('esconde'), 'Some na Parede', 'Fades into the Wall'), f(sp('esconde'), 'Some na Parede', 'Fades into the Wall'),
      f(atk(3), 'Grito', 'Shriek'), blank()
    ], { kind: 'undead', resist: 'fisico', weak: 'magia' }),
    E('zumbiPesado', N('Zumbi Pesado', 'Heavy Zombie'), 12, 'cripta', 'humanoide', [
      atk(3), atk(3), atk(3), f(atk(4), 'Braçada Podre', 'Rotten Swing'),
      f(atk(4), 'Braçada Podre', 'Rotten Swing'), st('poison', 1),
      f(blank(), 'Cambaleia', 'Staggers'), f(blank(), 'Cambaleia', 'Staggers')
    ], { kind: 'undead', decor: 'capuz' }),
    E('necromanteMenor', N('Necromante Menor', 'Lesser Necromancer'), 7, 'cripta', 'humanoide', [
      f(summon('esqueletoFracoE'), 'Ergue os Mortos', 'Raise the Dead'),
      f(summon('esqueletoFracoE'), 'Ergue os Mortos', 'Raise the Dead'),
      f(st('curse', 1, 'random'), 'Praga', 'Blight'), f(st('curse', 1, 'random'), 'Praga', 'Blight'),
      f(heal(2), 'Costura Ossos', 'Stitches Bone'), atk(2, 'back'), sh(2), blank()
    ], { kind: 'undead', decor: 'cajado', row: 'back' }),
    E('armaduraVazia', N('Armadura Vazia', 'Empty Armor'), 12, 'cripta', 'cavaleiro', [
      f(sh(3), 'Fecha a Guarda', 'Closes Guard'), f(sh(3), 'Fecha a Guarda', 'Closes Guard'),
      f(st('counter', 2, 'self'), 'Postura de Lâmina', 'Blade Stance'),
      f(st('counter', 2, 'self'), 'Postura de Lâmina', 'Blade Stance'),
      atk(3), atk(3), f(and(sh(2), st('counter', 1, 'self')), 'Muralha Viva', 'Living Wall'),
      f(atk(4), 'Estocada', 'Thrust')
    ], { kind: 'undead', weak: 'magia', resist: 'sangramento' }),
    E('maoRastejante', N('Mão Rastejante', 'Crawling Hand'), 4, 'cripta', 'inseto', [
      f(st('chained', 1), 'Agarra', 'Grabs'), f(st('chained', 1), 'Agarra', 'Grabs'),
      f(st('stun', 1), 'Aperta a Garganta', 'Chokes'), atk(2), atk(2), atk(2), blank(), blank()
    ], { kind: 'undead' }),
    E('mongeMorto', N('Monge Morto', 'Dead Monk'), 8, 'cripta', 'humanoide', [
      atk(2), atk(2),
      f(atk(2, null, { times: 2 }), 'Rajada de Palmas', 'Palm Flurry'),
      f(atk(2, null, { times: 2 }), 'Rajada de Palmas', 'Palm Flurry'),
      f(st('silence', 1), 'Voto de Silêncio', 'Vow of Silence'),
      f(atk(4), 'Punho do Vazio', 'Void Fist'), sh(2), blank()
    ], { kind: 'undead', decor: 'capuz' }),
    E('caoDeOssos', N('Cão de Ossos', 'Bone Hound'), 7, 'cripta', 'besta', [
      atk(3), atk(3), atk(3),
      f(and(atk(2), st('bleed', 1)), 'Presas de Osso', 'Bone Fangs'),
      f(and(atk(2), st('bleed', 1)), 'Presas de Osso', 'Bone Fangs'),
      f(atk(3, 'weakest'), 'Fareja o Medo', 'Smells Fear'), st('fear', 1), blank()
    ], { kind: 'undead', decor: 'osso', resist: 'sangramento' }),

    // ===== REGIÃO 4: FORJA INFERNAL (d8, fogo e carga) =====
    E('automatoPequeno', N('Autômato Pequeno', 'Small Automaton'), 7, 'forja', 'maquina', [
      atk(2), atk(2), f(sh(2), 'Placas', 'Plating'), f(sh(2), 'Placas', 'Plating'),
      atk(3), atk(3), f(and(sh(1), atk(2)), 'Rotina de Guarda', 'Guard Routine'),
      f(blank(), 'Engasga', 'Jams')
    ], { resist: 'veneno' }),
    E('forjadorLouco', N('Forjador Louco', 'Mad Forger'), 9, 'forja', 'humanoide', [
      f(sp('forjaEscudo', 3), 'Verte Bronze', 'Pours Bronze'), f(sp('forjaEscudo', 3), 'Verte Bronze', 'Pours Bronze'),
      atk(3), atk(3), f(st('burn', 1), 'Fagulhas', 'Sparks'), f(st('burn', 1), 'Fagulhas', 'Sparks'),
      f(and(atk(2), st('burn', 1)), 'Ferro Quente', 'Hot Iron'), heal(2, 'self')
    ], { decor: 'capuz' }),
    E('slimeLava', N('Slime de Lava', 'Lava Slime'), 7, 'forja', 'slime', [
      atk(2), atk(2), f(st('burn', 2), 'Respingo de Magma', 'Magma Splash'),
      f(st('burn', 2), 'Respingo de Magma', 'Magma Splash'), f(st('burn', 2), 'Respingo de Magma', 'Magma Splash'),
      f(and(atk(2), st('burn', 1)), 'Abraço Ardente', 'Burning Embrace'),
      f(and(atk(2), st('burn', 1)), 'Abraço Ardente', 'Burning Embrace'), f(sh(2), 'Crosta', 'Crust')
    ], { decor: 'lava', resist: 'fogo' }),
    E('demonioBrasa', N('Demônio de Brasa', 'Ember Demon'), 8, 'forja', 'demonio', [
      st('burn', 2), st('burn', 2), atk(3), atk(3),
      f(atk(2, 'random'), 'Chicote de Chama', 'Flame Whip'), f(atk(2, 'random'), 'Chicote de Chama', 'Flame Whip'),
      f(and(atk(3), st('burn', 1)), 'Garra Incandescente', 'Searing Claw'),
      f(st('burn', 1, 'allH'), 'Onda de Calor', 'Heat Wave')
    ], { kind: 'demon', resist: 'fogo' }),
    E('torretaQuebrada', N('Torreta Quebrada', 'Broken Turret'), 6, 'forja', 'maquina', [
      f(atk(2, 'back'), 'Disparo', 'Shot'), f(atk(2, 'back'), 'Disparo', 'Shot'), f(atk(2, 'back'), 'Disparo', 'Shot'),
      atk(3, 'back'), atk(3, 'back'),
      f(atk(2, 'back', { times: 2 }), 'RAJADA', 'BURST FIRE'),
      f(blank(), 'TRAVADA', 'JAMMED'), f(blank(), 'TRAVADA', 'JAMMED')
    ], { row: 'back' }),
    E('mineiroPossuido', N('Mineiro Possuído', 'Possessed Miner'), 10, 'forja', 'humanoide', [
      f(atk(4), 'Picareta', 'Pickaxe'), f(atk(4), 'Picareta', 'Pickaxe'),
      f(sp('carrega'), 'Olhos Vermelhos', 'Red Eyes'), f(sp('carrega'), 'Olhos Vermelhos', 'Red Eyes'),
      f(sp('executa', 7), 'GOLPE PROFUNDO', 'DEEP STRIKE'), f(sp('executa', 7), 'GOLPE PROFUNDO', 'DEEP STRIKE'),
      atk(2), blank()
    ], { kind: 'demon' }),
    E('caoDeFerro', N('Cão de Ferro', 'Iron Hound'), 9, 'forja', 'besta', [
      atk(3), atk(3), atk(3),
      f(and(atk(2), st('bleed', 1)), 'Mandíbula de Aço', 'Steel Jaws'),
      f(and(atk(2), st('bleed', 1)), 'Mandíbula de Aço', 'Steel Jaws'),
      f(sh(2), 'Eriça as Placas', 'Bristles Plates'), f(sh(2), 'Eriça as Placas', 'Bristles Plates'),
      f(atk(4, 'weakest'), 'Caçada', 'The Hunt')
    ], { resist: 'sangramento' }),
    E('carrascoCorrentes', N('Carrasco de Correntes', 'Chain Executioner'), 11, 'forja', 'demonio', [
      f(st('chained', 1, 'random'), 'Correntes', 'Chains'), f(st('chained', 1, 'random'), 'Correntes', 'Chains'),
      atk(4), atk(4), f(st('vulnerable', 1), 'Expõe a Carne', 'Exposes Flesh'),
      f(st('vulnerable', 1), 'Expõe a Carne', 'Exposes Flesh'),
      f(and(st('chained', 1), atk(3)), 'Puxão Brutal', 'Brutal Pull'), blank()
    ], { kind: 'demon' }),
    E('espiritoForja', N('Espírito da Forja', 'Forge Spirit'), 6, 'forja', 'fantasma', [
      f(st('burn', 1, 'allH'), 'Sopro de Fornalha', 'Furnace Breath'),
      f(st('burn', 1, 'allH'), 'Sopro de Fornalha', 'Furnace Breath'),
      f(heal(2), 'Aquece Aliado', 'Warms an Ally'), st('burn', 2), st('burn', 2),
      atk(3, 'random'), f(and(st('burn', 1, 'allH'), heal(1, 'self')), 'Devora Calor', 'Devours Heat'), blank()
    ], { kind: 'demon', resist: 'fogo', weak: 'gelo', row: 'back' }),
    E('canhaoVivo', N('Canhão Vivo', 'Living Cannon'), 8, 'forja', 'maquina', [
      f(sp('carrega'), 'CARREGANDO...', 'LOADING...'), f(sp('carrega'), 'CARREGANDO...', 'LOADING...'),
      f(sp('carrega'), 'CARREGANDO...', 'LOADING...'),
      f(sp('executa', 8), 'BOOM', 'BOOM'), f(sp('executa', 8), 'BOOM', 'BOOM'),
      atk(2), f(blank(), 'Solta Fumaça', 'Puffs Smoke'), f(blank(), 'Solta Fumaça', 'Puffs Smoke')
    ], { decor: 'chamine' }),

    // ===== REGIÃO 5: CIDADE DAS MÁSCARAS (d10, precisos e traiçoeiros) =====
    E('assassinoMascarado', N('Assassino Mascarado', 'Masked Assassin'), 7, 'mascaras', 'humanoide', [
      f(st('mark', 1, 'back'), 'Marca a Vítima', 'Marks the Victim'),
      f(st('mark', 1, 'back'), 'Marca a Vítima', 'Marks the Victim'),
      f(atk(4, 'marked'), 'Lâmina Silenciosa', 'Silent Blade'),
      f(atk(4, 'marked'), 'Lâmina Silenciosa', 'Silent Blade'),
      f(atk(4, 'marked'), 'Lâmina Silenciosa', 'Silent Blade'),
      sp('esconde'), sp('esconde'), atk(2),
      f(atk(3, 'back'), 'Punhalada', 'Backstab'), f(atk(3, 'back'), 'Punhalada', 'Backstab')
    ], { decor: 'mascara' }),
    E('duelistaCaido', N('Duelista Caído', 'Fallen Duelist'), 9, 'mascaras', 'humanoide', [
      atk(3), atk(3), atk(3),
      f(st('counter', 2, 'self'), 'En Garde', 'En Garde'), f(st('counter', 2, 'self'), 'En Garde', 'En Garde'),
      f(st('counter', 2, 'self'), 'En Garde', 'En Garde'),
      f(and(atk(2), st('counter', 1, 'self')), 'Riposta', 'Riposte'),
      f(and(atk(2), st('counter', 1, 'self')), 'Riposta', 'Riposte'),
      f(atk(5), 'Estocada Perfeita', 'Perfect Lunge'), sh(2)
    ], { decor: 'espada' }),
    E('nobreVenenoso', N('Nobre Venenoso', 'Venomous Noble'), 8, 'mascaras', 'humanoide', [
      f(st('poison', 2), 'Vinho Envenenado', 'Poisoned Wine'), f(st('poison', 2), 'Vinho Envenenado', 'Poisoned Wine'),
      f(st('poison', 2), 'Vinho Envenenado', 'Poisoned Wine'),
      st('weak', 1), st('weak', 1), atk(2), atk(2),
      f(and(st('poison', 1), st('weak', 1)), 'Beijo Nobre', 'Noble Kiss'),
      f(and(st('poison', 1), st('weak', 1)), 'Beijo Nobre', 'Noble Kiss'),
      f(heal(2, 'self'), 'Antídoto Próprio', 'Private Antidote')
    ], { decor: 'mascara', row: 'back' }),
    E('mimicoRua', N('Mímico de Rua', 'Street Mimic'), 6, 'mascaras', 'marionete', [
      f(sp('copiaMaiorDado'), 'Espelho Cruel', 'Cruel Mirror'), f(sp('copiaMaiorDado'), 'Espelho Cruel', 'Cruel Mirror'),
      f(sp('copiaMaiorDado'), 'Espelho Cruel', 'Cruel Mirror'), f(sp('copiaMaiorDado'), 'Espelho Cruel', 'Cruel Mirror'),
      atk(2), atk(2), atk(2), sh(2), sh(2),
      f(st('fear', 1), 'Rosto Errado', 'Wrong Face')
    ], {}),
    E('espiaoCego', N('Espião Cego', 'Blind Spy'), 7, 'mascaras', 'humanoide', [
      f(st('blind', 1), 'Pó nos Olhos', 'Dust in the Eyes'), f(st('blind', 1), 'Pó nos Olhos', 'Dust in the Eyes'),
      f(st('blind', 1), 'Pó nos Olhos', 'Dust in the Eyes'),
      f(atk(3, 'back'), 'Faca no Escuro', 'Knife in the Dark'),
      f(atk(3, 'back'), 'Faca no Escuro', 'Knife in the Dark'),
      f(atk(3, 'back'), 'Faca no Escuro', 'Knife in the Dark'),
      st('mark', 1), st('mark', 1),
      f(and(st('blind', 1), atk(2)), 'Golpe às Cegas', 'Blind Strike'),
      f(and(st('blind', 1), atk(2)), 'Golpe às Cegas', 'Blind Strike')
    ], { decor: 'capuz' }),
    E('marioneteViva', N('Marionete Viva', 'Living Marionette'), 8, 'mascaras', 'marionete', [
      atk(2), atk(2),
      f(atk(2, null, { times: 2 }), 'Dança de Cordas', 'String Dance'),
      f(atk(2, null, { times: 2 }), 'Dança de Cordas', 'String Dance'),
      f(atk(2, null, { times: 2 }), 'Dança de Cordas', 'String Dance'),
      st('fear', 1), st('fear', 1), sh(2),
      f(atk(1, 'random', { times: 3 }), 'Chicote de Fios', 'Wire Whip'),
      f(atk(1, 'random', { times: 3 }), 'Chicote de Fios', 'Wire Whip')
    ], { weak: 'fogo' }),
    E('carruagemFantasma', N('Carruagem Fantasma', 'Ghost Carriage'), 12, 'mascaras', 'fantasma', [
      f(atk(4), 'Atropelo', 'Trample'), f(atk(4), 'Atropelo', 'Trample'),
      f(sp('atropela', 3), 'CARGA FANTASMA', 'GHOST CHARGE'), f(sp('atropela', 3), 'CARGA FANTASMA', 'GHOST CHARGE'),
      f(sp('atropela', 3), 'CARGA FANTASMA', 'GHOST CHARGE'),
      sh(3), sh(3), f(st('fear', 1, 'allH'), 'Relincho do Além', 'Otherworldly Neigh'),
      atk(3), heal(2, 'self')
    ], { kind: 'undead', resist: 'fisico' }),
    E('guardaCorrompido', N('Guarda Corrompido', 'Corrupt Guard'), 10, 'mascaras', 'cavaleiro', [
      f(sh(3), 'Escudo da Coroa', 'Crown Shield'), f(sh(3), 'Escudo da Coroa', 'Crown Shield'),
      f(sh(3), 'Escudo da Coroa', 'Crown Shield'),
      atk(3), atk(3), atk(3),
      f(st('vulnerable', 1), 'Quebra-Guarda', 'Guard Break'), f(st('vulnerable', 1), 'Quebra-Guarda', 'Guard Break'),
      f(and(sh(2), atk(2)), 'Avanço em Formação', 'Formation Advance'),
      f(and(sh(2), atk(2)), 'Avanço em Formação', 'Formation Advance')
    ], {}),
    E('ilusionistaMenor', N('Ilusionista Menor', 'Lesser Illusionist'), 6, 'mascaras', 'humanoide', [
      f(sp('bloqueiaDado'), 'Sela um Dado', 'Seals a Die'), f(sp('bloqueiaDado'), 'Sela um Dado', 'Seals a Die'),
      f(sp('bloqueiaDado'), 'Sela um Dado', 'Seals a Die'),
      st('blind', 1), st('blind', 1),
      f(atk(2, 'random'), 'Truque Cruel', 'Cruel Trick'), f(atk(2, 'random'), 'Truque Cruel', 'Cruel Trick'),
      f(atk(2, 'random'), 'Truque Cruel', 'Cruel Trick'),
      f(and(st('blind', 1, 'random'), atk(2, 'random')), 'Névoa e Faca', 'Mist and Knife'),
      f(and(st('blind', 1, 'random'), atk(2, 'random')), 'Névoa e Faca', 'Mist and Knife')
    ], { decor: 'mascara', row: 'back' }),
    E('medicoLouco', N('Médico Louco', 'Mad Doctor'), 8, 'mascaras', 'humanoide', [
      f(heal(3), 'Sutura Torta', 'Crooked Suture'), f(heal(3), 'Sutura Torta', 'Crooked Suture'),
      f(heal(3), 'Sutura Torta', 'Crooked Suture'),
      f(st('poison', 2), 'Injeção', 'Injection'), f(st('poison', 2), 'Injeção', 'Injection'),
      f(st('poison', 2), 'Injeção', 'Injection'),
      f(sp('curaTudo', 1), 'Elixir para Todos', 'Elixir for All'), f(sp('curaTudo', 1), 'Elixir para Todos', 'Elixir for All'),
      f(and(heal(2), st('poison', 1)), 'Cura Dolorosa', 'Painful Cure'),
      f(atk(2), 'Serra de Osso', 'Bone Saw')
    ], { decor: 'mascara', row: 'back' }),

    // ===== REGIÃO 6: DESERTO DE VIDRO (d10, brilho e maldição) =====
    E('escorpiaoVidro', N('Escorpião de Vidro', 'Glass Scorpion'), 7, 'deserto', 'inseto', [
      atk(3), atk(3), f(st('poison', 2), 'Ferrão de Vidro', 'Glass Stinger'),
      f(st('poison', 2), 'Ferrão de Vidro', 'Glass Stinger'), f(st('poison', 2), 'Ferrão de Vidro', 'Glass Stinger'),
      f(st('counter', 1, 'self'), 'Carapaça Afiada', 'Sharp Carapace'),
      f(st('counter', 1, 'self'), 'Carapaça Afiada', 'Sharp Carapace'),
      f(and(atk(2), st('poison', 2)), 'Bote Duplo', 'Twin Strike'),
      f(and(atk(2), st('poison', 2)), 'Bote Duplo', 'Twin Strike'),
      f(atk(5), 'Ferroada Profunda', 'Deep Sting')
    ], { decor: 'ferrao', weak: 'fisico' }),
    E('bandidoSol', N('Bandido do Sol', 'Sun Bandit'), 8, 'deserto', 'humanoide', [
      atk(3), atk(3), atk(3), sp('roubaMoeda', 2), sp('roubaMoeda', 2),
      f(st('blind', 1), 'Areia nos Olhos', 'Sand in the Eyes'), f(st('blind', 1), 'Areia nos Olhos', 'Sand in the Eyes'),
      f(and(atk(2), sp('roubaMoeda', 2)), 'Bote do Meio-Dia', 'High Noon Heist'),
      f(and(atk(2), sp('roubaMoeda', 2)), 'Bote do Meio-Dia', 'High Noon Heist'),
      atk(4, 'weakest')
    ], { decor: 'adaga' }),
    E('magoAreia', N('Mago de Areia', 'Sand Mage'), 7, 'deserto', 'humanoide', [
      st('blind', 1, 'random'), st('blind', 1, 'random'),
      f(atk(3, 'random'), 'Jato de Areia', 'Sand Blast'), f(atk(3, 'random'), 'Jato de Areia', 'Sand Blast'),
      f(atk(3, 'random'), 'Jato de Areia', 'Sand Blast'),
      f(sh(2), 'Véu de Poeira', 'Dust Veil'), f(sh(2), 'Véu de Poeira', 'Dust Veil'),
      f(atk(2, 'random', { times: 2 }), 'Tempestade Menor', 'Lesser Storm'),
      f(atk(2, 'random', { times: 2 }), 'Tempestade Menor', 'Lesser Storm'),
      f(st('slow', 1, 'allH'), 'Areia Pesada', 'Heavy Sand')
    ], { decor: 'cajado', row: 'back' }),
    E('cobraCristalina', N('Cobra Cristalina', 'Crystal Snake'), 6, 'deserto', 'serpente', [
      atk(2), atk(2), st('poison', 2), st('poison', 2), st('poison', 2),
      f(sp('reflete'), 'Escamas-Espelho', 'Mirror Scales'), f(sp('reflete'), 'Escamas-Espelho', 'Mirror Scales'),
      f(and(atk(2), st('poison', 2)), 'Presa de Cristal', 'Crystal Fang'),
      f(and(atk(2), st('poison', 2)), 'Presa de Cristal', 'Crystal Fang'),
      f(drain(3), 'Suga o Calor', 'Drinks the Heat')
    ], {}),
    E('golemAreia', N('Golem de Areia', 'Sand Golem'), 13, 'deserto', 'construto', [
      f(sh(3), 'Reergue-se da Areia', 'Rises from Sand'), f(sh(3), 'Reergue-se da Areia', 'Rises from Sand'),
      f(sh(3), 'Reergue-se da Areia', 'Rises from Sand'),
      f(atk(4), 'Punho de Duna', 'Dune Fist'), f(atk(4), 'Punho de Duna', 'Dune Fist'),
      f(atk(4), 'Punho de Duna', 'Dune Fist'),
      sp('regenera', 2), sp('regenera', 2),
      f(and(sh(2), atk(3)), 'Avalanche', 'Avalanche'), f(and(sh(2), atk(3)), 'Avalanche', 'Avalanche')
    ], { resist: 'fisico' }),
    E('abutreOsso', N('Abutre de Osso', 'Bone Vulture'), 6, 'deserto', 'ave', [
      f(atk(2, 'weakest'), 'Círculos no Céu', 'Circling Above'), f(atk(2, 'weakest'), 'Círculos no Céu', 'Circling Above'),
      f(atk(2, 'weakest'), 'Círculos no Céu', 'Circling Above'),
      atk(3, 'weakest'), atk(3, 'weakest'),
      f(st('bleed', 1), 'Bicada', 'Peck'), f(st('bleed', 1), 'Bicada', 'Peck'),
      f(sp('fugir'), 'Levanta Voo', 'Takes Flight'),
      f(and(atk(2, 'weakest'), st('bleed', 1)), 'Rasga a Carniça', 'Tears Carrion'),
      f(and(atk(2, 'weakest'), st('bleed', 1)), 'Rasga a Carniça', 'Tears Carrion')
    ], { kind: 'undead' }),
    E('guardiaoSolar', N('Guardião Solar', 'Solar Warden'), 10, 'deserto', 'cavaleiro', [
      f(st('burn', 1, 'allH'), 'Julgamento Solar', 'Solar Judgment'),
      f(st('burn', 1, 'allH'), 'Julgamento Solar', 'Solar Judgment'),
      f(st('burn', 1, 'allH'), 'Julgamento Solar', 'Solar Judgment'),
      sh(3), sh(3), atk(3), atk(3), atk(3),
      f(and(atk(3), st('burn', 1)), 'Lâmina do Meio-Dia', 'Midday Blade'),
      f(and(atk(3), st('burn', 1)), 'Lâmina do Meio-Dia', 'Midday Blade')
    ], { resist: 'fogo' }),
    E('caravaneiroMaldito', N('Caravaneiro Maldito', 'Cursed Caravaneer'), 9, 'deserto', 'humanoide', [
      f(st('curse', 1), 'Praga do Deserto', 'Desert Blight'), f(st('curse', 1), 'Praga do Deserto', 'Desert Blight'),
      f(st('curse', 1), 'Praga do Deserto', 'Desert Blight'),
      atk(3), atk(3), atk(3),
      f(sp('roubaMoeda', 3), 'Pedágio', 'Toll'), f(sp('roubaMoeda', 3), 'Pedágio', 'Toll'),
      f(and(st('curse', 1), atk(2)), 'Cobrança Final', 'Final Collection'),
      f(and(st('curse', 1), atk(2)), 'Cobrança Final', 'Final Collection')
    ], { decor: 'capuz' }),
    E('espiritoMiragem', N('Espírito da Miragem', 'Mirage Spirit'), 6, 'deserto', 'fantasma', [
      f(sp('esconde'), 'Vira Miragem', 'Becomes Mirage'), f(sp('esconde'), 'Vira Miragem', 'Becomes Mirage'),
      f(sp('esconde'), 'Vira Miragem', 'Becomes Mirage'),
      f(atk(3, 'random'), 'Golpe do Nada', 'Strike from Nowhere'),
      f(atk(3, 'random'), 'Golpe do Nada', 'Strike from Nowhere'),
      f(atk(3, 'random'), 'Golpe do Nada', 'Strike from Nowhere'),
      st('fear', 1), st('fear', 1),
      f(and(atk(2, 'random'), sp('esconde')), 'Toca e Some', 'Touch and Vanish'),
      f(and(atk(2, 'random'), sp('esconde')), 'Toca e Some', 'Touch and Vanish')
    ], { resist: 'fisico', weak: 'magia' }),
    E('ladraoAgua', N('Ladrão de Água', 'Water Thief'), 7, 'deserto', 'humanoide', [
      f(drain(2), 'Rouba o Cantil', 'Steals the Canteen'), f(drain(2), 'Rouba o Cantil', 'Steals the Canteen'),
      f(drain(2), 'Rouba o Cantil', 'Steals the Canteen'), f(drain(2), 'Rouba o Cantil', 'Steals the Canteen'),
      atk(2), atk(2), st('weak', 1), st('weak', 1),
      f(and(drain(2), st('weak', 1)), 'Sede', 'Thirst'), f(and(drain(2), st('weak', 1)), 'Sede', 'Thirst')
    ], { decor: 'adaga' }),

    // ===== REGIÃO 7: MAR PROFUNDO (d12, esmagadores) =====
    E('peixeAbissal', N('Peixe Abissal', 'Abyssal Fish'), 6, 'mar', 'marinho', [
      f(atk(3), 'Dentada', 'Chomp'), f(atk(3), 'Dentada', 'Chomp'), f(atk(3), 'Dentada', 'Chomp'),
      f(atk(3), 'Dentada', 'Chomp'),
      f(st('fear', 1), 'Luz do Abismo', 'Abyssal Light'), f(st('fear', 1), 'Luz do Abismo', 'Abyssal Light'),
      f(st('fear', 1), 'Luz do Abismo', 'Abyssal Light'),
      atk(2), atk(2),
      f(and(atk(3), st('fear', 1)), 'Bote das Trevas', 'Strike from the Dark'),
      f(and(atk(3), st('fear', 1)), 'Bote das Trevas', 'Strike from the Dark'),
      f(atk(5), 'ENGOLIR', 'SWALLOW')
    ], {}),
    E('marinheiroAfogado', N('Marinheiro Afogado', 'Drowned Sailor'), 9, 'mar', 'humanoide', [
      atk(3), atk(3), atk(3), atk(3),
      f(st('weak', 1), 'Toque Gélido', 'Chilling Touch'), f(st('weak', 1), 'Toque Gélido', 'Chilling Touch'),
      f(st('weak', 1), 'Toque Gélido', 'Chilling Touch'),
      atk(4), atk(4), sh(2), sh(2),
      f(and(atk(3), st('weak', 1)), 'Abraço Afogado', 'Drowning Embrace')
    ], { kind: 'undead', decor: 'capuz' }),
    E('cultistaMar', N('Cultista do Mar', 'Sea Cultist'), 7, 'mar', 'humanoide', [
      f(st('curse', 1), 'Prece Abissal', 'Abyssal Prayer'), f(st('curse', 1), 'Prece Abissal', 'Abyssal Prayer'),
      f(st('curse', 1), 'Prece Abissal', 'Abyssal Prayer'),
      f(summon('peixeAbissal'), 'Chama do Fundo', 'Call from Below'),
      f(summon('peixeAbissal'), 'Chama do Fundo', 'Call from Below'),
      f(summon('peixeAbissal'), 'Chama do Fundo', 'Call from Below'),
      heal(2), heal(2),
      f(atk(2), 'Adaga de Coral', 'Coral Dagger'), f(atk(2), 'Adaga de Coral', 'Coral Dagger'),
      f(and(st('curse', 1), heal(2)), 'Barganha Salgada', 'Salt Bargain'),
      f(and(st('curse', 1), heal(2)), 'Barganha Salgada', 'Salt Bargain')
    ], { decor: 'capuz', row: 'back' }),
    E('caranguejoFerro', N('Caranguejo de Ferro', 'Iron Crab'), 11, 'mar', 'inseto', [
      f(sh(4), 'Fecha a Concha', 'Shell Up'), f(sh(4), 'Fecha a Concha', 'Shell Up'),
      f(sh(4), 'Fecha a Concha', 'Shell Up'), f(sh(4), 'Fecha a Concha', 'Shell Up'),
      f(atk(3), 'Pinça', 'Pincer'), f(atk(3), 'Pinça', 'Pincer'), f(atk(3), 'Pinça', 'Pincer'),
      st('counter', 2, 'self'), st('counter', 2, 'self'),
      f(and(sh(2), atk(3)), 'Guarda Blindada', 'Armored Guard'),
      f(and(sh(2), atk(3)), 'Guarda Blindada', 'Armored Guard'),
      f(atk(6), 'ESMAGADORA', 'CRUSHER')
    ], { resist: 'fisico' }),
    E('aguaVivaArcana', N('Água-Viva Arcana', 'Arcane Jellyfish'), 5, 'mar', 'marinho', [
      f(st('stun', 1), 'Choque', 'Shock'), f(st('stun', 1), 'Choque', 'Shock'), f(st('stun', 1), 'Choque', 'Shock'),
      atk(2, 'random'), atk(2, 'random'), atk(2, 'random'),
      f(st('silence', 1), 'Névoa Arcana', 'Arcane Mist'), f(st('silence', 1), 'Névoa Arcana', 'Arcane Mist'),
      f(and(atk(2, 'random'), st('stun', 1)), 'Tentáculo Elétrico', 'Electric Tendril'),
      f(and(atk(2, 'random'), st('stun', 1)), 'Tentáculo Elétrico', 'Electric Tendril'),
      f(atk(1, 'allH'), 'PULSO', 'PULSE'), f(atk(1, 'allH'), 'PULSO', 'PULSE')
    ], { weak: 'fisico', row: 'back' }),
    E('sereiaSombria', N('Sereia Sombria', 'Dark Siren'), 8, 'mar', 'humanoide', [
      f(st('fear', 1, 'allH'), 'Canto Sombrio', 'Dark Song'), f(st('fear', 1, 'allH'), 'Canto Sombrio', 'Dark Song'),
      f(st('fear', 1, 'allH'), 'Canto Sombrio', 'Dark Song'),
      f(st('mark', 1), 'Escolhe a Presa', 'Chooses Prey'), f(st('mark', 1), 'Escolhe a Presa', 'Chooses Prey'),
      f(st('mark', 1), 'Escolhe a Presa', 'Chooses Prey'),
      f(atk(4, 'marked'), 'Beijo Final', 'Final Kiss'), f(atk(4, 'marked'), 'Beijo Final', 'Final Kiss'),
      f(atk(4, 'marked'), 'Beijo Final', 'Final Kiss'),
      atk(2), atk(2),
      f(and(st('mark', 1), atk(2)), 'Encanta e Fere', 'Charm and Wound')
    ], { row: 'back' }),
    E('tentaculoSolto', N('Tentáculo Solto', 'Loose Tentacle'), 8, 'mar', 'marinho', [
      f(st('chained', 1), 'Enrosca', 'Coils'), f(st('chained', 1), 'Enrosca', 'Coils'),
      f(st('chained', 1), 'Enrosca', 'Coils'), f(st('chained', 1), 'Enrosca', 'Coils'),
      f(atk(4), 'Chicotada', 'Lash'), f(atk(4), 'Chicotada', 'Lash'), f(atk(4), 'Chicotada', 'Lash'),
      f(atk(4), 'Chicotada', 'Lash'),
      f(and(st('chained', 1), atk(3)), 'Aperto Esmagador', 'Crushing Grip'),
      f(and(st('chained', 1), atk(3)), 'Aperto Esmagador', 'Crushing Grip'),
      f(and(st('chained', 1), atk(3)), 'Aperto Esmagador', 'Crushing Grip'),
      f(atk(6), 'AÇOITE', 'SCOURGE')
    ], {}),
    E('polvoPequeno', N('Polvo Pequeno', 'Small Octopus'), 6, 'mar', 'marinho', [
      f(st('blind', 1), 'Nuvem de Tinta', 'Ink Cloud'), f(st('blind', 1), 'Nuvem de Tinta', 'Ink Cloud'),
      f(st('blind', 1), 'Nuvem de Tinta', 'Ink Cloud'), f(st('blind', 1), 'Nuvem de Tinta', 'Ink Cloud'),
      atk(2), atk(2), atk(2), sp('esconde'), sp('esconde'),
      f(and(st('blind', 1), atk(2)), 'Tinta e Bote', 'Ink and Strike'),
      f(and(st('blind', 1), atk(2)), 'Tinta e Bote', 'Ink and Strike'),
      f(atk(1, null, { times: 3 }), 'OITO BRAÇOS', 'EIGHT ARMS')
    ], {}),
    E('capitaoAfogado', N('Capitão Afogado', 'Drowned Captain'), 12, 'mar', 'humanoide', [
      f(atk(4), 'Sabre Enferrujado', 'Rusted Saber'), f(atk(4), 'Sabre Enferrujado', 'Rusted Saber'),
      f(atk(4), 'Sabre Enferrujado', 'Rusted Saber'),
      f(st('inspire', 1, 'allyE'), 'Ordens do Fundo', 'Orders from Below'),
      f(st('inspire', 1, 'allyE'), 'Ordens do Fundo', 'Orders from Below'),
      f(st('inspire', 1, 'allyE'), 'Ordens do Fundo', 'Orders from Below'),
      sh(3), sh(3),
      f(and(atk(3), st('inspire', 1, 'allyE')), 'Avante, Tripulação!', 'Onward, Crew!'),
      f(and(atk(3), st('inspire', 1, 'allyE')), 'Avante, Tripulação!', 'Onward, Crew!'),
      f(atk(5), 'Fúria do Capitão', 'Captain\'s Fury'), f(atk(5), 'Fúria do Capitão', 'Captain\'s Fury')
    ], { kind: 'undead', decor: 'espada' }),
    E('sinoSubmerso', N('Sino Submerso', 'Sunken Bell'), 9, 'mar', 'marinho', [
      f(st('fear', 1, 'allH'), 'Badalada Fúnebre', 'Funeral Toll'),
      f(st('fear', 1, 'allH'), 'Badalada Fúnebre', 'Funeral Toll'),
      f(st('fear', 1, 'allH'), 'Badalada Fúnebre', 'Funeral Toll'),
      st('stun', 1, 'random'), st('stun', 1, 'random'),
      f(sp('badalada', 2), 'DOBRE FINAL', 'FINAL KNELL'), f(sp('badalada', 2), 'DOBRE FINAL', 'FINAL KNELL'),
      f(sp('badalada', 2), 'DOBRE FINAL', 'FINAL KNELL'),
      f(atk(3), 'Onda de Choque', 'Shockwave'), f(atk(3), 'Onda de Choque', 'Shockwave'),
      f(and(st('fear', 1, 'allH'), atk(2, 'random')), 'Eco Afogado', 'Drowned Echo'),
      f(and(st('fear', 1, 'allH'), atk(2, 'random')), 'Eco Afogado', 'Drowned Echo')
    ], { decor: 'sino', resist: 'fisico', weak: 'magia' }),

    // ===== REGIÃO 8: TORRE DO DADO NEGRO (d12, o azar encarnado) =====
    E('dadoVivo', N('Dado Vivo', 'Living Die'), 8, 'torre', 'dado', [
      f(sp('rolaCaos'), 'Rola o Caos', 'Rolls Chaos'), f(sp('rolaCaos'), 'Rola o Caos', 'Rolls Chaos'),
      f(sp('rolaCaos'), 'Rola o Caos', 'Rolls Chaos'), f(sp('rolaCaos'), 'Rola o Caos', 'Rolls Chaos'),
      atk(3, 'random'), atk(3, 'random'), atk(3, 'random'),
      sh(2), sh(2),
      f(and(sp('rolaCaos'), atk(2, 'random')), 'Azar Duplo', 'Double Misfortune'),
      f(and(sp('rolaCaos'), atk(2, 'random')), 'Azar Duplo', 'Double Misfortune'),
      f(atk(6, 'random'), 'CRÍTICO!', 'CRITICAL!')
    ], {}),
    E('cavaleiroAcaso', N('Cavaleiro do Acaso', 'Knight of Chance'), 12, 'torre', 'cavaleiro', [
      f(atk(4), 'Lança da Sorte', 'Luck Lance'), f(atk(4), 'Lança da Sorte', 'Luck Lance'),
      f(atk(4), 'Lança da Sorte', 'Luck Lance'), f(atk(4), 'Lança da Sorte', 'Luck Lance'),
      sh(3), sh(3), sh(3), sp('rolaCaos'), sp('rolaCaos'),
      f(and(atk(3), sh(2)), 'Investida Blindada', 'Armored Charge'),
      f(and(atk(3), sh(2)), 'Investida Blindada', 'Armored Charge'),
      f(atk(7), 'CARGA DO DESTINO', 'CHARGE OF FATE')
    ], {}),
    E('magoSemFace', N('Mago Sem Face', 'Faceless Mage'), 10, 'torre', 'humanoide', [
      f(sp('bloqueiaDado'), 'Apaga um Dado', 'Erases a Die'), f(sp('bloqueiaDado'), 'Apaga um Dado', 'Erases a Die'),
      f(sp('bloqueiaDado'), 'Apaga um Dado', 'Erases a Die'),
      f(sp('copiaMagia'), 'Eco Arcano', 'Arcane Echo'), f(sp('copiaMagia'), 'Eco Arcano', 'Arcane Echo'),
      f(sp('copiaMagia'), 'Eco Arcano', 'Arcane Echo'),
      st('silence', 1), st('silence', 1),
      atk(3, 'random'), atk(3, 'random'),
      f(and(st('silence', 1), atk(3, 'random')), 'Palavra Roubada', 'Stolen Word'),
      f(and(st('silence', 1), atk(3, 'random')), 'Palavra Roubada', 'Stolen Word')
    ], { decor: 'capuz', weak: 'fisico', resist: 'maldicao', row: 'back' }),
    E('ecoHeroi', N('Eco do Herói', 'Hero Echo'), 9, 'torre', 'fantasma', [
      f(sp('copiaMaiorDado'), 'Reflexo Distorcido', 'Warped Reflection'),
      f(sp('copiaMaiorDado'), 'Reflexo Distorcido', 'Warped Reflection'),
      f(sp('copiaMaiorDado'), 'Reflexo Distorcido', 'Warped Reflection'),
      f(sp('copiaMaiorDado'), 'Reflexo Distorcido', 'Warped Reflection'),
      f(sp('copiaMaiorDado'), 'Reflexo Distorcido', 'Warped Reflection'),
      atk(3), atk(3), atk(3), sh(2), sh(2),
      f(and(sp('copiaMaiorDado'), atk(2)), 'Eco Redobrado', 'Redoubled Echo'),
      f(and(sp('copiaMaiorDado'), atk(2)), 'Eco Redobrado', 'Redoubled Echo')
    ], { resist: 'fisico' }),
    E('sombraRerolada', N('Sombra Rerolada', 'Rerolled Shadow'), 7, 'torre', 'fantasma', [
      f(sp('punirReroll', 1), 'Cobra o Azar', 'Charges for Misfortune'),
      f(sp('punirReroll', 1), 'Cobra o Azar', 'Charges for Misfortune'),
      f(sp('punirReroll', 1), 'Cobra o Azar', 'Charges for Misfortune'),
      f(sp('punirReroll', 1), 'Cobra o Azar', 'Charges for Misfortune'),
      atk(3, 'random'), atk(3, 'random'), atk(3, 'random'), atk(3, 'random'),
      f(and(sp('punirReroll', 1), atk(2, 'random')), 'Imposto da Sorte', 'Luck Tax'),
      f(and(sp('punirReroll', 1), atk(2, 'random')), 'Imposto da Sorte', 'Luck Tax'),
      f(atk(5), 'Golpe Rerolado', 'Rerolled Blow'), f(atk(5), 'Golpe Rerolado', 'Rerolled Blow')
    ], {}),
    E('guardiaoDourado', N('Guardião Dourado', 'Golden Warden'), 13, 'torre', 'cavaleiro', [
      f(sh(4), 'Égide Dourada', 'Golden Aegis'), f(sh(4), 'Égide Dourada', 'Golden Aegis'),
      f(sh(4), 'Égide Dourada', 'Golden Aegis'),
      atk(4), atk(4), atk(4),
      st('vulnerable', 1), st('vulnerable', 1),
      f(and(sh(3), atk(3)), 'Marcha Dourada', 'Golden March'),
      f(and(sh(3), atk(3)), 'Marcha Dourada', 'Golden March'),
      f(atk(6), 'MARTELO SOLAR', 'SOLAR HAMMER'), f(atk(6), 'MARTELO SOLAR', 'SOLAR HAMMER')
    ], { resist: 'maldicao' }),
    E('serpenteProbabilidade', N('Serpente de Probabilidade', 'Probability Serpent'), 9, 'torre', 'serpente', [
      f(sp('inverteDado'), 'Torce a Sorte', 'Twists Luck'), f(sp('inverteDado'), 'Torce a Sorte', 'Twists Luck'),
      f(sp('inverteDado'), 'Torce a Sorte', 'Twists Luck'),
      atk(3), atk(3), atk(3),
      st('curse', 1), st('curse', 1),
      f(and(sp('inverteDado'), atk(3)), 'Bote Improvável', 'Improbable Strike'),
      f(and(sp('inverteDado'), atk(3)), 'Bote Improvável', 'Improbable Strike'),
      f(drain(4), 'Devora Chances', 'Devours Chances'), f(drain(4), 'Devora Chances', 'Devours Chances')
    ], {}),
    E('cuboCorrompido', N('Cubo Corrompido', 'Corrupt Cube'), 10, 'torre', 'dado', [
      f(st('curse', 1, 'random'), 'Vaza Corrupção', 'Leaks Corruption'),
      f(st('curse', 1, 'random'), 'Vaza Corrupção', 'Leaks Corruption'),
      f(st('curse', 1, 'random'), 'Vaza Corrupção', 'Leaks Corruption'),
      atk(3), atk(3), atk(3),
      f(sp('travaDado'), 'Prende um Dado', 'Traps a Die'), f(sp('travaDado'), 'Prende um Dado', 'Traps a Die'),
      f(and(st('curse', 1, 'random'), atk(2)), 'Toque Corrosivo', 'Corrosive Touch'),
      f(and(st('curse', 1, 'random'), atk(2)), 'Toque Corrosivo', 'Corrosive Touch'),
      f(atk(3, 'allFront'), 'ROLAGEM ESMAGADORA', 'CRUSHING ROLL'),
      f(atk(3, 'allFront'), 'ROLAGEM ESMAGADORA', 'CRUSHING ROLL')
    ], {}),
    E('anjoAzar', N('Anjo do Azar', 'Angel of Misfortune'), 11, 'torre', 'fantasma', [
      f(st('fear', 1, 'allH'), 'Asas Negras', 'Black Wings'), f(st('fear', 1, 'allH'), 'Asas Negras', 'Black Wings'),
      f(st('fear', 1, 'allH'), 'Asas Negras', 'Black Wings'),
      f(sp('drenaSorte'), 'Drena a Sorte', 'Drains Luck'), f(sp('drenaSorte'), 'Drena a Sorte', 'Drains Luck'),
      f(sp('drenaSorte'), 'Drena a Sorte', 'Drains Luck'),
      atk(4), atk(4), atk(4),
      f(and(st('fear', 1, 'allH'), atk(3)), 'Presságio', 'Omen'),
      f(and(st('fear', 1, 'allH'), atk(3)), 'Presságio', 'Omen'),
      f(atk(6), 'TOQUE DO AZAR', 'TOUCH OF MISFORTUNE')
    ], { row: 'back' }),
    E('arautoDado', N('Arauto do Dado Negro', 'Herald of the Black Die'), 12, 'torre', 'humanoide', [
      f(st('curse', 2), 'Anúncio Negro', 'Black Proclamation'), f(st('curse', 2), 'Anúncio Negro', 'Black Proclamation'),
      f(st('curse', 2), 'Anúncio Negro', 'Black Proclamation'),
      atk(4), atk(4), atk(4),
      f(summon('dadoVivo'), 'Convoca o Acaso', 'Summons Chance'),
      f(summon('dadoVivo'), 'Convoca o Acaso', 'Summons Chance'),
      f(st('curse', 1, 'allH'), 'Sermão Maldito', 'Cursed Sermon'),
      f(st('curse', 1, 'allH'), 'Sermão Maldito', 'Cursed Sermon'),
      atk(5), atk(5)
    ], { decor: 'capuz' }),

    // ===== ELITES (dado maior que a região, sem branco, face-assinatura) =====
    E('ogroPonte', N('Ogro da Ponte', 'Bridge Ogre'), 22, 'estrada', 'construto', [
      f(atk(5), 'Porrete', 'Club'), f(atk(5), 'Porrete', 'Club'),
      f(sp('carrega'), 'Respira Fundo', 'Deep Breath'), f(sp('carrega'), 'Respira Fundo', 'Deep Breath'),
      f(sp('executa', 9), 'QUEBRA-PONTE', 'BRIDGEBREAKER'), f(sp('executa', 9), 'QUEBRA-PONTE', 'BRIDGEBREAKER'),
      sh(3), f(atk(3, 'allFront'), 'Varredura', 'Sweep')
    ], { tier: 'elite' }),
    E('entApodrecido', N('Ent Apodrecido', 'Rotting Ent'), 26, 'floresta', 'planta', [
      f(st('poison', 2, 'allH'), 'Chuva de Esporos', 'Spore Rain'),
      f(st('poison', 2, 'allH'), 'Chuva de Esporos', 'Spore Rain'),
      f(atk(4), 'Galhada', 'Branch Slam'), f(atk(4), 'Galhada', 'Branch Slam'),
      f(heal(3, 'self'), 'Raízes Fundas', 'Deep Roots'), f(heal(3, 'self'), 'Raízes Fundas', 'Deep Roots'),
      f(summon('esporoVivo'), 'Brota', 'Sprouts'),
      f(and(atk(3), st('poison', 2)), 'GALHO VENENOSO', 'VENOM BOUGH')
    ], { tier: 'elite', resist: 'veneno' }),
    E('cavaleiroSemNome', N('Cavaleiro Sem Nome', 'Nameless Knight'), 24, 'cripta', 'cavaleiro', [
      sh(4), sh(4), f(atk(5), 'Lâmina Sem Nome', 'Nameless Blade'), f(atk(5), 'Lâmina Sem Nome', 'Nameless Blade'),
      f(st('counter', 2, 'self'), 'Postura Eterna', 'Eternal Stance'),
      f(st('counter', 2, 'self'), 'Postura Eterna', 'Eternal Stance'),
      f(and(sh(3), atk(4)), 'Marcha Fúnebre', 'Funeral March'),
      f(and(sh(3), atk(4)), 'Marcha Fúnebre', 'Funeral March'),
      f(st('fear', 1, 'allH'), 'Elmo Vazio', 'Empty Helm'),
      f(atk(7), 'JUÍZO', 'JUDGMENT')
    ], { tier: 'elite', kind: 'undead', resist: 'sangramento' }),
    E('colossoBronze', N('Colosso de Bronze', 'Bronze Colossus'), 30, 'forja', 'construto', [
      f(sh(5), 'Placas de Bronze', 'Bronze Plates'), f(sh(5), 'Placas de Bronze', 'Bronze Plates'),
      f(sp('carrega'), 'FORNALHA ACESA', 'FURNACE LIT'), f(sp('carrega'), 'FORNALHA ACESA', 'FURNACE LIT'),
      f(sp('carrega'), 'FORNALHA ACESA', 'FURNACE LIT'),
      f({ k: 'special', id: 'executa', n: 12, tgt: 'allFront' }, 'ERUPÇÃO', 'ERUPTION'),
      f({ k: 'special', id: 'executa', n: 12, tgt: 'allFront' }, 'ERUPÇÃO', 'ERUPTION'),
      f(st('burn', 2), 'Vapor', 'Steam'), f(st('burn', 2), 'Vapor', 'Steam'),
      f(and(sh(3), st('burn', 1, 'allH')), 'Purga de Vapor', 'Steam Purge')
    ], { tier: 'elite', resist: 'fogo', decor: 'nucleo' }),
    E('bailarinaFacas', N('Bailarina das Facas', 'Knife Dancer'), 22, 'mascaras', 'humanoide', [
      f(atk(3, 'random'), 'Faca Voadora', 'Flying Knife'), f(atk(3, 'random'), 'Faca Voadora', 'Flying Knife'),
      f(atk(3, 'random'), 'Faca Voadora', 'Flying Knife'),
      f(atk(2, 'random', { times: 3 }), 'DANÇA DAS LÂMINAS', 'DANCE OF BLADES'),
      f(atk(2, 'random', { times: 3 }), 'DANÇA DAS LÂMINAS', 'DANCE OF BLADES'),
      f(atk(2, 'random', { times: 3 }), 'DANÇA DAS LÂMINAS', 'DANCE OF BLADES'),
      st('bleed', 2), st('bleed', 2),
      f(sp('esconde'), 'Passo de Sombra', 'Shadow Step'), f(sp('esconde'), 'Passo de Sombra', 'Shadow Step'),
      f(and(atk(2, 'random', { times: 2 }), st('bleed', 1)), 'Valsa Vermelha', 'Crimson Waltz'),
      f(and(atk(2, 'random', { times: 2 }), st('bleed', 1)), 'Valsa Vermelha', 'Crimson Waltz')
    ], { tier: 'elite', decor: 'mascara' }),
    E('esfingePartida', N('Esfinge Partida', 'Broken Sphinx'), 26, 'deserto', 'construto', [
      f(sp('enigma'), 'ENIGMA', 'RIDDLE'), f(sp('enigma'), 'ENIGMA', 'RIDDLE'), f(sp('enigma'), 'ENIGMA', 'RIDDLE'),
      f(atk(5), 'Garra de Pedra', 'Stone Claw'), f(atk(5), 'Garra de Pedra', 'Stone Claw'),
      f(atk(5), 'Garra de Pedra', 'Stone Claw'),
      f(st('blind', 1, 'allH'), 'Olhar Partido', 'Broken Gaze'), f(st('blind', 1, 'allH'), 'Olhar Partido', 'Broken Gaze'),
      sh(4), sh(4),
      f(and(sp('enigma'), atk(3)), 'Charada Cruel', 'Cruel Riddle'),
      f(atk(8), 'RESPOSTA ERRADA', 'WRONG ANSWER')
    ], { tier: 'elite' }),
    E('leviataJovem', N('Leviatã Jovem', 'Young Leviathan'), 30, 'mar', 'marinho', [
      f(atk(5), 'Cauda', 'Tail'), f(atk(5), 'Cauda', 'Tail'), f(atk(5), 'Cauda', 'Tail'),
      f(st('fear', 1, 'allH'), 'Rugido das Profundezas', 'Roar of the Deep'),
      f(st('fear', 1, 'allH'), 'Rugido das Profundezas', 'Roar of the Deep'),
      f(sp('mergulha'), 'MERGULHA', 'DIVES'), f(sp('mergulha'), 'MERGULHA', 'DIVES'),
      f(sp('mergulha'), 'MERGULHA', 'DIVES'),
      f(atk(6), 'Abocanha', 'Snaps Jaws'), f(atk(6), 'Abocanha', 'Snaps Jaws'),
      f(atk(4, 'allFront'), 'ONDA GIGANTE', 'GIANT WAVE'), f(atk(4, 'allFront'), 'ONDA GIGANTE', 'GIANT WAVE')
    ], { tier: 'elite' }),
    E('juizFaces', N('Juiz das Faces', 'Judge of Faces'), 28, 'torre', 'dado', [
      f(sp('julga'), 'SENTENÇA', 'SENTENCING'), f(sp('julga'), 'SENTENÇA', 'SENTENCING'),
      f(sp('julga'), 'SENTENÇA', 'SENTENCING'),
      f(st('curse', 2), 'Veredito', 'Verdict'), f(st('curse', 2), 'Veredito', 'Verdict'),
      f(st('curse', 2), 'Veredito', 'Verdict'),
      f(sp('travaDado'), 'Confisca um Dado', 'Confiscates a Die'),
      f(sp('travaDado'), 'Confisca um Dado', 'Confiscates a Die'),
      f(atk(5), 'Martelo do Juiz', 'Judge\'s Gavel'), f(atk(5), 'Martelo do Juiz', 'Judge\'s Gavel'),
      f(and(st('curse', 1, 'allH'), atk(3)), 'CORTE SUPREMA', 'SUPREME COURT'),
      f(and(st('curse', 1, 'allH'), atk(3)), 'CORTE SUPREMA', 'SUPREME COURT')
    ], { tier: 'elite' }),

    // ===== CHEFES (d10/d12 nomeado + DADO DE FÚRIA na metade da vida) =====
    E('reiGoblin', N('Rei Goblin da Carroça', 'Goblin Cart King'), 38, 'estrada', 'goblin', [
      f(summon('goblinFraco'), 'MAIS GOBLINS!', 'MORE GOBLINS!'),
      f(summon('goblinFraco'), 'MAIS GOBLINS!', 'MORE GOBLINS!'),
      f(atk(4), 'Cetro-Porrete', 'Scepter-Club'), f(atk(4), 'Cetro-Porrete', 'Scepter-Club'),
      f(sp('roubaMoeda', 3), 'Imposto Real', 'Royal Tax'), f(sp('roubaMoeda', 3), 'Imposto Real', 'Royal Tax'),
      f(and(atk(3), st('inspire', 1, 'allyE')), 'Pela Carroça!', 'For the Cart!'),
      f(and(atk(3), st('inspire', 1, 'allyE')), 'Pela Carroça!', 'For the Cart!'),
      f(sh(3), 'Esconde-se no Trono', 'Hides in the Throne'),
      f(st('weak', 1), 'Cusparada Real', 'Royal Spit')
    ], {
      tier: 'chefe', decor: 'coroa', mech: 'reiGoblin',
      die2: [
        f(atk(5), 'Porrete Furioso', 'Furious Club'), f(atk(5), 'Porrete Furioso', 'Furious Club'),
        f(atk(5), 'Porrete Furioso', 'Furious Club'),
        f(and(atk(4), st('weak', 1)), 'Pisão Real', 'Royal Stomp'),
        f(and(atk(4), st('weak', 1)), 'Pisão Real', 'Royal Stomp'),
        f(summon('goblinExplosivo'), 'JOGA GOBLIN-BOMBA!', 'THROWS BOMB GOBLIN!'),
        f(summon('goblinExplosivo'), 'JOGA GOBLIN-BOMBA!', 'THROWS BOMB GOBLIN!'),
        f(sp('roubaMoeda', 4), 'Saque Final', 'Final Plunder'),
        f(atk(3, 'allFront'), 'CHILIQUE REAL', 'ROYAL TANTRUM'),
        f(atk(3, 'allFront'), 'CHILIQUE REAL', 'ROYAL TANTRUM')
      ],
      enrage: { heal: 6, say: N('O Rei devora um goblin e ruge: a carroça é DELE!', 'The King devours a goblin and roars: the cart is HIS!') }
    }),
    E('bruxaPantano', N('Bruxa do Pântano', 'Swamp Witch'), 44, 'floresta', 'humanoide', [
      f(st('poison', 2, 'allH'), 'Névoa Pútrida', 'Putrid Mist'),
      f(st('poison', 2, 'allH'), 'Névoa Pútrida', 'Putrid Mist'),
      f(sp('trocaDados'), 'TROCA SEUS DADOS', 'SWAPS YOUR DICE'),
      f(sp('trocaDados'), 'TROCA SEUS DADOS', 'SWAPS YOUR DICE'),
      f(st('curse', 2), 'Mau-Olhado', 'Evil Eye'), f(st('curse', 2), 'Mau-Olhado', 'Evil Eye'),
      f(atk(4), 'Vassourada', 'Broom Strike'), f(atk(4), 'Vassourada', 'Broom Strike'),
      f(heal(3, 'self'), 'Gole do Caldeirão', 'Sip from the Cauldron'),
      f(and(st('poison', 2), st('curse', 1)), 'Receita Ruim', 'Foul Recipe')
    ], {
      tier: 'chefe', decor: 'cajado', mech: 'bruxaPantano',
      die2: [
        f(st('poison', 3, 'allH'), 'PÂNTANO VIVO', 'LIVING SWAMP'),
        f(st('poison', 3, 'allH'), 'PÂNTANO VIVO', 'LIVING SWAMP'),
        f(and(atk(4), st('poison', 2)), 'Garras Verdes', 'Green Claws'),
        f(and(atk(4), st('poison', 2)), 'Garras Verdes', 'Green Claws'),
        f(and(atk(4), st('poison', 2)), 'Garras Verdes', 'Green Claws'),
        f(sp('trocaDados'), 'TROCA SEUS DADOS', 'SWAPS YOUR DICE'),
        f(sp('trocaDados'), 'TROCA SEUS DADOS', 'SWAPS YOUR DICE'),
        f(drain(4), 'Suga a Alma', 'Drinks the Soul'), f(drain(4), 'Suga a Alma', 'Drinks the Soul'),
        f(st('curse', 2, 'allH'), 'PRAGA FINAL', 'FINAL BLIGHT')
      ],
      enrage: { heal: 5, say: N('A Bruxa engole o caldeirão inteiro e GARGALHA!', 'The Witch swallows the whole cauldron and CACKLES!') }
    }),
    E('hidraOssos', N('Hidra de Ossos', 'Bone Hydra'), 52, 'cripta', 'esqueleto', [
      f(atk(3, 'random', { times: 2 }), 'Duas Cabeças', 'Two Heads'),
      f(atk(3, 'random', { times: 2 }), 'Duas Cabeças', 'Two Heads'),
      f(atk(4), 'Mordida', 'Bite'), f(atk(4), 'Mordida', 'Bite'),
      f(st('fear', 1, 'allH'), 'Uivo Oco', 'Hollow Howl'),
      f(atk(5), 'Bote Profundo', 'Deep Lunge'), f(atk(5), 'Bote Profundo', 'Deep Lunge'),
      f(sh(3), 'Emaranhado de Ossos', 'Bone Tangle'),
      f(and(atk(3), st('bleed', 1)), 'Presas Lascadas', 'Splintered Fangs'),
      f(and(atk(3), st('bleed', 1)), 'Presas Lascadas', 'Splintered Fangs')
    ], {
      tier: 'chefe', kind: 'undead', mech: 'hidraOssos', resist: 'sangramento',
      die2: [
        f(atk(3, 'random', { times: 3 }), 'TODAS AS CABEÇAS', 'ALL HEADS'),
        f(atk(3, 'random', { times: 3 }), 'TODAS AS CABEÇAS', 'ALL HEADS'),
        f(atk(3, 'random', { times: 3 }), 'TODAS AS CABEÇAS', 'ALL HEADS'),
        f(and(atk(4), st('bleed', 2)), 'Presas Estilhaçadas', 'Shattered Fangs'),
        f(and(atk(4), st('bleed', 2)), 'Presas Estilhaçadas', 'Shattered Fangs'),
        f(and(atk(4), st('bleed', 2)), 'Presas Estilhaçadas', 'Shattered Fangs'),
        f(st('fear', 1, 'allH'), 'Coro de Uivos', 'Chorus of Howls'),
        f(st('fear', 1, 'allH'), 'Coro de Uivos', 'Chorus of Howls'),
        f(atk(7), 'DEVORAR', 'DEVOUR'), f(atk(7), 'DEVORAR', 'DEVOUR')
      ],
      enrage: { say: N('Os ossos rangem — a Hidra perde o controle!', 'Bones grind — the Hydra loses control!') }
    }),
    E('giganteForja', N('Gigante da Forja', 'Forge Giant'), 58, 'forja', 'construto', [
      f(sp('carrega'), 'AQUECE O MARTELO', 'HEATS THE HAMMER'),
      f(sp('carrega'), 'AQUECE O MARTELO', 'HEATS THE HAMMER'),
      f(sp('carrega'), 'AQUECE O MARTELO', 'HEATS THE HAMMER'),
      f(sp('marretada', 10), 'MARRETADA', 'SLEDGEHAMMER'),
      f(sp('marretada', 10), 'MARRETADA', 'SLEDGEHAMMER'),
      f(sp('marretada', 10), 'MARRETADA', 'SLEDGEHAMMER'),
      f(st('burn', 2, 'allH'), 'Chuva de Faíscas', 'Spark Shower'),
      f(st('burn', 2, 'allH'), 'Chuva de Faíscas', 'Spark Shower'),
      f(sh(4), 'Corpo de Ferro', 'Iron Body'),
      f(atk(4), 'Soco de Bigorna', 'Anvil Punch')
    ], {
      tier: 'chefe', mech: 'giganteForja', resist: 'fogo',
      die2: [
        f(sp('carrega'), 'FORNALHA MÁXIMA', 'MAX FURNACE'), f(sp('carrega'), 'FORNALHA MÁXIMA', 'MAX FURNACE'),
        f(sp('marretada', 13), 'MARRETADA FUNDIDA', 'MOLTEN SLEDGE'),
        f(sp('marretada', 13), 'MARRETADA FUNDIDA', 'MOLTEN SLEDGE'),
        f(sp('marretada', 13), 'MARRETADA FUNDIDA', 'MOLTEN SLEDGE'),
        f(and(atk(4), st('burn', 2)), 'Punho Incandescente', 'Incandescent Fist'),
        f(and(atk(4), st('burn', 2)), 'Punho Incandescente', 'Incandescent Fist'),
        f(and(atk(4), st('burn', 2)), 'Punho Incandescente', 'Incandescent Fist'),
        f(st('burn', 2, 'allH'), 'CHUVA DE MAGMA', 'MAGMA RAIN'),
        f(st('burn', 2, 'allH'), 'CHUVA DE MAGMA', 'MAGMA RAIN')
      ],
      enrage: { shield: 5, say: N('O Gigante brilha vermelho-vivo — o metal ferve!', 'The Giant glows red-hot — the metal boils!') }
    }),
    E('duqueMascaras', N('Duque das Máscaras', 'Duke of Masks'), 50, 'mascaras', 'humanoide', [
      f(summon('clone_duque'), 'MAIS MÁSCARAS', 'MORE MASKS'),
      f(summon('clone_duque'), 'MAIS MÁSCARAS', 'MORE MASKS'),
      f(st('mark', 1), 'Aponta o Leque', 'Points the Fan'), f(st('mark', 1), 'Aponta o Leque', 'Points the Fan'),
      f(atk(5, 'marked'), 'Estocada Teatral', 'Theatrical Thrust'),
      f(atk(5, 'marked'), 'Estocada Teatral', 'Theatrical Thrust'),
      f(atk(5, 'marked'), 'Estocada Teatral', 'Theatrical Thrust'),
      f(sp('trocaIntencao'), 'Troca de Papel', 'Changes Role'),
      f(and(st('mark', 1), atk(3, 'marked')), 'ATO FINAL', 'FINAL ACT'),
      f(and(st('mark', 1), atk(3, 'marked')), 'ATO FINAL', 'FINAL ACT')
    ], {
      tier: 'chefe', decor: 'mascara', mech: 'duqueMascaras',
      die2: [
        f(atk(5, 'marked'), 'O ÚLTIMO ATO', 'THE LAST ACT'),
        f(atk(5, 'marked'), 'O ÚLTIMO ATO', 'THE LAST ACT'),
        f(atk(5, 'marked'), 'O ÚLTIMO ATO', 'THE LAST ACT'),
        f(summon('clone_duque'), 'MAIS MÁSCARAS', 'MORE MASKS'),
        f(summon('clone_duque'), 'MAIS MÁSCARAS', 'MORE MASKS'),
        f(atk(4, 'random', { times: 2 }), 'Dança das Máscaras', 'Dance of Masks'),
        f(atk(4, 'random', { times: 2 }), 'Dança das Máscaras', 'Dance of Masks'),
        f(atk(4, 'random', { times: 2 }), 'Dança das Máscaras', 'Dance of Masks'),
        f(st('fear', 1, 'allH'), 'O ROSTO VERDADEIRO', 'THE TRUE FACE'),
        f(st('fear', 1, 'allH'), 'O ROSTO VERDADEIRO', 'THE TRUE FACE')
      ],
      enrage: { say: N('A máscara cai. O que há embaixo não deveria sorrir.', 'The mask falls. What lies beneath should not smile.') }
    }),
    E('rainhaMiragem', N('Rainha da Miragem', 'Mirage Queen'), 56, 'deserto', 'humanoide', [
      f(sp('miragem'), 'MIRAGEM', 'MIRAGE'), f(sp('miragem'), 'MIRAGEM', 'MIRAGE'),
      f(sp('miragem'), 'MIRAGEM', 'MIRAGE'),
      f(atk(5), 'Lança de Vidro', 'Glass Lance'), f(atk(5), 'Lança de Vidro', 'Glass Lance'),
      f(atk(5), 'Lança de Vidro', 'Glass Lance'),
      f(st('blind', 1, 'allH'), 'Clarão', 'Blinding Flash'), f(st('blind', 1, 'allH'), 'Clarão', 'Blinding Flash'),
      f(atk(4, 'random'), 'Reflexo', 'Reflection'), f(atk(4, 'random'), 'Reflexo', 'Reflection'),
      f(sh(4), 'Véu de Calor', 'Heat Veil'),
      f(and(st('blind', 1, 'allH'), atk(3)), 'SOL CEGANTE', 'BLINDING SUN')
    ], {
      tier: 'chefe', mech: 'rainhaMiragem',
      die2: [
        f(atk(4, 'random', { times: 2 }), 'ESPELHOS QUEBRADOS', 'SHATTERED MIRRORS'),
        f(atk(4, 'random', { times: 2 }), 'ESPELHOS QUEBRADOS', 'SHATTERED MIRRORS'),
        f(atk(4, 'random', { times: 2 }), 'ESPELHOS QUEBRADOS', 'SHATTERED MIRRORS'),
        f(and(atk(5), st('blind', 1)), 'Lâmina Solar', 'Solar Blade'),
        f(and(atk(5), st('blind', 1)), 'Lâmina Solar', 'Solar Blade'),
        f(and(atk(5), st('blind', 1)), 'Lâmina Solar', 'Solar Blade'),
        f(sp('miragem'), 'MIRAGEM', 'MIRAGE'), f(sp('miragem'), 'MIRAGEM', 'MIRAGE'),
        f(drain(5), 'Bebe o Oásis', 'Drinks the Oasis'), f(drain(5), 'Bebe o Oásis', 'Drinks the Oasis'),
        f(st('blind', 1, 'allH'), 'Clarão', 'Blinding Flash'),
        f(st('blind', 1, 'allH'), 'Clarão', 'Blinding Flash')
      ],
      enrage: { say: N('Mil rainhas se erguem na areia — qual é a verdadeira?', 'A thousand queens rise from the sand — which is real?') }
    }),
    E('oraculoAfogado', N('Oráculo Afogado', 'Drowned Oracle'), 62, 'mar', 'marinho', [
      f(sp('preve'), 'PREVÊ SEUS MOVIMENTOS', 'FORESEES YOUR MOVES'),
      f(sp('preve'), 'PREVÊ SEUS MOVIMENTOS', 'FORESEES YOUR MOVES'),
      f(sp('preve'), 'PREVÊ SEUS MOVIMENTOS', 'FORESEES YOUR MOVES'),
      f(atk(5), 'Maré Alta', 'High Tide'), f(atk(5), 'Maré Alta', 'High Tide'),
      f(atk(5), 'Maré Alta', 'High Tide'),
      f(st('curse', 2, 'random'), 'Profecia Negra', 'Black Prophecy'),
      f(st('curse', 2, 'random'), 'Profecia Negra', 'Black Prophecy'),
      f(sp('punheRepeticao', 2), 'Lei das Marés', 'Law of Tides'),
      f(sp('punheRepeticao', 2), 'Lei das Marés', 'Law of Tides'),
      f(heal(4, 'self'), 'Marés Curativas', 'Healing Tides'),
      f(st('curse', 1, 'allH'), 'VISÃO DO FIM', 'VISION OF THE END')
    ], {
      tier: 'chefe', mech: 'oraculoAfogado', decor: 'sino',
      die2: [
        f(atk(4, 'allFront'), 'TSUNAMI', 'TSUNAMI'), f(atk(4, 'allFront'), 'TSUNAMI', 'TSUNAMI'),
        f(atk(4, 'allFront'), 'TSUNAMI', 'TSUNAMI'),
        f(st('curse', 2, 'allH'), 'O FIM PREVISTO', 'THE FORESEEN END'),
        f(st('curse', 2, 'allH'), 'O FIM PREVISTO', 'THE FORESEEN END'),
        f(drain(5), 'Afoga', 'Drowns'), f(drain(5), 'Afoga', 'Drowns'), f(drain(5), 'Afoga', 'Drowns'),
        f(sp('preve'), 'PREVÊ SEUS MOVIMENTOS', 'FORESEES YOUR MOVES'),
        f(sp('preve'), 'PREVÊ SEUS MOVIMENTOS', 'FORESEES YOUR MOVES'),
        f(atk(7), 'ABISMO', 'ABYSS'), f(atk(7), 'ABISMO', 'ABYSS')
      ],
      enrage: { heal: 6, say: N('"Eu vi este momento", sorri o Oráculo, afundando...', '"I saw this moment," the Oracle smiles, sinking...') }
    }),
    E('dadoNegro', N('O Dado Negro', 'The Black Die'), 75, 'torre', 'dado', [
      f(sp('regraNova'), 'NOVA REGRA', 'NEW RULE'), f(sp('regraNova'), 'NOVA REGRA', 'NEW RULE'),
      f(sp('regraNova'), 'NOVA REGRA', 'NEW RULE'),
      f(atk(6), 'Aresta Negra', 'Black Edge'), f(atk(6), 'Aresta Negra', 'Black Edge'),
      f(atk(6), 'Aresta Negra', 'Black Edge'),
      f(st('curse', 2, 'allH'), 'Números Malditos', 'Cursed Numbers'),
      f(st('curse', 2, 'allH'), 'Números Malditos', 'Cursed Numbers'),
      f(atk(5, 'random'), 'Ricochete', 'Ricochet'), f(atk(5, 'random'), 'Ricochete', 'Ricochet'),
      f(sh(4), 'Gira em Silêncio', 'Spins in Silence'),
      f(and(st('curse', 2), atk(4)), 'FACE OCULTA', 'HIDDEN FACE')
    ], {
      tier: 'chefe', mech: 'dadoNegro',
      die2: [
        f(atk(7), 'COLAPSO DO ACASO', 'COLLAPSE OF CHANCE'),
        f(atk(7), 'COLAPSO DO ACASO', 'COLLAPSE OF CHANCE'),
        f(atk(7), 'COLAPSO DO ACASO', 'COLLAPSE OF CHANCE'),
        f(atk(5, 'random', { times: 2 }), 'Rolagem Dupla', 'Double Roll'),
        f(atk(5, 'random', { times: 2 }), 'Rolagem Dupla', 'Double Roll'),
        f(atk(5, 'random', { times: 2 }), 'Rolagem Dupla', 'Double Roll'),
        f(sp('regraNova'), 'NOVA REGRA', 'NEW RULE'), f(sp('regraNova'), 'NOVA REGRA', 'NEW RULE'),
        f(st('curse', 3, 'allH'), 'A ÚLTIMA REGRA', 'THE LAST RULE'),
        f(st('curse', 3, 'allH'), 'A ÚLTIMA REGRA', 'THE LAST RULE'),
        f(atk(4, 'allH'), 'TODAS AS FACES', 'EVERY FACE'),
        f(atk(4, 'allH'), 'TODAS AS FACES', 'EVERY FACE')
      ],
      enrage: { shield: 4, say: N('O Dado Negro trinca — e o que vaza é ESCURIDÃO.', 'The Black Die cracks — and what leaks out is DARKNESS.') }
    }),

    // ===== CHEFES SECRETOS (d12 + fúria) =====
    E('ferreiroCego', N('O Ferreiro Cego', 'The Blind Smith'), 48, 'forja', 'humanoide', [
      f(sp('reforja'), 'REFORJA SEU DADO', 'REFORGES YOUR DIE'),
      f(sp('reforja'), 'REFORJA SEU DADO', 'REFORGES YOUR DIE'),
      f(sp('reforja'), 'REFORJA SEU DADO', 'REFORGES YOUR DIE'),
      f(sp('marteladaDado'), 'TRINCA UMA FACE', 'CRACKS A FACE'),
      f(sp('marteladaDado'), 'TRINCA UMA FACE', 'CRACKS A FACE'),
      f(atk(5), 'Martelo Cego', 'Blind Hammer'), f(atk(5), 'Martelo Cego', 'Blind Hammer'),
      f(atk(5), 'Martelo Cego', 'Blind Hammer'),
      f(sh(4), 'Têmpera', 'Quenching'), f(sh(4), 'Têmpera', 'Quenching'),
      f(and(atk(4), st('burn', 2)), 'AÇO VIVO', 'LIVING STEEL'),
      f(and(atk(4), st('burn', 2)), 'AÇO VIVO', 'LIVING STEEL')
    ], {
      tier: 'secreto', decor: 'capuz', mech: 'ferreiroCego',
      die2: [
        f(sp('marteladaDado'), 'TRINCA UMA FACE', 'CRACKS A FACE'),
        f(sp('marteladaDado'), 'TRINCA UMA FACE', 'CRACKS A FACE'),
        f(sp('marteladaDado'), 'TRINCA UMA FACE', 'CRACKS A FACE'),
        f(atk(6), 'MARTELO DO DESTINO', 'HAMMER OF FATE'),
        f(atk(6), 'MARTELO DO DESTINO', 'HAMMER OF FATE'),
        f(atk(6), 'MARTELO DO DESTINO', 'HAMMER OF FATE'),
        f(and(atk(5), st('burn', 2)), 'Aço Fervente', 'Boiling Steel'),
        f(and(atk(5), st('burn', 2)), 'Aço Fervente', 'Boiling Steel'),
        f(and(atk(5), st('burn', 2)), 'Aço Fervente', 'Boiling Steel'),
        f(sp('forjaEscudo', 4), 'Verte Bronze', 'Pours Bronze'),
        f(st('burn', 2, 'allH'), 'ESCÓRIA', 'SLAG'), f(st('burn', 2, 'allH'), 'ESCÓRIA', 'SLAG')
      ],
      enrage: { shield: 5, say: N('O Ferreiro toca a própria obra e chora ferro fundido.', 'The Smith touches his own work and weeps molten iron.') }
    }),
    E('criancaSorte', N('A Criança da Sorte', 'The Lucky Child'), 40, 'mascaras', 'humanoide', [
      f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'), f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'),
      f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'), f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'),
      f(atk(3, 'random'), 'Pique Cruel', 'Cruel Tag'), f(atk(3, 'random'), 'Pique Cruel', 'Cruel Tag'),
      f(atk(3, 'random'), 'Pique Cruel', 'Cruel Tag'),
      f(heal(4, 'self'), 'Pirulito', 'Lollipop'), f(heal(4, 'self'), 'Pirulito', 'Lollipop'),
      f(sp('presente', 5), 'PRESENTE ENVENENADO', 'POISONED GIFT'),
      f(sp('presente', 5), 'PRESENTE ENVENENADO', 'POISONED GIFT'),
      f(st('weak', 1), 'Língua de Fora', 'Sticks Tongue Out')
    ], {
      tier: 'secreto', mech: 'criancaSorte',
      die2: [
        f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'), f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'),
        f(sp('sorteLouca'), 'ROLETA', 'ROULETTE'),
        f(atk(3, 'random', { times: 2 }), 'BIRRA', 'TANTRUM'),
        f(atk(3, 'random', { times: 2 }), 'BIRRA', 'TANTRUM'),
        f(atk(3, 'random', { times: 2 }), 'BIRRA', 'TANTRUM'),
        f(and(atk(4, 'random'), st('curse', 1)), 'Choro Maldito', 'Cursed Cry'),
        f(and(atk(4, 'random'), st('curse', 1)), 'Choro Maldito', 'Cursed Cry'),
        f(and(atk(4, 'random'), st('curse', 1)), 'Choro Maldito', 'Cursed Cry'),
        f(drain(4), 'Toma Emprestado', 'Borrows Forever'),
        f(drain(4), 'Toma Emprestado', 'Borrows Forever'),
        f(atk(6, 'random'), 'CARTADA FINAL', 'FINAL GAMBIT')
      ],
      enrage: { heal: 5, say: N('A Criança para de sorrir. O jogo deixou de ser divertido.', 'The Child stops smiling. The game is no longer fun.') }
    }),
    E('reiSemNumero', N('O Rei Sem Número', 'The Numberless King'), 66, 'torre', 'cavaleiro', [
      f(atk(6), 'Cetro Vazio', 'Empty Scepter'), f(atk(6), 'Cetro Vazio', 'Empty Scepter'),
      f(atk(6), 'Cetro Vazio', 'Empty Scepter'),
      f(st('curse', 2, 'allH'), 'Decreto Nulo', 'Null Decree'),
      f(st('curse', 2, 'allH'), 'Decreto Nulo', 'Null Decree'),
      f(sh(5), 'Trono de Nada', 'Throne of Nothing'), f(sh(5), 'Trono de Nada', 'Throne of Nothing'),
      f(and(atk(5), st('silence', 1)), 'Palavra Final', 'Final Word'),
      f(and(atk(5), st('silence', 1)), 'Palavra Final', 'Final Word'),
      f(atk(7), 'COROA PESADA', 'HEAVY CROWN'), f(atk(7), 'COROA PESADA', 'HEAVY CROWN'),
      f(sp('apagaNumeros'), 'APAGA OS NÚMEROS', 'ERASES THE NUMBERS')
    ], {
      tier: 'secreto', mech: 'reiSemNumero',
      die2: [
        f(atk(7), 'Cetro do Nada', 'Scepter of Naught'), f(atk(7), 'Cetro do Nada', 'Scepter of Naught'),
        f(atk(7), 'Cetro do Nada', 'Scepter of Naught'),
        f(atk(5, 'allFront'), 'MARCHA NULA', 'NULL MARCH'),
        f(atk(5, 'allFront'), 'MARCHA NULA', 'NULL MARCH'),
        f(atk(5, 'allFront'), 'MARCHA NULA', 'NULL MARCH'),
        f(st('curse', 2, 'allH'), 'Decreto Nulo', 'Null Decree'),
        f(st('curse', 2, 'allH'), 'Decreto Nulo', 'Null Decree'),
        f(and(atk(6), st('fear', 1)), 'Zero Absoluto', 'Absolute Zero'),
        f(and(atk(6), st('fear', 1)), 'Zero Absoluto', 'Absolute Zero'),
        f(atk(9), 'ANULAÇÃO', 'ANNULMENT'), f(atk(9), 'ANULAÇÃO', 'ANNULMENT')
      ],
      enrage: { shield: 5, say: N('A coroa levita. O Rei lembra que já foi infinito.', 'The crown levitates. The King remembers being infinite.') }
    }),
    E('maeDasFaces', N('A Mãe das Faces', 'Mother of Faces'), 70, 'torre', 'fantasma', [
      f(sp('copiaHeroi'), 'DÁ À LUZ UM REFLEXO', 'BIRTHS A REFLECTION'),
      f(sp('copiaHeroi'), 'DÁ À LUZ UM REFLEXO', 'BIRTHS A REFLECTION'),
      f(sp('copiaHeroi'), 'DÁ À LUZ UM REFLEXO', 'BIRTHS A REFLECTION'),
      f(atk(5, 'random'), 'Carícia Torta', 'Crooked Caress'),
      f(atk(5, 'random'), 'Carícia Torta', 'Crooked Caress'),
      f(atk(5, 'random'), 'Carícia Torta', 'Crooked Caress'),
      f(st('fear', 2, 'allH'), 'Rosto de Mãe', 'A Mother\'s Face'),
      f(st('fear', 2, 'allH'), 'Rosto de Mãe', 'A Mother\'s Face'),
      f(heal(4, 'self'), 'Devora um Rosto', 'Devours a Face'),
      f(heal(4, 'self'), 'Devora um Rosto', 'Devours a Face'),
      f(and(st('fear', 1, 'allH'), atk(4)), 'NINAR SOMBRIO', 'DARK LULLABY'),
      f(and(st('fear', 1, 'allH'), atk(4)), 'NINAR SOMBRIO', 'DARK LULLABY')
    ], {
      tier: 'secreto', mech: 'maeDasFaces',
      die2: [
        f(atk(4, 'random', { times: 2 }), 'MIL MÃOS', 'THOUSAND HANDS'),
        f(atk(4, 'random', { times: 2 }), 'MIL MÃOS', 'THOUSAND HANDS'),
        f(atk(4, 'random', { times: 2 }), 'MIL MÃOS', 'THOUSAND HANDS'),
        f(and(atk(5), st('fear', 1)), 'Abraço Final', 'Final Embrace'),
        f(and(atk(5), st('fear', 1)), 'Abraço Final', 'Final Embrace'),
        f(and(atk(5), st('fear', 1)), 'Abraço Final', 'Final Embrace'),
        f(sp('copiaHeroi'), 'DÁ À LUZ UM REFLEXO', 'BIRTHS A REFLECTION'),
        f(sp('copiaHeroi'), 'DÁ À LUZ UM REFLEXO', 'BIRTHS A REFLECTION'),
        f(drain(6), 'CONSOME', 'CONSUMES'), f(drain(6), 'CONSOME', 'CONSUMES'),
        f(st('curse', 2, 'allH'), 'HERANÇA', 'INHERITANCE'),
        f(st('curse', 2, 'allH'), 'HERANÇA', 'INHERITANCE')
      ],
      enrage: { heal: 6, say: N('A Mãe recolhe seus rostos caídos e veste todos de uma vez.', 'The Mother gathers her fallen faces and wears them all at once.') }
    }),

    // invocações inimigas auxiliares
    E('clone_duque', N('Máscara Falsa', 'False Mask'), 6, 'mascaras', 'marionete', [
      atk(2), atk(2), atk(2), st('fear', 1), st('fear', 1), blank()
    ], { summonOnly: true })
  ];

  var byId = {};
  LIST.forEach(function (e) { byId[e.id] = e; });

  RA.data.Enemies = {
    list: LIST, byId: byId,
    byRegionTier: function (region, tier) {
      return LIST.filter(function (e) { return e.region === region && e.tier === tier && !e.summonOnly; });
    }
  };

  // descrições das habilidades especiais (mostradas no cartão de intenção)
  RA.data.EnemySpecialDesc = {
    roubaMoeda: N('Rouba seu ouro (se você não tiver, ataca)', 'Steals your gold (attacks if you have none)'),
    carrega: N('Acumula CARGA para um golpe devastador', 'Builds CHARGE for a devastating blow'),
    executa: N('Gasta a CARGA num golpe devastador; sem carga, bate fraco', 'Spends CHARGE on a devastating blow; weak without it'),
    fugir: N('Foge da batalha levando o que roubou', 'Flees the battle with its loot'),
    acende: N('Prepara a explosão do próximo turno', 'Primes next turn\'s explosion'),
    explode: N('EXPLODE: dano em toda a sua linha de frente (e morre)', 'EXPLODES: damage to your whole front line (and dies)'),
    explodeVeneno: N('EXPLODE em nuvem: veneno em todos os heróis (e morre)', 'EXPLODES in a cloud: poison on all heroes (and dies)'),
    esconde: N('Fica oculto: não pode ser alvo até atacar', 'Hides: untargetable until it attacks'),
    travada: N('Emperra: um dos SEUS dados começa travado no próximo turno', 'Jams: one of YOUR dice starts locked next turn'),
    travaDado: N('Prende um dos seus dados no próximo turno', 'Traps one of your dice next turn'),
    bloqueiaDado: N('Sela um dos seus dados no próximo turno', 'Seals one of your dice next turn'),
    forjaEscudo: N('Dá escudo a TODOS os inimigos', 'Grants shield to ALL enemies'),
    atropela: N('Atinge toda a sua linha de frente', 'Hits your entire front line'),
    copiaMaiorDado: N('Copia o maior dado que você usou no último turno', 'Copies the highest die you used last turn'),
    curaTudo: N('Cura TODOS os inimigos', 'Heals ALL enemies'),
    reflete: N('Ganha contra-ataque: devolve dano de quem bater', 'Gains counter: returns damage to attackers'),
    regenera: N('Regenera vida a cada turno', 'Regenerates HP each turn'),
    drenaCura: N('Causa dano e se cura no valor causado', 'Deals damage and heals itself for that amount'),
    badalada: N('Deixa TODOS os heróis vulneráveis (+1 dano recebido)', 'Makes ALL heroes vulnerable (+1 damage taken)'),
    rolaCaos: N('Rola o caos: um status ruim aleatório num herói', 'Rolls chaos: a random debuff on a hero'),
    copiaMagia: N('Repete a última magia que seu grupo usou', 'Repeats the last spell your party cast'),
    punirReroll: N('Se você rerrolar no próximo turno, o grupo sofre dano', 'If you reroll next turn, the party takes damage'),
    inverteDado: N('Sua próxima rolagem sai INVERTIDA (altos viram baixos)', 'Your next roll comes INVERTED (highs become lows)'),
    drenaSorte: N('Drena sua sorte: -1 rolagem no próximo turno', 'Drains your luck: -1 roll next turn'),
    enigma: N('Marca um dos seus dados: use-o ou ele explode em dano', 'Marks one of your dice: use it or it detonates'),
    mergulha: N('Mergulha: fica oculto e o próximo golpe ganha +2', 'Dives: hides and its next blow gains +2'),
    julga: N('Julga você: dano igual aos dados que usou no último turno', 'Judges you: damage equal to dice used last turn'),
    trocaDados: N('TROCA os dados entre os seus heróis no próximo turno', 'SWAPS the dice among your heroes next turn'),
    marretada: N('Se tiver 2+ CARGAS: golpe brutal em toda a linha de frente', 'With 2+ CHARGES: brutal blow to your whole front line'),
    trocaIntencao: N('Muda de plano no meio do turno', 'Changes plans mid-turn'),
    miragem: N('Miragem: alguns dos seus dados mostrarão faces FALSAS', 'Mirage: some of your dice will show FAKE faces'),
    preve: N('Prevê você: repetir símbolos no próximo turno causa dano', 'Foresees you: repeating symbols next turn hurts'),
    punheRepeticao: N('Pune repetição: símbolos repetidos ferem o grupo', 'Punishes repetition: repeated symbols wound the party'),
    regraNova: N('Impõe uma NOVA REGRA do Dado Negro à batalha', 'Imposes a NEW BLACK DIE RULE on the battle'),
    reforja: N('REFORJA um dos seus dados com uma face aleatória', 'REFORGES one of your dice with a random face'),
    marteladaDado: N('Martela um dado seu: uma face TRINCA (usos limitados)', 'Hammers your die: a face CRACKS (limited uses)'),
    sorteLouca: N('Gira a roleta: cura, inspiração, fraqueza ou inversão', 'Spins the wheel: heal, inspire, weaken or invert'),
    apagaNumeros: N('APAGA os números dos seus dados!', 'ERASES the numbers from your dice!'),
    copiaHeroi: N('Cria uma cópia sombria de um dos seus heróis', 'Creates a dark copy of one of your heroes'),
    presente: N('Dá ouro de presente... e amaldiçoa TODOS os heróis', 'Gifts you gold... and curses ALL heroes')
  };
})();
