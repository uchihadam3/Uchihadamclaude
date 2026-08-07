/* ========================================================================
   OS GLIFOS — as 144 marcas que vão na face das cartas, desenhadas.

   POR QUE NÃO USAR OS CARACTERES. As famílias pedem runas (ᚠ), símbolos
   alquímicos (🜁), hieróglifos (𓂀), peças de xadrez (♞). Todos existem em
   Unicode e quase nenhum existe nas fontes de um celular comum: no Android
   metade vira retângulo vazio, e num jogo da memória isso não é feiúra, é
   quebra de regra — duas cartas diferentes viram a mesma carta na tela.

   Então cada família tem uma GRAMÁTICA e cada símbolo é uma combinação
   enumerada dela: 18 por família, sem sorteio, sem repetição. `glifo(fam,i)`
   devolve o miolo de um <svg viewBox="0 0 24 24">, e a mesma entrada devolve
   sempre o mesmo desenho — o que a semente do jogo exige.

   As gramáticas não são decoração: cada uma dá uma silhueta diferente à
   distância, que é como o jogador realmente lê o tabuleiro. Runas são retas
   e angulosas; Espaço é redondo; Alquimia é triangular; Xadrez é polígono
   cheio; Mitologia é arco; Tecnologia é quadriculado; Dragões é curva com
   ponta; Egito é vertical com travessas.
   ===================================================================== */

const P = (d, o={}) => ({ d, ...o });        // traço
const F = (d, o={}) => ({ d, fill:true, ...o });

/* ---------- RUNAS: um mastro e ramos retos ---------- */
const RAMOS = [
  'M12 3 L19 9',  'M12 3 L5 9',   'M12 12 L19 6',  'M12 12 L5 6',
  'M12 12 L19 18','M12 12 L5 18', 'M12 21 L19 15', 'M12 21 L5 15',
  'M12 7 L18 12 L12 17', 'M12 7 L6 12 L12 17',
  'M12 3 L19 9 L12 15',  'M12 3 L5 9 L12 15',
  'M5 4 L19 20', 'M19 4 L5 20',
];
const RUNA_COMBOS = [
  [0],[1],[0,1],[2],[3],[2,3],[4],[5],[4,5],
  [8],[9],[6],[7],[6,7],[10],[11],[0,5],[1,4],
];
function runas(i){
  const out = [P('M12 3 L12 21')];
  for(const r of RUNA_COMBOS[i % RUNA_COMBOS.length]) out.push(P(RAMOS[r]));
  return out;
}

/* ---------- ESPAÇO: redondo, com órbita e raios ---------- */
function espaco(i){
  const base = i % 3, orb = Math.floor(i/3) % 3, raios = Math.floor(i/9) % 2;
  const out = [];
  if(base===0) out.push(P('M12 5 A7 7 0 1 0 12.01 5'));
  if(base===1) out.push(F('M12 5 A7 7 0 1 0 12.01 5'));
  if(base===2){ out.push(P('M12 5 A7 7 0 1 0 12.01 5'));
                out.push(P('M12 8.5 A3.5 3.5 0 1 0 12.01 8.5')); }
  if(orb>0){
    const a = orb===1 ? 0 : 55;
    out.push(P('M2.5 12 A9.5 4 0 1 0 2.51 12', { rot:a }));
  }
  if(raios) for(const d of ['M12 1.5 L12 4','M12 20 L12 22.5',
                            'M1.5 12 L4 12','M20 12 L22.5 12']) out.push(P(d));
  return out;
}

/* ---------- ALQUIMIA: triângulo, barras e ponto ---------- */
function alquimia(i){
  const baixo = i % 2, barras = Math.floor(i/2) % 3, ponto = Math.floor(i/6) % 3;
  const tri = baixo ? 'M12 21 L3 6 L21 6 Z' : 'M12 3 L21 18 L3 18 Z';
  const out = [P(tri)];
  if(barras>=1) out.push(P(baixo ? 'M6.5 12 L17.5 12' : 'M6.5 12.5 L17.5 12.5'));
  if(barras>=2) out.push(P(baixo ? 'M4.8 9 L19.2 9' : 'M8.6 8 L15.4 8'));
  if(ponto===1) out.push(F('M12 8.6 A1.5 1.5 0 1 0 12.01 8.6'));
  if(ponto===2) out.push(F('M12 15.4 A1.5 1.5 0 1 0 12.01 15.4'));
  return out;
}

/* ---------- XADREZ: polígono regular, cheio, vazio ou meio ---------- */
function poligono(n, r=8.6, giro=-90){
  const pt = [];
  for(let k=0;k<n;k++){
    const a = (giro + k*360/n) * Math.PI/180;
    pt.push((12+r*Math.cos(a)).toFixed(2)+' '+(12+r*Math.sin(a)).toFixed(2));
  }
  return 'M'+pt.join(' L')+' Z';
}
function xadrez(i){
  const lados = 3 + (i % 6), modo = Math.floor(i/6) % 3;
  const d = poligono(lados);
  if(modo===0) return [P(d)];
  if(modo===1) return [F(d)];
  return [P(d), F(poligono(lados, 4.6))];
}

/* ---------- MITOLOGIA: arcos concêntricos ---------- */
function mitologia(i){
  const n = 1 + (i % 3), giro = [0,120,240][Math.floor(i/3) % 3];
  const ponto = Math.floor(i/9) % 2;
  /* a linha de base é 17, não 13: os arcos crescem só para CIMA, e com a
     base no meio da caixa o desenho inteiro ficava encostado no topo da
     carta. Com 17 o conjunto fica centrado na face. */
  const out = [];
  for(let k=0;k<n;k++){
    const r = 4 + k*3.2;
    out.push(P(`M${(12-r).toFixed(2)} 17 A${r} ${r} 0 0 1 ${(12+r).toFixed(2)} 17`,
               { rot:giro }));
  }
  if(ponto) out.push(F('M12 17 A1.7 1.7 0 1 0 12.01 17', { rot:giro }));
  return out;
}

/* ---------- TECNOLOGIA: caixa e uma marca grande dentro ----------
   A primeira versão desenhava um quadriculado 3×3 com dezoito máscaras
   diferentes. No papel eram dezoito; no tamanho de uma carta eram um
   borrão só. Numa gramática de jogo da memória, o que conta é a marca
   GRANDE: caixa (3 formatos) × marca (6 formatos). */
const MARCAS = [
  'M6.4 10.3 h11.2 v3.4 h-11.2 Z',                                    // barra deitada
  'M10.3 6.4 v11.2 h3.4 v-11.2 Z',                                    // barra em pé
  'M10.3 6.4 h3.4 v3.9 h3.9 v3.4 h-3.9 v3.9 h-3.4 v-3.9 h-3.9 v-3.4 h3.9 Z', // cruz
  'M8.4 6.4 h3.4 v8 h4.8 v3.2 h-8.2 Z',                               // ele
  'M6.6 6.6 h10.8 v3.4 h-3.7 v7.4 h-3.4 v-7.4 h-3.7 Z',               // tê
  'M12 8 A4 4 0 1 0 12.01 8',                                         // disco
];
function tecnologia(i){
  const cx = i % 3, mk = Math.floor(i/3) % 6;
  const caixa = cx===0 ? 'M4.5 4.5 h15 v15 h-15 Z'
              : cx===1 ? poligono(8, 10.4, -67.5)
              : poligono(6, 10.6, -90);
  return [P(caixa), F(MARCAS[mk])];
}

/* ---------- DRAGÕES: espinha curva, cabeça e corpo ----------
   Mesma correção da Tecnologia: as garrinhas de 5px que separavam um
   desenho do outro sumiam na carta. Agora o que muda é a CABEÇA, que é a
   parte que se enxerga primeiro. */
function dragoes(i){
  const espelha = i % 2, cabeca = Math.floor(i/2) % 3, corpo = Math.floor(i/6) % 3;
  const out = [P('M5 20.5 C5 11 9.5 4 18 4')];
  if(cabeca===0) out.push(F('M15.4 1.2 L22.4 4 L15.4 6.8 Z'));
  if(cabeca===1){ out.push(P('M17.6 4 L23 1.2')); out.push(P('M17.6 4 L23 6.8')); }
  if(cabeca===2) out.push(F('M19.6 4 A2.8 2.8 0 1 0 19.61 4'));
  if(corpo===1) out.push(P('M8.6 20.5 C8.6 12.6 11.6 7.6 17.6 7.6'));
  if(corpo===2) out.push(P('M9.2 13.4 A3 3 0 1 0 9.21 13.4'));
  return espelha ? out.map(p=>({ ...p, flip:true })) : out;
}

/* ---------- EGITO: haste vertical com travessas ---------- */
function egito(i){
  const topo = i % 3, travessas = Math.floor(i/3) % 3, pe = Math.floor(i/9) % 2;
  const out = [P('M12 7 L12 21')];
  if(topo===0) out.push(P('M12 2.5 A3.2 3.2 0 1 0 12.01 2.5'));
  if(topo===1) out.push(P('M6.5 4 L17.5 4'));
  if(topo===2) out.push(F('M12 1.6 L16.6 7 L7.4 7 Z'));
  if(travessas>=1) out.push(P('M6 11 L18 11'));
  if(travessas>=2) out.push(P('M7.6 15.5 L16.4 15.5'));
  if(pe) out.push(P('M7 21 L17 21'));
  return out;
}

const GRAMATICA = { runas, espaco, alquimia, xadrez, mitologia, tecnologia,
                    dragoes, egito };

/* devolve o miolo de um <svg viewBox="0 0 24 24"> */
export function glifo(fam, i){
  const g = GRAMATICA[fam] || runas;
  return g(Math.abs(i|0)).map(p=>{
    const t = [];
    if(p.rot) t.push(`rotate(${p.rot} 12 12)`);
    if(p.flip) t.push('translate(24 0) scale(-1 1)');
    const tr = t.length ? ` transform="${t.join(' ')}"` : '';
    return p.fill
      ? `<path d="${p.d}" fill="currentColor" stroke="none"${tr}/>`
      : `<path d="${p.d}" fill="none"${tr}/>`;
  }).join('');
}

/* ---------- A ARTE PINTADA, FAMÍLIA POR FAMÍLIA ----------
   As folhas chegam uma família de cada vez, e uma família só entra INTEIRA:
   se metade dos símbolos fosse pintada e a outra metade desenhada, o jogador
   passaria a distinguir o par pelo ESTILO em vez de pelo desenho, e a família
   deixaria de ser um conjunto.

   O critério para entrar não é o desenho ser bonito — é os 18 não se
   confundirem entre si (tools/distinguir.py). Espaço voltou com dois sóis
   quase iguais e um alvo quase igual à espiral, então continua desenhada: no
   jogo da memória, dois símbolos parecidos não são feiúra, são um par que não
   fecha e um jogador que acha que o jogo trapaceou. */
export const FAMILIA_PINTADA = new Set(['runas','alquimia','xadrez']);

/* svg pronto, do tamanho que a tela pedir — ou a peça pintada, se houver */
export function svgGlifo(fam, i, cls='gl'){
  const n = ((Math.abs(i|0)) % POR_FAMILIA + POR_FAMILIA) % POR_FAMILIA;
  if(FAMILIA_PINTADA.has(fam))
    return `<img class="${cls} art" src="arte/glifo/${fam}/`
         + String(n).padStart(2,'0') + '.png" alt="" aria-hidden="true">';
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">`
       + glifo(fam, i) + '</svg>';
}

/* quantos desenhos distintos cada gramática produz */
export const POR_FAMILIA = 18;
