import { Game } from "./game/Game";

// build tag: efeito colateral real (não é removido pelo tree-shaking) p/ gerar
// um nome de bundle NOVO e furar o cache do CDN/navegador — o arquivo anterior
// tinha o mesmo nome e ficou preso em cache corrompido.
document.documentElement.dataset.ghBuild = "2026-07-17b";

const app = document.getElementById("app")!;
new Game(app);
