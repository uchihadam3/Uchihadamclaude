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
 *
 * O layout foi refeito para o **telefone em pé**, que é como o jogo vai ser
 * jogado. A versão anterior era duas colunas de desktop espremidas: o texto
 * caía fora da tela pela direita e o botão de selecionar ficava pela metade.
 * Agora a ordem é vertical — retrato, nome, o que a classe faz, números,
 * botão — e só quando há largura sobrando as duas primeiras viram colunas.
 *
 * A marcação é a **mesma** nas duas orientações. Duas árvores diferentes por
 * orientação é o caminho curto para uma delas apodrecer sem ninguém notar.
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
  const trancadas = CLASSES.filter((c) => !c.jogavel);

  return (
    <div className="tela tela--classes">
      <header className="cabecalho">
        <Botao variante="discreto" onClick={aoVoltar}>
          VOLTAR
        </Botao>
        <h2>ESCOLHA A CLASSE</h2>
        <span className="cabecalho__eco pixel">1 / 12</span>
      </header>

      {classePrincipal !== undefined && (
        <div className="palco-de-classe">
          <div className={`heroi${guerreiro.dourada ? ' heroi--dourado' : ''}`}>
            {/*
              O palco do retrato.
              Um disco de luz atrás e uma sombra de contato embaixo. Sem os
              dois o sprite fica colado num retângulo e parece recorte.
            */}
            <div className="heroi__palco">
              <Retrato
                quadros={gerarAnimacao('repouso', { dourado: guerreiro.dourada })}
                fps={7}
                escala={3}
              />
            </div>

            <div className="heroi__ficha">
              <h3
                className="heroi__nome"
                style={{ color: guerreiro.dourada ? 'var(--ouro-3)' : classePrincipal.corPrimaria }}
              >
                {classePrincipal.nome}
                {guerreiro.dourada ? ' DOURADO' : ''}
              </h3>
              <p className="heroi__lema">{classePrincipal.lema}</p>
              <p className="heroi__detalhe">
                Vive de <strong>Momentum</strong> e de quebrar Armadura. Quanto mais o inimigo
                perde a guarda, mais forte ele bate.
              </p>

              <div className="heroi__numeros">
                <Numero rotulo="RECORDE" valor={`${String(guerreiro.melhorSala)}/50`} />
                <Numero rotulo="RUNS" valor={String(guerreiro.runs)} />
                <Numero
                  rotulo="ESTADO"
                  valor={guerreiro.dourada ? 'DOURADA' : guerreiro.concluida ? 'FEITA' : 'ABERTA'}
                  destacado={guerreiro.dourada}
                />
              </div>
            </div>
          </div>

          <div className="palco-de-classe__acao">
            <Botao
              variante="forte"
              onClick={() => {
                aoEscolher('guerreiro', guerreiro.dourada);
              }}
            >
              SELECIONAR
            </Botao>
          </div>

          <div className="em-breve">
            <span className="em-breve__titulo pixel">OUTRAS CLASSES</span>
            <div className="em-breve__grade">
              {trancadas.map((classe) => (
                <span
                  key={classe.id}
                  className="ficha-trancada pixel"
                  style={{ ['--cor-da-classe' as string]: classe.corPrimaria }}
                >
                  {classe.nome}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Um número da ficha: rótulo pequeno em cima, valor grande embaixo. */
const Numero = ({
  rotulo,
  valor,
  destacado = false,
}: {
  readonly rotulo: string;
  readonly valor: string;
  readonly destacado?: boolean;
}): React.JSX.Element => (
  <span className={`numero moldura--fina${destacado ? ' numero--dourado' : ''}`}>
    <small className="numero__rotulo pixel">{rotulo}</small>
    <strong className="numero__valor pixel">{valor}</strong>
  </span>
);
