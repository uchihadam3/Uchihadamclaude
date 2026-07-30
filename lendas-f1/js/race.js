/* ========================================================================
   LENDAS DA F1 — motor de corrida com 20 carros (v2, realista).
   - Racing line (apex nas curvas).
   - Largada PARADA: cada carro na sua marca do grid, sai no semáforo com
     tempo de reação próprio.
   - IA que EVITA contato: mantém distância segura, só ultrapassa quando o
     lado está livre, desvia lateralmente. Colisão é RARA.
   - Quando bate: física realista por severidade — toque leve (pouco efeito),
     médio (dano/perda de tempo), forte (rodada), muito forte (quebra, pode
     perder roda e ABANDONAR). Sair da pista também pode causar abandono.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { buildF1Car } from './car.js';
import { DRIVERS, overall } from './drivers.js';
import { carStats } from './stats.js';

const UP = new THREE.Vector3(0,1,0);

/* ---------- RACING LINE ---------- */
export function computeLine(curve, half){
  const N=1000;
  const center=[], left=[], ctan=[];
  for(let i=0;i<N;i++){ const u=i/N; const p=curve.getPointAt(u); const t=curve.getTangentAt(u).normalize();
    center.push(p); ctan.push(t); left.push(new THREE.Vector3().crossVectors(UP,t).normalize()); }
  const maxOff = Math.max(half-1.2, 0.5);
  const o=new Float32Array(N);
  for(let it=0; it<400; it++){
    for(let i=0;i<N;i++){ const a=(i-1+N)%N, b=(i+1)%N;
      const pa=center[a].clone().addScaledVector(left[a],o[a]);
      const pb=center[b].clone().addScaledVector(left[b],o[b]);
      const mid=pa.add(pb).multiplyScalar(0.5);
      const target=mid.sub(center[i]).dot(left[i]);
      o[i]=THREE.MathUtils.clamp(o[i]+(target-o[i])*0.25, -maxOff, maxOff);
    }
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

/* ---------- GRID DE 20 CARROS (parados na marca) ---------- */
export function buildField(scene, line){
  const grid = DRIVERS.map(d=>({ d, pace: carStats(d.team).geral*0.62 + overall(d)*0.38 }))
                      .sort((a,b)=>b.pace-a.pace);
  const cars=[];
  grid.forEach((it,slot)=>{
    const drv=it.d;
    const g=buildF1Car({team:drv.team, number:String(drv.num), simple:true});
    g.traverse(o=>{ if(o.isMesh){ o.castShadow=false; } });
    scene.add(g);
    const side=(slot%2===0)?1:-1;
    const LAT=2.8;
    // reação da largada: melhores pilotos saem um tico mais rápido
    const reaction = 0.20 + (1-(it.pace-76)/17)*0.28 + Math.random()*0.12;
    // ESTILO próprio de pilotagem (determinístico por piloto)
    const hsh=s=>{let x=0;for(const ch of s)x=(x*31+ch.charCodeAt(0))|0;return ((x>>>0)%1000)/1000;};
    const r1=hsh(drv.nome), r2=hsh(drv.nome+'x');
    const style={
      brakeLate: THREE.MathUtils.clamp((drv.ultrapassagem-78)/30 + (r1-0.5)*0.4, 0, 1),  // freia mais tarde
      cornerCarry: THREE.MathUtils.clamp((drv.ritmo-84)/30 + (r2-0.5)*0.4, -1, 1),       // leva mais vel. de curva
      lineBias: (r1-0.5)*0.9,                                                            // linha pessoal (±0.45 m)
      phase: r2*Math.PI*2,                                                               // varia por trecho da pista
    };
    cars.push({ g, drv, style, team:drv.team, wheels:g.userData.wheels, rad:g.userData.radius,
      pace:it.pace, gridPos:slot+1, reaction, launchStart:1e9, gridOffset:side*LAT,
      d: -(8 + slot*8), offset: side*LAT, tOffset: side*LAT,
      speed:0, spin:0, spinRate:0, damage:0, out:false, outSide:side, tilt:0, passCd:0, mistakeCd:5, hitCd:0, passing:null, form:0,
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
  for(let k=0;k<order.length;k++){ order[k].ahead=order[k-1]||null; }

  for(const c of cars){
    if(c.out){ c.speed=Math.max(c.speed-24*dt,0);
      c.offset=THREE.MathUtils.lerp(c.offset,c.outSide*6.4,dt*1.2); c.d+=c.speed*dt; continue; }
    if(!started || t<c.launchStart){ c.speed=Math.max(c.speed-30*dt,0); continue; }

    const f=idxOf(c), racingOff=at(line.offset,f,N);
    const skill=0.88+(c.pace-76)/17*0.10;
    // ---- FRENAGEM com estilo: quem freia tarde usa janela menor e freia mais forte ----
    const brakeDecel = 47 + 9*c.style.brakeLate;                 // 47..56 m/s²
    const margin = 1.22 - 0.20*c.style.brakeLate;                // late-brakers = menos margem
    const brakeDist = c.speed*c.speed/(2*brakeDecel)*margin + 8;
    let vCorner=99, minFi=f;
    for(let s=1;s<=10;s++){ const dd=brakeDist*s/10; const fi=(((c.d+dd)/len)*N%N+N)%N;
      const vv=at(line.vmax,fi,N); if(vv<vCorner){ vCorner=vv; minFi=fi; } }
    // velocidade de curva pessoal (±1.2%) — cada um faz a curva num ritmo próprio
    if(vCorner<80) vCorner*=1+0.012*c.style.cornerCarry;
    // forma oscilando durante a corrida (pneu/combustível/ritmo) — gera disputa real
    c.form += (Math.random()-0.5)*0.004;
    c.form = THREE.MathUtils.clamp(c.form, -0.018, 0.018);
    let targetV=Math.min(vCorner,99)*skill*(1+c.form)*(1-0.3*c.damage);
    // LINHA PESSOAL: base na racing line, com viés próprio + variação por trecho da pista
    let tOff=racingOff*(0.96+0.05*c.style.cornerCarry)
           + c.style.lineBias
           + Math.sin(c.d*0.012 + c.style.phase)*0.35;
    const onStraight=vCorner>72;
    const heavyBraking = c.speed - vCorner > 11;                 // zona de freada forte à frente

    // gap ASSINADO ao longo da pista (+ = o está à frente de c)
    const sgap=(o)=>{ let g=(o.d-c.d)%len; if(g>len/2)g-=len; if(g<-len/2)g+=len; return g; };

    /* ---- ULTRAPASSAGEM COMPROMETIDA (só com brecha real; não fica batendo) ---- */
    const ah=c.ahead;
    if(c.passing){
      c.passing.t+=dt;
      const tgt=c.passing.target;
      const sg = tgt&&!tgt.out ? sgap(tgt)*-1 : 999;     // + = c está à frente do alvo
      if(!tgt || tgt.out || sg>9 || c.passing.t>9){       // completou (ou desistiu por tempo)
        c.passing=null; c.passCd=2.5;
      } else {
        tOff=c.passing.lane;                              // mantém a linha da manobra
        // aborta se a faixa ficou bloqueada por um 3º carro
        const blocked=cars.some(o=>{ if(o===c||o===tgt||o.out) return false;
          if(Math.abs(o.offset-c.passing.lane)>2.0) return false;
          const g2=sgap(o); return g2>-6 && g2<14; });
        if(blocked){ c.passing=null; c.passCd=3; }
      }
    } else if(ah){
      const gap=gapAhead(ah,c);
      const sameLine=Math.abs(ah.offset-c.offset)<2.4;
      if(gap<45 && sameLine){
        // 1) SEGURANÇA PRIMEIRO: segue a distância segura, casando a velocidade
        const safe=8 + c.speed*0.18;
        if(gap<safe){
          const tt=THREE.MathUtils.clamp((gap-4)/(safe-4),0,1);
          targetV=Math.min(targetV, ah.speed*(0.88+0.11*tt));
        }
        // vácuo quando colado na reta (ganha um pouco sem encostar)
        if(onStraight && gap<20 && gap>6) targetV=Math.min(targetV*1.02, vCorner*0.995);
        // 2) DECISÃO de ultrapassar: rara, só quando é claramente mais rápido E tem brecha
        const paceAdv=(c.pace-ah.pace) + (ah.damage-c.damage)*8 + (c.form-ah.form)*300;
        const closing=c.speed-ah.speed;
        // duas janelas de ataque: na RETA (vácuo) ou na FREADA da curva (mergulho por dentro)
        const dive = heavyBraking && gap<24 && (paceAdv>-0.5 || closing>0.5);
        if(c.passCd<=0 && ((gap<18 && (paceAdv>0.5||closing>2.5) && onStraight) || dive)){
          // na freada, o lado é o interno da curva; na reta, o lado oposto à racing line
          const insideSide = Math.sign(at(line.offset,minFi,N)) || (racingOff>=0?1:-1);
          const lane = dive ? insideSide*3.8 : (racingOff>=0?-1:1)*4.2;
          const laneFree=!cars.some(o=>{ if(o===c||o===ah||o.out) return false;
            if(Math.abs(o.offset-lane)>2.2) return false;
            const g2=sgap(o); return g2>-8 && g2<18; });   // brecha real: 18m à frente, 8m atrás
          const will=(c.drv.ultrapassagem-70)/30;          // habilidade regula a ousadia
          const gate = dive ? Math.max(will,0.15)*0.12 : Math.max(will,0.15)*0.012;
          if(laneFree && Math.random()<gate){
            c.passing={lane, target:ah, t:0, dive};
            if(typeof window!=='undefined'){ window.__passes=(window.__passes||0)+1; if(dive) window.__dives=(window.__dives||0)+1; }
          }
        }
      }
    }
    if(c.passCd>0) c.passCd-=dt;

    // ---- anti-colisão dura: NUNCA cola em quem está logo à frente na mesma faixa ----
    for(const o of cars){ if(o===c||o.out) continue;
      const g2=sgap(o);
      if(g2>0 && g2<6.5 && Math.abs(o.offset-c.offset)<1.8)
        targetV=Math.min(targetV, Math.max(o.speed-(6.5-g2)*0.9, 0));
    }
    // ---- desvio lateral (só direção, não freia a fila) ----
    for(const o of cars){ if(o===c||o.out) continue;
      const dd=dist(o,c); if(dd>7) continue;
      const od=c.offset-o.offset;
      if(Math.abs(od)<2.4){
        const s=Math.abs(od)>0.05 ? (od>0?1:-1) : (c.d>o.d?1:-1);
        tOff += s*(2.4-Math.abs(od))*1.2;
      } }

    // ---- erro do piloto (RARO) ----
    c.mistakeCd-=dt;
    if(c.mistakeCd<=0 && vCorner<56 && c.speed>16){
      if(Math.random() < (100-c.drv.consistencia)*0.00005){
        c.mistakeCd=12; c.speed*=0.88; tOff+=(racingOff>=0?1:-1)*2.0;
        if(Math.random()<0.08){ c.spin=1; c.spinRate=(Math.random()<0.5?-1:1)*4; c.speed*=0.5; }
      }
    }
    if(c.spin>0){ c.spin-=dt*0.7; targetV=Math.min(targetV,8); tOff=c.offset; }

    // ---- FÍSICA realista de aceleração / frenagem (por piloto) ----
    if(targetV>c.speed){
      const aMax=17+(c.pace-76)*0.22;                    // ~17-21 m/s² no arranque
      const a=aMax*Math.max(0.1, 1-(c.speed/104)*(c.speed/104));   // cai com a velocidade (arrasto)
      c.speed=Math.min(c.speed+a*dt, targetV);
    } else {
      const extra=(c.passing&&c.passing.dive)?5:0;       // no mergulho, segura o freio até mais tarde
      c.speed=Math.max(c.speed-(brakeDecel+extra)*dt, targetV);
    }
    c.speed=Math.max(c.speed, c.spin>0?4:5);
    // largada: sai da MARCA e mergulha pra linha aos poucos (sem teleporte pro meio)
    const mergeT=THREE.MathUtils.clamp((t-c.launchStart)/6, 0, 1);
    tOff=THREE.MathUtils.lerp(c.gridOffset, tOff, mergeT);
    c.tOffset=tOff;
    c.offset=THREE.MathUtils.lerp(c.offset, THREE.MathUtils.clamp(tOff,-6,6), dt*1.3);   // merge suave
    if(c.hitCd>0) c.hitCd-=dt;
    c.d+=c.speed*dt;
  }

  // ---- COLISÕES (raras) com física por severidade ----
  const retire=(v,tilt)=>{ if(v.out)return; v.out=true; v.outSide=v.offset>=0?1:-1;
    v.tilt=tilt||0; if(tilt){ const ks=Object.keys(v.wheels); const w=v.wheels[ks[(Math.random()*ks.length)|0]];
      if(w) w.steerPivot.visible=false; } };   // batida forte: perde uma roda
  for(let i=0;i<cars.length;i++){ const a=cars[i]; if(a.out||a.hitCd>0) continue;
    for(let j=i+1;j<cars.length;j++){ const b=cars[j]; if(b.out||b.hitCd>0) continue;
      if(dist(a,b)<3.6 && Math.abs(a.offset-b.offset)<1.35){    // só sobreposição REAL
        a.hitCd=0.6; b.hitCd=0.6;
        if(typeof window!=='undefined') window.__hits=(window.__hits||0)+1;
        const rel=Math.abs(a.speed-b.speed);
        const push=(a.offset<=b.offset)?-1:1; a.offset+=push*0.6; b.offset-=push*0.6;
        const rear=a.d<b.d?a:b, front=a.d<b.d?b:a;
        rear.speed*=0.93; front.speed*=0.985;                    // toque leve: quase nada
        front.damage=Math.min(1,front.damage+rel*0.006+0.006);
        rear.damage=Math.min(1,rear.damage+rel*0.004+0.004);
        if(rel>18 && Math.random()<0.35){                        // forte -> rodada (nem sempre)
          const v=Math.random()<0.65?rear:front; v.spin=1; v.spinRate=(Math.random()<0.5?-1:1)*(5+Math.random()*3); v.speed*=0.45;
          if(rel>30 && Math.random()<0.35){ retire(v,0.28);      // muito forte -> quebra e sai
            if(Math.random()<0.25) retire(v===a?b:a,0.2); }
        }
        for(const car of [a,b]) if(Math.abs(car.offset)>6.2 && Math.random()<0.05) retire(car,0.15);
      }
    }
  }

  // ---- render + rodas ----
  for(const c of cars){
    const f=idxOf(c);
    const cpos=vat(line.center,f,N), l=vat(line.left,f,N), tv=vat(line.ctan,f,N).normalize();
    c.g.position.set(cpos.x+l.x*c.offset, 0, cpos.z+l.z*c.offset);
    let heading=Math.atan2(tv.x,tv.z);
    if(c.spin>0) heading+=c.spinRate*(1-c.spin);
    c.g.rotation.set(0,heading,0);
    if(c.tilt) c.g.rotation.z=c.tilt;
    const R=c.rad.front;
    for(const key in c.wheels){ const w=c.wheels[key];
      w.spin.rotation.x += (c.speed*dt)/R;
      if(w.steer) w.steerPivot.rotation.y=THREE.MathUtils.lerp(w.steerPivot.rotation.y,(c.tOffset-c.offset)*0.14,0.2);
    }
    c.tan=tv;
  }
}
