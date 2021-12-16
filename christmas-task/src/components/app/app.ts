import { LocalState } from '../controller/localState';
import { Routing } from '../controller/routing';

export class App {
  private localState: LocalState;
  private routing: Routing;
  static rootEl = document.querySelector('#root')!;

  constructor() {
    this.localState = new LocalState();
    this.routing = new Routing();
  }
  start() {
    console.log('start');
  }
}
