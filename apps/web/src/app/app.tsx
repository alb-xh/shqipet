import { useState, useMemo, useEffect } from "react";
import { ChatEvent, Message, UserInfo } from "@shqipet/common";

import MainPage from "./main";
import LoginPage from "./login";
import AppContext from "./common/app.context";
import Logo from './common/logo.component';
import Logout from "./common/logout.component";
import Loading from "./common/loading.component";
import usersClient from "./common/usersClient";
import Login from "./common/login.component";
import chatSocket from "./common/chat.socket";
import { Authorship } from "./common/authorship";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [geoMap, setGeoMap ] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatSocket.on(ChatEvent.UpdateGeoMap, setGeoMap);
    chatSocket.on(ChatEvent.BroadcastMessage, (message: Message) => {
      setMessages((messages: Message[]) => [ ...messages, message ].slice(-100));
    });

    chatSocket.connect();
    return () => {
      chatSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(true);

      usersClient.getMe()
        .then((user: UserInfo) => {
          setUser(user);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const sendMessage = (message: Message) => {
    chatSocket.emit(ChatEvent.CreateMessage, message);
  };

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading,
    login,
    setLogin,
    geoMap,
    setGeoMap,
    messages,
    setMessages,
    sendMessage,
  }),[ user, loading, login, geoMap, messages ]);

  return (
    <AppContext.Provider value={value}>
      <Logo />
      { loading ? <Loading /> : null }

      { !loading && !user && !login ? <Login /> : null }
      { !loading && !user && login ? <LoginPage /> : null }

      { !loading && !login ? <MainPage /> : null }
      { !loading && !login && user ? <Logout /> : null }
      <Authorship />
    </AppContext.Provider>
  );
}

export default App;


