import { BALANCEAMENTO } from '../../dados/balanceamento.js';
import { classePorId } from '../../dados/classes.js';
import type { Recompensa } from '../../dados/recompensas.js';
import { audio } from '../../audio/AudioManager.js';
import type { BuildParcial } from '../../nucleo/build.js';
import type { OfertaDeCheckpoint } from '../../nucleo/checkpoint.js';
import { avaliarBuild, sinergiasCom } from '../../nucleo/poder.js';
import type { EstadoDaRun } from '../../nucleo/run.js';
import { emblemaDaTag, emblemaDoSlot } from '../../fase/arte/emblemas.js';
import { Carta } from '../../ui/Carta.js';
import { Sinergia } from '../../ui/Basicos.js';
import { Botao } from '../../ui/Botao.js';

/*
 * As telas curtas do fluxo: modo, checkpoint, resultado, desbloqueio.
 *
 * Elas têm uma regra em comum — cabem numa tela sem rolagem e se lêem em
 * poucos segundos. Uma tela de recompensa que exige estudo quebra o ritmo da
 * run, e o ritmo é a razão de o jogo ser um auto-battler.
 */

export const EscolhaDeModo = ({
  build,
  seed,
  aoComecar,
  aoVoltar,
}: {
  readonly build: BuildParcial;
  readonly seed: string;
  readonly aoComecar: (modo: EstadoDaRun['modo']) => void;
  readonly aoVoltar: () => void;
}): React.JSX.Element => {
  const avaliacao = avaliarBuild(build);
  const classe = classePorId(build.classe);
  return (
    <div className="tela tela--modo">
      <header className="cabecalho">
        <Botao variante="discreto" onClick={aoVoltar}>
          VOLTAR
        </Botao>
        <h2>SUA BUILD</h2>
        <span className="cabecalho__eco pixel">{seed}</span>
      </header>

      {/*
        O resumo da build.

        Antes era uma lista com nome e descrição inteira de cada uma das dez
        peças, e ela não cabia em tela nenhuma — nem em pé nem deitada. O que
        o jogador precisa aqui não é reler as dez descrições que acabou de
        ler no draft: é ver **o conjunto**. Então são os emblemas, os nomes,
        e os três números que resumem a escolha.
      */}
      <div className="resumo-da-build">
        <div className="resumo__medidor moldura--fina">
          <span className="resumo__poder pixel" style={{ color: classe.corPrimaria }}>
            {avaliacao.poder}
          </span>
          <span className="medidor__faixa pixel">{avaliacao.faixa}</span>
          <Sinergia nivel={avaliacao.sinergia} />
          <div className="medidor__tags">
            {avaliacao.tags.map((tag) => (
              <span key={tag.tag} className={`etiqueta etiqueta--${tag.tag}`}>
                {tag.rotulo} ×{tag.quantidade}
              </span>
            ))}
          </div>
        </div>

        <div className="resumo__listas">
          {(
            [
              ['ATIVAS', build.ativas, 'ativa'],
              ['PASSIVAS', build.passivas, 'passiva'],
              ['EQUIPAMENTOS', build.equipamentos, 'equipamento'],
            ] as const
          ).map(([titulo, itens, familia]) => (
            <div key={titulo} className="resumo__grupo">
              <h3 className="pixel">{titulo}</h3>
              <div className="resumo__pecas">
                {itens.map((item) => {
                  const tag = item.tags[0];
                  const arte =
                    'slot' in item
                      ? emblemaDoSlot(item.slot, familia)
                      : tag !== undefined
                        ? emblemaDaTag(tag, familia)
                        : null;
                  return (
                    <span key={item.id} className={`ficha-da-build ficha-da-build--${familia}`}>
                      {arte !== null && <img src={arte} alt="" width={28} height={28} />}
                      <span className="ficha-da-build__nome">{item.nome}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="modos">
        <Botao
          variante="forte"
          legenda="Você escolhe a recompensa depois de cada boss."
          onClick={() => {
            aoComecar('manual');
          }}
        >
          MANUAL
        </Botao>
        <Botao
          legenda="A run não para. A escolha é feita por você."
          onClick={() => {
            aoComecar('automatico');
          }}
        >
          AUTOMÁTICO
        </Botao>
      </footer>
    </div>
  );
};

export const Checkpoint = ({
  build,
  oferta,
  numero,
  aoEscolher,
}: {
  readonly build: BuildParcial;
  readonly oferta: OfertaDeCheckpoint;
  readonly numero: number;
  readonly aoEscolher: (recompensa: Recompensa) => void;
}): React.JSX.Element => {
  return (
    <div className="tela centro tela--checkpoint">
      <h2>ÁREA {numero} CONCLUÍDA</h2>
      <p className="subtitulo">Poções restauradas. Escolha uma recompensa.</p>
      <div className="opcoes">
        {oferta.opcoes.map((opcao, indice) => (
          <Carta
            key={opcao.id}
            nome={opcao.nome}
            descricao={opcao.descricao}
            canto={
              opcao.tipo === 'evolucao'
                ? 'EVOLUÇÃO'
                : opcao.tipo === 'equipamento'
                  ? 'EQUIPAMENTO'
                  : 'BÊNÇÃO'
            }
            tags={opcao.tags}
            familia={
              opcao.tipo === 'equipamento'
                ? 'equipamento'
                : opcao.tipo === 'evolucao'
                  ? 'ativa'
                  : 'passiva'
            }
            sinergias={sinergiasCom(build, opcao.tags)}
            atraso={indice * 90}
            onClick={() => {
              audio.tocar('carta-escolhe');
              aoEscolher(opcao);
            }}
            onFocus={() => {
              audio.tocar('carta-passa');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export interface DadosDoResultado {
  readonly build: BuildParcial;
  readonly seed: string;
  readonly salaAlcancada: number;
  readonly bossesDerrotados: number;
  readonly tempoS: number;
  readonly venceu: boolean;
  readonly derrotouSoberano: boolean;
  readonly recorde: number;
}

const tempoLegivel = (segundos: number): string => {
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}m ${String(s).padStart(2, '0')}s`;
};

export const Resultado = ({
  dados,
  aoNovaRun,
  aoMenu,
  aoCompartilhar,
}: {
  readonly dados: DadosDoResultado;
  readonly aoNovaRun: () => void;
  readonly aoMenu: () => void;
  readonly aoCompartilhar: () => void;
}): React.JSX.Element => {
  const avaliacao = avaliarBuild(dados.build);
  const classe = classePorId(dados.build.classe);
  const escolhas = [
    ...dados.build.ativas.map((a) => a.nome),
    ...dados.build.passivas.map((p) => p.nome),
    ...dados.build.equipamentos.map((e) => e.nome),
  ];

  return (
    <div className="tela centro tela--resultado">
      <h1 className={dados.venceu ? 'titulo-vitoria' : 'titulo-derrota'}>
        {dados.venceu ? 'DUNGEON CONCLUÍDA' : 'FIM DA JORNADA'}
      </h1>
      {dados.venceu && (
        <p className="subtitulo pixel">
          BOSS SECRETO: {dados.derrotouSoberano ? 'DERROTADO' : 'NÃO DERROTADO'}
        </p>
      )}

      <div className="ficha moldura">
        <div className="ficha__linhas pixel">
          <span>CLASSE</span>
          <span style={{ color: classe.corPrimaria }}>{classe.nome}</span>
          <span>SALA</span>
          <span>
            {dados.salaAlcancada} / {BALANCEAMENTO.dungeon.totalDeSalas}
          </span>
          <span>BOSSES</span>
          <span>{dados.bossesDerrotados}</span>
          <span>TEMPO</span>
          <span>{tempoLegivel(dados.tempoS)}</span>
          <span>PODER</span>
          <span>
            {avaliacao.poder} · {avaliacao.faixa}
          </span>
          <span>SINERGIA</span>
          <span>
            <Sinergia nivel={avaliacao.sinergia} />
          </span>
          <span>RECORDE</span>
          <span>{Math.max(dados.recorde, dados.salaAlcancada)} / 50</span>
          <span>SEED</span>
          <span>{dados.seed}</span>
        </div>

        <div className="ficha__escolhas">
          {escolhas.map((nome) => (
            <span key={nome} className="ficha__escolha">
              {nome}
            </span>
          ))}
        </div>
      </div>

      <div className="acoes">
        <button type="button" className="botao botao--forte" onClick={aoNovaRun}>
          NOVA RUN
        </button>
        <button type="button" className="botao" onClick={aoCompartilhar}>
          COMPARTILHAR
        </button>
        <button type="button" className="botao botao--discreto" onClick={aoMenu}>
          MENU
        </button>
      </div>
    </div>
  );
};

/** A tela que só acontece uma vez por classe. */
export const Desbloqueio = ({
  nomeDaClasse,
  aoSeguir,
}: {
  readonly nomeDaClasse: string;
  readonly aoSeguir: () => void;
}): React.JSX.Element => (
  <div className="tela centro tela--dourado">
    <div className="brasao-dourado" />
    <h1 className="titulo-dourado">MAESTRIA DOURADA</h1>
    <p className="subtitulo">
      {nomeDaClasse} Dourado desbloqueado. Ele não fica mais forte — ele fica com{' '}
      <strong>três</strong> Novas Ofertas em cada categoria do draft.
    </p>
    <button type="button" className="botao botao--forte" onClick={aoSeguir}>
      CONTINUAR
    </button>
  </div>
);

/** A pausa que não devia existir, antes do Soberano. */
export const Despertar = ({ aoSeguir }: { readonly aoSeguir: () => void }): React.JSX.Element => (
  <div className="tela centro tela--despertar" onAnimationEnd={aoSeguir}>
    <span className="interrogacao">???</span>
  </div>
);
