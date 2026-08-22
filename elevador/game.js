// =============================================================================
// O Elevador — terror/puzzle em 1ª pessoa. Arraste p/ olhar, toque p/ interagir.
// =============================================================================
import * as THREE from './vendor/three.module.js';
import { EffectComposer } from './vendor/jsm/postprocessing/EffectComposer.js';
import { RenderPass }     from './vendor/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass }from './vendor/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass }     from './vendor/jsm/postprocessing/OutputPass.js';

const $ = id => document.getElementById(id);
const W=2.6, H=2.7, D=2.2;                       // dimensões internas do elevador

// ---- render ----
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.18;   // resposta de luz cinematográfica
const scene=new THREE.Scene(); scene.background=new THREE.Color('#05060a');
scene.fog=new THREE.FogExp2('#05060a', 0.075);
const camera=new THREE.PerspectiveCamera(74, 1, 0.03, 60);
camera.position.set(0, 1.55, 0);

// ---- pós-processamento: bloom real (glow do display, botões, lâmpada) ----
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(1,1), 0.62, 0.55, 0.55);  // força, raio, limiar
composer.addPass(bloom);
composer.addPass(new OutputPass());

// ---- ambiente (PMREM): dá reflexo de verdade aos metais ----
function envSceneTex(){
  const cv=document.createElement('canvas'); cv.width=512; cv.height=256; const g=cv.getContext('2d');
  const grad=g.createLinearGradient(0,0,0,256); grad.addColorStop(0,'#12151d'); grad.addColorStop(0.45,'#1b1712'); grad.addColorStop(1,'#050506');
  g.fillStyle=grad; g.fillRect(0,0,512,256);
  const spot=g.createRadialGradient(256,34,4,256,34,150); spot.addColorStop(0,'#ffe9bd'); spot.addColorStop(0.6,'#5a4a34'); spot.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=spot; g.fillRect(0,0,512,170);
  const t=new THREE.CanvasTexture(cv); t.mapping=THREE.EquirectangularReflectionMapping; t.colorSpace=THREE.SRGBColorSpace; return t;
}
const pmrem=new THREE.PMREMGenerator(renderer); pmrem.compileEquirectangularShader();
const envMap=pmrem.fromEquirectangular(envSceneTex()).texture; scene.environment=envMap;

// ---- texturas de metal (cor + relevo), maior resolução ----
function metalTex(base='#26221d', seams=6, streaks=true){
  const s=512, cv=document.createElement('canvas'); cv.width=cv.height=s; const g=cv.getContext('2d');
  g.fillStyle=base; g.fillRect(0,0,s,s);
  // manchas grandes de sujeira
  for(let i=0;i<26;i++){ const x=Math.random()*s,y=Math.random()*s,r=20+Math.random()*80;
    const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,`rgba(0,0,0,${0.04+Math.random()*0.06})`); rg.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=rg; g.fillRect(x-r,y-r,r*2,r*2); }
  // grão fino
  for(let i=0;i<9000;i++){ const a=Math.random()*0.05; g.fillStyle=`rgba(${Math.random()<0.5?'0,0,0':'255,255,255'},${a})`; g.fillRect(Math.random()*s,Math.random()*s,1,1); }
  // escorridos verticais (ferrugem/umidade)
  if(streaks) for(let i=0;i<40;i++){ const x=Math.random()*s, len=40+Math.random()*180, y=Math.random()*s;
    g.strokeStyle=`rgba(10,6,4,${0.05+Math.random()*0.12})`; g.lineWidth=0.6+Math.random()*1.4; g.beginPath(); g.moveTo(x,y); g.lineTo(x+ (Math.random()-0.5)*4, y+len); g.stroke(); }
  // juntas de painel
  g.lineWidth=3;
  for(let i=1;i<seams;i++){ const x=i*s/seams; g.strokeStyle='#0008'; g.beginPath(); g.moveTo(x,0); g.lineTo(x,s); g.stroke();
    g.strokeStyle='#ffffff10'; g.beginPath(); g.moveTo(x+2,0); g.lineTo(x+2,s); g.stroke(); }
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.anisotropy=renderer.capabilities.getMaxAnisotropy(); return t;
}
// ---- MÁSCARAS 2D (canvas) que controlam rugosidade/metal/oclusão por pixel ----
const maxAniso=renderer.capabilities.getMaxAnisotropy();
function dataTex(cv){ const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.NoColorSpace; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.anisotropy=maxAniso; return t; }   // linear (dados, não cor)
// desgaste: claro = áspero/sujo · escuro = metal polido (arranhão)
function wearMask(scratch=60, spots=26){ const s=512, cv=document.createElement('canvas'); cv.width=cv.height=s; const g=cv.getContext('2d');
  g.fillStyle='#8a8a8a'; g.fillRect(0,0,s,s);
  for(let i=0;i<spots;i++){ const x=Math.random()*s,y=Math.random()*s,r=30+Math.random()*100;
    const rg=g.createRadialGradient(x,y,0,x,y,r); rg.addColorStop(0,`rgba(255,255,255,${0.12+Math.random()*0.22})`); rg.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=rg; g.fillRect(x-r,y-r,2*r,2*r); }
  for(let i=0;i<scratch;i++){ const x=Math.random()*s,y=Math.random()*s,len=10+Math.random()*80,a=Math.random()*Math.PI;
    g.strokeStyle=`rgba(0,0,0,${0.15+Math.random()*0.4})`; g.lineWidth=Math.random()<0.8?1:2; g.beginPath(); g.moveTo(x,y); g.lineTo(x+Math.cos(a)*len,y+Math.sin(a)*len); g.stroke(); }
  return cv; }
function invertCanvas(cv){ const s=cv.width, o=document.createElement('canvas'); o.width=o.height=s; const g=o.getContext('2d');
  g.drawImage(cv,0,0); g.globalCompositeOperation='difference'; g.fillStyle='#fff'; g.fillRect(0,0,s,s); return o; }
// oclusão de contato: bordas escurecidas (aterra os cantos da sala)
function aoMask(border=0.28){ const s=256, cv=document.createElement('canvas'); cv.width=cv.height=s; const g=cv.getContext('2d');
  g.fillStyle='#fff'; g.fillRect(0,0,s,s); g.globalCompositeOperation='multiply'; const b=s*border;
  const edge=(x0,y0,x1,y1,rx,ry,rw,rh)=>{ const gr=g.createLinearGradient(x0,y0,x1,y1); gr.addColorStop(0,'#2b2b2b'); gr.addColorStop(1,'#fff'); g.fillStyle=gr; g.fillRect(rx,ry,rw,rh); };
  edge(0,0,0,b, 0,0,s,b); edge(0,s,0,s-b, 0,s-b,s,b); edge(0,0,b,0, 0,0,b,s); edge(s,0,s-b,0, s-b,0,b,s);
  return cv; }

const wallColor=metalTex('#241f1a',6), floorColor=metalTex('#15120e',10);
const wallWear=wearMask(0,24), floorWear=wearMask(0,34);   // sem arranhões (só variação de sujeira/manchas)
const aoWall=dataTex(aoMask(0.30)), aoFloor=dataTex(aoMask(0.22));
const wallMat=new THREE.MeshStandardMaterial({ map:wallColor, bumpMap:wallColor, bumpScale:0.006,
  roughnessMap:dataTex(wallWear), roughness:1.0, metalnessMap:dataTex(invertCanvas(wallWear)), metalness:0.7,
  aoMap:aoWall, aoMapIntensity:0.9, envMapIntensity:0.6 });
const floorMat=new THREE.MeshStandardMaterial({ map:floorColor, bumpMap:floorColor, bumpScale:0.004,
  roughnessMap:dataTex(floorWear), roughness:0.95, metalnessMap:dataTex(invertCanvas(floorWear)), metalness:0.85,
  aoMap:aoFloor, aoMapIntensity:0.7, envMapIntensity:0.95 });
const ceilMat =new THREE.MeshStandardMaterial({ color:'#151310', roughness:0.95, metalness:0.1, aoMap:aoWall, aoMapIntensity:0.85, envMapIntensity:0.3 });

// plane() adiciona uv1 (canal exigido pelo aoMap)
function plane(w,h,mat,pos,rot){ const geo=new THREE.PlaneGeometry(w,h); geo.setAttribute('uv1', geo.attributes.uv);
  const m=new THREE.Mesh(geo,mat); m.position.set(...pos); if(rot)m.rotation.set(...rot); m.receiveShadow=true; scene.add(m); return m; }
plane(W,D,floorMat,[0,0,0],[-Math.PI/2,0,0]);
plane(W,D,ceilMat,[0,H,0],[Math.PI/2,0,0]);
plane(W,H,wallMat,[0,H/2,-D/2],[0,0,0]);            // frente (portas)
plane(W,H,wallMat,[0,H/2, D/2],[0,Math.PI,0]);      // fundo
plane(D,H,wallMat,[-W/2,H/2,0],[0,Math.PI/2,0]);    // esquerda
plane(D,H,wallMat,[ W/2,H/2,0],[0,-Math.PI/2,0]);   // direita

// ---- portas (metal escovado + batente) ----
function brushedTex(base='#2b2822'){ const s=256, cv=document.createElement('canvas'); cv.width=cv.height=s; const g=cv.getContext('2d');
  g.fillStyle=base; g.fillRect(0,0,s,s);
  for(let i=0;i<s;i+=1){ const a=Math.random()*0.09; g.strokeStyle=`rgba(255,255,255,${a*0.5})`; g.beginPath(); g.moveTo(0,i); g.lineTo(s,i); g.stroke();
    g.strokeStyle=`rgba(0,0,0,${a})`; g.beginPath(); g.moveTo(0,i+0.5); g.lineTo(s,i+0.5); g.stroke(); }
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; return t; }
const doorBrush=brushedTex('#2b2822'); const doorWear=wearMask(14,10);
const doorMat=new THREE.MeshStandardMaterial({ map:doorBrush, bumpMap:doorBrush, bumpScale:0.002,
  roughnessMap:dataTex(doorWear), roughness:0.55, metalnessMap:dataTex(invertCanvas(doorWear)), metalness:1.0, envMapIntensity:1.1 });
const doorW=W*0.30, doorH=H*0.84, doorY=doorH/2+0.02;
const doorL=new THREE.Mesh(new THREE.BoxGeometry(doorW,doorH,0.07),doorMat);
const doorR=doorL.clone();
doorL.position.set(-doorW/2-0.006,doorY,-D/2+0.055); doorR.position.set(doorW/2+0.006,doorY,-D/2+0.055);
[doorL,doorR].forEach(d=>{d.castShadow=d.receiveShadow=true; scene.add(d);});
// batente/moldura em volta das portas
const jambMat=new THREE.MeshStandardMaterial({color:'#14110c',roughness:0.6,metalness:0.55});
const openW=doorW*2+0.06;
function jamb(w,h,x,y){ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,0.05),jambMat); m.position.set(x,y,-D/2+0.03); m.castShadow=true; scene.add(m); return m; }
jamb(openW+0.18,0.10, 0, doorY+doorH/2+0.05);            // verga (topo)
jamb(0.10,doorH+0.12, -(openW/2+0.05), doorY);           // umbral esq
jamb(0.10,doorH+0.12,  (openW/2+0.05), doorY);           // umbral dir
// fenda central escura
const doorSeam=new THREE.Mesh(new THREE.BoxGeometry(0.014,doorH,0.075),new THREE.MeshStandardMaterial({color:'#000'})); doorSeam.position.set(0,doorY,-D/2+0.05); scene.add(doorSeam);

// ---- painel de botões (parede direita) ----
// moldura preta encaixada na parede + placa metálica escura
const panelFrame=new THREE.Mesh(new THREE.BoxGeometry(0.03,1.08,0.42),
  new THREE.MeshStandardMaterial({color:'#050403',roughness:0.7,metalness:0.4}));
panelFrame.position.set(W/2-0.008,1.38,-D/2+0.62); panelFrame.castShadow=true; scene.add(panelFrame);   // bezel recuado (não tapa os botões)
// placa do painel com acabamento escovado + parafusos (máscara 2D em canvas)
function panelPlateTex(){ const w=256,h=600, cv=document.createElement('canvas'); cv.width=w; cv.height=h; const g=cv.getContext('2d');
  g.fillStyle='#100e0b'; g.fillRect(0,0,w,h);
  for(let y=0;y<h;y++){ g.strokeStyle=`rgba(255,255,255,${Math.random()*0.028})`; g.beginPath(); g.moveTo(0,y+0.5); g.lineTo(w,y+0.5); g.stroke(); }
  g.fillStyle='#0a0908'; g.fillRect(w*0.14,h*0.19,w*0.72,h*0.74);        // recesso central dos botões
  g.strokeStyle='#00000066'; g.lineWidth=2; g.strokeRect(w*0.14,h*0.19,w*0.72,h*0.74);
  const screw=(x,y)=>{ g.fillStyle='#2c2a23'; g.beginPath(); g.arc(x,y,7,0,7); g.fill(); g.fillStyle='#050403'; g.beginPath(); g.arc(x,y,5,0,7); g.fill();
    g.strokeStyle='#413d33'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x-4,y-2); g.lineTo(x+4,y+2); g.stroke(); };
  screw(22,22); screw(w-22,22); screw(22,h-22); screw(w-22,h-22);
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=maxAniso; return t; }
const panel=new THREE.Mesh(new THREE.BoxGeometry(0.05,1.0,0.34),
  new THREE.MeshStandardMaterial({map:panelPlateTex(),roughness:0.4,metalness:0.72,envMapIntensity:0.8}));
panel.position.set(W/2-0.026,1.38,-D/2+0.62); panel.castShadow=true; scene.add(panel);
panel.userData={act:'panel'};
const PANEL_FACE=W/2-0.05;                       // face da placa voltada pra sala

// botões redondos, salientes, com número legível
const btns=[];
function btnTex(n){ const s=128, cv=document.createElement('canvas'); cv.width=cv.height=s; const g=cv.getContext('2d');
  g.clearRect(0,0,s,s);
  g.fillStyle='#101014'; g.beginPath(); g.arc(64,64,62,0,7); g.fill();                 // aro externo
  const rg=g.createRadialGradient(48,48,6,64,64,58); rg.addColorStop(0,'#42424c'); rg.addColorStop(1,'#0f0f14');
  g.fillStyle=rg; g.beginPath(); g.arc(64,64,54,0,7); g.fill();                          // corpo do botão
  g.fillStyle='#0a0a0d'; g.beginPath(); g.arc(64,64,40,0,7); g.fill();                   // recesso do número
  const lbl=String(n); g.fillStyle='#dcdce4'; g.font=`900 ${lbl.length>1?42:54}px "Trebuchet MS",sans-serif`; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(lbl,64,70);
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; return t; }
const NBTN=12;                                     // painel cheio: 2 colunas × 6 andares
for(let i=0;i<NBTN;i++){
  const tx=btnTex(i+1);
  const b=new THREE.Mesh(new THREE.CircleGeometry(0.043,28),
    new THREE.MeshStandardMaterial({map:tx,emissive:'#ffffff',emissiveMap:tx,transparent:true,roughness:0.45,metalness:0.2,emissiveIntensity:0}));
  const col=i%2, row=(i/2)|0;
  b.position.set(PANEL_FACE-0.006, 1.70-row*0.132, -D/2+0.54+col*0.16); b.rotation.y=-Math.PI/2;   // salta à frente da placa
  b.userData={act:'btn',i,num:i+1}; b.castShadow=true; scene.add(b); btns.push(b);
}
// botões retroiluminados quando há energia; brilho vermelho ao pressionar
function litBtn(b,on){ if(on){ b.material.emissive.set('#ff6a3a'); b.material.emissiveIntensity=1.2; }
  else { b.material.emissive.set('#ffffff'); b.material.emissiveIntensity=(typeof G!=='undefined'&&G.powered)?0.75:0; } }

// mini-mostrador de andar no topo do painel (não fica atrás da porta)
function makeReadout(w,h){ const cv=document.createElement('canvas'); cv.width=256; cv.height=140; const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace;
  const mat=new THREE.MeshStandardMaterial({map:t,emissive:'#ff2a1a',emissiveMap:t,emissiveIntensity:0.0,roughness:0.35});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat); return { cv, t, mat, m }; }
const pReadFrame=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.17,0.28),new THREE.MeshStandardMaterial({color:'#000',roughness:0.8}));
pReadFrame.position.set(W/2-0.02,1.86,-D/2+0.62); scene.add(pReadFrame);
const pRead=makeReadout(0.25,0.135);
pRead.m.position.set(PANEL_FACE-0.012,1.86,-D/2+0.62); pRead.m.rotation.y=-Math.PI/2; scene.add(pRead.m);

// ---- display de andar (acima da porta, à frente da verga p/ não ser tapado) ----
const dispHouse=new THREE.Mesh(new THREE.BoxGeometry(0.72,0.34,0.07),new THREE.MeshStandardMaterial({color:'#070609',roughness:0.7,metalness:0.4}));
dispHouse.position.set(0,doorY+doorH/2+0.20,-D/2+0.10); dispHouse.castShadow=true; scene.add(dispHouse);
function makeDisplay(){
  const cv=document.createElement('canvas'); cv.width=256; cv.height=128; const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace;
  const mat=new THREE.MeshStandardMaterial({map:t,emissive:'#ff2a1a',emissiveMap:t,emissiveIntensity:0.0,roughness:0.4});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(0.62,0.26),mat); m.position.set(0,doorY+doorH/2+0.20,-D/2+0.14); scene.add(m);
  m.userData={act:'display'};
  return { cv, t, mat, m };
}
const disp=makeDisplay();
function draw7(cv,txt,on){ const g=cv.getContext('2d'); g.fillStyle='#0a0402'; g.fillRect(0,0,cv.width,cv.height);
  g.fillStyle= on?'#ff3a24':'#3a1410'; g.font=`900 ${(cv.height*0.66)|0}px "Courier New",monospace`; g.textAlign='center'; g.textBaseline='middle';
  g.shadowColor='#ff3a24'; g.shadowBlur=on?18:0; g.fillText(txt,cv.width/2,cv.height*0.54); g.shadowBlur=0; }
function setFloor(txt, on=true){
  draw7(disp.cv,txt,on); disp.t.needsUpdate=true; disp.mat.emissiveIntensity=on?1.0:0.15;
  draw7(pRead.cv,txt,on); pRead.t.needsUpdate=true; pRead.mat.emissiveIntensity=on?1.0:0.12;
}
setFloor('', false);

// ---- luz do teto (pisca) + hatch ----
const lamp=new THREE.Mesh(new THREE.PlaneGeometry(0.7,0.7),new THREE.MeshStandardMaterial({color:'#000',emissive:'#ffdca8',emissiveIntensity:0.0}));
lamp.position.set(0,H-0.02,0); lamp.rotation.x=Math.PI/2; scene.add(lamp);
const hatch=new THREE.Mesh(new THREE.PlaneGeometry(0.66,0.66),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:0.001}));
hatch.position.set(0,H-0.03,0.02); hatch.rotation.x=Math.PI/2; hatch.userData={act:'hatch'}; scene.add(hatch);
const hatchFrame=new THREE.Mesh(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.66,0.66)),new THREE.LineBasicMaterial({color:'#000'})); hatchFrame.position.copy(hatch.position); hatchFrame.rotation.x=Math.PI/2; scene.add(hatchFrame);

const amb=new THREE.AmbientLight(0xffffff,0.22); scene.add(amb);
const hemi=new THREE.HemisphereLight('#42506e','#241606',0.30); scene.add(hemi);   // gradiente frio/quente p/ profundidade
const light=new THREE.PointLight('#ffe0b0',0.0,14,1.6); light.position.set(0,H-0.15,0); light.castShadow=true;
light.shadow.mapSize.set(2048,2048); light.shadow.bias=-0.0018; light.shadow.radius=6; light.shadow.blurSamples=18; scene.add(light);
// leve luz de preenchimento fria vinda de baixo/trás, separa as silhuetas
const rim=new THREE.PointLight('#3a5a8a',0.35,8,2.0); rim.position.set(0,0.4,D/2-0.2); scene.add(rim);
// luz de emergência fraca (standby, antes de ligar o painel) — dá pra ver as formas
light.intensity=1.1; lamp.material.emissiveIntensity=0.35; amb.intensity=0.26;

// ---- espelho no fundo (canvas) + vulto ----
function mirrorTex(){ const cv=document.createElement('canvas'); cv.width=256; cv.height=512; const g=cv.getContext('2d');
  const gr=g.createLinearGradient(0,0,0,512); gr.addColorStop(0,'#0d1218'); gr.addColorStop(0.5,'#151c24'); gr.addColorStop(1,'#080a0e');
  g.fillStyle=gr; g.fillRect(0,0,256,512);
  for(let i=0;i<500;i++){ g.fillStyle=`rgba(255,255,255,${Math.random()*0.018})`; g.fillRect(Math.random()*256,Math.random()*512,2,2); }
  return { cv, g }; }
const mirCv=mirrorTex(); const mirTex=new THREE.CanvasTexture(mirCv.cv); mirTex.colorSpace=THREE.SRGBColorSpace;
const mirror=new THREE.Mesh(new THREE.PlaneGeometry(0.7,1.4),new THREE.MeshStandardMaterial({map:mirTex,roughness:0.12,metalness:0.95,envMapIntensity:1.3}));
mirror.position.set(0,1.5,D/2-0.02); mirror.rotation.y=Math.PI; mirror.userData={act:'mirror'}; scene.add(mirror);
const figure=new THREE.Mesh(new THREE.PlaneGeometry(0.55,1.5),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:0})); figure.position.set(0,1.4,D/2-0.06); figure.rotation.y=Math.PI; scene.add(figure);
// escreve o código no vidro "embaçado" (revelado após o telefone)
function revealMirrorCode(code){
  const g=mirCv.g;
  g.save();
  // névoa de condensação (halo suave atrás dos números)
  const fog=g.createRadialGradient(128,250,30,128,250,200); fog.addColorStop(0,'rgba(205,225,235,0.16)'); fog.addColorStop(1,'rgba(205,225,235,0)');
  g.fillStyle=fog; g.fillRect(0,40,256,440);
  // três dígitos posicionados à mão, bem dentro do vidro (sem cortar nas bordas)
  g.textAlign='center'; g.textBaseline='middle';
  const xs=[70,128,186], y=248;
  g.font='900 96px "Courier New",monospace'; g.shadowColor='#eaffff'; g.shadowBlur=22;
  for(let k=0;k<3;k++){
    g.fillStyle='rgba(225,244,252,0.85)'; g.fillText(String(code[k]),xs[k],y);   // traço nítido
    g.fillStyle='rgba(235,250,255,0.35)'; g.fillText(String(code[k]),xs[k],y);   // reforço do brilho
  }
  // sublinhado como se riscado no embaçado
  g.shadowBlur=0; g.strokeStyle='rgba(215,238,248,0.35)'; g.lineWidth=2;
  g.beginPath(); g.moveTo(48,312); g.lineTo(208,312); g.stroke();
  g.font='600 22px "Trebuchet MS",sans-serif'; g.shadowColor='#dff'; g.shadowBlur=8; g.fillStyle='rgba(210,230,244,0.5)';
  g.fillText('não sobe', 128, 350);
  g.restore(); mirTex.needsUpdate=true;
}

// corrimão (sombra bonita)
const rail=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,W*0.8,10),new THREE.MeshStandardMaterial({color:'#3a3a40',metalness:0.8,roughness:0.4}));
rail.rotation.z=Math.PI/2; rail.position.set(0,0.95,D/2-0.08); rail.castShadow=true; scene.add(rail);

// adesivo de instruções de emergência (decalque via textura 2D) na parede direita
function stickerTex(){ const w=256,h=170, cv=document.createElement('canvas'); cv.width=w; cv.height=h; const g=cv.getContext('2d');
  g.fillStyle='#c9c3b2'; g.fillRect(0,0,w,h);                                   // papel envelhecido
  for(let i=0;i<1400;i++){ g.fillStyle=`rgba(90,70,40,${Math.random()*0.06})`; g.fillRect(Math.random()*w,Math.random()*h,2,2); }
  g.fillStyle='#8a1810'; g.fillRect(0,0,w,34);                                  // faixa vermelha
  g.fillStyle='#f2ede0'; g.font='900 20px "Trebuchet MS",sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('EM CASO DE PARADA',w/2,17);
  g.fillStyle='#20201c'; g.font='700 13px "Trebuchet MS",sans-serif'; g.textAlign='left';
  ['1. Mantenha a calma.','2. Use o telefone de emergência.','3. NÃO force as portas.','4. Aguarde o resgate.'].forEach((s,i)=>g.fillText(s,14,58+i*24));
  g.strokeStyle='#00000030'; g.lineWidth=2; g.strokeRect(1,1,w-2,h-2);
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=maxAniso; return t; }
const sticker=new THREE.Mesh(new THREE.PlaneGeometry(0.26,0.17),
  new THREE.MeshStandardMaterial({map:stickerTex(),roughness:0.9,metalness:0.0}));
sticker.position.set(W/2-0.012,0.72,-D/2+0.62); sticker.rotation.y=-Math.PI/2; sticker.rotation.z=0.02; scene.add(sticker);

// ---- telefone de emergência (caixa metálica encaixada na parede esquerda) ----
function phoneTex(){ const w=150,h=210, cv=document.createElement('canvas'); cv.width=w; cv.height=h; const g=cv.getContext('2d');
  g.fillStyle='#17171b'; g.fillRect(0,0,w,h);
  g.fillStyle='#0a0a0c'; g.fillRect(9,9,w-18,h-18);
  // LCD verde
  g.fillStyle='#0b1a12'; g.fillRect(20,20,w-40,34); g.strokeStyle='#1c3a28'; g.lineWidth=2; g.strokeRect(20,20,w-40,34);
  g.fillStyle='#3fa165'; g.font='700 16px monospace'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('EMERGÊNCIA',w/2,37);
  // teclado 3x4 com teclas em relevo
  const keys=['1','2','3','4','5','6','7','8','9','*','0','#'];
  g.font='700 17px "Trebuchet MS",monospace';
  keys.forEach((k,ix)=>{ const c=ix%3,r=(ix/3)|0, x=w/2+(c-1)*38, y=88+r*30;
    g.fillStyle='#2b2b34'; g.fillRect(x-16,y-12,32,24); g.strokeStyle='#3e3e48'; g.lineWidth=1; g.strokeRect(x-16,y-12,32,24);
    g.fillStyle='#c2c2cc'; g.fillText(k,x,y+1); });
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=maxAniso; return t; }
const phoneGrp=new THREE.Group();
const boxMat=new THREE.MeshStandardMaterial({color:'#121216',roughness:0.5,metalness:0.55,envMapIntensity:0.7});
const frameMat=new THREE.MeshStandardMaterial({color:'#07070a',roughness:0.7,metalness:0.4});
const phoneFrame=new THREE.Mesh(new THREE.BoxGeometry(0.21,0.34,0.04),frameMat); phoneFrame.position.z=-0.012;   // moldura recuada
const phoneBox=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.30,0.06),boxMat);
const phoneFace=new THREE.Mesh(new THREE.PlaneGeometry(0.165,0.275),new THREE.MeshStandardMaterial({map:phoneTex(),roughness:0.55,metalness:0.2})); phoneFace.position.set(0,-0.012,0.031);
// LED de status: pisca em vermelho ao tocar (brilha via bloom)
const phoneLED=new THREE.Mesh(new THREE.CircleGeometry(0.009,18),new THREE.MeshStandardMaterial({color:'#1a0000',emissive:'#ff2020',emissiveIntensity:0.25}));
phoneLED.position.set(0.062,0.115,0.033);
// berço + ganchos onde o fone descansa
const cradle=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.03,0.085),boxMat); cradle.position.set(0,0.165,0.02);
const hookL=new THREE.Mesh(new THREE.CylinderGeometry(0.009,0.009,0.03,10),boxMat); hookL.position.set(-0.055,0.182,0.055);
const hookR=hookL.clone(); hookR.position.x=0.055;
// fone ergonômico (cápsulas): punho + cápsula de ouvido e de boca
const hMat=new THREE.MeshStandardMaterial({color:'#121216',roughness:0.42,metalness:0.35,envMapIntensity:0.6});
const handset=new THREE.Group();
const grip=new THREE.Mesh(new THREE.CapsuleGeometry(0.015,0.085,8,16),hMat); grip.rotation.z=Math.PI/2;
const ear=new THREE.Mesh(new THREE.CapsuleGeometry(0.026,0.012,8,16),hMat); ear.rotation.z=Math.PI/2; ear.position.set(-0.075,-0.007,0);
const mouth=new THREE.Mesh(new THREE.CapsuleGeometry(0.026,0.012,8,16),hMat); mouth.rotation.z=Math.PI/2; mouth.position.set(0.075,-0.007,0);
handset.add(grip,ear,mouth); handset.position.set(0,0.183,0.066); handset.rotation.z=0.05;
// cordão espiralado descendo do fone até a caixa
const cordMat=new THREE.MeshStandardMaterial({color:'#0a0a0c',roughness:0.85});
for(let k=0;k<9;k++){ const tr=new THREE.Mesh(new THREE.TorusGeometry(0.013,0.0042,6,14),cordMat);
  tr.position.set(-0.062,0.155-k*0.02,0.04); tr.rotation.x=Math.PI/2; phoneGrp.add(tr); }
phoneGrp.add(phoneFrame,phoneBox,phoneFace,phoneLED,cradle,hookL,hookR,handset);
phoneGrp.position.set(-W/2+0.05,1.45,D/2-0.55); phoneGrp.rotation.y=Math.PI/2;
const phoneMeshes=[]; phoneGrp.traverse(o=>{ if(o.isMesh){ o.userData={act:'phone'}; o.castShadow=true; phoneMeshes.push(o); } });
scene.add(phoneGrp);

// (o brilho agora vem do bloom real no pós-processamento — sem sprites falsos)

const HOT=[panel,...btns,disp.m,hatch,mirror,doorL,doorR,...phoneMeshes];

// ============================ CONTROLES ============================
let yaw=0, pitch=0, dragging=false, lastX=0,lastY=0, moved=0, downT=0;
function applyCam(){ camera.rotation.set(pitch,yaw,0,'YXZ'); }
canvas.addEventListener('pointerdown',e=>{ dragging=true; lastX=e.clientX; lastY=e.clientY; moved=0; downT=performance.now(); });
canvas.addEventListener('pointermove',e=>{ if(!dragging) return; const dx=e.clientX-lastX, dy=e.clientY-lastY; lastX=e.clientX; lastY=e.clientY; moved+=Math.abs(dx)+Math.abs(dy);
  yaw-=dx*0.0042; pitch-=dy*0.0042; pitch=Math.max(-0.7,Math.min(1.25,pitch)); applyCam(); if($('look').style.opacity!=='0'){$('look').style.opacity='0';} });
addEventListener('pointerup',e=>{ if(!dragging) return; dragging=false; if(moved<9 && performance.now()-downT<450) tryInteract(e.clientX,e.clientY); });
const raycaster=new THREE.Raycaster(), ndc=new THREE.Vector2();
function tryInteract(x,y){
  const r=canvas.getBoundingClientRect(); ndc.x=((x-r.left)/r.width)*2-1; ndc.y=-((y-r.top)/r.height)*2+1;
  raycaster.setFromCamera(ndc,camera);
  const hit=raycaster.intersectObjects(HOT,false)[0];
  if(hit) interact(hit.object.userData, hit.object);
}

// ============================ ÁUDIO (síntese) ============================
let AC=null, humGain=null;
function noise(dur){ const n=(AC.sampleRate*dur)|0, b=AC.createBuffer(1,n,AC.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++)d[i]=Math.random()*2-1; return b; }
function startAudio(){ AC=new (window.AudioContext||window.webkitAudioContext)();
  const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(); o.type='sawtooth';o.frequency.value=51;o2.type='sine';o2.frequency.value=51.6;
  o.connect(g);o2.connect(g);g.connect(AC.destination); g.gain.value=0; o.start();o2.start(); g.gain.linearRampToValueAtTime(0.05,AC.currentTime+3); humGain=g; }
function ding(f=760){ if(!AC)return; const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(AC.destination);
  g.gain.setValueAtTime(0.0001,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.18,AC.currentTime+0.008);g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+0.5);o.start();o.stop(AC.currentTime+0.5); }
function thud(){ if(!AC)return; const s=AC.createBufferSource();s.buffer=noise(0.3);const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=180;const g=AC.createGain();s.connect(f);f.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(0.5,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+0.35);s.start(); }
function boom(){ if(!AC)return; const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(130,AC.currentTime);o.frequency.exponentialRampToValueAtTime(26,AC.currentTime+1.3);o.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(0.7,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+1.5);o.start();o.stop(AC.currentTime+1.5); }
function whisper(){ if(!AC)return; const s=AC.createBufferSource();s.buffer=noise(1.6);const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=1700;f.Q.value=7;const g=AC.createGain();
  const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=8;lg.gain.value=0.6;lfo.connect(lg);lg.connect(g.gain);
  s.connect(f);f.connect(g);g.connect(AC.destination);g.gain.value=0.09;s.start();lfo.start();s.stop(AC.currentTime+1.6);lfo.stop(AC.currentTime+1.6); }

// ============================ HELPERS de clima ============================
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let sayT=0;
function say(txt){ const s=$('sayT'); s.textContent=txt; s.classList.add('show'); clearTimeout(sayT); sayT=setTimeout(()=>s.classList.remove('show'),4200); }
let lightOn=false, baseLight=6.0;
function setLight(on){ lightOn=on; const v=on?baseLight:0; light.intensity=v; lamp.material.emissiveIntensity=on?1.6:0; amb.intensity=on?0.22:0.05; }
async function flicker(times=4){ for(let i=0;i<times;i++){ setLight(false); await sleep(40+Math.random()*60); setLight(true); light.intensity=baseLight*(0.5+Math.random()*0.5); await sleep(50+Math.random()*90); } setLight(true); }
async function blackout(ms){ setLight(false); await sleep(ms); }
function flash(){ const f=$('flash'); f.style.opacity='1'; setTimeout(()=>f.style.opacity='0',70); }
let shakeAmt=0; function shake(a){ shakeAmt=a; }

// ============================ ESTADO / INTERAÇÕES ============================
// phase: 0=antes de descer · 1=descendo · 2=pós-susto (telefone tocando)
//        3=telefone atendido (espelho legível, botões viram teclado) · 4=código aceito (alçapão liberado) · 5=alçapão aberto (gancho)
const G={ powered:false, floor:13, busy:false, phase:0, entry:[], code:[] };
G.code=(()=>{ const pool=[1,2,3,4,5,6,7,8,9], out=[]; for(let k=0;k<3;k++) out.push(pool.splice((Math.random()*pool.length)|0,1)[0]); return out; })();
let ringing=false;
function interact(ud, obj){
  if(G.busy) return;
  if(obj===doorL||obj===doorR){ thud(); shake(0.02); say('As portas não abrem. Alguma coisa as segura por fora.'); return; }
  if(ud.act==='phone'){
    if(G.phase===2){ answerPhone(); return; }
    if(ringing){ answerPhone(); return; }
    say(G.phase>=3?'A linha está muda. Só estática.':'Um telefone velho na parede. Silencioso.'); return;
  }
  if(ud.act==='panel'){ if(!G.powered) return powerOn(); say('O painel range. Os botões estão frios.'); return; }
  if(ud.act==='btn'){
    if(!G.powered){ say('Morto. Nenhum botão responde.'); thud(); return; }
    if(G.phase===0){ pressFloor(ud.i, obj); return; }
    if(G.phase===3){ enterDigit(ud.num, obj); return; }
    say('Só desce. E já não há mais para onde descer.'); return;
  }
  if(ud.act==='display'){ say(G.powered?`Mostrador: ${G.floor}.`:'O mostrador está apagado.'); return; }
  if(ud.act==='hatch'){
    if(G.phase>=5){ say('O alçapão está aberto. O corredor lá em cima espera.'); return; }
    if(G.phase===4){ openHatch(); return; }
    say('O alçapão do teto. Trancado — por cima.'); thud(); return;
  }
  if(ud.act==='mirror'){
    if(G.phase>=3){ say('No vidro embaçado, três dígitos. Eles não somem.'); return; }
    say('Seu reflexo… demora um segundo a mais que você.'); return;
  }
}
async function powerOn(){
  G.busy=true; say('Você força o painel. Ele estala…'); thud(); await sleep(500);
  await flicker(5); setLight(true); if(humGain) humGain.gain.linearRampToValueAtTime(0.06,AC.currentTime+1);
  G.powered=true; setFloor(String(G.floor)); btns.forEach(b=>litBtn(b,false));   // retroilumina os números
  say('O elevador acende. Andar 13. Escolha um andar.'); G.busy=false;
}
async function pressFloor(i, obj){
  if(G.phase>0) { say('Não adianta. Ele só desce.'); return; }
  G.busy=true; G.phase=1; litBtn(obj,true); ding(680);
  say('O elevador começa a descer.');
  // descida com dings, contando os andares
  const seq=[12,11,10,9,8,7,6,5,4,3,2,1];
  for(const f of seq){ await sleep(620); G.floor=f; setFloor(String(f)); ding(700 - (13-f)*8); shake(0.006);
    if(Math.random()<0.25){ light.intensity=baseLight*0.4; await sleep(70); setLight(true); } }
  await sleep(500);
  // O SUSTO: passa do térreo
  setFloor('0'); ding(520); await sleep(700);
  say(''); shake(0.03); thud();
  await blackout(120); boom(); whisper(); flash();
  // no escuro, o vulto aparece atrás
  figure.material.opacity=0.9;
  await sleep(1500);
  await flicker(3); setLight(true);
  figure.material.opacity=0;                     // some quando a luz volta
  setFloor('-1'); disp.mat.emissive.set('#ff2a1a');
  say('Isto não é um andar.');
  G.busy=false; G.phase=2;
  await sleep(2600);
  say('Em algum canto da parede, um telefone começa a tocar.');
  startRinging();
}

// ---- toque do telefone (síntese, tom duplo estilo campainha) ----
function phoneRing(){ if(!AC)return; const t0=AC.currentTime;
  [0,0.42].forEach(off=>{ const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain();
    o.type='sine';o.frequency.value=440;o2.type='sine';o2.frequency.value=482;o.connect(g);o2.connect(g);g.connect(AC.destination);
    g.gain.setValueAtTime(0.0001,t0+off); g.gain.linearRampToValueAtTime(0.11,t0+off+0.02);
    g.gain.setValueAtTime(0.11,t0+off+0.30); g.gain.exponentialRampToValueAtTime(0.0001,t0+off+0.36);
    o.start(t0+off);o2.start(t0+off);o.stop(t0+off+0.4);o2.stop(t0+off+0.4); }); }
async function startRinging(){ if(ringing) return; ringing=true;
  while(ringing){ phoneRing(); for(let k=0;k<13 && ringing;k++) await sleep(200); } }

// ---- atender o telefone (phase 2 -> 3): pista críptica + revela código no espelho ----
async function answerPhone(){
  ringing=false; phoneLED.material.emissiveIntensity=0.25;
  G.busy=true;
  say('Você atende. Uma respiração longa. Depois estática.'); ding(300); await sleep(2000);
  whisper();
  say('«…os números não sobem. Olhe onde ninguém te olha de volta.»'); await sleep(2900);
  say('A linha morre. Atrás de você, o espelho ficou embaçado.'); await sleep(1200);
  revealMirrorCode(G.code);
  G.phase=3; G.entry=[];
  await sleep(1800);
  say('Três dígitos escritos no vidro. O painel espera por eles.');
  G.busy=false;
}

// ---- teclado: digitar o código nos botões (phase 3) ----
async function enterDigit(num, obj){
  if(G.busy) return;
  litBtn(obj,true); ding(560+num*22); G.entry.push(num);
  say('Código: '+G.entry.join('  '));
  await sleep(220); litBtn(obj,false);
  if(G.entry.length>=3){
    G.busy=true; await sleep(300);
    const ok=G.entry.every((d,ix)=>d===G.code[ix]);
    G.entry=[];
    if(ok){ await codeAccepted(); }
    else { thud(); shake(0.025); await flicker(2); setLight(true); say('Errado. O elevador estremece, contrariado.'); G.busy=false; }
  }
}

// ---- código aceito (phase 3 -> 4): destrava o alçapão ----
async function codeAccepted(){
  ding(880); await sleep(220); ding(1040); await sleep(220); ding(1240); await sleep(300);
  say('Um estalo pesado no teto. O alçapão cedeu.'); thud(); shake(0.02);
  hatchFrame.material.color.set('#6a5a30'); hatch.material.opacity=0.06;
  G.phase=4;
  await sleep(2000);
  say('Há uma saída acima de você agora. Se tiver coragem, olhe pra cima.');
  G.busy=false;
}

// ---- abrir o alçapão (phase 4 -> 5): gancho de fim de capítulo ----
async function openHatch(){
  G.busy=true; G.phase=5;
  say('Você empurra o alçapão. Ar frio desce lá de cima.'); thud(); await sleep(1900);
  say('Acima não há poço de elevador. Há um corredor. E ele respira.'); await sleep(2900);
  boom(); whisper(); shake(0.06); figure.material.opacity=0.9;
  await blackout(160); flash(); await sleep(900);
  await blackout(1800);
  say('');
  showContinua();
}
function showContinua(){
  ringing=false;
  const d=document.createElement('div');
  d.style.cssText='position:fixed;inset:0;z-index:7;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#000;opacity:0;transition:opacity 2.2s;color:#8a8578;font-family:inherit;text-align:center;padding:24px';
  d.innerHTML='<div style="font-size:13px;letter-spacing:3px;color:#5a564d">CAPÍTULO 1 — O POÇO</div><div style="font-size:26px;letter-spacing:6px;color:#c9c2b2">continua…</div>';
  document.body.appendChild(d);
  requestAnimationFrame(()=>{ d.style.opacity='1'; });
}

// ============================ LOOP ============================
let t=0;
function tick(){
  requestAnimationFrame(tick); t+=0.016;
  // respiração + tremor sutil
  const bx=Math.sin(t*0.9)*0.004, by=Math.sin(t*1.3+1)*0.004;
  camera.position.set(bx + (Math.random()-0.5)*shakeAmt, 1.55+by + (Math.random()-0.5)*shakeAmt, (Math.random()-0.5)*shakeAmt);
  shakeAmt*=0.9;
  // cintilar leve da luz quando ligada
  if(lightOn && !G.busy) light.intensity = baseLight*(0.94+Math.sin(t*13)*0.04+ (Math.random()<0.02?-0.35:0));
  // telefone pulsa enquanto toca (o brilho vem do bloom)
  phoneLED.material.emissiveIntensity = ringing ? (0.5+Math.max(0,Math.sin(t*9))*2.2) : 0.25;
  composer.render();
}
function resize(){ const w=innerWidth,h=innerHeight; renderer.setSize(w,h,false); composer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix(); }
addEventListener('resize',resize); resize(); applyCam(); tick();

// ============================ START ============================
$('startBtn').addEventListener('click', async ()=>{
  startAudio();
  $('start').style.transition='opacity 1.2s'; $('start').style.opacity='0';
  setTimeout(()=>$('start').remove(),1200);
  await sleep(400); thud(); say('As portas se fecham. O elevador se sacode e começa a descer.');
  await sleep(1600); say('Só a luz de emergência resiste. Ache o painel — olhe em volta.');
});
window.__ELEV={ G, powerOn, pressFloor:(i)=>pressFloor(i,btns[i]), setLight,
  answerPhone, enterCode:(arr)=>{ (arr||G.code).forEach(n=>enterDigit(n,btns[n-1])); },
  openHatch, isRinging:()=>ringing, faceYaw:(v)=>{ yaw=v; applyCam(); }, look:(y,pi)=>{ yaw=y; pitch=pi; applyCam(); } };
