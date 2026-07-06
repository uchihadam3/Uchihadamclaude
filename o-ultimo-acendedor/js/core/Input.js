// Input: teclado (códigos físicos), gamepad e (fase mobile) botões touch,
// unificados em um snapshot de comandos lido uma vez por passo de simulação.
(function () {
  var keys = {};
  var virtualKeys = {};
  var justPressed = {};

  window.addEventListener('keydown', function (e) {
    if (!keys[e.code]) justPressed[e.code] = true;
    keys[e.code] = true;
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) >= 0) e.preventDefault();
  });
  window.addEventListener('keyup', function (e) { keys[e.code] = false; });
  window.addEventListener('blur', function () { keys = {}; });

  function padState() {
    var out = { x: 0, jump: false, attack: false, dash: false, up: false, down: false };
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) {
      var gp = pads[i];
      if (!gp) continue;
      if (Math.abs(gp.axes[0]) > 0.25) out.x += gp.axes[0];
      if (gp.buttons[14] && gp.buttons[14].pressed) out.x -= 1;
      if (gp.buttons[15] && gp.buttons[15].pressed) out.x += 1;
      if (gp.buttons[12] && gp.buttons[12].pressed) out.up = true;
      if (gp.buttons[13] && gp.buttons[13].pressed) out.down = true;
      if (gp.axes[1] < -0.4) out.up = true;
      if (gp.axes[1] > 0.4) out.down = true;
      if (gp.buttons[0] && gp.buttons[0].pressed) out.jump = true;
      if (gp.buttons[2] && gp.buttons[2].pressed) out.attack = true;
      if (gp.buttons[5] && gp.buttons[5].pressed) out.dash = true;
      if (gp.buttons[1] && gp.buttons[1].pressed) out.dash = true;
    }
    return out;
  }

  var padPrev = { jump: false, attack: false, dash: false };

  var Input = {
    isDown: function (code) { return !!keys[code] || !!virtualKeys[code]; },
    setVirtualKey: function (code, down) {
      if (down && !virtualKeys[code]) justPressed[code] = true;
      virtualKeys[code] = down;
    },
    // Snapshot por tick; limpa estado one-shot.
    poll: function () {
      var pad = padState();
      var x = (this.isDown('KeyD') || this.isDown('ArrowRight') ? 1 : 0) -
        (this.isDown('KeyA') || this.isDown('ArrowLeft') ? 1 : 0);
      if (x === 0 && Math.abs(pad.x) > 0.25) x = Math.max(-1, Math.min(1, pad.x));

      var cmd = {
        x: x,
        up: this.isDown('KeyW') || this.isDown('ArrowUp') || pad.up,
        down: this.isDown('KeyS') || this.isDown('ArrowDown') || pad.down,
        jumpHeld: this.isDown('Space') || this.isDown('KeyZ') || pad.jump,
        jumpPressed: !!justPressed['Space'] || !!justPressed['KeyZ'] || (pad.jump && !padPrev.jump),
        attackPressed: !!justPressed['KeyJ'] || !!justPressed['KeyX'] || (pad.attack && !padPrev.attack),
        dashPressed: !!justPressed['KeyK'] || !!justPressed['ShiftLeft'] || !!justPressed['KeyC'] || (pad.dash && !padPrev.dash),
        interactPressed: !!justPressed['KeyE'] || !!justPressed['ArrowUp2'],
        pausePressed: !!justPressed['Escape']
      };
      padPrev.jump = pad.jump; padPrev.attack = pad.attack; padPrev.dash = pad.dash;
      justPressed = {};
      return cmd;
    }
  };

  LK.core.Input = Input;
})();
