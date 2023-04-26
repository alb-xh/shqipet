
import MainPage from "./main";
import LoginPage from "./login";
import UserContext from "./common/user.context";
import UserStorage, { User } from "./common/user.storage";
import Logo from './common/logo.component';
import Logout from "./common/logout.component";

import { useState, useMemo } from "react";
import { USER_LOCAL_STORAGE_KEY } from "./constants";
import Loading from "./common/loading.component";

const storage = new UserStorage(USER_LOCAL_STORAGE_KEY);

function App() {
  const [user, setUser] = useState(storage.get());
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({
    setUser: (user: User) => {
      storage.set(user);
      setUser(user);
    },
    user,
    loading,
    setLoading,
  }),[user]);

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


