# Aldenmoor — Documento de Design & Prompt-Mestre (revisado)

RPG de fantasia medieval sandbox, offline, exploração profunda. Inspirações:
Fallout 1–2, Battle Brothers, Mount & Blade, The Banner Saga, Day R (estrutura de
exploração) — **sem** mecânicas de sobrevivência (fome/sede/sono/temperatura).

## Stack / Engine
- **Phaser 3 + TypeScript + Vite** — engine 2D web madura. O sistema de **Scenes**
  mapeia a arquitetura do jogo (World / Local / Combat / UI). Câmera pan/zoom,
  input touch, luz para dia-noite, deploy estático (GitHub Pages).
- **Zod** valida todo conteúdo (mundo, e futuramente eventos/itens/inimigos/quests
  em JSON) — conteúdo quebrado falha cedo e visível.
- **IndexedDB (a definir: Dexie)** para o save: um estado serializável único.
- UI pesada (inventário, diálogo, quests) virá como camada **React/DOM** sobre o
  canvas nas etapas seguintes; a UI leve da Etapa 1 mora numa cena Phaser (HUD).

## Melhoria central de design: dados → mapa (não o contrário)
O prompt original pedia "a IA analisa a imagem do mapa e extrai os pontos". Isso é
frágil e não reproduzível. **Invertemos:** os dados do mundo são a fonte da verdade
(`src/game/data/world.ts`), e o mapa visual (pergaminho) é **desenhado a partir
deles**. Assim "cidade desenhada = cidade jogável exatamente naquele ponto" é
garantido por construção. Coordenadas em % (0–100) sobre a tela do mapa.

## Arquitetura (sistemas)
| Sistema            | Papel                                             | Status     |
|--------------------|---------------------------------------------------|------------|
| WorldMapManager    | Grafo de estradas + pathfinding A*                | ✅ Etapa 1 |
| TimeManager        | Ciclo dia/noite (avança na viagem)                | ✅ Etapa 1 |
| (WorldMapScene)    | Render do mapa, câmera, marcador, viagem          | ✅ Etapa 1 |
| (HudScene)         | Relógio, card de local, botões, zoom              | ✅ Etapa 1 |
| LocationManager    | Mapas locais (cidade/vila/dungeon)                | Etapa 2    |
| EventManager       | Eventos aleatórios + escolhas + consequências     | Etapa 3    |
| CharacterManager   | Atributos, classes, progressão                    | Etapa 4    |
| CombatManager      | Combate por turnos                                | Etapa 5    |
| QuestManager       | Missões e recompensas                             | Etapa 6    |
| InventoryManager   | Equipamentos e itens                              | Etapa 7    |
| SaveManager        | Save/load (IndexedDB)                             | Etapa 8    |

## O continente — pontos de interesse (a "REGRA FINAL")
Fonte da verdade em `src/game/data/world.ts`. Coordenadas em %.

| ID          | Nome              | Tipo          | X%  | Y%  | Região            | Nv |
|-------------|-------------------|---------------|-----|-----|-------------------|----|
| CITY_001    | Pedravale (início)| Cidade        | 47  | 54  | Planícies Centrais| 1  |
| VILLAGE_001 | Ribeirão          | Vila          | 37  | 62  | Planícies Centrais| 1  |
| CASTLE_001  | Forte de Aldbrand | Castelo       | 56  | 45  | Planícies Centrais| 3  |
| VILLAGE_002 | Folharéu          | Vila          | 28  | 44  | Floresta Sombria  | 2  |
| RUIN_001    | Ruínas de Eldoran | Ruína         | 19  | 33  | Floresta Sombria  | 3  |
| TOWER_001   | Torre de Véspero  | Torre de Magos| 25  | 24  | Floresta Sombria  | 4  |
| CITY_002    | Cume Branco       | Cidade        | 69  | 27  | Picos Gélidos     | 4  |
| DUNGEON_001 | Cavernas de Gorm  | Masmorra      | 60  | 17  | Picos Gélidos     | 5  |
| PORT_001    | Porto Salino      | Porto         | 15  | 58  | Costa das Brumas  | 2  |
| CITY_003    | Maré Alta         | Cidade        | 18  | 70  | Costa das Brumas  | 3  |
| VILLAGE_003 | Poço Seco         | Vila          | 68  | 71  | Ermo Cinzento     | 3  |
| RUIN_002    | Sepulcro do Ermo  | Ruína         | 77  | 63  | Ermo Cinzento     | 4  |
| DUNGEON_002 | Fenda Abissal     | Masmorra      | 85  | 78  | Ermo Cinzento     | 6  |

Regiões: Planícies Centrais (fácil, início), Floresta Sombria, Picos Gélidos,
Costa das Brumas, Ermo Cinzento. Estradas ligam os locais num grafo (road/trail/
wild) com custo por terreno.

## Roadmap (escopo honesto — fatias verticais, não tudo raso de uma vez)
- **Etapa 1 — World Map System** ✅: mapa pergaminho desenhado dos dados; câmera
  pan/zoom (mouse, roda, toque, pinça, botões +/−); marcador do aventureiro estilo
  peça de tabuleiro; **viagem clicando no destino com pathfinding A* pelas
  estradas**; ciclo **dia/noite** que avança na viagem; card de local com "Viajar"/
  "Entrar".
- **Etapa 2 — Mapa Local**: entrar num local abre uma cena top-down com controle
  direto do personagem, NPCs e interações (começando por Pedravale).
- **Etapa 3 — Eventos**: tabelas ponderadas por região/hora/nível durante a viagem,
  com escolhas (lutar/fugir/negociar) e consequências.
- **Etapa 4 — Personagem**: atributos (FOR/DES/INT/CON), 4 classes, progressão.
- **Etapa 5 — Combate**: por turnos (a profundidade — tático em grid vs. formação —
  será decidida no início da etapa).
- **Etapa 6 — Quests**: id/título/objetivo/recompensa/estado, data-driven.
- **Etapa 7 — Inventário**: armas/armaduras/poções/materiais/itens de missão.
- **Etapa 8 — Polimento**: UI, som, animações, save (IndexedDB).

"Emergente/persistente" é escopado como tabelas de eventos + flags de mundo no
save — não uma simulação total (inviável no escopo).
