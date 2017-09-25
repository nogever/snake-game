import * as config from './constants';
import { collisionCheck, updateScore } from './utils';
import { initBoardCells, initSnakeBody, generateFrog, placeSnake } from './init';

export default function Snake() {
  this.body = initSnakeBody();
  this.isDead = false;
  this.direction = 'up';
};

export function turnHead(direction, x, y) {
  let head = direction;

  switch(direction) {
    case 'left':
      head = `${x}-${y - 1}`;
      break;
    case 'right':
      head = `${x}-${y + 1}`;
      break;
    case 'up':
      head = `${x - 1}-${y}`;
      break;
    case 'down':
      head = `${x + 1}-${y}`;
      break;
  };

  return head;
};

export function handleStatus(status, snake, head) {
  if (status === 'wall' || status === 'snake') {
    snake.isDead = true;
    handleDead();
    return;
  }

  addNewHead(head, snake);

  if (status === 'frog') {
    updateScore(snake);
    generateFrog(snake);
  } else {
    removeTail(snake);
  }
};

const addNewHead = (head, snake) => {
  snake.body.unshift(head);
  const newBodyCell = document.querySelector(`.cell-${head}`);
  newBodyCell.classList.add('snake');
  newBodyCell.classList.remove('frog');
};

const removeTail = snake => {
  const tail = snake.body.pop();
  const tailCell = document.querySelector(`.cell-${tail}`);
  tailCell.classList.remove('snake');
};

const handleDead = () => {
  const gameOverBackdrop = document.querySelector('.backdrop');
  gameOverBackdrop.classList.add('game-over');
  const restartButton = document.querySelector('.game-over button');
  restartButton.addEventListener('click', e => {
    gameOverBackdrop.classList.remove('game-over');
    resetGame();
  });
};

const resetGame = () => {
  // TODO: implement game module to handle the state of the game
  window.location.reload(false);
};
