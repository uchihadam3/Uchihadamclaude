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
      // mapa secreto comprado: a próxima sala * pulsa em roxo
      if (rm.kind === 'special' && run.secretMapReady && i >= run.roomIdx) {
        var sq = 0.4 + 0.4 * Math.sin(self.time * 4 + i);
        ctx.strokeStyle = 'rgba(138,74,232,' + sq + ')';
        ctx.beginPath(); ctx.arc(x, cy2, r + 3, 0, Math.PI * 2); ctx.stroke();
        F.draw(ctx, '?', x + r + 1, cy2 - r - 4, { size: 1, color: '#b08ae8', shadow: true });
      }
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
        var bLabel = RA.T(ch.label);
        var maxChB = Math.max(8, Math.floor((pw - 12) / 6));
        if (bLabel.length > maxChB) bLabel = bLabel.slice(0, maxChB - 1) + '.';
        var b = { x: px, y: by, w: pw, h: 26, label: bLabel, disabled: !ok, fn: function () { self.choose(ch); } };
        W().btn(ctx, b, self.time);
        self.buttons.push(b);
        // consequência da escolha: quebra em até 2 linhas dentro da largura
        var resLines = F.wrap(RA.T(ch.result), 1, 1, pw - 8).slice(0, 2);
        resLines.forEach(function (rl, rli) {
          F.draw(ctx, rl, px + pw / 2, by + 28 + rli * 9, { size: 1, color: ok ? '#8a94a8' : '#4a4258', align: 'center' });
        });
        by += 32 + resLines.length * 9 + 4;
      });
    } else {
      (this.result.log || []).forEach(function (l) {
        F.wrap(String(l), 1, 1, pw - 8).slice(0, 2).forEach(function (l2) {
          F.draw(ctx, l2, w / 2, by, { size: 1, color: '#6ee89a', align: 'center' });
          by += 11;
        });
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
    this.msg = RA.T({ pt: '"Cliente vivo! Que raridade..."', en: '"A living customer! How rare..."' });
    this.facePick = null;
    this.selItem = -1; // item tocado (1º toque mostra a descrição; COMPRAR confirma)
    RA.audio.setMusic('loja');
  };
  // o que cada item faz, por extenso (mostrado ao tocar no item)
  ShopScene.prototype.itemDesc = function (it) {
    if (it.kind === 'face') return W().descFace(it.face);
    if (it.kind === 'relic') return [RA.T(it.relic.desc), '(' + it.relic.rarity + ')'];
    if (it.kind === 'heal') return [RA.T({ pt: 'Cura 5 HP num herói à sua ESCOLHA (você escolhe quem ao comprar).', en: 'Heals 5 HP on a hero of your CHOICE (pick who when buying).' })];
    if (it.kind === 'removeCurse') return [RA.T({ pt: 'Remove a sua relíquia AMALDIÇOADA.', en: 'Removes your CURSED relic.' })];
    if (it.kind === 'repair') return [RA.T({ pt: 'Conserta TODAS as faces trincadas dos seus dados.', en: 'Repairs ALL cracked faces on your dice.' })];
    if (it.kind === 'swapRow') return [RA.T({ pt: 'Move um herói à sua escolha entre a LINHA DE FRENTE e a linha de trás.', en: 'Moves a hero of your choice between FRONT and back line.' })];
    if (it.kind === 'upgradeDie') return [RA.T({ pt: 'Dá +2 LADOS ao dado de um herói (D6>D8>D10>D12). Mais lados = mais faces para gravar!', en: 'Gives a hero\'s die +2 SIDES (D6>D8>D10>D12). More sides = more faces to engrave!' })];
    if (it.kind === 'mystery') return [RA.T({ pt: 'Caixa surpresa: pode vir relíquia, face rúnica ou ouro. Sem reembolso!', en: 'Mystery box: a relic, a rune face or gold. No refunds!' })];
    if (it.kind === 'secretMap') return [RA.T({ pt: 'A PRÓXIMA sala de estrela (*) do mapa vira uma SALA SECRETA com ouro e relíquia!', en: 'The NEXT star (*) room on the map becomes a SECRET ROOM with gold and a relic!' })];
    return [];
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
    // fala do vendedor com quebra de linha (nunca estoura a tela)
    var msgW = Math.min(w - 56, 240);
    var msgLines = F.wrap(this.msg, 1, 1, msgW - 12).slice(0, 2);
    W().panel(ctx, 46, 26, msgW, 8 + msgLines.length * 9, { edge: '#3c3550' });
    msgLines.forEach(function (ml, mi) {
      F.draw(ctx, ml, 52, 31 + mi * 9, { size: 1, color: '#c8b490' });
    });

    // vitrine: TOQUE mostra a descrição; a compra é no botão COMPRAR
    var pw = Math.min(300, w - 16), px = (w - pw) / 2;
    var landscape = w > h * 1.2;
    var cols = landscape ? 2 : 1;
    var rowW = Math.floor(pw / cols) - (cols > 1 ? 4 : 0);
    var y0 = 58, rowH = 21;
    var rowN = 0;
    var visible = [];
    this.stock.forEach(function (it, i) { if (!self.bought[i]) visible.push({ it: it, i: i }); });
    visible.forEach(function (v, vi) {
      var it = v.it, i = v.i;
      var col = vi % cols, row2 = Math.floor(vi / cols);
      var x = px + col * (rowW + 4), y = y0 + row2 * rowH;
      rowN = Math.max(rowN, row2 + 1);
      var afford = run.gold >= it.cost;
      var isSel = self.selItem === i;
      var priceTxt = it.cost + '$';
      var priceW = F.measure(priceTxt, 1, 1);
      // rótulo truncado para NUNCA passar do botão (preço tem coluna própria)
      var maxCh2 = Math.max(6, Math.floor((rowW - priceW - 18) / 6));
      var lbl = self.itemLabel(it);
      if (lbl.length > maxCh2) lbl = lbl.slice(0, maxCh2 - 1) + '.';
      var b = { x: x, y: y, w: rowW, h: 18, small: true, label: '', accent: isSel ? '#ffd76a' : undefined, glow: false, fn: function () {
        self.selItem = i;
      } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
      F.draw(ctx, lbl, x + 5, y + 5, { size: 1, color: isSel ? '#ffe9a0' : (afford ? '#e8e0d0' : '#6a6480'), shadow: true });
      F.draw(ctx, priceTxt, x + rowW - 5 - priceW, y + 5, { size: 1, color: afford ? '#ffd76a' : '#8a4a4a', shadow: true });
      if (isSel) {
        var sp3 = 0.5 + 0.4 * Math.sin(self.time * 5);
        ctx.strokeStyle = 'rgba(255,235,170,' + sp3 + ')';
        ctx.strokeRect(x - 1.5, y - 1.5, rowW + 3, 21);
      }
      var tipT = self.itemLabel(it), tipL = self.itemDesc(it);
      self.itemRects.push({ x: x, y: y, w: rowW, h: 18, tipTitle: tipT, tipLines: tipL });
    });
    var y = y0 + rowN * rowH;
    // vender relíquia
    if (run.relics.length) {
      var relId = run.relics[run.relics.length - 1];
      var sellLbl = RA.UI('sell') + ': ' + RA.T(RA.data.Relics.byId[relId].name);
      var maxChS = Math.max(8, Math.floor((pw - 40) / 6));
      if (sellLbl.length > maxChS) sellLbl = sellLbl.slice(0, maxChS - 1) + '.';
      var bs = { x: px, y: y + 2, w: pw - 40, h: 16, small: true, label: sellLbl, fn: function () { run.sellRelic(relId); RA.audio.sfx('gold'); self.msg = RA.T({ pt: '"+15 de ouro. Prazer negociar!"', en: '"+15 gold. Pleasure doing business!"' }); } };
      W().btn(ctx, bs, this.time);
      this.buttons.push(bs);
      F.draw(ctx, '+15$', px + pw - 34, y + 6, { size: 1, color: '#ffd76a' });
      y += 21;
    }
    // painel de descrição do item selecionado (ou dica de toque)
    var selIt = this.selItem >= 0 && !this.bought[this.selItem] ? this.stock[this.selItem] : null;
    if (selIt) {
      var dLines = [];
      this.itemDesc(selIt).forEach(function (dl) {
        F.wrap(String(dl), 1, 1, pw - 20).forEach(function (dl2) { dLines.push(dl2); });
      });
      var dMax = Math.max(2, Math.floor((h - 30 - y - 22) / 9));
      dLines = dLines.slice(0, Math.min(4, dMax));
      var dH = 20 + dLines.length * 9;
      var dY = Math.min(y + 2, h - dH - 26);
      W().panel(ctx, px, dY, pw, dH, { edge: '#c9a23a' });
      F.draw(ctx, this.itemLabel(selIt).slice(0, Math.floor((pw - 12) / 6)), px + 6, dY + 4, { size: 1, color: '#ffe9a0', shadow: true });
      ctx.fillStyle = 'rgba(201,162,58,0.5)';
      ctx.fillRect(px + 6, dY + 13, pw - 12, 1);
      dLines.forEach(function (dl3, di) {
        F.draw(ctx, dl3, px + 6, dY + 17 + di * 9, { size: 1, color: '#c8c2d4' });
      });
      y = dY + dH;
    } else {
      F.draw(ctx, RA.T({ pt: 'TOQUE NUM ITEM PARA VER O QUE ELE FAZ', en: 'TAP AN ITEM TO SEE WHAT IT DOES' }).slice(0, Math.floor((w - 10) / 6)), w / 2, y + 4, { size: 1, color: '#6a6480', align: 'center' });
    }
    // grupo com barras de vida (o efeito da poção aparece NA HORA)
    if (!landscape) {
      var hs3 = run.party;
      var pgap3 = Math.min(44, (w - 20) / hs3.length);
      var px3 = w / 2 - pgap3 * (hs3.length - 1) / 2 - 10;
      var py3 = h - 56;
      hs3.forEach(function (hh4, i4) {
        var hx = px3 + i4 * pgap3;
        ctx.globalAlpha = hh4.dead ? 0.25 : 1;
        ctx.fillStyle = '#120e1c';
        ctx.fillRect(hx - 1, py3 - 1, 22, 22);
        ctx.drawImage(RA.gfx.Portraits.get(hh4.id), hx, py3, 20, 20);
        ctx.strokeStyle = '#4a4258';
        ctx.strokeRect(hx - 1.5, py3 - 1.5, 23, 23);
        if (!hh4.dead) {
          W().hpBar(ctx, hx, py3 + 24, 20, hh4.hp, hh4.maxHp, 0);
          F.draw(ctx, hh4.hp + '', hx + 10, py3 + 29, { size: 1, color: '#8a94a8', align: 'center' });
        }
        ctx.globalAlpha = 1;
      });
    }
    // COMPRAR (confirma o item selecionado) + SAIR
    var canBuy = selIt && run.gold >= selIt.cost;
    var bw5 = Math.min(110, Math.floor((w - 24) / 2));
    var bBuy = { x: w / 2 + 4, y: h - 24, w: bw5, h: 18, small: true, glow: !!canBuy, disabled: !canBuy,
      label: RA.T({ pt: 'COMPRAR', en: 'BUY' }) + (selIt ? ' ' + selIt.cost + '$' : ''),
      fn: function () {
        var it3 = self.stock[self.selItem], idx3 = self.selItem;
        if (!it3) return;
        // itens que agem num herói abrem o seletor (poção incluída!)
        if (it3.kind === 'upgradeDie' || it3.kind === 'swapRow' || it3.kind === 'heal') {
          self.pickHero = { item: it3, idx: idx3 };
          return;
        }
        var res = run.buy(it3, 0);
        if (res.ok) {
          self.bought[idx3] = true;
          self.selItem = -1;
          RA.audio.sfx('buy');
          self.msg = res.msg || RA.T({ pt: '"Ótima escolha!"', en: '"Fine choice!"' });
          if (res.facePick) self.facePick = res.facePick;
        }
      } };
    var bl = { x: w / 2 - 4 - bw5, y: h - 24, w: bw5, h: 18, small: true, label: RA.UI('leave'), fn: function () {
      if (self.facePick) { RA.core.Scenes.replace(new RewardScene({ run: run, reward: { gold: 0, faces: self.facePick, relics: null }, fromEvent: true })); return; }
      run.advance();
      RA.core.Scenes.replace(new MapScene({ run: run }));
    } };
    W().btn(ctx, bBuy, this.time);
    W().btn(ctx, bl, this.time);
    this.buttons.push(bBuy, bl);
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
        var elig = true;
        if (it2.kind === 'upgradeDie') elig = run.upgradeCost(hh2) !== null;
        if (it2.kind === 'heal') elig = hh2.hp < hh2.maxHp; // cura só em quem está ferido
        W().panel(ctx, x2, y2, 34, 62, { edge: elig ? '#ffd76a' : '#38323f' });
        ctx.globalAlpha = elig ? 1 : 0.35;
        ctx.drawImage(RA.gfx.Portraits.get(hh2.id), x2 + 5, y2 + 3, 24, 24);
        ctx.globalAlpha = 1;
        W().hpBar(ctx, x2 + 5, y2 + 31, 24, hh2.hp, hh2.maxHp, 0);
        F.draw(ctx, hh2.hp + '/' + hh2.maxHp, x2 + 17, y2 + 37, { size: 1, color: '#8a94a8', align: 'center' });
        F.draw(ctx, it2.kind === 'upgradeDie' ? 'D' + hh2.faces.length : (hh2.row === 'front' ? RA.T({ pt: 'FRENTE', en: 'FRONT' }) : RA.T({ pt: 'TRÁS', en: 'BACK' })).slice(0, 6), x2 + 17, y2 + 46, { size: 1, color: elig ? '#ffd76a' : '#5a5468', align: 'center' });
        F.draw(ctx, RA.T(hh2.def.name).slice(0, 5), x2 + 17, y2 + 55, { size: 1, color: '#c8c2d4', align: 'center' });
        if (elig) {
          var hb = { x: x2, y: y2, w: 34, h: 62, label: '', fn: function () {
            var pIdx = run.party.indexOf(hh2);
            var res2 = run.buy(it2, pIdx);
            self.pickHero = null;
            if (res2.ok) {
              self.bought[idx2] = true;
              self.selItem = -1;
              RA.audio.sfx('rare');
              self.msg = res2.msg || RA.T({ pt: '"Ótima escolha!"', en: '"Fine choice!"' });
            }
          } };
          self.buttons.push(hb);
        }
      });
      var cb = { x: w / 2 - 40, y: h * 0.34 + 70, w: 80, h: 16, small: true, label: RA.UI('back'), fn: function () { self.pickHero = null; } };
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
    this.infoFace = null;   // cartão de detalhes da face/lado tocado
    this.selSide = -1;      // lado selecionado (a troca só ocorre no CONFIRMAR)
    this.buttons = [];
    if (this.stage === 'done') this.finish();
  };

  // cartão de detalhes centrado em cx; devolve o y de baixo do cartão
  RewardScene.prototype.drawInfoCard = function (ctx, cx, yTop, maxW, maxLines, info) {
    var wrapped = [];
    (info.lines || []).forEach(function (l) {
      F.wrap(String(l), 1, 1, maxW - 16).forEach(function (l2) { wrapped.push(l2); });
    });
    wrapped = wrapped.slice(0, Math.max(2, maxLines));
    var ph = 20 + wrapped.length * 9;
    var pw2 = Math.max(F.measure(info.title, 1, 1) + 20, 140);
    wrapped.forEach(function (l) { pw2 = Math.max(pw2, F.measure(l, 1, 1) + 16); });
    pw2 = Math.min(pw2, maxW);
    var px2 = Math.round(cx - pw2 / 2);
    W().panel(ctx, px2, yTop, pw2, ph, { edge: info.color || '#8a6e2e' });
    F.draw(ctx, info.title.slice(0, Math.floor((pw2 - 8) / 6)), px2 + pw2 / 2, yTop + 4, { size: 1, color: info.color || '#ffe9a0', align: 'center', shadow: true });
    ctx.fillStyle = 'rgba(201,162,58,0.5)';
    ctx.fillRect(px2 + 8, yTop + 13, pw2 - 16, 1);
    wrapped.forEach(function (l, i) {
      F.draw(ctx, l, px2 + 8, yTop + 17 + i * 9, { size: 1, color: '#c8c2d4' });
    });
    return yTop + ph;
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
        var selCard = self.infoFace && self.infoFace.key === 'f' + i;
        W().panel(ctx, x, y, cw, 78, { edge: selCard ? '#ffe9a0' : (f2.rare ? '#ffd76a' : '#4a4258') });
        if (selCard) {
          var pk2 = 0.5 + 0.4 * Math.sin(self.time * 5);
          ctx.strokeStyle = 'rgba(255,235,170,' + pk2 + ')';
          ctx.strokeRect(x - 2.5, y - 2.5, cw + 5, 83);
        }
        var die = { skin: f2.rare ? 'dourado' : 'cinza', anim: { phase: 'idle', t: 0 }, resultFace: f2, faces: [f2], used: false, locked: false, highlight: selCard };
        RA.gfx.Dice.draw(ctx, die, x + cw / 2 - 12, y + 6, 24, self.time);
        var maxCh = Math.max(4, Math.floor((cw - 6) / 6));
        F.draw(ctx, RA.T(f2.name).slice(0, maxCh), x + cw / 2, y + 38, { size: 1, color: '#ffe9a0', align: 'center' });
        var dsc = W().descFace(f2);
        F.draw(ctx, (dsc[0] || '').slice(0, maxCh), x + cw / 2, y + 48, { size: 1, color: '#8a94a8', align: 'center' });
        var b = { x: x + 4, y: y + 58, w: cw - 8, h: 15, small: true, label: RA.UI('collect'), fn: function () { self.pickedFace = f2; self.infoFace = null; self.stage = 'hero'; RA.audio.sfx('chest'); } };
        W().btn(ctx, b, self.time);
        self.buttons.push(b);
        // toque na carta (fora do COLETAR) abre o cartão de detalhes
        var infoB = { x: x, y: y, w: cw, h: 56, label: '', fn: function () {
          self.infoFace = { key: 'f' + i, title: RA.T(f2.name), lines: dsc, color: f2.rare ? '#ffd76a' : '#ffe9a0' };
          RA.audio.sfx('click');
        } };
        self.buttons.push(infoB);
        self.tipRects.push({ x: x, y: y, w: cw, h: 78, title: RA.T(f2.name), lines: dsc });
      });
      // cartão de detalhes da carta tocada (ou dica de toque)
      var fInfoY = 52 + 78 + 6;
      if (this.infoFace) {
        var fMaxL = Math.max(2, Math.floor((h - 30 - fInfoY - 20) / 9));
        this.drawInfoCard(ctx, w / 2, fInfoY, Math.min(w - 16, 300), fMaxL, this.infoFace);
      } else {
        F.draw(ctx, RA.T({ pt: 'TOQUE NUMA CARTA PARA VER OS DETALHES', en: 'TAP A CARD TO SEE DETAILS' }).slice(0, Math.floor((w - 10) / 6)), w / 2, fInfoY + 3, { size: 1, color: '#6a6480', align: 'center' });
      }
      var skip = { x: w / 2 - 40, y: h - 24, w: 80, h: 18, small: true, label: RA.UI('skip'), fn: function () { self.infoFace = null; self.stage = self.reward.relics ? 'relic' : 'done'; if (self.stage === 'done') self.finish(); } };
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
      var hh2 = this.pickedHero;
      F.draw(ctx, RA.UI('whichSide'), w / 2, 34, { size: 1, color: '#c8c2d4', align: 'center' });
      // faixa do LADO NOVO que vai entrar — toque para ver os detalhes
      var nfW = Math.min(w - 16, 190);
      var nfX = Math.round((w - nfW) / 2);
      var newSel = this.infoFace && this.infoFace.key === 'new';
      W().panel(ctx, nfX, 44, nfW, 26, { edge: newSel ? '#ffe9a0' : '#c9a23a' });
      var dieN = { skin: 'dourado', anim: { phase: 'idle', t: 0 }, resultFace: this.pickedFace, faces: [this.pickedFace], used: false, locked: false };
      RA.gfx.Dice.draw(ctx, dieN, nfX + 5, 47, 17, self.time);
      F.draw(ctx, RA.T({ pt: 'NOVO: ', en: 'NEW: ' }) + RA.T(this.pickedFace.name).slice(0, Math.max(4, Math.floor((nfW - 40) / 6) - 6)), nfX + 28, 49, { size: 1, color: '#ffe9a0', shadow: true });
      F.draw(ctx, RA.T({ pt: '(toque p/ detalhes)', en: '(tap for details)' }), nfX + 28, 59, { size: 1, color: '#6a6480' });
      var bNew = { x: nfX, y: 44, w: nfW, h: 26, label: '', fn: function () {
        self.infoFace = { key: 'new', title: RA.T(self.pickedFace.name), lines: W().descFace(self.pickedFace), color: '#ffd76a' };
        RA.audio.sfx('click');
      } };
      this.buttons.push(bNew);

      // grade dos lados atuais — toque INSPECIONA; a troca só ocorre no GRAVAR
      var nSides = hh2.faces.length;
      var twoCol = w > h * 1.35; // paisagem: detalhes à direita da grade
      var colsS = Math.min(twoCol ? 4 : 6, nSides);
      var gridW = twoCol ? w * 0.5 - 10 : w - 16;
      var gap2 = Math.min(46, (gridW - 6) / colsS);
      var gx0 = (twoCol ? 8 : Math.round((w - gap2 * colsS) / 2)) + Math.round((gap2 - 26) / 2);
      var gridY = 78, rowH = twoCol ? 36 : 40;
      hh2.faces.forEach(function (f3, i) {
        var x = gx0 + (i % colsS) * gap2, y = gridY + Math.floor(i / colsS) * rowH;
        var isSel = self.selSide === i;
        if (isSel) {
          var pk3 = 0.5 + 0.4 * Math.sin(self.time * 5);
          ctx.strokeStyle = 'rgba(255,235,170,' + pk3 + ')';
          ctx.strokeRect(x - 3.5, y - 3.5, 33, 35);
        }
        var die2 = { skin: hh2.def.skin, anim: { phase: 'idle', t: 0 }, resultFace: f3, faces: hh2.faces, used: false, locked: false, highlight: isSel };
        RA.gfx.Dice.draw(ctx, die2, x, y, 26, self.time);
        var b2 = { x: x - 3, y: y - 3, w: 32, h: 36, label: '', fn: function () {
          self.selSide = i;
          self.infoFace = { key: 's' + i, title: RA.T({ pt: 'SAI: ', en: 'OUT: ' }) + RA.T(f3.name), lines: W().descFace(f3), color: '#ff9aaa' };
          RA.audio.sfx('click');
        } };
        self.buttons.push(b2);
        self.tipRects.push({ x: x - 3, y: y - 3, w: 32, h: 36, title: RA.T(f3.name), lines: W().descFace(f3) });
      });
      var rows = Math.ceil(nSides / colsS);
      // cartão de detalhes: à direita (paisagem) ou abaixo da grade (retrato)
      if (twoCol) {
        if (this.infoFace) {
          var sMaxL = Math.max(2, Math.floor((h - 30 - 78 - 20) / 9));
          this.drawInfoCard(ctx, w * 0.75, 78, w * 0.48 - 12, sMaxL, this.infoFace);
        } else {
          F.draw(ctx, RA.T({ pt: 'TOQUE NUM LADO', en: 'TAP A SIDE' }), w * 0.75, 84, { size: 1, color: '#6a6480', align: 'center' });
          F.draw(ctx, RA.T({ pt: 'PARA VER O QUE FAZ', en: 'TO SEE WHAT IT DOES' }), w * 0.75, 94, { size: 1, color: '#6a6480', align: 'center' });
        }
      } else {
        var sInfoY = gridY + rows * rowH + 4;
        if (this.infoFace) {
          var sMaxL2 = Math.max(2, Math.floor((h - 32 - sInfoY - 20) / 9));
          this.drawInfoCard(ctx, w / 2, sInfoY, Math.min(w - 16, 300), sMaxL2, this.infoFace);
        } else {
          F.draw(ctx, RA.T({ pt: 'TOQUE NUM LADO PARA VER O QUE ELE FAZ', en: 'TAP A SIDE TO SEE WHAT IT DOES' }).slice(0, Math.floor((w - 10) / 6)), w / 2, sInfoY + 3, { size: 1, color: '#6a6480', align: 'center' });
        }
      }
      // confirmar / voltar — a gravação SÓ acontece aqui
      var cbw = Math.min(110, Math.floor((w - 24) / 2));
      var conf = { x: w / 2 + 4, y: h - 24, w: cbw, h: 18, small: true, glow: this.selSide >= 0, disabled: this.selSide < 0,
        label: RA.T({ pt: 'GRAVAR AQUI', en: 'ENGRAVE HERE' }),
        fn: function () {
          var i2 = self.selSide;
          self.oldFace = Object.assign({}, hh2.faces[i2]);
          run.applyFace(run.party.indexOf(hh2), i2, self.pickedFace);
          RA.audio.sfx('rare');
          self.swapT = 0;
          self.selSide = -1;
          self.infoFace = null;
          self.stage = 'swapDone';
        } };
      var backB = { x: w / 2 - 4 - cbw, y: h - 24, w: cbw, h: 18, small: true, label: RA.UI('back'), fn: function () { self.stage = 'hero'; self.selSide = -1; self.infoFace = null; } };
      W().btn(ctx, conf, this.time);
      W().btn(ctx, backB, this.time);
      this.buttons.push(conf, backB);
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
    // guarda a receita da run ANTES de finish() para o TENTAR DE NOVO
    this.retry = {
      modeId: run.modeId, diffId: run.diffId, curseLvl: run.curseLvl || 0,
      heroIds: run.party.map(function (h) { return h.id; })
    };
    if (!run.finished) run.finish(this.win);
    this.endingId = run.endingId;
    var ctr = run.counters || {};
    this.stats = {
      battles: ctr.battlesWon || 0,
      gold: run.gold,
      relics: run.relics.length,
      floor: run.floor,
      time: Math.round((Date.now() - run.startedAt) / 60000)
    };
    // som por último e protegido: um erro de áudio nunca pode travar esta tela
    try {
      if (this.win) RA.audio.setMusic(this.endingId === 'sombrio' || this.endingId === 'secreto' ? 'finalSombrio' : 'finalBom');
      else { RA.audio.setMusicForce('derrota', false); RA.audio.sfx('defeat'); }
    } catch (e) {}
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
    var st = this.stats || { battles: 0, gold: 0, relics: 0, floor: 0, time: 0 };
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
    var by5 = Math.min(y, h - 30);
    if (this.win) {
      var b = { x: w / 2 - 55, y: by5, w: 110, h: 22, label: RA.UI('continue_').replace(' RUN', ''), glow: true, fn: function () { RA.core.Scenes.replace(new RA.ui.MainMenuScene()); } };
      W().btn(ctx, b, this.time);
      this.buttons.push(b);
    } else {
      // derrota: revanche imediata com a mesma equipe ou voltar ao menu
      var rbw = Math.min(120, Math.floor((w - 24) / 2));
      var bRetry = { x: w / 2 + 4, y: by5, w: rbw, h: 22, small: rbw < 100, glow: true,
        label: RA.T({ pt: 'TENTAR DE NOVO', en: 'TRY AGAIN' }),
        fn: function () {
          var rt = self.retry;
          // campanha: a revanche renasce direto no CHECKPOINT (999 = o mais alto)
          var r2 = RA.game.Run.start({ modeId: rt.modeId, diffId: rt.diffId, curseLvl: rt.curseLvl, heroIds: rt.heroIds, startRegion: rt.modeId === 'campanha' ? 999 : 0 });
          RA.core.Scenes.replace(new RA.ui.MapScene({ run: r2 }));
        } };
      var bMenu = { x: w / 2 - 4 - rbw, y: by5, w: rbw, h: 22, small: rbw < 100,
        label: RA.T({ pt: 'MENU', en: 'MENU' }),
        fn: function () { RA.core.Scenes.replace(new RA.ui.MainMenuScene()); } };
      W().btn(ctx, bRetry, this.time);
      W().btn(ctx, bMenu, this.time);
      this.buttons.push(bRetry, bMenu);
    }
    W().renderToasts(ctx, w);
  };

  RA.ui.MapScene = MapScene;
  RA.ui.EventScene = EventScene;
  RA.ui.ShopScene = ShopScene;
  RA.ui.SpecialScene = SpecialScene;
  RA.ui.RewardScene = RewardScene;
  RA.ui.RunEndScene = RunEndScene;
})();
