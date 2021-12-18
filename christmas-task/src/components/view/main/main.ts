import { App } from '../../app/app';
import './main.scss';
import toysList from '../../controller/data';
import mainTemplate from './main.html';

export class Main {
  draw() {
    document.body.className = 'body mainPage';
    App.rootEl.innerHTML = mainTemplate;
    console.log(toysList);
  }
}
