import { App } from '../../app/app';
import './tree.scss';
export class Tree{
  draw(){
    App.rootEl.innerHTML = `<p>Tree</p>`;
  }
}