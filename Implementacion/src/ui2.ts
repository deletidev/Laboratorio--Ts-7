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
import { Tablero, estadoPatida } from './modelo';
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  borrarPropiedades,
  esPartidaCompleta
} from './motor';
import { confettiMio } from './confetti';

//Cambio src de img
const srcImg = (imagenes: HTMLCollection, tablero: Tablero, index: number) => {
  const imagen = imagenes[index];
  if (imagen && imagen instanceof HTMLImageElement) {
    imagen.src = tablero.cartas[index].imagen;
  }
};

const changeStateCard = (card: HTMLDivElement): void => {
  card.dataset.state = 'front';
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
const flipCard = (card: HTMLDivElement): void => {
  changeStateCard(card);
};

//sonido al dar la vuelta
const cardSound = () => {
  const sound = document.getElementById('sound-card');
  if (sound && sound instanceof HTMLAudioElement) {
    sound.play();
  }
};

//sonido al encontrar pareja
const parejaSound = () => {
  const sound = document.getElementById('sound-match');
  if (sound && sound instanceof HTMLAudioElement) {
    sound.play();
  }
};

//sonido al fallar
const errorSound = () => {
  const sound = document.getElementById('sound-error');
  if (sound && sound instanceof HTMLAudioElement) {
    sound.play();
  }
};
//sonido al ganar
const winSound = () => {
  const sound = document.getElementById('sound-win');
  if (sound && sound instanceof HTMLAudioElement) {
    sound.play();
  }
};

//Añado eventos click a las cartas
const cartasEventos = (tablero: Tablero) => {
  const cartasPintadas = Array.from(document.getElementsByClassName('card'));
  const imagenes = document.getElementsByClassName('card__img');

  cartasPintadas.forEach((carta, index, array) => {
    if (carta && carta instanceof HTMLDivElement) {
      carta.addEventListener('click', () => {
        //Miro si la carta es volteable
        const esVolteable = sePuedeVoltearLaCarta(tablero, index);

        if (esVolteable) {
          //play al sonido carta
          cardSound();

          //apunto la posicion volteada en el tablero
          voltearLaCarta(tablero, index);

          //doy src a la img
          srcImg(imagenes, tablero, index);

          //doy la vuelta a la img
          flipCard(carta);

          const indiceA = tablero.indiceCartaVolteadaA;
          const indiceB = tablero.indiceCartaVolteadaB;
          //obligatorio undefined por tema del 0
          if (indiceA !== undefined && indiceB !== undefined) {
            //miro si son pareja
            const pareja = sonPareja(tablero, indiceA, indiceB);

            if (pareja) {
              setTimeout(parejaSound, 300);
              parejaEncontrada(tablero, indiceA, indiceB);
              borrarPropiedades(tablero);
              estadoPatida(tablero, 'CeroCartasLevantadas');

              if (esPartidaCompleta(tablero)) {
                winSound();
                confettiMio();
              }
            } else {
              const cartaA = array[indiceA];
              const cartaB = array[indiceB];
              const imgA = imagenes[indiceA];
              const imgB = imagenes[indiceB];

              setTimeout(() => {
                if (
                  cartaA instanceof HTMLDivElement &&
                  cartaB instanceof HTMLDivElement &&
                  imgA instanceof HTMLImageElement &&
                  imgB instanceof HTMLImageElement
                ) {
                  errorSound();
                  cartasBocaAbajo(cartaA, cartaB);
                  parejaNoEncontrada(tablero, indiceA, indiceB);
                  borroImg(imgA, imgB);
                  borrarPropiedades(tablero);
                  estadoPatida(tablero, 'CeroCartasLevantadas');
                }
              }, 500);
            }
          }
        }
      });
    }
  });
};

export const iniciarPartidaUi = (tablero: Tablero) => {
  const cartasMesa = Array.from(document.getElementsByClassName('card'));
  cartasBocaAbajo(...cartasMesa);
  cartasEventos(tablero);
};
