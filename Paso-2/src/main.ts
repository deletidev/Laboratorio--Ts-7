import './style.css';

const card = document.getElementById('card');

const changeStateCard = (): void => {
  const card = document.getElementById('card');
  if (card && card instanceof HTMLDivElement) {
    card.dataset.state = 'front';
  }
};

const changeImg = (): void => {
  const cardImg = document.getElementById('card-img');
  if (cardImg && cardImg instanceof HTMLImageElement) {
    cardImg.src =
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png';
  }
};

const flipCard = (): void => {
  changeStateCard();
  changeImg();
};

if (card && card instanceof HTMLDivElement) {
  card.addEventListener('click', flipCard);
}
