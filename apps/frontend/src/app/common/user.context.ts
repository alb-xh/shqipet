import { createContext } from "react";

import { User } from "./authClient";

export interface UserContextInterface {
  loading: boolean,
  setLoading: (flag: boolean) => void,
  user: User | null,
  setUser: (user: User | null) => void,
};

const UserContext = createContext<UserContextInterface>({
  loading: false,
  setLoading: () => undefined,
  user: null,
  setUser: () => undefined,
});

export default UserContext;
