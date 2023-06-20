import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { Path } from '../../constants';
import { appContext } from '../app.context';
import { apiClient } from "../api-client";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(appContext);

  useEffect(() => {
    apiClient.logOut()
      .then(() => {
        setUser(null);
        navigate(Path.Root);
      });
  }, [ navigate, setUser ]);
};
