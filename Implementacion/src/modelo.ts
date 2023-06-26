export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png`
  },
  {
    idFoto: 2,
    imagen: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png`
  },
  {
    idFoto: 3,
    imagen: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png`
  },
  {
    idFoto: 4,
    imagen: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png`
  },
  {
    idFoto: 5,
    imagen: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png`
  },
  {
    idFoto: 6,
    imagen: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png`
  }
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  let cartas: Carta[] = [];
  infoCartas.map(carta => {
    cartas.push(
      crearCartaInicial(carta.idFoto, carta.imagen),
      crearCartaInicial(carta.idFoto, carta.imagen)
    );
  });
  return cartas;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

type EstadoPartida =
  | 'PartidaNoIniciada'
  | 'CeroCartasLevantadas'
  | 'UnaCartaLevantada'
  | 'DosCartasLevantadas'
  | 'PartidaCompleta';

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
  movimientos: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: 'PartidaNoIniciada',
  movimientos: 0
});

export let tablero: Tablero = crearTableroInicial();

//iría en modelo?
export const estadoPartida = (
  tablero: Tablero,
  estadoPatida: EstadoPartida
): void => {
  tablero.estadoPartida = estadoPatida;
};

export type IdSonidosPartida =
  | 'sound-card'
  | 'sound-match'
  | 'sound-error'
  | 'sound-win';
