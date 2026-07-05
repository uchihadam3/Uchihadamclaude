// CameraController: cinematic third-person camera with multiple modes.
//   'follow' - default exploration mode, smoothed behind-character framing
//   'fixed'  - locked at an authored point/lookAt for tension (classic survival-horror angle)
//   'chase'  - closer & faster-tracking, used while StalkerAI is actively chasing
// Shake/distortion intensity is driven externally (FearSystem) via setShake().
(function () {
  function CameraController(camera, opts) {
    this.camera = camera;
    this.mode = 'follow';
    this.target = null; // object3D to follow (Lia's rig root)

    this.followOffset = new THREE.Vector3(0, 1.65, 3.1);
    this.followLookOffset = new THREE.Vector3(0, 1.2, 0);
    this.chaseOffset = new THREE.Vector3(0, 1.35, 2.15);
    this.chaseLookOffset = new THREE.Vector3(0, 1.1, 0);

    this.fixedPoint = null;
    this.fixedLookAt = null;

    this.smooth = 5.2; // higher = snappier
    this.yaw = 0; // orbit around target, radians, controlled by mouse/touch drag

    this.shakeIntensity = 0; // 0..1, set by FearSystem
    this._shakeTime = 0;

    this._tmpPos = new THREE.Vector3();
    this._tmpLook = new THREE.Vector3();
    this._currentPos = new THREE.Vector3();
    this._currentLook = new THREE.Vector3();
    this._initialized = false;
  }

  CameraController.prototype.setTarget = function (obj3D) {
    this.target = obj3D;
  };

  CameraController.prototype.setMode = function (mode) {
    this.mode = mode;
  };

  CameraController.prototype.setFixed = function (point, lookAt) {
    this.fixedPoint = point.clone();
    this.fixedLookAt = lookAt.clone();
  };

  CameraController.prototype.setShake = function (intensity) {
    this.shakeIntensity = Math.max(0, Math.min(1, intensity));
  };

  CameraController.prototype.addYaw = function (delta) {
    this.yaw += delta;
  };

  // Pulls the desired camera point back along the target->camera segment if a
  // wall collider is in the way, so orbiting never clips the camera outside
  // the room (mandatory polish item: "camera not absurdly clipping through walls").
  CameraController.prototype._clampAgainstWalls = function (targetPos, desiredPos, colliders) {
    if (!colliders || !colliders.length) return desiredPos;
    var sx = targetPos.x, sz = targetPos.z, ex = desiredPos.x, ez = desiredPos.z;
    var dx = ex - sx, dz = ez - sz;
    var bestT = 1;
    for (var i = 0; i < colliders.length; i++) {
      var box = colliders[i];
      var tmin = 0, tmax = 1, blocked = false;
      if (Math.abs(dx) < 1e-9) {
        if (sx < box.minX || sx > box.maxX) blocked = true;
      } else {
        var tx1 = (box.minX - sx) / dx, tx2 = (box.maxX - sx) / dx;
        if (tx1 > tx2) { var tmp = tx1; tx1 = tx2; tx2 = tmp; }
        tmin = Math.max(tmin, tx1); tmax = Math.min(tmax, tx2);
        if (tmin > tmax) blocked = true;
      }
      if (!blocked) {
        if (Math.abs(dz) < 1e-9) {
          if (sz < box.minZ || sz > box.maxZ) blocked = true;
        } else {
          var tz1 = (box.minZ - sz) / dz, tz2 = (box.maxZ - sz) / dz;
          if (tz1 > tz2) { var tmp2 = tz1; tz1 = tz2; tz2 = tmp2; }
          tmin = Math.max(tmin, tz1); tmax = Math.min(tmax, tz2);
          if (tmin > tmax) blocked = true;
        }
      }
      if (!blocked && tmin > 0 && tmin < bestT) bestT = tmin;
    }
    if (bestT < 1) {
      var rayLen = Math.sqrt(dx * dx + dz * dz) || 1;
      var minDistance = 0.85; // never let the wall push the camera closer than this to the target
      var minT = minDistance / rayLen;
      var t = Math.max(minT, bestT - 0.1);
      return new THREE.Vector3(sx + dx * t, desiredPos.y, sz + dz * t);
    }
    return desiredPos;
  };

  CameraController.prototype.update = function (dt, world) {
    if (!this.target && this.mode !== 'fixed') return;

    var desiredPos, desiredLook;

    if (this.mode === 'fixed' && this.fixedPoint) {
      desiredPos = this.fixedPoint;
      desiredLook = this.fixedLookAt;
    } else {
      var offset = this.mode === 'chase' ? this.chaseOffset : this.followOffset;
      var lookOffset = this.mode === 'chase' ? this.chaseLookOffset : this.followLookOffset;

      var rotatedOffset = offset.clone();
      rotatedOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);

      this._tmpPos.copy(this.target.position).add(rotatedOffset);
      this._tmpLook.copy(this.target.position).add(lookOffset);
      desiredPos = this._tmpPos;
      desiredLook = this._tmpLook;

      if (world && world.colliders) {
        desiredPos = this._clampAgainstWalls(this.target.position, desiredPos, world.colliders);
      }
    }

    if (!this._initialized) {
      this._currentPos.copy(desiredPos);
      this._currentLook.copy(desiredLook);
      this._initialized = true;
    } else {
      var lerpFactor = 1 - Math.exp(-this.smooth * dt);
      var chaseFactor = this.mode === 'chase' ? Math.min(1, lerpFactor * 1.6) : lerpFactor;
      this._currentPos.lerp(desiredPos, chaseFactor);
      this._currentLook.lerp(desiredLook, chaseFactor);
    }

    this.camera.position.copy(this._currentPos);

    if (this.shakeIntensity > 0.001) {
      this._shakeTime += dt * (8 + this.shakeIntensity * 14);
      var mag = this.shakeIntensity * 0.045;
      this.camera.position.x += Math.sin(this._shakeTime * 13.1) * mag;
      this.camera.position.y += Math.cos(this._shakeTime * 17.7) * mag * 0.6;
    }

    this.camera.lookAt(this._currentLook);
  };

  AK.core.CameraController = CameraController;
})();
