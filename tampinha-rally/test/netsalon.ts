// Valida o SALÃO ONLINE (presença/salas/convites via eventos assinados) e as
// regras novas da sala: senha (deny), lotação pelas vagas escolhidas e o
// portão de PRONTO antes do começar. Tudo sem rede: eventos entregues na mão.
import { genSk } from '../src/net/nostr';

// stub de localStorage pro Node
const store = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { store.set(k, v); },
  removeItem: (k: string) => { store.delete(k); },
};

import { Salon } from '../src/net/salon';
import { Online } from '../src/net/online';

let fails = 0;
const chk = (name: string, ok: boolean) => { console.log(`  ${ok ? 'OK ✓' : 'FALHOU ✗'} ${name}`); if (!ok) fails++; };

// ---------- SALÃO ----------
console.log('=== SALÃO (presença · salas · convites) ===');
const salons: Salon[] = [];
function mkSalon(name: string): Salon {
  store.set('tmprally_nsec', genSk());          // chave própria pra cada "pessoa"
  const s = new Salon();
  (s as any).myName = name;
  (s as any).pool = { publish: (ev: any) => salons.forEach(o => { if (o !== s) (o as any).absorb(ev); }), refresh() {}, stop() {} };
  salons.push(s);
  return s;
}
const ana = mkSalon('Ana');
const beto = mkSalon('Beto');
(ana as any).beat(); (beto as any).beat();       // batida de presença dos dois

chk('Ana vê Beto online', ana.usersOnline().some(u => u.pub === beto.myPub() && u.name === 'Beto'));
chk('Beto vê Ana online', beto.usersOnline().some(u => u.pub === ana.myPub() && u.name === 'Ana'));

ana.publishRoom({ code: 'ABCDE', mode: 'normal', taken: 1, slots: 4, lock: true });
const seen = beto.roomsOpen().find(r => r.pub === ana.myPub());
chk('Beto vê a sala da Ana (🔒 1/4)', !!seen && seen.code === 'ABCDE' && seen.lock && seen.taken === 1 && seen.slots === 4 && seen.host === 'Ana');

ana.publishRoom({ code: 'ABCDE', mode: 'normal', taken: 4, slots: 4, lock: true });
chk('sala LOTADA some do mural', !beto.roomsOpen().some(r => r.pub === ana.myPub()));

ana.publishRoom({ code: 'ABCDE', mode: 'champ', taken: 2, slots: 4, lock: false });
ana.closeRoom();
chk('sala FECHADA some do mural', !beto.roomsOpen().some(r => r.pub === ana.myPub()));

let convite: { from: string; code: string } | null = null;
beto.onInvite = (from, code) => { convite = { from, code }; };
(beto as any).inviteSeen = 0;                    // convite "novo" mesmo no mesmo segundo
ana.invite(beto.myPub(), 'ABCDE');
chk('convite da Ana chegou no Beto', !!convite && convite!.from === 'Ana' && convite!.code === 'ABCDE');

convite = null;
ana.invite(ana.myPub(), 'ABCDE');                // convite endereçado a OUTRA pessoa
chk('convite pra outra pessoa não toca no Beto', convite === null);

// ---------- SALA: senha · lotação · PRONTO ----------
console.log('=== SALA (senha · vagas · PRONTO) ===');
function fake(id: string): any { return { peer: { id }, onData: () => {}, onOpen: () => {}, onJoin: () => {}, onLeave: () => {}, onError: () => {}, send() {}, broadcast() {}, relay() {}, count: () => 1, destroy() {} }; }

const host = new Online();
const hostNet = fake('host');
const sent: { to: string; msg: any }[] = [];
hostNet.send = (to: string, msg: any) => sent.push({ to, msg });
Object.assign(host, { isHost: true, myId: 'host', myName: 'Host', mySkin: 'coca', humans: [{ owner: 'host', name: 'Host', skin: 'coca', ready: true }], total: 3, pass: 's3nha', inRoom: true, net: hostNet, code: 'TEST1' });

(host as any).hostData('g1', { t: 'hello', name: 'G1', skin: 'pepsi', pass: 'errada' });
chk('senha ERRADA → deny (e não entra)', sent.some(s => s.to === 'g1' && s.msg.t === 'deny') && host.humans.length === 1);

(host as any).hostData('g1', { t: 'hello', name: 'G1', skin: 'pepsi', pass: 's3nha' });
chk('senha CERTA → entra', host.humans.length === 2 && host.humans[1].owner === 'g1');

let startSent = false; hostNet.broadcast = (m: any) => { if (m.t === 'start') startSent = true; };
let lastErr = ''; host.onError = (m) => { lastErr = m; };
host.startMatch();
chk('começar SEM todo mundo pronto → barrado', !startSent && lastErr.includes('PRONTO'));

(host as any).hostData('g1', { t: 'ready', v: true });
chk('allReady() com todos prontos', host.allReady());
host.startMatch();
chk('começar com todos PRONTOS → partida inicia', startSent);

// lotação: sala de 3 → host + g1 + g2 cabe; g3 leva "full"
(host as any).active = false; sent.length = 0;
(host as any).hostData('g2', { t: 'hello', name: 'G2', skin: 'fanta', pass: 's3nha' });
(host as any).hostData('g3', { t: 'hello', name: 'G3', skin: 'sukita', pass: 's3nha' });
chk('sala de 3 lota com 3 humanos → 4º leva "full"', host.humans.length === 3 && sent.some(s => s.to === 'g3' && s.msg.t === 'full'));

const info = host.roomInfo();
chk('roomInfo (code/taken/slots/lock)', info.code === 'TEST1' && info.taken === 3 && info.slots === 3 && info.lock === true);

// cliente: deny → erro amigável + fechou
const guest = new Online();
const guestNet = fake('gX');
let gErr = ''; let gClosed = false;
guest.onError = (m) => { gErr = m; }; guest.onClosed = () => { gClosed = true; };
Object.assign(guest, { isHost: false, myId: 'gX', inRoom: true, net: guestNet });
(guest as any).clientData({ t: 'deny' });
chk('cliente recebe deny → "Senha errada" + sala fecha', gErr.includes('Senha errada') && gClosed);

// ---------- IA SÓ NA MÃO (nada de preenchimento automático) ----------
console.log('=== IA SÓ NA MÃO (vagas ficam livres) ===');
const h2 = new Online();
const h2net = fake('host'); const sent2: { to: string; msg: any }[] = [];
h2net.send = (to: string, msg: any) => sent2.push({ to, msg });
Object.assign(h2, { isHost: true, myId: 'host', myName: 'H', mySkin: 'coca', humans: [{ owner: 'host', name: 'H', skin: 'coca', ready: true }], total: 4, inRoom: true, net: h2net, code: 'TEST2' });
(h2 as any).rebuild();
chk('sala nova SEM IA automática (só o anfitrião, 3 vagas livres)', h2.seats.length === 1 && h2.seats.every(s => s.kind === 'human') && h2.total === 4);

let err2 = ''; h2.onError = (m) => { err2 = m; };
let started2 = false; h2net.broadcast = (m: any) => { if (m.t === 'start') started2 = true; };
h2.startMatch();
chk('sozinho não começa (sala vazia)', !started2 && err2.includes('Sala vazia'));

h2.addAI();
chk('➕🤖 adiciona 1 IA (1 humano + 1 🤖)', h2.seats.length === 2 && h2.seats[1].kind === 'ai');
h2.addAI(); h2.addAI(); h2.addAI();
chk('IA respeita as vagas (máx 4)', h2.seats.length === 4 && h2.occupied() === 4);

(h2 as any).hostData('gz', { t: 'hello', name: 'GZ', skin: 'pepsi' });
chk('sala lotada (com IA) recusa humano com "full"', sent2.some(s => s.to === 'gz' && s.msg.t === 'full') && h2.humans.length === 1);
h2.removeAI();
chk('✕ tira uma IA e abre a vaga', h2.occupied() === 3);
(h2 as any).hostData('gz', { t: 'hello', name: 'GZ', skin: 'pepsi' });
chk('humano entra na vaga aberta', h2.humans.length === 2 && h2.occupied() === 4);

// dupla exige sala completa (aqui: 2 humanos + 2 IA = 4)
(h2 as any).hostData('gz', { t: 'ready', v: true });
h2.setRoom('dupla', 2);
h2.removeAI();                                     // 3 de 4 → incompleta
err2 = ''; started2 = false;
h2.startMatch();
chk('dupla com vaga aberta → barrada', !started2 && err2.includes('Dupla'));
h2.addAI();
h2.startMatch();
chk('dupla com sala completa → começa', started2);

console.log(fails === 0 ? '\n✅ SALÃO/SALA OK' : `\n❌ ${fails} falha(s)`);
if (fails) process.exit(1);
