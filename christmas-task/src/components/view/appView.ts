import { Main } from './main/main';
import { Toys } from './toys/toys';
import { Tree } from './tree/tree';

export class AppView {
  public main: Main;
  public toys: Toys;
  public tree: Tree;

  constructor() {
    this.main = new Main();
    this.toys = new Toys();
    this.tree = new Tree();
  }
}
