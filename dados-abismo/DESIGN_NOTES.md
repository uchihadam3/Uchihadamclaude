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

✅ **d12 e d10 corrigidos.** As faces agora são derivadas do **FECHO CONVEXO** (para cada trio de
   vértices, testa se o plano deixa todos os outros de um lado só, e agrupa os coplanares) — método
   geral, serve para qualquer sólido convexo. Dois bugs achados no caminho:
   1. Eu escolhia os vértices da face por *proximidade da normal*, o que pegava vértices
      **não-coplanares** (produtos escalares 0.98 / 0.79 / 0.79 / 0.60 — não é pentágono).
   2. O fecho descartava as faces de BAIXO, porque eu só aceitava planos cujo produto vetorial
      já apontasse para fora. Agora a normal é orientada para fora.
   Resultado: os 5 sólidos com contagem e coplanaridade corretas
   (d4=4·3 lados, d6=6·4, d8=8·3, d10=10·3, d12=12·5, todas as faces equidistantes do centro).

✅ **d10 é o TRAPEZOEDRO PENTAGONAL de verdade** (10 faces-pipa). Eu o tinha abandonado achando
   que degenerava, mas a causa real era o bug da normal do fecho (que só corrigi depois, por causa
   do d12): com o fecho correto ele monta perfeito. Isso importa porque **só o trapezoedro tem
   face oposta paralela a cada face** — é o que faz o número de cima ficar legível quando o dado
   pousa (numa bipirâmide fica uma ARESTA para cima, e não se lê nada).
   Bônus: virou o dado mais justo do conjunto (viés 4,5× → 1,8×).

**Busca de semente com a geometria corrigida: 100% de acerto nos 5 dados** (3–13 ms cada).

❌ Ainda falta em §11: partículas de impacto, áudio por material com pitch por velocidade,
   háptica no celular, shader próprio das faces raras, LOD de qualidade, "Rolagem rápida".

## Próximo passo recomendado
1. Fechar o d12 (malha por adjacência de arestas).
2. Completar o §11.4: áudio de colisão por material, partículas e háptica.
3. Só então seguir para o passo 3 do §16 (combate 2D com uma classe + Masmorra 1),
   como o documento manda: "não avance enquanto os dados não estiverem perfeitos".

---

# PRÓXIMA SESSÃO — PLANO DE EXECUÇÃO (leitura obrigatória)

O jogo funciona (jogo.html), mas está **fácil demais e pouco legível**. Ordem de ataque:

## 1. TELEGRAFIA TOTAL — é critério de aceite (§12/§15), não enfeite
"Zero informação oculta: todo dano é previsível antes de confirmar."

- **`prever(skill, dice, alvoIdx)`** em `engine/combat.js`: roda os efeitos numa cópia do estado
  e devolve `{porInimigo:[{uid,dano,morre,estados[]}], bloqueio, custoHP, essencia}`.
  Reaproveitar `applyEffects` com um flag `dryRun` (não mutar, acumular num relatório).
- **Ao passar/segurar numa habilidade:**
  - acender os **dados que ela vai usar** (usar `findSubset`) com contorno dourado na mesa 3D;
  - desenhar uma **linha/seta** da habilidade até o(s) inimigo(s) alvo;
  - mostrar em cada inimigo afetado: **`-X` fantasma**, ícone do estado que vai receber
    (☠ veneno, 🔥 queimadura, ❄ congelado, 🎯 marca) e um **crânio** se o golpe MATA;
  - se a habilidade dá bloqueio/cura, prévia no card do jogador.
- **Intenção inimiga expandida:** hoje mostra `⚔ 12`. Passar a mostrar
  **quanto vai passar do seu bloqueio** (`⚔ 12 → 4 no HP`) e destacar em vermelho se **te mata**.

## 2. IMPACTO DE VERDADE (§10)
- **Hit-stop de 60–120ms** no golpe pesado (congelar o rAF do render).
- **Partículas**: lascas de osso no acerto, poeira no pouso do dado, faísca no bloqueio.
- **Animação de ataque**: hoje o sprite só pisca. Fazer o sprite **avançar e recuar**
  (anticipação + follow-through) e o alvo **recuar** no impacto.
- **Faces raras** (Curinga/Lâmina/Vazio) com **pulso de aura** ao pousar + som próprio (§11.4).

## 3. DIFICULDADE É QUEBRA-CABEÇA, NÃO NÚMERO MAIOR

### 3.1 As FECHADURAS (`js/data/travas.js`)
Um inimigo deixou de ser "um saco de HP". Ele é uma **regra sobre como você pode
feri-lo**, lida a partir da ALOCAÇÃO do golpe — `{sum, max, min, count, vals,
simbolos}`, ou seja *com que dados* você bateu, não só quanto:

| | fechadura | abre com |
|---|---|---|
| ◑ ◐ | Ímpar / Par | soma da alocação com aquela paridade |
| ▲ | Couraça `v` | maior dado ≥ v |
| ▼ | Casca Fina `v` | maior dado ≤ v (golpe grande estilhaça) |
| 🗝 | Chave `v` | soma EXATA de v |
| ✳ | Múltiplo `v` | soma múltipla de v |
| ① | Enxuto `v` | exatamente v dados no golpe |
| ✦ | Selo `k` | o golpe precisa conter aquele símbolo |
| ∞ | Gêmeo | invulnerável enquanto o par viver |
| ⇄ | Espelho `%` | fere, mas devolve % em você |

A onda vira quebra-cabeça porque **as fechaduras brigam pelos mesmos dados**:
um 5 abre a Couraça e trava a Casca Fina no mesmo turno. Tudo é público — a
carta mostra a regra e ela acende **✓ ABRE** / **✕ TRAVA** conforme você
seleciona (§12/§15, zero informação oculta).

### 3.2 Cada classe abre a fechadura de um jeito
Não é sabor, é a razão de escolher a classe:
- **⚒ Carrasco — ARROMBA.** `Arrombar [soma ≥ 10]` quebra a regra do alvo neste
  turno. Força bruta, e cara: come vários dados. `Açougueiro` arromba e triplica.
- **🗡 Lâmina-Sombra — CONTORNA.** Veneno e sangramento não passam pela
  fechadura: corroem o inimigo travado. `Veneno Sutil [TRINCA]`, `Sumir` deixa
  sangramento, `Enxame` envenena todos.
- **✦ Arcanista — DISSOLVE.** `Nova Gélida [SEQ 3]` apaga a fechadura de TODOS
  por 2 turnos. `Colapso [SEQ 4]` perfura tudo. `Prisma` dissolve por 3.
- **◈ OráculA — REESCREVE o dado.** `Tecer` vira um dado em ◈ e AJUSTA outro em
  ±2 *na direção que abre a fechadura do alvo*. `Tapeçaria` CRAVA dois dados no
  valor exato que abre. `Julgamento [soma = 7]` perfura.

### 3.3 Os inimigos mexem nos SEUS dados
Novas intenções: ❄ congelar (trava o dado na face que caiu), ✋ roubar (tira o
seu maior dado do turno), ✖ fraturar (o máximo do dado cai 1, para sempre),
⇅ inverter, 🕳 contar (conta até 3 e a pá desce). O Coveiro **alterna par/ímpar**
a cada turno; o OSSÁRIO gira quatro fechaduras em ciclo (Couraça 5 → ímpar →
chave 9 → exatamente 2 dados).

### 3.4 O Cofre agora dá FERRAMENTAS, não só números
- **Polegar Torto** (VÉU): n×/turno, empurra um dado em ±1 — é o que resolve
  paridade e chave.
- **Gazua** (COROA): n×/combate, ARROMBA a fechadura de um inimigo.
- **Lapidar** (⚔) abre o Selo ⚔; **Fio Solto** (◈) assume o valor que a
  fechadura pedir.

### 3.4b O GRIMÓRIO (`js/grimorio.js`)
"maior ≥ 4" dizia a regra e escondia a consequência. Duas correções:
1. O rótulo na carta passou a dizer o efeito: **"só dói com dado 4 ou mais"**.
   Fechadura não é armadura — golpe errado dá **zero**, não "menos".
2. **Cartão de explicação** no combate: tocar num efeito do inimigo (fechadura,
   intenção ou estado) abre um cartãozinho com AQUELE efeito e nada mais —
   descrição + exemplo do que causa dano e do que causa zero. O Grimório inteiro
   (6 seções) ficou como opção secundária: botão no título e "ver tudo no
   Grimório" dentro do cartão. Manual grande no meio da luta não se lê.
3. "só dói" virou **"só sofre dano"** — o texto passa a nomear o que está em
   jogo (dano), não a sensação.

### 3.4c A fileira de inimigos não desce mais pra mesa
`#ini` quebrava linha e a partir de 3 inimigos a carta seguinte descia por cima
do feltro, tapando os dados. Agora a fileira é **uma linha só** com rolagem
lateral (`flex-wrap:nowrap` + `overflow-x:auto`), carta de largura fixa (112px),
sprite menor e máscara esfumada nas bordas. Medido com 3, 5 e 7 inimigos: sempre
**1 linha**, base fixa em 180px (20% da tela), rolagem lateral entrando a partir
de 5. O topo avisa "**N inimigos · arraste ↔**".

### 3.5 As PASSIVAS de classe agora têm botão
Estavam no motor desde sempre e nunca tinham sido ligadas na tela — e são
justamente os verbos de fechadura grátis de cada classe:
**⚒ Sobrecarga** (+1 no dado, custa 2 HP) · **🗡 Trapaça** (face oposta, 1×/turno)
· **✦ Canalização** (guarda o dado no Círculo agora) · **◈ Prever** (o dado
mantém esta face no próximo turno).

### 3.6 A régua (o simulador)
A IA pontuava habilidade pelo TIPO de efeito (`dmg` valia o mesmo fosse `sum*3`
ou `sum*7`) — jogava mal justo as classes de sequência. Agora ela chama
`combat.prever()` e mede o resultado real. Com fechadura, um encaixe não basta:
o **requisito** diz se PODE, a **fechadura** diz se FERE — então ela testa até
14 encaixes por habilidade (`findSubsets`) × 2 alvos, e usa Gazua/Polegar.

`node test/sim.mjs <runs> <masmorras> <cofre 0|0.5|1>`. `Portal` fica desligado
na medição: é atalho, não poder.

### 3.7 Onde ficou (30 runs/classe)
| | Cofre 0% (1ª run) | Cofre 100% |
|---|---|---|
| ⚒ Carrasco | 8,9 andares | 14,6 |
| 🗡 Lâmina-Sombra | 14,2 | 32,0 |
| ✦ Arcanista | 9,0 | 27,9 |
| ◈ OráculA | 20,6 | 44,4 |

Run virgem morre na Masmorra 1–2. Com a árvore cheia a IA gulosa chega até a
Masmorra 5. Ela é uma IA de 1 nível que não planeja entre turnos — é piso, não
teto. O Carrasco é o mais castigado pelas fechaduras (todo o dano dele passa por
elas) e é o próximo a ajustar.

## 3.8 ARTE DOS INIMIGOS (`arte/inimigos/`, `tools/fatiar.py`)
Os 13 inimigos da Cripta de Giz deixaram de ser desenho procedural em canvas e
passaram a ter ilustração pintada. O recorte é feito por `tools/fatiar.py`, que
**não assume grade**: acha cada criatura por componente conectado do que não é
magenta. Isso importou porque o gerador não respeitou a grade pedida — o OSSÁRIO
saiu ocupando duas colunas e o Coveiro desalinhado.

Duas armadilhas que o script resolve:
- **Detalhe solto vira componente separado** (fumaça do turíbulo, ondas do
  Carrilhão, riscos do Crânio). Só componente PEQUENO (< 18% da área mediana)
  é absorvido, e sempre pelo grande mais próximo — assim duas criaturas
  vizinhas nunca se fundem. Na primeira tentativa, sem essa regra, a fileira
  inteira virou um blob só.
- **Peso**: 320px por sprite dava 1,9 MB. Baixando pra 180px (a carta mostra 76)
  e quantizando em 128 cores — a arte já é de paleta restrita — ficou **184 KB**
  no total, com transparência preservada.

`js/sprites.js` usa o PNG quando o id está na lista ARTE e cai no desenho em
canvas para o resto, então masmorra sem arte ainda funciona.

## 3.9 A mesa cabe na faixa livre
O canvas 3D ocupava a tela inteira POR BAIXO de tudo, então a fileira de
inimigos e a barra de habilidades ficavam sobre o feltro. Agora `resize()` mede
`#ini` e `#baixo` e posiciona/dimensiona o canvas só na banda entre os dois; um
`ResizeObserver` refaz a conta quando a fileira cresce (mais inimigos) ou o
rodapé muda (cartas com selo). A projeção das etiquetas dos dados passou a usar
o retângulo do canvas em vez da janela.

Medido a 412×900 com 3 e com 6 inimigos: fileira 0–224, mesa 224–623, rodapé
623–900. `sobrepoeTopo:false`, `sobrepoeBaixo:false`, nenhuma etiqueta fora da
mesa.

## 3.10 O turno do inimigo virou uma frase de quatro tempos
Antes cada ação inimiga acontecia em 420ms e o dano aparecia junto: não dava pra
ver o que tinha acontecido. Agora cada ação tem quatro batidas:

| tempo | o que acontece |
|---|---|
| 0 ms | **ARMA** — o card recua, cresce e acende na cor da ação |
| 280 ms | **BATE** — investida com antecipação e retorno + efeito próprio da intenção |
| 360 ms | **VIAJA** — o golpe atravessa a tela girando, com rastro de 3 cópias defasadas |
| 760 ms | **CHEGA** — anel de choque + 9 estilhaços no alvo, tremor e o número do dano |

O intervalo entre ações é 880ms (até 2 inimigos), 780ms (3-4) e 640ms (5+) — com
onda cheia ainda dá pra acompanhar sem virar novela. Ação que mexe no seu dado
agora diz o que fez: "❄ dado congelado", "✋ dado roubado", "✖ dado fraturado".

**Verificação**: sob SwiftShader o main thread trava por segundos renderizando,
então cronometrar quadro a quadro não funciona aqui. O que dá pra afirmar é a
ORDEM e a existência, medidas por MutationObserver: ARMA → BATE → efeito →
projétil → impacto → dano, com 3 cópias de rastro por tiro e 9 estilhaços por
impacto. O espaçamento em milissegundos é o do agendamento no código.

## 3.11 A CONTA DO GOLPE na tela
A carta dizia "USA 5+6" e você tinha que somar de cabeça pra saber se abria uma
fechadura de paridade ou de soma. Agora a conta aparece pronta, em dois lugares:

- **Barra de seleção**: `[1] + [3]  ·  2 dados  ·  Σ 4  ·  ◐ PAR`
- **Cada carta de habilidade**, com o encaixe que ela usaria:
  `[1]+[3]+[1]+[6]  ·  4 dados  ·  Σ 11  ·  ◑ ÍMPAR`

Os ícones de paridade são os MESMOS da fechadura (◐ par, ◑ ímpar), então dá pra
casar visualmente: o Crânio Rolante pede ◑ ÍMPAR e a carta que fecha a conta em
ímpar mostra ◑ ÍMPAR na mesma cor.

Os valores saem de `resolvedValues(req, ents)` — o mesmo que o motor usa —, então
o ◈ Curinga aparece resolvido no valor que a habilidade vai realmente usar. Na
barra de seleção, onde ainda não há habilidade escolhida, o curinga fica como
`Σ 7+◈` e a paridade diz "depende do ◈", em vez de mentir um número.

## 3.12 AUDITORIA DE HABILIDADES (`test/habilidades.mjs`) — 3 bugs achados
Reportado: "o inimigo roubou um dado e não funcionou". Era verdade, e não era
só o roubar. **Três das cinco habilidades inimigas que mexem nos seus dados
eram no-op**, todas pelo mesmo motivo: elas agem em `enemyTurn()`, que roda
dentro de `endTurn()` — e logo depois `startTurn()` limpa `used` e re-rola tudo.

| | o que fazia | por que morria | agora |
|---|---|---|---|
| ✋ roubar | `used.add(dado)` | `startTurn()` faz `used.clear()` | marca `_roubado`; `rollAll()` pula o dado por uma rolagem |
| ❄ congelar | `_congelado = true` | o laço logo abaixo fazia `_congelado = false` | passa por `_travadoProx` + `_guardaFace` |
| ⇅ inverter | mudava a face da rolagem atual | a rolagem é descartada | trava o dado na face OPOSTA pro próximo turno |

E uma quarta, do jogador: **Prisma** diz "devolve 2 dados ao Círculo", mas o op
`bank` pescava da SOBRA — e o Prisma consome 5 dados, então quase nunca sobrava
nada. Agora ele devolve os dados que a própria habilidade acabou de gastar.

O teste roda as 17 habilidades (4 classes × 4 + Respirar) com um encaixe válido
e confere o EFEITO no estado, não o log: causou dano? deu bloqueio? aplicou
estado? arrombou/dissolveu a fechadura? mexeu num dado da mão? Mais as 4
passivas de classe, as 2 ferramentas do Cofre, as 9 fechaduras (o golpe certo
fere / o errado dá zero), as 11 intenções inimigas e o ciclo do OSSÁRIO.
**150 verificações.**

## 3.13 O JOGO INTEIRO — as 10 masmorras, 130 inimigos
Cada masmorra tem um **tema de fechadura próprio**, senão a regra vira ruído:

| | masmorra | pergunta que o puzzle faz |
|---|---|---|
| M1 | A Cripta de Giz | ensina todas as regras básicas |
| M2 | O Pântano de Sal | TAMANHO do dado × QUANTIDADE de dados |
| M3 | A Forja Afundada | ARITMÉTICA — múltiplo e chave |
| M4 | A Biblioteca Fraturada | CONJUNTOS — ⁘ todos diferentes × ⁚ todos iguais |
| M5 | A Colmeia de Quitina | ◇ JANELA de soma, com re-rolagem custando vida |
| M6 | A Cidadela de Vidro | FRAGILIDADE — casca fina e espelho por toda parte |
| M7 | O Mercado das Almas | PREÇO — soma exata e selo de símbolo |
| M8 | O Jardim de Carne | ✧ PRIMO × múltiplo |
| M9 | A Torre Invertida | tudo ao contrário do que você aprendeu |
| M10 | O Cassino do Vazio | cada comum traz a fechadura de uma masmorra; o chefe gira SEIS |

Quatro fechaduras novas entraram pra sustentar isso: **⁘ Avesso** (dados todos
diferentes), **⁚ Uníssono** (todos iguais), **◇ Janela** (soma numa faixa) e
**✧ Indivisível** (soma prima). Total: 15 tipos.

### Dois inimigos eram INVENCÍVEIS
A auditoria varre cada inimigo com todas as mãos de até 4 dados e pergunta:
existe algum golpe que o fere? Dois responderam não — Sentinela de Quitina e
Tendão Enrolado pediam `forte 7`, e **a bolsa base é de d6/d4**: nunca sai um 7.
Corrigidos para `forte 6`. As `chave 14/17` também caíram para 13/15, porque
a Lâmina-Sombra joga com d4 e a soma dela não alcançava.

A regra que ficou: **dificuldade vem de combinar regras, nunca de exigir um dado
que o jogador talvez nunca receba.**

`test/habilidades.mjs` agora faz **220 verificações**, incluindo, para cada uma
das 10 masmorras: 8+3 de estrutura, ids únicos, toda fechadura de um tipo que
existe, todo inimigo com padrão, as ondas dos 10 andares montando, e nenhum
inimigo invencível.

## 3.14 O bloqueio do inimigo não durava nada
Reportado: "o inimigo usou escudo e sumiu assim que o turno dele acabou".
Era exatamente isso. `tickStatuses()` zerava `en.block`, e ela roda **no mesmo
`endTurn()`** em que o inimigo acabou de ganhar o bloqueio — nascia e morria sem
nunca aparar um golpe. A intenção 🛡 Defesa era decorativa.

O bloqueio agora expira no **começo do turno DELE** (primeira linha de
`enemyTurn()`), então protege o seu turno inteiro, que é a única hora em que
serve pra alguma coisa. Testado: ele bloqueia 20, você bate 8, o HP não mexe e
sobram 12 de barreira; no turno seguinte não empilha (volta a 20, não 40).

Como agora ele importa, o bloqueio ganhou chip próprio na carta (🛡 25, azul) em
vez de um número miúdo colado no HP — e é clicável, com verbete no Grimório.

## 4. GAMIFICAÇÃO (tela inicial → batalha)
- Tela inicial: logo animado, dados 3D rolando ao fundo, cards de classe com
  **sprite do piloto**, overall e fantasia; som ao focar.
- Transições entre andares (fade + nome do andar em cartela).
- **Barra de combo/energia**, contador de andar estilizado, tooltips em tudo (§12).
- O **personagem do jogador** na tela (hoje só existe como HP).

## 5. Conteúdo que ainda falta (o grosso)
Masmorras 2–10 (72 comuns, 27 elites, 9 subchefes, 9 chefes), 64 relíquias
restantes (para ≥90), meta-progressão "O Cofre" (§4.3), Selos do Abismo (§4.4).
