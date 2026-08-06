/* ========================================================================
   O COFRE (§4.2-4.3) — meta-progressão PERMANENTE entre runs.
   Você morre, leva ECOS, compra melhorias que mudam REGRAS (não "+5% dano").
   ===================================================================== */
const KEY='abismo_cofre_v1';
/* quantas masmorras a descida tem. Passar da última é VENCER o jogo. */
export const MASMORRAS_TOTAL = 10;
export function carregar(){
  try{ const d=JSON.parse(localStorage.getItem(KEY)); if(d&&d.n) return d; }catch(e){}
  return { n:1, ecos:0, comprados:{}, recordes:{andar:0,masmorra:1}, runs:0, vitorias:0 };
}
export function salvar(m){ try{ localStorage.setItem(KEY, JSON.stringify(m)); }catch(e){} }

/* ===================================================================
   SAVE DA DESCIDA — você fecha o jogo no meio da masmorra e volta no
   mesmo lugar. Só se perde o progresso morrendo.

   O ponto de gravação é o MAPA, entre um andar e outro: gravar no meio
   de um combate exigiria congelar a rolagem, os dados na mesa e o estado
   do RNG, e um save meio-turno que volta errado é pior que save nenhum.
   =================================================================== */
const KEY_RUN = 'abismo_run_v1';

export function salvarRun(estado){
  try{ localStorage.setItem(KEY_RUN, JSON.stringify(estado)); }catch(e){}
}
export function carregarRun(){
  try{ const d = JSON.parse(localStorage.getItem(KEY_RUN));
       if(d && d.classe && d.masmorra) return d; }catch(e){}
  return null;
}
export function limparRun(){ try{ localStorage.removeItem(KEY_RUN); }catch(e){} }

/* ===================================================================
   MASMORRAS ABERTAS — fechar a Masmorra N libera começar direto na N+1.
   =================================================================== */
export function masmorrasAbertas(m){
  return Math.max(1, Math.min(MASMORRAS_TOTAL, m.abertas || 1));
}
export function abrirMasmorra(m, n){
  const nova = Math.max(1, Math.min(MASMORRAS_TOTAL, n));
  if(nova > (m.abertas||1)){ m.abertas = nova; salvar(m); return true; }
  return false;
}

/* ---------------- O TRONCO ANTIGO ----------------
   O Cofre começou como UMA árvore só, igual para as quatro classes: Osso,
   Véu e Coroa. Quando cada alma ganhou a sua própria árvore (data/passivas.js)
   isso virou repetição — o mesmo "+HP" e "+dano" comprado duas vezes, em
   dois lugares, com dois preços. O tronco foi desmontado e o que só existia
   nele (a 4ª habilidade, as opções de recompensa, o bônus de Ecos, a forja,
   as faces ⚔ e as relíquias de partida) foi para dentro das árvores, com
   nome e preço de cada classe.

   As listas continuam aqui, vazias, porque bonus() é chamada de vários
   pontos e um objeto com todos os campos zerados mantém tudo funcionando
   sem espalhar `if` pelo jogo inteiro. */
export const RAMOS = {};
export const NOS = [];
export const custoDe=(no,nivel)=> no.custo[Math.min(nivel,no.custo.length-1)];
export const nivelDe=(m,id)=> (m.comprados&&m.comprados[id])||0;
export function disponivel(m,no){
  if(nivelDe(m,no.id)>=no.max) return false;
  for(const r of (no.req||[])) if(nivelDe(m,r)<1) return false;
  return true;
}
export function comprar(m,no){
  const nv=nivelDe(m,no.id);
  if(nv>=no.max || !disponivel(m,no)) return false;
  const c=custoDe(no,nv);
  if(m.ecos<c) return false;
  m.ecos-=c; m.comprados[no.id]=nv+1; salvar(m); return true;
}
/* consolida tudo que o Cofre concede nesta run */
export function bonus(m){
  const r={ hpBonus:0, dmgFlat:0, blockStart:0, dadosExtra:0, rerolls:0, revive:0,
            gravExtra:0, opcoes:0, lamina:0, curinga:0, reliquias:0, eco:0,
            quarta:false, portal:1, pity:0, presagio:0, ecoMult:1, ultimoLance:false,
            polegar:0, gazua:0, rerollEscolhido:false };
  for(const no of NOS){ const n=nivelDe(m,no.id); if(n>0) no.ef(r,n); }
  return r;
}
/* ECOS ganhos numa run (§4.2) */
export function ecosDaRun({andares, elites, chefes, masmorra, venceu}, mult=1){
  let e = andares*2 + elites*3 + chefes*15 + (masmorra-1)*8;
  if(venceu) e+=60;
  return Math.max(1, Math.round(e*mult));
}
