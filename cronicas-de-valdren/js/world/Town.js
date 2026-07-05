// Town: the first town map, built programmatically (not hand-typed ASCII,
// to avoid row-length mistakes). Sized generously (40x36 tiles) so it
// comfortably exceeds the viewport even on tall phone screens - a map
// smaller than the viewport would show background void past its edges.
(function () {
  var T = RPG.config.TILE;

  var LEGEND = {
    '#': { tile: 'wall', solid: true },
    '.': { tile: 'grass', solid: false },
    ':': { tile: 'path', solid: false },
    '~': { tile: 'water', solid: true },
    '^': { tile: 'tree', solid: true },
    'o': { tile: 'flowerbed', solid: false },
    'R': { tile: 'roof', solid: true }
  };

  function build() {
    var cols = 40, rows = 36;
    var grid = [];
    for (var y = 0; y < rows; y++) grid.push(new Array(cols).fill('.'));

    for (var x = 0; x < cols; x++) { grid[0][x] = '#'; grid[rows - 1][x] = '#'; }
    for (var yy = 0; yy < rows; yy++) { grid[yy][0] = '#'; grid[yy][cols - 1] = '#'; }

    // main house, upper-middle
    for (var ry = 4; ry <= 8; ry++) {
      for (var rx = 15; rx <= 26; rx++) grid[ry][rx] = 'R';
    }
    // second, smaller house to the east
    for (var sy = 12; sy <= 15; sy++) {
      for (var sx = 30; sx <= 36; sx++) grid[sy][sx] = 'R';
    }

    var pathCol = Math.floor(cols / 2);
    for (var py = 9; py <= rows - 2; py++) grid[py][pathCol] = ':';
    for (var px = pathCol; px <= 33; px++) grid[16][px] = ':'; // branch toward the second house

    for (var wy = 18; wy <= 22; wy++) {
      for (var wx = 6; wx <= 13; wx++) grid[wy][wx] = '~';
    }

    // scattered trees and flowerbeds across open grass, avoiding buildings/path/water
    var rng = mulberry32(20260705);
    for (var i = 0; i < 90; i++) {
      var gx = 2 + Math.floor(rng() * (cols - 4));
      var gy = 2 + Math.floor(rng() * (rows - 4));
      if (grid[gy][gx] !== '.') continue;
      grid[gy][gx] = rng() < 0.4 ? '^' : 'o';
    }

    var asciiRows = grid.map(function (r) { return r.join(''); });
    var tileMap = new RPG.world.TileMap(asciiRows, LEGEND);

    return {
      tileMap: tileMap,
      spawn: { x: pathCol * T + T / 2, y: (rows - 4) * T + T / 2 }
    };
  }

  function mulberry32(seed) {
    var t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  RPG.world.Town = { build: build };
})();
