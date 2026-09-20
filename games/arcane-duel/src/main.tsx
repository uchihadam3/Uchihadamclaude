import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.js';
import { prepararInstalacao } from './app/instalar.js';
import { jogoPronto } from './app/carregando.js';

import './estilos/base.css';
import './estilos/kit.css';
import './estilos/componentes.css';
import './estilos/telas.css';
import './estilos/titulo.css';

/*
 * O convite de instalação precisa ser preparado **antes** do React.
 *
 * `beforeinstallprompt` dispara cedo e uma vez só; se o ouvinte ainda não
 * existir quando ele passar, o botão "Instalar" nunca funciona — e o jogador
 * recebe uma instrução manual quando o navegador teria feito sozinho.
 */
prepararInstalacao();

const raiz = document.querySelector('#raiz');
if (raiz === null) throw new Error('sem elemento raiz');

/*
 * A rede de segurança da tela de carregamento.
 *
 * Normalmente quem a fecha é o primeiro quadro desenhado da cena do título.
 * Se algo impedir esse quadro — WebGL ausente, canvas bloqueado — a tela de
 * carregamento não pode ficar lá para sempre escondendo o erro.
 */
globalThis.setTimeout(jogoPronto, 6000);

createRoot(raiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
