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
  cardImage: 'card__img'
};

const createCardImage = (contenedor: HTMLDivElement, cardId: number) => {
  const cardImage = document.createElement('img');
  cardImage.className = nameClass.cardImage;
  cardImage.src = '';
  cardImage.alt = '';

  //Le doy atributo
  cardImage.dataset.indiceId = cardId.toString();

  //Lo pongo en el contenedor
  contenedor.appendChild(cardImage);
};

const changeStateCard = (card: HTMLDivElement): void => {
  card.dataset.state = 'front';
};

//Cambio src de img
const changeImg = (indice: number, elemento: HTMLImageElement): void => {
  elemento.src = cards[indice - 1].image;
};

//Dar la vuelta a la card
const flipCard = (card: HTMLDivElement): void => {
  //animación dar la vuelta
  changeStateCard(card);

  //aceder al data indice-id
  const indice = card.dataset.indiceId;
  const dataIndice = `[data-indice-id = "${indice}"]`;
  const cardImg = document.querySelector(`img${dataIndice}`);
  if (cardImg && cardImg instanceof HTMLImageElement) {
    //cambio la img de la carta
    indice
      ? changeImg(parseInt(indice), cardImg)
      : console.error('El valor de indice de la carta es undefined');
  }
};

//Creo la card
const createCard = (cardObj: InfoCard, container: HTMLDivElement) => {
  //Creo la card
  const card = document.createElement('div');
  card.className = nameClass.card;

  const cardId = cardObj.idPhoto;

  //Le doy atributo
  card.dataset.state = 'back';
  card.dataset.indiceId = cardId.toString();

  //Añado la imagen
  createCardImage(card, cardId);

  //Añado card a cardContainer
  container.appendChild(card);

  //Añado evento de click
  card.addEventListener('click', () => {
    flipCard(card);
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
