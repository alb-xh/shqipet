export interface Marker {
  lat: number,
  lng: number,
  city: string,
  active: number,
}

export interface AlertSettings {
  text: string,
  severity?: 'error' | 'warning' | 'info' | 'success',
  timeout?: number,
}
