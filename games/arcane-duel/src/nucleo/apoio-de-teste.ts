import type { Equipamento, Habilidade, Inimigo, Passiva } from '../dados/tipos.js';

import type { BuildParcial } from './build.js';
import type { Aleatorio } from './rng.js';

/*
 * As peças de apoio dos testes.
 *
 * Testar o motor com as habilidades reais do Guerreiro mistura duas
 * perguntas: "a regra de Armadura está certa?" e "o Machado Partidor está
 * balanceado?". Aqui ficam peças mínimas e controladas, para a primeira
 * pergunta ser respondida sozinha. Os testes que precisam das peças reais
 * importam as reais.
 */

/** Um gerador previsível. `valores` cicla; sem valores, devolve sempre 0,5. */
export const rngFixo = (valores: readonly number[] = [0.5]): Aleatorio => {
  let i = 0;
  const proximo = (): number => {
    const v = valores[i % valores.length] ?? 0.5;
    i += 1;
    return v;
  };
  const inteiro = (limite: number): number =>
    limite <= 0 ? 0 : Math.min(limite - 1, Math.floor(proximo() * limite));
  const escolher = <T,>(itens: readonly T[]): T => {
    const escolhido = itens[inteiro(itens.length)];
    if (escolhido === undefined) throw new Error('escolher de lista vazia');
    return escolhido;
  };
  return {
    proximo,
    inteiro,
    escolher,
    amostrar: <T,>(itens: readonly T[], quantos: number): readonly T[] =>
      itens.slice(0, Math.max(0, Math.min(itens.length, quantos))),
  };
};

/** Um gerador que nunca crita: `proximo()` acima de qualquer chance. */
export const semCritico = (): Aleatorio => rngFixo([0.999]);

export const habilidade = (parcial: Partial<Habilidade> & Pick<Habilidade, 'id'>): Habilidade => ({
  classe: 'guerreiro',
  nome: parcial.id,
  descricao: '',
  cooldownS: 5,
  porte: 'skill',
  efeitos: [],
  tags: [],
  ...parcial,
});

export const passiva = (parcial: Partial<Passiva> & Pick<Passiva, 'id'>): Passiva => ({
  classe: 'guerreiro',
  nome: parcial.id,
  descricao: '',
  tags: [],
  modificadores: {},
  ...parcial,
});

export const equipamento = (
  parcial: Partial<Equipamento> & Pick<Equipamento, 'id'>,
): Equipamento => ({
  classe: 'universal',
  nome: parcial.id,
  descricao: '',
  slot: 'arma',
  tags: [],
  modificadores: {},
  ...parcial,
});

export const build = (parcial: Partial<BuildParcial> = {}): BuildParcial => ({
  classe: 'guerreiro',
  ativas: [],
  passivas: [],
  equipamentos: [],
  upgrades: [],
  dourada: false,
  ...parcial,
});

export const inimigo = (parcial: Partial<Inimigo> & Pick<Inimigo, 'id'>): Inimigo => ({
  nome: parcial.id,
  porte: 'normal',
  vida: 100,
  armadura: 0,
  dano: 10,
  intervaloS: 2,
  exp: 10,
  area: 1,
  silhueta: {
    forma: 'humanoide',
    corpo: '#000000',
    detalhe: '#111111',
    brilho: '#222222',
    largura: 10,
    altura: 10,
  },
  ...parcial,
});
