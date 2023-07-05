import { tablero } from './modelo';
import { iniciarPartida, toogleSonido, prepararPartida } from './ui';

document.addEventListener('DOMContentLoaded', prepararPartida);

const iniciaPartidaBtn = document.getElementById('empezar-partida');

iniciaPartidaBtn && iniciaPartidaBtn instanceof HTMLButtonElement
  ? iniciaPartidaBtn.addEventListener('click', () => iniciarPartida(tablero))
  : console.error('No se encuentra el botón iniciar partida');

const sonidosBtn = document.getElementById('sonidos');

sonidosBtn && sonidosBtn instanceof HTMLButtonElement
  ? sonidosBtn.addEventListener('click', () => {
      toogleSonido(sonidosBtn);
    })
  : console.error('No se encuentra el botón sonidos');
