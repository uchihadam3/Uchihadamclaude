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
/* nome POR EXTENSO: a 9px o glifo sozinho vira um risquinho ilegível */
const GLIFO = { blade:'⚔ Lâmina', shield:'🛡 Escudo', essence:'✦ Essência', wild:'◈ Curinga', echo:'⟳ Eco' };

export const TRAVAS = {
  impar:   { ico:'◑', nome:'Ímpar',
             txt:()=>'Só sofre dano se a SOMA dos dados gastos for ÍMPAR', curto:()=>'só sofre dano com soma ÍMPAR',
             ok:a=> a.sum%2===1 },
  par:     { ico:'◐', nome:'Par',
             txt:()=>'Só sofre dano se a SOMA dos dados gastos for PAR', curto:()=>'só sofre dano com soma PAR',
             ok:a=> a.sum%2===0 },
  forte:   { ico:'▲', nome:'Couraça',
             txt:v=>`Só sofre dano se o MAIOR dado do golpe for ${v} ou mais`, curto:v=>`só sofre dano com dado ${v}+`,
             ok:(a,v)=> a.max>=v },
  fraco:   { ico:'▼', nome:'Casca Fina',
             txt:v=>`Estilhaça golpe grande: só sofre dano se o maior dado for ${v} ou menos`, curto:v=>`só sofre dano com dado até ${v}`,
             ok:(a,v)=> a.max<=v },
  chave:   { ico:'🗝', nome:'Chave',
             txt:v=>`Só sofre dano se a soma dos dados der EXATAMENTE ${v}`, curto:v=>`só sofre dano com soma exata ${v}`,
             ok:(a,v)=> a.sum===v },
  multiplo:{ ico:'✳', nome:'Múltiplo',
             txt:v=>`Só sofre dano se a soma dos dados for múltiplo de ${v}`, curto:v=>`só sofre dano com soma múltipla de ${v}`,
             ok:(a,v)=> a.sum>0 && a.sum%v===0 },
  enxuto:  { ico:'①', nome:'Enxuto',
             txt:v=>`Só sofre dano se o golpe gastar exatamente ${v} dado${v>1?'s':''}`, curto:v=>`só sofre dano gastando ${v} dado${v>1?'s':''}`,
             ok:(a,v)=> a.count===v },
  farto:   { ico:'⁙', nome:'Farto',
             txt:v=>`Só sofre dano se o golpe gastar ${v} dados ou mais`, curto:v=>`só sofre dano gastando ${v}+ dados`,
             ok:(a,v)=> a.count>=v },
  simbolo: { ico:'✦', nome:'Selo',
             txt:v=>`Só sofre dano se o golpe contiver a face ${GLIFO[v]||v}`, curto:v=>`só sofre dano com ${GLIFO[v]||v} no golpe`,
             ok:(a,v)=> a.simbolos.includes(v) },
  /* ---- as quatro que entram das Masmorras 4 em diante ---- */
  distintos:{ico:'⁘', nome:'Avesso',
             txt:()=>'Só sofre dano se TODOS os dados do golpe tiverem valores diferentes',
             curto:()=>'só sofre dano com dados todos DIFERENTES',
             ok:a=> a.vals.length>=1 && new Set(a.vals).size===a.vals.length },
  iguais:  { ico:'⁚', nome:'Uníssono',
             txt:v=>`Só sofre dano se o golpe tiver ${v}+ dados e TODOS forem iguais`,
             curto:v=>`só sofre dano com ${v}+ dados IGUAIS`,
             ok:(a,v)=> a.vals.length>=(v||2) && new Set(a.vals).size===1 },
  faixa:   { ico:'◇', nome:'Janela',
             txt:v=>`Só sofre dano se a soma ficar entre ${v[0]} e ${v[1]}`,
             curto:v=>`só sofre dano com soma ${v[0]}–${v[1]}`,
             ok:(a,v)=> a.sum>=v[0] && a.sum<=v[1] },
  primo:   { ico:'✧', nome:'Indivisível',
             txt:()=>'Só sofre dano se a soma for um número PRIMO (2, 3, 5, 7, 11, 13, 17…)',
             curto:()=>'só sofre dano com soma PRIMA',
             ok:a=>{ const n=a.sum; if(n<2) return false;
                     for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; } },
  casal:   { ico:'∞', nome:'Gêmeo',
             txt:()=>'Invulnerável enquanto o gêmeo estiver vivo', curto:()=>'imune enquanto o gêmeo viver',
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
