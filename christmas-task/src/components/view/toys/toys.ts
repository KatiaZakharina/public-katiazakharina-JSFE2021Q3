import toysTemplate from './toys.html';
import { Header } from '../header/header';
import { App } from '../../app/app';
import './toys.scss';

export class Toys {
  private header: Header;
  constructor() {
    this.header = new Header();
  }
  draw() {
    document.body.className = 'body toysPage';
    this.header.draw('toys');
    App.rootEl.innerHTML = toysTemplate;
  }
}
