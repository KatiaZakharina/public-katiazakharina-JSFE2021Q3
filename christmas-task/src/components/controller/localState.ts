import { LocalData, DecorationData } from '../constant';

export class LocalState {
  static data: LocalData;
  static decoration: DecorationData;
  static savedTrees: Array<DecorationData>;

  static defaultData = {
    selected: {},
    filters: {
      value: {},
      range: {},
      sort: ['name', 'increment'],
    },
  };
  static defaultDecoration = {
    menu: {
      audio: false,
      snow: false,
    },
    placedOnTree: [],
    tree: 1,
    background: 1,
    lights: 1,
  };

  constructor() {
    LocalState.data = LocalState.getToysData();
    LocalState.decoration = LocalState.getDecorationData();
    LocalState.savedTrees = LocalState.getSavedTrees();

    window.onbeforeunload = (): void => {
      LocalState.setLocalStorage();
    };
  }

  static getToysData(): LocalData {
    const localData: LocalData = localStorage.getItem('data')
      ? JSON.parse(localStorage.getItem('data')!)
      : LocalState.defaultData;
    return localData;
  }

  static getDecorationData(): DecorationData {
    const decorationData: DecorationData = localStorage.getItem('decoration')
      ? JSON.parse(localStorage.getItem('decoration')!)
      : LocalState.defaultDecoration;
    return decorationData;
  }

  static getSavedTrees(): Array<DecorationData> {
    return localStorage.getItem('savedTrees') ? JSON.parse(localStorage.getItem('savedTrees')!) : [];
  }

  static setLocalStorage(): void {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
    localStorage.setItem('decoration', JSON.stringify(LocalState.decoration));
    localStorage.setItem('savedTrees', JSON.stringify(LocalState.savedTrees));
  }

  static clearLocalStorage(): void {
    const clearedData = LocalState.defaultData;
    clearedData.selected = LocalState.data.selected;
    localStorage.setItem('data', JSON.stringify(clearedData));
    LocalState.data = LocalState.getToysData();
  }

  static clearDecorationStorage(): void {
    localStorage.setItem(
      'decoration',
      JSON.stringify(LocalState.defaultDecoration)
    );
    LocalState.decoration = LocalState.getDecorationData();
  }
}
