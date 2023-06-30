import { Tablero, IdSonidosPartida, tablero } from './modelo';
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta
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

//Dar la vuelta a las cartas
const cartasBocaAbajo = (...cartas: Element[]): void => {
  cartas.forEach(carta => {
    if (carta && carta instanceof HTMLDivElement) {
      carta.dataset.state = 'back';
    }
  });
};

//Borro img de las cartas
const borroImg = (...imagenes: Element[]): void => {
  imagenes.forEach(imagen => {
    if (imagen instanceof HTMLImageElement) {
      imagen.src = '';
    }
  });
};

//Cartas boca Arriba
const cartaBocaArriba = (card: Element): void => {
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

//Mutar sonidos
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

//Quiar el mute a sonidos
const volumenSonido = (boton: HTMLButtonElement) => {
  //Cambio la img
  const imgBtn = boton.children[0];
  if (imgBtn && imgBtn instanceof HTMLImageElement) {
    imgBtn.src = sonidoOn;
  }
  //sonido todos los audios
  const sounds = Array.from(document.querySelectorAll('audio'));
  sounds.forEach(sound => {
    if (sound && sound instanceof HTMLAudioElement) sound.muted = false;
  });
};

//Imprimir movimientos
const imprimirMovimientos = (movimientos: number) => {
  const spanMovientos = document.getElementById('intentos-number');
  if (spanMovientos && spanMovientos instanceof HTMLElement) {
    spanMovientos.textContent = movimientos.toString();
  }
};

//Mostrar el mensaje
const mensajeShow = () => {
  const mensaje = document.getElementById('mensaje');
  if (mensaje && mensaje instanceof HTMLDivElement) {
    mensaje.classList.remove('oculto');
  }
};

//ocultar el mensaje
const mensajeHiden = () => {
  const mensaje = document.getElementById('mensaje');
  if (
    mensaje &&
    mensaje instanceof HTMLDivElement &&
    !mensaje.classList.contains('oculto')
  ) {
    mensaje.classList.add('oculto');
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
  cartaBocaArriba(carta);
};

//  acciones ui son pareja
const accionesPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
  //sonido para escuchar que se de la vuelta a la carta y luego el sonido de pareja
  setTimeout(() => {
    reproducirSonido('sound-match');
  }, 300);

  //cambio estado a las cartas, a encontradas
  parejaEncontrada(tablero, indiceA, indiceB);
  imprimirMovimientos(tablero.movimientos);
};

//  acciones ui No son pareja
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
    setTimeout(() => {
      borroImg(imgA, imgB);
    }, 100);

    imprimirMovimientos(tablero.movimientos);
  }
};

const dosCartasLevantadasFc = (
  tablero: Tablero,
  array: Element[],
  imagenes: HTMLCollectionOf<Element>
) => {
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
    sonPareja(tablero, indiceA, indiceB)
      ? accionesPareja(tablero, indiceA, indiceB)
      : setTimeout(() => {
          accionesNoPareja(tablero, indiceA, indiceB, array, imagenes);
        }, 500);
  }
};

//  acciones al hacer click en un carta
const cartaClick = (
  tablero: Tablero,
  index: number,
  carta: Element,
  array: Element[],
  imagenes: HTMLCollectionOf<Element>
) => {
  //Miro si la carta es volteable
  if (sePuedeVoltearLaCarta(tablero, index)) {
    revelarCartaAcciones(tablero, imagenes, carta, index);
    dosCartasLevantadasFc(tablero, array, imagenes);
  } else {
    reproducirSonido('sound-error');
  }

  //Miro si la partida está completa
  if (esPartidaCompleta(tablero)) {
    reproducirSonido('sound-win');
    confettiMio();
    mensajeShow();
  }
};

//  Añado eventos a las cartas
export const prepararPartida = () => {
  const cartasMesa = Array.from(document.getElementsByClassName('card'));
  const imagenes = document.getElementsByClassName('card__img');
  cartasMesa.forEach((carta, index, array) => {
    if (carta && carta instanceof HTMLDivElement) {
      carta.addEventListener('click', () => {
        if (tablero.estadoPartida !== 'PartidaNoIniciada')
          cartaClick(tablero, index, carta, array, imagenes);
      });
    }
  });
};

//iniciar partida ui
export const iniciarPartidaUi = (tablero: Tablero) => {
  const cartasMesa = Array.from(document.getElementsByClassName('card'));
  const htmlImg = document.getElementsByClassName('card__img');
  cartasBocaAbajo(...cartasMesa);
  imprimirMovimientos(tablero.movimientos);
  mensajeHiden();

  //??Esto es necesario
  if (htmlImg.length !== 0) {
    const imagenes = Array.from(htmlImg);
    borroImg(...imagenes);
  } else {
    console.error('No se encuentrar elementos con la clase card__img');
  }
};

//ui boton sonido
export const toogleSonido = (boton: HTMLButtonElement) => {
  boton.classList.toggle('mute');
  boton.classList.contains('mute') ? muteSonido(boton) : volumenSonido(boton);
};
