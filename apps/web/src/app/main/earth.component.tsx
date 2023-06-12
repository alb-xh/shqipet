
import Globe from 'react-globe.gl';
import { useContext, useMemo } from 'react';

import earth from '../../assets/earth-texture.jpg';
import space from '../../assets/space.webp';
import AppContext from '../common/app.context';
import markerIcon from './marker.icon';

import { getEarthDimensions, getMarkersFromGeoMap } from '../helpers';
import { Marker } from '../types';

export default function Earth () {
  const { geoMap } = useContext(AppContext);
  const markers = useMemo(() => getMarkersFromGeoMap(geoMap), [ geoMap ]);

  return (
    <Globe
      {...getEarthDimensions()}
      globeImageUrl={earth}
      backgroundImageUrl={space}
      htmlElementsData={markers}
      htmlLat={(m: Marker) => m.lat}
      htmlLng={(m: Marker) => m.lng}
      htmlElement={(m: Marker) => {
        const el = document.createElement('div');
        el.className="tooltip";
        el.innerHTML= markerIcon;

        el.style.color = 'red';
        el.style.width = `30px`;
        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';

        const tooltip = document.createElement('span');
        tooltip.className = "tooltiptext";
        tooltip.innerHTML = `${m.city || m.name}&nbsp;&nbsp;<span class="online">${m.active}</span>`;

        el.appendChild(tooltip);

        return el;
      }}
    />
  )
}