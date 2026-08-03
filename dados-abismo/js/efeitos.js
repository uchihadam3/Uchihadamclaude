/* ========================================================================
   EFEITOS DE HABILIDADE — cada uma tem a SUA assinatura visual, desenhada
   por cima do card do inimigo (§10 impacto legível).
   ===================================================================== */
const SVGNS='http://www.w3.org/2000/svg';
function camada(el){
  const d=document.createElement('div'); d.className='fx'; el.appendChild(d);
  setTimeout(()=>d.remove(), 1100); return d;
}
const rnd=(a,b)=>a+Math.random()*(b-a);

export const EFEITOS = {
  /* CARRASCO */
  decapitar(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-corte"></div><div class="fx-corte b"></div><div class="fx-flash"></div>`; },
  muralha(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-escudo">🛡</div><div class="fx-anel"></div>`; },
  furia(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-onda"></div>`+
      Array.from({length:7},()=>`<i class="fx-lasca" style="--a:${rnd(0,360)}deg;--d:${rnd(30,70)}px"></i>`).join(''); },
  carniceiro(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-corte"></div><div class="fx-corte b"></div><div class="fx-corte c"></div>
      <div class="fx-sangue"></div>`; },
  /* LÂMINA-SOMBRA */
  milcortes(el,n=5){ const d=camada(el);
    d.innerHTML=Array.from({length:Math.min(9,n)},(_,i)=>
      `<i class="fx-risco" style="--i:${i};--r:${rnd(-40,40)}deg;--y:${rnd(10,80)}%"></i>`).join(''); },
  veneno(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-nuvem"></div>`+
      Array.from({length:8},()=>`<i class="fx-bolha" style="--x:${rnd(15,85)}%;--t:${rnd(0,.5)}s"></i>`).join(''); },
  sumir(el){ const d=camada(el); d.innerHTML=`<div class="fx-fumaca"></div>`; },
  enxame(el){ const d=camada(el);
    d.innerHTML=Array.from({length:12},(_,i)=>
      `<i class="fx-risco" style="--i:${i*.6};--r:${rnd(-60,60)}deg;--y:${rnd(5,90)}%"></i>`).join(''); },
  /* ARCANISTA */
  raio(el){ const d=camada(el);
    const svg=`<svg class="fx-raio" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${
      Array.from({length:7},(_,i)=>`${10+i*13},${rnd(5,95)}`).join(' ')}"/></svg>`;
    d.innerHTML=svg+`<div class="fx-flash azul"></div>`; },
  nova(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-gelo"></div>`+
      Array.from({length:6},()=>`<i class="fx-cristal" style="--a:${rnd(0,360)}deg"></i>`).join(''); },
  colapso(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-buraco"></div><div class="fx-onda roxa"></div><div class="fx-flash roxo"></div>`; },
  prisma(el){ const d=camada(el);
    d.innerHTML=Array.from({length:5},()=>`<i class="fx-feixe" style="--a:${rnd(0,180)}deg"></i>`).join(''); },
  /* ORÁCULA */
  tecer(el){ const d=camada(el); d.innerHTML=`<div class="fx-fio"></div><div class="fx-anel ouro"></div>`; },
  julgamento(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-pilar"></div><div class="fx-flash ouro"></div><div class="fx-selo">7</div>`; },
  fio(el){ const d=camada(el); d.innerHTML=`<div class="fx-espelho"></div>`; },
  tapecaria(el){ const d=camada(el);
    d.innerHTML=Array.from({length:6},()=>`<i class="fx-fioc" style="--a:${rnd(0,360)}deg"></i>`).join(''); },
  /* universal */
  respirar(el){ const d=camada(el); d.innerHTML=`<div class="fx-anel calmo"></div>`; },
};
/* ======================= O QUE OS INIMIGOS FAZEM =======================
   Cada intenção tem sua própria assinatura, desenhada no card de quem age. */
export const EFEITOS_INIMIGO = {
  atk(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-garra"></div><div class="fx-flash vermelho"></div>`; },
  atk_multi(el,n=2){ const d=camada(el);
    d.innerHTML=Array.from({length:Math.min(6,n||2)},(_,i)=>
      `<i class="fx-garrinha" style="--i:${i*.14}s;--y:${rnd(15,80)}%"></i>`).join('')
      +`<div class="fx-flash vermelho"></div>`; },
  block(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-guarda">🛡</div><div class="fx-anel"></div>`; },
  buff(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-aura"></div>`+
      Array.from({length:6},()=>`<i class="fx-chama" style="--x:${rnd(10,90)}%;--t:${rnd(0,.4)}s"></i>`).join(''); },
  heal(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-cura">✚</div>`+
      Array.from({length:7},()=>`<i class="fx-mote" style="--x:${rnd(10,90)}%;--t:${rnd(0,.45)}s"></i>`).join(''); },
  curse(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-praga">☠</div><div class="fx-onda roxa"></div>`; },
  debuff(el){ const d=camada(el);
    d.innerHTML=`<div class="fx-mancha"></div><div class="fx-onda roxa"></div>`; },
  summon(el){ const d=camada(el); d.innerHTML=`<div class="fx-fumaca"></div><div class="fx-anel roxa"></div>`; },
};
export function tocarEfeitoInimigo(t, el, n){
  const f = EFEITOS_INIMIGO[t] || EFEITOS_INIMIGO.atk;
  try{ f(el, n); }catch(e){}
}
export function tocarEfeito(id, el, n){
  const f = EFEITOS[id] || EFEITOS.decapitar;
  try{ f(el, n); }catch(e){}
}
