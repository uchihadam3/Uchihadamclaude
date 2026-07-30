/* ========================================================================
   LENDAS DA F1 — motor de corrida com 20 carros (v3, simulação realista).

   Como os jogos de manager reais (Motorsport Manager / F1 Manager):
   - Racing line com apex; cada piloto tem ESTILO próprio (freada, linha,
     velocidade de curva) e comete erros conforme consistência/pressão.
   - Cada CARRO tem perfil próprio (aceleração, velocidade final, curva,
     freio) derivado da ficha técnica da equipe.
   - Ultrapassagem: vácuo na reta e mergulho POR DENTRO na freada — só
     quando há brecha real; defensores cobrem o lado de dentro; quem erra
     a curva (sai largo) abre a porta.
   - SEM rodadas aleatórias: rodada/quebra só em contato forte (raro).
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { buildF1Car, TEAMS } from './car.js';
import { DRIVERS, overall } from './drivers.js';
import { carStats } from './stats.js';

/* Versão de DISTÂNCIA do carro: funde as peças POR MATERIAL (mantém as mesmas cores,
   texturas e materiais -> fica IDÊNTICO ao carro bonito), mas com poucos draw calls.
   Sem articulação (rodas não giram de longe — imperceptível). Mata o lag na aérea. */
function mergeCarByMaterial(group){
  group.updateWorldMatrix(true,true);
  const inv=new THREE.Matrix4().copy(group.matrixWorld).invert();
  const groups=new Map();                       // material -> {P,N,U}
  const v=new THREE.Vector3(), n=new THREE.Vector3();
  group.traverse(o=>{ if(!o.isMesh||!o.geometry) return;
    const mat=Array.isArray(o.material)?o.material[0]:o.material; if(!mat) return;
    let geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry;
    const pos=geo.attributes.position, nrm=geo.attributes.normal, uvA=geo.attributes.uv; if(!pos) return;
    const m=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld);
    const nm=new THREE.Matrix3().getNormalMatrix(m);
    let g=groups.get(mat); if(!g){ g={P:[],N:[],U:[]}; groups.set(mat,g); }
    for(let i=0;i<pos.count;i++){
      v.fromBufferAttribute(pos,i).applyMatrix4(m); g.P.push(v.x,v.y,v.z);
      if(nrm){ n.fromBufferAttribute(nrm,i).applyMatrix3(nm).normalize(); g.N.push(n.x,n.y,n.z);} else g.N.push(0,1,0);
      g.U.push(uvA?uvA.getX(i):0, uvA?uvA.getY(i):0);
    }
    if(geo!==o.geometry) geo.dispose();
  });
  const out=new THREE.Group();
  for(const [mat,g] of groups){
    const bg=new THREE.BufferGeometry();
    bg.setAttribute('position',new THREE.Float32BufferAttribute(g.P,3));
    bg.setAttribute('normal',new THREE.Float32BufferAttribute(g.N,3));
    bg.setAttribute('uv',new THREE.Float32BufferAttribute(g.U,2));
    out.add(new THREE.Mesh(bg, mat));
  }
  return out;
}

const UP = new THREE.Vector3(0,1,0);

/* ---------- CORRIDA & PNEUS ---------- */
export const RACE={ laps:12 };
/* cada pneu tem grip no SECO e na CHUVA. Slicks (S/M/H) mandam no seco e afundam na
   água; Intermediário e Chuva são ruins no seco e mandam no molhado. */
export const TIRES={
  S:{nome:'Macio', dry:1.012, wet:0.55, wear:1.6, col:'#ef4444'},
  M:{nome:'Médio', dry:1.000, wet:0.54, wear:1.0, col:'#eab308'},
  H:{nome:'Duro',  dry:0.990, wet:0.52, wear:0.62,col:'#e5e7eb'},
  I:{nome:'Inter', dry:0.905, wet:0.86, wear:1.15,col:'#22c55e'},
  W:{nome:'Chuva', dry:0.780, wet:0.905,wear:0.95,col:'#38bdf8'},
};
/* ---------- CLIMA ---------- */
export const WEATHERS={
  sol:       {nome:'Sol',        wet:0.00, sky:0x8fc0f0, fog:[520,1700], amb:1.00, icon:'☀️'},
  nublado:   {nome:'Nublado',    wet:0.06, sky:0xa4b4c2, fog:[460,1500], amb:0.86, icon:'⛅'},
  garoa:     {nome:'Garoa',      wet:0.42, sky:0x7f8d99, fog:[360,1150], amb:0.72, icon:'🌦️'},
  chuva:     {nome:'Chuva',      wet:0.80, sky:0x5c6772, fog:[260,900],  amb:0.56, icon:'🌧️'},
  tempestade:{nome:'Tempestade', wet:1.00, sky:0x424b54, fog:[190,680],  amb:0.44, icon:'⛈️'},
};
let CURW=WEATHERS.sol, CURWET=0;
export function setWeather(key){ CURW=WEATHERS[key]||WEATHERS.sol; CURWET=CURW.wet; return CURW; }
export function weather(){ return {...CURW, key:Object.keys(WEATHERS).find(k=>WEATHERS[k]===CURW)}; }
const tireGrip=t=> t.dry*(1-CURWET) + t.wet*CURWET;      // grip efetivo conforme o clima
// pneu ideal pra condição atual
const idealTire=(lapsLeft)=> CURWET>0.62 ? 'W' : CURWET>0.28 ? 'I' : (lapsLeft<=6?'S':(Math.random()<0.55?'M':'H'));
const strHash=s=>{let x=0;for(const ch of s)x=(x*131+ch.charCodeAt(0))|0;return ((x>>>0)%10000)/10000;};
const PITOFF=17;                 // afastamento da RUA do pit (separada da pista, com gap no meio)
/* ---------- VIA DO PIT (rua separada: diverge da pista -> boxes -> volta) ----------
   s = metros relativos à linha de largada (negativo = antes). A via ABRE numa rampa
   antes da linha, corre paralela pelos boxes, e FECHA numa rampa depois da curva 1.
   A pista usa a MESMA função pra desenhar a rua, então carro e asfalto batem. */
export const PIT={ off:PITOFF, entry:340, taperIn:70, exitAfter:120, taperOut:75, boxS:-62, boxGap:9 };
const smoothstep=t=>{ t=t<0?0:t>1?1:t; return t*t*(3-2*t); };
export function pitOffsetS(s){
  const A=-PIT.entry, B=A+PIT.taperIn, C=PIT.exitAfter, D=C+PIT.taperOut;
  if(s<=A || s>=D) return 0;
  if(s<B)  return PIT.off*smoothstep((s-A)/(B-A));   // rampa de ENTRADA (diverge)
  if(s<=C) return PIT.off;                            // reta dos boxes
  return PIT.off*smoothstep((D-s)/(D-C));             // rampa de SAÍDA (converge)
}

/* ---------- RACING LINE (out-in-out de verdade) ----------
   Elástico bem convergido (2500 iterações em arrays rápidos): a linha
   ABRE pro lado de fora antes da curva, corta o apex por dentro e sai
   abrindo — como piloto de verdade. Depois é acentuada até as bordas. */
export function computeLine(curve, half){
  const N=1000;
  const center=[], left=[], ctan=[];
  const cx=new Float32Array(N), cz=new Float32Array(N), lx=new Float32Array(N), lz=new Float32Array(N);
  for(let i=0;i<N;i++){ const u=i/N; const p=curve.getPointAt(u); const t=curve.getTangentAt(u).normalize();
    const l=new THREE.Vector3().crossVectors(UP,t).normalize();
    center.push(p); ctan.push(t); left.push(l);
    cx[i]=p.x; cz[i]=p.z; lx[i]=l.x; lz[i]=l.z; }
  const maxOff = Math.max(half-1.0, 0.5);
  const o=new Float32Array(N);
  for(let it=0; it<2500; it++){
    for(let i=0;i<N;i++){ const a=(i-1+N)%N, b=(i+1)%N;
      const pax=cx[a]+lx[a]*o[a], paz=cz[a]+lz[a]*o[a];
      const pbx=cx[b]+lx[b]*o[b], pbz=cz[b]+lz[b]*o[b];
      // (meio dos vizinhos - centro) projetado no vetor esquerdo
      const tgt=((pax+pbx)/2-cx[i])*lx[i]+((paz+pbz)/2-cz[i])*lz[i];
      let v=o[i]+(tgt-o[i])*0.3;
      o[i]=v>maxOff?maxOff:(v<-maxOff?-maxOff:v);
    }
  }
  // acentua o out-in-out de forma MODERADA (linha suave, sem ziguezague)
  for(let i=0;i<N;i++){ const v=o[i]*1.4; o[i]=v>maxOff?maxOff:(v<-maxOff?-maxOff:v); }
  // suaviza bastante: na parte travada (curva atrás de curva) a linha fica calma
  for(let pass=0;pass<7;pass++){
    for(let i=0;i<N;i++){ const a=(i-1+N)%N, b=(i+1)%N; o[i]=(o[a]+o[i]*2+o[b])/4; }
  }
  const vmax=new Float32Array(N);
  const pos=[]; for(let i=0;i<N;i++) pos.push(center[i].clone().addScaledVector(left[i],o[i]));
  for(let i=0;i<N;i++){ const a=(i-1+N)%N,b=(i+1)%N;
    const t1=pos[i].clone().sub(pos[a]), t2=pos[b].clone().sub(pos[i]);
    const ds=(t1.length()+t2.length())/2, ang=t1.angleTo(t2);
    const k=ang/Math.max(ds,0.01);
    let v=k>1e-4?Math.sqrt(29/k):100; vmax[i]=Math.min(Math.max(v,15),99);
  }
  return { N, center, left, ctan, offset:o, vmax, len:curve.getLength() };
}
const at=(arr,f,N)=>{ const i=((Math.floor(f)%N)+N)%N, j=(i+1)%N, t=f-Math.floor(f); return arr[i]*(1-t)+arr[j]*t; };
const vat=(arr,f,N)=>{ const i=((Math.floor(f)%N)+N)%N, j=(i+1)%N, t=f-Math.floor(f);
  return arr[i].clone().multiplyScalar(1-t).add(arr[j].clone().multiplyScalar(t)); };

/* ---------- GRID DE 20 CARROS ---------- */
export function buildField(scene, line, trackKey='interlagos'){
  const grid = DRIVERS.map(d=>({ d, pace: carStats(d.team).geral*0.62 + overall(d)*0.38 }));
  // "classificação" temporária: embaralha o grid (não fica mais equipe atrás de equipe)
  grid.forEach(it=> it.qual = it.pace + (Math.random()-0.5)*7.5);
  grid.sort((a,b)=>b.qual-a.qual);
  const cars=[];
  grid.forEach((it,slot)=>{
    const drv=it.d;
    const full=buildF1Car({team:drv.team, number:String(drv.num), simple:true});
    full.traverse(o=>{ if(o.isMesh){ o.castShadow=false; } });
    // LOD: perto = completo (rodas giram); longe = mesmo carro fundido por material
    // (IDÊNTICO, bonito) com poucos draw calls -> sem lag na aérea
    const merged=mergeCarByMaterial(full);
    const g=new THREE.LOD();
    g.addLevel(full,0); g.addLevel(merged,42);
    g.userData.body=full.userData.body; g.userData.wheels=full.userData.wheels; g.userData.radius=full.userData.radius;
    scene.add(g);
    const side=(slot%2===0)?1:-1, LAT=2.8;
    const reaction = 0.18 + (1-(it.pace-76)/17)*0.26 + Math.random()*0.14;
    // ===== ESTILO do piloto — bem DIFERENTE de um pro outro (até companheiros) =====
    const hsh=s=>{let x=0;for(const ch of s)x=(x*131+ch.charCodeAt(0))|0;return ((x>>>0)%10000)/10000;};
    const h1=hsh(drv.nome), h2=hsh(drv.nome+'#'), h3=hsh(drv.nome+'@');
    const nrm=(v,mid,span)=>THREE.MathUtils.clamp((v-mid)/span,-1,1);
    const style={
      brakeLate: THREE.MathUtils.clamp(0.5 + nrm(drv.ultrapassagem,84,15)*0.45 + (h1-0.5)*0.8, 0, 1), // freia tarde x cedo
      cornerCarry: THREE.MathUtils.clamp(nrm(drv.ritmo,88,12)*0.6 + (h2-0.5)*0.9, -1, 1),               // carrega curva
      lineBias: (h1-0.5)*1.7 + nrm(drv.ritmo,88,16)*0.4,                                                // linha PESSOAL
      aggro: THREE.MathUtils.clamp(0.45 + nrm(drv.ultrapassagem,84,15)*0.5 + (h3-0.5)*0.55, 0.06, 1),   // agressividade
      defense: THREE.MathUtils.clamp(0.5 + nrm(drv.defesa,84,13)*0.55, 0.05, 1),                        // firmeza defesa
      errK: THREE.MathUtils.clamp(1.5 - nrm(drv.consistencia,84,16)*1.2, 0.25, 2.6),                    // tende a errar
      smooth: THREE.MathUtils.clamp(0.5 + nrm(drv.consistencia,84,16)*0.5, 0.1, 1),                     // suavidade
      phase: h2*Math.PI*2,
    };
    // FORÇA por PISTA: em cada circuito um piloto vai um pouco melhor que o outro
    const trackMod=(strHash(drv.nome+'|'+trackKey)-0.5)*0.02;      // ±1% de ritmo, específico da pista
    // pneu inicial conforme o clima da corrida
    const startTire = CURWET>0.62?'W' : CURWET>0.28?'I' : (slot<6?'S':(slot<14?'M':(Math.random()<0.5?'M':'H')));
    // PERFIL do carro (da ficha técnica): uns aceleram melhor, outros têm
    // mais velocidade final, mais curva (aero) ou mais freio (chassi)
    const cs=carStats(drv.team);
    const perf={
      power:  880*(1+(cs.potencia-86)*0.012),   // potência/massa (~W/kg) -> aceleração e reta
      traction: 11.5+(cs.chassi-84)*0.03,       // limite de tração na saída (0-100 ~2.5s real)
      top:    95+(cs.potencia-86)*0.45,         // velocidade final (m/s) ~330-355 km/h
      corner: 1+(cs.aero-84)*0.0045,            // aero -> velocidade de curva
      brake0: 20+(cs.chassi-84)*0.10,           // freio base (baixa velocidade)
    };
    cars.push({ g, drv, style, perf, team:drv.team, wheels:g.userData.wheels, rad:g.userData.radius,
      pace:it.pace, gridPos:slot+1, reaction, launchStart:1e9, gridOffset:side*LAT,
      d: -(8 + slot*8), offset: side*LAT, tOffset: side*LAT,
      speed:0, spin:0, spinRate:0, damage:0, out:false, outSide:side, tilt:0,
      passCd:4, hitCd:0, passing:null, form:0, avoidS:0, cornerErr:0, yieldT:0, yieldOff:0,
      tire: startTire, wear:0, pits:0, trackMod,
      _lap:-1, lapPace:0, lapBrake:0, lapLine:0, pushMood:1, straightSeen:false,  // variação volta-a-volta
      lastLap:0, bestLap:0, curLap:0, bestFlash:0,                                 // cronômetro de volta
      pitLap: Math.max(3, Math.round(RACE.laps*(0.35+Math.random()*0.3))),
      pitPhase:0, pitT:0, pitReason:'', lapsDone:0, blueT:0, finished:false, outT:0,
      fuel:1, dmgWing:0,                                   // combustível 100% + dano na asa dianteira
      tan:vat(line.ctan, ((-(8+slot*8)/line.len)*line.N%line.N+line.N)%line.N, line.N).clone() });
  });
  return cars;
}

/* ---------- ATUALIZAÇÃO ---------- */
export function updateField(cars, line, dt, t, started){
  const N=line.N, len=line.len;
  const idxOf=c=> ((c.d/len)*N % N + N) % N;
  const gapAhead=(a,c)=>{ let g=a.d-c.d; if(g<0)g+=len; return g; };
  const dist=(a,b)=>{ let g=Math.abs(a.d-b.d); if(g>len/2)g=len-g; return g; };

  const live=cars.filter(c=>!c.out);
  const order=[...live].sort((a,b)=>b.d-a.d);
  for(let k=0;k<order.length;k++){
    order[k].ahead=order[k-1]||null;
    const ch=order[k+1]||null;
    order[k].chaser=ch;
    order[k].chaserGap = ch ? gapAhead(order[k],ch) : 999;
  }

  for(const c of cars){
    if(c.out){ c.speed=Math.max(c.speed-24*dt,0);
      c.offset=THREE.MathUtils.lerp(c.offset,c.outSide*6.4,dt*1.2); c.d+=c.speed*dt;
      c.outT+=dt; if(c.outT>9) c.g.visible=false;        // fiscais tiram o carro
      continue; }
    if(!started || t<c.launchStart){ c.speed=Math.max(c.speed-30*dt,0); continue; }

    const f=idxOf(c), racingOff=at(line.offset,f,N);
    // ---- VOLTA NOVA: cronômetro (tempo da volta + melhor volta) e variação de pilotagem ----
    if(c.lapsDone!==c._lap){
      if(c.lapStart!==undefined){ const lt=t-c.lapStart;      // fecha a volta que terminou
        if(lt>8){ c.lastLap=lt; if(!c.bestLap||lt<c.bestLap){ c.bestLap=lt; c.bestFlash=t; } } }
      c.lapStart=t; c._lap=c.lapsDone;
      c.lapPace  = (Math.random()-0.5)*0.016;      // ±0.8% de ritmo nessa volta
      c.lapBrake = (Math.random()-0.5)*0.30;       // freia um tico antes/depois
      c.lapLine  = (Math.random()-0.5)*0.55;       // linha ligeiramente diferente
    }
    c.curLap = c.lapStart!==undefined ? (t-c.lapStart) : 0;   // tempo da volta atual (correndo)
    // CLIMA: bom de chuva rende mais no molhado
    const wetSkill = CURWET>0 ? (1 + (c.drv.chuva-84)/16*0.05*CURWET) : 1;
    // ritmo = carro/piloto + força NA PISTA + humor da volta + clima (spread real ~3%)
    const skill=(0.955+(c.pace-76)/17*0.035) * (1 + c.lapPace + c.trackMod) * wetSkill;
    const cf=c.perf.corner*(1+0.024*c.style.cornerCarry);          // fator de curva carro+estilo (diferença nítida)

    // ---- FRENAGEM REALISTA: o freio depende da velocidade (downforce) ----
    // dec = b0 + kb·v² -> ~5.5g em alta velocidade, ~2.3g em baixa (como F1 real)
    const bl=THREE.MathUtils.clamp(c.style.brakeLate + c.lapBrake*0.4, 0, 1);
    const b0=c.perf.brake0 + 3.4*bl, kb=0.0042;
    const marg=1.20 - 0.17*bl;                                     // late-brakers: freiam bem mais tarde
    const vHere=at(line.vmax,f,N); const vNow=(vHere<80? vHere*cf : vHere);
    const decMul=(c.passing&&c.passing.dive)?1.28:1;               // MERGULHO: freia mais tarde
    let vAllow=99, minFi=f, apexDist=0;
    for(let s=1;s<=20;s++){ const dd=10*s; const fi=(((c.d+dd)/len)*N%N+N)%N;
      let vv=at(line.vmax,fi,N); if(vv<80) vv*=cf;
      const dec=(b0+kb*(c.speed*c.speed+vv*vv)/2)*decMul/marg;     // desaceleração média até lá
      const va=Math.sqrt(vv*vv+2*dec*dd);                          // vel. máxima AGORA pra conseguir frear
      if(va<vAllow){ vAllow=va; minFi=fi; apexDist=dd; } }
    let vApex=at(line.vmax,minFi,N); if(vApex<80) vApex*=cf;
    const insideSide = Math.sign(at(line.offset,minFi,N)) || 1;    // lado de DENTRO da curva à frente
    const onStraight = vNow>72;
    const bindingCorner = vApex<65;
    const heavyBraking = bindingCorner && (c.speed - vApex > 10);

    // ---- forma oscilante (pneu/combustível/momento) ----
    c.form += (Math.random()-0.5)*0.006*(1.7-c.style.smooth);      // menos suave = ritmo mais irregular
    c.form = THREE.MathUtils.clamp(c.form, -0.032, 0.032);
    c.lapsDone=Math.max(0,Math.floor(c.d/len));
    // pneu: desgasta e perde ritmo; combustível: queima ao longo da corrida (carro fica leve/rápido)
    const tire=TIRES[c.tire];
    const slick=tire.dry>tire.wet;                                // S/M/H são slicks
    const wrongTire = slick ? CURWET : (1-CURWET);                // 0=certo pro clima, 1=totalmente errado
    c.wear=Math.min(1, c.wear + dt*0.0016*tire.wear*(1 + wrongTire*0.7));  // pneu errado gasta mais
    const tireMul=tireGrip(tire)*(1-c.wear*0.10);                 // grip conforme o CLIMA
    c.fuel=Math.max(0.03, 1 - c.d/(RACE.laps*len));               // 100% -> ~3% no fim
    const fuelMul=0.984 + 0.016*(1-c.fuel);                       // tanque cheio = mais pesado/lento
    // variação de RETA: às vezes empurra mais, às vezes menos (renova ao entrar na reta)
    if(onStraight){ if(!c.straightSeen){ c.straightSeen=true; c.pushMood=1+(Math.random()-0.5)*0.03; } }
    else c.straightSeen=false;
    const push = onStraight ? c.pushMood : 1;
    let targetV=Math.min(vNow, vAllow, 99)*skill*(1+c.form)*(1-0.3*c.damage)*tireMul*fuelMul*push;

    // ---- LINHA: base = a racing line já traz o out-in-out suave embutido ----
    let tOff = racingOff + c.style.lineBias*0.95 + c.lapLine*0.4;   // linha pessoal + variação da volta
    // antecipação SUAVE: só em curva RÁPIDA com espaço (não na parte travada/lenta),
    // abre um pouquinho pra fora antes de entrar — depois a própria linha fecha no apex.
    const fastCorner = vApex>70 && vApex<150 && c.speed>vApex+8;
    if(fastCorner){
      const w=THREE.MathUtils.clamp((apexDist-12)/85, 0, 1);       // 1 = ainda longe do apex
      const outEdge=-insideSide*4.2;                               // abertura moderada pra fora
      tOff=THREE.MathUtils.lerp(tOff, outEdge, Math.pow(w,0.95)*0.5);
    }

    // ---- PIT STOP: via SEPARADA (diverge -> boxes -> volta); pneu + reparo (F1 não reabastece) ----
    const dPos=((c.d%len)+len)%len;
    const s = dPos>len/2 ? dPos-len : dPos;              // metros rel. à linha (neg = antes)
    const lapsLeft=RACE.laps-c.lapsDone;
    // decide entrar ANTES da rampa de entrada da via
    if(c.pitPhase===0 && !c.finished && lapsLeft>1 && s>-620 && s<-PIT.entry){
      if(c.damage>0.5 && c.pits<3){ c.pitPhase=1; c.pitReason='reparo'; }
      else if(c.wear>0.72 && c.pits<2){ c.pitPhase=1; c.pitReason='pneu'; }
      else if(c.pits<1 && c.lapsDone>=c.pitLap){ c.pitPhase=1; c.pitReason='pneu'; }
    }
    if(c.pitPhase>0){
      const po=pitOffsetS(s);                            // posição lateral na via de pit
      const boxS = PIT.boxS - (c.gridPos%10)*PIT.boxGap;  // marca do box deste carro
      if(po>0.06) tOff=po;                               // já está na via -> segue a rua
      if(c.pitPhase===1){                                 // ENTRANDO: diverge e freia até o box
        if(po>0.06){
          targetV=Math.min(targetV,23);                  // limite do pit (~80 km/h)
          const dToBox=boxS-s;                           // distância até o box (>0 antes)
          if(dToBox<28) targetV=Math.min(targetV, Math.max(1.4, dToBox*0.9));   // freia pro box
          if(dToBox<=0.8){
            c.pitPhase=2;
            const needFix=c.damage>0.35;
            c.pitT=(2.3+Math.random()*0.9) + (needFix?3.5+c.damage*9:0);        // pneu ~2.5s; +asa 4-12s
            c.pitFix=needFix;
          }
        }
      } else if(c.pitPhase===2){                          // PARADO no box (equipe trabalha)
        tOff=PIT.off; targetV=0;
        if(c.speed<0.6){ c.pitT-=dt;
          if(c.pitT<=0){
            c.tire = idealTire(lapsLeft);                                       // pneu ideal pro clima
            c.wear=0;
            if(c.pitFix){ c.damage=Math.min(c.damage,0.05); c.dmgWing=0; }      // reparo: asa/peça nova
            c.pits++; c.pitPhase=3;
          } }
      } else {                                            // SAINDO: acelera e converge pra pista
        if(po>0.06) targetV=Math.min(targetV,25);
        if(po<=0.06 && s>PIT.exitAfter){ c.pitPhase=0; c.pitReason=''; }        // já voltou à pista
      }
    }
    // ---- BANDEIRA AZUL: retardatário abre pro carro que vem dar volta ----
    if(c.ahead && c.lapsDone>c.ahead.lapsDone && gapAhead(c.ahead,c)<40) c.ahead.blueT=0.9;
    if(c.blueT>0){ c.blueT-=dt;
      if(!c.pitPhase){ tOff=(racingOff>=0?racingOff-3.2:racingOff+3.2); targetV*=0.985; } }
    // ---- AR SUJO: difícil seguir colado nas curvas (a turbulência tira aero) ----
    if(c.ahead && !c.passing && !c.pitPhase && vNow<72){
      const gDirty=gapAhead(c.ahead,c); if(gDirty<14) targetV*=0.985; }
    // ---- BANDEIRADA: terminou a corrida, desacelera ----
    if(c.finished) targetV=Math.min(targetV,30);

    // ---- ERRO DE EXECUÇÃO da curva (realista: sai largo, faz a curva no meio) ----
    // decide UMA vez por curva, mais provável sob pressão do carro de trás
    if(heavyBraking && c.cornerErr===0){
      const pressured = c.chaserGap<9;
      const pErr = ((100-c.drv.consistencia)/100)*0.35*(pressured?2.0:1.0)*c.style.errK*(1+CURWET*1.3);
      if(Math.random()<pErr) c.cornerErr=(0.6+Math.random()*1.4)*(pressured?1.3:1.0);
    }
    if(onStraight) c.cornerErr=0;                                  // fim da curva: reseta
    if(c.cornerErr) tOff += -insideSide*c.cornerErr;               // afasta do cantinho (abre a porta)

    // companheiro de equipe logo atrás?
    const chaserMate = c.chaser && !c.chaser.out && c.chaser.team===c.team;
    // ---- DEFESA: sob ataque, bons defensores cobrem o lado de dentro (NÃO contra o companheiro) ----
    if(c.chaserGap<8 && (heavyBraking||vNow<60) && !c.cornerErr && !chaserMate){
      const dlane=insideSide*3.2;
      // regra real: não pode fechar a porta com o rival já emparelhado na linha
      const laneLivre=!cars.some(o=>o!==c&&!o.out&&Math.abs(o.offset-dlane)<1.8&&dist(o,c)<7);
      if(laneLivre){
        const def=c.style.defense*0.8;                              // firmeza da defesa = estilo do piloto
        tOff=THREE.MathUtils.lerp(tOff, dlane, def);
      }
    }
    // ---- ORDEM DE EQUIPE: não segura o companheiro mais rápido — abre a linha e deixa passar ----
    if(chaserMate && c.chaserGap<12 && !c.pitPhase && !c.passing){
      const m=c.chaser;
      const mateFaster = (m.pace>c.pace+0.4) || (m.wear<c.wear-0.15) || (c.damage>m.damage+0.15);
      if(mateFaster){ tOff=(racingOff>=0?racingOff-2.8:racingOff+2.8); targetV*=0.99; }
    }
    // ---- CEDEU a curva: rival cravou por dentro — abre e perde a posição ----
    if(c.yieldT>0){ c.yieldT-=dt; tOff=c.yieldOff; targetV*=0.94; }

    const sgap=(o)=>{ let g=(o.d-c.d)%len; if(g>len/2)g-=len; if(g<-len/2)g+=len; return g; };

    /* ---- ULTRAPASSAGEM (comprometida; POR DENTRO na curva) ---- */
    const ah=(c.pitPhase||c.finished)?null:c.ahead;
    if(c.pitPhase&&c.passing) c.passing=null;
    if(c.passing){
      c.passing.t+=dt;
      const tgt=c.passing.target;
      const sg = tgt&&!tgt.out ? -sgap(tgt) : 999;                 // + = c já está à frente
      if(!tgt || tgt.out || sg>3 || c.passing.t>9){
        if(typeof window!=='undefined' && sg>3) window.__passOK=(window.__passOK||0)+1;
        c.passing=null; c.passCd=1.8; }
      else if(!c.passing.dive && heavyBraking && sg<-16){
        c.passing=null; c.passCd=1.5;                              // ficou longe demais: desiste
      } else {
        if(!c.passing.dive && heavyBraking){ c.passing.dive=true; c.passing.lane=insideSide*3.4; }  // vira MERGULHO
        if(!c.passing.dive && onStraight) targetV=Math.min(targetV*1.06, vAllow);  // DRS aberto na manobra
        // POR DENTRO cravado: quem está por dentro LEVA a curva — o de fora cede e abre
        if(!c.passing.outside && (heavyBraking||vNow<62) && sg>-2.5){
          const ylane=-insideSide*3.8;
          const clear=!cars.some(o=>o!==tgt&&o!==c&&!o.out&&Math.abs(o.offset-ylane)<2.0&&dist(o,tgt)<8);
          if(clear){ tgt.yieldT=Math.max(tgt.yieldT,0.7); tgt.yieldOff=ylane; }
        }
        tOff=c.passing.lane;
        const blocked=cars.some(o=>{ if(o===c||o===tgt||o.out) return false;
          if(Math.abs(o.offset-c.passing.lane)>1.9) return false;
          const g2=sgap(o); return g2>-6 && g2<13; });
        if(blocked){ c.passing=null; c.passCd=2.2; }
      }
    } else if(ah){
      const gap=gapAhead(ah,c);
      const sameLine=Math.abs(ah.offset-c.offset)<2.4;
      if(gap<45 && sameLine){
        // DRS (asa móvel): a <1.1s do carro da frente — com DRS, cola MUITO mais perto
        const tGapS=gap/Math.max(c.speed,15);
        const drsF = onStraight && tGapS<1.1;
        // segue mais colado na reta pra ENTRAR NO VÁCUO (na freada mantém distância segura)
        const safe=((heavyBraking?11:7) + c.speed*(heavyBraking?0.22:0.11))*(drsF?0.5:1);
        if(gap<safe){
          const tt=THREE.MathUtils.clamp((gap-4)/(safe-4),0,1);
          targetV=Math.min(targetV, ah.speed*(0.90+0.10*tt));
        }
        // VÁCUO: no ar do rival tem menos arrasto -> ganha ponta de reta. Mais colado = mais embalo,
        // e pode SUPERAR a velocidade do rival pra ir fechando o buraco. (DRS soma mais.)
        if(onStraight && gap<32){
          const tow=THREE.MathUtils.clamp((32-gap)/28,0,1);           // 0..1 (colado=1)
          targetV=Math.min(targetV*(1 + (drsF?0.055:0.03) + 0.055*tow), vAllow);
        }
        const paceAdv=(c.pace-ah.pace) + (ah.damage-c.damage)*8 + (c.form-ah.form)*300;
        const closing=c.speed-ah.speed;
        // porta aberta: defensor longe do lado de dentro na freada
        const doorOpen = heavyBraking && (ah.offset*insideSide < 1.2);
        // OPORTUNIDADE de ataque: perto e com ALGUMA vantagem (ritmo, embalo, erro do rival,
        // pneu mais novo, ou DRS na reta). "Qualquer brecha, ele tenta."
        const opp = gap<28 && (paceAdv>-1.4 || closing>0.3 || ah.cornerErr>0
                    || ah.wear>c.wear+0.12 || drsF);
        const will=Math.max(c.style.aggro, 0.12);                   // agressividade no ataque = estilo
        const insLane=insideSide*3.7, outLane=-insideSide*3.9;
        const clearLane=lane=>!cars.some(o=>{ if(o===c||o===ah||o.out) return false;
          if(Math.abs(o.offset-lane)>2.1) return false;
          const g2=sgap(o); return g2>-8 && g2<16; });
        const mateAhead = ah.team===c.team;                             // companheiro de equipe à frente
        if(c.passCd<=0 && opp){
          if(mateAhead){
            // COMPANHEIRO: nada de mergulho/roda-com-roda. Só passa LIMPO na reta, e só se
            // for de fato mais rápido (o time deixa o carro melhor seguir na frente).
            if(onStraight && gap<20 && apexDist>55 && closing>0.5){
              const side = clearLane(insLane) ? insLane : (clearLane(outLane)? outLane : null);
              if(side!==null && Math.random()<will*0.06) c.passing={lane:side, target:ah, t:0};
            }
          } else if(heavyBraking && gap<22){
            const inFree=clearLane(insLane), defInside=ah.offset*insideSide>1.0;
            if(inFree && !defInside && Math.random()<will*0.16){          // MERGULHO por dentro
              c.passing={lane:insLane, target:ah, t:0, dive:true};
            } else if(clearLane(outLane) && (closing>1.2||ah.wear>c.wear+0.15) && Math.random()<will*0.07){
              c.passing={lane:outLane, target:ah, t:0, dive:true, outside:true}; // por FORA (mais raro/difícil)
            }
          } else if(onStraight && gap<20 && apexDist>55){
            // pegou o vácuo e vem com EMBALO -> sai de trás e ataca na reta (dentro ou fora)
            const side = clearLane(insLane) ? insLane : (clearLane(outLane)? outLane : null);
            if(side!==null && (closing>-0.4 || drsF) && Math.random()<will*(drsF?0.14:0.08)){
              c.passing={lane:side, target:ah, t:0};
            }
          }
          if(c.passing && typeof window!=='undefined'){ window.__passes=(window.__passes||0)+1;
            if(c.passing.dive) window.__dives=(window.__dives||0)+1; if(c.passing.outside) window.__out=(window.__out||0)+1; }
        }
      }
    }
    if(c.passCd>0) c.passCd-=dt;

    // ---- anti-colisão dura: nunca atropela quem está à frente (mesmo em manobra) ----
    for(const o of cars){ if(o===c||o.out) continue;
      const g2=sgap(o);
      if(g2>0 && g2<8 && Math.abs(o.offset-c.offset)<2.3)
        targetV=Math.min(targetV, Math.max(o.speed-(8-g2)*1.2, 0));
    }
    // ---- desvio lateral SUAVIZADO (acaba com a tremedeira; companheiro ganha MAIS margem) ----
    let avoid=0;
    for(const o of cars){ if(o===c||o.out) continue;
      const mate=o.team===c.team;                                       // dá mais espaço ao companheiro
      const reach=mate?12:9, band=mate?3.3:2.5, force=mate?1.9:1.5;
      const dd=dist(o,c); if(dd>reach) continue;
      const od=c.offset-o.offset;
      if(Math.abs(od)<band){
        const s=Math.abs(od)>0.05 ? (od>0?1:-1) : (c.d>o.d?1:-1);
        avoid += s*(band-Math.abs(od))*force;
      } }
    c.avoidS += (avoid-c.avoidS)*Math.min(1,dt*4);
    tOff += c.avoidS;

    // rodada em andamento (só vem de CONTATO forte — nunca sozinho)
    if(c.spin>0){ c.spin-=dt*0.7; targetV=Math.min(targetV,8); tOff=c.offset; }

    // ---- FÍSICA REAL: aceleração limitada por potência (P/v - arrasto) ----
    // baixa vel.: limitada por tração (~1.5g); média: cai com P/v; alta: arrasto domina
    if(targetV>c.speed){
      const Pw=c.perf.power;
      const a=Math.max(0.3, Math.min(c.perf.traction,
        Pw/Math.max(c.speed,8) - Pw*c.speed*c.speed/(c.perf.top**3)));
      c.speed=Math.min(c.speed+a*dt, targetV);
    } else {
      const dec=(b0+kb*c.speed*c.speed)*decMul;
      c.speed=Math.max(c.speed-dec*dt, targetV);
    }
    c.speed=Math.max(c.speed, c.spin>0?4:(c.pitPhase>=2?0:(c.pitPhase===1?1.0:5)));

    // largada: sai da marca e mergulha pra linha aos poucos
    const mergeT=THREE.MathUtils.clamp((t-c.launchStart)/6, 0, 1);
    tOff=THREE.MathUtils.lerp(c.gridOffset, tOff, mergeT);
    c.tOffset=tOff;
    const latLim=c.pitPhase?(PIT.off+3):6.2;
    // SUAVE E CONTÍNUO: o carro desliza pro lado numa velocidade lateral LIMITADA e
    // quase constante — nunca dá "arranco". Ease leve perto do alvo + teto rígido de m/s.
    const targetOff=THREE.MathUtils.clamp(tOff,-latLim,latLim);
    const maxLatV = c.pitPhase?9 : (c.passing||c.yieldT>0?3.6 : 2.0);   // m/s de deslocamento lateral
    let dOff=targetOff-c.offset;
    let move=dOff*Math.min(1, dt*2.6);                                  // ease suave
    const cap=maxLatV*dt;                                               // teto de velocidade (sem tranco)
    if(move>cap) move=cap; else if(move<-cap) move=-cap;
    c.offset+=move;
    if(c.hitCd>0) c.hitCd-=dt;
    c.d+=c.speed*dt;
  }

  // ---- COLISÕES (raras; consequência por severidade) ----
  const retire=(v,tilt)=>{ if(v.out)return; v.out=true; v.outSide=v.offset>=0?1:-1;
    v.tilt=tilt||0; if(tilt){ const ks=Object.keys(v.wheels); const w=v.wheels[ks[(Math.random()*ks.length)|0]];
      if(w) w.steerPivot.visible=false; } };
  for(let i=0;i<cars.length;i++){ const a=cars[i]; if(a.out||a.hitCd>0) continue;
    if(a.pitPhase||a.finished) continue;
    for(let j=i+1;j<cars.length;j++){ const b=cars[j]; if(b.out||b.hitCd>0||b.pitPhase||b.finished) continue;
      if(dist(a,b)<3.4 && Math.abs(a.offset-b.offset)<1.15){
        a.hitCd=0.9; b.hitCd=0.9;
        if(typeof window!=='undefined') window.__hits=(window.__hits||0)+1;
        const mates=a.team===b.team;                                // toque entre companheiros: quase sem dano
        const rel=Math.abs(a.speed-b.speed);
        const push=(a.offset<=b.offset)?-1:1; a.offset+=push*0.9; b.offset-=push*0.9;
        const rear=a.d<b.d?a:b, front=a.d<b.d?b:a;
        rear.speed*=0.93; front.speed*=0.985;
        const dmgMul=mates?0.15:1;
        front.damage=Math.min(1,front.damage+(rel*0.006+0.006)*dmgMul);
        rear.damage=Math.min(1,rear.damage+(rel*0.004+0.004)*dmgMul);
        if(!mates && rel>20 && Math.random()<0.25){                // só contato FORTE (entre rivais) roda
          const v=Math.random()<0.65?rear:front; v.spin=1; v.spinRate=(Math.random()<0.5?-1:1)*(5+Math.random()*3); v.speed*=0.45;
          if(rel>32 && Math.random()<0.3){ retire(v,0.28);
            if(Math.random()<0.25) retire(v===a?b:a,0.2); }
        }
        for(const car of [a,b]) if(Math.abs(car.offset)>6.2 && Math.random()<0.05) retire(car,0.15);
      }
    }
  }

  // ---- render + rodas (rumo = direção REAL do movimento) ----
  const wrapA=x=>{ while(x>Math.PI)x-=2*Math.PI; while(x<-Math.PI)x+=2*Math.PI; return x; };
  for(const c of cars){
    const f=idxOf(c);
    const cpos=vat(line.center,f,N), l=vat(line.left,f,N), tv=vat(line.ctan,f,N).normalize();
    const nx=cpos.x+l.x*c.offset, nz=cpos.z+l.z*c.offset;
    if(!c.prev){ c.prev={x:nx,z:nz}; c.heading=Math.atan2(tv.x,tv.z); c.prevH=c.heading; }
    const dx=nx-c.prev.x, dz=nz-c.prev.z;
    if(dx*dx+dz*dz>1e-6){
      const hNew=Math.atan2(dx,dz);
      c.heading += wrapA(hNew-c.heading)*Math.min(1, dt*12);
    }
    c.prev.x=nx; c.prev.z=nz;
    c.g.position.set(nx,0,nz);
    let heading=c.heading;
    if(c.spin>0) heading+=c.spinRate*(1-c.spin);
    c.g.rotation.set(0,heading,0);
    const ds=Math.max(c.speed*dt,0.05);
    const yawRate=wrapA(c.heading-c.prevH)/ds;
    c.prevH=c.heading;
    // ROLAGEM: na curva quem inclina é só a CARROCERIA (massa suspensa); as rodas
    // ficam presas ao chão (nunca afundam). Em acidente o carro TODO tomba.
    const cbody=c.g.userData.body;
    if(c.tilt){ c.g.rotation.z=c.tilt; if(cbody) cbody.rotation.z=0; }
    else {
      const roll=THREE.MathUtils.clamp(-yawRate*c.speed*c.speed*0.010, -0.05, 0.05);
      if(cbody) cbody.rotation.z=roll; else c.g.rotation.z=roll;
    }
    const steer=THREE.MathUtils.clamp(yawRate*3.6*1.6, -0.5, 0.5);
    const R=c.rad.front;
    for(const key in c.wheels){ const w=c.wheels[key];
      w.spin.rotation.x += (c.speed*dt)/R;
      if(w.steer) w.steerPivot.rotation.y=THREE.MathUtils.lerp(w.steerPivot.rotation.y, steer, 0.25);
    }
    if(!c.tanV) c.tanV=new THREE.Vector3();
    c.tanV.set(Math.sin(c.heading),0,Math.cos(c.heading)); c.tan=c.tanV;
  }
}
