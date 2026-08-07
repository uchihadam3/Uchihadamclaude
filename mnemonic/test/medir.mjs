/* ========================================================================
   MEDIR — a régua do balanceamento.   node mnemonic/test/medir.mjs

   O teste diz se a regra funciona. Este arquivo diz se o jogo é JOGÁVEL, que
   é outra pergunta e não se responde no olho. Ele solta o bot de memória
   perfeita em centenas de runs e imprime, sala por sala, o que aconteceu:
   quanto da meta foi feito, quantas viradas sobraram e por que morreu.

   O que estou procurando na tabela:
     · "pts/meta" perto de 1,0 nas salas iniciais e caindo devagar. Se
       despenca, a meta cresce mais rápido que o que dá para tirar do
       tabuleiro, e a run trava sempre no mesmo lugar.
     · o motivo da morte variando. Se for sempre "viradas", o tempo é que
       está curto; se for sempre "meta", é a conta que está alta.
   ===================================================================== */
import { Run, planoDaSala, SALAS, MUNDOS, COMBATE } from '../js/engine/run.js';
import { CLASSES } from '../js/data/classes.js';
import { jogarSala } from './bot.mjs';
import { pontosPerfeitos, pontosEsperados } from '../js/engine/tabuleiro.js';

const N = Number(process.argv[2] || 12);
const porPasso = new Map();      // passo -> amostras
const mortes = {};
let vitorias = 0, runs = 0, somaSalas = 0;

function amostra(passo, o){
  if(!porPasso.has(passo)) porPasso.set(passo, []);
  porPasso.get(passo).push(o);
}

for(const cl of Object.keys(CLASSES)){
  for(let i=0;i<N;i++){
    const r = new Run({ semente:'medir'+i, classe:cl });
    let g = 0;
    while(!r.acabou() && g++ < 900){
      if(r.aguardandoPremio){
        const p = r.premios();
        const ordem = { lendaria:0, rara:1, comum:2 };
        const alvo = [...p].sort((x,y)=>ordem[x.r]-ordem[y.r])[0];
        if(alvo) r.ganharReliquia(alvo.id);
        r.passar(); continue;
      }
      const t = r.tipoSala();
      const passo = r.mundo*SALAS.length + r.indice;
      if(COMBATE.has(t)){
        if(!r.entrar()) break;
        const s = r.sala;
        jogarSala(r);
        amostra(passo, { pts:s.pontos, meta:s.meta, fim:s.fim,
                         turno:s.turno, max:s.viradasMax,
                         limpou: s.acertos/s.pares,
                         foco:s.foco, pares:s.pares, tipo:t,
                         combo:s.maiorCombo, erros:s.erros });
        if(s.fim==='derrota'){
          const m = s.foco<=0 ? 'foco' : s.viradas<=0 ? 'viradas' : 'tabuleiro';
          mortes[m] = (mortes[m]||0)+1;
        }
        continue;
      }
      if(t==='evento'||t==='descanso'){ if(!r.escolher(0).ok) r.passar(); continue; }
      if(t==='loja'){
        for(let k=0;k<5;k++){
          const it = r.loja().filter(x=>!x.vendido && x.preco<=r.moedas)
                             .sort((a,b)=>b.preco-a.preco)[0];
          if(!it || !r.comprar(it.id).ok) break;
        }
        r.passar(); continue;
      }
      if(t==='tesouro'){
        const p = r.premios();
        if(p[0]) r.ganharReliquia(p[0].id);
        r.passar(); continue;
      }
      r.passar();
    }
    runs++; somaSalas += r.estatisticas.salas;
    if(r.venceu) vitorias++;
  }
}

console.log(`\n${runs} runs · ${Object.keys(CLASSES).length} classes × ${N} sementes`);
console.log(`salas em média: ${(somaSalas/runs).toFixed(1)} de ${MUNDOS*SALAS.length}`
  + ` · vitórias: ${vitorias}/${runs}`);
console.log('mortes por:', mortes);

console.log('\npasso tipo     pares  meta   pts(méd) pts/meta  viradas  limpou  combo  vit%');
const passos = [...porPasso.keys()].sort((a,b)=>a-b);
for(const p of passos){
  const a = porPasso.get(p);
  if(a.length < 3) continue;
  const med = k => a.reduce((s,x)=>s+x[k],0)/a.length;
  const vit = a.filter(x=>x.fim==='vitoria').length/a.length;
  const razao = med('pts')/a[0].meta;
  const barra = razao>=1 ? '' : razao<0.6 ? '  ←←' : razao<0.85 ? '  ←' : '';
  console.log(
    String(p).padStart(4) + ' ' + a[0].tipo.padEnd(8)
    + String(a[0].pares).padStart(5)
    + String(a[0].meta).padStart(7)
    + String(Math.round(med('pts'))).padStart(9)
    + razao.toFixed(2).padStart(9)
    + (med('turno').toFixed(0)+'/'+a[0].max).padStart(9)
    + (Math.round(med('limpou')*100)+'%').padStart(8)
    + med('combo').toFixed(1).padStart(7)
    + (Math.round(vit*100)+'%').padStart(6) + barra);
}

console.log('\nreferência das metas (o que a fórmula acha que dá para tirar):');
console.log('pares   perfeito  esperado   meta(combate)  meta/esperado');
for(const pr of [6,10,14,18,22,26,30]){
  const plano = [...Array(MUNDOS*SALAS.length).keys()]
    .map(k=>({ k, p:planoDaSala(Math.floor(k/SALAS.length), k%SALAS.length, 'combate') }))
    .find(x=>x.p.pares>=pr);
  const meta = plano ? plano.p.meta : 0;
  console.log(String(pr).padStart(5) + String(pontosPerfeitos(pr)).padStart(10)
    + String(pontosEsperados(pr)).padStart(10) + String(meta).padStart(15)
    + (meta/pontosEsperados(pr)).toFixed(2).padStart(15));
}
