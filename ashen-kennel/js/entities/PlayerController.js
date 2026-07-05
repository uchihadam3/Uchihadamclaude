// PlayerController: drives Lia's rig (walk/run/crouch/idle procedural animation),
// reads WASD+Shift+Ctrl input, resolves circle-vs-box collisions against the
// room's colliders, and manages the stamina resource. Emits 'footstep' events
// on the shared bus so StalkerAI (later phase) can react to noise.
(function () {
  var cfg = AK.config;

  function PlayerController(scene, cameraController, bus) {
    this.scene = scene;
    this.cameraController = cameraController;
    this.bus = bus;

    var rig = AK.entities.CharacterBuilder.buildHumanoid({
      height: 1.66,
      skinTone: '#d3ab84',
      hairColor: '#3c2a1e',
      outfitColor: '#5c6350',
      pantsColor: '#39362f'
    });
    this.rig = rig;
    this.root = rig.root;
    this.parts = rig.parts;
    this.scene.add(this.root);

    this.radius = 0.28;
    this.height = 1.66;

    this.velocity = new THREE.Vector3();
    this.facingAngle = 0;

    this.state = 'idle'; // idle | walk | run | crouch
    this.stamina = cfg.STAMINA_MAX;
    this._staminaRegenTimer = 0;

    this.walkCycle = 0;
    this.idleCycle = 0;

    this.crouching = false;

    this._footstepTimer = 0;

    this.spawnAt(new THREE.Vector3(0, 0, 0), 0);
  }

  PlayerController.prototype.spawnAt = function (pos, facing) {
    this.root.position.copy(pos);
    this.facingAngle = facing || 0;
    this.root.rotation.y = this.facingAngle;
  };

  PlayerController.prototype.getPosition = function () {
    return this.root.position;
  };

  PlayerController.prototype._resolveCollisions = function (nextPos, world) {
    if (!world || !world.colliders) return nextPos;
    var r = this.radius;
    for (var i = 0; i < world.colliders.length; i++) {
      var c = world.colliders[i];
      var closestX = Math.max(c.minX, Math.min(nextPos.x, c.maxX));
      var closestZ = Math.max(c.minZ, Math.min(nextPos.z, c.maxZ));
      var dx = nextPos.x - closestX;
      var dz = nextPos.z - closestZ;
      var distSq = dx * dx + dz * dz;
      if (distSq < r * r && distSq > 1e-6) {
        var dist = Math.sqrt(distSq);
        var overlap = r - dist;
        nextPos.x += (dx / dist) * overlap;
        nextPos.z += (dz / dist) * overlap;
      } else if (distSq <= 1e-6) {
        // fully inside the box (rare - e.g. spawned/teleported into geometry):
        // push out through whichever face is nearest, not a fixed direction.
        var distToMinX = nextPos.x - c.minX, distToMaxX = c.maxX - nextPos.x;
        var distToMinZ = nextPos.z - c.minZ, distToMaxZ = c.maxZ - nextPos.z;
        var nearest = Math.min(distToMinX, distToMaxX, distToMinZ, distToMaxZ);
        if (nearest === distToMinX) nextPos.x = c.minX - r;
        else if (nearest === distToMaxX) nextPos.x = c.maxX + r;
        else if (nearest === distToMinZ) nextPos.z = c.minZ - r;
        else nextPos.z = c.maxZ + r;
      }
    }
    return nextPos;
  };

  PlayerController.prototype.update = function (dt, world) {
    var Input = AK.core.Input;

    var forwardInput = (Input.isDown('KeyW') || Input.isDown('ArrowUp') ? 1 : 0) -
      (Input.isDown('KeyS') || Input.isDown('ArrowDown') ? 1 : 0);
    var strafeInput = (Input.isDown('KeyD') || Input.isDown('ArrowRight') ? 1 : 0) -
      (Input.isDown('KeyA') || Input.isDown('ArrowLeft') ? 1 : 0);

    // mobile joystick overrides keyboard once its deflection is meaningful
    var axis = Input.getVirtualAxis();
    if (Math.abs(axis.x) > 0.15 || Math.abs(axis.y) > 0.15) {
      strafeInput = axis.x;
      forwardInput = axis.y;
    }

    this.crouching = Input.isDown('ControlLeft') || Input.isDown('ControlRight');
    var wantsRun = (Input.isDown('ShiftLeft') || Input.isDown('ShiftRight')) && !this.crouching;

    var moving = (forwardInput !== 0 || strafeInput !== 0);
    var canRun = wantsRun && this.stamina > 1 && moving;

    var speed = 0;
    if (moving) {
      if (this.crouching) { speed = cfg.PLAYER_CROUCH_SPEED; this.state = 'crouch'; }
      else if (canRun) { speed = cfg.PLAYER_RUN_SPEED; this.state = 'run'; }
      else { speed = cfg.PLAYER_WALK_SPEED; this.state = 'walk'; }
    } else {
      this.state = this.crouching ? 'crouchIdle' : 'idle';
    }

    // stamina drain/regen
    if (this.state === 'run') {
      this.stamina = Math.max(0, this.stamina - cfg.STAMINA_DRAIN_PER_SEC * dt);
      this._staminaRegenTimer = cfg.STAMINA_REGEN_DELAY;
    } else {
      if (this._staminaRegenTimer > 0) this._staminaRegenTimer -= dt;
      else this.stamina = Math.min(cfg.STAMINA_MAX, this.stamina + cfg.STAMINA_REGEN_PER_SEC * dt);
    }

    var yaw = this.cameraController.yaw;
    var forwardVec = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    var rightVec = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

    var moveVec = new THREE.Vector3();
    moveVec.addScaledVector(forwardVec, forwardInput);
    moveVec.addScaledVector(rightVec, strafeInput);
    if (moveVec.lengthSq() > 0.0001) moveVec.normalize();

    var nextPos = this.root.position.clone().addScaledVector(moveVec, speed * dt);
    nextPos = this._resolveCollisions(nextPos, world);
    this.root.position.copy(nextPos);

    if (moving) {
      var targetAngle = Math.atan2(moveVec.x, moveVec.z);
      var da = targetAngle - this.facingAngle;
      da = Math.atan2(Math.sin(da), Math.cos(da));
      this.facingAngle += da * Math.min(1, dt * 10);
      this.root.rotation.y = this.facingAngle;
    }

    this._animate(dt, moving, speed);

    // footstep events, spaced by gait speed (used later by StalkerAI hearing / AudioManager)
    if (moving && this.state !== 'crouch') {
      this._footstepTimer -= dt * (speed / cfg.PLAYER_WALK_SPEED);
      if (this._footstepTimer <= 0) {
        this._footstepTimer = 0.38;
        if (this.bus) this.bus.emit('footstep', { position: this.root.position.clone(), loud: this.state === 'run' });
      }
    }
  };

  PlayerController.prototype._animate = function (dt, moving, speed) {
    var p = this.parts;
    var crouchLerp = this.crouching ? 1 : 0;
    this.parts.hips.position.y = THREE.MathUtils.lerp(this.rig.hipsHeight, this.rig.hipsHeight * 0.72, crouchLerp);

    if (moving) {
      var cycleSpeed = this.state === 'run' ? 8.2 : 4.6;
      this.walkCycle += dt * cycleSpeed;
      var amp = this.state === 'run' ? 0.62 : 0.42;
      var s = Math.sin(this.walkCycle);
      var c = Math.cos(this.walkCycle);

      p.leftHip.rotation.x = s * amp;
      p.rightHip.rotation.x = -s * amp;
      p.leftKnee.rotation.x = Math.max(0, -s * amp * 1.3) + 0.12;
      p.rightKnee.rotation.x = Math.max(0, s * amp * 1.3) + 0.12;

      p.leftShoulder.rotation.x = -s * amp * 0.7;
      p.rightShoulder.rotation.x = s * amp * 0.7;

      p.chestPivot.rotation.z = s * 0.05;
      p.chestPivot.rotation.y = s * 0.04;
      p.hips.position.y += Math.abs(c) * (this.state === 'run' ? 0.028 : 0.016);
    } else {
      this.idleCycle += dt * 1.4;
      var breathe = Math.sin(this.idleCycle) * 0.012;
      p.chestPivot.scale.set(1, 1 + breathe, 1);
      p.leftHip.rotation.x = THREE.MathUtils.lerp(p.leftHip.rotation.x, 0, dt * 6);
      p.rightHip.rotation.x = THREE.MathUtils.lerp(p.rightHip.rotation.x, 0, dt * 6);
      p.leftKnee.rotation.x = THREE.MathUtils.lerp(p.leftKnee.rotation.x, 0, dt * 6);
      p.rightKnee.rotation.x = THREE.MathUtils.lerp(p.rightKnee.rotation.x, 0, dt * 6);
      p.leftShoulder.rotation.x = THREE.MathUtils.lerp(p.leftShoulder.rotation.x, 0, dt * 6);
      p.rightShoulder.rotation.x = THREE.MathUtils.lerp(p.rightShoulder.rotation.x, 0, dt * 6);
      p.chestPivot.rotation.z = THREE.MathUtils.lerp(p.chestPivot.rotation.z, 0, dt * 6);
      p.chestPivot.rotation.y = THREE.MathUtils.lerp(p.chestPivot.rotation.y, 0, dt * 6);
    }
  };

  AK.entities.PlayerController = PlayerController;
})();
