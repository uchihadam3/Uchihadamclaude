/*
 * As transições entre telas.
 *
 * Trocar de tela instantaneamente é o que faz um jogo parecer um site: a
 * pessoa clica e o conteúdo é substituído, como numa navegação. Um jogo leva
 * você de um lugar para o outro, e o meio do caminho é parte da experiência.
 *
 * São três, curtas de propósito — duzentos e poucos milissegundos cada. Uma
 * transição bonita na primeira vez é cansativa na vigésima, e este é um jogo
 * de runs curtas: o jogador vai atravessar estas telas muitas vezes.
 */

export type Estilo =
  /** Um véu escuro que fecha e abre. Serve para qualquer troca. */
  | 'cortina'
  /** Duas folhas que abrem do centro: entrar na dungeon. */
  | 'portal'
  /** Clarão curto: usado quando a run termina em vitória. */
  | 'clarao';

export interface TransicaoProps {
  readonly estilo: Estilo;
  /** 0 a 1, ida; a tela troca no meio. */
  readonly progresso: number;
}

export const DURACAO_DA_TRANSICAO_MS = 460;

export const Transicao = ({ estilo, progresso }: TransicaoProps): React.JSX.Element | null => {
  if (progresso <= 0 || progresso >= 1) return null;

  /* Sobe até o meio e desce: a troca acontece exatamente no pico. */
  const cobertura = 1 - Math.abs(progresso - 0.5) * 2;

  if (estilo === 'portal') {
    /* Duas folhas de pedra que fecham e reabrem. */
    return (
      <div className="transicao" aria-hidden="true">
        <div className="transicao__folha transicao__folha--esquerda" style={{ width: `${cobertura * 51}%` }} />
        <div className="transicao__folha transicao__folha--direita" style={{ width: `${cobertura * 51}%` }} />
        <div className="transicao__fresta" style={{ opacity: cobertura }} />
      </div>
    );
  }

  if (estilo === 'clarao') {
    return (
      <div
        className="transicao transicao--clarao"
        aria-hidden="true"
        style={{ opacity: cobertura }}
      />
    );
  }

  return (
    <div
      className="transicao transicao--cortina"
      aria-hidden="true"
      style={{ opacity: cobertura }}
    />
  );
};
