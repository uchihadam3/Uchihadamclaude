// Area 6: jardim interno coberto por neblina - open-air (no ceiling), with a
// ground-fog plane and twisted dead trees. Also houses area 9, "a porta
// grande trancada", the demo's objective, on its far wall (with the crank
// socket for puzzle #4: medalhao quebrado + manivela de ferro).
(function () {
  var WALL_H = 3.2;

  function makeGroundFogTexture() {
    var w = 128, h = 128, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    var grad = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    grad.addColorStop(0, 'rgba(180,185,190,0.55)');
    grad.addColorStop(0.6, 'rgba(170,175,180,0.25)');
    grad.addColorStop(1, 'rgba(170,175,180,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    return new THREE.CanvasTexture(c);
  }

  function addDeadTree(scene, mats, x, z) {
    var group = new THREE.Group();
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 1.8, 6), mats.wood);
    trunk.position.y = 0.9;
    group.add(trunk);
    for (var i = 0; i < 3; i++) {
      var branch = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.05, 0.7, 5), mats.wood);
      branch.position.set((i - 1) * 0.15, 1.6 + i * 0.15, 0);
      branch.rotation.z = (i - 1) * 0.9;
      group.add(branch);
    }
    group.position.set(x, 0, z);
    scene.add(group);
    return group;
  }

  function build(scene, kit, mats, ctx, opts) {
    var w = opts.width, d = opts.depth;
    var z0 = opts.startZ, z1 = z0 + d;
    var cz = z0 + d / 2;
    var halfW = w / 2;
    var wallThick = 0.2;

    var groundMat = new THREE.MeshStandardMaterial({ map: kit.makeMossyStoneTexture(), roughness: 1.0 });
    kit.addFloor(scene, groundMat, w, d, 0, cz);
    // no ceiling - open to the sky

    var southGapW = opts.southGapW;
    var sMin = -southGapW / 2, sMax = southGapW / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (-halfW + sMin) / 2, z0, sMin + halfW, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (sMax + halfW) / 2, z0, halfW - sMax, wallThick);

    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -halfW, cz, wallThick, d);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, halfW, cz, wallThick, d);

    // far (north) wall holds the big locked door - area 9's objective
    var doorW = 1.8;
    var sideW = (w - doorW) / 2;
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, -(doorW / 2 + sideW / 2), z1, sideW, wallThick);
    kit.addWallSeg(scene, ctx.colliders, mats.stoneWall, WALL_H, (doorW / 2 + sideW / 2), z1, sideW, wallThick);

    var bigDoor = kit.wallBox(doorW * 0.94, WALL_H * 0.92, 0.14, mats.door);
    bigDoor.position.set(0, WALL_H * 0.46, z1 - 0.05);
    scene.add(bigDoor);
    ctx.colliders.push({ minX: -doorW / 2, maxX: doorW / 2, minZ: z1 - 0.2, maxZ: z1 });
    // iron reinforcement bands across the big door
    for (var band = 0; band < 3; band++) {
      var bandMesh = kit.wallBox(doorW * 0.94, 0.06, 0.16, mats.metal);
      bandMesh.position.set(0, 0.5 + band * 0.8, z1 - 0.03);
      scene.add(bandMesh);
    }
    // crank socket - puzzle #4 (medalhao quebrado + manivela de ferro)
    var socket = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.1, 10), mats.metal);
    socket.rotation.x = Math.PI / 2;
    socket.position.set(0.55, 1.1, z1 - 0.1);
    scene.add(socket);

    // statue centerpiece
    var statueBase = kit.wallBox(0.5, 0.2, 0.5, mats.stoneWall);
    statueBase.position.set(0, 0.1, cz);
    scene.add(statueBase);
    ctx.colliders.push({ minX: -0.3, maxX: 0.3, minZ: cz - 0.3, maxZ: cz + 0.3 });
    var statueBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 1.3, 8), mats.stoneWall);
    statueBody.position.set(0, 0.2 + 0.65, cz);
    scene.add(statueBody);
    var statueHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), mats.stoneWall);
    statueHead.position.set(0, 0.2 + 1.3 + 0.14, cz);
    scene.add(statueHead);

    // twisted dead trees
    addDeadTree(scene, mats, -halfW + 0.7, z0 + 1.3);
    addDeadTree(scene, mats, halfW - 0.7, z0 + 1.6);
    addDeadTree(scene, mats, -halfW + 0.9, z1 - 1.2);

    // low ground fog sheets
    var fogTex = makeGroundFogTexture();
    var fogMat = new THREE.MeshBasicMaterial({ map: fogTex, transparent: true, depthWrite: false, opacity: 0.5 });
    for (var f = 0; f < 4; f++) {
      var fogPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), fogMat);
      fogPlane.rotation.x = -Math.PI / 2;
      fogPlane.position.set((Math.random() - 0.5) * w * 0.7, 0.12, z0 + Math.random() * d);
      scene.add(fogPlane);
    }

    var moonLight = new THREE.DirectionalLight(0x9fb0c8, 0.5);
    moonLight.position.set(2, 6, cz);
    scene.add(moonLight);

    return {};
  }

  AK.world.Rooms = AK.world.Rooms || {};
  AK.world.Rooms.Garden = { build: build, WALL_H: WALL_H };
})();
