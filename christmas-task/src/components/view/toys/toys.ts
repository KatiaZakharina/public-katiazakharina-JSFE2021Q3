import toysTemplate from './toys.html';
import './toys.scss';
import toysDB from '../../controller/data';
import { Selected } from './../../constant';

import { App } from '../../app/app';
import { AppView } from '../appView';
import { LocalState } from '../../controller/localState';
import { FiltersController } from '../filters/filtersController';

export class Toys {
  private filtersCintroller: FiltersController;

  constructor() {
    this.filtersCintroller = new FiltersController();
  }

  draw(): void {
    document.body.className = 'body toysPage';
    App.rootEl.innerHTML = toysTemplate;
    this.drawCards();
    this.filtersCintroller.control();
    AppView.header.draw('toys');
  }

  drawCards(): void {
    toysDB.forEach((toy) => {
      document.querySelector('.toys-cards')!.innerHTML += `
      <div class="card ${Object.keys(LocalState.data.selected).includes(toy.num) ? 'selected' : ''}" data-num="${
        toy.num
      }">
      <span class="ribbon"></span>
      <p class="card__title" data-name="${toy.name}">${toy.name}</p>
      <div class="card__inner">
        <img class="card__img" src="./assets/toys/${toy.num}.webp" alt="ball">
        <ul class="card__description">
          <li class="card__info" data-count=${toy.count}>Количество: ${toy.count}</li>
          <li class="card__info" data-year=${toy.year}>Год покупки: ${toy.year}</li>
          <li class="card__info" data-shape=${toy.shape}>Форма: ${toy.shape}</li>
          <li class="card__info" data-color=${toy.color}>Цвет: ${toy.color}</li>
          <li class="card__info" data-size=${toy.size}>Размер: ${toy.size}</li>
          <li class="card__info" data-favorite=${toy.favorite ? 'да' : 'нет'}>Любимая: ${
        toy.favorite ? 'да' : 'нет'
      }</li>
        </ul>
      </div>
    </div>
      `;
    });

    document.body.addEventListener('click', (e: Event) => {
      this.selectCard(e);
    });
  }

  selectCard(e: Event): void {
    const card: HTMLElement | null = (e.target as HTMLElement).closest('.card');
    if (!card) return;

    const cardNum: string = card.dataset.num!,
      cardCount: number = +(card.querySelector('[data-count]') as HTMLElement).dataset.count!;

    if (Object.keys(LocalState.data.selected).includes(cardNum)) {
      AppView.header.num -= 1;
      delete LocalState.data.selected[cardNum as keyof Selected];
      // LocalState.data.selected.splice(LocalState.data.selected.indexOf([cardNum, cardCount]), 1);
      card.classList.remove('selected');
    } else if (Object.keys(LocalState.data.selected).length < 20) {
      LocalState.data.selected[cardNum as keyof Selected] = cardCount;
      AppView.header.num++;
      card.classList.add('selected');
    } else {
      AppView.popup.showModal('Извините, все слоты заполнены');
    }
  }
}
