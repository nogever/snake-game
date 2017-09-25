import * as config from './constants';
import { collisionCheck } from './utils';
import { turnHead, handleStatus } from './snake';

const forward = snake => {
  const head = snake.body[0];
  const x = Number(head.split('-')[0]);
  const y = Number(head.split('-')[1]);
  const newHead = turnHead(snake.direction, x, y);
  const status = collisionCheck(newHead);

  handleStatus(status, snake, newHead);
};

export function animate(snake) {
  const interval = 1000 / config.FPS;
  let start = null;

  const move = timestamp => {
    if (snake.isDead) {
      return;
    }

    if (!start) {
      start = timestamp;
    }

    window.requestAnimationFrame(move);

    const progress = timestamp - start;

    if (progress > interval) {
      start = timestamp - (progress % interval);
      forward(snake);
    }
  };

  window.requestAnimationFrame(move);
};
