export interface ToyData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface LocalData {
  selected: Array<number>;
  filters: {
    value: valueFilters;
    range: rangeFilters;
    sort: [string, string];
  };
}

export interface valueFilters {
  shape?: string;
  color?: string;
  size?: string;
  favorite?: string;
}

export interface rangeFilters {
  count?: [number, number];
  year?: [number, number];
}

export type Routes = '' | 'toys' | 'tree';
