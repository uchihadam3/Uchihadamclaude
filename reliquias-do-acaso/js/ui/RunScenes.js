// RunScenes: Mapa (caminho da região), Evento, Loja, Sala Especial,
// Recompensa (faces/relíquias) e Fim de Run (vitória/derrota/finais).
(function () {
  var F = RA.gfx.Font;
  function W() { return RA.ui.W; }
  var Scenes = null;

  var ROOM_ICON = { battle: 'sword', event: 'eye', shop: 'coin', elite: 'skull', special: 'star', boss: 'flame', secretBoss: 'skull', miniboss: 'skull' };

  // ---------------------------------------------------------- MAPA
  function MapScene(params) { this.run = params.run; }
  MapScene.prototype.enter = function () {
    Scenes = RA.core.Scenes;
    this.time = 0;
    var run = this.run;
    if (!run || run.finished) { Scenes.replace(new RA.ui.MainMenuScene()); return; }
    RA.audio.setMusic(run.region().music);
    this.buttons = [];
  };
  MapScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    var self = this, run = this.run;
    if (!run || run.finished) return;
    events.taps.forEach(function (tp) {
      self.buttons.forEach(function (b) {
        if (W().inRect(tp.x, tp.y, b) && !b.disabled) { RA.audio.sfx('click'); b.fn(); }
      });
    });
    events.holds.forEach(function (hd) {
      self.tip = null;
      self.relicRects && self.relicRects.forEach(function (r) {
        if (W().inRect(hd.x, hd.y, r)) self.tip = { x: hd.x, y: r.y, title: RA.T(r.relic.name), lines: [RA.T(r.relic.desc)] };
      });
      self.heroRects && self.heroRects.forEach(function (r) {
        if (W().inRect(hd.x, hd.y, r)) {
          var h = r.hero;
          self.tip = { x: hd.x, y: r.y, title: RA.T(h.def.name), lines: [RA.UI('hp') + ': ' + h.hp + '/' + h.maxHp, RA.UI('deaths') + ': ' + h.falls + '/3', (h.row === 'front' ? RA.UI('frontline') : RA.UI('backline'))] };
        }
      });
    });
    if (!events.holds.length && !RA.ui.input.pointer.down) this.tip = null;
  };
  MapScene.prototype.enterRoom = function () {
    var run = this.run, self = this;
    var room = run.current();
    if (!room) { Scenes.replace(new RunEndScene({ run: run, win: true })); return; }
    var goBattle = function (rm) {
      Scenes.replace(new RA.ui.BattleScene({
        run: run, room: rm,
        onDone: function (reward, won) {
          if (!won) Scenes.replace(new RunEndScene({ run: run, win: false }));
          else Scenes.replace(new RewardScene({ run: run, reward: reward }));
        }
      }));
    };
    if (room.kind === 'battle' || room.kind === 'elite' || room.kind === 'boss' || room.kind === 'secretBoss') goBattle(room);
    else if (room.kind === 'event') Scenes.replace(new EventScene({ run: run }));
    else if (room.kind === 'shop') Scenes.replace(new ShopScene({ run: run }));
    else if (room.kind === 'special') {
      var sp = run.specialRoom();
      if (sp.type === 'miniboss') goBattle({ kind: 'miniboss', enemyIds: [sp.enemyId] });
      else if (sp.type === 'secretBoss') goBattle({ kind: 'secretBoss', enemyIds: [sp.boss] });
      else Scenes.replace(new SpecialScene({ run: run, room: sp }));
    }
  };
  MapScene.prototype.render = function (ctx, w, h) {
    var run = this.run;
    if (!run || run.finished) return;
    var reg = run.region();
    RA.gfx.Backgrounds.draw(ctx, reg.id, w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.45)';
    ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    var self = this;

    W().header(ctx, w, 8, RA.UI('region') + ' ' + (run.regionIdx + 1) + ': ' + RA.T(reg.name), { size: 1, color: '#ffe9a0' });
    F.wrap(RA.T(reg.intro), 1, 1, w - 24).slice(0, 2).forEach(function (l, i) {
      F.draw(ctx, l, w / 2, 24 + i * 9, { size: 1, color: '#8a94a8', align: 'center' });
    });
    if (run.rules.infinite) F.draw(ctx, RA.UI('floors') + ': ' + run.floor, w / 2, 44, { size: 1, color: '#c8b8e8', align: 'center' });

    // caminho de salas: medalhões ligados por trilha pontilhada animada
    var rooms = run.rooms;
    var iy = h * 0.32;
    var gap = Math.min(30, (w - 40) / Math.max(1, rooms.length));
    var x0 = w / 2 - gap * (rooms.length - 1) / 2;
    rooms.forEach(function (rm, i) {
      var x = x0 + i * gap;
      var done = i < run.roomIdx, cur = i === run.roomIdx;
      var boss = rm.kind === 'boss' || rm.kind === 'secretBoss';
      var elite = rm.kind === 'elite';
      // trilha pontilhada; percorrida em ouro, com fagulha correndo até a sala atual
      if (i > 0) {
        var lx0 = x - gap + 9, lx1 = x - 9;
        ctx.fillStyle = (done || cur) ? 'rgba(201,162,58,0.8)' : 'rgba(74,66,88,0.7)';
        for (var dsh = lx0; dsh < lx1; dsh += 4) ctx.fillRect(dsh, iy + 7, 2, 1);
        if (cur) {
          var sp = lx0 + ((self.time * 26) % Math.max(4, lx1 - lx0));
          ctx.fillStyle = '#ffe9a0';
          ctx.fillRect(sp, iy + 6, 2, 3);
        }
      }
      var r = boss ? 12 : elite ? 10 : 8;
      var cy2 = iy + 7;
      // medalhão: disco com aro (feito/atual/futuro)
      ctx.globalAlpha = done ? 0.55 : 1;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath(); ctx.arc(x + 1, cy2 + 2, r, 0, Math.PI * 2); ctx.fill();
      var mg = ctx.createLinearGradient(0, cy2 - r, 0, cy2 + r);
      mg.addColorStop(0, cur ? '#4a3c22' : boss ? '#3c1a22' : '#2e2840');
      mg.addColorStop(1, cur ? '#2a2014' : boss ? '#220e14' : '#181420');
      ctx.fillStyle = mg;
      ctx.beginPath(); ctx.arc(x, cy2, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = done ? '#5a5468' : cur ? '#ffd76a' : boss ? '#e84a5a' : elite ? '#c9a23a' : '#4a4258';
      ctx.lineWidth = cur || boss ? 2 : 1;
      ctx.beginPath(); ctx.arc(x, cy2, r, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1;
      if (cur) {
        // halo pulsante na sala atual
        var pu = 0.4 + 0.4 * Math.sin(self.time * 5);
        ctx.strokeStyle = 'rgba(255,215,106,' + pu + ')';
        ctx.beginPath(); ctx.arc(x, cy2, r + 3, 0, Math.PI * 2); ctx.stroke();
        var cg = ctx.createRadialGradient(x, cy2, 1, x, cy2, r * 2.4);
        cg.addColorStop(0, 'rgba(255,215,106,0.2)');
        cg.addColorStop(1, 'rgba(255,215,106,0)');
        ctx.fillStyle = cg;
        ctx.fillRect(x - r * 2.4, cy2 - r * 2.4, r * 4.8, r * 4.8);
      }
      var isz = boss ? 14 : 11;
      ctx.drawImage(RA.gfx.Icons.symbol(ROOM_ICON[rm.kind] || 'star'), x - isz / 2, cy2 - isz / 2, isz, isz);
      // check dourado nas salas vencidas
      if (done) {
        ctx.strokeStyle = '#ffd76a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 3, cy2);
        ctx.lineTo(x - 1, cy2 + 3);
        ctx.lineTo(x + 4, cy2 - 3);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      ctx.globalAlpha = 1;
    });

    // botão entrar
    var room = run.current();
    var label = room ? ({ battle: RA.UI('battle'), event: RA.UI('event'), shop: RA.UI('shop'), elite: RA.UI('elite'), special: RA.UI('special'), boss: RA.UI('boss'), secretBoss: RA.UI('boss') + '??' }[room.kind] || '...') : '...';
    var b = { x: w / 2 - 55, y: iy + 26, w: 110, h: 22, label: label, glow: true, fn: function () { self.enterRoom(); } };
    this.buttons.push(W().btn(ctx, b, this.time));

    // party na base — retratos emoldurados com relevo
    this.heroRects = [];
    var hs = run.party;
    var pgap = Math.min(50, (w - 20) / hs.length);
    var px0 = w / 2 - pgap * (hs.length - 1) / 2 - 12;
    hs.forEach(function (hh, i) {
      var x = px0 + i * pgap, y = h - 58;
      ctx.globalAlpha = hh.dead ? 0.25 : 1;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(x, y, 26, 26);
      var fg = ctx.createLinearGradient(0, y - 2, 0, y + 26);
      fg.addColorStop(0, hh.row === 'front' ? '#4a4060' : '#302a42');
      fg.addColorStop(1, '#1a1626');
      ctx.fillStyle = fg;
      ctx.fillRect(x - 2, y - 2, 28, 28);
      ctx.fillStyle = '#120e1c';
      ctx.fillRect(x - 1, y - 1, 26, 26);
      ctx.drawImage(RA.gfx.Portraits.get(hh.id), x, y, 24, 24);
      ctx.strokeStyle = hh.row === 'front' ? '#8a6e2e' : '#4a4258';
      ctx.strokeRect(x - 1.5, y - 1.5, 27, 27);
      if (!hh.dead) W().hpBar(ctx, x, y + 28, 24, hh.hp, hh.maxHp, 0);
      ctx.globalAlpha = 1;
      self.heroRects.push({ x: x - 2, y: y - 2, w: 28, h: 34, hero: hh });
    });
    // bandeja de relíquias + ouro cunhado
    this.relicRects = [];
    var relShow = run.relics.slice(0, Math.floor((w - 70) / 12));
    if (relShow.length) {
      W().panel(ctx, 4, h - 20, relShow.length * 12 + 8, 16, { edge: '#3c3550' });
    }
    var rx = 8;
    relShow.forEach(function (id) {
      var rel = RA.data.Relics.byId[id];
      var ic = RA.gfx.Icons.symbol(rel.rarity === 'amaldicoada' ? 'skull' : rel.rarity === 'lendaria' ? 'star' : 'coin');
      ctx.drawImage(ic, rx, h - 17, 10, 10);
      self.relicRects.push({ x: rx, y: h - 17, w: 11, h: 11, relic: rel });
      rx += 12;
    });
    W().goldChip(ctx, w - 6, h - 18, run.gold, true);
    // config
    this.buttons.push(W().btn(ctx, { x: w - 26, y: 4, w: 20, h: 14, label: '*', small: true, fn: function () { Scenes.push(new RA.ui.SettingsScene({ fromRun: true })); } }, this.time));
    // abandonar
    this.buttons.push(W().btn(ctx, { x: 6, y: 4, w: 42, h: 14, label: RA.UI('leave'), small: true, fn: function () { run.save(); Scenes.replace(new RA.ui.MainMenuScene()); } }, this.time));

    if (this.tip) W().tooltip(ctx, w, h, this.tip.x, this.tip.y, this.tip.title, this.tip.lines);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- EVENTO
  function EventScene(params) { this.run = params.run; }
  EventScene.prototype.enter = function () {
    this.time = 0;
    this.ev = this.run.pickEvent();
    this.result = null;
    this.buttons = [];
    this.facePick = null;
    RA.audio.setMusic('evento');
  };
  EventScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    var self = this;
    events.taps.forEach(function (tp) {
      self.buttons.forEach(function (b) {
        if (W().inRect(tp.x, tp.y, b) && !b.disabled) { RA.audio.sfx('click'); b.fn(); }
      });
    });
  };
  EventScene.prototype.choose = function (choice) {
    var run = this.run, self = this;
    var out = run.applyEventFx(choice.fx);
    this.result = out;
    RA.audio.sfx('confirm');
    if (out.fight) {
      var room = { kind: out.fight.tier === 'elite' ? 'elite' : 'battle' };
      RA.core.Scenes.replace(new RA.ui.BattleScene({
        run: run, room: room,
        onDone: function (reward, won) {
          if (!won) RA.core.Scenes.replace(new RunEndScene({ run: run, win: false }));
          else RA.core.Scenes.replace(new RewardScene({ run: run, reward: reward }));
        }
      }));
      return;
    }
    if (out.facePick) { this.facePick = out.facePick; }
  };
  EventScene.prototype.leave = function () {
    var run = this.run;
    if (this.facePick && this.facePick.length) {
      RA.core.Scenes.replace(new RewardScene({ run: run, reward: { gold: 0, faces: this.facePick, relics: null }, fromEvent: true }));
      return;
    }
    run.advance();
    RA.core.Scenes.replace(new MapScene({ run: run }));
  };
  EventScene.prototype.render = function (ctx, w, h) {
    var run = this.run, ev = this.ev, self = this;
    RA.gfx.Backgrounds.draw(ctx, run.region().id, w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.55)';
    ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    var pw = Math.min(300, w - 16), px = (w - pw) / 2;
    W().header(ctx, w, 12, RA.T(ev.name), { size: 2, color: '#ffe9a0' });
    var lines = F.wrap(RA.T(ev.text), 1, 1, pw - 20);
    var ty = 38;
    W().panel(ctx, px, ty - 6, pw, lines.length * 9 + 12);
    lines.forEach(function (l, i) { F.draw(ctx, l, px + 10, ty + i * 9, { size: 1, color: '#c8c2d4' }); });
    var by = ty + lines.length * 9 + 16;

    if (!this.result) {
      ev.choices.forEach(function (ch) {
        var ok = run.eventChoiceAvailable(ch);
        var b = { x: px, y: by, w: pw, h: 26, label: RA.T(ch.label), disabled: !ok, fn: function () { self.choose(ch); } };
        W().btn(ctx, b, self.time);
        self.buttons.push(b);
        F.draw(ctx, RA.T(ch.result).slice(0, 66), px + pw / 2, by + 27, { size: 1, color: ok ? '#8a94a8' : '#4a4258', align: 'center' });
        by += 40;
      });
    } else {
      (this.result.log || []).forEach(function (l) {
        F.draw(ctx, l, w / 2, by, { size: 1, color: '#6ee89a', align: 'center' });
        by += 11;
      });
      var b2 = { x: w / 2 - 50, y: by + 8, w: 100, h: 22, label: RA.UI('next'), glow: true, fn: function () { self.leave(); } };
      W().btn(ctx, b2, this.time);
      this.buttons.push(b2);
    }
    W().goldChip(ctx, w - 6, 4, run.gold, true);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- LOJA
  function ShopScene(params) { this.run = params.run; }
  ShopScene.prototype.enter = function () {
    this.time = 0;
    this.stock = this.run.shopStock();
    this.bought = {};
    this.buttons = [];
    this.msg = RA.T({ pt: '"Cliente vivo! Que raridade por aqui..."', en: '"A living customer! How rare..."' });
    this.facePick = null;
    RA.audio.setMusic('loja');
  };
  ShopScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    var self = this;
    events.taps.forEach(function (tp) {
      self.buttons.forEach(function (b) {
        if (W().inRect(tp.x, tp.y, b) && !b.disabled) { RA.audio.sfx('click'); b.fn(); }
      });
    });
    events.holds.forEach(function (hd) {
      self.tip = null;
      self.itemRects && self.itemRects.forEach(function (r) {
        if (W().inRect(hd.x, hd.y, r) && r.tipTitle) self.tip = { x: hd.x, y: r.y, title: r.tipTitle, lines: r.tipLines };
      });
    });
    if (!events.holds.length && !RA.ui.input.pointer.down) this.tip = null;
  };
  ShopScene.prototype.itemLabel = function (it) {
    if (it.kind === 'face') return RA.T(it.face.name);
    if (it.kind === 'relic') return RA.T(it.relic.name);
    if (it.kind === 'heal') return RA.T({ pt: 'Poção de cura (5)', en: 'Healing potion (5)' });
    if (it.kind === 'removeCurse') return RA.T({ pt: 'Remover maldição', en: 'Remove curse' });
    if (it.kind === 'repair') return RA.T({ pt: 'Consertar dados', en: 'Repair dice' });
    if (it.kind === 'swapRow') return RA.T({ pt: 'Trocar de linha', en: 'Swap row' });
    if (it.kind === 'upgradeDie') return RA.T({ pt: 'Evoluir dado (+2 lados)', en: 'Upgrade die (+2 sides)' });
    if (it.kind === 'mystery') return RA.T({ pt: 'Compra misteriosa', en: 'Mystery purchase' });
    if (it.kind === 'secretMap') return RA.T({ pt: 'Mapa de sala secreta', en: 'Secret room map' });
    return '?';
  };
  ShopScene.prototype.render = function (ctx, w, h) {
    var run = this.run, self = this;
    RA.gfx.Backgrounds.draw(ctx, run.region().id, w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.6)';
    ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    this.itemRects = [];
    W().header(ctx, w, 8, RA.UI('shop'), { size: 2, color: '#ffe9a0' });
    // vendedor num balcão iluminado por lampião
    var lg = ctx.createRadialGradient(28, 38, 2, 28, 38, 34);
    lg.addColorStop(0, 'rgba(255,200,110,0.22)');
    lg.addColorStop(1, 'rgba(255,200,110,0)');
    ctx.fillStyle = lg;
    ctx.fillRect(0, 8, 70, 66);
    var vs = RA.gfx.EnemySprites.get('humanoide', 'mascaras', 30, 'capuz', Math.floor(this.time * 2) % 2);
    ctx.drawImage(vs, 12, 24);
    W().panel(ctx, 46, 28, Math.min(F.measure(this.msg.slice(0, 60), 1, 1) + 12, w - 56), 14, { edge: '#3c3550' });
    F.draw(ctx, this.msg.slice(0, 60), 52, 32, { size: 1, color: '#c8b490' });

    var pw = Math.min(300, w - 16), px = (w - pw) / 2;
    var y = 62;
    this.stock.forEach(function (it, i) {
      if (self.bought[i]) return;
      var afford = run.gold >= it.cost;
      var b = { x: px, y: y, w: pw - 54, h: 18, label: self.itemLabel(it).slice(0, 30), small: true, disabled: !afford, fn: function () {
        // itens que precisam escolher um herói abrem o seletor
        if (it.kind === 'upgradeDie' || it.kind === 'swapRow') {
          self.pickHero = { item: it, idx: i };
          return;
        }
        var res = run.buy(it, 0);
        if (res.ok) {
          self.bought[i] = true;
          RA.audio.sfx('buy');
          self.msg = res.msg || RA.T({ pt: '"Ótima escolha!"', en: '"Fine choice!"' });
          if (res.facePick) self.facePick = res.facePick;
        }
      } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
      F.draw(ctx, it.cost + '$', px + pw - 46, y + 5, { size: 1, color: afford ? '#ffd76a' : '#8a4a4a' });
      var tipT = null, tipL = null;
      if (it.kind === 'face') { tipT = RA.T(it.face.name); tipL = W().descFace(it.face); }
      if (it.kind === 'relic') { tipT = RA.T(it.relic.name); tipL = [RA.T(it.relic.desc), it.relic.rarity]; }
      self.itemRects.push({ x: px, y: y, w: pw, h: 18, tipTitle: tipT, tipLines: tipL });
      y += 21;
    });
    // vender relíquia
    if (run.relics.length) {
      var relId = run.relics[run.relics.length - 1];
      var bs = { x: px, y: y + 2, w: pw - 54, h: 18, small: true, label: RA.UI('sell') + ': ' + RA.T(RA.data.Relics.byId[relId].name).slice(0, 22), fn: function () { run.sellRelic(relId); RA.audio.sfx('gold'); } };
      W().btn(ctx, bs, this.time);
      this.buttons.push(bs);
      F.draw(ctx, '+15$', px + pw - 46, y + 7, { size: 1, color: '#ffd76a' });
      y += 22;
    }
    var bl = { x: w / 2 - 50, y: Math.min(h - 26, y + 10), w: 100, h: 20, label: RA.UI('leave'), glow: true, fn: function () {
      if (self.facePick) { RA.core.Scenes.replace(new RewardScene({ run: run, reward: { gold: 0, faces: self.facePick, relics: null }, fromEvent: true })); return; }
      run.advance();
      RA.core.Scenes.replace(new MapScene({ run: run }));
    } };
    W().btn(ctx, bl, this.time);
    this.buttons.push(bl);
    W().goldChip(ctx, w - 6, 4, run.gold, true);

    // seletor de herói (evoluir dado / trocar de linha)
    if (this.pickHero) {
      var it2 = this.pickHero.item, idx2 = this.pickHero.idx;
      ctx.fillStyle = 'rgba(6,4,10,0.75)';
      ctx.fillRect(0, 0, w, h);
      this.buttons = []; // só os botões da sobreposição respondem
      F.draw(ctx, this.itemLabel(it2) + ' - ' + RA.UI('applyTo'), w / 2, h * 0.24, { size: 1, color: '#ffe9a0', align: 'center' });
      var hs2 = run.party.filter(function (x) { return !x.dead; });
      var gapH = Math.min(60, (w - 20) / hs2.length);
      var hx0 = w / 2 - gapH * (hs2.length - 1) / 2 - 16;
      hs2.forEach(function (hh2, i2) {
        var x2 = hx0 + i2 * gapH, y2 = h * 0.34;
        var elig = it2.kind !== 'upgradeDie' || run.upgradeCost(hh2) !== null;
        W().panel(ctx, x2, y2, 34, 52, { edge: elig ? '#ffd76a' : '#38323f' });
        ctx.globalAlpha = elig ? 1 : 0.35;
        ctx.drawImage(RA.gfx.Portraits.get(hh2.id), x2 + 5, y2 + 3, 24, 24);
        ctx.globalAlpha = 1;
        F.draw(ctx, 'D' + hh2.faces.length, x2 + 17, y2 + 30, { size: 1, color: elig ? '#ffd76a' : '#5a5468', align: 'center' });
        F.draw(ctx, RA.T(hh2.def.name).slice(0, 5), x2 + 17, y2 + 41, { size: 1, color: '#c8c2d4', align: 'center' });
        if (elig) {
          var hb = { x: x2, y: y2, w: 34, h: 52, label: '', fn: function () {
            var pIdx = run.party.indexOf(hh2);
            var res2 = run.buy(it2, pIdx);
            self.pickHero = null;
            if (res2.ok) {
              self.bought[idx2] = true;
              RA.audio.sfx('rare');
              self.msg = res2.msg || RA.T({ pt: '"Ótima escolha!"', en: '"Fine choice!"' });
            }
          } };
          self.buttons.push(hb);
        }
      });
      var cb = { x: w / 2 - 40, y: h * 0.34 + 60, w: 80, h: 16, small: true, label: RA.UI('back'), fn: function () { self.pickHero = null; } };
      W().btn(ctx, cb, this.time);
      this.buttons.push(cb);
    }
    if (this.tip) W().tooltip(ctx, w, h, this.tip.x, this.tip.y, this.tip.title, this.tip.lines);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- SALA ESPECIAL (tesouro/segredo)
  function SpecialScene(params) { this.run = params.run; this.room = params.room; }
  SpecialScene.prototype.enter = function () {
    this.time = 0;
    this.buttons = [];
    RA.audio.setMusic('evento');
    RA.audio.sfx('secret');
    if (this.room.gold) this.run.gold += this.room.gold;
  };
  SpecialScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    var self = this;
    events.taps.forEach(function (tp) {
      self.buttons.forEach(function (b) { if (W().inRect(tp.x, tp.y, b)) { RA.audio.sfx('click'); b.fn(); } });
    });
  };
  SpecialScene.prototype.render = function (ctx, w, h) {
    var run = this.run, self = this;
    RA.gfx.Backgrounds.draw(ctx, run.region().id, w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.6)';
    ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    F.draw(ctx, RA.T(this.room.name || { pt: 'Sala Secreta', en: 'Secret Room' }), w / 2, h * 0.25, { size: 2, color: '#8a4ae8', align: 'center', shadow: true });
    var y = h * 0.4;
    if (this.room.gold) { F.draw(ctx, '+' + this.room.gold + ' ' + RA.UI('gold'), w / 2, y, { size: 1, color: '#ffd76a', align: 'center' }); y += 14; }
    var b = { x: w / 2 - 50, y: h * 0.6, w: 100, h: 22, label: RA.UI('collect'), glow: true, fn: function () {
      var reward = { gold: 0, faces: self.room.faces || null, relics: self.room.relics || null };
      if (reward.faces || reward.relics) RA.core.Scenes.replace(new RewardScene({ run: run, reward: reward, fromEvent: true }));
      else { run.advance(); RA.core.Scenes.replace(new MapScene({ run: run })); }
    } };
    W().btn(ctx, b, this.time);
    this.buttons.push(b);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- RECOMPENSA
  // fluxo: escolher face (ou pular) -> escolher herói -> escolher lado -> relíquia (se houver)
  function RewardScene(params) {
    this.run = params.run;
    this.reward = params.reward;
    this.fromEvent = params.fromEvent;
  }
  RewardScene.prototype.enter = function () {
    this.time = 0;
    this.stage = (this.reward.faces && this.reward.faces.length) ? 'face' : (this.reward.relics ? 'relic' : 'done');
    this.pickedFace = null;
    this.pickedHero = null;
    this.buttons = [];
    if (this.stage === 'done') this.finish();
  };
  RewardScene.prototype.finish = function () {
    var run = this.run;
    if (run.pendingVictory) {
      run.pendingVictory = false;
      RA.core.Scenes.replace(new RunEndScene({ run: run, win: true }));
      return;
    }
    var nxt = run.advance();
    if (nxt === null && !run.finished) { RA.core.Scenes.replace(new RunEndScene({ run: run, win: true })); return; }
    RA.core.Scenes.replace(new MapScene({ run: run }));
  };
  RewardScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    var self = this;
    events.taps.forEach(function (tp) {
      self.buttons.forEach(function (b) { if (W().inRect(tp.x, tp.y, b) && !b.disabled) { RA.audio.sfx('click'); b.fn(); } });
    });
    events.holds.forEach(function (hd) {
      self.tip = null;
      (self.tipRects || []).forEach(function (r) {
        if (W().inRect(hd.x, hd.y, r)) self.tip = { x: hd.x, y: r.y, title: r.title, lines: r.lines };
      });
    });
    if (!events.holds.length && !RA.ui.input.pointer.down) this.tip = null;
  };
  RewardScene.prototype.render = function (ctx, w, h) {
    var run = this.run, self = this;
    RA.gfx.Backgrounds.draw(ctx, run.region().id, w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.62)';
    ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    this.tipRects = [];
    W().header(ctx, w, 8, RA.UI('rewards'), { size: 2, color: '#ffe9a0' });
    if (this.reward.gold) F.draw(ctx, '+' + this.reward.gold + ' ' + RA.UI('gold'), w / 2, 27, { size: 1, color: '#ffd76a', align: 'center', shadow: true });

    if (this.stage === 'face') {
      F.draw(ctx, RA.UI('pickFace'), w / 2, 40, { size: 1, color: '#c8c2d4', align: 'center' });
      var faces = this.reward.faces;
      var cw = Math.min(86, (w - 24) / faces.length - 6);
      var x0 = w / 2 - (cw + 6) * faces.length / 2 + 3;
      faces.forEach(function (f2, i) {
        var x = x0 + i * (cw + 6), y = 52;
        W().panel(ctx, x, y, cw, 78, { edge: f2.rare ? '#ffd76a' : '#4a4258' });
        var die = { skin: f2.rare ? 'dourado' : 'cinza', anim: { phase: 'idle', t: 0 }, resultFace: f2, faces: [f2], used: false, locked: false };
        RA.gfx.Dice.draw(ctx, die, x + cw / 2 - 12, y + 6, 24, self.time);
        var maxCh = Math.max(4, Math.floor((cw - 6) / 6));
        F.draw(ctx, RA.T(f2.name).slice(0, maxCh), x + cw / 2, y + 38, { size: 1, color: '#ffe9a0', align: 'center' });
        var dsc = W().descFace(f2);
        F.draw(ctx, (dsc[0] || '').slice(0, maxCh), x + cw / 2, y + 48, { size: 1, color: '#8a94a8', align: 'center' });
        var b = { x: x + 4, y: y + 58, w: cw - 8, h: 15, small: true, label: RA.UI('collect'), fn: function () { self.pickedFace = f2; self.stage = 'hero'; RA.audio.sfx('chest'); } };
        W().btn(ctx, b, self.time);
        self.buttons.push(b);
        self.tipRects.push({ x: x, y: y, w: cw, h: 78, title: RA.T(f2.name), lines: dsc });
      });
      var skip = { x: w / 2 - 40, y: 140, w: 80, h: 18, small: true, label: RA.UI('skip'), fn: function () { self.stage = self.reward.relics ? 'relic' : 'done'; if (self.stage === 'done') self.finish(); } };
      W().btn(ctx, skip, this.time);
      this.buttons.push(skip);
    } else if (this.stage === 'hero') {
      F.draw(ctx, RA.UI('applyTo'), w / 2, 40, { size: 1, color: '#c8c2d4', align: 'center' });
      var hs = run.party.filter(function (x) { return !x.dead; });
      var gap = Math.min(56, (w - 20) / hs.length);
      var hx0 = w / 2 - gap * (hs.length - 1) / 2 - 16;
      hs.forEach(function (hh, i) {
        var x = hx0 + i * gap, y = 56;
        var b = { x: x, y: y, w: 32, h: 44, label: '', fn: function () { self.pickedHero = hh; self.stage = 'side'; } };
        W().panel(ctx, x, y, 32, 44);
        ctx.drawImage(RA.gfx.Portraits.get(hh.id), x + 4, y + 3, 24, 24);
        F.draw(ctx, RA.T(hh.def.name).slice(0, 6), x + 16, y + 31, { size: 1, color: '#c8c2d4', align: 'center' });
        self.buttons.push(b);
      });
    } else if (this.stage === 'side') {
      F.draw(ctx, RA.UI('whichSide'), w / 2, 40, { size: 1, color: '#c8c2d4', align: 'center' });
      var hh2 = this.pickedHero;
      var nSides = hh2.faces.length;
      var colsS = Math.min(6, nSides);
      var gap2 = Math.min(46, (w - 20) / colsS);
      var sx0 = w / 2 - gap2 * (colsS - 1) / 2 - 14;
      hh2.faces.forEach(function (f3, i) {
        var x = sx0 + (i % colsS) * gap2, y = 56 + Math.floor(i / colsS) * 44;
        var die2 = { skin: hh2.def.skin, anim: { phase: 'idle', t: 0 }, resultFace: f3, faces: hh2.faces, used: false, locked: false };
        RA.gfx.Dice.draw(ctx, die2, x, y, 26, self.time);
        var b2 = { x: x - 3, y: y - 3, w: 32, h: 36, label: '', fn: function () {
          self.oldFace = Object.assign({}, hh2.faces[i]);
          run.applyFace(run.party.indexOf(hh2), i, self.pickedFace);
          RA.audio.sfx('rare');
          self.swapT = 0;
          self.stage = 'swapDone';
        } };
        self.buttons.push(b2);
        self.tipRects.push({ x: x - 3, y: y - 3, w: 32, h: 36, title: RA.T(f3.name), lines: W().descFace(f3) });
      });
      F.draw(ctx, RA.T(this.pickedFace.name), w / 2, 100, { size: 1, color: '#ffe9a0', align: 'center' });
    } else if (this.stage === 'swapDone') {
      // confirmação visual: lado antigo -> lado novo gravado no dado
      this.swapT = (this.swapT || 0) + 1 / 60;
      var hh3 = this.pickedHero;
      F.draw(ctx, RA.T({ pt: 'LADO GRAVADO!', en: 'SIDE ENGRAVED!' }), w / 2, 40, { size: 2, color: '#ffd76a', align: 'center', shadow: true });
      var dieOld = { skin: 'cinza', anim: { phase: 'idle', t: 0 }, resultFace: this.oldFace, faces: [this.oldFace], used: true, locked: false };
      var dieNew = { skin: hh3.def.skin, anim: { phase: 'landing', t: Math.min(0.4, this.swapT) }, resultFace: this.pickedFace, faces: [this.pickedFace], used: false, locked: false, highlight: true };
      RA.gfx.Dice.draw(ctx, dieOld, w / 2 - 58, 66, 28, this.time);
      F.draw(ctx, '>', w / 2 - 14, 76, { size: 2, color: '#8a94a8' });
      RA.gfx.Dice.draw(ctx, dieNew, w / 2 + 26, 62, 34, this.time);
      F.draw(ctx, RA.T(this.oldFace.name).slice(0, 12), w / 2 - 44, 100, { size: 1, color: '#5a5468', align: 'center' });
      F.draw(ctx, RA.T(this.pickedFace.name).slice(0, 14), w / 2 + 43, 102, { size: 1, color: '#ffe9a0', align: 'center' });
      ctx.drawImage(RA.gfx.Portraits.get(hh3.id), w / 2 - 10, 112, 20, 20);
      var okB = { x: w / 2 - 45, y: 140, w: 90, h: 20, label: RA.UI('next'), glow: true, fn: function () {
        self.stage = self.reward.relics ? 'relic' : 'done';
        if (self.stage === 'done') self.finish();
      } };
      W().btn(ctx, okB, this.time);
      this.buttons.push(okB);
    } else if (this.stage === 'relic') {
      F.draw(ctx, RA.UI('pickRelic'), w / 2, 40, { size: 1, color: '#c8c2d4', align: 'center' });
      var rels = this.reward.relics || [];
      var cw2 = Math.min(96, (w - 20) / Math.max(1, rels.length) - 6);
      var rx0 = w / 2 - (cw2 + 6) * rels.length / 2 + 3;
      rels.forEach(function (rel, i) {
        var x = rx0 + i * (cw2 + 6), y = 52;
        var rc = { comum: '#8a94a8', incomum: '#4ac86a', rara: '#4a8ae8', epica: '#8a4ae8', lendaria: '#ffd76a', amaldicoada: '#e84a5a' }[rel.rarity];
        W().panel(ctx, x, y, cw2, 74, { edge: rc });
        F.draw(ctx, RA.T(rel.name).slice(0, 15), x + cw2 / 2, y + 6, { size: 1, color: rc, align: 'center' });
        F.wrap(RA.T(rel.desc), 1, 1, cw2 - 8).slice(0, 4).forEach(function (l, li) {
          F.draw(ctx, l, x + cw2 / 2, y + 18 + li * 9, { size: 1, color: '#c8c2d4', align: 'center' });
        });
        var b3 = { x: x + 4, y: y + 56, w: cw2 - 8, h: 14, small: true, label: RA.UI('collect'), fn: function () { run.addRelic(rel.id); RA.audio.sfx('chest'); self.stage = 'done'; self.finish(); } };
        W().btn(ctx, b3, self.time);
        self.buttons.push(b3);
      });
      var skip2 = { x: w / 2 - 40, y: 136, w: 80, h: 16, small: true, label: RA.UI('skip'), fn: function () { self.stage = 'done'; self.finish(); } };
      W().btn(ctx, skip2, this.time);
      this.buttons.push(skip2);
    }
    W().goldChip(ctx, w - 6, 4, run.gold, true);
    if (this.tip) W().tooltip(ctx, w, h, this.tip.x, this.tip.y, this.tip.title, this.tip.lines);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- FIM DE RUN
  function RunEndScene(params) { this.run = params.run; this.win = params.win; }
  RunEndScene.prototype.enter = function () {
    this.time = 0;
    this.buttons = [];
    var run = this.run;
    if (!run.finished) run.finish(this.win);
    this.endingId = run.endingId;
    if (this.win) RA.audio.setMusic(this.endingId === 'sombrio' || this.endingId === 'secreto' ? 'finalSombrio' : 'finalBom');
    else { RA.audio.setMusicForce('derrota', false); RA.audio.sfx('defeat'); }
    this.stats = {
      battles: run.counters.battlesWon,
      gold: run.gold,
      relics: run.relics.length,
      floor: run.floor,
      time: Math.round((Date.now() - run.startedAt) / 60000)
    };
  };
  RunEndScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    var self = this;
    events.taps.forEach(function (tp) {
      self.buttons.forEach(function (b) { if (W().inRect(tp.x, tp.y, b)) { RA.audio.sfx('click'); b.fn(); } });
    });
  };
  var ENDINGS = {
    bom: { pt: 'O Dado Negro se parte. As Faces, livres, voltam a girar como devem: ao acaso. Pela primeira vez em eras, o amanhã não está escrito. Os heróis descem a Torre sob um céu que ninguém previu — e é lindo.', en: 'The Black Die shatters. The Faces, freed, spin as they should: by chance. For the first time in ages, tomorrow is unwritten. The heroes descend the Tower under a sky no one foresaw — and it is beautiful.' },
    sombrio: { pt: 'O Rei Sem Número sussurrou a verdade: alguém precisa segurar o dado. Quando a poeira baixa, uma nova mão o ergue — a sua. As Faces se curvam. O mundo é livre... mas você, não.', en: 'The Numberless King whispered the truth: someone must hold the die. When the dust settles, a new hand lifts it — yours. The Faces bow. The world is free... but you are not.' },
    secreto: { pt: 'Dez maldições. Nenhum atalho. Você não quebrou o Dado Negro — você o venceu no próprio jogo dele. As Faces param, olham, e pela primeira vez... aplaudem. O destino se recusa a apostar contra você de novo.', en: 'Ten curses. No shortcuts. You did not break the Black Die — you beat it at its own game. The Faces stop, look, and for the first time... applaud. Fate refuses to bet against you again.' }
  };
  RunEndScene.prototype.render = function (ctx, w, h) {
    var run = this.run, self = this;
    RA.gfx.Backgrounds.draw(ctx, this.win ? 'menu' : 'torre', w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.6)';
    ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    // clímax: raios dourados na vitória / vinheta sangrenta na derrota
    if (this.win) {
      for (var ray = 0; ray < 8; ray++) {
        var ra2 = this.time * 0.25 + ray * Math.PI / 4;
        var rg3 = ctx.createLinearGradient(w / 2, 22, w / 2 + Math.cos(ra2) * w * 0.5, 22 + Math.sin(ra2) * w * 0.5);
        rg3.addColorStop(0, 'rgba(255,215,106,0.12)');
        rg3.addColorStop(1, 'rgba(255,215,106,0)');
        ctx.strokeStyle = rg3;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(w / 2, 22);
        ctx.lineTo(w / 2 + Math.cos(ra2) * w * 0.5, 22 + Math.sin(ra2) * w * 0.5);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    } else {
      var dg = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85);
      dg.addColorStop(0, 'rgba(120,20,30,0)');
      dg.addColorStop(1, 'rgba(120,20,30,0.35)');
      ctx.fillStyle = dg;
      ctx.fillRect(0, 0, w, h);
    }
    var endTitle = this.win ? RA.UI('victory') : RA.UI('defeat');
    F.draw(ctx, endTitle, w / 2 + 2, 18, { size: 3, color: 'rgba(0,0,0,0.8)', align: 'center' });
    F.draw(ctx, endTitle, w / 2, 16, { size: 3, color: this.win ? '#ffd76a' : '#e84a5a', align: 'center' });
    var y = 50;
    if (this.win && ENDINGS[this.endingId]) {
      var lines = F.wrap(RA.T(ENDINGS[this.endingId]), 1, 1, Math.min(280, w - 30));
      var shown = Math.min(lines.length, Math.floor(this.time * 4));
      lines.slice(0, shown).forEach(function (l, i) {
        F.draw(ctx, l, w / 2, y + i * 10, { size: 1, color: '#e8e0d0', align: 'center' });
      });
      y += lines.length * 10 + 12;
    }
    var st = this.stats;
    var rows = [
      [RA.UI('battle') + 's', st.battles],
      [RA.UI('gold'), st.gold],
      [RA.UI('relics'), st.relics],
      [RA.T({ pt: 'Minutos', en: 'Minutes' }), st.time]
    ];
    if (run.rules && run.rules.infinite) rows.push([RA.UI('floors'), st.floor]);
    rows.forEach(function (r, i) {
      F.draw(ctx, r[0] + ': ' + r[1], w / 2, y + i * 11, { size: 1, color: '#8a94a8', align: 'center' });
    });
    y += rows.length * 11 + 14;
    var b = { x: w / 2 - 55, y: Math.min(y, h - 30), w: 110, h: 22, label: RA.UI('continue_').replace(' RUN', ''), glow: true, fn: function () { RA.core.Scenes.replace(new RA.ui.MainMenuScene()); } };
    W().btn(ctx, b, this.time);
    this.buttons.push(b);
    W().renderToasts(ctx, w);
  };

  RA.ui.MapScene = MapScene;
  RA.ui.EventScene = EventScene;
  RA.ui.ShopScene = ShopScene;
  RA.ui.SpecialScene = SpecialScene;
  RA.ui.RewardScene = RewardScene;
  RA.ui.RunEndScene = RunEndScene;
})();
