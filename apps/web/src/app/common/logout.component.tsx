import { Button } from "@mui/material";
import { CSSProperties, useContext } from "react";

import AppContext from "./app.context";
import usersClient from "./usersClient";
import chatSocket from "./chat.socket";

const style: CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '8px',
};

export default function Logout () {
  const { setUser, setLoading } = useContext(AppContext);
  const onClick = async () => {
    setLoading(true);

    await usersClient.logOut();
    chatSocket.disconnect();

    setUser(null);
  }

  return <Button variant="contained" style={style} onClick={onClick}>
    Logout
  </Button>;
}