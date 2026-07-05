// World: scene bootstrap (fog/lighting) + orchestrates every area of the
// vertical slice by handing each js/world/rooms/*.js builder the connection
// points (doorway x/z/width) it needs to line up with its neighbours:
//
//   Cela --z+--> Corredor --z+--> Salao Principal --x---> Cozinha
//                    |                  |         --x+--> Biblioteca
//                    x- (Oficina)       z+ (Jardim + Porta Grande)
//
(function () {
  function createScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07060a);
    scene.fog = new THREE.FogExp2(0x0b0a0d, 0.045);

    var hemi = new THREE.HemisphereLight(0x4a4a3f, 0x151109, 0.85);
    scene.add(hemi);

    return scene;
  }

  function build(scene) {
    var kit = AK.world.WorldKit;
    var rooms = AK.world.Rooms;
    var mats = kit.buildBaseMaterials();
    var ctx = { colliders: [], candles: [] };

    var cela = rooms.Cela.build(scene, kit, mats, ctx);

    var corridor = rooms.Corridor.build(scene, kit, mats, ctx, {
      startZ: cela.doorZ, length: 9,
      oficinaZ: cela.doorZ + 2.9, stairsZ: cela.doorZ + 5.7
    });

    var hall = rooms.MainHall.build(scene, kit, mats, ctx, {
      width: 8, depth: 7, startZ: corridor.exitZ, southGapW: corridor.exitW,
      westGapZ: corridor.exitZ + 3.4, eastGapZ: corridor.exitZ + 3.4,
      sideGapD: 1.3, northGapW: 2.2
    });

    rooms.Kitchen.build(scene, kit, mats, ctx, {
      width: 5, depth: 5, eastX: hall.westGap.x, doorZ: hall.westGap.z, gapD: hall.westGap.w
    });

    rooms.Library.build(scene, kit, mats, ctx, {
      width: 4, depth: 4.5, westX: hall.eastGap.x, doorZ: hall.eastGap.z, gapD: hall.eastGap.w
    });

    rooms.Garden.build(scene, kit, mats, ctx, {
      width: 6, depth: 6, startZ: hall.northGap.z, southGapW: hall.northGap.w
    });

    rooms.CandleWorkshop.build(scene, kit, mats, ctx, {
      width: 4, depth: 4, eastX: corridor.oficinaGap.x, doorZ: corridor.oficinaGap.z, gapD: corridor.oficinaGap.w
    });

    return {
      colliders: ctx.colliders,
      candles: ctx.candles,
      spawnPoint: cela.spawnPoint,
      spawnFacing: cela.spawnFacing
    };
  }

  function updateFlicker(candles, dt) {
    candles.forEach(function (c) {
      var f = c.userData.flicker;
      f.t += dt;
      var n = Math.sin(f.t * 9.2) * 0.5 + Math.sin(f.t * 23.1) * 0.25 + Math.sin(f.t * 5.7) * 0.25;
      f.light.intensity = f.base + n * 0.3;
      f.flame.scale.setScalar(1 + n * 0.15);
    });
  }

  AK.world.World = {
    createScene: createScene,
    build: build,
    updateFlicker: updateFlicker
  };
})();
