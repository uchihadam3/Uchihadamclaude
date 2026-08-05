/* ========================================================================
   AS QUATRO CLASSES (§7) — cada uma joga uma MATEMÁTICA diferente.
   Efeitos são DADOS (DSL), interpretados pelo motor. Nada hardcoded.
   Contexto das expressões: sum, max, min, count, val, blades, ess, hp
   ===================================================================== */
import { makeDie } from './dice.js';
import { face, numFaces } from './faces.js';

/* ação universal — todo jogador SEMPRE tem uma ação sem requisito (§5.4) */
export const RESPIRAR = {
  id:'respirar', nome:'Respirar', custo:'descarte 1 dado',
  req:{t:'any',count:1}, desc:'Descarte 1 dado, ganhe 3 de bloqueio.',
  eff:[{op:'block', amt:'3'}],
};

export const CLASSES = {
  carrasco: {
    id:'carrasco', nome:'O Carrasco', glifo:'⚒', cor:'#c0392b',
    chave:'ARROMBA a fechadura na marra — força bruta abre qualquer regra',
    mat:'matemática de valor alto',
    fantasia:'Cada rolagem é uma aposta com o próprio sangue.',
    hp:70, rerolls:1,
    bag: ()=> Array.from({length:4}, ()=> makeDie('d6','osso')),
    passiva:{ id:'sobrecarga', nome:'Sobrecarga',
      desc:'Aumente o valor de um dado em +1 pagando 2 de HP. Sem limite.' },
    sobra:{ id:'retaguarda', desc:'Dados não usados viram dano de retaguarda (metade do valor).' },
    skills:[
      { id:'decapitar', nome:'Decapitar', req:{t:'min',v:5},
        desc:'O machado ARROMBA a fechadura do alvo pelo resto do turno e decapita. Executa abaixo de 18% de HP.',
        eff:[{op:'arrombar',tgt:'chosen'},{op:'dmg',tgt:'chosen',amt:'val*3+6'},
             {op:'exec',tgt:'chosen',pct:0.18}] },
      { id:'furia', nome:'Fúria Cega', req:{t:'sum',min:11},
        desc:'Gira o machado e atinge TODOS. Cego: não abre fechadura nenhuma.',
        eff:[{op:'dmg',tgt:'all',amt:'sum'}] },
      { id:'muralha', nome:'Muralha', req:{t:'each',size:2,of:{t:'min',v:3}},
        desc:'Bloqueio alto e Espinhos até o próximo turno.',
        eff:[{op:'block',amt:'sum*2'},{op:'selfStatus',st:'espinhos',n:'3'}] },
      { id:'carniceiro', nome:'Açougueiro', req:{t:'set',size:2}, unlock:'coroa_carrasco',
        desc:'Arromba e dilacera: dano triplo no alvo. Você sangra 4.',
        eff:[{op:'arrombar',tgt:'chosen'},{op:'dmg',tgt:'chosen',amt:'sum*3'},{op:'selfdmg',amt:'4'}] },
      /* ===== A TRILHA: liberadas fechando masmorras (§4.4) =====
         Cada uma leva a CHAVE da classe um degrau adiante. Não é "o mesmo
         golpe com número maior": o Carrasco passa de arrombar UM a arrombar
         TODOS, e por fim a arrombar antes mesmo de bater. */
      { id:'quebra_ossos', nome:'Quebra-Ossos', req:{t:'min',v:4}, unlock:'m1',
        desc:'ARROMBA a fechadura de TODOS por este turno. Dano moderado no alvo.',
        eff:[{op:'arrombar',tgt:'all'},{op:'dmg',tgt:'chosen',amt:'val*2+4'}] },
      { id:'guilhotina', nome:'Guilhotina', req:{t:'sum',min:14}, unlock:'m3',
        desc:'Arromba e desce inteira: dano pesado que IGNORA armadura e bloqueio.',
        eff:[{op:'arrombar',tgt:'chosen'},{op:'dmg',tgt:'chosen',amt:'sum*4',pierce:true},
             {op:'selfdmg',amt:'6'}] },
      { id:'cadafalso', nome:'Cadafalso', req:{t:'each',size:3,of:{t:'min',v:4}}, unlock:'m5',
        desc:'O machado cai sobre o campo inteiro, arrombando tudo. Espinhos e bloqueio pra segurar o troco.',
        eff:[{op:'arrombar',tgt:'all'},{op:'dmg',tgt:'all',amt:'sum*2'},
             {op:'block',amt:'sum'},{op:'selfStatus',st:'espinhos',n:'4'}] },
    ],
  },

  lamina: {
    id:'lamina', nome:'A Lâmina-Sombra', glifo:'🗡', cor:'#6c3fa0',
    chave:'CONTORNA: veneno e sangramento atravessam qualquer fechadura',
    mat:'matemática de conjuntos (pares, trincas)',
    fantasia:'Ninguém morre de um golpe seu. Morre do centésimo.',
    hp:60, rerolls:2,
    bag: ()=> Array.from({length:5}, ()=> makeDie('d4','osso')),
    passiva:{ id:'trapaca', nome:'Trapaça',
      desc:'1×/turno: vira um dado para a face OPOSTA (num d4: 1↔4, 2↔3).' },
    sobra:{ id:'acumulo', desc:'Cada dado não usado acumula +1 de veneno no alvo mais fraco.' },
    skills:[
      { id:'milcortes', nome:'Mil Cortes', req:{t:'set',size:2},
        desc:'N golpes pequenos, onde N = o valor do par. Contra Casca Fina é a melhor arma.',
        eff:[{op:'hits',tgt:'chosen',times:'val',amt:'3+blades'}] },
      { id:'veneno', nome:'Veneno Sutil', req:{t:'set',size:3},
        desc:'Veneno pesado no alvo e 2 em todos os outros. VENENO IGNORA FECHADURA — corrói o travado.',
        eff:[{op:'status',tgt:'chosen',st:'veneno',n:'val*3'},{op:'status',tgt:'all',st:'veneno',n:'2'}] },
      { id:'sumir', nome:'Sumir', req:{t:'any',count:1},
        desc:'Some nas sombras: sofre 65% menos dano e deixa o alvo sangrando 2.',
        eff:[{op:'selfStatus',st:'invisivel',n:'1'},{op:'status',tgt:'chosen',st:'sangramento',n:'2'},
             {op:'block',amt:'2'}] },
      { id:'enxame', nome:'Enxame de Lâminas', req:{t:'set',size:4}, unlock:'coroa_lamina',
        desc:'Golpeia TODOS várias vezes e envenena TODOS.',
        eff:[{op:'hits',tgt:'all',times:'val',amt:'2+blades'},{op:'status',tgt:'all',st:'veneno',n:'3'}] },
      /* A TRILHA: o veneno já ignora fechadura — o que cresce é a ESCALA
         e a sobrevivência de quem precisa de tempo para o veneno agir. */
      { id:'garganta', nome:'Garganta Aberta', req:{t:'set',size:2}, unlock:'m1',
        desc:'Sangramento pesado no alvo — e ele NÃO decai enquanto você estiver invisível.',
        eff:[{op:'status',tgt:'chosen',st:'sangramento',n:'val*2+2'},
             {op:'selfStatus',st:'invisivel',n:'1'}] },
      { id:'nevoa', nome:'Névoa de Bílis', req:{t:'any',count:3}, unlock:'m3',
        desc:'Envenena TODOS pesado e some: você sofre 65% menos dano no turno deles.',
        eff:[{op:'status',tgt:'all',st:'veneno',n:'count*3'},
             {op:'selfStatus',st:'invisivel',n:'1'},{op:'block',amt:'sum'}] },
      { id:'ceifa', nome:'Ceifa Silenciosa', req:{t:'set',size:3}, unlock:'m5',
        desc:'Converte o veneno em morte: cada inimigo envenenado sofre AGORA o dobro do veneno acumulado.',
        eff:[{op:'ceifar',tgt:'all',amt:'2'},{op:'status',tgt:'all',st:'veneno',n:'val'}] },
    ],
  },

  arcanista: {
    id:'arcanista', nome:'O Arcanista Fraturado', glifo:'✦', cor:'#2f7ec4',
    chave:'DISSOLVE a regra por turnos inteiros — e ignora tudo no Colapso',
    mat:'matemática de sequências',
    fantasia:'Paciência explosiva. Sofre no turno 1, apaga a tela no turno 4.',
    hp:66, rerolls:2,
    bag: ()=> [ makeDie('d6','osso'), makeDie('d8','ambar'),
                makeDie('d8','osso'), makeDie('d10','ambar') ],
    passiva:{ id:'canalizacao', nome:'Canalização',
      desc:'Dados guardados sem uso vão para o CÍRCULO e permanecem no turno seguinte.' },
    sobra:{ id:'circulo', desc:'Sobra é guardada no Círculo (banking) em vez de perdida.' },
    skills:[
      { id:'raio', nome:'Raio Encadeado', req:{t:'seq',size:2},
        desc:'DISSOLVE a fechadura do alvo por 1 turno, fere e salta no seguinte.',
        eff:[{op:'dissolver',tgt:'chosen',n:'1'},{op:'dmg',tgt:'chosen',amt:'sum*3'},{op:'dmg',tgt:'next',amt:'sum*2'},
             {op:'block',amt:'sum'},{op:'essence',n:'1'}] },
      { id:'nova', nome:'Nova Gélida', req:{t:'seq',size:3},
        desc:'DISSOLVE a fechadura de TODOS por 2 turnos e congela os dados deles. Dano em todos.',
        eff:[{op:'dissolver',tgt:'all',n:'2'},{op:'dmg',tgt:'all',amt:'sum*3'},
             {op:'status',tgt:'all',st:'congelado',n:'1'},{op:'block',amt:'sum*2'}] },
      { id:'colapso', nome:'Colapso', req:{t:'seq',size:4},
        desc:'CATACLISMA. Dano devastador em todos, ignorando fechadura e armadura.',
        eff:[{op:'dmg',tgt:'all',amt:'sum*5',pierce:true},{op:'block',amt:'sum'}] },
      /* A TRILHA: dissolver a regra por mais tempo, e com sequência menor —
         a classe sofre por depender de sequência, então o que cresce é a
         chance de montar uma. */
      { id:'fenda', nome:'Fenda', req:{t:'seq',size:2}, unlock:'m1',
        desc:'DISSOLVE a fechadura do alvo por 2 turnos e guarda 1 dado no Círculo.',
        eff:[{op:'dissolver',tgt:'chosen',n:'2'},{op:'dmg',tgt:'chosen',amt:'sum*2'},
             {op:'bank',n:'1'},{op:'essence',n:'1'}] },
      { id:'entropia', nome:'Entropia', req:{t:'seq',size:3}, unlock:'m3',
        desc:'Apaga a regra de TODOS por 3 turnos. Enquanto durar, qualquer dado fere qualquer um.',
        eff:[{op:'dissolver',tgt:'all',n:'3'},{op:'dmg',tgt:'all',amt:'sum*2'},
             {op:'block',amt:'sum'}] },
      { id:'singularidade', nome:'Singularidade', req:{t:'seq',size:4}, unlock:'m5',
        desc:'O Colapso levado ao fim: dano imenso em todos, perfurando tudo, e o Círculo guarda 3 dados.',
        eff:[{op:'dmg',tgt:'all',amt:'sum*6',pierce:true},{op:'bank',n:'3'}] },
      { id:'prisma', nome:'Prisma', req:{t:'seq',size:5}, unlock:'coroa_arcanista',
        desc:'Dissolve tudo, fere todos e devolve 2 dados ao Círculo.',
        eff:[{op:'dissolver',tgt:'all',n:'3'},{op:'dmg',tgt:'all',amt:'sum*3'},{op:'bank',n:'2'}] },
    ],
  },

  oracula: {
    id:'oracula', nome:'A OráculA do Fio', glifo:'◈', cor:'#b08a2e',
    chave:'REESCREVE o dado até ele caber na fechadura',
    mat:'matemática de manipulação/controle',
    fantasia:'O jogo é sobre sorte. Ela decidiu que sorte não existe.',
    hp:62, rerolls:2,
    bag: ()=> [ makeDie('d6','osso'), makeDie('d8','osso'),
                makeDie('d8','metal'),
                makeDie('d10','osso', [...numFaces(9), face('wild',0)]) ],
    passiva:{ id:'prever', nome:'Prever',
      desc:'Veja o próximo dado antes de rolar e aceite ou rejeite. Trave 1 dado entre turnos.' },
    sobra:{ id:'fio', desc:'Cada dado não usado dá 1 de bloqueio e 1 de Essência a cada 2.' },
    skills:[
      { id:'tecer', nome:'Tecer', req:{t:'any',count:2},
        desc:'Transforma um dado da mão em ◈ Curinga e AJUSTA outro em ±2 para abrir a fechadura do alvo.',
        /* era block:sum*2 — com req 'any 2' (SEMPRE satisfeito) e os dados
           grandes dela isso era ~20-30 de bloqueio incondicional por turno.
           A OráculA não sobrevivia ao puzzle, ela ignorava o dano: 49% de
           vitória contra ~19% das outras três. */
        eff:[{op:'wildify',n:'1'},{op:'ajustar',n:'1',passo:'2'},{op:'block',amt:'sum'},{op:'essence',n:'1'}] },
      { id:'julgamento', nome:'Julgamento', req:{t:'sumExact',v:7},
        desc:'Dano imenso e determinístico. Perfura fechadura, bloqueio e armadura.',
        eff:[{op:'dmg',tgt:'chosen',amt:'28+sum*4',pierce:true}] },
      { id:'fio', nome:'Fio do Destino', req:{t:'symbol',s:'essence'},
        desc:'Devolve o último ataque inimigo, estala em TODOS, MARCA o alvo e ajusta 2 dados da mão.',
        eff:[{op:'copyLast',tgt:'chosen'},{op:'dmg',tgt:'all',amt:'11'},{op:'marcar',tgt:'chosen'},
             {op:'ajustar',n:'2',passo:'1'}] },
      /* A TRILHA: reescrever mais dados, e por fim escolher o número. */
      { id:'urdidura', nome:'Urdidura', req:{t:'any',count:2}, unlock:'m1',
        desc:'CRAVA um dado da mão no valor que abre a fechadura do alvo, e bloqueia.',
        eff:[{op:'definir',n:'1'},{op:'block',amt:'sum'},{op:'essence',n:'1'}] },
      { id:'sentenca', nome:'Sentença', req:{t:'sumExact',v:11}, unlock:'m3',
        desc:'Como o Julgamento, mais fundo: dano enorme que perfura tudo e MARCA o alvo.',
        eff:[{op:'dmg',tgt:'chosen',amt:'34+sum*4',pierce:true},{op:'marcar',tgt:'chosen'}] },
      { id:'novelo', nome:'Novelo do Mundo', req:{t:'each',size:3,of:{t:'parity',p:'even'}}, unlock:'m5',
        desc:'Reescreve a mesa: CRAVA três dados no valor que você precisa e fere todos.',
        eff:[{op:'definir',n:'3'},{op:'dmg',tgt:'all',amt:'sum*2'},{op:'block',amt:'sum'}] },
      { id:'tapecaria', nome:'Tapeçaria', req:{t:'each',size:3,of:{t:'parity',p:'odd'}}, unlock:'coroa_oracula',
        desc:'CRAVA dois dados da mão no valor exato que abre a fechadura do alvo. Dano em todos.',
        eff:[{op:'definir',n:'2'},{op:'dmg',tgt:'all',amt:'sum*2'}] },
    ],
  },
};
export const CLASS_LIST = Object.values(CLASSES);
