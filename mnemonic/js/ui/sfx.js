/* ========================================================================
   SOM — WebAudio puro, nenhum arquivo para baixar.

   Um jogo da memória vive de confirmação: você virou, acertou, emendou. O
   ouvido responde antes do olho, e é o som que faz o combo PARECER que está
   subindo. Por isso o acerto é a única coisa aqui com afinação variável: a
   nota sobe degrau a degrau com o combo, e quando ele quebra o ouvido sente
   a queda antes de ler o número.
   ===================================================================== */
let ctx = null, ligado = true;
function ac(){
  if(!ctx){ try { ctx = new (window.AudioContext||window.webkitAudioContext)(); }
            catch(e){ ligado = false; } }
  if(ctx?.state === 'suspended') ctx.resume();
  return ctx;
}
export function acordar(){ ac(); }
export function mudo(v){ ligado = !v; }
export function estaMudo(){ return !ligado; }
/* a música mora noutro arquivo mas não pode abrir um segundo AudioContext:
   dois contextos são dois relógios, e o navegador limita quantos existem */
export const contexto = () => ac();

function tom({ f=440, f2=null, t=0.12, v=0.18, tipo='sine', atraso=0 }){
  if(!ligado) return;
  const c = ac(); if(!c) return;
  const t0 = c.currentTime + atraso;
  const o = c.createOscillator(), g = c.createGain();
  o.type = tipo; o.frequency.setValueAtTime(f, t0);
  if(f2) o.frequency.exponentialRampToValueAtTime(Math.max(20,f2), t0+t);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(v, t0+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0+t);
  o.connect(g).connect(c.destination);
  o.start(t0); o.stop(t0+t+0.02);
}
function ruido({ t=0.1, v=0.12, atraso=0, corte=1200 }){
  if(!ligado) return;
  const c = ac(); if(!c) return;
  const n = Math.floor(c.sampleRate*t);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i] = (Math.random()*2-1) * (1-i/n);
  const s = c.createBufferSource(); s.buffer = buf;
  const f = c.createBiquadFilter(); f.type='lowpass'; f.frequency.value = corte;
  const g = c.createGain(); g.gain.value = v;
  s.connect(f).connect(g).connect(c.destination);
  s.start(c.currentTime + atraso);
}

/* a escada do acerto: uma nota por degrau de combo, teto no topo da escala */
const ESCALA = [523.25,587.33,659.25,783.99,880,1046.5,1174.7,1318.5,1568,1760];

export const SFX = {
  virar(){ tom({ f:320, f2:480, t:0.07, v:0.10, tipo:'triangle' }); ruido({ t:0.05, v:0.05, corte:2600 }); },
  acerto(combo=1){
    const i = Math.min(ESCALA.length-1, Math.max(0, combo-1));
    tom({ f:ESCALA[i], t:0.16, v:0.16, tipo:'triangle' });
    tom({ f:ESCALA[i]*1.5, t:0.13, v:0.07, tipo:'sine', atraso:0.045 });
  },
  erro(){ tom({ f:190, f2:96, t:0.24, v:0.16, tipo:'sawtooth' }); ruido({ t:0.16, v:0.09, corte:520 }); },
  trinca(){ tom({ f:900, f2:1300, t:0.09, v:0.10, tipo:'square' }); },
  moeda(){ tom({ f:1180, t:0.07, v:0.10 }); tom({ f:1760, t:0.09, v:0.08, atraso:0.06 }); },
  revelar(){ tom({ f:760, f2:1500, t:0.16, v:0.09, tipo:'sine' }); },
  chefe(){ tom({ f:120, f2:56, t:0.5, v:0.18, tipo:'sawtooth' }); ruido({ t:0.4, v:0.1, corte:340 }); },
  vitoria(){ [523.25,659.25,783.99,1046.5].forEach((f,i)=>
    tom({ f, t:0.3, v:0.15, tipo:'triangle', atraso:i*0.1 })); },
  derrota(){ [392,330,262,196].forEach((f,i)=>
    tom({ f, t:0.4, v:0.15, tipo:'sawtooth', atraso:i*0.14 })); },
  clique(){ tom({ f:600, t:0.04, v:0.08, tipo:'square' }); },
  premio(){ [659.25,880,1318.5].forEach((f,i)=>
    tom({ f, t:0.34, v:0.13, tipo:'sine', atraso:i*0.085 })); },
};
