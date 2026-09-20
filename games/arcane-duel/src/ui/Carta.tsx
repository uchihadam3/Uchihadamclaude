import type { ReactNode } from 'react';

import { ROTULO_DA_TAG } from '../nucleo/build.js';
import type { Tag } from '../dados/tipos.js';

/*
 * A carta de escolha.
 *
 * Ela existe em três lugares — draft, checkpoint e resumo da build — e é a
 * mesma peça nos três. O que ela mostra é o mínimo: nome, uma frase, e os
 * números que importam. A direção do jogo foi explícita nisso, e a tentação
 * de acrescentar "categoria", "raridade" e "nível de poder" é justamente o
 * que faria uma pessoa sem experiência em RPG travar na primeira escolha.
 *
 * O aviso de sinergia é discreto de propósito e nunca diz qual é a melhor: o
 * sistema ajuda a entender, não joga pelo jogador.
 */

export interface CartaProps {
  readonly nome: string;
  readonly descricao: string;
  /** O que aparece no canto: cooldown, slot, ou nada. */
  readonly canto?: string | null;
  readonly tags: readonly Tag[];
  readonly sinergias?: number;
  readonly escolhida?: boolean;
  readonly recuada?: boolean;
  readonly onClick?: () => void;
  readonly onFocus?: () => void;
  readonly cor?: string;
  readonly atraso?: number;
}

export const Carta = ({
  nome,
  descricao,
  canto,
  tags,
  sinergias = 0,
  escolhida = false,
  recuada = false,
  onClick,
  onFocus,
  cor,
  atraso = 0,
}: CartaProps): ReactNode => (
  <button
    type="button"
    className={`carta${escolhida ? ' carta--escolhida' : ''}${recuada ? ' carta--recuada' : ''}`}
    style={{
      animationDelay: `${atraso}ms`,
      ...(cor === undefined ? {} : { ['--cor-da-carta' as string]: cor }),
    }}
    onClick={onClick}
    onMouseEnter={onFocus}
    onFocus={onFocus}
    disabled={onClick === undefined}
  >
    <span className="carta__topo">
      <span className="carta__nome">{nome}</span>
      {canto !== null && canto !== undefined && <span className="carta__canto">{canto}</span>}
    </span>

    <span className="carta__descricao">{descricao}</span>

    <span className="carta__rodape">
      <span className="carta__tags">
        {tags.map((tag) => (
          <span key={tag} className="carta__tag">
            {ROTULO_DA_TAG[tag]}
          </span>
        ))}
      </span>
      {sinergias > 0 && (
        <span className="carta__sinergia">
          {sinergias} {sinergias === 1 ? 'sinergia' : 'sinergias'}
        </span>
      )}
    </span>
  </button>
);
