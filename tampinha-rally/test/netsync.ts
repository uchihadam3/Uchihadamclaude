// Valida o LOCKSTEP online sem rede: liga dois controladores Online por um
// "transporte" em memória e roda uma corrida inteira (2 humanos + 2 IA). No fim,
// os DOIS GameManagers têm de concordar (mesma classificação) — prova que todos
// veem exatamente a mesma corrida (sem lag, sem dessincronizar).
import { Online } from '../src/net/online';
import { GameManager } from '../src/game/manager';
import { track } from '../src/game/generator';
import { aiFlick } from '../src/game/ai';

function fake(id: string): any { return { peer: { id }, onData: () => {}, onOpen: () => {}, onJoin: () => {}, onLeave: () => {}, onError: () => {}, send() {}, broadcast() {}, relay() {}, count: () => 1, destroy() {} }; }

const host = new Online(); const guest = new Online();
const hostMgr = new GameManager(); const guestMgr = new GameManager();

const hostNet = fake('host'); const guestNet = fake('guest1');
hostNet.onData = (from: string, m: any) => (host as any).hostData(from, m);
guestNet.onData = (_f: string, m: any) => (guest as any).clientData(m);
hostNet.broadcast = (m: any) => guestNet.onData('host', m);
hostNet.send = (to: string, m: any) => { if (to === 'guest1') guestNet.onData('host', m); };
hostNet.relay = (origin: string, m: any) => { if (origin !== 'guest1') guestNet.onData('host', m); };
guestNet.send = (to: string, m: any) => { if (to === 'host') hostNet.onData('guest1', m); };

function startLocal(mgr: GameManager, o: Online, players: any[], level: number, idx: number) {
  mgr.setup(track(level, idx), players); mgr.manualControl = true; o.bind(mgr);
}
host.onStartMatch = (p, l, i) => startLocal(hostMgr, host, p, l, i);
guest.onStartMatch = (p, l, i) => startLocal(guestMgr, guest, p, l, i);

// estado inicial (bypassando o PeerJS): host abre, guest entra
Object.assign(host, { isHost: true, myId: 'host', myName: 'Host', mySkin: 'coca', humans: [{ owner: 'host', name: 'Host', skin: 'coca' }], total: 4, inRoom: true, net: hostNet, code: 'TEST1' });
Object.assign(guest, { isHost: false, myId: 'guest1', myName: 'Guest', mySkin: 'pepsi', inRoom: true, net: guestNet });
host.cfg = { level: +(process.env.LV||1), trackIdx: +(process.env.TK||2), pick: 'specific' };

(host as any).hostData('guest1', { t: 'hello', name: 'Guest', skin: 'pepsi' });   // guest entra → roster
(host as any).hostData('guest1', { t: 'ready', v: true });                        // guest aperta PRONTO
console.log('seats host:', host.seats.length, '| guest:', guest.seats.length);
host.startMatch();
console.log('humanos: host seat', host.mySeatIndex(), '| guest seat', guest.mySeatIndex());

// humano = joga como a IA (mesmo caminho de emitFlick/relay)
const acted = new Map<string, string>();
function driveHuman(o: Online, mgr: GameManager) {
  if (mgr.phase !== 'aim' || !o.controlsActiveSeat()) return;
  const tok = String(mgr.flickCount);
  const key = (o.isHost ? 'h' : 'g');
  if (acted.get(key) === tok) return; acted.set(key, tok);
  const c = mgr.caps[mgr.current]; const f = aiFlick(c, mgr.caps, mgr.track); o.localFlick(f.dir, f.power);
}

const dt = 1 / 30; let steps = 0;
while (steps < 120000 && !(hostMgr.phase === 'over' && guestMgr.phase === 'over')) {
  host.tick(dt); guest.tick(dt);
  driveHuman(host, hostMgr); driveHuman(guest, guestMgr);
  hostMgr.update(dt); guestMgr.update(dt);
  steps++;
  if (steps % 10000 === 0) console.log(`  @${steps} ph=${hostMgr.phase} turn=${hostMgr.turnNo} cur=${hostMgr.current} fl=${hostMgr.caps[hostMgr.current].flicksLeft} prog=${Math.max(...hostMgr.caps.map(c => c.progress)).toFixed(0)}/${hostMgr.track.total.toFixed(0)} fin=${hostMgr.finishOrder.length}`);
}
const hs = hostMgr.standings().map(c => c.id + '@' + c.place).join(',');
const gs = guestMgr.standings().map(c => c.id + '@' + c.place).join(',');
const posMatch = hostMgr.caps.every((c, i) => Math.abs(c.pos.x - guestMgr.caps[i].pos.x) < 0.01 && Math.abs(c.pos.y - guestMgr.caps[i].pos.y) < 0.01);
console.log('steps:', steps, 'host over:', hostMgr.phase === 'over', 'guest over:', guestMgr.phase === 'over');
console.log('HOST  standings:', hs);
console.log('GUEST standings:', gs);
console.log('posições idênticas:', posMatch);
const ok = hs === gs && hostMgr.phase === 'over' && guestMgr.phase === 'over' && posMatch;
console.log(ok ? '✅ LOCKSTEP OK — os dois veem a MESMA corrida' : '❌ DESSINCRONIZOU');
process.exit(ok ? 0 : 1);
