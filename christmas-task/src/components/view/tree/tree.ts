import treeTemplate from './tree.html';
import './tree.scss';
import { LocalState } from '../../controller/localState';

import { App } from '../../app/app';
import { AppView } from '../appView';
import { Decoration } from './decoration';
import { Favorites } from './favorites';
import { Menu } from './menu';
import { Toys } from '../toys/toys';

export class Tree {
  private decoration: Decoration;
  private favorites: Favorites;
  private menu: Menu;

  private resetBtn: HTMLElement | null;
  private saveBtn: HTMLElement | null;

  constructor() {
    this.favorites = new Favorites();
    this.decoration = new Decoration();
    this.menu = new Menu();

    this.resetBtn = null;
    this.saveBtn = null;
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

    this.saveBtn!.addEventListener('click', this.saveTreeState.bind(this));
    this.resetBtn!.addEventListener('click', this.resetTreeState.bind(this));
  }

  saveTreeState() {
    LocalState.savedTrees.unshift(LocalState.decoration);
    this.resetTreeState();
    this.decoration.drawSavedTrees();
  }

  resetTreeState() {
    LocalState.clearDecorationStorage();
    this.decoration.clearControl();
    this.decoration.updateControl();

    this.favorites.toysWrapper!.innerHTML = '';
    this.favorites.drawToyCards();
    document.querySelectorAll('[dragged]').forEach((toy) => toy.remove());
  }
}
