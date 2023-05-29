import './style.css';

const shuffleArray = (...array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const myArray: string[] = [
  '🐧',
  '🐹',
  '🐨',
  '🦁',
  '🐵',
  '🦊',
  '🐧',
  '🐹',
  '🐨',
  '🦁',
  '🐵',
  '🦊'
];

const arrayShuffleOne = shuffleArray(...myArray);
const arrayShuffleTwo = shuffleArray(...myArray);
const arrayShuffleThree = shuffleArray(...myArray);
console.log(arrayShuffleOne);
console.log(arrayShuffleTwo);
console.log(arrayShuffleThree);

console.log(myArray);
