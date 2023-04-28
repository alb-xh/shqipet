import world from 'cities.json';
import sample from 'lodash/sample';
import random from 'lodash/random';
import Globe from 'react-globe.gl';

import earth from '../../assets/earth-texture.jpg';
import space from '../../assets/space.png';
import { useState } from 'react';

const getRandomItems = (items, nrItems = random(5, 20)) => [ ...Array(nrItems) ].map(() => sample(items));

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

export default function Earth () {
  const [ cities ] = useState(getRandomItems(world));

  return (
    <Globe
        width={window.innerWidth * 0.995}
        height={window.innerHeight * 0.8}
        globeImageUrl={earth}
        backgroundImageUrl={space}
        htmlElementsData={cities}
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
          el.onclick = () => { alert(`Clicked ${d.name}`) };

          const tooltip = document.createElement('span');
          tooltip.className = "tooltiptext";
          tooltip.innerText = d.name;

          el.appendChild(tooltip);

          return el;
        }}
      />
  )
}