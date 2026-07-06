// CombatFx: executores do conteúdo — DSL das faces, Dado do Destino, combos,
// especiais de inimigos, mecânicas de chefes e as 12 regras do Dado Negro.
(function () {
  var FX = {};

  // ============================================================
  // FACES DOS HERÓIS / FACES RÚNICAS
  // ============================================================
  FX.applyFace = function (c, h, d, f, tgt) {
    var val = c.dieValue(d);
    // relíquias que mexem no valor
    if (c.hasRelic('innocentDie') && f.val === 1) val = 3;
    if (c.hasRelic('braveGlass') && f.cracked) val += 2;
    if (c.hasRelic('abyssTooth') && h.hp === h.maxHp) val += 1;
    if (c.hasRelic('midnightRing') && f.cat === 'sombria') val += 1;
    if (c.hasRelic('firstActPlus') && c.tflags.diceUsed === 1) val += c.relicN('firstActPlus');
    if (c.hasRelic('drumBeat') && c.tflags.diceUsed % 3 === 0) val += 1;
    if (c.hasRelic('frontFormation')) {
      var allFront = c.aliveHeroes().every(function (x) { return x.row === 'front'; });
      if (allFront) val += 1;
    }
    if (c.tflags.linked > 0) { val += 1; c.tflags.linked--; }
    c.flags.maxDieUsedThisTurn = Math.max(c.flags.maxDieUsedThisTurn || 0, val);
    c.tflags.lastFaceVal = val;
    c.tflags.lastDiePerHero[h.slot] = { face: f, val: val, tgt: tgt };

    runFxList(c, h, f, f.fx || [], val, tgt, d);
  };

  function runFxList(c, h, f, list, val, tgt, d) {
    for (var i = 0; i < list.length; i++) {
      if (c.over) return;
      runFx(c, h, f, list[i], val, tgt, d);
    }
  }

  function eachEnemy(c, fn) { c.aliveEnemies().forEach(fn); }
  function eachHero(c, fn) { c.aliveHeroes().forEach(fn); }

  function stTargets(c, h, fx, tgt) {
    var who = fx.who || 'target';
    if (who === 'self') return [h];
    if (who === 'allA') return c.aliveHeroes();
    if (who === 'allE') return c.aliveEnemies();
    if (who === 'front') return c.aliveHeroes().filter(function (x) { return x.row === 'front'; });
    if (who === 'two') {
      var others = c.aliveHeroes().filter(function (x) { return x !== tgt; });
      others.sort(function (a, b) { return a.hp / a.maxHp - b.hp / b.maxHp; });
      return tgt ? [tgt].concat(others.slice(0, 1)) : others.slice(0, 2);
    }
    return tgt ? [tgt] : [h];
  }

  function doAttack(c, h, e, n, fx, f) {
    if (!e || e.dead) return 0;
    var opts = {
      isAttack: true, magic: !!fx.magic, ignoreShield: !!fx.ignoreShield,
      missChance: fx.missChance || 0, healOnKill: fx.healOnKill || 0,
      luckKillReroll: !!fx.luckKillReroll, tag: fx.magic ? 'magic' : 'hit'
    };
    // combos/foco que perfuram
    if (c.tflags.pierceNext) { opts.pierce1 = true; c.tflags.pierceNext = false; }
    if (c.st(h, 'focus')) { opts.pierce1 = true; h.statuses.focus--; if (!h.statuses.focus) delete h.statuses.focus; }
    if (c.tflags.vsMarkedPlus && c.st(e, 'mark')) { n += c.tflags.vsMarkedPlus; c.tflags.vsMarkedPlus = 0; }
    // passiva espadachim: mesmo alvo 2x
    if (h.passive === 'samePlusOne') {
      if (h.bflags.lastTarget === e.slot) n += 1;
      h.bflags.lastTarget = e.slot;
    }
    var done = c.damage(h, e, n, opts);
    c.tflags.lastAtkTarget = e;
    // sangueQuente consumido
    if (c.fateFx.firstAtkBonus && !c.tflags.firstAtkDone) c.tflags.firstAtkDone = true;
    // eco de magia
    if (fx.magic && done >= 0) {
      c.flags.lastMagic = { val: n };
      if (!e.dead) {
        if (c.fateFx.echoHalf && !c.tflags.fateEchoDone) { c.tflags.fateEchoDone = true; c.damage(h, e, Math.max(1, Math.ceil(n / 2)), { isAttack: true, magic: true, tag: 'magic' }); }
        if (c.hasRelic('echoSpell') && !c.flags.relicEchoDone) { c.flags.relicEchoDone = true; c.damage(h, e, Math.max(1, n - 1), { isAttack: true, magic: true, tag: 'magic' }); }
        if (c.hasRelic('alwaysEcho') && !c.tflags.turnEchoDone) { c.tflags.turnEchoDone = true; c.damage(h, e, Math.max(1, Math.ceil(n / 2)), { isAttack: true, magic: true, tag: 'magic' }); }
      }
    }
    // lâmina gêmea: copia o próximo ataque
    if (c.tflags.echoNextAtk && !fx._echo) { c.tflags.echoNextAtk = false; if (!e.dead) c.damage(h, e, n, { isAttack: true, tag: 'hit' }); }
    if (fx.copyNextAtk) c.tflags.echoNextAtk = true;
    return done;
  }

  function pickRandomEnemy(c, not) {
    var pool = c.aliveEnemies().filter(function (e) { return e !== not; });
    if (!pool.length) pool = c.aliveEnemies();
    if (!pool.length) return null;
    return pool[c.rng.int(0, pool.length - 1)];
  }

  function runFx(c, h, f, fx, val, tgt, d) {
    var n, i, t, pool;
    switch (fx.k) {
      case 'dmg': {
        n = fx.n !== undefined ? fx.n : val;
        var e = (tgt && tgt.kind === 'enemy') ? tgt : null;
        // condições
        if (fx.onlyHalfHp && e && e.hp > e.maxHp / 2) { c.say(RA.T({ pt: 'Só funciona abaixo de metade da vida!', en: 'Only works below half HP!' })); return; }
        if (fx.onlyMarked && e && !c.st(e, 'mark')) { c.say(RA.T({ pt: 'Precisa de alvo marcado!', en: 'Needs a marked target!' })); return; }
        if (fx.onlyBoss && e && e.tier !== 'chefe' && e.tier !== 'secreto') { c.say(RA.T({ pt: 'Só contra chefes!', en: 'Bosses only!' })); return; }
        if (fx.onlyFirst && c.tflags.diceUsed !== 1) { c.say(RA.T({ pt: 'Só como primeiro dado!', en: 'First die only!' })); return; }
        if (fx.onlyIfSelfHp1 && h.hp !== 1) { c.say(RA.T({ pt: 'Só com 1 de vida!', en: 'Only at 1 HP!' })); return; }
        if (fx.needsCharge) {
          var cost = Math.max(1, (fx.needsCharge === true ? 1 : fx.needsCharge) - (c.hasRelic('chargeCostDown') ? 1 : 0));
          if (c.st(h, 'charge') < cost) { c.say(RA.T({ pt: 'Sem carga suficiente!', en: 'Not enough charge!' })); return; }
          h.statuses.charge -= cost; if (!h.statuses.charge) delete h.statuses.charge;
        }
        // bônus condicionais
        if (fx.plusIfFirst && c.tflags.diceUsed === 1) n += fx.plusIfFirst;
        if (fx.plusIfFront && h.row === 'front') n += fx.plusIfFront;
        if (fx.plusIfShieldedSelf && h.shield > 0) n += fx.plusIfShieldedSelf;
        if (e) {
          if (fx.plusIfFrozen && c.st(e, 'freeze')) n += fx.plusIfFrozen;
          if (fx.plusIfMarked && c.st(e, 'mark')) n += fx.plusIfMarked;
          if (fx.plusIfMarkedOrCursed && (c.st(e, 'mark') || c.st(e, 'curse'))) n += fx.plusIfMarkedOrCursed;
          if (fx.plusIfFear && c.st(e, 'fear')) n += fx.plusIfFear;
          if (fx.plusVsUndead && e.def.kind === 'undead') n += fx.plusVsUndead;
        }
        var times = fx.times || 1;
        if (fx.twiceIfMarked && e && c.st(e, 'mark')) times = 2;
        if (f.tgt === 'allE' || fx.who === 'allE') {
          var extra = c.relicN('aoeExtra');
          eachEnemy(c, function (en) { for (var k = 0; k < times; k++) if (!en.dead) doAttack(c, h, en, n + extra, fx, f); });
        } else {
          if (!e) e = c.frontEnemies()[0];
          for (i = 0; i < times; i++) {
            if (!e || e.dead) e = c.frontEnemies()[0];
            if (!e) break;
            var dealt = doAttack(c, h, e, n, fx, f);
            if (fx.repeatIfKill && e.dead) { var nx = c.frontEnemies()[0]; if (nx) doAttack(c, h, nx, n, fx, f); }
          }
          if (fx.chainTo && e) { var e2 = pickRandomEnemy(c, e); if (e2) doAttack(c, h, e2, fx.chainTo, fx, f); }
        }
        break;
      }
      case 'heal': n = fx.n !== undefined ? fx.n : val; c.heal(h, (tgt && tgt.kind === 'hero') ? tgt : h, n); break;
      case 'healSelf': c.heal(h, h, fx.n !== undefined ? fx.n : val); break;
      case 'healLowest': c.healLowest(fx.n !== undefined ? fx.n : val); break;
      case 'healSelfIfBleeding':
        if (tgt && c.st(tgt, 'bleed')) c.heal(h, h, (fx.n || 2) + c.relicN('drainPlus'));
        break;
      case 'healIfDamagedThisTurn':
        t = (tgt && tgt.kind === 'hero') ? tgt : h;
        if (t.bflags.damagedThisTurn) c.heal(h, t, val);
        break;
      case 'shield': {
        n = fx.n !== undefined ? fx.n : val;
        var whoList = stTargets(c, h, fx, tgt);
        whoList.forEach(function (u) { c.giveShield(u, n); });
        break;
      }
      case 'shieldPerEnemy':
        c.giveShield(h, (fx.n || 1) * c.aliveEnemies().length);
        break;
      case 'st': {
        n = fx.n !== undefined ? fx.n : (val || 1);
        stTargets(c, h, fx, tgt).forEach(function (u) { c.addStatus(u, fx.s, n, h); });
        break;
      }
      case 'cleanse': c.cleanse((tgt && tgt.kind === 'hero') ? tgt : h, fx.n || 1); break;
      case 'cleanseTypes': c.cleanse((tgt && tgt.kind === 'hero') ? tgt : h, 9, fx.types); break;
      case 'revive':
        if (tgt && tgt.downed) {
          tgt.downed = false; tgt.hp = Math.min(tgt.maxHp, fx.hp || 3);
          c.ev('revive', { idx: tgt.slot });
          c.ctx.stat('revive', {});
          c.say(RA.T(tgt.name) + ' ' + RA.UI('revived'));
        }
        break;
      case 'taunt': case 'tauntStrong': case 'tauntAll':
        c.flags.tauntTarget = h.slot;
        c.ev('taunt', { idx: h.slot });
        break;
      case 'protect':
        t = (tgt && tgt.kind === 'hero') ? tgt : h;
        c.addStatus(t, 'protect', 1);
        t.protector = h.slot;
        break;
      case 'selfDmg': c.damage(null, h, fx.n || 1, { pure: true, tag: 'hit' }); break;
      case 'dmgLostHp':
        n = Math.min(fx.max || 8, h.maxHp - h.hp);
        if (n > 0) doAttack(c, h, (tgt && tgt.kind === 'enemy') ? tgt : c.frontEnemies()[0], n, fx, f);
        break;
      case 'dmgCombo':
        n = Math.min(fx.max || 5, val + Math.max(0, c.tflags.diceUsed - 1));
        doAttack(c, h, (tgt && tgt.kind === 'enemy') ? tgt : c.frontEnemies()[0], n, fx, f);
        break;
      case 'dmgUpTo': {
        pool = c.aliveEnemies().slice();
        c.rng.shuffle(pool);
        pool.slice(0, fx.targets || 2).forEach(function (en) { doAttack(c, h, en, val, { magic: true }, f); });
        break;
      }
      case 'dmgOnlyBleeding':
        if (tgt && c.st(tgt, 'bleed')) doAttack(c, h, tgt, fx.n !== undefined ? fx.n : val, fx, f);
        else c.say(RA.T({ pt: 'Precisa de alvo sangrando!', en: 'Needs a bleeding target!' }));
        break;
      case 'dmgOnlyVulnerable':
        if (tgt && (c.st(tgt, 'vulnerable') || c.st(tgt, 'mark'))) doAttack(c, h, tgt, fx.n !== undefined ? fx.n : val, fx, f);
        else c.say(RA.T({ pt: 'Precisa de alvo vulnerável!', en: 'Needs a vulnerable target!' }));
        break;
      case 'removeBuff':
        if (tgt && tgt.kind === 'enemy') {
          if (tgt.shield > 0) { tgt.shield = 0; c.ev('shieldHit', { side: 'enemy', idx: tgt.slot, n: 99 }); }
          else {
            for (var s in tgt.statuses) { var sd = RA.data.Statuses[s]; if (sd && sd.good) { delete tgt.statuses[s]; break; } }
          }
        }
        break;
      case 'summon': c.summonAlly(fx.id, h); break;
      case 'sacrificeSummon': {
        var alive = c.summons.filter(function (x) { return !x.dead; });
        if (alive.length) {
          var sac = alive[0]; sac.dead = true;
          c.ev('summonDie', { idx: c.summons.indexOf(sac) });
          doAttack(c, h, (tgt && tgt.kind === 'enemy') ? tgt : c.frontEnemies()[0], val + 2, fx, f);
        } else c.say(RA.T({ pt: 'Sem invocações!', en: 'No summons!' }));
        break;
      }
      case 'sacrificeChoice': {
        var alive2 = c.summons.filter(function (x) { return !x.dead; });
        if (alive2.length) {
          var sac2 = alive2[0]; sac2.dead = true;
          c.ev('summonDie', { idx: c.summons.indexOf(sac2) });
          eachHero(c, function (u) { c.heal(h, u, 2); });
        }
        break;
      }
      case 'coin':
        n = (fx.n !== undefined ? fx.n : val) + c.relicN('goldPlus');
        c.ctx.addGold(n); c.ev('gold', { n: n });
        break;
      case 'rerollAlly': c.rollsLeft += 1; c.ev('extraRoll', {}); break;
      case 'extraRollThisTurn': c.rollsLeft += 1; c.ev('extraRoll', {}); break;
      case 'copyLast': {
        var ld = findLastFace(c, h);
        if (ld && !ld.face._copying) {
          ld.face._copying = true;
          runFxList(c, h, ld.face, ld.face.fx || [], Math.max(0, ld.val - (fx.minus || 0)), ld.tgt, d);
          ld.face._copying = false;
        }
        break;
      }
      case 'copyLastMagic':
        if (c.flags.lastMagic) {
          var mt = (tgt && tgt.kind === 'enemy') ? tgt : c.frontEnemies()[0];
          if (mt) doAttack(c, h, mt, Math.max(1, c.flags.lastMagic.val - (fx.minus || 0)), { magic: true }, f);
        }
        break;
      case 'commandRepeat': {
        t = (tgt && tgt.kind === 'hero') ? tgt : h;
        var lh = c.tflags.lastDiePerHero[t.slot];
        if (lh && !lh.face._copying) {
          lh.face._copying = true;
          runFxList(c, t, lh.face, lh.face.fx || [], Math.max(0, lh.val - (fx.minus || 0)), lh.tgt, d);
          lh.face._copying = false;
          if (c.hasRelic('commandShield') || h.passive === 'commandShield') c.giveShield(t, 1);
        }
        break;
      }
      case 'swapDice': {
        pool = c.dice.filter(function (x) { return !x.used && !x.blocked && x !== d; });
        if (pool.length >= 2) {
          var a = pool[0], b = pool[1];
          var tmp = a.faceIdx; a.faceIdx = b.faceIdx; b.faceIdx = tmp;
          var th = a.heroIdx; a.heroIdx = b.heroIdx; b.heroIdx = th;
          c.ev('diceSwapped', { a: a.id, b: b.id });
        }
        break;
      }
      case 'rerollFate': FX.rollFate(c, true); break;
      case 'copyEnemyDie':
        if (tgt && tgt.kind === 'enemy' && tgt.intent && tgt.intent.k === 'atk') doAttack(c, h, tgt, tgt.intent.n, fx, f);
        else if (tgt && tgt.kind === 'enemy') doAttack(c, h, tgt, 2, fx, f);
        break;
      case 'repairCracked': {
        t = (tgt && tgt.kind === 'hero') ? tgt : h;
        var fixed = 0;
        (t.faces || []).forEach(function (fc) { if (fc.cracked) { fc.cracked = false; if (fc.uses !== undefined && fc.uses <= 0) fc.uses = 1; fixed++; } });
        if (fixed) { c.ev('repair', { idx: t.slot, n: fixed }); c.ctx.stat('repair', { n: fixed }); }
        break;
      }
      case 'overclock': case 'summonsAct':
        c.summons.forEach(function (s2) { if (!s2.dead) c.summonAct(s2); });
        break;
      case 'twistIntent':
        if (tgt && tgt.kind === 'enemy') { tgt.aiIdx = c.rng.int(0, tgt.def.ai.length - 1); c.computeIntent(tgt); }
        break;
      case 'crackSelf': {
        var cf = h.faces[c.rng.int(0, h.faces.length - 1)];
        cf.cracked = true;
        c.ev('crack', { idx: h.slot });
        break;
      }
      case 'crackTarget':
        if (tgt && tgt.kind === 'enemy') { tgt.bflags.cracked = true; c.addStatus(tgt, 'vulnerable', 1); }
        break;
      case 'swapRows':
        t = (tgt && tgt.kind === 'hero') ? tgt : h;
        if (!c.st(t, 'chained')) { t.row = t.row === 'front' ? 'back' : 'front'; c.ev('rowSwap', { idx: t.slot }); }
        break;
      case 'buffAttacks': c.tflags.buffAtk = (c.tflags.buffAtk || 0) + (fx.n || 1); break;
      case 'flipDie': {
        pool = c.dice.filter(function (x) { return !x.used && !x.blocked && x !== d; });
        if (pool.length) { var fd = pool[c.rng.int(0, pool.length - 1)]; var fl = c.heroes[fd.heroIdx].faces.length; fd.faceIdx = (fl - 1) - fd.faceIdx; fd.fake = -1; c.ev('flip', { id: fd.id }); }
        break;
      }
      case 'chooseFate': {
        var o1 = c.rng.int(0, 11), o2 = (o1 + 1 + c.rng.int(0, 10)) % 12;
        c.ask('fate', [RA.data.Fate[o1], RA.data.Fate[o2]], function (pick) {
          FX.setFate(c, RA.data.Fate[pick === 0 ? o1 : o2]);
        });
        break;
      }
      case 'trap': if (tgt && tgt.kind === 'enemy') { tgt.bflags.trap = (tgt.bflags.trap || 0) + val; c.ev('trapSet', { idx: tgt.slot }); } break;
      case 'stunWeakest': t = c.weakestEnemy(); if (t) c.addStatus(t, 'stun', 1); break;
      case 'stunIfNoShield': if (tgt && tgt.kind === 'enemy' && tgt.shield <= 0) c.addStatus(tgt, 'stun', 1); break;
      case 'breakShield':
        if (tgt && tgt.kind === 'enemy') { var rem = Math.min(tgt.shield, fx.n || 99); tgt.shield -= rem; if (rem) c.ev('shieldHit', { side: 'enemy', idx: tgt.slot, n: rem }); }
        break;
      case 'randomBoon': {
        var boons = ['shield', 'inspire', 'regen', 'focus'];
        var bpick = boons[c.rng.int(0, boons.length - 1)];
        if (bpick === 'shield') c.giveShield(h, 2); else c.addStatus(h, bpick, 1);
        break;
      }
      case 'mixHealDmg':
        if (tgt && tgt.kind === 'enemy') doAttack(c, h, tgt, val, { magic: true }, f);
        else if (tgt) c.heal(h, tgt, val);
        break;
      case 'clearCharge': if (tgt && tgt.kind === 'enemy') { tgt.charge = 0; delete tgt.statuses.charge; } break;
      case 'storeDie': {
        pool = c.dice.filter(function (x) { return !x.used && !x.blocked && x !== d; });
        if (pool.length) {
          pool.sort(function (a2, b2) { return c.dieValue(b2) - c.dieValue(a2); });
          var keep = pool[0];
          c.flags.storedFaces = c.flags.storedFaces || [];
          c.flags.storedFaces.push({ heroIdx: keep.heroIdx, faceIdx: keep.faceIdx, bonus: keep.bonus });
          c.addStatus(c.heroes[keep.heroIdx], 'stored', 1);
          c.ev('stored', { id: keep.id });
        }
        break;
      }
      case 'delayIntent': case 'blockEnemyDie':
        if (tgt && tgt.kind === 'enemy') { tgt.bflags.delayed = true; c.ev('delayed', { idx: tgt.slot }); }
        break;
      case 'duplicateDie': {
        pool = c.dice.filter(function (x) { return !x.used && !x.blocked && x !== d; });
        if (pool.length) {
          var src2 = pool[c.rng.int(0, pool.length - 1)];
          c.dice.push({ heroIdx: src2.heroIdx, faceIdx: src2.faceIdx, locked: false, used: false, blocked: false, sacrificed: false, bonus: src2.bonus, fake: -1, anim: { phase: 'landing', t: 0 }, id: c.dice.length, temp: true });
          c.ev('dup', { id: c.dice.length - 1 });
        }
        break;
      }
      case 'swapHpPercent':
        if (tgt && tgt.kind === 'enemy') {
          var hpct = h.hp / h.maxHp, epct = tgt.hp / tgt.maxHp;
          h.hp = Math.max(1, Math.round(h.maxHp * epct));
          tgt.hp = Math.max(1, Math.round(tgt.maxHp * hpct));
          c.ev('hpSwap', { hero: h.slot, enemy: tgt.slot });
        }
        break;
      case 'linkDice': c.tflags.linked = 2; break;
      case 'equalizeDice': {
        pool = c.dice.filter(function (x) { return !x.used && !x.blocked; });
        if (pool.length) {
          var sum = 0;
          pool.forEach(function (x) { sum += c.dieValue(x); });
          var avg = Math.ceil(sum / pool.length);
          pool.forEach(function (x) { x.bonus += avg - c.dieValue(x); });
          c.ev('equalized', {});
        }
        break;
      }
      case 'doubleOrNothing': {
        pool = c.dice.filter(function (x) { return !x.used && !x.blocked; });
        var winBet = c.rng.chance(0.5);
        pool.forEach(function (x) { x.bonus += winBet ? 2 : -1; });
        c.say(winBet ? RA.T({ pt: 'A aposta paga! +2 nos dados!', en: 'The bet pays! +2 to dice!' }) : RA.T({ pt: 'A banca vence... -1 nos dados.', en: 'The house wins... -1 to dice.' }));
        break;
      }
      case 'moveShield': {
        var hs = c.aliveHeroes(); var totalSh = 0;
        hs.forEach(function (x) { totalSh += x.shield; x.shield = 0; });
        var per = Math.floor(totalSh / hs.length), remn = totalSh % hs.length;
        hs.forEach(function (x, ix) { x.shield = per + (ix < remn ? 1 : 0); });
        c.ev('shieldMoved', {});
        break;
      }
      case 'peekIntents': c.flags.peek = true; c.ev('peek', {}); break;
      case 'plusVsUndeadNext': h.bflags.plusUndeadNext = fx.n || 2; break;
      case 'freezeAttacker': (tgt && tgt.kind === 'hero' ? tgt : h).bflags.freezeAttacker = true; break;
      case 'firstHealBonus': c.tflags.firstHealBonus = fx.n || 2; break;
      case 'reflectDebuff': (tgt && tgt.kind === 'hero' ? tgt : h).bflags.reflectDebuff = true; break;
      case 'luckKillReroll': break; // tratada como opção do dmg
      default:
        // efeito desconhecido: registra para debug, não quebra o jogo
        c.ev('unknownFx', { k: fx.k });
    }
  }

  function findLastFace(c, h) {
    // último dado usado antes deste
    var slots = Object.keys(c.tflags.lastDiePerHero);
    var ld = null;
    // prioriza o último global
    if (c.tflags.lastDie && c.tflags.lastDie.face) {
      return { face: c.tflags.lastDie.face, val: c.tflags.lastDie.value, tgt: c.tflags.lastDie.target };
    }
    return ld;
  }

  // ============================================================
  // PÓS-USO: combos, armadilhas de chefes, relíquias de memória
  // ============================================================
  FX.afterUse = function (c, h, d, f) {
    // enigma da Esfinge
    if (c.flags.enigmaDieId != null && d.id === c.flags.enigmaDieId) {
      c.flags.enigmaDieId = null;
      c.damage(null, h, 2, { pure: true, tag: 'curse' });
      c.say(RA.T({ pt: 'Resposta errada! O enigma pune.', en: 'Wrong answer! The riddle punishes.' }));
    }
    // relíquia: memória repete o primeiro dado da batalha
    if (c.hasRelic('memoryRepeat') && !c.flags.memoryDone && c.bstats.dmgDealt > 0 && c.tflags.diceUsed === 1) {
      c.flags.memoryDone = true;
      var ld = c.tflags.lastDie;
      if (ld && ld.face && !ld.face._copying) {
        ld.face._copying = true;
        runFxList(c, h, ld.face, ld.face.fx || [], Math.max(1, Math.ceil(ld.value / 2)), ld.target, d);
        ld.face._copying = false;
      }
    }
    checkCombos(c, h);
  };

  // ============================================================
  // COMBOS DE SÍMBOLOS
  // ============================================================
  function checkCombos(c, h) {
    var counts = c.tflags.symbolCount;
    var used = c.tflags.diceUsed;
    RA.data.Combos.forEach(function (combo) {
      if (c.tflags.combosFired[combo.id]) return;
      var ok = false;
      if (combo.special === 'fiveDiff') {
        var dist = {};
        c.tflags.symbolsUsedList.forEach(function (s) { dist[s] = 1; });
        ok = used >= 5 && Object.keys(dist).length >= 5;
      } else if (combo.special === 'fiveSame') {
        for (var s2 in counts) if (counts[s2] >= 5) ok = true;
      } else if (combo.need) {
        ok = true;
        var needAny = 0, usedByNeeds = 0;
        for (var sym in combo.need) {
          if (sym === 'any') { needAny = combo.need.any; continue; }
          usedByNeeds += combo.need[sym];
          if ((counts[sym] || 0) < combo.need[sym]) ok = false;
        }
        if (ok && needAny) ok = used >= usedByNeeds + needAny;
      }
      if (ok) {
        c.tflags.combosFired[combo.id] = true;
        fireCombo(c, h, combo);
        if (c.hasRelic('comboTwice') && !c.flags.comboTwiceDone) { c.flags.comboTwiceDone = true; fireCombo(c, h, combo); }
      }
    });
  }

  function fireCombo(c, h, combo) {
    c.bstats.combos++;
    c.ctx.stat('combo', { id: combo.id });
    c.ev('combo', { id: combo.id, name: combo });
    if (c.hasRelic('comboGold')) { c.ctx.addGold(1); c.ev('gold', { n: 1 }); }
    switch (combo.id) {
      case 'tresEspadas': {
        var t = c.tflags.lastAtkTarget;
        if (!t || t.dead) t = c.frontEnemies()[0];
        if (t) c.damage(h, t, 2 + (c.hasRelic('comboSwordPlus') ? 1 : 0), { isAttack: true, tag: 'combo' });
        break;
      }
      case 'escudoCoracao': {
        var hs = c.aliveHeroes().slice().sort(function (a, b) { return b.shield - a.shield; });
        if (hs.length) c.heal(h, hs[0], 1);
        break;
      }
      case 'fumacaToxica': c.aliveEnemies().forEach(function (e) { c.addStatus(e, 'poison', 1, h); }); break;
      case 'drenoVital': c.healLowest(1); break;
      case 'estrelaGuia': c.tflags.nextDiePlus = 1; break;
      case 'ataqueRapido': c.tflags.pierceNext = true; break;
      case 'olharCacador': c.tflags.vsMarkedPlus = 2; break;
      case 'provocarForte': c.flags.tauntTarget = h.slot; c.ev('taunt', { idx: h.slot }); break;
      case 'bolsoCheio': c.flags.extraGold = (c.flags.extraGold || 0) + 5; break;
      case 'guardarTempo': c.flags.nextTurnInspire = h.slot; break;
      case 'ordemPerfeita': c.aliveHeroes().forEach(function (u) { c.giveShield(u, 1); }); break;
      case 'ritualAbsoluto': {
        // duplica o menor dado usado
        var lows = null;
        c.heroes.forEach(function (u) {
          var lu = c.tflags.lastDiePerHero[u.slot];
          if (lu && (!lows || lu.val < lows.val)) lows = lu;
        });
        if (lows && lows.face && !lows.face._copying) {
          lows.face._copying = true;
          runFxList(c, h, lows.face, lows.face.fx || [], lows.val, lows.tgt, null);
          lows.face._copying = false;
        }
        break;
      }
      case 'tresCaveiras': c.aliveEnemies().forEach(function (e) { c.addStatus(e, 'curse', 1, h); }); break;
      case 'tresCoracoes': c.aliveHeroes().forEach(function (u) { c.heal(h, u, 2 + (c.hasRelic('comboHeartPlus') ? 1 : 0)); }); break;
      case 'tresEscudos': {
        var extra2 = c.hasRelic('comboShieldPlus') ? 2 : 0;
        var hs2 = c.aliveHeroes();
        hs2.forEach(function (u) { c.addStatus(u, 'barrier', 1, h); });
        if (extra2 && hs2.length) c.addStatus(hs2[0], 'barrier', extra2, h);
        break;
      }
      case 'tresChamas': c.aliveEnemies().forEach(function (e) { c.damage(h, e, 3, { magic: true, isAttack: true, tag: 'combo' }); }); break;
    }
  }

  // ============================================================
  // DADO DO DESTINO
  // ============================================================
  FX.setFate = function (c, fate) {
    c.fate = fate;
    c.fateFx = {};
    c.ctx.stat('fate', {});
    var mul = c.hasRelic('chaosFate') ? 2 : 1;
    switch (fate.id) {
      case 'mareDeFerro': c.fateFx.shieldPlus = 1 * mul; break;
      case 'sangueQuente': c.fateFx.firstAtkBonus = 2 * mul; break;
      case 'ecoArcano': c.fateFx.echoHalf = true; break;
      case 'ventoInstavel': c.fateFx.windReroll = true; break;
      case 'olhoDoCaos': {
        var e = pickRandomEnemy(c);
        if (e) c.addStatus(e, 'mark', 1 * mul);
        break;
      }
      case 'sombraCurta': c.fateFx.healMinus = 1 * mul; break;
      case 'fendaVerde': c.fateFx.poisonBleedPlus = 1 * mul; break;
      case 'chamaViva': c.fateFx.burnInstant = true; break;
      case 'maoDaSorte': c.fateFx.killExtraRoll = true; break;
      case 'pedraFria': c.fateFx.firstDmgDown = true; break;
      case 'destinoTorto': c.fateFx.crookedPending = true; break;
      case 'faceDourada': c.fateFx.copyLastHalf = true; break;
    }
    // Gema do Caos: também favorece inimigos
    if (c.hasRelic('chaosFate')) {
      if (fate.id === 'mareDeFerro') c.aliveEnemies().forEach(function (en) { c.giveShield(en, 1); });
      if (fate.id === 'fendaVerde') { /* inimigos também aplicam +1 — via flags */ c.flags.enemyDotPlus = 1; }
    }
    c.ev('fate', { fate: fate });
  };

  FX.rollFate = function (c, isReroll) {
    // limpezas de início de turno que dependem do conteúdo
    if (!isReroll) {
      c.flags.tauntTarget = null;
      c.heroes.forEach(function (h2) { h2.bflags.freezeAttacker = false; });
      if (c.flags.nextTurnInspire != null) {
        var ih = c.heroes[c.flags.nextTurnInspire];
        if (ih && !ih.dead && !ih.downed) c.addStatus(ih, 'inspire', 1);
        c.flags.nextTurnInspire = null;
      }
      // contrato negro: poder por sangue
      if (c.hasRelic('blackContract')) {
        c.tflags.buffAtk = (c.tflags.buffAtk || 0) + 1;
        var most = c.aliveHeroes().slice().sort(function (a, b) { return b.hp - a.hp; })[0];
        if (most) c.damage(null, most, 1, { pure: true, tag: 'curse' });
      }
      if (c.hasRelic('livingWall')) {
        var hurt = c.aliveHeroes().slice().sort(function (a, b) { return (a.hp / a.maxHp) - (b.hp / b.maxHp); })[0];
        if (hurt) c.giveShield(hurt, 2);
      }
      if (c.hasRelic('hungryHeart')) { c.tflags.buffAtk = (c.tflags.buffAtk || 0) + 1; }
    }
    var n1 = c.rng.int(0, 11);
    // maldição 5: destino pode favorecer inimigos
    if (c.diff.fateEnemyChance && c.rng.chance(c.diff.fateEnemyChance)) {
      var badFates = ['sombraCurta', 'destinoTorto'];
      var bf = badFates[c.rng.int(0, badFates.length - 1)];
      for (var i = 0; i < RA.data.Fate.length; i++) if (RA.data.Fate[i].id === bf) n1 = i;
      // e escudo pros inimigos
      c.aliveEnemies().forEach(function (en) { c.giveShield(en, 1); });
      c.say(RA.T({ pt: 'O Destino favorece o inimigo...', en: 'Fate favors the enemy...' }));
    }
    // regra do Dado Negro: destino só afeta inimigos
    if (c.blackRule === 'destinoInimigo') {
      c.aliveEnemies().forEach(function (en) { c.giveShield(en, 1); });
      c.fate = RA.data.Fate[n1]; c.fateFx = {};
      c.ev('fate', { fate: c.fate, enemyOnly: true });
      return;
    }
    // relíquia Runa do Controle / evento: escolher entre dois
    if ((c.hasRelic('fateChoice') || c.preMods.fateChoiceNext) && !isReroll) {
      var n2 = (n1 + 1 + c.rng.int(0, 10)) % 12;
      c.ask('fate', [RA.data.Fate[n1], RA.data.Fate[n2]], function (pick) {
        FX.setFate(c, RA.data.Fate[pick === 1 ? n2 : n1]);
      });
      return;
    }
    if (c.preMods.sorteTorre) n1 = Math.min(11, n1 + 1);
    FX.setFate(c, RA.data.Fate[n1]);
  };

  // ============================================================
  // PÓS-ROLAGEM (miragem, bruxa, regras, medo...)
  // ============================================================
  FX.afterRoll = function (c, first, ids) {
    var pool = c.dice.filter(function (x) { return !x.used && !x.blocked; });
    if (!pool.length) return;

    if (first) {
      // dado guardado (ampulheta / planejar)
      if (c.flags.storedFaces && c.flags.storedFaces.length) {
        c.flags.storedFaces.forEach(function (sf) {
          for (var i = 0; i < c.dice.length; i++) {
            var dd = c.dice[i];
            if (dd.heroIdx === sf.heroIdx && !dd.used && !dd._restored) {
              dd.faceIdx = sf.faceIdx; dd.bonus = sf.bonus; dd.locked = true; dd._restored = true;
              c.ev('storedBack', { id: dd.id });
              break;
            }
          }
        });
        c.flags.storedFaces = null;
        c.dice.forEach(function (dd) { dd._restored = false; });
      }
      // relíquia: primeiro dado da batalha +1
      if (c.turn === 1 && c.hasRelic('firstDiePlus')) pool[0].bonus += c.relicN('firstDiePlus');
      // caos: dados selvagens
      if (c.chaosRule && c.chaosRule.id === 'dadosSelvagens') {
        var wd = pool[c.rng.int(0, pool.length - 1)];
        wd.bonus += 2; c.ev('wildDie', { id: wd.id });
      }
      // regra: menor duplicado
      if (c.blackRule === 'menorDuplicado' && pool.length) {
        var low = pool.slice().sort(function (a, b) { return c.dieValue(a) - c.dieValue(b); })[0];
        c.dice.push({ heroIdx: low.heroIdx, faceIdx: low.faceIdx, locked: false, used: false, blocked: false, sacrificed: false, bonus: low.bonus, fake: -1, anim: { phase: 'landing', t: 0 }, id: c.dice.length, temp: true });
        c.ev('dup', { id: c.dice.length - 1 });
      }
      // regra: maior apagado
      if (c.blackRule === 'maiorApagado' && pool.length) {
        var high = pool.slice().sort(function (a, b) { return c.dieValue(b) - c.dieValue(a); })[0];
        high.blocked = true; c.ev('dieBlockedEv', { id: high.id });
      }
      // destino torto: +1 num, -1 noutro
      if (c.fateFx.crookedPending && pool.length >= 2) {
        c.fateFx.crookedPending = false;
        var ix = c.rng.int(0, pool.length - 1);
        var jx = (ix + 1 + c.rng.int(0, pool.length - 2)) % pool.length;
        pool[ix].bonus += 1; pool[jx].bonus -= 1;
        c.ev('crooked', { plus: pool[ix].id, minus: pool[jx].id });
      }
      // medo: dados dos amedrontados perdem 1
      c.dice.forEach(function (dd) {
        var hh = c.heroes[dd.heroIdx];
        if (hh && c.st(hh, 'fear') && !dd.used) dd.bonus -= 1;
      });
    } else {
      // vento instável: 1ª rerrolagem +1 em ataque/escudo
      if (c.fateFx.windReroll && ids.length) {
        c.fateFx.windReroll = false;
        var rd = null;
        for (var k = 0; k < c.dice.length; k++) if (c.dice[k].id === ids[0]) rd = c.dice[k];
        if (rd) {
          var rf = c.faceOf(rd);
          if (rf && (rf.sym === 'sword' || rf.sym === 'shield')) { rd.bonus += 1; c.ev('windPlus', { id: rd.id }); }
        }
      }
    }
    // bruxa: troca dois dados
    if (c.flags.witchSwap) {
      c.flags.witchSwap = false;
      if (pool.length >= 2) {
        var a = pool[c.rng.int(0, pool.length - 1)];
        var b = pool.filter(function (x) { return x !== a; })[0];
        var tf = a.faceIdx; a.faceIdx = b.faceIdx; b.faceIdx = tf;
        c.say(RA.T({ pt: 'A Bruxa troca seus dados!', en: 'The Witch swaps your dice!' }));
        c.ev('diceSwapped', { a: a.id, b: b.id });
      }
    }
    // inversão
    if (c.flags.invertNextRoll) {
      c.flags.invertNextRoll = false;
      var inv = pool[c.rng.int(0, pool.length - 1)];
      inv.faceIdx = (c.heroes[inv.heroIdx].faces.length - 1) - inv.faceIdx;
      c.ev('flip', { id: inv.id });
    }
    // miragem: valores falsos
    if (c.flags.mirage) {
      pool.forEach(function (dd) { if (!dd.locked) dd.fake = c.rng.int(0, c.heroes[dd.heroIdx].faces.length - 1); });
      c.ev('mirage', {});
    }
    // criança da sorte: baixos viram altos
    if (c.flags.lowToHigh) {
      pool.forEach(function (dd) {
        var ff = c.faceOf(dd);
        if (ff && ff.val > 0 && ff.val <= 2) dd.bonus = Math.max(dd.bonus, 5 - ff.val);
      });
    }
  };

  // ============================================================
  // INÍCIO DE BATALHA (relíquias de setup)
  // ============================================================
  FX.battleStart = function (c) {
    if (c.hasRelic('backFirstMiss')) c.flags.backMissReady = true;
    if (c.hasRelic('autoMark')) {
      var e0 = c.aliveEnemies()[0];
      if (e0) c.addStatus(e0, 'mark', 1);
    }
    if (c.hasRelic('hungryHeart')) {
      var vict = c.aliveHeroes()[c.rng.int(0, c.aliveHeroes().length - 1)];
      if (vict) c.damage(null, vict, 1, { pure: true, tag: 'curse' });
    }
    if (c.hasRelic('firstBuffTwo')) c.flags.firstBuffTwo = true;
    if (c.hasRelic('dodgePersist')) {
      var back = c.aliveHeroes().filter(function (h) { return h.row === 'back'; })[0];
      if (back) c.addStatus(back, 'dodge', 1);
    }
  };

  // ============================================================
  // INTENÇÕES INIMIGAS
  // ============================================================
  FX.enemyIntent = function (c, e, it) {
    if (e.bflags.delayed) { e.bflags.delayed = false; c.ev('enemySkip', { idx: e.slot, why: 'delay' }); return; }
    if (e.bflags.trap) { c.damage(null, e, e.bflags.trap, { pure: true, tag: 'hit' }); e.bflags.trap = 0; if (e.dead) return; }
    switch (it.k) {
      case 'atk': {
        var n = it.n;
        if (e.bflags.atkBonusOnce) { n += e.bflags.atkBonusOnce; e.bflags.atkBonusOnce = 0; }
        if (c.flags.enemyFirstAtkBonus) { n += c.flags.enemyFirstAtkBonus; c.flags.enemyFirstAtkBonus = 0; }
        var t = c.pickHeroTarget(e, it.tgt);
        if (t) c.damage(e, t, n, { isAttack: true, tag: 'hit' });
        e.hidden = false;
        break;
      }
      case 'shield': c.giveShield(e, it.n); break;
      case 'heal': {
        if (it.who === 'self') c.heal(e, e, it.n);
        else {
          var hurt = c.aliveEnemies().slice().sort(function (a, b) { return (a.hp / a.maxHp) - (b.hp / b.maxHp); })[0];
          c.heal(e, hurt || e, it.n);
        }
        break;
      }
      case 'st': {
        var n2 = it.n + (c.flags.enemyDotPlus && (it.s === 'poison' || it.s === 'bleed') ? c.flags.enemyDotPlus : 0);
        var targets;
        if (it.tgt === 'allH') targets = c.aliveHeroes();
        else if (it.tgt === 'allyE') { targets = c.aliveEnemies().filter(function (x) { return x !== e; }); if (!targets.length) targets = [e]; }
        else if (it.tgt === 'self') targets = [e];
        else {
          var pick = c.pickHeroTarget(e, it.tgt);
          targets = pick ? [pick] : [];
        }
        targets.forEach(function (t2) {
          var sd = RA.data.Statuses[it.s];
          if (t2.kind === 'hero' && sd && !sd.good && t2.bflags.reflectDebuff) {
            t2.bflags.reflectDebuff = false;
            c.addStatus(e, it.s, n2);
            c.say(RA.T({ pt: 'Refletido!', en: 'Reflected!' }));
          } else if (t2.kind === 'hero' && sd && !sd.good && c.hasRelic('debuffReflect') && !c.flags.reflectDone) {
            c.flags.reflectDone = true;
            c.addStatus(e, it.s, n2);
            c.addStatus(t2, it.s, n2);
          } else c.addStatus(t2, it.s, n2);
        });
        break;
      }
      case 'summon': c.summonEnemy(it.id); break;
      case 'special': {
        var sp = FX.Specials[it.id];
        if (sp) sp(c, e, it.n || 0);
        else c.ev('unknownFx', { k: 'sp:' + it.id });
        break;
      }
    }
  };

  // ============================================================
  // ESPECIAIS DOS INIMIGOS
  // ============================================================
  var SP = FX.Specials = {};
  SP.roubaMoeda = function (c, e, n) {
    var g = Math.min(c.ctx.getGold(), n);
    if (g > 0) { c.ctx.addGold(-g); c.bstats.goldStolen += g; c.ev('goldSteal', { idx: e.slot, n: g }); }
    else { var t = c.pickHeroTarget(e); if (t) c.damage(e, t, 1, { isAttack: true }); }
  };
  SP.carrega = function (c, e) { e.charge++; c.addStatus(e, 'charge', 1); c.ev('charging', { idx: e.slot }); };
  SP.fugir = function (c, e) { e.fled = true; c.ev('flee', { idx: e.slot }); c.checkEnd(); };
  SP.acende = function (c, e) { e.bflags.lit = true; c.ev('fuse', { idx: e.slot }); c.say(RA.T({ pt: 'O pavio está aceso!', en: 'The fuse is lit!' })); };
  SP.explode = function (c, e, n) {
    c.aliveHeroes().filter(function (h) { return h.row === 'front'; }).forEach(function (h) { c.damage(e, h, n, { isAttack: true, tag: 'hit' }); });
    c.damage(null, e, 999, { pure: true, tag: 'hit' });
  };
  SP.explodeVeneno = function (c, e, n) {
    c.aliveHeroes().forEach(function (h) { c.addStatus(h, 'poison', n); });
    c.damage(null, e, 999, { pure: true, tag: 'poison' });
  };
  SP.esconde = function (c, e) { e.hidden = true; c.ev('hide', { idx: e.slot }); };
  SP.travada = SP.travaDado = SP.bloqueiaDado = function (c, e) { c.flags.lockNextDie = true; c.ev('willLock', { idx: e.slot }); };
  SP.forjaEscudo = function (c, e, n) { c.aliveEnemies().forEach(function (x) { c.giveShield(x, n); }); };
  SP.atropela = function (c, e, n) {
    c.aliveHeroes().filter(function (h) { return h.row === 'front'; }).forEach(function (h) { c.damage(e, h, n || 3, { isAttack: true }); });
  };
  SP.copiaMaiorDado = function (c, e) {
    var n = c.flags.lastTurnMaxDie || 3;
    var t = c.pickHeroTarget(e);
    if (t) c.damage(e, t, n, { isAttack: true });
  };
  SP.curaTudo = function (c, e, n) { c.aliveEnemies().forEach(function (x) { c.heal(e, x, n || 2); }); };
  SP.reflete = function (c, e) { c.addStatus(e, 'counter', 2); };
  SP.regenera = function (c, e, n) { c.addStatus(e, 'regen', n || 2); };
  SP.drenaCura = function (c, e, n) {
    var t = c.pickHeroTarget(e);
    if (t) { var done = c.damage(e, t, n || 2, { isAttack: true }); c.heal(e, e, done); }
  };
  SP.badalada = function (c, e) { c.aliveHeroes().forEach(function (h) { c.addStatus(h, 'vulnerable', 1); }); c.ev('bell', { idx: e.slot }); };
  SP.rolaCaos = function (c, e) {
    var opts = ['poison', 'weak', 'blind', 'fear', 'curse'];
    var t = c.pickHeroTarget(e, 'random');
    if (t) c.addStatus(t, opts[c.rng.int(0, opts.length - 1)], 1);
  };
  SP.copiaMagia = function (c, e) {
    if (c.flags.lastMagic) {
      var t = c.pickHeroTarget(e, 'random');
      if (t) c.damage(e, t, c.flags.lastMagic.val, { isAttack: true, magic: true, tag: 'magic' });
    } else c.giveShield(e, 2);
  };
  SP.punirReroll = function (c, e) { c.flags.punirReroll = true; c.say(RA.T({ pt: 'Rerrolar terá um preço...', en: 'Rerolling will cost you...' })); };
  SP.inverteDado = function (c, e) { c.flags.invertNextRoll = true; };
  SP.drenaSorte = function (c, e) { c.flags.drenaSorte = true; c.ev('luckDrain', { idx: e.slot }); };
  SP.enigma = function (c, e) {
    var pool = c.dice.filter(function (x) { return !x.used && !x.blocked; });
    if (pool.length) { c.flags.enigmaDieId = pool[c.rng.int(0, pool.length - 1)].id; c.ev('riddle', { id: c.flags.enigmaDieId }); }
  };
  SP.mergulha = function (c, e) { e.hidden = true; e.bflags.atkBonusOnce = 2; c.ev('dive', { idx: e.slot }); };
  SP.julga = function (c, e) {
    var n = c.flags.lastTurnDiceUsed || 2;
    var t = c.pickHeroTarget(e);
    if (t) c.damage(e, t, n, { isAttack: true, tag: 'curse' });
  };
  SP.trocaDados = function (c, e) { c.flags.witchSwap = true; };
  SP.marretada = function (c, e, n) {
    if (e.charge >= 2) {
      e.charge = 0; delete e.statuses.charge;
      c.aliveHeroes().filter(function (h) { return h.row === 'front'; }).forEach(function (h) { c.damage(e, h, n || 10, { isAttack: true }); });
    } else {
      var t = c.pickHeroTarget(e);
      if (t) c.damage(e, t, 3, { isAttack: true });
    }
  };
  SP.trocaIntencao = function (c, e) { e.aiIdx = c.rng.int(0, e.def.ai.length - 1); c.computeIntent(e); };
  SP.miragem = function (c, e) { c.flags.mirage = true; c.say(RA.T({ pt: 'Miragens distorcem seus dados!', en: 'Mirages distort your dice!' })); };
  SP.preve = function (c, e) { c.flags.punishRepeat = 2; c.say(RA.T({ pt: 'O Oráculo prevê seus movimentos...', en: 'The Oracle foresees your moves...' })); };
  SP.punheRepeticao = function (c, e, n) { c.flags.punishRepeat = n || 2; };
  SP.regraNova = function (c, e) { FX.rollBlackRule(c); };
  SP.reforja = function (c, e) {
    var pool = c.dice.filter(function (x) { return !x.used && !x.blocked; });
    if (pool.length) {
      var d = pool[c.rng.int(0, pool.length - 1)];
      d.tempFace = RA.data.RuneFaces.list[c.rng.int(0, RA.data.RuneFaces.list.length - 1)];
      c.ev('reforged', { id: d.id });
      c.say(RA.T({ pt: 'O Ferreiro reforja um dado!', en: 'The Smith reforges a die!' }));
    }
  };
  SP.marteladaDado = function (c, e) {
    var hs = c.aliveHeroes();
    if (hs.length) {
      var h = hs[c.rng.int(0, hs.length - 1)];
      var f = h.faces[c.rng.int(0, h.faces.length - 1)];
      f.cracked = true;
      if (f.uses === undefined) f.uses = 2;
      c.ev('crack', { idx: h.slot });
      c.say(RA.T({ pt: 'Uma face trinca sob o martelo!', en: 'A face cracks under the hammer!' }));
    }
  };
  SP.sorteLouca = function (c, e) {
    var r = c.rng.int(0, 3);
    if (r === 0) c.heal(e, e, 3);
    else if (r === 1) c.addStatus(e, 'inspire', 1);
    else if (r === 2) { var t = c.pickHeroTarget(e, 'random'); if (t) c.addStatus(t, 'weak', 1); }
    else c.flags.invertNextRoll = true;
  };
  SP.apagaNumeros = function (c, e) {
    c.blackRule = 'semNumeros';
    c.ev('blackRule', { rule: 'semNumeros' });
    c.say(RA.T({ pt: 'Os números somem dos seus dados!', en: 'The numbers vanish from your dice!' }));
  };
  SP.copiaHeroi = function (c, e) {
    var hs = c.aliveHeroes();
    if (!hs.length) return;
    var h = hs[c.rng.int(0, hs.length - 1)];
    var atkFace = 3;
    (h.faces || []).forEach(function (f) { if (f.sym === 'sword' && f.val > atkFace) atkFace = f.val; });
    var def = {
      id: 'copia_' + h.id,
      name: { pt: h.name.pt + ' Sombrio', en: 'Dark ' + h.name.en },
      hp: 6, region: 'torre', arch: 'fantasma', tier: 'comum',
      ai: [{ k: 'atk', n: Math.min(4, atkFace), tgt: 'random' }, { k: 'st', s: 'fear', n: 1, tgt: 'random' }]
    };
    if (c.aliveEnemies().length < 5) {
      var hp = def.hp;
      var unit = { kind: 'enemy', slot: c.enemies.length, id: def.id, def: def, name: def.name, hp: hp, maxHp: hp, row: 'front', shield: 0, statuses: {}, aiIdx: 0, charge: 0, hidden: false, dead: false, fled: false, intent: null, tier: 'comum', mech: null, bflags: {}, summoned: true, heroCopy: h.id };
      c.enemies.push(unit);
      c.computeIntent(unit);
      c.ev('summonEnemy', { idx: unit.slot, id: def.id });
    }
  };

  // ============================================================
  // REGRAS DO DADO NEGRO
  // ============================================================
  FX.BlackRules = [
    { id: 'curaCausaDano', pt: 'Cura causa dano!', en: 'Healing deals damage!' },
    { id: 'escudoMetade', pt: 'Escudos valem metade!', en: 'Shields are halved!' },
    { id: 'ataquesAleatorios', pt: 'Ataques acertam alvos aleatórios!', en: 'Attacks hit random targets!' },
    { id: 'travadosProibidos', pt: 'Dados travados não podem ser usados!', en: 'Locked dice cannot be used!' },
    { id: 'inimigosCopiam', pt: 'O Dado Negro copia seu maior dado!', en: 'The Black Die copies your highest die!' },
    { id: 'sacrificioDado', pt: 'O primeiro dado será devorado!', en: 'The first die will be devoured!' },
    { id: 'simbolosProibidos', pt: 'Símbolos repetidos são proibidos!', en: 'Repeated symbols are forbidden!' },
    { id: 'destinoInimigo', pt: 'O Destino serve ao inimigo!', en: 'Fate serves the enemy!' },
    { id: 'statusDobram', pt: 'Todos os status dobram!', en: 'All statuses are doubled!' },
    { id: 'rerollDano', pt: 'Cada rerrolagem fere o grupo!', en: 'Each reroll wounds the party!' },
    { id: 'menorDuplicado', pt: 'O menor dado é duplicado!', en: 'The lowest die is duplicated!' },
    { id: 'maiorApagado', pt: 'O maior dado é apagado!', en: 'The highest die is erased!' }
  ];
  FX.rollBlackRule = function (c) {
    var r = FX.BlackRules[c.rng.int(0, FX.BlackRules.length - 1)];
    c.blackRule = r.id;
    c.ev('blackRule', { rule: r.id, name: r });
    c.say(RA.UI('newRule') + ' ' + RA.T(r));
  };

  // ============================================================
  // MECÂNICAS DE CHEFES
  // ============================================================
  var M = RA.game.Mechs = {};
  M.reiGoblin = {
    onAllyDeath: function (c, e) {
      e.bflags.atkBonus = (e.bflags.atkBonus || 0) + 1;
      c.say(RA.T({ pt: 'O Rei Goblin ruge de fúria! (+1 dano)', en: 'The Goblin King roars in fury! (+1 damage)' }));
    }
  };
  M.bruxaPantano = {
    onTurnStart: function (c, e) {
      if (c.turn % 3 === 0) { c.flags.witchSwap = true; }
    }
  };
  M.hidraOssos = {
    onBattleStart: function (c, e) { e.bflags.heads = 3; },
    onTurnStart: function (c, e) {
      var pct = e.hp / e.maxHp;
      if (e.bflags.heads === 3 && pct < 0.67) { e.bflags.heads = 2; headFalls(c, e); }
      if (e.bflags.heads === 2 && pct < 0.34) { e.bflags.heads = 1; headFalls(c, e); }
    },
    afterAct: function (c, e) {
      // menos cabeças = mais fúria: ataques extras
      var extra = 3 - (e.bflags.heads || 3);
      for (var i = 0; i < extra && !c.over; i++) {
        var t = c.pickHeroTarget(e, 'random');
        if (t) c.damage(e, t, 2, { isAttack: true });
      }
    }
  };
  function headFalls(c, e) {
    e.bflags.atkBonus = (e.bflags.atkBonus || 0) + 1;
    c.say(RA.T({ pt: 'Uma cabeça cai — as outras enfurecem!', en: 'A head falls — the others rage!' }));
    c.ev('bossPhase', { idx: e.slot });
    c.aliveHeroes().forEach(function (h) { c.addStatus(h, 'fear', 1); });
  }
  M.giganteForja = {
    beforeAct: function (c, e, it) {
      if (it.k === 'special' && it.id === 'marretada' && e.charge < 2) return { k: 'atk', n: 3, tgt: 'front' };
      return null;
    },
    onTurnStart: function (c, e) {
      if (e.charge >= 2) c.say(RA.T({ pt: 'O MARTELO VAI CAIR! Defenda-se!', en: 'THE HAMMER WILL FALL! Brace!' }));
    }
  };
  M.duqueMascaras = {
    onBattleStart: function (c, e) { e.bflags.hideHp = true; },
    onTurnStart: function (c, e) {
      var clones = c.aliveEnemies().filter(function (x) { return x.id === 'clone_duque'; });
      if (!clones.length && c.turn > 1 && c.rng.chance(0.5)) c.summonEnemy('clone_duque');
    },
    onAllyDeath: function (c, e, dead) {
      if (dead.id === 'clone_duque') { c.damage(null, e, 2, { pure: true }); e.bflags.hideHp = false; }
    }
  };
  M.rainhaMiragem = {
    onTurnStart: function (c, e) { if (c.turn % 2 === 1) c.flags.mirage = true; }
  };
  M.oraculoAfogado = {
    onBattleStart: function (c, e) { c.say(RA.T({ pt: '"Eu já vi como isso termina", diz o Oráculo.', en: '"I have seen how this ends," says the Oracle.' })); }
  };
  M.dadoNegro = {
    onBattleStart: function (c, e) { FX.rollBlackRule(c); },
    onTurnStart: function (c, e) { FX.rollBlackRule(c); },
    beforeAct: function (c, e, it) {
      if (c.blackRule === 'inimigosCopiam' && c.flags.maxDieUsedThisTurn > 0) {
        return { k: 'atk', n: c.flags.maxDieUsedThisTurn, tgt: 'random' };
      }
      return null;
    }
  };
  // ---- chefes secretos ----
  M.ferreiroCego = {
    onTurnStart: function (c, e) { SP.reforja(c, e); }
  };
  M.criancaSorte = {
    onBattleStart: function (c, e) {
      c.flags.randomTargets = true;
      c.flags.lowToHigh = true;
      c.say(RA.T({ pt: '"Vamos jogar!", ri a Criança. Valores baixos viram altos, mas ninguém escolhe o alvo.', en: '"Let\'s play!" the Child laughs. Low values turn high, but no one picks targets.' }));
    }
  };
  M.reiSemNumero = {
    onBattleStart: function (c, e) {
      c.blackRule = 'semNumeros';
      c.ev('blackRule', { rule: 'semNumeros' });
      c.say(RA.T({ pt: 'Os números fogem da presença do Rei. Lute com símbolos!', en: 'Numbers flee the King\'s presence. Fight with symbols!' }));
    }
  };
  M.maeDasFaces = {
    onBattleStart: function (c, e) { SP.copiaHeroi(c, e); }
  };

  // ============================================================
  // AÇÕES EXTRAS DA UI (relíquias ativas)
  // ============================================================
  // Luva do Trapaceiro: virar um dado 1x por turno
  RA.game.Combat.prototype.canFlip = function () {
    return !!(this.hasRelic('flipOncePerTurn') && !this.tflags.flipUsed && this.phase === 'player' && !this.over && !this.pendingChoice);
  };
  RA.game.Combat.prototype.flipDie = function (i) {
    if (!this.canFlip()) return false;
    var d = this.dice[i];
    if (!d || d.used || d.blocked) return false;
    this.tflags.flipUsed = true;
    d.faceIdx = (this.heroes[d.heroIdx].faces.length - 1) - d.faceIdx; d.fake = -1;
    this.ev('flip', { id: d.id });
    return true;
  };
  // troca de dados entre heróis (relíquia swapOncePerTurn)
  RA.game.Combat.prototype.canSwap = function () {
    return !!(this.hasRelic('swapOncePerTurn') && !this.tflags.swapUsed && this.phase === 'player' && !this.over);
  };
  RA.game.Combat.prototype.swapDicePair = function (i, j) {
    if (!this.canSwap()) return false;
    var a = this.dice[i], b = this.dice[j];
    if (!a || !b || a.used || b.used || a.blocked || b.blocked) return false;
    this.tflags.swapUsed = true;
    var t = a.heroIdx; a.heroIdx = b.heroIdx; b.heroIdx = t;
    this.ev('diceSwapped', { a: a.id, b: b.id });
    return true;
  };

  // gancho no fim do turno do jogador (chamado pelo Combat.endTurn via monkeypatch leve)
  var baseEndTurn = RA.game.Combat.prototype.endTurn;
  RA.game.Combat.prototype.endTurn = function () {
    if (this.phase !== 'player' || this.over || this.pendingChoice) return false;
    var c = this;
    // face dourada: copia o último dado usado a 50%
    if (this.fateFx.copyLastHalf && this.tflags.lastDie && this.tflags.lastDie.face && !this.tflags.lastDie.face._copying) {
      var ld = this.tflags.lastDie;
      ld.face._copying = true;
      runFxList(this, ld.hero, ld.face, ld.face.fx || [], Math.max(1, Math.ceil(ld.value / 2)), ld.target, ld.die);
      ld.face._copying = false;
      this.fateFx.copyLastHalf = false;
    }
    // relíquia: dados travados não usados protegem
    if (this.hasRelic('lockedProtected')) {
      this.dice.forEach(function (d) {
        if (d.locked && !d.used && !d.blocked) {
          var h = c.heroes[d.heroIdx];
          if (h && !h.dead && !h.downed) c.giveShield(h, 1, { quiet: false });
        }
      });
    }
    // memória p/ especiais do próximo turno
    this.flags.lastTurnMaxDie = this.flags.maxDieUsedThisTurn || 0;
    this.flags.maxDieUsedThisTurn = 0;
    this.flags.lastTurnDiceUsed = this.tflags.diceUsed;
    this.flags.punirReroll = false;
    // hidra: cabeças extras agem depois do ato principal
    var r = baseEndTurn.call(this);
    return r;
  };

  // gancho afterAct dos chefes (hidra)
  var baseEnemyAct = RA.game.Combat.prototype.enemyAct;
  RA.game.Combat.prototype.enemyAct = function (e) {
    baseEnemyAct.call(this, e);
    if (!e.dead && !this.over && e.mech && RA.game.Mechs[e.mech] && RA.game.Mechs[e.mech].afterAct) {
      RA.game.Mechs[e.mech].afterAct(this, e);
    }
  };

  RA.game.FXHooks = FX;
})();
