// Input: shared keyboard state singleton. TouchControls.js (the mobile
// D-pad) writes into the same virtualKeys map so HeroController's isDown()
// checks work identically regardless of input source.
(function () {
  var keys = {};
  var virtualKeys = {};
  var justPressed = {};

  window.addEventListener('keydown', function (e) {
    if (!keys[e.code]) justPressed[e.code] = true;
    keys[e.code] = true;
  });
  window.addEventListener('keyup', function (e) { keys[e.code] = false; });
  window.addEventListener('blur', function () { keys = {}; });

  RPG.core.Input = {
    isDown: function (code) { return !!keys[code] || !!virtualKeys[code]; },
    wasPressed: function (code) { return !!justPressed[code]; },
    consumeFrame: function () { justPressed = {}; },
    setVirtualKey: function (code, isDown) { virtualKeys[code] = isDown; }
  };
})();
