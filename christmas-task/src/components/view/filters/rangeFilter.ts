import _default, { target } from 'nouislider';
import { AppView } from '../appView';
const noUiSlider = _default;
import '../../../../node_modules/nouislider/dist/nouislider.css';
import { ToyData } from '../../constant';

export class RangeFilter {
  private sliderCount: target | null;
  private sliderYear: target | null;

  constructor() {
    this.sliderCount = null;
    this.sliderYear = null;
  }

  drawSliders(): void {
    this.sliderCount = <target>document.querySelector('#slider-count')!;
    this.sliderYear = <target>document.querySelector('#slider-year')!;

    this.createSlider(this.sliderCount, 'count');
    this.createSlider(this.sliderYear, 'year');
  }

  createSlider(element: target, option: string): void {
    const [min, max] = this.getRange(option);
    noUiSlider.create(element, {
      start: [min, max],
      connect: true,
      range: {
        min: min,
        max: max,
      },
      step: 1,
    });

    updateRange(element, [min, max]);

    element.noUiSlider!.on('update', (values): void => {
      updateRange(element, values);
    });

    function updateRange(element: HTMLElement, values: (string | number)[]): void {
      (element.previousElementSibling! as HTMLInputElement).value = String(Math.trunc(+values[0]));
      (element.nextElementSibling! as HTMLInputElement).value = String(Math.trunc(+values[1]));
    }
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
