/* ========================================================================
   FÍSICA DE CORPO RÍGIDO (§11.1) — massa, inércia, restituição, atrito.
   Roda HEADLESS (sem three.js) para a busca de semente do §11.2 método A.
   Colisão genérica: vértices do poliedro vs chão e paredes da mesa.
   ===================================================================== */
import { poliedro, rot } from './geometry.js';

const G = -34;                      // gravidade (forte: dá peso de osso, não de plástico)
const REST = 0.28;                  // restituição (quica pouco — dado pesado)
const ATRITO = 0.42;
const AMORT_ANG = 0.975;            // amortecimento angular
const AMORT_LIN = 0.995;            // amortecimento linear (ar/feltro)
const AMORT_CONTATO = 0.86;         // perde giro rápido ao tocar a mesa (feltro, não mármore)
const SLEEP_V = 0.30, SLEEP_W = 1.1, SLEEP_FRAMES = 8;

const qmul=(a,b)=>[
  a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],
  a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],
  a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],
  a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];
const qnorm=q=>{const m=Math.hypot(...q)||1;return [q[0]/m,q[1]/m,q[2]/m,q[3]/m];};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];

export class Dado {
  constructor(tipo, raio=0.5, massa=1){
    this.tipo=tipo; this.g=poliedro(tipo);
    this.r=raio; this.m=massa;
    this.I = 0.4*massa*raio*raio;          // inércia ~esfera sólida
    this.Iinv = 1/this.I;
    this.p=[0,raio*2,0]; this.v=[0,0,0];
    this.q=[0,0,0,1]; this.w=[0,0,0];
    this.dormindo=false; this._quietos=0;
    this.impactos=[];                      // {vel, pos} para SOM e partícula (§11.4)
  }
  lancar(rng, alvoX=0, alvoZ=0, mesa=null){
    // arremesso: entra pela borda mais próxima, alto, mirando o ponto de queda
    const lx = mesa ? mesa.x*0.72 : 2.2, lz = mesa ? mesa.z*0.72 : 1.6;
    const a = rng()*Math.PI*2;
    this.p = [ Math.max(-lx,Math.min(lx, alvoX + Math.cos(a)*1.9)),
               2.3 + rng()*1.1,
               Math.max(-lz,Math.min(lz, alvoZ + Math.sin(a)*1.4)) ];
    const dirX = alvoX - this.p[0], dirZ = alvoZ - this.p[2];
    const f = 1.1 + rng()*0.7;
    this.v = [ dirX*f, 0.5 + rng()*1.0, dirZ*f ];
    this.w = [ (rng()*2-1)*26, (rng()*2-1)*26, (rng()*2-1)*26 ];   // torque forte = giro real
    // rotação inicial UNIFORME (Shoemake) — o sorteio anterior enviesava as faces
    const u1=rng(), u2=rng()*Math.PI*2, u3=rng()*Math.PI*2;
    const s1=Math.sqrt(1-u1), s2=Math.sqrt(u1);
    this.q = [ s1*Math.sin(u2), s1*Math.cos(u2), s2*Math.sin(u3), s2*Math.cos(u3) ];
    this.dormindo=false; this._quietos=0; this.impactos.length=0;
  }
  passo(dt, mesa, obstaculos){
    if(this.dormindo) return;
    this.v[1] += G*dt;
    this.p[0]+=this.v[0]*dt; this.p[1]+=this.v[1]*dt; this.p[2]+=this.v[2]*dt;
    const wq=[this.w[0],this.w[1],this.w[2],0];
    const dq=qmul(wq,this.q);
    this.q = qnorm([ this.q[0]+0.5*dq[0]*dt, this.q[1]+0.5*dq[1]*dt,
                     this.q[2]+0.5*dq[2]*dt, this.q[3]+0.5*dq[3]*dt ]);
    // ---- colisões: cada vértice do poliedro contra chão e paredes ----
    const planos = [ {n:[0,1,0], d:0} ];
    if(mesa){ const {x,z}=mesa;
      planos.push({n:[1,0,0], d:-x}, {n:[-1,0,0], d:-x}, {n:[0,0,1], d:-z}, {n:[0,0,-1], d:-z}); }
    let tocou=false;
    for(const pl of planos){
      for(const vl of this.g.verts){
        const rl = rot(this.q, [vl[0]*this.r, vl[1]*this.r, vl[2]*this.r]);
        const wp = [this.p[0]+rl[0], this.p[1]+rl[1], this.p[2]+rl[2]];
        const pen = dot(wp, pl.n) - pl.d;
        if(pen >= 0) continue;
        const vel = [ this.v[0]+ (this.w[1]*rl[2]-this.w[2]*rl[1]),
                      this.v[1]+ (this.w[2]*rl[0]-this.w[0]*rl[2]),
                      this.v[2]+ (this.w[0]*rl[1]-this.w[1]*rl[0]) ];
        const vn = dot(vel, pl.n);
        // correção posicional (empurrão físico, nunca teleporte §11.1)
        this.p[0]-=pl.n[0]*pen; this.p[1]-=pl.n[1]*pen; this.p[2]-=pl.n[2]*pen;
        if(vn >= 0) continue;
        const rxn = cross(rl, pl.n);
        const denom = 1/this.m + this.Iinv*dot(rxn,rxn);
        const j = -(1+REST)*vn/denom;
        const imp = [pl.n[0]*j, pl.n[1]*j, pl.n[2]*j];
        this.v[0]+=imp[0]/this.m; this.v[1]+=imp[1]/this.m; this.v[2]+=imp[2]/this.m;
        const dw = cross(rl, imp);
        this.w[0]+=dw[0]*this.Iinv; this.w[1]+=dw[1]*this.Iinv; this.w[2]+=dw[2]*this.Iinv;
        // atrito tangencial
        const vt=[vel[0]-pl.n[0]*vn, vel[1]-pl.n[1]*vn, vel[2]-pl.n[2]*vn];
        const vtm=Math.hypot(...vt);
        if(vtm>1e-4){
          const t=[-vt[0]/vtm,-vt[1]/vtm,-vt[2]/vtm];
          const rxt=cross(rl,t);
          const jt=Math.min(Math.abs(j)*ATRITO, vtm/(1/this.m + this.Iinv*dot(rxt,rxt)));
          const it=[t[0]*jt,t[1]*jt,t[2]*jt];
          this.v[0]+=it[0]/this.m; this.v[1]+=it[1]/this.m; this.v[2]+=it[2]/this.m;
          const dwt=cross(rl,it);
          this.w[0]+=dwt[0]*this.Iinv; this.w[1]+=dwt[1]*this.Iinv; this.w[2]+=dwt[2]*this.Iinv;
        }
        tocou=true;
        if(-vn > 0.9) this.impactos.push({ vel:-vn, pos:wp.slice() });   // som/partícula
      }
    }
    // ---- colisão contra dados JÁ ASSENTADOS (§11.1) ----
    if(obstaculos && obstaculos.length){
      for(const o of obstaculos){
        const dx=this.p[0]-o.p[0], dy=this.p[1]-o.p[1], dz=this.p[2]-o.p[2];
        const dist=Math.hypot(dx,dy,dz), min=(this.r+o.r)*0.90;
        if(dist>=min || dist<1e-6) continue;
        const n=[dx/dist,dy/dist,dz/dist], pen=min-dist;
        this.p[0]+=n[0]*pen; this.p[1]+=n[1]*pen; this.p[2]+=n[2]*pen;
        const vn=this.v[0]*n[0]+this.v[1]*n[1]+this.v[2]*n[2];
        if(vn<0){
          const j=-(1+0.30)*vn;
          this.v[0]+=n[0]*j; this.v[1]+=n[1]*j; this.v[2]+=n[2]*j;
          this.w[0]+=(n[2]*j)*0.9; this.w[2]-=(n[0]*j)*0.9;   // bate e RODA
          tocou=true; this._quietos=0;
          if(-vn>0.8) this.impactos.push({vel:-vn,pos:this.p.slice(),dado:true});
        }
      }
    }
    const ka = tocou ? AMORT_CONTATO : AMORT_ANG;
    this.w[0]*=ka; this.w[1]*=ka; this.w[2]*=ka;
    this.v[0]*=AMORT_LIN; this.v[2]*=AMORT_LIN;
    // repouso por limiar de velocidade angular (§11.1)
    if(Math.hypot(...this.v)<SLEEP_V && Math.hypot(...this.w)<SLEEP_W){
      if(++this._quietos>=SLEEP_FRAMES){ this.dormindo=true; this.v=[0,0,0]; this.w=[0,0,0]; }
    } else this._quietos=0;
  }
}

/* colisão entre dados (esfera-esfera com impulso) — §11.1 */
export function colidirDados(dados){
  for(let i=0;i<dados.length;i++) for(let j=i+1;j<dados.length;j++){
    const A=dados[i], B=dados[j];
    const dx=B.p[0]-A.p[0], dy=B.p[1]-A.p[1], dz=B.p[2]-A.p[2];
    const dist=Math.hypot(dx,dy,dz), min=(A.r+B.r)*0.92;
    if(dist>=min || dist<1e-6) continue;
    const n=[dx/dist,dy/dist,dz/dist];
    const pen=min-dist;
    // separa
    A.p[0]-=n[0]*pen*0.5; A.p[1]-=n[1]*pen*0.5; A.p[2]-=n[2]*pen*0.5;
    B.p[0]+=n[0]*pen*0.5; B.p[1]+=n[1]*pen*0.5; B.p[2]+=n[2]*pen*0.5;
    const rv=[B.v[0]-A.v[0], B.v[1]-A.v[1], B.v[2]-A.v[2]];
    const vn=dot(rv,n); if(vn>0) continue;
    const j2=-(1+0.34)*vn/(1/A.m+1/B.m);
    A.v[0]-=n[0]*j2/A.m; A.v[1]-=n[1]*j2/A.m; A.v[2]-=n[2]*j2/A.m;
    B.v[0]+=n[0]*j2/B.m; B.v[1]+=n[1]*j2/B.m; B.v[2]+=n[2]*j2/B.m;
    // giro no contato (dado bate e roda)
    const k=0.55;
    A.w[0]+=(Math.random()-0.5)*k; A.w[2]+=(Math.random()-0.5)*k;
    B.w[0]+=(Math.random()-0.5)*k; B.w[2]+=(Math.random()-0.5)*k;
    A.dormindo=false; B.dormindo=false; A._quietos=0; B._quietos=0;
    if(-vn>0.8){ A.impactos.push({vel:-vn,pos:A.p.slice(),dado:true}); }
  }
}

/* simula até repousar; devolve o índice da face de cima */
/* simula VÁRIOS dados juntos, com colisão entre eles */
export function simularBolsa(dados, rng, mesa, maxPassos=900, dt=1/120){
  dados.forEach((d,i)=> d.lancar(rng, (rng()*2-1)*mesa.x*0.5, (rng()*2-1)*mesa.z*0.5, mesa));
  const trilhas = dados.map(()=>[]);
  for(let k=0;k<maxPassos;k++){
    for(const d of dados) d.passo(dt, mesa);
    colidirDados(dados);
    dados.forEach((d,i)=> trilhas[i].push({ p:d.p.slice(), q:d.q.slice(), imp:d.impactos.splice(0) }));
    if(dados.every(d=>d.dormindo)) break;
  }
  return trilhas;
}

export function simular(dado, rng, mesa, maxPassos=900, dt=1/120, alvo=null, obstaculos=null){
  const ax = alvo ? alvo[0] : (mesa? (rng()*2-1)*mesa.x*0.45 : 0);
  const az = alvo ? alvo[1] : (mesa? (rng()*2-1)*mesa.z*0.45 : 0);
  dado.lancar(rng, ax, az, mesa);
  const trilha=[];
  for(let i=0;i<maxPassos;i++){
    dado.passo(dt, mesa, obstaculos);
    trilha.push({ p:dado.p.slice(), q:dado.q.slice(), imp:dado.impactos.splice(0) });
    if(dado.dormindo) break;
  }
  return trilha;
}
