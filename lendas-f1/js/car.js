/* ========================================================================
   LENDAS DA F1 — carro de Fórmula 1 procedural detalhado (Three.js)
   Anatomia de um F1 moderno (regras efeito-solo 2022+), em escala real:
   comprimento ~5.5 m, largura 2.0 m, entre-eixos ~3.6 m, pneus Ø720 mm
   (dianteiro 305 / traseiro 405 mm), aros 18".
   Pinturas nas CORES das equipes reais (Ferrari, McLaren, Mercedes...),
   com decalques próprios/fictícios e número — sem copiar logos/marcas.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';

/* Grid completo — CORES das equipes reais, com nomes PRÓPRIOS (evocam pela
   cor, sem copiar a marca) e patrocinadores 100% fictícios. Nada de logo real. */
export const TEAMS = {
  ferrari:  {name:'Rossa Corse',   body:0xd50000, bodyDark:0x8a0000, accent:0xf5e000, trim:0x151515, band:0xf5c518, helmet:0xf5e000, num:'16', sponsor:'AVANTE'},
  mclaren:  {name:'Papaia GP',     body:0xff6a13, bodyDark:0xc44a00, accent:0x0b2233, trim:0x1a86c8, band:0xf5c518, helmet:0xff6a13, num:'4',  sponsor:'VELOZ'},
  mercedes: {name:'Flecha Prata',  body:0x1b2026, bodyDark:0x0c0e11, accent:0x00d7c2, trim:0xc0c6cf, band:0xf5c518, helmet:0x00d7c2, num:'63', sponsor:'OLIMAX'},
  redbull:  {name:'Touro Alado',   body:0x0b1a48, bodyDark:0x081233, accent:0xda291c, trim:0xf5c518, band:0xf5c518, helmet:0xda291c, num:'1',  sponsor:'ENERGIA'},
  aston:    {name:'Verde Albion',  body:0x00594f, bodyDark:0x003b34, accent:0xcedc00, trim:0xcedc00, band:0xf5c518, helmet:0xcedc00, num:'14', sponsor:'ARAMIS'},
  williams: {name:'Grove Azul',    body:0x1a3fd0, bodyDark:0x122a8c, accent:0x37c6ff, trim:0xffffff, band:0xf5c518, helmet:0x37c6ff, num:'23', sponsor:'ATLANTIS'},
  alpine:   {name:'Alpes Racing',  body:0x123f9e, bodyDark:0x0d2f77, accent:0xff2f8e, trim:0xffffff, band:0xf5c518, helmet:0xff2f8e, num:'10', sponsor:'MONTANHA'},
  haas:     {name:'Falcão GP',     body:0xe9ebee, bodyDark:0xb9bcc2, accent:0xd11f2a, trim:0x14161a, band:0xf5c518, helmet:0xd11f2a, num:'20', sponsor:'NIMBUS'},
  sauber:   {name:'Neon GP',       body:0x00e142, bodyDark:0x00a531, accent:0x101418, trim:0x101418, band:0xf5c518, helmet:0x00e142, num:'27', sponsor:'VOLTZ'},
  brasil:   {name:'Brasil Lendas', body:0x0b7a3b, bodyDark:0x075027, accent:0xf5c518, trim:0x0b3fa3, band:0xf5c518, helmet:0xf5c518, num:'10', sponsor:'LENDAS'},
};

export function buildF1Car(opts={}){
  const team = TEAMS[opts.team] || TEAMS.ferrari;
  const col = Object.assign({
    carbon:0x121417, satin:0x0a0b0d, chrome:0xc7ccd6, tire:0x0e0f12,
    visor:0x10151f, number: opts.number || team.num || '10',
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

  // ---------- decalque de pintura (livery fictícia, caprichada) ----------
  const lum=c=>((c>>16&255)*0.299+(c>>8&255)*0.587+(c&255)*0.114);
  function liveryTexture(w=512,h=256){
    const c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d');
    const ink = lum(col.body)>140 ? '#12161b' : '#ffffff';
    const accHex=hex(col.accent), trimHex=hex(col.trim);
    x.fillStyle=hex(col.body); x.fillRect(0,0,w,h);
    // swoosh de cor (accent) — curva bonita
    x.fillStyle=accHex; x.beginPath();
    x.moveTo(0,h*0.50); x.quadraticCurveTo(w*0.5,h*0.28,w,h*0.34); x.lineTo(w,h*0.58);
    x.quadraticCurveTo(w*0.5,h*0.54,0,h*0.78); x.closePath(); x.fill();
    // fio de trim
    x.strokeStyle=trimHex; x.lineWidth=7; x.beginPath();
    x.moveTo(0,h*0.81); x.quadraticCurveTo(w*0.5,h*0.58,w,h*0.64); x.stroke();
    // wordmark da equipe
    x.fillStyle=ink; x.textBaseline='middle'; x.textAlign='left';
    x.font='800 46px Arial'; x.fillText((col.name||'LENDAS').toUpperCase(), 22, h*0.25);
    // patrocinador principal (fictício)
    x.font='bold 30px Arial'; x.fillText(col.sponsor||'AVANTE', 286, h*0.42);
    // logo fictício 1: hexágono com inicial
    const hx=64, hy=h*0.72, hr=24;
    x.fillStyle=accHex; x.beginPath();
    for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6; x[i?'lineTo':'moveTo'](hx+hr*Math.cos(a),hy+hr*Math.sin(a));}
    x.closePath(); x.fill();
    x.fillStyle=hex(col.body); x.font='800 26px Arial'; x.textAlign='center';
    x.fillText((col.sponsor||'A')[0], hx, hy+1);
    // logo fictício 2: badge "TURBO"
    x.fillStyle=ink; roundR(x,110,h*0.64,116,32,8); x.fillStyle=hex(col.body);
    x.font='800 20px Arial'; x.fillText('TURBO', 168, h*0.64+17);
    // logo fictício 3: raio + "NITRO"
    x.fillStyle=accHex; x.beginPath();
    x.moveTo(262,h*0.62); x.lineTo(250,h*0.75); x.lineTo(260,h*0.75); x.lineTo(252,h*0.86);
    x.lineTo(276,h*0.71); x.lineTo(266,h*0.71); x.closePath(); x.fill();
    x.fillStyle=ink; x.textAlign='left'; x.font='bold 22px Arial'; x.fillText('NITRO', 286, h*0.74);
    const t=new THREE.CanvasTexture(c); t.anisotropy=8; return t;
  }
  function roundR(x,px,py,pw,ph,r){ x.beginPath(); x.moveTo(px+r,py); x.arcTo(px+pw,py,px+pw,py+ph,r);
    x.arcTo(px+pw,py+ph,px,py+ph,r); x.arcTo(px,py+ph,px,py,r); x.arcTo(px,py,px+pw,py,r); x.closePath(); x.fill(); }
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
  // corpo/topo arredondado do monocoque — AO LONGO do carro (frente-trás)
  add(new THREE.CylinderGeometry(0.3,0.3,3.0,24), paint, 0,0.5,0.05, Math.PI/2,0,0, tub);
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
  add(new THREE.CylinderGeometry(0.14,0.2,0.48,18), paint, 0,0.8,0.02, 0,0,0);
  add(new THREE.CircleGeometry(0.12,18), satin, 0,0.87,0.12, -0.35,0,0);
  add(new THREE.BoxGeometry(0.05,0.05,0.12), carbon, 0,1.0,0.02);
  add(new THREE.SphereGeometry(0.03,10,8), satin, 0,1.03,0.08);
  const cover=add(new THREE.CylinderGeometry(0.06,0.28,2.3,20), paint, 0,0.64,-1.25, Math.PI/2,0,0); cover.scale.set(1,1,0.9);
  add(new THREE.BoxGeometry(0.06,0.1,2.0), accent, 0,0.82,-1.2, 0.06,0,0);   // faixa central da tampa

  /* ==================== TRASEIRA: engine cover afilando (coke-bottle) ==================== */
  // estreitamento do corpo antes da asa (a "cintura" do F1)
  add(new THREE.CylinderGeometry(0.2,0.07,1.0,16), paint, 0,0.5,-2.05, Math.PI/2,0,0);
  // saída de ar quente atrás dos sidepods
  for(const s of [-1,1]) add(new THREE.BoxGeometry(0.14,0.16,0.2), satin, s*0.22,0.42,-1.85);

  /* ==================== ASA TRASEIRA (largura real 1,23 m) + BEAM WING ==================== */
  const rw=new THREE.Group(); rw.position.set(0,0,-2.5); G.add(rw);
  const RWW=1.23;                                  // largura REAL da asa traseira (2022+)
  // endplates retangulares limpos (sem abas pra fora)
  for(const s of [-1,1]){
    add(new THREE.BoxGeometry(0.04,0.5,0.6), carbon, s*(RWW/2),0.86,0.0, 0,0,0, rw);
    add(new THREE.BoxGeometry(0.05,0.46,0.05), accent, s*(RWW/2),0.86,0.29, 0,0,0, rw);   // faixa de cor no bordo
  }
  // plano principal (mainplane) — corda grande, inclinado
  add(new THREE.BoxGeometry(RWW-0.04,0.05,0.34), wingMat, 0,0.84,0.03, 0.22,0,0, rw);
  // flap superior (DRS) com fenda acima e atrás
  add(new THREE.BoxGeometry(RWW-0.04,0.045,0.24), wingMat, 0,1.0,-0.13, 0.5,0,0, rw);
  add(new THREE.BoxGeometry(RWW-0.04,0.02,0.24), accent, 0,1.015,-0.13, 0.5,0,0, rw);      // aresta de cor
  // swan-neck: dois pilares finos do corpo até o mainplane (por cima)
  for(const s of [-1,1]) add(new THREE.BoxGeometry(0.045,0.34,0.16), carbon, s*0.18,0.66,0.08, 0.14,0,0, rw);
  // beam wing (embaixo, acima do difusor)
  add(new THREE.BoxGeometry(1.0,0.05,0.22), wingMat, 0,0.56,0.06, 0.25,0,0, rw);
  // luz de chuva vermelha (central, embaixo)
  add(new THREE.BoxGeometry(0.09,0.12,0.05), new THREE.MeshStandardMaterial({color:0xff2222,emissive:0x550000,emissiveIntensity:1}), 0,0.6,0.14,0,0,0, rw);
  // estrutura de impacto traseira + ponteira do escape
  add(new THREE.CylinderGeometry(0.07,0.1,0.55,12), carbon, 0,0.5,-2.78, Math.PI/2,0,0);
  add(new THREE.CylinderGeometry(0.05,0.055,0.2,14), chrome, 0,0.52,-3.08, Math.PI/2,0,0);

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
    for(const sx of [-1,1]){
      const cap=new THREE.Mesh(new THREE.CircleGeometry(R*0.62,28), coverMat);
      cap.position.x=sx*width*0.44; cap.rotation.y=sx>0?Math.PI/2:-Math.PI/2; spin.add(cap);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(R*0.5,0.02,8,28), chrome);
      ring.position.x=sx*width*0.45; ring.rotation.y=Math.PI/2; spin.add(ring);
      // desenho do aro (raios) — deixa a ROTAÇÃO bem visível
      for(let k=0;k<5;k++){ const spoke=new THREE.Mesh(new THREE.BoxGeometry(0.025,R*1.02,0.02), chrome);
        spoke.position.x=sx*width*0.465; spoke.rotation.x=k*Math.PI*2/5; spin.add(spoke); }
      // marca de cor fora do centro (giro fica óbvio)
      const mk=new THREE.Mesh(new THREE.BoxGeometry(0.035,R*0.32,0.035), accent);
      mk.position.set(sx*width*0.47, R*0.3, 0); spin.add(mk);
    }
    // segmento colorido na banda de rodagem (marca do pneu que gira)
    const seg=new THREE.Mesh(new THREE.BoxGeometry(width*0.6,0.03,0.06), bandMat);
    seg.position.set(0,R*0.99,0); spin.add(seg);
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
