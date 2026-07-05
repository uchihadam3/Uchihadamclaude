// Area 5: biblioteca pequena. Opens west into the salao principal. Houses
// puzzle #1's props (three symbol portraits + the input mechanism) - visual
// dressing for now, PuzzleSystem wires the actual logic up in a later phase.
(function () {
  var WALL_H = 2.6;
  var SYMBOLS = ['circulo', 'triangulo', 'espiral'];

  function paintSymbol(kind, color) {
    var w = 48, h = 48, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#2a2018';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = color; ctx.lineWidth = 3;
    ctx.beginPath();
    if (kind === 'circulo') {
      ctx.arc(w / 2, h / 2, 14, 0, Math.PI * 2);
    } else if (kind === 'triangulo') {
      ctx.moveTo(w / 2, h / 2 - 15); ctx.lineTo(w / 2 + 15, h / 2 + 12); ctx.lineTo(w / 2 - 15, h / 2 + 12); ctx.closePath();
    } else {
      var cx = w / 2, cy = h / 2;
      ctx.moveTo(cx, cy);
      for (var a = 0; a < 720; a += 8) {
        var r = (a / 720) * 16;
        var rad = a * Math.PI / 180;
        ctx.lineTo(cx + Math.cos(rad) * r, cy + Math.sin(rad) * r);
      }
    }
    ctx.stroke();
    return new THREE.CanvasTexture(c);
  }

  function build(scene, kit, mats, ctx, opts) {
    var w = opts.width, d = opts.depth;
    var cx = opts.westX + w / 2;
    var cz = opts.doorZ;
    var z0 = cz - d / 2, z1 = cz + d / 2;
    var halfW = w / 2;
    var wallThick = 0.2;
    var westX = cx - halfW;

    kit.addFloor(scene, mats.floor, w, d, cx, cz);
    kit.addCeiling(scene, mats.ceiling, w, d, cx, cz, WALL_H);

    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx, z0, w, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx, z1, w, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx + halfW, cz, wallThick, d);

    var gapD = opts.gapD;
    var gMin = cz - gapD / 2, gMax = cz + gapD / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, westX, (z0 + gMin) / 2, wallThick, gMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, westX, (gMax + z1) / 2, wallThick, z1 - gMax);

    // bookshelves lining the back wall
    var shelfMat = mats.wood;
    var shelf = kit.wallBox(w - 0.6, 1.9, 0.3, shelfMat);
    shelf.position.set(cx, 0.95, z0 + 0.2);
    scene.add(shelf);
    ctx.colliders.push({ minX: shelf.position.x - (w - 0.6) / 2, maxX: shelf.position.x + (w - 0.6) / 2, minZ: shelf.position.z - 0.15, maxZ: shelf.position.z + 0.15 });
    // book clutter as small colored boxes on the shelf
    for (var i = 0; i < 10; i++) {
      var book = kit.wallBox(0.05, 0.22 + (i % 3) * 0.04, 0.16, new THREE.MeshStandardMaterial({ color: [0x4a2a2a, 0x2a3a2a, 0x2a2a4a, 0x4a3a2a][i % 4], roughness: 0.9 }));
      book.position.set(cx - (w - 0.6) / 2 + 0.15 + i * ((w - 0.9) / 10), 0.55 + book.geometry.parameters.height / 2, z0 + 0.25);
      scene.add(book);
    }

    // reading table
    var table = kit.wallBox(1.0, 0.4, 0.6, mats.wood);
    table.position.set(cx, 0.2, cz + 0.3);
    scene.add(table);
    ctx.colliders.push({ minX: table.position.x - 0.5, maxX: table.position.x + 0.5, minZ: table.position.z - 0.3, maxZ: table.position.z + 0.3 });
    kit.addNoteProp(scene, mats, table.position.x - 0.2, 0.41, table.position.z, 0.1);

    // the three symbol portraits (puzzle #1 clue)
    var colors = ['#c9b273', '#8a9dc9', '#c98a9d'];
    for (var s = 0; s < SYMBOLS.length; s++) {
      var tex = paintSymbol(SYMBOLS[s], colors[s]);
      var plate = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }));
      plate.position.set(cx - halfW + 0.11, 1.6, z1 - 0.7 - s * 0.55);
      plate.rotation.y = Math.PI / 2;
      plate.userData.symbol = SYMBOLS[s];
      scene.add(plate);
    }

    // the input mechanism (three dials) on the east wall
    var mechPanel = kit.wallBox(0.08, 0.4, 0.9, mats.metal);
    mechPanel.position.set(cx + halfW - 0.06, 1.3, z1 - 0.7);
    scene.add(mechPanel);
    for (var m = 0; m < 3; m++) {
      var dial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 10), mats.metal);
      dial.rotation.z = Math.PI / 2;
      dial.position.set(cx + halfW - 0.11, 1.3, z1 - 0.7 - 0.28 + m * 0.28);
      scene.add(dial);
    }

    ctx.candles.push(kit.addCandle(scene, mats, cx, 1.7, cz - 0.6));

    return { doorGap: { x: westX, z: cz, w: gapD } };
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.Library = { build: build, WALL_H: WALL_H };
})();
