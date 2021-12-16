import { App } from '../../app/app';
import './toys.sass';
export class Toys {
  draw() {
    App.rootEl.innerHTML = `<p>Toys</p>`;
  }
}
