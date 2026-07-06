// As Grutas Apagadas — o mapa completo (220x80 tiles = 5280x1920 px).
// Construído por escavação: tudo começa sólido e as zonas são cavadas,
// garantindo massa de rocha contínua entre as áreas.
//
//   [Anel Superior]                    [Travessia Superior]---[ARENA DO CHEFE]
//        |                                   |         (queda)      |
//   [Entrada]--corredor--[Poço vertical]  [Subida dos Cogumelos]    |
//        |                    |               |                     |
//   [Galeria secreta]----[Galeria Inferior]---+---------------------+
//
// Regras de alcance respeitadas: pulo simples sobe 3 tiles (72px < apex 73px),
// pulo duplo ~5-6 tiles, então degraus obrigatórios usam <=3 e trechos de
// pulo duplo usam 4-5.
(function () {
  var T = 24;

  function build() {
    var cols = 220, rows = 80;
    var g = [];
    for (var y = 0; y < rows; y++) g.push(new Array(cols).fill('#'));

    function carve(x0, y0, x1, y1) {
      for (var yy = y0; yy <= y1; yy++) {
        for (var xx = x0; xx <= x1; xx++) {
          if (xx > 0 && yy > 0 && xx < cols - 1 && yy < rows - 1) g[yy][xx] = '.';
        }
      }
    }
    function fillSolid(x0, y0, x1, y1) {
      for (var yy = y0; yy <= y1; yy++) for (var xx = x0; xx <= x1; xx++) g[yy][xx] = '#';
    }
    function thin(x0, x1, y) { for (var xx = x0; xx <= x1; xx++) g[y][xx] = '-'; }
    function spikes(x0, x1, y) { for (var xx = x0; xx <= x1; xx++) g[y][xx] = '^'; }

    // ---------- Zona 1: Entrada ----------
    carve(4, 44, 40, 55);
    g[55][13] = 'L';                       // primeiro lampião
    g[54][8] = 'P';                        // spawn
    spikes(30, 32, 55);                    // vala de espinhos (ensina o pulo)
    thin(26, 29, 51);                      // rota alta opcional sobre a vala

    // plataformas de pulo duplo subindo ao Anel Superior
    thin(22, 25, 51);
    thin(27, 30, 47);
    thin(21, 24, 44);

    // ---------- Anel Superior (loop de exploração) ----------
    carve(8, 32, 30, 42);
    carve(21, 42, 26, 44);                 // garganta conectando à Entrada
    g[42][12] = 'L';
    thin(14, 17, 38);
    thin(20, 23, 35);

    // ---------- Corredor Entrada -> Poço ----------
    carve(40, 48, 58, 55);

    // ---------- Zona 2: Poço vertical ----------
    carve(58, 44, 72, 73);
    // zigue-zague de descida/subida (3 linhas de intervalo = pulo simples justo,
    // com pulo duplo fica confortável)
    thin(59, 63, 51);
    thin(67, 71, 54);
    thin(59, 63, 57);
    thin(67, 71, 60);
    thin(59, 63, 63);
    thin(67, 71, 66);
    thin(59, 63, 69);
    thin(67, 71, 72);

    // ---------- Zona 3: Galeria Inferior ----------
    carve(72, 68, 130, 73);
    spikes(84, 87, 73);
    thin(84, 87, 70);                      // ponte sobre a primeira vala
    spikes(106, 109, 73);
    thin(106, 109, 70);
    g[73][100] = 'L';

    // Galeria secreta (esquerda do poço, escura, com recompensa futura)
    carve(20, 70, 58, 73);
    g[73][24] = 'L';

    // ---------- Zona 4: Subida dos Cogumelos ----------
    carve(130, 20, 148, 73);
    var zig = true;
    for (var py = 70; py >= 25; py -= 3) {
      if (zig) thin(131, 136, py);
      else thin(142, 147, py);
      zig = !zig;
    }

    // ---------- Zona 5: Travessia Superior ----------
    carve(148, 20, 203, 27);
    g[27][160] = 'L';
    // poço de reconexão: cai de volta na Galeria (atalho de mão única)
    carve(165, 28, 167, 67);
    // estalactites de obstáculo
    fillSolid(174, 20, 175, 22);
    fillSolid(188, 20, 189, 23);

    // ---------- Zona 6: Arena do Devorador ----------
    carve(200, 14, 218, 31);
    g[31][203] = 'L';                      // checkpoint antes do chefe
    // (portão fecha em jogo: colunas 200-201, linhas 20..27)

    var rowsStr = g.map(function (r) { return r.join(''); });
    var level = new LK.world.Level(rowsStr);

    var enemies = [
      // corredor da entrada
      { type: 'Rastejante', x: 44 * T, y: 54 * T },
      { type: 'Rastejante', x: 52 * T, y: 54 * T },
      // poço
      { type: 'Voador', x: 65 * T, y: 56 * T },
      // galeria secreta
      { type: 'Casca', x: 40 * T, y: 72 * T },
      // galeria inferior
      { type: 'Rastejante', x: 80 * T, y: 72 * T },
      { type: 'Cuspidor', x: 95 * T, y: 72 * T },
      { type: 'Casca', x: 115 * T, y: 72 * T },
      { type: 'Cuspidor', x: 125 * T, y: 72 * T },
      // subida dos cogumelos
      { type: 'Voador', x: 134 * T, y: 60 * T },
      { type: 'Voador', x: 145 * T, y: 45 * T },
      { type: 'Voador', x: 136 * T, y: 30 * T },
      // travessia superior
      { type: 'Rastejante', x: 156 * T, y: 26 * T },
      { type: 'Cuspidor', x: 172 * T, y: 26 * T },
      { type: 'Casca', x: 185 * T, y: 26 * T },
      { type: 'Voador', x: 179 * T, y: 22 * T },
      // anel superior
      { type: 'Rastejante', x: 16 * T, y: 41 * T }
    ];

    // dados da arena para o main/chefe
    var arena = {
      triggerX: 205 * T,          // cruzou isso dentro da arena -> luta começa
      gate: { x0: 200, x1: 201, y0: 20, y1: 27 },
      bossX: 210 * T, bossY: 20 * T,
      floorY: 32 * T,
      minX: 201 * T, maxX: 218 * T,
      victoryLampCol: 203
    };

    return { level: level, enemies: enemies, arena: arena };
  }

  LK.world.Room1 = { build: build };
})();
