# ⚔️ Idle Wars

Um jogo web **idle + base builder + PvP** pra jogar com amigos. Você constrói sua base,
gera recursos mesmo offline, treina exércitos e **ataca outros jogadores reais** — o combate
é assíncrono (o servidor simula a batalha e gera um relatório), então ninguém precisa estar
online ao mesmo tempo.

Mundo único: todo mundo que entra cai na mesma lista de jogadores. Sem código de sala.

---

## Como funciona (resumo do design)

- **Recursos:** 🪙 Ouro e 🪵 Madeira (gerados por segundo, mesmo offline), 🍖 População (teto de tropas).
- **Edifícios:** Mina, Serraria, Fazenda, Quartel (+ataque), Armazém (capacidade + cofre), Muralha (+defesa).
  O custo sobe 60% por nível → você não consegue upar tudo, tem que escolher a estratégia.
- **Tropas (pedra-papel-tesoura):** 🗡️ Infantaria › 🏹 Arqueiro › 🐎 Cavalaria › 🗡️ (+25% de dano no confronto certo).
- **Ataque:** escolhe um alvo na lista, envia um exército, o servidor simula 3 fatores
  (poder × veterania do quartel × composição de tropas × muralha do defensor) e decide o vencedor.
- **Balanceamento anti-snowball:**
  - 🛡️ **Escudo** de 8h após levar um ataque (e 30min ao entrar).
  - 📦 **Cofre** no armazém: recursos abaixo do limite não podem ser roubados.
  - **Saque limitado** a 20% do que está acima do cofre.
  - **Faixa justa:** bater em alvo muito mais fraco quase não dá loot.
  - **Cooldown** de 10min entre ataques; tropas custam recursos e morrem na batalha.

> 🔒 **Anti-trapaça:** recursos e batalhas são calculados **no servidor** (funções Postgres).
> O navegador só desenha a tela — não dá pra editar o jogo pelo console.

---

## Setup (10 minutos)

### 1. Crie um projeto Supabase (grátis)
1. Vá em [supabase.com](https://supabase.com) → **New project**.
2. Anote a senha do banco (não é usada aqui, mas guarde).
3. Espere o projeto provisionar (~2min).

### 2. Rode o schema
1. No painel do Supabase, abra **SQL Editor** → **New query**.
2. Cole **todo** o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e clique **Run**.
3. Deve aparecer "Success". Isso cria as tabelas e toda a lógica do jogo.

### 3. Habilite o login anônimo
- **Authentication → Providers → Anonymous** → ligue e salve.
  (É assim que o jogador entra só com um nickname, sem senha.)

### 4. Configure as chaves
1. **Project Settings → API**. Copie a **Project URL** e a **anon public key**.
2. Copie o arquivo `config.example.js` para **`config.js`** e cole suas chaves:
   ```js
   window.IDLE_WARS_CONFIG = {
     SUPABASE_URL: "https://xxxx.supabase.co",
     SUPABASE_ANON_KEY: "eyJ...",
   };
   ```
   > A `anon key` é **pública** por design (feita pra rodar no navegador). Pode commitar sem medo —
   > a segurança vem do RLS + funções no servidor, não de esconder a chave.

### 5. Publique
- Este projeto é HTML/CSS/JS puro. Hospede em **GitHub Pages** (a pasta já fica no repositório)
  e mande o link `.../idle-wars/` pros amigos. Cada um entra com um nickname e já aparece na lista.

Pra testar localmente:
```bash
cd idle-wars && python3 -m http.server 8080
# abra http://localhost:8080
```

---

## Ajustar o balanceamento

Todos os números vivem em dois lugares que **precisam bater**:
- **Servidor (verdade):** `supabase/schema.sql` — produção, custos, combate, escudo, saque.
- **Cliente (só display):** funções no topo de `game.js` (`gps`, `wps`, `cap`, `vault`, `costOf`).

Mexeu numa fórmula no SQL? Ajuste a mesma no `game.js` pra tela não mentir. Depois de editar o
SQL, rode o arquivo de novo no SQL Editor (ele é seguro pra re-executar).
