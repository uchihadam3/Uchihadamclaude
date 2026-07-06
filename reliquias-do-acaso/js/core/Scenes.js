// Scenes: pilha de cenas. Cada cena: enter(params), update(dt, events),
// render(ctx, w, h), exit(). push/replace/pop com transição de fade.
(function () {
  var stack = [];
  var fade = { t: 0, dir: 0, next: null, mode: 'replace' };

  var Scenes = {
    get current() { return stack[stack.length - 1] || null; },
    replace: function (scene, params) {
      fade.next = { scene: scene, params: params };
      fade.mode = 'replace';
      fade.dir = 1;
    },
    push: function (scene, params) {
      fade.next = { scene: scene, params: params };
      fade.mode = 'push';
      fade.dir = 1;
    },
    pop: function () {
      fade.next = { pop: true };
      fade.mode = 'pop';
      fade.dir = 1;
    },
    _apply: function () {
      var n = fade.next;
      fade.next = null;
      if (!n) return;
      if (n.pop) {
        var old = stack.pop();
        if (old && old.exit) old.exit();
        var cur = this.current;
        if (cur && cur.resume) cur.resume();
      } else {
        if (fade.mode === 'replace') {
          while (stack.length) {
            var o = stack.pop();
            if (o.exit) o.exit();
          }
        }
        stack.push(n.scene);
        if (n.scene.enter) n.scene.enter(n.params || {});
      }
      RA.ui.currentScene = this.current;
    },
    update: function (dt, events) {
      if (fade.dir !== 0) {
        fade.t += dt * 5 * (RA.core.Save.get().settings.animSpeed || 1);
        if (fade.dir === 1 && fade.t >= 1) {
          this._apply();
          fade.dir = -1;
        } else if (fade.dir === -1 && fade.t <= 0) {
          fade.dir = 0;
          fade.t = 0;
        }
        if (fade.dir === -1) fade.t -= dt * 10;
        // durante fade, não repassa eventos
        events.taps.length = 0; events.releases.length = 0; events.holds.length = 0;
      }
      var cur = this.current;
      if (cur && cur.update) cur.update(dt, events);
    },
    renderFade: function (ctx, w, h) {
      if (fade.t > 0) {
        ctx.fillStyle = 'rgba(6,4,10,' + Math.min(1, fade.t) + ')';
        ctx.fillRect(0, 0, w, h);
      }
    },
    isTransitioning: function () { return fade.dir !== 0; }
  };

  RA.core.Scenes = Scenes;
  RA.ui.currentScene = null;
})();
