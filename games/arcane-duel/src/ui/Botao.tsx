import type { ReactNode } from 'react';

import { audio } from '../audio/AudioManager.js';

/*
 * A peça.
 *
 * Um `<button>` com borda arredondada e sombra suave é um botão de site. O
 * que faz um botão parecer **objeto de jogo** é sempre a mesma lista curta:
 * borda em degraus sem raio nenhum, uma face de cima clara e uma base escura
 * que dá espessura, rebites de metal nas pontas, e — o mais importante — ele
 * **afunda** quando apertado, perdendo a base. O dedo sente que empurrou uma
 * peça física.
 *
 * O desenho todo mora no `kit.css`, e não aqui: assim o botão do menu e o
 * botão do draft não podem divergir por descuido.
 *
 * O som sai daqui, e não de quem usa o botão. Assim nenhuma tela esquece de
 * tocar o clique, e trocar o som é trocar uma linha.
 */

export type VarianteDaPeca = 'normal' | 'forte' | 'discreto' | 'mini';

export interface BotaoProps {
  readonly children: ReactNode;
  readonly onClick?: () => void;
  readonly variante?: VarianteDaPeca;
  readonly desabilitado?: boolean;
  readonly legenda?: string;
  readonly atraso?: number;
  readonly rotulo?: string;
  readonly selecionado?: boolean;
}

export const Botao = ({
  children,
  onClick,
  variante = 'normal',
  desabilitado = false,
  legenda,
  atraso = 0,
  rotulo,
  selecionado,
}: BotaoProps): ReactNode => (
  <button
    type="button"
    className={`peca peca--${variante}${selecionado === true ? ' peca--ativa' : ''}`}
    style={{ animationDelay: `${String(atraso)}ms` }}
    disabled={desabilitado}
    aria-label={rotulo}
    aria-pressed={selecionado}
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
