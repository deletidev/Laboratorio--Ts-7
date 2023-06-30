import { tablero } from './modelo';
import { iniciarPartidaUi, toogleSonido, prepararPartida } from './ui';
import { iniciaPartidaMotor } from './motor';

document.addEventListener('DOMContentLoaded', prepararPartida);

const iniciaPartidaBtn = document.getElementById('empezar-partida');

iniciaPartidaBtn && iniciaPartidaBtn instanceof HTMLButtonElement
  ? iniciaPartidaBtn.addEventListener('click', () => {
      iniciaPartidaMotor(tablero);
      iniciarPartidaUi(tablero);
    })
  : console.error('No se encuentra el botón iniciar partida');

const sonidosBtn = document.getElementById('sonidos');

sonidosBtn && sonidosBtn instanceof HTMLButtonElement
  ? sonidosBtn.addEventListener('click', () => {
      console.log('click');
      toogleSonido(sonidosBtn);
    })
  : console.error('No se encuentra el botón sonidos');
