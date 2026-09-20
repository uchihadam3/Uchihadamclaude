import { useState } from 'react';

import { BALANCEAMENTO } from '../../dados/balanceamento.js';
import type { Equipamento, Habilidade, Passiva, Slot } from '../../dados/tipos.js';
import type { Familia } from '../../fase/arte/emblemas.js';
import { audio } from '../../audio/AudioManager.js';
import type { BuildParcial } from '../../nucleo/build.js';
import type { EstadoDoDraft } from '../../nucleo/draft.js';
import {
  ROTULO_DA_CATEGORIA,
  ROTULO_DO_SLOT,
  escolher,
  novaOferta,
  ofertaAtual,
  totalDaCategoria,
} from '../../nucleo/draft.js';
import { avaliarBuild, sinergiasCom } from '../../nucleo/poder.js';
import { Carta } from '../../ui/Carta.js';
import { Sinergia } from '../../ui/Basicos.js';
import { Botao } from '../../ui/Botao.js';

/*
 * O draft.
 *
 * Dez escolhas, e é aqui que a run é decidida. A tela mostra Poder e Sinergia
 * o tempo todo, e eles mudam na hora em que a carta é escolhida — é esse
 * movimento que ensina a ler sinergia sem nenhum tutorial.
 *
 * O que ela **não** faz é dizer qual é a melhor. O aviso de sinergia na carta
 * é uma contagem, não um conselho: "2 sinergias com sua build" é um fato que
 * o jogador poderia ter contado sozinho. "Melhor escolha" seria jogar por ele.
 */

export const Draft = ({
  estado,
  aoAvancar,
  aoConcluir,
  aoVoltar,
}: {
  readonly estado: EstadoDoDraft;
  readonly aoAvancar: (proximo: EstadoDoDraft) => void;
  readonly aoConcluir: (build: BuildParcial) => void;
  readonly aoVoltar: () => void;
}): React.JSX.Element => {
  const [escolhida, definirEscolhida] = useState<string | null>(null);
  const oferta = ofertaAtual(estado);
  const avaliacao = avaliarBuild(estado.build);
  const total = totalDaCategoria(estado.categoria);

  const titulo =
    estado.categoria === 'equipamentos' && oferta.categoria === 'equipamentos'
      ? ROTULO_DO_SLOT[oferta.slot].toUpperCase()
      : ROTULO_DA_CATEGORIA[estado.categoria].toUpperCase();

  /*
   * A escolha leva a **peça de verdade**, e não o objeto de exibição.
   *
   * A primeira versão montava uma lista achatada `{id, nome, descricao}` para
   * desenhar e mandava esse objeto para o draft. A build ficava com peças sem
   * `efeitos` e sem `modificadores`, e a run quebrava na primeira conta de
   * atributo. Desenhar e escolher passam a ler a mesma fonte.
   */
  const confirmar = (item: Habilidade | Passiva | Equipamento): void => {
    if (escolhida !== null) return;
    definirEscolhida(item.id);
    audio.tocar('carta-escolhe');
    globalThis.setTimeout(() => {
      const proximo = escolher(estado, item);
      definirEscolhida(null);
      if (proximo.concluido) aoConcluir(proximo.build);
      else aoAvancar(proximo);
    }, 340);
  };

  /*
   * Como cada categoria se apresenta.
   *
   * A família decide a paleta do emblema e a cor da moldura; a tarja mostra o
   * que importa saber de relance — o tempo de recarga de uma Ativa, o slot de
   * um Equipamento. Uma Passiva não tem número nenhum a mostrar, e não ganha
   * tarja: inventar um número para preencher o canto é ruído.
   */
  const paraCarta = (
    item: Habilidade | Passiva | Equipamento,
  ): {
    readonly canto: string | null;
    readonly familia: Familia;
    readonly slot?: Slot;
  } =>
    'cooldownS' in item
      ? { canto: `${String(item.cooldownS)}s`, familia: 'ativa' }
      : 'slot' in item
        ? { canto: ROTULO_DO_SLOT[item.slot], familia: 'equipamento', slot: item.slot }
        : { canto: null, familia: 'passiva' };

  const opcoes: readonly (Habilidade | Passiva | Equipamento)[] = oferta.opcoes;

  return (
    <div className="tela tela--draft">
      <header className="cabecalho">
        <Botao variante="discreto" onClick={aoVoltar}>
          VOLTAR
        </Botao>
        <h2>
          {titulo} · {estado.escolha + 1}/{total}
        </h2>
        <span className="cabecalho__eco pixel">{estado.seed}</span>
      </header>

      <div className="opcoes">
        {opcoes.map((opcao, indice) => (
          <Carta
            key={opcao.id}
            nome={opcao.nome}
            descricao={opcao.descricao}
            {...paraCarta(opcao)}
            tags={opcao.tags}
            sinergias={sinergiasCom(estado.build, opcao.tags)}
            escolhida={escolhida === opcao.id}
            recuada={escolhida !== null && escolhida !== opcao.id}
            atraso={indice * 70}
            onClick={() => {
              confirmar(opcao);
            }}
            onFocus={() => {
              audio.tocar('carta-passa');
            }}
          />
        ))}
        {opcoes.length === 0 && <p className="vazio">O baralho desta categoria acabou.</p>}
      </div>

      <footer className="rodape-do-draft">
        {/*
          A barra de baixo.

          Ela responde a três perguntas que o jogador faz a cada escolha —
          "quanto vale a minha build", "ela conversa consigo mesma" e "quanto
          falta" — e responde na mesma ordem sempre. Antes isso era uma linha
          de texto solta com pontos separando números, que é a forma mais
          rápida de fazer informação de jogo parecer saída de terminal.
        */}
        <div className="medidor">
          <div className="medidor__bloco">
            <span className="medidor__rotulo pixel">PODER</span>
            <span className="medidor__valor pixel">{avaliacao.poder}</span>
            <span className="medidor__faixa pixel">{avaliacao.faixa}</span>
          </div>

          <div className="medidor__bloco">
            <span className="medidor__rotulo pixel">SINERGIA</span>
            <Sinergia nivel={avaliacao.sinergia} />
          </div>

          <div className="medidor__bloco medidor__bloco--largo">
            <span className="medidor__rotulo pixel">BUILD</span>
            <div className="medidor__tags">
              {avaliacao.tags.length === 0 ? (
                <span className="medidor__vazio">ainda sem tema</span>
              ) : (
                avaliacao.tags.map((tag) => (
                  <span key={tag.tag} className={`etiqueta etiqueta--${tag.tag}`}>
                    {tag.rotulo} ×{tag.quantidade}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="rodape-do-draft__acoes">
          <div className="trilha" aria-label="progresso do draft">
            <Trilha feitas={estado.build.ativas.length} total={BALANCEAMENTO.draft.ativas} familia="ativa" />
            <Trilha
              feitas={estado.build.passivas.length}
              total={BALANCEAMENTO.draft.passivas}
              familia="passiva"
            />
            <Trilha
              feitas={estado.build.equipamentos.length}
              total={BALANCEAMENTO.draft.equipamentos}
              familia="equipamento"
            />
          </div>

          <Botao
            variante="mini"
            desabilitado={estado.rerolls <= 0 || escolhida !== null}
            onClick={() => {
              audio.tocar('nova-oferta');
              aoAvancar(novaOferta(estado));
            }}
          >
            ↻ NOVA OFERTA · {estado.rerolls}
          </Botao>
        </div>
      </footer>

    </div>
  );
};

/*
 * A trilha de uma categoria.
 *
 * Quatro losangos acesos ou apagados dizem "faltam duas ativas" sem o
 * jogador precisar ler `2/4`. É a mesma informação, no tempo do olhar em vez
 * do tempo da leitura.
 */
const Trilha = ({
  feitas,
  total,
  familia,
}: {
  readonly feitas: number;
  readonly total: number;
  readonly familia: 'ativa' | 'passiva' | 'equipamento';
}): React.JSX.Element => (
  <span className={`trilha__grupo trilha__grupo--${familia}`}>
    {Array.from({ length: total }, (_, i) => (
      <span key={i} className={`trilha__conta${i < feitas ? ' trilha__conta--feita' : ''}`} />
    ))}
  </span>
);
