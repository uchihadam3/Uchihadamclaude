// Camera: segue o alvo com amortecimento, lookahead na direção do movimento,
// trava nos limites da sala e screenshake com decaimento (trauma^2, direção
// pseudo-aleatória — o padrão que faz o tremor parecer orgânico e não vibração).
(function () {
  function Camera() {
    this.x = 0; this.y = 0;
    this._trauma = 0;
    this._shakeT = 0;
    this.lookahead = 0;
    this.bounds = null; // {minX,minY,maxX,maxY} em px do mundo
    this._init = false;
  }

  Camera.prototype.setBounds = function (b) { this.bounds = b; };

  Camera.prototype.shake = function (amount) {
    this._trauma = Math.min(1, this._trauma + amount);
  };

  Camera.prototype.update = function (dt, target, viewW, viewH, facing) {
    var lookTarget = facing * 42;
    this.lookahead += (lookTarget - this.lookahead) * Math.min(1, dt * 2.2);

    var tx = target.x + this.lookahead - viewW / 2;
    var ty = target.y - viewH * 0.58;

    if (!this._init) { this.x = tx; this.y = ty; this._init = true; }
    var k = 1 - Math.exp(-dt * 7);
    this.x += (tx - this.x) * k;
    this.y += (ty - this.y) * (k * 0.85);

    if (this.bounds) {
      this.x = Math.max(this.bounds.minX, Math.min(this.x, this.bounds.maxX - viewW));
      this.y = Math.max(this.bounds.minY, Math.min(this.y, this.bounds.maxY - viewH));
    }

    this._trauma = Math.max(0, this._trauma - dt * 1.6);
    this._shakeT += dt * 90;
  };

  Camera.prototype.renderOffset = function () {
    var s = this._trauma * this._trauma;
    if (s < 0.001) return { x: Math.round(this.x), y: Math.round(this.y) };
    var mag = s * 9;
    return {
      x: Math.round(this.x + Math.sin(this._shakeT * 1.3) * mag),
      y: Math.round(this.y + Math.cos(this._shakeT * 1.7) * mag * 0.7)
    };
  };

  LK.core.Camera = Camera;
})();
