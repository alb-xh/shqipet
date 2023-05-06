import { Button } from "@mui/material";
import { useContext } from "react";

import AppContext from "./app.context";

export default function Login () {
  const { setLogin } = useContext(AppContext);
  const onClick = async () => {
    setLogin(true);
  }

  return (
    <Button className="login" variant="contained" onClick={onClick}>
      Login
    </Button>
  );
}