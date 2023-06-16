
import Globe from 'react-globe.gl';

import earth from '../../../assets/earth-texture.jpg';
import space from '../../../assets/space.webp';

import { getEarthDimensions, markerToHtmlElement } from '../../helpers';
import { Marker } from '../../types';
import { useGeoMarkers } from '../../common';

export const Earth = () => {
  const markers = useGeoMarkers();

  return (
    <Globe
      {...getEarthDimensions()}
      globeImageUrl={earth}
      backgroundImageUrl={space}
      htmlElementsData={markers}
      htmlLat={(m: Marker) => m.lat}
      htmlLng={(m: Marker) => m.lng}
      htmlElement={markerToHtmlElement}
    />
  )
}