import './style.css';

interface InfoCard {
  idPhoto: number;
  image: string;
}

const cards: InfoCard[] = [
  {
    idPhoto: 1,
    image: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png`
  },
  {
    idPhoto: 2,
    image: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png`
  },
  {
    idPhoto: 3,
    image: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png`
  },
  {
    idPhoto: 4,
    image: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png`
  },
  {
    idPhoto: 5,
    image: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png`
  },
  {
    idPhoto: 6,
    image: `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png`
  }
];

const nameClass = {
  cardContainer: 'card__perspective',
  card: 'card',
  cardBack: 'card__back',
  cardFront: 'card__front',
  cardImage: 'card__img'
};

const createCardImage = (
  contenedor: HTMLDivElement,
  cardId: number
): HTMLImageElement => {
  const cardImage = document.createElement('img');
  cardImage.className = nameClass.cardImage;
  cardImage.src = '';
  cardImage.alt = '';

  //Le doy atributo
  cardImage.dataset.indiceId = cardId.toString();
  console.log(cardImage);
  //Lo pongo en el contenedor
  contenedor.appendChild(cardImage);

  //Me devulevo la img
  return cardImage;
};

const contentCard = (
  contenedor: HTMLDivElement,
  cardId: number
): HTMLImageElement => {
  //Creo cardBack
  const cardBack = document.createElement('div');
  cardBack.className = nameClass.cardBack;

  //Creo cardFront
  const cardFront = document.createElement('div');
  cardFront.className = nameClass.cardFront;

  //añado la imagen vacia a cardFront
  const cardImg = createCardImage(cardFront, cardId);

  //Los añado a la carta
  contenedor.appendChild(cardBack);
  contenedor.appendChild(cardFront);

  //Me devulevo la img para después cambiar src
  return cardImg;
};

const changeStateCard = (card: HTMLDivElement): void => {
  card.dataset.state = 'front';
};

//Cambio src de img
const changeImg = (indice: number, elemento: HTMLImageElement): void => {
  elemento.src = cards[indice - 1].image;
  //si no me devolviese la img
  // const cardImg: HTMLCollection = document.getElementsByClassName('card__img');
  // const elemento = cardImg[indice - 1];
  // if (elemento && elemento instanceof HTMLImageElement) {
  //   elemento.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/${indice}.png`;
  // }
};

//Dar la vuelta a la card
const flipCard = (card: HTMLDivElement, cardImg: HTMLImageElement): void => {
  //animación dar la vuelta
  changeStateCard(card);

  //aceder al data indice-id
  const indice = card.dataset.indiceId;

  //cambio la img de la carta
  indice
    ? changeImg(parseInt(indice), cardImg)
    : console.error('El valor de indice de la carta es undefined');
};

//Creo la card
const createCard = (cardObj: InfoCard, container: HTMLDivElement) => {
  //Creo la card
  const card = document.createElement('div');
  card.className = nameClass.card;

  const cardId = cardObj.idPhoto;
  // const cardImg = cardObj.image;

  //Le doy atributo
  card.dataset.state = 'back';
  card.dataset.indiceId = cardId.toString();

  //Añado el contenido
  const cardImg = contentCard(card, cardId);

  //Añado card a cardContainer
  container.appendChild(card);

  //Añado evento de click
  card.addEventListener('click', () => {
    flipCard(card, cardImg);
  });
};

const paintCard = (cardObj: InfoCard) => {
  const cardsGrid = document.getElementById('cards');

  //creo card container
  const cardContainer = document.createElement('div');
  cardContainer.className = nameClass.cardContainer;

  //creo card
  createCard(cardObj, cardContainer);

  cardsGrid && cardsGrid instanceof HTMLDivElement
    ? cardsGrid.appendChild(cardContainer)
    : console.error('No se ha encontrado el div con id cards');
};

cards.forEach((card: InfoCard) => {
  paintCard(card);
});
