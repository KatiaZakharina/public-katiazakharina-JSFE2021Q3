import treeTemplate from './tree.html';
import { Header } from '../header/header';
import { App } from '../../app/app';

import './tree.scss';
export class Tree {
  private header: Header;
  constructor() {
    this.header = new Header();
  }
  draw() {
    document.body.className = 'body treePage';
    this.header.draw('tree');
    App.rootEl.innerHTML = treeTemplate;
  }
}
