import { createContext } from "react";
import { GeoMap, UserInfo } from '@shqipet/common';

export interface AppContextInterface {
  loading: boolean,
  setLoading: (flag: boolean) => void,
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void,
  login: boolean,
  setLogin: (flag: boolean) => void,
  geoMap: GeoMap,
  setGeoMap: (geoMap: GeoMap) => void,
};

const AppContext = createContext<AppContextInterface>({
  loading: false,
  setLoading: () => undefined,
  user: null,
  setUser: () => undefined,
  login: false,
  setLogin: () => undefined,
  geoMap: {},
  setGeoMap: () => undefined
});

export default AppContext;
