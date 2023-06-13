import { createContext } from "react";
import { GeoMap, UserInfo, Message } from '@shqipet/common';

import { AlertSettings } from "../types";

export interface AppContextInterface {
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void,
  geoMap: GeoMap,
  setGeoMap: (geoMap: GeoMap) => void,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  sendMessage: (message: Message) => void,
  alert: AlertSettings | null,
  setAlert: (settings: AlertSettings | null) => void,
};

export const appContext = createContext<AppContextInterface>({
  user: null,
  setUser: () => undefined,
  geoMap: {},
  setGeoMap: () => undefined,
  messages: [],
  setMessages: () => undefined,
  sendMessage: () => undefined,
  alert: null,
  setAlert: () => undefined,
});

