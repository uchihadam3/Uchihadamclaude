/* ========================================================================
   REQUISITOS DE ENCAIXE (§5.2) — "todo dado é uma decisão".
   Um encaixe recebe um SUBCONJUNTO de dados rolados e valida o padrão.
   Curinga (◈) assume qualquer valor -> resolvido por busca.
   ===================================================================== */
import { faceValue } from '../data/faces.js';

/* entry = { dieId, tipo, n, face:{k,v}, material } */
export const entryValue = e => e.face.k==='wild' ? null : faceValue(e.face);
export const isWild     = e => e.face.k==='wild';
export const isSymbol   = (e,s) => e.face.k===s;

/* todas as combinações de valores possíveis para os curingas do conjunto */
function wildAssignments(entries, cb){
  const wilds = entries.map((e,i)=>({e,i})).filter(x=>isWild(x.e));
  if(!wilds.length) return cb(entries.map(entryValue));
  const base = entries.map(entryValue);
  const rec=(k)=>{
    if(k===wilds.length){ if(cb(base.slice())) return true; return false; }
    const w = wilds[k];
    for(let v=1; v<=w.e.n; v++){ base[w.i]=v; if(rec(k+1)) return true; }
    base[w.i]=null; return false;
  };
  return rec(0);
}

const REQ = {
  /* um dado com valor >= v */
  min:    (r,vals)=> vals.length===1 && vals[0]!==null && vals[0] >= r.v,
  /* um dado com valor exato */
  exact:  (r,vals)=> vals.length===1 && vals[0] === r.v,
  /* N dados de valor IGUAL (par/trinca/quadra) */
  set:    (r,vals)=> vals.length===r.size && vals.every(v=>v!==null && v===vals[0]),
  /* sequência de N (n, n+1, n+2...) */
  seq:    (r,vals)=>{ if(vals.length!==r.size || vals.some(v=>v===null)) return false;
                      const s=[...vals].sort((a,b)=>a-b);
                      return s.every((v,i)=> i===0 || v===s[i-1]+1); },
  /* soma EXATA (aceita vários dados) — "Julgamento [=7]" da OráculA */
  sumExact:(r,vals)=> vals.length>=1 && vals.every(v=>v!==null) && vals.reduce((a,b)=>a+b,0) === r.v,
  /* soma mínima, aceita quantos dados quiser */
  sum:    (r,vals)=> vals.length>=1 && vals.every(v=>v!==null) && vals.reduce((a,b)=>a+b,0) >= r.min,
  /* paridade */
  parity: (r,vals)=> vals.length===1 && vals[0]!==null && (r.p==='odd' ? vals[0]%2===1 : vals[0]%2===0),
  /* qualquer N dados (sem requisito de valor) */
  any:    (r,vals)=> vals.length === (r.count||1),
  /* N dados, CADA UM satisfazendo o sub-requisito. ex: [>=3][>=3] */
  each:   (r,vals)=> vals.length===r.size && vals.every(v=> v!==null && REQ[r.of.t](r.of,[v])),
};

/* símbolo é validado FORA da busca de valores (não depende do valor) */
function checkSymbol(req, entries){
  if(entries.length !== (req.count||1)) return false;
  return entries.every(e=> e.face.k===req.s);
}

export function satisfies(req, entries){
  if(!req) return false;
  if(req.t==='symbol') return checkSymbol(req, entries);
  const fn = REQ[req.t]; if(!fn) return false;
  let ok=false;
  wildAssignments(entries, vals => { if(fn(req, vals)){ ok=true; return true; } return false; });
  return ok;
}

/* VALORES FINAIS — o ◈ Curinga vira sozinho o número que serve.

   Isto dizia "do jeito mais favorável" e fazia o contrário: a busca varre de
   1 até N e parava no PRIMEIRO que satisfazia, ou seja, o MENOR. Com Fúria
   Cega (soma ≥ 11) e 5+5+◈, o curinga virava 1 (soma 11) em vez de 6 (soma
   16) — o jogador perdia dano sem entender por quê.

   Agora percorre todas as atribuições válidas e fica com a melhor. `prefere`
   é opcional e vem do combate: serve para o curinga também escolher o valor
   que ABRE a fechadura do alvo, não só o que soma mais. */
export function resolvedValues(req, entries, prefere=null){
  let out = entries.map(entryValue);
  if(req && req.t!=='symbol'){
    const fn=REQ[req.t];
    if(fn){
      let melhor=null, melhorNota=-Infinity;
      wildAssignments(entries, vals=>{
        if(!fn(req,vals)) return false;
        const soma = vals.reduce((a,b)=>a+(b||0),0);
        // a fechadura vale mais que o dano: golpe grande que não abre dá zero
        const nota = (prefere ? (prefere(vals) ? 1e6 : 0) : 0) + soma;
        if(nota > melhorNota){ melhorNota=nota; melhor=vals.slice(); }
        return false;                       // não para: quer ver todas
      });
      if(melhor) out = melhor;
    }
  }
  return out.map(v=> v===null ? 0 : v);
}

export function reqLabel(req){
  if(!req) return '—';
  switch(req.t){
    case 'min':    return `[≥${req.v}]`;
    case 'exact':  return `[=${req.v}]`;
    case 'set':    return req.size===2?'[PAR]':req.size===3?'[TRINCA]':`[${req.size} IGUAIS]`;
    case 'seq':    return `[SEQ ${req.size}]`;
    case 'sum':    return `[soma ≥ ${req.min}]`;
    case 'sumExact': return `[soma = ${req.v}]`;
    case 'parity': return req.p==='odd'?'[ímpar]':'[par]';
    case 'symbol': return `[${req.s==='essence'?'✦':req.s==='blade'?'⚔':req.s==='shield'?'🛡':'?'}]`;
    case 'any':    return `[qualquer ${req.count||1}]`;
    case 'each':   return reqLabel(req.of).repeat(req.size);
  }
  return '[?]';
}

/* ---- BUSCA: menor subconjunto do pool que satisfaz o requisito ----
   usado pela IA do simulador e pelas dicas da UI (§12 pré-visualização). */
/* TODOS os encaixes possíveis (até um teto). Com fechaduras, "um subconjunto
   qualquer que satisfaz o requisito" não basta: o requisito diz se a habilidade
   PODE ser usada, a fechadura diz se ela FERE. Quem escolhe precisa ver as
   opções — é isso que transforma a jogada em quebra-cabeça. */
export function findSubsets(req, pool, teto=24){
  const out=[];
  const maxK = (req.t==='sum'||req.t==='sumExact') ? Math.min(5,pool.length)
             : (req.t==='set'||req.t==='seq'||req.t==='each') ? req.size : (req.count||1);
  const minK = (req.t==='sum'||req.t==='sumExact') ? 1 : maxK;
  for(let k=minK; k<=maxK && out.length<teto; k++){
    const cur=[];
    const comb=(start)=>{
      if(out.length>=teto) return;
      if(cur.length===k){ const ents=cur.map(i=>pool[i]);
        if(satisfies(req, ents)) out.push(cur.slice()); return; }
      for(let i=start;i<pool.length;i++){ cur.push(i); comb(i+1); cur.pop(); if(out.length>=teto) return; }
    };
    comb(0);
  }
  return out;
}
export function findSubset(req, pool){
  const idx = pool.map((_,i)=>i);
  const maxK = (req.t==='sum'||req.t==='sumExact') ? pool.length : (req.t==='set'||req.t==='seq'||req.t==='each') ? req.size : (req.count||1);
  const minK = (req.t==='sum'||req.t==='sumExact') ? 1 : maxK;
  for(let k=minK; k<=maxK; k++){
    let found=null;
    const comb=(start, cur)=>{
      if(found) return;
      if(cur.length===k){ const ents=cur.map(i=>pool[i]);
        if(satisfies(req, ents)) found=cur.slice(); return; }
      for(let i=start;i<idx.length;i++){ cur.push(i); comb(i+1,cur); cur.pop(); if(found) return; }
    };
    comb(0,[]);
    if(found) return found;
  }
  return null;
}
