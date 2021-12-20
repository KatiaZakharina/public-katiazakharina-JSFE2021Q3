import { valueFilters } from '../../constant';
import { AppView } from '../appView';
import { LocalState } from '../../controller/localState';

export class ValuesFilter {
  private filterEl: HTMLElement | null;
  private cards: NodeListOf<HTMLElement> | null;
  private resetBtn: HTMLElement | null;

  constructor() {
    this.filterEl = null;
    this.cards = null;
    this.resetBtn = null;
    LocalState.data.filters = {};
    if (!('filters' in LocalState.data)) LocalState.data.filters = {};
    if (!('value' in LocalState.data.filters!)) LocalState.data.filters!.value = {};
    // this.updateFiltersForm();
  }

  control(filterEl: HTMLElement | null, cards: NodeListOf<HTMLElement>) {
    this.filterEl = filterEl!;
    this.cards = cards;
    this.resetBtn = document.querySelector('.filter__reset')!;

    this.resetBtn.addEventListener('click', () => {
      this.clearFilters();
      this.clearCardsFiltering();
    });

    filterEl?.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).getAttribute('data-btn')) return;
      const optionBtns = document.querySelectorAll(`[data-btn=${(e.target as HTMLElement).dataset.btn}]`);

      optionBtns.forEach((btn) => {
        btn.classList.remove('active');
      });
      (e.target as HTMLElement).classList.add('active');

      const option = (e.target as HTMLElement).dataset.btn!,
        value =
          option === 'favorite'
            ? (e.target as HTMLInputElement).checked
              ? 'да'
              : 'нет'
            : (e.target as HTMLElement).dataset.value!;

      LocalState.data.filters!.value![option as keyof valueFilters] = value;
      this.clearCardsFiltering();
      this.updateCard();
    });
  }

  updateCard() {
    Object.entries(LocalState.data.filters!.value!).forEach(([option, value]) => {
      this.cards!.forEach((card) => {
        if ((card.querySelector(`[data-${option}]`) as HTMLElement).dataset[option] !== value) {
          card.classList.add('hide');
        }
      });
    });
    if (document.querySelectorAll('.card.hide').length === this.cards?.length) {
      AppView.popup.showModal('Извините, по вашему запросу ничего не найдено');
    }
  }

  updateFiltersForm() {
    Object.keys(LocalState.data.filters!.value!).forEach((option) => {
      // console.log(`[data-btn=${option}]`);
      const optionBtns = document.querySelectorAll(`[data-btn=${option}]`),
        value = LocalState.data.filters!.value![option as keyof valueFilters];

      optionBtns.forEach((btn) => {
        if ((btn as HTMLElement).dataset.value === value) btn.classList.add('active');
      });

      // console.log(option, value, optionBtns);
    });
  }

  clearCardsFiltering() {
    this.cards!.forEach((card) => {
      card.classList.remove('hide');
    });
  }

  clearFilters() {
    document.querySelectorAll('[data-btn]').forEach((btn) => {
      if ((btn as HTMLInputElement).checked) {
        (btn as HTMLInputElement).checked = false;
      }
      btn.classList.remove('active');
    });
  }
}
