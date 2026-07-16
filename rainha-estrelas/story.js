/* ========================================================================
   RAINHA DAS ESTRELAS — O CORAÇÃO DO JOGO: a história.
   Personagens · baralho narrativo (ramificado) · capítulos · relíquias · finais.
   Efeitos: e:[Templo, Povo, Frota, Éter, Luz do Coração]  (deltas)
   ===================================================================== */
const STORY = (() => {

  /* ---------- os quatro poderes + o sol ---------- */
  const RESOURCES = [
    { id:'temple', name:'Templo', ico:'temple', c:'#ffcf6b', glow:'rgba(255,207,107,.5)',
      low:'Os Videntes clamam que você abandonou o Sol.', high:'O Culto do Sol é forte demais — teme-se uma teocracia.' },
    { id:'povo',   name:'Povo',   ico:'povo',   c:'#68e0c8', glow:'rgba(104,224,200,.5)',
      low:'O povo passa fome e frio no escuro que avança.', high:'O povo o ama tanto que já não teme a coroa.' },
    { id:'frota',  name:'Frota',  ico:'frota',  c:'#7aa8ff', glow:'rgba(122,168,255,.5)',
      low:'A Frota está esfarrapada; nada protege os mundos.', high:'A Frota é poderosa demais e sonha com um trono próprio.' },
    { id:'eter',   name:'Éter',   ico:'eter',   c:'#c98bff', glow:'rgba(201,139,255,.5)',
      low:'Os cofres de Éter secaram; as luzes se apagam.', high:'Éter demais desperta a ganância das Casas.' },
  ];

  /* ---------- personagens ---------- */
  const CHARS = {
    rainha:{ name:'Vésper', role:'A Imperatriz', bio:'Você. Coroada jovem demais para um trono à beira da noite.',
      spec:{skin:'#e6c2a0',hair:'#241338',hair2:'#160a26',eyes:'#8a5ad0',garb:'#3a2456',garb2:'#241338',accent:'#f4c66a',style:'long',head:'crown',lips:'#a05a70',seed:1} },
    liora:{ name:'Liora, a Décima', role:'A Voz na Coroa', bio:'A imperatriz anterior. Deveria estar morta. Fala dentro do ouro da coroa.',
      spec:{skin:'#cdbbd8',hair:'#e2ddf2',hair2:'#c8c0e0',eyes:'#c98bff',garb:'#2a1a4a',garb2:'#160a30',accent:'#c98bff',style:'long',head:'crown',aug:true,seed:2} },
    sethis:{ name:'Oráculo Sethis', role:'Vidente-Mor do Sol', bio:'Guardião do Culto do Sol Eterno. Crê que só o sangue de uma rainha reacende a estrela.',
      spec:{skin:'#c9a884',hair:'#ece6d2',eyes:'#6a4a2a',garb:'#5a3b8a',garb2:'#3a2560',accent:'#ffcf6b',style:'short',head:'mitre',brow:1,seed:3} },
    rhea:{ name:'Almirante Rhea Kald', role:'Punho da Frota', bio:'Comanda os mundos-navio. Não quer salvar a estrela — quer fugir dela.',
      spec:{skin:'#875436',hair:'#161010',eyes:'#3a2a1a',garb:'#16203a',garb2:'#0e1830',accent:'#7aa8ff',style:'short',head:'helm',seed:4} },
    io:{ name:'Mestra Îo Vantor', role:'A Herege', bio:'Cientista banida pelo Culto. Jura que a razão, e não a prece, pode reacender o Coração.',
      spec:{skin:'#e0b48c',hair:'#5a2a1a',hair2:'#3a1810',eyes:'#68e0c8',garb:'#123030',garb2:'#0a2020',accent:'#68e0c8',style:'long',head:'circlet',aug:true,seed:5} },
    vashka:{ name:'Duquesa Vashka Corvin', role:'Senhora das Casas', bio:'A mais rica e a mais faminta das nobres. Sorri como quem já mediu seu pescoço.',
      spec:{skin:'#e8cbb0',hair:'#0a0808',hair2:'#050404',eyes:'#3a1a1a',garb:'#3a0a1a',garb2:'#5a0a24',accent:'#f4c66a',style:'long',head:'circlet',lips:'#a03050',brow:1,seed:6} },
    mira:{ name:'Mira', role:'Arauta dos Mundos Famintos', bio:'Filha do povo esquecido dos confins. Sua voz é a fome de bilhões.',
      spec:{skin:'#b07a4a',hair:'#241810',eyes:'#2a1a0a',garb:'#3a2a14',accent:'#68e0c8',style:'short',seed:7} },
    ciro:{ name:'Lorde Ciro', role:'O Consorte', bio:'Casado com você por um tratado. O que crescerá entre vocês — amor ou punhal — ainda não se sabe.',
      spec:{skin:'#d8b088',hair:'#3a2414',hair2:'#241810',eyes:'#4a6a8a',garb:'#1a2a4a',accent:'#bfe3ff',style:'long',head:'circlet',seed:8} },
    caeus:{ name:'Caeus, o Andarilho', role:'Aquele que Veio do Escuro', bio:'Chegou de além do Império, de onde nenhuma estrela brilha. Sabe o que devora os sóis.',
      spec:{skin:'#9a7a5a',hair:'#141414',hair2:'#0a0a0a',eyes:'#c98bff',garb:'#231a10',garb2:'#141008',accent:'#8a7a5a',style:'long',head:'hood',aug:true,brow:1,seed:9} },
    heir:{ name:'Herdeiro', role:'O Sangue da Coroa', bio:'A próxima a carregar o peso do ouro e da noite.',
      spec:{skin:'#e6c2a0',hair:'#241338',eyes:'#8a5ad0',garb:'#3a2456',accent:'#f4c66a',style:'short',head:'circlet',seed:10} },
  };

  /* ---------- relíquias ---------- */
  const RELICS = {
    diadema:{ name:'A Coroa Estelar', kind:'ring', desc:'O diadema imperial. Dentro dele dormem — ou sussurram — todas as imperatrizes que houve.' },
    estilhaco:{ name:'Estilhaço do Coração', kind:'shard', desc:'Um fragmento vivo da estrela, colhido por Îo. Pulsa, quente, contra a palma da mão.' },
    carta:{ name:'A Confissão de Liora', kind:'letter', desc:'Uma carta lacrada que a Décima escreveu antes de "morrer". A verdade sobre o Rito.' },
    lamina:{ name:'Lâmina do Ocaso', kind:'blade', desc:'A adaga sagrada do Rito. Sedenta pelo sangue de quem usa a coroa.' },
    bussola:{ name:'Bússola de Caeus', kind:'compass', desc:'Aponta não para o norte, mas para o único caminho que atravessa o Escuro.' },
    calice:{ name:'Cálice do Sol', kind:'chalice', desc:'Relíquia do Culto. Dizem que já conteve a luz da estrela em seus primeiros dias.' },
    mascara:{ name:'Máscara de Corvin', kind:'mask', desc:'A face que Vashka veste na corte. Quem a possui conhece seus segredos.' },
    chave:{ name:'Chave da Cripta', kind:'key', desc:'Abre a Cripta das Imperatrizes, sob o trono, onde a coroa foi forjada.' },
    semente:{ name:'A Semente-Gênese', kind:'seed', desc:'Um jardim inteiro, um mundo inteiro, dormindo numa cápsula. A esperança da Frota.' },
    olho:{ name:'O Olho do Oráculo', kind:'eye', desc:'Vê o que virá. E o que virá, Sethis não quis contar a ninguém.' },
  };

  /* ---------- capítulos (para a Crônica) ---------- */
  const CHAPTERS = [
    { id:'coroacao', n:'I',  title:'A Coroação', desc:'Uma coroa fria pousa numa cabeça jovem, sob um sol que se apaga.' },
    { id:'ocaso',    n:'II', title:'O Ocaso Anunciado', desc:'A morte da estrela deixa de ser rumor. O Império escolhe seus lados.' },
    { id:'voz',      n:'III',title:'A Voz na Coroa', desc:'Quem sussurra no ouro? E por que toda imperatriz morre tão jovem?' },
    { id:'coracao',  n:'IV', title:'O Segredo do Coração', desc:'Um andarilho traz a verdade sobre o que devora os sóis — e o preço de cada saída.' },
    { id:'escolha',  n:'V',  title:'A Escolha Final', desc:'Não há como salvar tudo. Só resta escolher o que perder.' },
  ];

  /* ---------- sussurros da coroa (Liora), avulsos por clima ---------- */
  const WHISPERS = {
    generic:[ 'Reine com a mão fechada, criança. Um punho aberto derrama impérios.',
      'Toda escolha mata algo. A arte é escolher o que merece morrer.',
      'Eu já sentei onde você senta. O trono lembra de mim.',
      'Não confie no que sorri na corte. Confie no que treme.' ],
    templeLow:['Os Videntes o vigiam. Devolva-lhes uma migalha de fé, ou eles a tomarão inteira.'],
    povoLow:['O povo esquece o pão de ontem, mas nunca a fome de hoje.'],
    frotaLow:['Sem a Frota, os confins caem no escuro um a um, e ninguém ouve.'],
    eterLow:['Sem Éter, até a coroa é só metal frio. Encha os cofres.'],
    starLow:['O Coração esfria. Você o sente? Eu sinto. Sempre senti.'],
  };

  /* ==================================================================
     O BARALHO — as cartas
     ================================================================== */
  const CARDS = [];
  const add = (c)=>{ CARDS.push(c); return c; };

  /* --------- CAPÍTULO I — A CORAÇÃO (cadeia roteirizada) --------- */
  add({ id:'intro1', who:'sethis', scene:'cathedral', ch:1, arc:'coroacao', story:true, start:true,
    text:'"Ajoelhe-se, Vésper." O ouro toca sua fronte e pesa como um mundo. "Sob este Sol moribundo, jura reinar até que ele se apague — ou você se apague antes?"',
    L:{ t:'"Juro reinar."', e:[6,4,2,0,0], to:'intro2', beat:['coroacao','Você aceitou a coroa sob o Sol moribundo.'] },
    R:{ t:'"Juro salvá-lo."', e:[10,2,0,-4,0], to:'intro2', set:['prometeuSol'], beat:['coroacao','Você jurou, diante do Culto, salvar a estrela moribunda.'] } });

  add({ id:'intro2', who:'ciro', scene:'throne', ch:1, arc:'coroacao', story:true,
    text:'Lorde Ciro, seu marido por tratado, ajoelha-se um passo atrás. "Não me casei com você por amor, majestade. Mas se me der uma razão, aprendo." Seus olhos são cautelosos, não frios.',
    L:{ t:'"Seja meu aliado."', e:[0,4,4,0,0], to:'intro3', meet:'ciro', set:['ciroAliado'], beat:['coroacao','Você ofereceu a Ciro aliança antes de afeto.'] },
    R:{ t:'"Prove seu valor."', e:[0,-2,6,4,0], to:'intro3', meet:'ciro', beat:['coroacao','Você mediu Ciro com desconfiança.'] } });

  add({ id:'intro3', who:'liora', scene:'crypt', ch:1, arc:'coroacao', story:true, whisperCard:true,
    text:'Naquela noite, a coroa fala. Uma voz de mulher, antiga, dentro do metal. "Não tenha medo, menina. Sou Liora, a que reinou antes. Eu vou te ensinar a sobreviver a eles. A todos eles."',
    L:{ t:'"Quem é você?"', e:[0,0,0,0,0], to:'intro4', meet:'liora', unlock:'diadema', whisper:'Sou a décima Vésper que essa coroa consumiu. E não serei a última, se você me ouvir.', beat:['coroacao','Uma voz na coroa se revelou: Liora, a Décima.'] },
    R:{ t:'"Saia da minha cabeça."', e:[0,0,0,0,0], to:'intro4', meet:'liora', unlock:'diadema', set:['desafiouLiora'], whisper:'Como quiser. Mas quando a corte cravar as facas, lembre que eu ofereci a mão primeiro.', beat:['coroacao','Você desafiou a Voz na coroa desde a primeira noite.'] } });

  add({ id:'intro4', who:'io', scene:'void', ch:1, arc:'coroacao', story:true,
    text:'Uma mulher é arrastada à sua presença, acorrentada, os olhos brilhando em verde-luz. "Sou Îo. Me chamam de herege porque digo o que os Videntes calam: a estrela tem décadas, não séculos. E eu sei como reacendê-la — se me deixar tentar."',
    L:{ t:'Liberte a herege.', e:[-8,6,0,-2,0], to:'intro5', meet:'io', set:['ioLivre'], whisper:'Cuidado. O Culto queima heresias — e rainhas que as protegem.', beat:['coroacao','Você libertou Îo Vantor, desafiando o Culto.'] },
    R:{ t:'Deixe-a acorrentada.', e:[8,-4,0,0,0], to:'intro5', meet:'io', set:['ioPresa'], beat:['coroacao','Você manteve a herege Îo acorrentada, agradando o Culto.'] } });

  add({ id:'intro5', who:'liora', scene:'crypt', ch:1, arc:'coroacao', story:true, whisperCard:true,
    text:'"Aprendeu depressa," diz Liora. "Agora o mais importante. Nenhuma de nós reinou por muito tempo. O Culto chama isso de bênção — a rainha que se entrega ao Sol. Eu chamo de armadilha. Prometa que não vai se ajoelhar para eles."',
    L:{ t:'"Prometo."', e:[-4,2,2,2,0], to:null, set:['confiaLiora'], nextCh:true, whisper:'Boa menina. Então vamos reinar — você e eu, e todas nós.', beat:['coroacao','Você prometeu a Liora nunca se entregar ao Rito. O reinado começa.'] },
    R:{ t:'"Não prometo nada."', e:[2,0,0,0,0], to:null, nextCh:true, whisper:'Teimosa. Como eu era. Isso te mata ou te coroa — nunca as duas.', beat:['coroacao','Você guardou sua palavra para si. O reinado começa.'] } });

  /* --------- CAPÍTULO II — O OCASO ANUNCIADO --------- */
  add({ id:'ocaso_pub', who:'sethis', scene:'cathedral', ch:2, arc:'ocaso', story:true, priority:9, once:true,
    text:'Sethis fala do alto do templo, e mil mundos escutam. "O Sol morre! Os astrônomos não podem mais mentir." O pânico se alastra pelas rádios do Império. "Só o Rito do Ocaso pode salvá-lo — o sacrifício de quem usa a coroa!"',
    L:{ t:'Silencie o Oráculo.', e:[-14,8,4,0,0], set:['silenciouSethis'], whisper:'Silenciar um profeta só torna a profecia mais alta.', beat:['ocaso','Você tentou silenciar Sethis. O Culto ferve.'] },
    R:{ t:'Deixe a verdade correr.', e:[6,-8,-4,0,-2], set:['verdadePublica'], beat:['ocaso','A morte da estrela tornou-se pública. O medo tomou os mundos.'] } });

  add({ id:'ocaso_rhea', who:'rhea', scene:'fleet', ch:2, arc:'ocaso', story:true, priority:8, once:true,
    text:'A Almirante Rhea pousa sua nave no pátio do palácio sem pedir licença. "Esqueça reacender o Sol. Loucura. Eu construo uma frota-arca. Levamos quem couber e fugimos para outra estrela. Me dê o Éter e eu salvo o que der pra salvar."',
    L:{ t:'"Construa a arca."', e:[-4,-4,10,-10,0], meet:'rhea', set:['arcaIniciada'], whisper:'Fugir é abandonar. Pergunte a ela quantos ficam para trás.', beat:['ocaso','Você autorizou a frota-arca de Rhea. O Êxodo começou.'] },
    R:{ t:'"Não vamos fugir."', e:[6,6,-6,0,0], meet:'rhea', set:['recusouArca'], beat:['ocaso','Você recusou o Êxodo. Rhea não esqueceu a afronta.'] } });

  add({ id:'ocaso_mira', who:'mira', scene:'people', ch:2, arc:'ocaso', story:true, priority:7, once:true,
    text:'Uma jovem esfarrapada furou três cordões de guarda para chegar a você. "Nos confins, majestade, o Sol já é só uma brasa. As crianças nascem sem nunca ver o dia. Enquanto os senhores discutem profecias, nós congelamos. O que a coroa faz por nós?"',
    L:{ t:'Desvie Éter aos confins.', e:[0,12,-2,-12,2], meet:'mira', set:['ajudouConfins'], relic:null, whisper:'Generosidade é uma moeda. Gaste-a onde renda votos, não só lágrimas.', beat:['ocaso','Você desviou Éter e calor aos mundos famintos. Mira o observa.'] },
    R:{ t:'"Os confins podem esperar."', e:[2,-14,4,6,0], meet:'mira', set:['abandonouConfins'], beat:['ocaso','Você deixou os confins ao frio. Mira jurou não esquecer.'] } });

  add({ id:'ocaso_vashka', who:'vashka', scene:'court', ch:2, arc:'ocaso', story:true, priority:6, once:true,
    text:'A Duquesa Vashka Corvin serve-lhe vinho que você não pediu. "Que reinado agitado, querida. As Casas estão... nervosas. Éter escasso, sóis morrendo. Garanta os lucros das Casas e eu garanto que nenhuma faca encontre suas costas. Um acordo tão razoável."',
    L:{ t:'Aceite o acordo.', e:[0,-6,0,12,0], meet:'vashka', set:['pactoVashka'], whisper:'Ela nunca cumpre um acordo. Só o adia até que doa mais.', beat:['ocaso','Você pactuou com Vashka Corvin. As Casas estão contentes — por ora.'] },
    R:{ t:'"A coroa não se compra."', e:[2,8,0,-8,0], meet:'vashka', set:['recusouVashka'], whisper:'Corajosa. E agora tem uma inimiga que sorri.', beat:['ocaso','Você recusou Vashka. Ela apenas sorriu — o que é pior.'] } });

  // gate para o capítulo 3: quando o jogador conhecer os 4 caminhos
  add({ id:'ocaso_end', who:'liora', scene:'crypt', ch:2, arc:'ocaso', story:true, whisperCard:true, priority:10,
    cond:(s)=> s.ch===2 && s.decisions>=10,
    text:'"Já viu os quatro caminhos," diz Liora. "O Rito de Sethis. A arca de Rhea. A heresia de Îo. E o ouro de Vashka. Todos mentem, à sua maneira. Desça comigo à Cripta, sob o trono. Está na hora de você saber por que nenhuma rainha envelhece."',
    L:{ t:'Desça à Cripta.', e:[0,0,0,0,0], unlock:'chave', nextCh:true, set:['desceuCripta'], whisper:'Traga uma luz. E coragem. Vai precisar das duas.', beat:['ocaso','Liora a chamou à Cripta das Imperatrizes.'] },
    R:{ t:'"Ainda não."', e:[0,-2,0,0,-2], to:null, whisper:'Adie, então. O Coração não vai esperar por sua coragem.', beat:['ocaso','Você adiou a descida à Cripta.'] } });

  /* --------- CAPÍTULO III — A VOZ NA COROA --------- */
  add({ id:'voz1', who:'liora', scene:'crypt', ch:3, arc:'voz', story:true, whisperCard:true, priority:9, once:true,
    text:'A Cripta guarda dez sarcófagos. Dez imperatrizes. Todas jovens. "Somos nós," diz Liora. "Cada uma reinou, foi ao Rito, e acordou aqui dentro — no ouro. O Culto diz que morremos pelo Sol. A verdade: o Rito não salva a estrela. Só... adia. Compra uma década. E nos aprisiona na coroa para sempre."',
    L:{ t:'"Por que me contar?"', e:[0,0,0,0,0], to:'voz2', unlock:'carta', whisper:'Porque estou cansada, menina. Dez reinados presa neste metal. Talvez você seja a que quebra o ciclo.', beat:['voz','A verdade do Rito: ele apenas adia a morte, e aprisiona a rainha na coroa.'] },
    R:{ t:'"Você me usou."', e:[0,0,0,0,0], to:'voz2', set:['desconfiaLiora'], unlock:'carta', whisper:'Sim. Todas nós usamos umas às outras. É a única herança que a coroa deixa.', beat:['voz','Você percebeu que Liora tem sua própria agenda.'] } });

  add({ id:'voz2', who:'sethis', scene:'cathedral', ch:3, arc:'voz', story:true, priority:8, once:true,
    text:'Sethis a intercepta ao voltar da Cripta, o rosto cinza. "Você desceu. Então já sabe o que guardamos." Ele hesita — e por baixo do zelo, há medo. "O Rito é real, majestade. Doloroso, sim. Mas se a senhora não se entregar quando chegar a hora, o Sol morre em anos, não décadas. Escolha a fé."',
    L:{ t:'"O Rito é uma jaula."', e:[-12,6,2,0,-2], set:['contraRito'], whisper:'Ele acredita, sabe. Isso o torna mais perigoso que um mentiroso.', beat:['voz','Você declarou-se contra o Rito diante do Vidente-Mor.'] },
    R:{ t:'"Talvez eu me entregue."', e:[12,-4,0,0,4], set:['aberto_rito'], whisper:'Não. Nunca diga isso. Nem para enganá-lo. As palavras viram correntes.', beat:['voz','Você deixou Sethis crer que consideraria o Rito.'] } });

  add({ id:'voz3', who:'io', scene:'void', ch:3, arc:'voz', story:true, priority:8, once:true,
    cond:(s)=> s.ch===3 && (s.flags.ioLivre||s.decisions>=16),
    text:'Îo trabalha à luz de um fragmento pulsante — um pedaço vivo da própria estrela. "Consegui colher isto do Coração. Se eu entender como ele queima, posso reacender o Sol de verdade, não adiar como os fanáticos. Mas preciso de Éter, tempo, e da sua proteção contra a fogueira do Culto."',
    L:{ t:'Financie a heresia.', e:[-10,4,0,-10,4], set:['apoiaIo'], unlock:'estilhaco', whisper:'Se ela falhar, você arde com ela. Se acertar... talvez nenhuma de nós precise mais da coroa.', beat:['voz','Você financiou a pesquisa de Îo. Um estilhaço da estrela é seu.'] },
    R:{ t:'"É perigoso demais."', e:[8,-4,0,4,-2], set:['negaIo'], whisper:'Prudente. Ou covarde. A história raramente distingue os dois.', beat:['voz','Você recuou do caminho da ciência.'] } });

  add({ id:'voz_ciro', who:'ciro', scene:'throne', ch:3, arc:'voz', story:true, priority:6, once:true,
    cond:(s)=> s.ch>=3,
    text:'Ciro a encontra insone. "Ouvi você falar sozinha. Com a coroa." Ele não recua. "Seja lá o que carrega aí dentro, majestade, você não precisa carregar sozinha. Deixe-me entrar. Ou me mande embora de vez — mas pare de me deixar na soleira."',
    L:{ t:'Conte a ele tudo.', e:[0,6,4,0,0], set:['ciroSabe','amaCiro'], whisper:'Confiança é uma faca que você entrega pelo cabo. Espero que ele mereça.', relic:null, beat:['voz','Você abriu seu coração a Ciro. Nasce algo entre vocês — talvez amor.'] },
    R:{ t:'"Há coisas que a coroa cala."', e:[0,-2,2,4,0], set:['afastaCiro'], beat:['voz','Você manteve Ciro do lado de fora dos seus segredos.'] } });

  add({ id:'voz_end', who:'caeus', scene:'frontier', ch:3, arc:'voz', story:true, priority:10, once:true,
    cond:(s)=> s.ch===3 && s.decisions>=20,
    text:'Um homem esfarrapado atravessa o Escuro entre as estrelas e chega vivo — o que deveria ser impossível. Encapuzado, olhos como brasas roxas. "Vim de onde os sóis já morreram todos, majestade. E vim avisar: sua estrela não está morrendo. Está sendo comida. Posso mostrar. Se tiver estômago."',
    L:{ t:'"Mostre-me."', e:[0,0,0,0,0], meet:'caeus', unlock:'bussola', nextCh:true, set:['ouviuCaeus'], whisper:'Eu não confio nele. Mas... eu nunca ouvi essa história em dez reinados. Ouça-o.', beat:['voz','Caeus, o Andarilho, trouxe uma verdade impossível: o Sol está sendo devorado.'] },
    R:{ t:'"Prenda o louco."', e:[4,-2,2,0,0], meet:'caeus', set:['prendeuCaeus'], nextCh:true, whisper:'Você acaba de trancar a única resposta verdadeira numa masmorra. Espero que se arrependa a tempo.', beat:['voz','Você prendeu Caeus antes de ouvir toda a verdade.'] } });

  /* --------- CAPÍTULO IV — O SEGREDO DO CORAÇÃO --------- */
  add({ id:'cor1', who:'caeus', scene:'sun', ch:4, arc:'coracao', story:true, priority:9, once:true,
    text:'Caeus abre um mapa de luz. No centro da estrela, algo se move — vasto, antigo, faminto. "Chamamos de o Devorador. Ele se enrosca no coração de cada sol e bebe. O "Rito"? O sacrifício de vocês só o adormece por uma década. Vocês têm alimentado a coisa que mata a estrela, geração após geração."',
    L:{ t:'"Como se mata isso?"', e:[0,0,0,0,0], to:'cor2', set:['sabeDevorador'], whisper:'Dez reinados... e nós só o fizemos dormir. Todas essas mortes, menina. Todas por nada.', beat:['coracao','A verdade: um Devorador consome a estrela. O Rito só o adormece.'] },
    R:{ t:'"Isso é heresia dupla."', e:[6,0,0,0,-2], to:'cor2', whisper:'Chame do que quiser. A verdade não pede permissão para ser verdadeira.', beat:['coracao','Caeus revelou o Devorador — mas você resistiu a crer.'] } });

  add({ id:'cor2', who:'caeus', scene:'void', ch:4, arc:'coracao', story:true, priority:9, once:true,
    text:'"Há três formas de acabar com isto," diz Caeus. "Uma: alguém entra na estrela e o desperta, forçando-o a se erguer e partir faminto — isso reacende o Sol, mas custa a vida de quem entra. Duas: a ciência da sua herege pode envenená-lo. Três: a arca da sua almirante foge para longe o bastante para ele nunca alcançar. Escolha logo. Ele já está acordando."',
    L:{ t:'"Preciso de tempo."', e:[0,-2,0,0,-2], to:null, nextCh:true, set:['prontoEscolha'], whisper:'Não há tempo. Mas eu direi que há, se isso te fizer respirar mais uma noite.', beat:['coracao','Três caminhos se abrem: o Sacrifício, o Veneno, o Êxodo.'] },
    R:{ t:'"Reúna todos. Agora."', e:[0,0,4,0,0], to:null, nextCh:true, set:['prontoEscolha','convocou'], whisper:'Corajosa. Reúna seus lobos numa sala só e veja quem sangra primeiro.', beat:['coracao','Você convocou a corte inteira para a decisão final.'] } });

  /* --------- CAPÍTULO V — A ESCOLHA FINAL (leva aos finais) --------- */
  add({ id:'fin_hub', who:'liora', scene:'crypt', ch:5, arc:'escolha', story:true, priority:20, whisperCard:true,
    cond:(s)=> s.ch===5,
    text:'A corte inteira em silêncio. Sethis com a Lâmina do Ocaso. Îo com o estilhaço. Rhea com as chaves da arca. E, na sua cabeça, Liora sussurra uma última vez: "Chegou, menina. O que faço com dez reinados de arrependimento? Escolha. Eu carrego o resto."',
    L:{ t:'Ponderar os caminhos…', e:[0,0,0,0,0], to:'fin_menu', whisper:'Sim. Olhe cada porta antes de atravessar. Só se atravessa uma.' },
    R:{ t:'Ponderar os caminhos…', e:[0,0,0,0,0], to:'fin_menu', whisper:'Sim. Olhe cada porta antes de atravessar. Só se atravessa uma.' } });

  // O "menu" de finais é uma sucessão de cartas de escolha (cada uma abre um final se aceita)
  add({ id:'fin_menu', who:'sethis', scene:'cathedral', ch:5, arc:'escolha', story:true, priority:20,
    text:'Sethis oferece a Lâmina, os olhos rasos d\'água de fé. "O caminho antigo, majestade. Entre no Coração. Desperte o Devorador e o afugente com o clarão. O Sol renasce por gerações. E a senhora... vive para sempre no ouro, conosco. É a única certeza que posso lhe dar."',
    L:{ t:'Aceitar o Sacrifício.', e:[0,0,0,0,0], end:'sacrifice' },
    R:{ t:'Ver os outros caminhos.', e:[0,0,0,0,0], to:'fin_io' } });

  add({ id:'fin_io', who:'io', scene:'void', ch:5, arc:'escolha', story:true, priority:20,
    text:'Îo ergue o estilhaço, que pulsa como um coração aflito. "Meu veneno está pronto. Uma injeção no núcleo e o Devorador morre de verdade — não dorme, morre. Mas nunca testei numa estrela viva. Se eu errar o cálculo, apago o Sol num piscar. Confia em mim, majestade? Confia na razão?"',
    L:{ t:'Confiar na Ciência.', e:[0,0,0,0,0], end:'reignite', cond:(s)=>true },
    R:{ t:'Ver o último caminho.', e:[0,0,0,0,0], to:'fin_rhea' } });

  add({ id:'fin_rhea', who:'rhea', scene:'fleet', ch:5, arc:'escolha', story:true, priority:20,
    text:'Rhea não implora. "A arca está pronta. Não salva todos — salva os que couberem, e a Semente-Gênese planta um mundo novo sob uma estrela nova. É fuga, sim. É covardia, talvez. Mas é vida. Deixe a estrela e o monstro para trás. Venha comigo."',
    L:{ t:'Liderar o Êxodo.', e:[0,0,0,0,0], end:'exodus' },
    R:{ t:'Nenhum destes.', e:[0,0,0,0,0], to:'fin_break' } });

  add({ id:'fin_break', who:'liora', scene:'crypt', ch:5, arc:'escolha', story:true, priority:20, whisperCard:true,
    text:'Há um quarto caminho que ninguém ofereceu. Você ergue a coroa das próprias têmporas e a segura sobre a Lâmina. Liora entende primeiro. "Ah. Você vai nos libertar. Quebrar a coroa, romper o ciclo, deixar o Império enfrentar o Escuro como gente livre — sem voz, sem rito, sem rainha eterna. É a escolha mais cruel. E a mais bela. Faça, menina. Nos deixe descansar."',
    L:{ t:'Quebrar a Coroa.', e:[0,0,0,0,0], end:'break' },
    R:{ t:'Recuar. Ainda não.', e:[0,-4,-4,-4,-4], to:'fin_hub', set:['recuouFinal'], whisper:'Recue, então. Mas o Devorador não recua. Decida antes que ele decida por você.' } });

  /* ==================================================================
     BARALHO RECORRENTE — intriga, fé, povo, frota, éter, romance
     (dão a jogabilidade momento-a-momento entre as cartas de história)
     ================================================================== */
  const R = (o)=>{ o.recurring=true; o.weight=o.weight||3; add(o); };

  R({ id:'r_temple_tithe', who:'sethis', scene:'cathedral', minCh:2,
    text:'"Os cofres do Templo estão vazios, majestade, mas nossas preces são incansáveis. Um dízimo das Casas encheria de novo os turíbulos — e os corações dos fiéis."',
    L:{ t:'Concede o dízimo.', e:[10,0,0,-10,0] },
    R:{ t:'"O Templo que jejue."', e:[-9,2,0,6,0] } });

  R({ id:'r_povo_pao', who:'mira', scene:'people', minCh:2,
    text:'"Há pão nos armazéns imperiais e fome nas ruas, majestade. Abra as portas ou os famintos as arrombarão."',
    L:{ t:'Abre os armazéns.', e:[0,11,0,-8,0] },
    R:{ t:'Guarda as reservas.', e:[0,-10,2,6,0] } });

  R({ id:'r_frota_soldo', who:'rhea', scene:'fleet', minCh:2,
    text:'"Minha gente não voa de graça, majestade. Sem soldo, os pilotos desertam — e os confins ficam sem escudo. Pague-os, ou reze para que ninguém ataque."',
    L:{ t:'Paga o soldo.', e:[0,0,10,-9,0] },
    R:{ t:'"Que sirvam por honra."', e:[0,2,-11,4,0] } });

  R({ id:'r_eter_mina', who:'vashka', scene:'court', minCh:2,
    text:'"Descobri uma veia de Éter num mundo do Culto, querida. Cedo a mão de obra, o Templo cede o solo sagrado, e nós dividimos a fortuna. Um pecadinho tão lucrativo."',
    L:{ t:'Escava o solo sagrado.', e:[-8,0,0,12,0] },
    R:{ t:'"Terra sagrada é sagrada."', e:[7,2,0,-6,0] } });

  R({ id:'r_court_intriga', who:'vashka', scene:'court', minCh:2,
    text:'"Um rumor delicioso: dizem que a Almirante Rhea planeja partir com a arca antes da hora — e sem a senhora nela. Eu podia, digamos, tornar esse rumor... verdade oficial. Por um preço."',
    L:{ t:'Compra o boato.', e:[0,4,-10,-6,0], set:['vashkaContraRhea'] },
    R:{ t:'"Não semeio mentiras."', e:[0,2,4,0,0] } });

  R({ id:'r_ciro_afeto', who:'ciro', scene:'throne', minCh:3, cond:(s)=>!s.flags.afastaCiro,
    text:'"Trouxe-lhe algo tolo," diz Ciro, e estende uma flor cultivada sob lâmpadas, longe de qualquer sol. "Cresce no escuro. Como nós, imagino. Como tudo que ainda insiste em viver."',
    L:{ t:'Aceita a flor.', e:[0,6,2,0,0], set:['amaCiro'] },
    R:{ t:'"Não tenho tempo para tolices."', e:[0,-2,4,2,0] } });

  R({ id:'r_liora_conselho', who:'liora', scene:'crypt', minCh:3, whisperCard:true, weight:2,
    text:'"Uma lição, menina, das dez que fui. Quando dois poderes brigam, não escolha um lado. Deixe que se esgotem, e recolha o que sobrar. Foi assim que sobrevivi a três guerras civis — sentada, esperando."',
    L:{ t:'"Sábia."', e:[0,0,0,4,0] },
    R:{ t:'"Ou covarde."', e:[0,4,0,0,0] } });

  R({ id:'r_refugiados', who:'mira', scene:'frontier', minCh:2,
    text:'"Três mundos dos confins escureceram de vez, majestade. Milhões de refugiados vêm para o centro. Onde os coloco? Nas cidades já cheias, ou os deixo à deriva no frio?"',
    L:{ t:'Acolhe os refugiados.', e:[2,10,-2,-8,0] },
    R:{ t:'Fecha as fronteiras.', e:[0,-11,4,4,0] } });

  R({ id:'r_heresia_julgamento', who:'sethis', scene:'cathedral', minCh:3,
    text:'"Prendemos um círculo de cientistas que copiavam a herege Îo, majestade. O Culto pede a fogueira. A senhora pode conceder o fogo... ou a clemência, e arcar com a ira dos fiéis."',
    L:{ t:'Concede a fogueira.', e:[10,-8,0,0,0] },
    R:{ t:'Concede a clemência.', e:[-10,8,0,0,0], set:['clemente'] } });

  R({ id:'r_vashka_casamento', who:'vashka', scene:'court', minCh:3, cond:(s)=>!s.flags.vashkaCasou,
    text:'"Meu sobrinho é encantador e as Casas o adoram. Que tal um casamentozinho na família imperial? Só um noivado. Fortaleceria... tantos laços."',
    L:{ t:'Aceita o noivado.', e:[0,-2,0,10,0], set:['vashkaCasou'] },
    R:{ t:'"A coroa não é dote."', e:[0,4,0,-6,0], set:['vashkaOfendida'] } });

  R({ id:'r_frota_motim', who:'rhea', scene:'fleet', minCh:3, cond:(s)=>s.res&&s.res.frota<45,
    text:'"Metade da minha oficialidade fala em motim, majestade. Dê-lhes uma vitória — mande-nos limpar os piratas dos confins — ou dê-lhes ouro. Mãos ociosas afiam facas."',
    L:{ t:'Manda-os à guerra.', e:[0,-4,10,-4,0] },
    R:{ t:'Compra a lealdade.', e:[0,0,6,-10,0] } });

  R({ id:'r_povo_culto', who:'mira', scene:'people', minCh:3,
    text:'"O povo faminto começou a rezar ao Sol dia e noite, majestade — o Culto os alimenta com esperança onde a coroa não os alimenta com pão. Sethis ganha almas a cada estômago vazio."',
    L:{ t:'Compete com pão.', e:[-4,10,0,-8,0] },
    R:{ t:'Deixa o Culto alimentá-los.', e:[8,-6,0,2,0] } });

  R({ id:'r_eter_racionamento', who:'ciro', scene:'throne', minCh:2,
    text:'"O Éter que aquece as cidades acaba em dois invernos, majestade. Racionar agora salva o futuro e enfurece o presente. Ou gastamos tudo com calor hoje e rezamos por amanhã."',
    L:{ t:'Raciona o Éter.', e:[0,-8,0,10,0] },
    R:{ t:'Aquece as cidades.', e:[0,9,0,-10,-1] } });

  R({ id:'r_caeus_confins', who:'caeus', scene:'frontier', minCh:4,
    text:'"Andei pelos confins, majestade. O Escuro não é vazio — há coisas nele, atraídas pela estrela agonizante como mariposas mortas. A Frota precisa saber o que a espera lá fora."',
    L:{ t:'Envia batedores.', e:[0,0,-6,-2,0], set:['sondouEscuro'] },
    R:{ t:'"Não acordemos o que dorme."', e:[0,0,2,0,-2] } });

  R({ id:'r_liora_ciume', who:'liora', scene:'crypt', minCh:3, whisperCard:true, cond:(s)=>s.flags.amaCiro,
    text:'"Você o ama," diz Liora, e há gelo na voz. "Eu também amei, uma vez. Sabe o que o meu Consorte fez quando cheguei perto do Rito? Empurrou-me. Por ambição. Cuide para que o seu não faça o mesmo, menina."',
    L:{ t:'"Ciro não é assim."', e:[0,4,0,0,0], set:['confiaCiro'] },
    R:{ t:'"Vou vigiá-lo."', e:[0,0,2,2,0], set:['vigiaCiro'] } });

  R({ id:'r_vashka_veneno', who:'vashka', scene:'court', minCh:4, cond:(s)=>s.flags.recusouVashka||s.flags.vashkaOfendida, weight:2,
    text:'A taça de vinho na sua mão exala um perfume estranho de amêndoas. Do outro lado do salão, Vashka observa, o copo dela intocado. Um silêncio afiado.',
    L:{ t:'Bebe assim mesmo.', e:[0,6,0,0,-4], set:['sobreviveuVeneno'], toast:'O gosto é amargo — mas você acorda viva. Vashka empalidece.' },
    R:{ t:'Derrama aos pés dela.', e:[0,2,4,-4,0], set:['acusouVashka'], toast:'O vinho corrói o mármore onde cai. A corte viu. Vashka sorri, sem alma.' } });

  R({ id:'r_povo_festa', who:'mira', scene:'people', minCh:2, weight:2,
    text:'"Dê-lhes uma festa, majestade. Uma noite de luz artificial, música, comida. O povo aguenta muito frio se tiver uma noite quente para lembrar."',
    L:{ t:'Ordena a festa.', e:[0,8,0,-6,0] },
    R:{ t:'"Não há o que celebrar."', e:[0,-6,0,4,0] } });

  R({ id:'r_temple_milagre', who:'sethis', scene:'cathedral', minCh:3, cond:(s)=>s.flags.apoiaIo,
    text:'"O estilhaço que a herege colheu brilha, majestade. O Culto clama que é um milagre do Sol — não obra da ciência. Deixe-nos chamar de milagre e a fé se reacende com a estrela."',
    L:{ t:'"Chamem de milagre."', e:[12,0,0,0,0], set:['milagreFalso'] },
    R:{ t:'"É ciência, e todos saberão."', e:[-10,6,0,0,0] } });

  R({ id:'r_frota_desercao', who:'rhea', scene:'fleet', minCh:4, cond:(s)=>s.flags.arcaIniciada,
    text:'"A arca cresce, majestade, mas cada nave que soldo para ela é uma nave a menos defendendo os mundos. Aceleramos a fuga e deixamos os confins nus? Ou protegemos até o fim e arriscamos não terminar a arca a tempo?"',
    L:{ t:'Acelera a arca.', e:[0,-6,-4,0,0], set:['arcaRapida'] },
    R:{ t:'Protege os mundos.', e:[0,6,4,-6,0] } });

  R({ id:'r_liora_verdade', who:'liora', scene:'crypt', minCh:4, whisperCard:true, cond:(s)=>s.flags.sabeDevorador, weight:2,
    text:'"Todas essas mortes," murmura Liora, e pela primeira vez a voz treme. "Dez de nós, e nunca soubemos do Devorador. Só alimentamos o monstro achando que salvávamos o Sol. Se você quebrar esse ciclo, menina... talvez as dez possam enfim dormir."',
    L:{ t:'"Vou libertá-las."', e:[0,4,0,0,2], set:['prometeuLibertar'] },
    R:{ t:'"Primeiro, sobreviver."', e:[0,0,2,2,0] } });

  R({ id:'r_ambos_briga', who:'vashka', scene:'court', minCh:3,
    text:'A Duquesa e a Arauta Mira gritam no salão — as Casas contra os famintos, o luxo contra o pão. Toda a corte espera de que lado a coroa penderá.',
    L:{ t:'Fica com as Casas.', e:[0,-8,0,10,0], set:['ladoCasas'] },
    R:{ t:'Fica com o povo.', e:[0,10,0,-8,0], set:['ladoPovo'] } });

  R({ id:'r_star_sombra', who:'caeus', scene:'sun', minCh:4, cond:(s)=>s.res&&s.res.star<50, weight:2,
    text:'"Sente isso?" pergunta Caeus, a mão sobre o coração. "O Devorador se mexeu. A cada dia que a senhora hesita, ele bebe mais fundo. Logo nem o Rito nem a ciência o alcançarão. O tempo tem gosto de fim."',
    L:{ t:'"Eu decidirei em breve."', e:[0,0,0,0,-2] },
    R:{ t:'"Traga-me o caminho mais rápido."', e:[0,0,0,-4,2], set:['pressa'] } });

  /* --------- pós-processamento: cartas de história nunca se repetem no baralho
     (as cadeias 'to' as forçam mesmo assim, mas fora disso ficam travadas) --------- */
  CARDS.forEach(c=>{ if(c.story) c.once=true; });

  /* --------- ÍNDICES úteis --------- */
  const byId = {}; CARDS.forEach(c=>byId[c.id]=c);

  return { RESOURCES, CHARS, RELICS, CHAPTERS, WHISPERS, CARDS, byId,
    ENDINGS: null /* definido em game.js pois usa estado */ };
})();
