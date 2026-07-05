// Tileset: procedurally paints a set of 16x16 SNES-JRPG-style tiles (rich
// color, dithered shading, no flat placeholder colors) baked once to small
// canvases and blitted by TileMap. Water has two animation frames.
(function () {
  var T = RPG.config.TILE;

  function tile() {
    var c = document.createElement('canvas');
    c.width = T; c.height = T;
    return c;
  }

  function dither(ctx, color, alpha) {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    for (var y = 0; y < T; y++) {
      for (var x = (y % 2); x < T; x += 2) {
        if (Math.random() < 0.5) ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  function grass() {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#3f7a3a'; ctx.fillRect(0, 0, T, T);
    dither(ctx, '#508c48', 0.5);
    dither(ctx, '#2e5c2a', 0.35);
    for (var i = 0; i < 4; i++) {
      ctx.fillStyle = '#2a5024';
      ctx.fillRect(2 + (i * 3) % 12, 3 + (i * 5) % 10, 1, 2);
    }
    return c;
  }

  function path() {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#a8895a'; ctx.fillRect(0, 0, T, T);
    dither(ctx, '#c0a06e', 0.4);
    dither(ctx, '#8a6c42', 0.4);
    return c;
  }

  function wall() {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#8a8478'; ctx.fillRect(0, 0, T, T);
    ctx.strokeStyle = '#54504a'; ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, T - 1, 8);
    ctx.strokeRect(0.5, 8.5, 7, T - 9);
    ctx.strokeRect(8.5, 8.5, 7, T - 9);
    dither(ctx, '#9c968a', 0.3);
    return c;
  }

  function roof() {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#8a3a30'; ctx.fillRect(0, 0, T, T);
    for (var y = 0; y < T; y += 4) {
      ctx.fillStyle = '#6e2c24';
      ctx.fillRect(0, y, T, 1);
    }
    dither(ctx, '#a34a3c', 0.3);
    return c;
  }

  function water(frame) {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#2a5a8a'; ctx.fillRect(0, 0, T, T);
    ctx.strokeStyle = '#4a86bf'; ctx.lineWidth = 1;
    var off = frame ? 4 : 0;
    for (var y = -4; y < T + 4; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y + off);
      ctx.quadraticCurveTo(T / 2, y + off - 3, T, y + off);
      ctx.stroke();
    }
    dither(ctx, '#6ea8d8', 0.15);
    return c;
  }

  function tree() {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#3f7a3a'; ctx.fillRect(0, 0, T, T);
    ctx.fillStyle = '#5a3a24'; ctx.fillRect(7, 10, 2, 6);
    ctx.fillStyle = '#2a5a28';
    ctx.beginPath(); ctx.arc(8, 6, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#357a34';
    ctx.beginPath(); ctx.arc(6, 5, 3, 0, Math.PI * 2); ctx.fill();
    return c;
  }

  function flowerbed() {
    var c = grass(), ctx = c.getContext('2d');
    var colors = ['#d84a6a', '#e8c84a', '#e8e8e8'];
    for (var i = 0; i < 5; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(2 + (i * 3) % 12, 4 + (i * 4) % 9, 1, 1);
    }
    return c;
  }

  function floor() {
    var c = tile(), ctx = c.getContext('2d');
    ctx.fillStyle = '#6a5438'; ctx.fillRect(0, 0, T, T);
    for (var x = 0; x < T; x += 4) { ctx.fillStyle = '#5a4630'; ctx.fillRect(x, 0, 1, T); }
    dither(ctx, '#7a6244', 0.3);
    return c;
  }

  var TILES = {
    grass: grass(), path: path(), wall: wall(), roof: roof(),
    water0: water(false), water1: water(true), tree: tree(),
    flowerbed: flowerbed(), floor: floor()
  };

  RPG.gfx.Tileset = { tiles: TILES };
})();
