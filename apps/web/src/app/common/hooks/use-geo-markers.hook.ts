import { useContext, useMemo } from "react"

import {  getMarkersFromGeoMap} from '../../helpers';
import { appContext } from "../app.context"

export const useGeoMarkers = () => {
  const { geoMap } = useContext(appContext);
  const markers = useMemo(() => getMarkersFromGeoMap(geoMap), [ geoMap ]);

  return markers;
}