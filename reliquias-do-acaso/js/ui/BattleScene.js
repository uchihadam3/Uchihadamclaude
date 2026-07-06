// BattleScene: mesa de dados. Intenções no topo, heróis embaixo, bandeja de
// dados, Dado do Destino, arrastar-para-alvo com highlight, tap para travar,
// segurar para tooltip, playback animado dos eventos do Combat.
(function () {
  var F = RA.gfx.Font, W2 = null;

  function BattleScene(params) {
    this.run = params.run;
    this.room = params.room;
    this.onDone = params.onDone; // callback(reward|{lost:true})
  }

  BattleScene.prototype.enter = function () {
    W2 = RA.ui.W;
    this.combat = this.run.startBattle(this.room);
    this.time = 0;
    this.evQueue = [];
    this.evDelay = 0;
    this.banner = null; this.bannerT = 0;
    this.hoverTip = null;
    this.dragTarget = null;
    this.confirmBox = null;
    this.finishing = false;
    this.rollT = 0;
    this.logLine = '';
    this.region = this.run.region().id;
    // música por tipo de luta
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
    this.drainEvents(true);
    if (this.combat.chaosRule) this.showBanner(RA.T(this.combat.chaosRule), '#e8a04a');
  };

  BattleScene.prototype.showBanner = function (txt, color) {
    this.banner = { txt: txt, color: color || '#ffe9a0' };
    this.bannerT = 0;
  };

  // ---------- layout ----------
  BattleScene.prototype.layout = function (w, h) {
    var s = RA.core.Save.get().settings;
    var L = { w: w, h: h };
    L.dieS = Math.max(22, Math.min(30, Math.floor(w / 14)));
    var nd = this.combat.dice.length;
    var trayW = nd * (L.dieS + 10);
    L.trayY = h - L.dieS - 16;
    L.trayX = Math.floor((w - trayW) / 2) + 5;
    L.heroY = L.trayY - 50;
    L.enemyY = Math.max(28, Math.floor(h * 0.16));
    // botões
    var bw = 62, bh = 18;
    var right = !s.leftHanded;
    L.btnReroll = { x: right ? w - bw - 8 : 8, y: L.trayY - 24, w: bw, h: bh, label: '' };
    L.btnDone = { x: right ? w - bw - 8 : 8, y: L.trayY + 2, w: bw, h: bh, label: RA.UI('done'), glow: true };
    L.fate = { x: right ? 8 : w - 40, y: h - 44, s: 30 };
    // posições dos inimigos
    var enemies = this.combat.enemies.filter(function (e) { return !e.dead && !e.fled; });
    L.enemyPos = {};
    var self = this;
    var fronts = enemies.filter(function (e) { return e.row !== 'back'; });
    var backs = enemies.filter(function (e) { return e.row === 'back'; });
    function place(list, y, size) {
      var gap = Math.min(74, (w - 40) / Math.max(1, list.length));
      var x0 = w / 2 - gap * (list.length - 1) / 2;
      list.forEach(function (e, i) {
        var sz = e.tier === 'chefe' || e.tier === 'secreto' ? Math.round(size * 1.6) : (e.tier === 'elite' ? Math.round(size * 1.25) : size);
        L.enemyPos[e.slot] = { x: x0 + i * gap - sz / 2, y: y, s: sz, unit: e };
      });
    }
    var esz = Math.max(30, Math.min(40, Math.floor(w / 11)));
    place(backs, L.enemyY, esz - 6);
    place(fronts, L.enemyY + (backs.length ? 34 : 14), esz);
    // heróis — deslocados da coluna de botões
    L.heroPos = {};
    var hs = this.combat.heroes;
    var btnSide = s.leftHanded ? -1 : 1;
    var heroCx = w / 2 - btnSide * 36;
    var hgap = Math.min(56, (w - 86) / Math.max(1, hs.length));
    var hx0 = heroCx - hgap * (hs.length - 1) / 2;
    hs.forEach(function (hu, i) {
      L.heroPos[hu.slot] = { x: hx0 + i * hgap - 14, y: L.heroY + (hu.row === 'back' ? 6 : -6), s: 28, unit: hu };
    });
    // invocações
    L.summonPos = {};
    this.combat.summons.forEach(function (su, i) {
      if (su.dead) return;
      L.summonPos[i] = { x: 10 + i * 26, y: L.heroY - 24, s: 20, unit: su };
    });
    return L;
  };

  // ---------- playback de eventos ----------
  var SLOW = { enemyAct: 0.5, enemySkip: 0.35, turnStart: 0.4, battleEnd: 0.6, kill: 0.3, summonEnemy: 0.35, fate: 0.5, blackRule: 0.7, combo: 0.5, bossPhase: 0.6, down: 0.5 };
  BattleScene.prototype.drainEvents = function (instantVisuals) {
    var evs = this.combat.events;
    this.combat.events = [];
    for (var i = 0; i < evs.length; i++) this.evQueue.push(evs[i]);
  };

  BattleScene.prototype.playEvent = function (e, L) {
    var Fx = RA.gfx.Fx, sfx = RA.audio.sfx;
    var pos = null;
    if (e.side === 'enemy' && L.enemyPos[e.idx]) pos = L.enemyPos[e.idx];
    else if (e.side === 'hero' && L.heroPos[e.idx]) pos = L.heroPos[e.idx];
    var px = pos ? pos.x + pos.s / 2 : L.w / 2, py = pos ? pos.y + pos.s / 2 : L.h / 2;
    switch (e.t) {
      case 'dmg':
        if (e.n > 0) {
          Fx.floater(px, py - 6, '-' + e.n, e.side === 'hero' ? '#ff6a7a' : '#ffe9a0', e.n >= 6 ? 2 : 1);
          Fx.burst(px, py, e.tag === 'poison' ? 'poison' : e.tag === 'burn' ? 'fire' : e.tag === 'magic' ? 'bolt' : e.tag === 'curse' ? 'curse' : 'hit', e.n >= 5 ? 14 : 8);
          Fx.shake(e.n >= 6 ? 3 : 1.2);
          sfx(e.tag === 'poison' ? 'poison' : e.tag === 'burn' ? 'fire' : e.tag === 'magic' ? 'bolt' : e.tag === 'curse' ? 'curse' : (e.n >= 6 ? 'crit' : 'hit'));
        } else Fx.floater(px, py - 6, RA.T({ pt: 'BLOQ', en: 'BLOCK' }), '#8a94a8');
        break;
      case 'heal': Fx.floater(px, py - 6, '+' + e.n, '#6ee89a'); Fx.burst(px, py, 'heal', 7); sfx('heal'); break;
      case 'shield': Fx.floater(px, py - 8, '+' + e.n + '⛨', '#a8c4e8'); Fx.burst(px, py, 'shield', 6); sfx('shield'); break;
      case 'shieldHit': sfx('block'); break;
      case 'status': {
        var sd = RA.data.Statuses[e.s];
        Fx.floater(px, py - 10, (sd ? RA.T(sd) : e.s) + (e.n > 1 ? ' ' + e.n : ''), sd ? sd.color : '#fff');
        break;
      }
      case 'miss': Fx.floater(px, py - 6, RA.T({ pt: 'ERROU', en: 'MISS' }), '#8a8a94'); break;
      case 'kill': Fx.burst(px, py, 'death', 16); Fx.shake(2); sfx('enemyDie'); break;
      case 'down': Fx.floater(px, py - 8, RA.T(this.combat.heroes[e.idx].name) + ' ' + RA.UI('heroDown'), '#ff6a7a'); Fx.shake(3); sfx('heroDown'); break;
      case 'permaDeath': Fx.floater(px, py - 8, RA.UI('permaDeath'), '#8a4ae8', 2); sfx('curse'); break;
      case 'revive': Fx.floater(px, py - 8, RA.UI('revived'), '#ffe9a0', 2); Fx.burst(px, py, 'summon', 12); sfx('revive'); break;
      case 'combo': {
        var cdef = e.name;
        this.showBanner(RA.UI('combo') + ' ' + RA.T(cdef), '#ffd76a');
        Fx.shake(1.5); sfx('combo');
        break;
      }
      case 'fate': this.fateSpin = 0.8; this.showBanner(RA.UI('fateDie') + ': ' + RA.T(e.fate), '#ffd76a'); sfx('fate'); break;
      case 'blackRule': this.showBanner(RA.UI('newRule') + ' ' + (e.name ? RA.T(e.name) : ''), '#8a4ae8'); Fx.shake(2); sfx('bossPhase'); break;
      case 'bossPhase': Fx.shake(4); sfx('bossPhase'); break;
      case 'roll': {
        var self2 = this;
        this.combat.dice.forEach(function (d) {
          if (e.ids.indexOf(d.id) >= 0) d.anim = { phase: 'rolling', t: 0, showFace: 0 };
        });
        this.rollT = 0.55;
        sfx('diceRoll');
        break;
      }
      case 'lock': sfx('diceLock'); break;
      case 'useDie': sfx(e.face && e.face.sym === 'sword' ? 'sword' : 'diceHit'); break;
      case 'gold': if (e.n > 0) { Fx.floater(L.w / 2, L.h / 2 - 20, '+' + e.n + '$', '#ffd76a'); sfx('gold'); } break;
      case 'goldSteal': Fx.floater(px, py - 8, '-' + e.n + '$', '#ff6a7a'); sfx('gold'); break;
      case 'summonAlly': case 'summonEnemy': Fx.burst(px, py, 'summon', 10); sfx('summon'); break;
      case 'log': this.logLine = e.msg; break;
      case 'crack': sfx('crack'); if (pos) Fx.floater(px, py - 8, RA.UI('crackedSide'), '#e8a04a'); break;
      case 'deny': if (e.reason && typeof e.reason === 'string') this.logLine = e.reason; break;
      case 'choice': this.choiceBox = e; break;
      case 'enemyAct': this.actingEnemy = { idx: e.idx, t: 0.4 }; break;
      case 'battleEnd': this.battleOver = true; break;
    }
  };

  // ---------- update ----------
  BattleScene.prototype.update = function (dt, events) {
    this.time += dt;
    var anim = RA.core.Save.get().settings.animSpeed || 1;
    dt *= 1;
    var c = this.combat;
    var disp = RA.ui.disp;
    var L = this.layout(disp.w, disp.h);
    this.L = L;
    if (this.bannerT !== null) this.bannerT += dt;
    if (this.bannerT > 2.2) this.banner = null;
    if (this.fateSpin > 0) this.fateSpin -= dt;
    if (this.rollT > 0) {
      this.rollT -= dt * anim;
      var self = this;
      c.dice.forEach(function (d) {
        if (d.anim.phase === 'rolling') {
          d.anim.t += dt;
          d.anim.showFace = Math.floor(self.time * 14) % 6;
          if (self.rollT <= 0) { d.anim = { phase: 'landing', t: 0 }; RA.audio.sfx('diceHit'); }
        }
      });
    }
    c.dice.forEach(function (d) { if (d.anim.phase === 'landing') { d.anim.t += dt; if (d.anim.t > 0.4) d.anim = { phase: 'idle', t: 0 }; } });
    if (this.actingEnemy) { this.actingEnemy.t -= dt; if (this.actingEnemy.t <= 0) this.actingEnemy = null; }

    // playback pausado da fila
    this.evDelay -= dt * anim;
    var guard = 0;
    while (this.evQueue.length && this.evDelay <= 0 && guard++ < 30) {
      var e = this.evQueue.shift();
      this.playEvent(e, L);
      this.evDelay = (SLOW[e.t] || 0.06) / anim;
    }
    this.drainEvents();

    W2.updateToasts(dt);

    // fim de batalha: espera fila esvaziar
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

    // -------- input --------
    var self4 = this;
    var input = RA.ui.input;
    this.hoverTip = null;

    // escolha pendente (destino etc.)
    if (c.pendingChoice) {
      var pc = c.pendingChoice;
      var bw2 = Math.min(150, L.w - 30), bx = (L.w - bw2) / 2;
      this.choiceRects = pc.options.map(function (o, i) {
        return { x: bx, y: L.h / 2 - 30 + i * 34, w: bw2, h: 28, opt: o, i: i };
      });
      events.taps.forEach(function (tp) {
        self4.choiceRects.forEach(function (r) {
          if (W2.inRect(tp.x, tp.y, r)) { c.choose(r.i); RA.audio.sfx('confirm'); self4.drainEvents(); }
        });
      });
      return;
    }
    // confirmação de fim de turno
    if (this.confirmBox) {
      events.taps.forEach(function (tp) {
        if (W2.inRect(tp.x, tp.y, self4.confirmBox.yes)) { self4.confirmBox = null; self4.doEndTurn(); }
        else if (W2.inRect(tp.x, tp.y, self4.confirmBox.no)) self4.confirmBox = null;
      });
      return;
    }
    if (c.over || c.phase !== 'player' || this.evQueue.length > 4) return;

    // taps
    events.taps.forEach(function (tp) {
      // dados: tap = travar
      for (var i = 0; i < c.dice.length; i++) {
        var r = self4.dieRect(i, L);
        if (r && W2.inRect(tp.x, tp.y, r)) {
          var d = c.dice[i];
          if (!d.used && !d.blocked) c.toggleLock(i);
          self4.drainEvents();
          return;
        }
      }
      if (W2.inRect(tp.x, tp.y, L.btnReroll) && c.rollsLeft > 0 && c.tflags.diceUsed === 0) { c.reroll(); self4.drainEvents(); return; }
      if (W2.inRect(tp.x, tp.y, L.btnDone)) {
        if (RA.core.Save.get().settings.confirmEndTurn) {
          var bw3 = 60;
          self4.confirmBox = {
            yes: { x: L.w / 2 - bw3 - 6, y: L.h / 2 + 6, w: bw3, h: 20, label: RA.UI('yes') },
            no: { x: L.w / 2 + 6, y: L.h / 2 + 6, w: bw3, h: 20, label: RA.UI('no') }
          };
        } else self4.doEndTurn();
        return;
      }
    });

    // drag: começa ao mover com o dedo num dado
    var p = input.pointer;
    if (p.down && !p.dragging && input.dragDistance() > 7) {
      for (var i2 = 0; i2 < c.dice.length; i2++) {
        var r2 = this.dieRect(i2, L);
        if (r2 && W2.inRect(p.startX, p.startY, r2)) {
          var d2 = c.dice[i2];
          if (!d2.used && !d2.blocked) input.startDrag({ die: i2 });
          break;
        }
      }
    }
    // alvo do drag (highlight)
    this.dragTarget = null;
    if (p.dragging && p.dragging.die !== undefined) {
      this.dragTarget = this.hitUnit(p.x, p.y, L);
    }
    // soltar
    events.releases.forEach(function (rel) {
      if (rel.drag && rel.drag.die !== undefined) {
        var tgt = self4.hitUnit(rel.x, rel.y, L);
        var res = c.useDie(rel.drag.die, tgt);
        if (!res.ok && res.reason && typeof res.reason === 'string') self4.logLine = res.reason;
        self4.drainEvents();
      }
    });
    // hold = tooltip
    events.holds.forEach(function (hd) {
      self4.hoverTip = self4.tipAt(hd.x, hd.y, L);
    });
    // tooltip contínua com mouse pressionado sobre dado
    if (p.down && !p.dragging) {
      var tip = this.tipAt(p.x, p.y, L);
      if (tip && performance.now() - p.downAt > 420) this.hoverTip = tip;
    }
  };

  BattleScene.prototype.doEndTurn = function () {
    this.combat.endTurn();
    this.drainEvents();
    RA.audio.sfx('confirm');
  };

  BattleScene.prototype.dieRect = function (i, L) {
    var d = this.combat.dice[i];
    if (!d) return null;
    return { x: L.trayX + i * (L.dieS + 10), y: L.trayY, w: L.dieS + 6, h: L.dieS + 8 };
  };

  BattleScene.prototype.hitUnit = function (x, y, L) {
    for (var k in L.enemyPos) {
      var ep = L.enemyPos[k];
      if (x >= ep.x - 6 && x < ep.x + ep.s + 6 && y >= ep.y - 10 && y < ep.y + ep.s + 12) return { side: 'enemy', idx: ep.unit.slot };
    }
    for (var k2 in L.heroPos) {
      var hp = L.heroPos[k2];
      if (x >= hp.x - 6 && x < hp.x + hp.s + 6 && y >= hp.y - 8 && y < hp.y + hp.s + 16) return { side: 'hero', idx: hp.unit.slot };
    }
    for (var k3 in L.summonPos) {
      var sp = L.summonPos[k3];
      if (x >= sp.x - 4 && x < sp.x + sp.s + 4 && y >= sp.y - 4 && y < sp.y + sp.s + 4) return { side: 'hero', idx: parseInt(k3, 10), summon: true };
    }
    return null;
  };

  BattleScene.prototype.tipAt = function (x, y, L) {
    var c = this.combat;
    // dado
    for (var i = 0; i < c.dice.length; i++) {
      var r = this.dieRect(i, L);
      if (r && W2.inRect(x, y, r)) {
        var f = c.faceOf(c.dice[i]);
        if (!f) return null;
        return { x: x, y: r.y, title: RA.T(f.name) + ' [' + c.dieValue(c.dice[i]) + ']', lines: W2.descFace(f) };
      }
    }
    // Dado do Destino
    if (x >= L.fate.x && x < L.fate.x + L.fate.s + 4 && y >= L.fate.y && y < L.fate.y + L.fate.s + 4 && c.fate) {
      return { x: x, y: L.fate.y, title: RA.UI('fateDie') + ': ' + RA.T(c.fate), lines: [RA.T(c.fate.desc)] };
    }
    // unidade
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
      return { x: x, y: (u.side === 'enemy' ? L.enemyPos[u.idx].y + 20 : L.heroPos[u.idx].y), title: RA.T(unit.name), lines: lines };
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

  // ---------- render ----------
  BattleScene.prototype.render = function (ctx, w, h) {
    var c = this.combat, L = this.L || this.layout(w, h);
    var Fx = RA.gfx.Fx;
    ctx.save();
    var off = Fx.offset();
    ctx.translate(off.x, off.y);

    RA.gfx.Backgrounds.draw(ctx, this.region, w, h, this.time);
    // sombreado da mesa
    ctx.fillStyle = 'rgba(8,6,14,0.35)';
    ctx.fillRect(0, L.heroY - 16, w, h - L.heroY + 16);

    // ---- inimigos ----
    var self = this;
    Object.keys(L.enemyPos).forEach(function (k) {
      var ep = L.enemyPos[k], e = ep.unit;
      var frame = Math.floor(self.time * 2 + e.slot) % 2;
      var spr = RA.gfx.EnemySprites.get(e.def.arch, e.def.region || self.region, ep.s, e.def.decor, frame);
      var bob = Math.sin(self.time * 2 + e.slot * 2) * 1.5;
      var ax = 0;
      if (self.actingEnemy && self.actingEnemy.idx === e.slot) ax = Math.sin(self.actingEnemy.t * 20) * 3;
      if (e.hidden) ctx.globalAlpha = 0.45;
      ctx.drawImage(spr, Math.round(ep.x + ax), Math.round(ep.y + bob));
      ctx.globalAlpha = 1;
      // barra de vida
      var hideHp = e.bflags && e.bflags.hideHp;
      if (!hideHp) W2.hpBar(ctx, ep.x, ep.y + ep.s + 4, ep.s, e.hp, e.maxHp, e.shield);
      else F.draw(ctx, '???', ep.x + ep.s / 2, ep.y + ep.s + 2, { size: 1, color: '#8a4ae8', align: 'center' });
      if (e.shield > 0) F.draw(ctx, '⛨' + e.shield, ep.x + ep.s + 1, ep.y + ep.s - 4, { size: 1, color: '#a8c4e8' });
      // intenção
      if (e.intent) {
        var it = e.intent;
        var icon = it.k === 'atk' ? 'sword' : it.k === 'shield' ? 'shield' : it.k === 'heal' ? 'heart' : it.k === 'summon' ? 'star' : it.k === 'st' ? 'skull' : 'eye';
        var isp = RA.gfx.Icons.symbol(icon);
        ctx.drawImage(isp, ep.x + ep.s / 2 - 9, ep.y - 13, 10, 10);
        if (it.n) F.draw(ctx, String(it.n), ep.x + ep.s / 2 + 3, ep.y - 12, { size: 1, color: '#ffe9a0', shadow: true });
      }
      // statuses
      var sx = ep.x;
      for (var s in e.statuses) {
        var ic = RA.gfx.Icons.status(s);
        ctx.drawImage(ic, sx, ep.y + ep.s + 9, 8, 8);
        sx += 9;
      }
      // highlight de alvo do drag
      if (self.dragTarget && self.dragTarget.side === 'enemy' && self.dragTarget.idx === e.slot) {
        var pu = 0.5 + 0.5 * Math.sin(self.time * 8);
        ctx.strokeStyle = 'rgba(255,215,106,' + pu + ')';
        ctx.lineWidth = 2;
        ctx.strokeRect(ep.x - 4.5, ep.y - 4.5, ep.s + 9, ep.s + 9);
      }
    });

    // ---- invocações ----
    Object.keys(L.summonPos).forEach(function (k) {
      var sp = L.summonPos[k], su = sp.unit;
      var spr = RA.gfx.EnemySprites.get(su.def.sprite || 'construto', self.region, sp.s, null, 0);
      ctx.globalAlpha = 0.9;
      ctx.drawImage(spr, sp.x, sp.y);
      ctx.globalAlpha = 1;
      W2.hpBar(ctx, sp.x, sp.y + sp.s + 2, sp.s, su.hp, su.maxHp, 0, '#8a4ae8');
    });

    // ---- heróis ----
    Object.keys(L.heroPos).forEach(function (k) {
      var hp = L.heroPos[k], hu = hp.unit;
      var por = RA.gfx.Portraits.get(hu.id);
      if (hu.dead) ctx.globalAlpha = 0.25;
      else if (hu.downed) ctx.globalAlpha = 0.55;
      // moldura
      ctx.fillStyle = hu.row === 'front' ? '#3a3448' : '#241f30';
      ctx.fillRect(hp.x - 2, hp.y - 2, hp.s + 4, hp.s + 4);
      ctx.drawImage(por, hp.x, hp.y, hp.s, hp.s);
      if (hu.downed) {
        F.draw(ctx, String(hu.downTimer), hp.x + hp.s / 2, hp.y + hp.s / 2 - 4, { size: 2, color: '#ff6a7a', align: 'center', shadow: true });
      }
      ctx.globalAlpha = 1;
      if (!hu.dead) {
        W2.hpBar(ctx, hp.x, hp.y + hp.s + 4, hp.s, hu.hp, hu.maxHp, hu.shield);
        F.draw(ctx, hu.hp + '', hp.x + hp.s / 2, hp.y + hp.s + 9, { size: 1, color: '#c8c2d4', align: 'center' });
        if (hu.shield > 0) F.draw(ctx, '⛨' + hu.shield, hp.x + hp.s - 4, hp.y - 7, { size: 1, color: '#a8c4e8', shadow: true });
        var sx2 = hp.x;
        for (var s2 in hu.statuses) {
          ctx.drawImage(RA.gfx.Icons.status(s2), sx2, hp.y - 10, 8, 8);
          sx2 += 9;
        }
      }
      if (self.dragTarget && self.dragTarget.side === 'hero' && !self.dragTarget.summon && self.dragTarget.idx === hu.slot) {
        var pu2 = 0.5 + 0.5 * Math.sin(self.time * 8);
        ctx.strokeStyle = 'rgba(110,232,154,' + pu2 + ')';
        ctx.lineWidth = 2;
        ctx.strokeRect(hp.x - 4.5, hp.y - 4.5, hp.s + 9, hp.s + 9);
      }
    });

    // ---- bandeja de dados ----
    ctx.fillStyle = 'rgba(12,9,20,0.7)';
    ctx.fillRect(0, L.trayY - 2, w, h - L.trayY + 2);
    ctx.strokeStyle = '#38323f';
    ctx.beginPath(); ctx.moveTo(0, L.trayY - 2.5); ctx.lineTo(w, L.trayY - 2.5); ctx.stroke();
    var p = RA.ui.input.pointer;
    for (var i = 0; i < c.dice.length; i++) {
      var d = c.dice[i];
      var hu2 = c.heroes[d.heroIdx];
      if (!hu2) continue;
      var r = this.dieRect(i, L);
      var dragging = p.dragging && p.dragging.die === i;
      var dx = dragging ? p.x - L.dieS / 2 : r.x;
      var dy = dragging ? p.y - L.dieS / 2 : r.y;
      var face = c.faceOf(d);
      var shown = face;
      if (d.fake >= 0 && !d.used) shown = hu2.faces[d.fake];
      var vd = {
        skin: hu2.skin, anim: d.anim, resultFace: Object.assign({}, shown, { val: shown === face ? c.dieValue(d) : shown.val }),
        faces: hu2.faces, used: d.used || d.sacrificed || d.blocked, locked: d.locked, highlight: dragging
      };
      RA.gfx.Dice.draw(ctx, vd, dx, dy, L.dieS, this.time);
      if (d.blocked) ctx.drawImage(RA.gfx.Icons.status('silence'), r.x + L.dieS - 6, r.y - 2, 8, 8);
      // retratinho do dono
      if (!dragging) ctx.drawImage(RA.gfx.Portraits.get(hu2.id), r.x - 2, r.y + L.dieS - 2, 10, 10);
    }

    // ---- HUD ----
    // turno + log
    F.draw(ctx, RA.UI('turn') + ' ' + c.turn, 6, 4, { size: 1, color: '#8a94a8' });
    if (this.logLine) F.draw(ctx, this.logLine.slice(0, 60), w / 2, 4, { size: 1, color: '#c8c2d4', align: 'center' });
    // ouro
    F.draw(ctx, this.run.gold + '$', w - 6 - F.measure(this.run.gold + '$', 1, 1), 4, { size: 1, color: '#ffd76a' });
    // botões
    L.btnReroll.label = RA.UI('reroll') + ' x' + c.rollsLeft;
    L.btnReroll.disabled = c.rollsLeft <= 0 || c.tflags.diceUsed > 0 || c.phase !== 'player';
    W2.btn(ctx, L.btnReroll, this.time);
    L.btnDone.disabled = c.phase !== 'player' || !!this.evQueue.length;
    W2.btn(ctx, L.btnDone, this.time);
    // Dado do Destino
    RA.gfx.Dice.drawFate(ctx, L.fate.x, L.fate.y, L.fate.s, this.time, this.fateSpin > 0, c.fate ? c.fate.n : '');

    // regra ativa (caos / dado negro)
    var ruleTxt = null;
    if (c.blackRule) {
      var br = null;
      RA.game.FXHooks.BlackRules.forEach(function (b) { if (b.id === c.blackRule) br = b; });
      ruleTxt = br ? RA.T(br) : c.blackRule;
    } else if (c.chaosRule) ruleTxt = RA.T(c.chaosRule);
    if (ruleTxt) F.draw(ctx, ruleTxt.slice(0, 64), w / 2, 14, { size: 1, color: '#c8b8e8', align: 'center' });

    // fase inimiga
    if (this.evQueue.length && c.phase !== 'player') {
      F.draw(ctx, RA.UI('enemyTurn'), w / 2, L.enemyY - 22, { size: 1, color: '#ff6a7a', align: 'center', shadow: true });
    }

    Fx.render(ctx);
    ctx.restore();

    // banner central
    if (this.banner) {
      var a = Math.min(1, this.bannerT * 6, (2.2 - this.bannerT) * 2.5);
      ctx.globalAlpha = Math.max(0, a);
      var bw4 = F.measure(this.banner.txt, 1, 1) + 30;
      W2.panel(ctx, (w - bw4) / 2, h * 0.32, bw4, 20, { edge: this.banner.color });
      F.draw(ctx, this.banner.txt, w / 2, h * 0.32 + 6, { size: 1, color: this.banner.color, align: 'center' });
      ctx.globalAlpha = 1;
    }
    // escolha pendente
    if (c.pendingChoice && this.choiceRects) {
      ctx.fillStyle = 'rgba(6,4,10,0.7)';
      ctx.fillRect(0, 0, w, h);
      F.draw(ctx, RA.UI('chooseFate'), w / 2, h / 2 - 46, { size: 1, color: '#ffe9a0', align: 'center' });
      var self5 = this;
      this.choiceRects.forEach(function (r) {
        W2.panel(ctx, r.x, r.y, r.w, r.h, { edge: '#8a6e2e' });
        F.draw(ctx, RA.T(r.opt), r.x + r.w / 2, r.y + 4, { size: 1, color: '#ffe9a0', align: 'center' });
        if (r.opt.desc) F.draw(ctx, RA.T(r.opt.desc).slice(0, 40), r.x + r.w / 2, r.y + 15, { size: 1, color: '#c8c2d4', align: 'center' });
      });
    }
    // confirmação
    if (this.confirmBox) {
      ctx.fillStyle = 'rgba(6,4,10,0.6)';
      ctx.fillRect(0, 0, w, h);
      F.draw(ctx, RA.UI('confirmTurn'), w / 2, h / 2 - 16, { size: 1, color: '#e8e0d0', align: 'center' });
      W2.btn(ctx, this.confirmBox.yes, this.time);
      W2.btn(ctx, this.confirmBox.no, this.time);
    }
    // tooltip
    if (this.hoverTip) W2.tooltip(ctx, w, h, this.hoverTip.x, this.hoverTip.y, this.hoverTip.title, this.hoverTip.lines);
    W2.renderToasts(ctx, w);
  };

  BattleScene.prototype.exit = function () { RA.gfx.Fx.clear(); };

  RA.ui.BattleScene = BattleScene;
})();
