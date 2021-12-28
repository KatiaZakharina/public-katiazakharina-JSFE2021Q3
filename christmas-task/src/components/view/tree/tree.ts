import treeTemplate from './tree.html';
import './tree.scss';
import { LocalState } from '../../controller/localState';

import { App } from '../../app/app';
import { AppView } from '../appView';
import { Decoration } from './decoration';
import { Favorites } from './favorites';
import { Menu } from './menu';

export class Tree {
  private decoration: Decoration;
  private favorites: Favorites;
  private menu: Menu;

  private resetBtn: HTMLElement | null;
  private saveBtn: HTMLElement | null;
  private storageBtn: HTMLElement | null;

  constructor() {
    this.favorites = new Favorites();
    this.decoration = new Decoration();
    this.menu = new Menu();

    this.resetBtn = null;
    this.saveBtn = null;
    this.storageBtn = null;
  }

  draw(): void {
    document.body.className = 'body treePage';
    AppView.header.draw('tree');
    App.rootEl.innerHTML = treeTemplate;

    this.favorites.draw();
    this.decoration.draw();
    this.menu.control();

    this.saveBtn = document.querySelector('.tree__save');
    this.resetBtn = document.querySelector('.tree__reset');
    this.storageBtn = document.querySelector('.tree__storage');

    this.saveBtn!.addEventListener('click', this.saveTreeState.bind(this));
    this.resetBtn!.addEventListener('click', this.resetTreeState.bind(this));
    this.storageBtn!.addEventListener('click', this.clearStorage.bind(this));

    document.querySelector('.saved-trees')?.addEventListener('click', (e: Event) => {
      if (!(e.target as HTMLElement).classList.contains('saved-trees__item')) return;
      this.restoreTreeState(+(e.target as HTMLElement).dataset.control!);
    });
  }

  saveTreeState() {
    LocalState.savedTrees.unshift(LocalState.decoration);
    this.favorites.drawSavedTrees();
    this.resetTreeState();
  }

  resetTreeState() {
    LocalState.clearDecorationStorage();
    this.decoration.clearControl();
    this.decoration.updateControl();
    this.menu.control();

    this.favorites.toysWrapper!.innerHTML = '';
    this.favorites.drawToyCards();
    document.querySelectorAll('[dragged]').forEach((toy) => toy.remove());
    this.decoration.drawGarland();
  }

  restoreTreeState(num: number) {
    LocalState.decoration = LocalState.savedTrees[num];
    this.decoration.draw();
    this.favorites.draw();
    this.menu.control();
  }

  clearStorage() {
    localStorage.clear();
    window.onbeforeunload = null;
  }
}
