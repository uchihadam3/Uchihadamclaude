import type { ReactNode } from 'react';

import type { Slot, Tag } from '../dados/tipos.js';
import type { Familia } from '../fase/arte/emblemas.js';
import { emblemaDaTag, emblemaDoSlot } from '../fase/arte/emblemas.js';
import { ROTULO_DA_TAG } from '../nucleo/build.js';

/*
 * A carta de oferta.
 *
 * Ela existe em três lugares — draft, checkpoint e resumo da build — e é a
 * mesma peça nos três.
 *
 * A versão anterior era um retângulo escuro com um fio colorido em cima. Ela
 * cumpria a função e não era uma carta: era uma linha de lista com borda. O
 * que falta a um retângulo com texto para virar carta é sempre o mesmo —
 * **imagem**, **moldura** e **hierarquia**. Então agora ela tem um emblema em
 * pixel art à esquerda, uma moldura cuja cor diz a categoria antes de
 * qualquer leitura, o nome em fonte de bloco, e o texto em fonte legível.
 *
 * O texto continua curto e em fonte de leitura de propósito. A direção do
 * jogo foi explícita: uma pessoa sem experiência em RPG precisa entender uma
 * escolha rapidamente, e ninguém entende rápido lendo três linhas em fonte de
 * oito pixels.
 *
 * O aviso de sinergia é uma **contagem**, nunca um conselho. "2 sinergias" é
 * um fato que o jogador poderia ter contado sozinho; "melhor escolha" seria
 * jogar por ele.
 */

export interface CartaProps {
  readonly nome: string;
  readonly descricao: string;
  /** O que aparece na tarja: cooldown, slot, ou nada. */
  readonly canto?: string | null;
  readonly tags: readonly Tag[];
  readonly familia: Familia;
  /** Quando é equipamento, o slot manda no emblema. */
  readonly slot?: Slot;
  readonly sinergias?: number;
  readonly escolhida?: boolean;
  readonly recuada?: boolean;
  readonly onClick?: () => void;
  readonly onFocus?: () => void;
  readonly atraso?: number;
}

export const Carta = ({
  nome,
  descricao,
  canto,
  tags,
  familia,
  slot,
  sinergias = 0,
  escolhida = false,
  recuada = false,
  onClick,
  onFocus,
  atraso = 0,
}: CartaProps): ReactNode => {
  const principal = tags[0];
  const emblema =
    slot !== undefined
      ? emblemaDoSlot(slot, familia)
      : principal !== undefined
        ? emblemaDaTag(principal, familia)
        : null;

  return (
    <button
      type="button"
      className={[
        'carta',
        `carta--${familia}`,
        escolhida ? 'carta--escolhida' : '',
        recuada ? 'carta--recuada' : '',
        sinergias > 0 ? 'carta--sinergica' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ animationDelay: `${String(atraso)}ms` }}
      onClick={onClick}
      onPointerEnter={onFocus}
      onFocus={onFocus}
      disabled={onClick === undefined}
    >
      {/* A marca de sinergia, no canto: um selo, e não uma frase. */}
      {sinergias > 0 && (
        <span className="carta__selo" title={`${String(sinergias)} em comum com a sua build`}>
          <span className="carta__selo-numero pixel">{sinergias}</span>
        </span>
      )}

      <span className="carta__emblema">
        {emblema !== null && <img src={emblema} alt="" width={64} height={64} />}
        {canto !== null && canto !== undefined && <span className="carta__tarja pixel">{canto}</span>}
      </span>

      <span className="carta__corpo">
        <span className="carta__nome pixel">{nome}</span>
        <span className="carta__descricao">{descricao}</span>
        <span className="carta__tags">
          {tags.map((tag) => (
            <span key={tag} className={`etiqueta etiqueta--${tag}`}>
              {ROTULO_DA_TAG[tag]}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
};
