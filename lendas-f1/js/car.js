/* ========================================================================
   LENDAS DA F1 — carro de Fórmula 1 procedural (Three.js)
   Detalhado: nariz afilado, asa dianteira multielemento, monocoque, cockpit
   com halo, airbox, sidepods, asa traseira, difusor, rodas abertas + suspensão.
   Escala real (~5.5m comprimento, ~2.0m largura, entre-eixos ~3.3m).
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';

export function buildF1Car(opts={}){
  const col = Object.assign({
    body:0x0e5c34, bodyDark:0x0a3d24, accent:0xf2c400, trim:0x123a8a,
    carbon:0x14171c, wing:0x0d0f13, rim:0x1b1e24, rimShine:0xc7ccd6,
    tire:0x111317, tireBand:0xd21f2a, helmet:0xf2c400, visor:0x0a0a12, number:'10',
  }, opts);

  const G = new THREE.Group();
  const M = (c,m=0.35,r=0.4,extra={})=> new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:m,roughness:r},extra));
  const paint   = M(col.body, 0.35, 0.28);
  const paintD  = M(col.bodyDark, 0.35, 0.30);
  const accent  = M(col.accent, 0.4, 0.25);
  const trim    = M(col.trim, 0.4, 0.3);
  const carbon  = M(col.carbon, 0.25, 0.5);
  const wingMat = M(col.wing, 0.2, 0.45);
  const tireMat = M(col.tire, 0.0, 0.85);
  const bandMat = M(col.tireBand, 0.0, 0.6);
  const rimMat  = M(col.rim, 0.7, 0.35);
  const rimShine= M(col.rimShine, 0.9, 0.2);
  const chrome  = M(0x9aa0aa, 0.95, 0.15);
  const black   = M(0x0a0b0d, 0.3, 0.6);

  const add=(geo,mat,x,y,z,rx=0,ry=0,rz=0,parent=G)=>{ const m=new THREE.Mesh(geo,mat);
    m.position.set(x,y,z); m.rotation.set(rx,ry,rz); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m; };

  /* ---------- FLOOR / ASSOALHO ---------- */
  add(new THREE.BoxGeometry(1.5,0.05,4.6), carbon, 0,0.09,-0.1);
  // difusor (sobe atrás)
  const diff=add(new THREE.BoxGeometry(1.35,0.35,0.7), carbon, 0,0.22,-2.35, -0.5,0,0);
  for(let i=-2;i<=2;i++) add(new THREE.BoxGeometry(0.03,0.34,0.66), black, i*0.28,0.24,-2.34,-0.5,0,0);

  /* ---------- MONOCOQUE / CHASSI ---------- */
  // tub central (afilando)
  const tub=new THREE.Group(); G.add(tub);
  add(new THREE.BoxGeometry(0.62,0.36,3.0), paint, 0,0.34,0.05,0,0,0,tub);
  // topo arredondado do tub
  add(new THREE.CylinderGeometry(0.30,0.30,3.0,20,1,false,0,Math.PI), paint, 0,0.5,0.05, 0,0,Math.PI/2, tub).scale.set(1,1,1);
  // faixa de cor (accent) na lateral
  add(new THREE.BoxGeometry(0.64,0.1,2.6), accent, 0,0.42,0.1);

  /* ---------- NARIZ ---------- */
  // nariz longo afilando pra frente e pra baixo
  const nose=new THREE.Group(); G.add(nose);
  const noseGeo=new THREE.CylinderGeometry(0.05,0.24,2.0,18);
  const noseM=add(noseGeo, paint, 0,0.32,2.35, Math.PI/2,0,0, nose); noseM.scale.set(1,1,0.8);
  add(new THREE.ConeGeometry(0.06,0.2,16), accent, 0,0.30,3.32, Math.PI/2,0,0, nose); // ponta
  // pilar central da asa
  add(new THREE.BoxGeometry(0.08,0.28,0.5), carbon, 0,0.16,3.05);

  /* ---------- ASA DIANTEIRA (multielemento) ---------- */
  const fw=new THREE.Group(); fw.position.set(0,0,3.15); G.add(fw);
  // planos principais (levemente inclinados)
  add(new THREE.BoxGeometry(1.9,0.03,0.34), wingMat, 0,0.10,0, -0.12,0,0, fw);
  add(new THREE.BoxGeometry(1.9,0.03,0.26), wingMat, 0,0.17,-0.12, -0.30,0,0, fw);
  add(new THREE.BoxGeometry(1.9,0.03,0.18), accent, 0,0.235,-0.22, -0.5,0,0, fw);
  // endplates
  for(const s of [-1,1]){ add(new THREE.BoxGeometry(0.03,0.26,0.5), carbon, s*0.94,0.16,-0.05,0,0,0, fw);
    add(new THREE.BoxGeometry(0.03,0.1,0.5), accent, s*0.945,0.30,-0.05,0,0,0, fw); }

  /* ---------- SIDEPODS ---------- */
  for(const s of [-1,1]){
    const sp=new THREE.Group(); sp.position.set(s*0.5,0.36,-0.55); G.add(sp);
    // corpo do sidepod (afilando pra trás)
    const body=add(new THREE.BoxGeometry(0.5,0.44,1.9), paint, 0,0,0, 0,0,0, sp); body.scale.set(1,1,1);
    // chanfro superior
    add(new THREE.BoxGeometry(0.5,0.2,1.9), paintD, s*0.02,0.16,0, 0,0,s*0.18, sp);
    // entrada de ar (radiador)
    add(new THREE.BoxGeometry(0.12,0.34,0.16), black, s*-0.22,0.0,0.92, 0,0,0, sp);
    add(new THREE.BoxGeometry(0.02,0.3,0.02), chrome, s*-0.29,0.0,0.92, 0,0,0, sp);
    // faixa accent
    add(new THREE.BoxGeometry(0.52,0.08,1.6), accent, 0,0.12,-0.05, 0,0,0, sp);
    // número
  }

  /* ---------- COCKPIT + PILOTO + HALO ---------- */
  // abertura do cockpit
  add(new THREE.BoxGeometry(0.5,0.2,0.9), black, 0,0.52,0.5);
  // capacete do piloto
  const helmet=new THREE.Group(); helmet.position.set(0,0.66,0.45); G.add(helmet);
  add(new THREE.SphereGeometry(0.17,20,16), M(col.helmet,0.3,0.3), 0,0,0,0,0,0,helmet);
  add(new THREE.BoxGeometry(0.30,0.09,0.16), M(col.visor,0.5,0.15,{}), 0,0.0,0.13,0,0,0,helmet); // viseira
  add(new THREE.TorusGeometry(0.17,0.02,10,24), accent, 0,0.02,0,Math.PI/2,0,0,helmet); // faixa
  // encosto / proteção atrás da cabeça
  add(new THREE.BoxGeometry(0.44,0.34,0.3), paintD, 0,0.62,0.15);

  // HALO (titânio) — arco central + laterais
  const haloMat = M(0x1c1f26, 0.6, 0.35);
  const pillar=add(new THREE.CylinderGeometry(0.035,0.045,0.42,10), haloMat, 0,0.66,0.95); pillar.rotation.x=0.1;
  // arco frontal do halo
  const haloArc=add(new THREE.TorusGeometry(0.42,0.035,12,28,Math.PI), haloMat, 0,0.62,0.35, 0,0,0);
  haloArc.scale.set(1.02,1.0,1.0);
  // barras laterais do halo indo até trás
  for(const s of [-1,1]){ const bar=add(new THREE.CylinderGeometry(0.035,0.035,1.0,10), haloMat, s*0.42,0.66,0.02, Math.PI/2*1.0,0,0);
    bar.rotation.x=Math.PI/2; }

  /* ---------- AIRBOX + ENGINE COVER ---------- */
  // roll hoop / entrada de ar acima do piloto
  add(new THREE.CylinderGeometry(0.14,0.2,0.5,16), paint, 0,0.86,-0.05, 0,0,0);
  add(new THREE.CircleGeometry(0.12,16), black, 0,0.92,0.06, -0.3,0,0);
  // engine cover afilando pra trás e pra baixo
  const cover=new THREE.Group(); G.add(cover);
  const cg=new THREE.CylinderGeometry(0.05,0.26,2.2,18);
  const cm=add(cg, paint, 0,0.62,-1.2, Math.PI/2,0,0, cover); cm.scale.set(1,1,0.9);
  add(new THREE.BoxGeometry(0.1,0.06,2.0), accent, 0,0.78,-1.15, 0.08,0,0); // shark fin base stripe
  // shark fin
  add(new THREE.BoxGeometry(0.03,0.28,1.4), paintD, 0,0.66,-1.7);

  /* ---------- ASA TRASEIRA ---------- */
  const rw=new THREE.Group(); rw.position.set(0,0,-2.5); G.add(rw);
  add(new THREE.BoxGeometry(1.0,0.04,0.34), wingMat, 0,0.92,0, 0.34,0,0, rw);   // plano principal
  add(new THREE.BoxGeometry(1.0,0.03,0.2), accent, 0,1.02,-0.14, 0.5,0,0, rw);  // flap (DRS)
  for(const s of [-1,1]) add(new THREE.BoxGeometry(0.03,0.5,0.5), carbon, s*0.5,0.82,-0.02,0,0,0, rw); // endplates
  // pilar/estrutura de sustentação
  add(new THREE.BoxGeometry(0.08,0.5,0.1), carbon, 0,0.68,0.02, 0,0,0, rw);
  // luz de chuva vermelha
  add(new THREE.BoxGeometry(0.08,0.08,0.06), M(0xff2020,0,0.4,{emissive:0x660000}), 0,0.5,-0.02,0,0,0, rw);

  /* ---------- RODAS (abertas) + SUSPENSÃO ---------- */
  const wheels={};
  function makeWheel(x,z,radius,width,steer){
    const steerPivot=new THREE.Group(); steerPivot.position.set(x,radius,z); G.add(steerPivot);
    const spin=new THREE.Group(); steerPivot.add(spin);
    // pneu
    const tire=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,width,28), tireMat);
    tire.rotation.z=Math.PI/2; tire.castShadow=true; spin.add(tire);
    // faixa colorida (Pirelli)
    const band=new THREE.Mesh(new THREE.CylinderGeometry(radius*1.002,radius*1.002,width*0.18,28), bandMat);
    band.rotation.z=Math.PI/2; spin.add(band);
    // aro
    const rim=new THREE.Mesh(new THREE.CylinderGeometry(radius*0.62,radius*0.62,width*0.9,24), rimMat);
    rim.rotation.z=Math.PI/2; spin.add(rim);
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(radius*0.18,radius*0.18,width*0.95,16), rimShine);
    hub.rotation.z=Math.PI/2; spin.add(hub);
    // raios
    for(let i=0;i<6;i++){ const sp2=new THREE.Mesh(new THREE.BoxGeometry(radius*1.0,0.03,0.03), rimShine);
      sp2.rotation.x=i*Math.PI/6; spin.add(sp2); }
    // suspensão (wishbones) do corpo até a roda
    const sgn=Math.sign(x)||1;
    const arm=(y,zoff)=>{ const a=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,Math.abs(x)-0.28,8), carbon);
      a.position.set(-sgn*(Math.abs(x)-0.28)/2,y,zoff); a.rotation.z=Math.PI/2; steerPivot.add(a); };
    arm(0.02,0.18); arm(0.02,-0.18); arm(0.12,0.0);
    return {steerPivot,spin,steer};
  }
  wheels.fl=makeWheel(-0.82,1.65,0.33,0.30,true);
  wheels.fr=makeWheel( 0.82,1.65,0.33,0.30,true);
  wheels.rl=makeWheel(-0.82,-1.6,0.37,0.42,false);
  wheels.rr=makeWheel( 0.82,-1.6,0.37,0.42,false);

  G.userData.wheels=wheels;
  G.userData.radius={front:0.33,rear:0.37};
  return G;
}
