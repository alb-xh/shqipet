import { useContext, useEffect, useState } from "react";

import { appContext } from "../app.context";
import { apiClient } from "../api-client";

export const useUser = () => {
  const { user, setUser } = useContext(appContext);
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

