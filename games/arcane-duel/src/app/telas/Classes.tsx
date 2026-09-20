import { CLASSES } from '../../dados/classes.js';
import type { IdDeClasse } from '../../dados/tipos.js';
import { gerarAnimacao } from '../../fase/arte/guerreiro.js';
import type { Save } from '../../nucleo/salvar.js';
import { recordeDe } from '../../nucleo/salvar.js';
import { Botao } from '../../ui/Botao.js';
import { Retrato } from '../../ui/Retrato.js';

/*
 * A seleção de classe.
 *
 * Doze fichas, e só uma jogável. As onze restantes não são escondidas: o
 * jogador precisa ver o tamanho do objetivo — doze para concluir, doze para
 * dourar — desde o primeiro minuto.
 *
 * A ficha do Guerreiro mostra o **sprite animado** dele, e não um quadrado
 * colorido. É o mesmo boneco que vai lutar, respirando na tela de seleção, e
 * é o que transforma uma lista em elenco.
 */

export const Classes = ({
  save,
  aoEscolher,
  aoVoltar,
}: {
  readonly save: Save;
  readonly aoEscolher: (classe: IdDeClasse, dourada: boolean) => void;
  readonly aoVoltar: () => void;
}): React.JSX.Element => {
  const guerreiro = recordeDe(save, 'guerreiro');
  const classePrincipal = CLASSES[0];

  return (
    <div className="tela tela--classes">
      <header className="cabecalho">
        <Botao variante="discreto" onClick={aoVoltar}>
          VOLTAR
        </Botao>
        <h2>ESCOLHA A CLASSE</h2>
        <span />
      </header>

      <div className="palco-de-classe">
        {classePrincipal !== undefined && (
          <div className={`ficha-de-classe moldura${guerreiro.dourada ? ' moldura--ouro' : ''}`}>
            <Retrato
              quadros={gerarAnimacao('repouso', { dourado: guerreiro.dourada })}
              fps={7}
              escala={3}
            />
            <div className="ficha-de-classe__texto">
              <h3 style={{ color: guerreiro.dourada ? 'var(--ouro)' : classePrincipal.corPrimaria }}>
                {classePrincipal.nome}
                {guerreiro.dourada ? ' DOURADO' : ''}
              </h3>
              <p className="ficha-de-classe__lema">{classePrincipal.lema}</p>
              <p className="ficha-de-classe__detalhe">
                Vive de <strong>Momentum</strong> e de quebrar Armadura. Quanto mais o inimigo
                perde a guarda, mais forte ele bate.
              </p>
              <div className="linhas pixel">
                <span>RECORDE</span>
                <span>{guerreiro.melhorSala} / 50</span>
                <span>RUNS</span>
                <span>{guerreiro.runs}</span>
                <span>ESTADO</span>
                <span className={guerreiro.dourada ? 'dourado' : ''}>
                  {guerreiro.dourada ? 'DOURADA' : guerreiro.concluida ? 'CONCLUÍDA' : 'ABERTA'}
                </span>
              </div>
              <Botao
                variante="forte"
                onClick={() => {
                  aoEscolher('guerreiro', guerreiro.dourada);
                }}
              >
                SELECIONAR
              </Botao>
            </div>
          </div>
        )}

        <div className="em-breve">
          {CLASSES.filter((c) => !c.jogavel).map((classe) => (
            <div
              key={classe.id}
              className="ficha-trancada"
              style={{ ['--cor-da-classe' as string]: classe.corPrimaria }}
            >
              <span className="ficha-trancada__nome pixel">{classe.nome}</span>
              <span className="ficha-trancada__selo pixel">EM BREVE</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
