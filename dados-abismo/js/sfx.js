/* SOM — efeitos sintetizados + trilha em camadas (§13). Sem arquivos. */
let ctx=null, master=null, musGain=null, ligado=false, tocandoMus=false;
export function iniciar(){
  if(ctx) { if(ctx.state!=='running') ctx.resume(); return; }
  const A=window.AudioContext||window.webkitAudioContext; if(!A) return;
  ctx=new A(); master=ctx.createGain(); master.gain.value=0.85; master.connect(ctx.destination);
  musGain=ctx.createGain(); musGain.gain.value=0.0; musGain.connect(master);
  ligado=true;
}
addEventListener('pointerdown',()=>{ iniciar(); if(!tocandoMus) musica(); },{passive:true});
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
/* --- eventos --- */
export const dado   = v => { ruido(.06,{vol:.10+.16*Math.min(v/6,1), f:900+Math.random()*1400, q:1.6}); };
export const pegar  = () => { tom(660,.06,{tipo:'triangle',vol:.22,to:880}); };
export const soltar = () => { tom(420,.05,{tipo:'triangle',vol:.16,to:320}); };
export const golpe  = f => { ruido(.10,{vol:.34,f:260,q:.7}); tom(120,.16,{tipo:'sawtooth',vol:.30,to:52});
                             if(f>16){ tom(240,.22,{tipo:'square',vol:.20,to:80,dly:.03}); ruido(.16,{vol:.20,f:2400,dly:.02}); } };
export const bloqueio=() => { tom(300,.14,{tipo:'sine',vol:.24,to:520}); ruido(.07,{vol:.12,f:3200}); };
export const morte  = () => { tom(200,.5,{tipo:'sawtooth',vol:.3,to:40}); ruido(.4,{vol:.2,f:500,q:.5}); };
export const dano   = () => { tom(160,.24,{tipo:'square',vol:.26,to:70}); ruido(.14,{vol:.22,f:420,q:.8}); };
export const vitoria= () => [0,.10,.21,.34].forEach((d,i)=>tom([392,523,659,784][i],.42,{tipo:'triangle',vol:.26,dly:d}));
export const derrota= () => [0,.16,.34].forEach((d,i)=>tom([330,262,196][i],.6,{tipo:'sine',vol:.28,dly:d}));
/* --- trilha: ostinato sombrio em camadas --- */
export function musica(){
  if(!ligado||tocandoMus) return; tocandoMus=true;
  musGain.gain.setTargetAtTime(0.30, t(), 1.2);
  const esc=[146.83,164.81,174.61,196.00,220.00,233.08];  // ré menor
  let i=0;
  const passo=()=>{
    if(!ligado) return;
    const f=esc[i%esc.length];
    tom(f,1.5,{tipo:'triangle',vol:.16,dest:musGain});
    if(i%4===0) tom(f/2,2.6,{tipo:'sine',vol:.22,dest:musGain});
    if(i%8===6) tom(esc[(i+2)%esc.length]*2,.9,{tipo:'sine',vol:.07,dest:musGain});
    i++; setTimeout(passo, 720);
  };
  passo();
}
export const tensao = v => { if(musGain) musGain.gain.setTargetAtTime(v?0.45:0.30, t(), 0.8); };
