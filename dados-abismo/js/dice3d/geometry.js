/* ========================================================================
   POLIEDROS DOS DADOS — vértices (colisão) + faces (normal + valor).
   Genérico: qualquer sólido convexo funciona na física e na leitura da face.
   ===================================================================== */
const norm = v => { const m=Math.hypot(v[0],v[1],v[2])||1; return [v[0]/m,v[1]/m,v[2]/m]; };
const centro = ps => { const c=[0,0,0]; for(const p of ps){c[0]+=p[0];c[1]+=p[1];c[2]+=p[2];} return c.map(x=>x/ps.length); };

/* d4 — tetraedro */
function tetra(){
  const V=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(norm);
  const F=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]];
  return build(V,F);
}
/* d6 — cubo */
function cubo(){
  const s=1/Math.sqrt(3), V=[];
  for(const x of [-s,s]) for(const y of [-s,s]) for(const z of [-s,s]) V.push([x,y,z]);
  const F=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]];
  return build(V,F);
}
/* d8 — octaedro */
function octa(){
  const V=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  const F=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]];
  return build(V,F);
}
/* d12 — dodecaedro */
function dodeca(){
  const p=(1+Math.sqrt(5))/2, i=1/p;
  const V=[];
  for(const x of [-1,1]) for(const y of [-1,1]) for(const z of [-1,1]) V.push([x,y,z]);
  for(const a of [-i,i]) for(const b of [-p,p]){ V.push([0,a,b]); V.push([a,b,0]); V.push([b,0,a]); }
  const Vn=V.map(norm);
  // faces por proximidade de normal (12 direções dos pentágonos)
  // normais das faces do dodecaedro = vértices do ICOSAEDRO: (0,±1,±φ) e cíclicas
  const dirs=[];
  for(const a of [-1,1]) for(const b of [-p,p]){ dirs.push([0,a,b]); dirs.push([a,b,0]); dirs.push([b,0,a]); }
  const F=dirs.map(d=>{ const nd=norm(d);
    const idx=Vn.map((v,k)=>({k,dot:v[0]*nd[0]+v[1]*nd[1]+v[2]*nd[2]}))
      .sort((x,y)=>y.dot-x.dot).slice(0,5).map(x=>x.k);
    return ordenar(idx, Vn, nd); });
  return build(Vn,F);
}
/* d10 — trapezoedro pentagonal (dado de 10 faces de verdade) */
function d10(){
  const V=[[0,1.15,0],[0,-1.15,0]];
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; const y=(i%2===0)?0.22:-0.22;
    V.push([Math.cos(a), y, Math.sin(a)]); }
  const Vn=V.map(norm);
  const F=[];
  for(let i=0;i<10;i++){
    const a=2+i, b=2+((i+1)%10), c=2+((i+2)%10);
    F.push(i%2===0 ? [0,a,b,c] : [1,c,b,a]);
  }
  return build(Vn,F);
}
function ordenar(idx, V, n){          // ordena vértices de uma face no sentido correto
  const pts=idx.map(k=>V[k]); const c=centro(pts);
  let u=[pts[0][0]-c[0],pts[0][1]-c[1],pts[0][2]-c[2]]; u=norm(u);
  const w=[n[1]*u[2]-n[2]*u[1], n[2]*u[0]-n[0]*u[2], n[0]*u[1]-n[1]*u[0]];
  return idx.map(k=>{ const p=V[k]; const d=[p[0]-c[0],p[1]-c[1],p[2]-c[2]];
    return {k, a:Math.atan2(d[0]*w[0]+d[1]*w[1]+d[2]*w[2], d[0]*u[0]+d[1]*u[1]+d[2]*u[2])}; })
    .sort((x,y)=>x.a-y.a).map(x=>x.k);
}
function build(V,F){
  const faces = F.map(idx=>{
    const pts = idx.map(k=>V[k]);
    const c = centro(pts);
    return { idx, normal: norm(c), centro:c };
  });
  return { verts:V, faces };
}
const CACHE={};
export function poliedro(tipo){
  if(CACHE[tipo]) return CACHE[tipo];
  const g = tipo==='d4'?tetra() : tipo==='d8'?octa() : tipo==='d10'?d10() : tipo==='d12'?dodeca() : cubo();
  // d4 lê a face de BAIXO (como dado real de 4 faces: o valor fica no topo do vértice)
  g.lerDeBaixo = (tipo==='d4');
  CACHE[tipo]=g; return g;
}
/* qual face está para CIMA (§11.1) — genérico via normais */
export function faceParaCima(tipo, quat){
  const g = poliedro(tipo);
  const alvo = g.lerDeBaixo ? [0,-1,0] : [0,1,0];
  let melhor=0, best=-Infinity;
  for(let i=0;i<g.faces.length;i++){
    const n = rot(quat, g.faces[i].normal);
    const d = n[0]*alvo[0]+n[1]*alvo[1]+n[2]*alvo[2];
    if(d>best){ best=d; melhor=i; }
  }
  return melhor;
}
export function rot(q, v){            // rotaciona vetor por quaternion [x,y,z,w]
  const [x,y,z,w]=q, [vx,vy,vz]=v;
  const tx=2*(y*vz-z*vy), ty=2*(z*vx-x*vz), tz=2*(x*vy-y*vx);
  return [ vx + w*tx + (y*tz-z*ty), vy + w*ty + (z*tx-x*tz), vz + w*tz + (x*ty-y*tx) ];
}
