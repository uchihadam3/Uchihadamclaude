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
