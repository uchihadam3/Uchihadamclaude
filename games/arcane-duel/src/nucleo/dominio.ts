import { BALANCEAMENTO } from '../dados/balanceamento.js';

/*
 * O domínio secreto.
 *
 * Existe uma condição que o jogador nunca vê escrita, e cumpri-la desperta o
 * Soberano. A fórmula é calibrável e não exige um estilo: uma build muito
 * ofensiva compensa com tempo o que perde em Vida, e uma defensiva compensa
 * com Vida o que perde em velocidade. Os três fatores somam 1 e o corte é
 * alto — despertar precisa ser raro, senão deixa de ser segredo.
 *
 * O número **não** aparece na interface em lugar nenhum. O que o jogador vê é
 * o boss cair, uma pausa que não devia existir, um som errado, e o `???`.
 */

export interface DesempenhoNoBossFinal {
  /** Quanto durou a luta contra o Boss 50, em segundos. */
  readonly tempoS: number;
  readonly vidaRestante: number;
  readonly vidaMaxima: number;
  readonly pocoesRestantes: number;
  readonly pocoesMaximas: number;
}

/** Um valor de 0 a 1, cortado nas pontas. */
const normalizar = (valor: number, minimo: number, maximo: number): number =>
  Math.max(0, Math.min(1, (valor - minimo) / Math.max(0.0001, maximo - minimo)));

/**
 * A nota de domínio, de 0 a 1.
 *
 * Exportada para o teste — e só para ele. Nenhuma tela importa esta função.
 */
export const notaDeDominio = (desempenho: DesempenhoNoBossFinal): number => {
  const cfg = BALANCEAMENTO.dominio;

  /* Tempo: rápido é melhor, e a escala é invertida de propósito. */
  const tempo = 1 - normalizar(desempenho.tempoS, cfg.tempoExcelenteS, cfg.tempoAceitavelS);

  const vida = normalizar(
    desempenho.vidaMaxima > 0 ? desempenho.vidaRestante / desempenho.vidaMaxima : 0,
    0.12,
    0.72,
  );

  const pocoes = normalizar(
    desempenho.pocoesMaximas > 0 ? desempenho.pocoesRestantes / desempenho.pocoesMaximas : 0,
    0,
    0.7,
  );

  return tempo * cfg.pesoDeTempo + vida * cfg.pesoDeVida + pocoes * cfg.pesoDePocoes;
};

/** O Soberano acorda? */
export const despertaOSoberano = (desempenho: DesempenhoNoBossFinal): boolean =>
  notaDeDominio(desempenho) >= BALANCEAMENTO.dominio.corte;
