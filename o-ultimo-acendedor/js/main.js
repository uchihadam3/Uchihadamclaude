// main.js: orquestra o mundo de três biomas — música por área com troca
// automática, três encontros de chefe (portão sela a arena; barreira à
// frente só abre com o chefe morto), 29 inimigos, lampiões-checkpoint.
(function () {
  var cfg = LK.config;
  var canvas = document.getElementById('gameCanvas');
  var disp = LK.core.Display.setup(canvas);
  var ctx = disp.ctx;

  var room = LK.world.Room1.build();
  var level = room.level;
  var particles = new LK.gfx.Particles();
  var biome = new LK.world.Biomes(level, room.biomeBounds);
  var lamps = new LK.world.Lamps(level, particles);
  var lighting = new LK.gfx.Lighting();
  var camera = new LK.core.Camera();
  var player = new LK.entities.Player(level, particles);

  var BESTIARY = {};
  Object.keys(LK.entities.Bestiary).forEach(function (k) { BESTIARY[k] = LK.entities.Bestiary[k]; });
  Object.keys(LK.entities.Bestiary2).forEach(function (k) { BESTIARY[k] = LK.entities.Bestiary2[k]; });

  var enemies = room.enemies.map(function (sp) {
    return new BESTIARY[sp.type](sp.x, sp.y);
  });

  // ---- encontros de chefe ----
  function setCells(cells, solid) {
    if (!cells) return;
    for (var gy = cells.y0; gy <= cells.y1; gy++) {
      for (var gx = cells.x0; gx <= cells.x1; gx++) {
        level.solid[gy][gx] = solid;
      }
    }
  }

  var encounters = room.arenas.map(function (spec) {
    var boss = new LK.entities[spec.bossType](spec, particles);
    setCells(spec.barrier, true); // barreiras fechadas até o chefe cair
    return { spec: spec, boss: boss, defeated: false, victoryShownAt: -1 };
  });

  var touchControls = new LK.core.TouchControls();
  var haptics = LK.core.Haptics;
  LK.audio.init();
  LK.audio.playMusic('grutas');

  camera.setBounds({ minX: 0, minY: 0, maxX: level.pxW, maxY: level.pxH });

  var gameTime = 0;
  var musicSilenceUntil = 0;
  var lightsScratch = [];

  window.__LK_DEBUG = {
    player: player, level: level, camera: camera, frameCount: 0,
    lamps: lamps, enemies: enemies, encounters: encounters, biome: biome
  };

  var STEP = 1 / 60;
  var acc = 0;
  var last = performance.now();
  var paused = false;
  window.addEventListener('blur', function () { paused = true; });
  window.addEventListener('focus', function () { paused = false; last = performance.now(); });

  function areaKeyAt(x) {
    if (x >= room.biomeBounds.coracaoStartX) return 'coracao';
    if (x >= room.biomeBounds.jardimStartX) return 'jardim';
    return 'grutas';
  }

  function anyBossActive() {
    for (var i = 0; i < encounters.length; i++) {
      if (encounters[i].boss.active && !encounters[i].boss.dead) return encounters[i];
    }
    return null;
  }

  function onBossDefeated(enc) {
    enc.defeated = true;
    enc.victoryShownAt = gameTime;
    setCells(enc.spec.gate, false);
    setCells(enc.spec.barrier, false);
    for (var i = 0; i < lamps.list.length; i++) {
      var lamp = lamps.list[i];
      if (Math.abs(lamp.x - enc.spec.victoryLampCol * 24) < 60) {
        lamp.lit = true;
        player.respawnPoint = { x: lamp.x, y: lamp.y - 4 };
      }
    }
    LK.audio.sfx('lamp');
    haptics.pulse([20, 40, 30, 40, 60]);
    musicSilenceUntil = gameTime + 3;
  }

  function simulate(dt) {
    gameTime += dt;
    var cmd = LK.core.Input.poll();

    if (player.hitPause > 0) {
      player.hitPause -= dt;
      particles.update(dt * 0.12);
      return;
    }

    player.update(dt, cmd);

    // ---- música por área (fora de luta e fora do silêncio pós-vitória) ----
    if (!anyBossActive() && gameTime > musicSilenceUntil) {
      LK.audio.playMusic(areaKeyAt(player.x));
    }

    // ---- encontros ----
    for (var b = 0; b < encounters.length; b++) {
      var enc = encounters[b];
      var boss = enc.boss;
      var spec = enc.spec;

      // o gatilho exige estar DENTRO da arena (x e y), não só à direita dela
      if (!boss.active && !boss.dead && !enc.defeated &&
        player.x > spec.triggerX && player.x < spec.maxX + 24 &&
        player.y > spec.triggerYMin && player.y < spec.floorY + 60) {
        boss.start();
        setCells(spec.gate, true);
        camera.shake(0.5);
      }

      if (boss.active && !enc.defeated) {
        boss.update(dt, player, level);
        if (boss.overlapsPlayer(player)) {
          if (player.takeDamage(boss.contactDamage, boss.x)) {
            camera.shake(0.5);
            haptics.pulse([28, 34, 44]);
          }
        }
        if ((boss.state === 'slamRecover' || boss.state === 'exhausted') && boss.stateTime < 0.05) camera.shake(0.7);
        if (boss.dead && boss.stateTime > 2.4) onBossDefeated(enc);
      }
    }

    // ---- inimigos ----
    for (var i = enemies.length - 1; i >= 0; i--) {
      var e = enemies[i];
      e.update(dt, player, level, particles);
      if (e.dead && e.deathTimer <= 0) { enemies.splice(i, 1); continue; }
      if (!e.dead && e.overlapsPlayer(player)) {
        if (player.takeDamage(e.contactDamage, e.x)) {
          camera.shake(0.42);
          haptics.pulse([28, 34, 44]);
        }
      }
    }

    // ---- golpe do jogador ----
    var hb = player.getAttackHitbox();
    if (hb && !player.attackHitDone) {
      var connected = false;

      var targets = enemies.slice();
      for (var tb = 0; tb < encounters.length; tb++) {
        if (encounters[tb].boss.active && !encounters[tb].boss.dead) targets.push(encounters[tb].boss);
      }

      for (var j = 0; j < targets.length; j++) {
        var en = targets[j];
        if (en.dead || !en.overlapsBox(hb)) continue;
        var result = en.hurt(player.attackDamage, player.x, hb.dir);
        if (result === 'blocked') {
          particles.burst(en.x + (player.x < en.x ? -en.hw : en.hw), en.y - 2, 10, {
            speedMin: 60, speedMax: 200, g: 200, drag: 2,
            color: ['#c9c9c9', '#8a8a8a', '#fff'],
            lifeMin: 0.1, lifeMax: 0.28, kind: 'spark', sizeMin: 1, sizeMax: 2
          });
          player.hitPause = Math.max(player.hitPause, 0.03);
          if (hb.dir === 'side') player.vx = -player.facing * 200;
          camera.shake(0.15);
          LK.audio.sfx('clank');
          haptics.pulse([10, 20, 10]);
        } else if (result === 'hit' || result === 'dead') {
          player.onHitConnected(en.x, en.y);
          camera.shake(result === 'dead' ? 0.45 : 0.25);
          LK.audio.sfx(result === 'dead' ? 'enemyDeath' : 'hit');
          haptics.pulse(result === 'dead' ? [14, 26, 30] : 12);
          if (result === 'dead') {
            particles.burst(en.x, en.y, 22, {
              speedMin: 60, speedMax: 240, g: 160, drag: 2,
              color: ['#fff2c9', '#ffd27a', '#c9e8f2'],
              lifeMin: 0.25, lifeMax: 0.7, kind: 'spark', sizeMin: 1.5, sizeMax: 3
            });
          }
        }
        connected = true;
      }

      var projs = LK.entities.projectiles;
      for (var pj = projs.length - 1; pj >= 0; pj--) {
        var pr = projs[pj];
        if (Math.abs(pr.x - hb.x) < hb.hw + 4 && Math.abs(pr.y - hb.y) < hb.hh + 4) {
          particles.burst(pr.x, pr.y, 10, {
            speedMin: 50, speedMax: 160, g: 250,
            color: ['#8cc83c', '#d8ff5c'],
            lifeMin: 0.15, lifeMax: 0.4, kind: 'spark', sizeMin: 1.5, sizeMax: 2.5
          });
          projs.splice(pj, 1);
          connected = true;
          player.onHitConnected(pr.x, pr.y);
          LK.audio.sfx('hit');
        }
      }
      if (connected) player.attackHitDone = true;
    }

    LK.entities.updateProjectiles(dt, level, player, particles);

    var litBefore = 0;
    for (var lb = 0; lb < lamps.list.length; lb++) if (lamps.list[lb].lit) litBefore++;
    lamps.update(dt, player);
    var litAfter = 0;
    for (var la = 0; la < lamps.list.length; la++) if (lamps.list[la].lit) litAfter++;
    if (litAfter > litBefore) {
      haptics.pulse([12, 30, 20, 30, 40]);
      LK.audio.sfx('lamp');
    }

    biome.update(dt);
    particles.update(dt);

    if (player.dead) {
      var rp = player.respawnPoint || { x: level.spawn.x, y: level.spawn.y - 20 };
      player.hp = cfg.PLAYER_MAX_HP;
      player.dead = false;
      player.x = rp.x; player.y = rp.y - 20;
      player.vx = 0; player.vy = 0;
      player.invuln = 1.2;
      camera.shake(0.5);
      LK.audio.sfx('respawn');
      // morreu numa luta: o chefe reseta e o portão reabre
      var fighting = anyBossActive();
      if (fighting) {
        var fb = fighting.boss, fs = fighting.spec;
        fb.active = false;
        fb.hp = fb.maxHp;
        fb._lastPhase = 0;
        fb._airAttacks = 0;
        fb.x = fs.bossX; fb.y = fs.bossType === 'BossDevorador' ? -60 : fs.bossY;
        fb.setState('dormant');
        if (fb.shockwaves) fb.shockwaves.length = 0;
        if (fb.spikes) fb.spikes.length = 0;
        if (fb.pillars) fb.pillars.length = 0;
        if (fb.vine !== undefined) fb.vine = null;
        setCells(fs.gate, false);
        LK.audio.playMusic(areaKeyAt(player.x));
      }
    }
  }

  function render() {
    var viewW = disp.state.w, viewH = disp.state.h;
    camera.update(STEP, player, viewW, viewH, player.facing);
    var cam = camera.renderOffset();

    biome.renderBackground(ctx, cam, viewW, viewH);
    biome.renderTerrain(ctx, cam, viewW, viewH);
    biome.renderProps(ctx, cam, viewW, viewH);
    lamps.render(ctx, cam.x, cam.y);
    for (var ei = 0; ei < enemies.length; ei++) enemies[ei].render(ctx, cam.x, cam.y);
    for (var bi = 0; bi < encounters.length; bi++) encounters[bi].boss.render(ctx, cam.x, cam.y);
    LK.entities.renderProjectiles(ctx, cam.x, cam.y);
    particles.render(ctx, cam.x, cam.y, viewW, viewH);
    player.render(ctx, cam.x, cam.y);

    lightsScratch.length = 0;
    biome.collectLights(lightsScratch, gameTime);
    lamps.collectLights(lightsScratch);
    LK.entities.collectProjectileLights(lightsScratch);
    var darknessBoost = 0;
    for (var bl = 0; bl < encounters.length; bl++) {
      var bb = encounters[bl].boss;
      bb.collectLights(lightsScratch);
      if (bb.darknessPulse) darknessBoost = Math.max(darknessBoost, bb.darknessPulse);
    }
    // inimigos com luz própria (vaga-lume, portador canalizando)
    for (var el = 0; el < enemies.length; el++) {
      if (enemies[el].collectLights) enemies[el].collectLights(lightsScratch);
    }
    lightsScratch.push({
      x: player.x - player.facing * 8, y: player.y,
      radius: 85 + Math.sin(gameTime * 9.7) * 5,
      color: '255,210,140', intensity: 0.6
    });
    lighting.render(ctx, lightsScratch, cam, viewW, viewH, 0.6 + darknessBoost * 0.24);

    var vg = ctx.createRadialGradient(viewW / 2, viewH / 2, viewH * 0.42, viewW / 2, viewH / 2, viewH * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(2,4,8,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, viewW, viewH);

    // HUD: vida
    for (var i = 0; i < cfg.PLAYER_MAX_HP; i++) {
      var hx = 14 + i * 16, hy = 14;
      ctx.strokeStyle = 'rgba(200,190,160,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
      ctx.stroke();
      if (i < player.hp) {
        ctx.fillStyle = '#ffd27a';
        ctx.beginPath();
        ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // barra do chefe em luta
    var fighting = anyBossActive();
    if (fighting) {
      var boss = fighting.boss;
      var bw = Math.min(280, viewW * 0.6);
      var bx = (viewW - bw) / 2, by = viewH - 26;
      ctx.fillStyle = 'rgba(10,8,14,0.7)';
      ctx.fillRect(bx - 2, by - 2, bw + 4, 12);
      ctx.strokeStyle = 'rgba(200,160,220,0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx - 2, by - 2, bw + 4, 12);
      var frac = Math.max(0, boss.hp / boss.maxHp);
      ctx.fillStyle = boss.phase() === 3 ? '#ff5a2a' : '#b06ae8';
      ctx.fillRect(bx, by, bw * frac, 8);
      ctx.fillStyle = 'rgba(230,220,240,0.85)';
      ctx.font = '9px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(fighting.spec.name, viewW / 2, by - 6);
      ctx.textAlign = 'left';
    }

    // texto de vitória
    for (var vt = 0; vt < encounters.length; vt++) {
      var enc2 = encounters[vt];
      if (enc2.victoryShownAt >= 0 && gameTime - enc2.victoryShownAt < 5) {
        ctx.fillStyle = 'rgba(255,242,201,' + Math.min(1, 5 - (gameTime - enc2.victoryShownAt)) + ')';
        ctx.font = '16px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText(enc2.spec.victoryText, viewW / 2, viewH * 0.3);
        ctx.textAlign = 'left';
      }
    }
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (paused) return;
    window.__LK_DEBUG.frameCount++;
    acc += Math.min(0.1, (now - last) / 1000);
    last = now;
    while (acc >= STEP) {
      simulate(STEP);
      acc -= STEP;
    }
    render();
  }
  requestAnimationFrame(tick);
})();
