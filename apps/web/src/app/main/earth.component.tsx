
import Globe from 'react-globe.gl';
import { useContext, useMemo } from 'react';

import earth from '../../assets/earth-texture.jpg';
import space from '../../assets/space.png';
import AppContext from '../common/app.context';
import markerIcon from './marker.icon';

import { getMarkersFromGeoMap } from '../helpers';
import { Marker } from '../types';

export default function Earth () {
  const { geoMap } = useContext(AppContext);
  const markers = useMemo(() => getMarkersFromGeoMap(geoMap), [ geoMap ]);

  return (
    <Globe
      width={window.innerWidth * 0.995}
      height={window.innerHeight * 0.8}
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
        tooltip.innerHTML = `${m.city}&nbsp;&nbsp;<span class="online">${m.active}</span>`;

        el.appendChild(tooltip);

        return el;
      }}
    />
  )
}