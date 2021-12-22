import noUiSlider, { target } from 'nouislider';
import { AppView } from '../appView';
import '../../../../node_modules/nouislider/dist/nouislider.css';
import { rangeFilters, ToyData } from '../../constant';
import { LocalState } from '../../controller/localState';
import { FiltersController } from './filtersController';

export class RangeFilter {
  private sliderCount: target | null;
  private sliderYear: target | null;
  private cards: NodeListOf<HTMLElement> | null;

  constructor() {
    this.sliderCount = null;
    this.sliderYear = null;
    this.cards = document.querySelectorAll('.card');
  }

  drawSliders(): void {
    this.sliderCount = <target>document.querySelector('#slider-count')!;
    this.sliderYear = <target>document.querySelector('#slider-year')!;

    this.createSlider(this.sliderCount, 'count');
    this.createSlider(this.sliderYear, 'year');
  }

  createSlider(element: target, option: string, needReset = false): void {
    if (needReset) {
      LocalState.data.filters.range[option as keyof rangeFilters] = this.getRange(option);
    }
    const [min, max] = LocalState.data.filters.range[option as keyof rangeFilters] || this.getRange(option);

    noUiSlider.create(element, {
      start: [min, max],
      connect: true,
      range: {
        min: this.getRange(option)[0],
        max: this.getRange(option)[1],
      },
      step: 1,
    });

    LocalState.data.filters.range[option as keyof rangeFilters] = [min, max];

    this.setRange(element, [min, max]);

    element.noUiSlider!.on('update', (values): void => {
      this.setRange(element, values);
      FiltersController.updateCard();
    });
  }

  setRange(element: HTMLElement, values: (string | number)[]): void {
    (element.previousElementSibling! as HTMLInputElement).value = String(Math.trunc(+values[0]));
    (element.nextElementSibling! as HTMLInputElement).value = String(Math.trunc(+values[1]));

    const option = element.dataset.range!;
    LocalState.data.filters.range[option as keyof rangeFilters] = [+values[0], +values[1]];
  }

  resetRange(): void {
    this.sliderCount!.noUiSlider!.destroy();
    this.sliderYear!.noUiSlider!.destroy();

    this.createSlider(this.sliderCount!, 'count');
    this.createSlider(this.sliderYear!, 'year');
  }

  getRange(option: string): [number, number] {
    let max: number, min: number;
    max = min = +AppView.toysDB[0][option as keyof ToyData];
    AppView.toysDB.forEach((toy) => {
      max = Math.max(max, +toy[option as keyof ToyData]);
      min = Math.min(min, +toy[option as keyof ToyData]);
    });
    return [min, max];
  }
}
