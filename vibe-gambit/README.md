# ⚔️ Vibe Gambit — Idle RPG Tático

Idle RPG de gerenciamento de equipe com automação de combate no estilo **sistema de Gambits do Final Fantasy XII**. O jogador não comanda no combate: ele **programa a lógica** de cada herói (condição → ação) e assiste a expedição rodar sozinha.

## Filosofia de arquitetura (Vibe Coding)
Separação **rígida** entre simulação e apresentação:

- **Simulação (Data/Mecânica)** — pura, sem DOM, determinística. Roda em background (node, worker, teste).
- **View (render)** — só *lê* o estado da simulação e desenha. Nunca contém regra de jogo.

```
vibe-gambit/
├─ index.html          # View de demonstração (liga a Engine a barras de HP + combat log)
├─ package.json        # { "type":"module" } — permite rodar os módulos no node
├─ src/
│  ├─ data.js          # DEFINIÇÕES estáticas (JSON-limpo): heróis, skills, condições,
│  │                   #   inimigos, fases, forja, academia. Só dados.
│  ├─ gambits.js       # LÓGICA dos gambits: predicados de condição + execução de skill.
│  ├─ engine.js        # MOTOR DE COMBATE: constrói unidades e roda os ticks.
│  └─ state.js         # ESTADO GLOBAL do jogador + persistência LocalStorage.
└─ test/
   └─ sim.js           # Simulação headless (prova que o combate roda sem navegador).
```

## O sistema de Gambit
Um gambit é `{ condition, action }`. A cada **tick**, para cada unidade viva, a Engine varre
as linhas de **cima → baixo**; a **primeira condição verdadeira** executa sua ação e **para**
a busca daquela unidade naquele tick (idêntico ao FF XII).

- **Condições** (`data.js` = rótulos, `gambits.js` = lógica): `Inimigo: Mais Próximo`,
  `Inimigo: Menor HP`, `Aliado: HP < 50%`, `Eu: MP < 10`, etc. Cada condição é um *seletor de alvo*
  que devolve o alvo escolhido ou `null`.
- **Ações** (`SKILLS`): `Ataque Básico`, `Curar`, `Ataque Sagrado`, `Tiro Certeiro`, `Bola de Fogo`…
  data-driven (dano/cura escalam por atributo + custo de MP).

## Como rodar
**Simulação headless (motor puro):**
```bash
cd vibe-gambit
node test/sim.js
```
**View no navegador:** sirva a pasta por HTTP (ES Modules exigem http, não `file://`) e abra `index.html`.
```bash
npx serve .    # ou qualquer servidor estático
```

## Status
- [x] Camada de dados (heróis, skills, condições, inimigos, forja, academia)
- [x] Motor de combate por ticks + regra de gambit topo→baixo
- [x] Estado global persistível (LocalStorage)
- [x] View de demonstração (combate + log)
- [ ] **Gambit Board** editável (dropdowns condição/ação por herói)
- [ ] **World Map** (seleção de fase) + Party Overview
- [ ] **Forja** e **Academia de Tática** (upgrades)
- [ ] Loop idle completo (expedição → recompensas → base camp)
