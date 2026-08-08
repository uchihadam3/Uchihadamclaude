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
   ponta; Egito é vertical com travessas. As cinco últimas — Animais,
   Piratas, Samurai, Dinossauros e Robôs — seguem outro molde, explicado
   antes delas: seis formas inteiras vezes três leituras.
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


/* ═════════════ AS CINCO ÚLTIMAS: SEIS FORMAS × TRÊS LEITURAS ═════════════

   A primeira versão destas cinco seguiu o molde das antigas — uma silhueta
   fixa e três eixinhos de detalhe (orelha, focinho, rabo). No papel dava
   dezoito; na carta dava UMA. Todos os Animais eram a mesma cabeça redonda,
   todos os Robôs a mesma caixa, e a diferença entre a 00 e a 06 cabia num
   quadrado de três pixels.

   Isso não foi opinião: `test/glifos.mjs` nasceu deste erro. Ele rasteriza
   cada desenho no navegador e mede a distância entre as manchas, que é a
   mesma régua que o `tools/distinguir.py` aplica à arte pintada. As cinco
   marcavam 3, 8, 8, 14 e 15 — a família Espaço, a mais apertada das que já
   estavam no jogo, marca 22,5.

   O molde novo troca detalhe por FORMA. São seis silhuetas de verdade
   diferentes (a raposa é um triângulo, o coelho é alto, o touro é largo, o
   pássaro é assimétrico) e três leituras da mesma forma: contorno, massa
   cheia e forma menor dentro de um selo redondo. Contorno e massa mudam a
   mancha inteira; o selo põe tinta na borda, longe do miolo. É o mesmo
   truque do Xadrez, que sempre foi a família mais fácil de ler de longe. */
const ANEL = 'M1.6 12 a10.4 10.4 0 1 0 20.8 0 a10.4 10.4 0 1 0 -20.8 0';
/* uma forma escrita como ['d', vazado] desenha VAZADO quando é preenchida: o
   olho da caveira e a pupila da lente moram dentro do mesmo caminho da
   silhueta, então de contorno saem como círculos e de massa saem como furos.
   Sem isso a caveira cheia vira um ovo, que é o que ela era. */
const corpo = (f, modo) => {
  const d = Array.isArray(f) ? f[0] : f;
  const o = Array.isArray(f) ? { er:true } : {};
  return modo===1 ? F(d, o) : P(d, modo===2 ? { ...o, esc:0.72 } : o);
};
const leituras = (formas, modo) => {
  const out = formas.map(f => corpo(f, modo));
  if(modo===2) out.push(P(ANEL));
  return out;
};
/* o índice vira (forma, leitura) e nada mais: seis vezes três é dezoito na
   conta exata, sem sobra e sem par repetido */
const seisPorTres = tabela => i =>
  leituras(tabela[i % 6], Math.floor(i/6) % 3);

/* ---------- ANIMAIS: seis cabeças, seis silhuetas ---------- */
const ANIMAIS = [
  /* gato: círculo com duas pontas */
  ['M7 12.6 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0',
   'M7.4 5.2 L10.8 8.6 L6.4 10.2 Z', 'M16.6 5.2 L13.2 8.6 L17.6 10.2 Z'],
  /* coelho: alto, e a altura é a marca dele */
  ['M7.8 14.2 a4.2 4.8 0 1 0 8.4 0 a4.2 4.8 0 1 0 -8.4 0',
   'M9.8 10.4 L8.2 2.8 L11 2.6 L11.6 10 Z',
   'M14.2 10.4 L15.8 2.8 L13 2.6 L12.4 10 Z'],
  /* urso: redondo e cheio, orelhas redondas */
  ['M6.2 13.4 a5.8 5.8 0 1 0 11.6 0 a5.8 5.8 0 1 0 -11.6 0',
   'M6 6.6 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0',
   'M13.2 6.6 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0'],
  /* raposa: triângulo de queixo pontudo */
  ['M5.4 8.4 L12 21 L18.6 8.4 Z',
   'M5.4 8.4 L4.4 2.6 L9.6 5.6 Z', 'M18.6 8.4 L19.6 2.6 L14.4 5.6 Z'],
  /* touro: largo, e a largura é a marca dele */
  ['M5.6 14.6 a6.4 4.8 0 1 0 12.8 0 a6.4 4.8 0 1 0 -12.8 0',
   'M6.6 10.6 C3.2 9.6 2.2 6.2 3.4 3.8 C5 6.4 6.6 7.6 8.4 8.4 Z',
   'M17.4 10.6 C20.8 9.6 21.8 6.2 20.6 3.8 C19 6.4 17.4 7.6 15.6 8.4 Z'],
  /* pássaro: o único assimétrico do conjunto */
  ['M8.8 12.8 a4.6 4.6 0 1 0 9.2 0 a4.6 4.6 0 1 0 -9.2 0',
   'M9.4 11 L2.6 12.8 L9.4 14.8 Z', 'M14.8 8.4 L17.6 4 L18.8 9 Z'],
];
const animais = seisPorTres(ANIMAIS);

/* ---------- PIRATAS: seis objetos do convés ---------- */
const PIRATAS = [
  /* âncora */
  ['M10.8 6.4 h2.4 v2.4 h3.2 v2.1 h-3.2 v6.7 c1.7-.3 3-1.6 3.2-3.3 h2.2'
   + ' c-.2 3.3-2.9 5.7-5.6 5.9 h-2.4 c-2.7-.2-5.4-2.6-5.6-5.9 h2.2'
   + ' c.2 1.7 1.5 3 3.2 3.3 v-6.7 h-3.2 v-2.1 h3.2 Z',
   'M9.8 4.4 a2.2 2.2 0 1 0 4.4 0 a2.2 2.2 0 1 0 -4.4 0'],
  /* caveira: os olhos são furos na massa e círculos no contorno */
  [['M12 3.8 c4.4 0 6.8 3 6.8 6.6 c0 2.2-1 3.8-2.2 4.6 v1.4 h-9.2 v-1.4'
    + ' c-1.2-.8-2.2-2.4-2.2-4.6 c0-3.6 2.4-6.6 6.8-6.6 Z'
    + ' M7.6 10 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0'
    + ' M12.4 10 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0', true],
   'M8.2 17.6 h7.6 v2.6 h-7.6 Z'],
  /* leme */
  ['M5.6 12 a6.4 6.4 0 1 0 12.8 0 a6.4 6.4 0 1 0 -12.8 0',
   'M11.1 1.6 h1.8 v3.2 h-1.8 Z', 'M11.1 19.2 h1.8 v3.2 h-1.8 Z',
   'M1.6 11.1 h3.2 v1.8 h-3.2 Z', 'M19.2 11.1 h3.2 v1.8 h-3.2 Z'],
  /* navio */
  ['M3.4 14.6 h17.2 l-2.8 4.8 h-11.6 Z',
   'M12.8 3 L18.8 13 h-6 Z', 'M11.2 5.6 L11.2 13 h-4.8 Z'],
  /* bandeira */
  ['M4.8 2.8 h2 v18.4 h-2 Z',
   'M6.8 4 h11.8 l-2.8 3.6 l2.8 3.6 h-11.8 Z'],
  /* gancho: o outro assimétrico */
  ['M10.8 4.4 h2.6 v7.4 c0 3.6-2.8 5.8-5.8 5.8 c-2.6 0-4.6-1.6-5-4 h2.6'
   + ' c.4 1.2 1.4 1.8 2.4 1.8 c1.8 0 3.2-1.4 3.2-3.6 Z',
   'M9 2.2 h6.2 v2 h-6.2 Z'],
];
const piratas = seisPorTres(PIRATAS);

/* ---------- SAMURAI: seis peças, do corte ao portão ---------- */
const SAMURAI = [
  /* katana */
  ['M4.6 18.6 L16.6 4.4 L18.6 6.2 L6.6 20.4 Z',
   'M13.6 5.6 L16.8 8.6 L14.8 10.8 L11.6 7.8 Z'],
  /* leque */
  ['M12 20.4 L4.2 8.6 A9.4 9.4 0 0 1 19.8 8.6 Z'],
  /* elmo */
  ['M4.4 16.8 c0-5.6 3.6-9.4 7.6-9.4 s7.6 3.8 7.6 9.4 Z',
   'M8 6.4 c1.6-2.6 6.4-2.6 8 0 c-2.2-1.2-5.8-1.2-8 0 Z'],
  /* portão */
  ['M3.2 4.6 h17.6 v2.4 h-17.6 Z', 'M5.2 8.4 h13.6 v2 h-13.6 Z',
   'M6.8 6.8 h2.4 v13.6 h-2.4 Z', 'M14.8 6.8 h2.4 v13.6 h-2.4 Z'],
  /* shuriken */
  ['M12 2.4 L14.8 9.2 L21.6 12 L14.8 14.8 L12 21.6 L9.2 14.8 L2.4 12 L9.2 9.2 Z'],
  /* brasão de cinco pétalas */
  ['M12 3.2 a2.8 2.8 0 1 0 .01 0 Z',
   'M19.4 8.6 a2.8 2.8 0 1 0 .01 0 Z', 'M16.6 17.2 a2.8 2.8 0 1 0 .01 0 Z',
   'M7.4 17.2 a2.8 2.8 0 1 0 .01 0 Z', 'M4.6 8.6 a2.8 2.8 0 1 0 .01 0 Z'],
];
const samurai = seisPorTres(SAMURAI);

/* ---------- DINOSSAUROS: seis bichos grandes ---------- */
const DINOSSAUROS = [
  /* mandíbula aberta */
  ['M3.4 9.6 L19.4 6.6 c1.8 1.4 1.8 4.2 0 5.6 L6.6 12.6 Z',
   'M6.8 14.4 L19.2 13.4 c1.6 1.2 1.4 3.6-.6 4.2 L8.2 19.4 Z'],
  /* dorso serrilhado */
  ['M4.4 15.4 c2.4-1.8 12.8-1.8 15.2 0 c-2.4 3.2-12.8 3.2-15.2 0 Z',
   'M6.6 12.8 L8.6 8.2 L10.6 12.8 Z', 'M10.8 12.6 L13 7.2 L15.2 12.6 Z',
   'M15.4 13 L17.2 9.2 L19 13 Z'],
  /* pescoço longo */
  ['M3.6 17.8 a5.6 3.6 0 1 0 11.2 0 a5.6 3.6 0 1 0 -11.2 0',
   'M12.2 16.6 L15.4 5.4 L18.4 6.2 L15.2 17.4 Z',
   'M14.8 4.4 a2.8 2.8 0 1 0 5.6 0 a2.8 2.8 0 1 0 -5.6 0'],
  /* chifres e babado */
  ['M6.4 8.8 c0-3.2 11.2-3.2 11.2 0 c0 4.6-2.6 7.4-5.6 7.4 s-5.6-2.8-5.6-7.4 Z',
   'M7.2 7.4 L5 2.4 L8.8 5.6 Z', 'M16.8 7.4 L19 2.4 L15.2 5.6 Z'],
  /* ovo rachado: a rachadura é furo na massa e zigue-zague no contorno */
  [['M12 3.4 c3.9 0 6.6 4.6 6.6 8.6 c0 4.3-2.7 7.6-6.6 7.6 s-6.6-3.3-6.6-7.6'
    + ' c0-4 2.7-8.6 6.6-8.6 Z'
    + ' M6 12.4 L8.8 10.8 L11 12.8 L13.4 10.6 L16.2 12.4 L18 11.2 L18 13'
    + ' L16.2 14.4 L13.4 12.4 L11 14.6 L8.8 12.6 L6 14.2 Z', true]],
  /* costelas */
  ['M4.2 10.6 h15.6 v2.6 h-15.6 Z',
   'M6.2 5.6 h1.8 v12.4 h-1.8 Z', 'M11.1 4.6 h1.8 v14.4 h-1.8 Z',
   'M16 5.6 h1.8 v12.4 h-1.8 Z'],
];
const dinossauros = seisPorTres(DINOSSAUROS);

/* ---------- ROBÔS: seis máquinas ---------- */
/* engrenagem: dentes de verdade, e não um círculo com riscos. O contorno
   serrilhado é o que a separa do leme dos Piratas de longe. */
const engrenagem = (dentes=9, alto=10.2, baixo=6.8) => {
  const pt = [];
  for(let k=0;k<dentes*2;k++){
    const a = (k*180/dentes - 90) * Math.PI/180;
    const r = k%2 ? baixo : alto;
    pt.push((12+r*Math.cos(a)).toFixed(2)+' '+(12+r*Math.sin(a)).toFixed(2));
  }
  return 'M'+pt.join(' L')+' Z';
};
const ROBOS = [
  /* cabeça com antena */
  ['M6.2 7.8 h11.6 v10.6 h-11.6 Z', 'M11.2 3.4 h1.6 v4.4 h-1.6 Z',
   'M9.4 1.8 h5.2 v2 h-5.2 Z'],
  /* engrenagem */
  [engrenagem()],
  /* chip de pernas */
  ['M7.2 7.2 h9.6 v9.6 h-9.6 Z',
   'M3.2 8.6 h4 v1.6 h-4 Z', 'M3.2 11.2 h4 v1.6 h-4 Z', 'M3.2 13.8 h4 v1.6 h-4 Z',
   'M16.8 8.6 h4 v1.6 h-4 Z', 'M16.8 11.2 h4 v1.6 h-4 Z', 'M16.8 13.8 h4 v1.6 h-4 Z'],
  /* garra: duas pinças que fecham — a versão anterior, dois espetos retos,
     virava uma seta apontando para baixo quando preenchida */
  ['M10.8 2.8 h2.4 v6 h-2.4 Z', 'M6.4 8.6 h11.2 v2.4 h-11.2 Z',
   'M6.4 11 h2.6 c0 3.2 .9 5.6 2.4 7 l-1.9 1.9 c-2.1-1.9-3.1-5-3.1-8.9 Z',
   'M17.6 11 h-2.6 c0 3.2-.9 5.6-2.4 7 l1.9 1.9 c2.1-1.9 3.1-5 3.1-8.9 Z'],
  /* lente: a pupila é furo, pelo mesmo motivo da caveira */
  [['M2.4 12 c3.2-5.2 16-5.2 19.2 0 c-3.2 5.2-16 5.2-19.2 0 Z'
    + ' M9.4 12 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0', true]],
  /* o boneco inteiro */
  ['M8.6 2.8 h6.8 v4.6 h-6.8 Z', 'M6.4 9 h11.2 v6.8 h-11.2 Z',
   'M8.2 16.6 h2.4 v4.6 h-2.4 Z', 'M13.4 16.6 h2.4 v4.6 h-2.4 Z',
   'M3.2 9.8 h2.6 v4.2 h-2.6 Z', 'M18.2 9.8 h2.6 v4.2 h-2.6 Z'],
];
const robos = seisPorTres(ROBOS);

const GRAMATICA = { runas, espaco, alquimia, xadrez, mitologia, tecnologia,
                    dragoes, egito, animais, piratas, samurai, dinossauros, robos };

/* devolve o miolo de um <svg viewBox="0 0 24 24"> */
export function glifo(fam, i){
  const g = GRAMATICA[fam] || runas;
  return g(Math.abs(i|0)).map(p=>{
    const t = [];
    if(p.rot) t.push(`rotate(${p.rot} 12 12)`);
    if(p.flip) t.push('translate(24 0) scale(-1 1)');
    /* encolher em torno do meio da caixa, para a forma caber dentro do selo */
    if(p.esc) t.push(`translate(12 12) scale(${p.esc}) translate(-12 -12)`);
    const tr = t.length ? ` transform="${t.join(' ')}"` : '';
    const vaz = p.er ? ' fill-rule="evenodd"' : '';
    return p.fill
      ? `<path d="${p.d}" fill="currentColor" stroke="none"${vaz}${tr}/>`
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
export const FAMILIA_PINTADA = new Set(['runas','alquimia','xadrez',
                                        'egito','dragoes','tecnologia','mitologia',
                                        'animais','piratas','samurai']);

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
