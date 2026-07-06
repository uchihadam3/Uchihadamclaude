// main.js: loop de passo fixo com hit-pause global. Orquestra: mundo grande,
// 16 inimigos, lampiões-checkpoint, música por área (grutas/chefe) e a luta
// contra o Devorador de Chamas (portão que sela a arena, barra de vida,
// vitória que reacende a arena).
(function () {
  var cfg = LK.config;
  var canvas = document.getElementById('gameCanvas');
  var disp = LK.core.Display.setup(canvas);
  var ctx = disp.ctx;

  var room = LK.world.Room1.build();
  var level = room.level;
  var arena = room.arena;
  var particles = new LK.gfx.Particles();
  var biome = new LK.world.BiomeGrutas(level);
  var lamps = new LK.world.Lamps(level, particles);
  var lighting = new LK.gfx.Lighting();
  var camera = new LK.core.Camera();
  var player = new LK.entities.Player(level, particles);

  var enemies = room.enemies.map(function (sp) {
    return new LK.entities.Bestiary[sp.type](sp.x, sp.y);
  });

  var boss = new LK.entities.BossDevorador(arena, particles);
  var gateClosed = false;
  var victory = false;

  var touchControls = new LK.core.TouchControls();
  var haptics = LK.core.Haptics;
  LK.audio.init();
  LK.audio.playMusic('grutas'); // fica pendente até o primeiro gesto

  camera.setBounds({ minX: 0, minY: 0, maxX: level.pxW, maxY: level.pxH });

  var gameTime = 0;
  var lightsScratch = [];

  window.__LK_DEBUG = {
    player: player, level: level, camera: camera, frameCount: 0,
    lamps: lamps, enemies: enemies, boss: boss, arena: arena
  };

  var STEP = 1 / 60;
  var acc = 0;
  var last = performance.now();
  var paused = false;
  window.addEventListener('blur', function () { paused = true; });
  window.addEventListener('focus', function () { paused = false; last = performance.now(); });

  function setGate(closed) {
    gateClosed = closed;
    for (var gy = arena.gate.y0; gy <= arena.gate.y1; gy++) {
      for (var gx = arena.gate.x0; gx <= arena.gate.x1; gx++) {
        level.solid[gy][gx] = closed;
      }
    }
  }

  function onBossDefeated() {
    victory = true;
    setGate(false);
    // a arena se reacende: lampião da vitória + chuva de fagulhas
    for (var i = 0; i < lamps.list.length; i++) {
      var lamp = lamps.list[i];
      if (Math.abs(lamp.x - arena.victoryLampCol * 24) < 48) {
        lamp.lit = true;
        player.respawnPoint = { x: lamp.x, y: lamp.y - 4 };
      }
    }
    LK.audio.sfx('lamp');
    haptics.pulse([20, 40, 30, 40, 60]);
    setTimeout(function () { LK.audio.playMusic('grutas'); }, 2500);
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

    // ---- gatilho da luta ----
    if (!boss.active && !boss.dead &&
      player.x > arena.triggerX && player.y > arena.gate.y1 * 24) {
      boss.start();
      setGate(true);
      camera.shake(0.5);
    }

    // ---- chefe ----
    if (boss.active && !victory) {
      boss.update(dt, player, level);
      if (boss.overlapsPlayer(player)) {
        if (player.takeDamage(boss.contactDamage, boss.x)) {
          camera.shake(0.5);
          haptics.pulse([28, 34, 44]);
        }
      }
      if (boss.state === 'slamRecover' && boss.stateTime < 0.05) camera.shake(0.7);
      if (boss.dead && boss.state === 'death' && boss.stateTime > 2.4) onBossDefeated();
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
      if (boss.active && !boss.dead) targets.push(boss);

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
      // morreu na luta: chefe reseta e o portão abre até você voltar
      if (boss.active && !boss.dead) {
        boss.active = false;
        boss.hp = boss.maxHp;
        boss._lastPhase = 0;
        boss.x = arena.bossX; boss.y = -60;
        boss.setState('dormant');
        boss.shockwaves.length = 0;
        setGate(false);
        LK.audio.playMusic('grutas');
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
    boss.render(ctx, cam.x, cam.y);
    LK.entities.renderProjectiles(ctx, cam.x, cam.y);
    particles.render(ctx, cam.x, cam.y, viewW, viewH);
    player.render(ctx, cam.x, cam.y);

    lightsScratch.length = 0;
    biome.collectLights(lightsScratch, gameTime);
    lamps.collectLights(lightsScratch);
    LK.entities.collectProjectileLights(lightsScratch);
    boss.collectLights(lightsScratch);
    lightsScratch.push({
      x: player.x - player.facing * 8, y: player.y,
      radius: 85 + Math.sin(gameTime * 9.7) * 5,
      color: '255,210,140', intensity: 0.6
    });
    var darkness = 0.6 + boss.darknessPulse * 0.24;
    lighting.render(ctx, lightsScratch, cam, viewW, viewH, darkness);

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

    // barra do chefe
    if (boss.active && !boss.dead) {
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
      ctx.fillText('O   D E V O R A D O R   D E   C H A M A S', viewW / 2, by - 6);
      ctx.textAlign = 'left';
    }
    if (victory && gameTime - (window.__victoryAt || (window.__victoryAt = gameTime)) < 5) {
      ctx.fillStyle = 'rgba(255,242,201,' + Math.min(1, 5 - (gameTime - window.__victoryAt)) + ')';
      ctx.font = '16px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText('A   C H A M A   R E S I S T E', viewW / 2, viewH * 0.3);
      ctx.textAlign = 'left';
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
