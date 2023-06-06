import './style.css';

const cards = document.getElementsByClassName('card');

const changeStateCard = (card: HTMLDivElement): void => {
  card.dataset.state = 'front';
};

//cambiar img
const changeImg = (i: number): void => {
  const cardImg: HTMLCollection = document.getElementsByClassName('card__img');
  const elemento = cardImg[i];
  if (elemento && elemento instanceof HTMLImageElement) {
    elemento.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/${
      i + 1
    }.png`;
  }
};

const flipCard = (card: HTMLDivElement, i: number): void => {
  changeStateCard(card);
  changeImg(i);
};

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  if (card && card instanceof HTMLDivElement) {
    card.addEventListener('click', () => {
      flipCard(card, i);
    });
  }
}
