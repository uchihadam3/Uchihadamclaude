/* ════════════════════════════════════════════════════════════════════════
   A RÉGUA DE FORÇA — uma só, para a ferramenta e para o teste.

   Mede quanto uma relíquia vale, comparando a MESMA sala com e sem ela:
   mesma semente, mesmo tabuleiro, mesmas cartas. O que sobra na diferença é
   a peça, e mais nada.

   ═══ POR QUE NÃO SE MEDE PELA RUN INTEIRA ══════════════════════════════
   Porque não dá. A run é um resultado de cauda pesada — ou você morre na
   sala 3 ou vai até a 25 — e o desvio da diferença PAREADA ficou em ±1,3
   sala com 64 runs por medida. Como quase toda relíquia vale menos de uma
   sala, a tabela inteira virava ruído com cara de ranking: a mesma peça dava
   +1,83 num conjunto de sementes e −1,41 noutro.

   Sala a sala o desvio cai para ±0,03 a ±0,28 sobre valores que vão de −1,6
   a +8. Aí dá para ordenar setenta e cinco peças sem inventar.

   DUAS COISAS SÃO MEDIDAS, porque uma só engana:
     PONTO   quanto ela multiplica o placar da sala.
     META    quanto ela aumenta a chance de BATER a meta, que é o que decide
             se a run continua. Relíquia que dobra o placar de uma sala já
             ganha não vale o que parece.

   ═══ O QUE ELA NÃO ALCANÇA ═════════════════════════════════════════════
   Relíquia que age FORA da sala — a que dá relíquia ao entrar num mundo, a
   que desconta na loja, a que rende moeda — mede zero aqui, e zero não quer
   dizer fraca. Essas estão em `FORA_DA_SALA` e são medidas por run, com
   amostra grande. É a parte cara da conta e é por isso que a lista existe.
   ═══════════════════════════════════════════════════════════════════════ */
import { Run, COMBATE } from '../js/engine/run.js';
import { CLASSES } from '../js/data/classes.js';
import { jogarSala, jogarRun } from './bot.mjs';

export const ESQUECE = 0.12;
/* quatro pontos da run: o mesmo efeito vale coisas diferentes num tabuleiro
   de 6 e num de 28 */
export const LUGARES = [[0,0],[1,6],[3,2],[4,6]];
export const CLASSES_USADAS = ['detetive','cronomante','cientista','arqueologo'];

/* as que agem fora da sala. Moeda entra aqui porque a régua de sala não
   conta moeda — e moeda compra relíquia, que é o efeito real delas. */
export const FORA_DA_SALA = new Set(['mapa_velho','caneca','bolso_secreto',
  'sacola','trevo','chave_mestra','relogio_parado','cofre','pedra_filosofal',
  'bolsa_furada','ima','moeda_torta','cofrinho','rede','moeda_de_ouro']);

export function porSala(reliquias, sementes = 26){
  let comP = 0, semP = 0, comMeta = 0, semMeta = 0, n = 0;
  for(const cl of CLASSES_USADAS)
    for(const [mundo, indice] of LUGARES)
      for(let i = 0; i < sementes; i++){
        const monta = rel => {
          const r = new Run({ semente:'r'+i, classe:cl });
          r.reliquias.push(...rel);
          r.mundo = mundo; r.indice = indice;
          if(!COMBATE.has(r.tipoSala())) return null;
          if(!r.entrar()) return null;
          /* guarda a referência ANTES de jogar: quando a sala termina o
             motor zera `run.sala` na hora, e ler depois devolveria nada */
          const sala = r.sala;
          jogarSala(r, { esquece:ESQUECE });
          return sala;
        };
        /* o tabuleiro nasce de `semente|s|mundo|indice|tentativa` e não
           depende das relíquias: os dois lados jogam a MESMA sala */
        const a = monta([]), b = monta(reliquias);
        if(!a || !b) continue;
        semP += a.pontos; comP += b.pontos;
        semMeta += a.passou ? 1 : 0; comMeta += b.passou ? 1 : 0;
        n++;
      }
  return { n, ponto: comP / Math.max(1, semP),
           meta: (comMeta - semMeta) / Math.max(1, n) };
}

export function porRun(reliquias, sementes = 30){
  let salas = 0, base = 0, n = 0;
  for(const cl of Object.keys(CLASSES)) for(let i = 0; i < sementes; i++){
    const faz = rel => { const r = new Run({ semente:'g'+i, classe:cl });
      r.reliquias.push(...rel); jogarRun(r, { esquece:ESQUECE });
      return r.estatisticas.salas; };
    salas += faz(reliquias); base += faz([]); n++;
  }
  return (salas - base) / n;
}

/* FORÇA numa escala só. Cada ponto percentual a mais de chance de bater a
   meta pesa o dobro de um por cento de placar, porque bater a meta é o que
   mantém a run viva. Para as de fora da sala, a régua é quantas salas a mais
   elas rendem — trazida para a mesma escala pelo fator medido de 1,2. */
export function forca(id, { sementes = 26 } = {}){
  if(FORA_DA_SALA.has(id)) return { id, fora:true, forca: porRun([id]) * 1.2 };
  const s = porSala([id], sementes);
  return { id, fora:false, ponto:s.ponto, meta:s.meta,
           forca: (s.ponto - 1) * 100 * 0.06 + s.meta * 100 * 0.12 };
}
