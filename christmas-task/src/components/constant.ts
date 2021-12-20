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
  selected?: Array<number>;
  filters?: {
    value?: valueFilters;
    range?: rangeFilters;
    sort?: number;
  };
}

export interface valueFilters {
  shape?: string;
  color?: string;
  size?: string;
  favorite?: string;
}

export interface rangeFilters {
  quontity: [number, number];
  year: [number, number];
}
