import { BENCAOS, EQUIPAMENTOS_DE_CHECKPOINT } from '../dados/recompensas.js';
import type { Recompensa } from '../dados/recompensas.js';
import type { Efeito, Habilidade, Passiva } from '../dados/tipos.js';

import type { BuildParcial } from './build.js';
import { contarTags } from './build.js';
import { avaliarBuild, sinergiasCom } from './poder.js';
import { sortearEm } from './rng.js';

/*
 * O checkpoint: três opções, uma escolha.
 *
 * A regra de composição é a que a direção pediu, e ela existe para evitar o
 * pior caso — três opções inúteis. A oferta tenta sempre trazer:
 *
 *   1. algo que conversa com a build;
 *   2. algo geral ou defensivo, que serve para qualquer build;
 *   3. algo alternativo, que pode mudar o rumo da run.
 *
 * O que ela **não** faz é garantir combo perfeito nem consertar build ruim.
 * Uma run que foi mal no draft encontra aqui uma saída parcial, nunca um
 * conserto — senão a escolha inicial deixaria de importar.
 */

export interface OfertaDeCheckpoint {
  readonly opcoes: readonly Recompensa[];
}

/** Uma evolução para uma habilidade que a build já tem. */
const evolucaoDe = (habilidade: Habilidade): Recompensa => {
  const temDano = habilidade.efeitos.some(
    (e) => e.tipo === 'dano' || e.tipo === 'dano-perfurante',
  );
  return {
    tipo: 'evolucao',
    id: `r-ev-${habilidade.id}`,
    nome: `${habilidade.nome} +`,
    descricao: temDano ? '+8 Dano. Cooldown 15% menor.' : 'Cooldown 25% menor.',
    danoExtra: temDano ? 8 : 0,
    cortaCooldown: temDano ? 0.15 : 0.25,
    tags: habilidade.tags,
  };
};

const melhorParaABuild = (build: BuildParcial, candidatas: readonly Recompensa[]): Recompensa[] =>
  [...candidatas].sort((a, b) => sinergiasCom(build, b.tags) - sinergiasCom(build, a.tags));

/**
 * As três opções deste checkpoint.
 *
 * Determinística pela seed e pelo número do checkpoint: quem repetir a seed e
 * chegar aqui com a mesma build vê a mesma oferta.
 */
export const ofertaDeCheckpoint = (
  build: BuildParcial,
  seed: string,
  numeroDoCheckpoint: number,
): OfertaDeCheckpoint => {
  const rng = sortearEm(seed, `checkpoint:${numeroDoCheckpoint}`);
  const jaTem = new Set<string>();
  const opcoes: Recompensa[] = [];

  const acrescentar = (recompensa: Recompensa | undefined): void => {
    if (recompensa === undefined || jaTem.has(recompensa.id)) return;
    jaTem.add(recompensa.id);
    opcoes.push(recompensa);
  };

  /* 1 · algo da build: evolui uma habilidade dela, ou uma peça da mesma tag. */
  const ativaSorteada = build.ativas[rng.inteiro(build.ativas.length)];
  if (ativaSorteada !== undefined && rng.proximo() < 0.6) {
    acrescentar(evolucaoDe(ativaSorteada));
  } else {
    acrescentar(melhorParaABuild(build, EQUIPAMENTOS_DE_CHECKPOINT)[0]);
  }

  /* 2 · algo geral ou defensivo, que serve para qualquer build. */
  const gerais = BENCAOS.filter(
    (bencao) => bencao.tags.length === 0 || bencao.tags.includes('defesa') || bencao.tags.includes('cura'),
  );
  acrescentar(rng.escolher(gerais));

  /* 3 · uma alternativa: de propósito **fora** do que a build já faz. */
  const contagem = contarTags(build);
  const alternativas = [...BENCAOS, ...EQUIPAMENTOS_DE_CHECKPOINT].filter(
    (opcao) => !jaTem.has(opcao.id) && opcao.tags.every((tag) => (contagem.get(tag) ?? 0) < 2),
  );
  acrescentar(
    alternativas.length > 0 ? rng.escolher(alternativas) : rng.escolher(EQUIPAMENTOS_DE_CHECKPOINT),
  );

  /* Se algo colidiu, completa com o que sobrou. Três opções, sempre. */
  const sobras = [...BENCAOS, ...EQUIPAMENTOS_DE_CHECKPOINT].filter((o) => !jaTem.has(o.id));
  while (opcoes.length < 3 && sobras.length > 0) {
    acrescentar(rng.escolher(sobras));
    if (jaTem.size >= sobras.length + opcoes.length) break;
  }

  return { opcoes: opcoes.slice(0, 3) };
};

/* ---------------------------------------------------------------------------
 * Aplicar.
 * ------------------------------------------------------------------------- */

const evoluirHabilidade = (habilidade: Habilidade, recompensa: Recompensa): Habilidade => {
  if (recompensa.tipo !== 'evolucao') return habilidade;
  const efeitos: Efeito[] = habilidade.efeitos.map((efeito) =>
    efeito.tipo === 'dano' || efeito.tipo === 'dano-perfurante'
      ? { ...efeito, valor: efeito.valor + recompensa.danoExtra }
      : efeito,
  );
  return {
    ...habilidade,
    nome: `${habilidade.nome} +`,
    efeitos,
    cooldownS: Math.max(1, habilidade.cooldownS * (1 - recompensa.cortaCooldown)),
  };
};

/**
 * A build depois da recompensa.
 *
 * Bênção e equipamento entram em `upgrades`, e **não** em `passivas`. O
 * formato interno continua o de uma passiva, porque é o formato que o motor
 * já soma; o que muda é a coleção em que ela cai.
 *
 * A versão anterior jogava tudo em `passivas`, e uma run que passasse pelos
 * quatro checkpoints terminava exibindo sete passivas — com o jogo inteiro,
 * do draft à tela de modo, afirmando que são três. Nada na interface
 * explicava a diferença, porque não havia diferença: a informação de origem
 * tinha sido jogada fora na hora de aplicar.
 *
 * Evolução continua mexendo na habilidade escolhida, e só nela.
 */
export const aplicarRecompensa = (build: BuildParcial, recompensa: Recompensa): BuildParcial => {
  if (recompensa.tipo === 'evolucao') {
    const alvo = recompensa.id.replace('r-ev-', '');
    return {
      ...build,
      ativas: build.ativas.map((ativa) =>
        ativa.id === alvo ? evoluirHabilidade(ativa, recompensa) : ativa,
      ),
    };
  }

  const sintetica: Passiva = {
    id: recompensa.id,
    classe: build.classe,
    nome: recompensa.nome,
    descricao: recompensa.descricao,
    tags: recompensa.tags,
    modificadores: recompensa.modificadores,
  };
  return { ...build, upgrades: [...build.upgrades, sintetica] };
};

/**
 * A escolha automática.
 *
 * Ela não precisa ser perfeita, e não é: avalia cada opção pelo Poder que a
 * build teria depois dela, e desempata por sinergia. Uma heurística honesta
 * que erra às vezes é melhor que uma ótima — no modo automático o jogador
 * está assistindo, e uma escolha que ele discorde faz ele querer voltar ao
 * modo manual, que é exatamente o modo onde o jogo é mais interessante.
 */
export const escolhaAutomatica = (
  build: BuildParcial,
  oferta: OfertaDeCheckpoint,
  fracaoDeVida: number,
): Recompensa => {
  let melhor = oferta.opcoes[0];
  let melhorNota = -Infinity;
  for (const opcao of oferta.opcoes) {
    const depois = aplicarRecompensa(build, opcao);
    const avaliacao = avaliarBuild(depois);
    /*
     * O peso da sinergia acompanha a escala do Poder.
     *
     * Era 1,5 quando uma recompensa mexia um ou dois pontos no medidor. Com o
     * Poder ancorado na base da classe, a mesma recompensa mexe três ou oito —
     * manter 1,5 faria o desempate por sinergia parar de desempatar.
     */
    let nota = avaliacao.poder + avaliacao.sinergia * 4;
    /* Machucado no fim da área: sobreviver vale mais que bater mais forte. */
    if (fracaoDeVida < 0.45 && (opcao.tags.includes('defesa') || opcao.tags.includes('cura'))) {
      nota += 16;
    }
    if (nota > melhorNota) {
      melhorNota = nota;
      melhor = opcao;
    }
  }
  if (melhor === undefined) throw new Error('checkpoint sem opções');
  return melhor;
};
