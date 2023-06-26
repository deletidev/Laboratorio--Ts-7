/* ¿Qué debemos hacer aquí?

Habrá un botón para empezar partida, ese lo que hará es:

Crear el tablero inicial
Barajar las cartas
En el HTML tendremos un CSS grid con todas las cartas (boca abajo, src de carta boca abajo) y un atributo data-indice-array en el que tendremos el indice del array al que corresponden, así pues la partida arranca con

Todas las cartas boca abajo.
Escuchando al evento click de cada carta (cuando el usuario pinche en una leeremos de data-indice-array, la posición del array de la carta).
En cuanto el usuario pinche en una carta:

Miramos si la carta es volteable (ver motor).
Si es volteable la voltearemos (cambiamos el src de la imagen), para la imagen sería recomendable crear data-indice-imagen, va a coincidir con el índice del div para pintar la imagen correspondiente al índice del array de cartas.
Comprobamos si estamos elegiendo una carta o estamos en la segunda.
Si estamos en la segunda comprobamos si son pareja o no.
En caso de que si las dejamos fijas.
En caso de que no esperamos un segundo (setTimeout) y las ponemos boca abajo (reseteamos su estado sin voltear)
Vuelta a empezar
 */
import { Tablero, estadoPatida, IdSonidosPartida } from './modelo';
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  borrarPropiedades,
  esPartidaCompleta,
  contadorMovimientos
} from './motor';
import { confettiMio } from './confetti';
import sonidoOn from '/sound-high.svg';
import sonidoOff from '/sound-off.svg';

//Cambio src de img
const srcImg = (imagenes: HTMLCollection, tablero: Tablero, index: number) => {
  const imagen = imagenes[index];
  if (imagen && imagen instanceof HTMLImageElement) {
    imagen.src = tablero.cartas[index].imagen;
  }
};

const cartasBocaAbajo = (...cartas: Element[]): void => {
  cartas.forEach(carta => {
    if (carta && carta instanceof HTMLDivElement) {
      carta.dataset.state = 'back';
    }
  });
};

const borroImg = (...imagenes: HTMLImageElement[]): void => {
  imagenes.forEach(imagen => (imagen.src = ''));
};

//Dar la vuelta a la card
const flipCard = (card: Element): void => {
  if (card && card instanceof HTMLDivElement) {
    card.dataset.state = 'front';
  }
};

//Reproducir sonidos
const reproducirSonido = (sonido: IdSonidosPartida) => {
  const sound = document.getElementById(sonido);
  if (sound && sound instanceof HTMLAudioElement) {
    sound.play();
  }
};

const muteSonido = (boton: HTMLButtonElement) => {
  //Cambio la img
  const imgBtn = boton.children[0];
  if (imgBtn && imgBtn instanceof HTMLImageElement) {
    imgBtn.src = sonidoOff;
  }
  //Muteo todos los audios
  const sounds = Array.from(document.querySelectorAll('audio'));
  sounds.forEach(sound => {
    if (sound && sound instanceof HTMLAudioElement) sound.muted = true;
  });
};

const volumenSonido = (boton: HTMLButtonElement) => {
  //Cambio la img
  const imgBtn = boton.children[0];
  if (imgBtn && imgBtn instanceof HTMLImageElement) {
    imgBtn.src = sonidoOn;
  }
  //Muteo todos los audios
  const sounds = Array.from(document.querySelectorAll('audio'));
  sounds.forEach(sound => {
    if (sound && sound instanceof HTMLAudioElement) sound.muted = false;
  });
};

const imprimirMovimientos = (movimientos: number) => {
  const spanMovientos = document.getElementById('intentos-number');
  if (spanMovientos && spanMovientos instanceof HTMLElement) {
    spanMovientos.textContent = movimientos.toString();
  }
};

//  acciones al voltear la carta
const revelarCartaAcciones = (
  tablero: Tablero,
  imagenes: HTMLCollectionOf<Element>,
  carta: Element,
  index: number
) => {
  //play al sonido carta
  reproducirSonido('sound-card');

  //apunto la posicion volteada en el tablero
  voltearLaCarta(tablero, index);

  //doy src a la img
  srcImg(imagenes, tablero, index);

  //doy la vuelta a la carta
  flipCard(carta);
};

const accionesPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
  //sonido
  setTimeout(() => {
    reproducirSonido('sound-match');
  }, 300);

  //cambio estado a las cartas, a encontradas
  parejaEncontrada(tablero, indiceA, indiceB);

  //Cambios en el tablero
  borrarPropiedades(tablero);
  estadoPatida(tablero, 'CeroCartasLevantadas');
};

const accionesNoPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number,
  cartas: Element[],
  imagenes: HTMLCollectionOf<Element>
) => {
  const cartaA = cartas[indiceA];
  const cartaB = cartas[indiceB];
  const imgA = imagenes[indiceA];
  const imgB = imagenes[indiceB];
  if (
    cartaA instanceof HTMLDivElement &&
    cartaB instanceof HTMLDivElement &&
    imgA instanceof HTMLImageElement &&
    imgB instanceof HTMLImageElement
  ) {
    reproducirSonido('sound-error');
    cartasBocaAbajo(cartaA, cartaB);
    parejaNoEncontrada(tablero, indiceA, indiceB);
    borroImg(imgA, imgB);
    borrarPropiedades(tablero);
    estadoPatida(tablero, 'CeroCartasLevantadas');
    contadorMovimientos(tablero);
    imprimirMovimientos(tablero.movimientos);
  }
};

const callbackCartaClick = (
  tablero: Tablero,
  index: number,
  carta: Element,
  array: Element[],
  imagenes: HTMLCollectionOf<Element>
) => {
  console.log('click');
  //Aumento movimiento

  //Miro si la carta es volteable
  const esVolteable = sePuedeVoltearLaCarta(tablero, index);
  esVolteable
    ? revelarCartaAcciones(tablero, imagenes, carta, index)
    : reproducirSonido('sound-error');

  //Si hay dos cartas levantadas ¿son pareja?
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  //obligatorio undefined por tema del 0, indice del array
  if (
    indiceA !== undefined &&
    indiceB !== undefined &&
    tablero.estadoPartida === 'DosCartasLevantadas'
  ) {
    //miro si son pareja
    const pareja = sonPareja(tablero, indiceA, indiceB);
    pareja
      ? accionesPareja(tablero, indiceA, indiceB)
      : setTimeout(() => {
          accionesNoPareja(tablero, indiceA, indiceB, array, imagenes);
        }, 500);
  }

  //!partida Completa? no se donde meterlo
  if (esPartidaCompleta(tablero)) {
    reproducirSonido('sound-win');
    confettiMio();
  }
};

//Añado eventos click a las cartas
const cartasEventos = (tablero: Tablero) => {
  const cartasPintadas = Array.from(document.getElementsByClassName('card'));
  const imagenes = document.getElementsByClassName('card__img');
  console.log(cartasPintadas);
  // for (const iterator of object) {
  // }
  cartasPintadas.forEach((carta, index, array) => {
    const cartaClick = () =>
      callbackCartaClick(tablero, index, carta, array, imagenes);
    if (carta && carta instanceof HTMLDivElement) {
      // carta.removeEventListener('click', cartaClick);
      carta.addEventListener('click', cartaClick);
    }
  });
};

export const iniciarPartidaUi = (tablero: Tablero) => {
  const cartasMesa = Array.from(document.getElementsByClassName('card'));
  cartasBocaAbajo(...cartasMesa);
  cartasEventos(tablero);
  imprimirMovimientos(tablero.movimientos);
};

export const toogleSonido = (boton: HTMLButtonElement) => {
  boton.classList.toggle('mute');
  boton.classList.contains('mute') ? muteSonido(boton) : volumenSonido(boton);
};
