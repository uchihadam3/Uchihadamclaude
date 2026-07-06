// Combat: máquina de estados da batalha. Sem rendering — a BattleScene
// consome o estado + a fila de eventos (this.events) para animar.
//
// Fluxo de turno:
//  startTurn -> intenções + Dado do Destino + rolagem inicial
//  fase 'player': reroll()/toggleLock()/useDie()/undoDie() -> endTurn()
//  endTurn: invocações agem -> fase inimiga -> fase de status -> próximo turno
//
// Alvos: {side:'enemy'|'hero', idx}. Efeitos das faces em CombatFx.js.
(function () {
  var MAXR = RA.config.MAX_ROLLS;

  function Combat(opts) {
    this.rng = opts.rng;
    this.ctx = opts.ctx || { getGold: function () { return 0; }, addGold: function () {}, stat: function () {} };
    this.relics = opts.relics || [];
    this.diff = opts.diff || {};
    this.chaosRule = opts.chaosRule || null;
    this.modeRules = opts.modeRules || {};
    this.battleKind = opts.battleKind || 'normal'; // normal|elite|chefe|secreto
    this.preMods = opts.preMods || {};             // modificadores de eventos (blessNext, curseNext...)
    this.events = [];
    this.turn = 0;
    this.phase = 'player';
    this.over = false; this.won = false;
    this.pendingChoice = null;
    this.fate = null; this.fateFx = {};
    this.blackRule = null;
    this.log = [];
    // estatísticas p/ conquistas e recompensas
    this.bstats = { healDone: 0, poisonApplied: 0, rerollsUsed: 0, stuns: 0, combos: 0, dmgDealt: 0, heroAt1Hp: false, noDamageDealt: true, crackedUsedMaxTurn: 0, goldStolen: 0, maxDmgTurn: 0 };
    this.flags = {};      // flags de batalha (primeiro ataque, primeira magia...)
    this.tflags = {};     // flags de turno (resetadas a cada turno)

    // --- montar heróis ---
    var self = this;
    this.heroes = opts.party.map(function (h, i) {
      return {
        kind: 'hero', slot: i, id: h.id, def: h.def, name: h.def.name,
        hp: h.hp, maxHp: h.maxHp, row: h.row || (i < 3 ? 'front' : 'back'),
        shield: 0, statuses: {}, downed: false, downTimer: 0, falls: h.falls || 0,
        dead: false, summon: false, faces: h.faces, passive: h.def.passive ? h.def.passive.id : null,
        skin: h.def.skin || 'cinza', bflags: {}
      };
    });
    this.summons = [];

    // --- montar inimigos ---
    var hpMul = (this.diff.enemyHpMul || 1) * (this.modeRules.enemyHpMul || 1);
    this.enemies = opts.enemies.map(function (def, i) {
      var hp = Math.max(1, Math.round(def.hp * hpMul));
      var e = {
        kind: 'enemy', slot: i, id: def.id, def: def, name: def.name,
        hp: hp, maxHp: hp, row: def.row || 'front',
        shield: (self.diff.enemyStartShield || 0), statuses: {}, aiIdx: 0,
        charge: 0, hidden: false, dead: false, fled: false, intent: null,
        tier: def.tier, mech: def.mech || null, bflags: {}
      };
      return e;
    });
    // aiIdx dessincronizado para variedade
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].tier === 'comum') this.enemies[i].aiIdx = this.rng.int(0, 1);
    }

    this.dice = [];
    this.maxRolls = MAXR + (this.relicN('maxRollPlus') || 0) + (this.hasPassive('freeReroll') ? 1 : 0);
    if (this.battleKind === 'elite' && this.diff.eliteRerollMinus) this.maxRolls -= this.diff.eliteRerollMinus;
    if (this.chaosRule && this.chaosRule.id === 'so2Rerolls') this.maxRolls = Math.min(this.maxRolls, 2);
    if (this.preMods.sorteCrianca || this.preMods.tempoExtra || this.preMods.dicaVelho) this.maxRolls += 1;
    if (this.preMods.menosReroll) this.maxRolls -= 1;
    this.maxRolls = Math.max(1, this.maxRolls);
  }

  // ============================ utilidades ============================
  Combat.prototype.ev = function (t, d) {
    var e = d || {}; e.t = t;
    this.events.push(e);
    return e;
  };
  Combat.prototype.say = function (msg) { this.ev('log', { msg: msg }); this.log.push(msg); if (this.log.length > 60) this.log.shift(); };
  Combat.prototype.hasRelic = function (t) {
    for (var i = 0; i < this.relics.length; i++) if (this.relics[i].hook.t === t) return this.relics[i];
    return null;
  };
  Combat.prototype.relicN = function (t) {
    var n = 0;
    for (var i = 0; i < this.relics.length; i++) if (this.relics[i].hook.t === t) n += (this.relics[i].hook.n || 1);
    return n;
  };
  Combat.prototype.hasPassive = function (id) {
    for (var i = 0; i < this.heroes.length; i++) {
      var h = this.heroes[i];
      if (!h.dead && !h.downed && h.passive === id) return h;
    }
    return null;
  };
  Combat.prototype.aliveEnemies = function () { return this.enemies.filter(function (e) { return !e.dead && !e.fled; }); };
  Combat.prototype.aliveHeroes = function () { return this.heroes.filter(function (h) { return !h.dead && !h.downed; }); };
  Combat.prototype.allAllies = function () { return this.aliveHeroes().concat(this.summons.filter(function (s) { return !s.dead; })); };
  Combat.prototype.frontEnemies = function () {
    var a = this.aliveEnemies().filter(function (e) { return e.row === 'front'; });
    return a.length ? a : this.aliveEnemies();
  };
  Combat.prototype.frontHeroes = function () {
    var tanks = this.summons.filter(function (s) { return !s.dead && s.def.tank; });
    if (tanks.length) return tanks;
    var a = this.aliveHeroes().filter(function (h) { return h.row === 'front'; });
    return a.length ? a : this.aliveHeroes();
  };
  Combat.prototype.st = function (u, s) { return u.statuses[s] || 0; };

  Combat.prototype.addStatus = function (u, s, n, src) {
    if (u.dead || (u.downed)) return;
    n = n || 1;
    // amplificadores
    if (!u.summon && u.kind === 'enemy') {
      if (s === 'poison') { n += this.relicN('poisonPlus') + (this.fateFx.poisonBleedPlus || 0) + (this.preMods.venenoFlor ? 1 : 0); if (this.hasPassive && src && src.passive === 'burnPlus' && s === 'burn') n += 1; }
      if (s === 'bleed') n += this.relicN('bleedPlus') + (this.fateFx.poisonBleedPlus || 0);
      if (s === 'burn' && src && src.passive === 'burnPlus') n += 1;
      if (s === 'curse') { n += this.relicN('cursePlus'); if (src && src.passive === 'curseAmp') n += 1; }
      if (s === 'poison' && u.def.kind === 'undead' && this.hasRelic('poisonVsUndead')) n += 1;
      if (s === 'weak') n += this.relicN('weakAmp');
      if (u.def.resist === 'veneno' && s === 'poison') n = Math.max(0, n - 1);
      if (u.def.resist === 'sangramento' && s === 'bleed') n = Math.max(0, n - 1);
      if (u.def.resist === 'fogo' && s === 'burn') n = Math.max(0, n - 1);
    }
    if (u.kind === 'hero') {
      if (s === 'blind' && this.hasRelic('immuneBlind')) { this.say(RA.T({ pt: 'Imune à cegueira!', en: 'Immune to blind!' })); return; }
      if (s === 'chained' && this.hasRelic('immuneChain')) return;
      if (s === 'regen') n += this.relicN('regenPlus');
      if (s === 'barrier' && u.passive === 'barrierPlus') n += 1;
      if (s === 'counter' && (u.passive === 'riposte')) n += 1;
      if (s === 'counter') n += this.relicN('counterPlus');
    }
    if (this.blackRule === 'statusDobram') n *= 2;
    if (n <= 0) return;
    u.statuses[s] = (u.statuses[s] || 0) + n;
    if (u.kind === 'enemy' && s === 'poison') this.bstats.poisonApplied += n;
    if (u.kind === 'enemy' && s === 'stun') this.bstats.stuns++;
    var def = RA.data.Statuses[s];
    this.ev('status', { side: u.kind, idx: u.slot, s: s, n: n, good: def ? def.good : false });
    // chamaViva: queimadura causa dano imediato
    if (s === 'burn' && this.fateFx.burnInstant && u.kind === 'enemy') this.damage(null, u, u.statuses.burn, { pure: true, tag: 'burn' });
    // freezeWeakens (relic) / freezeWeak (passiva)
    if (s === 'freeze' && u.kind === 'enemy' && (this.hasRelic('freezeWeakens') || (src && src.passive === 'freezeWeak'))) this.addStatus(u, 'weak', 1);
  };
  Combat.prototype.clearStatus = function (u, s) { delete u.statuses[s]; };

  Combat.prototype.cleanse = function (u, max, types) {
    var removed = 0;
    for (var s in u.statuses) {
      var def = RA.data.Statuses[s];
      if (def && !def.good && (!types || types.indexOf(s) >= 0)) {
        delete u.statuses[s]; removed++;
        if (removed >= (max || 99)) break;
      }
    }
    if (removed) this.ev('cleanse', { side: u.kind, idx: u.slot, n: removed });
    return removed;
  };

  // ============================ dano/cura ============================
  // damage(src, tgt, n, opts) — pipeline único p/ os dois lados.
  // opts: {magic, ignoreShield, isAttack, pure (ignora modificadores), tag}
  Combat.prototype.damage = function (src, tgt, n, opts) {
    opts = opts || {};
    if (tgt.dead || n <= 0) return 0;
    var self = this;

    if (!opts.pure) {
      // --- modificadores do atacante ---
      if (src && opts.isAttack) {
        n -= this.st(src, 'weak');
        if (src.kind === 'hero') {
          if (this.tflags.buffAtk) n += this.tflags.buffAtk;
          if (this.fateFx.firstAtkBonus && !this.tflags.firstAtkDone) { n += this.fateFx.firstAtkBonus; }
          if (src.row === 'front') n += this.relicN('frontAtkPlus');
          if (src.shield > 0) n += this.relicN('shieldedAtkPlus');
          if (this.tflags.allyDownBuff) n += this.tflags.allyDownBuff;
          if (tgt.kind === 'enemy') {
            if (this.st(tgt, 'stun') && this.hasRelic('vsStunnedPlus')) n += this.relicN('vsStunnedPlus');
            if (src.passive === 'plusVsMarked' && this.st(tgt, 'mark')) n += 1;
            if (src.passive === 'plusVsBack' && tgt.row === 'back') n += 1;
            if (src.passive === 'holyBonus' && (tgt.def.kind === 'undead' || tgt.def.kind === 'demon')) n += 1;
            if (src.passive === 'eliteSlayer' && (tgt.tier === 'elite' || tgt.tier === 'chefe' || tgt.tier === 'secreto')) n += 1;
            if (src.bflags.plusUndeadNext && tgt.def.kind === 'undead') { n += src.bflags.plusUndeadNext; src.bflags.plusUndeadNext = 0; }
          }
        }
        if (this.hasRelic('glassDie')) n += 1;
        // cegueira / esquiva / camuflagem
        if (this.st(src, 'blind') && this.rng.chance(0.5)) {
          this.ev('miss', { side: tgt.kind, idx: tgt.slot }); this.say(RA.T({ pt: 'Errou!', en: 'Miss!' }));
          return 0;
        }
        if (opts.missChance && this.rng.chance(opts.missChance)) {
          this.ev('miss', { side: tgt.kind, idx: tgt.slot }); return 0;
        }
        if (tgt.hidden && this.rng.chance(0.5)) { this.ev('miss', { side: tgt.kind, idx: tgt.slot }); return 0; }
        if (this.st(tgt, 'dodge')) {
          tgt.statuses.dodge--; if (!tgt.statuses.dodge) delete tgt.statuses.dodge;
          this.ev('miss', { side: tgt.kind, idx: tgt.slot, dodge: true }); return 0;
        }
        if (tgt.kind === 'hero' && tgt.row === 'back' && this.flags.backMissReady) {
          this.flags.backMissReady = false;
          this.ev('miss', { side: tgt.kind, idx: tgt.slot }); return 0;
        }
      }
      // --- modificadores do defensor ---
      if (opts.isAttack) {
        n += this.st(tgt, 'mark') > 0 ? 1 : 0;
        n += this.st(tgt, 'vulnerable');
        if (tgt.kind === 'hero') {
          if (this.hasRelic('glassDie')) n += 1;
          if (tgt.row === 'back') n -= this.relicN('backDefPlus');
          if (src && (src.tier === 'chefe' || src.tier === 'secreto')) n -= this.relicN('bossDamageDown');
          if (this.fateFx.firstDmgDown && !tgt.bflags.tookDmg) { n -= 1; }
          if (this.hasRelic('firstDmgDown') && !tgt.bflags.tookDmgR) { n -= this.relicN('firstDmgDown'); tgt.bflags.tookDmgR = true; }
          if (tgt.passive === 'stoneSkin' && n >= 5) n -= 1;
        }
        if (src && src.kind === 'enemy' && src.bflags.atkBonus) n += src.bflags.atkBonus;
      }
      if (n <= 0) n = 0;

      // --- escudo/barreira ---
      if (!opts.ignoreShield && n > 0) {
        var shieldVal = tgt.shield;
        if (opts.pierce1 && shieldVal > 0) shieldVal -= 1; // 'focus'
        if (this.blackRule === 'escudoMetade') shieldVal = Math.ceil(shieldVal / 2);
        if (this.chaosRule && this.chaosRule.id === 'escudosFracos' && tgt.kind === 'hero') shieldVal = Math.ceil(shieldVal / 2);
        var absorbed = Math.min(shieldVal, n);
        if (absorbed > 0) {
          tgt.shield = Math.max(0, tgt.shield - absorbed);
          n -= absorbed;
          this.ev('shieldHit', { side: tgt.kind, idx: tgt.slot, n: absorbed });
          if (tgt.shield <= 0 && this.hasRelic('shieldBreakStun') && tgt.kind === 'enemy' && !tgt.bflags.sbStun) { tgt.bflags.sbStun = true; this.addStatus(tgt, 'stun', 1); }
        }
        if (n > 0 && this.st(tgt, 'barrier')) {
          var b = Math.min(tgt.statuses.barrier, n);
          tgt.statuses.barrier -= b; if (!tgt.statuses.barrier) delete tgt.statuses.barrier;
          n -= b;
          this.ev('shieldHit', { side: tgt.kind, idx: tgt.slot, n: b, barrier: true });
        }
      }
    }

    if (n <= 0) { this.ev('dmg', { side: tgt.kind, idx: tgt.slot, n: 0 }); return 0; }

    tgt.hp -= n;
    this.ev('dmg', { side: tgt.kind, idx: tgt.slot, n: n, tag: opts.tag || (opts.magic ? 'magic' : 'hit') });
    if (tgt.kind === 'enemy') {
      this.bstats.dmgDealt += n;
      if (opts.isAttack || opts.tag === 'combo') this.bstats.noDamageDealt = false;
      this.tflags.dmgThisTurn = (this.tflags.dmgThisTurn || 0) + n;
    }
    if (tgt.kind === 'hero') { tgt.bflags.tookDmg = true; tgt.bflags.damagedThisTurn = true; }

    // contra-ataque
    if (opts.isAttack && src && !src.dead && this.st(tgt, 'counter') > 0) {
      var cn = this.st(tgt, 'counter');
      this.damage(null, src, cn, { pure: true, tag: 'counter' });
    }
    // espinhos da frente (relíquia)
    if (opts.isAttack && src && src.kind === 'enemy' && tgt.kind === 'hero' && tgt.row === 'front' && this.hasRelic('frontThorns') && !src.dead) {
      this.damage(null, src, this.relicN('frontThorns'), { pure: true, tag: 'thorns' });
    }
    // congela quem ataca (face de gelo defensiva)
    if (opts.isAttack && src && tgt.bflags.freezeAttacker && src.kind === 'enemy') this.addStatus(src, 'freeze', 1);

    if (tgt.hp <= 0) {
      tgt.hp = 0;
      if (tgt.kind === 'enemy') this.killEnemy(tgt, src, opts);
      else this.downUnit(tgt);
    } else if (tgt.kind === 'hero' && tgt.hp === 1) this.bstats.heroAt1Hp = true;
    return n;
  };

  Combat.prototype.killEnemy = function (e, src, opts) {
    e.dead = true;
    this.ev('kill', { idx: e.slot, id: e.id });
    this.ctx.stat('kill', { id: e.id });
    if (opts && opts.tag === 'poison' && this.hasRelic('poisonKillGold')) { this.ctx.addGold(this.relicN('poisonKillGold')); this.ev('gold', { n: this.relicN('poisonKillGold') }); }
    if (this.hasRelic('killHealLowest')) this.healLowest(1);
    if (src && src.kind === 'hero') {
      if (src.passive === 'killHeal') this.heal(src, src, 1, { quiet: true });
      if (opts && opts.healOnKill) this.heal(src, src, opts.healOnKill, { quiet: true });
      if (opts && opts.luckKillReroll) { this.rollsLeft = Math.min(this.maxRolls, this.rollsLeft + 1); this.ev('extraRoll', {}); }
    }
    if (this.fateFx.killExtraRoll && this.phase === 'player') { this.rollsLeft += 1; this.ev('extraRoll', { fate: true }); }
    // mecânicas ao morrer aliado inimigo
    var self = this;
    this.aliveEnemies().forEach(function (o) {
      if (o.mech && RA.game.Mechs[o.mech] && RA.game.Mechs[o.mech].onAllyDeath) RA.game.Mechs[o.mech].onAllyDeath(self, o, e);
    });
    if (e.mech && RA.game.Mechs[e.mech] && RA.game.Mechs[e.mech].onDeath) RA.game.Mechs[e.mech].onDeath(this, e);
    this.checkEnd();
  };

  Combat.prototype.downUnit = function (h) {
    if (h.summon) { h.dead = true; this.ev('summonDie', { idx: this.summons.indexOf(h) }); return; }
    // impedir queda
    if ((h.passive === 'preventDown' || h.passive === 'ignoreFatal') && !h.bflags.usedPrevent) {
      h.bflags.usedPrevent = true; h.hp = 1;
      this.say(RA.T({ pt: h.name.pt + ' resiste por pura vontade!', en: h.name.en + ' refuses to fall!' }));
      return;
    }
    if (this.hasRelic('preventFirstDown') && !this.flags.usedCrownSave) {
      this.flags.usedCrownSave = true; h.hp = 1;
      this.say(RA.T({ pt: 'A Coroa Trincada brilha: ' + h.name.pt + ' fica de pé!', en: 'The Cracked Crown glows: ' + h.name.en + ' stands!' }));
      return;
    }
    if (this.hasRelic('autoRevive') && !this.flags.usedAutoRevive) {
      this.flags.usedAutoRevive = true; h.hp = Math.ceil(h.maxHp / 2);
      this.say(RA.T({ pt: h.name.pt + ' retorna pela Pedra do Retorno!', en: h.name.en + ' returns by the Return Stone!' }));
      return;
    }
    h.downed = true;
    h.downTimer = this.diff.downTurns || RA.config.DOWN_TURNS;
    h.falls += 1;
    h.shield = 0; h.statuses = {};
    this.ev('down', { idx: h.slot, falls: h.falls });
    this.ctx.stat('down', { id: h.id });
    if (this.hasRelic('allyDownAtkBuff')) this.tflags.allyDownBuff = (this.tflags.allyDownBuff || 0) + this.relicN('allyDownAtkBuff');
    if (h.falls >= RA.config.DEATHS_PERMANENT) {
      h.dead = true; h.downed = false;
      this.ev('permaDeath', { idx: h.slot });
      this.say(RA.T({ pt: h.name.pt + ' caiu para sempre...', en: h.name.en + ' has fallen forever...' }));
    }
    this.checkEnd();
  };

  Combat.prototype.heal = function (src, tgt, n, opts) {
    opts = opts || {};
    if (tgt.dead || n <= 0) return 0;
    if (this.blackRule === 'curaCausaDano') { this.damage(null, tgt, n, { pure: true, tag: 'curse' }); return 0; }
    if (this.fateFx.healMinus) n = Math.max(0, n - this.fateFx.healMinus);
    if (this.modeRules.healNerf) n = Math.max(1, Math.floor(n / 2));
    if (src && src.kind === 'hero') {
      if (src === tgt) n += this.relicN('selfHealPlus');
      if (this.fateFx.firstHealBonusUsed !== true && this.tflags.firstHealBonus) { n += this.tflags.firstHealBonus; this.tflags.firstHealBonus = 0; }
      if (src.passive === 'firstHealCleanse' && !this.tflags.firstHealCleanseDone) { this.tflags.firstHealCleanseDone = true; this.cleanse(tgt, 1); }
    }
    if (n <= 0) return 0;
    var before = tgt.hp;
    tgt.hp = Math.min(tgt.maxHp, tgt.hp + n);
    var done = tgt.hp - before;
    if (done > 0 || opts.showZero) this.ev('heal', { side: tgt.kind, idx: tgt.slot, n: done });
    if (tgt.kind === 'hero') this.bstats.healDone += done;
    // curas viram escudo no excesso (relíquia)
    if (done < n && this.hasRelic('healShields') && tgt.kind === 'hero') this.giveShield(tgt, n - done, { quiet: true });
    // curaInvertida (regra caos)
    if (this.chaosRule && this.chaosRule.id === 'curaInvertida' && !this.tflags.chaosHealDone && src && src.kind === 'hero') {
      this.tflags.chaosHealDone = true;
      var weakest = this.weakestEnemy();
      if (weakest) this.damage(null, weakest, 1, { pure: true, tag: 'magic' });
    }
    return done;
  };

  Combat.prototype.healLowest = function (n) {
    var a = this.aliveHeroes(); if (!a.length) return;
    a.sort(function (x, y) { return (x.hp / x.maxHp) - (y.hp / y.maxHp); });
    this.heal(null, a[0], n);
  };

  Combat.prototype.giveShield = function (u, n, opts) {
    opts = opts || {};
    if (u.dead || u.downed || n <= 0) return;
    if (this.fateFx.shieldPlus) n += this.fateFx.shieldPlus;
    if (u.kind === 'hero') {
      if (u.passive === 'firstShieldPlus1' && !u.bflags.gotShieldThisTurn) n += 1;
      u.bflags.gotShieldThisTurn = true;
      this.tflags.shieldGained = (this.tflags.shieldGained || 0) + n;
    }
    u.shield += n;
    if (!opts.quiet) this.ev('shield', { side: u.kind, idx: u.slot, n: n });
  };

  Combat.prototype.weakestEnemy = function () {
    var a = this.aliveEnemies(); if (!a.length) return null;
    a.sort(function (x, y) { return x.hp - y.hp; });
    return a[0];
  };
  Combat.prototype.strongestEnemy = function () {
    var a = this.aliveEnemies(); if (!a.length) return null;
    a.sort(function (x, y) { return y.hp - x.hp; });
    return a[0];
  };

  Combat.prototype.summonAlly = function (id, src) {
    var def = RA.data.Summons[id]; if (!def) return;
    if (this.summons.filter(function (s) { return !s.dead; }).length >= 3) return;
    var hp = def.hp + this.relicN('summonHpPlus') + ((src && src.passive === 'summonHpPlus') ? 1 : 0);
    var s = { kind: 'hero', summon: true, id: id, def: def, name: def.name, hp: hp, maxHp: hp, row: def.tank ? 'front' : 'back', shield: 0, statuses: {}, dead: false, downed: false, ttl: (def.ttl || 0) + (this.hasRelic('summonLonger') ? 1 : 0), slot: -1, bflags: {} };
    this.summons.push(s);
    this.ev('summonAlly', { id: id, idx: this.summons.length - 1 });
    if (this.hasRelic('summonActNow') && def.act) this.summonAct(s);
    return s;
  };

  Combat.prototype.summonAct = function (s) {
    if (s.dead || !s.def.act) return;
    var act = s.def.act;
    var n = (act.n || 1) + this.relicN('summonDmgPlus');
    if (act.k === 'dmg') {
      var t = this.frontEnemies()[0];
      if (t) this.damage(s, t, n, { isAttack: true, tag: 'summon' });
    } else if (act.k === 'healLowest') this.healLowest(act.n || 1);
    this.ev('summonAct', { idx: this.summons.indexOf(s) });
  };

  Combat.prototype.summonEnemy = function (id) {
    var def = RA.data.Enemies.byId[id];
    if (!def) return;
    if (this.aliveEnemies().length >= 5) return;
    var hp = Math.max(1, Math.round(def.hp * (this.diff.enemyHpMul || 1)));
    if (this.hasRelic('enemySummonVuln')) hp = Math.max(1, hp - 1);
    var e = { kind: 'enemy', slot: this.enemies.length, id: def.id, def: def, name: def.name, hp: hp, maxHp: hp, row: def.row || 'front', shield: 0, statuses: {}, aiIdx: 0, charge: 0, hidden: false, dead: false, fled: false, intent: null, tier: def.tier || 'comum', mech: def.mech || null, bflags: {}, summoned: true };
    if (this.hasRelic('enemySummonVuln')) e.statuses.vulnerable = 1;
    this.enemies.push(e);
    this.computeIntent(e);
    this.ev('summonEnemy', { idx: e.slot, id: id });
    return e;
  };

  // ============================ dados ============================
  Combat.prototype.buildDice = function () {
    this.dice = [];
    var alive = this.heroes.filter(function (h) { return !h.dead && !h.downed; });
    var per = this.modeRules.dicePerHero || 1;
    for (var i = 0; i < this.heroes.length; i++) {
      var h = this.heroes[i];
      if (h.dead || h.downed) continue;
      for (var d = 0; d < per; d++) {
        this.dice.push({ heroIdx: i, faceIdx: 0, locked: false, used: false, blocked: false, sacrificed: false, bonus: 0, fake: -1, anim: { phase: 'rolling', t: 0 }, id: this.dice.length });
      }
    }
  };

  Combat.prototype.rollDie = function (d, first) {
    var h = this.heroes[d.heroIdx];
    d.faceIdx = this.rng.int(0, 5);
    d.bonus = 0; d.fake = -1;
    var face = h.faces[d.faceIdx];
    // relíquia: 1 vira 4 (oneToFour) — trata o "valor 1"
    if (this.hasRelic('oneToFour') && face.val === 1 && !first) d.bonus = 3;
    d.anim = { phase: 'rolling', t: 0 };
  };

  Combat.prototype.rollAll = function (first) {
    var self = this;
    var rerolled = [];
    this.dice.forEach(function (d) {
      if (d.used || d.sacrificed) return;
      if (!first && d.locked) return;
      self.rollDie(d, first);
      rerolled.push(d.id);
    });
    // efeitos pós-rolagem (bruxa troca dados, miragem, inverteDado...)
    RA.game.FXHooks.afterRoll(this, first, rerolled);
    this.ev('roll', { first: !!first, ids: rerolled });
    // conquista: tudo no máximo
    var allMax = this.dice.length >= 5;
    for (var i = 0; i < this.dice.length; i++) {
      var d = this.dice[i]; var f = this.faceOf(d);
      if (!f || f.val < 5) { allMax = false; break; }
    }
    if (allMax) this.ctx.stat('roll', { allSix: true });
  };

  Combat.prototype.faceOf = function (d) {
    var h = this.heroes[d.heroIdx];
    if (!h) return null;
    if (d.tempFace) return d.tempFace; // reforja do Ferreiro
    return h.faces[d.faceIdx];
  };
  Combat.prototype.dieValue = function (d) {
    var f = this.faceOf(d); if (!f) return 0;
    var v = f.val + d.bonus;
    var h = this.heroes[d.heroIdx];
    if (h && this.st(h, 'inspire')) v += this.st(h, 'inspire');
    if (h && this.st(h, 'freeze')) v -= this.st(h, 'freeze');
    if (this.blackRule === 'semNumeros') v = 2;
    if (this.tflags.nextDiePlus) v += this.tflags.nextDiePlus;
    return Math.max(0, v);
  };

  Combat.prototype.reroll = function () {
    if (this.phase !== 'player' || this.over || this.pendingChoice) return false;
    if (this.rollsLeft <= 0) return false;
    if (this.tflags.diceUsed > 0) return false; // não rerrolar após usar dados
    this.rollsLeft--;
    this.bstats.rerollsUsed++;
    this.tflags.rerolledThisTurn = true;
    // punições/relíquias de rerrolagem
    if (this.blackRule === 'rerollDano' || this.flags.punirReroll) {
      var self = this;
      this.aliveHeroes().forEach(function (h) { self.damage(null, h, 1, { pure: true, tag: 'curse' }); });
    }
    if (this.hasRelic('rerollAtkBuff') && !this.flags.rerollBuffDone) { this.flags.rerollBuffDone = true; this.tflags.buffAtk = (this.tflags.buffAtk || 0) + this.relicN('rerollAtkBuff'); }
    this.rollAll(false);
    this.ctx.stat('reroll', {});
    return true;
  };

  Combat.prototype.toggleLock = function (i) {
    var d = this.dice[i];
    if (!d || d.used || d.blocked || this.phase !== 'player') return false;
    if (d.forceLocked) return false;
    d.locked = !d.locked;
    if (d.fake >= 0 && d.locked) { d.fake = -1; this.ev('reveal', { id: d.id }); } // travar revela miragem
    this.ev('lock', { id: d.id, locked: d.locked });
    return true;
  };

  // valida alvo p/ um dado. Retorna {ok, reason}
  Combat.prototype.canUse = function (i, target) {
    var d = this.dice[i];
    if (!d || d.used || d.sacrificed) return { ok: false, reason: 'used' };
    if (d.blocked) return { ok: false, reason: RA.UI('dieBlocked') };
    if (this.phase !== 'player' || this.over || this.pendingChoice) return { ok: false, reason: 'phase' };
    if (this.blackRule === 'travadosProibidos' && d.locked) return { ok: false, reason: RA.T({ pt: 'Regra: dados travados não podem ser usados.', en: 'Rule: locked dice cannot be used.' }) };
    var f = this.faceOf(d);
    var h = this.heroes[d.heroIdx];
    if (this.st(h, 'silence') && (f.fx || []).some(function (x) { return x.magic || x.k === 'dmg' && x.magic; }) || (this.st(h, 'silence') && this.isMagicFace(f))) {
      return { ok: false, reason: RA.T({ pt: 'Silenciado: magias bloqueadas.', en: 'Silenced: spells blocked.' }) };
    }
    if (this.blackRule === 'simbolosProibidos' && this.tflags.symbolsUsedList.indexOf(f.sym) >= 0) {
      return { ok: false, reason: RA.T({ pt: 'Regra: símbolos repetidos proibidos.', en: 'Rule: repeated symbols forbidden.' }) };
    }
    if (f.uses !== undefined && f.uses <= 0) return { ok: false, reason: RA.T({ pt: 'Face gasta.', en: 'Face spent.' }) };
    // valida alvo
    var tv = this.resolveTarget(d, f, target);
    if (!tv.ok) return tv;
    return { ok: true, face: f, value: this.dieValue(d), target: tv.unit };
  };

  Combat.prototype.isMagicFace = function (f) {
    if (!f || !f.fx) return false;
    for (var i = 0; i < f.fx.length; i++) if (f.fx[i].magic) return true;
    return false;
  };

  Combat.prototype.resolveTarget = function (d, f, target) {
    var tgt = f.tgt;
    if (tgt === 'none' || tgt === 'allE' || tgt === 'allA') return { ok: true, unit: null };
    if (tgt === 'self') return { ok: true, unit: this.heroes[d.heroIdx] };
    if (!target) return { ok: false, reason: 'needTarget' };
    if (tgt === 'enemy') {
      if (target.side !== 'enemy') return { ok: false, reason: RA.UI('needEnemy') };
      var e = this.enemies[target.idx];
      if (!e || e.dead || e.fled) return { ok: false, reason: 'dead' };
      var anyRow = false;
      for (var i = 0; i < (f.fx || []).length; i++) if (f.fx[i].anyRow || f.fx[i].magic) anyRow = true;
      if (!anyRow && e.row === 'back') {
        var fr = this.aliveEnemies().filter(function (x) { return x.row === 'front'; });
        if (fr.length) return { ok: false, reason: RA.T({ pt: 'A linha de frente protege!', en: 'The front line protects!' }) };
      }
      return { ok: true, unit: e };
    }
    if (tgt === 'ally') {
      if (target.side !== 'hero') return { ok: false, reason: RA.UI('needAlly') };
      var h = target.summon ? this.summons[target.idx] : this.heroes[target.idx];
      if (!h || h.dead || h.downed) return { ok: false, reason: 'dead' };
      return { ok: true, unit: h };
    }
    if (tgt === 'any') {
      if (!target) return { ok: false, reason: 'needTarget' };
      if (target.side === 'enemy') {
        var ae = this.enemies[target.idx];
        if (!ae || ae.dead || ae.fled) return { ok: false, reason: 'dead' };
        return { ok: true, unit: ae };
      }
      var ah = target.summon ? this.summons[target.idx] : this.heroes[target.idx];
      if (!ah || ah.dead || ah.downed) return { ok: false, reason: 'dead' };
      return { ok: true, unit: ah };
    }
    if (tgt === 'downed') {
      if (target.side !== 'hero') return { ok: false, reason: RA.UI('needAlly') };
      var hd = this.heroes[target.idx];
      if (!hd || hd.dead || !hd.downed) return { ok: false, reason: RA.T({ pt: 'Precisa de um aliado caído.', en: 'Needs a downed ally.' }) };
      return { ok: true, unit: hd };
    }
    return { ok: false, reason: '?' };
  };

  Combat.prototype.useDie = function (i, target) {
    var v = this.canUse(i, target);
    if (!v.ok) { this.ev('deny', { id: i, reason: v.reason }); return v; }
    var d = this.dice[i];
    var h = this.heroes[d.heroIdx];
    var f = v.face;

    // regra do Dado Negro: sacrifício do primeiro dado
    if (this.blackRule === 'sacrificioDado' && !this.tflags.sacrificed) {
      this.tflags.sacrificed = true;
      d.used = true; d.sacrificed = true;
      this.ev('sacrifice', { id: d.id });
      this.say(RA.T({ pt: 'O Dado Negro devora o dado!', en: 'The Black Die devours the die!' }));
      return { ok: true, sacrificed: true };
    }
    // criança da sorte / regra: alvos aleatórios
    if ((this.blackRule === 'ataquesAleatorios' || this.flags.randomTargets) && f.tgt === 'enemy') {
      var pool = this.aliveEnemies();
      v.target = pool[this.rng.int(0, pool.length - 1)];
    }

    d.used = true; d.locked = false;
    if (d.fake >= 0) { d.fake = -1; this.ev('reveal', { id: d.id }); }
    this.tflags.diceUsed++;
    this.tflags.lastDie = { die: d, face: f, value: this.dieValue(d), hero: h, target: v.target };
    this.tflags.valuesUsed.push(this.dieValue(d));
    this.tflags.symbolsUsedList.push(f.sym);
    this.tflags.symbolCount[f.sym] = (this.tflags.symbolCount[f.sym] || 0) + 1;
    if (f.cracked || d.crackedDie) {
      this.tflags.crackedUsed = (this.tflags.crackedUsed || 0) + 1;
      this.bstats.crackedUsedMaxTurn = Math.max(this.bstats.crackedUsedMaxTurn, this.tflags.crackedUsed);
    }
    // consumir inspiração
    if (this.st(h, 'inspire')) delete h.statuses.inspire;
    if (this.tflags.nextDiePlus) this.tflags.nextDiePlus = 0;
    // uso limitado (faces rúnicas com uses)
    if (f.uses !== undefined) {
      var spendUse = true;
      if (f.cracked && (this.hasRelic('crackSaver') || this.hasPassive('crackSaver')) && !this.flags.crackSaved) { this.flags.crackSaved = true; spendUse = false; }
      if (spendUse) f.uses--;
      if (f.uses <= 0) f.cracked = true;
    }
    this.ev('useDie', { id: d.id, heroIdx: d.heroIdx, face: f, value: v.value, target: v.target ? { side: v.target.kind, idx: v.target.summon ? this.summons.indexOf(v.target) : v.target.slot, summon: !!v.target.summon } : null });

    // executar efeitos
    RA.game.FXHooks.applyFace(this, h, d, f, v.target);

    // pós-uso: combos, oráculo, undo
    RA.game.FXHooks.afterUse(this, h, d, f);
    this.checkEnd();
    return { ok: true };
  };

  // desfazer último dado (passiva do Cronomante) — 1x por batalha
  Combat.prototype.canUndo = function () {
    return !!(this.hasPassive('undo') && !this.flags.undoUsed && this.tflags.lastDie && this.phase === 'player' && !this.over);
  };
  Combat.prototype.undoDie = function () {
    if (!this.canUndo()) return false;
    // simplificação honesta: não reverte o efeito; devolve o dado p/ nova rolagem
    var ld = this.tflags.lastDie;
    this.flags.undoUsed = true;
    ld.die.used = false;
    this.rollDie(ld.die);
    this.ev('undo', { id: ld.die.id });
    this.say(RA.T({ pt: 'O tempo volta: o dado retorna!', en: 'Time rewinds: the die returns!' }));
    this.tflags.lastDie = null;
    return true;
  };

  // ============================ fluxo de turno ============================
  Combat.prototype.begin = function () {
    var self = this;
    // hooks de início de batalha
    if (this.hasRelic('startInspire')) this.aliveHeroes().forEach(function (h) { if (h.row === 'front') self.addStatus(h, 'inspire', 1); });
    if (this.hasRelic('backStartInspire')) this.aliveHeroes().forEach(function (h) { if (h.row === 'back') self.addStatus(h, 'inspire', 1); });
    if (this.hasRelic('frontHpPlus') && !this.flags.frontHpDone) {
      this.flags.frontHpDone = true;
      this.aliveHeroes().forEach(function (h) { if (h.row === 'front') { h.maxHp += self.relicN('frontHpPlus'); h.hp += self.relicN('frontHpPlus'); } });
    }
    if (this.hasRelic('randomStartBoon')) {
      var boons = ['shield', 'inspire', 'regen'];
      var b = boons[this.rng.int(0, 2)];
      this.aliveHeroes().forEach(function (h) { if (b === 'shield') self.giveShield(h, 2); else self.addStatus(h, b, 1); });
    }
    if (this.preMods.blessNext) this.aliveHeroes().forEach(function (h) { self.giveShield(h, 2); });
    if (this.preMods.curseNext) {
      var vict = this.aliveHeroes()[this.rng.int(0, this.aliveHeroes().length - 1)];
      if (vict) this.addStatus(vict, 'curse', 1);
    }
    if (this.preMods.inspiradoForja || this.preMods.estudoArena || this.preMods.versoGuerra) this._startBuff = 1;
    if (this.preMods.inspiracaoPoeta) this.aliveHeroes().forEach(function (h) { self.addStatus(h, 'inspire', 1); });
    if (this.preMods.mascaraBranca) this.enemies.forEach(function (e) { self.addStatus(e, 'blind', 1); });
    if (this.chaosRule && this.chaosRule.id === 'todosEnvenenados') {
      this.aliveHeroes().forEach(function (h) { h.statuses.poison = 1; });
      this.enemies.forEach(function (e) { e.statuses.poison = 1; });
    }
    if (this.chaosRule && this.chaosRule.id === 'ouroOuSangue') this.aliveHeroes().forEach(function (h) { h.hp = Math.max(1, h.hp - 2); });
    // mecânicas de chefe: início
    this.enemies.forEach(function (e) {
      if (e.mech && RA.game.Mechs[e.mech] && RA.game.Mechs[e.mech].onBattleStart) RA.game.Mechs[e.mech].onBattleStart(self, e);
    });
    RA.game.FXHooks.battleStart(this);
    this.ev('battleStart', { kind: this.battleKind });
    this.startTurn();
  };

  Combat.prototype.tflagsInit = function () {
    this.tflags = {
      diceUsed: 0, valuesUsed: [], symbolsUsedList: [], symbolCount: {},
      combosFired: {}, firstAtkDone: false, lastDie: null, lastDiePerHero: {},
      buffAtk: (this.turn <= 1 && this._startBuff) ? this._startBuff : 0,
      dmgThisTurn: 0, shieldGained: 0, crackedUsed: 0
    };
  };

  Combat.prototype.startTurn = function () {
    if (this.over) return;
    var self = this;
    this.turn++;
    this.phase = 'player';
    this.rollsLeft = this.maxRolls - 1; // a rolagem inicial conta como a 1ª
    if (this.flags.drenaSorte) { this.rollsLeft = Math.max(0, this.rollsLeft - 1); this.flags.drenaSorte = false; }
    this.tflagsInit();
    this.ev('turnStart', { turn: this.turn });

    // início de turno dos heróis
    this.heroes.forEach(function (h) {
      if (h.dead) return;
      if (h.downed) {
        h.downTimer--;
        if (h.downTimer <= 0) {
          if (h.falls >= RA.config.DEATHS_PERMANENT) { h.dead = true; self.ev('permaDeath', { idx: h.slot }); }
          else { h.dead = true; self.ev('permaDeath', { idx: h.slot }); self.say(RA.T({ pt: h.name.pt + ' não resistiu...', en: h.name.en + ' did not make it...' })); }
        }
        return;
      }
      // escudo expira (a não ser persistência)
      var persist = self.hasRelic('shieldPersist') || h.passive === 'shieldPersist';
      if (!persist) h.shield = 0;
      h.bflags.gotShieldThisTurn = false;
      h.bflags.damagedThisTurn = false;
      if (self.st(h, 'regen')) { self.heal(null, h, self.st(h, 'regen')); h.statuses.regen--; if (!h.statuses.regen) delete h.statuses.regen; }
    });
    this.checkEnd(); if (this.over) return;

    // invocações: ttl
    this.summons.forEach(function (s) {
      if (s.dead) return;
      if (s.ttl) { s.ttl--; if (s.ttl <= 0) { s.dead = true; self.ev('summonDie', { idx: self.summons.indexOf(s) }); } }
    });

    // inimigos: computa intenções + mechs
    this.aliveEnemies().forEach(function (e) {
      e.hidden = false;
      self.computeIntent(e);
      if (e.mech && RA.game.Mechs[e.mech] && RA.game.Mechs[e.mech].onTurnStart) RA.game.Mechs[e.mech].onTurnStart(self, e);
    });

    // Dado do Destino
    RA.game.FXHooks.rollFate(this);

    // regra de caos: dadosSelvagens
    // (aplicada após a rolagem em afterRoll)

    // dados
    if (this.turn === 1) this.buildDice();
    else {
      this.dice.forEach(function (d) {
        var h = self.heroes[d.heroIdx];
        d.used = false; d.sacrificed = false; d.blocked = false; d.forceLocked = false; d.tempFace = null; d.crackedDie = false;
        if (h.dead || h.downed) { d.used = true; }
        d.locked = false;
      });
      // dado guardado (ampulheta/passiva storeDie)
      if (this.flags.storedDie != null) {
        var sd = this.dice[this.flags.storedDie];
        if (sd) { sd.locked = true; sd.forceLocked = false; }
        this.flags.storedDie = null;
      }
    }
    // travas de inimigos (travaDado/bloqueiaDado)
    if (this.flags.lockNextDie) {
      var cand = this.dice.filter(function (d) { return !d.used; });
      if (cand.length) { var pick = cand[this.rng.int(0, cand.length - 1)]; pick.blocked = true; this.ev('dieBlockedEv', { id: pick.id }); }
      this.flags.lockNextDie = false;
    }
    this.rollAll(true);
    this.ev('phase', { phase: 'player' });
  };

  Combat.prototype.computeIntent = function (e) {
    if (e.dead || e.fled) { e.intent = null; return; }
    var ai = e.def.ai;
    var it = ai[e.aiIdx % ai.length];
    e.intent = it;
    // agressividade (dificuldade): +1 em ataques
    if (this.diff.enemyAggro && it.k === 'atk') e.intent = { k: 'atk', n: it.n + 1, tgt: it.tgt };
    this.ev('intent', { idx: e.slot, intent: e.intent });
  };

  Combat.prototype.endTurn = function () {
    if (this.phase !== 'player' || this.over || this.pendingChoice) return false;
    var self = this;
    this.phase = 'resolve';
    this.ev('phase', { phase: 'enemy' });

    this.bstats.maxDmgTurn = Math.max(this.bstats.maxDmgTurn, this.tflags.dmgThisTurn || 0);
    this.ctx.stat('turnEnd', { dmg: this.tflags.dmgThisTurn || 0, shieldGained: this.tflags.shieldGained || 0 });

    // invocações agem
    this.summons.forEach(function (s) { if (!s.dead) self.summonAct(s); });

    // punição do Oráculo (símbolos repetidos)
    if (this.flags.punishRepeat) {
      var maxSym = 0;
      for (var k in this.tflags.symbolCount) maxSym = Math.max(maxSym, this.tflags.symbolCount[k]);
      if (maxSym >= 2) {
        this.say(RA.T({ pt: 'O Oráculo pune a repetição!', en: 'The Oracle punishes repetition!' }));
        this.aliveHeroes().forEach(function (h) { self.damage(null, h, self.flags.punishRepeat, { pure: true, tag: 'curse' }); });
      }
    }

    // fase inimiga
    var order = this.aliveEnemies().slice();
    // relógio partido: primeiro inimigo age por último
    if (this.hasRelic('delayFirstEnemy') && order.length > 1) order.push(order.shift());
    if (this.flags.delayIntent && order.length) { var di = order.shift(); order.push(di); this.flags.delayIntent = false; }
    order.forEach(function (e) { if (!e.dead && !e.fled && !self.over) self.enemyAct(e); });

    if (this.over) { this.finishTurn(); return true; }

    // ação extra de chefe (Maldição 2)
    if (this.diff.bossExtraActEvery && this.turn % this.diff.bossExtraActEvery === 0) {
      this.aliveEnemies().forEach(function (e) {
        if ((e.tier === 'chefe' || e.tier === 'secreto') && !self.over) { self.computeIntent(e); self.enemyAct(e); }
      });
    }
    // caos: inimigos +1 ação
    if (this.chaosRule && this.chaosRule.id === 'inimigosMaisAcao' && !this.over) {
      var extra = this.aliveEnemies();
      if (extra.length) { var pickE = extra[this.rng.int(0, extra.length - 1)]; this.computeIntent(pickE); this.enemyAct(pickE); }
    }
    this.finishTurn();
    return true;
  };

  Combat.prototype.finishTurn = function () {
    var self = this;
    if (!this.over) {
      // ---- fase de status (fim de rodada) ----
      var tick = function (u) {
        if (u.dead || (u.kind === 'hero' && u.downed)) return;
        var st = u.statuses;
        if (st.poison) { self.damage(null, u, st.poison, { pure: true, tag: 'poison' }); if (!u.dead && !(u.kind === 'enemy' && self.hasRelic('poisonSticky'))) { st.poison--; if (!st.poison) delete st.poison; } }
        if (u.dead) return;
        if (st.burn) { self.damage(null, u, st.burn, { pure: true, tag: 'burn' }); if (!u.dead) { if (self.hasRelic('burnLonger') && !u.bflags.burnKept && u.kind === 'enemy') { u.bflags.burnKept = true; } else delete st.burn; } }
        if (u.dead) return;
        if (st.bleed) { self.damage(null, u, st.bleed, { pure: true, tag: 'bleed' }); if (!u.dead) { st.bleed--; if (!st.bleed) delete st.bleed; } }
        if (u.dead) return;
        if (st.curse) { self.damage(null, u, st.curse, { pure: true, tag: 'curse' }); }
        // decaimentos de 1 turno
        ['mark', 'vulnerable', 'weak', 'blind', 'silence', 'fear', 'chained', 'slow', 'camo', 'counter', 'inspire', 'focus'].forEach(function (s) {
          if (st[s]) { st[s]--; if (!st[s]) delete st[s]; }
        });
        if (st.freeze) { st.freeze--; if (!st.freeze) delete st.freeze; }
      };
      this.heroes.forEach(tick);
      this.enemies.forEach(tick);
      this.summons.forEach(function (s) { if (!s.dead) tick(s); });
      this.checkEnd();
    }
    if (this.over) return;
    // caos: trocaPosicao
    if (this.chaosRule && this.chaosRule.id === 'trocaPosicao') {
      this.aliveHeroes().forEach(function (h) { h.row = h.row === 'front' ? 'back' : 'front'; });
      this.ev('rowsSwapped', {});
    }
    this.startTurn();
  };

  Combat.prototype.enemyAct = function (e) {
    var self = this;
    if (this.st(e, 'stun')) {
      e.statuses.stun--; if (!e.statuses.stun) delete e.statuses.stun;
      this.ev('enemySkip', { idx: e.slot, why: 'stun' });
      if (e.mech === 'giganteForja' && e.charge > 0) { e.charge = 0; this.say(RA.T({ pt: 'O Gigante perde a carga!', en: 'The Giant loses its charge!' })); }
      e.aiIdx++;
      return;
    }
    if (this.st(e, 'freeze')) {
      e.statuses.freeze--; if (!e.statuses.freeze) delete e.statuses.freeze;
      this.ev('enemySkip', { idx: e.slot, why: 'freeze' });
      return;
    }
    if (this.st(e, 'bleed')) this.damage(null, e, this.st(e, 'bleed'), { pure: true, tag: 'bleed' });
    if (e.dead) return;

    var it = e.intent || e.def.ai[e.aiIdx % e.def.ai.length];
    // mecânica de chefe pode substituir
    if (e.mech && RA.game.Mechs[e.mech] && RA.game.Mechs[e.mech].beforeAct) {
      var ov = RA.game.Mechs[e.mech].beforeAct(this, e, it);
      if (ov) it = ov;
    }
    this.ev('enemyAct', { idx: e.slot, intent: it });
    RA.game.FXHooks.enemyIntent(this, e, it);
    e.aiIdx++;
    this.checkEnd();
  };

  // alvo dos inimigos
  Combat.prototype.pickHeroTarget = function (e, mode) {
    var pool;
    if (mode === 'back') {
      pool = this.aliveHeroes().filter(function (h) { return h.row === 'back'; });
      if (!pool.length) pool = this.frontHeroes();
    } else if (mode === 'weakest') {
      pool = this.aliveHeroes().slice().sort(function (a, b) { return a.hp - b.hp; }).slice(0, 1);
    } else if (mode === 'random') {
      pool = this.allAllies();
    } else pool = this.frontHeroes();
    // taunt: provocação redireciona
    if (this.flags.tauntTarget != null) {
      var t = this.heroes[this.flags.tauntTarget];
      if (t && !t.dead && !t.downed) pool = [t];
    }
    // camuflagem: evita alvos camuflados se houver outros
    var open = pool.filter(function (h) { return !h.statuses.camo; });
    if (open.length) pool = open;
    if (!pool.length) return null;
    var tgt = pool[this.rng.int(0, pool.length - 1)];
    // proteção redireciona
    if (tgt.statuses && tgt.statuses.protect && tgt.protector != null) {
      var pr = this.heroes[tgt.protector];
      if (pr && !pr.dead && !pr.downed) tgt = pr;
    }
    return tgt;
  };

  Combat.prototype.checkEnd = function () {
    if (this.over) return;
    if (!this.aliveEnemies().length && this.enemies.length) {
      this.over = true; this.won = true; this.phase = 'ended';
      this.ev('battleEnd', { won: true });
      return;
    }
    var anyHero = this.heroes.some(function (h) { return !h.dead && !h.downed; });
    var anyRecoverable = this.heroes.some(function (h) { return !h.dead; });
    if (!anyHero) {
      this.over = true; this.won = false; this.phase = 'ended';
      this.ev('battleEnd', { won: false, wipe: !anyRecoverable });
    }
  };

  // escolhas pendentes (Runa do Controle, chooseFate, sacrifícios...)
  Combat.prototype.ask = function (kind, options, cb) {
    this.pendingChoice = { kind: kind, options: options, cb: cb };
    this.ev('choice', { kind: kind, options: options });
  };
  Combat.prototype.choose = function (i) {
    if (!this.pendingChoice) return false;
    var pc = this.pendingChoice;
    this.pendingChoice = null;
    pc.cb.call(this, i);
    return true;
  };

  RA.game.Combat = Combat;
})();
