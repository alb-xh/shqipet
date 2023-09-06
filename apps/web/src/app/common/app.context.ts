import { createContext } from "react";
import { UserInfo, Message, CreateRoomMessage, JoinRoomMessage, RoomInfo, GeoInfo } from '@shqipet/common';

import { AlertSettings, SearchOptions, SearchValue } from "../types";

export interface AppContextInterface {
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void,
  geoMap: GeoInfo[],
  setGeoMap: (geoMap: GeoInfo[]) => void,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  sendMessage: (message: Message) => void,
  alert: AlertSettings | null,
  room: RoomInfo | null,
  setAlert: (settings: AlertSettings | null) => void,
  createRoom: (message: CreateRoomMessage) => void,
  joinRoom: (message: JoinRoomMessage) => void,
  searchValue: SearchValue,
  setSearchValue: (value: SearchValue) => void,
  searchOptions: SearchOptions,
  setSearchOptions: (options: SearchOptions) => void,
};

export const appContext = createContext<AppContextInterface>({
  user: null,
  setUser: () => undefined,
  geoMap: [],
  setGeoMap: () => undefined,
  messages: [],
  setMessages: () => undefined,
  sendMessage: () => undefined,
  alert: null,
  setAlert: () => undefined,
  room: null,
  createRoom: () => undefined,
  joinRoom: () => undefined,
  searchValue: null,
  setSearchValue: () => undefined,
  searchOptions: null,
  setSearchOptions: () => undefined,
});

