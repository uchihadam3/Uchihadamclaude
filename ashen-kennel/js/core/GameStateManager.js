// GameStateManager: top-level state machine (boot/menu/playing/paused/cutscene/gameover)
// plus a tiny pub/sub event bus other modules use to talk to each other without
// import/export (everything here is a classic script sharing the AK namespace).
(function () {
  function EventBus() {
    this.listeners = {};
  }
  EventBus.prototype.on = function (evt, fn) {
    (this.listeners[evt] = this.listeners[evt] || []).push(fn);
    return fn;
  };
  EventBus.prototype.off = function (evt, fn) {
    var list = this.listeners[evt];
    if (!list) return;
    var i = list.indexOf(fn);
    if (i >= 0) list.splice(i, 1);
  };
  EventBus.prototype.emit = function (evt, payload) {
    var list = this.listeners[evt];
    if (!list) return;
    // copy in case a handler unsubscribes during iteration
    list.slice().forEach(function (fn) { fn(payload); });
  };

  var STATES = Object.freeze({
    BOOT: 'boot',
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    CUTSCENE: 'cutscene',
    GAMEOVER: 'gameover'
  });

  function GameStateManager() {
    this.bus = new EventBus();
    this.state = STATES.BOOT;
    this.currentRoomId = null;
    this.checkpoint = null; // { roomId, spawnPoint, flags snapshot }
    this.flags = {
      moroFreed: false,
      libraryPuzzleSolved: false,
      firstChaseEscaped: false,
      finalDoorOpened: false
    };
  }

  GameStateManager.prototype.setState = function (next) {
    var prev = this.state;
    if (prev === next) return;
    this.state = next;
    this.bus.emit('stateChange', { from: prev, to: next });
  };

  GameStateManager.prototype.isPlaying = function () {
    return this.state === STATES.PLAYING;
  };

  GameStateManager.prototype.setCheckpoint = function (roomId, spawnPoint) {
    this.checkpoint = {
      roomId: roomId,
      spawnPoint: spawnPoint,
      flags: Object.assign({}, this.flags)
    };
    this.bus.emit('checkpoint', this.checkpoint);
  };

  AK.core.STATES = STATES;
  AK.core.GameStateManager = GameStateManager;
  AK.core.EventBus = EventBus;
})();
