import './header.scss';

export class Header {
  private _num: number;
  private counterEl: HTMLInputElement;
  private headerEl: HTMLElement;

  constructor() {
    this._num = 0;
    this.headerEl = document.querySelector('.header-bar')!;
    this.counterEl = document.querySelector('.counter')!;
  }
  set num(value: number) {
    this._num = value;
    this.reloadCounter();
  }
  get num() {
    return this._num;
  }
  draw(type: string) {
    this.headerEl.className = `header-bar ${type}`;
  }
  reloadCounter() {
    this.counterEl.value = String(this.num);
  }
}
