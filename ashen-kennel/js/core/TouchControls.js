// TouchControls: mobile on-screen controls. Only covers verbs that already
// have a real implementation (mover, correr, agachar, olhar via drag, pausar)
// - no dead buttons for systems that don't exist yet (interagir/chamar cao/
// etc. get their own touch buttons when InteractionSystem/CompanionDogAI land).
// Feeds AK.core.Input's virtual axis/keys so PlayerController needs no changes.
(function () {
  function isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  }

  function TouchControls(bus) {
    this.bus = bus;
    this.enabled = isTouchDevice();
    if (!this.enabled) return;
    document.body.classList.add('touch-device');
    this._buildDom();
    this._wireJoystick();
    this._wireButtons();
  }

  TouchControls.prototype._buildDom = function () {
    var joy = document.createElement('div');
    joy.className = 'touch-joystick touch-ui';
    joy.innerHTML = '<div class="joy-base"><div class="joy-knob"></div></div>';
    document.body.appendChild(joy);
    this.joyBase = joy.querySelector('.joy-base');
    this.joyKnob = joy.querySelector('.joy-knob');

    var actions = document.createElement('div');
    actions.className = 'touch-actions touch-ui';
    actions.innerHTML =
      '<button class="touch-btn crouch" data-touch="crouch" type="button">AGACHAR</button>' +
      '<button class="touch-btn run" data-touch="run" type="button">CORRER</button>';
    document.body.appendChild(actions);
    this.actionButtons = actions.querySelectorAll('.touch-btn');

    var pauseBtn = document.createElement('button');
    pauseBtn.className = 'touch-pause-btn touch-ui';
    pauseBtn.type = 'button';
    pauseBtn.setAttribute('aria-label', 'Pausar');
    pauseBtn.textContent = '∥';
    document.body.appendChild(pauseBtn);
    this.pauseBtn = pauseBtn;
  };

  TouchControls.prototype._wireJoystick = function () {
    var Input = AK.core.Input;
    var self = this;
    var active = false, originX = 0, originY = 0, touchId = null;
    var maxR = 42;

    function apply(clientX, clientY) {
      var dx = clientX - originX, dy = clientY - originY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxR) { dx = (dx / dist) * maxR; dy = (dy / dist) * maxR; }
      self.joyKnob.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      Input.setVirtualAxis(dx / maxR, -dy / maxR);
    }
    function reset() {
      active = false; touchId = null;
      self.joyKnob.style.transform = 'translate(0,0)';
      Input.setVirtualAxis(0, 0);
    }

    this.joyBase.addEventListener('touchstart', function (e) {
      e.stopPropagation(); e.preventDefault();
      if (active) return;
      var t = e.changedTouches[0];
      active = true; touchId = t.identifier;
      var rect = self.joyBase.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
      apply(t.clientX, t.clientY);
    }, { passive: false });

    this.joyBase.addEventListener('touchmove', function (e) {
      e.stopPropagation(); e.preventDefault();
      if (!active) return;
      for (var i = 0; i < e.changedTouches.length; i++) {
        var t = e.changedTouches[i];
        if (t.identifier === touchId) { apply(t.clientX, t.clientY); break; }
      }
    }, { passive: false });

    function onEnd(e) {
      e.stopPropagation();
      if (!active) return;
      for (var i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchId) { reset(); break; }
      }
    }
    this.joyBase.addEventListener('touchend', onEnd);
    this.joyBase.addEventListener('touchcancel', onEnd);
  };

  TouchControls.prototype._wireButtons = function () {
    var Input = AK.core.Input;
    var codeFor = { run: 'ShiftLeft', crouch: 'ControlLeft' };

    this.actionButtons.forEach(function (btn) {
      var code = codeFor[btn.getAttribute('data-touch')];
      btn.addEventListener('touchstart', function (e) {
        e.stopPropagation(); e.preventDefault();
        Input.setVirtualKey(code, true);
        btn.classList.add('active');
      }, { passive: false });
      function release(e) {
        e.stopPropagation();
        Input.setVirtualKey(code, false);
        btn.classList.remove('active');
      }
      btn.addEventListener('touchend', release);
      btn.addEventListener('touchcancel', release);
    });

    var bus = this.bus;
    this.pauseBtn.addEventListener('touchstart', function (e) {
      e.stopPropagation(); e.preventDefault();
      bus.emit('togglePauseRequest');
    }, { passive: false });
  };

  AK.core.TouchControls = TouchControls;
})();
