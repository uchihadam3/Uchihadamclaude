/* ========================================================================
   POLIEDROS DOS DADOS — vértices (colisão) + faces (normal + valor).
   Genérico: qualquer sólido convexo funciona na física e na leitura da face.
   ===================================================================== */
const norm = v => { const m=Math.hypot(v[0],v[1],v[2])||1; return [v[0]/m,v[1]/m,v[2]/m]; };
const centro = ps => { const c=[0,0,0]; for(const p of ps){c[0]+=p[0];c[1]+=p[1];c[2]+=p[2];} return c.map(x=>x/ps.length); };

/* d4 — tetraedro.

   AS FACES SAEM DO FECHO CONVEXO, não de uma tabela escrita à mão. A tabela
   que morava aqui estava com o giro INVERTIDO: os quatro triângulos nasciam
   no sentido horário visto de fora, o three descartava todos por backface
   culling e o que sobrava na tela era o lado de DENTRO do dado — um triângulo
   chapado, vazado e sem sombreamento, com os números espelhados. O fecho
   convexo já ordena cada face no sentido certo, como o d10 e o d12 fazem. */
function tetra(){
  const V=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(norm);
  return build(V, facesDoFecho(V));
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
/* d12 — dodecaedro (faces derivadas do FECHO CONVEXO: geral e sempre coplanar) */
function dodeca(){
  const p=(1+Math.sqrt(5))/2, i=1/p;
  const V=[];
  for(const x of [-1,1]) for(const y of [-1,1]) for(const z of [-1,1]) V.push([x,y,z]);
  for(const a of [-i,i]) for(const b of [-p,p]){ V.push([0,a,b]); V.push([a,b,0]); V.push([b,0,a]); }
  const Vn=V.map(norm);
  return build(Vn, facesDoFecho(Vn));
}

/* Faces de QUALQUER poliedro convexo: para cada trio, testa se o plano deixa
   todos os outros vértices de um lado só. Agrupa os coplanares. */
function facesDoFecho(V, eps=1e-6){
  const planos=[];
  const n=V.length;
  for(let a=0;a<n;a++) for(let b=a+1;b<n;b++) for(let c=b+1;c<n;c++){
    const u=[V[b][0]-V[a][0],V[b][1]-V[a][1],V[b][2]-V[a][2]];
    const w=[V[c][0]-V[a][0],V[c][1]-V[a][1],V[c][2]-V[a][2]];
    let nr=[u[1]*w[2]-u[2]*w[1], u[2]*w[0]-u[0]*w[2], u[0]*w[1]-u[1]*w[0]];
    const m=Math.hypot(...nr); if(m<eps) continue;
    nr=[nr[0]/m,nr[1]/m,nr[2]/m];
    let d=nr[0]*V[a][0]+nr[1]*V[a][1]+nr[2]*V[a][2];
    // ORIENTA a normal para FORA (sem isso, as faces de baixo eram descartadas)
    if(d<0){ nr=[-nr[0],-nr[1],-nr[2]]; d=-d; }
    if(d<eps) continue;
    let ok=true;
    for(let k=0;k<n;k++){ const dk=nr[0]*V[k][0]+nr[1]*V[k][1]+nr[2]*V[k][2];
      if(dk > d+1e-4){ ok=false; break; } }
    if(!ok) continue;
    if(planos.some(pl=> Math.abs(pl.d-d)<1e-4 &&
        Math.abs(pl.n[0]-nr[0])+Math.abs(pl.n[1]-nr[1])+Math.abs(pl.n[2]-nr[2])<1e-3)) continue;
    planos.push({n:nr, d});
  }
  return planos.map(pl=>{
    const idx=[]; for(let k=0;k<V.length;k++){
      const dk=pl.n[0]*V[k][0]+pl.n[1]*V[k][1]+pl.n[2]*V[k][2];
      if(Math.abs(dk-pl.d)<1e-4) idx.push(k); }
    return ordenar(idx, V, pl.n);
  });
}

/* d10 — TRAPEZOEDRO PENTAGONAL de verdade: 10 faces-pipa, cada uma com a face
   OPOSTA paralela. É isso que faz o número de cima ser legível ao pousar. */
function d10(){
  const c=0.15, h=1.42079;      // h resolvido p/ as 4 pontas da pipa serem coplanares
  const V=[[0,h,0],[0,-h,0]];
  for(let i=0;i<10;i++){ const a=i*Math.PI/5;
    V.push([Math.cos(a), (i%2===0?c:-c), Math.sin(a)]); }
  const R=Math.max(...V.map(v=>Math.hypot(...v)));
  const Vs=V.map(v=>v.map(x=>x/R));
  return build(Vs, facesDoFecho(Vs));
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
/* RAIO por tipo: iguala a ALTURA DE REPOUSO (inraio) para todos os dados
   ficarem do mesmo porte na mesa — como num conjunto de dados de verdade. */
const INRAIO={d4:0.333,d6:0.577,d8:0.577,d10:0.537,d12:0.795};
export function raioDe(tipo, alvo=0.335){
  /* O d4 NÃO ENTRA NESTA RÉGUA — ele é uma pirâmide baixa, e o inraio do
     tetraedro é só 1/3 do raio. Igualar a altura de repouso dele à dos outros
     pedia um raio enorme, e o teto de 0.78 que existia para conter isso ainda
     deixava um dado com quase o DOBRO da largura do d6 e, mesmo assim, mais
     baixo que ele: o triângulo gigante e chapado que aparecia na mesa.
     Entre um d4 e um d6 de verdade o que casa é a ARESTA. A do d6 aqui dá
     0.67 (raio 0.58 × 1.155) e um d4 de mesa é um tanto maior — 1.633×raio
     igual a 0.82 põe os dois no mesmo conjunto. */
  if(tipo==='d4') return 0.53;
  const ir=INRAIO[tipo]||0.577;
  // mesma ALTURA DE REPOUSO p/ todos = mesmo porte na mesa
  return Math.min(alvo/ir, 0.78);
}
const CACHE={};
export function poliedro(tipo){
  if(CACHE[tipo]) return CACHE[tipo];
  const g = tipo==='d4'?tetra() : tipo==='d8'?octa() : tipo==='d10'?d10() : tipo==='d12'?dodeca() : cubo();
  // d4 REAL: o valor não está no centro da face — está nos CANTOS. Cada vértice
  // carrega um número, repetido nas 3 faces que o tocam, e você lê o vértice de CIMA.
  g.porVertice = (tipo==='d4');
  CACHE[tipo]=g; return g;
}
/* qual face está para CIMA (§11.1) — genérico via normais */
export function faceParaCima(tipo, quat){
  const g = poliedro(tipo);
  if(g.porVertice){                       // d4: lê o VÉRTICE que aponta pra cima
    let melhor=0, best=-Infinity;
    for(let i=0;i<g.verts.length;i++){
      const v = rot(quat, g.verts[i]);
      if(v[1] > best){ best=v[1]; melhor=i; }
    }
    return melhor;
  }
  let melhor=0, best=-Infinity;
  for(let i=0;i<g.faces.length;i++){
    const n = rot(quat, g.faces[i].normal);
    if(n[1] > best){ best=n[1]; melhor=i; }
  }
  return melhor;
}
/* quantos "resultados" o sólido tem (d4 = vértices; resto = faces) */
export const nResultados = tipo => { const g=poliedro(tipo);
  return g.porVertice ? g.verts.length : g.faces.length; };
const qmulg=(a,b)=>[
  a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],
  a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],
  a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],
  a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];

/* ASSENTA o dado: gira o MÍNIMO necessário pra face de apoio ficar exatamente
   deitada na mesa. Sem isso ele dorme torto e a ponta do d4 não aponta pra cima.
   Devolve { q, y } — quaternion assentado e altura de repouso exata. */
export function assentar(tipo, q, raio=1){
  const g = poliedro(tipo);
  let fi=0, pior=Infinity;                       // face de apoio = normal mais pra BAIXO
  for(let i=0;i<g.faces.length;i++){ const n=rot(q,g.faces[i].normal);
    if(n[1]<pior){ pior=n[1]; fi=i; } }
  const n = rot(q, g.faces[fi].normal);          // leva n -> (0,-1,0) pelo caminho curto
  const eixo=[ n[2], 0, -n[0] ];                 // n × (0,-1,0)
  const s = Math.hypot(eixo[0],eixo[1],eixo[2]), c = -n[1];
  let dq;
  if(s < 1e-9) dq = c>0 ? [0,0,0,1] : [1,0,0,0];
  else { const h = Math.atan2(s,c)/2, k = Math.sin(h)/s;
         dq = [eixo[0]*k, eixo[1]*k, eixo[2]*k, Math.cos(h)]; }
  const q2 = qmulg(dq, q);                       // rotação aplicada no espaço do mundo
  const m = Math.hypot(q2[0],q2[1],q2[2],q2[3])||1;
  const qn = [q2[0]/m,q2[1]/m,q2[2]/m,q2[3]/m];
  let minY=Infinity;
  for(const v of g.verts){ const w=rot(qn,v); if(w[1]<minY) minY=w[1]; }
  return { q:qn, y: -minY*raio };
}
/* onde está a PONTA (d4) ou o centro da face de cima — pra ancorar a etiqueta */
export function pontoDeCima(tipo, q, raio=1){
  const g = poliedro(tipo), i = faceParaCima(tipo, q);
  const p = g.porVertice ? g.verts[i] : g.faces[i].centro;
  const w = rot(q, p);
  return [w[0]*raio, w[1]*raio, w[2]*raio];
}
export function rot(q, v){            // rotaciona vetor por quaternion [x,y,z,w]
  const [x,y,z,w]=q, [vx,vy,vz]=v;
  const tx=2*(y*vz-z*vy), ty=2*(z*vx-x*vz), tz=2*(x*vy-y*vx);
  return [ vx + w*tx + (y*tz-z*ty), vy + w*ty + (z*tx-x*tz), vz + w*tz + (x*ty-y*tx) ];
}
