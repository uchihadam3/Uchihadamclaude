/* ========================================================================
   LENDAS DA F1 — motor com SAMPLE REAL (gravação de cockpit de F1).
   Decodifica o mp3, escolhe automaticamente um trecho estável (aceleração
   forte e constante) e o repete em loop, mudando o PITCH (playbackRate)
   conforme o RPM e o VOLUME conforme o acelerador — então o som real fica
   sincronizado com o carro. Mesma interface do F1Audio: start()/update().
   ===================================================================== */
export class SampleEngine {
  constructor(url='./audio/f1_engine.mp3'){ this.url=url; this.ready=false; this.loading=false; this.lastGear=1; }

  async start(){
    if(this.ready){ if(this.ctx.state!=='running') this.ctx.resume(); return; }
    if(this.loading) return; this.loading=true;
    const Ctx=window.AudioContext||window.webkitAudioContext;
    const ctx=this.ctx=new Ctx();
    // cadeia: source -> lowpass(abre com rpm) -> gain(acelerador) -> comp -> saída
    const master=this.master=ctx.createGain(); master.gain.value=0.0;
    const lp=this.lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=6000; lp.Q.value=0.5;
    const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-14; comp.ratio.value=4; comp.attack.value=0.004; comp.release.value=0.2;
    master.connect(lp); lp.connect(comp); comp.connect(ctx.destination);
    try{
      const resp=await fetch(this.url); const arr=await resp.arrayBuffer();
      const buf=await ctx.decodeAudioData(arr); this.buffer=buf;
      const [ls,le]=this._pickLoop(buf);            // trecho estável -> loop sem emenda
      this.loopStart=ls; this.loopEnd=le;
      this._spawn();
      this.ready=true;
      master.gain.setTargetAtTime(1.0, ctx.currentTime, 0.3);
      if(ctx.state!=='running') ctx.resume();
    }catch(e){ this.loading=false; throw e; }
  }

  _spawn(){
    const ctx=this.ctx;
    const src=ctx.createBufferSource(); src.buffer=this.buffer; src.loop=true;
    src.loopStart=this.loopStart; src.loopEnd=this.loopEnd;
    src.playbackRate.value=1.0;
    src.connect(this.master); src.start(0, this.loopStart);
    this.src=src;
  }

  /* acha ~1.8s de ROLDÃO forte e estável (alta energia + baixa variação) e
     ajusta as bordas pro cruzamento de zero mais próximo (loop sem clique). */
  _pickLoop(buf){
    const sr=buf.sampleRate, ch=buf.getChannelData(0);
    const n=ch.length, win=Math.floor(sr*0.05);           // janelas de 50ms
    const nb=Math.floor(n/win); const rms=new Float32Array(nb);
    for(let b=0;b<nb;b++){ let s=0; const o=b*win; for(let i=0;i<win;i++){ const x=ch[o+i]; s+=x*x; } rms[b]=Math.sqrt(s/win); }
    const lenB=Math.max(8,Math.floor(1.8/0.05));           // ~1.8s em blocos
    let best=-1, bestScore=-1;
    for(let b=0;b+lenB<nb;b++){
      let m=0; for(let i=0;i<lenB;i++) m+=rms[b+i]; m/=lenB;
      let v=0; for(let i=0;i<lenB;i++){ const d=rms[b+i]-m; v+=d*d; } v=Math.sqrt(v/lenB);
      const score=m - v*1.6;                                // alto e estável
      if(score>bestScore){ bestScore=score; best=b; }
    }
    if(best<0) best=Math.floor(nb*0.4);
    let s0=best*win, s1=(best+lenB)*win;
    const zc=(i,dir)=>{ // cruzamento de zero ascendente mais próximo
      for(let k=0;k<win;k++){ const j=i+dir*k; if(j>1&&j<n&&ch[j-1]<=0&&ch[j]>0) return j; } return i; };
    s0=zc(s0,1); s1=zc(s1,-1);
    return [s0/sr, s1/sr];
  }

  update(rpm, throttle, speed, onKerb, dt, gear){
    if(!this.ready) return;
    if(this.ctx.state!=='running'){ this.ctx.resume(); return; }
    const t=this.ctx.currentTime, T=0.05;
    // PITCH: mapeia RPM -> playbackRate (grave em baixa, agudo em alta rotação)
    const rr=Math.max(0, Math.min(1, (rpm-3000)/12000));
    let rate=0.62 + rr*1.05;                                // ~0.62 (idle) .. ~1.67 (redline)
    rate*= onKerb?1.0:1.0;
    // corte na troca de marcha: cai o pitch/volume por um instante
    if(gear && gear>this.lastGear){
      this.src.playbackRate.cancelScheduledValues(t);
      this.src.playbackRate.setValueAtTime(this.src.playbackRate.value, t);
      this.src.playbackRate.linearRampToValueAtTime(rate*0.86, t+0.04);
      this.src.playbackRate.linearRampToValueAtTime(rate, t+0.18);
    } else {
      this.src.playbackRate.setTargetAtTime(rate, t, T);
    }
    if(gear) this.lastGear=gear;
    // TIMBRE: abre o filtro com acelerador+rpm
    this.lp.frequency.setTargetAtTime(1600 + throttle*4200 + rr*3200, t, T);
    // VOLUME: acelerador manda; corta um pouco no pé fora
    const vol=(0.30 + throttle*0.70) * (gear&&gear>this.lastGear?0.6:1.0);
    this.master.gain.setTargetAtTime(vol*(onKerb?1.04:1.0), t, 0.06);
  }
}
