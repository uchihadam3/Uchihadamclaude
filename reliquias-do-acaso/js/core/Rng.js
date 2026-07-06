// RNG semeado (mulberry32) — determinismo para Desafio Diário e replays.
(function () {
  function Rng(seed) {
    this.s = (seed >>> 0) || 1;
  }
  Rng.prototype.next = function () {
    this.s += 0x6D2B79F5;
    var r = Math.imul(this.s ^ (this.s >>> 15), 1 | this.s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  // int(n) => [0,n)  |  int(a,b) => [a,b] inclusivo
  Rng.prototype.int = function (a, b) {
    if (b === undefined) return Math.floor(this.next() * a);
    return a + Math.floor(this.next() * (b - a + 1));
  };
  Rng.prototype.range = function (a, b) { return a + Math.floor(this.next() * (b - a + 1)); };
  Rng.prototype.pick = function (arr) { return arr[this.int(arr.length)]; };
  // embaralha in-place e retorna o próprio array
  Rng.prototype.shuffle = function (a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = this.int(i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  Rng.prototype.chance = function (p) { return this.next() < p; };

  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  RA.core.Rng = Rng;
  RA.core.hashStr = hashStr;
  // seed diária: AAAAMMDD
  RA.core.dailySeed = function () {
    var d = new Date();
    return hashStr('daily-' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
  };
})();
