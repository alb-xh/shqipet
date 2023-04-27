import { useState, useMemo, useEffect } from "react";

import MainPage from "./main";
import LoginPage from "./login";
import UserContext from "./common/user.context";
import Logo from './common/logo.component';
import Logout from "./common/logout.component";
import Loading from "./common/loading.component";
import authClient from "./common/authClient";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(true);

      authClient.getMe()
        .then((user: any) => {
          setUser(user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  const value = useMemo(() => ({ user, setUser, loading, setLoading }),[ user, loading ]);

  return (
    <UserContext.Provider value={value as any}>
      <Logo />
      { !loading && user ? <Logout /> : null }
      { loading ? <Loading /> : null }
      { !loading && !user ? <LoginPage /> : null }
      { !loading && user ? <MainPage /> : null }
    </UserContext.Provider>
  );
}

export default App;


