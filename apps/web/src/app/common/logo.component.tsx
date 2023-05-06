import { Box } from '@mui/material';

import logo from '../../assets/logo.png';

export default function Logo() {
  return (
    <Box
      component="img"
      className='logo'
      alt="logo"
      src={logo}
    />
  );
}
