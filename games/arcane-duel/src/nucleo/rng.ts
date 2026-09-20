/*
 * O acaso com endereço.
 *
 * A seed precisa reproduzir a run inteira: as mesmas ofertas de draft, os
 * mesmos rerolls, as mesmas recompensas de checkpoint. `Math.random` não serve
 * para isso — ele não tem estado que se possa nomear, guardar e repetir.
 *
 * Aqui há duas coisas, e a diferença entre elas é o que faz a promessa
 * funcionar: um gerador com estado (para sequências) e um **sorteio por
 * endereço** (para perguntas isoladas). A segunda é a importante. Se a oferta
 * da terceira ativa saísse de um gerador com estado, ela mudaria conforme
 * quantos rerolls o jogador tivesse gastado antes — e duas pessoas com a mesma
 * seed veriam coisas diferentes. Perguntando "o que sai em `ativa:2:reroll:1`"
 * a resposta é sempre a mesma, para todo mundo, para sempre.
 */

/** Hash de string para inteiro de 32 bits. Determinístico e bem espalhado. */
const hashDeTexto = (texto: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i += 1) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** mulberry32: pequeno, rápido e de qualidade suficiente para sorteio de jogo. */
const mulberry32 = (semente: number): (() => number) => {
  let estado = semente >>> 0;
  return () => {
    estado = (estado + 0x6d2b79f5) >>> 0;
    let t = estado;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export interface Aleatorio {
  /** Um número em [0, 1). */
  readonly proximo: () => number;
  /** Um inteiro em [0, limite). */
  readonly inteiro: (limite: number) => number;
  /** Um item da lista. */
  readonly escolher: <T>(lista: readonly T[]) => T;
  /** `quantos` itens distintos da lista, na ordem sorteada. */
  readonly amostrar: <T>(lista: readonly T[], quantos: number) => readonly T[];
}

const construir = (proximo: () => number): Aleatorio => {
  const inteiro = (limite: number): number =>
    limite <= 0 ? 0 : Math.min(limite - 1, Math.floor(proximo() * limite));

  const escolher = <T>(lista: readonly T[]): T => {
    const item = lista[inteiro(lista.length)];
    if (item === undefined) throw new Error('sorteio em lista vazia');
    return item;
  };

  const amostrar = <T>(lista: readonly T[], quantos: number): readonly T[] => {
    // Embaralhamento de Fisher-Yates parcial: sem repetição e sem viés.
    const copia = [...lista];
    const quantidade = Math.min(quantos, copia.length);
    for (let i = 0; i < quantidade; i += 1) {
      const j = i + inteiro(copia.length - i);
      const a = copia[i];
      const b = copia[j];
      if (a === undefined || b === undefined) continue;
      copia[i] = b;
      copia[j] = a;
    }
    return copia.slice(0, quantidade);
  };

  return { proximo, inteiro, escolher, amostrar };
};

/** Um gerador com estado, para sequências dentro de um mesmo momento. */
export const criarAleatorio = (semente: string | number): Aleatorio =>
  construir(mulberry32(typeof semente === 'number' ? semente : hashDeTexto(semente)));

/**
 * Um gerador **por endereço**.
 *
 * `sortearEm(seed, 'ativa:2:oferta:1')` responde sempre a mesma coisa, sem
 * depender de nada que tenha acontecido antes. É o que permite prometer que
 * duas pessoas com a mesma seed vejam as mesmas ofertas.
 */
export const sortearEm = (seed: string, endereco: string): Aleatorio =>
  criarAleatorio(`${seed}::${endereco}`);

/** Uma seed curta, legível e fácil de ditar em voz alta. */
export const gerarSeed = (): string => {
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let seed = '';
  for (let i = 0; i < 8; i += 1) {
    seed += alfabeto[Math.floor(Math.random() * alfabeto.length)] ?? 'A';
  }
  return seed;
};

/** Normaliza o que o jogador digitou: maiúsculas e sem espaço. */
export const normalizarSeed = (bruta: string): string =>
  bruta.trim().toUpperCase().replace(/\s+/g, '').slice(0, 24);
