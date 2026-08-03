/* FACES — o vocabulário do jogo (§5.1). Toda face é um SÍMBOLO COM VALOR. */
export const FACE_KINDS = {
  num:     { id:'num',     nome:'Número',  glifo:'',  cor:'#e8e2d0', desc:'Matéria-prima. Vale o número.' },
  blade:   { id:'blade',   nome:'Lâmina',  glifo:'⚔', cor:'#e06060', desc:'Vale o número E soma +1 de dano bruto.' },
  shield:  { id:'shield',  nome:'Escudo',  glifo:'🛡', cor:'#6fa8dc', desc:'Vale o número, mas converte em bloqueio.' },
  essence: { id:'essence', nome:'Essência',glifo:'✦', cor:'#c07cff', desc:'Recurso mágico. Sem valor numérico.' },
  void:    { id:'void',    nome:'Vazio',   glifo:'☠', cor:'#5a5a66', desc:'Amaldiçoada. Inútil e às vezes prejudicial.' },
  wild:    { id:'wild',    nome:'Curinga', glifo:'◈', cor:'#ffd24a', desc:'Assume qualquer valor que você escolher.' },
  echo:    { id:'echo',    nome:'Eco',     glifo:'⟳', cor:'#4ad9c0', desc:'Ao ser gasto, duplica o dado seguinte.' },
};
export const face = (k, v=0) => ({ k, v });
export const numFaces = n => Array.from({length:n}, (_,i)=>face('num', i+1));
export const faceValue = f => (f.k==='num'||f.k==='blade'||f.k==='shield'||f.k==='echo') ? f.v : null;
export const hasValue  = f => faceValue(f)!==null || f.k==='wild';
