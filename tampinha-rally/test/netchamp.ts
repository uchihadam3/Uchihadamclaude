// Valida o CAMPEONATO e a DUPLA online (sem rede): dois controladores ligados
// em memória. O anfitrião orquestra várias corridas (soma de pontos) e no fim
// coroa o campeão; host e guest têm de ver a mesma classificação. Também checa
// que a Dupla atribui times iguais nos dois lados.
import { Online } from '../src/net/online';
import { GameManager } from '../src/game/manager';
import { track } from '../src/game/generator';
import { aiFlick } from '../src/game/ai';

function fake(id: string): any { return { peer: { id }, onData: () => {}, onOpen: () => {}, onJoin: () => {}, onLeave: () => {}, onError: () => {}, send() {}, broadcast() {}, relay() {}, count: () => 1, destroy() {} }; }

function wire() {
  const host = new Online(); const guest = new Online();
  const hostMgr = new GameManager(); const guestMgr = new GameManager();
  const hostNet = fake('host'); const guestNet = fake('guest1');
  hostNet.onData = (from: string, m: any) => (host as any).hostData(from, m);
  guestNet.onData = (_f: string, m: any) => (guest as any).clientData(m);
  hostNet.broadcast = (m: any) => guestNet.onData('host', m);
  hostNet.send = (to: string, m: any) => { if (to === 'guest1') guestNet.onData('host', m); };
  hostNet.relay = (origin: string, m: any) => { if (origin !== 'guest1') guestNet.onData('host', m); };
  guestNet.send = (to: string, m: any) => { if (to === 'host') hostNet.onData('guest1', m); };
  const startLocal = (mgr: GameManager, o: Online, players: any[], level: number, idx: number) => { mgr.setup(track(level, idx), players); mgr.manualControl = true; o.bind(mgr); };
  host.onStartMatch = (p, l, i) => startLocal(hostMgr, host, p, l, i);
  guest.onStartMatch = (p, l, i) => startLocal(guestMgr, guest, p, l, i);
  Object.assign(host, { isHost: true, myId: 'host', myName: 'Host', mySkin: 'coca', humans: [{ owner: 'host', name: 'Host', skin: 'coca' }], total: 4, inRoom: true, net: hostNet, code: 'TEST1' });
  Object.assign(guest, { isHost: false, myId: 'guest1', myName: 'Guest', mySkin: 'pepsi', inRoom: true, net: guestNet });
  host.cfg = { level: 1, trackIdx: 2, pick: 'specific', roomMode: 'normal', teamSize: 2, champRaces: 3 };
  (host as any).hostData('guest1', { t: 'hello', name: 'Guest', skin: 'pepsi' });
  (host as any).hostData('guest1', { t: 'ready', v: true });
  return { host, guest, hostMgr, guestMgr };
}

const acted = new Map<string, string>();
function driveHuman(o: Online, mgr: GameManager) {
  if (mgr.phase !== 'aim' || !o.controlsActiveSeat()) return;
  const tok = String(mgr.flickCount); const key = (o.isHost ? 'h' : 'g') + '#' + mgr.turnNo + '#' + tok;
  if (acted.get(o.isHost ? 'h' : 'g') === key) return; acted.set(o.isHost ? 'h' : 'g', key);
  const c = mgr.caps[mgr.current]; const f = aiFlick(c, mgr.caps, mgr.track); o.localFlick(f.dir, f.power);
}
function runRace(host: Online, guest: Online, hostMgr: GameManager, guestMgr: GameManager): boolean {
  const dt = 1 / 30; let steps = 0;
  while (steps < 120000 && !(hostMgr.phase === 'over' && guestMgr.phase === 'over')) {
    host.tick(dt); guest.tick(dt); driveHuman(host, hostMgr); driveHuman(guest, guestMgr); hostMgr.update(dt); guestMgr.update(dt); steps++;
  }
  return hostMgr.phase === 'over' && guestMgr.phase === 'over';
}

// ---------- CAMPEONATO ----------
console.log('=== CAMPEONATO ONLINE (3 corridas) ===');
{
  const { host, guest, hostMgr, guestMgr } = wire();
  host.setRoom('champ', 2, 3);
  let guestStandings = 0; guest.onChampStanding = () => guestStandings++;
  let hostStandings = 0; host.onChampStanding = () => hostStandings++;
  let champWinner: any = null; let guestSawEnd: any = null;
  host.onChampEnd = (w) => { champWinner = w; }; guest.onChampEnd = (w) => { guestSawEnd = w; };
  host.startMatch();
  let races = 0; let ok = true;
  while (!champWinner && races < 8) {
    if (!runRace(host, guest, hostMgr, guestMgr)) { ok = false; break; }
    const hs = hostMgr.standings().map(c => c.id + '@' + c.place).join(',');
    const gs = guestMgr.standings().map(c => c.id + '@' + c.place).join(',');
    if (hs !== gs) { ok = false; console.log('  DESSYNC corrida', races + 1, hs, '≠', gs); }
    host.hostFinishRace(hostMgr);
    host.hostNextChamp();
    races++;
  }
  console.log(`  corridas rodadas: ${races} · standings host/guest: ${hostStandings}/${guestStandings}`);
  console.log(`  campeão: ${champWinner?.name} · guest viu fim: ${!!guestSawEnd} (${guestSawEnd?.name})`);
  console.log('  ' + (ok && champWinner && guestSawEnd && champWinner.name === guestSawEnd.name && races === 3 ? 'OK ✓' : 'FALHOU ✗'));
}

// ---------- DUPLA ----------
console.log('\n=== DUPLA ONLINE 2×2 ===');
{
  const { host, guest, hostMgr, guestMgr } = wire();
  host.setRoom('dupla', 2);
  host.startMatch();
  const hTeams = host.seats.map(s => s.team).join(',');
  const gTeams = guest.seats.map(s => s.team).join(',');
  const mgrTeams = hostMgr.teams;
  const done = runRace(host, guest, hostMgr, guestMgr);
  const hs = hostMgr.standings().map(c => c.id + '@' + c.place).join(',');
  const gs = guestMgr.standings().map(c => c.id + '@' + c.place).join(',');
  console.log(`  seats host teams: [${hTeams}] · guest: [${gTeams}] · mgr.teams=${mgrTeams}`);
  console.log(`  corrida completa: ${done} · standings iguais: ${hs === gs}`);
  console.log('  ' + (hTeams === gTeams && mgrTeams === 2 && done && hs === gs ? 'OK ✓' : 'FALHOU ✗'));
}
console.log('\n✅ netchamp fim');
