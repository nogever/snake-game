import * as config from './constants';

export function collisionCheck(head) {
  const x = head.split('-')[0];
  const y = head.split('-')[1];

  if (x < 1 || y < 1 || x > config.BOARD_WIDTH || y > config.BOARD_HEIGHT) {
    return 'wall';
  }

  const cell = document.querySelector(`.cell-${x}-${y}`);

  if (cell.classList.contains('snake')) {
    return 'snake';
  } else if(cell.classList.contains('frog')){
    return 'frog';
  }
  return 'going';
};

export function keyHandler(snake, key) {
  if (snake.isDead) {
    return false;
  }

  switch(key) {
    case 37:
      snake.direction = 'left';      
      break;
    case 38:
      snake.direction = 'up';      
      break;
    case 39:
      snake.direction = 'right';      
      break;
    case 40:
      snake.direction = 'down';      
      break;
  };
};

export function updateScore(snake) {
  const score = document.querySelector('.footer span');
  // trying to use css :empty selector for transition
  score.innerHTML = '';
  setTimeout(() => {
    score.textContent = (snake.body.length * config.SCORE_MULTIPLIER) - (config.SNAKE_INIT_LENGTH * config.SCORE_MULTIPLIER)
  }, 200);
};
