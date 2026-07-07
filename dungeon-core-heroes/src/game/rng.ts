// ============ RNG determinístico (mulberry32 + hash de string) ============

export function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mix(a: number, b: number): number {
  let h = (a ^ 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (b >>> 0), 0x85ebca6b) >>> 0;
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35) >>> 0;
  h ^= h >>> 16;
  return h >>> 0;
}

export interface Rng {
  next(): number;                     // [0,1)
  int(maxExcl: number): number;       // [0,maxExcl)
  range(a: number, b: number): number;// [a,b)
  pick<T>(arr: T[]): T;
  chance(p: number): boolean;
  shuffle<T>(arr: T[]): T[];
  weighted<T>(arr: T[], w: (x: T) => number): T;
  fork(salt: number): Rng;
  state(): number;
}

export function makeRng(seed: number): Rng {
  let s = (seed >>> 0) || 1;
  const next = (): number => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rng: Rng = {
    next,
    int: (m) => Math.floor(next() * m),
    range: (a, b) => a + next() * (b - a),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p,
    shuffle: (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    weighted: (arr, w) => {
      let total = 0;
      const weights = arr.map((x) => { const v = Math.max(0, w(x)); total += v; return v; });
      if (total <= 0) return arr[Math.floor(next() * arr.length)];
      let r = next() * total;
      for (let i = 0; i < arr.length; i++) { r -= weights[i]; if (r <= 0) return arr[i]; }
      return arr[arr.length - 1];
    },
    fork: (salt) => makeRng(mix(s, salt)),
    state: () => s >>> 0,
  };
  return rng;
}
