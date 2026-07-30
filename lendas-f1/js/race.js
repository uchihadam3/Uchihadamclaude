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
    cars.push({ g, drv, team:drv.team, wheels:g.userData.wheels, rad:g.userData.radius,
      pace:it.pace, gridPos:slot+1, reaction, launchStart:1e9, gridOffset:side*LAT,
      d: -(8 + slot*8), offset: side*LAT, tOffset: side*LAT,
      speed:0, spin:0, spinRate:0, damage:0, out:false, outSide:side, tilt:0, passCd:0, mistakeCd:5, hitCd:0,
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
    // ---- FRENAGEM ANTECIPADA: menor vel. de curva na janela de frear à frente ----
    const brakeDist = c.speed*c.speed/(2*50) + 10;
    let vCorner=99;
    for(let s=1;s<=10;s++){ const dd=brakeDist*s/10; const fi=(((c.d+dd)/len)*N%N+N)%N;
      vCorner=Math.min(vCorner, at(line.vmax,fi,N)); }
    let targetV=Math.min(vCorner,99)*skill*(1-0.3*c.damage);
    let tOff=racingOff;
    const onStraight=vCorner>72;

    // ---- seguir / ultrapassar com segurança (colisão rara) ----
    const ah=c.ahead;
    if(ah){
      const gap=gapAhead(ah,c);
      const sameLine=Math.abs(ah.offset-c.offset)<2.2;
      if(gap<22 && !sameLine) targetV=Math.min(targetV*1.02, vCorner*0.99);       // vácuo
      if(gap<40 && sameLine){
        const safe=9 + c.speed*0.16;                     // distância de segurança
        const paceAdv=c.pace-ah.pace;
        const side=racingOff>=0?-1:1, laneX=side*4.0;
        const laneClear=!cars.some(o=> o!==c && !o.out && dist(o,c)<13 && Math.abs(o.offset-laneX)<2.2);
        if(gap<safe){
          if((paceAdv>0.8||onStraight) && c.passCd<=0 && laneClear){
            tOff=laneX;
            targetV = Math.abs(c.offset-laneX)<1.2 ? Math.min(vCorner*skill, ah.speed+5)
                                                   : Math.min(targetV, ah.speed+1);
          } else {                                        // segue atrás casando a velocidade
            const tt=THREE.MathUtils.clamp((gap-3)/(safe-3),0,1);
            targetV=Math.min(targetV, ah.speed*(0.9+0.09*tt));
            c.passCd=1.0;
          }
        }
      }
    }
    if(c.passCd>0) c.passCd-=dt;

    // ---- desvio lateral pra não encostar (só direção, NÃO freia a fila) ----
    for(const o of cars){ if(o===c||o.out) continue;
      const dd=dist(o,c); if(dd>6.0) continue;
      const od=c.offset-o.offset;
      if(Math.abs(od)<2.2){
        const s = Math.abs(od)>0.06 ? (od>0?1:-1) : (c.d>o.d?1:-1);   // separa pros lados opostos
        tOff += s*(2.2-Math.abs(od))*1.0;
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

    // ---- FÍSICA realista de aceleração / frenagem ----
    if(targetV>c.speed){
      const aMax=17+(c.pace-76)*0.22;                    // ~17-21 m/s² no arranque
      const a=aMax*Math.max(0.1, 1-(c.speed/104)*(c.speed/104));   // cai com a velocidade (arrasto)
      c.speed=Math.min(c.speed+a*dt, targetV);
    } else {
      c.speed=Math.max(c.speed-52*dt, targetV);          // freada forte (~5.3g)
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
      if(dist(a,b)<3.6 && Math.abs(a.offset-b.offset)<1.5){
        a.hitCd=0.5; b.hitCd=0.5;                    // evita re-colisão todo frame (fim do 'engarrafamento')
        const rel=Math.abs(a.speed-b.speed);
        const push=(a.offset<=b.offset)?-1:1; a.offset+=push*0.7; b.offset-=push*0.7;
        const rear=a.d<b.d?a:b, front=a.d<b.d?b:a;
        rear.speed*=0.9; front.speed*=0.96;
        front.damage=Math.min(1,front.damage+rel*0.008+0.01);
        rear.damage=Math.min(1,rear.damage+rel*0.005+0.006);
        if(rel>20){                                   // forte -> rodada
          const v=Math.random()<0.6?rear:front; v.spin=1; v.spinRate=(Math.random()<0.5?-1:1)*(5+Math.random()*3); v.speed*=0.4;
          if(rel>30 && Math.random()<0.55){ retire(v,0.28);           // muito forte -> quebra e sai
            if(Math.random()<0.35) retire(v===a?b:a,0.2); }           // as vezes leva o outro junto
        }
        for(const car of [a,b]) if(Math.abs(car.offset)>6.0 && Math.random()<0.1) retire(car,0.15);  // sai da pista
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
