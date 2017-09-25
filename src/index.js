import {
  initBoardCells,
  placeSnake,
  generateFrog,
} from './js/init';
import Snake from './js/snake';
import './css/main.scss';

const init = (element) => {
  const container = document.querySelector(element);
  const snake = new Snake();

  initBoardCells(container);
  placeSnake(snake);
  generateFrog(snake);
};

document.addEventListener('DOMContentLoaded', () => {
  init('.board');
});
