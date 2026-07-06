// 80 conquistas. O motor chama RA.data.checkAchievements(profile, ev) nos
// momentos-chave; ev é um evento tipado emitido por Combat/Run:
//  {t:'runEnd', win, modeId, diffTier, curseLvl, heroesAlive, downsTotal, healsUsed,
//   randomTeam, timeMin, endingId, goldSpent, revives, partySize}
//  {t:'battleEnd', win, turns, rerollsUsed, healDone, heroAt1Hp, noDamageDealt,
//   crackedUsed, combos, stuns, poisonApplied}
//  {t:'turnEnd', dmg, shieldGained}
//  {t:'bossKill', id, secret}   {t:'combo', id}   {t:'secretRoom'}
//  {t:'roll', allSix}           {t:'stat'} (checagens cumulativas de perfil)
(function () {
  function A(id, name, desc, check, hidden) {
    return { id: id, name: name, desc: desc, check: check, hidden: !!hidden };
  }
  function nkeys(o) { return o ? Object.keys(o).length : 0; }
  var runWin = function (f) { return function (p, e) { return e.t === 'runEnd' && e.win && (!f || f(p, e)); }; };
  var battleWin = function (f) { return function (p, e) { return e.t === 'battleEnd' && e.win && (!f || f(p, e)); }; };
  var boss = function (id) { return function (p, e) { return e.t === 'bossKill' && e.id === id; }; };
  var stat = function (f) { return function (p, e) { return f(p.stats || {}, p); }; };

  RA.data.Achievements = [
    // ——— básicas (exemplos do design) ———
    A('primeiraVitoria', { pt: 'Primeira Vitória', en: 'First Victory' }, { pt: 'Vença uma run.', en: 'Win a run.' }, runWin()),
    A('primeiraDerrota', { pt: 'Primeira Derrota', en: 'First Defeat' }, { pt: 'Perca uma run. Acontece.', en: 'Lose a run. It happens.' }, function (p, e) { return e.t === 'runEnd' && !e.win; }),
    A('cincoVivos', { pt: 'Todos de Pé', en: 'All Standing' }, { pt: 'Vença com os 5 heróis vivos.', en: 'Win with all 5 heroes alive.' }, runWin(function (p, e) { return e.heroesAlive >= 5; })),
    A('umVivo', { pt: 'Último Suspiro', en: 'Last Breath' }, { pt: 'Vença com apenas 1 herói vivo.', en: 'Win with only 1 hero alive.' }, runWin(function (p, e) { return e.heroesAlive === 1 && e.partySize > 1; })),
    A('dano20', { pt: 'Pancada', en: 'Wallop' }, { pt: 'Cause 20 de dano em um turno.', en: 'Deal 20 damage in one turn.' }, function (p, e) { return e.t === 'turnEnd' && e.dmg >= 20; }),
    A('dano50', { pt: 'Devastação', en: 'Devastation' }, { pt: 'Cause 50 de dano em um turno.', en: 'Deal 50 damage in one turn.' }, function (p, e) { return e.t === 'turnEnd' && e.dmg >= 50; }),
    A('cura20', { pt: 'Mãos Santas', en: 'Holy Hands' }, { pt: 'Cure 20 em uma luta.', en: 'Heal 20 in one fight.' }, function (p, e) { return e.t === 'battleEnd' && e.healDone >= 20; }),
    A('veneno20', { pt: 'Boticário', en: 'Apothecary' }, { pt: 'Aplique 20 de veneno em uma luta.', en: 'Apply 20 poison in one fight.' }, function (p, e) { return e.t === 'battleEnd' && e.poisonApplied >= 20; }),
    A('semCuraRun', { pt: 'Sem Curativos', en: 'No Bandages' }, { pt: 'Vença uma run sem usar cura.', en: 'Win a run without using heals.' }, runWin(function (p, e) { return e.healsUsed === 0; })),
    A('semReroll', { pt: 'Primeira Impressão', en: 'First Impression' }, { pt: 'Vença uma batalha sem rerrolar.', en: 'Win a battle without rerolling.' }, battleWin(function (p, e) { return e.rerollsUsed === 0; })),
    A('vencerNormal', { pt: 'Como Manda o Destino', en: 'As Fate Intended' }, { pt: 'Vença no Normal ou acima.', en: 'Win on Normal or above.' }, runWin(function (p, e) { return e.diffTier >= 1; })),
    A('vencerDificil', { pt: 'Contra a Maré', en: 'Against the Tide' }, { pt: 'Vença no Difícil ou acima.', en: 'Win on Hard or above.' }, runWin(function (p, e) { return e.diffTier >= 2; })),
    A('maldicao10', { pt: 'O Verdadeiro Jogo', en: 'The True Game' }, { pt: 'Vença a Maldição 10.', en: 'Beat Curse 10.' }, runWin(function (p, e) { return e.curseLvl >= 10; })),
    A('chefeSecretoAch', { pt: 'Fora do Roteiro', en: 'Off Script' }, { pt: 'Derrote um chefe secreto.', en: 'Defeat a secret boss.' }, function (p, e) { return e.t === 'bossKill' && e.secret; }),
    A('salaSecreta', { pt: 'Atrás da Parede', en: 'Behind the Wall' }, { pt: 'Encontre uma sala secreta.', en: 'Find a secret room.' }, function (p, e) { return e.t === 'secretRoom'; }),
    A('cincoIguais', { pt: 'Ritual Absoluto', en: 'Absolute Ritual' }, { pt: 'Use 5 símbolos iguais no mesmo turno.', en: 'Use 5 identical symbols in one turn.' }, function (p, e) { return e.t === 'combo' && e.id === 'ritualAbsoluto'; }),
    A('cincoDiferentes', { pt: 'Ordem Perfeita', en: 'Perfect Order' }, { pt: 'Use 5 símbolos diferentes no mesmo turno.', en: 'Use 5 different symbols in one turn.' }, function (p, e) { return e.t === 'combo' && e.id === 'ordemPerfeita'; }),
    A('dezReliquias', { pt: 'Colecionador', en: 'Collector' }, { pt: 'Tenha 10 relíquias em uma run.', en: 'Hold 10 relics in one run.' }, function (p, e) { return e.t === 'relicGain' && e.count >= 10; }),
    A('cincoMalditas', { pt: 'Abraçando a Escuridão', en: 'Embracing Darkness' }, { pt: 'Tenha 5 relíquias amaldiçoadas ao mesmo tempo.', en: 'Hold 5 cursed relics at once.' }, function (p, e) { return e.t === 'relicGain' && e.cursedCount >= 5; }),
    A('timeAleatorio', { pt: 'Nas Mãos do Acaso', en: 'In Chance\'s Hands' }, { pt: 'Vença com uma equipe aleatória.', en: 'Win with a random team.' }, runWin(function (p, e) { return e.randomTeam; })),
    // ——— chefes das 8 regiões ———
    A('mataReiGoblin', { pt: 'Regicídio Barato', en: 'Cheap Regicide' }, { pt: 'Derrote o Rei Goblin da Carroça.', en: 'Defeat the Goblin Cart King.' }, boss('reiGoblin')),
    A('mataBruxa', { pt: 'Caldeirão Frio', en: 'Cold Cauldron' }, { pt: 'Derrote a Bruxa do Pântano.', en: 'Defeat the Swamp Witch.' }, boss('bruxaPantano')),
    A('mataHidra', { pt: 'Sem Cabeças', en: 'Headless' }, { pt: 'Derrote a Hidra de Ossos.', en: 'Defeat the Bone Hydra.' }, boss('hidraOssos')),
    A('mataGigante', { pt: 'Martelo Calado', en: 'Silent Hammer' }, { pt: 'Derrote o Gigante da Forja.', en: 'Defeat the Forge Giant.' }, boss('giganteForja')),
    A('mataDuque', { pt: 'Rosto Verdadeiro', en: 'True Face' }, { pt: 'Derrote o Duque das Máscaras.', en: 'Defeat the Duke of Masks.' }, boss('duqueMascaras')),
    A('mataRainha', { pt: 'Fim da Miragem', en: 'Mirage\'s End' }, { pt: 'Derrote a Rainha da Miragem.', en: 'Defeat the Mirage Queen.' }, boss('rainhaMiragem')),
    A('mataOraculo', { pt: 'Futuro Cancelado', en: 'Future Cancelled' }, { pt: 'Derrote o Oráculo Afogado.', en: 'Defeat the Drowned Oracle.' }, boss('oraculoAfogado')),
    A('mataDadoNegro', { pt: 'A Última Rolagem', en: 'The Final Roll' }, { pt: 'Derrote o Dado Negro.', en: 'Defeat the Black Die.' }, boss('dadoNegro')),
    // ——— chefes secretos ———
    A('mataFerreiro', { pt: 'Aprendiz do Cego', en: 'Blind Man\'s Apprentice' }, { pt: 'Derrote o Ferreiro Cego.', en: 'Defeat the Blind Smith.' }, boss('ferreiroCego'), true),
    A('mataCrianca', { pt: 'Sorte Emprestada', en: 'Borrowed Luck' }, { pt: 'Derrote a Criança da Sorte.', en: 'Defeat the Lucky Child.' }, boss('criancaSorte'), true),
    A('mataReiSemNumero', { pt: 'Coroa Vazia', en: 'Empty Crown' }, { pt: 'Derrote o Rei Sem Número.', en: 'Defeat the Numberless King.' }, boss('reiSemNumero'), true),
    A('mataMaeDasFaces', { pt: 'Órfãos das Faces', en: 'Orphans of Faces' }, { pt: 'Derrote a Mãe das Faces.', en: 'Defeat the Mother of Faces.' }, boss('maeDasFaces'), true),
    // ——— finais ———
    A('finalBom', { pt: 'O Acaso Livre', en: 'Chance Unbound' }, { pt: 'Alcance o final bom.', en: 'Reach the good ending.' }, function (p, e) { return e.t === 'runEnd' && e.endingId === 'bom'; }),
    A('finalSombrio', { pt: 'Nova Face do Medo', en: 'Fear\'s New Face' }, { pt: 'Alcance o final sombrio.', en: 'Reach the dark ending.' }, function (p, e) { return e.t === 'runEnd' && e.endingId === 'sombrio'; }, true),
    A('finalSecreto', { pt: 'Sem Dados, Sem Donos', en: 'No Dice, No Masters' }, { pt: 'Alcance o final secreto.', en: 'Reach the secret ending.' }, function (p, e) { return e.t === 'runEnd' && e.endingId === 'secreto'; }, true),
    // ——— modos ———
    A('vencerRapido', { pt: 'Almoço Rápido', en: 'Quick Lunch' }, { pt: 'Vença o Modo Rápido.', en: 'Win Quick Mode.' }, runWin(function (p, e) { return e.modeId === 'rapido'; })),
    A('vencerDraft', { pt: 'Olho para Talento', en: 'Eye for Talent' }, { pt: 'Vença o Draft.', en: 'Win Draft.' }, runWin(function (p, e) { return e.modeId === 'draft'; })),
    A('torre10', { pt: 'Décimo Andar', en: 'Tenth Floor' }, { pt: 'Chegue ao andar 10 da Torre Infinita.', en: 'Reach floor 10 of the Endless Tower.' }, function (p, e) { return e.t === 'runEnd' && e.modeId === 'torreInfinita' && e.floor >= 10; }),
    A('torre25', { pt: 'Acima das Nuvens', en: 'Above the Clouds' }, { pt: 'Chegue ao andar 25 da Torre Infinita.', en: 'Reach floor 25 of the Endless Tower.' }, function (p, e) { return e.t === 'runEnd' && e.modeId === 'torreInfinita' && e.floor >= 25; }),
    A('vencerDiario', { pt: 'Prato do Dia', en: 'Daily Special' }, { pt: 'Vença um Desafio Diário.', en: 'Win a Daily Challenge.' }, runWin(function (p, e) { return e.modeId === 'diario'; })),
    A('vencerCaos', { pt: 'Dançando na Tempestade', en: 'Dancing in the Storm' }, { pt: 'Vença o modo Caos.', en: 'Win Chaos mode.' }, runWin(function (p, e) { return e.modeId === 'caos'; })),
    A('vencerReliquiaUnica', { pt: 'Um Só Tesouro', en: 'One Treasure' }, { pt: 'Vença o modo Relíquia Única.', en: 'Win Single Relic mode.' }, runWin(function (p, e) { return e.modeId === 'reliquiaUnica'; })),
    A('vencerSemCuraModo', { pt: 'Ferro e Osso', en: 'Iron and Bone' }, { pt: 'Vença o modo Sem Cura.', en: 'Win No Healing mode.' }, runWin(function (p, e) { return e.modeId === 'semCura'; })),
    A('bossRushOuro', { pt: 'Fila dos Reis', en: 'Queue of Kings' }, { pt: 'Complete o Boss Rush.', en: 'Complete Boss Rush.' }, runWin(function (p, e) { return e.modeId === 'bossRush'; })),
    A('abismo10', { pt: 'Fundo Falso', en: 'False Bottom' }, { pt: 'Chegue à sala 10 do Abismo Infinito.', en: 'Reach room 10 of the Endless Abyss.' }, function (p, e) { return e.t === 'runEnd' && e.modeId === 'abismo' && e.floor >= 10; }, true),
    A('vencerSolitario', { pt: 'Exército de Um', en: 'Army of One' }, { pt: 'Vença o modo Herói Solitário.', en: 'Win Lone Hero mode.' }, runWin(function (p, e) { return e.modeId === 'solitario'; })),
    A('vencerDupla', { pt: 'Dupla Dinâmica', en: 'Dynamic Duo' }, { pt: 'Vença o modo Dupla.', en: 'Win Duo mode.' }, runWin(function (p, e) { return e.modeId === 'dupla'; })),
    A('maldicao1', { pt: 'Primeiro Peso', en: 'First Burden' }, { pt: 'Vença a Maldição 1.', en: 'Beat Curse 1.' }, runWin(function (p, e) { return e.curseLvl >= 1; })),
    A('maldicao5', { pt: 'Metade do Abismo', en: 'Half the Abyss' }, { pt: 'Vença a Maldição 5.', en: 'Beat Curse 5.' }, runWin(function (p, e) { return e.curseLvl >= 5; })),
    A('vencerVeterano', { pt: 'Cicatrizes Contam', en: 'Scars Count' }, { pt: 'Vença no Veterano.', en: 'Win on Veteran.' }, runWin(function (p, e) { return e.diffTier >= 3; })),
    // ——— economia ———
    A('ouro200', { pt: 'Bolsos Fundos', en: 'Deep Pockets' }, { pt: 'Tenha 200 de ouro de uma vez.', en: 'Hold 200 gold at once.' }, function (p, e) { return e.t === 'goldChange' && e.gold >= 200; }),
    A('gastar300', { pt: 'Cliente Fiel', en: 'Loyal Customer' }, { pt: 'Gaste 300 de ouro em uma run.', en: 'Spend 300 gold in one run.' }, function (p, e) { return e.t === 'runEnd' && e.goldSpent >= 300; }),
    A('comprar10', { pt: 'Liquidação', en: 'Clearance Sale' }, { pt: 'Compre 10 itens de loja em uma run.', en: 'Buy 10 shop items in one run.' }, function (p, e) { return e.t === 'shopBuy' && e.buysThisRun >= 10; }),
    A('milionario', { pt: 'Fortuna do Acaso', en: 'Fortune of Chance' }, { pt: 'Acumule 1000 de ouro (total).', en: 'Earn 1000 gold (lifetime).' }, stat(function (s) { return (s.goldEarned | 0) >= 1000; })),
    // ——— combate ———
    A('escudo15', { pt: 'Fortaleza Viva', en: 'Living Fortress' }, { pt: 'Ganhe 15 de escudo em um turno.', en: 'Gain 15 shield in one turn.' }, function (p, e) { return e.t === 'turnEnd' && e.shieldGained >= 15; }),
    A('umHpHeroi', { pt: 'Por Um Fio', en: 'By a Thread' }, { pt: 'Vença uma luta com um herói em 1 HP.', en: 'Win a fight with a hero at 1 HP.' }, battleWin(function (p, e) { return e.heroAt1Hp; })),
    A('turno1', { pt: 'Golpe Relâmpago', en: 'Lightning Strike' }, { pt: 'Vença uma luta no primeiro turno.', en: 'Win a fight on turn one.' }, battleWin(function (p, e) { return e.turns <= 1; })),
    A('lutaLonga', { pt: 'Maratona', en: 'Marathon' }, { pt: 'Vença uma luta com 10+ turnos.', en: 'Win a fight lasting 10+ turns.' }, battleWin(function (p, e) { return e.turns >= 10; })),
    A('pacifista', { pt: 'Guerra Sem Lâmina', en: 'Bladeless War' }, { pt: 'Vença uma luta sem causar dano direto.', en: 'Win a fight without direct damage.' }, battleWin(function (p, e) { return e.noDamageDealt; }), true),
    A('trincaTripla', { pt: 'Vidro Valente', en: 'Brave Glass' }, { pt: 'Vença usando 3 dados trincados no mesmo turno.', en: 'Win using 3 cracked dice in one turn.' }, battleWin(function (p, e) { return e.crackedUsed >= 3; }), true),
    A('controlador', { pt: 'Marionetista', en: 'Puppeteer' }, { pt: 'Atordoe inimigos 5 vezes em uma luta.', en: 'Stun enemies 5 times in one fight.' }, function (p, e) { return e.t === 'battleEnd' && e.stuns >= 5; }),
    A('combo10', { pt: 'Maestro dos Símbolos', en: 'Symbol Maestro' }, { pt: 'Dispare 3 combos na mesma luta.', en: 'Trigger 3 combos in one fight.' }, function (p, e) { return e.t === 'battleEnd' && e.combos >= 3; }),
    A('reviver3', { pt: 'Contra a Morte', en: 'Against Death' }, { pt: 'Reviva aliados 3 vezes em uma run.', en: 'Revive allies 3 times in one run.' }, function (p, e) { return e.t === 'runEnd' && e.revives >= 3; }),
    A('semQuedas', { pt: 'Nenhum a Menos', en: 'None the Fewer' }, { pt: 'Vença uma run sem nenhum herói cair.', en: 'Win a run with no hero downed.' }, runWin(function (p, e) { return e.downsTotal === 0; })),
    A('tudoSeis', { pt: 'Mão Perfeita', en: 'Perfect Hand' }, { pt: 'Role cinco valores máximos de uma vez.', en: 'Roll five max values at once.' }, function (p, e) { return e.t === 'roll' && e.allSix; }, true),
    A('destino50', { pt: 'Amigo do Destino', en: 'Fate\'s Friend' }, { pt: 'Veja o Dado do Destino agir 50 vezes.', en: 'See the Fate Die act 50 times.' }, stat(function (s) { return (s.fateCount | 0) >= 50; })),
    A('matador100', { pt: 'Centurião', en: 'Centurion' }, { pt: 'Derrote 100 inimigos (total).', en: 'Defeat 100 enemies (lifetime).' }, stat(function (s) { return (s.kills | 0) >= 100; })),
    A('matador500', { pt: 'Lenda da Estrada', en: 'Road Legend' }, { pt: 'Derrote 500 inimigos (total).', en: 'Defeat 500 enemies (lifetime).' }, stat(function (s) { return (s.kills | 0) >= 500; })),
    // ——— coleção ———
    A('reliquias30', { pt: 'Vitrine Modesta', en: 'Modest Display' }, { pt: 'Descubra 30 relíquias.', en: 'Discover 30 relics.' }, function (p, e) { return nkeys(p.seenRelics) >= 30; }),
    A('reliquias60', { pt: 'Galeria Particular', en: 'Private Gallery' }, { pt: 'Descubra 60 relíquias.', en: 'Discover 60 relics.' }, function (p, e) { return nkeys(p.seenRelics) >= 60; }),
    A('reliquias100', { pt: 'O Museu do Acaso', en: 'Museum of Chance' }, { pt: 'Descubra todas as 100 relíquias.', en: 'Discover all 100 relics.' }, function (p, e) { return nkeys(p.seenRelics) >= 100; }),
    A('faces60', { pt: 'Gravador de Runas', en: 'Rune Engraver' }, { pt: 'Descubra 60 Faces Rúnicas.', en: 'Discover 60 Runic Faces.' }, function (p, e) { return nkeys(p.seenFaces) >= 60; }),
    A('faces120', { pt: 'Mestre Gravador', en: 'Master Engraver' }, { pt: 'Descubra 120 Faces Rúnicas.', en: 'Discover 120 Runic Faces.' }, function (p, e) { return nkeys(p.seenFaces) >= 120; }),
    A('faces180', { pt: 'Todas as Faces', en: 'Every Face' }, { pt: 'Descubra as 180 Faces Rúnicas.', en: 'Discover all 180 Runic Faces.' }, function (p, e) { return nkeys(p.seenFaces) >= 180; }),
    A('bestiario20', { pt: 'Naturalista', en: 'Naturalist' }, { pt: 'Registre 20 inimigos no bestiário.', en: 'Log 20 enemies in the bestiary.' }, function (p, e) { return nkeys(p.seenEnemies) >= 20; }),
    A('bestiario50', { pt: 'Monstrólogo', en: 'Monstrologist' }, { pt: 'Registre 50 inimigos no bestiário.', en: 'Log 50 enemies in the bestiary.' }, function (p, e) { return nkeys(p.seenEnemies) >= 50; }),
    A('bestiario90', { pt: 'Enciclopédia Viva', en: 'Living Encyclopedia' }, { pt: 'Registre 90 inimigos no bestiário.', en: 'Log 90 enemies in the bestiary.' }, function (p, e) { return nkeys(p.seenEnemies) >= 90; }),
    A('heroiFiel', { pt: 'Companheiro Fiel', en: 'Faithful Companion' }, { pt: 'Jogue 10 runs com o mesmo herói.', en: 'Play 10 runs with the same hero.' }, stat(function (s) { if (!s.heroUse) return false; for (var k in s.heroUse) if (s.heroUse[k] >= 10) return true; return false; })),
    A('todosHerois', { pt: 'Elenco Completo', en: 'Full Cast' }, { pt: 'Jogue ao menos uma run com cada um dos 30 heróis.', en: 'Play at least one run with each of the 30 heroes.' }, stat(function (s) { return nkeys(s.heroUse) >= 30; })),
    A('runs10', { pt: 'Viciado em Dados', en: 'Dice Addict' }, { pt: 'Complete 10 runs (vencendo ou não).', en: 'Complete 10 runs (win or lose).' }, stat(function (s) { return (s.runs | 0) >= 10; })),
    A('runs50', { pt: 'O Acaso é um Estilo de Vida', en: 'Chance Is a Lifestyle' }, { pt: 'Complete 50 runs.', en: 'Complete 50 runs.' }, stat(function (s) { return (s.runs | 0) >= 50; })),
    A('mestreDoAcaso', { pt: 'Mestre do Acaso', en: 'Master of Chance' }, { pt: 'Vença em 8 modos de jogo diferentes.', en: 'Win in 8 different game modes.' }, stat(function (s) { var n = 0; if (s.winsByMode) for (var k in s.winsByMode) if (s.winsByMode[k] > 0) n++; return n >= 8; }))
  ];

  var byId = {};
  RA.data.Achievements.forEach(function (a) { byId[a.id] = a; });
  RA.data.AchievementsById = byId;

  // Avalia todas as conquistas ainda não obtidas contra um evento; retorna as novas.
  RA.data.checkAchievements = function (profile, ev) {
    var got = [];
    for (var i = 0; i < RA.data.Achievements.length; i++) {
      var a = RA.data.Achievements[i];
      if (profile.achievements[a.id]) continue;
      var ok = false;
      try { ok = !!a.check(profile, ev); } catch (err) { ok = false; }
      if (ok) { profile.achievements[a.id] = Date.now(); got.push(a); }
    }
    return got;
  };
})();
