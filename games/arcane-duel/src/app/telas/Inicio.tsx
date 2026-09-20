import { CLASSES } from '../../dados/classes.js';
import type { IdDeClasse } from '../../dados/tipos.js';
import type { Save } from '../../nucleo/salvar.js';
import { recordeDe } from '../../nucleo/salvar.js';

/*
 * A tela inicial e a seleção de classe.
 *
 * As doze classes aparecem desde o primeiro dia, e onze delas dizem "em
 * breve". Isso é deliberado: o jogador precisa ver o tamanho do objetivo —
 * doze classes para concluir, doze para dourar — e não descobrir aos poucos
 * que o jogo é maior do que parecia.
 */

export const Inicio = ({
  save,
  aoJogar,
  aoAlternarSom,
}: {
  readonly save: Save;
  readonly aoJogar: () => void;
  readonly aoAlternarSom: () => void;
}): React.JSX.Element => {
  const concluidas = CLASSES.filter((c) => recordeDe(save, c.id).concluida).length;
  const douradas = CLASSES.filter((c) => recordeDe(save, c.id).dourada).length;

  return (
    <div className="tela centro tela--inicio">
      <div className="marca">
        <h1>ARCANE DUEL</h1>
        <p className="marca__linha pixel">UMA DUNGEON · CINQUENTA SALAS</p>
      </div>

      <button type="button" className="botao botao--forte" onClick={aoJogar}>
        COMEÇAR
      </button>

      <div className="progresso-geral pixel">
        <span>
          CONCLUÍDAS {concluidas}/{CLASSES.length}
        </span>
        <span className={douradas > 0 ? 'dourado' : ''}>
          DOURADAS {douradas}/{CLASSES.length}
        </span>
      </div>

      <button type="button" className="botao botao--discreto" onClick={aoAlternarSom}>
        SOM {save.preferencias.mudo ? 'OFF' : 'ON'}
      </button>
    </div>
  );
};

export const SelecaoDeClasse = ({
  save,
  aoEscolher,
  aoVoltar,
}: {
  readonly save: Save;
  readonly aoEscolher: (classe: IdDeClasse, dourada: boolean) => void;
  readonly aoVoltar: () => void;
}): React.JSX.Element => (
  <div className="tela tela--classes">
    <header className="cabecalho">
      <button type="button" className="botao botao--discreto" onClick={aoVoltar}>
        VOLTAR
      </button>
      <h2>ESCOLHA A CLASSE</h2>
      <span />
    </header>

    <div className="grade-de-classes">
      {CLASSES.map((classe) => {
        const recorde = recordeDe(save, classe.id);
        return (
          <button
            key={classe.id}
            type="button"
            className={`classe${classe.jogavel ? '' : ' classe--bloqueada'}${
              recorde.dourada ? ' classe--dourada' : ''
            }`}
            style={{
              ['--cor-da-classe' as string]: classe.corPrimaria,
              ['--cor-da-classe-escura' as string]: classe.corSecundaria,
            }}
            disabled={!classe.jogavel}
            onClick={() => {
              aoEscolher(classe.id, recorde.dourada);
            }}
          >
            <span className="classe__nome pixel">{classe.nome}</span>
            <span className="classe__lema">{classe.jogavel ? classe.lema : 'Em breve'}</span>
            {classe.jogavel && (
              <span className="classe__recorde pixel">
                {recorde.concluida ? 'CONCLUÍDA' : `RECORDE ${recorde.melhorSala}/50`}
                {recorde.dourada ? ' · DOURADA' : ''}
              </span>
            )}
          </button>
        );
      })}
    </div>

    <p className="rodape-dica">
      O Guerreiro vive de <strong>Momentum</strong> e de quebrar Armadura. As outras onze chegam
      depois.
    </p>
  </div>
);
