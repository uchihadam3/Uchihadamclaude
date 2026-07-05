// CharacterBuilder: shared procedural low-poly humanoid rig builder.
// Builds a recognizable human silhouette (head/torso/arms/legs/hands/hair/clothes)
// out of primitive geometry arranged in a proper joint hierarchy (nested pivot
// groups, PS1-era style - no skeleton/skinning needed), painted with canvas
// textures for a hand-painted PS1 look. Reused by Lia (PlayerController) and
// later O Zelador de Cera (StalkerAI) with different proportions/palettes.
(function () {

  function paintNoise(ctx, w, h, count, color, alphaMin, alphaMax) {
    for (var i = 0; i < count; i++) {
      ctx.fillStyle = color;
      ctx.globalAlpha = alphaMin + Math.random() * (alphaMax - alphaMin);
      var x = Math.random() * w, y = Math.random() * h;
      var s = 1 + Math.random() * 2;
      ctx.fillRect(x, y, s, s);
    }
    ctx.globalAlpha = 1;
  }

  // Hand-painted-looking face texture: base skin tone + simple painted
  // eyes/brows/mouth/blush placed at the sphere's front-facing UV band.
  function makeFaceTexture(skinTone, hairShadeTone) {
    var w = 128, h = 128;
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = skinTone;
    ctx.fillRect(0, 0, w, h);
    paintNoise(ctx, w, h, 500, '#000000', 0.01, 0.05);
    paintNoise(ctx, w, h, 300, '#ffffff', 0.01, 0.04);

    // Front band roughly maps to u in [0.3,0.7], v in [0.45,0.85] on a sphere.
    var fx = w * 0.5, fyEyes = h * 0.56, fyMouth = h * 0.74;

    // brows
    ctx.strokeStyle = hairShadeTone;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(fx - 22, fyEyes - 14); ctx.lineTo(fx - 8, fyEyes - 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx + 8, fyEyes - 17); ctx.lineTo(fx + 22, fyEyes - 14); ctx.stroke();

    // eyes
    ctx.fillStyle = '#241c14';
    ctx.beginPath(); ctx.ellipse(fx - 14, fyEyes, 5, 3.4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(fx + 14, fyEyes, 5, 3.4, 0, 0, Math.PI * 2); ctx.fill();

    // blush
    ctx.fillStyle = 'rgba(180,90,80,0.18)';
    ctx.beginPath(); ctx.ellipse(fx - 26, fyEyes + 14, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(fx + 26, fyEyes + 14, 8, 5, 0, 0, Math.PI * 2); ctx.fill();

    // mouth
    ctx.strokeStyle = '#7a3a34';
    ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(fx - 9, fyMouth); ctx.quadraticCurveTo(fx, fyMouth + 3, fx + 9, fyMouth); ctx.stroke();

    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function makeFabricTexture(baseColor, weaveColor) {
    var w = 64, h = 64;
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = weaveColor;
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = 1;
    for (var i = 0; i < w; i += 4) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
    }
    for (var j = 0; j < h; j += 4) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    paintNoise(ctx, w, h, 120, '#000000', 0.02, 0.08);
    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }

  function makeLimbSegment(length, rTop, rBot, material, segments) {
    var pivot = new THREE.Group();
    var geo = new THREE.CylinderGeometry(rTop, rBot, length, segments || 8);
    var mesh = new THREE.Mesh(geo, material);
    mesh.position.y = -length / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    pivot.add(mesh);
    pivot.userData.length = length;
    return pivot;
  }

  function makeHand(material) {
    var g = new THREE.Group();
    var palm = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.075, 0.03), material);
    palm.position.y = -0.045;
    palm.castShadow = true;
    g.add(palm);
    return g;
  }

  function makeFoot(material, forward) {
    var g = new THREE.Group();
    var shoe = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.16), material);
    shoe.position.set(0, -0.028, forward ? 0.045 : 0.04);
    shoe.castShadow = true;
    g.add(shoe);
    return g;
  }

  // opts: { height, skinTone, hairColor, outfitColor, pantsColor, build: 'slim'|'stocky' }
  function buildHumanoid(opts) {
    opts = opts || {};
    var height = opts.height || 1.68;
    var skinTone = opts.skinTone || '#caa07a';
    var hairColor = opts.hairColor || '#3a2a20';
    var outfitColor = opts.outfitColor || '#5b6455';
    var pantsColor = opts.pantsColor || '#3c3a34';
    var buildScale = opts.build === 'stocky' ? 1.22 : 1.0;

    var skinMat = new THREE.MeshStandardMaterial({ map: makeFaceTexture(skinTone, hairColor), roughness: 0.85, metalness: 0.02 });
    var plainSkinMat = new THREE.MeshStandardMaterial({ color: skinTone, roughness: 0.85, metalness: 0.02 });
    var outfitMat = new THREE.MeshStandardMaterial({ map: makeFabricTexture(outfitColor, '#000000'), roughness: 0.95, metalness: 0.0 });
    var pantsMat = new THREE.MeshStandardMaterial({ map: makeFabricTexture(pantsColor, '#000000'), roughness: 0.95, metalness: 0.0 });
    var hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.6, metalness: 0.05 });
    var shoeMat = new THREE.MeshStandardMaterial({ color: '#201914', roughness: 0.7 });

    var root = new THREE.Group();
    root.name = 'CharacterRoot';

    var hipsY = height * 0.52;
    var hips = new THREE.Group();
    hips.position.y = hipsY;
    root.add(hips);

    // --- torso: tapered stacked cylinders (waist -> chest) ---
    var waistH = height * 0.16;
    var waist = new THREE.Mesh(new THREE.CylinderGeometry(0.105 * buildScale, 0.095 * buildScale, waistH, 8), pantsMat);
    waist.position.y = waistH / 2;
    waist.castShadow = true;
    hips.add(waist);

    var chestH = height * 0.22;
    var chestPivot = new THREE.Group();
    chestPivot.position.y = waistH;
    hips.add(chestPivot);
    var chest = new THREE.Mesh(new THREE.CylinderGeometry(0.145 * buildScale, 0.105 * buildScale, chestH, 8), outfitMat);
    chest.position.y = chestH / 2;
    chest.castShadow = true;
    chestPivot.add(chest);

    // --- neck + head ---
    var neck = new THREE.Group();
    neck.position.y = chestH;
    chestPivot.add(neck);
    var neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.06, 8), plainSkinMat);
    neckMesh.position.y = 0.03;
    neckMesh.castShadow = true;
    neck.add(neckMesh);

    var head = new THREE.Group();
    head.position.y = 0.06;
    neck.add(head);
    var headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.115, 10, 8), skinMat);
    headMesh.scale.set(1, 1.12, 0.92);
    headMesh.position.y = 0.115;
    headMesh.castShadow = true;
    head.add(headMesh);

    // hair cap (back/top coverage) + simple ponytail for a feminine silhouette
    var hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.122, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.62),
      hairMat
    );
    hairCap.position.y = 0.16;
    hairCap.castShadow = true;
    head.add(hairCap);
    var ponytail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.015, 0.32, 6), hairMat);
    ponytail.position.set(0, 0.03, -0.1);
    ponytail.rotation.x = 0.35;
    ponytail.castShadow = true;
    head.add(ponytail);

    // --- arms ---
    function buildArm(sign) {
      var shoulder = new THREE.Group();
      shoulder.position.set(sign * 0.175 * buildScale, chestH * 0.86, 0);
      chestPivot.add(shoulder);

      var upperLen = height * 0.155;
      var upperArm = makeLimbSegment(upperLen, 0.042, 0.036, plainSkinMat);
      shoulder.add(upperArm);

      var elbow = new THREE.Group();
      elbow.position.y = -upperLen;
      upperArm.add(elbow);

      var lowerLen = height * 0.14;
      var lowerArm = makeLimbSegment(lowerLen, 0.036, 0.03, plainSkinMat);
      elbow.add(lowerArm);

      var wrist = new THREE.Group();
      wrist.position.y = -lowerLen;
      lowerArm.add(wrist);

      var hand = makeHand(plainSkinMat);
      wrist.add(hand);

      shoulder.rotation.z = sign * 0.06;
      return { shoulder: shoulder, elbow: elbow, wrist: wrist };
    }
    var armL = buildArm(-1);
    var armR = buildArm(1);

    // --- legs ---
    function buildLeg(sign) {
      var hip = new THREE.Group();
      hip.position.set(sign * 0.08 * buildScale, 0, 0);
      hips.add(hip);

      var upperLen = height * 0.26;
      var upperLeg = makeLimbSegment(upperLen, 0.058, 0.05, pantsMat);
      hip.add(upperLeg);

      var knee = new THREE.Group();
      knee.position.y = -upperLen;
      upperLeg.add(knee);

      var lowerLen = height * 0.24;
      var lowerLeg = makeLimbSegment(lowerLen, 0.048, 0.038, pantsMat);
      knee.add(lowerLeg);

      var ankle = new THREE.Group();
      ankle.position.y = -lowerLen;
      lowerLeg.add(ankle);

      var foot = makeFoot(shoeMat, true);
      ankle.add(foot);

      return { hip: hip, knee: knee, ankle: ankle };
    }
    var legL = buildLeg(-1);
    var legR = buildLeg(1);

    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

    return {
      root: root,
      hipsHeight: hipsY,
      parts: {
        hips: hips,
        chestPivot: chestPivot,
        neck: neck,
        head: head,
        leftShoulder: armL.shoulder, leftElbow: armL.elbow,
        rightShoulder: armR.shoulder, rightElbow: armR.elbow,
        leftHip: legL.hip, leftKnee: legL.knee,
        rightHip: legR.hip, rightKnee: legR.knee
      }
    };
  }

  AK.entities.CharacterBuilder = {
    buildHumanoid: buildHumanoid,
    makeFaceTexture: makeFaceTexture,
    makeFabricTexture: makeFabricTexture,
    makeLimbSegment: makeLimbSegment
  };
})();
