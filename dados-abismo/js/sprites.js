/* ========================================================================
   SPRITES — desenhados em canvas (gótico de giz: osso, cera, tinta).
   Cada inimigo da Cripta de Giz tem silhueta própria (§10 legibilidade).
   ===================================================================== */
const S=128;
const cache=new Map();
const rnd=(s)=>{let x=s;return()=>{x=(x*1103515245+12345)&0x7fffffff;return x/0x7fffffff;}};

function novo(){ const c=document.createElement('canvas'); c.width=c.height=S; return [c,c.getContext('2d')]; }
const OSSO='#ece4d0', OSSO2='#c9bda2', TINTA='#241e18', CERA='#ffd98a';

function cranio(g,x,y,r,cor=OSSO){
  g.fillStyle=cor; g.beginPath(); g.ellipse(x,y,r,r*1.06,0,0,7); g.fill();
  g.fillRect(x-r*0.62,y+r*0.5,r*1.24,r*0.62);            // maxilar
  g.fillStyle=TINTA;
  g.beginPath(); g.ellipse(x-r*0.38,y-r*0.08,r*0.26,r*0.31,0,0,7); g.fill();
  g.beginPath(); g.ellipse(x+r*0.38,y-r*0.08,r*0.26,r*0.31,0,0,7); g.fill();
  g.beginPath(); g.moveTo(x,y+r*0.22); g.lineTo(x-r*0.13,y+r*0.5); g.lineTo(x+r*0.13,y+r*0.5); g.fill();
  g.strokeStyle=TINTA; g.lineWidth=r*0.09;
  for(let i=-2;i<=2;i++){ g.beginPath(); g.moveTo(x+i*r*0.26,y+r*0.52); g.lineTo(x+i*r*0.26,y+r*1.1); g.stroke(); }
}
function costela(g,x,y,w,h,n=4){
  g.strokeStyle=OSSO; g.lineWidth=w*0.13; g.lineCap='round';
  for(let i=0;i<n;i++){ const yy=y+i*(h/n);
    g.beginPath(); g.moveTo(x-w/2,yy); g.quadraticCurveTo(x,yy+h*0.10,x+w/2,yy); g.stroke(); }
  g.beginPath(); g.moveTo(x,y-h*0.05); g.lineTo(x,y+h); g.stroke();
}
function chama(g,x,y,r){
  const gr=g.createRadialGradient(x,y,0,x,y,r*2.4);
  gr.addColorStop(0,'rgba(255,240,190,.95)'); gr.addColorStop(.45,'rgba(255,190,90,.55)');
  gr.addColorStop(1,'rgba(255,140,40,0)');
  g.fillStyle=gr; g.beginPath(); g.arc(x,y,r*2.4,0,7); g.fill();
  g.fillStyle=CERA; g.beginPath(); g.moveTo(x,y-r*1.5); g.quadraticCurveTo(x+r*.72,y+r*.5,x,y+r);
  g.quadraticCurveTo(x-r*.72,y+r*.5,x,y-r*1.5); g.fill();
}

const D={
  osso_solto(g){ costela(g,64,44,46,54,5); cranio(g,64,30,17);
    g.strokeStyle=OSSO; g.lineWidth=7; g.lineCap='round';
    g.beginPath(); g.moveTo(44,58); g.lineTo(24,92); g.moveTo(84,58); g.lineTo(104,92); g.stroke(); },
  cranio_rolante(g){ cranio(g,64,62,34);
    g.strokeStyle=OSSO2; g.lineWidth=4;
    g.beginPath(); g.arc(64,62,44,0.4,2.2); g.stroke(); },
  vela_fatua(g){ g.fillStyle=OSSO; g.beginPath(); g.moveTo(52,116); g.lineTo(76,116); g.lineTo(72,52); g.lineTo(56,52); g.fill();
    g.fillStyle=OSSO2; for(let i=0;i<3;i++){ g.beginPath(); g.ellipse(52+i*8,60+i*14,4,9,0.3,0,7); g.fill(); }
    chama(g,64,42,11); },
  escriba_giz(g){ g.fillStyle='#2a2622'; g.beginPath(); g.moveTo(64,26); g.lineTo(100,118); g.lineTo(28,118); g.fill();
    cranio(g,64,36,16);
    g.strokeStyle=OSSO; g.lineWidth=5; g.beginPath(); g.moveTo(92,66); g.lineTo(112,44); g.stroke();
    g.fillStyle='#fff'; g.beginPath(); g.arc(114,41,5,0,7); g.fill(); },
  mao_sem_dono(g){ g.fillStyle=OSSO; g.beginPath(); g.ellipse(64,86,24,20,0,0,7); g.fill();
    g.strokeStyle=OSSO; g.lineWidth=8; g.lineCap='round';
    for(let i=0;i<4;i++){ const a=-2.5+i*0.42; g.beginPath(); g.moveTo(64,78);
      g.lineTo(64+Math.cos(a)*40, 78+Math.sin(a)*40); g.stroke(); }
    g.beginPath(); g.moveTo(48,92); g.lineTo(24,96); g.stroke(); },
  coro_mudo(g){ for(const [x,r] of [[40,15],[64,18],[88,15]]) cranio(g,x,54,r);
    g.strokeStyle='rgba(255,220,160,.5)'; g.lineWidth=3;
    for(let i=0;i<3;i++){ g.beginPath(); g.arc(64,54,52+i*9,3.6,5.8); g.stroke(); } },
  ossada_curvada(g){ g.strokeStyle=OSSO; g.lineWidth=13; g.lineCap='round';
    g.beginPath(); g.arc(64,74,38,3.5,6.0); g.stroke();
    costela(g,64,58,52,40,4); cranio(g,50,44,15); },
  lasca_femur(g){ g.save(); g.translate(64,68); g.rotate(-0.5);
    g.fillStyle=OSSO; g.beginPath(); g.roundRect(-9,-46,18,92,9); g.fill();
    g.beginPath(); g.arc(-9,-46,13,0,7); g.arc(9,-46,13,0,7); g.arc(-9,46,13,0,7); g.arc(9,46,13,0,7); g.fill();
    g.restore();
    g.strokeStyle='#e0503a'; g.lineWidth=3;
    g.beginPath(); g.moveTo(48,40); g.lineTo(80,96); g.stroke(); },
  /* elites */
  sacristao(g){ g.fillStyle='#1b1a24'; g.beginPath(); g.moveTo(64,18); g.lineTo(106,120); g.lineTo(22,120); g.fill();
    g.fillStyle='#12111a'; g.beginPath(); g.ellipse(64,40,26,30,0,0,7); g.fill();
    cranio(g,64,40,19,'#d8cdb4');
    g.strokeStyle='#8f6ad8'; g.lineWidth=3;
    for(let i=0;i<3;i++){ g.beginPath(); g.arc(64,40,34+i*7,3.4,6.0); g.stroke(); }
    chama(g,104,60,7); },
  guardiao(g){ g.fillStyle=OSSO2; g.beginPath(); g.roundRect(30,40,68,80,8); g.fill();
    g.fillStyle=OSSO; g.beginPath(); g.roundRect(38,48,52,64,6); g.fill();
    cranio(g,64,40,20);
    g.strokeStyle='#9ab4c8'; g.lineWidth=6; g.strokeRect(30,40,68,80); },
  carrilhao(g){ g.strokeStyle=OSSO2; g.lineWidth=3;
    g.beginPath(); g.moveTo(20,22); g.lineTo(108,22); g.stroke();
    for(let i=0;i<5;i++){ const x=28+i*18, h=44+((i%2)?18:0);
      g.beginPath(); g.moveTo(x,22); g.lineTo(x,22+h); g.stroke();
      g.fillStyle=OSSO; g.beginPath(); g.ellipse(x,22+h+9,8,11,0,0,7); g.fill(); }
    cranio(g,64,96,17); },
  /* subchefe e chefe */
  coveiro(g){ g.fillStyle='#22201c'; g.beginPath(); g.moveTo(64,20); g.lineTo(104,122); g.lineTo(24,122); g.fill();
    cranio(g,64,34,20);
    g.strokeStyle=OSSO2; g.lineWidth=7; g.lineCap='round';
    g.beginPath(); g.moveTo(100,30); g.lineTo(84,110); g.stroke();
    g.fillStyle=OSSO2; g.beginPath(); g.moveTo(90,20); g.lineTo(114,26); g.lineTo(102,44); g.fill(); },
  ossario(g){ g.fillStyle=OSSO2; g.beginPath(); g.roundRect(18,52,92,70,10); g.fill();
    for(let i=0;i<4;i++) cranio(g,32+i*22,62,11);
    costela(g,64,86,74,34,3);
    cranio(g,64,32,24);
    g.strokeStyle='#e0503a'; g.lineWidth=2.5;
    g.beginPath(); g.arc(64,32,34,3.4,6.0); g.stroke(); },
};
/* ARTE PINTADA — se existir o PNG em arte/inimigos/<id>.png, ele manda.
   O desenho em canvas continua como reserva: enquanto uma arte não chega,
   aquele inimigo não fica sem cara. */
const ARTE = new Set([
  'afogadora', 'bigorna_mae', 'bigorna_viva', 'bolha_mare',
  'brasa_afogada', 'capataz', 'carrilhao', 'colosso_cristal',
  'coral_cantante', 'coro_mudo', 'coveiro', 'cranio_rolante',
  'cria_salmoura', 'escama_salgada', 'escoria', 'escriba_giz',
  'estatua_sal', 'ferreiro_cego', 'fole_partido', 'guardiao',
  'lasca_femur', 'lingote_vivo', 'mao_limo', 'mao_sem_dono',
  'maregrande', 'martelo_orfao', 'mestre_tempera', 'nucleo_fundido',
  'ossada_curvada', 'ossario', 'osso_solto', 'peregrino',
  'rainha_sal', 'sacristao', 'salineiro', 'sanguessuga',
  'tromba_dagua', 'vela_fatua', 'verruma',
]);
export const temArte = id => ARTE.has(id);
/* desenho procedural — reserva pra quem ainda não tem ilustração */
export function spriteCanvas(id){
  if(cache.has(id)) return cache.get(id);
  const [c,g]=novo();
  const f=D[id];
  if(f){ g.save(); f(g); g.restore(); } else { cranio(g,64,60,30); }
  const url=c.toDataURL('image/png'); cache.set(id,url); return url;
}
export function spriteDe(id){
  if(ARTE.has(id)) return `./arte/inimigos/${id}.png`;
  if(cache.has(id)) return cache.get(id);
  const [c,g]=novo();
  const f=D[id];
  if(f){ g.save(); f(g); g.restore(); } else { cranio(g,64,60,30); }
  const url=c.toDataURL('image/png'); cache.set(id,url); return url;
}
