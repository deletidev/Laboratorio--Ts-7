import {
  barajarCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja
} from './motor';
import { cartas, Tablero } from './modelo';

describe('barajarCartas', () => {
  it('cartas[0] es diferente de cartaBarajada[0]', () => {
    //Arrange
    const expected: number = cartas[0].idFoto;
    //Act
    const cartaBarajada = barajarCartas(...cartas);
    const result = cartaBarajada[0].idFoto;
    //Asssert
    expect(result).not.toBe(expected);
  });
  it('cartas[5] es diferente de cartaBarajada[5]', () => {
    //Arrange
    const expected: number = cartas[5].idFoto;
    //Act
    const cartaBarajada = barajarCartas(...cartas);
    const result = cartaBarajada[5].idFoto;
    //Asssert
    expect(result).not.toBe(expected);
  });

  it('cartas[cartas.length -1] es diferente de cartaBarajada[cartaBarajada.length -1]', () => {
    //Arrange
    const expected: number = cartas[cartas.length - 1].idFoto;
    //Act
    const cartaBarajada = barajarCartas(...cartas);
    const result = cartaBarajada[cartaBarajada.length - 1].idFoto;
    //Asssert
    expect(result).not.toBe(expected);
  });

  it('tienen la misma longitud', () => {
    //Arrange
    const expected: number = cartas.length;
    //Act
    const cartaBarajada = barajarCartas(...cartas);
    const result: number = cartaBarajada.length;
    //Asssert
    expect(result).toBe(expected);
  });
});

describe('sePuedeVoltearLaCarta', () => {
  const newTablero: Tablero = {
    cartas: barajarCartas(...cartas),
    estadoPartida: 'PartidaNoIniciada',
    movimientos: 0
  };

  it('Deberia devolver true, ya que he intentado voltear una carta no volteada', () => {
    //Arrange
    const expected = true;

    //Act
    const result = sePuedeVoltearLaCarta(newTablero, 8);

    //Asssert
    expect(result).toBe(expected);
  });

  it('Deberia devolver false, ya que he intentado voltear una carta ya volteada', () => {
    //Arrange
    const expected = false;
    newTablero.cartas[8].estaVuelta = true;
    //Act
    const result = sePuedeVoltearLaCarta(newTablero, 8);

    //Asssert
    expect(result).toBe(expected);
  });

  it('Deberia devolver false, ya que he intentado voltear teniendo dos cartas ya volteadas', () => {
    //Arrange
    const expected = false;
    newTablero.indiceCartaVolteadaA = 8;
    newTablero.indiceCartaVolteadaB = 10;
    //Act
    const result = sePuedeVoltearLaCarta(newTablero, 11);

    //Asssert
    expect(result).toBe(expected);
  });
});

describe('voltearLaCarta', () => {
  const newTablero: Tablero = {
    cartas: barajarCartas(...cartas),
    estadoPartida: 'CeroCartasLevantadas',
    movimientos: 0
  };

  it('Deberia devolver UnaCartaLevantada', () => {
    //Arrange
    const expected = 'UnaCartaLevantada';
    const indice = 8;
    //Act
    voltearLaCarta(newTablero, indice);
    const result = newTablero.estadoPartida;

    //Asssert
    expect(result).toBe(expected);
  });
  it('Deberia devolver DosCartasLevantadas', () => {
    //Arrange
    const expected = 'DosCartasLevantadas';
    const indice = 10;

    //Act
    voltearLaCarta(newTablero, indice);
    const result = newTablero.estadoPartida;

    //Asssert
    expect(result).toBe(expected);
  });
});

describe('sonPareja', () => {
  const newTablero: Tablero = {
    cartas: barajarCartas(...cartas),
    estadoPartida: 'PartidaNoIniciada',
    movimientos: 0
  };
  it('Deberia devolver true, son pareja', () => {
    //Arrange
    const expected = true;
    const indiceA = 0;
    const indiceB = 1;
    newTablero.cartas[0].idFoto = 1;
    newTablero.cartas[1].idFoto = 1;

    //Act
    const result = sonPareja(newTablero, indiceA, indiceB);

    //Asssert
    expect(result).toBe(expected);
  });
  it('Deberia devolver false,no son pareja', () => {
    //Arrange
    const expected = false;
    const indiceA = 0;
    const indiceB = 1;
    newTablero.cartas[0].idFoto = 0;
    newTablero.cartas[1].idFoto = 1;

    //Act
    const result = sonPareja(newTablero, indiceA, indiceB);

    //Asssert
    expect(result).toBe(expected);
  });
});
