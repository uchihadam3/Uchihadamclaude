/* ========================================================================
   UM RELAY DE MENTIRA, PARA TESTAR O RANKING DE VERDADE.
                                    node mnemonic/test/relay.mjs [porta]

   O ranking do jogo fala com relays Nostr públicos por WebSocket, e isso
   é justamente o que nenhum teste automático alcança: a máquina onde eu
   trabalho não abre `wss://`, e mesmo que abrisse, um teste que depende de
   um servidor de terceiros não é um teste — é uma aposta.

   Então aqui está o menor relay que satisfaz o cliente: aperto de mão
   WebSocket na mão (não há biblioteca de `ws` nesta máquina), EVENT
   guardado em memória, REQ devolvendo o que casa com o filtro, e EOSE
   fechando. É o suficiente para o jogo publicar um placar, outro aparelho
   ler, RECALCULAR a run e mostrar o quadro — que é a única coisa que
   precisa ser provada.

   Não guarda nada em disco e morre com o processo. É um dublê.
   ===================================================================== */
import net from 'node:net';
import crypto from 'node:crypto';

const PORTA = Number(process.argv[2] || 8129);
const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const eventos = [];              // tudo o que foi publicado, em memória

/* ---------- moldura WebSocket, no osso ---------- */
function moldar(txt){
  const dados = Buffer.from(txt, 'utf8');
  const n = dados.length;
  let cab;
  if(n < 126){ cab = Buffer.from([0x81, n]); }
  else if(n < 65536){ cab = Buffer.alloc(4); cab[0]=0x81; cab[1]=126; cab.writeUInt16BE(n,2); }
  else { cab = Buffer.alloc(10); cab[0]=0x81; cab[1]=127; cab.writeBigUInt64BE(BigInt(n),2); }
  return Buffer.concat([cab, dados]);
}
/* devolve [mensagens, sobra] — o cliente pode mandar vários quadros de uma vez */
function desmoldar(buf){
  const msgs = [];
  let i = 0;
  while(i + 2 <= buf.length){
    const op = buf[i] & 0x0f;
    const mascarado = (buf[i+1] & 0x80) !== 0;
    let n = buf[i+1] & 0x7f, j = i + 2;
    if(n === 126){ if(j+2 > buf.length) break; n = buf.readUInt16BE(j); j += 2; }
    else if(n === 127){ if(j+8 > buf.length) break; n = Number(buf.readBigUInt64BE(j)); j += 8; }
    let mask = null;
    if(mascarado){ if(j+4 > buf.length) break; mask = buf.subarray(j, j+4); j += 4; }
    if(j + n > buf.length) break;
    const corpo = Buffer.from(buf.subarray(j, j+n));
    if(mask) for(let k=0;k<corpo.length;k++) corpo[k] ^= mask[k & 3];
    if(op === 8) msgs.push({ fim:true });
    else if(op === 1) msgs.push({ txt: corpo.toString('utf8') });
    i = j + n;
  }
  return [msgs, buf.subarray(i)];
}

/* ---------- o filtro do NIP-01, na medida em que o jogo o usa ---------- */
function casa(ev, f){
  if(f.kinds && !f.kinds.includes(ev.kind)) return false;
  if(f.since && ev.created_at < f.since) return false;
  if(f.until && ev.created_at > f.until) return false;
  for(const [k, vals] of Object.entries(f)){
    if(!k.startsWith('#')) continue;
    const letra = k.slice(1);
    const meus = ev.tags.filter(t=>t[0]===letra).map(t=>t[1]);
    if(!vals.some(v=>meus.includes(v))) return false;
  }
  return true;
}

const servidor = net.createServer(sock=>{
  let apertou = false, sobra = Buffer.alloc(0);
  sock.on('data', pedaco=>{
    if(!apertou){
      const txt = pedaco.toString('utf8');
      const chave = /sec-websocket-key:\s*(.+)/i.exec(txt)?.[1]?.trim();
      if(!chave){ sock.end(); return; }
      const aceite = crypto.createHash('sha1').update(chave + GUID).digest('base64');
      sock.write('HTTP/1.1 101 Switching Protocols\r\n'
        + 'Upgrade: websocket\r\nConnection: Upgrade\r\n'
        + 'Sec-WebSocket-Accept: ' + aceite + '\r\n\r\n');
      apertou = true;
      const corte = txt.indexOf('\r\n\r\n');
      const resto = pedaco.subarray(Buffer.byteLength(txt.slice(0, corte+4)));
      if(resto.length) sobra = resto; else return;
    } else {
      sobra = Buffer.concat([sobra, pedaco]);
    }
    let msgs;
    [msgs, sobra] = desmoldar(sobra);
    for(const m of msgs){
      if(m.fim){ sock.end(); return; }
      let d; try { d = JSON.parse(m.txt); } catch(e){ continue; }
      if(d[0] === 'EVENT'){
        const ev = d[1];
        /* substituível (NIP-33): a mesma chave + mesma etiqueta `d` derruba
           a linha anterior, que é como o jogador reescreve o próprio placar */
        const dTag = (ev.tags.find(t=>t[0]==='d')||[])[1];
        const i = eventos.findIndex(x=>x.pubkey===ev.pubkey && x.kind===ev.kind
          && (x.tags.find(t=>t[0]==='d')||[])[1] === dTag);
        if(i>=0) eventos.splice(i,1);
        eventos.push(ev);
        sock.write(moldar(JSON.stringify(['OK', ev.id, true, ''])));
      } else if(d[0] === 'REQ'){
        const sub = d[1], filtros = d.slice(2);
        for(const ev of eventos)
          if(filtros.some(f=>casa(ev,f)))
            sock.write(moldar(JSON.stringify(['EVENT', sub, ev])));
        sock.write(moldar(JSON.stringify(['EOSE', sub])));
      }
    }
  });
  sock.on('error', ()=>{});
});
servidor.listen(PORTA, ()=>console.log('relay de mentira em ws://localhost:'+PORTA));
