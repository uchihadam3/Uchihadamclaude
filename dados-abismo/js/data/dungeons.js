/* ========================================================================
   AS DEZ MASMORRAS (§3.3 escalada + §8 conteúdo).
   Cada masmorra: 8 comuns, 3 elites, 1 subchefe, 1 chefe — EXCLUSIVOS.
   ===================================================================== */
export const ESCALADA = [
  { n:1,  nome:'A Cripta de Giz',        hp:1.10, dano:1.20, fardo:null,                 fardoTxt:'—' },
  { n:2,  nome:'O Pântano de Sal',       hp:1.60, dano:1.55, fardo:'armadura_passiva',   fardoTxt:'Inimigos ganham 1 de armadura passiva' },
  { n:3,  nome:'A Forja Afundada',       hp:2.25, dano:1.92, fardo:'dado_enferrujado',   fardoTxt:'Você começa cada combate com 1 dado Enferrujado' },
  { n:4,  nome:'A Biblioteca Fraturada', hp:3.00, dano:2.32, fardo:'acao_dupla',         fardoTxt:'Inimigos agem 2× a cada 3 turnos' },
  { n:5,  nome:'A Colmeia de Quitina',   hp:3.95, dano:2.72, fardo:'reroll_custa_vida',  fardoTxt:'Re-rolagens custam vida' },
  { n:6,  nome:'A Cidadela de Vidro',    hp:4.60, dano:2.95, fardo:'um_trava',           fardoTxt:'Dados que rolarem 1 ficam Travados por um turno' },
  { n:7,  nome:'O Mercado das Almas',    hp:5.60, dano:3.40, fardo:'rouba_dado',         fardoTxt:'Inimigos roubam 1 dado seu por combate' },
  { n:8,  nome:'O Jardim de Carne',      hp:6.80, dano:3.85, fardo:'cura_reduzida',      fardoTxt:'Cura reduzida em 50%' },
  { n:9,  nome:'A Torre Invertida',      hp:8.20, dano:4.35, fardo:'elites_em_par',      fardoTxt:'Toda onda tem ≥1 elite; elites vêm em pares' },
  { n:10, nome:'O Cassino do Vazio',     hp:9.90, dano:4.90, fardo:'abismo_rerola',      fardoTxt:'O Abismo re-rola um dos seus dados depois de você jogar' },
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
const A=(v)=>({t:'atk',v}), B=(v)=>({t:'block',v}), M=(v,n)=>({t:'atk_multi',v,n});
const D=(st,v)=>({t:'debuff',st,v}), H=(v)=>({t:'heal',v}), BF=()=>({t:'buff'}), C=()=>({t:'curse'});
/* intenções que mexem nos SEUS dados — a parte de quebra-cabeça */
const CONG=()=>({t:'congelar'}), ROUB=()=>({t:'roubar'}), FRAT=()=>({t:'fraturar'});
const INV=()=>({t:'inverter'}), CONT=(v,ate)=>({t:'contar',v,ate});
/* fechaduras */
const T=(t,v)=>({t,v});

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
      desc:'Casca fina: dado grande estilhaça sem ferir. Explode ao morrer.' },
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

export const MASMORRAS = { 1:M1 };
