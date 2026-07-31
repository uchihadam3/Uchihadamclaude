/* ========================================================================
   LENDAS DA F1 — demo: 1 carro correndo numa pista em escala real.
   Câmera de perseguição, velocidade em função da curvatura (freia nas
   curvas, acelera nas retas), rolagem de carroceria, rodas girando/esterçando.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { buildF1Car, TEAMS } from './car.js';
import { carStats, tier, ranking } from './stats.js';
import { driversOf, overall, ATTRS, simulateRace } from './drivers.js';
import { computeLine, buildField, updateField, RACE, TIRES, setWeather, WEATHERS } from './race.js';
import { buildTrack } from './track.js';
import { CIRCUITS, CIRCUIT_LIST } from './circuits-data.js';
import { F1Audio } from './audio.js';

/* ---------- MODO CARREIRA (config vinda do menu via sessionStorage) ---------- */
let CAREER=null;
try{ const raw=sessionStorage.getItem('lf1_race'); if(raw) CAREER=JSON.parse(raw); }catch(e){}
const PLAYER = CAREER && CAREER.player || null;   // loadout do jogador (ou null = corrida rápida)

/* ---------- CIRCUITO selecionado (carreira > ?track= > interlagos) ---------- */
const trackKey = (CAREER&&CAREER.track) || new URLSearchParams(location.search).get('track') || 'interlagos';
const circuit = CIRCUITS[trackKey] ? trackKey : 'interlagos';
const circuitInfo = CIRCUIT_LIST.find(c=>c.key===circuit) || CIRCUIT_LIST[0];
RACE.laps = (CAREER&&CAREER.laps) || circuitInfo.laps || 12;

/* ---------- CLIMA da corrida (carreira > ?weather= > sorteado) ---------- */
const wq = (CAREER&&CAREER.weather) || new URLSearchParams(location.search).get('weather');
const weatherKey = WEATHERS[wq] ? wq : (()=>{ const r=Math.random();
  return r<0.55?'sol' : r<0.72?'nublado' : r<0.85?'garoa' : r<0.95?'chuva' : 'tempestade'; })();
const WX = setWeather(weatherKey);

const cvs = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas:cvs, antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));   // fill-rate no celular
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.05;

const scene=new THREE.Scene();
scene.background=new THREE.Color(WX.sky);
scene.fog=new THREE.Fog(WX.sky, WX.fog[0], WX.fog[1]);

const camera=new THREE.PerspectiveCamera(52, innerWidth/innerHeight, 0.5, 4000);

/* ---------- LUZ (atenuada conforme o clima) ---------- */
const sun=new THREE.DirectionalLight(0xfff4e6, 2.6*WX.amb);
sun.position.set(180,300,120); sun.castShadow = WX.amb>0.7;   // sem sombra dura em dia nublado/chuva
sun.shadow.mapSize.set(1024,1024);
const sc=sun.shadow.camera; sc.near=50; sc.far=900; sc.left=-140; sc.right=140; sc.top=140; sc.bottom=-140;
sun.shadow.bias=-0.0004;
scene.add(sun);
scene.add(new THREE.HemisphereLight(0xbcd8ff, 0x3a5a30, 0.9*WX.amb));

/* ---------- ENVIRONMENT (para brilho da lataria) ---------- */
(function(){
  const c=document.createElement('canvas'); c.width=c.height=256; const g=c.getContext('2d');
  const grd=g.createLinearGradient(0,0,0,256);
  grd.addColorStop(0,'#dff0ff'); grd.addColorStop(0.5,'#a9cdf2'); grd.addColorStop(0.5,'#6f8f6a'); grd.addColorStop(1,'#2f4a2c');
  g.fillStyle=grd; g.fillRect(0,0,256,256);
  const tex=new THREE.CanvasTexture(c); tex.mapping=THREE.EquirectangularReflectionMapping;
  const pmrem=new THREE.PMREMGenerator(renderer);
  scene.environment=pmrem.fromEquirectangular(tex).texture;
})();

/* ---------- PISTA + CORRIDA (20 carros) ---------- */
const track=buildTrack(CIRCUITS[circuit]); scene.add(track.group);
const curve=track.curve;
const total=track.length;
const QUALI = CAREER && CAREER.mode==='quali';           // sessão de classificação (só o jogador)
const line=computeLine(curve, track.half);   // racing line (apex nas curvas)
const cars=buildField(scene, line, circuit, PLAYER, {
  mode: CAREER?CAREER.mode:'race',
  gridOrder: (CAREER && CAREER.grid) || null,
});

let currentTeam = PLAYER ? PLAYER.team : 'ferrari';
const findFocus=()=> (PLAYER && cars.find(c=>c.isPlayer)) || cars.find(c=>c.team===currentTeam) || cars[0];
let focus=findFocus();
function setTeam(t){ currentTeam=t; focus=findFocus(); }

// estado do carro em foco (alimenta câmera/som/HUD)
const focusPos=new THREE.Vector3(), focusTan=new THREE.Vector3(0,0,1), lookTmp=new THREE.Vector3();
let focusU=0, focusSpeed=0, focusVmax=99;

let camPos=new THREE.Vector3(0,8,-20);
const clock=new THREE.Clock();
let raceTime=0;
let started=false;

/* ---------- LARGADA: semáforo (5 luzes vermelhas -> apaga = vai) ---------- */
const lightsEl=document.getElementById('lights');
function setLamp(i,on){ const el=lightsEl&&lightsEl.children[i]; if(el) el.className='lamp'+(on?' on':''); }
function startLights(){
  if(QUALI){ started=true; for(const c of cars) c.launchStart=raceTime; if(lightsEl) lightsEl.classList.add('hide'); return; }
  if(!lightsEl) { started=true; for(const c of cars) c.launchStart=raceTime; return; }
  lightsEl.classList.remove('hide');
  for(let i=0;i<5;i++) setTimeout(()=>setLamp(i,true), 1800 + i*1000);
  const hold=7200 + Math.random()*2200;
  setTimeout(()=>{                                   // luzes apagam = LARGADA!
    for(let i=0;i<5;i++) setLamp(i,false);
    lightsEl.classList.add('go');
    started=true;
    for(const c of cars) c.launchStart = raceTime + c.reaction;
    setTimeout(()=> lightsEl.classList.add('hide'), 1200);
  }, hold);
}

// ---- marchas / RPM (pra som e sensação) ----
const FOV_BASE=54, FOV_MAX=82;
let STEER_SIGN=1;      // sinal pra roda apontar pra dentro da curva
const STEER_GAIN=2.0;  // ganho visual (mantém proporção Ackermann, deixa visível)
const gearsKmh=[0,95,145,190,235,280,325,385];   // limites das 7 marchas
function rpmFor(kmh){
  let g=0; for(let i=0;i<gearsKmh.length-1;i++){ if(kmh>=gearsKmh[i]) g=i; }
  g=Math.min(g,gearsKmh.length-2);
  const a=gearsKmh[g], b=gearsKmh[g+1];
  const frac=THREE.MathUtils.clamp((kmh-a)/(b-a),0,1);
  // 1a: marcha lenta ao corte; demais marchas: fica na faixa alta e cai pouco na troca (F1 real)
  const rpm = g===0 ? (3500 + frac*11500) : (10800 + frac*4200);
  return { rpm, gear: g+1 };
}
const audio=new F1Audio();
let audioOn=false, shakeX=0, shakeY=0;
const halfW=track.half;

/* ---------- MINIMAPA ---------- */
const miniCvs=document.getElementById('mini');
const mctx=miniCvs&&miniCvs.getContext('2d');
let mapPts=[], mapFn=null;
if(mctx){
  const W=miniCvs.width, H=miniCvs.height, pad=12;
  const sample=curve.getSpacedPoints(240).map(p=>[p.x,p.z]);
  let minX=1e9,maxX=-1e9,minZ=1e9,maxZ=-1e9;
  for(const [x,z] of sample){ minX=Math.min(minX,x);maxX=Math.max(maxX,x);minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z); }
  const sx=(W-2*pad)/(maxX-minX), sz=(H-2*pad)/(maxZ-minZ), s=Math.min(sx,sz);
  const ox=(W-(maxX-minX)*s)/2, oz=(H-(maxZ-minZ)*s)/2;
  // eixo X invertido pra bater com a vista de cima do mundo 3D (não espelhado)
  mapFn=(x,z)=>[ox+(maxX-x)*s, H-(oz+(z-minZ)*s)];
  mapPts=sample.map(([x,z])=>mapFn(x,z));
}
function drawMini(){
  if(!mctx) return;
  const W=miniCvs.width,H=miniCvs.height;
  mctx.clearRect(0,0,W,H);
  // traçado
  mctx.lineJoin='round'; mctx.lineCap='round';
  mctx.strokeStyle='rgba(255,255,255,0.85)'; mctx.lineWidth=4;
  mctx.beginPath(); mapPts.forEach((p,i)=> i?mctx.lineTo(p[0],p[1]):mctx.moveTo(p[0],p[1])); mctx.closePath(); mctx.stroke();
  mctx.strokeStyle='rgba(60,64,72,0.9)'; mctx.lineWidth=1.6; mctx.stroke();
  // largada/chegada
  if(track.sf){ const [gx,gy]=mapFn(track.sf.x,track.sf.z);
    mctx.fillStyle='#ffffff'; mctx.fillRect(gx-3,gy-3,6,6); }
  // pontinhos de TODOS os carros (foco maior, amarelo)
  for(const c of cars){ if(c===focus) continue;
    const [x,y]=mapFn(c.g.position.x,c.g.position.z);
    mctx.beginPath(); mctx.arc(x,y,3,0,7); mctx.fillStyle=teamHex(c.team); mctx.fill();
    mctx.lineWidth=1; mctx.strokeStyle='rgba(0,0,0,.6)'; mctx.stroke(); }
  const [cx,cy]=mapFn(focus.g.position.x,focus.g.position.z);
  mctx.beginPath(); mctx.arc(cx,cy,5,0,7); mctx.fillStyle='#f2c400'; mctx.fill();
  mctx.lineWidth=2; mctx.strokeStyle='#1b1b1b'; mctx.stroke();
}
const teamHex=key=>'#'+((TEAMS[key].body)>>>0).toString(16).padStart(6,'0');
const lastName=n=>n.split(' ').slice(-1)[0];
const code3=n=>lastName(n).normalize('NFD').replace(/[̀-ͯ]/g,'').slice(0,3).toUpperCase();

/* ---------- TABELA DE TEMPOS (posições ao vivo, tipo TV) ---------- */
const towerEl=document.getElementById('tower');
const otEl=document.getElementById('overtake');
let lastPos={}, flash={}, towerCd=0, otCd=0;
function updateTower(dt){
  towerCd-=dt; otCd-=dt;
  const running=cars.filter(c=>!c.out).sort((a,b)=>b.d-a.d);
  const outs=cars.filter(c=>c.out);
  const order=[...running, ...outs];
  // detecta ultrapassagens (mudança de posição) — sempre, pra piscar/avisar
  order.forEach((c,i)=>{ const pos=i+1, key=c.drv.nome, prev=lastPos[key];
    if(prev && prev!==pos){ flash[key]={t:raceTime, dir: pos<prev?'up':'down'};
      if(pos<prev && (c===focus || order[prev-1]===focus) && otCd<=0){
        otCd=2.2; showOvertake(c, order[pos]); }   // aviso quando envolve o foco
    }
    lastPos[key]=pos;
  });
  const fp=order.indexOf(focus)+1;
  if(hudDrv) hudDrv.textContent='P'+fp+' · '+focus.drv.nome;
  // contador de voltas + bandeirada
  const leader=running[0];
  if(QUALI){
    if(lapEl && focus) lapEl.textContent='🏁 CLASSIFICAÇÃO · VOLTA '+Math.min(focus.lapsDone+1,RACE.laps)+'/'+RACE.laps;
    if(!raceOver && focus && ((focus.bestLap>0 && focus.lapsDone>=2) || focus.lapsDone>=RACE.laps)){
      raceOver=true; showQualiResult(); }
    return;
  }
  if(lapEl && leader) lapEl.textContent=WX.icon+' VOLTA '+Math.min(leader.lapsDone+1,RACE.laps)+'/'+RACE.laps;
  if(!raceOver && leader && leader.lapsDone>=RACE.laps){
    raceOver=true; cars.forEach(c=>c.finished=true); showResults(); }
  if(towerCd>0 || !towerEl) return;
  towerCd=0.15;
  let html='';
  order.forEach((c,i)=>{ const fl=flash[c.drv.nome];
    const cls=(c===focus?'me ':'')+(c.out?'out ':'')+(!c.out&&fl&&raceTime-fl.t<1.0?('fl '+fl.dir):'');
    const pos=c.out?'<span class="tp out">OUT</span>':`<span class="tp">${i+1}</span>`;
    const td=`<i class="tdot" style="background:${TIRES[c.tire].col}"></i>`;
    let stat='';
    if(!c.out){
      if(c.pitPhase) stat='<span class="pit">PIT</span>';
      else if(i>0 && !c.finished){ let g=running[i-1]? (running[i-1].d-c.d):0; if(g<0)g+=track.length;
        const gs=g/Math.max(c.speed,20);
        stat=`<span class="gapt">+${gs<99?gs.toFixed(1):'—'}</span>`; }
    }
    html+=`<div class="trow ${cls}">${pos}<b style="background:${teamHex(c.team)}"></b><span class="tc">${code3(c.drv.nome)}</span>${td}<span class="tn">${lastName(c.drv.nome)}</span>${stat}</div>`;
  });
  towerEl.innerHTML=html;
}
/* ---------- BANDEIRADA: resultado final com pontos ---------- */
let raceOver=false;
const lapEl=document.getElementById('lap');
function showResults(){
  const pts=[25,18,15,12,10,8,6,4,2,1];
  const running2=cars.filter(c=>!c.out).sort((a,b)=>b.d-a.d);
  const outs2=cars.filter(c=>c.out);
  const final=[...running2,...outs2];
  const rows=final.map((c,i)=>{ const p=c.out?0:(pts[i]||0);
    return `<div class="rk ${c===focus?'me':''}"><span><span class="p">${c.out?'AB':(i+1)+'º'}</span><b style="color:${teamColor(c.team)}">■</b> ${c.drv.nome}</span><span class="g">${p?p+' pts':''}</span></div>`;}).join('');
  if(CAREER){
    // devolve o resultado pro menu (carreira) e volta pro hub
    const result={ slot:CAREER.slot, round:CAREER.round, track:circuit, weather:weatherKey,
      order: final.map(c=>c.drv.nome) };
    try{ sessionStorage.setItem('lf1_result', JSON.stringify(result)); }catch(e){}
    sessionStorage.removeItem('lf1_race');
    const myPos=final.indexOf(focus)+1;
    fcard.innerHTML=`<h2>🏁 Bandeirada!</h2><div class="eng">${circuitInfo.flag} ${circuitInfo.nome} · ${RACE.laps} voltas</div>
      <div class="ov"><span class="ovn">${focus.out?'AB':myPos+'º'}</span><span class="ovt" style="background:${teamColor(currentTeam)}">${esc0(focus.drv.nome)}</span></div>
      ${rows}
      <button class="fbtn" id="fmenu">➜ Voltar à carreira</button>`;
    document.getElementById('fmenu').onclick=()=>location.href='index.html';
    fichaPanel.classList.remove('hide');
    return;
  }
  fcard.innerHTML=`<h2>🏁 Bandeirada!</h2><div class="eng">${circuitInfo.nome} · ${RACE.laps} voltas · resultado final</div>${rows}
    <button class="fbtn" id="fnova">🔁 Nova corrida</button>
    <button class="fclose" id="fmenu2">➜ Menu principal</button>`;
  document.getElementById('fnova').onclick=()=>location.reload();
  document.getElementById('fmenu2').onclick=()=>location.href='index.html';
  fichaPanel.classList.remove('hide');
}
const esc0=s=>(s||'').replace(/</g,'&lt;');
const fmtQ=s=>{ if(!s||s<1) return '—:--.---'; const m=Math.floor(s/60), sec=s-m*60; return m+':'+sec.toFixed(3).padStart(6,'0'); };
function showQualiResult(){
  const best=focus.bestLap||focus.lastLap||focus.curLap;
  const result={ slot:CAREER.slot, round:CAREER.round, track:circuit, time:best };
  try{ sessionStorage.setItem('lf1_quali', JSON.stringify(result)); }catch(e){}
  sessionStorage.removeItem('lf1_race');
  fcard.innerHTML=`<h2>🏁 Volta de classificação</h2>
    <div class="eng">${circuitInfo.flag} ${circuitInfo.nome}</div>
    <div class="ov"><span class="ovn">${fmtQ(best)}</span></div>
    <div style="opacity:.7;font-size:13px;margin:2px 0 4px">Sua melhor volta — volte pra ver em que posição você larga.</div>
    <button class="fbtn" id="fmenu">➜ Ver o grid de largada</button>`;
  document.getElementById('fmenu').onclick=()=>location.href='index.html';
  fichaPanel.classList.remove('hide');
}
function showOvertake(passer, passed){
  if(!otEl||!passed) return;
  otEl.innerHTML=`<b>ULTRAPASSAGEM!</b> ${lastName(passer.drv.nome)} passou ${lastName(passed.drv.nome)}`;
  otEl.classList.remove('hide'); otEl.classList.add('show');
  clearTimeout(otEl._t); otEl._t=setTimeout(()=>{ otEl.classList.remove('show'); otEl.classList.add('hide'); }, 2000);
}

/* ---------- SISTEMA DE CÂMERAS (vários ângulos, tipo transmissão) ---------- */
let camMode=0;
const CAM_MODES=[
  {key:'perseguicao', name:'Perseguição'},
  {key:'cockpit',     name:'Cockpit'},
  {key:'aerea',       name:'Aérea'},
  {key:'tv',          name:'TV (beira de pista)'},
];
// câmeras fixas de beira de pista (handoff conforme o carro passa)
const camCentroid=new THREE.Vector3();
{ const sp=curve.getSpacedPoints(240); sp.forEach(p=>camCentroid.add(p)); camCentroid.multiplyScalar(1/sp.length); }
const NTV=12, tvCams=[];
for(let i=0;i<NTV;i++){ const uc=(i+0.5)/NTV; const p=curve.getPointAt(uc);
  const out=p.clone().sub(camCentroid).setY(0).normalize();
  tvCams.push(p.clone().addScaledVector(out, 30).setY(8+(i%3)*6)); }
const rnd=a=>(Math.random()*2-1)*a;
function updateCamera(dt, spd01, onKerb){
  const mode=CAM_MODES[camMode].key;
  let fov=FOV_BASE + spd01*(FOV_MAX-FOV_BASE);
  if(mode==='perseguicao'){
    const dist=8.5-spd01*1.2;
    const desired=focusPos.clone().addScaledVector(focusTan,-dist).add(new THREE.Vector3(0,2.5,0));
    camPos.lerp(desired, 1-Math.pow(0.0016,dt));
    const sh=spd01*0.006+(onKerb?0.02:0);
    camera.up.set(0,1,0); camera.position.set(camPos.x+rnd(sh),camPos.y+rnd(sh),camPos.z);
    lookTmp.copy(focusPos).addScaledVector(focusTan,8).setY(1.1); camera.lookAt(lookTmp);
  } else if(mode==='cockpit'){
    fov=78+spd01*6;
    const eye=focusPos.clone().add(new THREE.Vector3(0,1.12,0)).addScaledVector(focusTan,-0.1);
    camPos.copy(eye);
    const sh=spd01*0.005+(onKerb?0.016:0);
    camera.up.set(0,1,0); camera.position.set(eye.x+rnd(sh),eye.y+rnd(sh*0.6),eye.z+rnd(sh));
    lookTmp.copy(focusPos).addScaledVector(focusTan,14).setY(0.85); camera.lookAt(lookTmp);
  } else if(mode==='aerea'){
    fov=56;                                             // bem aberta, mostra a pista em volta
    const desired=focusPos.clone().addScaledVector(focusTan,-40).add(new THREE.Vector3(0,80,0));
    camPos.lerp(desired, 1-Math.pow(0.02,dt));          // segue suave (drone/helicóptero)
    camera.up.set(0,1,0); camera.position.copy(camPos);
    lookTmp.copy(focusPos).addScaledVector(focusTan,12).setY(0); camera.lookAt(lookTmp);
  } else { // TV — câmera fixa mais próxima, com "zoom" (teleobjetiva)
    const cam=tvCams[Math.floor(focusU*NTV)%NTV];
    camera.up.set(0,1,0); camera.position.copy(cam);
    const dist=cam.distanceTo(focusPos);
    fov=THREE.MathUtils.clamp(1000/dist, 14, 38);   // longe = mais zoom
    lookTmp.copy(focusPos).setY(0.6); camera.lookAt(lookTmp);
  }
  if(Math.abs(camera.fov-fov)>0.1){ camera.fov=fov; camera.updateProjectionMatrix(); }
  return mode;
}
function cycleCam(){ camMode=(camMode+1)%CAM_MODES.length; if(camBtn) camBtn.textContent='📹 '+CAM_MODES[camMode].name; }

function frame(){
  const dt=Math.min(clock.getDelta(),0.05);

  raceTime+=dt;

  // ---- atualiza os 20 carros (racing line + IA + colisões) ----
  updateField(cars, line, dt, raceTime, started);

  // ---- extrai o carro em foco (alimenta câmera/som/HUD) ----
  focus=findFocus();
  const prevSpeed=focusSpeed;
  focusSpeed=focus.speed;
  focusPos.copy(focus.g.position);
  if(focus.tan) focusTan.copy(focus.tan).normalize();
  focusU=((focus.d/total)%1+1)%1;
  const throttle = focusSpeed>=prevSpeed-0.02 ? 1 : 0;
  const kmh=focusSpeed*3.6;
  const spd01=THREE.MathUtils.clamp(focusSpeed/95,0,1);
  const onKerb=false;

  const curMode=updateCamera(dt, spd01, onKerb);

  // ---- SOM do motor (carro em foco) ----
  const {rpm,gear}=rpmFor(kmh);
  if(audioOn) audio.update(rpm, throttle, kmh, onKerb, dt, gear);

  // sol acompanha o foco
  sun.position.set(focusPos.x+120, 300, focusPos.z+90);
  sun.target.position.copy(focusPos); sun.target.updateMatrixWorld();

  // HUD
  hudSpeed.textContent=Math.round(kmh);
  if(hudGear) hudGear.textContent=gear;
  const showFX=(curMode==='perseguicao'||curMode==='cockpit');
  if(speedFX) speedFX.style.opacity = (showFX && spd01>0.45? (spd01-0.45)/0.55*0.9 : 0).toFixed(2);
  drawMini();
  updateTower(dt);
  updateTelemetry(focus);
  updateLapTimer(focus);

  for(const c of cars){ if(c.g.isLOD) c.g.update(camera); }   // troca detalhe por distância

  renderer.render(scene,camera);
  requestAnimationFrame(frame);
}

/* ---------- HUD ---------- */
const hudSpeed=document.getElementById('spd');
const hudDrv=document.getElementById('drvline');
const hudGear=document.getElementById('gear');
const speedFX=document.getElementById('speedfx');

/* ---------- TELEMETRIA (combustível / pneu / dano do carro em foco) ---------- */
const telFuel=document.getElementById('tFuel'), telFuelV=document.getElementById('tFuelV');
const telComp=document.getElementById('tComp'), telWear=document.getElementById('tWear'), telWearV=document.getElementById('tWearV');
const telDmg=document.getElementById('tDmg'), telDmgV=document.getElementById('tDmgV'), telH=document.getElementById('telemH');
const gyr=t=>`hsl(${Math.round((1-Math.max(0,Math.min(1,t)))*120)},78%,47%)`;   // verde(0)->vermelho(1)
function updateTelemetry(c){
  if(!telFuel||!c) return;
  const f=Math.max(0,Math.min(1,c.fuel??1));
  telFuel.style.width=(f*100).toFixed(0)+'%'; telFuel.style.background=gyr(1-f); telFuelV.textContent=Math.round(f*100)+'%';
  const T=TIRES[c.tire]; if(T){ telComp.textContent=c.tire; telComp.style.background=T.col; }
  const w=Math.max(0,Math.min(1,c.wear));
  telWear.style.width=((1-w)*100).toFixed(0)+'%'; telWear.style.background=gyr(w); telWearV.textContent=Math.round((1-w)*100)+'%';
  const d=Math.max(0,Math.min(1,c.damage));
  telDmg.style.width=((1-d)*100).toFixed(0)+'%'; telDmg.style.background=gyr(d);
  telDmgV.textContent = d<0.06?'Íntegro' : d<0.3?'Leve' : d<0.5?'Asa batida' : 'Precisa reparo';
  if(telH) telH.textContent = c.pitPhase>0 ? ('NO PIT · '+(c.pitReason||'serviço').toUpperCase()) : 'TELEMETRIA';
}

/* ---------- CRONÔMETRO (volta atual + melhor volta do carro em foco) ---------- */
const tCur=document.getElementById('tCur'), tBest=document.getElementById('tBest');
const tBestBox=tBest&&tBest.parentElement;
const fmtLap=s=>{ if(!s||s<1) return '–:––.–'; const m=Math.floor(s/60); const sec=s-m*60;
  return m+':'+sec.toFixed(1).padStart(4,'0'); };
function updateLapTimer(c){ if(!tCur||!c) return;
  tCur.textContent=fmtLap(c.curLap);
  tBest.textContent=fmtLap(c.bestLap);
  if(tBestBox){ if(c.bestFlash && raceTime-c.bestFlash<1) tBestBox.classList.add('flash');
    else tBestBox.classList.remove('flash'); }
}
const camBtn=document.getElementById('cam');
if(camBtn){ camBtn.textContent='📹 '+CAM_MODES[camMode].name; camBtn.addEventListener('click', cycleCam); }
addEventListener('keydown', e=>{ if(e.key==='c'||e.key==='C') cycleCam(); });

/* ---------- botão de som (autoplay exige gesto) ---------- */
const startBtn=document.getElementById('sound');
function enableAudio(){ try{ audio.start(); audioOn=true; }catch(e){}
  if(startBtn) startBtn.classList.add('hide'); }
if(startBtn) startBtn.addEventListener('click', enableAudio);
addEventListener('pointerdown', enableAudio, {once:true});

/* ---------- seletor de equipe (cores reais) ---------- */
const teamSel=document.getElementById('team');
if(teamSel){
  for(const key in TEAMS){ const o=document.createElement('option'); o.value=key; o.textContent=TEAMS[key].name; teamSel.appendChild(o); }
  teamSel.value=currentTeam;
  teamSel.addEventListener('change', ()=>{ setTeam(teamSel.value); if(!fichaPanel.classList.contains('hide')) renderFicha(); });
}
/* ---------- SELETOR DE CIRCUITO (troca recarrega com ?track=) ---------- */
const circuitSel=document.getElementById('circuit');
if(circuitSel){
  for(const c of CIRCUIT_LIST){ const o=document.createElement('option'); o.value=c.key;
    o.textContent=`${c.flag} ${c.nome} · ${c.km}km`; circuitSel.appendChild(o); }
  circuitSel.value=circuit;
  circuitSel.addEventListener('change', ()=>{ const u=new URL(location.href);
    u.searchParams.set('track', circuitSel.value); location.href=u.toString(); });
}
// título com o nome do circuito
(function(){ const t=document.querySelector('#title > span');
  if(t) t.textContent=`${circuitInfo.flag} ${circuitInfo.nome} · ${circuitInfo.km}km · ${WX.icon} ${WX.nome}`;
  if(CAREER){ const b=document.querySelector('#title b'); if(b) b.innerHTML=`<span class="flag"></span>${esc0(PLAYER.driverName)}`;
    // na carreira a pista e a equipe são fixas — esconde os seletores
    const cs=document.getElementById('circuit'), ts=document.getElementById('team');
    if(cs) cs.style.display='none'; if(ts) ts.style.display='none';
    const tag=document.getElementById('tag'); if(tag) tag.textContent=(QUALI?'Classificação':'Carreira')+' · GP '+((CAREER.round||0)+1); }
  // camada de chuva conforme o clima
  const rain=document.getElementById('rain');
  if(rain){ if(WX.wet>=0.7) rain.className='heavy'; else if(WX.wet>=0.35) rain.className='on'; }
})();

/* ---------- FICHA TÉCNICA (desempenho do carro) ---------- */
const fichaBtn=document.getElementById('ficha');
const fichaPanel=document.getElementById('fichaPanel');
const fcard=document.getElementById('fcard');
const barColor=v=> v>=88?'#22c55e' : v>=82?'#84cc16' : v>=77?'#eab308' : v>=73?'#f97316' : '#ef4444';
const teamColor=key=>'#'+((TEAMS[key].body)>>>0).toString(16).padStart(6,'0');
function renderFicha(){
  const s=carStats(currentTeam), tc=tier(s.geral), t=TEAMS[currentTeam];
  const rows=[['Potência',s.potencia],['Eficiência',s.eficiencia],['Aerodinâmica',s.aero],
              ['Chassi',s.chassi],['Pneus',s.pneus],['Confiabilidade',s.confiabilidade]];
  const bars=rows.map(([lb,v])=>`<div class="srow"><span class="lb">${lb}</span>
    <span class="bar"><i style="width:${v}%;background:${barColor(v)}"></i></span><span class="vl">${v}</span></div>`).join('');
  const drv=driversOf(currentTeam).map(d=>{ const ov=overall(d);
    const mini=ATTRS.map(([k,lb])=>`<div class="srow"><span class="lb">${lb}</span>
      <span class="bar"><i style="width:${d[k]}%;background:${barColor(d[k])}"></i></span><span class="vl">${d[k]}</span></div>`).join('');
    return `<div class="drv"><div class="drvh"><b>#${d.num} ${d.nome}</b><span class="ovt" style="background:${tier(ov).col}">${ov}</span></div>${mini}</div>`;
  }).join('');
  const rk=ranking().map((r,i)=>`<div class="rk ${r.key===currentTeam?'me':''}"><span><span class="p">${i+1}º</span><b style="color:${teamColor(r.key)}">■</b> ${TEAMS[r.key].name}</span><span class="g">${r.geral}</span></div>`).join('');
  fcard.innerHTML=`<h2 style="color:${teamColor(currentTeam)}">${t.name}</h2>
    <div class="eng">Motor: ${s.engine} · Nº ${t.num} · patrocínio ${t.sponsor}</div>
    <div class="ov"><span class="ovn">${s.geral}</span><span class="ovt" style="background:${tc.col}">${tc.txt}</span></div>
    ${bars}
    <h3>PILOTOS (2025)</h3>${drv}
    <button class="fbtn" id="fsim">🏁 Simular corrida (com sorte)</button>
    <h3>CLASSIFICAÇÃO DOS CARROS (2025)</h3>${rk}
    <button class="fclose" id="fclose">Fechar</button>`;
  document.getElementById('fclose').onclick=()=>fichaPanel.classList.add('hide');
  document.getElementById('fsim').onclick=renderRace;
}
function renderRace(){
  const res=simulateRace(carStats, 3.0);
  const rows=res.map(r=>`<div class="rk ${r.team===currentTeam?'me':''}"><span><span class="p">${r.pos}${r.pos==='AB'?'':'º'}</span><b style="color:${teamColor(r.team)}">■</b> ${r.nome}</span><span class="g">${r.dnf?'AB':r.ovr}</span></div>`).join('');
  fcard.innerHTML=`<h2>🏁 Resultado da corrida</h2>
    <div class="eng">Interlagos · 20 carros · desempenho = 62% carro + 38% piloto + sorte</div>
    ${rows}
    <button class="fbtn" id="fagain">🔁 Simular de novo</button>
    <button class="fclose" id="fback">← Voltar</button>`;
  document.getElementById('fagain').onclick=renderRace;
  document.getElementById('fback').onclick=renderFicha;
}
if(fichaBtn){ fichaBtn.addEventListener('click', ()=>{ renderFicha(); fichaPanel.classList.remove('hide'); }); }
fichaPanel.addEventListener('click', e=>{ if(e.target===fichaPanel) fichaPanel.classList.add('hide'); });

window.__f1={scene,camera,get car(){return focus.g;},track,renderer}; window.__audio=audio; window.__setTeam=setTeam;
window.__cars=cars; window.__line=line; window.__RACE=RACE;
Object.defineProperty(window,'__rt',{get:()=>raceTime}); Object.defineProperty(window,'__started',{get:()=>started});
window.__forceStart=()=>{ started=true; for(const c of cars) c.launchStart=raceTime+c.reaction; };
window.__step=(n=600,fdt=1/60)=>{ for(let i=0;i<n;i++){ raceTime+=fdt; updateField(cars,line,fdt,raceTime,started); } };
function resize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); }
addEventListener('resize',resize); resize();
startLights();   // largada parada com semáforo
frame();
