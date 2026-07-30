/* ========================================================================
   LENDAS DA F1 — carro de Fórmula 1 procedural detalhado (Three.js)
   Anatomia de um F1 moderno (regras efeito-solo 2022+), em escala real:
   comprimento ~5.5 m, largura 2.0 m, entre-eixos ~3.6 m, pneus Ø720 mm
   (dianteiro 305 / traseiro 405 mm), aros 18".
   Pinturas nas CORES das equipes reais (Ferrari, McLaren, Mercedes...),
   com decalques próprios/fictícios e número — sem copiar logos/marcas.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';

/* Paletas inspiradas nas cores reais das equipes (apenas cores; sem logos). */
export const TEAMS = {
  ferrari:      {name:'Vermelho (Scuderia)', body:0xd50000, bodyDark:0x8a0000, accent:0xf5e000, trim:0x111111, band:0xf5c518, helmet:0xf5e000},
  mclaren:      {name:'Papaya',              body:0xff6a13, bodyDark:0xc44a00, accent:0x0a3350, trim:0x0a3350, band:0xf5c518, helmet:0xff6a13},
  mercedes:     {name:'Preto/Petronas',      body:0x161a1f, bodyDark:0x0c0e11, accent:0x00d7c2, trim:0xb9bec7, band:0xf5c518, helmet:0x00d7c2},
  redbull:      {name:'Azul-marinho',        body:0x0b1b45, bodyDark:0x081233, accent:0xda291c, trim:0xf5c518, band:0xf5c518, helmet:0xda291c},
  aston:        {name:'Verde British',       body:0x00594f, bodyDark:0x003b34, accent:0xcedc00, trim:0xcedc00, band:0xf5c518, helmet:0xcedc00},
  williams:     {name:'Azul Williams',       body:0x1a3fd0, bodyDark:0x122a8c, accent:0x37c6ff, trim:0xffffff, band:0xf5c518, helmet:0x37c6ff},
  alpine:       {name:'Azul/Rosa',           body:0x1560d0, bodyDark:0x0f4499, accent:0xff2f8e, trim:0xffffff, band:0xf5c518, helmet:0xff2f8e},
  haas:         {name:'Branco/Vermelho',     body:0xe9ebee, bodyDark:0xb9bcc2, accent:0xd11f2a, trim:0x14161a, band:0xf5c518, helmet:0xd11f2a},
  sauber:       {name:'Verde-neon',          body:0x00e142, bodyDark:0x00a531, accent:0x101010, trim:0x101010, band:0xf5c518, helmet:0x00e142},
  brasil:       {name:'Brasil (Lendas)',     body:0x0b7a3b, bodyDark:0x075027, accent:0xf5c518, trim:0x0b3fa3, band:0xf5c518, helmet:0xf5c518},
};

export function buildF1Car(opts={}){
  const team = TEAMS[opts.team] || TEAMS.ferrari;
  const col = Object.assign({
    carbon:0x121417, satin:0x0a0b0d, chrome:0xc7ccd6, tire:0x0e0f12,
    visor:0x10151f, number: opts.number||'16',
  }, team, opts);

  const G = new THREE.Group();

  // ---------- materiais ----------
  const paint = new THREE.MeshPhysicalMaterial({color:col.body, metalness:0.45, roughness:0.28, clearcoat:1.0, clearcoatRoughness:0.12});
  const paintD= new THREE.MeshPhysicalMaterial({color:col.bodyDark, metalness:0.45, roughness:0.3, clearcoat:1.0, clearcoatRoughness:0.15});
  const accent= new THREE.MeshPhysicalMaterial({color:col.accent, metalness:0.4, roughness:0.25, clearcoat:1.0, clearcoatRoughness:0.12});
  const carbon= new THREE.MeshStandardMaterial({color:col.carbon, metalness:0.35, roughness:0.5});
  const satin = new THREE.MeshStandardMaterial({color:col.satin, metalness:0.2, roughness:0.6});
  const wingMat=new THREE.MeshStandardMaterial({color:0x0d0f13, metalness:0.25, roughness:0.45});
  const tireMat=new THREE.MeshStandardMaterial({color:col.tire, metalness:0.0, roughness:0.88});
  const bandMat=new THREE.MeshStandardMaterial({color:col.band, metalness:0.0, roughness:0.5});
  const rimMat =new THREE.MeshStandardMaterial({color:0x1a1d22, metalness:0.7, roughness:0.35});
  const coverMat=new THREE.MeshPhysicalMaterial({color:col.body, metalness:0.5, roughness:0.3, clearcoat:1.0, clearcoatRoughness:0.15});
  const chrome= new THREE.MeshStandardMaterial({color:col.chrome, metalness:0.95, roughness:0.16});
  const titan = new THREE.MeshStandardMaterial({color:0x2a2d33, metalness:0.7, roughness:0.35});
  const glass = new THREE.MeshStandardMaterial({color:col.visor, metalness:0.5, roughness:0.1});

  const add=(geo,mat,x,y,z,rx=0,ry=0,rz=0,parent=G)=>{ const m=new THREE.Mesh(geo,mat);
    m.position.set(x,y,z); m.rotation.set(rx,ry,rz); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m; };
  const hex=c=>'#'+('000000'+(c>>>0).toString(16)).slice(-6);

  // ---------- decalque de pintura (fictício) ----------
  function liveryTexture(w=512,h=256){
    const c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d');
    x.fillStyle=hex(col.body); x.fillRect(0,0,w,h);
    x.fillStyle=hex(col.accent); x.beginPath(); x.moveTo(0,h*0.55); x.lineTo(w,h*0.30); x.lineTo(w,h*0.62); x.lineTo(0,h*0.82); x.closePath(); x.fill();
    x.fillStyle=hex(col.trim); x.beginPath(); x.moveTo(0,h*0.82); x.lineTo(w,h*0.62); x.lineTo(w,h*0.70); x.lineTo(0,h*0.90); x.closePath(); x.fill();
    // "patrocinadores" fictícios (sem marcas reais)
    x.fillStyle='#ffffff'; x.font='bold 44px Arial'; x.textBaseline='middle'; x.fillText('LENDAS', 24, h*0.30);
    x.fillStyle='#0b1a2e'; x.font='bold 28px Arial'; x.fillText('AVANTE', 300, h*0.44);
    x.fillStyle='#ffffff'; x.font='bold 24px Arial'; x.fillText('TUPÃ', 40, h*0.70);
    const t=new THREE.CanvasTexture(c); t.anisotropy=8; return t;
  }
  const liverySide=new THREE.MeshPhysicalMaterial({map:liveryTexture(), metalness:0.4, roughness:0.3, clearcoat:1.0, clearcoatRoughness:0.14});

  function numberTexture(n){
    const c=document.createElement('canvas'); c.width=c.height=256; const x=c.getContext('2d');
    x.fillStyle='#ffffff'; x.beginPath(); x.arc(128,128,92,0,7); x.fill();
    x.fillStyle=hex(col.body); x.font='bold 150px Arial'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(n,128,138);
    const t=new THREE.CanvasTexture(c); t.anisotropy=8; return t;
  }
  const numMat=new THREE.MeshStandardMaterial({map:numberTexture(col.number), transparent:true, roughness:0.4});

  /* ==================== ASSOALHO / EFEITO-SOLO ==================== */
  add(new THREE.BoxGeometry(1.55,0.06,4.9), carbon, 0,0.07,-0.15);
  for(const s of [-1,1]) add(new THREE.BoxGeometry(0.06,0.12,4.2), carbon, s*0.8,0.12,-0.1, 0,0,s*0.2);
  add(new THREE.BoxGeometry(1.45,0.42,0.85), carbon, 0,0.26,-2.5, -0.5,0,0);
  for(let i=-3;i<=3;i++) add(new THREE.BoxGeometry(0.025,0.4,0.8), satin, i*0.2,0.28,-2.49,-0.5,0,0);

  /* ==================== MONOCOQUE / CHASSI ==================== */
  const tub=new THREE.Group(); G.add(tub);
  add(new THREE.BoxGeometry(0.66,0.42,3.1), paint, 0,0.36,0.05,0,0,0,tub);
  add(new THREE.CylinderGeometry(0.33,0.33,3.1,24,1,false,0,Math.PI), paint, 0,0.55,0.05, 0,0,Math.PI/2, tub);
  add(new THREE.CylinderGeometry(0.16,0.33,1.2,20), paint, 0,0.44,1.75, Math.PI/2,0,0, tub);
  for(const s of [-1,1]) add(new THREE.PlaneGeometry(2.2,0.6), liverySide, s*0.345,0.45,0.2, 0, s*Math.PI/2, 0);

  /* ==================== NARIZ + ASA DIANTEIRA ==================== */
  const nose=new THREE.Group(); G.add(nose);
  const noseM=add(new THREE.CylinderGeometry(0.09,0.2,1.9,20), paint, 0,0.34,2.55, Math.PI/2,0,0, nose); noseM.scale.set(1,1,0.85);
  add(new THREE.SphereGeometry(0.09,16,12), accent, 0,0.30,3.48, 0,0,0, nose);
  add(new THREE.BoxGeometry(0.1,0.34,0.5), carbon, 0,0.14,3.15);

  const fw=new THREE.Group(); fw.position.set(0,0,3.28); G.add(fw);
  const flap=(y,z,depth,rot,mat)=> add(new THREE.BoxGeometry(1.95,0.028,depth), mat, 0,y,z, rot,0,0, fw);
  flap(0.08,0.10,0.34,-0.06,wingMat);
  flap(0.135,-0.02,0.28,-0.22,wingMat);
  flap(0.19,-0.14,0.22,-0.4,accent);
  flap(0.245,-0.24,0.18,-0.6,wingMat);
  for(const s of [-1,1]){
    add(new THREE.BoxGeometry(0.03,0.3,0.6), carbon, s*0.97,0.16,-0.05, 0,0,s*0.18, fw);
    add(new THREE.BoxGeometry(0.03,0.12,0.5), accent, s*0.99,0.33,-0.05, 0,0,s*0.28, fw);
  }

  /* ==================== SIDEPODS + RADIADORES ==================== */
  for(const s of [-1,1]){
    const sp=new THREE.Group(); sp.position.set(s*0.52,0.36,-0.5); G.add(sp);
    add(new THREE.BoxGeometry(0.52,0.5,2.0), paint, 0,0,0, 0,0,0, sp);
    add(new THREE.BoxGeometry(0.52,0.26,2.0), paintD, s*0.02,0.2,-0.15, 0.12,0,s*0.16, sp);
    add(new THREE.BoxGeometry(0.16,0.36,0.14), satin, s*-0.2,0.02,0.98, 0,0,0, sp);
    add(new THREE.BoxGeometry(0.02,0.32,0.02), chrome, s*-0.28,0.02,0.99, 0,0,0, sp);
    add(new THREE.BoxGeometry(0.2,0.12,0.1), satin, 0,0.16,-1.0, 0,0,0, sp);
    add(new THREE.PlaneGeometry(1.5,0.42), liverySide, s*0.27,0.02,-0.05, 0, s*Math.PI/2, 0, sp);
    add(new THREE.PlaneGeometry(0.4,0.4), numMat, s*0.271,0.12,0.55, 0, s*Math.PI/2, 0, sp);
  }

  /* ==================== COCKPIT + PILOTO + HALO ==================== */
  add(new THREE.BoxGeometry(0.52,0.22,0.95), satin, 0,0.54,0.55);
  const helmet=new THREE.Group(); helmet.position.set(0,0.68,0.5); G.add(helmet);
  add(new THREE.SphereGeometry(0.16,22,18), new THREE.MeshStandardMaterial({color:col.helmet,metalness:0.35,roughness:0.3}), 0,0,0,0,0,0,helmet);
  add(new THREE.BoxGeometry(0.28,0.085,0.14), glass, 0,0.0,0.12, 0,0,0, helmet);
  add(new THREE.TorusGeometry(0.16,0.022,10,26), new THREE.MeshStandardMaterial({color:col.bodyDark}), 0,0.03,0, Math.PI/2,0,0, helmet);
  add(new THREE.CylinderGeometry(0.03,0.03,0.1,8), satin, 0,-0.02,0.15, Math.PI/2,0,0, helmet);
  add(new THREE.BoxGeometry(0.46,0.36,0.32), paintD, 0,0.64,0.2);

  const haloArc=add(new THREE.TorusGeometry(0.42,0.038,14,30,Math.PI), titan, 0,0.6,0.4, 0,0,0);
  add(new THREE.CylinderGeometry(0.04,0.05,0.4,12), titan, 0,0.62,1.0, 0.12,0,0);
  for(const s of [-1,1]) add(new THREE.CylinderGeometry(0.038,0.038,1.05,12), titan, s*0.42,0.63,0.05, Math.PI/2,0,0);

  for(const s of [-1,1]){ add(new THREE.CylinderGeometry(0.02,0.02,0.24,8), carbon, s*0.36,0.6,0.62, 0,0,Math.PI/2);
    add(new THREE.BoxGeometry(0.13,0.07,0.04), satin, s*0.5,0.62,0.6, 0,-s*0.3,0);
    add(new THREE.BoxGeometry(0.11,0.055,0.01), chrome, s*0.5,0.62,0.622, 0,-s*0.3,0); }

  /* ==================== AIRBOX + TAMPA DO MOTOR ==================== */
  add(new THREE.CylinderGeometry(0.15,0.22,0.55,18), paint, 0,0.9,0.02, 0,0,0);
  add(new THREE.CircleGeometry(0.13,18), satin, 0,0.98,0.12, -0.35,0,0);
  add(new THREE.BoxGeometry(0.05,0.05,0.12), carbon, 0,1.14,0.02);
  add(new THREE.SphereGeometry(0.03,10,8), satin, 0,1.17,0.08);
  const cover=add(new THREE.CylinderGeometry(0.06,0.28,2.3,20), paint, 0,0.64,-1.25, Math.PI/2,0,0); cover.scale.set(1,1,0.9);
  add(new THREE.BoxGeometry(0.06,0.1,2.0), accent, 0,0.82,-1.2, 0.06,0,0);   // faixa central da tampa

  /* ==================== ASA TRASEIRA (tamanho real) + BEAM WING ==================== */
  const rw=new THREE.Group(); rw.position.set(0,0,-2.5); G.add(rw);
  const RWW=1.0;                                   // largura real da asa (~1 m)
  // plano principal (mainplane) — corda grande, bem no alto
  add(new THREE.BoxGeometry(RWW,0.08,0.34), wingMat, 0,1.06,0.0, 0.26,0,0, rw);
  // flap superior (DRS)
  add(new THREE.BoxGeometry(RWW,0.06,0.26), accent, 0,1.30,-0.16, 0.5,0,0, rw);
  // endplates altos
  for(const s of [-1,1]){
    add(new THREE.BoxGeometry(0.05,0.78,0.62), carbon, s*(RWW/2),1.02,-0.02, 0,0,0, rw);
    add(new THREE.BoxGeometry(0.05,0.18,0.34), accent, s*(RWW/2),1.42,-0.08, 0,0,s*0.45, rw); // ponta enrolada
  }
  // pilares swan-neck segurando o mainplane
  for(const s of [-1,1]) add(new THREE.BoxGeometry(0.05,0.5,0.14), carbon, s*0.16,0.82,0.08, 0.1,0,0, rw);
  // beam wing (embaixo)
  add(new THREE.BoxGeometry(0.86,0.05,0.24), wingMat, 0,0.66,0.05, 0.2,0,0, rw);
  // luz de chuva vermelha (embaixo, no centro)
  add(new THREE.BoxGeometry(0.1,0.09,0.06), new THREE.MeshStandardMaterial({color:0xff2222,emissive:0x550000,emissiveIntensity:1}), 0,0.72,0.1,0,0,0, rw);
  // estrutura de impacto traseira + escape
  add(new THREE.CylinderGeometry(0.06,0.09,0.5,12), carbon, 0,0.5,-2.75, Math.PI/2,0,0);
  add(new THREE.CylinderGeometry(0.05,0.055,0.18,14), chrome, 0,0.52,-3.02, Math.PI/2,0,0);

  /* ==================== RODAS ==================== */
  const wheels={};
  function makeWheel(x,z,width,steer,front){
    const R=0.36;
    const steerPivot=new THREE.Group(); steerPivot.position.set(x,R,z); G.add(steerPivot);
    const spin=new THREE.Group(); steerPivot.add(spin);
    const tire=new THREE.Mesh(new THREE.CylinderGeometry(R,R,width,36), tireMat);
    tire.rotation.z=Math.PI/2; tire.castShadow=true; spin.add(tire);
    for(const sy of [-1,1]){ const sh=new THREE.Mesh(new THREE.TorusGeometry(R*0.96,width*0.14,10,28), tireMat);
      sh.rotation.y=Math.PI/2; sh.position.x=sy*width*0.42; spin.add(sh); }
    const band=new THREE.Mesh(new THREE.CylinderGeometry(R*1.004,R*1.004,width*0.14,36), bandMat);
    band.rotation.z=Math.PI/2; band.position.x=width*0.2; spin.add(band);
    const rim=new THREE.Mesh(new THREE.CylinderGeometry(R*0.63,R*0.63,width*0.86,28), rimMat);
    rim.rotation.z=Math.PI/2; spin.add(rim);
    for(const sx of [-1,1]){ const cap=new THREE.Mesh(new THREE.CircleGeometry(R*0.62,28), coverMat);
      cap.position.x=sx*width*0.44; cap.rotation.y=sx>0?Math.PI/2:-Math.PI/2; spin.add(cap);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(R*0.5,0.02,8,28), chrome);
      ring.position.x=sx*width*0.45; ring.rotation.y=Math.PI/2; spin.add(ring); }
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(R*0.16,R*0.16,width*0.9,12), chrome);
    hub.rotation.z=Math.PI/2; spin.add(hub);
    const duct=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.34,0.34), satin);
    duct.position.set(-Math.sign(x)*width*0.5,0,0); steerPivot.add(duct);
    if(front){ const wl=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.03,0.5), wingMat);
      wl.position.set(0,R*0.9,0); steerPivot.add(wl); }
    const sgn=Math.sign(x)||1; const inner=Math.abs(x)-0.33;
    const arm=(y,zoff,len)=>{ const a=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,len,8), carbon);
      a.position.set(-sgn*len/2,y,zoff); a.rotation.z=Math.PI/2; steerPivot.add(a); };
    arm(-0.12,0.22,inner); arm(-0.12,-0.22,inner);
    arm(0.14,0.2,inner);   arm(0.14,-0.2,inner);
    const pr=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,Math.hypot(inner,0.3),8), carbon);
    pr.position.set(-sgn*inner/2,0.02,0); pr.rotation.z=Math.PI/2-sgn*0.6; steerPivot.add(pr);
    arm(0.0,front?0.28:-0.28,inner);
    return {steerPivot,spin,steer};
  }
  wheels.fl=makeWheel(-0.83, 1.8, 0.305, true,  true);
  wheels.fr=makeWheel( 0.83, 1.8, 0.305, true,  true);
  wheels.rl=makeWheel(-0.80,-1.8, 0.405, false, false);
  wheels.rr=makeWheel( 0.80,-1.8, 0.405, false, false);

  G.userData.wheels=wheels;
  G.userData.radius={front:0.36, rear:0.36};
  G.userData.team=col.name;
  return G;
}
