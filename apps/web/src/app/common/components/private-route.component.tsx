import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRedirect, useUser } from "../hooks";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const to = useRedirect();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate(to);
    }
  }, [ user, navigate, to ]);

  if (user) {
    return null;
  }

  return children;
}
