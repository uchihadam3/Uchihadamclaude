# Starforge Armada — Demo Visual (Etapa 0)

Vertical slice **apenas visual** para validar a direção artística antes de
desenvolver o jogo completo. Nada de conta online, ranking ou 30 naves ainda —
só a beleza: nave, cenário, inimigos, tiros, efeitos, partículas e UI.

## O que a demo mostra

- **Falcon-01** desenhada em camadas: cockpit, asas, fuselagem metálica,
  motores animados, luz de borda, escudo translúcido, flash de dano e banking.
- **Cenário cinematográfico**: parallax de estrelas em profundidade, nebulosa
  animada, planeta com atmosfera, destroços flutuando e poeira cósmica.
- **5 inimigos** com visual próprio: drone, caça, torre flutuante, mina espacial
  e um elite maior.
- **Tiros e habilidades**: tiro primário duplo, míssil teleguiado (Shift) e
  ultimate com barragem frontal (Espaço), todos com glow, rastro e impacto.
- **Projéteis inimigos** em âmbar/laranja para contrastar com o ciano do jogador.
- **Explosões** com clarão, anéis de choque, faíscas, fumaça e fragmentos, com
  screen shake leve.
- **HUD sci-fi**: casco, escudo, ícones de habilidade/ultimate com cooldown,
  pontuação, combo e medidor de impulso.

## Controles

- **Mover**: WASD / setas (ou arraste no celular)
- **Tiro**: automático
- **Míssil teleguiado**: Shift (ou botão)
- **Ultimate**: Espaço (ou botão)

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o build
```

Feito com React + TypeScript + Vite, renderização em Canvas 2D com blending
aditivo, gradientes e sistema de partículas. Áudio sintetizado via Web Audio.
