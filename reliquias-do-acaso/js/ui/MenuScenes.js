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
    this.inspect = null;      // herói inspecionado (modal com o dado inteiro)
    this.inspectFace = 0;     // face selecionada no modal
    this.inspectDraft = false;
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
          self.inspect = id; self.inspectFace = 0; self.inspectDraft = true;
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
          // toque abre a inspeção do DADO do herói (escolha dentro do modal)
          var b = { x: x - 2, y: y - 2, w: 32, h: 38, label: '', fn: function () {
            self.inspect = def.id; self.inspectFace = 0; self.inspectDraft = false;
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
    // ================= MODAL: o DADO do herói, lado a lado =================
    if (this.inspect) {
      var idI = this.inspect;
      var defI = RA.data.Heroes.byId[idI];
      var skI = RA.gfx.Dice.skin(defI.skin);
      // o dado REAL de início: na campanha, o legado (evoluções + gravações)
      var facesI = defI.faces;
      var isLegacy = false;
      if (this.params.modeId === 'campanha') {
        var legI = RA.game.Run.campaignData().legacy[idI];
        if (legI && legI.faces && legI.faces.length >= defI.faces.length) { facesI = legI.faces; isLegacy = true; }
      }
      if (this.inspectFace >= facesI.length) this.inspectFace = 0;
      ctx.fillStyle = 'rgba(4,3,8,0.82)';
      ctx.fillRect(0, 0, w, h);
      this.buttons = [];
      this.tipRects = [];
      var pwI = Math.min(w - 8, 320);
      var colsI = Math.min(6, facesI.length);
      var rowsI = Math.ceil(facesI.length / colsI);
      var gapI = Math.min(38, Math.floor((pwI - 12) / colsI));
      var dieS = Math.min(24, gapI - 8);
      var phI = Math.min(h - 6, 56 + rowsI * (dieS + 18) + 82);
      var pxI = Math.round((w - pwI) / 2), pyI = Math.round(Math.max(3, (h - phI) / 2));
      W().panel(ctx, pxI, pyI, pwI, phI, { edge: skI.rim });
      // cabeçalho: retrato emoldurado + nome + HP + selo do dado
      ctx.fillStyle = '#0e0a16';
      ctx.fillRect(pxI + 5, pyI + 4, 24, 24);
      ctx.drawImage(RA.gfx.Portraits.get(idI), pxI + 6, pyI + 5, 22, 22);
      ctx.strokeStyle = skI.rim;
      ctx.strokeRect(pxI + 5.5, pyI + 4.5, 23, 23);
      F.draw(ctx, RA.T(defI.name).slice(0, Math.floor((pwI - 100) / 6)), pxI + 34, pyI + 5, { size: 1, color: '#ffe9a0', shadow: true });
      F.draw(ctx, '♥' + defI.hp, pxI + 34, pyI + 16, { size: 1, color: '#e84a5a' });
      // selo D6/D8/... (verde-legado quando herdado)
      var badgeT = 'D' + facesI.length + (isLegacy ? ' ' + RA.T({ pt: 'LEGADO', en: 'LEGACY' }) : '');
      var bw6 = F.measure(badgeT, 1, 1) + 10;
      ctx.fillStyle = isLegacy ? 'rgba(30,60,40,0.95)' : 'rgba(50,40,20,0.95)';
      ctx.fillRect(pxI + pwI - bw6 - 5, pyI + 5, bw6, 12);
      ctx.strokeStyle = isLegacy ? '#4ac86a' : '#c9a23a';
      ctx.strokeRect(pxI + pwI - bw6 - 4.5, pyI + 5.5, bw6 - 1, 11);
      F.draw(ctx, badgeT, pxI + pwI - bw6 / 2 - 5, pyI + 8, { size: 1, color: isLegacy ? '#6ee89a' : '#ffd76a', align: 'center' });
      // passiva
      F.wrap(RA.T(defI.passive.txt), 1, 1, pwI - 14).slice(0, 2).forEach(function (pl, pli) {
        F.draw(ctx, pl, pxI + 7, pyI + 32 + pli * 9, { size: 1, color: '#8ab4e8' });
      });
      // a grade de faces: dados de verdade, cada um tocável
      var gY = pyI + 56;
      var gx1 = pxI + Math.round((pwI - gapI * colsI) / 2) + Math.round((gapI - dieS) / 2);
      for (var fiI = 0; fiI < facesI.length; fiI++) {
        (function (fi2) {
          var fx2 = gx1 + (fi2 % colsI) * gapI;
          var fy2 = gY + Math.floor(fi2 / colsI) * (dieS + 18);
          var selF = self.inspectFace === fi2;
          if (selF) {
            var pkF = 0.5 + 0.4 * Math.sin(self.time * 5);
            ctx.strokeStyle = 'rgba(255,235,170,' + pkF + ')';
            ctx.strokeRect(fx2 - 2.5, fy2 - 2.5, dieS + 5, dieS + 7);
          }
          var dI = { skin: defI.skin, anim: { phase: 'idle', t: 0 }, resultFace: facesI[fi2], faces: facesI, used: false, locked: false, highlight: selF };
          RA.gfx.Dice.draw(ctx, dI, fx2, fy2, dieS, self.time + fi2);
          var bF = { x: fx2 - 3, y: fy2 - 3, w: dieS + 6, h: dieS + 10, label: '', fn: function () { self.inspectFace = fi2; RA.audio.sfx('click'); } };
          self.buttons.push(bF);
        })(fiI);
      }
      // descrição da face selecionada
      var fSel = facesI[this.inspectFace];
      var dY2 = gY + rowsI * (dieS + 18) + 2;
      F.draw(ctx, RA.T(fSel.name) + ' [' + fSel.val + ']', pxI + pwI / 2, dY2, { size: 1, color: '#ffe9a0', align: 'center', shadow: true });
      var dLines2 = [];
      W().descFace(fSel).forEach(function (dl) {
        F.wrap(String(dl), 1, 1, pwI - 14).forEach(function (dl2) { dLines2.push(dl2); });
      });
      // quantas linhas cabem entre a face e os botões (nunca corta no meio)
      var maxDL = Math.max(2, Math.floor(((pyI + phI - 26) - (dY2 + 11)) / 9));
      dLines2.slice(0, maxDL).forEach(function (dl3, dli) {
        F.draw(ctx, dl3, pxI + 7, dY2 + 11 + dli * 9, { size: 1, color: '#c8c2d4' });
      });
      // botões: ESCOLHER/REMOVER + FECHAR
      var mbw = Math.min(110, Math.floor((pwI - 20) / 2));
      var pickedIdxI = this.picked.indexOf(idI);
      var canAdd = pickedIdxI >= 0 || this.picked.length < this.size;
      var bPick = { x: pxI + pwI / 2 + 3, y: pyI + phI - 23, w: mbw, h: 18, small: true,
        glow: canAdd && pickedIdxI < 0, disabled: !canAdd,
        label: this.inspectDraft ? RA.T({ pt: 'ESCOLHER', en: 'PICK' }) : (pickedIdxI >= 0 ? RA.T({ pt: 'REMOVER', en: 'REMOVE' }) : RA.T({ pt: 'ESCOLHER', en: 'PICK' })),
        fn: function () {
          if (self.inspectDraft) {
            self.picked.push(idI);
            self.inspect = null; self.inspectDraft = false;
            RA.audio.sfx('confirm');
            if (self.picked.length >= self.size) self.start(false);
            else self.rollDraft();
            return;
          }
          var ixI = self.picked.indexOf(idI);
          if (ixI >= 0) self.picked.splice(ixI, 1);
          else if (self.picked.length < self.size) self.picked.push(idI);
          self.inspect = null;
          RA.audio.sfx('confirm');
        } };
      var bClose = { x: pxI + pwI / 2 - 3 - mbw, y: pyI + phI - 23, w: mbw, h: 18, small: true,
        label: RA.T({ pt: 'FECHAR', en: 'CLOSE' }), fn: function () { self.inspect = null; self.inspectDraft = false; } };
      W().btn(ctx, bPick, this.time);
      W().btn(ctx, bClose, this.time);
      this.buttons.push(bPick, bClose);
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
  AchievementsScene.prototype.enter = function () { this.time = 0; this.buttons = []; this.page = 0; this.inspectA = null; };
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
    // barra de progresso geral com MARCOS (títulos + recompensa)
    var pbW = Math.min(200, w - 60);
    var pbX = w / 2 - pbW / 2;
    W().hpBar(ctx, pbX, 18, pbW, got, all.length, 0, '#ffd76a');
    RA.game.Meta.MILESTONES.forEach(function (m) {
      var mx = pbX + Math.round(pbW * m.n / all.length);
      var hit = got >= m.n;
      W().diamond(ctx, mx, 20, hit ? 4 : 3, hit ? '#ffd76a' : '#4a4258');
      if (hit) W().diamond(ctx, mx, 20, 1.5, '#fff2b8');
    });
    // título atual + próximo marco
    var title = RA.game.Meta.title(p);
    var nextM = RA.game.Meta.MILESTONES.filter(function (m) { return got < m.n; })[0];
    var tLine = title
      ? RA.T({ pt: 'TÍTULO: ', en: 'TITLE: ' }) + RA.T(title)
      : RA.T({ pt: 'PRÓXIMO TÍTULO AOS 10 MARCOS', en: 'FIRST TITLE AT 10' });
    F.draw(ctx, tLine.slice(0, Math.floor((w - 12) / 6)), w / 2, 26, { size: 1, color: title ? '#ffd76a' : '#8a94a8', align: 'center', shadow: !!title });
    if (nextM) F.draw(ctx, (RA.T({ pt: 'Faltam ' + (nextM.n - got) + ' p/ ', en: nextM.n - got + ' more for ' }) + RA.T(nextM.name) + ' (+5 ' + RA.UI('gold') + ')').slice(0, Math.floor((w - 12) / 6)), w / 2, 36, { size: 1, color: '#6a6480', align: 'center' });
    var perPage = Math.floor((h - 94) / 20);
    var pages = Math.ceil(all.length / perPage);
    var list = all.slice(this.page * perPage, this.page * perPage + perPage);
    var y = 48, lx = Math.max(8, w / 2 - 150);
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
      // nome e descrição truncados pela LARGURA da linha (nunca sobrepõem)
      var achMax = Math.max(8, Math.floor((rw - 24) / 6));
      F.draw(ctx, (hidden ? '???' : RA.T(a.name)).slice(0, achMax), lx + 17, y + 2, { size: 1, color: has ? '#ffd76a' : '#8a94a8', shadow: has });
      F.draw(ctx, (hidden ? RA.UI('unlockHint') : RA.T(a.desc)).slice(0, achMax), lx + 17, y + 10, { size: 1, color: has ? '#c8c2d4' : '#4a4258' });
      // toque expande os detalhes
      self.buttons.push({ x: lx, y: y, w: rw, h: 18, label: '', fn: function () { self.inspectA = a.id; RA.audio.sfx('click'); } });
      y += 20;
    });
    if (pages > 1) {
      var pg = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pages, fn: function () { self.page = (self.page + 1) % pages; } };
      W().btn(ctx, pg, this.time); this.buttons.push(pg);
    }
    var back = { x: w / 2 - 50, y: h - 26, w: 100, h: 20, label: RA.UI('back'), fn: function () { Sc().replace(new MainMenuScene()); } };
    W().btn(ctx, back, this.time); this.buttons.push(back);

    // ============ MODAL: detalhes da conquista tocada ============
    if (this.inspectA) {
      var aDef = null;
      RA.data.Achievements.forEach(function (a2) { if (a2.id === self.inspectA) aDef = a2; });
      if (aDef) {
        var aHas = !!p.achievements[aDef.id];
        var aHidden = aDef.hidden && !aHas;
        ctx.fillStyle = 'rgba(4,3,8,0.82)';
        ctx.fillRect(0, 0, w, h);
        this.buttons = [];
        var pwA = Math.min(w - 12, 280);
        var aLines = [];
        F.wrap(aHidden ? RA.UI('unlockHint') : RA.T(aDef.desc), 1, 1, pwA - 16).forEach(function (al) { aLines.push(al); });
        aLines = aLines.slice(0, 4);
        var phA = 52 + aLines.length * 9 + 30;
        var pxA = Math.round((w - pwA) / 2), pyA = Math.round((h - phA) / 2);
        W().panel(ctx, pxA, pyA, pwA, phA, { edge: aHas ? '#ffd76a' : '#4a4258' });
        // estrela grande + brilho quando conquistada
        if (aHas) {
          var ag2 = ctx.createRadialGradient(pxA + 18, pyA + 16, 1, pxA + 18, pyA + 16, 20);
          ag2.addColorStop(0, 'rgba(255,215,106,0.35)');
          ag2.addColorStop(1, 'rgba(255,215,106,0)');
          ctx.fillStyle = ag2;
          ctx.fillRect(pxA + 2, pyA + 2, 34, 30);
        }
        ctx.drawImage(RA.gfx.Icons.symbol(aHas ? 'star' : 'skull'), pxA + 8, pyA + 8, 18, 18);
        F.draw(ctx, (aHidden ? '???' : RA.T(aDef.name)).slice(0, Math.floor((pwA - 40) / 6)), pxA + 32, pyA + 8, { size: 1, color: aHas ? '#ffd76a' : '#8a94a8', shadow: aHas });
        F.draw(ctx, aHas
          ? RA.T({ pt: 'CONQUISTADA em ' + new Date(p.achievements[aDef.id]).toLocaleDateString(), en: 'EARNED on ' + new Date(p.achievements[aDef.id]).toLocaleDateString() })
          : RA.T({ pt: 'AINDA BLOQUEADA', en: 'STILL LOCKED' }), pxA + 32, pyA + 19, { size: 1, color: aHas ? '#6ee89a' : '#5a5468' });
        ctx.fillStyle = 'rgba(201,162,58,0.5)';
        ctx.fillRect(pxA + 8, pyA + 32, pwA - 16, 1);
        aLines.forEach(function (al2, ali) {
          F.draw(ctx, al2, pxA + 8, pyA + 37 + ali * 9, { size: 1, color: '#c8c2d4' });
        });
        F.draw(ctx, RA.T({ pt: 'Marcos dão TÍTULOS e +5 de ouro na campanha!', en: 'Milestones grant TITLES and +5 campaign gold!' }).slice(0, Math.floor((pwA - 12) / 6)), pxA + 8, pyA + 39 + aLines.length * 9, { size: 1, color: '#8ab4e8' });
        var bCloseA = { x: pxA + (pwA - 90) / 2, y: pyA + phA - 22, w: 90, h: 17, small: true, label: RA.T({ pt: 'FECHAR', en: 'CLOSE' }), fn: function () { self.inspectA = null; } };
        W().btn(ctx, bCloseA, this.time);
        this.buttons.push(bCloseA);
      } else this.inspectA = null;
    }
    W().renderToasts(ctx, w);
  };

  // ---------------------------------------------------------- CODEX
  // descreve uma face de dado inimigo (mesma linguagem do cartão de batalha)
  function enemyFaceDesc(it) {
    var out = [];
    var TG = {
      front: { pt: 'na linha de frente', en: 'at the front line' },
      back: { pt: 'na linha de trás', en: 'at the back line' },
      weakest: { pt: 'no herói mais ferido', en: 'at the most wounded hero' },
      random: { pt: 'em alvo aleatório', en: 'at a random target' },
      marked: { pt: 'no herói marcado', en: 'at the marked hero' },
      allH: { pt: 'em TODOS os heróis', en: 'at ALL heroes' },
      allFront: { pt: 'em TODA a linha de frente', en: 'at the ENTIRE front line' }
    };
    function one(f) {
      var tg = TG[f.tgt] ? RA.T(TG[f.tgt]) : RA.T(TG.front);
      if (f.k === 'atk') out.push(RA.T({ pt: 'Ataca: ' + f.n + ' de dano', en: 'Attacks: ' + f.n + ' damage' }) + (f.times > 1 ? ' x' + f.times : '') + ' ' + tg + (f.pierce ? RA.T({ pt: ' (ignora escudo)', en: ' (ignores shield)' }) : ''));
      else if (f.k === 'drain') out.push(RA.T({ pt: 'Drena ' + f.n + ' ' + tg + ' e se cura', en: 'Drains ' + f.n + ' ' + tg + ' and heals itself' }));
      else if (f.k === 'none') out.push(RA.T({ pt: 'Hesita: não faz nada!', en: 'Hesitates: does nothing!' }));
      else if (f.k === 'shield') out.push(RA.T({ pt: 'Defende: +' + f.n + ' de escudo', en: 'Defends: +' + f.n + ' shield' }));
      else if (f.k === 'heal') out.push(f.who === 'self' ? RA.T({ pt: 'Cura ' + f.n + ' em si', en: 'Heals itself ' + f.n }) : RA.T({ pt: 'Cura ' + f.n + ' no aliado mais ferido', en: 'Heals most wounded ally ' + f.n }));
      else if (f.k === 'st') {
        var sd = RA.data.Statuses[f.s];
        var whoT = f.tgt === 'allH' ? RA.T({ pt: ' em todos os heróis', en: ' on all heroes' }) : f.tgt === 'self' ? RA.T({ pt: ' em si', en: ' on self' }) : f.tgt === 'allyE' ? RA.T({ pt: ' nos aliados', en: ' on allies' }) : ' ' + tg;
        out.push((sd ? RA.T(sd) : f.s) + ' ' + f.n + whoT);
        if (sd && sd.desc) out.push('(' + RA.T(sd.desc) + ')');
      }
      else if (f.k === 'summon') out.push(RA.T({ pt: 'Invoca reforços', en: 'Summons reinforcements' }));
      else if (f.k === 'special') {
        var spd = RA.data.EnemySpecialDesc && RA.data.EnemySpecialDesc[f.id];
        out.push((spd ? RA.T(spd) : RA.T({ pt: 'Habilidade especial', en: 'Special ability' })) + (f.n ? ' [' + f.n + ']' : ''));
      }
    }
    one(it);
    (it.and || []).forEach(function (sub) {
      var pre = out.length;
      one(sub);
      if (out[pre]) out[pre] = '+ ' + out[pre];
    });
    return out;
  }
  function enemyFaceIcon(it) {
    if (!it) return 'eye';
    return it.k === 'atk' ? 'sword' : it.k === 'drain' ? 'skull' : it.k === 'shield' ? 'shield' : it.k === 'heal' ? 'heart' : it.k === 'summon' ? 'star' : it.k === 'st' ? 'skull' : 'eye';
  }
  var EFAKES2 = [{ sym: 'sword', val: 0 }, { sym: 'shield', val: 0 }, { sym: 'skull', val: 0 }, { sym: 'eye', val: 0 }, { sym: 'heart', val: 0 }, { sym: 'star', val: 0 }];

  function CodexScene() {}
  CodexScene.prototype.enter = function () {
    this.time = 0; this.buttons = []; this.tab = 'bestiario'; this.page = 0;
    this.inspectE = null;   // inimigo inspecionado (modal com o dado dele)
    this.inspectFaceE = 0;
    this.showFury = false;  // alterna dado normal / dado de FÚRIA (chefes)
    this.inspectR = null;   // relíquia expandida
    this.inspectF = null;   // face rúnica expandida
  };
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
    var tabMax = Math.max(4, Math.floor((tw - 10) / 6));
    tabs.forEach(function (t, i) {
      var b = { x: 6 + i * tw, y: 4, w: tw - 4, h: 16, small: true, glow: self.tab === t.id, label: String(t.label).slice(0, tabMax), fn: function () { self.tab = t.id; self.page = 0; } };
      W().btn(ctx, b, self.time);
      self.buttons.push(b);
    });
    // barra de progresso da aba + contagem (gamificação do colecionador)
    function tabProgress(seen, total) {
      var pbW2 = Math.min(180, w - 90);
      W().hpBar(ctx, w / 2 - pbW2 / 2, 28, pbW2, seen, total, 0, '#ffd76a');
      F.draw(ctx, seen + '/' + total, w / 2 + pbW2 / 2 + 6, 26, { size: 1, color: '#8a94a8' });
    }
    // linha-cartão de 2 andares (nome + descrição), truncada por MEDIDA
    function cardRow(x, yy, rw2, accent, name, desc, known, iconDraw) {
      var g2 = ctx.createLinearGradient(0, yy, 0, yy + 19);
      g2.addColorStop(0, known ? 'rgba(38,31,54,0.94)' : 'rgba(20,16,28,0.9)');
      g2.addColorStop(1, known ? 'rgba(18,14,26,0.94)' : 'rgba(12,10,18,0.9)');
      ctx.fillStyle = g2;
      ctx.fillRect(x, yy, rw2, 19);
      ctx.strokeStyle = known ? (accent || '#4a4258') : '#26222f';
      ctx.strokeRect(x + 0.5, yy + 0.5, rw2 - 1, 18);
      if (iconDraw) iconDraw(x + 4, yy + 5);
      var maxCh3 = Math.max(6, Math.floor((rw2 - 22) / 6));
      F.draw(ctx, (name || '').slice(0, maxCh3), x + 18, yy + 2, { size: 1, color: known ? (accent || '#e8e0d0') : '#4a4258' });
      if (desc) F.draw(ctx, desc.slice(0, maxCh3), x + 18, yy + 10, { size: 1, color: known ? '#8a94a8' : '#3a3444' });
    }
    var y = 40;
    if (this.tab === 'bestiario') {
      var all = RA.data.Enemies.list.filter(function (e) { return !e.summonOnly; });
      tabProgress(Object.keys(p.seenEnemies).length, all.length);
      var cols = Math.max(5, Math.floor((w - 16) / 38));
      var perPage = cols * Math.max(1, Math.floor((h - y - 50) / 44));
      var pages = Math.ceil(all.length / perPage);
      var list = all.slice(this.page * perPage, this.page * perPage + perPage);
      list.forEach(function (e, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = w / 2 - cols * 38 / 2 + col * 38 + 4, yy = y + row * 44;
        var known = !!p.seenEnemies[e.id];
        // célula emoldurada (borda pela raridade do inimigo)
        var tierC = e.tier === 'chefe' ? '#e8a04a' : e.tier === 'secreto' ? '#e84a5a' : e.tier === 'elite' ? '#8a4ae8' : '#3a3450';
        ctx.fillStyle = known ? 'rgba(30,24,44,0.9)' : 'rgba(14,11,20,0.85)';
        ctx.fillRect(x - 2, yy - 2, 34, 38);
        ctx.strokeStyle = known ? tierC : '#241f2e';
        ctx.strokeRect(x - 1.5, yy - 1.5, 33, 37);
        ctx.globalAlpha = known ? 1 : 0.2;
        var spr = RA.gfx.EnemySprites.get(e.arch, e.region, 28, e.decor, 0);
        ctx.drawImage(spr, x, yy);
        ctx.globalAlpha = 1;
        if (!known) F.draw(ctx, '?', x + 14, yy + 12, { size: 1, color: '#5a5468', align: 'center' });
        else {
          // toque abre a ficha completa do inimigo (status + dado dele)
          self.buttons.push({ x: x - 2, y: yy - 2, w: 34, h: 38, label: '', fn: function () {
            self.inspectE = e.id; self.inspectFaceE = 0; self.showFury = false;
            RA.audio.sfx('click');
          } });
          self.tipRects.push({ x: x - 2, y: yy - 2, w: 34, h: 38, title: RA.T(e.name), lines: [RA.UI('hp') + ': ' + e.hp, e.tier + ' - D' + ((e.die || []).length || 6), RA.T(RA.data.RegionsById[e.region].name)] });
        }
      });
      if (pages > 1) { var pg = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pages, fn: function () { self.page = (self.page + 1) % pages; } }; W().btn(ctx, pg, this.time); this.buttons.push(pg); }
    } else if (this.tab === 'reliquias') {
      var allR = RA.data.Relics.list;
      tabProgress(Object.keys(p.seenRelics).length, allR.length);
      var rwR = Math.min(300, w - 12), rxR = Math.round((w - rwR) / 2);
      var perPageR = Math.max(3, Math.floor((h - y - 48) / 21));
      var pagesR = Math.ceil(allR.length / perPageR);
      var listR = allR.slice(this.page * perPageR, this.page * perPageR + perPageR);
      listR.forEach(function (r, ri) {
        var known = !!p.seenRelics[r.id];
        var rc = { comum: '#8a94a8', incomum: '#4ac86a', rara: '#4a8ae8', epica: '#8a4ae8', lendaria: '#ffd76a', amaldicoada: '#e84a5a' }[r.rarity];
        cardRow(rxR, y + ri * 21, rwR, rc, known ? RA.T(r.name) : '???', known ? RA.T(r.desc) : RA.T({ pt: 'ainda não encontrada', en: 'not found yet' }), known,
          function (ix, iy) { W().diamond(ctx, ix + 4, iy + 4, 4, known ? rc : '#3a3444'); });
        if (known) self.buttons.push({ x: rxR, y: y + ri * 21, w: rwR, h: 19, label: '', fn: function () { self.inspectR = r.id; RA.audio.sfx('click'); } });
      });
      if (pagesR > 1) { var pgR = { x: w / 2 - 20, y: h - 46, w: 40, h: 14, small: true, label: (this.page + 1) + '/' + pagesR, fn: function () { self.page = (self.page + 1) % pagesR; } }; W().btn(ctx, pgR, this.time); this.buttons.push(pgR); }
    } else if (this.tab === 'faces') {
      var allF = RA.data.RuneFaces.list;
      tabProgress(Object.keys(p.seenFaces).length, allF.length);
      var rwF = Math.min(300, w - 12), rxF = Math.round((w - rwF) / 2);
      var perPageF = Math.max(3, Math.floor((h - y - 48) / 21));
      var pagesF = Math.ceil(allF.length / perPageF);
      var listF = allF.slice(this.page * perPageF, this.page * perPageF + perPageF);
      listF.forEach(function (f2, fi) {
        var known = !!p.seenFaces[f2.id];
        cardRow(rxF, y + fi * 21, rwF, f2.rare ? '#ffd76a' : '#c8c2d4', known ? (RA.T(f2.name) + ' [' + f2.val + ']') : '???',
          known ? f2.cat : RA.T({ pt: 'ainda não vista', en: 'not seen yet' }), known,
          function (ix, iy) {
            ctx.globalAlpha = known ? 1 : 0.35;
            ctx.drawImage(RA.gfx.Icons.symbol(f2.sym), ix, iy, 10, 10);
            ctx.globalAlpha = 1;
          });
        if (known) self.buttons.push({ x: rxF, y: y + fi * 21, w: rwF, h: 19, label: '', fn: function () { self.inspectF = f2.id; RA.audio.sfx('click'); } });
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
      var statMax = Math.max(10, Math.floor((w - 56) / 6));
      rows.forEach(function (r, i) {
        F.draw(ctx, String(r[0]).slice(0, statMax), Math.max(8, w / 2 - 140), y + i * 12, { size: 1, color: '#c8c2d4' });
        F.draw(ctx, String(r[1]), Math.min(w - 12, w / 2 + 132), y + i * 12, { size: 1, color: '#ffe9a0', align: 'right' });
      });
    }
    var back = { x: w / 2 - 50, y: h - 26, w: 100, h: 20, label: RA.UI('back'), fn: function () { Sc().replace(new MainMenuScene()); } };
    W().btn(ctx, back, this.time); this.buttons.push(back);

    // ============== MODAL: relíquia expandida ==============
    if (this.inspectR) {
      var rDef = RA.data.Relics.byId[this.inspectR];
      if (rDef) {
        var rcM = { comum: '#8a94a8', incomum: '#4ac86a', rara: '#4a8ae8', epica: '#8a4ae8', lendaria: '#ffd76a', amaldicoada: '#e84a5a' }[rDef.rarity];
        ctx.fillStyle = 'rgba(4,3,8,0.82)';
        ctx.fillRect(0, 0, w, h);
        this.buttons = [];
        this.tipRects = [];
        var pwR = Math.min(w - 12, 280);
        var rLines = [];
        F.wrap(RA.T(rDef.desc), 1, 1, pwR - 16).forEach(function (rl) { rLines.push(rl); });
        rLines = rLines.slice(0, 5);
        var phR = 50 + rLines.length * 9 + 30;
        var pxR2 = Math.round((w - pwR) / 2), pyR2 = Math.round((h - phR) / 2);
        W().panel(ctx, pxR2, pyR2, pwR, phR, { edge: rcM });
        // losango grande da raridade com halo
        var rg3 = ctx.createRadialGradient(pxR2 + 18, pyR2 + 17, 1, pxR2 + 18, pyR2 + 17, 18);
        rg3.addColorStop(0, 'rgba(255,255,255,0.15)');
        rg3.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = rg3;
        ctx.fillRect(pxR2 + 4, pyR2 + 4, 28, 26);
        W().diamond(ctx, pxR2 + 18, pyR2 + 17, 10, rcM);
        W().diamond(ctx, pxR2 + 18, pyR2 + 17, 5, '#fff2b8');
        F.draw(ctx, RA.T(rDef.name).slice(0, Math.floor((pwR - 42) / 6)), pxR2 + 34, pyR2 + 8, { size: 1, color: rcM, shadow: true });
        F.draw(ctx, rDef.rarity.toUpperCase(), pxR2 + 34, pyR2 + 19, { size: 1, color: '#8a94a8' });
        ctx.fillStyle = 'rgba(201,162,58,0.5)';
        ctx.fillRect(pxR2 + 8, pyR2 + 32, pwR - 16, 1);
        rLines.forEach(function (rl2, rli) {
          F.draw(ctx, rl2, pxR2 + 8, pyR2 + 37 + rli * 9, { size: 1, color: '#c8c2d4' });
        });
        var bCloseR = { x: pxR2 + (pwR - 90) / 2, y: pyR2 + phR - 22, w: 90, h: 17, small: true, label: RA.T({ pt: 'FECHAR', en: 'CLOSE' }), fn: function () { self.inspectR = null; } };
        W().btn(ctx, bCloseR, this.time);
        this.buttons.push(bCloseR);
      } else this.inspectR = null;
    }

    // ============== MODAL: face rúnica expandida (com o dado desenhado) ==============
    if (this.inspectF) {
      var fDef = RA.data.RuneFaces.byId[this.inspectF];
      if (fDef) {
        ctx.fillStyle = 'rgba(4,3,8,0.82)';
        ctx.fillRect(0, 0, w, h);
        this.buttons = [];
        this.tipRects = [];
        var pwF = Math.min(w - 12, 280);
        var fLines = [];
        W().descFace(fDef).forEach(function (fl) {
          F.wrap(String(fl), 1, 1, pwF - 16).forEach(function (fl2) { fLines.push(fl2); });
        });
        fLines = fLines.slice(0, 5);
        var phF = 58 + fLines.length * 9 + 30;
        var pxF2 = Math.round((w - pwF) / 2), pyF2 = Math.round((h - phF) / 2);
        W().panel(ctx, pxF2, pyF2, pwF, phF, { edge: fDef.rare ? '#ffd76a' : '#5c4f74' });
        // o dado com a face, grandão
        var dF2 = { skin: fDef.rare ? 'dourado' : 'cinza', anim: { phase: 'idle', t: 0 }, resultFace: fDef, faces: [fDef], used: false, locked: false, highlight: !!fDef.rare };
        RA.gfx.Dice.draw(ctx, dF2, pxF2 + 8, pyF2 + 8, 30, this.time);
        F.draw(ctx, (RA.T(fDef.name) + ' [' + fDef.val + ']').slice(0, Math.floor((pwF - 56) / 6)), pxF2 + 46, pyF2 + 10, { size: 1, color: '#ffe9a0', shadow: true });
        F.draw(ctx, (fDef.cat + (fDef.rare ? '  *RARA*' : '')).slice(0, Math.floor((pwF - 56) / 6)), pxF2 + 46, pyF2 + 21, { size: 1, color: fDef.rare ? '#ffd76a' : '#8a94a8' });
        if (fDef.uses !== undefined) F.draw(ctx, RA.UI('usesLeft') + ': ' + fDef.uses, pxF2 + 46, pyF2 + 31, { size: 1, color: '#e8a04a' });
        ctx.fillStyle = 'rgba(201,162,58,0.5)';
        ctx.fillRect(pxF2 + 8, pyF2 + 44, pwF - 16, 1);
        fLines.forEach(function (fl3, fli) {
          F.draw(ctx, fl3, pxF2 + 8, pyF2 + 49 + fli * 9, { size: 1, color: '#c8c2d4' });
        });
        var bCloseF = { x: pxF2 + (pwF - 90) / 2, y: pyF2 + phF - 22, w: 90, h: 17, small: true, label: RA.T({ pt: 'FECHAR', en: 'CLOSE' }), fn: function () { self.inspectF = null; } };
        W().btn(ctx, bCloseF, this.time);
        this.buttons.push(bCloseF);
      } else this.inspectF = null;
    }

    // ============== MODAL: ficha do inimigo (status + o DADO dele) ==============
    if (this.inspectE) {
      var eDef = RA.data.Enemies.byId[this.inspectE];
      if (!eDef) { this.inspectE = null; } else {
        var tierC2 = eDef.tier === 'chefe' ? '#e8a04a' : eDef.tier === 'secreto' ? '#e84a5a' : eDef.tier === 'elite' ? '#8a4ae8' : '#8a94a8';
        var dieE = (this.showFury && eDef.die2) ? eDef.die2 : (eDef.die || []);
        if (this.inspectFaceE >= dieE.length) this.inspectFaceE = 0;
        ctx.fillStyle = 'rgba(4,3,8,0.85)';
        ctx.fillRect(0, 0, w, h);
        this.buttons = [];
        this.tipRects = [];
        var pwE = Math.min(w - 8, 320);
        var colsE = Math.min(6, Math.max(1, dieE.length));
        var rowsE = Math.ceil(dieE.length / colsE);
        var gapE = Math.min(36, Math.floor((pwE - 12) / colsE));
        var dieSE = Math.min(22, gapE - 8);
        var phE = Math.min(h - 6, 66 + rowsE * (dieSE + 16) + 64);
        var pxE = Math.round((w - pwE) / 2), pyE = Math.round(Math.max(3, (h - phE) / 2));
        W().panel(ctx, pxE, pyE, pwE, phE, { edge: this.showFury ? '#ff5a6a' : tierC2 });
        // cabeçalho: sprite grande + nome + tier + HP + região
        ctx.fillStyle = 'rgba(10,8,16,0.9)';
        ctx.fillRect(pxE + 5, pyE + 4, 34, 34);
        ctx.strokeStyle = tierC2;
        ctx.strokeRect(pxE + 5.5, pyE + 4.5, 33, 33);
        var sprE = RA.gfx.EnemySprites.get(eDef.arch, eDef.region, 60, eDef.decor, Math.floor(this.time * 2) % 2);
        ctx.drawImage(sprE, pxE + 7, pyE + 6, 30, 30);
        F.draw(ctx, RA.T(eDef.name).slice(0, Math.floor((pwE - 110) / 6)), pxE + 44, pyE + 5, { size: 1, color: '#ffe9a0', shadow: true });
        F.draw(ctx, '♥' + eDef.hp + '  ' + eDef.tier.toUpperCase(), pxE + 44, pyE + 15, { size: 1, color: tierC2 });
        F.draw(ctx, RA.T(RA.data.RegionsById[eDef.region].name).slice(0, Math.floor((pwE - 110) / 6)), pxE + 44, pyE + 25, { size: 1, color: '#8a94a8' });
        // selo do dado (vermelho quando é o de fúria)
        var badgeE = 'D' + dieE.length + (this.showFury ? ' ' + RA.T({ pt: 'FÚRIA', en: 'FURY' }) : '');
        var bwE = F.measure(badgeE, 1, 1) + 10;
        ctx.fillStyle = this.showFury ? 'rgba(70,20,28,0.95)' : 'rgba(50,40,20,0.95)';
        ctx.fillRect(pxE + pwE - bwE - 5, pyE + 5, bwE, 12);
        ctx.strokeStyle = this.showFury ? '#ff5a6a' : '#c9a23a';
        ctx.strokeRect(pxE + pwE - bwE - 4.5, pyE + 5.5, bwE - 1, 11);
        F.draw(ctx, badgeE, pxE + pwE - bwE / 2 - 5, pyE + 8, { size: 1, color: this.showFury ? '#ff9aaa' : '#ffd76a', align: 'center' });
        // resistência / fraqueza
        var traits = [];
        if (eDef.resist) traits.push(RA.T({ pt: 'Resiste: ', en: 'Resists: ' }) + eDef.resist);
        if (eDef.weak) traits.push(RA.T({ pt: 'Fraco a: ', en: 'Weak to: ' }) + eDef.weak);
        if (traits.length) F.draw(ctx, traits.join('   ').slice(0, Math.floor((pwE - 12) / 6)), pxE + 6, pyE + 42, { size: 1, color: '#8ab4e8' });
        F.draw(ctx, RA.T({ pt: 'O DADO DELE (toque numa face):', en: 'ITS DIE (tap a face):' }), pxE + 6, pyE + 52, { size: 1, color: '#c8b8e8' });
        // grade das faces do dado, como dados pretos de verdade
        var gYE = pyE + 64;
        var gx2 = pxE + Math.round((pwE - gapE * colsE) / 2) + Math.round((gapE - dieSE) / 2);
        for (var feI = 0; feI < dieE.length; feI++) {
          (function (fe2) {
            var fx3 = gx2 + (fe2 % colsE) * gapE;
            var fy3 = gYE + Math.floor(fe2 / colsE) * (dieSE + 16);
            var selE = self.inspectFaceE === fe2;
            if (selE) {
              var pkE = 0.5 + 0.4 * Math.sin(self.time * 5);
              ctx.strokeStyle = self.showFury ? 'rgba(255,110,122,' + pkE + ')' : 'rgba(255,235,170,' + pkE + ')';
              ctx.strokeRect(fx3 - 2.5, fy3 - 2.5, dieSE + 5, dieSE + 7);
            }
            var it3 = dieE[fe2];
            var dE = { skin: 'preto', anim: { phase: 'idle', t: 0 }, resultFace: { sym: enemyFaceIcon(it3), val: it3.n || 0 }, faces: EFAKES2, used: false, locked: false, highlight: selE };
            RA.gfx.Dice.draw(ctx, dE, fx3, fy3, dieSE, self.time + fe2);
            self.buttons.push({ x: fx3 - 3, y: fy3 - 3, w: dieSE + 6, h: dieSE + 10, label: '', fn: function () { self.inspectFaceE = fe2; RA.audio.sfx('click'); } });
          })(feI);
        }
        // descrição da face selecionada
        var fSelE = dieE[this.inspectFaceE];
        var dYE = gYE + rowsE * (dieSE + 16) + 2;
        if (fSelE) {
          F.draw(ctx, (fSelE.nm ? '"' + RA.T(fSelE.nm) + '"' : RA.T({ pt: 'FACE ' + (this.inspectFaceE + 1), en: 'FACE ' + (this.inspectFaceE + 1) })).slice(0, Math.floor((pwE - 12) / 6)), pxE + pwE / 2, dYE, { size: 1, color: this.showFury ? '#ff9aaa' : '#ffe9a0', align: 'center', shadow: true });
          var eLines = [];
          enemyFaceDesc(fSelE).forEach(function (el) {
            F.wrap(String(el), 1, 1, pwE - 14).forEach(function (el2) { eLines.push(el2); });
          });
          eLines.slice(0, 2).forEach(function (el3, eli) {
            F.draw(ctx, el3, pxE + 7, dYE + 11 + eli * 9, { size: 1, color: '#c8c2d4' });
          });
        }
        // botões: FÚRIA (se chefe) + FECHAR
        var mbwE = Math.min(110, Math.floor((pwE - 20) / 2));
        if (eDef.die2) {
          var bFury = { x: pxE + pwE / 2 + 3, y: pyE + phE - 23, w: mbwE, h: 18, small: true,
            accent: '#e84a5a', glow: !this.showFury,
            label: this.showFury ? RA.T({ pt: 'DADO NORMAL', en: 'NORMAL DIE' }) : RA.T({ pt: 'DADO DE FÚRIA', en: 'FURY DIE' }),
            fn: function () { self.showFury = !self.showFury; self.inspectFaceE = 0; RA.audio.sfx('click'); } };
          W().btn(ctx, bFury, this.time);
          this.buttons.push(bFury);
        }
        var bCloseE = { x: eDef.die2 ? pxE + pwE / 2 - 3 - mbwE : pxE + (pwE - mbwE) / 2, y: pyE + phE - 23, w: mbwE, h: 18, small: true,
          label: RA.T({ pt: 'FECHAR', en: 'CLOSE' }), fn: function () { self.inspectE = null; } };
        W().btn(ctx, bCloseE, this.time);
        this.buttons.push(bCloseE);
      }
    }
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
