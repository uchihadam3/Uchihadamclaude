import type { ReactNode } from 'react';

/*
 * O painel de diagnóstico.
 *
 * Existe por um motivo específico: a direção pediu para provar que o HUD e a
 * simulação leem o **mesmo** estado, e não duas cópias que divergem. A prova
 * não é um argumento, é esta tabela — de um lado o que a simulação tem, do
 * outro o que a tela está mostrando, e a diferença entre os dois.
 *
 * Ele só aparece com `?debug=1` na URL. Não há botão para ligá-lo, não há
 * menu, e nada no jogo o menciona: quem não souber que ele existe nunca vai
 * encontrá-lo. O componente inteiro sai do bundle final? Não — ele é pequeno
 * e fica, mas nunca é montado sem a chave.
 */

/** A chave está na URL? Lida uma vez, porque ela não muda durante a partida. */
export const diagnosticoLigado = (): boolean => {
  try {
    return new URLSearchParams(globalThis.location.search).get('debug') === '1';
  } catch {
    return false;
  }
};

export interface LinhaDeDiagnostico {
  readonly nome: string;
  /** O valor que a simulação tem agora. */
  readonly sim: number;
  /** O valor que o HUD está desenhando agora. */
  readonly hud: number;
  /** Quantas casas decimais importam nesta linha. */
  readonly casas?: number;
}

export interface DiagnosticoProps {
  readonly linhas: readonly LinhaDeDiagnostico[];
  readonly passos: number;
  readonly quadros: number;
  readonly tempoDeSimulacaoS: number;
  readonly velocidade: number;
  readonly cortes: number;
}

const formatar = (valor: number, casas: number): string => valor.toFixed(casas);

export const Diagnostico = ({
  linhas,
  passos,
  quadros,
  tempoDeSimulacaoS,
  velocidade,
  cortes,
}: DiagnosticoProps): ReactNode => {
  const divergentes = linhas.filter((l) => Math.abs(l.sim - l.hud) > 0.0001);

  return (
    <div className="diagnostico" role="status">
      <div className="diagnostico__titulo pixel">
        DIAGNÓSTICO
        <span className={divergentes.length === 0 ? 'diagnostico__ok' : 'diagnostico__erro'}>
          {divergentes.length === 0 ? 'SIM = HUD' : `${String(divergentes.length)} DIVERGEM`}
        </span>
      </div>

      <table className="diagnostico__tabela">
        <thead>
          <tr>
            <th>campo</th>
            <th>sim</th>
            <th>hud</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => {
            const casas = linha.casas ?? 1;
            const diverge = Math.abs(linha.sim - linha.hud) > 0.0001;
            return (
              <tr key={linha.nome} className={diverge ? 'diagnostico__linha--diverge' : undefined}>
                <td>{linha.nome}</td>
                <td>{formatar(linha.sim, casas)}</td>
                <td>{formatar(linha.hud, casas)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="diagnostico__rodape">
        <span>passos {passos}</span>
        <span>quadros {quadros}</span>
        <span>t {tempoDeSimulacaoS.toFixed(2)}s</span>
        <span>{velocidade}x</span>
        <span>
          passos/quadro {quadros > 0 ? (passos / quadros).toFixed(2) : '0.00'}
        </span>
        <span className={cortes > 0 ? 'diagnostico__erro' : undefined}>cortes {cortes}</span>
      </div>
    </div>
  );
};
