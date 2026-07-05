// Canvas: renders at a fixed low internal resolution (256x224, classic SNES
// framing) and scales it up with crisp nearest-neighbour pixels via CSS, at
// the largest integer factor that fits the window (letterboxed otherwise).
(function () {
  function setup(canvasEl) {
    var cfg = RPG.config;
    canvasEl.width = cfg.INTERNAL_W;
    canvasEl.height = cfg.INTERNAL_H;
    var ctx = canvasEl.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    function resize() {
      var scale = Math.max(1, Math.floor(Math.min(
        window.innerWidth / cfg.INTERNAL_W,
        window.innerHeight / cfg.INTERNAL_H
      )));
      canvasEl.style.width = (cfg.INTERNAL_W * scale) + 'px';
      canvasEl.style.height = (cfg.INTERNAL_H * scale) + 'px';
    }
    window.addEventListener('resize', resize);
    resize();

    return ctx;
  }

  RPG.core.Canvas = { setup: setup };
})();
