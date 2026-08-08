/* ════════════════════════════════════════════════════════════════════════
   A TRILHA — provada sem tocar uma nota.

   Música gerada é fácil de conferir de ouvido e impossível de conferir de
   ouvido DEPOIS: ninguém escuta treze faixas inteiras a cada mudança para
   saber se uma nota saiu da escala. E nota fora da escala não é gosto — é a
   diferença entre trilha e defeito, e sai uma vez a cada trinta compassos,
   que é exatamente a frequência em que se culpa "impressão minha".

   Aqui o WebAudio é dublado: um contexto de mentira que ANOTA cada nota
   agendada em vez de emitir. O relógio é movido na mão. O que se cobra é o
   que dá para escrever: toda faixa passa de noventa segundos antes de
   repetir, toda nota pertence à escala da faixa, o baixo nunca falta, as
   treze são diferentes entre si, e cada chefe tem a sua.

       node test/musica.mjs
   ═══════════════════════════════════════════════════════════════════════ */

/* ---------- o contexto de mentira ---------- */
const notas = [];      // { f, t } de tudo o que foi agendado
class Param {
  constructor(v){ this.value = v; }
  setValueAtTime(v){ this.value = v; return this; }
  exponentialRampToValueAtTime(){ return this; }
  linearRampToValueAtTime(){ return this; }
  setTargetAtTime(v){ this.value = v; return this; }
  cancelScheduledValues(){ return this; }
}
class No {
  constructor(){ this.gain = new Param(1); this.frequency = new Param(440);
                 this.detune = new Param(0); this.Q = new Param(1);
                 this.delayTime = new Param(0);
                 this.threshold = new Param(0); this.ratio = new Param(1);
                 this.attack = new Param(0); this.release = new Param(0); }
  connect(x){ return x; }
  disconnect(){}
  start(t){ if(this.__osc) notas.push({ f:this.frequency.value, t, papel:this.__papel }); }
  stop(){}
}
class FakeCtx {
  constructor(){ this.currentTime = 0; this.state = 'running'; this.sampleRate = 48000;
                 this.destination = new No(); }
  createOscillator(){ const n = new No(); n.__osc = true; return n; }
  createGain(){ return new No(); }
  createBiquadFilter(){ return new No(); }
  createDynamicsCompressor(){ return new No(); }
  createBufferSource(){ return new No(); }
  createConvolver(){ return new No(); }
  createDelay(){ return new No(); }
  createBuffer(ch, n){ return { getChannelData: () => new Float32Array(n) }; }
  resume(){ this.state = 'running'; }
}
const ctx = new FakeCtx();
globalThis.window = { AudioContext: function(){ return ctx; } };

const M = await import('../js/ui/musica.js');

/* ---------- utilidades ---------- */
const midiDe = f => Math.round(69 + 12 * Math.log2(f / 440));
const espera = ms => new Promise(r => setTimeout(r, ms));
/* o agendador olha 0,18s à frente e roda a cada 40ms de tempo REAL. Para
   medir compassos inteiros sem esperar compassos inteiros, o relógio de
   mentira anda em passos de 0,25s e o teste dorme uma volta do agendador a
   cada um: seis segundos de música custam um segundo de teste. */
async function rodar(segundos){
  /* o relógio anda na mão e o agendador é chamado no mesmo passo: dois
     minutos de música custam alguns milissegundos de teste, e sem pular nada
     — dormir e torcer para o `setInterval` acompanhar produzia buracos que
     eram do teste, não da música. */
  const passo = 0.1;
  for(let t = 0; t < segundos; t += passo){
    ctx.currentTime += passo;
    M.girarAgora();
  }
}
/* só o que é NOTA: percussão e modulador de FM não pertencem a escala nenhuma */
const musicais = () => notas.filter(x => x.papel === 'nota');

let falhas = [], n = 0;
const ok = (c, m) => { n++; if(!c) falhas.push(m); };
const eq = (a, b, m) => { n++; if(a !== b) falhas.push(`${m} — esperava ${b}, veio ${a}`); };
const secao = t => console.log(`\n\x1b[36m── ${t}\x1b[0m`);

/* ════════════════════════════════════════════════════════ 1 */
secao('1. Toda faixa é uma música, e não um toque de celular');
{
  /* O PEDIDO ERA ESTE, e é o que a versão anterior não cumpria: quatro
     compassos de melodia dão trinta segundos de novidade e uma hora de
     tortura. Noventa segundos é o piso do que se reconhece como música. */
  for(const f of M.TODAS){
    const a = M.arranjo(f);
    ok(a.segundos >= 90,
       `${f.id} passa de 90 segundos antes de repetir (${Math.round(a.segundos)}s)`);
    ok(a.segundos <= 165, `${f.id} não passa de dois minutos e meio (${Math.round(a.segundos)}s)`);
    ok(a.secoes.length >= 5, `${f.id} tem forma: ${a.secoes.length} seções`);
    /* a forma tem de CRESCER: se todas as seções tocam as mesmas camadas, a
       música não vai a lugar nenhum, e é o crescimento que segura dois
       minutos */
    const tamanhos = new Set(a.secoes.map(s => Object.keys(s.cam).length));
    ok(tamanhos.size >= 3, `${f.id} liga e desliga camadas entre as seções`);
    ok(a.secoes[0].nome === 'intro', `${f.id} começa por uma introdução`);
    ok(/saída/.test(a.secoes[a.secoes.length-1].nome),
       `${f.id} termina numa saída — é ela que emenda no laço`);
  }
  console.log('   ' + M.TODAS.map(f =>
    `${f.id}:${Math.round(M.arranjo(f).segundos)}s`).join('  '));
}

/* ════════════════════════════════════════════════════════ 2 */
secao('2. Cada faixa tem os temas dela, e são sempre os mesmos');
{
  const vistos = new Map();
  for(const f of M.TODAS){
    const t = M.tema(f);
    for(const [nome, linha] of Object.entries(t)){
      eq(linha.length, 32, `${f.id}/${nome} tem 32 passos`);
      ok(linha.some(x => x != null), `${f.id}/${nome} não é só pausa`);
      ok(new Set(linha.filter(x=>x!=null)).size >= 3,
         `${f.id}/${nome} usa ao menos três alturas`);
    }
    eq(t.A[0], 0, `${f.id} abre o tema na tônica`);
    /* determinismo: pedir de novo devolve o mesmo, senão a música do mundo 3
       é uma no meu celular e outra no seu */
    eq(M.tema(f).A.join(','), t.A.join(','), `${f.id} devolve sempre o mesmo tema`);
    const chave = t.A.join(',');
    ok(!vistos.has(chave), `${f.id} não repete o tema de ${vistos.get(chave)}`);
    vistos.set(chave, f.id);
  }
  /* A e B são frases diferentes — se fossem iguais, a seção B não existiria */
  for(const f of M.TODAS){
    const t = M.tema(f);
    ok(t.A.join(',') !== t.B.join(','), `${f.id} tem A e B diferentes`);
    ok(t.A.join(',') !== t.C.join(','), `${f.id} tem uma ponte própria`);
  }
}

/* ════════════════════════════════════════════════════════ 3 */
secao('3. Nenhuma nota sai da escala da faixa');
{
  for(const f of M.TODAS){
    notas.length = 0;
    M.trilha(f.id);
    await rodar(M.arranjo(f).segundos + 2);
    M.parar();
    const mus = musicais();
    ok(mus.length > 40, `${f.id} agendou notas (${mus.length})`);
    const escala = M.MODOS[f.modo];
    const fora = mus.filter(x => {
      const semi = ((midiDe(x.f) - f.raiz) % 12 + 12) % 12;
      return !escala.includes(semi);
    });
    eq(fora.length, 0, `${f.id} não toca fora do ${f.modo}`
       + (fora.length ? ' — ' + fora.slice(0,3).map(x=>midiDe(x.f)).join(' ') : ''));
    /* o baixo é o relógio da música: sem ele o ouvido perde o compasso */
    const graves = mus.filter(x => midiDe(x.f) <= f.raiz - 10);
    ok(graves.length >= 3, `${f.id} tem baixo (${graves.length} notas graves)`);
    /* e há registro: uma música em que tudo mora na mesma oitava é um bipe */
    const alturas = mus.map(x => midiDe(x.f));
    ok(Math.max(...alturas) - Math.min(...alturas) >= 24,
       `${f.id} usa mais de duas oitavas`);
  }
}

/* ════════════════════════════════════════════════════════ 4 */
secao('4. Cada chefe tem a música dele');
{
  eq(M.CHEFES.length, 6, 'são seis temas de chefe');
  const chaves = M.CHEFES.map(f => [f.raiz, f.modo, f.bpm, f.perc].join('|'));
  eq(new Set(chaves).size, 6, 'nenhum chefe repete a tonalidade, o andamento e a levada de outro');
  eq(new Set(M.CHEFES.map(f=>f.perc)).size, 6, 'e cada um tem a sua levada');
  for(const f of M.CHEFES)
    ok(!M.CLIMAS.some(m => m.raiz === f.raiz && m.modo === f.modo),
       `${f.id} não é a música de um mundo com outro nome`);
  /* e o chefe soa diferente do corredor de onde se veio */
  for(let i = 0; i < 6; i++)
    ok(M.CHEFES[i].bpm !== M.CLIMAS[i].bpm || M.CHEFES[i].modo !== M.CLIMAS[i].modo,
       `o chefe do mundo ${i} não toca igual ao mundo ${i}`);
}

/* ════════════════════════════════════════════════════════ 5 */
secao('5. A forma passa por todas as seções, e o laço fecha');
{
  /* uma faixa inteira, do começo ao fim e um pouco além: o que se cobra é
     que a volta não tenha buraco — a mesma quantidade de notas por segundo
     antes e depois de o laço virar. */
  const f = M.TODAS.find(x => x.id === 'mundo1');
  notas.length = 0;
  M.trilha('mundo1');
  /* o relógio do contexto de mentira é compartilhado e já andou nas seções
     anteriores: o tempo da faixa se conta a partir daqui, não do zero */
  const zero = ctx.currentTime;
  const dur = M.arranjo(f).segundos;
  await rodar(dur + 12);
  const total = musicais().length;
  const rel = x => x.t - zero;
  const antes = notas.filter(x => rel(x) < dur - 6 && rel(x) > dur - 12).length;
  const depois = notas.filter(x => rel(x) > dur + 1 && rel(x) < dur + 7).length;
  M.parar();
  ok(total > 300, `a faixa inteira agendou ${total} notas`);
  ok(depois > 0, 'depois da volta o laço continua tocando');
  ok(Math.abs(antes - depois) < antes, 'e sem buraco na emenda');
}

/* ════════════════════════════════════════════════════════ 6 */
secao('6. Trocar de tela não recomeça a música à toa');
{
  M.trilha('mundo1'); await rodar(2);
  const antes = M.diagnostico().passos;
  M.trilha('mundo1');
  await rodar(1);
  const dep = M.diagnostico();
  eq(dep.clima, 'lodo', 'continua na mesma faixa');
  ok(dep.passos > antes, 'e o compasso seguiu em frente, sem recomeçar');
  ok(dep.segundos >= 90, 'o diagnóstico informa o tamanho da faixa');
  M.parar();
  eq(M.diagnostico().qual, null, 'parar desliga a trilha');
}

/* ════════════════════════════════════════════════════════ 7 */
secao('7. Quem desliga a música fica sem música');
{
  M.querMusica(false);
  M.trilha('mundo2'); await rodar(1);
  eq(M.diagnostico().volume, 0, 'com a música desligada o volume é zero');
  M.querMusica(true);
  await rodar(1);
  ok(M.diagnostico().volume > 0, 'e volta quando se liga de novo');
  M.abaixar(true); await rodar(1);
  const baixo = M.diagnostico().volume;
  M.abaixar(false); await rodar(1);
  const cheio = M.diagnostico().volume;
  ok(baixo > 0 && baixo < cheio,
     `a trilha recua na jogada e volta depois (${baixo} → ${cheio})`);
  M.parar();
}

console.log('\n' + '─'.repeat(56));
if(falhas.length){
  console.log(`\x1b[31m✗ ${falhas.length} de ${n} verificações falharam\x1b[0m\n`);
  for(const f of falhas) console.log('  · ' + f);
  process.exit(1);
}
console.log(`\x1b[32m✓ ${n} verificações de trilha passaram\x1b[0m`);
process.exit(0);
