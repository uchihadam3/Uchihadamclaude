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
  // BOOT normal: Título → (Novo Jogo → criação) ou (Continuar → seleção de personagem).
  // A abertura resolve com um herói NOVO (+ slot de destino) ou CARREGAR um slot.
  runIntro(app).then((res) => {
    if (res.kind === "load") {
      void saveBackend.load(res.slot).then((save) => {
        if (!save) { location.reload(); return; } // save sumiu → recomeça o fluxo
        const g = new Game(app, { name: save.name, classId: save.classId, attr: save.baseAttr }, "load");
        g.loadSave(save);
      });
    } else {
      const g = new Game(app, res.character);
      g.startNewCharacter(res.slot);
    }
  });
}
