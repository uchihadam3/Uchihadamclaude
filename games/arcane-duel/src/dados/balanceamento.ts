/*
 * O balanceamento inteiro, em um arquivo.
 *
 * A regra é simples e vale para o projeto todo: **nenhum número mágico fora
 * daqui**. Se um valor decide quanto tempo uma luta dura, quando uma poção
 * dispara ou o que conta como desempenho excepcional, ele mora neste arquivo e
 * tem um nome. Ajustar o jogo passa a ser editar uma tabela, e não caçar
 * constantes espalhadas por quinze arquivos.
 */

export const BALANCEAMENTO = {
  /** O passo da simulação. Fixo, e é o que torna a run reproduzível pela seed. */
  passoDaSimulacaoS: 1 / 30,

  dungeon: {
    totalDeSalas: 50,
    salasPorArea: 10,
    /** As salas em que mora um boss. */
    salasDeBoss: [10, 20, 30, 40, 50],
  },

  /*
   * A duração das lutas.
   *
   * O pedido foi explícito: nada de inimigo morrendo em dois segundos. Os
   * números abaixo são o alvo, e o escalonamento de vida dos inimigos é
   * derivado deles — não o contrário.
   */
  duracaoAlvoS: {
    normal: { minimo: 10, maximo: 20 },
    elite: { minimo: 20, maximo: 30 },
    boss: { minimo: 45, maximo: 90 },
  },

  jogador: {
    /*
     * Vida e Armadura ganhas por nível.
     *
     * Os números saíram da bancada, não do chute. Com os valores antigos a
     * Vida efetiva crescia 2,2× ao longo da run enquanto o dano dos inimigos
     * crescia 5,4× — e o jogador morria na área 4 por aritmética, não por ter
     * escolhido mal. Agora os dois crescem em passo parecido.
     */
    vidaPorNivel: 15,
    armaduraPorNivel: 6,
    danoPorNivel: 2.2,
    /** A Armadura volta sozinha, devagar: ela é recurso de luta, não de run. */
    regeneracaoDeArmaduraPorS: 1.2,
    /*
     * O ataque básico é o **piso** da build.
     *
     * Ele existe para uma build sem nenhuma habilidade de dano ainda
     * conseguir matar — devagar, e perdendo, mas conseguindo. Sem esse piso,
     * uma build só de Defesa entrava em impasse: não morria nem matava, e
     * ficar preso é pior que perder.
     */
    ataqueBasico: { cooldownS: 1.4, danoRelativo: 0.8 },
    criticoBase: { chance: 0.05, multiplicador: 1.5 },
  },

  pocoes: {
    porArea: 3,
    /** Dispara sozinha abaixo desta fração de Vida. */
    gatilhoDeVida: 0.3,
    /** E cura esta fração da Vida máxima. */
    curaDaFracao: 0.4,
    /** Uma pausa curta para a poção não ser gasta em dobro no mesmo susto. */
    recargaS: 1.5,
  },

  experiencia: {
    /** EXP para sair do nível N: base + porNivel × N. */
    base: 22,
    porNivel: 11,
    /** O alvo de nível ao fim de uma run completa. Usado para conferir a curva. */
    nivelAlvoAoFim: { minimo: 20, maximo: 25 },
    nivelMaximo: 40,
  },

  inimigos: {
    /*
     * A calibração da duração das lutas.
     *
     * A base de cada inimigo em `inimigos.ts` é a **proporção** entre eles;
     * estes dois multiplicadores é que colocam a luta na faixa pedida. Foram
     * medidos contra uma build de referência na bancada: sem eles, um inimigo
     * comum caía em dois segundos e um boss em quinze.
     *
     * Boss tem multiplicador próprio porque a faixa dele é outra — 45 a 90
     * segundos contra 10 a 20 — e porque a vida escrita nos bosses já é alta.
     */
    multiplicadorDeVidaNormal: 6.2,
    multiplicadorDeVidaBoss: 3.4,

    /** Vida e dano crescem por sala, e um degrau maior a cada área. */
    vidaPorSala: 0.055,
    danoPorSala: 0.028,
    vidaPorArea: 0.2,
    danoPorArea: 0.085,
    /** Elites aparecem nestas salas dentro de cada bloco de dez. */
    salasDeElite: [5, 8],
    multiplicadorDeElite: { vida: 2.1, dano: 1.35, exp: 2.6 },
  },

  draft: {
    ativas: 4,
    passivas: 3,
    equipamentos: 3,
    opcoesPorEscolha: 3,
    /** Novas ofertas por categoria. A Forma Dourada sobe para o valor dourado. */
    rerollsPorCategoria: 2,
    rerollsDourado: 3,
  },

  /*
   * O Poder Estimado.
   *
   * Ele é uma **leitura**, não uma previsão. A revisão do conceito foi clara:
   * uma build de Poder menor com boa sinergia pode ganhar de uma de Poder
   * maior sem sinergia — então a sinergia entra com peso pequeno aqui e o
   * resto do peso vive no combate, onde as combinações acontecem de verdade.
   */
  poder: {
    pesoOfensivo: 0.42,
    pesoDefensivo: 0.28,
    pesoDeUtilidade: 0.15,
    pesoDeSinergia: 0.15,
    /*
     * A escala final, e a âncora.
     *
     * O bruto de uma build **vazia** já vale alguma coisa, porque a classe tem
     * atributos base. Multiplicar o bruto direto fazia o medidor abrir em 43
     * com zero escolhas e fechar entre 61 e 79 com as dez — trinta e seis
     * pontos de curso para cem de mostrador, cada escolha valendo um ou dois.
     * O medidor mentia parado e não comunicava andando.
     *
     * Agora o Poder mede o que o **draft** acrescentou sobre a base da classe:
     * zero escolhas é zero, e o curso usado passa a ser o mostrador inteiro.
     */
    escala: 330,
    faixas: [
      { minimo: 0, rotulo: 'Fraca' },
      { minimo: 40, rotulo: 'Regular' },
      { minimo: 55, rotulo: 'Boa' },
      { minimo: 70, rotulo: 'Forte' },
      { minimo: 85, rotulo: 'Excelente' },
    ],
  },

  sinergia: {
    /** Quantas peças da mesma tag valem cada ponto de sinergia, de 1 a 5. */
    degraus: [0, 3, 5, 7, 9],
    maximo: 5,
  },

  /*
   * O domínio secreto.
   *
   * O jogador nunca vê estes números, e a fórmula não exige um estilo: uma
   * build muito ofensiva compensa com tempo o que perde em Vida, e uma
   * defensiva compensa com Vida o que perde em tempo. Os três fatores somam
   * 1 e o corte é alto de propósito — despertar o Soberano precisa ser raro.
   */
  dominio: {
    pesoDeTempo: 0.4,
    pesoDeVida: 0.35,
    pesoDePocoes: 0.25,
    /** O tempo do boss final que conta como desempenho perfeito, em segundos. */
    tempoExcelenteS: 55,
    tempoAceitavelS: 110,
    corte: 0.78,
  },

  bossSecreto: {
    /** O Soberano é mais duro que o Boss 50, mas vencível por quem o acordou. */
    multiplicadorDeVida: 1.55,
    multiplicadorDeDano: 1.3,
  },

  /*
   * O enfurecimento.
   *
   * Uma luta precisa terminar. Sem isto, uma build muito defensiva e sem dano
   * ficava presa contra um inimigo que também não a matava — e ficar preso é
   * pior que perder, porque nem sequer ensina o que deu errado. Passado o teto
   * da faixa de duração com folga, o inimigo começa a bater cada vez mais
   * forte. A build ruim morre, que é a resposta correta do jogo.
   */
  enfurecimento: {
    /** Começa depois deste múltiplo da duração máxima esperada. */
    aposFatorDaDuracaoAlvo: 1.6,
    /** E cresce esta fração por segundo, cumulativa. */
    porSegundo: 0.09,
  },

  velocidades: [1, 2, 4],

  /** O feedback na tela cresce com o porte do golpe, e para aí. */
  tremor: {
    basico: 0.0016,
    skill: 0.004,
    ultimate: 0.009,
    boss: 0.013,
    duracaoMs: 90,
  },
} as const;

/** A faixa textual de um Poder Estimado. */
export const faixaDePoder = (poder: number): string => {
  let rotulo = 'Fraca';
  for (const faixa of BALANCEAMENTO.poder.faixas) {
    if (poder >= faixa.minimo) rotulo = faixa.rotulo;
  }
  return rotulo;
};
