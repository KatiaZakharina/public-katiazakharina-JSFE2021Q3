import { App } from '../../app/app';
import './main.scss';
import mainTemplate from './main.html';
import { AppView } from '../appView';

export class Main {
  draw():void {
    document.body.className = 'body mainPage';
    AppView.header.draw('main');
    App.rootEl.innerHTML = mainTemplate;
  }
}
