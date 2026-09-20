import type { Area } from './tipos.js';

/*
 * As cinco áreas.
 *
 * É uma dungeon só, mas ela precisa **parecer** uma descida. A paleta é o que
 * carrega isso: o céu vai do azul frio da ruína aberta até o vermelho do
 * trono, o chão escurece, a neblina engrossa, e o que flutua no ar muda de
 * folha para cinza. Nada disso é textura pronta — tudo é gerado, e por isso a
 * troca de região é sentida mesmo em placeholder.
 */

export const AREAS: readonly Area[] = [
  {
    numero: 1,
    nome: 'Ruínas do Pátio',
    salaInicial: 1,
    salaFinal: 10,
    paleta: {
      ceu: ['#2b4a63', '#6a8fa3'],
      fundoDistante: '#3c5f6e',
      fundoMedio: '#2c4450',
      chao: '#3a4a3c',
      chaoDetalhe: '#4d6350',
      neblina: '#7fa8b8',
      luz: '#ffe6b0',
      particula: '#a8d86a',
      clima: 'folhas',
    },
  },
  {
    numero: 2,
    nome: 'Catacumbas',
    salaInicial: 11,
    salaFinal: 20,
    paleta: {
      ceu: ['#241f2e', '#463a52'],
      fundoDistante: '#3a3145',
      fundoMedio: '#261f30',
      chao: '#2e2833',
      chaoDetalhe: '#433a49',
      neblina: '#6b5f7d',
      luz: '#b9a6e0',
      particula: '#8d7fb0',
      clima: 'poeira',
    },
  },
  {
    numero: 3,
    nome: 'Profundezas',
    salaInicial: 21,
    salaFinal: 30,
    paleta: {
      ceu: ['#0f2226', '#1d4148'],
      fundoDistante: '#1b3b41',
      fundoMedio: '#11272c',
      chao: '#14282b',
      chaoDetalhe: '#22403f',
      neblina: '#3f7d7a',
      luz: '#7fe4d2',
      particula: '#5fd9c0',
      clima: 'faiscas',
    },
  },
  {
    numero: 4,
    nome: 'Fortaleza Interior',
    salaInicial: 31,
    salaFinal: 40,
    paleta: {
      ceu: ['#2d1a12', '#6b3820'],
      fundoDistante: '#4a2a1c',
      fundoMedio: '#2c1912',
      chao: '#33211a',
      chaoDetalhe: '#4d3424',
      neblina: '#8a4f2c',
      luz: '#ffb15e',
      particula: '#ff8c3a',
      clima: 'brasas',
    },
  },
  {
    numero: 5,
    nome: 'Trono Oculto',
    salaInicial: 41,
    salaFinal: 50,
    paleta: {
      ceu: ['#1a0a18', '#4d1030'],
      fundoDistante: '#3a0f2c',
      fundoMedio: '#1d0a18',
      chao: '#1f0d1b',
      chaoDetalhe: '#3b1530',
      neblina: '#7a1f4e',
      luz: '#ff5f8d',
      particula: '#ff3d6e',
      clima: 'cinzas',
    },
  },
];

/**
 * A área de uma sala. A sala 10 ainda é da área 1: o boss fecha a região.
 *
 * Fora das cinquenta salas a resposta é a última área — é o caso do Soberano,
 * que acontece depois da sala 50 e herda o Trono.
 */
export const areaDaSala = (sala: number): Area => {
  for (const area of AREAS) {
    if (sala >= area.salaInicial && sala <= area.salaFinal) return area;
  }
  return AREAS[AREAS.length - 1] as Area;
};
