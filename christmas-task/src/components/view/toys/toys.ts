import toysTemplate from './toys.html';

import { App } from '../../app/app';
import './toys.scss';
export class Toys {
  draw() {
    App.rootEl.innerHTML = toysTemplate;
  }
}
