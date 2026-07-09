import { aiFlick } from '../src/game/ai';
import { GameManager, PlayerDef } from '../src/game/manager';
import { track } from '../src/game/generator';
import { TrackModel } from '../src/engine/track';
import { makeCap, DEFAULT_STATS } from '../src/engine/core';
import { skinById } from '../src/game/skins';

// 1) tempo por decisão de IA (precisa ser rápido no celular — 1 vez por jogada)
{
  const def = track(2, 3); const tm = new TrackModel(def);
  const caps = [0,1,2,3].map(i => makeCap(i,'c'+i,'coca',{...DEFAULT_STATS},true,'tecnico'));
  const s=def.start, ang=def.startAngle, fwd={x:Math.cos(ang),y:Math.sin(ang)};
  caps.forEach((c,i)=>{ c.pos={x:s.x+fwd.x*(2+i),y:s.y+fwd.y*(2+i)}; c.progress=tm.progressOf(c.pos); });
  const N=300; const t0=Date.now();
  for(let i=0;i<N;i++) aiFlick(caps[i%4], caps, tm);
  const ms=(Date.now()-t0)/N;
  console.log(`tempo por jogada da IA: ${ms.toFixed(1)} ms (ok se < ~30ms)`);
}
// 2) força relativa: 1 tampinha "fraca" (muito ruído) contra 3 IAs afiadas.
//    quanto menos a fraca vence, mais difícil ficou de ganhar.
function race(weakIdx:number): number {
  const def = track(1, 4);
  const players: PlayerDef[] = [0,1,2,3].map(i=>({name:'P'+i,isAI:true,ai:i===weakIdx?'caotico':'tecnico',skin:['coca','guarana','fanta','sprite'][i]}));
  const mgr=new GameManager(); mgr.setup(def,players);
  let steps=0; while(mgr.phase!=='over'&&steps<200000){mgr.update(1/60);steps++;}
  return mgr.caps[weakIdx].place;
}
let weakWins=0, sum=0; const R=24;
for(let r=0;r<R;r++){ const pl=race(0); sum+=pl; if(pl===1) weakWins++; }
console.log(`fraca (caótica) vs 3 técnicas afiadas em ${R} corridas: venceu ${weakWins}x · colocação média ${(sum/R).toFixed(2)} (de 4)`);
console.log('quanto MAIOR a colocação média da fraca, mais fortes ficaram as IAs afiadas ✓');
