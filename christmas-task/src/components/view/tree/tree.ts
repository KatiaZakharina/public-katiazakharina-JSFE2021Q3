import { App } from '../../app/app';
import './tree.sass';
export class Tree{
  draw(){
    App.rootEl.innerHTML = `<p>Tree</p>`;
  }
}