/* ========================================================================
   O RANKING — mundial, sem servidor nenhum.

   Como funciona: relays Nostr públicos (NIP-01) guardam eventos assinados de
   qualquer pessoa, de graça e para sempre. Publicamos cada placar como
   evento substituível (kind 30078, NIP-78) e qualquer aparelho baixa o
   quadro inteiro quando quiser. Mesmo transporte do Tampinha Rally.

   E AQUI ESTÁ O PROBLEMA QUE ISSO CRIA, dito com todas as letras: relay
   público aceita QUALQUER coisa que alguém assine. Assinar prova que a
   mesma chave escreveu duas linhas; não prova que o placar é verdade. Se o
   ranking confiasse na assinatura, o primeiro sujeito que abrisse o console
   publicaria um bilhão de pontos.

   A defesa não está aqui neste arquivo — está no formato do que sobe. Cada
   placar viaja com a LISTA INTEIRA DAS JOGADAS, e quem lê o ranking chama
   `verificar()`, refaz a run a partir da semente e confere o número. Este
   módulo só carrega o pacote de um lado para o outro; quem julga é o motor,
   no aparelho de quem está lendo.

   É por isso que não existe "servidor de validação": a validação é o próprio
   jogo rodando de novo, na casa de cada jogador.
   ===================================================================== */
import { schnorr, sha256, bytesToHex, hexToBytes, randomBytes }
  from '../../vendor/nostr-crypto.js';

export const RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band',
  'wss://relay.primal.net',
  'wss://nostr.mom',
];
export function relays(){
  try { const r = JSON.parse(localStorage.getItem('mnemonic.relays')||'null');
        if(Array.isArray(r) && r.length) return r; } catch(e){}
  return RELAYS;
}

const KIND = 30078;                 // NIP-78: dado de aplicação, substituível
const ETIQUETA = 'mnemonic-placar-v1';

/* ---------- identidade ----------
   A chave é do APARELHO e mora no localStorage. Ela não protege o placar
   (nada protege, num relay aberto): ela serve para o mesmo jogador poder
   REESCREVER a própria linha em vez de acumular uma por partida. */
export function chave(){
  let sk = localStorage.getItem('mnemonic.sk');
  if(!sk || !/^[0-9a-f]{64}$/.test(sk)){
    sk = bytesToHex(randomBytes(32));
    localStorage.setItem('mnemonic.sk', sk);
  }
  return sk;
}
export const pubDe = sk => bytesToHex(schnorr.getPublicKey(hexToBytes(sk)));

function assinar(sk, kind, tags, content, created_at = Math.floor(Date.now()/1000)){
  const pubkey = pubDe(sk);
  const ser = JSON.stringify([0, pubkey, created_at, kind, tags, content]);
  const id = bytesToHex(sha256(new TextEncoder().encode(ser)));
  const sig = bytesToHex(schnorr.sign(hexToBytes(id), hexToBytes(sk)));
  return { id, pubkey, created_at, kind, tags, content, sig };
}
export function conferirAssinatura(ev){
  try {
    const ser = JSON.stringify([0, ev.pubkey, ev.created_at, ev.kind, ev.tags, ev.content]);
    if(bytesToHex(sha256(new TextEncoder().encode(ser))) !== ev.id) return false;
    return schnorr.verify(hexToBytes(ev.sig), hexToBytes(ev.id), hexToBytes(ev.pubkey));
  } catch(e){ return false; }
}

/* ---------- semanas e meses, para as abas ---------- */
const DIA = 86400000;
export function janela(aba){
  const agora = Date.now();
  if(aba==='semana') return Math.floor((agora - 7*DIA)/1000);
  if(aba==='mes')    return Math.floor((agora - 30*DIA)/1000);
  return 0;
}

/* ---------- publicar ----------
   `d` é a chave do evento substituível. Uma linha por aparelho no quadro
   geral e uma por dia no diário: assim a run diária de ontem não some
   quando você joga a de hoje. */
export async function publicar(pacote, nome){
  const sk = chave();
  const p = pacote.placar;
  const d = p.diario ? ETIQUETA+':d:'+p.semente : ETIQUETA;
  const corpo = JSON.stringify({
    nome: String(nome||'anônimo').slice(0,22),
    placar: p, registro: pacote.registro,
  });
  const tags = [
    ['d', d],
    ['t', ETIQUETA],
    ['t', p.diario ? 'mn-diario' : 'mn-livre'],
    ['classe', p.classe],
    ['pontos', String(p.pontos)],
  ];
  const ev = assinar(sk, KIND, tags, corpo);
  const n = await enviar(ev);
  return { ok:n>0, relays:n, id:ev.id };
}

function enviar(ev){
  const urls = relays();
  return new Promise(resolve=>{
    let ok = 0, fechados = 0;
    const fim = ()=>{ if(++fechados >= urls.length) resolve(ok); };
    const prazo = setTimeout(()=>resolve(ok), 6000);
    for(const u of urls){
      let ws;
      try { ws = new WebSocket(u); } catch(e){ fim(); continue; }
      const t = setTimeout(()=>{ try{ws.close();}catch(e){} }, 5500);
      ws.onopen = ()=>{ try { ws.send(JSON.stringify(['EVENT', ev])); } catch(e){} };
      ws.onmessage = m=>{
        try {
          const d = JSON.parse(m.data);
          if(d[0]==='OK' && d[1]===ev.id){ if(d[2]) ok++; clearTimeout(t); ws.close(); }
        } catch(e){}
      };
      ws.onerror = ()=>{ clearTimeout(t); try{ws.close();}catch(e){} };
      ws.onclose = ()=>{ clearTimeout(t); fim();
        if(fechados>=urls.length) clearTimeout(prazo); };
    }
  });
}

/* ---------- buscar ----------
   Devolve as linhas CRUAS. Quem chama é que roda `verificar()` — este
   módulo não tem opinião sobre quem é honesto, de propósito: assim é
   impossível o transporte "esquecer" de conferir. */
export async function buscar({ aba='mundial', semente=null, limite=300 } = {}){
  const filtro = { kinds:[KIND], '#t':[ETIQUETA], limit:limite };
  const desde = janela(aba);
  if(desde) filtro.since = desde;

  const eventos = await coletar(filtro);
  const porChave = new Map();          // uma linha por pubkey+d, a mais nova
  for(const ev of eventos){
    if(!conferirAssinatura(ev)) continue;
    let c; try { c = JSON.parse(ev.content); } catch(e){ continue; }
    if(!c?.placar || !Array.isArray(c?.registro)) continue;
    if(aba==='diario'){
      if(!c.placar.diario) continue;
      if(semente && c.placar.semente !== semente) continue;
    } else if(aba!=='diario' && c.placar.diario && aba==='mundial'){
      /* run diária também conta no quadro geral */
    }
    const d = (ev.tags.find(t=>t[0]==='d')||[])[1] || '';
    const k = ev.pubkey+'|'+d;
    const velho = porChave.get(k);
    if(!velho || velho.ev.created_at < ev.created_at)
      porChave.set(k, { ev, nome:String(c.nome||'anônimo').slice(0,22),
                        placar:c.placar, registro:c.registro });
  }
  let linhas = [...porChave.values()];
  if(aba==='classe'){
    /* melhor de cada classe: o quadro fica útil para quem quer comparar
       build, e não só para quem quer ver o topo */
    const porClasse = new Map();
    for(const l of linhas){
      const c = l.placar.classe;
      if(!porClasse.has(c) || porClasse.get(c).placar.pontos < l.placar.pontos)
        porClasse.set(c, l);
    }
    linhas = [...porClasse.values()];
  }
  return linhas;
}

function coletar(filtro){
  const urls = relays();
  return new Promise(resolve=>{
    const vistos = new Map();
    let fechados = 0;
    const acabar = ()=>resolve([...vistos.values()]);
    const prazo = setTimeout(acabar, 7000);
    const fim = ()=>{ if(++fechados >= urls.length){ clearTimeout(prazo); acabar(); } };
    for(const u of urls){
      let ws;
      try { ws = new WebSocket(u); } catch(e){ fim(); continue; }
      const t = setTimeout(()=>{ try{ws.close();}catch(e){} }, 6500);
      ws.onopen = ()=>{ try { ws.send(JSON.stringify(['REQ','mn',filtro])); } catch(e){} };
      ws.onmessage = m=>{
        try {
          const d = JSON.parse(m.data);
          if(d[0]==='EVENT' && d[2]?.id) vistos.set(d[2].id, d[2]);
          if(d[0]==='EOSE'){ clearTimeout(t); ws.close(); }
        } catch(e){}
      };
      ws.onerror = ()=>{ clearTimeout(t); try{ws.close();}catch(e){} };
      ws.onclose = ()=>{ clearTimeout(t); fim(); };
    }
  });
}
