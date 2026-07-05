// Area 1: cela/quarto de servico onde Lia acorda. Door gap in the front wall
// (+Z) leads into the corridor. Returns the doorway's world position so
// Corridor.js knows where to attach.
(function () {
  var WALL_H = 2.8;

  function build(scene, kit, mats, ctx) {
    var roomW = 4.4, roomD = 5.2;
    var doorGapW = 1.1;
    var halfW = roomW / 2, halfD = roomD / 2;
    var wallThick = 0.2;

    kit.addFloor(scene, mats.floor, roomW, roomD, 0, 0);
    kit.addCeiling(scene, mats.ceiling, roomW, roomD, 0, 0, WALL_H);

    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, 0, -halfD, roomW, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -halfW, 0, wallThick, roomD);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, halfW, 0, wallThick, roomD);

    var sideW = (roomW - doorGapW) / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -(doorGapW / 2 + sideW / 2), halfD, sideW, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (doorGapW / 2 + sideW / 2), halfD, sideW, wallThick);

    var doorLeaf = kit.wallBox(doorGapW * 0.92, WALL_H * 0.86, 0.08, mats.door);
    doorLeaf.position.set(-doorGapW * 0.35, WALL_H * 0.43, halfD - 0.02);
    doorLeaf.rotation.y = 0.9;
    scene.add(doorLeaf);

    // cot/bed where Lia wakes up
    var bedFrame = kit.wallBox(0.9, 0.28, 1.9, mats.wood);
    bedFrame.position.set(-halfW + 0.75, 0.14, -halfD + 1.15);
    scene.add(bedFrame);
    ctx.colliders.push({
      minX: bedFrame.position.x - 0.45, maxX: bedFrame.position.x + 0.45,
      minZ: bedFrame.position.z - 0.95, maxZ: bedFrame.position.z + 0.95
    });
    var blanket = kit.wallBox(0.82, 0.1, 1.7, mats.blanket);
    blanket.position.set(bedFrame.position.x, 0.31, bedFrame.position.z);
    scene.add(blanket);

    // small barred window
    var windowFrame = kit.wallBox(0.05, 0.7, 0.55, mats.metal);
    windowFrame.position.set(halfW - 0.03, WALL_H * 0.62, -halfD + 0.9);
    scene.add(windowFrame);
    for (var b = 0; b < 3; b++) {
      var bar = kit.wallBox(0.02, 0.66, 0.02, mats.metal);
      bar.position.set(halfW - 0.03, WALL_H * 0.62, -halfD + 0.65 + b * 0.25);
      scene.add(bar);
    }

    // wooden side table + candle (the room's own light source)
    var table = kit.wallBox(0.4, 0.45, 0.4, mats.wood);
    table.position.set(-halfW + 0.5, 0.225, -halfD + 2.4);
    scene.add(table);
    ctx.colliders.push({
      minX: table.position.x - 0.2, maxX: table.position.x + 0.2,
      minZ: table.position.z - 0.2, maxZ: table.position.z + 0.2
    });
    ctx.candles.push(kit.addCandle(scene, mats, table.position.x, 0.45, table.position.z));

    return {
      doorX: 0, doorZ: halfD, doorW: doorGapW,
      spawnPoint: new THREE.Vector3(0.2, 0, -1.3),
      spawnFacing: 0
    };
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.Cela = { build: build, WALL_H: WALL_H };
})();
