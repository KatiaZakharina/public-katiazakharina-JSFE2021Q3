import { LocalData } from '../constant';

export class LocalState {
  static data: LocalData;
  static defaultData: LocalData = { selected: [], filters: { value: {}, range: {}, sort: ['name', 'increment'] } };

  constructor() {
    LocalState.data = LocalState.getData();
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
  }
  static getData(): LocalData {
    const localData: LocalData =
      localStorage.getItem('data') !== null ? JSON.parse(localStorage.getItem('data')!) : LocalState.defaultData;
    return localData;
  }

  setLocalStorage(): void {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
  }

  static clearLocalStorage() {
    const clearedData = LocalState.defaultData;
    clearedData.selected = LocalState.data.selected;
    localStorage.setItem('data', JSON.stringify(clearedData));
    LocalState.data = LocalState.getData();
  }
}
