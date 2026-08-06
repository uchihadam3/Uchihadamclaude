/* ========================================================================
   MEDIÇÃO POR MASMORRA — uma de cada vez, com o enxoval que o jogo dá.

   O simulador antigo só media a descida inteira desde a Masmorra 1: quem
   morre no andar 8 nunca chega na 5, então as masmorras da frente ficavam
   calibradas no chute. Agora que dá para COMEÇAR em qualquer masmorra
   aberta, dá para medir cada uma isolada, com exatamente o poder que o
   jogo entrega a quem começa ali.

   A pergunta que este arquivo responde é a do desenho:
     "dá para fechar UMA masmorra por descida — e ela fica mais difícil
      que a anterior?"

     node test/masmorra.mjs [runs por classe] [masmorra inicial] [final]
   ===================================================================== */
import { makeRNG } from '../js/rng.js';
import { CLASSES } from '../js/data/classes.js';
import { Combat } from '../js/engine/combat.js';
import { buildWave, burdensFor, criarInimigo } from '../js/engine/encounter.js';
import { autoCombat } from '../js/engine/ai.js';
import { resetDieIds } from '../js/data/dice.js';
import { gerarOpcoes, aplicar, recalcRelics } from '../js/engine/rewards.js';
import { ESCALADA } from '../js/data/dungeons.js';

/* o MESMO enxoval de jogo.js: uma recompensa por andar pulado */
function enxovalar(p, masmorra, rng){
  /* como um jogador razoável escolhe. Vigor entra valendo o mesmo que uma
     relíquia comum: quem desce fundo aprende que sobreviver ao turno é
     pré-requisito para bater no próximo. */
  const val = o => o.t==='reliquia' ? (o.r==='amaldicoada'?2 : o.r==='rara'?9 : 6)
            : o.t==='dado' ? 5 : o.t==='grav' ? 5.5 : o.t==='vigor' ? 6
            : (p.hp < p.maxHp*0.55 ? 8 : 1);
  for(let i=0;i<(masmorra-1)*10;i++){
    const opts = gerarOpcoes(rng, p, 3);
    aplicar(opts.reduce((a,b)=> val(b)>val(a)?b:a), p, rng);
  }
  p.hp = p.maxHp;
}

/* uma descida que COMEÇA na masmorra pedida e tenta fechar os 10 andares */
function correr(classeId, masmorra, seed){
  const rng = makeRNG(seed); resetDieIds();
  const C = CLASSES[classeId];
  /* AS CHAVES DA TRILHA: quem chega na Masmorra N fechou as N-1 anteriores,
     e portanto tem as habilidades marcadas m1..m(N-1) na mão. Medir a M5
     com o kit de estreia é medir um jogador que não existe. */
  const chaves = [];
  for(let i=1;i<masmorra;i++) chaves.push('m'+i);
  const p = { classe:classeId, hp:C.hp, maxHp:C.hp, baseMaxHp:C.hp, block:0,
              bag:C.bag(), statuses:{}, essence:0, rerollsBase:C.rerolls,
              relics:[], unlocked:chaves };
  recalcRelics(p);
  enxovalar(p, masmorra, rng);

  const burdens = burdensFor(masmorra);
  let turnos = 0, lutas = 0;
  for(let a=1; a<=10; a++){
    const inimigos = buildWave(masmorra, a, rng, p.relicFlags);
    const liberadas = C.skills.filter(s=>!s.unlock || chaves.includes(s.unlock));
    const cb = new Combat({ rng, player:p, enemies:inimigos, burdens, log:false });
    cb.skillsDoJogador = liberadas;
    cb.onInvocar = id => criarInimigo(masmorra, a, id, rng);
    const r = autoCombat(cb, liberadas);
    turnos += cb.turn; lutas++;
    if(r !== 'win') return { ok:false, andar:a, turnos, lutas, hp:p.hp };
    /* o MESMO respiro de jogo.js — se o simulador curar diferente do jogo,
       ele mede um jogo que ninguém joga */
    { const pct = (a===5||a===10) ? 0.30 : 0.06;
      const meio = burdens.includes('cura_reduzida') ? 0.5 : 1;
      p.hp = Math.min(p.maxHp, p.hp + Math.round(p.maxHp*pct*meio)); }
    aplicar(gerarOpcoes(rng,p,3)[0], p, rng);
  }
  return { ok:true, andar:10, turnos, lutas, hp:p.hp, maxHp:p.maxHp };
}

const N    = +(process.argv[2] || 40);
const DE   = +(process.argv[3] || 1);
const ATE  = +(process.argv[4] || 10);

console.log(`MEDIÇÃO POR MASMORRA — ${N} descidas por classe, começando em cada uma\n`);
console.log('M   masmorra                  fecha   andar médio   morre mais em   turnos/luta   HP no fim');
const resumo = [];
for(let m=DE; m<=ATE; m++){
  let fecha=0, somaAndar=0, somaTurno=0, somaLuta=0, somaHP=0, total=0;
  const morteEm = {};
  for(const cid of Object.keys(CLASSES)){
    for(let i=0;i<N;i++){
      const r = correr(cid, m, `med-${m}-${cid}-${i}`);
      total++; somaAndar += r.ok ? 10 : r.andar-1;
      somaTurno += r.turnos; somaLuta += r.lutas;
      if(r.ok){ fecha++; somaHP += Math.round(100*r.hp/r.maxHp); }
      else morteEm[r.andar] = (morteEm[r.andar]||0)+1;
    }
  }
  const pior = Object.entries(morteEm).sort((a,b)=>b[1]-a[1])[0];
  const tx = 100*fecha/total;
  resumo.push({ m, tx });
  console.log(`M${String(m).padEnd(2)} ${ESCALADA[m-1].nome.padEnd(24)} ${String(tx.toFixed(0)+'%').padStart(5)}`
    + `   ${(somaAndar/total).toFixed(1).padStart(11)}`
    + `   ${(pior?('andar '+pior[0]):'—').padStart(13)}`
    + `   ${(somaTurno/somaLuta).toFixed(1).padStart(11)}`
    + `   ${fecha?((somaHP/fecha).toFixed(0)+'%').padStart(9):'—'.padStart(9)}`);
}

console.log('\n— O DESENHO PEDE —');
console.log('  · dá para FECHAR uma masmorra por descida  (nem 0%, nem 100%)');
console.log('  · cada masmorra é MAIS difícil que a anterior');
let quebras = 0;
for(let i=1;i<resumo.length;i++){
  if(resumo[i].tx > resumo[i-1].tx + 8){
    console.log(`  ✕ M${resumo[i].m} (${resumo[i].tx.toFixed(0)}%) está MAIS FÁCIL que M${resumo[i-1].m} (${resumo[i-1].tx.toFixed(0)}%)`);
    quebras++;
  }
}
const fora = resumo.filter(r=>r.tx<10 || r.tx>85);
for(const r of fora)
  console.log(`  ✕ M${r.m} em ${r.tx.toFixed(0)}%: ${r.tx<10?'quase impossível':'fácil demais'}`);
if(!quebras && !fora.length) console.log('  ✓ a curva sobe e todas as masmorras são fecháveis');
