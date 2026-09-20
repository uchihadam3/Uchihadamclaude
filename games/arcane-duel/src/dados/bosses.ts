import type { Inimigo } from './tipos.js';

/*
 * Os cinco bosses, mais o que não está na lista.
 *
 * Um boss não é um inimigo com mais vida: ele tem um golpe que obriga a build
 * a ter uma resposta, e é isso que separa "chegar na sala 40" de "passar da
 * sala 40". O Ferreiro quebra Armadura, então uma build que vive de Armadura
 * precisa de outra coisa; o Coro ignora Armadura, então quem empilhou placa
 * sente; o Soberano faz as duas.
 *
 * A entrada cinematográfica e a barra própria vivem na apresentação — aqui
 * está só o que o motor precisa saber.
 */

export const BOSSES: readonly Inimigo[] = [
  {
    id: 'b-capitao-das-ruinas',
    nome: 'Capitão das Ruínas',
    porte: 'boss',
    vida: 900,
    armadura: 70,
    dano: 13,
    intervaloS: 1.7,
    exp: 130,
    area: 1,
    especial: { nome: 'Golpe de Bandeira', aCadaS: 8, dano: 30 },
    silhueta: {
      forma: 'humanoide',
      corpo: '#4a5a3c',
      detalhe: '#94a86a',
      brilho: '#e8d98a',
      largura: 30,
      altura: 44,
    },
  },
  {
    id: 'b-senhor-das-catacumbas',
    nome: 'Senhor das Catacumbas',
    porte: 'boss',
    vida: 1350,
    armadura: 96,
    dano: 17,
    intervaloS: 1.7,
    exp: 200,
    area: 2,
    especial: { nome: 'Maldição', aCadaS: 7, dano: 40 },
    silhueta: {
      forma: 'espectro',
      corpo: '#3a3145',
      detalhe: '#7e6ba0',
      brilho: '#c9b8e6',
      largura: 32,
      altura: 46,
    },
  },
  {
    id: 'b-coro-das-profundezas',
    nome: 'Coro das Profundezas',
    porte: 'boss',
    vida: 1900,
    armadura: 60,
    dano: 20,
    intervaloS: 1.5,
    exp: 290,
    area: 3,
    /* Ignora Armadura por completo: a build de placa precisa de outra saída. */
    especial: { nome: 'Canto Dissonante', aCadaS: 6.5, dano: 52 },
    silhueta: {
      forma: 'aberracao',
      corpo: '#11272c',
      detalhe: '#3f7d7a',
      brilho: '#7fe4d2',
      largura: 36,
      altura: 44,
    },
  },
  {
    id: 'b-ferreiro-da-fortaleza',
    nome: 'Ferreiro da Fortaleza',
    porte: 'boss',
    vida: 2600,
    armadura: 150,
    dano: 22,
    intervaloS: 1.8,
    exp: 400,
    area: 4,
    especial: { nome: 'Martelo de Forja', aCadaS: 7, dano: 58, quebraArmadura: 45 },
    silhueta: {
      forma: 'construto',
      corpo: '#4a2a1c',
      detalhe: '#a3532a',
      brilho: '#ffb15e',
      largura: 36,
      altura: 48,
    },
  },
  {
    id: 'b-rei-oculto',
    nome: 'Rei Oculto',
    porte: 'boss',
    vida: 3600,
    armadura: 180,
    dano: 26,
    intervaloS: 1.6,
    exp: 600,
    area: 5,
    especial: { nome: 'Última Ordem', aCadaS: 6, dano: 70, quebraArmadura: 40 },
    silhueta: {
      forma: 'humanoide',
      corpo: '#3a0f2c',
      detalhe: '#a32a55',
      brilho: '#ff5f8d',
      largura: 34,
      altura: 50,
    },
  },
];

/**
 * O Soberano Oculto.
 *
 * Um só para o jogo inteiro, e ele não está na lista dos cinco porque não
 * pertence à dungeon: ele é o que acontece **depois** dela, para quem chegou
 * ao fim com desempenho excepcional. Os multiplicadores que o endurecem moram
 * em `balanceamento.ts`, porque é lá que se calibra o quão raro isso deve ser.
 */
export const SOBERANO_OCULTO: Inimigo = {
  id: 'b-soberano-oculto',
  nome: 'Soberano Oculto',
  porte: 'boss',
  vida: 3600,
  armadura: 220,
  dano: 30,
  intervaloS: 1.4,
  exp: 0,
  area: 5,
  especial: { nome: 'Silêncio', aCadaS: 5.5, dano: 84, quebraArmadura: 60 },
  silhueta: {
    forma: 'espectro',
    corpo: '#120510',
    detalhe: '#6b0f3a',
    brilho: '#ffd36e',
    largura: 38,
    altura: 54,
  },
};

/** O boss de uma sala de boss. */
export const bossDaSala = (sala: number): Inimigo | null => {
  const indice = sala / 10 - 1;
  if (!Number.isInteger(indice)) return null;
  return BOSSES[indice] ?? null;
};
