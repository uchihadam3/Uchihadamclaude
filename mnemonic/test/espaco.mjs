/* ════════════════════════════════════════════════════════════════════════
   O TAMANHO DA SALA — em segundos, não em opinião.

   "Tem reverb demais, parece uma sala gigantesca" é um diagnóstico certo e
   um número nenhum, e sem número o conserto vira chute: pode ser rabo longo,
   pode ser molhado demais, pode ser o eco. A primeira versão tinha os três.

   Aqui um estalo de UMA amostra entra pela mesma porta que todas as vozes da
   trilha usam, e o que sai do barramento é a resposta ao impulso do espaço
   inteiro — reverb, eco, filtros e compressor juntos. O tempo que ela leva
   para cair 60 dB é o RT60, que é a medida de sala que a acústica usa desde
   sempre.

   PARA COMPARAR:
       sala de estar        0,4 s
       estúdio              0,3–0,6 s
       teatro               ~1,0 s
       sala de concerto     ~1,8 s
       catedral             4–8 s
   A primeira versão do jogo media entre 2,4 e 3,2 s: uma igreja. Num jogo de
   celular isso não é atmosfera, é sopa — o rabo tapa o ataque da nota
   seguinte, e é o ataque que dá o pulso.

       python3 -m http.server 8123      (da raiz do repositório)
       node test/espaco.mjs
   ═══════════════════════════════════════════════════════════════════════ */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

/* o teto. Acima disto o espaço volta a competir com a música em vez de
   acompanhá-la — e 1,2 s já é teatro, que é mais do que um jogo precisa. */
const TETO_RT60 = 1.2;
/* e um piso: espaço nenhum devolve o oscilador ao estado de bipe encostado
   no alto-falante, que era o problema que o reverb veio resolver */
const PISO_RT60 = 0.15;

const BASE = 'http://localhost:8123/mnemonic/tools/';
const MOD  = '/mnemonic/js/ui/musica.js';

let n = 0; const falhas = [];
const ok = (c, m) => { n++; if(!c) falhas.push(m);
  console.log((c?'\x1b[32m ok \x1b[0m':'\x1b[31mFALHA\x1b[0m') + ' ' + m); };

const b = await chromium.launch();
const p = await b.newPage();
await p.goto(BASE, { waitUntil:'domcontentloaded' });

/* ---------- renderiza o estalo e devolve a curva de decaimento ---------- */
const medida = await p.evaluate(async (MOD) => {
  const TAXA = 44100, SEG = 6;
  const off = new OfflineAudioContext(1, TAXA * SEG, TAXA);
  /* o módulo acorda o contexto; num offline `resume()` começa a renderizar na
     hora e o arquivo sai com o silêncio de antes da primeira amostra */
  const disfarce = new Proxy(off, {
    get(alvo, k){
      if(k === 'state') return 'running';
      if(k === 'resume') return () => Promise.resolve();
      const v = alvo[k];
      return typeof v === 'function' ? v.bind(alvo) : v;
    },
  });
  const antes = window.AudioContext;
  window.AudioContext = function(){ return disfarce; };
  const M = await import(MOD);
  M.querMusica(true);
  const t0 = M.estalo();
  window.AudioContext = antes;
  const buf = await off.startRendering();
  const x = buf.getChannelData(0);

  /* envelope em janelas de 10 ms, a partir do estalo */
  const i0 = Math.floor(t0 * TAXA);
  const j = Math.floor(TAXA * 0.01);
  const env = [];
  for(let i = i0; i + j < x.length; i += j){
    let s = 0;
    for(let k = 0; k < j; k++) s += x[i+k] * x[i+k];
    env.push(Math.sqrt(s / j));
  }
  let pico = 0;
  for(let i = 0; i < x.length; i++) if(Math.abs(x[i]) > pico) pico = Math.abs(x[i]);
  return { env, dt: j / TAXA, pico };
}, MOD);

await b.close();

/* SCHROEDER, e não "a primeira janela abaixo de −60".
   Um espaço com eco não decai liso: ele bate, cai, bate de novo. Procurar a
   primeira janela silenciosa devolve o instante da última repetição, que é
   uma coisa, mas não é o tamanho da sala — e sobe e desce conforme o
   compasso, o que faz o número tremer sem nada ter mudado.

   A integração para trás resolve isso desde 1965: a curva é quanta ENERGIA
   ainda falta soar a partir de cada instante. Ela é monótona por construção,
   engole os ecos e é o método que se usa em acústica de verdade. */
const { env, dt } = medida;
const energia = env.map(v => v * v);
const edc = new Array(energia.length);
let acc = 0;
for(let i = energia.length - 1; i >= 0; i--){ acc += energia[i]; edc[i] = acc; }
const dB = i => edc[i] <= 1e-12 ? -180 : 10 * Math.log10(edc[i] / edc[0]);

const quando = alvo => {
  for(let i = 0; i < edc.length; i++) if(dB(i) <= alvo) return i * dt;
  return null;
};
const rt60 = quando(-60);
/* RT20 extrapolado: como o ruído de fundo come os últimos 40 dB em medição
   de sala real, mede-se os primeiros 20 e multiplica por 3. Serve aqui de
   conferência do número de cima — se os dois discordarem muito, o decaimento
   não é exponencial e o número de cima não quer dizer nada. */
const t20 = quando(-20);
const rt20 = t20 === null ? null : t20 * 3;

console.log('\n── resposta ao impulso do espaço da trilha (Schroeder)\n');
for(const marca of [-6, -12, -20, -30, -40, -60]){
  const t = quando(marca);
  console.log(`  ${String(marca).padStart(3)} dB  em ${
    t === null ? '  nunca' : t.toFixed(2)+' s'}`);
}
console.log(`\n  RT60 = ${rt60 === null ? '> 6 s' : rt60.toFixed(2)+' s'}`
          + `   (RT20×3 = ${rt20 === null ? '?' : rt20.toFixed(2)+' s'})\n`);

ok(rt60 !== null, 'o espaço acaba — o estalo some dentro da gravação');
ok(rt60 !== null && rt60 <= TETO_RT60,
   `a sala é uma sala, não uma catedral (${rt60?.toFixed(2)} s ≤ ${TETO_RT60} s)`);
ok(rt60 !== null && rt60 >= PISO_RT60,
   `mas ainda é uma sala, e não um alto-falante seco (${rt60?.toFixed(2)} s ≥ ${PISO_RT60} s)`);
/* o pré-atraso: sem ele o reverb nasce colado no ataque e embola a nota.
   Na curva ele aparece como o pico NÃO estar na primeira janela. */
ok(medida.pico > 0.001, `o estalo realmente saiu do barramento (pico ${medida.pico.toFixed(3)})`);

/* ════════════════════════════════════════════════════════════════════════
   2. O EFEITO ATRAVESSA A MÚSICA — sem que a música saia do lugar.

   O jeito antigo de fazer o acerto aparecer era abaixar a trilha 71% durante
   a jogada. Como virar duas cartas é o que se faz o tempo todo, a música
   mergulhava a cada poucos segundos e soava quebrada. Agora os efeitos têm
   barramento próprio com limitador, acima da trilha.

   Isso troca um problema por outro possível: ganho de 2,6 em cima de música
   já comprimida pode ceifar, e som ceifado é pior do que som baixo. Aqui os
   dois tocam juntos num render offline e se cobram as duas coisas ao mesmo
   tempo — o efeito TEM de aparecer acima da música, e o resultado NÃO pode
   encostar no teto.
   ═══════════════════════════════════════════════════════════════════════ */
const b2 = await chromium.launch();

/* PÁGINA NOVA PARA CADA RENDER, e não é zelo: `sfx.js` guarda UM contexto de
   áudio para o arquivo inteiro, e `musica.js` pede o contexto a ele. Renderizar
   duas vezes na mesma página faz a segunda música ir para o contexto da
   primeira — já renderizado — e o arquivo sai mudo. Foi exatamente o que
   aconteceu aqui: o baseline saiu com pico 0,000 e a conta deu +Infinity dB,
   que é uma verificação passando por estar quebrada. */
async function render({ efeitos }){
  const p = await b2.newPage();
  await p.goto(BASE, { waitUntil:'domcontentloaded' });
  const r = await p.evaluate(async ({ MOD, efeitos }) => {
    const TAXA = 44100, SEG = 8;
    const off = new OfflineAudioContext(1, TAXA * SEG, TAXA);
    const disfarce = new Proxy(off, { get(a, k){
      if(k === 'state') return 'running';
      if(k === 'resume') return () => Promise.resolve();
      const v = a[k]; return typeof v === 'function' ? v.bind(a) : v; } });
    const antes = window.AudioContext;
    window.AudioContext = function(){ return disfarce; };
    const M = await import(MOD);
    const S = await import('/mnemonic/js/ui/sfx.js');
    M.querMusica(true);
    M.trilha('mundo5');            // a faixa mais cheia das treze
    M.girarAte(SEG);
    window.AudioContext = antes;
    /* os efeitos são agendados em `currentTime + atraso`, e num contexto
       offline `currentTime` fica em zero até o render — então todos caem no
       começo. Serve: o que se mede é o pico de música e efeito somados, e
       amontoá-los é o pior caso, não o caso médio. */
    if(efeitos){
      S.SFX.acerto(9); S.SFX.vitoria(); S.SFX.entradaChefe(); S.SFX.golpe('caos');
    }
    const x = (await off.startRendering()).getChannelData(0);
    let pico = 0, colados = 0;
    for(let i = 0; i < x.length; i++){
      const v = Math.abs(x[i]);
      if(v > pico) pico = v;
      if(v > 0.995) colados++;
    }
    return { pico, ceifa: colados / x.length * 100 };
  }, { MOD, efeitos });
  await p.close();
  return r;
}

const soMusicaR = await render({ efeitos:false });
const junto = await render({ efeitos:true });
const soMusica = soMusicaR.pico;
await b2.close();

const ganho = 20 * Math.log10(junto.pico / soMusica);
console.log(`\n── música e efeito no mesmo instante\n`);
console.log(`  só a música   pico ${soMusica.toFixed(3)}`);
console.log(`  com o efeito  pico ${junto.pico.toFixed(3)}  (+${ganho.toFixed(1)} dB)`);
console.log(`  ceifa         ${junto.ceifa.toFixed(3)}%\n`);

ok(ganho > 2.5,
   `o efeito aparece ACIMA da música em vez de sumir nela (+${ganho.toFixed(1)} dB)`);
ok(junto.ceifa === 0, `e nada encosta no teto (${junto.ceifa.toFixed(3)}% ceifado)`);
ok(junto.pico <= 1.0, `o pico somado cabe (${junto.pico.toFixed(3)})`);

console.log('─'.repeat(56));
if(falhas.length){
  console.log(`\x1b[31m✗ ${falhas.length} de ${n} verificações de espaço falharam\x1b[0m`);
  for(const f of falhas) console.log('  · ' + f);
  process.exit(1);
}
console.log(`\x1b[32m✓ ${n} verificações de espaço passaram\x1b[0m`);
