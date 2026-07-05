// TileMap: a grid of named tiles built from an ASCII layout + a legend,
// with per-cell solidity for collision and an animated water frame.
(function () {
  var T = RPG.config.TILE;

  function TileMap(asciiRows, legend) {
    this.rows = asciiRows.length;
    this.cols = asciiRows[0].length;
    this.cells = [];
    this.solid = [];
    for (var y = 0; y < this.rows; y++) {
      var rowCells = [], rowSolid = [];
      for (var x = 0; x < this.cols; x++) {
        var ch = asciiRows[y][x];
        var def = legend[ch] || legend['.'];
        rowCells.push(def.tile);
        rowSolid.push(!!def.solid);
      }
      this.cells.push(rowCells);
      this.solid.push(rowSolid);
    }
    this._waterT = 0;
  }

  TileMap.prototype.isSolidAtPixel = function (px, py) {
    var cx = Math.floor(px / T), cy = Math.floor(py / T);
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rows) return true;
    return this.solid[cy][cx];
  };

  TileMap.prototype.update = function (dt) {
    this._waterT += dt;
  };

  TileMap.prototype.render = function (ctx, camX, camY, viewW, viewH) {
    var tiles = RPG.gfx.Tileset.tiles;
    var waterFrame = Math.floor(this._waterT * 1.5) % 2;
    var startCol = Math.floor(camX / T), startRow = Math.floor(camY / T);
    var colsVisible = Math.ceil(viewW / T) + 2, rowsVisible = Math.ceil(viewH / T) + 2;

    for (var ry = 0; ry < rowsVisible; ry++) {
      var gy = startRow + ry;
      if (gy < 0 || gy >= this.rows) continue;
      for (var rx = 0; rx < colsVisible; rx++) {
        var gx = startCol + rx;
        if (gx < 0 || gx >= this.cols) continue;
        var key = this.cells[gy][gx];
        if (key === 'water') key = waterFrame ? 'water1' : 'water0';
        var img = tiles[key];
        if (!img) continue;
        var dx = Math.round(gx * T - camX), dy = Math.round(gy * T - camY);
        ctx.drawImage(img, dx, dy);
      }
    }
  };

  RPG.world.TileMap = TileMap;
})();
