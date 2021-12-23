import { FiltersController } from '../filters/filtersController';

export class Search {
  constructor() {
    document.querySelector('.search')?.addEventListener('input', (e: Event) => {
      this.controlSearch(e);
    });
  }
  controlSearch(e: Event): void {
    this.resetSearch();

    if (!(e.target as HTMLInputElement).value) {
      return;
    }
    const request = (e.target as HTMLInputElement).value,
      requestRegExp = new RegExp(request, 'i');
    const cards = document.querySelectorAll('.card');

    cards!.forEach((card) => {
      if (!(card.querySelector('[data-name]') as HTMLElement).dataset.name?.match(requestRegExp)) {
        card.classList.add('hide');
      }
    });

    if (document.querySelectorAll('.card.hide').length === cards?.length) {
      (document.querySelector('.toys__message')! as HTMLElement).style.display = 'block';
    } else {
      (document.querySelector('.toys__message')! as HTMLElement).style.display = 'none';
    }
  }

  resetSearch() {
    FiltersController.clearCardsFiltering();
    FiltersController.updateCard();
  }
}
