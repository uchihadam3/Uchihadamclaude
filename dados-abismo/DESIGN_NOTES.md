# DADOS DO ABISMO — Notas de Design e Decisões

> Decisões tomadas onde o documento-mestre era ambíguo (§0.5), e o estado real da construção.

## Stack escolhida
**Opção A adaptada:** JavaScript ES-modules puros + three.js (já vendorizado) — **sem etapa de build**.
Justificativa: o pipeline de entrega deste projeto é um link estático (githack), então qualquer
bundler/transpiler adicionaria fricção sem ganho. O motor de regras é ES-module puro e roda
igual no Node (testes/simulador) e no navegador — que é exatamente o requisito de §14
("motor de regras em módulo puro e testável").

## Decisões onde o doc era ambíguo
1. **Conteúdo em `.js` que exporta objetos puros, não `.json`.** O requisito real de §0.2 é
   "conteúdo editável, nunca hardcoded na lógica". Módulos de dados dão o mesmo desacoplamento
   e evitam `fetch`/asserts de import sem build. `faces.js`, `dice.js`, `classes.js`,
   `relics.js`, `dungeons.js` não contêm lógica — só dados.
2. **Efeitos como DSL de dados.** Habilidades declaram `eff:[{op:'dmg',tgt:'all',amt:'sum*2'}]`.
   O motor interpreta. Assim uma habilidade nova é uma linha de dados, não código.
3. **`Julgamento` da OráculA virou `[soma = 7]` em vez de `[=7]`.** Motivo descoberto pelo
   simulador: com `[=7]` a habilidade fica **impossível** quando a Bolsa dilui com d4/d6 (nem
   o Curinga alcança 7 num d6). `[soma = 7]` preserva a fantasia determinística e é sempre
   alcançável — e é *mais* interessante (combina dados).
4. **Busca de subconjunto para somas limitada a 4 dados.** Era exponencial (2^n) e travava com
   bolsas grandes. 4 dados cobre todos os casos reais.

## O que o simulador headless ENCONTROU (§14 funcionando)
O simulador não é enfeite — cada número abaixo veio dele e mudou o design:

- **Sem recompensas, ninguém passa da Masmorra 3-4.** Confirma o §3.3: o poder do jogador
  precisa crescer exponencialmente mais rápido que a curva. As recompensas são o jogo.
- **Exploit encontrado:** bônus plano de dano (`dmgFlat`) multiplicava **por golpe** em
  habilidades multi-hit (Mil Cortes), inflando a Lâmina-Sombra. Corrigido: bônus plano aplica
  uma vez por uso.
- **Fardo da Masmorra 5 (re-rolagem custa vida) matava a OráculA sozinha** — a IA re-rolava
  sem considerar o custo. Corrigido.
- **O pool de 26 relíquias se esgota na Masmorra 4.** Prova de que o mínimo de 90 do §9 é
  estrutural, não decorativo: sem ele a progressão simplesmente para.

## Estado atual — honesto
✅ Motor de regras puro, determinístico (RNG semeado), testado.
✅ Sistema de dados completo: 7 tipos de face, 5 tipos de dado, 5 materiais, forja/gravação.
✅ 8 tipos de requisito de encaixe, com resolução de Curinga por busca.
✅ Combate por ondas, intenções telegrafadas, 11 estados, Fardos das 10 masmorras.
✅ 4 classes com matemáticas distintas + ação universal (Respirar) + Pena de Sorte.
✅ Masmorra 1 completa (8 comuns, 3 elites, subchefe, chefe).
✅ 26 relíquias (comuns/raras/amaldiçoadas) + sistema de recompensa 1-de-3.
✅ Simulador headless de balanceamento.

⚠️ **Balanceamento NÃO fechado.** Estado: Lâmina 100% · Carrasco ~73% · OráculA ~3% ·
   Arcanista ~0%. O critério §15 (nenhuma classe > 2× outra) **não** está atendido.
   Causa principal identificada: a IA do simulador joga mal as classes de *sequência*
   (Arcanista) e de *manipulação* (OráculA) — ela é gulosa e não planeja o Círculo nem
   monta somas. O motor está correto; o piloto automático é o gargalo.

❌ Falta (o grosso do conteúdo e toda a apresentação):
   - Masmorras 2-10 (72 comuns, 27 elites, 9 subchefes, 9 chefes)
   - 64 relíquias restantes (para ≥90)
   - Camada 2D (§10) e HUD
   - **Dados 3D com física real (§11)** — o coração tátil do jogo
   - Meta-progressão / O Cofre (§4.3), Selos do Abismo (§4.4)
   - Áudio (§13), tutorial, acessibilidade (§12)

## Fase 2 — Camada de dados 3D (§11) — PARCIAL

✅ **Física de corpo rígido real** (§11.1), headless: massa, inércia, restituição, atrito,
   colisão genérica dos vértices do poliedro contra chão e paredes, colisão dado-contra-dado,
   repouso por limiar de velocidade angular, correção posicional por empurrão (nunca teleporte).
   Medido: **100% dos dados repousam** em ~125 passos (~1,04 s de física).

✅ **Resultado predeterminado por BUSCA DE SEMENTE** (§11.2, método A — o "100% natural").
   O motor sorteia a face; simulamos headless com sementes diferentes e reproduzimos a
   primeira queda física que pousa nela. Medido: **99-100% de acerto**, 3-19 ms por dado
   (uma bolsa de 7 dados custa ~66 ms). **Nada de "girar e trocar a textura no fim".**

✅ **Justiça do dado** — a rotação inicial usava amostragem enviesada; corrigido com o método
   de Shoemake. d4/d6/d8/d10 ficaram estatisticamente justos (min/max < 2,2× em 600 lançamentos).

✅ Render PBR: materiais por tipo (osso, obsidiana, âmbar, metal, cristal), faces com sulco de
   tinta e realce (sensação de gravado), mesa de feltro com vinheta, luz de 3 pontos + vela
   quente, sombra de contato. Zonas de queda distribuídas: **nenhum dado empilha**.

⚠️ **d12 com defeito conhecido:** a construção das faces pentagonais (escolha dos 5 vértices por
   direção de normal) gera malha furada/estrelada, e o dado continua enviesado. d4/d6/d8/d10
   estão corretos. Correção pendente: montar as faces por adjacência de arestas em vez de por
   proximidade de normal.

❌ Ainda falta em §11: partículas de impacto, áudio por material com pitch por velocidade,
   háptica no celular, shader próprio das faces raras, LOD de qualidade, "Rolagem rápida".

## Próximo passo recomendado
1. Fechar o d12 (malha por adjacência de arestas).
2. Completar o §11.4: áudio de colisão por material, partículas e háptica.
3. Só então seguir para o passo 3 do §16 (combate 2D com uma classe + Masmorra 1),
   como o documento manda: "não avance enquanto os dados não estiverem perfeitos".
