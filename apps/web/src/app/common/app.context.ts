import { createContext } from "react";
import { UserInfo } from '@shqipet/common';

export interface AppContextInterface {
  loading: boolean,
  setLoading: (flag: boolean) => void,
  user: UserInfo | null,
  setUser: (user: UserInfo | null) => void,
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
