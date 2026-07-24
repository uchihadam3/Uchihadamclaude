## Modo Casual Hard 🔥

Modo mais difícil que remove lendas do draft inicial, limita OVR e libera reforços em etapas ao longo da campanha.

### 1. Regras do modo

**Draft inicial (11 escolhas)**
- Sem lendas. Rotação de clubes fica só com times comuns.
- Jogadores com OVR > 80 aparecem trancados (cadeado), não selecionáveis.
- Jogadores com OVR ≤ 80 escolhidos normalmente.

**Draft #2 — após 10 jogos do Brasileirão (Season 1)**
- Interrompe a temporada com uma tela de reforço.
- 3 escolhas de jogadores de clubes comuns, cap de OVR ≤ 85.
- Cada escolha substitui um titular (mesma UI do BonusDraftPhase — clica na lenda/jogador → clica no slot).

**Draft #3 — após 20 jogos do Brasileirão (Season 1)**
- Mesma tela, 3 escolhas, sem cap de OVR (mas ainda sem lendas).

**Fim da temporada (Season 1)**
- Se classificou para Libertadores (1º-6º): draft de **3 lendas**.
- Se classificou para Sul-Americana (7º-12º): draft de **2 lendas**.
- Se ficou fora de copas: sem draft de lendas.
- Reusa BonusDraftPhase (já dá 2 lendas na Liberta e 1 na Sula em modo casual — no hard vira 3 e 2).

**Season 2+**
- Comporta-se como modo casual normal (drafts de bônus regulares).

### 2. Rank dedicado

- Nova aba **🔥 Hard** dentro do modal de Ranking (ao lado de Casual e Clássico).
- Nova aba correspondente em `/ranking`.
- Selo laranja "Hard 🔥" em SlotsScreen.

### 3. Detalhes técnicos

**Banco**
- Migration para atualizar `save_slots_mode_check` de `('casual','classico')` → `('casual','classico','hard')`.
- Atualiza `save_records_archive` também.

**Tipos**
- `SaveMode` e `GameMode` += `"hard"`.
- `SavedState` novos campos:
  - `hardStage?: 0 | 1 | 2 | 3` (0 = pré-10, 1 = pós-10, 2 = pós-20, 3 = temp1 finalizada)
  - `hardMidDraftPicks?: number` (contador restante nos drafts do meio)

**Fluxo hard-mid-draft**
- Após `setState({...phase: "matchResult"})` em SeasonPhase, se `state.mode === "hard"` e `state.season === 1` e (`state.round === 10` ou `state.round === 20`), o `MatchResultView` roteia o próximo botão pra nova phase `hardMidDraft` em vez de voltar pra season.
- Nova phase `hardMidDraft` renderiza um componente que reusa a lógica do `BonusDraftPhase` mas:
  - Pool = clubes comuns (não lendas), pesos por posição igual à lógica atual.
  - Cap por OVR conforme stage.
  - Ao terminar as 3 escolhas, volta pra `phase: "season"`.

**Draft inicial**
- Em `buildFreshState`, se mode === `"hard"`, filtra `draftTeamRotation` pra remover "lendas".
- Em `DraftPhase`, se mode === `"hard"` e hardStage === 0, cards com OVR > 80 ficam com estado "locked" (opacos, com ícone de cadeado, disabled).

**BonusDraftPhase fim de temporada**
- Se `mode === "hard"` e `season === 1`:
  - Liberta: `bonusRemaining = 3` (em vez de 2).
  - Sula: `bonusRemaining = 2` (em vez de 1).
- A partir da season 2, valores voltam ao normal.

**UI Menu**
- ModePickScreen ganha 3º botão "🔥 Casual Hard" com descrição.

### 4. Arquivos alterados

- `src/lib/saves.ts` — `SaveMode` += `"hard"`, `extractMode` reconhece.
- `src/routes/index.tsx` — tipos, buildFreshState, ModePickScreen, DraftPhase (lock), BonusDraftPhase (3/2 lendas), SeasonPhase (trigger mid-drafts), novo `HardMidDraftPhase`, novo case de phase.
- `src/routes/ranking.tsx` — aba Hard.
- `src/components/SlotsScreen.tsx` — badge laranja.
- Migration Supabase — CHECK constraint atualizado.

### 5. Fora do escopo

- Balanceamento de dificuldade (OVR adversário) — hard usa a mesma engine que casual.
- Efeitos de coach — funcionam igual (skips extras, bônus etc.).
- Ranking hard não separa por modo além da aba; reusa `get_public_ranking` filtrando por `p_mode`.
