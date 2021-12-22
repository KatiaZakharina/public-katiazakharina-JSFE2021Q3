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
    const localData: LocalData = JSON.parse(
      localStorage.getItem('data') ?? '{"selected":[], "filters": {"value":{}, "range": {}}}'
    );
    return localData;
  }
  setLocalStorage():void {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
  }
}
