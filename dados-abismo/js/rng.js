/* ========================================================================
   DADOS DO ABISMO — RNG semeado (determinismo total).
   Mesma seed + mesmas ações = mesmo resultado (requisito §0.3).
   ===================================================================== */
export function hashStr(s){ let h=2166136261>>>0;
  for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }

export function makeRNG(seed){
  let s = (typeof seed==='string' ? hashStr(seed) : (seed>>>0)) || 1;
  const r = ()=>{ s = (s + 0x6D2B79F5)|0;
    let t = Math.imul(s ^ (s>>>15), 1|s);
    t = (t + Math.imul(t ^ (t>>>7), 61|t)) ^ t;
    return ((t ^ (t>>>14))>>>0) / 4294967296; };
  r.int    = n => Math.floor(r()*n);
  r.range  = (a,b) => a + Math.floor(r()*(b-a+1));
  r.pick   = a => a[Math.floor(r()*a.length)];
  r.chance = p => r() < p;
  r.shuffle= a => { const b=a.slice(); for(let i=b.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); const t=b[i]; b[i]=b[j]; b[j]=t; } return b; };
  r.pickWeighted = (arr, wf)=>{ let tot=0; for(const x of arr) tot+=wf(x);
    let k=r()*tot; for(const x of arr){ k-=wf(x); if(k<=0) return x; } return arr[arr.length-1]; };
  r.state  = ()=> s>>>0;
  r.setState = v => { s = v|0; };
  r.seed   = seed;
  return r;
}
