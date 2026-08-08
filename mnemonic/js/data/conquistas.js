/* ========================================================================
   AS CONQUISTAS — os objetivos que sobrevivem à run.

   Um roguelike pede duas metas ao mesmo tempo: a de hoje (chegar no chefe) e
   a de sempre (ver tudo o que o jogo tem). Sem a segunda, quem perde três
   runs seguidas não tem nenhum motivo para abrir a quarta — não avançou em
   NADA. As conquistas são essa segunda meta, e por isso quase nenhuma delas
   pede vitória: fechar quinhentos pares, ver as treze famílias e limpar um
   tabuleiro inteiro são coisas que acontecem enquanto se perde.

   REGRA DE PROJETO: nenhuma conquista dá vantagem dentro da partida. Se
   desse, quem joga há mais tempo jogaria um jogo mais fácil, e o ranking
   mundial — que é o mesmo para todos — deixaria de comparar a mesma coisa.
   Elas valem o que uma medalha vale: você sabe que fez.

   `prova` recebe uma SITUAÇÃO e devolve verdadeiro ou falso. Nada de estado
   escondido aqui dentro: este arquivo é uma tabela, e dá para conferir cada
   linha dela com um teste que monta a situação na mão.

     s.p     — o perfil da vida inteira (js/ui/perfil.js)
     s.viu   — (capítulo, id) → já encontrou aquilo?
     s.quantos(capítulo) → quantos daquele capítulo já viu
     s.total(capítulo)   → quantos existem
   ===================================================================== */

/* os degraus servem à tela: uma vitrine de trinta medalhas iguais não se lê,
   e a cor é o que separa "fiz sem querer" de "isso custou" */
export const DEGRAUS = {
  bronze: { nome:'bronze', cor:'#c98a4b' },
  prata:  { nome:'prata',  cor:'#c3ccdd' },
  ouro:   { nome:'ouro',   cor:'#ffc23c' },
  lenda:  { nome:'lenda',  cor:'#b478ff' },
};

export const CONQUISTAS = [
  /* ---------- os primeiros passos ---------- */
  { id:'primeira_sala', nome:'Primeira porta', g:'bronze', ico:'combate',
    d:'Vencer uma sala.',
    prova: s => s.p.salas >= 1 },
  { id:'primeiro_mundo', nome:'Um mundo atrás', g:'bronze', ico:'fogueira',
    d:'Passar de um mundo inteiro.',
    prova: s => s.p.mundoMaximo >= 2 },
  { id:'dez_runs', nome:'Insistência', g:'bronze', ico:'semente',
    d:'Começar dez runs.',
    prova: s => s.p.runs >= 10 },

  /* ---------- a memória, que é o assunto do jogo ---------- */
  { id:'combo_oito', nome:'Corrente de oito', g:'bronze', ico:'combo',
    d:'Chegar a oito pares seguidos sem errar.',
    prova: s => s.p.maiorCombo >= 8 },
  { id:'combo_doze', nome:'Corrente de doze', g:'ouro', ico:'raio',
    d:'Chegar a doze pares seguidos sem errar.',
    prova: s => s.p.maiorCombo >= 12 },
  { id:'sala_limpa', nome:'Mesa vazia', g:'bronze', ico:'feito',
    d:'Terminar uma sala virando a última carta do tabuleiro.',
    prova: s => s.p.limpas >= 1 },
  { id:'vinte_limpas', nome:'Faxina', g:'prata', ico:'orfa',
    d:'Limpar vinte tabuleiros até a última carta.',
    prova: s => s.p.limpas >= 20 },
  { id:'sem_erro', nome:'Sem um tropeço', g:'prata', ico:'vista',
    d:'Vencer uma sala inteira sem errar uma vez.',
    prova: s => s.p.semErro >= 1 },
  { id:'dez_sem_erro', nome:'Cabeça fria', g:'ouro', ico:'conhecida',
    d:'Vencer dez salas sem errar.',
    prova: s => s.p.semErro >= 10 },
  { id:'mil_pares', nome:'Mil pares', g:'prata', ico:'normal',
    d:'Fechar mil pares, somando todas as runs.',
    prova: s => s.p.pares >= 1000 },

  /* ---------- o placar ---------- */
  { id:'cem_mil', nome:'Seis dígitos', g:'bronze', ico:'ouro',
    d:'Terminar uma run com 100 mil pontos.',
    prova: s => s.p.melhorRun >= 100000 },
  { id:'meio_milhao', nome:'Meio milhão', g:'prata', ico:'cristal',
    d:'Terminar uma run com 500 mil pontos.',
    prova: s => s.p.melhorRun >= 500000 },
  { id:'milhao', nome:'Sete dígitos', g:'lenda', ico:'lendaria',
    d:'Terminar uma run com um milhão de pontos.',
    prova: s => s.p.melhorRun >= 1000000 },
  { id:'sala_gorda', nome:'Uma sala só', g:'ouro', ico:'elite',
    d:'Tirar 50 mil pontos de uma única sala.',
    prova: s => s.p.melhorSala >= 50000 },
  { id:'cem_salas', nome:'Cem portas', g:'prata', ico:'portal',
    d:'Vencer cem salas, somando todas as runs.',
    prova: s => s.p.salas >= 100 },

  /* ---------- a run inteira ---------- */
  { id:'venceu', nome:'Você lembrou', g:'ouro', ico:'meta',
    d:'Vencer uma run: seis mundos, seis chefes.',
    prova: s => s.p.vitorias >= 1 },
  { id:'venceu_cinco', nome:'De novo, e de novo', g:'lenda', ico:'fantasma',
    d:'Vencer cinco runs.',
    prova: s => s.p.vitorias >= 5 },
  { id:'tres_classes', nome:'Três cabeças', g:'prata', ico:'evento',
    d:'Vencer uma run com três classes diferentes.',
    prova: s => Object.keys(s.p.classes).length >= 3 },
  { id:'todas_classes', nome:'Toda a mesa', g:'lenda', ico:'curinga',
    d:'Vencer uma run com cada uma das oito classes.',
    prova: s => Object.keys(s.p.classes).length >= s.total('classe') },
  { id:'diaria', nome:'A run de hoje', g:'bronze', ico:'virada',
    d:'Jogar a run diária.',
    prova: s => s.p.diarias >= 1 },
  { id:'publicou', nome:'No quadro', g:'bronze', ico:'prova',
    d:'Publicar um placar no ranking mundial.',
    prova: s => s.p.publicados >= 1 },

  /* ---------- a coleção ----------
     Estas são as que sustentam a segunda meta: elas contam o que você
     ENCONTROU, e encontrar não depende de vencer. */
  { id:'todas_cartas', nome:'O baralho inteiro', g:'ouro', ico:'camaleao',
    d:'Encontrar os dezoito tipos de carta.',
    prova: s => s.quantos('carta') >= s.total('carta') },
  { id:'todas_familias', nome:'Treze desenhos', g:'ouro', ico:'mimic',
    d:'Encontrar as treze famílias.',
    prova: s => s.quantos('familia') >= s.total('familia') },
  { id:'vinte_reliquias', nome:'Colecionador', g:'prata', ico:'reliquia',
    d:'Encontrar vinte relíquias diferentes.',
    prova: s => s.quantos('reliquia') >= 20 },
  { id:'metade_reliquias', nome:'Meia biblioteca', g:'ouro', ico:'loja',
    d:'Encontrar metade das relíquias.',
    prova: s => s.quantos('reliquia') * 2 >= s.total('reliquia') },
  { id:'todas_reliquias', nome:'A biblioteca', g:'lenda', ico:'tesouro',
    d:'Encontrar todas as relíquias do jogo.',
    prova: s => s.quantos('reliquia') >= s.total('reliquia') },
  { id:'todos_chefes', nome:'Os seis nomes', g:'ouro', ico:'chefe',
    d:'Derrubar cada um dos seis chefes.',
    prova: s => Object.keys(s.p.chefes).length >= s.total('chefe') },
];

export const POR_ID_CONQ = Object.fromEntries(CONQUISTAS.map(c => [c.id, c]));
