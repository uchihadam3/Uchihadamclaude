/* =========================================================================
   PETECA LEGENDS — util.js
   Funções utilitárias compartilhadas (sem dependência de DOM).
   ========================================================================= */
(function (root) {
  'use strict';

  const U = {};

  /* ---- números ---- */
  U.clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  U.lerp = (a, b, t) => a + (b - a) * t;
  U.easeOut = (t) => 1 - (1 - t) * (1 - t);
  U.easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  U.dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

  /* ---- RNG com seed opcional (mulberry32) ---- */
  U.makeRng = function (seed) {
    let s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  U.rand = (rng, a, b) => a + rng() * (b - a);
  U.randInt = (rng, a, b) => Math.floor(a + rng() * (b - a + 1));
  U.pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

  /** Escolha ponderada: recebe [{w: peso, ...}], devolve o item. */
  U.weightedPick = function (rng, items) {
    let total = 0;
    for (const it of items) total += Math.max(0, it.w);
    if (total <= 0) return items[0];
    let r = rng() * total;
    for (const it of items) {
      r -= Math.max(0, it.w);
      if (r <= 0) return it;
    }
    return items[items.length - 1];
  };

  /** Chance [0..1] com rng. */
  U.chance = (rng, p) => rng() < p;

  /* ---- formatação ---- */
  U.money = (v) => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
  U.pct = (v) => Math.round(v * 100) + '%';

  /* ---- misc ---- */
  U.deepClone = (o) => JSON.parse(JSON.stringify(o));
  U.el = null; // preenchido em main.js (DOM helper)

  root.U = U;
})(typeof window !== 'undefined' ? window : globalThis);
