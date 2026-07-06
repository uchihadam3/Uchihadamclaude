// I18n: todo texto visível passa por T() (objetos {pt,en}) ou por chave do
// dicionário UI. Trocar idioma é só dado.
(function () {
  var UI = {
    pt: {
      play: 'JOGAR', continue_: 'CONTINUAR RUN', modes: 'MODOS', codex: 'CODEX',
      achievements: 'CONQUISTAS', settings: 'CONFIG', back: 'VOLTAR',
      newRun: 'NOVA RUN', chooseMode: 'ESCOLHA O MODO', chooseHeroes: 'MONTE SUA EQUIPE',
      chooseDifficulty: 'DIFICULDADE', start: 'COMEÇAR', reroll: 'REROLAR',
      done: 'FINALIZAR', rolls: 'rolagens', turn: 'TURNO', wave: 'Onda',
      victory: 'VITÓRIA', defeat: 'DERROTA', rewards: 'RECOMPENSAS',
      gold: 'moedas', shop: 'LOJA', event: 'EVENTO', elite: 'ELITE', boss: 'CHEFE',
      battle: 'BATALHA', special: 'SALA ESPECIAL', rest: 'DESCANSO',
      buy: 'COMPRAR', sell: 'VENDER', leave: 'SAIR', skip: 'PULAR',
      pickReward: 'Escolha uma recompensa', pickFace: 'Escolha uma Face Rúnica',
      pickRelic: 'Escolha uma relíquia', applyTo: 'Aplicar em qual herói?',
      whichSide: 'Substituir qual lado?', heroDown: 'caiu!', revived: 'reviveu!',
      frontline: 'LINHA DE FRENTE', backline: 'LINHA DE TRÁS',
      fateDie: 'DADO DO DESTINO', combo: 'COMBO!', locked: 'travado',
      hp: 'PV', shield: 'escudo', intent: 'intenção', map: 'MAPA', region: 'REGIÃO',
      bestiary: 'BESTIÁRIO', relics: 'RELÍQUIAS', faces: 'FACES RÚNICAS',
      statsTitle: 'ESTATÍSTICAS', history: 'HISTÓRICO', lang: 'Idioma',
      musicVol: 'Volume da música', sfxVol: 'Volume dos efeitos',
      animSpeed: 'Velocidade de animação', textSize: 'Tamanho do texto',
      colorblind: 'Modo daltônico', reduceShake: 'Reduzir tremor',
      reduceFlash: 'Reduzir flashes', detailedTooltips: 'Tooltips detalhados',
      confirmEndTurn: 'Confirmar fim de turno', leftHanded: 'Modo canhoto',
      wipeSave: 'Apagar progresso', confirmWipe: 'Tem certeza? Apaga TUDO.',
      heroesAlive: 'heróis vivos', floors: 'andares', bestScore: 'recorde',
      lockedContent: 'BLOQUEADO', unlockHint: 'Segredo... continue jogando',
      dragHint: 'Arraste o dado até um alvo', tapLock: 'Toque para travar',
      passive: 'Passiva', deaths: 'quedas', permaDeath: 'morreu na run!',
      summon: 'invocação', enemyTurn: 'Turno inimigo...', yourTurn: 'Seu turno',
      chooseFate: 'Escolha o destino', crackedSide: 'lado trincado',
      goldenSide: 'LADO DOURADO', usesLeft: 'usos', newUnlock: 'NOVO DESBLOQUEIO!',
      achievementGot: 'CONQUISTA!', secretFound: 'SEGREDO ENCONTRADO!',
      run: 'Run', give: 'dar', receive: 'receber', close: 'FECHAR',
      confirmTurn: 'Terminar o turno?', yes: 'SIM', no: 'NÃO', heal: 'curar',
      full: 'CHEIO', empty: 'vazio', next: 'PRÓXIMO', collect: 'COLETAR',
      dieBlocked: 'Dado bloqueado!', needEnemy: 'Mire em um inimigo',
      needAlly: 'Mire em um aliado', newRule: 'NOVA REGRA!'
    },
    en: {
      play: 'PLAY', continue_: 'CONTINUE RUN', modes: 'MODES', codex: 'CODEX',
      achievements: 'ACHIEVEMENTS', settings: 'SETTINGS', back: 'BACK',
      newRun: 'NEW RUN', chooseMode: 'CHOOSE MODE', chooseHeroes: 'BUILD YOUR PARTY',
      chooseDifficulty: 'DIFFICULTY', start: 'START', reroll: 'REROLL',
      done: 'DONE ROLLING', rolls: 'rolls', turn: 'TURN', wave: 'Wave',
      victory: 'VICTORY', defeat: 'DEFEAT', rewards: 'REWARDS',
      gold: 'gold', shop: 'SHOP', event: 'EVENT', elite: 'ELITE', boss: 'BOSS',
      battle: 'BATTLE', special: 'SPECIAL ROOM', rest: 'REST',
      buy: 'BUY', sell: 'SELL', leave: 'LEAVE', skip: 'SKIP',
      pickReward: 'Pick a reward', pickFace: 'Pick a Runic Face',
      pickRelic: 'Pick a relic', applyTo: 'Apply to which hero?',
      whichSide: 'Replace which side?', heroDown: 'is down!', revived: 'revived!',
      frontline: 'FRONTLINE', backline: 'BACKLINE',
      fateDie: 'FATE DIE', combo: 'COMBO!', locked: 'locked',
      hp: 'HP', shield: 'shield', intent: 'intent', map: 'MAP', region: 'REGION',
      bestiary: 'BESTIARY', relics: 'RELICS', faces: 'RUNIC FACES',
      statsTitle: 'STATS', history: 'HISTORY', lang: 'Language',
      musicVol: 'Music volume', sfxVol: 'SFX volume',
      animSpeed: 'Animation speed', textSize: 'Text size',
      colorblind: 'Colorblind mode', reduceShake: 'Reduce shake',
      reduceFlash: 'Reduce flashes', detailedTooltips: 'Detailed tooltips',
      confirmEndTurn: 'Confirm end turn', leftHanded: 'Left-handed mode',
      wipeSave: 'Wipe save', confirmWipe: 'Sure? Deletes EVERYTHING.',
      heroesAlive: 'heroes alive', floors: 'floors', bestScore: 'best',
      lockedContent: 'LOCKED', unlockHint: 'Secret... keep playing',
      dragHint: 'Drag the die onto a target', tapLock: 'Tap to lock',
      passive: 'Passive', deaths: 'downs', permaDeath: 'died this run!',
      summon: 'summon', enemyTurn: 'Enemy turn...', yourTurn: 'Your turn',
      chooseFate: 'Choose fate', crackedSide: 'cracked side',
      goldenSide: 'GOLDEN SIDE', usesLeft: 'uses', newUnlock: 'NEW UNLOCK!',
      achievementGot: 'ACHIEVEMENT!', secretFound: 'SECRET FOUND!',
      run: 'Run', give: 'give', receive: 'receive', close: 'CLOSE',
      confirmTurn: 'End the turn?', yes: 'YES', no: 'NO', heal: 'heal',
      full: 'FULL', empty: 'empty', next: 'NEXT', collect: 'COLLECT',
      dieBlocked: 'Die blocked!', needEnemy: 'Target an enemy',
      needAlly: 'Target an ally', newRule: 'NEW RULE!'
    }
  };

  RA.core.I18n = {
    lang: function () { return RA.core.Save.get().lang; },
    setLang: function (l) { RA.core.Save.get().lang = l; RA.core.Save.save(); },
    ui: function (key) {
      var l = this.lang();
      return (UI[l] && UI[l][key]) || UI.pt[key] || key;
    },
    // T({pt,en}) ou string simples
    t: function (obj) {
      if (obj == null) return '';
      if (typeof obj === 'string') return obj;
      var l = this.lang();
      return obj[l] || obj.pt || obj.en || '';
    }
  };
  // atalhos globais
  RA.T = function (o) { return RA.core.I18n.t(o); };
  RA.UI = function (k) { return RA.core.I18n.ui(k); };
})();
