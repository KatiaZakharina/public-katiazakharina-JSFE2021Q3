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
  selected: Selected;
  filters: {
    value: valueFilters;
    range: rangeFilters;
    sort: [string, string];
  };
}

export interface Selected {
  i?: number;
}

export interface DecorationData {
  menu: {
    audio: boolean;
    snow: boolean;
  };
  placedOnTree: Array<{ num: number; count: number; location: { x: number; y: number } }>;
  tree: number;
  background: number;
  lights: number;
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
