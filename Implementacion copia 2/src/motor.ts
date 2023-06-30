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
    !tablero.cartas[indice].encontrada, no lo necesito, porque una carta encontrada se queda volteada
     tablero.indiceCartaVolteadaB === undefined  o  tablero.estadoPartida !== 'DosCartasLevantadas'
  */
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean =>
  !tablero.cartas[indice].estaVuelta &&
  tablero.indiceCartaVolteadaB === undefined;

//!test
export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (tablero.estadoPartida === 'CeroCartasLevantadas') {
    tablero.indiceCartaVolteadaA = indice;
    tablero.cartas[indice].estaVuelta = true;
    estadoPartida(tablero, 'UnaCartaLevantada');
  } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
    tablero.indiceCartaVolteadaB = indice;
    tablero.cartas[indice].estaVuelta = true;
    estadoPartida(tablero, 'DosCartasLevantadas');
  }
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
/*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas 
    como encontradas y //!!comprobar si la partida esta completa., yo no lo he llamado aqui
  */
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  //Cambios en el tablero
  borrarPropiedades(tablero);
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
  borrarPropiedades(tablero);
  estadoPartida(tablero, 'CeroCartasLevantadas');
  contadorMovimientos(tablero);
};

export const borrarPropiedades = (tablero: Tablero): void => {
  delete tablero.indiceCartaVolteadaA;
  delete tablero.indiceCartaVolteadaB;
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
  borrarPropiedades(tablero);
  estadoPartida(tablero, 'CeroCartasLevantadas');
  tablero.cartas = barajarCartas(...tablero.cartas);
};
