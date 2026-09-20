import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.js';

import './estilos/base.css';
import './estilos/componentes.css';
import './estilos/telas.css';

const raiz = document.querySelector('#raiz');
if (raiz === null) throw new Error('sem elemento raiz');

createRoot(raiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
