/*
 * O vocabulário do jogo, em um lugar só.
 *
 * Tudo abaixo é **dado**, não regra. Uma habilidade não sabe somar dano; ela
 * declara o que faz, e o motor de combate resolve. É essa separação que
 * permite acrescentar as outras onze classes depois sem tocar em sistema
 * nenhum — a classe nova é uma entrada nova nesta mesma forma.
 */

export type IdDeClasse =
  | 'guerreiro'
  | 'mago'
  | 'clerigo'
  | 'necromante'
  | 'paladino'
  | 'ladino'
  | 'bardo'
  | 'monge'
  | 'cacador'
  | 'barbaro'
  | 'druida'
  | 'bruxo';

/**
 * As tags de sinergia.
 *
 * Elas são o idioma em que a build fala consigo mesma: uma passiva que
 * recompensa Ruptura e um ataque que causa Ruptura se reconhecem por aqui, e é
 * disso que o medidor de Sinergia vive. Cada classe traz as suas; estas são as
 * do Guerreiro mais as universais.
 */
export type Tag =
  | 'ruptura'
  | 'momentum'
  | 'defesa'
  | 'combo'
  | 'execucao'
  | 'cura'
  | 'critico'
  | 'sangramento';

/** Onde um equipamento entra. Três slots, um de cada. */
export type Slot = 'arma' | 'armadura' | 'reliquia';

/* ---------------------------------------------------------------------------
 * Efeitos: o que uma habilidade faz quando dispara.
 * ------------------------------------------------------------------------- */

/**
 * Um efeito é uma instrução simples, e a profundidade nasce da combinação.
 *
 * A regra da direção do jogo é literal: "cada peça é simples". Por isso não
 * existe efeito condicional aninhado aqui. Existe `se`, com uma condição de
 * uma linha, e o resto são números.
 */
export type Efeito =
  | { readonly tipo: 'dano'; readonly valor: number }
  /** Dano que ignora Armadura por completo. */
  | { readonly tipo: 'dano-perfurante'; readonly valor: number }
  | { readonly tipo: 'quebrar-armadura'; readonly valor: number }
  | { readonly tipo: 'ganhar-momentum'; readonly valor: number }
  | { readonly tipo: 'gastar-momentum'; readonly valor: number }
  | { readonly tipo: 'ganhar-armadura'; readonly valor: number }
  | { readonly tipo: 'curar'; readonly valor: number }
  /** Cura em fração da Vida máxima, de 0 a 1. */
  | { readonly tipo: 'curar-fracao'; readonly valor: number }
  | { readonly tipo: 'sangrar'; readonly valor: number; readonly duracaoS: number }
  /** Acelera os próprios cooldowns por um tempo. */
  | { readonly tipo: 'acelerar'; readonly valor: number; readonly duracaoS: number }
  /** Reduz o dano recebido por um tempo, de 0 a 1. */
  | { readonly tipo: 'proteger'; readonly valor: number; readonly duracaoS: number };

/** A condição de um efeito extra. Uma linha, legível em voz alta. */
export type Condicao =
  | { readonly tipo: 'alvo-sem-armadura' }
  | { readonly tipo: 'alvo-abaixo-de'; readonly fracao: number }
  | { readonly tipo: 'eu-abaixo-de'; readonly fracao: number }
  | { readonly tipo: 'momentum-minimo'; readonly valor: number };

export interface EfeitoCondicional {
  readonly se: Condicao;
  readonly entao: readonly Efeito[];
}

/* ---------------------------------------------------------------------------
 * As peças que o jogador escolhe.
 * ------------------------------------------------------------------------- */

export interface Habilidade {
  readonly id: string;
  readonly classe: IdDeClasse;
  readonly nome: string;
  /** Uma frase curta. Se precisar de duas, a habilidade está complicada demais. */
  readonly descricao: string;
  readonly cooldownS: number;
  readonly efeitos: readonly Efeito[];
  readonly condicionais?: readonly EfeitoCondicional[];
  readonly tags: readonly Tag[];
  /**
   * O peso da habilidade na hora de escolher o que usar, e o tamanho do
   * feedback na tela. `basico` sacode pouco; `ultimate` sacode a tela.
   */
  readonly porte: 'basico' | 'skill' | 'ultimate';
  /** Só entra na oferta se a build já puder pagar: custo em Momentum. */
  readonly custoDeMomentum?: number;
}

export interface Passiva {
  readonly id: string;
  readonly classe: IdDeClasse;
  readonly nome: string;
  readonly descricao: string;
  readonly tags: readonly Tag[];
  readonly modificadores: Modificadores;
}

export interface Equipamento {
  readonly id: string;
  readonly classe: IdDeClasse | 'universal';
  readonly slot: Slot;
  readonly nome: string;
  readonly descricao: string;
  readonly tags: readonly Tag[];
  readonly modificadores: Modificadores;
}

/**
 * Os modificadores que uma passiva ou um equipamento aplica.
 *
 * Todos são opcionais e todos se **somam** entre si — nenhum multiplica outro.
 * Multiplicação encadeada é o caminho mais curto para uma build quebrada que
 * ninguém consegue explicar, e para um texto que ninguém consegue ler.
 */
export interface Modificadores {
  readonly vidaMaxima?: number;
  readonly armaduraMaxima?: number;
  readonly danoPlano?: number;
  /** Fração somada ao dano final: 0.15 é +15 %. */
  readonly danoPercentual?: number;
  /** Fração de redução de cooldown, de 0 a 1. */
  readonly reducaoDeCooldown?: number;
  readonly chanceDeCritico?: number;
  readonly multiplicadorDeCritico?: number;
  /** Momentum ganho a mais por evento que gera Momentum. */
  readonly momentumExtra?: number;
  /** Dano adicional por ponto de Momentum no instante do golpe. */
  readonly danoPorMomentum?: number;
  /** Armadura quebrada a mais por golpe que quebra Armadura. */
  readonly rupturaExtra?: number;
  /** Dano adicional contra alvo sem Armadura. */
  readonly danoContraSemArmadura?: number;
  /** Fração do dano causado devolvida como Vida. */
  readonly roubodeVida?: number;
  /** Fração do dano recebido que é ignorada. */
  readonly reducaoDeDano?: number;
  /** Armadura recuperada por segundo. */
  readonly regeneracaoDeArmadura?: number;
  /** Fração a mais curada pelas poções. */
  readonly potenciaDePocao?: number;
  /** Poções extras por área. */
  readonly pocoesExtras?: number;
}

/* ---------------------------------------------------------------------------
 * Classe, inimigos e áreas.
 * ------------------------------------------------------------------------- */

export interface Classe {
  readonly id: IdDeClasse;
  readonly nome: string;
  /** Uma linha que diz do que a classe vive. */
  readonly lema: string;
  readonly jogavel: boolean;
  readonly corPrimaria: string;
  readonly corSecundaria: string;
  /** O recurso próprio da classe, mostrado no HUD. */
  readonly recurso: { readonly nome: string; readonly maximo: number };
  readonly baseVida: number;
  readonly baseArmadura: number;
  readonly baseDano: number;
  /** As tags que a classe naturalmente favorece, para o cálculo de Poder. */
  readonly afinidades: readonly Tag[];
}

export interface Inimigo {
  readonly id: string;
  readonly nome: string;
  readonly porte: 'normal' | 'elite' | 'boss';
  readonly vida: number;
  readonly armadura: number;
  readonly dano: number;
  /** Segundos entre ataques. */
  readonly intervaloS: number;
  readonly exp: number;
  /** Área em que ele aparece, 1 a 5. */
  readonly area: number;
  /** Um golpe pesado ocasional, quando o inimigo tem um. */
  readonly especial?: {
    readonly nome: string;
    readonly aCadaS: number;
    readonly dano: number;
    readonly quebraArmadura?: number;
    /**
     * O golpe passa direto pela Armadura?
     *
     * Existe porque um boss tinha o comentário "ignora Armadura por completo"
     * e nenhum campo para dizer isso — o motor mandava o golpe pelo caminho
     * normal e a build de placa o absorvia inteiro. O comentário mentia, e
     * comentário que mente é pior que comentário nenhum.
     *
     * É a resposta de projeto para a build que empilha Armadura: ela precisa
     * de **outra** saída contra este inimigo, e não de mais placa.
     */
    readonly ignoraArmadura?: boolean;
  };
  readonly silhueta: SilhuetaDoInimigo;
}

/** Como o gerador procedural deve desenhar este inimigo. */
export interface SilhuetaDoInimigo {
  readonly forma: 'humanoide' | 'besta' | 'espectro' | 'construto' | 'aberracao';
  readonly corpo: string;
  readonly detalhe: string;
  readonly brilho: string;
  /** Largura e altura em pixels de arte, antes da ampliação. */
  readonly largura: number;
  readonly altura: number;
}

export interface Area {
  readonly numero: number;
  readonly nome: string;
  readonly salaInicial: number;
  readonly salaFinal: number;
  readonly paleta: PaletaDeArea;
}

/** As cores que fazem uma área não parecer a anterior. */
export interface PaletaDeArea {
  readonly ceu: readonly [string, string];
  readonly fundoDistante: string;
  readonly fundoMedio: string;
  readonly chao: string;
  readonly chaoDetalhe: string;
  readonly neblina: string;
  readonly luz: string;
  readonly particula: string;
  /** O que flutua no ar desta área. */
  readonly clima: 'folhas' | 'poeira' | 'brasas' | 'faiscas' | 'cinzas';
}
