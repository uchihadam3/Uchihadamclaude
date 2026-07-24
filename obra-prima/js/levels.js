/* ========================================================================
   OBRA-PRIMA — 20 fases com curva de dificuldade
   Cada fase: alvo maior, mesa menor, formas mais esquisitas, materiais
   mais traiçoeiros (gelo escorrega, borracha quica). Fila determinística
   por fase (dá pra treinar a estratégia das 3 estrelas).
   ===================================================================== */

// pools de forma por dificuldade (vão acumulando)
const EASY   = ['cubo','caixa','tabua','viga','laje'];
const MID    = [...EASY,'cilindro','toco','hexagono','barril'];
const HARD   = [...MID,'cunha','triangulo','trapezio','cone','escada','te'];
const WEIRD  = [...HARD,'esfera','piramide','octaedro','meialua','arco','cruz','pedra','ele'];

const M_EASY = ['madeira','caixote'];
const M_MID  = ['madeira','caixote','pedra','concreto'];
const M_HARD = ['madeira','caixote','pedra','concreto','metal'];
const M_ALL  = ['madeira','caixote','pedra','concreto','metal','gelo','borracha'];

function L(n,name,target,hx,hz,shapes,mats,budget,par){ return {n,name,target,halfX:hx,halfZ:hz,shapes,mats,budget,par}; }

export const LEVELS = [
  L(1, 'Fundação',           3.0, 3.2,2.6, EASY,  M_EASY, 8,  5),
  L(2, 'Alicerce',           3.6, 3.2,2.6, EASY,  M_EASY, 9,  6),
  L(3, 'Primeiros Andares',  4.2, 3.1,2.5, EASY,  M_EASY, 9,  7),
  L(4, 'Peso Bruto',         4.4, 3.0,2.4, MID,   M_MID,  10, 7),
  L(5, 'Coisa que Rola',     4.8, 3.0,2.4, MID,   M_MID,  10, 8),
  L(6, 'Equilíbrio',         5.2, 2.8,2.2, MID,   M_MID,  11, 8),
  L(7, 'Ladeira',            5.4, 2.8,2.2, HARD,  M_MID,  11, 8),
  L(8, 'Tudo Torto',         5.8, 2.6,2.1, HARD,  M_HARD, 12, 9),
  L(9, 'Denso',              6.0, 2.6,2.0, HARD,  M_HARD, 12, 9),
  L(10,'Meio do Caminho',    6.4, 2.4,1.9, HARD,  M_HARD, 12, 9),
  L(11,'Esferas Malditas',   6.6, 2.4,1.9, WEIRD, M_HARD, 13, 10),
  L(12,'Gelo Fino',          6.8, 2.3,1.8, WEIRD, M_ALL,  13, 10),
  L(13,'Instável',           7.0, 2.2,1.8, WEIRD, M_ALL,  13, 10),
  L(14,'Arco e Cruz',        7.4, 2.2,1.7, WEIRD, M_HARD, 14, 11),
  L(15,'Salta-Salta',        7.6, 2.0,1.6, WEIRD, M_ALL,  14, 11),
  L(16,'Pedreira',           7.8, 2.0,1.6, WEIRD, M_ALL,  14, 11),
  L(17,'Estreito',           8.2, 1.9,1.5, WEIRD, M_ALL,  15, 12),
  L(18,'Vertigem',           8.6, 1.8,1.4, WEIRD, M_ALL,  15, 12),
  L(19,'Beira do Abismo',    9.2, 1.7,1.4, WEIRD, M_ALL,  16, 13),
  L(20,'Obra-Prima',        10.0, 1.6,1.3, WEIRD, M_ALL,  17, 14),
];

/* fila determinística por fase (seed = número da fase) */
export function buildQueue(level){
  let s=(level.n*2654435761)>>>0 || 7;
  const rr=()=>{ s^=s<<13;s^=s>>>17;s^=s<<5; return ((s>>>0)%100000)/100000; };
  const q=[]; let lastShape=null;
  // garante uma base boa: 1ª peça sempre estável (laje/caixa/cubo)
  const baseShapes=['laje','caixa','cubo'].filter(x=>level.shapes.includes(x));
  q.push({ shape: baseShapes.length? baseShapes[(rr()*baseShapes.length)|0] : level.shapes[0], mat: level.mats[(rr()*level.mats.length)|0] });
  for(let i=1;i<level.budget;i++){
    let sh; do{ sh=level.shapes[(rr()*level.shapes.length)|0]; }while(sh===lastShape && level.shapes.length>3 && rr()<0.6);
    lastShape=sh;
    q.push({ shape:sh, mat: level.mats[(rr()*level.mats.length)|0] });
  }
  return q;
}
