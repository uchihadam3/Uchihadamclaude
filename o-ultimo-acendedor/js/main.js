// main.js: loop de passo fixo (simulação nunca depende do frame rate) com
// hit-pause global — o congelamento de ~3 frames no impacto que dá peso ao
// combate. Ordem de renderização: fundo parallax → terreno → lampiões →
// partículas → jogador → passada de luz → vinheta → HUD.
(function () {
  var cfg = LK.config;
  var canvas = document.getElementById('gameCanvas');
  var disp = LK.core.Display.setup(canvas);
  var ctx = disp.ctx;

  var level = LK.world.Room1.build();
  var particles = new LK.gfx.Particles();
  var biome = new LK.world.BiomeGrutas(level);
  var lamps = new LK.world.Lamps(level, particles);
  var lighting = new LK.gfx.Lighting();
  var camera = new LK.core.Camera();
  var player = new LK.entities.Player(level, particles);

  camera.setBounds({ minX: 0, minY: 0, maxX: level.pxW, maxY: level.pxH });

  var gameTime = 0;
  var lightsScratch = [];

  window.__LK_DEBUG = { player: player, level: level, camera: camera, frameCount: 0, lamps: lamps };

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

    // golpe conecta em... (por enquanto, nada além de cenário; inimigos na fase 4)

    lamps.update(dt, player);
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
    particles.render(ctx, cam.x, cam.y, viewW, viewH);
    player.render(ctx, cam.x, cam.y);

    // passada de luz
    lightsScratch.length = 0;
    biome.collectLights(lightsScratch, gameTime);
    lamps.collectLights(lightsScratch);
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
