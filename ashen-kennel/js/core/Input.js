// Input: shared keyboard/pointer state singleton. Real keys/mouse drive
// desktop; on touch devices TouchControls.js feeds "virtual" keys/axis into
// the same isDown()/getVirtualAxis() surface so PlayerController doesn't need
// to know which input source is active.
(function () {
  var keys = {};
  var virtualKeys = {};
  var justPressed = {};
  var pointerDeltaX = 0, pointerDeltaY = 0;
  var dragging = false;
  var lastX = 0, lastY = 0;
  var lookTouchId = null;
  var virtualAxis = { x: 0, y: 0 };

  window.addEventListener('keydown', function (e) {
    if (!keys[e.code]) justPressed[e.code] = true;
    keys[e.code] = true;
  });
  window.addEventListener('keyup', function (e) {
    keys[e.code] = false;
  });
  window.addEventListener('blur', function () {
    keys = {};
  });

  function pointerDown(x, y) { dragging = true; lastX = x; lastY = y; }
  function pointerMove(x, y) {
    if (!dragging) return;
    pointerDeltaX += (x - lastX);
    pointerDeltaY += (y - lastY);
    lastX = x; lastY = y;
  }
  function pointerUp() { dragging = false; }

  window.addEventListener('mousedown', function (e) { pointerDown(e.clientX, e.clientY); });
  window.addEventListener('mousemove', function (e) { pointerMove(e.clientX, e.clientY); });
  window.addEventListener('mouseup', pointerUp);

  // Touch look-drag: tracked by a single dedicated touch identifier so it
  // doesn't get confused by a second finger on the joystick/buttons (those
  // elements stopPropagation() their own touch events, but a *separate*
  // concurrent touch elsewhere must still resolve to the correct finger).
  window.addEventListener('touchstart', function (e) {
    if (lookTouchId !== null) return;
    var t = e.changedTouches[0];
    lookTouchId = t.identifier;
    pointerDown(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      var t = e.changedTouches[i];
      if (t.identifier === lookTouchId) { pointerMove(t.clientX, t.clientY); break; }
    }
  }, { passive: true });
  function releaseLookTouch(e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === lookTouchId) { lookTouchId = null; pointerUp(); break; }
    }
  }
  window.addEventListener('touchend', releaseLookTouch);
  window.addEventListener('touchcancel', releaseLookTouch);

  var Input = {
    isDown: function (code) { return !!keys[code] || !!virtualKeys[code]; },
    wasPressed: function (code) { return !!justPressed[code]; },
    consumeFrame: function () {
      // call once per frame after all systems read justPressed / pointer delta
      justPressed = {};
      pointerDeltaX = 0;
      pointerDeltaY = 0;
    },
    getPointerDelta: function () { return { x: pointerDeltaX, y: pointerDeltaY }; },
    // TouchControls (mobile joystick + hold buttons) writes through these:
    setVirtualKey: function (code, isDown) { virtualKeys[code] = isDown; },
    setVirtualAxis: function (x, y) { virtualAxis.x = x; virtualAxis.y = y; },
    getVirtualAxis: function () { return virtualAxis; }
  };

  AK.core.Input = Input;
})();
