/* ========================================================================
   SOM (§13) — efeitos sintetizados + TRILHA de forma longa. Sem arquivos.

   A trilha não é um ostinato em loop curto: é uma FORMA COMPOSTA, tocada por
   um agendador com lookahead (precisão do relógio de áudio, não de setTimeout).
     · "A Cripta Respira" — batalha, 96 BPM, 56 compassos = 2min20 sem repetir
     · "OSSÁRIO"          — chefe,  120 BPM, 64 compassos = 2min08 sem repetir
   ===================================================================== */
let ctx=null, master=null, musGain=null, ligado=false;
let rev=null, revG=null;

export function iniciar(){
  if(ctx){ if(ctx.state!=='running') ctx.resume(); return; }
  const A=window.AudioContext||window.webkitAudioContext; if(!A) return;
  ctx=new A(); master=ctx.createGain(); master.gain.value=0.85; master.connect(ctx.destination);
  musGain=ctx.createGain(); musGain.gain.value=0.0; musGain.connect(master);
  // reverb curta comum a toda a trilha — dá o tamanho da cripta
  rev=ctx.createConvolver();
  const L=Math.floor(ctx.sampleRate*1.7), imp=ctx.createBuffer(2,L,ctx.sampleRate);
  for(let c=0;c<2;c++){ const d=imp.getChannelData(c);
    for(let i=0;i<L;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/L,3.1); }
  rev.buffer=imp; revG=ctx.createGain(); revG.gain.value=0.34;
  rev.connect(revG); revG.connect(musGain);
  ligado=true;
}
/* O navegador só libera áudio depois do primeiro toque. Este gancho existe
   para destravar — mas ele forçava trilha('batalha'), então tocar em QUALQUER
   lugar (inclusive no menu) começava a música de combate. Agora ele retoma a
   faixa que a tela em que você está já tinha pedido. */
addEventListener('pointerdown',()=>{ iniciar(); if(!atual) trilha(pedida || 'menu'); },{passive:true});
const t=()=>ctx.currentTime;

function tom(f,dur,{tipo='sine',vol=.3,to=null,dly=0,dest=null}={}){
  if(!ligado) return; const T=t()+dly;
  const o=ctx.createOscillator(), g=ctx.createGain();
  o.type=tipo; o.frequency.setValueAtTime(f,T);
  if(to) o.frequency.exponentialRampToValueAtTime(Math.max(30,to),T+dur);
  g.gain.setValueAtTime(.0001,T); g.gain.exponentialRampToValueAtTime(vol,T+.008);
  g.gain.exponentialRampToValueAtTime(.0001,T+dur);
  o.connect(g); g.connect(dest||master); o.start(T); o.stop(T+dur+.03);
}
function ruido(dur,{vol=.3,f=1200,q=1,dly=0}={}){
  if(!ligado) return; const T=t()+dly;
  const n=Math.floor(ctx.sampleRate*dur), b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.2);
  const s=ctx.createBufferSource(); s.buffer=b;
  const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=f; bp.Q.value=q;
  const g=ctx.createGain(); g.gain.value=vol;
  s.connect(bp); bp.connect(g); g.connect(master); s.start(T);
}
/* --- eventos de jogo --- */
export const dado   = v => { ruido(.06,{vol:.10+.16*Math.min(v/6,1), f:900+Math.random()*1400, q:1.6}); };
export const pegar  = () => { tom(660,.06,{tipo:'triangle',vol:.22,to:880}); };
export const soltar = () => { tom(420,.05,{tipo:'triangle',vol:.16,to:320}); };
export const golpe  = f => { ruido(.10,{vol:.34,f:260,q:.7}); tom(120,.16,{tipo:'sawtooth',vol:.30,to:52});
                             if(f>16){ tom(240,.22,{tipo:'square',vol:.20,to:80,dly:.03}); ruido(.16,{vol:.20,f:2400,dly:.02}); } };
export const bloqueio=() => { tom(300,.14,{tipo:'sine',vol:.24,to:520}); ruido(.07,{vol:.12,f:3200}); };
/* GOLPE QUE MORRE NO ESCUDO. Tem que ser inconfundível contra `golpe`, que é
   um baque grave e surdo — antes um ataque todo aparado não fazia som nenhum
   e dava pra bater três turnos no bloqueio sem perceber. Aqui é o oposto:
   estalo metálico agudo, curto, sem corpo grave. */
export const aparado = (v=1) => {
  const f = Math.min(1, v/10);
  ruido(.055,{vol:.16+.10*f, f:5400, q:2.4});              // faísca do metal
  tom(1240,.10,{tipo:'square',  vol:.13+.05*f, to:760});   // o "clang"
  tom(2480,.06,{tipo:'triangle',vol:.07, to:1840, dly:.015});
  tom(880, .13,{tipo:'sine',    vol:.06, to:640,  dly:.03}); // cauda do sino
};
export const morte  = () => { tom(200,.5,{tipo:'sawtooth',vol:.3,to:40}); ruido(.4,{vol:.2,f:500,q:.5}); };
export const dano   = () => { tom(160,.24,{tipo:'square',vol:.26,to:70}); ruido(.14,{vol:.22,f:420,q:.8}); };
export const vitoria= () => [0,.10,.21,.34].forEach((d,i)=>tom([392,523,659,784][i],.42,{tipo:'triangle',vol:.26,dly:d}));
export const derrota= () => [0,.16,.34].forEach((d,i)=>tom([330,262,196][i],.6,{tipo:'sine',vol:.28,dly:d}));

/* ==================== INSTRUMENTOS DA TRILHA ==================== */
const HZ = m => 440*Math.pow(2,(m-69)/12);          // MIDI → Hz

function voz(T, m, dur, { tipo='sawtooth', vol=.2, corte=1400, q=1, ataque=.01,
                          det=0, glide=0, wet=.3, vib=0 }={}){
  const o=ctx.createOscillator(); o.type=tipo;
  const f=HZ(m);
  o.frequency.setValueAtTime(glide?HZ(m+glide):f, T);
  if(glide) o.frequency.exponentialRampToValueAtTime(f, T+Math.min(.12,dur*.4));
  o.detune.value=det;
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=q;
  lp.frequency.setValueAtTime(corte, T);
  lp.frequency.exponentialRampToValueAtTime(Math.max(220,corte*.45), T+dur);
  const g=ctx.createGain();
  g.gain.setValueAtTime(.0001,T);
  g.gain.exponentialRampToValueAtTime(vol, T+ataque);
  g.gain.exponentialRampToValueAtTime(.0001, T+dur);
  o.connect(lp); lp.connect(g); g.connect(musGain);
  if(wet>0 && rev){ const w=ctx.createGain(); w.gain.value=wet; g.connect(w); w.connect(rev); }
  if(vib){ const lfo=ctx.createOscillator(), la=ctx.createGain();
    lfo.frequency.value=5.2; la.gain.value=vib; lfo.connect(la); la.connect(o.detune);
    lfo.start(T); lfo.stop(T+dur+.05); }
  o.start(T); o.stop(T+dur+.05);
}
/* acorde sustentado (pad) — duas vozes desafinadas por nota */
function pad(T, notas, dur, {vol=.055, corte=900, tipo='sawtooth'}={}){
  for(const m of notas){
    voz(T, m, dur, {tipo, vol, corte, ataque:dur*.28, det:-7, wet:.55});
    voz(T, m, dur, {tipo, vol, corte, ataque:dur*.34, det:+7, wet:.55});
  }
}
function percu(T, {tipo='hat', vol=.2}={}){
  if(!ligado) return;
  if(tipo==='kick'){
    const o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine';
    o.frequency.setValueAtTime(140,T); o.frequency.exponentialRampToValueAtTime(38,T+.13);
    g.gain.setValueAtTime(vol,T); g.gain.exponentialRampToValueAtTime(.0001,T+.20);
    o.connect(g); g.connect(musGain); o.start(T); o.stop(T+.24); return;
  }
  const dur = tipo==='snare'?.19 : tipo==='taiko'?.34 : .05;
  const n=Math.floor(ctx.sampleRate*dur), b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n, tipo==='hat'?4.5:2.0);
  const s=ctx.createBufferSource(); s.buffer=b;
  const f=ctx.createBiquadFilter();
  if(tipo==='hat'){ f.type='highpass'; f.frequency.value=7200; }
  else if(tipo==='snare'){ f.type='bandpass'; f.frequency.value=1900; f.Q.value=.8; }
  else { f.type='lowpass'; f.frequency.value=320; }
  const g=ctx.createGain(); g.gain.value=vol;
  s.connect(f); f.connect(g); g.connect(musGain);
  if(rev && tipo!=='hat'){ const w=ctx.createGain(); w.gain.value=.4; g.connect(w); w.connect(rev); }
  s.start(T);
  if(tipo==='taiko'){ // corpo grave do tambor
    const o=ctx.createOscillator(), og=ctx.createGain(); o.type='sine';
    o.frequency.setValueAtTime(96,T); o.frequency.exponentialRampToValueAtTime(52,T+.28);
    og.gain.setValueAtTime(vol*1.1,T); og.gain.exponentialRampToValueAtTime(.0001,T+.34);
    o.connect(og); og.connect(musGain); o.start(T); o.stop(T+.38);
  }
}

/* ==================== AS DUAS FAIXAS ====================
   Cada faixa declara bpm, colcheias por compasso e uma lista de SEÇÕES
   (harmonia + textura). `passo(i,T)` é chamado uma vez por colcheia com o
   instante EXATO em que ela deve soar. A forma só se repete no fim. */

/* acordes: [baixo, ...notas do naipe] em MIDI */
const AC = {
  Dm:[38,62,65,69], Bb:[34,58,62,65], F:[29,57,60,65], C:[36,60,64,67],
  Gm:[31,62,67,70], A :[33,61,64,69],
  Dd:[38,62,66,69],            // ré frígio dominante — o acorde do medo
  Ebm:[39,63,66,70], Bbm:[34,58,61,65],
  /* sétimas para o MENU: o mesmo ré menor das outras faixas, mas com a
     sétima e a nona abertas — soa parado e melancólico em vez de tenso.
     É a diferença entre "algo vem aí" e "você ainda não desceu". */
  Dm9 :[38,60,65,69,72], BbM7:[34,62,65,69], Gm7:[31,58,62,65],
  Am7 :[33,60,64,67],    FM7 :[29,57,60,64], Csus:[36,60,65,67],
};

/* ---------- BATALHA: "A Cripta Respira" — 96 BPM, 56 compassos ---------- */
const BATALHA = (()=>{
  const secoes = [
    { nome:'entrada', ac:['Dm','Dm','Bb','Bb','F','F','C','C'],   cam:{sub:1,hat:1} },
    { nome:'ostinato',ac:['Dm','Dm','Bb','Bb','F','F','C','C'],   cam:{sub:1,hat:1,arp:1} },
    { nome:'tema',    ac:['Dm','Bb','F','C','Dm','Gm','Bb','A'],  cam:{sub:1,hat:1,arp:1,lead:1,bat:1} },
    { nome:'respiro', ac:['F','F','C','C','Bb','Bb','A','A'],     cam:{pad:1,taiko:1} },
    { nome:'peso',    ac:['Dm','Dm','Gm','Gm','Bb','Bb','A','A'], cam:{sub:1,bat:1,arp:1,lead:2} },
    { nome:'fecho',   ac:['Dm','Bb','F','C','Dm','Gm','A','A'],   cam:{sub:1,hat:2,arp:1,lead:1,bat:1} },
    { nome:'coda',    ac:['Dm','Dm','Bb','Bb','Dm','Dm','A','A'], cam:{sub:1,pad:1,taiko:1} },
  ];
  // melodia por seção: chave = colcheia dentro da seção (0..63), valor = MIDI
  const mel = {
    tema: {0:69,4:67,6:65,8:62,16:65,20:67,22:69,24:70,32:69,36:74,38:72,40:70,48:69,52:67,56:65,60:62},
    peso: {0:74,2:72,4:70,6:69,8:70,12:65,16:67,18:69,20:70,24:72,32:74,34:75,36:74,40:70,48:69,50:70,52:72,56:74,60:69},
    fecho:{0:62,4:65,8:69,12:70,16:72,20:70,24:69,28:65,32:62,36:65,40:69,44:74,48:75,52:74,56:72,58:70,60:69},
  };
  return {
    nome:'A Cripta Respira', bpm:96, porCompasso:8, compassos:secoes.length*8,
    passo(i, T){
      const compasso = Math.floor(i/8), b = i%8;
      const si = Math.floor(compasso/8), s = secoes[si]; if(!s) return;
      const dentro = i - si*64;
      const acorde = AC[s.ac[compasso%8]];
      const c = s.cam, semi = 60/96/2;
      if(c.sub){
        if(b===0) voz(T, acorde[0], semi*5.2, {tipo:'sawtooth',vol:.20,corte:420,q:3,wet:.18});
        if(b===4) voz(T, acorde[0], semi*2.4, {tipo:'sawtooth',vol:.13,corte:380,q:3,wet:.18});
        if(b===6) voz(T, acorde[0]+12, semi*1.6,{tipo:'triangle',vol:.08,corte:900,wet:.3});
      }
      if(c.pad && b===0 && compasso%2===0) pad(T, acorde.slice(1), semi*15, {vol:.05,corte:820});
      if(c.arp){
        const grau = [1,2,3,2,3,1,2,3][b];
        voz(T, acorde[grau]+12, semi*1.5, {tipo:'triangle',vol:.075,corte:2600,ataque:.006,wet:.45});
      }
      if(c.lead){
        const m = (mel[s.nome]||{})[dentro];
        if(m!==undefined) voz(T, m, semi*(c.lead===2?3.4:2.6),
          {tipo:'square',vol:.085,corte:2100,q:2,ataque:.02,wet:.5,vib:9});
      }
      if(c.hat && (b%2===0 || c.hat===2)) percu(T,{tipo:'hat',vol:b%4===0?.10:.055});
      if(c.bat){ if(b===0||b===6) percu(T,{tipo:'kick',vol:.30}); if(b===4) percu(T,{tipo:'snare',vol:.16}); }
      if(c.taiko && (b===0 || b===5) && compasso%2===0) percu(T,{tipo:'taiko',vol:.20});
    },
  };
})();

/* ---------- CHEFE: "OSSÁRIO" — 120 BPM, 64 compassos ---------- */
const CHEFE = (()=>{
  const secoes = [
    { nome:'presagio',   ac:['Dd','Dd','Ebm','Ebm','Dd','Dd','Bbm','A'],   cam:{drone:1,taiko:1} },
    { nome:'marcha',     ac:['Dd','Dd','Ebm','Ebm','Gm','Gm','A','A'],     cam:{drone:1,taiko:1,ost:1,kick:1} },
    { nome:'coro',       ac:['Dd','Ebm','Bbm','A','Dd','Gm','Ebm','A'],    cam:{coro:1,ost:1,kick:1,taiko:1} },
    { nome:'assalto',    ac:['Dd','Dd','Bbm','Bbm','Ebm','Ebm','A','A'],   cam:{ost:1,kick:2,metal:1,lead:1} },
    { nome:'ruina',      ac:['Ebm','Ebm','Bbm','Bbm','Gm','Gm','A','A'],   cam:{coro:1,metal:1,lead:1,kick:1} },
    { nome:'silencio',   ac:['Dd','Dd','Dd','Dd','A','A','A','A'],         cam:{drone:1,coro:1} },
    { nome:'carnificina',ac:['Dd','Ebm','Gm','Bbm','Dd','Ebm','A','A'],    cam:{ost:1,kick:2,metal:1,lead:2,taiko:1} },
    { nome:'queda',      ac:['Dd','Dd','Bbm','Bbm','Dd','Dd','A','A'],     cam:{drone:1,coro:1,taiko:1} },
  ];
  const mel = {
    assalto:{0:74,1:75,2:74,4:70,8:73,10:74,12:75,16:74,20:70,24:66,32:74,33:75,34:78,40:77,44:75,48:74,56:73,60:70},
    ruina:  {0:78,4:77,6:75,8:74,12:70,16:75,20:74,24:73,32:78,36:80,40:78,44:75,48:74,52:73,56:75,60:74},
    carnificina:{0:74,2:78,4:77,6:75,8:74,10:70,12:73,14:74,16:75,18:77,20:78,24:80,32:78,34:77,36:75,38:74,40:73,44:70,48:74,52:75,56:77,60:78},
  };
  return {
    nome:'OSSÁRIO', bpm:120, porCompasso:8, compassos:secoes.length*8,
    passo(i, T){
      const compasso = Math.floor(i/8), b = i%8;
      const si = Math.floor(compasso/8), s = secoes[si]; if(!s) return;
      const dentro = i - si*64;
      const acorde = AC[s.ac[compasso%8]];
      const c = s.cam, semi = 60/120/2;
      if(c.drone && b===0 && compasso%2===0){
        voz(T, acorde[0]-12, semi*15.5, {tipo:'sawtooth',vol:.16,corte:200,q:4,ataque:.6,wet:.5});
        voz(T, acorde[0],    semi*15.5, {tipo:'sawtooth',vol:.09,corte:300,q:3,ataque:.8,wet:.5});
      }
      if(c.coro && b===0 && compasso%2===0)
        pad(T, acorde.slice(1).map(n=>n+12), semi*15, {vol:.045,corte:1500});
      if(c.ost){                                   // a marcha: colcheia contínua
        const seq=[0,0,3,0,2,0,3,1];
        voz(T, acorde[seq[b]]-12+((b===2||b===6)?12:0), semi*1.15,
            {tipo:'square',vol:.10,corte:900,q:2,ataque:.004,wet:.15});
      }
      if(c.metal && (b===0||b===3||b===6)){        // naipe de metais
        for(const n of acorde.slice(1))
          voz(T, n, semi*(b===0?2.6:1.4),
              {tipo:'sawtooth',vol:.055,corte:2600,q:1.4,ataque:.012,wet:.35,det:b===0?6:-6});
      }
      if(c.lead){
        const m=(mel[s.nome]||{})[dentro];
        if(m!==undefined) voz(T, m, semi*(c.lead===2?2.2:3.0),
          {tipo:'sawtooth',vol:.10,corte:3200,q:2.5,ataque:.014,wet:.45,vib:14});
      }
      if(c.kick){ if(b===0||b===4) percu(T,{tipo:'kick',vol:.34});
                  if(c.kick===2 && (b===2||b===6||b===7)) percu(T,{tipo:'kick',vol:.22});
                  if(b===4) percu(T,{tipo:'snare',vol:.18}); }
      if(c.taiko && (b===0 || (compasso%4===3 && b>=5))) percu(T,{tipo:'taiko',vol:b===0?.26:.18});
    },
  };
})();

/* ---------- MENU: "Antes de Descer" — 72 BPM, 48 compassos (160s) ----------
   A trilha de batalha tocava no menu porque o primeiro toque na tela chamava
   trilha('batalha') sem olhar onde o jogador estava. Menu não é combate: sem
   caixa, sem marcha, sem lead estridente. Só a sala respirando, um sino
   distante e um tambor que aparece uma vez, quando a porta se abre. */
const MENU = (()=>{
  const secoes = [
    { nome:'vazio',   ac:['Dm9','Dm9','BbM7','BbM7','FM7','FM7','Am7','Am7'],   cam:{pad:1,resp:1} },
    { nome:'sino',    ac:['Dm9','Dm9','BbM7','BbM7','Gm7','Gm7','Csus','Csus'], cam:{pad:1,sino:1,resp:1} },
    { nome:'tema',    ac:['Dm9','BbM7','FM7','Csus','Dm9','Gm7','Am7','Am7'],   cam:{pad:1,sino:1,lead:1,grave:1} },
    { nome:'memoria', ac:['FM7','FM7','Csus','Csus','BbM7','BbM7','Am7','Am7'], cam:{pad:1,harpa:1,lead:1} },
    { nome:'espera',  ac:['Dm9','Dm9','Gm7','Gm7','BbM7','BbM7','Am7','Am7'],   cam:{pad:1,sino:1,resp:1} },
    { nome:'porta',   ac:['Dm9','BbM7','Gm7','Csus','Dm9','FM7','Am7','Dm9'],   cam:{pad:1,sino:1,lead:1,grave:1,tambor:1} },
  ];
  // notas longas, muito espaçadas: o menu não tem pressa
  const mel = {
    tema:   {0:69,12:72,24:70,32:69,44:65,56:67,60:69},
    memoria:{0:72,10:74,16:72,24:69,32:70,40:69,48:67,56:65},
    porta:  {0:62,8:65,16:69,24:72,32:74,40:72,48:69,56:65,62:62},
  };
  return {
    nome:'Antes de Descer', bpm:72, porCompasso:8, compassos:secoes.length*8,
    passo(i, T){
      const compasso = Math.floor(i/8), b = i%8;
      const si = Math.floor(compasso/8), s = secoes[si]; if(!s) return;
      const dentro = i - si*64;
      const acorde = AC[s.ac[compasso%8]];
      const c = s.cam, semi = 60/72/2;

      // colchão: dois compassos inteiros de acorde, entrada bem lenta
      if(c.pad && b===0 && compasso%2===0)
        pad(T, acorde.slice(1), semi*15.6, {vol:.05,corte:760});
      // a sala respirando: fundamental grave e rara
      if(c.resp && b===0 && compasso%4===0)
        voz(T, acorde[0]-12, semi*15, {tipo:'sine',vol:.11,corte:260,ataque:1.2,wet:.6});
      if(c.grave && b===0)
        voz(T, acorde[0], semi*7.4, {tipo:'triangle',vol:.075,corte:420,ataque:.35,wet:.45});
      // sino distante: só nos tempos 0 e 5, nota alta, cauda longa
      if(c.sino && (b===0 || b===5) && compasso%2===0)
        voz(T, acorde[b===0?1:2]+12, semi*6.5,
            {tipo:'triangle',vol:.055,corte:3400,ataque:.004,wet:.75});
      // harpa: arpejo descendente, uma nota por tempo
      if(c.harpa){
        const grau = [4,3,2,1,2,3,4,3][b] % acorde.length;
        voz(T, acorde[Math.max(1,grau)]+12, semi*2.2,
            {tipo:'triangle',vol:.045,corte:2800,ataque:.005,wet:.6});
      }
      if(c.lead){
        const m = (mel[s.nome]||{})[dentro];
        if(m!==undefined) voz(T, m, semi*5.2,
          {tipo:'sine',vol:.085,corte:1900,ataque:.09,wet:.65,vib:4});
      }
      // um único tambor por compasso na última seção: a porta se abrindo
      if(c.tambor && b===0 && compasso%2===1) percu(T,{tipo:'taiko',vol:.16});
    },
  };
})();

const FAIXAS = { menu:MENU, batalha:BATALHA, chefe:CHEFE };

/* ==================== AGENDADOR (lookahead) ====================
   setTimeout erra dezenas de ms e a música "engasga". Aqui o setInterval só
   ENFILEIRA: quem toca no tempo certo é o relógio do próprio áudio. */
let atual=null, timer=null, passo=0, proximo=0, alvoVol=0.30;
let pedida=null;         // última faixa que a TELA pediu, mesmo sem áudio liberado
const OLHAR = 0.35;      // segundos de antecipação

export function trilha(nome){
  // registra antes de qualquer desistência: se o áudio ainda estiver travado,
  // é esta faixa que o primeiro toque deve começar — não a de batalha
  if(FAIXAS[nome]) pedida = nome;
  iniciar(); if(!ligado) return;
  if(atual && atual.id===nome) return;
  const f = FAIXAS[nome]; if(!f) return;
  const trocando = !!atual;
  atual = { id:nome, f, total:f.compassos*f.porCompasso, dur:(60/f.bpm/2) };
  passo = 0; proximo = t() + (trocando?0.35:0.15);
  if(trocando) musGain.gain.setTargetAtTime(0.0001, t(), 0.12);
  musGain.gain.setTargetAtTime(alvoVol, t()+(trocando?0.4:0), 1.0);
  if(!timer) timer = setInterval(agendar, 25);
}
export function pararTrilha(){
  if(timer){ clearInterval(timer); timer=null; }
  atual=null; if(musGain) musGain.gain.setTargetAtTime(0.0001, t(), .5);
}
function agendar(){
  if(!ligado || !atual) return;
  if(ctx.state!=='running'){ ctx.resume(); return; }
  const lim = t() + OLHAR;
  let guarda = 0;
  while(proximo < lim && guarda++ < 64){
    try{ atual.f.passo(passo % atual.total, proximo); }catch(e){}
    passo++; proximo += atual.dur;
  }
}
/* sobe o volume quando o couro come (§13) */
export const tensao = v => { alvoVol = v?0.40:0.30;
  if(musGain) musGain.gain.setTargetAtTime(alvoVol, t(), 0.8); };
export const musica = ()=> trilha('batalha');      // compatibilidade

/* leitura pra teste: quanto tempo a forma leva pra fechar? */
export function info(){
  const f = atual && atual.f;
  return { faixa:f?f.nome:null, id:atual?atual.id:null,
    compassos:f?f.compassos:0, bpm:f?f.bpm:0,
    duracao: f ? +(f.compassos*f.porCompasso*(60/f.bpm/2)).toFixed(1) : 0,
    passoAtual: passo, tocando: !!timer };
}
export const catalogo = ()=> Object.entries(FAIXAS).map(([id,f])=>({
  id, nome:f.nome, bpm:f.bpm, compassos:f.compassos,
  duracao:+(f.compassos*f.porCompasso*(60/f.bpm/2)).toFixed(1) }));
