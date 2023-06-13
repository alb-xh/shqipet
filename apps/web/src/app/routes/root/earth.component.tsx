
import Globe from 'react-globe.gl';
import { useContext, useMemo } from 'react';

import earth from '../../../assets/earth-texture.jpg';
import space from '../../../assets/space.webp';

import { appContext } from '../../common/app.context';
import { getEarthDimensions, getMarkersFromGeoMap } from '../../helpers';
import { markerIcon } from '../../constants';
import { Marker } from '../../types';

export const Earth = () => {
  const { geoMap } = useContext(appContext);
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