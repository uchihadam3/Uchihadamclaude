// Area 7: oficina de velas do Zelador. Opens east into the corridor. Houses
// puzzle #3's props (candle holder + blank inscription wall that a lit short
// candle will reveal, wired up once PuzzleSystem lands).
(function () {
  var WALL_H = 2.6;

  function build(scene, kit, mats, ctx, opts) {
    var w = opts.width, d = opts.depth;
    var cx = opts.eastX - w / 2;
    var cz = opts.doorZ;
    var z0 = cz - d / 2, z1 = cz + d / 2;
    var halfW = w / 2;
    var wallThick = 0.2;
    var eastX = cx + halfW;

    kit.addFloor(scene, mats.floor, w, d, cx, cz);
    kit.addCeiling(scene, mats.ceiling, w, d, cx, cz, WALL_H);

    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx, z0, w, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx, z1, w, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx - halfW, cz, wallThick, d);

    var gapD = opts.gapD;
    var gMin = cz - gapD / 2, gMax = cz + gapD / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, eastX, (z0 + gMin) / 2, wallThick, gMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, eastX, (gMax + z1) / 2, wallThick, z1 - gMax);

    // workbench with tools
    var bench = kit.wallBox(1.6, 0.42, 0.6, mats.wood);
    bench.position.set(cx, 0.21, z0 + 0.5);
    scene.add(bench);
    ctx.colliders.push({ minX: bench.position.x - 0.8, maxX: bench.position.x + 0.8, minZ: bench.position.z - 0.3, maxZ: bench.position.z + 0.3 });

    // big wax cauldron over a cold hearth
    var cauldron = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.3, 10), mats.metal);
    cauldron.position.set(cx - halfW + 0.5, 0.5, cz);
    scene.add(cauldron);
    ctx.colliders.push({ minX: cauldron.position.x - 0.25, maxX: cauldron.position.x + 0.25, minZ: cauldron.position.z - 0.25, maxZ: cauldron.position.z + 0.25 });
    ctx.candles.push(kit.addCandle(scene, mats, cauldron.position.x, 0.68, cauldron.position.z, 0xffb050));

    // shelf of finished candles
    var shelf = kit.wallBox(1.2, 0.06, 0.22, mats.wood);
    shelf.position.set(cx + halfW - 0.3, 1.1, z1 - 0.6);
    scene.add(shelf);
    for (var i = 0; i < 6; i++) {
      var candleStick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.14, 6), mats.candleWax);
      candleStick.position.set(shelf.position.x - 0.5 + i * 0.18, 1.1 + 0.1, shelf.position.z);
      scene.add(candleStick);
    }

    // candle holder + blank inscription wall (puzzle #3)
    var holder = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.08, 8), mats.metal);
    holder.position.set(cx, 0.85, z1 - 0.15);
    scene.add(holder);
    var inscriptionWall = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x1c1712, roughness: 1 }));
    inscriptionWall.position.set(cx, 1.3, z1 - 0.09);
    scene.add(inscriptionWall);
    inscriptionWall.userData.isInscriptionPanel = true;

    return { doorGap: { x: eastX, z: cz, w: gapD } };
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.CandleWorkshop = { build: build, WALL_H: WALL_H };
})();
