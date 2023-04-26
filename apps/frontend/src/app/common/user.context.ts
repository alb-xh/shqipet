import { createContext } from "react";
import { User } from './user.storage';

export interface UserContextInterface {
  user: User | null,
  setUser: (user: User | null) => void,
};

const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => undefined,
});

export default UserContext;
