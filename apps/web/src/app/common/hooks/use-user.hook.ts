import { useContext, useEffect, useState } from "react";

import { appContext } from "../app.context";
import { userClient } from "../user.client";

export const useUser = () => {
  const { user, setUser } = useContext(appContext);
  const [ isLoading, setIsLoading ] = useState(user === undefined);

  useEffect(() => {
    if (user === undefined) {
      setIsLoading(true);

      userClient.getMe()
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

