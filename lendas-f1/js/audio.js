/* ========================================================================
   LENDAS DA F1 — som de motor F1 sintetizado (Web Audio API) — v3.
   Timbre mais quente e cheio (menos "buzz"), grito agudo controlado,
   marchas realistas (fica na faixa alta e cai pouco na troca), troca
   suave, reverb curta. Gostoso de ouvir, não irritante.
   update(rpm, throttle, speedKmh, onKerb, dt, gear).
   ===================================================================== */
export class F1Audio {
  constructor(){ this.ready=false; this.lastGear=1; }

  start(){
    if(this.ready){ if(this.ctx.state!=='running') this.ctx.resume(); return; }
    const Ctx = window.AudioContext||window.webkitAudioContext;
    const ctx = this.ctx = new Ctx();
    try{ const bb=ctx.createBuffer(1,1,22050); const ss=ctx.createBufferSource(); ss.buffer=bb; ss.connect(ctx.destination); ss.start(0); }catch(e){}
    const now = ctx.currentTime;

    // ---- saída: highpass (tira lama) -> lowpass (tira fizz) -> compressor ----
    const master = this.master = ctx.createGain(); master.gain.value=0.0;
    const hp = ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=70;
    const tame = ctx.createBiquadFilter(); tame.type='lowpass'; tame.frequency.value=7200; tame.Q.value=0.4;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value=-12; comp.ratio.value=4; comp.attack.value=0.004; comp.release.value=0.25;
    master.connect(hp); hp.connect(tame); tame.connect(comp); comp.connect(ctx.destination);
    // reverb curta
    const conv = ctx.createConvolver();
    const L=Math.floor(ctx.sampleRate*0.4), imp=ctx.createBuffer(2,L,ctx.sampleRate);
    for(let ch=0;ch<2;ch++){ const d=imp.getChannelData(ch); for(let i=0;i<L;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.8); }
    conv.buffer=imp; const wet=ctx.createGain(); wet.gain.value=0.13;
    tame.connect(conv); conv.connect(wet); wet.connect(comp);

    // ---- filtro do motor (abre com acelerador/rpm) ----
    const lp = this.lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1500; lp.Q.value=0.7;
    const drive = this.drive = ctx.createGain(); drive.gain.value=1.0;
    lp.connect(drive); drive.connect(master);
    // formante (grito) suave
    const formant = this.formant = ctx.createBiquadFilter(); formant.type='bandpass'; formant.frequency.value=2200; formant.Q.value=3.2;
    const formantGain = this.formantGain = ctx.createGain(); formantGain.gain.value=0.4;
    formant.connect(formantGain); formantGain.connect(master);

    // ---- dois bancos harmônicos (corpo + coro) — timbre quente ----
    const partials=[
      {mul:0.5, type:'sine',     g:0.30},   // sub grave (corpo)
      {mul:1.0, type:'sawtooth', g:0.40},   // fundamental
      {mul:2.0, type:'sawtooth', g:0.24},
      {mul:3.0, type:'sawtooth', g:0.15},
      {mul:4.0, type:'triangle', g:0.09},
      {mul:5.0, type:'sawtooth', g:0.05},
    ];
    this.oscs=[];
    const bank=(detune,scale)=>{ for(const p of partials){
      const o=ctx.createOscillator(); o.type=p.type; o.detune.value=detune;
      const g=ctx.createGain(); g.gain.value=p.g*scale;
      o.connect(g); g.connect(lp); if(p.mul>=1) g.connect(formant); o.start(now);
      o._mul=p.mul; this.oscs.push(o);
    }};
    bank(0,1.0); bank(8,0.6);   // segundo banco levemente desafinado (coro)

    // ---- LFO de "firing" suave (textura, sem buzz) ----
    const lfo=ctx.createOscillator(); lfo.type='triangle';
    const lfoGain=ctx.createGain(); lfoGain.gain.value=0.2;
    lfo.connect(lfoGain); lfoGain.connect(drive.gain); lfo.start(now); this.lfo=lfo;

    // ---- ruídos: admissão + vento ----
    const nb=ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
    const nd=nb.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
    this.nbuf=nb;
    const noise=ctx.createBufferSource(); noise.buffer=nb; noise.loop=true;
    const nbp=this.nbp=ctx.createBiquadFilter(); nbp.type='bandpass'; nbp.frequency.value=1500; nbp.Q.value=0.6;
    const ng=this.noiseGain=ctx.createGain(); ng.gain.value=0.0;
    noise.connect(nbp); nbp.connect(ng); ng.connect(master); noise.start(now);
    const wind=ctx.createBufferSource(); wind.buffer=nb; wind.loop=true;
    const whp=ctx.createBiquadFilter(); whp.type='highpass'; whp.frequency.value=3600;
    const wg=this.windGain=ctx.createGain(); wg.gain.value=0.0;
    wind.connect(whp); whp.connect(wg); wg.connect(master); wind.start(now);

    this.lastPop=0; this._kerbT=0;
    this.ready=true;
    master.gain.setTargetAtTime(1.0, now, 0.35);
    if(ctx.state!=='running') ctx.resume();
  }

  burst(dur, freq, Q, vol, type='bandpass'){
    const ctx=this.ctx, t=ctx.currentTime+0.001;
    const s=ctx.createBufferSource(); s.buffer=this.nbuf;
    const f=ctx.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=Q;
    const g=ctx.createGain(); g.gain.value=0;
    s.connect(f); f.connect(g); g.connect(this.master);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+0.005);
    g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    s.start(t); s.stop(t+dur+0.02);
  }

  update(rpm, throttle, speed, onKerb, dt, gear){
    if(!this.ready) return;
    if(this.ctx.state!=='running'){ this.ctx.resume(); return; }
    const ctx=this.ctx, t=ctx.currentTime, T=0.06;             // suavização maior = glide de rpm
    const f0 = rpm/60*3;                                       // fundamental (V6)
    for(const o of this.oscs) o.frequency.setTargetAtTime(f0*o._mul, t, T);
    this.lfo.frequency.setTargetAtTime(f0, t, T);
    // timbre: abre com acelerador+rpm, mas com teto (sem estridência)
    this.lp.frequency.setTargetAtTime(650 + throttle*3400 + (rpm/15000)*2400, t, T);
    // grito controlado
    this.formant.frequency.setTargetAtTime(1400 + (rpm/15000)*2600, t, T);
    this.formantGain.gain.setTargetAtTime(0.22 + throttle*0.26 + (rpm/15000)*0.18, t, T);
    // admissão + vento
    this.noiseGain.gain.setTargetAtTime(0.04 + throttle*0.09*(rpm/15000), t, T);
    this.nbp.frequency.setTargetAtTime(700 + rpm*0.11, t, T);
    this.windGain.gain.setTargetAtTime(Math.min(speed/330,1)*0.11, t, T);
    // volume
    const vol = 0.62 + throttle*0.38;
    this.master.gain.setTargetAtTime(1.0*vol*(onKerb?1.03:1.0), t, 0.06);

    // troca de marcha: corte suave da embreagem (subida)
    if(gear && gear>this.lastGear){
      this.drive.gain.cancelScheduledValues(t);
      this.drive.gain.setValueAtTime(this.drive.gain.value, t);
      this.drive.gain.linearRampToValueAtTime(0.5, t+0.03);
      this.drive.gain.linearRampToValueAtTime(1.0, t+0.16);
    }
    if(gear) this.lastGear=gear;

    // estalos leves no corte (menos frequentes = menos irritante)
    if(throttle<0.12 && rpm>9000 && (t-this.lastPop)>0.08 && Math.random()<0.4){
      this.lastPop=t; this.burst(0.08, 1000+Math.random()*1300, 1.8, 0.35);
    }
    // rumble na zebra
    if(onKerb && (t-this._kerbT)>0.05){ this._kerbT=t; this.burst(0.05, 150, 0.7, 0.4, 'lowpass'); }
  }
}
