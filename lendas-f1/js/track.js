/* ========================================================================
   LENDAS DA F1 — Interlagos (Autódromo José Carlos Pace) em escala real.
   Traçado a partir de coordenadas GPS reais (~4.29 km, anti-horário).
   Asfalto, zebras nas curvas, linhas de borda, largada/chegada com grid
   escalonado, run-off de grama/brita, barreiras recuadas e arquibancadas.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { INTERLAGOS } from './interlagos-data.js';

export function buildTrack(){
  const G = new THREE.Group();
  const D = INTERLAGOS;

  // centro da pista como curva fechada (centripetal evita "overshoot")
  const vec = D.pts.map(p=> new THREE.Vector3(p[0],0,p[1]));
  const curve = new THREE.CatmullRomCurve3(vec, true, 'centripetal', 0.5);
  const HALF = 7.5;                     // meia-largura (~15 m — largura real de F1)
  const N = 1400;
  // centro geométrico do circuito (pra jogar arquibancadas SEMPRE pra fora)
  const centroid=new THREE.Vector3(); D.pts.forEach(p=>{centroid.x+=p[0];centroid.z+=p[1];});
  centroid.multiplyScalar(1/D.pts.length);
  const pts=[], tan=[];
  for(let i=0;i<=N;i++){ pts.push(curve.getPointAt(i/N)); tan.push(curve.getTangentAt(i/N).normalize()); }
  const up=new THREE.Vector3(0,1,0);
  const leftOf=t=> new THREE.Vector3().crossVectors(up,t).normalize();
  // curvatura por segmento (pra saber onde é curva -> zebra/barreira)
  const curv=[]; for(let i=0;i<=N;i++){ const a=tan[(i-2+N)%N], b=tan[(i+2)%N]; curv.push(a.angleTo(b)); }

  /* ---------- ASFALTO ---------- */
  const posA=[],uvA=[],idxA=[];
  for(let i=0;i<=N;i++){
    const c=pts[i], l=leftOf(tan[i]);
    const L=c.clone().addScaledVector(l, HALF), R=c.clone().addScaledVector(l,-HALF);
    posA.push(L.x,0.02,L.z, R.x,0.02,R.z); uvA.push(0,i/N*70, 1,i/N*70);
  }
  for(let i=0;i<N;i++){ const a=i*2; idxA.push(a,a+1,a+2, a+1,a+3,a+2); }
  const aG=new THREE.BufferGeometry();
  aG.setAttribute('position',new THREE.Float32BufferAttribute(posA,3));
  aG.setAttribute('uv',new THREE.Float32BufferAttribute(uvA,2));
  aG.setIndex(idxA); aG.computeVertexNormals();
  const asphalt=new THREE.Mesh(aG,new THREE.MeshStandardMaterial({color:0x2b2d31,roughness:0.96}));
  asphalt.receiveShadow=true; G.add(asphalt);

  /* ---------- JUNTAS/EMENDAS do asfalto (referência de velocidade) ---------- */
  (function(){
    const pos=[],idx=[]; let q=0;
    for(let i=0;i<=N;i+=12){                       // a cada ~37 m
      const c=pts[i], l=leftOf(tan[i]), t=tan[i];
      const a=c.clone().addScaledVector(l, HALF).addScaledVector(t,-0.15);
      const b=c.clone().addScaledVector(l,-HALF).addScaledVector(t,-0.15);
      const a2=c.clone().addScaledVector(l, HALF).addScaledVector(t,0.15);
      const b2=c.clone().addScaledVector(l,-HALF).addScaledVector(t,0.15);
      pos.push(a.x,0.025,a.z, b.x,0.025,b.z, a2.x,0.025,a2.z, b2.x,0.025,b2.z);
      idx.push(q,q+1,q+2, q+1,q+3,q+2); q+=4;
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); g.setIndex(idx); g.computeVertexNormals();
    G.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x212327,roughness:0.9})));
  })();

  /* ---------- RUN-OFF de brita (mais largo nas curvas) ---------- */
  (function(){
    const pos=[],idx=[];
    for(let i=0;i<=N;i++){
      const wide = curv[i]>0.02 ? 10 : 2.5;
      const c=pts[i], l=leftOf(tan[i]);
      for(const s of [1,-1]){
        const a=c.clone().addScaledVector(l, s*(HALF+0.9));
        const b=c.clone().addScaledVector(l, s*(HALF+0.9+wide));
        pos.push(a.x,0.005,a.z, b.x,0.004,b.z);
      }
    }
    const stride=4;
    for(let i=0;i<N;i++){ const a=i*stride;
      idx.push(a,a+1,a+stride, a+1,a+stride+1,a+stride);        // lado esq
      idx.push(a+2,a+stride+2,a+3, a+3,a+stride+2,a+stride+3);  // lado dir
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setIndex(idx); g.computeVertexNormals();
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x9a8f6f,roughness:1.0}));
    m.receiveShadow=true; G.add(m);
  })();

  /* ---------- ZEBRAS (só nas curvas) ---------- */
  (function(){
    const pos=[],col=[],idx=[]; const c1=new THREE.Color(0xe01f2a),c2=new THREE.Color(0xffffff);
    for(let i=0;i<=N;i++){
      const on = curv[i]>0.010;                 // zebra em toda curva minimamente fechada
      const W = on ? 1.4 : 0.0;                  // zebra larga e bem visível
      for(const s of [1,-1]){
        const c=pts[i], l=leftOf(tan[i]);
        const inner=c.clone().addScaledVector(l, s*HALF);
        const outer=c.clone().addScaledVector(l, s*(HALF+W));
        const cc=(Math.floor(i/4)%2)?c1:c2;      // listras vermelho/branco mais curtas
        pos.push(inner.x,0.04,inner.z, outer.x,0.11,outer.z);   // sobe mais (3D visível)
        col.push(cc.r,cc.g,cc.b, cc.r,cc.g,cc.b);
      }
    }
    const stride=4;
    for(let i=0;i<N;i++){ const b=i*stride;
      idx.push(b,b+1,b+stride, b+1,b+stride+1,b+stride);
      idx.push(b+2,b+stride+2,b+3, b+3,b+stride+2,b+stride+3);
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    g.setIndex(idx); g.computeVertexNormals();
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.7}));
    m.receiveShadow=true; G.add(m);
  })();

  /* ---------- LINHAS DE BORDA (brancas, volta toda) ---------- */
  function edge(side){
    const pos=[],idx=[]; const w=0.14;
    for(let i=0;i<=N;i++){ const c=pts[i], l=leftOf(tan[i]);
      const a=c.clone().addScaledVector(l, side*(HALF-0.12));
      const b=c.clone().addScaledVector(l, side*(HALF-0.12-w));
      pos.push(a.x,0.035,a.z, b.x,0.035,b.z); }
    for(let i=0;i<N;i++){ const a=i*2; idx.push(a,a+1,a+2, a+1,a+3,a+2); }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); g.setIndex(idx); g.computeVertexNormals();
    G.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0xf5f5f5,roughness:0.6})));
  }
  edge(1); edge(-1);

  /* ---------- GRAMA / CHÃO ---------- */
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(4000,4000),
    new THREE.MeshStandardMaterial({color:0x315e34,roughness:1.0}));
  ground.rotation.x=-Math.PI/2; ground.position.y=-0.03; ground.receiveShadow=true; G.add(ground);

  /* ---------- BARREIRAS recuadas (só nas curvas) ---------- */
  (function(){
    const cr=new THREE.Color(0xcc2222),cw=new THREE.Color(0xeeeeee);
    const pos=[],col=[],idx=[]; let vcount=0;
    const OFF=HALF+15, H=1.1;
    let run=[]; run.side=1;
    const flush=()=>{
      if(run.length<3){run.length=0;return;}
      const base=vcount;
      for(const i of run){ const c=pts[i], l=leftOf(tan[i]);
        const p=c.clone().addScaledVector(l, run.side*OFF);
        pos.push(p.x,0.0,p.z, p.x,H,p.z);
        const cc=(Math.floor(i/3)%2)?cr:cw; col.push(cc.r,cc.g,cc.b,cc.r,cc.g,cc.b); vcount+=2; }
      for(let k=0;k<run.length-1;k++){ const a=base+k*2; idx.push(a,a+1,a+2,a+1,a+3,a+2); }
      run.length=0;
    };
    for(const side of [1,-1]){
      run.side=side;
      for(let i=0;i<=N;i++){
        if(curv[i]>0.012){ run.push(i); }
        else flush();
      }
      flush();
    }
    if(pos.length){
      const g=new THREE.BufferGeometry();
      g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
      g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
      g.setIndex(idx); g.computeVertexNormals();
      const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.85,side:THREE.DoubleSide}));
      m.castShadow=true; G.add(m);
    }
  })();

  /* ---------- LARGADA / CHEGADA + GRID ---------- */
  const sf=new THREE.Vector3(D.sf[0],0,D.sf[1]);
  const hdg=D.sfHeading;
  const tanSF=new THREE.Vector3(Math.cos(hdg),0,Math.sin(hdg));
  const rotY=Math.atan2(tanSF.x,tanSF.z);
  const lSF=leftOf(tanSF);
  // linha branca de largada
  const line=new THREE.Mesh(new THREE.PlaneGeometry(HALF*2-0.3,0.5),
    new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.5}));
  line.rotation.x=-Math.PI/2; line.rotation.z=-rotY; line.position.set(sf.x,0.05,sf.z); G.add(line);
  // faixa xadrez logo à frente
  const cvs=document.createElement('canvas'); cvs.width=128; cvs.height=32; const cx=cvs.getContext('2d');
  for(let y=0;y<4;y++)for(let x=0;x<16;x++){cx.fillStyle=((x+y)%2)?'#0a0a0a':'#f2f2f2';cx.fillRect(x*8,y*8,8,8);}
  const chk=new THREE.CanvasTexture(cvs);
  const chkM=new THREE.Mesh(new THREE.PlaneGeometry(HALF*2-0.3,2.2),
    new THREE.MeshStandardMaterial({map:chk,roughness:0.7}));
  chkM.rotation.x=-Math.PI/2; chkM.rotation.z=-rotY;
  chkM.position.set(sf.x+tanSF.x*2.0,0.045,sf.z+tanSF.z*2.0); G.add(chkM);
  // GRID de largada — alinhado à pista, espaçamento REAL (8 m, escalonado)
  const boxMat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.5,transparent:true,opacity:0.92});
  const total=curve.getLength();
  const NGRID=20, GAP=8.0, LAT=1.9;               // 8 m entre posições, alterna os lados
  for(let i=0;i<NGRID;i++){
    const d = 8 + i*GAP;                            // distância atrás da linha de largada
    const uu = ((1 - d/total)%1 + 1)%1;
    const p = curve.getPointAt(uu), t = curve.getTangentAt(uu).normalize(), l = leftOf(t);
    const side = (i%2===0)? 1 : -1;                 // pole de um lado, alterna
    const c = p.clone().addScaledVector(l, side*LAT);
    const grp = new THREE.Group(); grp.position.set(c.x,0.045,c.z);
    grp.rotation.y = Math.atan2(t.x,t.z); G.add(grp);   // ALINHA a caixa à direção da pista
    const mk=(w,h,x,z)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),boxMat);
      m.rotation.x=-Math.PI/2; m.position.set(x,0,z); grp.add(m); };
    mk(2.2,0.14, 0, 1.7);        // linha frontal (onde alinha o bico)
    mk(0.14,3.4, -1.05, 0.0);    // lateral esquerda
    mk(0.14,3.4,  1.05, 0.0);    // lateral direita
  }
  // pórtico de largada
  const gMat=new THREE.MeshStandardMaterial({color:0x14151a,metalness:0.5,roughness:0.5});
  for(const s of [1,-1]){ const p=sf.clone().addScaledVector(lSF, s*(HALF+1.2));
    const m=new THREE.Mesh(new THREE.BoxGeometry(0.4,7,0.4),gMat); m.position.set(p.x,3.5,p.z); m.castShadow=true; G.add(m); }
  const beam=new THREE.Mesh(new THREE.BoxGeometry(HALF*2+2.8,0.6,0.5),gMat);
  beam.position.set(sf.x,7,sf.z); beam.rotation.y=rotY; G.add(beam);
  for(let i=0;i<5;i++){ const lm=new THREE.Mesh(new THREE.CircleGeometry(0.16,12),
      new THREE.MeshStandardMaterial({color:0x1a0000,emissive:0x220000}));
    lm.position.set(sf.x+(i-2)*0.9*Math.cos(rotY),6.7,sf.z-(i-2)*0.9*Math.sin(rotY));
    lm.rotation.y=rotY+Math.PI; G.add(lm); }

  /* ---------- ARQUIBANCADAS (sempre no lado de FORA, viradas pra pista) ---------- */
  function stand(uu,len){
    const p=curve.getPointAt(uu), t=curve.getTangentAt(uu).normalize(), l=leftOf(t);
    // lado de fora = o que aponta pra longe do centro do circuito
    const outward=new THREE.Vector3(p.x-centroid.x,0,p.z-centroid.z).normalize();
    const side=Math.sign(l.dot(outward))||1;
    const base=p.clone().addScaledVector(l, side*(HALF+18));
    // vira o conjunto de frente pra pista (local +Z = em direção à pista)
    const toTrack=p.clone().sub(base).setY(0).normalize();
    const grp=new THREE.Group(); grp.position.copy(base); grp.rotation.y=Math.atan2(toTrack.x,toTrack.z);
    // tiers: degraus subindo e recuando pra trás (longe da pista)
    const tierMat=[0x1f8a4c,0xf2c400,0x2a63c4,0xe8e8e8];
    // estrutura sólida em rampa (sem vãos = não parece flutuar)
    for(let r=0;r<6;r++){
      const h=1.0+r*0.9;                       // cada degrau vai até o chão (bloco sólido)
      const step=new THREE.Mesh(new THREE.BoxGeometry(len,h,1.6),
        new THREE.MeshStandardMaterial({color:0x83888f,roughness:0.95}));
      step.position.set(0,h/2,-1.2-r*1.6); step.receiveShadow=true; step.castShadow=true; grp.add(step);
      // "torcida" (faixa de cor sentada no degrau)
      const crowd=new THREE.Mesh(new THREE.BoxGeometry(len-1,0.55,0.7),
        new THREE.MeshStandardMaterial({color:tierMat[r%4],roughness:0.9}));
      crowd.position.set(0,h+0.02,-1.35-r*1.6); grp.add(crowd);
    }
    // cobertura leve atrás/acima
    const roof=new THREE.Mesh(new THREE.BoxGeometry(len,0.25,4),
      new THREE.MeshStandardMaterial({color:0xd0d5db,roughness:0.6,metalness:0.3}));
    roof.position.set(0,6.4,-8.5); roof.rotation.x=0.12; roof.castShadow=true; grp.add(roof);
    for(const sx of [-len/2+2,0,len/2-2]){ const post=new THREE.Mesh(new THREE.BoxGeometry(0.3,6.4,0.3),
        new THREE.MeshStandardMaterial({color:0x9aa0a6})); post.position.set(sx,3.2,-9.6); grp.add(post); }
    G.add(grp);
  }
  stand(0.02,80); stand(0.34,55); stand(0.62,55); stand(0.80,45);

  return { group:G, curve, half:HALF, length:curve.getLength(), sf, sfHeading:hdg, grid:D.grid };
}
