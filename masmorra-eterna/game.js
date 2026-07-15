'use strict';
/* ===================================================================
   MASMORRA ETERNA — dungeon crawler de 1ª pessoa + combate por turnos
   Renderizador raycaster (passos de grade) · geração procedural com
   segredos · combate estratégico: Quebra, Resolve, elementos, status.
=================================================================== */

/* ---------- util ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const rnd=(a,b)=>a+Math.random()*(b-a);
const rint=(a,b)=>Math.floor(rnd(a,b+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const chance=p=>Math.random()<p;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

/* ================= ÁUDIO (sintetizado) ================= */
const AU={ctx:null,master:null,music:null,muted:false,timer:null};
function auInit(){ if(AU.ctx)return; try{
  AU.ctx=new (window.AudioContext||window.webkitAudioContext)();
  AU.master=AU.ctx.createGain(); AU.master.gain.value=0.6; AU.master.connect(AU.ctx.destination);
  AU.music=AU.ctx.createGain(); AU.music.gain.value=0.32; AU.music.connect(AU.master);
}catch(e){} }
function beep(freq,dur,type='square',vol=0.2,slide=0,dest){ if(!AU.ctx||AU.muted)return;
  const t=AU.ctx.currentTime,o=AU.ctx.createOscillator(),g=AU.ctx.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t); if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(20,freq+slide),t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(dest||AU.master); o.start(t); o.stop(t+dur+0.02);
}
function noise(dur,vol=0.25,filt=1200){ if(!AU.ctx||AU.muted)return;
  const t=AU.ctx.currentTime,n=Math.floor(AU.ctx.sampleRate*dur),buf=AU.ctx.createBuffer(1,n,AU.ctx.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
  const s=AU.ctx.createBufferSource();s.buffer=buf;const f=AU.ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=filt;
  const g=AU.ctx.createGain();g.gain.value=vol; s.connect(f);f.connect(g);g.connect(AU.master);s.start();
}
const SFX={
  step(){beep(120,0.06,'square',0.08,-30);},
  bump(){beep(70,0.12,'sawtooth',0.12,-20);noise(0.08,0.08,600);},
  door(){beep(180,0.18,'square',0.1,-60);noise(0.15,0.1,900);},
  chest(){beep(500,0.09,'square',0.18);setTimeout(()=>beep(760,0.14,'square',0.18),90);setTimeout(()=>beep(1020,0.18,'triangle',0.16),200);},
  secret(){beep(300,0.1,'triangle',0.16,200);setTimeout(()=>beep(600,0.16,'triangle',0.16,300),110);},
  heal(){beep(520,0.1,'sine',0.16,180);setTimeout(()=>beep(780,0.16,'sine',0.14,120),90);},
  hit(){noise(0.12,0.22,1600);beep(160,0.09,'square',0.14,-60);},
  crit(){noise(0.16,0.3,2600);beep(220,0.12,'sawtooth',0.18,-120);},
  weak(){noise(0.14,0.26,3200);beep(340,0.12,'square',0.18,-80);},
  brk(){beep(200,0.05,'square',0.2);setTimeout(()=>beep(90,0.3,'sawtooth',0.24,-40),40);noise(0.3,0.24,2000);},
  cast(){beep(300,0.14,'triangle',0.12,260);},
  fire(){noise(0.3,0.24,2400);beep(120,0.24,'sawtooth',0.16,80);},
  ice(){beep(900,0.12,'triangle',0.14,-200);beep(1300,0.1,'sine',0.1);},
  bolt(){noise(0.09,0.3,5000);beep(1600,0.06,'square',0.14,-1200);},
  holy(){beep(660,0.14,'sine',0.14,220);setTimeout(()=>beep(990,0.2,'sine',0.12),80);},
  dark(){beep(150,0.3,'sawtooth',0.18,-40);},
  miss(){beep(300,0.08,'square',0.08,-120);},
  down(){beep(200,0.4,'sawtooth',0.2,-140);},
  win(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,0.2,'triangle',0.2),i*130));},
  lvup(){[523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>beep(f,0.16,'square',0.16),i*80));},
  ui(){beep(440,0.05,'square',0.1);},
  back(){beep(300,0.05,'square',0.08,-40);},
};
/* música ambiente simples por contexto */
function musicStart(mode){ if(!AU.ctx)return; musicStop();
  const scaleExp=[0,3,5,7,10,12], scaleBat=[0,2,3,5,7,8,10];
  const root=mode==='battle'?110:82, sc=mode==='battle'?scaleBat:scaleExp, step=mode==='battle'?0.42:0.9;
  let i=0;
  AU.timer=setInterval(()=>{ if(AU.muted)return;
    const n=sc[Math.floor(Math.random()*sc.length)]+ (chance(.3)?12:0);
    const f=root*Math.pow(2,n/12);
    beep(f,step*0.9,mode==='battle'?'sawtooth':'triangle',0.05,0,AU.music);
    if(i%4===0)beep(root/2*Math.pow(2,(sc[0])/12),step*3,'sine',0.06,0,AU.music);
    if(mode==='battle'&&i%2===0)beep(root*2,step*0.4,'square',0.03,0,AU.music);
    i++;
  }, step*1000);
}
function musicStop(){ if(AU.timer){clearInterval(AU.timer);AU.timer=null;} }

/* ================= PIXEL ART HELPERS ================= */
function px(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}
// desenha sprite a partir de mapa de strings + paleta
function drawMap(ctx,ox,oy,s,map,pal){
  for(let y=0;y<map.length;y++){const row=map[y];for(let x=0;x<row.length;x++){const ch=row[x];if(ch===' '||ch==='.')continue;const c=pal[ch];if(!c)continue;ctx.fillStyle=c;ctx.fillRect(ox+x*s,oy+y*s,s,s);}}
}

/* ================= TEXTURAS DO RAYCASTER ================= */
const TW=64;
function abgr(r,g,b){return (255<<24)|((b&255)<<16)|((g&255)<<8)|(r&255);}
function hash2(a,b){ let h=(a*374761393+b*668265263)|0; h=Math.imul(h^(h>>>13),1274126177); return ((h^(h>>>16))>>>0)/4294967295; }
function shade(c,f){ const r=(c&255),g=(c>>8)&255,b=(c>>16)&255; return abgr(clamp(r*f|0,0,255),clamp(g*f|0,0,255),clamp(b*f|0,0,255)); }
function mkTex(fn){ const a=new Uint32Array(TW*TW); fn((x,y,c)=>{a[y*TW+x]=c;}); return a; }
let TEX={};
/* ============ 10 BIOMAS (temas por andar) ============ */
const THEMES=[
  {key:'cripta',   name:'Cripta de Pedra',     wBase:112,wVar:42,wTint:[1.00,0.96,0.85],mortar:30,mTint:[0.95,0.92,0.86],
    fBase:50,fTint:[0.92,0.90,0.80],cBase:30,cTint:[0.82,0.86,1.0],moss:[0.5,0.72,0.42],mossF:0.06,crackF:0.10,door:'wood',accent:'#6a5a3a'},
  {key:'catacumbas',name:'Catacumbas',         wBase:138,wVar:36,wTint:[1.06,1.00,0.82],mortar:40,mTint:[1.0,0.96,0.82],
    fBase:60,fTint:[1.02,0.98,0.82],cBase:34,cTint:[0.9,0.88,0.8],moss:[0.6,0.55,0.45],mossF:0.02,crackF:0.16,door:'bone',accent:'#c8bfa0'},
  {key:'inundada', name:'Cavernas Inundadas',  wBase:96, wVar:34,wTint:[0.80,0.92,1.06],mortar:26,mTint:[0.8,0.9,1.05],
    fBase:44,fTint:[0.72,0.86,1.05],cBase:26,cTint:[0.75,0.85,1.1],moss:[0.35,0.7,0.55],mossF:0.10,crackF:0.08,door:'iron',accent:'#3a78a8'},
  {key:'forja',    name:'Forja Abandonada',    wBase:92, wVar:30,wTint:[1.12,0.78,0.62],mortar:24,mTint:[1.05,0.7,0.55],
    fBase:42,fTint:[1.05,0.72,0.55],cBase:24,cTint:[1.0,0.7,0.6],moss:[0.9,0.4,0.2],mossF:0.05,crackF:0.14,door:'iron',accent:'#c8461a',emberF:0.02},
  {key:'jardim',   name:'Jardim Petrificado',  wBase:110,wVar:38,wTint:[0.86,1.02,0.80],mortar:28,mTint:[0.8,0.95,0.75],
    fBase:48,fTint:[0.8,0.96,0.72],cBase:30,cTint:[0.8,0.95,0.82],moss:[0.4,0.75,0.35],mossF:0.16,crackF:0.10,door:'vine',accent:'#5aa84a'},
  {key:'salao',    name:'Salão Real',          wBase:152,wVar:34,wTint:[1.06,0.99,0.80],mortar:44,mTint:[1.0,0.95,0.7],
    fBase:66,fTint:[1.05,1.0,0.82],cBase:40,cTint:[1.0,0.95,0.78],moss:[0.9,0.75,0.35],mossF:0.06,crackF:0.06,door:'gold',accent:'#e8c15a',veinC:[0.95,0.8,0.4]},
  {key:'necropole',name:'Necrópole',           wBase:82, wVar:32,wTint:[0.92,0.82,1.06],mortar:22,mTint:[0.85,0.78,1.05],
    fBase:38,fTint:[0.82,0.76,1.02],cBase:22,cTint:[0.82,0.76,1.05],moss:[0.6,0.4,0.85],mossF:0.06,crackF:0.14,door:'obsidian',accent:'#a06adf'},
  {key:'gelo',     name:'Câmaras de Gelo',     wBase:150,wVar:28,wTint:[0.86,0.96,1.10],mortar:40,mTint:[0.82,0.92,1.08],
    fBase:64,fTint:[0.84,0.94,1.10],cBase:38,cTint:[0.85,0.94,1.12],moss:[0.6,0.85,1.0],mossF:0.05,crackF:0.10,door:'ice',accent:'#8ad0ff'},
  {key:'abismo',   name:'O Abismo',            wBase:74, wVar:30,wTint:[1.16,0.60,0.55],mortar:18,mTint:[1.1,0.55,0.5],
    fBase:34,fTint:[1.1,0.55,0.5],cBase:20,cTint:[1.05,0.5,0.5],moss:[1.0,0.4,0.2],mossF:0.08,crackF:0.16,door:'bone',accent:'#e0402e',emberF:0.03},
  {key:'trono',    name:'Trono Eterno',        wBase:66, wVar:26,wTint:[1.02,0.90,0.60],mortar:16,mTint:[0.9,0.78,0.5],
    fBase:36,fTint:[1.0,0.9,0.6],cBase:22,cTint:[1.0,0.88,0.6],moss:[0.95,0.8,0.4],mossF:0.04,crackF:0.10,door:'gold',accent:'#ffd24a',veinC:[1.0,0.82,0.35]},
];
function themeIdx(depth){ return clamp((depth||1)-1,0,THEMES.length-1); }
function themeOf(depth){ return THEMES[themeIdx(depth)]; }
const _themeCache={};
function buildThemeTex(P){
  const rgb=(base,tint)=>abgr(clamp(base*tint[0]|0,0,255),clamp(base*tint[1]|0,0,255),clamp(base*tint[2]|0,0,255));
  const T={};
  T.wall=mkTex(set=>{ const bH=16;
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      const row=Math.floor(y/bH), off=(row%2)?16:0, bx=x+off, col=Math.floor(bx/32), inX=bx%32, inY=y%bH, mortar=inX<2||inY<2;
      if(mortar){ set(x,y,rgb(P.mortar+hash2(x,y)*6,P.mTint)); continue; }
      let base=P.wBase+hash2(row*13+7,col*17+3)*P.wVar;
      if(inY<3)base+=18; else if(inY>=bH-3)base-=16; if(inX<4)base+=10; else if(inX>=28)base-=10;
      base+=hash2(x*2,y*2)*8-4;
      if(hash2(row*7+2,col*11+5)<0.10)base-=28;
      let r=base*P.wTint[0],g=base*P.wTint[1],b=base*P.wTint[2];
      if(hash2(row*31,col*29)<P.mossF && inY>bH*0.5){ r=base*P.moss[0];g=base*P.moss[1];b=base*P.moss[2]; }
      if(P.crackF && hash2(x*3+col,y*5+row)<P.crackF*0.06){ r*=0.4;g*=0.4;b*=0.4; }
      if(P.veinC && hash2(row*17,col*23)<0.14 && (inX===16||inY===0)){ r=base*P.veinC[0]*1.4;g=base*P.veinC[1]*1.4;b=base*P.veinC[2]*1.4; }
      set(x,y,abgr(clamp(r|0,0,255),clamp(g|0,0,255),clamp(b|0,0,255)));
    }
  });
  T.floor=mkTex(set=>{ const t=32;
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      const gx=Math.floor(x/t),gy=Math.floor(y/t),chk=(gx+gy)&1,inX=x%t,inY=y%t,grout=inX<2||inY<2;
      let base;
      if(grout)base=P.fBase*0.4; else{ base=P.fBase+(chk?10:0)+hash2(gx*5+1,gy*7+2)*14; base+=(inY<4?6:inY>t-4?-6:0); }
      let r=base*P.fTint[0],g=base*P.fTint[1],b=base*P.fTint[2];
      if(P.emberF && !grout && hash2(x*7,y*11)<P.emberF){ r=200;g=90;b=30; }
      if(P.key==='inundada' && !grout && hash2(gx*3,gy*3)<0.5){ b*=1.15; g*=1.05; } // poças
      set(x,y,abgr(clamp(r|0,0,255),clamp(g|0,0,255),clamp(b|0,0,255)));
    }
  });
  T.ceil=mkTex(set=>{ const bH=16;
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      const row=Math.floor(y/bH), off=(row%2)?16:0, bx=x+off, inX=bx%32, inY=y%bH, mortar=inX<2||inY<2;
      let base=mortar?P.cBase*0.4:(P.cBase+hash2(row*3,Math.floor(bx/32)*5)*10);
      set(x,y,rgb(base,P.cTint));
    }
  });
  T.arch=mkTex(set=>{ for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){ set(x,y,rgb(14,P.cTint)); } });
  T.door=buildDoor(P.door,P);
  T.accent=P.accent; T.accentRGB=hexRGB(P.accent);
  return T;
}
function buildDoor(style,P){ return mkTex(set=>{
  for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
    let r,g,b; const frame=x<7||x>=57||y<4||y>=60;
    if(frame){ const m=44+hash2(Math.floor(x/8),Math.floor(y/8))*20; r=m*0.9;g=m*0.88;b=m*0.82; }
    else{
      const px2=x-7, plank=Math.floor(px2/12.5), edge=(px2%12.5)<1.4;
      let base=78+plank*4+Math.sin(y*0.5+plank*2)*5+hash2(plank*3,Math.floor(y/6))*10;
      if(edge)base*=0.55;
      if(style==='wood'){ r=base;g=base*0.6;b=base*0.3; }
      else if(style==='iron'){ r=base*0.7;g=base*0.72;b=base*0.8; if(hash2(plank,Math.floor(y/8))<0.2){r*=1.2;g*=1.2;b*=1.2;} }
      else if(style==='bone'){ r=base*1.15;g=base*1.1;b=base*0.92; }
      else if(style==='ice'){ r=base*0.8;g=base*0.95;b=base*1.2; }
      else if(style==='gold'){ r=base*1.25;g=base*1.0;b=base*0.45; if(edge){r=base*0.8;g=base*0.6;b=base*0.25;} }
      else if(style==='obsidian'){ r=base*0.55;g=base*0.5;b=base*0.7; }
      else if(style==='vine'){ r=base*0.6;g=base*0.85;b=base*0.4; if(hash2(x,y)<0.06){r=40;g=120;b=40;} }
      else { r=base;g=base*0.6;b=base*0.3; }
      if(y>14&&y<19||y>44&&y<49){ r=r*0.6+70*0.4;g=g*0.6+72*0.4;b=b*0.6+80*0.4; if((x%10<2)){r=150;g=150;b=160;} }
    }
    set(x,y,abgr(clamp(r|0,0,255),clamp(g|0,0,255),clamp(b|0,0,255)));
  }
}); }
function setTheme(depth){ const i=themeIdx(depth); if(!_themeCache[i])_themeCache[i]=buildThemeTex(THEMES[i]); TEX=_themeCache[i]; }
function hexRGB(hex){ const h=hex.replace('#',''); return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
function abgrA(r,g,b,a){return ((a&255)<<24)|((b&255)<<16)|((g&255)<<8)|(r&255);}

/* ============ DECALQUES (objetos nas paredes p/ orientação) ============ */
let DECAL={}; const DEC_TORCH={torch:true};
function buildDecals(){
  const D=fn=>{const a=new Uint32Array(TW*TW); fn((x,y,c)=>{if(x>=0&&x<TW&&y>=0&&y<TW)a[y*TW+x]=c;}); return a;};
  DECAL.torch=D(set=>{
    for(let y=30;y<48;y++)for(let x=30;x<34;x++)set(x,y,abgrA(58,56,64,255));
    for(let x=26;x<38;x++)set(x,47,abgrA(80,78,88,255));
    for(let y=26;y<31;y++)for(let x=26;x<38;x++)if(Math.abs(x-32)<6-(y-26))set(x,y,abgrA(44,42,50,255));
    for(let y=8;y<28;y++)for(let x=23;x<41;x++){ const w=(28-y)*0.55-Math.abs(x-32); if(w>0){ const t=(28-y)/20; set(x,y,abgrA(255,(110+t*130)|0,(30+t*40)|0,255)); } }
    for(let y=13;y<27;y++)for(let x=30;x<34;x++)if(Math.abs(x-32)<2.5)set(x,y,abgrA(255,240,170,255));
  });
  DECAL.banner=D(set=>{
    for(let x=16;x<48;x++)set(x,9,abgrA(120,110,90,255));
    for(let y=11;y<54;y++)for(let x=19;x<45;x++){ const bottom=(y<49)||(((x-19)%13)<7); if(bottom){ const s=0.75+0.25*Math.sin(x*0.5); set(x,y,abgrA((235*s)|0,(235*s)|0,(235*s)|0,255)); } }
    for(let y=22;y<40;y++)for(let x=25;x<39;x++)if(Math.abs(x-32)+Math.abs(y-31)<7)set(x,y,abgrA(70,70,70,255));
  });
  DECAL.crack=D(set=>{ let x=32,y=6; while(y<58){ set(x,y,abgrA(0,0,0,150)); set(x+1,y,abgrA(0,0,0,110)); if(hash2(x,y)<0.3)set(x-1,y,abgrA(0,0,0,100)); x+=Math.round(hash2(y,3)*2-1); y+=1;
    if(hash2(y*3,x)<0.09){ let bx=x,by=y; for(let k=0;k<10;k++){set(bx,by,abgrA(0,0,0,120)); bx+=Math.round(hash2(bx,by)*2-1); by+=1;} } } });
  DECAL.chains=D(set=>{ for(const cx of [24,40]){ for(let y=6;y<50;y+=6){ for(let k=0;k<4;k++){const yy=y+k; set(cx,yy,abgrA(150,150,160,255)); set(cx+1,yy,abgrA(110,110,120,255));} }
    for(let a=0;a<7;a+=0.25){set((cx+Math.cos(a)*4)|0,(50+Math.sin(a)*3)|0,abgrA(95,95,105,255));} } });
  DECAL.skull=D(set=>{
    for(let y=18;y<46;y++)for(let x=22;x<42;x++){ const dx=(x-32)/10,dy=(y-30)/12; if(dx*dx+dy*dy<1)set(x,y,abgrA(0,0,0,160)); }
    for(let y=22;y<40;y++)for(let x=25;x<39;x++){ const dx=(x-32)/6.5,dy=(y-30)/8; if(dx*dx+dy*dy<1)set(x,y,abgrA(225,220,205,255)); }
    set(28,30,abgrA(20,16,14,255));set(29,30,abgrA(20,16,14,255)); set(35,30,abgrA(20,16,14,255));set(36,30,abgrA(20,16,14,255));
    for(let x=30;x<35;x++)set(x,37,abgrA(30,24,20,255));
  });
  DECAL.moss=D(set=>{ for(let i=0;i<440;i++){ const x=(hash2(i,7)*64)|0,y=(22+hash2(i,13)*40)|0; if(hash2(x,y)<0.6){const g=120+hash2(x*2,y)*80; set(x,y,abgrA((30+g*0.2)|0,g|0,(30+g*0.15)|0,(120+hash2(i,i)*120)|0));} } });
  DECAL.runes=D(set=>{ const seg=[[26,20,26,44],[26,20,38,20],[38,20,38,44],[26,44,38,44],[32,20,32,44],[26,32,38,32]]; seg.forEach((s,i)=>{ if(hash2(i,3)<0.65){ const[x0,y0,x1,y1]=s,n=22; for(let k=0;k<=n;k++){const x=(x0+(x1-x0)*k/n)|0,y=(y0+(y1-y0)*k/n)|0; set(x,y,abgrA(255,255,255,255)); set(x+1,y,abgrA(255,255,255,170));} } }); });
  // dica SUTIL de passagem secreta: contorno de porta fininho + pequeno sigilo
  DECAL.secret=D(set=>{
    for(let y=7;y<57;y++){ set(20,y,abgrA(0,0,0,64)); set(44,y,abgrA(0,0,0,64)); }
    for(let x=20;x<=44;x++){ set(x,7,abgrA(0,0,0,64)); set(x,57,abgrA(0,0,0,64)); }
    for(let a=0;a<6.3;a+=0.15){ const x=32+Math.round(Math.cos(a)*5),y=30+Math.round(Math.sin(a)*5); set(x,y,abgrA(150,138,100,95)); }
    set(32,27,abgrA(170,158,110,120)); set(32,33,abgrA(170,158,110,120)); set(29,30,abgrA(170,158,110,120)); set(35,30,abgrA(170,158,110,120));
  });
  DEC_TORCH.tex=DECAL.torch;
}
function decalFor(mx,my,side,rdx,rdy){
  const face = side===0 ? (rdx>0?3:1) : (rdy>0?0:2);
  const key=((mx*73856093)^(my*19349663)^(face*83492791))>>>0;
  const h=(key%997)/997, th=themeOf(G.depth);
  const horiz=(face===0||face===2), along=horiz?mx:my;
  if(along%4===2) return DEC_TORCH;                          // tochas em ritmo (~a cada 4)
  if(h<0.05) return {tex:DECAL.banner,accent:true};
  if(h<0.10) return {tex:DECAL.runes,accent:true,glow:true};
  if(h<0.16) return {tex:DECAL.skull};
  if(h<0.24) return {tex:DECAL.crack};
  if(h<0.30) return {tex:DECAL.chains};
  if(th.mossF>0.08 && h<0.44) return {tex:DECAL.moss};
  return null;
}
function buildTextures(){ setTheme(1); buildDecals(); }

/* ============ SPRITE DO CHEFE NO CAMPO (grande e detalhado) ============ */
function bossKeyFor(depth){ return depth>=10?'cavaleiro':'golem'; }
let BOSSCACHE={};
function bossSprite(key){ if(BOSSCACHE[key])return BOSSCACHE[key];
  const SW=76,SH=92, cv=document.createElement('canvas'); cv.width=SW;cv.height=SH; const g=cv.getContext('2d');
  drawBossField(g,key,SW,SH);
  const id=g.getImageData(0,0,SW,SH);
  BOSSCACHE[key]={data:new Uint32Array(id.data.buffer.slice(0)),w:SW,h:SH};
  return BOSSCACHE[key];
}
function drawBossField(g,key,W,H){
  const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  const ell=(cx,cy,rx,ry,c)=>{g.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=Math.floor(rx*Math.sqrt(Math.max(0,1-(y*y)/(ry*ry))));g.fillRect(cx-w,cy+y,w*2+1,1);}};
  const cx=W/2;
  if(key==='golem'){
    // sombra
    g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(cx-26,H-6,52,4);
    // pernas
    R(cx-20,H-30,15,28,'#5a4c3c'); R(cx+5,H-30,15,28,'#5a4c3c'); R(cx-20,H-6,16,4,'#3f342a'); R(cx+4,H-6,16,4,'#3f342a');
    R(cx-18,H-28,4,24,'#6a5a46'); R(cx+7,H-28,4,24,'#6a5a46');
    // quadril/torso
    ell(cx,H-42,28,22,'#6a5a46'); R(cx-26,H-56,52,26,'#6a5a46'); R(cx-26,H-56,52,5,'#8a7a5e');
    // rachaduras brilhantes
    g.strokeStyle='#ffcf5a'; g.lineWidth=1.5; g.beginPath(); g.moveTo(cx,H-56);g.lineTo(cx-3,H-40);g.lineTo(cx+4,H-30); g.moveTo(cx-14,H-48);g.lineTo(cx-10,H-38); g.stroke();
    g.strokeStyle='rgba(255,180,60,.35)';g.lineWidth=4;g.stroke();
    // placas peito
    R(cx-14,H-52,28,3,'#3f342a'); R(cx-3,H-56,6,26,'#5a4c3c'); R(cx-20,H-44,40,2,'#4a3e30');
    // braços enormes + punhos
    R(cx-40,H-56,14,22,'#5a4c3c'); R(cx+26,H-56,14,22,'#5a4c3c');
    ell(cx-40,H-30,12,11,'#6a5a46'); ell(cx+40,H-30,12,11,'#6a5a46'); // punhos
    R(cx-48,H-34,6,10,'#4a3e30'); R(cx+42,H-34,6,10,'#4a3e30');
    // ombros com espinhos de pedra
    ell(cx-30,H-58,10,8,'#7a6a52'); ell(cx+30,H-58,10,8,'#7a6a52');
    R(cx-34,H-68,4,8,'#6a5a46'); R(cx+30,H-68,4,8,'#6a5a46');
    // cabeça
    ell(cx,H-70,15,13,'#7a6a52'); R(cx-11,H-78,22,10,'#7a6a52'); R(cx-11,H-78,22,3,'#94836a');
    // olhos brilhantes
    R(cx-9,H-72,7,4,'#241a0e'); R(cx+2,H-72,7,4,'#241a0e');
    R(cx-8,H-71,5,2,'#ffe24a'); R(cx+3,H-71,5,2,'#ffe24a'); R(cx-7,H-71,2,2,'#fff7d0'); R(cx+4,H-71,2,2,'#fff7d0');
    // boca de pedra
    R(cx-8,H-64,16,3,'#241a0e'); for(let i=0;i<5;i++)R(cx-8+i*4,H-66,1,5,'#4a3e30');
    // musgo
    for(let i=0;i<30;i++){const x=cx-26+Math.floor(Math.random()*52),y=H-58+Math.floor(Math.random()*30); if(Math.random()<0.5)R(x,y,2,2,'#3a6a2a');}
  } else { // cavaleiro da cinza
    g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(cx-24,H-6,48,4);
    // capa esvoaçante
    R(cx-22,H-58,44,44,'#3a1420'); R(cx-24,H-40,6,26,'#2a0e18'); R(cx+18,H-40,6,26,'#2a0e18');
    // pernas blindadas
    R(cx-16,H-28,12,26,'#26262f'); R(cx+4,H-28,12,26,'#26262f'); R(cx-16,H-6,13,4,'#14141a'); R(cx+3,H-6,13,4,'#14141a');
    R(cx-14,H-26,3,22,'#3a3a48'); R(cx+6,H-26,3,22,'#3a3a48');
    // torso armadura + tabardo
    R(cx-20,H-58,40,30,'#2c2c3a'); R(cx-20,H-58,40,4,'#44445a'); R(cx-5,H-58,10,30,'#5a1a26'); R(cx-3,H-52,6,22,'#7a2432');
    // ombreiras
    ell(cx-24,H-56,10,9,'#3a3a4a'); ell(cx+24,H-56,10,9,'#3a3a4a'); R(cx-30,H-62,7,4,'#4a4a5c'); R(cx+23,H-62,7,4,'#4a4a5c');
    // braços + espadão
    R(cx-30,H-56,10,24,'#2c2c3a'); R(cx+20,H-56,10,24,'#2c2c3a');
    R(cx+30,H-84,5,54,'#5a5a6e'); R(cx+31,H-84,2,50,'#8a8aa0'); R(cx+26,H-40,12,4,'#3a3a48'); // lâmina
    R(cx+31,H-32,3,10,'#3a2028'); // punho
    // elmo com chifres
    ell(cx,H-70,12,12,'#33333f'); R(cx-9,H-78,18,10,'#33333f'); R(cx-9,H-78,18,3,'#4a4a5c');
    for(let i=0;i<5;i++){R(cx-11-i,H-80+i,3,3,'#4a4a5c'); R(cx+9+i,H-80+i,3,3,'#4a4a5c');} // chifres
    // visor brilhante vermelho
    R(cx-9,H-70,18,4,'#0a0a12'); R(cx-7,H-69,5,2,'#ff2a1e'); R(cx+3,H-69,5,2,'#ff2a1e');
    R(cx-6,H-69,2,2,'#ff9'); R(cx+4,H-69,2,2,'#ff9'); R(cx-1,H-74,2,5,'#5a1a26');
    // brasas de cinza
    for(let i=0;i<24;i++){const x=cx-28+Math.floor(Math.random()*56),y=H-70+Math.floor(Math.random()*60); if(Math.random()<0.4)R(x,y,1,1,'#e06a3a');}
  }
}

/* ================= RAYCASTER ================= */
const RC={cv:null,ctx:null,RW:360,RH:230,img:null,buf:null,zbuf:null};
function rcInit(){ RC.cv=$('#view'); RC.ctx=RC.cv.getContext('2d'); rcResize(); }
function rcResize(){ if(!RC.cv)return;
  const w=RC.cv.clientWidth||640, h=RC.cv.clientHeight||400;
  let RW=clamp(Math.round(w/2),220,520);
  let RH=clamp(Math.round(RW*(h/w)),140,460);
  RC.RW=RW; RC.RH=RH; RC.cv.width=RW; RC.cv.height=RH;
  RC.img=RC.ctx.createImageData(RW,RH); RC.buf=new Uint32Array(RC.img.data.buffer); RC.zbuf=new Float32Array(RW);
}
function rcRender(px,py,ang){
  const {RW,RH,buf}=RC;
  // plano = RW/(2*RH) garante pixels quadrados (perspectiva sem distorção) em qualquer proporção
  const dirX=Math.cos(ang),dirY=Math.sin(ang), plane=RW/(2*RH), planeX=-dirY*plane,planeY=dirX*plane;
  const posX=px,posY=py, horizon=RH/2, posZ=0.5*RH;
  const flick=0.98+Math.sin(performance.now()/160)*0.02+Math.random()*0.012;
  // teto + chão (floorcasting Lodev)
  const rdx0=dirX-planeX, rdy0=dirY-planeY, rdx1=dirX+planeX, rdy1=dirY+planeY;
  for(let y=Math.floor(horizon)+1;y<RH;y++){
    const p=y-horizon, rowDist=posZ/p;
    const stepX=rowDist*(rdx1-rdx0)/RW, stepY=rowDist*(rdy1-rdy0)/RW;
    let fx=posX+rowDist*rdx0, fy=posY+rowDist*rdy0;
    const fog=clamp((1.12-rowDist*0.13)*flick,0.1,0.98);
    const yc=Math.floor(horizon-(y-horizon)); // teto espelhado
    for(let x=0;x<RW;x++){
      const tx=((fx-Math.floor(fx))*TW)&63, ty=((fy-Math.floor(fy))*TW)&63;
      buf[y*RW+x]=shade(TEX.floor[ty*TW+tx],fog);
      if(yc>=0)buf[yc*RW+x]=shade(TEX.ceil[ty*TW+tx],fog);
      fx+=stepX; fy+=stepY;
    }
  }
  // paredes (DDA)
  for(let x=0;x<RW;x++){
    const camX=2*x/RW-1, rdx=dirX+planeX*camX, rdy=dirY+planeY*camX;
    let mapX=Math.floor(posX),mapY=Math.floor(posY);
    const ddx=Math.abs(1/rdx),ddy=Math.abs(1/rdy);
    let stepX,stepY,sdx,sdy;
    if(rdx<0){stepX=-1;sdx=(posX-mapX)*ddx;}else{stepX=1;sdx=(mapX+1-posX)*ddx;}
    if(rdy<0){stepY=-1;sdy=(posY-mapY)*ddy;}else{stepY=1;sdy=(mapY+1-posY)*ddy;}
    let side=0,hit=0,tile='#',guard=0;
    while(hit===0 && guard++<40){
      if(sdx<sdy){sdx+=ddx;mapX+=stepX;side=0;}else{sdy+=ddy;mapY+=stepY;side=1;}
      tile=tileVisual(mapX,mapY);
      if(tile!=='.'&&tile!=='X') hit=1; // X = passagem revelada (não bloqueia visão? tratamos como abertura escura)
    }
    let perp=side===0?(sdx-ddx):(sdy-ddy); if(perp<0.01)perp=0.01;
    RC.zbuf&&(RC.zbuf[x]=perp);
    const lh=Math.floor(RH/perp);
    let dS=-lh/2+RH/2|0, dE=lh/2+RH/2|0; const drawS=Math.max(0,dS),drawE=Math.min(RH-1,dE);
    let wallX=side===0?posY+perp*rdy:posX+perp*rdx; wallX-=Math.floor(wallX);
    let texX=(wallX*TW)|0; if((side===0&&rdx>0)||(side===1&&rdy<0))texX=TW-texX-1; texX&=63;
    let tex=TEX.wall; if(tile==='+')tex=TEX.door; else if(tile==='A')tex=TEX.arch;
    const fog=clamp(1.42-perp*0.13,0.16,1.24)*(side===1?0.6:1)*flick;
    let dc=null; const rawT=G.dun&&G.dun.grid[mapY]&&G.dun.grid[mapY][mapX];
    if(rawT==='S'&&G.dun&&!G.dun.secretsRevealed.has(mapX+','+mapY)) dc={tex:DECAL.secret};   // dica sutil de segredo
    else if(tile==='#'&&perp<7) dc=decalFor(mapX,mapY,side,rdx,rdy);
    const acc = TEX.accentRGB||[200,164,74];
    const stepTex=TW/lh; let texPos=(drawS-RH/2+lh/2)*stepTex;
    for(let y=drawS;y<=drawE;y++){ const ty=((texPos)|0)&63; texPos+=stepTex;
      const dp = dc? dc.tex[ty*TW+texX] : 0;
      if(dp>>>24){ let dr=dp&255,dg=(dp>>8)&255,db=(dp>>16)&255; const al=(dp>>>24)/255;
        if(dc.accent){ dr=dr*acc[0]/255; dg=dg*acc[1]/255; db=db*acc[2]/255; }
        const df = dc.torch? Math.min(1.8,fog*1.55)*flick : (dc.glow? Math.min(1.5,fog*1.3):fog);
        if(al>=0.98){ buf[y*RW+x]=shade(abgr(dr|0,dg|0,db|0),df); }
        else { // mistura com a parede (rachadura/musgo)
          const wc=shade(tex[ty*TW+texX],fog); const wr=wc&255,wg=(wc>>8)&255,wb=(wc>>16)&255;
          const sr=(dr*df)|0,sg=(dg*df)|0,sb=(db*df)|0;
          buf[y*RW+x]=abgr((wr*(1-al)+sr*al)|0,(wg*(1-al)+sg*al)|0,(wb*(1-al)+sb*al)|0);
        }
      } else buf[y*RW+x]=shade(tex[ty*TW+texX],fog);
    }
  }
  rcSprites(px,py,ang);
  RC.ctx.putImageData(RC.img,0,0);
}
/* billboard do chefe no campo (com oclusão via zbuffer) */
function rcSprites(px,py,ang){
  const d=G.dun; if(!d||!d.bossPos||d.bossDefeated)return;
  const spr=bossSprite(d.bossKey||'golem'); const {RW,RH,buf,zbuf}=RC;
  const dirX=Math.cos(ang),dirY=Math.sin(ang), plane=RW/(2*RH), planeX=-dirY*plane,planeY=dirX*plane;
  const sxr=(d.bossPos.x+0.5)-px, syr=(d.bossPos.y+0.5)-py;
  const invDet=1/(planeX*dirY-dirX*planeY);
  const tX=invDet*(dirY*sxr-dirX*syr), tY=invDet*(-planeY*sxr+planeX*syr);
  if(tY<=0.35)return;
  const scale=1.25, screenX=Math.floor((RW/2)*(1+tX/tY));
  const sh=Math.abs(RH/tY)*scale, sw=sh*(spr.w/spr.h);
  const bob=Math.sin(performance.now()/500)*2/tY;
  const feetY=RH/2 + (RH/2)/tY + bob;                    // pés no chão
  const startY=feetY-sh, endY=feetY;
  const x0=Math.floor(screenX-sw/2), fog=clamp(1.35-tY*0.12,0.2,1.2);
  for(let stripe=x0; stripe<x0+sw; stripe++){
    if(stripe<0||stripe>=RW)continue;
    if(zbuf&&tY>=zbuf[stripe])continue;                   // parede na frente → oculta
    const texX=Math.floor((stripe-x0)*spr.w/sw); if(texX<0||texX>=spr.w)continue;
    for(let y=Math.max(0,Math.floor(startY)); y<Math.min(RH,Math.floor(endY)); y++){
      const texY=Math.floor((y-startY)*spr.h/sh); if(texY<0||texY>=spr.h)continue;
      const c=spr.data[texY*spr.w+texX];
      if(c>>>24>40){ buf[y*RW+stripe]=shade(c,fog); }
    }
  }
}

/* ================= ESTADO / MASMORRA ================= */
const G={
  gp:0, floor:1, maxFloor:1, party:[], inv:{}, flags:{},
  dun:null, // floor atual
  px:1.5,py:1.5,dir:0, // pos jogador (centro célula)
  ang:0, tang:0, tx:1.5,ty:1.5, moving:false,
  explored:null, seen:null,
  state:'title', // title/explore/battle/dead/win
  stepsSince:0, encRate:0.11,
  kills:0, steps:0, depth:1,
  battle:null, resolver:null,
  scenes:{}, // floors cache p/ subir escada
};
const DIRV=[[0,-1],[1,0],[0,1],[-1,0]];
const dirAng=d=>d*Math.PI/2-Math.PI/2;  // angulo da camera alinhado ao movimento (DIRV) // N E S O (dx,dy) na grade
// visual tile p/ raycaster
function tileVisual(x,y){
  const d=G.dun; if(!d||x<0||y<0||x>=d.w||y>=d.h)return '#';
  const t=d.grid[y][x];
  if(t==='#')return '#';
  if(t==='S'){ return d.secretsRevealed.has(x+','+y)?'A':'#'; }
  if(t==='+'){ return d.doorsOpen.has(x+','+y)?'.':'+'; }
  // demais (. > < C F E B) são chão
  return '.';
}
function isSolid(x,y){ const v=tileVisual(x,y); return v==='#'||v==='+'; }

/* -------- geração procedural -------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
/* mapas FIXOS por andar (semente = andar) — salas + corredores, grandes e sempre iguais */
function genFloor(depth){
  const rng=mulberry32((0x9E3779B1 ^ (depth*2654435761))>>>0);
  const ri=(a,b)=>a+Math.floor(rng()*(b-a+1));
  const rpick=a=>a[Math.floor(rng()*a.length)];
  const rsh=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const W=19+Math.min(6,Math.floor((depth-1)/2)*2), H=15+Math.min(4,Math.floor((depth-1)/3)*2);
  const g=Array.from({length:H},()=>new Array(W).fill('#'));
  // ---- salas ----
  const rooms=[];
  for(let t=0;t<depth+30;t++){ const rw=ri(3,6),rh=ri(3,5),rx=ri(1,W-rw-2),ry=ri(1,H-rh-2);
    let ok=true; for(const r of rooms){ if(rx<r.x+r.w+1&&rx+rw+1>r.x&&ry<r.y+r.h+1&&ry+rh+1>r.y){ok=false;break;} }
    if(!ok)continue; const R={x:rx,y:ry,w:rw,h:rh,cx:rx+(rw>>1),cy:ry+(rh>>1)}; rooms.push(R);
    for(let y=ry;y<ry+rh;y++)for(let x=rx;x<rx+rw;x++)g[y][x]='.';
  }
  const carveH=(x0,x1,y)=>{for(let x=Math.min(x0,x1);x<=Math.max(x0,x1);x++)g[y][x]='.';};
  const carveV=(y0,y1,x)=>{for(let y=Math.min(y0,y1);y<=Math.max(y0,y1);y++)g[y][x]='.';};
  // ---- corredores (conecta em cadeia = tudo alcançável) ----
  const order=[...rooms].sort((a,b)=>a.cx-b.cx||a.cy-b.cy);
  for(let i=1;i<order.length;i++){ const a=order[i-1],b=order[i]; if(rng()<0.5){carveH(a.cx,b.cx,a.cy);carveV(a.cy,b.cy,b.cx);}else{carveV(a.cy,b.cy,a.cx);carveH(a.cx,b.cx,b.cy);} }
  for(let k=0;k<2+Math.floor(depth/2);k++){ const a=rpick(rooms),b=rpick(rooms); if(a!==b){carveH(a.cx,b.cx,a.cy);carveV(a.cy,b.cy,b.cx);} } // atalhos/loops
  // ---- células ----
  const cells=[]; for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(g[y][x]==='.')cells.push([x,y]);
  const key=(x,y)=>x+','+y;
  const sroom=rooms.reduce((p,c)=>(c.cx+c.cy<p.cx+p.cy?c:p)); const spawn=[sroom.cx,sroom.cy];
  // BFS
  const dist={}; dist[key(spawn[0],spawn[1])]=0; const q=[spawn];
  while(q.length){const[cx,cy]=q.shift();for(const[dx,dy] of DIRV){const nx=cx+dx,ny=cy+dy;if(g[ny]&&g[ny][nx]!=='#'&&dist[key(nx,ny)]===undefined){dist[key(nx,ny)]=dist[key(cx,cy)]+1;q.push([nx,ny]);}}}
  let far=spawn,fd=-1; for(const[x,y] of cells){const dd=dist[key(x,y)]; if(dd!==undefined&&dd>fd){fd=dd;far=[x,y];}}
  const bossRoom=rooms.reduce((p,c)=>{const dp=Math.abs(p.cx-far[0])+Math.abs(p.cy-far[1]),dc=Math.abs(c.cx-far[0])+Math.abs(c.cy-far[1]);return dc<dp?c:p;});
  g[far[1]][far[0]]='B'; // chefe guarda a saída
  let spawnDir=1; for(let d=0;d<4;d++){const nx=spawn[0]+DIRV[d][0],ny=spawn[1]+DIRV[d][1]; if(g[ny]&&g[ny][nx]!=='#'){spawnDir=d;break;}}
  // fonte numa sala intermediária
  const rbd=rooms.map(r=>({r,d:dist[key(r.cx,r.cy)]??0})).sort((a,b)=>a.d-b.d);
  const mid=rbd[Math.floor(rbd.length*0.5)]; if(mid&&g[mid.r.cy][mid.r.cx]==='.')g[mid.r.cy][mid.r.cx]='F';
  // baús em salas distantes
  let chests=0; for(const{r} of rbd.slice().reverse()){ if(chests>=2)break; if(r===sroom||r===bossRoom)continue; const x=r.x+1,y=r.y+1; if(g[y]&&g[y][x]==='.'){g[y][x]='C';chests++;} }
  // encontros
  let enc=0; for(const[x,y] of rsh(cells.slice())){ if(enc>=3)break; if(g[y][x]==='.'&&(dist[key(x,y)]??0)>4){g[y][x]='E';enc++;} }
  // portas em gargalos
  for(const[x,y] of cells){ if(g[y][x]!=='.')continue; if(rng()<0.08){ const horiz=g[y][x-1]!=='#'&&g[y][x+1]!=='#'&&g[y-1][x]==='#'&&g[y+1][x]==='#'; const vert=g[y-1][x]!=='#'&&g[y+1][x]!=='#'&&g[y][x-1]==='#'&&g[y][x+1]==='#'; if((horiz||vert)&&!(x===spawn[0]&&y===spawn[1]))g[y][x]='+'; } }
  // 2 passagens secretas garantidas: parede com chão de um lado e espaço p/ bolso do outro
  const scand=[];
  for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){ if(g[y][x]!=='#')continue;
    for(const[dx,dy] of DIRV){ const fx=x-dx,fy=y-dy, bx=x+dx,by=y+dy, bx2=x+dx*2,by2=y+dy*2;
      if(g[fy]&&g[fy][fx]==='.'&&g[by]&&g[by][bx]==='#'&&g[by2]&&g[by2][bx2]==='#'){ scand.push({x,y,dx,dy,fx,fy,bx,by,px:dy?1:0,py:dx?1:0}); break; }
    }
  }
  rsh(scand); let sec=0; const used=[];
  for(const c of scand){ if(sec>=2)break;
    if(used.some(u=>Math.abs(u.x-c.x)+Math.abs(u.y-c.y)<6))continue;   // espalha as duas
    g[c.y][c.x]='S'; g[c.by][c.bx]='.';                                // parede secreta + bolso
    if(g[c.by+c.py]&&g[c.by+c.py][c.bx+c.px]==='#'&&c.bx+c.px<W-1&&c.by+c.py<H-1)g[c.by+c.py][c.bx+c.px]='.';
    if(g[c.by-c.py]&&g[c.by-c.py][c.bx-c.px]==='#'&&c.bx-c.px>0&&c.by-c.py>0)g[c.by-c.py][c.bx-c.px]='.';
    g[c.by][c.bx]=(sec===0?'C':'E');                                   // 1º tesouro, 2º elite
    used.push(c); sec++;
  }
  g[spawn[1]][spawn[0]]='.'; g[far[1]][far[0]]='B';   // reforça spawn/saída
  return {
    w:W,h:H,grid:g, name: themeOf(depth).name+' — Andar '+depth,
    spawn:{x:spawn[0]+0.5,y:spawn[1]+0.5,dir:spawnDir},
    doorsOpen:new Set(), secretsRevealed:new Set(), looted:new Set(), triggered:new Set(), rested:new Set(),
    isBoss:true, depth,
    bossPos:{x:far[0],y:far[1]}, bossKey:bossKeyFor(depth), bossDefeated:false,
    explored:Array.from({length:H},()=>new Array(W).fill(false)),
  };
}

/* ================= CLASSES / SKILLS ================= */
// tipos de dano: slash pierce blunt (físicos) · fire ice bolt holy dark (elementais)
const ELEM={fire:'🔥',ice:'❄',bolt:'⚡',holy:'✨',dark:'🌑',slash:'⚔',pierce:'🗡',blunt:'🔨'};
const ELCOL={fire:'#ff6a3a',ice:'#66c8ff',bolt:'#ffe14a',holy:'#fff0b0',dark:'#b070e0',slash:'#e0e0e0',pierce:'#d0d0d0',blunt:'#d0c0a0',phys:'#e0e0e0'};

const SKILLS={
  // Leona — Cavaleira
  golpe_escudo:{name:'Golpe de Escudo',kind:'atk',type:'blunt',target:'one',power:110,mp:4,desc:'Dano contundente; 40% de atordoar.',status:{name:'stun',turns:1,chance:0.4}},
  brado:{name:'Brado de Guerra',kind:'debuff',target:'allEnemy',mp:8,desc:'Reduz o ataque de todos os inimigos.',status:{name:'atkDown',turns:3,pot:0.7}},
  guarda_leal:{name:'Guarda Leal',kind:'buff',target:'self',mp:5,desc:'Provoca inimigos e sobe muito sua defesa.',status:{name:'defUp',turns:3,pot:1.6},extra:'taunt'},
  luz_egide:{name:'Égide de Luz',kind:'buff',target:'allAlly',mp:14,desc:'Sobe a defesa de todo o grupo.',status:{name:'defUp',turns:3,pot:1.35},learn:6},
  // Sakura — Samurai
  corte_triplo:{name:'Corte Triplo',kind:'atk',type:'slash',target:'one',power:52,mp:6,hits:3,desc:'Três cortes rápidos no mesmo alvo.'},
  estocada:{name:'Estocada Perfurante',kind:'atk',type:'pierce',target:'one',power:150,mp:6,crit:0.35,desc:'Perfuração de crítico alto.'},
  postura_lamina:{name:'Postura da Lâmina',kind:'buff',target:'self',mp:5,desc:'Sobe seu ataque e chance de crítico.',status:{name:'atkUp',turns:3,pot:1.5},extra:'critUp'},
  furacao_aco:{name:'Furacão de Aço',kind:'atk',type:'slash',target:'allEnemy',power:85,mp:14,desc:'Corta todos os inimigos.',learn:7},
  // Celes — Maga
  fagulha:{name:'Fagulha',kind:'atk',type:'fire',target:'one',power:130,mp:4,magic:true,desc:'Chama que fere um inimigo.'},
  lasca_gelo:{name:'Lasca de Gelo',kind:'atk',type:'ice',target:'one',power:130,mp:4,magic:true,desc:'Estilhaço gélido; pode retardar.',status:{name:'slow',turns:2,chance:0.3}},
  faisca:{name:'Faísca',kind:'atk',type:'bolt',target:'one',power:130,mp:4,magic:true,desc:'Relâmpago súbito.'},
  analisar:{name:'Analisar',kind:'util',target:'one',mp:2,desc:'Revela as fraquezas do inimigo.'},
  labareda:{name:'Labareda',kind:'atk',type:'fire',target:'allEnemy',power:95,mp:14,magic:true,desc:'Explosão de fogo em todos.',learn:5},
  nevasca:{name:'Nevasca',kind:'atk',type:'ice',target:'allEnemy',power:95,mp:14,magic:true,desc:'Tempestade gélida em todos.',learn:8},
  // Darius — Sábio
  cura:{name:'Cura',kind:'heal',target:'ally',power:80,mp:5,magic:true,desc:'Restaura HP de um aliado.'},
  luz_sagrada:{name:'Luz Sagrada',kind:'atk',type:'holy',target:'one',power:120,mp:6,magic:true,desc:'Dano sagrado; forte contra mortos-vivos.'},
  antidoto:{name:'Purificar',kind:'cure',target:'ally',mp:4,desc:'Remove status negativos de um aliado.'},
  cura_maior:{name:'Cura Maior',kind:'heal',target:'ally',power:170,mp:12,magic:true,desc:'Cura poderosa em um aliado.',learn:6},
  bencao:{name:'Bênção',kind:'heal',target:'allAlly',power:75,mp:16,magic:true,desc:'Cura todo o grupo.',learn:8},
  reviver:{name:'Reviver',kind:'revive',target:'ally',power:0.5,mp:18,magic:true,desc:'Traz um aliado de volta com metade do HP.',learn:5},
  trevas:{name:'Lâmina Umbral',kind:'atk',type:'dark',target:'one',power:135,mp:8,magic:true,desc:'Golpe das sombras.',learn:7},
};

function mkChar(cls){
  const base={
    leona:{name:'Leona',cls:'Cavaleira',wtype:'slash',row:0,
      hp:180,mp:20,str:26,mag:8,def:22,res:14,agi:12,luck:10,
      skills:['golpe_escudo','guarda_leal','brado','luz_egide'], res_aff:{dark:1.0,holy:0.5}, pal:'knight'},
    sakura:{name:'Sakura',cls:'Samurai',wtype:'slash',row:0,
      hp:150,mp:24,str:30,mag:10,def:14,res:12,agi:20,luck:16,
      skills:['corte_triplo','estocada','postura_lamina','furacao_aco'], res_aff:{}, pal:'samurai'},
    celes:{name:'Celes',cls:'Maga',wtype:'blunt',row:1,
      hp:110,mp:120,str:9,mag:32,def:9,res:22,agi:15,luck:12,
      skills:['fagulha','lasca_gelo','faisca','analisar','labareda','nevasca'], res_aff:{fire:0.5}, pal:'mage'},
    darius:{name:'Darius',cls:'Sábio',wtype:'blunt',row:1,
      hp:120,mp:110,str:10,mag:28,def:11,res:24,agi:11,luck:12,
      skills:['cura','luz_sagrada','antidoto','cura_maior','bencao','reviver','trevas'], res_aff:{holy:0.4,dark:0.7}, pal:'sage'},
  }[cls];
  return {
    id:cls, side:'party', ...base,
    lv:1, xp:0, xpNext:24,
    mhp:base.hp, hp:base.hp, mmp:base.mp, mp:base.mp,
    status:{}, resolve:2, alive:true, guardF:false,
  };
}
function knownSkills(c){ return c.skills.filter(id=>{ const s=SKILLS[id]; return !s.learn||c.lv>=s.learn; }); }

/* ================= INIMIGOS ================= */
// weak: tipos que causam +dano e tiram guarda · resist: metade · imm: zero
const BEST={
  lodo:{name:'Lodo Ácido',spr:'slime',hp:70,atk:14,mag:6,def:8,res:6,agi:8,guard:2,
    weak:['fire','bolt'],resist:['blunt','ice'],xp:14,gold:8,ai:'basic',front:1,
    skills:[{name:'Cuspe Ácido',type:'nature',target:'one',power:120,status:{name:'defDown',turns:2,pot:0.75,chance:0.5}}]},
  goblin:{name:'Goblin Batedor',spr:'goblin',hp:85,atk:20,mag:4,def:10,res:6,agi:18,guard:3,
    weak:['fire','holy'],resist:[],xp:20,gold:14,ai:'aggro',front:1,
    skills:[{name:'Facada Suja',type:'pierce',target:'one',power:130,crit:0.25}]},
  morcego:{name:'Morcego Sombrio',spr:'bat',hp:55,atk:16,mag:8,def:6,res:10,agi:26,guard:2,
    weak:['bolt','holy'],resist:['dark'],xp:16,gold:6,ai:'aggro',front:1,
    skills:[{name:'Guincho',type:'bolt',target:'allEnemy',power:70,status:{name:'blind',turns:2,chance:0.3}}]},
  esqueleto:{name:'Esqueleto',spr:'skeleton',hp:100,atk:24,mag:6,def:14,res:8,agi:12,guard:3,
    weak:['blunt','holy'],resist:['pierce','dark'],imm:['poison'],xp:26,gold:16,ai:'basic',front:1,undead:1,
    skills:[{name:'Espadada',type:'slash',target:'one',power:130}]},
  cultista:{name:'Cultista',spr:'cultist',hp:90,atk:12,mag:24,def:9,res:18,agi:14,guard:3,
    weak:['holy','pierce'],resist:['dark'],xp:30,gold:22,ai:'caster',front:0,
    skills:[{name:'Chama Negra',type:'dark',target:'one',power:150,magic:true},
            {name:'Maldição',type:'dark',target:'one',power:0,status:{name:'atkDown',turns:3,pot:0.7,chance:0.8}}]},
  espectro:{name:'Espectro',spr:'wraith',hp:120,atk:22,mag:20,def:10,res:24,agi:20,guard:4,
    weak:['holy','fire'],resist:['slash','pierce','blunt'],imm:['poison','stun'],xp:40,gold:26,ai:'caster',front:0,undead:1,
    skills:[{name:'Toque Gélido',type:'ice',target:'one',power:140,magic:true,status:{name:'slow',turns:2,chance:0.4}},
            {name:'Lamento',type:'dark',target:'allEnemy',power:90,magic:true}]},
  aranha:{name:'Aranha Cripta',spr:'spider',hp:95,atk:20,mag:6,def:12,res:10,agi:22,guard:3,
    weak:['fire','blunt'],resist:['poison'],xp:28,gold:18,ai:'aggro',front:1,
    skills:[{name:'Mordida Peçonhenta',type:'pierce',target:'one',power:110,status:{name:'poison',turns:3,pot:14,chance:0.7}}]},
  // CHEFES
  golem:{name:'GOLEM DE OSSFELD',spr:'golem',hp:900,atk:34,mag:10,def:26,res:16,agi:8,guard:6,boss:1,
    weak:['bolt','pierce'],resist:['blunt','fire','ice'],imm:['poison','stun','sleep'],xp:400,gold:300,ai:'boss1',front:1,
    skills:[{name:'Punho Esmagador',type:'blunt',target:'one',power:170},
            {name:'Terremoto',type:'blunt',target:'allEnemy',power:110,status:{name:'defDown',turns:2,pot:0.8,chance:0.5}},
            {name:'Fúria de Pedra',type:'blunt',target:'one',power:220,tell:'O golem ergue os dois punhos...'}]},
  cavaleiro:{name:'CAVALEIRO DA CINZA',spr:'dknight',hp:1200,atk:40,mag:24,def:24,res:22,agi:22,guard:7,boss:1,
    weak:['holy','fire'],resist:['dark','slash','pierce'],imm:['poison','sleep'],xp:800,gold:600,ai:'boss2',front:1,undead:1,
    skills:[{name:'Lâmina Cinza',type:'slash',target:'one',power:180,crit:0.3},
            {name:'Onda Umbral',type:'dark',target:'allEnemy',power:130,magic:true},
            {name:'Voto de Cinzas',type:'buff',target:'self',status:{name:'atkUp',turns:3,pot:1.5},tell:'O cavaleiro reúne as cinzas...'},
            {name:'Julgamento',type:'dark',target:'one',power:260,magic:true,tell:'Uma luz negra se concentra...'}]},
};
function mkEnemy(key,lvBoost){
  const b=BEST[key], lv=(G.depth||1)+(lvBoost||0), sc=1+(G.depth-1)*0.13;
  const e={ key, side:'enemy', name:b.name, spr:b.spr, boss:!!b.boss, undead:!!b.undead,
    mhp:Math.round(b.hp*sc), hp:Math.round(b.hp*sc),
    atk:Math.round(b.atk*sc), mag:Math.round(b.mag*sc), def:Math.round(b.def*sc), res:Math.round(b.res*sc),
    agi:b.agi, guardMax:b.guard, guard:b.guard, broken:false, brokenT:0,
    weak:new Set(b.weak||[]), resist:new Set(b.resist||[]), imm:new Set(b.imm||[]),
    xp:Math.round(b.xp*sc), gold:Math.round(b.gold*sc), skills:b.skills||[], ai:b.ai, front:b.front,
    phases:b.phases, phase:0,
    status:{}, alive:true, scanned:false, discovered:new Set(),
    sx:0,sy:0,scale:1, hitFlash:0, bob:Math.random()*6 };
  if(!b.boss && chance(eliteChance(G.depth||1))) makeElite(e);
  return e;
}
// tabelas de encontro por profundidade
function rollFormation(boss){
  if(boss){ return G.depth>=10 ? [mkEnemy('cavaleiro')] : [mkEnemy('golem')]; }
  const d=G.depth, tables=[];
  if(d<=2) tables.push(['lodo','lodo'],['goblin','lodo'],['morcego','morcego','lodo'],['goblin']);
  if(d>=2&&d<=4) tables.push(['goblin','goblin'],['esqueleto','morcego'],['aranha','lodo'],['esqueleto','esqueleto']);
  if(d>=3) tables.push(['cultista','esqueleto'],['aranha','aranha','morcego'],['espectro','cultista'],['esqueleto','esqueleto','goblin']);
  if(d>=4) tables.push(['espectro','esqueleto','esqueleto'],['cultista','cultista','aranha'],['espectro','espectro']);
  const f=pick(tables); return f.map(k=>mkEnemy(k));
}

/* ============ PRESSÁGIOS (condições de campo) ============ */
const CONDITIONS={
  nevoa:{name:'Névoa Espessa',icon:'🌫',desc:'Ataques erram mais.'},
  veias_fogo:{name:'Veias de Fogo',icon:'🔥',desc:'Dano de FOGO +45%.'},
  terra_sagrada:{name:'Terra Sagrada',icon:'✨',desc:'Dano SAGRADO +45%.'},
  gelo_eterno:{name:'Frio Cortante',icon:'❄',desc:'Dano de GELO +45%.'},
  tempestade:{name:'Tempestade',icon:'⚡',desc:'Dano de RAIO +45%.'},
  escuridao:{name:'Escuridão Profunda',icon:'🌑',desc:'Inimigos golpeiam +25% mais forte.'},
  chao_maldito:{name:'Chão Amaldiçoado',icon:'☠',desc:'Todos perdem HP a cada rodada.'},
  frenesi:{name:'Frenesi',icon:'💨',desc:'Todos agem mais rápido.'},
  sangue:{name:'Lua de Sangue',icon:'🩸',desc:'Chance de CRÍTICO muito maior.'},
  guarda_ferrea:{name:'Guarda Férrea',icon:'🛡',desc:'Inimigos com guarda reforçada.'},
  presenca:{name:'Presença Sombria',icon:'👁',desc:'Inimigos começam enfurecidos.'},
  eco:{name:'Eco Arcano',icon:'🔮',desc:'Magias custam metade do MP.'},
  fartura:{name:'Fartura de Ânimo',icon:'⚔',desc:'Vocês começam com Resolve cheio.'},
};
function rollConditions(depth,boss){ const out=[];
  if(boss){ out.push(pick(['veias_fogo','terra_sagrada','escuridao','presenca','frenesi','sangue'])); if(depth>=10&&chance(.6))out.push('guarda_ferrea'); }
  else { const n=(depth>=6&&chance(0.35))?2:((depth>=2||chance(0.45))?1:0);
    const pool=shuffle(Object.keys(CONDITIONS)); for(let i=0;i<n;i++)out.push(pool[i]); }
  return [...new Set(out)];
}
function has_c(k){ return G.battle&&G.battle.conds&&G.battle.conds.includes(k); }
function elemAmp(type){ let m=1;
  if(type==='fire'&&has_c('veias_fogo'))m*=1.45; if(type==='holy'&&has_c('terra_sagrada'))m*=1.45;
  if(type==='ice'&&has_c('gelo_eterno'))m*=1.45; if(type==='bolt'&&has_c('tempestade'))m*=1.45;
  return m; }

/* ============ ELITES / AFIXOS ============ */
const AFFIXES={
  blindado:{name:'Blindado',color:'#6ab0ff',apply:e=>{e.guardMax+=2;e.guard+=2;e.def=Math.round(e.def*1.4);}},
  voraz:{name:'Voraz',color:'#d8484a',lifesteal:0.45},
  igneo:{name:'Ígneo',color:'#ff7a3a',apply:e=>{e.weak.delete('fire');e.weak.add('ice');e.resist.add('fire');},onHit:'burn'},
  veloz:{name:'Veloz',color:'#7ce07c',apply:e=>{e.agi=Math.round(e.agi*1.4);},extraTurn:true},
  vingativo:{name:'Vingativo',color:'#e8c24a',counter:0.6},
  colossal:{name:'Colossal',color:'#c89aff',apply:e=>{e.mhp=Math.round(e.mhp*1.8);e.hp=e.mhp;e.atk=Math.round(e.atk*1.3);e.guardMax+=1;e.guard+=1;e.scaleMul=1.3;}},
  regenerativo:{name:'Regenerativo',color:'#5ec86a',regen:true},
  aquecido:{name:'Enfurecido',color:'#ff9a3a',apply:e=>{e.status.atkUp={turns:99,pot:1.4};}},
};
function eliteChance(depth){ return Math.min(0.4,0.08+depth*0.035); }
function makeElite(e){ const key=pick(Object.keys(AFFIXES)), af=AFFIXES[key];
  e.affix=key; e.affixName=af.name; e.affixColor=af.color; e.elite=true;
  e.name=af.name+' '+e.name; e.xp=Math.round(e.xp*2.3); e.gold=Math.round(e.gold*2); e.eliteDrop=true;
  if(af.apply)af.apply(e); if(af.regen)e.status.regen={turns:99,dmg:Math.round(e.mhp*0.06)};
  return e; }

/* ================= COMBATE ================= */
function startBattle(formation,opts){
  opts=opts||{};
  const conds=rollConditions(G.depth||1,!!opts.boss);
  G.battle={enemies:formation, round:1, boss:!!opts.boss, log:[], over:false, conds, fury:0};
  // aplica presságios de setup
  formation.forEach(e=>{
    if(conds.includes('guarda_ferrea')){ e.guardMax++; e.guard++; }
    if(conds.includes('presenca')) e.status.atkUp={turns:99,pot:1.4};
  });
  G.party.forEach(c=>{ c.resolve = conds.includes('fartura')?5:Math.max(c.resolve,2); c.guardF=false; });
  G.state='battle';
  $('#battle').classList.add('on');
  musicStart('battle');
  layoutEnemies();
  renderBparty(); renderTurnQ(); renderFury();
  const elites=formation.filter(e=>e.elite);
  blog(opts.boss?('⚠ '+formation[0].name+' ergue-se diante de vocês!'):(elites.length?'Uma ameaça incomum emboscou o grupo!':'Inimigos emboscam o grupo!'));
  bfxLoop();
  showCondBanner(conds, opts.boss?formation[0].name:null);
  renderCondChip();
  setTimeout(()=>battleLoop(), conds.length?1900:800);
}
function showCondBanner(conds,bossName){
  const f=$('#bfield'); const b=document.createElement('div'); b.id='condBanner';
  b.innerHTML=(bossName?`<div class="cbBoss">${bossName}</div>`:'')+
    (conds.length?`<div class="cbTitle">✦ PRESSÁGIOS ✦</div>`+conds.map(k=>`<div class="cbItem"><b>${CONDITIONS[k].icon} ${CONDITIONS[k].name}</b><small>${CONDITIONS[k].desc}</small></div>`).join(''):'');
  if(!b.innerHTML)return; f.appendChild(b);
  setTimeout(()=>{ b.style.opacity='0'; setTimeout(()=>b.remove(),600); }, bossName?2400:1600);
}
function renderCondChip(){ const f=$('#bfield'); const old=$('#condChip'); if(old)old.remove(); const op=$('#condPanel'); if(op)op.remove();
  const conds=(G.battle&&G.battle.conds)||[]; const elites=G.battle&&G.battle.enemies.filter(e=>e.affix);
  if(!conds.length && !(elites&&elites.length))return;
  const chip=document.createElement('div'); chip.id='condChip'; chip.textContent='✦'; chip.title='Ver presságios da batalha';
  chip.onclick=showCondPanel; f.appendChild(chip);
}
function showCondPanel(){ const ex=$('#condPanel'); if(ex){ex.remove();return;}
  const conds=(G.battle&&G.battle.conds)||[]; const p=document.createElement('div'); p.id='condPanel';
  let html='<div class="cpTitle">✦ PRESSÁGIOS</div>';
  if(!conds.length)html+='<div class="cpItem"><small>Batalha comum, sem presságios.</small></div>';
  conds.forEach(k=>html+=`<div class="cpItem"><b>${CONDITIONS[k].icon} ${CONDITIONS[k].name}</b><small>${CONDITIONS[k].desc}</small></div>`);
  const elites=(G.battle&&G.battle.enemies.filter(e=>e.affix))||[];
  if(elites.length){ html+='<div class="cpTitle" style="margin-top:8px">👑 ELITES</div>';
    elites.forEach(e=>html+=`<div class="cpItem"><b style="color:${e.affixColor}">${e.affixName}</b> <small>${e.name}</small></div>`); }
  html+='<div class="cpClose">toque para fechar</div>';
  p.innerHTML=html; p.onclick=()=>p.remove(); $('#bfield').appendChild(p);
}
function layoutEnemies(){
  const es=G.battle.enemies, cv=$('#benemies'); const W=cv.clientWidth||cv.width, H=cv.clientHeight||cv.height;
  const n=es.length;
  es.forEach((e,i)=>{
    if(e.boss){ e.sx=0.5; e.sy=0.6; e.scale=2.0; }
    else{ const cols=Math.min(n,3), rowI=Math.floor(i/3), inRow=Math.min(cols,n-rowI*3), col=i%3;
      e.sx=(col+0.5)/inRow*0.86+0.07; e.sy=0.42+rowI*0.22; e.scale=(1.1-rowI*0.12)*(e.scaleMul||1); }
  });
}
function alliesAlive(){return G.party.filter(c=>c.alive);}
function enemiesAlive(){return G.battle.enemies.filter(e=>e.alive);}

async function battleLoop(){
  const b=G.battle;
  while(!b.over){
    // ordem por agilidade efetiva
    const combatants=[...G.party.filter(c=>c.alive),...b.enemies.filter(e=>e.alive)];
    b.enemies.filter(e=>e.alive&&e.affix==='veloz').forEach(e=>combatants.push(e)); // Veloz age 2x
    b.order=combatants.map(c=>({c,ini:effAgi(c)+rnd(0,4)})).sort((a,z)=>z.ini-a.ini).map(o=>o.c);
    renderTurnQ();
    for(const c of b.order){
      if(b.over)break; if(!c.alive)continue;
      // atordoado / dormindo / quebrado
      if(c.side==='enemy'&&c.broken){ blog(c.name+' está QUEBRADO e não age!'); c.broken=false; c.guard=c.guardMax; c.brokenT=0; markDirty(); await wait(500); continue; }
      if(c.status.stun){ blog(name(c)+' está atordoado!'); tickOne(c,'stun'); await wait(450); continue; }
      if(c.status.sleep){ blog(name(c)+' dorme...'); await wait(450); continue; }
      if(c.side==='party'){ c.resolve=Math.min(5,c.resolve+1); await playerTurn(c); }
      else { await enemyTurn(c); }
      if(checkEnd())break;
    }
    if(b.over)break;
    await endOfRound();
    if(checkEnd())break;
    b.round++;
  }
}
function effAgi(c){ let a=c.agi; if(c.status.slow)a*=0.5; if(c.status.haste)a*=1.5; if(has_c('frenesi'))a*=1.3; return a; }
function name(c){return c.name;}

function checkEnd(){
  const b=G.battle; if(b.over)return true;
  if(enemiesAlive().length===0){ b.over=true; setTimeout(()=>winBattle(),400); return true; }
  if(alliesAlive().length===0){ b.over=true; setTimeout(()=>loseBattle(),400); return true; }
  return false;
}

/* -------- turno do jogador -------- */
let UI={boost:0};
function playerTurn(c){ return new Promise(res=>{
  G.resolver=res; G.curActor=c; UI.boost=0;
  renderBparty(); showActionMenu(c);
});}
function finishTurn(){ const r=G.resolver; G.resolver=null; hideMenus(); if(r)r(); }

function showActionMenu(c){
  const m=$('#bmenu'); m.classList.add('on'); $('#bsub').classList.remove('on'); renderFury();
  const canMag=!c.status.silence;
  const furyReady=G.battle&&G.battle.fury>=100;
  m.innerHTML=`<div class="actrow">
    ${furyReady?`<div class="act fury" data-a="fury" style="flex-basis:100%;max-width:none">🔥 INVESTIDA FINAL<small>toda a party golpeia — gasta a FÚRIA</small></div>`:''}
    <div class="act hot" data-a="attack">⚔ ATACAR<small>${ELEM[c.wtype]} ${c.wtype}</small></div>
    <div class="act ${knownSkills(c).filter(id=>SKILLS[id].kind!=='heal'&&!SKILLS[id].magic).length? '':'dis'}" data-a="skill">✦ TÉCNICA<small>habilidades</small></div>
    <div class="act ${canMag&&knownSkills(c).some(id=>SKILLS[id].magic)?'':'dis'}" data-a="magic">✧ MAGIA<small>${c.mp}/${c.mmp} MP</small></div>
    <div class="act" data-a="item">🜂 ITEM<small>usar</small></div>
    <div class="act" data-a="guard">🛡 DEFENDER<small>+Resolve</small></div>
  </div>`;
  m.querySelectorAll('.act').forEach(el=>el.onclick=()=>{ if(el.classList.contains('dis'))return; SFX.ui(); onAction(c,el.dataset.a); });
}
function hideMenus(){ $('#bmenu').classList.remove('on'); $('#bsub').classList.remove('on'); clearTargets(); }

function onAction(c,a){
  if(a==='guard'){ c.guardF=true; c.resolve=Math.min(5,c.resolve+1); furyGain(4); blog(c.name+' assume a guarda.'); SFX.ui(); finishTurn(); return; }
  if(a==='fury'){ chooseTarget(c,{kind:'fury'}); return; }
  if(a==='attack'){ chooseTarget(c,{kind:'attack'}); return; }
  if(a==='skill'){ openSub(c,knownSkills(c).filter(id=>!SKILLS[id].magic&&SKILLS[id].kind!=='heal'&&SKILLS[id].kind!=='revive'&&SKILLS[id].kind!=='cure'),'TÉCNICAS'); return; }
  if(a==='magic'){ openSub(c,knownSkills(c).filter(id=>SKILLS[id].magic||['heal','cure','revive','util'].includes(SKILLS[id].kind)),'MAGIAS'); return; }
  if(a==='item'){ openItems(c); return; }
}
function openSub(c,ids,label){
  const s=$('#bsub'); s.classList.add('on'); $('#bmenu').classList.remove('on'); clearTargets();
  let html=`<div class="subhead"><span>${label}</span><span class="back" data-back>‹ voltar</span></div>`;
  if(!ids.length)html+=`<div style="color:#888;padding:12px">Nada disponível.</div>`;
  for(const id of ids){ const sk=SKILLS[id]; const afford=c.mp>=(sk.mp||0);
    const cost=sk.mp?`<span class="si-cost">${sk.mp} MP</span>`:`<span class="si-cost res">—</span>`;
    html+=`<div class="subitem ${afford?'':'dis'}" data-sk="${id}">
      <div><div class="si-name">${sk.type?ELEM[sk.type]+' ':''}${sk.name}</div><div class="si-desc">${sk.desc}</div></div>${cost}</div>`;
  }
  s.innerHTML=html;
  s.querySelector('[data-back]').onclick=()=>{SFX.back();showActionMenu(c);};
  s.querySelectorAll('.subitem').forEach(el=>{ if(el.classList.contains('dis'))return;
    el.onclick=()=>{ SFX.ui(); onSkill(c,el.dataset.sk); }; });
}
function onSkill(c,id){ const sk=SKILLS[id];
  if(['heal','cure','revive'].includes(sk.kind)){ chooseTarget(c,{kind:'skill',id}); return; }
  if(sk.target==='self'){ execSkill(c,id,[c]); return; }
  if(sk.target==='allAlly'){ execSkill(c,id,alliesAlive()); return; }
  if(sk.target==='allEnemy'){ execSkill(c,id,enemiesAlive()); return; }
  chooseTarget(c,{kind:'skill',id});
}

/* seleção de alvo com controle de Impulso (Resolve) */
function backToMenu(c,sk){ if(!sk)showActionMenu(c);
  else openSub(c, sk.magic?knownSkills(c).filter(id=>SKILLS[id].magic||['heal','cure','revive','util'].includes(SKILLS[id].kind)):knownSkills(c).filter(id=>!SKILLS[id].magic&&SKILLS[id].kind!=='heal'&&SKILLS[id].kind!=='revive'&&SKILLS[id].kind!=='cure'), sk.magic?'MAGIAS':'TÉCNICAS'); }
function chooseTarget(c,act){
  const sk=act.id?SKILLS[act.id]:null;
  const allyTarget=sk&&['heal','cure','revive'].includes(sk.kind);
  clearTargets(); $('#bmenu').classList.remove('on'); $('#bsub').classList.remove('on');
  UI.boost=0;
  const multiHit=act.kind==='attack';
  const canBoost=c.resolve>0 && (multiHit||(sk&&(sk.kind==='atk'||sk.kind==='heal')));
  const maxLv=Math.min(3,c.resolve);
  const lvlText=i=> multiHit ? (i===0?'1 golpe':(i+1)+' golpes') : (i===0?'normal':'+'+(i*50)+'%');
  let lvHtml='';
  if(canBoost){ for(let i=0;i<=maxLv;i++){
    lvHtml+=`<div class="blvl${i===0?' on':''}" data-lv="${i}"><b>${lvlText(i)}</b><small>${i===0?'grátis':'custa '+i+'⚡'}</small></div>`; } }
  const havePips='⚡'.repeat(c.resolve)+'·'.repeat(Math.max(0,5-c.resolve));
  const bar=document.createElement('div'); bar.id='tgtBar';
  const head = act.kind==='fury' ? '🔥 Alvo da INVESTIDA FINAL' : (allyTarget?'💚 Escolha o aliado':'🎯 Toque no inimigo');
  bar.innerHTML=`<div class="tgtHead"><span>${head}</span><span class="tgtCancel">✕ voltar</span></div>
    ${canBoost?`<div class="boostRow"><span class="boostLbl">IMPULSO<br><span class="impHave">${havePips}</span></span><div class="blvls">${lvHtml}</div></div>`:''}`;
  $('#bfield').appendChild(bar);
  if(canBoost){ bar.querySelectorAll('.blvl').forEach(el=>el.onclick=()=>{ UI.boost=+el.dataset.lv; SFX.ui();
    bar.querySelectorAll('.blvl').forEach(x=>x.classList.toggle('on',x===el)); }); }
  bar.querySelector('.tgtCancel').onclick=()=>{ SFX.back(); clearTargets(); backToMenu(c,sk); };
  const targets= allyTarget ? (sk.kind==='revive'?G.party.filter(c=>!c.alive):alliesAlive()) : enemiesAlive();
  if(allyTarget){ // alvo em cards da party
    targets.forEach(t=>{ const idx=G.party.indexOf(t); const card=$('#bparty').children[idx];
      if(!card)return; const dot=document.createElement('div'); dot.className='tgtDot'; dot.textContent='▾';
      dot.style.cssText+='position:absolute;left:50%;top:-6px;'; card.style.position='relative'; card.appendChild(dot);
      card.onclick=()=>{ SFX.ui(); clearTargets(); act.kind==='attack'?doAttack(c,t):execSkill(c,act.id,[t]); };
    });
  } else {
    const cv=$('#benemies'); const rect=cv.getBoundingClientRect(), frect=$('#bfield').getBoundingClientRect();
    targets.forEach(t=>{ const dot=document.createElement('div'); dot.className='tgtDot'; dot.textContent='▾';
      dot.style.left=(rect.left-frect.left+t.sx*rect.width)+'px'; dot.style.top=(rect.top-frect.top+t.sy*rect.height-t.scale*44)+'px';
      $('#bfield').appendChild(dot);
      dot.onclick=()=>{ SFX.ui(); clearTargets(); act.kind==='fury'?furyStrike(c,t):act.kind==='attack'?doAttack(c,t):execSkill(c,act.id,[t]); };
    });
  }
}
function clearTargets(){ $$('#bfield .tgtDot').forEach(d=>d.remove()); const b=$('#tgtBar'); if(b)b.remove(); G.party.forEach((c,i)=>{const el=$('#bparty').children[i]; if(el)el.onclick=null;}); }

/* -------- execução de ações -------- */
function spend(c,sk){ if(sk&&sk.mp){c.mp=Math.max(0,c.mp-sk.mp);}
  const use=Math.min(UI.boost||0, c.resolve); UI.boost=use;      // trava: nunca gasta mais do que tem
  if(use>0){ c.resolve=Math.max(0,c.resolve-use); popup(c,'−'+use+'⚡','miss'); flashCard(c,'#e8c15a'); }
}
async function doAttack(c,t){
  hideMenus(); spend(c,null); const boost=UI.boost;
  const hits=1+boost; // cada impulso = +1 golpe
  await animAttack(c);
  for(let i=0;i<hits;i++){ if(!t.alive)break;
    applyHit(c,t,{type:c.wtype,power:100,magic:false});
    await wait(180);
  }
  markDirty(); await wait(200); finishTurn();
}
async function execSkill(c,id,targets){
  hideMenus(); const sk=SKILLS[id]; spend(c,sk); const boost=UI.boost;
  await animCast(c,sk);
  if(sk.kind==='util'){ // analisar
    targets.forEach(t=>{ t.scanned=true; blog('Fraquezas de '+t.name+' reveladas!'); });
    markDirty(); await wait(300); finishTurn(); return;
  }
  if(sk.kind==='buff'||sk.kind==='debuff'){
    targets.forEach(t=>{ applyStatus(t,sk.status); });
    if(sk.extra==='taunt'){ c._taunt=2; blog(c.name+' provoca os inimigos!'); }
    if(sk.extra==='critUp'){ applyStatus(c,{name:'critUp',turns:3}); }
    blog(c.name+' usa '+sk.name+'.');
    markDirty(); await wait(400); finishTurn(); return;
  }
  if(sk.kind==='heal'){ const pw=sk.power*(1+boost*0.5);
    targets.forEach(t=>{ const amt=Math.round((pw+c.mag*1.2)); heal(t,amt); });
    SFX.heal(); blog(c.name+' conjura '+sk.name+'.'); markDirty(); await wait(400); finishTurn(); return;
  }
  if(sk.kind==='cure'){ targets.forEach(t=>{ t.status={}; }); SFX.heal(); blog(c.name+' purifica '+targets[0].name+'.'); markDirty(); await wait(350); finishTurn(); return; }
  if(sk.kind==='revive'){ targets.forEach(t=>{ t.alive=true; t.hp=Math.round(t.mhp*0.5); t.status={}; }); SFX.holy(); blog(c.name+' revive '+targets[0].name+'!'); markDirty(); await wait(500); finishTurn(); return; }
  if(sk.kind==='atk'){ const hits=sk.hits||1;
    for(const t of targets){ if(!t.alive)continue;
      for(let h=0;h<hits;h++){ if(!t.alive)break; applyHit(c,t,{type:sk.type,power:sk.power*(1+boost*0.5)/ (targets.length>1?1:1),magic:sk.magic,crit:sk.crit,status:sk.status}); await wait(140); }
    }
    blog(c.name+' usa '+sk.name+'.'); markDirty(); await wait(250); finishTurn(); return;
  }
  finishTurn();
}

/* núcleo de dano */
function applyHit(src,tgt,o){
  if(!tgt.alive)return;
  const isMag=o.magic; let atk=isMag?(src.mag||0):(src.str!=null?src.str:(src.atk||0));
  // buffs
  if(src.status.atkUp)atk*=src.status.atkUp.pot||1.4; if(src.status.atkDown)atk*=src.status.atkDown.pot||0.7;
  let base=atk*(o.power/100);
  // defesa
  let dfn=isMag?tgt.res:tgt.def;
  if(tgt.status&&tgt.status.defUp)dfn*=tgt.status.defUp.pot||1.4; if(tgt.status&&tgt.status.defDown)dfn*=tgt.status.defDown.pot||0.75;
  if(tgt.guardF)dfn*=1.8;
  let dmg=base*(base/(base+dfn*1.2));
  // linha de trás (físico corpo a corpo enfraquece)
  if(!isMag && src.side==='party' && src.row===1 && ['slash','pierce','blunt'].includes(o.type)) dmg*=0.6;
  // elemento / fraqueza / resist
  let mult=1, weak=false;
  const w= tgt.side==='enemy'?tgt.weak:null, r=tgt.side==='enemy'?tgt.resist:null, im=tgt.side==='enemy'?tgt.imm:null;
  if(tgt.side==='enemy'){
    if(im&&im.has(o.type))mult=0;
    else if(w&&w.has(o.type)){mult=1.6;weak=true;}
    else if(r&&r.has(o.type))mult=0.5;
    if(tgt.undead&&o.type==='holy'){mult=Math.max(mult,1.8);weak=true;}
  } else { // dano em aliado (raro, magias inimigas)
    const aff=tgt.res_aff&&tgt.res_aff[o.type]; if(aff!=null)mult*=aff;
  }
  if(tgt.broken)mult*=1.75;                       // quebra recompensa mais
  dmg*=mult; dmg*=elemAmp(o.type);                // presságios elementais
  if(src.side==='enemy'&&has_c('escuridao'))dmg*=1.25;
  // crítico
  let crit=false; const critC=(o.crit||0.06)+(src.status.critUp?0.25:0)+(src.luck||0)/300+(has_c('sangue')?0.15:0);
  if(mult>0&&chance(critC)){crit=true;dmg*=1.85;}
  // acerto/erro (cego / névoa / escuridão)
  let missC=(src.status.blind?0.4:0); if(has_c('nevoa'))missC+=0.16; if(has_c('escuridao')&&src.side==='party')missC+=0.1;
  if(mult>0&&missC>0&&chance(missC)){ popup(tgt,'ERROU','miss'); SFX.miss(); return; }
  dmg=Math.max(mult>0?1:0,Math.round(dmg*rnd(0.9,1.1)));
  tgt.hp=clamp(tgt.hp-dmg,0,tgt.mhp); tgt.hitFlash=1;
  // fúria + afixos ao causar dano
  if(dmg>0){
    if(src.side==='party') furyGain(clamp(dmg*0.07,1,13)); else if(tgt.side==='party') furyGain(6);
    const saf=src.affix&&AFFIXES[src.affix];
    if(saf&&saf.lifesteal&&src.alive){ const ls=Math.round(dmg*saf.lifesteal); if(ls>0){src.hp=clamp(src.hp+ls,0,src.mhp);popup(src,'+'+ls,'heal');} }
    if(src.affix==='igneo'&&tgt.side==='party'&&chance(0.6)) applyStatus(tgt,{name:'burn',turns:2,dmg:Math.round((src.mag||8)*0.8+8)});
  }
  // quebra de guarda
  if(tgt.side==='enemy'&&weak&&!tgt.broken){ tgt.guard=Math.max(0,tgt.guard-1); tgt.discovered.add(o.type);
    if(tgt.guard<=0){ breakEnemy(tgt); } }
  else if(tgt.side==='enemy'&&mult>0){ tgt.discovered.add(o.type); }
  // popups + som + efeitos
  if(mult===0){ popup(tgt,'IMUNE','miss'); SFX.miss(); }
  else{ popup(tgt, dmg, crit?'crit':weak?'weak':''); shakeField(crit?11:weak?8:5);
    crit?SFX.crit():weak?SFX.weak():(o.type&&ELEM[o.type]&&!['slash','pierce','blunt'].includes(o.type)? (SFX[o.type]?SFX[o.type]():SFX.hit()) : SFX.hit());
    if(tgt.side==='enemy'){ const ps=enemyScreen(tgt);
      if(o.type&&ELCOL[o.type]&&!['slash','pierce','blunt'].includes(o.type)) fxElem(ps.x,ps.y,o.type);
      else fxSlash(ps.x,ps.y,crit?'#ffe27a':'#eef0f4');
      fxImpact(ps.x,ps.y,crit?'#ffe27a':weak?'#ff8a3a':'#d8d8d8');
    } else { flashCard(tgt, crit?'#ff9a3a':'#e04a3e'); }
  }
  if(weak&&!crit)popup(tgt,'FRACO!','break');
  // status colateral
  if(o.status && (o.status.chance==null||chance(o.status.chance)) && tgt.hp>0){ applyStatus(tgt,o.status); }
  if(tgt.hp<=0){ tgt.hp=0; killTarget(tgt); }
  // contra-ataque (afixo Vingativo)
  else if(!o.noCounter && tgt.side==='enemy' && tgt.affix && AFFIXES[tgt.affix]&&AFFIXES[tgt.affix].counter && src.side==='party' && src.alive){
    setTimeout(()=>{ if(tgt.alive&&src.alive&&G.state==='battle'){ blog('↩ '+tgt.name+' contra-ataca!'); applyHit(tgt,src,{type:'blunt',power:95,noCounter:true}); markDirty(); renderBparty(); } }, 280);
  }
}
function breakEnemy(e){ e.broken=true; e.brokenT=1; popup(e,'QUEBRADO!','break'); SFX.brk(); shakeField(15); const ps=enemyScreen(e); fxBreak(ps.x,ps.y); furyGain(18);
  if(e.charging){ e.charging=null; blog('⚡ '+e.name+' QUEBRADO! A investida foi INTERROMPIDA!'); }
  else blog('⚡ '+e.name+' teve a guarda QUEBRADA!'); }
function heal(t,amt){ if(!t.alive)return; amt=Math.round(amt*rnd(0.95,1.08)); t.hp=clamp(t.hp+amt,0,t.mhp); popup(t,'+'+amt,'heal'); if(t.side==='party')flashCard(t,'#7ce07c'); }
function applyStatus(t,st){ if(!st||!st.name)return;
  if(t.imm&&t.imm.has(st.name))return;
  t.status[st.name]={turns:st.turns||2, pot:st.pot, dmg:st.dmg||st.pot};
  const lbl={poison:'envenenado',burn:'em chamas',stun:'atordoado',sleep:'adormecido',blind:'cego',silence:'silenciado',slow:'lento',atkUp:'ATK↑',atkDown:'ATK↓',defUp:'DEF↑',defDown:'DEF↓',critUp:'CRIT↑',haste:'rápido',regen:'regen'}[st.name]||st.name;
  if(['poison','burn','stun','sleep','blind','silence','slow','atkDown','defDown'].includes(st.name)) blog(name(t)+' agora está '+lbl+'.');
}
function killTarget(t){
  if(t.side==='enemy'){ t.alive=false; t.dieT=1; blog(t.name+' foi derrotado!'); }
  else { t.alive=false; t.hp=0; blog(t.name+' caiu!'); SFX.down(); }
  markDirty();
}
function tickOne(c,key){ const s=c.status[key]; if(!s)return; s.turns--; if(s.turns<=0)delete c.status[key]; }

async function endOfRound(){
  const all=[...G.party,...G.battle.enemies];
  if(has_c('chao_maldito')){ for(const c of all){ if(!c.alive)continue; const d=Math.round(c.mhp*0.05); c.hp=clamp(c.hp-d,0,c.mhp); popup(c,d,'weak'); if(c.hp<=0)killTarget(c); } blog('☠ O chão amaldiçoado drena a vida de todos.'); }
  for(const c of all){ if(!c.alive)continue;
    // dano/regen por status
    if(c.status.poison){ const d=Math.round(c.status.poison.dmg||10); c.hp=clamp(c.hp-d,0,c.mhp); popup(c,d,'weak'); if(c.hp<=0)killTarget(c); }
    if(c.status.burn){ const d=Math.round(c.status.burn.dmg||12); c.hp=clamp(c.hp-d,0,c.mhp); popup(c,d,'weak'); if(c.hp<=0)killTarget(c); }
    if(c.status.regen){ heal(c,Math.round(c.status.regen.dmg||20)); }
    // decrementa durações
    for(const k in c.status){ c.status[k].turns--; if(c.status[k].turns<=0)delete c.status[k]; }
    if(c.side==='party')c.guardF=false;
    if(c._taunt)c._taunt--;
  }
  markDirty(); renderBparty(); await wait(200);
}

/* -------- IA inimiga -------- */
function pickTarget(e,foes){
  const taunter=G.party.find(c=>c.alive&&c._taunt>0); if(taunter)return taunter;
  // casters miram a linha de trás (magos/curandeiros) com frequência
  if((e.ai==='caster'||e.boss)&&chance(0.45)){ const back=foes.filter(c=>c.row===1); if(back.length)return pick(back); }
  const pool=[...foes].sort((a,b)=>(a.hp/a.mhp)-(b.hp/b.mhp)); // foca o mais ferido
  return chance(0.62)?pool[0]:pick(foes);
}
function bossPhaseCheck(e){ if(!e.boss)return; const hpf=e.hp/e.mhp;
  if(e.key==='golem'){ if(e.phase<1&&hpf<=0.5){ e.phase=1; e.status.atkUp={turns:99,pot:1.35}; e.guard=e.guardMax; blog('🪨 O GOLEM racha e ENFURECE — a terra treme!'); flashScreen(0.4); shakeField(14); } }
  if(e.key==='cavaleiro'){ if(e.phase<1&&hpf<=0.6){ e.phase=1; e.status.atkUp={turns:99,pot:1.25}; blog('🗡 O Cavaleiro reúne as cinzas ao seu redor...'); }
    if(e.phase<2&&hpf<=0.3){ e.phase=2; e.status.critUp={turns:99}; e.guard=e.guardMax; blog('💀 As cinzas se erguem — o JULGAMENTO está próximo!'); flashScreen(0.5); shakeField(16); } }
}
function chooseEnemyAction(e){
  const basic={type:'blunt',power:100,target:'one'};
  if(e.boss){
    if(e.key==='golem'){
      if(e.phase>=1&&chance(0.4)) return {name:'Fúria de Pedra',type:'blunt',power:265,target:'one',charge:true};
      if(chance(0.38)) return {name:'Terremoto',type:'blunt',power:110,target:'all',status:{name:'defDown',turns:2,pot:0.8,chance:0.5}};
      if(chance(0.5)) return {name:'Punho Esmagador',type:'blunt',power:165,target:'one'};
      return basic;
    }
    if(e.key==='cavaleiro'){
      if(e.phase>=2&&chance(0.5)) return {name:'Julgamento das Cinzas',type:'dark',power:235,magic:true,target:'all',charge:true};
      if(chance(0.3)) return {name:'Onda Umbral',type:'dark',power:125,magic:true,target:'all'};
      if(chance(0.22)) return {kind:'buff',name:'Voto de Cinzas',status:{name:'atkUp',turns:3,pot:1.4},target:'self'};
      if(chance(0.6)) return {name:'Lâmina Cinza',type:'slash',power:170,crit:0.3,target:'one'};
      return basic;
    }
  }
  if(e.skills&&e.skills.length && (e.ai==='caster'?chance(0.72):chance(0.5))){ const s=pick(e.skills);
    return {name:s.name,type:s.type,power:s.power,magic:s.magic,crit:s.crit,target:s.target==='allEnemy'?'all':'one',status:s.status,kind:s.kind}; }
  return basic;
}
async function enemyTurn(e){
  if(!e.alive)return;
  bossPhaseCheck(e);
  await wait(320);
  let foes=alliesAlive(); if(!foes.length)return;
  // libera a investida carregada
  if(e.charging){ const ch=e.charging; e.charging=null; markDirty();
    blog('💥 '+e.name+' DESATA '+ch.name+'!'); SFX.crit(); flashScreen(0.55); shakeField(18); await animEnemyAttack(e); await wait(160);
    if(ch.target==='all'){ for(const f of alliesAlive()){ applyHit(e,f,{type:ch.type,power:ch.power,magic:ch.magic,crit:0.15,status:ch.status}); await wait(130);} }
    else { const t=pickTarget(e,foes); applyHit(e,t,{type:ch.type,power:ch.power,magic:ch.magic,crit:0.25,status:ch.status}); }
    markDirty(); renderBparty(); await wait(320); return;
  }
  const act=chooseEnemyAction(e);
  await animEnemyAttack(e);
  if(act.charge){ e.charging=act; blog('⚠⚠ '+e.name+' concentra '+act.name+'! QUEBRE a guarda para impedir!'); SFX.dark(); shakeField(6); markDirty(); await wait(450); return; }
  if(act.kind==='buff'){ applyStatus(e,act.status); blog(e.name+' usa '+act.name+'.'); markDirty(); await wait(450); return; }
  if(act.target==='all'){ for(const f of alliesAlive()){ applyHit(e,f,{type:act.type,power:act.power,magic:act.magic,status:act.status}); await wait(120);} blog(e.name+' usa '+act.name+'!'); }
  else { const t=pickTarget(e,foes); applyHit(e,t,{type:act.type,power:act.power,magic:act.magic,crit:act.crit,status:act.status}); blog(act.name?(e.name+' usa '+act.name+'!'):(e.name+' ataca '+t.name+'.')); }
  markDirty(); renderBparty(); await wait(300);
}

/* -------- fim de batalha -------- */
async function winBattle(){
  const b=G.battle; musicStop(); SFX.win();
  let xp=0,gold=0; const drops=[];
  b.enemies.forEach(e=>{ xp+=e.xp; gold+=e.gold; if(e.boss||e.eliteDrop||chance(0.25))drops.push(rollDrop(e)); });
  G.gp+=gold; addLoot(drops);
  blog(`Vitória! +${xp} XP · +${gold} GP`);
  await wait(600);
  const lvs=[]; G.party.forEach(c=>{ if(c.alive){ if(gainXP(c,xp))lvs.push(c.name); } });
  renderBparty();
  await wait(400);
  $('#battle').classList.remove('on');
  G.state='explore'; musicStart('explore');
  let m=`⚔ Vitória!  +${xp} XP · +${gold} GP`; if(drops.length)m+=`  ·  ${drops.map(d=>d.name).join(', ')}`;
  if(lvs.length)m+=`\n★ Subiu de nível: ${lvs.join(', ')}!`, SFX.lvup();
  toast(m,2600);
  if(b.wasBoss){ onBossDefeated(); }
  renderHUD(); saveGame();
}
function loseBattle(){ musicStop(); G.state='dead'; $('#battle').classList.remove('on'); showDead(); }

function gainXP(c,xp){ c.xp+=xp; let up=false;
  while(c.xp>=c.xpNext){ c.xp-=c.xpNext; c.lv++; up=true;
    c.mhp+=Math.round(rnd(10,16)+ (c.cls==='Cavaleira'?6:0)); c.mmp+=Math.round(rnd(3,8)+ (c.mag>20?4:0));
    c.str+=rnd(0.6,2.2); c.mag+=rnd(0.6,2.4); c.def+=rnd(0.5,1.6); c.res+=rnd(0.5,1.6); c.agi+=rnd(0.3,1.2); c.luck+=rnd(0.2,1);
    ['str','mag','def','res','agi','luck'].forEach(k=>c[k]=Math.round(c[k]));
    c.hp=c.mhp; c.mp=c.mmp; c.xpNext=Math.round(c.xpNext*1.35+10);
  }
  return up;
}

/* ================= ITENS ================= */
const ITEMS={
  erva:{name:'Erva Curativa',use:'heal',pow:70,cat:'food',icon:'herb',desc:'Cura 70 HP.'},
  maca:{name:'Maçã',use:'heal',pow:40,cat:'food',icon:'apple',desc:'Cura 40 HP.'},
  pao:{name:'Pão Rústico',use:'heal',pow:55,cat:'food',icon:'bread',desc:'Cura 55 HP.'},
  pocao:{name:'Poção Maior',use:'heal',pow:170,cat:'other',icon:'potion',desc:'Cura 170 HP.'},
  eter:{name:'Éter',use:'mp',pow:50,cat:'other',icon:'eter',desc:'Restaura 50 MP.'},
  fenix:{name:'Pena de Fênix',use:'revive',pow:0.6,cat:'other',icon:'fenix',desc:'Revive com 60% do HP.'},
  antidoto:{name:'Antídoto',use:'cure',cat:'other',icon:'antidoto',desc:'Remove status ruins.'},
  bomba:{name:'Bomba de Fogo',use:'atk',type:'fire',pow:160,target:'allEnemy',cat:'other',icon:'bomba',desc:'Dano de fogo em todos (combate).'},
  raiz:{name:'Raiz do Trovão',use:'atk',type:'bolt',pow:150,target:'one',cat:'other',icon:'raiz',desc:'Relâmpago em um inimigo (combate).'},
  chave:{name:'Chave Enferrujada',use:'none',cat:'other',icon:'chave',desc:'Abre alguma fechadura.'},
};
function addItem(id,n){ G.inv[id]=(G.inv[id]||0)+(n||1); }
function openItems(c){
  const s=$('#bsub'); s.classList.add('on');
  let html=`<div class="subhead"><span>ITENS</span><span class="back" data-back>‹ voltar</span></div>`;
  const ids=Object.keys(G.inv).filter(id=>G.inv[id]>0 && ITEMS[id] && ['heal','mp','revive','cure','atk'].includes(ITEMS[id].use));
  if(!ids.length)html+=`<div style="color:#888;padding:12px">Sem itens usáveis.</div>`;
  for(const id of ids){ const it=ITEMS[id];
    html+=`<div class="subitem" data-it="${id}"><div><div class="si-name">${it.name} ×${G.inv[id]}</div><div class="si-desc">${it.desc}</div></div></div>`;
  }
  s.innerHTML=html;
  s.querySelector('[data-back]').onclick=()=>{SFX.back();showActionMenu(c);};
  s.querySelectorAll('.subitem').forEach(el=>el.onclick=()=>{ SFX.ui(); useItemCombat(c,el.dataset.it); });
}
function useItemCombat(c,id){ const it=ITEMS[id];
  if(it.target==='allEnemy'){ G.inv[id]--; (async()=>{ for(const e of enemiesAlive()){applyHit(c,e,{type:it.type,power:it.pow,magic:true});await wait(120);} blog(c.name+' usa '+it.name+'!'); markDirty(); await wait(300); finishTurn(); })(); return; }
  if(it.target==='one'){ chooseTargetItem(c,id); return; }
  // ally
  chooseTargetItemAlly(c,id);
}
function chooseTargetItem(c,id){ const it=ITEMS[id]; clearTargets();
  const cv=$('#benemies'), rect=cv.getBoundingClientRect(), frect=$('#bfield').getBoundingClientRect();
  enemiesAlive().forEach(t=>{ const dot=document.createElement('div');dot.className='tgtDot';dot.textContent='▾';
    dot.style.left=(rect.left-frect.left+t.sx*rect.width)+'px'; dot.style.top=(rect.top-frect.top+t.sy*rect.height-40)+'px';
    $('#bfield').appendChild(dot); dot.onclick=()=>{ G.inv[id]--; clearTargets(); applyHit(c,t,{type:it.type,power:it.pow,magic:true}); blog(c.name+' usa '+it.name+'!'); markDirty(); setTimeout(finishTurn,400); };
  });
}
function chooseTargetItemAlly(c,id){ const it=ITEMS[id]; clearTargets();
  const targets= it.use==='revive'?G.party.filter(x=>!x.alive):alliesAlive();
  targets.forEach(t=>{ const idx=G.party.indexOf(t); const card=$('#bparty').children[idx]; if(!card)return;
    const dot=document.createElement('div');dot.className='tgtDot';dot.textContent='▾';dot.style.cssText+='position:absolute;left:50%;top:-6px;';
    card.style.position='relative';card.appendChild(dot);
    card.onclick=()=>{ G.inv[id]--; clearTargets();
      if(it.use==='heal')heal(t,it.pow); else if(it.use==='mp'){t.mp=clamp(t.mp+it.pow,0,t.mmp);popup(t,'+'+it.pow+'MP','heal');}
      else if(it.use==='revive'){t.alive=true;t.hp=Math.round(t.mhp*it.pow);t.status={};} else if(it.use==='cure')t.status={};
      SFX.heal(); blog(c.name+' usa '+it.name+'.'); markDirty(); setTimeout(finishTurn,400);
    };
  });
}

/* baús / loot */
function rollDrop(e){ const pool=e.boss?['pocao','fenix','eter']:['erva','erva','pocao','eter','antidoto','raiz']; const id=pick(pool); return {id,name:ITEMS[id].name}; }
function addLoot(drops){ drops.forEach(d=>addItem(d.id)); }

/* ================= EXPLORAÇÃO ================= */
function enterFloor(depth,fromUp){
  G.depth=depth; G.floor=depth; if(depth>G.maxFloor)G.maxFloor=depth;
  setTheme(depth);
  G.dun = G.scenes[depth] || (G.scenes[depth]=genFloor(depth));
  const sp=G.dun.spawn; G.px=sp.x; G.py=sp.y; G.tx=sp.x; G.ty=sp.y; G.dir=sp.dir; G.ang=dirAng(G.dir); G.tang=G.ang;
  markExplored();
  renderHUD();
}
function markExplored(){ const cx=Math.floor(G.px),cy=Math.floor(G.py);
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const x=cx+dx,y=cy+dy;if(G.dun.grid[y]&&G.dun.grid[y][x]!==undefined)G.dun.explored[y][x]=true;}
}
function tryMove(dx,dy){ if(G.moving||G.state!=='explore')return;
  const nx=Math.floor(G.px)+dx, ny=Math.floor(G.py)+dy;
  const v=G.dun.grid[ny]&&G.dun.grid[ny][nx];
  if(v==='+'&&!G.dun.doorsOpen.has(nx+','+ny)){ G.dun.doorsOpen.add(nx+','+ny); SFX.door(); toast('A porta range e se abre.',1100); moveTo(nx,ny); return; }
  if(v==='S'&&!G.dun.secretsRevealed.has(nx+','+ny)){ SFX.bump(); toast('Parece uma parede sólida...',1400); return; }
  if(v==='B'&&!G.dun.bossDefeated){ SFX.bump(); toast('⚠ O guardião bloqueia a passagem!',1200); startBoss(); return; } // esbarrar no chefe = batalha
  if(isSolid(nx,ny)){ SFX.bump(); return; }
  moveTo(nx,ny);
}
function moveTo(nx,ny){ G.moving=true; G.tx=nx+0.5; G.ty=ny+0.5; SFX.step();
  const sx=G.px,sy=G.py,t0=performance.now(),dur=150;
  (function anim(){ const k=clamp((performance.now()-t0)/dur,0,1);
    G.px=sx+(G.tx-sx)*k; G.py=sy+(G.ty-sy)*k;
    if(k<1)requestAnimationFrame(anim); else{ G.px=G.tx;G.py=G.ty;G.moving=false; onEnterTile(nx,ny); }
  })();
}
function turn(dir){ if(G.moving||G.state!=='explore')return; G.moving=true; G.dir=(G.dir+dir+4)%4;
  const from=G.ang, to=dirAng(G.dir); let d=to-from; while(d>Math.PI)d-=2*Math.PI; while(d<-Math.PI)d+=2*Math.PI;
  const t0=performance.now(),dur=130; SFX.step();
  (function anim(){ const k=clamp((performance.now()-t0)/dur,0,1); G.ang=from+d*k;
    if(k<1)requestAnimationFrame(anim); else{G.ang=to;G.moving=false;} })();
}
function onEnterTile(x,y){ markExplored(); renderHUD();
  const d=G.dun,t=d.grid[y][x],key=x+','+y;
  if(t==='C'&&!d.looted.has(key)){ d.looted.add(key); openChest(x,y); return; }
  if(t==='F'&&!d.rested.has(key)){ d.rested.has(key); fountain(x,y); return; }
  if(t==='E'&&!d.triggered.has(key)){ d.triggered.add(key); G.dun.grid[y][x]='.'; SFX.bump(); setTimeout(()=>startBattle(rollFormation(false)),260); return; }
  if(t==='B'&&!d.triggered.has(key)){ d.triggered.add(key); startBoss(); return; }
  if(t==='>'){ toast('Escada para baixo. (Interagir = descer)',1400); }
  // encontro aleatório
  G.stepsSince++; G.steps++;
  if(G.stepsSince>3 && chance(G.encRate + G.stepsSince*0.02)){ G.stepsSince=0; setTimeout(()=>startBattle(rollFormation(false)),200); }
  saveGame();
}
function interact(){ if(G.state!=='explore'||G.moving)return;
  const fx=Math.floor(G.px)+DIRV[G.dir][0], fy=Math.floor(G.py)+DIRV[G.dir][1];
  const here=G.dun.grid[Math.floor(G.py)][Math.floor(G.px)];
  const v=G.dun.grid[fy]&&G.dun.grid[fy][fx];
  if(v==='S'&&!G.dun.secretsRevealed.has(fx+','+fy)){ toast('Você examina a parede... fique parado perto por alguns segundos.',1600); return; }
  if(here==='>'){ descend(); return; }
  if(here==='F'&&!G.dun.rested.has(Math.floor(G.px)+','+Math.floor(G.py))){ fountain(Math.floor(G.px),Math.floor(G.py)); return; }
  // baú à frente
  if(v==='C'&&!G.dun.looted.has(fx+','+fy)){ G.dun.looted.add(fx+','+fy); openChest(fx,fy); return; }
  toast('Nada para interagir aqui.',900);
}
function descend(){ SFX.door(); G.stepsSince=0; enterFloor(G.depth+1); toast('Você desce ao Andar '+G.depth+'.',1600); musicStart('explore'); saveGame(); }
function openChest(x,y){ G.dun.grid[y][x]='.'; SFX.chest();
  const roll=Math.random(); let msg;
  if(roll<0.5){ const g=rint(30,90)+G.depth*15; G.gp+=g; msg='◉ '+g+' GP'; }
  else if(roll<0.85){ const id=pick(['erva','erva','pocao','eter','antidoto','fenix','raiz','bomba']); addItem(id); msg='🜂 '+ITEMS[id].name; }
  else { const g=rint(80,160)+G.depth*20; G.gp+=g; const id=pick(['pocao','fenix']); addItem(id); msg='◉ '+g+' GP + '+ITEMS[id].name; }
  toast('Baú aberto!  '+msg,1900); renderHUD(); saveGame();
}
function fountain(x,y){ G.dun.rested.add(x+','+y); SFX.heal();
  G.party.forEach(c=>{ c.hp=c.mhp; c.mp=c.mmp; if(!c.alive){c.alive=true;c.hp=c.mhp;} c.status={}; });
  toast('✦ Fonte Sagrada — grupo totalmente restaurado!',2000); renderHUD();
}
function startBoss(){ const f=rollFormation(true); f.wasBoss=true; startBattle(f,{boss:true}); G.battle.wasBoss=true; }
function onBossDefeated(){ // abre saída / vitória de andar
  toast('★ CHEFE DERROTADO! A escada se revela.',2600);
  const d=G.dun; d.bossDefeated=true;
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++)if(d.grid[y][x]==='B')d.grid[y][x]='>';
  if(G.depth>=10){ setTimeout(()=>showWin(),1500); }
}

/* ================= RENDER LOOP ================= */
const SECRET_SECS=10;
function loop(){ requestAnimationFrame(loop);
  const now=performance.now(), dt=Math.min(0.1,(now-(loop._t||now))/1000); loop._t=now;
  if((G.state==='explore') && RC.ctx){ rcRender(G.px,G.py,G.ang); tickSecret(dt); }
  else if(loop._secOn){ showSecretUI(0,false); }
}
function showSecretUI(frac,on){ const el=$('#secretProg'); if(!el)return; loop._secOn=on;
  el.classList.toggle('on',on); if(on)el.querySelector('.spBar>i').style.width=(frac*100)+'%'; }
function tickSecret(dt){
  if(G.moving){ return; }                                   // só conta parado
  const d=G.dun, cx=Math.floor(G.px),cy=Math.floor(G.py); let found=null;
  for(const[dx,dy] of DIRV){ const nx=cx+dx,ny=cy+dy, t=d.grid[ny]&&d.grid[ny][nx];
    if(t==='S'&&!d.secretsRevealed.has(nx+','+ny)){ found=nx+','+ny; break; } }
  if(!found){ if(loop._secKey){loop._secKey=null;loop._secT=0;} if(loop._secOn)showSecretUI(0,false); return; }
  if(loop._secKey!==found){ loop._secKey=found; loop._secT=0; }
  loop._secT=(loop._secT||0)+dt;
  showSecretUI(Math.min(1,loop._secT/SECRET_SECS),true);
  if(loop._secT>=SECRET_SECS){ revealSecretAt(found); loop._secKey=null; loop._secT=0; showSecretUI(0,false); }
}
function revealSecretAt(key){ const[x,y]=key.split(',').map(Number);
  G.dun.secretsRevealed.add(key); SFX.secret(); shakeSecret(); toast('✦ A parede se dissolve — passagem secreta revelada!',2400);
  markExplored(); renderHUD(); saveGame();
}
function shakeSecret(){ const vw=$('#viewWrap'); if(!vw)return; try{ vw.animate([{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:300}); }catch(e){} }

/* ================= HUD / PAINEL ================= */
function renderHUD(){
  const g=G.gp.toLocaleString('pt-BR');
  $('#gpN').textContent=g; const g2=$('#gpN2'); if(g2)g2.textContent=g;
  $('#flName').textContent=G.dun?G.dun.name:'—';
  $('#flPos').textContent='◈ '+['Norte','Leste','Sul','Oeste'][G.dir];
  const kn=$('#keyN'); if(kn)kn.textContent=(G.inv.chave||0);
  const it=$('#itemN'); if(it){ const n=Object.values(G.inv).reduce((a,b)=>a+b,0); it.textContent='· '+n+' itens'; }
  const mn=$('#mmName'); if(mn&&G.dun)mn.textContent='ANDAR '+G.depth;
  renderParty(); renderInventory(); drawMini();
}
function condChips(c){ const s=[]; for(const k in c.status){ const m={poison:'☠',burn:'🔥',stun:'✷',sleep:'z',blind:'◐',silence:'✕',slow:'▽',atkUp:'▲',atkDown:'▼',defUp:'◆',defDown:'◇',critUp:'✦',regen:'✚'}[k]; if(m)s.push(`<span>${m}</span>`); } return s.join(''); }
function skGlyph(id){ const s=SKILLS[id]; if(!s)return '✦';
  if(s.type&&ELEM[s.type])return ELEM[s.type];
  if(s.kind==='heal')return '✚'; if(s.kind==='revive')return '✚'; if(s.kind==='cure')return '✦';
  if(s.kind==='buff')return '▲'; if(s.kind==='debuff')return '▼'; if(s.kind==='util')return '🔍'; return '✦'; }
function renderParty(){
  const el=$('#party'); if(!el)return; el.innerHTML='';
  G.party.forEach(c=>{
    const d=document.createElement('div'); d.className='pcard'+(c.alive?'':' dead');
    const sks=knownSkills(c).slice(0,3);
    d.innerHTML=`<div class="pTop">
        <canvas class="pport" width="64" height="64"></canvas>
        <div class="pMeta">
          <div class="pname">${c.name.toUpperCase()}</div>
          <div class="plv">${c.cls} · Nv <b>${c.lv}</b></div>
        </div></div>
      <div class="pbars">
        <div class="bar hp"><i style="width:${c.hp/c.mhp*100}%"></i><span class="bnum">${c.hp}/${c.mhp}</span></div>
        <div class="bar mp"><i style="width:${c.mmp?c.mp/c.mmp*100:0}%"></i><span class="bnum">${c.mp}/${c.mmp}</span></div>
      </div>
      <div class="pslots">${sks.map(id=>`<div class="sk" title="${SKILLS[id].name}">${skGlyph(id)}</div>`).join('')}</div>
      <div class="pcond">${condChips(c)}</div>`;
    el.appendChild(d);
    drawPortrait(d.querySelector('.pport'),c.pal);
  });
}

/* ---------- inventário (categorias com ícones) ---------- */
function weaponIcon(c){ return {Cavaleira:'sword',Samurai:'katana',Maga:'staff',['Sábio']:'staff2'}[c.cls]||'sword'; }
function armorIcon(c){ return {Cavaleira:'plate',Samurai:'leather',Maga:'robe',['Sábio']:'robe'}[c.cls]||'leather'; }
function renderInventory(){
  const W=$('#invWeapons'),A=$('#invArmors'),F=$('#invFood'),O=$('#invOther'); if(!W)return;
  // ARMAS / ARMADURAS = equipamento da party (visual)
  W.innerHTML=''; A.innerHTML='';
  G.party.forEach(c=>{ W.appendChild(mkSlot(weaponIcon(c),0,c.name+' — arma')); A.appendChild(mkSlot(armorIcon(c),0,c.name+' — armadura')); });
  padSlots(W,5); padSlots(A,5);
  // COMIDA / OUTROS = itens
  F.innerHTML=''; O.innerHTML='';
  for(const id in G.inv){ if(G.inv[id]<=0)continue; const it=ITEMS[id]; if(!it)continue;
    const slot=mkSlot(it.icon||id, G.inv[id], it.name+' — '+it.desc);
    slot.classList.add('has'); slot.onclick=()=>useFromInv(id);
    (it.cat==='food'?F:O).appendChild(slot);
  }
  padSlots(F,5); padSlots(O,5);
}
function mkSlot(icon,count,title){ const s=document.createElement('div'); s.className='slot'+(icon?' filled':''); if(title)s.title=title;
  if(icon){ const cv=document.createElement('canvas'); cv.width=32;cv.height=32; drawItemIcon(cv.getContext('2d'),icon); s.appendChild(cv);
    if(count>1){ const c=document.createElement('div'); c.className='cnt'; c.textContent=count; s.appendChild(c);} }
  return s;
}
function padSlots(el,min){ while(el.children.length<min){ el.appendChild(mkSlot(null,0,'')); } }
function useFromInv(id){ const it=ITEMS[id]; if(!it)return;
  if(it.use==='atk'){ toast('Esse item é só para combate.',1200); return; }
  const t=it.use==='revive'?G.party.find(p=>!p.alive):G.party.filter(p=>p.alive).sort((a,b)=>a.hp/a.mhp-b.hp/b.mhp)[0];
  if(!t){ toast('Ninguém precisa disso agora.',1200); return; }
  G.inv[id]--; SFX.heal();
  if(it.use==='heal')t.hp=clamp(t.hp+it.pow,0,t.mhp);
  else if(it.use==='mp')t.mp=clamp(t.mp+it.pow,0,t.mmp);
  else if(it.use==='cure')t.status={};
  else if(it.use==='revive'){t.alive=true;t.hp=Math.round(t.mhp*it.pow);t.status={};}
  toast(it.name+' usado em '+t.name+'.',1300); renderHUD(); saveGame();
}

/* ---------- ícones pixel dos itens ---------- */
function drawItemIcon(ctx,type){ ctx.clearRect(0,0,32,32); const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x*2,y*2,w*2,h*2);};
  switch(type){
    case 'sword': R(7,1,2,10,'#d8dce2');R(7,1,1,10,'#f2f4f8');R(5,10,6,2,'#c8a44a');R(7,12,2,3,'#7a4a20');R(6,14,4,1,'#c8a44a');break;
    case 'katana': for(let i=0;i<9;i++)R(5+i,10-i,2,2,'#e2e6ec'); R(4,11,2,2,'#8f2620');R(3,12,2,3,'#5a1a1a');break;
    case 'staff': R(7,2,2,13,'#6a4a28');R(7,2,2,4,'#8a6636'); R(5,1,6,4,'#3a78c8');R(6,1,3,2,'#8ac0ff');break;
    case 'staff2': R(7,2,2,13,'#6a4a28'); R(6,1,4,4,'#e8c15a');R(7,1,2,2,'#fff0b0');break;
    case 'mace': R(7,6,2,9,'#6a4a28'); R(5,1,6,6,'#9aa0a8'); R(4,3,2,2,'#c0c6cc');R(11,3,2,2,'#c0c6cc');R(7,0,2,2,'#c0c6cc');break;
    case 'dagger': R(7,4,2,6,'#d8dce2');R(6,9,4,1,'#c8a44a');R(7,10,2,3,'#7a4a20');break;
    case 'plate': R(4,3,8,9,'#8a9098');R(4,3,8,2,'#aab0b8');R(7,3,2,9,'#6a7078');R(3,4,2,4,'#7a8088');R(11,4,2,4,'#7a8088');break;
    case 'leather': R(4,3,8,9,'#7a4a26');R(4,3,8,2,'#9a6636');R(7,4,2,7,'#5a3418');R(4,10,8,2,'#5a3418');break;
    case 'robe': R(5,2,6,3,'#2a5aa8');R(3,4,10,8,'#22467e');R(3,4,2,8,'#2a5aa8');R(7,5,2,7,'#18345e');break;
    case 'shield': R(4,2,8,7,'#9aa0a8');R(4,2,8,2,'#c0c6cc');R(5,9,6,2,'#8a9098');R(6,11,4,1,'#7a8088');R(7,4,2,4,'#c8a44a');break;
    case 'herb': case 'erva': R(6,8,4,5,'#3a6a2a');R(3,4,5,4,'#5aa84a');R(8,3,5,4,'#5aa84a');R(5,6,3,2,'#7ac86a');break;
    case 'potion': case 'pocao': R(6,2,4,2,'#7a4a20');R(5,4,6,9,'#c0392b');R(5,4,6,2,'#e05a4a');R(6,8,2,3,'#ff8a7a');break;
    case 'eter': R(6,2,4,2,'#7a4a20');R(5,4,6,9,'#22467e');R(5,4,6,2,'#4a86d8');R(6,8,2,3,'#8ac0ff');break;
    case 'antidoto': R(6,2,4,2,'#7a4a20');R(5,4,6,9,'#3a7a2a');R(5,4,6,2,'#5aa84a');break;
    case 'fenix': for(let i=0;i<8;i++)R(7-(i>4?1:0),2+i,2,1,'#e8934a'); R(5,4,2,1,'#f0c060');R(9,6,2,1,'#f0c060');R(4,8,2,1,'#ff7a3a');break;
    case 'bomba': case 'bomb': R(5,5,7,7,'#20232a');R(6,6,3,3,'#3a3f48');R(9,3,2,2,'#7a4a20');R(11,2,2,2,'#e8c15a');break;
    case 'raiz': R(6,1,2,6,'#ffe14a');R(4,6,6,2,'#ffe14a');R(6,7,3,7,'#e8c020');R(4,12,4,2,'#ffe14a');break;
    case 'apple': R(6,2,2,2,'#5a3418');R(4,4,8,8,'#c0392b');R(4,4,8,2,'#e05a4a');R(5,6,2,2,'#ff8a7a');break;
    case 'pao': case 'bread': R(3,5,10,6,'#c99a5a');R(3,5,10,2,'#e0b878');R(5,7,1,2,'#8a6636');R(8,7,1,2,'#8a6636');break;
    case 'chave': case 'key': R(4,4,4,4,'#e8c15a');R(5,5,2,2,'#0c0a06');R(8,5,6,2,'#e8c15a');R(12,7,2,2,'#e8c15a');R(10,7,1,2,'#e8c15a');break;
    case 'picareta': R(2,2,12,2,'#9aa0a8');R(2,2,3,3,'#7a8088');R(11,2,3,3,'#7a8088');R(7,3,2,10,'#6a4a28');break;
    case 'pena': for(let i=0;i<10;i++)R(6+Math.floor(i/3),2+i,2,1,'#e8ecf2'); R(5,5,2,1,'#c0c6cc');R(9,8,1,1,'#c0c6cc');break;
    default: R(5,5,6,6,'#4a4438');R(6,6,4,4,'#6a6250');
  }
}

/* ---------- minimapa sempre visível ---------- */
function drawMini(){ const cv=$('#miniMap'),d=G.dun; if(!cv||!d)return;
  const W=cv.clientWidth||160,H=cv.clientHeight||120; if(W<4)return; cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d'); ctx.clearRect(0,0,W,H);
  const cell=Math.min((W-6)/d.w,(H-6)/d.h), ox=(W-cell*d.w)/2, oy=(H-cell*d.h)/2;
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){ if(!d.explored[y][x])continue;
    let t=d.grid[y][x]; if(t==='#'||(t==='S'&&!d.secretsRevealed.has(x+','+y)))continue;
    let col='rgba(70,48,24,.45)';
    if(t==='C'&&!d.looted.has(x+','+y))col='#b8892a'; else if(t==='>')col='#3a7a2a';
    else if(t==='F')col='#2a6ab0'; else if(t==='B')col='#a83030'; else if(t==='+')col='#8a5a2a';
    ctx.fillStyle=col; ctx.fillRect(ox+x*cell,oy+y*cell,Math.ceil(cell),Math.ceil(cell));
  }
  // seta do jogador
  const cxp=ox+(Math.floor(G.px)+0.5)*cell, cyp=oy+(Math.floor(G.py)+0.5)*cell, r=cell*0.7, a=dirAng(G.dir);
  ctx.fillStyle='#c0201a'; ctx.beginPath();
  ctx.moveTo(cxp+Math.cos(a)*r,cyp+Math.sin(a)*r);
  ctx.lineTo(cxp+Math.cos(a+2.4)*r,cyp+Math.sin(a+2.4)*r);
  ctx.lineTo(cxp+Math.cos(a-2.4)*r,cyp+Math.sin(a-2.4)*r); ctx.fill();
}

/* ================= SPRITES PIXEL — retratos ================= */
function drawPortrait(cv,pal){ drawFace(cv.getContext('2d'),pal); }

/* rostos grandes e detalhados (64x64), 1px de granularidade */
const FACEP={
  knight:{skin:'#ecc49b',sh:'#c68f66',hi:'#f8dcb8',eye:'#3f7fd0',brow:'#916a2c',hair:'#f0d074',hairD:'#b58e38',cloth:'#3d5e2c',clothD:'#26401a',lip:'#c56b58'},
  samurai:{skin:'#e9bd94',sh:'#c48a60',hi:'#f6d4b0',eye:'#7a2f2f',brow:'#4a201c',hair:'#cc382d',hairD:'#8f2620',cloth:'#7a1a1a',clothD:'#4a0f0f',lip:'#b85448'},
  mage:{skin:'#e6c6b0',sh:'#bd977e',hi:'#f4dccb',eye:'#38b8cf',brow:'#8a7a96',hair:'#e6ecf3',hairD:'#a9b3c0',cloth:'#22467e',clothD:'#152c52',lip:'#c07868'},
  sage:{skin:'#dcc0a6',sh:'#b3937a',hi:'#eed6c0',eye:'#5a86c0',brow:'#cfcfcf',hair:'#ededed',hairD:'#b0b0b0',cloth:'#365f9a',clothD:'#22406a',lip:'#b07a6a'},
};
function drawFace(ctx,key){
  ctx.clearRect(0,0,64,64);
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w,h);};
  const bg=ctx.createRadialGradient(32,24,3,32,34,44); bg.addColorStop(0,'#242430');bg.addColorStop(1,'#070709');
  ctx.fillStyle=bg; ctx.fillRect(0,0,64,64);
  const P=FACEP[key]||FACEP.knight;
  // ombros / gola
  R(11,56,42,8,P.cloth); R(11,55,42,3,P.clothD);
  // pescoço
  R(27,47,10,9,P.sh); R(28,45,8,5,P.skin);
  // cabeça (elipse)
  for(let y=11;y<52;y++)for(let x=15;x<49;x++){
    const dx=(x-32)/15.5, dy=(y-31)/18.8;
    if(dx*dx+dy*dy<=1){ let c=P.skin; if(x>37)c=P.sh; else if(x<26&&y<36)c=P.hi;
      ctx.fillStyle=c; ctx.fillRect(x,y,1,1); }
  }
  // orelhas
  R(15,31,3,7,P.sh); R(46,31,3,7,P.sh); R(16,32,2,4,P.skin); R(47,32,1,4,P.skin);
  // maçãs do rosto (blush leve)
  ctx.globalAlpha=0.25; R(23,38,5,3,P.lip); R(37,38,5,3,P.lip); ctx.globalAlpha=1;
  // olhos (branco, íris, pupila, brilho)
  const eye=(cx,fl)=>{ R(cx-3,29,7,5,'#f6f4ed'); R(cx-3,29,7,1,'#d5cfc0');
    R(cx-3,33,7,1,'#cbb79c'); // pálpebra inferior sombra
    R(cx+(fl?-2:0),29,4,5,P.eye); R(cx+(fl?-1:1),30,2,3,'#0d0d15'); R(cx+(fl?0:2),30,1,1,'#ffffff'); };
  eye(23,false); eye(40,true);
  // sobrancelhas
  R(20,26,8,2,P.brow); R(36,26,8,2,P.brow);
  // nariz
  R(31,33,2,6,P.sh); R(30,38,4,1,P.sh); R(33,38,1,1,P.hi);
  // boca
  R(27,42,10,1,'#8a4a40'); R(28,43,8,1,P.lip); R(29,44,6,1,'#7a3e36');
  // ---- cabelo + acessório por classe (desenhado por cima) ----
  if(key==='knight'){
    // cabelo loiro aparecendo sob o elmo (laterais e nuca)
    R(18,22,5,14,P.hair); R(41,22,5,14,P.hair); R(18,30,4,8,P.hairD); R(42,30,4,8,P.hairD);
    // ELMO dourado — domo sobre a cabeça
    for(let y=3;y<20;y++)for(let x=15;x<49;x++){ const dx=(x-32)/16.5,dy=(y-19)/16; if(dx*dx+dy*dy<=1){ let c='#d9b24a'; if(y<7)c='#f4dd88'; else if(x>37)c='#a6801f'; else if(x<26)c='#e8c76a'; R(x,y,1,1,c);} }
    R(22,6,3,10,'#fdf0b4'); R(23,7,1,7,'#ffffff');   // brilho especular do metal
    R(16,4,32,1,'#8f6f24'); R(24,16,16,1,'#8f6f24');  // contornos metálicos
    R(16,17,32,2,'#8f6f24');                       // aba/rebordo do elmo
    R(15,17,5,15,'#c8a13f'); R(44,17,5,15,'#c8a13f'); // placas de bochecha
    R(15,17,2,15,'#8f6f24'); R(47,17,2,15,'#8f6f24');
    R(31,17,2,10,'#b8912f'); R(30,17,1,9,'#8f6f24'); // protetor nasal
    // asas de metal (angulares) nas laterais
    R(11,10,6,2,'#e4eaf1');R(9,12,5,2,'#c3ccd6');R(7,14,4,2,'#9aa6b2'); R(13,8,4,2,'#f4f8fc');
    R(47,10,6,2,'#e4eaf1');R(50,12,5,2,'#c3ccd6');R(53,14,4,2,'#9aa6b2'); R(47,8,4,2,'#f4f8fc');
  } else if(key==='samurai'){
    R(16,12,32,9,P.hair); R(15,19,6,18,P.hair); R(43,19,6,18,P.hair);
    R(16,12,32,2,P.hairD); R(15,30,5,8,P.hairD); R(44,30,5,8,P.hairD);
    R(27,18,10,7,P.hair); R(29,18,6,7,P.hairD); // mecha central
    // bandana branca com nó
    R(15,21,34,4,'#ece6d8'); R(15,24,34,1,'#c3bba8'); R(29,20,6,5,P.hair==='x'?'#000':'#cc382d');
    R(44,22,3,3,'#ece6d8'); R(47,24,4,6,'#dcd4c2'); // nó lateral
    // cicatriz sob o olho
    R(41,34,1,5,'#b5695a');
  } else if(key==='mage'){
    R(19,14,26,8,P.hair); R(16,20,5,20,P.hair); R(43,20,5,20,P.hair);
    R(19,14,26,2,'#ffffff'); R(16,28,4,12,P.hairD); R(44,28,4,12,P.hairD);
    // capuz azul
    R(11,6,42,10,P.cloth); R(11,6,42,3,'#3f66b4'); R(13,13,38,2,P.clothD);
    R(10,14,8,34,P.cloth); R(46,14,8,34,P.cloth); R(11,15,4,32,P.clothD); R(49,15,4,32,P.clothD);
    R(18,14,3,26,'#2a4f8a'); R(43,14,3,26,'#2a4f8a'); // sombra interna do capuz
  } else if(key==='sage'){
    // capuz
    R(11,5,42,11,P.cloth); R(11,5,42,3,'#4d78bc'); R(13,13,38,2,P.clothD);
    R(9,13,9,36,P.cloth); R(46,13,9,36,P.cloth); R(10,14,4,34,P.clothD); R(50,14,4,34,P.clothD);
    R(17,13,3,30,'#2c4c82'); R(44,13,3,30,'#2c4c82');
    // cabelo/testa
    R(20,15,24,5,P.hair); R(20,15,24,2,'#ffffff');
    // sobrancelhas grossas brancas (por cima)
    R(20,25,8,3,P.brow); R(36,25,8,3,P.brow);
    // barba branca cheia (cobre boca/queixo)
    R(21,43,22,11,P.hair); R(19,40,7,10,P.hair); R(38,40,7,10,P.hair); R(24,53,16,5,P.hairD);
    R(27,40,10,3,'#c8c8c8'); R(26,46,12,1,P.hairD);
    R(30,47,4,3,P.sh); // pequena sombra da boca no bigode
  }
  // vinheta suave nas bordas
  ctx.globalAlpha=0.35; const vg=ctx.createRadialGradient(32,32,18,32,32,40); vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'#000'); ctx.fillStyle=vg; ctx.fillRect(0,0,64,64); ctx.globalAlpha=1;
}
// desenha herói 14x15 escalado
function drawHeroSprite(ctx,ox,oy,s,pal){
  const P={
    knight:{ // Leona — armadura dourada, elmo alado, capa verde
      map:["...ww...","..wYYw..","..wYYw..","..dSSd..","..SFFS..","..SFFS..","..gGGg..","..gGGg..","..gGGg..","..bMMb..","..MggM..","...MM...","..d..d..","..s..s.."],
      pal:{w:'#e8c15a',Y:'#fff0b0',d:'#3a3320',S:'#f0d8b0',F:'#c99a6a',g:'#c8a44a',G:'#7a5a1a',b:'#4a7a3a',M:'#3a5a2a',s:'#7a6a3e'} },
    samurai:{ // Sakura — cabelo vermelho, faixa branca, katana
      map:["..rrrr..","..rRRr..","..rRRr..","...FF...","..sFFs..","..bBBb..","..bBBb..","..wWWw..","..wWWw..","..bBBb..","..b..b..","..d..d..","..s..s..","........"],
      pal:{r:'#c0392b',R:'#e05a4a',F:'#f0c8a0',s:'#d0d0d0',b:'#8a1a1a',B:'#b03030',w:'#e8e0d0',W:'#c0b8a8',d:'#5a3a2a'} },
    mage:{ // Celes — manto azul, capuz, cajado
      map:["..bbbb..","..bBBb..","..bFFb..","..bffb..","..bBBb..","..BBBB..","..BBBB.k","..BBBBkk","..BBBBk.","..BBBB..","..BBBB..","..B..B..","..d..d..","........"],
      pal:{b:'#1f3f78',B:'#2a5aa8',F:'#f0d0b0',f:'#c9a06a',k:'#c8a44a',d:'#28407a'} },
    sage:{ // Darius — manto azul claro, barba branca, cajado dourado
      map:["..cccc..","..cWWc..","..WWWW.k","..WFFW kk","..WffW k.","..cBBc..","..cBBc..","..BBBB..","..BBBB..","..BBBB..","..BBBB..","..B..B..","..d..d..","........"],
      pal:{c:'#3a6ab0',W:'#e8e8e8',F:'#e8d0b0',f:'#c9a06a',B:'#3a5a9a',k:'#e8c15a',d:'#2a406a'} },
  }[pal];
  if(!P)return; drawMap(ctx,ox,oy,s,P.map,P.pal);
}

/* ================= SPRITES INIMIGOS (combate) ================= */
let ECV,ectx;
function ecv(){ if(!ECV){ECV=document.createElement('canvas');ECV.width=44;ECV.height=44;ectx=ECV.getContext('2d');} return ectx; }
function drawEnemySprite(ctx,cx,cy,scale,spr,flash){
  const g=ecv(); g.clearRect(0,0,44,44); drawEnemyArt(g,spr);
  if(flash>0){ g.save(); g.globalCompositeOperation='source-atop'; g.fillStyle='rgba(255,255,255,'+Math.min(.85,flash*0.9)+')'; g.fillRect(0,0,44,44); g.restore(); }
  const dw=44*scale; ctx.imageSmoothingEnabled=false; ctx.drawImage(ECV, cx-dw/2, cy-dw, dw, dw);
}
/* arte detalhada dos inimigos — canvas 44x44, pés ~y42, centro x22 */
function drawEnemyArt(g,spr){
  const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  const ell=(cx,cy,rx,ry,c)=>{ g.fillStyle=c; for(let y=-ry;y<=ry;y++){ const w=Math.floor(rx*Math.sqrt(Math.max(0,1-(y*y)/(ry*ry)))); g.fillRect(cx-w,cy+y,w*2+1,1);} };
  const shadow=()=>{ g.fillStyle='rgba(0,0,0,.28)'; g.beginPath?g.fillRect(11,41,22,2):0; };
  switch(spr){
  case 'slime':{
    shadow();
    ell(22,30,15,13,'#2b6f36'); ell(22,31,14,12,'#46b356'); ell(18,26,9,7,'#67dc74'); ell(17,24,4,3,'#c8ffce');
    R(13,39,3,4,'#46b356'); R(28,39,3,5,'#46b356'); R(29,43,2,2,'#39a049');
    R(26,33,3,3,'#2b6f36'); R(19,36,2,2,'#2b6f36');
    R(15,27,6,7,'#fff'); R(24,27,6,7,'#fff');
    R(17,29,3,4,'#101418'); R(26,29,3,4,'#101418'); R(18,30,1,1,'#fff'); R(27,30,1,1,'#fff');
    R(19,38,7,1,'#1e5226'); break; }
  case 'goblin':{
    shadow();
    R(15,37,5,6,'#37581f'); R(24,37,5,6,'#37581f'); R(15,42,6,1,'#243a14'); R(24,42,6,1,'#243a14');
    ell(22,31,10,7,'#4a7a2e'); R(14,27,16,8,'#4a7a2e'); R(14,27,16,2,'#5c9138');
    R(10,26,5,10,'#4a7a2e'); R(30,26,5,9,'#4a7a2e');
    R(8,17,2,10,'#cdd3da'); R(7,25,5,2,'#c8a44a'); R(6,26,2,4,'#6a4a20');
    for(let i=0;i<4;i++){R(11-i,13+i,2,2,'#4a7a2e'); R(31+i,13+i,2,2,'#4a7a2e');}
    ell(22,17,10,9,'#5c9138'); ell(22,19,9,7,'#4a7a2e');
    R(15,14,7,5,'#141d0c'); R(23,14,7,5,'#141d0c');
    R(16,15,4,3,'#f2d040'); R(24,15,4,3,'#f2d040'); R(18,16,2,2,'#111'); R(26,16,2,2,'#111');
    R(20,18,4,4,'#3a5a24'); R(21,19,2,2,'#2a3f18');
    R(16,23,12,2,'#160f06'); R(17,23,1,2,'#fff'); R(20,23,1,1,'#fff'); R(23,23,1,2,'#fff'); R(26,23,1,1,'#fff');
    break; }
  case 'bat':{
    shadow();
    for(let i=0;i<9;i++){ R(20-i*2,20-Math.abs(i-4),2,3+i,'#3a2a52'); R(22+i*2,20-Math.abs(i-4),2,3+i,'#3a2a52'); }
    for(let i=0;i<8;i++){ R(19-i*2,21-Math.abs(i-4),2,2+i,'#5a3f7a'); R(23+i*2,21-Math.abs(i-4),2,2+i,'#5a3f7a'); }
    ell(22,24,6,8,'#4a3568'); ell(22,22,5,6,'#5a3f7a');
    R(18,12,3,4,'#4a3568'); R(23,12,3,4,'#4a3568');
    R(18,20,3,3,'#e0402e'); R(23,20,3,3,'#e0402e'); R(19,21,1,1,'#ff9'); R(24,21,1,1,'#ff9');
    R(20,26,1,3,'#fff'); R(23,26,1,3,'#fff'); break; }
  case 'skeleton':{
    shadow();
    R(19,34,2,8,'#cfcabb'); R(23,34,2,8,'#cfcabb'); R(17,41,4,1,'#b3ad9c'); R(23,41,4,1,'#b3ad9c');
    ell(22,29,8,7,'#e6e2d2'); for(let i=0;i<4;i++){R(15,26+i*3,14,2,'#c3bda c'.replace(' ',''));}
    R(15,26,14,2,'#c3bdac'); R(15,29,14,2,'#c3bdac'); R(15,32,14,2,'#c3bdac'); R(21,25,2,11,'#b3ad9c');
    R(9,25,2,9,'#e6e2d2'); R(33,22,2,10,'#e6e2d2'); R(33,20,3,3,'#cfcabb');
    R(34,10,2,13,'#d8dce2'); R(32,21,6,2,'#c8a44a');
    ell(22,15,9,8,'#f0ede0'); R(15,20,14,3,'#d8d3c2');
    R(16,13,6,6,'#14110c'); R(23,13,6,6,'#14110c'); R(18,15,2,2,'#c04030'); R(25,15,2,2,'#c04030');
    R(21,17,2,3,'#c3bdac'); R(17,21,11,2,'#14110c'); for(let i=0;i<5;i++)R(17+i*2,21,1,2,'#f0ede0');
    break; }
  case 'cultist':{
    shadow();
    R(11,20,22,22,'#5c1626'); R(11,20,22,3,'#7a2334'); R(13,23,18,3,'#3f0f1a');
    R(9,24,6,18,'#4a1220'); R(29,24,6,18,'#4a1220');
    ell(22,15,10,10,'#6a1a2a'); R(13,10,18,8,'#6a1a2a'); R(13,10,18,2,'#7a2334');
    ell(22,18,7,7,'#0c0608'); // sombra do capuz
    R(17,17,4,3,'#d43a2e'); R(23,17,4,3,'#d43a2e'); R(18,17,2,2,'#ff8a3a'); R(24,17,2,2,'#ff8a3a');
    R(20,32,4,4,'#2a0c12'); R(19,36,6,2,'#e8c15a'); R(20,26,4,8,'#3f0f1a'); // mãos + orla
    R(21,27,2,4,'#ffcf6a'); R(20,25,4,2,'#ff8a3a'); // chama entre as mãos
    break; }
  case 'wraith':{
    shadow();
    for(let i=0;i<14;i++){ const w=11-Math.floor(i*0.55); g.fillStyle=i%2?'#3a2358':'#4a2f6e'; g.globalAlpha=0.85-i*0.04; g.fillRect(22-w,20+i,w*2, i>10?1:2); }
    g.globalAlpha=1;
    ell(22,16,10,10,'#5a3a82'); ell(22,17,9,9,'#3a2358');
    R(9,18,4,12,'#4a2f6e'); R(31,18,4,12,'#4a2f6e'); R(8,28,3,2,'#3a2358'); R(33,28,3,2,'#3a2358');
    ell(22,17,7,6,'#160a24');
    R(16,13,5,6,'#c8a0ff'); R(23,13,5,6,'#c8a0ff'); R(17,14,3,4,'#fff'); R(24,14,3,4,'#fff');
    R(18,15,1,2,'#7a4ac8'); R(25,15,1,2,'#7a4ac8');
    R(20,22,4,3,'#160a24'); break; }
  case 'spider':{
    shadow();
    for(let i=0;i<4;i++){ const yy=26+i*2; R(4+i,yy-6,7,2,'#241428'); R(3+i,yy-8,3,4,'#241428');
      R(33-i,yy-6,7,2,'#241428'); R(38-i,yy-8,3,4,'#241428'); }
    for(let i=0;i<4;i++){ const yy=26+i*2; R(6+i,yy-5,6,1,'#4a2f4e'); R(32-i,yy-5,6,1,'#4a2f4e'); }
    ell(22,30,11,9,'#2e1a30'); ell(22,29,10,8,'#3f2442'); ell(20,26,5,4,'#573156');
    ell(22,19,7,6,'#3f2442'); R(19,22,2,3,'#241428'); R(23,22,2,3,'#241428'); // presas
    R(16,16,3,3,'#e0402e'); R(25,16,3,3,'#e0402e'); R(19,17,2,2,'#e0402e'); R(23,17,2,2,'#e0402e');
    R(17,17,1,1,'#ff9'); R(26,17,1,1,'#ff9'); break; }
  case 'golem':{
    shadow(); g.fillStyle='rgba(0,0,0,.3)'; g.fillRect(6,41,32,2);
    R(9,34,8,9,'#5a4c3c'); R(27,34,8,9,'#5a4c3c'); R(9,41,9,2,'#3f342a'); R(26,41,9,2,'#3f342a');
    ell(22,26,15,12,'#6a5a46'); R(8,18,28,16,'#6a5a46'); R(8,18,28,3,'#8a7a5e');
    R(2,18,9,14,'#5a4c3c'); R(33,18,9,14,'#5a4c3c'); R(1,30,7,7,'#4a3e30'); R(36,30,7,7,'#4a3e30');
    R(14,25,16,1,'#3f342a'); R(20,20,1,18,'#3f342a'); R(11,31,22,1,'#4a3e30');
    ell(22,13,10,8,'#7a6a52'); R(13,8,18,7,'#7a6a52'); R(13,8,18,2,'#94836a');
    R(14,10,6,4,'#241a0e'); R(24,10,6,4,'#241a0e');
    R(15,11,4,2,'#ffd24a'); R(25,11,4,2,'#ffd24a'); R(16,11,1,2,'#fff7d0'); R(26,11,1,2,'#fff7d0');
    R(15,17,14,2,'#241a0e'); for(let i=0;i<5;i++)R(16+i*3,15,1,4,'#3f342a'); break; }
  case 'dknight':{
    shadow(); g.fillStyle='rgba(0,0,0,.3)'; g.fillRect(8,41,28,2);
    R(12,35,7,8,'#20202c'); R(25,35,7,8,'#20202c'); R(12,42,8,1,'#12121a'); R(24,42,8,1,'#12121a');
    R(30,6,4,30,'#4a4a5a'); R(31,4,2,26,'#6a6a7e'); R(28,26,8,3,'#2a2a38'); // espada
    R(10,20,24,16,'#2a2a3a'); R(10,20,24,3,'#3f3f52'); R(20,20,4,16,'#4a1a26'); // peitoral + tabardo
    R(6,20,7,15,'#26263340'.slice(0,7)); R(6,20,7,15,'#2a2a38'); R(31,20,7,14,'#2a2a38'); // ombreiras
    R(5,19,8,3,'#4a4a5c'); R(31,19,8,3,'#4a4a5c');
    ell(22,13,9,9,'#33333f'); R(13,7,18,7,'#33333f'); R(13,7,18,2,'#4a4a5c');
    for(let i=0;i<4;i++){R(11-i,4+i,3,2,'#4a4a5c'); R(30+i,4+i,3,2,'#4a4a5c');} // chifres
    R(14,13,16,3,'#0a0a10'); R(16,14,4,2,'#e03028'); R(24,14,4,2,'#e03028'); // visor + brilho
    R(17,14,1,1,'#ff8'); R(25,14,1,1,'#ff8'); R(21,10,2,4,'#4a1a26'); break; }
  default: R(14,20,16,20,'#888');
  }
}

/* ================= RENDER COMBATE ================= */
let bfxRunning=false, shakeAmt=0, dirtyBP=false;
function markDirty(){ dirtyBP=true; }

/* ---------- VFX (partículas de combate) ---------- */
let VFX=[]; const BFX={W:0,H:0};
function enemyScreen(e){ return {x:e.sx*BFX.W, y:e.sy*BFX.H - e.scale*46}; }
function fxSpawn(x,y,o){ VFX.push({x,y,vx:o.vx||0,vy:o.vy||0,life:o.life||0.5,max:o.life||0.5,size:o.size||3,color:o.color||'#fff',grav:o.grav||0,type:o.type||'spark',rot:o.rot||0}); }
function fxBurst(x,y,color,n,spd,mode){ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2,s=spd*(0.4+Math.random()); fxSpawn(x,y,{vx:Math.cos(a)*s,vy:Math.sin(a)*s-(mode==='rise'?spd*0.5:spd*0.2),life:0.35+Math.random()*0.4,size:2+Math.random()*3,color,grav:mode==='rise'?-40:200,type:'spark'}); } }
function fxImpact(x,y,color){ fxSpawn(x,y,{type:'ring',life:0.32,size:5,color}); fxBurst(x,y,color,9,260); }
function fxSlash(x,y,color){ fxSpawn(x,y,{type:'slash',life:0.22,size:36,color:color||'#fff',rot:rnd(-0.5,0.5)}); }
function fxElem(x,y,type){ const c=ELCOL[type]||'#fff';
  if(type==='fire'){ fxBurst(x,y,'#ff8a3a',16,180,'rise'); fxBurst(x,y,'#ffd24a',8,110,'rise'); fxSpawn(x,y,{type:'ring',life:0.3,size:6,color:'#ff8a3a'}); }
  else if(type==='ice'){ for(let i=0;i<11;i++)fxSpawn(x,y,{vx:rnd(-160,160),vy:rnd(-160,160),life:0.4,size:3,color:'#ace8ff',type:'shard'}); fxSpawn(x,y,{type:'ring',life:0.3,size:5,color:'#ace8ff'}); }
  else if(type==='bolt'){ fxSpawn(x,y,{type:'bolt',life:0.22,color:'#ffe14a'}); fxBurst(x,y,'#fff7a0',8,300); }
  else if(type==='holy'){ for(let i=0;i<12;i++)fxSpawn(x+rnd(-14,14),y+rnd(-2,22),{vy:-rnd(50,110),life:0.7,size:2,color:'#fff0b0',grav:-14}); fxSpawn(x,y,{type:'ring',life:0.5,size:8,color:'#ffe89a'}); }
  else if(type==='dark'){ fxBurst(x,y,'#9a6ad0',14,120); fxSpawn(x,y,{type:'ring',life:0.5,size:7,color:'#6a3aa0'}); }
  else fxImpact(x,y,c);
}
function fxHeal(x,y){ for(let i=0;i<10;i++)fxSpawn(x+rnd(-16,16),y+rnd(-4,20),{vy:-rnd(30,80),life:0.7,size:2+Math.random()*2,color:'#8ef08e',grav:-16}); fxSpawn(x,y,{type:'ring',life:0.5,size:8,color:'#8ef08e'}); }
function fxBreak(x,y){ fxSpawn(x,y,{type:'ring',life:0.55,size:8,color:'#ffd94a'}); fxBurst(x,y,'#ffe27a',20,340); fxBurst(x,y,'#ffb04a',10,190); }
function fxUpdate(dt){ for(let i=VFX.length-1;i>=0;i--){ const p=VFX[i]; p.life-=dt; if(p.life<=0){VFX.splice(i,1);continue;} p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.grav*dt; } }
function fxDraw(g){ for(const p of VFX){ const a=clamp(p.life/p.max,0,1);
  if(p.type==='spark'){ g.globalAlpha=a; g.fillStyle=p.color; const s=p.size*(0.4+a*0.6); g.fillRect(p.x-s/2,p.y-s/2,s,s); }
  else if(p.type==='shard'){ g.globalAlpha=a; g.fillStyle=p.color; g.fillRect(p.x-1,p.y-2,2,4); }
  else if(p.type==='ring'){ g.globalAlpha=a*0.9; g.strokeStyle=p.color; g.lineWidth=2.5; g.beginPath(); g.arc(p.x,p.y,p.size+(1-a)*34,0,7); g.stroke(); }
  else if(p.type==='slash'){ g.globalAlpha=a; g.strokeStyle=p.color; g.lineWidth=4; g.lineCap='round'; g.beginPath(); g.arc(p.x,p.y,p.size,-0.9+p.rot,0.9+p.rot); g.stroke(); }
  else if(p.type==='bolt'){ g.globalAlpha=a; g.strokeStyle=p.color; g.lineWidth=2.5; g.beginPath(); let yy=p.y-46; g.moveTo(p.x,yy); for(let k=0;k<5;k++){yy+=13;g.lineTo(p.x+rnd(-9,9),yy);} g.stroke(); }
} g.globalAlpha=1; }
function flashCard(t,color){ const i=G.party.indexOf(t); const el=$('#bparty').children[i]; if(!el)return;
  try{ el.animate([{boxShadow:`0 0 0 2px ${color},0 0 20px ${color}`,transform:'translateX(-3px)'},{transform:'translateX(3px)'},{boxShadow:'none',transform:'none'}],{duration:340}); }catch(e){} }
function flashScreen(a){ const f=$('#flash'); if(!f)return; f.style.transition='none'; f.style.opacity=(a||0.55); requestAnimationFrame(()=>{ f.style.transition='opacity .45s'; f.style.opacity='0'; }); }
/* ---------- FÚRIA (medidor de equipe) ---------- */
function renderFury(){ const w=$('#furyWrap'); if(!w||!G.battle)return; const f=clamp(G.battle.fury||0,0,100);
  w.querySelector('#furyBar>i').style.width=f+'%'; w.classList.toggle('full',f>=100);
  w.querySelector('#furyLbl').textContent = f>=100?'🔥 FÚRIA!':'FÚRIA '+Math.floor(f)+'%'; }
function furyGain(a){ if(!G.battle||G.battle.fury>=100)return; const was=G.battle.fury||0; G.battle.fury=clamp(was+a,0,100);
  if(was<100&&G.battle.fury>=100){ blog('🔥 A FÚRIA do grupo transbordou! (toque em FÚRIA no seu turno)'); SFX.lvup(); } renderFury(); }
async function furyStrike(c,target){
  hideMenus(); G.battle.fury=0; renderFury(); flashScreen(0.6); SFX.crit();
  blog('🔥🔥 INVESTIDA FINAL! 🔥🔥'); await wait(200);
  for(const h of alliesAlive()){ if(!target||!target.alive){ target=enemiesAlive()[0]; if(!target)break; }
    flashCard(h,'#ffcf6a'); const ps=enemyScreen(target); const mag=h.mag>h.str;
    fxElem(ps.x,ps.y, mag?'holy':h.wtype); fxImpact(ps.x,ps.y,'#ffe27a'); shakeField(13);
    applyHit(h,target,{type:mag?'holy':h.wtype,power:245,magic:mag,crit:0.6,noCounter:true});
    await wait(310);
  }
  markDirty(); renderBparty(); await wait(300); finishTurn();
}

function drawBattleBg(ctx,W,H,t){
  let g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#241d2b');g.addColorStop(0.55,'#181320');g.addColorStop(1,'#090610'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  const hz=H*0.6;
  ctx.strokeStyle='rgba(0,0,0,.22)'; ctx.lineWidth=1;
  for(let y=0;y<hz;y+=18){ ctx.beginPath();ctx.moveTo(0,y+0.5);ctx.lineTo(W,y+0.5);ctx.stroke(); }
  for(let x=(Math.floor(t*0)%34);x<W;x+=34){ ctx.beginPath();ctx.moveTo(x+0.5,0);ctx.lineTo(x+0.5,hz);ctx.stroke(); }
  g=ctx.createLinearGradient(0,hz,0,H); g.addColorStop(0,'#2c2333');g.addColorStop(1,'#0d0916'); ctx.fillStyle=g;
  ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(W*0.28,hz);ctx.lineTo(W*0.72,hz);ctx.lineTo(W,H);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.32)';
  for(let i=1;i<6;i++){ const yy=hz+(H-hz)*(i/6); ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke(); }
  for(let i=-3;i<=3;i++){ ctx.beginPath();ctx.moveTo(W/2+i*28,hz);ctx.lineTo(W/2+i*170,H);ctx.stroke(); }
  [0.07,0.93].forEach((fx,k)=>{ const tx=W*fx, ty=H*0.26, fl=0.7+Math.sin(t*7+k*2)*0.18+Math.random()*0.08;
    const rg=ctx.createRadialGradient(tx,ty,4,tx,ty,150); rg.addColorStop(0,`rgba(255,150,60,${0.3*fl})`);rg.addColorStop(1,'rgba(255,120,40,0)'); ctx.fillStyle=rg; ctx.fillRect(tx-150,ty-150,300,300);
    ctx.fillStyle='#2e261c'; ctx.fillRect(tx-2,ty,4,42);
    ctx.fillStyle=`rgba(255,${(140+Math.random()*70)|0},50,${fl})`; ctx.beginPath();ctx.ellipse(tx,ty-6,5,11*fl,0,0,7);ctx.fill();
    ctx.fillStyle='#ffe89a'; ctx.beginPath();ctx.ellipse(tx,ty-4,2,5*fl,0,0,7);ctx.fill();
  });
  const vg=ctx.createRadialGradient(W/2,H*0.42,H*0.28,W/2,H*0.5,H*0.9); vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.72)'); ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
}

function bfxLoop(){ if(bfxRunning)return; bfxRunning=true;
  const cv=$('#benemies'), fxc=$('#bfx'); let last=performance.now();
  function frame(){
    if(G.state!=='battle'){ bfxRunning=false; VFX=[]; return; }
    requestAnimationFrame(frame);
    const now=performance.now(), dt=Math.min(0.05,(now-last)/1000); last=now; const t=now/1000;
    const W=cv.clientWidth,H=cv.clientHeight; if(cv.width!==W){cv.width=W;cv.height=H;fxc.width=W;fxc.height=H;layoutEnemies();}
    BFX.W=W;BFX.H=H;
    const ctx=cv.getContext('2d'); ctx.clearRect(0,0,W,H);
    drawBattleBg(ctx,W,H,t);
    const sx=(Math.random()-0.5)*shakeAmt, sy=(Math.random()-0.5)*shakeAmt; if(shakeAmt>0)shakeAmt*=0.86;
    const order=[...G.battle.enemies].sort((a,b)=>a.sy-b.sy);
    for(const e of order){
      const breath=1+Math.sin(t*2.2+e.bob)*0.03;
      const bob=Math.sin(t*2.2+e.bob)*4*e.scale;
      if(e.lungeT>0)e.lungeT-=dt;
      const lunge=e.lungeT>0? Math.sin((1-e.lungeT/0.18)*Math.PI)*24 : 0;
      const cx=e.sx*W+sx, cy=e.sy*H+sy+bob+lunge;
      if(!e.alive){ if(e.dieT>0){ ctx.save();ctx.globalAlpha=Math.max(0,e.dieT);ctx.translate(0,(1-e.dieT)*14); drawEnemySprite(ctx,cx,cy,e.scale*2.3*breath,e.spr,0); ctx.restore(); e.dieT-=dt*2.2; } continue; }
      if(e.hitFlash>0)e.hitFlash=Math.max(0,e.hitFlash-dt*5);
      const recoil=e.hitFlash>0? -e.hitFlash*7:0;
      // aura de ELITE
      if(e.affix){ const ar=44*e.scale*2.3*0.5; const au=ctx.createRadialGradient(cx,cy-ar,ar*0.3,cx,cy-ar,ar*1.5);
        const pulse=0.18+Math.sin(t*4+e.bob)*0.07; au.addColorStop(0,e.affixColor+'00'); au.addColorStop(0.6,hexA(e.affixColor,pulse)); au.addColorStop(1,e.affixColor+'00');
        ctx.fillStyle=au; ctx.fillRect(cx-ar*1.6,cy-ar*2.6,ar*3.2,ar*3); }
      // aura de conjuração (chefe carregando)
      if(e.charging){ const ar=44*e.scale*2.3*0.5; const gl=0.3+Math.sin(t*10)*0.18; const cg=ctx.createRadialGradient(cx,cy-ar,4,cx,cy-ar,ar*1.7);
        cg.addColorStop(0,`rgba(255,60,50,${gl})`); cg.addColorStop(1,'rgba(255,60,50,0)'); ctx.fillStyle=cg; ctx.fillRect(cx-ar*1.8,cy-ar*2.8,ar*3.6,ar*3.2); }
      drawEnemySprite(ctx,cx,cy+recoil,e.scale*2.3*breath,e.spr,e.hitFlash);
      const topY=cy-44*e.scale*2.3;
      ctx.textAlign='center';
      // nome (elite em cor do afixo)
      ctx.font='bold 11px "Courier New"'; ctx.fillStyle=e.broken?'#ffd94a':(e.affix?e.affixColor:'#e4ddc9');
      ctx.shadowColor='#000';ctx.shadowBlur=3; ctx.fillText(e.name+(e.broken?'  ⚡QUEBRADO':''), cx, topY-(e.charging?30:18)); ctx.shadowBlur=0;
      // barra de conjuração
      if(e.charging){ const cw=(e.boss?150:100),cbx=cx-cw/2,cby=topY-24; ctx.fillStyle='#100'; ctx.fillRect(cbx-2,cby-2,cw+4,9);
        ctx.fillStyle='#2a0a0a';ctx.fillRect(cbx,cby,cw,5); ctx.fillStyle='#ff5a3a';ctx.fillRect(cbx,cby,cw*0.8,5);
        ctx.font='bold 10px "Courier New"';ctx.fillStyle='#ff8a6a';ctx.fillText('⚠ '+e.charging.name+' ⚠',cx,cby-3); }
      // hp bar (moldura)
      const bw=e.boss?134:52, bx=cx-bw/2, by=topY-11;
      ctx.fillStyle='#0a0a0a';ctx.fillRect(bx-2,by-2,bw+4,8); ctx.fillStyle='#3a1010';ctx.fillRect(bx,by,bw,4);
      const hpg=ctx.createLinearGradient(bx,0,bx+bw,0); hpg.addColorStop(0,e.broken?'#ffd24a':'#e0563e');hpg.addColorStop(1,e.broken?'#ffb04a':'#a02820');
      ctx.fillStyle=hpg; ctx.fillRect(bx,by,bw*(e.hp/e.mhp),4);
      // escudos de guarda
      ctx.font='11px "Courier New"'; let gtxt=''; for(let i=0;i<e.guardMax;i++)gtxt+= i<e.guard?'◆':'◇';
      ctx.fillStyle=e.broken?'#ff6a4a':'#7ec8ff'; ctx.fillText(gtxt,cx,by-5);
      // fraquezas
      const shown=[...(e.scanned?[...e.weak]:[...e.discovered].filter(x=>e.weak.has(x)))];
      if(shown.length){ ctx.font='12px sans-serif'; ctx.fillStyle='#ffcf6a'; ctx.fillText(shown.map(w=>ELEM[w]).join(' '), cx, cy+10); }
    }
    // camada de partículas
    const g=fxc.getContext('2d'); g.clearRect(0,0,W,H); fxUpdate(dt); g.save(); g.translate(sx,sy); g.globalCompositeOperation='lighter'; fxDraw(g); g.restore();
    if(dirtyBP){ dirtyBP=false; renderBparty(); }
  }
  frame();
}
function hexA(hex,a){ const h=hex.replace('#',''); const r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16); return `rgba(${r},${g},${b},${a})`; }
function shakeField(a){ shakeAmt=Math.max(shakeAmt,a); }
async function animAttack(c){ blog('⚔ '+c.name+' ataca!'); await wait(120); }
async function animCast(c,sk){ SFX.cast(); blog('✦ '+c.name+' conjura '+(sk?sk.name:'')+'...'); await wait(200); }
async function animEnemyAttack(e){ e.lungeT=0.18; await wait(160); }

function renderBparty(){
  const el=$('#bparty'); el.innerHTML='';
  G.party.forEach((c,i)=>{
    const turn=(G.curActor===c && G.state==='battle');
    const d=document.createElement('div'); d.className='bpc'+(c.alive?'':' dead')+(turn?' turn':'');
    let rz=''; for(let k=0;k<5;k++)rz+=`<i class="${k<c.resolve?'on':''}"></i>`;
    d.innerHTML=`<div class="bpTop"><canvas class="bpPort" width="64" height="64"></canvas>
        <div class="bpNm"><span class="bn">${c.name}</span><span class="brow">${c.row===0?'⚔ Frente':'✧ Trás'}</span></div></div>
      <div class="bpbar hp"><i style="width:${c.hp/c.mhp*100}%"></i><span class="t">${c.hp}/${c.mhp}</span></div>
      <div class="bpbar mp"><i style="width:${c.mmp?c.mp/c.mmp*100:0}%"></i><span class="t">${c.mp}/${c.mmp}</span></div>
      <div class="rz" title="Impulso (${c.resolve}/5)"><span class="rzL">⚡</span>${rz}</div><div class="cnd">${condChips(c)}</div>`;
    el.appendChild(d);
    drawPortrait(d.querySelector('.bpPort'),c.pal);
  });
}
function renderTurnQ(){
  const q=$('#turnQ'); if(!G.battle.order){q.innerHTML='';return;}
  q.innerHTML=''; const idx=G.battle.order.indexOf(G.curActor);
  G.battle.order.forEach((c,i)=>{ if(!c.alive)return;
    const col=c.side==='party'?'#4a86d8':(c.boss?'#c83a3a':'#8a6a3a');
    const now=c===G.curActor;
    const el=document.createElement('div'); el.className='tq'+(now?' now':'');
    el.innerHTML=`<span class="dot" style="background:${col}"></span>${c.name.split(' ')[0]}`;
    q.appendChild(el);
  });
}
function blog(s){ const l=$('#blog'); const div=document.createElement('div'); div.className='ln'; div.textContent=s;
  l.appendChild(div); while(l.children.length>3)l.removeChild(l.firstChild); G.battle&&G.battle.log.push(s); }
function popup(t,val,cls){ const cv=$('#benemies'),f=$('#bfield'); let x,y;
  if(t.side==='enemy'){ const r=cv.getBoundingClientRect(),fr=f.getBoundingClientRect(); x=r.left-fr.left+t.sx*r.width; y=r.top-fr.top+t.sy*r.height-t.scale*40; }
  else { const idx=G.party.indexOf(t),card=$('#bparty').children[idx]; if(!card)return; const cr=card.getBoundingClientRect(),fr=$('#battle').getBoundingClientRect(); x=cr.left-fr.left+cr.width/2; y=cr.top-fr.top; }
  const p=document.createElement('div'); p.className='pop '+(cls||''); p.textContent=val; p.style.left=x+'px';p.style.top=y+'px';
  ($('#battle')).appendChild(p); setTimeout(()=>p.remove(),1000);
}

/* ================= TOAST / MENSAGENS ================= */
let toastT;
function toast(s,ms){ const m=$('#msg'); if(m){m.textContent=s;m.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>m.classList.remove('on'),ms||1500);} logMsg(s); }
function logMsg(s){ const l=$('#logText'); if(!l)return; const div=document.createElement('div');div.className='ln';div.textContent=(''+s).replace(/\n/g,'  ·  ');
  l.appendChild(div); while(l.children.length>3)l.removeChild(l.firstChild); }

/* ================= MAPA ================= */
function openMap(){ const ov=$('#mapOv'); ov.classList.add('on'); $('#mapFl').textContent=G.dun.name; drawMapCv(); }
function drawMapCv(){ const cv=$('#mapCv'),d=G.dun; const cell=Math.floor(Math.min(520,window.innerWidth-40)/d.w); cv.width=d.w*cell;cv.height=d.h*cell;
  const ctx=cv.getContext('2d'); ctx.fillStyle='#050505';ctx.fillRect(0,0,cv.width,cv.height);
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){ const px=x*cell,py=y*cell; const ex=d.explored[y][x];
    if(!ex){ ctx.fillStyle='#0d0d0f'; ctx.fillRect(px,py,cell-1,cell-1); continue; }
    let t=d.grid[y][x]; let col='#2a2a30';
    if(t==='#')col='#181820'; else if(t==='+')col='#7a5a2a'; else if(t==='S'&&!d.secretsRevealed.has(x+','+y))col='#181820';
    else if(t==='C'&&!d.looted.has(x+','+y))col='#c8a44a'; else if(t==='>')col='#5aa85a'; else if(t==='<')col='#3a6ab0';
    else if(t==='F')col='#4a86d8'; else if(t==='B')col='#c83a3a'; else col='#3a3a44';
    ctx.fillStyle=col; ctx.fillRect(px,py,cell-1,cell-1);
  }
  // jogador
  const jx=Math.floor(G.px)*cell,jy=Math.floor(G.py)*cell; ctx.fillStyle='#e8c15a';
  ctx.beginPath(); const cxp=jx+cell/2,cyp=jy+cell/2,r=cell*0.35, a=dirAng(G.dir);
  ctx.moveTo(cxp+Math.cos(a)*r,cyp+Math.sin(a)*r); ctx.lineTo(cxp+Math.cos(a+2.4)*r,cyp+Math.sin(a+2.4)*r); ctx.lineTo(cxp+Math.cos(a-2.4)*r,cyp+Math.sin(a-2.4)*r); ctx.fill();
}

/* ================= CAMP ================= */
function openCamp(){ if(G.state!=='explore')return; const ov=$('#campOv'); ov.classList.add('on'); renderCamp(); }
function renderCamp(){ const m=$('#campMenu');
  const invTxt=Object.keys(G.inv).filter(id=>G.inv[id]>0).map(id=>ITEMS[id].name+' ×'+G.inv[id]).join(', ')||'vazio';
  m.innerHTML=`
    <div class="mitem" data-c="rest"><span>🔥 Descansar</span><span class="sub">restaura 35% HP/MP · risco de emboscada</span></div>
    <div class="mitem" data-c="item"><span>🜂 Usar Item</span><span class="sub">${invTxt}</span></div>
    <div class="mitem" data-c="form"><span>↕ Formação</span><span class="sub">trocar frente/trás</span></div>
    <div class="mitem" data-c="status"><span>📖 Fichas</span><span class="sub">ver atributos e técnicas</span></div>
    <div class="mitem" data-c="mute"><span>🔊 Som: ${AU.muted?'OFF':'ON'}</span><span class="sub">liga/desliga áudio</span></div>
    <div class="mitem" data-c="save"><span>💾 Salvar</span><span class="sub">progresso é salvo automaticamente</span></div>`;
  m.querySelectorAll('.mitem').forEach(el=>el.onclick=()=>{ SFX.ui(); campAction(el.dataset.c); });
}
function campAction(c){
  if(c==='rest'){ G.party.forEach(p=>{ if(p.alive){p.hp=clamp(p.hp+Math.round(p.mhp*0.35),0,p.mhp);p.mp=clamp(p.mp+Math.round(p.mmp*0.35),0,p.mmp);} });
    $('#campOv').classList.remove('on'); renderHUD(); toast('Descanso. Grupo recupera as forças.',1500);
    if(chance(0.28)){ setTimeout(()=>{toast('⚠ Emboscados durante o descanso!',1500); setTimeout(()=>startBattle(rollFormation(false)),700);},700); } saveGame(); return; }
  if(c==='mute'){ AU.muted=!AU.muted; if(AU.muted)musicStop(); else if(G.state==='explore')musicStart('explore'); renderCamp(); return; }
  if(c==='save'){ saveGame(); toast('Progresso salvo.',1200); return; }
  if(c==='form'){ renderFormation(); return; }
  if(c==='status'){ renderStatus(); return; }
  if(c==='item'){ renderCampItems(); return; }
}
function renderFormation(){ const m=$('#campMenu');
  m.innerHTML=`<div style="color:#c8a44a;letter-spacing:2px;margin-bottom:10px">FORMAÇÃO — toque p/ alternar frente/trás</div>`+
    G.party.map((c,i)=>`<div class="mitem" data-f="${i}"><span>${c.name}</span><span class="sub">${c.row===0?'⚔ Linha da FRENTE':'✧ Linha de TRÁS'}</span></div>`).join('')+
    `<div class="mitem" data-back><span>‹ Voltar</span></div>`;
  m.querySelectorAll('[data-f]').forEach(el=>el.onclick=()=>{ const c=G.party[+el.dataset.f]; c.row=c.row?0:1; SFX.ui(); renderFormation(); });
  m.querySelector('[data-back]').onclick=()=>{SFX.back();renderCamp();};
}
function renderStatus(){ const m=$('#campMenu');
  m.innerHTML=G.party.map(c=>`<div class="mitem" style="flex-direction:column;align-items:flex-start;gap:4px">
    <span>${c.name} — ${c.cls} · Nv ${c.lv}</span>
    <span class="sub">HP ${c.mhp} · MP ${c.mmp} · FOR ${c.str} · MAG ${c.mag} · DEF ${c.def} · RES ${c.res} · AGI ${c.agi}</span>
    <span class="sub" style="color:#8ac8ff">Técnicas: ${knownSkills(c).map(id=>SKILLS[id].name).join(', ')}</span></div>`).join('')+
    `<div class="mitem" data-back><span>‹ Voltar</span></div>`;
  m.querySelector('[data-back]').onclick=()=>{SFX.back();renderCamp();};
}
function renderCampItems(){ const m=$('#campMenu'); const ids=Object.keys(G.inv).filter(id=>G.inv[id]>0);
  m.innerHTML=(ids.length?ids.map(id=>`<div class="mitem" data-u="${id}"><span>${ITEMS[id].name} ×${G.inv[id]}</span><span class="sub">${ITEMS[id].desc}</span></div>`).join(''):`<div class="mitem"><span>Sem itens.</span></div>`)+
    `<div class="mitem" data-back><span>‹ Voltar</span></div>`;
  m.querySelectorAll('[data-u]').forEach(el=>el.onclick=()=>{ const id=el.dataset.u,it=ITEMS[id];
    if(it.use==='heal'||it.use==='mp'||it.use==='cure'||it.use==='revive'){ // aplica ao grupo (mais ferido)
      const t=it.use==='revive'?G.party.find(p=>!p.alive):G.party.filter(p=>p.alive).sort((a,b)=>a.hp/a.mhp-b.hp/b.mhp)[0];
      if(!t){toast('Ninguém precisa disso agora.',1200);return;}
      G.inv[id]--; if(it.use==='heal')t.hp=clamp(t.hp+it.pow,0,t.mhp); else if(it.use==='mp')t.mp=clamp(t.mp+it.pow,0,t.mmp); else if(it.use==='cure')t.status={}; else if(it.use==='revive'){t.alive=true;t.hp=Math.round(t.mhp*it.pow);}
      SFX.heal(); renderHUD(); renderCampItems();
    } else { toast('Esse item é só para combate.',1300); }
  });
  m.querySelector('[data-back]').onclick=()=>{SFX.back();renderCamp();};
}

/* ================= TELAS FIM ================= */
function showDead(){ musicStop(); $('#deadStats').innerHTML=`Chegaram ao <b>Andar ${G.depth}</b> · ${G.kills} inimigos abatidos · ${G.gp} GP.<br>A masmorra reclama mais quatro almas...`;
  $('#dead').classList.remove('hidden'); clearSave(); }
function showWin(){ musicStop(); SFX.win(); $('#winStats').innerHTML=`Vocês venceram o Cavaleiro da Cinza e escaparam do abismo!<br>Andar ${G.depth} · ${G.gp} GP · Nível médio ${Math.round(G.party.reduce((a,c)=>a+c.lv,0)/4)}.`;
  $('#win').classList.remove('hidden'); }

/* ================= SAVE ================= */
const SAVEKEY='masmorra_save_v1';
function saveGame(){ try{ const s={gp:G.gp,depth:G.depth,maxFloor:G.maxFloor,inv:G.inv,steps:G.steps,kills:G.kills,
    party:G.party.map(c=>({id:c.id,lv:c.lv,xp:c.xp,xpNext:c.xpNext,mhp:c.mhp,hp:c.hp,mmp:c.mmp,mp:c.mp,str:c.str,mag:c.mag,def:c.def,res:c.res,agi:c.agi,luck:c.luck,row:c.row})),
    scene:G.dun?serialScene(G.dun):null, px:G.px,py:G.py,dir:G.dir };
  localStorage.setItem(SAVEKEY,JSON.stringify(s)); }catch(e){} }
function serialScene(d){ return {depth:d.depth,grid:d.grid.map(r=>r.join('')),name:d.name,
  doorsOpen:[...d.doorsOpen],secretsRevealed:[...d.secretsRevealed],looted:[...d.looted],triggered:[...d.triggered],rested:[...d.rested],
  explored:d.explored.map(r=>r.map(v=>v?1:0)),isBoss:d.isBoss}; }
function loadScene(s){ const d={depth:s.depth,w:s.grid[0].length,h:s.grid.length,grid:s.grid.map(r=>r.split('')),name:s.name,
  doorsOpen:new Set(s.doorsOpen),secretsRevealed:new Set(s.secretsRevealed),looted:new Set(s.looted),triggered:new Set(s.triggered),rested:new Set(s.rested),
  explored:s.explored.map(r=>r.map(v=>!!v)),isBoss:s.isBoss,spawn:{x:1.5,y:1.5,dir:1}};
  // deriva posição/estado do chefe a partir do grid
  d.bossKey=bossKeyFor(s.depth); d.bossDefeated=true; d.bossPos=null;
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){ if(d.grid[y][x]==='B'){d.bossPos={x,y};d.bossDefeated=false;} else if(d.grid[y][x]==='>'&&!d.bossPos){d.bossPos={x,y};} }
  return d; }
function hasSave(){ return !!localStorage.getItem(SAVEKEY); }
function clearSave(){ try{localStorage.removeItem(SAVEKEY);}catch(e){} }
function loadGame(){ try{ const s=JSON.parse(localStorage.getItem(SAVEKEY)); if(!s)return false;
  G.gp=s.gp;G.depth=s.depth;G.floor=s.depth;G.maxFloor=s.maxFloor||s.depth;G.inv=s.inv||{};G.steps=s.steps||0;G.kills=s.kills||0;
  G.party=s.party.map(p=>{ const c=mkChar(p.id); Object.assign(c,{lv:p.lv,xp:p.xp,xpNext:p.xpNext,mhp:p.mhp,hp:p.hp,mmp:p.mmp,mp:p.mp,str:p.str,mag:p.mag,def:p.def,res:p.res,agi:p.agi,luck:p.luck,row:p.row}); return c; });
  if(s.scene){ setTheme(s.depth); G.dun=loadScene(s.scene); G.scenes[s.depth]=G.dun; G.px=s.px;G.py=s.py;G.dir=s.dir;G.ang=dirAng(G.dir);G.tang=G.ang; }
  else enterFloor(s.depth);
  return true;
}catch(e){ return false; } }

/* ================= NOVO JOGO ================= */
function newGame(){ G.gp=0;G.depth=1;G.floor=1;G.maxFloor=1;G.inv={erva:3,maca:2,pao:1,pocao:1,eter:1,antidoto:1,fenix:1};G.steps=0;G.kills=0;G.scenes={};
  G.party=[mkChar('leona'),mkChar('sakura'),mkChar('celes'),mkChar('darius')];
  enterFloor(1); }

/* ================= INPUT ================= */
function bindInput(){
  document.addEventListener('keydown',e=>{
    if(G.state==='explore'){
      if(e.key==='ArrowUp'||e.key==='w')tryMove(...DIRV[G.dir]);
      else if(e.key==='ArrowDown'||e.key==='s')tryMove(-DIRV[G.dir][0],-DIRV[G.dir][1]);
      else if(e.key==='ArrowLeft')turn(-1);
      else if(e.key==='ArrowRight')turn(1);
      else if(e.key==='a')tryMove(...DIRV[(G.dir+3)%4]);
      else if(e.key==='d')tryMove(...DIRV[(G.dir+1)%4]);
      else if(e.key==='e'||e.key==='Enter'||e.key===' ')interact();
      else if(e.key==='m'||e.key==='M')openMap();
      else if(e.key==='x'||e.key==='X'||e.key==='Escape')openCamp();
    }
  });
  // dpad
  $$('#dpad .dbtn').forEach(b=>b.onclick=()=>{ const m=b.dataset.m;
    if(m==='fw')tryMove(...DIRV[G.dir]); else if(m==='bw')tryMove(-DIRV[G.dir][0],-DIRV[G.dir][1]);
    else if(m==='tl')turn(-1); else if(m==='tr')turn(1);
    else if(m==='sl')tryMove(...DIRV[(G.dir+3)%4]); else if(m==='sr')tryMove(...DIRV[(G.dir+1)%4]);
  });
  // botões utilitários
  $$('#utilBar .ub').forEach(b=>b.onclick=()=>{ SFX.ui(); const u=b.dataset.u;
    if(u==='rest')openCamp(); else if(u==='map')openMap();
    else if(u==='save'){saveGame();toast('Progresso salvo.',1100);}
    else if(u==='wait'){ if(G.state==='explore'){toast('Você aguarda, atento às sombras...',900); G.stepsSince++; if(chance(0.2))setTimeout(()=>startBattle(rollFormation(false)),400);} }
  });
  // swipe no view p/ mover/virar — ignora toques que começam nos botões
  const vw=$('#viewWrap'); let sx,sy,sTarget=null;
  const onDpad=el=>el&&el.closest&&(el.closest('#dpad')||el.closest('#hints'));
  vw.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;sTarget=e.target;},{passive:true});
  vw.addEventListener('touchend',e=>{
    const tg=sTarget||e.target; sTarget=null;
    if(onDpad(tg)||onDpad(e.target))return;                 // toque no D-pad: os botões cuidam
    const t=e.changedTouches[0];const dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.abs(dx)<30&&Math.abs(dy)<30){interact();return;}
    if(Math.abs(dx)>Math.abs(dy)){dx>0?turn(1):turn(-1);}else{dy<0?tryMove(...DIRV[G.dir]):tryMove(-DIRV[G.dir][0],-DIRV[G.dir][1]);}
  },{passive:true});
  // fechar overlays
  $$('[data-close]').forEach(el=>el.onclick=()=>$('#'+el.dataset.close).classList.remove('on'));
  // botões de tela
  $('#btnPlay').onclick=()=>{ auInit(); if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume(); startNew(); };
  $('#btnCont').onclick=()=>{ auInit(); if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume(); startCont(); };
  $('#btnRevive').onclick=()=>{ $('#dead').classList.add('hidden'); startNew(); };
  $('#btnWinCont').onclick=()=>{ $('#win').classList.add('hidden'); G.state='explore'; musicStart('explore'); };
}
function startNew(){ newGame(); $('#title').classList.add('hidden'); G.state='explore'; rcResize(); renderHUD(); musicStart('explore'); setTimeout(rcResize,80); saveGame(); }
function startCont(){ if(loadGame()){ $('#title').classList.add('hidden'); G.state='explore'; rcResize(); renderHUD(); musicStart('explore'); setTimeout(rcResize,80); } else startNew(); }

/* ================= BOOT ================= */
function boot(){ buildTextures(); rcInit(); bindInput();
  let rt; window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(rcResize,120);});
  window.addEventListener('orientationchange',()=>setTimeout(rcResize,250));
  if(hasSave())$('#btnCont').style.display='inline-block';
  loop();
}
boot();
