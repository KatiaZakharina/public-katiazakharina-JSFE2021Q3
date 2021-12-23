import { valueFilters } from '../../constant';
import { LocalState } from '../../controller/localState';
import { FiltersController } from './filtersController';

export class ValuesFilter {
  private cards: NodeListOf<HTMLElement> | null;

  constructor() {
    this.cards = document.querySelectorAll('.card');
  }

  controlFiltering(): void {
    this.controlCheckbox();
    this.updateFiltersForm();

    document.querySelector('[data-filter=value]')!.addEventListener('click', (e: Event) => {
      this.switchFilter(e);
    });
  }

  controlCheckbox(): void {
    const checkbox: HTMLInputElement = document.querySelector('.favorite__value-btn')!;
    if (LocalState.data.filters.value.favorite === 'да') {
      checkbox.checked = true;
      checkbox.classList.add('active');
      checkbox.dataset.value = 'да';
    }

    checkbox.addEventListener('click', (e: Event) => {
      if ((e.currentTarget as HTMLInputElement).dataset.value === 'да')
        (e.currentTarget as HTMLInputElement).dataset.value = 'нет';
      else (e.currentTarget as HTMLInputElement).dataset.value = 'да';
    });
  }

  switchFilter(e: Event): void {
    if (!(e.target as HTMLElement).getAttribute('data-btn')) return;
    const optionBtns = document.querySelectorAll(`button[data-btn=${(e.target as HTMLElement).dataset.btn}]`);

    optionBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    (e.target as HTMLElement).classList.toggle('active');

    const option = (e.target as HTMLElement).dataset.btn!,
      value =
        option === 'favorite'
          ? (e.target as HTMLInputElement).checked
            ? 'да'
            : 'нет'
          : (e.target as HTMLElement).dataset.value!;

    LocalState.data.filters!.value![option as keyof valueFilters] = value;
    this.clearCardsFiltering();
    FiltersController.updateCard();
  }

  updateFiltersForm(): void {
    const checkbox: HTMLInputElement = document.querySelector('.favorite__value-btn')!;

    Object.keys(LocalState.data.filters!.value!).forEach((option) => {
      const optionBtns = document.querySelectorAll(`button[data-btn=${option}]`),
        value = LocalState.data.filters!.value![option as keyof valueFilters];

      optionBtns.forEach((btn) => {
        if ((btn as HTMLElement).dataset.value === value) btn.classList.add('active');
      });

      if (checkbox.classList.contains('active')) checkbox.checked = true;
    });
  }

  clearCardsFiltering(): void {
    this.cards!.forEach((card) => {
      card.classList.remove('hide');
    });
  }

  clearFilters(): void {
    document.querySelectorAll('[data-btn]').forEach((btn) => {
      if ((btn as HTMLInputElement).checked) {
        (btn as HTMLInputElement).checked = false;
      }
      btn.classList.remove('active');
    });
    (document.querySelector('.toys__message')! as HTMLElement).style.display = 'none';
    LocalState.clearLocalStorage();
  }
}
