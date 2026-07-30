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
import { buildF1Car } from './car.js';
import { DRIVERS, overall } from './drivers.js';
import { carStats } from './stats.js';

const UP = new THREE.Vector3(0,1,0);

/* ---------- CORRIDA & PNEUS ---------- */
export const RACE={ laps:12 };
export const TIRES={
  S:{nome:'Macio', grip:1.012, wear:1.5, col:'#ef4444'},
  M:{nome:'Médio', grip:1.000, wear:1.0, col:'#eab308'},
  H:{nome:'Duro',  grip:0.991, wear:0.65,col:'#e5e7eb'},
};
const PITOFF=10.1;               // faixa lateral do pit lane

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
  // acentua o out-in-out: usa a largura TODA (entra na borda de fora, apex no cantinho)
  for(let i=0;i<N;i++){ const v=o[i]*1.55; o[i]=v>maxOff?maxOff:(v<-maxOff?-maxOff:v); }
  // suaviza de leve pra não ter quina
  for(let pass=0;pass<2;pass++){
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
export function buildField(scene, line){
  const grid = DRIVERS.map(d=>({ d, pace: carStats(d.team).geral*0.62 + overall(d)*0.38 }))
                      .sort((a,b)=>b.pace-a.pace);
  const cars=[];
  grid.forEach((it,slot)=>{
    const drv=it.d;
    const g=buildF1Car({team:drv.team, number:String(drv.num), simple:true});
    g.traverse(o=>{ if(o.isMesh){ o.castShadow=false; } });
    scene.add(g);
    const side=(slot%2===0)?1:-1, LAT=2.8;
    const reaction = 0.20 + (1-(it.pace-76)/17)*0.28 + Math.random()*0.12;
    // ESTILO do piloto (determinístico)
    const hsh=s=>{let x=0;for(const ch of s)x=(x*31+ch.charCodeAt(0))|0;return ((x>>>0)%1000)/1000;};
    const r1=hsh(drv.nome), r2=hsh(drv.nome+'x');
    const style={
      brakeLate: THREE.MathUtils.clamp((drv.ultrapassagem-78)/30 + (r1-0.5)*0.4, 0, 1),
      cornerCarry: THREE.MathUtils.clamp((drv.ritmo-84)/30 + (r2-0.5)*0.4, -1, 1),
      lineBias: (r1-0.5)*0.8,
      phase: r2*Math.PI*2,
    };
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
      tire: slot<6?'S':(slot<14?'M':(Math.random()<0.5?'M':'H')), wear:0, pits:0,
      pitLap: Math.max(3, Math.round(RACE.laps*(0.35+Math.random()*0.3))),
      pitPhase:0, pitT:0, lapsDone:0, blueT:0, finished:false, outT:0,
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
    // spread REAL de ritmo (~3% do 1º ao 20º, como na F1) — o pelotão não estica infinito
    const skill=0.955+(c.pace-76)/17*0.035;
    const cf=c.perf.corner*(1+0.012*c.style.cornerCarry);          // fator de curva carro+estilo

    // ---- FRENAGEM REALISTA: o freio depende da velocidade (downforce) ----
    // dec = b0 + kb·v² -> ~5.5g em alta velocidade, ~2.3g em baixa (como F1 real)
    const b0=c.perf.brake0 + 2*c.style.brakeLate, kb=0.0042;
    const marg=1.14 - 0.10*c.style.brakeLate;                      // late-brakers: menos margem
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
    c.form += (Math.random()-0.5)*0.006;
    c.form = THREE.MathUtils.clamp(c.form, -0.026, 0.026);
    c.lapsDone=Math.max(0,Math.floor(c.d/len));
    // pneu: desgasta e perde ritmo; combustível: carro fica mais leve/rápido
    const tire=TIRES[c.tire];
    c.wear=Math.min(1, c.wear + dt*0.0016*tire.wear);
    const tireMul=tire.grip*(1-c.wear*0.10);
    const fuelMul=0.99+0.01*Math.min(1,c.lapsDone/RACE.laps);
    let targetV=Math.min(vNow, vAllow, 99)*skill*(1+c.form)*(1-0.3*c.damage)*tireMul*fuelMul;

    // ---- LINHA: base = racing line; ENTRADA de curva = abre pra borda de FORA (apex tardio) ----
    let tOff = racingOff + c.style.lineBias*0.4;
    // "olha à frente" pra curva: se vem curva forte, JÁ começa a ir pro lado de fora
    if(bindingCorner){
      const w=THREE.MathUtils.clamp((apexDist-6)/70, 0, 1);        // 1 = longe do apex (bem aberto)
      const outEdge=-insideSide*5.9;                               // borda de FORA da curva
      // apex tardio: segura na borda de fora mais tempo (curva de exponente)
      tOff=THREE.MathUtils.lerp(racingOff, outEdge, Math.pow(w,0.7)*0.92);
    }

    // ---- PIT STOP (estratégia: 1 parada, troca de pneu) ----
    const dPos=((c.d%len)+len)%len;
    if(c.pitPhase===0 && c.pits<1 && c.lapsDone>=c.pitLap && !c.finished &&
       dPos>len-620 && dPos<len-280) c.pitPhase=1;
    if(c.pitPhase>0){
      if(c.pitPhase===1){                                  // entrando no pit lane
        if(dPos>len-320||dPos<150) tOff=PITOFF;
        if(dPos>len-250||dPos<150) targetV=Math.min(targetV,23);   // limite 80 km/h
        const boxD=len-70-(c.gridPos%10)*4;
        if(dPos>boxD-2 && dPos<boxD+6) { c.pitPhase=2; c.pitT=2.4+Math.random()*1.4; }
      } else if(c.pitPhase===2){                           // parado no box
        tOff=PITOFF; targetV=0;
        if(c.speed<0.6){ c.pitT-=dt;
          if(c.pitT<=0){ c.tire=(RACE.laps-c.lapsDone>6)?'M':'S'; if(Math.random()<0.2)c.tire='H';
            c.wear=0; c.pits++; c.pitPhase=3; } }
      } else {                                             // saindo
        tOff=PITOFF; targetV=Math.min(targetV,23);
        if(dPos>150 && dPos<len/2) c.pitPhase=0;
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
      const pErr = ((100-c.drv.consistencia)/100)*0.35*(pressured?2.0:1.0);
      if(Math.random()<pErr) c.cornerErr=(0.6+Math.random()*1.4)*(pressured?1.3:1.0);
    }
    if(onStraight) c.cornerErr=0;                                  // fim da curva: reseta
    if(c.cornerErr) tOff += -insideSide*c.cornerErr;               // afasta do cantinho (abre a porta)

    // ---- DEFESA: sob ataque, bons defensores cobrem o lado de dentro ----
    if(c.chaserGap<8 && (heavyBraking||vNow<60) && !c.cornerErr){
      const dlane=insideSide*3.2;
      // regra real: não pode fechar a porta com o rival já emparelhado na linha
      const laneLivre=!cars.some(o=>o!==c&&!o.out&&Math.abs(o.offset-dlane)<1.8&&dist(o,c)<7);
      if(laneLivre){
        const def=THREE.MathUtils.clamp((c.drv.defesa-80)/20,0,1)*0.7;
        tOff=THREE.MathUtils.lerp(tOff, dlane, def);
      }
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
        const safe=((heavyBraking?11:8) + c.speed*(heavyBraking?0.22:0.18))*(drsF?0.55:1);
        if(gap<safe){
          const tt=THREE.MathUtils.clamp((gap-4)/(safe-4),0,1);
          targetV=Math.min(targetV, ah.speed*(0.88+0.11*tt));
        }
        if(drsF) targetV=Math.min(targetV*1.045, vAllow);
        else if(onStraight && gap<20 && gap>6) targetV=Math.min(targetV*1.02, vNow*0.995);  // vácuo
        const paceAdv=(c.pace-ah.pace) + (ah.damage-c.damage)*8 + (c.form-ah.form)*300;
        const closing=c.speed-ah.speed;
        // porta aberta: defensor longe do lado de dentro na freada
        const doorOpen = heavyBraking && (ah.offset*insideSide < 1.2);
        // OPORTUNIDADE de ataque: perto e com ALGUMA vantagem (ritmo, embalo, erro do rival,
        // pneu mais novo, ou DRS na reta). "Qualquer brecha, ele tenta."
        const opp = gap<28 && (paceAdv>-1.4 || closing>0.3 || ah.cornerErr>0
                    || ah.wear>c.wear+0.12 || drsF);
        const will=Math.max((c.drv.ultrapassagem-68)/30, 0.18);
        const insLane=insideSide*3.7, outLane=-insideSide*3.9;
        const clearLane=lane=>!cars.some(o=>{ if(o===c||o===ah||o.out) return false;
          if(Math.abs(o.offset-lane)>2.1) return false;
          const g2=sgap(o); return g2>-8 && g2<16; });
        if(c.passCd<=0 && opp){
          if(heavyBraking && gap<22){
            const inFree=clearLane(insLane), defInside=ah.offset*insideSide>1.0;
            if(inFree && !defInside && Math.random()<will*0.16){          // MERGULHO por dentro
              c.passing={lane:insLane, target:ah, t:0, dive:true};
            } else if(clearLane(outLane) && (closing>1.2||ah.wear>c.wear+0.15) && Math.random()<will*0.07){
              c.passing={lane:outLane, target:ah, t:0, dive:true, outside:true}; // por FORA (mais raro/difícil)
            }
          } else if(drsF && gap<18 && apexDist>70){
            if(clearLane(insLane) && Math.random()<will*0.09){            // reta com DRS
              c.passing={lane:insLane, target:ah, t:0};
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
    // ---- desvio lateral SUAVIZADO (acaba com a tremedeira) ----
    let avoid=0;
    for(const o of cars){ if(o===c||o.out) continue;
      const dd=dist(o,c); if(dd>9) continue;
      const od=c.offset-o.offset;
      if(Math.abs(od)<2.5){
        const s=Math.abs(od)>0.05 ? (od>0?1:-1) : (c.d>o.d?1:-1);
        avoid += s*(2.5-Math.abs(od))*1.5;
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
    c.speed=Math.max(c.speed, c.spin>0?4:(c.pitPhase===2?0:5));

    // largada: sai da marca e mergulha pra linha aos poucos
    const mergeT=THREE.MathUtils.clamp((t-c.launchStart)/6, 0, 1);
    tOff=THREE.MathUtils.lerp(c.gridOffset, tOff, mergeT);
    c.tOffset=tOff;
    const latLim=c.pitPhase?11:6.2;
    // segue a linha FIRME (sem atraso que achata a curva); em disputa é um pouco mais macio
    const followRate = c.pitPhase?2.6 : (c.passing||c.yieldT>0?4.2:5.2);
    c.offset=THREE.MathUtils.lerp(c.offset, THREE.MathUtils.clamp(tOff,-latLim,latLim), dt*followRate);
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
        const rel=Math.abs(a.speed-b.speed);
        const push=(a.offset<=b.offset)?-1:1; a.offset+=push*0.9; b.offset-=push*0.9;
        const rear=a.d<b.d?a:b, front=a.d<b.d?b:a;
        rear.speed*=0.93; front.speed*=0.985;
        front.damage=Math.min(1,front.damage+rel*0.006+0.006);
        rear.damage=Math.min(1,rear.damage+rel*0.004+0.004);
        if(rel>20 && Math.random()<0.25){                          // só contato FORTE roda (raro)
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
    c.g.rotation.z = c.tilt ? c.tilt :
      THREE.MathUtils.clamp(-yawRate*c.speed*c.speed*0.010, -0.05, 0.05);
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
