// WorldKit: shared canvas-texture generators, material presets and geometry
// helpers used by every room builder in js/world/rooms/*.js. Keeping this
// separate from World.js (the orchestrator) and the individual rooms is what
// lets each area live in its own small file instead of one giant world file.
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

  function makeStoneTexture(tint) {
    var w = 128, h = 128, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = tint || '#4a463c';
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

  function makeFloorTexture(tint) {
    var w = 128, h = 128, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = tint || '#2c2118';
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

  function makeTileTexture(base, grout) {
    var w = 64, h = 64, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = grout || '#1c1c1a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = base || '#5a5750';
    var tile = 14, gap = 1.5;
    for (var y = 0; y < h; y += tile) {
      for (var x = 0; x < w; x += tile) {
        ctx.fillRect(x + gap, y + gap, tile - gap * 2, tile - gap * 2);
      }
    }
    paintNoise(ctx, w, h, 300, '#000000', 0.02, 0.1);
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function makeMossyStoneTexture() {
    var tex = makeStoneTexture('#42463a');
    return tex;
  }

  function makeFabricTexture(base) {
    var w = 48, h = 48, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = base || '#4a2c30';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#000000';
    ctx.globalAlpha = 0.15;
    for (var x = 0; x < w; x += 3) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    ctx.globalAlpha = 1;
    paintNoise(ctx, w, h, 150, '#000000', 0.02, 0.08);
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 2);
    return tex;
  }

  // Base material palette shared by every room; rooms may add their own
  // specialised materials (e.g. Kitchen's grimy tile) on top of this.
  function buildBaseMaterials() {
    return {
      stoneWall: new THREE.MeshStandardMaterial({ map: makeStoneTexture(), roughness: 0.95 }),
      floor: new THREE.MeshStandardMaterial({ map: makeFloorTexture(), roughness: 0.9 }),
      ceiling: new THREE.MeshStandardMaterial({ color: 0x232019, roughness: 1.0 }),
      door: new THREE.MeshStandardMaterial({ map: makeWoodTexture('#4a3423'), roughness: 0.8 }),
      wood: new THREE.MeshStandardMaterial({ map: makeWoodTexture('#2f2318'), roughness: 0.85 }),
      blanket: new THREE.MeshStandardMaterial({ color: 0x54503f, roughness: 1.0 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x3a3a3c, roughness: 0.45, metalness: 0.7 }),
      candleWax: new THREE.MeshStandardMaterial({ color: 0xd8cba1, roughness: 0.6 }),
      flame: new THREE.MeshBasicMaterial({ color: 0xffb24a }),
      paper: new THREE.MeshStandardMaterial({ color: 0xcfc4a0, roughness: 1.0 })
    };
  }

  function wallBox(w, h, d, mat) {
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // Adds a solid wall segment to the scene AND records its AABB collider.
  function addWallSeg(scene, colliders, mat, wallH, cx, cz, w, d) {
    var m = wallBox(w, wallH, d, mat);
    m.position.set(cx, wallH / 2, cz);
    scene.add(m);
    colliders.push({ minX: cx - w / 2, maxX: cx + w / 2, minZ: cz - d / 2, maxZ: cz + d / 2 });
    return m;
  }

  function addFloor(scene, mat, w, d, cx, cz) {
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(cx, 0, cz);
    floor.receiveShadow = true;
    scene.add(floor);
    return floor;
  }

  function addCeiling(scene, mat, w, d, cx, cz, wallH) {
    var ceil = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(cx, wallH, cz);
    scene.add(ceil);
    return ceil;
  }

  function addCandle(scene, mats, x, y, z, colorHex) {
    var group = new THREE.Group();
    var base = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.12, 8), mats.candleWax);
    base.position.y = 0.06;
    group.add(base);
    var flame = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.035, 6), mats.flame);
    flame.position.y = 0.135;
    group.add(flame);
    var light = new THREE.PointLight(colorHex || 0xffa64a, 2.0, 4.5, 2);
    light.position.y = 0.15;
    light.castShadow = false;
    group.add(light);
    group.position.set(x, y, z);
    group.userData.flicker = { light: light, flame: flame, base: light.intensity, t: Math.random() * 10 };
    scene.add(group);
    return group;
  }

  // A simple painted plane standing in for a readable note/document prop -
  // InteractionSystem/PuzzleSystem (later phase) will make these interactive.
  function addNoteProp(scene, mats, x, y, z, rotY) {
    var note = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.3), mats.paper);
    note.position.set(x, y, z);
    note.rotation.x = -Math.PI / 2.3;
    if (rotY) note.rotation.z = rotY;
    scene.add(note);
    return note;
  }

  AK.world.WorldKit = {
    paintNoise: paintNoise,
    makeStoneTexture: makeStoneTexture,
    makeFloorTexture: makeFloorTexture,
    makeWoodTexture: makeWoodTexture,
    makeTileTexture: makeTileTexture,
    makeMossyStoneTexture: makeMossyStoneTexture,
    makeFabricTexture: makeFabricTexture,
    buildBaseMaterials: buildBaseMaterials,
    wallBox: wallBox,
    addWallSeg: addWallSeg,
    addFloor: addFloor,
    addCeiling: addCeiling,
    addCandle: addCandle,
    addNoteProp: addNoteProp
  };
})();
