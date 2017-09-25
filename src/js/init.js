import * as config from './constants';

export function createBoard(container) {
  for (var i = 0; i < config.WIDTH; i++) {
    for(var j = 0; j < config.HEIGHT; j++) {
      const cell = document.createElement('div');

      cell.classList.add('cell', `cell-${i + 1}-${j + 1}`);
      
      container.appendChild(cell);
    }
  }
};
