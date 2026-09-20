import type { ReactNode } from 'react';

/*
 * As peças pequenas da interface.
 *
 * Nenhuma delas conhece o jogo: recebem números e texto e desenham. É o que
 * permite usar a mesma barra para a Vida do herói e a do boss, e a mesma
 * carta no draft e no checkpoint — sem uma variante por tela.
 */

export const Barra = ({
  valor,
  maximo,
  cor,
  rastro,
  altura,
}: {
  readonly valor: number;
  readonly maximo: number;
  readonly cor: string;
  /** O valor de um instante atrás, para o rastro do dano. */
  readonly rastro?: number;
  readonly altura?: number;
}): ReactNode => {
  const fracao = maximo > 0 ? Math.max(0, Math.min(1, valor / maximo)) : 0;
  const fracaoDoRastro = maximo > 0 ? Math.max(0, Math.min(1, (rastro ?? valor) / maximo)) : 0;
  return (
    <div className="barra" style={altura === undefined ? undefined : { height: altura }}>
      <div className="barra__rastro" style={{ width: `${(fracaoDoRastro * 100).toFixed(2)}%` }} />
      <div
        className="barra__cheio"
        style={{ width: `${(fracao * 100).toFixed(2)}%`, background: cor }}
      />
    </div>
  );
};

/**
 * A sinergia, em losangos.
 *
 * Cinco símbolos, cheios até o nível. É deliberadamente um símbolo e não um
 * número: sinergia é uma sensação de "as peças conversam", e um `3/5` convida
 * a otimizar em vez de entender.
 */
export const Sinergia = ({ nivel }: { readonly nivel: number }): ReactNode => (
  <span className="sinergia" aria-label={`Sinergia ${nivel} de 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={n <= nivel ? 'sinergia__cheio' : 'sinergia__vazio'}>
        {n <= nivel ? '◆' : '◇'}
      </span>
    ))}
  </span>
);

export const Etiqueta = ({
  children,
  cor,
}: {
  readonly children: ReactNode;
  readonly cor?: string;
}): ReactNode => (
  <span className="etiqueta" style={cor === undefined ? undefined : { borderColor: cor, color: cor }}>
    {children}
  </span>
);

export const Painel = ({
  children,
  dourado,
  className,
}: {
  readonly children: ReactNode;
  readonly dourado?: boolean;
  readonly className?: string;
}): ReactNode => (
  <div className={`moldura${dourado === true ? ' moldura--ouro' : ''} ${className ?? ''}`}>
    {children}
  </div>
);
