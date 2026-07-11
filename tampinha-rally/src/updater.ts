// AUTO-ATUALIZAÇÃO — o link nunca envelhece: a página é servida de uma URL com
// o commit dentro (rawcdn.githack.com/usuario/repo/<sha>/...). Ao abrir (e ao
// voltar pra aba depois de um tempo), perguntamos ao GitHub qual é o commit mais
// NOVO do branch; se for outro, trocamos o sha da URL e recarregamos — mesma
// origem, então saves/ranking/nomes continuam intactos. Se a API falhar (sem
// internet, limite), o jogo segue normal na versão atual.
const BRANCH = 'claude/rpg-roguelike-dungeon-game-49lqal';
const REPO = 'uchihadam3/Uchihadamclaude';
const SHA_RE = /\/([0-9a-f]{40})\//;
const RECHECK_MS = 30 * 60 * 1000;   // re-checa ao voltar pra aba após 30min

let lastCheck = 0;

function check(canReload: () => boolean): void {
  const m = location.href.match(SHA_RE);
  if (!m) return;                                    // fora do CDN (dev/local): nada a fazer
  const cur = m[1];
  lastCheck = Date.now();
  fetch(`https://api.github.com/repos/${REPO}/commits/${encodeURIComponent(BRANCH)}`, { headers: { Accept: 'application/vnd.github+json' } })
    .then(r => (r.ok ? r.json() : null))
    .then(j => {
      const latest = j && typeof j.sha === 'string' && /^[0-9a-f]{40}$/.test(j.sha) ? j.sha : null;
      if (latest && latest !== cur && canReload()) location.replace(location.href.replace(cur, latest));
    })
    .catch(() => {});
}

export function watchUpdates(canReload: () => boolean): void {
  check(canReload);
  // voltou pra aba dias depois? confere de novo (sem puxar o tapete no meio da corrida)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Date.now() - lastCheck > RECHECK_MS) check(canReload);
  });
}
