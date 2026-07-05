// Town: builds the first test town map programmatically (not hand-typed
// ASCII, to avoid row-length mistakes) - a small square with a house, a
// pond, trees and flowerbeds, used to validate the whole render/collision
// pipeline end to end before the world is fleshed out further.
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
    var cols = 20, rows = 16;
    var grid = [];
    for (var y = 0; y < rows; y++) grid.push(new Array(cols).fill('.'));

    for (var x = 0; x < cols; x++) { grid[0][x] = '#'; grid[rows - 1][x] = '#'; }
    for (var yy = 0; yy < rows; yy++) { grid[yy][0] = '#'; grid[yy][cols - 1] = '#'; }

    for (var ry = 3; ry <= 5; ry++) {
      for (var rx = 6; rx <= 13; rx++) grid[ry][rx] = 'R';
    }

    var pathCol = Math.floor(cols / 2);
    for (var py = 6; py <= rows - 2; py++) grid[py][pathCol] = ':';

    for (var wy = 9; wy <= 10; wy++) {
      for (var wx = 5; wx <= 9; wx++) grid[wy][wx] = '~';
    }

    [3, 5, 7, 12, 14, 16].forEach(function (fx) { grid[12][fx] = 'o'; });
    grid[2][2] = '^'; grid[2][17] = '^'; grid[13][15] = '^';

    var asciiRows = grid.map(function (r) { return r.join(''); });
    var tileMap = new RPG.world.TileMap(asciiRows, LEGEND);

    return {
      tileMap: tileMap,
      spawn: { x: pathCol * T + T / 2, y: (rows - 3) * T + T / 2 }
    };
  }

  RPG.world.Town = { build: build };
})();
