import * as config from './constants';
import { initSnakeBody } from './init';

export default function Snake() {
  this.body = initSnakeBody();
};
