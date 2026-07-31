/* ========================================================================
   LENDAS DA F1 — efeitos sonoros do MENU (Web Audio sintetizado, sem
   arquivos externos). Bloops de UI: navegar, confirmar, voltar, comprar,
   erro, selecionar, hover. Inicia no 1º gesto do usuário.
   ===================================================================== */
let ctx=null, master=null, ready=false;
function init(){
  if(ready) return;
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext; ctx=new Ctx();
    master=ctx.createGain(); master.gain.value=0.32; master.connect(ctx.destination);
    ready=true;
  }catch(e){}
}
addEventListener('pointerdown', ()=>{ init(); if(ctx&&ctx.state!=='running') ctx.resume(); }, {passive:true});
function tone(freq, dur, {type='sine', vol=0.5, to=null, dly=0, curve='exp'}={}){
  if(!ready) return; const t=ctx.currentTime+dly;
  const o=ctx.createOscillator(), g=ctx.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t);
  if(to) o.frequency.exponentialRampToValueAtTime(Math.max(40,to), t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.008);
  if(curve==='exp') g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  else g.gain.linearRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+0.03);
}
function noise(dur, {vol=0.3, hp=1200, lp=6000, dly=0}={}){
  if(!ready) return; const t=ctx.currentTime+dly;
  const n=Math.floor(ctx.sampleRate*dur), b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2);
  const s=ctx.createBufferSource(); s.buffer=b;
  const f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=(hp+lp)/2; f.Q.value=0.7;
  const g=ctx.createGain(); g.gain.value=vol;
  s.connect(f); f.connect(g); g.connect(master); s.start(t);
}
/* ---- eventos ---- */
export function hover(){ tone(880,0.05,{type:'sine',vol:0.10,to:1200}); }
export function nav(){ tone(300,0.06,{type:'square',vol:0.22,to:520}); noise(0.04,{vol:0.10,hp:2000}); }
export function back(){ tone(520,0.09,{type:'triangle',vol:0.22,to:240}); }
export function confirm(){ tone(440,0.08,{type:'square',vol:0.26,to:660}); tone(660,0.14,{type:'square',vol:0.20,to:990,dly:0.07}); }
export function go(){ // largada/entrar na pista: rev curto
  tone(120,0.5,{type:'sawtooth',vol:0.3,to:900,curve:'lin'}); noise(0.5,{vol:0.10,hp:400,lp:4000}); }
export function select(){ tone(520,0.07,{type:'triangle',vol:0.24,to:780}); tone(780,0.10,{type:'sine',vol:0.16,to:1040,dly:0.05}); }
export function buy(){ tone(880,0.06,{type:'square',vol:0.24}); tone(1320,0.12,{type:'square',vol:0.20,dly:0.06}); }
export function error(){ tone(200,0.16,{type:'sawtooth',vol:0.22,to:120,curve:'lin'}); }
export function win(){ [523,659,784,1047].forEach((f,i)=> tone(f,0.35,{type:'triangle',vol:0.22,dly:i*0.11})); }
