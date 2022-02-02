import { LocalState } from './../../../controller/localState';
import { SortDataType } from '../../../constant';
export class Sort {
  controlSorting() {
    this.setSortingForm();
    this.sortCards();

    document.querySelector('.filter__sort-types')?.addEventListener('change', (e: Event) => {
      const selectedOptionEl = (e.target as HTMLSelectElement).options[(e.target as HTMLSelectElement).selectedIndex];
      LocalState.data.filters.sort = [selectedOptionEl!.dataset!.option!, selectedOptionEl!.dataset!.order!];
      this.sortCards();
    });
  }

  setSortingForm() {
    const selectEl = document.querySelector('.filter__sort-types') as HTMLSelectElement;
    const selectedOptionEl = selectEl.options[selectEl.selectedIndex];
    LocalState.data.filters.sort = LocalState.data.filters.sort || [
      selectedOptionEl!.dataset!.option!,
      selectedOptionEl!.dataset!.order!,
    ];
    (
      document.querySelector(
        `[data-option=${LocalState.data.filters.sort[0]}][data-order=${LocalState.data.filters.sort[1]}]`
      ) as HTMLOptionElement
    ).selected = true;
  }
  sortCards() {
    const option = LocalState.data.filters.sort[0] ?? 'name',
      order = LocalState.data.filters.sort[1] === 'increment';

    const cards = document.querySelectorAll('.card');

    const newCards = Array.from(cards).sort((card1: Element, card2: Element) => {
      const first: SortDataType = ((card1 as HTMLElement).querySelector(`[data-${option}]`) as HTMLElement).dataset[
          option
        ]!,
        second: SortDataType = ((card2 as HTMLElement).querySelector(`[data-${option}]`) as HTMLElement).dataset[
          option
        ]!;
      const compare = (a: SortDataType, b: SortDataType) => (a > b ? 1 : -1);

      const result = !isNaN(+first + +second) ? compare(+first, +second) : compare(first, second);

      return order ? result : -result;
    });
    document.querySelector('.toys-cards')!.append(...newCards);
  }
}
