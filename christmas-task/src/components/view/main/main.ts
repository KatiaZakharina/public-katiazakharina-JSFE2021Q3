import { App } from '../../app/app';
import './main.sass';
import toysList from '../../controller/data';

export class Main {
  draw() {
    App.rootEl.innerHTML = `<p>Main</p>`;
    console.log(toysList);
  }
}
