# Lendas do Brasileirão (bola-nosso-gramado)

App React 19 + TanStack Start (SSR) + Vite + Tailwind + Supabase, importado da Lovable.

## Rodar aqui (dev)
```bash
cd bola-nosso-gramado
bun install                 # usa o npm público (ver .npmrc)
bunx vite dev --host 127.0.0.1 --port 8080
# abre em http://127.0.0.1:8080/
```
Obs.: forçamos `--host 127.0.0.1` porque este ambiente não tem IPv6
(o default do Vite tentava escutar em `::` e falhava).

## Observações
- **Assets** (logo, badges) são referências à CDN da Lovable (`*.asset.json`) —
  ficam quebrados fora da infra da Lovable. Para funcionar 100% offline/aqui,
  troque por imagens locais em `src/assets/`.
- **Supabase**: login/ranking/chat/cloud-save dependem do backend Supabase
  (chaves no `.env`, não versionado). Precisa de acesso de rede ao projeto Supabase.
- **Deploy**: é um app SSR (Nitro/Cloudflare) — não dá pra servir por githack
  estático como os outros jogos. Para link público, use Cloudflare/Vercel ou a Lovable.
