// World: scene bootstrap (fog/lighting) + the first explorable area for the
// vertical slice - area 1 "cela/quarto de servico onde Lia acorda" opening
// into the start of area 2 "corredor umido com retratos antigos". Builds
// hand-painted-looking canvas textures (no external image assets) and
// returns the collider list PlayerController uses for movement collision.
(function () {

  function paintNoise(ctx, w, h, count, color, aMin, aMax) {
    for (var i = 0; i < count; i++) {
      ctx.fillStyle = color;
      ctx.globalAlpha = aMin + Math.random() * (aMax - aMin);
      var x = Math.random() * w, y = Math.random() * h, s = 1 + Math.random() * 2;
      ctx.fillRect(x, y, s, s);
    }
    ctx.globalAlpha = 1;
  }

  function makeStoneTexture() {
    var w = 128, h = 128, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#4a463c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#2c2a22';
    ctx.lineWidth = 2;
    for (var y = 0; y < h; y += 22) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      var offset = (y / 22) % 2 === 0 ? 0 : 24;
      for (var x = offset; x < w; x += 48) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 22); ctx.stroke();
      }
    }
    paintNoise(ctx, w, h, 900, '#000000', 0.02, 0.08);
    paintNoise(ctx, w, h, 200, '#6b6a52', 0.02, 0.06);
    // damp stains
    for (var i = 0; i < 5; i++) {
      var gx = Math.random() * w, gy = Math.random() * h;
      var grad = ctx.createRadialGradient(gx, gy, 2, gx, gy, 22 + Math.random() * 20);
      grad.addColorStop(0, 'rgba(30,40,25,0.25)');
      grad.addColorStop(1, 'rgba(30,40,25,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function makeFloorTexture() {
    var w = 128, h = 128, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#2c2118';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#1a130d';
    ctx.lineWidth = 2;
    for (var x = 0; x < w; x += 16) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    paintNoise(ctx, w, h, 700, '#000000', 0.02, 0.09);
    paintNoise(ctx, w, h, 150, '#4a3624', 0.03, 0.08);
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function makeWoodTexture(base) {
    var w = 64, h = 64, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = base || '#4a3423';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#2a1c12';
    for (var y = 4; y < h; y += 9) {
      ctx.globalAlpha = 0.35;
      ctx.beginPath(); ctx.moveTo(0, y + Math.random() * 2); ctx.lineTo(w, y + Math.random() * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    paintNoise(ctx, w, h, 250, '#000000', 0.02, 0.1);
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function buildMaterials() {
    return {
      stoneWall: new THREE.MeshStandardMaterial({ map: makeStoneTexture(), roughness: 0.95 }),
      floor: new THREE.MeshStandardMaterial({ map: makeFloorTexture(), roughness: 0.9 }),
      ceiling: new THREE.MeshStandardMaterial({ color: 0x232019, roughness: 1.0 }),
      door: new THREE.MeshStandardMaterial({ map: makeWoodTexture('#4a3423'), roughness: 0.8 }),
      bedFrame: new THREE.MeshStandardMaterial({ map: makeWoodTexture('#2f2318'), roughness: 0.85 }),
      blanket: new THREE.MeshStandardMaterial({ color: 0x54503f, roughness: 1.0 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x3a3a3c, roughness: 0.45, metalness: 0.7 }),
      candleWax: new THREE.MeshStandardMaterial({ color: 0xd8cba1, roughness: 0.6 }),
      flame: new THREE.MeshBasicMaterial({ color: 0xffb24a })
    };
  }

  function createScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07060a);
    scene.fog = new THREE.FogExp2(0x0b0a0d, 0.045);

    var hemi = new THREE.HemisphereLight(0x4a4a3f, 0x151109, 0.85);
    scene.add(hemi);

    return scene;
  }

  function wallBox(w, h, d, mat) {
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function addCandle(scene, x, y, z) {
    var mats = buildMaterials._cache;
    var group = new THREE.Group();
    var base = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.12, 8), mats.candleWax);
    base.position.y = 0.06;
    group.add(base);
    var flame = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.035, 6), mats.flame);
    flame.position.y = 0.135;
    group.add(flame);
    var light = new THREE.PointLight(0xffa64a, 2.0, 4.5, 2);
    light.position.y = 0.15;
    light.castShadow = false;
    group.add(light);
    group.position.set(x, y, z);
    group.userData.flicker = { light: light, flame: flame, base: 1.1, t: Math.random() * 10 };
    scene.add(group);
    return group;
  }

  // Builds area 1 (cela) opening into the start of area 2 (corredor).
  // Returns { colliders, spawnPoint, spawnFacing, candles }.
  function buildRoom1(scene) {
    var mats = buildMaterials();
    buildMaterials._cache = mats;

    var colliders = [];
    var candles = [];

    var roomW = 4.4, roomD = 5.2, wallH = 2.8;
    var doorGapW = 1.1;

    var floor = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD), mats.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    var ceiling = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD), mats.ceiling);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, wallH, 0);
    scene.add(ceiling);

    var halfW = roomW / 2, halfD = roomD / 2;
    var wallThick = 0.2;

    function addWallSeg(cx, cz, w, d) {
      var m = wallBox(w, wallH, d, mats.stoneWall);
      m.position.set(cx, wallH / 2, cz);
      scene.add(m);
      colliders.push({
        minX: cx - w / 2, maxX: cx + w / 2,
        minZ: cz - d / 2, maxZ: cz + d / 2
      });
    }

    // back wall (solid), left wall (solid), right wall (solid)
    addWallSeg(0, -halfD, roomW, wallThick);
    addWallSeg(-halfW, 0, wallThick, roomD);
    addWallSeg(halfW, 0, wallThick, roomD);

    // front wall with a door gap in the middle, leading to the corridor (area 2)
    var sideW = (roomW - doorGapW) / 2;
    addWallSeg(-(doorGapW / 2 + sideW / 2), halfD, sideW, wallThick);
    addWallSeg((doorGapW / 2 + sideW / 2), halfD, sideW, wallThick);

    // door frame + door leaf (ajar, purely dressing for now - InteractionSystem
    // will make it fully functional in a later phase)
    var doorLeaf = wallBox(doorGapW * 0.92, wallH * 0.86, 0.08, mats.door);
    doorLeaf.position.set(-doorGapW * 0.35, wallH * 0.43, halfD - 0.02);
    doorLeaf.rotation.y = 0.9;
    scene.add(doorLeaf);

    // cot/bed where Lia wakes up
    var bedFrame = wallBox(0.9, 0.28, 1.9, mats.bedFrame);
    bedFrame.position.set(-halfW + 0.75, 0.14, -halfD + 1.15);
    scene.add(bedFrame);
    colliders.push({
      minX: bedFrame.position.x - 0.45, maxX: bedFrame.position.x + 0.45,
      minZ: bedFrame.position.z - 0.95, maxZ: bedFrame.position.z + 0.95
    });
    var blanket = wallBox(0.82, 0.1, 1.7, mats.blanket);
    blanket.position.set(bedFrame.position.x, 0.31, bedFrame.position.z);
    scene.add(blanket);

    // small barred window on the right wall
    var windowFrame = wallBox(0.05, 0.7, 0.55, mats.metal);
    windowFrame.position.set(halfW - 0.03, wallH * 0.62, -halfD + 0.9);
    scene.add(windowFrame);
    for (var b = 0; b < 3; b++) {
      var bar = wallBox(0.02, 0.66, 0.02, mats.metal);
      bar.position.set(halfW - 0.03, wallH * 0.62, -halfD + 0.65 + b * 0.25);
      scene.add(bar);
    }

    // wooden side table + candle (area 1 light source)
    var table = wallBox(0.4, 0.45, 0.4, mats.bedFrame);
    table.position.set(-halfW + 0.5, 0.225, -halfD + 2.4);
    scene.add(table);
    colliders.push({
      minX: table.position.x - 0.2, maxX: table.position.x + 0.2,
      minZ: table.position.z - 0.2, maxZ: table.position.z + 0.2
    });
    candles.push(addCandle(scene, table.position.x, 0.45, table.position.z));

    // --- start of area 2: corredor umido com retratos antigos ---
    var corridorW = 2.0, corridorLen = 6.5;
    var corridorZ0 = halfD;
    addWallSeg(-(corridorW / 2), corridorZ0 + corridorLen / 2, wallThick, corridorLen);
    addWallSeg((corridorW / 2), corridorZ0 + corridorLen / 2, wallThick, corridorLen);

    var corridorFloor = new THREE.Mesh(new THREE.PlaneGeometry(corridorW, corridorLen), mats.floor);
    corridorFloor.rotation.x = -Math.PI / 2;
    corridorFloor.position.set(0, 0, corridorZ0 + corridorLen / 2);
    corridorFloor.receiveShadow = true;
    scene.add(corridorFloor);
    var corridorCeil = new THREE.Mesh(new THREE.PlaneGeometry(corridorW, corridorLen), mats.ceiling);
    corridorCeil.rotation.x = Math.PI / 2;
    corridorCeil.position.set(0, wallH, corridorZ0 + corridorLen / 2);
    scene.add(corridorCeil);

    // blurred old portraits lining the corridor walls (flat painted planes)
    for (var p = 0; p < 3; p++) {
      var portraitTex = makeWoodTexture('#3a2c20');
      var portrait = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), new THREE.MeshStandardMaterial({ map: portraitTex, roughness: 1 }));
      portrait.position.set(-(corridorW / 2) + 0.11, 1.5, corridorZ0 + 1.2 + p * 1.9);
      portrait.rotation.y = Math.PI / 2;
      scene.add(portrait);
    }
    candles.push(addCandle(scene, corridorW / 2 - 0.15, 1.55, corridorZ0 + 3.2));

    // end wall of the visible corridor slice (further areas gated for future expansion)
    addWallSeg(0, corridorZ0 + corridorLen, corridorW, wallThick);

    var ambient = new THREE.PointLight(0x8899aa, 0.15, 12);
    ambient.position.set(0, wallH - 0.1, corridorZ0 + corridorLen / 2);
    scene.add(ambient);

    return {
      colliders: colliders,
      candles: candles,
      spawnPoint: new THREE.Vector3(-halfW + 0.75, 0, -halfD + 0.35),
      spawnFacing: 0
    };
  }

  function updateFlicker(candles, dt, t) {
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
    buildRoom1: buildRoom1,
    updateFlicker: updateFlicker
  };
})();
