// Input: ponteiro unificado (mouse+touch) em coordenadas internas do canvas,
// com gestos: tap, hold (tooltip), drag & drop (dado -> alvo).
// A cena registra zonas interativas por frame; o input resolve hits.
(function () {
  function Input(canvas, dispState) {
    this.canvas = canvas;
    this.disp = dispState;
    this.pointer = { x: 0, y: 0, down: false, dragging: null, holdT: 0, downAt: 0, startX: 0, startY: 0 };
    this.taps = [];        // {x,y}
    this.releases = [];    // {x,y, drag}
    this.holds = [];       // {x,y} hold disparado
    this._holdFired = false;
    var self = this;

    function toLocal(e) {
      var r = canvas.getBoundingClientRect();
      var cx = (e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
      var cy = (e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0));
      return { x: (cx - r.left) / self.disp.scale, y: (cy - r.top) / self.disp.scale };
    }

    canvas.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      var p = toLocal(e);
      self.pointer.x = p.x; self.pointer.y = p.y;
      self.pointer.down = true;
      self.pointer.downAt = performance.now();
      self.pointer.startX = p.x; self.pointer.startY = p.y;
      self._holdFired = false;
    });
    canvas.addEventListener('pointermove', function (e) {
      var p = toLocal(e);
      self.pointer.x = p.x; self.pointer.y = p.y;
    });
    canvas.addEventListener('pointerup', function (e) {
      var p = toLocal(e);
      self.pointer.x = p.x; self.pointer.y = p.y;
      var dt = performance.now() - self.pointer.downAt;
      var dist = Math.hypot(p.x - self.pointer.startX, p.y - self.pointer.startY);
      if (self.pointer.dragging) {
        self.releases.push({ x: p.x, y: p.y, drag: self.pointer.dragging });
        self.pointer.dragging = null;
      } else if (dt < 400 && dist < 8 && !self._holdFired) {
        self.taps.push({ x: p.x, y: p.y });
      }
      self.pointer.down = false;
    });
    canvas.addEventListener('pointercancel', function () {
      self.pointer.down = false;
      self.pointer.dragging = null;
    });
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }

  // chamada por frame: dispara hold; retorna e limpa eventos
  Input.prototype.frame = function (dt) {
    var p = this.pointer;
    if (p.down && !p.dragging && !this._holdFired) {
      var heldFor = performance.now() - p.downAt;
      var dist = Math.hypot(p.x - p.startX, p.y - p.startY);
      if (heldFor > 420 && dist < 8) {
        this._holdFired = true;
        this.holds.push({ x: p.x, y: p.y });
      }
    }
    var out = { taps: this.taps, releases: this.releases, holds: this.holds };
    this.taps = []; this.releases = []; this.holds = [];
    return out;
  };

  Input.prototype.startDrag = function (payload) {
    this.pointer.dragging = payload;
  };

  Input.prototype.dragDistance = function () {
    var p = this.pointer;
    return Math.hypot(p.x - p.startX, p.y - p.startY);
  };

  RA.core.Input = Input;
})();
