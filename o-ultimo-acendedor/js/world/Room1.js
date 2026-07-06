// Room1: primeira sala das Grutas Apagadas, construída programaticamente
// (grade + esculpida) para garantir consistência — não ASCII digitado à mão.
(function () {
  function build() {
    var cols = 110, rows = 34;
    var g = [];
    for (var y = 0; y < rows; y++) g.push(new Array(cols).fill('.'));

    function fill(x0, y0, x1, y1, ch) {
      for (var yy = y0; yy <= y1; yy++) {
        for (var xx = x0; xx <= x1; xx++) {
          if (xx >= 0 && yy >= 0 && xx < cols && yy < rows) g[yy][xx] = ch;
        }
      }
    }

    // paredes externas
    fill(0, 0, 2, rows - 1, '#');
    fill(cols - 3, 0, cols - 1, rows - 1, '#');
    fill(0, 0, cols - 1, 1, '#');

    // chão base com variação de altura (perfil de caverna)
    var groundProfile = [];
    for (var x = 0; x < cols; x++) {
      var h = 28;
      if (x > 14 && x <= 22) h = 27;
      if (x > 22 && x <= 30) h = 26;
      if (x > 38 && x <= 46) h = 29;   // depressão
      if (x > 46 && x <= 52) h = 30;   // fosso de espinhos (fundo)
      if (x > 52 && x <= 58) h = 28;
      if (x > 66 && x <= 78) h = 26;   // plataforma alta natural
      if (x > 88) h = 27;
      groundProfile.push(h);
      fill(x, h, x, rows - 1, '#');
    }

    // fosso de espinhos
    for (var sx = 47; sx <= 52; sx++) g[29][sx] = '^';

    // estalagmites/colunas
    fill(33, 22, 34, 27, '#');
    fill(62, 20, 63, 25, '#');

    // plataformas finas para verticalidade
    for (var p = 24; p <= 29; p++) g[23][p] = '-';
    for (var p2 = 40; p2 <= 45; p2++) g[24][p2] = '-';
    for (var p3 = 55; p3 <= 60; p3++) g[21][p3] = '-';
    for (var p4 = 70; p4 <= 75; p4++) g[19][p4] = '-';
    for (var p5 = 82; p5 <= 87; p5++) g[22][p5] = '-';

    // teto orgânico (estalactites de colisão em alguns pontos)
    fill(20, 2, 21, 6, '#');
    fill(48, 2, 49, 8, '#');
    fill(76, 2, 77, 5, '#');

    // spawn e lampiões
    g[26][8] = 'P';
    g[25][28] = 'L';   // sobre a área elevada
    g[18][73] = 'L';   // sobre a plataforma alta
    g[26][95] = 'L';   // perto da saída leste

    var rowsStr = g.map(function (r) { return r.join(''); });
    var level = new LK.world.Level(rowsStr);

    // spawns de inimigos (tile -> px), posicionados nas zonas que pedem
    // cada padrão: rastejante no corredor plano, voador guardando o fosso
    // de espinhos, cuspidor na plataforma alta, casca no trecho final.
    var T = 24;
    var enemies = [
      { type: 'Rastejante', x: 36 * T, y: 27 * T },
      { type: 'Voador', x: 50 * T, y: 22 * T },
      { type: 'Cuspidor', x: 72 * T, y: 25 * T },
      { type: 'Casca', x: 92 * T, y: 25 * T }
    ];

    return { level: level, enemies: enemies };
  }

  LK.world.Room1 = { build: build };
})();
