// Input: keyboard (physical key codes) + mouse-drag look + touch (joystick,
// drag-look zone, shoot/reload/dodge buttons) + gamepad, unified into one
// command snapshot read once per simulation step. Built entirely in JS so
// index.html stays a thin shell.
export class Input {
  constructor() {
    this.keys = new Set();
    this.justPressed = new Set();
    this.yawDelta = 0;
    this.shootHeld = false;
    this._dragging = false;
    this._lastX = 0; this._lastY = 0;
    this._touchMoveId = null; this._touchLookId = null;
    this._touchAxis = { x: 0, y: 0 };
    this._touchButtons = { shoot: false, reload: false, dodge: false };
    this._buildTouchUI();
    this._bindKeyboardMouse();
  }

  _bindKeyboardMouse() {
    addEventListener("keydown", e => {
      if (!this.keys.has(e.code)) this.justPressed.add(e.code);
      this.keys.add(e.code);
    });
    addEventListener("keyup", e => this.keys.delete(e.code));
    addEventListener("blur", () => { this.keys.clear(); this.shootHeld = false; });

    addEventListener("mousedown", e => {
      if (e.button === 0) this.shootHeld = true;
      this._dragging = true; this._lastX = e.clientX; this._lastY = e.clientY;
    });
    addEventListener("mouseup", e => { if (e.button === 0) this.shootHeld = false; this._dragging = false; });
    addEventListener("mousemove", e => {
      if (!this._dragging) return;
      this.yawDelta += (e.clientX - this._lastX);
      this._lastX = e.clientX; this._lastY = e.clientY;
    });
    addEventListener("contextmenu", e => e.preventDefault());
  }

  _buildTouchUI() {
    const isTouch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    document.body.classList.add("touch-device");

    const joy = document.createElement("div");
    joy.className = "vf-joystick vf-touch";
    joy.innerHTML = '<div class="vf-joy-base"><div class="vf-joy-knob"></div></div>';
    document.body.appendChild(joy);
    const base = joy.querySelector(".vf-joy-base"), knob = joy.querySelector(".vf-joy-knob");

    const actions = document.createElement("div");
    actions.className = "vf-actions vf-touch";
    actions.innerHTML =
      '<button class="vf-btn vf-btn-reload" data-act="reload" type="button">R</button>' +
      '<button class="vf-btn vf-btn-dodge" data-act="dodge" type="button">ESQUIVA</button>' +
      '<button class="vf-btn vf-btn-shoot" data-act="shoot" type="button">ATIRAR</button>';
    document.body.appendChild(actions);

    let joyActive = false, ox = 0, oy = 0;
    const maxR = 42;
    const applyJoy = (cx, cy) => {
      let dx = cx - ox, dy = cy - oy;
      const d = Math.hypot(dx, dy);
      if (d > maxR) { dx = dx / d * maxR; dy = dy / d * maxR; }
      knob.style.transform = `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`;
      this._touchAxis.x = dx / maxR; this._touchAxis.y = dy / maxR;
    };
    base.addEventListener("touchstart", e => {
      e.preventDefault();
      const t = e.changedTouches[0];
      this._touchMoveId = t.identifier;
      const r = base.getBoundingClientRect();
      ox = r.left + r.width / 2; oy = r.top + r.height / 2;
      joyActive = true; applyJoy(t.clientX, t.clientY);
    }, { passive: false });
    base.addEventListener("touchmove", e => {
      e.preventDefault();
      if (!joyActive) return;
      for (const t of e.changedTouches) if (t.identifier === this._touchMoveId) applyJoy(t.clientX, t.clientY);
    }, { passive: false });
    const endJoy = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._touchMoveId) {
          joyActive = false; this._touchMoveId = null;
          knob.style.transform = "translate(0,0)";
          this._touchAxis.x = 0; this._touchAxis.y = 0;
        }
      }
    };
    base.addEventListener("touchend", endJoy);
    base.addEventListener("touchcancel", endJoy);

    for (const btn of actions.querySelectorAll(".vf-btn")) {
      const act = btn.getAttribute("data-act");
      btn.addEventListener("touchstart", e => {
        e.preventDefault(); e.stopPropagation();
        this._touchButtons[act] = true; btn.classList.add("active");
      }, { passive: false });
      const release = e => {
        e.stopPropagation();
        this._touchButtons[act] = false; btn.classList.remove("active");
      };
      btn.addEventListener("touchend", release);
      btn.addEventListener("touchcancel", release);
    }

    // drag-to-look zone: the rest of the screen (excluding joystick/buttons, which stopPropagation)
    addEventListener("touchstart", e => {
      if (this._touchLookId !== null) return;
      const t = e.changedTouches[0];
      this._touchLookId = t.identifier;
      this._lastX = t.clientX;
    }, { passive: true });
    addEventListener("touchmove", e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._touchLookId) {
          this.yawDelta += (t.clientX - this._lastX);
          this._lastX = t.clientX;
        }
      }
    }, { passive: true });
    const endLook = e => {
      for (const t of e.changedTouches) if (t.identifier === this._touchLookId) this._touchLookId = null;
    };
    addEventListener("touchend", endLook);
    addEventListener("touchcancel", endLook);
  }

  _gamepadCommands() {
    const out = { x: 0, y: 0, yaw: 0, shoot: false, reload: false, dodge: false };
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const gp of pads) {
      if (!gp) continue;
      out.x += Math.abs(gp.axes[0]) > 0.15 ? gp.axes[0] : 0;
      out.y += Math.abs(gp.axes[1]) > 0.15 ? gp.axes[1] : 0;
      out.yaw += Math.abs(gp.axes[2]) > 0.2 ? gp.axes[2] * 45 : 0;
      if (gp.buttons[7]?.pressed || gp.buttons[0]?.pressed) out.shoot = true;
      if (gp.buttons[2]?.pressed) out.reload = true;
      if (gp.buttons[1]?.pressed) out.dodge = true;
    }
    return out;
  }

  // Snapshot consumed once per fixed-step tick; clears one-shot/delta state.
  poll() {
    const pad = this._gamepadCommands();
    let mx = (this.keys.has("KeyD") || this.keys.has("ArrowRight") ? 1 : 0) -
      (this.keys.has("KeyA") || this.keys.has("ArrowLeft") ? 1 : 0);
    let my = (this.keys.has("KeyS") || this.keys.has("ArrowDown") ? 1 : 0) -
      (this.keys.has("KeyW") || this.keys.has("ArrowUp") ? 1 : 0);
    if (Math.abs(this._touchAxis.x) > 0.1 || Math.abs(this._touchAxis.y) > 0.1) {
      mx = this._touchAxis.x; my = this._touchAxis.y;
    } else if (pad.x || pad.y) { mx = pad.x; my = pad.y; }

    const cmd = {
      moveX: mx, moveY: my,
      yawDelta: (this.yawDelta * 0.006) + (pad.yaw * 0.02),
      shoot: this.shootHeld || this._touchButtons.shoot || pad.shoot,
      reloadPressed: this.justPressed.has("KeyR") || this._consumeTouchPress("reload") || pad.reload,
      dodgePressed: this.justPressed.has("Space") || this._consumeTouchPress("dodge") || pad.dodge
    };
    this.yawDelta = 0;
    this.justPressed.clear();
    return cmd;
  }

  _consumeTouchPress(act) {
    if (!this._touchButtons[act]) return false;
    if (!this._touchButtonsConsumed) this._touchButtonsConsumed = {};
    if (this._touchButtonsConsumed[act]) return false;
    this._touchButtonsConsumed[act] = true;
    setTimeout(() => { this._touchButtonsConsumed[act] = false; }, 250);
    return true;
  }
}
