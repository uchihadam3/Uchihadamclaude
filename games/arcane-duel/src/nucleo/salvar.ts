import type { IdDeClasse } from '../dados/tipos.js';

/*
 * A persistência.
 *
 * `localStorage`, e nada além disso — não há backend nesta fase, e inventar
 * um agora só adiaria o jogo. O formato é versionado porque ele vai mudar:
 * quando a segunda classe chegar, um save antigo precisa ou migrar ou ser
 * descartado com clareza, e nunca quebrar a tela de início.
 */

const CHAVE = 'arcane-duel:save:v1';

export interface RecordeDeClasse {
  readonly melhorSala: number;
  readonly concluida: boolean;
  readonly dourada: boolean;
  /** A build que venceu, guardada para a tela de resultado e o compartilhamento. */
  readonly buildVencedora?: readonly string[];
  readonly seedVencedora?: string;
  readonly runs: number;
}

export interface Save {
  readonly versao: 1;
  readonly classes: Readonly<Partial<Record<IdDeClasse, RecordeDeClasse>>>;
  readonly preferencias: {
    /* Música e efeitos são controles separados: quem joga no ônibus quer o
     * efeito sem a trilha, e juntar os dois num só tira essa escolha. */
    readonly volumeDaMusica: number;
    readonly volumeDosEfeitos: number;
    readonly velocidade: number;
  };
  /** O jogador já viu que existe Maestria Dourada? */
  readonly conheceAMaestria: boolean;
}

export const SAVE_VAZIO: Save = {
  versao: 1,
  classes: {},
  preferencias: { volumeDaMusica: 0.55, volumeDosEfeitos: 0.7, velocidade: 1 },
  conheceAMaestria: false,
};

/**
 * Um save só é aceito se tiver a forma esperada **inteira**.
 *
 * Um save de versão anterior, com `volume` em vez dos dois controles
 * separados, é descartado em silêncio e o jogo abre com o padrão. Migrar
 * valeria a pena se houvesse progresso de verdade guardado; nesta fase,
 * descartar é honesto e não deixa meia estrutura circulando.
 */
const ehSave = (valor: unknown): valor is Save => {
  if (typeof valor !== 'object' || valor === null) return false;
  const bruto = valor as { versao?: unknown; classes?: unknown; preferencias?: unknown };
  if (bruto.versao !== 1) return false;
  if (typeof bruto.classes !== 'object' || bruto.classes === null) return false;
  const pref = bruto.preferencias as { volumeDaMusica?: unknown } | undefined;
  return typeof pref?.volumeDaMusica === 'number';
};

export const carregar = (): Save => {
  try {
    const bruto = globalThis.localStorage.getItem(CHAVE);
    if (bruto === null) return SAVE_VAZIO;
    const analisado: unknown = JSON.parse(bruto);
    return ehSave(analisado) ? analisado : SAVE_VAZIO;
  } catch {
    /* Aba anônima, armazenamento bloqueado, JSON corrompido: joga-se assim mesmo. */
    return SAVE_VAZIO;
  }
};

export const salvar = (save: Save): void => {
  try {
    globalThis.localStorage.setItem(CHAVE, JSON.stringify(save));
  } catch {
    /* Perder o save é ruim; perder a partida em curso por causa disso é pior. */
  }
};

export const recordeDe = (save: Save, classe: IdDeClasse): RecordeDeClasse =>
  save.classes[classe] ?? { melhorSala: 0, concluida: false, dourada: false, runs: 0 };

export interface FimDeRun {
  readonly classe: IdDeClasse;
  readonly salaAlcancada: number;
  readonly venceu: boolean;
  readonly derrotouSoberano: boolean;
  readonly build: readonly string[];
  readonly seed: string;
}

/** Registra o fim de uma run. Só melhora o recorde, nunca piora. */
export const registrarRun = (save: Save, fim: FimDeRun): Save => {
  const antes = recordeDe(save, fim.classe);
  const depois: RecordeDeClasse = {
    melhorSala: Math.max(antes.melhorSala, fim.salaAlcancada),
    concluida: antes.concluida || fim.venceu,
    dourada: antes.dourada || fim.derrotouSoberano,
    runs: antes.runs + 1,
    ...(fim.venceu ? { buildVencedora: fim.build, seedVencedora: fim.seed } : {}),
  };
  return { ...save, classes: { ...save.classes, [fim.classe]: depois } };
};

export const marcarMaestriaConhecida = (save: Save): Save => ({ ...save, conheceAMaestria: true });

export const comPreferencias = (save: Save, preferencias: Partial<Save['preferencias']>): Save => ({
  ...save,
  preferencias: { ...save.preferencias, ...preferencias },
});
