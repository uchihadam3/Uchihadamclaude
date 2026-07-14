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
const ping = (sk: string, day: string, neu: number) => signEvent(sk, 30078, [['d', 'tmprally-visit-' + day], ['t', 'tmprally-visits-v1']], JSON.stringify({ new: neu }));

abs(ping(A, hoje, 1));
abs(ping(B, hoje, 0));
abs(ping(A, hoje, 1));                       // mesmo aparelho de novo → não conta 2×
let t = vl.today()!;
chk('hoje: 2 aparelhos (dedup do mesmo aparelho)', t.total === 2);
chk('hoje: 1 novo', t.novos === 1);

abs(ping(A, ontem, 0));
abs(ping(C, ontem, 1));
const days = vl.list();
chk('2 dias na lista, mais recente primeiro', days.length === 2 && days[0].day === hoje && days[1].day === ontem);
chk('ontem: 2 aparelhos, 1 novo', days[1].total === 2 && days[1].novos === 1);
chk('aparelhos únicos no total: 3 (A contou 1× nos 2 dias)', vl.totalDevices() === 3);
chk('label bonitinho dd/mm/aaaa', /^\d{2}\/\d{2}\/\d{4}$/.test(days[0].label));

// evento fora do formato não entra
abs(signEvent(genSk(), 30078, [['d', 'tmprally-visit-hack'], ['t', 'tmprally-visits-v1']], '{}'));
chk('dia inválido é ignorado', vl.list().length === 2);

console.log('=== PORTÃO DO DONO ===');
chk('código errado é barrado', !checkOwnerCode('DONO-AAAA-BBBB') && !unlockOwner('123'));
chk('sem código salvo o painel fica trancado', !ownerUnlocked());
store.set('tmprally_owner', 'CHUTE-QUALQUER');
chk('flag forjada no aparelho NÃO abre (re-verifica o hash)', !ownerUnlocked());

console.log(fails === 0 ? '\n✅ VISITAS OK' : `\n❌ ${fails} falha(s)`);
if (fails) process.exit(1);
