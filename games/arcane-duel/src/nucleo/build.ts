import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { classePorId } from '../dados/classes.js';
import type {
  Classe,
  Equipamento,
  Habilidade,
  IdDeClasse,
  Modificadores,
  Passiva,
  Tag,
} from '../dados/tipos.js';

/*
 * A build: as dez escolhas, e o que elas viram juntas.
 *
 * Aqui acontece a única coisa que todo o resto do jogo consulta — a soma dos
 * modificadores. A regra é que **tudo se soma**, nada multiplica nada. Um
 * bônus de 15 % e outro de 18 % viram 33 %, e não 35,7 %. Isso é escolha de
 * projeto: com soma, o jogador consegue prever de cabeça o que uma peça vai
 * fazer; com multiplicação encadeada, ninguém consegue, e o texto curto que a
 * direção pediu deixaria de ser verdade.
 */

export interface Build {
  readonly classe: IdDeClasse;
  readonly ativas: readonly Habilidade[];
  readonly passivas: readonly Passiva[];
  readonly equipamentos: readonly Equipamento[];
  /** A forma dourada muda os rerolls, e nada mais. */
  readonly dourada: boolean;
}

/** A build em construção, durante o draft. */
export interface BuildParcial {
  readonly classe: IdDeClasse;
  readonly ativas: readonly Habilidade[];
  readonly passivas: readonly Passiva[];
  readonly equipamentos: readonly Equipamento[];
  readonly dourada: boolean;
}

export const buildVazia = (classe: IdDeClasse, dourada: boolean): BuildParcial => ({
  classe,
  ativas: [],
  passivas: [],
  equipamentos: [],
  dourada,
});

export const buildCompleta = (parcial: BuildParcial): boolean =>
  parcial.ativas.length === BALANCEAMENTO.draft.ativas &&
  parcial.passivas.length === BALANCEAMENTO.draft.passivas &&
  parcial.equipamentos.length === BALANCEAMENTO.draft.equipamentos;

/* ---------------------------------------------------------------------------
 * A soma dos modificadores.
 * ------------------------------------------------------------------------- */

const CHAVES = [
  'vidaMaxima',
  'armaduraMaxima',
  'danoPlano',
  'danoPercentual',
  'reducaoDeCooldown',
  'chanceDeCritico',
  'multiplicadorDeCritico',
  'momentumExtra',
  'danoPorMomentum',
  'rupturaExtra',
  'danoContraSemArmadura',
  'roubodeVida',
  'reducaoDeDano',
  'regeneracaoDeArmadura',
  'potenciaDePocao',
  'pocoesExtras',
] as const satisfies readonly (keyof Modificadores)[];

export type ModificadoresSomados = { readonly [K in (typeof CHAVES)[number]]: number };

const ZERADOS = (): Record<(typeof CHAVES)[number], number> => {
  const base = {} as Record<(typeof CHAVES)[number], number>;
  for (const chave of CHAVES) base[chave] = 0;
  return base;
};

/**
 * Os tetos.
 *
 * Redução de dano e redução de cooldown precisam de limite, senão uma build
 * que empilhou a mesma tag três vezes chega perto da imunidade ou do cooldown
 * zero — e aí o jogo acaba, não pela build ser boa, mas por a conta ter
 * quebrado. O teto é o que mantém "empilhar funciona, mas tem retorno
 * decrescente" sem precisar de fórmula complicada.
 */
const TETOS: Partial<Record<(typeof CHAVES)[number], number>> = {
  reducaoDeCooldown: 0.55,
  reducaoDeDano: 0.6,
  roubodeVida: 0.35,
  chanceDeCritico: 0.75,
};

export const somarModificadores = (parcial: BuildParcial): ModificadoresSomados => {
  const total = ZERADOS();
  const fontes: readonly Modificadores[] = [
    ...parcial.passivas.map((passiva) => passiva.modificadores),
    ...parcial.equipamentos.map((equipamento) => equipamento.modificadores),
  ];
  for (const fonte of fontes) {
    for (const chave of CHAVES) {
      total[chave] += fonte[chave] ?? 0;
    }
  }
  for (const chave of CHAVES) {
    const teto = TETOS[chave];
    if (teto !== undefined) total[chave] = Math.min(teto, total[chave]);
  }
  return total;
};

/* ---------------------------------------------------------------------------
 * As tags da build.
 * ------------------------------------------------------------------------- */

/** Quantas peças da build carregam cada tag. */
export const contarTags = (parcial: BuildParcial): ReadonlyMap<Tag, number> => {
  const contagem = new Map<Tag, number>();
  const todas: readonly (readonly Tag[])[] = [
    ...parcial.ativas.map((a) => a.tags),
    ...parcial.passivas.map((p) => p.tags),
    ...parcial.equipamentos.map((e) => e.tags),
  ];
  for (const tags of todas) {
    for (const tag of tags) contagem.set(tag, (contagem.get(tag) ?? 0) + 1);
  }
  return contagem;
};

export const ROTULO_DA_TAG: Readonly<Record<Tag, string>> = {
  ruptura: 'Ruptura',
  momentum: 'Momentum',
  defesa: 'Defesa',
  combo: 'Combo',
  execucao: 'Execução',
  cura: 'Cura',
  critico: 'Crítico',
  sangramento: 'Sangramento',
};

export interface TagDaBuild {
  readonly tag: Tag;
  readonly quantidade: number;
  readonly rotulo: string;
}

/** As tags mais presentes, da maior para a menor. Só as que aparecem 2 ou mais. */
export const tagsPrincipais = (parcial: BuildParcial, limite = 3): readonly TagDaBuild[] =>
  [...contarTags(parcial)]
    .filter(([, quantidade]) => quantidade >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limite)
    .map(([tag, quantidade]) => ({ tag, quantidade, rotulo: ROTULO_DA_TAG[tag] }));

/* ---------------------------------------------------------------------------
 * Os atributos finais, já com nível.
 * ------------------------------------------------------------------------- */

export interface Atributos {
  readonly vidaMaxima: number;
  readonly armaduraMaxima: number;
  readonly dano: number;
  readonly reducaoDeCooldown: number;
  readonly chanceDeCritico: number;
  readonly multiplicadorDeCritico: number;
  readonly momentumExtra: number;
  readonly danoPorMomentum: number;
  readonly rupturaExtra: number;
  readonly danoContraSemArmadura: number;
  readonly roubodeVida: number;
  readonly reducaoDeDano: number;
  readonly regeneracaoDeArmadura: number;
  readonly potenciaDePocao: number;
  readonly pocoesExtras: number;
}

export const atributosDaBuild = (parcial: BuildParcial, nivel: number): Atributos => {
  const classe: Classe = classePorId(parcial.classe);
  const somado = somarModificadores(parcial);
  const passos = Math.max(0, nivel - 1);
  const { jogador, pocoes } = BALANCEAMENTO;

  const danoBase = classe.baseDano + passos * jogador.danoPorNivel + somado.danoPlano;

  return {
    vidaMaxima: Math.round(classe.baseVida + passos * jogador.vidaPorNivel + somado.vidaMaxima),
    armaduraMaxima: Math.round(
      classe.baseArmadura + passos * jogador.armaduraPorNivel + somado.armaduraMaxima,
    ),
    dano: danoBase * (1 + somado.danoPercentual),
    reducaoDeCooldown: somado.reducaoDeCooldown,
    chanceDeCritico: jogador.criticoBase.chance + somado.chanceDeCritico,
    multiplicadorDeCritico: jogador.criticoBase.multiplicador + somado.multiplicadorDeCritico,
    momentumExtra: somado.momentumExtra,
    danoPorMomentum: somado.danoPorMomentum,
    rupturaExtra: somado.rupturaExtra,
    danoContraSemArmadura: somado.danoContraSemArmadura,
    roubodeVida: somado.roubodeVida,
    reducaoDeDano: somado.reducaoDeDano,
    regeneracaoDeArmadura: jogador.regeneracaoDeArmaduraPorS + somado.regeneracaoDeArmadura,
    potenciaDePocao: pocoes.curaDaFracao * (1 + somado.potenciaDePocao),
    pocoesExtras: somado.pocoesExtras,
  };
};
