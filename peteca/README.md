# 🏸 Peteca Legends — Da praça ao Mundial

Jogo de **peteca competitiva em pixel art 2.5D** com partidas totalmente automáticas.
Você monta a dupla, treina os atletas, escolhe a estratégia e **assiste** ao jogo
acontecer como numa transmissão esportiva — do Torneio da Praça ao Campeonato
Mundial de Peteca.

## Como jogar

É um jogo 100% em HTML/CSS/JS puro, sem build e sem dependências.
Basta servir a pasta e abrir no navegador (PC ou celular):

```bash
cd peteca
python3 -m http.server 8080
# abra http://localhost:8080
```

Funciona também no GitHub Pages (a pasta é autocontida).

## O ciclo do jogo

1. **Escolha 2 atletas** entre 8 personagens (e renomeie os dois).
2. **Treine** os 10 atributos + entrosamento gastando pontos de treino
   (treino pesado evolui mais, mas cansa; descansar recupera a condição).
3. **Escolha a estratégia** antes da partida (8 opções: Ataque Total,
   Bola Colocada, Cansar o Adversário, Explorar Jogador Fraco…).
4. **Assista à partida automática** em pixel art 2.5D: os 4 atletas jogam
   sozinhos com base nos atributos, cansaço, entrosamento, pressão e estratégia.
5. Entre os sets você pode **ajustar a estratégia**.
6. Ganhe **dinheiro, reputação e pontos de treino**, compre equipamentos,
   desbloqueie habilidades passivas e cosméticos.
7. Suba pelos **11 campeonatos** até o título mundial.

## Regras implementadas (peteca em duplas)

- 2 jogadores por lado; a peteca deve cruzar por cima da rede.
- **1 toque por lado** — só um atleta da dupla toca na peteca por jogada.
- Pontuação direta (todo rali vale ponto).
- Melhor de 3 sets: sets 1–2 até **21** (2 de vantagem, teto 25);
  set 3 até **15** (2 de vantagem, teto 18).
- Peteca na rede ou fora = ponto do adversário.

## Estrutura do código

| Arquivo | Sistema |
| --- | --- |
| `js/util.js` | utilidades, RNG com seed |
| `js/data.js` | atletas, 24 duplas adversárias, 11 campeonatos, estratégias, treinos, habilidades, equipamentos, cosméticos, eventos, comentários |
| `js/state.js` | estado do jogo, progressão, treino, economia, salvamento local (localStorage) |
| `js/sim.js` | motor de simulação: IA das jogadas, saques, cansaço, pressão, entrosamento, pontuação |
| `js/sprites.js` | pixel art procedural: atletas (10 poses), retratos, peteca com rotação, troféus |
| `js/audio.js` | efeitos sonoros e música chiptune via WebAudio |
| `js/match.js` | quadra 2.5D, animação da partida, torcida, placar, HUD, confete |
| `js/screens.js` | todas as telas de interface |
| `js/main.js` | inicialização |

## Modos

- **Campanha** — 11 campeonatos progressivos com chaveamento, eventos especiais e títulos.
- **Partida Rápida** — qualquer dupla contra qualquer dupla, em qualquer quadra.
- **Desafios de Treino** — provas automáticas de saque, defesa, ataque, precisão, fôlego e entrosamento.
