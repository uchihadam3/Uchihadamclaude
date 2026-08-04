/* ========================================================================
   AS DEZ MASMORRAS (§3.3 escalada + §8 conteúdo).
   Cada masmorra: 8 comuns, 3 elites, 1 subchefe, 1 chefe — EXCLUSIVOS.
   ===================================================================== */
export const ESCALADA = [
  { n:1,  nome:'A Cripta de Giz',        hp:1.30, dano:1.35, fardo:null,                 fardoTxt:'—' },
  { n:2,  nome:'O Pântano de Sal',       hp:1.95, dano:1.75, fardo:'armadura_passiva',   fardoTxt:'Inimigos ganham 1 de armadura passiva' },
  { n:3,  nome:'A Forja Afundada',       hp:2.75, dano:2.15, fardo:'dado_enferrujado',   fardoTxt:'Você começa cada combate com 1 dado Enferrujado' },
  { n:4,  nome:'A Biblioteca Fraturada', hp:3.70, dano:2.60, fardo:'acao_dupla',         fardoTxt:'Inimigos agem 2× a cada 3 turnos' },
  { n:5,  nome:'A Colmeia de Quitina',   hp:4.90, dano:3.05, fardo:'reroll_custa_vida',  fardoTxt:'Re-rolagens custam vida' },
  { n:6,  nome:'A Cidadela de Vidro',    hp:5.60, dano:3.30, fardo:'um_trava',           fardoTxt:'Dados que rolarem 1 ficam Travados por um turno' },
  { n:7,  nome:'O Mercado das Almas',    hp:6.90, dano:3.80, fardo:'rouba_dado',         fardoTxt:'Inimigos roubam 1 dado seu por combate' },
  { n:8,  nome:'O Jardim de Carne',      hp:8.40, dano:4.30, fardo:'cura_reduzida',      fardoTxt:'Cura reduzida em 50%' },
  { n:9,  nome:'A Torre Invertida',      hp:10.2, dano:4.90, fardo:'elites_em_par',      fardoTxt:'Toda onda tem ≥1 elite; elites vêm em pares' },
  { n:10, nome:'O Cassino do Vazio',     hp:12.4, dano:5.60, fardo:'abismo_rerola',      fardoTxt:'O Abismo re-rola um dos seus dados depois de você jogar' },
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

/* ---------------- MASMORRA 1 — A CRIPTA DE GIZ ----------------
   Tema: números baixos, ensina o básico. Ossários, giz branco, velas. */
export const M1 = {
  comuns:[
    { id:'osso_solto',    nome:'Osso Solto',        hp:14, padrao:[A(5),A(6)],                 desc:'Ataca. Só isso. É o professor.' },
    { id:'cranio_rolante',nome:'Crânio Rolante',    hp:11, padrao:[M(3,2),A(4)],               desc:'Dois golpes pequenos.' },
    { id:'vela_fatua',    nome:'Vela Fátua',        hp:9,  padrao:[H(6),A(3)],                 desc:'Cura o aliado mais ferido.' },
    { id:'escriba_giz',   nome:'Escriba de Giz',    hp:12, padrao:[D('fratura',1),A(4)],       desc:'Frature: seu dado perde 1 do máximo.' },
    { id:'mao_sem_dono',  nome:'Mão Sem Dono',      hp:10, padrao:[A(4),A(7)],                 desc:'Rápida e oportunista.' },
    { id:'coro_mudo',     nome:'Coro Mudo',         hp:13, padrao:[BF(),A(3)],                 desc:'Enfurece os aliados.' },
    { id:'ossada_curvada',nome:'Ossada Curvada',    hp:18, padrao:[B(8),A(4)],                 desc:'Muito bloqueio, pouco dano.' },
    { id:'lasca_femur',   nome:'Lasca de Fêmur',    hp:6,  padrao:[A(9)],       explode:7,     desc:'Frágil, mas explode ao morrer.' },
  ],
  elites:[
    { id:'sacristao',  nome:'Sacristão Pálido',  hp:34, padrao:[A(9),D('maldicao',1),A(7)],
      aura:{ id:'um_amaldicoa', txt:'Todo dado que você rolar 1 vira ☠ Vazio.' } },
    { id:'guardiao',   nome:'Guardião do Nicho', hp:40, padrao:[B(10),A(11)],
      aura:{ id:'armadura_campo', txt:'Todos os inimigos ganham +2 de armadura.' } },
    { id:'carrilhao',  nome:'Carrilhão de Ossos',hp:30, padrao:[M(5,2),A(8)],
      aura:{ id:'sem_sobra', txt:'Se você não deixar dados na Reserva, sofre 4.' } },
  ],
  subchefe:{ id:'coveiro', nome:'O Coveiro Contador', hp:78,
    padrao:[A(8), A(8), {t:'atk',v:22,tel:'A CONTA'}],
    invoca:['osso_solto','cranio_rolante'],
    desc:'Conta até três. No três, a pá desce.' },
  chefe:{ id:'ossario', nome:'OSSÁRIO', hp:150,
    padrao:[A(12), {t:'atk_multi',v:6,n:3}, B(14), {t:'atk',v:18}],
    reergue:true,
    desc:'Colosso de ossos. Reergue os lacaios que você mata.' },
};

export const MASMORRAS = { 1:M1 };
