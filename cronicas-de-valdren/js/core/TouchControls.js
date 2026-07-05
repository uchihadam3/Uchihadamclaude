// TouchControls: a classic on-screen D-pad for mobile (4-directional, matching
// HeroController's WASD/arrow movement exactly - no extra buttons for verbs
// that don't exist yet, e.g. no run/attack button until those systems land).
(function () {
  function isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  }

  var DIR_CODES = {
    up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight'
  };

  function TouchControls() {
    this.enabled = isTouchDevice();
    if (!this.enabled) return;
    document.body.classList.add('touch-device');
    this._build();
  }

  TouchControls.prototype._build = function () {
    var wrap = document.createElement('div');
    wrap.className = 'dpad touch-ui';
    wrap.innerHTML =
      '<button class="dpad-btn dpad-up" data-dir="up" type="button">&#9650;</button>' +
      '<button class="dpad-btn dpad-left" data-dir="left" type="button">&#9664;</button>' +
      '<button class="dpad-btn dpad-right" data-dir="right" type="button">&#9654;</button>' +
      '<button class="dpad-btn dpad-down" data-dir="down" type="button">&#9660;</button>';
    document.body.appendChild(wrap);

    var Input = RPG.core.Input;
    wrap.querySelectorAll('.dpad-btn').forEach(function (btn) {
      var code = DIR_CODES[btn.getAttribute('data-dir')];
      btn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        Input.setVirtualKey(code, true);
        btn.classList.add('active');
      }, { passive: false });
      function release(e) {
        e.preventDefault();
        Input.setVirtualKey(code, false);
        btn.classList.remove('active');
      }
      btn.addEventListener('touchend', release);
      btn.addEventListener('touchcancel', release);
    });
  };

  RPG.core.TouchControls = TouchControls;
})();
