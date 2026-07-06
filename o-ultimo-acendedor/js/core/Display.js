// Display: canvas com resolução interna adaptativa (preenche a tela inteira
// em qualquer aspecto, sem letterbox) escalado com pixels nítidos.
(function () {
  function setup(canvasEl) {
    var cfg = LK.config;
    var ctx = canvasEl.getContext('2d');
    var state = { w: 640, h: 360, scale: 2 };

    function resize() {
      var winW = window.innerWidth, winH = window.innerHeight;
      var scale = Math.max(1, Math.min(cfg.MAX_SCALE, Math.round(winH / cfg.INTERNAL_H_TARGET)));
      state.w = Math.ceil(winW / scale);
      state.h = Math.ceil(winH / scale);
      state.scale = scale;
      canvasEl.width = state.w;
      canvasEl.height = state.h;
      canvasEl.style.width = (state.w * scale) + 'px';
      canvasEl.style.height = (state.h * scale) + 'px';
      ctx.imageSmoothingEnabled = false;
    }
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    resize();

    return { ctx: ctx, state: state };
  }

  LK.core.Display = { setup: setup };
})();
