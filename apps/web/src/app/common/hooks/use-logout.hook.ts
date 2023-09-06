import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Path } from '../../constants';
import { apiClient } from "../api-client";
import { useAppContext } from "./use-app-context.hook";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  useEffect(() => {
    apiClient.logOut()
      .then(() => {
        setUser(null);
        navigate(Path.Root);
      });
  }, [ navigate, setUser ]);
};
