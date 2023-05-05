
import Globe from 'react-globe.gl';
import { useEffect, useState } from 'react';

import earth from '../../assets/earth-texture.jpg';
import space from '../../assets/space.png';
import chatSocket from '../common/chat.socket';
import { ChatEvent, GeoMap } from '@shqipet/common';

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

export default function Earth () {
  const [markers, setMarkers] = useState([]);

  chatSocket.on(ChatEvent.UpdateGeoMap, (geoMap: GeoMap) => {
    const newMarkers = [];

    for (const { lat, lng, city } of Object.values(geoMap)) {
      if (!lat || !lng || !city) {
        continue;
      }

      const marker = newMarkers.find((m) => (
        m.lat === lat &&
        m.lng === lng &&
        m.city === city
      ));

      if (!marker) {
        newMarkers.push({ lat, lng, city, active: 1 });
      } else {
        marker.active++;
      }
    }

    setMarkers(newMarkers);
  });

  const onGlobeReady = () => {
    if (!chatSocket.connected) {
      chatSocket.connect();
    }
  };

  return (
    <Globe
        width={window.innerWidth * 0.995}
        height={window.innerHeight * 0.8}
        globeImageUrl={earth}
        onGlobeReady={onGlobeReady}
        backgroundImageUrl={space}
        htmlElementsData={markers}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          el.className="tooltip";
          el.innerHTML= markerSvg;
          el.style.color = 'red';
          el.style.width = `30px`;
          el.style['pointer-events'] = 'auto';
          el.style.cursor = 'pointer';

          const tooltip = document.createElement('span');
          tooltip.className = "tooltiptext";
          tooltip.innerHTML = `${d.city}&nbsp;&nbsp;<span style="color:lightgreen;">${d.active}</span>`;

          el.appendChild(tooltip);

          return el;
        }}
      />
  )
}