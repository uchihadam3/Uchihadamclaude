// Dado do Destino (12 efeitos) + Combos de símbolos (10 básicos + 6 avançados).
// A execução vive no Combat; aqui ficam catálogo, textos e ícones.
(function () {
  RA.data.Fate = [
    { id: 'mareDeFerro', n: 1, pt: 'Maré de Ferro', en: 'Iron Tide', desc: { pt: 'Todo escudo ganha +1.', en: 'All shields get +1.' } },
    { id: 'sangueQuente', n: 2, pt: 'Sangue Quente', en: 'Hot Blood', desc: { pt: 'O primeiro ataque do turno causa +2.', en: 'First attack this turn deals +2.' } },
    { id: 'ecoArcano', n: 3, pt: 'Eco Arcano', en: 'Arcane Echo', desc: { pt: 'A primeira magia é repetida com metade do valor.', en: 'First spell repeats at half value.' } },
    { id: 'ventoInstavel', n: 4, pt: 'Vento Instável', en: 'Unstable Wind', desc: { pt: 'O primeiro dado rerrolado ganha +1 se virar ataque ou escudo.', en: 'First rerolled die gets +1 if attack/shield.' } },
    { id: 'olhoDoCaos', n: 5, pt: 'Olho do Caos', en: 'Eye of Chaos', desc: { pt: 'Um inimigo aleatório recebe marca.', en: 'A random enemy gets marked.' } },
    { id: 'sombraCurta', n: 6, pt: 'Sombra Curta', en: 'Short Shadow', desc: { pt: 'Curas reduzidas em 1 neste turno.', en: 'Healing reduced by 1 this turn.' } },
    { id: 'fendaVerde', n: 7, pt: 'Fenda Verde', en: 'Green Rift', desc: { pt: 'Veneno e sangramento aplicam +1.', en: 'Poison and bleed apply +1.' } },
    { id: 'chamaViva', n: 8, pt: 'Chama Viva', en: 'Living Flame', desc: { pt: 'Queimadura causa dano imediatamente.', en: 'Burn damages immediately.' } },
    { id: 'maoDaSorte', n: 9, pt: 'Mão da Sorte', en: 'Lucky Hand', desc: { pt: 'Matar inimigo concede 1 rerrolagem extra.', en: 'Killing an enemy grants 1 extra reroll.' } },
    { id: 'pedraFria', n: 10, pt: 'Pedra Fria', en: 'Cold Stone', desc: { pt: 'O primeiro dano recebido por herói é reduzido em 1.', en: 'First damage each hero takes is reduced by 1.' } },
    { id: 'destinoTorto', n: 11, pt: 'Destino Torto', en: 'Crooked Fate', desc: { pt: 'Um dado aleatório ganha +1 e outro -1.', en: 'A random die gets +1, another -1.' } },
    { id: 'faceDourada', n: 12, pt: 'Face Dourada', en: 'Golden Face', desc: { pt: 'O último dado usado é copiado com 50% do valor.', en: 'Last die used is copied at 50% value.' } }
  ];

  RA.data.Combos = [
    // básicos
    { id: 'tresEspadas', need: { sword: 3 }, pt: '3 Espadas', en: '3 Swords', desc: { pt: 'Último ataque causa +2.', en: 'Last attack deals +2.' } },
    { id: 'escudoCoracao', need: { shield: 1, heart: 1 }, pt: 'Amparo', en: 'Succor', desc: { pt: 'Cura +1 no alvo protegido.', en: 'Heal +1 on protected target.' } },
    { id: 'fumacaToxica', need: { flame: 1, drop: 1 }, pt: 'Fumaça Tóxica', en: 'Toxic Smoke', desc: { pt: 'Veneno 1 em todos os inimigos.', en: 'Poison 1 on all enemies.' } },
    { id: 'drenoVital', need: { skull: 1, heart: 1 }, pt: 'Dreno Vital', en: 'Vital Drain', desc: { pt: 'Cura 1 no herói mais ferido.', en: 'Heal 1 on most wounded hero.' } },
    { id: 'estrelaGuia', need: { star: 1, any: 1 }, pt: 'Estrela-Guia', en: 'Guiding Star', desc: { pt: 'Próximo dado +1.', en: 'Next die +1.' } },
    { id: 'ataqueRapido', need: { bolt: 1, sword: 1 }, pt: 'Ataque Rápido', en: 'Swift Strike', desc: { pt: 'Ataque ignora 1 escudo.', en: 'Attack ignores 1 shield.' } },
    { id: 'olharCacador', need: { eye: 1, sword: 1 }, pt: 'Olhar Caçador', en: 'Hunter Gaze', desc: { pt: 'Ataque em marcado causa +2.', en: 'Attack on marked deals +2.' } },
    { id: 'provocarForte', need: { chain: 1, shield: 1 }, pt: 'Corrente Firme', en: 'Firm Chain', desc: { pt: 'Provoca o inimigo mais forte.', en: 'Taunts the strongest enemy.' } },
    { id: 'bolsoCheio', need: { coin: 1, star: 1 }, pt: 'Bolso Cheio', en: 'Full Pocket', desc: { pt: 'Moedas extras se vencer.', en: 'Extra gold on victory.' } },
    { id: 'guardarTempo', need: { hour: 1, any: 1 }, pt: 'Guardar Tempo', en: 'Keep Time', desc: { pt: 'Guarda 1 efeito para o próximo turno.', en: 'Store 1 effect for next turn.' } },
    // avançados
    { id: 'ordemPerfeita', special: 'fiveDiff', pt: 'ORDEM PERFEITA', en: 'PERFECT ORDER', desc: { pt: '5 símbolos diferentes: escudo 1 em todos.', en: '5 different symbols: shield 1 to all.' } },
    { id: 'ritualAbsoluto', special: 'fiveSame', pt: 'RITUAL ABSOLUTO', en: 'ABSOLUTE RITUAL', desc: { pt: '5 símbolos iguais: duplica o menor dado usado.', en: '5 same symbols: duplicates lowest die used.' } },
    { id: 'tresCaveiras', need: { skull: 3 }, pt: '3 Caveiras', en: '3 Skulls', desc: { pt: 'Maldição 1 em todos os inimigos.', en: 'Curse 1 on all enemies.' } },
    { id: 'tresCoracoes', need: { heart: 3 }, pt: '3 Corações', en: '3 Hearts', desc: { pt: 'Cura 2 em todos os aliados.', en: 'Heal 2 on all allies.' } },
    { id: 'tresEscudos', need: { shield: 3 }, pt: '3 Escudos', en: '3 Shields', desc: { pt: 'Barreira coletiva de 5.', en: 'Group barrier of 5.' } },
    { id: 'tresChamas', need: { flame: 3 }, pt: '3 Chamas', en: '3 Flames', desc: { pt: 'Explosão de 3 em área.', en: 'Area explosion of 3.' } }
  ];
})();
