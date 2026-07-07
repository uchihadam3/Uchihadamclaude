// MenuScenes: menu principal, seleção de modo/dificuldade, montagem de
// equipe (incl. Draft e time aleatório), configurações, conquistas e codex
// (bestiário, relíquias, faces, estatísticas).
(function () {
  var F = RA.gfx.Font;
  function W() { return RA.ui.W; }
  function Sc() { return RA.core.Scenes; }

  function tapButtons(scene, events) {
    events.taps.forEach(function (tp) {
      (scene.buttons || []).forEach(function (b) {
        if (W().inRect(tp.x, tp.y, b) && !b.disabled) { RA.audio.sfx('click'); b.fn(); }
      });
    });
  }

  // ---------------------------------------------------------- MENU PRINCIPAL
  function MainMenuScene() {}
  MainMenuScene.prototype.enter = function () {
    this.time = 0;
    this.buttons = [];
    RA.audio.setMusic('menu');
    // dados decorativos girando
    var rng = new RA.core.Rng(7);
    this.deco = [];
    for (var i = 0; i < 6; i++) {
      this.deco.push({ x: rng.next(), y: 0.25 + rng.next() * 0.2, s: 14 + rng.int(0, 14), skin: rng.pick(Object.keys(RA.gfx.Dice.SKINS)), spd: 0.3 + rng.next() * 0.5, ph: rng.next() * 9 });
    }
  };
  MainMenuScene.prototype.update = function (dt, events) {
    this.time += dt;
    W().updateToasts(dt);
    tapButtons(this, events);
  };
  MainMenuScene.prototype.render = function (ctx, w, h) {
    var self = this;
    RA.gfx.Backgrounds.draw(ctx, 'menu', w, h, this.time);
    this.buttons = [];
    // dados flutuando
    this.deco.forEach(function (d) {
      var x = ((d.x + self.time * d.spd * 0.03) % 1.1) * w - 20;
      var y = d.y * h + Math.sin(self.time * d.spd + d.ph) * 6;
      var die = { skin: d.skin, anim: { phase: 'rolling', t: 0, showFace: Math.floor(self.time * 2 + d.ph) % 6 }, faces: RA.data.Heroes.list[0].faces, resultFace: null, used: false, locked: false };
      ctx.globalAlpha = 0.5;
      RA.gfx.Dice.draw(ctx, die, x, y, d.s, self.time * d.spd + d.ph);
      ctx.globalAlpha = 1;
    });
    // título em camadas com halo dourado pulsante
    var ty = h * 0.16;
    var ts = w < 240 ? 3 : 4;
    var pulse = 0.5 + 0.2 * Math.sin(this.time * 1.8);
    var hg = ctx.createRadialGradient(w / 2, ty + ts * 6, 8, w / 2, ty + ts * 6, w * 0.36);
    hg.addColorStop(0, 'rgba(255,215,106,' + (0.2 * pulse + 0.08) + ')');
    hg.addColorStop(1, 'rgba(255,215,106,0)');
    ctx.fillStyle = hg;
    ctx.fillRect(0, ty - 30, w, ts * 20 + 60);
    // RELÍQUIAS: sombra funda -> ouro -> fio de luz
    F.draw(ctx, 'RELÍQUIAS', w / 2 + 2, ty + 2, { size: ts, color: 'rgba(0,0,0,0.8)', align: 'center' });
    F.draw(ctx, 'RELÍQUIAS', w / 2, ty, { size: ts, color: '#ffd76a', align: 'center' });
    F.draw(ctx, 'RELÍQUIAS', w / 2, ty - 1, { size: ts, color: 'rgba(255,248,220,0.28)', align: 'center' });
    F.draw(ctx, 'DO ACASO', w / 2 + 1, ty + ts * 8 + 1, { size: ts - 1, color: 'rgba(0,0,0,0.8)', align: 'center' });
    F.draw(ctx, 'DO ACASO', w / 2, ty + ts * 8, { size: ts - 1, color: '#e8e0d0', align: 'center' });
    // linhas ornamentais com losangos ladeando o subtítulo
    var stw = F.measure('DO ACASO', ts - 1, 1);
    var oy = Math.round(ty + ts * 8 + (ts - 1) * 3.5);
    ctx.fillStyle = 'rgba(201,162,58,0.6)';
    ctx.fillRect(Math.round(w / 2 - stw / 2 - 40), oy, 28, 1);
    ctx.fillRect(Math.round(w / 2 + stw / 2 + 12), oy, 28, 1);
    W().diamond(ctx, Math.round(w / 2 - stw / 2 - 46), oy + 0.5, 3, '#c9a23a');
    W().diamond(ctx, Math.round(w / 2 + stw / 2 + 46), oy + 0.5, 3, '#c9a23a');
    // raios giratórios atrás do Dado do Destino
    var fcx = w / 2, fcy = ty + ts * 8 + 38;
    for (var ray = 0; ray < 6; ray++) {
      var ra2 = this.time * 0.4 + ray * Math.PI / 3;
      var rg = ctx.createLinearGradient(fcx, fcy, fcx + Math.cos(ra2) * 46, fcy + Math.sin(ra2) * 46);
      rg.addColorStop(0, 'rgba(255,215,106,0.14)');
      rg.addColorStop(1, 'rgba(255,215,106,0)');
      ctx.strokeStyle = rg;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fcx, fcy);
      ctx.lineTo(fcx + Math.cos(ra2) * 46, fcy + Math.sin(ra2) * 46);
      ctx.stroke();
      ctx.lineWidth = 1;
    }
    RA.gfx.Dice.drawFate(ctx, w / 2 - 12, ty + ts * 8 + 26, 24, this.time, true);

    var p = RA.core.Save.get();
    var hasRun = !!p.run;
    var bw = 130, bx = w / 2 - bw / 2, by = Math.max(ty + 100, h * 0.5);
    var items = [];
    if (hasRun) items.push({ label: RA.UI('continue_'), glow: true, fn: function () { var r = RA.game.Run.resume(); if (r) Sc().replace(new RA.ui.MapScene({ run: r })); } });
    items.push({ label: RA.UI('play'), glow: !hasRun, fn: function () { Sc().replace(new ModeSelectScene()); } });
    items.push({ label: RA.UI('codex'), fn: function () { Sc().replace(new CodexScene()); } });
    items.push({ label: RA.UI('achievements'), fn: function () { Sc().replace(new AchievementsScene()); } });
    items.push({ label: RA.UI('settings'), fn: function () { Sc().replace(new SettingsScene({})); } });
    items.forEach(function (it, i) {
      var b = { x: bx, y: by + i * 27, w: bw, h: 22, label: it.label, glow: it.glow, fn: it.fn };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
    });
    F.draw(ctx, 'v1.0', w - 24, h - 12, { size: 1, color: '#4a4258' });
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- MODOS + DIFICULDADE
  function ModeSelectScene() {}
  ModeSelectScene.prototype.enter = function () {
    this.time = 0;
    this.buttons = [];
    this.sel = 'campanha';
    this.diff = 'normal';
    this.curse = 0;
    this.page = 0;
    RA.audio.setMusic('selecao');
  };
  ModeSelectScene.prototype.update = function (dt, events) {
    this.time += dt; W().updateToasts(dt); tapButtons(this, events);
  };
  ModeSelectScene.prototype.render = function (ctx, w, h) {
    var self = this;
    RA.gfx.Backgrounds.draw(ctx, 'menu', w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.55)'; ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    var p = RA.core.Save.get();
    W().header(ctx, w, 8, RA.UI('chooseMode'), { size: 2, color: '#ffe9a0' });

    // grade de modos 2 colunas
    var modes = RA.data.Modes;
    var perPage = 6;
    var pages = Math.ceil(modes.length / perPage);
    var list = modes.slice(this.page * perPage, this.page * perPage + perPage);
    var cw = Math.min(150, (w - 24) / 2);
    list.forEach(function (m, i) {
      var col = i % 2, row = Math.floor(i / 2);
      var x = w / 2 + (col === 0 ? -cw - 4 : 4), y = 28 + row * 26;
      var unlocked = RA.game.Meta.isModeUnlocked(m);
      var seld = self.sel === m.id;
      var b = { x: x, y: y, w: cw, h: 22, small: true, disabled: !unlocked,
        label: unlocked ? RA.T(m.name) : (m.unlock && m.unlock.secret ? '???' : RA.UI('lockedContent')),
        glow: seld, accent: seld ? '#ffd76a' : undefined,
        fn: function () { self.sel = m.id; } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
    });
    if (pages > 1) {
      var pg = { x: w / 2 - 12, y: 28 + 3 * 26, w: 24, h: 14, small: true, label: (this.page + 1) + '/' + pages, fn: function () { self.page = (self.page + 1) % pages; } };
      W().btn(ctx, pg, this.time); this.buttons.push(pg);
    }
    // descrição do modo
    var mdef = RA.data.ModesById[this.sel];
    var dy = 28 + 3 * 26 + 20;
    F.wrap(RA.T(mdef.desc), 1, 1, w - 40).slice(0, 2).forEach(function (l, i) {
      F.draw(ctx, l, w / 2, dy + i * 9, { size: 1, color: '#8a94a8', align: 'center' });
    });
    if (mdef.unlock && !RA.game.Meta.isModeUnlocked(mdef)) {
      F.draw(ctx, RA.T({ pt: mdef.unlock.pt, en: mdef.unlock.en }), w / 2, dy + 20, { size: 1, color: '#e8a04a', align: 'center' });
    }
    dy += 30;
    // dificuldade (2x2 em telas estreitas para nunca sobrepor)
    F.draw(ctx, RA.UI('chooseDifficulty'), w / 2, dy, { size: 1, color: '#ffe9a0', align: 'center' });
    dy += 12;
    var narrow = w < 330;
    var dcols = narrow ? 2 : 4;
    var dws = Math.min(78, (w - 16) / dcols);
    RA.data.Difficulties.forEach(function (d, i) {
      var unlocked = !d.unlock || d.unlock(p);
      var col = i % dcols, row = Math.floor(i / dcols);
      var x = w / 2 - dws * dcols / 2 + col * dws + 2;
      var b = { x: x, y: dy + row * 20, w: dws - 4, h: 16, small: true, disabled: !unlocked, glow: self.diff === d.id,
        label: RA.T(d.name), fn: function () { self.diff = d.id; if (d.id !== 'veterano') self.curse = 0; } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
    });
    dy += (narrow ? 44 : 20);
    // maldição (se veterano vencido)
    if ((p.stats.bestDifficulty | 0) >= 3 && this.diff === 'veterano') {
      var bm = { x: w / 2 - 70, y: dy, w: 20, h: 14, small: true, label: '-', fn: function () { self.curse = Math.max(0, self.curse - 1); } };
      var bp2 = { x: w / 2 + 50, y: dy, w: 20, h: 14, small: true, label: '+', fn: function () { self.curse = Math.min(Math.min(10, (p.stats.bestCurse || 0) + 1), self.curse + 1); } };
      W().btn(ctx, bm, this.time); W().btn(ctx, bp2, this.time);
      this.buttons.push(bm, bp2);
      F.draw(ctx, RA.T({ pt: 'MALDIÇÃO', en: 'CURSE' }) + ' ' + this.curse, w / 2, dy + 3, { size: 1, color: '#8a4ae8', align: 'center' });
      if (this.curse > 0) {
        var cdef = RA.data.Curses[this.curse - 1];
        F.draw(ctx, RA.T({ pt: cdef.pt, en: cdef.en }).slice(0, 56), w / 2, dy + 15, { size: 1, color: '#c8b8e8', align: 'center' });
      }
      dy += 28;
    }
    // avançar / voltar (largura adaptativa, sem sobreposição)
    var bwm = Math.min(100, Math.floor((w - 24) / 2));
    var bn = { x: w / 2 + 4, y: h - 28, w: bwm, h: 22, label: RA.UI('next'), glow: true, disabled: !RA.game.Meta.isModeUnlocked(mdef),
      fn: function () { Sc().replace(new HeroSelectScene({ modeId: self.sel, diffId: self.diff, curse: self.curse })); } };
    var bb = { x: w / 2 - 4 - bwm, y: h - 28, w: bwm, h: 22, label: RA.UI('back'), fn: function () { Sc().replace(new MainMenuScene()); } };
    W().btn(ctx, bn, this.time); W().btn(ctx, bb, this.time);
    this.buttons.push(bn, bb);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- SELEÇÃO DE HERÓIS
  function HeroSelectScene(params) { this.params = params; }
  HeroSelectScene.prototype.enter = function () {
    this.time = 0;
    this.buttons = [];
    var rules = RA.data.ModesById[this.params.modeId].rules || {};
    this.size = rules.partySize || RA.config.PARTY_SIZE;
    this.draft = !!rules.draft;
    this.picked = [];
    this.page = 0;
    this.startRelic = null;
    this.needRelic = !!rules.startRelicLegendary;
    this.relicOpts = null;
    if (this.needRelic) {
      var lends = RA.data.Relics.byRarity('lendaria').slice(0, 3);
      this.relicOpts = lends;
    }
    var p = RA.core.Save.get();
    this.unlocked = p.unlockedHeroes;
    // campanha: checkpoint de região + dados legados
    this.checkpoint = 0;
    this.startRegion = 0;
    this.hasLegacy = false;
    if (this.params.modeId === 'campanha') {
      var camp = RA.game.Run.campaignData();
      this.checkpoint = camp.checkpoint || 0;
      this.startRegion = this.checkpoint; // padrão: continuar de onde chegou
      this.hasLegacy = Object.keys(camp.legacy || {}).length > 0;
    }
    if (this.draft) this.rollDraft();
    RA.audio.setMusic('selecao');
  };
  HeroSelectScene.prototype.rollDraft = function () {
    var rng = new RA.core.Rng((Date.now() & 0xffffff) + this.picked.length * 977);
    var pool = this.unlocked.filter(function (id) { return true; });
    var self = this;
    pool = pool.filter(function (id) { return self.picked.indexOf(id) < 0; });
    this.draftOpts = [];
    for (var i = 0; i < 3 && pool.length; i++) {
      var pick = pool[rng.int(0, pool.length - 1)];
      pool.splice(pool.indexOf(pick), 1);
      this.draftOpts.push(pick);
    }
  };
  HeroSelectScene.prototype.start = function (randomTeam) {
    var self = this;
    var run = RA.game.Run.start({
      modeId: this.params.modeId, diffId: this.params.diffId, curseLvl: this.params.curse,
      heroIds: this.picked, randomTeam: randomTeam, startRelicId: this.startRelic,
      startRegion: this.startRegion || 0
    });
    Sc().replace(new RA.ui.MapScene({ run: run }));
  };
  HeroSelectScene.prototype.update = function (dt, events) {
    this.time += dt; W().updateToasts(dt);
    var self = this;
    tapButtons(this, events);
    events.holds.forEach(function (hd) {
      self.tip = null;
      (self.tipRects || []).forEach(function (r) {
        if (W().inRect(hd.x, hd.y, r)) self.tip = { x: hd.x, y: r.y, title: r.title, lines: r.lines };
      });
    });
    if (!events.holds.length && !RA.ui.input.pointer.down) this.tip = null;
  };
  HeroSelectScene.prototype.heroTip = function (id) {
    var def = RA.data.Heroes.byId[id];
    var lines = [RA.UI('hp') + ': ' + def.hp, RA.UI('passive') + ': ' + RA.T(def.passive.txt)];
    def.faces.forEach(function (f) {
      lines.push('- ' + RA.T(f.name) + ' [' + f.val + ']');
    });
    return { title: RA.T(def.name), lines: lines };
  };
  HeroSelectScene.prototype.render = function (ctx, w, h) {
    var self = this;
    RA.gfx.Backgrounds.draw(ctx, 'menu', w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.55)'; ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    this.tipRects = [];
    W().header(ctx, w, 6, RA.UI('chooseHeroes') + ' (' + this.picked.length + '/' + this.size + ')', { size: 1, color: '#ffe9a0' });
    // campanha com checkpoint: escolher a região inicial (toque para alternar)
    if (this.checkpoint > 0 && !this.draft) {
      var regsC = RA.data.Regions;
      var bC = { x: w - 74, y: 2, w: 70, h: 14, small: true, accent: '#c9a23a', glow: this.startRegion > 0,
        label: RA.T({ pt: 'INÍCIO: R', en: 'START: R' }) + (this.startRegion + 1),
        fn: function () { self.startRegion = (self.startRegion + 1) % (self.checkpoint + 1); } };
      W().btn(ctx, bC, this.time);
      this.buttons.push(bC);
      F.draw(ctx, RA.T(regsC[this.startRegion].name).slice(0, 12), w - 39, 18, { size: 1, color: '#c8b8e8', align: 'center' });
    }
    if (this.hasLegacy && !this.draft) {
      F.draw(ctx, RA.T({ pt: 'DADOS LEGADOS ATIVOS', en: 'LEGACY DICE ACTIVE' }), 4, 2, { size: 1, color: '#6ee89a' });
      F.draw(ctx, RA.T({ pt: '(evoluções mantidas)', en: '(upgrades kept)' }), 4, 11, { size: 1, color: '#4a7a5a' });
    }

    // escolha de relíquia inicial (modo Relíquia Única)
    if (this.needRelic && !this.startRelic) {
      F.draw(ctx, RA.UI('pickRelic'), w / 2, 30, { size: 1, color: '#c8c2d4', align: 'center' });
      var cw3 = Math.min(96, (w - 20) / 3 - 6);
      this.relicOpts.forEach(function (rel, i) {
        var x = w / 2 - (cw3 + 6) * 1.5 + 3 + i * (cw3 + 6), y = 44;
        W().panel(ctx, x, y, cw3, 70, { edge: '#ffd76a' });
        F.draw(ctx, RA.T(rel.name).slice(0, 15), x + cw3 / 2, y + 5, { size: 1, color: '#ffd76a', align: 'center' });
        F.wrap(RA.T(rel.desc), 1, 1, cw3 - 8).slice(0, 4).forEach(function (l, li) {
          F.draw(ctx, l, x + cw3 / 2, y + 16 + li * 9, { size: 1, color: '#c8c2d4', align: 'center' });
        });
        var b = { x: x + 4, y: y + 53, w: cw3 - 8, h: 14, small: true, label: RA.UI('collect'), fn: function () { self.startRelic = rel.id; } };
        W().btn(ctx, b, self.time);
        self.buttons.push(b);
      });
      return;
    }

    if (this.draft) {
      // draft: 3 opções por rodada
      F.draw(ctx, RA.T({ pt: 'Rodada ' + (this.picked.length + 1) + ' de ' + this.size, en: 'Round ' + (this.picked.length + 1) + ' of ' + this.size }), w / 2, 22, { size: 1, color: '#8a94a8', align: 'center' });
      var gap3 = Math.min(90, (w - 20) / 3);
      this.draftOpts.forEach(function (id, i) {
        var x = w / 2 - gap3 * 1.5 + i * gap3 + gap3 / 2 - 24, y = 42;
        W().panel(ctx, x - 4, y - 4, 56, 74);
        ctx.drawImage(RA.gfx.Portraits.get(id), x, y, 48, 48);
        F.draw(ctx, RA.T(RA.data.Heroes.byId[id].name).slice(0, 9), x + 24, y + 52, { size: 1, color: '#ffe9a0', align: 'center' });
        var b = { x: x - 4, y: y - 4, w: 56, h: 74, label: '', fn: function () {
          self.picked.push(id);
          RA.audio.sfx('confirm');
          if (self.picked.length >= self.size) self.start(false);
          else self.rollDraft();
        } };
        self.buttons.push(b);
        var tip = self.heroTip(id);
        self.tipRects.push({ x: x - 4, y: y - 4, w: 56, h: 74, title: tip.title, lines: tip.lines });
      });
    } else {
      // grade completa (célula 42px para o nome nunca sobrepor)
      var all = RA.data.Heroes.list;
      var cols = Math.max(4, Math.floor((w - 12) / 42));
      var perPage = cols * 3;
      var pages = Math.ceil(all.length / perPage);
      var list = all.slice(this.page * perPage, this.page * perPage + perPage);
      var gx0 = w / 2 - cols * 42 / 2;
      list.forEach(function (def, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = gx0 + col * 42 + 7, y = 24 + row * 42;
        var unlocked = self.unlocked.indexOf(def.id) >= 0;
        var pickedIdx = self.picked.indexOf(def.id);
        // moldura de retrato com relevo
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fillRect(x, y, 30, 30);
        var pg = ctx.createLinearGradient(0, y - 2, 0, y + 30);
        pg.addColorStop(0, pickedIdx >= 0 ? '#4a3c22' : '#2e2840');
        pg.addColorStop(1, pickedIdx >= 0 ? '#2a2014' : '#1a1626');
        ctx.fillStyle = pg;
        ctx.fillRect(x - 2, y - 2, 32, 32);
        ctx.globalAlpha = unlocked ? 1 : 0.3;
        ctx.fillStyle = '#141020'; ctx.fillRect(x - 1, y - 1, 30, 30);
        ctx.drawImage(RA.gfx.Portraits.get(def.id), x, y, 28, 28);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = pickedIdx >= 0 ? '#ffd76a' : (unlocked ? '#4a4258' : '#2a2534');
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 1.5, y - 1.5, 31, 31);
        if (pickedIdx >= 0) {
          // selo dourado pulsante + número da vaga
          var pk = 0.55 + 0.45 * Math.sin(self.time * 5 + i);
          ctx.strokeStyle = 'rgba(255,215,106,' + pk + ')';
          ctx.strokeRect(x - 3.5, y - 3.5, 35, 35);
          ctx.fillStyle = '#ffd76a';
          ctx.fillRect(x + 21, y - 4, 11, 11);
          ctx.strokeStyle = '#8a6e2e';
          ctx.strokeRect(x + 21.5, y - 3.5, 10, 10);
          F.draw(ctx, String(pickedIdx + 1), x + 26, y - 2, { size: 1, color: '#241a08', align: 'center' });
        }
        if (!unlocked) F.draw(ctx, '?', x + 14, y + 10, { size: 1, color: '#8a94a8', align: 'center' });
        F.draw(ctx, RA.T(def.name).slice(0, 6), x + 14, y + 31, { size: 1, color: pickedIdx >= 0 ? '#ffd76a' : '#8a94a8', align: 'center' });
        if (unlocked) {
          var b = { x: x - 2, y: y - 2, w: 32, h: 38, label: '', fn: function () {
            var ix = self.picked.indexOf(def.id);
            if (ix >= 0) self.picked.splice(ix, 1);
            else if (self.picked.length < self.size) self.picked.push(def.id);
          } };
          self.buttons.push(b);
          var tip = self.heroTip(def.id);
          self.tipRects.push({ x: x - 2, y: y - 2, w: 32, h: 38, title: tip.title, lines: tip.lines });
        }
      });
      if (pages > 1) {
        var pg2 = { x: w / 2 - 16, y: 24 + 3 * 42 + 2, w: 32, h: 14, small: true, label: (this.page + 1) + '/' + pages, fn: function () { self.page = (self.page + 1) % pages; } };
        W().btn(ctx, pg2, this.time);
        this.buttons.push(pg2);
      }
      // três botões com largura adaptativa (nunca sobrepõem)
      var by2 = h - 28;
      var tbw = Math.floor((w - 28) / 3);
      var br = { x: 6, y: by2, w: tbw, h: 22, small: true, label: RA.T({ pt: 'SORTE', en: 'RANDOM' }), fn: function () {
        self.picked = [];
        var rng = new RA.core.Rng(Date.now() & 0xffffff);
        var pool = self.unlocked.slice();
        while (self.picked.length < self.size && pool.length) {
          var pk = pool[rng.int(0, pool.length - 1)];
          pool.splice(pool.indexOf(pk), 1);
          self.picked.push(pk);
        }
        self.start(true);
      } };
      var bs2 = { x: w - tbw - 6, y: by2, w: tbw, h: 22, small: true, label: RA.UI('start'), glow: true, disabled: this.picked.length !== this.size, fn: function () { self.start(false); } };
      var bb2 = { x: w / 2 - tbw / 2, y: by2, w: tbw, h: 22, small: true, label: RA.UI('back'), fn: function () { Sc().replace(new ModeSelectScene()); } };
      W().btn(ctx, br, this.time); W().btn(ctx, bs2, this.time); W().btn(ctx, bb2, this.time);
      this.buttons.push(br, bs2, bb2);
    }
    if (this.tip) W().tooltip(ctx, w, h, this.tip.x, this.tip.y, this.tip.title, this.tip.lines);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- CONFIGURAÇÕES
  function SettingsScene(params) { this.fromRun = params && params.fromRun; }
  SettingsScene.prototype.enter = function () {
    this.time = 0; this.buttons = []; this.confirmWipe = false;
  };
  SettingsScene.prototype.update = function (dt, events) {
    this.time += dt; W().updateToasts(dt); tapButtons(this, events);
  };
  SettingsScene.prototype.render = function (ctx, w, h) {
    var self = this;
    RA.gfx.Backgrounds.draw(ctx, 'menu', w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.7)'; ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    var s = RA.core.Save.get().settings;
    var p = RA.core.Save.get();
    W().header(ctx, w, 8, RA.UI('settings'), { size: 2, color: '#ffe9a0' });

    var y = 28, lx = Math.max(10, w / 2 - 140), rx = Math.min(w - 30, w / 2 + 110);
    function slider(label, key, min, max, step) {
      F.draw(ctx, label, lx, y + 3, { size: 1, color: '#c8c2d4' });
      var val = s[key];
      var bm = { x: rx - 58, y: y, w: 16, h: 13, small: true, label: '-', fn: function () { s[key] = Math.max(min, Math.round((s[key] - step) * 100) / 100); RA.core.Save.save(); RA.audio.applyVolumes(); } };
      var bp3 = { x: rx + 8, y: y, w: 16, h: 13, small: true, label: '+', fn: function () { s[key] = Math.min(max, Math.round((s[key] + step) * 100) / 100); RA.core.Save.save(); RA.audio.applyVolumes(); } };
      W().btn(ctx, bm, self.time); W().btn(ctx, bp3, self.time);
      self.buttons.push(bm, bp3);
      F.draw(ctx, String(Math.round(val * (max <= 2 ? 100 : 1)) / (max <= 2 ? 100 : 1)), rx - 20, y + 3, { size: 1, color: '#ffe9a0' });
      y += 17;
    }
    function toggle(label, key) {
      F.draw(ctx, label, lx, y + 3, { size: 1, color: '#c8c2d4' });
      var b = { x: rx - 34, y: y, w: 42, h: 13, small: true, label: s[key] ? RA.UI('yes') : RA.UI('no'), accent: s[key] ? '#4ac86a' : undefined, fn: function () { s[key] = !s[key]; RA.core.Save.save(); } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
      y += 17;
    }
    slider(RA.UI('musicVol'), 'musicVol', 0, 1, 0.1);
    slider(RA.UI('sfxVol'), 'sfxVol', 0, 1, 0.1);
    slider(RA.UI('animSpeed'), 'animSpeed', 0.5, 2, 0.25);
    slider(RA.UI('textSize'), 'textSize', 1, 2, 1);
    toggle(RA.UI('colorblind'), 'colorblind');
    toggle(RA.UI('reduceShake'), 'reduceShake');
    toggle(RA.UI('reduceFlash'), 'reduceFlash');
    toggle(RA.UI('detailedTooltips'), 'detailedTooltips');
    toggle(RA.UI('confirmEndTurn'), 'confirmEndTurn');
    toggle(RA.UI('leftHanded'), 'leftHanded');
    // idioma
    F.draw(ctx, RA.UI('lang'), lx, y + 3, { size: 1, color: '#c8c2d4' });
    var bl2 = { x: rx - 34, y: y, w: 42, h: 13, small: true, label: p.lang.toUpperCase(), fn: function () { p.lang = p.lang === 'pt' ? 'en' : 'pt'; RA.core.Save.save(); } };
    W().btn(ctx, bl2, this.time); this.buttons.push(bl2);
    y += 22;
    // apagar save
    var bw3 = { x: lx, y: y, w: 110, h: 16, small: true, danger: true, label: this.confirmWipe ? RA.UI('confirmWipe').slice(0, 20) : RA.UI('wipeSave'), fn: function () {
      if (!self.confirmWipe) { self.confirmWipe = true; return; }
      RA.core.Save.wipe();
      RA.game.run = null;
      Sc().replace(new MainMenuScene());
    } };
    W().btn(ctx, bw3, this.time); this.buttons.push(bw3);

    var back = { x: w / 2 - 50, y: h - 26, w: 100, h: 20, label: RA.UI('back'), glow: true, fn: function () {
      if (self.fromRun) Sc().pop();
      else Sc().replace(new MainMenuScene());
    } };
    W().btn(ctx, back, this.time); this.buttons.push(back);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- CONQUISTAS
  function AchievementsScene() {}
  AchievementsScene.prototype.enter = function () { this.time = 0; this.buttons = []; this.page = 0; };
  AchievementsScene.prototype.update = function (dt, events) { this.time += dt; W().updateToasts(dt); tapButtons(this, events); };
  AchievementsScene.prototype.render = function (ctx, w, h) {
    var self = this;
    RA.gfx.Backgrounds.draw(ctx, 'menu', w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.7)'; ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    var p = RA.core.Save.get();
    var all = RA.data.Achievements;
    var got = Object.keys(p.achievements).length;
    W().header(ctx, w, 6, RA.UI('achievements') + ' ' + got + '/' + all.length, { size: 1, color: '#ffe9a0' });
    // barra de progresso geral (gamificação!)
    var pbW = Math.min(200, w - 60);
    var pbX = w / 2 - pbW / 2;
    W().hpBar(ctx, pbX, 18, pbW, got, all.length, 0, '#ffd76a');
    var perPage = Math.floor((h - 66) / 20);
    var pages = Math.ceil(all.length / perPage);
    var list = all.slice(this.page * perPage, this.page * perPage + perPage);
    var y = 30, lx = Math.max(8, w / 2 - 150);
    var rw = Math.min(300, w - 16);
    list.forEach(function (a, ri) {
      var has = !!p.achievements[a.id];
      var hidden = a.hidden && !has;
      // linha em gradiente com fio dourado nas conquistadas
      var rg2 = ctx.createLinearGradient(0, y, 0, y + 18);
      rg2.addColorStop(0, has ? 'rgba(58,48,30,0.95)' : 'rgba(26,22,34,0.9)');
      rg2.addColorStop(1, has ? 'rgba(34,27,16,0.95)' : 'rgba(16,13,22,0.9)');
      ctx.fillStyle = rg2;
      ctx.fillRect(lx, y, rw, 18);
      ctx.strokeStyle = has ? '#8a6e2e' : '#2e2a3a';
      ctx.strokeRect(lx + 0.5, y + 0.5, rw - 1, 17);
      if (has) {
        var shn = 0.35 + 0.25 * Math.sin(self.time * 3 + ri);
        ctx.fillStyle = 'rgba(255,235,170,' + shn * 0.2 + ')';
        ctx.fillRect(lx + 1, y + 1, rw - 2, 2);
      }
      ctx.globalAlpha = has ? 1 : 0.55;
      ctx.drawImage(RA.gfx.Icons.symbol(has ? 'star' : 'skull'), lx + 3, y + 4, 10, 10);
      ctx.globalAlpha = 1;
      F.draw(ctx, hidden ? '???' : RA.T(a.name), lx + 17, y + 2, { size: 1, color: has ? '#ffd76a' : '#8a94a8', shadow: has });
      F.draw(ctx, hidden ? RA.UI('unlockHint') : RA.T(a.desc).slice(0, 44), lx + 17, y + 10, { size: 1, color: has ? '#c8c2d4' : '#4a4258' });
      y += 20;
    });
    if (pages > 1) {
      var pg = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pages, fn: function () { self.page = (self.page + 1) % pages; } };
      W().btn(ctx, pg, this.time); this.buttons.push(pg);
    }
    var back = { x: w / 2 - 50, y: h - 26, w: 100, h: 20, label: RA.UI('back'), fn: function () { Sc().replace(new MainMenuScene()); } };
    W().btn(ctx, back, this.time); this.buttons.push(back);
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- CODEX
  function CodexScene() {}
  CodexScene.prototype.enter = function () { this.time = 0; this.buttons = []; this.tab = 'bestiario'; this.page = 0; };
  CodexScene.prototype.update = function (dt, events) {
    this.time += dt; W().updateToasts(dt);
    var self = this;
    tapButtons(this, events);
    events.holds.forEach(function (hd) {
      self.tip = null;
      (self.tipRects || []).forEach(function (r) {
        if (W().inRect(hd.x, hd.y, r)) self.tip = { x: hd.x, y: r.y, title: r.title, lines: r.lines };
      });
    });
    if (!events.holds.length && !RA.ui.input.pointer.down) this.tip = null;
  };
  CodexScene.prototype.render = function (ctx, w, h) {
    var self = this;
    RA.gfx.Backgrounds.draw(ctx, 'menu', w, h, this.time);
    ctx.fillStyle = 'rgba(8,6,14,0.72)'; ctx.fillRect(0, 0, w, h);
    this.buttons = [];
    this.tipRects = [];
    var p = RA.core.Save.get();
    // abas
    var tabs = [
      { id: 'bestiario', label: RA.UI('bestiary') },
      { id: 'reliquias', label: RA.UI('relics') },
      { id: 'faces', label: RA.UI('faces') },
      { id: 'stats', label: RA.UI('statsTitle') }
    ];
    var tw = Math.min(80, (w - 12) / 4);
    tabs.forEach(function (t, i) {
      var b = { x: 6 + i * tw, y: 4, w: tw - 4, h: 16, small: true, glow: self.tab === t.id, label: t.label, fn: function () { self.tab = t.id; self.page = 0; } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
    });
    var y = 28;
    if (this.tab === 'bestiario') {
      var all = RA.data.Enemies.list.filter(function (e) { return !e.summonOnly; });
      var seen = Object.keys(p.seenEnemies).length;
      F.draw(ctx, seen + '/' + all.length, w / 2, y, { size: 1, color: '#8a94a8', align: 'center' });
      y += 12;
      var cols = Math.max(6, Math.floor((w - 16) / 36));
      var perPage = cols * Math.floor((h - y - 50) / 42);
      var pages = Math.ceil(all.length / perPage);
      var list = all.slice(this.page * perPage, this.page * perPage + perPage);
      list.forEach(function (e, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = w / 2 - cols * 36 / 2 + col * 36 + 3, yy = y + row * 42;
        var known = !!p.seenEnemies[e.id];
        ctx.globalAlpha = known ? 1 : 0.2;
        var spr = RA.gfx.EnemySprites.get(e.arch, e.region, 28, e.decor, 0);
        ctx.drawImage(spr, x, yy);
        ctx.globalAlpha = 1;
        if (!known) F.draw(ctx, '?', x + 14, yy + 10, { size: 1, color: '#8a94a8', align: 'center' });
        else self.tipRects.push({ x: x, y: yy, w: 30, h: 34, title: RA.T(e.name), lines: [RA.UI('hp') + ': ' + e.hp, e.tier, RA.T(RA.data.RegionsById[e.region].name)] });
      });
      if (pages > 1) { var pg = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pages, fn: function () { self.page = (self.page + 1) % pages; } }; W().btn(ctx, pg, this.time); this.buttons.push(pg); }
    } else if (this.tab === 'reliquias') {
      var allR = RA.data.Relics.list;
      F.draw(ctx, Object.keys(p.seenRelics).length + '/' + allR.length, w / 2, y, { size: 1, color: '#8a94a8', align: 'center' });
      y += 12;
      var perPageR = Math.floor((h - y - 50) / 12);
      var pagesR = Math.ceil(allR.length / perPageR);
      var listR = allR.slice(this.page * perPageR, this.page * perPageR + perPageR);
      var lx2 = Math.max(8, w / 2 - 150);
      listR.forEach(function (r) {
        var known = !!p.seenRelics[r.id];
        var rc = { comum: '#8a94a8', incomum: '#4ac86a', rara: '#4a8ae8', epica: '#8a4ae8', lendaria: '#ffd76a', amaldicoada: '#e84a5a' }[r.rarity];
        F.draw(ctx, known ? RA.T(r.name) : '???', lx2, y, { size: 1, color: known ? rc : '#4a4258' });
        if (known) F.draw(ctx, RA.T(r.desc).slice(0, 30), lx2 + 120, y, { size: 1, color: '#8a94a8' });
        y += 12;
      });
      if (pagesR > 1) { var pgR = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pagesR, fn: function () { self.page = (self.page + 1) % pagesR; } }; W().btn(ctx, pgR, this.time); this.buttons.push(pgR); }
    } else if (this.tab === 'faces') {
      var allF = RA.data.RuneFaces.list;
      F.draw(ctx, Object.keys(p.seenFaces).length + '/' + allF.length, w / 2, y, { size: 1, color: '#8a94a8', align: 'center' });
      y += 12;
      var perPageF = Math.floor((h - y - 50) / 12);
      var pagesF = Math.ceil(allF.length / perPageF);
      var listF = allF.slice(this.page * perPageF, this.page * perPageF + perPageF);
      var lx3 = Math.max(8, w / 2 - 150);
      listF.forEach(function (f2) {
        var known = !!p.seenFaces[f2.id];
        ctx.drawImage(RA.gfx.Icons.symbol(f2.sym), lx3, y, 9, 9);
        F.draw(ctx, known ? RA.T(f2.name) : '???', lx3 + 12, y, { size: 1, color: known ? '#e8e0d0' : '#4a4258' });
        if (known) F.draw(ctx, f2.cat + ' [' + f2.val + ']', lx3 + 130, y, { size: 1, color: '#8a94a8' });
        y += 12;
      });
      if (pagesF > 1) { var pgF = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pagesF, fn: function () { self.page = (self.page + 1) % pagesF; } }; W().btn(ctx, pgF, this.time); this.buttons.push(pgF); }
    } else {
      var st = p.stats;
      var rows = [
        [RA.T({ pt: 'Runs', en: 'Runs' }), st.runs],
        [RA.T({ pt: 'Vitórias', en: 'Wins' }), st.wins],
        [RA.T({ pt: 'Derrotas', en: 'Losses' }), st.losses],
        [RA.T({ pt: 'Inimigos derrotados', en: 'Enemies slain' }), st.kills],
        [RA.T({ pt: 'Maior dano em 1 turno', en: 'Max damage in 1 turn' }), st.maxDamageTurn],
        [RA.T({ pt: 'Maior cura em 1 luta', en: 'Max heal in 1 fight' }), st.maxHealFight],
        [RA.T({ pt: 'Combos disparados', en: 'Combos fired' }), st.combosDone],
        [RA.T({ pt: 'Ouro acumulado', en: 'Gold earned' }), st.goldEarned || 0],
        [RA.T({ pt: 'Melhor andar (Torre)', en: 'Best floor (Tower)' }), st.towerBest || 0],
        [RA.T({ pt: 'Segredos encontrados', en: 'Secrets found' }), (st.secretsFound || []).length],
        [RA.T({ pt: 'Maior Maldição vencida', en: 'Best Curse beaten' }), st.bestCurse || 0]
      ];
      rows.forEach(function (r, i) {
        F.draw(ctx, r[0], Math.max(8, w / 2 - 140), y + i * 12, { size: 1, color: '#c8c2d4' });
        F.draw(ctx, String(r[1]), Math.min(w - 20, w / 2 + 120), y + i * 12, { size: 1, color: '#ffe9a0' });
      });
    }
    var back = { x: w / 2 - 50, y: h - 26, w: 100, h: 20, label: RA.UI('back'), fn: function () { Sc().replace(new MainMenuScene()); } };
    W().btn(ctx, back, this.time); this.buttons.push(back);
    if (this.tip) W().tooltip(ctx, w, h, this.tip.x, this.tip.y, this.tip.title, this.tip.lines);
    W().renderToasts(ctx, w);
  };

  RA.ui.MainMenuScene = MainMenuScene;
  RA.ui.ModeSelectScene = ModeSelectScene;
  RA.ui.HeroSelectScene = HeroSelectScene;
  RA.ui.SettingsScene = SettingsScene;
  RA.ui.AchievementsScene = AchievementsScene;
  RA.ui.CodexScene = CodexScene;
})();
