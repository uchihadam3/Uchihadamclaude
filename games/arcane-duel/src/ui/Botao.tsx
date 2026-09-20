import type { ReactNode } from 'react';

import { audio } from '../audio/AudioManager.js';

/*
 * O botão.
 *
 * Um `<button>` com borda arredondada e sombra suave é um botão de site. O
 * que faz um botão parecer **objeto de jogo** é sempre a mesma lista curta:
 * borda em degraus sem raio nenhum, uma face de cima clara e uma base escura
 * que dá espessura, e — o mais importante — ele **afunda** quando apertado,
 * perdendo a base. O dedo sente que empurrou uma peça física.
 *
 * O som sai daqui, e não de quem usa o botão. Assim nenhuma tela esquece de
 * tocar o clique, e trocar o som é trocar uma linha.
 */

export interface BotaoProps {
  readonly children: ReactNode;
  readonly onClick?: () => void;
  readonly variante?: 'normal' | 'forte' | 'discreto';
  readonly desabilitado?: boolean;
  readonly largo?: boolean;
  readonly legenda?: string;
  readonly atraso?: number;
}

export const Botao = ({
  children,
  onClick,
  variante = 'normal',
  desabilitado = false,
  largo = false,
  legenda,
  atraso = 0,
}: BotaoProps): ReactNode => (
  <button
    type="button"
    className={`peca peca--${variante}${largo ? ' peca--largo' : ''}`}
    style={{ animationDelay: `${atraso}ms` }}
    disabled={desabilitado}
    onPointerEnter={() => {
      if (!desabilitado) audio.tocar('carta-passa');
    }}
    onClick={() => {
      if (desabilitado) return;
      audio.tocar('carta-escolhe');
      onClick?.();
    }}
  >
    <span className="peca__face">
      <span className="peca__texto">{children}</span>
      {legenda !== undefined && <small className="peca__legenda">{legenda}</small>}
    </span>
  </button>
);
