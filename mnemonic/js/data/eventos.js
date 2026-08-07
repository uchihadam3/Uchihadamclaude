/* ========================================================================
   OS EVENTOS — as salas em que não se vira carta nenhuma.

   Todo evento aqui tem que oferecer uma TROCA, não um presente. Se uma das
   opções é sempre a melhor, o evento é um botão "continuar" com texto
   bonito. A regra que usei para escrever: se eu não consigo imaginar uma
   run em que a outra opção é a certa, o evento volta para a gaveta.

   `efeito(run)` mexe na run e devolve uma frase curta do que aconteceu —
   o jogador precisa ver o resultado, não adivinhar.
   ===================================================================== */
export const EVENTOS = [
  { id:'estatua', nome:'A Estátua de Duas Faces',
    txt:'Uma estátua de pedra com dois rostos. Um sorri para o que você lembra; o outro chora pelo que você esqueceu.',
    ops:[
      { txt:'Olhar o rosto que sorri', d:'+1 de Foco máximo',
        ef:r=>{ r.foco++; return 'A pedra aquece. Foco máximo agora é '+r.foco+'.'; } },
      { txt:'Olhar o rosto que chora', d:'+30 moedas, -1 de Foco máximo',
        ef:r=>{ r.moedas+=30; r.foco=Math.max(1,r.foco-1);
          return 'Choveu moeda da órbita vazia. Foco máximo: '+r.foco+'.'; } },
    ] },
  { id:'mercador', nome:'O Mercador Cego',
    txt:'Ele não vê você, mas sabe exatamente quantas moedas você tem.',
    ops:[
      { txt:'Comprar a caixa fechada', d:'-40 moedas, uma relíquia ao acaso',
        ef:r=>{ if(r.moedas<40) return 'Ele ri: não dá para pagar.';
          r.moedas-=40; const g=r._darReliquia();
          return g ? 'Dentro da caixa: '+g.nome+'.' : 'A caixa estava vazia.'; } },
      { txt:'Ir embora sem gastar', d:'Nada muda',
        ef:()=>'Você sai. Ele continua contando as suas moedas.' },
    ] },
  { id:'fonte', nome:'A Fonte de Tinta',
    txt:'Água escura. Quem bebe lembra mais e vive menos.',
    ops:[
      { txt:'Beber', d:'+4 viradas em toda sala, -1 de Foco máximo',
        ef:r=>{ r.bonusViradas+=4; r.foco=Math.max(1,r.foco-1);
          return 'A tinta desce fria. +4 viradas por sala.'; } },
      { txt:'Encher o cantil', d:'+2 viradas em toda sala',
        ef:r=>{ r.bonusViradas+=2; return 'Guardou um gole. +2 viradas por sala.'; } },
    ] },
  { id:'espelho_partido', nome:'O Espelho Partido',
    txt:'Seu reflexo está uma virada atrasado. Ele levanta a mão depois de você.',
    ops:[
      { txt:'Tocar o vidro', d:'Troca uma relíquia sua por outra',
        ef:r=>{ if(!r.reliquias.length) return 'Você não tem nada para trocar.';
          const fora = r.reliquias.pop(); const g = r._darReliquia();
          return 'O reflexo ficou com '+fora+'. Devolveu: '+(g?g.nome:'nada'); } },
      { txt:'Quebrar o resto', d:'+20 moedas',
        ef:r=>{ r.moedas+=20; return 'Entre os cacos, moedas.'; } },
    ] },
  { id:'biblioteca', nome:'A Biblioteca Sem Índice',
    txt:'Milhares de livros. Nenhum com título na lombada.',
    ops:[
      { txt:'Ler a noite inteira', d:'+1 relíquia, -25 moedas',
        ef:r=>{ if(r.moedas<25) return 'A vela custa caro e você não tem.';
          r.moedas-=25; const g=r._darReliquia();
          return g ? 'Achou o livro certo: '+g.nome+'.' : 'Só pó.'; } },
      { txt:'Levar o que dá para carregar', d:'+35 moedas',
        ef:r=>{ r.moedas+=35; return 'Papel velho vale prata lá fora.'; } },
    ] },
  { id:'aposta', nome:'O Jogo do Guarda',
    txt:'Um guarda entediado propõe: cara, você dobra; coroa, você paga.',
    ops:[
      { txt:'Apostar metade das moedas', d:'Dobra ou perde metade',
        ef:r=>{ const m=Math.floor(r.moedas/2);
          if(r.sorte.chance(0.5)){ r.moedas+=m; return 'Cara. Você levou '+m+'.'; }
          r.moedas-=m; return 'Coroa. Lá se foram '+m+'.'; } },
      { txt:'Não jogar', d:'+1 de Foco máximo',
        ef:r=>{ r.foco++; return 'Recusar também é concentração. Foco: '+r.foco+'.'; } },
    ] },
  { id:'altar', nome:'O Altar Vazio',
    txt:'Um altar com um encaixe do tamanho exato de uma relíquia.',
    ops:[
      { txt:'Oferecer uma relíquia', d:'Perde 1 relíquia, +2 de Foco máximo',
        ef:r=>{ if(!r.reliquias.length) return 'Nada para oferecer.';
          const fora=r.reliquias.pop(); r.foco+=2;
          return 'O altar engoliu '+fora+'. Foco máximo: '+r.foco+'.'; } },
      { txt:'Deixar como está', d:'+15 moedas',
        ef:r=>{ r.moedas+=15; return 'Havia troco de outros peregrinos.'; } },
    ] },
  { id:'crianca', nome:'A Criança que Conta',
    txt:'Ela conta em voz alta desde antes de você chegar. Não erra um número.',
    ops:[
      { txt:'Contar junto', d:'+3 viradas em toda sala',
        ef:r=>{ r.bonusViradas+=3; return 'Você pegou o ritmo dela.'; } },
      { txt:'Mandar calar', d:'+1 relíquia, -2 viradas em toda sala',
        ef:r=>{ r.bonusViradas-=2; const g=r._darReliquia();
          return 'O silêncio tinha algo dentro: '+(g?g.nome:'nada')+'.'; } },
    ] },
];
export const EVENTO_POR_ID = Object.fromEntries(EVENTOS.map(e=>[e.id,e]));
