// main.js: loop de passo fixo (simulação nunca depende do frame rate) com
// hit-pause global — o congelamento de ~3 frames no impacto que dá peso ao
// combate. Ordem de renderização: fundo parallax → terreno → lampiões →
// partículas → jogador → passada de luz → vinheta → HUD.
(function () {
  var cfg = LK.config;
  var canvas = document.getElementById('gameCanvas');
  var disp = LK.core.Display.setup(canvas);
  var ctx = disp.ctx;

  var room = LK.world.Room1.build();
  var level = room.level;
  var particles = new LK.gfx.Particles();
  var biome = new LK.world.BiomeGrutas(level);
  var lamps = new LK.world.Lamps(level, particles);
  var lighting = new LK.gfx.Lighting();
  var camera = new LK.core.Camera();
  var player = new LK.entities.Player(level, particles);

  var enemies = room.enemies.map(function (sp) {
    return new LK.entities.Bestiary[sp.type](sp.x, sp.y);
  });

  var touchControls = new LK.core.TouchControls();
  var haptics = LK.core.Haptics;

  camera.setBounds({ minX: 0, minY: 0, maxX: level.pxW, maxY: level.pxH });

  var gameTime = 0;
  var lightsScratch = [];

  window.__LK_DEBUG = { player: player, level: level, camera: camera, frameCount: 0, lamps: lamps, enemies: enemies };

  var STEP = 1 / 60;
  var acc = 0;
  var last = performance.now();
  var paused = false;
  window.addEventListener('blur', function () { paused = true; });
  window.addEventListener('focus', function () { paused = false; last = performance.now(); });

  function simulate(dt) {
    gameTime += dt;
    var cmd = LK.core.Input.poll();

    // hit-pause: congela o mundo, mantém partículas em câmera lentíssima
    if (player.hitPause > 0) {
      player.hitPause -= dt;
      particles.update(dt * 0.12);
      return;
    }

    player.update(dt, cmd);

    // ---- inimigos ----
    for (var i = enemies.length - 1; i >= 0; i--) {
      var e = enemies[i];
      e.update(dt, player, level, particles);
      if (e.dead && e.deathTimer <= 0) { enemies.splice(i, 1); continue; }
      // dano por contato
      if (!e.dead && e.overlapsPlayer(player)) {
        if (player.takeDamage(e.contactDamage, e.x)) {
          camera.shake(0.42);
          haptics.pulse([28, 34, 44]); // dor: pulso duplo pesado
        }
      }
    }

    // ---- golpe do jogador conecta ----
    var hb = player.getAttackHitbox();
    if (hb && !player.attackHitDone) {
      var connected = false;
      for (var j = 0; j < enemies.length; j++) {
        var en = enemies[j];
        if (en.dead || !en.overlapsBox(hb)) continue;
        var result = en.hurt(1, player.x, hb.dir);
        if (result === 'blocked') {
          // clank: faíscas cinzas, recuo maior, sem dano
          particles.burst(en.x + (player.x < en.x ? -en.hw : en.hw), en.y - 2, 10, {
            speedMin: 60, speedMax: 200, g: 200, drag: 2,
            color: ['#c9c9c9', '#8a8a8a', '#fff'],
            lifeMin: 0.1, lifeMax: 0.28, kind: 'spark', sizeMin: 1, sizeMax: 2
          });
          player.hitPause = Math.max(player.hitPause, 0.03);
          if (hb.dir === 'side') player.vx = -player.facing * 200;
          camera.shake(0.15);
          haptics.pulse([10, 20, 10]); // clank metálico
        } else {
          player.onHitConnected(en.x, en.y);
          camera.shake(result === 'dead' ? 0.45 : 0.25);
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
      // cortar bile no ar
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
    if (litAfter > litBefore) haptics.pulse([12, 30, 20, 30, 40]); // lampião aceso: crescendo
    biome.update(dt);
    particles.update(dt);

    // respawn simples ao morrer (fase de morte/renascimento completa depois)
    if (player.dead) {
      var rp = player.respawnPoint || { x: level.spawn.x, y: level.spawn.y - 20 };
      player.hp = cfg.PLAYER_MAX_HP;
      player.dead = false;
      player.x = rp.x; player.y = rp.y - 20;
      player.vx = 0; player.vy = 0;
      player.invuln = 1.2;
      camera.shake(0.5);
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
    LK.entities.renderProjectiles(ctx, cam.x, cam.y);
    particles.render(ctx, cam.x, cam.y, viewW, viewH);
    player.render(ctx, cam.x, cam.y);

    // passada de luz
    lightsScratch.length = 0;
    biome.collectLights(lightsScratch, gameTime);
    lamps.collectLights(lightsScratch);
    LK.entities.collectProjectileLights(lightsScratch);
    // lanterna do jogador: pequena bolha de luz pessoal
    lightsScratch.push({
      x: player.x - player.facing * 8, y: player.y,
      radius: 85 + Math.sin(gameTime * 9.7) * 5,
      color: '255,210,140', intensity: 0.6
    });
    lighting.render(ctx, lightsScratch, cam, viewW, viewH, 0.6);

    // vinheta
    var vg = ctx.createRadialGradient(viewW / 2, viewH / 2, viewH * 0.42, viewW / 2, viewH / 2, viewH * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(2,4,8,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, viewW, viewH);

    // HUD: máscaras de vida (estilo lâmpadas de óleo)
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
