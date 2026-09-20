import { useCallback, useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

import { areaDaSala } from '../../dados/areas.js';
import { BALANCEAMENTO } from '../../dados/balanceamento.js';
import { classePorId } from '../../dados/classes.js';
import type { Inimigo } from '../../dados/tipos.js';
import { audio } from '../../audio/AudioManager.js';
import { CONFIG_DA_FASE, CenaDeCombate } from '../../fase/CenaDeCombate.js';
import type { Atributos, BuildParcial } from '../../nucleo/build.js';
import { atributosDaBuild } from '../../nucleo/build.js';
import type { Contexto, EstadoDeCombate, EventoDeCombate } from '../../nucleo/combate.js';
import { abrirCombate, passo } from '../../nucleo/combate.js';
import { sortearEm } from '../../nucleo/rng.js';
import type { EstadoDaRun } from '../../nucleo/run.js';
import { expParaSubir, inimigoDaSala, soberanoEscalado } from '../../nucleo/run.js';
import { Barra } from '../../ui/Basicos.js';

/*
 * A dungeon.
 *
 * Esta tela é a costura entre as duas metades do jogo: de um lado a
 * simulação pura, que não sabe o que é um pixel; do outro a cena Phaser, que
 * não decide nada. O laço abaixo roda a simulação em passo fixo e entrega os
 * eventos para a cena desenhar.
 *
 * A velocidade é a prova de que a separação vale a pena: 2x e 4x **não**
 * aceleram relógio nenhum. Eles rodam mais passos de simulação por quadro. A
 * animação continua no tempo dela, e por isso nada salta nem dessincroniza —
 * o que acelera é a partida, não o desenho.
 */

export interface FimDaLuta {
  readonly venceu: boolean;
  readonly run: EstadoDaRun;
  readonly vidaRestante: number;
  readonly pocoesRestantes: number;
  readonly duracaoS: number;
  readonly vidaMaxima: number;
}

export interface DungeonProps {
  readonly run: EstadoDaRun;
  readonly contraOSoberano: boolean;
  readonly aoTerminarSala: (fim: FimDaLuta) => void;
  readonly aoPerder: (fim: FimDaLuta) => void;
  readonly velocidade: number;
  readonly aoTrocarVelocidade: (velocidade: number) => void;
}

interface Hud {
  readonly vida: number;
  readonly vidaMaxima: number;
  readonly armadura: number;
  readonly armaduraMaxima: number;
  readonly momentum: number;
  readonly momentumMaximo: number;
  readonly pocoes: number;
  readonly cooldowns: readonly { readonly id: string; readonly nome: string; readonly fracao: number }[];
  readonly inimigoNome: string;
  readonly inimigoVida: number;
  readonly inimigoVidaMaxima: number;
  readonly inimigoArmadura: number;
  readonly inimigoArmaduraMaxima: number;
  readonly ehBoss: boolean;
  readonly nivel: number;
  readonly expFracao: number;
}

const hudDe = (estado: EstadoDeCombate, build: BuildParcial, atributos: Atributos): Hud => ({
  vida: estado.jogador.vida,
  vidaMaxima: estado.jogador.vidaMaxima,
  armadura: estado.jogador.armadura,
  armaduraMaxima: estado.jogador.armaduraMaxima,
  momentum: estado.jogador.momentum,
  momentumMaximo: estado.jogador.momentumMaximo,
  pocoes: estado.jogador.pocoes,
  cooldowns: build.ativas.map((ativa) => {
    const restante = estado.jogador.cooldowns[ativa.id] ?? 0;
    const cheio = Math.max(0.5, ativa.cooldownS * (1 - atributos.reducaoDeCooldown));
    return { id: ativa.id, nome: ativa.nome, fracao: 1 - Math.min(1, restante / cheio) };
  }),
  inimigoNome: estado.inimigo.nome,
  inimigoVida: estado.inimigo.vida,
  inimigoVidaMaxima: estado.inimigo.vidaMaxima,
  inimigoArmadura: estado.inimigo.armadura,
  inimigoArmaduraMaxima: estado.inimigo.armaduraMaxima,
  ehBoss: estado.inimigo.porte === 'boss',
  nivel: estado.jogador.nivel,
  expFracao: Math.min(1, estado.jogador.exp / expParaSubir(estado.jogador.nivel)),
});

/** O som que cada evento pede. Uma tabela, para não espalhar `tocar` pelo laço. */
const soarEvento = (evento: EventoDeCombate): void => {
  switch (evento.tipo) {
    case 'golpe':
      audio.tocar(
        evento.origem === 'inimigo'
          ? 'acerto-armadura'
          : evento.porte === 'ultimate'
            ? 'martelo'
            : evento.porte === 'skill'
              ? 'espada-pesada'
              : 'espada-leve',
      );
      break;
    case 'armadura-quebrada':
      audio.tocar('armadura-quebrada');
      break;
    case 'pocao':
      audio.tocar('pocao');
      break;
    case 'cura':
      audio.tocar('cura');
      break;
    case 'momentum':
      audio.tocar('momentum');
      break;
    default:
      break;
  }
};

export const Dungeon = ({
  run,
  contraOSoberano,
  aoTerminarSala,
  aoPerder,
  velocidade,
  aoTrocarVelocidade,
}: DungeonProps): React.JSX.Element => {
  const caixa = useRef<HTMLDivElement | null>(null);
  const jogo = useRef<Phaser.Game | null>(null);
  const cena = useRef<CenaDeCombate | null>(null);
  const combate = useRef<EstadoDeCombate | null>(null);
  const contexto = useRef<Contexto | null>(null);
  const encerrada = useRef(false);
  const [hud, definirHud] = useState<Hud | null>(null);
  const [aviso, definirAviso] = useState<string | null>(null);
  const velocidadeAtual = useRef(velocidade);
  velocidadeAtual.current = velocidade;

  const inimigo: Inimigo = contraOSoberano ? soberanoEscalado() : inimigoDaSala(run.seed, run.sala);
  const classe = classePorId(run.build.classe);

  /* Uma chave que muda a cada sala: é ela que reinicia a cena e o combate. */
  const chaveDaSala = `${String(run.sala)}:${String(contraOSoberano)}`;

  const terminar = useCallback(
    (venceu: boolean, estado: EstadoDeCombate) => {
      if (encerrada.current) return;
      encerrada.current = true;
      const fim: FimDaLuta = {
        venceu,
        run,
        vidaRestante: estado.jogador.vida,
        pocoesRestantes: estado.jogador.pocoes,
        duracaoS: estado.tempoS,
        vidaMaxima: estado.jogador.vidaMaxima,
      };
      audio.tocar(venceu ? 'vitoria' : 'derrota');
      /* Uma pausa curta para a morte terminar de acontecer na tela. */
      globalThis.setTimeout(() => {
        if (venceu) aoTerminarSala(fim);
        else aoPerder(fim);
      }, 1100);
    },
    [run, aoTerminarSala, aoPerder],
  );

  useEffect(() => {
    const elemento = caixa.current;
    if (elemento === null) return;
    encerrada.current = false;

    const atributos = atributosDaBuild(run.build, run.nivel);
    combate.current = abrirCombate(
      run.build,
      inimigo,
      { vida: run.vida, pocoes: run.pocoes, nivel: run.nivel, exp: run.exp },
      classePorId(run.build.classe).recurso.maximo,
    );
    contexto.current = {
      build: run.build,
      atributos,
      rng: sortearEm(run.seed, `luta:${run.sala}:${String(contraOSoberano)}`),
    };
    definirHud(hudDe(combate.current, run.build, atributos));

    const instancia = new Phaser.Game({
      type: Phaser.AUTO,
      parent: elemento,
      width: CONFIG_DA_FASE.LARGURA,
      height: CONFIG_DA_FASE.ALTURA,
      pixelArt: true,
      backgroundColor: '#0d0a12',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [CenaDeCombate],
      audio: { noAudio: true },
    });
    jogo.current = instancia;
    instancia.scene.start('combate', {
      classe,
      dourado: run.build.dourada,
      sala: run.sala,
      inimigo,
    });

    const nomeDaArea = areaDaSala(run.sala).numero;
    if (inimigo.porte === 'boss') {
      audio.tocar('boss-entra');
      audio.tocarMusicaDeBoss(nomeDaArea);
      definirAviso(inimigo.nome.toUpperCase());
      globalThis.setTimeout(() => {
        definirAviso(null);
      }, 1800);
    } else {
      audio.tocarMusica(nomeDaArea);
    }

    return () => {
      instancia.destroy(true);
      jogo.current = null;
      cena.current = null;
    };
    // A sala é a única coisa que reinicia a cena; o resto vem por referência.
  }, [chaveDaSala]);

  /* O laço. Ele não desenha nada: roda a simulação e entrega os eventos. */
  useEffect(() => {
    let vivo = true;
    let pedido = 0;
    let anterior = performance.now();

    const quadro = (agora: number): void => {
      if (!vivo) return;
      const delta = Math.min(0.25, (agora - anterior) / 1000);
      anterior = agora;

      const estadoAtual = combate.current;
      const ctx = contexto.current;
      if (estadoAtual !== null && ctx !== null && !encerrada.current) {
        const dt = BALANCEAMENTO.passoDaSimulacaoS;
        /*
         * Quantos passos cabem neste quadro.
         *
         * O teto existe para uma aba que voltou do segundo plano não rodar
         * mil passos de uma vez e matar o jogador sem ele ver nada.
         */
        const quantos = Math.min(24, Math.round((delta * velocidadeAtual.current) / dt));
        const eventos: EventoDeCombate[] = [];
        let estado = estadoAtual;
        for (let i = 0; i < quantos && !estado.terminou; i += 1) {
          const resultado = passo(estado, ctx, dt);
          estado = resultado.estado;
          eventos.push(...resultado.eventos);
        }
        combate.current = estado;

        const ativa = jogo.current?.scene.getScene('combate');
        if (ativa instanceof CenaDeCombate && eventos.length > 0) {
          ativa.aplicar(eventos, estado.inimigo.porte === 'boss');
        }
        for (const evento of eventos) soarEvento(evento);

        if (estado.inimigo.porte === 'boss') {
          audio.intensidadeDoBoss(estado.inimigo.vida / estado.inimigo.vidaMaxima);
        }

        definirHud(hudDe(estado, run.build, ctx.atributos));
        if (estado.terminou) terminar(estado.vencedor === 'jogador', estado);
      }

      pedido = requestAnimationFrame(quadro);
    };

    pedido = requestAnimationFrame(quadro);
    return () => {
      vivo = false;
      cancelAnimationFrame(pedido);
    };
  }, [run.build, terminar]);

  const area = areaDaSala(run.sala);

  return (
    <div className="dungeon">
      <div className="dungeon__cena" ref={caixa} />

      <div className="hud">
        <div className="hud__topo">
          <span className="hud__sala pixel">
            SALA {contraOSoberano ? '??' : run.sala} / {BALANCEAMENTO.dungeon.totalDeSalas}
          </span>
          <span className="hud__area pixel">{contraOSoberano ? '???' : area.nome}</span>
          <div className="hud__velocidade">
            {BALANCEAMENTO.velocidades.map((v) => (
              <button
                key={v}
                type="button"
                className={`botao botao--discreto${velocidade === v ? ' ativo' : ''}`}
                onClick={() => {
                  aoTrocarVelocidade(v);
                }}
              >
                {v}x
              </button>
            ))}
          </div>
        </div>

        {hud !== null && (
          <>
            <div className={`hud__inimigo${hud.ehBoss ? ' hud__inimigo--boss' : ''}`}>
              <span className="hud__nome pixel">{hud.inimigoNome}</span>
              <Barra
                valor={hud.inimigoVida}
                maximo={hud.inimigoVidaMaxima}
                cor="var(--vida)"
                altura={hud.ehBoss ? 22 : 14}
              />
              {hud.inimigoArmaduraMaxima > 0 && (
                <Barra
                  valor={hud.inimigoArmadura}
                  maximo={hud.inimigoArmaduraMaxima}
                  cor="var(--armadura)"
                  altura={7}
                />
              )}
            </div>

            <div className="hud__jogador">
              <div className="hud__retrato pixel">
                <span className="hud__nivel">Nv {hud.nivel}</span>
                <div className="hud__exp">
                  <Barra valor={hud.expFracao} maximo={1} cor="var(--ouro)" altura={5} />
                </div>
              </div>

              <div className="hud__barras">
                <div className="hud__linha">
                  <span className="hud__rotulo pixel">VIDA</span>
                  <Barra valor={hud.vida} maximo={hud.vidaMaxima} cor="var(--vida)" />
                  <span className="hud__numero pixel">
                    {Math.ceil(hud.vida)}/{hud.vidaMaxima}
                  </span>
                </div>
                <div className="hud__linha">
                  <span className="hud__rotulo pixel">ARM</span>
                  <Barra
                    valor={hud.armadura}
                    maximo={hud.armaduraMaxima}
                    cor="var(--armadura)"
                    altura={10}
                  />
                  <span className="hud__numero pixel">{Math.ceil(hud.armadura)}</span>
                </div>
                <div className="hud__linha">
                  <span className="hud__rotulo pixel">{classe.recurso.nome.toUpperCase()}</span>
                  <Barra
                    valor={hud.momentum}
                    maximo={hud.momentumMaximo}
                    cor="var(--recurso)"
                    altura={10}
                  />
                  <span className="hud__numero pixel">{hud.momentum}</span>
                </div>
              </div>

              <div className="hud__pocoes">
                {[0, 1, 2, 3].slice(0, Math.max(3, hud.pocoes)).map((i) => (
                  <span
                    key={i}
                    className={`pocao${i < hud.pocoes ? ' pocao--cheia' : ' pocao--vazia'}`}
                  />
                ))}
              </div>
            </div>

            <div className="hud__habilidades">
              {hud.cooldowns.map((cooldown) => (
                <div
                  key={cooldown.id}
                  className={`habilidade${cooldown.fracao >= 1 ? ' habilidade--pronta' : ''}`}
                >
                  <span className="habilidade__nome">{cooldown.nome}</span>
                  <div
                    className="habilidade__recarga"
                    style={{ height: `${((1 - cooldown.fracao) * 100).toFixed(1)}%` }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {aviso !== null && (
        <div className="anuncio-de-boss">
          <span className="anuncio-de-boss__nome">{aviso}</span>
        </div>
      )}
    </div>
  );
};
