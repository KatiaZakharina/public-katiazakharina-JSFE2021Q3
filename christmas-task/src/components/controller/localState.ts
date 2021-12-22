import { LocalData } from '../constant';

export class LocalState {
  static data: LocalData;

  constructor() {
    LocalState.data = LocalState.getData();
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
  }
  static getData(): LocalData {
    const localData: LocalData = JSON.parse(
      localStorage.getItem('data') ??
        '{"selected":[], "filters": {"value":{}, "range": {}, "sort": ["name", "increment"]}}'
    );
    return localData;
  }

  setLocalStorage(): void {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
  }

  static clearLocalStorage() {
    localStorage.setItem(
      'data',
      '{"selected":[], "filters": {"value":{}, "range": {}, "sort": ["name", "increment"]}}'
    );
    LocalState.data = LocalState.getData();
  }
}
