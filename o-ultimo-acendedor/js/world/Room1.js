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
    var cols = 420, rows = 80;
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

    // ========== JARDIM AFOGADO (biome 2) ==========
    // saída da arena 1 (barreira até o Devorador cair): corredor leste
    carve(218, 26, 230, 31);

    // Zona 7: descida em cascata para o jardim
    carve(230, 26, 262, 52);
    thin(234, 238, 34);
    thin(242, 246, 38);
    thin(250, 254, 42);
    thin(240, 244, 46);
    thin(232, 236, 49);

    // Zona 8: salão do jardim (terraços e poças)
    carve(262, 40, 312, 52);
    thin(268, 274, 47);
    thin(280, 286, 43);
    thin(292, 298, 47);
    thin(300, 306, 44);
    g[52][266] = 'L';
    g[52][308] = 'L';                      // checkpoint antes da Raiz

    // Zona 9: arena da Raiz Coroada
    carve(314, 38, 338, 52);
    // (portão: colunas 312-313, linhas 44..51; barreira leste: 338-339)

    // ========== CORAÇÃO CINÉREO (biome 3) ==========
    // Zona 10: descida às profundezas de cinza
    carve(338, 44, 356, 60);
    thin(342, 346, 50);
    thin(350, 354, 55);
    carve(352, 52, 368, 66);
    thin(358, 362, 62);

    // Zona 11: salão obsidiano
    carve(368, 54, 398, 66);
    thin(372, 378, 61);
    thin(384, 390, 58);
    g[66][372] = 'L';
    g[66][394] = 'L';                      // checkpoint antes da Chama

    // Zona 12: arena final da Primeira Chama
    carve(400, 48, 418, 66);
    // (portão: colunas 398-399, linhas 58..65)

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
      { type: 'Rastejante', x: 16 * T, y: 41 * T },

      // ---- Jardim Afogado ----
      { type: 'Salteador', x: 248 * T, y: 50 * T },
      { type: 'Espinheiro', x: 238 * T, y: 51 * T },
      { type: 'Salteador', x: 272 * T, y: 50 * T },
      { type: 'Espinheiro', x: 284 * T, y: 51 * T },
      { type: 'VagaLume', x: 288 * T, y: 44 * T },
      { type: 'Salteador', x: 296 * T, y: 50 * T },
      { type: 'Espinheiro', x: 302 * T, y: 51 * T },
      { type: 'VagaLume', x: 270 * T, y: 43 * T },

      // ---- Coração Cinéreo ----
      { type: 'Fuligem', x: 348 * T, y: 56 * T },
      { type: 'Portador', x: 360 * T, y: 64 * T },
      { type: 'Portador', x: 380 * T, y: 64 * T },
      { type: 'Fuligem', x: 388 * T, y: 60 * T },
      { type: 'Fuligem', x: 374 * T, y: 58 * T }
    ];

    // as três arenas de chefe, no formato genérico que o main consome
    var arenas = [
      {
        name: 'O  DEVORADOR  DE  CHAMAS',
        bossType: 'BossDevorador',
        triggerX: 205 * T, triggerYMin: 27 * T,
        gate: { x0: 200, x1: 201, y0: 20, y1: 27 },
        barrier: { x0: 219, x1: 220, y0: 26, y1: 31 },
        bossX: 210 * T, bossY: 20 * T,
        floorY: 32 * T,
        minX: 201 * T, maxX: 217 * T,
        victoryLampCol: 203,
        victoryText: 'A   C H A M A   R E S I S T E'
      },
      {
        name: 'A  RAIZ  COROADA',
        bossType: 'BossRaiz',
        triggerX: 318 * T, triggerYMin: 44 * T,
        gate: { x0: 312, x1: 313, y0: 44, y1: 51 },
        barrier: { x0: 338, x1: 339, y0: 44, y1: 51 },
        bossX: 328 * T, bossY: 50 * T,
        floorY: 52 * T,
        minX: 315 * T, maxX: 337 * T,
        victoryLampCol: 316,
        victoryText: 'A   C O R O A   A P O D R E C E'
      },
      {
        name: 'A  PRIMEIRA  CHAMA',
        bossType: 'BossChama',
        triggerX: 404 * T, triggerYMin: 56 * T,
        gate: { x0: 398, x1: 399, y0: 58, y1: 65 },
        barrier: null, // fim do mundo (por enquanto)
        bossX: 409 * T, bossY: 56 * T,
        floorY: 66 * T,
        minX: 401 * T, maxX: 417 * T,
        victoryLampCol: 402,
        victoryText: 'A   P R I M E I R A   C H A M A   R E N A S C E'
      }
    ];

    // limites dos biomas (em px) para música e paleta
    var biomeBounds = { jardimStartX: 228 * T, coracaoStartX: 338 * T };

    return { level: level, enemies: enemies, arenas: arenas, biomeBounds: biomeBounds };
  }

  LK.world.Room1 = { build: build };
})();
