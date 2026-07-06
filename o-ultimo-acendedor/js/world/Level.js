// Level: grade de colisão por tiles (sólido/plataforma-fina/espinho) com a
// geometria visual desenhada organicamente por cima (Biome renderers).
// Sala definida por linhas ASCII: '#' sólido, '-' plataforma fina (atravessa
// por baixo, pousa por cima), '^' espinhos, '.' vazio, 'L' lampião, 'P' spawn.
(function () {
  var TILE = 24;

  function Level(rows) {
    this.tile = TILE;
    this.rows = rows.length;
    this.cols = rows[0].length;
    this.solid = [];
    this.thin = [];
    this.spike = [];
    this.lamps = [];
    this.spawn = { x: 60, y: 60 };
    for (var y = 0; y < this.rows; y++) {
      var s = [], t = [], sp = [];
      for (var x = 0; x < this.cols; x++) {
        var ch = rows[y][x];
        s.push(ch === '#');
        t.push(ch === '-');
        sp.push(ch === '^');
        if (ch === 'L') this.lamps.push({ x: x * TILE + TILE / 2, y: y * TILE + TILE, lit: false, glow: 0 });
        if (ch === 'P') this.spawn = { x: x * TILE + TILE / 2, y: y * TILE + TILE };
      }
      this.solid.push(s);
      this.thin.push(t);
      this.spike.push(sp);
    }
    this.pxW = this.cols * TILE;
    this.pxH = this.rows * TILE;
  }

  Level.prototype.solidAt = function (px, py) {
    var cx = Math.floor(px / TILE), cy = Math.floor(py / TILE);
    if (cx < 0 || cx >= this.cols) return true;
    if (cy < 0) return false;          // teto aberto acima da sala não prende
    if (cy >= this.rows) return false; // cair para fora = morte tratada no Player
    return this.solid[cy][cx];
  };

  Level.prototype.thinAt = function (px, py) {
    var cx = Math.floor(px / TILE), cy = Math.floor(py / TILE);
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rows) return false;
    return this.thin[cy][cx];
  };

  Level.prototype.spikeAt = function (px, py) {
    var cx = Math.floor(px / TILE), cy = Math.floor(py / TILE);
    if (cx < 0 || cy < 0 || cx >= this.cols || cy >= this.rows) return false;
    return this.spike[cy][cx];
  };

  // Move um AABB (cx,cy = centro; hw,hh = metades) com colisão eixo a eixo.
  // Retorna flags de contato. `dropThin` deixa atravessar plataformas finas.
  Level.prototype.moveAABB = function (body, dx, dy, dropThin) {
    var out = { onGround: false, hitCeil: false, hitWall: 0 };
    var hw = body.hw, hh = body.hh;

    // eixo X
    var nx = body.x + dx;
    var dir = dx > 0 ? 1 : -1;
    if (dx !== 0) {
      var edgeX = nx + dir * hw;
      var top = body.y - hh + 2, bot = body.y + hh - 2;
      var blocked = false;
      for (var py = top; py <= bot; py += TILE / 2) {
        if (this.solidAt(edgeX, py)) { blocked = true; break; }
      }
      if (!blocked && this.solidAt(edgeX, bot)) blocked = true;
      if (blocked) {
        var cellEdge = dir > 0
          ? Math.floor(edgeX / TILE) * TILE - 0.01
          : Math.ceil(edgeX / TILE) * TILE + 0.01;
        nx = cellEdge - dir * hw;
        out.hitWall = dir;
      }
    }
    body.x = nx;

    // eixo Y
    var ny = body.y + dy;
    if (dy > 0) {
      var footY = ny + hh;
      var lx = body.x - hw + 2, rx = body.x + hw - 2;
      var landed = false;
      for (var px = lx; px <= rx + 0.01; px += Math.max(4, hw)) {
        var xx = Math.min(px, rx);
        if (this.solidAt(xx, footY)) { landed = true; break; }
        if (!dropThin && this.thinAt(xx, footY)) {
          // só pousa se os pés cruzaram o topo do tile neste passo
          var tileTop = Math.floor(footY / TILE) * TILE;
          if (body.y + hh <= tileTop + Math.max(2, dy)) { landed = true; break; }
        }
      }
      if (landed) {
        ny = Math.floor(footY / TILE) * TILE - hh - 0.01;
        out.onGround = true;
      }
    } else if (dy < 0) {
      var headY = ny - hh;
      var lx2 = body.x - hw + 2, rx2 = body.x + hw - 2;
      for (var px2 = lx2; px2 <= rx2 + 0.01; px2 += Math.max(4, hw)) {
        var xx2 = Math.min(px2, rx2);
        if (this.solidAt(xx2, headY)) {
          ny = (Math.floor(headY / TILE) + 1) * TILE + hh + 0.01;
          out.hitCeil = true;
          break;
        }
      }
    }
    body.y = ny;

    return out;
  };

  LK.world.Level = Level;
  LK.world.TILE = TILE;
})();
