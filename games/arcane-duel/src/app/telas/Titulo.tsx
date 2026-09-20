import { useEffect, useState } from 'react';

import { CLASSES } from '../../dados/classes.js';
import { audio } from '../../audio/AudioManager.js';
import type { Save } from '../../nucleo/salvar.js';
import { recordeDe } from '../../nucleo/salvar.js';
import { Botao } from '../../ui/Botao.js';
import { CenaDeTitulo } from '../CenaDeTitulo.js';
import type { EstadoDaInstalacao } from '../instalar.js';
import { INSTRUCOES, estadoDaInstalacao, instalar, ouvirInstalacao, plataforma } from '../instalar.js';

/*
 * A tela inicial.
 *
 * A cena fica viva atrás o tempo todo — tochas, bandeiras, névoa, brasas — e
 * o menu é uma coluna curta por cima. Quatro entradas, e nenhuma a mais: um
 * menu com quinze opções é um painel de configuração, não a abertura de um
 * jogo.
 *
 * A entrada cinemática dura pouco mais de dois segundos e **qualquer toque a
 * pula**. Uma abertura que não se pode pular é irritante na segunda vez, e
 * este é um jogo de runs curtas — o jogador vai ver esta tela muitas vezes.
 */

const DURACAO_DA_ENTRADA_MS = 2400;

export type Painel = 'nenhum' | 'progresso' | 'configuracoes' | 'instalar';

export interface TituloProps {
  readonly save: Save;
  readonly aoJogar: () => void;
  readonly aoMudarVolume: (musica: number, efeitos: number) => void;
}

export const Titulo = ({ save, aoJogar, aoMudarVolume }: TituloProps): React.JSX.Element => {
  const [entrada, definirEntrada] = useState(0);
  const [painel, definirPainel] = useState<Painel>('nenhum');
  const [instalacao, definirInstalacao] = useState<EstadoDaInstalacao>(() => estadoDaInstalacao());
  const [instrucao, definirInstrucao] = useState<string | null>(null);

  useEffect(() => ouvirInstalacao(definirInstalacao), []);

  /* A entrada. Um relógio simples de 0 a 1, e nada mais depende dele. */
  useEffect(() => {
    let vivo = true;
    let pedido = 0;
    const comeco = performance.now();
    const passo = (agora: number): void => {
      if (!vivo) return;
      const t = Math.min(1, (agora - comeco) / DURACAO_DA_ENTRADA_MS);
      definirEntrada(t);
      if (t < 1) pedido = requestAnimationFrame(passo);
    };
    pedido = requestAnimationFrame(passo);
    return () => {
      vivo = false;
      cancelAnimationFrame(pedido);
    };
  }, []);

  const pular = (): void => {
    if (entrada < 1) definirEntrada(1);
  };

  const concluidas = CLASSES.filter((c) => recordeDe(save, c.id).concluida).length;
  const douradas = CLASSES.filter((c) => recordeDe(save, c.id).dourada).length;
  const guerreiro = recordeDe(save, 'guerreiro');
  const menuVisivel = entrada > 0.82;

  return (
    <div className="tela tela--titulo" onPointerDown={pular}>
      <CenaDeTitulo entrada={entrada} escurecer={painel === 'nenhum' ? 0 : 0.55} />

      {entrada < 0.5 && <div className="cortina-de-entrada" />}

      <div className={`menu${menuVisivel ? ' menu--visivel' : ''}`}>
        <Botao variante="forte" largo atraso={0} onClick={aoJogar}>
          {guerreiro.runs > 0 ? 'JOGAR' : 'COMEÇAR'}
        </Botao>
        <Botao
          largo
          atraso={70}
          onClick={() => {
            definirPainel('progresso');
          }}
        >
          PROGRESSO
        </Botao>
        <Botao
          largo
          atraso={140}
          onClick={() => {
            definirPainel('configuracoes');
          }}
        >
          CONFIGURAÇÕES
        </Botao>
        {instalacao === 'instalada' ? (
          <span className="selo-instalado pixel">JOGO INSTALADO</span>
        ) : (
          <Botao
            largo
            atraso={210}
            onClick={() => {
              if (instalacao === 'pronta') {
                void instalar().then((aceitou) => {
                  if (!aceitou) definirInstrucao(INSTRUCOES[plataforma()]);
                });
                return;
              }
              definirInstrucao(INSTRUCOES[plataforma()]);
              definirPainel('instalar');
            }}
          >
            INSTALAR JOGO
          </Botao>
        )}
      </div>

      {painel === 'progresso' && (
        <Painel titulo="PROGRESSO" aoFechar={() => { definirPainel('nenhum'); }}>
          <div className="linhas pixel">
            <span>CONCLUÍDAS</span>
            <span>
              {concluidas} / {CLASSES.length}
            </span>
            <span>DOURADAS</span>
            <span className={douradas > 0 ? 'dourado' : ''}>
              {douradas} / {CLASSES.length}
            </span>
            <span>RUNS</span>
            <span>{guerreiro.runs}</span>
            <span>MELHOR SALA</span>
            <span>{guerreiro.melhorSala} / 50</span>
          </div>
          {save.conheceAMaestria && (
            <p className="dica">
              Existe uma <strong>Maestria Dourada</strong> para quem vencer o Rei Oculto de forma
              excepcional.
            </p>
          )}
        </Painel>
      )}

      {painel === 'configuracoes' && (
        <Painel titulo="CONFIGURAÇÕES" aoFechar={() => { definirPainel('nenhum'); }}>
          <Controle
            rotulo="MÚSICA"
            valor={save.preferencias.volumeDaMusica}
            aoMudar={(v) => {
              aoMudarVolume(v, save.preferencias.volumeDosEfeitos);
            }}
          />
          <Controle
            rotulo="EFEITOS"
            valor={save.preferencias.volumeDosEfeitos}
            aoMudar={(v) => {
              audio.tocar('carta-escolhe');
              aoMudarVolume(save.preferencias.volumeDaMusica, v);
            }}
          />
        </Painel>
      )}

      {painel === 'instalar' && (
        <Painel titulo="INSTALAR" aoFechar={() => { definirPainel('nenhum'); }}>
          <p className="dica">{instrucao ?? INSTRUCOES[plataforma()]}</p>
          <p className="dica dica--fraca">
            Depois de instalado, o jogo abre em tela cheia, sem a barra do navegador.
          </p>
        </Painel>
      )}

      {instrucao !== null && painel === 'nenhum' && (
        <div className="aviso-flutuante pixel" onAnimationEnd={() => { definirInstrucao(null); }}>
          {instrucao}
        </div>
      )}
    </div>
  );
};

const Painel = ({
  titulo,
  children,
  aoFechar,
}: {
  readonly titulo: string;
  readonly children: React.ReactNode;
  readonly aoFechar: () => void;
}): React.JSX.Element => (
  <div className="painel-de-jogo" onPointerDown={(e) => { e.stopPropagation(); }}>
    <div className="painel-de-jogo__corpo moldura">
      <h2>{titulo}</h2>
      {children}
      <Botao variante="discreto" onClick={aoFechar}>
        FECHAR
      </Botao>
    </div>
  </div>
);

/** Um controle de volume em degraus, e não um `input[type=range]` de sistema. */
const Controle = ({
  rotulo,
  valor,
  aoMudar,
}: {
  readonly rotulo: string;
  readonly valor: number;
  readonly aoMudar: (valor: number) => void;
}): React.JSX.Element => {
  const degraus = 8;
  const cheios = Math.round(valor * degraus);
  return (
    <div className="controle">
      <span className="controle__rotulo pixel">{rotulo}</span>
      <div className="controle__degraus">
        {Array.from({ length: degraus }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`degrau${i < cheios ? ' degrau--cheio' : ''}`}
            aria-label={`${rotulo} ${i + 1} de ${degraus}`}
            onClick={() => {
              aoMudar((i + 1) / degraus);
            }}
          />
        ))}
      </div>
      <button
        type="button"
        className="controle__mudo pixel"
        onClick={() => {
          aoMudar(valor > 0 ? 0 : 0.6);
        }}
      >
        {valor > 0 ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};
