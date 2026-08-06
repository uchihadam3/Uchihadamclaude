/* ========================================================================
   AS DEZ MASMORRAS (§3.3 escalada + §8 conteúdo).
   Cada masmorra: 8 comuns, 3 elites, 1 subchefe, 1 chefe — EXCLUSIVOS.
   ===================================================================== */
/* A ESCALADA — medida, não chutada (test/masmorra.mjs, 128 descidas por
   masmorra, começando em cada uma com o enxoval e a trilha que o jogo dá).

   ESTA COLUNA NÃO É A DIFICULDADE. Ela multiplica o HP escrito na ficha, e a
   ficha já cresce sozinha: o comum vai de 13 na M1 a 62 na M10 (4,8×). O que
   o jogador enfrenta é o PRODUTO das duas curvas, e é o produto que precisa
   acompanhar o jogador — medido, ele cresce 6,4× em vida e 9,5× em dano ao
   longo das dez. Com a escalada antiga o produto crescia 21×, e a medição
   mostrou o resultado: M6 e M7 fechando 0%, a M9 morrendo no PRIMEIRO andar.

   Por isso a coluna não sobe até o fim — ela CAI da M8 para a M10, e é de
   propósito: as fichas de lá dão um salto grande (41 → 49 → 62) e a escalada
   é o que sobra para ajustar. O produto, que é o que importa, sobe sempre:
     15  26  32  49  65  69  85  107  119  135      (9,0× da M1 à M10)
   Mexer aqui sem olhar o produto quebra a curva — test/habilidades.mjs
   verifica que ele nunca desce, e test/masmorra.mjs mede o resultado:
     M1 75%  M2 58%  M3 33%  M4 35%  M5 30%
     M6 30%  M7 31%  M8 27%  M9 21%  M10 10%
   ou seja: dá para fechar UMA masmorra por descida, e cada uma cobra mais
   que a anterior — que é exatamente o que o desenho pede. */
export const ESCALADA = [
  { n:1,  nome:'A Cripta de Giz',        hp:1.10, dano:1.20, fardo:null,                 fardoTxt:'—' },
  { n:2,  nome:'O Pântano de Sal',       hp:1.34, dano:1.36, fardo:'armadura_passiva',   fardoTxt:'Inimigos ganham 1 de armadura passiva' },
  { n:3,  nome:'A Forja Afundada',       hp:1.36, dano:1.52, fardo:'dado_enferrujado',   fardoTxt:'Você começa cada combate com 1 dado Enferrujado' },
  /* O HP da escalada SOMA-SE ao HP que as fichas já ganham por masmorra: a
     ficha do comum vai de 13 na M1 a 62 na M10 sozinha (4,8×). Multiplicando
     as duas curvas, o inimigo crescia 21× enquanto o jogador — medido, com
     enxoval e trilha — cresce 6,4× em vida e 9,5× em dano. Geométrico contra
     geométrico maior só termina de um jeito. A coluna abaixo cresce devagar
     da M4 em diante para o produto ficar perto do que o jogador acompanha;
     a M1-M3 fica como estava, que a medição já mostrou calibrada. */
  { n:4,  nome:'A Biblioteca Fraturada', hp:1.90, dano:1.69, fardo:'acao_dupla',         fardoTxt:'Inimigos agem 2× a cada 3 turnos' },
  { n:5,  nome:'A Colmeia de Quitina',   hp:2.05, dano:1.87, fardo:'reroll_custa_vida',  fardoTxt:'Re-rolagens custam vida' },
  { n:6,  nome:'A Cidadela de Vidro',    hp:2.25, dano:2.06, fardo:'um_trava',           fardoTxt:'Dados que rolarem 1 ficam Travados por um turno' },
  { n:7,  nome:'O Mercado das Almas',    hp:2.45, dano:2.26, fardo:'rouba_dado',         fardoTxt:'Inimigos roubam 1 dado seu por combate' },
  /* M8-M10: o multiplicador de dano CAI aqui, e é de propósito. Esta coluna
     não é a dificuldade absoluta — é um ajuste por cima das fichas, e as
     fichas destas três já dão um salto sozinhas. Medido: a pancada por turno
     com dano=1 sobe 15% de M6 para M7 e 58% de M7 para M8. Multiplicar esse
     degrau por um fator ainda maior era o que punha o andar 8 da M9 batendo
     654 num jogador de 373 de vida. Com os valores abaixo a pancada final
     sobe ~25%, ~22% e ~20% por masmorra — continua apertando, sem despencar. */
  { n:8,  nome:'O Jardim de Carne',      hp:2.62, dano:1.79, fardo:'cura_reduzida',      fardoTxt:'Cura reduzida em 50%' },
  { n:9,  nome:'A Torre Invertida',      hp:2.45, dano:1.89, fardo:'elites_em_par',      fardoTxt:'Toda onda tem ≥1 elite; do 3º andar em diante, em pares' },
  { n:10, nome:'O Cassino do Vazio',     hp:2.18, dano:2.12, fardo:'abismo_rerola',      fardoTxt:'O Abismo re-rola um dos seus dados depois de você jogar' },
];

/* paletas restritas (§10) — 4-6 cores + 1 acento de perigo */
export const PALETAS = {
  1:{ bg:'#141218', a:'#e8e2d0', b:'#9a927e', c:'#3a3630', perigo:'#e04a3a' },
  2:{ bg:'#101a14', a:'#7fae72', b:'#3f5c42', c:'#22321f', perigo:'#c9d94a' },
  3:{ bg:'#1a0f08', a:'#ff8a2b', b:'#8a3c10', c:'#3a1e0c', perigo:'#ffd12b' },
  4:{ bg:'#0d1220', a:'#9fc4e8', b:'#3f5f8a', c:'#1b2740', perigo:'#e8e2d0' },
  5:{ bg:'#1d1208', a:'#e0a53c', b:'#7a4bb5', c:'#3d2a12', perigo:'#c05ce0' },
  6:{ bg:'#0e1418', a:'#cfe6f2', b:'#6b8fa3', c:'#243440', perigo:'#4ad9ff' },
  7:{ bg:'#1a0a10', a:'#d4af37', b:'#8a1b34', c:'#3a0f1c', perigo:'#ff3355' },
  8:{ bg:'#1a0d12', a:'#e58fa0', b:'#a34a5e', c:'#3d1a24', perigo:'#7fff9a' },
  9:{ bg:'#130d1c', a:'#b48ce0', b:'#5f3f8a', c:'#291d3d', perigo:'#ffd24a' },
 10:{ bg:'#07090a', a:'#d4af37', b:'#0f4d33', c:'#12181a', perigo:'#ff2b6b' },
};

/* helper de padrão de intenção */
import { A, B, M, D, H, BF, C, CONG, ROUB, FRAT, INV, CONT, T } from './vocab.js';

/* ---------------- MASMORRA 1 — A CRIPTA DE GIZ ----------------
   Tema: aritmética básica virada em fechadura. Cada comum ensina UMA regra;
   as ondas depois misturam duas que brigam pelos mesmos dados. */
export const M1 = {
  comuns:[
    { id:'osso_solto',    nome:'Osso Solto',     hp:15, padrao:[A(5),A(6)],
      desc:'Sem fechadura. É o professor: mostra que dano é dano.' },

    { id:'cranio_rolante',nome:'Crânio Rolante', hp:13, trava:T('impar'),
      padrao:[M(3,2),A(5)],
      desc:'Rola de lado. Só sangra com soma ÍMPAR.' },

    { id:'vela_fatua',    nome:'Vela Fátua',     hp:10, trava:T('enxuto',1),
      padrao:[H(7),A(4)],
      desc:'Chama fina: um dado só a apaga. Dois a abanam. Cura o aliado mais ferido.' },

    { id:'escriba_giz',   nome:'Escriba de Giz', hp:14, trava:T('par'),
      padrao:[FRAT(),A(5)],
      desc:'Reescreve o seu dado: FRATURA (o máximo cai 1, para sempre).' },

    { id:'mao_sem_dono',  nome:'Mão Sem Dono',   hp:12,
      padrao:[ROUB(),A(6)],
      desc:'ROUBA o seu maior dado do turno. Sem fechadura, mas cobra caro.' },

    { id:'coro_mudo',     nome:'Coro Mudo',      hp:14, trava:T('simbolo','blade'),
      padrao:[BF(),A(4)],
      desc:'Só o aço o cala: precisa de ⚔ Lâmina no golpe. Enfurece os aliados.' },

    { id:'ossada_curvada',nome:'Ossada Curvada', hp:20, trava:T('forte',4),
      padrao:[B(9),A(5)],
      desc:'Couraça: golpe cujo maior dado seja menor que 4 nem arranha.' },

    { id:'lasca_femur',   nome:'Lasca de Fêmur', hp:8,  trava:T('fraco',3), explode:8,
      padrao:[A(10)],
      desc:'Casca fina: dado grande estilhaça sem ferir. Ao morrer EXPLODE no campo — quem estiver do lado também leva.' },
  ],
  elites:[
    { id:'sacristao',  nome:'Sacristão Pálido',  hp:36, trava:T('chave',7),
      padrao:[A(9), C(), A(8)],
      aura:{ id:'um_amaldicoa', txt:'Todo dado que você rolar 1 vira ☠ Vazio.' },
      desc:'A fechadura é uma chave: soma EXATA de 7. E ele amaldiçoa faces.' },

    { id:'guardiao',   nome:'Guardião do Nicho', hp:44, trava:T('multiplo',3),
      padrao:[B(11), A(12), INV()],
      aura:{ id:'armadura_campo', txt:'Todos os inimigos ganham +2 de armadura.' },
      desc:'Só cede a somas múltiplas de 3. E INVERTE o seu melhor dado.' },

    { id:'carrilhao',  nome:'Carrilhão de Ossos',hp:32, trava:T('espelho',45),
      padrao:[M(5,2), CONG(), A(9)],
      aura:{ id:'sem_sobra', txt:'Se você não deixar dados na Reserva, sofre 4.' },
      desc:'Devolve 45% do que sofre. CONGELA um dado seu na face em que caiu.' },
  ],
  subchefe:{ id:'coveiro', nome:'O Coveiro Contador', hp:82,
    travaCiclo:[T('par'), T('impar')],
    padrao:[CONT(24,3), A(9), ROUB()],
    invoca:['osso_solto','cranio_rolante'],
    desc:'A pá conta até três. E a regra dele VIRA todo turno: par, ímpar, par…' },

  chefe:{ id:'ossario', nome:'OSSÁRIO', hp:160,
    travaCiclo:[T('forte',5), T('impar'), T('chave',9), T('enxuto',2)],
    padrao:[A(13), M(6,3), CONG(), {t:'atk',v:20}, FRAT()],
    reergue:true,
    desc:'Colosso de ossos. A fechadura gira a cada turno: couraça, ímpar, chave 9, um par de dados. Reergue os lacaios.' },
};

/* ---------------- MASMORRA 2 — O PÂNTANO DE SAL ----------------
   Fardo: todo inimigo tem +1 de armadura passiva — o que castiga golpe
   picadinho. Tema de fechadura: TAMANHO do dado (couraça x casca fina) e
   QUANTIDADE (enxuto x farto) brigando na mesma onda. */
export const M2 = {
  comuns:[
    { id:'cria_salmoura', nome:'Cria de Salmoura', hp:18, padrao:[A(6),M(3,2)],
      desc:'Sem fechadura. Ensina que aqui todo mundo tem casca (+1 de armadura).' },
    { id:'sanguessuga',   nome:'Sanguessuga Cristalina', hp:15, trava:T('fraco',3),
      padrao:[A(5),H(7)],
      desc:'Só golpe pequeno a fere — e ela cura o aliado mais ferido.' },
    { id:'peregrino',     nome:'Peregrino Afogado', hp:22, trava:T('par'),
      padrao:[M(4,2),A(7)],
      desc:'Anda em fila de dois. Soma PAR ou nada.' },
    { id:'estatua_sal',   nome:'Estátua de Sal', hp:30, trava:T('forte',5),
      padrao:[B(12),A(6)],
      desc:'Bloco maciço: dado pequeno se desfaz nela.' },
    { id:'bolha_mare',    nome:'Bolha de Maré', hp:11, trava:T('enxuto',1), explode:9,
      padrao:[A(12)],
      desc:'Estoura com um toque só — dois dados a espalham. Ao morrer EXPLODE no campo: use-a para ferir os vizinhos.' },
    { id:'coral_cantante',nome:'Coral Cantante', hp:19, trava:T('simbolo','shield'),
      padrao:[BF(),A(5)],
      desc:'Só cede ao 🛡 Escudo no golpe. Enfurece o pântano.' },
    { id:'mao_limo',      nome:'Mão de Limo', hp:17,
      padrao:[ROUB(),A(6)],
      desc:'Sem fechadura, mas leva um dado seu embora.' },
    { id:'escama_salgada',nome:'Escama Salgada', hp:24, trava:T('farto',3),
      padrao:[B(9),A(8)],
      desc:'Casca em camadas: golpe estreito não passa. Precisa de 3 dados.' },
  ],
  elites:[
    { id:'salineiro',   nome:'O Salineiro', hp:48, trava:T('chave',9),
      padrao:[A(11),FRAT(),A(10)],
      aura:{ id:'cura_salgada', txt:'Cura recebida reduzida à metade.' },
      desc:'Mede tudo: soma exata 9. E fratura os seus dados.' },
    { id:'afogadora',   nome:'A Afogadora', hp:52, trava:T('multiplo',4),
      padrao:[M(6,2),CONG(),A(12)],
      desc:'Puxa pro fundo: soma múltipla de 4. Congela um dado por vez.' },
    { id:'colosso_cristal',nome:'Colosso de Cristal', hp:58, trava:T('forte',6),
      padrao:[B(14),A(14),INV()],
      aura:{ id:'armadura_campo', txt:'Todos os inimigos ganham +2 de armadura.' },
      desc:'Só dado enorme racha o cristal. E ele inverte o seu melhor.' },
  ],
  subchefe:{ id:'maregrande', nome:'A MARÉ-GRANDE', hp:105,
    travaCiclo:[T('par'), T('farto',3)],
    padrao:[M(5,3), A(14), CONT(28,3)],
    invoca:['cria_salmoura','bolha_mare'],
    desc:'Sobe e desce: um turno pede soma PAR, o outro pede 3 dados. E conta até três.' },
  chefe:{ id:'rainha_sal', nome:'A RAINHA DE SAL', hp:190,
    travaCiclo:[T('forte',5), T('chave',11), T('enxuto',2), T('fraco',4)],
    padrao:[A(16), M(7,3), C(), A(24), CONG()],
    reergue:true,
    desc:'Trono de cristal. Quatro regras em ciclo: couraça, chave 11, dois dados, casca fina.' },
};

/* ---------------- MASMORRA 3 — A FORJA AFUNDADA ----------------
   Fardo: você começa cada combate com um dado Enferrujado. Tema de fechadura:
   ARITMÉTICA (múltiplo e chave alta) — a masmorra onde o Polegar Torto e a
   Sobrecarga deixam de ser luxo. */
export const M3 = {
  comuns:[
    { id:'brasa_afogada', nome:'Brasa Afogada', hp:20, padrao:[A(7),A(8)],
      desc:'Sem fechadura. Bate e queima, só isso.' },
    { id:'bigorna_viva',  nome:'Bigorna Viva', hp:34, trava:T('forte',5),
      padrao:[B(14),A(7)],
      desc:'Ferro maciço: só o dado máximo marca.' },
    { id:'fole_partido',  nome:'Fole Partido', hp:18, trava:T('impar'),
      padrao:[BF(),A(6)],
      desc:'Sopra em compasso quebrado: soma ÍMPAR. Atiça os outros.' },
    { id:'escoria',       nome:'Escória', hp:16, trava:T('fraco',3), explode:10,
      padrao:[M(3,3)],
      desc:'Crosta quebradiça: golpe grande espalha sem ferir. Ao morrer EXPLODE forte no campo inteiro.' },
    { id:'martelo_orfao', nome:'Martelo Órfão', hp:24, trava:T('multiplo',3),
      padrao:[A(12),INV()],
      desc:'Bate em três tempos: soma múltipla de 3. E inverte o seu dado.' },
    { id:'ferreiro_cego', nome:'Ferreiro Cego', hp:26, trava:T('simbolo','blade'),
      padrao:[FRAT(),A(9)],
      desc:'Só reconhece aço: precisa de ⚔ no golpe. Fratura os seus dados.' },
    { id:'verruma',       nome:'Verruma', hp:21, trava:T('enxuto',2),
      padrao:[M(5,2),A(7)],
      desc:'Fura em par: exatamente dois dados, nem um a mais.' },
    { id:'lingote_vivo',  nome:'Lingote Vivo', hp:28, trava:T('farto',3),
      padrao:[B(11),A(10)],
      desc:'Massa densa: precisa de golpe largo, 3 dados ou mais.' },
  ],
  elites:[
    { id:'mestre_tempera',nome:'Mestre da Têmpera', hp:60, trava:T('chave',12),
      padrao:[A(14),CONG(),A(12)],
      aura:{ id:'armadura_campo', txt:'Todos os inimigos ganham +2 de armadura.' },
      desc:'Mede o calor na régua: soma exata 12. Congela o que você guardou.' },
    { id:'tromba_dagua', nome:"Tromba d'Água", hp:55, trava:T('par'),
      padrao:[M(6,3),ROUB()],
      desc:'Inunda em ondas pares. Rouba um dado por combate.' },
    { id:'nucleo_fundido',nome:'Núcleo Fundido', hp:62, trava:T('espelho',50),
      padrao:[A(16),D('queimadura',4)],
      desc:'Devolve metade do que sofre. Veneno e sangramento saem mais barato.' },
  ],
  subchefe:{ id:'capataz', nome:'O CAPATAZ DE FERRO', hp:120,
    travaCiclo:[T('multiplo',3), T('forte',5)],
    padrao:[CONT(34,3), A(13), FRAT()],
    invoca:['brasa_afogada','escoria'],
    desc:'Conta as marteladas até três. A regra alterna entre múltiplo de 3 e couraça 6.' },
  chefe:{ id:'bigorna_mae', nome:'A BIGORNA-MÃE', hp:220,
    travaCiclo:[T('forte',5), T('chave',12), T('impar'), T('farto',3)],
    padrao:[A(18), M(8,3), CONG(), A(28), INV()],
    reergue:true,
    desc:'A forja inteira é o corpo dela. Quatro regras girando: couraça 6, chave 12, ímpar, 3 dados.' },
};

import { M4, M5, M6, M7, M8, M9, M10 } from './dungeons2.js';
export { M4, M5, M6, M7, M8, M9, M10 };
export const MASMORRAS = { 1:M1, 2:M2, 3:M3, 4:M4, 5:M5, 6:M6, 7:M7, 8:M8, 9:M9, 10:M10 };
