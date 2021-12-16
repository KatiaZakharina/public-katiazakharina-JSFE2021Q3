import { AppView } from '../view/appView';

export class Routing {
  private view: AppView;
  readonly hashlist: { '': () => void; [toys: string]: () => void; tree: () => void };

  constructor() {
    this.view = new AppView();

    this.hashlist = {
      '': this.view.main.draw,
      toys: this.view.toys.draw,
      tree: this.view.tree.draw,
    };
    this.hashObserver();
    window.addEventListener('hashchange', this.hashObserver);
  }
  hashObserver() {
    const url: string = window.location.hash.slice(1).split('/')[0];
    const render: () => void = this.hashlist[url];
    render();
  }
}
