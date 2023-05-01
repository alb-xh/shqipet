import { createContext } from "react";

import { User } from "./usersClient";

export interface AppContextInterface {
  loading: boolean,
  setLoading: (flag: boolean) => void,
  user: User | null,
  setUser: (user: User | null) => void,
  login: boolean,
  setLogin: (flag: boolean) => void,
};

const AppContext = createContext<AppContextInterface>({
  loading: false,
  setLoading: () => undefined,
  user: null,
  setUser: () => undefined,
  login: false,
  setLogin: () => undefined,
});

export default AppContext;
