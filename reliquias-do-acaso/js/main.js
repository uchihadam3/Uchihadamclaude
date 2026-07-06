// main: boot do jogo — display adaptativo, input, loop com timestep fixo,
// desbloqueio de áudio no primeiro gesto e cena inicial.
(function () {
  var canvas = document.getElementById('game');
  var disp = RA.core.Display.setup(canvas);
  var input = new RA.core.Input(canvas, disp.state);
  RA.ui.disp = disp.state;
  RA.ui.input = input;

  // primeiro gesto: desbloqueia o áudio (política de autoplay)
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (evName) {
    window.addEventListener(evName, function once() {
      RA.audio.unlock();
      RA.audio.applyVolumes();
    }, { once: false, passive: true });
  });

  // cena inicial
  RA.core.Scenes.replace(new RA.ui.MainMenuScene());
  RA.core.Scenes._apply();

  var last = performance.now();
  var acc = 0;
  var STEP = 1 / 60;

  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    var events = input.frame(dt);
    RA.core.Scenes.update(dt, events);

    var ctx = disp.ctx, w = disp.state.w, h = disp.state.h;
    ctx.fillStyle = '#0a080e';
    ctx.fillRect(0, 0, w, h);
    var cur = RA.core.Scenes.current;
    if (cur && cur.render) cur.render(ctx, w, h);
    RA.core.Scenes.renderFade(ctx, w, h);
  }
  requestAnimationFrame(frame);

  // hooks de depuração para testes automatizados
  window.__RA_DEBUG = {
    get scene() { var c = RA.core.Scenes.current; return c ? c.constructor.name : null; },
    get run() { return RA.game.run; },
    get combat() { var c = RA.core.Scenes.current; return c && c.combat ? c.combat : null; },
    profile: function () { return RA.core.Save.get(); },
    scenes: RA.core.Scenes,
    tap: function (x, y) { input.taps.push({ x: x, y: y }); },
    release: function (x, y, drag) { input.releases.push({ x: x, y: y, drag: drag }); },
    startRun: function (opts) { return RA.game.Run.start(opts); }
  };
})();
