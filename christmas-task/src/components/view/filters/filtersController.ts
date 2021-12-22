import { ValuesFilter } from '../filters/valuesFilter';
import { RangeFilter } from '../filters/rangeFilter';
import { Sort } from '../filters/sort';

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
    this.valuesFilter.control();
    this.rangeFilter.drawSliders();
    this.controlResetBtn();
  }

  controlResetBtn(): void {
    this.resetBtn = document.querySelector('.filter__reset')!;
    this.resetBtn.addEventListener('click', () => {
      this.valuesFilter.clearFilters();
      this.valuesFilter.clearCardsFiltering();
    });
  }
}
