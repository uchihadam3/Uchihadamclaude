// Area 4: salao principal - the house's central hub. Doorways lead west to
// the cozinha, east to the biblioteca, north to the jardim interno, and
// south back down the corridor to the cela. Taller ceiling than the other
// rooms so the hub reads as grander/more important.
(function () {
  var WALL_H = 3.6;

  function build(scene, kit, mats, ctx, opts) {
    var w = opts.width, d = opts.depth;
    var z0 = opts.startZ, z1 = z0 + d;
    var cz = z0 + d / 2;
    var halfW = w / 2;
    var wallThick = 0.2;

    kit.addFloor(scene, mats.floor, w, d, 0, cz);
    kit.addCeiling(scene, mats.ceiling, w, d, 0, cz, WALL_H);

    var southGapW = opts.southGapW, southGapX = 0;
    var sMin = southGapX - southGapW / 2, sMax = southGapX + southGapW / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (-halfW + sMin) / 2, z0, sMin + halfW, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (sMax + halfW) / 2, z0, halfW - sMax, wallThick);

    var northGapW = opts.northGapW, northGapX = 0;
    var nMin = northGapX - northGapW / 2, nMax = northGapX + northGapW / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (-halfW + nMin) / 2, z1, nMin + halfW, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (nMax + halfW) / 2, z1, halfW - nMax, wallThick);

    var westGapZ = opts.westGapZ, westGapD = opts.sideGapD;
    var wMin = westGapZ - westGapD / 2, wMax = westGapZ + westGapD / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -halfW, (z0 + wMin) / 2, wallThick, wMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -halfW, (wMax + z1) / 2, wallThick, z1 - wMax);

    var eastGapZ = opts.eastGapZ;
    var eMin = eastGapZ - westGapD / 2, eMax = eastGapZ + westGapD / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, halfW, (z0 + eMin) / 2, wallThick, eMin - z0);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, halfW, (eMax + z1) / 2, wallThick, z1 - eMax);

    // fireplace centerpiece on the north-facing stretch of the east wall
    var fireplace = kit.wallBox(0.6, 1.4, 1.2, mats.stoneWall);
    fireplace.position.set(halfW - 0.3, 0.7, z0 + 1.4);
    scene.add(fireplace);
    ctx.colliders.push({
      minX: fireplace.position.x - 0.3, maxX: fireplace.position.x + 0.3,
      minZ: fireplace.position.z - 0.6, maxZ: fireplace.position.z + 0.6
    });
    var embers = new THREE.PointLight(0xff6a2a, 1.4, 3.5, 2);
    embers.position.set(fireplace.position.x - 0.2, 0.4, fireplace.position.z);
    scene.add(embers);
    ctx.candles.push({ userData: { flicker: { light: embers, flame: { scale: { setScalar: function () {} } }, base: 1.4, t: Math.random() * 10 } } });

    // long table down the middle
    var table = kit.wallBox(3.2, 0.45, 1.0, mats.wood);
    table.position.set(0, 0.225, cz);
    scene.add(table);
    ctx.colliders.push({
      minX: table.position.x - 1.6, maxX: table.position.x + 1.6,
      minZ: table.position.z - 0.5, maxZ: table.position.z + 0.5
    });

    // hanging chandelier
    var chandGroup = new THREE.Group();
    var chandRing = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.04, 6, 12), mats.metal);
    chandRing.rotation.x = Math.PI / 2;
    chandGroup.add(chandRing);
    var chandLight = new THREE.PointLight(0xffb060, 1.6, 6, 2);
    chandGroup.add(chandLight);
    chandGroup.position.set(0, WALL_H - 0.9, cz);
    scene.add(chandGroup);
    ctx.candles.push({ userData: { flicker: { light: chandLight, flame: { scale: { setScalar: function () {} } }, base: 1.6, t: Math.random() * 10 } } });

    // torn tapestries on the west wall
    for (var t = 0; t < 2; t++) {
      var tap = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.6), new THREE.MeshStandardMaterial({ map: kit.makeFabricTexture('#3a2430'), roughness: 1 }));
      tap.position.set(-halfW + 0.11, 1.7, z0 + 2.3 + t * 2.4);
      tap.rotation.y = Math.PI / 2;
      scene.add(tap);
    }

    return {
      westGap: { x: -halfW, z: westGapZ, w: westGapD },
      eastGap: { x: halfW, z: eastGapZ, w: westGapD },
      northGap: { x: 0, z: z1, w: northGapW }
    };
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.MainHall = { build: build, WALL_H: WALL_H };
})();
