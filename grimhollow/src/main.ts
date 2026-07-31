import { Game } from "./game/Game";
import { runIntro } from "./game/screens";
import { backend as saveBackend } from "./game/save";

// build tag: efeito colateral real (não é removido pelo tree-shaking) p/ gerar
// um nome de bundle NOVO e furar o cache do CDN/navegador.
document.documentElement.dataset.ghBuild = "2026-07-25k";

const app = document.getElementById("app")!;

// Fluxo de abertura: Título → Criação de personagem → Loading (pré-carrega TODOS
// os assets p/ nenhum PNG entrar faltando) → então monta o jogo com o personagem.
const qs = new URLSearchParams(location.search);
if (qs.has("show")) {
  // acesso direto à SALA-VITRINE (escadas + clareira + partículas)
  new Game(app, { name: "Test", classId: "mago" }, "showcase");
} else if (qs.has("test")) {
  // BYPASS de teste: entra direto como Mago, sem a intro
  new Game(app, { name: "Test", classId: "mago" });
} else {
  // BOOT normal: se existe um save no último slot jogado, CONTINUA (sem intro);
  // senão, roda a criação de personagem e liga o novo herói ao slot 0.
  // (a tela de SELEÇÃO de personagem com os 3 slots vem no próximo passo)
  const slot = saveBackend.lastSlot() ?? 0;
  saveBackend.load(slot).then((save) => {
    if (save) {
      const g = new Game(app, { name: save.name, classId: save.classId, attr: save.baseAttr }, "load");
      g.loadSave(save);
    } else {
      runIntro(app).then((character) => {
        const g = new Game(app, character);
        g.startNewCharacter(0);
      });
    }
  });
}
