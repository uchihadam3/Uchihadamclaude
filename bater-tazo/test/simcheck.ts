// A HABILIDADE IMPORTA? centro vs beirada, força fraca vs forte, pilhas 2-10
import { simulate } from '../src/sim';

const ids10 = ['tartaruga', 'arara', 'hipo', 'leao', 'jagua', 'tartaruga2', 'arara2', 'hipo2', 'leao2', 'jagua2'];
function media(n: number, ax: number, ay: number, pw: number, striker = 'leao'): number {
  // determinístico por posição — média sobre pequenas variações de mira (como um humano)
  let tot = 0, reps = 0;
  for (const jx of [-0.06, 0, 0.06]) for (const jy of [-0.06, 0, 0.06]) {
    tot += simulate(ids10.slice(0, n), ax + jx, ay + jy, pw, striker).flipped.length; reps++;
  }
  return tot / reps;
}
console.log('=== PILHA DE 6: mira × força (média de viradas) ===');
for (const pw of [0.35, 0.6, 0.85, 1.0]) {
  const centro = media(6, 0, 0, pw), meio = media(6, 0.55, 0, pw), beira = media(6, 0.95, 0, pw);
  console.log(`  força ${pw.toFixed(2)}: centro=${centro.toFixed(1)} · meio=${meio.toFixed(1)} · beirada=${beira.toFixed(1)}`);
}
console.log('\n=== TAMANHO DA PILHA (força 0.8, meio) ===');
for (const n of [2, 4, 6, 8, 10]) console.log(`  ${n} tazos → vira ${media(n, 0.55, 0, 0.8).toFixed(1)}`);
console.log('\n=== BATEDOR IMPORTA (pilha 6, beirada, força 0.8) ===');
for (const st of ['hipo', 'leao', 'arara']) console.log(`  ${st.padEnd(6)} (peso ${st === 'hipo' ? 1.25 : st === 'leao' ? 1.1 : 0.85}) → ${media(6, 0.7, 0, 0.8, st).toFixed(1)} viradas`);
