// Input: shared keyboard/pointer state singleton (works for PC now; touch
// buttons for mobile get wired up the same way by UIManager in a later phase).
(function () {
  var keys = {};
  var justPressed = {};
  var pointerDeltaX = 0, pointerDeltaY = 0;
  var dragging = false;
  var lastX = 0, lastY = 0;

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
  window.addEventListener('touchstart', function (e) {
    var t = e.touches[0]; if (t) pointerDown(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    var t = e.touches[0]; if (t) pointerMove(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('touchend', pointerUp);

  var Input = {
    isDown: function (code) { return !!keys[code]; },
    wasPressed: function (code) { return !!justPressed[code]; },
    consumeFrame: function () {
      // call once per frame after all systems read justPressed / pointer delta
      justPressed = {};
      pointerDeltaX = 0;
      pointerDeltaY = 0;
    },
    getPointerDelta: function () { return { x: pointerDeltaX, y: pointerDeltaY }; }
  };

  AK.core.Input = Input;
})();
