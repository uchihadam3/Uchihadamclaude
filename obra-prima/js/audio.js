/* ========================================================================
   OBRA-PRIMA — motor de ÁUDIO (Web Audio, 100% sintetizado)
   • SFX de impacto realistas por material (força modula brilho/volume)
   • colapso, contato, UI, vitória/derrota/estrela
   • música ambiente generativa (lo-fi/chill), longa e evolutiva
   ===================================================================== */
export const AUDIO = (() => {
  let ctx, master, reverb, delay, delayFb, musicBus, sfxBus, muted=false, musicOn=false;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const NF=n=>440*Math.pow(2,(n-69)/12);   // midi → Hz

  /* ---------- infra ---------- */
  function ensure(){
    if(ctx) return true;
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return false;
    ctx=new AC();
    master=ctx.createGain(); master.gain.value=0.85; master.connect(ctx.destination);
    // reverb (IR sintética)
    reverb=ctx.createConvolver(); const len=(ctx.sampleRate*2.6)|0, ib=ctx.createBuffer(2,len,ctx.sampleRate);
    for(let ch=0;ch<2;ch++){ const d=ib.getChannelData(ch); for(let i=0;i<len;i++){ const t=i/len; d[i]=(Math.random()*2-1)*Math.pow(1-t,2.7); } }
    reverb.buffer=ib; const rvG=ctx.createGain(); rvG.gain.value=0.9; reverb.connect(rvG).connect(master);
    // delay (eco suave p/ melodia)
    delay=ctx.createDelay(1.0); delay.delayTime.value=0.38; delayFb=ctx.createGain(); delayFb.gain.value=0.32;
    const dLP=ctx.createBiquadFilter(); dLP.type='lowpass'; dLP.frequency.value=2600;
    delay.connect(dLP).connect(delayFb).connect(delay); const dOut=ctx.createGain(); dOut.gain.value=0.5; delay.connect(dOut).connect(reverb); delay.connect(dOut).connect(master);
    // buses
    musicBus=ctx.createGain(); musicBus.gain.value=0.0; musicBus.connect(master);
    sfxBus=ctx.createGain();   sfxBus.gain.value=0.9;   sfxBus.connect(master);
    ctx._reverb=reverb; ctx._delay=delay;
    return true;
  }
  function resume(){ if(!ensure())return; if(ctx.state==='suspended') ctx.resume(); }
  function setMuted(m){ muted=m; if(master) master.gain.setTargetAtTime(m?0:0.85, ctx.currentTime, 0.02); }
  function toggleMute(){ setMuted(!muted); return muted; }
  const now=()=>ctx.currentTime;
  function send(node, busGain, verb, dly){ node.connect(busGain);
    if(verb){ const s=ctx.createGain(); s.gain.value=verb; node.connect(s); s.connect(reverb); }
    if(dly){ const s=ctx.createGain(); s.gain.value=dly; node.connect(s); s.connect(delay); } }
  let _noise; function noiseSrc(){ if(!_noise){ _noise=ctx.createBuffer(1,(ctx.sampleRate*0.6)|0,ctx.sampleRate); const d=_noise.getChannelData(0); for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1; } const s=ctx.createBufferSource(); s.buffer=_noise; s.loop=true; return s; }

  /* ---------- SFX: impacto por material ---------- */
  const MAT={
    madeira:  {base:225, part:[1,2.76,5.4],   dec:0.17, noise:0.55, cut:3400, type:'triangle'},
    caixote:  {base:172, part:[1,2.0,3.1,4.6], dec:0.22, noise:0.7,  cut:2600, type:'triangle', hollow:150},
    pedra:    {base:130, part:[1,1.62],        dec:0.09, noise:0.85, cut:1200, type:'sine'},
    concreto: {base:104, part:[1,1.5],         dec:0.08, noise:0.9,  cut:950,  type:'sine'},
    metal:    {base:340, part:[1,2.76,5.41,8.9],dec:0.85,noise:0.28, cut:6000, type:'sine', ring:1},
    gelo:     {base:920, part:[1,2.1,3.35],    dec:0.13, noise:0.45, cut:8000, type:'sine', bright:1},
    borracha: {base:96,  part:[1,1.9],         dec:0.15, noise:0.35, cut:1400, type:'sine', boing:1},
  };
  function impact(mat, strength=0.7){
    if(!ctx||muted) return; strength=clamp(strength,0.1,1.3);
    const P=MAT[mat]||MAT.madeira, t=now(), vol=0.42*strength;
    // transiente (batida seca)
    const n=noiseSrc(), nf=ctx.createBiquadFilter(); nf.type='bandpass';
    nf.frequency.value=P.cut*0.55*(0.85+Math.random()*0.3); nf.Q.value=0.7;
    const ng=ctx.createGain(); ng.gain.setValueAtTime(vol*P.noise,t); ng.gain.exponentialRampToValueAtTime(0.0008,t+0.03+P.dec*0.25);
    n.connect(nf).connect(ng); send(ng, sfxBus, P.ring?0.16:0.08); n.start(t); n.stop(t+0.2);
    // corpo ressonante (parciais)
    P.part.forEach((r,i)=>{ const o=ctx.createOscillator(); o.type=P.type;
      const f0=P.base*r*(0.99+Math.random()*0.02); o.frequency.setValueAtTime(f0,t);
      if(P.boing) o.frequency.exponentialRampToValueAtTime(f0*0.55,t+P.dec);   // borracha: cai o tom
      const g=ctx.createGain(); const a=vol*(1/(i+1))*(P.ring?0.8:1);
      g.gain.setValueAtTime(a,t); g.gain.exponentialRampToValueAtTime(0.0008,t+P.dec*(1-i*0.1)*(0.7+strength*0.5));
      o.connect(g); send(g, sfxBus, P.ring?0.22:0.1); o.start(t); o.stop(t+P.dec+0.1); });
    if(P.hollow){ const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=P.hollow; const g=ctx.createGain();
      g.gain.setValueAtTime(vol*0.5,t); g.gain.exponentialRampToValueAtTime(0.0008,t+P.dec*1.4); o.connect(g); send(g,sfxBus,0.12); o.start(t); o.stop(t+P.dec*1.6); }
  }
  function place(mat){ impact(mat, 0.42); }
  let _lastTick=0;
  function tick(){ if(!ctx||muted)return; const t=now(); if(t-_lastTick<0.04)return; _lastTick=t;
    const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=1500; const g=ctx.createGain();
    g.gain.setValueAtTime(0.06,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.05); o.connect(g); send(g,sfxBus,0.05); o.start(t); o.stop(t+0.06); }
  function collapse(){ if(!ctx||muted)return; const t=now();
    // estrondo grave
    const n=noiseSrc(), lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.setValueAtTime(400,t); lp.frequency.exponentialRampToValueAtTime(90,t+0.7);
    const g=ctx.createGain(); g.gain.setValueAtTime(0.5,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.8); n.connect(lp).connect(g); send(g,sfxBus,0.3); n.start(t); n.stop(t+0.9);
    // pancadas em cascata
    const mats=['pedra','madeira','concreto','metal']; for(let i=0;i<5;i++) setTimeout(()=>impact(mats[(Math.random()*mats.length)|0],0.6+Math.random()*0.5), i*70+Math.random()*40);
  }
  function ui(){ if(!ctx||muted)return; const t=now(); const o=ctx.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(660,t); o.frequency.exponentialRampToValueAtTime(880,t+0.06);
    const g=ctx.createGain(); g.gain.setValueAtTime(0.14,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.09); o.connect(g); send(g,sfxBus,0.08); o.start(t); o.stop(t+0.1); }
  function bell(freq, t, vol, dec, dl){ const o=ctx.createOscillator(), m=ctx.createOscillator(), mg=ctx.createGain(), g=ctx.createGain();
    o.type='sine'; o.frequency.value=freq; m.type='sine'; m.frequency.value=freq*2.01; mg.gain.value=freq*0.8; m.connect(mg).connect(o.frequency);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0008,t+(dec||0.5)); o.connect(g); send(g,sfxBus,0.3, dl||0.18); o.start(t); m.start(t); o.stop(t+(dec||0.5)+0.1); m.stop(t+(dec||0.5)+0.1); }
  function win(){ if(!ctx||muted)return; const t=now(); [60,64,67,72,76].forEach((n,i)=>bell(NF(n),t+i*0.09,0.28,0.7)); }
  function fail(){ if(!ctx||muted)return; const t=now(); [55,51,48,43].forEach((n,i)=>{ const o=ctx.createOscillator(); o.type='triangle'; o.frequency.value=NF(n);
    const g=ctx.createGain(); g.gain.setValueAtTime(0.16,t+i*0.13); g.gain.exponentialRampToValueAtTime(0.001,t+i*0.13+0.24); o.connect(g); send(g,sfxBus,0.2); o.start(t+i*0.13); o.stop(t+i*0.13+0.3); }); }
  function star(i){ if(!ctx||muted)return; bell(NF(72+i*4), now(), 0.3, 0.6); }

  /* segure-firme: tom sustentado que sobe com o progresso */
  let holdOsc=null, holdGain=null;
  function hold(p){ if(!ctx||muted){ return; }
    if(p>0.02){ if(!holdOsc){ holdOsc=ctx.createOscillator(); holdGain=ctx.createGain(); holdOsc.type='sine'; holdGain.gain.value=0; holdOsc.connect(holdGain); send(holdGain,sfxBus,0.3); holdOsc.start(); }
      holdOsc.frequency.setTargetAtTime(330+p*440, now(), 0.05); holdGain.gain.setTargetAtTime(0.06, now(), 0.05); }
    else if(holdOsc){ holdGain.gain.setTargetAtTime(0, now(), 0.06); const o=holdOsc, g=holdGain; setTimeout(()=>{try{o.stop();}catch(e){}}, 200); holdOsc=null; holdGain=null; }
  }

  /* ==================== MÚSICA GENERATIVA (chill de canteiro) ==================== */
  // acordes (maj7/min7) numa tonalidade aconchegante — 8 acordes, 2 compassos cada
  const CHORDS=[
    [48,52,55,59],[45,48,52,55],[41,45,48,52],[43,47,50,55],
    [40,43,47,50],[38,41,45,48],[41,45,48,52],[43,47,50,53]
  ];
  const PENTA=[60,62,64,67,69,72,74,76,79,81];
  let schedTimer=null, next16=0, step=0, bpm=73, cycle=0;
  const S16=()=> (60/bpm)/4;

  function padVoice(freqs,t,dur){ const out=ctx.createGain(); out.gain.value=0; send(out, musicBus, 0.4);
    out.gain.setValueAtTime(0,t); out.gain.linearRampToValueAtTime(0.16,t+0.5); out.gain.setValueAtTime(0.16,t+dur-0.7); out.gain.linearRampToValueAtTime(0,t+dur);
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.setValueAtTime(700,t); lp.frequency.linearRampToValueAtTime(1500,t+dur*0.5); lp.frequency.linearRampToValueAtTime(800,t+dur); lp.connect(out);
    freqs.forEach(f=>{ [-6,6].forEach(det=>{ const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.value=f; o.detune.value=det; const g=ctx.createGain(); g.gain.value=0.13; o.connect(g).connect(lp); o.start(t); o.stop(t+dur+0.1); }); });
  }
  function bassVoice(note,t,dur){ const o=ctx.createOscillator(), o2=ctx.createOscillator(), g=ctx.createGain(), lp=ctx.createBiquadFilter();
    o.type='sine'; o.frequency.value=NF(note); o2.type='triangle'; o2.frequency.value=NF(note); lp.type='lowpass'; lp.frequency.value=500;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.2,t+0.02); g.gain.exponentialRampToValueAtTime(0.02,t+dur*0.9); g.gain.linearRampToValueAtTime(0,t+dur);
    o.connect(lp); o2.connect(lp); lp.connect(g); send(g,musicBus,0.05); o.start(t); o2.start(t); o.stop(t+dur+0.05); o2.stop(t+dur+0.05); }
  function pluck(note,t,vol){ const o=ctx.createOscillator(), m=ctx.createOscillator(), mg=ctx.createGain(), g=ctx.createGain();
    o.type='sine'; o.frequency.value=NF(note); m.type='sine'; m.frequency.value=NF(note)*3; mg.gain.value=NF(note)*1.5; m.connect(mg).connect(o.frequency);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.32); o.connect(g); send(g,musicBus,0.22,0.12); o.start(t); m.start(t); o.stop(t+0.4); m.stop(t+0.4); }
  function melody(note,t){ const o=ctx.createOscillator(), g=ctx.createGain(); o.type='triangle'; o.frequency.value=NF(note);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.12,t+0.03); g.gain.exponentialRampToValueAtTime(0.001,t+0.5); o.connect(g); send(g,musicBus,0.34,0.3); o.start(t); o.stop(t+0.6); }
  function kick(t){ const o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine'; o.frequency.setValueAtTime(120,t); o.frequency.exponentialRampToValueAtTime(45,t+0.1);
    g.gain.setValueAtTime(0.22,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.18); o.connect(g); send(g,musicBus,0.02); o.start(t); o.stop(t+0.2); }
  function hat(t,vol){ const n=noiseSrc(), hp=ctx.createBiquadFilter(), g=ctx.createGain(); hp.type='highpass'; hp.frequency.value=7000;
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.05); n.connect(hp).connect(g); send(g,musicBus,0.04); n.start(t); n.stop(t+0.06); }

  let arpIdx=0;
  function scheduleStep(s,t){
    const bar=(s/16)|0, sixteenth=s%16, chord=CHORDS[((bar/2)|0)%CHORDS.length];
    const partB = ((bar%16)>=8);           // segunda metade = arranjo mais cheio
    // PAD — troca a cada 2 compassos
    if(s % 32 === 0){ padVoice(chord.map(NF), t, S16()*32); }
    // BASS — batidas 1 e 3
    if(sixteenth===0 || sixteenth===8){ bassVoice(chord[0]-12 + (sixteenth===8?0:0), t, S16()*7); }
    // ARP — colcheias
    if(s%2===0){ if(Math.random()<0.9){ const notes=[chord[0]+12,chord[1]+12,chord[2]+12,chord[3]+12,chord[2]+12,chord[1]+12]; pluck(notes[arpIdx%notes.length], t, 0.11); arpIdx++; } }
    // PERCUSSÃO
    if(sixteenth===0||sixteenth===8) kick(t);
    if(s%2===1) hat(t, partB?0.05:0.03);
    // MELODIA — esparsa e generativa, mais na parte B
    if(partB && sixteenth%4===0 && Math.random()< (0.42)){ const cn=chord.map(x=>x%12); const cand=PENTA.filter(n=> cn.includes(n%12) || Math.random()<0.35); melody(cand[(Math.random()*cand.length)|0]||PENTA[0], t+ (Math.random()*0.02)); }
    // brilho ocasional
    if(s%64===48 && Math.random()<0.6) bell(NF(84+(Math.random()*4|0)*2), t, 0.12, 0.8, 0.3);
  }
  function scheduler(){ if(!ctx) return; const ahead=0.12;
    while(next16 < ctx.currentTime + ahead){ scheduleStep(step, next16); next16 += S16(); step=(step+1)%(16*16); if(step===0) cycle++; }
    schedTimer=setTimeout(scheduler, 25);
  }
  function startMusic(){ if(!ensure()||musicOn) return; musicOn=true; next16=ctx.currentTime+0.1; step=0;
    musicBus.gain.cancelScheduledValues(ctx.currentTime); musicBus.gain.setValueAtTime(0.0001,ctx.currentTime); musicBus.gain.linearRampToValueAtTime(0.6, ctx.currentTime+3.5);
    scheduler();
  }
  function stopMusic(){ if(!musicOn)return; musicOn=false; clearTimeout(schedTimer); if(musicBus) musicBus.gain.setTargetAtTime(0, ctx.currentTime, 0.4); }

  return { resume, setMuted, toggleMute, get muted(){return muted;}, impact, place, tick, collapse, ui, win, fail, star, hold, startMusic, stopMusic };
})();
