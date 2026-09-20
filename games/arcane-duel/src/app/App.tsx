import { useCallback, useEffect, useState } from 'react';

import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { classePorId } from '../dados/classes.js';
import type { Recompensa } from '../dados/recompensas.js';
import { audio } from '../audio/AudioManager.js';
import type { BuildParcial } from '../nucleo/build.js';
import { buildVazia } from '../nucleo/build.js';
import type { OfertaDeCheckpoint } from '../nucleo/checkpoint.js';
import { aplicarRecompensa, escolhaAutomatica, ofertaDeCheckpoint } from '../nucleo/checkpoint.js';
import { despertaOSoberano } from '../nucleo/dominio.js';
import type { EstadoDoDraft } from '../nucleo/draft.js';
import { iniciarDraft } from '../nucleo/draft.js';
import { gerarSeed } from '../nucleo/rng.js';
import type { EstadoDaRun } from '../nucleo/run.js';
import { iniciarRun, inimigoDaSala, vencerSala } from '../nucleo/run.js';
import type { Save } from '../nucleo/salvar.js';
import {
  carregar,
  comPreferencias,
  marcarMaestriaConhecida,
  recordeDe,
  registrarRun,
  salvar,
} from '../nucleo/salvar.js';
import { Botao } from '../ui/Botao.js';
import { aplicarAtualizacao, registrarAtualizacoes } from './atualizacao.js';
import { compartilharResultado } from './compartilhar.js';
import { Draft } from './telas/Draft.js';
import type { FimDaLuta } from './telas/Dungeon.js';
import { Dungeon } from './telas/Dungeon.js';
import type { DadosDoResultado } from './telas/Fluxo.js';
import { Checkpoint, Desbloqueio, Despertar, EscolhaDeModo, Resultado } from './telas/Fluxo.js';
import { Classes } from './telas/Classes.js';
import { Titulo } from './telas/Titulo.js';
import type { Estilo } from './Transicao.js';
import { DURACAO_DA_TRANSICAO_MS, Transicao } from './Transicao.js';

/*
 * O fluxo do jogo.
 *
 * Uma máquina de telas, e ela é de propósito rasa: início → classe → draft →
 * modo → dungeon, com checkpoint e resultado pendurados. Não há navegação
 * livre, não há menu dentro de menu. Uma run tem começo, meio e fim, e voltar
 * ao começo é sempre um clique.
 *
 * A decisão que mais importa aqui é o que acontece depois do Boss 50: o
 * desempenho é avaliado em silêncio, e se ele passar do corte a run **não
 * termina**. Ela dá uma pausa que não devia existir, mostra `???`, e o
 * Soberano aparece.
 */

type Tela =
  | { readonly t: 'inicio' }
  | { readonly t: 'classe' }
  | { readonly t: 'draft'; readonly draft: EstadoDoDraft }
  | { readonly t: 'modo'; readonly build: BuildParcial; readonly seed: string }
  | { readonly t: 'dungeon'; readonly run: EstadoDaRun; readonly soberano: boolean }
  | {
      readonly t: 'checkpoint';
      readonly run: EstadoDaRun;
      readonly oferta: OfertaDeCheckpoint;
      readonly numero: number;
    }
  | { readonly t: 'despertar'; readonly run: EstadoDaRun }
  | { readonly t: 'resultado'; readonly dados: DadosDoResultado }
  | { readonly t: 'dourado'; readonly dados: DadosDoResultado };

export const App = (): React.JSX.Element => {
  const [save, definirSave] = useState<Save>(() => carregar());
  const [tela, definirTela] = useState<Tela>({ t: 'inicio' });
  const [velocidade, definirVelocidade] = useState(1);
  const [versaoNova, definirVersaoNova] = useState(false);
  const [transicao, definirTransicao] = useState<{
    readonly estilo: Estilo;
    readonly progresso: number;
  } | null>(null);

  const gravar = useCallback((proximo: Save) => {
    definirSave(proximo);
    salvar(proximo);
  }, []);

  /*
   * A troca de tela, com transição.
   *
   * A tela nova entra exatamente no **pico** da cobertura, quando o véu está
   * fechado, então a substituição nunca é vista. Sem esse cuidado a transição
   * vira um enfeite por cima de um corte seco — e continua parecendo site.
   */
  const trocar = useCallback((destino: Tela, estilo: Estilo): void => {
    const comeco = performance.now();
    let trocou = false;
    const passo = (agora: number): void => {
      const t = Math.min(1, (agora - comeco) / DURACAO_DA_TRANSICAO_MS);
      if (!trocou && t >= 0.5) {
        trocou = true;
        definirTela(destino);
      }
      definirTransicao(t >= 1 ? null : { estilo, progresso: t });
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }, []);

  /*
   * O primeiro gesto libera o áudio.
   *
   * Todo navegador móvel exige uma interação antes de deixar tocar som, e não
   * há como fugir disso. O que dá para fazer — e é o que se faz aqui — é não
   * deixar o jogo mudo em silêncio: qualquer toque na tela destrava, e o
   * primeiro toque costuma ser o que pula a entrada cinemática.
   */
  useEffect(() => {
    const destravar = (): void => {
      audio.destravar();
      audio.definirVolumes(
        save.preferencias.volumeDaMusica,
        save.preferencias.volumeDosEfeitos,
      );
      /* O unlock chega depois do primeiro render: a música precisa começar agora. */
      if (audio.camadaAtualDoMenu >= 0) audio.tocarMusicaDeMenu(audio.camadaAtualDoMenu);
    };
    globalThis.addEventListener('pointerdown', destravar, { once: true });
    globalThis.addEventListener('keydown', destravar, { once: true });
    return () => {
      globalThis.removeEventListener('pointerdown', destravar);
      globalThis.removeEventListener('keydown', destravar);
    };
  }, [save.preferencias.volumeDaMusica, save.preferencias.volumeDosEfeitos]);

  /*
   * O tema do menu, ganhando corpo.
   *
   * Não se troca de música entre as telas de preparação: é o **mesmo** tema,
   * com mais camadas. Na tela inicial só o colchão; escolhendo a classe entra
   * a harmonia; no draft entra o arpejo. Como as camadas já estão tocando, a
   * passagem não corta o compasso — a música apenas cresce junto com a
   * expectativa de quem está montando a build.
   */
  useEffect(() => {
    const camada =
      tela.t === 'inicio' ? 0 : tela.t === 'classe' ? 1 : tela.t === 'draft' || tela.t === 'modo' ? 2 : -1;
    if (camada >= 0) audio.tocarMusicaDeMenu(camada);
  }, [tela.t]);

  /*
   * A versão nova.
   *
   * O aviso aparece e fica; ele não interrompe nada. Quem está no meio de uma
   * run continua na versão que começou, e atualiza quando quiser.
   */
  useEffect(() => registrarAtualizacoes(() => {
    definirVersaoNova(true);
  }), []);

  /* ---------------------------------------------------------------------
   * O fim de cada sala.
   * ------------------------------------------------------------------ */

  const fecharRun = useCallback(
    (run: EstadoDaRun, venceu: boolean, derrotouSoberano: boolean, salaAlcancada: number) => {
      const escolhas = [
        ...run.build.ativas.map((a) => a.nome),
        ...run.build.passivas.map((p) => p.nome),
        ...run.build.equipamentos.map((e) => e.nome),
      ];
      const antes = recordeDe(save, run.build.classe);
      const depois = registrarRun(save, {
        classe: run.build.classe,
        salaAlcancada,
        venceu,
        derrotouSoberano,
        build: escolhas,
        seed: run.seed,
      });
      gravar(derrotouSoberano ? marcarMaestriaConhecida(depois) : depois);

      const dados: DadosDoResultado = {
        build: run.build,
        seed: run.seed,
        salaAlcancada,
        bossesDerrotados: run.bossesDerrotados,
        tempoS: run.tempoS,
        venceu,
        derrotouSoberano,
        recorde: antes.melhorSala,
      };
      /* A tela dourada só aparece na **primeira** vez. Depois, é só resultado. */
      definirTela(
        derrotouSoberano && !antes.dourada ? { t: 'dourado', dados } : { t: 'resultado', dados },
      );
    },
    [save, gravar],
  );

  const aoTerminarSala = useCallback(
    (fim: FimDaLuta) => {
      const run = fim.run;
      const ehBossFinal = run.sala === BALANCEAMENTO.dungeon.totalDeSalas;

      /* O Soberano: vencê-lo fecha a run com a maestria. */
      if (run.sala > BALANCEAMENTO.dungeon.totalDeSalas) {
        fecharRun(
          { ...run, tempoS: run.tempoS + fim.duracaoS },
          true,
          true,
          BALANCEAMENTO.dungeon.totalDeSalas,
        );
        return;
      }

      /* A EXP vem do inimigo que acabou de cair; `vencerSala` cuida do nível. */
      const resultado = vencerSala(
        run,
        fim.vidaRestante,
        fim.pocoesRestantes,
        inimigoDaSala(run.seed, run.sala).exp,
        fim.duracaoS,
      );

      if (ehBossFinal) {
        /*
         * A avaliação silenciosa.
         *
         * O jogador não vê número nenhum. Se passou do corte, a run continua
         * — e ele descobre isso pelo silêncio estranho depois do boss cair.
         */
        const despertou = despertaOSoberano({
          tempoS: fim.duracaoS,
          vidaRestante: fim.vidaRestante,
          vidaMaxima: fim.vidaMaxima,
          pocoesRestantes: fim.pocoesRestantes,
          pocoesMaximas: BALANCEAMENTO.pocoes.porArea,
        });
        if (despertou) {
          audio.pararMusica();
          audio.tocar('segredo');
          definirTela({ t: 'despertar', run: { ...resultado.run, despertou: true } });
          return;
        }
        fecharRun(resultado.run, true, false, BALANCEAMENTO.dungeon.totalDeSalas);
        return;
      }

      if (resultado.niveisGanhos > 0) audio.tocar('nivel');

      if (resultado.checkpoint) {
        const numero = resultado.run.bossesDerrotados;
        const oferta = ofertaDeCheckpoint(resultado.run.build, resultado.run.seed, numero);
        if (resultado.run.modo === 'automatico') {
          const escolhida = escolhaAutomatica(
            resultado.run.build,
            oferta,
            fim.vidaRestante / Math.max(1, fim.vidaMaxima),
          );
          definirTela({
            t: 'dungeon',
            run: { ...resultado.run, build: aplicarRecompensa(resultado.run.build, escolhida) },
            soberano: false,
          });
          return;
        }
        definirTela({ t: 'checkpoint', run: resultado.run, oferta, numero });
        return;
      }

      definirTela({ t: 'dungeon', run: resultado.run, soberano: false });
    },
    [fecharRun],
  );

  const aoPerder = useCallback(
    (fim: FimDaLuta) => {
      fecharRun({ ...fim.run, tempoS: fim.run.tempoS + fim.duracaoS }, false, false, fim.run.sala);
    },
    [fecharRun],
  );

  /* ---------------------------------------------------------------------
   * As telas.
   * ------------------------------------------------------------------ */

  const conteudo = ((): React.JSX.Element => {
    switch (tela.t) {
    case 'inicio':
      return (
        <Titulo
          save={save}
          aoJogar={() => {
            trocar({ t: 'classe' }, 'cortina');
          }}
          aoMudarVolume={(musica, efeitos) => {
            audio.definirVolumes(musica, efeitos);
            gravar(
              comPreferencias(save, { volumeDaMusica: musica, volumeDosEfeitos: efeitos }),
            );
          }}
        />
      );

    case 'classe':
      return (
        <Classes
          save={save}
          aoEscolher={(classe, dourada) => {
            trocar(
              { t: 'draft', draft: iniciarDraft(buildVazia(classe, dourada), gerarSeed()) },
              'portal',
            );
          }}
          aoVoltar={() => {
            trocar({ t: 'inicio' }, 'cortina');
          }}
        />
      );

    case 'draft':
      return (
        <Draft
          estado={tela.draft}
          aoAvancar={(proximo) => {
            definirTela({ t: 'draft', draft: proximo });
          }}
          aoConcluir={(build) => {
            definirTela({ t: 'modo', build, seed: tela.draft.seed });
          }}
          aoVoltar={() => {
            definirTela({ t: 'classe' });
          }}
        />
      );

    case 'modo':
      return (
        <EscolhaDeModo
          build={tela.build}
          seed={tela.seed}
          aoComecar={(modo) => {
            trocar(
              { t: 'dungeon', run: iniciarRun(tela.build, tela.seed, modo), soberano: false },
              'portal',
            );
          }}
          aoVoltar={() => {
            definirTela({ t: 'classe' });
          }}
        />
      );

    case 'dungeon':
      return (
        <Dungeon
          key={`${tela.run.sala}:${String(tela.soberano)}`}
          run={tela.run}
          contraOSoberano={tela.soberano}
          aoTerminarSala={aoTerminarSala}
          aoPerder={aoPerder}
          velocidade={velocidade}
          aoTrocarVelocidade={definirVelocidade}
        />
      );

    case 'checkpoint':
      return (
        <Checkpoint
          build={tela.run.build}
          oferta={tela.oferta}
          numero={tela.numero}
          aoEscolher={(recompensa: Recompensa) => {
            definirTela({
              t: 'dungeon',
              run: { ...tela.run, build: aplicarRecompensa(tela.run.build, recompensa) },
              soberano: false,
            });
          }}
        />
      );

    case 'despertar':
      return (
        <Despertar
          aoSeguir={() => {
            definirTela({ t: 'dungeon', run: tela.run, soberano: true });
          }}
        />
      );

    case 'dourado':
      return (
        <Desbloqueio
          nomeDaClasse={classePorId(tela.dados.build.classe).nome}
          aoSeguir={() => {
            definirTela({ t: 'resultado', dados: tela.dados });
          }}
        />
      );

    case 'resultado':
      return (
        <Resultado
          dados={tela.dados}
          aoNovaRun={() => {
            trocar(
              {
                t: 'draft',
                draft: iniciarDraft(
                  buildVazia(
                    tela.dados.build.classe,
                    recordeDe(save, tela.dados.build.classe).dourada,
                  ),
                  gerarSeed(),
                ),
              },
              'portal',
            );
          }}
          aoMenu={() => {
            trocar({ t: 'inicio' }, 'cortina');
          }}
          aoCompartilhar={() => {
            void compartilharResultado(tela.dados);
          }}
        />
      );
    }
  })();

  return (
    <>
      {conteudo}
      {versaoNova && (
        <div className="aviso-de-versao" role="status">
          <span>NOVA VERSÃO DISPONÍVEL</span>
          <Botao
            variante="forte"
            onClick={() => {
              aplicarAtualizacao();
            }}
          >
            ATUALIZAR
          </Botao>
        </div>
      )}
      {transicao !== null && (
        <Transicao estilo={transicao.estilo} progresso={transicao.progresso} />
      )}
    </>
  );
};
