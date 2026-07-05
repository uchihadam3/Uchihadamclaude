// Area 3: cozinha abandonada. Opens east into the salao principal. Grimy
// tile floor (vs. the wood-plank floor everywhere else) and a cold hearth
// give it a distinct identity.
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

    var tileMat = new THREE.MeshStandardMaterial({ map: kit.makeTileTexture('#5a5750', '#1c1c1a'), roughness: 0.95 });

    kit.addFloor(scene, tileMat, w, d, cx, cz);
    kit.addCeiling(scene, mats.ceiling, w, d, cx, cz, WALL_H);

    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx, z0, w, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx, z1, w, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, cx - halfW, cz, wallThick, d);

    var gapD = opts.gapD;
    var gMin = cz - gapD / 2, gMax = cz + gapD / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, eastX, (z0 + gMin) / 2, wallThick, gMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, eastX, (gMax + z1) / 2, wallThick, z1 - gMax);

    // cold stone hearth against the back wall
    var hearth = kit.wallBox(1.3, 1.1, 0.5, mats.stoneWall);
    hearth.position.set(cx, 0.55, z0 + 0.3);
    scene.add(hearth);
    ctx.colliders.push({
      minX: hearth.position.x - 0.65, maxX: hearth.position.x + 0.65,
      minZ: hearth.position.z - 0.3, maxZ: hearth.position.z + 0.35
    });

    // long counter along the side wall
    var counter = kit.wallBox(0.5, 0.85, 2.2, mats.wood);
    counter.position.set(cx - halfW + 0.3, 0.425, cz);
    scene.add(counter);
    ctx.colliders.push({
      minX: counter.position.x - 0.3, maxX: counter.position.x + 0.3,
      minZ: counter.position.z - 1.1, maxZ: counter.position.z + 1.1
    });

    // hanging pots (purely decorative, no collider)
    for (var i = 0; i < 3; i++) {
      var pot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.12, 8), mats.metal);
      pot.position.set(cx - halfW + 0.55, WALL_H - 0.4, z0 + 1.0 + i * 0.5);
      scene.add(pot);
    }

    // broken shelf, tipped over, near the counter's far end
    var shelf = kit.wallBox(0.7, 0.08, 0.3, mats.wood);
    shelf.position.set(cx - 0.3, 0.1, z1 - 0.6);
    shelf.rotation.z = 0.5;
    scene.add(shelf);

    ctx.candles.push(kit.addCandle(scene, mats, cx + halfW - 0.4, 1.0, z0 + 0.6, 0xffa040));

    return { doorGap: { x: eastX, z: cz, w: gapD } };
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.Kitchen = { build: build, WALL_H: WALL_H };
})();
