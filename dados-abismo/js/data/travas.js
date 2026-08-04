/* ========================================================================
   FECHADURAS (§6 puzzle) — o coração do jogo.

   Um inimigo não é "um saco de HP maior". Ele é uma REGRA sobre como você
   pode feri-lo. A onda inteira vira um quebra-cabeça porque as fechaduras
   competem pelos MESMOS dados: abrir uma costuma fechar a outra.

   Tudo é público (§12/§15): a carta do inimigo mostra a fechadura, e ela
   acende verde no instante em que os dados selecionados a abrem.

   `ok(alocacao, v)` recebe o que você gastou no golpe:
     { sum, max, min, count, vals, simbolos }
   ===================================================================== */
const GLIFO = { blade:'⚔', shield:'🛡', essence:'✦', wild:'◈', echo:'⟳' };

export const TRAVAS = {
  impar:   { ico:'◑', nome:'Ímpar',
             txt:()=>'Só sangra se a SOMA dos dados for ÍMPAR', curto:()=>'soma ÍMPAR',
             ok:a=> a.sum%2===1 },
  par:     { ico:'◐', nome:'Par',
             txt:()=>'Só sangra se a SOMA dos dados for PAR', curto:()=>'soma PAR',
             ok:a=> a.sum%2===0 },
  forte:   { ico:'▲', nome:'Couraça',
             txt:v=>`Ignora o golpe se o maior dado for menor que ${v}`, curto:v=>`maior dado ≥ ${v}`,
             ok:(a,v)=> a.max>=v },
  fraco:   { ico:'▼', nome:'Casca Fina',
             txt:v=>`Estilhaça o golpe grande: só sangra se o maior dado for ≤ ${v}`, curto:v=>`maior dado ≤ ${v}`,
             ok:(a,v)=> a.max<=v },
  chave:   { ico:'🗝', nome:'Chave',
             txt:v=>`Só abre com soma EXATA de ${v}`, curto:v=>`soma = ${v}`,
             ok:(a,v)=> a.sum===v },
  multiplo:{ ico:'✳', nome:'Múltiplo',
             txt:v=>`Só sangra se a soma for múltiplo de ${v}`, curto:v=>`soma múltipla de ${v}`,
             ok:(a,v)=> a.sum>0 && a.sum%v===0 },
  enxuto:  { ico:'①', nome:'Enxuto',
             txt:v=>`Só sangra se você gastar exatamente ${v} dado${v>1?'s':''}`, curto:v=>`exatamente ${v} dado${v>1?'s':''}`,
             ok:(a,v)=> a.count===v },
  farto:   { ico:'⁙', nome:'Farto',
             txt:v=>`Só sangra com ${v} dados ou mais no mesmo golpe`, curto:v=>`${v}+ dados`,
             ok:(a,v)=> a.count>=v },
  simbolo: { ico:'✦', nome:'Selo',
             txt:v=>`Só sangra se o golpe contiver ${GLIFO[v]||v}`, curto:v=>`precisa de ${GLIFO[v]||v}`,
             ok:(a,v)=> a.simbolos.includes(v) },
  casal:   { ico:'∞', nome:'Gêmeo',
             txt:()=>'Invulnerável enquanto o gêmeo estiver vivo', curto:()=>'mate o gêmeo antes',
             ok:(a,v,cb,en)=> !cb.enemies.some(o=>o.hp>0 && o!==en && o.gemeo===en.gemeo) },
  espelho: { ico:'⇄', nome:'Espelho',
             txt:v=>`Devolve ${v}% do dano que sofrer`, curto:v=>`devolve ${v}%`,
             ok:()=> true, reflete:true },
};

/* rótulo curto pra HUD */
export function travaTxt(t){
  if(!t) return null;
  const d = TRAVAS[t.t]; if(!d) return null;
  return { ico:d.ico, nome:d.nome, txt:d.txt(t.v), curto:(d.curto||d.txt)(t.v) };
}
/* a alocação abre a fechadura? (cb e en só para 'casal') */
export function travaAberta(t, aloc, cb, en){
  if(!t) return true;
  const d = TRAVAS[t.t]; if(!d) return true;
  return !!d.ok(aloc, t.v, cb, en);
}
export const travaReflete = t => !!(t && TRAVAS[t.t]?.reflete);
