import { LocalData } from '../constant';

export class LocalState {
  static data: LocalData;
  constructor() {
    LocalState.data = this.getData();
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
  }
  getData(): LocalData {
    return JSON.parse(localStorage.getItem('data') ?? '{}');
  }
  clearData(key: string): void {
    localStorage.removeItem(key);
  }

  setLocalStorage() {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
  }
}
