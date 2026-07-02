/* =========================================================================
   PETECA LEGENDS — main.js
   Inicialização: liga os sistemas, desbloqueia o áudio no primeiro toque
   e abre o menu.
   ========================================================================= */
(function () {
  'use strict';

  function boot() {
    // opções salvas → áudio
    if (window.G && G.hasSave()) {
      G.loadGame();
      if (window.Audio2 && G.save) Audio2.setOptions(G.save.options);
    }

    Screens.init();
    Screens.show('menu');

    // desbloqueio de áudio no primeiro gesto (exigência dos navegadores)
    const unlock = () => {
      if (window.Audio2) {
        Audio2.unlock();
        Audio2.playMusic('menu');
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);

    // atalhos de teclado (PC)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && G.screen !== 'menu' && G.screen !== 'match') {
        Screens.show(G.screen === 'campaign' ? 'menu' : G.save ? 'campaign' : 'menu');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
