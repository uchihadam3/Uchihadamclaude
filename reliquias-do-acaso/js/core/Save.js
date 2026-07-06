// Save: persistência local completa — perfil (desbloqueios, conquistas,
// bestiário, estatísticas, config) e run em andamento (retomável).
(function () {
  var KEY = RA.config.SAVE_KEY;

  function defaultProfile() {
    return {
      version: 1,
      lang: 'pt',
      settings: {
        musicVol: 0.7, sfxVol: 0.85, animSpeed: 1, textSize: 1,
        colorblind: false, reduceShake: false, reduceFlash: false,
        detailedTooltips: true, confirmEndTurn: false, leftHanded: false
      },
      unlockedHeroes: ['guardiao', 'espadachim', 'escudeira', 'clerigo', 'ladino',
        'arqueira', 'piromante', 'bardo', 'druida', 'paladino'],
      unlockedModes: ['campanha', 'rapido', 'draft'],
      seenRelics: {}, seenFaces: {}, seenEnemies: {}, beatenBosses: {},
      achievements: {},
      stats: {
        runs: 0, wins: 0, losses: 0, kills: 0, maxDamageTurn: 0, maxHealFight: 0,
        totalDamage: 0, totalHeal: 0, poisonsApplied: 0, rerolls: 0,
        heroUse: {}, modePlays: {}, winsByMode: {}, bestDifficulty: -1,
        bestCurse: 0, combosDone: 0, goldEarned: 0, fateCount: 0,
        secretsFound: [], towerBest: 0, abyssBest: 0, diaryBest: {},
        endings: {}
      },
      jukebox: [],
      run: null
    };
  }

  var profile = null;

  function load() {
    if (profile) return profile;
    try {
      var raw = localStorage.getItem(KEY);
      profile = raw ? JSON.parse(raw) : defaultProfile();
      // merge defensivo com defaults (atualizações de esquema)
      var def = defaultProfile();
      Object.keys(def).forEach(function (k) {
        if (profile[k] === undefined) profile[k] = def[k];
      });
      Object.keys(def.settings).forEach(function (k) {
        if (profile.settings[k] === undefined) profile.settings[k] = def.settings[k];
      });
      Object.keys(def.stats).forEach(function (k) {
        if (profile.stats[k] === undefined) profile.stats[k] = def.stats[k];
      });
    } catch (e) {
      profile = defaultProfile();
    }
    return profile;
  }

  var saveTimer = null;
  function save() {
    if (saveTimer) return;
    saveTimer = setTimeout(function () {
      saveTimer = null;
      try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch (e) { }
    }, 120);
  }

  function saveNow() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch (e) { }
  }

  RA.core.Save = {
    load: load, save: save, saveNow: saveNow,
    get: function () { return load(); },
    wipe: function () { profile = defaultProfile(); saveNow(); }
  };
})();
