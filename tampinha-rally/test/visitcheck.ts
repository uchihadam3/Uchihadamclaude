// Valida o CONTADOR DE VISITAS: agregação por dia (aparelhos únicos + novos),
// dedup do mesmo aparelho, ordenação e o portão do dono (código errado barra;
// o código certo NÃO está no repositório — só o hash vive no jogo).
const store = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { store.set(k, v); },
  removeItem: (k: string) => { store.delete(k); },
};

import { genSk, signEvent } from '../src/net/nostr';
import { VisitLog, visitDayKey, checkOwnerCode, ownerUnlocked, unlockOwner } from '../src/net/visits';

let fails = 0;
const chk = (name: string, ok: boolean) => { console.log(`  ${ok ? 'OK ✓' : 'FALHOU ✗'} ${name}`); if (!ok) fails++; };

console.log('=== CONTADOR DE VISITAS ===');
chk('visitDayKey no formato ano-mês-dia', /^\d{4}-\d{1,2}-\d{1,2}$/.test(visitDayKey()));

const vl = new VisitLog();
const abs = (ev: any) => (vl as any).absorb(ev);
const hoje = visitDayKey();
const ontem = visitDayKey(new Date(Date.now() - 86400000));
const A = genSk(), B = genSk(), C = genSk();
const nowS = Math.floor(Date.now() / 1000);
const ping = (sk: string, day: string, neu: number, min = 0, races = 0, ts = nowS) =>
  signEvent(sk, 30078, [['d', 'tmprally-visit-' + day], ['t', 'tmprally-visits-v1']], JSON.stringify({ new: neu, min, races }), ts);
const alive = (sk: string, ts: number) => signEvent(sk, 30078, [['d', 'tmprally-alive'], ['t', 'tmprally-visits-v1']], '{}', ts);

abs(ping(A, hoje, 1, 2, 0, nowS - 300));
abs(ping(B, hoje, 0, 10, 3));
abs(ping(A, hoje, 1, 8, 2));                 // batida mais NOVA do mesmo aparelho → atualiza minutos
let t = vl.today()!;
chk('hoje: 2 aparelhos (dedup do mesmo aparelho)', t.total === 2);
chk('hoje: 1 novo', t.novos === 1);
chk('minutos somam a batida mais recente (8+10=18, média 9)', t.min === 18 && t.avg === 9);
chk('corridas somadas (2+3=5)', t.races === 5);
abs(ping(A, hoje, 1, 2, 0, nowS - 300));     // batida VELHA chegando atrasada → ignorada
chk('batida velha não volta no tempo', vl.today()!.min === 18);

abs(ping(A, ontem, 0, 30, 1));
abs(ping(C, ontem, 1, 10, 0));
const days = vl.list();
chk('2 dias na lista, mais recente primeiro', days.length === 2 && days[0].day === hoje && days[1].day === ontem);
chk('ontem: 2 aparelhos, 1 novo, média 20min', days[1].total === 2 && days[1].novos === 1 && days[1].avg === 20);
chk('aparelhos únicos no total: 3 (A contou 1× nos 2 dias)', vl.totalDevices() === 3);
chk('label bonitinho dd/mm/aaaa', /^\d{2}\/\d{2}\/\d{4}$/.test(days[0].label));

// evento fora do formato não entra
abs(signEvent(genSk(), 30078, [['d', 'tmprally-visit-hack'], ['t', 'tmprally-visits-v1']], '{}'));
chk('dia inválido é ignorado', vl.list().length === 2);

console.log('=== ONLINE AGORA ===');
abs(alive(A, nowS - 10));                    // A bateu agorinha
abs(alive(B, nowS - 60));                    // B há 1min — ainda dentro
abs(alive(C, nowS - 400));                   // C sumiu (batida velha)
chk('2 online agora (batida <150s)', vl.onlineNow() === 2);
abs(alive(C, nowS - 5));                     // C voltou!
chk('C voltou → 3 online', vl.onlineNow() === 3);
abs(alive(C, nowS - 500));                   // evento velho atrasado não derruba C
chk('batida velha não derruba quem está online', vl.onlineNow() === 3);

console.log('=== PORTÃO DO DONO ===');
chk('código errado é barrado', !checkOwnerCode('DONO-AAAA-BBBB') && !unlockOwner('123'));
chk('sem código salvo o painel fica trancado', !ownerUnlocked());
store.set('tmprally_owner', 'CHUTE-QUALQUER');
chk('flag forjada no aparelho NÃO abre (re-verifica o hash)', !ownerUnlocked());

console.log(fails === 0 ? '\n✅ VISITAS OK' : `\n❌ ${fails} falha(s)`);
if (fails) process.exit(1);
