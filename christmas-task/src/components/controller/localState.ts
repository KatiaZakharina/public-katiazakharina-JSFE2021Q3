import { LocalData } from '../constant';

export class LocalState {
  static data: LocalData;
  constructor() {
    LocalState.data = this.getData();
    console.log(LocalState.data);
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
  }
  getData(): LocalData {
    return JSON.parse(localStorage.getItem('data') ?? '{"selected": []}');
  }
  clearData(key: string): void {
    localStorage.removeItem(key);
  }

  setLocalStorage() {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
  }
}
