import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { equipamentosDoSlot } from '../dados/equipamentos.js';
import { GUERREIRO_ATIVAS } from '../dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../dados/guerreiro-passivas.js';
import type { Equipamento, Habilidade, IdDeClasse, Passiva, Slot } from '../dados/tipos.js';

import type { BuildParcial } from './build.js';
import { sortearEm } from './rng.js';

/*
 * O draft.
 *
 * Três etapas, e cada uma com rerolls próprios que **não** passam para a
 * seguinte: gastar as duas novas ofertas nas Ativas é uma decisão que custa,
 * e custaria nada se sobrasse crédito para o resto.
 *
 * A promessa da seed vive aqui. Cada oferta é sorteada pelo **endereço** dela
 * — categoria, número da escolha, número do reroll — e não por uma sequência
 * contínua. Duas pessoas com a mesma seed que fizerem as mesmas ações veem as
 * mesmas cartas, e quem gastar um reroll a mais não embaralha o futuro de
 * quem não gastou.
 */

export type Categoria = 'ativas' | 'passivas' | 'equipamentos';

/** O pool de cada categoria, por classe. É por aqui que a classe 2 entra. */
const ativasDaClasse = (classe: IdDeClasse): readonly Habilidade[] =>
  classe === 'guerreiro' ? GUERREIRO_ATIVAS : [];

const passivasDaClasse = (classe: IdDeClasse): readonly Passiva[] =>
  classe === 'guerreiro' ? GUERREIRO_PASSIVAS : [];

/** Os três slots, na ordem em que são oferecidos. */
export const SLOTS: readonly Slot[] = ['arma', 'armadura', 'reliquia'];

export const ROTULO_DO_SLOT: Readonly<Record<Slot, string>> = {
  arma: 'Arma',
  armadura: 'Armadura',
  reliquia: 'Relíquia',
};

export interface EstadoDoDraft {
  readonly build: BuildParcial;
  readonly categoria: Categoria;
  /** Qual escolha da categoria está aberta, a partir de 0. */
  readonly escolha: number;
  /** Quantos rerolls ainda restam **nesta** categoria. */
  readonly rerolls: number;
  /** Quantos rerolls já foram gastos, para o endereço do sorteio. */
  readonly rerollsGastos: number;
  readonly seed: string;
  readonly concluido: boolean;
}

export const rerollsIniciais = (dourada: boolean): number =>
  dourada ? BALANCEAMENTO.draft.rerollsDourado : BALANCEAMENTO.draft.rerollsPorCategoria;

export const iniciarDraft = (build: BuildParcial, seed: string): EstadoDoDraft => ({
  build,
  categoria: 'ativas',
  escolha: 0,
  rerolls: rerollsIniciais(build.dourada),
  rerollsGastos: 0,
  seed,
  concluido: false,
});

/** Quantas escolhas cada categoria pede. */
export const totalDaCategoria = (categoria: Categoria): number =>
  categoria === 'ativas'
    ? BALANCEAMENTO.draft.ativas
    : categoria === 'passivas'
      ? BALANCEAMENTO.draft.passivas
      : BALANCEAMENTO.draft.equipamentos;

export type Oferta =
  | { readonly categoria: 'ativas'; readonly opcoes: readonly Habilidade[] }
  | { readonly categoria: 'passivas'; readonly opcoes: readonly Passiva[] }
  | {
      readonly categoria: 'equipamentos';
      readonly slot: Slot;
      readonly opcoes: readonly Equipamento[];
    };

/**
 * As três opções abertas agora.
 *
 * O que já foi escolhido sai do pool: oferecer de novo uma peça que o jogador
 * já tem não é uma escolha, é uma opção morta. Quando o pool encolhe demais —
 * possível no fim das Ativas — as opções vêm em menor número, e isso é
 * honesto: melhor duas opções reais que três com uma repetida.
 */
export const ofertaAtual = (estado: EstadoDoDraft): Oferta => {
  const { build, categoria, escolha, rerollsGastos, seed } = estado;
  const endereco = `${categoria}:${escolha}:r${rerollsGastos}`;
  const rng = sortearEm(seed, endereco);
  const quantas = BALANCEAMENTO.draft.opcoesPorEscolha;

  if (categoria === 'ativas') {
    const tomadas = new Set(build.ativas.map((a) => a.id));
    const pool = ativasDaClasse(build.classe).filter((a) => !tomadas.has(a.id));
    return { categoria, opcoes: rng.amostrar(pool, quantas) };
  }

  if (categoria === 'passivas') {
    const tomadas = new Set(build.passivas.map((p) => p.id));
    const pool = passivasDaClasse(build.classe).filter((p) => !tomadas.has(p.id));
    return { categoria, opcoes: rng.amostrar(pool, quantas) };
  }

  const slot = SLOTS[escolha] ?? 'arma';
  const tomadas = new Set(build.equipamentos.map((e) => e.id));
  const pool = equipamentosDoSlot(slot).filter((e) => !tomadas.has(e.id));
  return { categoria, slot, opcoes: rng.amostrar(pool, quantas) };
};

/** Troca as três opções por outras três. Só dentro da categoria atual. */
export const novaOferta = (estado: EstadoDoDraft): EstadoDoDraft =>
  estado.rerolls <= 0
    ? estado
    : { ...estado, rerolls: estado.rerolls - 1, rerollsGastos: estado.rerollsGastos + 1 };

/** Registra a escolha e avança. A categoria seguinte recomeça com rerolls cheios. */
export const escolher = (
  estado: EstadoDoDraft,
  item: Habilidade | Passiva | Equipamento,
): EstadoDoDraft => {
  const build = estado.build;
  const proximaBuild: BuildParcial =
    estado.categoria === 'ativas'
      ? { ...build, ativas: [...build.ativas, item as Habilidade] }
      : estado.categoria === 'passivas'
        ? { ...build, passivas: [...build.passivas, item as Passiva] }
        : { ...build, equipamentos: [...build.equipamentos, item as Equipamento] };

  const proximaEscolha = estado.escolha + 1;
  if (proximaEscolha < totalDaCategoria(estado.categoria)) {
    return { ...estado, build: proximaBuild, escolha: proximaEscolha, rerollsGastos: 0 };
  }

  const ordem: readonly Categoria[] = ['ativas', 'passivas', 'equipamentos'];
  const seguinte = ordem[ordem.indexOf(estado.categoria) + 1];
  if (seguinte === undefined) {
    return { ...estado, build: proximaBuild, concluido: true };
  }

  return {
    ...estado,
    build: proximaBuild,
    categoria: seguinte,
    escolha: 0,
    rerolls: rerollsIniciais(build.dourada),
    rerollsGastos: 0,
  };
};

export const ROTULO_DA_CATEGORIA: Readonly<Record<Categoria, string>> = {
  ativas: 'Habilidades',
  passivas: 'Passivas',
  equipamentos: 'Equipamentos',
};
