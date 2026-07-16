/* ========================================================================
   RAINHA DAS ESTRELAS — áudio sintetizado (Web Audio API)
   Música COMPOSTA (progressão + melodia + baixo + arpejo + pad), ~3 min,
   estrutura intro→A→B→A'→outro, laço suave. + SFX. Sem arquivos externos.
   ===================================================================== */
const AUDIO = (() => {
  let ctx=null, master=null, musicGain=null, musicWarm=null, sfxGain=null, revGain=null;
  let muted = (localStorage.getItem('rde_mute')==='1');
  const state = {};

  function ensure(){
    if(ctx) return;
    try{ ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return; }
    master = ctx.createGain(); master.gain.value = muted?0:0.9; master.connect(ctx.destination);
    // reverb (impulso sintético, quente)
    const rev = ctx.createConvolver(); rev.buffer = impulse(3.0, 2.4);
    revGain = ctx.createGain(); revGain.gain.value=0.55; rev.connect(revGain); revGain.connect(master);
    state.rev = rev;
    // barramento de MÚSICA com filtro de "calor" (tira o agudo estridente)
    musicWarm = ctx.createBiquadFilter(); musicWarm.type='lowpass'; musicWarm.frequency.value=3200; musicWarm.Q.value=0.4;
    musicGain = ctx.createGain(); musicGain.gain.value = 0.0;   // sobe no fade-in
    musicGain.connect(musicWarm); musicWarm.connect(master);
    // barramento de SFX (limpo)
    sfxGain = ctx.createGain(); sfxGain.gain.value = 0.8; sfxGain.connect(master);
  }
  function impulse(dur, decay){
    const rate=ctx.sampleRate, len=rate*dur, buf=ctx.createBuffer(2,len,rate);
    for(let ch=0;ch<2;ch++){ const d=buf.getChannelData(ch); for(let i=0;i<len;i++){ d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay); } }
    return buf;
  }
  function now(){ return ctx.currentTime; }
  function mtof(m){ return 440*Math.pow(2,(m-69)/12); }
  function panNode(p){ const n=ctx.createStereoPanner?ctx.createStereoPanner():null; if(n)n.pan.value=p; return n; }

  /* ================= VOZES ================= */
  function voicePad(freq,t,dur,gain,pan){
    const o1=ctx.createOscillator(), o2=ctx.createOscillator();
    o1.type='sine'; o2.type='triangle'; o1.frequency.value=freq; o2.frequency.value=freq; o2.detune.value=7;
    const g=ctx.createGain(); g.gain.value=0;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1300;
    const p=panNode(pan)||g;
    o1.connect(g); o2.connect(g); g.connect(lp); lp.connect(p!==g?p:lp);
    (p!==g?p:lp).connect(musicGain); (p!==g?p:lp).connect(state.rev);
    const atk=Math.min(1.1,dur*0.35);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(gain,t+atk);
    g.gain.setValueAtTime(gain,t+dur*0.6); g.gain.exponentialRampToValueAtTime(0.0001,t+dur+1.0);
    o1.start(t); o2.start(t); o1.stop(t+dur+1.1); o2.stop(t+dur+1.1);
  }
  function voiceBass(freq,t,dur,gain){
    const o=ctx.createOscillator(), o2=ctx.createOscillator();
    o.type='sine'; o2.type='sine'; o.frequency.value=freq; o2.frequency.value=freq*2;
    const g=ctx.createGain(), g2=ctx.createGain(); g.gain.value=0; g2.gain.value=0;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=450;
    o.connect(g); o2.connect(g2); g.connect(lp); g2.connect(lp); lp.connect(musicGain);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(gain,t+0.03); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    g2.gain.setValueAtTime(0,t); g2.gain.linearRampToValueAtTime(gain*0.25,t+0.03); g2.gain.exponentialRampToValueAtTime(0.0001,t+dur*0.7);
    o.start(t); o2.start(t); o.stop(t+dur+0.1); o2.stop(t+dur+0.1);
  }
  function voiceArp(freq,t,dur,gain,pan){
    const o=ctx.createOscillator(); o.type='triangle'; o.frequency.value=freq;
    const g=ctx.createGain(); g.gain.value=0;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2600;
    const p=panNode(pan);
    o.connect(g); g.connect(lp); if(p){ lp.connect(p); p.connect(musicGain); p.connect(state.rev);} else { lp.connect(musicGain); lp.connect(state.rev);}
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(gain,t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.start(t); o.stop(t+dur+0.05);
  }
  function voiceLead(freq,t,dur,gain){
    const o=ctx.createOscillator(), o2=ctx.createOscillator();
    o.type='sine'; o2.type='triangle'; o.frequency.value=freq; o2.frequency.value=freq; o2.detune.value=-6;
    // vibrato
    const lfo=ctx.createOscillator(), lfoG=ctx.createGain(); lfo.frequency.value=5.2; lfoG.gain.value=5;
    lfo.connect(lfoG); lfoG.connect(o.detune); lfoG.connect(o2.detune);
    const g=ctx.createGain(); g.gain.value=0;
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=3000;
    o.connect(g); o2.connect(g); g.connect(lp); lp.connect(musicGain); lp.connect(state.rev);
    const atk=Math.min(0.08,dur*0.3), rel=Math.min(0.35,dur*0.5);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(gain,t+atk);
    g.gain.setValueAtTime(gain,t+Math.max(atk,dur-rel)); g.gain.exponentialRampToValueAtTime(0.0001,t+dur+0.15);
    o.start(t); o2.start(t); lfo.start(t); o.stop(t+dur+0.2); o2.stop(t+dur+0.2); lfo.stop(t+dur+0.2);
  }
  function voiceBell(freq,t,gain){
    const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=freq;
    const g=ctx.createGain(); g.gain.value=0;
    o.connect(g); g.connect(musicGain); g.connect(state.rev);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(gain,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+1.8);
    o.start(t); o.stop(t+2.0);
  }
  function playEvent(ev, when){
    const f=mtof(ev.midi);
    if(ev.type==='pad') voicePad(f,when,ev.dur,ev.vel,ev.pan||0);
    else if(ev.type==='bass') voiceBass(f,when,ev.dur,ev.vel);
    else if(ev.type==='arp') voiceArp(f,when,ev.dur,ev.vel,ev.pan||0);
    else if(ev.type==='lead') voiceLead(f,when,ev.dur,ev.vel);
    else if(ev.type==='bell') voiceBell(f,when,ev.vel);
  }

  /* ================= A COMPOSIÇÃO ================= */
  // tríades (registro médio) e melodias cantáveis por segmento (8 tempos = 2 compassos)
  const CH = { Am:[57,60,64], F:[53,57,60], C:[48,52,55], G:[55,59,62], Dm:[50,53,57], E:[52,56,59] };
  // melodias: [midi, duração em tempos]; 0 = pausa
  const MEL = {
    iC:[[0,4],[72,2],[76,2]], iG:[[79,2],[76,2],[74,4]],
    A1:[[76,2],[74,1],[72,1],[69,2],[72,2]], A2:[[77,2],[76,2],[74,2],[72,2]],
    A3:[[72,3],[74,1],[76,2],[79,2]],        A4:[[79,2],[76,2],[74,4]],
    A5:[[72,1],[74,1],[76,2],[81,2],[79,2]], A6:[[77,2],[81,2],[79,2],[77,2]],
    A7:[[76,2],[74,2],[72,2],[69,2]],        A8:[[71,2],[68,2],[69,3],[0,1]],
    B1:[[79,2],[76,2],[72,2],[76,2]],        B2:[[74,2],[79,2],[76,4]],
    B3:[[81,2],[79,2],[76,2],[72,2]],        B4:[[77,4],[76,2],[74,2]],
    B5:[[72,2],[76,2],[79,2],[84,2]],        B6:[[83,2],[79,2],[74,4]],
    B7:[[77,2],[81,2],[77,2],[76,2]],        B8:[[74,2],[71,2],[74,3],[0,1]],
  };
  // sequência de acordes com melodia. bell:true marca uma badalada no início do segmento
  const SONG = [
    // intro (sem lead nos 2 primeiros, entrando devagar)
    ['Am',null,true],['F',null], ['C','iC'], ['G','iG'],
    // tema A
    ['Am','A1',true],['F','A2'],['C','A3'],['G','A4'],['Am','A5'],['F','A6'],['Dm','A7'],['E','A8'],
    // tema B
    ['C','B1',true],['G','B2'],['Am','B3'],['F','B4'],['C','B5'],['G','B6'],['F','B7'],['G','B8'],
    // reprise A'
    ['Am','A1',true],['F','A2'],['C','A3'],['G','A4'],['Am','A5'],['F','A6'],['Dm','A7'],['E','A8'],
    // outro
    ['Am','A1'],['F','A2'],['C',null],['G',null,true],
  ];

  const songCache={};
  function buildSong(cfg){
    if(songCache[cfg.key]) return songCache[cfg.key];
    const bpm=cfg.bpm, tr=cfg.transpose, beat=60/bpm, bar=4*beat, seg=2*bar; // seg = 8 tempos
    const ev=[]; let t=0;
    SONG.forEach(([name,melKey,bell])=>{
      const notes=CH[name].map(n=>n+tr);
      // pad (tríade sustentada)
      notes.forEach((n,i)=> ev.push({type:'pad',midi:n,t,dur:seg,vel:0.11-i*0.008,pan:(i-1)*0.35}));
      // baixo: raiz(2) raiz(2) quinta(2) raiz(2)
      const bR=notes[0]-12, bF=notes[0]-12+7;
      [[bR,0,2],[bR,2,2],[bF,4,2],[bR,6,2]].forEach(([m,b,d])=> ev.push({type:'bass',midi:m,t:t+b*beat,dur:d*beat*0.92,vel:0.20}));
      // arpejo: colcheias (16) subindo/descendo pelas notas do acorde, uma oitava acima
      const at=[notes[0]+12,notes[1]+12,notes[2]+12,notes[1]+12];
      for(let e=0;e<16;e++){ const oc=(e%8>=4)?12:0; ev.push({type:'arp',midi:at[e%4]+ (oc&&e%2? 0:0), t:t+e*0.5*beat, dur:0.46*beat, vel:0.055, pan:(e%2?0.32:-0.32)}); }
      // bell opcional
      if(bell) ev.push({type:'bell',midi:notes[2]+24,t,vel:0.09});
      // melodia
      if(melKey && MEL[melKey]){ let mt=0; MEL[melKey].forEach(([m,d])=>{ if(m>0) ev.push({type:'lead',midi:m+tr,t:t+mt*beat,dur:d*beat*0.96,vel:cfg.leadGain}); mt+=d; }); }
      t+=seg;
    });
    const out={events:ev.sort((a,b)=>a.t-b.t), length:t};
    songCache[cfg.key]=out; return out;
  }

  const MOODCFG = {
    calm:  {key:'calm',  transpose:0,  bpm:66, warmth:3100, leadGain:0.19},
    court: {key:'court', transpose:0,  bpm:72, warmth:3500, leadGain:0.19},
    hope:  {key:'hope',  transpose:3,  bpm:76, warmth:4200, leadGain:0.21},
    tense: {key:'tense', transpose:-3, bpm:60, warmth:2300, leadGain:0.15},
    dread: {key:'dread', transpose:-5, bpm:54, warmth:1800, leadGain:0.13},
  };

  /* ================= PLAYER (agenda com lookahead + laço) ================= */
  let sched=null, curMood=null, song=null, songStart=0, evIdx=0, fadeT=null;
  function scheduler(){
    if(!ctx||!song){ return; }
    const ahead = ctx.currentTime + 0.25;
    while(evIdx<song.events.length){
      const et=songStart+song.events[evIdx].t;
      if(et<ahead){ playEvent(song.events[evIdx], et); evIdx++; } else break;
    }
    if(evIdx>=song.events.length && ctx.currentTime > songStart + song.length - 0.15){
      songStart += song.length; evIdx=0;    // laço suave
    }
    sched=setTimeout(scheduler, 60);
  }
  function music(mood){
    ensure(); if(!ctx) return; if(ctx.state==='suspended') ctx.resume();
    const cfg = MOODCFG[mood]||MOODCFG.court;
    if(curMood===cfg.key && sched) return;
    const wasPlaying = !!sched;
    curMood=cfg.key;
    const startNew=()=>{
      if(sched){ clearTimeout(sched); sched=null; }
      song=buildSong(cfg); songStart=ctx.currentTime+0.15; evIdx=0;
      if(musicWarm) musicWarm.frequency.setTargetAtTime(cfg.warmth, ctx.currentTime, 0.5);
      scheduler();
      // fade-in
      musicGain.gain.cancelScheduledValues(ctx.currentTime);
      musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime+2.2);
    };
    if(wasPlaying){ // fade-out suave, depois troca
      musicGain.gain.cancelScheduledValues(ctx.currentTime);
      musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.0, ctx.currentTime+0.9);
      clearTimeout(fadeT); fadeT=setTimeout(startNew, 950);
    } else startNew();
  }
  function stopMusic(){ if(sched){ clearTimeout(sched); sched=null; } if(fadeT) clearTimeout(fadeT);
    if(musicGain&&ctx){ musicGain.gain.cancelScheduledValues(ctx.currentTime); musicGain.gain.setValueAtTime(musicGain.gain.value,ctx.currentTime); musicGain.gain.linearRampToValueAtTime(0,ctx.currentTime+0.8); }
    curMood=null; song=null; }

  /* ================= SFX ================= */
  function tone(freq, t0, dur, {type='sine', gain=0.2, atk=0.02, rel=0.3, detune=0, pan=0, rev=0}={}){
    if(!ctx) return;
    const o=ctx.createOscillator(); o.type=type; o.frequency.value=freq; o.detune.value=detune;
    const g=ctx.createGain(); g.gain.value=0; const p=panNode(pan);
    o.connect(g); if(p){ g.connect(p); p.connect(sfxGain); if(rev)p.connect(state.rev);} else { g.connect(sfxGain); if(rev)g.connect(state.rev);}
    g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(gain,t0+atk); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    o.start(t0); o.stop(t0+dur+rel);
  }
  function noise(t0,dur,{gain=0.2,hp=800,lp=6000}={}){
    if(!ctx) return;
    const len=Math.max(1,ctx.sampleRate*dur), b=ctx.createBuffer(1,len,ctx.sampleRate), d=b.getChannelData(0);
    for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    const s=ctx.createBufferSource(); s.buffer=b;
    const f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=(hp+lp)/2; f.Q.value=0.7;
    const g=ctx.createGain(); g.gain.value=0; s.connect(f); f.connect(g); g.connect(sfxGain);
    g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(gain,t0+0.005); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.start(t0); s.stop(t0+dur+0.05);
  }
  const F=(m)=>mtof(m);
  const SFX = {
    swipe(dir){ ensure(); if(!ctx)return; const t=now(); noise(t,0.16,{gain:0.10,hp:600,lp:4000});
      tone(dir>0?520:360, t, 0.16, {type:'sine', gain:0.10, atk:0.005, rel:0.1, pan:dir*0.5}); },
    commit(good){ ensure(); if(!ctx)return; const t=now(); const base=good?F(69):F(64);
      [0,4,7].forEach((s,i)=> tone(base*Math.pow(2,s/12), t+i*0.04, 0.4, {type:'triangle', gain:0.11, atk:0.01, rel:0.3, rev:1})); },
    tick(){ ensure(); if(!ctx)return; tone(880, now(), 0.05, {type:'sine', gain:0.03, atk:0.002, rel:0.03}); },
    ui(){ ensure(); if(!ctx)return; tone(660, now(), 0.08, {type:'sine', gain:0.07, atk:0.003, rel:0.05}); },
    open(){ ensure(); if(!ctx)return; const t=now(); [0,5,7].forEach((s,i)=>tone(F(60)*Math.pow(2,s/12),t+i*0.05,0.3,{type:'sine',gain:0.09,atk:0.01,rel:0.2,rev:1})); },
    whisper(){ ensure(); if(!ctx)return; const t=now(); tone(F(67),t,1.2,{type:'sine',gain:0.045,atk:0.4,rel:0.8,pan:-0.3,rev:1});
      tone(F(70),t+0.2,1.1,{type:'sine',gain:0.04,atk:0.4,rel:0.7,pan:0.3,rev:1}); noise(t,0.8,{gain:0.025,hp:2000,lp:7000}); },
    unlock(){ ensure(); if(!ctx)return; const t=now(); [0,4,7,12].forEach((s,i)=>tone(F(72)*Math.pow(2,s/12),t+i*0.07,0.5,{type:'triangle',gain:0.11,atk:0.01,rel:0.4,rev:1})); },
    warn(){ ensure(); if(!ctx)return; const t=now(); tone(200,t,0.3,{type:'sine',gain:0.1,atk:0.01,rel:0.2}); tone(190,t+0.16,0.3,{type:'sine',gain:0.1,atk:0.01,rel:0.2}); },
    death(){ ensure(); if(!ctx)return; const t=now(); stopMusic();
      [0,-3,-7,-12].forEach((s,i)=>tone(F(57)*Math.pow(2,s/12),t+i*0.12,1.6,{type:'triangle',gain:0.12,atk:0.02,rel:1.2,rev:1}));
      noise(t,1.2,{gain:0.08,hp:100,lp:1200}); },
    crown(){ ensure(); if(!ctx)return; const t=now(); [0,7,12,16,19].forEach((s,i)=>tone(F(64)*Math.pow(2,s/12),t+i*0.09,0.9,{type:'sine',gain:0.09,atk:0.01,rel:0.7,rev:1})); },
    sun(){ ensure(); if(!ctx)return; const t=now(); tone(F(48),t,2.4,{type:'triangle',gain:0.12,atk:0.6,rel:1.8,rev:1});
      [0,4,7,12].forEach((s,i)=>tone(F(60)*Math.pow(2,s/12),t+0.3+i*0.12,1.6,{type:'sine',gain:0.06,atk:0.05,rel:1.2,rev:1})); },
  };

  function toggleMute(){ muted=!muted; localStorage.setItem('rde_mute',muted?'1':'0'); ensure(); if(master) master.gain.setTargetAtTime(muted?0:0.9, now(), 0.1); return muted; }
  function isMuted(){ return muted; }
  function resume(){ ensure(); if(ctx&&ctx.state==='suspended') ctx.resume(); }

  return { music, stopMusic, SFX, toggleMute, isMuted, resume, ensure,
    _dbg:{ build:(m)=>{ ensure(); return buildSong(MOODCFG[m]||MOODCFG.court); }, MOODCFG,
      time:()=>ctx?ctx.currentTime:0, ctxState:()=>ctx?ctx.state:'none' } };
})();
