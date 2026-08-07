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

  /* ═══════════════ o corpo e o fôlego ═══════════════ */
  { id:'poco', nome:'O Poço Sem Fundo',
    txt:'Você joga uma moeda e não ouve ela cair. Alguém, lá embaixo, está juntando.',
    ops:[
      { txt:'Jogar tudo o que tem', d:'Perde as moedas, +1 de Foco a cada 40',
        ef:r=>{ const g=Math.floor(r.moedas/40); r.moedas=0; r.foco+=g;
          return g ? 'O poço devolveu fôlego: +'+g+' de Foco.' : 'O poço engoliu e não devolveu nada.'; } },
      { txt:'Jogar uma moeda só', d:'-1 moeda, +2 viradas em toda sala',
        ef:r=>{ r.moedas=Math.max(0,r.moedas-1); r.bonusViradas+=2;
          return 'Um tilintar longe. +2 viradas por sala.'; } },
    ] },
  { id:'lamparina', nome:'A Lamparina do Vigia',
    txt:'Um vigia velho oferece a lamparina dele. "Ilumina o começo, mas queima rápido."',
    ops:[
      { txt:'Aceitar a lamparina', d:'Espia 2 cartas a mais no início de cada sala',
        ef:r=>{ r.espiaExtra=(r.espiaExtra||0)+2; return 'A chama fica com você. +2 cartas espiadas.'; } },
      { txt:'Pedir o óleo em vez dela', d:'+25 moedas',
        ef:r=>{ r.moedas+=25; return 'Ele entrega o vidro e guarda a luz.'; } },
    ] },
  { id:'ferreiro', nome:'O Ferreiro Surdo',
    txt:'Ele bate no metal sem olhar. Aponta para as suas relíquias e depois para a bigorna.',
    ops:[
      { txt:'Deixar ele forjar', d:'Perde uma relíquia ao acaso, ganha uma lendária',
        ef:r=>{ if(!r.reliquias.length) return 'Ele encolhe os ombros: nada para bater.';
          const i=r.rng.int(0,r.reliquias.length-1); r.reliquias.splice(i,1);
          const nova=r._darReliquia('lendaria');
          return nova ? 'O martelo desce. Virou '+nova.nome+'.' : 'Nada saiu da bigorna.'; } },
      { txt:'Só afiar o que já tem', d:'+4 de pontos na base de toda carta',
        ef:r=>{ r.baseExtra=(r.baseExtra||0)+4; return 'Cada carta corta um pouco mais fundo.'; } },
    ] },
  { id:'ponte', nome:'A Ponte de Corda',
    txt:'Ela balança. Do outro lado há um baú; do lado de cá, o caminho seguro.',
    ops:[
      { txt:'Atravessar', d:'-1 de Foco máximo, uma relíquia rara',
        ef:r=>{ r.foco=Math.max(1,r.foco-1); const g=r._darReliquia('rara');
          return g ? 'Você chega tremendo, com '+g.nome+'.' : 'O baú estava vazio.'; } },
      { txt:'Dar a volta', d:'+3 viradas em toda sala',
        ef:r=>{ r.bonusViradas+=3; return 'O caminho longo ensinou o terreno. +3 viradas.'; } },
    ] },

  /* ═══════════════ a memória ═══════════════ */
  { id:'escriba', nome:'O Escriba que Copia Tudo',
    txt:'Ele anota cada carta que você vira. Diz que empresta as anotações — por um preço em atenção.',
    ops:[
      { txt:'Ler as anotações', d:'Carta revelada dura +2 tentativas',
        ef:r=>{ r.memoriaExtra=(r.memoriaExtra||0)+2; return 'A tinta ainda está fresca. A marca dura mais.'; } },
      { txt:'Queimar o caderno', d:'+1 de Foco máximo',
        ef:r=>{ r.foco++; return 'Sem cola, a cabeça trabalha melhor. Foco: '+r.foco+'.'; } },
    ] },
  { id:'sonhador', nome:'O Sonhador',
    txt:'Dorme de pé, no meio do corredor. Sonha com o tabuleiro da próxima sala.',
    ops:[
      { txt:'Acordar e perguntar', d:'+2 cartas espiadas por sala',
        ef:r=>{ r.espiaExtra=(r.espiaExtra||0)+2; return 'Ele murmura duas posições. Você anota.'; } },
      { txt:'Deixar dormindo', d:'+18 moedas do bolso dele',
        ef:r=>{ r.moedas+=18; return 'Você pega as moedas. Ele sorri dormindo.'; } },
    ] },
  { id:'gemeas', nome:'As Irmãs Gêmeas',
    txt:'Duas iguais. Uma sempre mente, a outra sempre diz a verdade — e elas trocaram de roupa.',
    ops:[
      { txt:'Perguntar para as duas', d:'-12 moedas, +2 cartas espiadas por sala',
        ef:r=>{ if(r.moedas<12) return 'Elas exigem pagamento adiantado.';
          r.moedas-=12; r.espiaExtra=(r.espiaExtra||0)+2;
          return 'Cruzando as respostas, você aprende a olhar.'; } },
      { txt:'Não perguntar nada', d:'+1 de Foco máximo',
        ef:r=>{ r.foco++; return 'Duvidar de tudo cansa menos. Foco: '+r.foco+'.'; } },
    ] },
  { id:'labirinto', nome:'O Corredor que Volta',
    txt:'Você anda cinco minutos e chega no mesmo lugar. Há uma marca de giz que você não fez.',
    ops:[
      { txt:'Seguir a marca', d:'Uma relíquia comum de graça',
        ef:r=>{ const g=r._darReliquia('comum');
          return g ? 'A marca levava a um nicho: '+g.nome+'.' : 'O nicho estava vazio.'; } },
      { txt:'Apagar e fazer a sua', d:'+3 de pontos na base de toda carta',
        ef:r=>{ r.baseExtra=(r.baseExtra||0)+3; return 'Você aprende a marcar o que importa.'; } },
    ] },

  /* ═══════════════ o dinheiro ═══════════════ */
  { id:'cambista', nome:'O Cambista',
    txt:'Uma balança de dois pratos. Num, moedas; no outro, tempo.',
    ops:[
      { txt:'Vender tempo por moeda', d:'-2 viradas por sala, +50 moedas',
        ef:r=>{ r.bonusViradas-=2; r.moedas+=50; return 'O prato pende para o ouro. -2 viradas.'; } },
      { txt:'Comprar tempo com moeda', d:'-50 moedas, +4 viradas por sala',
        ef:r=>{ if(r.moedas<50) return 'A balança nem se mexe: falta peso.';
          r.moedas-=50; r.bonusViradas+=4; return 'O prato sobe. +4 viradas por sala.'; } },
    ] },
  { id:'mendigo', nome:'O Mendigo de Cartas',
    txt:'Pede uma moeda. Tem um baralho velho no colo, e conhece cada carta pelo cheiro.',
    ops:[
      { txt:'Dar tudo o que tem', d:'Perde as moedas, ganha uma relíquia rara',
        ef:r=>{ if(r.moedas<10) return 'Ele recusa: "guarde, você precisa mais."';
          r.moedas=0; const g=r._darReliquia('rara');
          return g ? 'Ele tira do bolso: '+g.nome+'.' : 'Ele só agradece.'; } },
      { txt:'Dar uma moeda', d:'-1 moeda, +1 carta espiada por sala',
        ef:r=>{ r.moedas=Math.max(0,r.moedas-1); r.espiaExtra=(r.espiaExtra||0)+1;
          return 'Ele ensina um jeito de olhar de lado.'; } },
    ] },
  { id:'copos', nome:'A Mesa de Aposta',
    txt:'Três copos, uma pedra. O dono já sabe que você vai jogar.',
    ops:[
      { txt:'Apostar 40 moedas', d:'Dobra ou perde',
        ef:r=>{ if(r.moedas<40) return 'Sem moeda não há aposta.';
          const ganhou = r._sem('ap').int(0,2)===0;
          if(ganhou){ r.moedas+=40; return 'A pedra estava ali. +40 moedas.'; }
          r.moedas-=40; return 'Copo vazio. -40 moedas.'; } },
      { txt:'Assistir e aprender', d:'+2 de pontos na base de toda carta',
        ef:r=>{ r.baseExtra=(r.baseExtra||0)+2; return 'Você aprende a olhar as mãos, não os copos.'; } },
    ] },
  { id:'cobrador', nome:'O Cobrador',
    txt:'Encapuzado, com um livro-caixa. Diz que você deve por cada carta que esqueceu.',
    ops:[
      { txt:'Pagar a dívida', d:'-35 moedas, +1 de Foco máximo',
        ef:r=>{ if(r.moedas<35) return 'Ele anota o seu nome e vai embora.';
          r.moedas-=35; r.foco++; return 'Quitado. Foco máximo: '+r.foco+'.'; } },
      { txt:'Fugir', d:'+2 viradas por sala, perde uma relíquia',
        ef:r=>{ r.bonusViradas+=2;
          if(r.reliquias.length){ const i=r.rng.int(0,r.reliquias.length-1);
            r.reliquias.splice(i,1);
            return 'Correndo, você deixa cair uma relíquia.'; }
          return 'Você corre. Não tinha nada a perder.'; } },
    ] },

  /* ═══════════════ o tabuleiro ═══════════════ */
  { id:'jardineiro', nome:'O Jardineiro de Pedras',
    txt:'Ele planta cartas no chão e diz que algumas nascem douradas.',
    ops:[
      { txt:'Plantar uma semente', d:'Uma carta de Ouro a mais em cada sala',
        ef:r=>{ r.semeaOuro=(r.semeaOuro||0)+1; return 'Algo dourado vai brotar em cada tabuleiro.'; } },
      { txt:'Comer a semente', d:'+22 moedas',
        ef:r=>{ r.moedas+=22; return 'Tinha gosto de metal — e valia metal.'; } },
    ] },
  { id:'relojoeira', nome:'A Relojoeira',
    txt:'Ela abre um relógio e mostra a engrenagem que falta. "Posso tirar de outro lugar."',
    ops:[
      { txt:'Deixar consertar', d:'Toda Bomba nasce com o dobro de pavio',
        ef:r=>{ r.pavioDobro=true; return 'O tique-taque fica mais lento.'; } },
      { txt:'Levar a engrenagem solta', d:'+2 viradas por sala',
        ef:r=>{ r.bonusViradas+=2; return 'Uma peça a mais no bolso. +2 viradas.'; } },
    ] },
  { id:'pintor', nome:'O Pintor de Versos',
    txt:'Ele repinta o verso das cartas. "Assim ninguém reconhece o baralho — nem você."',
    ops:[
      { txt:'Deixar repintar', d:'+0,4 de multiplicador, -1 carta espiada',
        ef:r=>{ r.multExtra=(r.multExtra||0)+0.4; r.espiaExtra=(r.espiaExtra||0)-1;
          return 'O baralho fica lindo e mais difícil.'; } },
      { txt:'Comprar a tinta', d:'+20 moedas',
        ef:r=>{ r.moedas+=20; return 'Você revende a tinta ali mesmo.'; } },
    ] },
  { id:'colecionador', nome:'O Colecionador',
    txt:'Ele tem uma vitrine com uma peça faltando, e olha para as suas relíquias.',
    ops:[
      { txt:'Vender uma relíquia', d:'-1 relíquia, +60 moedas',
        ef:r=>{ if(!r.reliquias.length) return 'Ele olha suas mãos vazias e suspira.';
          const i=r.rng.int(0,r.reliquias.length-1); r.reliquias.splice(i,1); r.moedas+=60;
          return 'A vitrine fica completa. Você fica com 60 moedas.'; } },
      { txt:'Trocar por duas comuns', d:'-1 relíquia, +2 comuns',
        ef:r=>{ if(!r.reliquias.length) return 'Nada a trocar.';
          const i=r.rng.int(0,r.reliquias.length-1); r.reliquias.splice(i,1);
          const a=r._darReliquia('comum'), b=r._darReliquia('comum');
          return 'Saíram duas: '+[a&&a.nome,b&&b.nome].filter(Boolean).join(' e ')+'.'; } },
    ] },

  /* ═══════════════ o risco ═══════════════ */
  { id:'altar_sal', nome:'O Altar de Sal',
    txt:'Uma tigela vazia e uma faca cega. O sal já está manchado de outras mãos.',
    ops:[
      { txt:'Oferecer fôlego', d:'-1 de Foco máximo, +0,8 de multiplicador',
        ef:r=>{ r.foco=Math.max(1,r.foco-1); r.multExtra=(r.multExtra||0)+0.8;
          return 'A tigela absorve. Cada acerto vale mais.'; } },
      { txt:'Oferecer moeda', d:'-30 moedas, +0,3 de multiplicador',
        ef:r=>{ if(r.moedas<30) return 'O sal recusa promessa.';
          r.moedas-=30; r.multExtra=(r.multExtra||0)+0.3;
          return 'O metal some no sal.'; } },
    ] },
  { id:'porta_dupla', nome:'As Duas Portas',
    txt:'Uma está destrancada. A outra tem uma fechadura sem buraco de chave.',
    ops:[
      { txt:'A porta destrancada', d:'+15 moedas',
        ef:r=>{ r.moedas+=15; return 'Um corredor curto e um bolso esquecido.'; } },
      { txt:'Arrombar a outra', d:'-1 de Foco máximo, uma relíquia rara',
        ef:r=>{ r.foco=Math.max(1,r.foco-1); const g=r._darReliquia('rara');
          return g ? 'A porta cede, e o ombro também: '+g.nome+'.' : 'Uma sala vazia.'; } },
    ] },
  { id:'coruja_velha', nome:'A Coruja Velha',
    txt:'Ela pisca uma vez só. Quem entende, entende.',
    ops:[
      { txt:'Piscar de volta', d:'+2 cartas espiadas por sala',
        ef:r=>{ r.espiaExtra=(r.espiaExtra||0)+2; return 'Ela vira a cabeça e mostra onde olhar.'; } },
      { txt:'Encarar sem piscar', d:'+1 de Foco máximo',
        ef:r=>{ r.foco++; return 'Ela respeita. Foco máximo: '+r.foco+'.'; } },
    ] },
  { id:'nevoa', nome:'A Névoa que Lembra',
    txt:'Entra por uma porta e sai pela outra, levando pedaços do que você acabou de ver.',
    ops:[
      { txt:'Atravessar rápido', d:'-1 carta espiada, +35 moedas',
        ef:r=>{ r.espiaExtra=(r.espiaExtra||0)-1; r.moedas+=35;
          return 'Do outro lado, moedas no chão e um buraco na cabeça.'; } },
      { txt:'Esperar passar', d:'Nada se ganha, nada se perde',
        ef:()=>'Você senta e espera. A névoa vai embora sozinha.' },
    ] },
];
export const EVENTO_POR_ID = Object.fromEntries(EVENTOS.map(e=>[e.id,e]));
