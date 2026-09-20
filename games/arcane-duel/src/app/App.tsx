import { useCallback, useEffect, useState } from 'react';

import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { classePorId } from '../dados/classes.js';
import type { Recompensa } from '../dados/recompensas.js';
import type { IdDeClasse } from '../dados/tipos.js';
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
import { compartilharResultado } from './compartilhar.js';
import { Draft } from './telas/Draft.js';
import type { FimDaLuta } from './telas/Dungeon.js';
import { Dungeon } from './telas/Dungeon.js';
import type { DadosDoResultado } from './telas/Fluxo.js';
import { Checkpoint, Desbloqueio, Despertar, EscolhaDeModo, Resultado } from './telas/Fluxo.js';
import { Inicio, SelecaoDeClasse } from './telas/Inicio.js';

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

  const gravar = useCallback((proximo: Save) => {
    definirSave(proximo);
    salvar(proximo);
  }, []);

  /* O primeiro gesto libera o áudio. O navegador exige, e não há como fugir. */
  useEffect(() => {
    const destravar = (): void => {
      audio.destravar();
      audio.definirVolume(save.preferencias.volume);
      audio.silenciar(save.preferencias.mudo);
    };
    globalThis.addEventListener('pointerdown', destravar, { once: true });
    return () => {
      globalThis.removeEventListener('pointerdown', destravar);
    };
  }, [save.preferencias.volume, save.preferencias.mudo]);

  useEffect(() => {
    if (tela.t === 'inicio' || tela.t === 'classe' || tela.t === 'draft' || tela.t === 'modo') {
      audio.tocarMusica(1);
    }
  }, [tela.t]);

  const comecarDraft = useCallback(
    (classe: IdDeClasse, dourada: boolean) => {
      const novaSeed = gerarSeed();
      definirTela({ t: 'draft', draft: iniciarDraft(buildVazia(classe, dourada), novaSeed) });
    },
    [],
  );

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

  switch (tela.t) {
    case 'inicio':
      return (
        <Inicio
          save={save}
          aoJogar={() => {
            definirTela({ t: 'classe' });
          }}
          aoAlternarSom={() => {
            const mudo = !save.preferencias.mudo;
            audio.silenciar(mudo);
            gravar(comPreferencias(save, { mudo }));
          }}
        />
      );

    case 'classe':
      return (
        <SelecaoDeClasse
          save={save}
          aoEscolher={comecarDraft}
          aoVoltar={() => {
            definirTela({ t: 'inicio' });
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
            definirTela({
              t: 'dungeon',
              run: iniciarRun(tela.build, tela.seed, modo),
              soberano: false,
            });
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
            comecarDraft(tela.dados.build.classe, recordeDe(save, tela.dados.build.classe).dourada);
          }}
          aoMenu={() => {
            definirTela({ t: 'inicio' });
          }}
          aoCompartilhar={() => {
            void compartilharResultado(tela.dados);
          }}
        />
      );
  }

};
