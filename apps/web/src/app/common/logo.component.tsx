import { Box } from '@mui/material';
import { useContext } from "react";

import logo from '../../assets/logo.png';
import AppContext from "./app.context";

export default function Logo() {
  const { setLogin, login } = useContext(AppContext);
  const onClick = async () => {
    if (login) {
      setLogin(false);
    }
  };

  return (
    <Box
      component="img"
      className='logo'
      alt="logo"
      src={logo}
      onClick={onClick}
    />
  );
}
