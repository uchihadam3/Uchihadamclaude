/* ========================================================================
   AS QUATRO ÁRVORES — uma por classe, 20 passivas cada.

   O Cofre antigo era UM tronco só, igual para todo mundo: quem jogasse de
   Carrasco e quem jogasse de OráculA compravam exatamente as mesmas coisas,
   e a diferença entre as classes acabava na primeira meia hora. Aqui cada
   alma tem a sua própria árvore, e ela puxa a corda da SUA mecânica:

     ⚒ Carrasco  — arrombar na marra, dado alto, sangue como moeda
     🗡 Lâmina    — veneno e sangramento, conjuntos, sumir das vistas
     ✦ Arcanista — sequências, o Círculo que guarda dados, dissolver a regra
     ◈ OráculA   — reescrever o dado até ele caber na fechadura

   COMO OS EFEITOS CHEGAM AO MOTOR. Nada aqui inventa um sistema novo: cada
   compra soma numa passiva sintética com o MESMO formato das relíquias
   (mods / flags / start / onKill / onRoll), que o combate já sabe executar.
   O que a árvore acrescenta são as flags de classe, lidas em combat.js.

   O PREÇO SOBE COM O ANEL. Anel 1 é barato e melhora o básico; o 4 custa
   caro e muda como a classe joga. Cada nível seguinte de um mesmo nó custa
   mais que o anterior, então largura e profundidade competem pelos Ecos.
   ===================================================================== */

export const ANEIS = [
  { n:1, nome:'RAIZ',    sub:'o básico, mais firme' },
  { n:2, nome:'TRONCO',  sub:'a sua mecânica começa a pagar' },
  { n:3, nome:'GALHO',   sub:'jogadas que só a sua classe faz' },
  { n:4, nome:'COPA',    sub:'muda como a alma joga' },
];

/* helpers para não repetir objeto a cada nó */
const mod = (k,v) => (A,n)=>{ A.mods[k] = (A.mods[k]||0) + v*n; };
const mult = (k,v) => (A,n)=>{ A.mods[k] = (A.mods[k]||1) * Math.pow(v,n); };
const flag = f => (A)=>{ A.flags.add(f); };
const start = (k,v) => (A,n)=>{ A.start[k] = (A.start[k]||0) + v*n; };
const kill = (k,v) => (A,n)=>{ A.onKill[k] = (A.onKill[k]||0) + v*n; };
const roll = r => (A)=>{ A.onRoll.push(r); };
const campo = (k,v) => (A,n)=>{ A.campos[k] = (A.campos[k]||0) + v*n; };

export const ARVORES = {

/* ================= ⚒ O CARRASCO — A FORJA =================
   A chave dele é ARROMBAR: força bruta abre qualquer regra. A árvore paga
   por bater alto, por arrombar e por gastar a própria vida sem morrer. */
carrasco: { nome:'A FORJA', glifo:'⚒', cor:'#c0392b',
  lema:'O machado não pergunta a regra. Ele responde.',
  nos:[
    /* --- anel 1 --- */
    {id:'c_medula', anel:1, nome:'Medula Densa', max:3, custo:[4,9,16],
     txt:n=>`+${n*12} de HP máximo`, ef:mod('hpBonus',12)},
    {id:'c_fio', anel:1, nome:'Fio do Machado', max:3, custo:[5,11,19],
     txt:n=>`+${n*2} de dano em todo golpe`, ef:mod('dmgFlat',2)},
    {id:'c_couro', anel:1, nome:'Couro Batido', max:2, custo:[5,12],
     txt:n=>`Começa cada combate com ${n*5} de bloqueio`, ef:start('block',5)},
    {id:'c_calo', anel:1, nome:'Calo Grosso', max:1, custo:[8],
     txt:()=>`+1 re-rolagem por combate`, ef:mod('rerollBonus',1)},
    {id:'c_bigorna', anel:1, nome:'Costas de Bigorna', max:2, custo:[6,14],
     txt:n=>`Ao matar, ganha ${n*5} de bloqueio`, ef:kill('block',5)},
    /* --- anel 2 --- */
    {id:'c_punho', anel:2, nome:'Punho Calejado', max:1, custo:[14], req:['c_fio'],
     txt:()=>`Sobrecarga custa 1 de HP em vez de 2`, ef:flag('sobrecarga_barata')},
    {id:'c_lasca', anel:2, nome:'Lasca de Ferro', max:2, custo:[13,27], req:['c_fio'],
     txt:n=>`Perfura ${n*2} de armadura inimiga`, ef:mod('pierce',2)},
    {id:'c_quente', anel:2, nome:'Sangue Quente', max:2, custo:[15,31], req:['c_medula'],
     txt:n=>`Abaixo de metade da vida, +${n*20}% de dano`, ef:campo('sangueQuente',20)},
    {id:'c_gancho', anel:2, nome:'Gancho de Açougue', max:1, custo:[16], req:['c_couro'],
     txt:()=>`Ao matar, cura 6 de vida`, ef:kill('heal',6)},
    {id:'c_pesado', anel:2, nome:'Braço Pesado', max:2, custo:[12,26], req:['c_calo'],
     txt:n=>`Dados que rolarem 1 valem ${n>1?'3':'2'}`, ef:roll('um_vira_dois')},
    /* --- anel 3 --- */
    {id:'c_arromba', anel:3, nome:'Arromba-Portas', max:2, custo:[22,44], req:['c_punho'],
     txt:n=>`Inimigo ARROMBADO sofre +${n*8} de dano seu`, ef:campo('furiaArromba',8)},
    {id:'c_marreta', anel:3, nome:'Marreta', max:2, custo:[24,48], req:['c_lasca'],
     txt:n=>`Dano ×${(1+n*0.12).toFixed(2)}`, ef:mult('dmgMult',1.12)},
    {id:'c_sexto', anel:3, nome:'Sexto Osso', max:1, custo:[30], req:['c_pesado'],
     txt:()=>`+1 dado na Bolsa inicial`, ef:campo('dadosExtra',1)},
    {id:'c_teimoso', anel:3, nome:'Teimosia', max:1, custo:[28], req:['c_gancho'],
     txt:()=>`Ao cair a 0, revive uma vez com 30% da vida`, ef:campo('revive',0.30)},
    {id:'c_retaguarda', anel:3, nome:'Retaguarda Farta', max:1, custo:[26], req:['c_quente'],
     txt:()=>`Os dados que sobram batem pelo valor CHEIO, não pela metade`,
     ef:flag('retaguarda_cheia')},
    /* --- anel 4 --- */
    {id:'c_gazua', anel:4, nome:'Gazua de Ferro', max:2, custo:[36,70], req:['c_arromba'],
     txt:n=>`${n}×/combate: ARROMBA a fechadura de um inimigo`, ef:campo('gazua',1)},
    {id:'c_carrasco', anel:4, nome:'Mão do Carrasco', max:1, custo:[52], req:['c_marreta'],
     txt:()=>`Executa em 25% de vida em vez de 18%`, ef:flag('execucao_larga')},
    {id:'c_martirio', anel:4, nome:'Martírio', max:1, custo:[44], req:['c_teimoso'],
     txt:()=>`Todo dano que VOCÊ sofre vira +2 de dano no próximo golpe`,
     ef:flag('martirio')},
    {id:'c_cadafalso', anel:4, nome:'Sombra do Cadafalso', max:1, custo:[58], req:['c_gazua'],
     txt:()=>`Quando você arromba, TODOS os inimigos ficam arrombados`,
     ef:flag('arromba_campo')},
    {id:'c_ossario', anel:4, nome:'Coração de Ossário', max:1, custo:[64], req:['c_carrasco','c_martirio'],
     txt:()=>`+40 de HP máximo e o primeiro golpe de cada combate perfura tudo`,
     ef:(A,n)=>{ A.mods.hpBonus=(A.mods.hpBonus||0)+40; A.flags.add('primeiro_perfura'); }},
    /* --- vindos do tronco antigo, agora com dono --- */
    {id:'c_espolio', anel:1, nome:'Espólio', max:3, custo:[6,13,23],
     txt:n=>`+${n*25}% de Ecos ganhos na descida`, ef:campo('ecoMult',25)},
    {id:'c_bigorna2', anel:2, nome:'Bigorna Própria', max:2, custo:[12,25], req:['c_couro'],
     txt:n=>`Toda gravação melhora ${n} face${n>1?'s':''} a mais`, ef:campo('gravExtra',1)},
    {id:'c_escolha', anel:3, nome:'Cabeça Fria', max:2, custo:[20,40], req:['c_bigorna2'],
     txt:n=>`${3+n} opções de recompensa a cada andar`, ef:campo('opcoes',1)},
    {id:'c_coroa', anel:4, nome:'Coroa do Carrasco', max:1, custo:[42], req:['c_escolha'],
     txt:()=>`Libera a 4ª habilidade: Açougueiro (dano triplo, você sangra 4)`,
     ef:campo('quarta',1)},
  ]},

/* ================= 🗡 A LÂMINA-SOMBRA — O FIO =================
   Ela CONTORNA: veneno e sangramento atravessam qualquer fechadura. A
   árvore paga por acumular status, por sumir e por matar de mil cortes. */
lamina: { nome:'O FIO', glifo:'🗡', cor:'#6c3fa0',
  lema:'Ninguém morre de um golpe seu. Morre do centésimo.',
  nos:[
    /* --- anel 1 --- */
    {id:'l_folego', anel:1, nome:'Fôlego Curto', max:3, custo:[4,9,16],
     txt:n=>`+${n*9} de HP máximo`, ef:mod('hpBonus',9)},
    {id:'l_gume', anel:1, nome:'Gume Fino', max:3, custo:[5,11,19],
     txt:n=>`+${n} de dano em todo golpe`, ef:mod('dmgFlat',1)},
    {id:'l_mao', anel:1, nome:'Mão Leve', max:2, custo:[7,16],
     txt:n=>`+${n} re-rolagem por combate`, ef:mod('rerollBonus',1)},
    {id:'l_frasco', anel:1, nome:'Frasco no Cinto', max:2, custo:[6,14],
     txt:n=>`Todo veneno e sangramento que você aplica vem +${n}`,
     ef:campo('venenoFlat',1)},
    {id:'l_capuz', anel:1, nome:'Capuz', max:2, custo:[5,12],
     txt:n=>`Começa cada combate com ${n*4} de bloqueio`, ef:start('block',4)},
    /* --- anel 2 --- */
    {id:'l_dupla', anel:2, nome:'Trapaça Dupla', max:1, custo:[15], req:['l_mao'],
     txt:()=>`A Trapaça (virar o dado) passa a valer 2×/turno`, ef:flag('trapaca_dupla')},
    {id:'l_corrosivo', anel:2, nome:'Corrosivo', max:2, custo:[14,29], req:['l_frasco'],
     txt:n=>`Veneno e sangramento causam +${n*25}% de dano`, ef:campo('venenoPct',25)},
    {id:'l_sombra', anel:2, nome:'Sombra Longa', max:1, custo:[17], req:['l_capuz'],
     txt:()=>`Invisível corta 80% do dano, não 65%`, ef:flag('invisivel_forte')},
    {id:'l_acumulo', anel:2, nome:'Acúmulo', max:2, custo:[13,27], req:['l_gume'],
     txt:n=>`Cada dado não usado envenena ${n} a mais`, ef:campo('sobraVeneno',1)},
    {id:'l_agulha', anel:2, nome:'Agulha', max:2, custo:[16,32], req:['l_gume'],
     txt:n=>`Perfura ${n*2} de armadura inimiga`, ef:mod('pierce',2)},
    /* --- anel 3 --- */
    {id:'l_eterno', anel:3, nome:'Veneno Perene', max:1, custo:[34], req:['l_corrosivo'],
     txt:()=>`O veneno NÃO decai sozinho — fica até o inimigo morrer`,
     ef:flag('veneno_eterno')},
    {id:'l_faca', anel:3, nome:'Faca Extra', max:1, custo:[30], req:['l_dupla'],
     txt:()=>`+1 dado na Bolsa inicial`, ef:campo('dadosExtra',1)},
    {id:'l_praga', anel:3, nome:'Praga', max:2, custo:[26,52], req:['l_acumulo'],
     txt:n=>`Ao matar, espalha ${n*4} de veneno em todos os vivos`,
     ef:campo('pragaAoMatar',4)},
    {id:'l_fuga', anel:3, nome:'Passo de Fuga', max:1, custo:[28], req:['l_sombra'],
     txt:()=>`Ao matar, ganha 5 de bloqueio e some por um turno`,
     ef:(A,n)=>{ A.onKill.block=(A.onKill.block||0)+5; A.flags.add('some_ao_matar'); }},
    {id:'l_gemea', anel:3, nome:'Lâmina Gêmea', max:2, custo:[24,48], req:['l_agulha'],
     txt:n=>`Dano ×${(1+n*0.10).toFixed(2)}`, ef:mult('dmgMult',1.10)},
    /* --- anel 4 --- */
    {id:'l_ceifa', anel:4, nome:'Ceifa Antecipada', max:1, custo:[54], req:['l_eterno'],
     txt:()=>`Inimigo com 15+ de veneno sofre o dobro do seu dano direto`,
     ef:flag('ceifa_antecipada')},
    {id:'l_mil', anel:4, nome:'Mil e Um', max:2, custo:[38,74], req:['l_gemea'],
     txt:n=>`Golpes que batem VÁRIAS vezes batem +${n} vez${n>1?'es':''}`,
     ef:campo('golpesExtra',1)},
    {id:'l_bruma', anel:4, nome:'Bruma', max:1, custo:[46], req:['l_fuga'],
     txt:()=>`Você começa TODO combate invisível`, ef:flag('comeca_invisivel')},
    {id:'l_epidemia', anel:4, nome:'Epidemia', max:1, custo:[60], req:['l_praga'],
     txt:()=>`Todo veneno que você aplica num alvo pinga 2 em todos os outros`,
     ef:flag('epidemia')},
    {id:'l_vazio', anel:4, nome:'Sopro do Vazio', max:1, custo:[66], req:['l_ceifa','l_mil'],
     txt:()=>`+30 de HP máximo e todo inimigo já entra no combate com 4 de veneno`,
     ef:(A,n)=>{ A.mods.hpBonus=(A.mods.hpBonus||0)+30; A.flags.add('veneno_de_entrada'); }},
    /* --- vindos do tronco antigo, agora com dono --- */
    {id:'l_espolio', anel:1, nome:'Bolso Furado', max:3, custo:[6,13,23],
     txt:n=>`+${n*25}% de Ecos ganhos na descida`, ef:campo('ecoMult',25)},
    {id:'l_gravado', anel:2, nome:'Fio Gravado', max:3, custo:[10,21,36], req:['l_gume'],
     txt:n=>`Começa com ${n} face ⚔ Lâmina gravada (e Mil Cortes bate mais)`,
     ef:campo('lamina',1)},
    {id:'l_escolha', anel:3, nome:'Olho Treinado', max:2, custo:[20,40], req:['l_gravado'],
     txt:n=>`${3+n} opções de recompensa a cada andar`, ef:campo('opcoes',1)},
    {id:'l_coroa', anel:4, nome:'Coroa de Sombra', max:1, custo:[42], req:['l_escolha'],
     txt:()=>`Libera a 4ª habilidade: Enxame de Lâminas (golpeia e envenena TODOS)`,
     ef:campo('quarta',1)},
  ]},

/* ================= ✦ O ARCANISTA FRATURADO — O CÍRCULO =================
   Ele DISSOLVE a regra e guarda dados entre turnos. A árvore paga por
   montar sequência, por acumular no Círculo e por explodir de uma vez. */
arcanista: { nome:'O CÍRCULO', glifo:'✦', cor:'#2f7ec4',
  lema:'Sofre no turno um. Apaga a tela no turno quatro.',
  nos:[
    /* --- anel 1 --- */
    {id:'a_veia', anel:1, nome:'Veia Fria', max:3, custo:[4,9,16],
     txt:n=>`+${n*10} de HP máximo`, ef:mod('hpBonus',10)},
    {id:'a_faisca', anel:1, nome:'Faísca', max:3, custo:[5,11,19],
     txt:n=>`+${n} de dano em todo golpe`, ef:mod('dmgFlat',1)},
    {id:'a_manto', anel:1, nome:'Manto de Poeira', max:2, custo:[6,14],
     txt:n=>`Começa cada combate com ${n*6} de bloqueio`, ef:start('block',6)},
    {id:'a_essencia', anel:1, nome:'Fonte', max:2, custo:[7,16],
     txt:n=>`Começa cada combate com ${n} de ✦ Essência`, ef:start('essence',1)},
    {id:'a_mao', anel:1, nome:'Dedos Longos', max:1, custo:[8],
     txt:()=>`+1 re-rolagem por combate`, ef:mod('rerollBonus',1)},
    /* --- anel 2 --- */
    {id:'a_circulo', anel:2, nome:'Círculo Amplo', max:2, custo:[14,29], req:['a_essencia'],
     txt:n=>`Guarda ${n} dado${n>1?'s':''} a mais no Círculo entre turnos`,
     ef:campo('circuloExtra',1)},
    {id:'a_degrau', anel:2, nome:'Degrau', max:1, custo:[18], req:['a_faisca'],
     txt:()=>`Suas SEQUÊNCIAS aceitam um buraco (1-2-4 conta como 1-2-3)`,
     ef:flag('seq_frouxa')},
    {id:'a_prisma', anel:2, nome:'Prisma Menor', max:2, custo:[15,31], req:['a_manto'],
     txt:n=>`Dissolver dura +${n} turno${n>1?'s':''}`, ef:campo('dissolveExtra',1)},
    {id:'a_ambar', anel:2, nome:'Âmbar', max:2, custo:[13,27], req:['a_veia'],
     txt:n=>`Perfura ${n*2} de armadura inimiga`, ef:mod('pierce',2)},
    {id:'a_eco', anel:2, nome:'Eco', max:2, custo:[12,26], req:['a_mao'],
     txt:n=>`Começa com ${n} face ⟳ Eco gravada`, ef:campo('eco',1)},
    /* --- anel 3 --- */
    {id:'a_banco', anel:3, nome:'Banco Fundo', max:1, custo:[32], req:['a_circulo'],
     txt:()=>`Cada dado guardado no Círculo dá 2 de bloqueio em vez de 1`,
     ef:flag('circulo_dobro')},
    {id:'a_cadeia', anel:3, nome:'Cadeia', max:2, custo:[26,52], req:['a_degrau'],
     txt:n=>`Dano ×${(1+n*0.12).toFixed(2)}`, ef:mult('dmgMult',1.12)},
    {id:'a_lente', anel:3, nome:'Lente', max:1, custo:[30], req:['a_prisma'],
     txt:()=>`Vê a intenção do inimigo 1 turno à frente`, ef:campo('presagio',1)},
    {id:'a_dado', anel:3, nome:'Dado de Âmbar', max:1, custo:[30], req:['a_ambar'],
     txt:()=>`+1 dado na Bolsa inicial`, ef:campo('dadosExtra',1)},
    {id:'a_ressoa', anel:3, nome:'Ressonância', max:2, custo:[24,48], req:['a_eco'],
     txt:n=>`Cada dado guardado no Círculo dá +${n} de dano no turno seguinte`,
     ef:campo('circuloDano',1)},
    /* --- anel 4 --- */
    {id:'a_colapso', anel:4, nome:'Colapso Contido', max:1, custo:[56], req:['a_cadeia'],
     txt:()=>`Golpes que acertam TODOS batem +25%`, ef:flag('area_forte')},
    {id:'a_entropia', anel:4, nome:'Entropia Fria', max:1, custo:[48], req:['a_lente'],
     txt:()=>`Enquanto um inimigo estiver DISSOLVIDO, ele sofre +6 por golpe`,
     ef:campo('danoDissolvido',6)},
    {id:'a_infinito', anel:4, nome:'Círculo Sem Fim', max:1, custo:[52], req:['a_banco'],
     txt:()=>`Cada dado guardado no Círculo também rende 1 de ✦ Essência`,
     ef:flag('circulo_essencia')},
    {id:'a_ultimo', anel:4, nome:'Último Lance', max:1, custo:[44], req:['a_ressoa'],
     txt:()=>`1×/combate: re-rola TODOS os dados de graça`, ef:campo('ultimoLance',1)},
    {id:'a_singular', anel:4, nome:'Singularidade', max:1, custo:[68], req:['a_colapso','a_infinito'],
     txt:()=>`+25 de HP máximo e o primeiro golpe de cada combate perfura tudo`,
     ef:(A,n)=>{ A.mods.hpBonus=(A.mods.hpBonus||0)+25; A.flags.add('primeiro_perfura'); }},
    /* --- vindos do tronco antigo, agora com dono --- */
    {id:'a_espolio', anel:1, nome:'Cálculo', max:3, custo:[6,13,23],
     txt:n=>`+${n*25}% de Ecos ganhos na descida`, ef:campo('ecoMult',25)},
    {id:'a_colecao', anel:2, nome:'Coleção', max:3, custo:[11,23,38], req:['a_veia'],
     txt:n=>`Começa a descida com ${n} relíquia${n>1?'s':''} comum`, ef:campo('reliquias',1)},
    {id:'a_escolha', anel:3, nome:'Leitura', max:2, custo:[20,40], req:['a_colecao'],
     txt:n=>`${3+n} opções de recompensa a cada andar`, ef:campo('opcoes',1)},
    {id:'a_coroa', anel:4, nome:'Coroa Fraturada', max:1, custo:[42], req:['a_escolha'],
     txt:()=>`Libera a 4ª habilidade: Prisma (dissolve tudo e guarda 2 dados)`,
     ef:campo('quarta',1)},
  ]},

/* ================= ◈ A ORÁCULA DO FIO — O TEAR =================
   Ela REESCREVE o dado até ele caber. A árvore paga por controlar a
   rolagem: curinga, ajuste, travar dados e marcar alvos. */
oracula: { nome:'O TEAR', glifo:'◈', cor:'#b08a2e',
  lema:'O jogo é sobre sorte. Ela decidiu que sorte não existe.',
  nos:[
    /* --- anel 1 --- */
    {id:'o_linha', anel:1, nome:'Linha Firme', max:3, custo:[4,9,16],
     txt:n=>`+${n*10} de HP máximo`, ef:mod('hpBonus',10)},
    {id:'o_agulha', anel:1, nome:'Agulha de Osso', max:3, custo:[5,11,19],
     txt:n=>`+${n} de dano em todo golpe`, ef:mod('dmgFlat',1)},
    {id:'o_novelo', anel:1, nome:'Novelo', max:2, custo:[7,16],
     txt:n=>`+${n} re-rolagem por combate`, ef:mod('rerollBonus',1)},
    {id:'o_veu', anel:1, nome:'Véu', max:2, custo:[6,14],
     txt:n=>`Começa cada combate com ${n*5} de bloqueio`, ef:start('block',5)},
    {id:'o_presa', anel:1, nome:'Presságio Curto', max:1, custo:[9],
     txt:()=>`Vê a intenção do inimigo 1 turno à frente`, ef:campo('presagio',1)},
    /* --- anel 2 --- */
    {id:'o_curinga', anel:2, nome:'Fio Solto', max:2, custo:[16,34], req:['o_novelo'],
     txt:n=>`Começa com ${n} face ◈ Curinga gravada`, ef:campo('curinga',1)},
    {id:'o_polegar', anel:2, nome:'Polegar Torto', max:2, custo:[13,28], req:['o_agulha'],
     txt:n=>`${n}×/turno: empurra um dado em ±1`, ef:campo('polegar',1)},
    {id:'o_trava', anel:2, nome:'Nó Cego', max:2, custo:[14,29], req:['o_veu'],
     txt:n=>`Trava ${n} dado${n>1?'s':''} entre turnos (eles não re-rolam)`,
     ef:campo('travaDados',1)},
    {id:'o_olho', anel:2, nome:'Olho de Vidro', max:1, custo:[18], req:['o_presa'],
     txt:()=>`Um dado da mão sempre vem no melhor valor dele`, ef:flag('prever')},
    {id:'o_dedal', anel:2, nome:'Dedal', max:2, custo:[13,27], req:['o_linha'],
     txt:n=>`Perfura ${n*2} de armadura inimiga`, ef:mod('pierce',2)},
    /* --- anel 3 --- */
    {id:'o_tear', anel:3, nome:'Tear Firme', max:1, custo:[30], req:['o_polegar'],
     txt:()=>`O Polegar passa a empurrar ±2 em vez de ±1`, ef:flag('polegar_forte')},
    {id:'o_marca', anel:3, nome:'Marca Funda', max:2, custo:[26,52], req:['o_dedal'],
     txt:n=>`Alvo MARCADO sofre ×${(1.5+n*0.25).toFixed(2)} em vez de ×1,5`,
     ef:campo('marcaExtra',25)},
    {id:'o_fuso', anel:3, nome:'Fuso', max:1, custo:[30], req:['o_curinga'],
     txt:()=>`+1 dado na Bolsa inicial`, ef:campo('dadosExtra',1)},
    {id:'o_sorte', anel:3, nome:'Sorte Roubada', max:2, custo:[22,44], req:['o_olho'],
     txt:n=>`A Pena de Sorte dispara com ${3-n} rolagem${3-n>1?'ns':''} ruim`,
     ef:campo('pity',1)},
    {id:'o_trama', anel:3, nome:'Trama', max:2, custo:[25,50], req:['o_trava'],
     txt:n=>`Dano ×${(1+n*0.11).toFixed(2)}`, ef:mult('dmgMult',1.11)},
    /* --- anel 4 --- */
    {id:'o_sentenca', anel:4, nome:'Sentença', max:1, custo:[50], req:['o_marca'],
     txt:()=>`Todo golpe seu MARCA o alvo se ele ainda não estiver marcado`,
     ef:flag('marca_sempre')},
    {id:'o_destino', anel:4, nome:'Fio do Destino', max:1, custo:[46], req:['o_tear'],
     txt:()=>`O ◈ Curinga também abre fechadura de SÍMBOLO (⚔ 🛡 ✦)`,
     ef:flag('curinga_simbolo')},
    {id:'o_roca', anel:4, nome:'Roca', max:1, custo:[52], req:['o_sorte'],
     txt:()=>`Re-rolagens não acabam: a primeira de cada turno é de graça`,
     ef:flag('reroll_turno_gratis')},
    {id:'o_escolhida', anel:4, nome:'Mão Escolhida', max:1, custo:[40], req:['o_trama'],
     txt:()=>`Re-rolagem CIRÚRGICA: só os dados que você marcar rolam de novo`,
     ef:campo('rerollEscolhido',1)},
    {id:'o_mundo', anel:4, nome:'Novelo do Mundo', max:1, custo:[66], req:['o_destino','o_roca'],
     txt:()=>`+25 de HP máximo e o Curinga assume QUALQUER valor, sem teto`,
     ef:(A,n)=>{ A.mods.hpBonus=(A.mods.hpBonus||0)+25; A.flags.add('curinga_livre'); }},
    /* --- vindos do tronco antigo, agora com dono --- */
    {id:'o_espolio', anel:1, nome:'Barganha', max:3, custo:[6,13,23],
     txt:n=>`+${n*25}% de Ecos ganhos na descida`, ef:campo('ecoMult',25)},
    {id:'o_colecao', anel:2, nome:'Herança', max:3, custo:[11,23,38], req:['o_linha'],
     txt:n=>`Começa a descida com ${n} relíquia${n>1?'s':''} comum`, ef:campo('reliquias',1)},
    {id:'o_escolha', anel:3, nome:'Visão Ampla', max:2, custo:[20,40], req:['o_colecao'],
     txt:n=>`${3+n} opções de recompensa a cada andar`, ef:campo('opcoes',1)},
    {id:'o_coroa', anel:4, nome:'Coroa do Fio', max:1, custo:[42], req:['o_escolha'],
     txt:()=>`Libera a 4ª habilidade: Tapeçaria (crava dois dados e fere todos)`,
     ef:campo('quarta',1)},
  ]},
};

/* ---------- leitura ---------- */
export const nosDaClasse = cid => (ARVORES[cid]?.nos) || [];
export const noPorId = (cid,id) => nosDaClasse(cid).find(n=>n.id===id);
export const custoDoNo = (no, nivel) => no.custo[Math.min(nivel, no.custo.length-1)];

/* quanto já foi construído nesta árvore (para a barra de progresso) */
export function progresso(cofre, cid){
  const nos = nosDaClasse(cid);
  const tot = nos.reduce((a,n)=>a+n.max, 0);
  const meu = nos.reduce((a,n)=>a + nivelPassiva(cofre,cid,n.id), 0);
  return { meu, tot, pct: tot? Math.round(100*meu/tot) : 0 };
}
export const nivelPassiva = (cofre,cid,id) =>
  ((cofre.passivas||{})[cid]||{})[id] || 0;

export function disponivelPassiva(cofre, cid, no){
  if(nivelPassiva(cofre,cid,no.id) >= no.max) return false;
  for(const r of (no.req||[])) if(nivelPassiva(cofre,cid,r) < 1) return false;
  return true;
}
export function comprarPassiva(cofre, cid, no){
  const nv = nivelPassiva(cofre,cid,no.id);
  if(nv >= no.max || !disponivelPassiva(cofre,cid,no)) return false;
  const c = custoDoNo(no, nv);
  if((cofre.ecos||0) < c) return false;
  cofre.ecos -= c;
  cofre.passivas = cofre.passivas || {};
  cofre.passivas[cid] = cofre.passivas[cid] || {};
  cofre.passivas[cid][no.id] = nv + 1;
  return true;
}

/* ===================================================================
   O QUE A ÁRVORE ENTREGA À RUN. Sai no formato que o motor já executa:
   uma passiva sintética igual às relíquias, mais os `campos`, que são os
   ajustes que vivem no jogador (dados extras, polegar, gazua...).
   =================================================================== */
export function bonusDaClasse(cofre, cid){
  const A = { mods:{}, flags:new Set(), start:{}, onKill:{}, onRoll:[], campos:{} };
  for(const no of nosDaClasse(cid)){
    const n = nivelPassiva(cofre, cid, no.id);
    if(n > 0) no.ef(A, n);
  }
  return A;
}
