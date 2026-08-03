/* SIMULADOR DE BALANCEAMENTO HEADLESS (§14) — taxa de vitória por andar/classe */
import { makeRNG } from '../js/rng.js';
import { CLASSES } from '../js/data/classes.js';
import { Combat } from '../js/engine/combat.js';
import { buildWave, burdensFor } from '../js/engine/encounter.js';
import { autoCombat } from '../js/engine/ai.js';
import { resetDieIds } from '../js/data/dice.js';
import { gerarOpcoes, aplicar, recalcRelics } from '../js/engine/rewards.js';
import { findSubset } from '../js/engine/requirements.js';

export function runOnce(classeId, seed, maxMasmorra=1){
  const rng = makeRNG(seed);
  resetDieIds();
  const C = CLASSES[classeId];
  const p = { classe:classeId, hp:C.hp, maxHp:C.hp, baseMaxHp:C.hp, block:0, bag:C.bag(),
              statuses:{}, essence:0, rerollsBase:C.rerolls, relics:[], unlocked:[] };
  recalcRelics(p);
  /* IA de escolha de recompensa: prioriza poder, evita amaldiçoadas cedo (§9) */
  const escolher = (opts, m)=>{
    const val = o => o.t==='reliquia' ? (
        o.r==='amaldicoada'
          ? ((o.rel.mods?.hpMult && o.rel.mods.hpMult<1 && p.maxHp<90) ? -5   // não aceita cortar HP baixo
             : o.rel.flag==='sem_cura' && p.hp<p.maxHp*0.5 ? -3 : (m>=5?7:2))
          : o.r==='rara'?9 : 6)
              : o.t==='dado' ? 5 : o.t==='grav' ? 5.5
              : (p.hp < p.maxHp*0.55 ? 8 : 1);
    return opts.reduce((a,b)=> val(b)>val(a)?b:a);
  };
  let andaresLimpos = 0;
  for(let m=1; m<=maxMasmorra; m++){
    const burdens = burdensFor(m);
    for(let a=1; a<=10; a++){
      const inimigos = buildWave(m, a, rng);
      const cb = new Combat({ rng, player:p, enemies:inimigos, burdens, log:false });
      const r = autoCombat(cb, C.skills);
      if(r!=='win') return { ok:false, masmorra:m, andar:a, andaresLimpos, hp:p.hp };
      andaresLimpos++;
      // RECOMPENSA: escolhe 1 de 3 (§9) — é isso que faz o poder crescer
      aplicar(escolher(gerarOpcoes(rng, p, 3), m), p, rng);
      // santuário nos andares 5 e 10 (§3.1)
      if(a===5||a===10) p.hp = Math.min(p.maxHp, p.hp + Math.round(p.maxHp*0.30));
      else p.hp = Math.min(p.maxHp, p.hp + 2);
    }
  }
  return { ok:true, andaresLimpos, hp:p.hp };
}

const N = +(process.argv[2]||2000);
const MAXM = +(process.argv[3]||1);
console.log(`Simulando ${N} runs/classe até a Masmorra ${MAXM}...\n`);
const linhas=[];
for(const id of Object.keys(CLASSES)){
  let vit=0, somaAndar=0; const morteEm={};
  for(let i=0;i<N;i++){
    const r = runOnce(id, 'seed-'+id+'-'+i, MAXM);
    if(r.ok) vit++; else { morteEm[r.andar]=(morteEm[r.andar]||0)+1; }
    somaAndar += r.andaresLimpos;
  }
  const tx = (100*vit/N);
  linhas.push({ id, nome:CLASSES[id].nome, tx, media:(somaAndar/N),
                pior: Object.entries(morteEm).sort((a,b)=>b[1]-a[1])[0] });
  console.log(`${CLASSES[id].glifo} ${CLASSES[id].nome.padEnd(24)} vitória ${tx.toFixed(1).padStart(5)}%  |  andares médios ${(somaAndar/N).toFixed(1)}`
    + (Object.keys(morteEm).length? `  |  morre mais no andar ${Object.entries(morteEm).sort((a,b)=>b[1]-a[1])[0][0]}`:''));
}
const txs = linhas.map(l=>l.tx).filter(t=>t>0);
if(txs.length){
  const mx=Math.max(...txs), mn=Math.min(...txs);
  console.log(`\nCritério §15: nenhuma classe > 2× a de outra -> razão ${(mx/Math.max(mn,0.01)).toFixed(2)}× ${mx/Math.max(mn,0.01)<=2?'OK':'PRECISA BALANCEAR'}`);
}
