// BattleScene: mesa de dados com resolução ENCENADA.
// - Inimigos rolam seus próprios dados no início do turno e os exibem no painel
// - Arrastar um dado a um alvo apenas ATRIBUI (o dado fica sobre o alvo)
// - FINALIZAR resolve passo a passo: cada herói age um por um (o dado voa até
//   o alvo, impacto, números, hit-pause), depois cada inimigo age um por um,
//   com faixas de turno, painéis que avançam ao agir e flash de dano.
(function () {
  var F = RA.gfx.Font, W2 = null;

  function easeOut(t) { return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3); }

  // faces falsas p/ animação de rolagem dos dados inimigos
  var EFAKES = ['sword', 'shield', 'skull', 'heart', 'eye', 'flame'].map(function (s) { return { sym: s, val: 0 }; });

  function BattleScene(params) {
    this.run = params.run;
    this.room = params.room;
    this.onDone = params.onDone;
  }

  BattleScene.prototype.enter = function () {
    W2 = RA.ui.W;
    this.combat = this.run.startBattle(this.room);
    this.time = 0;
    this.enterT = 0;
    this.evQueue = [];
    this.evDelay = 0;
    this.banner = null; this.bannerT = 0;
    this.hoverTip = null;
    this.dragTarget = null;
    this.confirmBox = null;
    this.finishing = false;
    this.rollT = 0;
    this.pauseT = 0;
    this.logLine = '';
    this.scatter = {};
    this.assignments = [];       // {die, target:{side,idx}}
    this.resolving = false;
    this.resolveSteps = [];
    this.travel = null;          // dado em voo (ida/impacto/volta)
    this.actingHero = -1;
    this.eDice = {};             // slot -> {anim:{phase,t}, delay}
    this.region = this.run.region().id;
    var kind = this.combat.battleKind;
    var bossId = this.combat.enemies[0] && this.combat.enemies[0].id;
    var music = 'batalha';
    if (kind === 'elite') music = 'elite';
    if (kind === 'chefe') music = bossId === 'dadoNegro' ? 'bossFinal' : 'boss';
    if (kind === 'secreto') music = 'bossSecreto';
    if (this.run.modeId === 'bossRush') music = 'bossRush';
    if (this.run.modeId === 'abismo') music = 'abismo';
    RA.audio.setMusic(music);
    if (kind === 'chefe' || kind === 'secreto') RA.audio.sfx('bossAppear');
    this.drainEvents();
    if (this.combat.chaosRule) this.showBanner(RA.T(this.combat.chaosRule), '#e8a04a');
  };

  BattleScene.prototype.showBanner = function (txt, color, big) {
    this.banner = { txt: txt, color: color || '#ffe9a0', big: !!big };
    this.bannerT = 0;
  };

  // ============================ layout ============================
  BattleScene.prototype.layout = function (w, h) {
    var s = RA.core.Save.get().settings;
    var c = this.combat;
    var L = { w: w, h: h, portrait: h > w * 1.15 };
    L.barH = 30;
    L.barY = h - L.barH;
    L.dieS = Math.max(22, Math.min(30, Math.floor(Math.min(w, h) / 9)));

    var heroes = c.heroes;
    var enemies = c.enemies.filter(function (e) { return !e.dead && !e.fled; });

    L.heroPanels = {};
    L.enemyPanels = {};
    L.slots = {};

    if (!L.portrait) {
      var pw = Math.max(92, Math.min(128, Math.floor(w * 0.3)));
      var availH = L.barY - 24;
      var hph = Math.min(38, Math.floor(availH / Math.max(1, heroes.length)) - 3);
      heroes.forEach(function (hu, i) {
        L.heroPanels[hu.slot] = { x: 4, y: 22 + i * (hph + 3), w: pw, h: hph, unit: hu };
      });
      var eBoss = enemies.some(function (e) { return e.tier === 'chefe' || e.tier === 'secreto'; });
      var eph = Math.min(eBoss ? 46 : 38, Math.floor(availH / Math.max(1, enemies.length)) - 3);
      enemies.forEach(function (e, i) {
        var hh = (e.tier === 'chefe' || e.tier === 'secreto') ? Math.min(52, eph + 10) : eph;
        L.enemyPanels[e.slot] = { x: w - 4 - pw, y: 22 + i * (eph + 3), w: pw, h: hh, unit: e };
      });
      L.diceZone = { x: pw + 14, y: 26, w: w - 2 * (pw + 14), h: L.barY - 40 };
    } else {
      var rw = w - 8;
      var erh = 22;
      enemies.forEach(function (e, i) {
        var hh = (e.tier === 'chefe' || e.tier === 'secreto') ? 30 : erh;
        L.enemyPanels[e.slot] = { x: 4, y: 20 + i * (erh + 3), w: rw, h: hh, unit: e, row: true };
      });
      var eBottom = 20 + enemies.length * (erh + 3) + 4;
      var hrh = 24;
      var hTop = L.barY - heroes.length * (hrh + 3) - 4;
      heroes.forEach(function (hu, i) {
        L.heroPanels[hu.slot] = { x: 4, y: hTop + i * (hrh + 3), w: rw, h: hrh, unit: hu, row: true };
      });
      L.diceZone = { x: 8, y: eBottom, w: w - 16, h: hTop - eBottom - 4 };
    }

    var perHero = {};
    for (var i = 0; i < c.dice.length; i++) {
      var d = c.dice[i];
      var hp = L.heroPanels[d.heroIdx];
      if (!hp) continue;
      var idx = perHero[d.heroIdx] = (perHero[d.heroIdx] || 0);
      perHero[d.heroIdx]++;
      var ss = Math.min(hp.h - 4, 21);
      L.slots[d.id] = { x: hp.x + hp.w - (ss + 4) * (idx + 1), y: hp.y + Math.floor((hp.h - ss) / 2) - 2, s: ss };
    }

    L.summonPos = {};
    var sBase = L.portrait ? { x: w - 26, y: L.diceZone.y + 4 } : { x: 8, y: L.barY - 24 };
    this.combat.summons.forEach(function (su, i) {
      if (su.dead) return;
      L.summonPos[i] = { x: sBase.x - (L.portrait ? 0 : -i * 24), y: sBase.y + (L.portrait ? i * 24 : 0), s: 18, unit: su };
    });

    var bw = Math.min(84, Math.floor((w - 46) / 2));
    L.btnReroll = { x: 4, y: L.barY + 4, w: bw, h: L.barH - 8, label: '', small: true };
    L.btnDone = { x: w - bw - 4, y: L.barY + 4, w: bw, h: L.barH - 8, label: RA.UI('done'), glow: true, small: true };
    if (s.leftHanded) { var tmp = L.btnReroll.x; L.btnReroll.x = L.btnDone.x; L.btnDone.x = tmp; }
    L.fate = { x: Math.floor(w / 2 - 11), y: L.barY + 2, s: 22 };
    return L;
  };

  BattleScene.prototype.scatterDice = function (L) {
    var c = this.combat;
    var self = this;
    var free = c.dice.filter(function (d) { return !d.used && !d.locked && !d.blocked && !d.sacrificed && !self.isAssigned(d.id); });
    var n = free.length;
    if (!n) return;
    var z = L.diceZone;
    var cols = Math.max(1, Math.min(n, Math.floor(z.w / (L.dieS + 14))));
    var rows = Math.ceil(n / cols);
    var cw = z.w / cols, ch = Math.min(z.h / rows, L.dieS + 22);
    var oy = z.y + Math.max(0, (z.h - rows * ch) / 2);
    for (var i = 0; i < n; i++) {
      var col = i % cols, row = Math.floor(i / cols);
      var jx = (Math.random() - 0.5) * Math.max(0, cw - L.dieS - 8);
      var jy = (Math.random() - 0.5) * Math.max(0, ch - L.dieS - 10);
      this.scatter[free[i].id] = {
        x: Math.round(z.x + col * cw + cw / 2 - L.dieS / 2 + jx),
        y: Math.round(oy + row * ch + ch / 2 - L.dieS / 2 + jy)
      };
    }
  };

  // ============================ atribuições ============================
  BattleScene.prototype.isAssigned = function (dieId) {
    for (var i = 0; i < this.assignments.length; i++) if (this.combat.dice[this.assignments[i].die].id === dieId) return true;
    return false;
  };
  BattleScene.prototype.assignIdxAt = function (dieIdx) {
    for (var i = 0; i < this.assignments.length; i++) if (this.assignments[i].die === dieIdx) return i;
    return -1;
  };
  // MARCADOR do alvo: chip pequeno na borda do painel alvo (o dado em si
  // fica no slot do herói até a hora de agir)
  BattleScene.prototype.assignedPos = function (aIdx, L) {
    var a = this.assignments[aIdx];
    var p = a.target ? (a.target.side === 'enemy' ? L.enemyPanels[a.target.idx] : L.heroPanels[a.target.idx]) : null;
    var s = 12;
    if (!p) return { x: L.diceZone.x + 4 + aIdx * (s + 3), y: L.diceZone.y + 2, s: s };
    var stack = 0;
    for (var i = 0; i < aIdx; i++) {
      var o = this.assignments[i];
      if (o.target && a.target && o.target.side === a.target.side && o.target.idx === a.target.idx) stack++;
    }
    return { x: p.x + 4 + stack * (s + 3), y: p.y - 7, s: s };
  };

  BattleScene.prototype.tryAssign = function (dieIdx, target) {
    var c = this.combat;
    var v = c.canUse(dieIdx, target);
    if (!v.ok) {
      if (v.reason && typeof v.reason === 'string') this.logLine = v.reason;
      return false;
    }
    var d = c.dice[dieIdx];
    var f = c.faceOf(d);
    // faces sem alvo (allE/allA/none/self) aceitam soltar em qualquer lugar
    this.assignments.push({ die: dieIdx, target: target });
    d.locked = true; // não rerrolar dados atribuídos
    d.assignedView = true;
    RA.audio.sfx('diceLock');
    return true;
  };
  BattleScene.prototype.unassign = function (aIdx, L) {
    var a = this.assignments.splice(aIdx, 1)[0];
    var d = this.combat.dice[a.die];
    d.locked = false; d.assignedView = false;
    this.scatterDice(L);
    RA.audio.sfx('click');
  };
  BattleScene.prototype.clearAssignments = function () {
    var c = this.combat;
    this.assignments.forEach(function (a) {
      var d = c.dice[a.die];
      if (d && d.assignedView) { d.locked = false; d.assignedView = false; }
    });
    this.assignments = [];
  };

  // ============================ resolução encenada ============================
  // travel: um dado viaja do dono até o alvo, IMPACTA (efeitos disparam ali),
  // segura um instante e volta. Usado pelos heróis E pelos inimigos.
  // {vd, from, to, phase:'go'|'hold'|'back', t, released, onImpact, hero, side}
  BattleScene.prototype.startTravel = function (opts) {
    this.travel = {
      vd: opts.vd, from: opts.from, to: opts.to,
      phase: 'announce', t: 0, announceT: 0, released: false,
      onImpact: opts.onImpact || null, dieIdx: opts.dieIdx,
      label: opts.label || null,
      actorRef: opts.actorRef || null, targetRef: opts.targetRef || null,
      side: opts.side || 'hero', s: opts.s || 20,
      selfHop: Math.abs(opts.from.x - opts.to.x) < 8 && Math.abs(opts.from.y - opts.to.y) < 8
    };
  };

  BattleScene.prototype.updateTravel = function (dt) {
    var tv = this.travel;
    if (!tv) return;
    var spd = (RA.core.Save.get().settings.animSpeed || 1);
    if (tv.phase === 'announce') {
      // pausa mostrando QUEM vai agir e O QUE vai fazer
      tv.announceT += dt * spd;
      if (tv.announceT >= 0.85) { tv.phase = 'go'; RA.audio.sfx('reroll'); }
    } else if (tv.phase === 'go') {
      tv.t += dt * (tv.selfHop ? 1.5 : 0.95) * spd;
      if (tv.t >= 1) {
        tv.t = 1; tv.phase = 'hold'; tv.holdT = 0;
        tv.released = true;
        RA.gfx.Fx.shake(1.2);
        RA.gfx.Fx.ring(tv.to.x + tv.s / 2, tv.to.y + tv.s / 2, tv.side === 'hero' ? '#ffd76a' : '#ff6a7a', 24);
        if (tv.onImpact) { tv.onImpact(); tv.onImpact = null; }
      }
    } else if (tv.phase === 'hold') {
      tv.holdT += dt * spd;
      if (tv.holdT >= 0.8) { tv.phase = 'back'; tv.t = 1; }
    } else if (tv.phase === 'back') {
      tv.t -= dt * 1.25 * spd;
      if (tv.t <= 0) { this.travel = null; this.postDelay = 0.45; }
    }
  };

  BattleScene.prototype.travelPos = function (tv) {
    if (tv.phase === 'announce') {
      // dado pulsando na origem enquanto anuncia
      var pu = 1 + Math.sin(tv.announceT * 10) * 0.08;
      return { x: tv.from.x, y: tv.from.y - 4, s: tv.s * pu };
    }
    var tt = easeOut(tv.t);
    var x = tv.from.x + (tv.to.x - tv.from.x) * tt;
    var y = tv.from.y + (tv.to.y - tv.from.y) * tt;
    y -= Math.sin(tt * Math.PI) * (tv.selfHop ? 24 : 18);
    var sc = 1;
    if (tv.phase === 'hold') sc = 1.3 - Math.min(0.3, tv.holdT * 1.1);
    return { x: x, y: y, s: tv.s * sc };
  };

  BattleScene.prototype.startResolution = function (L) {
    this.resolving = true;
    this.resolveSteps = this.assignments.slice();
    this.assignments = [];
    RA.audio.sfx('confirm');
  };

  BattleScene.prototype.stepResolution = function (dt, L) {
    var c = this.combat, self = this;
    // espera o dado atual terminar a viagem, os efeitos tocarem e a pausa entre ações
    if (this.postDelay > 0) { this.postDelay -= dt; return; }
    if (this.travel || this.evQueue.length || c.pendingChoice || this.pauseT > 0) return;
    this.actingHero = -1;
    if (!this.resolveSteps.length) {
      this.resolving = false;
      this.showBanner(RA.UI('enemyTurn'), '#ff6a7a', true);
      c.endTurn();
      this.drainEvents();
      return;
    }
    var a = this.resolveSteps.shift();
    var d = c.dice[a.die];
    if (!d || d.used) return;
    this.actingHero = d.heroIdx;
    var hu = c.heroes[d.heroIdx];
    var hp = L.heroPanels[d.heroIdx];
    var p = a.target ? (a.target.side === 'enemy' ? L.enemyPanels[a.target.idx] : L.heroPanels[a.target.idx]) : null;
    // o dado SAI do slot do herói dono
    var sl3 = L.slots[d.id];
    var from = sl3 ? { x: sl3.x, y: sl3.y } : (hp ? { x: hp.x + hp.w - 26, y: hp.y + 2 } : { x: L.w / 2, y: L.h / 2 });
    var to = p ? { x: p.x + p.w / 2 - 10, y: p.y + p.h / 2 - 12 } : { x: L.diceZone.x + L.diceZone.w / 2 - 10, y: L.diceZone.y + L.diceZone.h / 2 - 10 };
    var actorRef = { side: 'hero', idx: d.heroIdx };
    var targetRef = a.target || null;
    var face = c.faceOf(d);
    this.startTravel({
      s: 22, side: 'hero', dieIdx: a.die,
      actorRef: actorRef, targetRef: targetRef,
      label: RA.T(hu.name) + ': ' + RA.T(face.name) + ' [' + c.dieValue(d) + ']',
      vd: { skin: hu.skin, anim: { phase: 'idle', t: 0 }, resultFace: Object.assign({}, face, { val: c.dieValue(d) }), faces: hu.faces, used: false, locked: false, highlight: true },
      from: from, to: to,
      onImpact: function () {
        d.locked = false; d.assignedView = false;
        var res = c.useDie(a.die, a.target);
        if (!res.ok && res.reason && typeof res.reason === 'string') self.logLine = res.reason;
        self.drainEvents();
      }
    });
  };

  // ============================ eventos ============================
  var SLOW = { enemyAct: 0.85, enemySkip: 0.5, turnStart: 0.4, battleEnd: 0.6, kill: 0.35, summonEnemy: 0.4, fate: 0.55, blackRule: 0.75, combo: 0.55, bossPhase: 0.65, down: 0.55, intent: 0.12, phase: 0.3 };
  BattleScene.prototype.drainEvents = function () {
    var evs = this.combat.events;
    this.combat.events = [];
    for (var i = 0; i < evs.length; i++) this.evQueue.push(evs[i]);
  };

  BattleScene.prototype.unitCenter = function (side, idx, L) {
    var p = side === 'enemy' ? L.enemyPanels[idx] : L.heroPanels[idx];
    if (!p) return { x: L.w / 2, y: L.h / 2 };
    return { x: p.x + p.w / 2, y: p.y + p.h / 2 };
  };

  BattleScene.prototype.playEvent = function (e, L) {
    var Fx = RA.gfx.Fx, sfx = RA.audio.sfx;
    var pos = (e.side && e.idx !== undefined) ? this.unitCenter(e.side, e.idx, L) : { x: L.w / 2, y: L.h / 2 };
    var px = pos.x, py = pos.y;
    switch (e.t) {
      case 'dmg':
        if (e.n > 0) {
          Fx.floater(px, py - 8, '-' + e.n, e.side === 'hero' ? '#ff6a7a' : '#ffe9a0', e.n >= 4 ? 2 : 1);
          Fx.burst(px, py, e.tag === 'poison' ? 'poison' : e.tag === 'burn' ? 'fire' : e.tag === 'magic' ? 'bolt' : e.tag === 'curse' ? 'curse' : 'hit', e.n >= 5 ? 18 : 11);
          Fx.ring(px, py, e.tag === 'poison' ? '#6ec83c' : e.tag === 'magic' ? '#8a4ae8' : '#ffd76a', e.n >= 5 ? 28 : 18);
          Fx.shake(e.n >= 6 ? 3.4 : 1.4);
          if (e.n >= 6) this.pauseT = 0.09; // hit-pause nos golpes fortes
          sfx(e.tag === 'poison' ? 'poison' : e.tag === 'burn' ? 'fire' : e.tag === 'magic' ? 'bolt' : e.tag === 'curse' ? 'curse' : (e.n >= 6 ? 'crit' : 'hit'));
          this.flash = { side: e.side, idx: e.idx, t: 0.22 };
        } else Fx.floater(px, py - 8, RA.T({ pt: 'BLOQ', en: 'BLOCK' }), '#8a94a8');
        break;
      case 'heal': Fx.floater(px, py - 8, '+' + e.n, '#6ee89a', e.n >= 4 ? 2 : 1); Fx.burst(px, py, 'heal', 10); Fx.ring(px, py, '#6ee89a', 20); sfx('heal'); break;
      case 'shield': Fx.floater(px, py - 8, '+' + e.n + '⛨', '#a8c4e8'); Fx.burst(px, py, 'shield', 6); sfx('shield'); break;
      case 'shieldHit': sfx('block'); break;
      case 'status': {
        var sd = RA.data.Statuses[e.s];
        Fx.floater(px, py - 8, (sd ? RA.T(sd) : e.s) + (e.n > 1 ? ' ' + e.n : ''), sd ? sd.color : '#fff');
        break;
      }
      case 'miss': Fx.floater(px, py - 8, RA.T({ pt: 'ERROU', en: 'MISS' }), '#8a8a94'); break;
      case 'kill': Fx.burst(px, py, 'death', 18); Fx.shake(2.4); this.pauseT = 0.07; sfx('enemyDie'); break;
      case 'down': Fx.floater(px, py - 8, RA.UI('heroDown'), '#ff6a7a', 2); Fx.shake(3); sfx('heroDown'); break;
      case 'permaDeath': Fx.floater(px, py - 8, RA.UI('permaDeath'), '#8a4ae8', 2); sfx('curse'); break;
      case 'revive': Fx.floater(px, py - 8, RA.UI('revived'), '#ffe9a0', 2); Fx.burst(px, py, 'summon', 12); sfx('revive'); break;
      case 'combo': this.showBanner(RA.UI('combo') + ' ' + RA.T(e.name), '#ffd76a', true); Fx.shake(1.5); sfx('combo'); break;
      case 'fate': this.fateSpin = 0.8; this.showBanner(RA.UI('fateDie') + ': ' + RA.T(e.fate), '#ffd76a'); sfx('fate'); break;
      case 'blackRule': this.showBanner(RA.UI('newRule') + ' ' + (e.name ? RA.T(e.name) : ''), '#c8b8e8', true); Fx.shake(2); sfx('bossPhase'); break;
      case 'bossPhase': Fx.shake(4); this.pauseT = 0.1; sfx('bossPhase'); break;
      case 'roll': {
        // arremesso real: cada dado sai do alto da mesa, quica e assenta
        var self2 = this;
        this.throwFrom = this.throwFrom || {};
        var z2 = L.diceZone;
        var ri2 = 0;
        this.combat.dice.forEach(function (d) {
          if (e.ids.indexOf(d.id) >= 0) {
            d.anim = { phase: 'rolling', t: 0, showFace: 0, dur: 0.75 + ri2 * 0.14, spin: 5 + Math.random() * 6 };
            self2.throwFrom[d.id] = { x: z2.x + z2.w * (0.3 + Math.random() * 0.4), y: z2.y - 26 };
            ri2++;
          }
        });
        this.scatterDice(L);
        this.rollT = 0.8 + ri2 * 0.14;
        sfx('diceRoll');
        break;
      }
      case 'intent': {
        // dado do inimigo rola e mostra a intenção
        this.eDice[e.idx] = { anim: { phase: 'rolling', t: 0 }, rollFor: 0.35 + (e.idx % 5) * 0.12 };
        break;
      }
      case 'turnStart': {
        this.clearAssignments();
        if (this.combat.turn > 1) this.showBanner(RA.UI('yourTurn'), '#6ee89a', true);
        break;
      }
      case 'phase':
        if (e.phase === 'enemy' && !this.banner) this.showBanner(RA.UI('enemyTurn'), '#ff6a7a', true);
        break;
      case 'lock': sfx('diceLock'); break;
      case 'useDie': sfx(e.face && e.face.sym === 'sword' ? 'sword' : 'diceHit'); break;
      case 'gold': if (e.n > 0) { Fx.floater(L.w / 2, L.diceZone.y + 12, '+' + e.n + '$', '#ffd76a'); sfx('gold'); } break;
      case 'goldSteal': Fx.floater(px, py - 8, '-' + e.n + '$', '#ff6a7a'); sfx('gold'); break;
      case 'summonAlly': case 'summonEnemy': Fx.burst(px, py, 'summon', 10); sfx('summon'); break;
      case 'log': this.logLine = e.msg; break;
      case 'crack': sfx('crack'); Fx.floater(px, py - 8, RA.UI('crackedSide'), '#e8a04a'); break;
      case 'deny': if (e.reason && typeof e.reason === 'string') this.logLine = e.reason; break;
      case 'enemyAct': {
        this.actingEnemy = { idx: e.idx, t: 0.6 };
        // o dado preto do inimigo viaja até o alvo da ação
        var ep2 = L.enemyPanels[e.idx];
        if (ep2 && e.intent) {
          // destino: primeiro evento posicional que esta ação vai gerar
          var dest = null;
          for (var qi = 0; qi < this.evQueue.length; qi++) {
            var qe = this.evQueue[qi];
            if (qe.t === 'enemyAct' || qe.t === 'phase' || qe.t === 'turnStart') break;
            if (qe.side !== undefined && qe.idx !== undefined) { dest = this.unitCenter(qe.side, qe.idx, L); break; }
          }
          var from2 = { x: ep2.x + 4, y: ep2.y + 3 };
          var to2 = dest ? { x: dest.x - 9, y: dest.y - 10 } : { x: from2.x, y: from2.y };
          var en2 = this.combat.enemies[e.idx];
          var destRef = null;
          for (var qj = 0; qj < this.evQueue.length; qj++) {
            var qe2 = this.evQueue[qj];
            if (qe2.t === 'enemyAct' || qe2.t === 'phase' || qe2.t === 'turnStart') break;
            if (qe2.side !== undefined && qe2.idx !== undefined) { destRef = { side: qe2.side, idx: qe2.idx }; break; }
          }
          this.startTravel({
            s: 18, side: 'enemy',
            actorRef: { side: 'enemy', idx: e.idx }, targetRef: destRef,
            label: (en2 ? RA.T(en2.name) : '') + ': ' + intentText(e.intent),
            vd: { skin: 'preto', anim: { phase: 'idle', t: 0 }, resultFace: { sym: intentIcon(e.intent), val: e.intent.n || 0 }, faces: EFAKES, used: false, locked: false, highlight: true },
            from: from2, to: to2
          });
        }
        break;
      }
      case 'battleEnd': this.battleOver = true; break;
    }
  };

  // ============================ update ============================
  BattleScene.prototype.update = function (dt, events) {
    this.time += dt;
    this.enterT += dt;
    var anim = RA.core.Save.get().settings.animSpeed || 1;
    var c = this.combat;
    var disp = RA.ui.disp;
    var L = this.layout(disp.w, disp.h);
    this.L = L;
    if (this.banner) this.bannerT += dt;
    if (this.bannerT > (this.banner && this.banner.big ? 1.6 : 2.2)) this.banner = null;
    if (this.fateSpin > 0) this.fateSpin -= dt;
    if (this.flash) { this.flash.t -= dt; if (this.flash.t <= 0) this.flash = null; }
    if (this.pauseT > 0) { this.pauseT -= dt; return; } // hit-pause congela tudo

    // dados dos heróis rolando (cada um tem sua própria duração de arremesso)
    if (this.rollT > 0) {
      this.rollT -= dt * anim;
      var self = this;
      c.dice.forEach(function (d) {
        if (d.anim.phase === 'rolling') {
          d.anim.t += dt * anim;
          var k = Math.min(1, d.anim.t / (d.anim.dur || 0.8));
          // a face gira rápido e desacelera até parar na final
          d.anim.showFace = Math.floor(d.anim.t * (16 - 12 * k));
          if (d.anim.t >= (d.anim.dur || 0.8)) { d.anim = { phase: 'landing', t: 0 }; RA.audio.sfx('diceHit'); }
        }
      });
    }
    c.dice.forEach(function (d) { if (d.anim.phase === 'landing') { d.anim.t += dt; if (d.anim.t > 0.4) d.anim = { phase: 'idle', t: 0 }; } });
    // dados dos inimigos rolando
    for (var k in this.eDice) {
      var ed = this.eDice[k];
      ed.anim.t += dt;
      if (ed.anim.phase === 'rolling' && ed.anim.t > ed.rollFor) { ed.anim = { phase: 'landing', t: 0 }; RA.audio.sfx('diceHit'); }
      else if (ed.anim.phase === 'landing' && ed.anim.t > 0.35) ed.anim = { phase: 'idle', t: 0 };
    }
    if (this.actingEnemy) { this.actingEnemy.t -= dt; if (this.actingEnemy.t <= 0) this.actingEnemy = null; }

    // viagem do dado (ida -> impacto -> volta)
    this.updateTravel(dt);

    // fila de eventos com ritmo (pausa enquanto um dado está voando ao alvo;
    // uma nova ação inimiga só começa depois da anterior TERMINAR + pausa)
    if (this.postDelay > 0 && !this.resolving) this.postDelay -= dt;
    this.evDelay -= dt * anim;
    var guard = 0;
    while (this.evQueue.length && this.evDelay <= 0 && this.pauseT <= 0 &&
           (!this.travel || this.travel.released) && guard++ < 30) {
      var nx = this.evQueue[0];
      if (nx.t === 'enemyAct' && (this.travel || (this.postDelay > 0 && !this.resolving))) break;
      var e = this.evQueue.shift();
      this.playEvent(e, L);
      this.evDelay = (SLOW[e.t] || 0.07) / anim;
    }
    this.drainEvents();
    W2.updateToasts(dt);

    // resolução encenada dos dados atribuídos
    if (this.resolving) this.stepResolution(dt, L);

    if (this.battleOver && !this.evQueue.length && !this.finishing) {
      this.finishing = true;
      var self3 = this;
      setTimeout(function () {
        var reward = self3.run.onBattleEnd(c);
        if (c.won) RA.audio.stinger('vitoria');
        self3.onDone(reward, c.won);
      }, 350);
      return;
    }
    if (this.finishing) return;

    var self4 = this;
    var input = RA.ui.input;
    this.hoverTip = null;

    if (c.pendingChoice) {
      var pc = c.pendingChoice;
      var bw2 = Math.min(160, L.w - 24), bx = (L.w - bw2) / 2;
      this.choiceRects = pc.options.map(function (o, i) {
        return { x: bx, y: L.h / 2 - 34 + i * 36, w: bw2, h: 30, opt: o, i: i };
      });
      events.taps.forEach(function (tp) {
        self4.choiceRects.forEach(function (r) {
          if (W2.inRect(tp.x, tp.y, r)) { c.choose(r.i); RA.audio.sfx('confirm'); self4.drainEvents(); }
        });
      });
      return;
    }
    if (this.confirmBox) {
      events.taps.forEach(function (tp) {
        if (W2.inRect(tp.x, tp.y, self4.confirmBox.yes)) { self4.confirmBox = null; self4.startResolution(L); }
        else if (W2.inRect(tp.x, tp.y, self4.confirmBox.no)) self4.confirmBox = null;
      });
      return;
    }
    // sem input durante resolução/fase inimiga
    if (c.over || c.phase !== 'player' || this.resolving || this.travel || this.evQueue.length > 4) return;

    events.taps.forEach(function (tp) {
      for (var i = 0; i < c.dice.length; i++) {
        var r = self4.dieRect(i, L);
        if (r && W2.inRect(tp.x, tp.y, r)) {
          var d = c.dice[i];
          // todo toque num dado mostra o cartão explicando a face
          self4.infoCard = { die: i, t: 3.2 };
          if (d.assignedView) {
            var uidx = self4.assignIdxAt(i);
            if (uidx >= 0) self4.unassign(uidx, L);
          } else if (!d.used && !d.blocked) {
            c.toggleLock(i);
            if (!d.locked) self4.scatterDice(L);
          }
          self4.drainEvents();
          return;
        }
      }
      if (W2.inRect(tp.x, tp.y, L.btnReroll) && c.rollsLeft > 0 && c.tflags.diceUsed === 0) { c.reroll(); self4.drainEvents(); return; }
      if (W2.inRect(tp.x, tp.y, L.btnDone)) {
        if (RA.core.Save.get().settings.confirmEndTurn) {
          var bw3 = Math.min(60, (L.w - 30) / 2);
          self4.confirmBox = {
            yes: { x: L.w / 2 - bw3 - 6, y: L.h / 2 + 6, w: bw3, h: 20, label: RA.UI('yes') },
            no: { x: L.w / 2 + 6, y: L.h / 2 + 6, w: bw3, h: 20, label: RA.UI('no') }
          };
        } else self4.startResolution(L);
        return;
      }
    });

    var p = input.pointer;
    if (p.down && !p.dragging && input.dragDistance() > 7) {
      for (var i2 = 0; i2 < c.dice.length; i2++) {
        var r2 = this.dieRect(i2, L);
        if (r2 && W2.inRect(p.startX, p.startY, r2)) {
          var d2 = c.dice[i2];
          if (!d2.used && !d2.blocked && !d2.assignedView) {
            input.startDrag({ die: i2 });
            this.infoCard = { die: i2, t: 3.2 };
          }
          break;
        }
      }
    }
    this.dragTarget = null;
    if (p.dragging && p.dragging.die !== undefined) this.dragTarget = this.hitUnit(p.x, p.y, L);
    events.releases.forEach(function (rel) {
      if (rel.drag && rel.drag.die !== undefined) {
        var tgt = self4.hitUnit(rel.x, rel.y, L);
        self4.tryAssign(rel.drag.die, tgt);
        self4.drainEvents();
      }
    });
    events.holds.forEach(function (hd) { self4.hoverTip = self4.tipAt(hd.x, hd.y, L); });
    if (p.down && !p.dragging) {
      var tip = this.tipAt(p.x, p.y, L);
      if (tip && performance.now() - p.downAt > 420) this.hoverTip = tip;
    }
  };

  BattleScene.prototype.dieRect = function (i, L) {
    var d = this.combat.dice[i];
    if (!d) return null;
    if (d.used || d.sacrificed || d.locked || d.blocked) {
      var sl = L.slots[d.id];
      if (!sl) return null;
      return { x: sl.x - 2, y: sl.y - 2, w: sl.s + 6, h: sl.s + 8 };
    }
    var sc = this.scatter[d.id];
    if (!sc) { this.scatterDice(L); sc = this.scatter[d.id]; }
    if (!sc) return null;
    return { x: sc.x - 3, y: sc.y - 5, w: L.dieS + 8, h: L.dieS + 12 };
  };

  BattleScene.prototype.hitUnit = function (x, y, L) {
    for (var k in L.enemyPanels) {
      var ep = L.enemyPanels[k];
      if (W2.inRect(x, y, ep)) return { side: 'enemy', idx: ep.unit.slot };
    }
    for (var k2 in L.heroPanels) {
      var hp = L.heroPanels[k2];
      if (W2.inRect(x, y, hp)) return { side: 'hero', idx: hp.unit.slot };
    }
    for (var k3 in L.summonPos) {
      var sp = L.summonPos[k3];
      if (x >= sp.x - 4 && x < sp.x + sp.s + 4 && y >= sp.y - 4 && y < sp.y + sp.s + 4) return { side: 'hero', idx: parseInt(k3, 10), summon: true };
    }
    return null;
  };

  BattleScene.prototype.tipAt = function (x, y, L) {
    var c = this.combat;
    for (var i = 0; i < c.dice.length; i++) {
      var r = this.dieRect(i, L);
      if (r && W2.inRect(x, y, r)) {
        var f = c.faceOf(c.dice[i]);
        if (!f) return null;
        return { x: x, y: r.y, title: RA.T(f.name) + ' [' + c.dieValue(c.dice[i]) + ']', lines: W2.descFace(f) };
      }
    }
    if (x >= L.fate.x - 3 && x < L.fate.x + L.fate.s + 6 && y >= L.fate.y && c.fate) {
      return { x: x, y: L.fate.y, title: RA.UI('fateDie') + ': ' + RA.T(c.fate), lines: [RA.T(c.fate.desc)] };
    }
    var u = this.hitUnit(x, y, L);
    if (u) {
      var unit = u.side === 'enemy' ? c.enemies[u.idx] : (u.summon ? c.summons[u.idx] : c.heroes[u.idx]);
      if (!unit) return null;
      var lines = [];
      var hideHp = unit.bflags && unit.bflags.hideHp;
      lines.push(RA.UI('hp') + ': ' + (hideHp ? '???' : (unit.hp + '/' + unit.maxHp)) + (unit.shield ? '  ⛨' + unit.shield : ''));
      if (u.side === 'enemy' && unit.intent) lines.push(RA.UI('intent') + ': ' + intentText(unit.intent));
      for (var s in unit.statuses) {
        var sd = RA.data.Statuses[s];
        if (sd) lines.push(RA.T(sd) + ' ' + unit.statuses[s] + (RA.core.Save.get().settings.detailedTooltips ? ' - ' + RA.T(sd.desc) : ''));
      }
      if (u.side === 'hero' && !u.summon && unit.def.passive) lines.push(RA.UI('passive') + ': ' + RA.T(unit.def.passive.txt));
      var pc2 = this.unitCenter(u.side, u.idx, L);
      return { x: x, y: pc2.y, title: RA.T(unit.name), lines: lines };
    }
    return null;
  };

  function intentText(it) {
    if (it.k === 'atk') return RA.T({ pt: 'Atacar ' + it.n, en: 'Attack ' + it.n });
    if (it.k === 'shield') return RA.T({ pt: 'Escudo ' + it.n, en: 'Shield ' + it.n });
    if (it.k === 'heal') return RA.T({ pt: 'Curar ' + it.n, en: 'Heal ' + it.n });
    if (it.k === 'st') { var sd = RA.data.Statuses[it.s]; return (sd ? RA.T(sd) : it.s) + ' ' + it.n; }
    if (it.k === 'summon') return RA.T({ pt: 'Invocar', en: 'Summon' });
    return '???';
  }

  function intentIcon(it) {
    if (!it) return 'eye';
    return it.k === 'atk' ? 'sword' : it.k === 'shield' ? 'shield' : it.k === 'heal' ? 'heart' : it.k === 'summon' ? 'star' : it.k === 'st' ? 'skull' : 'eye';
  }

  // ============================ desenho ============================
  function pips(ctx, x, y, maxW, cur, max, color) {
    if (max <= 14) {
      var per = Math.min(7, Math.max(1, Math.floor(maxW / 4)));
      for (var i = 0; i < max; i++) {
        var col = i % per, row = Math.floor(i / per);
        ctx.fillStyle = i < cur ? color : '#241f2c';
        ctx.fillRect(x + col * 4, y + row * 4, 3, 3);
      }
      return Math.ceil(max / per) * 4;
    }
    ctx.fillStyle = '#241f2c';
    ctx.fillRect(x, y, maxW, 4);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Math.round(maxW * Math.max(0, cur / max)), 4);
    F.draw(ctx, cur + '', x + maxW + 3, y - 1, { size: 1, color: '#c8c2d4' });
    return 5;
  }

  BattleScene.prototype.slide = function () { return easeOut(this.enterT / 0.55); };

  BattleScene.prototype.drawHeroPanel = function (ctx, p, L) {
    var hu = p.unit;
    var sk = RA.gfx.Dice.skin(hu.skin);
    var edge = hu.dead ? '#38323f' : sk.rim;
    var acting = this.actingHero === hu.slot;
    var ox = -(1 - this.slide()) * (p.w + 20) + (acting ? Math.sin(this.time * 10) * 1.5 + 4 : 0);
    var x = Math.round(p.x + ox), y = p.y;
    var flashing = this.flash && this.flash.side === 'hero' && this.flash.idx === hu.slot;
    ctx.fillStyle = flashing ? 'rgba(150,30,45,0.94)' : 'rgba(14,10,22,0.92)';
    ctx.fillRect(x, y, p.w, p.h);
    ctx.strokeStyle = acting ? '#ffd76a' : edge;
    ctx.lineWidth = acting ? 2 : 1;
    ctx.strokeRect(x + 0.5, y + 0.5, p.w - 1, p.h - 1);
    ctx.lineWidth = 1;
    if (hu.dead || hu.downed) ctx.globalAlpha = hu.dead ? 0.35 : 0.6;
    var ps = Math.min(p.h - 4, 19);
    ctx.drawImage(RA.gfx.Portraits.get(hu.id), x + 2, y + Math.floor((p.h - ps) / 2), ps, ps);
    var tx = x + ps + 5;
    var nameMax = Math.max(5, Math.floor((p.w - ps - 30) / 6));
    F.draw(ctx, RA.T(hu.name).slice(0, nameMax), tx, y + 2, { size: 1, color: hu.dead ? '#5a5468' : '#ffe9a0' });
    if (!hu.dead) {
      pips(ctx, tx, y + 11, 30, hu.hp, hu.maxHp, '#e84a5a');
      if (hu.shield > 0) {
        for (var si = 0; si < Math.min(7, hu.shield); si++) {
          ctx.fillStyle = '#6aa0e8';
          ctx.fillRect(tx + 32 + si * 4, y + 11, 3, 3);
        }
        if (hu.shield > 7) F.draw(ctx, '+' + (hu.shield - 7), tx + 60, y + 10, { size: 1, color: '#6aa0e8' });
      }
      var sx = tx, cnt = 0;
      for (var s in hu.statuses) {
        if (cnt >= 5) break;
        ctx.drawImage(RA.gfx.Icons.status(s), sx, y + p.h - 9, 7, 7);
        sx += 8; cnt++;
      }
      if (hu.downed) F.draw(ctx, String(hu.downTimer), x + p.w - 30, y + 3, { size: 2, color: '#ff6a7a', shadow: true });
    }
    ctx.globalAlpha = 1;
    var c = this.combat;
    for (var di = 0; di < c.dice.length; di++) {
      if (c.dice[di].heroIdx !== hu.slot) continue;
      var sl = L.slots[c.dice[di].id];
      if (!sl) continue;
      ctx.strokeStyle = edge;
      ctx.strokeRect(sl.x + ox + 0.5, sl.y + 0.5, sl.s - 1, sl.s - 1);
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(sl.x + ox + 1, sl.y + 1, sl.s - 2, sl.s - 2);
    }
    if (this.dragTarget && this.dragTarget.side === 'hero' && !this.dragTarget.summon && this.dragTarget.idx === hu.slot) {
      var pu = 0.5 + 0.5 * Math.sin(this.time * 8);
      ctx.strokeStyle = 'rgba(110,232,154,' + pu + ')';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 1.5, y - 1.5, p.w + 3, p.h + 3);
      ctx.lineWidth = 1;
    }
  };

  BattleScene.prototype.drawEnemyPanel = function (ctx, p, L) {
    var e = p.unit;
    var boss = e.tier === 'chefe' || e.tier === 'secreto';
    var edge = boss ? '#e8a04a' : (e.tier === 'elite' ? '#8a4ae8' : '#5a5468');
    var acting = this.actingEnemy && this.actingEnemy.idx === e.slot;
    var dir = L.portrait ? 0 : 1;
    var ox = (1 - this.slide()) * (p.w + 20) * (L.portrait ? -1 : 1) + (acting ? -Math.sin(this.actingEnemy.t * 18) * 4 : 0);
    var x = Math.round(p.x + ox), y = p.y;
    var flashing = this.flash && this.flash.side === 'enemy' && this.flash.idx === e.slot;
    ctx.fillStyle = flashing ? 'rgba(150,30,45,0.94)' : 'rgba(14,10,22,0.92)';
    ctx.fillRect(x, y, p.w, p.h);
    ctx.strokeStyle = acting ? '#ff6a7a' : edge;
    ctx.lineWidth = acting ? 2 : 1;
    ctx.strokeRect(x + 0.5, y + 0.5, p.w - 1, p.h - 1);
    ctx.lineWidth = 1;
    if (e.hidden) ctx.globalAlpha = 0.5;
    // DADO do inimigo (intenção rolada)
    var it = e.intent;
    var eds = Math.min(p.h - 5, 15);
    if (it) {
      var ed = this.eDice[e.slot];
      var vd = {
        skin: 'preto',
        anim: ed ? ed.anim : { phase: 'idle', t: 0 },
        resultFace: { sym: intentIcon(it), val: it.n || 0 },
        faces: EFAKES, used: false, locked: false
      };
      RA.gfx.Dice.draw(ctx, vd, x + 3, y + 3, eds, this.time + e.slot);
      if (it.n) F.draw(ctx, String(it.n), x + eds + 6, y + 4, { size: 1, color: '#ffe9a0', shadow: true });
    }
    var ss = Math.min(p.h - 2, boss ? 30 : 20);
    var frame = Math.floor(this.time * 2 + e.slot) % 2;
    // sprite pintado a 2x e reduzido: mais definição no backing store 2x
    var spr = RA.gfx.EnemySprites.get(e.def.arch, e.def.region || this.region, ss * 2, e.def.decor, frame);
    var lunge = acting ? -Math.sin(this.actingEnemy.t * 18) * 5 : 0;
    ctx.drawImage(spr, Math.round(x + p.w - ss - 2 + lunge), y + Math.floor((p.h - ss) / 2) + Math.round(Math.sin(this.time * 2.4 + e.slot) * 1), ss, ss);
    var tx = x + eds + 12;
    F.draw(ctx, RA.T(e.name).slice(0, Math.max(5, Math.floor((p.w - ss - eds - 14) / 6))), tx, y + 2, { size: 1, color: boss ? '#ffd76a' : '#c8c2d4' });
    var hideHp = e.bflags && e.bflags.hideHp;
    if (!hideHp) pips(ctx, tx, y + 11, p.w - ss - eds - 24, e.hp, e.maxHp, '#e84a5a');
    else F.draw(ctx, '???', tx, y + 11, { size: 1, color: '#8a4ae8' });
    if (e.shield > 0) F.draw(ctx, '⛨' + e.shield, tx + Math.max(28, p.w - ss - eds - 44), y + 2, { size: 1, color: '#6aa0e8' });
    var sx = tx, cnt = 0;
    for (var s in e.statuses) {
      if (cnt >= 6) break;
      ctx.drawImage(RA.gfx.Icons.status(s), sx, y + p.h - 9, 7, 7);
      sx += 8; cnt++;
    }
    ctx.globalAlpha = 1;
    if (this.dragTarget && this.dragTarget.side === 'enemy' && this.dragTarget.idx === e.slot) {
      var pu = 0.5 + 0.5 * Math.sin(this.time * 8);
      ctx.strokeStyle = 'rgba(255,215,106,' + pu + ')';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 1.5, y - 1.5, p.w + 3, p.h + 3);
      ctx.lineWidth = 1;
    }
  };

  BattleScene.prototype.render = function (ctx, w, h) {
    var c = this.combat, L = this.L || this.layout(w, h);
    var Fx = RA.gfx.Fx;
    var self = this;
    ctx.save();
    var off = Fx.offset();
    ctx.translate(off.x, off.y);

    RA.gfx.Backgrounds.draw(ctx, this.region, w, h, this.time);

    var z = L.diceZone;
    ctx.fillStyle = 'rgba(232,224,208,0.05)';
    ctx.beginPath();
    ctx.ellipse(z.x + z.w / 2, z.y + z.h / 2, z.w / 2, z.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(232,224,208,0.08)';
    ctx.beginPath();
    ctx.ellipse(z.x + z.w / 2, z.y + z.h / 2, z.w / 2 - 3, z.h / 2 - 3, 0, 0, Math.PI * 2);
    ctx.stroke();

    Object.keys(L.enemyPanels).forEach(function (k) { self.drawEnemyPanel(ctx, L.enemyPanels[k], L); });
    Object.keys(L.heroPanels).forEach(function (k) { self.drawHeroPanel(ctx, L.heroPanels[k], L); });

    Object.keys(L.summonPos).forEach(function (k) {
      var sp = L.summonPos[k], su = sp.unit;
      var spr = RA.gfx.EnemySprites.get(su.def.sprite || 'construto', self.region, sp.s, null, 0);
      ctx.globalAlpha = 0.9;
      ctx.drawImage(spr, sp.x, sp.y);
      ctx.globalAlpha = 1;
      W2.hpBar(ctx, sp.x, sp.y + sp.s + 2, sp.s, su.hp, su.maxHp, 0, '#8a4ae8');
    });

    // holofote na ação: escurece tudo menos o ator, o alvo e o dado em voo
    if (this.travel && (this.travel.actorRef || this.travel.targetRef)) {
      ctx.fillStyle = 'rgba(6,4,12,0.42)';
      ctx.fillRect(0, 0, w, L.barY);
      var redraw = [this.travel.actorRef, this.travel.targetRef];
      for (var ri3 = 0; ri3 < redraw.length; ri3++) {
        var ref = redraw[ri3];
        if (!ref) continue;
        if (ref.side === 'enemy' && L.enemyPanels[ref.idx]) this.drawEnemyPanel(ctx, L.enemyPanels[ref.idx], L);
        else if (ref.side === 'hero' && L.heroPanels[ref.idx]) this.drawHeroPanel(ctx, L.heroPanels[ref.idx], L);
      }
    }

    // barra inferior
    ctx.fillStyle = 'rgba(10,7,18,0.9)';
    ctx.fillRect(0, L.barY, w, L.barH);
    ctx.strokeStyle = '#38323f';
    ctx.beginPath(); ctx.moveTo(0, L.barY + 0.5); ctx.lineTo(w, L.barY + 0.5); ctx.stroke();
    var busy = this.resolving || !!this.travel;
    L.btnReroll.label = RA.UI('reroll') + ' x' + c.rollsLeft;
    L.btnReroll.disabled = busy || c.rollsLeft <= 0 || c.tflags.diceUsed > 0 || c.phase !== 'player';
    W2.btn(ctx, L.btnReroll, this.time);
    L.btnDone.disabled = busy || c.phase !== 'player' || !!this.evQueue.length;
    L.btnDone.glow = this.assignments.length > 0;
    W2.btn(ctx, L.btnDone, this.time);
    RA.gfx.Dice.drawFate(ctx, L.fate.x, L.fate.y, L.fate.s, this.time, this.fateSpin > 0, c.fate ? c.fate.n : '');

    F.draw(ctx, RA.UI('turn') + ' ' + c.turn, 5, 3, { size: 1, color: '#8a94a8', shadow: true });
    F.draw(ctx, this.run.gold + '$', w - 5 - F.measure(this.run.gold + '$', 1, 1), 3, { size: 1, color: '#ffd76a', shadow: true });
    if (this.logLine) F.draw(ctx, this.logLine.slice(0, Math.floor(w / 6) - 14), w / 2, 3, { size: 1, color: '#c8c2d4', align: 'center', shadow: true });
    var ruleTxt = null;
    if (c.blackRule) {
      RA.game.FXHooks.BlackRules.forEach(function (b) { if (b.id === c.blackRule) ruleTxt = RA.T(b); });
      ruleTxt = ruleTxt || c.blackRule;
    } else if (c.chaosRule) ruleTxt = RA.T(c.chaosRule);
    if (ruleTxt) F.draw(ctx, ruleTxt.slice(0, Math.floor(w / 6)), w / 2, 12, { size: 1, color: '#c8b8e8', align: 'center', shadow: true });

    // ---- DADOS (sempre por cima) ----
    var p = RA.ui.input.pointer;
    for (var i = 0; i < c.dice.length; i++) {
      var d = c.dice[i];
      var hu2 = c.heroes[d.heroIdx];
      if (!hu2) continue;
      var ai2 = this.assignIdxAt(i);
      var stepping = this.travel && this.travel.dieIdx === i; // voando (desenhado no travel)
      if (stepping) continue;
      // dados atribuídos ficam NO SLOT do herói até a hora de agir
      var inSlot = d.used || d.sacrificed || d.locked || d.blocked;
      var dragging = p.dragging && p.dragging.die === i;
      var dieS = L.dieS;
      var dx, dy;
      if (dragging) { dx = p.x - dieS / 2; dy = p.y - dieS / 2; }
      else if (inSlot) { var sl2 = L.slots[d.id]; if (!sl2) continue; dx = sl2.x + 1; dy = sl2.y; dieS = sl2.s - 2; }
      else {
        // o motor já re-rolou os dados do próximo turno, mas o evento de
        // rolagem ainda não tocou na cena: não desenha até a hora certa
        if (d.anim.phase === 'rolling' && this.rollT <= 0) continue;
        var sc = this.scatter[d.id];
        if (!sc) { this.scatterDice(L); sc = this.scatter[d.id]; }
        if (!sc) continue;
        dx = sc.x; dy = sc.y;
        // durante o arremesso: voa do alto até o ponto de pouso
        if (d.anim.phase === 'rolling' && this.rollT > 0 && this.throwFrom && this.throwFrom[d.id]) {
          var tf = this.throwFrom[d.id];
          var kk = easeOut(Math.min(1, d.anim.t / (d.anim.dur || 0.8)));
          dx = tf.x + (sc.x - tf.x) * kk;
          dy = tf.y + (sc.y - tf.y) * kk;
        }
      }
      var face = c.faceOf(d);
      var shown = face;
      if (d.fake >= 0 && !d.used) shown = hu2.faces[d.fake];
      var vd = {
        skin: hu2.skin, anim: d.anim,
        resultFace: Object.assign({}, shown, { val: shown === face ? c.dieValue(d) : shown.val }),
        faces: hu2.faces, used: d.used || d.sacrificed || d.blocked,
        locked: d.locked && !d.assignedView, highlight: dragging || ai2 >= 0 || stepping
      };
      RA.gfx.Dice.draw(ctx, vd, dx, dy, dieS, this.time);
      if (d.blocked) ctx.drawImage(RA.gfx.Icons.status('silence'), dx + dieS - 6, dy - 2, 8, 8);
      if (ai2 < 0 && !inSlot && !dragging) ctx.drawImage(RA.gfx.Portraits.get(hu2.id), dx - 3, dy + dieS - 3, 10, 10);
    }

    // ---- dado em voo: trilha de setas + dado por cima de tudo ----
    if (this.travel) {
      var tv = this.travel;
      var col = tv.side === 'hero' ? 'rgba(255,215,106,' : 'rgba(255,106,122,';
      if (!tv.selfHop && tv.phase === 'go') {
        // linha pontilhada + setas correndo em direção ao alvo
        var dxl = tv.to.x - tv.from.x, dyl = tv.to.y - tv.from.y;
        var len = Math.hypot(dxl, dyl) || 1;
        var ux = dxl / len, uy = dyl / len;
        for (var ci = 0; ci < 5; ci++) {
          var ct = ((ci / 5) + (this.time * 1.4) % 0.2) % 1;
          if (ct > easeOut(tv.t)) continue;
          var cx2 = tv.from.x + dxl * ct + 10, cy2 = tv.from.y + dyl * ct + 10;
          ctx.strokeStyle = col + (0.55 - ct * 0.3) + ')';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx2 - (ux + uy * 0.6) * 4, cy2 - (uy - ux * 0.6) * 4);
          ctx.lineTo(cx2, cy2);
          ctx.lineTo(cx2 - (ux - uy * 0.6) * 4, cy2 - (uy + ux * 0.6) * 4);
          ctx.stroke();
        }
        ctx.lineWidth = 1;
      }
      var tp = this.travelPos(tv);
      // rastro
      if (tv.phase !== 'announce') {
        tv.trail = tv.trail || [];
        tv.trail.push({ x: tp.x + tp.s / 2, y: tp.y + tp.s / 2, t: this.time });
        if (tv.trail.length > 10) tv.trail.shift();
        for (var ti2 = 0; ti2 < tv.trail.length; ti2++) {
          var tr = tv.trail[ti2];
          ctx.fillStyle = col + (0.08 + 0.03 * ti2) + ')';
          var rs = 2 + ti2 * 0.5;
          ctx.fillRect(tr.x - rs / 2, tr.y - rs / 2, rs, rs);
        }
      }
      RA.gfx.Dice.draw(ctx, tv.vd, tp.x, tp.y, tp.s, this.time);
      // rótulo de anúncio: QUEM está agindo e O QUE vai fazer
      if (tv.label && (tv.phase === 'announce' || tv.phase === 'go')) {
        var lbl = tv.label.slice(0, Math.floor((w - 20) / 6));
        var lw = F.measure(lbl, 1, 1) + 16;
        var lx = Math.max(4, Math.min(tp.x + tp.s / 2 - lw / 2, w - lw - 4));
        var ly = Math.max(16, tp.y - 22);
        var la = tv.phase === 'announce' ? Math.min(1, tv.announceT * 5) : 1;
        ctx.globalAlpha = la;
        W2.panel(ctx, lx, ly, lw, 14, { edge: tv.side === 'hero' ? '#ffd76a' : '#ff6a7a' });
        F.draw(ctx, lbl, lx + lw / 2, ly + 4, { size: 1, color: tv.side === 'hero' ? '#ffe9a0' : '#ff9aaa', align: 'center' });
        ctx.globalAlpha = 1;
      }
    }

    // cartão de informação: o que a face tocada faz
    if (this.infoCard) {
      this.infoCard.t -= 1 / 60;
      if (this.infoCard.t <= 0) this.infoCard = null;
      else {
        var icDie = c.dice[this.infoCard.die];
        var icF = icDie ? c.faceOf(icDie) : null;
        if (icF) {
          var icLines = W2.descFace(icF).slice(0, 3);
          var icTitle = RA.T(icF.name) + '  [' + c.dieValue(icDie) + ']';
          var icW = Math.min(w - 12, Math.max(F.measure(icTitle, 1, 1), 120) + 20);
          icLines.forEach(function (l2) { icW = Math.min(w - 12, Math.max(icW, F.measure(l2, 1, 1) + 20)); });
          var icH = 18 + icLines.length * 9;
          var icX = (w - icW) / 2, icY = 18;
          var icA = Math.min(1, this.infoCard.t * 3);
          ctx.globalAlpha = icA;
          var icHu = c.heroes[icDie.heroIdx];
          W2.panel(ctx, icX, icY, icW, icH, { edge: icHu ? RA.gfx.Dice.skin(icHu.skin).rim : '#8a6e2e' });
          if (icHu) ctx.drawImage(RA.gfx.Portraits.get(icHu.id), icX + 4, icY + 3, 12, 12);
          F.draw(ctx, icTitle, icX + 20, icY + 4, { size: 1, color: '#ffe9a0' });
          icLines.forEach(function (l2, li2) {
            F.draw(ctx, l2, icX + 8, icY + 15 + li2 * 9, { size: 1, color: '#c8c2d4' });
          });
          ctx.globalAlpha = 1;
        }
      }
    }

    Fx.render(ctx);
    ctx.restore();

    // banner central (grande p/ turnos/combos)
    if (this.banner) {
      var dur = this.banner.big ? 1.6 : 2.2;
      var a = Math.min(1, this.bannerT * 6, (dur - this.bannerT) * 2.5);
      ctx.globalAlpha = Math.max(0, a);
      var bsz = this.banner.big && w > 260 ? 2 : 1;
      var btxt = this.banner.txt.slice(0, Math.floor((w - 30) / (6 * bsz)));
      var bw4 = F.measure(btxt, bsz, 1) + 24;
      var bh4 = 10 + bsz * 8;
      var pop = this.banner.big ? 1 + Math.max(0, 0.15 - this.bannerT) * 3 : 1;
      W2.panel(ctx, (w - bw4 * pop) / 2, h * 0.3, bw4 * pop, bh4, { edge: this.banner.color });
      F.draw(ctx, btxt, w / 2, h * 0.3 + (bh4 - 7 * bsz) / 2, { size: bsz, color: this.banner.color, align: 'center', shadow: true });
      ctx.globalAlpha = 1;
    }
    if (c.pendingChoice && this.choiceRects) {
      ctx.fillStyle = 'rgba(6,4,10,0.7)';
      ctx.fillRect(0, 0, w, h);
      F.draw(ctx, RA.UI('chooseFate'), w / 2, h / 2 - 50, { size: 1, color: '#ffe9a0', align: 'center' });
      this.choiceRects.forEach(function (r) {
        W2.panel(ctx, r.x, r.y, r.w, r.h, { edge: '#8a6e2e' });
        F.draw(ctx, RA.T(r.opt), r.x + r.w / 2, r.y + 4, { size: 1, color: '#ffe9a0', align: 'center' });
        if (r.opt.desc) F.draw(ctx, RA.T(r.opt.desc).slice(0, Math.floor(r.w / 6) - 1), r.x + r.w / 2, r.y + 16, { size: 1, color: '#c8c2d4', align: 'center' });
      });
    }
    if (this.confirmBox) {
      ctx.fillStyle = 'rgba(6,4,10,0.6)';
      ctx.fillRect(0, 0, w, h);
      F.draw(ctx, RA.UI('confirmTurn'), w / 2, h / 2 - 16, { size: 1, color: '#e8e0d0', align: 'center' });
      W2.btn(ctx, this.confirmBox.yes, this.time);
      W2.btn(ctx, this.confirmBox.no, this.time);
    }
    if (this.hoverTip) W2.tooltip(ctx, w, h, this.hoverTip.x, this.hoverTip.y, this.hoverTip.title, this.hoverTip.lines);
    W2.renderToasts(ctx, w);
  };

  BattleScene.prototype.exit = function () { RA.gfx.Fx.clear(); };

  RA.ui.BattleScene = BattleScene;
})();
