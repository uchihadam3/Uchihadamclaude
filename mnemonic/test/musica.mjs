/* ════════════════════════════════════════════════════════════════════════
   A TRILHA — provada sem tocar uma nota.

   Música gerada é fácil de conferir de ouvido e impossível de conferir de
   ouvido DEPOIS: ninguém escuta seis mundos inteiros a cada mudança para
   saber se uma nota saiu da escala. E nota fora da escala não é gosto — é a
   diferença entre trilha e defeito, e sai uma vez a cada trinta compassos,
   que é exatamente a frequência em que se culpa "impressão minha".

   Aqui o WebAudio é dublado: um contexto de mentira que ANOTA cada nota
   agendada em vez de emitir. O relógio é movido na mão. O que se cobra é o
   que dá para escrever: toda nota pertence à escala do mundo, o baixo nunca
   falta, cada mundo soa diferente do outro, e o chefe é a mesma tonalidade
   levada para a menor harmônica.

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
                 this.threshold = new Param(0); this.ratio = new Param(1);
                 this.attack = new Param(0); this.release = new Param(0); }
  connect(x){ return x; }
  disconnect(){}
  start(t){ if(this.__osc) notas.push({ f:this.frequency.value, t }); }
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
  createBuffer(ch, n){ return { getChannelData: () => new Float32Array(n) }; }
  resume(){ this.state = 'running'; }
}
const ctx = new FakeCtx();
globalThis.window = { AudioContext: function(){ return ctx; } };

const M = await import('../js/ui/musica.js');

/* ---------- utilidades de teoria ---------- */
const midiDe = f => Math.round(69 + 12 * Math.log2(f / 440));
const espera = ms => new Promise(r => setTimeout(r, ms));
/* anda com o relógio do contexto e deixa o agendador trabalhar */
async function rodar(segundos){
  /* o agendador olha 0,15s à frente e roda a cada 40ms de tempo REAL. Para
     medir compassos inteiros sem esperar compassos inteiros, o relógio de
     mentira anda em passos de 0,25s e o teste dorme uma volta do agendador a
     cada um: seis segundos de música custam um segundo de teste. */
  const passo = 0.25;
  for(let t = 0; t < segundos; t += passo){
    ctx.currentTime += passo;
    await espera(45);
  }
}

let falhas = [], n = 0;
const ok = (c, m) => { n++; if(!c) falhas.push(m); };
const eq = (a, b, m) => { n++; if(a !== b) falhas.push(`${m} — esperava ${b}, veio ${a}`); };
const secao = t => console.log(`\n\x1b[36m── ${t}\x1b[0m`);

/* ════════════════════════════════════════════════════════ 1 */
secao('1. O tema de cada mundo é sempre o mesmo, e é diferente dos outros');
{
  const temas = M.CLIMAS.map(c => M.tema(c));
  for(const t of temas){
    eq(t.length, 32, 'o tema tem 32 passos');
    eq(t[0], 0, 'e começa na tônica');
    ok(t.some(x => x != null), 'e não é feito só de pausas');
    ok(t.some(x => x == null), 'nem só de notas — silêncio é parte da frase');
  }
  eq(new Set(temas.map(t => t.join(','))).size, temas.length,
     'nenhum mundo repete o tema de outro');
  /* determinismo: recompor tem de dar o mesmo, senão a trilha do mundo 3 é
     uma no meu celular e outra no seu, e deixa de ser tema */
  eq(M.tema(M.CLIMAS[3]).join(','), temas[3].join(','),
     'pedir o mesmo tema duas vezes devolve o mesmo');
  /* e a melodia anda: uma linha que só repete a mesma nota é um bipe */
  for(const t of temas){
    const sons = t.filter(x => x != null);
    ok(new Set(sons).size >= 4, 'o tema usa ao menos quatro alturas diferentes');
  }
}

/* ════════════════════════════════════════════════════════ 2 */
secao('2. Nenhuma nota sai da escala do mundo');
{
  for(const clima of M.CLIMAS){
    notas.length = 0;
    M.trilha('mundo' + clima.id);
    await rodar(6);
    M.parar();
    ok(notas.length > 12, `o mundo ${clima.id} agendou notas (${notas.length})`);
    const escala = M.MODOS[clima.modo];
    const fora = notas.filter(x => {
      const semi = ((midiDe(x.f) - clima.raiz) % 12 + 12) % 12;
      return !escala.includes(semi);
    });
    eq(fora.length, 0, `o mundo ${clima.id} não toca nota fora do ${clima.modo}`
       + (fora.length ? ' — ' + fora.slice(0,3).map(x=>midiDe(x.f)).join(' ') : ''));
    /* o baixo é o relógio da música: se ele falta, o ouvido perde o compasso.
       Ele toca a cada quatro passos, então tem de haver uma nota grave para
       cada quatro agendadas, com folga. */
    const graves = notas.filter(x => midiDe(x.f) <= clima.raiz);
    ok(graves.length >= 3, `o mundo ${clima.id} tem baixo (${graves.length} notas graves)`);
  }
}

/* ════════════════════════════════════════════════════════ 3 */
secao('3. O chefe é a mesma tonalidade, torta');
{
  notas.length = 0;
  M.trilha('mundo3'); await rodar(6); M.parar();
  const doMundo = notas.map(x => ((midiDe(x.f) - M.CLIMAS[3].raiz) % 12 + 12) % 12);

  notas.length = 0;
  M.trilha('chefe3'); await rodar(6); M.parar();
  const doChefe = notas.map(x => ((midiDe(x.f) - M.CLIMAS[3].raiz) % 12 + 12) % 12);

  ok(doChefe.length > 12, 'a sala do chefe também toca');
  /* a sétima maior é a assinatura da menor harmônica, e o mundo 3 é eólio:
     ela não pode aparecer lá e tem de aparecer aqui */
  ok(!doMundo.includes(11), 'o mundo 3 (eólio) não tem sétima maior');
  ok(doChefe.includes(11), 'a do chefe tem — é a menor harmônica');
  const fora = doChefe.filter(s => !M.MODOS.menorHarm.includes(s));
  eq(fora.length, 0, 'e o chefe também não sai da própria escala');
}

/* ════════════════════════════════════════════════════════ 4 */
secao('4. Trocar de tela não recomeça a música à toa');
{
  notas.length = 0;
  M.trilha('mundo1'); await rodar(1.5);
  const antes = M.diagnostico().passos;
  M.trilha('mundo1');                       // a mesma coisa de novo
  await rodar(0.5);
  const dep = M.diagnostico();
  eq(dep.clima, 1, 'continua no mesmo mundo');
  ok(dep.passos > antes, 'e o compasso seguiu em frente, sem recomeçar');
  M.parar();
  eq(M.diagnostico().qual, null, 'parar desliga a trilha');
}

/* ════════════════════════════════════════════════════════ 5 */
secao('5. Quem desliga a música fica sem música');
{
  M.querMusica(false);
  M.trilha('mundo2'); await rodar(1);
  eq(M.diagnostico().volume, 0, 'com a música desligada o volume é zero');
  M.querMusica(true);
  await rodar(1);
  ok(M.diagnostico().volume > 0, 'e volta quando se liga de novo');
  /* abaixar não é desligar: durante a jogada a trilha recua, mas continua */
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
