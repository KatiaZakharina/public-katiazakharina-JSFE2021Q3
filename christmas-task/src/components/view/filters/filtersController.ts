import { ValuesFilter } from '../filters/valuesFilter';
import { RangeFilter } from '../filters/rangeFilter';
import { Sort } from '../filters/sort';
import { LocalState } from '../../controller/localState';

export class FiltersController {
  public valuesFilter: ValuesFilter;
  public rangeFilter: RangeFilter;
  public sort: Sort;
  private resetBtn: HTMLElement | null;

  constructor() {
    this.valuesFilter = new ValuesFilter();
    this.rangeFilter = new RangeFilter();
    this.sort = new Sort();
    this.resetBtn = null;
  }

  control(): void {
    this.valuesFilter.controlFiltering();
    this.rangeFilter.controlFiltering();
    this.sort.controlSorting();
    this.controlResetBtn();
  }

  controlResetBtn(): void {
    this.resetBtn = document.querySelector('.filter__reset')!;
    this.resetBtn.addEventListener('click', () => {
      this.valuesFilter.clearFilters();
      this.valuesFilter.clearCardsFiltering();
      this.rangeFilter.resetRange();
    });
  }

  static clearCardsFiltering(): void {
    const cards = document.querySelectorAll('.card');
    cards!.forEach((card) => {
      card.classList.remove('hide');
    });
  }

  static updateCard(): void {
    const cards = document.querySelectorAll('.card');
    FiltersController.clearCardsFiltering();
    FiltersController.updateCardByValue();
    FiltersController.updateCardByRange();

    if (document.querySelectorAll('.card.hide').length === cards?.length) {
      (document.querySelector('.toys__message')! as HTMLElement).style.display = 'block';
    } else {
      (document.querySelector('.toys__message')! as HTMLElement).style.display = 'none';
    }
  }

  static updateCardByValue(): void {
    const cards = document.querySelectorAll('.card');

    Object.entries(LocalState.data.filters!.value!).forEach(([option, value]) => {
      if (value === 'нет') return;

      cards!.forEach((card) => {
        if ((card.querySelector(`[data-${option}]`) as HTMLElement).dataset[option] !== value) {
          card.classList.add('hide');
        }
      });
    });
  }

  static updateCardByRange(): void {
    const cards = document.querySelectorAll('.card');

    Object.entries(LocalState.data.filters.range).forEach(([option, [min, max]]) => {
      cards!.forEach((card) => {
        if (
          (card.querySelector(`[data-${option}]`) as HTMLElement).dataset[option]! < min ||
          (card.querySelector(`[data-${option}]`) as HTMLElement).dataset[option]! > max
        ) {
          card.classList.add('hide');
        }
      });
    });
  }
}
