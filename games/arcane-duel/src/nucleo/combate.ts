import { BALANCEAMENTO } from '../dados/balanceamento.js';
import type { Condicao, Efeito, Habilidade, Inimigo } from '../dados/tipos.js';

import type { Atributos, BuildParcial } from './build.js';
import { atributosDaBuild } from './build.js';
import type { Aleatorio } from './rng.js';

/*
 * O combate.
 *
 * Ele é **simulação pura**: passo fixo, sem DOM, sem Phaser, sem relógio do
 * navegador. Essa é a decisão que sustenta três promessas de uma vez. A
 * velocidade 1x/2x/4x vira "quantos passos por quadro", e não um relógio
 * acelerado que faria a física divergir. A seed reproduz a luta inteira. E o
 * balanceamento pode ser conferido sem abrir navegador nenhum.
 *
 * O jogador não aperta nada. Quem decide é `escolherHabilidade`, e ela decide
 * **lendo os efeitos declarados** — nunca o nome da habilidade, nunca a
 * classe. É isso que faz o Mago funcionar no dia em que ele existir: as
 * habilidades dele já vão pontuar sozinhas.
 */

export interface EstadoDoJogador {
  readonly vida: number;
  readonly vidaMaxima: number;
  readonly armadura: number;
  readonly armaduraMaxima: number;
  readonly momentum: number;
  readonly momentumMaximo: number;
  /** Segundos restantes de cada cooldown, por id. */
  readonly cooldowns: Readonly<Record<string, number>>;
  readonly cooldownBasico: number;
  readonly pocoes: number;
  readonly recargaDePocao: number;
  /** Aceleração de cooldowns ativa: fração e tempo restante. */
  readonly aceleracao: { readonly valor: number; readonly restanteS: number };
  /** Redução extra de dano ativa. */
  readonly protecao: { readonly valor: number; readonly restanteS: number };
  readonly nivel: number;
  readonly exp: number;
}

export interface Sangramento {
  readonly porSegundo: number;
  readonly restanteS: number;
}

export interface EstadoDoInimigo {
  readonly id: string;
  readonly nome: string;
  readonly porte: Inimigo['porte'];
  readonly vida: number;
  readonly vidaMaxima: number;
  readonly armadura: number;
  readonly armaduraMaxima: number;
  readonly dano: number;
  readonly intervaloS: number;
  readonly proximoAtaqueS: number;
  readonly especial: Inimigo['especial'];
  readonly proximoEspecialS: number;
  readonly sangramentos: readonly Sangramento[];
  readonly silhueta: Inimigo['silhueta'];
  readonly exp: number;
}

export interface EstadoDeCombate {
  readonly jogador: EstadoDoJogador;
  readonly inimigo: EstadoDoInimigo;
  readonly tempoS: number;
  readonly terminou: boolean;
  readonly vencedor: 'jogador' | 'inimigo' | null;
}

export type Porte = Habilidade['porte'];

/** O que a tela precisa saber que aconteceu neste passo. */
export type EventoDeCombate =
  | {
      readonly tipo: 'golpe';
      readonly origem: 'jogador' | 'inimigo';
      readonly valor: number;
      readonly critico: boolean;
      readonly perfurante: boolean;
      readonly porte: Porte;
    }
  | { readonly tipo: 'habilidade'; readonly id: string; readonly nome: string; readonly porte: Porte }
  | { readonly tipo: 'armadura-quebrada'; readonly alvo: 'jogador' | 'inimigo' }
  | { readonly tipo: 'cura'; readonly valor: number }
  | { readonly tipo: 'pocao'; readonly valor: number }
  | { readonly tipo: 'momentum'; readonly valor: number }
  | { readonly tipo: 'especial'; readonly nome: string }
  | { readonly tipo: 'sangramento'; readonly valor: number }
  | { readonly tipo: 'morte'; readonly quem: 'jogador' | 'inimigo' };

export interface Passo {
  readonly estado: EstadoDeCombate;
  readonly eventos: readonly EventoDeCombate[];
}

/* ---------------------------------------------------------------------------
 * Abertura.
 * ------------------------------------------------------------------------- */

export const abrirCombate = (
  build: BuildParcial,
  inimigo: Inimigo,
  jogadorAnterior: Pick<EstadoDoJogador, 'vida' | 'pocoes' | 'nivel' | 'exp'>,
  momentumMaximo: number,
): EstadoDeCombate => {
  const atributos = atributosDaBuild(build, jogadorAnterior.nivel);
  return {
    jogador: {
      vida: Math.min(jogadorAnterior.vida, atributos.vidaMaxima),
      vidaMaxima: atributos.vidaMaxima,
      /* A Armadura enche a cada luta: ela é recurso de combate, não de run. */
      armadura: atributos.armaduraMaxima,
      armaduraMaxima: atributos.armaduraMaxima,
      momentum: 0,
      momentumMaximo,
      cooldowns: {},
      cooldownBasico: 0,
      pocoes: jogadorAnterior.pocoes,
      recargaDePocao: 0,
      aceleracao: { valor: 0, restanteS: 0 },
      protecao: { valor: 0, restanteS: 0 },
      nivel: jogadorAnterior.nivel,
      exp: jogadorAnterior.exp,
    },
    inimigo: {
      id: inimigo.id,
      nome: inimigo.nome,
      porte: inimigo.porte,
      vida: inimigo.vida,
      vidaMaxima: inimigo.vida,
      armadura: inimigo.armadura,
      armaduraMaxima: inimigo.armadura,
      dano: inimigo.dano,
      intervaloS: inimigo.intervaloS,
      /* O primeiro golpe não é imediato: o jogador vê a luta começar. */
      proximoAtaqueS: inimigo.intervaloS * 0.6,
      especial: inimigo.especial,
      proximoEspecialS: inimigo.especial?.aCadaS ?? Number.POSITIVE_INFINITY,
      sangramentos: [],
      silhueta: inimigo.silhueta,
      exp: inimigo.exp,
    },
    tempoS: 0,
    terminou: false,
    vencedor: null,
  };
};

/* ---------------------------------------------------------------------------
 * A decisão: qual habilidade usar agora.
 * ------------------------------------------------------------------------- */

const condicaoVale = (condicao: Condicao, estado: EstadoDeCombate): boolean => {
  switch (condicao.tipo) {
    case 'alvo-sem-armadura':
      return estado.inimigo.armadura <= 0;
    case 'alvo-abaixo-de':
      return estado.inimigo.vida / estado.inimigo.vidaMaxima < condicao.fracao;
    case 'eu-abaixo-de':
      return estado.jogador.vida / estado.jogador.vidaMaxima < condicao.fracao;
    case 'momentum-minimo':
      return estado.jogador.momentum >= condicao.valor;
  }
};

/**
 * O quanto vale usar esta habilidade **agora**.
 *
 * A pontuação lê os efeitos declarados, e nada além deles. Dano vale por si;
 * cura vale muito quando a vida está baixa e quase nada quando está cheia;
 * Armadura vale quando a que existe já foi embora; quebrar Armadura vale
 * enquanto o alvo ainda tem Armadura para perder — desperdiçar um
 * Quebra-Escudo num alvo já exposto é o tipo de erro que faz a luta parecer
 * burra, e é o que esta função existe para evitar.
 */
const pontuar = (habilidade: Habilidade, estado: EstadoDeCombate, atributos: Atributos): number => {
  const { jogador, inimigo } = estado;
  const fracaoDeVida = jogador.vida / jogador.vidaMaxima;
  const fracaoDeArmadura =
    jogador.armaduraMaxima > 0 ? jogador.armadura / jogador.armaduraMaxima : 1;

  let pontos = 0;

  const avaliar = (efeitos: readonly Efeito[], peso: number): void => {
    for (const efeito of efeitos) {
      switch (efeito.tipo) {
        case 'dano':
          pontos += efeito.valor * peso;
          break;
        case 'dano-perfurante':
          /* Perfurante vale mais contra alvo blindado: é o trabalho dele. */
          pontos += efeito.valor * peso * (inimigo.armadura > 0 ? 1.6 : 1);
          break;
        case 'quebrar-armadura':
          pontos += Math.min(efeito.valor, inimigo.armadura) * peso * 0.8;
          break;
        case 'ganhar-momentum':
          pontos += efeito.valor * peso * (2 + atributos.danoPorMomentum * 2);
          break;
        case 'gastar-momentum':
          pontos += jogador.momentum >= efeito.valor ? 0 : -50;
          break;
        case 'ganhar-armadura':
          pontos += efeito.valor * peso * (1 - fracaoDeArmadura) * 1.1;
          break;
        case 'curar':
          pontos += efeito.valor * peso * (1 - fracaoDeVida) * 2.2;
          break;
        case 'curar-fracao':
          pontos += efeito.valor * jogador.vidaMaxima * peso * (1 - fracaoDeVida) * 2.2;
          break;
        case 'sangrar':
          pontos += efeito.valor * efeito.duracaoS * peso * 0.7;
          break;
        case 'acelerar':
          pontos += efeito.valor * efeito.duracaoS * peso * 4;
          break;
        case 'proteger':
          pontos += efeito.valor * efeito.duracaoS * peso * (1 - fracaoDeVida) * 22;
          break;
      }
    }
  };

  avaliar(habilidade.efeitos, 1);
  for (const condicional of habilidade.condicionais ?? []) {
    if (condicaoVale(condicional.se, estado)) avaliar(condicional.entao, 1);
  }

  /*
   * O custo de Momentum é uma porta, não um desconto.
   *
   * Uma ultimate que gasta tudo precisa esperar valer a pena: usá-la com 1 de
   * Momentum joga fora a habilidade e o cooldown longo junto.
   */
  if (habilidade.custoDeMomentum !== undefined) {
    if (jogador.momentum < habilidade.custoDeMomentum) return -1;
    pontos += jogador.momentum * atributos.danoPorMomentum * 2;
    pontos += jogador.momentum * 6;
  }

  /* Dividido pelo cooldown: o que volta rápido não precisa ser guardado. */
  return pontos / Math.max(1, habilidade.cooldownS);
};

export const escolherHabilidade = (
  estado: EstadoDeCombate,
  build: BuildParcial,
  atributos: Atributos,
): Habilidade | null => {
  let melhor: Habilidade | null = null;
  let melhorPontuacao = 0;
  for (const habilidade of build.ativas) {
    if ((estado.jogador.cooldowns[habilidade.id] ?? 0) > 0) continue;
    const pontuacao = pontuar(habilidade, estado, atributos);
    if (pontuacao > melhorPontuacao) {
      melhor = habilidade;
      melhorPontuacao = pontuacao;
    }
  }
  return melhor;
};

/* ---------------------------------------------------------------------------
 * O passo.
 * ------------------------------------------------------------------------- */

interface Mutavel {
  jogador: {
    vida: number;
    armadura: number;
    momentum: number;
    cooldowns: Record<string, number>;
    cooldownBasico: number;
    pocoes: number;
    recargaDePocao: number;
    aceleracaoValor: number;
    aceleracaoRestante: number;
    protecaoValor: number;
    protecaoRestante: number;
  };
  inimigo: {
    vida: number;
    armadura: number;
    proximoAtaqueS: number;
    proximoEspecialS: number;
    sangramentos: Sangramento[];
  };
}

/** Aplica dano ao inimigo respeitando Armadura, e devolve o que entrou na Vida. */
const baterNoInimigo = (
  m: Mutavel,
  bruto: number,
  perfurante: boolean,
  eventos: EventoDeCombate[],
): number => {
  if (bruto <= 0) return 0;
  if (perfurante) {
    m.inimigo.vida -= bruto;
    return bruto;
  }
  const absorvido = Math.min(m.inimigo.armadura, bruto);
  m.inimigo.armadura -= absorvido;
  const restante = bruto - absorvido;
  m.inimigo.vida -= restante;
  if (absorvido > 0 && m.inimigo.armadura <= 0) {
    eventos.push({ tipo: 'armadura-quebrada', alvo: 'inimigo' });
  }
  return restante;
};

const quebrarArmadura = (m: Mutavel, valor: number, eventos: EventoDeCombate[]): void => {
  if (m.inimigo.armadura <= 0 || valor <= 0) return;
  m.inimigo.armadura = Math.max(0, m.inimigo.armadura - valor);
  if (m.inimigo.armadura <= 0) eventos.push({ tipo: 'armadura-quebrada', alvo: 'inimigo' });
};

export interface Contexto {
  readonly build: BuildParcial;
  readonly atributos: Atributos;
  readonly rng: Aleatorio;
}

/**
 * Um passo da simulação.
 *
 * A ordem importa e é sempre a mesma: primeiro o tempo corre (cooldowns,
 * efeitos temporários, sangramento), depois o jogador age, depois o inimigo,
 * e só no fim se confere quem morreu. Fixar a ordem é o que torna a luta
 * reproduzível — e é o que impede o caso em que os dois morrem no mesmo passo
 * e o vencedor depende de qual `if` veio primeiro no código.
 */
export const passo = (estado: EstadoDeCombate, contexto: Contexto, dt: number): Passo => {
  if (estado.terminou) return { estado, eventos: [] };

  const eventos: EventoDeCombate[] = [];
  const { atributos, build, rng } = contexto;
  const { pocoes: cfgPocoes } = BALANCEAMENTO;

  const m: Mutavel = {
    jogador: {
      vida: estado.jogador.vida,
      armadura: estado.jogador.armadura,
      momentum: estado.jogador.momentum,
      cooldowns: { ...estado.jogador.cooldowns },
      cooldownBasico: estado.jogador.cooldownBasico,
      pocoes: estado.jogador.pocoes,
      recargaDePocao: estado.jogador.recargaDePocao,
      aceleracaoValor: estado.jogador.aceleracao.valor,
      aceleracaoRestante: estado.jogador.aceleracao.restanteS,
      protecaoValor: estado.jogador.protecao.valor,
      protecaoRestante: estado.jogador.protecao.restanteS,
    },
    inimigo: {
      vida: estado.inimigo.vida,
      armadura: estado.inimigo.armadura,
      proximoAtaqueS: estado.inimigo.proximoAtaqueS,
      proximoEspecialS: estado.inimigo.proximoEspecialS,
      sangramentos: [...estado.inimigo.sangramentos],
    },
  };

  /* --- 1 · o tempo corre --------------------------------------------------- */

  const aceleracao = m.jogador.aceleracaoRestante > 0 ? m.jogador.aceleracaoValor : 0;
  const passoDeCooldown = dt * (1 + aceleracao);
  for (const id of Object.keys(m.jogador.cooldowns)) {
    m.jogador.cooldowns[id] = Math.max(0, (m.jogador.cooldowns[id] ?? 0) - passoDeCooldown);
  }
  m.jogador.cooldownBasico = Math.max(0, m.jogador.cooldownBasico - passoDeCooldown);
  m.jogador.aceleracaoRestante = Math.max(0, m.jogador.aceleracaoRestante - dt);
  m.jogador.protecaoRestante = Math.max(0, m.jogador.protecaoRestante - dt);
  m.jogador.recargaDePocao = Math.max(0, m.jogador.recargaDePocao - dt);

  m.jogador.armadura = Math.min(
    estado.jogador.armaduraMaxima,
    m.jogador.armadura + atributos.regeneracaoDeArmadura * dt,
  );

  let sangrouTotal = 0;
  const restantes: Sangramento[] = [];
  for (const sangramento of m.inimigo.sangramentos) {
    const aplicado = sangramento.porSegundo * dt;
    m.inimigo.vida -= aplicado;
    sangrouTotal += aplicado;
    const sobra = sangramento.restanteS - dt;
    if (sobra > 0) restantes.push({ porSegundo: sangramento.porSegundo, restanteS: sobra });
  }
  m.inimigo.sangramentos = restantes;
  if (sangrouTotal > 0) eventos.push({ tipo: 'sangramento', valor: sangrouTotal });

  /* --- 2 · a poção, antes de agir ----------------------------------------- */

  if (
    m.jogador.pocoes > 0 &&
    m.jogador.recargaDePocao <= 0 &&
    m.jogador.vida > 0 &&
    m.jogador.vida / estado.jogador.vidaMaxima < cfgPocoes.gatilhoDeVida
  ) {
    const cura = estado.jogador.vidaMaxima * atributos.potenciaDePocao;
    m.jogador.vida = Math.min(estado.jogador.vidaMaxima, m.jogador.vida + cura);
    m.jogador.pocoes -= 1;
    m.jogador.recargaDePocao = cfgPocoes.recargaS;
    eventos.push({ tipo: 'pocao', valor: cura });
  }

  /* --- 3 · o jogador age --------------------------------------------------- */

  const golpear = (bruto: number, perfurante: boolean, porte: Porte): void => {
    const critico = rng.proximo() < atributos.chanceDeCritico;
    let valor = bruto;
    if (m.inimigo.armadura <= 0) valor += atributos.danoContraSemArmadura;
    valor += m.jogador.momentum * atributos.danoPorMomentum;
    if (critico) valor *= atributos.multiplicadorDeCritico;
    const naVida = baterNoInimigo(m, valor, perfurante, eventos);
    eventos.push({ tipo: 'golpe', origem: 'jogador', valor, critico, perfurante, porte });
    if (atributos.roubodeVida > 0 && naVida > 0) {
      const curado = naVida * atributos.roubodeVida;
      m.jogador.vida = Math.min(estado.jogador.vidaMaxima, m.jogador.vida + curado);
    }
  };

  const aplicarEfeitos = (efeitos: readonly Efeito[], porte: Porte): void => {
    for (const efeito of efeitos) {
      switch (efeito.tipo) {
        case 'dano':
          golpear(efeito.valor + atributos.dano * 0.35, false, porte);
          break;
        case 'dano-perfurante':
          golpear(efeito.valor + atributos.dano * 0.2, true, porte);
          break;
        case 'quebrar-armadura':
          quebrarArmadura(m, efeito.valor + atributos.rupturaExtra, eventos);
          break;
        case 'ganhar-momentum': {
          const ganho = efeito.valor + atributos.momentumExtra;
          m.jogador.momentum = Math.min(estado.jogador.momentumMaximo, m.jogador.momentum + ganho);
          eventos.push({ tipo: 'momentum', valor: ganho });
          break;
        }
        case 'gastar-momentum':
          m.jogador.momentum = Math.max(0, m.jogador.momentum - efeito.valor);
          break;
        case 'ganhar-armadura':
          m.jogador.armadura = Math.min(
            estado.jogador.armaduraMaxima,
            m.jogador.armadura + efeito.valor,
          );
          break;
        case 'curar': {
          const antes = m.jogador.vida;
          m.jogador.vida = Math.min(estado.jogador.vidaMaxima, m.jogador.vida + efeito.valor);
          eventos.push({ tipo: 'cura', valor: m.jogador.vida - antes });
          break;
        }
        case 'curar-fracao': {
          const antes = m.jogador.vida;
          m.jogador.vida = Math.min(
            estado.jogador.vidaMaxima,
            m.jogador.vida + estado.jogador.vidaMaxima * efeito.valor,
          );
          eventos.push({ tipo: 'cura', valor: m.jogador.vida - antes });
          break;
        }
        case 'sangrar':
          m.inimigo.sangramentos.push({
            porSegundo: efeito.valor,
            restanteS: efeito.duracaoS,
          });
          break;
        case 'acelerar':
          m.jogador.aceleracaoValor = efeito.valor;
          m.jogador.aceleracaoRestante = efeito.duracaoS;
          break;
        case 'proteger':
          m.jogador.protecaoValor = efeito.valor;
          m.jogador.protecaoRestante = efeito.duracaoS;
          break;
      }
    }
  };

  if (m.inimigo.vida > 0 && m.jogador.vida > 0) {
    const parcial: EstadoDeCombate = {
      ...estado,
      jogador: {
        ...estado.jogador,
        vida: m.jogador.vida,
        armadura: m.jogador.armadura,
        momentum: m.jogador.momentum,
        cooldowns: m.jogador.cooldowns,
      },
      inimigo: { ...estado.inimigo, vida: m.inimigo.vida, armadura: m.inimigo.armadura },
    };

    const escolhida = escolherHabilidade(parcial, build, atributos);
    if (escolhida !== null) {
      /*
       * O Carrasco gasta **todo** o Momentum, e o bônus é lido antes de
       * zerar: por isso o custo é cobrado depois dos efeitos, e não antes.
       */
      const momentumNoGolpe = m.jogador.momentum;
      aplicarEfeitos(escolhida.efeitos, escolhida.porte);
      for (const condicional of escolhida.condicionais ?? []) {
        if (condicaoVale(condicional.se, parcial)) {
          aplicarEfeitos(condicional.entao, escolhida.porte);
        }
      }
      if (escolhida.custoDeMomentum !== undefined) {
        golpear(momentumNoGolpe * 6, false, escolhida.porte);
        m.jogador.momentum = 0;
      }
      m.jogador.cooldowns[escolhida.id] = Math.max(
        0.5,
        escolhida.cooldownS * (1 - atributos.reducaoDeCooldown),
      );
      eventos.push({
        tipo: 'habilidade',
        id: escolhida.id,
        nome: escolhida.nome,
        porte: escolhida.porte,
      });
    } else if (m.jogador.cooldownBasico <= 0) {
      golpear(atributos.dano * BALANCEAMENTO.jogador.ataqueBasico.danoRelativo, false, 'basico');
      m.jogador.cooldownBasico = Math.max(
        0.4,
        BALANCEAMENTO.jogador.ataqueBasico.cooldownS * (1 - atributos.reducaoDeCooldown),
      );
    }
  }

  /* --- 4 · o inimigo age --------------------------------------------------- */

  /*
   * O enfurecimento.
   *
   * Passado o teto da faixa de duração com folga, o inimigo começa a bater
   * cada vez mais forte. É o que garante que toda luta termina: sem isso, uma
   * build muito defensiva e sem dano ficava presa contra um inimigo que
   * também não a matava — e ficar preso não ensina nada. Assim a build ruim
   * morre, que é a resposta correta do jogo.
   */
  const { enfurecimento, duracaoAlvoS } = BALANCEAMENTO;
  const limiteS = duracaoAlvoS[estado.inimigo.porte].maximo * enfurecimento.aposFatorDaDuracaoAlvo;
  const furia = 1 + Math.max(0, estado.tempoS - limiteS) * enfurecimento.porSegundo;

  const ferirJogador = (bruto: number, quebra: number, nome: string | null): void => {
    if (m.jogador.vida <= 0) return;
    let valor = bruto * furia * (1 - atributos.reducaoDeDano);
    if (m.jogador.protecaoRestante > 0) valor *= 1 - m.jogador.protecaoValor;
    if (quebra > 0) m.jogador.armadura = Math.max(0, m.jogador.armadura - quebra);
    const absorvido = Math.min(m.jogador.armadura, valor);
    m.jogador.armadura -= absorvido;
    const naVida = valor - absorvido;
    m.jogador.vida -= naVida;
    if (nome !== null) eventos.push({ tipo: 'especial', nome });
    eventos.push({
      tipo: 'golpe',
      origem: 'inimigo',
      valor,
      critico: false,
      perfurante: false,
      porte: nome === null ? 'basico' : 'skill',
    });
    if (absorvido > 0 && m.jogador.armadura <= 0) {
      eventos.push({ tipo: 'armadura-quebrada', alvo: 'jogador' });
    }
  };

  if (m.inimigo.vida > 0 && m.jogador.vida > 0) {
    m.inimigo.proximoAtaqueS -= dt;
    if (m.inimigo.proximoAtaqueS <= 0) {
      ferirJogador(estado.inimigo.dano, 0, null);
      m.inimigo.proximoAtaqueS += estado.inimigo.intervaloS;
    }
    const especial = estado.inimigo.especial;
    if (especial !== undefined) {
      m.inimigo.proximoEspecialS -= dt;
      if (m.inimigo.proximoEspecialS <= 0) {
        ferirJogador(especial.dano, especial.quebraArmadura ?? 0, especial.nome);
        m.inimigo.proximoEspecialS += especial.aCadaS;
      }
    }
  }

  /* --- 5 · quem caiu ------------------------------------------------------- */

  let vencedor: EstadoDeCombate['vencedor'] = null;
  if (m.inimigo.vida <= 0) {
    vencedor = 'jogador';
    eventos.push({ tipo: 'morte', quem: 'inimigo' });
  } else if (m.jogador.vida <= 0) {
    vencedor = 'inimigo';
    eventos.push({ tipo: 'morte', quem: 'jogador' });
  }

  return {
    estado: {
      jogador: {
        ...estado.jogador,
        vida: Math.max(0, m.jogador.vida),
        armadura: Math.max(0, m.jogador.armadura),
        momentum: m.jogador.momentum,
        cooldowns: m.jogador.cooldowns,
        cooldownBasico: m.jogador.cooldownBasico,
        pocoes: m.jogador.pocoes,
        recargaDePocao: m.jogador.recargaDePocao,
        aceleracao: { valor: m.jogador.aceleracaoValor, restanteS: m.jogador.aceleracaoRestante },
        protecao: { valor: m.jogador.protecaoValor, restanteS: m.jogador.protecaoRestante },
      },
      inimigo: {
        ...estado.inimigo,
        vida: Math.max(0, m.inimigo.vida),
        armadura: Math.max(0, m.inimigo.armadura),
        proximoAtaqueS: m.inimigo.proximoAtaqueS,
        proximoEspecialS: m.inimigo.proximoEspecialS,
        sangramentos: m.inimigo.sangramentos,
      },
      tempoS: estado.tempoS + dt,
      terminou: vencedor !== null,
      vencedor,
    },
    eventos,
  };
};
