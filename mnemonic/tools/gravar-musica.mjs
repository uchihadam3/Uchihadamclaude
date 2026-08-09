/* ════════════════════════════════════════════════════════════════════════
   GRAVAR A TRILHA — renderiza cada faixa num WAV para dar para OUVIR.

   Música se julga ouvindo, e ouvir dentro do jogo exige jogar até o mundo 5
   e derrubar quatro chefes. Aqui a faixa é renderizada num contexto offline,
   que é o mesmo código de síntese tocando contra um relógio que corre solto:
   dois minutos de música saem em alguns segundos, e o arquivo dá para mandar
   para quem vai aprovar.

       python3 -m http.server 8123        (da raiz do repositório)
       node tools/gravar-musica.mjs [faixa...] [--seg 45]
   ═══════════════════════════════════════════════════════════════════════ */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const num = (bandeira, padrao) => {
  const i = args.indexOf(bandeira);
  return i >= 0 ? Number(args[i+1]) : padrao;
};
const SEG  = num('--seg', 45);
/* RENDERIZAR MAIS COMPRIDO DO QUE A MÚSICA. O rabo do reverb só dá para
   cronometrar depois da última nota; se a gravação acaba junto com ela, o que
   se mede é o corte do arquivo, não a sala. `--cauda 6` agenda música até
   SEG−6 e deixa seis segundos de decaimento puro no fim. */
const CAUDA = num('--cauda', 0);
const TAXA = num('--taxa', 44100);
const MONO = args.includes('--mono');   /* metade do arquivo, e para julgar
                                           a música o estéreo não faz falta */
const consumidos = new Set();
for(const b of ['--seg','--taxa','--cauda']){
  const i = args.indexOf(b);
  if(i >= 0){ consumidos.add(i); consumidos.add(i+1); }
}
const pedidas = args.filter((a,i) => !a.startsWith('--') && !consumidos.has(i));

const b = await chromium.launch();
/* PÁGINA LIMPA, e uma nova para cada faixa. O `jogo.html` acorda o áudio ao
   abrir: o módulo de som guarda UM contexto, e se ele já nasceu ligado ao
   alto-falante não há como redirecioná-lo para o contexto offline. Recarregar
   só o módulo da música não resolve — o `sfx.js` continua sendo o mesmo. */
const VAZIA = 'http://localhost:8123/mnemonic/tools/';
const MOD = '/mnemonic/js/ui/musica.js';
const p0 = await b.newPage();
await p0.goto(VAZIA, { waitUntil:'domcontentloaded' });
const lista = await p0.evaluate(async (MOD)=>{
  const M = await import(MOD);
  return M.TODAS.map(f => f.id);
}, MOD);
await p0.close();
const alvos = pedidas.length ? pedidas : lista;
mkdirSync('/tmp/trilha', { recursive:true });

for(const id of alvos){
  const p = await b.newPage();
  await p.goto(VAZIA, { waitUntil:'domcontentloaded' });
  const b64 = await p.evaluate(async ({ id, SEG, MOD, TAXA, MONO, CAUDA }) => {
    const off = new OfflineAudioContext(MONO ? 1 : 2, TAXA * SEG, TAXA);
    /* o módulo de som pede o contexto ao navegador uma vez só; trocamos a
       fábrica antes de ele acordar, e carregamos uma cópia nova do módulo
       para cada faixa (o `?v=` engana o cache do import) */
    /* O MÓDULO DE SOM ACORDA O CONTEXTO: se o estado for "suspended" ele
       chama `resume()`, e num contexto OFFLINE isso começa a renderizar na
       hora — o arquivo saía com o silêncio de antes de a primeira nota ter
       sido agendada. O disfarce diz que já está tocando e engole o resume. */
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
    M.trilha(id);
    M.girarAte(SEG - CAUDA);
    /* a fábrica só volta ao normal DEPOIS de a faixa estar agendada: o módulo
       de som pede o contexto na primeira nota, não no import, e devolvê-la
       antes disso fazia a música ir para o alto-falante e o arquivo sair mudo */
    window.AudioContext = antes;
    const buf = await off.startRendering();

    /* AudioBuffer → WAV de 16 bits, na mão: é meia dúzia de campos e evita
       carregar biblioteca nenhuma numa página que não usa nenhuma */
    const n = buf.length, ch = MONO ? 1 : 2;
    const dados = new DataView(new ArrayBuffer(44 + n * ch * 2));
    const txt = (o, s) => { for(let i=0;i<s.length;i++) dados.setUint8(o+i, s.charCodeAt(i)); };
    txt(0,'RIFF'); dados.setUint32(4, 36 + n*ch*2, true); txt(8,'WAVEfmt ');
    dados.setUint32(16, 16, true); dados.setUint16(20, 1, true);
    dados.setUint16(22, ch, true); dados.setUint32(24, TAXA, true);
    dados.setUint32(28, TAXA*ch*2, true); dados.setUint16(32, ch*2, true);
    dados.setUint16(34, 16, true); txt(36,'data'); dados.setUint32(40, n*ch*2, true);
    const L = buf.getChannelData(0);
    const R = buf.numberOfChannels > 1 ? buf.getChannelData(1) : L;
    const canais = ch === 1 ? [L] : [L, R];
    let o = 44;
    for(let i=0;i<n;i++){
      for(const canal of canais){
        const v = Math.max(-1, Math.min(1, canal[i]));
        dados.setInt16(o, v < 0 ? v*0x8000 : v*0x7FFF, true); o += 2;
      }
    }
    let bin = '';
    const u8 = new Uint8Array(dados.buffer);
    for(let i=0;i<u8.length;i+=8192)
      bin += String.fromCharCode.apply(null, u8.subarray(i, i+8192));
    return btoa(bin);
  }, { id, SEG, MOD, TAXA, MONO, CAUDA });
  await p.close();
  const arq = `/tmp/trilha/${id}.wav`;
  writeFileSync(arq, Buffer.from(b64, 'base64'));
  console.log(arq);
}
await b.close();
