import toysTemplate from './toys.html';
import { App } from '../../app/app';
import './toys.scss';
import toysDB from '../../controller/data';
import { Filters } from './filters';
import { AppView } from '../appView';
import { LocalState } from '../../controller/localState';

export class Toys {
  private filters: Filters;

  constructor() {
    this.filters = new Filters();
  }

  draw(): void {
    document.body.className = 'body toysPage';
    AppView.header.draw('toys');
    App.rootEl.innerHTML = toysTemplate;
    this.filters.drawSliders();
    this.drawCards();
  }

  drawCards(): void {
    toysDB.forEach((toy) => {
      document.querySelector('.toys-cards')!.innerHTML += `
      <div class="card ${LocalState.data.selected.includes(+toy.num) ? 'selected' : ''}" data-num="${toy.num}">
      <span class="ribbon"></span>
      <p class="card__title">${toy.name}</p>
      <div class="card__inner">
        <img class="card__img" src="./assets/toys/${toy.num}.webp" alt="ball">
        <ul class="card__description">
          <li class="card__info">Количество: ${toy.count}</li>
          <li class="card__info">Год покупки: ${toy.year}</li>
          <li class="card__info">Форма: ${toy.shape}</li>
          <li class="card__info">Цвет: ${toy.color}</li>
          <li class="card__info">Размер: ${toy.size}</li>
          <li class="card__info">Любимая: ${toy.favorite ? 'да' : 'нет'}</li>
        </ul>
      </div>
    </div>
      `;
    });

    document.body.addEventListener('click', (e) => {
      this.selectCard(e);
    });
  }

  selectCard(e: Event): void {
    const card: HTMLElement | null = (e.target as HTMLElement).closest('.card');
    if (!card) return;

    const cardNum = +card.dataset.num!;

    if (LocalState.data.selected.includes(cardNum)) {
      AppView.header.num--;
      LocalState.data.selected.splice(LocalState.data.selected.indexOf(cardNum), 1);
      card.classList.remove('selected');
    } else if (LocalState.data.selected.length < 20) {
      LocalState.data.selected.push(cardNum);
      AppView.header.num++;
      card.classList.add('selected');
    } else {
      AppView.popup.showModal('Извините, все слоты заполнены');
    }
  }
}
