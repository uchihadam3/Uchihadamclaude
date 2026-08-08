/* ========================================================================
   A TRILHA — seis mundos, seis climas, nenhum arquivo para baixar.

   O jogo não tem um MB de áudio e não vai ter: o link é único, abre no
   celular de quem estiver com a internet ruim, e um jogo da memória que
   demora dez segundos para carregar já perdeu. Então a música é TOCADA, nota
   por nota, pelo mesmo WebAudio que faz os efeitos.

   Música gerada tem um jeito fácil de dar errado: sortear notas. Sai um
   chuvisco agradável nos primeiros vinte segundos e insuportável nos vinte
   seguintes, porque não há NADA para reconhecer. Aqui a aleatoriedade é toda
   gasta uma vez só, na carga: o tema de cada mundo é sorteado a partir de uma
   semente fixa e vira uma melodia de trinta e dois passos que se repete. É
   sempre a mesma música no mundo 3, em qualquer aparelho, hoje e amanhã — que
   é a diferença entre uma trilha e um gerador de sons.

   O QUE CADA MUNDO PRECISA DIZER. A trilha é informação, não enfeite: o
   jogador tem de ouvir que subiu de mundo antes de ler. Por isso o que muda
   entre um e outro não é só a melodia — é o MODO (a escala), o andamento e o
   timbre. O mundo 1 é maior e calmo; o 6 é frígio, rápido e grave. A sala do
   chefe rouba a tonalidade do mundo e a leva para a menor harmônica, mais
   rápida: é a mesma música, agora torta.

   E ELA NÃO PODE ATRAPALHAR. Num jogo de memória o ouvido é a segunda tela —
   o som do acerto é o que confirma o combo. A trilha toca num barramento
   próprio, mais baixo que os efeitos, e ABAIXA sozinha quando a tentativa
   está sendo resolvida. É a única coisa nela que reage à partida.
   ===================================================================== */
import { contexto, estaMudo } from './sfx.js';
import { makeRNG } from '../rng.js';

/* ---------- teoria, o mínimo dela ---------- */
const A4 = 440, MIDI_A4 = 69;
const hz = m => A4 * Math.pow(2, (m - MIDI_A4) / 12);
/* graus de escala em semitons. O nome importa: é o que faz um mundo soar
   "aberto" e outro "estreito" sem mudar mais nada. */
const MODOS = {
  maior:    [0,2,4,5,7,9,11],
  lidio:    [0,2,4,6,7,9,11],
  dorico:   [0,2,3,5,7,9,10],
  eolio:    [0,2,3,5,7,8,10],
  frigio:   [0,1,3,5,7,8,10],
  menorHarm:[0,2,3,5,7,8,11],
};
/* nota da escala pelo grau, com as oitavas passando sozinhas: grau 7 é a
   tônica uma oitava acima, e grau -1 é a sétima abaixo */
function grau(raiz, modo, g){
  const e = MODOS[modo];
  const oit = Math.floor(g / e.length);
  const i = ((g % e.length) + e.length) % e.length;
  return raiz + e[i] + 12 * oit;
}

/* ---------- os seis climas ----------
   `raiz` é o MIDI da tônica; o resto é o retrato do mundo em cinco números. */
const MUNDOS = [
  { id:0, nome:'raiz',    raiz:57, modo:'maior',  bpm:96,  onda:'triangle',
    pad:'sine',     acordes:[0,5,3,4], densidade:0.55, brilho:2200 },
  { id:1, nome:'lodo',    raiz:55, modo:'dorico', bpm:100, onda:'triangle',
    pad:'sine',     acordes:[0,3,4,3], densidade:0.6,  brilho:1700 },
  { id:2, nome:'vidro',   raiz:60, modo:'lidio',  bpm:108, onda:'sine',
    pad:'triangle', acordes:[0,4,5,4], densidade:0.62, brilho:2800 },
  { id:3, nome:'ferro',   raiz:53, modo:'eolio',  bpm:112, onda:'square',
    pad:'sawtooth', acordes:[0,6,5,4], densidade:0.66, brilho:1500 },
  { id:4, nome:'cinza',   raiz:51, modo:'frigio', bpm:118, onda:'sawtooth',
    pad:'triangle', acordes:[0,1,5,4], densidade:0.7,  brilho:1300 },
  { id:5, nome:'nada',    raiz:49, modo:'frigio', bpm:126, onda:'sawtooth',
    pad:'sawtooth', acordes:[0,1,6,5], densidade:0.74, brilho:1100 },
];
/* o menu não é um mundo: é o de fora, e tem de soar como espera */
const MENU = { id:'menu', raiz:57, modo:'eolio', bpm:72, onda:'sine',
               pad:'sine', acordes:[0,5,3,4], densidade:0.34, brilho:1500 };

/* ---------- o TEMA: sorteado uma vez, tocado sempre ----------
   32 passos de colcheia = 4 compassos. Cada passo é um grau da escala ou uma
   pausa, e a melodia anda por GRAUS VIZINHOS na maior parte do tempo — saltar
   ao acaso é o que faz música gerada soar como discagem de telefone. */
function comporTema(clima){
  const r = makeRNG('mnemonic|tema|' + clima.id);
  const notas = [];
  let g = 0;
  for(let i = 0; i < 32; i++){
    const forte = i % 8 === 0;               // cabeça de compasso
    const cala = !forte && r.chance(1 - clima.densidade);
    if(cala){ notas.push(null); continue; }
    /* passo de segunda quase sempre, terça às vezes, salto raro e só na
       cabeça — é a regra de condução de voz mais velha que existe, e é a que
       separa melodia de sequência */
    const salto = forte && r.chance(0.28) ? r.pick([-4,-3,3,4])
                : r.chance(0.24) ? r.pick([-2,2]) : r.pick([-1,-1,1,1,0]);
    g = Math.max(-3, Math.min(9, g + salto));
    if(forte && Math.abs(g % 7) > 5) g = 0;   // volta para casa no compasso
    notas.push(g);
  }
  notas[0] = 0;                               // o tema começa na tônica
  return notas;
}
const TEMAS = new Map();
export const tema = clima => {
  if(!TEMAS.has(clima.id)) TEMAS.set(clima.id, comporTema(clima));
  return TEMAS.get(clima.id);
};
/* abertos para o teste: a parte da música que dá para provar sem tocar nada é
   a composição, e é justamente a parte que pode sair errada em silêncio */
export const CLIMAS = MUNDOS;
export const CLIMA_MENU = MENU;
export { grau, MODOS };

/* ---------- o barramento ---------- */
let bus = null, filtro = null, quer = true, atual = null;
let relogio = null, proximo = 0, passo = 0, clima = null, chefe = false;
let abaixado = 0;

function montar(){
  const c = contexto(); if(!c) return null;
  if(bus) return c;
  filtro = c.createBiquadFilter(); filtro.type = 'lowpass';
  filtro.frequency.value = 2000; filtro.Q.value = 0.4;
  bus = c.createGain(); bus.gain.value = 0;
  /* um compressor manso: a trilha soma pad, baixo e melodia, e sem ele os
     três batendo no mesmo passo estouram o alto-falante do celular */
  const comp = c.createDynamicsCompressor();
  comp.threshold.value = -22; comp.ratio.value = 4; comp.attack.value = 0.006;
  filtro.connect(bus).connect(comp).connect(c.destination);
  return c;
}

/* ---------- as vozes ---------- */
function voz(c, { f, t0, dur, tipo='sine', v=0.1, corte=0, desafina=0 }){
  const o = c.createOscillator(), g = c.createGain();
  o.type = tipo; o.frequency.setValueAtTime(f, t0);
  if(desafina) o.detune.setValueAtTime(desafina, t0);
  /* envelope com ataque de verdade: nota que começa em degrau ESTALA, e o
     estalo é o que faz som sintetizado soar barato */
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(v, t0 + Math.min(0.08, dur * 0.3));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  let saida = g;
  if(corte){
    const f2 = c.createBiquadFilter(); f2.type = 'lowpass';
    f2.frequency.setValueAtTime(corte, t0);
    f2.frequency.exponentialRampToValueAtTime(Math.max(200, corte * 0.45), t0 + dur);
    g.connect(f2); saida = f2;
  }
  o.connect(g); saida.connect(filtro);
  o.start(t0); o.stop(t0 + dur + 0.03);
}
function chiado(c, { t0, dur=0.06, v=0.05, corte=6000 }){
  const n = Math.max(1, Math.floor(c.sampleRate * dur));
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for(let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = c.createBufferSource(); s.buffer = buf;
  const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = corte;
  const g = c.createGain(); g.gain.value = v;
  s.connect(f).connect(g).connect(filtro);
  s.start(t0);
}

/* ---------- o compasso ---------- */
function tocarPasso(c, i, t0){
  const k = i % 32;
  const compasso = Math.floor(k / 8);
  const acorde = clima.acordes[compasso % clima.acordes.length];
  const modo = chefe ? 'menorHarm' : clima.modo;
  const raiz = clima.raiz - (chefe ? 12 : 0);
  const nota = g => hz(grau(raiz, modo, g + acorde));

  /* BAIXO — cabeça e contratempo. É ele que segura o andamento, então nunca
     cala: sem baixo, o ouvido perde onde está e a trilha vira ambiente. */
  if(k % 4 === 0)
    voz(c, { f: nota(-7), t0, dur:0.5, tipo: chefe ? 'sawtooth' : 'triangle',
             v:0.13, corte: clima.brilho * 0.4 });
  else if(k % 4 === 2 && (chefe || compasso % 2))
    voz(c, { f: nota(-7), t0, dur:0.2, tipo:'triangle', v:0.07,
             corte: clima.brilho * 0.35 });

  /* PAD — a tríade do acorde, um sopro por compasso, bem atrás de tudo */
  if(k % 8 === 0)
    for(const g of [0, 2, 4])
      voz(c, { f: nota(g), t0, dur: 1.9, tipo: clima.pad, v:0.035,
               corte: clima.brilho, desafina: g * 4 });

  /* TEMA — a melodia composta na carga */
  const m = tema(chefe ? { ...clima, id: clima.id + '|chefe' } : clima)[k];
  if(m != null)
    voz(c, { f: nota(m + 7), t0, dur: 0.34, tipo: clima.onda, v:0.075,
             corte: clima.brilho * 1.4 });

  /* PERCUSSÃO — um chiado curto no contratempo, e no chefe também na cabeça */
  if(k % 4 === 2) chiado(c, { t0, v:0.035 });
  if(chefe && k % 8 === 0) chiado(c, { t0, dur:0.12, v:0.05, corte:2200 });
}

let agendadas = 0;
function girar(){
  const c = contexto(); if(!c || !clima) return;
  const dur = 60 / clima.bpm / 2;              // um passo é uma colcheia
  while(proximo < c.currentTime + 0.15){
    if(proximo < c.currentTime) proximo = c.currentTime + 0.02;
    tocarPasso(c, passo, proximo);
    passo++; proximo += dur; agendadas++;
  }
}
/* o que a tela de diagnóstico e o teste precisam saber: se a trilha está de
   fato TOCANDO. Sem isto, "não sai som" é indistinguível de "o navegador
   bloqueou o áudio", e as duas coisas se consertam de jeitos diferentes. */
export const diagnostico = () => ({
  qual: atual, clima: clima?.id ?? null, chefe, passos: agendadas,
  quer, mudo: estaMudo(), estado: contexto()?.state ?? 'sem contexto',
  volume: bus ? Number(bus.gain.value.toFixed(3)) : 0,
});

/* ---------- o que o jogo chama ---------- */
/* `qual` é 'menu', 'mundoN' ou 'chefeN'. Trocar para a mesma coisa não faz
   nada — senão a trilha reiniciaria a cada redesenho de tela, e a melodia
   nunca passaria do primeiro compasso. */
export function trilha(qual){
  if(qual === atual) return;
  atual = qual;
  if(!qual) return parar();
  const c = montar(); if(!c) return;
  const m = /^(menu|mundo|chefe)(\d*)$/.exec(qual);
  if(!m){ atual = null; return; }
  chefe = m[1] === 'chefe';
  clima = m[1] === 'menu' ? MENU : (MUNDOS[Number(m[2]) % MUNDOS.length] || MUNDOS[0]);
  passo = 0; proximo = c.currentTime + 0.06;
  if(!relogio) relogio = setInterval(girar, 40);
  volume();
}
export function parar(){
  atual = null; clima = null;
  if(relogio){ clearInterval(relogio); relogio = null; }
  if(bus){ const c = contexto();
    bus.gain.cancelScheduledValues(c.currentTime);
    bus.gain.setTargetAtTime(0, c.currentTime, 0.15); }
}
/* ABAIXAR NA JOGADA. Enquanto as duas cartas estão abertas e o par resolve, a
   trilha recua: é o meio segundo em que o som que importa é o do acerto. */
export function abaixar(v){ abaixado = v ? 1 : 0; volume(); }
export function querMusica(v){
  quer = !!v;
  try { localStorage.setItem('mnemonic.musica', v ? '1' : '0'); } catch(e){}
  volume();
}
export const temMusica = () => quer;
function volume(){
  if(!bus) return;
  const c = contexto(); if(!c) return;
  const alvo = (!quer || estaMudo() || !clima) ? 0 : (abaixado ? 0.035 : 0.11);
  bus.gain.cancelScheduledValues(c.currentTime);
  bus.gain.setTargetAtTime(alvo, c.currentTime, 0.25);
}
/* o botão de som mexe nos dois; a música tem um botão só dela, porque num
   jogo de memória há quem queira o efeito do acerto e nada mais */
export function reavaliar(){ volume(); }

try { if(localStorage.getItem('mnemonic.musica') === '0') quer = false; } catch(e){}
