import { Button } from "@mui/material";
import { CSSProperties, useContext } from "react";

import UserContext from "./user.context";
import usersClient from "./usersClient";

const style: CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '8px',
};

export default function Logout () {
  const { setUser, setLoading } = useContext(UserContext);
  const onClick = async () => {
    setLoading(true);

    await usersClient.logOut();

    setUser(null);
  }

  return <Button variant="contained" style={style} onClick={onClick}>
    Logout
  </Button>;
}