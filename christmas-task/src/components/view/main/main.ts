import { App } from '../../app/app';
import './main.scss';
import toysList from '../../controller/data';
import mainTemplate from './main.html';
import { Header } from '../header/header';

export class Main {
  private header: Header;
  constructor() {
    this.header = new Header();
  }
  draw() {
    document.body.className = 'body mainPage';
    this.header.draw('main');
    App.rootEl.innerHTML = mainTemplate;
    console.log(toysList);
  }
}
