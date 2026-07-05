// Area 2: corredor umido com retratos antigos. Runs from the cela's doorway
// to the entrance of the salao principal, with two side branches: a doorway
// west into the candle workshop, and a blocked/rubble-filled stair alcove
// east (area 8, "escada bloqueada" - a visible signpost of future expansion).
(function () {
  var WALL_H = 2.8;

  function build(scene, kit, mats, ctx, opts) {
    var corridorW = 2.0;
    var z0 = opts.startZ;
    var len = opts.length;
    var z1 = z0 + len;
    var halfCW = corridorW / 2;
    var wallThick = 0.2;

    kit.addFloor(scene, mats.floor, corridorW, len, 0, z0 + len / 2);
    kit.addCeiling(scene, mats.ceiling, corridorW, len, 0, z0 + len / 2, WALL_H);

    var oficinaZ = opts.oficinaZ, oficinaGapW = 1.1;
    var stairsZ = opts.stairsZ, stairsGapW = 1.6;

    // west wall, split around the oficina de velas doorway
    var wGapMin = oficinaZ - oficinaGapW / 2, wGapMax = oficinaZ + oficinaGapW / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -halfCW, (z0 + wGapMin) / 2, wallThick, wGapMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -halfCW, (wGapMax + z1) / 2, wallThick, z1 - wGapMax);

    // east wall, split around the blocked-stairs alcove
    var eGapMin = stairsZ - stairsGapW / 2, eGapMax = stairsZ + stairsGapW / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, halfCW, (z0 + eGapMin) / 2, wallThick, eGapMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, halfCW, (eGapMax + z1) / 2, wallThick, z1 - eGapMax);

    // --- blocked stairs alcove (area 8) ---
    var alcoveDepth = 1.4;
    var alcoveX1 = halfCW + alcoveDepth;
    kit.addFloor(scene, mats.floor, alcoveDepth, stairsGapW, (halfCW + alcoveX1) / 2, stairsZ);
    kit.addCeiling(scene, mats.ceiling, alcoveDepth, stairsGapW, (halfCW + alcoveX1) / 2, stairsZ, WALL_H);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, alcoveX1, stairsZ, wallThick, stairsGapW);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (halfCW + alcoveX1) / 2, eGapMin, alcoveDepth, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (halfCW + alcoveX1) / 2, eGapMax, alcoveDepth, wallThick);

    // a few ascending steps leading up into rubble - visibly a staircase, clearly blocked
    for (var s = 0; s < 4; s++) {
      var step = kit.wallBox(0.5, 0.14 + s * 0.14, stairsGapW * 0.8, mats.wood);
      step.position.set(halfCW + 0.35 + s * 0.28, step.geometry.parameters.height / 2, stairsZ);
      scene.add(step);
    }
    var rubble = kit.wallBox(0.7, 1.6, stairsGapW * 0.85, mats.stoneWall);
    rubble.position.set(alcoveX1 - 0.45, 0.8, stairsZ);
    rubble.rotation.z = 0.06;
    scene.add(rubble);
    ctx.colliders.push({
      minX: rubble.position.x - 0.4, maxX: alcoveX1,
      minZ: stairsZ - stairsGapW * 0.42, maxZ: stairsZ + stairsGapW * 0.42
    });

    // --- old portraits + a torn note hinting at the house's rituals ---
    for (var p = 0; p < 3; p++) {
      var portraitTex = kit.makeWoodTexture('#3a2c20');
      var portrait = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), new THREE.MeshStandardMaterial({ map: portraitTex, roughness: 1 }));
      portrait.position.set(-halfCW + 0.11, 1.5, z0 + 1.0 + p * 2.1);
      portrait.rotation.y = Math.PI / 2;
      scene.add(portrait);
    }
    ctx.candles.push(kit.addCandle(scene, mats, halfCW - 0.15, 1.55, z0 + 2.4));
    ctx.candles.push(kit.addCandle(scene, mats, -halfCW + 0.15, 1.55, z1 - 1.8));

    return { exitX: 0, exitZ: z1, exitW: corridorW, oficinaGap: { x: -halfCW, z: oficinaZ, w: oficinaGapW } };
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.Corridor = { build: build, WALL_H: WALL_H };
})();
