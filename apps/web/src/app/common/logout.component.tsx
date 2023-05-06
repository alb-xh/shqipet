import { Button } from "@mui/material";
import { useContext } from "react";

import AppContext from "./app.context";
import usersClient from "./usersClient";

export default function Logout () {
  const { setUser, setLoading } = useContext(AppContext);
  const onClick = async () => {
    setLoading(true);

    await usersClient.logOut();

    setUser(null);
  }

  return (
    <Button className="logout" variant="contained" onClick={onClick}>
      Logout
    </Button>
  )
}