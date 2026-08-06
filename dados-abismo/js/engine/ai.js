/* IA gulosa para o SIMULADOR headless (§14) — joga "razoavelmente bem". */
import { findSubset, findSubsets, satisfies, entryValue } from './requirements.js';
import { RESPIRAR } from '../data/classes.js';

/* PONTUAÇÃO REAL: em vez de adivinhar pelo tipo de efeito, roda a jogada no
   sandbox do motor (prever) e mede o que ela faz de fato. Sem isso a IA não
   enxergava que Colapso (sum*7) vale 3× um Raio (sum*3) e jogava mal as
   classes de sequência — que eram justamente as que "pareciam" fracas. */
function avaliar(combat, sk, ids, alvo, perigo){
  let pv; try{ pv = combat.prever(sk, ids, alvo); }catch(e){ return null; }
  if(!pv) return null;
  const hp = combat.p.hp;
  let s = 0;
  for(const a of pv.alvos){
    const e = combat.enemies[a.i]; if(!e) continue;
    s += Math.min(a.dano, e.hp);                      // dano útil (overkill não conta)
    if(a.morre) s += 14;                              // matar remove um atacante
    /* veneno e sangramento dão n de dano por turno e decaem 1: um status n só
       entrega tudo se o alvo viver n turnos, e a luta não dura isso. Conta o
       que cabe num horizonte de 3 turnos (n + n-1 + n-2), limitado pelo HP que
       o bicho ainda tem — sobra nenhum crédito por envenenar defunto. */
    s += a.estados.reduce((x,st)=>{
      const dur = st.st==='veneno' || st.st==='sangramento';
      return x + (dur ? Math.min(Math.max(0, 3*st.n - 3), e.hp) * 0.5 : st.n*2);
    }, 0);
  }
  const util = Math.min(pv.bloqueio, perigo);         // bloqueio só vale até o golpe que vem
  s += util * (perigo >= hp*0.85 ? 3.0 : perigo >= hp*0.45 ? 1.6 : 0.55);
  s += pv.curaHP*1.2 - pv.custoHP*(hp<30 ? 3 : 1.4) + pv.essencia*1.5;
  /* ARROMBAR vale pelos golpes SEGUINTES, não pelo próprio. O prever() roda
     uma jogada e mede o dano dela; quem abre a fechadura de todo mundo e bate
     de leve pontuava quase nada, então a IA nunca escolhia Quebra-Ossos nem
     Cadafalso — e medido, a trilha inteira aparecia com ganho zero (a M3 até
     PIORAVA 15 pontos com ela liberada). O crédito abaixo é o que um humano
     enxerga sozinho: destravar o campo é o que deixa o resto do turno passar. */
  const arr = (sk.eff||[]).find(e=>e.op==='arrombar');
  if(arr){
    const presos = combat.aliveEnemies().filter(e=>combat.travaDe(e) && !e._arrombada);
    const n = arr.tgt==='all' ? presos.length : Math.min(1, presos.length);
    s += n * 16;
  }
  return s / Math.max(1, ids.length);                 // eficiência POR DADO gasto
}
export function playTurn(combat, skills){
  let guard = 0, respiros = 0, sobre = 0;
  // GAZUA: gasta no bicho grosso e travado — é o que ela existe pra resolver
  if(combat._gazua>0){
    const presos = combat.aliveEnemies().filter(e=>combat.travaDe(e) && !e._arrombada && e.hp>40);
    if(presos.length){ const alv=presos.reduce((a,b)=>a.hp>=b.hp?a:b);
      combat.gazua(combat.aliveEnemies().indexOf(alv)); }
  }
  while(guard++ < 16){
    // re-rola se a mão está fraca e ainda há re-rolagens
    const pool = combat.pool();
    if(!pool.length) break;
    const perigo = combat.aliveEnemies().reduce((a,e)=>a+((e.intent?.v||0)*(e.intent?.n||1)),0);
    const cb = { hp:combat.p.hp, perigo };
    // alvos que valem a pena testar: o mais ferido (finalizar) e o que mais bate
    const vivos = combat.aliveEnemies();
    const idxMenorHP = combat.enemies.indexOf(vivos.reduce((a,b)=>a.hp<=b.hp?a:b, vivos[0]));
    const idxMaiorDano = combat.enemies.indexOf(vivos.reduce((a,b)=>
      ((a.intent?.v||0)*(a.intent?.n||1)) >= ((b.intent?.v||0)*(b.intent?.n||1)) ? a:b, vivos[0]));
    const alvosTeste = [...new Set([idxMenorHP, idxMaiorDano].filter(i=>i>=0))];
    let best=null;
    for(const sk of [...skills, RESPIRAR]){
      if(sk.unlock && !combat.p.unlocked?.includes(sk.unlock)) continue;
      // com FECHADURA, não basta um encaixe: o requisito diz se PODE, a
      // fechadura diz se FERE. Testa vários encaixes e fica com o que abre.
      const conjuntos = findSubsets(sk.req, pool, 14);
      if(!conjuntos.length) continue;
      for(const idxs of conjuntos){
      const ents = idxs.map(i=>pool[i]);
      const ids = ents.map(e=>e.dieId);
      for(const alv of alvosTeste){
        let sc = avaliar(combat, sk, ids, alv, perigo);
        if(sc===null) continue;
        if(sk.id==='respirar') sc -= 4;
        // com risco de morte, Respirar (bloqueio garantido) vira jogada válida
        if(sk.id==='respirar' && cb.perigo >= cb.hp*0.9) sc = Math.max(sc, 7);
        // Arcanista: guardar no Círculo vale mais que gastar à toa (§7.3 Canalização)
        if(sk.id==='respirar' && combat.p.classe==='arcanista' && cb.perigo < cb.hp*0.4) sc = -2;
        if(!best || sc>best.sc) best={ sk, ids, sc, alvo:alv };
      }
      }
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
    // PASSIVA DE CLASSE: Sobrecarga (+1 por 2 HP) e Trapaça (face oposta) são
    // ferramentas de fechadura de graça — a IA precisa saber usá-las.
    // Sobrecarga custa 2 HP: só vale se o +1 REALMENTE destrava alguém.
    if(best.sc < 8){
      const cid = combat.p.classe;
      const alto = combat.pool().slice().sort((a,b)=>(entryValue(b)||0)-(entryValue(a)||0))[0];
      const v = alto ? entryValue(alto) : null;
      const um = x => ({ sum:x, max:x, min:x, count:1, vals:[x], simbolos:[] });
      const presos = combat.aliveEnemies().filter(e=>combat.travaDe(e) && !e._arrombada && !(e.travaOff>0));
      const destrava = x => presos.some(en=>combat.abre(en, um(x)));
      if(v!==null && presos.length && !destrava(v)){
        if(cid==='lamina' && !combat.trapacaUsada && destrava(alto.n+1-v)
           && combat.trapaca(alto.dieId)) continue;
        if(cid==='carrasco' && sobre<2 && combat.p.hp>combat.p.maxHp*0.5 && destrava(v+1)
           && combat.sobrecarga(alto.dieId)){ sobre++; continue; }
      }
    }
    // POLEGAR TORTO: mão travada e a ferramenta na mão — empurra um dado e reavalia
    if(best.sc < 8 && combat._polegar>0){
      const cand = combat.pool().slice().sort((a,b)=>(entryValue(b)||0)-(entryValue(a)||0))[0];
      const v = cand ? entryValue(cand) : null;
      if(v!==null && combat.polegar(cand.dieId, v<cand.n?1:-1)) continue;
    }
    if(best.sc < limiar && podeRerolar && guard<4){
      // mão INÚTIL (nada bom encaixa): re-rola tudo. Mão morna: só os dados fracos.
      // "mão inútil" = a melhor jogada mal vale a pena (Respirar pontua ~-2, então
      // testar <=0 nunca disparava e o Arcanista desperdiçava o turno inteiro).
      const alvos = best.sc < 4
        ? pool.map(e=>e.dieId)
        : pool.filter(e=>(entryValue(e)||0) <= 2).map(e=>e.dieId);
      if(alvos.length){ combat.reroll(alvos); continue; }
    }
    if(best.sk.id==='respirar'){ if(respiros>=2) break; respiros++; }
    const r = combat.use(best.sk, best.ids, best.alvo);
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
