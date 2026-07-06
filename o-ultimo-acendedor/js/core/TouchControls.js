// TouchControls: controles mobile do Acendedor.
//   Esquerda: joystick (x = andar; y = mirar golpe pra cima/baixo).
//   Direita: PULO / GOLPE / DASH em arco, sob o polegar.
// Tudo alimenta os mesmos códigos virtuais que o teclado usa, então o
// Input.poll() não distingue a origem. Feedback em três camadas:
//   visual (escala+brilho no toque), tátil (vibração curta no aperto) e
//   de jogo (pulsos hápticos em acerto/dano, expostos via LK.core.Haptics).
// Dimensões em unidades relativas à tela (vmin) — responsivo por construção.
(function () {
  function isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  }

  var canVibrate = typeof navigator !== 'undefined' && !!navigator.vibrate;

  LK.core.Haptics = {
    enabled: isTouchDevice() && canVibrate,
    pulse: function (pattern) {
      if (this.enabled) { try { navigator.vibrate(pattern); } catch (e) { } }
    }
  };

  function TouchControls() {
    this.enabled = isTouchDevice();
    if (!this.enabled) return;
    document.body.classList.add('touch-device');
    this._buildJoystick();
    this._buildButtons();
  }

  TouchControls.prototype._buildJoystick = function () {
    var Input = LK.core.Input;
    var wrap = document.createElement('div');
    wrap.className = 'lk-joy lk-touch';
    wrap.innerHTML = '<div class="lk-joy-base"><div class="lk-joy-knob"></div></div>';
    document.body.appendChild(wrap);
    var base = wrap.querySelector('.lk-joy-base');
    var knob = wrap.querySelector('.lk-joy-knob');

    var active = false, touchId = null, ox = 0, oy = 0;
    var dirState = { left: false, right: false, up: false, down: false };

    function setDir(name, code, on) {
      if (dirState[name] === on) return;
      dirState[name] = on;
      Input.setVirtualKey(code, on);
    }

    function apply(cx, cy) {
      var rect = base.getBoundingClientRect();
      var maxR = rect.width * 0.38;
      var dx = cx - ox, dy = cy - oy;
      var d = Math.hypot(dx, dy);
      if (d > maxR) { dx = dx / d * maxR; dy = dy / d * maxR; }
      knob.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      var nx = dx / maxR, ny = dy / maxR;
      setDir('left', 'ArrowLeft', nx < -0.32);
      setDir('right', 'ArrowRight', nx > 0.32);
      setDir('up', 'ArrowUp', ny < -0.45);
      setDir('down', 'ArrowDown', ny > 0.45);
    }

    function reset() {
      active = false; touchId = null;
      knob.style.transform = 'translate(0,0)';
      base.classList.remove('active');
      setDir('left', 'ArrowLeft', false);
      setDir('right', 'ArrowRight', false);
      setDir('up', 'ArrowUp', false);
      setDir('down', 'ArrowDown', false);
    }

    base.addEventListener('touchstart', function (e) {
      e.preventDefault(); e.stopPropagation();
      if (active) return;
      var t = e.changedTouches[0];
      active = true; touchId = t.identifier;
      var rect = base.getBoundingClientRect();
      ox = rect.left + rect.width / 2;
      oy = rect.top + rect.height / 2;
      base.classList.add('active');
      LK.core.Haptics.pulse(8);
      apply(t.clientX, t.clientY);
    }, { passive: false });

    base.addEventListener('touchmove', function (e) {
      e.preventDefault(); e.stopPropagation();
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
    base.addEventListener('touchend', onEnd);
    base.addEventListener('touchcancel', onEnd);
  };

  TouchControls.prototype._buildButtons = function () {
    var Input = LK.core.Input;
    var wrap = document.createElement('div');
    wrap.className = 'lk-actions lk-touch';
    wrap.innerHTML =
      '<button class="lk-btn lk-btn-dash" data-code="KeyK" type="button">DASH</button>' +
      '<button class="lk-btn lk-btn-attack" data-code="KeyJ" type="button">GOLPE</button>' +
      '<button class="lk-btn lk-btn-jump" data-code="Space" type="button">PULO</button>';
    document.body.appendChild(wrap);

    wrap.querySelectorAll('.lk-btn').forEach(function (btn) {
      var code = btn.getAttribute('data-code');
      btn.addEventListener('touchstart', function (e) {
        e.preventDefault(); e.stopPropagation();
        Input.setVirtualKey(code, true);
        btn.classList.add('active');
        LK.core.Haptics.pulse(12);
      }, { passive: false });
      function release(e) {
        e.stopPropagation();
        Input.setVirtualKey(code, false);
        btn.classList.remove('active');
      }
      btn.addEventListener('touchend', release);
      btn.addEventListener('touchcancel', release);
    });
  };

  LK.core.TouchControls = TouchControls;
})();
