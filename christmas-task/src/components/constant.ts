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
  filters?: {
    value?: ValueFilters;
    range?: RangeFilters;
    sort?: number;
  };
}

export interface ValueFilters {
  shape: number;
  color: number;
  size: number;
  favorite: boolean;
}

export interface RangeFilters {
  quontity: [number, number];
  year: [number, number];
}
