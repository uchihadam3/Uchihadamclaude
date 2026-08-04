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
    mat:'matemática de valor alto',
    fantasia:'Cada rolagem é uma aposta com o próprio sangue.',
    hp:70, rerolls:1,
    bag: ()=> Array.from({length:4}, ()=> makeDie('d6','osso')),
    passiva:{ id:'sobrecarga', nome:'Sobrecarga',
      desc:'Aumente o valor de um dado em +1 pagando 2 de HP. Sem limite.' },
    sobra:{ id:'retaguarda', desc:'Dados não usados viram dano de retaguarda (metade do valor).' },
    skills:[
      { id:'decapitar', nome:'Decapitar', req:{t:'min',v:5},
        desc:'Dano pesado. Executa inimigos abaixo de 15% de HP.',
        eff:[{op:'dmg',tgt:'chosen',amt:'val*3+4'},{op:'exec',tgt:'chosen',pct:0.15}] },
      { id:'muralha', nome:'Muralha', req:{t:'each',size:2,of:{t:'min',v:3}},
        desc:'Bloqueio alto e Espinhos até o próximo turno.',
        eff:[{op:'block',amt:'sum*2'},{op:'selfStatus',st:'espinhos',n:'3'}] },
      { id:'furia', nome:'Fúria Cega', req:{t:'sum',min:12},
        desc:'Atinge TODOS os inimigos.',
        eff:[{op:'dmg',tgt:'all',amt:'sum'}] },
      { id:'carniceiro', nome:'Açougueiro', req:{t:'set',size:2}, unlock:'coroa_carrasco',
        desc:'Dano dobrado no alvo e você sangra 3.',
        eff:[{op:'dmg',tgt:'chosen',amt:'sum*3'},{op:'selfdmg',amt:'3'}] },
    ],
  },

  lamina: {
    id:'lamina', nome:'A Lâmina-Sombra', glifo:'🗡', cor:'#6c3fa0',
    mat:'matemática de conjuntos (pares, trincas)',
    fantasia:'Ninguém morre de um golpe seu. Morre do centésimo.',
    hp:60, rerolls:2,
    bag: ()=> Array.from({length:5}, ()=> makeDie('d4','osso')),
    passiva:{ id:'trapaca', nome:'Trapaça',
      desc:'1×/turno: vira um dado para a face OPOSTA (num d4: 1↔4, 2↔3).' },
    sobra:{ id:'acumulo', desc:'Cada dado não usado acumula +1 de veneno no alvo mais fraco.' },
    skills:[
      { id:'milcortes', nome:'Mil Cortes', req:{t:'set',size:2},
        desc:'Golpeia N vezes, onde N = valor do par.',
        eff:[{op:'hits',tgt:'chosen',times:'val',amt:'3+blades'}] },
      { id:'veneno', nome:'Veneno Sutil', req:{t:'set',size:3},
        desc:'Aplica uma pilha massiva de veneno.',
        eff:[{op:'status',tgt:'chosen',st:'veneno',n:'val*3'}] },
      { id:'sumir', nome:'Sumir', req:{t:'any',count:1},
        desc:'Invisível por 1 turno: sofre 65% menos dano.',
        eff:[{op:'selfStatus',st:'invisivel',n:'1'},{op:'block',amt:'2'}] },
      { id:'enxame', nome:'Enxame de Lâminas', req:{t:'set',size:4}, unlock:'coroa_lamina',
        desc:'Golpeia TODOS várias vezes.',
        eff:[{op:'hits',tgt:'all',times:'val',amt:'2+blades'}] },
    ],
  },

  arcanista: {
    id:'arcanista', nome:'O Arcanista Fraturado', glifo:'✦', cor:'#2f7ec4',
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
        desc:'Dano que salta para o inimigo seguinte.',
        eff:[{op:'dmg',tgt:'chosen',amt:'sum*3'},{op:'dmg',tgt:'next',amt:'sum*2'},{op:'block',amt:'sum'},{op:'essence',n:'1'}] },
      { id:'nova', nome:'Nova Gélida', req:{t:'seq',size:3},
        desc:'Dano em todos e CONGELA os dados do inimigo.',
        eff:[{op:'dmg',tgt:'all',amt:'sum*3'},{op:'status',tgt:'all',st:'congelado',n:'1'},{op:'block',amt:'sum*2'}] },
      { id:'colapso', nome:'Colapso', req:{t:'seq',size:4},
        desc:'CATACLISMA. Dano devastador em todos.',
        eff:[{op:'dmg',tgt:'all',amt:'sum*5'},{op:'block',amt:'sum'}] },
      { id:'prisma', nome:'Prisma', req:{t:'seq',size:5}, unlock:'coroa_arcanista',
        desc:'Dano enorme e devolve 2 dados ao Círculo.',
        eff:[{op:'dmg',tgt:'all',amt:'sum*3'},{op:'bank',n:'2'}] },
    ],
  },

  oracula: {
    id:'oracula', nome:'A OráculA do Fio', glifo:'◈', cor:'#b08a2e',
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
        desc:'Transforma um dado da Bolsa em ◈ Curinga permanente neste combate.',
        eff:[{op:'wildify',n:'1'},{op:'block',amt:'sum*2'},{op:'essence',n:'1'}] },
      { id:'julgamento', nome:'Julgamento', req:{t:'sumExact',v:7},
        desc:'Dano IMENSO e determinístico. Ignora bloqueio e armadura.',
        eff:[{op:'dmg',tgt:'chosen',amt:'28+sum*4',pierce:true}] },
      { id:'fio', nome:'Fio do Destino', req:{t:'symbol',s:'essence'},
        desc:'Copia o último ataque inimigo e devolve.',
        eff:[{op:'copyLast',tgt:'chosen'},{op:'dmg',tgt:'all',amt:'12'}] },
      { id:'tapecaria', nome:'Tapeçaria', req:{t:'each',size:3,of:{t:'parity',p:'odd'}}, unlock:'coroa_oracula',
        desc:'Rouba um dado do inimigo e o usa contra ele.',
        eff:[{op:'stealDie'},{op:'dmg',tgt:'all',amt:'sum*2'}] },
    ],
  },
};
export const CLASS_LIST = Object.values(CLASSES);
