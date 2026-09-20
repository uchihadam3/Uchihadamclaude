import { useState } from 'react';

import { BALANCEAMENTO } from '../../dados/balanceamento.js';
import { classePorId } from '../../dados/classes.js';
import type { Equipamento, Habilidade, Passiva } from '../../dados/tipos.js';
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
  const classe = classePorId(estado.build.classe);
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

  /** Como cada categoria se apresenta. A peça continua sendo a original. */
  const paraCarta = (
    item: Habilidade | Passiva | Equipamento,
  ): { readonly canto: string | null } =>
    'cooldownS' in item
      ? { canto: `${item.cooldownS}s` }
      : 'slot' in item
        ? { canto: ROTULO_DO_SLOT[item.slot] }
        : { canto: null };

  const opcoes: readonly (Habilidade | Passiva | Equipamento)[] = oferta.opcoes;

  return (
    <div className="tela tela--draft">
      <header className="cabecalho">
        <button type="button" className="botao botao--discreto" onClick={aoVoltar}>
          VOLTAR
        </button>
        <h2>
          {titulo} · {estado.escolha + 1}/{total}
        </h2>
        <span className="pixel semente">SEED {estado.seed}</span>
      </header>

      <div className="opcoes">
        {opcoes.map((opcao, indice) => (
          <Carta
            key={opcao.id}
            nome={opcao.nome}
            descricao={opcao.descricao}
            canto={paraCarta(opcao).canto}
            tags={opcao.tags}
            sinergias={sinergiasCom(estado.build, opcao.tags)}
            escolhida={escolhida === opcao.id}
            recuada={escolhida !== null && escolhida !== opcao.id}
            cor={classe.corPrimaria}
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
        <button
          type="button"
          className="botao"
          disabled={estado.rerolls <= 0 || escolhida !== null}
          onClick={() => {
            audio.tocar('nova-oferta');
            aoAvancar(novaOferta(estado));
          }}
        >
          ↻ NOVA OFERTA — {estado.rerolls}
        </button>

        <div className="medidor">
          <div className="medidor__poder">
            <span className="medidor__rotulo pixel">PODER</span>
            <span className="medidor__valor pixel">{avaliacao.poder}</span>
            <span className="medidor__faixa pixel">{avaliacao.faixa}</span>
          </div>
          <div className="medidor__sinergia">
            <span className="medidor__rotulo pixel">SINERGIA</span>
            <Sinergia nivel={avaliacao.sinergia} />
          </div>
          <div className="medidor__tags">
            {avaliacao.tags.map((tag) => (
              <span key={tag.tag} className="medidor__tag pixel">
                {tag.rotulo} ×{tag.quantidade}
              </span>
            ))}
          </div>
        </div>

        <div className="progresso-do-draft pixel">
          {estado.build.ativas.length}/{BALANCEAMENTO.draft.ativas} ·{' '}
          {estado.build.passivas.length}/{BALANCEAMENTO.draft.passivas} ·{' '}
          {estado.build.equipamentos.length}/{BALANCEAMENTO.draft.equipamentos}
        </div>
      </footer>
    </div>
  );
};
