/* ========================================================================
   LENDAS DA F1 — pista em escala real (Three.js)
   Circuito fechado gerado por spline. Fita de asfalto (~12m largura),
   zebras (curbs), linhas, grama, barreiras e reta de largada/chegada.
   Retorna { group, curve, width, startLen } para a lógica de corrida.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';

export function buildTrack(){
  const G = new THREE.Group();

  /* ---------- LINHA DE CORRIDA (racing line) ----------
     Pontos em metros. Circuito estilo "Interlagos-lite": retas longas,
     curvas rápidas e lentas. ~2.9 km de extensão. */
  const P = [
    [   0,   0], [  0, 320], [ -18, 380], [ -70, 430], [-150, 445],
    [-230, 430], [-280, 380], [-290, 320], [-270, 270], [-210, 235],
    [-150, 235], [-110, 205], [-105, 150], [-140, 110], [-210,  95],
    [-250,  55], [-235,  -5], [-175, -30], [-110, -25], [ -60, -55],
    [ -45,-120], [ -80,-170], [-150,-185], [-165,-245], [-120,-295],
    [ -45,-300], [  20,-270], [  60,-215], [  60,-150], [  35, -95],
    [  35, -40], [   0, -10],
  ].map(([x,z])=> new THREE.Vector3(x, 0, z));

  const curve = new THREE.CatmullRomCurve3(P, true, 'catmullrom', 0.5);
  const HALF = 6.0;                // meia-largura da pista (12m total)
  const N = 900;                   // segmentos ao longo da volta
  const pts = curve.getSpacedPoints(N);
  const tangents = [];
  for(let i=0;i<=N;i++) tangents.push(curve.getTangentAt(i/N).normalize());

  const up = new THREE.Vector3(0,1,0);
  const leftOf = t => new THREE.Vector3().crossVectors(up, t).normalize();

  /* ---------- FITA DE ASFALTO ---------- */
  const posA=[], uvA=[], idxA=[];
  for(let i=0;i<=N;i++){
    const c=pts[i], l=leftOf(tangents[i]);
    const L=c.clone().addScaledVector(l, HALF);
    const R=c.clone().addScaledVector(l,-HALF);
    posA.push(L.x,0.02,L.z, R.x,0.02,R.z);
    const v=i/N*40;
    uvA.push(0,v, 1,v);
  }
  for(let i=0;i<N;i++){ const a=i*2; idxA.push(a,a+1,a+2, a+1,a+3,a+2); }
  const asphaltGeo=new THREE.BufferGeometry();
  asphaltGeo.setAttribute('position',new THREE.Float32BufferAttribute(posA,3));
  asphaltGeo.setAttribute('uv',new THREE.Float32BufferAttribute(uvA,2));
  asphaltGeo.setIndex(idxA); asphaltGeo.computeVertexNormals();
  const asphalt=new THREE.Mesh(asphaltGeo, new THREE.MeshStandardMaterial({
    color:0x2b2d31, roughness:0.95, metalness:0.0 }));
  asphalt.receiveShadow=true; G.add(asphalt);

  /* ---------- ZEBRAS / CURBS (bordas listradas) ---------- */
  function curb(side){
    const pos=[], col=[], idx=[]; const c1=new THREE.Color(0xd21f2a), c2=new THREE.Color(0xf2f2f2);
    for(let i=0;i<=N;i++){
      const c=pts[i], l=leftOf(tangents[i]);
      const inner=c.clone().addScaledVector(l, side*HALF);
      const outer=c.clone().addScaledVector(l, side*(HALF+0.9));
      pos.push(inner.x,0.03,inner.z, outer.x,0.05,outer.z);
      const cc=(Math.floor(i/6)%2)? c1:c2;
      col.push(cc.r,cc.g,cc.b, cc.r,cc.g,cc.b);
    }
    for(let i=0;i<N;i++){ const a=i*2; idx.push(a,a+1,a+2, a+1,a+3,a+2); }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    g.setIndex(idx); g.computeVertexNormals();
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.7}));
    m.receiveShadow=true; G.add(m);
  }
  curb(1); curb(-1);

  /* ---------- LINHAS DE BORDA (brancas) ---------- */
  function edgeLine(side){
    const pos=[], idx=[]; const w=0.14;
    for(let i=0;i<=N;i++){
      const c=pts[i], l=leftOf(tangents[i]);
      const a=c.clone().addScaledVector(l, side*(HALF-0.15));
      const b=c.clone().addScaledVector(l, side*(HALF-0.15-w));
      pos.push(a.x,0.035,a.z, b.x,0.035,b.z);
    }
    for(let i=0;i<N;i++){ const a=i*2; idx.push(a,a+1,a+2, a+1,a+3,a+2); }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setIndex(idx); g.computeVertexNormals();
    G.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0xf5f5f5,roughness:0.6})));
  }
  edgeLine(1); edgeLine(-1);

  /* ---------- BARREIRAS (muros com faixa vermelha/branca) ---------- */
  function wall(side){
    const pos=[], col=[], idx=[]; const off=HALF+3.0, h=1.0;
    const cr=new THREE.Color(0xcc2222), cw=new THREE.Color(0xeeeeee);
    for(let i=0;i<=N;i++){
      const c=pts[i], l=leftOf(tangents[i]);
      const base=c.clone().addScaledVector(l, side*off);
      pos.push(base.x,0.0,base.z, base.x,h,base.z);
      const cc=(Math.floor(i/4)%2)?cr:cw;
      col.push(cc.r,cc.g,cc.b, cc.r,cc.g,cc.b);
    }
    for(let i=0;i<N;i++){ const a=i*2; idx.push(a,a+1,a+2, a+1,a+3,a+2); }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    g.setIndex(idx); g.computeVertexNormals();
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.8,side:THREE.DoubleSide}));
    m.castShadow=true; G.add(m);
  }
  wall(1); wall(-1);

  /* ---------- GRAMA / CHÃO ---------- */
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),
    new THREE.MeshStandardMaterial({color:0x2f5d33, roughness:1.0}));
  ground.rotation.x=-Math.PI/2; ground.position.y=-0.02; ground.receiveShadow=true; G.add(ground);
  // faixa de brita (run-off) em volta da pista — barata: um segundo plano mais claro
  // (mantemos simples pro demo)

  /* ---------- LARGADA/CHEGADA (grid xadrez) ---------- */
  const startT = tangents[0], startC = pts[0], sl=leftOf(startT);
  const gridGeo=new THREE.PlaneGeometry(HALF*2, 3);
  const cvs=document.createElement('canvas'); cvs.width=128; cvs.height=32;
  const cx=cvs.getContext('2d');
  for(let y=0;y<4;y++) for(let x=0;x<16;x++){ cx.fillStyle=((x+y)%2)?'#111':'#eee'; cx.fillRect(x*8,y*8,8,8);}
  const gridTex=new THREE.CanvasTexture(cvs);
  const grid=new THREE.Mesh(gridGeo,new THREE.MeshStandardMaterial({map:gridTex,roughness:0.8}));
  grid.rotation.x=-Math.PI/2;
  const ang=Math.atan2(startT.x,startT.z);
  grid.rotation.z=-ang;
  grid.position.set(startC.x,0.04,startC.z); G.add(grid);

  /* ---------- ARQUIBANCADAS simples em algumas curvas ---------- */
  function stand(i){
    const c=pts[i], l=leftOf(tangents[i]);
    const p=c.clone().addScaledVector(l, HALF+9);
    const s=new THREE.Mesh(new THREE.BoxGeometry(40,6,10),
      new THREE.MeshStandardMaterial({color:0x8899aa,roughness:0.9}));
    const a=Math.atan2(tangents[i].x,tangents[i].z);
    s.position.set(p.x,3,p.z); s.rotation.y=a; s.castShadow=true; s.receiveShadow=true; G.add(s);
  }
  [120,470,720].forEach(stand);

  return { group:G, curve, half:HALF, length:curve.getLength() };
}
