// Display: canvas com resolução interna adaptativa (preenche a tela, pixels
// nítidos, escala inteira). Detecta orientação para o layout de combate.
(function () {
  function setup(canvasEl) {
    var ctx = canvasEl.getContext('2d');
    var state = { w: 640, h: 360, scale: 2, portrait: false };

    function resize() {
      var winW = window.innerWidth, winH = window.innerHeight;
      state.portrait = winH > winW;
      // alvo: menor dimensão interna ~ 320-420px
      var minDim = Math.min(winW, winH);
      var scale = Math.max(1, Math.min(6, Math.round(minDim / 235)));
      state.w = Math.ceil(winW / scale);
      state.h = Math.ceil(winH / scale);
      state.scale = scale;
      // backing store 2x: formas procedurais (dados, fundos, painéis, fx)
      // ganham o dobro de definição sem mudar o layout lógico
      canvasEl.width = state.w * 2;
      canvasEl.height = state.h * 2;
      canvasEl.style.width = (state.w * scale) + 'px';
      canvasEl.style.height = (state.h * scale) + 'px';
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      ctx.imageSmoothingEnabled = false;
      if (RA.ui.currentScene && RA.ui.currentScene.onResize) RA.ui.currentScene.onResize(state);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    resize();

    return { ctx: ctx, state: state, canvas: canvasEl };
  }

  RA.core.Display = { setup: setup };
})();
