import { Header } from './header/header';
import { Main } from './main/main';
import { Toys } from './toys/toys';
import { Tree } from './tree/tree';
import { Popup } from './popup/popup';
import toysDB from '../controller/data';
import { ToyData } from '../constant';

export class AppView {
  public main: Main;
  public toys: Toys;
  public tree: Tree;
  
  static header: Header;
  static popup: Popup;
  static toysDB: Array<ToyData>;

  constructor() {
    AppView.toysDB = toysDB;
    AppView.header = new Header();
    AppView.popup = new Popup();
    this.main = new Main();
    this.toys = new Toys();
    this.tree = new Tree();
  }
}
