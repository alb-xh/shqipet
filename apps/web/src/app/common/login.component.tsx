import { Button } from "@mui/material";
import { CSSProperties, useContext } from "react";

import AppContext from "./app.context";

const style: CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '8px',
};

export default function Login () {
  const { setLogin } = useContext(AppContext);
  const onClick = async () => {
    setLogin(true);
  }

  return <Button variant="contained" style={style} onClick={onClick}>
    Login
  </Button>;
}