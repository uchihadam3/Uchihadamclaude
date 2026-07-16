/* ========================================================================
   RAINHA DAS ESTRELAS — áudio sintetizado (Web Audio API)
   Temas ambientes generativos por "clima" + SFX. Sem arquivos externos.
   ===================================================================== */
const AUDIO = (() => {
  let ctx=null, master=null, musicGain=null, sfxGain=null, started=false;
  let muted = (localStorage.getItem('rde_mute')==='1');
  let seq=null, curMood=null;
  const state = {};

  function ensure(){
    if(ctx) return;
    try{ ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return; }
    master = ctx.createGain(); master.gain.value = muted?0:0.9; master.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value = 0.42; musicGain.connect(master);
    sfxGain = ctx.createGain(); sfxGain.gain.value = 0.85; sfxGain.connect(master);
    // gentle reverb (convolver with synthetic impulse)
    const rev = ctx.createConvolver(); rev.buffer = impulse(2.6, 2.2);
    const revGain = ctx.createGain(); revGain.gain.value=0.5; rev.connect(revGain); revGain.connect(master);
    state.rev = rev;
  }
  function impulse(dur, decay){
    const rate=ctx.sampleRate, len=rate*dur, buf=ctx.createBuffer(2,len,rate);
    for(let ch=0;ch<2;ch++){ const d=buf.getChannelData(ch); for(let i=0;i<len;i++){ d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay); } }
    return buf;
  }
  function now(){ return ctx.currentTime; }

  // ---- basic voice ----
  function tone(freq, t0, dur, {type='sine', gain=0.2, atk=0.02, rel=0.3, detune=0, to=null, pan=0, rev=0}={}){
    if(!ctx) return;
    const o=ctx.createOscillator(); o.type=type; o.frequency.value=freq; o.detune.value=detune;
    const g=ctx.createGain(); g.gain.value=0;
    const p=ctx.createStereoPanner? ctx.createStereoPanner():null; if(p) p.pan.value=pan;
    o.connect(g); if(p){ g.connect(p); p.connect(to||musicGain); if(rev&&state.rev){ p.connect(state.rev); } }
    else { g.connect(to||musicGain); if(rev&&state.rev) g.connect(state.rev); }
    g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(gain,t0+atk);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    o.start(t0); o.stop(t0+dur+rel);
  }
  function noise(t0,dur,{gain=0.2,hp=800,lp=6000,to=null}={}){
    if(!ctx) return;
    const len=Math.max(1,ctx.sampleRate*dur), b=ctx.createBuffer(1,len,ctx.sampleRate), d=b.getChannelData(0);
    for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    const s=ctx.createBufferSource(); s.buffer=b;
    const f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=(hp+lp)/2; f.Q.value=0.7;
    const g=ctx.createGain(); g.gain.value=0; s.connect(f); f.connect(g); g.connect(to||sfxGain);
    g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(gain,t0+0.005); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.start(t0); s.stop(t0+dur+0.05);
  }

  // ---- MUSIC: generative pad + arpeggio by mood ----
  const MOODS = {
    calm:   { root:220.00, scale:[0,3,5,7,10], padType:'sine',    tempo:2.4, bright:0.5, arp:0.3 },
    court:  { root:196.00, scale:[0,2,4,7,9],  padType:'triangle', tempo:2.0, bright:0.6, arp:0.5 },
    tense:  { root:174.61, scale:[0,1,5,6,8],  padType:'sawtooth', tempo:1.5, bright:0.35,arp:0.6 },
    sacred: { root:261.63, scale:[0,4,7,11,14],padType:'sine',    tempo:2.8, bright:0.75,arp:0.4 },
    dread:  { root:130.81, scale:[0,1,3,6,7],  padType:'sawtooth', tempo:1.8, bright:0.2, arp:0.7 },
    hope:   { root:293.66, scale:[0,2,4,7,9,11],padType:'triangle',tempo:2.2,bright:0.8, arp:0.5 },
  };
  function midiF(root, semis){ return root*Math.pow(2, semis/12); }

  function schedule(){
    if(!ctx||!curMood) return;
    const m = MOODS[curMood]||MOODS.calm; const t=now();
    // pad chord (root + fifth + third)
    const chordSemis = [m.scale[0], m.scale[2], m.scale[3]];
    chordSemis.forEach((s,i)=>{ tone(midiF(m.root,s-12), t, m.tempo*2.2, {type:m.padType, gain:0.06+i*0.005, atk:m.tempo*0.6, rel:1.2, pan:(i-1)*0.4, rev:1}); });
    // shimmer high
    tone(midiF(m.root, m.scale[4]+12), t, m.tempo*1.6, {type:'sine', gain:0.03*m.bright, atk:0.5, rel:1, pan:0.5, rev:1});
    // arpeggio sparkles
    const steps=4;
    for(let i=0;i<steps;i++){ if(Math.random()>m.arp) continue;
      const s = m.scale[(Math.random()*m.scale.length)|0] + (Math.random()<0.4?12:0);
      tone(midiF(m.root,s), t+i*(m.tempo/steps), 0.5, {type:'triangle', gain:0.04*m.bright, atk:0.01, rel:0.4, pan:(Math.random()-0.5)*0.8, rev:1});
    }
    // occasional low pulse
    if(Math.random()<0.5) tone(midiF(m.root,m.scale[0]-24), t, m.tempo*1.4, {type:'sine', gain:0.1, atk:0.1, rel:0.6});
    seq = setTimeout(schedule, m.tempo*1000);
  }
  function music(mood){
    ensure(); if(!ctx) return; if(ctx.state==='suspended') ctx.resume();
    if(mood===curMood && seq) return;
    curMood=mood; if(seq){ clearTimeout(seq); seq=null; }
    started=true; schedule();
  }
  function stopMusic(){ if(seq){ clearTimeout(seq); seq=null; } curMood=null; }

  // ---- SFX ----
  const SFX = {
    swipe(dir){ ensure(); if(!ctx)return; const t=now(); noise(t,0.18,{gain:0.12,hp:600,lp:4000});
      tone(dir>0?520:360, t, 0.18, {type:'sine', gain:0.12, atk:0.005, rel:0.1, pan:dir*0.5, to:sfxGain}); },
    commit(good){ ensure(); if(!ctx)return; const t=now(); const base=good?440:330;
      [0,4,7].forEach((s,i)=> tone(midiF(base,s), t+i*0.04, 0.4, {type:'triangle', gain:0.14, atk:0.01, rel:0.3, to:sfxGain, rev:1})); },
    tick(){ ensure(); if(!ctx)return; tone(880, now(), 0.05, {type:'square', gain:0.04, atk:0.002, rel:0.03, to:sfxGain}); },
    ui(){ ensure(); if(!ctx)return; tone(660, now(), 0.08, {type:'sine', gain:0.08, atk:0.003, rel:0.05, to:sfxGain}); },
    open(){ ensure(); if(!ctx)return; const t=now(); [0,5,7].forEach((s,i)=>tone(midiF(330,s),t+i*0.05,0.3,{type:'sine',gain:0.1,atk:0.01,rel:0.2,to:sfxGain,rev:1})); },
    whisper(){ ensure(); if(!ctx)return; const t=now(); tone(midiF(196,7),t,1.2,{type:'sine',gain:0.05,atk:0.4,rel:0.8,pan:-0.3,to:sfxGain,rev:1});
      tone(midiF(196,10),t+0.2,1.1,{type:'sine',gain:0.04,atk:0.4,rel:0.7,pan:0.3,to:sfxGain,rev:1}); noise(t,0.9,{gain:0.03,hp:2000,lp:7000}); },
    unlock(){ ensure(); if(!ctx)return; const t=now(); [0,4,7,12].forEach((s,i)=>tone(midiF(523,s),t+i*0.07,0.5,{type:'triangle',gain:0.13,atk:0.01,rel:0.4,to:sfxGain,rev:1})); },
    warn(){ ensure(); if(!ctx)return; const t=now(); tone(200,t,0.3,{type:'sawtooth',gain:0.12,atk:0.01,rel:0.2,to:sfxGain}); tone(190,t+0.16,0.3,{type:'sawtooth',gain:0.12,atk:0.01,rel:0.2,to:sfxGain}); },
    death(){ ensure(); if(!ctx)return; const t=now(); stopMusic();
      [0,-3,-7,-12].forEach((s,i)=>tone(midiF(220,s),t+i*0.12,1.6,{type:'sawtooth',gain:0.14,atk:0.02,rel:1.2,to:master,rev:1}));
      noise(t,1.4,{gain:0.1,hp:100,lp:1200}); },
    crown(){ ensure(); if(!ctx)return; const t=now(); [0,7,12,16,19].forEach((s,i)=>tone(midiF(392,s),t+i*0.09,0.9,{type:'sine',gain:0.1,atk:0.01,rel:0.7,to:master,rev:1})); },
    sun(){ ensure(); if(!ctx)return; const t=now(); tone(midiF(130,0),t,2.4,{type:'sawtooth',gain:0.14,atk:0.6,rel:1.8,to:master,rev:1});
      let f=200; for(let i=0;i<40;i++) tone(f+=Math.random()*40,t+i*0.05,0.3,{type:'sine',gain:0.02,atk:0.01,rel:0.2,pan:Math.random()-0.5,to:master}); },
  };

  function toggleMute(){ muted=!muted; localStorage.setItem('rde_mute',muted?'1':'0'); ensure(); if(master) master.gain.setTargetAtTime(muted?0:0.9, now(), 0.1); return muted; }
  function isMuted(){ return muted; }
  function resume(){ ensure(); if(ctx&&ctx.state==='suspended') ctx.resume(); }

  return { music, stopMusic, SFX, toggleMute, isMuted, resume, ensure };
})();
