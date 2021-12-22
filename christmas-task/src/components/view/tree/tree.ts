import treeTemplate from './tree.html';
import { App } from '../../app/app';

import './tree.scss';
import { AppView } from '../appView';
export class Tree {
  draw():void {
    document.body.className = 'body treePage';
    AppView.header.draw('tree');
    App.rootEl.innerHTML = treeTemplate;
  }
}
