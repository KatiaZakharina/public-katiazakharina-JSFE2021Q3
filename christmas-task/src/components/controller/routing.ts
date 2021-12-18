import { AppView } from '../view/appView';

export class Routing {
  private view: AppView;
  private hashlist: { '': () => void; [toys: string]: () => void; tree: () => void };

  constructor() {
    this.view = new AppView();

    this.hashlist = {
      '': this.view.main.draw,
      toys: this.view.toys.draw,
      tree: this.view.tree.draw,
    };

    this.hashObserver();
    window.addEventListener('hashchange', () => {
      this.hashObserver();
    });
  }
  hashObserver() {
    const url: string = window.location.hash.slice(1).split('/')[0];
    const render: () => void = this.hashlist[url];
    render();

    document.querySelectorAll('[data-redirection]').forEach((trigger) =>
      trigger.addEventListener('click', (e: Event) => {
        this.hashChange((e.currentTarget as HTMLElement).dataset.redirection!);
      })
    );
  }
  hashChange(hash: string): void {
    window.location.hash = hash;
  }
}
