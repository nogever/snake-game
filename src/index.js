import Snake from './js/snake';
import { initBoardCells, placeSnake, generateFrog } from './js/init';
import { keyHandler } from './js/utils';
import { animate } from './js/animation';
import './css/main.scss';

export function init(element) {
  const container = document.querySelector(element);
  const snake = new Snake();

  initBoardCells(container);
  placeSnake(snake);
  generateFrog(snake);

  document.addEventListener('keydown', key => {
    if (key.which === 32) {
      animate(snake);
    }
    keyHandler(snake, key.which);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  init('.board');
});
