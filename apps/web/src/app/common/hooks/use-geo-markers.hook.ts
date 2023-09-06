import { useMemo } from "react"

import {  getMarkersFromGeoMap} from '../../helpers';
import { useAppContext } from "./use-app-context.hook";

export const useGeoMarkers = () => {
  const { geoMap } = useAppContext();
  const markers = useMemo(() => getMarkersFromGeoMap(geoMap), [ geoMap ]);

  return markers;
}