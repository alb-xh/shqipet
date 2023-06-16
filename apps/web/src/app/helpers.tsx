import { GeoMap } from "@shqipet/common";

import { Marker } from "./types";
import { markerIcon } from "./constants";

export const getMarkersFromGeoMap = (geoMap: GeoMap): Marker[] => {
  const markers = [];

  for (const { lat, lng, name, city } of Object.values(geoMap)) {
    if (!lat || !lng || !name) {
      continue;
    }

    const marker = markers.find((m) => m.lat === lat && m.lng === lng);

    if (!marker) {
      markers.push({ lat, lng, name, city, active: 1 });
    } else {
      marker.city = marker.city || city;
      marker.active++;
    }
  }

  return markers;
};

export const markerToHtmlElement = (marker: Marker) => {
  const el = document.createElement('div');
  el.className="tooltip";
  el.innerHTML= markerIcon;

  el.style.color = 'red';
  el.style.width = `30px`;
  el.style['pointer-events'] = 'auto';
  el.style.cursor = 'pointer';

  const tooltip = document.createElement('span');
  tooltip.className = "tooltiptext";
  tooltip.innerHTML = `${marker.city || marker.name}&nbsp;&nbsp;<span class="online">${marker.active}</span>`;

  el.appendChild(tooltip);

  return el;
}


export const isSmallDevice = () => window.innerWidth <= 700;
export const isLandscape = () => window.innerWidth > window.innerHeight;

export const getEarthDimensions = () => ({
  width: isSmallDevice() && !isLandscape()
    ? window.innerWidth * 0.95
    : window.innerWidth,
  height: isSmallDevice() && !isLandscape()
    ? window.innerHeight * 0.825
    : window.innerHeight * 0.85,
});

export const capOnlyFirst = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();
