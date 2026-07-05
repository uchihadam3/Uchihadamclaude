// Input: shared keyboard state singleton (same pattern used across the other
// projects in this repo). Touch controls hook into the same isDown surface
// once the mobile phase lands, mirroring Ashen Kennel's approach.
(function () {
  var keys = {};
  var justPressed = {};

  window.addEventListener('keydown', function (e) {
    if (!keys[e.code]) justPressed[e.code] = true;
    keys[e.code] = true;
  });
  window.addEventListener('keyup', function (e) { keys[e.code] = false; });
  window.addEventListener('blur', function () { keys = {}; });

  RPG.core.Input = {
    isDown: function (code) { return !!keys[code]; },
    wasPressed: function (code) { return !!justPressed[code]; },
    consumeFrame: function () { justPressed = {}; }
  };
})();
