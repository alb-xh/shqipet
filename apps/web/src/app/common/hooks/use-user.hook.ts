import { useEffect, useState } from "react";

import { apiClient } from "../api-client";
import { useAppContext } from "./use-app-context.hook";

export const useUser = () => {
  const { user, setUser } = useAppContext();
  const [ isLoading, setIsLoading ] = useState(user === undefined);

  useEffect(() => {
    if (user === undefined) {
      setIsLoading(true);

      apiClient.getMe()
        .then((userInfo) => {
          setUser(userInfo);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        })

      return;
    }
  }, [ user, setUser ]);

  return { isLoading, user, setUser };
}

