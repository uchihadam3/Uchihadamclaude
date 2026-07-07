// Widgets: botões, painéis, tooltips, toasts (conquistas/desbloqueios) e
// utilidades de layout compartilhadas por todas as cenas.
(function () {
  var F = RA.gfx.Font;

  var W = {
    inRect: function (x, y, r) { return x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h; },

    btn: function (ctx, b, time) {
      var acc = b.accent || '#8a6e2e';
      var base = b.disabled ? '#241f2c' : (b.danger ? '#4a1622' : '#2a2436');
      var edge = b.disabled ? '#38323f' : (b.danger ? '#8a2432' : acc);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(b.x + 2, b.y + 3, b.w, b.h);
      ctx.fillStyle = base;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeStyle = edge;
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
      if (!b.disabled && b.glow) {
        var p = 0.4 + 0.3 * Math.sin((time || 0) * 5);
        ctx.strokeStyle = 'rgba(255,215,106,' + p + ')';
        ctx.strokeRect(b.x - 1.5, b.y - 1.5, b.w + 3, b.h + 3);
      }
      var size = b.small ? 1 : (b.size || 1);
      var col = b.disabled ? '#5a5468' : (b.color || '#e8e0d0');
      F.draw(ctx, b.label, b.x + b.w / 2, b.y + (b.h - 7 * size) / 2, { size: size, color: col, align: 'center', shadow: !b.disabled });
      return b;
    },

    panel: function (ctx, x, y, w, h, opts) {
      opts = opts || {};
      ctx.fillStyle = opts.bg || 'rgba(16,12,24,0.92)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = opts.edge || '#4a4258';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      // cantos decorados
      ctx.fillStyle = opts.corner || '#8a6e2e';
      [[x, y], [x + w - 3, y], [x, y + h - 3], [x + w - 3, y + h - 3]].forEach(function (c) {
        ctx.fillRect(c[0], c[1], 3, 3);
      });
    },

    hpBar: function (ctx, x, y, w, hp, maxHp, shield, color) {
      ctx.fillStyle = '#181420';
      ctx.fillRect(x - 1, y - 1, w + 2, 5);
      var pct = Math.max(0, hp / maxHp);
      ctx.fillStyle = color || (pct > 0.5 ? '#4ac86a' : pct > 0.25 ? '#e8c84a' : '#e84a5a');
      ctx.fillRect(x, y, Math.round(w * pct), 3);
      if (shield > 0) {
        ctx.fillStyle = '#8a94a8';
        ctx.fillRect(x, y - 3, Math.min(w, Math.round(w * shield / maxHp)), 2);
      }
    },

    // tooltip com quebra automática, posicionada sem sair da tela
    tooltip: function (ctx, screenW, screenH, px, py, title, lines, titleColor) {
      var maxW = Math.min(190, screenW - 20);
      var wrapped = [];
      (lines || []).forEach(function (l) {
        F.wrap(String(l), 1, 1, maxW - 12).forEach(function (x2) { wrapped.push(x2); });
      });
      var hgt = 16 + wrapped.length * 9;
      var wdt = Math.max(F.measure(title || '', 1, 1) + 14, 90);
      wrapped.forEach(function (l) { wdt = Math.max(wdt, F.measure(l, 1, 1) + 12); });
      wdt = Math.min(wdt, maxW);
      var x = Math.max(4, Math.min(px - wdt / 2, screenW - wdt - 4));
      var y = py - hgt - 8;
      if (y < 4) y = Math.min(py + 14, screenH - hgt - 4);
      W.panel(ctx, x, y, wdt, hgt, { bg: 'rgba(12,9,20,0.96)' });
      if (title) F.draw(ctx, title, x + 6, y + 5, { size: 1, color: titleColor || '#ffe9a0' });
      wrapped.forEach(function (l, i) {
        F.draw(ctx, l, x + 6, y + 15 + i * 9, { size: 1, color: '#c8c2d4' });
      });
    },

    // fila de toasts (Meta.toasts) — canto superior
    toastT: 0,
    updateToasts: function (dt) {
      var q = RA.game.Meta ? RA.game.Meta.toasts : [];
      if (!q.length) { W.toastT = 0; return; }
      W.toastT += dt;
      if (W.toastT > 2.6) { q.shift(); W.toastT = 0; }
    },
    renderToasts: function (ctx, w) {
      var q = RA.game.Meta ? RA.game.Meta.toasts : [];
      if (!q.length) return;
      var t0 = q[0];
      var a = Math.min(1, W.toastT * 5, (2.6 - W.toastT) * 3);
      var wd = Math.max(F.measure(t0.title, 1, 1), F.measure(t0.sub || '', 1, 1)) + 24;
      var x = (w - wd) / 2, y = 6;
      ctx.globalAlpha = Math.max(0, a);
      W.panel(ctx, x, y, wd, 24, { corner: t0.kind === 'secret' ? '#8a4ae8' : '#ffd76a', edge: t0.kind === 'secret' ? '#8a4ae8' : '#8a6e2e' });
      F.draw(ctx, t0.title, x + wd / 2, y + 4, { size: 1, color: '#ffe9a0', align: 'center' });
      if (t0.sub) F.draw(ctx, t0.sub, x + wd / 2, y + 13, { size: 1, color: '#c8c2d4', align: 'center' });
      ctx.globalAlpha = 1;
    },

    // vinheta suave (foco no centro) — cacheada por resolução
    _vig: null, _vigKey: '',
    vignette: function (ctx, w, h) {
      var key = w + 'x' + h;
      if (W._vigKey !== key) {
        var cv = document.createElement('canvas');
        cv.width = w * 2; cv.height = h * 2;
        var c2 = cv.getContext('2d');
        var g = c2.createRadialGradient(w, h, Math.min(w, h) * 0.9, w, h, Math.max(w, h) * 1.5);
        g.addColorStop(0, 'rgba(6,4,12,0)');
        g.addColorStop(1, 'rgba(6,4,12,0.5)');
        c2.fillStyle = g;
        c2.fillRect(0, 0, w * 2, h * 2);
        W._vig = cv; W._vigKey = key;
      }
      ctx.drawImage(W._vig, 0, 0, w, h);
    },

    // descrição curta de uma face (gerada do DSL p/ tooltips)
    descFace: function (face) {
      var out = [];
      var v = face.val;
      // primeira linha: em quem essa face pode ser usada
      var TGT = {
        enemy: { pt: 'Alvo: um inimigo', en: 'Target: one enemy' },
        ally: { pt: 'Alvo: um aliado', en: 'Target: one ally' },
        self: { pt: 'Alvo: você mesmo (2 toques no dado)', en: 'Target: self (tap die twice)' },
        allE: { pt: 'Alvo: TODOS os inimigos (2 toques)', en: 'Target: ALL enemies (tap twice)' },
        allA: { pt: 'Alvo: todos os aliados (2 toques)', en: 'Target: all allies (tap twice)' },
        any: { pt: 'Alvo: inimigo ou aliado', en: 'Target: enemy or ally' },
        downed: { pt: 'Alvo: um aliado caído', en: 'Target: a downed ally' },
        none: { pt: 'Sem alvo: 2 toques no dado usam', en: 'No target: tap die twice' }
      };
      if (TGT[face.tgt]) out.push(RA.T(TGT[face.tgt]));
      (face.fx || []).forEach(function (fx) {
        var n = fx.n !== undefined ? fx.n : v;
        switch (fx.k) {
          case 'dmg': {
            var s = RA.T({ pt: 'Dano ' + n, en: 'Damage ' + n });
            if (fx.times > 1) s += ' x' + fx.times;
            if (fx.magic) s += RA.T({ pt: ' (magia)', en: ' (magic)' });
            if (fx.ignoreShield) s += RA.T({ pt: ', ignora escudo', en: ', ignores shield' });
            if (fx.anyRow) s += RA.T({ pt: ', qualquer linha', en: ', any row' });
            if (fx.onlyHalfHp) s += RA.T({ pt: ', alvo <50% HP', en: ', target <50% HP' });
            if (fx.missChance) s += RA.T({ pt: ', ' + Math.round(fx.missChance * 100) + '% de errar', en: ', ' + Math.round(fx.missChance * 100) + '% miss' });
            if (fx.healOnKill) s += RA.T({ pt: ', cura ' + fx.healOnKill + ' ao matar', en: ', heal ' + fx.healOnKill + ' on kill' });
            out.push(s);
            break;
          }
          case 'heal': out.push(RA.T({ pt: 'Cura ' + n, en: 'Heal ' + n })); break;
          case 'healSelf': out.push(RA.T({ pt: 'Cura ' + n + ' em si', en: 'Heal self ' + n })); break;
          case 'healLowest': out.push(RA.T({ pt: 'Cura ' + n + ' no aliado MAIS FERIDO (escolhe sozinho)', en: 'Heals ' + n + ' on MOST WOUNDED ally (auto)' })); break;
          case 'shield': out.push(RA.T({ pt: 'Escudo ' + n, en: 'Shield ' + n }) + (fx.who === 'allA' ? RA.T({ pt: ' em todos os aliados', en: ' to all allies' }) : fx.who === 'two' ? RA.T({ pt: ' no alvo E no aliado mais ferido', en: ' to target AND most wounded ally' }) : fx.who === 'self' ? RA.T({ pt: ' em si mesmo', en: ' on self' }) : '')); break;
          case 'st': {
            var sd = RA.data.Statuses[fx.s];
            var whoTxt = fx.who === 'allE' ? RA.T({ pt: ' em todos os inimigos', en: ' to all enemies' }) : fx.who === 'allA' ? RA.T({ pt: ' em todos os aliados', en: ' to all allies' }) : fx.who === 'self' ? RA.T({ pt: ' em si mesmo', en: ' on self' }) : RA.T({ pt: ' no alvo', en: ' on target' });
            out.push((sd ? RA.T(sd) : fx.s) + ' ' + n + whoTxt);
            if (sd && sd.desc) out.push('(' + RA.T(sd.desc) + ')');
            break;
          }
          case 'cleanse': out.push(RA.T({ pt: 'Remove status negativos', en: 'Removes debuffs' })); break;
          case 'revive': out.push(RA.T({ pt: 'Revive com ' + (fx.hp || 3) + ' HP', en: 'Revive at ' + (fx.hp || 3) + ' HP' })); break;
          case 'taunt': case 'tauntStrong': case 'tauntAll': out.push(RA.T({ pt: 'Provoca inimigos', en: 'Taunts enemies' })); break;
          case 'protect': out.push(RA.T({ pt: 'Protege um aliado', en: 'Protects an ally' })); break;
          case 'selfDmg': out.push(RA.T({ pt: 'Custa ' + (fx.n || 1) + ' HP', en: 'Costs ' + (fx.n || 1) + ' HP' })); break;
          case 'summon': out.push(RA.T({ pt: 'Invoca aliado', en: 'Summons ally' })); break;
          case 'coin': out.push('+' + n + ' ' + RA.UI('gold')); break;
          case 'breakShield': out.push(RA.T({ pt: 'Quebra ' + (fx.n || '') + ' escudo', en: 'Breaks ' + (fx.n || '') + ' shield' })); break;
          default: out.push(RA.T({ pt: 'Efeito especial', en: 'Special effect' }));
        }
      });
      if (face.uses !== undefined) out.push(RA.UI('usesLeft') + ': ' + face.uses);
      if (face.cracked) out.push(RA.UI('crackedSide'));
      return out;
    }
  };

  RA.ui.W = W;
})();
