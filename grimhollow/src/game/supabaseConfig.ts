// ============================================================================
// CONFIG DO SUPABASE — cole aqui a URL e a ANON KEY do seu projeto.
//   Painel do Supabase → Project Settings → API:
//     • Project URL  → SUPABASE_URL
//     • anon public  → SUPABASE_ANON_KEY   (essa chave é PÚBLICA/segura de expor
//                                           com as regras RLS; NÃO use a service_role)
//   Enquanto ficarem vazias, o login social entra em modo "em breve" e o jogo usa
//   o save LOCAL (Convidado). Basta preencher e dar deploy que Google/Discord ligam.
// ============================================================================
// URL BASE do projeto (sem /rest/v1/ — o client adiciona os caminhos sozinho).
export const SUPABASE_URL = "https://xldrgwrrbeoninfqctys.supabase.co";
// anon/public key (JWT) — pública por design; a segurança vem da RLS.
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZHJnd3JyYmVvbmluZnFjdHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MzgzNTEsImV4cCI6MjEwMTExNDM1MX0.wTXbso583WJsD_bYRERZzKS3nJ3Vfri2W0XED3UHrao";

// provedores de login social habilitados na tela (precisam estar ativados no Supabase)
export const OAUTH_PROVIDERS = ["google", "discord"] as const;
export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export const isSupabaseConfigured = (): boolean => !!SUPABASE_URL && !!SUPABASE_ANON_KEY;
