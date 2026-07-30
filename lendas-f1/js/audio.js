/* ========================================================================
   LENDAS DA F1 — som de motor F1 sintetizado (Web Audio API).
   Motor multi-harmônico com RPM/marchas, admissão (ruído), estalos no
   corte de giro (overrun) e ruído de vento/pneu com a velocidade.
   Dirigido por update(rpm, throttle, speedKmh, onKerb).
   ===================================================================== */
export class F1Audio {
  constructor(){ this.ready=false; }

  start(){
    if(this.ready) { if(this.ctx.state!=='running') this.ctx.resume(); return; }
    const Ctx = window.AudioContext||window.webkitAudioContext;
    const ctx = this.ctx = new Ctx();
    // desbloqueio iOS/Safari: toca um buffer silencioso dentro do gesto
    try{ const b=ctx.createBuffer(1,1,22050); const s=ctx.createBufferSource();
      s.buffer=b; s.connect(ctx.destination); s.start(0); }catch(e){}
    const now = ctx.currentTime;

    // ---- master ----
    const master = this.master = ctx.createGain(); master.gain.value=0.0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value=-14; comp.ratio.value=6; comp.attack.value=0.003; comp.release.value=0.25;
    master.connect(comp); comp.connect(ctx.destination);

    // ---- corpo do motor: banco de osciladores harmônicos ----
    // fundamental controlada por this.f0. Cada parcial num ganho próprio.
    this.oscs=[]; this.gains=[];
    const partials=[
      {mul:0.5, type:'sawtooth', g:0.20},  // sub / ronco grave
      {mul:1.0, type:'sawtooth', g:0.42},  // fundamental
      {mul:2.0, type:'sawtooth', g:0.30},
      {mul:3.0, type:'square',   g:0.16},
      {mul:4.0, type:'sawtooth', g:0.12},
      {mul:6.0, type:'square',   g:0.07},  // agudo estridente (grito do motor)
    ];
    // filtro que abre com o acelerador (timbre "aberto" a fundo)
    const lp = this.lp = ctx.createBiquadFilter(); lp.type='lowpass';
    lp.frequency.value=1200; lp.Q.value=0.8;
    const drive = this.drive = ctx.createGain(); drive.gain.value=1.0;
    lp.connect(drive); drive.connect(master);

    for(const p of partials){
      const o=ctx.createOscillator(); o.type=p.type;
      const g=ctx.createGain(); g.gain.value=p.g;
      o.connect(g); g.connect(lp); o.start(now);
      o._mul=p.mul; o._base=p.g; this.oscs.push(o); this.gains.push(g);
    }

    // ---- LFO de "firing" (dá a textura brap-brap-brap) ----
    const lfo=ctx.createOscillator(); lfo.type='sawtooth';
    const lfoGain=ctx.createGain(); lfoGain.gain.value=0.35;
    const lfoDepth=ctx.createGain();               // modula o 'drive'
    lfo.connect(lfoGain); lfoGain.connect(drive.gain); lfo.start(now);
    this.lfo=lfo;

    // ---- admissão / escape: ruído filtrado ----
    const noiseBuf=ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
    const nd=noiseBuf.getChannelData(0);
    for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
    const noise=ctx.createBufferSource(); noise.buffer=noiseBuf; noise.loop=true;
    const nbp=ctx.createBiquadFilter(); nbp.type='bandpass'; nbp.frequency.value=1600; nbp.Q.value=0.7;
    const ng=this.noiseGain=ctx.createGain(); ng.gain.value=0.0;
    noise.connect(nbp); nbp.connect(ng); ng.connect(master); noise.start(now);
    this.nbp=nbp;

    // ---- vento / pneu (ruído agudo com a velocidade) ----
    const wind=ctx.createBufferSource(); wind.buffer=noiseBuf; wind.loop=true;
    const whp=ctx.createBiquadFilter(); whp.type='highpass'; whp.frequency.value=3200;
    const wg=this.windGain=ctx.createGain(); wg.gain.value=0.0;
    wind.connect(whp); whp.connect(wg); wg.connect(master); wind.start(now);

    // ---- estalos de corte (overrun pops) ----
    this.crackleNoise=noiseBuf;
    this.lastPop=0;

    this.ready=true;
    master.gain.setTargetAtTime(0.9, now, 0.4);
    if(ctx.state!=='running') ctx.resume();     // garante o start dentro do gesto
  }

  // rpm: 4000..15000 | throttle: 0..1 | speed km/h | onKerb bool
  update(rpm, throttle, speed, onKerb, dt){
    if(!this.ready) return;
    if(this.ctx.state!=='running'){ this.ctx.resume(); return; }
    const ctx=this.ctx, t=ctx.currentTime, T=0.03;
    // fundamental ~ rpm/60 * 3 firings (V6) -> 200..750 Hz
    const f0 = rpm/60*3;
    for(const o of this.oscs) o.frequency.setTargetAtTime(f0*o._mul, t, T);
    // LFO de firing acompanha as explosões
    this.lfo.frequency.setTargetAtTime(f0, t, T);
    // filtro abre com acelerador e rpm (mais brilho a fundo)
    const cut = 700 + throttle*4200 + (rpm/15000)*2500;
    this.lp.frequency.setTargetAtTime(cut, t, T);
    // admissão sobe com rpm+acelerador
    this.noiseGain.gain.setTargetAtTime(0.05 + throttle*0.10*(rpm/15000), t, T);
    this.nbp.frequency.setTargetAtTime(800 + rpm*0.12, t, T);
    // vento/pneu com a velocidade
    this.windGain.gain.setTargetAtTime(Math.min(speed/330,1)*0.12, t, T);
    // volume geral: mais alto a fundo, mantém corpo no motor freio
    const vol = 0.55 + throttle*0.45;
    this.drive.gain.value; // (modulado pelo LFO; base ajustada abaixo)
    this.master.gain.setTargetAtTime(0.9*vol*(onKerb?1.05:1.0), t, 0.05);

    // estalos no corte (throttle baixo + rpm alto) — "trá-tá-tá"
    if(throttle<0.15 && rpm>8000 && (t-this.lastPop)>0.06 && Math.random()<0.5){
      this.lastPop=t;
      const pop=this.ctx.createBufferSource(); pop.buffer=this.crackleNoise;
      const pg=this.ctx.createGain(); pg.gain.value=0.0;
      const pf=this.ctx.createBiquadFilter(); pf.type='bandpass'; pf.frequency.value=1200+Math.random()*1500; pf.Q.value=2;
      pop.connect(pf); pf.connect(pg); pg.connect(this.master);
      const s=t+0.001;
      pg.gain.setValueAtTime(0.0,s); pg.gain.linearRampToValueAtTime(0.5,s+0.005);
      pg.gain.exponentialRampToValueAtTime(0.001,s+0.09);
      pop.start(s); pop.stop(s+0.1);
    }
    // rumble na zebra
    if(onKerb && (t-(this._kerbT||0))>0.04){
      this._kerbT=t;
      const k=this.ctx.createBufferSource(); k.buffer=this.crackleNoise;
      const kg=this.ctx.createGain(); kg.gain.value=0.0;
      const kf=this.ctx.createBiquadFilter(); kf.type='lowpass'; kf.frequency.value=180;
      k.connect(kf); kf.connect(kg); kg.connect(this.master);
      const s=t+0.001; kg.gain.setValueAtTime(0.4,s); kg.gain.exponentialRampToValueAtTime(0.001,s+0.05);
      k.start(s); k.stop(s+0.06);
    }
  }
}
