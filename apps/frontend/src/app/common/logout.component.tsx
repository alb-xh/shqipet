import { Button } from "@mui/material";
import { CSSProperties, useContext } from "react";
import UserContext from "./user.context";

const style: CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '8px',
};

export default function Logout () {
  const { setUser } = useContext(UserContext);
  const onClick = () => setUser(null);

  return <Button variant="contained" style={style} onClick={onClick}>
    Logout
  </Button>;
}