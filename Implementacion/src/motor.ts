/*
En el motor nos va a hacer falta un método para barajar cartas
*/
import { Carta, Tablero, estadoPartida } from './modelo';

export const barajarCartas = (...cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};
/*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas

  */
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  index: number
): boolean =>
  tablero.estadoPartida !== 'DosCartasLevantadas' &&
  !tablero.cartas[index].estaVuelta;

const vortearPrimeraCarta = (indice: number, tablero: Tablero): void => {
  tablero.indiceCartaVolteadaA = indice;
  tablero.cartas[indice].estaVuelta = true;
  estadoPartida(tablero, 'UnaCartaLevantada');
};

const voltearSegundaCarta = (indice: number, tablero: Tablero): void => {
  tablero.indiceCartaVolteadaB = indice;
  tablero.cartas[indice].estaVuelta = true;
  estadoPartida(tablero, 'DosCartasLevantadas');
};

export const voltearLaCarta = (indice: number, tablero: Tablero): void => {
  if (tablero.estadoPartida === 'CeroCartasLevantadas') {
    vortearPrimeraCarta(indice, tablero);
  } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
    voltearSegundaCarta(indice, tablero);
  }
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
/*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas 
    como encontradas 
  */
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  //Cambios en el tablero
  reseteoIndiceCartas(tablero);
  estadoPartida(tablero, 'CeroCartasLevantadas');
  contadorMovimientos(tablero);
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  reseteoIndiceCartas(tablero);
  estadoPartida(tablero, 'CeroCartasLevantadas');
  contadorMovimientos(tablero);
};

export const reseteoIndiceCartas = (tablero: Tablero): void => {
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every(carta => carta.encontrada);
};

const reseteoCartas = (tablero: Tablero) => {
  tablero.cartas.forEach(carta => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
};

export const contadorMovimientos = (tablero: Tablero) => ++tablero.movimientos;
export const resetearMovimientos = (tablero: Tablero) =>
  (tablero.movimientos = 0);

//Iniciar partida
export const iniciaPartidaMotor = (tablero: Tablero): void => {
  reseteoCartas(tablero);
  resetearMovimientos(tablero);
  reseteoIndiceCartas(tablero);
  estadoPartida(tablero, 'CeroCartasLevantadas');
  tablero.cartas = barajarCartas(...tablero.cartas);
};
