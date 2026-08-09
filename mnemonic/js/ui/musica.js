/* ========================================================================
   A TRILHA — treze músicas de verdade, tocadas nota por nota.

   O jogo não tem um MB de áudio e não vai ter: o link é único, abre no
   celular de quem estiver com a internet ruim, e um jogo da memória que
   demora dez segundos para carregar já perdeu. Então a música é TOCADA pelo
   mesmo WebAudio que faz os efeitos.

   ═══ O QUE ESTAVA ERRADO NA PRIMEIRA VERSÃO ════════════════════════════
   Ela tinha quatro compassos de melodia e mais nada. Quatro compassos é um
   TOQUE DE CELULAR: dá para reconhecer, e depois de trinta segundos vira
   tortura, porque o ouvido já sabe tudo o que vai acontecer. E os seis
   chefes dividiam uma música só, a do mundo levada para a menor harmônica —
   o que é um truque legítimo de variação e é uma preguiça como tema de
   chefe.

   ═══ O QUE UMA MÚSICA PRECISA TER ══════════════════════════════════════
   FORMA. Cada faixa tem introdução, tema A, variação de A, tema B, uma ponte
   em que quase tudo cala, e a volta do A por cima. São de 40 a 56 compassos:
   entre noventa segundos e dois minutos antes de a primeira nota voltar.
   `test/musica.mjs` mede isso e reprova faixa curta.

   CAMADAS. Baixo, pad, melodia, contracanto, arpejo e percussão, e cada
   seção liga e desliga camadas. Música que toca tudo do começo ao fim não
   tem para onde crescer, e é o crescimento que segura dois minutos.

   ESPAÇO. Reverb (uma resposta ao impulso gerada na hora, ruído decaindo) e
   um eco no lead. Sem isso, oscilador é bipe; com isso, é instrumento numa
   sala. São os dois nós mais baratos e os que mais mudam o resultado.

   INSTRUMENTOS DE VERDADE. Baixo com sub e ataque; pad de três osciladores
   desafinados entre si; sino por FM (duas senoides em razão não inteira);
   pluck de decaimento rápido; bumbo com queda de altura; caixa de ruído com
   corpo; chimbal curto. Cada um é uma função, não um `type:'square'`.

   O LOOP FECHA. A última seção termina na tônica e o agendador não tem
   emenda: `passo` anda para sempre e a posição é `passo % total`. Não há
   silêncio, corte nem clique na volta — o rabo de reverb da última nota já
   está tocando quando a primeira volta.

   ═══ E CONTINUA SENDO A MESMA MÚSICA SEMPRE ════════════════════════════
   A aleatoriedade é toda gasta uma vez, na carga: os temas saem de uma
   semente fixa por faixa. A música do mundo 3 é a mesma no meu celular e no
   seu, hoje e no ano que vem — que é a diferença entre uma trilha e um
   gerador de sons.
   ===================================================================== */
import { contexto, estaMudo } from './sfx.js';
import { makeRNG } from '../rng.js';

/* ---------- teoria, o mínimo dela ---------- */
const A4 = 440, MIDI_A4 = 69;
const hz = m => A4 * Math.pow(2, (m - MIDI_A4) / 12);
export const MODOS = {
  maior:    [0,2,4,5,7,9,11],
  lidio:    [0,2,4,6,7,9,11],
  mixo:     [0,2,4,5,7,9,10],
  dorico:   [0,2,3,5,7,9,10],
  eolio:    [0,2,3,5,7,8,10],
  frigio:   [0,1,3,5,7,8,10],
  menorHarm:[0,2,3,5,7,8,11],
  locrio:   [0,1,3,5,6,8,10],
};
/* grau da escala com as oitavas passando sozinhas: 7 é a tônica acima */
function grau(raiz, modo, g){
  const e = MODOS[modo];
  const oit = Math.floor(g / e.length);
  const i = ((g % e.length) + e.length) % e.length;
  return raiz + e[i] + 12 * oit;
}

/* ════════════════════ AS FAIXAS ════════════════════
   `acordes` é a harmonia em graus da escala, um por compasso, e o ciclo dela
   é de 8 — quatro acordes repetidos soam como quatro acordes; oito soam como
   uma progressão. `perc` escolhe a levada, que é o que separa um mundo do
   outro antes de a melodia dizer qualquer coisa. */
const FAIXAS = {
  menu: { nome:'menu', raiz:57, modo:'eolio', bpm:76, cor:'calma',
    acordes:[0,5,3,4, 0,5,1,4], perc:'nenhuma', brilho:1600,
    lead:'sino', arp:'pluck', pad:'ar', densidade:0.34, forma:'lenta' },

  /* os seis mundos: o modo, o andamento e a levada mudam juntos */
  mundo0: { nome:'raiz', raiz:57, modo:'maior', bpm:92, cor:'aberta',
    acordes:[0,4,5,3, 0,4,1,4], perc:'marcha', brilho:2400,
    lead:'flauta', arp:'pluck', pad:'ar', densidade:0.5 },
  mundo1: { nome:'lodo', raiz:55, modo:'dorico', bpm:100, cor:'úmida',
    acordes:[0,3,6,4, 0,3,1,4], perc:'balanço', brilho:1700,
    lead:'pluck', arp:'sino', pad:'coro', densidade:0.55 },
  mundo2: { nome:'vidro', raiz:60, modo:'lidio', bpm:108, cor:'fria',
    acordes:[0,4,3,5, 0,6,4,5], perc:'trote', brilho:3000,
    lead:'sino', arp:'pluck', pad:'ar', densidade:0.58 },
  mundo3: { nome:'ferro', raiz:53, modo:'eolio', bpm:114, cor:'dura',
    acordes:[0,6,5,4, 0,6,3,4], perc:'martelo', brilho:1500,
    lead:'serra', arp:'pluck', pad:'coro', densidade:0.62 },
  mundo4: { nome:'cinza', raiz:51, modo:'frigio', bpm:120, cor:'baixa',
    acordes:[0,1,5,4, 0,1,6,5], perc:'galope', brilho:1300,
    lead:'serra', arp:'serra', pad:'coro', densidade:0.66 },
  mundo5: { nome:'nada', raiz:49, modo:'frigio', bpm:128, cor:'sem fundo',
    acordes:[0,1,6,5, 0,4,1,5], perc:'corrida', brilho:1150,
    lead:'serra', arp:'serra', pad:'coro', densidade:0.7 },

  /* OS SEIS CHEFES, um tema para cada. Não é o mundo com outra escala: é
     outra tonalidade, outro andamento, outra levada e outro instrumento à
     frente. Um chefe que soa como o corredor de onde você veio não anuncia
     nada — e a trilha do chefe é o primeiro aviso que o jogador recebe. */
  chefe0: { nome:'O Ilusionista', raiz:56, modo:'lidio', bpm:104, cor:'torta',
    acordes:[0,3,6,2, 0,3,5,6], perc:'valsa', brilho:2600,
    lead:'sino', arp:'sino', pad:'ar', densidade:0.6, chefe:true },
  chefe1: { nome:'O Hipnotizador', raiz:54, modo:'dorico', bpm:96, cor:'pesada',
    acordes:[0,0,3,3, 0,0,4,4], perc:'pulso', brilho:1500,
    lead:'pluck', arp:'pluck', pad:'coro', densidade:0.5, chefe:true },
  chefe2: { nome:'O Tempo', raiz:58, modo:'menorHarm', bpm:132, cor:'apressada',
    acordes:[0,4,0,4, 5,4,0,4], perc:'relogio', brilho:2200,
    lead:'sino', arp:'pluck', pad:'ar', densidade:0.72, chefe:true },
  chefe3: { nome:'O Caos', raiz:50, modo:'locrio', bpm:138, cor:'quebrada',
    acordes:[0,6,1,5, 0,3,6,1], perc:'quebrada', brilho:1400,
    lead:'serra', arp:'serra', pad:'coro', densidade:0.78, chefe:true },
  chefe4: { nome:'O Espelho', raiz:59, modo:'menorHarm', bpm:112, cor:'dupla',
    acordes:[0,4,5,1, 0,4,3,4], perc:'espelhada', brilho:2000,
    lead:'flauta', arp:'sino', pad:'ar', densidade:0.62, chefe:true },
  chefe5: { nome:'O Rei da Memória', raiz:45, modo:'menorHarm', bpm:100, cor:'régia',
    acordes:[0,5,6,4, 0,5,3,4], perc:'imperial', brilho:1800,
    lead:'serra', arp:'sino', pad:'coro', densidade:0.6, chefe:true },
};

/* ---------- a forma ----------
   Bar a bar, e é isto que dá noventa segundos de música: seis seções, cada
   uma com um conjunto de camadas diferente. `tema` diz qual das três
   melodias está tocando; `ganho` é a dinâmica da seção. */
const FORMA = [
  { nome:'intro',  bar:4, tema:null, cam:{ pad:1, arp:1 },                       ganho:0.55 },
  { nome:'A',      bar:8, tema:'A',  cam:{ pad:1, baixo:1, lead:1, perc:1 },     ganho:0.9 },
  { nome:'A2',     bar:8, tema:'A',  cam:{ pad:1, baixo:1, lead:1, arp:1, perc:1, contra:1 }, ganho:1 },
  { nome:'B',      bar:8, tema:'B',  cam:{ pad:1, baixo:1, lead:1, arp:1, perc:1 }, ganho:0.95 },
  { nome:'ponte',  bar:4, tema:'C',  cam:{ pad:1, lead:1 },                      ganho:0.6 },
  { nome:'A3',     bar:8, tema:'A',  cam:{ pad:1, baixo:1, lead:1, arp:1, perc:1, contra:1 }, ganho:1 },
  { nome:'saída',  bar:4, tema:'C',  cam:{ pad:1, baixo:1, arp:1 },              ganho:0.7 },
];
/* a forma lenta do menu respira mais e não tem percussão nenhuma */
const FORMA_LENTA = [
  { nome:'intro', bar:4, tema:null, cam:{ pad:1 },                  ganho:0.5 },
  { nome:'A',     bar:8, tema:'A',  cam:{ pad:1, lead:1, arp:1 },   ganho:0.85 },
  { nome:'B',     bar:8, tema:'B',  cam:{ pad:1, lead:1, baixo:1 }, ganho:0.95 },
  { nome:'A2',    bar:8, tema:'A',  cam:{ pad:1, lead:1, arp:1, baixo:1 }, ganho:1 },
  { nome:'saída', bar:4, tema:'C',  cam:{ pad:1, arp:1 },           ganho:0.6 },
];

const PASSOS_POR_BAR = 8;               // colcheias em 4/4

/* quantos compassos esta faixa precisa para passar de 90 segundos. Uma faixa
   a 138 bpm anda quase o dobro de uma a 76: a forma fixa daria 60 segundos
   numa e 110 na outra, então a última seção repete até a conta fechar. */
function arranjo(f){
  const base = f.forma === 'lenta' ? FORMA_LENTA : FORMA;
  const segBar = 60 / f.bpm * 4;
  const fora = base.map(s => ({ ...s }));
  let total = fora.reduce((n, s) => n + s.bar, 0);
  /* repete o miolo (A2/A3 e B) até chegar aos 90 segundos, sem nunca mexer
     na introdução nem na saída — elas são as bordas do laço */
  const repetiveis = fora.filter(s => /^(A2|A3|B)$/.test(s.nome));
  let i = 0;
  while(total * segBar < 92 && repetiveis.length){
    const s = repetiveis[i++ % repetiveis.length];
    s.bar += 4; total += 4;
  }
  return { secoes: fora, bars: total, segundos: total * segBar };
}

/* ---------- OS TEMAS ----------
   Três melodias por faixa — A, B e a ponte C — de 32 passos cada. Elas saem
   de uma semente fixa e viram tabela: a mesma faixa toca sempre a mesma
   coisa. A melodia anda por graus VIZINHOS na maior parte do tempo, salta na
   cabeça do compasso e volta para casa no fim da frase; saltar ao acaso é o
   que faz melodia gerada soar como discagem de telefone. */
function comporLinha(rng, f, { alcance=[-3,9], salto=0.26, casa=true }={}){
  const notas = [];
  let g = 0;
  for(let i = 0; i < 32; i++){
    const forte = i % 8 === 0;
    const meio  = i % 4 === 0;
    /* a densidade decide quanto a linha respira, e a respiração é o que
       separa uma frase de um rolo de notas */
    if(!forte && !rng.chance(meio ? f.densidade + 0.2 : f.densidade)){
      notas.push(null); continue;
    }
    const passo = forte && rng.chance(salto) ? rng.pick([-4,-3,3,4,5])
                : rng.chance(0.26) ? rng.pick([-2,2])
                : rng.pick([-1,-1,1,1,0]);
    g = Math.max(alcance[0], Math.min(alcance[1], g + passo));
    notas.push(g);
  }
  notas[0] = 0;
  if(casa) notas[24] = rng.pick([0, 2, 4]);   // a frase volta para o acorde
  return notas;
}
function comporFaixa(f, id){
  const r = makeRNG('mnemonic|faixa|' + id);
  return {
    A: comporLinha(r, f),
    B: comporLinha(r, f, { alcance:[-1, 11], salto:0.34 }),
    C: comporLinha(r, { ...f, densidade: f.densidade * 0.6 },
                   { alcance:[-5, 5], salto:0.14 }),
    /* o contracanto anda ao contrário do tema: quando a melodia sobe, ele
       desce. É o truque mais velho que existe e o que faz duas linhas
       soarem como duas vozes em vez de duas melodias empilhadas. */
    D: comporLinha(r, { ...f, densidade: f.densidade * 0.5 },
                   { alcance:[-7, 2], salto:0.1 }),
  };
}
const TEMAS = new Map();
export const tema = f => {
  const id = f.id || f.nome;
  if(!TEMAS.has(id)) TEMAS.set(id, comporFaixa(f, id));
  return TEMAS.get(id);
};

/* ════════════════════ O SOM ════════════════════ */
let bus = null, filtro = null, reverb = null, eco = null, secoNo = null;
let quer = true, atual = null, clima = null, plano = null;
let relogio = null, proximo = 0, passo = 0, agendadas = 0;

/* O NÍVEL DA TRILHA, MEDIDO E NÃO CHUTADO — e CONSTANTE.
   ────────────────────────────────────────────────────────────────────────
   A primeira versão saía a −40 dBFS: no celular, na rua, era silêncio. Este
   número é o que `tools/gravar-musica.mjs` renderiza e `tools/medir-som.py`
   confere; quem segura o pico é o compressor logo depois, porque nos trechos
   cheios somam entre seis e nove vozes.

   E ELE NÃO SE MEXE ENQUANTO A MÚSICA TOCA. Existia um `abaixar()` que
   derrubava o barramento de 0,85 para 0,24 — 71% a menos — durante a
   resolução de cada par, para "deixar o som do acerto aparecer". A intenção
   era boa e o resultado, não: virar duas cartas é o que se faz o tempo todo
   neste jogo, então a trilha mergulhava e voltava a cada poucos segundos.
   Uma música que muda de volume sozinha o tempo inteiro soa quebrada, e o
   ouvido culpa a música, não o efeito.

   O conserto certo não é abaixar a música — é fazer o efeito ser alto o
   bastante sozinho. Isso é problema do `sfx.js`, e é lá que foi resolvido:
   os efeitos ganharam barramento próprio com limitador, acima da trilha.
   Aqui só existem duas alturas: tocando e calada. */
const NIVEL = 0.78;

/* REVERB SEM ARQUIVO: ruído que decai é uma sala.
   ────────────────────────────────────────────────────────────────────────
   A PRIMEIRA VERSÃO CONSTRUIU UMA CATEDRAL. Eram 2,2 s de ruído BRANCO
   decaindo, e ruído branco não é sala nenhuma: parede de verdade come agudo
   a cada rebatida, e é por isso que um quarto soa abafado e um banheiro de
   azulejo soa metálico. Sem esse escurecimento o rabo fica chiando no mesmo
   brilho do ataque, e o ouvido lê isso como "estou num lugar enorme e vazio".
   Medido com `tools/medir-som.py`: o rabo levava de 3,4 a 8 SEGUNDOS para
   cair 60 dB. Sala de estar fica em 0,4 s; catedral, de 4 a 8. Estávamos
   literalmente numa catedral, e num jogo de celular isso não é atmosfera,
   é sopa — tapa o ataque das notas, que é justamente o que dá o pulso.

   Três coisas fazem a sala virar SALA:

   1. PRÉ-ATRASO. Uns 14 ms de silêncio antes do rabo. É o tempo que o som
      leva para ir até a parede e voltar, e é o que separa a nota do eco
      dela — sem isso a reverberação nasce colada no ataque e o embola.
   2. AMORTECIMENTO. Um filtro de um polo cujo corte DESCE ao longo do rabo:
      o fim do decaimento é mais escuro que o começo, como em qualquer lugar
      de verdade.
   3. RABO CURTO. 0,85 s. Dá lugar sem dar caverna. */
function salaImpulso(c, seg = 0.85, decaimento = 5.4, preAtraso = 0.014){
  const n = Math.floor(c.sampleRate * seg);
  const p = Math.floor(c.sampleRate * preAtraso);
  const buf = c.createBuffer(2, n + p, c.sampleRate);
  for(let ch = 0; ch < 2; ch++){
    const d = buf.getChannelData(ch);
    /* um polo, coeficiente andando de 0,35 (claro) a 0,88 (abafado): é o
       agudo sendo comido rebatida a rebatida */
    let z = 0;
    for(let i = 0; i < n; i++){
      const t = i / n;
      const a = 0.35 + 0.53 * t;
      z = z * a + (Math.random() * 2 - 1) * (1 - a);
      d[p + i] = z * Math.pow(1 - t, decaimento);
    }
  }
  return buf;
}

function montar(){
  const c = contexto(); if(!c) return null;
  if(bus) return c;

  bus = c.createGain(); bus.gain.value = 0;
  const comp = c.createDynamicsCompressor();
  comp.threshold.value = -20; comp.ratio.value = 4; comp.attack.value = 0.005;
  comp.release.value = 0.18;
  bus.connect(comp).connect(c.destination);

  /* o seco e o molhado entram no mesmo barramento: o reverb some por trás e
     não engole o ataque, que é o que dá o pulso da música.

     O RETORNO DO REVERB TEM DE SER FILTRADO, e antes não era. Mandar a
     mistura inteira para o convolutor e trazer de volta em faixa cheia faz
     duas coisas ruins ao mesmo tempo: o grave reverberado empasta com o
     baixo seco (dois graves no mesmo lugar viram lama) e o agudo
     reverberado vira chiado permanente em cima de tudo. Passa-alta em 260
     limpa o baixo; passa-baixa em 2100 tira o chiado. O que sobra é a parte
     do reverb que se PERCEBE como lugar, sem a parte que só suja.

     E o molhado caiu de 0,30 para 0,11. Trinta por cento de molhado numa
     mistura inteira é ajuste de sala de concerto, não de trilha de jogo. */
  secoNo = c.createGain(); secoNo.gain.value = 1;
  const molhado = c.createGain(); molhado.gain.value = 0.11;
  const rv = c.createConvolver(); rv.buffer = salaImpulso(c);
  const rvGrave = c.createBiquadFilter();
  rvGrave.type = 'highpass'; rvGrave.frequency.value = 260;
  const rvAgudo = c.createBiquadFilter();
  rvAgudo.type = 'lowpass'; rvAgudo.frequency.value = 2100;
  reverb = c.createGain(); reverb.gain.value = 1;
  reverb.connect(rv).connect(rvGrave).connect(rvAgudo).connect(molhado).connect(bus);
  secoNo.connect(bus);

  /* ECO PONTILHADO só para a melodia: dá tamanho sem sujar o baixo. Mas a
     realimentação estava em 0,28 e a saída em 0,32, e eco assim é o SEGUNDO
     rabo — somado ao reverb longo, era ele que fazia o som demorar segundos
     para sumir. Agora a repetição morre em três batidas e vai ESCURECENDO no
     caminho (a passa-baixa dentro do laço), que é como eco se comporta em
     qualquer lugar real e o que impede a repetição de competir com a nota
     nova que está entrando. */
  const atraso = c.createDelay(1.0); atraso.delayTime.value = 0.26;
  const volta = c.createGain(); volta.gain.value = 0.11;
  const escurece = c.createBiquadFilter();
  escurece.type = 'lowpass'; escurece.frequency.value = 1700;
  const ecoSaida = c.createGain(); ecoSaida.gain.value = 0.15;
  atraso.connect(escurece).connect(volta).connect(atraso);
  atraso.connect(ecoSaida).connect(bus);
  eco = atraso;

  /* A MISTURA SECA ESTAVA ABAFADA EM 2400, e som abafado com reverb claro em
     cima é exatamente a receita de "longe, numa sala grande". Invertido: o
     seco fica na frente (3200) e quem é escuro é o rabo. */
  filtro = c.createBiquadFilter(); filtro.type = 'lowpass';
  filtro.frequency.value = 3200; filtro.Q.value = 0.5;
  filtro.connect(secoNo); filtro.connect(reverb);
  return c;
}

/* uma nota, com envelope de verdade. `ataque` de zero estala, e o estalo é o
   que faz som sintetizado soar barato. */
function nota(c, { f, t0, dur, tipo='sine', v=0.1, ataque=0.01, queda=0.12,
                  sustento=0.7, solta=0.18, corte=0, ressonancia=1,
                  desafina=0, vibrato=0, destino=null }){
  const g = c.createGain();
  const fim = t0 + dur;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(v, t0 + ataque);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0001, v * sustento), t0 + ataque + queda);
  g.gain.setTargetAtTime(0.0001, fim, solta / 3);

  let saida = g;
  if(corte){
    const bq = c.createBiquadFilter(); bq.type = 'lowpass';
    bq.Q.value = ressonancia;
    bq.frequency.setValueAtTime(corte, t0);
    bq.frequency.exponentialRampToValueAtTime(Math.max(180, corte * 0.4), fim + solta);
    g.connect(bq); saida = bq;
  }
  const osc = [];
  const fazer = (tp, det, ganho) => {
    const o = c.createOscillator();
    /* O PAPEL DA VOZ, escrito no nó. Um bumbo é um oscilador que cai de 150
       para 44 Hz e um sino de FM tem um modulador a 2,76 vezes a portadora:
       nenhum dos dois é "uma nota da escala", e quem for conferir a harmonia
       de fora não tem como saber disso olhando a frequência. */
    o.__papel = 'nota';
    o.type = tp; o.frequency.setValueAtTime(f, t0);
    if(det) o.detune.setValueAtTime(det, t0);
    const gg = c.createGain(); gg.gain.value = ganho;
    o.connect(gg).connect(g);
    o.start(t0); o.stop(fim + solta + 0.05);
    osc.push(o);
  };
  fazer(tipo, desafina, 1);
  if(desafina) fazer(tipo, -desafina, 0.8);
  if(vibrato){
    const lfo = c.createOscillator(), amp = c.createGain();
    lfo.frequency.value = 5.2; amp.gain.value = vibrato;
    lfo.connect(amp); for(const o of osc) amp.connect(o.detune);
    lfo.start(t0 + 0.12); lfo.stop(fim + solta);
  }
  saida.connect(destino || filtro);
  return saida;
}

/* SINO POR FM: uma senoide modulando outra numa razão não inteira dá
   parcial inarmônico, que é o que o ouvido reconhece como metal. */
function sino(c, { f, t0, dur, v = 0.09 }){
  const port = c.createOscillator(), mod = c.createOscillator();
  const gm = c.createGain(), g = c.createGain();
  port.__papel = 'nota'; mod.__papel = 'fm';
  port.frequency.value = f; mod.frequency.value = f * 2.76;
  gm.gain.setValueAtTime(f * 3.4, t0);
  gm.gain.exponentialRampToValueAtTime(f * 0.05, t0 + dur * 0.7);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(v, t0 + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  mod.connect(gm).connect(port.frequency);
  port.connect(g);
  g.connect(filtro);
  mod.start(t0); port.start(t0);
  mod.stop(t0 + dur + 0.05); port.stop(t0 + dur + 0.05);
  return g;
}

/* ---------- percussão ---------- */
function bumbo(c, t0, v = 0.5){
  const o = c.createOscillator(), g = c.createGain();
  o.__papel = 'perc'; o.type = 'sine';
  o.frequency.setValueAtTime(150, t0);
  o.frequency.exponentialRampToValueAtTime(44, t0 + 0.11);
  g.gain.setValueAtTime(v, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.26);
  o.connect(g).connect(secoNo);
  o.start(t0); o.stop(t0 + 0.3);
}
function chiado(c, t0, { dur=0.06, v=0.1, corte=7000, tipo='highpass', destino=null }={}){
  const n = Math.max(1, Math.floor(c.sampleRate * dur));
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for(let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.6);
  const s = c.createBufferSource(); s.buffer = buf;
  const bq = c.createBiquadFilter(); bq.type = tipo; bq.frequency.value = corte;
  const g = c.createGain(); g.gain.value = v;
  s.connect(bq).connect(g).connect(destino || secoNo);
  s.start(t0);
}
function caixa(c, t0, v = 0.22){
  /* a cópia molhada é TEMPERO: no volume cheio ela vira uma nuvem de chiado
     que não deixa a batida seguinte aparecer, e a levada perde o pulso */
  chiado(c, t0, { dur:0.16, v:v*0.35, corte:1400, tipo:'highpass', destino:reverb });
  chiado(c, t0, { dur:0.12, v:v*0.8, corte:1400, tipo:'highpass' });
  const o = c.createOscillator(), g = c.createGain();
  o.__papel = 'perc'; o.type = 'triangle'; o.frequency.setValueAtTime(190, t0);
  o.frequency.exponentialRampToValueAtTime(120, t0 + 0.09);
  g.gain.setValueAtTime(v * 0.5, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.11);
  o.connect(g).connect(secoNo);
  o.start(t0); o.stop(t0 + 0.14);
}
const chimbal = (c, t0, v=0.055) => chiado(c, t0, { dur:0.035, v, corte:9000 });
/* O PRATO DA VIRADA ERA 100% MOLHADO — nove décimos de segundo de ruído indo
   SÓ para o reverb, sem uma gota de som seco. É o mesmo que bater o prato na
   sala ao lado: chega só a nuvem, nunca a batida. E como ele marca cada
   entrada de seção, a nuvem chegava bem na hora em que a música muda, que é
   a hora em que ela mais precisa estar clara. Agora bate seco e o reverb
   apenas acompanha. */
const prato = (c, t0, v=0.1) => {
  chiado(c, t0, { dur:0.55, v, corte:5200 });
  chiado(c, t0, { dur:0.9, v:v*0.4, corte:5200, destino:reverb });
};

/* AS LEVADAS. Cada uma é uma função de (passo dentro do compasso) — é o que
   dá identidade à faixa antes de a melodia dizer qualquer coisa, e é por
   isso que o mundo 4 e o Caos não soam parecidos mesmo os dois sendo
   rápidos e menores. */
const LEVADAS = {
  nenhuma: () => {},
  marcha: (c, k, t) => { if(k===0||k===4) bumbo(c,t); if(k===2||k===6) caixa(c,t);
                         if(k%2===1) chimbal(c,t); },
  balanço:(c, k, t) => { if(k===0||k===3||k===6) bumbo(c,t,0.42);
                         if(k===4) caixa(c,t,0.2); if(k%2===1) chimbal(c,t,0.045); },
  trote:  (c, k, t) => { if(k===0||k===4) bumbo(c,t,0.44); if(k===4) caixa(c,t,0.16);
                         chimbal(c,t, k%2 ? 0.03 : 0.06); },
  martelo:(c, k, t) => { if(k===0||k===3||k===4||k===7) bumbo(c,t,0.5);
                         if(k===2||k===6) caixa(c,t,0.26); if(k%2===1) chimbal(c,t,0.05); },
  galope: (c, k, t) => { if(k===0||k===2||k===5) bumbo(c,t,0.46); if(k===4) caixa(c,t,0.24);
                         chimbal(c,t,0.04); },
  corrida:(c, k, t) => { bumbo(c,t, k%2 ? 0.2 : 0.5); if(k===2||k===6) caixa(c,t,0.24);
                         chimbal(c,t,0.05); },
  /* as dos chefes */
  valsa:  (c, k, t) => { if(k===0) bumbo(c,t,0.44); if(k===3||k===6) caixa(c,t,0.14);
                         if(k%3===0) chimbal(c,t,0.05); },
  pulso:  (c, k, t) => { if(k%2===0) bumbo(c,t, k===0?0.56:0.3);
                         if(k===4) caixa(c,t,0.2); },
  relogio:(c, k, t) => { chimbal(c,t, k%2 ? 0.075 : 0.035);
                         if(k===0||k===4) bumbo(c,t,0.44); if(k===6) caixa(c,t,0.2); },
  quebrada:(c,k,t) => { if(k===0||k===3||k===5||k===6) bumbo(c,t,0.5);
                        if(k===2||k===7) caixa(c,t,0.28); if(k%2===1) chimbal(c,t,0.06); },
  espelhada:(c,k,t)=> { if(k===0||k===7) bumbo(c,t,0.48); if(k===2||k===5) caixa(c,t,0.22);
                        chimbal(c,t,0.04); },
  imperial:(c, k, t)=> { if(k===0||k===4) bumbo(c,t,0.58); if(k===4) caixa(c,t,0.3);
                         if(k===0) prato(c,t,0.05); if(k%2===1) chimbal(c,t,0.045); },
};

/* AS VOZES por nome — trocar o instrumento de frente é o que faz duas faixas
   na mesma escala soarem de mundos diferentes. */
const VOZES = {
  flauta: (c, f, t0, dur, v, br) =>
    nota(c, { f, t0, dur, tipo:'triangle', v:v*0.9, ataque:0.05, queda:0.1,
              sustento:0.85, solta:0.3, corte:br*1.3, vibrato:7 }),
  pluck: (c, f, t0, dur, v, br) =>
    nota(c, { f, t0, dur:Math.min(dur,0.3), tipo:'triangle', v, ataque:0.004,
              queda:0.16, sustento:0.12, solta:0.12, corte:br*1.6, ressonancia:3 }),
  serra: (c, f, t0, dur, v, br) =>
    nota(c, { f, t0, dur, tipo:'sawtooth', v:v*0.75, ataque:0.012, queda:0.1,
              sustento:0.6, solta:0.16, corte:br, ressonancia:5, desafina:7 }),
  sino: (c, f, t0, dur, v) => sino(c, { f, t0, dur:Math.max(dur, 0.55), v:v*0.95 }),
};
const PADS = {
  ar:   (c, f, t0, dur, v, br) =>
    nota(c, { f, t0, dur, tipo:'triangle', v, ataque:0.5, queda:0.4, sustento:0.9,
              solta:0.9, corte:br, desafina:9 }),
  coro: (c, f, t0, dur, v, br) =>
    nota(c, { f, t0, dur, tipo:'sawtooth', v:v*0.8, ataque:0.7, queda:0.5,
              sustento:0.85, solta:1.2, corte:br*0.8, desafina:14 }),
};

/* ---------- o passo ---------- */
function tocarPasso(c, n, t0){
  const total = plano.bars * PASSOS_POR_BAR;
  const k = ((n % total) + total) % total;
  const bar = Math.floor(k / PASSOS_POR_BAR);
  const b = k % PASSOS_POR_BAR;

  /* em que seção estamos */
  let acc = 0, sec = plano.secoes[0];
  for(const s of plano.secoes){ if(bar < acc + s.bar){ sec = s; break; } acc += s.bar; }
  const cam = sec.cam, dim = sec.ganho;

  const ac = clima.acordes[bar % clima.acordes.length];
  const raiz = clima.raiz;
  const modo = clima.modo;
  const nt = g => hz(grau(raiz, modo, g + ac));
  const passoDur = 60 / clima.bpm / 2;
  const br = clima.brilho;

  /* BAIXO — cabeça, contratempo e uma passagem no fim do compasso */
  if(cam.baixo){
    if(b === 0)
      nota(c, { f:nt(-14), t0, dur:passoDur*1.7, tipo:'sawtooth', v:0.16*dim,
                ataque:0.006, queda:0.09, sustento:0.55, solta:0.12,
                corte:br*0.35, ressonancia:4 });
    else if(b === 4)
      nota(c, { f:nt(-14), t0, dur:passoDur*1.1, tipo:'sawtooth', v:0.11*dim,
                ataque:0.006, queda:0.08, sustento:0.4, solta:0.1, corte:br*0.3 });
    else if(b === 7 && bar % 2 === 1)
      nota(c, { f:nt(-11), t0, dur:passoDur*0.8, tipo:'triangle', v:0.09*dim,
                ataque:0.005, queda:0.06, sustento:0.3, solta:0.08, corte:br*0.4 });
    /* o sub, uma oitava abaixo, só na cabeça: é o que se sente no peito */
    if(b === 0)
      nota(c, { f:nt(-21), t0, dur:passoDur*2.2, tipo:'sine', v:0.13*dim,
                ataque:0.02, queda:0.2, sustento:0.7, solta:0.2 });
  }

  /* PAD — a tríade do compasso, sustentada */
  if(cam.pad && b === 0){
    const voz = PADS[clima.pad] || PADS.ar;
    for(const g of [0, 2, 4, 7])
      voz(c, nt(g), t0, passoDur * PASSOS_POR_BAR * 0.95, 0.026 * dim, br);
  }

  /* MELODIA — a linha da seção, com eco */
  if(cam.lead && sec.tema){
    const linha = tema(clima)[sec.tema];
    const m = linha[k % 32];
    if(m != null){
      const voz = VOZES[clima.lead] || VOZES.pluck;
      const saida = voz(c, nt(m + 7), t0, passoDur * 1.6, 0.085 * dim, br);
      if(saida && eco) saida.connect(eco);
    }
  }

  /* CONTRACANTO — a segunda voz, mais grave e mais rala */
  if(cam.contra){
    const m = tema(clima).D[k % 32];
    if(m != null)
      VOZES.pluck(c, nt(m + 2), t0, passoDur * 1.2, 0.05 * dim, br);
  }

  /* ARPEJO — a figura que preenche entre as notas da melodia */
  if(cam.arp && b % 2 === 1){
    const g = [0, 2, 4, 7, 4, 2][(Math.floor(k / 2)) % 6];
    const voz = VOZES[clima.arp] || VOZES.pluck;
    voz(c, nt(g + 7), t0, passoDur * 0.9, 0.035 * dim, br);
  }

  /* PERCUSSÃO */
  if(cam.perc) (LEVADAS[clima.perc] || LEVADAS.marcha)(c, b, t0);

  /* o prato que anuncia cada seção nova */
  if(b === 0 && bar === acc && sec.nome !== 'intro') prato(c, t0, 0.055 * dim);
}

function girar(){
  const c = contexto(); if(!c || !clima) return;
  const dur = 60 / clima.bpm / 2;
  while(proximo < c.currentTime + 0.18){
    if(proximo < c.currentTime) proximo = c.currentTime + 0.02;
    tocarPasso(c, passo, proximo);
    passo++; proximo += dur; agendadas++;
  }
}

/* MEDIR O TAMANHO DA SALA — um estalo, e cronometrar o que volta.
   ────────────────────────────────────────────────────────────────────────
   "Tem reverb demais" precisa virar número, senão o conserto é chute. Mas
   medir o rabo dentro da música não funciona: depois da última nota o que
   ainda soa é o pad soltando, o eco e o reverb ao mesmo tempo, e os três se
   confundem — a primeira medição acusou 8 s de sala quando boa parte era o
   pad terminando de tocar, o que é a música e não o espaço.

   Aqui entra UM estalo de uma amostra pela mesma porta que todas as vozes
   usam (`filtro`). O que sai do barramento é, por definição, a resposta ao
   impulso do espaço inteiro — reverb, eco, filtros e compressor juntos.
   Cronometrar quanto ela leva para cair 60 dB é a medida de sala que existe
   em acústica, e agora ela mede a sala e nada mais.

   Não depende de faixa nenhuma: o espaço é o mesmo para as treze, e amarrar
   a medição a uma delas só traria as notas dela junto. */
export function estalo(){
  const c = montar(); if(!c) return null;
  const t0 = c.currentTime + 0.02;
  const buf = c.createBuffer(1, 2, c.sampleRate);
  buf.getChannelData(0)[0] = 1;
  const s = c.createBufferSource(); s.buffer = buf;
  const g = c.createGain(); g.gain.value = 1;
  s.connect(g).connect(filtro);
  if(eco) g.connect(eco);          // o eco também faz parte do espaço
  s.start(t0);
  bus.gain.cancelScheduledValues(0);
  bus.gain.setValueAtTime(NIVEL, 0);
  return t0;
}

/* O AGENDADOR NA MÃO. Ele roda sozinho a cada 40ms, e é assim que o jogo o
   usa; mas quem for medir a faixa inteira não pode esperar dois minutos de
   relógio de verdade. Chamando este daqui com o relógio adiantado na mão, os
   dois minutos saem num piscar — e é o MESMO código, não uma segunda
   implementação que pode discordar da primeira. */
export const girarAgora = () => girar();
/* E PARA GRAVAR: agenda tudo até um instante qualquer, sem esperar o relógio.
   É o que permite renderizar a faixa inteira num contexto offline e ouvir o
   resultado num arquivo — a única forma de julgar música é ouvindo, e ouvir
   dentro do jogo exige jogar até o mundo 5. */
export function girarAte(limite){
  const c = contexto(); if(!c || !clima) return 0;
  const dur = 60 / clima.bpm / 2;
  let n = 0;
  while(proximo < limite){ tocarPasso(c, passo, proximo); passo++; proximo += dur; n++; }
  return n;
}

/* ---------- o que o jogo chama ---------- */
/* `qual` é 'menu', 'mundoN' ou 'chefeN'. Trocar para a mesma coisa não faz
   nada — senão a trilha reiniciaria a cada redesenho de tela, e a música
   nunca passaria do primeiro compasso. */
export function trilha(qual){
  if(qual === atual) return;
  const f = FAIXAS[qual];
  if(!f){ if(!qual) parar(); return; }
  atual = qual;
  const c = montar(); if(!c) return;
  clima = { ...f, id:qual };
  plano = arranjo(clima);
  passo = 0; proximo = c.currentTime + 0.06;
  if(!relogio) relogio = setInterval(girar, 40);
  volume();
}
export function parar(){
  atual = null; clima = null; plano = null;
  if(relogio){ clearInterval(relogio); relogio = null; }
  if(bus){ const c = contexto();
    bus.gain.cancelScheduledValues(c.currentTime);
    bus.gain.setTargetAtTime(0, c.currentTime, 0.2); }
}
export function querMusica(v){
  quer = !!v;
  try { localStorage.setItem('mnemonic.musica', v ? '1' : '0'); } catch(e){}
  volume();
}
export const temMusica = () => quer;
function volume(){
  if(!bus) return;
  const c = contexto(); if(!c) return;
  /* DUAS ALTURAS SÓ: tocando ou calada. Não há meio-termo, e é de propósito
     (veja NIVEL). */
  const alvo = (!quer || estaMudo() || !clima) ? 0 : NIVEL;
  bus.gain.cancelScheduledValues(c.currentTime);
  bus.gain.setTargetAtTime(alvo, c.currentTime, 0.25);
}
export function reavaliar(){ volume(); }

/* o que a tela de diagnóstico e o teste precisam saber */
export const diagnostico = () => ({
  qual: atual, clima: clima?.nome ?? null, chefe: !!clima?.chefe,
  passos: agendadas, compassos: plano?.bars ?? 0,
  segundos: plano ? Math.round(plano.segundos) : 0,
  quer, mudo: estaMudo(), estado: contexto()?.state ?? 'sem contexto',
  volume: bus ? Number(bus.gain.value.toFixed(3)) : 0,
});

/* abertos para o teste: composição e forma dão para provar sem tocar nada */
export const CLIMAS = ['mundo0','mundo1','mundo2','mundo3','mundo4','mundo5']
  .map(id => ({ ...FAIXAS[id], id }));
export const CHEFES = ['chefe0','chefe1','chefe2','chefe3','chefe4','chefe5']
  .map(id => ({ ...FAIXAS[id], id }));
export const TODAS = Object.keys(FAIXAS).map(id => ({ ...FAIXAS[id], id }));
export { grau, arranjo };

try { if(localStorage.getItem('mnemonic.musica') === '0') quer = false; } catch(e){}
