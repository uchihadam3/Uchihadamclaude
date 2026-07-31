/* ========================================================================
   LENDAS DA F1 — motor com o SAMPLE REAL (gravação de cockpit de F1).
   Toca a gravação de verdade em loop e a sincroniza com o carro: o PITCH
   (playbackRate) segue o RPM e o VOLUME segue o acelerador. Usa o MESMO
   AudioContext do resto do som (importante no celular). Interface:
   start(sharedCtx) / update(rpm, throttle, speed, onKerb, dt, gear).
   ===================================================================== */
export class SampleEngine {
  constructor(url='./audio/f1_engine.mp3'){
    this.url=url; this.ready=false; this.loading=false; this.lastGear=1;
    // pré-carrega os bytes cedo pra ficar pronto rápido no 1º gesto
    this._bytes = fetch(url).then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  }

  async start(sharedCtx){
    if(this.ready){ if(this.ctx.state!=='running') this.ctx.resume(); return true; }
    if(this.loading) return false; this.loading=true;
    const Ctx=window.AudioContext||window.webkitAudioContext;
    const ctx=this.ctx = sharedCtx || new Ctx();
    if(ctx.state!=='running'){ try{ await ctx.resume(); }catch(e){} }
    // cadeia: source -> lowpass (abre com rpm) -> gain(acelerador) -> comp -> saída
    const master=this.master=ctx.createGain(); master.gain.value=0.0;
    const lp=this.lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=7000; lp.Q.value=0.4;
    const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-12; comp.ratio.value=3.5; comp.attack.value=0.004; comp.release.value=0.2;
    master.connect(lp); lp.connect(comp); comp.connect(ctx.destination);
    let arr=await this._bytes; if(!arr){ try{ arr=await (await fetch(this.url)).arrayBuffer(); }catch(e){} }
    if(!arr){ this.loading=false; return false; }
    try{ this.buffer=await ctx.decodeAudioData(arr.slice(0)); }
    catch(e){ this.loading=false; return false; }
    const [ls,le]=this._pickLoop(this.buffer);
    this.loopStart=ls; this.loopEnd=le;
    this._spawn(1.0);
    this.ready=true;
    master.gain.setTargetAtTime(1.0, ctx.currentTime, 0.25);
    return true;
  }

  _spawn(rate){
    const ctx=this.ctx;
    const src=ctx.createBufferSource(); src.buffer=this.buffer; src.loop=true;
    src.loopStart=this.loopStart; src.loopEnd=this.loopEnd;
    src.playbackRate.value=rate||1.0;
    src.connect(this.master); src.start(0, this.loopStart);
    this.src=src;
  }

  /* escolhe ~3s de ROLDÃO forte e estável (aceleração cheia e constante) e
     ajusta as bordas pro cruzamento de zero (loop contínuo, sem clique). */
  _pickLoop(buf){
    const sr=buf.sampleRate, ch=buf.getChannelData(0), n=ch.length;
    const win=Math.floor(sr*0.05), nb=Math.floor(n/win); const rms=new Float32Array(nb);
    for(let b=0;b<nb;b++){ let s=0; const o=b*win; for(let i=0;i<win;i++){ const x=ch[o+i]; s+=x*x; } rms[b]=Math.sqrt(s/win); }
    const lenB=Math.max(8,Math.floor(3.0/0.05));
    let best=-1, bestScore=-1;
    for(let b=0;b+lenB<nb;b++){
      let m=0; for(let i=0;i<lenB;i++) m+=rms[b+i]; m/=lenB;
      let v=0; for(let i=0;i<lenB;i++){ const d=rms[b+i]-m; v+=d*d; } v=Math.sqrt(v/lenB);
      const score=m - v*1.3;
      if(score>bestScore){ bestScore=score; best=b; }
    }
    if(best<0) best=Math.floor(nb*0.4);
    let s0=best*win, s1=(best+lenB)*win;
    const zc=(i,dir)=>{ for(let k=0;k<win;k++){ const j=i+dir*k; if(j>1&&j<n&&ch[j-1]<=0&&ch[j]>0) return j; } return i; };
    s0=zc(s0,1); s1=zc(s1,-1);
    return [s0/sr, s1/sr];
  }

  update(rpm, throttle, speed, onKerb, dt, gear){
    if(!this.ready) return;
    if(this.ctx.state!=='running'){ this.ctx.resume(); }
    const t=this.ctx.currentTime, T=0.06;
    // PITCH segue o RPM (grave em baixa, agudo na alta) — faixa natural pra soar real
    const rr=Math.max(0, Math.min(1, (rpm-3000)/12000));
    const rate=0.78 + rr*0.85;                                  // ~0.78 .. ~1.63
    if(gear && gear>this.lastGear){                             // corte na troca de marcha
      this.src.playbackRate.cancelScheduledValues(t);
      this.src.playbackRate.setValueAtTime(this.src.playbackRate.value, t);
      this.src.playbackRate.linearRampToValueAtTime(rate*0.9, t+0.05);
      this.src.playbackRate.linearRampToValueAtTime(rate, t+0.2);
    } else this.src.playbackRate.setTargetAtTime(rate, t, T);
    if(gear) this.lastGear=gear;
    this.lp.frequency.setTargetAtTime(1800 + throttle*4200 + rr*3000, t, T);
    const vol=(0.34 + throttle*0.66);
    this.master.gain.setTargetAtTime(vol*(onKerb?1.04:1.0), t, 0.05);
  }
}
