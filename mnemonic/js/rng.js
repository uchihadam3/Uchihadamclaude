/* ========================================================================
   RNG SEMEADO — a mesma semente devolve a mesma run, sempre.

   É o que permite o MODO DIÁRIO (todo mundo joga o mesmo tabuleiro, o mesmo
   mapa e o mesmo chefe) e é o que permite testar: um teste que sorteia de
   verdade não falha do mesmo jeito duas vezes e não serve para nada.
   ===================================================================== */
export function mulberry32(a){
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function semeador(txt){
  let h = 2166136261;
  for(const c of String(txt)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}
export function makeRNG(seed){
  const f = mulberry32(typeof seed==='number' ? seed : semeador(seed));
  const r = () => f();
  r.int    = (a,b) => a + Math.floor(f()*(b-a+1));
  r.pick   = arr   => arr[Math.floor(f()*arr.length)];
  r.chance = p     => f() < p;
  /* embaralha no lugar (Fisher-Yates) — sorteio de posição do tabuleiro */
  r.shuffle = arr => { for(let i=arr.length-1;i>0;i--){ const j=Math.floor(f()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; };
  /* n itens distintos, sem repetir */
  r.sample = (arr,n) => r.shuffle([...arr]).slice(0, Math.min(n, arr.length));
  return r;
}
