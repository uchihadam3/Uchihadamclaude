// UIManager: boot screen, main menu, pause menu, game-over screen, and the
// discreet in-game HUD (stamina/fear bars, prompt line, dog-state icon).
// "Nao encha a tela de HUD" - only what's listed in the spec is shown.
(function () {
  function $(id) { return document.getElementById(id); }

  function UIManager(gsm) {
    this.gsm = gsm;
    this.bootScreen = $('bootScreen');
    this.bootBarFill = $('bootBarFill');
    this.mainMenu = $('mainMenu');
    this.pauseMenu = $('pauseMenu');
    this.gameOverScreen = $('gameOverScreen');
    this.hud = $('hud');
    this.staminaFill = $('staminaFill');
    this.fearFill = $('fearFill');
    this.dogIcon = $('dogIcon');
    this.promptWrap = $('promptWrap');

    var self = this;
    document.body.addEventListener('click', function (e) {
      var action = e.target.getAttribute && e.target.getAttribute('data-menu-action');
      if (!action) return;
      self.bus && self.bus.emit('menuAction', action);
    });
  }

  UIManager.prototype.setBus = function (bus) { this.bus = bus; };

  UIManager.prototype.runBootSequence = function (onDone) {
    var self = this;
    var pct = 0;
    var iv = setInterval(function () {
      pct += 8 + Math.random() * 14;
      if (pct >= 100) {
        pct = 100;
        self.bootBarFill.style.width = '100%';
        clearInterval(iv);
        setTimeout(function () {
          self.bootScreen.classList.add('hidden');
          onDone && onDone();
        }, 220);
      } else {
        self.bootBarFill.style.width = pct + '%';
      }
    }, 90);
  };

  UIManager.prototype.showMainMenu = function () {
    this.mainMenu.classList.remove('hidden');
    this.hud.classList.add('hidden');
    this.pauseMenu.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
  };

  UIManager.prototype.showHUD = function () {
    this.mainMenu.classList.add('hidden');
    this.pauseMenu.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
    this.hud.classList.remove('hidden');
  };

  UIManager.prototype.showPause = function () {
    this.pauseMenu.classList.remove('hidden');
  };

  UIManager.prototype.hidePause = function () {
    this.pauseMenu.classList.add('hidden');
  };

  UIManager.prototype.showGameOver = function () {
    this.gameOverScreen.classList.remove('hidden');
  };

  UIManager.prototype.setPrompt = function (text) {
    if (!text) { this.promptWrap.classList.remove('show'); return; }
    this.promptWrap.textContent = text;
    this.promptWrap.classList.add('show');
  };

  UIManager.prototype.update = function (player) {
    if (!player) return;
    var pct = Math.round((player.stamina / AK.config.STAMINA_MAX) * 100);
    this.staminaFill.style.width = pct + '%';
  };

  AK.ui.UIManager = UIManager;
})();
