// Widgets: botões, painéis, tooltips, toasts (conquistas/desbloqueios) e
// utilidades de layout compartilhadas por todas as cenas.
(function () {
  var F = RA.gfx.Font;

  // losango decorativo (ornamentos de cabeçalho/cantos)
  function diamond(ctx, cx, cy, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx + r, cy);
    ctx.lineTo(cx, cy + r);
    ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fill();
  }

  var W = {
    inRect: function (x, y, r) { return x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h; },
    diamond: diamond,

    btn: function (ctx, b, time) {
      var t = time || 0;
      var acc = b.accent || '#8a6e2e';
      var edge = b.disabled ? '#38323f' : (b.danger ? '#8a2432' : acc);
      // sombra profunda
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(b.x + 2, b.y + 3, b.w, b.h);
      // corpo com gradiente vertical (metal escuro)
      if (b.disabled) {
        ctx.fillStyle = '#221e2a';
        ctx.fillRect(b.x, b.y, b.w, b.h);
      } else {
        var g = ctx.createLinearGradient(0, b.y, 0, b.y + b.h);
        if (b.danger) {
          g.addColorStop(0, '#5e2130'); g.addColorStop(0.45, '#46141f'); g.addColorStop(1, '#2e0c14');
        } else if (b.glow) {
          g.addColorStop(0, '#4a3f26'); g.addColorStop(0.45, '#33281a'); g.addColorStop(1, '#1f1810');
        } else {
          g.addColorStop(0, '#3c3452'); g.addColorStop(0.45, '#2a2438'); g.addColorStop(1, '#1a1626');
        }
        ctx.fillStyle = g;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        // bisel: fio de luz no topo, sombra na base
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.fillRect(b.x + 1, b.y + 1, b.w - 2, 1);
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(b.x + 1, b.y + b.h - 2, b.w - 2, 1);
      }
      // varredura de brilho animada (botões de destaque)
      if (!b.disabled && b.glow) {
        var sw = ((t * 55) % (b.w + 50)) - 25;
        var gg = ctx.createLinearGradient(b.x + sw - 13, 0, b.x + sw + 13, 0);
        gg.addColorStop(0, 'rgba(255,235,170,0)');
        gg.addColorStop(0.5, 'rgba(255,235,170,0.25)');
        gg.addColorStop(1, 'rgba(255,235,170,0)');
        ctx.fillStyle = gg;
        ctx.fillRect(b.x + 1, b.y + 1, b.w - 2, b.h - 2);
      }
      // moldura dupla
      ctx.lineWidth = 1;
      if (!b.disabled) {
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.strokeRect(b.x - 0.5, b.y - 0.5, b.w + 1, b.h + 1);
      }
      ctx.strokeStyle = b.glow && !b.disabled ? '#c9a23a' : edge;
      ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
      // pinos de canto (botões grandes)
      if (!b.disabled && !b.small && b.h >= 18) {
        ctx.fillStyle = b.danger ? '#8a2432' : '#c9a23a';
        ctx.fillRect(b.x + 1, b.y + 1, 2, 2);
        ctx.fillRect(b.x + b.w - 3, b.y + 1, 2, 2);
        ctx.fillRect(b.x + 1, b.y + b.h - 3, 2, 2);
        ctx.fillRect(b.x + b.w - 3, b.y + b.h - 3, 2, 2);
      }
      // anel pulsante
      if (!b.disabled && b.glow) {
        var p = 0.4 + 0.3 * Math.sin(t * 5);
        ctx.strokeStyle = 'rgba(255,215,106,' + p + ')';
        ctx.strokeRect(b.x - 1.5, b.y - 1.5, b.w + 3, b.h + 3);
      }
      var size = b.small ? 1 : (b.size || 1);
      var col = b.disabled ? '#5a5468' : (b.color || (b.glow ? '#ffe9a0' : '#e8e0d0'));
      F.draw(ctx, b.label, b.x + b.w / 2, b.y + (b.h - 7 * size) / 2, { size: size, color: col, align: 'center', shadow: !b.disabled });
      return b;
    },

    panel: function (ctx, x, y, w, h, opts) {
      opts = opts || {};
      // sombra
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(x + 2, y + 3, w, h);
      // fundo em gradiente (ou cor sólida se pedida)
      if (opts.bg) {
        ctx.fillStyle = opts.bg;
        ctx.fillRect(x, y, w, h);
      } else {
        var g = ctx.createLinearGradient(0, y, 0, y + h);
        g.addColorStop(0, 'rgba(32,26,46,0.96)');
        g.addColorStop(1, 'rgba(13,10,20,0.96)');
        ctx.fillStyle = g;
        ctx.fillRect(x, y, w, h);
      }
      // fio de luz no topo
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fillRect(x + 1, y + 1, w - 2, 2);
      // moldura dupla
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.strokeRect(x - 0.5, y - 0.5, w + 1, h + 1);
      ctx.strokeStyle = opts.edge || '#4a4258';
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      // cantos decorados com brilho
      ctx.fillStyle = opts.corner || '#8a6e2e';
      [[x, y], [x + w - 3, y], [x, y + h - 3], [x + w - 3, y + h - 3]].forEach(function (c) {
        ctx.fillRect(c[0], c[1], 3, 3);
      });
      ctx.fillStyle = 'rgba(255,246,214,0.45)';
      ctx.fillRect(x, y, 1, 1);
      ctx.fillRect(x + w - 3, y, 1, 1);
    },

    // faixa-título ornamentada (cabeçalho de cena): banda de fundo,
    // linhas laterais douradas com losangos e título com sombra funda.
    header: function (ctx, w, y, title, opts) {
      opts = opts || {};
      var size = opts.size || 2;
      var color = opts.color || '#ffd76a';
      // nunca deixa o título estourar a tela: encolhe e, se preciso, trunca
      while (size > 1 && F.measure(title, size, 1) > w - 44) size--;
      var maxCh = Math.max(6, Math.floor((w - 44) / (6 * size)));
      if (String(title).length > maxCh) title = String(title).slice(0, maxCh - 1) + '.';
      var bandH = size * 8 + 10;
      var g = ctx.createLinearGradient(0, y - 5, 0, y - 5 + bandH);
      g.addColorStop(0, 'rgba(18,12,28,0)');
      g.addColorStop(0.5, 'rgba(22,16,34,0.85)');
      g.addColorStop(1, 'rgba(18,12,28,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 5, w, bandH);
      var tw = F.measure(title, size, 1);
      var cy = y + size * 3.5;
      var lw = Math.max(8, (w - tw) / 2 - 22);
      ctx.fillStyle = 'rgba(201,162,58,0.65)';
      ctx.fillRect(Math.round(w / 2 - tw / 2 - lw - 14), Math.round(cy), lw, 1);
      ctx.fillRect(Math.round(w / 2 + tw / 2 + 14), Math.round(cy), lw, 1);
      diamond(ctx, Math.round(w / 2 - tw / 2 - 9), Math.round(cy) + 0.5, 3, '#c9a23a');
      diamond(ctx, Math.round(w / 2 + tw / 2 + 9), Math.round(cy) + 0.5, 3, '#c9a23a');
      F.draw(ctx, title, w / 2 + 1, y + 1, { size: size, color: 'rgba(0,0,0,0.75)', align: 'center' });
      F.draw(ctx, title, w / 2, y, { size: size, color: color, align: 'center' });
      if (opts.sub) F.draw(ctx, opts.sub, w / 2, y + size * 8 + 3, { size: 1, color: opts.subColor || '#8a94a8', align: 'center' });
      return y + size * 8 + (opts.sub ? 14 : 6);
    },

    // pílula de ouro (moeda cunhada + valor) — canto das cenas
    goldChip: function (ctx, x, y, amount, alignRight) {
      var txt = String(amount);
      var tw = F.measure(txt, 1, 1);
      var w = tw + 20, h = 13;
      if (alignRight) x -= w;
      var g = ctx.createLinearGradient(0, y, 0, y + h);
      g.addColorStop(0, 'rgba(44,35,20,0.94)');
      g.addColorStop(1, 'rgba(22,16,9,0.94)');
      ctx.fillStyle = g;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#8a6e2e';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      // moeda cunhada
      ctx.fillStyle = '#8a6e2e';
      ctx.beginPath(); ctx.arc(x + 7, y + 7, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffd76a';
      ctx.beginPath(); ctx.arc(x + 6.5, y + 6.5, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c9a23a';
      ctx.fillRect(x + 6, y + 4, 1, 5);
      F.draw(ctx, txt, x + 14, y + 3, { size: 1, color: '#ffe9a0', shadow: true });
      return { x: x, y: y, w: w, h: h };
    },

    hpBar: function (ctx, x, y, w, hp, maxHp, shield, color) {
      // moldura escura
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(x - 1, y - 1, w + 2, 6);
      ctx.fillStyle = '#0e0a16';
      ctx.fillRect(x, y, w, 4);
      var pct = Math.max(0, Math.min(1, hp / maxHp));
      var base = color || (pct > 0.5 ? '#4ac86a' : pct > 0.25 ? '#e8c84a' : '#e84a5a');
      var fw = Math.round(w * pct);
      if (fw > 0) {
        ctx.fillStyle = base;
        ctx.fillRect(x, y, fw, 4);
        // luz no topo, sombra na base (volume)
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(x, y, fw, 1);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(x, y + 3, fw, 1);
      }
      // entalhes de 25%
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      for (var q = 1; q < 4; q++) ctx.fillRect(x + Math.round(w * q / 4), y, 1, 4);
      if (shield > 0) {
        var sw2 = Math.min(w, Math.round(w * shield / maxHp));
        ctx.fillStyle = '#6a9ae8';
        ctx.fillRect(x, y - 3, sw2, 2);
        ctx.fillStyle = 'rgba(240,248,255,0.6)';
        ctx.fillRect(x, y - 3, sw2, 1);
      }
    },

    // tooltip com quebra automática, posicionada sem sair da tela
    tooltip: function (ctx, screenW, screenH, px, py, title, lines, titleColor) {
      var maxW = Math.min(190, screenW - 20);
      var wrapped = [];
      (lines || []).forEach(function (l) {
        F.wrap(String(l), 1, 1, maxW - 12).forEach(function (x2) { wrapped.push(x2); });
      });
      var hgt = 18 + wrapped.length * 9;
      var wdt = Math.max(F.measure(title || '', 1, 1) + 14, 90);
      wrapped.forEach(function (l) { wdt = Math.max(wdt, F.measure(l, 1, 1) + 12); });
      wdt = Math.min(wdt, maxW);
      var x = Math.max(4, Math.min(px - wdt / 2, screenW - wdt - 4));
      var y = py - hgt - 8;
      if (y < 4) y = Math.min(py + 14, screenH - hgt - 4);
      W.panel(ctx, x, y, wdt, hgt, { edge: '#5c4f74' });
      if (title) {
        F.draw(ctx, title, x + 6, y + 5, { size: 1, color: titleColor || '#ffe9a0', shadow: true });
        // sublinhado dourado sob o título
        ctx.fillStyle = 'rgba(201,162,58,0.5)';
        ctx.fillRect(x + 6, y + 13, Math.min(wdt - 12, F.measure(title, 1, 1)), 1);
      }
      wrapped.forEach(function (l, i) {
        F.draw(ctx, l, x + 6, y + 16 + i * 9, { size: 1, color: '#c8c2d4' });
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
      var wd = Math.max(F.measure(t0.title, 1, 1), F.measure(t0.sub || '', 1, 1)) + 34;
      var x = (w - wd) / 2, y = 6;
      var acc = t0.kind === 'secret' ? '#8a4ae8' : '#ffd76a';
      ctx.globalAlpha = Math.max(0, a);
      W.panel(ctx, x, y, wd, 26, { corner: acc, edge: t0.kind === 'secret' ? '#8a4ae8' : '#8a6e2e' });
      // estrela cunhada à esquerda + brilho pulsante
      var pu = 0.5 + 0.5 * Math.sin(W.toastT * 8);
      ctx.globalAlpha = Math.max(0, a) * (0.5 + pu * 0.5);
      ctx.drawImage(RA.gfx.Icons.symbol('star'), x + 4, y + 8, 10, 10);
      ctx.globalAlpha = Math.max(0, a);
      F.draw(ctx, t0.title, x + wd / 2 + 5, y + 4, { size: 1, color: '#ffe9a0', align: 'center', shadow: true });
      if (t0.sub) F.draw(ctx, t0.sub, x + wd / 2 + 5, y + 14, { size: 1, color: '#c8c2d4', align: 'center' });
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
            if (fx.missChance) s += RA.T({ pt: ', ' + Math.round(fx.missChance * 100) + '% de errar', en: ', ' + Math.round(fx.missChance * 100) + '% miss' });
            if (fx.healOnKill) s += RA.T({ pt: ', cura ' + fx.healOnKill + ' ao matar', en: ', heal ' + fx.healOnKill + ' on kill' });
            out.push(s);
            // PRÉ-REQUISITOS em destaque — nunca esconder o "precisa de X"
            if (fx.onlyHalfHp) out.push(RA.T({ pt: 'REQUER: alvo com MENOS de metade da vida', en: 'REQUIRES: target below half HP' }));
            if (fx.onlyMarked) out.push(RA.T({ pt: 'REQUER: alvo MARCADO (use uma face de marcar antes, NO MESMO TURNO — a marca expira no fim da rodada)', en: 'REQUIRES: MARKED target (mark it first, SAME TURN — marks expire at round end)' }));
            if (fx.onlyBoss) out.push(RA.T({ pt: 'REQUER: o alvo ser um CHEFE', en: 'REQUIRES: target must be a BOSS' }));
            if (fx.onlyFirst) out.push(RA.T({ pt: 'REQUER: ser a PRIMEIRA ação do turno', en: 'REQUIRES: must be the FIRST action of the turn' }));
            if (fx.onlyIfSelfHp1) out.push(RA.T({ pt: 'REQUER: o herói estar com 1 de vida', en: 'REQUIRES: hero at exactly 1 HP' }));
            if (fx.needsCharge) out.push(RA.T({ pt: 'REQUER: 1 CARGA (ganhe com a face Carga antes)', en: 'REQUIRES: 1 CHARGE (gain it with the Charge face first)' }));
            if (fx.twiceIfMarked) out.push(RA.T({ pt: 'BÔNUS: dano em DOBRO se o alvo estiver MARCADO', en: 'BONUS: DOUBLE damage vs a MARKED target' }));
            if (fx.plusIfMarkedOrCursed) out.push(RA.T({ pt: 'BÔNUS: +' + fx.plusIfMarkedOrCursed + ' se o alvo estiver marcado ou amaldiçoado', en: 'BONUS: +' + fx.plusIfMarkedOrCursed + ' vs marked or cursed targets' }));
            break;
          }
          case 'dmgOnlyBleeding':
            out.push(RA.T({ pt: 'Dano ' + n + ' — SÓ fere inimigos SANGRANDO', en: 'Damage ' + n + ' — ONLY hits BLEEDING enemies' }));
            out.push(RA.T({ pt: '(aplique sangramento antes!)', en: '(apply bleed first!)' }));
            break;
          case 'dmgOnlyVulnerable':
            out.push(RA.T({ pt: 'Dano ' + n + ' — SÓ fere inimigos VULNERÁVEIS', en: 'Damage ' + n + ' — ONLY hits VULNERABLE enemies' }));
            out.push(RA.T({ pt: '(aplique vulnerável antes!)', en: '(apply vulnerable first!)' }));
            break;
          case 'dmgUpTo': out.push(RA.T({ pt: 'Dano ' + n + ' em até ' + (fx.targets || 3) + ' inimigos', en: 'Damage ' + n + ' to up to ' + (fx.targets || 3) + ' enemies' })); break;
          case 'dmgLostHp': out.push(RA.T({ pt: 'Dano = vida PERDIDA do herói (máx ' + (fx.max || 8) + ')', en: 'Damage = hero\'s LOST HP (max ' + (fx.max || 8) + ')' })); break;
          case 'trap': out.push(RA.T({ pt: 'Arma uma armadilha: fere o inimigo quando ele agir', en: 'Sets a trap: wounds the enemy when it acts' })); break;
          case 'healSelfIfBleeding': out.push(RA.T({ pt: 'Cura ' + n + ' em si SE o alvo estiver sangrando', en: 'Heals self ' + n + ' IF target is bleeding' })); break;
          case 'stunIfNoShield': out.push(RA.T({ pt: 'ATORDOA o alvo se ele estiver SEM escudo', en: 'STUNS the target if it has NO shield' })); break;
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
