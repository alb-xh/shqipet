import { useState, useMemo, useEffect } from "react";

import MainPage from "./main";
import LoginPage from "./login";
import UserContext from "./common/user.context";
import Logo from './common/logo.component';
import Logout from "./common/logout.component";
import Loading from "./common/loading.component";
import usersClient from "./common/usersClient";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) {
  //     setLoading(true);

  //     usersClient.getMe()
  //       .then((user: any) => {
  //         setUser(user);
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, [user]);

  const value = useMemo(() => ({ user, setUser, loading, setLoading }),[ user, loading ]);

  return (
    <UserContext.Provider value={value as any}>
      <Logo />
      {/* { !loading && user ? <Logout /> : null }
      { loading ? <Loading /> : null }
      { !loading && !user ? <LoginPage /> : null }
      { !loading && user ? <MainPage /> : null } */}
      <MainPage />
    </UserContext.Provider>
  );
}

export default App;


