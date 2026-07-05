// main.js: Phase 1 bootstrap - proves the core loop end to end (tile-map
// rendering, collision, procedural sprite animation, camera) before the
// battle/menu/world-expansion phases build on top of it.
(function () {
  var cfg = RPG.config;
  var canvas = document.getElementById('gameCanvas');
  var ctx = RPG.core.Canvas.setup(canvas);

  var heroFrames = RPG.gfx.CharacterSprite.buildFrameSet(RPG.data.Palettes.hero);
  var town = RPG.world.Town.build();
  var hero = new RPG.world.HeroController(heroFrames, town.spawn.x, town.spawn.y);

  function getCamera() {
    var mapPxW = town.tileMap.cols * cfg.TILE, mapPxH = town.tileMap.rows * cfg.TILE;
    var camX = hero.x - cfg.INTERNAL_W / 2;
    var camY = hero.y - cfg.INTERNAL_H / 2;
    camX = Math.max(0, Math.min(camX, Math.max(0, mapPxW - cfg.INTERNAL_W)));
    camY = Math.max(0, Math.min(camY, Math.max(0, mapPxH - cfg.INTERNAL_H)));
    return { x: camX, y: camY };
  }

  window.__RPG_DEBUG = {
    hero: hero, town: town, frameCount: 0
  };

  var last = performance.now();
  function tick(now) {
    requestAnimationFrame(tick);
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    window.__RPG_DEBUG.frameCount++;

    town.tileMap.update(dt);
    hero.update(dt, town.tileMap);

    var cam = getCamera();
    ctx.fillStyle = '#0a0a0e';
    ctx.fillRect(0, 0, cfg.INTERNAL_W, cfg.INTERNAL_H);
    town.tileMap.render(ctx, cam.x, cam.y, cfg.INTERNAL_W, cfg.INTERNAL_H);
    hero.render(ctx, cam.x, cam.y);

    RPG.core.Input.consumeFrame();
  }
  requestAnimationFrame(tick);
})();
