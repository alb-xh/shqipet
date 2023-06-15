import { useState, useMemo, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ChatEvent, Message } from "@shqipet/common";

import { appContext, chatSocket  } from './common';

import { Path } from "./constants";
import { RootLayout, Root, PrivacyPolicy, Login, Logout, Chess, Games } from "./routes";
import { Error, ComingSoon } from './pages'

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
        element: <Root />,
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
        path: Path.PrivacyPolicy,
        element: <PrivacyPolicy />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
    ]
  },
  {
    path: Path.Posts,
    element: <ComingSoon />,
  },
]);


export const App = () => {
  const [user, setUser] = useState(undefined);
  const [alert, setAlert] = useState(null);
  const [geoMap, setGeoMap ] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatSocket.on(ChatEvent.UpdateGeoMap, setGeoMap);
    chatSocket.on(ChatEvent.BroadcastMessage, (message: Message) => {
      setMessages((messages: Message[]) => [ ...messages, message ].slice(-100));
    });

    chatSocket.connect();

    return () => {
      chatSocket.off();
      chatSocket.disconnect();
    };
  }, [user]);

  const sendMessage = (message: Message) => {
    chatSocket.emit(ChatEvent.CreateMessage, message);
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
  }),[ user, geoMap, messages, alert ]);


  return (
    <appContext.Provider value={value}>
      <RouterProvider router={router} />
    </appContext.Provider>
  );
};
