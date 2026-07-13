// TRANSFERÊNCIA DE CONTA — o progresso INTEIRO vira um código de texto:
// o save principal (campanha, ranqueadas, coleção, carreira das tampinhas,
// pistas do editor, recordes), a CHAVE de identidade do ranking mundial e o
// idioma. Colar o código no outro aparelho recria a conta inteirinha.
// Formato: TMPR1.<base64(json)>.<checksum> — o checksum pega código cortado.
const KEYS = ['tampinha_rally_v1', 'tmprally_nsec', 'tmprally_lang'];

function sum(s: string): string { let h = 5381; for (let i = 0; i < s.length; i++) h = (Math.imul(h, 33) ^ s.charCodeAt(i)) >>> 0; return h.toString(36); }

export function exportAccount(): string {
  const o: Record<string, string> = {};
  for (const k of KEYS) { const v = localStorage.getItem(k); if (v != null) o[k] = v; }
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(o))));   // utf-8 seguro
  return `TMPR1.${b64}.${sum(b64)}`;
}

export function importAccount(code: string): { ok: boolean; err?: 'formato' | 'checksum' | 'conteudo' } {
  const m = /^\s*TMPR1\.([A-Za-z0-9+/=]+)\.([a-z0-9]+)\s*$/.exec(code || '');
  if (!m) return { ok: false, err: 'formato' };
  if (sum(m[1]) !== m[2]) return { ok: false, err: 'checksum' };      // código incompleto/cortado
  try {
    const o = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
    if (!o || typeof o !== 'object' || !o['tampinha_rally_v1']) return { ok: false, err: 'conteudo' };
    JSON.parse(o['tampinha_rally_v1']);                               // valida que é um save de verdade
    for (const k of KEYS) if (o[k] != null) localStorage.setItem(k, String(o[k]));
    return { ok: true };
  } catch { return { ok: false, err: 'conteudo' }; }
}
