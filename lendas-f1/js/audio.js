/* ========================================================================
   LENDAS DA F1 — som de motor F1 sintetizado (Web Audio API) — v2.
   Dois bancos de osciladores levemente desafinados (corpo/coro), formante
   ressonante que varia com o giro (o "grito"), admissão, estalos no corte,
   troca de marcha, vento/pneu e uma reverberação curta pra dar espaço.
   Dirigido por update(rpm, throttle, speedKmh, onKerb, dt, gear).
   ===================================================================== */
export class F1Audio {
  constructor(){ this.ready=false; this.lastGear=1; }

  start(){
    if(this.ready){ if(this.ctx.state!=='running') this.ctx.resume(); return; }
    const Ctx = window.AudioContext||window.webkitAudioContext;
    const ctx = this.ctx = new Ctx();
    // desbloqueio iOS/Safari
    try{ const bb=ctx.createBuffer(1,1,22050); const ss=ctx.createBufferSource(); ss.buffer=bb; ss.connect(ctx.destination); ss.start(0); }catch(e){}
    const now = ctx.currentTime;

    // ---- saída: compressor + reverb curta ----
    const master = this.master = ctx.createGain(); master.gain.value=0.0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value=-12; comp.ratio.value=5; comp.attack.value=0.003; comp.release.value=0.2;
    master.connect(comp); comp.connect(ctx.destination);
    // reverb (impulso curto)
    const conv = ctx.createConvolver();
    const L=Math.floor(ctx.sampleRate*0.45), imp=ctx.createBuffer(2,L,ctx.sampleRate);
    for(let ch=0;ch<2;ch++){ const d=imp.getChannelData(ch);
      for(let i=0;i<L;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.6); }
    conv.buffer=imp;
    const wet=ctx.createGain(); wet.gain.value=0.16;
    master.connect(conv); conv.connect(wet); wet.connect(comp);

    // ---- filtro geral (abre com acelerador/rpm) ----
    const lp = this.lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1400; lp.Q.value=0.9;
    const drive = this.drive = ctx.createGain(); drive.gain.value=1.0;
    lp.connect(drive); drive.connect(master);
    // formante ressonante em paralelo (o "grito" agudo do motor)
    const formant = this.formant = ctx.createBiquadFilter(); formant.type='bandpass'; formant.frequency.value=2200; formant.Q.value=5.5;
    const formantGain = this.formantGain = ctx.createGain(); formantGain.gain.value=0.5;
    formant.connect(formantGain); formantGain.connect(master);

    // ---- dois bancos de osciladores (A afinado, B desafinado = coro) ----
    const partials=[
      {mul:0.5, type:'sawtooth', g:0.22},
      {mul:1.0, type:'sawtooth', g:0.40},
      {mul:2.0, type:'sawtooth', g:0.30},
      {mul:3.0, type:'square',   g:0.18},
      {mul:4.0, type:'sawtooth', g:0.13},
      {mul:6.0, type:'square',   g:0.09},
      {mul:8.0, type:'sawtooth', g:0.05},
    ];
    this.oscs=[];
    const bank=(detune)=>{ for(const p of partials){
      const o=ctx.createOscillator(); o.type=p.type; o.detune.value=detune;
      const g=ctx.createGain(); g.gain.value=p.g*(detune?0.7:1.0);
      o.connect(g); g.connect(lp); g.connect(formant); o.start(now);
      o._mul=p.mul; this.oscs.push(o);
    }};
    bank(0); bank(9);   // segundo banco +9 cents

    // ---- LFO de "firing" (textura brap-brap) ----
    const lfo=ctx.createOscillator(); lfo.type='sawtooth';
    const lfoGain=ctx.createGain(); lfoGain.gain.value=0.4;
    lfo.connect(lfoGain); lfoGain.connect(drive.gain); lfo.start(now); this.lfo=lfo;

    // ---- ruídos: admissão + vento ----
    const nb=ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
    const nd=nb.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
    this.nbuf=nb;
    const noise=ctx.createBufferSource(); noise.buffer=nb; noise.loop=true;
    const nbp=this.nbp=ctx.createBiquadFilter(); nbp.type='bandpass'; nbp.frequency.value=1600; nbp.Q.value=0.7;
    const ng=this.noiseGain=ctx.createGain(); ng.gain.value=0.0;
    noise.connect(nbp); nbp.connect(ng); ng.connect(master); noise.start(now);
    const wind=ctx.createBufferSource(); wind.buffer=nb; wind.loop=true;
    const whp=ctx.createBiquadFilter(); whp.type='highpass'; whp.frequency.value=3400;
    const wg=this.windGain=ctx.createGain(); wg.gain.value=0.0;
    wind.connect(whp); whp.connect(wg); wg.connect(master); wind.start(now);

    this.lastPop=0; this._kerbT=0;
    this.ready=true;
    master.gain.setTargetAtTime(1.0, now, 0.35);
    if(ctx.state!=='running') ctx.resume();
  }

  burst(dur, freq, Q, vol, type='bandpass', lp=false){
    const ctx=this.ctx, t=ctx.currentTime+0.001;
    const s=ctx.createBufferSource(); s.buffer=this.nbuf;
    const f=ctx.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=Q;
    const g=ctx.createGain(); g.gain.value=0;
    s.connect(f); f.connect(g); g.connect(this.master);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+0.004);
    g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    s.start(t); s.stop(t+dur+0.02);
  }

  update(rpm, throttle, speed, onKerb, dt, gear){
    if(!this.ready) return;
    if(this.ctx.state!=='running'){ this.ctx.resume(); return; }
    const ctx=this.ctx, t=ctx.currentTime, T=0.035;
    const f0 = rpm/60*3;                                   // fundamental (V6) ~200..750 Hz
    for(const o of this.oscs) o.frequency.setTargetAtTime(f0*o._mul, t, T);
    this.lfo.frequency.setTargetAtTime(f0, t, T);
    // timbre abre a fundo
    this.lp.frequency.setTargetAtTime(700 + throttle*4600 + (rpm/15000)*3000, t, T);
    // formante (grito) sobe com o giro
    this.formant.frequency.setTargetAtTime(1500 + (rpm/15000)*3200, t, T);
    this.formantGain.gain.setTargetAtTime(0.28 + throttle*0.35 + (rpm/15000)*0.25, t, T);
    // admissão + vento
    this.noiseGain.gain.setTargetAtTime(0.05 + throttle*0.11*(rpm/15000), t, T);
    this.nbp.frequency.setTargetAtTime(800 + rpm*0.12, t, T);
    this.windGain.gain.setTargetAtTime(Math.min(speed/330,1)*0.13, t, T);
    // volume geral
    const vol = 0.6 + throttle*0.4;
    this.master.gain.setTargetAtTime(1.0*vol*(onKerb?1.05:1.0), t, 0.05);

    // troca de marcha: dip curtinho no som (corte da embreagem)
    if(gear && gear>this.lastGear){
      this.drive.gain.cancelScheduledValues(t);
      this.drive.gain.setValueAtTime(this.drive.gain.value, t);
      this.drive.gain.linearRampToValueAtTime(0.25, t+0.02);
      this.drive.gain.linearRampToValueAtTime(1.0, t+0.14);
      this.burst(0.05, 2500, 3, 0.25);                     // "chip" da troca
    }
    if(gear) this.lastGear=gear;

    // estalos no corte de giro (overrun)
    if(throttle<0.15 && rpm>7500 && (t-this.lastPop)>0.05 && Math.random()<0.6){
      this.lastPop=t; this.burst(0.09, 1200+Math.random()*1600, 2.2, 0.5);
    }
    // rumble na zebra
    if(onKerb && (t-this._kerbT)>0.045){ this._kerbT=t; this.burst(0.05, 170, 0.8, 0.5, 'lowpass'); }
  }
}
