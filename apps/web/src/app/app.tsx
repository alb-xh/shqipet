import { useState, useMemo, useEffect } from "react";
import { ChatEvent, Message, UserInfo } from "@shqipet/common";

import MainPage from "./main";
import AppContext from "./common/app.context";
import Logo from './common/logo.component';
import Logout from "./common/logout.component";
import Loading from "./common/loading.component";
import usersClient from "./common/usersClient";
import Login from "./common/login.component";
import chatSocket from "./common/chat.socket";
import Alert from "./common/alert.component";
import { usePage } from "./helpers";

function App() {
  const page = usePage();
  const showPolicy = page === 'privacy-policy';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [geoMap, setGeoMap ] = useState({});
  const [messages, setMessages] = useState([]);
  const [alert, setAlert] = useState(null);

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
    loading,
    setLoading,
    login,
    setLogin,
    geoMap,
    setGeoMap,
    messages,
    setMessages,
    sendMessage,
    alert,
    setAlert,
  }),[ user, loading, login, geoMap, messages, alert ]);

  return (
    <AppContext.Provider value={value}>
      <Alert />
      { !showPolicy && loading ? <Loading /> : null }
      { !showPolicy && !loading && !login ? <MainPage /> : null }
    </AppContext.Provider>
  );
}

export default App;


