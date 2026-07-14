export class SoundEngine {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  
  // Music State
  musicEnabled = false;
  musicPlaying = false;
  musicVolume = 0.14; // ambient soft cozy volume
  
  // Music nodes
  musicGainNode: GainNode | null = null;
  
  // Sequencer properties for loop (128 steps)
  schedulerInterval: any = null;
  beatIndex = 0;
  nextNoteTime = 0.0;
  tempo = 142; // Cool slow synthwave aesthetic bpm
  
  // Storage for currently active long-tail drone oscillators to prevent overlapping/leaking
  activePadOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  currentPadChordIdx = -1;

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(e => console.warn('Ctx resume failed', e));
      }
      return;
    }
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Load saved preference: default to true if the user hasn't explicitly muted it
      const saved = localStorage.getItem('gameMusicEnabled');
      this.musicEnabled = saved !== 'false';
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
      
      // Auto start music
      if (this.musicEnabled) {
        setTimeout(() => {
          this.startMusic();
        }, 500);
      }

      // Add window event listeners for any user interaction (click, touch, etc.)
      const autoResume = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().then(() => {
            if (this.musicEnabled && !this.musicPlaying) {
              this.startMusic();
            }
          }).catch(e => console.warn(e));
        } else if (this.musicEnabled && !this.musicPlaying) {
          this.startMusic();
        }
        // Remove listeners once active
        window.removeEventListener('click', autoResume);
        window.removeEventListener('touchend', autoResume);
        window.removeEventListener('keydown', autoResume);
      };

      window.addEventListener('click', autoResume);
      window.addEventListener('touchend', autoResume);
      window.addEventListener('keydown', autoResume);
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  // Trigger from user actions to ensure AudioContext resumed and music playing
  resumeAndPlay() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.warn(e));
    }
    if (this.musicEnabled && !this.musicPlaying) {
      this.startMusic();
    }
  }

  toggleMusic() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.warn(e));
    }
    
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('gameMusicEnabled', this.musicEnabled ? 'true' : 'false');
    
    if (this.musicEnabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    return this.musicEnabled;
  }

  startMusic() {
    if (!this.ctx) {
      this.init();
      if (!this.ctx) return;
    }
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.warn(e));
    }
    
    if (this.musicPlaying) return;
    
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
    
    const now = this.ctx.currentTime;
    
    // Create music gain node
    this.musicGainNode = this.ctx.createGain();
    this.musicGainNode.gain.setValueAtTime(0, now);
    this.musicGainNode.gain.linearRampToValueAtTime(this.musicVolume, now + 1.5); // Warm fade-in!
    this.musicGainNode.connect(this.masterGain!);
    
    // Start scheduler
    this.beatIndex = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.musicPlaying = true;
    
    this.schedulerInterval = setInterval(() => {
      this.schedulerTick();
    }, 45);
  }

  stopMusic() {
    this.musicPlaying = false;
    
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
    
    // Fade out then disconnect
    if (this.ctx && this.musicGainNode && this.masterGain) {
      const now = this.ctx.currentTime;
      try {
        this.musicGainNode.gain.setValueAtTime(this.musicGainNode.gain.value, now);
        this.musicGainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      } catch (e) {}
    }
    
    setTimeout(() => {
      if (this.musicPlaying) return; // aborted stop
      
      this.activePadOscillators.forEach(item => {
        try { item.osc.stop(); item.osc.disconnect(); } catch (e) {}
      });
      this.activePadOscillators = [];
      this.currentPadChordIdx = -1;
      
      if (this.musicGainNode) {
        try { this.musicGainNode.disconnect(); } catch (e) {}
        this.musicGainNode = null;
      }
    }, 650);
  }

  schedulerTick() {
    if (!this.ctx || !this.musicPlaying) return;
    
    const lookAhead = 0.1; // 100ms lookahead
    while (this.nextNoteTime < this.ctx.currentTime + lookAhead) {
      this.schedulePlay(this.beatIndex, this.nextNoteTime);
      
      const secondsPerBeat = 60.0 / this.tempo;
      // Multiply by 0.5 because steps are eighth notes for faster pacing
      this.nextNoteTime += secondsPerBeat * 0.5;
      this.beatIndex = (this.beatIndex + 1) % 128; // 128-beat loop (~44.8s)
    }
  }

  schedulePlay(step: number, time: number) {
    if (!this.ctx || !this.musicGainNode) return;
    
    // Medieval Acoustic Bardic / Tavern Chord Sequence (Dm - F - C - Am)
    const chords = [
      [146.83, 174.61, 220.00, 261.63, 293.66], // Dm9 (D-F-A-C-E)
      [174.61, 220.00, 261.63, 329.63, 349.23], // Fmaj9 (F-A-C-E-G)
      [130.81, 164.81, 196.00, 246.94, 261.63], // Cmaj9 (C-E-G-B-D)
      [110.00, 130.81, 164.81, 196.00, 220.00], // Am9 (A-C-E-G-B)
    ];
    
    const chordIdx = Math.floor(step / 16) % 4; // Change chord every 16 1/8th steps (8 beats)
    const currentNotes = chords[chordIdx];
    
    // Dynamic Ambient Drone Pad (Lush background sheets that glide beautifully!)
    if (chordIdx !== this.currentPadChordIdx) {
      this.currentPadChordIdx = chordIdx;
      // Fade out old pad oscillators gently
      const oldPadItems = [...this.activePadOscillators];
      this.activePadOscillators = [];
      
      oldPadItems.forEach(item => {
        try {
          item.gain.gain.setValueAtTime(item.gain.gain.value, time);
          item.gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
          setTimeout(() => {
            try { item.osc.stop(); item.osc.disconnect(); } catch(e) {}
          }, 1400);
        } catch(e) {}
      });

      // Spawn new warm detuned pads (using 3 notes from chord)
      const padNotes = [currentNotes[0], currentNotes[1], currentNotes[3]];
      const padFilter = this.ctx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(450, time);
      padFilter.frequency.exponentialRampToValueAtTime(900, time + 4.0); // slow opening sweep
      padFilter.Q.setValueAtTime(1.0, time);
      padFilter.connect(this.musicGainNode);

      padNotes.forEach((freq, idx) => {
        try {
          const osc = this.ctx.createOscillator();
          const pGain = this.ctx.createGain();
          
          osc.type = 'triangle'; // Flute/organ warm backdrop instead of sawtooth
          // Detuned lightly to sound like a natural wooden ensemble
          osc.frequency.setValueAtTime(freq * 0.5, time);
          osc.detune.setValueAtTime((idx - 1) * 8 + (Math.random() - 0.5) * 2, time);

          pGain.gain.setValueAtTime(0, time);
          pGain.gain.linearRampToValueAtTime(0.065, time + 1.5); // long warm envelope attack
          
          osc.connect(pGain);
          pGain.connect(padFilter);
          
          osc.start(time);
          
          this.activePadOscillators.push({ osc, gain: pGain });
        } catch(e) {}
      });
    }

    // 1. Synth Bassline pattern (Driving, groovy, lowpassed sub bass)
    const bassPattern = [
      1, 0, 0, 1, 
      0, 1, 0, 0,
      1, 0, 0, 0,
      0, 1, 1, 0
    ];
    
    if (bassPattern[step % 16] === 1) {
      try {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const bassFilter = this.ctx.createBiquadFilter();
        
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(currentNotes[0] / 2, time); // Play tonic 1 octave down
        
        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(180, time);
        
        // Slightly punchy click envelope
        bassGain.gain.setValueAtTime(0, time);
        bassGain.gain.linearRampToValueAtTime(0.24, time + 0.015);
        bassGain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        
        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.musicGainNode);
        
        bassOsc.start(time);
        bassOsc.stop(time + 0.38);
      } catch (e) {}
    }
    
    // 2. Synthesized Hi-Hat (crisp noise bursts for high rhythm action)
    const hatPattern = [
      0, 0, 1, 0, 
      0, 0, 1, 0,
      0, 0, 1, 0,
      1, 0, 1, 0
    ];
    if (hatPattern[step % 16] === 1) {
      try {
        const bufferSize = this.ctx.sampleRate * 0.055; // very quick click
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;
        
        const hatFilter = this.ctx.createBiquadFilter();
        hatFilter.type = 'highpass';
        hatFilter.frequency.setValueAtTime(6500, time);
        
        const hatGain = this.ctx.createGain();
        hatGain.gain.setValueAtTime(0.012, time);
        hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        
        noiseNode.connect(hatFilter);
        hatFilter.connect(hatGain);
        hatGain.connect(this.musicGainNode);
        
        noiseNode.start(time);
        noiseNode.stop(time + 0.055);
      } catch(e) {}
    }

    // 3. Generative Melody Arp (plucky digital neon droplets)
    const arpPattern = [
      1, 0, 0, 1, 
      0, 0, 1, 0,
      1, 0, 0, 1,
      0, 1, 0, 1
    ];
    if (arpPattern[step % 16] === 1) {
      try {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const arpFilter = this.ctx.createBiquadFilter();
        const arpDelay = this.ctx.createDelay();
        const delayFeedback = this.ctx.createGain();
        const arpGain = this.ctx.createGain();
        
        // Select chord note with smart progressive sequence plus random pentatonic variation
        const scaleIndex = [0, 2, 4, 1, 3, 2, 4, 3][(step + Math.floor(step / 4)) % 8];
        const pitch = currentNotes[scaleIndex] * (Math.random() > 0.85 ? 2.0 : 1.0); // occasional octave jump
        
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(pitch, time);
        
        osc2.type = 'sine'; // Pure lute / acoustic harp plucking tone instead of cyber saw
        osc2.frequency.setValueAtTime(pitch, time);
        osc2.detune.setValueAtTime(6, time);

        arpFilter.type = 'bandpass';
        arpFilter.frequency.setValueAtTime(1200, time);
        arpFilter.Q.setValueAtTime(1.8, time);

        // Plucky fast decay envelope
        arpGain.gain.setValueAtTime(0, time);
        arpGain.gain.linearRampToValueAtTime(0.045, time + 0.005);
        arpGain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

        // Echo feedback setup (1/16th note delay time ~105ms)
        arpDelay.delayTime.setValueAtTime(0.13, time);
        delayFeedback.gain.setValueAtTime(0.40, time);

        osc1.connect(arpFilter);
        osc2.connect(arpFilter);
        arpFilter.connect(arpGain);
        arpGain.connect(this.musicGainNode);

        // Route to delay line
        arpGain.connect(arpDelay);
        arpDelay.connect(delayFeedback);
        delayFeedback.connect(this.musicGainNode);
        delayFeedback.connect(arpDelay); // loop back

        osc1.start(time);
        osc1.stop(time + 0.18);
        osc2.start(time);
        osc2.stop(time + 0.18);
      } catch (e) {}
    }
  }

  playLock() {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    
    // Lock feels heavier and satisfying, like a premium slot mechanical clasp
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(80, now + 0.22);
      
      osc2.type = 'triangle'; // Wood-clapper lock clink instead of sci-fi metal sawtooth
      osc2.frequency.setValueAtTime(360, now);
      osc2.frequency.exponentialRampToValueAtTime(60, now + 0.19);
      
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(2.2, now);
      
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      osc1.start(now);
      osc1.stop(now + 0.24);
      osc2.start(now);
      osc2.stop(now + 0.24);
    } catch(e) {}
  }

  playRoll() {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    const duration = 1.3; // Realistic throw with longer kinetic tumble decay
    const totalTaps = 18 + Math.floor(Math.random() * 8); // 18-26 individual physics taps
    
    // A) Synthesize deep rolling friction noise
    try {
      const sampleRate = this.ctx.sampleRate;
      const noiseBufferSize = sampleRate * duration;
      const noiseBuffer = this.ctx.createBuffer(1, noiseBufferSize, sampleRate);
      const data = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < noiseBufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(280, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(110, now + duration);
      noiseFilter.Q.setValueAtTime(2.5, now);
      
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      
      noiseNode.start(now);
      noiseNode.stop(now + duration);
    } catch (e) {
      console.warn("Could not start noise roll", e);
    }
 
    // B) Synthesize clean high-fidelity dice rattling clicks
    const rollFilter = this.ctx.createBiquadFilter();
    rollFilter.type = 'bandpass';
    rollFilter.frequency.setValueAtTime(420, now);
    rollFilter.Q.setValueAtTime(2.8, now);
    rollFilter.connect(this.masterGain);
    
    const clickFilter = this.ctx.createBiquadFilter();
    clickFilter.type = 'highpass';
    clickFilter.frequency.setValueAtTime(2600, now);
    clickFilter.connect(this.masterGain);
 
    for (let i = 0; i < totalTaps; i++) {
      const progress = i / totalTaps;
      // Physics curve: tumble speed decelerates naturally
      const tapTime = now + (Math.pow(progress, 1.45) * (duration - 0.08));
      const tapGainValue = (1.0 - progress) * 0.18 + 0.02;
      
      const thudFreq = 150 + Math.random() * 85;
      const clickFreq = 4000 + Math.random() * 2500;
      
      try {
        const bodyOsc = this.ctx.createOscillator();
        const bodyGain = this.ctx.createGain();
        
        bodyOsc.type = 'triangle';
        bodyOsc.frequency.setValueAtTime(thudFreq, tapTime);
        bodyOsc.frequency.exponentialRampToValueAtTime(75, tapTime + 0.07);
        
        bodyGain.gain.setValueAtTime(tapGainValue, tapTime);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, tapTime + 0.0701);
        
        bodyOsc.connect(bodyGain);
        bodyGain.connect(rollFilter);
        
        bodyOsc.start(tapTime);
        bodyOsc.stop(tapTime + 0.08);
        
        // High crisp plastic collision
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        
        clickOsc.type = 'sine';
        clickOsc.frequency.setValueAtTime(clickFreq, tapTime);
        clickOsc.frequency.setValueAtTime(clickFreq * 0.45, tapTime + 0.010);
        
        clickGain.gain.setValueAtTime(tapGainValue * 0.48, tapTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, tapTime + 0.012);
        
        clickOsc.connect(clickGain);
        clickGain.connect(clickFilter);
        
        clickOsc.start(tapTime);
        clickOsc.stop(tapTime + 0.014);
      } catch (e) {}
    }
  }

  playScoreTick(pitchFreq = 400) {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    // A mechanical slot count tick, pleasant and clear ping-pong
    try {
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(pitchFreq, this.ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine'; // Pure golden chime instead of square wave
      osc2.frequency.setValueAtTime(pitchFreq * 1.5, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(pitchFreq * 0.5, this.ctx.currentTime + 0.025);
      gain2.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.026);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(this.masterGain);
      gain2.connect(this.masterGain);
      
      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.09);
      osc2.stop(this.ctx.currentTime + 0.035);
    } catch(e) {}
  }

  playUnstable() {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    // Massive feedback cyber wobble for high multipliers / corruption / bosses
    try {
      const osc = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const wobbleGain = this.ctx.createGain();
      const distort = this.ctx.createWaveShaper();
      const filter = this.ctx.createBiquadFilter();
      const mainGain = this.ctx.createGain();
      
      lfo.frequency.setValueAtTime(8, now); // Slow dark magic pulse
      lfo.connect(wobbleGain);
      
      osc.type = 'triangle'; // Dark rumbling dragon's breath instead of sawtooth buzz
      osc.frequency.setValueAtTime(70, now);
      osc.frequency.linearRampToValueAtTime(40, now + 1.2);
      
      wobbleGain.gain.setValueAtTime(10, now);
      wobbleGain.connect(osc.frequency);

      distort.curve = this.makeDistortionCurve(100);
      distort.oversample = '4x';

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.linearRampToValueAtTime(80, now + 1.2);
      filter.Q.setValueAtTime(3.0, now);

      mainGain.gain.setValueAtTime(0.35, now);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc.connect(distort);
      distort.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(this.masterGain);

      lfo.start(now);
      osc.start(now);
      
      lfo.stop(now + 1.3);
      osc.stop(now + 1.3);
    } catch (e) {}
  }

  playWin() {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    // Royal court triumph fanfare in D Minor triad (evoking castle horns)
    try {
      const scale = [293.66, 329.63, 349.23, 440.00, 523.25, 587.33, 698.46]; // Heroic D Minor pentatone
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + 1.2);
      filter.connect(this.masterGain);
 
      scale.forEach((freq, idx) => {
        const noteTime = now + (idx * 0.12);
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle'; // Majestic recorders/flutes instead of square wave synth
        osc.frequency.setValueAtTime(freq, noteTime);
        
        gain.gain.setValueAtTime(0.18, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);
        
        osc.connect(gain);
        gain.connect(filter);
        
        osc.start(noteTime);
        osc.stop(noteTime + 0.55);
      });

      // Ambient bass sweep underneath the victory fanfare
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(130.81, now);
      sub.frequency.linearRampToValueAtTime(261.63, now + 1.2);
      
      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.3, now + 0.2);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      
      sub.connect(subGain);
      subGain.connect(this.masterGain);
      sub.start(now);
      sub.stop(now + 1.5);
    } catch (e) {}
  }

  playHover() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; // Crystalline key click
      osc.frequency.setValueAtTime(1100, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.008, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch(e) {}
  }
 
  playClick() {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    // Snappy wooden table block tap instead of synth clicking
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle'; // Woodblock tone
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playDraftChoice() {
    this.resumeAndPlay();
    if (!this.ctx || !this.masterGain) return;
    
    // Plucky magical ascending gem chime/power-up!
    const now = this.ctx.currentTime;
    const notes = [440.00, 554.37, 659.25, 880.00]; // A4, C#5, E5, A5 beautiful chime
    notes.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        
        gain.gain.setValueAtTime(0.14, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.32);
        
        osc.connect(gain);
        gain.connect(this.masterGain!);
        
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.34);
      } catch (e) {}
    });
  }

  playPowerup() {
    this.playDraftChoice();
  }

  makeDistortionCurve(amount: number) {
    const k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const sfx = new SoundEngine();
