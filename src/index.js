import { createBoard } from './js/init';
import './css/main.scss';

const init = (element) => {
  const container = document.querySelector(element);

  createBoard(container);
};

document.addEventListener('DOMContentLoaded', () => {
  init('.board');
});
