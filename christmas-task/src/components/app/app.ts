import { LocalState } from '../controller/localState';
import { Routing } from '../controller/routing';

export class App {
  private localState: LocalState;
  private routing: Routing;
  static rootEl = document.querySelector('#root')!;

  constructor() {
    this.localState = new LocalState();
    this.routing = new Routing();
  }
  start() {
    console.log(`
      Самооценка: 200/200
      1. Верстка +10
      2. Содержимое карточки +10
      3. Добавление в избранное и модальное окно +20
      4. Сортировки по году и названию +20
      5. Фильтры по количеству и году. Используется range slider +30
      6. Фильтры по форме, цвету, размеру, только любимые +30
      7. Фильтрация по нескольким фильтрам разных типов и уведомление +20
      8. Сброс фильтров, который не влияет на сортировки и избранное, фильтры возвращаются в исходное положение +20
      9. Данные сохраняются в localStorage +10
      10. Поиск: 
                * автофокус
                * отсутствует автозаполнение
                * placeholder
                * очищающий крестик
                * уведомление об отсутствии совпадений
                * регистронезависимый поиск среди игрушек на странице
                * очистка в соответствии с фильтами и сортировкой
      
    `);
  }
}
