import * as config from './constants';

const boardWidth = config.BOARD_WIDTH;
const boardHeight = config.BOARD_HEIGHT;
const snakeLength = config.SNAKE_INIT_LENGTH;
const totalCells = config.BOARD_WIDTH * config.BOARD_HEIGHT;

export function initBoardCells(container) {
  container.innerHTML = '';

  for (var i = 0; i < boardWidth; i++) {
    for(var j = 0; j < boardHeight; j++) {
      const cell = document.createElement('div');

      cell.classList.add('cell', `cell-${i + 1}-${j + 1}`);
      
      container.appendChild(cell);
    }
  }
};

export function initSnakeBody() {
  const body = [];
  const startPoint = Math.floor(boardWidth / 2);

  for (let i = 0; i < snakeLength; i++) {
    body[i] = `${startPoint + i}-${startPoint}`;
  }

  return body;
};

export function placeSnake(snake){
  snake.body.forEach(xy => {
    const cell = document.querySelector(`.cell-${xy}`);
    cell.classList.add('snake');
  })
};

export function generateFrog(snake) {
  const currentSnakeLength = snake.body.length;
  let random = Math.floor(Math.random() * (totalCells - currentSnakeLength));

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      const cell = document.querySelector(`.cell-${i + 1}-${j + 1}`);

      if (!cell.classList.contains('snake') && --random === 0) {
        cell.classList.add('frog');
      }
    }
  }
};
