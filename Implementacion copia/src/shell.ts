import { tablero } from './modelo';
import { iniciarPartidaUi, toogleSonido } from './ui';
import { iniciaPartidaMotor } from './motor';

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
