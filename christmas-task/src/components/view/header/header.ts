import './header.scss';
import { LocalState } from '../../controller/localState';
import { Search } from './search';

export class Header {
  private _num: number;
  private counterEl: HTMLInputElement;
  private headerEl: HTMLElement;
  private search: Search;

  constructor() {
    this._num = Object.keys(LocalState.data.selected).length ?? 0;
    this.headerEl = document.querySelector('.header-bar')!;
    this.counterEl = document.querySelector('.counter')!;
    this.reloadCounter();
    this.search = new Search();
  }
  set num(value: number) {
    this._num = value;
    this.reloadCounter();
  }
  get num() {
    return this._num;
  }

  draw(type: string): void {
    this.headerEl.className = `header-bar ${type}-header`;
  }
  reloadCounter(): void {
    this.counterEl.value = String(this.num);
  }
}
