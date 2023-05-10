import { GeoMap } from "@shqipet/common";

import { Marker } from "./types";

export const getMarkersFromGeoMap = (geoMap: GeoMap): Marker[] => {
  const markers = [];

  for (const { lat, lng, city } of Object.values(geoMap)) {
    if (!lat || !lng || !city) {
      continue;
    }

    const marker = markers.find((m) => (
      m.lat === lat &&
      m.lng === lng &&
      m.city === city
    ));

    if (!marker) {
      markers.push({ lat, lng, city, active: 1 });
    } else {
      marker.active++;
    }
  }

  return markers;
};

export const isSmallDevice = () => window.innerWidth <= 700;
export const isLandscape = () => window.innerWidth > window.innerHeight;

export const getEarthDimensions = () => ({
  width: isSmallDevice() && !isLandscape()
    ? window.innerWidth * 0.95
    : window.innerWidth,
  height: isSmallDevice() && !isLandscape()
    ? window.innerHeight * 0.825
    : window.innerHeight * 0.8,
});