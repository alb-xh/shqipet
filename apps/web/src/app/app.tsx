import { useState, useMemo, useEffect } from "react";

import MainPage from "./main";
import LoginPage from "./login";
import AppContext from "./common/app.context";
import Logo from './common/logo.component';
import Logout from "./common/logout.component";
import Loading from "./common/loading.component";
import usersClient from "./common/usersClient";
import Login from "./common/login.component";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);

      usersClient.getMe()
        .then((user: any) => {
          setUser(user);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading,
    login,
    setLogin,
  }),[ user, loading, login ]);

  return (
    <AppContext.Provider value={value as any}>
      <Logo />
      { loading ? <Loading /> : null }

      { !loading && !user && !login ? <Login /> : null }
      { !loading && !user && login ? <LoginPage /> : null }

      { !loading && !login ? <MainPage /> : null }
      { !loading && !login && user ? <Logout /> : null }
    </AppContext.Provider>
  );
}

export default App;


