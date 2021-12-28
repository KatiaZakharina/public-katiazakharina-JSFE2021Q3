import { LocalState } from '../controller/localState';
import { Routing } from '../controller/routing';

export class App {
  private localState: LocalState;
  private routing: Routing;
  static rootEl: Element = document.querySelector('#root')!;

  constructor() {
    this.localState = new LocalState();
    this.routing = new Routing();
  }
  start() {
    console.log(`
    * Вёрстка страниц приложения и навигация между ними +30
    * Меню с настройками +50
      Если музыка сохранилась включённой, она начинает играть ПРИ ПЕРВОМ КЛИКЕ.
    * Гирлянда +40
    * Игрушки в избранном +80
    * Дополнительный функционал на выбор +15
      * кнопка сохранения и сброса состояния елки и настроек. Возможность восстановить сохраненные состояния. +10
      * плавная смена фона для елки, используются сжатые изображения (webp) +5
      * игра сделана с помощью роутинга, поэтому при перезагрузке остается текущая страница +5
      
    `);
  }
}
