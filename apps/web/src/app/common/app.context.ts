import { createContext } from "react";
import { GeoMap, UserInfo, Message } from '@shqipet/common';

export interface AppContextInterface {
  loading: boolean,
  setLoading: (flag: boolean) => void,
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void,
  login: boolean,
  setLogin: (flag: boolean) => void,
  geoMap: GeoMap,
  setGeoMap: (geoMap: GeoMap) => void,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  sendMessage: (message: Message) => void,
};

const AppContext = createContext<AppContextInterface>({
  loading: false,
  setLoading: () => undefined,
  user: null,
  setUser: () => undefined,
  login: false,
  setLogin: () => undefined,
  geoMap: {},
  setGeoMap: () => undefined,
  messages: [],
  setMessages: () => undefined,
  sendMessage: () => undefined,
});

export default AppContext;
