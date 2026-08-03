/* IA gulosa para o SIMULADOR headless (§14) — joga "razoavelmente bem". */
import { findSubset, satisfies, entryValue } from './requirements.js';
import { RESPIRAR } from '../data/classes.js';

/* pontua uma habilidade pelo impacto estimado */
function score(skill, ents, cb){
  const vals = ents.map(e=>entryValue(e)||0);
  const sum = vals.reduce((a,b)=>a+b,0);
  let s = 0;
  for(const e of skill.eff||[]){
    if(e.op==='dmg')   s += sum*2 + 6;
    if(e.op==='hits')  s += sum*3;
    if(e.op==='status')s += sum*1.5;
    if(e.op==='block'){
      // intenção é VISÍVEL (§6): um bom jogador se defende do golpe telegrafado.
      const letal = cb.perigo >= cb.hp*0.85;         // pode MATAR neste turno
      const grave = cb.perigo >= cb.hp*0.45;
      s += sum * (letal ? 2.8 : grave ? 1.4 : 0.4);
    }
    if(e.op==='exec')  s += 8;
  }
  return s / Math.max(1, ents.length);   // eficiência por dado
}
export function playTurn(combat, skills){
  let guard = 0, respiros = 0;
  while(guard++ < 12){
    // re-rola se a mão está fraca e ainda há re-rolagens
    const pool = combat.pool();
    if(!pool.length) break;
    const perigo = combat.aliveEnemies().reduce((a,e)=>a+((e.intent?.v||0)*(e.intent?.n||1)),0);
    const cb = { hp:combat.p.hp, perigo };
    let best=null;
    for(const sk of [...skills, RESPIRAR]){
      if(sk.unlock && !combat.p.unlocked?.includes(sk.unlock)) continue;
      const idxs = findSubset(sk.req, pool);
      if(!idxs) continue;
      const ents = idxs.map(i=>pool[i]);
      let sc = score(sk, ents, cb) + (sk.id==='respirar' ? -4 : 0);
      // com risco de morte, Respirar (bloqueio garantido) vira jogada válida
      if(sk.id==='respirar' && cb.perigo >= cb.hp*0.9) sc = Math.max(sc, 7);
      // Arcanista: guardar no Círculo vale mais que gastar à toa (§7.3 Canalização)
      if(sk.id==='respirar' && combat.p.classe==='arcanista' && cb.perigo < cb.hp*0.4) sc = -2;
      if(!best || sc>best.sc) best={ sk, ids:ents.map(e=>e.dieId), sc };
    }
    // re-rolar pode CUSTAR VIDA (Fardo M5) — só vale a pena se necessário
    const custaVida = combat.burdens.has('reroll_custa_vida');
    const podeRerolar = combat.rerolls>0 && (!custaVida || combat.p.hp > 18);
    if(!best){
      if(podeRerolar){ combat.reroll(pool.map(e=>e.dieId)); continue; }
      break;
    }
    // com mão fraca e re-rolagem sobrando, tenta melhorar antes de gastar
    const limiar = custaVida ? 5 : 10;
    if(best.sc < limiar && podeRerolar && guard<4){
      // mão INÚTIL (nada bom encaixa): re-rola tudo. Mão morna: só os dados fracos.
      // "mão inútil" = a melhor jogada mal vale a pena (Respirar pontua ~-2, então
      // testar <=0 nunca disparava e o Arcanista desperdiçava o turno inteiro).
      const alvos = best.sc < 4
        ? pool.map(e=>e.dieId)
        : pool.filter(e=>(entryValue(e)||0) <= 2).map(e=>e.dieId);
      if(alvos.length){ combat.reroll(alvos); continue; }
    }
    const alvo = combat.aliveEnemies().reduce((bi,e,i,arr)=> arr[bi].hp<=e.hp?bi:i, 0);
    if(best.sk.id==='respirar'){ if(respiros>=2) break; respiros++; }
    const r = combat.use(best.sk, best.ids, alvo);
    if(!r.ok) break;
    if(combat.over) return;
  }
}
export function autoCombat(combat, skills, maxTurns=40){
  combat.startTurn();
  let t=0;
  while(!combat.over && t++<maxTurns){ playTurn(combat, skills); if(combat.over) break; combat.endTurn(); }
  return combat.over || 'timeout';
}
