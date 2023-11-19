import { Box } from '@mui/material';

import { RootLayout } from './layout';
import { Earth } from './earth.component';


const Root = () => (
  <Box className="main">
    <Earth/>
  </Box>
);

export { Root, RootLayout };
