// Run: o estado de uma run — mapa por região, batalhas, loja, eventos,
// recompensas, modos, dificuldades, segredos, finais e retomada (save).
// RA.game.Meta: conquistas + estatísticas + desbloqueios permanentes.
(function () {

  // ============================================================
  // META: conquistas, stats, desbloqueios
  // ============================================================
  var Meta = RA.game.Meta = {
    toasts: [], // {kind:'ach'|'unlock'|'secret', title, sub}
    emit: function (ev) {
      var p = RA.core.Save.get();
      var got = RA.data.checkAchievements(p, ev);
      got.forEach(function (a) {
        Meta.toasts.push({ kind: 'ach', title: RA.UI('achievementGot'), sub: RA.T(a.name) });
        if (RA.audio && RA.audio.sfx) RA.audio.sfx('achievement');
      });
      RA.core.Save.save();
      return got;
    },
    stat: function (kind, d) {
      var s = RA.core.Save.get().stats;
      if (kind === 'kill') { s.kills++; if (d && d.id) Meta.seeEnemy(d.id); Meta.emit({ t: 'stat' }); }
      else if (kind === 'reroll') s.rerolls++;
      else if (kind === 'combo') { s.combosDone++; Meta.emit({ t: 'combo', id: d.id }); }
      else if (kind === 'fate') { s.fateCount = (s.fateCount || 0) + 1; }
      else if (kind === 'roll' && d && d.allSix) Meta.emit({ t: 'roll', allSix: true });
      else if (kind === 'turnEnd') { s.maxDamageTurn = Math.max(s.maxDamageTurn, d.dmg || 0); Meta.emit({ t: 'turnEnd', dmg: d.dmg || 0, shieldGained: d.shieldGained || 0 }); }
      else if (kind === 'repair' && RA.game.run) { RA.game.run.counters.repairs += (d && d.n) || 1; RA.game.run.checkSecrets(); }
      else if (kind === 'revive' && RA.game.run) RA.game.run.counters.revives++;
      else if (kind === 'down' && RA.game.run) RA.game.run.counters.downsTotal++;
      RA.core.Save.save();
    },
    seeEnemy: function (id) {
      var p = RA.core.Save.get();
      if (!p.seenEnemies[id]) { p.seenEnemies[id] = 1; RA.core.Save.save(); }
    },
    seeRelic: function (id) {
      var p = RA.core.Save.get();
      if (!p.seenRelics[id]) { p.seenRelics[id] = 1; Meta.emit({ t: 'stat' }); }
    },
    seeFace: function (id) {
      var p = RA.core.Save.get();
      if (!p.seenFaces[id]) { p.seenFaces[id] = 1; Meta.emit({ t: 'stat' }); }
    },
    secretFound: function (id, title) {
      var p = RA.core.Save.get();
      if (p.stats.secretsFound.indexOf(id) < 0) {
        p.stats.secretsFound.push(id);
        Meta.toasts.push({ kind: 'secret', title: RA.UI('secretFound'), sub: title ? RA.T(title) : '' });
        if (RA.audio && RA.audio.sfx) RA.audio.sfx('secret');
        RA.core.Save.save();
        return true;
      }
      return false;
    },
    isModeUnlocked: function (m) {
      if (!m.unlock) return true;
      try { return !!m.unlock.check(RA.core.Save.get()); } catch (e) { return false; }
    },
    // ordem de desbloqueio de heróis (vitória libera 2, derrota 1)
    heroUnlockOrder: ['criomante', 'necromante', 'berserker', 'monge', 'alquimista',
      'ilusionista', 'artifice', 'samurai', 'bruxa', 'capita', 'oraculo', 'cacador',
      'golem', 'vampira', 'geomante', 'tempestario', 'medico', 'duelista', 'invocadora', 'cronomante'],
    unlockHeroes: function (n) {
      var p = RA.core.Save.get();
      var got = [];
      for (var i = 0; i < Meta.heroUnlockOrder.length && got.length < n; i++) {
        var id = Meta.heroUnlockOrder[i];
        if (p.unlockedHeroes.indexOf(id) < 0) {
          p.unlockedHeroes.push(id);
          got.push(id);
          var def = RA.data.Heroes.byId[id];
          Meta.toasts.push({ kind: 'unlock', title: RA.UI('newUnlock'), sub: RA.T(def.name) });
        }
      }
      if (got.length) RA.core.Save.save();
      return got;
    }
  };

  // ============================================================
  // RUN
  // ============================================================
  var SECRET_RELICS = ['martePrimeiraFace', 'dadoInocente', 'vidroValente', 'muralhaViva'];

  function Run() {}

  Run.start = function (opts) {
    var r = new Run();
    var p = RA.core.Save.get();
    r.modeId = opts.modeId || 'campanha';
    r.mode = RA.data.ModesById[r.modeId];
    r.rules = r.mode.rules || {};
    r.diffId = opts.diffId || 'normal';
    r.curseLvl = opts.curseLvl || 0;
    r.diff = RA.data.difficultyFx(r.diffId, r.curseLvl);
    if (r.rules.enemyHpMul) r.diff.enemyHpMul = (r.diff.enemyHpMul || 1) * r.rules.enemyHpMul;
    r.seed = (r.rules.dailySeed ? RA.core.dailySeed() : (opts.seed || ((Date.now() ^ (Math.random() * 0xffffffff)) >>> 0)));
    r.rng = new RA.core.Rng(r.seed);
    r.gold = 25;
    r.randomTeam = !!opts.randomTeam;
    r.startedAt = Date.now();

    var size = r.rules.partySize || RA.config.PARTY_SIZE;
    var ids = (opts.heroIds || []).slice(0, size);
    r.party = ids.map(function (id, i) { return Run.mkHero(id, i, size, r); });
    if (r.rules.soloBoost) r.party.forEach(function (h) { h.maxHp = Math.round(h.maxHp * 1.8); h.hp = h.maxHp; });
    if (r.rules.partySize === 2) r.party.forEach(function (h) { h.maxHp = Math.round(h.maxHp * 1.3); h.hp = h.maxHp; });

    r.relics = [];
    if (opts.startRelicId) r.addRelic(opts.startRelicId);
    if (r.diff.startCracked) {
      var vict = r.rng.pick(r.party);
      var face = r.rng.pick(vict.faces);
      face.cracked = true; if (face.uses === undefined) face.uses = 2;
    }

    r.mods = {};        // preMods p/ próxima batalha (eventos)
    r.persistMods = {}; // mods que duram a run (frascoFonte, cartaTorre...)
    r.counters = { repairs: 0, noRerollWins: 0, fiveSame: 0, secretRooms: 0, revives: 0, downsTotal: 0, healsUsed: 0, goldSpent: 0, shopBuys: 0, battlesWon: 0, cracked3win: false, allFrontRegion: true, usedBosses: {}, beatenSecret: {} };
    r.floor = 0;
    r.finished = false;
    r.endingId = null;
    r.eventLog = [];
    r.secretMapReady = false;
    r.usedEvents = [];

    // sequência de regiões
    var allR = RA.data.Regions.map(function (x) { return x.id; });
    if (r.rules.regions === 3 && r.rules.randomRegions) {
      var pick3 = r.rng.shuffle(allR.slice(0, 7)).slice(0, 2);
      r.regionSeq = pick3.concat(['torre']);
    } else if (r.rules.infinite || r.rules.bossRush) {
      r.regionSeq = allR;
    } else {
      r.regionSeq = allR;
    }
    r.regionIdx = 0;
    r.buildRegion();

    // stats de perfil
    p.stats.runs++;
    r.party.forEach(function (h) { p.stats.heroUse[h.id] = (p.stats.heroUse[h.id] || 0) + 1; });
    p.stats.modePlays[r.modeId] = (p.stats.modePlays[r.modeId] || 0) + 1;
    RA.core.Save.save();

    RA.game.run = r;
    r.save();
    return r;
  };

  Run.mkHero = function (id, i, size, r) {
    var def = RA.data.Heroes.byId[id];
    var hp = def.hp;
    return {
      id: id, def: def, hp: hp, maxHp: hp,
      row: size <= 2 ? 'front' : (i < Math.ceil(size * 0.6) ? 'front' : 'back'),
      falls: 0, dead: false,
      faces: def.faces.map(function (f) { return Object.assign({}, f); })
    };
  };

  Run.prototype.region = function () { return RA.data.RegionsById[this.regionSeq[this.regionIdx]] || RA.data.RegionsById.torre; };

  Run.prototype.buildRegion = function () {
    var r = this;
    this.counters.allFrontRegion = true;
    if (this.rules.bossRush) {
      // sequência direta: elite -> chefe de cada região
      this.rooms = [];
      var self = this;
      this.regionSeq.forEach(function (rid) {
        var reg = RA.data.RegionsById[rid];
        self.rooms.push({ kind: 'elite', enemyIds: [reg.elite] });
        self.rooms.push({ kind: 'boss', enemyIds: [reg.boss] });
      });
      this.roomIdx = 0;
      return;
    }
    if (this.rules.infinite) {
      this.rooms = [{ kind: 'battle' }]; // gerada sob demanda por andar
      this.roomIdx = 0;
      return;
    }
    var order = ['battle', 'battle', 'event', 'battle', 'shop', 'battle', 'elite', 'battle', 'special', 'battle', 'boss'];
    if (this.diff.earlyElites) order = ['battle', 'battle', 'elite', 'battle', 'shop', 'event', 'battle', 'battle', 'special', 'battle', 'boss'];
    this.rooms = order.map(function (k) { return { kind: k }; });
    // Rei Sem Número: chegou à torre com 5+ amaldiçoadas
    if (this.region().id === 'torre' && this.cursedCount() >= 5 && !this.counters.beatenSecret.reiSemNumero) {
      this.rooms.splice(this.rooms.length - 1, 0, { kind: 'secretBoss', enemyIds: ['reiSemNumero'] });
      this.eventLog.push({ pt: 'As maldições chamam... O Rei Sem Número aguarda.', en: 'The curses call... The Numberless King awaits.' });
    }
    this.roomIdx = 0;
  };

  Run.prototype.cursedCount = function () {
    var n = 0;
    this.relics.forEach(function (id) { if (RA.data.Relics.byId[id].rarity === 'amaldicoada') n++; });
    return n;
  };

  Run.prototype.current = function () { return this.rooms[this.roomIdx]; };

  Run.prototype.advance = function () {
    this.roomIdx++;
    if (this.rules.infinite) {
      this.floor++;
      // fôlego entre andares: 25% de recuperação
      this.party.forEach(function (h) { if (!h.dead) h.hp = Math.min(h.maxHp, h.hp + Math.ceil(h.maxHp * 0.25)); });
      this.rooms.push({ kind: 'battle' });
      this.save();
      return this.current();
    }
    if (this.roomIdx >= this.rooms.length) {
      // região concluída
      if (this.counters.allFrontRegion && this.party.length >= 3) {
        if (Meta.secretFound('linhaDeFrente', { pt: 'Muralha Viva desbloqueada', en: 'Living Wall unlocked' })) {
          this.addRelic('muralhaViva');
        }
      }
      this.regionIdx++;
      if (this.regionIdx >= (this.rules.regions || this.regionSeq.length) || this.regionIdx >= this.regionSeq.length) {
        return null; // run vencida (tratada em onBossDefeated)
      }
      this.buildRegion();
    }
    this.save();
    return this.current();
  };

  // -------------------- batalhas --------------------
  Run.prototype.enemiesForRoom = function (room) {
    var r = this, reg = this.region();
    if (room.enemyIds) return room.enemyIds.map(function (id) { return RA.data.Enemies.byId[id]; });
    var pool = RA.data.Enemies.byRegionTier(reg.id, 'comum');
    if (this.rules.infinite) {
      // torre/abismo: região gira com o andar
      var regId = this.regionSeq[this.floor % this.regionSeq.length];
      if (this.rules.corrupted) regId = this.rng.pick(this.regionSeq);
      pool = RA.data.Enemies.byRegionTier(regId, 'comum');
      if (this.floor > 0 && this.floor % 10 === 9) return [RA.data.Enemies.byId[RA.data.RegionsById[regId].boss]];
      if (this.floor > 0 && this.floor % 5 === 4) return [RA.data.Enemies.byId[RA.data.RegionsById[regId].elite]].concat(this.rng.shuffle(pool.slice()).slice(0, 1));
    }
    var battleN = 0;
    for (var i = 0; i < this.roomIdx; i++) if (this.rooms[i].kind === 'battle') battleN++;
    var count = Math.min(5, 2 + Math.floor(battleN / 2) + (this.regionIdx >= 4 ? 1 : 0));
    if (this.rules.reducedFights) count = Math.max(1, count - 1);
    var picks = this.rng.shuffle(pool.slice()).slice(0, count);
    return picks;
  };

  Run.prototype.chaosRuleForBattle = function () {
    if (!this.rules.chaos && !(this.rules.corrupted)) return null;
    return this.rng.pick(RA.data.ChaosRules);
  };

  Run.prototype.startBattle = function (room) {
    var r = this;
    var kindMap = { battle: 'normal', elite: 'elite', boss: 'chefe', secretBoss: 'secreto', miniboss: 'elite', fight: 'normal' };
    var defs;
    if (room.kind === 'elite' && !room.enemyIds) defs = [RA.data.Enemies.byId[this.region().elite]];
    else if (room.kind === 'boss' && !room.enemyIds) {
      defs = [RA.data.Enemies.byId[this.region().boss]];
      if (this.rules.reducedFinal && this.region().id === 'torre') {
        var bd = Object.assign({}, defs[0]); bd.hp = Math.round(bd.hp * 0.7);
        defs = [bd];
      }
    }
    else defs = this.enemiesForRoom(room);
    // escala de andar (torre infinita/abismo)
    var diff = Object.assign({}, this.diff);
    if (this.rules.infinite) diff.enemyHpMul = (diff.enemyHpMul || 1) * (1 + this.floor * 0.08);

    var mods = this.mods; this.mods = {}; // consome mods de evento
    Object.assign(mods, this.persistMods);

    var party = this.party.filter(function (h) { return !h.dead; }).map(function (h) {
      return { id: h.id, def: h.def, hp: h.hp, maxHp: h.maxHp, row: h.row, falls: h.falls, faces: h.faces };
    });
    var relics = this.relics.map(function (id) { return RA.data.Relics.byId[id]; });
    var combat = new RA.game.Combat({
      party: party, enemies: defs, rng: this.rng, relics: relics,
      diff: diff, chaosRule: this.chaosRuleForBattle(), modeRules: this.rules,
      battleKind: kindMap[room.kind] || 'normal', preMods: mods,
      ctx: {
        getGold: function () { return r.gold; },
        addGold: function (n) { r.gold = Math.max(0, r.gold + n); if (n > 0) RA.core.Save.get().stats.goldEarned += n; },
        stat: Meta.stat
      }
    });
    combat.begin();
    defs.forEach(function (d) { Meta.seeEnemy(d.id); });
    this.activeCombat = combat;
    this.activeRoomKind = room.kind;
    return combat;
  };

  Run.prototype.onBattleEnd = function (combat) {
    var r = this;
    var room = this.current();
    // sincroniza HP/quedas de volta ao estado da run
    var alive = {};
    combat.heroes.forEach(function (cu) {
      var h = r.party.filter(function (x) { return x.id === cu.id; })[0];
      if (!h) return;
      h.hp = cu.dead ? 0 : Math.max(1, cu.hp);
      h.falls = cu.falls;
      h.dead = cu.dead;
      h.row = cu.row;
      if (cu.downed && !cu.dead) { h.hp = 1; } // levanta com 1 após a luta
      if (h.row === 'back') r.counters.allFrontRegion = false;
    });
    this.counters.healsUsed += combat.bstats.healDone > 0 ? 1 : 0;
    var p = RA.core.Save.get();
    p.stats.totalDamage += combat.bstats.dmgDealt;
    p.stats.totalHeal += combat.bstats.healDone;
    p.stats.maxHealFight = Math.max(p.stats.maxHealFight, combat.bstats.healDone);
    p.stats.poisonsApplied += combat.bstats.poisonApplied;

    if (!combat.won) {
      // derrota da batalha = fim da run
      this.finish(false);
      return { lost: true };
    }

    this.counters.battlesWon++;
    if (combat.bstats.rerollsUsed === 0) { this.counters.noRerollWins++; this.checkSecrets(); }
    if (combat.bstats.crackedUsedMaxTurn >= 3) {
      this.counters.cracked3win = true;
      if (Meta.secretFound('trinca', { pt: 'Vidro Valente desbloqueado', en: 'Brave Glass unlocked' })) this.addRelic('vidroValente');
    }
    if (combat.tflags && combat.tflags.combosFired && combat.tflags.combosFired.ritualAbsoluto) this.counters.fiveSame++;
    Object.keys(combat.tflags && combat.tflags.combosFired || {}).forEach(function (k) { if (k === 'ritualAbsoluto') r.counters.fiveSame++; });

    Meta.emit({
      t: 'battleEnd', win: true, turns: combat.turn, rerollsUsed: combat.bstats.rerollsUsed,
      healDone: combat.bstats.healDone, heroAt1Hp: combat.bstats.heroAt1Hp,
      noDamageDealt: combat.bstats.noDamageDealt, crackedUsed: combat.bstats.crackedUsedMaxTurn,
      combos: combat.bstats.combos, stuns: combat.bstats.stuns, poisonApplied: combat.bstats.poisonApplied
    });

    // ouro
    var g;
    if (room.kind === 'boss' || room.kind === 'secretBoss') g = this.rng.int(30, 42);
    else if (room.kind === 'elite' || room.kind === 'miniboss') g = this.rng.int(18, 26);
    else g = this.rng.int(8, 13) + this.regionIdx * 2;
    if (combat.flags.extraGold) g += combat.flags.extraGold;
    g += this.relicN('goldPerWin');
    if (this.hasRelic('cleanWinGold') && combat.bstats.goldStolen === 0 && !combat.heroes.some(function (h) { return h.bflags && h.bflags.tookDmg; })) g += 3;
    if (this.rules.dailySeed) g = 10 + this.regionIdx * 3; // determinístico p/ ranking justo
    this.gold += g;
    p.stats.goldEarned += g;

    // pós-luta: relíquias/passivas de cura
    if (this.hasRelic('eliteHeal') && (room.kind === 'elite' || room.kind === 'miniboss')) this.party.forEach(function (h) { if (!h.dead) h.hp = Math.min(h.maxHp, h.hp + 3); });
    if (this.hasRelic('postFightCleanse')) { /* status não persistem fora da luta — cosmético */ }
    this.party.forEach(function (h) {
      if (!h.dead && h.def.passive && h.def.passive.id === 'healAfterFight') h.hp = Math.min(h.maxHp, h.hp + 2);
    });

    // recompensas
    var reward = { gold: g, faces: null, relics: null, dupFace: false };
    var faceN = 3 + (this.hasRelic('faceForgePlus') ? 0 : 0);
    reward.faces = RA.data.RuneFaces.roll(this.rng, this.hasRelic('riskierRewards') ? 4 : 3);
    if (room.kind === 'elite' || room.kind === 'miniboss') reward.relics = this.relicOffer(2);
    if (room.kind === 'boss' || room.kind === 'secretBoss') {
      reward.relics = this.relicOffer(3, true);
      reward.dupFace = !!this.hasRelic('bossDupFace');
      // cura de chefe
      this.party.forEach(function (h) { if (!h.dead) h.hp = Math.min(h.maxHp, h.hp + Math.ceil(h.maxHp * 0.3)); });
    }
    reward.faces.forEach(function (f) { Meta.seeFace(f.id); });

    // chefes: progressão
    var bossId = combat.enemies[0] && combat.enemies[0].id;
    if (room.kind === 'boss') {
      p.beatenBosses[bossId] = 1;
      Meta.emit({ t: 'bossKill', id: bossId, secret: false });
      if (this.region().id === 'torre' && (bossId === 'dadoNegro' || this.rules.reducedFinal)) {
        // RUN VENCIDA
        this.pendingVictory = true;
      } else if (this.rules.bossRush && this.roomIdx >= this.rooms.length - 1) {
        this.pendingVictory = true;
      }
    }
    if (room.kind === 'secretBoss') {
      p.beatenBosses[bossId] = 1;
      this.counters.beatenSecret[bossId] = true;
      Meta.emit({ t: 'bossKill', id: bossId, secret: true });
      // recompensas específicas
      if (bossId === 'ferreiroCego') this.addRelic('martePrimeiraFace');
      if (bossId === 'criancaSorte') this.addRelic('dadoInocente');
      if (bossId === 'reiSemNumero') this.darkPath = true;
      if (bossId === 'maeDasFaces') Meta.secretFound('maeDasFaces', { pt: 'Abismo Infinito desbloqueado', en: 'Endless Abyss unlocked' });
    }
    this.activeCombat = null;
    this.save();
    return reward;
  };

  Run.prototype.relicOffer = function (n, boss) {
    var r = this;
    var exclude = this.relics.slice();
    SECRET_RELICS.forEach(function (id) {
      var p = RA.core.Save.get();
      var map = { martePrimeiraFace: 'x', dadoInocente: 'x', vidroValente: 'trinca', muralhaViva: 'linhaDeFrente' };
      if (exclude.indexOf(id) < 0) exclude.push(id); // só via segredo
    });
    var out = [];
    for (var i = 0; i < n; i++) {
      var rel = RA.data.Relics.roll(this.rng, { exclude: exclude, rarity: boss && i === 0 && this.rng.chance(0.35) ? 'rara' : undefined });
      if (rel) { out.push(rel); exclude.push(rel.id); Meta.seeRelic(rel.id); }
    }
    return out;
  };

  Run.prototype.addRelic = function (id) {
    if (this.relics.indexOf(id) < 0) {
      this.relics.push(id);
      Meta.seeRelic(id);
      var cursed = 0; var r = this;
      Meta.emit({ t: 'relicGain', count: this.relics.length, cursedCount: this.cursedCount() });
    }
  };
  Run.prototype.removeRelic = function (id) {
    var i = this.relics.indexOf(id);
    if (i >= 0) this.relics.splice(i, 1);
  };
  Run.prototype.hasRelic = function (t) {
    for (var i = 0; i < this.relics.length; i++) if (RA.data.Relics.byId[this.relics[i]].hook.t === t) return RA.data.Relics.byId[this.relics[i]];
    return null;
  };
  Run.prototype.relicN = function (t) {
    var n = 0;
    for (var i = 0; i < this.relics.length; i++) { var h = RA.data.Relics.byId[this.relics[i]].hook; if (h.t === t) n += (h.n || 1); }
    return n;
  };

  // ---- evolução de dado: d6 -> d8 -> d10 -> d12 ----
  // Adiciona 2 lados novos (cópias das 2 primeiras faces do herói, que o
  // jogador depois substitui por Faces Rúnicas para montar a build).
  Run.prototype.upgradeCost = function (hero) {
    var n = hero.faces.length;
    if (n >= 12) return null;
    return { 6: 40, 8: 65, 10: 95 }[n] || null;
  };
  Run.prototype.upgradeDie = function (heroIdx) {
    var h = this.party[heroIdx];
    if (!h || h.dead || h.faces.length >= 12) return false;
    h.faces.push(Object.assign({}, h.faces[0]));
    h.faces.push(Object.assign({}, h.faces[1] || h.faces[0]));
    RA.game.Meta.emit({ t: 'dieUpgrade', sides: h.faces.length });
    this.save();
    return true;
  };

  // aplica uma face rúnica num lado de um herói
  Run.prototype.applyFace = function (heroIdx, faceIdx, runeFace) {
    var h = this.party[heroIdx];
    if (!h || h.dead) return false;
    var nf = Object.assign({}, runeFace);
    if (this.hasRelic('faceForgePlus') && nf.val > 0) nf.val += 1;
    h.faces[faceIdx] = nf;
    Meta.seeFace(runeFace.id);
    this.save();
    return true;
  };

  // -------------------- segredos --------------------
  Run.prototype.checkSecrets = function () {
    // Criança da Sorte: 3 vitórias sem rerrolar
    if (this.counters.noRerollWins >= 3) this.secretBossReady = this.secretBossReady || 'criancaSorte';
    // Ferreiro Cego: 5 consertos na run
    if (this.counters.repairs >= 5) this.secretBossReady = this.secretBossReady || 'ferreiroCego';
    // Câmara da Face Única: 5 iguais 10x
    if (this.counters.fiveSame >= 10 && !this.camaraDone) this.camaraReady = true;
  };

  Run.prototype.darkTeam = function () {
    var need = ['necromante', 'bruxa', 'vampira', 'ilusionista', 'cronomante'];
    var have = this.party.map(function (h) { return h.id; });
    return need.every(function (id) { return have.indexOf(id) >= 0; });
  };

  // conteúdo da sala especial, decidido ao entrar
  Run.prototype.specialRoom = function () {
    var reg = this.region();
    this.checkSecrets();
    // Mãe das Faces: 3 salas secretas + Chave da Torre
    if (this.counters.secretRooms >= 3 && this.hasRelic('towerKey') && !this.counters.beatenSecret.maeDasFaces) {
      return { type: 'secretBoss', boss: 'maeDasFaces' };
    }
    if (this.secretBossReady && !this.counters.beatenSecret[this.secretBossReady]) {
      var b = this.secretBossReady; this.secretBossReady = null;
      return { type: 'secretBoss', boss: b };
    }
    if (this.camaraReady) {
      this.camaraReady = false; this.camaraDone = true;
      this.counters.secretRooms++;
      Meta.secretFound('camaraFaceUnica', { pt: 'Câmara da Face Única', en: 'Chamber of the Single Face' });
      return { type: 'secretRoom', name: { pt: 'Câmara da Face Única', en: 'Chamber of the Single Face' }, faces: RA.data.RuneFaces.roll(this.rng, 3, { rare: true }) };
    }
    if (this.secretMapReady || this.hasRelic('revealSecrets') || this.hasRelic('towerKey')) {
      this.secretMapReady = false;
      this.counters.secretRooms++;
      Meta.secretFound('sala_' + reg.id, reg.name);
      Meta.emit({ t: 'secretRoom' });
      return { type: 'secretRoom', name: { pt: 'Sala Secreta', en: 'Secret Room' }, gold: this.rng.int(25, 40), relics: this.relicOffer(1) };
    }
    // mini-chefe padrão: elite de outra região com recompensa
    var otherReg = this.rng.pick(RA.data.Regions.filter(function (x) { return x.id !== reg.id; }));
    return { type: 'miniboss', enemyId: otherReg.elite };
  };

  // -------------------- eventos --------------------
  Run.prototype.pickEvent = function () {
    var r = this;
    // Conselho da Meia-Noite (time sombrio)
    if (this.darkTeam() && !this.midnightDone) {
      this.midnightDone = true;
      Meta.secretFound('conselhoMeiaNoite', { pt: 'Conselho da Meia-Noite', en: 'Midnight Council' });
      return {
        id: 'conselhoMeiaNoite',
        name: { pt: 'Conselho da Meia-Noite', en: 'Midnight Council' },
        text: { pt: 'Cinco tronos de sombra se erguem. Vozes antigas reconhecem os seus: "O time sombrio se formou. Escolham seu tributo."', en: 'Five shadow thrones rise. Ancient voices recognize your own: "The dark team is formed. Choose your tribute."' },
        choices: [
          { label: { pt: 'Poder das sombras', en: 'Shadow power' }, fx: [{ k: 'relic', rarity: 'epica' }], result: { pt: 'Relíquia épica.', en: 'Epic relic.' } },
          { label: { pt: 'Sabedoria proibida', en: 'Forbidden wisdom' }, fx: [{ k: 'face', cat: 'sombria' }, { k: 'face', cat: 'sombria' }], result: { pt: 'Duas faces sombrias.', en: 'Two dark faces.' } },
          { label: { pt: 'Recusar o conselho', en: 'Refuse the council' }, fx: [{ k: 'blessNext' }], result: { pt: 'Eles respeitam a coragem.', en: 'They respect courage.' } }
        ]
      };
    }
    var pool = RA.data.Events.filter(function (e) { return r.usedEvents.indexOf(e.id) < 0; });
    if (!pool.length) { this.usedEvents = []; pool = RA.data.Events; }
    var ev = this.rng.pick(pool);
    this.usedEvents.push(ev.id);
    return ev;
  };

  Run.prototype.eventChoiceAvailable = function (choice) {
    if (!choice.cond) return true;
    if (choice.cond.gold && this.gold < choice.cond.gold) return false;
    if (choice.cond.relic && !this.relics.length) return false;
    if (choice.cond.cracked) {
      var has = false;
      this.party.forEach(function (h) { h.faces.forEach(function (f) { if (f.cracked) has = true; }); });
      if (!has) return false;
    }
    if (choice.cond.dead && !this.party.some(function (h) { return h.dead; })) return false;
    return true;
  };

  Run.prototype.applyEventFx = function (list) {
    var r = this;
    var out = { fight: null, facePick: null, log: [] };
    var lang = function (o) { return RA.T(o); };
    (list || []).forEach(function (fx) { applyOne(fx); });
    function applyOne(fx) {
      switch (fx.k) {
        case 'gold':
          r.gold = Math.max(0, r.gold + fx.n);
          if (fx.n > 0) RA.core.Save.get().stats.goldEarned += fx.n;
          out.log.push((fx.n >= 0 ? '+' : '') + fx.n + ' ' + RA.UI('gold'));
          break;
        case 'healAll':
          r.party.forEach(function (h) { if (!h.dead) h.hp = Math.min(h.maxHp, h.hp + fx.n); });
          out.log.push('+' + fx.n + ' HP');
          break;
        case 'healPct':
          r.party.forEach(function (h) { if (!h.dead) h.hp = Math.min(h.maxHp, h.hp + Math.ceil(h.maxHp * fx.p)); });
          out.log.push('+' + Math.round(fx.p * 100) + '% HP');
          break;
        case 'dmgAll':
          r.party.forEach(function (h) { if (!h.dead) h.hp = Math.max(1, h.hp - fx.n); });
          out.log.push('-' + fx.n + ' HP');
          break;
        case 'dmgOne': {
          var alive = r.party.filter(function (h) { return !h.dead; });
          var v = r.rng.pick(alive);
          if (v) { v.hp = Math.max(1, v.hp - fx.n); out.log.push(RA.T(v.def.name) + ': -' + fx.n + ' HP'); }
          break;
        }
        case 'maxHp': {
          var tgt2 = fx.all ? r.party.filter(function (h) { return !h.dead; }) : [r.rng.pick(r.party.filter(function (h) { return !h.dead; }))];
          tgt2.forEach(function (h) { if (h) { h.maxHp = Math.max(3, h.maxHp + fx.n); h.hp = Math.min(h.maxHp, Math.max(1, h.hp + fx.n)); } });
          out.log.push((fx.n > 0 ? '+' : '') + fx.n + ' HP máx');
          break;
        }
        case 'relic': {
          var rel = RA.data.Relics.roll(r.rng, { exclude: r.relics.concat(SECRET_RELICS), rarity: fx.rarity });
          if (rel) { r.addRelic(rel.id); out.log.push(RA.T(rel.name)); }
          break;
        }
        case 'relicId':
          if (RA.data.Relics.byId[fx.id]) { r.addRelic(fx.id); out.log.push(RA.T(RA.data.Relics.byId[fx.id].name)); }
          break;
        case 'loseRelic':
          if (r.relics.length) {
            var lost = r.rng.pick(r.relics);
            r.removeRelic(lost);
            out.log.push('- ' + RA.T(RA.data.Relics.byId[lost].name));
          }
          break;
        case 'sellRelic':
          if (r.relics.length) { r.removeRelic(r.rng.pick(r.relics)); r.gold += 15; out.log.push('+15 ' + RA.UI('gold')); }
          break;
        case 'face':
          out.facePick = RA.data.RuneFaces.roll(r.rng, 3, fx.cat ? { cat: fx.cat } : null);
          break;
        case 'crack': {
          var vict = r.rng.pick(r.party.filter(function (h) { return !h.dead; }));
          if (vict) {
            var f2 = r.rng.pick(vict.faces);
            f2.cracked = true; if (f2.uses === undefined) f2.uses = 2;
            out.log.push(RA.T({ pt: 'Um dado trincou!', en: 'A die cracked!' }));
          }
          break;
        }
        case 'repair': {
          var fixed = 0;
          r.party.forEach(function (h) { h.faces.forEach(function (f) { if (f.cracked) { f.cracked = false; if (f.uses !== undefined && f.uses <= 0) f.uses = 1; fixed++; } }); });
          if (fixed) { r.counters.repairs += fixed; r.checkSecrets(); }
          out.log.push(RA.T({ pt: fixed + ' face(s) consertada(s)', en: fixed + ' face(s) repaired' }));
          break;
        }
        case 'curseNext': r.mods.curseNext = true; out.log.push(RA.T({ pt: 'Maldição na próxima luta...', en: 'Curse next fight...' })); break;
        case 'blessNext': r.mods.blessNext = true; out.log.push(RA.T({ pt: 'Bênção na próxima luta!', en: 'Blessing next fight!' })); break;
        case 'fight': out.fight = { tier: fx.tier, bonus: fx.bonus }; break;
        case 'restoreHero': {
          var dead = r.party.filter(function (h) { return h.dead; });
          if (dead.length) { dead[0].dead = false; dead[0].falls = 0; dead[0].hp = Math.ceil(dead[0].maxHp / 2); out.log.push(RA.T(dead[0].def.name) + ' ' + RA.UI('revived')); }
          break;
        }
        case 'mod': r.mods[fx.id] = true; break;
        case 'secretMap': r.secretMapReady = true; out.log.push(RA.T({ pt: 'Sala secreta revelada!', en: 'Secret room revealed!' })); break;
        case 'unlock': Meta.secretFound(fx.id); break;
        case 'fateChoiceNext': r.mods.fateChoiceNext = true; break;
        case 'cleanseCurse': r.mods.curseNext = false; break;
        case 'ch':
          if (r.rng.chance(fx.p)) (fx.ok || []).forEach(applyOne);
          else (fx.bad || []).forEach(applyOne);
          break;
        case 'nothing': break;
      }
    }
    this.save();
    return out;
  };

  // -------------------- loja --------------------
  Run.prototype.shopStock = function () {
    var r = this;
    var mul = (this.diff.shopMul || 1) * (1 - (this.hasRelic('shopDiscount') ? RA.data.Relics.byId[this.hasRelic('shopDiscount').id].hook.n : 0)) * (this.mods.descontoLoja || this.persistMods.descontoLoja ? 0.7 : 1);
    function price(n) { return Math.max(1, Math.round(n * mul)); }
    var faces = RA.data.RuneFaces.roll(this.rng, 2);
    var relics = this.relicOffer(2);
    var stock = [];
    faces.forEach(function (f) { stock.push({ kind: 'face', face: f, cost: price(f.rare ? 34 : 24) }); });
    relics.forEach(function (rel) {
      var base = { comum: 35, incomum: 50, rara: 70, epica: 105, lendaria: 150, amaldicoada: 20 }[rel.rarity] || 50;
      stock.push({ kind: 'relic', relic: rel, cost: price(base) });
    });
    stock.push({ kind: 'heal', n: 5, cost: price(14) });
    if (this.cursedCount() > 0) stock.push({ kind: 'removeCurse', cost: price(25) });
    var cracked = false;
    this.party.forEach(function (h) { h.faces.forEach(function (f) { if (f.cracked) cracked = true; }); });
    if (cracked) stock.push({ kind: 'repair', cost: price(18) });
    stock.push({ kind: 'swapRow', cost: price(6) });
    // evolução de dado: d6->d8->d10->d12 (custo pelo herói mais barato elegível)
    var upMin = null;
    this.party.forEach(function (hh) {
      if (hh.dead) return;
      var cc = r.upgradeCost(hh);
      if (cc !== null && (upMin === null || cc < upMin)) upMin = cc;
    });
    if (upMin !== null) stock.push({ kind: 'upgradeDie', cost: price(upMin) });
    stock.push({ kind: 'mystery', cost: price(30) });
    if (!this.secretMapReady) stock.push({ kind: 'secretMap', cost: price(40) });
    return stock;
  };

  Run.prototype.buy = function (item, extra) {
    if (this.gold < item.cost) return { ok: false, reason: 'gold' };
    var r = this;
    this.gold -= item.cost;
    this.counters.goldSpent += item.cost;
    this.counters.shopBuys++;
    Meta.emit({ t: 'shopBuy', buysThisRun: this.counters.shopBuys });
    var result = { ok: true };
    switch (item.kind) {
      case 'face': result.facePick = [item.face]; break;
      case 'relic': this.addRelic(item.relic.id); break;
      case 'heal': {
        var n = item.n + this.relicN('potionPlus');
        var most = this.party.filter(function (h) { return !h.dead; }).sort(function (a, b) { return (a.hp / a.maxHp) - (b.hp / b.maxHp); })[0];
        if (most) most.hp = Math.min(most.maxHp, most.hp + n);
        break;
      }
      case 'removeCurse': {
        var cursedIds = this.relics.filter(function (id) { return RA.data.Relics.byId[id].rarity === 'amaldicoada'; });
        if (cursedIds.length) this.removeRelic(cursedIds[0]);
        break;
      }
      case 'repair': {
        var fixed = 0;
        this.party.forEach(function (h) { h.faces.forEach(function (f) { if (f.cracked) { f.cracked = false; if (f.uses !== undefined && f.uses <= 0) f.uses = 1; fixed++; } }); });
        this.counters.repairs += fixed;
        this.checkSecrets();
        break;
      }
      case 'swapRow': {
        var hIdx = extra || 0;
        var h = this.party[hIdx];
        if (h) h.row = h.row === 'front' ? 'back' : 'front';
        break;
      }
      case 'upgradeDie': {
        var hu = this.party[extra || 0];
        if (!hu || !this.upgradeDie(extra || 0)) {
          // herói inválido: devolve o ouro
          this.gold += item.cost;
          this.counters.goldSpent -= item.cost;
          return { ok: false, reason: 'hero' };
        }
        result.msg = RA.T({ pt: 'Dado evoluiu para D' + hu.faces.length + '!', en: 'Die upgraded to D' + hu.faces.length + '!' });
        break;
      }
      case 'mystery': {
        var roll = this.rng.int(0, 2);
        if (roll === 0) { var rel2 = RA.data.Relics.roll(this.rng, { exclude: this.relics.concat(SECRET_RELICS) }); if (rel2) { this.addRelic(rel2.id); result.msg = RA.T(rel2.name); } }
        else if (roll === 1) { result.facePick = RA.data.RuneFaces.roll(this.rng, 1); }
        else { var gg = this.rng.int(20, 55); this.gold += gg; result.msg = '+' + gg + ' ' + RA.UI('gold'); }
        break;
      }
      case 'secretMap': this.secretMapReady = true; break;
    }
    if (Meta.emit && this.gold >= 200) Meta.emit({ t: 'goldChange', gold: this.gold });
    this.save();
    return result;
  };

  Run.prototype.sellRelic = function (id) {
    if (this.relics.indexOf(id) < 0) return false;
    this.removeRelic(id);
    this.gold += 15;
    this.save();
    return true;
  };

  // -------------------- fim de run --------------------
  Run.prototype.finish = function (win) {
    if (this.finished) return;
    this.finished = true;
    var p = RA.core.Save.get();
    var heroesAlive = this.party.filter(function (h) { return !h.dead && h.hp > 0; }).length;
    var timeMin = Math.round((Date.now() - this.startedAt) / 60000);

    if (win) {
      p.stats.wins++;
      p.stats.winsByMode[this.modeId] = (p.stats.winsByMode[this.modeId] || 0) + 1;
      var tiers = { aprendiz: 0, normal: 1, dificil: 2, veterano: 3 };
      p.stats.bestDifficulty = Math.max(p.stats.bestDifficulty, tiers[this.diffId] || 0);
      p.stats.bestCurse = Math.max(p.stats.bestCurse || 0, this.curseLvl);
      // final
      if (this.curseLvl >= 10) this.endingId = 'secreto';
      else if (this.darkPath) this.endingId = 'sombrio';
      else this.endingId = 'bom';
      p.stats.endings[this.endingId] = 1;
      Meta.unlockHeroes(2);
    } else {
      p.stats.losses++;
      Meta.unlockHeroes(1);
    }
    if (this.rules.infinite) {
      if (this.modeId === 'abismo') p.stats.abyssBest = Math.max(p.stats.abyssBest || 0, this.floor);
      else p.stats.towerBest = Math.max(p.stats.towerBest || 0, this.floor);
    }
    if (this.rules.dailySeed) {
      var key = new Date().toISOString().slice(0, 10);
      var score = this.counters.battlesWon * 100 + this.gold;
      if (!p.stats.diaryBest[key] || p.stats.diaryBest[key] < score) p.stats.diaryBest[key] = score;
    }

    var tiers2 = { aprendiz: 0, normal: 1, dificil: 2, veterano: 3 };
    Meta.emit({
      t: 'runEnd', win: !!win, modeId: this.modeId, diffTier: tiers2[this.diffId] || 0,
      curseLvl: this.curseLvl, heroesAlive: heroesAlive, downsTotal: this.counters.downsTotal,
      healsUsed: this.counters.healsUsed, randomTeam: this.randomTeam, timeMin: timeMin,
      endingId: this.endingId, goldSpent: this.counters.goldSpent, revives: this.counters.revives,
      partySize: this.party.length, floor: this.floor
    });
    p.run = null;
    RA.core.Save.saveNow();
    RA.game.run = null;
  };

  // -------------------- persistência da run --------------------
  Run.prototype.save = function () {
    if (this.finished) return;
    var p = RA.core.Save.get();
    p.run = this.serialize();
    RA.core.Save.save();
  };

  Run.prototype.serialize = function () {
    return {
      modeId: this.modeId, diffId: this.diffId, curseLvl: this.curseLvl,
      seed: this.seed, rngS: this.rng.s, gold: this.gold, randomTeam: this.randomTeam,
      startedAt: this.startedAt,
      party: this.party.map(function (h) {
        return { id: h.id, hp: h.hp, maxHp: h.maxHp, row: h.row, falls: h.falls, dead: h.dead,
          faces: h.faces.map(function (f) { return { id: f.id || null, heroFace: !f.id, name: f.name, sym: f.sym, val: f.val, tgt: f.tgt, fx: f.fx, uses: f.uses, cracked: f.cracked, rare: f.rare, cat: f.cat }; }) };
      }),
      relics: this.relics.slice(),
      regionSeq: this.regionSeq, regionIdx: this.regionIdx,
      rooms: this.rooms.map(function (r2) { return { kind: r2.kind, enemyIds: r2.enemyIds || null, done: r2.done || false }; }),
      roomIdx: this.roomIdx, floor: this.floor,
      mods: this.mods, persistMods: this.persistMods,
      counters: this.counters, usedEvents: this.usedEvents,
      secretMapReady: this.secretMapReady, darkPath: this.darkPath || false,
      midnightDone: this.midnightDone || false, camaraDone: this.camaraDone || false,
      secretBossReady: this.secretBossReady || null
    };
  };

  Run.resume = function () {
    var p = RA.core.Save.get();
    var s = p.run;
    if (!s) return null;
    var r = new Run();
    r.modeId = s.modeId; r.mode = RA.data.ModesById[s.modeId]; r.rules = r.mode.rules || {};
    r.diffId = s.diffId; r.curseLvl = s.curseLvl;
    r.diff = RA.data.difficultyFx(s.diffId, s.curseLvl);
    if (r.rules.enemyHpMul) r.diff.enemyHpMul = (r.diff.enemyHpMul || 1) * r.rules.enemyHpMul;
    r.seed = s.seed;
    r.rng = new RA.core.Rng(s.seed); r.rng.s = s.rngS;
    r.gold = s.gold; r.randomTeam = s.randomTeam; r.startedAt = s.startedAt || Date.now();
    r.party = s.party.map(function (h) {
      var def = RA.data.Heroes.byId[h.id];
      return { id: h.id, def: def, hp: h.hp, maxHp: h.maxHp, row: h.row, falls: h.falls, dead: h.dead,
        faces: h.faces.map(function (f) {
          var base = f.heroFace ? {} : (RA.data.RuneFaces.byId[f.id] || {});
          return Object.assign({}, base, { name: f.name, sym: f.sym, val: f.val, tgt: f.tgt, fx: f.fx, uses: f.uses, cracked: f.cracked, rare: f.rare, cat: f.cat, id: f.id || undefined });
        }) };
    });
    r.relics = s.relics.slice();
    r.regionSeq = s.regionSeq; r.regionIdx = s.regionIdx;
    r.rooms = s.rooms; r.roomIdx = s.roomIdx; r.floor = s.floor;
    r.mods = s.mods || {}; r.persistMods = s.persistMods || {};
    r.counters = s.counters;
    r.usedEvents = s.usedEvents || [];
    r.secretMapReady = s.secretMapReady; r.darkPath = s.darkPath;
    r.midnightDone = s.midnightDone; r.camaraDone = s.camaraDone;
    r.secretBossReady = s.secretBossReady;
    r.finished = false; r.endingId = null; r.eventLog = [];
    RA.game.run = r;
    return r;
  };

  Run.abandon = function () {
    var p = RA.core.Save.get();
    if (p.run) { p.run = null; RA.core.Save.saveNow(); }
    RA.game.run = null;
  };

  RA.game.Run = Run;
})();
