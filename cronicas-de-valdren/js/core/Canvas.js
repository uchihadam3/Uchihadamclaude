// Canvas: renders at a low internal resolution scaled up with crisp
// nearest-neighbour pixels, but unlike a fixed 256x224 letterboxed into a
// black frame, the internal resolution itself is recomputed on every
// resize to match the device's actual aspect ratio - a tall phone screen
// sees more rows of the map (taller viewport), a wide desktop sees more
// columns, and the canvas always fills the screen edge to edge.
(function () {
  function setup(canvasEl) {
    var cfg = RPG.config;
    var ctx = canvasEl.getContext('2d');

    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      var scale = Math.max(1, Math.min(cfg.MAX_SCALE, Math.floor(
        Math.min(w, h) / (cfg.TILE * cfg.MIN_TILES_VISIBLE)
      )));
      var viewWTiles = Math.ceil(w / (cfg.TILE * scale));
      var viewHTiles = Math.ceil(h / (cfg.TILE * scale));

      cfg.INTERNAL_W = viewWTiles * cfg.TILE;
      cfg.INTERNAL_H = viewHTiles * cfg.TILE;
      canvasEl.width = cfg.INTERNAL_W;
      canvasEl.height = cfg.INTERNAL_H;
      ctx.imageSmoothingEnabled = false;

      canvasEl.style.width = (cfg.INTERNAL_W * scale) + 'px';
      canvasEl.style.height = (cfg.INTERNAL_H * scale) + 'px';
    }
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    resize();

    return ctx;
  }

  RPG.core.Canvas = { setup: setup };
})();
