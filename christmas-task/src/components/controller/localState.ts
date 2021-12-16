import { LocalData } from '../constant';

export class LocalState {
  static data: LocalData;
  constructor() {
    LocalState.data = this.getData();
  }
  public getData(): LocalData {
    //массив с номерами избранных игрушек,
    //выбраные фильтры и сортировки
    return JSON.parse(localStorage.getItem('data') ?? '{}');
  }
  private clearData(key: string): void {
    localStorage.removeItem(key);
  }
}
