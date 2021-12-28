import { LocalData, DecorationData } from '../constant';

export class LocalState {
  static data: LocalData;
  static decoration: DecorationData;
  static savedTrees: Array<DecorationData>;

  constructor() {
    LocalState.data = LocalState.getToysData();
    LocalState.decoration = LocalState.getDecorationData();
    LocalState.savedTrees = LocalState.getSavedTrees();

    window.onbeforeunload = () => {
      LocalState.setLocalStorage();
    };
  }

  static getToysData(): LocalData {
    const localData: LocalData = localStorage.getItem('data')
      ? JSON.parse(localStorage.getItem('data')!)
      : {
          selected: {},
          filters: {
            value: {},
            range: {},
            sort: ['name', 'increment'],
          },
        };
    return localData;
  }

  static getDecorationData(): DecorationData {
    const decorationData: DecorationData = localStorage.getItem('decoration')
      ? JSON.parse(localStorage.getItem('decoration')!)
      : {
          menu: {
            audio: false,
            snow: false,
          },
          placedOnTree: [],
          tree: 1,
          background: 1,
          lights: 1,
        };
    return decorationData;
  }

  static getSavedTrees() {
    return localStorage.getItem('savedTrees') ? JSON.parse(localStorage.getItem('savedTrees')!) : [];
  }

  static setLocalStorage(): void {
    localStorage.setItem('data', JSON.stringify(LocalState.data));
    localStorage.setItem('decoration', JSON.stringify(LocalState.decoration));
    localStorage.setItem('savedTrees', JSON.stringify(LocalState.savedTrees));
  }

  static clearLocalStorage() {
    localStorage.setItem(
      'data',
      JSON.stringify({
        selected: LocalState.data.selected,
        filters: {
          value: {},
          range: {},
          sort: ['name', 'increment'],
        },
      })
    );
    LocalState.data = LocalState.getToysData();
  }

  static clearDecorationStorage() {
    localStorage.setItem(
      'decoration',
      JSON.stringify({
        menu: {
          audio: false,
          snow: false,
        },
        placedOnTree: [],
        tree: 1,
        background: 1,
        lights: 1,
      })
    );
    LocalState.decoration = LocalState.getDecorationData();
  }
}
