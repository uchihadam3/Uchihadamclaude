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

/* ---------------- A ÁRVORE ---------------- */
/* custo cresce por nível; req = nós que precisam estar comprados; max = níveis */
export const RAMOS = {
  osso: { nome:'OSSO', sub:'poder bruto', cor:'#e8e2d0', icone:'🦴' },
  veu:  { nome:'VÉU',  sub:'opções',      cor:'#9a7fd8', icone:'🕯️' },
  coroa:{ nome:'COROA',sub:'maestria',    cor:'#ffd24a', icone:'👑' },
};
export const NOS = [
  /* ===== OSSO ===== */
  {id:'vitalidade', ramo:'osso', nome:'Medula',        max:5, custo:[3,6,11,18,28],
   txt:n=>`+${n*10} de HP inicial`, ef:(r,n)=>{ r.hpBonus+=n*10; }},
  {id:'punho',      ramo:'osso', nome:'Punho de Ferro',max:4, custo:[5,10,18,30],
   txt:n=>`+${n} de dano em todo golpe`, ef:(r,n)=>{ r.dmgFlat+=n; }},
  {id:'couro',      ramo:'osso', nome:'Couro Curtido', max:4, custo:[4,9,16,26],
   txt:n=>`Começa cada combate com ${n*4} de bloqueio`, ef:(r,n)=>{ r.blockStart+=n*4; }},
  {id:'sexto',      ramo:'osso', nome:'Sexto Dado',    max:2, custo:[14,34], req:['vitalidade'],
   txt:n=>`+${n} dado na Bolsa inicial`, ef:(r,n)=>{ r.dadosExtra+=n; }},
  {id:'mao_firme',  ramo:'osso', nome:'Mão Firme',     max:3, custo:[7,15,27],
   txt:n=>`+${n} re-rolagem por combate`, ef:(r,n)=>{ r.rerolls+=n; }},
  {id:'segundo_folego',ramo:'osso',nome:'Segundo Fôlego',max:2,custo:[20,45],req:['couro'],
   txt:n=>`Ao cair a 0 de HP, revive com ${n*25}% do HP (1×/run)`, ef:(r,n)=>{ r.revive=n*0.25; }},
  /* ===== VÉU ===== */
  {id:'forja',      ramo:'veu', nome:'Forja Antiga',  max:3, custo:[6,13,24],
   txt:n=>`Toda gravação melhora ${n} face${n>1?'s':''} extra`, ef:(r,n)=>{ r.gravExtra+=n; }},
  {id:'oferta',     ramo:'veu', nome:'Oferta Ampla',  max:2, custo:[9,20],
   txt:n=>`${3+n} opções de recompensa por andar`, ef:(r,n)=>{ r.opcoes+=n; }},
  {id:'lapidar',    ramo:'veu', nome:'Lapidar',       max:3, custo:[8,17,30],
   txt:n=>`Começa com ${n} face${n>1?'s':''} ⚔ Lâmina (abre o Selo ⚔ dos inimigos)`, ef:(r,n)=>{ r.lamina+=n; }},
  {id:'curinga',    ramo:'veu', nome:'Fio Solto',     max:2, custo:[16,38], req:['lapidar'],
   txt:n=>`Começa com ${n} ◈ Curinga (assume o valor que a fechadura pedir)`, ef:(r,n)=>{ r.curinga+=n; }},
  {id:'polegar',    ramo:'veu', nome:'Polegar Torto', max:2, custo:[11,26],
   txt:n=>`${n}×/turno: empurra um dado em ±1 (abre fechadura de soma/paridade)`,
   ef:(r,n)=>{ r.polegar+=n; }},
  {id:'relicario',  ramo:'veu', nome:'Relicário',     max:3, custo:[7,16,29],
   txt:n=>`Começa a run com ${n} relíquia${n>1?'s':''} comum`, ef:(r,n)=>{ r.reliquias+=n; }},
  {id:'ecoante',    ramo:'veu', nome:'Ecoante',       max:2, custo:[18,40], req:['forja'],
   txt:n=>`Começa com ${n} face${n>1?'s':''} ⟳ Eco`, ef:(r,n)=>{ r.eco+=n; }},
  /* ===== COROA ===== */
  {id:'talento',    ramo:'coroa', nome:'Talento',      max:1, custo:[12],
   txt:()=>`Desbloqueia a 4ª habilidade de cada classe`, ef:(r)=>{ r.quarta=true; }},
  {id:'portal',     ramo:'coroa', nome:'Portal',       max:1, custo:[25], req:['talento'],
   txt:()=>`Pode começar a run na Masmorra 2`, ef:(r)=>{ r.portal=2; }},
  {id:'sorte',      ramo:'coroa', nome:'Sorte Roubada',max:3, custo:[9,19,33],
   txt:n=>`Pena de Sorte dispara com ${3-n} rolagem${3-n>1?'s':''} ruim`, ef:(r,n)=>{ r.pity=n; }},
  {id:'presagio',   ramo:'coroa', nome:'Presságio',    max:2, custo:[13,29],
   txt:n=>`Vê a intenção de ${n} turno${n>1?'s':''} à frente`, ef:(r,n)=>{ r.presagio+=n; }},
  {id:'ganancia',   ramo:'coroa', nome:'Ganância',     max:3, custo:[6,14,25],
   txt:n=>`+${n*25}% de Ecos ganhos`, ef:(r,n)=>{ r.ecoMult+=n*0.25; }},
  {id:'gazua',      ramo:'coroa', nome:'Gazua',        max:2, custo:[15,32],
   txt:n=>`${n}×/combate: ARROMBA a fechadura de um inimigo`, ef:(r,n)=>{ r.gazua+=n; }},
  {id:'ultimo',     ramo:'coroa', nome:'Último Lance', max:1, custo:[40], req:['presagio','sorte'],
   txt:()=>`1×/combate: re-rola TODOS os dados de graça`, ef:(r)=>{ r.ultimoLance=true; }},
];
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
            polegar:0, gazua:0 };
  for(const no of NOS){ const n=nivelDe(m,no.id); if(n>0) no.ef(r,n); }
  return r;
}
/* ECOS ganhos numa run (§4.2) */
export function ecosDaRun({andares, elites, chefes, masmorra, venceu}, mult=1){
  let e = andares*2 + elites*3 + chefes*15 + (masmorra-1)*8;
  if(venceu) e+=60;
  return Math.max(1, Math.round(e*mult));
}
