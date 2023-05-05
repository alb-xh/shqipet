export enum ChatEvent {
  UpdateGeoMap = 'update_geo_map',
  NewMessage = 'new_message',
};

export interface GeoInfo {
  name?: string,
  code?: string,
  city?: string,
  lat?: number,
  lng?: number,
};

export type GeoMap = Record<string, GeoInfo>;
