import { useState, useMemo, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { WsEvent, CreateRoomMessage, JoinRoomMessage, Message } from "@shqipet/common";

import { appContext, wsSocket } from './common';

import { Path } from "./constants";
import { RootLayout, Root, Login, Logout, Games, Rooms, Chess, About, Posts, Profile, Chat } from "./routes";
import { Error } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: Path.Root,
        element: <Root />,
      },
      {
        path: Path.Chat,
        element: <Chat />,
      },
      {
        path: Path.Logout,
        element: <Logout />,
      },
      {
        path: Path.Games,
        element: <Games />,
      },
      {
        path: Path.Chess,
        element: <Chess />,
      },
      {
        path: Path.Room,
        element: <Rooms />
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: Path.About,
        element: <About />
      },
      {
        path: Path.Posts,
        element: <Posts />
      },
      {
        path: Path.Profile,
        element: <Profile />,

      }
    ]
  },
]);

export const App = () => {
  const [user, setUser] = useState(undefined);
  const [alert, setAlert] = useState(null);
  const [searchValue, setSearchValue] = useState({ value: '', category: '', isSearching: true });
  const [searchOptions, setSearchOptions] = useState({ show: false, categories: [] });
  const [geoMap, setGeoMap ] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    wsSocket.on(WsEvent.UpdateGeoMap, setGeoMap);
    wsSocket.on(WsEvent.UpdateRoom, setRoom);
    wsSocket.on(WsEvent.BroadcastMessage, (message: Message) => {
      setMessages((messages: Message[]) => [ ...messages, message ].slice(-100));
    });

    wsSocket.connect();

    return () => {
      wsSocket.off();
      wsSocket.disconnect();
    };
  }, [user]);

  const sendMessage = (message: Message) => {
    wsSocket.emit(WsEvent.CreateMessage, message);
  };

  const createRoom = (message: CreateRoomMessage) => {
    wsSocket.emit(WsEvent.CreateRoom, message);
  };

  const joinRoom = (message: JoinRoomMessage) => {
    wsSocket.emit(WsEvent.JoinRoom, message);
  };

  const value = useMemo(() => ({
    user,
    setUser,
    geoMap,
    setGeoMap,
    messages,
    setMessages,
    sendMessage,
    alert,
    setAlert,
    room,
    createRoom,
    joinRoom,
    searchValue,
    setSearchValue,
    searchOptions,
    setSearchOptions,
  }),[ user, geoMap, messages, alert, room, searchValue, searchOptions ]);

  return (
    <appContext.Provider value={value}>
      <RouterProvider router={router} />
    </appContext.Provider>
  );
};
