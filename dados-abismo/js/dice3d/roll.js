/* ========================================================================
   RESULTADO PREDETERMINADO (§11.2, método A — busca por semente).
   O motor de regras sorteia a face ANTES. Aqui simulamos a física headless
   com sementes diferentes e reproduzimos a PRIMEIRA que pousa nessa face.
   Nada de "girar e trocar a textura no fim" — a queda é 100% física real.
   ===================================================================== */
import { Dado, simular } from './physics.js';
import { faceParaCima, assentar } from './geometry.js';

/* Depois que o dado dorme, ele quase sempre fica LEVEMENTE torto (a física para
   por limiar, não por perfeição). Aqui ele "acomoda": alguns quadros suaves até
   a face de apoio deitar exata na mesa — pro d4 a ponta fica cravada pra cima. */
function acomodar(tipo, trilha, raio){
  const u = trilha[trilha.length-1];
  const a = assentar(tipo, u.q, raio);
  const q0 = u.q;
  const pd = q0[0]*a.q[0]+q0[1]*a.q[1]+q0[2]*a.q[2]+q0[3]*a.q[3];
  const q1 = pd<0 ? a.q.map(x=>-x) : a.q;         // caminho curto
  const N = 12, y0 = u.p[1];
  for(let i=1;i<=N;i++){
    const t=i/N, s=t*t*(3-2*t);
    let q=[0,1,2,3].map(k=> q0[k]*(1-s)+q1[k]*s);
    const m=Math.hypot(q[0],q[1],q[2],q[3])||1; q=q.map(x=>x/m);
    trilha.push({ p:[u.p[0], y0+(a.y-y0)*s, u.p[2]], q, imp:null });
  }
  return q1;
}

const mulberry = s => () => { s=(s+0x6D2B79F5)|0; let t=Math.imul(s^s>>>15,1|s);
  t=(t+Math.imul(t^t>>>7,61|t))^t; return ((t^t>>>14)>>>0)/4294967296; };

/* devolve { trilha, faceIdx, semente, tentativas } */
export function rolarPara(tipo, faceAlvo, semente0, mesa, maxTentativas=180, zona=null, obst=null, raio=0.5){
  let melhor=null;
  for(let k=0;k<maxTentativas;k++){
    const semente = (semente0 + k*7919)|0;
    const d = new Dado(tipo, raio);
    const trilha = simular(d, mulberry(semente), mesa, 900, 1/120, zona, obst);
    if(!d.dormindo || trilha.length > 260) continue;   // queda longa demais = descarta
    const qf = acomodar(tipo, trilha, raio);           // pousa reto ANTES de ler
    const f = faceParaCima(tipo, qf);
    if(f === faceAlvo) return { trilha, faceIdx:f, semente, tentativas:k+1, exato:true, fim:d.p.slice(), r:d.r, q:qf };
    if(!melhor) melhor = { trilha, faceIdx:f, semente, tentativas:k+1, exato:false, fim:d.p.slice(), r:d.r, q:qf };
  }
  return melhor;   // fallback: nunca trava o jogo
}
/* rolagem de uma bolsa inteira, cada dado com seu alvo */
export function rolarBolsa(pedidos, semente0, mesa){
  return pedidos.map((p,i)=> rolarPara(p.tipo, p.faceAlvo, (semente0+i*104729)|0, mesa));
}
