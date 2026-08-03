/* ========================================================================
   RESULTADO PREDETERMINADO (§11.2, método A — busca por semente).
   O motor de regras sorteia a face ANTES. Aqui simulamos a física headless
   com sementes diferentes e reproduzimos a PRIMEIRA que pousa nessa face.
   Nada de "girar e trocar a textura no fim" — a queda é 100% física real.
   ===================================================================== */
import { Dado, simular } from './physics.js';
import { faceParaCima } from './geometry.js';

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
    const f = faceParaCima(tipo, d.q);
    if(f === faceAlvo) return { trilha, faceIdx:f, semente, tentativas:k+1, exato:true, fim:d.p.slice(), r:d.r };
    if(!melhor) melhor = { trilha, faceIdx:f, semente, tentativas:k+1, exato:false, fim:d.p.slice(), r:d.r };
  }
  return melhor;   // fallback: nunca trava o jogo
}
/* rolagem de uma bolsa inteira, cada dado com seu alvo */
export function rolarBolsa(pedidos, semente0, mesa){
  return pedidos.map((p,i)=> rolarPara(p.tipo, p.faceAlvo, (semente0+i*104729)|0, mesa));
}
