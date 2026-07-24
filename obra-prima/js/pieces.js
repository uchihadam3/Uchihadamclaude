/* ========================================================================
   OBRA-PRIMA — peças: formatos 3D + materiais (com colisores casados)
   Cada forma define a geometria visual E os colisores físicos equivalentes,
   pra física bater com o que se vê.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';

/* materiais de construção — atrito, densidade e "quique" mudam a estratégia */
export const MATERIALS = {
  madeira:  { name:'Madeira',  color:0xd39a5c, friction:0.72, density:0.55, restitution:0.04, rough:0.85, metal:0.0 },
  caixote:  { name:'Caixote',  color:0xc98a44, friction:0.80, density:0.5,  restitution:0.03, rough:0.9,  metal:0.0 },
  pedra:    { name:'Pedra',    color:0x9aa0a8, friction:0.95, density:1.6,  restitution:0.02, rough:0.95, metal:0.0 },
  concreto: { name:'Concreto', color:0xb9bcc0, friction:0.9,  density:1.5,  restitution:0.02, rough:1.0,  metal:0.0 },
  metal:    { name:'Metal',    color:0x9099a6, friction:0.55, density:2.2,  restitution:0.08, rough:0.35, metal:0.85 },
  gelo:     { name:'Gelo',     color:0xbfe6ff, friction:0.07, density:0.9,  restitution:0.06, rough:0.08, metal:0.0, opacity:0.8 },
  borracha: { name:'Borracha', color:0x3c4250, friction:1.15, density:0.75, restitution:0.45, rough:0.95, metal:0.0 },
};

/* helper: pontos de um prisma/convexo em Float32 */
function pts(arr){ return new Float32Array(arr.flat()); }

/* ---- catálogo de FORMAS ----
   geom: () => THREE.BufferGeometry (na origem, eixo Y pra cima)
   col:  array de colisores {t,...} relativos ao centro do corpo
   half: meia-extensão aprox (p/ enquadrar spawn) */
export const SHAPES = {
  cubo: {
    name:'Cubo',
    geom:()=> new THREE.BoxGeometry(1,1,1),
    col:[{t:'box',h:[0.5,0.5,0.5]}], half:[0.5,0.5,0.5],
  },
  caixa: {
    name:'Caixa',
    geom:()=> new THREE.BoxGeometry(1.15,1.15,1.15),
    col:[{t:'box',h:[0.575,0.575,0.575]}], half:[0.575,0.575,0.575],
  },
  tabua: {
    name:'Tábua',
    geom:()=> new THREE.BoxGeometry(2.2,0.32,0.95),
    col:[{t:'box',h:[1.1,0.16,0.475]}], half:[1.1,0.16,0.475],
  },
  viga: {
    name:'Viga',
    geom:()=> new THREE.BoxGeometry(2.6,0.42,0.42),
    col:[{t:'box',h:[1.3,0.21,0.21]}], half:[1.3,0.21,0.21],
  },
  cilindro: {
    name:'Cilindro',
    geom:()=> new THREE.CylinderGeometry(0.55,0.55,1.05,20),
    col:[{t:'cyl',hh:0.525,r:0.55}], half:[0.55,0.525,0.55],
  },
  esfera: {
    name:'Esfera',
    geom:()=> new THREE.SphereGeometry(0.52,24,18),
    col:[{t:'ball',r:0.52}], half:[0.52,0.52,0.52],
  },
  piramide: {
    name:'Pirâmide',
    geom:()=>{ const g=new THREE.ConeGeometry(0.8,1.1,4); g.rotateY(Math.PI/4); g.translate(0,0,0); return g; },
    // colisor convexo: base quadrada + ápice
    col:[{t:'convex',pts:pts([[-0.57,-0.55,-0.57],[0.57,-0.55,-0.57],[0.57,-0.55,0.57],[-0.57,-0.55,0.57],[0,0.55,0]])}],
    half:[0.8,0.55,0.8],
  },
  ele: {  // peça em L (dois blocos)
    name:'Bloco L',
    geom:()=>{
      const g1=new THREE.BoxGeometry(0.6,1.6,0.8); g1.translate(-0.6,0,0);
      const g2=new THREE.BoxGeometry(1.2,0.6,0.8); g2.translate(0.0,-0.5,0);
      return mergeGeoms([g1,g2]);
    },
    col:[{t:'box',h:[0.3,0.8,0.4],p:[-0.6,0,0]},{t:'box',h:[0.6,0.3,0.4],p:[0.0,-0.5,0]}],
    half:[0.9,0.8,0.4],
  },
};
/* ---- prisma: extruda um perfil 2D (XY) ao longo de Z; casa geom + convexo ---- */
function prismGeom(profile, hz){
  const n=profile.length, verts=[], idx=[];
  for(const [x,y] of profile){ verts.push(x,y, hz); }      // frente
  for(const [x,y] of profile){ verts.push(x,y,-hz); }      // trás
  for(let i=1;i<n-1;i++){ idx.push(0,i,i+1); }             // tampa frente
  for(let i=1;i<n-1;i++){ idx.push(n, n+i+1, n+i); }       // tampa trás
  for(let i=0;i<n;i++){ const j=(i+1)%n; idx.push(i,n+i,j, j,n+i,n+j); } // laterais
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
  g.setIndex(idx); g.computeVertexNormals();
  const pts=new Float32Array(verts);
  return {geom:g, pts};
}
function convexShape(profile, hz, half){ let cache=null;
  return { geom:()=>{ cache=cache||prismGeom(profile,hz); return cache.geom.clone(); },
    _pts:()=>{ cache=cache||prismGeom(profile,hz); return cache.pts; }, half }; }

/* dá pra registrar formas convexas via prisma */
function reg(id,name,profile,hz,half){ const s=convexShape(profile,hz,half);
  SHAPES[id]={ name, geom:s.geom, col:[{t:'convex',pts:s._pts()}], half }; }

// cunha / rampa
reg('cunha','Cunha', [[-0.75,-0.5],[0.75,-0.5],[-0.75,0.55]], 0.55, [0.75,0.52,0.55]);
// triângulo (prisma)
reg('triangulo','Triângulo', [[-0.8,-0.5],[0.8,-0.5],[0,0.65]], 0.55, [0.8,0.57,0.55]);
// trapézio
reg('trapezio','Trapézio', [[-0.85,-0.5],[0.85,-0.5],[0.45,0.5],[-0.45,0.5]], 0.6, [0.85,0.5,0.6]);
// hexágono (deitado como prisma, faces planas em cima/baixo)
reg('hexagono','Hexágono', [[-0.35,-0.6],[0.35,-0.6],[0.7,0],[0.35,0.6],[-0.35,0.6],[-0.7,0]], 0.55, [0.7,0.6,0.55]);
// meia-lua (balança!) — topo plano, base curva
(()=>{ const p=[[-0.75,0.15],[0.75,0.15]]; for(let a=0;a<=10;a++){ const t=Math.PI*(a/10); p.push([Math.cos(Math.PI-t)*0.75, 0.15-Math.sin(t)*0.6]); }
  reg('meialua','Meia-lua', p, 0.55, [0.75,0.6,0.55]); })();

/* peças compostas (várias caixas num corpo) */
function compound(id,name,parts,half){ // parts: [{g:[sx,sy,sz],p:[x,y,z]}]
  SHAPES[id]={ name, half,
    geom:()=> mergeGeoms(parts.map(pp=>{ const g=new THREE.BoxGeometry(pp.g[0],pp.g[1],pp.g[2]); g.translate(pp.p[0],pp.p[1],pp.p[2]); return g; })),
    col: parts.map(pp=>({t:'box', h:[pp.g[0]/2,pp.g[1]/2,pp.g[2]/2], p:pp.p })) };
}
// T
compound('te','Bloco T', [{g:[1.7,0.5,0.8],p:[0,0.55,0]},{g:[0.5,1.2,0.8],p:[0,-0.05,0]}], [0.85,0.8,0.4]);
// cruz / mais
compound('cruz','Cruz', [{g:[1.7,0.5,0.7],p:[0,0,0]},{g:[0.5,1.7,0.7],p:[0,0,0]}], [0.85,0.85,0.35]);
// arco (2 pilares + travessa, com vão)
compound('arco','Arco', [{g:[0.45,1.3,0.9],p:[-0.7,-0.1,0]},{g:[0.45,1.3,0.9],p:[0.7,-0.1,0]},{g:[2.0,0.45,0.9],p:[0,0.77,0]}], [1.0,0.78,0.45]);
// escada (degraus)
compound('escada','Escada', [{g:[1.6,0.35,0.9],p:[0,-0.5,0]},{g:[1.05,0.35,0.9],p:[-0.28,-0.15,0]},{g:[0.5,0.35,0.9],p:[-0.55,0.2,0]}], [0.8,0.55,0.45]);

/* laje larga (base ótima) + barril + toco + cone + octaedro + pedra */
SHAPES.laje={ name:'Laje', geom:()=>new THREE.BoxGeometry(2.6,0.3,1.8), col:[{t:'box',h:[1.3,0.15,0.9]}], half:[1.3,0.15,0.9] };
SHAPES.barril={ name:'Barril', geom:()=>new THREE.CylinderGeometry(0.62,0.62,1.2,22), col:[{t:'cyl',hh:0.6,r:0.62}], half:[0.62,0.6,0.62] };
SHAPES.toco={ name:'Toco', geom:()=>new THREE.CylinderGeometry(0.8,0.8,0.6,22), col:[{t:'cyl',hh:0.3,r:0.8}], half:[0.8,0.3,0.8] };
SHAPES.cone={ name:'Cone', geom:()=>new THREE.ConeGeometry(0.75,1.2,22), col:[{t:'cone',hh:0.6,r:0.75}], half:[0.75,0.6,0.75] };
SHAPES.octaedro={ name:'Octaedro', geom:()=>new THREE.OctahedronGeometry(0.75),
  col:[{t:'convex',pts:pts([[0.75,0,0],[-0.75,0,0],[0,0.75,0],[0,-0.75,0],[0,0,0.75],[0,0,-0.75]])}], half:[0.75,0.75,0.75] };
(()=>{ // pedra irregular (determinística)
  const g=new THREE.IcosahedronGeometry(0.72,1); const pos=g.attributes.position; let s=1337;
  const rr=()=>{ s^=s<<13;s^=s>>>17;s^=s<<5; return ((s>>>0)%1000)/1000; };
  const seen={};
  for(let i=0;i<pos.count;i++){ const k=[pos.getX(i).toFixed(2),pos.getY(i).toFixed(2),pos.getZ(i).toFixed(2)].join();
    let f=seen[k]; if(f===undefined){ f=0.78+rr()*0.34; seen[k]=f; }
    pos.setXYZ(i,pos.getX(i)*f,pos.getY(i)*f,pos.getZ(i)*f); }
  g.computeVertexNormals();
  SHAPES.pedra={ name:'Pedra', geom:()=>g.clone(), col:[{t:'convex',pts:new Float32Array(pos.array)}], half:[0.85,0.85,0.85] };
})();

export const SHAPE_IDS = Object.keys(SHAPES);

/* merge simples de BufferGeometries (posições+normais) sem indexação */
function mergeGeoms(list){
  const parts=list.map(g=>{ const ng=g.index? g.toNonIndexed():g; return ng; });
  let vcount=0; parts.forEach(g=>vcount+=g.attributes.position.count);
  const pos=new Float32Array(vcount*3), nor=new Float32Array(vcount*3);
  let o=0; parts.forEach(g=>{ const p=g.attributes.position.array, n=g.attributes.normal.array;
    pos.set(p,o); nor.set(n,o); o+=p.length; });
  const out=new THREE.BufferGeometry();
  out.setAttribute('position',new THREE.BufferAttribute(pos,3));
  out.setAttribute('normal',new THREE.BufferAttribute(nor,3));
  return out;
}

/* cria o Object3D visual (mesh + contorno cartoon) de uma peça */
export function buildMesh(shapeId, matId){
  const S=SHAPES[shapeId], M=MATERIALS[matId];
  const geom=S.geom();
  const mat=new THREE.MeshStandardMaterial({
    color:M.color, roughness:M.rough, metalness:M.metal||0,
    transparent:!!M.opacity, opacity:M.opacity||1,
    flatShading: shapeId==='piramide',
  });
  const mesh=new THREE.Mesh(geom,mat);
  mesh.castShadow=true; mesh.receiveShadow=true;
  // contorno escuro (toy look)
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geom,25),
    new THREE.LineBasicMaterial({color:0x2a1c10,transparent:true,opacity:0.35}));
  mesh.add(edges);
  const g=new THREE.Group(); g.add(mesh);
  g.userData={shapeId,matId,half:S.half};
  return g;
}
