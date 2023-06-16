import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { Path } from '../../constants';
import { appContext } from '../app.context';
import { userClient } from "../user.client";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(appContext);

  useEffect(() => {
    userClient.logOut()
      .then(() => {
        setUser(null);
        navigate(Path.Root);
      });
  }, [ navigate, setUser ]);
};
