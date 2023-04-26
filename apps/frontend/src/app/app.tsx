
import MainPage from "./main";
import LoginPage from "./login";
import UserContext from "./common/user.context";
import UserStorage, { User } from "./common/user.storage";
import { useState, useMemo } from "react";
import { USER_LOCAL_STORAGE_KEY } from "./constants";

const storage = new UserStorage(USER_LOCAL_STORAGE_KEY);

function App() {
  const [user, setUser] = useState(storage.get());

  const value = useMemo(() => ({
    setUser: (user: User) => {
      storage.set(user);
      setUser(user);
    },
    user,
  }),[user]);

  return (
    <UserContext.Provider value={value as any}>
      {
        !user
          ? <LoginPage />
          : <MainPage />
      }
    </UserContext.Provider>
  );
}

export default App;


