import { GeoInfo } from "@shqipet/common"

export type Marker = GeoInfo &  { active: number };

export interface AlertSettings {
  text: string,
  severity: 'error' | 'warning' | 'info' | 'success',
  timeout?: number,
}
