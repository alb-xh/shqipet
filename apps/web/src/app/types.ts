import { GeoInfo } from "@shqipet/common/frontend"

export type Marker = GeoInfo &  { active: number };

export interface AlertSettings {
  text: string,
  severity: 'error' | 'warning' | 'info' | 'success',
  timeout?: number,
}

export interface SearchValue {
  value: string,
  category: string,
  isSearching: boolean,
}

export interface SearchOptions {
  show: boolean,
  categories: string[],
}
