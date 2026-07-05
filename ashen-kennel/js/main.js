// main.js: bootstraps the engine (renderer/scene/camera), wires the
// Phase 1 modules together (GameStateManager, CameraController, PS1Renderer,
// PlayerController, World, UIManager) and drives the animation loop.
(function () {
  var canvas = document.getElementById('gameCanvas');
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

  var camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.05, 60);

  var gsm = new AK.core.GameStateManager();
  var ui = new AK.ui.UIManager(gsm);
  ui.setBus(gsm.bus);

  var ps1 = new AK.core.PS1Renderer(renderer, { internalHeight: AK.config.PS1_INTERNAL_HEIGHT });

  var scene = AK.world.World.createScene();
  var camCtrl = new AK.core.CameraController(camera);

  var player = null;
  var roomData = null;

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    ps1.resize(w, h);
  }
  window.addEventListener('resize', resize);
  resize();

  function startNewGame() {
    if (!player) {
      player = new AK.entities.PlayerController(scene, camCtrl, gsm.bus);
      roomData = AK.world.World.buildRoom1(scene);
      player.spawnAt(roomData.spawnPoint, roomData.spawnFacing);
      camCtrl.setTarget(player.root);
      gsm.setCheckpoint('room1', roomData.spawnPoint.clone());
    }
    gsm.setState(AK.core.STATES.PLAYING);
    ui.showHUD();
  }

  gsm.bus.on('menuAction', function (action) {
    if (action === 'newGame' || action === 'continue') startNewGame();
    else if (action === 'resume') { gsm.setState(AK.core.STATES.PLAYING); ui.showHUD(); }
    else if (action === 'quit') { gsm.setState(AK.core.STATES.MENU); ui.showMainMenu(); }
    else if (action === 'respawn') {
      if (player && gsm.checkpoint) player.spawnAt(gsm.checkpoint.spawnPoint, roomData.spawnFacing);
      gsm.setState(AK.core.STATES.PLAYING);
      ui.showHUD();
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.code !== 'Escape') return;
    if (gsm.state === AK.core.STATES.PLAYING) { gsm.setState(AK.core.STATES.PAUSED); ui.showPause(); }
    else if (gsm.state === AK.core.STATES.PAUSED) { gsm.setState(AK.core.STATES.PLAYING); ui.hidePause(); }
  });

  ui.runBootSequence(function () {
    gsm.setState(AK.core.STATES.MENU);
    ui.showMainMenu();
  });

  // dev/test inspection hook (read-only) - lets automated tests assert on live engine state
  window.__AK_DEBUG = {
    camera: camera, camCtrl: camCtrl, gsm: gsm,
    getPlayer: function () { return player; },
    getRoomData: function () { return roomData; }
  };

  var clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    var dt = Math.min(clock.getDelta(), 0.05);

    var pd = AK.core.Input.getPointerDelta();
    if (pd.x !== 0) camCtrl.addYaw(-pd.x * 0.0045);

    if (gsm.isPlaying() && player) {
      player.update(dt, roomData);
      camCtrl.update(dt, roomData);
      if (roomData) AK.world.World.updateFlicker(roomData.candles, dt);
      ui.update(player);
    }

    AK.core.Input.consumeFrame();
    ps1.render(scene, camera);
  }
  tick();
})();
