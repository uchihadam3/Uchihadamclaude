/* ========================================================================
   LENDAS DA F1 — motor de corrida com 20 carros.
   - Racing line: linha suavizada (minimiza curvatura) => o carro entra
     aberto, fecha no apex (canto interno) e sai aberto, como F1 de verdade.
   - 20 carros (grade real), cada um com ritmo = 62% carro + 38% piloto.
   - IA: seguem a linha, pegam vácuo, tentam ultrapassar por dentro/fora,
     defendem; colisões causam perda de tempo, rodadas e danos; pilotos
     cometem erros conforme a consistência. Tudo com um fator de sorte.
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
    for(let i=0;i<N;i++){
      const a=(i-1+N)%N, b=(i+1)%N;
      const pa=center[a].clone().addScaledVector(left[a],o[a]);
      const pb=center[b].clone().addScaledVector(left[b],o[b]);
      const mid=pa.add(pb).multiplyScalar(0.5);
      const target=mid.sub(center[i]).dot(left[i]);
      o[i]=THREE.MathUtils.clamp(o[i]+(target-o[i])*0.25, -maxOff, maxOff);
    }
  }
  // velocidade máxima da linha em cada ponto (aderência ~3g)
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
                      .sort((a,b)=>b.pace-a.pace);   // pole = melhor pacote
  const cars=[];
  grid.forEach((it,slot)=>{
    const drv=it.d;
    const g=buildF1Car({team:drv.team, number:String(drv.num)});
    g.traverse(o=>{ if(o.isMesh){ o.castShadow=false; } });   // performance com 20 carros
    scene.add(g);
    const side = (slot%2===0)?1:-1;
    cars.push({ g, drv, team:drv.team, wheels:g.userData.wheels, rad:g.userData.radius,
      pace: it.pace, gridPos: slot+1,
      d: -(8 + slot*8),                       // largada escalonada (8 m)
      offset: side*1.9, tOffset: side*1.9,
      speed: 0, spin:0, spinRate:0, damage:0, off:0, lap:0, mistakeCd:0, passCd:0 });
  });
  return cars;
}

/* ---------- ATUALIZAÇÃO DA CORRIDA ---------- */
export function updateField(cars, line, dt, t){
  const N=line.N, len=line.len;
  const idxOf=c=> ((c.d/len)*N % N + N) % N;
  // ordena por distância (líder primeiro) pra achar quem está à frente
  const order=[...cars].sort((a,b)=>b.d-a.d);
  for(let k=0;k<order.length;k++) order[k].ahead = order[k-1]||null;

  for(const c of cars){
    const f=idxOf(c);
    const vmaxHere=at(line.vmax,f,N);
    const racingOff=at(line.offset,f,N);
    const skill=0.86 + (c.pace-76)/17*0.12;               // 0.86..0.98 do limite
    let targetV = Math.min(vmaxHere, 99) * skill * (1 - 0.28*c.damage);
    let tOff = racingOff;

    // ---- seguir / ultrapassar / defender ----
    const ah=c.ahead;
    if(ah){
      let gap=ah.d - c.d; if(gap<0) gap+=len;             // metros à frente
      const sameLine=Math.abs(ah.offset - c.offset) < 2.2;
      if(gap<40){
        if(gap<16) targetV = Math.min(targetV*1.03, vmaxHere*0.99);   // vácuo (slipstream)
        if(gap<7 && sameLine){
          const faster = c.pace > ah.pace - 1.2;
          const onStraight = vmaxHere>70;
          if(faster && c.passCd<=0 && (onStraight || Math.random()<0.02)){
            // vai pra um lado livre (por dentro se curva, ou vácuo na reta)
            const side = racingOff>=0 ? -1 : 1;
            tOff = side*(line.len? Math.min(4.5, 4.5):4.5);
            tOff = side*4.2;
            if(Math.abs(c.offset-ah.offset) > 2.2){        // já está ao lado -> passa
              targetV = Math.min(vmaxHere*skill, ah.speed+6);
            } else {
              targetV = Math.min(targetV, ah.speed+3);     // emparelhando
            }
          } else {
            targetV = Math.min(targetV, ah.speed*0.99);    // preso atrás
          }
        }
      }
    }
    if(c.passCd>0) c.passCd-=dt;

    // ---- erro do piloto (conforme consistência + carga da curva) ----
    c.mistakeCd-=dt;
    if(c.mistakeCd<=0 && vmaxHere<60){
      const pErr=(100-c.drv.consistencia)*0.00035 + (100-c.pace)*0.0002;
      if(Math.random()<pErr){
        c.mistakeCd=3;
        if(Math.random()<0.25){ c.spin=1.0; c.spinRate=(Math.random()<0.5?-1:1)*(4+Math.random()*3); c.speed*=0.5; }
        else { c.speed*=0.9; tOff += (racingOff>=0?1:-1)*2.5; }   // sai um pouco largo
      }
    }

    // ---- rodada em andamento ----
    if(c.spin>0){ c.spin-=dt*0.8; targetV=Math.min(targetV,10); tOff=c.offset; }

    // ---- aceleração / frenagem ----
    const accel=11 + (c.pace-76)*0.4;
    if(targetV>c.speed) c.speed=Math.min(c.speed+accel*dt, targetV+2);
    else                c.speed=Math.max(c.speed-42*dt, targetV);
    c.speed=Math.max(c.speed,4);

    // ---- move lateral (suave) e avança ----
    c.tOffset=tOff;
    c.offset=THREE.MathUtils.lerp(c.offset, THREE.MathUtils.clamp(tOff,-(line? 5.6:5.6),5.6), dt*2.2);
    c.d += c.speed*dt;
  }

  // ---- COLISÕES (contato entre carros próximos) ----
  for(let i=0;i<cars.length;i++) for(let j=i+1;j<cars.length;j++){
    const a=cars[i], b=cars[j];
    let dd=Math.abs(a.d-b.d); if(dd>len/2) dd=len-dd;
    if(dd<4.6 && Math.abs(a.offset-b.offset)<1.9){
      const sev=Math.abs(a.speed-b.speed);
      // empurra pros lados
      const push=(a.offset<=b.offset)?-1:1;
      a.offset+=push*0.5; b.offset-=push*0.5;
      a.speed*=0.9; b.speed*=0.9;
      const victim = a.speed<b.speed? a:b;
      victim.damage=Math.min(1, victim.damage + sev*0.004 + 0.02);
      if(sev>16 && Math.random()<0.3){ victim.spin=1.0; victim.spinRate=(Math.random()<0.5?-1:1)*5; victim.speed*=0.5; }
      // se muito pro lado, sai da pista
      if(Math.abs(victim.offset)>5.4){ victim.speed*=0.85; }
    }
  }

  // ---- render + rodas ----
  for(const c of cars){
    const f=idxOf(c);
    const cpos=vat(line.center,f,N), l=vat(line.left,f,N), tv=vat(line.ctan,f,N).normalize();
    c.g.position.set(cpos.x + l.x*c.offset, 0, cpos.z + l.z*c.offset);
    let heading=Math.atan2(tv.x,tv.z);
    if(c.spin>0) heading += c.spinRate * (1-c.spin);       // rodando
    c.g.rotation.set(0,heading,0);
    // rodas girando + esterço leve
    const R=c.rad.front;
    for(const key in c.wheels){ const w=c.wheels[key];
      w.spin.rotation.x += (c.speed*dt)/R;
      if(w.steer) w.steerPivot.rotation.y = THREE.MathUtils.lerp(w.steerPivot.rotation.y, (c.tOffset-c.offset)*0.15, 0.2);
    }
    c.tan=tv;
  }
}
