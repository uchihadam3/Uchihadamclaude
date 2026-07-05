// HeroController: 4-directional tile-world movement with collision against
// the TileMap, driving CharacterSprite's baked frames (idle + 2-frame walk
// cycle per direction).
(function () {
  var SPRITE_W = RPG.gfx.CharacterSprite.W, SPRITE_H = RPG.gfx.CharacterSprite.H;
  var RADIUS = 6; // collision half-width in pixels, smaller than a tile

  function HeroController(frameSet, x, y) {
    this.frames = frameSet;
    this.x = x; this.y = y;
    this.facing = 'down';
    this.moving = false;
    this.animTime = 0;
  }

  HeroController.prototype._tryMove = function (dx, dy, tileMap) {
    var nx = this.x + dx, ny = this.y + dy;
    if (!tileMap.isSolidAtPixel(nx - RADIUS, ny - RADIUS) &&
      !tileMap.isSolidAtPixel(nx + RADIUS, ny - RADIUS) &&
      !tileMap.isSolidAtPixel(nx - RADIUS, ny + RADIUS) &&
      !tileMap.isSolidAtPixel(nx + RADIUS, ny + RADIUS)) {
      this.x = nx; this.y = ny;
      return true;
    }
    // slide along walls: try each axis independently
    var moved = false;
    if (dx !== 0 && !tileMap.isSolidAtPixel(this.x + dx - RADIUS, this.y - RADIUS) &&
      !tileMap.isSolidAtPixel(this.x + dx + RADIUS, this.y - RADIUS) &&
      !tileMap.isSolidAtPixel(this.x + dx - RADIUS, this.y + RADIUS) &&
      !tileMap.isSolidAtPixel(this.x + dx + RADIUS, this.y + RADIUS)) {
      this.x += dx; moved = true;
    }
    if (dy !== 0 && !tileMap.isSolidAtPixel(this.x - RADIUS, this.y + dy - RADIUS) &&
      !tileMap.isSolidAtPixel(this.x + RADIUS, this.y + dy - RADIUS) &&
      !tileMap.isSolidAtPixel(this.x - RADIUS, this.y + dy + RADIUS) &&
      !tileMap.isSolidAtPixel(this.x + RADIUS, this.y + dy + RADIUS)) {
      this.y += dy; moved = true;
    }
    return moved;
  };

  HeroController.prototype.update = function (dt, tileMap) {
    var Input = RPG.core.Input;
    var dx = (Input.isDown('KeyD') || Input.isDown('ArrowRight') ? 1 : 0) -
      (Input.isDown('KeyA') || Input.isDown('ArrowLeft') ? 1 : 0);
    var dy = (Input.isDown('KeyS') || Input.isDown('ArrowDown') ? 1 : 0) -
      (Input.isDown('KeyW') || Input.isDown('ArrowUp') ? 1 : 0);

    this.moving = (dx !== 0 || dy !== 0);
    if (this.moving) {
      if (dx !== 0 && dy !== 0) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2; }
      var speed = RPG.config.WALK_SPEED * RPG.config.TILE;
      this._tryMove(dx * speed * dt, dy * speed * dt, tileMap);

      if (Math.abs(dx) > Math.abs(dy)) this.facing = dx > 0 ? 'right' : 'left';
      else if (dy !== 0) this.facing = dy > 0 ? 'down' : 'up';

      this.animTime += dt;
    } else {
      this.animTime = 0;
    }
  };

  HeroController.prototype.render = function (ctx, camX, camY) {
    var dir = this.facing;
    var frames = this.frames[dir];
    var idx = 0;
    if (this.moving) {
      var cycle = Math.floor(this.animTime * 6) % 2;
      idx = cycle === 0 ? 1 : 2;
    }
    var img = frames[idx];
    var dx = Math.round(this.x - camX - SPRITE_W / 2);
    var dy = Math.round(this.y - camY - SPRITE_H + RPG.config.TILE / 2);

    if (dir === 'left') {
      ctx.save();
      ctx.translate(dx + SPRITE_W, dy);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
    } else {
      ctx.drawImage(img, dx, dy);
    }
  };

  RPG.world.HeroController = HeroController;
})();
