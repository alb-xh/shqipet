import { Button } from "@mui/material";
import { CSSProperties, useContext } from "react";

import UserContext from "./user.context";
import authClient from "./authClient";

const style: CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '8px',
};

export default function Logout () {
  const { setUser, setLoading } = useContext(UserContext);
  const onClick = async () => {
    setLoading(true);

    await authClient.logOut();

    setUser(null);
  }

  return <Button variant="contained" style={style} onClick={onClick}>
    Logout
  </Button>;
}