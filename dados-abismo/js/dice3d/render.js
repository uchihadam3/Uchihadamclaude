/* ========================================================================
   RENDER DOS DADOS 3D (§11.3) — three.js, PBR, faces gravadas, sombra
   de contato. Reproduz a TRILHA da física real (nada de tween falso).
   ===================================================================== */
import * as THREE from '../../vendor/three.module.js';
import { poliedro } from './geometry.js';
import { MATERIAIS } from '../data/dice.js';
import { FACE_KINDS } from '../data/faces.js';

/* --- textura das faces: um atlas com N nichos, cada um com o símbolo ---

   AQUI JÁ TEVE FOTO DE MATERIAL, e saiu. A pedra fotografada brigava com o
   glifo: o grão competia com o número pela leitura e o dado ficava sujo em vez
   de gravado. A cor chapada com o gradiente radial por cima lê melhor em
   qualquer tamanho, que é o que importa num dado de 40px na tela do celular.
   As pré-cargas de arte que existiam para isso foram embora junto — o feltro
   da mesa, esse sim, continua vindo de imagem. */
function atlasFaces(faces, corBase, corTinta, layouts, vencedor){
  const n = faces.length, cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n/cols);
  const S = 256, cv = document.createElement('canvas');
  cv.width = cols*S; cv.height = rows*S;
  const g = cv.getContext('2d');
  g.fillStyle = corBase; g.fillRect(0,0,cv.width,cv.height);
  faces.forEach((f,i)=>{
    const cx=(i%cols)*S, cy=Math.floor(i/cols)*S;
    // leve variação de tom por face (osso não é uniforme)
    g.fillStyle = corBase; g.fillRect(cx,cy,S,S);
    const grd=g.createRadialGradient(cx+S/2,cy+S/2,S*0.1,cx+S/2,cy+S/2,S*0.7);
    grd.addColorStop(0,'rgba(255,255,255,0.10)'); grd.addColorStop(1,'rgba(0,0,0,0.16)');
    g.fillStyle=grd; g.fillRect(cx,cy,S,S);
    g.textAlign='center'; g.textBaseline='middle';
    const marcar=(txt, kind, px, py, esc, destaque)=>{
      const K2 = FACE_KINDS[kind] || FACE_KINDS.num;
      const fs = (kind==='num' ? (txt.length>1?S*0.5:S*0.62) : S*0.55) * esc * (destaque?1.5:1);
      g.font = `900 ${fs}px Georgia, serif`;
      if(destaque){                      // o RESULTADO fica em ouro, com halo
        g.shadowColor='#ffb02b'; g.shadowBlur=S*0.22;
        g.fillStyle='#ffcf4a'; g.fillText(txt, px, py);
        g.shadowBlur=0; g.fillStyle='#5a3a00'; g.font=`900 ${fs*0.98}px Georgia, serif`;
        g.fillText(txt, px, py); g.fillStyle='#ffe9a0'; g.font=`900 ${fs*0.86}px Georgia, serif`;
        g.fillText(txt, px, py); return;
      }
      g.fillStyle='rgba(255,255,255,0.16)'; g.fillText(txt, px, py + S*0.016*esc);
      g.fillStyle = kind==='num' ? corTinta : K2.cor;
      g.fillText(txt, px, py);
      if(kind!=='num'){ g.shadowColor=K2.cor; g.shadowBlur=S*0.09; g.fillText(txt, px, py); g.shadowBlur=0; }
    };
    const lay = layouts && layouts[i];
    if(lay){                       // d4: um número em CADA CANTO (como o dado real)
      for(const it of lay) marcar(it.txt, it.k, cx+it.u*S, cy+it.v*S, 0.40, vencedor!=null && it.vi===vencedor);
    } else {
      const K = FACE_KINDS[f.k] || FACE_KINDS.num;
      const txt = f.k==='num' ? String(f.v) : (K.glifo || '?');
      marcar(txt, f.k, cx+S/2, cy+S/2, 1, false);
    }
  });
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return { tex, cols, rows };
}

/* --- geometria: triangula cada face em leque e mapeia o nicho do atlas --- */
function geometriaDado(tipo, faces, raio, outLayouts){
  const g = poliedro(tipo);
  const n = g.faces.length, cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n/cols);
  const P=[], N=[], U=[];
  g.faces.forEach((f, fi)=>{
    const pts = f.idx.map(k=> g.verts[k].map(x=>x*raio));
    const c = f.centro.map(x=>x*raio);
    const nrm = f.normal;
    const u0=(fi%cols)/cols, v0=1-(Math.floor(fi/cols)+1)/rows;
    const du=1/cols, dv=1/rows;
    // raio REAL da face (não do dado) — sem isso o UV estilhaça em d10/d12
    // raio ÚTIL da face = distância do centro às ARESTAS (incírculo).
    // Usar a distância aos vértices estourava o número em faces triangulares.
    let Rin = Infinity;
    for(let k=0;k<pts.length;k++){
      const a=pts[k], b=pts[(k+1)%pts.length];
      const mx=(a[0]+b[0])/2-c[0], my=(a[1]+b[1])/2-c[1], mz=(a[2]+b[2])/2-c[2];
      Rin=Math.min(Rin, Math.hypot(mx,my,mz));
    }
    const Rface = Rin * 1.34;   // o glifo ocupa ~75% do incírculo
    // base ortonormal ESTÁVEL do plano da face
    let ax0 = [pts[0][0]-c[0], pts[0][1]-c[1], pts[0][2]-c[2]];
    const m0 = Math.hypot(...ax0)||1; ax0 = ax0.map(x=>x/m0);
    const ay0 = [ nrm[1]*ax0[2]-nrm[2]*ax0[1], nrm[2]*ax0[0]-nrm[0]*ax0[2], nrm[0]*ax0[1]-nrm[1]*ax0[0] ];
    // UV radial: centro do nicho no centro da face
    const uvDe = p => {
      const d=[p[0]-c[0],p[1]-c[1],p[2]-c[2]];
      const x=(d[0]*ax0[0]+d[1]*ax0[1]+d[2]*ax0[2])/Rface;
      const y=(d[0]*ay0[0]+d[1]*ay0[1]+d[2]*ay0[2])/Rface;
      return [ u0+du*(0.5+x*0.5), v0+dv*(0.5+y*0.5) ];
    };
    if(outLayouts && g.porVertice){
      // o número de cada VÉRTICE fica no canto correspondente, puxado pro centro
      outLayouts[fi] = f.idx.map((vi,k)=>{
        const uv=uvDe(pts[k]);
        const fu=(uv[0]-u0)/du, fv=(uv[1]-v0)/dv;          // 0..1 dentro do nicho
        const face = faces[vi] || {k:'num', v:vi+1};
        return { vi, txt: face.k==='num'?String(face.v):(FACE_KINDS[face.k]?.glifo||'?'),
                 k: face.k, u: 0.5+(fu-0.5)*0.52, v: 1-(0.5+(fv-0.5)*0.52) };
      });
    }
    for(let i=0;i<pts.length;i++){
      const a=pts[i], b=pts[(i+1)%pts.length];
      for(const p of [c,a,b]){ P.push(p[0],p[1],p[2]); N.push(nrm[0],nrm[1],nrm[2]);
        const uv=uvDe(p); U.push(uv[0],uv[1]); }
    }
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(P,3));
  geo.setAttribute('normal',   new THREE.Float32BufferAttribute(N,3));
  geo.setAttribute('uv',       new THREE.Float32BufferAttribute(U,2));
  return geo;
}

export function destacarResultado(mesh, vencedor){
  const die=mesh.userData.die, lay=mesh.userData.layouts;
  if(!lay) return;                                   // só o d4 usa cantos
  const M=MATERIAIS[die.material]||MATERIAIS.osso;
  const hex='#'+M.cor.toString(16).padStart(6,'0');
  const tinta = die.material==='osso'?'#2b2418':'#d8d2c4';
  const {tex}=atlasFaces(die.faces,hex,tinta,lay,vencedor);
  mesh.material.map?.dispose(); mesh.material.map=tex; mesh.material.needsUpdate=true;
}
export function criarMalhaDado(die, raio=0.5){
  const M = MATERIAIS[die.material] || MATERIAIS.osso;
  const hex = '#'+M.cor.toString(16).padStart(6,'0');
  const tinta = die.material==='osso' ? '#2b2418'
              : die.material==='obsidiana' ? '#d8d2c4'
              : die.material==='metal' ? '#12161a'
              : die.material==='ambar' ? '#3a1f05' : '#f0e6ff';
  const layouts = poliedro(die.tipo).porVertice ? [] : null;
  const geo = geometriaDado(die.tipo, die.faces, raio, layouts);
  const { tex } = atlasFaces(die.faces, hex, tinta, layouts);
  const mat = new THREE.MeshStandardMaterial({
    map: tex, color: 0xffffff,
    roughness: M.rough, metalness: M.metal,
    emissive: M.emissive||0x000000, emissiveIntensity: M.emissive?0.5:0,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.userData.die = die; mesh.userData.layouts = layouts;
  return mesh;
}

/* --- cena da mesa (feltro escuro) --- */
/* o feltro desenhado em código, que serve enquanto a arte não carrega */
function feltroProcedural(){
  const cv=document.createElement('canvas'); cv.width=cv.height=512;
  const c=cv.getContext('2d');
  c.fillStyle='#0e3222'; c.fillRect(0,0,512,512);
  for(let i=0;i<26000;i++){ c.fillStyle=`rgba(${30+Math.random()*50},${80+Math.random()*70},${55+Math.random()*45},0.22)`;
    c.fillRect(Math.random()*512, Math.random()*512, 1.6, 1.6); }
  const vg=c.createRadialGradient(256,256,60,256,256,300);
  vg.addColorStop(0,'rgba(255,255,255,0.10)'); vg.addColorStop(1,'rgba(0,0,0,0.42)');
  c.fillStyle=vg; c.fillRect(0,0,512,512);
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace;
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(2,2);
  return t;
}
export function criarMesa(scene, mesa){
  const g = new THREE.PlaneGeometry(mesa.x*3.2, mesa.z*3.6);
  const mat = new THREE.MeshStandardMaterial({ map:feltroProcedural(), roughness:0.94, metalness:0 });
  /* A ARTE ENTRA POR CIMA, e só quando chega. O feltro de código continua
     sendo o que a mesa mostra no primeiro quadro: se a textura demorar ou
     faltar, a mesa aparece verde do mesmo jeito em vez de preta. */
  const t = new THREE.TextureLoader().load('arte/mat/mesa.jpg', tex=>{
    tex.colorSpace=THREE.SRGBColorSpace;
    tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.repeat.set(2,2);
    tex.anisotropy=8;
    /* A FOTO CRUA ACENDE DEMAIS. São nove luzes em cima dela e o verde do
       feltro sai mais claro que qualquer coisa na tela — a mesa rouba o olho
       dos dados, que são o que importa. O multiply da cor derruba o brilho
       sem lavar o tom nem mexer no grão. */
    mat.color.setHex(0x8b9c8e);
    mat.map=tex; mat.needsUpdate=true;
  }, undefined, ()=>{});
  const m = new THREE.Mesh(g, mat);
  m.rotation.x=-Math.PI/2; m.receiveShadow=true;
  scene.add(m); return m;
}
export function luzes(scene){
  scene.add(new THREE.HemisphereLight(0xbfd4e8, 0x16281f, 1.05));
  const key=new THREE.DirectionalLight(0xfff2e0, 3.2); key.position.set(3.5,7,3);
  key.castShadow=true; key.shadow.mapSize.set(1024,1024);
  const s=key.shadow.camera; s.left=-6;s.right=6;s.top=6;s.bottom=-6;s.near=0.5;s.far=22;
  key.shadow.bias=-0.0012; scene.add(key);
  const fill=new THREE.DirectionalLight(0x9ab8ff, 0.85); fill.position.set(-4,3.5,-2); scene.add(fill);
  const rim=new THREE.DirectionalLight(0xffc46b, 1.0); rim.position.set(0,2.5,-6); scene.add(rim);
  // FRONTAL, do lado da câmera: dado assentado tem faces íngremes (o d4 sobretudo)
  // e sem esta luz os números da lateral ficam na sombra e não dá pra ler.
  const frente=new THREE.DirectionalLight(0xfff0dc, 1.9); frente.position.set(0.8,3.4,7.5); scene.add(frente);
  const lado=new THREE.DirectionalLight(0xdfe9ff, 0.9); lado.position.set(-6,2.6,4); scene.add(lado);
  // vela quente rasante — dá o clima de cripta e realça o relevo das faces
  const vela=new THREE.PointLight(0xffb45e, 22, 14, 2); vela.position.set(-2.2,1.5,2.4); scene.add(vela);
  /* DUAS LUZES DE ARCANO, arroxeadas e baixas, uma de cada lado. Elas não
     iluminam para ler — para isso já existem a chave e a frontal — mas
     lambem a lateral dos dados e desenham o halo violeta que a referência
     tem: a mesa deixa de ser um feltro no escuro e vira um objeto aceso. */
  const arc1=new THREE.PointLight(0x9a5cff, 16, 12, 2); arc1.position.set(3.4,1.1,3.2); scene.add(arc1);
  const arc2=new THREE.PointLight(0x6f3fd8, 12, 12, 2); arc2.position.set(-3.6,1.0,-1.8); scene.add(arc2);
  return key;
}
