# Dados do Abismo — Arquitetura

Roguelike tático de dados. Motor puro em JS (ES modules), sem build.

## Camadas (desacopladas, §0.2)
```
js/rng.js                RNG semeado — determinismo total (mesma seed = mesmo resultado)
js/data/                 CONTEÚDO (sem lógica): faces, dados, classes, relíquias, masmorras
js/engine/requirements.js Validador de encaixes (8 tipos) + resolução de Curinga
js/engine/combat.js       Motor de combate PURO (sem UI, sem three.js)
js/engine/encounter.js    Montagem de ondas + escalada/Fardos por masmorra
js/engine/rewards.js      Recompensas 1-de-3, forja de faces, relíquias
js/engine/ai.js           Piloto automático (só para o simulador)
test/sim.mjs              Simulador headless de balanceamento
```

## Rodar o simulador
```bash
node test/sim.mjs [runs_por_classe] [masmorra_final]
node test/sim.mjs 200 10     # 200 runs por classe, até a Masmorra 10
```
Saída: taxa de vitória, andares médios e o andar onde cada classe mais morre.

## Adicionar conteúdo novo
- **Inimigo:** um objeto em `js/data/dungeons.js` com `{id,nome,hp,padrao:[...]}`.
  `padrao` é a fila de intenções telegrafadas: `A(v)` ataque, `B(v)` bloqueio,
  `M(v,n)` multi-golpe, `H(v)` cura, `D(st,v)` debuff, `C()` maldição.
- **Habilidade:** um objeto em `js/data/classes.js` com `req` (requisito de encaixe) e
  `eff` (lista de operações). Nenhum código novo é necessário.
- **Relíquia:** uma linha em `js/data/relics.js` — `mods` (números), `start`, `onKill` ou `flag`.
- **Face de dado:** `js/data/faces.js`.

## Determinismo
Todo combate roda sobre o RNG semeado. A física dos dados 3D será *cosmética*: o motor
sorteia o resultado e a animação é forçada a pousar nele (§11.2).

## Testes

    node test/habilidades.mjs   # audita TODAS as habilidades (150 checagens)
    node test/sim.mjs 30 10 0   # balanço: runs/classe, masmorras, nível do Cofre
